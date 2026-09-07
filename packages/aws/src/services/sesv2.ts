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
  sdkId: "SESv2",
  serviceShapeName: "SimpleEmailService_v2",
});
const auth = T.AwsAuthSigv4({ name: "ses" });
const ver = T.ServiceVersion("2019-09-27");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const {
    Region,
    UseDualStack = false,
    UseFIPS = false,
    Endpoint,
    EndpointId,
  } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = () => ({
    authSchemes: [
      { name: "sigv4a", signingName: "ses", signingRegionSet: ["*"] },
    ],
  });
  {
    const PartitionResult = _.partition(Region);
    if (
      EndpointId != null &&
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false
    ) {
      if (_.isValidHostLabel(EndpointId, true)) {
        if (UseFIPS === false) {
          if (Endpoint != null) {
            return e(Endpoint, _p0(), {});
          }
          if (
            _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
            UseDualStack === true
          ) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://${EndpointId}.endpoints.email.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
            return e(
              `https://${EndpointId}.endpoints.email.us-gov.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
          if (
            !(_.getAttr(PartitionResult, "name") === "aws-us-gov") &&
            UseDualStack === true
          ) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://${EndpointId}.endpoints.email.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          if (!(_.getAttr(PartitionResult, "name") === "aws-us-gov")) {
            return e(
              `https://${EndpointId}.endpoints.email.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
        }
        return err(
          "Invalid Configuration: FIPS is not supported with multi-region endpoints",
        );
      }
      return err("EndpointId must be a valid host label");
    }
  }
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
              `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://email.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://email.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccountSuspendedException
  extends /*@__PURE__*/ S.TaggedError<AccountSuspendedException>()(
    "AccountSuspendedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MailFromDomainNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<MailFromDomainNotVerifiedException>()(
    "MailFromDomainNotVerifiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()(
    "MessageRejected",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SendingPausedException
  extends /*@__PURE__*/ S.TaggedError<SendingPausedException>()(
    "SendingPausedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type QueryIdentifier = string;
export type MetricNamespace = "VDM" | (string & {});
export const MetricNamespace = S.String;

export type Metric =
  | "SEND"
  | "COMPLAINT"
  | "PERMANENT_BOUNCE"
  | "TRANSIENT_BOUNCE"
  | "OPEN"
  | "CLICK"
  | "DELIVERY"
  | "DELIVERY_OPEN"
  | "DELIVERY_CLICK"
  | "DELIVERY_COMPLAINT"
  | (string & {});
export const Metric = S.String;

export type MetricDimensionName =
  | "EMAIL_IDENTITY"
  | "CONFIGURATION_SET"
  | "ISP"
  | (string & {});
export const MetricDimensionName = S.String;

export type MetricDimensionValue = string;
export type Dimensions = { [key in MetricDimensionName]?: string };
export const Dimensions = /*@__PURE__*/ S.Record(
  MetricDimensionName,
  S.String.pipe(S.optional),
);
export interface BatchGetMetricDataQuery {
  Id: string;
  Namespace: MetricNamespace;
  Metric: Metric;
  Dimensions?: { [key: string]: string | undefined };
  StartDate: Date;
  EndDate: Date;
}
export const BatchGetMetricDataQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Namespace: MetricNamespace,
    Metric: Metric,
    Dimensions: S.optional(Dimensions),
    StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "BatchGetMetricDataQuery",
}) as any as S.Schema<BatchGetMetricDataQuery>;
export type BatchGetMetricDataQueries = BatchGetMetricDataQuery[];
export const BatchGetMetricDataQueries = /*@__PURE__*/ S.Array(
  BatchGetMetricDataQuery,
);
export interface BatchGetMetricDataRequest {
  Queries: BatchGetMetricDataQuery[];
}
export const BatchGetMetricDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Queries: BatchGetMetricDataQueries }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/metrics/batch" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetMetricDataRequest",
}) as any as S.Schema<BatchGetMetricDataRequest>;
export type TimestampList = Date[];
export const TimestampList = /*@__PURE__*/ S.Array(
  S.Date.pipe(T.TimestampFormat("epoch-seconds")),
);
export type Counter = number;
export type MetricValueList = number[];
export const MetricValueList = /*@__PURE__*/ S.Array(S.Number);
export interface MetricDataResult {
  Id?: string;
  Timestamps?: Date[];
  Values?: number[];
}
export const MetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Timestamps: S.optional(TimestampList),
    Values: S.optional(MetricValueList),
  }),
).annotate({
  identifier: "MetricDataResult",
}) as any as S.Schema<MetricDataResult>;
export type MetricDataResultList = MetricDataResult[];
export const MetricDataResultList = /*@__PURE__*/ S.Array(MetricDataResult);
export type QueryErrorCode =
  | "INTERNAL_FAILURE"
  | "ACCESS_DENIED"
  | (string & {});
export const QueryErrorCode = S.String;

export type QueryErrorMessage = string;
export interface MetricDataError {
  Id?: string;
  Code?: QueryErrorCode;
  Message?: string;
}
export const MetricDataError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Code: S.optional(QueryErrorCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricDataError",
}) as any as S.Schema<MetricDataError>;
export type MetricDataErrorList = MetricDataError[];
export const MetricDataErrorList = /*@__PURE__*/ S.Array(MetricDataError);
export interface BatchGetMetricDataResponse {
  Results?: MetricDataResult[];
  Errors?: MetricDataError[];
}
export const BatchGetMetricDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(MetricDataResultList),
    Errors: S.optional(MetricDataErrorList),
  }),
).annotate({
  identifier: "BatchGetMetricDataResponse",
}) as any as S.Schema<BatchGetMetricDataResponse>;
export type JobId = string;
export interface CancelExportJobRequest {
  JobId: string;
}
export const CancelExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/export-jobs/{JobId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelExportJobRequest",
}) as any as S.Schema<CancelExportJobRequest>;
export interface CancelExportJobResponse {}
export const CancelExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelExportJobResponse",
}) as any as S.Schema<CancelExportJobResponse>;
export type ConfigurationSetName = string;
export type CustomRedirectDomain = string;
export type HttpsPolicy =
  | "REQUIRE"
  | "REQUIRE_OPEN_ONLY"
  | "OPTIONAL"
  | (string & {});
export const HttpsPolicy = S.String;

export interface TrackingOptions {
  CustomRedirectDomain: string;
  HttpsPolicy?: HttpsPolicy;
}
export const TrackingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomRedirectDomain: S.String,
    HttpsPolicy: S.optional(HttpsPolicy),
  }),
).annotate({
  identifier: "TrackingOptions",
}) as any as S.Schema<TrackingOptions>;
export type TlsPolicy = "REQUIRE" | "OPTIONAL" | (string & {});
export const TlsPolicy = S.String;

export type PoolName = string;
export type MaxDeliverySeconds = number;
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
  MaxDeliverySeconds?: number;
}
export const DeliveryOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TlsPolicy: S.optional(TlsPolicy),
    SendingPoolName: S.optional(S.String),
    MaxDeliverySeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeliveryOptions",
}) as any as S.Schema<DeliveryOptions>;
export type Enabled = boolean;
export type LastFreshStart = Date;
export interface ReputationOptions {
  ReputationMetricsEnabled?: boolean;
  LastFreshStart?: Date;
}
export const ReputationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReputationMetricsEnabled: S.optional(S.Boolean),
    LastFreshStart: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ReputationOptions",
}) as any as S.Schema<ReputationOptions>;
export interface SendingOptions {
  SendingEnabled?: boolean;
}
export const SendingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SendingEnabled: S.optional(S.Boolean) }),
).annotate({ identifier: "SendingOptions" }) as any as S.Schema<SendingOptions>;
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
export type SuppressionListReason = "BOUNCE" | "COMPLAINT" | (string & {});
export const SuppressionListReason = S.String;

export type SuppressionListReasons = SuppressionListReason[];
export const SuppressionListReasons = /*@__PURE__*/ S.Array(
  SuppressionListReason,
);
export type SuppressionListScope = "ACCOUNT" | "TENANT" | (string & {});
export const SuppressionListScope = S.String;

export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export const FeatureStatus = S.String;

export type SuppressionConfidenceVerdictThreshold =
  | "MEDIUM"
  | "HIGH"
  | "MANAGED"
  | (string & {});
export const SuppressionConfidenceVerdictThreshold = S.String;

export interface SuppressionConfidenceThreshold {
  ConfidenceVerdictThreshold: SuppressionConfidenceVerdictThreshold;
}
export const SuppressionConfidenceThreshold = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfidenceVerdictThreshold: SuppressionConfidenceVerdictThreshold,
  }),
).annotate({
  identifier: "SuppressionConfidenceThreshold",
}) as any as S.Schema<SuppressionConfidenceThreshold>;
export interface SuppressionConditionThreshold {
  ConditionThresholdEnabled: FeatureStatus;
  OverallConfidenceThreshold?: SuppressionConfidenceThreshold;
}
export const SuppressionConditionThreshold = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConditionThresholdEnabled: FeatureStatus,
    OverallConfidenceThreshold: S.optional(SuppressionConfidenceThreshold),
  }),
).annotate({
  identifier: "SuppressionConditionThreshold",
}) as any as S.Schema<SuppressionConditionThreshold>;
export interface SuppressionValidationOptions {
  ConditionThreshold: SuppressionConditionThreshold;
}
export const SuppressionValidationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConditionThreshold: SuppressionConditionThreshold }),
).annotate({
  identifier: "SuppressionValidationOptions",
}) as any as S.Schema<SuppressionValidationOptions>;
export interface SuppressionOptions {
  SuppressedReasons?: SuppressionListReason[];
  SuppressionScope?: SuppressionListScope;
  ValidationOptions?: SuppressionValidationOptions;
}
export const SuppressionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuppressedReasons: S.optional(SuppressionListReasons),
    SuppressionScope: S.optional(SuppressionListScope),
    ValidationOptions: S.optional(SuppressionValidationOptions),
  }),
).annotate({
  identifier: "SuppressionOptions",
}) as any as S.Schema<SuppressionOptions>;
export interface DashboardOptions {
  EngagementMetrics?: FeatureStatus;
}
export const DashboardOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EngagementMetrics: S.optional(FeatureStatus) }),
).annotate({
  identifier: "DashboardOptions",
}) as any as S.Schema<DashboardOptions>;
export interface GuardianOptions {
  OptimizedSharedDelivery?: FeatureStatus;
}
export const GuardianOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OptimizedSharedDelivery: S.optional(FeatureStatus) }),
).annotate({
  identifier: "GuardianOptions",
}) as any as S.Schema<GuardianOptions>;
export interface VdmOptions {
  DashboardOptions?: DashboardOptions;
  GuardianOptions?: GuardianOptions;
}
export const VdmOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardOptions: S.optional(DashboardOptions),
    GuardianOptions: S.optional(GuardianOptions),
  }),
).annotate({ identifier: "VdmOptions" }) as any as S.Schema<VdmOptions>;
export type ArchiveArn = string;
export interface ArchivingOptions {
  ArchiveArn?: string;
}
export const ArchivingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchiveArn: S.optional(S.String) }),
).annotate({
  identifier: "ArchivingOptions",
}) as any as S.Schema<ArchivingOptions>;
export interface CreateConfigurationSetRequest {
  ConfigurationSetName: string;
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
  SuppressionOptions?: SuppressionOptions;
  VdmOptions?: VdmOptions;
  ArchivingOptions?: ArchivingOptions;
}
export const CreateConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    TrackingOptions: S.optional(TrackingOptions),
    DeliveryOptions: S.optional(DeliveryOptions),
    ReputationOptions: S.optional(ReputationOptions),
    SendingOptions: S.optional(SendingOptions),
    Tags: S.optional(TagList),
    SuppressionOptions: S.optional(SuppressionOptions),
    VdmOptions: S.optional(VdmOptions),
    ArchivingOptions: S.optional(ArchivingOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/configuration-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationSetRequest",
}) as any as S.Schema<CreateConfigurationSetRequest>;
export interface CreateConfigurationSetResponse {}
export const CreateConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateConfigurationSetResponse",
}) as any as S.Schema<CreateConfigurationSetResponse>;
export type EventDestinationName = string;
export type EventType =
  | "SEND"
  | "REJECT"
  | "BOUNCE"
  | "COMPLAINT"
  | "DELIVERY"
  | "OPEN"
  | "CLICK"
  | "RENDERING_FAILURE"
  | "DELIVERY_DELAY"
  | "SUBSCRIPTION"
  | (string & {});
export const EventType = S.String;

export type EventTypes = EventType[];
export const EventTypes = /*@__PURE__*/ S.Array(EventType);
export type AmazonResourceName = string;
export interface KinesisFirehoseDestination {
  IamRoleArn: string;
  DeliveryStreamArn: string;
}
export const KinesisFirehoseDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IamRoleArn: S.String, DeliveryStreamArn: S.String }),
).annotate({
  identifier: "KinesisFirehoseDestination",
}) as any as S.Schema<KinesisFirehoseDestination>;
export type DimensionName = string;
export type DimensionValueSource =
  | "MESSAGE_TAG"
  | "EMAIL_HEADER"
  | "LINK_TAG"
  | (string & {});
export const DimensionValueSource = S.String;

export type DefaultDimensionValue = string;
export interface CloudWatchDimensionConfiguration {
  DimensionName: string;
  DimensionValueSource: DimensionValueSource;
  DefaultDimensionValue: string;
}
export const CloudWatchDimensionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DimensionName: S.String,
    DimensionValueSource: DimensionValueSource,
    DefaultDimensionValue: S.String,
  }),
).annotate({
  identifier: "CloudWatchDimensionConfiguration",
}) as any as S.Schema<CloudWatchDimensionConfiguration>;
export type CloudWatchDimensionConfigurations =
  CloudWatchDimensionConfiguration[];
export const CloudWatchDimensionConfigurations = /*@__PURE__*/ S.Array(
  CloudWatchDimensionConfiguration,
);
export interface CloudWatchDestination {
  DimensionConfigurations: CloudWatchDimensionConfiguration[];
}
export const CloudWatchDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DimensionConfigurations: CloudWatchDimensionConfigurations }),
).annotate({
  identifier: "CloudWatchDestination",
}) as any as S.Schema<CloudWatchDestination>;
export interface SnsDestination {
  TopicArn: string;
}
export const SnsDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.String }),
).annotate({ identifier: "SnsDestination" }) as any as S.Schema<SnsDestination>;
export interface EventBridgeDestination {
  EventBusArn: string;
}
export const EventBridgeDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventBusArn: S.String }),
).annotate({
  identifier: "EventBridgeDestination",
}) as any as S.Schema<EventBridgeDestination>;
export interface PinpointDestination {
  ApplicationArn?: string;
}
export const PinpointDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationArn: S.optional(S.String) }),
).annotate({
  identifier: "PinpointDestination",
}) as any as S.Schema<PinpointDestination>;
export interface EventDestinationDefinition {
  Enabled?: boolean;
  MatchingEventTypes?: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SnsDestination?: SnsDestination;
  EventBridgeDestination?: EventBridgeDestination;
  PinpointDestination?: PinpointDestination;
}
export const EventDestinationDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    MatchingEventTypes: S.optional(EventTypes),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    CloudWatchDestination: S.optional(CloudWatchDestination),
    SnsDestination: S.optional(SnsDestination),
    EventBridgeDestination: S.optional(EventBridgeDestination),
    PinpointDestination: S.optional(PinpointDestination),
  }),
).annotate({
  identifier: "EventDestinationDefinition",
}) as any as S.Schema<EventDestinationDefinition>;
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export const CreateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String,
      EventDestination: EventDestinationDefinition,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>;
export interface CreateConfigurationSetEventDestinationResponse {}
export const CreateConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>;
export type ContactListName = string;
export type EmailAddress = string;
export type TopicName = string;
export type SubscriptionStatus = "OPT_IN" | "OPT_OUT" | (string & {});
export const SubscriptionStatus = S.String;

export interface TopicPreference {
  TopicName: string;
  SubscriptionStatus: SubscriptionStatus;
}
export const TopicPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicName: S.String, SubscriptionStatus: SubscriptionStatus }),
).annotate({
  identifier: "TopicPreference",
}) as any as S.Schema<TopicPreference>;
export type TopicPreferenceList = TopicPreference[];
export const TopicPreferenceList = /*@__PURE__*/ S.Array(TopicPreference);
export type UnsubscribeAll = boolean;
export type AttributesData = string;
export interface CreateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  AttributesData?: string;
}
export const CreateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
    EmailAddress: S.String,
    TopicPreferences: S.optional(TopicPreferenceList),
    UnsubscribeAll: S.optional(S.Boolean),
    AttributesData: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/email/contact-lists/{ContactListName}/contacts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContactRequest",
}) as any as S.Schema<CreateContactRequest>;
export interface CreateContactResponse {}
export const CreateContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateContactResponse",
}) as any as S.Schema<CreateContactResponse>;
export type DisplayName = string;
export type Description = string;
export interface Topic {
  TopicName: string;
  DisplayName: string;
  Description?: string;
  DefaultSubscriptionStatus: SubscriptionStatus;
}
export const Topic = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicName: S.String,
    DisplayName: S.String,
    Description: S.optional(S.String),
    DefaultSubscriptionStatus: SubscriptionStatus,
  }),
).annotate({ identifier: "Topic" }) as any as S.Schema<Topic>;
export type Topics = Topic[];
export const Topics = /*@__PURE__*/ S.Array(Topic);
export interface CreateContactListRequest {
  ContactListName: string;
  Topics?: Topic[];
  Description?: string;
  Tags?: Tag[];
}
export const CreateContactListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String,
    Topics: S.optional(Topics),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/contact-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateContactListRequest",
}) as any as S.Schema<CreateContactListRequest>;
export interface CreateContactListResponse {}
export const CreateContactListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateContactListResponse",
}) as any as S.Schema<CreateContactListResponse>;
export type EmailTemplateName = string;
export type EmailTemplateSubject = string;
export type TemplateContent = string;
export type SuccessRedirectionURL = string;
export type FailureRedirectionURL = string;
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  Tags?: Tag[];
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export const CreateCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TemplateName: S.String,
      FromEmailAddress: S.String,
      TemplateSubject: S.String,
      TemplateContent: S.String,
      Tags: S.optional(TagList),
      SuccessRedirectionURL: S.String,
      FailureRedirectionURL: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/email/custom-verification-email-templates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<CreateCustomVerificationEmailTemplateRequest>;
export interface CreateCustomVerificationEmailTemplateResponse {}
export const CreateCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<CreateCustomVerificationEmailTemplateResponse>;
export type ScalingMode = "STANDARD" | "MANAGED" | (string & {});
export const ScalingMode = S.String;

export interface CreateDedicatedIpPoolRequest {
  PoolName: string;
  Tags?: Tag[];
  ScalingMode?: ScalingMode;
}
export const CreateDedicatedIpPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolName: S.String,
    Tags: S.optional(TagList),
    ScalingMode: S.optional(ScalingMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/dedicated-ip-pools" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDedicatedIpPoolRequest",
}) as any as S.Schema<CreateDedicatedIpPoolRequest>;
export interface CreateDedicatedIpPoolResponse {}
export const CreateDedicatedIpPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateDedicatedIpPoolResponse",
}) as any as S.Schema<CreateDedicatedIpPoolResponse>;
export type ReportName = string;
export type MessageData = string;
export type Charset = string;
export interface Content {
  Data: string;
  Charset?: string;
}
export const Content = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.String, Charset: S.optional(S.String) }),
).annotate({ identifier: "Content" }) as any as S.Schema<Content>;
export interface Body {
  Text?: Content;
  Html?: Content;
}
export const Body = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.optional(Content), Html: S.optional(Content) }),
).annotate({ identifier: "Body" }) as any as S.Schema<Body>;
export type MessageHeaderName = string;
export type MessageHeaderValue = string;
export interface MessageHeader {
  Name: string;
  Value: string;
}
export const MessageHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "MessageHeader" }) as any as S.Schema<MessageHeader>;
export type MessageHeaderList = MessageHeader[];
export const MessageHeaderList = /*@__PURE__*/ S.Array(MessageHeader);
export type RawAttachmentData = Uint8Array;
export type AttachmentContentDisposition =
  | "ATTACHMENT"
  | "INLINE"
  | (string & {});
export const AttachmentContentDisposition = S.String;

export type AttachmentFileName = string;
export type AttachmentContentDescription = string;
export type AttachmentContentId = string;
export type AttachmentContentTransferEncoding =
  | "BASE64"
  | "QUOTED_PRINTABLE"
  | "SEVEN_BIT"
  | (string & {});
export const AttachmentContentTransferEncoding = S.String;

export type AttachmentContentType = string;
export interface Attachment {
  RawContent: Uint8Array;
  ContentDisposition?: AttachmentContentDisposition;
  FileName: string;
  ContentDescription?: string;
  ContentId?: string;
  ContentTransferEncoding?: AttachmentContentTransferEncoding;
  ContentType?: string;
}
export const Attachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RawContent: T.Blob,
    ContentDisposition: S.optional(AttachmentContentDisposition),
    FileName: S.String,
    ContentDescription: S.optional(S.String),
    ContentId: S.optional(S.String),
    ContentTransferEncoding: S.optional(AttachmentContentTransferEncoding),
    ContentType: S.optional(S.String),
  }),
).annotate({ identifier: "Attachment" }) as any as S.Schema<Attachment>;
export type AttachmentList = Attachment[];
export const AttachmentList = /*@__PURE__*/ S.Array(Attachment);
export interface Message {
  Subject: Content;
  Body: Body;
  Headers?: MessageHeader[];
  Attachments?: Attachment[];
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subject: Content,
    Body: Body,
    Headers: S.optional(MessageHeaderList),
    Attachments: S.optional(AttachmentList),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export const RawMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: T.Blob }),
).annotate({ identifier: "RawMessage" }) as any as S.Schema<RawMessage>;
export type EmailTemplateText = string;
export type EmailTemplateHtml = string;
export interface EmailTemplateContent {
  Subject?: string;
  Text?: string;
  Html?: string;
}
export const EmailTemplateContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subject: S.optional(S.String),
    Text: S.optional(S.String),
    Html: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailTemplateContent",
}) as any as S.Schema<EmailTemplateContent>;
export type EmailTemplateData = string;
export interface Template {
  TemplateName?: string;
  TemplateArn?: string;
  TemplateContent?: EmailTemplateContent;
  TemplateData?: string;
  Headers?: MessageHeader[];
  Attachments?: Attachment[];
}
export const Template = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    TemplateArn: S.optional(S.String),
    TemplateContent: S.optional(EmailTemplateContent),
    TemplateData: S.optional(S.String),
    Headers: S.optional(MessageHeaderList),
    Attachments: S.optional(AttachmentList),
  }),
).annotate({ identifier: "Template" }) as any as S.Schema<Template>;
export interface EmailContent {
  Simple?: Message;
  Raw?: RawMessage;
  Template?: Template;
}
export const EmailContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Simple: S.optional(Message),
    Raw: S.optional(RawMessage),
    Template: S.optional(Template),
  }),
).annotate({ identifier: "EmailContent" }) as any as S.Schema<EmailContent>;
export interface CreateDeliverabilityTestReportRequest {
  ReportName?: string;
  FromEmailAddress: string;
  Content: EmailContent;
  Tags?: Tag[];
}
export const CreateDeliverabilityTestReportRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReportName: S.optional(S.String),
      FromEmailAddress: S.String,
      Content: EmailContent,
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/email/deliverability-dashboard/test",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDeliverabilityTestReportRequest",
}) as any as S.Schema<CreateDeliverabilityTestReportRequest>;
export type ReportId = string;
export type DeliverabilityTestStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | (string & {});
export const DeliverabilityTestStatus = S.String;

export interface CreateDeliverabilityTestReportResponse {
  ReportId: string;
  DeliverabilityTestStatus: DeliverabilityTestStatus;
}
export const CreateDeliverabilityTestReportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReportId: S.String,
      DeliverabilityTestStatus: DeliverabilityTestStatus,
    }),
).annotate({
  identifier: "CreateDeliverabilityTestReportResponse",
}) as any as S.Schema<CreateDeliverabilityTestReportResponse>;
export type Identity = string;
export type Selector = string;
export type PrivateKey = string | redacted.Redacted<string>;
export type DkimSigningKeyLength =
  | "RSA_1024_BIT"
  | "RSA_2048_BIT"
  | (string & {});
export const DkimSigningKeyLength = S.String;

export type DkimSigningAttributesOrigin =
  | "AWS_SES"
  | "EXTERNAL"
  | "AWS_SES_AF_SOUTH_1"
  | "AWS_SES_EU_NORTH_1"
  | "AWS_SES_AP_SOUTH_1"
  | "AWS_SES_EU_WEST_3"
  | "AWS_SES_EU_WEST_2"
  | "AWS_SES_EU_SOUTH_1"
  | "AWS_SES_EU_WEST_1"
  | "AWS_SES_AP_NORTHEAST_3"
  | "AWS_SES_AP_NORTHEAST_2"
  | "AWS_SES_ME_SOUTH_1"
  | "AWS_SES_AP_NORTHEAST_1"
  | "AWS_SES_IL_CENTRAL_1"
  | "AWS_SES_SA_EAST_1"
  | "AWS_SES_CA_CENTRAL_1"
  | "AWS_SES_AP_SOUTHEAST_1"
  | "AWS_SES_AP_SOUTHEAST_2"
  | "AWS_SES_AP_SOUTHEAST_3"
  | "AWS_SES_EU_CENTRAL_1"
  | "AWS_SES_US_EAST_1"
  | "AWS_SES_US_EAST_2"
  | "AWS_SES_US_WEST_1"
  | "AWS_SES_US_WEST_2"
  | "AWS_SES_ME_CENTRAL_1"
  | "AWS_SES_AP_SOUTH_2"
  | "AWS_SES_EU_CENTRAL_2"
  | "AWS_SES_AP_SOUTHEAST_5"
  | "AWS_SES_CA_WEST_1"
  | "AWS_SES_US_GOV_EAST_1"
  | "AWS_SES_US_GOV_WEST_1"
  | (string & {});
export const DkimSigningAttributesOrigin = S.String;

export interface DkimSigningAttributes {
  DomainSigningSelector?: string;
  DomainSigningPrivateKey?: string | redacted.Redacted<string>;
  NextSigningKeyLength?: DkimSigningKeyLength;
  DomainSigningAttributesOrigin?: DkimSigningAttributesOrigin;
}
export const DkimSigningAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainSigningSelector: S.optional(S.String),
    DomainSigningPrivateKey: S.optional(SensitiveString),
    NextSigningKeyLength: S.optional(DkimSigningKeyLength),
    DomainSigningAttributesOrigin: S.optional(DkimSigningAttributesOrigin),
  }),
).annotate({
  identifier: "DkimSigningAttributes",
}) as any as S.Schema<DkimSigningAttributes>;
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[];
  DkimSigningAttributes?: DkimSigningAttributes;
  ConfigurationSetName?: string;
}
export const CreateEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailIdentity: S.String,
    Tags: S.optional(TagList),
    DkimSigningAttributes: S.optional(DkimSigningAttributes),
    ConfigurationSetName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/identities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEmailIdentityRequest",
}) as any as S.Schema<CreateEmailIdentityRequest>;
export type IdentityType =
  | "EMAIL_ADDRESS"
  | "DOMAIN"
  | "MANAGED_DOMAIN"
  | (string & {});
export const IdentityType = S.String;

export type DkimStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | "NOT_STARTED"
  | (string & {});
export const DkimStatus = S.String;

export type DnsToken = string;
export type DnsTokenList = string[];
export const DnsTokenList = /*@__PURE__*/ S.Array(S.String);
export type HostedZone = string;
export interface DkimAttributes {
  SigningEnabled?: boolean;
  Status?: DkimStatus;
  Tokens?: string[];
  SigningHostedZone?: string;
  SigningAttributesOrigin?: DkimSigningAttributesOrigin;
  NextSigningKeyLength?: DkimSigningKeyLength;
  CurrentSigningKeyLength?: DkimSigningKeyLength;
  LastKeyGenerationTimestamp?: Date;
}
export const DkimAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SigningEnabled: S.optional(S.Boolean),
    Status: S.optional(DkimStatus),
    Tokens: S.optional(DnsTokenList),
    SigningHostedZone: S.optional(S.String),
    SigningAttributesOrigin: S.optional(DkimSigningAttributesOrigin),
    NextSigningKeyLength: S.optional(DkimSigningKeyLength),
    CurrentSigningKeyLength: S.optional(DkimSigningKeyLength),
    LastKeyGenerationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "DkimAttributes" }) as any as S.Schema<DkimAttributes>;
export interface CreateEmailIdentityResponse {
  IdentityType?: IdentityType;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
}
export const CreateEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    VerifiedForSendingStatus: S.optional(S.Boolean),
    DkimAttributes: S.optional(DkimAttributes),
  }),
).annotate({
  identifier: "CreateEmailIdentityResponse",
}) as any as S.Schema<CreateEmailIdentityResponse>;
export type PolicyName = string;
export type Policy = string;
export interface CreateEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
  Policy: string;
}
export const CreateEmailIdentityPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
    PolicyName: S.String.pipe(T.HttpLabel("PolicyName")),
    Policy: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEmailIdentityPolicyRequest",
}) as any as S.Schema<CreateEmailIdentityPolicyRequest>;
export interface CreateEmailIdentityPolicyResponse {}
export const CreateEmailIdentityPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateEmailIdentityPolicyResponse",
}) as any as S.Schema<CreateEmailIdentityPolicyResponse>;
export interface CreateEmailTemplateRequest {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
  Tags?: Tag[];
}
export const CreateEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String,
    TemplateContent: EmailTemplateContent,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEmailTemplateRequest",
}) as any as S.Schema<CreateEmailTemplateRequest>;
export interface CreateEmailTemplateResponse {}
export const CreateEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateEmailTemplateResponse",
}) as any as S.Schema<CreateEmailTemplateResponse>;
export type ExportDimensionValue = string[];
export const ExportDimensionValue = /*@__PURE__*/ S.Array(S.String);
export type ExportDimensions = { [key in MetricDimensionName]?: string[] };
export const ExportDimensions = /*@__PURE__*/ S.Record(
  MetricDimensionName,
  ExportDimensionValue.pipe(S.optional),
);
export type MetricAggregation = "RATE" | "VOLUME" | (string & {});
export const MetricAggregation = S.String;

export interface ExportMetric {
  Name?: Metric;
  Aggregation?: MetricAggregation;
}
export const ExportMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(Metric),
    Aggregation: S.optional(MetricAggregation),
  }),
).annotate({ identifier: "ExportMetric" }) as any as S.Schema<ExportMetric>;
export type ExportMetrics = ExportMetric[];
export const ExportMetrics = /*@__PURE__*/ S.Array(ExportMetric);
export interface MetricsDataSource {
  Dimensions: { [key: string]: string[] | undefined };
  Namespace: MetricNamespace;
  Metrics: ExportMetric[];
  StartDate: Date;
  EndDate: Date;
}
export const MetricsDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: ExportDimensions,
    Namespace: MetricNamespace,
    Metrics: ExportMetrics,
    StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "MetricsDataSource",
}) as any as S.Schema<MetricsDataSource>;
export type InsightsEmailAddress = string | redacted.Redacted<string>;
export type EmailAddressFilterList = (string | redacted.Redacted<string>)[];
export const EmailAddressFilterList = /*@__PURE__*/ S.Array(SensitiveString);
export type EmailSubject = string | redacted.Redacted<string>;
export type EmailSubjectFilterList = (string | redacted.Redacted<string>)[];
export const EmailSubjectFilterList = /*@__PURE__*/ S.Array(SensitiveString);
export type Isp = string;
export type IspFilterList = string[];
export const IspFilterList = /*@__PURE__*/ S.Array(S.String);
export type DeliveryEventType =
  | "SEND"
  | "DELIVERY"
  | "TRANSIENT_BOUNCE"
  | "PERMANENT_BOUNCE"
  | "UNDETERMINED_BOUNCE"
  | "COMPLAINT"
  | (string & {});
export const DeliveryEventType = S.String;

export type LastDeliveryEventList = DeliveryEventType[];
export const LastDeliveryEventList = /*@__PURE__*/ S.Array(DeliveryEventType);
export type EngagementEventType = "OPEN" | "CLICK" | (string & {});
export const EngagementEventType = S.String;

export type LastEngagementEventList = EngagementEventType[];
export const LastEngagementEventList =
  /*@__PURE__*/ S.Array(EngagementEventType);
export interface MessageInsightsFilters {
  FromEmailAddress?: (string | redacted.Redacted<string>)[];
  Destination?: (string | redacted.Redacted<string>)[];
  Subject?: (string | redacted.Redacted<string>)[];
  Isp?: string[];
  LastDeliveryEvent?: DeliveryEventType[];
  LastEngagementEvent?: EngagementEventType[];
}
export const MessageInsightsFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromEmailAddress: S.optional(EmailAddressFilterList),
    Destination: S.optional(EmailAddressFilterList),
    Subject: S.optional(EmailSubjectFilterList),
    Isp: S.optional(IspFilterList),
    LastDeliveryEvent: S.optional(LastDeliveryEventList),
    LastEngagementEvent: S.optional(LastEngagementEventList),
  }),
).annotate({
  identifier: "MessageInsightsFilters",
}) as any as S.Schema<MessageInsightsFilters>;
export type MessageInsightsExportMaxResults = number;
export interface MessageInsightsDataSource {
  StartDate: Date;
  EndDate: Date;
  Include?: MessageInsightsFilters;
  Exclude?: MessageInsightsFilters;
  MaxResults?: number;
}
export const MessageInsightsDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Include: S.optional(MessageInsightsFilters),
    Exclude: S.optional(MessageInsightsFilters),
    MaxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "MessageInsightsDataSource",
}) as any as S.Schema<MessageInsightsDataSource>;
export interface ExportDataSource {
  MetricsDataSource?: MetricsDataSource;
  MessageInsightsDataSource?: MessageInsightsDataSource;
}
export const ExportDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricsDataSource: S.optional(MetricsDataSource),
    MessageInsightsDataSource: S.optional(MessageInsightsDataSource),
  }),
).annotate({
  identifier: "ExportDataSource",
}) as any as S.Schema<ExportDataSource>;
export type DataFormat = "CSV" | "JSON" | (string & {});
export const DataFormat = S.String;

export type S3Url = string;
export interface ExportDestination {
  DataFormat: DataFormat;
  S3Url?: string;
}
export const ExportDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataFormat: DataFormat, S3Url: S.optional(S.String) }),
).annotate({
  identifier: "ExportDestination",
}) as any as S.Schema<ExportDestination>;
export interface CreateExportJobRequest {
  ExportDataSource: ExportDataSource;
  ExportDestination: ExportDestination;
}
export const CreateExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportDataSource: ExportDataSource,
    ExportDestination: ExportDestination,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/export-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExportJobRequest",
}) as any as S.Schema<CreateExportJobRequest>;
export interface CreateExportJobResponse {
  JobId?: string;
}
export const CreateExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "CreateExportJobResponse",
}) as any as S.Schema<CreateExportJobResponse>;
export type SuppressionListImportAction = "DELETE" | "PUT" | (string & {});
export const SuppressionListImportAction = S.String;

export interface SuppressionListDestination {
  SuppressionListImportAction: SuppressionListImportAction;
}
export const SuppressionListDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SuppressionListImportAction: SuppressionListImportAction }),
).annotate({
  identifier: "SuppressionListDestination",
}) as any as S.Schema<SuppressionListDestination>;
export type ContactListImportAction = "DELETE" | "PUT" | (string & {});
export const ContactListImportAction = S.String;

export interface ContactListDestination {
  ContactListName: string;
  ContactListImportAction: ContactListImportAction;
}
export const ContactListDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String,
    ContactListImportAction: ContactListImportAction,
  }),
).annotate({
  identifier: "ContactListDestination",
}) as any as S.Schema<ContactListDestination>;
export interface ImportDestination {
  SuppressionListDestination?: SuppressionListDestination;
  ContactListDestination?: ContactListDestination;
}
export const ImportDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuppressionListDestination: S.optional(SuppressionListDestination),
    ContactListDestination: S.optional(ContactListDestination),
  }),
).annotate({
  identifier: "ImportDestination",
}) as any as S.Schema<ImportDestination>;
export interface ImportDataSource {
  S3Url: string;
  DataFormat: DataFormat;
}
export const ImportDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Url: S.String, DataFormat: DataFormat }),
).annotate({
  identifier: "ImportDataSource",
}) as any as S.Schema<ImportDataSource>;
export interface CreateImportJobRequest {
  ImportDestination: ImportDestination;
  ImportDataSource: ImportDataSource;
}
export const CreateImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportDestination: ImportDestination,
    ImportDataSource: ImportDataSource,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/import-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateImportJobRequest",
}) as any as S.Schema<CreateImportJobRequest>;
export interface CreateImportJobResponse {
  JobId?: string;
}
export const CreateImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "CreateImportJobResponse",
}) as any as S.Schema<CreateImportJobResponse>;
export type EndpointName = string;
export type Region = string;
export interface RouteDetails {
  Region: string;
}
export const RouteDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Region: S.String }),
).annotate({ identifier: "RouteDetails" }) as any as S.Schema<RouteDetails>;
export type RoutesDetails = RouteDetails[];
export const RoutesDetails = /*@__PURE__*/ S.Array(RouteDetails);
export interface Details {
  RoutesDetails: RouteDetails[];
}
export const Details = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoutesDetails: RoutesDetails }),
).annotate({ identifier: "Details" }) as any as S.Schema<Details>;
export interface CreateMultiRegionEndpointRequest {
  EndpointName: string;
  Details: Details;
  Tags?: Tag[];
}
export const CreateMultiRegionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.String,
    Details: Details,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/multi-region-endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMultiRegionEndpointRequest",
}) as any as S.Schema<CreateMultiRegionEndpointRequest>;
export type Status =
  | "CREATING"
  | "READY"
  | "FAILED"
  | "DELETING"
  | (string & {});
export const Status = S.String;

export type EndpointId = string;
export interface CreateMultiRegionEndpointResponse {
  Status?: Status;
  EndpointId?: string;
}
export const CreateMultiRegionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(Status), EndpointId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMultiRegionEndpointResponse",
}) as any as S.Schema<CreateMultiRegionEndpointResponse>;
export type TenantName = string;
export interface TenantSuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[];
  SuppressionScope?: SuppressionListScope;
}
export const TenantSuppressionAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuppressedReasons: S.optional(SuppressionListReasons),
    SuppressionScope: S.optional(SuppressionListScope),
  }),
).annotate({
  identifier: "TenantSuppressionAttributes",
}) as any as S.Schema<TenantSuppressionAttributes>;
export interface CreateTenantRequest {
  TenantName: string;
  Tags?: Tag[];
  SuppressionAttributes?: TenantSuppressionAttributes;
}
export const CreateTenantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.String,
    Tags: S.optional(TagList),
    SuppressionAttributes: S.optional(TenantSuppressionAttributes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/tenants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTenantRequest",
}) as any as S.Schema<CreateTenantRequest>;
export type TenantId = string;
export type SendingStatus =
  | "ENABLED"
  | "REINSTATED"
  | "DISABLED"
  | (string & {});
export const SendingStatus = S.String;

export interface CreateTenantResponse {
  TenantName?: string;
  TenantId?: string;
  TenantArn?: string;
  CreatedTimestamp?: Date;
  Tags?: Tag[];
  SendingStatus?: SendingStatus;
  SuppressionAttributes?: TenantSuppressionAttributes;
}
export const CreateTenantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.optional(S.String),
    TenantId: S.optional(S.String),
    TenantArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Tags: S.optional(TagList),
    SendingStatus: S.optional(SendingStatus),
    SuppressionAttributes: S.optional(TenantSuppressionAttributes),
  }),
).annotate({
  identifier: "CreateTenantResponse",
}) as any as S.Schema<CreateTenantResponse>;
export interface CreateTenantResourceAssociationRequest {
  TenantName: string;
  ResourceArn: string;
}
export const CreateTenantResourceAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ TenantName: S.String, ResourceArn: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/email/tenants/resources" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTenantResourceAssociationRequest",
}) as any as S.Schema<CreateTenantResourceAssociationRequest>;
export interface CreateTenantResourceAssociationResponse {}
export const CreateTenantResourceAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "CreateTenantResourceAssociationResponse",
}) as any as S.Schema<CreateTenantResourceAssociationResponse>;
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const DeleteConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/configuration-sets/{ConfigurationSetName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationSetRequest",
}) as any as S.Schema<DeleteConfigurationSetRequest>;
export interface DeleteConfigurationSetResponse {}
export const DeleteConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationSetResponse",
}) as any as S.Schema<DeleteConfigurationSetResponse>;
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export const DeleteConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>;
export interface DeleteConfigurationSetEventDestinationResponse {}
export const DeleteConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>;
export interface DeleteContactRequest {
  ContactListName: string;
  EmailAddress: string;
}
export const DeleteContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
    EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContactRequest",
}) as any as S.Schema<DeleteContactRequest>;
export interface DeleteContactResponse {}
export const DeleteContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContactResponse",
}) as any as S.Schema<DeleteContactResponse>;
export interface DeleteContactListRequest {
  ContactListName: string;
}
export const DeleteContactListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/contact-lists/{ContactListName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteContactListRequest",
}) as any as S.Schema<DeleteContactListRequest>;
export interface DeleteContactListResponse {}
export const DeleteContactListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContactListResponse",
}) as any as S.Schema<DeleteContactListResponse>;
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export const DeleteCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/email/custom-verification-email-templates/{TemplateName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<DeleteCustomVerificationEmailTemplateRequest>;
export interface DeleteCustomVerificationEmailTemplateResponse {}
export const DeleteCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<DeleteCustomVerificationEmailTemplateResponse>;
export interface DeleteDedicatedIpPoolRequest {
  PoolName: string;
}
export const DeleteDedicatedIpPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/dedicated-ip-pools/{PoolName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDedicatedIpPoolRequest",
}) as any as S.Schema<DeleteDedicatedIpPoolRequest>;
export interface DeleteDedicatedIpPoolResponse {}
export const DeleteDedicatedIpPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDedicatedIpPoolResponse",
}) as any as S.Schema<DeleteDedicatedIpPoolResponse>;
export interface DeleteEmailIdentityRequest {
  EmailIdentity: string;
}
export const DeleteEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/email/identities/{EmailIdentity}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEmailIdentityRequest",
}) as any as S.Schema<DeleteEmailIdentityRequest>;
export interface DeleteEmailIdentityResponse {}
export const DeleteEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEmailIdentityResponse",
}) as any as S.Schema<DeleteEmailIdentityResponse>;
export interface DeleteEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
}
export const DeleteEmailIdentityPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
    PolicyName: S.String.pipe(T.HttpLabel("PolicyName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEmailIdentityPolicyRequest",
}) as any as S.Schema<DeleteEmailIdentityPolicyRequest>;
export interface DeleteEmailIdentityPolicyResponse {}
export const DeleteEmailIdentityPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEmailIdentityPolicyResponse",
}) as any as S.Schema<DeleteEmailIdentityPolicyResponse>;
export interface DeleteEmailTemplateRequest {
  TemplateName: string;
}
export const DeleteEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/email/templates/{TemplateName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEmailTemplateRequest",
}) as any as S.Schema<DeleteEmailTemplateRequest>;
export interface DeleteEmailTemplateResponse {}
export const DeleteEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEmailTemplateResponse",
}) as any as S.Schema<DeleteEmailTemplateResponse>;
export interface DeleteMultiRegionEndpointRequest {
  EndpointName: string;
}
export const DeleteMultiRegionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointName: S.String.pipe(T.HttpLabel("EndpointName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/multi-region-endpoints/{EndpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMultiRegionEndpointRequest",
}) as any as S.Schema<DeleteMultiRegionEndpointRequest>;
export interface DeleteMultiRegionEndpointResponse {
  Status?: Status;
}
export const DeleteMultiRegionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(Status) }),
).annotate({
  identifier: "DeleteMultiRegionEndpointResponse",
}) as any as S.Schema<DeleteMultiRegionEndpointResponse>;
export interface DeleteSuppressedDestinationRequest {
  EmailAddress: string;
  TenantName?: string;
}
export const DeleteSuppressedDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
    TenantName: S.optional(S.String).pipe(T.HttpQuery("TenantName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/email/suppression/addresses/{EmailAddress}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSuppressedDestinationRequest",
}) as any as S.Schema<DeleteSuppressedDestinationRequest>;
export interface DeleteSuppressedDestinationResponse {}
export const DeleteSuppressedDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSuppressedDestinationResponse",
}) as any as S.Schema<DeleteSuppressedDestinationResponse>;
export interface DeleteTenantRequest {
  TenantName: string;
}
export const DeleteTenantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TenantName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/tenants/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTenantRequest",
}) as any as S.Schema<DeleteTenantRequest>;
export interface DeleteTenantResponse {}
export const DeleteTenantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTenantResponse",
}) as any as S.Schema<DeleteTenantResponse>;
export interface DeleteTenantResourceAssociationRequest {
  TenantName: string;
  ResourceArn: string;
}
export const DeleteTenantResourceAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ TenantName: S.String, ResourceArn: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/email/tenants/resources/delete" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteTenantResourceAssociationRequest",
}) as any as S.Schema<DeleteTenantResourceAssociationRequest>;
export interface DeleteTenantResourceAssociationResponse {}
export const DeleteTenantResourceAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteTenantResourceAssociationResponse",
}) as any as S.Schema<DeleteTenantResourceAssociationResponse>;
export interface GetAccountRequest {}
export const GetAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/account" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountRequest",
}) as any as S.Schema<GetAccountRequest>;
export type GeneralEnforcementStatus = string;
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface SendQuota {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export const SendQuota = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Max24HourSend: S.optional(S.Number),
    MaxSendRate: S.optional(S.Number),
    SentLast24Hours: S.optional(S.Number),
  }),
).annotate({ identifier: "SendQuota" }) as any as S.Schema<SendQuota>;
export interface SuppressionValidationAttributes {
  ConditionThreshold: SuppressionConditionThreshold;
}
export const SuppressionValidationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConditionThreshold: SuppressionConditionThreshold }),
).annotate({
  identifier: "SuppressionValidationAttributes",
}) as any as S.Schema<SuppressionValidationAttributes>;
export interface SuppressionAttributes {
  SuppressedReasons?: SuppressionListReason[];
  ValidationAttributes?: SuppressionValidationAttributes;
}
export const SuppressionAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuppressedReasons: S.optional(SuppressionListReasons),
    ValidationAttributes: S.optional(SuppressionValidationAttributes),
  }),
).annotate({
  identifier: "SuppressionAttributes",
}) as any as S.Schema<SuppressionAttributes>;
export type MailType = "MARKETING" | "TRANSACTIONAL" | (string & {});
export const MailType = S.String;

export type WebsiteURL = string | redacted.Redacted<string>;
export type ContactLanguage = "EN" | "JA" | (string & {});
export const ContactLanguage = S.String;

export type UseCaseDescription = string | redacted.Redacted<string>;
export type AdditionalContactEmailAddress = string | redacted.Redacted<string>;
export type AdditionalContactEmailAddresses = (
  | string
  | redacted.Redacted<string>
)[];
export const AdditionalContactEmailAddresses =
  /*@__PURE__*/ S.Array(SensitiveString);
export type ReviewStatus =
  | "PENDING"
  | "FAILED"
  | "GRANTED"
  | "DENIED"
  | (string & {});
export const ReviewStatus = S.String;

export type CaseId = string;
export interface ReviewDetails {
  Status?: ReviewStatus;
  CaseId?: string;
}
export const ReviewDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(ReviewStatus), CaseId: S.optional(S.String) }),
).annotate({ identifier: "ReviewDetails" }) as any as S.Schema<ReviewDetails>;
export interface AccountDetails {
  MailType?: MailType;
  WebsiteURL?: string | redacted.Redacted<string>;
  ContactLanguage?: ContactLanguage;
  UseCaseDescription?: string | redacted.Redacted<string>;
  AdditionalContactEmailAddresses?: (string | redacted.Redacted<string>)[];
  ReviewDetails?: ReviewDetails;
}
export const AccountDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailType: S.optional(MailType),
    WebsiteURL: S.optional(SensitiveString),
    ContactLanguage: S.optional(ContactLanguage),
    UseCaseDescription: S.optional(SensitiveString),
    AdditionalContactEmailAddresses: S.optional(
      AdditionalContactEmailAddresses,
    ),
    ReviewDetails: S.optional(ReviewDetails),
  }),
).annotate({ identifier: "AccountDetails" }) as any as S.Schema<AccountDetails>;
export interface DashboardAttributes {
  EngagementMetrics?: FeatureStatus;
}
export const DashboardAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EngagementMetrics: S.optional(FeatureStatus) }),
).annotate({
  identifier: "DashboardAttributes",
}) as any as S.Schema<DashboardAttributes>;
export interface GuardianAttributes {
  OptimizedSharedDelivery?: FeatureStatus;
}
export const GuardianAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OptimizedSharedDelivery: S.optional(FeatureStatus) }),
).annotate({
  identifier: "GuardianAttributes",
}) as any as S.Schema<GuardianAttributes>;
export interface VdmAttributes {
  VdmEnabled: FeatureStatus;
  DashboardAttributes?: DashboardAttributes;
  GuardianAttributes?: GuardianAttributes;
}
export const VdmAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VdmEnabled: FeatureStatus,
    DashboardAttributes: S.optional(DashboardAttributes),
    GuardianAttributes: S.optional(GuardianAttributes),
  }),
).annotate({ identifier: "VdmAttributes" }) as any as S.Schema<VdmAttributes>;
export type PricingPlan =
  | "NONE"
  | "ESSENTIALS"
  | "PRO"
  | "ENTERPRISE"
  | (string & {});
export const PricingPlan = S.String;

export interface PricingAttributes {
  CurrentPlan?: PricingPlan;
  NextPlan?: PricingPlan;
}
export const PricingAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrentPlan: S.optional(PricingPlan),
    NextPlan: S.optional(PricingPlan),
  }),
).annotate({
  identifier: "PricingAttributes",
}) as any as S.Schema<PricingAttributes>;
export interface GetAccountResponse {
  DedicatedIpAutoWarmupEnabled?: boolean;
  EnforcementStatus?: string;
  ProductionAccessEnabled?: boolean;
  SendQuota?: SendQuota;
  SendingEnabled?: boolean;
  SuppressionAttributes?: SuppressionAttributes;
  Details?: AccountDetails;
  VdmAttributes?: VdmAttributes;
  PricingAttributes?: PricingAttributes;
}
export const GetAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedIpAutoWarmupEnabled: S.optional(S.Boolean),
    EnforcementStatus: S.optional(S.String),
    ProductionAccessEnabled: S.optional(S.Boolean),
    SendQuota: S.optional(SendQuota),
    SendingEnabled: S.optional(S.Boolean),
    SuppressionAttributes: S.optional(SuppressionAttributes),
    Details: S.optional(AccountDetails),
    VdmAttributes: S.optional(VdmAttributes),
    PricingAttributes: S.optional(PricingAttributes),
  }),
).annotate({
  identifier: "GetAccountResponse",
}) as any as S.Schema<GetAccountResponse>;
export type BlacklistItemName = string;
export type BlacklistItemNames = string[];
export const BlacklistItemNames = /*@__PURE__*/ S.Array(S.String);
export interface GetBlacklistReportsRequest {
  BlacklistItemNames: string[];
}
export const GetBlacklistReportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlacklistItemNames: BlacklistItemNames.pipe(
      T.HttpQuery("BlacklistItemNames"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/deliverability-dashboard/blacklist-report",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBlacklistReportsRequest",
}) as any as S.Schema<GetBlacklistReportsRequest>;
export type RblName = string;
export type BlacklistingDescription = string;
export interface BlacklistEntry {
  RblName?: string;
  ListingTime?: Date;
  Description?: string;
}
export const BlacklistEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RblName: S.optional(S.String),
    ListingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "BlacklistEntry" }) as any as S.Schema<BlacklistEntry>;
export type BlacklistEntries = BlacklistEntry[];
export const BlacklistEntries = /*@__PURE__*/ S.Array(BlacklistEntry);
export type BlacklistReport = { [key: string]: BlacklistEntry[] | undefined };
export const BlacklistReport = /*@__PURE__*/ S.Record(
  S.String,
  BlacklistEntries.pipe(S.optional),
);
export interface GetBlacklistReportsResponse {
  BlacklistReport: { [key: string]: BlacklistEntry[] | undefined };
}
export const GetBlacklistReportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BlacklistReport: BlacklistReport }),
).annotate({
  identifier: "GetBlacklistReportsResponse",
}) as any as S.Schema<GetBlacklistReportsResponse>;
export interface GetConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const GetConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/configuration-sets/{ConfigurationSetName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationSetRequest",
}) as any as S.Schema<GetConfigurationSetRequest>;
export interface GetConfigurationSetResponse {
  ConfigurationSetName?: string;
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
  SuppressionOptions?: SuppressionOptions;
  VdmOptions?: VdmOptions;
  ArchivingOptions?: ArchivingOptions;
}
export const GetConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.optional(S.String),
    TrackingOptions: S.optional(TrackingOptions),
    DeliveryOptions: S.optional(DeliveryOptions),
    ReputationOptions: S.optional(ReputationOptions),
    SendingOptions: S.optional(SendingOptions),
    Tags: S.optional(TagList),
    SuppressionOptions: S.optional(SuppressionOptions),
    VdmOptions: S.optional(VdmOptions),
    ArchivingOptions: S.optional(ArchivingOptions),
  }),
).annotate({
  identifier: "GetConfigurationSetResponse",
}) as any as S.Schema<GetConfigurationSetResponse>;
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}
export const GetConfigurationSetEventDestinationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetConfigurationSetEventDestinationsRequest",
  }) as any as S.Schema<GetConfigurationSetEventDestinationsRequest>;
export interface EventDestination {
  Name: string;
  Enabled?: boolean;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SnsDestination?: SnsDestination;
  EventBridgeDestination?: EventBridgeDestination;
  PinpointDestination?: PinpointDestination;
}
export const EventDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Enabled: S.optional(S.Boolean),
    MatchingEventTypes: EventTypes,
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    CloudWatchDestination: S.optional(CloudWatchDestination),
    SnsDestination: S.optional(SnsDestination),
    EventBridgeDestination: S.optional(EventBridgeDestination),
    PinpointDestination: S.optional(PinpointDestination),
  }),
).annotate({
  identifier: "EventDestination",
}) as any as S.Schema<EventDestination>;
export type EventDestinations = EventDestination[];
export const EventDestinations = /*@__PURE__*/ S.Array(EventDestination);
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[];
}
export const GetConfigurationSetEventDestinationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EventDestinations: S.optional(EventDestinations) }),
  ).annotate({
    identifier: "GetConfigurationSetEventDestinationsResponse",
  }) as any as S.Schema<GetConfigurationSetEventDestinationsResponse>;
export interface GetContactRequest {
  ContactListName: string;
  EmailAddress: string;
}
export const GetContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
    EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContactRequest",
}) as any as S.Schema<GetContactRequest>;
export interface GetContactResponse {
  ContactListName?: string;
  EmailAddress?: string;
  TopicPreferences?: TopicPreference[];
  TopicDefaultPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  AttributesData?: string;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export const GetContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.optional(S.String),
    EmailAddress: S.optional(S.String),
    TopicPreferences: S.optional(TopicPreferenceList),
    TopicDefaultPreferences: S.optional(TopicPreferenceList),
    UnsubscribeAll: S.optional(S.Boolean),
    AttributesData: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetContactResponse",
}) as any as S.Schema<GetContactResponse>;
export interface GetContactListRequest {
  ContactListName: string;
}
export const GetContactListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/contact-lists/{ContactListName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContactListRequest",
}) as any as S.Schema<GetContactListRequest>;
export interface GetContactListResponse {
  ContactListName?: string;
  Topics?: Topic[];
  Description?: string;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Tags?: Tag[];
}
export const GetContactListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.optional(S.String),
    Topics: S.optional(Topics),
    Description: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetContactListResponse",
}) as any as S.Schema<GetContactListResponse>;
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export const GetCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/email/custom-verification-email-templates/{TemplateName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<GetCustomVerificationEmailTemplateRequest>;
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  Tags?: Tag[];
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export const GetCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TemplateName: S.optional(S.String),
      FromEmailAddress: S.optional(S.String),
      TemplateSubject: S.optional(S.String),
      TemplateContent: S.optional(S.String),
      Tags: S.optional(TagList),
      SuccessRedirectionURL: S.optional(S.String),
      FailureRedirectionURL: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<GetCustomVerificationEmailTemplateResponse>;
export type Ip = string;
export interface GetDedicatedIpRequest {
  Ip: string;
}
export const GetDedicatedIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/dedicated-ips/{Ip}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDedicatedIpRequest",
}) as any as S.Schema<GetDedicatedIpRequest>;
export type WarmupStatus =
  | "IN_PROGRESS"
  | "DONE"
  | "NOT_APPLICABLE"
  | (string & {});
export const WarmupStatus = S.String;

export type Percentage100Wrapper = number;
export interface DedicatedIp {
  Ip: string;
  WarmupStatus: WarmupStatus;
  WarmupPercentage: number;
  PoolName?: string;
}
export const DedicatedIp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ip: S.String,
    WarmupStatus: WarmupStatus,
    WarmupPercentage: S.Number,
    PoolName: S.optional(S.String),
  }),
).annotate({ identifier: "DedicatedIp" }) as any as S.Schema<DedicatedIp>;
export interface GetDedicatedIpResponse {
  DedicatedIp?: DedicatedIp;
}
export const GetDedicatedIpResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DedicatedIp: S.optional(DedicatedIp) }),
).annotate({
  identifier: "GetDedicatedIpResponse",
}) as any as S.Schema<GetDedicatedIpResponse>;
export interface GetDedicatedIpPoolRequest {
  PoolName: string;
}
export const GetDedicatedIpPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/dedicated-ip-pools/{PoolName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDedicatedIpPoolRequest",
}) as any as S.Schema<GetDedicatedIpPoolRequest>;
export interface DedicatedIpPool {
  PoolName: string;
  ScalingMode: ScalingMode;
}
export const DedicatedIpPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolName: S.String, ScalingMode: ScalingMode }),
).annotate({
  identifier: "DedicatedIpPool",
}) as any as S.Schema<DedicatedIpPool>;
export interface GetDedicatedIpPoolResponse {
  DedicatedIpPool?: DedicatedIpPool;
}
export const GetDedicatedIpPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DedicatedIpPool: S.optional(DedicatedIpPool) }),
).annotate({
  identifier: "GetDedicatedIpPoolResponse",
}) as any as S.Schema<GetDedicatedIpPoolResponse>;
export type NextToken = string;
export type MaxItems = number;
export interface GetDedicatedIpsRequest {
  PoolName?: string;
  NextToken?: string;
  PageSize?: number;
}
export const GetDedicatedIpsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolName: S.optional(S.String).pipe(T.HttpQuery("PoolName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/dedicated-ips" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDedicatedIpsRequest",
}) as any as S.Schema<GetDedicatedIpsRequest>;
export type DedicatedIpList = DedicatedIp[];
export const DedicatedIpList = /*@__PURE__*/ S.Array(DedicatedIp);
export interface GetDedicatedIpsResponse {
  DedicatedIps?: DedicatedIp[];
  NextToken?: string;
}
export const GetDedicatedIpsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedIps: S.optional(DedicatedIpList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDedicatedIpsResponse",
}) as any as S.Schema<GetDedicatedIpsResponse>;
export interface GetDeliverabilityDashboardOptionsRequest {}
export const GetDeliverabilityDashboardOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v2/email/deliverability-dashboard" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDeliverabilityDashboardOptionsRequest",
}) as any as S.Schema<GetDeliverabilityDashboardOptionsRequest>;
export type DeliverabilityDashboardAccountStatus =
  | "ACTIVE"
  | "PENDING_EXPIRATION"
  | "DISABLED"
  | (string & {});
export const DeliverabilityDashboardAccountStatus = S.String;

export type Domain = string;
export type IspName = string;
export type IspNameList = string[];
export const IspNameList = /*@__PURE__*/ S.Array(S.String);
export interface InboxPlacementTrackingOption {
  Global?: boolean;
  TrackedIsps?: string[];
}
export const InboxPlacementTrackingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Global: S.optional(S.Boolean),
    TrackedIsps: S.optional(IspNameList),
  }),
).annotate({
  identifier: "InboxPlacementTrackingOption",
}) as any as S.Schema<InboxPlacementTrackingOption>;
export interface DomainDeliverabilityTrackingOption {
  Domain?: string;
  SubscriptionStartDate?: Date;
  InboxPlacementTrackingOption?: InboxPlacementTrackingOption;
}
export const DomainDeliverabilityTrackingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    SubscriptionStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InboxPlacementTrackingOption: S.optional(InboxPlacementTrackingOption),
  }),
).annotate({
  identifier: "DomainDeliverabilityTrackingOption",
}) as any as S.Schema<DomainDeliverabilityTrackingOption>;
export type DomainDeliverabilityTrackingOptions =
  DomainDeliverabilityTrackingOption[];
export const DomainDeliverabilityTrackingOptions = /*@__PURE__*/ S.Array(
  DomainDeliverabilityTrackingOption,
);
export interface GetDeliverabilityDashboardOptionsResponse {
  DashboardEnabled: boolean;
  SubscriptionExpiryDate?: Date;
  AccountStatus?: DeliverabilityDashboardAccountStatus;
  ActiveSubscribedDomains?: DomainDeliverabilityTrackingOption[];
  PendingExpirationSubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export const GetDeliverabilityDashboardOptionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DashboardEnabled: S.Boolean,
      SubscriptionExpiryDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      AccountStatus: S.optional(DeliverabilityDashboardAccountStatus),
      ActiveSubscribedDomains: S.optional(DomainDeliverabilityTrackingOptions),
      PendingExpirationSubscribedDomains: S.optional(
        DomainDeliverabilityTrackingOptions,
      ),
    }),
  ).annotate({
    identifier: "GetDeliverabilityDashboardOptionsResponse",
  }) as any as S.Schema<GetDeliverabilityDashboardOptionsResponse>;
export interface GetDeliverabilityTestReportRequest {
  ReportId: string;
}
export const GetDeliverabilityTestReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportId: S.String.pipe(T.HttpLabel("ReportId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/deliverability-dashboard/test-reports/{ReportId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeliverabilityTestReportRequest",
}) as any as S.Schema<GetDeliverabilityTestReportRequest>;
export type DeliverabilityTestSubject = string;
export interface DeliverabilityTestReport {
  ReportId?: string;
  ReportName?: string;
  Subject?: string;
  FromEmailAddress?: string;
  CreateDate?: Date;
  DeliverabilityTestStatus?: DeliverabilityTestStatus;
}
export const DeliverabilityTestReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportId: S.optional(S.String),
    ReportName: S.optional(S.String),
    Subject: S.optional(S.String),
    FromEmailAddress: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeliverabilityTestStatus: S.optional(DeliverabilityTestStatus),
  }),
).annotate({
  identifier: "DeliverabilityTestReport",
}) as any as S.Schema<DeliverabilityTestReport>;
export type Percentage = number;
export interface PlacementStatistics {
  InboxPercentage?: number;
  SpamPercentage?: number;
  MissingPercentage?: number;
  SpfPercentage?: number;
  DkimPercentage?: number;
}
export const PlacementStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboxPercentage: S.optional(S.Number),
    SpamPercentage: S.optional(S.Number),
    MissingPercentage: S.optional(S.Number),
    SpfPercentage: S.optional(S.Number),
    DkimPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "PlacementStatistics",
}) as any as S.Schema<PlacementStatistics>;
export interface IspPlacement {
  IspName?: string;
  PlacementStatistics?: PlacementStatistics;
}
export const IspPlacement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IspName: S.optional(S.String),
    PlacementStatistics: S.optional(PlacementStatistics),
  }),
).annotate({ identifier: "IspPlacement" }) as any as S.Schema<IspPlacement>;
export type IspPlacements = IspPlacement[];
export const IspPlacements = /*@__PURE__*/ S.Array(IspPlacement);
export type MessageContent = string;
export interface GetDeliverabilityTestReportResponse {
  DeliverabilityTestReport: DeliverabilityTestReport;
  OverallPlacement: PlacementStatistics;
  IspPlacements: IspPlacement[];
  Message?: string;
  Tags?: Tag[];
}
export const GetDeliverabilityTestReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliverabilityTestReport: DeliverabilityTestReport,
    OverallPlacement: PlacementStatistics,
    IspPlacements: IspPlacements,
    Message: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetDeliverabilityTestReportResponse",
}) as any as S.Schema<GetDeliverabilityTestReportResponse>;
export type CampaignId = string;
export interface GetDomainDeliverabilityCampaignRequest {
  CampaignId: string;
}
export const GetDomainDeliverabilityCampaignRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CampaignId: S.String.pipe(T.HttpLabel("CampaignId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/email/deliverability-dashboard/campaigns/{CampaignId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDomainDeliverabilityCampaignRequest",
}) as any as S.Schema<GetDomainDeliverabilityCampaignRequest>;
export type ImageUrl = string;
export type Subject = string;
export type IpList = string[];
export const IpList = /*@__PURE__*/ S.Array(S.String);
export type Volume = number;
export type Esp = string;
export type Esps = string[];
export const Esps = /*@__PURE__*/ S.Array(S.String);
export interface DomainDeliverabilityCampaign {
  CampaignId?: string;
  ImageUrl?: string;
  Subject?: string;
  FromAddress?: string;
  SendingIps?: string[];
  FirstSeenDateTime?: Date;
  LastSeenDateTime?: Date;
  InboxCount?: number;
  SpamCount?: number;
  ReadRate?: number;
  DeleteRate?: number;
  ReadDeleteRate?: number;
  ProjectedVolume?: number;
  Esps?: string[];
}
export const DomainDeliverabilityCampaign = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignId: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    Subject: S.optional(S.String),
    FromAddress: S.optional(S.String),
    SendingIps: S.optional(IpList),
    FirstSeenDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSeenDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InboxCount: S.optional(S.Number),
    SpamCount: S.optional(S.Number),
    ReadRate: S.optional(S.Number),
    DeleteRate: S.optional(S.Number),
    ReadDeleteRate: S.optional(S.Number),
    ProjectedVolume: S.optional(S.Number),
    Esps: S.optional(Esps),
  }),
).annotate({
  identifier: "DomainDeliverabilityCampaign",
}) as any as S.Schema<DomainDeliverabilityCampaign>;
export interface GetDomainDeliverabilityCampaignResponse {
  DomainDeliverabilityCampaign: DomainDeliverabilityCampaign;
}
export const GetDomainDeliverabilityCampaignResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainDeliverabilityCampaign: DomainDeliverabilityCampaign }),
).annotate({
  identifier: "GetDomainDeliverabilityCampaignResponse",
}) as any as S.Schema<GetDomainDeliverabilityCampaignResponse>;
export interface GetDomainStatisticsReportRequest {
  Domain: string;
  StartDate: Date;
  EndDate: Date;
}
export const GetDomainStatisticsReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.String.pipe(T.HttpLabel("Domain")),
    StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartDate"),
    ),
    EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndDate"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/deliverability-dashboard/statistics-report/{Domain}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainStatisticsReportRequest",
}) as any as S.Schema<GetDomainStatisticsReportRequest>;
export interface VolumeStatistics {
  InboxRawCount?: number;
  SpamRawCount?: number;
  ProjectedInbox?: number;
  ProjectedSpam?: number;
}
export const VolumeStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboxRawCount: S.optional(S.Number),
    SpamRawCount: S.optional(S.Number),
    ProjectedInbox: S.optional(S.Number),
    ProjectedSpam: S.optional(S.Number),
  }),
).annotate({
  identifier: "VolumeStatistics",
}) as any as S.Schema<VolumeStatistics>;
export interface DomainIspPlacement {
  IspName?: string;
  InboxRawCount?: number;
  SpamRawCount?: number;
  InboxPercentage?: number;
  SpamPercentage?: number;
}
export const DomainIspPlacement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IspName: S.optional(S.String),
    InboxRawCount: S.optional(S.Number),
    SpamRawCount: S.optional(S.Number),
    InboxPercentage: S.optional(S.Number),
    SpamPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "DomainIspPlacement",
}) as any as S.Schema<DomainIspPlacement>;
export type DomainIspPlacements = DomainIspPlacement[];
export const DomainIspPlacements = /*@__PURE__*/ S.Array(DomainIspPlacement);
export interface OverallVolume {
  VolumeStatistics?: VolumeStatistics;
  ReadRatePercent?: number;
  DomainIspPlacements?: DomainIspPlacement[];
}
export const OverallVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeStatistics: S.optional(VolumeStatistics),
    ReadRatePercent: S.optional(S.Number),
    DomainIspPlacements: S.optional(DomainIspPlacements),
  }),
).annotate({ identifier: "OverallVolume" }) as any as S.Schema<OverallVolume>;
export interface DailyVolume {
  StartDate?: Date;
  VolumeStatistics?: VolumeStatistics;
  DomainIspPlacements?: DomainIspPlacement[];
}
export const DailyVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VolumeStatistics: S.optional(VolumeStatistics),
    DomainIspPlacements: S.optional(DomainIspPlacements),
  }),
).annotate({ identifier: "DailyVolume" }) as any as S.Schema<DailyVolume>;
export type DailyVolumes = DailyVolume[];
export const DailyVolumes = /*@__PURE__*/ S.Array(DailyVolume);
export interface GetDomainStatisticsReportResponse {
  OverallVolume: OverallVolume;
  DailyVolumes: DailyVolume[];
}
export const GetDomainStatisticsReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OverallVolume: OverallVolume, DailyVolumes: DailyVolumes }),
).annotate({
  identifier: "GetDomainStatisticsReportResponse",
}) as any as S.Schema<GetDomainStatisticsReportResponse>;
export interface GetEmailAddressInsightsRequest {
  EmailAddress: string;
}
export const GetEmailAddressInsightsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailAddress: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/email-address-insights" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailAddressInsightsRequest",
}) as any as S.Schema<GetEmailAddressInsightsRequest>;
export type EmailAddressInsightsConfidenceVerdict =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const EmailAddressInsightsConfidenceVerdict = S.String;

export interface EmailAddressInsightsVerdict {
  ConfidenceVerdict?: EmailAddressInsightsConfidenceVerdict;
}
export const EmailAddressInsightsVerdict = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfidenceVerdict: S.optional(EmailAddressInsightsConfidenceVerdict),
  }),
).annotate({
  identifier: "EmailAddressInsightsVerdict",
}) as any as S.Schema<EmailAddressInsightsVerdict>;
export interface EmailAddressInsightsMailboxEvaluations {
  HasValidSyntax?: EmailAddressInsightsVerdict;
  HasValidDnsRecords?: EmailAddressInsightsVerdict;
  MailboxExists?: EmailAddressInsightsVerdict;
  IsRoleAddress?: EmailAddressInsightsVerdict;
  IsDisposable?: EmailAddressInsightsVerdict;
  IsRandomInput?: EmailAddressInsightsVerdict;
}
export const EmailAddressInsightsMailboxEvaluations = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      HasValidSyntax: S.optional(EmailAddressInsightsVerdict),
      HasValidDnsRecords: S.optional(EmailAddressInsightsVerdict),
      MailboxExists: S.optional(EmailAddressInsightsVerdict),
      IsRoleAddress: S.optional(EmailAddressInsightsVerdict),
      IsDisposable: S.optional(EmailAddressInsightsVerdict),
      IsRandomInput: S.optional(EmailAddressInsightsVerdict),
    }),
).annotate({
  identifier: "EmailAddressInsightsMailboxEvaluations",
}) as any as S.Schema<EmailAddressInsightsMailboxEvaluations>;
export interface MailboxValidation {
  IsValid?: EmailAddressInsightsVerdict;
  Evaluations?: EmailAddressInsightsMailboxEvaluations;
}
export const MailboxValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsValid: S.optional(EmailAddressInsightsVerdict),
    Evaluations: S.optional(EmailAddressInsightsMailboxEvaluations),
  }),
).annotate({
  identifier: "MailboxValidation",
}) as any as S.Schema<MailboxValidation>;
export interface GetEmailAddressInsightsResponse {
  MailboxValidation?: MailboxValidation;
}
export const GetEmailAddressInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MailboxValidation: S.optional(MailboxValidation) }),
).annotate({
  identifier: "GetEmailAddressInsightsResponse",
}) as any as S.Schema<GetEmailAddressInsightsResponse>;
export interface GetEmailIdentityRequest {
  EmailIdentity: string;
}
export const GetEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/identities/{EmailIdentity}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailIdentityRequest",
}) as any as S.Schema<GetEmailIdentityRequest>;
export type MailFromDomainName = string;
export type MailFromDomainStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | (string & {});
export const MailFromDomainStatus = S.String;

export type BehaviorOnMxFailure =
  | "USE_DEFAULT_VALUE"
  | "REJECT_MESSAGE"
  | (string & {});
export const BehaviorOnMxFailure = S.String;

export interface MailFromAttributes {
  MailFromDomain?: string;
  MailFromDomainStatus?: MailFromDomainStatus;
  BehaviorOnMxFailure?: BehaviorOnMxFailure;
}
export const MailFromAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailFromDomain: S.optional(S.String),
    MailFromDomainStatus: S.optional(MailFromDomainStatus),
    BehaviorOnMxFailure: S.optional(BehaviorOnMxFailure),
  }),
).annotate({
  identifier: "MailFromAttributes",
}) as any as S.Schema<MailFromAttributes>;
export type PolicyMap = { [key: string]: string | undefined };
export const PolicyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VerificationStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | "NOT_STARTED"
  | (string & {});
export const VerificationStatus = S.String;

export type VerificationError =
  | "SERVICE_ERROR"
  | "DNS_SERVER_ERROR"
  | "HOST_NOT_FOUND"
  | "TYPE_NOT_FOUND"
  | "INVALID_VALUE"
  | "REPLICATION_ACCESS_DENIED"
  | "REPLICATION_PRIMARY_NOT_FOUND"
  | "REPLICATION_PRIMARY_BYO_DKIM_NOT_SUPPORTED"
  | "REPLICATION_REPLICA_AS_PRIMARY_NOT_SUPPORTED"
  | "REPLICATION_PRIMARY_INVALID_REGION"
  | (string & {});
export const VerificationError = S.String;

export type PrimaryNameServer = string;
export type AdminEmail = string;
export type SerialNumber = number;
export interface SOARecord {
  PrimaryNameServer?: string;
  AdminEmail?: string;
  SerialNumber?: number;
}
export const SOARecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrimaryNameServer: S.optional(S.String),
    AdminEmail: S.optional(S.String),
    SerialNumber: S.optional(S.Number),
  }),
).annotate({ identifier: "SOARecord" }) as any as S.Schema<SOARecord>;
export interface VerificationInfo {
  LastCheckedTimestamp?: Date;
  LastSuccessTimestamp?: Date;
  ErrorType?: VerificationError;
  SOARecord?: SOARecord;
}
export const VerificationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastCheckedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSuccessTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ErrorType: S.optional(VerificationError),
    SOARecord: S.optional(SOARecord),
  }),
).annotate({
  identifier: "VerificationInfo",
}) as any as S.Schema<VerificationInfo>;
export interface GetEmailIdentityResponse {
  IdentityType?: IdentityType;
  FeedbackForwardingStatus?: boolean;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
  MailFromAttributes?: MailFromAttributes;
  Policies?: { [key: string]: string | undefined };
  Tags?: Tag[];
  ConfigurationSetName?: string;
  VerificationStatus?: VerificationStatus;
  VerificationInfo?: VerificationInfo;
}
export const GetEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    FeedbackForwardingStatus: S.optional(S.Boolean),
    VerifiedForSendingStatus: S.optional(S.Boolean),
    DkimAttributes: S.optional(DkimAttributes),
    MailFromAttributes: S.optional(MailFromAttributes),
    Policies: S.optional(PolicyMap),
    Tags: S.optional(TagList),
    ConfigurationSetName: S.optional(S.String),
    VerificationStatus: S.optional(VerificationStatus),
    VerificationInfo: S.optional(VerificationInfo),
  }),
).annotate({
  identifier: "GetEmailIdentityResponse",
}) as any as S.Schema<GetEmailIdentityResponse>;
export interface GetEmailIdentityPoliciesRequest {
  EmailIdentity: string;
}
export const GetEmailIdentityPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/identities/{EmailIdentity}/policies",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailIdentityPoliciesRequest",
}) as any as S.Schema<GetEmailIdentityPoliciesRequest>;
export interface GetEmailIdentityPoliciesResponse {
  Policies?: { [key: string]: string | undefined };
}
export const GetEmailIdentityPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policies: S.optional(PolicyMap) }),
).annotate({
  identifier: "GetEmailIdentityPoliciesResponse",
}) as any as S.Schema<GetEmailIdentityPoliciesResponse>;
export interface GetEmailTemplateRequest {
  TemplateName: string;
}
export const GetEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateName: S.String.pipe(T.HttpLabel("TemplateName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/templates/{TemplateName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailTemplateRequest",
}) as any as S.Schema<GetEmailTemplateRequest>;
export interface GetEmailTemplateResponse {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
  Tags?: Tag[];
}
export const GetEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String,
    TemplateContent: EmailTemplateContent,
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetEmailTemplateResponse",
}) as any as S.Schema<GetEmailTemplateResponse>;
export interface GetExportJobRequest {
  JobId: string;
}
export const GetExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/export-jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportJobRequest",
}) as any as S.Schema<GetExportJobRequest>;
export type ExportSourceType =
  | "METRICS_DATA"
  | "MESSAGE_INSIGHTS"
  | (string & {});
export const ExportSourceType = S.String;

export type JobStatus =
  | "CREATED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const JobStatus = S.String;

export type FailedRecordsS3Url = string;
export type ErrorMessage = string;
export interface FailureInfo {
  FailedRecordsS3Url?: string;
  ErrorMessage?: string;
}
export const FailureInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailedRecordsS3Url: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "FailureInfo" }) as any as S.Schema<FailureInfo>;
export type ProcessedRecordsCount = number;
export type ExportedRecordsCount = number;
export interface ExportStatistics {
  ProcessedRecordsCount?: number;
  ExportedRecordsCount?: number;
}
export const ExportStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProcessedRecordsCount: S.optional(S.Number),
    ExportedRecordsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExportStatistics",
}) as any as S.Schema<ExportStatistics>;
export interface GetExportJobResponse {
  JobId?: string;
  ExportSourceType?: ExportSourceType;
  JobStatus?: JobStatus;
  ExportDestination?: ExportDestination;
  ExportDataSource?: ExportDataSource;
  CreatedTimestamp?: Date;
  CompletedTimestamp?: Date;
  FailureInfo?: FailureInfo;
  Statistics?: ExportStatistics;
}
export const GetExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    ExportSourceType: S.optional(ExportSourceType),
    JobStatus: S.optional(JobStatus),
    ExportDestination: S.optional(ExportDestination),
    ExportDataSource: S.optional(ExportDataSource),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailureInfo: S.optional(FailureInfo),
    Statistics: S.optional(ExportStatistics),
  }),
).annotate({
  identifier: "GetExportJobResponse",
}) as any as S.Schema<GetExportJobResponse>;
export interface GetImportJobRequest {
  JobId: string;
}
export const GetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/import-jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportJobRequest",
}) as any as S.Schema<GetImportJobRequest>;
export type FailedRecordsCount = number;
export interface GetImportJobResponse {
  JobId?: string;
  ImportDestination?: ImportDestination;
  ImportDataSource?: ImportDataSource;
  FailureInfo?: FailureInfo;
  JobStatus?: JobStatus;
  CreatedTimestamp?: Date;
  CompletedTimestamp?: Date;
  ProcessedRecordsCount?: number;
  FailedRecordsCount?: number;
}
export const GetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    ImportDestination: S.optional(ImportDestination),
    ImportDataSource: S.optional(ImportDataSource),
    FailureInfo: S.optional(FailureInfo),
    JobStatus: S.optional(JobStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ProcessedRecordsCount: S.optional(S.Number),
    FailedRecordsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetImportJobResponse",
}) as any as S.Schema<GetImportJobResponse>;
export type OutboundMessageId = string;
export interface GetMessageInsightsRequest {
  MessageId: string;
}
export const GetMessageInsightsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.String.pipe(T.HttpLabel("MessageId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/insights/{MessageId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMessageInsightsRequest",
}) as any as S.Schema<GetMessageInsightsRequest>;
export type MessageTagName = string;
export type MessageTagValue = string;
export interface MessageTag {
  Name: string;
  Value: string;
}
export const MessageTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "MessageTag" }) as any as S.Schema<MessageTag>;
export type MessageTagList = MessageTag[];
export const MessageTagList = /*@__PURE__*/ S.Array(MessageTag);
export type BounceType =
  | "UNDETERMINED"
  | "TRANSIENT"
  | "PERMANENT"
  | (string & {});
export const BounceType = S.String;

export type BounceSubType = string;
export type DiagnosticCode = string;
export interface Bounce {
  BounceType?: BounceType;
  BounceSubType?: string;
  DiagnosticCode?: string;
}
export const Bounce = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BounceType: S.optional(BounceType),
    BounceSubType: S.optional(S.String),
    DiagnosticCode: S.optional(S.String),
  }),
).annotate({ identifier: "Bounce" }) as any as S.Schema<Bounce>;
export type ComplaintSubType = string;
export type ComplaintFeedbackType = string;
export interface Complaint {
  ComplaintSubType?: string;
  ComplaintFeedbackType?: string;
}
export const Complaint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplaintSubType: S.optional(S.String),
    ComplaintFeedbackType: S.optional(S.String),
  }),
).annotate({ identifier: "Complaint" }) as any as S.Schema<Complaint>;
export interface EventDetails {
  Bounce?: Bounce;
  Complaint?: Complaint;
}
export const EventDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bounce: S.optional(Bounce), Complaint: S.optional(Complaint) }),
).annotate({ identifier: "EventDetails" }) as any as S.Schema<EventDetails>;
export interface InsightsEvent {
  Timestamp?: Date;
  Type?: EventType;
  Details?: EventDetails;
}
export const InsightsEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Type: S.optional(EventType),
    Details: S.optional(EventDetails),
  }),
).annotate({ identifier: "InsightsEvent" }) as any as S.Schema<InsightsEvent>;
export type InsightsEvents = InsightsEvent[];
export const InsightsEvents = /*@__PURE__*/ S.Array(InsightsEvent);
export interface EmailInsights {
  Destination?: string | redacted.Redacted<string>;
  Isp?: string;
  Events?: InsightsEvent[];
}
export const EmailInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(SensitiveString),
    Isp: S.optional(S.String),
    Events: S.optional(InsightsEvents),
  }),
).annotate({ identifier: "EmailInsights" }) as any as S.Schema<EmailInsights>;
export type EmailInsightsList = EmailInsights[];
export const EmailInsightsList = /*@__PURE__*/ S.Array(EmailInsights);
export interface GetMessageInsightsResponse {
  MessageId?: string;
  FromEmailAddress?: string | redacted.Redacted<string>;
  Subject?: string | redacted.Redacted<string>;
  EmailTags?: MessageTag[];
  Insights?: EmailInsights[];
}
export const GetMessageInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageId: S.optional(S.String),
    FromEmailAddress: S.optional(SensitiveString),
    Subject: S.optional(SensitiveString),
    EmailTags: S.optional(MessageTagList),
    Insights: S.optional(EmailInsightsList),
  }),
).annotate({
  identifier: "GetMessageInsightsResponse",
}) as any as S.Schema<GetMessageInsightsResponse>;
export interface GetMultiRegionEndpointRequest {
  EndpointName: string;
}
export const GetMultiRegionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointName: S.String.pipe(T.HttpLabel("EndpointName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/multi-region-endpoints/{EndpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMultiRegionEndpointRequest",
}) as any as S.Schema<GetMultiRegionEndpointRequest>;
export interface Route {
  Region: string;
}
export const Route = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Region: S.String }),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type Routes = Route[];
export const Routes = /*@__PURE__*/ S.Array(Route);
export interface GetMultiRegionEndpointResponse {
  EndpointName?: string;
  EndpointId?: string;
  Routes?: Route[];
  Status?: Status;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export const GetMultiRegionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.optional(S.String),
    EndpointId: S.optional(S.String),
    Routes: S.optional(Routes),
    Status: S.optional(Status),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetMultiRegionEndpointResponse",
}) as any as S.Schema<GetMultiRegionEndpointResponse>;
export type ReputationEntityReference = string;
export type ReputationEntityType = "RESOURCE" | (string & {});
export const ReputationEntityType = S.String;

export interface GetReputationEntityRequest {
  ReputationEntityReference: string;
  ReputationEntityType: ReputationEntityType;
}
export const GetReputationEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReputationEntityReference: S.String.pipe(
      T.HttpLabel("ReputationEntityReference"),
    ),
    ReputationEntityType: ReputationEntityType.pipe(
      T.HttpLabel("ReputationEntityType"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReputationEntityRequest",
}) as any as S.Schema<GetReputationEntityRequest>;
export type StatusCause = string;
export interface StatusRecord {
  Status?: SendingStatus;
  Cause?: string;
  LastUpdatedTimestamp?: Date;
}
export const StatusRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(SendingStatus),
    Cause: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "StatusRecord" }) as any as S.Schema<StatusRecord>;
export type RecommendationImpact = "LOW" | "HIGH" | (string & {});
export const RecommendationImpact = S.String;

export interface ReputationEntity {
  ReputationEntityReference?: string;
  ReputationEntityType?: ReputationEntityType;
  ReputationManagementPolicy?: string;
  CustomerManagedStatus?: StatusRecord;
  AwsSesManagedStatus?: StatusRecord;
  SendingStatusAggregate?: SendingStatus;
  ReputationImpact?: RecommendationImpact;
}
export const ReputationEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReputationEntityReference: S.optional(S.String),
    ReputationEntityType: S.optional(ReputationEntityType),
    ReputationManagementPolicy: S.optional(S.String),
    CustomerManagedStatus: S.optional(StatusRecord),
    AwsSesManagedStatus: S.optional(StatusRecord),
    SendingStatusAggregate: S.optional(SendingStatus),
    ReputationImpact: S.optional(RecommendationImpact),
  }),
).annotate({
  identifier: "ReputationEntity",
}) as any as S.Schema<ReputationEntity>;
export interface GetReputationEntityResponse {
  ReputationEntity?: ReputationEntity;
}
export const GetReputationEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReputationEntity: S.optional(ReputationEntity) }),
).annotate({
  identifier: "GetReputationEntityResponse",
}) as any as S.Schema<GetReputationEntityResponse>;
export interface GetSuppressedDestinationRequest {
  EmailAddress: string;
  TenantName?: string;
}
export const GetSuppressedDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
    TenantName: S.optional(S.String).pipe(T.HttpQuery("TenantName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v2/email/suppression/addresses/{EmailAddress}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSuppressedDestinationRequest",
}) as any as S.Schema<GetSuppressedDestinationRequest>;
export type FeedbackId = string;
export interface SuppressedDestinationAttributes {
  MessageId?: string;
  FeedbackId?: string;
}
export const SuppressedDestinationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageId: S.optional(S.String),
    FeedbackId: S.optional(S.String),
  }),
).annotate({
  identifier: "SuppressedDestinationAttributes",
}) as any as S.Schema<SuppressedDestinationAttributes>;
export interface SuppressedDestination {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date;
  Attributes?: SuppressedDestinationAttributes;
  TenantName?: string;
}
export const SuppressedDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String,
    Reason: SuppressionListReason,
    LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Attributes: S.optional(SuppressedDestinationAttributes),
    TenantName: S.optional(S.String),
  }),
).annotate({
  identifier: "SuppressedDestination",
}) as any as S.Schema<SuppressedDestination>;
export interface GetSuppressedDestinationResponse {
  SuppressedDestination: SuppressedDestination;
}
export const GetSuppressedDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SuppressedDestination: SuppressedDestination }),
).annotate({
  identifier: "GetSuppressedDestinationResponse",
}) as any as S.Schema<GetSuppressedDestinationResponse>;
export interface GetTenantRequest {
  TenantName: string;
}
export const GetTenantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TenantName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/tenants/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTenantRequest",
}) as any as S.Schema<GetTenantRequest>;
export interface Tenant {
  TenantName?: string;
  TenantId?: string;
  TenantArn?: string;
  CreatedTimestamp?: Date;
  Tags?: Tag[];
  SendingStatus?: SendingStatus;
  SuppressionAttributes?: TenantSuppressionAttributes;
}
export const Tenant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.optional(S.String),
    TenantId: S.optional(S.String),
    TenantArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Tags: S.optional(TagList),
    SendingStatus: S.optional(SendingStatus),
    SuppressionAttributes: S.optional(TenantSuppressionAttributes),
  }),
).annotate({ identifier: "Tenant" }) as any as S.Schema<Tenant>;
export interface GetTenantResponse {
  Tenant?: Tenant;
}
export const GetTenantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tenant: S.optional(Tenant) }),
).annotate({
  identifier: "GetTenantResponse",
}) as any as S.Schema<GetTenantResponse>;
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListConfigurationSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/configuration-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationSetsRequest",
}) as any as S.Schema<ListConfigurationSetsRequest>;
export type ConfigurationSetNameList = string[];
export const ConfigurationSetNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[];
  NextToken?: string;
}
export const ListConfigurationSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSets: S.optional(ConfigurationSetNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationSetsResponse",
}) as any as S.Schema<ListConfigurationSetsResponse>;
export interface ListContactListsRequest {
  PageSize?: number;
  NextToken?: string;
}
export const ListContactListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/contact-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContactListsRequest",
}) as any as S.Schema<ListContactListsRequest>;
export interface ContactList {
  ContactListName?: string;
  LastUpdatedTimestamp?: Date;
}
export const ContactList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ContactList" }) as any as S.Schema<ContactList>;
export type ListOfContactLists = ContactList[];
export const ListOfContactLists = /*@__PURE__*/ S.Array(ContactList);
export interface ListContactListsResponse {
  ContactLists?: ContactList[];
  NextToken?: string;
}
export const ListContactListsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactLists: S.optional(ListOfContactLists),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListContactListsResponse",
}) as any as S.Schema<ListContactListsResponse>;
export type UseDefaultIfPreferenceUnavailable = boolean;
export interface TopicFilter {
  TopicName?: string;
  UseDefaultIfPreferenceUnavailable?: boolean;
}
export const TopicFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicName: S.optional(S.String),
    UseDefaultIfPreferenceUnavailable: S.optional(S.Boolean),
  }),
).annotate({ identifier: "TopicFilter" }) as any as S.Schema<TopicFilter>;
export interface ListContactsFilter {
  FilteredStatus?: SubscriptionStatus;
  TopicFilter?: TopicFilter;
}
export const ListContactsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilteredStatus: S.optional(SubscriptionStatus),
    TopicFilter: S.optional(TopicFilter),
  }),
).annotate({
  identifier: "ListContactsFilter",
}) as any as S.Schema<ListContactsFilter>;
export interface ListContactsRequest {
  ContactListName: string;
  Filter?: ListContactsFilter;
  PageSize?: number;
  NextToken?: string;
}
export const ListContactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
    Filter: S.optional(ListContactsFilter),
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/email/contact-lists/{ContactListName}/contacts/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContactsRequest",
}) as any as S.Schema<ListContactsRequest>;
export interface Contact {
  EmailAddress?: string;
  TopicPreferences?: TopicPreference[];
  TopicDefaultPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  LastUpdatedTimestamp?: Date;
}
export const Contact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.optional(S.String),
    TopicPreferences: S.optional(TopicPreferenceList),
    TopicDefaultPreferences: S.optional(TopicPreferenceList),
    UnsubscribeAll: S.optional(S.Boolean),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Contact" }) as any as S.Schema<Contact>;
export type ListOfContacts = Contact[];
export const ListOfContacts = /*@__PURE__*/ S.Array(Contact);
export interface ListContactsResponse {
  Contacts?: Contact[];
  NextToken?: string;
}
export const ListContactsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Contacts: S.optional(ListOfContacts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListContactsResponse",
}) as any as S.Schema<ListContactsResponse>;
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListCustomVerificationEmailTemplatesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/email/custom-verification-email-templates",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCustomVerificationEmailTemplatesRequest",
  }) as any as S.Schema<ListCustomVerificationEmailTemplatesRequest>;
export interface CustomVerificationEmailTemplateMetadata {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export const CustomVerificationEmailTemplateMetadata = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TemplateName: S.optional(S.String),
      FromEmailAddress: S.optional(S.String),
      TemplateSubject: S.optional(S.String),
      SuccessRedirectionURL: S.optional(S.String),
      FailureRedirectionURL: S.optional(S.String),
    }),
).annotate({
  identifier: "CustomVerificationEmailTemplateMetadata",
}) as any as S.Schema<CustomVerificationEmailTemplateMetadata>;
export type CustomVerificationEmailTemplatesList =
  CustomVerificationEmailTemplateMetadata[];
export const CustomVerificationEmailTemplatesList = /*@__PURE__*/ S.Array(
  CustomVerificationEmailTemplateMetadata,
);
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplateMetadata[];
  NextToken?: string;
}
export const ListCustomVerificationEmailTemplatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CustomVerificationEmailTemplates: S.optional(
        CustomVerificationEmailTemplatesList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCustomVerificationEmailTemplatesResponse",
  }) as any as S.Schema<ListCustomVerificationEmailTemplatesResponse>;
export interface ListDedicatedIpPoolsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListDedicatedIpPoolsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/dedicated-ip-pools" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDedicatedIpPoolsRequest",
}) as any as S.Schema<ListDedicatedIpPoolsRequest>;
export type ListOfDedicatedIpPools = string[];
export const ListOfDedicatedIpPools = /*@__PURE__*/ S.Array(S.String);
export interface ListDedicatedIpPoolsResponse {
  DedicatedIpPools?: string[];
  NextToken?: string;
}
export const ListDedicatedIpPoolsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedIpPools: S.optional(ListOfDedicatedIpPools),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDedicatedIpPoolsResponse",
}) as any as S.Schema<ListDedicatedIpPoolsResponse>;
export interface ListDeliverabilityTestReportsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListDeliverabilityTestReportsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/email/deliverability-dashboard/test-reports",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDeliverabilityTestReportsRequest",
}) as any as S.Schema<ListDeliverabilityTestReportsRequest>;
export type DeliverabilityTestReports = DeliverabilityTestReport[];
export const DeliverabilityTestReports = /*@__PURE__*/ S.Array(
  DeliverabilityTestReport,
);
export interface ListDeliverabilityTestReportsResponse {
  DeliverabilityTestReports: DeliverabilityTestReport[];
  NextToken?: string;
}
export const ListDeliverabilityTestReportsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DeliverabilityTestReports: DeliverabilityTestReports,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDeliverabilityTestReportsResponse",
}) as any as S.Schema<ListDeliverabilityTestReportsResponse>;
export interface ListDomainDeliverabilityCampaignsRequest {
  StartDate: Date;
  EndDate: Date;
  SubscribedDomain: string;
  NextToken?: string;
  PageSize?: number;
}
export const ListDomainDeliverabilityCampaignsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("StartDate"),
      ),
      EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("EndDate"),
      ),
      SubscribedDomain: S.String.pipe(T.HttpLabel("SubscribedDomain")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/email/deliverability-dashboard/domains/{SubscribedDomain}/campaigns",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDomainDeliverabilityCampaignsRequest",
}) as any as S.Schema<ListDomainDeliverabilityCampaignsRequest>;
export type DomainDeliverabilityCampaignList = DomainDeliverabilityCampaign[];
export const DomainDeliverabilityCampaignList = /*@__PURE__*/ S.Array(
  DomainDeliverabilityCampaign,
);
export interface ListDomainDeliverabilityCampaignsResponse {
  DomainDeliverabilityCampaigns: DomainDeliverabilityCampaign[];
  NextToken?: string;
}
export const ListDomainDeliverabilityCampaignsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DomainDeliverabilityCampaigns: DomainDeliverabilityCampaignList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDomainDeliverabilityCampaignsResponse",
  }) as any as S.Schema<ListDomainDeliverabilityCampaignsResponse>;
export interface ListEmailIdentitiesRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListEmailIdentitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/identities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEmailIdentitiesRequest",
}) as any as S.Schema<ListEmailIdentitiesRequest>;
export interface IdentityInfo {
  IdentityType?: IdentityType;
  IdentityName?: string;
  SendingEnabled?: boolean;
  VerificationStatus?: VerificationStatus;
}
export const IdentityInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    IdentityName: S.optional(S.String),
    SendingEnabled: S.optional(S.Boolean),
    VerificationStatus: S.optional(VerificationStatus),
  }),
).annotate({ identifier: "IdentityInfo" }) as any as S.Schema<IdentityInfo>;
export type IdentityInfoList = IdentityInfo[];
export const IdentityInfoList = /*@__PURE__*/ S.Array(IdentityInfo);
export interface ListEmailIdentitiesResponse {
  EmailIdentities?: IdentityInfo[];
  NextToken?: string;
}
export const ListEmailIdentitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailIdentities: S.optional(IdentityInfoList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEmailIdentitiesResponse",
}) as any as S.Schema<ListEmailIdentitiesResponse>;
export interface ListEmailTemplatesRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListEmailTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEmailTemplatesRequest",
}) as any as S.Schema<ListEmailTemplatesRequest>;
export interface EmailTemplateMetadata {
  TemplateName?: string;
  CreatedTimestamp?: Date;
}
export const EmailTemplateMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "EmailTemplateMetadata",
}) as any as S.Schema<EmailTemplateMetadata>;
export type EmailTemplateMetadataList = EmailTemplateMetadata[];
export const EmailTemplateMetadataList = /*@__PURE__*/ S.Array(
  EmailTemplateMetadata,
);
export interface ListEmailTemplatesResponse {
  TemplatesMetadata?: EmailTemplateMetadata[];
  NextToken?: string;
}
export const ListEmailTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplatesMetadata: S.optional(EmailTemplateMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEmailTemplatesResponse",
}) as any as S.Schema<ListEmailTemplatesResponse>;
export interface ListExportJobsRequest {
  NextToken?: string;
  PageSize?: number;
  ExportSourceType?: ExportSourceType;
  JobStatus?: JobStatus;
}
export const ListExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
    ExportSourceType: S.optional(ExportSourceType),
    JobStatus: S.optional(JobStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/list-export-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportJobsRequest",
}) as any as S.Schema<ListExportJobsRequest>;
export interface ExportJobSummary {
  JobId?: string;
  ExportSourceType?: ExportSourceType;
  JobStatus?: JobStatus;
  CreatedTimestamp?: Date;
  CompletedTimestamp?: Date;
}
export const ExportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    ExportSourceType: S.optional(ExportSourceType),
    JobStatus: S.optional(JobStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ExportJobSummary",
}) as any as S.Schema<ExportJobSummary>;
export type ExportJobSummaryList = ExportJobSummary[];
export const ExportJobSummaryList = /*@__PURE__*/ S.Array(ExportJobSummary);
export interface ListExportJobsResponse {
  ExportJobs?: ExportJobSummary[];
  NextToken?: string;
}
export const ListExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobs: S.optional(ExportJobSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportJobsResponse",
}) as any as S.Schema<ListExportJobsResponse>;
export type ImportDestinationType =
  | "SUPPRESSION_LIST"
  | "CONTACT_LIST"
  | (string & {});
export const ImportDestinationType = S.String;

export interface ListImportJobsRequest {
  ImportDestinationType?: ImportDestinationType;
  NextToken?: string;
  PageSize?: number;
}
export const ListImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportDestinationType: S.optional(ImportDestinationType),
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/import-jobs/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportJobsRequest",
}) as any as S.Schema<ListImportJobsRequest>;
export interface ImportJobSummary {
  JobId?: string;
  ImportDestination?: ImportDestination;
  JobStatus?: JobStatus;
  CreatedTimestamp?: Date;
  ProcessedRecordsCount?: number;
  FailedRecordsCount?: number;
}
export const ImportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    ImportDestination: S.optional(ImportDestination),
    JobStatus: S.optional(JobStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ProcessedRecordsCount: S.optional(S.Number),
    FailedRecordsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportJobSummary",
}) as any as S.Schema<ImportJobSummary>;
export type ImportJobSummaryList = ImportJobSummary[];
export const ImportJobSummaryList = /*@__PURE__*/ S.Array(ImportJobSummary);
export interface ListImportJobsResponse {
  ImportJobs?: ImportJobSummary[];
  NextToken?: string;
}
export const ListImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportJobs: S.optional(ImportJobSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportJobsResponse",
}) as any as S.Schema<ListImportJobsResponse>;
export type NextTokenV2 = string;
export type PageSizeV2 = number;
export interface ListMultiRegionEndpointsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListMultiRegionEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/multi-region-endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMultiRegionEndpointsRequest",
}) as any as S.Schema<ListMultiRegionEndpointsRequest>;
export type Regions = string[];
export const Regions = /*@__PURE__*/ S.Array(S.String);
export interface MultiRegionEndpoint {
  EndpointName?: string;
  Status?: Status;
  EndpointId?: string;
  Regions?: string[];
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export const MultiRegionEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.optional(S.String),
    Status: S.optional(Status),
    EndpointId: S.optional(S.String),
    Regions: S.optional(Regions),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "MultiRegionEndpoint",
}) as any as S.Schema<MultiRegionEndpoint>;
export type MultiRegionEndpoints = MultiRegionEndpoint[];
export const MultiRegionEndpoints = /*@__PURE__*/ S.Array(MultiRegionEndpoint);
export interface ListMultiRegionEndpointsResponse {
  MultiRegionEndpoints?: MultiRegionEndpoint[];
  NextToken?: string;
}
export const ListMultiRegionEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiRegionEndpoints: S.optional(MultiRegionEndpoints),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMultiRegionEndpointsResponse",
}) as any as S.Schema<ListMultiRegionEndpointsResponse>;
export type ListRecommendationsFilterKey =
  | "TYPE"
  | "IMPACT"
  | "STATUS"
  | "RESOURCE_ARN"
  | (string & {});
export const ListRecommendationsFilterKey = S.String;

export type ListRecommendationFilterValue = string;
export type ListRecommendationsFilter = {
  [key in ListRecommendationsFilterKey]?: string;
};
export const ListRecommendationsFilter = /*@__PURE__*/ S.Record(
  ListRecommendationsFilterKey,
  S.String.pipe(S.optional),
);
export interface ListRecommendationsRequest {
  Filter?: { [key: string]: string | undefined };
  NextToken?: string;
  PageSize?: number;
}
export const ListRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(ListRecommendationsFilter),
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/vdm/recommendations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecommendationsRequest",
}) as any as S.Schema<ListRecommendationsRequest>;
export type RecommendationType =
  | "DKIM"
  | "DMARC"
  | "SPF"
  | "BIMI"
  | "COMPLAINT"
  | "BOUNCE"
  | "FEEDBACK_3P"
  | "IP_LISTING"
  | (string & {});
export const RecommendationType = S.String;

export type RecommendationDescription = string;
export type RecommendationStatus = "OPEN" | "FIXED" | (string & {});
export const RecommendationStatus = S.String;

export interface Recommendation {
  ResourceArn?: string;
  Type?: RecommendationType;
  Description?: string;
  Status?: RecommendationStatus;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Impact?: RecommendationImpact;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Type: S.optional(RecommendationType),
    Description: S.optional(S.String),
    Status: S.optional(RecommendationStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Impact: S.optional(RecommendationImpact),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type RecommendationsList = Recommendation[];
export const RecommendationsList = /*@__PURE__*/ S.Array(Recommendation);
export interface ListRecommendationsResponse {
  Recommendations?: Recommendation[];
  NextToken?: string;
}
export const ListRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Recommendations: S.optional(RecommendationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendationsResponse",
}) as any as S.Schema<ListRecommendationsResponse>;
export type ReputationEntityFilterKey =
  | "ENTITY_TYPE"
  | "REPUTATION_IMPACT"
  | "SENDING_STATUS"
  | "ENTITY_REFERENCE_PREFIX"
  | (string & {});
export const ReputationEntityFilterKey = S.String;

export type ReputationEntityFilterValue = string;
export type ReputationEntityFilter = {
  [key in ReputationEntityFilterKey]?: string;
};
export const ReputationEntityFilter = /*@__PURE__*/ S.Record(
  ReputationEntityFilterKey,
  S.String.pipe(S.optional),
);
export interface ListReputationEntitiesRequest {
  Filter?: { [key: string]: string | undefined };
  NextToken?: string;
  PageSize?: number;
}
export const ListReputationEntitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(ReputationEntityFilter),
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/reputation/entities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReputationEntitiesRequest",
}) as any as S.Schema<ListReputationEntitiesRequest>;
export type ReputationEntitiesList = ReputationEntity[];
export const ReputationEntitiesList = /*@__PURE__*/ S.Array(ReputationEntity);
export interface ListReputationEntitiesResponse {
  ReputationEntities?: ReputationEntity[];
  NextToken?: string;
}
export const ListReputationEntitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReputationEntities: S.optional(ReputationEntitiesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReputationEntitiesResponse",
}) as any as S.Schema<ListReputationEntitiesResponse>;
export interface ListResourceTenantsRequest {
  ResourceArn: string;
  PageSize?: number;
  NextToken?: string;
}
export const ListResourceTenantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/resources/tenants/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceTenantsRequest",
}) as any as S.Schema<ListResourceTenantsRequest>;
export interface ResourceTenantMetadata {
  TenantName?: string;
  TenantId?: string;
  ResourceArn?: string;
  AssociatedTimestamp?: Date;
}
export const ResourceTenantMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.optional(S.String),
    TenantId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    AssociatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ResourceTenantMetadata",
}) as any as S.Schema<ResourceTenantMetadata>;
export type ResourceTenantMetadataList = ResourceTenantMetadata[];
export const ResourceTenantMetadataList = /*@__PURE__*/ S.Array(
  ResourceTenantMetadata,
);
export interface ListResourceTenantsResponse {
  ResourceTenants?: ResourceTenantMetadata[];
  NextToken?: string;
}
export const ListResourceTenantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceTenants: S.optional(ResourceTenantMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceTenantsResponse",
}) as any as S.Schema<ListResourceTenantsResponse>;
export interface ListSuppressedDestinationsRequest {
  TenantName?: string;
  Reasons?: SuppressionListReason[];
  StartDate?: Date;
  EndDate?: Date;
  NextToken?: string;
  PageSize?: number;
}
export const ListSuppressedDestinationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.optional(S.String).pipe(T.HttpQuery("TenantName")),
    Reasons: S.optional(SuppressionListReasons).pipe(T.HttpQuery("Reason")),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("StartDate"),
    ),
    EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("EndDate"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/suppression/addresses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSuppressedDestinationsRequest",
}) as any as S.Schema<ListSuppressedDestinationsRequest>;
export interface SuppressedDestinationSummary {
  EmailAddress: string;
  Reason: SuppressionListReason;
  LastUpdateTime: Date;
}
export const SuppressedDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String,
    Reason: SuppressionListReason,
    LastUpdateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "SuppressedDestinationSummary",
}) as any as S.Schema<SuppressedDestinationSummary>;
export type SuppressedDestinationSummaries = SuppressedDestinationSummary[];
export const SuppressedDestinationSummaries = /*@__PURE__*/ S.Array(
  SuppressedDestinationSummary,
);
export interface ListSuppressedDestinationsResponse {
  SuppressedDestinationSummaries?: SuppressedDestinationSummary[];
  NextToken?: string;
}
export const ListSuppressedDestinationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuppressedDestinationSummaries: S.optional(SuppressedDestinationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSuppressedDestinationsResponse",
}) as any as S.Schema<ListSuppressedDestinationsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/email/tags" }),
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
  Tags: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagList }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ListTenantResourcesFilterKey = "RESOURCE_TYPE" | (string & {});
export const ListTenantResourcesFilterKey = S.String;

export type ListTenantResourcesFilterValue = string;
export type ListTenantResourcesFilter = {
  [key in ListTenantResourcesFilterKey]?: string;
};
export const ListTenantResourcesFilter = /*@__PURE__*/ S.Record(
  ListTenantResourcesFilterKey,
  S.String.pipe(S.optional),
);
export interface ListTenantResourcesRequest {
  TenantName: string;
  Filter?: { [key: string]: string | undefined };
  PageSize?: number;
  NextToken?: string;
}
export const ListTenantResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.String,
    Filter: S.optional(ListTenantResourcesFilter),
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/tenants/resources/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTenantResourcesRequest",
}) as any as S.Schema<ListTenantResourcesRequest>;
export type ResourceType =
  | "EMAIL_IDENTITY"
  | "CONFIGURATION_SET"
  | "EMAIL_TEMPLATE"
  | (string & {});
export const ResourceType = S.String;

export interface TenantResource {
  ResourceType?: ResourceType;
  ResourceArn?: string;
}
export const TenantResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResourceType),
    ResourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "TenantResource" }) as any as S.Schema<TenantResource>;
export type TenantResourceList = TenantResource[];
export const TenantResourceList = /*@__PURE__*/ S.Array(TenantResource);
export interface ListTenantResourcesResponse {
  TenantResources?: TenantResource[];
  NextToken?: string;
}
export const ListTenantResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantResources: S.optional(TenantResourceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTenantResourcesResponse",
}) as any as S.Schema<ListTenantResourcesResponse>;
export interface ListTenantsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListTenantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/tenants/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTenantsRequest",
}) as any as S.Schema<ListTenantsRequest>;
export interface TenantInfo {
  TenantName?: string;
  TenantId?: string;
  TenantArn?: string;
  CreatedTimestamp?: Date;
}
export const TenantInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantName: S.optional(S.String),
    TenantId: S.optional(S.String),
    TenantArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "TenantInfo" }) as any as S.Schema<TenantInfo>;
export type TenantInfoList = TenantInfo[];
export const TenantInfoList = /*@__PURE__*/ S.Array(TenantInfo);
export interface ListTenantsResponse {
  Tenants?: TenantInfo[];
  NextToken?: string;
}
export const ListTenantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tenants: S.optional(TenantInfoList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTenantsResponse",
}) as any as S.Schema<ListTenantsResponse>;
export interface PutAccountDedicatedIpWarmupAttributesRequest {
  AutoWarmupEnabled?: boolean;
}
export const PutAccountDedicatedIpWarmupAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoWarmupEnabled: S.optional(S.Boolean) }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/account/dedicated-ips/warmup",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutAccountDedicatedIpWarmupAttributesRequest",
  }) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesRequest>;
export interface PutAccountDedicatedIpWarmupAttributesResponse {}
export const PutAccountDedicatedIpWarmupAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutAccountDedicatedIpWarmupAttributesResponse",
  }) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesResponse>;
export type EnabledWrapper = boolean;
export interface PutAccountDetailsRequest {
  MailType: MailType;
  WebsiteURL: string | redacted.Redacted<string>;
  ContactLanguage?: ContactLanguage;
  UseCaseDescription?: string | redacted.Redacted<string>;
  AdditionalContactEmailAddresses?: (string | redacted.Redacted<string>)[];
  ProductionAccessEnabled?: boolean;
}
export const PutAccountDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailType: MailType,
    WebsiteURL: SensitiveString,
    ContactLanguage: S.optional(ContactLanguage),
    UseCaseDescription: S.optional(SensitiveString),
    AdditionalContactEmailAddresses: S.optional(
      AdditionalContactEmailAddresses,
    ),
    ProductionAccessEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/account/details" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountDetailsRequest",
}) as any as S.Schema<PutAccountDetailsRequest>;
export interface PutAccountDetailsResponse {}
export const PutAccountDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountDetailsResponse",
}) as any as S.Schema<PutAccountDetailsResponse>;
export interface PutAccountPricingAttributesRequest {
  Plan: PricingPlan;
}
export const PutAccountPricingAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Plan: PricingPlan }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/account/pricing-attributes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountPricingAttributesRequest",
}) as any as S.Schema<PutAccountPricingAttributesRequest>;
export interface PutAccountPricingAttributesResponse {}
export const PutAccountPricingAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountPricingAttributesResponse",
}) as any as S.Schema<PutAccountPricingAttributesResponse>;
export interface PutAccountSendingAttributesRequest {
  SendingEnabled?: boolean;
}
export const PutAccountSendingAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SendingEnabled: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/account/sending" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountSendingAttributesRequest",
}) as any as S.Schema<PutAccountSendingAttributesRequest>;
export interface PutAccountSendingAttributesResponse {}
export const PutAccountSendingAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountSendingAttributesResponse",
}) as any as S.Schema<PutAccountSendingAttributesResponse>;
export interface PutAccountSuppressionAttributesRequest {
  SuppressedReasons?: SuppressionListReason[];
  ValidationAttributes?: SuppressionValidationAttributes;
}
export const PutAccountSuppressionAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SuppressedReasons: S.optional(SuppressionListReasons),
      ValidationAttributes: S.optional(SuppressionValidationAttributes),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/email/account/suppression" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutAccountSuppressionAttributesRequest",
}) as any as S.Schema<PutAccountSuppressionAttributesRequest>;
export interface PutAccountSuppressionAttributesResponse {}
export const PutAccountSuppressionAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutAccountSuppressionAttributesResponse",
}) as any as S.Schema<PutAccountSuppressionAttributesResponse>;
export interface PutAccountVdmAttributesRequest {
  VdmAttributes: VdmAttributes;
}
export const PutAccountVdmAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VdmAttributes: VdmAttributes }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/account/vdm" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountVdmAttributesRequest",
}) as any as S.Schema<PutAccountVdmAttributesRequest>;
export interface PutAccountVdmAttributesResponse {}
export const PutAccountVdmAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountVdmAttributesResponse",
}) as any as S.Schema<PutAccountVdmAttributesResponse>;
export interface PutConfigurationSetArchivingOptionsRequest {
  ConfigurationSetName: string;
  ArchiveArn?: string;
}
export const PutConfigurationSetArchivingOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      ArchiveArn: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/archiving-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetArchivingOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetArchivingOptionsRequest>;
export interface PutConfigurationSetArchivingOptionsResponse {}
export const PutConfigurationSetArchivingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetArchivingOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetArchivingOptionsResponse>;
export type SendingPoolName = string;
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
  MaxDeliverySeconds?: number;
}
export const PutConfigurationSetDeliveryOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      TlsPolicy: S.optional(TlsPolicy),
      SendingPoolName: S.optional(S.String),
      MaxDeliverySeconds: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/delivery-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetDeliveryOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetDeliveryOptionsRequest>;
export interface PutConfigurationSetDeliveryOptionsResponse {}
export const PutConfigurationSetDeliveryOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetDeliveryOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetDeliveryOptionsResponse>;
export interface PutConfigurationSetReputationOptionsRequest {
  ConfigurationSetName: string;
  ReputationMetricsEnabled?: boolean;
}
export const PutConfigurationSetReputationOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      ReputationMetricsEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/reputation-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetReputationOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetReputationOptionsRequest>;
export interface PutConfigurationSetReputationOptionsResponse {}
export const PutConfigurationSetReputationOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetReputationOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetReputationOptionsResponse>;
export interface PutConfigurationSetSendingOptionsRequest {
  ConfigurationSetName: string;
  SendingEnabled?: boolean;
}
export const PutConfigurationSetSendingOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      SendingEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/sending",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutConfigurationSetSendingOptionsRequest",
}) as any as S.Schema<PutConfigurationSetSendingOptionsRequest>;
export interface PutConfigurationSetSendingOptionsResponse {}
export const PutConfigurationSetSendingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetSendingOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetSendingOptionsResponse>;
export interface PutConfigurationSetSuppressionOptionsRequest {
  ConfigurationSetName: string;
  SuppressionScope?: SuppressionListScope;
  SuppressedReasons?: SuppressionListReason[];
  ValidationOptions?: SuppressionValidationOptions;
}
export const PutConfigurationSetSuppressionOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      SuppressionScope: S.optional(SuppressionListScope),
      SuppressedReasons: S.optional(SuppressionListReasons),
      ValidationOptions: S.optional(SuppressionValidationOptions),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/suppression-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetSuppressionOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetSuppressionOptionsRequest>;
export interface PutConfigurationSetSuppressionOptionsResponse {}
export const PutConfigurationSetSuppressionOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetSuppressionOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetSuppressionOptionsResponse>;
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  CustomRedirectDomain?: string;
  HttpsPolicy?: HttpsPolicy;
}
export const PutConfigurationSetTrackingOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      CustomRedirectDomain: S.optional(S.String),
      HttpsPolicy: S.optional(HttpsPolicy),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/tracking-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetTrackingOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetTrackingOptionsRequest>;
export interface PutConfigurationSetTrackingOptionsResponse {}
export const PutConfigurationSetTrackingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetTrackingOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetTrackingOptionsResponse>;
export interface PutConfigurationSetVdmOptionsRequest {
  ConfigurationSetName: string;
  VdmOptions?: VdmOptions;
}
export const PutConfigurationSetVdmOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      VdmOptions: S.optional(VdmOptions),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/vdm-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutConfigurationSetVdmOptionsRequest",
}) as any as S.Schema<PutConfigurationSetVdmOptionsRequest>;
export interface PutConfigurationSetVdmOptionsResponse {}
export const PutConfigurationSetVdmOptionsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutConfigurationSetVdmOptionsResponse",
}) as any as S.Schema<PutConfigurationSetVdmOptionsResponse>;
export interface PutDedicatedIpInPoolRequest {
  Ip: string;
  DestinationPoolName: string;
}
export const PutDedicatedIpInPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ip: S.String.pipe(T.HttpLabel("Ip")),
    DestinationPoolName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/dedicated-ips/{Ip}/pool" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDedicatedIpInPoolRequest",
}) as any as S.Schema<PutDedicatedIpInPoolRequest>;
export interface PutDedicatedIpInPoolResponse {}
export const PutDedicatedIpInPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutDedicatedIpInPoolResponse",
}) as any as S.Schema<PutDedicatedIpInPoolResponse>;
export interface PutDedicatedIpPoolScalingAttributesRequest {
  PoolName: string;
  ScalingMode: ScalingMode;
}
export const PutDedicatedIpPoolScalingAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PoolName: S.String.pipe(T.HttpLabel("PoolName")),
      ScalingMode: ScalingMode,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/dedicated-ip-pools/{PoolName}/scaling",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutDedicatedIpPoolScalingAttributesRequest",
  }) as any as S.Schema<PutDedicatedIpPoolScalingAttributesRequest>;
export interface PutDedicatedIpPoolScalingAttributesResponse {}
export const PutDedicatedIpPoolScalingAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutDedicatedIpPoolScalingAttributesResponse",
  }) as any as S.Schema<PutDedicatedIpPoolScalingAttributesResponse>;
export interface PutDedicatedIpWarmupAttributesRequest {
  Ip: string;
  WarmupPercentage: number;
}
export const PutDedicatedIpWarmupAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Ip: S.String.pipe(T.HttpLabel("Ip")),
      WarmupPercentage: S.Number,
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/email/dedicated-ips/{Ip}/warmup" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutDedicatedIpWarmupAttributesRequest",
}) as any as S.Schema<PutDedicatedIpWarmupAttributesRequest>;
export interface PutDedicatedIpWarmupAttributesResponse {}
export const PutDedicatedIpWarmupAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutDedicatedIpWarmupAttributesResponse",
}) as any as S.Schema<PutDedicatedIpWarmupAttributesResponse>;
export interface PutDeliverabilityDashboardOptionRequest {
  DashboardEnabled: boolean;
  SubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export const PutDeliverabilityDashboardOptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DashboardEnabled: S.Boolean,
      SubscribedDomains: S.optional(DomainDeliverabilityTrackingOptions),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v2/email/deliverability-dashboard" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutDeliverabilityDashboardOptionRequest",
}) as any as S.Schema<PutDeliverabilityDashboardOptionRequest>;
export interface PutDeliverabilityDashboardOptionResponse {}
export const PutDeliverabilityDashboardOptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutDeliverabilityDashboardOptionResponse",
}) as any as S.Schema<PutDeliverabilityDashboardOptionResponse>;
export interface PutEmailIdentityConfigurationSetAttributesRequest {
  EmailIdentity: string;
  ConfigurationSetName?: string;
}
export const PutEmailIdentityConfigurationSetAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      ConfigurationSetName: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/identities/{EmailIdentity}/configuration-set",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEmailIdentityConfigurationSetAttributesRequest",
  }) as any as S.Schema<PutEmailIdentityConfigurationSetAttributesRequest>;
export interface PutEmailIdentityConfigurationSetAttributesResponse {}
export const PutEmailIdentityConfigurationSetAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutEmailIdentityConfigurationSetAttributesResponse",
  }) as any as S.Schema<PutEmailIdentityConfigurationSetAttributesResponse>;
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string;
  SigningEnabled?: boolean;
}
export const PutEmailIdentityDkimAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      SigningEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/identities/{EmailIdentity}/dkim",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutEmailIdentityDkimAttributesRequest",
}) as any as S.Schema<PutEmailIdentityDkimAttributesRequest>;
export interface PutEmailIdentityDkimAttributesResponse {}
export const PutEmailIdentityDkimAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutEmailIdentityDkimAttributesResponse",
}) as any as S.Schema<PutEmailIdentityDkimAttributesResponse>;
export interface PutEmailIdentityDkimSigningAttributesRequest {
  EmailIdentity: string;
  SigningAttributesOrigin: DkimSigningAttributesOrigin;
  SigningAttributes?: DkimSigningAttributes;
}
export const PutEmailIdentityDkimSigningAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      SigningAttributesOrigin: DkimSigningAttributesOrigin,
      SigningAttributes: S.optional(DkimSigningAttributes),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/identities/{EmailIdentity}/dkim/signing",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEmailIdentityDkimSigningAttributesRequest",
  }) as any as S.Schema<PutEmailIdentityDkimSigningAttributesRequest>;
export interface PutEmailIdentityDkimSigningAttributesResponse {
  DkimStatus?: DkimStatus;
  DkimTokens?: string[];
  SigningHostedZone?: string;
}
export const PutEmailIdentityDkimSigningAttributesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DkimStatus: S.optional(DkimStatus),
      DkimTokens: S.optional(DnsTokenList),
      SigningHostedZone: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PutEmailIdentityDkimSigningAttributesResponse",
  }) as any as S.Schema<PutEmailIdentityDkimSigningAttributesResponse>;
export interface PutEmailIdentityFeedbackAttributesRequest {
  EmailIdentity: string;
  EmailForwardingEnabled?: boolean;
}
export const PutEmailIdentityFeedbackAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      EmailForwardingEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/identities/{EmailIdentity}/feedback",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEmailIdentityFeedbackAttributesRequest",
  }) as any as S.Schema<PutEmailIdentityFeedbackAttributesRequest>;
export interface PutEmailIdentityFeedbackAttributesResponse {}
export const PutEmailIdentityFeedbackAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutEmailIdentityFeedbackAttributesResponse",
  }) as any as S.Schema<PutEmailIdentityFeedbackAttributesResponse>;
export interface PutEmailIdentityMailFromAttributesRequest {
  EmailIdentity: string;
  MailFromDomain?: string;
  BehaviorOnMxFailure?: BehaviorOnMxFailure;
}
export const PutEmailIdentityMailFromAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      MailFromDomain: S.optional(S.String),
      BehaviorOnMxFailure: S.optional(BehaviorOnMxFailure),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/identities/{EmailIdentity}/mail-from",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEmailIdentityMailFromAttributesRequest",
  }) as any as S.Schema<PutEmailIdentityMailFromAttributesRequest>;
export interface PutEmailIdentityMailFromAttributesResponse {}
export const PutEmailIdentityMailFromAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutEmailIdentityMailFromAttributesResponse",
  }) as any as S.Schema<PutEmailIdentityMailFromAttributesResponse>;
export interface PutSuppressedDestinationRequest {
  EmailAddress: string;
  Reason: SuppressionListReason;
  TenantName?: string;
}
export const PutSuppressedDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String,
    Reason: SuppressionListReason,
    TenantName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/suppression/addresses" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSuppressedDestinationRequest",
}) as any as S.Schema<PutSuppressedDestinationRequest>;
export interface PutSuppressedDestinationResponse {}
export const PutSuppressedDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutSuppressedDestinationResponse",
}) as any as S.Schema<PutSuppressedDestinationResponse>;
export interface PutTenantSuppressionAttributesRequest {
  TenantName: string;
  SuppressedReasons?: SuppressionListReason[];
  SuppressionScope?: SuppressionListScope;
}
export const PutTenantSuppressionAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TenantName: S.String,
      SuppressedReasons: S.optional(SuppressionListReasons),
      SuppressionScope: S.optional(SuppressionListScope),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/email/tenant/suppression" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutTenantSuppressionAttributesRequest",
}) as any as S.Schema<PutTenantSuppressionAttributesRequest>;
export interface PutTenantSuppressionAttributesResponse {}
export const PutTenantSuppressionAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutTenantSuppressionAttributesResponse",
}) as any as S.Schema<PutTenantSuppressionAttributesResponse>;
export type EmailAddressList = string[];
export const EmailAddressList = /*@__PURE__*/ S.Array(S.String);
export interface BulkEmailContent {
  Template?: Template;
}
export const BulkEmailContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Template: S.optional(Template) }),
).annotate({
  identifier: "BulkEmailContent",
}) as any as S.Schema<BulkEmailContent>;
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ToAddresses: S.optional(EmailAddressList),
    CcAddresses: S.optional(EmailAddressList),
    BccAddresses: S.optional(EmailAddressList),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface ReplacementTemplate {
  ReplacementTemplateData?: string;
}
export const ReplacementTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplacementTemplateData: S.optional(S.String) }),
).annotate({
  identifier: "ReplacementTemplate",
}) as any as S.Schema<ReplacementTemplate>;
export interface ReplacementEmailContent {
  ReplacementTemplate?: ReplacementTemplate;
}
export const ReplacementEmailContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplacementTemplate: S.optional(ReplacementTemplate) }),
).annotate({
  identifier: "ReplacementEmailContent",
}) as any as S.Schema<ReplacementEmailContent>;
export interface BulkEmailEntry {
  Destination: Destination;
  ReplacementTags?: MessageTag[];
  ReplacementEmailContent?: ReplacementEmailContent;
  ReplacementHeaders?: MessageHeader[];
}
export const BulkEmailEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: Destination,
    ReplacementTags: S.optional(MessageTagList),
    ReplacementEmailContent: S.optional(ReplacementEmailContent),
    ReplacementHeaders: S.optional(MessageHeaderList),
  }),
).annotate({ identifier: "BulkEmailEntry" }) as any as S.Schema<BulkEmailEntry>;
export type BulkEmailEntryList = BulkEmailEntry[];
export const BulkEmailEntryList = /*@__PURE__*/ S.Array(BulkEmailEntry);
export interface TrackingConfigurationOverrides {
  OpenTrackingEnabled?: FeatureStatus;
  ClickTrackingEnabled?: FeatureStatus;
}
export const TrackingConfigurationOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpenTrackingEnabled: S.optional(FeatureStatus),
    ClickTrackingEnabled: S.optional(FeatureStatus),
  }),
).annotate({
  identifier: "TrackingConfigurationOverrides",
}) as any as S.Schema<TrackingConfigurationOverrides>;
export interface ConfigurationOverrides {
  Tracking?: TrackingConfigurationOverrides;
}
export const ConfigurationOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tracking: S.optional(TrackingConfigurationOverrides) }),
).annotate({
  identifier: "ConfigurationOverrides",
}) as any as S.Schema<ConfigurationOverrides>;
export interface SendBulkEmailRequest {
  FromEmailAddress?: string;
  FromEmailAddressIdentityArn?: string;
  ReplyToAddresses?: string[];
  FeedbackForwardingEmailAddress?: string;
  FeedbackForwardingEmailAddressIdentityArn?: string;
  DefaultEmailTags?: MessageTag[];
  DefaultContent: BulkEmailContent;
  BulkEmailEntries: BulkEmailEntry[];
  ConfigurationSetName?: string;
  EndpointId?: string;
  TenantName?: string;
  ConfigurationOverrides?: ConfigurationOverrides;
}
export const SendBulkEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromEmailAddress: S.optional(S.String),
    FromEmailAddressIdentityArn: S.optional(S.String),
    ReplyToAddresses: S.optional(EmailAddressList),
    FeedbackForwardingEmailAddress: S.optional(S.String),
    FeedbackForwardingEmailAddressIdentityArn: S.optional(S.String),
    DefaultEmailTags: S.optional(MessageTagList),
    DefaultContent: BulkEmailContent,
    BulkEmailEntries: BulkEmailEntryList,
    ConfigurationSetName: S.optional(S.String),
    EndpointId: S.optional(S.String).pipe(T.ContextParam("EndpointId")),
    TenantName: S.optional(S.String),
    ConfigurationOverrides: S.optional(ConfigurationOverrides),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/outbound-bulk-emails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendBulkEmailRequest",
}) as any as S.Schema<SendBulkEmailRequest>;
export type BulkEmailStatus =
  | "SUCCESS"
  | "MESSAGE_REJECTED"
  | "MAIL_FROM_DOMAIN_NOT_VERIFIED"
  | "CONFIGURATION_SET_NOT_FOUND"
  | "TEMPLATE_NOT_FOUND"
  | "ACCOUNT_SUSPENDED"
  | "ACCOUNT_THROTTLED"
  | "ACCOUNT_DAILY_QUOTA_EXCEEDED"
  | "INVALID_SENDING_POOL_NAME"
  | "ACCOUNT_SENDING_PAUSED"
  | "CONFIGURATION_SET_SENDING_PAUSED"
  | "INVALID_PARAMETER"
  | "TRANSIENT_FAILURE"
  | "FAILED"
  | (string & {});
export const BulkEmailStatus = S.String;

export interface BulkEmailEntryResult {
  Status?: BulkEmailStatus;
  Error?: string;
  MessageId?: string;
}
export const BulkEmailEntryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(BulkEmailStatus),
    Error: S.optional(S.String),
    MessageId: S.optional(S.String),
  }),
).annotate({
  identifier: "BulkEmailEntryResult",
}) as any as S.Schema<BulkEmailEntryResult>;
export type BulkEmailEntryResultList = BulkEmailEntryResult[];
export const BulkEmailEntryResultList =
  /*@__PURE__*/ S.Array(BulkEmailEntryResult);
export interface SendBulkEmailResponse {
  BulkEmailEntryResults: BulkEmailEntryResult[];
}
export const SendBulkEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BulkEmailEntryResults: BulkEmailEntryResultList }),
).annotate({
  identifier: "SendBulkEmailResponse",
}) as any as S.Schema<SendBulkEmailResponse>;
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string;
}
export const SendCustomVerificationEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String,
    TemplateName: S.String,
    ConfigurationSetName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/email/outbound-custom-verification-emails",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendCustomVerificationEmailRequest",
}) as any as S.Schema<SendCustomVerificationEmailRequest>;
export interface SendCustomVerificationEmailResponse {
  MessageId?: string;
}
export const SendCustomVerificationEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendCustomVerificationEmailResponse",
}) as any as S.Schema<SendCustomVerificationEmailResponse>;
export interface ListManagementOptions {
  ContactListName: string;
  TopicName?: string;
}
export const ListManagementOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactListName: S.String, TopicName: S.optional(S.String) }),
).annotate({
  identifier: "ListManagementOptions",
}) as any as S.Schema<ListManagementOptions>;
export interface SendEmailRequest {
  FromEmailAddress?: string;
  FromEmailAddressIdentityArn?: string;
  Destination?: Destination;
  ReplyToAddresses?: string[];
  FeedbackForwardingEmailAddress?: string;
  FeedbackForwardingEmailAddressIdentityArn?: string;
  Content: EmailContent;
  EmailTags?: MessageTag[];
  ConfigurationSetName?: string;
  EndpointId?: string;
  TenantName?: string;
  ListManagementOptions?: ListManagementOptions;
  ConfigurationOverrides?: ConfigurationOverrides;
}
export const SendEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromEmailAddress: S.optional(S.String),
    FromEmailAddressIdentityArn: S.optional(S.String),
    Destination: S.optional(Destination),
    ReplyToAddresses: S.optional(EmailAddressList),
    FeedbackForwardingEmailAddress: S.optional(S.String),
    FeedbackForwardingEmailAddressIdentityArn: S.optional(S.String),
    Content: EmailContent,
    EmailTags: S.optional(MessageTagList),
    ConfigurationSetName: S.optional(S.String),
    EndpointId: S.optional(S.String).pipe(T.ContextParam("EndpointId")),
    TenantName: S.optional(S.String),
    ListManagementOptions: S.optional(ListManagementOptions),
    ConfigurationOverrides: S.optional(ConfigurationOverrides),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/outbound-emails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendEmailRequest",
}) as any as S.Schema<SendEmailRequest>;
export interface SendEmailResponse {
  MessageId?: string;
}
export const SendEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendEmailResponse",
}) as any as S.Schema<SendEmailResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/email/tags" }),
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
export interface TestRenderEmailTemplateRequest {
  TemplateName: string;
  TemplateData: string;
}
export const TestRenderEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    TemplateData: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v2/email/templates/{TemplateName}/render",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestRenderEmailTemplateRequest",
}) as any as S.Schema<TestRenderEmailTemplateRequest>;
export type RenderedEmailTemplate = string;
export interface TestRenderEmailTemplateResponse {
  RenderedTemplate: string;
}
export const TestRenderEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RenderedTemplate: S.String }),
).annotate({
  identifier: "TestRenderEmailTemplateResponse",
}) as any as S.Schema<TestRenderEmailTemplateResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("TagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/email/tags" }),
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
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export const UpdateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
      EventDestination: EventDestinationDefinition,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>;
export interface UpdateConfigurationSetEventDestinationResponse {}
export const UpdateConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>;
export interface UpdateContactRequest {
  ContactListName: string;
  EmailAddress: string;
  TopicPreferences?: TopicPreference[];
  UnsubscribeAll?: boolean;
  AttributesData?: string;
}
export const UpdateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
    EmailAddress: S.String.pipe(T.HttpLabel("EmailAddress")),
    TopicPreferences: S.optional(TopicPreferenceList),
    UnsubscribeAll: S.optional(S.Boolean),
    AttributesData: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/email/contact-lists/{ContactListName}/contacts/{EmailAddress}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContactRequest",
}) as any as S.Schema<UpdateContactRequest>;
export interface UpdateContactResponse {}
export const UpdateContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateContactResponse",
}) as any as S.Schema<UpdateContactResponse>;
export interface UpdateContactListRequest {
  ContactListName: string;
  Topics?: Topic[];
  Description?: string;
}
export const UpdateContactListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactListName: S.String.pipe(T.HttpLabel("ContactListName")),
    Topics: S.optional(Topics),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/email/contact-lists/{ContactListName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContactListRequest",
}) as any as S.Schema<UpdateContactListRequest>;
export interface UpdateContactListResponse {}
export const UpdateContactListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateContactListResponse",
}) as any as S.Schema<UpdateContactListResponse>;
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export const UpdateCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
      FromEmailAddress: S.String,
      TemplateSubject: S.String,
      TemplateContent: S.String,
      SuccessRedirectionURL: S.String,
      FailureRedirectionURL: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/custom-verification-email-templates/{TemplateName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<UpdateCustomVerificationEmailTemplateRequest>;
export interface UpdateCustomVerificationEmailTemplateResponse {}
export const UpdateCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<UpdateCustomVerificationEmailTemplateResponse>;
export interface UpdateEmailIdentityPolicyRequest {
  EmailIdentity: string;
  PolicyName: string;
  Policy: string;
}
export const UpdateEmailIdentityPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
    PolicyName: S.String.pipe(T.HttpLabel("PolicyName")),
    Policy: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/email/identities/{EmailIdentity}/policies/{PolicyName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEmailIdentityPolicyRequest",
}) as any as S.Schema<UpdateEmailIdentityPolicyRequest>;
export interface UpdateEmailIdentityPolicyResponse {}
export const UpdateEmailIdentityPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateEmailIdentityPolicyResponse",
}) as any as S.Schema<UpdateEmailIdentityPolicyResponse>;
export interface UpdateEmailTemplateRequest {
  TemplateName: string;
  TemplateContent: EmailTemplateContent;
}
export const UpdateEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    TemplateContent: EmailTemplateContent,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/email/templates/{TemplateName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEmailTemplateRequest",
}) as any as S.Schema<UpdateEmailTemplateRequest>;
export interface UpdateEmailTemplateResponse {}
export const UpdateEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateEmailTemplateResponse",
}) as any as S.Schema<UpdateEmailTemplateResponse>;
export interface UpdateReputationEntityCustomerManagedStatusRequest {
  ReputationEntityType: ReputationEntityType;
  ReputationEntityReference: string;
  SendingStatus: SendingStatus;
}
export const UpdateReputationEntityCustomerManagedStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReputationEntityType: ReputationEntityType.pipe(
        T.HttpLabel("ReputationEntityType"),
      ),
      ReputationEntityReference: S.String.pipe(
        T.HttpLabel("ReputationEntityReference"),
      ),
      SendingStatus: SendingStatus,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}/customer-managed-status",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateReputationEntityCustomerManagedStatusRequest",
  }) as any as S.Schema<UpdateReputationEntityCustomerManagedStatusRequest>;
export interface UpdateReputationEntityCustomerManagedStatusResponse {}
export const UpdateReputationEntityCustomerManagedStatusResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateReputationEntityCustomerManagedStatusResponse",
  }) as any as S.Schema<UpdateReputationEntityCustomerManagedStatusResponse>;
export interface UpdateReputationEntityPolicyRequest {
  ReputationEntityType: ReputationEntityType;
  ReputationEntityReference: string;
  ReputationEntityPolicy: string;
}
export const UpdateReputationEntityPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReputationEntityType: ReputationEntityType.pipe(
      T.HttpLabel("ReputationEntityType"),
    ),
    ReputationEntityReference: S.String.pipe(
      T.HttpLabel("ReputationEntityReference"),
    ),
    ReputationEntityPolicy: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v2/email/reputation/entities/{ReputationEntityType}/{ReputationEntityReference}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReputationEntityPolicyRequest",
}) as any as S.Schema<UpdateReputationEntityPolicyRequest>;
export interface UpdateReputationEntityPolicyResponse {}
export const UpdateReputationEntityPolicyResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateReputationEntityPolicyResponse",
}) as any as S.Schema<UpdateReputationEntityPolicyResponse>;
export type BatchGetMetricDataError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves batches of metric data collected based on your sending activity.
 *
 * You can execute this operation no more than 16 times per second,
 * and with at most 160 queries from the batches per second (cumulative).
 */
export const batchGetMetricData: API.OperationMethod<
  BatchGetMetricDataRequest,
  BatchGetMetricDataResponse,
  BatchGetMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetMetricDataRequest,
  output: BatchGetMetricDataResponse,
  errors: [
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMetricData",
}));

export type CancelExportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels an export job.
 */
export const cancelExportJob: API.OperationMethod<
  CancelExportJobRequest,
  CancelExportJobResponse,
  CancelExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelExportJobRequest,
  output: CancelExportJobResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelExportJob",
}));

export type CreateConfigurationSetError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a configuration set. *Configuration sets* are groups of
 * rules that you can apply to the emails that you send. You apply a configuration set to
 * an email by specifying the name of the configuration set when you call the Amazon SES API v2. When
 * you apply a configuration set to an email, all of the rules in that configuration set
 * are applied to the email.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetRequest,
  output: CreateConfigurationSetResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
}));

export type CreateConfigurationSetEventDestinationError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an event destination. *Events* include message sends,
 * deliveries, opens, clicks, bounces, and complaints. Event
 * destinations are places that you can send information about these events
 * to. For example, you can send event data to Amazon EventBridge and associate a rule to send the event
 * to the specified target.
 *
 * A single configuration set can include more than one event destination.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetEventDestinationRequest,
  output: CreateConfigurationSetEventDestinationResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
}));

export type CreateContactError =
  | AlreadyExistsException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a contact, which is an end-user who is receiving the email, and adds them to a
 * contact list.
 */
export const createContact: API.OperationMethod<
  CreateContactRequest,
  CreateContactResponse,
  CreateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContactRequest,
  output: CreateContactResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContact",
}));

export type CreateContactListError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a contact list.
 */
export const createContactList: API.OperationMethod<
  CreateContactListRequest,
  CreateContactListResponse,
  CreateContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContactListRequest,
  output: CreateContactListResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactList",
}));

export type CreateCustomVerificationEmailTemplateError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createCustomVerificationEmailTemplate: API.OperationMethod<
  CreateCustomVerificationEmailTemplateRequest,
  CreateCustomVerificationEmailTemplateResponse,
  CreateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomVerificationEmailTemplateRequest,
  output: CreateCustomVerificationEmailTemplateResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomVerificationEmailTemplate",
}));

export type CreateDedicatedIpPoolError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new pool of dedicated IP addresses. A pool can include one or more dedicated
 * IP addresses that are associated with your Amazon Web Services account. You can associate a pool with
 * a configuration set. When you send an email that uses that configuration set, the
 * message is sent from one of the addresses in the associated pool.
 */
export const createDedicatedIpPool: API.OperationMethod<
  CreateDedicatedIpPoolRequest,
  CreateDedicatedIpPoolResponse,
  CreateDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDedicatedIpPoolRequest,
  output: CreateDedicatedIpPoolResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDedicatedIpPool",
}));

export type CreateDeliverabilityTestReportError =
  | AccountSuspendedException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new predictive inbox placement test. Predictive inbox placement tests can help you predict how your messages will be handled
 * by various email providers around the world. When you perform a predictive inbox placement test, you provide a
 * sample message that contains the content that you plan to send to your customers. Amazon SES
 * then sends that message to special email addresses spread across several major email
 * providers. After about 24 hours, the test is complete, and you can use the
 * `GetDeliverabilityTestReport` operation to view the results of the
 * test.
 */
export const createDeliverabilityTestReport: API.OperationMethod<
  CreateDeliverabilityTestReportRequest,
  CreateDeliverabilityTestReportResponse,
  CreateDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeliverabilityTestReportRequest,
  output: CreateDeliverabilityTestReportResponse,
  errors: [
    AccountSuspendedException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeliverabilityTestReport",
}));

export type CreateEmailIdentityError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts the process of verifying an email identity. An *identity* is
 * an email address or domain that you use when you send email. Before you can use an
 * identity to send email, you first have to verify it. By verifying an identity, you
 * demonstrate that you're the owner of the identity, and that you've given Amazon SES API v2
 * permission to send email from the identity.
 *
 * When you verify an email address, Amazon SES sends an email to the address. Your email
 * address is verified as soon as you follow the link in the verification email.
 *
 * When you verify a domain without specifying the `DkimSigningAttributes`
 * object, this operation provides a set of DKIM tokens. You can convert these tokens into
 * CNAME records, which you then add to the DNS configuration for your domain. Your domain
 * is verified when Amazon SES detects these records in the DNS configuration for your domain.
 * This verification method is known as Easy DKIM.
 *
 * Alternatively, you can perform the verification process by providing your own
 * public-private key pair. This verification method is known as Bring Your Own DKIM
 * (BYODKIM). To use BYODKIM, your call to the `CreateEmailIdentity` operation
 * has to include the `DkimSigningAttributes` object. When you specify this
 * object, you provide a selector (a component of the DNS record name that identifies the
 * public key to use for DKIM authentication) and a private key.
 *
 * When you verify a domain, this operation provides a set of DKIM tokens, which you can
 * convert into CNAME tokens. You add these CNAME tokens to the DNS configuration for your
 * domain. Your domain is verified when Amazon SES detects these records in the DNS
 * configuration for your domain. For some DNS providers, it can take 72 hours or more to
 * complete the domain verification process.
 *
 * Additionally, you can associate an existing configuration set with the email identity that you're verifying.
 */
export const createEmailIdentity: API.OperationMethod<
  CreateEmailIdentityRequest,
  CreateEmailIdentityResponse,
  CreateEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEmailIdentityRequest,
  output: CreateEmailIdentityResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailIdentity",
}));

export type CreateEmailIdentityPolicyError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates the specified sending authorization policy for the given identity (an email
 * address or a domain).
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createEmailIdentityPolicy: API.OperationMethod<
  CreateEmailIdentityPolicyRequest,
  CreateEmailIdentityPolicyResponse,
  CreateEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEmailIdentityPolicyRequest,
  output: CreateEmailIdentityPolicyResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailIdentityPolicy",
}));

export type CreateEmailTemplateError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single API operation. For more information, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createEmailTemplate: API.OperationMethod<
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  CreateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEmailTemplateRequest,
  output: CreateEmailTemplateResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailTemplate",
}));

export type CreateExportJobError =
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an export job for a data source and destination.
 *
 * You can execute this operation no more than once per second.
 */
export const createExportJob: API.OperationMethod<
  CreateExportJobRequest,
  CreateExportJobResponse,
  CreateExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExportJobRequest,
  output: CreateExportJobResponse,
  errors: [
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportJob",
}));

export type CreateImportJobError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an import job for a data destination.
 */
export const createImportJob: API.OperationMethod<
  CreateImportJobRequest,
  CreateImportJobResponse,
  CreateImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateImportJobRequest,
  output: CreateImportJobResponse,
  errors: [
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportJob",
}));

export type CreateMultiRegionEndpointError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a multi-region endpoint (global-endpoint).
 *
 * The primary region is going to be the AWS-Region where the operation is executed.
 * The secondary region has to be provided in request's parameters.
 * From the data flow standpoint there is no difference between primary
 * and secondary regions - sending traffic is divided between the two.
 * The primary region is the region where the resource has been created and where it can be managed.
 */
export const createMultiRegionEndpoint: API.OperationMethod<
  CreateMultiRegionEndpointRequest,
  CreateMultiRegionEndpointResponse,
  CreateMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMultiRegionEndpointRequest,
  output: CreateMultiRegionEndpointResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionEndpoint",
}));

export type CreateTenantError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a tenant.
 *
 * *Tenants* are logical containers that group related SES resources together.
 * Each tenant can have its own set of resources like email identities, configuration sets,
 * and templates, along with reputation metrics and sending status. This helps isolate and manage
 * email sending for different customers or business units within your Amazon SES API v2 account.
 *
 * You can optionally specify `SuppressionAttributes` to configure tenant-level
 * suppression at creation time. When tenant-level suppression is enabled, Amazon SES maintains a
 * separate suppression list for the tenant instead of using the account-level suppression list.
 */
export const createTenant: API.OperationMethod<
  CreateTenantRequest,
  CreateTenantResponse,
  CreateTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTenantRequest,
  output: CreateTenantResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenant",
}));

export type CreateTenantResourceAssociationError =
  | AlreadyExistsException
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate a resource with a tenant.
 *
 * *Resources* can be email identities, configuration sets, or email templates.
 * When you associate a resource with a tenant, you can use that resource when sending emails
 * on behalf of that tenant.
 *
 * A single resource can be associated with multiple tenants, allowing for resource sharing
 * across different tenants while maintaining isolation in email sending operations.
 */
export const createTenantResourceAssociation: API.OperationMethod<
  CreateTenantResourceAssociationRequest,
  CreateTenantResourceAssociationResponse,
  CreateTenantResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTenantResourceAssociationRequest,
  output: CreateTenantResourceAssociationResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTenantResourceAssociation",
}));

export type DeleteConfigurationSetError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an existing configuration set.
 *
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetRequest,
  output: DeleteConfigurationSetResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an event destination.
 *
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetEventDestinationRequest,
  output: DeleteConfigurationSetEventDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

export type DeleteContactError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a contact from a contact list.
 */
export const deleteContact: API.OperationMethod<
  DeleteContactRequest,
  DeleteContactResponse,
  DeleteContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContactRequest,
  output: DeleteContactResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContact",
}));

export type DeleteContactListError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a contact list and all of the contacts on that list.
 */
export const deleteContactList: API.OperationMethod<
  DeleteContactListRequest,
  DeleteContactListResponse,
  DeleteContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContactListRequest,
  output: DeleteContactListResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactList",
}));

export type DeleteCustomVerificationEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteCustomVerificationEmailTemplate: API.OperationMethod<
  DeleteCustomVerificationEmailTemplateRequest,
  DeleteCustomVerificationEmailTemplateResponse,
  DeleteCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomVerificationEmailTemplateRequest,
  output: DeleteCustomVerificationEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVerificationEmailTemplate",
}));

export type DeleteDedicatedIpPoolError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a dedicated IP pool.
 */
export const deleteDedicatedIpPool: API.OperationMethod<
  DeleteDedicatedIpPoolRequest,
  DeleteDedicatedIpPoolResponse,
  DeleteDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDedicatedIpPoolRequest,
  output: DeleteDedicatedIpPoolResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDedicatedIpPool",
}));

export type DeleteEmailIdentityError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an email identity. An identity can be either an email address or a domain
 * name.
 */
export const deleteEmailIdentity: API.OperationMethod<
  DeleteEmailIdentityRequest,
  DeleteEmailIdentityResponse,
  DeleteEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailIdentityRequest,
  output: DeleteEmailIdentityResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentity",
}));

export type DeleteEmailIdentityPolicyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified sending authorization policy for the given identity (an email
 * address or a domain). This API returns successfully even if a policy with the specified
 * name does not exist.
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteEmailIdentityPolicy: API.OperationMethod<
  DeleteEmailIdentityPolicyRequest,
  DeleteEmailIdentityPolicyResponse,
  DeleteEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailIdentityPolicyRequest,
  output: DeleteEmailIdentityPolicyResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentityPolicy",
}));

export type DeleteEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an email template.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteEmailTemplate: API.OperationMethod<
  DeleteEmailTemplateRequest,
  DeleteEmailTemplateResponse,
  DeleteEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailTemplateRequest,
  output: DeleteEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailTemplate",
}));

export type DeleteMultiRegionEndpointError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a multi-region endpoint (global-endpoint).
 *
 * Only multi-region endpoints (global-endpoints) whose primary region is the AWS-Region
 * where operation is executed can be deleted.
 */
export const deleteMultiRegionEndpoint: API.OperationMethod<
  DeleteMultiRegionEndpointRequest,
  DeleteMultiRegionEndpointResponse,
  DeleteMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMultiRegionEndpointRequest,
  output: DeleteMultiRegionEndpointResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionEndpoint",
}));

export type DeleteSuppressedDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an email address from the suppression list for your account or for a specific
 * tenant. To target a tenant's suppression list, specify the `TenantName`
 * parameter. If you omit `TenantName`, the address is removed from the
 * account-level suppression list.
 */
export const deleteSuppressedDestination: API.OperationMethod<
  DeleteSuppressedDestinationRequest,
  DeleteSuppressedDestinationResponse,
  DeleteSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSuppressedDestinationRequest,
  output: DeleteSuppressedDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuppressedDestination",
}));

export type DeleteTenantError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an existing tenant.
 *
 * When you delete a tenant, its associations with resources
 * are removed, but the resources themselves are not deleted.
 */
export const deleteTenant: API.OperationMethod<
  DeleteTenantRequest,
  DeleteTenantResponse,
  DeleteTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTenantRequest,
  output: DeleteTenantResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenant",
}));

export type DeleteTenantResourceAssociationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an association between a tenant and a resource.
 *
 * When you delete a tenant-resource association, the resource itself is not deleted,
 * only its association with the specific tenant is removed. After removal, the resource
 * will no longer be available for use with that tenant's email sending operations.
 */
export const deleteTenantResourceAssociation: API.OperationMethod<
  DeleteTenantResourceAssociationRequest,
  DeleteTenantResourceAssociationResponse,
  DeleteTenantResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTenantResourceAssociationRequest,
  output: DeleteTenantResourceAssociationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTenantResourceAssociation",
}));

export type GetAccountError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Obtain information about the email-sending status and capabilities of your Amazon SES
 * account in the current Amazon Web Services Region.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountRequest,
  output: GetAccountResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
}));

export type GetBlacklistReportsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the blacklists that your dedicated IP addresses appear on.
 */
export const getBlacklistReports: API.OperationMethod<
  GetBlacklistReportsRequest,
  GetBlacklistReportsResponse,
  GetBlacklistReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlacklistReportsRequest,
  output: GetBlacklistReportsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlacklistReports",
}));

export type GetConfigurationSetError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about an existing configuration set, including the dedicated IP pool
 * that it's associated with, whether or not it's enabled for sending email, and
 * more.
 *
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const getConfigurationSet: API.OperationMethod<
  GetConfigurationSetRequest,
  GetConfigurationSetResponse,
  GetConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationSetRequest,
  output: GetConfigurationSetResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSet",
}));

export type GetConfigurationSetEventDestinationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of event destinations that are associated with a configuration
 * set.
 *
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationSetEventDestinationsRequest,
  output: GetConfigurationSetEventDestinationsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
}));

export type GetContactError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a contact from a contact list.
 */
export const getContact: API.OperationMethod<
  GetContactRequest,
  GetContactResponse,
  GetContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactRequest,
  output: GetContactResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContact",
}));

export type GetContactListError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns contact list metadata. It does not return any information about the contacts
 * present in the list.
 */
export const getContactList: API.OperationMethod<
  GetContactListRequest,
  GetContactListResponse,
  GetContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactListRequest,
  output: GetContactListResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactList",
}));

export type GetCustomVerificationEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the custom email verification template for the template name you
 * specify.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getCustomVerificationEmailTemplate: API.OperationMethod<
  GetCustomVerificationEmailTemplateRequest,
  GetCustomVerificationEmailTemplateResponse,
  GetCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomVerificationEmailTemplateRequest,
  output: GetCustomVerificationEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomVerificationEmailTemplate",
}));

export type GetDedicatedIpError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about a dedicated IP address, including the name of the dedicated IP
 * pool that it's associated with, as well information about the automatic warm-up process
 * for the address.
 */
export const getDedicatedIp: API.OperationMethod<
  GetDedicatedIpRequest,
  GetDedicatedIpResponse,
  GetDedicatedIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDedicatedIpRequest,
  output: GetDedicatedIpResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIp",
}));

export type GetDedicatedIpPoolError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the dedicated pool.
 */
export const getDedicatedIpPool: API.OperationMethod<
  GetDedicatedIpPoolRequest,
  GetDedicatedIpPoolResponse,
  GetDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDedicatedIpPoolRequest,
  output: GetDedicatedIpPoolResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIpPool",
}));

export type GetDedicatedIpsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the dedicated IP addresses that are associated with your Amazon Web Services
 * account.
 */
export const getDedicatedIps: API.PaginatedOperationMethod<
  GetDedicatedIpsRequest,
  GetDedicatedIpsResponse,
  GetDedicatedIpsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDedicatedIpsRequest,
  output: GetDedicatedIpsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetDeliverabilityDashboardOptionsError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the status of the Deliverability dashboard for your account. When
 * the Deliverability dashboard is enabled, you gain access to reputation, deliverability, and other
 * metrics for the domains that you use to send email. You also gain the ability to perform
 * predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon SES and other Amazon Web Services services. For more
 * information about the features and cost of a Deliverability dashboard subscription, see Amazon SES Pricing.
 */
export const getDeliverabilityDashboardOptions: API.OperationMethod<
  GetDeliverabilityDashboardOptionsRequest,
  GetDeliverabilityDashboardOptionsResponse,
  GetDeliverabilityDashboardOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeliverabilityDashboardOptionsRequest,
  output: GetDeliverabilityDashboardOptionsResponse,
  errors: [
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityDashboardOptions",
}));

export type GetDeliverabilityTestReportError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the results of a predictive inbox placement test.
 */
export const getDeliverabilityTestReport: API.OperationMethod<
  GetDeliverabilityTestReportRequest,
  GetDeliverabilityTestReportResponse,
  GetDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeliverabilityTestReportRequest,
  output: GetDeliverabilityTestReportResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityTestReport",
}));

export type GetDomainDeliverabilityCampaignError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve all the deliverability data for a specific campaign. This data is available
 * for a campaign only if the campaign sent email by using a domain that the
 * Deliverability dashboard is enabled for.
 */
export const getDomainDeliverabilityCampaign: API.OperationMethod<
  GetDomainDeliverabilityCampaignRequest,
  GetDomainDeliverabilityCampaignResponse,
  GetDomainDeliverabilityCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainDeliverabilityCampaignRequest,
  output: GetDomainDeliverabilityCampaignResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainDeliverabilityCampaign",
}));

export type GetDomainStatisticsReportError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve inbox placement and engagement rates for the domains that you use to send
 * email.
 */
export const getDomainStatisticsReport: API.OperationMethod<
  GetDomainStatisticsReportRequest,
  GetDomainStatisticsReportResponse,
  GetDomainStatisticsReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainStatisticsReportRequest,
  output: GetDomainStatisticsReportResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainStatisticsReport",
}));

export type GetEmailAddressInsightsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides validation insights about a specific email address, including syntax validation, DNS record checks, mailbox existence, and other deliverability factors.
 */
export const getEmailAddressInsights: API.OperationMethod<
  GetEmailAddressInsightsRequest,
  GetEmailAddressInsightsResponse,
  GetEmailAddressInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailAddressInsightsRequest,
  output: GetEmailAddressInsightsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailAddressInsights",
}));

export type GetEmailIdentityError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a specific identity, including the identity's verification
 * status, sending authorization policies, its DKIM authentication status, and its custom
 * Mail-From settings.
 */
export const getEmailIdentity: API.OperationMethod<
  GetEmailIdentityRequest,
  GetEmailIdentityResponse,
  GetEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailIdentityRequest,
  output: GetEmailIdentityResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentity",
}));

export type GetEmailIdentityPoliciesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the requested sending authorization policies for the given identity (an email
 * address or a domain). The policies are returned as a map of policy names to policy
 * contents. You can retrieve a maximum of 20 policies at a time.
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getEmailIdentityPolicies: API.OperationMethod<
  GetEmailIdentityPoliciesRequest,
  GetEmailIdentityPoliciesResponse,
  GetEmailIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailIdentityPoliciesRequest,
  output: GetEmailIdentityPoliciesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentityPolicies",
}));

export type GetEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the template object (which includes the subject line, HTML part and text
 * part) for the template you specify.
 *
 * You can execute this operation no more than 50 times per second.
 */
export const getEmailTemplate: API.OperationMethod<
  GetEmailTemplateRequest,
  GetEmailTemplateResponse,
  GetEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailTemplateRequest,
  output: GetEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailTemplate",
}));

export type GetExportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about an export job.
 */
export const getExportJob: API.OperationMethod<
  GetExportJobRequest,
  GetExportJobResponse,
  GetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportJobRequest,
  output: GetExportJobResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJob",
}));

export type GetImportJobError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about an import job.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportJobRequest,
  output: GetImportJobResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
}));

export type GetMessageInsightsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a specific message, including the from address, the
 * subject, the recipient address, email tags, as well as events associated with the message.
 *
 * You can execute this operation no more than once per second.
 */
export const getMessageInsights: API.OperationMethod<
  GetMessageInsightsRequest,
  GetMessageInsightsResponse,
  GetMessageInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMessageInsightsRequest,
  output: GetMessageInsightsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMessageInsights",
}));

export type GetMultiRegionEndpointError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the multi-region endpoint (global-endpoint) configuration.
 *
 * Only multi-region endpoints (global-endpoints) whose primary region is the AWS-Region
 * where operation is executed can be displayed.
 */
export const getMultiRegionEndpoint: API.OperationMethod<
  GetMultiRegionEndpointRequest,
  GetMultiRegionEndpointResponse,
  GetMultiRegionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMultiRegionEndpointRequest,
  output: GetMultiRegionEndpointResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionEndpoint",
}));

export type GetReputationEntityError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about a specific reputation entity, including its reputation
 * management policy, customer-managed status, Amazon Web Services Amazon SES-managed status, and aggregate
 * sending status.
 *
 * *Reputation entities* represent resources in your Amazon SES account that have reputation
 * tracking and management capabilities. The reputation impact reflects the highest
 * impact reputation finding for the entity. Reputation findings can be retrieved
 * using the `ListRecommendations` operation.
 */
export const getReputationEntity: API.OperationMethod<
  GetReputationEntityRequest,
  GetReputationEntityResponse,
  GetReputationEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReputationEntityRequest,
  output: GetReputationEntityResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReputationEntity",
}));

export type GetSuppressedDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific email address that's on the suppression list
 * for your account or for a specific tenant. To target a tenant's suppression list,
 * specify the `TenantName` parameter. If you omit `TenantName`,
 * the operation targets the account-level suppression list.
 */
export const getSuppressedDestination: API.OperationMethod<
  GetSuppressedDestinationRequest,
  GetSuppressedDestinationResponse,
  GetSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSuppressedDestinationRequest,
  output: GetSuppressedDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSuppressedDestination",
}));

export type GetTenantError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about a specific tenant, including the tenant's name, ID, ARN,
 * creation timestamp, tags, sending status, and suppression attributes.
 */
export const getTenant: API.OperationMethod<
  GetTenantRequest,
  GetTenantResponse,
  GetTenantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTenantRequest,
  output: GetTenantResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTenant",
}));

export type ListConfigurationSetsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the configuration sets associated with your account in the current
 * region.
 *
 * *Configuration sets* are groups of rules that you can apply to the
 * emails you send. You apply a configuration set to an email by including a reference to
 * the configuration set in the headers of the email. When you apply a configuration set to
 * an email, all of the rules in that configuration set are applied to the email.
 */
export const listConfigurationSets: API.PaginatedOperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationSetsRequest,
  output: ListConfigurationSetsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListContactListsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the contact lists available.
 *
 * If your output includes a "NextToken" field with a string value, this indicates there may be additional
 * contacts on the filtered list - regardless of the number of contacts returned.
 */
export const listContactLists: API.PaginatedOperationMethod<
  ListContactListsRequest,
  ListContactListsResponse,
  ListContactListsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContactListsRequest,
  output: ListContactListsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListContactsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the contacts present in a specific contact list.
 */
export const listContacts: API.PaginatedOperationMethod<
  ListContactsRequest,
  ListContactsResponse,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContactsRequest,
  output: ListContactsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListCustomVerificationEmailTemplatesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the existing custom verification email templates for your account in the current
 * Amazon Web Services Region.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listCustomVerificationEmailTemplates: API.PaginatedOperationMethod<
  ListCustomVerificationEmailTemplatesRequest,
  ListCustomVerificationEmailTemplatesResponse,
  ListCustomVerificationEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomVerificationEmailTemplatesRequest,
  output: ListCustomVerificationEmailTemplatesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVerificationEmailTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDedicatedIpPoolsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the dedicated IP pools that exist in your Amazon Web Services account in the current
 * Region.
 */
export const listDedicatedIpPools: API.PaginatedOperationMethod<
  ListDedicatedIpPoolsRequest,
  ListDedicatedIpPoolsResponse,
  ListDedicatedIpPoolsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDedicatedIpPoolsRequest,
  output: ListDedicatedIpPoolsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDedicatedIpPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDeliverabilityTestReportsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Show a list of the predictive inbox placement tests that you've performed, regardless of their statuses. For
 * predictive inbox placement tests that are complete, you can use the `GetDeliverabilityTestReport`
 * operation to view the results.
 */
export const listDeliverabilityTestReports: API.PaginatedOperationMethod<
  ListDeliverabilityTestReportsRequest,
  ListDeliverabilityTestReportsResponse,
  ListDeliverabilityTestReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeliverabilityTestReportsRequest,
  output: ListDeliverabilityTestReportsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliverabilityTestReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDomainDeliverabilityCampaignsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve deliverability data for all the campaigns that used a specific domain to send
 * email during a specified time range. This data is available for a domain only if you
 * enabled the Deliverability dashboard for the domain.
 */
export const listDomainDeliverabilityCampaigns: API.PaginatedOperationMethod<
  ListDomainDeliverabilityCampaignsRequest,
  ListDomainDeliverabilityCampaignsResponse,
  ListDomainDeliverabilityCampaignsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainDeliverabilityCampaignsRequest,
  output: ListDomainDeliverabilityCampaignsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainDeliverabilityCampaigns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListEmailIdentitiesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of all of the email identities that are associated with your Amazon Web Services
 * account. An identity can be either an email address or a domain. This operation returns
 * identities that are verified as well as those that aren't. This operation returns
 * identities that are associated with Amazon SES and Amazon Pinpoint.
 */
export const listEmailIdentities: API.PaginatedOperationMethod<
  ListEmailIdentitiesRequest,
  ListEmailIdentitiesResponse,
  ListEmailIdentitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEmailIdentitiesRequest,
  output: ListEmailIdentitiesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListEmailTemplatesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the email templates present in your Amazon SES account in the current Amazon Web Services
 * Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listEmailTemplates: API.PaginatedOperationMethod<
  ListEmailTemplatesRequest,
  ListEmailTemplatesResponse,
  ListEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEmailTemplatesRequest,
  output: ListEmailTemplatesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListExportJobsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the export jobs.
 */
export const listExportJobs: API.PaginatedOperationMethod<
  ListExportJobsRequest,
  ListExportJobsResponse,
  ListExportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportJobsRequest,
  output: ListExportJobsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListImportJobsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the import jobs.
 */
export const listImportJobs: API.PaginatedOperationMethod<
  ListImportJobsRequest,
  ListImportJobsResponse,
  ListImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportJobsRequest,
  output: ListImportJobsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListMultiRegionEndpointsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the multi-region endpoints (global-endpoints).
 *
 * Only multi-region endpoints (global-endpoints) whose primary region is the AWS-Region
 * where operation is executed will be listed.
 */
export const listMultiRegionEndpoints: API.PaginatedOperationMethod<
  ListMultiRegionEndpointsRequest,
  ListMultiRegionEndpointsResponse,
  ListMultiRegionEndpointsError,
  Credentials | HttpClient.HttpClient,
  MultiRegionEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMultiRegionEndpointsRequest,
  output: ListMultiRegionEndpointsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiRegionEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiRegionEndpoints",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRecommendationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the recommendations present in your Amazon SES account in the current Amazon Web Services Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationsRequest,
  output: ListRecommendationsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListReputationEntitiesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List reputation entities in your Amazon SES account in the current Amazon Web Services Region.
 * You can filter the results by entity type, reputation impact, sending status,
 * or entity reference prefix.
 *
 * *Reputation entities* represent resources in your account that have reputation
 * tracking and management capabilities. Use this operation to get an overview of
 * all entities and their current reputation status.
 */
export const listReputationEntities: API.PaginatedOperationMethod<
  ListReputationEntitiesRequest,
  ListReputationEntitiesResponse,
  ListReputationEntitiesError,
  Credentials | HttpClient.HttpClient,
  ReputationEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReputationEntitiesRequest,
  output: ListReputationEntitiesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReputationEntities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReputationEntities",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListResourceTenantsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all tenants associated with a specific resource.
 *
 * This operation returns a list of tenants that are associated with the specified
 * resource. This is useful for understanding which tenants are currently using a particular
 * resource such as an email identity, configuration set, or email template.
 */
export const listResourceTenants: API.PaginatedOperationMethod<
  ListResourceTenantsRequest,
  ListResourceTenantsResponse,
  ListResourceTenantsError,
  Credentials | HttpClient.HttpClient,
  ResourceTenantMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceTenantsRequest,
  output: ListResourceTenantsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTenants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceTenants",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListSuppressedDestinationsError =
  | BadRequestException
  | InvalidNextTokenException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a list of email addresses that are on the suppression list for your
 * account or for a specific tenant. To target a tenant's suppression list, specify the
 * `TenantName` parameter. If you omit `TenantName`, the operation
 * targets the account-level suppression list.
 */
export const listSuppressedDestinations: API.PaginatedOperationMethod<
  ListSuppressedDestinationsRequest,
  ListSuppressedDestinationsResponse,
  ListSuppressedDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSuppressedDestinationsRequest,
  output: ListSuppressedDestinationsResponse,
  errors: [
    BadRequestException,
    InvalidNextTokenException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuppressedDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the tags (keys and values) that are associated with a specified
 * resource. A *tag* is a label that you optionally define and associate
 * with a resource. Each tag consists of a required *tag key* and an
 * optional associated *tag value*. A tag key is a general label that
 * acts as a category for more specific tag values. A tag value acts as a descriptor within
 * a tag key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTenantResourcesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all resources associated with a specific tenant.
 *
 * This operation returns a list of resources (email identities, configuration sets,
 * or email templates) that are associated with the specified tenant. You can optionally
 * filter the results by resource type.
 */
export const listTenantResources: API.PaginatedOperationMethod<
  ListTenantResourcesRequest,
  ListTenantResourcesResponse,
  ListTenantResourcesError,
  Credentials | HttpClient.HttpClient,
  TenantResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTenantResourcesRequest,
  output: ListTenantResourcesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTenantResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TenantResources",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTenantsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all tenants associated with your account in the current Amazon Web Services Region.
 *
 * This operation returns basic information about each tenant,
 * such as tenant name, ID, ARN, and creation timestamp.
 */
export const listTenants: API.PaginatedOperationMethod<
  ListTenantsRequest,
  ListTenantsResponse,
  ListTenantsError,
  Credentials | HttpClient.HttpClient,
  TenantInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTenantsRequest,
  output: ListTenantsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTenants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tenants",
    pageSize: "PageSize",
  } as const,
})) as any;

export type PutAccountDedicatedIpWarmupAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the automatic warm-up feature for dedicated IP addresses.
 */
export const putAccountDedicatedIpWarmupAttributes: API.OperationMethod<
  PutAccountDedicatedIpWarmupAttributesRequest,
  PutAccountDedicatedIpWarmupAttributesResponse,
  PutAccountDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountDedicatedIpWarmupAttributesRequest,
  output: PutAccountDedicatedIpWarmupAttributesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDedicatedIpWarmupAttributes",
}));

export type PutAccountDetailsError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update your Amazon SES account details.
 */
export const putAccountDetails: API.OperationMethod<
  PutAccountDetailsRequest,
  PutAccountDetailsResponse,
  PutAccountDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountDetailsRequest,
  output: PutAccountDetailsResponse,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDetails",
}));

export type PutAccountPricingAttributesError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Set the pricing plan for your Amazon SES account.
 */
export const putAccountPricingAttributes: API.OperationMethod<
  PutAccountPricingAttributesRequest,
  PutAccountPricingAttributesResponse,
  PutAccountPricingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountPricingAttributesRequest,
  output: PutAccountPricingAttributesResponse,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountPricingAttributes",
}));

export type PutAccountSendingAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the ability of your account to send email.
 */
export const putAccountSendingAttributes: API.OperationMethod<
  PutAccountSendingAttributesRequest,
  PutAccountSendingAttributesResponse,
  PutAccountSendingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountSendingAttributesRequest,
  output: PutAccountSendingAttributesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSendingAttributes",
}));

export type PutAccountSuppressionAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for the account-level suppression list.
 */
export const putAccountSuppressionAttributes: API.OperationMethod<
  PutAccountSuppressionAttributesRequest,
  PutAccountSuppressionAttributesResponse,
  PutAccountSuppressionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountSuppressionAttributesRequest,
  output: PutAccountSuppressionAttributesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSuppressionAttributes",
}));

export type PutAccountVdmAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update your Amazon SES account VDM attributes.
 *
 * You can execute this operation no more than once per second.
 */
export const putAccountVdmAttributes: API.OperationMethod<
  PutAccountVdmAttributesRequest,
  PutAccountVdmAttributesResponse,
  PutAccountVdmAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountVdmAttributesRequest,
  output: PutAccountVdmAttributesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountVdmAttributes",
}));

export type PutConfigurationSetArchivingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate the configuration set with a MailManager archive. When you send email using the
 * `SendEmail` or `SendBulkEmail` operations the message as it will be given
 * to the receiving SMTP server will be archived, along with the recipient information.
 */
export const putConfigurationSetArchivingOptions: API.OperationMethod<
  PutConfigurationSetArchivingOptionsRequest,
  PutConfigurationSetArchivingOptionsResponse,
  PutConfigurationSetArchivingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetArchivingOptionsRequest,
  output: PutConfigurationSetArchivingOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetArchivingOptions",
}));

export type PutConfigurationSetDeliveryOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate a configuration set with a dedicated IP pool. You can use dedicated IP pools
 * to create groups of dedicated IP addresses for sending specific types of email.
 */
export const putConfigurationSetDeliveryOptions: API.OperationMethod<
  PutConfigurationSetDeliveryOptionsRequest,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetDeliveryOptionsRequest,
  output: PutConfigurationSetDeliveryOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
}));

export type PutConfigurationSetReputationOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable collection of reputation metrics for emails that you send using a
 * particular configuration set in a specific Amazon Web Services Region.
 */
export const putConfigurationSetReputationOptions: API.OperationMethod<
  PutConfigurationSetReputationOptionsRequest,
  PutConfigurationSetReputationOptionsResponse,
  PutConfigurationSetReputationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetReputationOptionsRequest,
  output: PutConfigurationSetReputationOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetReputationOptions",
}));

export type PutConfigurationSetSendingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable email sending for messages that use a particular configuration set
 * in a specific Amazon Web Services Region.
 */
export const putConfigurationSetSendingOptions: API.OperationMethod<
  PutConfigurationSetSendingOptionsRequest,
  PutConfigurationSetSendingOptionsResponse,
  PutConfigurationSetSendingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetSendingOptionsRequest,
  output: PutConfigurationSetSendingOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSendingOptions",
}));

export type PutConfigurationSetSuppressionOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify the suppression list preferences for a configuration set. You can
 * also use this operation to specify a `SuppressionScope` to override the
 * suppression scope of the tenant or account for emails sent using this configuration
 * set.
 */
export const putConfigurationSetSuppressionOptions: API.OperationMethod<
  PutConfigurationSetSuppressionOptionsRequest,
  PutConfigurationSetSuppressionOptionsResponse,
  PutConfigurationSetSuppressionOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetSuppressionOptionsRequest,
  output: PutConfigurationSetSuppressionOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSuppressionOptions",
}));

export type PutConfigurationSetTrackingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify a custom domain to use for open and click tracking elements in email that you
 * send.
 */
export const putConfigurationSetTrackingOptions: API.OperationMethod<
  PutConfigurationSetTrackingOptionsRequest,
  PutConfigurationSetTrackingOptionsResponse,
  PutConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetTrackingOptionsRequest,
  output: PutConfigurationSetTrackingOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetTrackingOptions",
}));

export type PutConfigurationSetVdmOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify VDM preferences for email that you send using the configuration set.
 *
 * You can execute this operation no more than once per second.
 */
export const putConfigurationSetVdmOptions: API.OperationMethod<
  PutConfigurationSetVdmOptionsRequest,
  PutConfigurationSetVdmOptionsResponse,
  PutConfigurationSetVdmOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetVdmOptionsRequest,
  output: PutConfigurationSetVdmOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetVdmOptions",
}));

export type PutDedicatedIpInPoolError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Move a dedicated IP address to an existing dedicated IP pool.
 *
 * The dedicated IP address that you specify must already exist, and must be
 * associated with your Amazon Web Services account.
 *
 * The dedicated IP pool you specify must already exist. You can create a new pool by
 * using the `CreateDedicatedIpPool` operation.
 */
export const putDedicatedIpInPool: API.OperationMethod<
  PutDedicatedIpInPoolRequest,
  PutDedicatedIpInPoolResponse,
  PutDedicatedIpInPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDedicatedIpInPoolRequest,
  output: PutDedicatedIpInPoolResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpInPool",
}));

export type PutDedicatedIpPoolScalingAttributesError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to convert a dedicated IP pool to a different scaling mode.
 *
 * `MANAGED` pools cannot be converted to `STANDARD` scaling mode.
 */
export const putDedicatedIpPoolScalingAttributes: API.OperationMethod<
  PutDedicatedIpPoolScalingAttributesRequest,
  PutDedicatedIpPoolScalingAttributesResponse,
  PutDedicatedIpPoolScalingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDedicatedIpPoolScalingAttributesRequest,
  output: PutDedicatedIpPoolScalingAttributesResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpPoolScalingAttributes",
}));

export type PutDedicatedIpWarmupAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 *
 */
export const putDedicatedIpWarmupAttributes: API.OperationMethod<
  PutDedicatedIpWarmupAttributesRequest,
  PutDedicatedIpWarmupAttributesResponse,
  PutDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDedicatedIpWarmupAttributesRequest,
  output: PutDedicatedIpWarmupAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpWarmupAttributes",
}));

export type PutDeliverabilityDashboardOptionError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the Deliverability dashboard. When you enable the Deliverability dashboard, you gain
 * access to reputation, deliverability, and other metrics for the domains that you use to
 * send email. You also gain the ability to perform predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon SES and other Amazon Web Services services. For more
 * information about the features and cost of a Deliverability dashboard subscription, see Amazon SES Pricing.
 */
export const putDeliverabilityDashboardOption: API.OperationMethod<
  PutDeliverabilityDashboardOptionRequest,
  PutDeliverabilityDashboardOptionResponse,
  PutDeliverabilityDashboardOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDeliverabilityDashboardOptionRequest,
  output: PutDeliverabilityDashboardOptionResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliverabilityDashboardOption",
}));

export type PutEmailIdentityConfigurationSetAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to associate a configuration set with an email identity.
 */
export const putEmailIdentityConfigurationSetAttributes: API.OperationMethod<
  PutEmailIdentityConfigurationSetAttributesRequest,
  PutEmailIdentityConfigurationSetAttributesResponse,
  PutEmailIdentityConfigurationSetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityConfigurationSetAttributesRequest,
  output: PutEmailIdentityConfigurationSetAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityConfigurationSetAttributes",
}));

export type PutEmailIdentityDkimAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable DKIM authentication for an email identity.
 */
export const putEmailIdentityDkimAttributes: API.OperationMethod<
  PutEmailIdentityDkimAttributesRequest,
  PutEmailIdentityDkimAttributesResponse,
  PutEmailIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityDkimAttributesRequest,
  output: PutEmailIdentityDkimAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimAttributes",
}));

export type PutEmailIdentityDkimSigningAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to configure or change the DKIM authentication settings for an email domain
 * identity. You can use this operation to do any of the following:
 *
 * - Update the signing attributes for an identity that uses Bring Your Own DKIM
 * (BYODKIM).
 *
 * - Update the key length that should be used for Easy DKIM.
 *
 * - Change from using no DKIM authentication to using Easy DKIM.
 *
 * - Change from using no DKIM authentication to using BYODKIM.
 *
 * - Change from using Easy DKIM to using BYODKIM.
 *
 * - Change from using BYODKIM to using Easy DKIM.
 */
export const putEmailIdentityDkimSigningAttributes: API.OperationMethod<
  PutEmailIdentityDkimSigningAttributesRequest,
  PutEmailIdentityDkimSigningAttributesResponse,
  PutEmailIdentityDkimSigningAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityDkimSigningAttributesRequest,
  output: PutEmailIdentityDkimSigningAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimSigningAttributes",
}));

export type PutEmailIdentityFeedbackAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable feedback forwarding for an identity. This setting determines
 * what happens when an identity is used to send an email that results in a bounce or
 * complaint event.
 *
 * If the value is `true`, you receive email notifications when bounce or
 * complaint events occur. These notifications are sent to the address that you specified
 * in the `Return-Path` header of the original email.
 *
 * You're required to have a method of tracking bounces and complaints. If you haven't
 * set up another mechanism for receiving bounce or complaint notifications (for example,
 * by setting up an event destination), you receive an email notification when these events
 * occur (even if this setting is disabled).
 */
export const putEmailIdentityFeedbackAttributes: API.OperationMethod<
  PutEmailIdentityFeedbackAttributesRequest,
  PutEmailIdentityFeedbackAttributesResponse,
  PutEmailIdentityFeedbackAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityFeedbackAttributesRequest,
  output: PutEmailIdentityFeedbackAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityFeedbackAttributes",
}));

export type PutEmailIdentityMailFromAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable the custom Mail-From domain configuration for an email
 * identity.
 */
export const putEmailIdentityMailFromAttributes: API.OperationMethod<
  PutEmailIdentityMailFromAttributesRequest,
  PutEmailIdentityMailFromAttributesResponse,
  PutEmailIdentityMailFromAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityMailFromAttributesRequest,
  output: PutEmailIdentityMailFromAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityMailFromAttributes",
}));

export type PutSuppressedDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds an email address to the suppression list for your account or for a specific
 * tenant. To target a tenant's suppression list, specify the `TenantName`
 * parameter. If you omit `TenantName`, the address is added to the
 * account-level suppression list.
 */
export const putSuppressedDestination: API.OperationMethod<
  PutSuppressedDestinationRequest,
  PutSuppressedDestinationResponse,
  PutSuppressedDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSuppressedDestinationRequest,
  output: PutSuppressedDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSuppressedDestination",
}));

export type PutTenantSuppressionAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Configure the suppression list preferences for a tenant. Use this operation to enable
 * or disable tenant-level suppression, or to change the suppressed reasons for a tenant.
 *
 * When you set the suppression scope to `TENANT`, Amazon SES maintains a separate
 * suppression list for the tenant. When you set the scope to `ACCOUNT`, the tenant
 * uses the account-level suppression list.
 */
export const putTenantSuppressionAttributes: API.OperationMethod<
  PutTenantSuppressionAttributesRequest,
  PutTenantSuppressionAttributesResponse,
  PutTenantSuppressionAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTenantSuppressionAttributesRequest,
  output: PutTenantSuppressionAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTenantSuppressionAttributes",
}));

export type SendBulkEmailError =
  | AccountSuspendedException
  | BadRequestException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Composes an email message to multiple destinations.
 */
export const sendBulkEmail: API.OperationMethod<
  SendBulkEmailRequest,
  SendBulkEmailResponse,
  SendBulkEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendBulkEmailRequest,
  output: SendBulkEmailResponse,
  errors: [
    AccountSuspendedException,
    BadRequestException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBulkEmail",
}));

export type SendCustomVerificationEmailError =
  | BadRequestException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this
 * operation, a customized verification email is sent to the specified address.
 *
 * To use this operation, you must first create a custom verification email template. For
 * more information about creating and using custom verification email templates, see
 * Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendCustomVerificationEmail: API.OperationMethod<
  SendCustomVerificationEmailRequest,
  SendCustomVerificationEmailResponse,
  SendCustomVerificationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendCustomVerificationEmailRequest,
  output: SendCustomVerificationEmailResponse,
  errors: [
    BadRequestException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendCustomVerificationEmail",
}));

export type SendEmailError =
  | AccountSuspendedException
  | BadRequestException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends an email message. You can use the Amazon SES API v2 to send the following types of
 * messages:
 *
 * - **Simple** – A standard email message. When
 * you create this type of message, you specify the sender, the recipient, and the
 * message body, and Amazon SES assembles the message for you.
 *
 * - **Raw** – A raw, MIME-formatted email
 * message. When you send this type of email, you have to specify all of the
 * message headers, as well as the message body. You can use this message type to
 * send messages that contain attachments. The message that you specify has to be a
 * valid MIME message.
 *
 * - **Templated** – A message that contains
 * personalization tags. When you send this type of email, Amazon SES API v2 automatically
 * replaces the tags with values that you specify.
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendEmailRequest,
  output: SendEmailResponse,
  errors: [
    AccountSuspendedException,
    BadRequestException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmail",
}));

export type TagResourceError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Add one or more tags (keys and values) to a specified resource. A
 * *tag* is a label that you optionally define and associate with a
 * resource. Tags can help you categorize and manage resources in different ways, such as
 * by purpose, owner, environment, or other criteria. A resource can have as many as 50
 * tags.
 *
 * Each tag consists of a required *tag key* and an
 * associated *tag value*, both of which you define. A tag key is a
 * general label that acts as a category for more specific tag values. A tag value acts as
 * a descriptor within a tag key.
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
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestRenderEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a preview of the MIME content of an email when provided with a template and a
 * set of replacement data.
 *
 * You can execute this operation no more than once per second.
 */
export const testRenderEmailTemplate: API.OperationMethod<
  TestRenderEmailTemplateRequest,
  TestRenderEmailTemplateResponse,
  TestRenderEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestRenderEmailTemplateRequest,
  output: TestRenderEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRenderEmailTemplate",
}));

export type UntagResourceError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Remove one or more tags (keys and values) from a specified resource.
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
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the configuration of an event destination for a configuration set.
 *
 * *Events* include message sends, deliveries, opens, clicks, bounces,
 * and complaints. *Event destinations* are places that you can send
 * information about these events to. For example, you can send event data to Amazon EventBridge and
 * associate a rule to send the event to the specified target.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetEventDestinationRequest,
  output: UpdateConfigurationSetEventDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));

export type UpdateContactError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a contact's preferences for a list.
 *
 * You must specify all existing topic preferences in the
 * `TopicPreferences` object, not just the ones that need updating;
 * otherwise, all your existing preferences will be removed.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest,
  UpdateContactResponse,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContactRequest,
  output: UpdateContactResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
}));

export type UpdateContactListError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates contact list metadata. This operation does a complete replacement.
 */
export const updateContactList: API.OperationMethod<
  UpdateContactListRequest,
  UpdateContactListResponse,
  UpdateContactListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContactListRequest,
  output: UpdateContactListResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactList",
}));

export type UpdateCustomVerificationEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * custom verification email templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateCustomVerificationEmailTemplate: API.OperationMethod<
  UpdateCustomVerificationEmailTemplateRequest,
  UpdateCustomVerificationEmailTemplateResponse,
  UpdateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomVerificationEmailTemplateRequest,
  output: UpdateCustomVerificationEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomVerificationEmailTemplate",
}));

export type UpdateEmailIdentityPolicyError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified sending authorization policy for the given identity (an email
 * address or a domain). This API returns successfully even if a policy with the specified
 * name does not exist.
 *
 * This API is for the identity owner only. If you have not verified the identity,
 * this API will return an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateEmailIdentityPolicy: API.OperationMethod<
  UpdateEmailIdentityPolicyRequest,
  UpdateEmailIdentityPolicyResponse,
  UpdateEmailIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEmailIdentityPolicyRequest,
  output: UpdateEmailIdentityPolicyResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailIdentityPolicy",
}));

export type UpdateEmailTemplateError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single API operation. For more information, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateEmailTemplate: API.OperationMethod<
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  UpdateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEmailTemplateRequest,
  output: UpdateEmailTemplateResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailTemplate",
}));

export type UpdateReputationEntityCustomerManagedStatusError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the customer-managed sending status for a reputation entity. This allows
 * you to enable, disable, or reinstate sending for the entity.
 *
 * The customer-managed status works in conjunction with the Amazon Web Services Amazon SES-managed status
 * to determine the overall sending capability. When you update the customer-managed status,
 * the Amazon Web Services Amazon SES-managed status remains unchanged. If Amazon Web Services Amazon SES has disabled the entity,
 * it will not be allowed to send regardless of the customer-managed status setting. When you
 * reinstate an entity through the customer-managed status, it can continue sending only if
 * the Amazon Web Services Amazon SES-managed status also permits sending, even if there are active reputation
 * findings, until the findings are resolved or new violations occur.
 */
export const updateReputationEntityCustomerManagedStatus: API.OperationMethod<
  UpdateReputationEntityCustomerManagedStatusRequest,
  UpdateReputationEntityCustomerManagedStatusResponse,
  UpdateReputationEntityCustomerManagedStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReputationEntityCustomerManagedStatusRequest,
  output: UpdateReputationEntityCustomerManagedStatusResponse,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReputationEntityCustomerManagedStatus",
}));

export type UpdateReputationEntityPolicyError =
  | BadRequestException
  | ConflictException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the reputation management policy for a reputation entity. The policy
 * determines how the entity responds to reputation findings, such as automatically
 * pausing sending when certain thresholds are exceeded.
 *
 * Reputation management policies are Amazon Web Services Amazon SES-managed (predefined policies).
 * You can select from none, standard, and strict policies.
 */
export const updateReputationEntityPolicy: API.OperationMethod<
  UpdateReputationEntityPolicyRequest,
  UpdateReputationEntityPolicyResponse,
  UpdateReputationEntityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReputationEntityPolicyRequest,
  output: UpdateReputationEntityPolicyResponse,
  errors: [BadRequestException, ConflictException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReputationEntityPolicy",
}));
