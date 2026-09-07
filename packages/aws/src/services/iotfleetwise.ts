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
  sdkId: "IoTFleetWise",
  serviceShapeName: "IoTAutobahnControlPlane",
});
const auth = T.AwsAuthSigv4({ name: "iotfleetwise" });
const ver = T.ServiceVersion("2021-06-17");
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
              `https://iotfleetwise-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://iotfleetwise-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iotfleetwise.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://iotfleetwise.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resource: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DecoderManifestValidationException
  extends /*@__PURE__*/ S.TaggedError<DecoderManifestValidationException>()(
    "DecoderManifestValidationException",
    {
      invalidSignals: S.optional(
        S.suspend(() => InvalidSignalDecoders).annotate({
          identifier: "InvalidSignalDecoders",
        }),
      ),
      invalidNetworkInterfaces: S.optional(
        S.suspend(() => InvalidNetworkInterfaces).annotate({
          identifier: "InvalidNetworkInterfaces",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidNodeException
  extends /*@__PURE__*/ S.TaggedError<InvalidNodeException>()(
    "InvalidNodeException",
    {
      invalidNodes: S.optional(
        S.suspend(() => Nodes).annotate({ identifier: "Nodes" }),
      ),
      reason: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSignalsException
  extends /*@__PURE__*/ S.TaggedError<InvalidSignalsException>()(
    "InvalidSignalsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      invalidSignals: S.optional(
        S.suspend(() => InvalidSignals).annotate({
          identifier: "InvalidSignals",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      quotaCode: S.optional(S.String),
      serviceCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
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
export type VehicleName = string;
export type FleetId = string;
export interface AssociateVehicleFleetRequest {
  vehicleName: string;
  fleetId: string;
}
export const AssociateVehicleFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
    fleetId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/vehicles/{vehicleName}/associate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateVehicleFleetRequest",
}) as any as S.Schema<AssociateVehicleFleetRequest>;
export interface AssociateVehicleFleetResponse {}
export const AssociateVehicleFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateVehicleFleetResponse",
}) as any as S.Schema<AssociateVehicleFleetResponse>;
export type Arn = string;
export type AttributeName = string;
export type AttributeValue = string;
export type AttributesMap = { [key: string]: string | undefined };
export const AttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type VehicleAssociationBehavior =
  | "CreateIotThing"
  | "ValidateIotThingExists"
  | (string & {});
export const VehicleAssociationBehavior = S.String;

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
export type ResourceIdentifier = string;
export type TimeUnit =
  | "MILLISECOND"
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | (string & {});
export const TimeUnit = S.String;

export type PositiveInteger = number;
export interface TimePeriod {
  unit: TimeUnit;
  value: number;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unit: TimeUnit, value: S.Number }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export interface PeriodicStateTemplateUpdateStrategy {
  stateTemplateUpdateRate: TimePeriod;
}
export const PeriodicStateTemplateUpdateStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateTemplateUpdateRate: TimePeriod }),
).annotate({
  identifier: "PeriodicStateTemplateUpdateStrategy",
}) as any as S.Schema<PeriodicStateTemplateUpdateStrategy>;
export interface OnChangeStateTemplateUpdateStrategy {}
export const OnChangeStateTemplateUpdateStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "OnChangeStateTemplateUpdateStrategy",
}) as any as S.Schema<OnChangeStateTemplateUpdateStrategy>;
export type StateTemplateUpdateStrategy =
  | { periodic: PeriodicStateTemplateUpdateStrategy; onChange?: never }
  | { periodic?: never; onChange: OnChangeStateTemplateUpdateStrategy };
export const StateTemplateUpdateStrategy = /*@__PURE__*/ S.Union([
  S.Struct({ periodic: PeriodicStateTemplateUpdateStrategy }),
  S.Struct({ onChange: OnChangeStateTemplateUpdateStrategy }),
]);
export interface StateTemplateAssociation {
  identifier: string;
  stateTemplateUpdateStrategy: StateTemplateUpdateStrategy;
}
export const StateTemplateAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    stateTemplateUpdateStrategy: StateTemplateUpdateStrategy,
  }),
).annotate({
  identifier: "StateTemplateAssociation",
}) as any as S.Schema<StateTemplateAssociation>;
export type StateTemplateAssociations = StateTemplateAssociation[];
export const StateTemplateAssociations = /*@__PURE__*/ S.Array(
  StateTemplateAssociation,
);
export interface CreateVehicleRequestItem {
  vehicleName: string;
  modelManifestArn: string;
  decoderManifestArn: string;
  attributes?: { [key: string]: string | undefined };
  associationBehavior?: VehicleAssociationBehavior;
  tags?: Tag[];
  stateTemplates?: StateTemplateAssociation[];
}
export const CreateVehicleRequestItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String,
    modelManifestArn: S.String,
    decoderManifestArn: S.String,
    attributes: S.optional(AttributesMap),
    associationBehavior: S.optional(VehicleAssociationBehavior),
    tags: S.optional(TagList),
    stateTemplates: S.optional(StateTemplateAssociations),
  }),
).annotate({
  identifier: "CreateVehicleRequestItem",
}) as any as S.Schema<CreateVehicleRequestItem>;
export type CreateVehicleRequestItems = CreateVehicleRequestItem[];
export const CreateVehicleRequestItems = /*@__PURE__*/ S.Array(
  CreateVehicleRequestItem,
);
export interface BatchCreateVehicleRequest {
  vehicles: CreateVehicleRequestItem[];
}
export const BatchCreateVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicles: CreateVehicleRequestItems }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/vehicles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchCreateVehicleRequest",
}) as any as S.Schema<BatchCreateVehicleRequest>;
export interface CreateVehicleResponseItem {
  vehicleName?: string;
  arn?: string;
  thingArn?: string;
}
export const CreateVehicleResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.optional(S.String),
    arn: S.optional(S.String),
    thingArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateVehicleResponseItem",
}) as any as S.Schema<CreateVehicleResponseItem>;
export type CreateVehicleResponses = CreateVehicleResponseItem[];
export const CreateVehicleResponses = /*@__PURE__*/ S.Array(
  CreateVehicleResponseItem,
);
export interface CreateVehicleError_ {
  vehicleName?: string;
  code?: string;
  message?: string;
}
export const CreateVehicleError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.optional(S.String),
    code: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateVehicleError",
}) as any as S.Schema<CreateVehicleError_>;
export type CreateVehicleErrors = CreateVehicleError_[];
export const CreateVehicleErrors = /*@__PURE__*/ S.Array(CreateVehicleError_);
export interface BatchCreateVehicleResponse {
  vehicles?: CreateVehicleResponseItem[];
  errors?: CreateVehicleError_[];
}
export const BatchCreateVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicles: S.optional(CreateVehicleResponses),
    errors: S.optional(CreateVehicleErrors),
  }),
).annotate({
  identifier: "BatchCreateVehicleResponse",
}) as any as S.Schema<BatchCreateVehicleResponse>;
export type UpdateMode = "Overwrite" | "Merge" | (string & {});
export const UpdateMode = S.String;

export type StateTemplateAssociationIdentifiers = string[];
export const StateTemplateAssociationIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export interface UpdateVehicleRequestItem {
  vehicleName: string;
  modelManifestArn?: string;
  decoderManifestArn?: string;
  attributes?: { [key: string]: string | undefined };
  attributeUpdateMode?: UpdateMode;
  stateTemplatesToAdd?: StateTemplateAssociation[];
  stateTemplatesToRemove?: string[];
  stateTemplatesToUpdate?: StateTemplateAssociation[];
}
export const UpdateVehicleRequestItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String,
    modelManifestArn: S.optional(S.String),
    decoderManifestArn: S.optional(S.String),
    attributes: S.optional(AttributesMap),
    attributeUpdateMode: S.optional(UpdateMode),
    stateTemplatesToAdd: S.optional(StateTemplateAssociations),
    stateTemplatesToRemove: S.optional(StateTemplateAssociationIdentifiers),
    stateTemplatesToUpdate: S.optional(StateTemplateAssociations),
  }),
).annotate({
  identifier: "UpdateVehicleRequestItem",
}) as any as S.Schema<UpdateVehicleRequestItem>;
export type UpdateVehicleRequestItems = UpdateVehicleRequestItem[];
export const UpdateVehicleRequestItems = /*@__PURE__*/ S.Array(
  UpdateVehicleRequestItem,
);
export interface BatchUpdateVehicleRequest {
  vehicles: UpdateVehicleRequestItem[];
}
export const BatchUpdateVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicles: UpdateVehicleRequestItems }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/vehicles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateVehicleRequest",
}) as any as S.Schema<BatchUpdateVehicleRequest>;
export interface UpdateVehicleResponseItem {
  vehicleName?: string;
  arn?: string;
}
export const UpdateVehicleResponseItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicleName: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateVehicleResponseItem",
}) as any as S.Schema<UpdateVehicleResponseItem>;
export type UpdateVehicleResponseItems = UpdateVehicleResponseItem[];
export const UpdateVehicleResponseItems = /*@__PURE__*/ S.Array(
  UpdateVehicleResponseItem,
);
export interface UpdateVehicleError_ {
  vehicleName?: string;
  code?: number;
  message?: string;
}
export const UpdateVehicleError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.optional(S.String),
    code: S.optional(S.Number),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateVehicleError",
}) as any as S.Schema<UpdateVehicleError_>;
export type UpdateVehicleErrors = UpdateVehicleError_[];
export const UpdateVehicleErrors = /*@__PURE__*/ S.Array(UpdateVehicleError_);
export interface BatchUpdateVehicleResponse {
  vehicles?: UpdateVehicleResponseItem[];
  errors?: UpdateVehicleError_[];
}
export const BatchUpdateVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicles: S.optional(UpdateVehicleResponseItems),
    errors: S.optional(UpdateVehicleErrors),
  }),
).annotate({
  identifier: "BatchUpdateVehicleResponse",
}) as any as S.Schema<BatchUpdateVehicleResponse>;
export type CampaignName = string;
export type Description = string;
export type Uint32 = number;
export type DiagnosticsMode = "OFF" | "SEND_ACTIVE_DTCS" | (string & {});
export const DiagnosticsMode = S.String;

export type SpoolingMode = "OFF" | "TO_DISK" | (string & {});
export const SpoolingMode = S.String;

export type Compression = "OFF" | "SNAPPY" | (string & {});
export const Compression = S.String;

export type Priority = number;
export type WildcardSignalName = string;
export type MaxSampleCount = number;
export type DataPartitionId = string;
export interface SignalInformation {
  name: string;
  maxSampleCount?: number;
  minimumSamplingIntervalMs?: number;
  dataPartitionId?: string;
}
export const SignalInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    maxSampleCount: S.optional(S.Number),
    minimumSamplingIntervalMs: S.optional(S.Number),
    dataPartitionId: S.optional(S.String),
  }),
).annotate({
  identifier: "SignalInformation",
}) as any as S.Schema<SignalInformation>;
export type SignalInformationList = SignalInformation[];
export const SignalInformationList = /*@__PURE__*/ S.Array(SignalInformation);
export type CollectionPeriodMs = number;
export interface TimeBasedCollectionScheme {
  periodMs: number;
}
export const TimeBasedCollectionScheme = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ periodMs: S.Number }),
).annotate({
  identifier: "TimeBasedCollectionScheme",
}) as any as S.Schema<TimeBasedCollectionScheme>;
export type EventExpression = string | redacted.Redacted<string>;
export type TriggerMode = "ALWAYS" | "RISING_EDGE" | (string & {});
export const TriggerMode = S.String;

export type LanguageVersion = number;
export interface ConditionBasedCollectionScheme {
  expression: string | redacted.Redacted<string>;
  minimumTriggerIntervalMs?: number;
  triggerMode?: TriggerMode;
  conditionLanguageVersion?: number;
}
export const ConditionBasedCollectionScheme = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expression: SensitiveString,
    minimumTriggerIntervalMs: S.optional(S.Number),
    triggerMode: S.optional(TriggerMode),
    conditionLanguageVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConditionBasedCollectionScheme",
}) as any as S.Schema<ConditionBasedCollectionScheme>;
export type CollectionScheme =
  | {
      timeBasedCollectionScheme: TimeBasedCollectionScheme;
      conditionBasedCollectionScheme?: never;
    }
  | {
      timeBasedCollectionScheme?: never;
      conditionBasedCollectionScheme: ConditionBasedCollectionScheme;
    };
export const CollectionScheme = /*@__PURE__*/ S.Union([
  S.Struct({ timeBasedCollectionScheme: TimeBasedCollectionScheme }),
  S.Struct({ conditionBasedCollectionScheme: ConditionBasedCollectionScheme }),
]);
export type NodePath = string;
export type DataExtraDimensionNodePathList = string[];
export const DataExtraDimensionNodePathList = /*@__PURE__*/ S.Array(S.String);
export type S3BucketArn = string;
export type DataFormat = "JSON" | "PARQUET" | (string & {});
export const DataFormat = S.String;

export type StorageCompressionFormat = "NONE" | "GZIP" | (string & {});
export const StorageCompressionFormat = S.String;

export type Prefix = string;
export interface S3Config {
  bucketArn: string;
  dataFormat?: DataFormat;
  storageCompressionFormat?: StorageCompressionFormat;
  prefix?: string;
}
export const S3Config = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucketArn: S.String,
    dataFormat: S.optional(DataFormat),
    storageCompressionFormat: S.optional(StorageCompressionFormat),
    prefix: S.optional(S.String),
  }),
).annotate({ identifier: "S3Config" }) as any as S.Schema<S3Config>;
export type TimestreamTableArn = string;
export type IAMRoleArn = string;
export interface TimestreamConfig {
  timestreamTableArn: string;
  executionRoleArn: string;
}
export const TimestreamConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timestreamTableArn: S.String, executionRoleArn: S.String }),
).annotate({
  identifier: "TimestreamConfig",
}) as any as S.Schema<TimestreamConfig>;
export type MqttTopicArn = string;
export interface MqttTopicConfig {
  mqttTopicArn: string;
  executionRoleArn: string;
}
export const MqttTopicConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mqttTopicArn: S.String, executionRoleArn: S.String }),
).annotate({
  identifier: "MqttTopicConfig",
}) as any as S.Schema<MqttTopicConfig>;
export type DataDestinationConfig =
  | { s3Config: S3Config; timestreamConfig?: never; mqttTopicConfig?: never }
  | {
      s3Config?: never;
      timestreamConfig: TimestreamConfig;
      mqttTopicConfig?: never;
    }
  | {
      s3Config?: never;
      timestreamConfig?: never;
      mqttTopicConfig: MqttTopicConfig;
    };
export const DataDestinationConfig = /*@__PURE__*/ S.Union([
  S.Struct({ s3Config: S3Config }),
  S.Struct({ timestreamConfig: TimestreamConfig }),
  S.Struct({ mqttTopicConfig: MqttTopicConfig }),
]);
export type DataDestinationConfigs = DataDestinationConfig[];
export const DataDestinationConfigs = /*@__PURE__*/ S.Array(
  DataDestinationConfig,
);
export type StorageMaximumSizeUnit = "MB" | "GB" | "TB" | (string & {});
export const StorageMaximumSizeUnit = S.String;

export type StorageMaximumSizeValue = number;
export interface StorageMaximumSize {
  unit: StorageMaximumSizeUnit;
  value: number;
}
export const StorageMaximumSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unit: StorageMaximumSizeUnit, value: S.Number }),
).annotate({
  identifier: "StorageMaximumSize",
}) as any as S.Schema<StorageMaximumSize>;
export type StorageLocation = string | redacted.Redacted<string>;
export type StorageMinimumTimeToLiveUnit =
  | "HOURS"
  | "DAYS"
  | "WEEKS"
  | (string & {});
export const StorageMinimumTimeToLiveUnit = S.String;

export type StorageMinimumTimeToLiveValue = number;
export interface StorageMinimumTimeToLive {
  unit: StorageMinimumTimeToLiveUnit;
  value: number;
}
export const StorageMinimumTimeToLive = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unit: StorageMinimumTimeToLiveUnit, value: S.Number }),
).annotate({
  identifier: "StorageMinimumTimeToLive",
}) as any as S.Schema<StorageMinimumTimeToLive>;
export interface DataPartitionStorageOptions {
  maximumSize: StorageMaximumSize;
  storageLocation: string | redacted.Redacted<string>;
  minimumTimeToLive: StorageMinimumTimeToLive;
}
export const DataPartitionStorageOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maximumSize: StorageMaximumSize,
    storageLocation: SensitiveString,
    minimumTimeToLive: StorageMinimumTimeToLive,
  }),
).annotate({
  identifier: "DataPartitionStorageOptions",
}) as any as S.Schema<DataPartitionStorageOptions>;
export interface DataPartitionUploadOptions {
  expression: string | redacted.Redacted<string>;
  conditionLanguageVersion?: number;
}
export const DataPartitionUploadOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expression: SensitiveString,
    conditionLanguageVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataPartitionUploadOptions",
}) as any as S.Schema<DataPartitionUploadOptions>;
export interface DataPartition {
  id: string;
  storageOptions: DataPartitionStorageOptions;
  uploadOptions?: DataPartitionUploadOptions;
}
export const DataPartition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    storageOptions: DataPartitionStorageOptions,
    uploadOptions: S.optional(DataPartitionUploadOptions),
  }),
).annotate({ identifier: "DataPartition" }) as any as S.Schema<DataPartition>;
export type DataPartitions = DataPartition[];
export const DataPartitions = /*@__PURE__*/ S.Array(DataPartition);
export type PositiveLong = number;
export interface TimeBasedSignalFetchConfig {
  executionFrequencyMs: number;
}
export const TimeBasedSignalFetchConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionFrequencyMs: S.Number }),
).annotate({
  identifier: "TimeBasedSignalFetchConfig",
}) as any as S.Schema<TimeBasedSignalFetchConfig>;
export type FetchConfigEventExpression = string | redacted.Redacted<string>;
export interface ConditionBasedSignalFetchConfig {
  conditionExpression: string | redacted.Redacted<string>;
  triggerMode: TriggerMode;
}
export const ConditionBasedSignalFetchConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ conditionExpression: SensitiveString, triggerMode: TriggerMode }),
).annotate({
  identifier: "ConditionBasedSignalFetchConfig",
}) as any as S.Schema<ConditionBasedSignalFetchConfig>;
export type SignalFetchConfig =
  | { timeBased: TimeBasedSignalFetchConfig; conditionBased?: never }
  | { timeBased?: never; conditionBased: ConditionBasedSignalFetchConfig };
export const SignalFetchConfig = /*@__PURE__*/ S.Union([
  S.Struct({ timeBased: TimeBasedSignalFetchConfig }),
  S.Struct({ conditionBased: ConditionBasedSignalFetchConfig }),
]);
export type ActionEventExpression = string | redacted.Redacted<string>;
export type EventExpressionList = (string | redacted.Redacted<string>)[];
export const EventExpressionList = /*@__PURE__*/ S.Array(SensitiveString);
export interface SignalFetchInformation {
  fullyQualifiedName: string;
  signalFetchConfig: SignalFetchConfig;
  conditionLanguageVersion?: number;
  actions: (string | redacted.Redacted<string>)[];
}
export const SignalFetchInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    signalFetchConfig: SignalFetchConfig,
    conditionLanguageVersion: S.optional(S.Number),
    actions: EventExpressionList,
  }),
).annotate({
  identifier: "SignalFetchInformation",
}) as any as S.Schema<SignalFetchInformation>;
export type SignalFetchInformationList = SignalFetchInformation[];
export const SignalFetchInformationList = /*@__PURE__*/ S.Array(
  SignalFetchInformation,
);
export interface CreateCampaignRequest {
  name: string;
  description?: string;
  signalCatalogArn: string;
  targetArn: string;
  startTime?: Date;
  expiryTime?: Date;
  postTriggerCollectionDuration?: number;
  diagnosticsMode?: DiagnosticsMode;
  spoolingMode?: SpoolingMode;
  compression?: Compression;
  priority?: number;
  signalsToCollect?: SignalInformation[];
  collectionScheme: CollectionScheme;
  dataExtraDimensions?: string[];
  tags?: Tag[];
  dataDestinationConfigs?: DataDestinationConfig[];
  dataPartitions?: DataPartition[];
  signalsToFetch?: SignalFetchInformation[];
}
export const CreateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    signalCatalogArn: S.String,
    targetArn: S.String,
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    expiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    postTriggerCollectionDuration: S.optional(S.Number),
    diagnosticsMode: S.optional(DiagnosticsMode),
    spoolingMode: S.optional(SpoolingMode),
    compression: S.optional(Compression),
    priority: S.optional(S.Number),
    signalsToCollect: S.optional(SignalInformationList),
    collectionScheme: CollectionScheme,
    dataExtraDimensions: S.optional(DataExtraDimensionNodePathList),
    tags: S.optional(TagList),
    dataDestinationConfigs: S.optional(DataDestinationConfigs),
    dataPartitions: S.optional(DataPartitions),
    signalsToFetch: S.optional(SignalFetchInformationList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCampaignRequest",
}) as any as S.Schema<CreateCampaignRequest>;
export type CampaignArn = string;
export interface CreateCampaignResponse {
  name?: string;
  arn?: string;
}
export const CreateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateCampaignResponse",
}) as any as S.Schema<CreateCampaignResponse>;
export type ResourceName = string;
export type FullyQualifiedName = string;
export type SignalDecoderType =
  | "CAN_SIGNAL"
  | "OBD_SIGNAL"
  | "MESSAGE_SIGNAL"
  | "CUSTOM_DECODING_SIGNAL"
  | (string & {});
export const SignalDecoderType = S.String;

export type InterfaceId = string;
export type NonNegativeInteger = number;
export type CanSignalName = string;
export type SignalValueType = "INTEGER" | "FLOATING_POINT" | (string & {});
export const SignalValueType = S.String;

export interface CanSignal {
  messageId: number;
  isBigEndian: boolean;
  isSigned: boolean;
  startBit: number;
  offset: number;
  factor: number;
  length: number;
  name?: string;
  signalValueType?: SignalValueType;
}
export const CanSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageId: S.Number,
    isBigEndian: S.Boolean,
    isSigned: S.Boolean,
    startBit: S.Number,
    offset: S.Number,
    factor: S.Number,
    length: S.Number,
    name: S.optional(S.String),
    signalValueType: S.optional(SignalValueType),
  }),
).annotate({ identifier: "CanSignal" }) as any as S.Schema<CanSignal>;
export type ObdByteLength = number;
export type ObdBitmaskLength = number;
export interface ObdSignal {
  pidResponseLength: number;
  serviceMode: number;
  pid: number;
  scaling: number;
  offset: number;
  startByte: number;
  byteLength: number;
  bitRightShift?: number;
  bitMaskLength?: number;
  isSigned?: boolean;
  signalValueType?: SignalValueType;
}
export const ObdSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pidResponseLength: S.Number,
    serviceMode: S.Number,
    pid: S.Number,
    scaling: S.Number,
    offset: S.Number,
    startByte: S.Number,
    byteLength: S.Number,
    bitRightShift: S.optional(S.Number),
    bitMaskLength: S.optional(S.Number),
    isSigned: S.optional(S.Boolean),
    signalValueType: S.optional(SignalValueType),
  }),
).annotate({ identifier: "ObdSignal" }) as any as S.Schema<ObdSignal>;
export type TopicName = string;
export type ROS2PrimitiveType =
  | "BOOL"
  | "BYTE"
  | "CHAR"
  | "FLOAT32"
  | "FLOAT64"
  | "INT8"
  | "UINT8"
  | "INT16"
  | "UINT16"
  | "INT32"
  | "UINT32"
  | "INT64"
  | "UINT64"
  | "STRING"
  | "WSTRING"
  | (string & {});
export const ROS2PrimitiveType = S.String;

export type MaxStringSize = number;
export interface ROS2PrimitiveMessageDefinition {
  primitiveType: ROS2PrimitiveType;
  offset?: number;
  scaling?: number;
  upperBound?: number;
}
export const ROS2PrimitiveMessageDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    primitiveType: ROS2PrimitiveType,
    offset: S.optional(S.Number),
    scaling: S.optional(S.Number),
    upperBound: S.optional(S.Number),
  }),
).annotate({
  identifier: "ROS2PrimitiveMessageDefinition",
}) as any as S.Schema<ROS2PrimitiveMessageDefinition>;
export type PrimitiveMessageDefinition = {
  ros2PrimitiveMessageDefinition: ROS2PrimitiveMessageDefinition;
};
export const PrimitiveMessageDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ ros2PrimitiveMessageDefinition: ROS2PrimitiveMessageDefinition }),
]);
export type StructureMessageName = string;
export type StructuredMessageListType =
  | "FIXED_CAPACITY"
  | "DYNAMIC_UNBOUNDED_CAPACITY"
  | "DYNAMIC_BOUNDED_CAPACITY"
  | (string & {});
export const StructuredMessageListType = S.String;

export interface StructuredMessageListDefinition {
  name: string;
  memberType: StructuredMessage;
  listType: StructuredMessageListType;
  capacity?: number;
}
export const StructuredMessageListDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    memberType: S.suspend(() => StructuredMessage).annotate({
      identifier: "StructuredMessage",
    }),
    listType: StructuredMessageListType,
    capacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "StructuredMessageListDefinition",
}) as any as S.Schema<StructuredMessageListDefinition>;
export interface StructuredMessageFieldNameAndDataTypePair {
  fieldName: string;
  dataType: StructuredMessage;
}
export const StructuredMessageFieldNameAndDataTypePair =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      fieldName: S.String,
      dataType: S.suspend(() => StructuredMessage).annotate({
        identifier: "StructuredMessage",
      }),
    }),
  ).annotate({
    identifier: "StructuredMessageFieldNameAndDataTypePair",
  }) as any as S.Schema<StructuredMessageFieldNameAndDataTypePair>;
export type StructuredMessageDefinition =
  StructuredMessageFieldNameAndDataTypePair[];
export const StructuredMessageDefinition = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<StructuredMessageFieldNameAndDataTypePair> =>
      StructuredMessageFieldNameAndDataTypePair,
  ).annotate({ identifier: "StructuredMessageFieldNameAndDataTypePair" }),
) as any as S.Schema<StructuredMessageDefinition>;
export type StructuredMessage =
  | {
      primitiveMessageDefinition: PrimitiveMessageDefinition;
      structuredMessageListDefinition?: never;
      structuredMessageDefinition?: never;
    }
  | {
      primitiveMessageDefinition?: never;
      structuredMessageListDefinition: StructuredMessageListDefinition;
      structuredMessageDefinition?: never;
    }
  | {
      primitiveMessageDefinition?: never;
      structuredMessageListDefinition?: never;
      structuredMessageDefinition: StructuredMessageFieldNameAndDataTypePair[];
    };
export const StructuredMessage = /*@__PURE__*/ S.Union([
  S.Struct({ primitiveMessageDefinition: PrimitiveMessageDefinition }),
  S.Struct({
    structuredMessageListDefinition: S.suspend(
      (): S.Schema<StructuredMessageListDefinition> =>
        StructuredMessageListDefinition,
    ).annotate({ identifier: "StructuredMessageListDefinition" }),
  }),
  S.Struct({
    structuredMessageDefinition: S.suspend(
      () => StructuredMessageDefinition,
    ).annotate({ identifier: "StructuredMessageDefinition" }),
  }),
]) as any as S.Schema<StructuredMessage>;
export interface MessageSignal {
  topicName: string;
  structuredMessage: StructuredMessage;
}
export const MessageSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicName: S.String, structuredMessage: StructuredMessage }),
).annotate({ identifier: "MessageSignal" }) as any as S.Schema<MessageSignal>;
export type CustomDecodingId = string;
export interface CustomDecodingSignal {
  id: string;
}
export const CustomDecodingSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({
  identifier: "CustomDecodingSignal",
}) as any as S.Schema<CustomDecodingSignal>;
export interface SignalDecoder {
  fullyQualifiedName: string;
  type: SignalDecoderType;
  interfaceId: string;
  canSignal?: CanSignal;
  obdSignal?: ObdSignal;
  messageSignal?: MessageSignal;
  customDecodingSignal?: CustomDecodingSignal;
}
export const SignalDecoder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    type: SignalDecoderType,
    interfaceId: S.String,
    canSignal: S.optional(CanSignal),
    obdSignal: S.optional(ObdSignal),
    messageSignal: S.optional(MessageSignal),
    customDecodingSignal: S.optional(CustomDecodingSignal),
  }),
).annotate({ identifier: "SignalDecoder" }) as any as S.Schema<SignalDecoder>;
export type SignalDecoders = SignalDecoder[];
export const SignalDecoders = /*@__PURE__*/ S.Array(SignalDecoder);
export type NetworkInterfaceType =
  | "CAN_INTERFACE"
  | "OBD_INTERFACE"
  | "VEHICLE_MIDDLEWARE"
  | "CUSTOM_DECODING_INTERFACE"
  | (string & {});
export const NetworkInterfaceType = S.String;

export type CanInterfaceName = string;
export type ProtocolName = string;
export type ProtocolVersion = string;
export interface CanInterface {
  name: string;
  protocolName?: string;
  protocolVersion?: string;
}
export const CanInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    protocolName: S.optional(S.String),
    protocolVersion: S.optional(S.String),
  }),
).annotate({ identifier: "CanInterface" }) as any as S.Schema<CanInterface>;
export type ObdInterfaceName = string;
export type ObdStandard = string;
export interface ObdInterface {
  name: string;
  requestMessageId: number;
  obdStandard?: string;
  pidRequestIntervalSeconds?: number;
  dtcRequestIntervalSeconds?: number;
  useExtendedIds?: boolean;
  hasTransmissionEcu?: boolean;
}
export const ObdInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    requestMessageId: S.Number,
    obdStandard: S.optional(S.String),
    pidRequestIntervalSeconds: S.optional(S.Number),
    dtcRequestIntervalSeconds: S.optional(S.Number),
    useExtendedIds: S.optional(S.Boolean),
    hasTransmissionEcu: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ObdInterface" }) as any as S.Schema<ObdInterface>;
export type VehicleMiddlewareName = string;
export type VehicleMiddlewareProtocol = "ROS_2" | (string & {});
export const VehicleMiddlewareProtocol = S.String;

export interface VehicleMiddleware {
  name: string;
  protocolName: VehicleMiddlewareProtocol;
}
export const VehicleMiddleware = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, protocolName: VehicleMiddlewareProtocol }),
).annotate({
  identifier: "VehicleMiddleware",
}) as any as S.Schema<VehicleMiddleware>;
export type CustomDecodingSignalInterfaceName = string;
export interface CustomDecodingInterface {
  name: string;
}
export const CustomDecodingInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({
  identifier: "CustomDecodingInterface",
}) as any as S.Schema<CustomDecodingInterface>;
export interface NetworkInterface {
  interfaceId: string;
  type: NetworkInterfaceType;
  canInterface?: CanInterface;
  obdInterface?: ObdInterface;
  vehicleMiddleware?: VehicleMiddleware;
  customDecodingInterface?: CustomDecodingInterface;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interfaceId: S.String,
    type: NetworkInterfaceType,
    canInterface: S.optional(CanInterface),
    obdInterface: S.optional(ObdInterface),
    vehicleMiddleware: S.optional(VehicleMiddleware),
    customDecodingInterface: S.optional(CustomDecodingInterface),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = /*@__PURE__*/ S.Array(NetworkInterface);
export type DefaultForUnmappedSignalsType = "CUSTOM_DECODING" | (string & {});
export const DefaultForUnmappedSignalsType = S.String;

export interface CreateDecoderManifestRequest {
  name: string;
  description?: string;
  modelManifestArn: string;
  signalDecoders?: SignalDecoder[];
  networkInterfaces?: NetworkInterface[];
  defaultForUnmappedSignals?: DefaultForUnmappedSignalsType;
  tags?: Tag[];
}
export const CreateDecoderManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    modelManifestArn: S.String,
    signalDecoders: S.optional(SignalDecoders),
    networkInterfaces: S.optional(NetworkInterfaces),
    defaultForUnmappedSignals: S.optional(DefaultForUnmappedSignalsType),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/decoder-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDecoderManifestRequest",
}) as any as S.Schema<CreateDecoderManifestRequest>;
export interface CreateDecoderManifestResponse {
  name: string;
  arn: string;
}
export const CreateDecoderManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "CreateDecoderManifestResponse",
}) as any as S.Schema<CreateDecoderManifestResponse>;
export interface CreateFleetRequest {
  fleetId: string;
  description?: string;
  signalCatalogArn: string;
  tags?: Tag[];
}
export const CreateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    description: S.optional(S.String),
    signalCatalogArn: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/fleets/{fleetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFleetRequest",
}) as any as S.Schema<CreateFleetRequest>;
export interface CreateFleetResponse {
  id: string;
  arn: string;
}
export const CreateFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, arn: S.String }),
).annotate({
  identifier: "CreateFleetResponse",
}) as any as S.Schema<CreateFleetResponse>;
export type ListOfStrings = string[];
export const ListOfStrings = /*@__PURE__*/ S.Array(S.String);
export interface CreateModelManifestRequest {
  name: string;
  description?: string;
  nodes: string[];
  signalCatalogArn: string;
  tags?: Tag[];
}
export const CreateModelManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    nodes: ListOfStrings,
    signalCatalogArn: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateModelManifestRequest",
}) as any as S.Schema<CreateModelManifestRequest>;
export interface CreateModelManifestResponse {
  name: string;
  arn: string;
}
export const CreateModelManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "CreateModelManifestResponse",
}) as any as S.Schema<CreateModelManifestResponse>;
export type Message = string;
export interface Branch {
  fullyQualifiedName: string;
  description?: string;
  deprecationMessage?: string;
  comment?: string;
}
export const Branch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    description: S.optional(S.String),
    deprecationMessage: S.optional(S.String),
    comment: S.optional(S.String),
  }),
).annotate({ identifier: "Branch" }) as any as S.Schema<Branch>;
export type NodeDataType =
  | "INT8"
  | "UINT8"
  | "INT16"
  | "UINT16"
  | "INT32"
  | "UINT32"
  | "INT64"
  | "UINT64"
  | "BOOLEAN"
  | "FLOAT"
  | "DOUBLE"
  | "STRING"
  | "UNIX_TIMESTAMP"
  | "INT8_ARRAY"
  | "UINT8_ARRAY"
  | "INT16_ARRAY"
  | "UINT16_ARRAY"
  | "INT32_ARRAY"
  | "UINT32_ARRAY"
  | "INT64_ARRAY"
  | "UINT64_ARRAY"
  | "BOOLEAN_ARRAY"
  | "FLOAT_ARRAY"
  | "DOUBLE_ARRAY"
  | "STRING_ARRAY"
  | "UNIX_TIMESTAMP_ARRAY"
  | "UNKNOWN"
  | "STRUCT"
  | "STRUCT_ARRAY"
  | (string & {});
export const NodeDataType = S.String;

export interface Sensor {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  description?: string;
  unit?: string;
  allowedValues?: string[];
  min?: number;
  max?: number;
  deprecationMessage?: string;
  comment?: string;
  structFullyQualifiedName?: string;
}
export const Sensor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    dataType: NodeDataType,
    description: S.optional(S.String),
    unit: S.optional(S.String),
    allowedValues: S.optional(ListOfStrings),
    min: S.optional(S.Number),
    max: S.optional(S.Number),
    deprecationMessage: S.optional(S.String),
    comment: S.optional(S.String),
    structFullyQualifiedName: S.optional(S.String),
  }),
).annotate({ identifier: "Sensor" }) as any as S.Schema<Sensor>;
export interface Actuator {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  description?: string;
  unit?: string;
  allowedValues?: string[];
  min?: number;
  max?: number;
  assignedValue?: string;
  deprecationMessage?: string;
  comment?: string;
  structFullyQualifiedName?: string;
}
export const Actuator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    dataType: NodeDataType,
    description: S.optional(S.String),
    unit: S.optional(S.String),
    allowedValues: S.optional(ListOfStrings),
    min: S.optional(S.Number),
    max: S.optional(S.Number),
    assignedValue: S.optional(S.String),
    deprecationMessage: S.optional(S.String),
    comment: S.optional(S.String),
    structFullyQualifiedName: S.optional(S.String),
  }),
).annotate({ identifier: "Actuator" }) as any as S.Schema<Actuator>;
export interface Attribute {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  description?: string;
  unit?: string;
  allowedValues?: string[];
  min?: number;
  max?: number;
  assignedValue?: string;
  defaultValue?: string;
  deprecationMessage?: string;
  comment?: string;
}
export const Attribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    dataType: NodeDataType,
    description: S.optional(S.String),
    unit: S.optional(S.String),
    allowedValues: S.optional(ListOfStrings),
    min: S.optional(S.Number),
    max: S.optional(S.Number),
    assignedValue: S.optional(S.String),
    defaultValue: S.optional(S.String),
    deprecationMessage: S.optional(S.String),
    comment: S.optional(S.String),
  }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export interface CustomStruct {
  fullyQualifiedName: string;
  description?: string;
  deprecationMessage?: string;
  comment?: string;
}
export const CustomStruct = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    description: S.optional(S.String),
    deprecationMessage: S.optional(S.String),
    comment: S.optional(S.String),
  }),
).annotate({ identifier: "CustomStruct" }) as any as S.Schema<CustomStruct>;
export type NodeDataEncoding = "BINARY" | "TYPED" | (string & {});
export const NodeDataEncoding = S.String;

export interface CustomProperty {
  fullyQualifiedName: string;
  dataType: NodeDataType;
  dataEncoding?: NodeDataEncoding;
  description?: string;
  deprecationMessage?: string;
  comment?: string;
  structFullyQualifiedName?: string;
}
export const CustomProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fullyQualifiedName: S.String,
    dataType: NodeDataType,
    dataEncoding: S.optional(NodeDataEncoding),
    description: S.optional(S.String),
    deprecationMessage: S.optional(S.String),
    comment: S.optional(S.String),
    structFullyQualifiedName: S.optional(S.String),
  }),
).annotate({ identifier: "CustomProperty" }) as any as S.Schema<CustomProperty>;
export type Node =
  | {
      branch: Branch;
      sensor?: never;
      actuator?: never;
      attribute?: never;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor: Sensor;
      actuator?: never;
      attribute?: never;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator: Actuator;
      attribute?: never;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator?: never;
      attribute: Attribute;
      struct?: never;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator?: never;
      attribute?: never;
      struct: CustomStruct;
      property?: never;
    }
  | {
      branch?: never;
      sensor?: never;
      actuator?: never;
      attribute?: never;
      struct?: never;
      property: CustomProperty;
    };
export const Node = /*@__PURE__*/ S.Union([
  S.Struct({ branch: Branch }),
  S.Struct({ sensor: Sensor }),
  S.Struct({ actuator: Actuator }),
  S.Struct({ attribute: Attribute }),
  S.Struct({ struct: CustomStruct }),
  S.Struct({ property: CustomProperty }),
]);
export type Nodes = Node[];
export const Nodes = /*@__PURE__*/ S.Array(Node);
export interface CreateSignalCatalogRequest {
  name: string;
  description?: string;
  nodes?: Node[];
  tags?: Tag[];
}
export const CreateSignalCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    nodes: S.optional(Nodes),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/signal-catalogs/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSignalCatalogRequest",
}) as any as S.Schema<CreateSignalCatalogRequest>;
export interface CreateSignalCatalogResponse {
  name: string;
  arn: string;
}
export const CreateSignalCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "CreateSignalCatalogResponse",
}) as any as S.Schema<CreateSignalCatalogResponse>;
export type StateTemplateProperties = string[];
export const StateTemplateProperties = /*@__PURE__*/ S.Array(S.String);
export type StateTemplateDataExtraDimensionNodePathList = string[];
export const StateTemplateDataExtraDimensionNodePathList =
  /*@__PURE__*/ S.Array(S.String);
export type StateTemplateMetadataExtraDimensionNodePathList = string[];
export const StateTemplateMetadataExtraDimensionNodePathList =
  /*@__PURE__*/ S.Array(S.String);
export interface CreateStateTemplateRequest {
  name: string;
  description?: string;
  signalCatalogArn: string;
  stateTemplateProperties: string[];
  dataExtraDimensions?: string[];
  metadataExtraDimensions?: string[];
  tags?: Tag[];
}
export const CreateStateTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    signalCatalogArn: S.String,
    stateTemplateProperties: StateTemplateProperties,
    dataExtraDimensions: S.optional(
      StateTemplateDataExtraDimensionNodePathList,
    ),
    metadataExtraDimensions: S.optional(
      StateTemplateMetadataExtraDimensionNodePathList,
    ),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/state-templates/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStateTemplateRequest",
}) as any as S.Schema<CreateStateTemplateRequest>;
export type ResourceUniqueId = string;
export interface CreateStateTemplateResponse {
  name?: string;
  arn?: string;
  id?: string;
}
export const CreateStateTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateStateTemplateResponse",
}) as any as S.Schema<CreateStateTemplateResponse>;
export interface CreateVehicleRequest {
  vehicleName: string;
  modelManifestArn: string;
  decoderManifestArn: string;
  attributes?: { [key: string]: string | undefined };
  associationBehavior?: VehicleAssociationBehavior;
  tags?: Tag[];
  stateTemplates?: StateTemplateAssociation[];
}
export const CreateVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
    modelManifestArn: S.String,
    decoderManifestArn: S.String,
    attributes: S.optional(AttributesMap),
    associationBehavior: S.optional(VehicleAssociationBehavior),
    tags: S.optional(TagList),
    stateTemplates: S.optional(StateTemplateAssociations),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/vehicles/{vehicleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVehicleRequest",
}) as any as S.Schema<CreateVehicleRequest>;
export interface CreateVehicleResponse {
  vehicleName?: string;
  arn?: string;
  thingArn?: string;
}
export const CreateVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.optional(S.String),
    arn: S.optional(S.String),
    thingArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateVehicleResponse",
}) as any as S.Schema<CreateVehicleResponse>;
export interface DeleteCampaignRequest {
  name: string;
}
export const DeleteCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/campaigns/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCampaignRequest",
}) as any as S.Schema<DeleteCampaignRequest>;
export interface DeleteCampaignResponse {
  name?: string;
  arn?: string;
}
export const DeleteCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteCampaignResponse",
}) as any as S.Schema<DeleteCampaignResponse>;
export interface DeleteDecoderManifestRequest {
  name: string;
}
export const DeleteDecoderManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/decoder-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDecoderManifestRequest",
}) as any as S.Schema<DeleteDecoderManifestRequest>;
export interface DeleteDecoderManifestResponse {
  name: string;
  arn: string;
}
export const DeleteDecoderManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "DeleteDecoderManifestResponse",
}) as any as S.Schema<DeleteDecoderManifestResponse>;
export interface DeleteFleetRequest {
  fleetId: string;
}
export const DeleteFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fleetId: S.String.pipe(T.HttpLabel("fleetId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/fleets/{fleetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFleetRequest",
}) as any as S.Schema<DeleteFleetRequest>;
export interface DeleteFleetResponse {
  id?: string;
  arn?: string;
}
export const DeleteFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteFleetResponse",
}) as any as S.Schema<DeleteFleetResponse>;
export interface DeleteModelManifestRequest {
  name: string;
}
export const DeleteModelManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/model-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteModelManifestRequest",
}) as any as S.Schema<DeleteModelManifestRequest>;
export interface DeleteModelManifestResponse {
  name: string;
  arn: string;
}
export const DeleteModelManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "DeleteModelManifestResponse",
}) as any as S.Schema<DeleteModelManifestResponse>;
export interface DeleteSignalCatalogRequest {
  name: string;
}
export const DeleteSignalCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/signal-catalogs/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSignalCatalogRequest",
}) as any as S.Schema<DeleteSignalCatalogRequest>;
export interface DeleteSignalCatalogResponse {
  name: string;
  arn: string;
}
export const DeleteSignalCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "DeleteSignalCatalogResponse",
}) as any as S.Schema<DeleteSignalCatalogResponse>;
export interface DeleteStateTemplateRequest {
  identifier: string;
}
export const DeleteStateTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/state-templates/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStateTemplateRequest",
}) as any as S.Schema<DeleteStateTemplateRequest>;
export interface DeleteStateTemplateResponse {
  name?: string;
  arn?: string;
  id?: string;
}
export const DeleteStateTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteStateTemplateResponse",
}) as any as S.Schema<DeleteStateTemplateResponse>;
export interface DeleteVehicleRequest {
  vehicleName: string;
}
export const DeleteVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicleName: S.String.pipe(T.HttpLabel("vehicleName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/vehicles/{vehicleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVehicleRequest",
}) as any as S.Schema<DeleteVehicleRequest>;
export interface DeleteVehicleResponse {
  vehicleName: string;
  arn: string;
}
export const DeleteVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicleName: S.String, arn: S.String }),
).annotate({
  identifier: "DeleteVehicleResponse",
}) as any as S.Schema<DeleteVehicleResponse>;
export interface DisassociateVehicleFleetRequest {
  vehicleName: string;
  fleetId: string;
}
export const DisassociateVehicleFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
    fleetId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/vehicles/{vehicleName}/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateVehicleFleetRequest",
}) as any as S.Schema<DisassociateVehicleFleetRequest>;
export interface DisassociateVehicleFleetResponse {}
export const DisassociateVehicleFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateVehicleFleetResponse",
}) as any as S.Schema<DisassociateVehicleFleetResponse>;
export interface GetCampaignRequest {
  name: string;
}
export const GetCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/campaigns/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignRequest",
}) as any as S.Schema<GetCampaignRequest>;
export type CampaignStatus =
  | "CREATING"
  | "WAITING_FOR_APPROVAL"
  | "RUNNING"
  | "SUSPENDED"
  | (string & {});
export const CampaignStatus = S.String;

export interface GetCampaignResponse {
  name?: string;
  arn?: string;
  description?: string;
  signalCatalogArn?: string;
  targetArn?: string;
  status?: CampaignStatus;
  startTime?: Date;
  expiryTime?: Date;
  postTriggerCollectionDuration?: number;
  diagnosticsMode?: DiagnosticsMode;
  spoolingMode?: SpoolingMode;
  compression?: Compression;
  priority?: number;
  signalsToCollect?: SignalInformation[];
  collectionScheme?: CollectionScheme;
  dataExtraDimensions?: string[];
  creationTime?: Date;
  lastModificationTime?: Date;
  dataDestinationConfigs?: DataDestinationConfig[];
  dataPartitions?: DataPartition[];
  signalsToFetch?: SignalFetchInformation[];
}
export const GetCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    description: S.optional(S.String),
    signalCatalogArn: S.optional(S.String),
    targetArn: S.optional(S.String),
    status: S.optional(CampaignStatus),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    expiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    postTriggerCollectionDuration: S.optional(S.Number),
    diagnosticsMode: S.optional(DiagnosticsMode),
    spoolingMode: S.optional(SpoolingMode),
    compression: S.optional(Compression),
    priority: S.optional(S.Number),
    signalsToCollect: S.optional(SignalInformationList),
    collectionScheme: S.optional(CollectionScheme),
    dataExtraDimensions: S.optional(DataExtraDimensionNodePathList),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    dataDestinationConfigs: S.optional(DataDestinationConfigs),
    dataPartitions: S.optional(DataPartitions),
    signalsToFetch: S.optional(SignalFetchInformationList),
  }),
).annotate({
  identifier: "GetCampaignResponse",
}) as any as S.Schema<GetCampaignResponse>;
export interface GetDecoderManifestRequest {
  name: string;
}
export const GetDecoderManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/decoder-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDecoderManifestRequest",
}) as any as S.Schema<GetDecoderManifestRequest>;
export type ManifestStatus =
  | "ACTIVE"
  | "DRAFT"
  | "INVALID"
  | "VALIDATING"
  | (string & {});
export const ManifestStatus = S.String;

export interface GetDecoderManifestResponse {
  name: string;
  arn: string;
  description?: string;
  modelManifestArn?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
  message?: string;
}
export const GetDecoderManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    modelManifestArn: S.optional(S.String),
    status: S.optional(ManifestStatus),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDecoderManifestResponse",
}) as any as S.Schema<GetDecoderManifestResponse>;
export interface GetEncryptionConfigurationRequest {}
export const GetEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/encryptionConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEncryptionConfigurationRequest",
}) as any as S.Schema<GetEncryptionConfigurationRequest>;
export type EncryptionStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILURE"
  | (string & {});
export const EncryptionStatus = S.String;

export type EncryptionType =
  | "KMS_BASED_ENCRYPTION"
  | "FLEETWISE_DEFAULT_ENCRYPTION"
  | (string & {});
export const EncryptionType = S.String;

export type ErrorMessage = string;
export interface GetEncryptionConfigurationResponse {
  kmsKeyId?: string;
  encryptionStatus: EncryptionStatus;
  encryptionType: EncryptionType;
  errorMessage?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
}
export const GetEncryptionConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    encryptionStatus: EncryptionStatus,
    encryptionType: EncryptionType,
    errorMessage: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetEncryptionConfigurationResponse",
}) as any as S.Schema<GetEncryptionConfigurationResponse>;
export interface GetFleetRequest {
  fleetId: string;
}
export const GetFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fleetId: S.String.pipe(T.HttpLabel("fleetId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/fleets/{fleetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFleetRequest",
}) as any as S.Schema<GetFleetRequest>;
export interface GetFleetResponse {
  id: string;
  arn: string;
  description?: string;
  signalCatalogArn: string;
  creationTime: Date;
  lastModificationTime: Date;
}
export const GetFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    description: S.optional(S.String),
    signalCatalogArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetFleetResponse",
}) as any as S.Schema<GetFleetResponse>;
export interface GetLoggingOptionsRequest {}
export const GetLoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/loggingOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLoggingOptionsRequest",
}) as any as S.Schema<GetLoggingOptionsRequest>;
export type LogType = "OFF" | "ERROR" | (string & {});
export const LogType = S.String;

export type CloudWatchLogGroupName = string;
export interface CloudWatchLogDeliveryOptions {
  logType: LogType;
  logGroupName?: string;
}
export const CloudWatchLogDeliveryOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logType: LogType, logGroupName: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogDeliveryOptions",
}) as any as S.Schema<CloudWatchLogDeliveryOptions>;
export interface GetLoggingOptionsResponse {
  cloudWatchLogDelivery: CloudWatchLogDeliveryOptions;
}
export const GetLoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudWatchLogDelivery: CloudWatchLogDeliveryOptions }),
).annotate({
  identifier: "GetLoggingOptionsResponse",
}) as any as S.Schema<GetLoggingOptionsResponse>;
export interface GetModelManifestRequest {
  name: string;
}
export const GetModelManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetModelManifestRequest",
}) as any as S.Schema<GetModelManifestRequest>;
export interface GetModelManifestResponse {
  name: string;
  arn: string;
  description?: string;
  signalCatalogArn?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
}
export const GetModelManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    signalCatalogArn: S.optional(S.String),
    status: S.optional(ManifestStatus),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetModelManifestResponse",
}) as any as S.Schema<GetModelManifestResponse>;
export interface GetRegisterAccountStatusRequest {}
export const GetRegisterAccountStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/account/registration_status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegisterAccountStatusRequest",
}) as any as S.Schema<GetRegisterAccountStatusRequest>;
export type CustomerAccountId = string;
export type RegistrationStatus =
  | "REGISTRATION_PENDING"
  | "REGISTRATION_SUCCESS"
  | "REGISTRATION_FAILURE"
  | (string & {});
export const RegistrationStatus = S.String;

export type TimestreamDatabaseName = string;
export type TimestreamTableName = string;
export interface TimestreamRegistrationResponse {
  timestreamDatabaseName: string;
  timestreamTableName: string;
  timestreamDatabaseArn?: string;
  timestreamTableArn?: string;
  registrationStatus: RegistrationStatus;
  errorMessage?: string;
}
export const TimestreamRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestreamDatabaseName: S.String,
    timestreamTableName: S.String,
    timestreamDatabaseArn: S.optional(S.String),
    timestreamTableArn: S.optional(S.String),
    registrationStatus: RegistrationStatus,
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "TimestreamRegistrationResponse",
}) as any as S.Schema<TimestreamRegistrationResponse>;
export interface IamRegistrationResponse {
  roleArn: string;
  registrationStatus: RegistrationStatus;
  errorMessage?: string;
}
export const IamRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    registrationStatus: RegistrationStatus,
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "IamRegistrationResponse",
}) as any as S.Schema<IamRegistrationResponse>;
export interface GetRegisterAccountStatusResponse {
  customerAccountId: string;
  accountStatus: RegistrationStatus;
  timestreamRegistrationResponse?: TimestreamRegistrationResponse;
  iamRegistrationResponse: IamRegistrationResponse;
  creationTime: Date;
  lastModificationTime: Date;
}
export const GetRegisterAccountStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customerAccountId: S.String,
    accountStatus: RegistrationStatus,
    timestreamRegistrationResponse: S.optional(TimestreamRegistrationResponse),
    iamRegistrationResponse: IamRegistrationResponse,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetRegisterAccountStatusResponse",
}) as any as S.Schema<GetRegisterAccountStatusResponse>;
export interface GetSignalCatalogRequest {
  name: string;
}
export const GetSignalCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signal-catalogs/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSignalCatalogRequest",
}) as any as S.Schema<GetSignalCatalogRequest>;
export interface NodeCounts {
  totalNodes?: number;
  totalBranches?: number;
  totalSensors?: number;
  totalAttributes?: number;
  totalActuators?: number;
  totalStructs?: number;
  totalProperties?: number;
}
export const NodeCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalNodes: S.optional(S.Number),
    totalBranches: S.optional(S.Number),
    totalSensors: S.optional(S.Number),
    totalAttributes: S.optional(S.Number),
    totalActuators: S.optional(S.Number),
    totalStructs: S.optional(S.Number),
    totalProperties: S.optional(S.Number),
  }),
).annotate({ identifier: "NodeCounts" }) as any as S.Schema<NodeCounts>;
export interface GetSignalCatalogResponse {
  name: string;
  arn: string;
  description?: string;
  nodeCounts?: NodeCounts;
  creationTime: Date;
  lastModificationTime: Date;
}
export const GetSignalCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    arn: S.String,
    description: S.optional(S.String),
    nodeCounts: S.optional(NodeCounts),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetSignalCatalogResponse",
}) as any as S.Schema<GetSignalCatalogResponse>;
export interface GetStateTemplateRequest {
  identifier: string;
}
export const GetStateTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/state-templates/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStateTemplateRequest",
}) as any as S.Schema<GetStateTemplateRequest>;
export interface GetStateTemplateResponse {
  name?: string;
  arn?: string;
  description?: string;
  signalCatalogArn?: string;
  stateTemplateProperties?: string[];
  dataExtraDimensions?: string[];
  metadataExtraDimensions?: string[];
  creationTime?: Date;
  lastModificationTime?: Date;
  id?: string;
}
export const GetStateTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    description: S.optional(S.String),
    signalCatalogArn: S.optional(S.String),
    stateTemplateProperties: S.optional(StateTemplateProperties),
    dataExtraDimensions: S.optional(
      StateTemplateDataExtraDimensionNodePathList,
    ),
    metadataExtraDimensions: S.optional(
      StateTemplateMetadataExtraDimensionNodePathList,
    ),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "GetStateTemplateResponse",
}) as any as S.Schema<GetStateTemplateResponse>;
export interface GetVehicleRequest {
  vehicleName: string;
}
export const GetVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicleName: S.String.pipe(T.HttpLabel("vehicleName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vehicles/{vehicleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVehicleRequest",
}) as any as S.Schema<GetVehicleRequest>;
export interface GetVehicleResponse {
  vehicleName?: string;
  arn?: string;
  modelManifestArn?: string;
  decoderManifestArn?: string;
  attributes?: { [key: string]: string | undefined };
  stateTemplates?: StateTemplateAssociation[];
  creationTime?: Date;
  lastModificationTime?: Date;
}
export const GetVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.optional(S.String),
    arn: S.optional(S.String),
    modelManifestArn: S.optional(S.String),
    decoderManifestArn: S.optional(S.String),
    attributes: S.optional(AttributesMap),
    stateTemplates: S.optional(StateTemplateAssociations),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetVehicleResponse",
}) as any as S.Schema<GetVehicleResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface GetVehicleStatusRequest {
  nextToken?: string;
  maxResults?: number;
  vehicleName: string;
}
export const GetVehicleStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vehicles/{vehicleName}/status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVehicleStatusRequest",
}) as any as S.Schema<GetVehicleStatusRequest>;
export type VehicleState =
  | "CREATED"
  | "READY"
  | "HEALTHY"
  | "SUSPENDED"
  | "DELETING"
  | "READY_FOR_CHECKIN"
  | (string & {});
export const VehicleState = S.String;

export interface VehicleStatus {
  campaignName?: string;
  vehicleName?: string;
  status?: VehicleState;
}
export const VehicleStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    campaignName: S.optional(S.String),
    vehicleName: S.optional(S.String),
    status: S.optional(VehicleState),
  }),
).annotate({ identifier: "VehicleStatus" }) as any as S.Schema<VehicleStatus>;
export type VehicleStatusList = VehicleStatus[];
export const VehicleStatusList = /*@__PURE__*/ S.Array(VehicleStatus);
export interface GetVehicleStatusResponse {
  campaigns?: VehicleStatus[];
  nextToken?: string;
}
export const GetVehicleStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    campaigns: S.optional(VehicleStatusList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetVehicleStatusResponse",
}) as any as S.Schema<GetVehicleStatusResponse>;
export type NetworkFileBlob = Uint8Array;
export type NetworkFilesList = Uint8Array[];
export const NetworkFilesList = /*@__PURE__*/ S.Array(T.Blob);
export type ModelSignalsMap = { [key: string]: string | undefined };
export const ModelSignalsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CanDbcDefinition {
  networkInterface: string;
  canDbcFiles: Uint8Array[];
  signalsMap?: { [key: string]: string | undefined };
}
export const CanDbcDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkInterface: S.String,
    canDbcFiles: NetworkFilesList,
    signalsMap: S.optional(ModelSignalsMap),
  }),
).annotate({
  identifier: "CanDbcDefinition",
}) as any as S.Schema<CanDbcDefinition>;
export type NetworkFileDefinition = { canDbc: CanDbcDefinition };
export const NetworkFileDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ canDbc: CanDbcDefinition }),
]);
export type NetworkFileDefinitions = NetworkFileDefinition[];
export const NetworkFileDefinitions = /*@__PURE__*/ S.Array(
  NetworkFileDefinition,
);
export interface ImportDecoderManifestRequest {
  name: string;
  networkFileDefinitions: NetworkFileDefinition[];
}
export const ImportDecoderManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    networkFileDefinitions: NetworkFileDefinitions,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/decoder-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportDecoderManifestRequest",
}) as any as S.Schema<ImportDecoderManifestRequest>;
export interface ImportDecoderManifestResponse {
  name: string;
  arn: string;
}
export const ImportDecoderManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "ImportDecoderManifestResponse",
}) as any as S.Schema<ImportDecoderManifestResponse>;
export type FormattedVss = { vssJson: string };
export const FormattedVss = /*@__PURE__*/ S.Union([
  S.Struct({ vssJson: S.String }),
]);
export interface ImportSignalCatalogRequest {
  name: string;
  description?: string;
  vss?: FormattedVss;
  tags?: Tag[];
}
export const ImportSignalCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    vss: S.optional(FormattedVss),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/signal-catalogs/{name}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportSignalCatalogRequest",
}) as any as S.Schema<ImportSignalCatalogRequest>;
export interface ImportSignalCatalogResponse {
  name: string;
  arn: string;
}
export const ImportSignalCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "ImportSignalCatalogResponse",
}) as any as S.Schema<ImportSignalCatalogResponse>;
export type StatusStr = string;
export type ListResponseScope = "METADATA_ONLY" | (string & {});
export const ListResponseScope = S.String;

export interface ListCampaignsRequest {
  nextToken?: string;
  maxResults?: number;
  status?: string;
  listResponseScope?: ListResponseScope;
}
export const ListCampaignsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(S.String).pipe(T.HttpQuery("status")),
    listResponseScope: S.optional(ListResponseScope).pipe(
      T.HttpQuery("listResponseScope"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/campaigns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCampaignsRequest",
}) as any as S.Schema<ListCampaignsRequest>;
export interface CampaignSummary {
  arn?: string;
  name?: string;
  description?: string;
  signalCatalogArn?: string;
  targetArn?: string;
  status?: CampaignStatus;
  creationTime: Date;
  lastModificationTime: Date;
}
export const CampaignSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    signalCatalogArn: S.optional(S.String),
    targetArn: S.optional(S.String),
    status: S.optional(CampaignStatus),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CampaignSummary",
}) as any as S.Schema<CampaignSummary>;
export type CampaignSummaries = CampaignSummary[];
export const CampaignSummaries = /*@__PURE__*/ S.Array(CampaignSummary);
export interface ListCampaignsResponse {
  campaignSummaries?: CampaignSummary[];
  nextToken?: string;
}
export const ListCampaignsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    campaignSummaries: S.optional(CampaignSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCampaignsResponse",
}) as any as S.Schema<ListCampaignsResponse>;
export interface ListDecoderManifestNetworkInterfacesRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDecoderManifestNetworkInterfacesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      name: S.String.pipe(T.HttpLabel("name")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/decoder-manifests/{name}/network-interfaces",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListDecoderManifestNetworkInterfacesRequest",
  }) as any as S.Schema<ListDecoderManifestNetworkInterfacesRequest>;
export interface ListDecoderManifestNetworkInterfacesResponse {
  networkInterfaces?: NetworkInterface[];
  nextToken?: string;
}
export const ListDecoderManifestNetworkInterfacesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      networkInterfaces: S.optional(NetworkInterfaces),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDecoderManifestNetworkInterfacesResponse",
  }) as any as S.Schema<ListDecoderManifestNetworkInterfacesResponse>;
export interface ListDecoderManifestsRequest {
  modelManifestArn?: string;
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export const ListDecoderManifestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelManifestArn: S.optional(S.String).pipe(
      T.HttpQuery("modelManifestArn"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    listResponseScope: S.optional(ListResponseScope).pipe(
      T.HttpQuery("listResponseScope"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/decoder-manifests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDecoderManifestsRequest",
}) as any as S.Schema<ListDecoderManifestsRequest>;
export interface DecoderManifestSummary {
  name?: string;
  arn?: string;
  modelManifestArn?: string;
  description?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
  message?: string;
}
export const DecoderManifestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    modelManifestArn: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(ManifestStatus),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DecoderManifestSummary",
}) as any as S.Schema<DecoderManifestSummary>;
export type DecoderManifestSummaries = DecoderManifestSummary[];
export const DecoderManifestSummaries = /*@__PURE__*/ S.Array(
  DecoderManifestSummary,
);
export interface ListDecoderManifestsResponse {
  summaries?: DecoderManifestSummary[];
  nextToken?: string;
}
export const ListDecoderManifestsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaries: S.optional(DecoderManifestSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDecoderManifestsResponse",
}) as any as S.Schema<ListDecoderManifestsResponse>;
export interface ListDecoderManifestSignalsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDecoderManifestSignalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/decoder-manifests/{name}/signals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDecoderManifestSignalsRequest",
}) as any as S.Schema<ListDecoderManifestSignalsRequest>;
export interface ListDecoderManifestSignalsResponse {
  signalDecoders?: SignalDecoder[];
  nextToken?: string;
}
export const ListDecoderManifestSignalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signalDecoders: S.optional(SignalDecoders),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDecoderManifestSignalsResponse",
}) as any as S.Schema<ListDecoderManifestSignalsResponse>;
export interface ListFleetsRequest {
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export const ListFleetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    listResponseScope: S.optional(ListResponseScope).pipe(
      T.HttpQuery("listResponseScope"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/fleets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetsRequest",
}) as any as S.Schema<ListFleetsRequest>;
export interface FleetSummary {
  id: string;
  arn: string;
  description?: string;
  signalCatalogArn: string;
  creationTime: Date;
  lastModificationTime?: Date;
}
export const FleetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    description: S.optional(S.String),
    signalCatalogArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "FleetSummary" }) as any as S.Schema<FleetSummary>;
export type FleetSummaries = FleetSummary[];
export const FleetSummaries = /*@__PURE__*/ S.Array(FleetSummary);
export interface ListFleetsResponse {
  fleetSummaries?: FleetSummary[];
  nextToken?: string;
}
export const ListFleetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetSummaries: S.optional(FleetSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFleetsResponse",
}) as any as S.Schema<ListFleetsResponse>;
export interface ListFleetsForVehicleRequest {
  vehicleName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFleetsForVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vehicles/{vehicleName}/fleets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetsForVehicleRequest",
}) as any as S.Schema<ListFleetsForVehicleRequest>;
export type Fleets = string[];
export const Fleets = /*@__PURE__*/ S.Array(S.String);
export interface ListFleetsForVehicleResponse {
  fleets?: string[];
  nextToken?: string;
}
export const ListFleetsForVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fleets: S.optional(Fleets), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFleetsForVehicleResponse",
}) as any as S.Schema<ListFleetsForVehicleResponse>;
export interface ListModelManifestNodesRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListModelManifestNodesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-manifests/{name}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListModelManifestNodesRequest",
}) as any as S.Schema<ListModelManifestNodesRequest>;
export interface ListModelManifestNodesResponse {
  nodes?: Node[];
  nextToken?: string;
}
export const ListModelManifestNodesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodes: S.optional(Nodes), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListModelManifestNodesResponse",
}) as any as S.Schema<ListModelManifestNodesResponse>;
export interface ListModelManifestsRequest {
  signalCatalogArn?: string;
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export const ListModelManifestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signalCatalogArn: S.optional(S.String).pipe(
      T.HttpQuery("signalCatalogArn"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    listResponseScope: S.optional(ListResponseScope).pipe(
      T.HttpQuery("listResponseScope"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/model-manifests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListModelManifestsRequest",
}) as any as S.Schema<ListModelManifestsRequest>;
export interface ModelManifestSummary {
  name?: string;
  arn?: string;
  signalCatalogArn?: string;
  description?: string;
  status?: ManifestStatus;
  creationTime: Date;
  lastModificationTime: Date;
}
export const ModelManifestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    signalCatalogArn: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(ManifestStatus),
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ModelManifestSummary",
}) as any as S.Schema<ModelManifestSummary>;
export type ModelManifestSummaries = ModelManifestSummary[];
export const ModelManifestSummaries =
  /*@__PURE__*/ S.Array(ModelManifestSummary);
export interface ListModelManifestsResponse {
  summaries?: ModelManifestSummary[];
  nextToken?: string;
}
export const ListModelManifestsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaries: S.optional(ModelManifestSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListModelManifestsResponse",
}) as any as S.Schema<ListModelManifestsResponse>;
export type SignalNodeType =
  | "SENSOR"
  | "ACTUATOR"
  | "ATTRIBUTE"
  | "BRANCH"
  | "CUSTOM_STRUCT"
  | "CUSTOM_PROPERTY"
  | (string & {});
export const SignalNodeType = S.String;

export interface ListSignalCatalogNodesRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
  signalNodeType?: SignalNodeType;
}
export const ListSignalCatalogNodesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    signalNodeType: S.optional(SignalNodeType).pipe(
      T.HttpQuery("signalNodeType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signal-catalogs/{name}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSignalCatalogNodesRequest",
}) as any as S.Schema<ListSignalCatalogNodesRequest>;
export interface ListSignalCatalogNodesResponse {
  nodes?: Node[];
  nextToken?: string;
}
export const ListSignalCatalogNodesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodes: S.optional(Nodes), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSignalCatalogNodesResponse",
}) as any as S.Schema<ListSignalCatalogNodesResponse>;
export interface ListSignalCatalogsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListSignalCatalogsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signal-catalogs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSignalCatalogsRequest",
}) as any as S.Schema<ListSignalCatalogsRequest>;
export interface SignalCatalogSummary {
  name?: string;
  arn?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
}
export const SignalCatalogSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SignalCatalogSummary",
}) as any as S.Schema<SignalCatalogSummary>;
export type SignalCatalogSummaries = SignalCatalogSummary[];
export const SignalCatalogSummaries =
  /*@__PURE__*/ S.Array(SignalCatalogSummary);
export interface ListSignalCatalogsResponse {
  summaries?: SignalCatalogSummary[];
  nextToken?: string;
}
export const ListSignalCatalogsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaries: S.optional(SignalCatalogSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSignalCatalogsResponse",
}) as any as S.Schema<ListSignalCatalogsResponse>;
export interface ListStateTemplatesRequest {
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export const ListStateTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    listResponseScope: S.optional(ListResponseScope).pipe(
      T.HttpQuery("listResponseScope"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/state-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStateTemplatesRequest",
}) as any as S.Schema<ListStateTemplatesRequest>;
export interface StateTemplateSummary {
  name?: string;
  arn?: string;
  signalCatalogArn?: string;
  description?: string;
  creationTime?: Date;
  lastModificationTime?: Date;
  id?: string;
}
export const StateTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    signalCatalogArn: S.optional(S.String),
    description: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "StateTemplateSummary",
}) as any as S.Schema<StateTemplateSummary>;
export type StateTemplateSummaries = StateTemplateSummary[];
export const StateTemplateSummaries =
  /*@__PURE__*/ S.Array(StateTemplateSummary);
export interface ListStateTemplatesResponse {
  summaries?: StateTemplateSummary[];
  nextToken?: string;
}
export const ListStateTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    summaries: S.optional(StateTemplateSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStateTemplatesResponse",
}) as any as S.Schema<ListStateTemplatesResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags" }),
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
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type AttributeNamesList = string[];
export const AttributeNamesList = /*@__PURE__*/ S.Array(S.String);
export type AttributeValuesList = string[];
export const AttributeValuesList = /*@__PURE__*/ S.Array(S.String);
export type ListVehiclesMaxResults = number;
export interface ListVehiclesRequest {
  modelManifestArn?: string;
  attributeNames?: string[];
  attributeValues?: string[];
  nextToken?: string;
  maxResults?: number;
  listResponseScope?: ListResponseScope;
}
export const ListVehiclesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelManifestArn: S.optional(S.String).pipe(
      T.HttpQuery("modelManifestArn"),
    ),
    attributeNames: S.optional(AttributeNamesList).pipe(
      T.HttpQuery("attributeNames"),
    ),
    attributeValues: S.optional(AttributeValuesList).pipe(
      T.HttpQuery("attributeValues"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    listResponseScope: S.optional(ListResponseScope).pipe(
      T.HttpQuery("listResponseScope"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vehicles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVehiclesRequest",
}) as any as S.Schema<ListVehiclesRequest>;
export interface VehicleSummary {
  vehicleName: string;
  arn: string;
  modelManifestArn: string;
  decoderManifestArn: string;
  creationTime: Date;
  lastModificationTime: Date;
  attributes?: { [key: string]: string | undefined };
}
export const VehicleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String,
    arn: S.String,
    modelManifestArn: S.String,
    decoderManifestArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    attributes: S.optional(AttributesMap),
  }),
).annotate({ identifier: "VehicleSummary" }) as any as S.Schema<VehicleSummary>;
export type VehicleSummaries = VehicleSummary[];
export const VehicleSummaries = /*@__PURE__*/ S.Array(VehicleSummary);
export interface ListVehiclesResponse {
  vehicleSummaries?: VehicleSummary[];
  nextToken?: string;
}
export const ListVehiclesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleSummaries: S.optional(VehicleSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVehiclesResponse",
}) as any as S.Schema<ListVehiclesResponse>;
export interface ListVehiclesInFleetRequest {
  fleetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListVehiclesInFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/fleets/{fleetId}/vehicles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVehiclesInFleetRequest",
}) as any as S.Schema<ListVehiclesInFleetRequest>;
export type Vehicles = string[];
export const Vehicles = /*@__PURE__*/ S.Array(S.String);
export interface ListVehiclesInFleetResponse {
  vehicles?: string[];
  nextToken?: string;
}
export const ListVehiclesInFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicles: S.optional(Vehicles), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListVehiclesInFleetResponse",
}) as any as S.Schema<ListVehiclesInFleetResponse>;
export interface PutEncryptionConfigurationRequest {
  kmsKeyId?: string;
  encryptionType: EncryptionType;
}
export const PutEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    encryptionType: EncryptionType,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/encryptionConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutEncryptionConfigurationRequest",
}) as any as S.Schema<PutEncryptionConfigurationRequest>;
export interface PutEncryptionConfigurationResponse {
  kmsKeyId?: string;
  encryptionStatus: EncryptionStatus;
  encryptionType: EncryptionType;
}
export const PutEncryptionConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.optional(S.String),
    encryptionStatus: EncryptionStatus,
    encryptionType: EncryptionType,
  }),
).annotate({
  identifier: "PutEncryptionConfigurationResponse",
}) as any as S.Schema<PutEncryptionConfigurationResponse>;
export interface PutLoggingOptionsRequest {
  cloudWatchLogDelivery: CloudWatchLogDeliveryOptions;
}
export const PutLoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudWatchLogDelivery: CloudWatchLogDeliveryOptions }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/loggingOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutLoggingOptionsRequest",
}) as any as S.Schema<PutLoggingOptionsRequest>;
export interface PutLoggingOptionsResponse {}
export const PutLoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutLoggingOptionsResponse",
}) as any as S.Schema<PutLoggingOptionsResponse>;
export interface TimestreamResources {
  timestreamDatabaseName: string;
  timestreamTableName: string;
}
export const TimestreamResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timestreamDatabaseName: S.String, timestreamTableName: S.String }),
).annotate({
  identifier: "TimestreamResources",
}) as any as S.Schema<TimestreamResources>;
export interface IamResources {
  roleArn: string;
}
export const IamResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.String }),
).annotate({ identifier: "IamResources" }) as any as S.Schema<IamResources>;
export interface RegisterAccountRequest {
  timestreamResources?: TimestreamResources;
  iamResources?: IamResources;
}
export const RegisterAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestreamResources: S.optional(TimestreamResources),
    iamResources: S.optional(IamResources),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/account/registration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterAccountRequest",
}) as any as S.Schema<RegisterAccountRequest>;
export interface RegisterAccountResponse {
  registerAccountStatus: RegistrationStatus;
  timestreamResources?: TimestreamResources;
  iamResources: IamResources;
  creationTime: Date;
  lastModificationTime: Date;
}
export const RegisterAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registerAccountStatus: RegistrationStatus,
    timestreamResources: S.optional(TimestreamResources),
    iamResources: IamResources,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastModificationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "RegisterAccountResponse",
}) as any as S.Schema<RegisterAccountResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.String.pipe(T.HttpQuery("resourceArn")),
    Tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags" }),
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
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.String.pipe(T.HttpQuery("resourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags" }),
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
export type UpdateCampaignAction =
  | "APPROVE"
  | "SUSPEND"
  | "RESUME"
  | "UPDATE"
  | (string & {});
export const UpdateCampaignAction = S.String;

export interface UpdateCampaignRequest {
  name: string;
  description?: string;
  dataExtraDimensions?: string[];
  action: UpdateCampaignAction;
}
export const UpdateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    dataExtraDimensions: S.optional(DataExtraDimensionNodePathList),
    action: UpdateCampaignAction,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/campaigns/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignRequest",
}) as any as S.Schema<UpdateCampaignRequest>;
export interface UpdateCampaignResponse {
  arn?: string;
  name?: string;
  status?: CampaignStatus;
}
export const UpdateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(CampaignStatus),
  }),
).annotate({
  identifier: "UpdateCampaignResponse",
}) as any as S.Schema<UpdateCampaignResponse>;
export type Fqns = string[];
export const Fqns = /*@__PURE__*/ S.Array(S.String);
export type InterfaceIds = string[];
export const InterfaceIds = /*@__PURE__*/ S.Array(S.String);
export interface UpdateDecoderManifestRequest {
  name: string;
  description?: string;
  signalDecodersToAdd?: SignalDecoder[];
  signalDecodersToUpdate?: SignalDecoder[];
  signalDecodersToRemove?: string[];
  networkInterfacesToAdd?: NetworkInterface[];
  networkInterfacesToUpdate?: NetworkInterface[];
  networkInterfacesToRemove?: string[];
  status?: ManifestStatus;
  defaultForUnmappedSignals?: DefaultForUnmappedSignalsType;
}
export const UpdateDecoderManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    signalDecodersToAdd: S.optional(SignalDecoders),
    signalDecodersToUpdate: S.optional(SignalDecoders),
    signalDecodersToRemove: S.optional(Fqns),
    networkInterfacesToAdd: S.optional(NetworkInterfaces),
    networkInterfacesToUpdate: S.optional(NetworkInterfaces),
    networkInterfacesToRemove: S.optional(InterfaceIds),
    status: S.optional(ManifestStatus),
    defaultForUnmappedSignals: S.optional(DefaultForUnmappedSignalsType),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/decoder-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDecoderManifestRequest",
}) as any as S.Schema<UpdateDecoderManifestRequest>;
export interface UpdateDecoderManifestResponse {
  name: string;
  arn: string;
}
export const UpdateDecoderManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "UpdateDecoderManifestResponse",
}) as any as S.Schema<UpdateDecoderManifestResponse>;
export interface UpdateFleetRequest {
  fleetId: string;
  description?: string;
}
export const UpdateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetId: S.String.pipe(T.HttpLabel("fleetId")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/fleets/{fleetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFleetRequest",
}) as any as S.Schema<UpdateFleetRequest>;
export interface UpdateFleetResponse {
  id?: string;
  arn?: string;
}
export const UpdateFleetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateFleetResponse",
}) as any as S.Schema<UpdateFleetResponse>;
export type NodePaths = string[];
export const NodePaths = /*@__PURE__*/ S.Array(S.String);
export interface UpdateModelManifestRequest {
  name: string;
  description?: string;
  nodesToAdd?: string[];
  nodesToRemove?: string[];
  status?: ManifestStatus;
}
export const UpdateModelManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    nodesToAdd: S.optional(NodePaths),
    nodesToRemove: S.optional(NodePaths),
    status: S.optional(ManifestStatus),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/model-manifests/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateModelManifestRequest",
}) as any as S.Schema<UpdateModelManifestRequest>;
export interface UpdateModelManifestResponse {
  name: string;
  arn: string;
}
export const UpdateModelManifestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "UpdateModelManifestResponse",
}) as any as S.Schema<UpdateModelManifestResponse>;
export interface UpdateSignalCatalogRequest {
  name: string;
  description?: string;
  nodesToAdd?: Node[];
  nodesToUpdate?: Node[];
  nodesToRemove?: string[];
}
export const UpdateSignalCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    nodesToAdd: S.optional(Nodes),
    nodesToUpdate: S.optional(Nodes),
    nodesToRemove: S.optional(NodePaths),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/signal-catalogs/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSignalCatalogRequest",
}) as any as S.Schema<UpdateSignalCatalogRequest>;
export interface UpdateSignalCatalogResponse {
  name: string;
  arn: string;
}
export const UpdateSignalCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "UpdateSignalCatalogResponse",
}) as any as S.Schema<UpdateSignalCatalogResponse>;
export interface UpdateStateTemplateRequest {
  identifier: string;
  description?: string;
  stateTemplatePropertiesToAdd?: string[];
  stateTemplatePropertiesToRemove?: string[];
  dataExtraDimensions?: string[];
  metadataExtraDimensions?: string[];
}
export const UpdateStateTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    description: S.optional(S.String),
    stateTemplatePropertiesToAdd: S.optional(StateTemplateProperties),
    stateTemplatePropertiesToRemove: S.optional(StateTemplateProperties),
    dataExtraDimensions: S.optional(
      StateTemplateDataExtraDimensionNodePathList,
    ),
    metadataExtraDimensions: S.optional(
      StateTemplateMetadataExtraDimensionNodePathList,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/state-templates/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStateTemplateRequest",
}) as any as S.Schema<UpdateStateTemplateRequest>;
export interface UpdateStateTemplateResponse {
  name?: string;
  arn?: string;
  id?: string;
}
export const UpdateStateTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateStateTemplateResponse",
}) as any as S.Schema<UpdateStateTemplateResponse>;
export interface UpdateVehicleRequest {
  vehicleName: string;
  modelManifestArn?: string;
  decoderManifestArn?: string;
  attributes?: { [key: string]: string | undefined };
  attributeUpdateMode?: UpdateMode;
  stateTemplatesToAdd?: StateTemplateAssociation[];
  stateTemplatesToRemove?: string[];
  stateTemplatesToUpdate?: StateTemplateAssociation[];
}
export const UpdateVehicleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vehicleName: S.String.pipe(T.HttpLabel("vehicleName")),
    modelManifestArn: S.optional(S.String),
    decoderManifestArn: S.optional(S.String),
    attributes: S.optional(AttributesMap),
    attributeUpdateMode: S.optional(UpdateMode),
    stateTemplatesToAdd: S.optional(StateTemplateAssociations),
    stateTemplatesToRemove: S.optional(StateTemplateAssociationIdentifiers),
    stateTemplatesToUpdate: S.optional(StateTemplateAssociations),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/vehicles/{vehicleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVehicleRequest",
}) as any as S.Schema<UpdateVehicleRequest>;
export interface UpdateVehicleResponse {
  vehicleName?: string;
  arn?: string;
}
export const UpdateVehicleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vehicleName: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateVehicleResponse",
}) as any as S.Schema<UpdateVehicleResponse>;
export type RetryAfterSeconds = number;
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
export type SignalDecoderFailureReason =
  | "DUPLICATE_SIGNAL"
  | "CONFLICTING_SIGNAL"
  | "SIGNAL_TO_ADD_ALREADY_EXISTS"
  | "SIGNAL_NOT_ASSOCIATED_WITH_NETWORK_INTERFACE"
  | "NETWORK_INTERFACE_TYPE_INCOMPATIBLE_WITH_SIGNAL_DECODER_TYPE"
  | "SIGNAL_NOT_IN_MODEL"
  | "CAN_SIGNAL_INFO_IS_NULL"
  | "OBD_SIGNAL_INFO_IS_NULL"
  | "NO_DECODER_INFO_FOR_SIGNAL_IN_MODEL"
  | "MESSAGE_SIGNAL_INFO_IS_NULL"
  | "SIGNAL_DECODER_TYPE_INCOMPATIBLE_WITH_MESSAGE_SIGNAL_TYPE"
  | "STRUCT_SIZE_MISMATCH"
  | "NO_SIGNAL_IN_CATALOG_FOR_DECODER_SIGNAL"
  | "SIGNAL_DECODER_INCOMPATIBLE_WITH_SIGNAL_CATALOG"
  | "EMPTY_MESSAGE_SIGNAL"
  | "CUSTOM_DECODING_SIGNAL_INFO_IS_NULL"
  | (string & {});
export const SignalDecoderFailureReason = S.String;

export interface InvalidSignalDecoder {
  name?: string;
  reason?: SignalDecoderFailureReason;
  hint?: string;
}
export const InvalidSignalDecoder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    reason: S.optional(SignalDecoderFailureReason),
    hint: S.optional(S.String),
  }),
).annotate({
  identifier: "InvalidSignalDecoder",
}) as any as S.Schema<InvalidSignalDecoder>;
export type InvalidSignalDecoders = InvalidSignalDecoder[];
export const InvalidSignalDecoders =
  /*@__PURE__*/ S.Array(InvalidSignalDecoder);
export type NetworkInterfaceFailureReason =
  | "DUPLICATE_NETWORK_INTERFACE"
  | "CONFLICTING_NETWORK_INTERFACE"
  | "NETWORK_INTERFACE_TO_ADD_ALREADY_EXISTS"
  | "CAN_NETWORK_INTERFACE_INFO_IS_NULL"
  | "OBD_NETWORK_INTERFACE_INFO_IS_NULL"
  | "NETWORK_INTERFACE_TO_REMOVE_ASSOCIATED_WITH_SIGNALS"
  | "VEHICLE_MIDDLEWARE_NETWORK_INTERFACE_INFO_IS_NULL"
  | "CUSTOM_DECODING_SIGNAL_NETWORK_INTERFACE_INFO_IS_NULL"
  | (string & {});
export const NetworkInterfaceFailureReason = S.String;

export interface InvalidNetworkInterface {
  interfaceId?: string;
  reason?: NetworkInterfaceFailureReason;
}
export const InvalidNetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interfaceId: S.optional(S.String),
    reason: S.optional(NetworkInterfaceFailureReason),
  }),
).annotate({
  identifier: "InvalidNetworkInterface",
}) as any as S.Schema<InvalidNetworkInterface>;
export type InvalidNetworkInterfaces = InvalidNetworkInterface[];
export const InvalidNetworkInterfaces = /*@__PURE__*/ S.Array(
  InvalidNetworkInterface,
);
export interface InvalidSignal {
  name?: string;
  reason?: string;
}
export const InvalidSignal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), reason: S.optional(S.String) }),
).annotate({ identifier: "InvalidSignal" }) as any as S.Schema<InvalidSignal>;
export type InvalidSignals = InvalidSignal[];
export const InvalidSignals = /*@__PURE__*/ S.Array(InvalidSignal);
export type AssociateVehicleFleetError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds, or associates, a vehicle with a fleet.
 */
export const associateVehicleFleet: API.OperationMethod<
  AssociateVehicleFleetRequest,
  AssociateVehicleFleetResponse,
  AssociateVehicleFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateVehicleFleetRequest,
  output: AssociateVehicleFleetResponse,
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
  operationName: "AssociateVehicleFleet",
}));

export type BatchCreateVehicleError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group, or batch, of vehicles.
 *
 * You must specify a decoder manifest and a vehicle model (model manifest) for each
 * vehicle.
 *
 * For more information, see Create multiple
 * vehicles (AWS CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const batchCreateVehicle: API.OperationMethod<
  BatchCreateVehicleRequest,
  BatchCreateVehicleResponse,
  BatchCreateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateVehicleRequest,
  output: BatchCreateVehicleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateVehicle",
}));

export type BatchUpdateVehicleError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a group, or batch, of vehicles.
 *
 * You must specify a decoder manifest and a vehicle model (model manifest) for each
 * vehicle.
 *
 * For more information, see Update multiple
 * vehicles (AWS CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const batchUpdateVehicle: API.OperationMethod<
  BatchUpdateVehicleRequest,
  BatchUpdateVehicleResponse,
  BatchUpdateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateVehicleRequest,
  output: BatchUpdateVehicleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateVehicle",
}));

export type CreateCampaignError =
  | AccessDeniedException
  | ConflictException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an orchestration of data collection rules. The Amazon Web Services IoT FleetWise Edge Agent software
 * running in vehicles uses campaigns to decide how to collect and transfer data to the
 * cloud. You create campaigns in the cloud. After you or your team approve campaigns,
 * Amazon Web Services IoT FleetWise automatically deploys them to vehicles.
 *
 * For more information, see Collect and transfer data
 * with campaigns in the *Amazon Web Services IoT FleetWise Developer Guide*.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCampaignRequest,
  output: CreateCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
}));

export type CreateDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | DecoderManifestValidationException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the decoder manifest associated with a model manifest. To create a decoder
 * manifest, the following must be true:
 *
 * - Every signal decoder has a unique name.
 *
 * - Each signal decoder is associated with a network interface.
 *
 * - Each network interface has a unique ID.
 *
 * - The signal decoders are specified in the model manifest.
 */
export const createDecoderManifest: API.OperationMethod<
  CreateDecoderManifestRequest,
  CreateDecoderManifestResponse,
  CreateDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDecoderManifestRequest,
  output: CreateDecoderManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecoderManifestValidationException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDecoderManifest",
}));

export type CreateFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a fleet that represents a group of vehicles.
 *
 * You must create both a signal catalog and vehicles before you can create a fleet.
 *
 * For more information, see Fleets in the
 * *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createFleet: API.OperationMethod<
  CreateFleetRequest,
  CreateFleetResponse,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetRequest,
  output: CreateFleetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
}));

export type CreateModelManifestError =
  | AccessDeniedException
  | ConflictException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a vehicle model (model manifest) that specifies signals (attributes,
 * branches, sensors, and actuators).
 *
 * For more information, see Vehicle models
 * in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createModelManifest: API.OperationMethod<
  CreateModelManifestRequest,
  CreateModelManifestResponse,
  CreateModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateModelManifestRequest,
  output: CreateModelManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelManifest",
}));

export type CreateSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InvalidNodeException
  | InvalidSignalsException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a collection of standardized signals that can be reused to create vehicle
 * models.
 */
export const createSignalCatalog: API.OperationMethod<
  CreateSignalCatalogRequest,
  CreateSignalCatalogResponse,
  CreateSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSignalCatalogRequest,
  output: CreateSignalCatalogResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidNodeException,
    InvalidSignalsException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSignalCatalog",
}));

export type CreateStateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a state template. State templates contain state properties, which are signals that belong to a signal catalog that is synchronized between the Amazon Web Services IoT FleetWise Edge and the Amazon Web Services Cloud.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createStateTemplate: API.OperationMethod<
  CreateStateTemplateRequest,
  CreateStateTemplateResponse,
  CreateStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStateTemplateRequest,
  output: CreateStateTemplateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStateTemplate",
}));

export type CreateVehicleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a vehicle, which is an instance of a vehicle model (model manifest). Vehicles
 * created from the same vehicle model consist of the same signals inherited from the
 * vehicle model.
 *
 * If you have an existing Amazon Web Services IoT thing, you can use Amazon Web Services IoT FleetWise to create a
 * vehicle and collect data from your thing.
 *
 * For more information, see Create a vehicle
 * (AWS CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const createVehicle: API.OperationMethod<
  CreateVehicleRequest,
  CreateVehicleResponse,
  CreateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVehicleRequest,
  output: CreateVehicleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVehicle",
}));

export type DeleteCampaignError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data collection campaign. Deleting a campaign suspends all data collection
 * and removes it from any vehicles.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignRequest,
  output: DeleteCampaignResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

export type DeleteDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a decoder manifest. You can't delete a decoder manifest if it has vehicles
 * associated with it.
 */
export const deleteDecoderManifest: API.OperationMethod<
  DeleteDecoderManifestRequest,
  DeleteDecoderManifestResponse,
  DeleteDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDecoderManifestRequest,
  output: DeleteDecoderManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDecoderManifest",
}));

export type DeleteFleetError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a fleet. Before you delete a fleet, all vehicles must be
 * dissociated from the fleet. For more information, see Delete a fleet (AWS
 * CLI) in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetRequest,
  DeleteFleetResponse,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetRequest,
  output: DeleteFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
}));

export type DeleteModelManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a vehicle model (model manifest).
 */
export const deleteModelManifest: API.OperationMethod<
  DeleteModelManifestRequest,
  DeleteModelManifestResponse,
  DeleteModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteModelManifestRequest,
  output: DeleteModelManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelManifest",
}));

export type DeleteSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a signal catalog.
 */
export const deleteSignalCatalog: API.OperationMethod<
  DeleteSignalCatalogRequest,
  DeleteSignalCatalogResponse,
  DeleteSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSignalCatalogRequest,
  output: DeleteSignalCatalogResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSignalCatalog",
}));

export type DeleteStateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a state template.
 */
export const deleteStateTemplate: API.OperationMethod<
  DeleteStateTemplateRequest,
  DeleteStateTemplateResponse,
  DeleteStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStateTemplateRequest,
  output: DeleteStateTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStateTemplate",
}));

export type DeleteVehicleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a vehicle and removes it from any campaigns.
 */
export const deleteVehicle: API.OperationMethod<
  DeleteVehicleRequest,
  DeleteVehicleResponse,
  DeleteVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVehicleRequest,
  output: DeleteVehicleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVehicle",
}));

export type DisassociateVehicleFleetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes, or disassociates, a vehicle from a fleet. Disassociating a vehicle from a
 * fleet doesn't delete the vehicle.
 */
export const disassociateVehicleFleet: API.OperationMethod<
  DisassociateVehicleFleetRequest,
  DisassociateVehicleFleetResponse,
  DisassociateVehicleFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateVehicleFleetRequest,
  output: DisassociateVehicleFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateVehicleFleet",
}));

export type GetCampaignError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a campaign.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const getCampaign: API.OperationMethod<
  GetCampaignRequest,
  GetCampaignResponse,
  GetCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignRequest,
  output: GetCampaignResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaign",
}));

export type GetDecoderManifestError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a created decoder manifest.
 */
export const getDecoderManifest: API.OperationMethod<
  GetDecoderManifestRequest,
  GetDecoderManifestResponse,
  GetDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDecoderManifestRequest,
  output: GetDecoderManifestResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDecoderManifest",
}));

export type GetEncryptionConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the encryption configuration for resources and data in Amazon Web Services IoT FleetWise.
 */
export const getEncryptionConfiguration: API.OperationMethod<
  GetEncryptionConfigurationRequest,
  GetEncryptionConfigurationResponse,
  GetEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEncryptionConfigurationRequest,
  output: GetEncryptionConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncryptionConfiguration",
}));

export type GetFleetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a fleet.
 */
export const getFleet: API.OperationMethod<
  GetFleetRequest,
  GetFleetResponse,
  GetFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFleetRequest,
  output: GetFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFleet",
}));

export type GetLoggingOptionsError =
  | AccessDeniedException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the logging options.
 */
export const getLoggingOptions: API.OperationMethod<
  GetLoggingOptionsRequest,
  GetLoggingOptionsResponse,
  GetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoggingOptionsRequest,
  output: GetLoggingOptionsResponse,
  errors: [AccessDeniedException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingOptions",
}));

export type GetModelManifestError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a vehicle model (model manifest).
 */
export const getModelManifest: API.OperationMethod<
  GetModelManifestRequest,
  GetModelManifestResponse,
  GetModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetModelManifestRequest,
  output: GetModelManifestResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelManifest",
}));

export type GetRegisterAccountStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the status of registering your Amazon Web Services account, IAM, and
 * Amazon Timestream resources so that Amazon Web Services IoT FleetWise can transfer your vehicle data to the Amazon Web Services
 * Cloud.
 *
 * For more information, including step-by-step procedures, see Setting up Amazon Web Services IoT FleetWise.
 *
 * This API operation doesn't require input parameters.
 */
export const getRegisterAccountStatus: API.OperationMethod<
  GetRegisterAccountStatusRequest,
  GetRegisterAccountStatusResponse,
  GetRegisterAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegisterAccountStatusRequest,
  output: GetRegisterAccountStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegisterAccountStatus",
}));

export type GetSignalCatalogError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a signal catalog.
 */
export const getSignalCatalog: API.OperationMethod<
  GetSignalCatalogRequest,
  GetSignalCatalogResponse,
  GetSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSignalCatalogRequest,
  output: GetSignalCatalogResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalCatalog",
}));

export type GetStateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a state template.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const getStateTemplate: API.OperationMethod<
  GetStateTemplateRequest,
  GetStateTemplateResponse,
  GetStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStateTemplateRequest,
  output: GetStateTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStateTemplate",
}));

export type GetVehicleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a vehicle.
 */
export const getVehicle: API.OperationMethod<
  GetVehicleRequest,
  GetVehicleResponse,
  GetVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVehicleRequest,
  output: GetVehicleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVehicle",
}));

export type GetVehicleStatusError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the status of campaigns, decoder manifests, or state templates
 * associated with a vehicle.
 */
export const getVehicleStatus: API.PaginatedOperationMethod<
  GetVehicleStatusRequest,
  GetVehicleStatusResponse,
  GetVehicleStatusError,
  Credentials | HttpClient.HttpClient,
  VehicleStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetVehicleStatusRequest,
  output: GetVehicleStatusResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVehicleStatus",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaigns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ImportDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | DecoderManifestValidationException
  | InvalidSignalsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a decoder manifest using your existing CAN DBC file from your local device.
 *
 * The CAN signal name must be unique and not repeated across CAN message definitions in a .dbc file.
 */
export const importDecoderManifest: API.OperationMethod<
  ImportDecoderManifestRequest,
  ImportDecoderManifestResponse,
  ImportDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportDecoderManifestRequest,
  output: ImportDecoderManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecoderManifestValidationException,
    InvalidSignalsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDecoderManifest",
}));

export type ImportSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a signal catalog using your existing VSS formatted content from your local
 * device.
 */
export const importSignalCatalog: API.OperationMethod<
  ImportSignalCatalogRequest,
  ImportSignalCatalogResponse,
  ImportSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportSignalCatalogRequest,
  output: ImportSignalCatalogResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportSignalCatalog",
}));

export type ListCampaignsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about created campaigns.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCampaignsRequest,
  output: ListCampaignsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaignSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDecoderManifestNetworkInterfacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the network interfaces specified in a decoder manifest.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listDecoderManifestNetworkInterfaces: API.PaginatedOperationMethod<
  ListDecoderManifestNetworkInterfacesRequest,
  ListDecoderManifestNetworkInterfacesResponse,
  ListDecoderManifestNetworkInterfacesError,
  Credentials | HttpClient.HttpClient,
  NetworkInterface
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDecoderManifestNetworkInterfacesRequest,
  output: ListDecoderManifestNetworkInterfacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDecoderManifestNetworkInterfaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkInterfaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDecoderManifestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists decoder manifests.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listDecoderManifests: API.PaginatedOperationMethod<
  ListDecoderManifestsRequest,
  ListDecoderManifestsResponse,
  ListDecoderManifestsError,
  Credentials | HttpClient.HttpClient,
  DecoderManifestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDecoderManifestsRequest,
  output: ListDecoderManifestsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDecoderManifests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDecoderManifestSignalsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of information about signal decoders specified in a decoder manifest.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listDecoderManifestSignals: API.PaginatedOperationMethod<
  ListDecoderManifestSignalsRequest,
  ListDecoderManifestSignalsResponse,
  ListDecoderManifestSignalsError,
  Credentials | HttpClient.HttpClient,
  SignalDecoder
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDecoderManifestSignalsRequest,
  output: ListDecoderManifestSignalsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDecoderManifestSignals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "signalDecoders",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information for each created fleet in an Amazon Web Services account.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listFleets: API.PaginatedOperationMethod<
  ListFleetsRequest,
  ListFleetsResponse,
  ListFleetsError,
  Credentials | HttpClient.HttpClient,
  FleetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetsRequest,
  output: ListFleetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFleetsForVehicleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of IDs for all fleets that the vehicle is associated with.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listFleetsForVehicle: API.PaginatedOperationMethod<
  ListFleetsForVehicleRequest,
  ListFleetsForVehicleResponse,
  ListFleetsForVehicleError,
  Credentials | HttpClient.HttpClient,
  FleetId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetsForVehicleRequest,
  output: ListFleetsForVehicleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetsForVehicle",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelManifestNodesError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about nodes specified in a vehicle model (model manifest).
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listModelManifestNodes: API.PaginatedOperationMethod<
  ListModelManifestNodesRequest,
  ListModelManifestNodesResponse,
  ListModelManifestNodesError,
  Credentials | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelManifestNodesRequest,
  output: ListModelManifestNodesResponse,
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
  operationName: "ListModelManifestNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelManifestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of vehicle models (model manifests).
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listModelManifests: API.PaginatedOperationMethod<
  ListModelManifestsRequest,
  ListModelManifestsResponse,
  ListModelManifestsError,
  Credentials | HttpClient.HttpClient,
  ModelManifestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListModelManifestsRequest,
  output: ListModelManifestsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelManifests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSignalCatalogNodesError =
  | AccessDeniedException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists of information about the signals (nodes) specified in a signal catalog.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listSignalCatalogNodes: API.PaginatedOperationMethod<
  ListSignalCatalogNodesRequest,
  ListSignalCatalogNodesResponse,
  ListSignalCatalogNodesError,
  Credentials | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSignalCatalogNodesRequest,
  output: ListSignalCatalogNodesResponse,
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
  operationName: "ListSignalCatalogNodes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSignalCatalogsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the created signal catalogs in an Amazon Web Services account.
 *
 * You can use to list information about
 * each signal (node) specified in a signal catalog.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listSignalCatalogs: API.PaginatedOperationMethod<
  ListSignalCatalogsRequest,
  ListSignalCatalogsResponse,
  ListSignalCatalogsError,
  Credentials | HttpClient.HttpClient,
  SignalCatalogSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSignalCatalogsRequest,
  output: ListSignalCatalogsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalCatalogs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStateTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about created state templates.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const listStateTemplates: API.PaginatedOperationMethod<
  ListStateTemplatesRequest,
  ListStateTemplatesResponse,
  ListStateTemplatesError,
  Credentials | HttpClient.HttpClient,
  StateTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStateTemplatesRequest,
  output: ListStateTemplatesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStateTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
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
 * Lists the tags (metadata) you have assigned to the resource.
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
}));

export type ListVehiclesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of summaries of created vehicles.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listVehicles: API.PaginatedOperationMethod<
  ListVehiclesRequest,
  ListVehiclesResponse,
  ListVehiclesError,
  Credentials | HttpClient.HttpClient,
  VehicleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVehiclesRequest,
  output: ListVehiclesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVehicles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vehicleSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVehiclesInFleetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of summaries of all vehicles associated with a fleet.
 *
 * This API operation uses pagination. Specify the `nextToken` parameter in the request to return more results.
 */
export const listVehiclesInFleet: API.PaginatedOperationMethod<
  ListVehiclesInFleetRequest,
  ListVehiclesInFleetResponse,
  ListVehiclesInFleetError,
  Credentials | HttpClient.HttpClient,
  VehicleName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVehiclesInFleetRequest,
  output: ListVehiclesInFleetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVehiclesInFleet",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vehicles",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutEncryptionConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the encryption configuration. Amazon Web Services IoT FleetWise can encrypt your data and
 * resources using an Amazon Web Services managed key. Or, you can use a KMS key that you own and
 * manage. For more information, see Data
 * encryption in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const putEncryptionConfiguration: API.OperationMethod<
  PutEncryptionConfigurationRequest,
  PutEncryptionConfigurationResponse,
  PutEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEncryptionConfigurationRequest,
  output: PutEncryptionConfigurationResponse,
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
  operationName: "PutEncryptionConfiguration",
}));

export type PutLoggingOptionsError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the logging option.
 */
export const putLoggingOptions: API.OperationMethod<
  PutLoggingOptionsRequest,
  PutLoggingOptionsResponse,
  PutLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLoggingOptionsRequest,
  output: PutLoggingOptionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingOptions",
}));

export type RegisterAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API operation contains deprecated parameters. Register your account again
 * without the Timestream resources parameter so that Amazon Web Services IoT FleetWise can remove the Timestream
 * metadata stored. You should then pass the data destination into the CreateCampaign API operation.
 *
 * You must delete any existing campaigns that include an empty data destination
 * before you register your account again. For more information, see the DeleteCampaign API operation.
 *
 * If you want to delete the Timestream inline policy from the service-linked role, such
 * as to mitigate an overly permissive policy, you must first delete any existing
 * campaigns. Then delete the service-linked role and register your account again to
 * enable CloudWatch metrics. For more information, see DeleteServiceLinkedRole in the Identity and Access Management API
 * Reference.
 *
 * Registers your Amazon Web Services account, IAM, and Amazon Timestream resources so Amazon Web Services IoT FleetWise can
 * transfer your vehicle data to the Amazon Web Services Cloud. For more information, including
 * step-by-step procedures, see Setting up
 * Amazon Web Services IoT FleetWise.
 *
 * An Amazon Web Services account is **not** the same thing as a
 * "user." An Amazon Web Services user is an identity that you create using Identity and Access Management (IAM) and
 * takes the form of either an IAM user or an IAM role, both
 * with credentials. A single Amazon Web Services account can, and typically does,
 * contain many users and roles.
 */
export const registerAccount: API.OperationMethod<
  RegisterAccountRequest,
  RegisterAccountResponse,
  RegisterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterAccountRequest,
  output: RegisterAccountResponse,
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
  operationName: "RegisterAccount",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata which can be
 * used to manage a resource.
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
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the given tags (metadata) from the resource.
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
}));

export type UpdateCampaignError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a campaign.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignRequest,
  output: UpdateCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
}));

export type UpdateDecoderManifestError =
  | AccessDeniedException
  | ConflictException
  | DecoderManifestValidationException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a decoder manifest.
 *
 * A decoder manifest can only be updated when the status is `DRAFT`. Only
 * `ACTIVE` decoder manifests can be associated with vehicles.
 */
export const updateDecoderManifest: API.OperationMethod<
  UpdateDecoderManifestRequest,
  UpdateDecoderManifestResponse,
  UpdateDecoderManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDecoderManifestRequest,
  output: UpdateDecoderManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DecoderManifestValidationException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDecoderManifest",
}));

export type UpdateFleetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description of an existing fleet.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResponse,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetRequest,
  output: UpdateFleetResponse,
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
  operationName: "UpdateFleet",
}));

export type UpdateModelManifestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidSignalsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a vehicle model (model manifest). If created vehicles are associated with a
 * vehicle model, it can't be updated.
 */
export const updateModelManifest: API.OperationMethod<
  UpdateModelManifestRequest,
  UpdateModelManifestResponse,
  UpdateModelManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateModelManifestRequest,
  output: UpdateModelManifestResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidSignalsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateModelManifest",
}));

export type UpdateSignalCatalogError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidNodeException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a signal catalog.
 */
export const updateSignalCatalog: API.OperationMethod<
  UpdateSignalCatalogRequest,
  UpdateSignalCatalogResponse,
  UpdateSignalCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSignalCatalogRequest,
  output: UpdateSignalCatalogResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidNodeException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSignalCatalog",
}));

export type UpdateStateTemplateError =
  | AccessDeniedException
  | InternalServerException
  | InvalidSignalsException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a state template.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const updateStateTemplate: API.OperationMethod<
  UpdateStateTemplateRequest,
  UpdateStateTemplateResponse,
  UpdateStateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStateTemplateRequest,
  output: UpdateStateTemplateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidSignalsException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStateTemplate",
}));

export type UpdateVehicleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a vehicle.
 *
 * Access to certain Amazon Web Services IoT FleetWise features is currently gated. For more information, see Amazon Web Services Region and feature availability in the *Amazon Web Services IoT FleetWise Developer Guide*.
 */
export const updateVehicle: API.OperationMethod<
  UpdateVehicleRequest,
  UpdateVehicleResponse,
  UpdateVehicleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVehicleRequest,
  output: UpdateVehicleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVehicle",
}));
