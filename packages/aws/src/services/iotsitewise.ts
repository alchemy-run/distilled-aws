import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "IoTSiteWise",
  serviceShapeName: "AWSIoTSiteWise",
});
const auth = T.AwsAuthSigv4({ name: "iotsitewise" });
const ver = T.ServiceVersion("2019-12-02");
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
              `https://iotsitewise-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://iotsitewise-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iotsitewise.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://iotsitewise.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictingOperationException
  extends /*@__PURE__*/ S.TaggedError<ConflictingOperationException>()(
    "ConflictingOperationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceArn: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceArn: S.String,
    },
    T.HttpError(412),
  ) {}
export class QueryTimeoutException
  extends /*@__PURE__*/ S.TaggedError<QueryTimeoutException>()(
    "QueryTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceArn: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CustomID = string;
export type ClientToken = string;
export interface AssociateAssetsRequest {
  assetId: string;
  hierarchyId: string;
  childAssetId: string;
  clientToken?: string;
}
export const AssociateAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    hierarchyId: S.String,
    childAssetId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assets/{assetId}/associate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateAssetsRequest",
}) as any as S.Schema<AssociateAssetsRequest>;
export interface AssociateAssetsResponse {}
export const AssociateAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateAssetsResponse",
}) as any as S.Schema<AssociateAssetsResponse>;
export type PropertyAlias = string;
export interface AssociateTimeSeriesToAssetPropertyRequest {
  alias: string;
  assetId: string;
  propertyId: string;
  clientToken?: string;
}
export const AssociateTimeSeriesToAssetPropertyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      alias: S.String.pipe(T.HttpQuery("alias")),
      assetId: S.String.pipe(T.HttpQuery("assetId")),
      propertyId: S.String.pipe(T.HttpQuery("propertyId")),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/timeseries/associate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AssociateTimeSeriesToAssetPropertyRequest",
  }) as any as S.Schema<AssociateTimeSeriesToAssetPropertyRequest>;
export interface AssociateTimeSeriesToAssetPropertyResponse {}
export const AssociateTimeSeriesToAssetPropertyResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "AssociateTimeSeriesToAssetPropertyResponse",
  }) as any as S.Schema<AssociateTimeSeriesToAssetPropertyResponse>;
export type ID = string;
export type IDs = string[];
export const IDs = /*@__PURE__*/ S.Array(S.String);
export interface BatchAssociateProjectAssetsRequest {
  projectId: string;
  assetIds: string[];
  clientToken?: string;
}
export const BatchAssociateProjectAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String.pipe(T.HttpLabel("projectId")),
    assetIds: IDs,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/projects/{projectId}/assets/associate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchAssociateProjectAssetsRequest",
}) as any as S.Schema<BatchAssociateProjectAssetsRequest>;
export type AssetErrorCode = "INTERNAL_FAILURE" | (string & {});
export const AssetErrorCode = /*@__PURE__*/ S.String;

export type AssetErrorMessage = string;
export interface AssetErrorDetails {
  assetId: string;
  code: AssetErrorCode;
  message: string;
}
export const AssetErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, code: AssetErrorCode, message: S.String }),
).annotate({
  identifier: "AssetErrorDetails",
}) as any as S.Schema<AssetErrorDetails>;
export type BatchAssociateProjectAssetsErrors = AssetErrorDetails[];
export const BatchAssociateProjectAssetsErrors =
  /*@__PURE__*/ S.Array(AssetErrorDetails);
export interface BatchAssociateProjectAssetsResponse {
  errors?: AssetErrorDetails[];
}
export const BatchAssociateProjectAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(BatchAssociateProjectAssetsErrors) }),
).annotate({
  identifier: "BatchAssociateProjectAssetsResponse",
}) as any as S.Schema<BatchAssociateProjectAssetsResponse>;
export interface BatchDisassociateProjectAssetsRequest {
  projectId: string;
  assetIds: string[];
  clientToken?: string;
}
export const BatchDisassociateProjectAssetsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      projectId: S.String.pipe(T.HttpLabel("projectId")),
      assetIds: IDs,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/projects/{projectId}/assets/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDisassociateProjectAssetsRequest",
}) as any as S.Schema<BatchDisassociateProjectAssetsRequest>;
export type BatchDisassociateProjectAssetsErrors = AssetErrorDetails[];
export const BatchDisassociateProjectAssetsErrors =
  /*@__PURE__*/ S.Array(AssetErrorDetails);
export interface BatchDisassociateProjectAssetsResponse {
  errors?: AssetErrorDetails[];
}
export const BatchDisassociateProjectAssetsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ errors: S.optional(BatchDisassociateProjectAssetsErrors) }),
).annotate({
  identifier: "BatchDisassociateProjectAssetsResponse",
}) as any as S.Schema<BatchDisassociateProjectAssetsResponse>;
export type EntryId = string;
export type AssetPropertyAlias = string;
export type AggregateType =
  | "AVERAGE"
  | "COUNT"
  | "MAXIMUM"
  | "MINIMUM"
  | "SUM"
  | "STANDARD_DEVIATION"
  | (string & {});
export const AggregateType = /*@__PURE__*/ S.String;

export type AggregateTypes = AggregateType[];
export const AggregateTypes = /*@__PURE__*/ S.Array(AggregateType);
export type Resolution = string;
export type Quality = "GOOD" | "BAD" | "UNCERTAIN" | (string & {});
export const Quality = /*@__PURE__*/ S.String;

export type Qualities = Quality[];
export const Qualities = /*@__PURE__*/ S.Array(Quality);
export type TimeOrdering = "ASCENDING" | "DESCENDING" | (string & {});
export const TimeOrdering = /*@__PURE__*/ S.String;

export interface BatchGetAssetPropertyAggregatesEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  aggregateTypes: AggregateType[];
  resolution: string;
  startDate: Date;
  endDate: Date;
  qualities?: Quality[];
  timeOrdering?: TimeOrdering;
}
export const BatchGetAssetPropertyAggregatesEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      entryId: S.String,
      assetId: S.optional(S.String),
      propertyId: S.optional(S.String),
      propertyAlias: S.optional(S.String),
      aggregateTypes: AggregateTypes,
      resolution: S.String,
      startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      qualities: S.optional(Qualities),
      timeOrdering: S.optional(TimeOrdering),
    }),
).annotate({
  identifier: "BatchGetAssetPropertyAggregatesEntry",
}) as any as S.Schema<BatchGetAssetPropertyAggregatesEntry>;
export type BatchGetAssetPropertyAggregatesEntries =
  BatchGetAssetPropertyAggregatesEntry[];
export const BatchGetAssetPropertyAggregatesEntries = /*@__PURE__*/ S.Array(
  BatchGetAssetPropertyAggregatesEntry,
);
export type NextToken = string;
export type BatchGetAssetPropertyAggregatesMaxResults = number;
export interface BatchGetAssetPropertyAggregatesRequest {
  entries: BatchGetAssetPropertyAggregatesEntry[];
  nextToken?: string;
  maxResults?: number;
}
export const BatchGetAssetPropertyAggregatesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      entries: BatchGetAssetPropertyAggregatesEntries,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/properties/batch/aggregates" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchGetAssetPropertyAggregatesRequest",
}) as any as S.Schema<BatchGetAssetPropertyAggregatesRequest>;
export type BatchGetAssetPropertyAggregatesErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "AccessDeniedException"
  | (string & {});
export const BatchGetAssetPropertyAggregatesErrorCode = /*@__PURE__*/ S.String;

export type ErrorMessage = string;
export interface BatchGetAssetPropertyAggregatesErrorEntry {
  errorCode: BatchGetAssetPropertyAggregatesErrorCode;
  errorMessage: string;
  entryId: string;
}
export const BatchGetAssetPropertyAggregatesErrorEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errorCode: BatchGetAssetPropertyAggregatesErrorCode,
      errorMessage: S.String,
      entryId: S.String,
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyAggregatesErrorEntry",
  }) as any as S.Schema<BatchGetAssetPropertyAggregatesErrorEntry>;
export type BatchGetAssetPropertyAggregatesErrorEntries =
  BatchGetAssetPropertyAggregatesErrorEntry[];
export const BatchGetAssetPropertyAggregatesErrorEntries =
  /*@__PURE__*/ S.Array(BatchGetAssetPropertyAggregatesErrorEntry);
export type AggregatedDoubleValue = number;
export interface Aggregates {
  average?: number;
  count?: number;
  maximum?: number;
  minimum?: number;
  sum?: number;
  standardDeviation?: number;
}
export const Aggregates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    average: S.optional(S.Number),
    count: S.optional(S.Number),
    maximum: S.optional(S.Number),
    minimum: S.optional(S.Number),
    sum: S.optional(S.Number),
    standardDeviation: S.optional(S.Number),
  }),
).annotate({ identifier: "Aggregates" }) as any as S.Schema<Aggregates>;
export interface AggregatedValue {
  timestamp: Date;
  quality?: Quality;
  value: Aggregates;
}
export const AggregatedValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    quality: S.optional(Quality),
    value: Aggregates,
  }),
).annotate({
  identifier: "AggregatedValue",
}) as any as S.Schema<AggregatedValue>;
export type AggregatedValues = AggregatedValue[];
export const AggregatedValues = /*@__PURE__*/ S.Array(AggregatedValue);
export interface BatchGetAssetPropertyAggregatesSuccessEntry {
  entryId: string;
  aggregatedValues: AggregatedValue[];
}
export const BatchGetAssetPropertyAggregatesSuccessEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ entryId: S.String, aggregatedValues: AggregatedValues }),
  ).annotate({
    identifier: "BatchGetAssetPropertyAggregatesSuccessEntry",
  }) as any as S.Schema<BatchGetAssetPropertyAggregatesSuccessEntry>;
export type BatchGetAssetPropertyAggregatesSuccessEntries =
  BatchGetAssetPropertyAggregatesSuccessEntry[];
export const BatchGetAssetPropertyAggregatesSuccessEntries =
  /*@__PURE__*/ S.Array(BatchGetAssetPropertyAggregatesSuccessEntry);
export type BatchEntryCompletionStatus = "SUCCESS" | "ERROR" | (string & {});
export const BatchEntryCompletionStatus = /*@__PURE__*/ S.String;

export interface BatchGetAssetPropertyAggregatesErrorInfo {
  errorCode: BatchGetAssetPropertyAggregatesErrorCode;
  errorTimestamp: Date;
}
export const BatchGetAssetPropertyAggregatesErrorInfo = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      errorCode: BatchGetAssetPropertyAggregatesErrorCode,
      errorTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "BatchGetAssetPropertyAggregatesErrorInfo",
}) as any as S.Schema<BatchGetAssetPropertyAggregatesErrorInfo>;
export interface BatchGetAssetPropertyAggregatesSkippedEntry {
  entryId: string;
  completionStatus: BatchEntryCompletionStatus;
  errorInfo?: BatchGetAssetPropertyAggregatesErrorInfo;
}
export const BatchGetAssetPropertyAggregatesSkippedEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      entryId: S.String,
      completionStatus: BatchEntryCompletionStatus,
      errorInfo: S.optional(BatchGetAssetPropertyAggregatesErrorInfo),
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyAggregatesSkippedEntry",
  }) as any as S.Schema<BatchGetAssetPropertyAggregatesSkippedEntry>;
export type BatchGetAssetPropertyAggregatesSkippedEntries =
  BatchGetAssetPropertyAggregatesSkippedEntry[];
export const BatchGetAssetPropertyAggregatesSkippedEntries =
  /*@__PURE__*/ S.Array(BatchGetAssetPropertyAggregatesSkippedEntry);
export interface BatchGetAssetPropertyAggregatesResponse {
  errorEntries: BatchGetAssetPropertyAggregatesErrorEntry[];
  successEntries: BatchGetAssetPropertyAggregatesSuccessEntry[];
  skippedEntries: BatchGetAssetPropertyAggregatesSkippedEntry[];
  nextToken?: string;
}
export const BatchGetAssetPropertyAggregatesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      errorEntries: BatchGetAssetPropertyAggregatesErrorEntries,
      successEntries: BatchGetAssetPropertyAggregatesSuccessEntries,
      skippedEntries: BatchGetAssetPropertyAggregatesSkippedEntries,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "BatchGetAssetPropertyAggregatesResponse",
}) as any as S.Schema<BatchGetAssetPropertyAggregatesResponse>;
export interface BatchGetAssetPropertyValueEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
}
export const BatchGetAssetPropertyValueEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryId: S.String,
    assetId: S.optional(S.String),
    propertyId: S.optional(S.String),
    propertyAlias: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetAssetPropertyValueEntry",
}) as any as S.Schema<BatchGetAssetPropertyValueEntry>;
export type BatchGetAssetPropertyValueEntries =
  BatchGetAssetPropertyValueEntry[];
export const BatchGetAssetPropertyValueEntries = /*@__PURE__*/ S.Array(
  BatchGetAssetPropertyValueEntry,
);
export interface BatchGetAssetPropertyValueRequest {
  entries: BatchGetAssetPropertyValueEntry[];
  nextToken?: string;
}
export const BatchGetAssetPropertyValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entries: BatchGetAssetPropertyValueEntries,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/properties/batch/latest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetAssetPropertyValueRequest",
}) as any as S.Schema<BatchGetAssetPropertyValueRequest>;
export type BatchGetAssetPropertyValueErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "AccessDeniedException"
  | (string & {});
export const BatchGetAssetPropertyValueErrorCode = /*@__PURE__*/ S.String;

export interface BatchGetAssetPropertyValueErrorEntry {
  errorCode: BatchGetAssetPropertyValueErrorCode;
  errorMessage: string;
  entryId: string;
}
export const BatchGetAssetPropertyValueErrorEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      errorCode: BatchGetAssetPropertyValueErrorCode,
      errorMessage: S.String,
      entryId: S.String,
    }),
).annotate({
  identifier: "BatchGetAssetPropertyValueErrorEntry",
}) as any as S.Schema<BatchGetAssetPropertyValueErrorEntry>;
export type BatchGetAssetPropertyValueErrorEntries =
  BatchGetAssetPropertyValueErrorEntry[];
export const BatchGetAssetPropertyValueErrorEntries = /*@__PURE__*/ S.Array(
  BatchGetAssetPropertyValueErrorEntry,
);
export type PropertyValueStringValue = string;
export type PropertyValueIntegerValue = number;
export type PropertyValueDoubleValue = number;
export type PropertyValueBooleanValue = boolean;
export type RawValueType = "D" | "B" | "S" | "I" | "U" | (string & {});
export const RawValueType = /*@__PURE__*/ S.String;

export interface PropertyValueNullValue {
  valueType: RawValueType;
}
export const PropertyValueNullValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ valueType: RawValueType }),
).annotate({
  identifier: "PropertyValueNullValue",
}) as any as S.Schema<PropertyValueNullValue>;
export interface Variant {
  stringValue?: string;
  integerValue?: number;
  doubleValue?: number;
  booleanValue?: boolean;
  nullValue?: PropertyValueNullValue;
}
export const Variant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stringValue: S.optional(S.String),
    integerValue: S.optional(S.Number),
    doubleValue: S.optional(S.Number),
    booleanValue: S.optional(S.Boolean),
    nullValue: S.optional(PropertyValueNullValue),
  }),
).annotate({ identifier: "Variant" }) as any as S.Schema<Variant>;
export type TimeInSeconds = number;
export type OffsetInNanos = number;
export interface TimeInNanos {
  timeInSeconds: number;
  offsetInNanos?: number;
}
export const TimeInNanos = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timeInSeconds: S.Number, offsetInNanos: S.optional(S.Number) }),
).annotate({ identifier: "TimeInNanos" }) as any as S.Schema<TimeInNanos>;
export interface AssetPropertyValue {
  value: Variant;
  timestamp: TimeInNanos;
  quality?: Quality;
}
export const AssetPropertyValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: Variant,
    timestamp: TimeInNanos,
    quality: S.optional(Quality),
  }),
).annotate({
  identifier: "AssetPropertyValue",
}) as any as S.Schema<AssetPropertyValue>;
export interface BatchGetAssetPropertyValueSuccessEntry {
  entryId: string;
  assetPropertyValue?: AssetPropertyValue;
}
export const BatchGetAssetPropertyValueSuccessEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      entryId: S.String,
      assetPropertyValue: S.optional(AssetPropertyValue),
    }),
).annotate({
  identifier: "BatchGetAssetPropertyValueSuccessEntry",
}) as any as S.Schema<BatchGetAssetPropertyValueSuccessEntry>;
export type BatchGetAssetPropertyValueSuccessEntries =
  BatchGetAssetPropertyValueSuccessEntry[];
export const BatchGetAssetPropertyValueSuccessEntries = /*@__PURE__*/ S.Array(
  BatchGetAssetPropertyValueSuccessEntry,
);
export interface BatchGetAssetPropertyValueErrorInfo {
  errorCode: BatchGetAssetPropertyValueErrorCode;
  errorTimestamp: Date;
}
export const BatchGetAssetPropertyValueErrorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: BatchGetAssetPropertyValueErrorCode,
    errorTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "BatchGetAssetPropertyValueErrorInfo",
}) as any as S.Schema<BatchGetAssetPropertyValueErrorInfo>;
export interface BatchGetAssetPropertyValueSkippedEntry {
  entryId: string;
  completionStatus: BatchEntryCompletionStatus;
  errorInfo?: BatchGetAssetPropertyValueErrorInfo;
}
export const BatchGetAssetPropertyValueSkippedEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      entryId: S.String,
      completionStatus: BatchEntryCompletionStatus,
      errorInfo: S.optional(BatchGetAssetPropertyValueErrorInfo),
    }),
).annotate({
  identifier: "BatchGetAssetPropertyValueSkippedEntry",
}) as any as S.Schema<BatchGetAssetPropertyValueSkippedEntry>;
export type BatchGetAssetPropertyValueSkippedEntries =
  BatchGetAssetPropertyValueSkippedEntry[];
export const BatchGetAssetPropertyValueSkippedEntries = /*@__PURE__*/ S.Array(
  BatchGetAssetPropertyValueSkippedEntry,
);
export interface BatchGetAssetPropertyValueResponse {
  errorEntries: BatchGetAssetPropertyValueErrorEntry[];
  successEntries: BatchGetAssetPropertyValueSuccessEntry[];
  skippedEntries: BatchGetAssetPropertyValueSkippedEntry[];
  nextToken?: string;
}
export const BatchGetAssetPropertyValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorEntries: BatchGetAssetPropertyValueErrorEntries,
    successEntries: BatchGetAssetPropertyValueSuccessEntries,
    skippedEntries: BatchGetAssetPropertyValueSkippedEntries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetAssetPropertyValueResponse",
}) as any as S.Schema<BatchGetAssetPropertyValueResponse>;
export interface BatchGetAssetPropertyValueHistoryEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  startDate?: Date;
  endDate?: Date;
  qualities?: Quality[];
  timeOrdering?: TimeOrdering;
}
export const BatchGetAssetPropertyValueHistoryEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      entryId: S.String,
      assetId: S.optional(S.String),
      propertyId: S.optional(S.String),
      propertyAlias: S.optional(S.String),
      startDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      qualities: S.optional(Qualities),
      timeOrdering: S.optional(TimeOrdering),
    }),
).annotate({
  identifier: "BatchGetAssetPropertyValueHistoryEntry",
}) as any as S.Schema<BatchGetAssetPropertyValueHistoryEntry>;
export type BatchGetAssetPropertyValueHistoryEntries =
  BatchGetAssetPropertyValueHistoryEntry[];
export const BatchGetAssetPropertyValueHistoryEntries = /*@__PURE__*/ S.Array(
  BatchGetAssetPropertyValueHistoryEntry,
);
export type BatchGetAssetPropertyValueHistoryMaxResults = number;
export interface BatchGetAssetPropertyValueHistoryRequest {
  entries: BatchGetAssetPropertyValueHistoryEntry[];
  nextToken?: string;
  maxResults?: number;
}
export const BatchGetAssetPropertyValueHistoryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      entries: BatchGetAssetPropertyValueHistoryEntries,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/properties/batch/history" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchGetAssetPropertyValueHistoryRequest",
}) as any as S.Schema<BatchGetAssetPropertyValueHistoryRequest>;
export type BatchGetAssetPropertyValueHistoryErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "AccessDeniedException"
  | (string & {});
export const BatchGetAssetPropertyValueHistoryErrorCode =
  /*@__PURE__*/ S.String;

export interface BatchGetAssetPropertyValueHistoryErrorEntry {
  errorCode: BatchGetAssetPropertyValueHistoryErrorCode;
  errorMessage: string;
  entryId: string;
}
export const BatchGetAssetPropertyValueHistoryErrorEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errorCode: BatchGetAssetPropertyValueHistoryErrorCode,
      errorMessage: S.String,
      entryId: S.String,
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyValueHistoryErrorEntry",
  }) as any as S.Schema<BatchGetAssetPropertyValueHistoryErrorEntry>;
export type BatchGetAssetPropertyValueHistoryErrorEntries =
  BatchGetAssetPropertyValueHistoryErrorEntry[];
export const BatchGetAssetPropertyValueHistoryErrorEntries =
  /*@__PURE__*/ S.Array(BatchGetAssetPropertyValueHistoryErrorEntry);
export type AssetPropertyValueHistory = AssetPropertyValue[];
export const AssetPropertyValueHistory =
  /*@__PURE__*/ S.Array(AssetPropertyValue);
export interface BatchGetAssetPropertyValueHistorySuccessEntry {
  entryId: string;
  assetPropertyValueHistory: AssetPropertyValue[];
}
export const BatchGetAssetPropertyValueHistorySuccessEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      entryId: S.String,
      assetPropertyValueHistory: AssetPropertyValueHistory,
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyValueHistorySuccessEntry",
  }) as any as S.Schema<BatchGetAssetPropertyValueHistorySuccessEntry>;
export type BatchGetAssetPropertyValueHistorySuccessEntries =
  BatchGetAssetPropertyValueHistorySuccessEntry[];
export const BatchGetAssetPropertyValueHistorySuccessEntries =
  /*@__PURE__*/ S.Array(BatchGetAssetPropertyValueHistorySuccessEntry);
export interface BatchGetAssetPropertyValueHistoryErrorInfo {
  errorCode: BatchGetAssetPropertyValueHistoryErrorCode;
  errorTimestamp: Date;
}
export const BatchGetAssetPropertyValueHistoryErrorInfo =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errorCode: BatchGetAssetPropertyValueHistoryErrorCode,
      errorTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyValueHistoryErrorInfo",
  }) as any as S.Schema<BatchGetAssetPropertyValueHistoryErrorInfo>;
export interface BatchGetAssetPropertyValueHistorySkippedEntry {
  entryId: string;
  completionStatus: BatchEntryCompletionStatus;
  errorInfo?: BatchGetAssetPropertyValueHistoryErrorInfo;
}
export const BatchGetAssetPropertyValueHistorySkippedEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      entryId: S.String,
      completionStatus: BatchEntryCompletionStatus,
      errorInfo: S.optional(BatchGetAssetPropertyValueHistoryErrorInfo),
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyValueHistorySkippedEntry",
  }) as any as S.Schema<BatchGetAssetPropertyValueHistorySkippedEntry>;
export type BatchGetAssetPropertyValueHistorySkippedEntries =
  BatchGetAssetPropertyValueHistorySkippedEntry[];
export const BatchGetAssetPropertyValueHistorySkippedEntries =
  /*@__PURE__*/ S.Array(BatchGetAssetPropertyValueHistorySkippedEntry);
export interface BatchGetAssetPropertyValueHistoryResponse {
  errorEntries: BatchGetAssetPropertyValueHistoryErrorEntry[];
  successEntries: BatchGetAssetPropertyValueHistorySuccessEntry[];
  skippedEntries: BatchGetAssetPropertyValueHistorySkippedEntry[];
  nextToken?: string;
}
export const BatchGetAssetPropertyValueHistoryResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      errorEntries: BatchGetAssetPropertyValueHistoryErrorEntries,
      successEntries: BatchGetAssetPropertyValueHistorySuccessEntries,
      skippedEntries: BatchGetAssetPropertyValueHistorySkippedEntries,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "BatchGetAssetPropertyValueHistoryResponse",
  }) as any as S.Schema<BatchGetAssetPropertyValueHistoryResponse>;
export type AssetPropertyValues = AssetPropertyValue[];
export const AssetPropertyValues = /*@__PURE__*/ S.Array(AssetPropertyValue);
export interface PutAssetPropertyValueEntry {
  entryId: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  propertyValues: AssetPropertyValue[];
}
export const PutAssetPropertyValueEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryId: S.String,
    assetId: S.optional(S.String),
    propertyId: S.optional(S.String),
    propertyAlias: S.optional(S.String),
    propertyValues: AssetPropertyValues,
  }),
).annotate({
  identifier: "PutAssetPropertyValueEntry",
}) as any as S.Schema<PutAssetPropertyValueEntry>;
export type PutAssetPropertyValueEntries = PutAssetPropertyValueEntry[];
export const PutAssetPropertyValueEntries = /*@__PURE__*/ S.Array(
  PutAssetPropertyValueEntry,
);
export interface BatchPutAssetPropertyValueRequest {
  enablePartialEntryProcessing?: boolean;
  entries: PutAssetPropertyValueEntry[];
}
export const BatchPutAssetPropertyValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enablePartialEntryProcessing: S.optional(S.Boolean),
    entries: PutAssetPropertyValueEntries,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/properties" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutAssetPropertyValueRequest",
}) as any as S.Schema<BatchPutAssetPropertyValueRequest>;
export type BatchPutAssetPropertyValueErrorCode =
  | "ResourceNotFoundException"
  | "InvalidRequestException"
  | "InternalFailureException"
  | "ServiceUnavailableException"
  | "ThrottlingException"
  | "LimitExceededException"
  | "ConflictingOperationException"
  | "TimestampOutOfRangeException"
  | "AccessDeniedException"
  | (string & {});
export const BatchPutAssetPropertyValueErrorCode = /*@__PURE__*/ S.String;

export type Timestamps = TimeInNanos[];
export const Timestamps = /*@__PURE__*/ S.Array(TimeInNanos);
export interface BatchPutAssetPropertyError {
  errorCode: BatchPutAssetPropertyValueErrorCode;
  errorMessage: string;
  timestamps: TimeInNanos[];
}
export const BatchPutAssetPropertyError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: BatchPutAssetPropertyValueErrorCode,
    errorMessage: S.String,
    timestamps: Timestamps,
  }),
).annotate({
  identifier: "BatchPutAssetPropertyError",
}) as any as S.Schema<BatchPutAssetPropertyError>;
export type BatchPutAssetPropertyErrors = BatchPutAssetPropertyError[];
export const BatchPutAssetPropertyErrors = /*@__PURE__*/ S.Array(
  BatchPutAssetPropertyError,
);
export interface BatchPutAssetPropertyErrorEntry {
  entryId: string;
  errors: BatchPutAssetPropertyError[];
}
export const BatchPutAssetPropertyErrorEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entryId: S.String, errors: BatchPutAssetPropertyErrors }),
).annotate({
  identifier: "BatchPutAssetPropertyErrorEntry",
}) as any as S.Schema<BatchPutAssetPropertyErrorEntry>;
export type BatchPutAssetPropertyErrorEntries =
  BatchPutAssetPropertyErrorEntry[];
export const BatchPutAssetPropertyErrorEntries = /*@__PURE__*/ S.Array(
  BatchPutAssetPropertyErrorEntry,
);
export interface BatchPutAssetPropertyValueResponse {
  errorEntries: BatchPutAssetPropertyErrorEntry[];
}
export const BatchPutAssetPropertyValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorEntries: BatchPutAssetPropertyErrorEntries }),
).annotate({
  identifier: "BatchPutAssetPropertyValueResponse",
}) as any as S.Schema<BatchPutAssetPropertyValueResponse>;
export type IdentityId = string;
export interface UserIdentity {
  id: string;
}
export const UserIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({ identifier: "UserIdentity" }) as any as S.Schema<UserIdentity>;
export interface GroupIdentity {
  id: string;
}
export const GroupIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({ identifier: "GroupIdentity" }) as any as S.Schema<GroupIdentity>;
export type IamArn = string;
export interface IAMUserIdentity {
  arn: string;
}
export const IAMUserIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "IAMUserIdentity",
}) as any as S.Schema<IAMUserIdentity>;
export interface IAMRoleIdentity {
  arn: string;
}
export const IAMRoleIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "IAMRoleIdentity",
}) as any as S.Schema<IAMRoleIdentity>;
export interface Identity {
  user?: UserIdentity;
  group?: GroupIdentity;
  iamUser?: IAMUserIdentity;
  iamRole?: IAMRoleIdentity;
}
export const Identity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    user: S.optional(UserIdentity),
    group: S.optional(GroupIdentity),
    iamUser: S.optional(IAMUserIdentity),
    iamRole: S.optional(IAMRoleIdentity),
  }),
).annotate({ identifier: "Identity" }) as any as S.Schema<Identity>;
export interface PortalResource {
  id: string;
}
export const PortalResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({ identifier: "PortalResource" }) as any as S.Schema<PortalResource>;
export interface ProjectResource {
  id: string;
}
export const ProjectResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({
  identifier: "ProjectResource",
}) as any as S.Schema<ProjectResource>;
export interface Resource {
  portal?: PortalResource;
  project?: ProjectResource;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portal: S.optional(PortalResource),
    project: S.optional(ProjectResource),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type Permission = "ADMINISTRATOR" | "VIEWER" | (string & {});
export const Permission = /*@__PURE__*/ S.String;

export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAccessPolicyRequest {
  accessPolicyIdentity: Identity;
  accessPolicyResource: Resource;
  accessPolicyPermission: Permission;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicyIdentity: Identity,
    accessPolicyResource: Resource,
    accessPolicyPermission: Permission,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/access-policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessPolicyRequest",
}) as any as S.Schema<CreateAccessPolicyRequest>;
export type ARN = string;
export interface CreateAccessPolicyResponse {
  accessPolicyId: string;
  accessPolicyArn: string;
}
export const CreateAccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessPolicyId: S.String, accessPolicyArn: S.String }),
).annotate({
  identifier: "CreateAccessPolicyResponse",
}) as any as S.Schema<CreateAccessPolicyResponse>;
export type Name = string;
export type ExternalId = string;
export type Description = string;
export interface CreateAssetRequest {
  assetName: string;
  assetModelId: string;
  assetId?: string;
  assetExternalId?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  assetDescription?: string;
}
export const CreateAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetName: S.String,
    assetModelId: S.String,
    assetId: S.optional(S.String),
    assetExternalId: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
    assetDescription: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssetRequest",
}) as any as S.Schema<CreateAssetRequest>;
export type AssetState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const AssetState = /*@__PURE__*/ S.String;

export type ErrorCode = "VALIDATION_ERROR" | "INTERNAL_FAILURE" | (string & {});
export const ErrorCode = /*@__PURE__*/ S.String;

export type DetailedErrorCode =
  | "INCOMPATIBLE_COMPUTE_LOCATION"
  | "INCOMPATIBLE_FORWARDING_CONFIGURATION"
  | (string & {});
export const DetailedErrorCode = /*@__PURE__*/ S.String;

export type DetailedErrorMessage = string;
export interface DetailedError {
  code: DetailedErrorCode;
  message: string;
}
export const DetailedError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: DetailedErrorCode, message: S.String }),
).annotate({ identifier: "DetailedError" }) as any as S.Schema<DetailedError>;
export type DetailedErrors = DetailedError[];
export const DetailedErrors = /*@__PURE__*/ S.Array(DetailedError);
export interface ErrorDetails {
  code: ErrorCode;
  message: string;
  details?: DetailedError[];
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: ErrorCode,
    message: S.String,
    details: S.optional(DetailedErrors),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface AssetStatus {
  state: AssetState;
  error?: ErrorDetails;
}
export const AssetStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: AssetState, error: S.optional(ErrorDetails) }),
).annotate({ identifier: "AssetStatus" }) as any as S.Schema<AssetStatus>;
export interface CreateAssetResponse {
  assetId: string;
  assetArn: string;
  assetStatus: AssetStatus;
}
export const CreateAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, assetArn: S.String, assetStatus: AssetStatus }),
).annotate({
  identifier: "CreateAssetResponse",
}) as any as S.Schema<CreateAssetResponse>;
export type AssetModelType =
  | "ASSET_MODEL"
  | "COMPONENT_MODEL"
  | "INTERFACE"
  | (string & {});
export const AssetModelType = /*@__PURE__*/ S.String;

export type PropertyDataType =
  | "STRING"
  | "INTEGER"
  | "DOUBLE"
  | "BOOLEAN"
  | "STRUCT"
  | (string & {});
export const PropertyDataType = /*@__PURE__*/ S.String;

export type PropertyUnit = string;
export type DefaultValue = string;
export interface Attribute {
  defaultValue?: string;
}
export const Attribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ defaultValue: S.optional(S.String) }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export type ForwardingConfigState = "DISABLED" | "ENABLED" | (string & {});
export const ForwardingConfigState = /*@__PURE__*/ S.String;

export interface ForwardingConfig {
  state: ForwardingConfigState;
}
export const ForwardingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: ForwardingConfigState }),
).annotate({
  identifier: "ForwardingConfig",
}) as any as S.Schema<ForwardingConfig>;
export interface MeasurementProcessingConfig {
  forwardingConfig: ForwardingConfig;
}
export const MeasurementProcessingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ forwardingConfig: ForwardingConfig }),
).annotate({
  identifier: "MeasurementProcessingConfig",
}) as any as S.Schema<MeasurementProcessingConfig>;
export interface Measurement {
  processingConfig?: MeasurementProcessingConfig;
}
export const Measurement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ processingConfig: S.optional(MeasurementProcessingConfig) }),
).annotate({ identifier: "Measurement" }) as any as S.Schema<Measurement>;
export type Expression = string;
export type VariableName = string;
export type Macro = string;
export interface AssetModelPropertyPathSegment {
  id?: string;
  name?: string;
}
export const AssetModelPropertyPathSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "AssetModelPropertyPathSegment",
}) as any as S.Schema<AssetModelPropertyPathSegment>;
export type AssetModelPropertyPath = AssetModelPropertyPathSegment[];
export const AssetModelPropertyPath = /*@__PURE__*/ S.Array(
  AssetModelPropertyPathSegment,
);
export interface VariableValue {
  propertyId?: string;
  hierarchyId?: string;
  propertyPath?: AssetModelPropertyPathSegment[];
}
export const VariableValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propertyId: S.optional(S.String),
    hierarchyId: S.optional(S.String),
    propertyPath: S.optional(AssetModelPropertyPath),
  }),
).annotate({ identifier: "VariableValue" }) as any as S.Schema<VariableValue>;
export interface ExpressionVariable {
  name: string;
  value: VariableValue;
}
export const ExpressionVariable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: VariableValue }),
).annotate({
  identifier: "ExpressionVariable",
}) as any as S.Schema<ExpressionVariable>;
export type ExpressionVariables = ExpressionVariable[];
export const ExpressionVariables = /*@__PURE__*/ S.Array(ExpressionVariable);
export type ComputeLocation = "EDGE" | "CLOUD" | (string & {});
export const ComputeLocation = /*@__PURE__*/ S.String;

export interface TransformProcessingConfig {
  computeLocation: ComputeLocation;
  forwardingConfig?: ForwardingConfig;
}
export const TransformProcessingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computeLocation: ComputeLocation,
    forwardingConfig: S.optional(ForwardingConfig),
  }),
).annotate({
  identifier: "TransformProcessingConfig",
}) as any as S.Schema<TransformProcessingConfig>;
export interface Transform {
  expression: string;
  variables: ExpressionVariable[];
  processingConfig?: TransformProcessingConfig;
}
export const Transform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expression: S.String,
    variables: ExpressionVariables,
    processingConfig: S.optional(TransformProcessingConfig),
  }),
).annotate({ identifier: "Transform" }) as any as S.Schema<Transform>;
export type Interval = string;
export type Offset = string;
export interface TumblingWindow {
  interval: string;
  offset?: string;
}
export const TumblingWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ interval: S.String, offset: S.optional(S.String) }),
).annotate({ identifier: "TumblingWindow" }) as any as S.Schema<TumblingWindow>;
export interface MetricWindow {
  tumbling?: TumblingWindow;
}
export const MetricWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tumbling: S.optional(TumblingWindow) }),
).annotate({ identifier: "MetricWindow" }) as any as S.Schema<MetricWindow>;
export interface MetricProcessingConfig {
  computeLocation: ComputeLocation;
}
export const MetricProcessingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ computeLocation: ComputeLocation }),
).annotate({
  identifier: "MetricProcessingConfig",
}) as any as S.Schema<MetricProcessingConfig>;
export interface Metric {
  expression?: string;
  variables?: ExpressionVariable[];
  window: MetricWindow;
  processingConfig?: MetricProcessingConfig;
}
export const Metric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expression: S.optional(S.String),
    variables: S.optional(ExpressionVariables),
    window: MetricWindow,
    processingConfig: S.optional(MetricProcessingConfig),
  }),
).annotate({ identifier: "Metric" }) as any as S.Schema<Metric>;
export interface PropertyType {
  attribute?: Attribute;
  measurement?: Measurement;
  transform?: Transform;
  metric?: Metric;
}
export const PropertyType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attribute: S.optional(Attribute),
    measurement: S.optional(Measurement),
    transform: S.optional(Transform),
    metric: S.optional(Metric),
  }),
).annotate({ identifier: "PropertyType" }) as any as S.Schema<PropertyType>;
export interface AssetModelPropertyDefinition {
  id?: string;
  externalId?: string;
  name: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  type: PropertyType;
}
export const AssetModelPropertyDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
    dataType: PropertyDataType,
    dataTypeSpec: S.optional(S.String),
    unit: S.optional(S.String),
    type: PropertyType,
  }),
).annotate({
  identifier: "AssetModelPropertyDefinition",
}) as any as S.Schema<AssetModelPropertyDefinition>;
export type AssetModelPropertyDefinitions = AssetModelPropertyDefinition[];
export const AssetModelPropertyDefinitions = /*@__PURE__*/ S.Array(
  AssetModelPropertyDefinition,
);
export interface AssetModelHierarchyDefinition {
  id?: string;
  externalId?: string;
  name: string;
  childAssetModelId: string;
}
export const AssetModelHierarchyDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
    childAssetModelId: S.String,
  }),
).annotate({
  identifier: "AssetModelHierarchyDefinition",
}) as any as S.Schema<AssetModelHierarchyDefinition>;
export type AssetModelHierarchyDefinitions = AssetModelHierarchyDefinition[];
export const AssetModelHierarchyDefinitions = /*@__PURE__*/ S.Array(
  AssetModelHierarchyDefinition,
);
export interface AssetModelCompositeModelDefinition {
  id?: string;
  externalId?: string;
  name: string;
  description?: string;
  type: string;
  properties?: AssetModelPropertyDefinition[];
}
export const AssetModelCompositeModelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    type: S.String,
    properties: S.optional(AssetModelPropertyDefinitions),
  }),
).annotate({
  identifier: "AssetModelCompositeModelDefinition",
}) as any as S.Schema<AssetModelCompositeModelDefinition>;
export type AssetModelCompositeModelDefinitions =
  AssetModelCompositeModelDefinition[];
export const AssetModelCompositeModelDefinitions = /*@__PURE__*/ S.Array(
  AssetModelCompositeModelDefinition,
);
export interface CreateAssetModelRequest {
  assetModelName: string;
  assetModelType?: AssetModelType;
  assetModelId?: string;
  assetModelExternalId?: string;
  assetModelDescription?: string;
  assetModelProperties?: AssetModelPropertyDefinition[];
  assetModelHierarchies?: AssetModelHierarchyDefinition[];
  assetModelCompositeModels?: AssetModelCompositeModelDefinition[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAssetModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelName: S.String,
    assetModelType: S.optional(AssetModelType),
    assetModelId: S.optional(S.String),
    assetModelExternalId: S.optional(S.String),
    assetModelDescription: S.optional(S.String),
    assetModelProperties: S.optional(AssetModelPropertyDefinitions),
    assetModelHierarchies: S.optional(AssetModelHierarchyDefinitions),
    assetModelCompositeModels: S.optional(AssetModelCompositeModelDefinitions),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/asset-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAssetModelRequest",
}) as any as S.Schema<CreateAssetModelRequest>;
export type AssetModelState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "PROPAGATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const AssetModelState = /*@__PURE__*/ S.String;

export interface AssetModelStatus {
  state: AssetModelState;
  error?: ErrorDetails;
}
export const AssetModelStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: AssetModelState, error: S.optional(ErrorDetails) }),
).annotate({
  identifier: "AssetModelStatus",
}) as any as S.Schema<AssetModelStatus>;
export interface CreateAssetModelResponse {
  assetModelId: string;
  assetModelArn: string;
  assetModelStatus: AssetModelStatus;
}
export const CreateAssetModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String,
    assetModelArn: S.String,
    assetModelStatus: AssetModelStatus,
  }),
).annotate({
  identifier: "CreateAssetModelResponse",
}) as any as S.Schema<CreateAssetModelResponse>;
export type ETag = string;
export type SelectAll = string;
export type AssetModelVersionType = "LATEST" | "ACTIVE" | (string & {});
export const AssetModelVersionType = /*@__PURE__*/ S.String;

export interface CreateAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelExternalId?: string;
  parentAssetModelCompositeModelId?: string;
  assetModelCompositeModelId?: string;
  assetModelCompositeModelDescription?: string;
  assetModelCompositeModelName: string;
  assetModelCompositeModelType: string;
  clientToken?: string;
  composedAssetModelId?: string;
  assetModelCompositeModelProperties?: AssetModelPropertyDefinition[];
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export const CreateAssetModelCompositeModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      assetModelCompositeModelExternalId: S.optional(S.String),
      parentAssetModelCompositeModelId: S.optional(S.String),
      assetModelCompositeModelId: S.optional(S.String),
      assetModelCompositeModelDescription: S.optional(S.String),
      assetModelCompositeModelName: S.String,
      assetModelCompositeModelType: S.String,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      composedAssetModelId: S.optional(S.String),
      assetModelCompositeModelProperties: S.optional(
        AssetModelPropertyDefinitions,
      ),
      ifMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
      ifNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
      matchForVersionType: S.optional(AssetModelVersionType).pipe(
        T.HttpHeader("Match-For-Version-Type"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/asset-models/{assetModelId}/composite-models",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateAssetModelCompositeModelRequest",
}) as any as S.Schema<CreateAssetModelCompositeModelRequest>;
export interface AssetModelCompositeModelPathSegment {
  id?: string;
  name?: string;
}
export const AssetModelCompositeModelPathSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "AssetModelCompositeModelPathSegment",
}) as any as S.Schema<AssetModelCompositeModelPathSegment>;
export type AssetModelCompositeModelPath =
  AssetModelCompositeModelPathSegment[];
export const AssetModelCompositeModelPath = /*@__PURE__*/ S.Array(
  AssetModelCompositeModelPathSegment,
);
export interface CreateAssetModelCompositeModelResponse {
  assetModelCompositeModelId: string;
  assetModelCompositeModelPath: AssetModelCompositeModelPathSegment[];
  assetModelStatus: AssetModelStatus;
}
export const CreateAssetModelCompositeModelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelCompositeModelId: S.String,
      assetModelCompositeModelPath: AssetModelCompositeModelPath,
      assetModelStatus: AssetModelStatus,
    }),
).annotate({
  identifier: "CreateAssetModelCompositeModelResponse",
}) as any as S.Schema<CreateAssetModelCompositeModelResponse>;
export type Bucket = string;
export interface File {
  bucket: string;
  key: string;
  versionId?: string;
}
export const File = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.String,
    key: S.String,
    versionId: S.optional(S.String),
  }),
).annotate({ identifier: "File" }) as any as S.Schema<File>;
export type Files = File[];
export const Files = /*@__PURE__*/ S.Array(File);
export interface ErrorReportLocation {
  bucket: string;
  prefix: string;
}
export const ErrorReportLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, prefix: S.String }),
).annotate({
  identifier: "ErrorReportLocation",
}) as any as S.Schema<ErrorReportLocation>;
export type ColumnName =
  | "ALIAS"
  | "ASSET_ID"
  | "PROPERTY_ID"
  | "DATA_TYPE"
  | "TIMESTAMP_SECONDS"
  | "TIMESTAMP_NANO_OFFSET"
  | "QUALITY"
  | "VALUE"
  | (string & {});
export const ColumnName = /*@__PURE__*/ S.String;

export type ColumnNames = ColumnName[];
export const ColumnNames = /*@__PURE__*/ S.Array(ColumnName);
export interface Csv {
  columnNames: ColumnName[];
}
export const Csv = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ columnNames: ColumnNames }),
).annotate({ identifier: "Csv" }) as any as S.Schema<Csv>;
export interface Parquet {}
export const Parquet = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "Parquet",
}) as any as S.Schema<Parquet>;
export interface FileFormat {
  csv?: Csv;
  parquet?: Parquet;
}
export const FileFormat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ csv: S.optional(Csv), parquet: S.optional(Parquet) }),
).annotate({ identifier: "FileFormat" }) as any as S.Schema<FileFormat>;
export interface JobConfiguration {
  fileFormat: FileFormat;
}
export const JobConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileFormat: FileFormat }),
).annotate({
  identifier: "JobConfiguration",
}) as any as S.Schema<JobConfiguration>;
export type AdaptiveIngestion = boolean;
export type DeleteFilesAfterImport = boolean;
export interface CreateBulkImportJobRequest {
  jobName: string;
  jobRoleArn: string;
  files: File[];
  errorReportLocation: ErrorReportLocation;
  jobConfiguration: JobConfiguration;
  adaptiveIngestion?: boolean;
  deleteFilesAfterImport?: boolean;
}
export const CreateBulkImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobName: S.String,
    jobRoleArn: S.String,
    files: Files,
    errorReportLocation: ErrorReportLocation,
    jobConfiguration: JobConfiguration,
    adaptiveIngestion: S.optional(S.Boolean),
    deleteFilesAfterImport: S.optional(S.Boolean),
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
  identifier: "CreateBulkImportJobRequest",
}) as any as S.Schema<CreateBulkImportJobRequest>;
export type JobStatus =
  | "PENDING"
  | "CANCELLED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "COMPLETED_WITH_FAILURES"
  | (string & {});
export const JobStatus = /*@__PURE__*/ S.String;

export interface CreateBulkImportJobResponse {
  jobId: string;
  jobName: string;
  jobStatus: JobStatus;
}
export const CreateBulkImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String, jobName: S.String, jobStatus: JobStatus }),
).annotate({
  identifier: "CreateBulkImportJobResponse",
}) as any as S.Schema<CreateBulkImportJobResponse>;
export type RestrictedName = string;
export type RestrictedDescription = string;
export type InputProperties = string;
export type ResultProperty = string;
export interface ComputationModelAnomalyDetectionConfiguration {
  inputProperties: string;
  resultProperty: string;
}
export const ComputationModelAnomalyDetectionConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ inputProperties: S.String, resultProperty: S.String }),
  ).annotate({
    identifier: "ComputationModelAnomalyDetectionConfiguration",
  }) as any as S.Schema<ComputationModelAnomalyDetectionConfiguration>;
export interface ComputationModelConfiguration {
  anomalyDetection?: ComputationModelAnomalyDetectionConfiguration;
}
export const ComputationModelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    anomalyDetection: S.optional(ComputationModelAnomalyDetectionConfiguration),
  }),
).annotate({
  identifier: "ComputationModelConfiguration",
}) as any as S.Schema<ComputationModelConfiguration>;
export type ComputationModelDataBindingVariable = string;
export interface AssetModelPropertyBindingValue {
  assetModelId: string;
  propertyId: string;
}
export const AssetModelPropertyBindingValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetModelId: S.String, propertyId: S.String }),
).annotate({
  identifier: "AssetModelPropertyBindingValue",
}) as any as S.Schema<AssetModelPropertyBindingValue>;
export interface AssetPropertyBindingValue {
  assetId: string;
  propertyId: string;
}
export const AssetPropertyBindingValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, propertyId: S.String }),
).annotate({
  identifier: "AssetPropertyBindingValue",
}) as any as S.Schema<AssetPropertyBindingValue>;
export type BindingValueList = ComputationModelDataBindingValue[];
export const BindingValueList = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<ComputationModelDataBindingValue> =>
      ComputationModelDataBindingValue,
  ).annotate({ identifier: "ComputationModelDataBindingValue" }),
) as any as S.Schema<BindingValueList>;
export interface ComputationModelDataBindingValue {
  assetModelProperty?: AssetModelPropertyBindingValue;
  assetProperty?: AssetPropertyBindingValue;
  list?: ComputationModelDataBindingValue[];
}
export const ComputationModelDataBindingValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelProperty: S.optional(AssetModelPropertyBindingValue),
    assetProperty: S.optional(AssetPropertyBindingValue),
    list: S.optional(
      S.suspend(() => BindingValueList).annotate({
        identifier: "BindingValueList",
      }),
    ),
  }),
).annotate({
  identifier: "ComputationModelDataBindingValue",
}) as any as S.Schema<ComputationModelDataBindingValue>;
export type ComputationModelDataBinding = {
  [key: string]: ComputationModelDataBindingValue | undefined;
};
export const ComputationModelDataBinding = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(
    (): S.Schema<ComputationModelDataBindingValue> =>
      ComputationModelDataBindingValue,
  )
    .annotate({ identifier: "ComputationModelDataBindingValue" })
    .pipe(S.optional),
);
export interface CreateComputationModelRequest {
  computationModelName: string;
  computationModelDescription?: string;
  computationModelConfiguration: ComputationModelConfiguration;
  computationModelDataBinding: {
    [key: string]: ComputationModelDataBindingValue | undefined;
  };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateComputationModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelName: S.String,
    computationModelDescription: S.optional(S.String),
    computationModelConfiguration: ComputationModelConfiguration,
    computationModelDataBinding: ComputationModelDataBinding,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/computation-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComputationModelRequest",
}) as any as S.Schema<CreateComputationModelRequest>;
export type ComputationModelState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const ComputationModelState = /*@__PURE__*/ S.String;

export interface ComputationModelStatus {
  state: ComputationModelState;
  error?: ErrorDetails;
}
export const ComputationModelStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: ComputationModelState, error: S.optional(ErrorDetails) }),
).annotate({
  identifier: "ComputationModelStatus",
}) as any as S.Schema<ComputationModelStatus>;
export interface CreateComputationModelResponse {
  computationModelId: string;
  computationModelArn: string;
  computationModelStatus: ComputationModelStatus;
}
export const CreateComputationModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelId: S.String,
    computationModelArn: S.String,
    computationModelStatus: ComputationModelStatus,
  }),
).annotate({
  identifier: "CreateComputationModelResponse",
}) as any as S.Schema<CreateComputationModelResponse>;
export type DashboardDefinition = string;
export interface CreateDashboardRequest {
  projectId: string;
  dashboardName: string;
  dashboardDescription?: string;
  dashboardDefinition: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String,
    dashboardName: S.String,
    dashboardDescription: S.optional(S.String),
    dashboardDefinition: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dashboards" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDashboardRequest",
}) as any as S.Schema<CreateDashboardRequest>;
export interface CreateDashboardResponse {
  dashboardId: string;
  dashboardArn: string;
}
export const CreateDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dashboardId: S.String, dashboardArn: S.String }),
).annotate({
  identifier: "CreateDashboardResponse",
}) as any as S.Schema<CreateDashboardResponse>;
export type DatasetSourceType = "KENDRA" | (string & {});
export const DatasetSourceType = /*@__PURE__*/ S.String;

export type DatasetSourceFormat = "KNOWLEDGE_BASE" | (string & {});
export const DatasetSourceFormat = /*@__PURE__*/ S.String;

export interface KendraSourceDetail {
  knowledgeBaseArn: string;
  roleArn: string;
}
export const KendraSourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBaseArn: S.String, roleArn: S.String }),
).annotate({
  identifier: "KendraSourceDetail",
}) as any as S.Schema<KendraSourceDetail>;
export interface SourceDetail {
  kendra?: KendraSourceDetail;
}
export const SourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kendra: S.optional(KendraSourceDetail) }),
).annotate({ identifier: "SourceDetail" }) as any as S.Schema<SourceDetail>;
export interface DatasetSource {
  sourceType: DatasetSourceType;
  sourceFormat: DatasetSourceFormat;
  sourceDetail?: SourceDetail;
}
export const DatasetSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceType: DatasetSourceType,
    sourceFormat: DatasetSourceFormat,
    sourceDetail: S.optional(SourceDetail),
  }),
).annotate({ identifier: "DatasetSource" }) as any as S.Schema<DatasetSource>;
export interface CreateDatasetRequest {
  datasetId?: string;
  datasetName: string;
  datasetDescription?: string;
  datasetSource: DatasetSource;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.optional(S.String),
    datasetName: S.String,
    datasetDescription: S.optional(S.String),
    datasetSource: DatasetSource,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export type DatasetState =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const DatasetState = /*@__PURE__*/ S.String;

export interface DatasetStatus {
  state: DatasetState;
  error?: ErrorDetails;
}
export const DatasetStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: DatasetState, error: S.optional(ErrorDetails) }),
).annotate({ identifier: "DatasetStatus" }) as any as S.Schema<DatasetStatus>;
export interface CreateDatasetResponse {
  datasetId: string;
  datasetArn: string;
  datasetStatus: DatasetStatus;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String,
    datasetArn: S.String,
    datasetStatus: DatasetStatus,
  }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type GatewayName = string;
export interface Greengrass {
  groupArn: string;
}
export const Greengrass = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupArn: S.String }),
).annotate({ identifier: "Greengrass" }) as any as S.Schema<Greengrass>;
export type CoreDeviceThingName = string;
export type CoreDeviceOperatingSystem =
  | "LINUX_AARCH64"
  | "LINUX_AMD64"
  | "WINDOWS_AMD64"
  | (string & {});
export const CoreDeviceOperatingSystem = /*@__PURE__*/ S.String;

export interface GreengrassV2 {
  coreDeviceThingName: string;
  coreDeviceOperatingSystem?: CoreDeviceOperatingSystem;
}
export const GreengrassV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coreDeviceThingName: S.String,
    coreDeviceOperatingSystem: S.optional(CoreDeviceOperatingSystem),
  }),
).annotate({ identifier: "GreengrassV2" }) as any as S.Schema<GreengrassV2>;
export type IotCoreThingName = string;
export interface SiemensIE {
  iotCoreThingName: string;
}
export const SiemensIE = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ iotCoreThingName: S.String }),
).annotate({ identifier: "SiemensIE" }) as any as S.Schema<SiemensIE>;
export interface GatewayPlatform {
  greengrass?: Greengrass;
  greengrassV2?: GreengrassV2;
  siemensIE?: SiemensIE;
}
export const GatewayPlatform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    greengrass: S.optional(Greengrass),
    greengrassV2: S.optional(GreengrassV2),
    siemensIE: S.optional(SiemensIE),
  }),
).annotate({
  identifier: "GatewayPlatform",
}) as any as S.Schema<GatewayPlatform>;
export type GatewayVersion = string;
export interface CreateGatewayRequest {
  gatewayName: string;
  gatewayPlatform: GatewayPlatform;
  gatewayVersion?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayName: S.String,
    gatewayPlatform: GatewayPlatform,
    gatewayVersion: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/20200301/gateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGatewayRequest",
}) as any as S.Schema<CreateGatewayRequest>;
export interface CreateGatewayResponse {
  gatewayId: string;
  gatewayArn: string;
}
export const CreateGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, gatewayArn: S.String }),
).annotate({
  identifier: "CreateGatewayResponse",
}) as any as S.Schema<CreateGatewayResponse>;
export type Email = string | redacted.Redacted<string>;
export type ImageFileData = Uint8Array;
export type ImageFileType = "PNG" | (string & {});
export const ImageFileType = /*@__PURE__*/ S.String;

export interface ImageFile {
  data: Uint8Array;
  type: ImageFileType;
}
export const ImageFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ data: T.Blob, type: ImageFileType }),
).annotate({ identifier: "ImageFile" }) as any as S.Schema<ImageFile>;
export type AuthMode = "IAM" | "SSO" | (string & {});
export const AuthMode = /*@__PURE__*/ S.String;

export interface Alarms {
  alarmRoleArn: string;
  notificationLambdaArn?: string;
}
export const Alarms = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alarmRoleArn: S.String,
    notificationLambdaArn: S.optional(S.String),
  }),
).annotate({ identifier: "Alarms" }) as any as S.Schema<Alarms>;
export type PortalType =
  | "SITEWISE_PORTAL_V1"
  | "SITEWISE_PORTAL_V2"
  | (string & {});
export const PortalType = /*@__PURE__*/ S.String;

export type PortalTypeKey = string;
export type PortalTools = string[];
export const PortalTools = /*@__PURE__*/ S.Array(S.String);
export interface PortalTypeEntry {
  portalTools?: string[];
}
export const PortalTypeEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalTools: S.optional(PortalTools) }),
).annotate({
  identifier: "PortalTypeEntry",
}) as any as S.Schema<PortalTypeEntry>;
export type PortalTypeConfiguration = {
  [key: string]: PortalTypeEntry | undefined;
};
export const PortalTypeConfiguration = /*@__PURE__*/ S.Record(
  S.String,
  PortalTypeEntry.pipe(S.optional),
);
export interface CreatePortalRequest {
  portalName: string;
  portalDescription?: string;
  portalContactEmail: string | redacted.Redacted<string>;
  clientToken?: string;
  portalLogoImageFile?: ImageFile;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
  portalAuthMode?: AuthMode;
  notificationSenderEmail?: string | redacted.Redacted<string>;
  alarms?: Alarms;
  portalType?: PortalType;
  portalTypeConfiguration?: { [key: string]: PortalTypeEntry | undefined };
}
export const CreatePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalName: S.String,
    portalDescription: S.optional(S.String),
    portalContactEmail: SensitiveString,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    portalLogoImageFile: S.optional(ImageFile),
    roleArn: S.String,
    tags: S.optional(TagMap),
    portalAuthMode: S.optional(AuthMode),
    notificationSenderEmail: S.optional(SensitiveString),
    alarms: S.optional(Alarms),
    portalType: S.optional(PortalType),
    portalTypeConfiguration: S.optional(PortalTypeConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/portals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePortalRequest",
}) as any as S.Schema<CreatePortalRequest>;
export type Url = string;
export type PortalState =
  | "CREATING"
  | "PENDING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "FAILED"
  | (string & {});
export const PortalState = /*@__PURE__*/ S.String;

export type MonitorErrorCode =
  | "INTERNAL_FAILURE"
  | "VALIDATION_ERROR"
  | "LIMIT_EXCEEDED"
  | (string & {});
export const MonitorErrorCode = /*@__PURE__*/ S.String;

export type MonitorErrorMessage = string;
export interface MonitorErrorDetails {
  code?: MonitorErrorCode;
  message?: string;
}
export const MonitorErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.optional(MonitorErrorCode),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "MonitorErrorDetails",
}) as any as S.Schema<MonitorErrorDetails>;
export interface PortalStatus {
  state: PortalState;
  error?: MonitorErrorDetails;
}
export const PortalStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: PortalState, error: S.optional(MonitorErrorDetails) }),
).annotate({ identifier: "PortalStatus" }) as any as S.Schema<PortalStatus>;
export type SSOApplicationId = string;
export interface CreatePortalResponse {
  portalId: string;
  portalArn: string;
  portalStartUrl: string;
  portalStatus: PortalStatus;
  ssoApplicationId: string;
}
export const CreatePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String,
    portalArn: S.String,
    portalStartUrl: S.String,
    portalStatus: PortalStatus,
    ssoApplicationId: S.String,
  }),
).annotate({
  identifier: "CreatePortalResponse",
}) as any as S.Schema<CreatePortalResponse>;
export interface CreateProjectRequest {
  portalId: string;
  projectName: string;
  projectDescription?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String,
    projectName: S.String,
    projectDescription: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProjectRequest",
}) as any as S.Schema<CreateProjectRequest>;
export interface CreateProjectResponse {
  projectId: string;
  projectArn: string;
}
export const CreateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ projectId: S.String, projectArn: S.String }),
).annotate({
  identifier: "CreateProjectResponse",
}) as any as S.Schema<CreateProjectResponse>;
export interface DeleteAccessPolicyRequest {
  accessPolicyId: string;
  clientToken?: string;
}
export const DeleteAccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicyId: S.String.pipe(T.HttpLabel("accessPolicyId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/access-policies/{accessPolicyId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessPolicyRequest",
}) as any as S.Schema<DeleteAccessPolicyRequest>;
export interface DeleteAccessPolicyResponse {}
export const DeleteAccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAccessPolicyResponse",
}) as any as S.Schema<DeleteAccessPolicyResponse>;
export interface DeleteAssetRequest {
  assetId: string;
  clientToken?: string;
}
export const DeleteAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/assets/{assetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetRequest",
}) as any as S.Schema<DeleteAssetRequest>;
export interface DeleteAssetResponse {
  assetStatus: AssetStatus;
}
export const DeleteAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetStatus: AssetStatus }),
).annotate({
  identifier: "DeleteAssetResponse",
}) as any as S.Schema<DeleteAssetResponse>;
export interface DeleteAssetModelRequest {
  assetModelId: string;
  clientToken?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export const DeleteAssetModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    ifMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
    ifNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
    matchForVersionType: S.optional(AssetModelVersionType).pipe(
      T.HttpHeader("Match-For-Version-Type"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/asset-models/{assetModelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetModelRequest",
}) as any as S.Schema<DeleteAssetModelRequest>;
export interface DeleteAssetModelResponse {
  assetModelStatus: AssetModelStatus;
}
export const DeleteAssetModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetModelStatus: AssetModelStatus }),
).annotate({
  identifier: "DeleteAssetModelResponse",
}) as any as S.Schema<DeleteAssetModelResponse>;
export interface DeleteAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelId: string;
  clientToken?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export const DeleteAssetModelCompositeModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      assetModelCompositeModelId: S.String.pipe(
        T.HttpLabel("assetModelCompositeModelId"),
      ),
      clientToken: S.optional(S.String).pipe(
        T.HttpQuery("clientToken"),
        T.IdempotencyToken(),
      ),
      ifMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
      ifNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
      matchForVersionType: S.optional(AssetModelVersionType).pipe(
        T.HttpHeader("Match-For-Version-Type"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/asset-models/{assetModelId}/composite-models/{assetModelCompositeModelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteAssetModelCompositeModelRequest",
}) as any as S.Schema<DeleteAssetModelCompositeModelRequest>;
export interface DeleteAssetModelCompositeModelResponse {
  assetModelStatus: AssetModelStatus;
}
export const DeleteAssetModelCompositeModelResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ assetModelStatus: AssetModelStatus }),
).annotate({
  identifier: "DeleteAssetModelCompositeModelResponse",
}) as any as S.Schema<DeleteAssetModelCompositeModelResponse>;
export interface DeleteAssetModelInterfaceRelationshipRequest {
  assetModelId: string;
  interfaceAssetModelId: string;
  clientToken?: string;
}
export const DeleteAssetModelInterfaceRelationshipRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      interfaceAssetModelId: S.String.pipe(
        T.HttpLabel("interfaceAssetModelId"),
      ),
      clientToken: S.optional(S.String).pipe(
        T.HttpQuery("clientToken"),
        T.IdempotencyToken(),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/asset-models/{assetModelId}/interface/{interfaceAssetModelId}/asset-model-interface-relationship",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteAssetModelInterfaceRelationshipRequest",
  }) as any as S.Schema<DeleteAssetModelInterfaceRelationshipRequest>;
export interface DeleteAssetModelInterfaceRelationshipResponse {
  assetModelId: string;
  interfaceAssetModelId: string;
  assetModelArn: string;
  assetModelStatus: AssetModelStatus;
}
export const DeleteAssetModelInterfaceRelationshipResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetModelId: S.String,
      interfaceAssetModelId: S.String,
      assetModelArn: S.String,
      assetModelStatus: AssetModelStatus,
    }),
  ).annotate({
    identifier: "DeleteAssetModelInterfaceRelationshipResponse",
  }) as any as S.Schema<DeleteAssetModelInterfaceRelationshipResponse>;
export interface DeleteComputationModelRequest {
  computationModelId: string;
  clientToken?: string;
}
export const DeleteComputationModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelId: S.String.pipe(T.HttpLabel("computationModelId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/computation-models/{computationModelId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteComputationModelRequest",
}) as any as S.Schema<DeleteComputationModelRequest>;
export interface DeleteComputationModelResponse {
  computationModelStatus: ComputationModelStatus;
}
export const DeleteComputationModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ computationModelStatus: ComputationModelStatus }),
).annotate({
  identifier: "DeleteComputationModelResponse",
}) as any as S.Schema<DeleteComputationModelResponse>;
export interface DeleteDashboardRequest {
  dashboardId: string;
  clientToken?: string;
}
export const DeleteDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dashboardId: S.String.pipe(T.HttpLabel("dashboardId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/dashboards/{dashboardId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDashboardRequest",
}) as any as S.Schema<DeleteDashboardRequest>;
export interface DeleteDashboardResponse {}
export const DeleteDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDashboardResponse",
}) as any as S.Schema<DeleteDashboardResponse>;
export interface DeleteDatasetRequest {
  datasetId: string;
  clientToken?: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/datasets/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {
  datasetStatus: DatasetStatus;
}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetStatus: DatasetStatus }),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export interface DeleteGatewayRequest {
  gatewayId: string;
}
export const DeleteGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/20200301/gateways/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGatewayRequest",
}) as any as S.Schema<DeleteGatewayRequest>;
export interface DeleteGatewayResponse {}
export const DeleteGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGatewayResponse",
}) as any as S.Schema<DeleteGatewayResponse>;
export interface DeletePortalRequest {
  portalId: string;
  clientToken?: string;
}
export const DeletePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String.pipe(T.HttpLabel("portalId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/portals/{portalId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePortalRequest",
}) as any as S.Schema<DeletePortalRequest>;
export interface DeletePortalResponse {
  portalStatus: PortalStatus;
}
export const DeletePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalStatus: PortalStatus }),
).annotate({
  identifier: "DeletePortalResponse",
}) as any as S.Schema<DeletePortalResponse>;
export interface DeleteProjectRequest {
  projectId: string;
  clientToken?: string;
}
export const DeleteProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String.pipe(T.HttpLabel("projectId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/projects/{projectId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProjectRequest",
}) as any as S.Schema<DeleteProjectRequest>;
export interface DeleteProjectResponse {}
export const DeleteProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProjectResponse",
}) as any as S.Schema<DeleteProjectResponse>;
export interface DeleteTimeSeriesRequest {
  alias?: string;
  assetId?: string;
  propertyId?: string;
  clientToken?: string;
}
export const DeleteTimeSeriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
    assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    propertyId: S.optional(S.String).pipe(T.HttpQuery("propertyId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/timeseries/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTimeSeriesRequest",
}) as any as S.Schema<DeleteTimeSeriesRequest>;
export interface DeleteTimeSeriesResponse {}
export const DeleteTimeSeriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTimeSeriesResponse",
}) as any as S.Schema<DeleteTimeSeriesResponse>;
export interface DescribeAccessPolicyRequest {
  accessPolicyId: string;
}
export const DescribeAccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicyId: S.String.pipe(T.HttpLabel("accessPolicyId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/access-policies/{accessPolicyId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccessPolicyRequest",
}) as any as S.Schema<DescribeAccessPolicyRequest>;
export interface DescribeAccessPolicyResponse {
  accessPolicyId: string;
  accessPolicyArn: string;
  accessPolicyIdentity: Identity;
  accessPolicyResource: Resource;
  accessPolicyPermission: Permission;
  accessPolicyCreationDate: Date;
  accessPolicyLastUpdateDate: Date;
}
export const DescribeAccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicyId: S.String,
    accessPolicyArn: S.String,
    accessPolicyIdentity: Identity,
    accessPolicyResource: Resource,
    accessPolicyPermission: Permission,
    accessPolicyCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    accessPolicyLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DescribeAccessPolicyResponse",
}) as any as S.Schema<DescribeAccessPolicyResponse>;
export interface DescribeActionRequest {
  actionId: string;
}
export const DescribeActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionId: S.String.pipe(T.HttpLabel("actionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/actions/{actionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeActionRequest",
}) as any as S.Schema<DescribeActionRequest>;
export interface TargetResource {
  assetId?: string;
  computationModelId?: string;
}
export const TargetResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String),
    computationModelId: S.optional(S.String),
  }),
).annotate({ identifier: "TargetResource" }) as any as S.Schema<TargetResource>;
export type ActionPayloadString = string;
export interface ActionPayload {
  stringValue: string;
}
export const ActionPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stringValue: S.String }),
).annotate({ identifier: "ActionPayload" }) as any as S.Schema<ActionPayload>;
export interface ResolveTo {
  assetId: string;
}
export const ResolveTo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String }),
).annotate({ identifier: "ResolveTo" }) as any as S.Schema<ResolveTo>;
export interface DescribeActionResponse {
  actionId: string;
  targetResource: TargetResource;
  actionDefinitionId: string;
  actionPayload: ActionPayload;
  executionTime: Date;
  resolveTo?: ResolveTo;
}
export const DescribeActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionId: S.String,
    targetResource: TargetResource,
    actionDefinitionId: S.String,
    actionPayload: ActionPayload,
    executionTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    resolveTo: S.optional(ResolveTo),
  }),
).annotate({
  identifier: "DescribeActionResponse",
}) as any as S.Schema<DescribeActionResponse>;
export type ExcludeProperties = boolean;
export interface DescribeAssetRequest {
  assetId: string;
  excludeProperties?: boolean;
}
export const DescribeAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    excludeProperties: S.optional(S.Boolean).pipe(
      T.HttpQuery("excludeProperties"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{assetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssetRequest",
}) as any as S.Schema<DescribeAssetRequest>;
export type PropertyNotificationTopic = string;
export type PropertyNotificationState = "ENABLED" | "DISABLED" | (string & {});
export const PropertyNotificationState = /*@__PURE__*/ S.String;

export interface PropertyNotification {
  topic: string;
  state: PropertyNotificationState;
}
export const PropertyNotification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topic: S.String, state: PropertyNotificationState }),
).annotate({
  identifier: "PropertyNotification",
}) as any as S.Schema<PropertyNotification>;
export interface AssetPropertyPathSegment {
  id?: string;
  name?: string;
}
export const AssetPropertyPathSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "AssetPropertyPathSegment",
}) as any as S.Schema<AssetPropertyPathSegment>;
export type AssetPropertyPath = AssetPropertyPathSegment[];
export const AssetPropertyPath = /*@__PURE__*/ S.Array(
  AssetPropertyPathSegment,
);
export interface AssetProperty {
  id: string;
  externalId?: string;
  name: string;
  alias?: string;
  notification?: PropertyNotification;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  path?: AssetPropertyPathSegment[];
}
export const AssetProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    name: S.String,
    alias: S.optional(S.String),
    notification: S.optional(PropertyNotification),
    dataType: PropertyDataType,
    dataTypeSpec: S.optional(S.String),
    unit: S.optional(S.String),
    path: S.optional(AssetPropertyPath),
  }),
).annotate({ identifier: "AssetProperty" }) as any as S.Schema<AssetProperty>;
export type AssetProperties = AssetProperty[];
export const AssetProperties = /*@__PURE__*/ S.Array(AssetProperty);
export interface AssetHierarchy {
  id?: string;
  externalId?: string;
  name: string;
}
export const AssetHierarchy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
  }),
).annotate({ identifier: "AssetHierarchy" }) as any as S.Schema<AssetHierarchy>;
export type AssetHierarchies = AssetHierarchy[];
export const AssetHierarchies = /*@__PURE__*/ S.Array(AssetHierarchy);
export interface AssetCompositeModel {
  name: string;
  description?: string;
  type: string;
  properties: AssetProperty[];
  id?: string;
  externalId?: string;
}
export const AssetCompositeModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    type: S.String,
    properties: AssetProperties,
    id: S.optional(S.String),
    externalId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetCompositeModel",
}) as any as S.Schema<AssetCompositeModel>;
export type AssetCompositeModels = AssetCompositeModel[];
export const AssetCompositeModels = /*@__PURE__*/ S.Array(AssetCompositeModel);
export interface AssetCompositeModelPathSegment {
  id?: string;
  name?: string;
}
export const AssetCompositeModelPathSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), name: S.optional(S.String) }),
).annotate({
  identifier: "AssetCompositeModelPathSegment",
}) as any as S.Schema<AssetCompositeModelPathSegment>;
export type AssetCompositeModelPath = AssetCompositeModelPathSegment[];
export const AssetCompositeModelPath = /*@__PURE__*/ S.Array(
  AssetCompositeModelPathSegment,
);
export interface AssetCompositeModelSummary {
  id: string;
  externalId?: string;
  name: string;
  type: string;
  description: string;
  path: AssetCompositeModelPathSegment[];
}
export const AssetCompositeModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    name: S.String,
    type: S.String,
    description: S.String,
    path: AssetCompositeModelPath,
  }),
).annotate({
  identifier: "AssetCompositeModelSummary",
}) as any as S.Schema<AssetCompositeModelSummary>;
export type AssetCompositeModelSummaries = AssetCompositeModelSummary[];
export const AssetCompositeModelSummaries = /*@__PURE__*/ S.Array(
  AssetCompositeModelSummary,
);
export interface DescribeAssetResponse {
  assetId: string;
  assetExternalId?: string;
  assetArn: string;
  assetName: string;
  assetModelId: string;
  assetProperties: AssetProperty[];
  assetHierarchies: AssetHierarchy[];
  assetCompositeModels?: AssetCompositeModel[];
  assetCreationDate: Date;
  assetLastUpdateDate: Date;
  assetStatus: AssetStatus;
  assetDescription?: string;
  assetCompositeModelSummaries?: AssetCompositeModelSummary[];
}
export const DescribeAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String,
    assetExternalId: S.optional(S.String),
    assetArn: S.String,
    assetName: S.String,
    assetModelId: S.String,
    assetProperties: AssetProperties,
    assetHierarchies: AssetHierarchies,
    assetCompositeModels: S.optional(AssetCompositeModels),
    assetCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    assetLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    assetStatus: AssetStatus,
    assetDescription: S.optional(S.String),
    assetCompositeModelSummaries: S.optional(AssetCompositeModelSummaries),
  }),
).annotate({
  identifier: "DescribeAssetResponse",
}) as any as S.Schema<DescribeAssetResponse>;
export interface DescribeAssetCompositeModelRequest {
  assetId: string;
  assetCompositeModelId: string;
}
export const DescribeAssetCompositeModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    assetCompositeModelId: S.String.pipe(T.HttpLabel("assetCompositeModelId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/assets/{assetId}/composite-models/{assetCompositeModelId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssetCompositeModelRequest",
}) as any as S.Schema<DescribeAssetCompositeModelRequest>;
export interface ActionDefinition {
  actionDefinitionId: string;
  actionName: string;
  actionType: string;
}
export const ActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionDefinitionId: S.String,
    actionName: S.String,
    actionType: S.String,
  }),
).annotate({
  identifier: "ActionDefinition",
}) as any as S.Schema<ActionDefinition>;
export type ActionDefinitions = ActionDefinition[];
export const ActionDefinitions = /*@__PURE__*/ S.Array(ActionDefinition);
export interface DescribeAssetCompositeModelResponse {
  assetId: string;
  assetCompositeModelId: string;
  assetCompositeModelExternalId?: string;
  assetCompositeModelPath: AssetCompositeModelPathSegment[];
  assetCompositeModelName: string;
  assetCompositeModelDescription: string;
  assetCompositeModelType: string;
  assetCompositeModelProperties: AssetProperty[];
  assetCompositeModelSummaries: AssetCompositeModelSummary[];
  actionDefinitions?: ActionDefinition[];
}
export const DescribeAssetCompositeModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String,
    assetCompositeModelId: S.String,
    assetCompositeModelExternalId: S.optional(S.String),
    assetCompositeModelPath: AssetCompositeModelPath,
    assetCompositeModelName: S.String,
    assetCompositeModelDescription: S.String,
    assetCompositeModelType: S.String,
    assetCompositeModelProperties: AssetProperties,
    assetCompositeModelSummaries: AssetCompositeModelSummaries,
    actionDefinitions: S.optional(ActionDefinitions),
  }),
).annotate({
  identifier: "DescribeAssetCompositeModelResponse",
}) as any as S.Schema<DescribeAssetCompositeModelResponse>;
export type AssetModelVersionFilter = string;
export interface DescribeAssetModelRequest {
  assetModelId: string;
  excludeProperties?: boolean;
  assetModelVersion?: string;
}
export const DescribeAssetModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
    excludeProperties: S.optional(S.Boolean).pipe(
      T.HttpQuery("excludeProperties"),
    ),
    assetModelVersion: S.optional(S.String).pipe(
      T.HttpQuery("assetModelVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/asset-models/{assetModelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssetModelRequest",
}) as any as S.Schema<DescribeAssetModelRequest>;
export interface AssetModelProperty {
  id?: string;
  externalId?: string;
  name: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  type: PropertyType;
  path?: AssetModelPropertyPathSegment[];
}
export const AssetModelProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
    dataType: PropertyDataType,
    dataTypeSpec: S.optional(S.String),
    unit: S.optional(S.String),
    type: PropertyType,
    path: S.optional(AssetModelPropertyPath),
  }),
).annotate({
  identifier: "AssetModelProperty",
}) as any as S.Schema<AssetModelProperty>;
export type AssetModelProperties = AssetModelProperty[];
export const AssetModelProperties = /*@__PURE__*/ S.Array(AssetModelProperty);
export interface AssetModelHierarchy {
  id?: string;
  externalId?: string;
  name: string;
  childAssetModelId: string;
}
export const AssetModelHierarchy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
    childAssetModelId: S.String,
  }),
).annotate({
  identifier: "AssetModelHierarchy",
}) as any as S.Schema<AssetModelHierarchy>;
export type AssetModelHierarchies = AssetModelHierarchy[];
export const AssetModelHierarchies = /*@__PURE__*/ S.Array(AssetModelHierarchy);
export interface AssetModelCompositeModel {
  name: string;
  description?: string;
  type: string;
  properties?: AssetModelProperty[];
  id?: string;
  externalId?: string;
}
export const AssetModelCompositeModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    type: S.String,
    properties: S.optional(AssetModelProperties),
    id: S.optional(S.String),
    externalId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetModelCompositeModel",
}) as any as S.Schema<AssetModelCompositeModel>;
export type AssetModelCompositeModels = AssetModelCompositeModel[];
export const AssetModelCompositeModels = /*@__PURE__*/ S.Array(
  AssetModelCompositeModel,
);
export interface AssetModelCompositeModelSummary {
  id: string;
  externalId?: string;
  name: string;
  type: string;
  description?: string;
  path?: AssetModelCompositeModelPathSegment[];
}
export const AssetModelCompositeModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    name: S.String,
    type: S.String,
    description: S.optional(S.String),
    path: S.optional(AssetModelCompositeModelPath),
  }),
).annotate({
  identifier: "AssetModelCompositeModelSummary",
}) as any as S.Schema<AssetModelCompositeModelSummary>;
export type AssetModelCompositeModelSummaries =
  AssetModelCompositeModelSummary[];
export const AssetModelCompositeModelSummaries = /*@__PURE__*/ S.Array(
  AssetModelCompositeModelSummary,
);
export type Version = string;
export interface InterfaceRelationship {
  id: string;
}
export const InterfaceRelationship = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({
  identifier: "InterfaceRelationship",
}) as any as S.Schema<InterfaceRelationship>;
export type InterfaceDetails = InterfaceRelationship[];
export const InterfaceDetails = /*@__PURE__*/ S.Array(InterfaceRelationship);
export interface DescribeAssetModelResponse {
  assetModelId: string;
  assetModelExternalId?: string;
  assetModelArn: string;
  assetModelName: string;
  assetModelType?: AssetModelType;
  assetModelDescription: string;
  assetModelProperties: AssetModelProperty[];
  assetModelHierarchies: AssetModelHierarchy[];
  assetModelCompositeModels?: AssetModelCompositeModel[];
  assetModelCompositeModelSummaries?: AssetModelCompositeModelSummary[];
  assetModelCreationDate: Date;
  assetModelLastUpdateDate: Date;
  assetModelStatus: AssetModelStatus;
  assetModelVersion?: string;
  interfaceDetails?: InterfaceRelationship[];
  eTag?: string;
}
export const DescribeAssetModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String,
    assetModelExternalId: S.optional(S.String),
    assetModelArn: S.String,
    assetModelName: S.String,
    assetModelType: S.optional(AssetModelType),
    assetModelDescription: S.String,
    assetModelProperties: AssetModelProperties,
    assetModelHierarchies: AssetModelHierarchies,
    assetModelCompositeModels: S.optional(AssetModelCompositeModels),
    assetModelCompositeModelSummaries: S.optional(
      AssetModelCompositeModelSummaries,
    ),
    assetModelCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    assetModelLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    assetModelStatus: AssetModelStatus,
    assetModelVersion: S.optional(S.String),
    interfaceDetails: S.optional(InterfaceDetails),
    eTag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "DescribeAssetModelResponse",
}) as any as S.Schema<DescribeAssetModelResponse>;
export interface DescribeAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelVersion?: string;
}
export const DescribeAssetModelCompositeModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      assetModelCompositeModelId: S.String.pipe(
        T.HttpLabel("assetModelCompositeModelId"),
      ),
      assetModelVersion: S.optional(S.String).pipe(
        T.HttpQuery("assetModelVersion"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/asset-models/{assetModelId}/composite-models/{assetModelCompositeModelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeAssetModelCompositeModelRequest",
}) as any as S.Schema<DescribeAssetModelCompositeModelRequest>;
export interface CompositionRelationshipItem {
  id?: string;
}
export const CompositionRelationshipItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String) }),
).annotate({
  identifier: "CompositionRelationshipItem",
}) as any as S.Schema<CompositionRelationshipItem>;
export type CompositionRelationship = CompositionRelationshipItem[];
export const CompositionRelationship = /*@__PURE__*/ S.Array(
  CompositionRelationshipItem,
);
export interface CompositionDetails {
  compositionRelationship?: CompositionRelationshipItem[];
}
export const CompositionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ compositionRelationship: S.optional(CompositionRelationship) }),
).annotate({
  identifier: "CompositionDetails",
}) as any as S.Schema<CompositionDetails>;
export interface DescribeAssetModelCompositeModelResponse {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelCompositeModelExternalId?: string;
  assetModelCompositeModelPath: AssetModelCompositeModelPathSegment[];
  assetModelCompositeModelName: string;
  assetModelCompositeModelDescription: string;
  assetModelCompositeModelType: string;
  assetModelCompositeModelProperties: AssetModelProperty[];
  compositionDetails?: CompositionDetails;
  assetModelCompositeModelSummaries: AssetModelCompositeModelSummary[];
  actionDefinitions?: ActionDefinition[];
}
export const DescribeAssetModelCompositeModelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelId: S.String,
      assetModelCompositeModelId: S.String,
      assetModelCompositeModelExternalId: S.optional(S.String),
      assetModelCompositeModelPath: AssetModelCompositeModelPath,
      assetModelCompositeModelName: S.String,
      assetModelCompositeModelDescription: S.String,
      assetModelCompositeModelType: S.String,
      assetModelCompositeModelProperties: AssetModelProperties,
      compositionDetails: S.optional(CompositionDetails),
      assetModelCompositeModelSummaries: AssetModelCompositeModelSummaries,
      actionDefinitions: S.optional(ActionDefinitions),
    }),
).annotate({
  identifier: "DescribeAssetModelCompositeModelResponse",
}) as any as S.Schema<DescribeAssetModelCompositeModelResponse>;
export interface DescribeAssetModelInterfaceRelationshipRequest {
  assetModelId: string;
  interfaceAssetModelId: string;
}
export const DescribeAssetModelInterfaceRelationshipRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      interfaceAssetModelId: S.String.pipe(
        T.HttpLabel("interfaceAssetModelId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/asset-models/{assetModelId}/interface/{interfaceAssetModelId}/asset-model-interface-relationship",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeAssetModelInterfaceRelationshipRequest",
  }) as any as S.Schema<DescribeAssetModelInterfaceRelationshipRequest>;
export interface PropertyMapping {
  assetModelPropertyId: string;
  interfaceAssetModelPropertyId: string;
}
export const PropertyMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelPropertyId: S.String,
    interfaceAssetModelPropertyId: S.String,
  }),
).annotate({
  identifier: "PropertyMapping",
}) as any as S.Schema<PropertyMapping>;
export type PropertyMappings = PropertyMapping[];
export const PropertyMappings = /*@__PURE__*/ S.Array(PropertyMapping);
export interface HierarchyMapping {
  assetModelHierarchyId: string;
  interfaceAssetModelHierarchyId: string;
}
export const HierarchyMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelHierarchyId: S.String,
    interfaceAssetModelHierarchyId: S.String,
  }),
).annotate({
  identifier: "HierarchyMapping",
}) as any as S.Schema<HierarchyMapping>;
export type HierarchyMappings = HierarchyMapping[];
export const HierarchyMappings = /*@__PURE__*/ S.Array(HierarchyMapping);
export interface DescribeAssetModelInterfaceRelationshipResponse {
  assetModelId: string;
  interfaceAssetModelId: string;
  propertyMappings: PropertyMapping[];
  hierarchyMappings: HierarchyMapping[];
}
export const DescribeAssetModelInterfaceRelationshipResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetModelId: S.String,
      interfaceAssetModelId: S.String,
      propertyMappings: PropertyMappings,
      hierarchyMappings: HierarchyMappings,
    }),
  ).annotate({
    identifier: "DescribeAssetModelInterfaceRelationshipResponse",
  }) as any as S.Schema<DescribeAssetModelInterfaceRelationshipResponse>;
export interface DescribeAssetPropertyRequest {
  assetId: string;
  propertyId: string;
}
export const DescribeAssetPropertyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    propertyId: S.String.pipe(T.HttpLabel("propertyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/assets/{assetId}/properties/{propertyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssetPropertyRequest",
}) as any as S.Schema<DescribeAssetPropertyRequest>;
export interface Property {
  id: string;
  externalId?: string;
  name: string;
  alias?: string;
  notification?: PropertyNotification;
  dataType: PropertyDataType;
  unit?: string;
  type?: PropertyType;
  path?: AssetPropertyPathSegment[];
}
export const Property = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    name: S.String,
    alias: S.optional(S.String),
    notification: S.optional(PropertyNotification),
    dataType: PropertyDataType,
    unit: S.optional(S.String),
    type: S.optional(PropertyType),
    path: S.optional(AssetPropertyPath),
  }),
).annotate({ identifier: "Property" }) as any as S.Schema<Property>;
export interface CompositeModelProperty {
  name: string;
  type: string;
  assetProperty: Property;
  id?: string;
  externalId?: string;
}
export const CompositeModelProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: S.String,
    assetProperty: Property,
    id: S.optional(S.String),
    externalId: S.optional(S.String),
  }),
).annotate({
  identifier: "CompositeModelProperty",
}) as any as S.Schema<CompositeModelProperty>;
export interface DescribeAssetPropertyResponse {
  assetId: string;
  assetExternalId?: string;
  assetName: string;
  assetModelId: string;
  assetProperty?: Property;
  compositeModel?: CompositeModelProperty;
}
export const DescribeAssetPropertyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String,
    assetExternalId: S.optional(S.String),
    assetName: S.String,
    assetModelId: S.String,
    assetProperty: S.optional(Property),
    compositeModel: S.optional(CompositeModelProperty),
  }),
).annotate({
  identifier: "DescribeAssetPropertyResponse",
}) as any as S.Schema<DescribeAssetPropertyResponse>;
export interface DescribeBulkImportJobRequest {
  jobId: string;
}
export const DescribeBulkImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBulkImportJobRequest",
}) as any as S.Schema<DescribeBulkImportJobRequest>;
export interface DescribeBulkImportJobResponse {
  jobId: string;
  jobName: string;
  jobStatus: JobStatus;
  jobRoleArn: string;
  files: File[];
  errorReportLocation: ErrorReportLocation;
  jobConfiguration: JobConfiguration;
  jobCreationDate: Date;
  jobLastUpdateDate: Date;
  adaptiveIngestion?: boolean;
  deleteFilesAfterImport?: boolean;
}
export const DescribeBulkImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    jobName: S.String,
    jobStatus: JobStatus,
    jobRoleArn: S.String,
    files: Files,
    errorReportLocation: ErrorReportLocation,
    jobConfiguration: JobConfiguration,
    jobCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    jobLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    adaptiveIngestion: S.optional(S.Boolean),
    deleteFilesAfterImport: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DescribeBulkImportJobResponse",
}) as any as S.Schema<DescribeBulkImportJobResponse>;
export type ComputationModelVersionFilter = string;
export interface DescribeComputationModelRequest {
  computationModelId: string;
  computationModelVersion?: string;
}
export const DescribeComputationModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelId: S.String.pipe(T.HttpLabel("computationModelId")),
    computationModelVersion: S.optional(S.String).pipe(
      T.HttpQuery("computationModelVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/computation-models/{computationModelId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeComputationModelRequest",
}) as any as S.Schema<DescribeComputationModelRequest>;
export interface DescribeComputationModelResponse {
  computationModelId: string;
  computationModelArn: string;
  computationModelName: string;
  computationModelDescription?: string;
  computationModelConfiguration: ComputationModelConfiguration;
  computationModelDataBinding: {
    [key: string]: ComputationModelDataBindingValue | undefined;
  };
  computationModelCreationDate: Date;
  computationModelLastUpdateDate: Date;
  computationModelStatus: ComputationModelStatus;
  computationModelVersion: string;
  actionDefinitions: ActionDefinition[];
}
export const DescribeComputationModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelId: S.String,
    computationModelArn: S.String,
    computationModelName: S.String,
    computationModelDescription: S.optional(S.String),
    computationModelConfiguration: ComputationModelConfiguration,
    computationModelDataBinding: ComputationModelDataBinding,
    computationModelCreationDate: S.Date.pipe(
      T.TimestampFormat("epoch-seconds"),
    ),
    computationModelLastUpdateDate: S.Date.pipe(
      T.TimestampFormat("epoch-seconds"),
    ),
    computationModelStatus: ComputationModelStatus,
    computationModelVersion: S.String,
    actionDefinitions: ActionDefinitions,
  }),
).annotate({
  identifier: "DescribeComputationModelResponse",
}) as any as S.Schema<DescribeComputationModelResponse>;
export type ResolveToResourceType = "ASSET" | (string & {});
export const ResolveToResourceType = /*@__PURE__*/ S.String;

export interface DescribeComputationModelExecutionSummaryRequest {
  computationModelId: string;
  resolveToResourceType?: ResolveToResourceType;
  resolveToResourceId?: string;
}
export const DescribeComputationModelExecutionSummaryRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      computationModelId: S.String.pipe(T.HttpLabel("computationModelId")),
      resolveToResourceType: S.optional(ResolveToResourceType).pipe(
        T.HttpQuery("resolveToResourceType"),
      ),
      resolveToResourceId: S.optional(S.String).pipe(
        T.HttpQuery("resolveToResourceId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/computation-models/{computationModelId}/execution-summary",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeComputationModelExecutionSummaryRequest",
  }) as any as S.Schema<DescribeComputationModelExecutionSummaryRequest>;
export type ComputationModelExecutionSummaryKey = string;
export type ComputationModelExecutionSummaryValue = string;
export type ComputationModelExecutionSummary = {
  [key: string]: string | undefined;
};
export const ComputationModelExecutionSummary = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DescribeComputationModelExecutionSummaryResponse {
  computationModelId: string;
  resolveTo?: ResolveTo;
  computationModelExecutionSummary: { [key: string]: string | undefined };
}
export const DescribeComputationModelExecutionSummaryResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      computationModelId: S.String,
      resolveTo: S.optional(ResolveTo),
      computationModelExecutionSummary: ComputationModelExecutionSummary,
    }),
  ).annotate({
    identifier: "DescribeComputationModelExecutionSummaryResponse",
  }) as any as S.Schema<DescribeComputationModelExecutionSummaryResponse>;
export interface DescribeDashboardRequest {
  dashboardId: string;
}
export const DescribeDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dashboardId: S.String.pipe(T.HttpLabel("dashboardId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dashboards/{dashboardId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDashboardRequest",
}) as any as S.Schema<DescribeDashboardRequest>;
export interface DescribeDashboardResponse {
  dashboardId: string;
  dashboardArn: string;
  dashboardName: string;
  projectId: string;
  dashboardDescription?: string;
  dashboardDefinition: string;
  dashboardCreationDate: Date;
  dashboardLastUpdateDate: Date;
}
export const DescribeDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dashboardId: S.String,
    dashboardArn: S.String,
    dashboardName: S.String,
    projectId: S.String,
    dashboardDescription: S.optional(S.String),
    dashboardDefinition: S.String,
    dashboardCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    dashboardLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DescribeDashboardResponse",
}) as any as S.Schema<DescribeDashboardResponse>;
export interface DescribeDatasetRequest {
  datasetId: string;
}
export const DescribeDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetId: S.String.pipe(T.HttpLabel("datasetId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export interface DescribeDatasetResponse {
  datasetId: string;
  datasetArn: string;
  datasetName: string;
  datasetDescription: string;
  datasetSource: DatasetSource;
  datasetStatus: DatasetStatus;
  datasetCreationDate: Date;
  datasetLastUpdateDate: Date;
  datasetVersion?: string;
}
export const DescribeDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String,
    datasetArn: S.String,
    datasetName: S.String,
    datasetDescription: S.String,
    datasetSource: DatasetSource,
    datasetStatus: DatasetStatus,
    datasetCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    datasetLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    datasetVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export interface DescribeDefaultEncryptionConfigurationRequest {}
export const DescribeDefaultEncryptionConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/configuration/account/encryption" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeDefaultEncryptionConfigurationRequest",
  }) as any as S.Schema<DescribeDefaultEncryptionConfigurationRequest>;
export type EncryptionType =
  | "SITEWISE_DEFAULT_ENCRYPTION"
  | "KMS_BASED_ENCRYPTION"
  | (string & {});
export const EncryptionType = /*@__PURE__*/ S.String;

export type ConfigurationState =
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | (string & {});
export const ConfigurationState = /*@__PURE__*/ S.String;

export interface ConfigurationErrorDetails {
  code: ErrorCode;
  message: string;
}
export const ConfigurationErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: ErrorCode, message: S.String }),
).annotate({
  identifier: "ConfigurationErrorDetails",
}) as any as S.Schema<ConfigurationErrorDetails>;
export interface ConfigurationStatus {
  state: ConfigurationState;
  error?: ConfigurationErrorDetails;
}
export const ConfigurationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    state: ConfigurationState,
    error: S.optional(ConfigurationErrorDetails),
  }),
).annotate({
  identifier: "ConfigurationStatus",
}) as any as S.Schema<ConfigurationStatus>;
export interface DescribeDefaultEncryptionConfigurationResponse {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  configurationStatus: ConfigurationStatus;
}
export const DescribeDefaultEncryptionConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      encryptionType: EncryptionType,
      kmsKeyArn: S.optional(S.String),
      configurationStatus: ConfigurationStatus,
    }),
  ).annotate({
    identifier: "DescribeDefaultEncryptionConfigurationResponse",
  }) as any as S.Schema<DescribeDefaultEncryptionConfigurationResponse>;
export interface DescribeExecutionRequest {
  executionId: string;
}
export const DescribeExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionId: S.String.pipe(T.HttpLabel("executionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/executions/{executionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExecutionRequest",
}) as any as S.Schema<DescribeExecutionRequest>;
export type ExecutionState = "RUNNING" | "COMPLETED" | "FAILED" | (string & {});
export const ExecutionState = /*@__PURE__*/ S.String;

export interface ExecutionStatus {
  state: ExecutionState;
}
export const ExecutionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: ExecutionState }),
).annotate({
  identifier: "ExecutionStatus",
}) as any as S.Schema<ExecutionStatus>;
export type ExecutionResultKey = string;
export type ExecutionResultValue = string;
export type ExecutionResult = { [key: string]: string | undefined };
export const ExecutionResult = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ExecutionDetailsKey = string;
export type ExecutionDetailsValue = string;
export type ExecutionDetails = { [key: string]: string | undefined };
export const ExecutionDetails = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DescribeExecutionResponse {
  executionId: string;
  actionType?: string;
  targetResource: TargetResource;
  targetResourceVersion: string;
  resolveTo?: ResolveTo;
  executionStartTime: Date;
  executionEndTime?: Date;
  executionStatus: ExecutionStatus;
  executionResult?: { [key: string]: string | undefined };
  executionDetails?: { [key: string]: string | undefined };
  executionEntityVersion?: string;
}
export const DescribeExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String,
    actionType: S.optional(S.String),
    targetResource: TargetResource,
    targetResourceVersion: S.String,
    resolveTo: S.optional(ResolveTo),
    executionStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    executionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    executionStatus: ExecutionStatus,
    executionResult: S.optional(ExecutionResult),
    executionDetails: S.optional(ExecutionDetails),
    executionEntityVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeExecutionResponse",
}) as any as S.Schema<DescribeExecutionResponse>;
export interface DescribeGatewayRequest {
  gatewayId: string;
}
export const DescribeGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/20200301/gateways/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGatewayRequest",
}) as any as S.Schema<DescribeGatewayRequest>;
export type CapabilityNamespace = string;
export type CapabilitySyncStatus =
  | "IN_SYNC"
  | "OUT_OF_SYNC"
  | "SYNC_FAILED"
  | "UNKNOWN"
  | "NOT_APPLICABLE"
  | (string & {});
export const CapabilitySyncStatus = /*@__PURE__*/ S.String;

export interface GatewayCapabilitySummary {
  capabilityNamespace: string;
  capabilitySyncStatus: CapabilitySyncStatus;
}
export const GatewayCapabilitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilityNamespace: S.String,
    capabilitySyncStatus: CapabilitySyncStatus,
  }),
).annotate({
  identifier: "GatewayCapabilitySummary",
}) as any as S.Schema<GatewayCapabilitySummary>;
export type GatewayCapabilitySummaries = GatewayCapabilitySummary[];
export const GatewayCapabilitySummaries = /*@__PURE__*/ S.Array(
  GatewayCapabilitySummary,
);
export interface DescribeGatewayResponse {
  gatewayId: string;
  gatewayName: string;
  gatewayArn: string;
  gatewayPlatform?: GatewayPlatform;
  gatewayVersion?: string;
  gatewayCapabilitySummaries: GatewayCapabilitySummary[];
  creationDate: Date;
  lastUpdateDate: Date;
}
export const DescribeGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    gatewayName: S.String,
    gatewayArn: S.String,
    gatewayPlatform: S.optional(GatewayPlatform),
    gatewayVersion: S.optional(S.String),
    gatewayCapabilitySummaries: GatewayCapabilitySummaries,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DescribeGatewayResponse",
}) as any as S.Schema<DescribeGatewayResponse>;
export interface DescribeGatewayCapabilityConfigurationRequest {
  gatewayId: string;
  capabilityNamespace: string;
}
export const DescribeGatewayCapabilityConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
      capabilityNamespace: S.String.pipe(T.HttpLabel("capabilityNamespace")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/20200301/gateways/{gatewayId}/capability/{capabilityNamespace}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeGatewayCapabilityConfigurationRequest",
  }) as any as S.Schema<DescribeGatewayCapabilityConfigurationRequest>;
export type CapabilityConfiguration = string;
export interface DescribeGatewayCapabilityConfigurationResponse {
  gatewayId: string;
  capabilityNamespace: string;
  capabilityConfiguration: string;
  capabilitySyncStatus: CapabilitySyncStatus;
}
export const DescribeGatewayCapabilityConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      gatewayId: S.String,
      capabilityNamespace: S.String,
      capabilityConfiguration: S.String,
      capabilitySyncStatus: CapabilitySyncStatus,
    }),
  ).annotate({
    identifier: "DescribeGatewayCapabilityConfigurationResponse",
  }) as any as S.Schema<DescribeGatewayCapabilityConfigurationResponse>;
export interface DescribeLoggingOptionsRequest {}
export const DescribeLoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/logging" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLoggingOptionsRequest",
}) as any as S.Schema<DescribeLoggingOptionsRequest>;
export type LoggingLevel = "ERROR" | "INFO" | "OFF" | (string & {});
export const LoggingLevel = /*@__PURE__*/ S.String;

export interface LoggingOptions {
  level: LoggingLevel;
}
export const LoggingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ level: LoggingLevel }),
).annotate({ identifier: "LoggingOptions" }) as any as S.Schema<LoggingOptions>;
export interface DescribeLoggingOptionsResponse {
  loggingOptions: LoggingOptions;
}
export const DescribeLoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loggingOptions: LoggingOptions }),
).annotate({
  identifier: "DescribeLoggingOptionsResponse",
}) as any as S.Schema<DescribeLoggingOptionsResponse>;
export interface DescribePortalRequest {
  portalId: string;
}
export const DescribePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalId: S.String.pipe(T.HttpLabel("portalId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/portals/{portalId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePortalRequest",
}) as any as S.Schema<DescribePortalRequest>;
export type PortalClientId = string;
export interface ImageLocation {
  id: string;
  url: string;
}
export const ImageLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, url: S.String }),
).annotate({ identifier: "ImageLocation" }) as any as S.Schema<ImageLocation>;
export interface DescribePortalResponse {
  portalId: string;
  portalArn: string;
  portalName: string;
  portalDescription?: string;
  portalClientId: string;
  portalStartUrl: string;
  portalContactEmail: string | redacted.Redacted<string>;
  portalStatus: PortalStatus;
  portalCreationDate: Date;
  portalLastUpdateDate: Date;
  portalLogoImageLocation?: ImageLocation;
  roleArn?: string;
  portalAuthMode?: AuthMode;
  notificationSenderEmail?: string | redacted.Redacted<string>;
  alarms?: Alarms;
  portalType?: PortalType;
  portalTypeConfiguration?: { [key: string]: PortalTypeEntry | undefined };
}
export const DescribePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String,
    portalArn: S.String,
    portalName: S.String,
    portalDescription: S.optional(S.String),
    portalClientId: S.String,
    portalStartUrl: S.String,
    portalContactEmail: SensitiveString,
    portalStatus: PortalStatus,
    portalCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    portalLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    portalLogoImageLocation: S.optional(ImageLocation),
    roleArn: S.optional(S.String),
    portalAuthMode: S.optional(AuthMode),
    notificationSenderEmail: S.optional(SensitiveString),
    alarms: S.optional(Alarms),
    portalType: S.optional(PortalType),
    portalTypeConfiguration: S.optional(PortalTypeConfiguration),
  }),
).annotate({
  identifier: "DescribePortalResponse",
}) as any as S.Schema<DescribePortalResponse>;
export interface DescribeProjectRequest {
  projectId: string;
}
export const DescribeProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ projectId: S.String.pipe(T.HttpLabel("projectId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/projects/{projectId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProjectRequest",
}) as any as S.Schema<DescribeProjectRequest>;
export interface DescribeProjectResponse {
  projectId: string;
  projectArn: string;
  projectName: string;
  portalId: string;
  projectDescription?: string;
  projectCreationDate: Date;
  projectLastUpdateDate: Date;
}
export const DescribeProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String,
    projectArn: S.String,
    projectName: S.String,
    portalId: S.String,
    projectDescription: S.optional(S.String),
    projectCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    projectLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DescribeProjectResponse",
}) as any as S.Schema<DescribeProjectResponse>;
export interface DescribeStorageConfigurationRequest {}
export const DescribeStorageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/configuration/account/storage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStorageConfigurationRequest",
}) as any as S.Schema<DescribeStorageConfigurationRequest>;
export type StorageType =
  | "SITEWISE_DEFAULT_STORAGE"
  | "MULTI_LAYER_STORAGE"
  | (string & {});
export const StorageType = /*@__PURE__*/ S.String;

export interface CustomerManagedS3Storage {
  s3ResourceArn: string;
  roleArn: string;
}
export const CustomerManagedS3Storage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3ResourceArn: S.String, roleArn: S.String }),
).annotate({
  identifier: "CustomerManagedS3Storage",
}) as any as S.Schema<CustomerManagedS3Storage>;
export interface MultiLayerStorage {
  customerManagedS3Storage: CustomerManagedS3Storage;
}
export const MultiLayerStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customerManagedS3Storage: CustomerManagedS3Storage }),
).annotate({
  identifier: "MultiLayerStorage",
}) as any as S.Schema<MultiLayerStorage>;
export type DisassociatedDataStorageState =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const DisassociatedDataStorageState = /*@__PURE__*/ S.String;

export type NumberOfDays = number;
export type Unlimited = boolean;
export interface RetentionPeriod {
  numberOfDays?: number;
  unlimited?: boolean;
}
export const RetentionPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfDays: S.optional(S.Number),
    unlimited: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RetentionPeriod",
}) as any as S.Schema<RetentionPeriod>;
export type WarmTierState = "ENABLED" | "DISABLED" | (string & {});
export const WarmTierState = /*@__PURE__*/ S.String;

export interface WarmTierRetentionPeriod {
  numberOfDays?: number;
  unlimited?: boolean;
}
export const WarmTierRetentionPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfDays: S.optional(S.Number),
    unlimited: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WarmTierRetentionPeriod",
}) as any as S.Schema<WarmTierRetentionPeriod>;
export type DisallowIngestNullNaN = boolean;
export interface DescribeStorageConfigurationResponse {
  storageType: StorageType;
  multiLayerStorage?: MultiLayerStorage;
  disassociatedDataStorage?: DisassociatedDataStorageState;
  retentionPeriod?: RetentionPeriod;
  configurationStatus: ConfigurationStatus;
  lastUpdateDate?: Date;
  warmTier?: WarmTierState;
  warmTierRetentionPeriod?: WarmTierRetentionPeriod;
  disallowIngestNullNaN?: boolean;
}
export const DescribeStorageConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      storageType: StorageType,
      multiLayerStorage: S.optional(MultiLayerStorage),
      disassociatedDataStorage: S.optional(DisassociatedDataStorageState),
      retentionPeriod: S.optional(RetentionPeriod),
      configurationStatus: ConfigurationStatus,
      lastUpdateDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      warmTier: S.optional(WarmTierState),
      warmTierRetentionPeriod: S.optional(WarmTierRetentionPeriod),
      disallowIngestNullNaN: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "DescribeStorageConfigurationResponse",
}) as any as S.Schema<DescribeStorageConfigurationResponse>;
export interface DescribeTimeSeriesRequest {
  alias?: string;
  assetId?: string;
  propertyId?: string;
}
export const DescribeTimeSeriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
    assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    propertyId: S.optional(S.String).pipe(T.HttpQuery("propertyId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/timeseries/describe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTimeSeriesRequest",
}) as any as S.Schema<DescribeTimeSeriesRequest>;
export type TimeSeriesId = string;
export interface DescribeTimeSeriesResponse {
  assetId?: string;
  propertyId?: string;
  alias?: string;
  timeSeriesId: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  timeSeriesCreationDate: Date;
  timeSeriesLastUpdateDate: Date;
  timeSeriesArn: string;
}
export const DescribeTimeSeriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String),
    propertyId: S.optional(S.String),
    alias: S.optional(S.String),
    timeSeriesId: S.String,
    dataType: PropertyDataType,
    dataTypeSpec: S.optional(S.String),
    timeSeriesCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    timeSeriesLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    timeSeriesArn: S.String,
  }),
).annotate({
  identifier: "DescribeTimeSeriesResponse",
}) as any as S.Schema<DescribeTimeSeriesResponse>;
export interface DisassociateAssetsRequest {
  assetId: string;
  hierarchyId: string;
  childAssetId: string;
  clientToken?: string;
}
export const DisassociateAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    hierarchyId: S.String,
    childAssetId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assets/{assetId}/disassociate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateAssetsRequest",
}) as any as S.Schema<DisassociateAssetsRequest>;
export interface DisassociateAssetsResponse {}
export const DisassociateAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateAssetsResponse",
}) as any as S.Schema<DisassociateAssetsResponse>;
export interface DisassociateTimeSeriesFromAssetPropertyRequest {
  alias: string;
  assetId: string;
  propertyId: string;
  clientToken?: string;
}
export const DisassociateTimeSeriesFromAssetPropertyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      alias: S.String.pipe(T.HttpQuery("alias")),
      assetId: S.String.pipe(T.HttpQuery("assetId")),
      propertyId: S.String.pipe(T.HttpQuery("propertyId")),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/timeseries/disassociate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateTimeSeriesFromAssetPropertyRequest",
  }) as any as S.Schema<DisassociateTimeSeriesFromAssetPropertyRequest>;
export interface DisassociateTimeSeriesFromAssetPropertyResponse {}
export const DisassociateTimeSeriesFromAssetPropertyResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateTimeSeriesFromAssetPropertyResponse",
  }) as any as S.Schema<DisassociateTimeSeriesFromAssetPropertyResponse>;
export interface ExecuteActionRequest {
  targetResource: TargetResource;
  actionDefinitionId: string;
  actionPayload: ActionPayload;
  clientToken?: string;
  resolveTo?: ResolveTo;
}
export const ExecuteActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetResource: TargetResource,
    actionDefinitionId: S.String,
    actionPayload: ActionPayload,
    clientToken: S.optional(S.String),
    resolveTo: S.optional(ResolveTo),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteActionRequest",
}) as any as S.Schema<ExecuteActionRequest>;
export interface ExecuteActionResponse {
  actionId: string;
}
export const ExecuteActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionId: S.String }),
).annotate({
  identifier: "ExecuteActionResponse",
}) as any as S.Schema<ExecuteActionResponse>;
export type QueryStatement = string;
export type ExecuteQueryNextToken = string;
export type ExecuteQueryMaxResults = number;
export interface ExecuteQueryRequest {
  queryStatement: string;
  nextToken?: string;
  maxResults?: number;
  clientToken?: string;
}
export const ExecuteQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    queryStatement: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/queries/execution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteQueryRequest",
}) as any as S.Schema<ExecuteQueryRequest>;
export type ScalarType =
  | "BOOLEAN"
  | "INT"
  | "DOUBLE"
  | "TIMESTAMP"
  | "STRING"
  | (string & {});
export const ScalarType = /*@__PURE__*/ S.String;

export interface ColumnType {
  scalarType?: ScalarType;
}
export const ColumnType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scalarType: S.optional(ScalarType) }),
).annotate({ identifier: "ColumnType" }) as any as S.Schema<ColumnType>;
export interface ColumnInfo {
  name?: string;
  type?: ColumnType;
}
export const ColumnInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), type: S.optional(ColumnType) }),
).annotate({ identifier: "ColumnInfo" }) as any as S.Schema<ColumnInfo>;
export type ColumnsList = ColumnInfo[];
export const ColumnsList = /*@__PURE__*/ S.Array(ColumnInfo);
export type ScalarValue = string;
export interface Datum {
  scalarValue?: string;
  arrayValue?: Datum[];
  rowValue?: Row;
  nullValue?: boolean;
}
export const Datum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scalarValue: S.optional(S.String),
    arrayValue: S.optional(
      S.suspend(() => DatumList).annotate({ identifier: "DatumList" }),
    ),
    rowValue: S.optional(
      S.suspend((): S.Schema<Row> => Row).annotate({ identifier: "Row" }),
    ),
    nullValue: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Datum" }) as any as S.Schema<Datum>;
export type DatumList = Datum[];
export const DatumList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Datum> => Datum).annotate({ identifier: "Datum" }),
) as any as S.Schema<DatumList>;
export interface Row {
  data: Datum[];
}
export const Row = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.suspend(() => DatumList).annotate({ identifier: "DatumList" }),
  }),
).annotate({ identifier: "Row" }) as any as S.Schema<Row>;
export type Rows = Row[];
export const Rows = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Row> => Row).annotate({ identifier: "Row" }),
);
export interface ExecuteQueryResponse {
  columns?: ColumnInfo[];
  rows?: Row[];
  nextToken?: string;
}
export const ExecuteQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columns: S.optional(ColumnsList),
    rows: S.optional(Rows),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecuteQueryResponse",
}) as any as S.Schema<ExecuteQueryResponse>;
export type GetAssetPropertyValueAggregatesMaxResults = number;
export interface GetAssetPropertyAggregatesRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  aggregateTypes: AggregateType[];
  resolution: string;
  qualities?: Quality[];
  startDate: Date;
  endDate: Date;
  timeOrdering?: TimeOrdering;
  nextToken?: string;
  maxResults?: number;
}
export const GetAssetPropertyAggregatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    propertyId: S.optional(S.String).pipe(T.HttpQuery("propertyId")),
    propertyAlias: S.optional(S.String).pipe(T.HttpQuery("propertyAlias")),
    aggregateTypes: AggregateTypes.pipe(T.HttpQuery("aggregateTypes")),
    resolution: S.String.pipe(T.HttpQuery("resolution")),
    qualities: S.optional(Qualities).pipe(T.HttpQuery("qualities")),
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("startDate"),
    ),
    endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("endDate"),
    ),
    timeOrdering: S.optional(TimeOrdering).pipe(T.HttpQuery("timeOrdering")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/properties/aggregates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetPropertyAggregatesRequest",
}) as any as S.Schema<GetAssetPropertyAggregatesRequest>;
export interface GetAssetPropertyAggregatesResponse {
  aggregatedValues: AggregatedValue[];
  nextToken?: string;
}
export const GetAssetPropertyAggregatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aggregatedValues: AggregatedValues,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAssetPropertyAggregatesResponse",
}) as any as S.Schema<GetAssetPropertyAggregatesResponse>;
export interface GetAssetPropertyValueRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
}
export const GetAssetPropertyValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    propertyId: S.optional(S.String).pipe(T.HttpQuery("propertyId")),
    propertyAlias: S.optional(S.String).pipe(T.HttpQuery("propertyAlias")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/properties/latest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetPropertyValueRequest",
}) as any as S.Schema<GetAssetPropertyValueRequest>;
export interface GetAssetPropertyValueResponse {
  propertyValue?: AssetPropertyValue;
}
export const GetAssetPropertyValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ propertyValue: S.optional(AssetPropertyValue) }),
).annotate({
  identifier: "GetAssetPropertyValueResponse",
}) as any as S.Schema<GetAssetPropertyValueResponse>;
export type GetAssetPropertyValueHistoryMaxResults = number;
export interface GetAssetPropertyValueHistoryRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  startDate?: Date;
  endDate?: Date;
  qualities?: Quality[];
  timeOrdering?: TimeOrdering;
  nextToken?: string;
  maxResults?: number;
}
export const GetAssetPropertyValueHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    propertyId: S.optional(S.String).pipe(T.HttpQuery("propertyId")),
    propertyAlias: S.optional(S.String).pipe(T.HttpQuery("propertyAlias")),
    startDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startDate"),
    ),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endDate"),
    ),
    qualities: S.optional(Qualities).pipe(T.HttpQuery("qualities")),
    timeOrdering: S.optional(TimeOrdering).pipe(T.HttpQuery("timeOrdering")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/properties/history" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetPropertyValueHistoryRequest",
}) as any as S.Schema<GetAssetPropertyValueHistoryRequest>;
export interface GetAssetPropertyValueHistoryResponse {
  assetPropertyValueHistory: AssetPropertyValue[];
  nextToken?: string;
}
export const GetAssetPropertyValueHistoryResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetPropertyValueHistory: AssetPropertyValueHistory,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetAssetPropertyValueHistoryResponse",
}) as any as S.Schema<GetAssetPropertyValueHistoryResponse>;
export type IntervalInSeconds = number;
export type MaxInterpolatedResults = number;
export type InterpolationType = string;
export type IntervalWindowInSeconds = number;
export interface GetInterpolatedAssetPropertyValuesRequest {
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  startTimeInSeconds: number;
  startTimeOffsetInNanos?: number;
  endTimeInSeconds: number;
  endTimeOffsetInNanos?: number;
  quality: Quality;
  intervalInSeconds: number;
  nextToken?: string;
  maxResults?: number;
  type: string;
  intervalWindowInSeconds?: number;
}
export const GetInterpolatedAssetPropertyValuesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
      propertyId: S.optional(S.String).pipe(T.HttpQuery("propertyId")),
      propertyAlias: S.optional(S.String).pipe(T.HttpQuery("propertyAlias")),
      startTimeInSeconds: S.Number.pipe(T.HttpQuery("startTimeInSeconds")),
      startTimeOffsetInNanos: S.optional(S.Number).pipe(
        T.HttpQuery("startTimeOffsetInNanos"),
      ),
      endTimeInSeconds: S.Number.pipe(T.HttpQuery("endTimeInSeconds")),
      endTimeOffsetInNanos: S.optional(S.Number).pipe(
        T.HttpQuery("endTimeOffsetInNanos"),
      ),
      quality: Quality.pipe(T.HttpQuery("quality")),
      intervalInSeconds: S.Number.pipe(T.HttpQuery("intervalInSeconds")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      type: S.String.pipe(T.HttpQuery("type")),
      intervalWindowInSeconds: S.optional(S.Number).pipe(
        T.HttpQuery("intervalWindowInSeconds"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/properties/interpolated" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetInterpolatedAssetPropertyValuesRequest",
  }) as any as S.Schema<GetInterpolatedAssetPropertyValuesRequest>;
export interface InterpolatedAssetPropertyValue {
  timestamp: TimeInNanos;
  value: Variant;
}
export const InterpolatedAssetPropertyValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timestamp: TimeInNanos, value: Variant }),
).annotate({
  identifier: "InterpolatedAssetPropertyValue",
}) as any as S.Schema<InterpolatedAssetPropertyValue>;
export type InterpolatedAssetPropertyValues = InterpolatedAssetPropertyValue[];
export const InterpolatedAssetPropertyValues = /*@__PURE__*/ S.Array(
  InterpolatedAssetPropertyValue,
);
export interface GetInterpolatedAssetPropertyValuesResponse {
  interpolatedAssetPropertyValues: InterpolatedAssetPropertyValue[];
  nextToken?: string;
}
export const GetInterpolatedAssetPropertyValuesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      interpolatedAssetPropertyValues: InterpolatedAssetPropertyValues,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetInterpolatedAssetPropertyValuesResponse",
  }) as any as S.Schema<GetInterpolatedAssetPropertyValuesResponse>;
export type ConversationId = string;
export type MessageInput = string | redacted.Redacted<string>;
export interface InvokeAssistantRequest {
  conversationId?: string;
  message: string | redacted.Redacted<string>;
  enableTrace?: boolean;
}
export const InvokeAssistantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.optional(S.String),
    message: SensitiveString,
    enableTrace: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assistant/invocation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeAssistantRequest",
}) as any as S.Schema<InvokeAssistantRequest>;
export interface Trace {
  text?: string;
}
export const Trace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({ identifier: "Trace" }) as any as S.Schema<Trace>;
export interface Location {
  uri?: string;
}
export const Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.optional(S.String) }),
).annotate({ identifier: "Location" }) as any as S.Schema<Location>;
export interface Source {
  arn?: string;
  location?: Location;
}
export const Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String), location: S.optional(Location) }),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export interface DataSetReference {
  datasetArn?: string;
  source?: Source;
}
export const DataSetReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetArn: S.optional(S.String), source: S.optional(Source) }),
).annotate({
  identifier: "DataSetReference",
}) as any as S.Schema<DataSetReference>;
export interface Reference {
  dataset?: DataSetReference;
}
export const Reference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataset: S.optional(DataSetReference) }),
).annotate({ identifier: "Reference" }) as any as S.Schema<Reference>;
export interface Content {
  text?: string;
}
export const Content = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({ identifier: "Content" }) as any as S.Schema<Content>;
export interface Citation {
  reference?: Reference;
  content?: Content;
}
export const Citation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reference: S.optional(Reference), content: S.optional(Content) }),
).annotate({ identifier: "Citation" }) as any as S.Schema<Citation>;
export type Citations = Citation[];
export const Citations = /*@__PURE__*/ S.Array(Citation);
export interface InvocationOutput {
  message?: string;
  citations?: Citation[];
}
export const InvocationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String), citations: S.optional(Citations) }),
).annotate({
  identifier: "InvocationOutput",
}) as any as S.Schema<InvocationOutput>;
export type ResourceId = string;
export type ResourceArn = string;
export type ResponseStream =
  | {
      trace: Trace;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output: InvocationOutput;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException: AccessDeniedException;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException: ConflictingOperationException;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException: InternalFailureException;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException: InvalidRequestException;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException: LimitExceededException;
      resourceNotFoundException?: never;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      throttlingException?: never;
    }
  | {
      trace?: never;
      output?: never;
      accessDeniedException?: never;
      conflictingOperationException?: never;
      internalFailureException?: never;
      invalidRequestException?: never;
      limitExceededException?: never;
      resourceNotFoundException?: never;
      throttlingException: ThrottlingException;
    };
export const ResponseStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ trace: Trace }),
    S.Struct({ output: InvocationOutput }),
    S.Struct({
      accessDeniedException: S.suspend(() => AccessDeniedException).annotate({
        identifier: "AccessDeniedException",
      }),
    }),
    S.Struct({
      conflictingOperationException: S.suspend(
        () => ConflictingOperationException,
      ).annotate({ identifier: "ConflictingOperationException" }),
    }),
    S.Struct({
      internalFailureException: S.suspend(
        () => InternalFailureException,
      ).annotate({ identifier: "InternalFailureException" }),
    }),
    S.Struct({
      invalidRequestException: S.suspend(
        () => InvalidRequestException,
      ).annotate({ identifier: "InvalidRequestException" }),
    }),
    S.Struct({
      limitExceededException: S.suspend(() => LimitExceededException).annotate({
        identifier: "LimitExceededException",
      }),
    }),
    S.Struct({
      resourceNotFoundException: S.suspend(
        () => ResourceNotFoundException,
      ).annotate({ identifier: "ResourceNotFoundException" }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
  ]),
) as any as S.Schema<stream.Stream<ResponseStream, Error, never>>;
export interface InvokeAssistantResponse {
  body: stream.Stream<ResponseStream, Error, never>;
  conversationId: string;
}
export const InvokeAssistantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    body: ResponseStream.pipe(T.HttpPayload()),
    conversationId: S.String.pipe(
      T.HttpHeader("x-amz-iotsitewise-assistant-conversation-id"),
    ),
  }),
).annotate({
  identifier: "InvokeAssistantResponse",
}) as any as S.Schema<InvokeAssistantResponse>;
export type IdentityType = "USER" | "GROUP" | "IAM" | (string & {});
export const IdentityType = /*@__PURE__*/ S.String;

export type ResourceType = "PORTAL" | "PROJECT" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type MaxResults = number;
export interface ListAccessPoliciesRequest {
  identityType?: IdentityType;
  identityId?: string;
  resourceType?: ResourceType;
  resourceId?: string;
  iamArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAccessPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityType: S.optional(IdentityType).pipe(T.HttpQuery("identityType")),
    identityId: S.optional(S.String).pipe(T.HttpQuery("identityId")),
    resourceType: S.optional(ResourceType).pipe(T.HttpQuery("resourceType")),
    resourceId: S.optional(S.String).pipe(T.HttpQuery("resourceId")),
    iamArn: S.optional(S.String).pipe(T.HttpQuery("iamArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/access-policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessPoliciesRequest",
}) as any as S.Schema<ListAccessPoliciesRequest>;
export interface AccessPolicySummary {
  id: string;
  identity: Identity;
  resource: Resource;
  permission: Permission;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
export const AccessPolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    identity: Identity,
    resource: Resource,
    permission: Permission,
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AccessPolicySummary",
}) as any as S.Schema<AccessPolicySummary>;
export type AccessPolicySummaries = AccessPolicySummary[];
export const AccessPolicySummaries = /*@__PURE__*/ S.Array(AccessPolicySummary);
export interface ListAccessPoliciesResponse {
  accessPolicySummaries: AccessPolicySummary[];
  nextToken?: string;
}
export const ListAccessPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicySummaries: AccessPolicySummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccessPoliciesResponse",
}) as any as S.Schema<ListAccessPoliciesResponse>;
export type TargetResourceType = "ASSET" | "COMPUTATION_MODEL" | (string & {});
export const TargetResourceType = /*@__PURE__*/ S.String;

export interface ListActionsRequest {
  targetResourceType: TargetResourceType;
  targetResourceId: string;
  nextToken?: string;
  maxResults?: number;
  resolveToResourceType?: ResolveToResourceType;
  resolveToResourceId?: string;
}
export const ListActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetResourceType: TargetResourceType.pipe(
      T.HttpQuery("targetResourceType"),
    ),
    targetResourceId: S.String.pipe(T.HttpQuery("targetResourceId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    resolveToResourceType: S.optional(ResolveToResourceType).pipe(
      T.HttpQuery("resolveToResourceType"),
    ),
    resolveToResourceId: S.optional(S.String).pipe(
      T.HttpQuery("resolveToResourceId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActionsRequest",
}) as any as S.Schema<ListActionsRequest>;
export interface ActionSummary {
  actionId?: string;
  actionDefinitionId?: string;
  targetResource?: TargetResource;
  resolveTo?: ResolveTo;
}
export const ActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionId: S.optional(S.String),
    actionDefinitionId: S.optional(S.String),
    targetResource: S.optional(TargetResource),
    resolveTo: S.optional(ResolveTo),
  }),
).annotate({ identifier: "ActionSummary" }) as any as S.Schema<ActionSummary>;
export type ActionSummaries = ActionSummary[];
export const ActionSummaries = /*@__PURE__*/ S.Array(ActionSummary);
export interface ListActionsResponse {
  actionSummaries: ActionSummary[];
  nextToken: string;
}
export const ListActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionSummaries: ActionSummaries, nextToken: S.String }),
).annotate({
  identifier: "ListActionsResponse",
}) as any as S.Schema<ListActionsResponse>;
export interface ListAssetModelCompositeModelsRequest {
  assetModelId: string;
  nextToken?: string;
  maxResults?: number;
  assetModelVersion?: string;
}
export const ListAssetModelCompositeModelsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      assetModelVersion: S.optional(S.String).pipe(
        T.HttpQuery("assetModelVersion"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/asset-models/{assetModelId}/composite-models",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAssetModelCompositeModelsRequest",
}) as any as S.Schema<ListAssetModelCompositeModelsRequest>;
export interface ListAssetModelCompositeModelsResponse {
  assetModelCompositeModelSummaries: AssetModelCompositeModelSummary[];
  nextToken?: string;
}
export const ListAssetModelCompositeModelsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelCompositeModelSummaries: AssetModelCompositeModelSummaries,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAssetModelCompositeModelsResponse",
}) as any as S.Schema<ListAssetModelCompositeModelsResponse>;
export type ListAssetModelPropertiesFilter = "ALL" | "BASE" | (string & {});
export const ListAssetModelPropertiesFilter = /*@__PURE__*/ S.String;

export interface ListAssetModelPropertiesRequest {
  assetModelId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: ListAssetModelPropertiesFilter;
  assetModelVersion?: string;
}
export const ListAssetModelPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    filter: S.optional(ListAssetModelPropertiesFilter).pipe(
      T.HttpQuery("filter"),
    ),
    assetModelVersion: S.optional(S.String).pipe(
      T.HttpQuery("assetModelVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/asset-models/{assetModelId}/properties" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetModelPropertiesRequest",
}) as any as S.Schema<ListAssetModelPropertiesRequest>;
export interface InterfaceSummary {
  interfaceAssetModelId: string;
  interfaceAssetModelPropertyId: string;
}
export const InterfaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interfaceAssetModelId: S.String,
    interfaceAssetModelPropertyId: S.String,
  }),
).annotate({
  identifier: "InterfaceSummary",
}) as any as S.Schema<InterfaceSummary>;
export type InterfaceSummaries = InterfaceSummary[];
export const InterfaceSummaries = /*@__PURE__*/ S.Array(InterfaceSummary);
export interface AssetModelPropertySummary {
  id?: string;
  externalId?: string;
  name: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  unit?: string;
  type: PropertyType;
  assetModelCompositeModelId?: string;
  path?: AssetModelPropertyPathSegment[];
  interfaceSummaries?: InterfaceSummary[];
}
export const AssetModelPropertySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    externalId: S.optional(S.String),
    name: S.String,
    dataType: PropertyDataType,
    dataTypeSpec: S.optional(S.String),
    unit: S.optional(S.String),
    type: PropertyType,
    assetModelCompositeModelId: S.optional(S.String),
    path: S.optional(AssetModelPropertyPath),
    interfaceSummaries: S.optional(InterfaceSummaries),
  }),
).annotate({
  identifier: "AssetModelPropertySummary",
}) as any as S.Schema<AssetModelPropertySummary>;
export type AssetModelPropertySummaries = AssetModelPropertySummary[];
export const AssetModelPropertySummaries = /*@__PURE__*/ S.Array(
  AssetModelPropertySummary,
);
export interface ListAssetModelPropertiesResponse {
  assetModelPropertySummaries: AssetModelPropertySummary[];
  nextToken?: string;
}
export const ListAssetModelPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelPropertySummaries: AssetModelPropertySummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetModelPropertiesResponse",
}) as any as S.Schema<ListAssetModelPropertiesResponse>;
export type ListAssetModelsTypeFilter = AssetModelType[];
export const ListAssetModelsTypeFilter = /*@__PURE__*/ S.Array(AssetModelType);
export interface ListAssetModelsRequest {
  assetModelTypes?: AssetModelType[];
  nextToken?: string;
  maxResults?: number;
  assetModelVersion?: string;
}
export const ListAssetModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelTypes: S.optional(ListAssetModelsTypeFilter).pipe(
      T.HttpQuery("assetModelTypes"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    assetModelVersion: S.optional(S.String).pipe(
      T.HttpQuery("assetModelVersion"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/asset-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetModelsRequest",
}) as any as S.Schema<ListAssetModelsRequest>;
export interface AssetModelSummary {
  id: string;
  externalId?: string;
  arn: string;
  name: string;
  assetModelType?: AssetModelType;
  description?: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: AssetModelStatus;
  version?: string;
}
export const AssetModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    arn: S.String,
    name: S.String,
    assetModelType: S.optional(AssetModelType),
    description: S.optional(S.String),
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: AssetModelStatus,
    version: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetModelSummary",
}) as any as S.Schema<AssetModelSummary>;
export type AssetModelSummaries = AssetModelSummary[];
export const AssetModelSummaries = /*@__PURE__*/ S.Array(AssetModelSummary);
export interface ListAssetModelsResponse {
  assetModelSummaries: AssetModelSummary[];
  nextToken?: string;
}
export const ListAssetModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelSummaries: AssetModelSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetModelsResponse",
}) as any as S.Schema<ListAssetModelsResponse>;
export type ListAssetPropertiesFilter = "ALL" | "BASE" | (string & {});
export const ListAssetPropertiesFilter = /*@__PURE__*/ S.String;

export interface ListAssetPropertiesRequest {
  assetId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: ListAssetPropertiesFilter;
}
export const ListAssetPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    filter: S.optional(ListAssetPropertiesFilter).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{assetId}/properties" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetPropertiesRequest",
}) as any as S.Schema<ListAssetPropertiesRequest>;
export interface AssetPropertySummary {
  id: string;
  externalId?: string;
  alias?: string;
  unit?: string;
  notification?: PropertyNotification;
  assetCompositeModelId?: string;
  path?: AssetPropertyPathSegment[];
}
export const AssetPropertySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    alias: S.optional(S.String),
    unit: S.optional(S.String),
    notification: S.optional(PropertyNotification),
    assetCompositeModelId: S.optional(S.String),
    path: S.optional(AssetPropertyPath),
  }),
).annotate({
  identifier: "AssetPropertySummary",
}) as any as S.Schema<AssetPropertySummary>;
export type AssetPropertySummaries = AssetPropertySummary[];
export const AssetPropertySummaries =
  /*@__PURE__*/ S.Array(AssetPropertySummary);
export interface ListAssetPropertiesResponse {
  assetPropertySummaries: AssetPropertySummary[];
  nextToken?: string;
}
export const ListAssetPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetPropertySummaries: AssetPropertySummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetPropertiesResponse",
}) as any as S.Schema<ListAssetPropertiesResponse>;
export type TraversalType = "PATH_TO_ROOT" | (string & {});
export const TraversalType = /*@__PURE__*/ S.String;

export interface ListAssetRelationshipsRequest {
  assetId: string;
  traversalType: TraversalType;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssetRelationshipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    traversalType: TraversalType.pipe(T.HttpQuery("traversalType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{assetId}/assetRelationships" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetRelationshipsRequest",
}) as any as S.Schema<ListAssetRelationshipsRequest>;
export interface AssetHierarchyInfo {
  parentAssetId?: string;
  childAssetId?: string;
}
export const AssetHierarchyInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parentAssetId: S.optional(S.String),
    childAssetId: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetHierarchyInfo",
}) as any as S.Schema<AssetHierarchyInfo>;
export type AssetRelationshipType = "HIERARCHY" | (string & {});
export const AssetRelationshipType = /*@__PURE__*/ S.String;

export interface AssetRelationshipSummary {
  hierarchyInfo?: AssetHierarchyInfo;
  relationshipType: AssetRelationshipType;
}
export const AssetRelationshipSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hierarchyInfo: S.optional(AssetHierarchyInfo),
    relationshipType: AssetRelationshipType,
  }),
).annotate({
  identifier: "AssetRelationshipSummary",
}) as any as S.Schema<AssetRelationshipSummary>;
export type AssetRelationshipSummaries = AssetRelationshipSummary[];
export const AssetRelationshipSummaries = /*@__PURE__*/ S.Array(
  AssetRelationshipSummary,
);
export interface ListAssetRelationshipsResponse {
  assetRelationshipSummaries: AssetRelationshipSummary[];
  nextToken?: string;
}
export const ListAssetRelationshipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetRelationshipSummaries: AssetRelationshipSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetRelationshipsResponse",
}) as any as S.Schema<ListAssetRelationshipsResponse>;
export type ListAssetsFilter = "ALL" | "TOP_LEVEL" | (string & {});
export const ListAssetsFilter = /*@__PURE__*/ S.String;

export interface ListAssetsRequest {
  nextToken?: string;
  maxResults?: number;
  assetModelId?: string;
  filter?: ListAssetsFilter;
}
export const ListAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    assetModelId: S.optional(S.String).pipe(T.HttpQuery("assetModelId")),
    filter: S.optional(ListAssetsFilter).pipe(T.HttpQuery("filter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetsRequest",
}) as any as S.Schema<ListAssetsRequest>;
export interface AssetSummary {
  id: string;
  externalId?: string;
  arn: string;
  name: string;
  assetModelId: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: AssetStatus;
  hierarchies: AssetHierarchy[];
  description?: string;
}
export const AssetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    arn: S.String,
    name: S.String,
    assetModelId: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: AssetStatus,
    hierarchies: AssetHierarchies,
    description: S.optional(S.String),
  }),
).annotate({ identifier: "AssetSummary" }) as any as S.Schema<AssetSummary>;
export type AssetSummaries = AssetSummary[];
export const AssetSummaries = /*@__PURE__*/ S.Array(AssetSummary);
export interface ListAssetsResponse {
  assetSummaries: AssetSummary[];
  nextToken?: string;
}
export const ListAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetSummaries: AssetSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAssetsResponse",
}) as any as S.Schema<ListAssetsResponse>;
export type TraversalDirection = "PARENT" | "CHILD" | (string & {});
export const TraversalDirection = /*@__PURE__*/ S.String;

export interface ListAssociatedAssetsRequest {
  assetId: string;
  hierarchyId?: string;
  traversalDirection?: TraversalDirection;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    hierarchyId: S.optional(S.String).pipe(T.HttpQuery("hierarchyId")),
    traversalDirection: S.optional(TraversalDirection).pipe(
      T.HttpQuery("traversalDirection"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{assetId}/hierarchies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociatedAssetsRequest",
}) as any as S.Schema<ListAssociatedAssetsRequest>;
export interface AssociatedAssetsSummary {
  id: string;
  externalId?: string;
  arn: string;
  name: string;
  assetModelId: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: AssetStatus;
  hierarchies: AssetHierarchy[];
  description?: string;
}
export const AssociatedAssetsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    externalId: S.optional(S.String),
    arn: S.String,
    name: S.String,
    assetModelId: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: AssetStatus,
    hierarchies: AssetHierarchies,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociatedAssetsSummary",
}) as any as S.Schema<AssociatedAssetsSummary>;
export type AssociatedAssetsSummaries = AssociatedAssetsSummary[];
export const AssociatedAssetsSummaries = /*@__PURE__*/ S.Array(
  AssociatedAssetsSummary,
);
export interface ListAssociatedAssetsResponse {
  assetSummaries: AssociatedAssetsSummary[];
  nextToken?: string;
}
export const ListAssociatedAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetSummaries: AssociatedAssetsSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssociatedAssetsResponse",
}) as any as S.Schema<ListAssociatedAssetsResponse>;
export type ListBulkImportJobsFilter =
  | "ALL"
  | "PENDING"
  | "RUNNING"
  | "CANCELLED"
  | "FAILED"
  | "COMPLETED_WITH_FAILURES"
  | "COMPLETED"
  | (string & {});
export const ListBulkImportJobsFilter = /*@__PURE__*/ S.String;

export interface ListBulkImportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  filter?: ListBulkImportJobsFilter;
}
export const ListBulkImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    filter: S.optional(ListBulkImportJobsFilter).pipe(T.HttpQuery("filter")),
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
  identifier: "ListBulkImportJobsRequest",
}) as any as S.Schema<ListBulkImportJobsRequest>;
export interface JobSummary {
  id: string;
  name: string;
  status: JobStatus;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, name: S.String, status: JobStatus }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type JobSummaries = JobSummary[];
export const JobSummaries = /*@__PURE__*/ S.Array(JobSummary);
export interface ListBulkImportJobsResponse {
  jobSummaries: JobSummary[];
  nextToken?: string;
}
export const ListBulkImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobSummaries: JobSummaries, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBulkImportJobsResponse",
}) as any as S.Schema<ListBulkImportJobsResponse>;
export interface ListCompositionRelationshipsRequest {
  assetModelId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCompositionRelationshipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/asset-models/{assetModelId}/composition-relationships",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCompositionRelationshipsRequest",
}) as any as S.Schema<ListCompositionRelationshipsRequest>;
export interface CompositionRelationshipSummary {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelCompositeModelType: string;
}
export const CompositionRelationshipSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String,
    assetModelCompositeModelId: S.String,
    assetModelCompositeModelType: S.String,
  }),
).annotate({
  identifier: "CompositionRelationshipSummary",
}) as any as S.Schema<CompositionRelationshipSummary>;
export type CompositionRelationshipSummaries = CompositionRelationshipSummary[];
export const CompositionRelationshipSummaries = /*@__PURE__*/ S.Array(
  CompositionRelationshipSummary,
);
export interface ListCompositionRelationshipsResponse {
  compositionRelationshipSummaries: CompositionRelationshipSummary[];
  nextToken?: string;
}
export const ListCompositionRelationshipsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      compositionRelationshipSummaries: CompositionRelationshipSummaries,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCompositionRelationshipsResponse",
}) as any as S.Schema<ListCompositionRelationshipsResponse>;
export interface AssetBindingValueFilter {
  assetId: string;
}
export const AssetBindingValueFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String }),
).annotate({
  identifier: "AssetBindingValueFilter",
}) as any as S.Schema<AssetBindingValueFilter>;
export interface AssetModelBindingValueFilter {
  assetModelId: string;
}
export const AssetModelBindingValueFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetModelId: S.String }),
).annotate({
  identifier: "AssetModelBindingValueFilter",
}) as any as S.Schema<AssetModelBindingValueFilter>;
export interface AssetPropertyBindingValueFilter {
  assetId: string;
  propertyId: string;
}
export const AssetPropertyBindingValueFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetId: S.String, propertyId: S.String }),
).annotate({
  identifier: "AssetPropertyBindingValueFilter",
}) as any as S.Schema<AssetPropertyBindingValueFilter>;
export interface AssetModelPropertyBindingValueFilter {
  assetModelId: string;
  propertyId: string;
}
export const AssetModelPropertyBindingValueFilter = /*@__PURE__*/ S.suspend(
  () => S.Struct({ assetModelId: S.String, propertyId: S.String }),
).annotate({
  identifier: "AssetModelPropertyBindingValueFilter",
}) as any as S.Schema<AssetModelPropertyBindingValueFilter>;
export interface DataBindingValueFilter {
  asset?: AssetBindingValueFilter;
  assetModel?: AssetModelBindingValueFilter;
  assetProperty?: AssetPropertyBindingValueFilter;
  assetModelProperty?: AssetModelPropertyBindingValueFilter;
}
export const DataBindingValueFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    asset: S.optional(AssetBindingValueFilter),
    assetModel: S.optional(AssetModelBindingValueFilter),
    assetProperty: S.optional(AssetPropertyBindingValueFilter),
    assetModelProperty: S.optional(AssetModelPropertyBindingValueFilter),
  }),
).annotate({
  identifier: "DataBindingValueFilter",
}) as any as S.Schema<DataBindingValueFilter>;
export interface ListComputationModelDataBindingUsagesRequest {
  dataBindingValueFilter: DataBindingValueFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListComputationModelDataBindingUsagesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      dataBindingValueFilter: DataBindingValueFilter,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/computation-models/data-binding-usages",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListComputationModelDataBindingUsagesRequest",
  }) as any as S.Schema<ListComputationModelDataBindingUsagesRequest>;
export type ComputationModelIdList = string[];
export const ComputationModelIdList = /*@__PURE__*/ S.Array(S.String);
export interface DataBindingValue {
  assetModelProperty?: AssetModelPropertyBindingValue;
  assetProperty?: AssetPropertyBindingValue;
}
export const DataBindingValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelProperty: S.optional(AssetModelPropertyBindingValue),
    assetProperty: S.optional(AssetPropertyBindingValue),
  }),
).annotate({
  identifier: "DataBindingValue",
}) as any as S.Schema<DataBindingValue>;
export interface MatchedDataBinding {
  value: DataBindingValue;
}
export const MatchedDataBinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: DataBindingValue }),
).annotate({
  identifier: "MatchedDataBinding",
}) as any as S.Schema<MatchedDataBinding>;
export interface ComputationModelDataBindingUsageSummary {
  computationModelIds: string[];
  matchedDataBinding: MatchedDataBinding;
}
export const ComputationModelDataBindingUsageSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      computationModelIds: ComputationModelIdList,
      matchedDataBinding: MatchedDataBinding,
    }),
).annotate({
  identifier: "ComputationModelDataBindingUsageSummary",
}) as any as S.Schema<ComputationModelDataBindingUsageSummary>;
export type ComputationModelDataBindingUsageSummaries =
  ComputationModelDataBindingUsageSummary[];
export const ComputationModelDataBindingUsageSummaries = /*@__PURE__*/ S.Array(
  ComputationModelDataBindingUsageSummary,
);
export interface ListComputationModelDataBindingUsagesResponse {
  dataBindingUsageSummaries: ComputationModelDataBindingUsageSummary[];
  nextToken?: string;
}
export const ListComputationModelDataBindingUsagesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      dataBindingUsageSummaries: ComputationModelDataBindingUsageSummaries,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListComputationModelDataBindingUsagesResponse",
  }) as any as S.Schema<ListComputationModelDataBindingUsagesResponse>;
export interface ListComputationModelResolveToResourcesRequest {
  computationModelId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListComputationModelResolveToResourcesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      computationModelId: S.String.pipe(T.HttpLabel("computationModelId")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/computation-models/{computationModelId}/resolve-to-resources",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListComputationModelResolveToResourcesRequest",
  }) as any as S.Schema<ListComputationModelResolveToResourcesRequest>;
export interface ComputationModelResolveToResourceSummary {
  resolveTo?: ResolveTo;
}
export const ComputationModelResolveToResourceSummary = /*@__PURE__*/ S.suspend(
  () => S.Struct({ resolveTo: S.optional(ResolveTo) }),
).annotate({
  identifier: "ComputationModelResolveToResourceSummary",
}) as any as S.Schema<ComputationModelResolveToResourceSummary>;
export type ComputationModelResolveToResourceSummaries =
  ComputationModelResolveToResourceSummary[];
export const ComputationModelResolveToResourceSummaries = /*@__PURE__*/ S.Array(
  ComputationModelResolveToResourceSummary,
);
export interface ListComputationModelResolveToResourcesResponse {
  computationModelResolveToResourceSummaries: ComputationModelResolveToResourceSummary[];
  nextToken?: string;
}
export const ListComputationModelResolveToResourcesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      computationModelResolveToResourceSummaries:
        ComputationModelResolveToResourceSummaries,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListComputationModelResolveToResourcesResponse",
  }) as any as S.Schema<ListComputationModelResolveToResourcesResponse>;
export type ComputationModelType = "ANOMALY_DETECTION" | (string & {});
export const ComputationModelType = /*@__PURE__*/ S.String;

export interface ListComputationModelsRequest {
  computationModelType?: ComputationModelType;
  nextToken?: string;
  maxResults?: number;
}
export const ListComputationModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelType: S.optional(ComputationModelType).pipe(
      T.HttpQuery("computationModelType"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/computation-models" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComputationModelsRequest",
}) as any as S.Schema<ListComputationModelsRequest>;
export interface ComputationModelSummary {
  id: string;
  arn: string;
  name: string;
  description?: string;
  type: ComputationModelType;
  creationDate: Date;
  lastUpdateDate: Date;
  status: ComputationModelStatus;
  version: string;
}
export const ComputationModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
    type: ComputationModelType,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: ComputationModelStatus,
    version: S.String,
  }),
).annotate({
  identifier: "ComputationModelSummary",
}) as any as S.Schema<ComputationModelSummary>;
export type ComputationModelSummaries = ComputationModelSummary[];
export const ComputationModelSummaries = /*@__PURE__*/ S.Array(
  ComputationModelSummary,
);
export interface ListComputationModelsResponse {
  computationModelSummaries: ComputationModelSummary[];
  nextToken?: string;
}
export const ListComputationModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelSummaries: ComputationModelSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComputationModelsResponse",
}) as any as S.Schema<ListComputationModelsResponse>;
export interface ListDashboardsRequest {
  projectId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDashboardsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String.pipe(T.HttpQuery("projectId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dashboards" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDashboardsRequest",
}) as any as S.Schema<ListDashboardsRequest>;
export interface DashboardSummary {
  id: string;
  name: string;
  description?: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
export const DashboardSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DashboardSummary",
}) as any as S.Schema<DashboardSummary>;
export type DashboardSummaries = DashboardSummary[];
export const DashboardSummaries = /*@__PURE__*/ S.Array(DashboardSummary);
export interface ListDashboardsResponse {
  dashboardSummaries: DashboardSummary[];
  nextToken?: string;
}
export const ListDashboardsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dashboardSummaries: DashboardSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDashboardsResponse",
}) as any as S.Schema<ListDashboardsResponse>;
export interface ListDatasetsRequest {
  sourceType: DatasetSourceType;
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceType: DatasetSourceType.pipe(T.HttpQuery("sourceType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export interface DatasetSummary {
  id: string;
  arn: string;
  name: string;
  description: string;
  creationDate: Date;
  lastUpdateDate: Date;
  status: DatasetStatus;
}
export const DatasetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    description: S.String,
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: DatasetStatus,
  }),
).annotate({ identifier: "DatasetSummary" }) as any as S.Schema<DatasetSummary>;
export type DatasetSummaries = DatasetSummary[];
export const DatasetSummaries = /*@__PURE__*/ S.Array(DatasetSummary);
export interface ListDatasetsResponse {
  datasetSummaries: DatasetSummary[];
  nextToken?: string;
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetSummaries: DatasetSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListExecutionsRequest {
  targetResourceType: TargetResourceType;
  targetResourceId: string;
  resolveToResourceType?: ResolveToResourceType;
  resolveToResourceId?: string;
  nextToken?: string;
  maxResults?: number;
  actionType?: string;
}
export const ListExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetResourceType: TargetResourceType.pipe(
      T.HttpQuery("targetResourceType"),
    ),
    targetResourceId: S.String.pipe(T.HttpQuery("targetResourceId")),
    resolveToResourceType: S.optional(ResolveToResourceType).pipe(
      T.HttpQuery("resolveToResourceType"),
    ),
    resolveToResourceId: S.optional(S.String).pipe(
      T.HttpQuery("resolveToResourceId"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    actionType: S.optional(S.String).pipe(T.HttpQuery("actionType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/executions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExecutionsRequest",
}) as any as S.Schema<ListExecutionsRequest>;
export interface ExecutionSummary {
  executionId: string;
  actionType?: string;
  targetResource: TargetResource;
  targetResourceVersion: string;
  resolveTo?: ResolveTo;
  executionStartTime: Date;
  executionEndTime?: Date;
  executionStatus: ExecutionStatus;
  executionEntityVersion?: string;
}
export const ExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String,
    actionType: S.optional(S.String),
    targetResource: TargetResource,
    targetResourceVersion: S.String,
    resolveTo: S.optional(ResolveTo),
    executionStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    executionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    executionStatus: ExecutionStatus,
    executionEntityVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionSummary",
}) as any as S.Schema<ExecutionSummary>;
export type ExecutionSummaries = ExecutionSummary[];
export const ExecutionSummaries = /*@__PURE__*/ S.Array(ExecutionSummary);
export interface ListExecutionsResponse {
  executionSummaries: ExecutionSummary[];
  nextToken?: string;
}
export const ListExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionSummaries: ExecutionSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExecutionsResponse",
}) as any as S.Schema<ListExecutionsResponse>;
export interface ListGatewaysRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListGatewaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/20200301/gateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGatewaysRequest",
}) as any as S.Schema<ListGatewaysRequest>;
export interface GatewaySummary {
  gatewayId: string;
  gatewayName: string;
  gatewayPlatform?: GatewayPlatform;
  gatewayVersion?: string;
  gatewayCapabilitySummaries?: GatewayCapabilitySummary[];
  creationDate: Date;
  lastUpdateDate: Date;
}
export const GatewaySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    gatewayName: S.String,
    gatewayPlatform: S.optional(GatewayPlatform),
    gatewayVersion: S.optional(S.String),
    gatewayCapabilitySummaries: S.optional(GatewayCapabilitySummaries),
    creationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "GatewaySummary" }) as any as S.Schema<GatewaySummary>;
export type GatewaySummaries = GatewaySummary[];
export const GatewaySummaries = /*@__PURE__*/ S.Array(GatewaySummary);
export interface ListGatewaysResponse {
  gatewaySummaries: GatewaySummary[];
  nextToken?: string;
}
export const ListGatewaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewaySummaries: GatewaySummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGatewaysResponse",
}) as any as S.Schema<ListGatewaysResponse>;
export interface ListInterfaceRelationshipsRequest {
  interfaceAssetModelId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListInterfaceRelationshipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interfaceAssetModelId: S.String.pipe(T.HttpLabel("interfaceAssetModelId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/interface/{interfaceAssetModelId}/asset-models",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInterfaceRelationshipsRequest",
}) as any as S.Schema<ListInterfaceRelationshipsRequest>;
export interface InterfaceRelationshipSummary {
  id: string;
}
export const InterfaceRelationshipSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String }),
).annotate({
  identifier: "InterfaceRelationshipSummary",
}) as any as S.Schema<InterfaceRelationshipSummary>;
export type InterfaceRelationshipSummaries = InterfaceRelationshipSummary[];
export const InterfaceRelationshipSummaries = /*@__PURE__*/ S.Array(
  InterfaceRelationshipSummary,
);
export interface ListInterfaceRelationshipsResponse {
  interfaceRelationshipSummaries: InterfaceRelationshipSummary[];
  nextToken?: string;
}
export const ListInterfaceRelationshipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interfaceRelationshipSummaries: InterfaceRelationshipSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInterfaceRelationshipsResponse",
}) as any as S.Schema<ListInterfaceRelationshipsResponse>;
export interface ListPortalsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPortalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/portals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPortalsRequest",
}) as any as S.Schema<ListPortalsRequest>;
export interface PortalSummary {
  id: string;
  name: string;
  description?: string;
  startUrl: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
  roleArn?: string;
  status: PortalStatus;
  portalType?: PortalType;
}
export const PortalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(S.String),
    startUrl: S.String,
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    roleArn: S.optional(S.String),
    status: PortalStatus,
    portalType: S.optional(PortalType),
  }),
).annotate({ identifier: "PortalSummary" }) as any as S.Schema<PortalSummary>;
export type PortalSummaries = PortalSummary[];
export const PortalSummaries = /*@__PURE__*/ S.Array(PortalSummary);
export interface ListPortalsResponse {
  portalSummaries?: PortalSummary[];
  nextToken?: string;
}
export const ListPortalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalSummaries: S.optional(PortalSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPortalsResponse",
}) as any as S.Schema<ListPortalsResponse>;
export interface ListProjectAssetsRequest {
  projectId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListProjectAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String.pipe(T.HttpLabel("projectId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/projects/{projectId}/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectAssetsRequest",
}) as any as S.Schema<ListProjectAssetsRequest>;
export type AssetIDs = string[];
export const AssetIDs = /*@__PURE__*/ S.Array(S.String);
export interface ListProjectAssetsResponse {
  assetIds: string[];
  nextToken?: string;
}
export const ListProjectAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetIds: AssetIDs, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListProjectAssetsResponse",
}) as any as S.Schema<ListProjectAssetsResponse>;
export interface ListProjectsRequest {
  portalId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListProjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String.pipe(T.HttpQuery("portalId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/projects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProjectsRequest",
}) as any as S.Schema<ListProjectsRequest>;
export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  creationDate?: Date;
  lastUpdateDate?: Date;
}
export const ProjectSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    description: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ProjectSummary" }) as any as S.Schema<ProjectSummary>;
export type ProjectSummaries = ProjectSummary[];
export const ProjectSummaries = /*@__PURE__*/ S.Array(ProjectSummary);
export interface ListProjectsResponse {
  projectSummaries: ProjectSummary[];
  nextToken?: string;
}
export const ListProjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectSummaries: ProjectSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProjectsResponse",
}) as any as S.Schema<ListProjectsResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ListTimeSeriesType = "ASSOCIATED" | "DISASSOCIATED" | (string & {});
export const ListTimeSeriesType = /*@__PURE__*/ S.String;

export interface ListTimeSeriesRequest {
  nextToken?: string;
  maxResults?: number;
  assetId?: string;
  aliasPrefix?: string;
  timeSeriesType?: ListTimeSeriesType;
}
export const ListTimeSeriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
    aliasPrefix: S.optional(S.String).pipe(T.HttpQuery("aliasPrefix")),
    timeSeriesType: S.optional(ListTimeSeriesType).pipe(
      T.HttpQuery("timeSeriesType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/timeseries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTimeSeriesRequest",
}) as any as S.Schema<ListTimeSeriesRequest>;
export interface TimeSeriesSummary {
  assetId?: string;
  propertyId?: string;
  alias?: string;
  timeSeriesId: string;
  dataType: PropertyDataType;
  dataTypeSpec?: string;
  timeSeriesCreationDate: Date;
  timeSeriesLastUpdateDate: Date;
  timeSeriesArn: string;
}
export const TimeSeriesSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String),
    propertyId: S.optional(S.String),
    alias: S.optional(S.String),
    timeSeriesId: S.String,
    dataType: PropertyDataType,
    dataTypeSpec: S.optional(S.String),
    timeSeriesCreationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    timeSeriesLastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    timeSeriesArn: S.String,
  }),
).annotate({
  identifier: "TimeSeriesSummary",
}) as any as S.Schema<TimeSeriesSummary>;
export type TimeSeriesSummaries = TimeSeriesSummary[];
export const TimeSeriesSummaries = /*@__PURE__*/ S.Array(TimeSeriesSummary);
export interface ListTimeSeriesResponse {
  TimeSeriesSummaries: TimeSeriesSummary[];
  nextToken?: string;
}
export const ListTimeSeriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeSeriesSummaries: TimeSeriesSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTimeSeriesResponse",
}) as any as S.Schema<ListTimeSeriesResponse>;
export type MatchByPropertyName = boolean;
export type CreateMissingProperty = boolean;
export interface PropertyMappingConfiguration {
  matchByPropertyName?: boolean;
  createMissingProperty?: boolean;
  overrides?: PropertyMapping[];
}
export const PropertyMappingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    matchByPropertyName: S.optional(S.Boolean),
    createMissingProperty: S.optional(S.Boolean),
    overrides: S.optional(PropertyMappings),
  }),
).annotate({
  identifier: "PropertyMappingConfiguration",
}) as any as S.Schema<PropertyMappingConfiguration>;
export interface PutAssetModelInterfaceRelationshipRequest {
  assetModelId: string;
  interfaceAssetModelId: string;
  propertyMappingConfiguration: PropertyMappingConfiguration;
  clientToken?: string;
}
export const PutAssetModelInterfaceRelationshipRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      interfaceAssetModelId: S.String.pipe(
        T.HttpLabel("interfaceAssetModelId"),
      ),
      propertyMappingConfiguration: PropertyMappingConfiguration,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/asset-models/{assetModelId}/interface/{interfaceAssetModelId}/asset-model-interface-relationship",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutAssetModelInterfaceRelationshipRequest",
  }) as any as S.Schema<PutAssetModelInterfaceRelationshipRequest>;
export interface PutAssetModelInterfaceRelationshipResponse {
  assetModelId: string;
  interfaceAssetModelId: string;
  assetModelArn: string;
  assetModelStatus: AssetModelStatus;
}
export const PutAssetModelInterfaceRelationshipResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      assetModelId: S.String,
      interfaceAssetModelId: S.String,
      assetModelArn: S.String,
      assetModelStatus: AssetModelStatus,
    }),
  ).annotate({
    identifier: "PutAssetModelInterfaceRelationshipResponse",
  }) as any as S.Schema<PutAssetModelInterfaceRelationshipResponse>;
export type KmsKeyId = string;
export interface PutDefaultEncryptionConfigurationRequest {
  encryptionType: EncryptionType;
  kmsKeyId?: string;
}
export const PutDefaultEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      encryptionType: EncryptionType,
      kmsKeyId: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/configuration/account/encryption" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutDefaultEncryptionConfigurationRequest",
}) as any as S.Schema<PutDefaultEncryptionConfigurationRequest>;
export interface PutDefaultEncryptionConfigurationResponse {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  configurationStatus: ConfigurationStatus;
}
export const PutDefaultEncryptionConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      encryptionType: EncryptionType,
      kmsKeyArn: S.optional(S.String),
      configurationStatus: ConfigurationStatus,
    }),
  ).annotate({
    identifier: "PutDefaultEncryptionConfigurationResponse",
  }) as any as S.Schema<PutDefaultEncryptionConfigurationResponse>;
export interface PutLoggingOptionsRequest {
  loggingOptions: LoggingOptions;
}
export const PutLoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ loggingOptions: LoggingOptions }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/logging" }),
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
export interface PutStorageConfigurationRequest {
  storageType: StorageType;
  multiLayerStorage?: MultiLayerStorage;
  disassociatedDataStorage?: DisassociatedDataStorageState;
  retentionPeriod?: RetentionPeriod;
  warmTier?: WarmTierState;
  warmTierRetentionPeriod?: WarmTierRetentionPeriod;
  disallowIngestNullNaN?: boolean;
}
export const PutStorageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageType: StorageType,
    multiLayerStorage: S.optional(MultiLayerStorage),
    disassociatedDataStorage: S.optional(DisassociatedDataStorageState),
    retentionPeriod: S.optional(RetentionPeriod),
    warmTier: S.optional(WarmTierState),
    warmTierRetentionPeriod: S.optional(WarmTierRetentionPeriod),
    disallowIngestNullNaN: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/configuration/account/storage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutStorageConfigurationRequest",
}) as any as S.Schema<PutStorageConfigurationRequest>;
export interface PutStorageConfigurationResponse {
  storageType: StorageType;
  multiLayerStorage?: MultiLayerStorage;
  disassociatedDataStorage?: DisassociatedDataStorageState;
  retentionPeriod?: RetentionPeriod;
  configurationStatus: ConfigurationStatus;
  warmTier?: WarmTierState;
  warmTierRetentionPeriod?: WarmTierRetentionPeriod;
  disallowIngestNullNaN?: boolean;
}
export const PutStorageConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageType: StorageType,
    multiLayerStorage: S.optional(MultiLayerStorage),
    disassociatedDataStorage: S.optional(DisassociatedDataStorageState),
    retentionPeriod: S.optional(RetentionPeriod),
    configurationStatus: ConfigurationStatus,
    warmTier: S.optional(WarmTierState),
    warmTierRetentionPeriod: S.optional(WarmTierRetentionPeriod),
    disallowIngestNullNaN: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PutStorageConfigurationResponse",
}) as any as S.Schema<PutStorageConfigurationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tags: TagMap,
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateAccessPolicyRequest {
  accessPolicyId: string;
  accessPolicyIdentity: Identity;
  accessPolicyResource: Resource;
  accessPolicyPermission: Permission;
  clientToken?: string;
}
export const UpdateAccessPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessPolicyId: S.String.pipe(T.HttpLabel("accessPolicyId")),
    accessPolicyIdentity: Identity,
    accessPolicyResource: Resource,
    accessPolicyPermission: Permission,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/access-policies/{accessPolicyId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccessPolicyRequest",
}) as any as S.Schema<UpdateAccessPolicyRequest>;
export interface UpdateAccessPolicyResponse {}
export const UpdateAccessPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAccessPolicyResponse",
}) as any as S.Schema<UpdateAccessPolicyResponse>;
export interface UpdateAssetRequest {
  assetId: string;
  assetExternalId?: string;
  assetName: string;
  clientToken?: string;
  assetDescription?: string;
}
export const UpdateAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    assetExternalId: S.optional(S.String),
    assetName: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    assetDescription: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/assets/{assetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssetRequest",
}) as any as S.Schema<UpdateAssetRequest>;
export interface UpdateAssetResponse {
  assetStatus: AssetStatus;
}
export const UpdateAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetStatus: AssetStatus }),
).annotate({
  identifier: "UpdateAssetResponse",
}) as any as S.Schema<UpdateAssetResponse>;
export interface UpdateAssetModelRequest {
  assetModelId: string;
  assetModelExternalId?: string;
  assetModelName: string;
  assetModelDescription?: string;
  assetModelProperties?: AssetModelProperty[];
  assetModelHierarchies?: AssetModelHierarchy[];
  assetModelCompositeModels?: AssetModelCompositeModel[];
  clientToken?: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export const UpdateAssetModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
    assetModelExternalId: S.optional(S.String),
    assetModelName: S.String,
    assetModelDescription: S.optional(S.String),
    assetModelProperties: S.optional(AssetModelProperties),
    assetModelHierarchies: S.optional(AssetModelHierarchies),
    assetModelCompositeModels: S.optional(AssetModelCompositeModels),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ifMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
    ifNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
    matchForVersionType: S.optional(AssetModelVersionType).pipe(
      T.HttpHeader("Match-For-Version-Type"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/asset-models/{assetModelId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssetModelRequest",
}) as any as S.Schema<UpdateAssetModelRequest>;
export interface UpdateAssetModelResponse {
  assetModelStatus: AssetModelStatus;
}
export const UpdateAssetModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assetModelStatus: AssetModelStatus }),
).annotate({
  identifier: "UpdateAssetModelResponse",
}) as any as S.Schema<UpdateAssetModelResponse>;
export interface UpdateAssetModelCompositeModelRequest {
  assetModelId: string;
  assetModelCompositeModelId: string;
  assetModelCompositeModelExternalId?: string;
  assetModelCompositeModelDescription?: string;
  assetModelCompositeModelName: string;
  clientToken?: string;
  assetModelCompositeModelProperties?: AssetModelProperty[];
  ifMatch?: string;
  ifNoneMatch?: string;
  matchForVersionType?: AssetModelVersionType;
}
export const UpdateAssetModelCompositeModelRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelId: S.String.pipe(T.HttpLabel("assetModelId")),
      assetModelCompositeModelId: S.String.pipe(
        T.HttpLabel("assetModelCompositeModelId"),
      ),
      assetModelCompositeModelExternalId: S.optional(S.String),
      assetModelCompositeModelDescription: S.optional(S.String),
      assetModelCompositeModelName: S.String,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      assetModelCompositeModelProperties: S.optional(AssetModelProperties),
      ifMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
      ifNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
      matchForVersionType: S.optional(AssetModelVersionType).pipe(
        T.HttpHeader("Match-For-Version-Type"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/asset-models/{assetModelId}/composite-models/{assetModelCompositeModelId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAssetModelCompositeModelRequest",
}) as any as S.Schema<UpdateAssetModelCompositeModelRequest>;
export interface UpdateAssetModelCompositeModelResponse {
  assetModelCompositeModelPath: AssetModelCompositeModelPathSegment[];
  assetModelStatus: AssetModelStatus;
}
export const UpdateAssetModelCompositeModelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      assetModelCompositeModelPath: AssetModelCompositeModelPath,
      assetModelStatus: AssetModelStatus,
    }),
).annotate({
  identifier: "UpdateAssetModelCompositeModelResponse",
}) as any as S.Schema<UpdateAssetModelCompositeModelResponse>;
export interface UpdateAssetPropertyRequest {
  assetId: string;
  propertyId: string;
  propertyAlias?: string;
  propertyNotificationState?: PropertyNotificationState;
  clientToken?: string;
  propertyUnit?: string;
}
export const UpdateAssetPropertyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.String.pipe(T.HttpLabel("assetId")),
    propertyId: S.String.pipe(T.HttpLabel("propertyId")),
    propertyAlias: S.optional(S.String),
    propertyNotificationState: S.optional(PropertyNotificationState),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    propertyUnit: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/assets/{assetId}/properties/{propertyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssetPropertyRequest",
}) as any as S.Schema<UpdateAssetPropertyRequest>;
export interface UpdateAssetPropertyResponse {}
export const UpdateAssetPropertyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAssetPropertyResponse",
}) as any as S.Schema<UpdateAssetPropertyResponse>;
export interface UpdateComputationModelRequest {
  computationModelId: string;
  computationModelName: string;
  computationModelDescription?: string;
  computationModelConfiguration: ComputationModelConfiguration;
  computationModelDataBinding: {
    [key: string]: ComputationModelDataBindingValue | undefined;
  };
  clientToken?: string;
}
export const UpdateComputationModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    computationModelId: S.String.pipe(T.HttpLabel("computationModelId")),
    computationModelName: S.String,
    computationModelDescription: S.optional(S.String),
    computationModelConfiguration: ComputationModelConfiguration,
    computationModelDataBinding: ComputationModelDataBinding,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/computation-models/{computationModelId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateComputationModelRequest",
}) as any as S.Schema<UpdateComputationModelRequest>;
export interface UpdateComputationModelResponse {
  computationModelStatus: ComputationModelStatus;
}
export const UpdateComputationModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ computationModelStatus: ComputationModelStatus }),
).annotate({
  identifier: "UpdateComputationModelResponse",
}) as any as S.Schema<UpdateComputationModelResponse>;
export interface UpdateDashboardRequest {
  dashboardId: string;
  dashboardName: string;
  dashboardDescription?: string;
  dashboardDefinition: string;
  clientToken?: string;
}
export const UpdateDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dashboardId: S.String.pipe(T.HttpLabel("dashboardId")),
    dashboardName: S.String,
    dashboardDescription: S.optional(S.String),
    dashboardDefinition: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/dashboards/{dashboardId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDashboardRequest",
}) as any as S.Schema<UpdateDashboardRequest>;
export interface UpdateDashboardResponse {}
export const UpdateDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDashboardResponse",
}) as any as S.Schema<UpdateDashboardResponse>;
export interface UpdateDatasetRequest {
  datasetId: string;
  datasetName: string;
  datasetDescription?: string;
  datasetSource: DatasetSource;
  clientToken?: string;
}
export const UpdateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    datasetName: S.String,
    datasetDescription: S.optional(S.String),
    datasetSource: DatasetSource,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/datasets/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDatasetRequest",
}) as any as S.Schema<UpdateDatasetRequest>;
export interface UpdateDatasetResponse {
  datasetId?: string;
  datasetArn?: string;
  datasetStatus?: DatasetStatus;
}
export const UpdateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.optional(S.String),
    datasetArn: S.optional(S.String),
    datasetStatus: S.optional(DatasetStatus),
  }),
).annotate({
  identifier: "UpdateDatasetResponse",
}) as any as S.Schema<UpdateDatasetResponse>;
export interface UpdateGatewayRequest {
  gatewayId: string;
  gatewayName: string;
}
export const UpdateGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    gatewayName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/20200301/gateways/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGatewayRequest",
}) as any as S.Schema<UpdateGatewayRequest>;
export interface UpdateGatewayResponse {}
export const UpdateGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateGatewayResponse",
}) as any as S.Schema<UpdateGatewayResponse>;
export interface UpdateGatewayCapabilityConfigurationRequest {
  gatewayId: string;
  capabilityNamespace: string;
  capabilityConfiguration: string;
}
export const UpdateGatewayCapabilityConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
      capabilityNamespace: S.String,
      capabilityConfiguration: S.String,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/20200301/gateways/{gatewayId}/capability",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateGatewayCapabilityConfigurationRequest",
  }) as any as S.Schema<UpdateGatewayCapabilityConfigurationRequest>;
export interface UpdateGatewayCapabilityConfigurationResponse {
  capabilityNamespace: string;
  capabilitySyncStatus: CapabilitySyncStatus;
}
export const UpdateGatewayCapabilityConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      capabilityNamespace: S.String,
      capabilitySyncStatus: CapabilitySyncStatus,
    }),
  ).annotate({
    identifier: "UpdateGatewayCapabilityConfigurationResponse",
  }) as any as S.Schema<UpdateGatewayCapabilityConfigurationResponse>;
export interface Image {
  id?: string;
  file?: ImageFile;
}
export const Image = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), file: S.optional(ImageFile) }),
).annotate({ identifier: "Image" }) as any as S.Schema<Image>;
export interface UpdatePortalRequest {
  portalId: string;
  portalName: string;
  portalDescription?: string;
  portalContactEmail: string | redacted.Redacted<string>;
  portalLogoImage?: Image;
  roleArn: string;
  clientToken?: string;
  notificationSenderEmail?: string | redacted.Redacted<string>;
  alarms?: Alarms;
  portalType?: PortalType;
  portalTypeConfiguration?: { [key: string]: PortalTypeEntry | undefined };
}
export const UpdatePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String.pipe(T.HttpLabel("portalId")),
    portalName: S.String,
    portalDescription: S.optional(S.String),
    portalContactEmail: SensitiveString,
    portalLogoImage: S.optional(Image),
    roleArn: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    notificationSenderEmail: S.optional(SensitiveString),
    alarms: S.optional(Alarms),
    portalType: S.optional(PortalType),
    portalTypeConfiguration: S.optional(PortalTypeConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePortalRequest",
}) as any as S.Schema<UpdatePortalRequest>;
export interface UpdatePortalResponse {
  portalStatus: PortalStatus;
}
export const UpdatePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalStatus: PortalStatus }),
).annotate({
  identifier: "UpdatePortalResponse",
}) as any as S.Schema<UpdatePortalResponse>;
export interface UpdateProjectRequest {
  projectId: string;
  projectName: string;
  projectDescription?: string;
  clientToken?: string;
}
export const UpdateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    projectId: S.String.pipe(T.HttpLabel("projectId")),
    projectName: S.String,
    projectDescription: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/projects/{projectId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProjectRequest",
}) as any as S.Schema<UpdateProjectRequest>;
export interface UpdateProjectResponse {}
export const UpdateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateProjectResponse",
}) as any as S.Schema<UpdateProjectResponse>;
export type ExceptionMessage = string;
export type AssociateAssetsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a child asset with the given parent asset through a hierarchy defined in the
 * parent asset's model. For more information, see Associating assets in the
 * *IoT SiteWise User Guide*.
 */
export const associateAssets: API.OperationMethod<
  AssociateAssetsRequest,
  AssociateAssetsResponse,
  AssociateAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAssetsRequest,
  output: AssociateAssetsResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAssets",
  endpointHostPrefix: "api.",
}));

export type AssociateTimeSeriesToAssetPropertyError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a time series (data stream) with an asset property.
 */
export const associateTimeSeriesToAssetProperty: API.OperationMethod<
  AssociateTimeSeriesToAssetPropertyRequest,
  AssociateTimeSeriesToAssetPropertyResponse,
  AssociateTimeSeriesToAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateTimeSeriesToAssetPropertyRequest,
  output: AssociateTimeSeriesToAssetPropertyResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTimeSeriesToAssetProperty",
  endpointHostPrefix: "api.",
}));

export type BatchAssociateProjectAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a group (batch) of assets with an IoT SiteWise Monitor project.
 */
export const batchAssociateProjectAssets: API.OperationMethod<
  BatchAssociateProjectAssetsRequest,
  BatchAssociateProjectAssetsResponse,
  BatchAssociateProjectAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateProjectAssetsRequest,
  output: BatchAssociateProjectAssetsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateProjectAssets",
  endpointHostPrefix: "monitor.",
}));

export type BatchDisassociateProjectAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a group (batch) of assets from an IoT SiteWise Monitor project.
 */
export const batchDisassociateProjectAssets: API.OperationMethod<
  BatchDisassociateProjectAssetsRequest,
  BatchDisassociateProjectAssetsResponse,
  BatchDisassociateProjectAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateProjectAssetsRequest,
  output: BatchDisassociateProjectAssetsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateProjectAssets",
  endpointHostPrefix: "monitor.",
}));

export type BatchGetAssetPropertyAggregatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets aggregated values (for example, average, minimum, and maximum) for one or more asset
 * properties. For more information, see Querying aggregates in the
 * *IoT SiteWise User Guide*.
 */
export const batchGetAssetPropertyAggregates: API.PaginatedOperationMethod<
  BatchGetAssetPropertyAggregatesRequest,
  BatchGetAssetPropertyAggregatesResponse,
  BatchGetAssetPropertyAggregatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: BatchGetAssetPropertyAggregatesRequest,
  output: BatchGetAssetPropertyAggregatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAssetPropertyAggregates",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type BatchGetAssetPropertyValueError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the current value for one or more asset properties. For more information, see Querying
 * current values in the *IoT SiteWise User Guide*.
 */
export const batchGetAssetPropertyValue: API.PaginatedOperationMethod<
  BatchGetAssetPropertyValueRequest,
  BatchGetAssetPropertyValueResponse,
  BatchGetAssetPropertyValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: BatchGetAssetPropertyValueRequest,
  output: BatchGetAssetPropertyValueResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAssetPropertyValue",
  endpointHostPrefix: "data.",
  pagination: { inputToken: "nextToken", outputToken: "nextToken" } as const,
})) as any;

export type BatchGetAssetPropertyValueHistoryError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the historical values for one or more asset properties. For more information, see
 * Querying historical values in the *IoT SiteWise User Guide*.
 */
export const batchGetAssetPropertyValueHistory: API.PaginatedOperationMethod<
  BatchGetAssetPropertyValueHistoryRequest,
  BatchGetAssetPropertyValueHistoryResponse,
  BatchGetAssetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: BatchGetAssetPropertyValueHistoryRequest,
  output: BatchGetAssetPropertyValueHistoryResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAssetPropertyValueHistory",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type BatchPutAssetPropertyValueError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Sends a list of asset property values to IoT SiteWise. Each value is a timestamp-quality-value
 * (TQV) data point. For more information, see Ingesting data using the API in the
 * *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 *
 * With respect to Unix epoch time, IoT SiteWise accepts only TQVs that have a timestamp of no more
 * than 7 days in the past and no more than 10 minutes in the future. IoT SiteWise rejects timestamps
 * outside of the inclusive range of [-7 days, +10 minutes] and returns a
 * `TimestampOutOfRangeException` error.
 *
 * For each asset property, IoT SiteWise overwrites TQVs with duplicate timestamps unless the newer
 * TQV has a different quality. For example, if you store a TQV `{T1, GOOD, V1}`,
 * then storing `{T1, GOOD, V2}` replaces the existing TQV.
 *
 * IoT SiteWise authorizes access to each `BatchPutAssetPropertyValue` entry individually.
 * For more information, see BatchPutAssetPropertyValue authorization in the
 * *IoT SiteWise User Guide*.
 */
export const batchPutAssetPropertyValue: API.OperationMethod<
  BatchPutAssetPropertyValueRequest,
  BatchPutAssetPropertyValueResponse,
  BatchPutAssetPropertyValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutAssetPropertyValueRequest,
  output: BatchPutAssetPropertyValueResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutAssetPropertyValue",
  endpointHostPrefix: "data.",
}));

export type CreateAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an access policy that grants the specified identity (IAM Identity Center user, IAM Identity Center group, or
 * IAM user) access to the specified IoT SiteWise Monitor portal or project resource.
 *
 * Support for access policies that use an SSO Group as the identity is not supported at this time.
 */
export const createAccessPolicy: API.OperationMethod<
  CreateAccessPolicyRequest,
  CreateAccessPolicyResponse,
  CreateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessPolicyRequest,
  output: CreateAccessPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPolicy",
  endpointHostPrefix: "monitor.",
}));

export type CreateAssetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an asset from an existing asset model. For more information, see Creating assets in the
 * *IoT SiteWise User Guide*.
 */
export const createAsset: API.OperationMethod<
  CreateAssetRequest,
  CreateAssetResponse,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetRequest,
  output: CreateAssetResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAsset",
  endpointHostPrefix: "api.",
}));

export type CreateAssetModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an asset model from specified property and hierarchy definitions. You create
 * assets from asset models. With asset models, you can easily create assets of the same type
 * that have standardized definitions. Each asset created from a model inherits the asset model's
 * property and hierarchy definitions. For more information, see Defining asset models in the
 * *IoT SiteWise User Guide*.
 *
 * You can create three types of asset models, `ASSET_MODEL`,
 * `COMPONENT_MODEL`, or an `INTERFACE`.
 *
 * - **ASSET_MODEL** – (default) An asset model that
 * you can use to create assets. Can't be included as a component in another asset
 * model.
 *
 * - **COMPONENT_MODEL** – A reusable component that
 * you can include in the composite models of other asset models. You can't create
 * assets directly from this type of asset model.
 *
 * - **INTERFACE** – An interface is a type of model
 * that defines a standard structure that can be applied to different asset models.
 */
export const createAssetModel: API.OperationMethod<
  CreateAssetModelRequest,
  CreateAssetModelResponse,
  CreateAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetModelRequest,
  output: CreateAssetModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetModel",
  endpointHostPrefix: "api.",
}));

export type CreateAssetModelCompositeModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionFailedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a custom composite model from specified property and hierarchy definitions. There
 * are two types of custom composite models, `inline` and
 * `component-model-based`.
 *
 * Use component-model-based custom composite models to define standard, reusable components.
 * A component-model-based custom composite model consists of a name, a description, and the ID
 * of the component model it references. A component-model-based custom composite model has no
 * properties of its own; its referenced component model provides its associated properties to
 * any created assets. For more information, see Custom composite models (Components)
 * in the *IoT SiteWise User Guide*.
 *
 * Use inline custom composite models to organize the properties of an asset model. The
 * properties of inline custom composite models are local to the asset model where they are
 * included and can't be used to create multiple assets.
 *
 * To create a component-model-based model, specify the `composedAssetModelId` of
 * an existing asset model with `assetModelType` of
 * `COMPONENT_MODEL`.
 *
 * To create an inline model, specify the `assetModelCompositeModelProperties` and
 * don't include an `composedAssetModelId`.
 */
export const createAssetModelCompositeModel: API.OperationMethod<
  CreateAssetModelCompositeModelRequest,
  CreateAssetModelCompositeModelResponse,
  CreateAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetModelCompositeModelRequest,
  output: CreateAssetModelCompositeModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionFailedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssetModelCompositeModel",
  endpointHostPrefix: "api.",
}));

export type CreateBulkImportJobError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Defines a job to ingest data to IoT SiteWise from Amazon S3. For more information, see Create a
 * bulk import job (CLI) in the *Amazon Simple Storage Service User Guide*.
 *
 * Before you create a bulk import job, you must enable IoT SiteWise warm tier or IoT SiteWise cold tier.
 * For more information about how to configure storage settings, see PutStorageConfiguration.
 *
 * Bulk import is designed to store historical data to IoT SiteWise.
 *
 * - Newly ingested data in the hot tier triggers notifications and computations.
 *
 * - After data moves from the hot tier to the warm or cold tier based on retention
 * settings, it does not trigger computations or notifications.
 *
 * - Data older than 7 days does not trigger computations or notifications.
 */
export const createBulkImportJob: API.OperationMethod<
  CreateBulkImportJobRequest,
  CreateBulkImportJobResponse,
  CreateBulkImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBulkImportJobRequest,
  output: CreateBulkImportJobResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBulkImportJob",
  endpointHostPrefix: "data.",
}));

export type CreateComputationModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Create a computation model with a configuration and data binding.
 */
export const createComputationModel: API.OperationMethod<
  CreateComputationModelRequest,
  CreateComputationModelResponse,
  CreateComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComputationModelRequest,
  output: CreateComputationModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComputationModel",
  endpointHostPrefix: "api.",
}));

export type CreateDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a dashboard in an IoT SiteWise Monitor project.
 */
export const createDashboard: API.OperationMethod<
  CreateDashboardRequest,
  CreateDashboardResponse,
  CreateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDashboardRequest,
  output: CreateDashboardResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDashboard",
  endpointHostPrefix: "monitor.",
}));

export type CreateDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a dataset to connect an external datasource.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
  endpointHostPrefix: "api.",
}));

export type CreateGatewayError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a gateway, which is a virtual or edge device that delivers industrial data streams
 * from local servers to IoT SiteWise. For more information, see Ingesting data using a gateway in the
 * *IoT SiteWise User Guide*.
 */
export const createGateway: API.OperationMethod<
  CreateGatewayRequest,
  CreateGatewayResponse,
  CreateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGatewayRequest,
  output: CreateGatewayResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGateway",
  endpointHostPrefix: "api.",
}));

export type CreatePortalError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a portal, which can contain projects and dashboards. IoT SiteWise Monitor uses IAM Identity Center or IAM
 * to authenticate portal users and manage user permissions.
 *
 * Before you can sign in to a new portal, you must add at least one identity to that
 * portal. For more information, see Adding or removing portal
 * administrators in the *IoT SiteWise User Guide*.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePortalRequest,
  output: CreatePortalResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePortal",
  endpointHostPrefix: "monitor.",
}));

export type CreateProjectError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a project in the specified portal.
 *
 * Make sure that the project name and description don't contain confidential
 * information.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
  endpointHostPrefix: "monitor.",
}));

export type DeleteAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an access policy that grants the specified identity access to the specified
 * IoT SiteWise Monitor resource. You can use this operation to revoke access to an IoT SiteWise Monitor
 * resource.
 */
export const deleteAccessPolicy: API.OperationMethod<
  DeleteAccessPolicyRequest,
  DeleteAccessPolicyResponse,
  DeleteAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessPolicyRequest,
  output: DeleteAccessPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPolicy",
  endpointHostPrefix: "monitor.",
}));

export type DeleteAssetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset. This action can't be undone. For more information, see Deleting assets and
 * models in the *IoT SiteWise User Guide*.
 *
 * You can't delete an asset that's associated to another asset. For more information, see
 * DisassociateAssets.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetRequest,
  output: DeleteAssetResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
  endpointHostPrefix: "api.",
}));

export type DeleteAssetModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset model. This action can't be undone. You must delete all assets created
 * from an asset model before you can delete the model. Also, you can't delete an asset model if
 * a parent asset model exists that contains a property formula expression that depends on the
 * asset model that you want to delete. For more information, see Deleting assets and models in the
 * *IoT SiteWise User Guide*.
 */
export const deleteAssetModel: API.OperationMethod<
  DeleteAssetModelRequest,
  DeleteAssetModelResponse,
  DeleteAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetModelRequest,
  output: DeleteAssetModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetModel",
  endpointHostPrefix: "api.",
}));

export type DeleteAssetModelCompositeModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a composite model. This action can't be undone. You must delete all assets created
 * from a composite model before you can delete the model. Also, you can't delete a composite
 * model if a parent asset model exists that contains a property formula expression that depends
 * on the asset model that you want to delete. For more information, see Deleting assets and
 * models in the *IoT SiteWise User Guide*.
 */
export const deleteAssetModelCompositeModel: API.OperationMethod<
  DeleteAssetModelCompositeModelRequest,
  DeleteAssetModelCompositeModelResponse,
  DeleteAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetModelCompositeModelRequest,
  output: DeleteAssetModelCompositeModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetModelCompositeModel",
  endpointHostPrefix: "api.",
}));

export type DeleteAssetModelInterfaceRelationshipError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an interface relationship between an asset model and an interface asset
 * model.
 */
export const deleteAssetModelInterfaceRelationship: API.OperationMethod<
  DeleteAssetModelInterfaceRelationshipRequest,
  DeleteAssetModelInterfaceRelationshipResponse,
  DeleteAssetModelInterfaceRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetModelInterfaceRelationshipRequest,
  output: DeleteAssetModelInterfaceRelationshipResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetModelInterfaceRelationship",
  endpointHostPrefix: "api.",
}));

export type DeleteComputationModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a computation model. This action can't be undone.
 */
export const deleteComputationModel: API.OperationMethod<
  DeleteComputationModelRequest,
  DeleteComputationModelResponse,
  DeleteComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComputationModelRequest,
  output: DeleteComputationModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComputationModel",
  endpointHostPrefix: "api.",
}));

export type DeleteDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a dashboard from IoT SiteWise Monitor.
 */
export const deleteDashboard: API.OperationMethod<
  DeleteDashboardRequest,
  DeleteDashboardResponse,
  DeleteDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDashboardRequest,
  output: DeleteDashboardResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
  endpointHostPrefix: "monitor.",
}));

export type DeleteDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a dataset. This cannot be undone.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
  endpointHostPrefix: "api.",
}));

export type DeleteGatewayError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a gateway from IoT SiteWise. When you delete a gateway, some of the gateway's files remain
 * in your gateway's file system.
 */
export const deleteGateway: API.OperationMethod<
  DeleteGatewayRequest,
  DeleteGatewayResponse,
  DeleteGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGatewayRequest,
  output: DeleteGatewayResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGateway",
  endpointHostPrefix: "api.",
}));

export type DeletePortalError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a portal from IoT SiteWise Monitor.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortalRequest,
  output: DeletePortalResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
  endpointHostPrefix: "monitor.",
}));

export type DeleteProjectError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a project from IoT SiteWise Monitor.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
  endpointHostPrefix: "monitor.",
}));

export type DeleteTimeSeriesError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a time series (data stream). If you delete a time series that's associated with an
 * asset property, the asset property still exists, but the time series will no longer be
 * associated with this asset property.
 *
 * To identify a time series, do one of the following:
 *
 * - If the time series isn't associated with an asset property,
 * specify the `alias` of the time series.
 *
 * - If the time series is associated with an asset property,
 * specify one of the following:
 *
 * - The `alias` of the time series.
 *
 * - The `assetId` and `propertyId` that identifies the asset property.
 */
export const deleteTimeSeries: API.OperationMethod<
  DeleteTimeSeriesRequest,
  DeleteTimeSeriesResponse,
  DeleteTimeSeriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTimeSeriesRequest,
  output: DeleteTimeSeriesResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTimeSeries",
  endpointHostPrefix: "api.",
}));

export type DescribeAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes an access policy, which specifies an identity's access to an IoT SiteWise Monitor portal or
 * project.
 */
export const describeAccessPolicy: API.OperationMethod<
  DescribeAccessPolicyRequest,
  DescribeAccessPolicyResponse,
  DescribeAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccessPolicyRequest,
  output: DescribeAccessPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccessPolicy",
  endpointHostPrefix: "monitor.",
}));

export type DescribeActionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an action.
 */
export const describeAction: API.OperationMethod<
  DescribeActionRequest,
  DescribeActionResponse,
  DescribeActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeActionRequest,
  output: DescribeActionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAction",
  endpointHostPrefix: "api.",
}));

export type DescribeAssetError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset.
 */
export const describeAsset: API.OperationMethod<
  DescribeAssetRequest,
  DescribeAssetResponse,
  DescribeAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetRequest,
  output: DescribeAssetResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAsset",
  endpointHostPrefix: "api.",
}));

export type DescribeAssetCompositeModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset composite model (also known as an asset component).
 * An `AssetCompositeModel` is an instance of an
 * `AssetModelCompositeModel`. If you want to see information about the model this is
 * based on, call DescribeAssetModelCompositeModel.
 */
export const describeAssetCompositeModel: API.OperationMethod<
  DescribeAssetCompositeModelRequest,
  DescribeAssetCompositeModelResponse,
  DescribeAssetCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetCompositeModelRequest,
  output: DescribeAssetCompositeModelResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetCompositeModel",
  endpointHostPrefix: "api.",
}));

export type DescribeAssetModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset model. This includes details about the asset model's
 * properties, hierarchies, composite models, and any interface relationships if the asset model
 * implements interfaces.
 */
export const describeAssetModel: API.OperationMethod<
  DescribeAssetModelRequest,
  DescribeAssetModelResponse,
  DescribeAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetModelRequest,
  output: DescribeAssetModelResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetModel",
  endpointHostPrefix: "api.",
}));

export type DescribeAssetModelCompositeModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset model composite model (also known as an asset model
 * component). For more information, see Custom composite models
 * (Components) in the *IoT SiteWise User Guide*.
 */
export const describeAssetModelCompositeModel: API.OperationMethod<
  DescribeAssetModelCompositeModelRequest,
  DescribeAssetModelCompositeModelResponse,
  DescribeAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetModelCompositeModelRequest,
  output: DescribeAssetModelCompositeModelResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetModelCompositeModel",
  endpointHostPrefix: "api.",
}));

export type DescribeAssetModelInterfaceRelationshipError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an interface relationship between an asset model and an
 * interface asset model.
 */
export const describeAssetModelInterfaceRelationship: API.OperationMethod<
  DescribeAssetModelInterfaceRelationshipRequest,
  DescribeAssetModelInterfaceRelationshipResponse,
  DescribeAssetModelInterfaceRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetModelInterfaceRelationshipRequest,
  output: DescribeAssetModelInterfaceRelationshipResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetModelInterfaceRelationship",
  endpointHostPrefix: "api.",
}));

export type DescribeAssetPropertyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about an asset property.
 *
 * When you call this operation for an attribute property, this response includes the
 * default attribute value that you define in the asset model. If you update the default value
 * in the model, this operation's response includes the new default value.
 *
 * This operation doesn't return the value of the asset property. To get the value of an
 * asset property, use GetAssetPropertyValue.
 */
export const describeAssetProperty: API.OperationMethod<
  DescribeAssetPropertyRequest,
  DescribeAssetPropertyResponse,
  DescribeAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetPropertyRequest,
  output: DescribeAssetPropertyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssetProperty",
  endpointHostPrefix: "api.",
}));

export type DescribeBulkImportJobError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a bulk import job request. For more information, see Describe
 * a bulk import job (CLI) in the *Amazon Simple Storage Service User Guide*.
 */
export const describeBulkImportJob: API.OperationMethod<
  DescribeBulkImportJobRequest,
  DescribeBulkImportJobResponse,
  DescribeBulkImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBulkImportJobRequest,
  output: DescribeBulkImportJobResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBulkImportJob",
  endpointHostPrefix: "data.",
}));

export type DescribeComputationModelError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a computation model.
 */
export const describeComputationModel: API.OperationMethod<
  DescribeComputationModelRequest,
  DescribeComputationModelResponse,
  DescribeComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComputationModelRequest,
  output: DescribeComputationModelResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputationModel",
  endpointHostPrefix: "api.",
}));

export type DescribeComputationModelExecutionSummaryError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the execution summary of a computation model.
 */
export const describeComputationModelExecutionSummary: API.OperationMethod<
  DescribeComputationModelExecutionSummaryRequest,
  DescribeComputationModelExecutionSummaryResponse,
  DescribeComputationModelExecutionSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComputationModelExecutionSummaryRequest,
  output: DescribeComputationModelExecutionSummaryResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComputationModelExecutionSummary",
  endpointHostPrefix: "api.",
}));

export type DescribeDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a dashboard.
 */
export const describeDashboard: API.OperationMethod<
  DescribeDashboardRequest,
  DescribeDashboardResponse,
  DescribeDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDashboardRequest,
  output: DescribeDashboardResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDashboard",
  endpointHostPrefix: "monitor.",
}));

export type DescribeDatasetError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a dataset.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetRequest,
  output: DescribeDatasetResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
  endpointHostPrefix: "api.",
}));

export type DescribeDefaultEncryptionConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the default encryption configuration for the Amazon Web Services account in
 * the default or specified Region. For more information, see Key management in the
 * *IoT SiteWise User Guide*.
 */
export const describeDefaultEncryptionConfiguration: API.OperationMethod<
  DescribeDefaultEncryptionConfigurationRequest,
  DescribeDefaultEncryptionConfigurationResponse,
  DescribeDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDefaultEncryptionConfigurationRequest,
  output: DescribeDefaultEncryptionConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultEncryptionConfiguration",
  endpointHostPrefix: "api.",
}));

export type DescribeExecutionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the execution.
 */
export const describeExecution: API.OperationMethod<
  DescribeExecutionRequest,
  DescribeExecutionResponse,
  DescribeExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExecutionRequest,
  output: DescribeExecutionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
  endpointHostPrefix: "api.",
}));

export type DescribeGatewayError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a gateway.
 */
export const describeGateway: API.OperationMethod<
  DescribeGatewayRequest,
  DescribeGatewayResponse,
  DescribeGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGatewayRequest,
  output: DescribeGatewayResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGateway",
  endpointHostPrefix: "api.",
}));

export type DescribeGatewayCapabilityConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Each gateway capability defines data sources for a gateway. This is the namespace of the gateway capability.
 *
 * . The namespace follows the format `service:capability:version`, where:
 *
 * - `service` - The service providing the capability, or `iotsitewise`.
 *
 * - `capability` - The specific capability type. Options include: `opcuacollector` for the OPC UA data source collector, or `publisher` for data publisher capability.
 *
 * - `version` - The version number of the capability. Option include `2` for Classic streams, V2 gateways, and `3` for MQTT-enabled, V3 gateways.
 *
 * After updating a capability configuration, the sync status becomes `OUT_OF_SYNC` until the gateway processes the configuration.Use `DescribeGatewayCapabilityConfiguration` to check the sync status and verify the configuration was applied.
 *
 * A gateway can have multiple capability configurations with different namespaces.
 */
export const describeGatewayCapabilityConfiguration: API.OperationMethod<
  DescribeGatewayCapabilityConfigurationRequest,
  DescribeGatewayCapabilityConfigurationResponse,
  DescribeGatewayCapabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGatewayCapabilityConfigurationRequest,
  output: DescribeGatewayCapabilityConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGatewayCapabilityConfiguration",
  endpointHostPrefix: "api.",
}));

export type DescribeLoggingOptionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the current IoT SiteWise logging options.
 */
export const describeLoggingOptions: API.OperationMethod<
  DescribeLoggingOptionsRequest,
  DescribeLoggingOptionsResponse,
  DescribeLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLoggingOptionsRequest,
  output: DescribeLoggingOptionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingOptions",
  endpointHostPrefix: "api.",
}));

export type DescribePortalError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a portal.
 */
export const describePortal: API.OperationMethod<
  DescribePortalRequest,
  DescribePortalResponse,
  DescribePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePortalRequest,
  output: DescribePortalResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePortal",
  endpointHostPrefix: "monitor.",
}));

export type DescribeProjectError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a project.
 */
export const describeProject: API.OperationMethod<
  DescribeProjectRequest,
  DescribeProjectResponse,
  DescribeProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProjectRequest,
  output: DescribeProjectResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProject",
  endpointHostPrefix: "monitor.",
}));

export type DescribeStorageConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about the storage configuration for IoT SiteWise.
 */
export const describeStorageConfiguration: API.OperationMethod<
  DescribeStorageConfigurationRequest,
  DescribeStorageConfigurationResponse,
  DescribeStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStorageConfigurationRequest,
  output: DescribeStorageConfigurationResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorageConfiguration",
  endpointHostPrefix: "api.",
}));

export type DescribeTimeSeriesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves information about a time series (data stream).
 *
 * To identify a time series, do one of the following:
 *
 * - If the time series isn't associated with an asset property,
 * specify the `alias` of the time series.
 *
 * - If the time series is associated with an asset property,
 * specify one of the following:
 *
 * - The `alias` of the time series.
 *
 * - The `assetId` and `propertyId` that identifies the asset property.
 */
export const describeTimeSeries: API.OperationMethod<
  DescribeTimeSeriesRequest,
  DescribeTimeSeriesResponse,
  DescribeTimeSeriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTimeSeriesRequest,
  output: DescribeTimeSeriesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTimeSeries",
  endpointHostPrefix: "api.",
}));

export type DisassociateAssetsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a child asset from the given parent asset through a hierarchy defined in the
 * parent asset's model.
 */
export const disassociateAssets: API.OperationMethod<
  DisassociateAssetsRequest,
  DisassociateAssetsResponse,
  DisassociateAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAssetsRequest,
  output: DisassociateAssetsResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAssets",
  endpointHostPrefix: "api.",
}));

export type DisassociateTimeSeriesFromAssetPropertyError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a time series (data stream) from an asset property.
 */
export const disassociateTimeSeriesFromAssetProperty: API.OperationMethod<
  DisassociateTimeSeriesFromAssetPropertyRequest,
  DisassociateTimeSeriesFromAssetPropertyResponse,
  DisassociateTimeSeriesFromAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateTimeSeriesFromAssetPropertyRequest,
  output: DisassociateTimeSeriesFromAssetPropertyResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateTimeSeriesFromAssetProperty",
  endpointHostPrefix: "api.",
}));

export type ExecuteActionError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Executes an action on a target resource.
 */
export const executeAction: API.OperationMethod<
  ExecuteActionRequest,
  ExecuteActionResponse,
  ExecuteActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteActionRequest,
  output: ExecuteActionResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteAction",
  endpointHostPrefix: "api.",
}));

export type ExecuteQueryError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidRequestException
  | QueryTimeoutException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Run SQL queries to retrieve metadata and time-series data from asset models, assets,
 * measurements, metrics, transforms, and aggregates.
 */
export const executeQuery: API.PaginatedOperationMethod<
  ExecuteQueryRequest,
  ExecuteQueryResponse,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient,
  Row
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ExecuteQueryRequest,
  output: ExecuteQueryResponse,
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidRequestException,
    QueryTimeoutException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAssetPropertyAggregatesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets aggregated values for an asset property. For more information, see Querying
 * aggregates in the *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getAssetPropertyAggregates: API.PaginatedOperationMethod<
  GetAssetPropertyAggregatesRequest,
  GetAssetPropertyAggregatesResponse,
  GetAssetPropertyAggregatesError,
  Credentials | HttpClient.HttpClient,
  AggregatedValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAssetPropertyAggregatesRequest,
  output: GetAssetPropertyAggregatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetPropertyAggregates",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "aggregatedValues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAssetPropertyValueError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets an asset property's current value. For more information, see Querying
 * current values in the *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getAssetPropertyValue: API.OperationMethod<
  GetAssetPropertyValueRequest,
  GetAssetPropertyValueResponse,
  GetAssetPropertyValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetPropertyValueRequest,
  output: GetAssetPropertyValueResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetPropertyValue",
  endpointHostPrefix: "data.",
}));

export type GetAssetPropertyValueHistoryError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the history of an asset property's values. For more information, see Querying
 * historical values in the *IoT SiteWise User Guide*.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getAssetPropertyValueHistory: API.PaginatedOperationMethod<
  GetAssetPropertyValueHistoryRequest,
  GetAssetPropertyValueHistoryResponse,
  GetAssetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  AssetPropertyValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAssetPropertyValueHistoryRequest,
  output: GetAssetPropertyValueHistoryResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetPropertyValueHistory",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetPropertyValueHistory",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetInterpolatedAssetPropertyValuesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Get interpolated values for an asset property for a specified time interval, during a
 * period of time. If your time series is missing data points during the specified time interval,
 * you can use interpolation to estimate the missing data.
 *
 * For example, you can use this operation to return the interpolated temperature values for
 * a wind turbine every 24 hours over a duration of 7 days.
 *
 * To identify an asset property, you must specify one of the following:
 *
 * - The `assetId` and `propertyId` of an asset property.
 *
 * - A `propertyAlias`, which is a data stream alias (for example,
 * `/company/windfarm/3/turbine/7/temperature`). To define an asset property's alias, see UpdateAssetProperty.
 */
export const getInterpolatedAssetPropertyValues: API.PaginatedOperationMethod<
  GetInterpolatedAssetPropertyValuesRequest,
  GetInterpolatedAssetPropertyValuesResponse,
  GetInterpolatedAssetPropertyValuesError,
  Credentials | HttpClient.HttpClient,
  InterpolatedAssetPropertyValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInterpolatedAssetPropertyValuesRequest,
  output: GetInterpolatedAssetPropertyValuesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInterpolatedAssetPropertyValues",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "interpolatedAssetPropertyValues",
    pageSize: "maxResults",
  } as const,
})) as any;

export type InvokeAssistantError =
  | AccessDeniedException
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Invokes SiteWise Assistant to start or continue a conversation.
 */
export const invokeAssistant: API.OperationMethod<
  InvokeAssistantRequest,
  InvokeAssistantResponse,
  InvokeAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeAssistantRequest,
  output: InvokeAssistantResponse,
  errors: [
    AccessDeniedException,
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAssistant",
  endpointHostPrefix: "data.",
}));

export type ListAccessPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of access policies for an identity (an IAM Identity Center user, an IAM Identity Center
 * group, or an IAM user) or an IoT SiteWise Monitor resource (a portal or project).
 */
export const listAccessPolicies: API.PaginatedOperationMethod<
  ListAccessPoliciesRequest,
  ListAccessPoliciesResponse,
  ListAccessPoliciesError,
  Credentials | HttpClient.HttpClient,
  AccessPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessPoliciesRequest,
  output: ListAccessPoliciesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPolicies",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessPolicySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of actions for a specific target resource.
 */
export const listActions: API.PaginatedOperationMethod<
  ListActionsRequest,
  ListActionsResponse,
  ListActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActionsRequest,
  output: ListActionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActions",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetModelCompositeModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of composite models associated with the asset model
 */
export const listAssetModelCompositeModels: API.PaginatedOperationMethod<
  ListAssetModelCompositeModelsRequest,
  ListAssetModelCompositeModelsResponse,
  ListAssetModelCompositeModelsError,
  Credentials | HttpClient.HttpClient,
  AssetModelCompositeModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetModelCompositeModelsRequest,
  output: ListAssetModelCompositeModelsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetModelCompositeModels",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetModelCompositeModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetModelPropertiesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of properties associated with an asset model.
 * If you update properties associated with the model before you finish listing all the properties,
 * you need to start all over again.
 */
export const listAssetModelProperties: API.PaginatedOperationMethod<
  ListAssetModelPropertiesRequest,
  ListAssetModelPropertiesResponse,
  ListAssetModelPropertiesError,
  Credentials | HttpClient.HttpClient,
  AssetModelPropertySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetModelPropertiesRequest,
  output: ListAssetModelPropertiesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetModelProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetModelPropertySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of summaries of all asset models.
 */
export const listAssetModels: API.PaginatedOperationMethod<
  ListAssetModelsRequest,
  ListAssetModelsResponse,
  ListAssetModelsError,
  Credentials | HttpClient.HttpClient,
  AssetModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetModelsRequest,
  output: ListAssetModelsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetModels",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetPropertiesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of properties associated with an asset.
 * If you update properties associated with the model before you finish listing all the properties,
 * you need to start all over again.
 */
export const listAssetProperties: API.PaginatedOperationMethod<
  ListAssetPropertiesRequest,
  ListAssetPropertiesResponse,
  ListAssetPropertiesError,
  Credentials | HttpClient.HttpClient,
  AssetPropertySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetPropertiesRequest,
  output: ListAssetPropertiesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetPropertySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of asset relationships for an asset. You can use this operation
 * to identify an asset's root asset and all associated assets between that asset and its
 * root.
 */
export const listAssetRelationships: API.PaginatedOperationMethod<
  ListAssetRelationshipsRequest,
  ListAssetRelationshipsResponse,
  ListAssetRelationshipsError,
  Credentials | HttpClient.HttpClient,
  AssetRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetRelationshipsRequest,
  output: ListAssetRelationshipsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of asset summaries.
 *
 * You can use this operation to do the following:
 *
 * - List assets based on a specific asset model.
 *
 * - List top-level assets.
 *
 * You can't use this operation to list all assets. To retrieve summaries for all of your
 * assets, use ListAssetModels to get all of your asset model IDs. Then, use ListAssets to get all
 * assets for each asset model.
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetsRequest,
  output: ListAssetsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of associated assets.
 *
 * You can use this operation to do the following:
 *
 * - `CHILD` - List all child assets associated to the asset.
 *
 * - `PARENT` - List the asset's parent asset.
 */
export const listAssociatedAssets: API.PaginatedOperationMethod<
  ListAssociatedAssetsRequest,
  ListAssociatedAssetsResponse,
  ListAssociatedAssetsError,
  Credentials | HttpClient.HttpClient,
  AssociatedAssetsSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedAssetsRequest,
  output: ListAssociatedAssetsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedAssets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBulkImportJobsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of bulk import job requests. For more information, see List bulk
 * import jobs (CLI) in the *IoT SiteWise User Guide*.
 */
export const listBulkImportJobs: API.PaginatedOperationMethod<
  ListBulkImportJobsRequest,
  ListBulkImportJobsResponse,
  ListBulkImportJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBulkImportJobsRequest,
  output: ListBulkImportJobsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBulkImportJobs",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCompositionRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of composition relationships for an asset model of type
 * `COMPONENT_MODEL`.
 */
export const listCompositionRelationships: API.PaginatedOperationMethod<
  ListCompositionRelationshipsRequest,
  ListCompositionRelationshipsResponse,
  ListCompositionRelationshipsError,
  Credentials | HttpClient.HttpClient,
  CompositionRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCompositionRelationshipsRequest,
  output: ListCompositionRelationshipsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompositionRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "compositionRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputationModelDataBindingUsagesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all data binding usages for computation models. This allows to identify where
 * specific data bindings are being utilized across the computation models. This track
 * dependencies between data sources and computation models.
 */
export const listComputationModelDataBindingUsages: API.PaginatedOperationMethod<
  ListComputationModelDataBindingUsagesRequest,
  ListComputationModelDataBindingUsagesResponse,
  ListComputationModelDataBindingUsagesError,
  Credentials | HttpClient.HttpClient,
  ComputationModelDataBindingUsageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComputationModelDataBindingUsagesRequest,
  output: ListComputationModelDataBindingUsagesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputationModelDataBindingUsages",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataBindingUsageSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputationModelResolveToResourcesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all distinct resources that are resolved from the executed actions of the
 * computation model.
 */
export const listComputationModelResolveToResources: API.PaginatedOperationMethod<
  ListComputationModelResolveToResourcesRequest,
  ListComputationModelResolveToResourcesResponse,
  ListComputationModelResolveToResourcesError,
  Credentials | HttpClient.HttpClient,
  ComputationModelResolveToResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComputationModelResolveToResourcesRequest,
  output: ListComputationModelResolveToResourcesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputationModelResolveToResources",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computationModelResolveToResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComputationModelsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of summaries of all computation models.
 */
export const listComputationModels: API.PaginatedOperationMethod<
  ListComputationModelsRequest,
  ListComputationModelsResponse,
  ListComputationModelsError,
  Credentials | HttpClient.HttpClient,
  ComputationModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComputationModelsRequest,
  output: ListComputationModelsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComputationModels",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "computationModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDashboardsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of dashboards for an IoT SiteWise Monitor project.
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDashboardsRequest,
  output: ListDashboardsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dashboardSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of datasets for a specific target resource.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of summaries of all executions.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsRequest,
  ListExecutionsResponse,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExecutionsRequest,
  output: ListExecutionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGatewaysError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of gateways.
 */
export const listGateways: API.PaginatedOperationMethod<
  ListGatewaysRequest,
  ListGatewaysResponse,
  ListGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewaySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGatewaysRequest,
  output: ListGatewaysResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGateways",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewaySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInterfaceRelationshipsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of asset models that have a specific interface asset model
 * applied to them.
 */
export const listInterfaceRelationships: API.PaginatedOperationMethod<
  ListInterfaceRelationshipsRequest,
  ListInterfaceRelationshipsResponse,
  ListInterfaceRelationshipsError,
  Credentials | HttpClient.HttpClient,
  InterfaceRelationshipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInterfaceRelationshipsRequest,
  output: ListInterfaceRelationshipsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInterfaceRelationships",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "interfaceRelationshipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPortalsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of IoT SiteWise Monitor portals.
 */
export const listPortals: API.PaginatedOperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient,
  PortalSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPortalsRequest,
  output: ListPortalsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "portalSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectAssetsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of assets associated with an IoT SiteWise Monitor project.
 */
export const listProjectAssets: API.PaginatedOperationMethod<
  ListProjectAssetsRequest,
  ListProjectAssetsResponse,
  ListProjectAssetsError,
  Credentials | HttpClient.HttpClient,
  ID
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectAssetsRequest,
  output: ListProjectAssetsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectAssets",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assetIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProjectsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of projects for an IoT SiteWise Monitor portal.
 */
export const listProjects: API.PaginatedOperationMethod<
  ListProjectsRequest,
  ListProjectsResponse,
  ListProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsRequest,
  output: ListProjectsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjects",
  endpointHostPrefix: "monitor.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "projectSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the list of tags for an IoT SiteWise resource.
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
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
}));

export type ListTimeSeriesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a paginated list of time series (data streams).
 */
export const listTimeSeries: API.PaginatedOperationMethod<
  ListTimeSeriesRequest,
  ListTimeSeriesResponse,
  ListTimeSeriesError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTimeSeriesRequest,
  output: ListTimeSeriesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTimeSeries",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "TimeSeriesSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAssetModelInterfaceRelationshipError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an interface relationship between an asset model and an interface asset
 * model. This operation applies an interface to an asset model.
 */
export const putAssetModelInterfaceRelationship: API.OperationMethod<
  PutAssetModelInterfaceRelationshipRequest,
  PutAssetModelInterfaceRelationshipResponse,
  PutAssetModelInterfaceRelationshipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAssetModelInterfaceRelationshipRequest,
  output: PutAssetModelInterfaceRelationshipResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAssetModelInterfaceRelationship",
  endpointHostPrefix: "api.",
}));

export type PutDefaultEncryptionConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets the default encryption configuration for the Amazon Web Services account. For more information, see
 * Key management in
 * the *IoT SiteWise User Guide*.
 */
export const putDefaultEncryptionConfiguration: API.OperationMethod<
  PutDefaultEncryptionConfigurationRequest,
  PutDefaultEncryptionConfigurationResponse,
  PutDefaultEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDefaultEncryptionConfigurationRequest,
  output: PutDefaultEncryptionConfigurationResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDefaultEncryptionConfiguration",
  endpointHostPrefix: "api.",
}));

export type PutLoggingOptionsError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets logging options for IoT SiteWise.
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
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingOptions",
  endpointHostPrefix: "api.",
}));

export type PutStorageConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Configures storage settings for IoT SiteWise.
 */
export const putStorageConfiguration: API.OperationMethod<
  PutStorageConfigurationRequest,
  PutStorageConfigurationResponse,
  PutStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutStorageConfigurationRequest,
  output: PutStorageConfigurationResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageConfiguration",
  endpointHostPrefix: "api.",
}));

export type TagResourceError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds tags to an IoT SiteWise resource. If a tag already exists for the resource, this operation
 * updates the tag's value.
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
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
}));

export type UntagResourceError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a tag from an IoT SiteWise resource.
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
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
}));

export type UpdateAccessPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing access policy that specifies an identity's access to an IoT SiteWise Monitor
 * portal or project resource.
 */
export const updateAccessPolicy: API.OperationMethod<
  UpdateAccessPolicyRequest,
  UpdateAccessPolicyResponse,
  UpdateAccessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccessPolicyRequest,
  output: UpdateAccessPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessPolicy",
  endpointHostPrefix: "monitor.",
}));

export type UpdateAssetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an asset's name. For more information, see Updating assets and models in the
 * *IoT SiteWise User Guide*.
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetRequest,
  output: UpdateAssetResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
  endpointHostPrefix: "api.",
}));

export type UpdateAssetModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionFailedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an asset model and all of the assets that were created from the model. Each asset
 * created from the model inherits the updated asset model's property and hierarchy definitions.
 * For more information, see Updating assets and models in the
 * *IoT SiteWise User Guide*.
 *
 * If you remove a property from an asset model, IoT SiteWise deletes all previous data for that
 * property. You can’t change the type or data type of an existing property.
 *
 * To replace an existing asset model property with a new one with the same
 * `name`, do the following:
 *
 * - Submit an `UpdateAssetModel` request with the entire existing property
 * removed.
 *
 * - Submit a second `UpdateAssetModel` request that includes the new
 * property. The new asset property will have the same `name` as the previous
 * one and IoT SiteWise will generate a new unique `id`.
 */
export const updateAssetModel: API.OperationMethod<
  UpdateAssetModelRequest,
  UpdateAssetModelResponse,
  UpdateAssetModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetModelRequest,
  output: UpdateAssetModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionFailedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetModel",
  endpointHostPrefix: "api.",
}));

export type UpdateAssetModelCompositeModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | PreconditionFailedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a composite model and all of the assets that were created from the model. Each
 * asset created from the model inherits the updated asset model's property and hierarchy
 * definitions. For more information, see Updating assets and models in the
 * *IoT SiteWise User Guide*.
 *
 * If you remove a property from a composite asset model, IoT SiteWise deletes all previous data
 * for that property. You can’t change the type or data type of an existing property.
 *
 * To replace an existing composite asset model property with a new one with the same
 * `name`, do the following:
 *
 * - Submit an `UpdateAssetModelCompositeModel` request with the entire
 * existing property removed.
 *
 * - Submit a second `UpdateAssetModelCompositeModel` request that includes
 * the new property. The new asset property will have the same `name` as the
 * previous one and IoT SiteWise will generate a new unique `id`.
 */
export const updateAssetModelCompositeModel: API.OperationMethod<
  UpdateAssetModelCompositeModelRequest,
  UpdateAssetModelCompositeModelResponse,
  UpdateAssetModelCompositeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetModelCompositeModelRequest,
  output: UpdateAssetModelCompositeModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    PreconditionFailedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetModelCompositeModel",
  endpointHostPrefix: "api.",
}));

export type UpdateAssetPropertyError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an asset property's alias and notification state.
 *
 * This operation overwrites the property's existing alias and notification state. To keep
 * your existing property's alias or notification state, you must include the existing values
 * in the UpdateAssetProperty request. For more information, see DescribeAssetProperty.
 */
export const updateAssetProperty: API.OperationMethod<
  UpdateAssetPropertyRequest,
  UpdateAssetPropertyResponse,
  UpdateAssetPropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetPropertyRequest,
  output: UpdateAssetPropertyResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssetProperty",
  endpointHostPrefix: "api.",
}));

export type UpdateComputationModelError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the computation model.
 */
export const updateComputationModel: API.OperationMethod<
  UpdateComputationModelRequest,
  UpdateComputationModelResponse,
  UpdateComputationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComputationModelRequest,
  output: UpdateComputationModelResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComputationModel",
  endpointHostPrefix: "api.",
}));

export type UpdateDashboardError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an IoT SiteWise Monitor dashboard.
 */
export const updateDashboard: API.OperationMethod<
  UpdateDashboardRequest,
  UpdateDashboardResponse,
  UpdateDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDashboardRequest,
  output: UpdateDashboardResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboard",
  endpointHostPrefix: "monitor.",
}));

export type UpdateDatasetError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a dataset.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetRequest,
  output: UpdateDatasetResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataset",
  endpointHostPrefix: "api.",
}));

export type UpdateGatewayError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a gateway's name.
 */
export const updateGateway: API.OperationMethod<
  UpdateGatewayRequest,
  UpdateGatewayResponse,
  UpdateGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayRequest,
  output: UpdateGatewayResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGateway",
  endpointHostPrefix: "api.",
}));

export type UpdateGatewayCapabilityConfigurationError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a gateway capability configuration or defines a new capability configuration. Each gateway capability defines data sources for a gateway.
 *
 * Important workflow notes:
 *
 * Each gateway capability defines data sources for a gateway. This is the namespace of the gateway capability.
 *
 * . The namespace follows the format `service:capability:version`, where:
 *
 * - `service` - The service providing the capability, or `iotsitewise`.
 *
 * - `capability` - The specific capability type. Options include: `opcuacollector` for the OPC UA data source collector, or `publisher` for data publisher capability.
 *
 * - `version` - The version number of the capability. Option include `2` for Classic streams, V2 gateways, and `3` for MQTT-enabled, V3 gateways.
 *
 * After updating a capability configuration, the sync status becomes `OUT_OF_SYNC` until the gateway processes the configuration.Use `DescribeGatewayCapabilityConfiguration` to check the sync status and verify the configuration was applied.
 *
 * A gateway can have multiple capability configurations with different namespaces.
 */
export const updateGatewayCapabilityConfiguration: API.OperationMethod<
  UpdateGatewayCapabilityConfigurationRequest,
  UpdateGatewayCapabilityConfigurationResponse,
  UpdateGatewayCapabilityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGatewayCapabilityConfigurationRequest,
  output: UpdateGatewayCapabilityConfigurationResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGatewayCapabilityConfiguration",
  endpointHostPrefix: "api.",
}));

export type UpdatePortalError =
  | ConflictingOperationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an IoT SiteWise Monitor portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePortalRequest,
  output: UpdatePortalResponse,
  errors: [
    ConflictingOperationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePortal",
  endpointHostPrefix: "monitor.",
}));

export type UpdateProjectError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an IoT SiteWise Monitor project.
 */
export const updateProject: API.OperationMethod<
  UpdateProjectRequest,
  UpdateProjectResponse,
  UpdateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProjectRequest,
  output: UpdateProjectResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProject",
  endpointHostPrefix: "monitor.",
}));
