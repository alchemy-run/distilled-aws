import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://dynamodb.amazonaws.com/doc/2012-08-10/");
const svc = T.AwsApiService({
  sdkId: "DynamoDB",
  serviceShapeName: "DynamoDB_20120810",
});
const auth = T.AwsAuthSigv4({ name: "dynamodb" });
const ver = T.ServiceVersion("2012-08-10");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const {
    Region,
    UseDualStack = false,
    UseFIPS = false,
    Endpoint,
    AccountId,
    AccountIdEndpointMode,
    ResourceArn,
    ResourceArnList,
    IsSearchOperation,
  } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = () => ({ metricValues: ["O"] });
  {
    const PartitionResult = _.partition(Region);
    const parsedEndpoint = _.parseURL(Endpoint);
    if (
      Endpoint != null &&
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false &&
      parsedEndpoint != null &&
      parsedEndpoint !== false
    ) {
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
      if (
        _.getAttr(parsedEndpoint, "authority") ===
        `dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`
      ) {
        return err(
          "Endpoint override is not supported for dual-stack endpoints. Please enable dual-stack functionality by enabling the configuration. For more details, see: https://docs.aws.amazon.com/sdkref/latest/guide/feature-endpoints.html",
        );
      }
      if (
        _.getAttr(parsedEndpoint, "authority") ===
        `search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`
      ) {
        return err(
          "Endpoint override is not supported for dual-stack endpoints. Please enable dual-stack functionality by enabling the configuration. For more details, see: https://docs.aws.amazon.com/sdkref/latest/guide/feature-endpoints.html",
        );
      }
      return e(`${Endpoint}`);
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
    return e(`${Endpoint}`);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (Region === "local") {
          if (UseFIPS === true) {
            return err(
              "Invalid Configuration: FIPS and local endpoint are not supported",
            );
          }
          if (UseDualStack === true) {
            return err(
              "Invalid Configuration: Dualstack and local endpoint are not supported",
            );
          }
          return e(
            "http://localhost:8000",
            {
              authSchemes: [
                {
                  signingRegion: "us-east-1",
                  name: "sigv4",
                  signingName: "dynamodb",
                },
              ],
            },
            {},
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            _.getAttr(PartitionResult, "supportsFIPS") === true &&
            _.getAttr(PartitionResult, "supportsDualStack") === true
          ) {
            if (
              AccountIdEndpointMode != null &&
              AccountIdEndpointMode === "required"
            ) {
              return err(
                "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
              );
            }
            if (IsSearchOperation != null && IsSearchOperation === true) {
              return e(
                `https://search-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return e(
              `https://dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              if (
                AccountIdEndpointMode != null &&
                AccountIdEndpointMode === "required"
              ) {
                return err(
                  "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
                );
              }
              if (IsSearchOperation != null && IsSearchOperation === true) {
                return e(
                  `https://search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                );
              }
              return e(
                `https://dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            if (
              AccountIdEndpointMode != null &&
              AccountIdEndpointMode === "required"
            ) {
              return err(
                "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
              );
            }
            if (IsSearchOperation != null && IsSearchOperation === true) {
              return e(
                `https://search-dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return e(
              `https://dynamodb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
            {
              const ParsedArn = _.parseArn(ResourceArn);
              if (
                AccountIdEndpointMode != null &&
                !(AccountIdEndpointMode === "disabled") &&
                _.getAttr(PartitionResult, "name") === "aws" &&
                !(UseFIPS === true) &&
                ResourceArn != null &&
                ParsedArn != null &&
                ParsedArn !== false &&
                _.getAttr(ParsedArn, "service") === "dynamodb" &&
                _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
                _.getAttr(ParsedArn, "region") === `${Region}` &&
                _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
              ) {
                if (IsSearchOperation != null && IsSearchOperation === true) {
                  return e(
                    `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
                return e(
                  `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
            }
            {
              const FirstArn = _.getAttr(ResourceArnList, "[0]");
              const ParsedArn = _.parseArn(FirstArn);
              if (
                AccountIdEndpointMode != null &&
                !(AccountIdEndpointMode === "disabled") &&
                _.getAttr(PartitionResult, "name") === "aws" &&
                !(UseFIPS === true) &&
                ResourceArnList != null &&
                FirstArn != null &&
                FirstArn !== false &&
                ParsedArn != null &&
                ParsedArn !== false &&
                _.getAttr(ParsedArn, "service") === "dynamodb" &&
                _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
                _.getAttr(ParsedArn, "region") === `${Region}` &&
                _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
              ) {
                if (IsSearchOperation != null && IsSearchOperation === true) {
                  return e(
                    `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
                return e(
                  `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
            }
            if (
              AccountIdEndpointMode != null &&
              !(AccountIdEndpointMode === "disabled") &&
              _.getAttr(PartitionResult, "name") === "aws" &&
              !(UseFIPS === true) &&
              AccountId != null
            ) {
              if (_.isValidHostLabel(AccountId, false)) {
                if (IsSearchOperation != null && IsSearchOperation === true) {
                  return e(
                    `https://${AccountId}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
                return e(
                  `https://${AccountId}.ddb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return err("Credentials-sourced account ID parameter is invalid");
            }
            if (
              AccountIdEndpointMode != null &&
              AccountIdEndpointMode === "required"
            ) {
              if (!(UseFIPS === true)) {
                if (_.getAttr(PartitionResult, "name") === "aws") {
                  return err(
                    "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded",
                  );
                }
                return err(
                  "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition",
                );
              }
              return err(
                "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
              );
            }
            if (IsSearchOperation != null && IsSearchOperation === true) {
              return e(
                `https://search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return e(
              `https://dynamodb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        {
          const ParsedArn = _.parseArn(ResourceArn);
          if (
            AccountIdEndpointMode != null &&
            !(AccountIdEndpointMode === "disabled") &&
            _.getAttr(PartitionResult, "name") === "aws" &&
            !(UseFIPS === true) &&
            ResourceArn != null &&
            ParsedArn != null &&
            ParsedArn !== false &&
            _.getAttr(ParsedArn, "service") === "dynamodb" &&
            _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
            _.getAttr(ParsedArn, "region") === `${Region}` &&
            _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
          ) {
            if (IsSearchOperation != null && IsSearchOperation === true) {
              return e(
                `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return e(
              `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
        }
        {
          const FirstArn = _.getAttr(ResourceArnList, "[0]");
          const ParsedArn = _.parseArn(FirstArn);
          if (
            AccountIdEndpointMode != null &&
            !(AccountIdEndpointMode === "disabled") &&
            _.getAttr(PartitionResult, "name") === "aws" &&
            !(UseFIPS === true) &&
            ResourceArnList != null &&
            FirstArn != null &&
            FirstArn !== false &&
            ParsedArn != null &&
            ParsedArn !== false &&
            _.getAttr(ParsedArn, "service") === "dynamodb" &&
            _.isValidHostLabel(_.getAttr(ParsedArn, "region"), false) &&
            _.getAttr(ParsedArn, "region") === `${Region}` &&
            _.isValidHostLabel(_.getAttr(ParsedArn, "accountId"), false)
          ) {
            if (IsSearchOperation != null && IsSearchOperation === true) {
              return e(
                `https://${_.getAttr(ParsedArn, "accountId")}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return e(
              `https://${_.getAttr(ParsedArn, "accountId")}.ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
        }
        if (
          AccountIdEndpointMode != null &&
          !(AccountIdEndpointMode === "disabled") &&
          _.getAttr(PartitionResult, "name") === "aws" &&
          !(UseFIPS === true) &&
          AccountId != null
        ) {
          if (_.isValidHostLabel(AccountId, false)) {
            if (IsSearchOperation != null && IsSearchOperation === true) {
              return e(
                `https://${AccountId}.search-ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return e(
              `https://${AccountId}.ddb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
          return err("Credentials-sourced account ID parameter is invalid");
        }
        if (
          AccountIdEndpointMode != null &&
          AccountIdEndpointMode === "required"
        ) {
          if (!(UseFIPS === true)) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return err(
                "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded",
              );
            }
            return err(
              "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition",
            );
          }
          return err(
            "Invalid Configuration: AccountIdEndpointMode is required and FIPS is enabled, but FIPS account endpoints are not supported",
          );
        }
        if (IsSearchOperation != null && IsSearchOperation === true) {
          return e(
            `https://search-dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        return e(
          `https://dynamodb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BackupInUseException
  extends /*@__PURE__*/ S.TaggedError<BackupInUseException>()(
    "BackupInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class BackupNotFoundException
  extends /*@__PURE__*/ S.TaggedError<BackupNotFoundException>()(
    "BackupNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ConditionalCheckFailedException
  extends /*@__PURE__*/ S.TaggedError<ConditionalCheckFailedException>()(
    "ConditionalCheckFailedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Item: S.optional(
        S.suspend(() => AttributeMap).annotate({ identifier: "AttributeMap" }),
      ),
    },
  ).pipe(C.withConflictError) {}
export class ContinuousBackupsUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ContinuousBackupsUnavailableException>()(
    "ContinuousBackupsUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class DuplicateItemException
  extends /*@__PURE__*/ S.TaggedError<DuplicateItemException>()(
    "DuplicateItemException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class ExportConflictException
  extends /*@__PURE__*/ S.TaggedError<ExportConflictException>()(
    "ExportConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class ExportNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ExportNotFoundException>()(
    "ExportNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class GlobalTableAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<GlobalTableAlreadyExistsException>()(
    "GlobalTableAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class GlobalTableNotFoundException
  extends /*@__PURE__*/ S.TaggedError<GlobalTableNotFoundException>()(
    "GlobalTableNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ImportConflictException
  extends /*@__PURE__*/ S.TaggedError<ImportConflictException>()(
    "ImportConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class ImportNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ImportNotFoundException>()(
    "ImportNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class IndexNotFoundException
  extends /*@__PURE__*/ S.TaggedError<IndexNotFoundException>()(
    "IndexNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidEndpointException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointException>()(
    "InvalidEndpointException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(421),
  ).pipe(C.withBadRequestError) {}
export class InvalidExportTimeException
  extends /*@__PURE__*/ S.TaggedError<InvalidExportTimeException>()(
    "InvalidExportTimeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class InvalidRestoreTimeException
  extends /*@__PURE__*/ S.TaggedError<InvalidRestoreTimeException>()(
    "InvalidRestoreTimeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ItemCollectionSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ItemCollectionSizeLimitExceededException>()(
    "ItemCollectionSizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withQuotaError, C.withRetryableError) {}
export class PointInTimeRecoveryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<PointInTimeRecoveryUnavailableException>()(
    "PointInTimeRecoveryUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()(
    "PolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedThroughputExceededException>()(
    "ProvisionedThroughputExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ThrottlingReasons: S.optional(
        S.suspend(() => ThrottlingReasonList).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ReplicaAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ReplicaAlreadyExistsException>()(
    "ReplicaAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ReplicaNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ReplicaNotFoundException>()(
    "ReplicaNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ReplicatedWriteConflictException
  extends /*@__PURE__*/ S.TaggedError<ReplicatedWriteConflictException>()(
    "ReplicatedWriteConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.Retryable(),
  ).pipe(C.withRetryableError) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()(
    "RequestLimitExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ThrottlingReasons: S.optional(
        S.suspend(() => ThrottlingReasonList).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class TableAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TableAlreadyExistsException>()(
    "TableAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class TableInUseException
  extends /*@__PURE__*/ S.TaggedError<TableInUseException>()(
    "TableInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class TableNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TableNotFoundException>()(
    "TableNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      throttlingReasons: S.optional(
        S.suspend(() => ThrottlingReasonList).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
    T.all(
      T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class TransactionCanceledException
  extends /*@__PURE__*/ S.TaggedError<TransactionCanceledException>()(
    "TransactionCanceledException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      CancellationReasons: S.optional(
        S.suspend(() => CancellationReasonList).annotate({
          identifier: "CancellationReasonList",
        }),
      ),
    },
  ) {}
export class TransactionConflictException
  extends /*@__PURE__*/ S.TaggedError<TransactionConflictException>()(
    "TransactionConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class TransactionInProgressException
  extends /*@__PURE__*/ S.TaggedError<TransactionInProgressException>()(
    "TransactionInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export type PartiQLStatement = string;
export type StringAttributeValue = string;
export type NumberAttributeValue = string;
export type BinaryAttributeValue = Uint8Array;
export type StringSetAttributeValue = string[];
export const StringSetAttributeValue = /*@__PURE__*/ S.Array(S.String);
export type NumberSetAttributeValue = string[];
export const NumberSetAttributeValue = /*@__PURE__*/ S.Array(S.String);
export type BinarySetAttributeValue = Uint8Array[];
export const BinarySetAttributeValue = /*@__PURE__*/ S.Array(T.Blob);
export type AttributeName = string;
export type MapAttributeValue = { [key: string]: AttributeValue | undefined };
export const MapAttributeValue = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
) as any as S.Schema<MapAttributeValue>;
export type ListAttributeValue = AttributeValue[];
export const ListAttributeValue = /*@__PURE__*/ S.Array(
  S.suspend(() => AttributeValue).annotate({ identifier: "AttributeValue" }),
) as any as S.Schema<ListAttributeValue>;
export type NullAttributeValue = boolean;
export type BooleanAttributeValue = boolean;
export type AttributeValue =
  | {
      S: string;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N: string;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B: Uint8Array;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS: string[];
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS: string[];
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS: Uint8Array[];
      M?: never;
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M: { [key: string]: AttributeValue | undefined };
      L?: never;
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L: AttributeValue[];
      NULL?: never;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL: boolean;
      BOOL?: never;
    }
  | {
      S?: never;
      N?: never;
      B?: never;
      SS?: never;
      NS?: never;
      BS?: never;
      M?: never;
      L?: never;
      NULL?: never;
      BOOL: boolean;
    };
export const AttributeValue = /*@__PURE__*/ S.Union([
  S.Struct({ S: S.String }),
  S.Struct({ N: S.String }),
  S.Struct({ B: T.Blob }),
  S.Struct({ SS: StringSetAttributeValue }),
  S.Struct({ NS: NumberSetAttributeValue }),
  S.Struct({ BS: BinarySetAttributeValue }),
  S.Struct({
    M: S.suspend(() => MapAttributeValue).annotate({
      identifier: "MapAttributeValue",
    }),
  }),
  S.Struct({
    L: S.suspend(() => ListAttributeValue).annotate({
      identifier: "ListAttributeValue",
    }),
  }),
  S.Struct({ NULL: S.Boolean }),
  S.Struct({ BOOL: S.Boolean }),
]) as any as S.Schema<AttributeValue>;
export type PreparedStatementParameters = AttributeValue[];
export const PreparedStatementParameters = /*@__PURE__*/ S.Array(
  S.suspend(() => AttributeValue).annotate({ identifier: "AttributeValue" }),
);
export type ConsistentRead = boolean;
export type ReturnValuesOnConditionCheckFailure =
  | "ALL_OLD"
  | "NONE"
  | (string & {});
export const ReturnValuesOnConditionCheckFailure = S.String;

export interface BatchStatementRequest {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const BatchStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statement: S.String,
    Parameters: S.optional(PreparedStatementParameters),
    ConsistentRead: S.optional(S.Boolean),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }),
).annotate({
  identifier: "BatchStatementRequest",
}) as any as S.Schema<BatchStatementRequest>;
export type PartiQLBatchRequest = BatchStatementRequest[];
export const PartiQLBatchRequest = /*@__PURE__*/ S.Array(BatchStatementRequest);
export type ReturnConsumedCapacity =
  | "INDEXES"
  | "TOTAL"
  | "NONE"
  | (string & {});
export const ReturnConsumedCapacity = S.String;

export interface BatchExecuteStatementInput {
  Statements: BatchStatementRequest[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export const BatchExecuteStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statements: PartiQLBatchRequest,
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchExecuteStatementInput",
}) as any as S.Schema<BatchExecuteStatementInput>;
export type BatchStatementErrorCodeEnum =
  | "ConditionalCheckFailed"
  | "ItemCollectionSizeLimitExceeded"
  | "RequestLimitExceeded"
  | "ValidationError"
  | "ProvisionedThroughputExceeded"
  | "TransactionConflict"
  | "ThrottlingError"
  | "InternalServerError"
  | "ResourceNotFound"
  | "AccessDenied"
  | "DuplicateItem"
  | (string & {});
export const BatchStatementErrorCodeEnum = S.String;

export type AttributeMap = { [key: string]: AttributeValue | undefined };
export const AttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export interface BatchStatementError {
  Code?: BatchStatementErrorCodeEnum;
  Message?: string;
  Item?: { [key: string]: AttributeValue | undefined };
}
export const BatchStatementError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(BatchStatementErrorCodeEnum),
    Message: S.optional(S.String),
    Item: S.optional(AttributeMap),
  }),
).annotate({
  identifier: "BatchStatementError",
}) as any as S.Schema<BatchStatementError>;
export type TableName = string;
export interface BatchStatementResponse {
  Error?: BatchStatementError;
  TableName?: string;
  Item?: { [key: string]: AttributeValue | undefined };
}
export const BatchStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Error: S.optional(BatchStatementError),
    TableName: S.optional(S.String),
    Item: S.optional(AttributeMap),
  }),
).annotate({
  identifier: "BatchStatementResponse",
}) as any as S.Schema<BatchStatementResponse>;
export type PartiQLBatchResponse = BatchStatementResponse[];
export const PartiQLBatchResponse = /*@__PURE__*/ S.Array(
  BatchStatementResponse,
);
export type TableArn = string;
export type ConsumedCapacityUnits = number;
export interface Capacity {
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
  CapacityUnits?: number;
}
export const Capacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadCapacityUnits: S.optional(S.Number),
    WriteCapacityUnits: S.optional(S.Number),
    CapacityUnits: S.optional(S.Number),
  }),
).annotate({ identifier: "Capacity" }) as any as S.Schema<Capacity>;
export type IndexName = string;
export type SecondaryIndexesCapacityMap = {
  [key: string]: Capacity | undefined;
};
export const SecondaryIndexesCapacityMap = /*@__PURE__*/ S.Record(
  S.String,
  Capacity.pipe(S.optional),
);
export interface VectorCapacity {
  VectorSearchRequestBytes?: number;
  VectorWriteRequestBytes?: number;
}
export const VectorCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VectorSearchRequestBytes: S.optional(S.Number),
    VectorWriteRequestBytes: S.optional(S.Number),
  }),
).annotate({ identifier: "VectorCapacity" }) as any as S.Schema<VectorCapacity>;
export type VectorIndexesCapacityMap = {
  [key: string]: VectorCapacity | undefined;
};
export const VectorIndexesCapacityMap = /*@__PURE__*/ S.Record(
  S.String,
  VectorCapacity.pipe(S.optional),
);
export interface ConsumedCapacity {
  TableName?: string;
  CapacityUnits?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
  Table?: Capacity;
  LocalSecondaryIndexes?: { [key: string]: Capacity | undefined };
  GlobalSecondaryIndexes?: { [key: string]: Capacity | undefined };
  VectorIndexes?: { [key: string]: VectorCapacity | undefined };
}
export const ConsumedCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    CapacityUnits: S.optional(S.Number),
    ReadCapacityUnits: S.optional(S.Number),
    WriteCapacityUnits: S.optional(S.Number),
    Table: S.optional(Capacity),
    LocalSecondaryIndexes: S.optional(SecondaryIndexesCapacityMap),
    GlobalSecondaryIndexes: S.optional(SecondaryIndexesCapacityMap),
    VectorIndexes: S.optional(VectorIndexesCapacityMap),
  }),
).annotate({
  identifier: "ConsumedCapacity",
}) as any as S.Schema<ConsumedCapacity>;
export type ConsumedCapacityMultiple = ConsumedCapacity[];
export const ConsumedCapacityMultiple = /*@__PURE__*/ S.Array(ConsumedCapacity);
export interface BatchExecuteStatementOutput {
  Responses?: BatchStatementResponse[];
  ConsumedCapacity?: ConsumedCapacity[];
}
export const BatchExecuteStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Responses: S.optional(PartiQLBatchResponse),
    ConsumedCapacity: S.optional(ConsumedCapacityMultiple),
  }).pipe(ns),
).annotate({
  identifier: "BatchExecuteStatementOutput",
}) as any as S.Schema<BatchExecuteStatementOutput>;
export type Key = { [key: string]: AttributeValue | undefined };
export const Key = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export type KeyList = { [key: string]: AttributeValue | undefined }[];
export const KeyList = /*@__PURE__*/ S.Array(Key);
export type AttributeNameList = string[];
export const AttributeNameList = /*@__PURE__*/ S.Array(S.String);
export type ProjectionExpression = string;
export type ExpressionAttributeNameVariable = string;
export type ExpressionAttributeNameMap = { [key: string]: string | undefined };
export const ExpressionAttributeNameMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface KeysAndAttributes {
  Keys: { [key: string]: AttributeValue | undefined }[];
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  ProjectionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
}
export const KeysAndAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Keys: KeyList,
    AttributesToGet: S.optional(AttributeNameList),
    ConsistentRead: S.optional(S.Boolean),
    ProjectionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
  }),
).annotate({
  identifier: "KeysAndAttributes",
}) as any as S.Schema<KeysAndAttributes>;
export type BatchGetRequestMap = {
  [key: string]: KeysAndAttributes | undefined;
};
export const BatchGetRequestMap = /*@__PURE__*/ S.Record(
  S.String,
  KeysAndAttributes.pipe(S.optional),
);
export interface BatchGetItemInput {
  RequestItems: { [key: string]: KeysAndAttributes | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export const BatchGetItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestItems: BatchGetRequestMap,
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetItemInput",
}) as any as S.Schema<BatchGetItemInput>;
export type ItemList = { [key: string]: AttributeValue | undefined }[];
export const ItemList = /*@__PURE__*/ S.Array(AttributeMap);
export type BatchGetResponseMap = {
  [key: string]: { [key: string]: AttributeValue | undefined }[] | undefined;
};
export const BatchGetResponseMap = /*@__PURE__*/ S.Record(
  S.String,
  ItemList.pipe(S.optional),
);
export interface BatchGetItemOutput {
  Responses?: {
    [key: string]: { [key: string]: AttributeValue | undefined }[] | undefined;
  };
  UnprocessedKeys?: { [key: string]: KeysAndAttributes | undefined };
  ConsumedCapacity?: ConsumedCapacity[];
}
export const BatchGetItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Responses: S.optional(BatchGetResponseMap),
    UnprocessedKeys: S.optional(BatchGetRequestMap),
    ConsumedCapacity: S.optional(ConsumedCapacityMultiple),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetItemOutput",
}) as any as S.Schema<BatchGetItemOutput>;
export type PutItemInputAttributeMap = {
  [key: string]: AttributeValue | undefined;
};
export const PutItemInputAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export interface PutRequest {
  Item: { [key: string]: AttributeValue | undefined };
}
export const PutRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Item: PutItemInputAttributeMap }),
).annotate({ identifier: "PutRequest" }) as any as S.Schema<PutRequest>;
export interface DeleteRequest {
  Key: { [key: string]: AttributeValue | undefined };
}
export const DeleteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: Key }),
).annotate({ identifier: "DeleteRequest" }) as any as S.Schema<DeleteRequest>;
export interface WriteRequest {
  PutRequest?: PutRequest;
  DeleteRequest?: DeleteRequest;
}
export const WriteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PutRequest: S.optional(PutRequest),
    DeleteRequest: S.optional(DeleteRequest),
  }),
).annotate({ identifier: "WriteRequest" }) as any as S.Schema<WriteRequest>;
export type WriteRequests = WriteRequest[];
export const WriteRequests = /*@__PURE__*/ S.Array(WriteRequest);
export type BatchWriteItemRequestMap = {
  [key: string]: WriteRequest[] | undefined;
};
export const BatchWriteItemRequestMap = /*@__PURE__*/ S.Record(
  S.String,
  WriteRequests.pipe(S.optional),
);
export type ReturnItemCollectionMetrics = "SIZE" | "NONE" | (string & {});
export const ReturnItemCollectionMetrics = S.String;

export interface BatchWriteItemInput {
  RequestItems: { [key: string]: WriteRequest[] | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
}
export const BatchWriteItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestItems: BatchWriteItemRequestMap,
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ReturnItemCollectionMetrics: S.optional(ReturnItemCollectionMetrics),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchWriteItemInput",
}) as any as S.Schema<BatchWriteItemInput>;
export type ItemCollectionKeyAttributeMap = {
  [key: string]: AttributeValue | undefined;
};
export const ItemCollectionKeyAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export type ItemCollectionSizeEstimateBound = number;
export type ItemCollectionSizeEstimateRange = number[];
export const ItemCollectionSizeEstimateRange = /*@__PURE__*/ S.Array(S.Number);
export interface ItemCollectionMetrics {
  ItemCollectionKey?: { [key: string]: AttributeValue | undefined };
  SizeEstimateRangeGB?: number[];
}
export const ItemCollectionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCollectionKey: S.optional(ItemCollectionKeyAttributeMap),
    SizeEstimateRangeGB: S.optional(ItemCollectionSizeEstimateRange),
  }),
).annotate({
  identifier: "ItemCollectionMetrics",
}) as any as S.Schema<ItemCollectionMetrics>;
export type ItemCollectionMetricsMultiple = ItemCollectionMetrics[];
export const ItemCollectionMetricsMultiple = /*@__PURE__*/ S.Array(
  ItemCollectionMetrics,
);
export type ItemCollectionMetricsPerTable = {
  [key: string]: ItemCollectionMetrics[] | undefined;
};
export const ItemCollectionMetricsPerTable = /*@__PURE__*/ S.Record(
  S.String,
  ItemCollectionMetricsMultiple.pipe(S.optional),
);
export interface BatchWriteItemOutput {
  UnprocessedItems?: { [key: string]: WriteRequest[] | undefined };
  ItemCollectionMetrics?: {
    [key: string]: ItemCollectionMetrics[] | undefined;
  };
  ConsumedCapacity?: ConsumedCapacity[];
}
export const BatchWriteItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UnprocessedItems: S.optional(BatchWriteItemRequestMap),
    ItemCollectionMetrics: S.optional(ItemCollectionMetricsPerTable),
    ConsumedCapacity: S.optional(ConsumedCapacityMultiple),
  }).pipe(ns),
).annotate({
  identifier: "BatchWriteItemOutput",
}) as any as S.Schema<BatchWriteItemOutput>;
export type BackupName = string;
export interface CreateBackupInput {
  TableName: string;
  BackupName: string;
}
export const CreateBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    BackupName: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBackupInput",
}) as any as S.Schema<CreateBackupInput>;
export type BackupArn = string;
export type BackupSizeBytes = number;
export type BackupStatus = "CREATING" | "DELETED" | "AVAILABLE" | (string & {});
export const BackupStatus = S.String;

export type BackupType = "USER" | "SYSTEM" | "AWS_BACKUP" | (string & {});
export const BackupType = S.String;

export type BackupCreationDateTime = Date;
export interface BackupDetails {
  BackupArn: string;
  BackupName: string;
  BackupSizeBytes?: number;
  BackupStatus: BackupStatus;
  BackupType: BackupType;
  BackupCreationDateTime: Date;
  BackupExpiryDateTime?: Date;
}
export const BackupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupArn: S.String,
    BackupName: S.String,
    BackupSizeBytes: S.optional(S.Number),
    BackupStatus: BackupStatus,
    BackupType: BackupType,
    BackupCreationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    BackupExpiryDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "BackupDetails" }) as any as S.Schema<BackupDetails>;
export interface CreateBackupOutput {
  BackupDetails?: BackupDetails;
}
export const CreateBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupDetails: S.optional(BackupDetails) }).pipe(ns),
).annotate({
  identifier: "CreateBackupOutput",
}) as any as S.Schema<CreateBackupOutput>;
export type RegionName = string;
export interface Replica {
  RegionName?: string;
}
export const Replica = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegionName: S.optional(S.String) }),
).annotate({ identifier: "Replica" }) as any as S.Schema<Replica>;
export type ReplicaList = Replica[];
export const ReplicaList = /*@__PURE__*/ S.Array(Replica);
export interface CreateGlobalTableInput {
  GlobalTableName: string;
  ReplicationGroup: Replica[];
}
export const CreateGlobalTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.String.pipe(T.ContextParam("ResourceArn")),
    ReplicationGroup: ReplicaList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlobalTableInput",
}) as any as S.Schema<CreateGlobalTableInput>;
export type ReplicaStatus =
  | "CREATING"
  | "CREATION_FAILED"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "REGION_DISABLED"
  | "INACCESSIBLE_ENCRYPTION_CREDENTIALS"
  | "ARCHIVING"
  | "ARCHIVED"
  | "REPLICATION_NOT_AUTHORIZED"
  | (string & {});
export const ReplicaStatus = S.String;

export type ReplicaStatusDescription = string;
export type ReplicaStatusPercentProgress = string;
export type KMSMasterKeyId = string;
export type PositiveLongObject = number;
export interface ProvisionedThroughputOverride {
  ReadCapacityUnits?: number;
}
export const ProvisionedThroughputOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReadCapacityUnits: S.optional(S.Number) }),
).annotate({
  identifier: "ProvisionedThroughputOverride",
}) as any as S.Schema<ProvisionedThroughputOverride>;
export type LongObject = number;
export interface OnDemandThroughputOverride {
  MaxReadRequestUnits?: number;
}
export const OnDemandThroughputOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxReadRequestUnits: S.optional(S.Number) }),
).annotate({
  identifier: "OnDemandThroughputOverride",
}) as any as S.Schema<OnDemandThroughputOverride>;
export type TableStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | "INACCESSIBLE_ENCRYPTION_CREDENTIALS"
  | "ARCHIVING"
  | "ARCHIVED"
  | "REPLICATION_NOT_AUTHORIZED"
  | (string & {});
export const TableStatus = S.String;

export interface TableWarmThroughputDescription {
  ReadUnitsPerSecond?: number;
  WriteUnitsPerSecond?: number;
  Status?: TableStatus;
}
export const TableWarmThroughputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadUnitsPerSecond: S.optional(S.Number),
    WriteUnitsPerSecond: S.optional(S.Number),
    Status: S.optional(TableStatus),
  }),
).annotate({
  identifier: "TableWarmThroughputDescription",
}) as any as S.Schema<TableWarmThroughputDescription>;
export type IndexStatus =
  | "CREATING"
  | "UPDATING"
  | "DELETING"
  | "ACTIVE"
  | (string & {});
export const IndexStatus = S.String;

export interface GlobalSecondaryIndexWarmThroughputDescription {
  ReadUnitsPerSecond?: number;
  WriteUnitsPerSecond?: number;
  Status?: IndexStatus;
}
export const GlobalSecondaryIndexWarmThroughputDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReadUnitsPerSecond: S.optional(S.Number),
      WriteUnitsPerSecond: S.optional(S.Number),
      Status: S.optional(IndexStatus),
    }),
  ).annotate({
    identifier: "GlobalSecondaryIndexWarmThroughputDescription",
  }) as any as S.Schema<GlobalSecondaryIndexWarmThroughputDescription>;
export interface ReplicaGlobalSecondaryIndexDescription {
  IndexName?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  WarmThroughput?: GlobalSecondaryIndexWarmThroughputDescription;
}
export const ReplicaGlobalSecondaryIndexDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IndexName: S.optional(S.String),
      ProvisionedThroughputOverride: S.optional(ProvisionedThroughputOverride),
      OnDemandThroughputOverride: S.optional(OnDemandThroughputOverride),
      WarmThroughput: S.optional(GlobalSecondaryIndexWarmThroughputDescription),
    }),
).annotate({
  identifier: "ReplicaGlobalSecondaryIndexDescription",
}) as any as S.Schema<ReplicaGlobalSecondaryIndexDescription>;
export type ReplicaGlobalSecondaryIndexDescriptionList =
  ReplicaGlobalSecondaryIndexDescription[];
export const ReplicaGlobalSecondaryIndexDescriptionList = /*@__PURE__*/ S.Array(
  ReplicaGlobalSecondaryIndexDescription,
);
export type TableClass =
  | "STANDARD"
  | "STANDARD_INFREQUENT_ACCESS"
  | (string & {});
export const TableClass = S.String;

export interface TableClassSummary {
  TableClass?: TableClass;
  LastUpdateDateTime?: Date;
}
export const TableClassSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableClass: S.optional(TableClass),
    LastUpdateDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TableClassSummary",
}) as any as S.Schema<TableClassSummary>;
export type GlobalTableSettingsReplicationMode =
  | "ENABLED"
  | "DISABLED"
  | "ENABLED_WITH_OVERRIDES"
  | (string & {});
export const GlobalTableSettingsReplicationMode = S.String;

export interface ReplicaDescription {
  RegionName?: string;
  ReplicaStatus?: ReplicaStatus;
  ReplicaArn?: string;
  ReplicaStatusDescription?: string;
  ReplicaStatusPercentProgress?: string;
  KMSMasterKeyId?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  WarmThroughput?: TableWarmThroughputDescription;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndexDescription[];
  ReplicaInaccessibleDateTime?: Date;
  ReplicaTableClassSummary?: TableClassSummary;
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
}
export const ReplicaDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    ReplicaStatus: S.optional(ReplicaStatus),
    ReplicaArn: S.optional(S.String),
    ReplicaStatusDescription: S.optional(S.String),
    ReplicaStatusPercentProgress: S.optional(S.String),
    KMSMasterKeyId: S.optional(S.String),
    ProvisionedThroughputOverride: S.optional(ProvisionedThroughputOverride),
    OnDemandThroughputOverride: S.optional(OnDemandThroughputOverride),
    WarmThroughput: S.optional(TableWarmThroughputDescription),
    GlobalSecondaryIndexes: S.optional(
      ReplicaGlobalSecondaryIndexDescriptionList,
    ),
    ReplicaInaccessibleDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReplicaTableClassSummary: S.optional(TableClassSummary),
    GlobalTableSettingsReplicationMode: S.optional(
      GlobalTableSettingsReplicationMode,
    ),
  }),
).annotate({
  identifier: "ReplicaDescription",
}) as any as S.Schema<ReplicaDescription>;
export type ReplicaDescriptionList = ReplicaDescription[];
export const ReplicaDescriptionList = /*@__PURE__*/ S.Array(ReplicaDescription);
export type GlobalTableArnString = string;
export type GlobalTableStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const GlobalTableStatus = S.String;

export interface GlobalTableDescription {
  ReplicationGroup?: ReplicaDescription[];
  GlobalTableArn?: string;
  CreationDateTime?: Date;
  GlobalTableStatus?: GlobalTableStatus;
  GlobalTableName?: string;
}
export const GlobalTableDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroup: S.optional(ReplicaDescriptionList),
    GlobalTableArn: S.optional(S.String),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    GlobalTableStatus: S.optional(GlobalTableStatus),
    GlobalTableName: S.optional(S.String),
  }),
).annotate({
  identifier: "GlobalTableDescription",
}) as any as S.Schema<GlobalTableDescription>;
export interface CreateGlobalTableOutput {
  GlobalTableDescription?: GlobalTableDescription;
}
export const CreateGlobalTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalTableDescription: S.optional(GlobalTableDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateGlobalTableOutput",
}) as any as S.Schema<CreateGlobalTableOutput>;
export type KeySchemaAttributeName = string;
export type ScalarAttributeType = "S" | "N" | "B" | (string & {});
export const ScalarAttributeType = S.String;

export interface AttributeDefinition {
  AttributeName: string;
  AttributeType: ScalarAttributeType;
}
export const AttributeDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeName: S.String, AttributeType: ScalarAttributeType }),
).annotate({
  identifier: "AttributeDefinition",
}) as any as S.Schema<AttributeDefinition>;
export type AttributeDefinitions = AttributeDefinition[];
export const AttributeDefinitions = /*@__PURE__*/ S.Array(AttributeDefinition);
export type KeyType = "HASH" | "RANGE" | (string & {});
export const KeyType = S.String;

export interface KeySchemaElement {
  AttributeName: string;
  KeyType: KeyType;
}
export const KeySchemaElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeName: S.String, KeyType: KeyType }),
).annotate({
  identifier: "KeySchemaElement",
}) as any as S.Schema<KeySchemaElement>;
export type KeySchema = KeySchemaElement[];
export const KeySchema = /*@__PURE__*/ S.Array(KeySchemaElement);
export type ProjectionType = "ALL" | "KEYS_ONLY" | "INCLUDE" | (string & {});
export const ProjectionType = S.String;

export type NonKeyAttributeName = string;
export type NonKeyAttributeNameList = string[];
export const NonKeyAttributeNameList = /*@__PURE__*/ S.Array(S.String);
export interface Projection {
  ProjectionType?: ProjectionType;
  NonKeyAttributes?: string[];
}
export const Projection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectionType: S.optional(ProjectionType),
    NonKeyAttributes: S.optional(NonKeyAttributeNameList),
  }),
).annotate({ identifier: "Projection" }) as any as S.Schema<Projection>;
export interface LocalSecondaryIndex {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
}
export const LocalSecondaryIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    KeySchema: KeySchema,
    Projection: Projection,
  }),
).annotate({
  identifier: "LocalSecondaryIndex",
}) as any as S.Schema<LocalSecondaryIndex>;
export type LocalSecondaryIndexList = LocalSecondaryIndex[];
export const LocalSecondaryIndexList =
  /*@__PURE__*/ S.Array(LocalSecondaryIndex);
export interface ProvisionedThroughput {
  ReadCapacityUnits: number;
  WriteCapacityUnits: number;
}
export const ProvisionedThroughput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReadCapacityUnits: S.Number, WriteCapacityUnits: S.Number }),
).annotate({
  identifier: "ProvisionedThroughput",
}) as any as S.Schema<ProvisionedThroughput>;
export interface OnDemandThroughput {
  MaxReadRequestUnits?: number;
  MaxWriteRequestUnits?: number;
}
export const OnDemandThroughput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxReadRequestUnits: S.optional(S.Number),
    MaxWriteRequestUnits: S.optional(S.Number),
  }),
).annotate({
  identifier: "OnDemandThroughput",
}) as any as S.Schema<OnDemandThroughput>;
export interface WarmThroughput {
  ReadUnitsPerSecond?: number;
  WriteUnitsPerSecond?: number;
}
export const WarmThroughput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadUnitsPerSecond: S.optional(S.Number),
    WriteUnitsPerSecond: S.optional(S.Number),
  }),
).annotate({ identifier: "WarmThroughput" }) as any as S.Schema<WarmThroughput>;
export interface GlobalSecondaryIndex {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
}
export const GlobalSecondaryIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    KeySchema: KeySchema,
    Projection: Projection,
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    WarmThroughput: S.optional(WarmThroughput),
  }),
).annotate({
  identifier: "GlobalSecondaryIndex",
}) as any as S.Schema<GlobalSecondaryIndex>;
export type GlobalSecondaryIndexList = GlobalSecondaryIndex[];
export const GlobalSecondaryIndexList =
  /*@__PURE__*/ S.Array(GlobalSecondaryIndex);
export type BillingMode = "PROVISIONED" | "PAY_PER_REQUEST" | (string & {});
export const BillingMode = S.String;

export type StreamEnabled = boolean;
export type StreamViewType =
  | "NEW_IMAGE"
  | "OLD_IMAGE"
  | "NEW_AND_OLD_IMAGES"
  | "KEYS_ONLY"
  | (string & {});
export const StreamViewType = S.String;

export interface StreamSpecification {
  StreamEnabled: boolean;
  StreamViewType?: StreamViewType;
}
export const StreamSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamEnabled: S.Boolean,
    StreamViewType: S.optional(StreamViewType),
  }),
).annotate({
  identifier: "StreamSpecification",
}) as any as S.Schema<StreamSpecification>;
export type SSEEnabled = boolean;
export type SSEType = "AES256" | "KMS" | (string & {});
export const SSEType = S.String;

export interface SSESpecification {
  Enabled?: boolean;
  SSEType?: SSEType;
  KMSMasterKeyId?: string;
}
export const SSESpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SSEType: S.optional(SSEType),
    KMSMasterKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "SSESpecification",
}) as any as S.Schema<SSESpecification>;
export type TagKeyString = string;
export type TagValueString = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type DeletionProtectionEnabled = boolean;
export type ResourcePolicy = string;
export type VectorAttributeName = string;
export interface VectorAttributeDefinition {
  AttributeName: string;
}
export const VectorAttributeDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeName: S.String }),
).annotate({
  identifier: "VectorAttributeDefinition",
}) as any as S.Schema<VectorAttributeDefinition>;
export type SearchSchemaElementType = "HASH" | "INLINE_FILTER" | (string & {});
export const SearchSchemaElementType = S.String;

export interface SearchSchemaElement {
  AttributeName: string;
  SearchSchemaElementType: SearchSchemaElementType;
}
export const SearchSchemaElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.String,
    SearchSchemaElementType: SearchSchemaElementType,
  }),
).annotate({
  identifier: "SearchSchemaElement",
}) as any as S.Schema<SearchSchemaElement>;
export type SearchSchema = SearchSchemaElement[];
export const SearchSchema = /*@__PURE__*/ S.Array(SearchSchemaElement);
export type VectorDistanceFunction =
  | "COSINE"
  | "DOT_PRODUCT"
  | "EUCLIDEAN"
  | (string & {});
export const VectorDistanceFunction = S.String;

export interface VectorIndex {
  IndexName: string;
  VectorAttribute: VectorAttributeDefinition;
  SearchSchema?: SearchSchemaElement[];
  Projection: Projection;
  Dimensions: number;
  DistanceFunction: VectorDistanceFunction;
}
export const VectorIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    VectorAttribute: VectorAttributeDefinition,
    SearchSchema: S.optional(SearchSchema),
    Projection: Projection,
    Dimensions: S.Number,
    DistanceFunction: VectorDistanceFunction,
  }),
).annotate({ identifier: "VectorIndex" }) as any as S.Schema<VectorIndex>;
export type VectorIndexList = VectorIndex[];
export const VectorIndexList = /*@__PURE__*/ S.Array(VectorIndex);
export interface CreateTableInput {
  AttributeDefinitions?: AttributeDefinition[];
  TableName: string;
  KeySchema?: KeySchemaElement[];
  LocalSecondaryIndexes?: LocalSecondaryIndex[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndex[];
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  StreamSpecification?: StreamSpecification;
  SSESpecification?: SSESpecification;
  Tags?: Tag[];
  TableClass?: TableClass;
  DeletionProtectionEnabled?: boolean;
  WarmThroughput?: WarmThroughput;
  ResourcePolicy?: string;
  OnDemandThroughput?: OnDemandThroughput;
  GlobalTableSourceArn?: string;
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
  VectorIndexes?: VectorIndex[];
}
export const CreateTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeDefinitions: S.optional(AttributeDefinitions),
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    KeySchema: S.optional(KeySchema),
    LocalSecondaryIndexes: S.optional(LocalSecondaryIndexList),
    GlobalSecondaryIndexes: S.optional(GlobalSecondaryIndexList),
    BillingMode: S.optional(BillingMode),
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    StreamSpecification: S.optional(StreamSpecification),
    SSESpecification: S.optional(SSESpecification),
    Tags: S.optional(TagList),
    TableClass: S.optional(TableClass),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    WarmThroughput: S.optional(WarmThroughput),
    ResourcePolicy: S.optional(S.String),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    GlobalTableSourceArn: S.optional(S.String),
    GlobalTableSettingsReplicationMode: S.optional(
      GlobalTableSettingsReplicationMode,
    ),
    VectorIndexes: S.optional(VectorIndexList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTableInput",
}) as any as S.Schema<CreateTableInput>;
export type NonNegativeLongObject = number;
export interface ProvisionedThroughputDescription {
  LastIncreaseDateTime?: Date;
  LastDecreaseDateTime?: Date;
  NumberOfDecreasesToday?: number;
  ReadCapacityUnits?: number;
  WriteCapacityUnits?: number;
}
export const ProvisionedThroughputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastIncreaseDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastDecreaseDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    NumberOfDecreasesToday: S.optional(S.Number),
    ReadCapacityUnits: S.optional(S.Number),
    WriteCapacityUnits: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProvisionedThroughputDescription",
}) as any as S.Schema<ProvisionedThroughputDescription>;
export type TableId = string;
export interface BillingModeSummary {
  BillingMode?: BillingMode;
  LastUpdateToPayPerRequestDateTime?: Date;
}
export const BillingModeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingMode: S.optional(BillingMode),
    LastUpdateToPayPerRequestDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BillingModeSummary",
}) as any as S.Schema<BillingModeSummary>;
export interface LocalSecondaryIndexDescription {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
}
export const LocalSecondaryIndexDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.optional(S.String),
    KeySchema: S.optional(KeySchema),
    Projection: S.optional(Projection),
    IndexSizeBytes: S.optional(S.Number),
    ItemCount: S.optional(S.Number),
    IndexArn: S.optional(S.String),
  }),
).annotate({
  identifier: "LocalSecondaryIndexDescription",
}) as any as S.Schema<LocalSecondaryIndexDescription>;
export type LocalSecondaryIndexDescriptionList =
  LocalSecondaryIndexDescription[];
export const LocalSecondaryIndexDescriptionList = /*@__PURE__*/ S.Array(
  LocalSecondaryIndexDescription,
);
export type Backfilling = boolean;
export interface GlobalSecondaryIndexDescription {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  IndexStatus?: IndexStatus;
  Backfilling?: boolean;
  ProvisionedThroughput?: ProvisionedThroughputDescription;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: GlobalSecondaryIndexWarmThroughputDescription;
}
export const GlobalSecondaryIndexDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.optional(S.String),
    KeySchema: S.optional(KeySchema),
    Projection: S.optional(Projection),
    IndexStatus: S.optional(IndexStatus),
    Backfilling: S.optional(S.Boolean),
    ProvisionedThroughput: S.optional(ProvisionedThroughputDescription),
    IndexSizeBytes: S.optional(S.Number),
    ItemCount: S.optional(S.Number),
    IndexArn: S.optional(S.String),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    WarmThroughput: S.optional(GlobalSecondaryIndexWarmThroughputDescription),
  }),
).annotate({
  identifier: "GlobalSecondaryIndexDescription",
}) as any as S.Schema<GlobalSecondaryIndexDescription>;
export type GlobalSecondaryIndexDescriptionList =
  GlobalSecondaryIndexDescription[];
export const GlobalSecondaryIndexDescriptionList = /*@__PURE__*/ S.Array(
  GlobalSecondaryIndexDescription,
);
export type StreamArn = string;
export type WitnessStatus = "CREATING" | "DELETING" | "ACTIVE" | (string & {});
export const WitnessStatus = S.String;

export interface GlobalTableWitnessDescription {
  RegionName?: string;
  WitnessStatus?: WitnessStatus;
}
export const GlobalTableWitnessDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    WitnessStatus: S.optional(WitnessStatus),
  }),
).annotate({
  identifier: "GlobalTableWitnessDescription",
}) as any as S.Schema<GlobalTableWitnessDescription>;
export type GlobalTableWitnessDescriptionList = GlobalTableWitnessDescription[];
export const GlobalTableWitnessDescriptionList = /*@__PURE__*/ S.Array(
  GlobalTableWitnessDescription,
);
export type RestoreInProgress = boolean;
export interface RestoreSummary {
  SourceBackupArn?: string;
  SourceTableArn?: string;
  RestoreDateTime: Date;
  RestoreInProgress: boolean;
}
export const RestoreSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceBackupArn: S.optional(S.String),
    SourceTableArn: S.optional(S.String),
    RestoreDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RestoreInProgress: S.Boolean,
  }),
).annotate({ identifier: "RestoreSummary" }) as any as S.Schema<RestoreSummary>;
export type SSEStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "UPDATING"
  | (string & {});
export const SSEStatus = S.String;

export type KMSMasterKeyArn = string;
export interface SSEDescription {
  Status?: SSEStatus;
  SSEType?: SSEType;
  KMSMasterKeyArn?: string;
  InaccessibleEncryptionDateTime?: Date;
}
export const SSEDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(SSEStatus),
    SSEType: S.optional(SSEType),
    KMSMasterKeyArn: S.optional(S.String),
    InaccessibleEncryptionDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "SSEDescription" }) as any as S.Schema<SSEDescription>;
export type ArchivalReason = string;
export interface ArchivalSummary {
  ArchivalDateTime?: Date;
  ArchivalReason?: string;
  ArchivalBackupArn?: string;
}
export const ArchivalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchivalDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ArchivalReason: S.optional(S.String),
    ArchivalBackupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ArchivalSummary",
}) as any as S.Schema<ArchivalSummary>;
export type MultiRegionConsistency = "EVENTUAL" | "STRONG" | (string & {});
export const MultiRegionConsistency = S.String;

export interface VectorIndexDescription {
  IndexName?: string;
  SearchSchema?: SearchSchemaElement[];
  Projection?: Projection;
  VectorAttribute?: VectorAttributeDefinition;
  Dimensions?: number;
  DistanceFunction?: VectorDistanceFunction;
  IndexStatus?: IndexStatus;
  Backfilling?: boolean;
  IndexSizeBytes?: number;
  ItemCount?: number;
  IndexArn?: string;
}
export const VectorIndexDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.optional(S.String),
    SearchSchema: S.optional(SearchSchema),
    Projection: S.optional(Projection),
    VectorAttribute: S.optional(VectorAttributeDefinition),
    Dimensions: S.optional(S.Number),
    DistanceFunction: S.optional(VectorDistanceFunction),
    IndexStatus: S.optional(IndexStatus),
    Backfilling: S.optional(S.Boolean),
    IndexSizeBytes: S.optional(S.Number),
    ItemCount: S.optional(S.Number),
    IndexArn: S.optional(S.String),
  }),
).annotate({
  identifier: "VectorIndexDescription",
}) as any as S.Schema<VectorIndexDescription>;
export type VectorIndexDescriptionList = VectorIndexDescription[];
export const VectorIndexDescriptionList = /*@__PURE__*/ S.Array(
  VectorIndexDescription,
);
export interface TableDescription {
  AttributeDefinitions?: AttributeDefinition[];
  TableName?: string;
  KeySchema?: KeySchemaElement[];
  TableStatus?: TableStatus;
  CreationDateTime?: Date;
  ProvisionedThroughput?: ProvisionedThroughputDescription;
  TableSizeBytes?: number;
  ItemCount?: number;
  TableArn?: string;
  TableId?: string;
  BillingModeSummary?: BillingModeSummary;
  LocalSecondaryIndexes?: LocalSecondaryIndexDescription[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndexDescription[];
  StreamSpecification?: StreamSpecification;
  LatestStreamLabel?: string;
  LatestStreamArn?: string;
  GlobalTableVersion?: string;
  Replicas?: ReplicaDescription[];
  GlobalTableWitnesses?: GlobalTableWitnessDescription[];
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
  RestoreSummary?: RestoreSummary;
  SSEDescription?: SSEDescription;
  ArchivalSummary?: ArchivalSummary;
  TableClassSummary?: TableClassSummary;
  DeletionProtectionEnabled?: boolean;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: TableWarmThroughputDescription;
  MultiRegionConsistency?: MultiRegionConsistency;
  VectorIndexes?: VectorIndexDescription[];
}
export const TableDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeDefinitions: S.optional(AttributeDefinitions),
    TableName: S.optional(S.String),
    KeySchema: S.optional(KeySchema),
    TableStatus: S.optional(TableStatus),
    CreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ProvisionedThroughput: S.optional(ProvisionedThroughputDescription),
    TableSizeBytes: S.optional(S.Number),
    ItemCount: S.optional(S.Number),
    TableArn: S.optional(S.String),
    TableId: S.optional(S.String),
    BillingModeSummary: S.optional(BillingModeSummary),
    LocalSecondaryIndexes: S.optional(LocalSecondaryIndexDescriptionList),
    GlobalSecondaryIndexes: S.optional(GlobalSecondaryIndexDescriptionList),
    StreamSpecification: S.optional(StreamSpecification),
    LatestStreamLabel: S.optional(S.String),
    LatestStreamArn: S.optional(S.String),
    GlobalTableVersion: S.optional(S.String),
    Replicas: S.optional(ReplicaDescriptionList),
    GlobalTableWitnesses: S.optional(GlobalTableWitnessDescriptionList),
    GlobalTableSettingsReplicationMode: S.optional(
      GlobalTableSettingsReplicationMode,
    ),
    RestoreSummary: S.optional(RestoreSummary),
    SSEDescription: S.optional(SSEDescription),
    ArchivalSummary: S.optional(ArchivalSummary),
    TableClassSummary: S.optional(TableClassSummary),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    WarmThroughput: S.optional(TableWarmThroughputDescription),
    MultiRegionConsistency: S.optional(MultiRegionConsistency),
    VectorIndexes: S.optional(VectorIndexDescriptionList),
  }),
).annotate({
  identifier: "TableDescription",
}) as any as S.Schema<TableDescription>;
export interface CreateTableOutput {
  TableDescription?: TableDescription;
}
export const CreateTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableDescription: S.optional(TableDescription) }).pipe(ns),
).annotate({
  identifier: "CreateTableOutput",
}) as any as S.Schema<CreateTableOutput>;
export interface DeleteBackupInput {
  BackupArn: string;
}
export const DeleteBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupArn: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBackupInput",
}) as any as S.Schema<DeleteBackupInput>;
export type TableCreationDateTime = Date;
export type ItemCount = number;
export interface SourceTableDetails {
  TableName: string;
  TableId: string;
  TableArn?: string;
  TableSizeBytes?: number;
  KeySchema: KeySchemaElement[];
  TableCreationDateTime: Date;
  ProvisionedThroughput: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  ItemCount?: number;
  BillingMode?: BillingMode;
}
export const SourceTableDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String,
    TableId: S.String,
    TableArn: S.optional(S.String),
    TableSizeBytes: S.optional(S.Number),
    KeySchema: KeySchema,
    TableCreationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ProvisionedThroughput: ProvisionedThroughput,
    OnDemandThroughput: S.optional(OnDemandThroughput),
    ItemCount: S.optional(S.Number),
    BillingMode: S.optional(BillingMode),
  }),
).annotate({
  identifier: "SourceTableDetails",
}) as any as S.Schema<SourceTableDetails>;
export interface LocalSecondaryIndexInfo {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
}
export const LocalSecondaryIndexInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.optional(S.String),
    KeySchema: S.optional(KeySchema),
    Projection: S.optional(Projection),
  }),
).annotate({
  identifier: "LocalSecondaryIndexInfo",
}) as any as S.Schema<LocalSecondaryIndexInfo>;
export type LocalSecondaryIndexes = LocalSecondaryIndexInfo[];
export const LocalSecondaryIndexes = /*@__PURE__*/ S.Array(
  LocalSecondaryIndexInfo,
);
export interface GlobalSecondaryIndexInfo {
  IndexName?: string;
  KeySchema?: KeySchemaElement[];
  Projection?: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
}
export const GlobalSecondaryIndexInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.optional(S.String),
    KeySchema: S.optional(KeySchema),
    Projection: S.optional(Projection),
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    OnDemandThroughput: S.optional(OnDemandThroughput),
  }),
).annotate({
  identifier: "GlobalSecondaryIndexInfo",
}) as any as S.Schema<GlobalSecondaryIndexInfo>;
export type GlobalSecondaryIndexes = GlobalSecondaryIndexInfo[];
export const GlobalSecondaryIndexes = /*@__PURE__*/ S.Array(
  GlobalSecondaryIndexInfo,
);
export type TimeToLiveStatus =
  | "ENABLING"
  | "DISABLING"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const TimeToLiveStatus = S.String;

export type TimeToLiveAttributeName = string;
export interface TimeToLiveDescription {
  TimeToLiveStatus?: TimeToLiveStatus;
  AttributeName?: string;
}
export const TimeToLiveDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeToLiveStatus: S.optional(TimeToLiveStatus),
    AttributeName: S.optional(S.String),
  }),
).annotate({
  identifier: "TimeToLiveDescription",
}) as any as S.Schema<TimeToLiveDescription>;
export interface VectorIndexInfo {
  IndexName?: string;
  VectorAttribute?: VectorAttributeDefinition;
  SearchSchema?: SearchSchemaElement[];
  Projection?: Projection;
  Dimensions?: number;
  DistanceFunction?: VectorDistanceFunction;
}
export const VectorIndexInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.optional(S.String),
    VectorAttribute: S.optional(VectorAttributeDefinition),
    SearchSchema: S.optional(SearchSchema),
    Projection: S.optional(Projection),
    Dimensions: S.optional(S.Number),
    DistanceFunction: S.optional(VectorDistanceFunction),
  }),
).annotate({
  identifier: "VectorIndexInfo",
}) as any as S.Schema<VectorIndexInfo>;
export type VectorIndexes = VectorIndexInfo[];
export const VectorIndexes = /*@__PURE__*/ S.Array(VectorIndexInfo);
export interface SourceTableFeatureDetails {
  LocalSecondaryIndexes?: LocalSecondaryIndexInfo[];
  GlobalSecondaryIndexes?: GlobalSecondaryIndexInfo[];
  StreamDescription?: StreamSpecification;
  TimeToLiveDescription?: TimeToLiveDescription;
  SSEDescription?: SSEDescription;
  VectorIndexes?: VectorIndexInfo[];
}
export const SourceTableFeatureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalSecondaryIndexes: S.optional(LocalSecondaryIndexes),
    GlobalSecondaryIndexes: S.optional(GlobalSecondaryIndexes),
    StreamDescription: S.optional(StreamSpecification),
    TimeToLiveDescription: S.optional(TimeToLiveDescription),
    SSEDescription: S.optional(SSEDescription),
    VectorIndexes: S.optional(VectorIndexes),
  }),
).annotate({
  identifier: "SourceTableFeatureDetails",
}) as any as S.Schema<SourceTableFeatureDetails>;
export interface BackupDescription {
  BackupDetails?: BackupDetails;
  SourceTableDetails?: SourceTableDetails;
  SourceTableFeatureDetails?: SourceTableFeatureDetails;
}
export const BackupDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupDetails: S.optional(BackupDetails),
    SourceTableDetails: S.optional(SourceTableDetails),
    SourceTableFeatureDetails: S.optional(SourceTableFeatureDetails),
  }),
).annotate({
  identifier: "BackupDescription",
}) as any as S.Schema<BackupDescription>;
export interface DeleteBackupOutput {
  BackupDescription?: BackupDescription;
}
export const DeleteBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupDescription: S.optional(BackupDescription) }).pipe(ns),
).annotate({
  identifier: "DeleteBackupOutput",
}) as any as S.Schema<DeleteBackupOutput>;
export type ComparisonOperator =
  | "EQ"
  | "NE"
  | "IN"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "BETWEEN"
  | "NOT_NULL"
  | "NULL"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "BEGINS_WITH"
  | (string & {});
export const ComparisonOperator = S.String;

export type AttributeValueList = AttributeValue[];
export const AttributeValueList = /*@__PURE__*/ S.Array(
  S.suspend(() => AttributeValue).annotate({ identifier: "AttributeValue" }),
);
export interface ExpectedAttributeValue {
  Value?: AttributeValue;
  Exists?: boolean;
  ComparisonOperator?: ComparisonOperator;
  AttributeValueList?: AttributeValue[];
}
export const ExpectedAttributeValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(AttributeValue),
    Exists: S.optional(S.Boolean),
    ComparisonOperator: S.optional(ComparisonOperator),
    AttributeValueList: S.optional(AttributeValueList),
  }),
).annotate({
  identifier: "ExpectedAttributeValue",
}) as any as S.Schema<ExpectedAttributeValue>;
export type ExpectedAttributeMap = {
  [key: string]: ExpectedAttributeValue | undefined;
};
export const ExpectedAttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  ExpectedAttributeValue.pipe(S.optional),
);
export type ConditionalOperator = "AND" | "OR" | (string & {});
export const ConditionalOperator = S.String;

export type ReturnValue =
  | "NONE"
  | "ALL_OLD"
  | "UPDATED_OLD"
  | "ALL_NEW"
  | "UPDATED_NEW"
  | (string & {});
export const ReturnValue = S.String;

export type ConditionExpression = string;
export type ExpressionAttributeValueVariable = string;
export type ExpressionAttributeValueMap = {
  [key: string]: AttributeValue | undefined;
};
export const ExpressionAttributeValueMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export interface DeleteItemInput {
  TableName: string;
  Key: { [key: string]: AttributeValue | undefined };
  Expected?: { [key: string]: ExpectedAttributeValue | undefined };
  ConditionalOperator?: ConditionalOperator;
  ReturnValues?: ReturnValue;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const DeleteItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    Key: Key,
    Expected: S.optional(ExpectedAttributeMap),
    ConditionalOperator: S.optional(ConditionalOperator),
    ReturnValues: S.optional(ReturnValue),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ReturnItemCollectionMetrics: S.optional(ReturnItemCollectionMetrics),
    ConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteItemInput",
}) as any as S.Schema<DeleteItemInput>;
export interface DeleteItemOutput {
  Attributes?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
  ItemCollectionMetrics?: ItemCollectionMetrics;
}
export const DeleteItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AttributeMap),
    ConsumedCapacity: S.optional(ConsumedCapacity),
    ItemCollectionMetrics: S.optional(ItemCollectionMetrics),
  }).pipe(ns),
).annotate({
  identifier: "DeleteItemOutput",
}) as any as S.Schema<DeleteItemOutput>;
export type ResourceArnString = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyInput {
  ResourceArn: string;
  ExpectedRevisionId?: string;
}
export const DeleteResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.ContextParam("ResourceArn")),
    ExpectedRevisionId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyInput",
}) as any as S.Schema<DeleteResourcePolicyInput>;
export interface DeleteResourcePolicyOutput {
  RevisionId?: string;
}
export const DeleteResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RevisionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteResourcePolicyOutput",
}) as any as S.Schema<DeleteResourcePolicyOutput>;
export interface DeleteTableInput {
  TableName: string;
}
export const DeleteTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableName: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTableInput",
}) as any as S.Schema<DeleteTableInput>;
export interface DeleteTableOutput {
  TableDescription?: TableDescription;
}
export const DeleteTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableDescription: S.optional(TableDescription) }).pipe(ns),
).annotate({
  identifier: "DeleteTableOutput",
}) as any as S.Schema<DeleteTableOutput>;
export interface DescribeBackupInput {
  BackupArn: string;
}
export const DescribeBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupArn: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBackupInput",
}) as any as S.Schema<DescribeBackupInput>;
export interface DescribeBackupOutput {
  BackupDescription?: BackupDescription;
}
export const DescribeBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BackupDescription: S.optional(BackupDescription) }).pipe(ns),
).annotate({
  identifier: "DescribeBackupOutput",
}) as any as S.Schema<DescribeBackupOutput>;
export interface DescribeContinuousBackupsInput {
  TableName: string;
}
export const DescribeContinuousBackupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableName: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeContinuousBackupsInput",
}) as any as S.Schema<DescribeContinuousBackupsInput>;
export type ContinuousBackupsStatus = "ENABLED" | "DISABLED" | (string & {});
export const ContinuousBackupsStatus = S.String;

export type PointInTimeRecoveryStatus = "ENABLED" | "DISABLED" | (string & {});
export const PointInTimeRecoveryStatus = S.String;

export type RecoveryPeriodInDays = number;
export interface PointInTimeRecoveryDescription {
  PointInTimeRecoveryStatus?: PointInTimeRecoveryStatus;
  RecoveryPeriodInDays?: number;
  EarliestRestorableDateTime?: Date;
  LatestRestorableDateTime?: Date;
}
export const PointInTimeRecoveryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PointInTimeRecoveryStatus: S.optional(PointInTimeRecoveryStatus),
    RecoveryPeriodInDays: S.optional(S.Number),
    EarliestRestorableDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestRestorableDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PointInTimeRecoveryDescription",
}) as any as S.Schema<PointInTimeRecoveryDescription>;
export interface ContinuousBackupsDescription {
  ContinuousBackupsStatus: ContinuousBackupsStatus;
  PointInTimeRecoveryDescription?: PointInTimeRecoveryDescription;
}
export const ContinuousBackupsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContinuousBackupsStatus: ContinuousBackupsStatus,
    PointInTimeRecoveryDescription: S.optional(PointInTimeRecoveryDescription),
  }),
).annotate({
  identifier: "ContinuousBackupsDescription",
}) as any as S.Schema<ContinuousBackupsDescription>;
export interface DescribeContinuousBackupsOutput {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
}
export const DescribeContinuousBackupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContinuousBackupsDescription: S.optional(ContinuousBackupsDescription),
  }).pipe(ns),
).annotate({
  identifier: "DescribeContinuousBackupsOutput",
}) as any as S.Schema<DescribeContinuousBackupsOutput>;
export interface DescribeContributorInsightsInput {
  TableName: string;
  IndexName?: string;
}
export const DescribeContributorInsightsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    IndexName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeContributorInsightsInput",
}) as any as S.Schema<DescribeContributorInsightsInput>;
export type ContributorInsightsRule = string;
export type ContributorInsightsRuleList = string[];
export const ContributorInsightsRuleList = /*@__PURE__*/ S.Array(S.String);
export type ContributorInsightsStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "FAILED"
  | (string & {});
export const ContributorInsightsStatus = S.String;

export type LastUpdateDateTime = Date;
export type ExceptionName = string;
export type ExceptionDescription = string;
export interface FailureException {
  ExceptionName?: string;
  ExceptionDescription?: string;
}
export const FailureException = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExceptionName: S.optional(S.String),
    ExceptionDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "FailureException",
}) as any as S.Schema<FailureException>;
export type ContributorInsightsMode =
  | "ACCESSED_AND_THROTTLED_KEYS"
  | "THROTTLED_KEYS"
  | (string & {});
export const ContributorInsightsMode = S.String;

export interface DescribeContributorInsightsOutput {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsRuleList?: string[];
  ContributorInsightsStatus?: ContributorInsightsStatus;
  LastUpdateDateTime?: Date;
  FailureException?: FailureException;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export const DescribeContributorInsightsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    IndexName: S.optional(S.String),
    ContributorInsightsRuleList: S.optional(ContributorInsightsRuleList),
    ContributorInsightsStatus: S.optional(ContributorInsightsStatus),
    LastUpdateDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailureException: S.optional(FailureException),
    ContributorInsightsMode: S.optional(ContributorInsightsMode),
  }).pipe(ns),
).annotate({
  identifier: "DescribeContributorInsightsOutput",
}) as any as S.Schema<DescribeContributorInsightsOutput>;
export interface DescribeEndpointsRequest {}
export const DescribeEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEndpointsRequest",
}) as any as S.Schema<DescribeEndpointsRequest>;
export interface Endpoint {
  Address: string;
  CachePeriodInMinutes: number;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: S.String, CachePeriodInMinutes: S.Number }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type Endpoints = Endpoint[];
export const Endpoints = /*@__PURE__*/ S.Array(Endpoint);
export interface DescribeEndpointsResponse {
  Endpoints: Endpoint[];
}
export const DescribeEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoints: Endpoints }).pipe(ns),
).annotate({
  identifier: "DescribeEndpointsResponse",
}) as any as S.Schema<DescribeEndpointsResponse>;
export type ExportArn = string;
export interface DescribeExportInput {
  ExportArn: string;
}
export const DescribeExportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExportInput",
}) as any as S.Schema<DescribeExportInput>;
export type ExportStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ExportStatus = S.String;

export type ExportStartTime = Date;
export type ExportEndTime = Date;
export type ExportManifest = string;
export type ExportTime = Date;
export type ClientToken = string;
export type S3Bucket = string;
export type S3BucketOwner = string;
export type S3Prefix = string;
export type S3SseAlgorithm = "AES256" | "KMS" | (string & {});
export const S3SseAlgorithm = S.String;

export type S3SseKmsKeyId = string;
export type FailureCode = string;
export type FailureMessage = string;
export type ExportFormat = "DYNAMODB_JSON" | "ION" | (string & {});
export const ExportFormat = S.String;

export type BilledSizeBytes = number;
export type ExportType = "FULL_EXPORT" | "INCREMENTAL_EXPORT" | (string & {});
export const ExportType = S.String;

export type ExportFromTime = Date;
export type ExportToTime = Date;
export type ExportViewType = "NEW_IMAGE" | "NEW_AND_OLD_IMAGES" | (string & {});
export const ExportViewType = S.String;

export interface IncrementalExportSpecification {
  ExportFromTime?: Date;
  ExportToTime?: Date;
  ExportViewType?: ExportViewType;
}
export const IncrementalExportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportFromTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExportToTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExportViewType: S.optional(ExportViewType),
  }),
).annotate({
  identifier: "IncrementalExportSpecification",
}) as any as S.Schema<IncrementalExportSpecification>;
export interface ExportDescription {
  ExportArn?: string;
  ExportStatus?: ExportStatus;
  StartTime?: Date;
  EndTime?: Date;
  ExportManifest?: string;
  TableArn?: string;
  TableId?: string;
  ExportTime?: Date;
  ClientToken?: string;
  S3Bucket?: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: S3SseAlgorithm;
  S3SseKmsKeyId?: string;
  FailureCode?: string;
  FailureMessage?: string;
  ExportFormat?: ExportFormat;
  BilledSizeBytes?: number;
  ItemCount?: number;
  ExportType?: ExportType;
  IncrementalExportSpecification?: IncrementalExportSpecification;
}
export const ExportDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportArn: S.optional(S.String),
    ExportStatus: S.optional(ExportStatus),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExportManifest: S.optional(S.String),
    TableArn: S.optional(S.String),
    TableId: S.optional(S.String),
    ExportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClientToken: S.optional(S.String),
    S3Bucket: S.optional(S.String),
    S3BucketOwner: S.optional(S.String),
    S3Prefix: S.optional(S.String),
    S3SseAlgorithm: S.optional(S3SseAlgorithm),
    S3SseKmsKeyId: S.optional(S.String),
    FailureCode: S.optional(S.String),
    FailureMessage: S.optional(S.String),
    ExportFormat: S.optional(ExportFormat),
    BilledSizeBytes: S.optional(S.Number),
    ItemCount: S.optional(S.Number),
    ExportType: S.optional(ExportType),
    IncrementalExportSpecification: S.optional(IncrementalExportSpecification),
  }),
).annotate({
  identifier: "ExportDescription",
}) as any as S.Schema<ExportDescription>;
export interface DescribeExportOutput {
  ExportDescription?: ExportDescription;
}
export const DescribeExportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportDescription: S.optional(ExportDescription) }).pipe(ns),
).annotate({
  identifier: "DescribeExportOutput",
}) as any as S.Schema<DescribeExportOutput>;
export interface DescribeGlobalTableInput {
  GlobalTableName: string;
}
export const DescribeGlobalTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.String.pipe(T.ContextParam("ResourceArn")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGlobalTableInput",
}) as any as S.Schema<DescribeGlobalTableInput>;
export interface DescribeGlobalTableOutput {
  GlobalTableDescription?: GlobalTableDescription;
}
export const DescribeGlobalTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalTableDescription: S.optional(GlobalTableDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeGlobalTableOutput",
}) as any as S.Schema<DescribeGlobalTableOutput>;
export interface DescribeGlobalTableSettingsInput {
  GlobalTableName: string;
}
export const DescribeGlobalTableSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.String.pipe(T.ContextParam("ResourceArn")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeGlobalTableSettingsInput",
}) as any as S.Schema<DescribeGlobalTableSettingsInput>;
export type AutoScalingPolicyName = string;
export type IntegerObject = number;
export type DoubleObject = number;
export interface AutoScalingTargetTrackingScalingPolicyConfigurationDescription {
  DisableScaleIn?: boolean;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  TargetValue: number;
}
export const AutoScalingTargetTrackingScalingPolicyConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DisableScaleIn: S.optional(S.Boolean),
      ScaleInCooldown: S.optional(S.Number),
      ScaleOutCooldown: S.optional(S.Number),
      TargetValue: S.Number,
    }),
  ).annotate({
    identifier:
      "AutoScalingTargetTrackingScalingPolicyConfigurationDescription",
  }) as any as S.Schema<AutoScalingTargetTrackingScalingPolicyConfigurationDescription>;
export interface AutoScalingPolicyDescription {
  PolicyName?: string;
  TargetTrackingScalingPolicyConfiguration?: AutoScalingTargetTrackingScalingPolicyConfigurationDescription;
}
export const AutoScalingPolicyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.optional(S.String),
    TargetTrackingScalingPolicyConfiguration: S.optional(
      AutoScalingTargetTrackingScalingPolicyConfigurationDescription,
    ),
  }),
).annotate({
  identifier: "AutoScalingPolicyDescription",
}) as any as S.Schema<AutoScalingPolicyDescription>;
export type AutoScalingPolicyDescriptionList = AutoScalingPolicyDescription[];
export const AutoScalingPolicyDescriptionList = /*@__PURE__*/ S.Array(
  AutoScalingPolicyDescription,
);
export interface AutoScalingSettingsDescription {
  MinimumUnits?: number;
  MaximumUnits?: number;
  AutoScalingDisabled?: boolean;
  AutoScalingRoleArn?: string;
  ScalingPolicies?: AutoScalingPolicyDescription[];
}
export const AutoScalingSettingsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumUnits: S.optional(S.Number),
    MaximumUnits: S.optional(S.Number),
    AutoScalingDisabled: S.optional(S.Boolean),
    AutoScalingRoleArn: S.optional(S.String),
    ScalingPolicies: S.optional(AutoScalingPolicyDescriptionList),
  }),
).annotate({
  identifier: "AutoScalingSettingsDescription",
}) as any as S.Schema<AutoScalingSettingsDescription>;
export interface ReplicaGlobalSecondaryIndexSettingsDescription {
  IndexName: string;
  IndexStatus?: IndexStatus;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ProvisionedWriteCapacityUnits?: number;
  ProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
}
export const ReplicaGlobalSecondaryIndexSettingsDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexName: S.String,
      IndexStatus: S.optional(IndexStatus),
      ProvisionedReadCapacityUnits: S.optional(S.Number),
      ProvisionedReadCapacityAutoScalingSettings: S.optional(
        AutoScalingSettingsDescription,
      ),
      ProvisionedWriteCapacityUnits: S.optional(S.Number),
      ProvisionedWriteCapacityAutoScalingSettings: S.optional(
        AutoScalingSettingsDescription,
      ),
    }),
  ).annotate({
    identifier: "ReplicaGlobalSecondaryIndexSettingsDescription",
  }) as any as S.Schema<ReplicaGlobalSecondaryIndexSettingsDescription>;
export type ReplicaGlobalSecondaryIndexSettingsDescriptionList =
  ReplicaGlobalSecondaryIndexSettingsDescription[];
export const ReplicaGlobalSecondaryIndexSettingsDescriptionList =
  /*@__PURE__*/ S.Array(ReplicaGlobalSecondaryIndexSettingsDescription);
export interface ReplicaSettingsDescription {
  RegionName: string;
  ReplicaStatus?: ReplicaStatus;
  ReplicaBillingModeSummary?: BillingModeSummary;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityUnits?: number;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaGlobalSecondaryIndexSettings?: ReplicaGlobalSecondaryIndexSettingsDescription[];
  ReplicaTableClassSummary?: TableClassSummary;
}
export const ReplicaSettingsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.String,
    ReplicaStatus: S.optional(ReplicaStatus),
    ReplicaBillingModeSummary: S.optional(BillingModeSummary),
    ReplicaProvisionedReadCapacityUnits: S.optional(S.Number),
    ReplicaProvisionedReadCapacityAutoScalingSettings: S.optional(
      AutoScalingSettingsDescription,
    ),
    ReplicaProvisionedWriteCapacityUnits: S.optional(S.Number),
    ReplicaProvisionedWriteCapacityAutoScalingSettings: S.optional(
      AutoScalingSettingsDescription,
    ),
    ReplicaGlobalSecondaryIndexSettings: S.optional(
      ReplicaGlobalSecondaryIndexSettingsDescriptionList,
    ),
    ReplicaTableClassSummary: S.optional(TableClassSummary),
  }),
).annotate({
  identifier: "ReplicaSettingsDescription",
}) as any as S.Schema<ReplicaSettingsDescription>;
export type ReplicaSettingsDescriptionList = ReplicaSettingsDescription[];
export const ReplicaSettingsDescriptionList = /*@__PURE__*/ S.Array(
  ReplicaSettingsDescription,
);
export interface DescribeGlobalTableSettingsOutput {
  GlobalTableName?: string;
  ReplicaSettings?: ReplicaSettingsDescription[];
}
export const DescribeGlobalTableSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.optional(S.String),
    ReplicaSettings: S.optional(ReplicaSettingsDescriptionList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGlobalTableSettingsOutput",
}) as any as S.Schema<DescribeGlobalTableSettingsOutput>;
export type ImportArn = string;
export interface DescribeImportInput {
  ImportArn: string;
}
export const DescribeImportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportArn: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeImportInput",
}) as any as S.Schema<DescribeImportInput>;
export type ImportStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLING"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export const ImportStatus = S.String;

export interface S3BucketSource {
  S3BucketOwner?: string;
  S3Bucket: string;
  S3KeyPrefix?: string;
}
export const S3BucketSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketOwner: S.optional(S.String),
    S3Bucket: S.String,
    S3KeyPrefix: S.optional(S.String),
  }),
).annotate({ identifier: "S3BucketSource" }) as any as S.Schema<S3BucketSource>;
export type ErrorCount = number;
export type CloudWatchLogGroupArn = string;
export type InputFormat = "DYNAMODB_JSON" | "ION" | "CSV" | (string & {});
export const InputFormat = S.String;

export type CsvDelimiter = string;
export type CsvHeader = string;
export type CsvHeaderList = string[];
export const CsvHeaderList = /*@__PURE__*/ S.Array(S.String);
export interface CsvOptions {
  Delimiter?: string;
  HeaderList?: string[];
}
export const CsvOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Delimiter: S.optional(S.String),
    HeaderList: S.optional(CsvHeaderList),
  }),
).annotate({ identifier: "CsvOptions" }) as any as S.Schema<CsvOptions>;
export interface InputFormatOptions {
  Csv?: CsvOptions;
}
export const InputFormatOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Csv: S.optional(CsvOptions) }),
).annotate({
  identifier: "InputFormatOptions",
}) as any as S.Schema<InputFormatOptions>;
export type InputCompressionType = "GZIP" | "ZSTD" | "NONE" | (string & {});
export const InputCompressionType = S.String;

export interface TableCreationParameters {
  TableName: string;
  AttributeDefinitions: AttributeDefinition[];
  KeySchema: KeySchemaElement[];
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  SSESpecification?: SSESpecification;
  GlobalSecondaryIndexes?: GlobalSecondaryIndex[];
  VectorIndexes?: VectorIndex[];
}
export const TableCreationParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String,
    AttributeDefinitions: AttributeDefinitions,
    KeySchema: KeySchema,
    BillingMode: S.optional(BillingMode),
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    SSESpecification: S.optional(SSESpecification),
    GlobalSecondaryIndexes: S.optional(GlobalSecondaryIndexList),
    VectorIndexes: S.optional(VectorIndexList),
  }),
).annotate({
  identifier: "TableCreationParameters",
}) as any as S.Schema<TableCreationParameters>;
export type ImportStartTime = Date;
export type ImportEndTime = Date;
export type ProcessedItemCount = number;
export type ImportedItemCount = number;
export interface ImportTableDescription {
  ImportArn?: string;
  ImportStatus?: ImportStatus;
  TableArn?: string;
  TableId?: string;
  ClientToken?: string;
  S3BucketSource?: S3BucketSource;
  ErrorCount?: number;
  CloudWatchLogGroupArn?: string;
  InputFormat?: InputFormat;
  InputFormatOptions?: InputFormatOptions;
  InputCompressionType?: InputCompressionType;
  TableCreationParameters?: TableCreationParameters;
  StartTime?: Date;
  EndTime?: Date;
  ProcessedSizeBytes?: number;
  ProcessedItemCount?: number;
  ImportedItemCount?: number;
  FailureCode?: string;
  FailureMessage?: string;
}
export const ImportTableDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportArn: S.optional(S.String),
    ImportStatus: S.optional(ImportStatus),
    TableArn: S.optional(S.String),
    TableId: S.optional(S.String),
    ClientToken: S.optional(S.String),
    S3BucketSource: S.optional(S3BucketSource),
    ErrorCount: S.optional(S.Number),
    CloudWatchLogGroupArn: S.optional(S.String),
    InputFormat: S.optional(InputFormat),
    InputFormatOptions: S.optional(InputFormatOptions),
    InputCompressionType: S.optional(InputCompressionType),
    TableCreationParameters: S.optional(TableCreationParameters),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProcessedSizeBytes: S.optional(S.Number),
    ProcessedItemCount: S.optional(S.Number),
    ImportedItemCount: S.optional(S.Number),
    FailureCode: S.optional(S.String),
    FailureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportTableDescription",
}) as any as S.Schema<ImportTableDescription>;
export interface DescribeImportOutput {
  ImportTableDescription: ImportTableDescription;
}
export const DescribeImportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportTableDescription: ImportTableDescription }).pipe(ns),
).annotate({
  identifier: "DescribeImportOutput",
}) as any as S.Schema<DescribeImportOutput>;
export interface DescribeKinesisStreamingDestinationInput {
  TableName: string;
}
export const DescribeKinesisStreamingDestinationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ TableName: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeKinesisStreamingDestinationInput",
}) as any as S.Schema<DescribeKinesisStreamingDestinationInput>;
export type DestinationStatus =
  | "ENABLING"
  | "ACTIVE"
  | "DISABLING"
  | "DISABLED"
  | "ENABLE_FAILED"
  | "UPDATING"
  | (string & {});
export const DestinationStatus = S.String;

export type ApproximateCreationDateTimePrecision =
  | "MILLISECOND"
  | "MICROSECOND"
  | (string & {});
export const ApproximateCreationDateTimePrecision = S.String;

export interface KinesisDataStreamDestination {
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  DestinationStatusDescription?: string;
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
}
export const KinesisDataStreamDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamArn: S.optional(S.String),
    DestinationStatus: S.optional(DestinationStatus),
    DestinationStatusDescription: S.optional(S.String),
    ApproximateCreationDateTimePrecision: S.optional(
      ApproximateCreationDateTimePrecision,
    ),
  }),
).annotate({
  identifier: "KinesisDataStreamDestination",
}) as any as S.Schema<KinesisDataStreamDestination>;
export type KinesisDataStreamDestinations = KinesisDataStreamDestination[];
export const KinesisDataStreamDestinations = /*@__PURE__*/ S.Array(
  KinesisDataStreamDestination,
);
export interface DescribeKinesisStreamingDestinationOutput {
  TableName?: string;
  KinesisDataStreamDestinations?: KinesisDataStreamDestination[];
}
export const DescribeKinesisStreamingDestinationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TableName: S.optional(S.String),
      KinesisDataStreamDestinations: S.optional(KinesisDataStreamDestinations),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeKinesisStreamingDestinationOutput",
  }) as any as S.Schema<DescribeKinesisStreamingDestinationOutput>;
export interface DescribeLimitsInput {}
export const DescribeLimitsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLimitsInput",
}) as any as S.Schema<DescribeLimitsInput>;
export interface DescribeLimitsOutput {
  AccountMaxReadCapacityUnits?: number;
  AccountMaxWriteCapacityUnits?: number;
  TableMaxReadCapacityUnits?: number;
  TableMaxWriteCapacityUnits?: number;
}
export const DescribeLimitsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountMaxReadCapacityUnits: S.optional(S.Number),
    AccountMaxWriteCapacityUnits: S.optional(S.Number),
    TableMaxReadCapacityUnits: S.optional(S.Number),
    TableMaxWriteCapacityUnits: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "DescribeLimitsOutput",
}) as any as S.Schema<DescribeLimitsOutput>;
export interface DescribeTableInput {
  TableName: string;
}
export const DescribeTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableName: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTableInput",
}) as any as S.Schema<DescribeTableInput>;
export interface DescribeTableOutput {
  Table?: TableDescription;
}
export const DescribeTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Table: S.optional(TableDescription) }).pipe(ns),
).annotate({
  identifier: "DescribeTableOutput",
}) as any as S.Schema<DescribeTableOutput>;
export interface DescribeTableReplicaAutoScalingInput {
  TableName: string;
}
export const DescribeTableReplicaAutoScalingInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ TableName: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeTableReplicaAutoScalingInput",
}) as any as S.Schema<DescribeTableReplicaAutoScalingInput>;
export interface ReplicaGlobalSecondaryIndexAutoScalingDescription {
  IndexName?: string;
  IndexStatus?: IndexStatus;
  ProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
}
export const ReplicaGlobalSecondaryIndexAutoScalingDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexName: S.optional(S.String),
      IndexStatus: S.optional(IndexStatus),
      ProvisionedReadCapacityAutoScalingSettings: S.optional(
        AutoScalingSettingsDescription,
      ),
      ProvisionedWriteCapacityAutoScalingSettings: S.optional(
        AutoScalingSettingsDescription,
      ),
    }),
  ).annotate({
    identifier: "ReplicaGlobalSecondaryIndexAutoScalingDescription",
  }) as any as S.Schema<ReplicaGlobalSecondaryIndexAutoScalingDescription>;
export type ReplicaGlobalSecondaryIndexAutoScalingDescriptionList =
  ReplicaGlobalSecondaryIndexAutoScalingDescription[];
export const ReplicaGlobalSecondaryIndexAutoScalingDescriptionList =
  /*@__PURE__*/ S.Array(ReplicaGlobalSecondaryIndexAutoScalingDescription);
export interface ReplicaAutoScalingDescription {
  RegionName?: string;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndexAutoScalingDescription[];
  ReplicaProvisionedReadCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaProvisionedWriteCapacityAutoScalingSettings?: AutoScalingSettingsDescription;
  ReplicaStatus?: ReplicaStatus;
}
export const ReplicaAutoScalingDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    GlobalSecondaryIndexes: S.optional(
      ReplicaGlobalSecondaryIndexAutoScalingDescriptionList,
    ),
    ReplicaProvisionedReadCapacityAutoScalingSettings: S.optional(
      AutoScalingSettingsDescription,
    ),
    ReplicaProvisionedWriteCapacityAutoScalingSettings: S.optional(
      AutoScalingSettingsDescription,
    ),
    ReplicaStatus: S.optional(ReplicaStatus),
  }),
).annotate({
  identifier: "ReplicaAutoScalingDescription",
}) as any as S.Schema<ReplicaAutoScalingDescription>;
export type ReplicaAutoScalingDescriptionList = ReplicaAutoScalingDescription[];
export const ReplicaAutoScalingDescriptionList = /*@__PURE__*/ S.Array(
  ReplicaAutoScalingDescription,
);
export interface TableAutoScalingDescription {
  TableName?: string;
  TableStatus?: TableStatus;
  Replicas?: ReplicaAutoScalingDescription[];
}
export const TableAutoScalingDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    TableStatus: S.optional(TableStatus),
    Replicas: S.optional(ReplicaAutoScalingDescriptionList),
  }),
).annotate({
  identifier: "TableAutoScalingDescription",
}) as any as S.Schema<TableAutoScalingDescription>;
export interface DescribeTableReplicaAutoScalingOutput {
  TableAutoScalingDescription?: TableAutoScalingDescription;
}
export const DescribeTableReplicaAutoScalingOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TableAutoScalingDescription: S.optional(TableAutoScalingDescription),
    }).pipe(ns),
).annotate({
  identifier: "DescribeTableReplicaAutoScalingOutput",
}) as any as S.Schema<DescribeTableReplicaAutoScalingOutput>;
export interface DescribeTimeToLiveInput {
  TableName: string;
}
export const DescribeTimeToLiveInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableName: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTimeToLiveInput",
}) as any as S.Schema<DescribeTimeToLiveInput>;
export interface DescribeTimeToLiveOutput {
  TimeToLiveDescription?: TimeToLiveDescription;
}
export const DescribeTimeToLiveOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimeToLiveDescription: S.optional(TimeToLiveDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeTimeToLiveOutput",
}) as any as S.Schema<DescribeTimeToLiveOutput>;
export interface EnableKinesisStreamingConfiguration {
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
}
export const EnableKinesisStreamingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateCreationDateTimePrecision: S.optional(
      ApproximateCreationDateTimePrecision,
    ),
  }),
).annotate({
  identifier: "EnableKinesisStreamingConfiguration",
}) as any as S.Schema<EnableKinesisStreamingConfiguration>;
export interface KinesisStreamingDestinationInput {
  TableName: string;
  StreamArn: string;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
}
export const KinesisStreamingDestinationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    StreamArn: S.String,
    EnableKinesisStreamingConfiguration: S.optional(
      EnableKinesisStreamingConfiguration,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "KinesisStreamingDestinationInput",
}) as any as S.Schema<KinesisStreamingDestinationInput>;
export interface KinesisStreamingDestinationOutput {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  EnableKinesisStreamingConfiguration?: EnableKinesisStreamingConfiguration;
}
export const KinesisStreamingDestinationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    StreamArn: S.optional(S.String),
    DestinationStatus: S.optional(DestinationStatus),
    EnableKinesisStreamingConfiguration: S.optional(
      EnableKinesisStreamingConfiguration,
    ),
  }).pipe(ns),
).annotate({
  identifier: "KinesisStreamingDestinationOutput",
}) as any as S.Schema<KinesisStreamingDestinationOutput>;
export type PartiQLNextToken = string;
export type PositiveIntegerObject = number;
export interface ExecuteStatementInput {
  Statement: string;
  Parameters?: AttributeValue[];
  ConsistentRead?: boolean;
  NextToken?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  Limit?: number;
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const ExecuteStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statement: S.String,
    Parameters: S.optional(PreparedStatementParameters),
    ConsistentRead: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    Limit: S.optional(S.Number),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteStatementInput",
}) as any as S.Schema<ExecuteStatementInput>;
export interface ExecuteStatementOutput {
  Items?: { [key: string]: AttributeValue | undefined }[];
  NextToken?: string;
  ConsumedCapacity?: ConsumedCapacity;
  LastEvaluatedKey?: { [key: string]: AttributeValue | undefined };
}
export const ExecuteStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ItemList),
    NextToken: S.optional(S.String),
    ConsumedCapacity: S.optional(ConsumedCapacity),
    LastEvaluatedKey: S.optional(Key),
  }).pipe(ns),
).annotate({
  identifier: "ExecuteStatementOutput",
}) as any as S.Schema<ExecuteStatementOutput>;
export interface ParameterizedStatement {
  Statement: string;
  Parameters?: AttributeValue[];
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const ParameterizedStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statement: S.String,
    Parameters: S.optional(PreparedStatementParameters),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }),
).annotate({
  identifier: "ParameterizedStatement",
}) as any as S.Schema<ParameterizedStatement>;
export type ParameterizedStatements = ParameterizedStatement[];
export const ParameterizedStatements = /*@__PURE__*/ S.Array(
  ParameterizedStatement,
);
export type ClientRequestToken = string;
export interface ExecuteTransactionInput {
  TransactStatements: ParameterizedStatement[];
  ClientRequestToken?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export const ExecuteTransactionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransactStatements: ParameterizedStatements,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteTransactionInput",
}) as any as S.Schema<ExecuteTransactionInput>;
export interface ItemResponse {
  Item?: { [key: string]: AttributeValue | undefined };
}
export const ItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Item: S.optional(AttributeMap) }),
).annotate({ identifier: "ItemResponse" }) as any as S.Schema<ItemResponse>;
export type ItemResponseList = ItemResponse[];
export const ItemResponseList = /*@__PURE__*/ S.Array(ItemResponse);
export interface ExecuteTransactionOutput {
  Responses?: ItemResponse[];
  ConsumedCapacity?: ConsumedCapacity[];
}
export const ExecuteTransactionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Responses: S.optional(ItemResponseList),
    ConsumedCapacity: S.optional(ConsumedCapacityMultiple),
  }).pipe(ns),
).annotate({
  identifier: "ExecuteTransactionOutput",
}) as any as S.Schema<ExecuteTransactionOutput>;
export interface ExportTableToPointInTimeInput {
  TableArn: string;
  ExportTime?: Date;
  ClientToken?: string;
  S3Bucket: string;
  S3BucketOwner?: string;
  S3Prefix?: string;
  S3SseAlgorithm?: S3SseAlgorithm;
  S3SseKmsKeyId?: string;
  ExportFormat?: ExportFormat;
  ExportType?: ExportType;
  IncrementalExportSpecification?: IncrementalExportSpecification;
}
export const ExportTableToPointInTimeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableArn: S.String.pipe(T.ContextParam("ResourceArn")),
    ExportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    S3Bucket: S.String,
    S3BucketOwner: S.optional(S.String),
    S3Prefix: S.optional(S.String),
    S3SseAlgorithm: S.optional(S3SseAlgorithm),
    S3SseKmsKeyId: S.optional(S.String),
    ExportFormat: S.optional(ExportFormat),
    ExportType: S.optional(ExportType),
    IncrementalExportSpecification: S.optional(IncrementalExportSpecification),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportTableToPointInTimeInput",
}) as any as S.Schema<ExportTableToPointInTimeInput>;
export interface ExportTableToPointInTimeOutput {
  ExportDescription?: ExportDescription;
}
export const ExportTableToPointInTimeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportDescription: S.optional(ExportDescription) }).pipe(ns),
).annotate({
  identifier: "ExportTableToPointInTimeOutput",
}) as any as S.Schema<ExportTableToPointInTimeOutput>;
export interface GetItemInput {
  TableName: string;
  Key: { [key: string]: AttributeValue | undefined };
  AttributesToGet?: string[];
  ConsistentRead?: boolean;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ProjectionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
}
export const GetItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    Key: Key,
    AttributesToGet: S.optional(AttributeNameList),
    ConsistentRead: S.optional(S.Boolean),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ProjectionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetItemInput" }) as any as S.Schema<GetItemInput>;
export interface GetItemOutput {
  Item?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
}
export const GetItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(AttributeMap),
    ConsumedCapacity: S.optional(ConsumedCapacity),
  }).pipe(ns),
).annotate({ identifier: "GetItemOutput" }) as any as S.Schema<GetItemOutput>;
export interface GetResourcePolicyInput {
  ResourceArn: string;
}
export const GetResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.ContextParam("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyInput",
}) as any as S.Schema<GetResourcePolicyInput>;
export interface GetResourcePolicyOutput {
  Policy?: string;
  RevisionId?: string;
}
export const GetResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Policy: S.optional(S.String),
    RevisionId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetResourcePolicyOutput",
}) as any as S.Schema<GetResourcePolicyOutput>;
export interface ImportTableInput {
  ClientToken?: string;
  S3BucketSource: S3BucketSource;
  InputFormat: InputFormat;
  InputFormatOptions?: InputFormatOptions;
  InputCompressionType?: InputCompressionType;
  TableCreationParameters: TableCreationParameters;
}
export const ImportTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    S3BucketSource: S3BucketSource,
    InputFormat: InputFormat,
    InputFormatOptions: S.optional(InputFormatOptions),
    InputCompressionType: S.optional(InputCompressionType),
    TableCreationParameters: TableCreationParameters,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportTableInput",
}) as any as S.Schema<ImportTableInput>;
export interface ImportTableOutput {
  ImportTableDescription: ImportTableDescription;
}
export const ImportTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportTableDescription: ImportTableDescription }).pipe(ns),
).annotate({
  identifier: "ImportTableOutput",
}) as any as S.Schema<ImportTableOutput>;
export type BackupsInputLimit = number;
export type TimeRangeLowerBound = Date;
export type TimeRangeUpperBound = Date;
export type BackupTypeFilter =
  | "USER"
  | "SYSTEM"
  | "AWS_BACKUP"
  | "ALL"
  | (string & {});
export const BackupTypeFilter = S.String;

export interface ListBackupsInput {
  TableName?: string;
  Limit?: number;
  TimeRangeLowerBound?: Date;
  TimeRangeUpperBound?: Date;
  ExclusiveStartBackupArn?: string;
  BackupType?: BackupTypeFilter;
}
export const ListBackupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String).pipe(T.ContextParam("ResourceArn")),
    Limit: S.optional(S.Number),
    TimeRangeLowerBound: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TimeRangeUpperBound: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ExclusiveStartBackupArn: S.optional(S.String),
    BackupType: S.optional(BackupTypeFilter),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBackupsInput",
}) as any as S.Schema<ListBackupsInput>;
export interface BackupSummary {
  TableName?: string;
  TableId?: string;
  TableArn?: string;
  BackupArn?: string;
  BackupName?: string;
  BackupCreationDateTime?: Date;
  BackupExpiryDateTime?: Date;
  BackupStatus?: BackupStatus;
  BackupType?: BackupType;
  BackupSizeBytes?: number;
}
export const BackupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    TableId: S.optional(S.String),
    TableArn: S.optional(S.String),
    BackupArn: S.optional(S.String),
    BackupName: S.optional(S.String),
    BackupCreationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    BackupExpiryDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    BackupStatus: S.optional(BackupStatus),
    BackupType: S.optional(BackupType),
    BackupSizeBytes: S.optional(S.Number),
  }),
).annotate({ identifier: "BackupSummary" }) as any as S.Schema<BackupSummary>;
export type BackupSummaries = BackupSummary[];
export const BackupSummaries = /*@__PURE__*/ S.Array(BackupSummary);
export interface ListBackupsOutput {
  BackupSummaries?: BackupSummary[];
  LastEvaluatedBackupArn?: string;
}
export const ListBackupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupSummaries: S.optional(BackupSummaries),
    LastEvaluatedBackupArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListBackupsOutput",
}) as any as S.Schema<ListBackupsOutput>;
export type NextTokenString = string;
export type ListContributorInsightsLimit = number;
export interface ListContributorInsightsInput {
  TableName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListContributorInsightsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String).pipe(T.ContextParam("ResourceArn")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListContributorInsightsInput",
}) as any as S.Schema<ListContributorInsightsInput>;
export interface ContributorInsightsSummary {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: ContributorInsightsStatus;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export const ContributorInsightsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    IndexName: S.optional(S.String),
    ContributorInsightsStatus: S.optional(ContributorInsightsStatus),
    ContributorInsightsMode: S.optional(ContributorInsightsMode),
  }),
).annotate({
  identifier: "ContributorInsightsSummary",
}) as any as S.Schema<ContributorInsightsSummary>;
export type ContributorInsightsSummaries = ContributorInsightsSummary[];
export const ContributorInsightsSummaries = /*@__PURE__*/ S.Array(
  ContributorInsightsSummary,
);
export interface ListContributorInsightsOutput {
  ContributorInsightsSummaries?: ContributorInsightsSummary[];
  NextToken?: string;
}
export const ListContributorInsightsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContributorInsightsSummaries: S.optional(ContributorInsightsSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListContributorInsightsOutput",
}) as any as S.Schema<ListContributorInsightsOutput>;
export type ListExportsMaxLimit = number;
export type ExportNextToken = string;
export interface ListExportsInput {
  TableArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExportsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableArn: S.optional(S.String).pipe(T.ContextParam("ResourceArn")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportsInput",
}) as any as S.Schema<ListExportsInput>;
export interface ExportSummary {
  ExportArn?: string;
  ExportStatus?: ExportStatus;
  ExportType?: ExportType;
}
export const ExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportArn: S.optional(S.String),
    ExportStatus: S.optional(ExportStatus),
    ExportType: S.optional(ExportType),
  }),
).annotate({ identifier: "ExportSummary" }) as any as S.Schema<ExportSummary>;
export type ExportSummaries = ExportSummary[];
export const ExportSummaries = /*@__PURE__*/ S.Array(ExportSummary);
export interface ListExportsOutput {
  ExportSummaries?: ExportSummary[];
  NextToken?: string;
}
export const ListExportsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportSummaries: S.optional(ExportSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListExportsOutput",
}) as any as S.Schema<ListExportsOutput>;
export interface ListGlobalTablesInput {
  ExclusiveStartGlobalTableName?: string;
  Limit?: number;
  RegionName?: string;
}
export const ListGlobalTablesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExclusiveStartGlobalTableName: S.optional(S.String),
    Limit: S.optional(S.Number),
    RegionName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGlobalTablesInput",
}) as any as S.Schema<ListGlobalTablesInput>;
export interface GlobalTable {
  GlobalTableName?: string;
  ReplicationGroup?: Replica[];
}
export const GlobalTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.optional(S.String),
    ReplicationGroup: S.optional(ReplicaList),
  }),
).annotate({ identifier: "GlobalTable" }) as any as S.Schema<GlobalTable>;
export type GlobalTableList = GlobalTable[];
export const GlobalTableList = /*@__PURE__*/ S.Array(GlobalTable);
export interface ListGlobalTablesOutput {
  GlobalTables?: GlobalTable[];
  LastEvaluatedGlobalTableName?: string;
}
export const ListGlobalTablesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTables: S.optional(GlobalTableList),
    LastEvaluatedGlobalTableName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGlobalTablesOutput",
}) as any as S.Schema<ListGlobalTablesOutput>;
export type ListImportsMaxLimit = number;
export type ImportNextToken = string;
export interface ListImportsInput {
  TableArn?: string;
  PageSize?: number;
  NextToken?: string;
}
export const ListImportsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableArn: S.optional(S.String).pipe(T.ContextParam("ResourceArn")),
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListImportsInput",
}) as any as S.Schema<ListImportsInput>;
export interface ImportSummary {
  ImportArn?: string;
  ImportStatus?: ImportStatus;
  TableArn?: string;
  S3BucketSource?: S3BucketSource;
  CloudWatchLogGroupArn?: string;
  InputFormat?: InputFormat;
  StartTime?: Date;
  EndTime?: Date;
}
export const ImportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportArn: S.optional(S.String),
    ImportStatus: S.optional(ImportStatus),
    TableArn: S.optional(S.String),
    S3BucketSource: S.optional(S3BucketSource),
    CloudWatchLogGroupArn: S.optional(S.String),
    InputFormat: S.optional(InputFormat),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ImportSummary" }) as any as S.Schema<ImportSummary>;
export type ImportSummaryList = ImportSummary[];
export const ImportSummaryList = /*@__PURE__*/ S.Array(ImportSummary);
export interface ListImportsOutput {
  ImportSummaryList?: ImportSummary[];
  NextToken?: string;
}
export const ListImportsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportSummaryList: S.optional(ImportSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListImportsOutput",
}) as any as S.Schema<ListImportsOutput>;
export type ListTablesInputLimit = number;
export interface ListTablesInput {
  ExclusiveStartTableName?: string;
  Limit?: number;
}
export const ListTablesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExclusiveStartTableName: S.optional(S.String),
    Limit: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTablesInput",
}) as any as S.Schema<ListTablesInput>;
export type TableNameList = string[];
export const TableNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListTablesOutput {
  TableNames?: string[];
  LastEvaluatedTableName?: string;
}
export const ListTablesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableNames: S.optional(TableNameList),
    LastEvaluatedTableName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTablesOutput",
}) as any as S.Schema<ListTablesOutput>;
export interface ListTagsOfResourceInput {
  ResourceArn: string;
  NextToken?: string;
}
export const ListTagsOfResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.ContextParam("ResourceArn")),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsOfResourceInput",
}) as any as S.Schema<ListTagsOfResourceInput>;
export interface ListTagsOfResourceOutput {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsOfResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsOfResourceOutput",
}) as any as S.Schema<ListTagsOfResourceOutput>;
export interface PutItemInput {
  TableName: string;
  Item: { [key: string]: AttributeValue | undefined };
  Expected?: { [key: string]: ExpectedAttributeValue | undefined };
  ReturnValues?: ReturnValue;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ConditionalOperator?: ConditionalOperator;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const PutItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    Item: PutItemInputAttributeMap,
    Expected: S.optional(ExpectedAttributeMap),
    ReturnValues: S.optional(ReturnValue),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ReturnItemCollectionMetrics: S.optional(ReturnItemCollectionMetrics),
    ConditionalOperator: S.optional(ConditionalOperator),
    ConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "PutItemInput" }) as any as S.Schema<PutItemInput>;
export interface PutItemOutput {
  Attributes?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
  ItemCollectionMetrics?: ItemCollectionMetrics;
}
export const PutItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AttributeMap),
    ConsumedCapacity: S.optional(ConsumedCapacity),
    ItemCollectionMetrics: S.optional(ItemCollectionMetrics),
  }).pipe(ns),
).annotate({ identifier: "PutItemOutput" }) as any as S.Schema<PutItemOutput>;
export type ConfirmRemoveSelfResourceAccess = boolean;
export interface PutResourcePolicyInput {
  ResourceArn: string;
  Policy: string;
  ExpectedRevisionId?: string;
  ConfirmRemoveSelfResourceAccess?: boolean;
}
export const PutResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.ContextParam("ResourceArn")),
    Policy: S.String,
    ExpectedRevisionId: S.optional(S.String),
    ConfirmRemoveSelfResourceAccess: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amz-confirm-remove-self-resource-access"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyInput",
}) as any as S.Schema<PutResourcePolicyInput>;
export interface PutResourcePolicyOutput {
  RevisionId?: string;
}
export const PutResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RevisionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutResourcePolicyOutput",
}) as any as S.Schema<PutResourcePolicyOutput>;
export type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT"
  | (string & {});
export const Select = S.String;

export interface Condition {
  AttributeValueList?: AttributeValue[];
  ComparisonOperator: ComparisonOperator;
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeValueList: S.optional(AttributeValueList),
    ComparisonOperator: ComparisonOperator,
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type KeyConditions = { [key: string]: Condition | undefined };
export const KeyConditions = /*@__PURE__*/ S.Record(
  S.String,
  Condition.pipe(S.optional),
);
export type FilterConditionMap = { [key: string]: Condition | undefined };
export const FilterConditionMap = /*@__PURE__*/ S.Record(
  S.String,
  Condition.pipe(S.optional),
);
export type KeyExpression = string;
export interface QueryInput {
  TableName: string;
  IndexName?: string;
  Select?: Select;
  AttributesToGet?: string[];
  Limit?: number;
  ConsistentRead?: boolean;
  KeyConditions?: { [key: string]: Condition | undefined };
  QueryFilter?: { [key: string]: Condition | undefined };
  ConditionalOperator?: ConditionalOperator;
  ScanIndexForward?: boolean;
  ExclusiveStartKey?: { [key: string]: AttributeValue | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ProjectionExpression?: string;
  FilterExpression?: string;
  KeyConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
}
export const QueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    IndexName: S.optional(S.String),
    Select: S.optional(Select),
    AttributesToGet: S.optional(AttributeNameList),
    Limit: S.optional(S.Number),
    ConsistentRead: S.optional(S.Boolean),
    KeyConditions: S.optional(KeyConditions),
    QueryFilter: S.optional(FilterConditionMap),
    ConditionalOperator: S.optional(ConditionalOperator),
    ScanIndexForward: S.optional(S.Boolean),
    ExclusiveStartKey: S.optional(Key),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ProjectionExpression: S.optional(S.String),
    FilterExpression: S.optional(S.String),
    KeyConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "QueryInput" }) as any as S.Schema<QueryInput>;
export interface QueryOutput {
  Items?: { [key: string]: AttributeValue | undefined }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
}
export const QueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ItemList),
    Count: S.optional(S.Number),
    ScannedCount: S.optional(S.Number),
    LastEvaluatedKey: S.optional(Key),
    ConsumedCapacity: S.optional(ConsumedCapacity),
  }).pipe(ns),
).annotate({ identifier: "QueryOutput" }) as any as S.Schema<QueryOutput>;
export interface RestoreTableFromBackupInput {
  TargetTableName: string;
  BackupArn: string;
  BillingModeOverride?: BillingMode;
  GlobalSecondaryIndexOverride?: GlobalSecondaryIndex[];
  LocalSecondaryIndexOverride?: LocalSecondaryIndex[];
  ProvisionedThroughputOverride?: ProvisionedThroughput;
  OnDemandThroughputOverride?: OnDemandThroughput;
  SSESpecificationOverride?: SSESpecification;
  VectorIndexOverride?: VectorIndex[];
}
export const RestoreTableFromBackupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetTableName: S.String.pipe(T.ContextParam("ResourceArn")),
    BackupArn: S.String,
    BillingModeOverride: S.optional(BillingMode),
    GlobalSecondaryIndexOverride: S.optional(GlobalSecondaryIndexList),
    LocalSecondaryIndexOverride: S.optional(LocalSecondaryIndexList),
    ProvisionedThroughputOverride: S.optional(ProvisionedThroughput),
    OnDemandThroughputOverride: S.optional(OnDemandThroughput),
    SSESpecificationOverride: S.optional(SSESpecification),
    VectorIndexOverride: S.optional(VectorIndexList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestoreTableFromBackupInput",
}) as any as S.Schema<RestoreTableFromBackupInput>;
export interface RestoreTableFromBackupOutput {
  TableDescription?: TableDescription;
}
export const RestoreTableFromBackupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableDescription: S.optional(TableDescription) }).pipe(ns),
).annotate({
  identifier: "RestoreTableFromBackupOutput",
}) as any as S.Schema<RestoreTableFromBackupOutput>;
export interface RestoreTableToPointInTimeInput {
  SourceTableArn?: string;
  SourceTableName?: string;
  TargetTableName: string;
  UseLatestRestorableTime?: boolean;
  RestoreDateTime?: Date;
  BillingModeOverride?: BillingMode;
  GlobalSecondaryIndexOverride?: GlobalSecondaryIndex[];
  LocalSecondaryIndexOverride?: LocalSecondaryIndex[];
  ProvisionedThroughputOverride?: ProvisionedThroughput;
  OnDemandThroughputOverride?: OnDemandThroughput;
  SSESpecificationOverride?: SSESpecification;
  VectorIndexOverride?: VectorIndex[];
}
export const RestoreTableToPointInTimeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceTableArn: S.optional(S.String),
    SourceTableName: S.optional(S.String),
    TargetTableName: S.String.pipe(T.ContextParam("ResourceArn")),
    UseLatestRestorableTime: S.optional(S.Boolean),
    RestoreDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    BillingModeOverride: S.optional(BillingMode),
    GlobalSecondaryIndexOverride: S.optional(GlobalSecondaryIndexList),
    LocalSecondaryIndexOverride: S.optional(LocalSecondaryIndexList),
    ProvisionedThroughputOverride: S.optional(ProvisionedThroughput),
    OnDemandThroughputOverride: S.optional(OnDemandThroughput),
    SSESpecificationOverride: S.optional(SSESpecification),
    VectorIndexOverride: S.optional(VectorIndexList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestoreTableToPointInTimeInput",
}) as any as S.Schema<RestoreTableToPointInTimeInput>;
export interface RestoreTableToPointInTimeOutput {
  TableDescription?: TableDescription;
}
export const RestoreTableToPointInTimeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableDescription: S.optional(TableDescription) }).pipe(ns),
).annotate({
  identifier: "RestoreTableToPointInTimeOutput",
}) as any as S.Schema<RestoreTableToPointInTimeOutput>;
export type ScanTotalSegments = number;
export type ScanSegment = number;
export interface ScanInput {
  TableName: string;
  IndexName?: string;
  AttributesToGet?: string[];
  Limit?: number;
  Select?: Select;
  ScanFilter?: { [key: string]: Condition | undefined };
  ConditionalOperator?: ConditionalOperator;
  ExclusiveStartKey?: { [key: string]: AttributeValue | undefined };
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  TotalSegments?: number;
  Segment?: number;
  ProjectionExpression?: string;
  FilterExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ConsistentRead?: boolean;
}
export const ScanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    IndexName: S.optional(S.String),
    AttributesToGet: S.optional(AttributeNameList),
    Limit: S.optional(S.Number),
    Select: S.optional(Select),
    ScanFilter: S.optional(FilterConditionMap),
    ConditionalOperator: S.optional(ConditionalOperator),
    ExclusiveStartKey: S.optional(Key),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    TotalSegments: S.optional(S.Number),
    Segment: S.optional(S.Number),
    ProjectionExpression: S.optional(S.String),
    FilterExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ConsistentRead: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ScanInput" }) as any as S.Schema<ScanInput>;
export interface ScanOutput {
  Items?: { [key: string]: AttributeValue | undefined }[];
  Count?: number;
  ScannedCount?: number;
  LastEvaluatedKey?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
}
export const ScanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ItemList),
    Count: S.optional(S.Number),
    ScannedCount: S.optional(S.Number),
    LastEvaluatedKey: S.optional(Key),
    ConsumedCapacity: S.optional(ConsumedCapacity),
  }).pipe(ns),
).annotate({ identifier: "ScanOutput" }) as any as S.Schema<ScanOutput>;
export type SearchVectorList = AttributeValue[];
export const SearchVectorList = /*@__PURE__*/ S.Array(
  S.suspend(() => AttributeValue).annotate({ identifier: "AttributeValue" }),
);
export type TopKInteger = number;
export interface SearchVectorsInput {
  TableName: string;
  IndexName: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ProjectionExpression?: string;
  SearchVector: AttributeValue[];
  SearchConditionExpression?: string;
  TopK: number;
}
export const SearchVectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    IndexName: S.String,
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ProjectionExpression: S.optional(S.String),
    SearchVector: SearchVectorList,
    SearchConditionExpression: S.optional(S.String),
    TopK: S.Number,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ IsSearchOperation: { value: true } }),
    ),
  ),
).annotate({
  identifier: "SearchVectorsInput",
}) as any as S.Schema<SearchVectorsInput>;
export type ScoreNumber = number;
export interface SearchResultItem {
  Item?: { [key: string]: AttributeValue | undefined };
  Score?: number;
}
export const SearchResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Item: S.optional(AttributeMap), Score: S.optional(S.Number) }),
).annotate({
  identifier: "SearchResultItem",
}) as any as S.Schema<SearchResultItem>;
export type SearchResultList = SearchResultItem[];
export const SearchResultList = /*@__PURE__*/ S.Array(SearchResultItem);
export interface SearchVectorsOutput {
  ConsumedCapacity?: VectorCapacity;
  SearchResults?: SearchResultItem[];
}
export const SearchVectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsumedCapacity: S.optional(VectorCapacity),
    SearchResults: S.optional(SearchResultList),
  }).pipe(ns),
).annotate({
  identifier: "SearchVectorsOutput",
}) as any as S.Schema<SearchVectorsOutput>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.ContextParam("ResourceArn")),
    Tags: TagList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface Get {
  Key: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ProjectionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
}
export const Get = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: Key,
    TableName: S.String,
    ProjectionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
  }),
).annotate({ identifier: "Get" }) as any as S.Schema<Get>;
export interface TransactGetItem {
  Get: Get;
}
export const TransactGetItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Get: Get }),
).annotate({
  identifier: "TransactGetItem",
}) as any as S.Schema<TransactGetItem>;
export type TransactGetItemList = TransactGetItem[];
export const TransactGetItemList = /*@__PURE__*/ S.Array(TransactGetItem);
export interface TransactGetItemsInput {
  TransactItems: TransactGetItem[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
}
export const TransactGetItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransactItems: TransactGetItemList,
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TransactGetItemsInput",
}) as any as S.Schema<TransactGetItemsInput>;
export interface TransactGetItemsOutput {
  ConsumedCapacity?: ConsumedCapacity[];
  Responses?: ItemResponse[];
}
export const TransactGetItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsumedCapacity: S.optional(ConsumedCapacityMultiple),
    Responses: S.optional(ItemResponseList),
  }).pipe(ns),
).annotate({
  identifier: "TransactGetItemsOutput",
}) as any as S.Schema<TransactGetItemsOutput>;
export interface ConditionCheck {
  Key: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ConditionExpression: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const ConditionCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: Key,
    TableName: S.String,
    ConditionExpression: S.String,
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }),
).annotate({ identifier: "ConditionCheck" }) as any as S.Schema<ConditionCheck>;
export interface Put {
  Item: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const Put = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: PutItemInputAttributeMap,
    TableName: S.String,
    ConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }),
).annotate({ identifier: "Put" }) as any as S.Schema<Put>;
export interface Delete {
  Key: { [key: string]: AttributeValue | undefined };
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const Delete = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: Key,
    TableName: S.String,
    ConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }),
).annotate({ identifier: "Delete" }) as any as S.Schema<Delete>;
export type UpdateExpression = string;
export interface Update {
  Key: { [key: string]: AttributeValue | undefined };
  UpdateExpression: string;
  TableName: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const Update = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: Key,
    UpdateExpression: S.String,
    TableName: S.String,
    ConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }),
).annotate({ identifier: "Update" }) as any as S.Schema<Update>;
export interface TransactWriteItem {
  ConditionCheck?: ConditionCheck;
  Put?: Put;
  Delete?: Delete;
  Update?: Update;
}
export const TransactWriteItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConditionCheck: S.optional(ConditionCheck),
    Put: S.optional(Put),
    Delete: S.optional(Delete),
    Update: S.optional(Update),
  }),
).annotate({
  identifier: "TransactWriteItem",
}) as any as S.Schema<TransactWriteItem>;
export type TransactWriteItemList = TransactWriteItem[];
export const TransactWriteItemList = /*@__PURE__*/ S.Array(TransactWriteItem);
export interface TransactWriteItemsInput {
  TransactItems: TransactWriteItem[];
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  ClientRequestToken?: string;
}
export const TransactWriteItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransactItems: TransactWriteItemList,
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ReturnItemCollectionMetrics: S.optional(ReturnItemCollectionMetrics),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TransactWriteItemsInput",
}) as any as S.Schema<TransactWriteItemsInput>;
export interface TransactWriteItemsOutput {
  ConsumedCapacity?: ConsumedCapacity[];
  ItemCollectionMetrics?: {
    [key: string]: ItemCollectionMetrics[] | undefined;
  };
}
export const TransactWriteItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsumedCapacity: S.optional(ConsumedCapacityMultiple),
    ItemCollectionMetrics: S.optional(ItemCollectionMetricsPerTable),
  }).pipe(ns),
).annotate({
  identifier: "TransactWriteItemsOutput",
}) as any as S.Schema<TransactWriteItemsOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.ContextParam("ResourceArn")),
    TagKeys: TagKeyList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface PointInTimeRecoverySpecification {
  PointInTimeRecoveryEnabled: boolean;
  RecoveryPeriodInDays?: number;
}
export const PointInTimeRecoverySpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PointInTimeRecoveryEnabled: S.Boolean,
    RecoveryPeriodInDays: S.optional(S.Number),
  }),
).annotate({
  identifier: "PointInTimeRecoverySpecification",
}) as any as S.Schema<PointInTimeRecoverySpecification>;
export interface UpdateContinuousBackupsInput {
  TableName: string;
  PointInTimeRecoverySpecification: PointInTimeRecoverySpecification;
}
export const UpdateContinuousBackupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    PointInTimeRecoverySpecification: PointInTimeRecoverySpecification,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContinuousBackupsInput",
}) as any as S.Schema<UpdateContinuousBackupsInput>;
export interface UpdateContinuousBackupsOutput {
  ContinuousBackupsDescription?: ContinuousBackupsDescription;
}
export const UpdateContinuousBackupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContinuousBackupsDescription: S.optional(ContinuousBackupsDescription),
  }).pipe(ns),
).annotate({
  identifier: "UpdateContinuousBackupsOutput",
}) as any as S.Schema<UpdateContinuousBackupsOutput>;
export type ContributorInsightsAction = "ENABLE" | "DISABLE" | (string & {});
export const ContributorInsightsAction = S.String;

export interface UpdateContributorInsightsInput {
  TableName: string;
  IndexName?: string;
  ContributorInsightsAction: ContributorInsightsAction;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export const UpdateContributorInsightsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    IndexName: S.optional(S.String),
    ContributorInsightsAction: ContributorInsightsAction,
    ContributorInsightsMode: S.optional(ContributorInsightsMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateContributorInsightsInput",
}) as any as S.Schema<UpdateContributorInsightsInput>;
export interface UpdateContributorInsightsOutput {
  TableName?: string;
  IndexName?: string;
  ContributorInsightsStatus?: ContributorInsightsStatus;
  ContributorInsightsMode?: ContributorInsightsMode;
}
export const UpdateContributorInsightsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    IndexName: S.optional(S.String),
    ContributorInsightsStatus: S.optional(ContributorInsightsStatus),
    ContributorInsightsMode: S.optional(ContributorInsightsMode),
  }).pipe(ns),
).annotate({
  identifier: "UpdateContributorInsightsOutput",
}) as any as S.Schema<UpdateContributorInsightsOutput>;
export interface CreateReplicaAction {
  RegionName: string;
}
export const CreateReplicaAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegionName: S.String }),
).annotate({
  identifier: "CreateReplicaAction",
}) as any as S.Schema<CreateReplicaAction>;
export interface DeleteReplicaAction {
  RegionName: string;
}
export const DeleteReplicaAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegionName: S.String }),
).annotate({
  identifier: "DeleteReplicaAction",
}) as any as S.Schema<DeleteReplicaAction>;
export interface ReplicaUpdate {
  Create?: CreateReplicaAction;
  Delete?: DeleteReplicaAction;
}
export const ReplicaUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Create: S.optional(CreateReplicaAction),
    Delete: S.optional(DeleteReplicaAction),
  }),
).annotate({ identifier: "ReplicaUpdate" }) as any as S.Schema<ReplicaUpdate>;
export type ReplicaUpdateList = ReplicaUpdate[];
export const ReplicaUpdateList = /*@__PURE__*/ S.Array(ReplicaUpdate);
export interface UpdateGlobalTableInput {
  GlobalTableName: string;
  ReplicaUpdates: ReplicaUpdate[];
}
export const UpdateGlobalTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.String.pipe(T.ContextParam("ResourceArn")),
    ReplicaUpdates: ReplicaUpdateList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalTableInput",
}) as any as S.Schema<UpdateGlobalTableInput>;
export interface UpdateGlobalTableOutput {
  GlobalTableDescription?: GlobalTableDescription;
}
export const UpdateGlobalTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalTableDescription: S.optional(GlobalTableDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateGlobalTableOutput",
}) as any as S.Schema<UpdateGlobalTableOutput>;
export type AutoScalingRoleArn = string;
export interface AutoScalingTargetTrackingScalingPolicyConfigurationUpdate {
  DisableScaleIn?: boolean;
  ScaleInCooldown?: number;
  ScaleOutCooldown?: number;
  TargetValue: number;
}
export const AutoScalingTargetTrackingScalingPolicyConfigurationUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DisableScaleIn: S.optional(S.Boolean),
      ScaleInCooldown: S.optional(S.Number),
      ScaleOutCooldown: S.optional(S.Number),
      TargetValue: S.Number,
    }),
  ).annotate({
    identifier: "AutoScalingTargetTrackingScalingPolicyConfigurationUpdate",
  }) as any as S.Schema<AutoScalingTargetTrackingScalingPolicyConfigurationUpdate>;
export interface AutoScalingPolicyUpdate {
  PolicyName?: string;
  TargetTrackingScalingPolicyConfiguration: AutoScalingTargetTrackingScalingPolicyConfigurationUpdate;
}
export const AutoScalingPolicyUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.optional(S.String),
    TargetTrackingScalingPolicyConfiguration:
      AutoScalingTargetTrackingScalingPolicyConfigurationUpdate,
  }),
).annotate({
  identifier: "AutoScalingPolicyUpdate",
}) as any as S.Schema<AutoScalingPolicyUpdate>;
export interface AutoScalingSettingsUpdate {
  MinimumUnits?: number;
  MaximumUnits?: number;
  AutoScalingDisabled?: boolean;
  AutoScalingRoleArn?: string;
  ScalingPolicyUpdate?: AutoScalingPolicyUpdate;
}
export const AutoScalingSettingsUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumUnits: S.optional(S.Number),
    MaximumUnits: S.optional(S.Number),
    AutoScalingDisabled: S.optional(S.Boolean),
    AutoScalingRoleArn: S.optional(S.String),
    ScalingPolicyUpdate: S.optional(AutoScalingPolicyUpdate),
  }),
).annotate({
  identifier: "AutoScalingSettingsUpdate",
}) as any as S.Schema<AutoScalingSettingsUpdate>;
export interface GlobalTableGlobalSecondaryIndexSettingsUpdate {
  IndexName: string;
  ProvisionedWriteCapacityUnits?: number;
  ProvisionedWriteCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
}
export const GlobalTableGlobalSecondaryIndexSettingsUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexName: S.String,
      ProvisionedWriteCapacityUnits: S.optional(S.Number),
      ProvisionedWriteCapacityAutoScalingSettingsUpdate: S.optional(
        AutoScalingSettingsUpdate,
      ),
    }),
  ).annotate({
    identifier: "GlobalTableGlobalSecondaryIndexSettingsUpdate",
  }) as any as S.Schema<GlobalTableGlobalSecondaryIndexSettingsUpdate>;
export type GlobalTableGlobalSecondaryIndexSettingsUpdateList =
  GlobalTableGlobalSecondaryIndexSettingsUpdate[];
export const GlobalTableGlobalSecondaryIndexSettingsUpdateList =
  /*@__PURE__*/ S.Array(GlobalTableGlobalSecondaryIndexSettingsUpdate);
export interface ReplicaGlobalSecondaryIndexSettingsUpdate {
  IndexName: string;
  ProvisionedReadCapacityUnits?: number;
  ProvisionedReadCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
}
export const ReplicaGlobalSecondaryIndexSettingsUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexName: S.String,
      ProvisionedReadCapacityUnits: S.optional(S.Number),
      ProvisionedReadCapacityAutoScalingSettingsUpdate: S.optional(
        AutoScalingSettingsUpdate,
      ),
    }),
  ).annotate({
    identifier: "ReplicaGlobalSecondaryIndexSettingsUpdate",
  }) as any as S.Schema<ReplicaGlobalSecondaryIndexSettingsUpdate>;
export type ReplicaGlobalSecondaryIndexSettingsUpdateList =
  ReplicaGlobalSecondaryIndexSettingsUpdate[];
export const ReplicaGlobalSecondaryIndexSettingsUpdateList =
  /*@__PURE__*/ S.Array(ReplicaGlobalSecondaryIndexSettingsUpdate);
export interface ReplicaSettingsUpdate {
  RegionName: string;
  ReplicaProvisionedReadCapacityUnits?: number;
  ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  ReplicaGlobalSecondaryIndexSettingsUpdate?: ReplicaGlobalSecondaryIndexSettingsUpdate[];
  ReplicaTableClass?: TableClass;
}
export const ReplicaSettingsUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.String,
    ReplicaProvisionedReadCapacityUnits: S.optional(S.Number),
    ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate: S.optional(
      AutoScalingSettingsUpdate,
    ),
    ReplicaGlobalSecondaryIndexSettingsUpdate: S.optional(
      ReplicaGlobalSecondaryIndexSettingsUpdateList,
    ),
    ReplicaTableClass: S.optional(TableClass),
  }),
).annotate({
  identifier: "ReplicaSettingsUpdate",
}) as any as S.Schema<ReplicaSettingsUpdate>;
export type ReplicaSettingsUpdateList = ReplicaSettingsUpdate[];
export const ReplicaSettingsUpdateList = /*@__PURE__*/ S.Array(
  ReplicaSettingsUpdate,
);
export interface UpdateGlobalTableSettingsInput {
  GlobalTableName: string;
  GlobalTableBillingMode?: BillingMode;
  GlobalTableProvisionedWriteCapacityUnits?: number;
  GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate?: AutoScalingSettingsUpdate;
  GlobalTableGlobalSecondaryIndexSettingsUpdate?: GlobalTableGlobalSecondaryIndexSettingsUpdate[];
  ReplicaSettingsUpdate?: ReplicaSettingsUpdate[];
}
export const UpdateGlobalTableSettingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.String.pipe(T.ContextParam("ResourceArn")),
    GlobalTableBillingMode: S.optional(BillingMode),
    GlobalTableProvisionedWriteCapacityUnits: S.optional(S.Number),
    GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate: S.optional(
      AutoScalingSettingsUpdate,
    ),
    GlobalTableGlobalSecondaryIndexSettingsUpdate: S.optional(
      GlobalTableGlobalSecondaryIndexSettingsUpdateList,
    ),
    ReplicaSettingsUpdate: S.optional(ReplicaSettingsUpdateList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalTableSettingsInput",
}) as any as S.Schema<UpdateGlobalTableSettingsInput>;
export interface UpdateGlobalTableSettingsOutput {
  GlobalTableName?: string;
  ReplicaSettings?: ReplicaSettingsDescription[];
}
export const UpdateGlobalTableSettingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalTableName: S.optional(S.String),
    ReplicaSettings: S.optional(ReplicaSettingsDescriptionList),
  }).pipe(ns),
).annotate({
  identifier: "UpdateGlobalTableSettingsOutput",
}) as any as S.Schema<UpdateGlobalTableSettingsOutput>;
export type AttributeAction = "ADD" | "PUT" | "DELETE" | (string & {});
export const AttributeAction = S.String;

export interface AttributeValueUpdate {
  Value?: AttributeValue;
  Action?: AttributeAction;
}
export const AttributeValueUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(AttributeValue),
    Action: S.optional(AttributeAction),
  }),
).annotate({
  identifier: "AttributeValueUpdate",
}) as any as S.Schema<AttributeValueUpdate>;
export type AttributeUpdates = {
  [key: string]: AttributeValueUpdate | undefined;
};
export const AttributeUpdates = /*@__PURE__*/ S.Record(
  S.String,
  AttributeValueUpdate.pipe(S.optional),
);
export interface UpdateItemInput {
  TableName: string;
  Key: { [key: string]: AttributeValue | undefined };
  AttributeUpdates?: { [key: string]: AttributeValueUpdate | undefined };
  Expected?: { [key: string]: ExpectedAttributeValue | undefined };
  ConditionalOperator?: ConditionalOperator;
  ReturnValues?: ReturnValue;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ReturnItemCollectionMetrics?: ReturnItemCollectionMetrics;
  UpdateExpression?: string;
  ConditionExpression?: string;
  ExpressionAttributeNames?: { [key: string]: string | undefined };
  ExpressionAttributeValues?: { [key: string]: AttributeValue | undefined };
  ReturnValuesOnConditionCheckFailure?: ReturnValuesOnConditionCheckFailure;
}
export const UpdateItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    Key: Key,
    AttributeUpdates: S.optional(AttributeUpdates),
    Expected: S.optional(ExpectedAttributeMap),
    ConditionalOperator: S.optional(ConditionalOperator),
    ReturnValues: S.optional(ReturnValue),
    ReturnConsumedCapacity: S.optional(ReturnConsumedCapacity),
    ReturnItemCollectionMetrics: S.optional(ReturnItemCollectionMetrics),
    UpdateExpression: S.optional(S.String),
    ConditionExpression: S.optional(S.String),
    ExpressionAttributeNames: S.optional(ExpressionAttributeNameMap),
    ExpressionAttributeValues: S.optional(ExpressionAttributeValueMap),
    ReturnValuesOnConditionCheckFailure: S.optional(
      ReturnValuesOnConditionCheckFailure,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateItemInput",
}) as any as S.Schema<UpdateItemInput>;
export interface UpdateItemOutput {
  Attributes?: { [key: string]: AttributeValue | undefined };
  ConsumedCapacity?: ConsumedCapacity;
  ItemCollectionMetrics?: ItemCollectionMetrics;
}
export const UpdateItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AttributeMap),
    ConsumedCapacity: S.optional(ConsumedCapacity),
    ItemCollectionMetrics: S.optional(ItemCollectionMetrics),
  }).pipe(ns),
).annotate({
  identifier: "UpdateItemOutput",
}) as any as S.Schema<UpdateItemOutput>;
export interface UpdateKinesisStreamingConfiguration {
  ApproximateCreationDateTimePrecision?: ApproximateCreationDateTimePrecision;
}
export const UpdateKinesisStreamingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateCreationDateTimePrecision: S.optional(
      ApproximateCreationDateTimePrecision,
    ),
  }),
).annotate({
  identifier: "UpdateKinesisStreamingConfiguration",
}) as any as S.Schema<UpdateKinesisStreamingConfiguration>;
export interface UpdateKinesisStreamingDestinationInput {
  TableName: string;
  StreamArn: string;
  UpdateKinesisStreamingConfiguration?: UpdateKinesisStreamingConfiguration;
}
export const UpdateKinesisStreamingDestinationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TableName: S.String.pipe(T.ContextParam("ResourceArn")),
      StreamArn: S.String,
      UpdateKinesisStreamingConfiguration: S.optional(
        UpdateKinesisStreamingConfiguration,
      ),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateKinesisStreamingDestinationInput",
}) as any as S.Schema<UpdateKinesisStreamingDestinationInput>;
export interface UpdateKinesisStreamingDestinationOutput {
  TableName?: string;
  StreamArn?: string;
  DestinationStatus?: DestinationStatus;
  UpdateKinesisStreamingConfiguration?: UpdateKinesisStreamingConfiguration;
}
export const UpdateKinesisStreamingDestinationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TableName: S.optional(S.String),
      StreamArn: S.optional(S.String),
      DestinationStatus: S.optional(DestinationStatus),
      UpdateKinesisStreamingConfiguration: S.optional(
        UpdateKinesisStreamingConfiguration,
      ),
    }).pipe(ns),
).annotate({
  identifier: "UpdateKinesisStreamingDestinationOutput",
}) as any as S.Schema<UpdateKinesisStreamingDestinationOutput>;
export interface UpdateGlobalSecondaryIndexAction {
  IndexName: string;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
}
export const UpdateGlobalSecondaryIndexAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    WarmThroughput: S.optional(WarmThroughput),
  }),
).annotate({
  identifier: "UpdateGlobalSecondaryIndexAction",
}) as any as S.Schema<UpdateGlobalSecondaryIndexAction>;
export interface CreateGlobalSecondaryIndexAction {
  IndexName: string;
  KeySchema: KeySchemaElement[];
  Projection: Projection;
  ProvisionedThroughput?: ProvisionedThroughput;
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
}
export const CreateGlobalSecondaryIndexAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    KeySchema: KeySchema,
    Projection: Projection,
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    WarmThroughput: S.optional(WarmThroughput),
  }),
).annotate({
  identifier: "CreateGlobalSecondaryIndexAction",
}) as any as S.Schema<CreateGlobalSecondaryIndexAction>;
export interface DeleteGlobalSecondaryIndexAction {
  IndexName: string;
}
export const DeleteGlobalSecondaryIndexAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexName: S.String }),
).annotate({
  identifier: "DeleteGlobalSecondaryIndexAction",
}) as any as S.Schema<DeleteGlobalSecondaryIndexAction>;
export interface GlobalSecondaryIndexUpdate {
  Update?: UpdateGlobalSecondaryIndexAction;
  Create?: CreateGlobalSecondaryIndexAction;
  Delete?: DeleteGlobalSecondaryIndexAction;
}
export const GlobalSecondaryIndexUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Update: S.optional(UpdateGlobalSecondaryIndexAction),
    Create: S.optional(CreateGlobalSecondaryIndexAction),
    Delete: S.optional(DeleteGlobalSecondaryIndexAction),
  }),
).annotate({
  identifier: "GlobalSecondaryIndexUpdate",
}) as any as S.Schema<GlobalSecondaryIndexUpdate>;
export type GlobalSecondaryIndexUpdateList = GlobalSecondaryIndexUpdate[];
export const GlobalSecondaryIndexUpdateList = /*@__PURE__*/ S.Array(
  GlobalSecondaryIndexUpdate,
);
export interface ReplicaGlobalSecondaryIndex {
  IndexName: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
}
export const ReplicaGlobalSecondaryIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    ProvisionedThroughputOverride: S.optional(ProvisionedThroughputOverride),
    OnDemandThroughputOverride: S.optional(OnDemandThroughputOverride),
  }),
).annotate({
  identifier: "ReplicaGlobalSecondaryIndex",
}) as any as S.Schema<ReplicaGlobalSecondaryIndex>;
export type ReplicaGlobalSecondaryIndexList = ReplicaGlobalSecondaryIndex[];
export const ReplicaGlobalSecondaryIndexList = /*@__PURE__*/ S.Array(
  ReplicaGlobalSecondaryIndex,
);
export interface CreateReplicationGroupMemberAction {
  RegionName: string;
  KMSMasterKeyId?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndex[];
  TableClassOverride?: TableClass;
}
export const CreateReplicationGroupMemberAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.String,
    KMSMasterKeyId: S.optional(S.String),
    ProvisionedThroughputOverride: S.optional(ProvisionedThroughputOverride),
    OnDemandThroughputOverride: S.optional(OnDemandThroughputOverride),
    GlobalSecondaryIndexes: S.optional(ReplicaGlobalSecondaryIndexList),
    TableClassOverride: S.optional(TableClass),
  }),
).annotate({
  identifier: "CreateReplicationGroupMemberAction",
}) as any as S.Schema<CreateReplicationGroupMemberAction>;
export interface UpdateReplicationGroupMemberAction {
  RegionName: string;
  KMSMasterKeyId?: string;
  ProvisionedThroughputOverride?: ProvisionedThroughputOverride;
  OnDemandThroughputOverride?: OnDemandThroughputOverride;
  GlobalSecondaryIndexes?: ReplicaGlobalSecondaryIndex[];
  TableClassOverride?: TableClass;
}
export const UpdateReplicationGroupMemberAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.String,
    KMSMasterKeyId: S.optional(S.String),
    ProvisionedThroughputOverride: S.optional(ProvisionedThroughputOverride),
    OnDemandThroughputOverride: S.optional(OnDemandThroughputOverride),
    GlobalSecondaryIndexes: S.optional(ReplicaGlobalSecondaryIndexList),
    TableClassOverride: S.optional(TableClass),
  }),
).annotate({
  identifier: "UpdateReplicationGroupMemberAction",
}) as any as S.Schema<UpdateReplicationGroupMemberAction>;
export interface DeleteReplicationGroupMemberAction {
  RegionName: string;
}
export const DeleteReplicationGroupMemberAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegionName: S.String }),
).annotate({
  identifier: "DeleteReplicationGroupMemberAction",
}) as any as S.Schema<DeleteReplicationGroupMemberAction>;
export interface ReplicationGroupUpdate {
  Create?: CreateReplicationGroupMemberAction;
  Update?: UpdateReplicationGroupMemberAction;
  Delete?: DeleteReplicationGroupMemberAction;
}
export const ReplicationGroupUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Create: S.optional(CreateReplicationGroupMemberAction),
    Update: S.optional(UpdateReplicationGroupMemberAction),
    Delete: S.optional(DeleteReplicationGroupMemberAction),
  }),
).annotate({
  identifier: "ReplicationGroupUpdate",
}) as any as S.Schema<ReplicationGroupUpdate>;
export type ReplicationGroupUpdateList = ReplicationGroupUpdate[];
export const ReplicationGroupUpdateList = /*@__PURE__*/ S.Array(
  ReplicationGroupUpdate,
);
export interface CreateGlobalTableWitnessGroupMemberAction {
  RegionName: string;
}
export const CreateGlobalTableWitnessGroupMemberAction =
  /*@__PURE__*/ S.suspend(() => S.Struct({ RegionName: S.String })).annotate({
    identifier: "CreateGlobalTableWitnessGroupMemberAction",
  }) as any as S.Schema<CreateGlobalTableWitnessGroupMemberAction>;
export interface DeleteGlobalTableWitnessGroupMemberAction {
  RegionName: string;
}
export const DeleteGlobalTableWitnessGroupMemberAction =
  /*@__PURE__*/ S.suspend(() => S.Struct({ RegionName: S.String })).annotate({
    identifier: "DeleteGlobalTableWitnessGroupMemberAction",
  }) as any as S.Schema<DeleteGlobalTableWitnessGroupMemberAction>;
export interface GlobalTableWitnessGroupUpdate {
  Create?: CreateGlobalTableWitnessGroupMemberAction;
  Delete?: DeleteGlobalTableWitnessGroupMemberAction;
}
export const GlobalTableWitnessGroupUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Create: S.optional(CreateGlobalTableWitnessGroupMemberAction),
    Delete: S.optional(DeleteGlobalTableWitnessGroupMemberAction),
  }),
).annotate({
  identifier: "GlobalTableWitnessGroupUpdate",
}) as any as S.Schema<GlobalTableWitnessGroupUpdate>;
export type GlobalTableWitnessGroupUpdateList = GlobalTableWitnessGroupUpdate[];
export const GlobalTableWitnessGroupUpdateList = /*@__PURE__*/ S.Array(
  GlobalTableWitnessGroupUpdate,
);
export interface CreateVectorIndexAction {
  IndexName: string;
  VectorAttribute: VectorAttributeDefinition;
  SearchSchema?: SearchSchemaElement[];
  Projection: Projection;
  Dimensions: number;
  DistanceFunction: VectorDistanceFunction;
}
export const CreateVectorIndexAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    VectorAttribute: VectorAttributeDefinition,
    SearchSchema: S.optional(SearchSchema),
    Projection: Projection,
    Dimensions: S.Number,
    DistanceFunction: VectorDistanceFunction,
  }),
).annotate({
  identifier: "CreateVectorIndexAction",
}) as any as S.Schema<CreateVectorIndexAction>;
export interface DeleteVectorIndexAction {
  IndexName: string;
}
export const DeleteVectorIndexAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexName: S.String }),
).annotate({
  identifier: "DeleteVectorIndexAction",
}) as any as S.Schema<DeleteVectorIndexAction>;
export interface VectorIndexUpdate {
  Create?: CreateVectorIndexAction;
  Delete?: DeleteVectorIndexAction;
}
export const VectorIndexUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Create: S.optional(CreateVectorIndexAction),
    Delete: S.optional(DeleteVectorIndexAction),
  }),
).annotate({
  identifier: "VectorIndexUpdate",
}) as any as S.Schema<VectorIndexUpdate>;
export type VectorIndexUpdateList = VectorIndexUpdate[];
export const VectorIndexUpdateList = /*@__PURE__*/ S.Array(VectorIndexUpdate);
export interface UpdateTableInput {
  AttributeDefinitions?: AttributeDefinition[];
  TableName: string;
  BillingMode?: BillingMode;
  ProvisionedThroughput?: ProvisionedThroughput;
  GlobalSecondaryIndexUpdates?: GlobalSecondaryIndexUpdate[];
  StreamSpecification?: StreamSpecification;
  SSESpecification?: SSESpecification;
  ReplicaUpdates?: ReplicationGroupUpdate[];
  TableClass?: TableClass;
  DeletionProtectionEnabled?: boolean;
  MultiRegionConsistency?: MultiRegionConsistency;
  GlobalTableWitnessUpdates?: GlobalTableWitnessGroupUpdate[];
  OnDemandThroughput?: OnDemandThroughput;
  WarmThroughput?: WarmThroughput;
  GlobalTableSettingsReplicationMode?: GlobalTableSettingsReplicationMode;
  VectorIndexUpdates?: VectorIndexUpdate[];
}
export const UpdateTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeDefinitions: S.optional(AttributeDefinitions),
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    BillingMode: S.optional(BillingMode),
    ProvisionedThroughput: S.optional(ProvisionedThroughput),
    GlobalSecondaryIndexUpdates: S.optional(GlobalSecondaryIndexUpdateList),
    StreamSpecification: S.optional(StreamSpecification),
    SSESpecification: S.optional(SSESpecification),
    ReplicaUpdates: S.optional(ReplicationGroupUpdateList),
    TableClass: S.optional(TableClass),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    MultiRegionConsistency: S.optional(MultiRegionConsistency),
    GlobalTableWitnessUpdates: S.optional(GlobalTableWitnessGroupUpdateList),
    OnDemandThroughput: S.optional(OnDemandThroughput),
    WarmThroughput: S.optional(WarmThroughput),
    GlobalTableSettingsReplicationMode: S.optional(
      GlobalTableSettingsReplicationMode,
    ),
    VectorIndexUpdates: S.optional(VectorIndexUpdateList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTableInput",
}) as any as S.Schema<UpdateTableInput>;
export interface UpdateTableOutput {
  TableDescription?: TableDescription;
}
export const UpdateTableOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableDescription: S.optional(TableDescription) }).pipe(ns),
).annotate({
  identifier: "UpdateTableOutput",
}) as any as S.Schema<UpdateTableOutput>;
export interface GlobalSecondaryIndexAutoScalingUpdate {
  IndexName?: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
}
export const GlobalSecondaryIndexAutoScalingUpdate = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IndexName: S.optional(S.String),
      ProvisionedWriteCapacityAutoScalingUpdate: S.optional(
        AutoScalingSettingsUpdate,
      ),
    }),
).annotate({
  identifier: "GlobalSecondaryIndexAutoScalingUpdate",
}) as any as S.Schema<GlobalSecondaryIndexAutoScalingUpdate>;
export type GlobalSecondaryIndexAutoScalingUpdateList =
  GlobalSecondaryIndexAutoScalingUpdate[];
export const GlobalSecondaryIndexAutoScalingUpdateList = /*@__PURE__*/ S.Array(
  GlobalSecondaryIndexAutoScalingUpdate,
);
export interface ReplicaGlobalSecondaryIndexAutoScalingUpdate {
  IndexName?: string;
  ProvisionedReadCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
}
export const ReplicaGlobalSecondaryIndexAutoScalingUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IndexName: S.optional(S.String),
      ProvisionedReadCapacityAutoScalingUpdate: S.optional(
        AutoScalingSettingsUpdate,
      ),
    }),
  ).annotate({
    identifier: "ReplicaGlobalSecondaryIndexAutoScalingUpdate",
  }) as any as S.Schema<ReplicaGlobalSecondaryIndexAutoScalingUpdate>;
export type ReplicaGlobalSecondaryIndexAutoScalingUpdateList =
  ReplicaGlobalSecondaryIndexAutoScalingUpdate[];
export const ReplicaGlobalSecondaryIndexAutoScalingUpdateList =
  /*@__PURE__*/ S.Array(ReplicaGlobalSecondaryIndexAutoScalingUpdate);
export interface ReplicaAutoScalingUpdate {
  RegionName: string;
  ReplicaGlobalSecondaryIndexUpdates?: ReplicaGlobalSecondaryIndexAutoScalingUpdate[];
  ReplicaProvisionedReadCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
}
export const ReplicaAutoScalingUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.String,
    ReplicaGlobalSecondaryIndexUpdates: S.optional(
      ReplicaGlobalSecondaryIndexAutoScalingUpdateList,
    ),
    ReplicaProvisionedReadCapacityAutoScalingUpdate: S.optional(
      AutoScalingSettingsUpdate,
    ),
  }),
).annotate({
  identifier: "ReplicaAutoScalingUpdate",
}) as any as S.Schema<ReplicaAutoScalingUpdate>;
export type ReplicaAutoScalingUpdateList = ReplicaAutoScalingUpdate[];
export const ReplicaAutoScalingUpdateList = /*@__PURE__*/ S.Array(
  ReplicaAutoScalingUpdate,
);
export interface UpdateTableReplicaAutoScalingInput {
  GlobalSecondaryIndexUpdates?: GlobalSecondaryIndexAutoScalingUpdate[];
  TableName: string;
  ProvisionedWriteCapacityAutoScalingUpdate?: AutoScalingSettingsUpdate;
  ReplicaUpdates?: ReplicaAutoScalingUpdate[];
}
export const UpdateTableReplicaAutoScalingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalSecondaryIndexUpdates: S.optional(
      GlobalSecondaryIndexAutoScalingUpdateList,
    ),
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    ProvisionedWriteCapacityAutoScalingUpdate: S.optional(
      AutoScalingSettingsUpdate,
    ),
    ReplicaUpdates: S.optional(ReplicaAutoScalingUpdateList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTableReplicaAutoScalingInput",
}) as any as S.Schema<UpdateTableReplicaAutoScalingInput>;
export interface UpdateTableReplicaAutoScalingOutput {
  TableAutoScalingDescription?: TableAutoScalingDescription;
}
export const UpdateTableReplicaAutoScalingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableAutoScalingDescription: S.optional(TableAutoScalingDescription),
  }).pipe(ns),
).annotate({
  identifier: "UpdateTableReplicaAutoScalingOutput",
}) as any as S.Schema<UpdateTableReplicaAutoScalingOutput>;
export type TimeToLiveEnabled = boolean;
export interface TimeToLiveSpecification {
  Enabled: boolean;
  AttributeName: string;
}
export const TimeToLiveSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean, AttributeName: S.String }),
).annotate({
  identifier: "TimeToLiveSpecification",
}) as any as S.Schema<TimeToLiveSpecification>;
export interface UpdateTimeToLiveInput {
  TableName: string;
  TimeToLiveSpecification: TimeToLiveSpecification;
}
export const UpdateTimeToLiveInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String.pipe(T.ContextParam("ResourceArn")),
    TimeToLiveSpecification: TimeToLiveSpecification,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTimeToLiveInput",
}) as any as S.Schema<UpdateTimeToLiveInput>;
export interface UpdateTimeToLiveOutput {
  TimeToLiveSpecification?: TimeToLiveSpecification;
}
export const UpdateTimeToLiveOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeToLiveSpecification: S.optional(TimeToLiveSpecification),
  }).pipe(ns),
).annotate({
  identifier: "UpdateTimeToLiveOutput",
}) as any as S.Schema<UpdateTimeToLiveOutput>;
export type ErrorMessage = string;
export type Reason = string;
export type Resource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export const ThrottlingReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reason: S.optional(S.String), resource: S.optional(S.String) }),
).annotate({
  identifier: "ThrottlingReason",
}) as any as S.Schema<ThrottlingReason>;
export type ThrottlingReasonList = ThrottlingReason[];
export const ThrottlingReasonList = /*@__PURE__*/ S.Array(ThrottlingReason);
export type AvailabilityErrorMessage = string;
export type Code = string;
export interface CancellationReason {
  Item?: { [key: string]: AttributeValue | undefined };
  Code?: string;
  Message?: string;
}
export const CancellationReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(AttributeMap),
    Code: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "CancellationReason",
}) as any as S.Schema<CancellationReason>;
export type CancellationReasonList = CancellationReason[];
export const CancellationReasonList = /*@__PURE__*/ S.Array(CancellationReason);
export type BatchExecuteStatementError =
  | InternalServerError
  | RequestLimitExceeded
  | ThrottlingException
  | CommonErrors;
/**
 * This operation allows you to perform batch reads or writes on data stored in DynamoDB,
 * using PartiQL. Each read statement in a `BatchExecuteStatement` must specify
 * an equality condition on all key attributes. This enforces that each `SELECT`
 * statement in a batch returns at most a single item. For more information, see Running batch operations with PartiQL for DynamoDB .
 *
 * The entire batch must consist of either read statements or write statements, you
 * cannot mix both in one batch.
 *
 * A HTTP 200 response does not mean that all statements in the BatchExecuteStatement
 * succeeded. Error details for individual statements can be found under the Error field of the `BatchStatementResponse` for each
 * statement.
 */
export const batchExecuteStatement: API.OperationMethod<
  BatchExecuteStatementInput,
  BatchExecuteStatementOutput,
  BatchExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchExecuteStatementInput,
  output: BatchExecuteStatementOutput,
  errors: [InternalServerError, RequestLimitExceeded, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchExecuteStatement",
}));

export type BatchGetItemError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `BatchGetItem` operation returns the attributes of one or more items
 * from one or more tables. You identify requested items by primary key.
 *
 * A single operation can retrieve up to 16 MB of data, which can contain as many as 100
 * items. `BatchGetItem` returns a partial result if the response size limit is
 * exceeded, the table's provisioned throughput is exceeded, more than 1MB per partition is
 * requested, or an internal processing failure occurs. If a partial result is returned,
 * the operation returns a value for `UnprocessedKeys`. You can use this value
 * to retry the operation starting with the next item to get.
 *
 * If you request more than 100 items, `BatchGetItem` returns a
 * `ValidationException` with the message "Too many items requested for
 * the BatchGetItem call."
 *
 * For example, if you ask to retrieve 100 items, but each individual item is 300 KB in
 * size, the system returns 52 items (so as not to exceed the 16 MB limit). It also returns
 * an appropriate `UnprocessedKeys` value so you can get the next page of
 * results. If desired, your application can include its own logic to assemble the pages of
 * results into one dataset.
 *
 * If *none* of the items can be processed due to insufficient
 * provisioned throughput on all of the tables in the request, then
 * `BatchGetItem` returns a
 * `ProvisionedThroughputExceededException`. If at least
 * one of the items is successfully processed, then
 * `BatchGetItem` completes successfully, while returning the keys of the
 * unread items in `UnprocessedKeys`.
 *
 * If DynamoDB returns any unprocessed items, you should retry the batch operation on
 * those items. However, we strongly recommend that you use an exponential
 * backoff algorithm. If you retry the batch operation immediately, the
 * underlying read or write requests can still fail due to throttling on the individual
 * tables. If you delay the batch operation using exponential backoff, the individual
 * requests in the batch are much more likely to succeed.
 *
 * For more information, see Batch Operations and Error Handling in the Amazon DynamoDB
 * Developer Guide.
 *
 * By default, `BatchGetItem` performs eventually consistent reads on every
 * table in the request. If you want strongly consistent reads instead, you can set
 * `ConsistentRead` to `true` for any or all tables.
 *
 * In order to minimize response latency, `BatchGetItem` may retrieve items in
 * parallel.
 *
 * When designing your application, keep in mind that DynamoDB does not return items in
 * any particular order. To help parse the response by item, include the primary key values
 * for the items in your request in the `ProjectionExpression` parameter.
 *
 * If a requested item does not exist, it is not returned in the result. Requests for
 * nonexistent items consume the minimum read capacity units according to the type of read.
 * For more information, see Working with Tables in the Amazon DynamoDB Developer
 * Guide.
 *
 * `BatchGetItem` will result in a `ValidationException` if the
 * same key is specified multiple times.
 */
export const batchGetItem: API.OperationMethod<
  BatchGetItemInput,
  BatchGetItemOutput,
  BatchGetItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetItemInput,
  output: BatchGetItemOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetItem",
}));

export type BatchWriteItemError =
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `BatchWriteItem` operation puts or deletes multiple items in one or
 * more tables. A single call to `BatchWriteItem` can transmit up to 16MB of
 * data over the network, consisting of up to 25 item put or delete operations. While
 * individual items can be up to 400 KB once stored, it's important to note that an item's
 * representation might be greater than 400KB while being sent in DynamoDB's JSON format
 * for the API call. For more details on this distinction, see Naming Rules and Data Types.
 *
 * `BatchWriteItem` cannot update items. If you perform a
 * `BatchWriteItem` operation on an existing item, that item's values
 * will be overwritten by the operation and it will appear like it was updated. To
 * update items, we recommend you use the `UpdateItem` action.
 *
 * The individual `PutItem` and `DeleteItem` operations specified
 * in `BatchWriteItem` are atomic; however `BatchWriteItem` as a
 * whole is not. If any requested operations fail because the table's provisioned
 * throughput is exceeded or an internal processing failure occurs, the failed operations
 * are returned in the `UnprocessedItems` response parameter. You can
 * investigate and optionally resend the requests. Typically, you would call
 * `BatchWriteItem` in a loop. Each iteration would check for unprocessed
 * items and submit a new `BatchWriteItem` request with those unprocessed items
 * until all items have been processed.
 *
 * If `BatchWriteItem` cannot process any items due to throttling (for
 * example, insufficient provisioned throughput on the tables in the request, or
 * partition-level or account-level limits), it returns a
 * `ProvisionedThroughputExceededException` or a
 * `ThrottlingException`. Both indicate that the request was throttled;
 * check the `ThrottlingReason` field in the returned exception for details.
 *
 * If DynamoDB returns any unprocessed items, you should retry the batch operation on
 * those items. However, we strongly recommend that you use an exponential
 * backoff algorithm. If you retry the batch operation immediately, the
 * underlying read or write requests can still fail due to throttling on the individual
 * tables. If you delay the batch operation using exponential backoff, the individual
 * requests in the batch are much more likely to succeed.
 *
 * For more information, see Batch Operations and Error Handling in the Amazon DynamoDB
 * Developer Guide.
 *
 * With `BatchWriteItem`, you can efficiently write or delete large amounts of
 * data, such as from Amazon EMR, or copy data from another database into DynamoDB. In
 * order to improve performance with these large-scale operations,
 * `BatchWriteItem` does not behave in the same way as individual
 * `PutItem` and `DeleteItem` calls would. For example, you
 * cannot specify conditions on individual put and delete requests, and
 * `BatchWriteItem` does not return deleted items in the response.
 *
 * If you use a programming language that supports concurrency, you can use threads to
 * write items in parallel. Your application must include the necessary logic to manage the
 * threads. With languages that don't support threading, you must update or delete the
 * specified items one at a time. In both situations, `BatchWriteItem` performs
 * the specified put and delete operations in parallel, giving you the power of the thread
 * pool approach without having to introduce complexity into your application.
 *
 * Parallel processing reduces latency, but each specified put and delete request
 * consumes the same number of write capacity units whether it is processed in parallel or
 * not. Delete operations on nonexistent items consume one write capacity unit.
 *
 * If one or more of the following is true, DynamoDB rejects the entire batch write
 * operation:
 *
 * - One or more tables specified in the `BatchWriteItem` request does
 * not exist.
 *
 * - Primary key attributes specified on an item in the request do not match those
 * in the corresponding table's primary key schema.
 *
 * - You try to perform multiple operations on the same item in the same
 * `BatchWriteItem` request. For example, you cannot put and delete
 * the same item in the same `BatchWriteItem` request.
 *
 * - Your request contains at least two items with identical hash and range keys
 * (which essentially is two put operations).
 *
 * - There are more than 25 requests in the batch.
 *
 * - Any individual item in a batch exceeds 400 KB.
 *
 * - The total request size exceeds 16 MB.
 *
 * - Any individual items with keys exceeding the key length limits. For a
 * partition key, the limit is 2048 bytes and for a sort key, the limit is 1024
 * bytes.
 */
export const batchWriteItem: API.OperationMethod<
  BatchWriteItemInput,
  BatchWriteItemOutput,
  BatchWriteItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchWriteItemInput,
  output: BatchWriteItemOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchWriteItem",
}));

export type CreateBackupError =
  | BackupInUseException
  | ContinuousBackupsUnavailableException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | TableInUseException
  | TableNotFoundException
  | CommonErrors;
/**
 * Creates a backup for an existing table.
 *
 * Each time you create an on-demand backup, the entire table data is backed up. There
 * is no limit to the number of on-demand backups that can be taken.
 *
 * When you create an on-demand backup, a time marker of the request is cataloged, and
 * the backup is created asynchronously, by applying all changes until the time of the
 * request to the last full table snapshot. Backup requests are processed instantaneously
 * and become available for restore within minutes.
 *
 * You can call `CreateBackup` at a maximum rate of 50 times per
 * second.
 *
 * All backups in DynamoDB work without consuming any provisioned throughput on the
 * table.
 *
 * If you submit a backup request on 2018-12-14 at 14:25:00, the backup is guaranteed to
 * contain all data committed to the table up to 14:24:00, and data committed after
 * 14:26:00 will not be. The backup might contain data modifications made between 14:24:00
 * and 14:26:00. On-demand backup does not support causal consistency.
 *
 * Along with data, the following are also included on the backups:
 *
 * - Global secondary indexes (GSIs)
 *
 * - Local secondary indexes (LSIs)
 *
 * - Streams
 *
 * - Provisioned read and write capacity
 */
export const createBackup: API.OperationMethod<
  CreateBackupInput,
  CreateBackupOutput,
  CreateBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBackupInput,
  output: CreateBackupOutput,
  errors: [
    BackupInUseException,
    ContinuousBackupsUnavailableException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    TableInUseException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBackup",
}));

export type CreateGlobalTableError =
  | GlobalTableAlreadyExistsException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | TableNotFoundException
  | CommonErrors;
/**
 * Creates a global table from an existing table. A global table creates a replication
 * relationship between two or more DynamoDB tables with the same table name in the
 * provided Regions.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 *
 * If you want to add a new replica table to a global table, each of the following
 * conditions must be true:
 *
 * - The table must have the same primary key as all of the other replicas.
 *
 * - The table must have the same name as all of the other replicas.
 *
 * - The table must have DynamoDB Streams enabled, with the stream containing both
 * the new and the old images of the item.
 *
 * - None of the replica tables in the global table can contain any data.
 *
 * If global secondary indexes are specified, then the following conditions must also be
 * met:
 *
 * - The global secondary indexes must have the same name.
 *
 * - The global secondary indexes must have the same hash key and sort key (if
 * present).
 *
 * If local secondary indexes are specified, then the following conditions must also be
 * met:
 *
 * - The local secondary indexes must have the same name.
 *
 * - The local secondary indexes must have the same hash key and sort key (if
 * present).
 *
 * Write capacity settings should be set consistently across your replica tables and
 * secondary indexes. DynamoDB strongly recommends enabling auto scaling to manage the
 * write capacity settings for all of your global tables replicas and indexes.
 *
 * If you prefer to manage write capacity settings manually, you should provision
 * equal replicated write capacity units to your replica tables. You should also
 * provision equal replicated write capacity units to matching secondary indexes across
 * your global table.
 */
export const createGlobalTable: API.OperationMethod<
  CreateGlobalTableInput,
  CreateGlobalTableOutput,
  CreateGlobalTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlobalTableInput,
  output: CreateGlobalTableOutput,
  errors: [
    GlobalTableAlreadyExistsException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalTable",
}));

export type CreateTableError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | CommonErrors;
/**
 * The `CreateTable` operation adds a new table to your account. In an Amazon Web Services account, table names must be unique within each Region. That is, you can
 * have two tables with same name if you create the tables in different Regions.
 *
 * `CreateTable` is an asynchronous operation. Upon receiving a
 * `CreateTable` request, DynamoDB immediately returns a response with a
 * `TableStatus` of `CREATING`. After the table is created,
 * DynamoDB sets the `TableStatus` to `ACTIVE`. You can perform read
 * and write operations only on an `ACTIVE` table.
 *
 * You can optionally define secondary indexes on the new table, as part of the
 * `CreateTable` operation. If you want to create multiple tables with
 * secondary indexes on them, you must create the tables sequentially. Only one table with
 * secondary indexes can be in the `CREATING` state at any given time.
 *
 * You can use the `DescribeTable` action to check the table status.
 */
export const createTable: API.OperationMethod<
  CreateTableInput,
  CreateTableOutput,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTableInput,
  output: CreateTableOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
}));

export type DeleteBackupError =
  | BackupInUseException
  | BackupNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes an existing backup of a table.
 *
 * You can call `DeleteBackup` at a maximum rate of 10 times per
 * second.
 */
export const deleteBackup: API.OperationMethod<
  DeleteBackupInput,
  DeleteBackupOutput,
  DeleteBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBackupInput,
  output: DeleteBackupOutput,
  errors: [
    BackupInUseException,
    BackupNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBackup",
}));

export type DeleteItemError =
  | ConditionalCheckFailedException
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * Deletes a single item in a table by primary key. You can perform a conditional delete
 * operation that deletes the item if it exists, or if it has an expected attribute
 * value.
 *
 * In addition to deleting an item, you can also return the item's attribute values in
 * the same operation, using the `ReturnValues` parameter.
 *
 * Unless you specify conditions, the `DeleteItem` is an idempotent operation;
 * running it multiple times on the same item or attribute does *not*
 * result in an error response.
 *
 * Conditional deletes are useful for deleting items only if specific conditions are met.
 * If those conditions are met, DynamoDB performs the delete. Otherwise, the item is not
 * deleted.
 */
export const deleteItem: API.OperationMethod<
  DeleteItemInput,
  DeleteItemOutput,
  DeleteItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteItemInput,
  output: DeleteItemOutput,
  errors: [
    ConditionalCheckFailedException,
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteItem",
}));

export type DeleteResourcePolicyError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | PolicyNotFoundException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to the resource, which can be a table or
 * stream.
 *
 * `DeleteResourcePolicy` is an idempotent operation; running it multiple
 * times on the same resource *doesn't* result in an error response,
 * unless you specify an `ExpectedRevisionId`, which will then return a
 * `PolicyNotFoundException`.
 *
 * To make sure that you don't inadvertently lock yourself out of your own resources,
 * the root principal in your Amazon Web Services account can perform
 * `DeleteResourcePolicy` requests, even if your resource-based policy
 * explicitly denies the root principal's access.
 *
 * `DeleteResourcePolicy` is an asynchronous operation. If you issue a
 * `GetResourcePolicy` request immediately after running the
 * `DeleteResourcePolicy` request, DynamoDB might still return
 * the deleted policy. This is because the policy for your resource might not have been
 * deleted yet. Wait for a few seconds, and then try the `GetResourcePolicy`
 * request again.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput,
  DeleteResourcePolicyOutput,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyInput,
  output: DeleteResourcePolicyOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    PolicyNotFoundException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteTableError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The `DeleteTable` operation deletes a table and all of its items. After a
 * `DeleteTable` request, the specified table is in the
 * `DELETING` state until DynamoDB completes the deletion. If the table is
 * in the `ACTIVE` state, you can delete it. If a table is in
 * `CREATING` or `UPDATING` states, then DynamoDB returns a
 * `ResourceInUseException`. If the specified table does not exist, DynamoDB
 * returns a `ResourceNotFoundException`. If table is already in the
 * `DELETING` state, no error is returned.
 *
 * DynamoDB might continue to accept data read and write operations, such as
 * `GetItem` and `PutItem`, on a table in the
 * `DELETING` state until the table deletion is complete. For the full
 * list of table states, see TableStatus.
 *
 * When you delete a table, any indexes on that table are also deleted.
 *
 * If you have DynamoDB Streams enabled on the table, then the corresponding stream on
 * that table goes into the `DISABLED` state, and the stream is automatically
 * deleted after 24 hours.
 *
 * Use the `DescribeTable` action to check the status of the table.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableInput,
  DeleteTableOutput,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTableInput,
  output: DeleteTableOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
}));

export type DescribeBackupError =
  | BackupNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Describes an existing backup of a table.
 *
 * You can call `DescribeBackup` at a maximum rate of 10 times per
 * second.
 */
export const describeBackup: API.OperationMethod<
  DescribeBackupInput,
  DescribeBackupOutput,
  DescribeBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBackupInput,
  output: DescribeBackupOutput,
  errors: [
    BackupNotFoundException,
    InternalServerError,
    InvalidEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBackup",
}));

export type DescribeContinuousBackupsError =
  | InternalServerError
  | InvalidEndpointException
  | TableNotFoundException
  | CommonErrors;
/**
 * Checks the status of continuous backups and point in time recovery on the specified
 * table. Continuous backups are `ENABLED` on all tables at table creation. If
 * point in time recovery is enabled, `PointInTimeRecoveryStatus` will be set to
 * ENABLED.
 *
 * After continuous backups and point in time recovery are enabled, you can restore to
 * any point in time within `EarliestRestorableDateTime` and
 * `LatestRestorableDateTime`.
 *
 * `LatestRestorableDateTime` is typically 5 minutes before the current time.
 * You can restore your table to any point in time in the last 35 days. You can set the
 * recovery period to any value between 1 and 35 days.
 *
 * You can call `DescribeContinuousBackups` at a maximum rate of 10 times per
 * second.
 */
export const describeContinuousBackups: API.OperationMethod<
  DescribeContinuousBackupsInput,
  DescribeContinuousBackupsOutput,
  DescribeContinuousBackupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContinuousBackupsInput,
  output: DescribeContinuousBackupsOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContinuousBackups",
}));

export type DescribeContributorInsightsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about contributor insights for a given table or global secondary
 * index.
 */
export const describeContributorInsights: API.OperationMethod<
  DescribeContributorInsightsInput,
  DescribeContributorInsightsOutput,
  DescribeContributorInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContributorInsightsInput,
  output: DescribeContributorInsightsOutput,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContributorInsights",
}));

export type DescribeEndpointsError = CommonErrors;
/**
 * Returns the regional endpoint information. For more information on policy permissions,
 * please see Internetwork traffic privacy.
 */
export const describeEndpoints: API.OperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEndpointsRequest,
  output: DescribeEndpointsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
}));

export type DescribeExportError =
  | ExportNotFoundException
  | InternalServerError
  | LimitExceededException
  | CommonErrors;
/**
 * Describes an existing table export.
 */
export const describeExport: API.OperationMethod<
  DescribeExportInput,
  DescribeExportOutput,
  DescribeExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExportInput,
  output: DescribeExportOutput,
  errors: [
    ExportNotFoundException,
    InternalServerError,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExport",
}));

export type DescribeGlobalTableError =
  | GlobalTableNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Returns information about the specified global table.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const describeGlobalTable: API.OperationMethod<
  DescribeGlobalTableInput,
  DescribeGlobalTableOutput,
  DescribeGlobalTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGlobalTableInput,
  output: DescribeGlobalTableOutput,
  errors: [
    GlobalTableNotFoundException,
    InternalServerError,
    InvalidEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalTable",
}));

export type DescribeGlobalTableSettingsError =
  | GlobalTableNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Describes Region-specific settings for a global table.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const describeGlobalTableSettings: API.OperationMethod<
  DescribeGlobalTableSettingsInput,
  DescribeGlobalTableSettingsOutput,
  DescribeGlobalTableSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGlobalTableSettingsInput,
  output: DescribeGlobalTableSettingsOutput,
  errors: [
    GlobalTableNotFoundException,
    InternalServerError,
    InvalidEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalTableSettings",
}));

export type DescribeImportError = ImportNotFoundException | CommonErrors;
/**
 * Represents the properties of the import.
 */
export const describeImport: API.OperationMethod<
  DescribeImportInput,
  DescribeImportOutput,
  DescribeImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeImportInput,
  output: DescribeImportOutput,
  errors: [ImportNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImport",
}));

export type DescribeKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the status of Kinesis streaming.
 */
export const describeKinesisStreamingDestination: API.OperationMethod<
  DescribeKinesisStreamingDestinationInput,
  DescribeKinesisStreamingDestinationOutput,
  DescribeKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeKinesisStreamingDestinationInput,
  output: DescribeKinesisStreamingDestinationOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKinesisStreamingDestination",
}));

export type DescribeLimitsError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Returns the current provisioned-capacity quotas for your Amazon Web Services account in
 * a Region, both for the Region as a whole and for any one DynamoDB table that you create
 * there.
 *
 * When you establish an Amazon Web Services account, the account has initial quotas on
 * the maximum read capacity units and write capacity units that you can provision across
 * all of your DynamoDB tables in a given Region. Also, there are per-table
 * quotas that apply when you create a table there. For more information, see Service,
 * Account, and Table Quotas page in the Amazon DynamoDB
 * Developer Guide.
 *
 * Although you can increase these quotas by filing a case at Amazon Web Services Support Center, obtaining the
 * increase is not instantaneous. The `DescribeLimits` action lets you write
 * code to compare the capacity you are currently using to those quotas imposed by your
 * account so that you have enough time to apply for an increase before you hit a
 * quota.
 *
 * For example, you could use one of the Amazon Web Services SDKs to do the
 * following:
 *
 * - Call `DescribeLimits` for a particular Region to obtain your
 * current account quotas on provisioned capacity there.
 *
 * - Create a variable to hold the aggregate read capacity units provisioned for
 * all your tables in that Region, and one to hold the aggregate write capacity
 * units. Zero them both.
 *
 * - Call `ListTables` to obtain a list of all your DynamoDB
 * tables.
 *
 * - For each table name listed by `ListTables`, do the
 * following:
 *
 * - Call `DescribeTable` with the table name.
 *
 * - Use the data returned by `DescribeTable` to add the read
 * capacity units and write capacity units provisioned for the table itself
 * to your variables.
 *
 * - If the table has one or more global secondary indexes (GSIs), loop
 * over these GSIs and add their provisioned capacity values to your
 * variables as well.
 *
 * - Report the account quotas for that Region returned by
 * `DescribeLimits`, along with the total current provisioned
 * capacity levels you have calculated.
 *
 * This will let you see whether you are getting close to your account-level
 * quotas.
 *
 * The per-table quotas apply only when you are creating a new table. They restrict the
 * sum of the provisioned capacity of the new table itself and all its global secondary
 * indexes.
 *
 * For existing tables and their GSIs, DynamoDB doesn't let you increase provisioned
 * capacity extremely rapidly, but the only quota that applies is that the aggregate
 * provisioned capacity over all your tables and GSIs cannot exceed either of the
 * per-account quotas.
 *
 * `DescribeLimits` should only be called periodically. You can expect
 * throttling errors if you call it more than once in a minute.
 *
 * The `DescribeLimits` Request element has no content.
 */
export const describeLimits: API.OperationMethod<
  DescribeLimitsInput,
  DescribeLimitsOutput,
  DescribeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLimitsInput,
  output: DescribeLimitsOutput,
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLimits",
}));

export type DescribeTableError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the table, including the current status of the table, when
 * it was created, the primary key schema, and any indexes on the table.
 *
 * If you issue a `DescribeTable` request immediately after a
 * `CreateTable` request, DynamoDB might return a
 * `ResourceNotFoundException`. This is because
 * `DescribeTable` uses an eventually consistent query, and the metadata
 * for your table might not be available at that moment. Wait for a few seconds, and
 * then try the `DescribeTable` request again.
 */
export const describeTable: API.OperationMethod<
  DescribeTableInput,
  DescribeTableOutput,
  DescribeTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTableInput,
  output: DescribeTableOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTable",
}));

export type DescribeTableReplicaAutoScalingError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes auto scaling settings across replicas of the global table at once.
 */
export const describeTableReplicaAutoScaling: API.OperationMethod<
  DescribeTableReplicaAutoScalingInput,
  DescribeTableReplicaAutoScalingOutput,
  DescribeTableReplicaAutoScalingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTableReplicaAutoScalingInput,
  output: DescribeTableReplicaAutoScalingOutput,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableReplicaAutoScaling",
}));

export type DescribeTimeToLiveError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gives a description of the Time to Live (TTL) status on the specified table.
 */
export const describeTimeToLive: API.OperationMethod<
  DescribeTimeToLiveInput,
  DescribeTimeToLiveOutput,
  DescribeTimeToLiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTimeToLiveInput,
  output: DescribeTimeToLiveOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTimeToLive",
}));

export type DisableKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops replication from the DynamoDB table to the Kinesis data stream. This
 * is done without deleting either of the resources.
 */
export const disableKinesisStreamingDestination: API.OperationMethod<
  KinesisStreamingDestinationInput,
  KinesisStreamingDestinationOutput,
  DisableKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: KinesisStreamingDestinationInput,
  output: KinesisStreamingDestinationOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableKinesisStreamingDestination",
}));

export type EnableKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts table data replication to the specified Kinesis data stream at a timestamp
 * chosen during the enable workflow. If this operation doesn't return results immediately,
 * use DescribeKinesisStreamingDestination to check if streaming to the Kinesis data stream
 * is ACTIVE.
 */
export const enableKinesisStreamingDestination: API.OperationMethod<
  KinesisStreamingDestinationInput,
  KinesisStreamingDestinationOutput,
  EnableKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: KinesisStreamingDestinationInput,
  output: KinesisStreamingDestinationOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableKinesisStreamingDestination",
}));

export type ExecuteStatementError =
  | ConditionalCheckFailedException
  | DuplicateItemException
  | InternalServerError
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * This operation allows you to perform reads and singleton writes on data stored in
 * DynamoDB, using PartiQL.
 *
 * For PartiQL reads (`SELECT` statement), if the total number of processed
 * items exceeds the maximum dataset size limit of 1 MB, the read stops and results are
 * returned to the user as a `LastEvaluatedKey` value to continue the read in a
 * subsequent operation. If the filter criteria in `WHERE` clause does not match
 * any data, the read will return an empty result set.
 *
 * A single `SELECT` statement response can return up to the maximum number of
 * items (if using the Limit parameter) or a maximum of 1 MB of data (and then apply any
 * filtering to the results using `WHERE` clause). If
 * `LastEvaluatedKey` is present in the response, you need to paginate the
 * result set. If `NextToken` is present, you need to paginate the result set
 * and include `NextToken`.
 */
export const executeStatement: API.OperationMethod<
  ExecuteStatementInput,
  ExecuteStatementOutput,
  ExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteStatementInput,
  output: ExecuteStatementOutput,
  errors: [
    ConditionalCheckFailedException,
    DuplicateItemException,
    InternalServerError,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStatement",
}));

export type ExecuteTransactionError =
  | IdempotentParameterMismatchException
  | InternalServerError
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionCanceledException
  | TransactionInProgressException
  | CommonErrors;
/**
 * This operation allows you to perform transactional reads or writes on data stored in
 * DynamoDB, using PartiQL.
 *
 * The entire transaction must consist of either read statements or write statements,
 * you cannot mix both in one transaction. The EXISTS function is an exception and can
 * be used to check the condition of specific attributes of the item in a similar
 * manner to `ConditionCheck` in the TransactWriteItems API.
 */
export const executeTransaction: API.OperationMethod<
  ExecuteTransactionInput,
  ExecuteTransactionOutput,
  ExecuteTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteTransactionInput,
  output: ExecuteTransactionOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerError,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionCanceledException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteTransaction",
}));

export type ExportTableToPointInTimeError =
  | ExportConflictException
  | InternalServerError
  | InvalidExportTimeException
  | LimitExceededException
  | PointInTimeRecoveryUnavailableException
  | TableNotFoundException
  | CommonErrors;
/**
 * Exports table data to an S3 bucket. The table must have point in time recovery
 * enabled, and you can export data from any time within the point in time recovery
 * window.
 */
export const exportTableToPointInTime: API.OperationMethod<
  ExportTableToPointInTimeInput,
  ExportTableToPointInTimeOutput,
  ExportTableToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportTableToPointInTimeInput,
  output: ExportTableToPointInTimeOutput,
  errors: [
    ExportConflictException,
    InternalServerError,
    InvalidExportTimeException,
    LimitExceededException,
    PointInTimeRecoveryUnavailableException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportTableToPointInTime",
}));

export type GetItemError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `GetItem` operation returns a set of attributes for the item with the
 * given primary key. If there is no matching item, `GetItem` does not return
 * any data and there will be no `Item` element in the response.
 *
 * `GetItem` provides an eventually consistent read by default. If your
 * application requires a strongly consistent read, set `ConsistentRead` to
 * `true`. Although a strongly consistent read might take more time than an
 * eventually consistent read, it always returns the last updated value.
 */
export const getItem: API.OperationMethod<
  GetItemInput,
  GetItemOutput,
  GetItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetItemInput,
  output: GetItemOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetItem",
}));

export type GetResourcePolicyError =
  | InternalServerError
  | InvalidEndpointException
  | PolicyNotFoundException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the resource-based policy document attached to the resource, which can be a
 * table or stream, in JSON format.
 *
 * `GetResourcePolicy` follows an
 * *eventually consistent*
 * model. The following list
 * describes the outcomes when you issue the `GetResourcePolicy` request
 * immediately after issuing another request:
 *
 * - If you issue a `GetResourcePolicy` request immediately after a
 * `PutResourcePolicy` request, DynamoDB might return a
 * `PolicyNotFoundException`.
 *
 * - If you issue a `GetResourcePolicy`request immediately after a
 * `DeleteResourcePolicy` request, DynamoDB might return
 * the policy that was present before the deletion request.
 *
 * - If you issue a `GetResourcePolicy` request immediately after a
 * `CreateTable` request, which includes a resource-based policy,
 * DynamoDB might return a `ResourceNotFoundException` or
 * a `PolicyNotFoundException`.
 *
 * Because `GetResourcePolicy` uses an eventually
 * consistent query, the metadata for your policy or table might not be
 * available at that moment. Wait for a few seconds, and then retry the
 * `GetResourcePolicy` request.
 *
 * After a `GetResourcePolicy` request returns a policy created using the
 * `PutResourcePolicy` request, the policy will be applied in the
 * authorization of requests to the resource. Because this process is eventually
 * consistent, it will take some time to apply the policy to all requests to a resource.
 * Policies that you attach while creating a table using the `CreateTable`
 * request will always be applied to all requests for that table.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyInput,
  output: GetResourcePolicyOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    PolicyNotFoundException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ImportTableError =
  | ImportConflictException
  | LimitExceededException
  | ResourceInUseException
  | CommonErrors;
/**
 * Imports table data from an S3 bucket.
 */
export const importTable: API.OperationMethod<
  ImportTableInput,
  ImportTableOutput,
  ImportTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportTableInput,
  output: ImportTableOutput,
  errors: [
    ImportConflictException,
    LimitExceededException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportTable",
}));

export type ListBackupsError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * List DynamoDB backups that are associated with an Amazon Web Services account and
 * weren't made with Amazon Web Services Backup. To list these backups for a given table,
 * specify `TableName`. `ListBackups` returns a paginated list of
 * results with at most 1 MB worth of items in a page. You can also specify a maximum
 * number of entries to be returned in a page.
 *
 * In the request, start time is inclusive, but end time is exclusive. Note that these
 * boundaries are for the time at which the original backup was requested.
 *
 * You can call `ListBackups` a maximum of five times per second.
 *
 * If you want to retrieve the complete list of backups made with Amazon Web Services
 * Backup, use the Amazon Web Services Backup
 * list API.
 */
export const listBackups: API.OperationMethod<
  ListBackupsInput,
  ListBackupsOutput,
  ListBackupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBackupsInput,
  output: ListBackupsOutput,
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBackups",
}));

export type ListContributorInsightsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of ContributorInsightsSummary for a table and all its global secondary
 * indexes.
 */
export const listContributorInsights: API.PaginatedOperationMethod<
  ListContributorInsightsInput,
  ListContributorInsightsOutput,
  ListContributorInsightsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContributorInsightsInput,
  output: ListContributorInsightsOutput,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContributorInsights",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExportsError =
  | InternalServerError
  | LimitExceededException
  | CommonErrors;
/**
 * Lists completed exports within the past 90 days, in reverse alphanumeric order of `ExportArn`.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsInput,
  ListExportsOutput,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportsInput,
  output: ListExportsOutput,
  errors: [InternalServerError, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGlobalTablesError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Lists all global tables that have a replica in the specified Region.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const listGlobalTables: API.OperationMethod<
  ListGlobalTablesInput,
  ListGlobalTablesOutput,
  ListGlobalTablesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGlobalTablesInput,
  output: ListGlobalTablesOutput,
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlobalTables",
}));

export type ListImportsError = LimitExceededException | CommonErrors;
/**
 * Lists completed imports within the past 90 days.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsInput,
  ListImportsOutput,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportsInput,
  output: ListImportsOutput,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTablesError =
  | InternalServerError
  | InvalidEndpointException
  | CommonErrors;
/**
 * Returns an array of table names associated with the current account and endpoint. The
 * output from `ListTables` is paginated, with each page returning a maximum of
 * 100 table names.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesInput,
  ListTablesOutput,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTablesInput,
  output: ListTablesOutput,
  errors: [InternalServerError, InvalidEndpointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "ExclusiveStartTableName",
    outputToken: "LastEvaluatedTableName",
    items: "TableNames",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsOfResourceError =
  | InternalServerError
  | InvalidEndpointException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List all tags on an Amazon DynamoDB resource. You can call ListTagsOfResource up to 10
 * times per second, per account.
 *
 * For an overview on tagging DynamoDB resources, see Tagging for DynamoDB
 * in the *Amazon DynamoDB Developer Guide*.
 */
export const listTagsOfResource: API.OperationMethod<
  ListTagsOfResourceInput,
  ListTagsOfResourceOutput,
  ListTagsOfResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsOfResourceInput,
  output: ListTagsOfResourceOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsOfResource",
}));

export type PutItemError =
  | ConditionalCheckFailedException
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * Creates a new item, or replaces an old item with a new item. If an item that has the
 * same primary key as the new item already exists in the specified table, the new item
 * completely replaces the existing item. You can perform a conditional put operation (add
 * a new item if one with the specified primary key doesn't exist), or replace an existing
 * item if it has certain attribute values. You can return the item's attribute values in
 * the same operation, using the `ReturnValues` parameter.
 *
 * When you add an item, the primary key attributes are the only required attributes.
 *
 * Empty String and Binary attribute values are allowed. Attribute values of type String
 * and Binary must have a length greater than zero if the attribute is used as a key
 * attribute for a table or index. Set type attributes cannot be empty.
 *
 * Invalid Requests with empty values will be rejected with a
 * `ValidationException` exception.
 *
 * To prevent a new item from replacing an existing item, use a conditional
 * expression that contains the `attribute_not_exists` function with the
 * name of the attribute being used as the partition key for the table. Since every
 * record must contain that attribute, the `attribute_not_exists` function
 * will only succeed if no matching item exists.
 *
 * To determine whether `PutItem` overwrote an existing item, use
 * `ReturnValues` set to `ALL_OLD`. If the response includes
 * the `Attributes` element, an existing item was overwritten.
 *
 * For more information about `PutItem`, see Working with
 * Items in the *Amazon DynamoDB Developer Guide*.
 */
export const putItem: API.OperationMethod<
  PutItemInput,
  PutItemOutput,
  PutItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutItemInput,
  output: PutItemOutput,
  errors: [
    ConditionalCheckFailedException,
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutItem",
}));

export type PutResourcePolicyError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | PolicyNotFoundException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based policy document to the resource, which can be a table or
 * stream. When you attach a resource-based policy using this API, the policy application
 * is
 * *eventually consistent*
 * .
 *
 * `PutResourcePolicy` is an idempotent operation; running it multiple times
 * on the same resource using the same policy document will return the same revision ID. If
 * you specify an `ExpectedRevisionId` that doesn't match the current policy's
 * `RevisionId`, the `PolicyNotFoundException` will be
 * returned.
 *
 * `PutResourcePolicy` is an asynchronous operation. If you issue a
 * `GetResourcePolicy` request immediately after a
 * `PutResourcePolicy` request, DynamoDB might return your
 * previous policy, if there was one, or return the
 * `PolicyNotFoundException`. This is because
 * `GetResourcePolicy` uses an eventually consistent query, and the
 * metadata for your policy or table might not be available at that moment. Wait for a
 * few seconds, and then try the `GetResourcePolicy` request again.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput,
  PutResourcePolicyOutput,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyInput,
  output: PutResourcePolicyOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    PolicyNotFoundException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type QueryError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * You must provide the name of the partition key attribute and a single value for that
 * attribute. `Query` returns all items with that partition key value.
 * Optionally, you can provide a sort key attribute and use a comparison operator to refine
 * the search results.
 *
 * Use the `KeyConditionExpression` parameter to provide a specific value for
 * the partition key. The `Query` operation will return all of the items from
 * the table or index with that partition key value. You can optionally narrow the scope of
 * the `Query` operation by specifying a sort key value and a comparison
 * operator in `KeyConditionExpression`. To further refine the
 * `Query` results, you can optionally provide a
 * `FilterExpression`. A `FilterExpression` determines which
 * items within the results should be returned to you. All of the other results are
 * discarded.
 *
 * A `Query` operation always returns a result set. If no matching items are
 * found, the result set will be empty. Queries that do not return results consume the
 * minimum number of read capacity units for that type of read operation.
 *
 * DynamoDB calculates the number of read capacity units consumed based on item
 * size, not on the amount of data that is returned to an application. The number of
 * capacity units consumed will be the same whether you request all of the attributes
 * (the default behavior) or just some of them (using a projection expression). The
 * number will also be the same whether or not you use a `FilterExpression`.
 *
 * `Query` results are always sorted by the sort key value. If the data type of
 * the sort key is Number, the results are returned in numeric order; otherwise, the
 * results are returned in order of UTF-8 bytes. By default, the sort order is ascending.
 * To reverse the order, set the `ScanIndexForward` parameter to false.
 *
 * A single `Query` operation will read up to the maximum number of items set
 * (if using the `Limit` parameter) or a maximum of 1 MB of data and then apply
 * any filtering to the results using `FilterExpression`. If
 * `LastEvaluatedKey` is present in the response, you will need to paginate
 * the result set. For more information, see Paginating
 * the Results in the *Amazon DynamoDB Developer Guide*.
 *
 * `FilterExpression` is applied after a `Query` finishes, but before
 * the results are returned. A `FilterExpression` cannot contain partition key
 * or sort key attributes. You need to specify those attributes in the
 * `KeyConditionExpression`.
 *
 * A `Query` operation can return an empty result set and a
 * `LastEvaluatedKey` if all the items read for the page of results are
 * filtered out.
 *
 * You can query a table, a local secondary index, or a global secondary index. For a
 * query on a table or on a local secondary index, you can set the
 * `ConsistentRead` parameter to `true` and obtain a strongly
 * consistent result. Global secondary indexes support eventually consistent reads only, so
 * do not specify `ConsistentRead` when querying a global secondary
 * index.
 */
export const query: API.PaginatedOperationMethod<
  QueryInput,
  QueryOutput,
  QueryError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: AttributeValue | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: QueryInput,
  output: QueryOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Query",
  pagination: {
    inputToken: "ExclusiveStartKey",
    outputToken: "LastEvaluatedKey",
    items: "Items",
    pageSize: "Limit",
  } as const,
})) as any;

export type RestoreTableFromBackupError =
  | BackupInUseException
  | BackupNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | TableAlreadyExistsException
  | TableInUseException
  | CommonErrors;
/**
 * Creates a new table from an existing backup. Any number of users can execute up to 50
 * concurrent restores (any type of restore) in a given account.
 *
 * You can call `RestoreTableFromBackup` at a maximum rate of 10 times per
 * second.
 *
 * You must manually set up the following on the restored table:
 *
 * - Auto scaling policies
 *
 * - IAM policies
 *
 * - Amazon CloudWatch metrics and alarms
 *
 * - Tags
 *
 * - Stream settings
 *
 * - Time to Live (TTL) settings
 */
export const restoreTableFromBackup: API.OperationMethod<
  RestoreTableFromBackupInput,
  RestoreTableFromBackupOutput,
  RestoreTableFromBackupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreTableFromBackupInput,
  output: RestoreTableFromBackupOutput,
  errors: [
    BackupInUseException,
    BackupNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    TableAlreadyExistsException,
    TableInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromBackup",
}));

export type RestoreTableToPointInTimeError =
  | InternalServerError
  | InvalidEndpointException
  | InvalidRestoreTimeException
  | LimitExceededException
  | PointInTimeRecoveryUnavailableException
  | TableAlreadyExistsException
  | TableInUseException
  | TableNotFoundException
  | CommonErrors;
/**
 * Restores the specified table to the specified point in time within
 * `EarliestRestorableDateTime` and `LatestRestorableDateTime`.
 * You can restore your table to any point in time in the last 35 days. You can set the
 * recovery period to any value between 1 and 35 days. Any number of users can execute up
 * to 50 concurrent restores (any type of restore) in a given account.
 *
 * When you restore using point in time recovery, DynamoDB restores your table data to
 * the state based on the selected date and time (day:hour:minute:second) to a new table.
 *
 * Along with data, the following are also included on the new restored table using point
 * in time recovery:
 *
 * - Global secondary indexes (GSIs)
 *
 * - Local secondary indexes (LSIs)
 *
 * - Provisioned read and write capacity
 *
 * - Encryption settings
 *
 * All these settings come from the current settings of the source table at
 * the time of restore.
 *
 * You must manually set up the following on the restored table:
 *
 * - Auto scaling policies
 *
 * - IAM policies
 *
 * - Amazon CloudWatch metrics and alarms
 *
 * - Tags
 *
 * - Stream settings
 *
 * - Time to Live (TTL) settings
 *
 * - Point in time recovery settings
 */
export const restoreTableToPointInTime: API.OperationMethod<
  RestoreTableToPointInTimeInput,
  RestoreTableToPointInTimeOutput,
  RestoreTableToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreTableToPointInTimeInput,
  output: RestoreTableToPointInTimeOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    InvalidRestoreTimeException,
    LimitExceededException,
    PointInTimeRecoveryUnavailableException,
    TableAlreadyExistsException,
    TableInUseException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableToPointInTime",
}));

export type ScanError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The `Scan` operation returns one or more items and item attributes by
 * accessing every item in a table or a secondary index. To have DynamoDB return fewer
 * items, you can provide a `FilterExpression` operation.
 *
 * If the total size of scanned items exceeds the maximum dataset size limit of 1 MB, the
 * scan completes and results are returned to the user. The `LastEvaluatedKey`
 * value is also returned and the requestor can use the `LastEvaluatedKey` to
 * continue the scan in a subsequent operation. Each scan response also includes number of
 * items that were scanned (ScannedCount) as part of the request. If using a
 * `FilterExpression`, a scan result can result in no items meeting the
 * criteria and the `Count` will result in zero. If you did not use a
 * `FilterExpression` in the scan request, then `Count` is the
 * same as `ScannedCount`.
 *
 * `Count` and `ScannedCount` only return the count of items
 * specific to a single scan request and, unless the table is less than 1MB, do not
 * represent the total number of items in the table.
 *
 * A single `Scan` operation first reads up to the maximum number of items set
 * (if using the `Limit` parameter) or a maximum of 1 MB of data and then
 * applies any filtering to the results if a `FilterExpression` is provided. If
 * `LastEvaluatedKey` is present in the response, pagination is required to
 * complete the full table scan. For more information, see Paginating the
 * Results in the *Amazon DynamoDB Developer Guide*.
 *
 * `Scan` operations proceed sequentially; however, for faster performance on
 * a large table or secondary index, applications can request a parallel `Scan`
 * operation by providing the `Segment` and `TotalSegments`
 * parameters. For more information, see Parallel
 * Scan in the *Amazon DynamoDB Developer Guide*.
 *
 * By default, a `Scan` uses eventually consistent reads when accessing the
 * items in a table. Therefore, the results from an eventually consistent `Scan`
 * may not include the latest item changes at the time the scan iterates through each item
 * in the table. If you require a strongly consistent read of each item as the scan
 * iterates through the items in the table, you can set the `ConsistentRead`
 * parameter to true. Strong consistency only relates to the consistency of the read at the
 * item level.
 *
 * DynamoDB does not provide snapshot isolation for a scan operation when the
 * `ConsistentRead` parameter is set to true. Thus, a DynamoDB scan
 * operation does not guarantee that all reads in a scan see a consistent snapshot of
 * the table when the scan operation was requested.
 */
export const scan: API.PaginatedOperationMethod<
  ScanInput,
  ScanOutput,
  ScanError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: AttributeValue | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ScanInput,
  output: ScanOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Scan",
  pagination: {
    inputToken: "ExclusiveStartKey",
    outputToken: "LastEvaluatedKey",
    items: "Items",
    pageSize: "Limit",
  } as const,
})) as any;

export type SearchVectorsError =
  | InternalServerError
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Performs a vector similarity search on a vector index associated with an Amazon
 * DynamoDB table, and returns the most similar items sorted by similarity score
 * based on the distance function configured for the index.
 *
 * Score interpretation depends on the distance function:
 *
 * - `COSINE` - Returns the items with the k
 * smallest scores. Scores range from 0 (identical) to 2 (opposite).
 * Lower scores indicate higher similarity.
 *
 * - `EUCLIDEAN` - Returns the items with the k
 * smallest scores. Scores represent the Euclidean distance between
 * vectors. Lower scores indicate higher similarity.
 *
 * - `DOT_PRODUCT` - Returns the items with the k
 * highest scores. Higher scores indicate higher similarity.
 */
export const searchVectors: API.OperationMethod<
  SearchVectorsInput,
  SearchVectorsOutput,
  SearchVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchVectorsInput,
  output: SearchVectorsOutput,
  errors: [
    InternalServerError,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchVectors",
}));

export type TagResourceError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associate a set of tags with an Amazon DynamoDB resource. You can then activate these
 * user-defined tags so that they appear on the Billing and Cost Management console for
 * cost allocation tracking. You can call TagResource up to five times per second, per
 * account.
 *
 * - `TagResource` is an asynchronous operation. If you issue a ListTagsOfResource request immediately after a
 * `TagResource` request, DynamoDB might return your
 * previous tag set, if there was one, or an empty tag set. This is because
 * `ListTagsOfResource` uses an eventually consistent query, and the
 * metadata for your tags or table might not be available at that moment. Wait for
 * a few seconds, and then try the `ListTagsOfResource` request
 * again.
 *
 * - The application or removal of tags using `TagResource` and
 * `UntagResource` APIs is eventually consistent.
 * `ListTagsOfResource` API will only reflect the changes after a
 * few seconds.
 *
 * For an overview on tagging DynamoDB resources, see Tagging for DynamoDB
 * in the *Amazon DynamoDB Developer Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TransactGetItemsError =
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionCanceledException
  | CommonErrors;
/**
 * `TransactGetItems` is a synchronous operation that atomically retrieves
 * multiple items from one or more tables (but not from indexes) in a single account and
 * Region. A `TransactGetItems` call can contain up to 100
 * `TransactGetItem` objects, each of which contains a `Get`
 * structure that specifies an item to retrieve from a table in the account and Region. A
 * call to `TransactGetItems` cannot retrieve items from tables in more than one
 * Amazon Web Services account or Region. The aggregate size of the items in the
 * transaction cannot exceed 4 MB.
 *
 * DynamoDB rejects the entire `TransactGetItems` request if any of
 * the following is true:
 *
 * - A conflicting operation is in the process of updating an item to be
 * read.
 *
 * - There is insufficient provisioned capacity for the transaction to be
 * completed.
 *
 * - There is a user error, such as an invalid data format.
 *
 * - The aggregate size of the items in the transaction exceeded 4 MB.
 */
export const transactGetItems: API.OperationMethod<
  TransactGetItemsInput,
  TransactGetItemsOutput,
  TransactGetItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TransactGetItemsInput,
  output: TransactGetItemsOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionCanceledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransactGetItems",
}));

export type TransactWriteItemsError =
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidEndpointException
  | ProvisionedThroughputExceededException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionCanceledException
  | TransactionInProgressException
  | CommonErrors;
/**
 * `TransactWriteItems` is a synchronous write operation that groups up to 100
 * action requests. These actions can target items in different tables, but not in
 * different Amazon Web Services accounts or Regions, and no two actions can target the same
 * item. For example, you cannot both `ConditionCheck` and `Update`
 * the same item. The aggregate size of the items in the transaction cannot exceed 4
 * MB.
 *
 * The actions are completed atomically so that either all of them succeed, or all of
 * them fail. They are defined by the following objects:
 *
 * - `Put`  —   Initiates a `PutItem`
 * operation to write a new item. This structure specifies the primary key of the
 * item to be written, the name of the table to write it in, an optional condition
 * expression that must be satisfied for the write to succeed, a list of the item's
 * attributes, and a field indicating whether to retrieve the item's attributes if
 * the condition is not met.
 *
 * - `Update`  —   Initiates an `UpdateItem`
 * operation to update an existing item. This structure specifies the primary key
 * of the item to be updated, the name of the table where it resides, an optional
 * condition expression that must be satisfied for the update to succeed, an
 * expression that defines one or more attributes to be updated, and a field
 * indicating whether to retrieve the item's attributes if the condition is not
 * met.
 *
 * - `Delete`  —   Initiates a `DeleteItem`
 * operation to delete an existing item. This structure specifies the primary key
 * of the item to be deleted, the name of the table where it resides, an optional
 * condition expression that must be satisfied for the deletion to succeed, and a
 * field indicating whether to retrieve the item's attributes if the condition is
 * not met.
 *
 * - `ConditionCheck`  —   Applies a condition to an item
 * that is not being modified by the transaction. This structure specifies the
 * primary key of the item to be checked, the name of the table where it resides, a
 * condition expression that must be satisfied for the transaction to succeed, and
 * a field indicating whether to retrieve the item's attributes if the condition is
 * not met.
 *
 * DynamoDB rejects the entire `TransactWriteItems` request if any of the
 * following is true:
 *
 * - A condition in one of the condition expressions is not met.
 *
 * - An ongoing operation is in the process of updating the same item.
 *
 * - There is insufficient provisioned capacity for the transaction to be
 * completed.
 *
 * - An item size becomes too large (bigger than 400 KB), a local secondary index
 * (LSI) becomes too large, or a similar validation error occurs because of changes
 * made by the transaction.
 *
 * - The aggregate size of the items in the transaction exceeds 4 MB.
 *
 * - There is a user error, such as an invalid data format.
 */
export const transactWriteItems: API.OperationMethod<
  TransactWriteItemsInput,
  TransactWriteItemsOutput,
  TransactWriteItemsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TransactWriteItemsInput,
  output: TransactWriteItemsOutput,
  errors: [
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidEndpointException,
    ProvisionedThroughputExceededException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionCanceledException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransactWriteItems",
}));

export type UntagResourceError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the association of tags from an Amazon DynamoDB resource. You can call
 * `UntagResource` up to five times per second, per account.
 *
 * - `UntagResource` is an asynchronous operation. If you issue a ListTagsOfResource request immediately after an
 * `UntagResource` request, DynamoDB might return your
 * previous tag set, if there was one, or an empty tag set. This is because
 * `ListTagsOfResource` uses an eventually consistent query, and the
 * metadata for your tags or table might not be available at that moment. Wait for
 * a few seconds, and then try the `ListTagsOfResource` request
 * again.
 *
 * - The application or removal of tags using `TagResource` and
 * `UntagResource` APIs is eventually consistent.
 * `ListTagsOfResource` API will only reflect the changes after a
 * few seconds.
 *
 * For an overview on tagging DynamoDB resources, see Tagging for DynamoDB
 * in the *Amazon DynamoDB Developer Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateContinuousBackupsError =
  | ContinuousBackupsUnavailableException
  | InternalServerError
  | InvalidEndpointException
  | TableNotFoundException
  | CommonErrors;
/**
 * `UpdateContinuousBackups` enables or disables point in time recovery for
 * the specified table. A successful `UpdateContinuousBackups` call returns the
 * current `ContinuousBackupsDescription`. Continuous backups are
 * `ENABLED` on all tables at table creation. If point in time recovery is
 * enabled, `PointInTimeRecoveryStatus` will be set to ENABLED.
 *
 * Once continuous backups and point in time recovery are enabled, you can restore to
 * any point in time within `EarliestRestorableDateTime` and
 * `LatestRestorableDateTime`.
 *
 * `LatestRestorableDateTime` is typically 5 minutes before the current time.
 * You can restore your table to any point in time in the last 35 days. You can set the
 * `RecoveryPeriodInDays` to any value between 1 and 35 days.
 */
export const updateContinuousBackups: API.OperationMethod<
  UpdateContinuousBackupsInput,
  UpdateContinuousBackupsOutput,
  UpdateContinuousBackupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContinuousBackupsInput,
  output: UpdateContinuousBackupsOutput,
  errors: [
    ContinuousBackupsUnavailableException,
    InternalServerError,
    InvalidEndpointException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContinuousBackups",
}));

export type UpdateContributorInsightsError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the status for contributor insights for a specific table or index. CloudWatch
 * Contributor Insights for DynamoDB graphs display the partition key and (if applicable)
 * sort key of frequently accessed items and frequently throttled items in plaintext. If
 * you require the use of Amazon Web Services Key Management Service (KMS) to encrypt this
 * table’s partition key and sort key data with an Amazon Web Services managed key or
 * customer managed key, you should not enable CloudWatch Contributor Insights for DynamoDB
 * for this table.
 */
export const updateContributorInsights: API.OperationMethod<
  UpdateContributorInsightsInput,
  UpdateContributorInsightsOutput,
  UpdateContributorInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContributorInsightsInput,
  output: UpdateContributorInsightsOutput,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContributorInsights",
}));

export type UpdateGlobalTableError =
  | GlobalTableNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | ReplicaAlreadyExistsException
  | ReplicaNotFoundException
  | TableNotFoundException
  | CommonErrors;
/**
 * Adds or removes replicas in the specified global table. The global table must already
 * exist to be able to use this operation. Any replica to be added must be empty, have the
 * same name as the global table, have the same key schema, have DynamoDB Streams enabled,
 * and have the same provisioned and maximum write capacity units.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 *
 * If you are using global tables Version
 * 2019.11.21 (Current) you can use UpdateTable instead.
 *
 * Although you can use `UpdateGlobalTable` to add replicas and remove
 * replicas in a single request, for simplicity we recommend that you issue separate
 * requests for adding or removing replicas.
 *
 * If global secondary indexes are specified, then the following conditions must also be
 * met:
 *
 * - The global secondary indexes must have the same name.
 *
 * - The global secondary indexes must have the same hash key and sort key (if
 * present).
 *
 * - The global secondary indexes must have the same provisioned and maximum write
 * capacity units.
 */
export const updateGlobalTable: API.OperationMethod<
  UpdateGlobalTableInput,
  UpdateGlobalTableOutput,
  UpdateGlobalTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlobalTableInput,
  output: UpdateGlobalTableOutput,
  errors: [
    GlobalTableNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    ReplicaAlreadyExistsException,
    ReplicaNotFoundException,
    TableNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalTable",
}));

export type UpdateGlobalTableSettingsError =
  | GlobalTableNotFoundException
  | IndexNotFoundException
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ReplicaNotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Updates settings for a global table.
 *
 * This documentation is for version 2017.11.29 (Legacy) of global tables, which should be avoided for new global tables. Customers should use Global Tables version 2019.11.21 (Current) when possible, because it provides greater flexibility, higher efficiency, and consumes less write capacity than 2017.11.29 (Legacy).
 *
 * To determine which version you're using, see Determining the global table version you are using. To update existing global tables from version 2017.11.29 (Legacy) to version 2019.11.21 (Current), see Upgrading global tables.
 */
export const updateGlobalTableSettings: API.OperationMethod<
  UpdateGlobalTableSettingsInput,
  UpdateGlobalTableSettingsOutput,
  UpdateGlobalTableSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlobalTableSettingsInput,
  output: UpdateGlobalTableSettingsOutput,
  errors: [
    GlobalTableNotFoundException,
    IndexNotFoundException,
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ReplicaNotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalTableSettings",
}));

export type UpdateItemError =
  | ConditionalCheckFailedException
  | InternalServerError
  | InvalidEndpointException
  | ItemCollectionSizeLimitExceededException
  | ProvisionedThroughputExceededException
  | ReplicatedWriteConflictException
  | RequestLimitExceeded
  | ResourceNotFoundException
  | ThrottlingException
  | TransactionConflictException
  | CommonErrors;
/**
 * Edits an existing item's attributes, or adds a new item to the table if it does not
 * already exist. You can put, delete, or add attribute values. You can also perform a
 * conditional update on an existing item (insert a new attribute name-value pair if it
 * doesn't exist, or replace an existing name-value pair if it has certain expected
 * attribute values).
 *
 * You can also return the item's attribute values in the same `UpdateItem`
 * operation using the `ReturnValues` parameter.
 */
export const updateItem: API.OperationMethod<
  UpdateItemInput,
  UpdateItemOutput,
  UpdateItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateItemInput,
  output: UpdateItemOutput,
  errors: [
    ConditionalCheckFailedException,
    InternalServerError,
    InvalidEndpointException,
    ItemCollectionSizeLimitExceededException,
    ProvisionedThroughputExceededException,
    ReplicatedWriteConflictException,
    RequestLimitExceeded,
    ResourceNotFoundException,
    ThrottlingException,
    TransactionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateItem",
}));

export type UpdateKinesisStreamingDestinationError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The command to update the Kinesis stream destination.
 */
export const updateKinesisStreamingDestination: API.OperationMethod<
  UpdateKinesisStreamingDestinationInput,
  UpdateKinesisStreamingDestinationOutput,
  UpdateKinesisStreamingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateKinesisStreamingDestinationInput,
  output: UpdateKinesisStreamingDestinationOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKinesisStreamingDestination",
}));

export type UpdateTableError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the provisioned throughput settings, global secondary indexes, or DynamoDB
 * Streams settings for a given table.
 *
 * You can only perform one of the following operations at once:
 *
 * - Modify the provisioned throughput settings of the table.
 *
 * - Remove a global secondary index from the table.
 *
 * - Create a new global secondary index on the table. After the index begins
 * backfilling, you can use `UpdateTable` to perform other
 * operations.
 *
 * `UpdateTable` is an asynchronous operation; while it's executing, the table
 * status changes from `ACTIVE` to `UPDATING`. While it's
 * `UPDATING`, you can't issue another `UpdateTable` request.
 * When the table returns to the `ACTIVE` state, the `UpdateTable`
 * operation is complete.
 */
export const updateTable: API.OperationMethod<
  UpdateTableInput,
  UpdateTableOutput,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableInput,
  output: UpdateTableOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
}));

export type UpdateTableReplicaAutoScalingError =
  | InternalServerError
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates auto scaling settings on your global tables at once.
 */
export const updateTableReplicaAutoScaling: API.OperationMethod<
  UpdateTableReplicaAutoScalingInput,
  UpdateTableReplicaAutoScalingOutput,
  UpdateTableReplicaAutoScalingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableReplicaAutoScalingInput,
  output: UpdateTableReplicaAutoScalingOutput,
  errors: [
    InternalServerError,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableReplicaAutoScaling",
}));

export type UpdateTimeToLiveError =
  | InternalServerError
  | InvalidEndpointException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The `UpdateTimeToLive` method enables or disables Time to Live (TTL) for
 * the specified table. A successful `UpdateTimeToLive` call returns the current
 * `TimeToLiveSpecification`. It can take up to one hour for the change to
 * fully process. Any additional `UpdateTimeToLive` calls for the same table
 * during this one hour duration result in a `ValidationException`.
 *
 * TTL compares the current time in epoch time format to the time stored in the TTL
 * attribute of an item. If the epoch time value stored in the attribute is less than the
 * current time, the item is marked as expired and subsequently deleted.
 *
 * The epoch time format is the number of seconds elapsed since 12:00:00 AM January
 * 1, 1970 UTC.
 *
 * DynamoDB deletes expired items on a best-effort basis to ensure availability of
 * throughput for other data operations.
 *
 * DynamoDB typically deletes expired items within two days of expiration. The exact
 * duration within which an item gets deleted after expiration is specific to the
 * nature of the workload. Items that have expired and not been deleted will still show
 * up in reads, queries, and scans.
 *
 * As items are deleted, they are removed from any local secondary index and global
 * secondary index immediately in the same eventually consistent way as a standard delete
 * operation.
 *
 * For more information, see Time To Live in the
 * Amazon DynamoDB Developer Guide.
 */
export const updateTimeToLive: API.OperationMethod<
  UpdateTimeToLiveInput,
  UpdateTimeToLiveOutput,
  UpdateTimeToLiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTimeToLiveInput,
  output: UpdateTimeToLiveOutput,
  errors: [
    InternalServerError,
    InvalidEndpointException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTimeToLive",
}));
