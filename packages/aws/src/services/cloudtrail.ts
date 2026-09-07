import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://cloudtrail.amazonaws.com/doc/2013-11-01/");
const svc = T.AwsApiService({
  sdkId: "CloudTrail",
  serviceShapeName: "CloudTrail_20131101",
});
const auth = T.AwsAuthSigv4({ name: "cloudtrail" });
const ver = T.ServiceVersion("2013-11-01");
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
              `https://cloudtrail-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://cloudtrail.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://cloudtrail.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://cloudtrail-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudtrail.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudtrail.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(
      T.AwsQueryError({ code: "ResourceAccessDenied", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class AccountHasOngoingImportException
  extends /*@__PURE__*/ S.TaggedError<AccountHasOngoingImportException>()(
    "AccountHasOngoingImportException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AccountHasOngoingImport",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccountNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AccountNotFoundException>()(
    "AccountNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AccountNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccountNotRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountNotRegisteredException>()(
    "AccountNotRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AccountNotRegistered", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccountRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountRegisteredException>()(
    "AccountRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AccountRegistered", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CannotDelegateManagementAccountException
  extends /*@__PURE__*/ S.TaggedError<CannotDelegateManagementAccountException>()(
    "CannotDelegateManagementAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CannotDelegateManagementAccount",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ChannelAlreadyExistsException>()(
    "ChannelAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ChannelAlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ChannelARNInvalidException
  extends /*@__PURE__*/ S.TaggedError<ChannelARNInvalidException>()(
    "ChannelARNInvalidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ChannelARNInvalid", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelExistsForEDSException
  extends /*@__PURE__*/ S.TaggedError<ChannelExistsForEDSException>()(
    "ChannelExistsForEDSException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ChannelExistsForEDS", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelMaxLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ChannelMaxLimitExceededException>()(
    "ChannelMaxLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ChannelMaxLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChannelNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ChannelNotFoundException>()(
    "ChannelNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ChannelNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailAccessNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<CloudTrailAccessNotEnabledException>()(
    "CloudTrailAccessNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CloudTrailAccessNotEnabled",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailARNInvalidException
  extends /*@__PURE__*/ S.TaggedError<CloudTrailARNInvalidException>()(
    "CloudTrailARNInvalidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "CloudTrailARNInvalid", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailInvalidClientTokenIdException
  extends /*@__PURE__*/ S.TaggedError<CloudTrailInvalidClientTokenIdException>()(
    "CloudTrailInvalidClientTokenIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CloudTrailInvalidClientTokenId",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CloudTrailLakeOnboardingClosed
  extends /*@__PURE__*/ S.TaggedError<CloudTrailLakeOnboardingClosed>()(
    "CloudTrailLakeOnboardingClosed",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidParameterException",
      message: { includes: "no longer accepting new customers" },
    }),
  ).pipe(C.withBadRequestError) {}
export class CloudWatchLogsDeliveryUnavailableException
  extends /*@__PURE__*/ S.TaggedError<CloudWatchLogsDeliveryUnavailableException>()(
    "CloudWatchLogsDeliveryUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CloudWatchLogsDeliveryUnavailable",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConcurrentModification",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class DelegatedAdminAccountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DelegatedAdminAccountLimitExceededException>()(
    "DelegatedAdminAccountLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DelegatedAdminAccountLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreAlreadyExistsException>()(
    "EventDataStoreAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EventDataStoreARNInvalidException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreARNInvalidException>()(
    "EventDataStoreARNInvalidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreARNInvalid",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreFederationEnabledException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreFederationEnabledException>()(
    "EventDataStoreFederationEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreFederationEnabled",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreHasOngoingImportException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreHasOngoingImportException>()(
    "EventDataStoreHasOngoingImportException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreHasOngoingImport",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreMaxLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreMaxLimitExceededException>()(
    "EventDataStoreMaxLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreMaxLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreNotFoundException>()(
    "EventDataStoreNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDataStoreTerminationProtectedException
  extends /*@__PURE__*/ S.TaggedError<EventDataStoreTerminationProtectedException>()(
    "EventDataStoreTerminationProtectedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventDataStoreTerminationProtectedException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class GenerateResponseException
  extends /*@__PURE__*/ S.TaggedError<GenerateResponseException>()(
    "GenerateResponseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "GenerateResponse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ImportNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ImportNotFoundException>()(
    "ImportNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ImportNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InactiveEventDataStoreException
  extends /*@__PURE__*/ S.TaggedError<InactiveEventDataStoreException>()(
    "InactiveEventDataStoreException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InactiveEventDataStore",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InactiveQueryException
  extends /*@__PURE__*/ S.TaggedError<InactiveQueryException>()(
    "InactiveQueryException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InactiveQuery", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsightNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<InsightNotEnabledException>()(
    "InsightNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InsightNotEnabled", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientDependencyServiceAccessPermissionException
  extends /*@__PURE__*/ S.TaggedError<InsufficientDependencyServiceAccessPermissionException>()(
    "InsufficientDependencyServiceAccessPermissionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientDependencyServiceAccessPermission",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientEncryptionPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientEncryptionPolicyException>()(
    "InsufficientEncryptionPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientEncryptionPolicy",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientIAMAccessPermissionException
  extends /*@__PURE__*/ S.TaggedError<InsufficientIAMAccessPermissionException>()(
    "InsufficientIAMAccessPermissionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientIAMAccessPermission",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientS3BucketPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientS3BucketPolicyException>()(
    "InsufficientS3BucketPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientS3BucketPolicy",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InsufficientSnsTopicPolicyException
  extends /*@__PURE__*/ S.TaggedError<InsufficientSnsTopicPolicyException>()(
    "InsufficientSnsTopicPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientSnsTopicPolicy",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InvalidCloudWatchLogsLogGroupArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidCloudWatchLogsLogGroupArnException>()(
    "InvalidCloudWatchLogsLogGroupArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCloudWatchLogsLogGroupArn",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCloudWatchLogsRoleArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidCloudWatchLogsRoleArnException>()(
    "InvalidCloudWatchLogsRoleArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCloudWatchLogsRoleArn",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDateRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidDateRangeException>()(
    "InvalidDateRangeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidDateRange", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventCategoryException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventCategoryException>()(
    "InvalidEventCategoryException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidEventCategory", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventDataStoreCategoryException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventDataStoreCategoryException>()(
    "InvalidEventDataStoreCategoryException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidEventDataStoreCategory",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventDataStoreStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventDataStoreStatusException>()(
    "InvalidEventDataStoreStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidEventDataStoreStatus",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventSelectorsException
  extends /*@__PURE__*/ S.TaggedError<InvalidEventSelectorsException>()(
    "InvalidEventSelectorsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidEventSelectors", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidHomeRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidHomeRegionException>()(
    "InvalidHomeRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidHomeRegion", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidImportSourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidImportSourceException>()(
    "InvalidImportSourceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidImportSource", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidInsightSelectorsException
  extends /*@__PURE__*/ S.TaggedError<InvalidInsightSelectorsException>()(
    "InvalidInsightSelectorsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidInsightSelectors",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidKmsKeyIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidKmsKeyIdException>()(
    "InvalidKmsKeyIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidKmsKeyId", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidLookupAttributesException
  extends /*@__PURE__*/ S.TaggedError<InvalidLookupAttributesException>()(
    "InvalidLookupAttributesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidLookupAttributes",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxResultsException>()(
    "InvalidMaxResultsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidMaxResults", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidParameterCombinationError",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidParameter", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryStatementException
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryStatementException>()(
    "InvalidQueryStatementException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidQueryStatement", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryStatusException>()(
    "InvalidQueryStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidQueryStatus", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3BucketNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketNameException>()(
    "InvalidS3BucketNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidS3BucketName", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3PrefixException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3PrefixException>()(
    "InvalidS3PrefixException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidS3Prefix", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidSnsTopicNameException>()(
    "InvalidSnsTopicNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSnsTopicName", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceException>()(
    "InvalidSourceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSource", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagParameterException>()(
    "InvalidTagParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidTagParameter", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTimeRangeException>()(
    "InvalidTimeRangeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidTimeRange", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()(
    "InvalidTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidToken", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTrailNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidTrailNameException>()(
    "InvalidTrailNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidTrailName", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsException
  extends /*@__PURE__*/ S.TaggedError<KmsException>()(
    "KmsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "KmsException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsKeyDisabledException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyDisabledException>()(
    "KmsKeyDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "KmsKeyDisabled", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsKeyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyNotFoundException>()(
    "KmsKeyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "KmsKeyNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MaxConcurrentQueriesException
  extends /*@__PURE__*/ S.TaggedError<MaxConcurrentQueriesException>()(
    "MaxConcurrentQueriesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "MaxConcurrentQueries", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class MaximumNumberOfTrailsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumNumberOfTrailsExceededException>()(
    "MaximumNumberOfTrailsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "MaximumNumberOfTrailsExceeded",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class NoManagementAccountSLRExistsException
  extends /*@__PURE__*/ S.TaggedError<NoManagementAccountSLRExistsException>()(
    "NoManagementAccountSLRExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NoManagementAccountSLRExists",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class NotOrganizationManagementAccountException
  extends /*@__PURE__*/ S.TaggedError<NotOrganizationManagementAccountException>()(
    "NotOrganizationManagementAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NotOrganizationManagementAccount",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class NotOrganizationMasterAccountException
  extends /*@__PURE__*/ S.TaggedError<NotOrganizationMasterAccountException>()(
    "NotOrganizationMasterAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NotOrganizationMasterAccount",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "OperationNotPermitted", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotInAllFeaturesModeException>()(
    "OrganizationNotInAllFeaturesModeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "OrganizationNotInAllFeaturesMode",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OrganizationsNotInUseException
  extends /*@__PURE__*/ S.TaggedError<OrganizationsNotInUseException>()(
    "OrganizationsNotInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "OrganizationsNotInUse", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class QueryIdNotFoundException
  extends /*@__PURE__*/ S.TaggedError<QueryIdNotFoundException>()(
    "QueryIdNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "QueryIdNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceARNNotValidException
  extends /*@__PURE__*/ S.TaggedError<ResourceARNNotValidException>()(
    "ResourceARNNotValidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceARNNotValid", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotFoundException>()(
    "ResourcePolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourcePolicyNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourcePolicyNotValidException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotValidException>()(
    "ResourcePolicyNotValidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourcePolicyNotValid",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceTypeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ResourceTypeNotSupportedException>()(
    "ResourceTypeNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceTypeNotSupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class S3BucketDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<S3BucketDoesNotExistException>()(
    "S3BucketDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "S3BucketDoesNotExist", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ServiceQuotaExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagsLimitExceededException>()(
    "TagsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TagsLimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ThrottlingException", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class TrailAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TrailAlreadyExistsException>()(
    "TrailAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TrailAlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class TrailNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TrailNotFoundException>()(
    "TrailNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TrailNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrailNotProvidedException
  extends /*@__PURE__*/ S.TaggedError<TrailNotProvidedException>()(
    "TrailNotProvidedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TrailNotProvided", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UnsupportedOperation", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagsList = Tag[];
export const TagsList = /*@__PURE__*/ S.Array(Tag);
export interface AddTagsRequest {
  ResourceId: string;
  TagsList: Tag[];
}
export const AddTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagsList: TagsList }).pipe(
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
).annotate({ identifier: "AddTagsRequest" }) as any as S.Schema<AddTagsRequest>;
export interface AddTagsResponse {}
export const AddTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddTagsResponse",
}) as any as S.Schema<AddTagsResponse>;
export type EventDataStoreArn = string;
export type UUID = string;
export type AccountId = string;
export interface CancelQueryRequest {
  EventDataStore?: string;
  QueryId: string;
  EventDataStoreOwnerAccountId?: string;
}
export const CancelQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStore: S.optional(S.String),
    QueryId: S.String,
    EventDataStoreOwnerAccountId: S.optional(S.String),
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
  identifier: "CancelQueryRequest",
}) as any as S.Schema<CancelQueryRequest>;
export type QueryStatus =
  | "QUEUED"
  | "RUNNING"
  | "FINISHED"
  | "FAILED"
  | "CANCELLED"
  | "TIMED_OUT"
  | (string & {});
export const QueryStatus = /*@__PURE__*/ S.String;

export interface CancelQueryResponse {
  QueryId: string;
  QueryStatus: QueryStatus;
  EventDataStoreOwnerAccountId?: string;
}
export const CancelQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.String,
    QueryStatus: QueryStatus,
    EventDataStoreOwnerAccountId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CancelQueryResponse",
}) as any as S.Schema<CancelQueryResponse>;
export type ChannelName = string;
export type Source = string;
export type DestinationType =
  | "EVENT_DATA_STORE"
  | "AWS_SERVICE"
  | (string & {});
export const DestinationType = /*@__PURE__*/ S.String;

export type Location = string;
export interface Destination {
  Type: DestinationType;
  Location: string;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: DestinationType, Location: S.String }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type Destinations = Destination[];
export const Destinations = /*@__PURE__*/ S.Array(Destination);
export interface CreateChannelRequest {
  Name: string;
  Source: string;
  Destinations: Destination[];
  Tags?: Tag[];
}
export const CreateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Source: S.String,
    Destinations: Destinations,
    Tags: S.optional(TagsList),
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
  identifier: "CreateChannelRequest",
}) as any as S.Schema<CreateChannelRequest>;
export type ChannelArn = string;
export interface CreateChannelResponse {
  ChannelArn?: string;
  Name?: string;
  Source?: string;
  Destinations?: Destination[];
  Tags?: Tag[];
}
export const CreateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelArn: S.optional(S.String),
    Name: S.optional(S.String),
    Source: S.optional(S.String),
    Destinations: S.optional(Destinations),
    Tags: S.optional(TagsList),
  }).pipe(ns),
).annotate({
  identifier: "CreateChannelResponse",
}) as any as S.Schema<CreateChannelResponse>;
export type DashboardName = string;
export type RefreshScheduleFrequencyUnit = "HOURS" | "DAYS" | (string & {});
export const RefreshScheduleFrequencyUnit = /*@__PURE__*/ S.String;

export type RefreshScheduleFrequencyValue = number;
export interface RefreshScheduleFrequency {
  Unit?: RefreshScheduleFrequencyUnit;
  Value?: number;
}
export const RefreshScheduleFrequency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Unit: S.optional(RefreshScheduleFrequencyUnit),
    Value: S.optional(S.Number),
  }),
).annotate({
  identifier: "RefreshScheduleFrequency",
}) as any as S.Schema<RefreshScheduleFrequency>;
export type RefreshScheduleStatus = "ENABLED" | "DISABLED" | (string & {});
export const RefreshScheduleStatus = /*@__PURE__*/ S.String;

export type TimeOfDay = string;
export interface RefreshSchedule {
  Frequency?: RefreshScheduleFrequency;
  Status?: RefreshScheduleStatus;
  TimeOfDay?: string;
}
export const RefreshSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Frequency: S.optional(RefreshScheduleFrequency),
    Status: S.optional(RefreshScheduleStatus),
    TimeOfDay: S.optional(S.String),
  }),
).annotate({
  identifier: "RefreshSchedule",
}) as any as S.Schema<RefreshSchedule>;
export type TerminationProtectionEnabled = boolean;
export type QueryStatement = string;
export type QueryParameter = string;
export type QueryParameters = string[];
export const QueryParameters = /*@__PURE__*/ S.Array(S.String);
export type ViewPropertiesKey = string;
export type ViewPropertiesValue = string;
export type ViewPropertiesMap = { [key: string]: string | undefined };
export const ViewPropertiesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RequestWidget {
  QueryStatement: string;
  QueryParameters?: string[];
  ViewProperties: { [key: string]: string | undefined };
}
export const RequestWidget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryStatement: S.String,
    QueryParameters: S.optional(QueryParameters),
    ViewProperties: ViewPropertiesMap,
  }),
).annotate({ identifier: "RequestWidget" }) as any as S.Schema<RequestWidget>;
export type RequestWidgetList = RequestWidget[];
export const RequestWidgetList = /*@__PURE__*/ S.Array(RequestWidget);
export interface CreateDashboardRequest {
  Name: string;
  RefreshSchedule?: RefreshSchedule;
  TagsList?: Tag[];
  TerminationProtectionEnabled?: boolean;
  Widgets?: RequestWidget[];
}
export const CreateDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    RefreshSchedule: S.optional(RefreshSchedule),
    TagsList: S.optional(TagsList),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    Widgets: S.optional(RequestWidgetList),
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
  identifier: "CreateDashboardRequest",
}) as any as S.Schema<CreateDashboardRequest>;
export type DashboardArn = string;
export type DashboardType = "MANAGED" | "CUSTOM" | (string & {});
export const DashboardType = /*@__PURE__*/ S.String;

export type QueryAlias = string;
export interface Widget {
  QueryAlias?: string;
  QueryStatement?: string;
  QueryParameters?: string[];
  ViewProperties?: { [key: string]: string | undefined };
}
export const Widget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryAlias: S.optional(S.String),
    QueryStatement: S.optional(S.String),
    QueryParameters: S.optional(QueryParameters),
    ViewProperties: S.optional(ViewPropertiesMap),
  }),
).annotate({ identifier: "Widget" }) as any as S.Schema<Widget>;
export type WidgetList = Widget[];
export const WidgetList = /*@__PURE__*/ S.Array(Widget);
export interface CreateDashboardResponse {
  DashboardArn?: string;
  Name?: string;
  Type?: DashboardType;
  Widgets?: Widget[];
  TagsList?: Tag[];
  RefreshSchedule?: RefreshSchedule;
  TerminationProtectionEnabled?: boolean;
}
export const CreateDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardArn: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(DashboardType),
    Widgets: S.optional(WidgetList),
    TagsList: S.optional(TagsList),
    RefreshSchedule: S.optional(RefreshSchedule),
    TerminationProtectionEnabled: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "CreateDashboardResponse",
}) as any as S.Schema<CreateDashboardResponse>;
export type EventDataStoreName = string;
export type SelectorName = string;
export type SelectorField = string;
export type OperatorValue = string;
export type Operator = string[];
export const Operator = /*@__PURE__*/ S.Array(S.String);
export interface AdvancedFieldSelector {
  Field: string;
  Equals?: string[];
  StartsWith?: string[];
  EndsWith?: string[];
  NotEquals?: string[];
  NotStartsWith?: string[];
  NotEndsWith?: string[];
}
export const AdvancedFieldSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Field: S.String,
    Equals: S.optional(Operator),
    StartsWith: S.optional(Operator),
    EndsWith: S.optional(Operator),
    NotEquals: S.optional(Operator),
    NotStartsWith: S.optional(Operator),
    NotEndsWith: S.optional(Operator),
  }),
).annotate({
  identifier: "AdvancedFieldSelector",
}) as any as S.Schema<AdvancedFieldSelector>;
export type AdvancedFieldSelectors = AdvancedFieldSelector[];
export const AdvancedFieldSelectors = /*@__PURE__*/ S.Array(
  AdvancedFieldSelector,
);
export interface AdvancedEventSelector {
  Name?: string;
  FieldSelectors: AdvancedFieldSelector[];
}
export const AdvancedEventSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    FieldSelectors: AdvancedFieldSelectors,
  }),
).annotate({
  identifier: "AdvancedEventSelector",
}) as any as S.Schema<AdvancedEventSelector>;
export type AdvancedEventSelectors = AdvancedEventSelector[];
export const AdvancedEventSelectors = /*@__PURE__*/ S.Array(
  AdvancedEventSelector,
);
export type RetentionPeriod = number;
export type EventDataStoreKmsKeyId = string;
export type BillingMode =
  | "EXTENDABLE_RETENTION_PRICING"
  | "FIXED_RETENTION_PRICING"
  | (string & {});
export const BillingMode = /*@__PURE__*/ S.String;

export interface CreateEventDataStoreRequest {
  Name: string;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  TagsList?: Tag[];
  KmsKeyId?: string;
  StartIngestion?: boolean;
  BillingMode?: BillingMode;
}
export const CreateEventDataStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    TagsList: S.optional(TagsList),
    KmsKeyId: S.optional(S.String),
    StartIngestion: S.optional(S.Boolean),
    BillingMode: S.optional(BillingMode),
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
  identifier: "CreateEventDataStoreRequest",
}) as any as S.Schema<CreateEventDataStoreRequest>;
export type EventDataStoreStatus =
  | "CREATED"
  | "ENABLED"
  | "PENDING_DELETION"
  | "STARTING_INGESTION"
  | "STOPPING_INGESTION"
  | "STOPPED_INGESTION"
  | (string & {});
export const EventDataStoreStatus = /*@__PURE__*/ S.String;

export interface CreateEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  TagsList?: Tag[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
}
export const CreateEventDataStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(EventDataStoreStatus),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    TagsList: S.optional(TagsList),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    KmsKeyId: S.optional(S.String),
    BillingMode: S.optional(BillingMode),
  }).pipe(ns),
).annotate({
  identifier: "CreateEventDataStoreResponse",
}) as any as S.Schema<CreateEventDataStoreResponse>;
export interface CreateTrailRequest {
  Name: string;
  S3BucketName: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  EnableLogFileValidation?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
  TagsList?: Tag[];
}
export const CreateTrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    S3BucketName: S.String,
    S3KeyPrefix: S.optional(S.String),
    SnsTopicName: S.optional(S.String),
    IncludeGlobalServiceEvents: S.optional(S.Boolean),
    IsMultiRegionTrail: S.optional(S.Boolean),
    EnableLogFileValidation: S.optional(S.Boolean),
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    CloudWatchLogsRoleArn: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    IsOrganizationTrail: S.optional(S.Boolean),
    TagsList: S.optional(TagsList),
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
  identifier: "CreateTrailRequest",
}) as any as S.Schema<CreateTrailRequest>;
export interface CreateTrailResponse {
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  SnsTopicARN?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  TrailARN?: string;
  LogFileValidationEnabled?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
}
export const CreateTrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    SnsTopicName: S.optional(S.String),
    SnsTopicARN: S.optional(S.String),
    IncludeGlobalServiceEvents: S.optional(S.Boolean),
    IsMultiRegionTrail: S.optional(S.Boolean),
    TrailARN: S.optional(S.String),
    LogFileValidationEnabled: S.optional(S.Boolean),
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    CloudWatchLogsRoleArn: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    IsOrganizationTrail: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "CreateTrailResponse",
}) as any as S.Schema<CreateTrailResponse>;
export interface DeleteChannelRequest {
  Channel: string;
}
export const DeleteChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Channel: S.String }).pipe(
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
  identifier: "DeleteChannelRequest",
}) as any as S.Schema<DeleteChannelRequest>;
export interface DeleteChannelResponse {}
export const DeleteChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteChannelResponse",
}) as any as S.Schema<DeleteChannelResponse>;
export interface DeleteDashboardRequest {
  DashboardId: string;
}
export const DeleteDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DashboardId: S.String }).pipe(
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
  identifier: "DeleteDashboardRequest",
}) as any as S.Schema<DeleteDashboardRequest>;
export interface DeleteDashboardResponse {}
export const DeleteDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDashboardResponse",
}) as any as S.Schema<DeleteDashboardResponse>;
export interface DeleteEventDataStoreRequest {
  EventDataStore: string;
}
export const DeleteEventDataStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String }).pipe(
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
  identifier: "DeleteEventDataStoreRequest",
}) as any as S.Schema<DeleteEventDataStoreRequest>;
export interface DeleteEventDataStoreResponse {}
export const DeleteEventDataStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEventDataStoreResponse",
}) as any as S.Schema<DeleteEventDataStoreResponse>;
export type ResourceArn = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
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
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteTrailRequest {
  Name: string;
}
export const DeleteTrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
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
  identifier: "DeleteTrailRequest",
}) as any as S.Schema<DeleteTrailRequest>;
export interface DeleteTrailResponse {}
export const DeleteTrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTrailResponse",
}) as any as S.Schema<DeleteTrailResponse>;
export interface DeregisterOrganizationDelegatedAdminRequest {
  DelegatedAdminAccountId: string;
}
export const DeregisterOrganizationDelegatedAdminRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DelegatedAdminAccountId: S.String }).pipe(
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
    identifier: "DeregisterOrganizationDelegatedAdminRequest",
  }) as any as S.Schema<DeregisterOrganizationDelegatedAdminRequest>;
export interface DeregisterOrganizationDelegatedAdminResponse {}
export const DeregisterOrganizationDelegatedAdminResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeregisterOrganizationDelegatedAdminResponse",
  }) as any as S.Schema<DeregisterOrganizationDelegatedAdminResponse>;
export type RefreshId = string;
export interface DescribeQueryRequest {
  EventDataStore?: string;
  QueryId?: string;
  QueryAlias?: string;
  RefreshId?: string;
  EventDataStoreOwnerAccountId?: string;
}
export const DescribeQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStore: S.optional(S.String),
    QueryId: S.optional(S.String),
    QueryAlias: S.optional(S.String),
    RefreshId: S.optional(S.String),
    EventDataStoreOwnerAccountId: S.optional(S.String),
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
  identifier: "DescribeQueryRequest",
}) as any as S.Schema<DescribeQueryRequest>;
export interface QueryStatisticsForDescribeQuery {
  EventsMatched?: number;
  EventsScanned?: number;
  BytesScanned?: number;
  ExecutionTimeInMillis?: number;
  CreationTime?: Date;
}
export const QueryStatisticsForDescribeQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventsMatched: S.optional(S.Number),
    EventsScanned: S.optional(S.Number),
    BytesScanned: S.optional(S.Number),
    ExecutionTimeInMillis: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "QueryStatisticsForDescribeQuery",
}) as any as S.Schema<QueryStatisticsForDescribeQuery>;
export type ErrorMessage = string;
export type DeliveryS3Uri = string;
export type DeliveryStatus =
  | "SUCCESS"
  | "FAILED"
  | "FAILED_SIGNING_FILE"
  | "PENDING"
  | "RESOURCE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "ACCESS_DENIED_SIGNING_FILE"
  | "CANCELLED"
  | "UNKNOWN"
  | (string & {});
export const DeliveryStatus = /*@__PURE__*/ S.String;

export type Prompt = string;
export interface DescribeQueryResponse {
  QueryId?: string;
  QueryString?: string;
  QueryStatus?: QueryStatus;
  QueryStatistics?: QueryStatisticsForDescribeQuery;
  ErrorMessage?: string;
  DeliveryS3Uri?: string;
  DeliveryStatus?: DeliveryStatus;
  Prompt?: string;
  EventDataStoreOwnerAccountId?: string;
}
export const DescribeQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.optional(S.String),
    QueryString: S.optional(S.String),
    QueryStatus: S.optional(QueryStatus),
    QueryStatistics: S.optional(QueryStatisticsForDescribeQuery),
    ErrorMessage: S.optional(S.String),
    DeliveryS3Uri: S.optional(S.String),
    DeliveryStatus: S.optional(DeliveryStatus),
    Prompt: S.optional(S.String),
    EventDataStoreOwnerAccountId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeQueryResponse",
}) as any as S.Schema<DescribeQueryResponse>;
export type TrailNameList = string[];
export const TrailNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeTrailsRequest {
  trailNameList?: string[];
  includeShadowTrails?: boolean;
}
export const DescribeTrailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trailNameList: S.optional(TrailNameList),
    includeShadowTrails: S.optional(S.Boolean),
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
  identifier: "DescribeTrailsRequest",
}) as any as S.Schema<DescribeTrailsRequest>;
export interface Trail {
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  SnsTopicARN?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  HomeRegion?: string;
  TrailARN?: string;
  LogFileValidationEnabled?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  HasCustomEventSelectors?: boolean;
  HasInsightSelectors?: boolean;
  IsOrganizationTrail?: boolean;
}
export const Trail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    SnsTopicName: S.optional(S.String),
    SnsTopicARN: S.optional(S.String),
    IncludeGlobalServiceEvents: S.optional(S.Boolean),
    IsMultiRegionTrail: S.optional(S.Boolean),
    HomeRegion: S.optional(S.String),
    TrailARN: S.optional(S.String),
    LogFileValidationEnabled: S.optional(S.Boolean),
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    CloudWatchLogsRoleArn: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    HasCustomEventSelectors: S.optional(S.Boolean),
    HasInsightSelectors: S.optional(S.Boolean),
    IsOrganizationTrail: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Trail" }) as any as S.Schema<Trail>;
export type TrailList = Trail[];
export const TrailList = /*@__PURE__*/ S.Array(Trail);
export interface DescribeTrailsResponse {
  trailList?: Trail[];
}
export const DescribeTrailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trailList: S.optional(TrailList) }).pipe(ns),
).annotate({
  identifier: "DescribeTrailsResponse",
}) as any as S.Schema<DescribeTrailsResponse>;
export interface DisableFederationRequest {
  EventDataStore: string;
}
export const DisableFederationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String }).pipe(
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
  identifier: "DisableFederationRequest",
}) as any as S.Schema<DisableFederationRequest>;
export type FederationStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | (string & {});
export const FederationStatus = /*@__PURE__*/ S.String;

export interface DisableFederationResponse {
  EventDataStoreArn?: string;
  FederationStatus?: FederationStatus;
}
export const DisableFederationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    FederationStatus: S.optional(FederationStatus),
  }).pipe(ns),
).annotate({
  identifier: "DisableFederationResponse",
}) as any as S.Schema<DisableFederationResponse>;
export type FederationRoleArn = string;
export interface EnableFederationRequest {
  EventDataStore: string;
  FederationRoleArn: string;
}
export const EnableFederationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String, FederationRoleArn: S.String }).pipe(
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
  identifier: "EnableFederationRequest",
}) as any as S.Schema<EnableFederationRequest>;
export interface EnableFederationResponse {
  EventDataStoreArn?: string;
  FederationStatus?: FederationStatus;
  FederationRoleArn?: string;
}
export const EnableFederationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    FederationStatus: S.optional(FederationStatus),
    FederationRoleArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EnableFederationResponse",
}) as any as S.Schema<EnableFederationResponse>;
export type EventDataStoreList = string[];
export const EventDataStoreList = /*@__PURE__*/ S.Array(S.String);
export interface GenerateQueryRequest {
  EventDataStores: string[];
  Prompt: string;
}
export const GenerateQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStores: EventDataStoreList, Prompt: S.String }).pipe(
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
  identifier: "GenerateQueryRequest",
}) as any as S.Schema<GenerateQueryRequest>;
export interface GenerateQueryResponse {
  QueryStatement?: string;
  QueryAlias?: string;
  EventDataStoreOwnerAccountId?: string;
}
export const GenerateQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryStatement: S.optional(S.String),
    QueryAlias: S.optional(S.String),
    EventDataStoreOwnerAccountId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GenerateQueryResponse",
}) as any as S.Schema<GenerateQueryResponse>;
export interface GetChannelRequest {
  Channel: string;
}
export const GetChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Channel: S.String }).pipe(
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
  identifier: "GetChannelRequest",
}) as any as S.Schema<GetChannelRequest>;
export interface SourceConfig {
  ApplyToAllRegions?: boolean;
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export const SourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplyToAllRegions: S.optional(S.Boolean),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
  }),
).annotate({ identifier: "SourceConfig" }) as any as S.Schema<SourceConfig>;
export interface IngestionStatus {
  LatestIngestionSuccessTime?: Date;
  LatestIngestionSuccessEventID?: string;
  LatestIngestionErrorCode?: string;
  LatestIngestionAttemptTime?: Date;
  LatestIngestionAttemptEventID?: string;
}
export const IngestionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LatestIngestionSuccessTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestIngestionSuccessEventID: S.optional(S.String),
    LatestIngestionErrorCode: S.optional(S.String),
    LatestIngestionAttemptTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestIngestionAttemptEventID: S.optional(S.String),
  }),
).annotate({
  identifier: "IngestionStatus",
}) as any as S.Schema<IngestionStatus>;
export interface GetChannelResponse {
  ChannelArn?: string;
  Name?: string;
  Source?: string;
  SourceConfig?: SourceConfig;
  Destinations?: Destination[];
  IngestionStatus?: IngestionStatus;
}
export const GetChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelArn: S.optional(S.String),
    Name: S.optional(S.String),
    Source: S.optional(S.String),
    SourceConfig: S.optional(SourceConfig),
    Destinations: S.optional(Destinations),
    IngestionStatus: S.optional(IngestionStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetChannelResponse",
}) as any as S.Schema<GetChannelResponse>;
export interface GetDashboardRequest {
  DashboardId: string;
}
export const GetDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DashboardId: S.String }).pipe(
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
  identifier: "GetDashboardRequest",
}) as any as S.Schema<GetDashboardRequest>;
export type DashboardStatus =
  | "CREATING"
  | "CREATED"
  | "UPDATING"
  | "UPDATED"
  | "DELETING"
  | (string & {});
export const DashboardStatus = /*@__PURE__*/ S.String;

export interface GetDashboardResponse {
  DashboardArn?: string;
  Type?: DashboardType;
  Status?: DashboardStatus;
  Widgets?: Widget[];
  RefreshSchedule?: RefreshSchedule;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  LastRefreshId?: string;
  LastRefreshFailureReason?: string;
  TerminationProtectionEnabled?: boolean;
}
export const GetDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardArn: S.optional(S.String),
    Type: S.optional(DashboardType),
    Status: S.optional(DashboardStatus),
    Widgets: S.optional(WidgetList),
    RefreshSchedule: S.optional(RefreshSchedule),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastRefreshId: S.optional(S.String),
    LastRefreshFailureReason: S.optional(S.String),
    TerminationProtectionEnabled: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "GetDashboardResponse",
}) as any as S.Schema<GetDashboardResponse>;
export interface GetEventConfigurationRequest {
  TrailName?: string;
  EventDataStore?: string;
}
export const GetEventConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailName: S.optional(S.String),
    EventDataStore: S.optional(S.String),
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
  identifier: "GetEventConfigurationRequest",
}) as any as S.Schema<GetEventConfigurationRequest>;
export type MaxEventSize = "Standard" | "Large" | (string & {});
export const MaxEventSize = /*@__PURE__*/ S.String;

export type Type = "TagContext" | "RequestContext" | (string & {});
export const Type = /*@__PURE__*/ S.String;

export type OperatorTargetListMember = string;
export type OperatorTargetList = string[];
export const OperatorTargetList = /*@__PURE__*/ S.Array(S.String);
export interface ContextKeySelector {
  Type: Type;
  Equals: string[];
}
export const ContextKeySelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: Type, Equals: OperatorTargetList }),
).annotate({
  identifier: "ContextKeySelector",
}) as any as S.Schema<ContextKeySelector>;
export type ContextKeySelectors = ContextKeySelector[];
export const ContextKeySelectors = /*@__PURE__*/ S.Array(ContextKeySelector);
export type Template =
  | "API_ACTIVITY"
  | "RESOURCE_ACCESS"
  | "USER_ACTIONS"
  | (string & {});
export const Template = /*@__PURE__*/ S.String;

export type Templates = Template[];
export const Templates = /*@__PURE__*/ S.Array(Template);
export type EventCategoryAggregation = "Data" | (string & {});
export const EventCategoryAggregation = /*@__PURE__*/ S.String;

export interface AggregationConfiguration {
  Templates: Template[];
  EventCategory: EventCategoryAggregation;
}
export const AggregationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Templates: Templates, EventCategory: EventCategoryAggregation }),
).annotate({
  identifier: "AggregationConfiguration",
}) as any as S.Schema<AggregationConfiguration>;
export type AggregationConfigurations = AggregationConfiguration[];
export const AggregationConfigurations = /*@__PURE__*/ S.Array(
  AggregationConfiguration,
);
export interface GetEventConfigurationResponse {
  TrailARN?: string;
  EventDataStoreArn?: string;
  MaxEventSize?: MaxEventSize;
  ContextKeySelectors?: ContextKeySelector[];
  AggregationConfigurations?: AggregationConfiguration[];
}
export const GetEventConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    EventDataStoreArn: S.optional(S.String),
    MaxEventSize: S.optional(MaxEventSize),
    ContextKeySelectors: S.optional(ContextKeySelectors),
    AggregationConfigurations: S.optional(AggregationConfigurations),
  }).pipe(ns),
).annotate({
  identifier: "GetEventConfigurationResponse",
}) as any as S.Schema<GetEventConfigurationResponse>;
export interface GetEventDataStoreRequest {
  EventDataStore: string;
}
export const GetEventDataStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String }).pipe(
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
  identifier: "GetEventDataStoreRequest",
}) as any as S.Schema<GetEventDataStoreRequest>;
export type PartitionKeyName = string;
export type PartitionKeyType = string;
export interface PartitionKey {
  Name: string;
  Type: string;
}
export const PartitionKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Type: S.String }),
).annotate({ identifier: "PartitionKey" }) as any as S.Schema<PartitionKey>;
export type PartitionKeyList = PartitionKey[];
export const PartitionKeyList = /*@__PURE__*/ S.Array(PartitionKey);
export interface GetEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
  FederationStatus?: FederationStatus;
  FederationRoleArn?: string;
  PartitionKeys?: PartitionKey[];
}
export const GetEventDataStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(EventDataStoreStatus),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    KmsKeyId: S.optional(S.String),
    BillingMode: S.optional(BillingMode),
    FederationStatus: S.optional(FederationStatus),
    FederationRoleArn: S.optional(S.String),
    PartitionKeys: S.optional(PartitionKeyList),
  }).pipe(ns),
).annotate({
  identifier: "GetEventDataStoreResponse",
}) as any as S.Schema<GetEventDataStoreResponse>;
export interface GetEventSelectorsRequest {
  TrailName: string;
}
export const GetEventSelectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrailName: S.String }).pipe(
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
  identifier: "GetEventSelectorsRequest",
}) as any as S.Schema<GetEventSelectorsRequest>;
export type ReadWriteType = "ReadOnly" | "WriteOnly" | "All" | (string & {});
export const ReadWriteType = /*@__PURE__*/ S.String;

export type DataResourceValues = string[];
export const DataResourceValues = /*@__PURE__*/ S.Array(S.String);
export interface DataResource {
  Type?: string;
  Values?: string[];
}
export const DataResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Values: S.optional(DataResourceValues),
  }),
).annotate({ identifier: "DataResource" }) as any as S.Schema<DataResource>;
export type DataResources = DataResource[];
export const DataResources = /*@__PURE__*/ S.Array(DataResource);
export type ExcludeManagementEventSources = string[];
export const ExcludeManagementEventSources = /*@__PURE__*/ S.Array(S.String);
export interface EventSelector {
  ReadWriteType?: ReadWriteType;
  IncludeManagementEvents?: boolean;
  DataResources?: DataResource[];
  ExcludeManagementEventSources?: string[];
}
export const EventSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadWriteType: S.optional(ReadWriteType),
    IncludeManagementEvents: S.optional(S.Boolean),
    DataResources: S.optional(DataResources),
    ExcludeManagementEventSources: S.optional(ExcludeManagementEventSources),
  }),
).annotate({ identifier: "EventSelector" }) as any as S.Schema<EventSelector>;
export type EventSelectors = EventSelector[];
export const EventSelectors = /*@__PURE__*/ S.Array(EventSelector);
export interface GetEventSelectorsResponse {
  TrailARN?: string;
  EventSelectors?: EventSelector[];
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export const GetEventSelectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    EventSelectors: S.optional(EventSelectors),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
  }).pipe(ns),
).annotate({
  identifier: "GetEventSelectorsResponse",
}) as any as S.Schema<GetEventSelectorsResponse>;
export interface GetImportRequest {
  ImportId: string;
}
export const GetImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportId: S.String }).pipe(
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
  identifier: "GetImportRequest",
}) as any as S.Schema<GetImportRequest>;
export type ImportDestinations = string[];
export const ImportDestinations = /*@__PURE__*/ S.Array(S.String);
export interface S3ImportSource {
  S3LocationUri: string;
  S3BucketRegion: string;
  S3BucketAccessRoleArn: string;
}
export const S3ImportSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3LocationUri: S.String,
    S3BucketRegion: S.String,
    S3BucketAccessRoleArn: S.String,
  }),
).annotate({ identifier: "S3ImportSource" }) as any as S.Schema<S3ImportSource>;
export interface ImportSource {
  S3: S3ImportSource;
}
export const ImportSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3: S3ImportSource }),
).annotate({ identifier: "ImportSource" }) as any as S.Schema<ImportSource>;
export type ImportStatus =
  | "INITIALIZING"
  | "IN_PROGRESS"
  | "FAILED"
  | "STOPPED"
  | "COMPLETED"
  | (string & {});
export const ImportStatus = /*@__PURE__*/ S.String;

export interface ImportStatistics {
  PrefixesFound?: number;
  PrefixesCompleted?: number;
  FilesCompleted?: number;
  EventsCompleted?: number;
  FailedEntries?: number;
}
export const ImportStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrefixesFound: S.optional(S.Number),
    PrefixesCompleted: S.optional(S.Number),
    FilesCompleted: S.optional(S.Number),
    EventsCompleted: S.optional(S.Number),
    FailedEntries: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImportStatistics",
}) as any as S.Schema<ImportStatistics>;
export interface GetImportResponse {
  ImportId?: string;
  Destinations?: string[];
  ImportSource?: ImportSource;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportStatus?: ImportStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ImportStatistics?: ImportStatistics;
}
export const GetImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportId: S.optional(S.String),
    Destinations: S.optional(ImportDestinations),
    ImportSource: S.optional(ImportSource),
    StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportStatus: S.optional(ImportStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImportStatistics: S.optional(ImportStatistics),
  }).pipe(ns),
).annotate({
  identifier: "GetImportResponse",
}) as any as S.Schema<GetImportResponse>;
export interface GetInsightSelectorsRequest {
  TrailName?: string;
  EventDataStore?: string;
}
export const GetInsightSelectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailName: S.optional(S.String),
    EventDataStore: S.optional(S.String),
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
  identifier: "GetInsightSelectorsRequest",
}) as any as S.Schema<GetInsightSelectorsRequest>;
export type InsightType =
  | "ApiCallRateInsight"
  | "ApiErrorRateInsight"
  | (string & {});
export const InsightType = /*@__PURE__*/ S.String;

export type SourceEventCategory = "Management" | "Data" | (string & {});
export const SourceEventCategory = /*@__PURE__*/ S.String;

export type SourceEventCategories = SourceEventCategory[];
export const SourceEventCategories = /*@__PURE__*/ S.Array(SourceEventCategory);
export interface InsightSelector {
  InsightType?: InsightType;
  EventCategories?: SourceEventCategory[];
}
export const InsightSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightType: S.optional(InsightType),
    EventCategories: S.optional(SourceEventCategories),
  }),
).annotate({
  identifier: "InsightSelector",
}) as any as S.Schema<InsightSelector>;
export type InsightSelectors = InsightSelector[];
export const InsightSelectors = /*@__PURE__*/ S.Array(InsightSelector);
export interface GetInsightSelectorsResponse {
  TrailARN?: string;
  InsightSelectors?: InsightSelector[];
  EventDataStoreArn?: string;
  InsightsDestination?: string;
}
export const GetInsightSelectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    InsightSelectors: S.optional(InsightSelectors),
    EventDataStoreArn: S.optional(S.String),
    InsightsDestination: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetInsightSelectorsResponse",
}) as any as S.Schema<GetInsightSelectorsResponse>;
export type PaginationToken = string;
export type MaxQueryResults = number;
export interface GetQueryResultsRequest {
  EventDataStore?: string;
  QueryId: string;
  NextToken?: string;
  MaxQueryResults?: number;
  EventDataStoreOwnerAccountId?: string;
}
export const GetQueryResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStore: S.optional(S.String),
    QueryId: S.String,
    NextToken: S.optional(S.String),
    MaxQueryResults: S.optional(S.Number),
    EventDataStoreOwnerAccountId: S.optional(S.String),
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
  identifier: "GetQueryResultsRequest",
}) as any as S.Schema<GetQueryResultsRequest>;
export interface QueryStatistics {
  ResultsCount?: number;
  TotalResultsCount?: number;
  BytesScanned?: number;
}
export const QueryStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultsCount: S.optional(S.Number),
    TotalResultsCount: S.optional(S.Number),
    BytesScanned: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueryStatistics",
}) as any as S.Schema<QueryStatistics>;
export type QueryResultKey = string;
export type QueryResultValue = string;
export type QueryResultColumn = { [key: string]: string | undefined };
export const QueryResultColumn = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type QueryResultRow = { [key: string]: string | undefined }[];
export const QueryResultRow = /*@__PURE__*/ S.Array(QueryResultColumn);
export type QueryResultRows = { [key: string]: string | undefined }[][];
export const QueryResultRows = /*@__PURE__*/ S.Array(QueryResultRow);
export interface GetQueryResultsResponse {
  QueryStatus?: QueryStatus;
  QueryStatistics?: QueryStatistics;
  QueryResultRows?: { [key: string]: string | undefined }[][];
  NextToken?: string;
  ErrorMessage?: string;
}
export const GetQueryResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryStatus: S.optional(QueryStatus),
    QueryStatistics: S.optional(QueryStatistics),
    QueryResultRows: S.optional(QueryResultRows),
    NextToken: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetQueryResultsResponse",
}) as any as S.Schema<GetQueryResultsResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
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
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  ResourceArn?: string;
  ResourcePolicy?: string;
  DelegatedAdminResourcePolicy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourcePolicy: S.optional(S.String),
    DelegatedAdminResourcePolicy: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetTrailRequest {
  Name: string;
}
export const GetTrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
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
  identifier: "GetTrailRequest",
}) as any as S.Schema<GetTrailRequest>;
export interface GetTrailResponse {
  Trail?: Trail;
}
export const GetTrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Trail: S.optional(Trail) }).pipe(ns),
).annotate({
  identifier: "GetTrailResponse",
}) as any as S.Schema<GetTrailResponse>;
export interface GetTrailStatusRequest {
  Name: string;
}
export const GetTrailStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
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
  identifier: "GetTrailStatusRequest",
}) as any as S.Schema<GetTrailStatusRequest>;
export interface GetTrailStatusResponse {
  IsLogging?: boolean;
  LatestDeliveryError?: string;
  LatestNotificationError?: string;
  LatestDeliveryTime?: Date;
  LatestNotificationTime?: Date;
  StartLoggingTime?: Date;
  StopLoggingTime?: Date;
  LatestCloudWatchLogsDeliveryError?: string;
  LatestCloudWatchLogsDeliveryTime?: Date;
  LatestDigestDeliveryTime?: Date;
  LatestDigestDeliveryError?: string;
  LatestDeliveryAttemptTime?: string;
  LatestNotificationAttemptTime?: string;
  LatestNotificationAttemptSucceeded?: string;
  LatestDeliveryAttemptSucceeded?: string;
  TimeLoggingStarted?: string;
  TimeLoggingStopped?: string;
}
export const GetTrailStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsLogging: S.optional(S.Boolean),
    LatestDeliveryError: S.optional(S.String),
    LatestNotificationError: S.optional(S.String),
    LatestDeliveryTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestNotificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartLoggingTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StopLoggingTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestCloudWatchLogsDeliveryError: S.optional(S.String),
    LatestCloudWatchLogsDeliveryTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestDigestDeliveryTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestDigestDeliveryError: S.optional(S.String),
    LatestDeliveryAttemptTime: S.optional(S.String),
    LatestNotificationAttemptTime: S.optional(S.String),
    LatestNotificationAttemptSucceeded: S.optional(S.String),
    LatestDeliveryAttemptSucceeded: S.optional(S.String),
    TimeLoggingStarted: S.optional(S.String),
    TimeLoggingStopped: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetTrailStatusResponse",
}) as any as S.Schema<GetTrailStatusResponse>;
export type ListChannelsMaxResultsCount = number;
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListChannelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "ListChannelsRequest",
}) as any as S.Schema<ListChannelsRequest>;
export interface Channel {
  ChannelArn?: string;
  Name?: string;
}
export const Channel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelArn: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "Channel" }) as any as S.Schema<Channel>;
export type Channels = Channel[];
export const Channels = /*@__PURE__*/ S.Array(Channel);
export interface ListChannelsResponse {
  Channels?: Channel[];
  NextToken?: string;
}
export const ListChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channels: S.optional(Channels),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListChannelsResponse",
}) as any as S.Schema<ListChannelsResponse>;
export type ListDashboardsMaxResultsCount = number;
export interface ListDashboardsRequest {
  NamePrefix?: string;
  Type?: DashboardType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDashboardsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamePrefix: S.optional(S.String),
    Type: S.optional(DashboardType),
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
  identifier: "ListDashboardsRequest",
}) as any as S.Schema<ListDashboardsRequest>;
export interface DashboardDetail {
  DashboardArn?: string;
  Type?: DashboardType;
}
export const DashboardDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardArn: S.optional(S.String),
    Type: S.optional(DashboardType),
  }),
).annotate({
  identifier: "DashboardDetail",
}) as any as S.Schema<DashboardDetail>;
export type Dashboards = DashboardDetail[];
export const Dashboards = /*@__PURE__*/ S.Array(DashboardDetail);
export interface ListDashboardsResponse {
  Dashboards?: DashboardDetail[];
  NextToken?: string;
}
export const ListDashboardsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dashboards: S.optional(Dashboards),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDashboardsResponse",
}) as any as S.Schema<ListDashboardsResponse>;
export type ListEventDataStoresMaxResultsCount = number;
export interface ListEventDataStoresRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEventDataStoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "ListEventDataStoresRequest",
}) as any as S.Schema<ListEventDataStoresRequest>;
export interface EventDataStore {
  EventDataStoreArn?: string;
  Name?: string;
  TerminationProtectionEnabled?: boolean;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const EventDataStore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    Name: S.optional(S.String),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    Status: S.optional(EventDataStoreStatus),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "EventDataStore" }) as any as S.Schema<EventDataStore>;
export type EventDataStores = EventDataStore[];
export const EventDataStores = /*@__PURE__*/ S.Array(EventDataStore);
export interface ListEventDataStoresResponse {
  EventDataStores?: EventDataStore[];
  NextToken?: string;
}
export const ListEventDataStoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStores: S.optional(EventDataStores),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListEventDataStoresResponse",
}) as any as S.Schema<ListEventDataStoresResponse>;
export type ListImportFailuresMaxResultsCount = number;
export interface ListImportFailuresRequest {
  ImportId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListImportFailuresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportId: S.String,
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
  identifier: "ListImportFailuresRequest",
}) as any as S.Schema<ListImportFailuresRequest>;
export type ImportFailureStatus =
  | "FAILED"
  | "RETRY"
  | "SUCCEEDED"
  | (string & {});
export const ImportFailureStatus = /*@__PURE__*/ S.String;

export interface ImportFailureListItem {
  Location?: string;
  Status?: ImportFailureStatus;
  ErrorType?: string;
  ErrorMessage?: string;
  LastUpdatedTime?: Date;
}
export const ImportFailureListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String),
    Status: S.optional(ImportFailureStatus),
    ErrorType: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ImportFailureListItem",
}) as any as S.Schema<ImportFailureListItem>;
export type ImportFailureList = ImportFailureListItem[];
export const ImportFailureList = /*@__PURE__*/ S.Array(ImportFailureListItem);
export interface ListImportFailuresResponse {
  Failures?: ImportFailureListItem[];
  NextToken?: string;
}
export const ListImportFailuresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Failures: S.optional(ImportFailureList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListImportFailuresResponse",
}) as any as S.Schema<ListImportFailuresResponse>;
export type ListImportsMaxResultsCount = number;
export interface ListImportsRequest {
  MaxResults?: number;
  Destination?: string;
  ImportStatus?: ImportStatus;
  NextToken?: string;
}
export const ListImportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    Destination: S.optional(S.String),
    ImportStatus: S.optional(ImportStatus),
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
  identifier: "ListImportsRequest",
}) as any as S.Schema<ListImportsRequest>;
export interface ImportsListItem {
  ImportId?: string;
  ImportStatus?: ImportStatus;
  Destinations?: string[];
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const ImportsListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportId: S.optional(S.String),
    ImportStatus: S.optional(ImportStatus),
    Destinations: S.optional(ImportDestinations),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ImportsListItem",
}) as any as S.Schema<ImportsListItem>;
export type ImportsList = ImportsListItem[];
export const ImportsList = /*@__PURE__*/ S.Array(ImportsListItem);
export interface ListImportsResponse {
  Imports?: ImportsListItem[];
  NextToken?: string;
}
export const ListImportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Imports: S.optional(ImportsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListImportsResponse",
}) as any as S.Schema<ListImportsResponse>;
export type ListInsightsDataType = "InsightsEvents" | (string & {});
export const ListInsightsDataType = /*@__PURE__*/ S.String;

export type ListInsightsDataDimensionKey =
  | "EventId"
  | "EventName"
  | "EventSource"
  | (string & {});
export const ListInsightsDataDimensionKey = /*@__PURE__*/ S.String;

export type ListInsightsDataDimensionValue = string;
export type ListInsightsDataDimensions = {
  [key in ListInsightsDataDimensionKey]?: string;
};
export const ListInsightsDataDimensions = /*@__PURE__*/ S.Record(
  ListInsightsDataDimensionKey,
  S.String.pipe(S.optional),
);
export type ListInsightsDataMaxResultsCount = number;
export interface ListInsightsDataRequest {
  InsightSource: string;
  DataType: ListInsightsDataType;
  Dimensions?: { [key: string]: string | undefined };
  StartTime?: Date;
  EndTime?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export const ListInsightsDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightSource: S.String,
    DataType: ListInsightsDataType,
    Dimensions: S.optional(ListInsightsDataDimensions),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
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
  identifier: "ListInsightsDataRequest",
}) as any as S.Schema<ListInsightsDataRequest>;
export interface Resource {
  ResourceType?: string;
  ResourceName?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    ResourceName: S.optional(S.String),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(Resource);
export interface Event {
  EventId?: string;
  EventName?: string;
  ReadOnly?: string;
  AccessKeyId?: string;
  EventTime?: Date;
  EventSource?: string;
  Username?: string;
  Resources?: Resource[];
  CloudTrailEvent?: string;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.optional(S.String),
    EventName: S.optional(S.String),
    ReadOnly: S.optional(S.String),
    AccessKeyId: S.optional(S.String),
    EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EventSource: S.optional(S.String),
    Username: S.optional(S.String),
    Resources: S.optional(ResourceList),
    CloudTrailEvent: S.optional(S.String),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventsList = Event[];
export const EventsList = /*@__PURE__*/ S.Array(Event);
export interface ListInsightsDataResponse {
  Events?: Event[];
  NextToken?: string;
}
export const ListInsightsDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Events: S.optional(EventsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInsightsDataResponse",
}) as any as S.Schema<ListInsightsDataResponse>;
export type EventSource = string;
export type EventName = string;
export type ErrorCode = string;
export type InsightsMetricPeriod = number;
export type InsightsMetricDataType =
  | "FillWithZeros"
  | "NonZeroData"
  | (string & {});
export const InsightsMetricDataType = /*@__PURE__*/ S.String;

export type InsightsMetricMaxResults = number;
export type InsightsMetricNextToken = string;
export interface ListInsightsMetricDataRequest {
  TrailName?: string;
  EventSource: string;
  EventName: string;
  InsightType: InsightType;
  ErrorCode?: string;
  StartTime?: Date;
  EndTime?: Date;
  Period?: number;
  DataType?: InsightsMetricDataType;
  MaxResults?: number;
  NextToken?: string;
}
export const ListInsightsMetricDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailName: S.optional(S.String),
    EventSource: S.String,
    EventName: S.String,
    InsightType: InsightType,
    ErrorCode: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Period: S.optional(S.Number),
    DataType: S.optional(InsightsMetricDataType),
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
  identifier: "ListInsightsMetricDataRequest",
}) as any as S.Schema<ListInsightsMetricDataRequest>;
export type Timestamps = Date[];
export const Timestamps = /*@__PURE__*/ S.Array(
  S.Date.pipe(T.TimestampFormat("epoch-seconds")),
);
export type InsightsMetricValues = number[];
export const InsightsMetricValues = /*@__PURE__*/ S.Array(S.Number);
export interface ListInsightsMetricDataResponse {
  TrailARN?: string;
  EventSource?: string;
  EventName?: string;
  InsightType?: InsightType;
  ErrorCode?: string;
  Timestamps?: Date[];
  Values?: number[];
  NextToken?: string;
}
export const ListInsightsMetricDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    EventSource: S.optional(S.String),
    EventName: S.optional(S.String),
    InsightType: S.optional(InsightType),
    ErrorCode: S.optional(S.String),
    Timestamps: S.optional(Timestamps),
    Values: S.optional(InsightsMetricValues),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInsightsMetricDataResponse",
}) as any as S.Schema<ListInsightsMetricDataResponse>;
export interface ListPublicKeysRequest {
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
}
export const ListPublicKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
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
  identifier: "ListPublicKeysRequest",
}) as any as S.Schema<ListPublicKeysRequest>;
export type ByteBuffer = Uint8Array;
export interface PublicKey {
  Value?: Uint8Array;
  ValidityStartTime?: Date;
  ValidityEndTime?: Date;
  Fingerprint?: string;
}
export const PublicKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(T.Blob),
    ValidityStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ValidityEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Fingerprint: S.optional(S.String),
  }),
).annotate({ identifier: "PublicKey" }) as any as S.Schema<PublicKey>;
export type PublicKeyList = PublicKey[];
export const PublicKeyList = /*@__PURE__*/ S.Array(PublicKey);
export interface ListPublicKeysResponse {
  PublicKeyList?: PublicKey[];
  NextToken?: string;
}
export const ListPublicKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicKeyList: S.optional(PublicKeyList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPublicKeysResponse",
}) as any as S.Schema<ListPublicKeysResponse>;
export type ListQueriesMaxResultsCount = number;
export interface ListQueriesRequest {
  EventDataStore: string;
  NextToken?: string;
  MaxResults?: number;
  StartTime?: Date;
  EndTime?: Date;
  QueryStatus?: QueryStatus;
}
export const ListQueriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStore: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    QueryStatus: S.optional(QueryStatus),
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
  identifier: "ListQueriesRequest",
}) as any as S.Schema<ListQueriesRequest>;
export interface Query {
  QueryId?: string;
  QueryStatus?: QueryStatus;
  CreationTime?: Date;
}
export const Query = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.optional(S.String),
    QueryStatus: S.optional(QueryStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Query" }) as any as S.Schema<Query>;
export type Queries = Query[];
export const Queries = /*@__PURE__*/ S.Array(Query);
export interface ListQueriesResponse {
  Queries?: Query[];
  NextToken?: string;
}
export const ListQueriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Queries: S.optional(Queries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListQueriesResponse",
}) as any as S.Schema<ListQueriesResponse>;
export type ResourceIdList = string[];
export const ResourceIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListTagsRequest {
  ResourceIdList: string[];
  NextToken?: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdList: ResourceIdList,
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
  identifier: "ListTagsRequest",
}) as any as S.Schema<ListTagsRequest>;
export interface ResourceTag {
  ResourceId?: string;
  TagsList?: Tag[];
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    TagsList: S.optional(TagsList),
  }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export interface ListTagsResponse {
  ResourceTagList?: ResourceTag[];
  NextToken?: string;
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceTagList: S.optional(ResourceTagList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface ListTrailsRequest {
  NextToken?: string;
}
export const ListTrailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListTrailsRequest",
}) as any as S.Schema<ListTrailsRequest>;
export interface TrailInfo {
  TrailARN?: string;
  Name?: string;
  HomeRegion?: string;
}
export const TrailInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    Name: S.optional(S.String),
    HomeRegion: S.optional(S.String),
  }),
).annotate({ identifier: "TrailInfo" }) as any as S.Schema<TrailInfo>;
export type Trails = TrailInfo[];
export const Trails = /*@__PURE__*/ S.Array(TrailInfo);
export interface ListTrailsResponse {
  Trails?: TrailInfo[];
  NextToken?: string;
}
export const ListTrailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Trails: S.optional(Trails),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTrailsResponse",
}) as any as S.Schema<ListTrailsResponse>;
export type LookupAttributeKey =
  | "EventId"
  | "EventName"
  | "ReadOnly"
  | "Username"
  | "ResourceType"
  | "ResourceName"
  | "EventSource"
  | "AccessKeyId"
  | (string & {});
export const LookupAttributeKey = /*@__PURE__*/ S.String;

export type LookupAttributeValue = string;
export interface LookupAttribute {
  AttributeKey: LookupAttributeKey;
  AttributeValue: string;
}
export const LookupAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeKey: LookupAttributeKey, AttributeValue: S.String }),
).annotate({
  identifier: "LookupAttribute",
}) as any as S.Schema<LookupAttribute>;
export type LookupAttributesList = LookupAttribute[];
export const LookupAttributesList = /*@__PURE__*/ S.Array(LookupAttribute);
export type EventCategory = "insight" | (string & {});
export const EventCategory = /*@__PURE__*/ S.String;

export type MaxResults = number;
export type NextToken = string;
export interface LookupEventsRequest {
  LookupAttributes?: LookupAttribute[];
  StartTime?: Date;
  EndTime?: Date;
  EventCategory?: EventCategory;
  MaxResults?: number;
  NextToken?: string;
}
export const LookupEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LookupAttributes: S.optional(LookupAttributesList),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EventCategory: S.optional(EventCategory),
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
  identifier: "LookupEventsRequest",
}) as any as S.Schema<LookupEventsRequest>;
export interface LookupEventsResponse {
  Events?: Event[];
  NextToken?: string;
}
export const LookupEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Events: S.optional(EventsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "LookupEventsResponse",
}) as any as S.Schema<LookupEventsResponse>;
export interface PutEventConfigurationRequest {
  TrailName?: string;
  EventDataStore?: string;
  MaxEventSize?: MaxEventSize;
  ContextKeySelectors?: ContextKeySelector[];
  AggregationConfigurations?: AggregationConfiguration[];
}
export const PutEventConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailName: S.optional(S.String),
    EventDataStore: S.optional(S.String),
    MaxEventSize: S.optional(MaxEventSize),
    ContextKeySelectors: S.optional(ContextKeySelectors),
    AggregationConfigurations: S.optional(AggregationConfigurations),
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
  identifier: "PutEventConfigurationRequest",
}) as any as S.Schema<PutEventConfigurationRequest>;
export interface PutEventConfigurationResponse {
  TrailARN?: string;
  EventDataStoreArn?: string;
  MaxEventSize?: MaxEventSize;
  ContextKeySelectors?: ContextKeySelector[];
  AggregationConfigurations?: AggregationConfiguration[];
}
export const PutEventConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    EventDataStoreArn: S.optional(S.String),
    MaxEventSize: S.optional(MaxEventSize),
    ContextKeySelectors: S.optional(ContextKeySelectors),
    AggregationConfigurations: S.optional(AggregationConfigurations),
  }).pipe(ns),
).annotate({
  identifier: "PutEventConfigurationResponse",
}) as any as S.Schema<PutEventConfigurationResponse>;
export interface PutEventSelectorsRequest {
  TrailName: string;
  EventSelectors?: EventSelector[];
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export const PutEventSelectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailName: S.String,
    EventSelectors: S.optional(EventSelectors),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
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
  identifier: "PutEventSelectorsRequest",
}) as any as S.Schema<PutEventSelectorsRequest>;
export interface PutEventSelectorsResponse {
  TrailARN?: string;
  EventSelectors?: EventSelector[];
  AdvancedEventSelectors?: AdvancedEventSelector[];
}
export const PutEventSelectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    EventSelectors: S.optional(EventSelectors),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
  }).pipe(ns),
).annotate({
  identifier: "PutEventSelectorsResponse",
}) as any as S.Schema<PutEventSelectorsResponse>;
export interface PutInsightSelectorsRequest {
  TrailName?: string;
  InsightSelectors: InsightSelector[];
  EventDataStore?: string;
  InsightsDestination?: string;
}
export const PutInsightSelectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailName: S.optional(S.String),
    InsightSelectors: InsightSelectors,
    EventDataStore: S.optional(S.String),
    InsightsDestination: S.optional(S.String),
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
  identifier: "PutInsightSelectorsRequest",
}) as any as S.Schema<PutInsightSelectorsRequest>;
export interface PutInsightSelectorsResponse {
  TrailARN?: string;
  InsightSelectors?: InsightSelector[];
  EventDataStoreArn?: string;
  InsightsDestination?: string;
}
export const PutInsightSelectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrailARN: S.optional(S.String),
    InsightSelectors: S.optional(InsightSelectors),
    EventDataStoreArn: S.optional(S.String),
    InsightsDestination: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutInsightSelectorsResponse",
}) as any as S.Schema<PutInsightSelectorsResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  ResourcePolicy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, ResourcePolicy: S.String }).pipe(
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
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  ResourcePolicy?: string;
  DelegatedAdminResourcePolicy?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourcePolicy: S.optional(S.String),
    DelegatedAdminResourcePolicy: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface RegisterOrganizationDelegatedAdminRequest {
  MemberAccountId: string;
}
export const RegisterOrganizationDelegatedAdminRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MemberAccountId: S.String }).pipe(
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
    identifier: "RegisterOrganizationDelegatedAdminRequest",
  }) as any as S.Schema<RegisterOrganizationDelegatedAdminRequest>;
export interface RegisterOrganizationDelegatedAdminResponse {}
export const RegisterOrganizationDelegatedAdminResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "RegisterOrganizationDelegatedAdminResponse",
  }) as any as S.Schema<RegisterOrganizationDelegatedAdminResponse>;
export interface RemoveTagsRequest {
  ResourceId: string;
  TagsList: Tag[];
}
export const RemoveTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagsList: TagsList }).pipe(
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
  identifier: "RemoveTagsRequest",
}) as any as S.Schema<RemoveTagsRequest>;
export interface RemoveTagsResponse {}
export const RemoveTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsResponse",
}) as any as S.Schema<RemoveTagsResponse>;
export interface RestoreEventDataStoreRequest {
  EventDataStore: string;
}
export const RestoreEventDataStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String }).pipe(
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
  identifier: "RestoreEventDataStoreRequest",
}) as any as S.Schema<RestoreEventDataStoreRequest>;
export interface RestoreEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
}
export const RestoreEventDataStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(EventDataStoreStatus),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    KmsKeyId: S.optional(S.String),
    BillingMode: S.optional(BillingMode),
  }).pipe(ns),
).annotate({
  identifier: "RestoreEventDataStoreResponse",
}) as any as S.Schema<RestoreEventDataStoreResponse>;
export type SearchSampleQueriesSearchPhrase = string;
export type SearchSampleQueriesMaxResults = number;
export interface SearchSampleQueriesRequest {
  SearchPhrase: string;
  MaxResults?: number;
  NextToken?: string;
}
export const SearchSampleQueriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchPhrase: S.String,
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
  identifier: "SearchSampleQueriesRequest",
}) as any as S.Schema<SearchSampleQueriesRequest>;
export type SampleQueryName = string;
export type SampleQueryDescription = string;
export type SampleQuerySQL = string;
export type SampleQueryRelevance = number;
export interface SearchSampleQueriesSearchResult {
  Name?: string;
  Description?: string;
  SQL?: string;
  Relevance?: number;
}
export const SearchSampleQueriesSearchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    SQL: S.optional(S.String),
    Relevance: S.optional(S.Number),
  }),
).annotate({
  identifier: "SearchSampleQueriesSearchResult",
}) as any as S.Schema<SearchSampleQueriesSearchResult>;
export type SearchSampleQueriesSearchResults =
  SearchSampleQueriesSearchResult[];
export const SearchSampleQueriesSearchResults = /*@__PURE__*/ S.Array(
  SearchSampleQueriesSearchResult,
);
export interface SearchSampleQueriesResponse {
  SearchResults?: SearchSampleQueriesSearchResult[];
  NextToken?: string;
}
export const SearchSampleQueriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchResults: S.optional(SearchSampleQueriesSearchResults),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "SearchSampleQueriesResponse",
}) as any as S.Schema<SearchSampleQueriesResponse>;
export type QueryParameterKey = string;
export type QueryParameterValue = string;
export type QueryParameterValues = { [key: string]: string | undefined };
export const QueryParameterValues = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StartDashboardRefreshRequest {
  DashboardId: string;
  QueryParameterValues?: { [key: string]: string | undefined };
}
export const StartDashboardRefreshRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardId: S.String,
    QueryParameterValues: S.optional(QueryParameterValues),
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
  identifier: "StartDashboardRefreshRequest",
}) as any as S.Schema<StartDashboardRefreshRequest>;
export interface StartDashboardRefreshResponse {
  RefreshId?: string;
}
export const StartDashboardRefreshResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RefreshId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartDashboardRefreshResponse",
}) as any as S.Schema<StartDashboardRefreshResponse>;
export interface StartEventDataStoreIngestionRequest {
  EventDataStore: string;
}
export const StartEventDataStoreIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String }).pipe(
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
  identifier: "StartEventDataStoreIngestionRequest",
}) as any as S.Schema<StartEventDataStoreIngestionRequest>;
export interface StartEventDataStoreIngestionResponse {}
export const StartEventDataStoreIngestionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartEventDataStoreIngestionResponse",
}) as any as S.Schema<StartEventDataStoreIngestionResponse>;
export interface StartImportRequest {
  Destinations?: string[];
  ImportSource?: ImportSource;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportId?: string;
}
export const StartImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(ImportDestinations),
    ImportSource: S.optional(ImportSource),
    StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportId: S.optional(S.String),
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
  identifier: "StartImportRequest",
}) as any as S.Schema<StartImportRequest>;
export interface StartImportResponse {
  ImportId?: string;
  Destinations?: string[];
  ImportSource?: ImportSource;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportStatus?: ImportStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const StartImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportId: S.optional(S.String),
    Destinations: S.optional(ImportDestinations),
    ImportSource: S.optional(ImportSource),
    StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportStatus: S.optional(ImportStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "StartImportResponse",
}) as any as S.Schema<StartImportResponse>;
export interface StartLoggingRequest {
  Name: string;
}
export const StartLoggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
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
  identifier: "StartLoggingRequest",
}) as any as S.Schema<StartLoggingRequest>;
export interface StartLoggingResponse {}
export const StartLoggingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartLoggingResponse",
}) as any as S.Schema<StartLoggingResponse>;
export interface StartQueryRequest {
  QueryStatement?: string;
  DeliveryS3Uri?: string;
  QueryAlias?: string;
  QueryParameters?: string[];
  EventDataStoreOwnerAccountId?: string;
}
export const StartQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryStatement: S.optional(S.String),
    DeliveryS3Uri: S.optional(S.String),
    QueryAlias: S.optional(S.String),
    QueryParameters: S.optional(QueryParameters),
    EventDataStoreOwnerAccountId: S.optional(S.String),
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
  identifier: "StartQueryRequest",
}) as any as S.Schema<StartQueryRequest>;
export interface StartQueryResponse {
  QueryId?: string;
  EventDataStoreOwnerAccountId?: string;
}
export const StartQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.optional(S.String),
    EventDataStoreOwnerAccountId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "StartQueryResponse",
}) as any as S.Schema<StartQueryResponse>;
export interface StopEventDataStoreIngestionRequest {
  EventDataStore: string;
}
export const StopEventDataStoreIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventDataStore: S.String }).pipe(
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
  identifier: "StopEventDataStoreIngestionRequest",
}) as any as S.Schema<StopEventDataStoreIngestionRequest>;
export interface StopEventDataStoreIngestionResponse {}
export const StopEventDataStoreIngestionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopEventDataStoreIngestionResponse",
}) as any as S.Schema<StopEventDataStoreIngestionResponse>;
export interface StopImportRequest {
  ImportId: string;
}
export const StopImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportId: S.String }).pipe(
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
  identifier: "StopImportRequest",
}) as any as S.Schema<StopImportRequest>;
export interface StopImportResponse {
  ImportId?: string;
  ImportSource?: ImportSource;
  Destinations?: string[];
  ImportStatus?: ImportStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  StartEventTime?: Date;
  EndEventTime?: Date;
  ImportStatistics?: ImportStatistics;
}
export const StopImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportId: S.optional(S.String),
    ImportSource: S.optional(ImportSource),
    Destinations: S.optional(ImportDestinations),
    ImportStatus: S.optional(ImportStatus),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndEventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportStatistics: S.optional(ImportStatistics),
  }).pipe(ns),
).annotate({
  identifier: "StopImportResponse",
}) as any as S.Schema<StopImportResponse>;
export interface StopLoggingRequest {
  Name: string;
}
export const StopLoggingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
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
  identifier: "StopLoggingRequest",
}) as any as S.Schema<StopLoggingRequest>;
export interface StopLoggingResponse {}
export const StopLoggingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopLoggingResponse",
}) as any as S.Schema<StopLoggingResponse>;
export interface UpdateChannelRequest {
  Channel: string;
  Destinations?: Destination[];
  Name?: string;
}
export const UpdateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channel: S.String,
    Destinations: S.optional(Destinations),
    Name: S.optional(S.String),
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
  identifier: "UpdateChannelRequest",
}) as any as S.Schema<UpdateChannelRequest>;
export interface UpdateChannelResponse {
  ChannelArn?: string;
  Name?: string;
  Source?: string;
  Destinations?: Destination[];
}
export const UpdateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelArn: S.optional(S.String),
    Name: S.optional(S.String),
    Source: S.optional(S.String),
    Destinations: S.optional(Destinations),
  }).pipe(ns),
).annotate({
  identifier: "UpdateChannelResponse",
}) as any as S.Schema<UpdateChannelResponse>;
export interface UpdateDashboardRequest {
  DashboardId: string;
  Widgets?: RequestWidget[];
  RefreshSchedule?: RefreshSchedule;
  TerminationProtectionEnabled?: boolean;
}
export const UpdateDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardId: S.String,
    Widgets: S.optional(RequestWidgetList),
    RefreshSchedule: S.optional(RefreshSchedule),
    TerminationProtectionEnabled: S.optional(S.Boolean),
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
  identifier: "UpdateDashboardRequest",
}) as any as S.Schema<UpdateDashboardRequest>;
export interface UpdateDashboardResponse {
  DashboardArn?: string;
  Name?: string;
  Type?: DashboardType;
  Widgets?: Widget[];
  RefreshSchedule?: RefreshSchedule;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const UpdateDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardArn: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(DashboardType),
    Widgets: S.optional(WidgetList),
    RefreshSchedule: S.optional(RefreshSchedule),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "UpdateDashboardResponse",
}) as any as S.Schema<UpdateDashboardResponse>;
export interface UpdateEventDataStoreRequest {
  EventDataStore: string;
  Name?: string;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
}
export const UpdateEventDataStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStore: S.String,
    Name: S.optional(S.String),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    BillingMode: S.optional(BillingMode),
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
  identifier: "UpdateEventDataStoreRequest",
}) as any as S.Schema<UpdateEventDataStoreRequest>;
export interface UpdateEventDataStoreResponse {
  EventDataStoreArn?: string;
  Name?: string;
  Status?: EventDataStoreStatus;
  AdvancedEventSelectors?: AdvancedEventSelector[];
  MultiRegionEnabled?: boolean;
  OrganizationEnabled?: boolean;
  RetentionPeriod?: number;
  TerminationProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  KmsKeyId?: string;
  BillingMode?: BillingMode;
  FederationStatus?: FederationStatus;
  FederationRoleArn?: string;
}
export const UpdateEventDataStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDataStoreArn: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(EventDataStoreStatus),
    AdvancedEventSelectors: S.optional(AdvancedEventSelectors),
    MultiRegionEnabled: S.optional(S.Boolean),
    OrganizationEnabled: S.optional(S.Boolean),
    RetentionPeriod: S.optional(S.Number),
    TerminationProtectionEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    KmsKeyId: S.optional(S.String),
    BillingMode: S.optional(BillingMode),
    FederationStatus: S.optional(FederationStatus),
    FederationRoleArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateEventDataStoreResponse",
}) as any as S.Schema<UpdateEventDataStoreResponse>;
export interface UpdateTrailRequest {
  Name: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  EnableLogFileValidation?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
}
export const UpdateTrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    S3BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    SnsTopicName: S.optional(S.String),
    IncludeGlobalServiceEvents: S.optional(S.Boolean),
    IsMultiRegionTrail: S.optional(S.Boolean),
    EnableLogFileValidation: S.optional(S.Boolean),
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    CloudWatchLogsRoleArn: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    IsOrganizationTrail: S.optional(S.Boolean),
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
  identifier: "UpdateTrailRequest",
}) as any as S.Schema<UpdateTrailRequest>;
export interface UpdateTrailResponse {
  Name?: string;
  S3BucketName?: string;
  S3KeyPrefix?: string;
  SnsTopicName?: string;
  SnsTopicARN?: string;
  IncludeGlobalServiceEvents?: boolean;
  IsMultiRegionTrail?: boolean;
  TrailARN?: string;
  LogFileValidationEnabled?: boolean;
  CloudWatchLogsLogGroupArn?: string;
  CloudWatchLogsRoleArn?: string;
  KmsKeyId?: string;
  IsOrganizationTrail?: boolean;
}
export const UpdateTrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    S3BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    SnsTopicName: S.optional(S.String),
    SnsTopicARN: S.optional(S.String),
    IncludeGlobalServiceEvents: S.optional(S.Boolean),
    IsMultiRegionTrail: S.optional(S.Boolean),
    TrailARN: S.optional(S.String),
    LogFileValidationEnabled: S.optional(S.Boolean),
    CloudWatchLogsLogGroupArn: S.optional(S.String),
    CloudWatchLogsRoleArn: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    IsOrganizationTrail: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "UpdateTrailResponse",
}) as any as S.Schema<UpdateTrailResponse>;
export type AddTagsError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | CloudTrailARNInvalidException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidTagParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | TagsLimitExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Adds one or more tags to a trail, event data store, dashboard, or channel, up to a limit of 50. Overwrites an
 * existing tag's value when a new value is specified for an existing tag key. Tag key names
 * must be unique; you cannot have two keys with the same name but different
 * values. If you specify a key without a value, the tag will be created with the specified
 * key and a value of null. You can tag a trail or event data store that applies to all
 * Amazon Web Services Regions only from the Region in which the trail or event data store
 * was created (also known as its home Region).
 */
export const addTags: API.OperationMethod<
  AddTagsRequest,
  AddTagsResponse,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsRequest,
  output: AddTagsResponse,
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    CloudTrailARNInvalidException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidTagParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    TagsLimitExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type CancelQueryError =
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InactiveQueryException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | QueryIdNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Cancels a query if the query is not in a terminated state, such as
 * `CANCELLED`, `FAILED`, `TIMED_OUT`, or
 * `FINISHED`. You must specify an ARN value for `EventDataStore`.
 * The ID of the query that you want to cancel is also required. When you run
 * `CancelQuery`, the query status might show as `CANCELLED` even if
 * the operation is not yet finished.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryRequest,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelQueryRequest,
  output: CancelQueryResponse,
  errors: [
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InactiveQueryException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    QueryIdNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
}));

export type CreateChannelError =
  | ChannelAlreadyExistsException
  | ChannelMaxLimitExceededException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidEventDataStoreCategoryException
  | InvalidParameterException
  | InvalidSourceException
  | InvalidTagParameterException
  | OperationNotPermittedException
  | TagsLimitExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a channel for CloudTrail to ingest events from a partner or external source.
 * After you create a channel, a CloudTrail Lake event data store can log events
 * from the partner or source that you specify.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelRequest,
  output: CreateChannelResponse,
  errors: [
    ChannelAlreadyExistsException,
    ChannelMaxLimitExceededException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidEventDataStoreCategoryException,
    InvalidParameterException,
    InvalidSourceException,
    InvalidTagParameterException,
    OperationNotPermittedException,
    TagsLimitExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateDashboardError =
  | ConflictException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidQueryStatementException
  | InvalidTagParameterException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a custom dashboard or the Highlights dashboard.
 *
 * - **Custom dashboards** - Custom dashboards allow you to query
 * events in any event data store type. You can add up to 10 widgets to a custom dashboard. You can manually refresh a custom dashboard, or you can set a refresh schedule.
 *
 * - **Highlights dashboard** - You can create
 * the Highlights dashboard to see a summary of key user activities and API usage across all your event data stores.
 * CloudTrail Lake manages the Highlights dashboard and refreshes the dashboard every 6 hours. To create the Highlights dashboard, you must set and enable a refresh schedule.
 *
 * CloudTrail runs queries to populate the dashboard's widgets during a manual or scheduled refresh. CloudTrail must be granted permissions to run the `StartQuery` operation on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to each event data store. For more information,
 * see Example: Allow CloudTrail to run queries to populate a dashboard in the *CloudTrail User Guide*.
 *
 * To set a refresh schedule, CloudTrail must be granted permissions to run the `StartDashboardRefresh` operation to refresh the dashboard on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to the dashboard. For more information,
 * see
 * Resource-based policy example for a dashboard in the *CloudTrail User Guide*.
 *
 * For more information about dashboards, see CloudTrail Lake dashboards in the *CloudTrail User Guide*.
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
    ConflictException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidQueryStatementException,
    InvalidTagParameterException,
    ServiceQuotaExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDashboard",
}));

export type CreateEventDataStoreError =
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | EventDataStoreAlreadyExistsException
  | EventDataStoreMaxLimitExceededException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InvalidEventSelectorsException
  | InvalidKmsKeyIdException
  | InvalidParameterException
  | InvalidTagParameterException
  | KmsException
  | KmsKeyNotFoundException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | ThrottlingException
  | UnsupportedOperationException
  | CloudTrailLakeOnboardingClosed
  | CommonErrors;
/**
 * Creates a new event data store.
 */
export const createEventDataStore: API.OperationMethod<
  CreateEventDataStoreRequest,
  CreateEventDataStoreResponse,
  CreateEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventDataStoreRequest,
  output: CreateEventDataStoreResponse,
  errors: [
    CloudTrailAccessNotEnabledException,
    ConflictException,
    EventDataStoreAlreadyExistsException,
    EventDataStoreMaxLimitExceededException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InvalidEventSelectorsException,
    InvalidKmsKeyIdException,
    InvalidParameterException,
    InvalidTagParameterException,
    KmsException,
    KmsKeyNotFoundException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    ThrottlingException,
    UnsupportedOperationException,
    CloudTrailLakeOnboardingClosed,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventDataStore",
}));

export type CreateTrailError =
  | CloudTrailAccessNotEnabledException
  | CloudTrailInvalidClientTokenIdException
  | CloudWatchLogsDeliveryUnavailableException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InsufficientSnsTopicPolicyException
  | InvalidCloudWatchLogsLogGroupArnException
  | InvalidCloudWatchLogsRoleArnException
  | InvalidKmsKeyIdException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidS3BucketNameException
  | InvalidS3PrefixException
  | InvalidSnsTopicNameException
  | InvalidTagParameterException
  | InvalidTrailNameException
  | KmsException
  | KmsKeyDisabledException
  | KmsKeyNotFoundException
  | MaximumNumberOfTrailsExceededException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | S3BucketDoesNotExistException
  | TagsLimitExceededException
  | ThrottlingException
  | TrailAlreadyExistsException
  | TrailNotProvidedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a trail that specifies the settings for delivery of log data to an Amazon S3 bucket.
 */
export const createTrail: API.OperationMethod<
  CreateTrailRequest,
  CreateTrailResponse,
  CreateTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrailRequest,
  output: CreateTrailResponse,
  errors: [
    CloudTrailAccessNotEnabledException,
    CloudTrailInvalidClientTokenIdException,
    CloudWatchLogsDeliveryUnavailableException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InsufficientSnsTopicPolicyException,
    InvalidCloudWatchLogsLogGroupArnException,
    InvalidCloudWatchLogsRoleArnException,
    InvalidKmsKeyIdException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidS3BucketNameException,
    InvalidS3PrefixException,
    InvalidSnsTopicNameException,
    InvalidTagParameterException,
    InvalidTrailNameException,
    KmsException,
    KmsKeyDisabledException,
    KmsKeyNotFoundException,
    MaximumNumberOfTrailsExceededException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    S3BucketDoesNotExistException,
    TagsLimitExceededException,
    ThrottlingException,
    TrailAlreadyExistsException,
    TrailNotProvidedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrail",
}));

export type DeleteChannelError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a channel.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelRequest,
  output: DeleteChannelResponse,
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteDashboardError =
  | ConflictException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified dashboard. You cannot delete a dashboard that has termination protection enabled.
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
    ConflictException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboard",
}));

export type DeleteEventDataStoreError =
  | ChannelExistsForEDSException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreFederationEnabledException
  | EventDataStoreHasOngoingImportException
  | EventDataStoreNotFoundException
  | EventDataStoreTerminationProtectedException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Disables the event data store specified by `EventDataStore`, which accepts an
 * event data store ARN. After you run `DeleteEventDataStore`, the event data store
 * enters a `PENDING_DELETION` state, and is automatically deleted after a wait
 * period of seven days. `TerminationProtectionEnabled` must be set to
 * `False` on the event data store and the `FederationStatus` must be `DISABLED`.
 * You cannot delete an event data store if `TerminationProtectionEnabled`
 * is `True` or the `FederationStatus` is `ENABLED`.
 *
 * After you run `DeleteEventDataStore` on an event data store, you cannot run
 * `ListQueries`, `DescribeQuery`, or `GetQueryResults` on
 * queries that are using an event data store in a `PENDING_DELETION` state. An
 * event data store in the `PENDING_DELETION` state does not incur costs.
 */
export const deleteEventDataStore: API.OperationMethod<
  DeleteEventDataStoreRequest,
  DeleteEventDataStoreResponse,
  DeleteEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventDataStoreRequest,
  output: DeleteEventDataStoreResponse,
  errors: [
    ChannelExistsForEDSException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreFederationEnabledException,
    EventDataStoreHasOngoingImportException,
    EventDataStoreNotFoundException,
    EventDataStoreTerminationProtectedException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventDataStore",
}));

export type DeleteResourcePolicyError =
  | ConflictException
  | OperationNotPermittedException
  | ResourceARNNotValidException
  | ResourceNotFoundException
  | ResourcePolicyNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to the CloudTrail event data store, dashboard, or channel.
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
    ConflictException,
    OperationNotPermittedException,
    ResourceARNNotValidException,
    ResourceNotFoundException,
    ResourcePolicyNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteTrailError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a trail. This operation must be called from the Region in which the trail was
 * created. `DeleteTrail` cannot be called on the shadow trails (replicated trails
 * in other Regions) of a trail that is enabled in all Regions.
 *
 * While deleting a CloudTrail trail is an irreversible action, CloudTrail does not
 * delete log files in the Amazon S3 bucket for that trail, the Amazon S3 bucket itself, or the
 * CloudWatchlog group to which the trail delivers events. Deleting a multi-Region trail
 * will stop logging of events in all Amazon Web Services Regions enabled in your Amazon Web Services account. Deleting a
 * single-Region trail will stop logging of events in that Region only. It will not stop
 * logging of events in other Regions even if the trails in those other Regions have
 * identical names to the deleted trail.
 *
 * For information about account closure and deletion of CloudTrail trails, see https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-account-closure.html.
 */
export const deleteTrail: API.OperationMethod<
  DeleteTrailRequest,
  DeleteTrailResponse,
  DeleteTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrailRequest,
  output: DeleteTrailResponse,
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrail",
}));

export type DeregisterOrganizationDelegatedAdminError =
  | AccountNotFoundException
  | AccountNotRegisteredException
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NotOrganizationManagementAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes CloudTrail delegated administrator permissions from a member account in
 * an organization.
 */
export const deregisterOrganizationDelegatedAdmin: API.OperationMethod<
  DeregisterOrganizationDelegatedAdminRequest,
  DeregisterOrganizationDelegatedAdminResponse,
  DeregisterOrganizationDelegatedAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterOrganizationDelegatedAdminRequest,
  output: DeregisterOrganizationDelegatedAdminResponse,
  errors: [
    AccountNotFoundException,
    AccountNotRegisteredException,
    CloudTrailAccessNotEnabledException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NotOrganizationManagementAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterOrganizationDelegatedAdmin",
}));

export type DescribeQueryError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | QueryIdNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns metadata about a query, including query run time in milliseconds, number of
 * events scanned and matched, and query status. If the query results were delivered to an S3 bucket,
 * the response also provides the S3 URI and the delivery status.
 *
 * You must specify either `QueryId` or `QueryAlias`. Specifying the `QueryAlias` parameter
 * returns information about the last query run for the alias. You can provide
 * `RefreshId` along with `QueryAlias` to view the query results
 * of a dashboard query for the specified `RefreshId`.
 */
export const describeQuery: API.OperationMethod<
  DescribeQueryRequest,
  DescribeQueryResponse,
  DescribeQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeQueryRequest,
  output: DescribeQueryResponse,
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    QueryIdNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQuery",
}));

export type DescribeTrailsError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves settings for one or more trails associated with the current Region for your
 * account.
 */
export const describeTrails: API.OperationMethod<
  DescribeTrailsRequest,
  DescribeTrailsResponse,
  DescribeTrailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTrailsRequest,
  output: DescribeTrailsResponse,
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrails",
}));

export type DisableFederationError =
  | AccessDeniedException
  | CloudTrailAccessNotEnabledException
  | ConcurrentModificationException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Disables Lake query federation on the specified event data store. When you disable federation, CloudTrail disables
 * the integration with Glue, Lake Formation, and Amazon Athena.
 * After disabling Lake query federation, you can no longer query your event data in Amazon Athena.
 *
 * No CloudTrail Lake data is deleted when you disable federation and you can continue to run queries in CloudTrail Lake.
 */
export const disableFederation: API.OperationMethod<
  DisableFederationRequest,
  DisableFederationResponse,
  DisableFederationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableFederationRequest,
  output: DisableFederationResponse,
  errors: [
    AccessDeniedException,
    CloudTrailAccessNotEnabledException,
    ConcurrentModificationException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableFederation",
}));

export type EnableFederationError =
  | AccessDeniedException
  | CloudTrailAccessNotEnabledException
  | ConcurrentModificationException
  | EventDataStoreARNInvalidException
  | EventDataStoreFederationEnabledException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Enables Lake query federation on the specified event data store. Federating an event data store lets you view the metadata associated with the event data store in the Glue
 * Data Catalog and run
 * SQL queries against your event data using Amazon Athena. The table metadata stored in the Glue Data Catalog
 * lets the Athena query engine know how to find, read, and process the data that you want to query.
 *
 * When you enable Lake query federation, CloudTrail
 * creates a managed database named `aws:cloudtrail` (if the database doesn't already exist) and a managed federated table in
 * the Glue Data Catalog. The event data store ID is used for the table name. CloudTrail registers the role ARN and event data store in
 * Lake Formation, the service responsible for allowing fine-grained access control
 * of the federated resources in the Glue Data Catalog.
 *
 * For more information about Lake query federation, see Federate an event data store.
 */
export const enableFederation: API.OperationMethod<
  EnableFederationRequest,
  EnableFederationResponse,
  EnableFederationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableFederationRequest,
  output: EnableFederationResponse,
  errors: [
    AccessDeniedException,
    CloudTrailAccessNotEnabledException,
    ConcurrentModificationException,
    EventDataStoreARNInvalidException,
    EventDataStoreFederationEnabledException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableFederation",
}));

export type GenerateQueryError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | GenerateResponseException
  | InactiveEventDataStoreException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Generates a query from a natural language prompt. This operation uses generative artificial intelligence
 * (generative AI) to produce a ready-to-use SQL query from the prompt.
 *
 * The prompt can be a question or a statement about the event data
 * in your event data store. For example, you can enter prompts like "What are my
 * top errors in the past month?" and “Give me a list of users that used SNS.”
 *
 * The prompt must be in English. For information about limitations, permissions, and supported Regions, see
 * Create CloudTrail Lake queries from natural language prompts
 * in the *CloudTrail * user guide.
 *
 * Do not include any personally identifying, confidential, or sensitive information
 * in your prompts.
 *
 * This feature uses generative AI large language models (LLMs); we recommend double-checking the
 * LLM response.
 */
export const generateQuery: API.OperationMethod<
  GenerateQueryRequest,
  GenerateQueryResponse,
  GenerateQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateQueryRequest,
  output: GenerateQueryResponse,
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    GenerateResponseException,
    InactiveEventDataStoreException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateQuery",
}));

export type GetChannelError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a specific channel.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelRequest,
  output: GetChannelResponse,
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
}));

export type GetDashboardError =
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns the specified dashboard.
 */
export const getDashboard: API.OperationMethod<
  GetDashboardRequest,
  GetDashboardResponse,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDashboardRequest,
  output: GetDashboardResponse,
  errors: [ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
}));

export type GetEventConfigurationError =
  | CloudTrailARNInvalidException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the current event configuration settings for the specified event data store or trail. The response includes maximum event size configuration, the context key selectors configured for the event data store, and any aggregation settings configured for the trail.
 */
export const getEventConfiguration: API.OperationMethod<
  GetEventConfigurationRequest,
  GetEventConfigurationResponse,
  GetEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventConfigurationRequest,
  output: GetEventConfigurationResponse,
  errors: [
    CloudTrailARNInvalidException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventConfiguration",
}));

export type GetEventDataStoreError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about an event data store specified as either an ARN or the ID
 * portion of the ARN.
 */
export const getEventDataStore: API.OperationMethod<
  GetEventDataStoreRequest,
  GetEventDataStoreResponse,
  GetEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventDataStoreRequest,
  output: GetEventDataStoreResponse,
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventDataStore",
}));

export type GetEventSelectorsError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Describes the settings for the event selectors that you configured for your trail. The
 * information returned for your event selectors includes the following:
 *
 * - If your event selector includes read-only events, write-only events, or all
 * events. This applies to management events, data events, and network activity events.
 *
 * - If your event selector includes management events.
 *
 * - If your event selector includes network activity events, the event sources
 * for which you are logging network activity events.
 *
 * - If your event selector includes data events, the resources on which you are
 * logging data events.
 *
 * For more information about logging management, data, and network activity events, see the following topics
 * in the *CloudTrail User Guide*:
 *
 * - Logging management events
 *
 * - Logging data events
 *
 * - Logging network activity events
 */
export const getEventSelectors: API.OperationMethod<
  GetEventSelectorsRequest,
  GetEventSelectorsResponse,
  GetEventSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventSelectorsRequest,
  output: GetEventSelectorsResponse,
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventSelectors",
}));

export type GetImportError =
  | ImportNotFoundException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a specific import.
 */
export const getImport: API.OperationMethod<
  GetImportRequest,
  GetImportResponse,
  GetImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportRequest,
  output: GetImportResponse,
  errors: [
    ImportNotFoundException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImport",
}));

export type GetInsightSelectorsError =
  | CloudTrailARNInvalidException
  | InsightNotEnabledException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Describes the settings for the Insights event selectors that you configured for your
 * trail or event data store. `GetInsightSelectors` shows if CloudTrail Insights logging is enabled
 * and which Insights types are configured with corresponding event categories. If you run
 * `GetInsightSelectors` on a trail or event data store that does not have Insights events enabled,
 * the operation throws the exception `InsightNotEnabledException`
 *
 * Specify either the `EventDataStore` parameter to get Insights event selectors for an event data store,
 * or the `TrailName` parameter to the get Insights event selectors for a trail. You cannot specify these parameters together.
 *
 * For more information, see Working with CloudTrail Insights in the *CloudTrail User Guide*.
 */
export const getInsightSelectors: API.OperationMethod<
  GetInsightSelectorsRequest,
  GetInsightSelectorsResponse,
  GetInsightSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInsightSelectorsRequest,
  output: GetInsightSelectorsResponse,
  errors: [
    CloudTrailARNInvalidException,
    InsightNotEnabledException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightSelectors",
}));

export type GetQueryResultsError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | QueryIdNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Gets event data results of a query. You must specify the `QueryID` value
 * returned by the `StartQuery` operation.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsRequest,
  GetQueryResultsResponse,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetQueryResultsRequest,
  output: GetQueryResultsResponse,
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    QueryIdNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type GetResourcePolicyError =
  | OperationNotPermittedException
  | ResourceARNNotValidException
  | ResourceNotFoundException
  | ResourcePolicyNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Retrieves the JSON text of the resource-based policy document attached to the CloudTrail event data store, dashboard, or channel.
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
    OperationNotPermittedException,
    ResourceARNNotValidException,
    ResourceNotFoundException,
    ResourcePolicyNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetTrailError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns settings information for a specified trail.
 */
export const getTrail: API.OperationMethod<
  GetTrailRequest,
  GetTrailResponse,
  GetTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrailRequest,
  output: GetTrailResponse,
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrail",
}));

export type GetTrailStatusError =
  | CloudTrailARNInvalidException
  | InvalidTrailNameException
  | OperationNotPermittedException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a JSON-formatted list of information about the specified trail. Fields include
 * information on delivery errors, Amazon SNS and Amazon S3 errors, and start
 * and stop logging times for each trail. This operation returns trail status from a single
 * Region. To return trail status from all Regions, you must call the operation on each
 * Region.
 */
export const getTrailStatus: API.OperationMethod<
  GetTrailStatusRequest,
  GetTrailStatusResponse,
  GetTrailStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrailStatusRequest,
  output: GetTrailStatusResponse,
  errors: [
    CloudTrailARNInvalidException,
    InvalidTrailNameException,
    OperationNotPermittedException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrailStatus",
}));

export type ListChannelsError =
  | InvalidNextTokenException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the channels in the current account, and their source names.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [
    InvalidNextTokenException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDashboardsError = UnsupportedOperationException | CommonErrors;
/**
 * Returns information about all dashboards in the account, in the current Region.
 */
export const listDashboards: API.OperationMethod<
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDashboardsRequest,
  output: ListDashboardsResponse,
  errors: [UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
}));

export type ListEventDataStoresError =
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about all event data stores in the account, in the current
 * Region.
 */
export const listEventDataStores: API.PaginatedOperationMethod<
  ListEventDataStoresRequest,
  ListEventDataStoresResponse,
  ListEventDataStoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventDataStoresRequest,
  output: ListEventDataStoresResponse,
  errors: [
    InvalidMaxResultsException,
    InvalidNextTokenException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventDataStores",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImportFailuresError =
  | InvalidNextTokenException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of failures for the specified import.
 */
export const listImportFailures: API.PaginatedOperationMethod<
  ListImportFailuresRequest,
  ListImportFailuresResponse,
  ListImportFailuresError,
  Credentials | HttpClient.HttpClient,
  ImportFailureListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportFailuresRequest,
  output: ListImportFailuresResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportFailures",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Failures",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListImportsError =
  | EventDataStoreARNInvalidException
  | InvalidNextTokenException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information on all imports, or a select set of imports by
 * `ImportStatus` or `Destination`.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  ImportsListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportsRequest,
  output: ListImportsResponse,
  errors: [
    EventDataStoreARNInvalidException,
    InvalidNextTokenException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Imports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInsightsDataError =
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns Insights events generated on a trail that logs data events. You can list Insights events that occurred in a Region within the last 90 days.
 *
 * ListInsightsData supports the following Dimensions for Insights events:
 *
 * - Event ID
 *
 * - Event name
 *
 * - Event source
 *
 * All dimensions are optional. The default number of results returned is 50, with a
 * maximum of 50 possible. The response includes a token that you can use to get the next page
 * of results.
 *
 * The rate of ListInsightsData requests is limited to two per second, per account, per Region. If
 * this limit is exceeded, a throttling error occurs.
 */
export const listInsightsData: API.PaginatedOperationMethod<
  ListInsightsDataRequest,
  ListInsightsDataResponse,
  ListInsightsDataError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInsightsDataRequest,
  output: ListInsightsDataResponse,
  errors: [
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsightsData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInsightsMetricDataError =
  | InvalidParameterException
  | InvalidTrailNameException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns Insights metrics data for trails that have enabled Insights. The request must include the `EventSource`,
 * `EventName`, and `InsightType` parameters.
 *
 * If the `InsightType` is set to `ApiErrorRateInsight`, the request must also include the `ErrorCode` parameter.
 *
 * The following are the available time periods for `ListInsightsMetricData`. Each cutoff is inclusive.
 *
 * - Data points with a period of 60 seconds (1-minute) are available for 15 days.
 *
 * - Data points with a period of 300 seconds (5-minute) are available for 63 days.
 *
 * - Data points with a period of 3600 seconds (1 hour) are available for 90 days.
 *
 * To use `ListInsightsMetricData` operation, you must have the following permissions:
 *
 * - If `ListInsightsMetricData` is invoked with `TrailName` parameter, access to the `ListInsightsMetricData` API operation is linked to the `cloudtrail:LookupEvents` action and `cloudtrail:ListInsightsData`. To use this operation,
 * you must have permissions to perform the `cloudtrail:LookupEvents` and `cloudtrail:ListInsightsData` action on the specific trail.
 *
 * - If `ListInsightsMetricData` is invoked without `TrailName` parameter, access to the `ListInsightsMetricData` API operation is linked to the `cloudtrail:LookupEvents` action only. To use this operation,
 * you must have permissions to perform the `cloudtrail:LookupEvents` action.
 */
export const listInsightsMetricData: API.PaginatedOperationMethod<
  ListInsightsMetricDataRequest,
  ListInsightsMetricDataResponse,
  ListInsightsMetricDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInsightsMetricDataRequest,
  output: ListInsightsMetricDataResponse,
  errors: [
    InvalidParameterException,
    InvalidTrailNameException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInsightsMetricData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPublicKeysError =
  | InvalidTimeRangeException
  | InvalidTokenException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns all public keys whose private keys were used to sign the digest files within the
 * specified time range. The public key is needed to validate digest files that were signed
 * with its corresponding private key.
 *
 * CloudTrail uses different private and public key pairs per Region. Each digest
 * file is signed with a private key unique to its Region. When you validate a digest file
 * from a specific Region, you must look in the same Region for its corresponding public
 * key.
 */
export const listPublicKeys: API.PaginatedOperationMethod<
  ListPublicKeysRequest,
  ListPublicKeysResponse,
  ListPublicKeysError,
  Credentials | HttpClient.HttpClient,
  PublicKey
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPublicKeysRequest,
  output: ListPublicKeysResponse,
  errors: [
    InvalidTimeRangeException,
    InvalidTokenException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublicKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PublicKeyList",
  } as const,
})) as any;

export type ListQueriesError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidDateRangeException
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidQueryStatusException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns a list of queries and query statuses for the past seven days. You must specify
 * an ARN value for `EventDataStore`. Optionally, to shorten the list of results,
 * you can specify a time range, formatted as timestamps, by adding `StartTime` and
 * `EndTime` parameters, and a `QueryStatus` value. Valid values for
 * `QueryStatus` include `QUEUED`, `RUNNING`,
 * `FINISHED`, `FAILED`, `TIMED_OUT`, or
 * `CANCELLED`.
 */
export const listQueries: API.PaginatedOperationMethod<
  ListQueriesRequest,
  ListQueriesResponse,
  ListQueriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueriesRequest,
  output: ListQueriesResponse,
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidDateRangeException,
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidQueryStatusException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsError =
  | ChannelARNInvalidException
  | CloudTrailARNInvalidException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidTokenException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists the tags for the specified trails, event data stores, dashboards, or channels in the current Region.
 */
export const listTags: API.PaginatedOperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient,
  ResourceTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
  errors: [
    ChannelARNInvalidException,
    CloudTrailARNInvalidException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidTokenException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceTagList",
  } as const,
})) as any;

export type ListTrailsError =
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists trails that are in the current account.
 */
export const listTrails: API.PaginatedOperationMethod<
  ListTrailsRequest,
  ListTrailsResponse,
  ListTrailsError,
  Credentials | HttpClient.HttpClient,
  TrailInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrailsRequest,
  output: ListTrailsResponse,
  errors: [OperationNotPermittedException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Trails",
  } as const,
})) as any;

export type LookupEventsError =
  | InvalidEventCategoryException
  | InvalidLookupAttributesException
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidTimeRangeException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Looks up management events or CloudTrail Insights events that are captured by CloudTrail.
 * You can look up events that occurred in a Region within the last 90 days.
 *
 * `LookupEvents` returns recent Insights events for trails that enable Insights. To view Insights events for an event data store, you can run queries on your
 * Insights event data store, and you can also view the Lake dashboard for Insights.
 *
 * Lookup supports the following attributes for management events:
 *
 * - Amazon Web Services access key
 *
 * - Event ID
 *
 * - Event name
 *
 * - Event source
 *
 * - Read only
 *
 * - Resource name
 *
 * - Resource type
 *
 * - User name
 *
 * Lookup supports the following attributes for Insights events:
 *
 * - Event ID
 *
 * - Event name
 *
 * - Event source
 *
 * All attributes are optional. The default number of results returned is 50, with a
 * maximum of 50 possible. The response includes a token that you can use to get the next page
 * of results.
 *
 * The rate of lookup requests is limited to two per second, per account, per Region. If
 * this limit is exceeded, a throttling error occurs.
 */
export const lookupEvents: API.PaginatedOperationMethod<
  LookupEventsRequest,
  LookupEventsResponse,
  LookupEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: LookupEventsRequest,
  output: LookupEventsResponse,
  errors: [
    InvalidEventCategoryException,
    InvalidLookupAttributesException,
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidTimeRangeException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LookupEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutEventConfigurationError =
  | CloudTrailARNInvalidException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientIAMAccessPermissionException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidHomeRegionException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the event configuration settings for the specified event data store or trail. This operation supports updating the maximum event size, adding or modifying context key selectors for event data store, and configuring aggregation settings for the trail.
 */
export const putEventConfiguration: API.OperationMethod<
  PutEventConfigurationRequest,
  PutEventConfigurationResponse,
  PutEventConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventConfigurationRequest,
  output: PutEventConfigurationResponse,
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientIAMAccessPermissionException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidHomeRegionException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventConfiguration",
}));

export type PutEventSelectorsError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventSelectorsException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Configures event selectors (also referred to as *basic event selectors*) or advanced event selectors for your trail. You can use
 * either `AdvancedEventSelectors` or `EventSelectors`, but not both. If
 * you apply `AdvancedEventSelectors` to a trail, any existing
 * `EventSelectors` are overwritten.
 *
 * You can use `AdvancedEventSelectors` to
 * log management events, data events for all resource types, and network activity events.
 *
 * You can use `EventSelectors` to log management events and data events for the following resource types:
 *
 * - `AWS::DynamoDB::Table`
 *
 * - `AWS::Lambda::Function`
 *
 * - `AWS::S3::Object`
 *
 * You can't use `EventSelectors` to log network activity events.
 *
 * If you want your trail to log Insights events, be sure the event selector or advanced event selector enables
 * logging of the Insights event types you want configured for your trail. For more information about logging Insights events, see Working with CloudTrail Insights in the *CloudTrail User Guide*.
 * By default, trails created without specific event selectors are configured to
 * log all read and write management events, and no data events or network activity events.
 *
 * When an event occurs in your account, CloudTrail evaluates the event selectors or
 * advanced event selectors in all trails. For each trail, if the event matches any event
 * selector, the trail processes and logs the event. If the event doesn't match any event
 * selector, the trail doesn't log the event.
 *
 * Example
 *
 * - You create an event selector for a trail and specify that you want to log write-only
 * events.
 *
 * - The EC2 `GetConsoleOutput` and `RunInstances` API operations
 * occur in your account.
 *
 * - CloudTrail evaluates whether the events match your event selectors.
 *
 * - The `RunInstances` is a write-only event and it matches your event
 * selector. The trail logs the event.
 *
 * - The `GetConsoleOutput` is a read-only event that doesn't match your
 * event selector. The trail doesn't log the event.
 *
 * The `PutEventSelectors` operation must be called from the Region in which the
 * trail was created; otherwise, an `InvalidHomeRegionException` exception is
 * thrown.
 *
 * You can configure up to five event selectors for each trail.
 *
 * You can add advanced event selectors, and conditions for your advanced event selectors,
 * up to a maximum of 500 values for all conditions and selectors on a trail. For more information, see
 * Logging management events, Logging
 * data events, Logging
 * network activity events, and Quotas in CloudTrail in the CloudTrail User
 * Guide.
 */
export const putEventSelectors: API.OperationMethod<
  PutEventSelectorsRequest,
  PutEventSelectorsResponse,
  PutEventSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventSelectorsRequest,
  output: PutEventSelectorsResponse,
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventSelectorsException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventSelectors",
}));

export type PutInsightSelectorsError =
  | CloudTrailARNInvalidException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InvalidHomeRegionException
  | InvalidInsightSelectorsException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidTrailNameException
  | KmsException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | S3BucketDoesNotExistException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lets you enable Insights event logging on specific event categories by specifying the Insights selectors that you
 * want to enable on an existing trail or event data store. You also use `PutInsightSelectors` to turn
 * off Insights event logging, by passing an empty list of Insights types. The valid Insights
 * event types are `ApiErrorRateInsight` and
 * `ApiCallRateInsight`, and valid EventCategories are `Management` and `Data`.
 *
 * Insights on data events are not supported on event data stores. For event data stores, you can only enable Insights on management events.
 *
 * To enable Insights on an event data store, you must specify the ARNs (or ID suffix of the ARNs) for the source event data store (`EventDataStore`) and the destination event data store (`InsightsDestination`). The source event data store logs management events and enables Insights.
 * The destination event data store logs Insights events based upon the management event activity of the source event data store. The source and destination event data stores must belong to the same Amazon Web Services account.
 *
 * To log Insights events for a trail, you must specify the name (`TrailName`) of the CloudTrail trail for which you want to change or add Insights
 * selectors.
 *
 * - For Management events Insights: To log CloudTrail Insights on the API call rate, the trail or event data store must log `write` management events.
 * To log CloudTrail Insights on the API error rate, the trail or event data store must log `read` or `write` management events.
 *
 * - For Data events Insights: To log CloudTrail Insights on the API call rate or API error rate, the trail must log `read` or `write` data events. Data events Insights are not supported on event data store.
 *
 * To log CloudTrail Insights events on API call volume, the trail or event data store
 * must log `write` management events. To log CloudTrail
 * Insights events on API error rate, the trail or event data store must log `read` or
 * `write` management events. You can call `GetEventSelectors` on a trail
 * to check whether the trail logs management events. You can call `GetEventDataStore` on an
 * event data store to check whether the event data store logs management events.
 *
 * For more information, see Working with CloudTrail Insights in the *CloudTrail User Guide*.
 */
export const putInsightSelectors: API.OperationMethod<
  PutInsightSelectorsRequest,
  PutInsightSelectorsResponse,
  PutInsightSelectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInsightSelectorsRequest,
  output: PutInsightSelectorsResponse,
  errors: [
    CloudTrailARNInvalidException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InvalidHomeRegionException,
    InvalidInsightSelectorsException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidTrailNameException,
    KmsException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    S3BucketDoesNotExistException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInsightSelectors",
}));

export type PutResourcePolicyError =
  | ConflictException
  | OperationNotPermittedException
  | ResourceARNNotValidException
  | ResourceNotFoundException
  | ResourcePolicyNotValidException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Attaches a resource-based permission policy to a CloudTrail event data store, dashboard, or channel. For more information about resource-based policies, see
 * CloudTrail resource-based policy examples
 * in the *CloudTrail User Guide*.
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
    OperationNotPermittedException,
    ResourceARNNotValidException,
    ResourceNotFoundException,
    ResourcePolicyNotValidException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RegisterOrganizationDelegatedAdminError =
  | AccountNotFoundException
  | AccountRegisteredException
  | CannotDelegateManagementAccountException
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | DelegatedAdminAccountLimitExceededException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientIAMAccessPermissionException
  | InvalidParameterException
  | NotOrganizationManagementAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Registers an organization’s member account as the CloudTrail delegated administrator.
 */
export const registerOrganizationDelegatedAdmin: API.OperationMethod<
  RegisterOrganizationDelegatedAdminRequest,
  RegisterOrganizationDelegatedAdminResponse,
  RegisterOrganizationDelegatedAdminError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterOrganizationDelegatedAdminRequest,
  output: RegisterOrganizationDelegatedAdminResponse,
  errors: [
    AccountNotFoundException,
    AccountRegisteredException,
    CannotDelegateManagementAccountException,
    CloudTrailAccessNotEnabledException,
    ConflictException,
    DelegatedAdminAccountLimitExceededException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientIAMAccessPermissionException,
    InvalidParameterException,
    NotOrganizationManagementAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOrganizationDelegatedAdmin",
}));

export type RemoveTagsError =
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | CloudTrailARNInvalidException
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidTagParameterException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Removes the specified tags from a trail, event data store, dashboard, or channel.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsRequest,
  RemoveTagsResponse,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsRequest,
  output: RemoveTagsResponse,
  errors: [
    ChannelARNInvalidException,
    ChannelNotFoundException,
    CloudTrailARNInvalidException,
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidTagParameterException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

export type RestoreEventDataStoreError =
  | CloudTrailAccessNotEnabledException
  | EventDataStoreARNInvalidException
  | EventDataStoreMaxLimitExceededException
  | EventDataStoreNotFoundException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventDataStoreStatusException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Restores a deleted event data store specified by `EventDataStore`, which
 * accepts an event data store ARN. You can only restore a deleted event data store within the
 * seven-day wait period after deletion. Restoring an event data store can take several
 * minutes, depending on the size of the event data store.
 */
export const restoreEventDataStore: API.OperationMethod<
  RestoreEventDataStoreRequest,
  RestoreEventDataStoreResponse,
  RestoreEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreEventDataStoreRequest,
  output: RestoreEventDataStoreResponse,
  errors: [
    CloudTrailAccessNotEnabledException,
    EventDataStoreARNInvalidException,
    EventDataStoreMaxLimitExceededException,
    EventDataStoreNotFoundException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventDataStoreStatusException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreEventDataStore",
}));

export type SearchSampleQueriesError =
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Searches sample queries and returns a list of sample queries that are sorted by relevance.
 * To search for sample queries, provide a natural language `SearchPhrase` in English.
 */
export const searchSampleQueries: API.OperationMethod<
  SearchSampleQueriesRequest,
  SearchSampleQueriesResponse,
  SearchSampleQueriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchSampleQueriesRequest,
  output: SearchSampleQueriesResponse,
  errors: [
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSampleQueries",
}));

export type StartDashboardRefreshError =
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts a refresh of the specified dashboard.
 *
 * Each time a dashboard is refreshed, CloudTrail runs queries to populate the dashboard's widgets. CloudTrail must be granted permissions to run the `StartQuery` operation on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to each event data store. For more information,
 * see Example: Allow CloudTrail to run queries to populate a dashboard in the *CloudTrail User Guide*.
 */
export const startDashboardRefresh: API.OperationMethod<
  StartDashboardRefreshRequest,
  StartDashboardRefreshResponse,
  StartDashboardRefreshError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDashboardRefreshRequest,
  output: StartDashboardRefreshResponse,
  errors: [
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDashboardRefresh",
}));

export type StartEventDataStoreIngestionError =
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts the ingestion of live events on an event data store specified as either an ARN or the ID portion of the ARN. To start ingestion, the event data store `Status` must be `STOPPED_INGESTION`
 * and the `eventCategory` must be `Management`, `Data`, `NetworkActivity`, or `ConfigurationItem`.
 */
export const startEventDataStoreIngestion: API.OperationMethod<
  StartEventDataStoreIngestionRequest,
  StartEventDataStoreIngestionResponse,
  StartEventDataStoreIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartEventDataStoreIngestionRequest,
  output: StartEventDataStoreIngestionResponse,
  errors: [
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEventDataStoreIngestion",
}));

export type StartImportError =
  | AccountHasOngoingImportException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | ImportNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidImportSourceException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts an import of logged trail events from a source S3 bucket to a destination event
 * data store. By default, CloudTrail only imports events contained in the S3 bucket's
 * `CloudTrail` prefix and the prefixes inside the `CloudTrail` prefix, and does not check prefixes for other Amazon Web Services
 * services. If you want to import CloudTrail events contained in another prefix, you
 * must include the prefix in the `S3LocationUri`. For more considerations about
 * importing trail events, see Considerations for copying trail events in the *CloudTrail User Guide*.
 *
 * When you start a new import, the `Destinations` and
 * `ImportSource` parameters are required. Before starting a new import, disable
 * any access control lists (ACLs) attached to the source S3 bucket. For more information
 * about disabling ACLs, see Controlling ownership of
 * objects and disabling ACLs for your bucket.
 *
 * When you retry an import, the `ImportID` parameter is required.
 *
 * If the destination event data store is for an organization, you must use the
 * management account to import trail events. You cannot use the delegated administrator
 * account for the organization.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportRequest,
  output: StartImportResponse,
  errors: [
    AccountHasOngoingImportException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    ImportNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidImportSourceException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
}));

export type StartLoggingError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts the recording of Amazon Web Services API calls and log file delivery for a trail.
 * For a trail that is enabled in all Regions, this operation must be called from the Region
 * in which the trail was created. This operation cannot be called on the shadow trails
 * (replicated trails in other Regions) of a trail that is enabled in all Regions.
 */
export const startLogging: API.OperationMethod<
  StartLoggingRequest,
  StartLoggingResponse,
  StartLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartLoggingRequest,
  output: StartLoggingResponse,
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLogging",
}));

export type StartQueryError =
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InvalidParameterException
  | InvalidQueryStatementException
  | InvalidS3BucketNameException
  | InvalidS3PrefixException
  | MaxConcurrentQueriesException
  | NoManagementAccountSLRExistsException
  | OperationNotPermittedException
  | S3BucketDoesNotExistException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Starts a CloudTrail Lake query. Use the `QueryStatement`
 * parameter to provide your SQL query, enclosed in single quotation marks. Use the optional
 * `DeliveryS3Uri` parameter to deliver the query results to an S3
 * bucket.
 *
 * `StartQuery` requires you specify either the `QueryStatement` parameter, or a `QueryAlias` and any `QueryParameters`. In the current release,
 * the `QueryAlias` and `QueryParameters` parameters are used only for the queries that populate the CloudTrail Lake dashboards.
 */
export const startQuery: API.OperationMethod<
  StartQueryRequest,
  StartQueryResponse,
  StartQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQueryRequest,
  output: StartQueryResponse,
  errors: [
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InvalidParameterException,
    InvalidQueryStatementException,
    InvalidS3BucketNameException,
    InvalidS3PrefixException,
    MaxConcurrentQueriesException,
    NoManagementAccountSLRExistsException,
    OperationNotPermittedException,
    S3BucketDoesNotExistException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuery",
}));

export type StopEventDataStoreIngestionError =
  | ConflictException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidEventDataStoreCategoryException
  | InvalidEventDataStoreStatusException
  | InvalidParameterException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Stops the ingestion of live events on an event data store specified as either an ARN or the ID portion of the ARN. To stop ingestion, the event data store `Status` must be `ENABLED`
 * and the `eventCategory` must be `Management`, `Data`, `NetworkActivity`, or `ConfigurationItem`.
 */
export const stopEventDataStoreIngestion: API.OperationMethod<
  StopEventDataStoreIngestionRequest,
  StopEventDataStoreIngestionResponse,
  StopEventDataStoreIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopEventDataStoreIngestionRequest,
  output: StopEventDataStoreIngestionResponse,
  errors: [
    ConflictException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidEventDataStoreCategoryException,
    InvalidEventDataStoreStatusException,
    InvalidParameterException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEventDataStoreIngestion",
}));

export type StopImportError =
  | ImportNotFoundException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Stops a specified import.
 */
export const stopImport: API.OperationMethod<
  StopImportRequest,
  StopImportResponse,
  StopImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopImportRequest,
  output: StopImportResponse,
  errors: [
    ImportNotFoundException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopImport",
}));

export type StopLoggingError =
  | CloudTrailARNInvalidException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InvalidHomeRegionException
  | InvalidTrailNameException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | ThrottlingException
  | TrailNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Suspends the recording of Amazon Web Services API calls and log file delivery for the
 * specified trail. Under most circumstances, there is no need to use this action. You can
 * update a trail without stopping it first. This action is the only way to stop recording.
 * For a trail enabled in all Regions, this operation must be called from the Region in which
 * the trail was created, or an `InvalidHomeRegionException` will occur. This
 * operation cannot be called on the shadow trails (replicated trails in other Regions) of a
 * trail enabled in all Regions.
 */
export const stopLogging: API.OperationMethod<
  StopLoggingRequest,
  StopLoggingResponse,
  StopLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopLoggingRequest,
  output: StopLoggingResponse,
  errors: [
    CloudTrailARNInvalidException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InvalidHomeRegionException,
    InvalidTrailNameException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    ThrottlingException,
    TrailNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopLogging",
}));

export type UpdateChannelError =
  | ChannelAlreadyExistsException
  | ChannelARNInvalidException
  | ChannelNotFoundException
  | EventDataStoreARNInvalidException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InvalidEventDataStoreCategoryException
  | InvalidParameterException
  | OperationNotPermittedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates a channel specified by a required channel ARN or UUID.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelRequest,
  output: UpdateChannelResponse,
  errors: [
    ChannelAlreadyExistsException,
    ChannelARNInvalidException,
    ChannelNotFoundException,
    EventDataStoreARNInvalidException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InvalidEventDataStoreCategoryException,
    InvalidParameterException,
    OperationNotPermittedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateDashboardError =
  | ConflictException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientEncryptionPolicyException
  | InvalidQueryStatementException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the specified dashboard.
 *
 * To set a refresh schedule, CloudTrail must be granted permissions to run the `StartDashboardRefresh` operation to refresh the dashboard on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to the dashboard. For more information,
 * see
 * Resource-based policy example for a dashboard in the *CloudTrail User Guide*.
 *
 * CloudTrail runs queries to populate the dashboard's widgets during a manual or scheduled refresh. CloudTrail must be granted permissions to run the `StartQuery` operation on your behalf. To provide permissions, run the `PutResourcePolicy` operation to attach a resource-based policy to each event data store. For more information,
 * see Example: Allow CloudTrail to run queries to populate a dashboard in the *CloudTrail User Guide*.
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
    ConflictException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientEncryptionPolicyException,
    InvalidQueryStatementException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDashboard",
}));

export type UpdateEventDataStoreError =
  | CloudTrailAccessNotEnabledException
  | ConflictException
  | EventDataStoreAlreadyExistsException
  | EventDataStoreARNInvalidException
  | EventDataStoreHasOngoingImportException
  | EventDataStoreNotFoundException
  | InactiveEventDataStoreException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InvalidEventSelectorsException
  | InvalidInsightSelectorsException
  | InvalidKmsKeyIdException
  | InvalidParameterException
  | KmsException
  | KmsKeyNotFoundException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates an event data store. The required `EventDataStore` value is an ARN or
 * the ID portion of the ARN. Other parameters are optional, but at least one optional
 * parameter must be specified, or CloudTrail throws an error.
 * `RetentionPeriod` is in days, and valid values are integers between 7 and
 * 3653 if the `BillingMode` is set to `EXTENDABLE_RETENTION_PRICING`, or between 7 and 2557 if `BillingMode` is set to `FIXED_RETENTION_PRICING`. By default, `TerminationProtection` is enabled.
 *
 * For event data stores for CloudTrail events, `AdvancedEventSelectors`
 * includes or excludes management, data, or network activity events in your event data store. For more
 * information about `AdvancedEventSelectors`, see AdvancedEventSelectors.
 *
 * For event data stores for CloudTrail Insights events, Config configuration items, Audit Manager evidence, or non-Amazon Web Services events,
 * `AdvancedEventSelectors` includes events of that type in your event data store.
 */
export const updateEventDataStore: API.OperationMethod<
  UpdateEventDataStoreRequest,
  UpdateEventDataStoreResponse,
  UpdateEventDataStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventDataStoreRequest,
  output: UpdateEventDataStoreResponse,
  errors: [
    CloudTrailAccessNotEnabledException,
    ConflictException,
    EventDataStoreAlreadyExistsException,
    EventDataStoreARNInvalidException,
    EventDataStoreHasOngoingImportException,
    EventDataStoreNotFoundException,
    InactiveEventDataStoreException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InvalidEventSelectorsException,
    InvalidInsightSelectorsException,
    InvalidKmsKeyIdException,
    InvalidParameterException,
    KmsException,
    KmsKeyNotFoundException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventDataStore",
}));

export type UpdateTrailError =
  | CloudTrailAccessNotEnabledException
  | CloudTrailARNInvalidException
  | CloudTrailInvalidClientTokenIdException
  | CloudWatchLogsDeliveryUnavailableException
  | ConflictException
  | InsufficientDependencyServiceAccessPermissionException
  | InsufficientEncryptionPolicyException
  | InsufficientS3BucketPolicyException
  | InsufficientSnsTopicPolicyException
  | InvalidCloudWatchLogsLogGroupArnException
  | InvalidCloudWatchLogsRoleArnException
  | InvalidEventSelectorsException
  | InvalidHomeRegionException
  | InvalidKmsKeyIdException
  | InvalidParameterCombinationException
  | InvalidParameterException
  | InvalidS3BucketNameException
  | InvalidS3PrefixException
  | InvalidSnsTopicNameException
  | InvalidTrailNameException
  | KmsException
  | KmsKeyDisabledException
  | KmsKeyNotFoundException
  | NoManagementAccountSLRExistsException
  | NotOrganizationMasterAccountException
  | OperationNotPermittedException
  | OrganizationNotInAllFeaturesModeException
  | OrganizationsNotInUseException
  | S3BucketDoesNotExistException
  | ThrottlingException
  | TrailNotFoundException
  | TrailNotProvidedException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates trail settings that control what events you are logging, and how to handle log
 * files. Changes to a trail do not require stopping the CloudTrail service. Use this
 * action to designate an existing bucket for log delivery. If the existing bucket has
 * previously been a target for CloudTrail log files, an IAM policy
 * exists for the bucket. `UpdateTrail` must be called from the Region in which the
 * trail was created; otherwise, an `InvalidHomeRegionException` is thrown.
 */
export const updateTrail: API.OperationMethod<
  UpdateTrailRequest,
  UpdateTrailResponse,
  UpdateTrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTrailRequest,
  output: UpdateTrailResponse,
  errors: [
    CloudTrailAccessNotEnabledException,
    CloudTrailARNInvalidException,
    CloudTrailInvalidClientTokenIdException,
    CloudWatchLogsDeliveryUnavailableException,
    ConflictException,
    InsufficientDependencyServiceAccessPermissionException,
    InsufficientEncryptionPolicyException,
    InsufficientS3BucketPolicyException,
    InsufficientSnsTopicPolicyException,
    InvalidCloudWatchLogsLogGroupArnException,
    InvalidCloudWatchLogsRoleArnException,
    InvalidEventSelectorsException,
    InvalidHomeRegionException,
    InvalidKmsKeyIdException,
    InvalidParameterCombinationException,
    InvalidParameterException,
    InvalidS3BucketNameException,
    InvalidS3PrefixException,
    InvalidSnsTopicNameException,
    InvalidTrailNameException,
    KmsException,
    KmsKeyDisabledException,
    KmsKeyNotFoundException,
    NoManagementAccountSLRExistsException,
    NotOrganizationMasterAccountException,
    OperationNotPermittedException,
    OrganizationNotInAllFeaturesModeException,
    OrganizationsNotInUseException,
    S3BucketDoesNotExistException,
    ThrottlingException,
    TrailNotFoundException,
    TrailNotProvidedException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrail",
}));
