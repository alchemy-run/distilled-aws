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
  sdkId: "SageMaker FeatureStore Runtime",
  serviceShapeName: "AmazonSageMakerFeatureStoreRuntime",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker" });
const ver = T.ServiceVersion("2020-07-01");
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
              `https://featurestore-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://featurestore-runtime.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://featurestore-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://featurestore-runtime.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessForbidden
  extends /*@__PURE__*/ S.TaggedError<AccessForbidden>()(
    "AccessForbidden",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class FeatureGroupNotFound
  extends /*@__PURE__*/ S.TaggedError<FeatureGroupNotFound>()(
    "FeatureGroupNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationError",
      message: { includes: "Resource Not Found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class InternalFailure
  extends /*@__PURE__*/ S.TaggedError<InternalFailure>()(
    "InternalFailure",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFound>()(
    "ResourceNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailable
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailable>()(
    "ServiceUnavailable",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ValidationError
  extends /*@__PURE__*/ S.TaggedError<ValidationError>()(
    "ValidationError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type FeatureGroupNameOrArn = string;
export type ValueAsString = string;
export type RecordIdentifiers = string[];
export const RecordIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type FeatureName = string;
export type FeatureNames = string[];
export const FeatureNames = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetRecordIdentifier {
  FeatureGroupName?: string;
  RecordIdentifiersValueAsString?: string[];
  FeatureNames?: string[];
}
export const BatchGetRecordIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.optional(S.String),
    RecordIdentifiersValueAsString: S.optional(RecordIdentifiers),
    FeatureNames: S.optional(FeatureNames),
  }),
).annotate({
  identifier: "BatchGetRecordIdentifier",
}) as any as S.Schema<BatchGetRecordIdentifier>;
export type BatchGetRecordIdentifiers = BatchGetRecordIdentifier[];
export const BatchGetRecordIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetRecordIdentifier,
);
export type ExpirationTimeResponse = "Enabled" | "Disabled" | (string & {});
export const ExpirationTimeResponse = /*@__PURE__*/ S.String;

export interface BatchGetRecordRequest {
  Identifiers?: BatchGetRecordIdentifier[];
  ExpirationTimeResponse?: ExpirationTimeResponse;
}
export const BatchGetRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifiers: S.optional(BatchGetRecordIdentifiers),
    ExpirationTimeResponse: S.optional(ExpirationTimeResponse),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetRecord" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRecordRequest",
}) as any as S.Schema<BatchGetRecordRequest>;
export type ValueAsStringList = string[];
export const ValueAsStringList = /*@__PURE__*/ S.Array(S.String);
export interface FeatureValue {
  FeatureName?: string;
  ValueAsString?: string;
  ValueAsStringList?: string[];
}
export const FeatureValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureName: S.optional(S.String),
    ValueAsString: S.optional(S.String),
    ValueAsStringList: S.optional(ValueAsStringList),
  }),
).annotate({ identifier: "FeatureValue" }) as any as S.Schema<FeatureValue>;
export type Record = FeatureValue[];
export const Record = /*@__PURE__*/ S.Array(FeatureValue);
export type ExpiresAt = string;
export interface BatchGetRecordResultDetail {
  FeatureGroupName?: string;
  RecordIdentifierValueAsString?: string;
  Record?: FeatureValue[];
  ExpiresAt?: string;
}
export const BatchGetRecordResultDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.optional(S.String),
    RecordIdentifierValueAsString: S.optional(S.String),
    Record: S.optional(Record),
    ExpiresAt: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetRecordResultDetail",
}) as any as S.Schema<BatchGetRecordResultDetail>;
export type BatchGetRecordResultDetails = BatchGetRecordResultDetail[];
export const BatchGetRecordResultDetails = /*@__PURE__*/ S.Array(
  BatchGetRecordResultDetail,
);
export type Message = string;
export interface BatchGetRecordError_ {
  FeatureGroupName?: string;
  RecordIdentifierValueAsString?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const BatchGetRecordError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.optional(S.String),
    RecordIdentifierValueAsString: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetRecordError",
}) as any as S.Schema<BatchGetRecordError_>;
export type BatchGetRecordErrors = BatchGetRecordError_[];
export const BatchGetRecordErrors = /*@__PURE__*/ S.Array(BatchGetRecordError_);
export type UnprocessedIdentifiers = BatchGetRecordIdentifier[];
export const UnprocessedIdentifiers = /*@__PURE__*/ S.Array(
  BatchGetRecordIdentifier,
);
export interface BatchGetRecordResponse {
  Records: (BatchGetRecordResultDetail & {
    FeatureGroupName: ValueAsString;
    RecordIdentifierValueAsString: ValueAsString;
    Record: (FeatureValue & { FeatureName: FeatureName })[];
  })[];
  Errors: (BatchGetRecordError & {
    FeatureGroupName: ValueAsString;
    RecordIdentifierValueAsString: ValueAsString;
    ErrorCode: ValueAsString;
    ErrorMessage: Message;
  })[];
  UnprocessedIdentifiers: (BatchGetRecordIdentifier & {
    FeatureGroupName: FeatureGroupNameOrArn;
    RecordIdentifiersValueAsString: RecordIdentifiers;
  })[];
}
export const BatchGetRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Records: S.optional(BatchGetRecordResultDetails),
    Errors: S.optional(BatchGetRecordErrors),
    UnprocessedIdentifiers: S.optional(UnprocessedIdentifiers),
  }),
).annotate({
  identifier: "BatchGetRecordResponse",
}) as any as S.Schema<BatchGetRecordResponse>;
export type TargetStore = "OnlineStore" | "OfflineStore" | (string & {});
export const TargetStore = /*@__PURE__*/ S.String;

export type TargetStores = TargetStore[];
export const TargetStores = /*@__PURE__*/ S.Array(TargetStore);
export type TtlDurationUnit =
  | "Seconds"
  | "Minutes"
  | "Hours"
  | "Days"
  | "Weeks"
  | (string & {});
export const TtlDurationUnit = /*@__PURE__*/ S.String;

export type TtlDurationValue = number;
export interface TtlDuration {
  Unit?: TtlDurationUnit;
  Value?: number;
}
export const TtlDuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Unit: S.optional(TtlDurationUnit), Value: S.optional(S.Number) }),
).annotate({ identifier: "TtlDuration" }) as any as S.Schema<TtlDuration>;
export interface BatchWriteRecordEntry {
  FeatureGroupName?: string;
  Record?: FeatureValue[];
  TargetStores?: TargetStore[];
  TtlDuration?: TtlDuration;
}
export const BatchWriteRecordEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.optional(S.String),
    Record: S.optional(Record),
    TargetStores: S.optional(TargetStores),
    TtlDuration: S.optional(TtlDuration),
  }),
).annotate({
  identifier: "BatchWriteRecordEntry",
}) as any as S.Schema<BatchWriteRecordEntry>;
export type BatchWriteRecordEntries = BatchWriteRecordEntry[];
export const BatchWriteRecordEntries = /*@__PURE__*/ S.Array(
  BatchWriteRecordEntry,
);
export interface BatchWriteRecordRequest {
  Entries?: BatchWriteRecordEntry[];
  TtlDuration?: TtlDuration;
}
export const BatchWriteRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: S.optional(BatchWriteRecordEntries),
    TtlDuration: S.optional(TtlDuration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchWriteRecord" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchWriteRecordRequest",
}) as any as S.Schema<BatchWriteRecordRequest>;
export interface BatchWriteRecordError_ {
  Entry?: BatchWriteRecordEntry;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const BatchWriteRecordError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entry: S.optional(BatchWriteRecordEntry),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchWriteRecordError",
}) as any as S.Schema<BatchWriteRecordError_>;
export type BatchWriteRecordErrors = BatchWriteRecordError_[];
export const BatchWriteRecordErrors = /*@__PURE__*/ S.Array(
  BatchWriteRecordError_,
);
export type UnprocessedBatchWriteRecordEntries = BatchWriteRecordEntry[];
export const UnprocessedBatchWriteRecordEntries = /*@__PURE__*/ S.Array(
  BatchWriteRecordEntry,
);
export interface BatchWriteRecordResponse {
  Errors: (BatchWriteRecordError & {
    Entry: BatchWriteRecordEntry & {
      FeatureGroupName: FeatureGroupNameOrArn;
      Record: (FeatureValue & { FeatureName: FeatureName })[];
      TtlDuration: TtlDuration & {
        Unit: TtlDurationUnit;
        Value: TtlDurationValue;
      };
    };
    ErrorCode: ValueAsString;
    ErrorMessage: Message;
  })[];
  UnprocessedEntries: (BatchWriteRecordEntry & {
    FeatureGroupName: FeatureGroupNameOrArn;
    Record: (FeatureValue & { FeatureName: FeatureName })[];
    TtlDuration: TtlDuration & {
      Unit: TtlDurationUnit;
      Value: TtlDurationValue;
    };
  })[];
}
export const BatchWriteRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Errors: S.optional(BatchWriteRecordErrors),
    UnprocessedEntries: S.optional(UnprocessedBatchWriteRecordEntries),
  }),
).annotate({
  identifier: "BatchWriteRecordResponse",
}) as any as S.Schema<BatchWriteRecordResponse>;
export type DeletionMode = "SoftDelete" | "HardDelete" | (string & {});
export const DeletionMode = /*@__PURE__*/ S.String;

export interface DeleteRecordRequest {
  FeatureGroupName: string;
  RecordIdentifierValueAsString?: string;
  EventTime?: string;
  TargetStores?: TargetStore[];
  DeletionMode?: DeletionMode;
}
export const DeleteRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.String.pipe(T.HttpLabel("FeatureGroupName")),
    RecordIdentifierValueAsString: S.optional(S.String).pipe(
      T.HttpQuery("RecordIdentifierValueAsString"),
    ),
    EventTime: S.optional(S.String).pipe(T.HttpQuery("EventTime")),
    TargetStores: S.optional(TargetStores).pipe(T.HttpQuery("TargetStores")),
    DeletionMode: S.optional(DeletionMode).pipe(T.HttpQuery("DeletionMode")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/FeatureGroup/{FeatureGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecordRequest",
}) as any as S.Schema<DeleteRecordRequest>;
export interface DeleteRecordResponse {}
export const DeleteRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecordResponse",
}) as any as S.Schema<DeleteRecordResponse>;
export interface GetRecordRequest {
  FeatureGroupName: string;
  RecordIdentifierValueAsString?: string;
  FeatureNames?: string[];
  ExpirationTimeResponse?: ExpirationTimeResponse;
}
export const GetRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.String.pipe(T.HttpLabel("FeatureGroupName")),
    RecordIdentifierValueAsString: S.optional(S.String).pipe(
      T.HttpQuery("RecordIdentifierValueAsString"),
    ),
    FeatureNames: S.optional(FeatureNames).pipe(T.HttpQuery("FeatureName")),
    ExpirationTimeResponse: S.optional(ExpirationTimeResponse).pipe(
      T.HttpQuery("ExpirationTimeResponse"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/FeatureGroup/{FeatureGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecordRequest",
}) as any as S.Schema<GetRecordRequest>;
export interface GetRecordResponse {
  Record?: (FeatureValue & { FeatureName: FeatureName })[];
  ExpiresAt?: string;
}
export const GetRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Record: S.optional(Record), ExpiresAt: S.optional(S.String) }),
).annotate({
  identifier: "GetRecordResponse",
}) as any as S.Schema<GetRecordResponse>;
export type ListRecordsMaxResults = number;
export type ListRecordsNextToken = string;
export interface ListRecordsRequest {
  FeatureGroupName: string;
  MaxResults?: number;
  NextToken?: string;
  IncludeSoftDeletedRecords?: boolean;
}
export const ListRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.String.pipe(T.HttpLabel("FeatureGroupName")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    IncludeSoftDeletedRecords: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/FeatureGroup/{FeatureGroupName}/ListRecords",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecordsRequest",
}) as any as S.Schema<ListRecordsRequest>;
export type RecordIdentifierList = string[];
export const RecordIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface ListRecordsResponse {
  RecordIdentifiers: string[];
  NextToken?: string;
}
export const ListRecordsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordIdentifiers: S.optional(RecordIdentifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecordsResponse",
}) as any as S.Schema<ListRecordsResponse>;
export interface PutRecordRequest {
  FeatureGroupName: string;
  Record?: FeatureValue[];
  TargetStores?: TargetStore[];
  TtlDuration?: TtlDuration;
}
export const PutRecordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeatureGroupName: S.String.pipe(T.HttpLabel("FeatureGroupName")),
    Record: S.optional(Record),
    TargetStores: S.optional(TargetStores),
    TtlDuration: S.optional(TtlDuration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/FeatureGroup/{FeatureGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRecordRequest",
}) as any as S.Schema<PutRecordRequest>;
export interface PutRecordResponse {}
export const PutRecordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutRecordResponse",
}) as any as S.Schema<PutRecordResponse>;
export type BatchGetRecordError =
  | AccessForbidden
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Retrieves a batch of `Records` from a `FeatureGroup`.
 */
export const batchGetRecord: API.OperationMethod<
  BatchGetRecordRequest,
  BatchGetRecordResponse,
  BatchGetRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetRecordRequest,
  output: BatchGetRecordResponse,
  errors: [
    AccessForbidden,
    InternalFailure,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRecord",
}));

export type BatchWriteRecordError =
  | AccessForbidden
  | InternalFailure
  | ResourceNotFound
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Writes a batch of `Records` to one or more `FeatureGroup`s. Use
 * this API for bulk ingestion of records into the `OnlineStore` and
 * `OfflineStore`.
 *
 * You can set the ingested records to expire at a given time to live (TTL) duration after
 * the record's event time by specifying the `TtlDuration` parameter. A request
 * level `TtlDuration` applies to all entries that do not specify their own
 * `TtlDuration`.
 */
export const batchWriteRecord: API.OperationMethod<
  BatchWriteRecordRequest,
  BatchWriteRecordResponse,
  BatchWriteRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchWriteRecordRequest,
  output: BatchWriteRecordResponse,
  errors: [
    AccessForbidden,
    InternalFailure,
    ResourceNotFound,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchWriteRecord",
}));

export type DeleteRecordError =
  | AccessForbidden
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | FeatureGroupNotFound
  | CommonErrors;
/**
 * Deletes a `Record` from a `FeatureGroup` in the
 * `OnlineStore`. Feature Store supports both `SoftDelete` and
 * `HardDelete`. For `SoftDelete` (default), feature columns are set
 * to `null` and the record is no longer retrievable by `GetRecord` or
 * `BatchGetRecord`. For `HardDelete`, the complete
 * `Record` is removed from the `OnlineStore`. In both cases, Feature
 * Store appends the deleted record marker to the `OfflineStore`. The deleted
 * record marker is a record with the same `RecordIdentifer` as the original, but
 * with `is_deleted` value set to `True`, `EventTime` set to
 * the delete input `EventTime`, and other feature values set to
 * `null`.
 *
 * Note that the `EventTime` specified in `DeleteRecord` should be
 * set later than the `EventTime` of the existing record in the
 * `OnlineStore` for that `RecordIdentifer`. If it is not, the
 * deletion does not occur:
 *
 * - For `SoftDelete`, the existing (not deleted) record remains in the
 * `OnlineStore`, though the delete record marker is still written to the
 * `OfflineStore`.
 *
 * - `HardDelete` returns `EventTime`: 400
 * ValidationException to indicate that the delete operation failed. No delete
 * record marker is written to the `OfflineStore`.
 *
 * When a record is deleted from the `OnlineStore`, the deleted record marker is
 * appended to the `OfflineStore`. If you have the Iceberg table format enabled for
 * your `OfflineStore`, you can remove all history of a record from the
 * `OfflineStore` using Amazon Athena or Apache Spark. For information on how to
 * hard delete a record from the `OfflineStore` with the Iceberg table format
 * enabled, see Delete records from the offline store.
 */
export const deleteRecord: API.OperationMethod<
  DeleteRecordRequest,
  DeleteRecordResponse,
  DeleteRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecordRequest,
  output: DeleteRecordResponse,
  errors: [
    AccessForbidden,
    InternalFailure,
    ServiceUnavailable,
    ValidationError,
    FeatureGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecord",
}));

export type GetRecordError =
  | AccessForbidden
  | InternalFailure
  | ResourceNotFound
  | ServiceUnavailable
  | ValidationError
  | FeatureGroupNotFound
  | CommonErrors;
/**
 * Use for `OnlineStore` serving from a `FeatureStore`. Only the
 * latest records stored in the `OnlineStore` can be retrieved. If no Record with
 * `RecordIdentifierValue` is found, then an empty result is returned.
 */
export const getRecord: API.OperationMethod<
  GetRecordRequest,
  GetRecordResponse,
  GetRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecordRequest,
  output: GetRecordResponse,
  errors: [
    AccessForbidden,
    InternalFailure,
    ResourceNotFound,
    ServiceUnavailable,
    ValidationError,
    FeatureGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecord",
}));

export type ListRecordsError =
  | AccessForbidden
  | InternalFailure
  | ResourceNotFound
  | ServiceUnavailable
  | ValidationError
  | CommonErrors;
/**
 * Lists the `RecordIdentifier` values of all records stored in a
 * `FeatureGroup`'s `OnlineStore`. This enables you to discover which
 * records exist without retrieving the full record data.
 */
export const listRecords: API.PaginatedOperationMethod<
  ListRecordsRequest,
  ListRecordsResponse,
  ListRecordsError,
  Credentials | HttpClient.HttpClient,
  ValueAsString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecordsRequest,
  output: ListRecordsResponse,
  errors: [
    AccessForbidden,
    InternalFailure,
    ResourceNotFound,
    ServiceUnavailable,
    ValidationError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecords",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecordIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutRecordError =
  | AccessForbidden
  | InternalFailure
  | ServiceUnavailable
  | ValidationError
  | FeatureGroupNotFound
  | CommonErrors;
/**
 * The `PutRecord` API is used to ingest a list of `Records` into
 * your feature group.
 *
 * If a new record’s `EventTime` is greater, the new record is written to both
 * the `OnlineStore` and `OfflineStore`. Otherwise, the record is a
 * historic record and it is written only to the `OfflineStore`.
 *
 * You can specify the ingestion to be applied to the `OnlineStore`,
 * `OfflineStore`, or both by using the `TargetStores` request
 * parameter.
 *
 * You can set the ingested record to expire at a given time to live (TTL) duration after
 * the record’s event time, `ExpiresAt` = `EventTime` +
 * `TtlDuration`, by specifying the `TtlDuration` parameter. A record
 * level `TtlDuration` is set when specifying the `TtlDuration`
 * parameter using the `PutRecord` API call. If the input `TtlDuration`
 * is `null` or unspecified, `TtlDuration` is set to the default feature
 * group level `TtlDuration`. A record level `TtlDuration` supersedes
 * the group level `TtlDuration`.
 */
export const putRecord: API.OperationMethod<
  PutRecordRequest,
  PutRecordResponse,
  PutRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRecordRequest,
  output: PutRecordResponse,
  errors: [
    AccessForbidden,
    InternalFailure,
    ServiceUnavailable,
    ValidationError,
    FeatureGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecord",
}));
