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
const ns = T.XmlNamespace(
  "http://elasticloadbalancing.amazonaws.com/doc/2015-12-01/",
);
const svc = T.AwsApiService({
  sdkId: "Elastic Load Balancing v2",
  serviceShapeName: "ElasticLoadBalancing_v10",
});
const auth = T.AwsAuthSigv4({ name: "elasticloadbalancing" });
const ver = T.ServiceVersion("2015-12-01");
const proto = T.AwsProtocolsAwsQuery();
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
              `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://elasticloadbalancing.${Region}.amazonaws.com`);
            }
            return e(
              `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AllocationIdNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AllocationIdNotFoundException>()(
    "AllocationIdNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AllocationIdNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ALPNPolicyNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ALPNPolicyNotSupportedException>()(
    "ALPNPolicyNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ALPNPolicyNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AvailabilityZoneNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<AvailabilityZoneNotSupportedException>()(
    "AvailabilityZoneNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AvailabilityZoneNotSupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CaCertificatesBundleNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CaCertificatesBundleNotFoundException>()(
    "CaCertificatesBundleNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CaCertificatesBundleNotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CapacityDecreaseRequestsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CapacityDecreaseRequestsLimitExceededException>()(
    "CapacityDecreaseRequestsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CapacityDecreaseRequestLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CapacityReservationPendingException
  extends /*@__PURE__*/ S.TaggedError<CapacityReservationPendingException>()(
    "CapacityReservationPendingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CapacityReservationPending",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CapacityUnitsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CapacityUnitsLimitExceededException>()(
    "CapacityUnitsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CapacityUnitsLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CertificateNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CertificateNotFoundException>()(
    "CertificateNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "CertificateNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DeleteAssociationSameAccountException
  extends /*@__PURE__*/ S.TaggedError<DeleteAssociationSameAccountException>()(
    "DeleteAssociationSameAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DeleteAssociationSameAccount",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateListenerException
  extends /*@__PURE__*/ S.TaggedError<DuplicateListenerException>()(
    "DuplicateListenerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "DuplicateListener", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateLoadBalancerNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicateLoadBalancerNameException>()(
    "DuplicateLoadBalancerNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DuplicateLoadBalancerName",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ S.TaggedError<DuplicateTagKeysException>()(
    "DuplicateTagKeysException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "DuplicateTagKeys", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateTargetGroupNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicateTargetGroupNameException>()(
    "DuplicateTargetGroupNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DuplicateTargetGroupName",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateTrustStoreNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicateTrustStoreNameException>()(
    "DuplicateTrustStoreNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DuplicateTrustStoreName",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HealthUnavailableException
  extends /*@__PURE__*/ S.TaggedError<HealthUnavailableException>()(
    "HealthUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "HealthUnavailable", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class IncompatibleProtocolsException
  extends /*@__PURE__*/ S.TaggedError<IncompatibleProtocolsException>()(
    "IncompatibleProtocolsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "IncompatibleProtocols", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCapacityException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapacityException>()(
    "InsufficientCapacityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InsufficientCapacity", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidCaCertificatesBundleException
  extends /*@__PURE__*/ S.TaggedError<InvalidCaCertificatesBundleException>()(
    "InvalidCaCertificatesBundleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCaCertificatesBundle",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidConfigurationRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationRequestException>()(
    "InvalidConfigurationRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidConfigurationRequest",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidLoadBalancerActionException
  extends /*@__PURE__*/ S.TaggedError<InvalidLoadBalancerActionException>()(
    "InvalidLoadBalancerActionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidLoadBalancerAction",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRevocationContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidRevocationContentException>()(
    "InvalidRevocationContentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidRevocationContent",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSchemeException
  extends /*@__PURE__*/ S.TaggedError<InvalidSchemeException>()(
    "InvalidSchemeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidScheme", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSecurityGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidSecurityGroupException>()(
    "InvalidSecurityGroupException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSecurityGroup", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnetException
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnetException>()(
    "InvalidSubnetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTargetException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetException>()(
    "InvalidTargetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidTarget", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ListenerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ListenerNotFoundException>()(
    "ListenerNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ListenerNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LoadBalancerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LoadBalancerNotFoundException>()(
    "LoadBalancerNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "LoadBalancerNotFound", httpResponseCode: 400 }),
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
export class PriorityInUseException
  extends /*@__PURE__*/ S.TaggedError<PriorityInUseException>()(
    "PriorityInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "PriorityInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PriorRequestNotCompleteException
  extends /*@__PURE__*/ S.TaggedError<PriorRequestNotCompleteException>()(
    "PriorRequestNotCompleteException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "PriorRequestNotComplete",
        httpResponseCode: 429,
      }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceInUse", httpResponseCode: 400 }),
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
export class RevocationContentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RevocationContentNotFoundException>()(
    "RevocationContentNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RevocationContentNotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RevocationIdNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RevocationIdNotFoundException>()(
    "RevocationIdNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "RevocationIdNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RuleNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RuleNotFoundException>()(
    "RuleNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "RuleNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SSLPolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SSLPolicyNotFoundException>()(
    "SSLPolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SSLPolicyNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SubnetNotFoundException>()(
    "SubnetNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TargetGroupAssociationLimitException
  extends /*@__PURE__*/ S.TaggedError<TargetGroupAssociationLimitException>()(
    "TargetGroupAssociationLimitException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TargetGroupAssociationLimit",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TargetGroupNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TargetGroupNotFoundException>()(
    "TargetGroupNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TargetGroupNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyActionsException
  extends /*@__PURE__*/ S.TaggedError<TooManyActionsException>()(
    "TooManyActionsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyActions", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyCertificatesException
  extends /*@__PURE__*/ S.TaggedError<TooManyCertificatesException>()(
    "TooManyCertificatesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyCertificates", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyListenersException
  extends /*@__PURE__*/ S.TaggedError<TooManyListenersException>()(
    "TooManyListenersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyListeners", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyLoadBalancersException
  extends /*@__PURE__*/ S.TaggedError<TooManyLoadBalancersException>()(
    "TooManyLoadBalancersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyLoadBalancers", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyRegistrationsForTargetIdException
  extends /*@__PURE__*/ S.TaggedError<TooManyRegistrationsForTargetIdException>()(
    "TooManyRegistrationsForTargetIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyRegistrationsForTargetId",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyRulesException
  extends /*@__PURE__*/ S.TaggedError<TooManyRulesException>()(
    "TooManyRulesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyRules", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyTags", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTargetGroupsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTargetGroupsException>()(
    "TooManyTargetGroupsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyTargetGroups", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTargetsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTargetsException>()(
    "TooManyTargetsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyTargets", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTrustStoreRevocationEntriesException
  extends /*@__PURE__*/ S.TaggedError<TooManyTrustStoreRevocationEntriesException>()(
    "TooManyTrustStoreRevocationEntriesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyTrustStoreRevocationEntries",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTrustStoresException
  extends /*@__PURE__*/ S.TaggedError<TooManyTrustStoresException>()(
    "TooManyTrustStoresException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyTrustStores", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyUniqueTargetGroupsPerLoadBalancerException
  extends /*@__PURE__*/ S.TaggedError<TooManyUniqueTargetGroupsPerLoadBalancerException>()(
    "TooManyUniqueTargetGroupsPerLoadBalancerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyUniqueTargetGroupsPerLoadBalancer",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrustStoreAssociationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TrustStoreAssociationNotFoundException>()(
    "TrustStoreAssociationNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AssociationNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrustStoreInUseException
  extends /*@__PURE__*/ S.TaggedError<TrustStoreInUseException>()(
    "TrustStoreInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TrustStoreInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrustStoreNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TrustStoreNotFoundException>()(
    "TrustStoreNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TrustStoreNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrustStoreNotReadyException
  extends /*@__PURE__*/ S.TaggedError<TrustStoreNotReadyException>()(
    "TrustStoreNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TrustStoreNotReady", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedProtocolException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedProtocolException>()(
    "UnsupportedProtocolException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UnsupportedProtocol", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ListenerArn = string;
export type CertificateArn = string;
export type Default = boolean;
export interface Certificate {
  CertificateArn?: string;
  IsDefault?: boolean;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    IsDefault: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export type CertificateList = Certificate[];
export const CertificateList = /*@__PURE__*/ S.Array(Certificate);
export interface AddListenerCertificatesInput {
  ListenerArn?: string;
  Certificates?: Certificate[];
}
export const AddListenerCertificatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    Certificates: S.optional(CertificateList),
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
  identifier: "AddListenerCertificatesInput",
}) as any as S.Schema<AddListenerCertificatesInput>;
export interface AddListenerCertificatesOutput {
  Certificates?: Certificate[];
}
export const AddListenerCertificatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Certificates: S.optional(CertificateList) }).pipe(ns),
).annotate({
  identifier: "AddListenerCertificatesOutput",
}) as any as S.Schema<AddListenerCertificatesOutput>;
export type ResourceArn = string;
export type ResourceArns = string[];
export const ResourceArns = /*@__PURE__*/ S.Array(S.String);
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface AddTagsInput {
  ResourceArns?: string[];
  Tags?: Tag[];
}
export const AddTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArns: S.optional(ResourceArns),
    Tags: S.optional(TagList),
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
).annotate({ identifier: "AddTagsInput" }) as any as S.Schema<AddTagsInput>;
export interface AddTagsOutput {}
export const AddTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({ identifier: "AddTagsOutput" }) as any as S.Schema<AddTagsOutput>;
export type TrustStoreArn = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3ObjectVersion = string;
export type RevocationType = "CRL" | (string & {});
export const RevocationType = /*@__PURE__*/ S.String;

export interface RevocationContent {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  RevocationType?: RevocationType;
}
export const RevocationContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3ObjectVersion: S.optional(S.String),
    RevocationType: S.optional(RevocationType),
  }),
).annotate({
  identifier: "RevocationContent",
}) as any as S.Schema<RevocationContent>;
export type RevocationContents = RevocationContent[];
export const RevocationContents = /*@__PURE__*/ S.Array(RevocationContent);
export interface AddTrustStoreRevocationsInput {
  TrustStoreArn?: string;
  RevocationContents?: RevocationContent[];
}
export const AddTrustStoreRevocationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    RevocationContents: S.optional(RevocationContents),
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
  identifier: "AddTrustStoreRevocationsInput",
}) as any as S.Schema<AddTrustStoreRevocationsInput>;
export type RevocationId = number;
export type NumberOfRevokedEntries = number;
export interface TrustStoreRevocation {
  TrustStoreArn?: string;
  RevocationId?: number;
  RevocationType?: RevocationType;
  NumberOfRevokedEntries?: number;
}
export const TrustStoreRevocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    RevocationId: S.optional(S.Number),
    RevocationType: S.optional(RevocationType),
    NumberOfRevokedEntries: S.optional(S.Number),
  }),
).annotate({
  identifier: "TrustStoreRevocation",
}) as any as S.Schema<TrustStoreRevocation>;
export type TrustStoreRevocations = TrustStoreRevocation[];
export const TrustStoreRevocations =
  /*@__PURE__*/ S.Array(TrustStoreRevocation);
export interface AddTrustStoreRevocationsOutput {
  TrustStoreRevocations?: TrustStoreRevocation[];
}
export const AddTrustStoreRevocationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrustStoreRevocations: S.optional(TrustStoreRevocations) }).pipe(
    ns,
  ),
).annotate({
  identifier: "AddTrustStoreRevocationsOutput",
}) as any as S.Schema<AddTrustStoreRevocationsOutput>;
export type LoadBalancerArn = string;
export type ProtocolEnum =
  | "HTTP"
  | "HTTPS"
  | "TCP"
  | "TLS"
  | "UDP"
  | "TCP_UDP"
  | "GENEVE"
  | "QUIC"
  | "TCP_QUIC"
  | (string & {});
export const ProtocolEnum = /*@__PURE__*/ S.String;

export type Port = number;
export type SslPolicyName = string;
export type ActionTypeEnum =
  | "forward"
  | "authenticate-oidc"
  | "authenticate-cognito"
  | "redirect"
  | "fixed-response"
  | "jwt-validation"
  | (string & {});
export const ActionTypeEnum = /*@__PURE__*/ S.String;

export type TargetGroupArn = string;
export type AuthenticateOidcActionIssuer = string;
export type AuthenticateOidcActionAuthorizationEndpoint = string;
export type AuthenticateOidcActionTokenEndpoint = string;
export type AuthenticateOidcActionUserInfoEndpoint = string;
export type AuthenticateOidcActionClientId = string;
export type AuthenticateOidcActionClientSecret = string;
export type AuthenticateOidcActionSessionCookieName = string;
export type AuthenticateOidcActionScope = string;
export type AuthenticateOidcActionSessionTimeout = number;
export type AuthenticateOidcActionAuthenticationRequestParamName = string;
export type AuthenticateOidcActionAuthenticationRequestParamValue = string;
export type AuthenticateOidcActionAuthenticationRequestExtraParams = {
  [key: string]: string | undefined;
};
export const AuthenticateOidcActionAuthenticationRequestExtraParams =
  /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type AuthenticateOidcActionConditionalBehaviorEnum =
  | "deny"
  | "allow"
  | "authenticate"
  | (string & {});
export const AuthenticateOidcActionConditionalBehaviorEnum =
  /*@__PURE__*/ S.String;

export type AuthenticateOidcActionUseExistingClientSecret = boolean;
export interface AuthenticateOidcActionConfig {
  Issuer?: string;
  AuthorizationEndpoint?: string;
  TokenEndpoint?: string;
  UserInfoEndpoint?: string;
  ClientId?: string;
  ClientSecret?: string | redacted.Redacted<string>;
  SessionCookieName?: string;
  Scope?: string;
  SessionTimeout?: number;
  AuthenticationRequestExtraParams?: { [key: string]: string | undefined };
  OnUnauthenticatedRequest?: AuthenticateOidcActionConditionalBehaviorEnum;
  UseExistingClientSecret?: boolean;
}
export const AuthenticateOidcActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Issuer: S.optional(S.String),
    AuthorizationEndpoint: S.optional(S.String),
    TokenEndpoint: S.optional(S.String),
    UserInfoEndpoint: S.optional(S.String),
    ClientId: S.optional(S.String),
    ClientSecret: S.optional(SensitiveString),
    SessionCookieName: S.optional(S.String),
    Scope: S.optional(S.String),
    SessionTimeout: S.optional(S.Number),
    AuthenticationRequestExtraParams: S.optional(
      AuthenticateOidcActionAuthenticationRequestExtraParams,
    ),
    OnUnauthenticatedRequest: S.optional(
      AuthenticateOidcActionConditionalBehaviorEnum,
    ),
    UseExistingClientSecret: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AuthenticateOidcActionConfig",
}) as any as S.Schema<AuthenticateOidcActionConfig>;
export type AuthenticateCognitoActionUserPoolArn = string;
export type AuthenticateCognitoActionUserPoolClientId = string;
export type AuthenticateCognitoActionUserPoolDomain = string;
export type AuthenticateCognitoActionSessionCookieName = string;
export type AuthenticateCognitoActionScope = string;
export type AuthenticateCognitoActionSessionTimeout = number;
export type AuthenticateCognitoActionAuthenticationRequestParamName = string;
export type AuthenticateCognitoActionAuthenticationRequestParamValue = string;
export type AuthenticateCognitoActionAuthenticationRequestExtraParams = {
  [key: string]: string | undefined;
};
export const AuthenticateCognitoActionAuthenticationRequestExtraParams =
  /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type AuthenticateCognitoActionConditionalBehaviorEnum =
  | "deny"
  | "allow"
  | "authenticate"
  | (string & {});
export const AuthenticateCognitoActionConditionalBehaviorEnum =
  /*@__PURE__*/ S.String;

export interface AuthenticateCognitoActionConfig {
  UserPoolArn?: string;
  UserPoolClientId?: string;
  UserPoolDomain?: string;
  SessionCookieName?: string;
  Scope?: string;
  SessionTimeout?: number;
  AuthenticationRequestExtraParams?: { [key: string]: string | undefined };
  OnUnauthenticatedRequest?: AuthenticateCognitoActionConditionalBehaviorEnum;
}
export const AuthenticateCognitoActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserPoolArn: S.optional(S.String),
    UserPoolClientId: S.optional(S.String),
    UserPoolDomain: S.optional(S.String),
    SessionCookieName: S.optional(S.String),
    Scope: S.optional(S.String),
    SessionTimeout: S.optional(S.Number),
    AuthenticationRequestExtraParams: S.optional(
      AuthenticateCognitoActionAuthenticationRequestExtraParams,
    ),
    OnUnauthenticatedRequest: S.optional(
      AuthenticateCognitoActionConditionalBehaviorEnum,
    ),
  }),
).annotate({
  identifier: "AuthenticateCognitoActionConfig",
}) as any as S.Schema<AuthenticateCognitoActionConfig>;
export type ActionOrder = number;
export type RedirectActionProtocol = string;
export type RedirectActionPort = string;
export type RedirectActionHost = string;
export type RedirectActionPath = string;
export type RedirectActionQuery = string;
export type RedirectActionStatusCodeEnum =
  | "HTTP_301"
  | "HTTP_302"
  | (string & {});
export const RedirectActionStatusCodeEnum = /*@__PURE__*/ S.String;

export interface RedirectActionConfig {
  Protocol?: string;
  Port?: string;
  Host?: string;
  Path?: string;
  Query?: string;
  StatusCode?: RedirectActionStatusCodeEnum;
}
export const RedirectActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: S.optional(S.String),
    Port: S.optional(S.String),
    Host: S.optional(S.String),
    Path: S.optional(S.String),
    Query: S.optional(S.String),
    StatusCode: S.optional(RedirectActionStatusCodeEnum),
  }),
).annotate({
  identifier: "RedirectActionConfig",
}) as any as S.Schema<RedirectActionConfig>;
export type FixedResponseActionMessage = string;
export type FixedResponseActionStatusCode = string;
export type FixedResponseActionContentType = string;
export interface FixedResponseActionConfig {
  MessageBody?: string;
  StatusCode?: string;
  ContentType?: string;
}
export const FixedResponseActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(S.String),
    StatusCode: S.optional(S.String),
    ContentType: S.optional(S.String),
  }),
).annotate({
  identifier: "FixedResponseActionConfig",
}) as any as S.Schema<FixedResponseActionConfig>;
export type TargetGroupWeight = number;
export interface TargetGroupTuple {
  TargetGroupArn?: string;
  Weight?: number;
}
export const TargetGroupTuple = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    Weight: S.optional(S.Number),
  }),
).annotate({
  identifier: "TargetGroupTuple",
}) as any as S.Schema<TargetGroupTuple>;
export type TargetGroupList = TargetGroupTuple[];
export const TargetGroupList = /*@__PURE__*/ S.Array(TargetGroupTuple);
export type TargetGroupStickinessEnabled = boolean;
export type TargetGroupStickinessDurationSeconds = number;
export interface TargetGroupStickinessConfig {
  Enabled?: boolean;
  DurationSeconds?: number;
}
export const TargetGroupStickinessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    DurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "TargetGroupStickinessConfig",
}) as any as S.Schema<TargetGroupStickinessConfig>;
export interface ForwardActionConfig {
  TargetGroups?: TargetGroupTuple[];
  TargetGroupStickinessConfig?: TargetGroupStickinessConfig;
}
export const ForwardActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroups: S.optional(TargetGroupList),
    TargetGroupStickinessConfig: S.optional(TargetGroupStickinessConfig),
  }),
).annotate({
  identifier: "ForwardActionConfig",
}) as any as S.Schema<ForwardActionConfig>;
export type JwtValidationActionJwksEndpoint = string;
export type JwtValidationActionIssuer = string;
export type JwtValidationActionAdditionalClaimFormatEnum =
  | "single-string"
  | "string-array"
  | "space-separated-values"
  | (string & {});
export const JwtValidationActionAdditionalClaimFormatEnum =
  /*@__PURE__*/ S.String;

export type JwtValidationActionAdditionalClaimName = string;
export type JwtValidationActionAdditionalClaimValue = string;
export type JwtValidationActionAdditionalClaimValues = string[];
export const JwtValidationActionAdditionalClaimValues = /*@__PURE__*/ S.Array(
  S.String,
);
export interface JwtValidationActionAdditionalClaim {
  Format?: JwtValidationActionAdditionalClaimFormatEnum;
  Name?: string;
  Values?: string[];
}
export const JwtValidationActionAdditionalClaim = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: S.optional(JwtValidationActionAdditionalClaimFormatEnum),
    Name: S.optional(S.String),
    Values: S.optional(JwtValidationActionAdditionalClaimValues),
  }),
).annotate({
  identifier: "JwtValidationActionAdditionalClaim",
}) as any as S.Schema<JwtValidationActionAdditionalClaim>;
export type JwtValidationActionAdditionalClaims =
  JwtValidationActionAdditionalClaim[];
export const JwtValidationActionAdditionalClaims = /*@__PURE__*/ S.Array(
  JwtValidationActionAdditionalClaim,
);
export interface JwtValidationActionConfig {
  JwksEndpoint?: string;
  Issuer?: string;
  AdditionalClaims?: JwtValidationActionAdditionalClaim[];
}
export const JwtValidationActionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JwksEndpoint: S.optional(S.String),
    Issuer: S.optional(S.String),
    AdditionalClaims: S.optional(JwtValidationActionAdditionalClaims),
  }),
).annotate({
  identifier: "JwtValidationActionConfig",
}) as any as S.Schema<JwtValidationActionConfig>;
export interface Action {
  Type?: ActionTypeEnum;
  TargetGroupArn?: string;
  AuthenticateOidcConfig?: AuthenticateOidcActionConfig;
  AuthenticateCognitoConfig?: AuthenticateCognitoActionConfig;
  Order?: number;
  RedirectConfig?: RedirectActionConfig;
  FixedResponseConfig?: FixedResponseActionConfig;
  ForwardConfig?: ForwardActionConfig;
  JwtValidationConfig?: JwtValidationActionConfig;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ActionTypeEnum),
    TargetGroupArn: S.optional(S.String),
    AuthenticateOidcConfig: S.optional(AuthenticateOidcActionConfig),
    AuthenticateCognitoConfig: S.optional(AuthenticateCognitoActionConfig),
    Order: S.optional(S.Number),
    RedirectConfig: S.optional(RedirectActionConfig),
    FixedResponseConfig: S.optional(FixedResponseActionConfig),
    ForwardConfig: S.optional(ForwardActionConfig),
    JwtValidationConfig: S.optional(JwtValidationActionConfig),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type Actions = Action[];
export const Actions = /*@__PURE__*/ S.Array(Action);
export type AlpnPolicyValue = string;
export type AlpnPolicyName = string[];
export const AlpnPolicyName = /*@__PURE__*/ S.Array(S.String);
export type Mode = string;
export type IgnoreClientCertificateExpiry = boolean;
export type TrustStoreAssociationStatusEnum =
  | "active"
  | "removed"
  | (string & {});
export const TrustStoreAssociationStatusEnum = /*@__PURE__*/ S.String;

export type AdvertiseTrustStoreCaNamesEnum = "on" | "off" | (string & {});
export const AdvertiseTrustStoreCaNamesEnum = /*@__PURE__*/ S.String;

export interface MutualAuthenticationAttributes {
  Mode?: string;
  TrustStoreArn?: string;
  IgnoreClientCertificateExpiry?: boolean;
  TrustStoreAssociationStatus?: TrustStoreAssociationStatusEnum;
  AdvertiseTrustStoreCaNames?: AdvertiseTrustStoreCaNamesEnum;
}
export const MutualAuthenticationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(S.String),
    TrustStoreArn: S.optional(S.String),
    IgnoreClientCertificateExpiry: S.optional(S.Boolean),
    TrustStoreAssociationStatus: S.optional(TrustStoreAssociationStatusEnum),
    AdvertiseTrustStoreCaNames: S.optional(AdvertiseTrustStoreCaNamesEnum),
  }),
).annotate({
  identifier: "MutualAuthenticationAttributes",
}) as any as S.Schema<MutualAuthenticationAttributes>;
export interface CreateListenerInput {
  LoadBalancerArn?: string;
  Protocol?: ProtocolEnum;
  Port?: number;
  SslPolicy?: string;
  Certificates?: Certificate[];
  DefaultActions?: Action[];
  AlpnPolicy?: string[];
  Tags?: Tag[];
  MutualAuthentication?: MutualAuthenticationAttributes;
}
export const CreateListenerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    Protocol: S.optional(ProtocolEnum),
    Port: S.optional(S.Number),
    SslPolicy: S.optional(S.String),
    Certificates: S.optional(CertificateList),
    DefaultActions: S.optional(Actions),
    AlpnPolicy: S.optional(AlpnPolicyName),
    Tags: S.optional(TagList),
    MutualAuthentication: S.optional(MutualAuthenticationAttributes),
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
  identifier: "CreateListenerInput",
}) as any as S.Schema<CreateListenerInput>;
export interface Listener {
  ListenerArn?: string;
  LoadBalancerArn?: string;
  Port?: number;
  Protocol?: ProtocolEnum;
  Certificates?: Certificate[];
  SslPolicy?: string;
  DefaultActions?: Action[];
  AlpnPolicy?: string[];
  MutualAuthentication?: MutualAuthenticationAttributes;
}
export const Listener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    LoadBalancerArn: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(ProtocolEnum),
    Certificates: S.optional(CertificateList),
    SslPolicy: S.optional(S.String),
    DefaultActions: S.optional(Actions),
    AlpnPolicy: S.optional(AlpnPolicyName),
    MutualAuthentication: S.optional(MutualAuthenticationAttributes),
  }),
).annotate({ identifier: "Listener" }) as any as S.Schema<Listener>;
export type Listeners = Listener[];
export const Listeners = /*@__PURE__*/ S.Array(Listener);
export interface CreateListenerOutput {
  Listeners?: (Listener & {
    DefaultActions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
  })[];
}
export const CreateListenerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listeners: S.optional(Listeners) }).pipe(ns),
).annotate({
  identifier: "CreateListenerOutput",
}) as any as S.Schema<CreateListenerOutput>;
export type LoadBalancerName = string;
export type SubnetId = string;
export type Subnets = string[];
export const Subnets = /*@__PURE__*/ S.Array(S.String);
export type AllocationId = string;
export type PrivateIPv4Address = string;
export type IPv6Address = string;
export type SourceNatIpv6Prefix = string;
export interface SubnetMapping {
  SubnetId?: string;
  AllocationId?: string;
  PrivateIPv4Address?: string;
  IPv6Address?: string;
  SourceNatIpv6Prefix?: string;
}
export const SubnetMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetId: S.optional(S.String),
    AllocationId: S.optional(S.String),
    PrivateIPv4Address: S.optional(S.String),
    IPv6Address: S.optional(S.String),
    SourceNatIpv6Prefix: S.optional(S.String),
  }),
).annotate({ identifier: "SubnetMapping" }) as any as S.Schema<SubnetMapping>;
export type SubnetMappings = SubnetMapping[];
export const SubnetMappings = /*@__PURE__*/ S.Array(SubnetMapping);
export type SecurityGroupId = string;
export type SecurityGroups = string[];
export const SecurityGroups = /*@__PURE__*/ S.Array(S.String);
export type LoadBalancerSchemeEnum =
  | "internet-facing"
  | "internal"
  | (string & {});
export const LoadBalancerSchemeEnum = /*@__PURE__*/ S.String;

export type LoadBalancerTypeEnum =
  | "application"
  | "network"
  | "gateway"
  | (string & {});
export const LoadBalancerTypeEnum = /*@__PURE__*/ S.String;

export type IpAddressType =
  | "ipv4"
  | "dualstack"
  | "dualstack-without-public-ipv4"
  | (string & {});
export const IpAddressType = /*@__PURE__*/ S.String;

export type CustomerOwnedIpv4Pool = string;
export type EnablePrefixForIpv6SourceNatEnum = "on" | "off" | (string & {});
export const EnablePrefixForIpv6SourceNatEnum = /*@__PURE__*/ S.String;

export type IpamPoolId = string;
export interface IpamPools {
  Ipv4IpamPoolId?: string;
}
export const IpamPools = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ipv4IpamPoolId: S.optional(S.String) }),
).annotate({ identifier: "IpamPools" }) as any as S.Schema<IpamPools>;
export interface CreateLoadBalancerInput {
  Name?: string;
  Subnets?: string[];
  SubnetMappings?: SubnetMapping[];
  SecurityGroups?: string[];
  Scheme?: LoadBalancerSchemeEnum;
  Tags?: Tag[];
  Type?: LoadBalancerTypeEnum;
  IpAddressType?: IpAddressType;
  CustomerOwnedIpv4Pool?: string;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
  IpamPools?: IpamPools;
}
export const CreateLoadBalancerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Subnets: S.optional(Subnets),
    SubnetMappings: S.optional(SubnetMappings),
    SecurityGroups: S.optional(SecurityGroups),
    Scheme: S.optional(LoadBalancerSchemeEnum),
    Tags: S.optional(TagList),
    Type: S.optional(LoadBalancerTypeEnum),
    IpAddressType: S.optional(IpAddressType),
    CustomerOwnedIpv4Pool: S.optional(S.String),
    EnablePrefixForIpv6SourceNat: S.optional(EnablePrefixForIpv6SourceNatEnum),
    IpamPools: S.optional(IpamPools),
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
  identifier: "CreateLoadBalancerInput",
}) as any as S.Schema<CreateLoadBalancerInput>;
export type DNSName = string;
export type CanonicalHostedZoneId = string;
export type CreatedTime = Date;
export type VpcId = string;
export type LoadBalancerStateEnum =
  | "active"
  | "provisioning"
  | "active_impaired"
  | "failed"
  | (string & {});
export const LoadBalancerStateEnum = /*@__PURE__*/ S.String;

export type StateReason = string;
export interface LoadBalancerState {
  Code?: LoadBalancerStateEnum;
  Reason?: string;
}
export const LoadBalancerState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(LoadBalancerStateEnum),
    Reason: S.optional(S.String),
  }),
).annotate({
  identifier: "LoadBalancerState",
}) as any as S.Schema<LoadBalancerState>;
export type ZoneName = string;
export type OutpostId = string;
export type IpAddress = string;
export interface LoadBalancerAddress {
  IpAddress?: string;
  AllocationId?: string;
  PrivateIPv4Address?: string;
  IPv6Address?: string;
}
export const LoadBalancerAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddress: S.optional(S.String),
    AllocationId: S.optional(S.String),
    PrivateIPv4Address: S.optional(S.String),
    IPv6Address: S.optional(S.String),
  }),
).annotate({
  identifier: "LoadBalancerAddress",
}) as any as S.Schema<LoadBalancerAddress>;
export type LoadBalancerAddresses = LoadBalancerAddress[];
export const LoadBalancerAddresses = /*@__PURE__*/ S.Array(LoadBalancerAddress);
export type SourceNatIpv6Prefixes = string[];
export const SourceNatIpv6Prefixes = /*@__PURE__*/ S.Array(S.String);
export interface AvailabilityZone {
  ZoneName?: string;
  SubnetId?: string;
  OutpostId?: string;
  LoadBalancerAddresses?: LoadBalancerAddress[];
  SourceNatIpv6Prefixes?: string[];
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ZoneName: S.optional(S.String),
    SubnetId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    LoadBalancerAddresses: S.optional(LoadBalancerAddresses),
    SourceNatIpv6Prefixes: S.optional(SourceNatIpv6Prefixes),
  }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export type AvailabilityZones = AvailabilityZone[];
export const AvailabilityZones = /*@__PURE__*/ S.Array(AvailabilityZone);
export type EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic = string;
export interface LoadBalancer {
  LoadBalancerArn?: string;
  DNSName?: string;
  CanonicalHostedZoneId?: string;
  CreatedTime?: Date;
  LoadBalancerName?: string;
  Scheme?: LoadBalancerSchemeEnum;
  VpcId?: string;
  State?: LoadBalancerState;
  Type?: LoadBalancerTypeEnum;
  AvailabilityZones?: AvailabilityZone[];
  SecurityGroups?: string[];
  IpAddressType?: IpAddressType;
  CustomerOwnedIpv4Pool?: string;
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic?: string;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
  IpamPools?: IpamPools;
}
export const LoadBalancer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    DNSName: S.optional(S.String),
    CanonicalHostedZoneId: S.optional(S.String),
    CreatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LoadBalancerName: S.optional(S.String),
    Scheme: S.optional(LoadBalancerSchemeEnum),
    VpcId: S.optional(S.String),
    State: S.optional(LoadBalancerState),
    Type: S.optional(LoadBalancerTypeEnum),
    AvailabilityZones: S.optional(AvailabilityZones),
    SecurityGroups: S.optional(SecurityGroups),
    IpAddressType: S.optional(IpAddressType),
    CustomerOwnedIpv4Pool: S.optional(S.String),
    EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: S.optional(S.String),
    EnablePrefixForIpv6SourceNat: S.optional(EnablePrefixForIpv6SourceNatEnum),
    IpamPools: S.optional(IpamPools),
  }),
).annotate({ identifier: "LoadBalancer" }) as any as S.Schema<LoadBalancer>;
export type LoadBalancers = LoadBalancer[];
export const LoadBalancers = /*@__PURE__*/ S.Array(LoadBalancer);
export interface CreateLoadBalancerOutput {
  LoadBalancers?: LoadBalancer[];
}
export const CreateLoadBalancerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoadBalancers: S.optional(LoadBalancers) }).pipe(ns),
).annotate({
  identifier: "CreateLoadBalancerOutput",
}) as any as S.Schema<CreateLoadBalancerOutput>;
export type ConditionFieldName = string;
export type StringValue = string;
export type ListOfString = string[];
export const ListOfString = /*@__PURE__*/ S.Array(S.String);
export interface HostHeaderConditionConfig {
  Values?: string[];
  RegexValues?: string[];
}
export const HostHeaderConditionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Values: S.optional(ListOfString),
    RegexValues: S.optional(ListOfString),
  }),
).annotate({
  identifier: "HostHeaderConditionConfig",
}) as any as S.Schema<HostHeaderConditionConfig>;
export interface PathPatternConditionConfig {
  Values?: string[];
  RegexValues?: string[];
}
export const PathPatternConditionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Values: S.optional(ListOfString),
    RegexValues: S.optional(ListOfString),
  }),
).annotate({
  identifier: "PathPatternConditionConfig",
}) as any as S.Schema<PathPatternConditionConfig>;
export type HttpHeaderConditionName = string;
export interface HttpHeaderConditionConfig {
  HttpHeaderName?: string;
  Values?: string[];
  RegexValues?: string[];
}
export const HttpHeaderConditionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpHeaderName: S.optional(S.String),
    Values: S.optional(ListOfString),
    RegexValues: S.optional(ListOfString),
  }),
).annotate({
  identifier: "HttpHeaderConditionConfig",
}) as any as S.Schema<HttpHeaderConditionConfig>;
export interface QueryStringKeyValuePair {
  Key?: string;
  Value?: string;
}
export const QueryStringKeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "QueryStringKeyValuePair",
}) as any as S.Schema<QueryStringKeyValuePair>;
export type QueryStringKeyValuePairList = QueryStringKeyValuePair[];
export const QueryStringKeyValuePairList = /*@__PURE__*/ S.Array(
  QueryStringKeyValuePair,
);
export interface QueryStringConditionConfig {
  Values?: QueryStringKeyValuePair[];
}
export const QueryStringConditionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Values: S.optional(QueryStringKeyValuePairList) }),
).annotate({
  identifier: "QueryStringConditionConfig",
}) as any as S.Schema<QueryStringConditionConfig>;
export interface HttpRequestMethodConditionConfig {
  Values?: string[];
}
export const HttpRequestMethodConditionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Values: S.optional(ListOfString) }),
).annotate({
  identifier: "HttpRequestMethodConditionConfig",
}) as any as S.Schema<HttpRequestMethodConditionConfig>;
export interface SourceIpConditionConfig {
  Values?: string[];
}
export const SourceIpConditionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Values: S.optional(ListOfString) }),
).annotate({
  identifier: "SourceIpConditionConfig",
}) as any as S.Schema<SourceIpConditionConfig>;
export interface RuleCondition {
  Field?: string;
  Values?: string[];
  HostHeaderConfig?: HostHeaderConditionConfig;
  PathPatternConfig?: PathPatternConditionConfig;
  HttpHeaderConfig?: HttpHeaderConditionConfig;
  QueryStringConfig?: QueryStringConditionConfig;
  HttpRequestMethodConfig?: HttpRequestMethodConditionConfig;
  SourceIpConfig?: SourceIpConditionConfig;
  RegexValues?: string[];
}
export const RuleCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Field: S.optional(S.String),
    Values: S.optional(ListOfString),
    HostHeaderConfig: S.optional(HostHeaderConditionConfig),
    PathPatternConfig: S.optional(PathPatternConditionConfig),
    HttpHeaderConfig: S.optional(HttpHeaderConditionConfig),
    QueryStringConfig: S.optional(QueryStringConditionConfig),
    HttpRequestMethodConfig: S.optional(HttpRequestMethodConditionConfig),
    SourceIpConfig: S.optional(SourceIpConditionConfig),
    RegexValues: S.optional(ListOfString),
  }),
).annotate({ identifier: "RuleCondition" }) as any as S.Schema<RuleCondition>;
export type RuleConditionList = RuleCondition[];
export const RuleConditionList = /*@__PURE__*/ S.Array(RuleCondition);
export type RulePriority = number;
export type TransformTypeEnum =
  | "host-header-rewrite"
  | "url-rewrite"
  | (string & {});
export const TransformTypeEnum = /*@__PURE__*/ S.String;

export interface RewriteConfig {
  Regex?: string;
  Replace?: string;
}
export const RewriteConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Regex: S.optional(S.String), Replace: S.optional(S.String) }),
).annotate({ identifier: "RewriteConfig" }) as any as S.Schema<RewriteConfig>;
export type RewriteConfigList = RewriteConfig[];
export const RewriteConfigList = /*@__PURE__*/ S.Array(RewriteConfig);
export interface HostHeaderRewriteConfig {
  Rewrites?: RewriteConfig[];
}
export const HostHeaderRewriteConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rewrites: S.optional(RewriteConfigList) }),
).annotate({
  identifier: "HostHeaderRewriteConfig",
}) as any as S.Schema<HostHeaderRewriteConfig>;
export interface UrlRewriteConfig {
  Rewrites?: RewriteConfig[];
}
export const UrlRewriteConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rewrites: S.optional(RewriteConfigList) }),
).annotate({
  identifier: "UrlRewriteConfig",
}) as any as S.Schema<UrlRewriteConfig>;
export interface RuleTransform {
  Type?: TransformTypeEnum;
  HostHeaderRewriteConfig?: HostHeaderRewriteConfig;
  UrlRewriteConfig?: UrlRewriteConfig;
}
export const RuleTransform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(TransformTypeEnum),
    HostHeaderRewriteConfig: S.optional(HostHeaderRewriteConfig),
    UrlRewriteConfig: S.optional(UrlRewriteConfig),
  }),
).annotate({ identifier: "RuleTransform" }) as any as S.Schema<RuleTransform>;
export type RuleTransformList = RuleTransform[];
export const RuleTransformList = /*@__PURE__*/ S.Array(RuleTransform);
export interface CreateRuleInput {
  ListenerArn?: string;
  Conditions?: RuleCondition[];
  Priority?: number;
  Actions?: Action[];
  Tags?: Tag[];
  Transforms?: RuleTransform[];
}
export const CreateRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    Conditions: S.optional(RuleConditionList),
    Priority: S.optional(S.Number),
    Actions: S.optional(Actions),
    Tags: S.optional(TagList),
    Transforms: S.optional(RuleTransformList),
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
  identifier: "CreateRuleInput",
}) as any as S.Schema<CreateRuleInput>;
export type RuleArn = string;
export type IsDefault = boolean;
export interface Rule {
  RuleArn?: string;
  Priority?: string;
  Conditions?: RuleCondition[];
  Actions?: Action[];
  IsDefault?: boolean;
  Transforms?: RuleTransform[];
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    Priority: S.optional(S.String),
    Conditions: S.optional(RuleConditionList),
    Actions: S.optional(Actions),
    IsDefault: S.optional(S.Boolean),
    Transforms: S.optional(RuleTransformList),
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type Rules = Rule[];
export const Rules = /*@__PURE__*/ S.Array(Rule);
export interface CreateRuleOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
}
export const CreateRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(Rules) }).pipe(ns),
).annotate({
  identifier: "CreateRuleOutput",
}) as any as S.Schema<CreateRuleOutput>;
export type TargetGroupName = string;
export type ProtocolVersion = string;
export type HealthCheckPort = string;
export type HealthCheckEnabled = boolean;
export type Path = string;
export type HealthCheckIntervalSeconds = number;
export type HealthCheckTimeoutSeconds = number;
export type HealthCheckThresholdCount = number;
export type HttpCode = string;
export type GrpcCode = string;
export interface Matcher {
  HttpCode?: string;
  GrpcCode?: string;
}
export const Matcher = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HttpCode: S.optional(S.String), GrpcCode: S.optional(S.String) }),
).annotate({ identifier: "Matcher" }) as any as S.Schema<Matcher>;
export type TargetTypeEnum =
  | "instance"
  | "ip"
  | "lambda"
  | "alb"
  | (string & {});
export const TargetTypeEnum = /*@__PURE__*/ S.String;

export type TargetGroupIpAddressTypeEnum = "ipv4" | "ipv6" | (string & {});
export const TargetGroupIpAddressTypeEnum = /*@__PURE__*/ S.String;

export type TargetControlPort = number;
export interface CreateTargetGroupInput {
  Name?: string;
  Protocol?: ProtocolEnum;
  ProtocolVersion?: string;
  Port?: number;
  VpcId?: string;
  HealthCheckProtocol?: ProtocolEnum;
  HealthCheckPort?: string;
  HealthCheckEnabled?: boolean;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  HealthCheckTimeoutSeconds?: number;
  HealthyThresholdCount?: number;
  UnhealthyThresholdCount?: number;
  Matcher?: Matcher;
  TargetType?: TargetTypeEnum;
  Tags?: Tag[];
  IpAddressType?: TargetGroupIpAddressTypeEnum;
  TargetControlPort?: number;
}
export const CreateTargetGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Protocol: S.optional(ProtocolEnum),
    ProtocolVersion: S.optional(S.String),
    Port: S.optional(S.Number),
    VpcId: S.optional(S.String),
    HealthCheckProtocol: S.optional(ProtocolEnum),
    HealthCheckPort: S.optional(S.String),
    HealthCheckEnabled: S.optional(S.Boolean),
    HealthCheckPath: S.optional(S.String),
    HealthCheckIntervalSeconds: S.optional(S.Number),
    HealthCheckTimeoutSeconds: S.optional(S.Number),
    HealthyThresholdCount: S.optional(S.Number),
    UnhealthyThresholdCount: S.optional(S.Number),
    Matcher: S.optional(Matcher),
    TargetType: S.optional(TargetTypeEnum),
    Tags: S.optional(TagList),
    IpAddressType: S.optional(TargetGroupIpAddressTypeEnum),
    TargetControlPort: S.optional(S.Number),
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
  identifier: "CreateTargetGroupInput",
}) as any as S.Schema<CreateTargetGroupInput>;
export type LoadBalancerArns = string[];
export const LoadBalancerArns = /*@__PURE__*/ S.Array(S.String);
export interface TargetGroup {
  TargetGroupArn?: string;
  TargetGroupName?: string;
  Protocol?: ProtocolEnum;
  Port?: number;
  VpcId?: string;
  HealthCheckProtocol?: ProtocolEnum;
  HealthCheckPort?: string;
  HealthCheckEnabled?: boolean;
  HealthCheckIntervalSeconds?: number;
  HealthCheckTimeoutSeconds?: number;
  HealthyThresholdCount?: number;
  UnhealthyThresholdCount?: number;
  HealthCheckPath?: string;
  Matcher?: Matcher;
  LoadBalancerArns?: string[];
  TargetType?: TargetTypeEnum;
  ProtocolVersion?: string;
  IpAddressType?: TargetGroupIpAddressTypeEnum;
  TargetControlPort?: number;
}
export const TargetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    TargetGroupName: S.optional(S.String),
    Protocol: S.optional(ProtocolEnum),
    Port: S.optional(S.Number),
    VpcId: S.optional(S.String),
    HealthCheckProtocol: S.optional(ProtocolEnum),
    HealthCheckPort: S.optional(S.String),
    HealthCheckEnabled: S.optional(S.Boolean),
    HealthCheckIntervalSeconds: S.optional(S.Number),
    HealthCheckTimeoutSeconds: S.optional(S.Number),
    HealthyThresholdCount: S.optional(S.Number),
    UnhealthyThresholdCount: S.optional(S.Number),
    HealthCheckPath: S.optional(S.String),
    Matcher: S.optional(Matcher),
    LoadBalancerArns: S.optional(LoadBalancerArns),
    TargetType: S.optional(TargetTypeEnum),
    ProtocolVersion: S.optional(S.String),
    IpAddressType: S.optional(TargetGroupIpAddressTypeEnum),
    TargetControlPort: S.optional(S.Number),
  }),
).annotate({ identifier: "TargetGroup" }) as any as S.Schema<TargetGroup>;
export type TargetGroups = TargetGroup[];
export const TargetGroups = /*@__PURE__*/ S.Array(TargetGroup);
export interface CreateTargetGroupOutput {
  TargetGroups?: TargetGroup[];
}
export const CreateTargetGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetGroups: S.optional(TargetGroups) }).pipe(ns),
).annotate({
  identifier: "CreateTargetGroupOutput",
}) as any as S.Schema<CreateTargetGroupOutput>;
export type TrustStoreName = string;
export interface CreateTrustStoreInput {
  Name?: string;
  CaCertificatesBundleS3Bucket?: string;
  CaCertificatesBundleS3Key?: string;
  CaCertificatesBundleS3ObjectVersion?: string;
  Tags?: Tag[];
}
export const CreateTrustStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CaCertificatesBundleS3Bucket: S.optional(S.String),
    CaCertificatesBundleS3Key: S.optional(S.String),
    CaCertificatesBundleS3ObjectVersion: S.optional(S.String),
    Tags: S.optional(TagList),
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
  identifier: "CreateTrustStoreInput",
}) as any as S.Schema<CreateTrustStoreInput>;
export type TrustStoreStatus = "ACTIVE" | "CREATING" | (string & {});
export const TrustStoreStatus = /*@__PURE__*/ S.String;

export type NumberOfCaCertificates = number;
export type TotalRevokedEntries = number;
export interface TrustStore {
  Name?: string;
  TrustStoreArn?: string;
  Status?: TrustStoreStatus;
  NumberOfCaCertificates?: number;
  TotalRevokedEntries?: number;
}
export const TrustStore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    TrustStoreArn: S.optional(S.String),
    Status: S.optional(TrustStoreStatus),
    NumberOfCaCertificates: S.optional(S.Number),
    TotalRevokedEntries: S.optional(S.Number),
  }),
).annotate({ identifier: "TrustStore" }) as any as S.Schema<TrustStore>;
export type TrustStores = TrustStore[];
export const TrustStores = /*@__PURE__*/ S.Array(TrustStore);
export interface CreateTrustStoreOutput {
  TrustStores?: TrustStore[];
}
export const CreateTrustStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrustStores: S.optional(TrustStores) }).pipe(ns),
).annotate({
  identifier: "CreateTrustStoreOutput",
}) as any as S.Schema<CreateTrustStoreOutput>;
export interface DeleteListenerInput {
  ListenerArn?: string;
}
export const DeleteListenerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteListenerInput",
}) as any as S.Schema<DeleteListenerInput>;
export interface DeleteListenerOutput {}
export const DeleteListenerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteListenerOutput",
}) as any as S.Schema<DeleteListenerOutput>;
export interface DeleteLoadBalancerInput {
  LoadBalancerArn?: string;
}
export const DeleteLoadBalancerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoadBalancerArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteLoadBalancerInput",
}) as any as S.Schema<DeleteLoadBalancerInput>;
export interface DeleteLoadBalancerOutput {}
export const DeleteLoadBalancerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLoadBalancerOutput",
}) as any as S.Schema<DeleteLoadBalancerOutput>;
export interface DeleteRuleInput {
  RuleArn?: string;
}
export const DeleteRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteRuleInput",
}) as any as S.Schema<DeleteRuleInput>;
export interface DeleteRuleOutput {}
export const DeleteRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteRuleOutput",
}) as any as S.Schema<DeleteRuleOutput>;
export interface DeleteSharedTrustStoreAssociationInput {
  TrustStoreArn?: string;
  ResourceArn?: string;
}
export const DeleteSharedTrustStoreAssociationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TrustStoreArn: S.optional(S.String),
      ResourceArn: S.optional(S.String),
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
  identifier: "DeleteSharedTrustStoreAssociationInput",
}) as any as S.Schema<DeleteSharedTrustStoreAssociationInput>;
export interface DeleteSharedTrustStoreAssociationOutput {}
export const DeleteSharedTrustStoreAssociationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSharedTrustStoreAssociationOutput",
}) as any as S.Schema<DeleteSharedTrustStoreAssociationOutput>;
export interface DeleteTargetGroupInput {
  TargetGroupArn?: string;
}
export const DeleteTargetGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetGroupArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteTargetGroupInput",
}) as any as S.Schema<DeleteTargetGroupInput>;
export interface DeleteTargetGroupOutput {}
export const DeleteTargetGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTargetGroupOutput",
}) as any as S.Schema<DeleteTargetGroupOutput>;
export interface DeleteTrustStoreInput {
  TrustStoreArn?: string;
}
export const DeleteTrustStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrustStoreArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteTrustStoreInput",
}) as any as S.Schema<DeleteTrustStoreInput>;
export interface DeleteTrustStoreOutput {}
export const DeleteTrustStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTrustStoreOutput",
}) as any as S.Schema<DeleteTrustStoreOutput>;
export type TargetId = string;
export type QuicServerId = string;
export interface TargetDescription {
  Id?: string;
  Port?: number;
  AvailabilityZone?: string;
  QuicServerId?: string;
}
export const TargetDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Port: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    QuicServerId: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetDescription",
}) as any as S.Schema<TargetDescription>;
export type TargetDescriptions = TargetDescription[];
export const TargetDescriptions = /*@__PURE__*/ S.Array(TargetDescription);
export interface DeregisterTargetsInput {
  TargetGroupArn?: string;
  Targets?: TargetDescription[];
}
export const DeregisterTargetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    Targets: S.optional(TargetDescriptions),
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
  identifier: "DeregisterTargetsInput",
}) as any as S.Schema<DeregisterTargetsInput>;
export interface DeregisterTargetsOutput {}
export const DeregisterTargetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterTargetsOutput",
}) as any as S.Schema<DeregisterTargetsOutput>;
export type Marker = string;
export type PageSize = number;
export interface DescribeAccountLimitsInput {
  Marker?: string;
  PageSize?: number;
}
export const DescribeAccountLimitsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeAccountLimitsInput",
}) as any as S.Schema<DescribeAccountLimitsInput>;
export type Name = string;
export type Max = string;
export interface Limit {
  Name?: string;
  Max?: string;
}
export const Limit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Max: S.optional(S.String) }),
).annotate({ identifier: "Limit" }) as any as S.Schema<Limit>;
export type Limits = Limit[];
export const Limits = /*@__PURE__*/ S.Array(Limit);
export interface DescribeAccountLimitsOutput {
  Limits?: Limit[];
  NextMarker?: string;
}
export const DescribeAccountLimitsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Limits: S.optional(Limits),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountLimitsOutput",
}) as any as S.Schema<DescribeAccountLimitsOutput>;
export interface DescribeCapacityReservationInput {
  LoadBalancerArn?: string;
}
export const DescribeCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoadBalancerArn: S.optional(S.String) }).pipe(
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
  identifier: "DescribeCapacityReservationInput",
}) as any as S.Schema<DescribeCapacityReservationInput>;
export type LastModifiedTime = Date;
export type DecreaseRequestsRemaining = number;
export type CapacityUnits = number;
export interface MinimumLoadBalancerCapacity {
  CapacityUnits?: number;
}
export const MinimumLoadBalancerCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityUnits: S.optional(S.Number) }),
).annotate({
  identifier: "MinimumLoadBalancerCapacity",
}) as any as S.Schema<MinimumLoadBalancerCapacity>;
export type CapacityReservationStateEnum =
  | "provisioned"
  | "pending"
  | "rebalancing"
  | "failed"
  | (string & {});
export const CapacityReservationStateEnum = /*@__PURE__*/ S.String;

export interface CapacityReservationStatus {
  Code?: CapacityReservationStateEnum;
  Reason?: string;
}
export const CapacityReservationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(CapacityReservationStateEnum),
    Reason: S.optional(S.String),
  }),
).annotate({
  identifier: "CapacityReservationStatus",
}) as any as S.Schema<CapacityReservationStatus>;
export type CapacityUnitsDouble = number;
export interface ZonalCapacityReservationState {
  State?: CapacityReservationStatus;
  AvailabilityZone?: string;
  EffectiveCapacityUnits?: number;
}
export const ZonalCapacityReservationState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(CapacityReservationStatus),
    AvailabilityZone: S.optional(S.String),
    EffectiveCapacityUnits: S.optional(S.Number),
  }),
).annotate({
  identifier: "ZonalCapacityReservationState",
}) as any as S.Schema<ZonalCapacityReservationState>;
export type ZonalCapacityReservationStates = ZonalCapacityReservationState[];
export const ZonalCapacityReservationStates = /*@__PURE__*/ S.Array(
  ZonalCapacityReservationState,
);
export interface DescribeCapacityReservationOutput {
  LastModifiedTime?: Date;
  DecreaseRequestsRemaining?: number;
  MinimumLoadBalancerCapacity?: MinimumLoadBalancerCapacity;
  CapacityReservationState?: ZonalCapacityReservationState[];
}
export const DescribeCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DecreaseRequestsRemaining: S.optional(S.Number),
    MinimumLoadBalancerCapacity: S.optional(MinimumLoadBalancerCapacity),
    CapacityReservationState: S.optional(ZonalCapacityReservationStates),
  }).pipe(ns),
).annotate({
  identifier: "DescribeCapacityReservationOutput",
}) as any as S.Schema<DescribeCapacityReservationOutput>;
export interface DescribeListenerAttributesInput {
  ListenerArn?: string;
}
export const DescribeListenerAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerArn: S.optional(S.String) }).pipe(
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
  identifier: "DescribeListenerAttributesInput",
}) as any as S.Schema<DescribeListenerAttributesInput>;
export type ListenerAttributeKey = string;
export type ListenerAttributeValue = string;
export interface ListenerAttribute {
  Key?: string;
  Value?: string;
}
export const ListenerAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "ListenerAttribute",
}) as any as S.Schema<ListenerAttribute>;
export type ListenerAttributes = ListenerAttribute[];
export const ListenerAttributes = /*@__PURE__*/ S.Array(ListenerAttribute);
export interface DescribeListenerAttributesOutput {
  Attributes?: ListenerAttribute[];
}
export const DescribeListenerAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attributes: S.optional(ListenerAttributes) }).pipe(ns),
).annotate({
  identifier: "DescribeListenerAttributesOutput",
}) as any as S.Schema<DescribeListenerAttributesOutput>;
export interface DescribeListenerCertificatesInput {
  ListenerArn?: string;
  Marker?: string;
  PageSize?: number;
}
export const DescribeListenerCertificatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeListenerCertificatesInput",
}) as any as S.Schema<DescribeListenerCertificatesInput>;
export interface DescribeListenerCertificatesOutput {
  Certificates?: Certificate[];
  NextMarker?: string;
}
export const DescribeListenerCertificatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Certificates: S.optional(CertificateList),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeListenerCertificatesOutput",
}) as any as S.Schema<DescribeListenerCertificatesOutput>;
export type ListenerArns = string[];
export const ListenerArns = /*@__PURE__*/ S.Array(S.String);
export interface DescribeListenersInput {
  LoadBalancerArn?: string;
  ListenerArns?: string[];
  Marker?: string;
  PageSize?: number;
}
export const DescribeListenersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    ListenerArns: S.optional(ListenerArns),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeListenersInput",
}) as any as S.Schema<DescribeListenersInput>;
export interface DescribeListenersOutput {
  Listeners?: (Listener & {
    DefaultActions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
  })[];
  NextMarker?: string;
}
export const DescribeListenersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Listeners: S.optional(Listeners),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeListenersOutput",
}) as any as S.Schema<DescribeListenersOutput>;
export interface DescribeLoadBalancerAttributesInput {
  LoadBalancerArn?: string;
}
export const DescribeLoadBalancerAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoadBalancerArn: S.optional(S.String) }).pipe(
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
  identifier: "DescribeLoadBalancerAttributesInput",
}) as any as S.Schema<DescribeLoadBalancerAttributesInput>;
export type LoadBalancerAttributeKey = string;
export type LoadBalancerAttributeValue = string;
export interface LoadBalancerAttribute {
  Key?: string;
  Value?: string;
}
export const LoadBalancerAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "LoadBalancerAttribute",
}) as any as S.Schema<LoadBalancerAttribute>;
export type LoadBalancerAttributes = LoadBalancerAttribute[];
export const LoadBalancerAttributes = /*@__PURE__*/ S.Array(
  LoadBalancerAttribute,
);
export interface DescribeLoadBalancerAttributesOutput {
  Attributes?: LoadBalancerAttribute[];
}
export const DescribeLoadBalancerAttributesOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Attributes: S.optional(LoadBalancerAttributes) }).pipe(ns),
).annotate({
  identifier: "DescribeLoadBalancerAttributesOutput",
}) as any as S.Schema<DescribeLoadBalancerAttributesOutput>;
export type LoadBalancerNames = string[];
export const LoadBalancerNames = /*@__PURE__*/ S.Array(S.String);
export interface DescribeLoadBalancersInput {
  LoadBalancerArns?: string[];
  Names?: string[];
  Marker?: string;
  PageSize?: number;
}
export const DescribeLoadBalancersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArns: S.optional(LoadBalancerArns),
    Names: S.optional(LoadBalancerNames),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeLoadBalancersInput",
}) as any as S.Schema<DescribeLoadBalancersInput>;
export interface DescribeLoadBalancersOutput {
  LoadBalancers?: LoadBalancer[];
  NextMarker?: string;
}
export const DescribeLoadBalancersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancers: S.optional(LoadBalancers),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeLoadBalancersOutput",
}) as any as S.Schema<DescribeLoadBalancersOutput>;
export type RuleArns = string[];
export const RuleArns = /*@__PURE__*/ S.Array(S.String);
export interface DescribeRulesInput {
  ListenerArn?: string;
  RuleArns?: string[];
  Marker?: string;
  PageSize?: number;
}
export const DescribeRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    RuleArns: S.optional(RuleArns),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeRulesInput",
}) as any as S.Schema<DescribeRulesInput>;
export interface DescribeRulesOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
  NextMarker?: string;
}
export const DescribeRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(Rules), NextMarker: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeRulesOutput",
}) as any as S.Schema<DescribeRulesOutput>;
export type SslPolicyNames = string[];
export const SslPolicyNames = /*@__PURE__*/ S.Array(S.String);
export interface DescribeSSLPoliciesInput {
  Names?: string[];
  Marker?: string;
  PageSize?: number;
  LoadBalancerType?: LoadBalancerTypeEnum;
}
export const DescribeSSLPoliciesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(SslPolicyNames),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
    LoadBalancerType: S.optional(LoadBalancerTypeEnum),
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
  identifier: "DescribeSSLPoliciesInput",
}) as any as S.Schema<DescribeSSLPoliciesInput>;
export type SslProtocol = string;
export type SslProtocols = string[];
export const SslProtocols = /*@__PURE__*/ S.Array(S.String);
export type CipherName = string;
export type CipherPriority = number;
export interface Cipher {
  Name?: string;
  Priority?: number;
}
export const Cipher = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Priority: S.optional(S.Number) }),
).annotate({ identifier: "Cipher" }) as any as S.Schema<Cipher>;
export type Ciphers = Cipher[];
export const Ciphers = /*@__PURE__*/ S.Array(Cipher);
export interface SslPolicy {
  SslProtocols?: string[];
  Ciphers?: Cipher[];
  Name?: string;
  SupportedLoadBalancerTypes?: string[];
}
export const SslPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SslProtocols: S.optional(SslProtocols),
    Ciphers: S.optional(Ciphers),
    Name: S.optional(S.String),
    SupportedLoadBalancerTypes: S.optional(ListOfString),
  }),
).annotate({ identifier: "SslPolicy" }) as any as S.Schema<SslPolicy>;
export type SslPolicies = SslPolicy[];
export const SslPolicies = /*@__PURE__*/ S.Array(SslPolicy);
export interface DescribeSSLPoliciesOutput {
  SslPolicies?: SslPolicy[];
  NextMarker?: string;
}
export const DescribeSSLPoliciesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SslPolicies: S.optional(SslPolicies),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSSLPoliciesOutput",
}) as any as S.Schema<DescribeSSLPoliciesOutput>;
export interface DescribeTagsInput {
  ResourceArns?: string[];
}
export const DescribeTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArns: S.optional(ResourceArns) }).pipe(
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
  identifier: "DescribeTagsInput",
}) as any as S.Schema<DescribeTagsInput>;
export interface TagDescription {
  ResourceArn?: string;
  Tags?: Tag[];
}
export const TagDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({ identifier: "TagDescription" }) as any as S.Schema<TagDescription>;
export type TagDescriptions = TagDescription[];
export const TagDescriptions = /*@__PURE__*/ S.Array(TagDescription);
export interface DescribeTagsOutput {
  TagDescriptions?: (TagDescription & { Tags: (Tag & { Key: TagKey })[] })[];
}
export const DescribeTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagDescriptions: S.optional(TagDescriptions) }).pipe(ns),
).annotate({
  identifier: "DescribeTagsOutput",
}) as any as S.Schema<DescribeTagsOutput>;
export interface DescribeTargetGroupAttributesInput {
  TargetGroupArn?: string;
}
export const DescribeTargetGroupAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetGroupArn: S.optional(S.String) }).pipe(
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
  identifier: "DescribeTargetGroupAttributesInput",
}) as any as S.Schema<DescribeTargetGroupAttributesInput>;
export type TargetGroupAttributeKey = string;
export type TargetGroupAttributeValue = string;
export interface TargetGroupAttribute {
  Key?: string;
  Value?: string;
}
export const TargetGroupAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "TargetGroupAttribute",
}) as any as S.Schema<TargetGroupAttribute>;
export type TargetGroupAttributes = TargetGroupAttribute[];
export const TargetGroupAttributes =
  /*@__PURE__*/ S.Array(TargetGroupAttribute);
export interface DescribeTargetGroupAttributesOutput {
  Attributes?: TargetGroupAttribute[];
}
export const DescribeTargetGroupAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attributes: S.optional(TargetGroupAttributes) }).pipe(ns),
).annotate({
  identifier: "DescribeTargetGroupAttributesOutput",
}) as any as S.Schema<DescribeTargetGroupAttributesOutput>;
export type TargetGroupArns = string[];
export const TargetGroupArns = /*@__PURE__*/ S.Array(S.String);
export type TargetGroupNames = string[];
export const TargetGroupNames = /*@__PURE__*/ S.Array(S.String);
export interface DescribeTargetGroupsInput {
  LoadBalancerArn?: string;
  TargetGroupArns?: string[];
  Names?: string[];
  Marker?: string;
  PageSize?: number;
}
export const DescribeTargetGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    TargetGroupArns: S.optional(TargetGroupArns),
    Names: S.optional(TargetGroupNames),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeTargetGroupsInput",
}) as any as S.Schema<DescribeTargetGroupsInput>;
export interface DescribeTargetGroupsOutput {
  TargetGroups?: TargetGroup[];
  NextMarker?: string;
}
export const DescribeTargetGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroups: S.optional(TargetGroups),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTargetGroupsOutput",
}) as any as S.Schema<DescribeTargetGroupsOutput>;
export type DescribeTargetHealthInputIncludeEnum =
  | "AnomalyDetection"
  | "All"
  | (string & {});
export const DescribeTargetHealthInputIncludeEnum = /*@__PURE__*/ S.String;

export type ListOfDescribeTargetHealthIncludeOptions =
  DescribeTargetHealthInputIncludeEnum[];
export const ListOfDescribeTargetHealthIncludeOptions = /*@__PURE__*/ S.Array(
  DescribeTargetHealthInputIncludeEnum,
);
export interface DescribeTargetHealthInput {
  TargetGroupArn?: string;
  Targets?: TargetDescription[];
  Include?: DescribeTargetHealthInputIncludeEnum[];
}
export const DescribeTargetHealthInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    Targets: S.optional(TargetDescriptions),
    Include: S.optional(ListOfDescribeTargetHealthIncludeOptions),
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
  identifier: "DescribeTargetHealthInput",
}) as any as S.Schema<DescribeTargetHealthInput>;
export type TargetHealthStateEnum =
  | "initial"
  | "healthy"
  | "unhealthy"
  | "unhealthy.draining"
  | "unused"
  | "draining"
  | "unavailable"
  | (string & {});
export const TargetHealthStateEnum = /*@__PURE__*/ S.String;

export type TargetHealthReasonEnum =
  | "Elb.RegistrationInProgress"
  | "Elb.InitialHealthChecking"
  | "Target.ResponseCodeMismatch"
  | "Target.Timeout"
  | "Target.FailedHealthChecks"
  | "Target.NotRegistered"
  | "Target.NotInUse"
  | "Target.DeregistrationInProgress"
  | "Target.InvalidState"
  | "Target.IpUnusable"
  | "Target.HealthCheckDisabled"
  | "Elb.InternalError"
  | (string & {});
export const TargetHealthReasonEnum = /*@__PURE__*/ S.String;

export type Description = string;
export interface TargetHealth {
  State?: TargetHealthStateEnum;
  Reason?: TargetHealthReasonEnum;
  Description?: string;
}
export const TargetHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(TargetHealthStateEnum),
    Reason: S.optional(TargetHealthReasonEnum),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "TargetHealth" }) as any as S.Schema<TargetHealth>;
export type AnomalyResultEnum = "anomalous" | "normal" | (string & {});
export const AnomalyResultEnum = /*@__PURE__*/ S.String;

export type MitigationInEffectEnum = "yes" | "no" | (string & {});
export const MitigationInEffectEnum = /*@__PURE__*/ S.String;

export interface AnomalyDetection {
  Result?: AnomalyResultEnum;
  MitigationInEffect?: MitigationInEffectEnum;
}
export const AnomalyDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Result: S.optional(AnomalyResultEnum),
    MitigationInEffect: S.optional(MitigationInEffectEnum),
  }),
).annotate({
  identifier: "AnomalyDetection",
}) as any as S.Schema<AnomalyDetection>;
export type TargetAdministrativeOverrideStateEnum =
  | "unknown"
  | "no_override"
  | "zonal_shift_active"
  | "zonal_shift_delegated_to_dns"
  | (string & {});
export const TargetAdministrativeOverrideStateEnum = /*@__PURE__*/ S.String;

export type TargetAdministrativeOverrideReasonEnum =
  | "AdministrativeOverride.Unknown"
  | "AdministrativeOverride.NoOverride"
  | "AdministrativeOverride.ZonalShiftActive"
  | "AdministrativeOverride.ZonalShiftDelegatedToDns"
  | (string & {});
export const TargetAdministrativeOverrideReasonEnum = /*@__PURE__*/ S.String;

export interface AdministrativeOverride {
  State?: TargetAdministrativeOverrideStateEnum;
  Reason?: TargetAdministrativeOverrideReasonEnum;
  Description?: string;
}
export const AdministrativeOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(TargetAdministrativeOverrideStateEnum),
    Reason: S.optional(TargetAdministrativeOverrideReasonEnum),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "AdministrativeOverride",
}) as any as S.Schema<AdministrativeOverride>;
export interface TargetHealthDescription {
  Target?: TargetDescription;
  HealthCheckPort?: string;
  TargetHealth?: TargetHealth;
  AnomalyDetection?: AnomalyDetection;
  AdministrativeOverride?: AdministrativeOverride;
}
export const TargetHealthDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Target: S.optional(TargetDescription),
    HealthCheckPort: S.optional(S.String),
    TargetHealth: S.optional(TargetHealth),
    AnomalyDetection: S.optional(AnomalyDetection),
    AdministrativeOverride: S.optional(AdministrativeOverride),
  }),
).annotate({
  identifier: "TargetHealthDescription",
}) as any as S.Schema<TargetHealthDescription>;
export type TargetHealthDescriptions = TargetHealthDescription[];
export const TargetHealthDescriptions = /*@__PURE__*/ S.Array(
  TargetHealthDescription,
);
export interface DescribeTargetHealthOutput {
  TargetHealthDescriptions?: (TargetHealthDescription & {
    Target: TargetDescription & { Id: TargetId };
  })[];
}
export const DescribeTargetHealthOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetHealthDescriptions: S.optional(TargetHealthDescriptions),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTargetHealthOutput",
}) as any as S.Schema<DescribeTargetHealthOutput>;
export interface DescribeTrustStoreAssociationsInput {
  TrustStoreArn?: string;
  Marker?: string;
  PageSize?: number;
}
export const DescribeTrustStoreAssociationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeTrustStoreAssociationsInput",
}) as any as S.Schema<DescribeTrustStoreAssociationsInput>;
export type TrustStoreAssociationResourceArn = string;
export interface TrustStoreAssociation {
  ResourceArn?: string;
}
export const TrustStoreAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }),
).annotate({
  identifier: "TrustStoreAssociation",
}) as any as S.Schema<TrustStoreAssociation>;
export type TrustStoreAssociations = TrustStoreAssociation[];
export const TrustStoreAssociations = /*@__PURE__*/ S.Array(
  TrustStoreAssociation,
);
export interface DescribeTrustStoreAssociationsOutput {
  TrustStoreAssociations?: TrustStoreAssociation[];
  NextMarker?: string;
}
export const DescribeTrustStoreAssociationsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TrustStoreAssociations: S.optional(TrustStoreAssociations),
      NextMarker: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeTrustStoreAssociationsOutput",
}) as any as S.Schema<DescribeTrustStoreAssociationsOutput>;
export type RevocationIds = number[];
export const RevocationIds = /*@__PURE__*/ S.Array(S.Number);
export interface DescribeTrustStoreRevocationsInput {
  TrustStoreArn?: string;
  RevocationIds?: number[];
  Marker?: string;
  PageSize?: number;
}
export const DescribeTrustStoreRevocationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    RevocationIds: S.optional(RevocationIds),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeTrustStoreRevocationsInput",
}) as any as S.Schema<DescribeTrustStoreRevocationsInput>;
export interface DescribeTrustStoreRevocation {
  TrustStoreArn?: string;
  RevocationId?: number;
  RevocationType?: RevocationType;
  NumberOfRevokedEntries?: number;
}
export const DescribeTrustStoreRevocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    RevocationId: S.optional(S.Number),
    RevocationType: S.optional(RevocationType),
    NumberOfRevokedEntries: S.optional(S.Number),
  }),
).annotate({
  identifier: "DescribeTrustStoreRevocation",
}) as any as S.Schema<DescribeTrustStoreRevocation>;
export type DescribeTrustStoreRevocationResponse =
  DescribeTrustStoreRevocation[];
export const DescribeTrustStoreRevocationResponse = /*@__PURE__*/ S.Array(
  DescribeTrustStoreRevocation,
);
export interface DescribeTrustStoreRevocationsOutput {
  TrustStoreRevocations?: DescribeTrustStoreRevocation[];
  NextMarker?: string;
}
export const DescribeTrustStoreRevocationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreRevocations: S.optional(DescribeTrustStoreRevocationResponse),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTrustStoreRevocationsOutput",
}) as any as S.Schema<DescribeTrustStoreRevocationsOutput>;
export type TrustStoreArns = string[];
export const TrustStoreArns = /*@__PURE__*/ S.Array(S.String);
export type TrustStoreNames = string[];
export const TrustStoreNames = /*@__PURE__*/ S.Array(S.String);
export interface DescribeTrustStoresInput {
  TrustStoreArns?: string[];
  Names?: string[];
  Marker?: string;
  PageSize?: number;
}
export const DescribeTrustStoresInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArns: S.optional(TrustStoreArns),
    Names: S.optional(TrustStoreNames),
    Marker: S.optional(S.String),
    PageSize: S.optional(S.Number),
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
  identifier: "DescribeTrustStoresInput",
}) as any as S.Schema<DescribeTrustStoresInput>;
export interface DescribeTrustStoresOutput {
  TrustStores?: TrustStore[];
  NextMarker?: string;
}
export const DescribeTrustStoresOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStores: S.optional(TrustStores),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTrustStoresOutput",
}) as any as S.Schema<DescribeTrustStoresOutput>;
export interface GetResourcePolicyInput {
  ResourceArn?: string;
}
export const GetResourcePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
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
export type Policy = string;
export interface GetResourcePolicyOutput {
  Policy?: string;
}
export const GetResourcePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetResourcePolicyOutput",
}) as any as S.Schema<GetResourcePolicyOutput>;
export interface GetTrustStoreCaCertificatesBundleInput {
  TrustStoreArn?: string;
}
export const GetTrustStoreCaCertificatesBundleInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ TrustStoreArn: S.optional(S.String) }).pipe(
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
  identifier: "GetTrustStoreCaCertificatesBundleInput",
}) as any as S.Schema<GetTrustStoreCaCertificatesBundleInput>;
export type Location = string;
export interface GetTrustStoreCaCertificatesBundleOutput {
  Location?: string;
}
export const GetTrustStoreCaCertificatesBundleOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Location: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetTrustStoreCaCertificatesBundleOutput",
}) as any as S.Schema<GetTrustStoreCaCertificatesBundleOutput>;
export interface GetTrustStoreRevocationContentInput {
  TrustStoreArn?: string;
  RevocationId?: number;
}
export const GetTrustStoreRevocationContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    RevocationId: S.optional(S.Number),
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
  identifier: "GetTrustStoreRevocationContentInput",
}) as any as S.Schema<GetTrustStoreRevocationContentInput>;
export interface GetTrustStoreRevocationContentOutput {
  Location?: string;
}
export const GetTrustStoreRevocationContentOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Location: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetTrustStoreRevocationContentOutput",
}) as any as S.Schema<GetTrustStoreRevocationContentOutput>;
export type ResetCapacityReservation = boolean;
export interface ModifyCapacityReservationInput {
  LoadBalancerArn?: string;
  MinimumLoadBalancerCapacity?: MinimumLoadBalancerCapacity;
  ResetCapacityReservation?: boolean;
}
export const ModifyCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    MinimumLoadBalancerCapacity: S.optional(MinimumLoadBalancerCapacity),
    ResetCapacityReservation: S.optional(S.Boolean),
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
  identifier: "ModifyCapacityReservationInput",
}) as any as S.Schema<ModifyCapacityReservationInput>;
export interface ModifyCapacityReservationOutput {
  LastModifiedTime?: Date;
  DecreaseRequestsRemaining?: number;
  MinimumLoadBalancerCapacity?: MinimumLoadBalancerCapacity;
  CapacityReservationState?: ZonalCapacityReservationState[];
}
export const ModifyCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DecreaseRequestsRemaining: S.optional(S.Number),
    MinimumLoadBalancerCapacity: S.optional(MinimumLoadBalancerCapacity),
    CapacityReservationState: S.optional(ZonalCapacityReservationStates),
  }).pipe(ns),
).annotate({
  identifier: "ModifyCapacityReservationOutput",
}) as any as S.Schema<ModifyCapacityReservationOutput>;
export type RemoveIpamPoolEnum = "ipv4" | (string & {});
export const RemoveIpamPoolEnum = /*@__PURE__*/ S.String;

export type RemoveIpamPools = RemoveIpamPoolEnum[];
export const RemoveIpamPools = /*@__PURE__*/ S.Array(RemoveIpamPoolEnum);
export interface ModifyIpPoolsInput {
  LoadBalancerArn?: string;
  IpamPools?: IpamPools;
  RemoveIpamPools?: RemoveIpamPoolEnum[];
}
export const ModifyIpPoolsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    IpamPools: S.optional(IpamPools),
    RemoveIpamPools: S.optional(RemoveIpamPools),
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
  identifier: "ModifyIpPoolsInput",
}) as any as S.Schema<ModifyIpPoolsInput>;
export interface ModifyIpPoolsOutput {
  IpamPools?: IpamPools;
}
export const ModifyIpPoolsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IpamPools: S.optional(IpamPools) }).pipe(ns),
).annotate({
  identifier: "ModifyIpPoolsOutput",
}) as any as S.Schema<ModifyIpPoolsOutput>;
export interface ModifyListenerInput {
  ListenerArn?: string;
  Port?: number;
  Protocol?: ProtocolEnum;
  SslPolicy?: string;
  Certificates?: Certificate[];
  DefaultActions?: Action[];
  AlpnPolicy?: string[];
  MutualAuthentication?: MutualAuthenticationAttributes;
}
export const ModifyListenerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    Port: S.optional(S.Number),
    Protocol: S.optional(ProtocolEnum),
    SslPolicy: S.optional(S.String),
    Certificates: S.optional(CertificateList),
    DefaultActions: S.optional(Actions),
    AlpnPolicy: S.optional(AlpnPolicyName),
    MutualAuthentication: S.optional(MutualAuthenticationAttributes),
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
  identifier: "ModifyListenerInput",
}) as any as S.Schema<ModifyListenerInput>;
export interface ModifyListenerOutput {
  Listeners?: (Listener & {
    DefaultActions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
  })[];
}
export const ModifyListenerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listeners: S.optional(Listeners) }).pipe(ns),
).annotate({
  identifier: "ModifyListenerOutput",
}) as any as S.Schema<ModifyListenerOutput>;
export interface ModifyListenerAttributesInput {
  ListenerArn?: string;
  Attributes?: ListenerAttribute[];
}
export const ModifyListenerAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    Attributes: S.optional(ListenerAttributes),
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
  identifier: "ModifyListenerAttributesInput",
}) as any as S.Schema<ModifyListenerAttributesInput>;
export interface ModifyListenerAttributesOutput {
  Attributes?: ListenerAttribute[];
}
export const ModifyListenerAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attributes: S.optional(ListenerAttributes) }).pipe(ns),
).annotate({
  identifier: "ModifyListenerAttributesOutput",
}) as any as S.Schema<ModifyListenerAttributesOutput>;
export interface ModifyLoadBalancerAttributesInput {
  LoadBalancerArn?: string;
  Attributes?: LoadBalancerAttribute[];
}
export const ModifyLoadBalancerAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    Attributes: S.optional(LoadBalancerAttributes),
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
  identifier: "ModifyLoadBalancerAttributesInput",
}) as any as S.Schema<ModifyLoadBalancerAttributesInput>;
export interface ModifyLoadBalancerAttributesOutput {
  Attributes?: LoadBalancerAttribute[];
}
export const ModifyLoadBalancerAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attributes: S.optional(LoadBalancerAttributes) }).pipe(ns),
).annotate({
  identifier: "ModifyLoadBalancerAttributesOutput",
}) as any as S.Schema<ModifyLoadBalancerAttributesOutput>;
export type ResetTransforms = boolean;
export interface ModifyRuleInput {
  RuleArn?: string;
  Conditions?: RuleCondition[];
  Actions?: Action[];
  Transforms?: RuleTransform[];
  ResetTransforms?: boolean;
}
export const ModifyRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleArn: S.optional(S.String),
    Conditions: S.optional(RuleConditionList),
    Actions: S.optional(Actions),
    Transforms: S.optional(RuleTransformList),
    ResetTransforms: S.optional(S.Boolean),
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
  identifier: "ModifyRuleInput",
}) as any as S.Schema<ModifyRuleInput>;
export interface ModifyRuleOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
}
export const ModifyRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(Rules) }).pipe(ns),
).annotate({
  identifier: "ModifyRuleOutput",
}) as any as S.Schema<ModifyRuleOutput>;
export interface ModifyTargetGroupInput {
  TargetGroupArn?: string;
  HealthCheckProtocol?: ProtocolEnum;
  HealthCheckPort?: string;
  HealthCheckPath?: string;
  HealthCheckEnabled?: boolean;
  HealthCheckIntervalSeconds?: number;
  HealthCheckTimeoutSeconds?: number;
  HealthyThresholdCount?: number;
  UnhealthyThresholdCount?: number;
  Matcher?: Matcher;
}
export const ModifyTargetGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    HealthCheckProtocol: S.optional(ProtocolEnum),
    HealthCheckPort: S.optional(S.String),
    HealthCheckPath: S.optional(S.String),
    HealthCheckEnabled: S.optional(S.Boolean),
    HealthCheckIntervalSeconds: S.optional(S.Number),
    HealthCheckTimeoutSeconds: S.optional(S.Number),
    HealthyThresholdCount: S.optional(S.Number),
    UnhealthyThresholdCount: S.optional(S.Number),
    Matcher: S.optional(Matcher),
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
  identifier: "ModifyTargetGroupInput",
}) as any as S.Schema<ModifyTargetGroupInput>;
export interface ModifyTargetGroupOutput {
  TargetGroups?: TargetGroup[];
}
export const ModifyTargetGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetGroups: S.optional(TargetGroups) }).pipe(ns),
).annotate({
  identifier: "ModifyTargetGroupOutput",
}) as any as S.Schema<ModifyTargetGroupOutput>;
export interface ModifyTargetGroupAttributesInput {
  TargetGroupArn?: string;
  Attributes?: TargetGroupAttribute[];
}
export const ModifyTargetGroupAttributesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    Attributes: S.optional(TargetGroupAttributes),
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
  identifier: "ModifyTargetGroupAttributesInput",
}) as any as S.Schema<ModifyTargetGroupAttributesInput>;
export interface ModifyTargetGroupAttributesOutput {
  Attributes?: TargetGroupAttribute[];
}
export const ModifyTargetGroupAttributesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attributes: S.optional(TargetGroupAttributes) }).pipe(ns),
).annotate({
  identifier: "ModifyTargetGroupAttributesOutput",
}) as any as S.Schema<ModifyTargetGroupAttributesOutput>;
export interface ModifyTrustStoreInput {
  TrustStoreArn?: string;
  CaCertificatesBundleS3Bucket?: string;
  CaCertificatesBundleS3Key?: string;
  CaCertificatesBundleS3ObjectVersion?: string;
}
export const ModifyTrustStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    CaCertificatesBundleS3Bucket: S.optional(S.String),
    CaCertificatesBundleS3Key: S.optional(S.String),
    CaCertificatesBundleS3ObjectVersion: S.optional(S.String),
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
  identifier: "ModifyTrustStoreInput",
}) as any as S.Schema<ModifyTrustStoreInput>;
export interface ModifyTrustStoreOutput {
  TrustStores?: TrustStore[];
}
export const ModifyTrustStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrustStores: S.optional(TrustStores) }).pipe(ns),
).annotate({
  identifier: "ModifyTrustStoreOutput",
}) as any as S.Schema<ModifyTrustStoreOutput>;
export interface RegisterTargetsInput {
  TargetGroupArn?: string;
  Targets?: TargetDescription[];
}
export const RegisterTargetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetGroupArn: S.optional(S.String),
    Targets: S.optional(TargetDescriptions),
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
  identifier: "RegisterTargetsInput",
}) as any as S.Schema<RegisterTargetsInput>;
export interface RegisterTargetsOutput {}
export const RegisterTargetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterTargetsOutput",
}) as any as S.Schema<RegisterTargetsOutput>;
export interface RemoveListenerCertificatesInput {
  ListenerArn?: string;
  Certificates?: Certificate[];
}
export const RemoveListenerCertificatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    Certificates: S.optional(CertificateList),
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
  identifier: "RemoveListenerCertificatesInput",
}) as any as S.Schema<RemoveListenerCertificatesInput>;
export interface RemoveListenerCertificatesOutput {}
export const RemoveListenerCertificatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveListenerCertificatesOutput",
}) as any as S.Schema<RemoveListenerCertificatesOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface RemoveTagsInput {
  ResourceArns?: string[];
  TagKeys?: string[];
}
export const RemoveTagsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArns: S.optional(ResourceArns),
    TagKeys: S.optional(TagKeys),
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
  identifier: "RemoveTagsInput",
}) as any as S.Schema<RemoveTagsInput>;
export interface RemoveTagsOutput {}
export const RemoveTagsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsOutput",
}) as any as S.Schema<RemoveTagsOutput>;
export interface RemoveTrustStoreRevocationsInput {
  TrustStoreArn?: string;
  RevocationIds?: number[];
}
export const RemoveTrustStoreRevocationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustStoreArn: S.optional(S.String),
    RevocationIds: S.optional(RevocationIds),
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
  identifier: "RemoveTrustStoreRevocationsInput",
}) as any as S.Schema<RemoveTrustStoreRevocationsInput>;
export interface RemoveTrustStoreRevocationsOutput {}
export const RemoveTrustStoreRevocationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTrustStoreRevocationsOutput",
}) as any as S.Schema<RemoveTrustStoreRevocationsOutput>;
export interface SetIpAddressTypeInput {
  LoadBalancerArn?: string;
  IpAddressType?: IpAddressType;
}
export const SetIpAddressTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
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
  identifier: "SetIpAddressTypeInput",
}) as any as S.Schema<SetIpAddressTypeInput>;
export interface SetIpAddressTypeOutput {
  IpAddressType?: IpAddressType;
}
export const SetIpAddressTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IpAddressType: S.optional(IpAddressType) }).pipe(ns),
).annotate({
  identifier: "SetIpAddressTypeOutput",
}) as any as S.Schema<SetIpAddressTypeOutput>;
export interface RulePriorityPair {
  RuleArn?: string;
  Priority?: number;
}
export const RulePriorityPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleArn: S.optional(S.String), Priority: S.optional(S.Number) }),
).annotate({
  identifier: "RulePriorityPair",
}) as any as S.Schema<RulePriorityPair>;
export type RulePriorityList = RulePriorityPair[];
export const RulePriorityList = /*@__PURE__*/ S.Array(RulePriorityPair);
export interface SetRulePrioritiesInput {
  RulePriorities?: RulePriorityPair[];
}
export const SetRulePrioritiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RulePriorities: S.optional(RulePriorityList) }).pipe(
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
  identifier: "SetRulePrioritiesInput",
}) as any as S.Schema<SetRulePrioritiesInput>;
export interface SetRulePrioritiesOutput {
  Rules?: (Rule & {
    Actions: (Action & {
      Type: ActionTypeEnum;
      AuthenticateOidcConfig: AuthenticateOidcActionConfig & {
        Issuer: AuthenticateOidcActionIssuer;
        AuthorizationEndpoint: AuthenticateOidcActionAuthorizationEndpoint;
        TokenEndpoint: AuthenticateOidcActionTokenEndpoint;
        UserInfoEndpoint: AuthenticateOidcActionUserInfoEndpoint;
        ClientId: AuthenticateOidcActionClientId;
      };
      AuthenticateCognitoConfig: AuthenticateCognitoActionConfig & {
        UserPoolArn: AuthenticateCognitoActionUserPoolArn;
        UserPoolClientId: AuthenticateCognitoActionUserPoolClientId;
        UserPoolDomain: AuthenticateCognitoActionUserPoolDomain;
      };
      RedirectConfig: RedirectActionConfig & {
        StatusCode: RedirectActionStatusCodeEnum;
      };
      FixedResponseConfig: FixedResponseActionConfig & {
        StatusCode: FixedResponseActionStatusCode;
      };
      JwtValidationConfig: JwtValidationActionConfig & {
        JwksEndpoint: JwtValidationActionJwksEndpoint;
        Issuer: JwtValidationActionIssuer;
        AdditionalClaims: (JwtValidationActionAdditionalClaim & {
          Format: JwtValidationActionAdditionalClaimFormatEnum;
          Name: JwtValidationActionAdditionalClaimName;
          Values: JwtValidationActionAdditionalClaimValues;
        })[];
      };
    })[];
    Transforms: (RuleTransform & {
      Type: TransformTypeEnum;
      HostHeaderRewriteConfig: HostHeaderRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
      UrlRewriteConfig: UrlRewriteConfig & {
        Rewrites: (RewriteConfig & {
          Regex: StringValue;
          Replace: StringValue;
        })[];
      };
    })[];
  })[];
}
export const SetRulePrioritiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rules: S.optional(Rules) }).pipe(ns),
).annotate({
  identifier: "SetRulePrioritiesOutput",
}) as any as S.Schema<SetRulePrioritiesOutput>;
export type EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum =
  | "on"
  | "off"
  | (string & {});
export const EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum =
  /*@__PURE__*/ S.String;

export interface SetSecurityGroupsInput {
  LoadBalancerArn?: string;
  SecurityGroups?: string[];
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic?: EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum;
}
export const SetSecurityGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroups),
    EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: S.optional(
      EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum,
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
  identifier: "SetSecurityGroupsInput",
}) as any as S.Schema<SetSecurityGroupsInput>;
export interface SetSecurityGroupsOutput {
  SecurityGroupIds?: string[];
  EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic?: EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum;
}
export const SetSecurityGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityGroupIds: S.optional(SecurityGroups),
    EnforceSecurityGroupInboundRulesOnPrivateLinkTraffic: S.optional(
      EnforceSecurityGroupInboundRulesOnPrivateLinkTrafficEnum,
    ),
  }).pipe(ns),
).annotate({
  identifier: "SetSecurityGroupsOutput",
}) as any as S.Schema<SetSecurityGroupsOutput>;
export interface SetSubnetsInput {
  LoadBalancerArn?: string;
  Subnets?: string[];
  SubnetMappings?: SubnetMapping[];
  IpAddressType?: IpAddressType;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
}
export const SetSubnetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerArn: S.optional(S.String),
    Subnets: S.optional(Subnets),
    SubnetMappings: S.optional(SubnetMappings),
    IpAddressType: S.optional(IpAddressType),
    EnablePrefixForIpv6SourceNat: S.optional(EnablePrefixForIpv6SourceNatEnum),
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
  identifier: "SetSubnetsInput",
}) as any as S.Schema<SetSubnetsInput>;
export interface SetSubnetsOutput {
  AvailabilityZones?: AvailabilityZone[];
  IpAddressType?: IpAddressType;
  EnablePrefixForIpv6SourceNat?: EnablePrefixForIpv6SourceNatEnum;
}
export const SetSubnetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(AvailabilityZones),
    IpAddressType: S.optional(IpAddressType),
    EnablePrefixForIpv6SourceNat: S.optional(EnablePrefixForIpv6SourceNatEnum),
  }).pipe(ns),
).annotate({
  identifier: "SetSubnetsOutput",
}) as any as S.Schema<SetSubnetsOutput>;
export type ErrorDescription = string;
export type AddListenerCertificatesError =
  | CertificateNotFoundException
  | ListenerNotFoundException
  | TooManyCertificatesException
  | CommonErrors;
/**
 * Adds the specified SSL server certificate to the certificate list for the specified HTTPS
 * or TLS listener.
 *
 * If the certificate in already in the certificate list, the call is successful but the
 * certificate is not added again.
 *
 * For more information, see SSL
 * certificates in the *Application Load Balancers Guide* or Server
 * certificates in the *Network Load Balancers Guide*.
 */
export const addListenerCertificates: API.OperationMethod<
  AddListenerCertificatesInput,
  AddListenerCertificatesOutput,
  AddListenerCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddListenerCertificatesInput,
  output: AddListenerCertificatesOutput,
  errors: [
    CertificateNotFoundException,
    ListenerNotFoundException,
    TooManyCertificatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddListenerCertificates",
}));

export type AddTagsError =
  | DuplicateTagKeysException
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | RuleNotFoundException
  | TargetGroupNotFoundException
  | TooManyTagsException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Adds the specified tags to the specified Elastic Load Balancing resource. You can tag your
 * Application Load Balancers, Network Load Balancers, Gateway Load Balancers, target groups,
 * trust stores, listeners, and rules.
 *
 * Each tag consists of a key and an optional value. If a resource already has a tag with the
 * same key, `AddTags` updates its value.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsInput,
  output: AddTagsOutput,
  errors: [
    DuplicateTagKeysException,
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    RuleNotFoundException,
    TargetGroupNotFoundException,
    TooManyTagsException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type AddTrustStoreRevocationsError =
  | InvalidRevocationContentException
  | RevocationContentNotFoundException
  | TooManyTrustStoreRevocationEntriesException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Adds the specified revocation file to the specified trust store.
 */
export const addTrustStoreRevocations: API.OperationMethod<
  AddTrustStoreRevocationsInput,
  AddTrustStoreRevocationsOutput,
  AddTrustStoreRevocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTrustStoreRevocationsInput,
  output: AddTrustStoreRevocationsOutput,
  errors: [
    InvalidRevocationContentException,
    RevocationContentNotFoundException,
    TooManyTrustStoreRevocationEntriesException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTrustStoreRevocations",
}));

export type CreateListenerError =
  | ALPNPolicyNotSupportedException
  | CertificateNotFoundException
  | DuplicateListenerException
  | IncompatibleProtocolsException
  | InvalidConfigurationRequestException
  | InvalidLoadBalancerActionException
  | LoadBalancerNotFoundException
  | SSLPolicyNotFoundException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyCertificatesException
  | TooManyListenersException
  | TooManyRegistrationsForTargetIdException
  | TooManyTagsException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | TrustStoreNotFoundException
  | TrustStoreNotReadyException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Creates a listener for the specified Application Load Balancer, Network Load Balancer, or
 * Gateway Load Balancer.
 *
 * For more information, see the following:
 *
 * - Listeners for
 * your Application Load Balancers
 *
 * - Listeners for
 * your Network Load Balancers
 *
 * - Listeners for your
 * Gateway Load Balancers
 *
 * This operation is idempotent, which means that it completes at most one time. If you
 * attempt to create multiple listeners with the same settings, each call succeeds.
 */
export const createListener: API.OperationMethod<
  CreateListenerInput,
  CreateListenerOutput,
  CreateListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateListenerInput,
  output: CreateListenerOutput,
  errors: [
    ALPNPolicyNotSupportedException,
    CertificateNotFoundException,
    DuplicateListenerException,
    IncompatibleProtocolsException,
    InvalidConfigurationRequestException,
    InvalidLoadBalancerActionException,
    LoadBalancerNotFoundException,
    SSLPolicyNotFoundException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyCertificatesException,
    TooManyListenersException,
    TooManyRegistrationsForTargetIdException,
    TooManyTagsException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    TrustStoreNotFoundException,
    TrustStoreNotReadyException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateListener",
}));

export type CreateLoadBalancerError =
  | AllocationIdNotFoundException
  | AvailabilityZoneNotSupportedException
  | DuplicateLoadBalancerNameException
  | DuplicateTagKeysException
  | InvalidConfigurationRequestException
  | InvalidSchemeException
  | InvalidSecurityGroupException
  | InvalidSubnetException
  | OperationNotPermittedException
  | ResourceInUseException
  | SubnetNotFoundException
  | TooManyLoadBalancersException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates an Application Load Balancer, Network Load Balancer, or Gateway Load
 * Balancer.
 *
 * For more information, see the following:
 *
 * - Application Load Balancers
 *
 * - Network Load
 * Balancers
 *
 * - Gateway Load
 * Balancers
 *
 * This operation is idempotent, which means that it completes at most one time. If you
 * attempt to create multiple load balancers with the same settings, each call succeeds.
 */
export const createLoadBalancer: API.OperationMethod<
  CreateLoadBalancerInput,
  CreateLoadBalancerOutput,
  CreateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLoadBalancerInput,
  output: CreateLoadBalancerOutput,
  errors: [
    AllocationIdNotFoundException,
    AvailabilityZoneNotSupportedException,
    DuplicateLoadBalancerNameException,
    DuplicateTagKeysException,
    InvalidConfigurationRequestException,
    InvalidSchemeException,
    InvalidSecurityGroupException,
    InvalidSubnetException,
    OperationNotPermittedException,
    ResourceInUseException,
    SubnetNotFoundException,
    TooManyLoadBalancersException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancer",
}));

export type CreateRuleError =
  | IncompatibleProtocolsException
  | InvalidConfigurationRequestException
  | InvalidLoadBalancerActionException
  | ListenerNotFoundException
  | PriorityInUseException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyRegistrationsForTargetIdException
  | TooManyRulesException
  | TooManyTagsException
  | TooManyTargetGroupsException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Creates a rule for the specified listener. The listener must be associated with an
 * Application Load Balancer.
 *
 * Each rule consists of a priority, one or more actions, one or more conditions, and
 * up to two optional transforms. Rules are evaluated in priority order, from the lowest value
 * to the highest value. When the conditions for a rule are met, its actions are performed.
 * If the conditions for no rules are met, the actions for the default rule are performed.
 * For more information, see Listener rules in the *Application Load Balancers Guide*.
 */
export const createRule: API.OperationMethod<
  CreateRuleInput,
  CreateRuleOutput,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleInput,
  output: CreateRuleOutput,
  errors: [
    IncompatibleProtocolsException,
    InvalidConfigurationRequestException,
    InvalidLoadBalancerActionException,
    ListenerNotFoundException,
    PriorityInUseException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyRegistrationsForTargetIdException,
    TooManyRulesException,
    TooManyTagsException,
    TooManyTargetGroupsException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

export type CreateTargetGroupError =
  | DuplicateTargetGroupNameException
  | InvalidConfigurationRequestException
  | TooManyTagsException
  | TooManyTargetGroupsException
  | CommonErrors;
/**
 * Creates a target group.
 *
 * For more information, see the following:
 *
 * - Target
 * groups for your Application Load Balancers
 *
 * - Target groups
 * for your Network Load Balancers
 *
 * - Target groups for your
 * Gateway Load Balancers
 *
 * This operation is idempotent, which means that it completes at most one time. If you
 * attempt to create multiple target groups with the same settings, each call succeeds.
 */
export const createTargetGroup: API.OperationMethod<
  CreateTargetGroupInput,
  CreateTargetGroupOutput,
  CreateTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTargetGroupInput,
  output: CreateTargetGroupOutput,
  errors: [
    DuplicateTargetGroupNameException,
    InvalidConfigurationRequestException,
    TooManyTagsException,
    TooManyTargetGroupsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTargetGroup",
}));

export type CreateTrustStoreError =
  | CaCertificatesBundleNotFoundException
  | DuplicateTagKeysException
  | DuplicateTrustStoreNameException
  | InvalidCaCertificatesBundleException
  | TooManyTagsException
  | TooManyTrustStoresException
  | CommonErrors;
/**
 * Creates a trust store.
 *
 * For more information, see Mutual TLS for Application Load Balancers.
 */
export const createTrustStore: API.OperationMethod<
  CreateTrustStoreInput,
  CreateTrustStoreOutput,
  CreateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrustStoreInput,
  output: CreateTrustStoreOutput,
  errors: [
    CaCertificatesBundleNotFoundException,
    DuplicateTagKeysException,
    DuplicateTrustStoreNameException,
    InvalidCaCertificatesBundleException,
    TooManyTagsException,
    TooManyTrustStoresException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustStore",
}));

export type DeleteListenerError =
  | ListenerNotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified listener.
 *
 * Alternatively, your listener is deleted when you delete the load balancer to which it is
 * attached.
 */
export const deleteListener: API.OperationMethod<
  DeleteListenerInput,
  DeleteListenerOutput,
  DeleteListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteListenerInput,
  output: DeleteListenerOutput,
  errors: [ListenerNotFoundException, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteListener",
}));

export type DeleteLoadBalancerError =
  | LoadBalancerNotFoundException
  | OperationNotPermittedException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes the specified Application Load Balancer, Network Load Balancer, or Gateway Load
 * Balancer. Deleting a load balancer also deletes its listeners.
 *
 * You can't delete a load balancer if deletion protection is enabled. If the load balancer
 * does not exist or has already been deleted, the call succeeds.
 *
 * Deleting a load balancer does not affect its registered targets. For example, your EC2
 * instances continue to run and are still registered to their target groups. If you no longer
 * need these EC2 instances, you can stop or terminate them.
 */
export const deleteLoadBalancer: API.OperationMethod<
  DeleteLoadBalancerInput,
  DeleteLoadBalancerOutput,
  DeleteLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLoadBalancerInput,
  output: DeleteLoadBalancerOutput,
  errors: [
    LoadBalancerNotFoundException,
    OperationNotPermittedException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancer",
}));

export type DeleteRuleError =
  | OperationNotPermittedException
  | RuleNotFoundException
  | CommonErrors;
/**
 * Deletes the specified rule.
 *
 * You can't delete the default rule.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleInput,
  DeleteRuleOutput,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleInput,
  output: DeleteRuleOutput,
  errors: [OperationNotPermittedException, RuleNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

export type DeleteSharedTrustStoreAssociationError =
  | DeleteAssociationSameAccountException
  | TrustStoreAssociationNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Deletes a shared trust store association.
 */
export const deleteSharedTrustStoreAssociation: API.OperationMethod<
  DeleteSharedTrustStoreAssociationInput,
  DeleteSharedTrustStoreAssociationOutput,
  DeleteSharedTrustStoreAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSharedTrustStoreAssociationInput,
  output: DeleteSharedTrustStoreAssociationOutput,
  errors: [
    DeleteAssociationSameAccountException,
    TrustStoreAssociationNotFoundException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSharedTrustStoreAssociation",
}));

export type DeleteTargetGroupError = ResourceInUseException | CommonErrors;
/**
 * Deletes the specified target group.
 *
 * You can delete a target group if it is not referenced by any actions. Deleting a target
 * group also deletes any associated health checks. Deleting a target group does not affect its
 * registered targets. For example, any EC2 instances continue to run until you stop or terminate
 * them.
 */
export const deleteTargetGroup: API.OperationMethod<
  DeleteTargetGroupInput,
  DeleteTargetGroupOutput,
  DeleteTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTargetGroupInput,
  output: DeleteTargetGroupOutput,
  errors: [ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetGroup",
}));

export type DeleteTrustStoreError =
  | TrustStoreInUseException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Deletes a trust store.
 */
export const deleteTrustStore: API.OperationMethod<
  DeleteTrustStoreInput,
  DeleteTrustStoreOutput,
  DeleteTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrustStoreInput,
  output: DeleteTrustStoreOutput,
  errors: [TrustStoreInUseException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustStore",
}));

export type DeregisterTargetsError =
  | InvalidTargetException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Deregisters the specified targets from the specified target group. After the targets are
 * deregistered, they no longer receive traffic from the load balancer.
 *
 * The load balancer stops sending requests to targets that are deregistering, but uses
 * connection draining to ensure that in-flight traffic completes on the existing connections.
 * This deregistration delay is configured by default but can be updated for each target group.
 *
 * For more information, see the following:
 *
 * -
 * Deregistration delay in the *Application Load Balancers User Guide*
 *
 * -
 * Deregistration delay in the *Network Load Balancers User Guide*
 *
 * -
 * Deregistration delay in the *Gateway Load Balancers User Guide*
 *
 * Note: If the specified target does not exist, the action returns successfully.
 */
export const deregisterTargets: API.OperationMethod<
  DeregisterTargetsInput,
  DeregisterTargetsOutput,
  DeregisterTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterTargetsInput,
  output: DeregisterTargetsOutput,
  errors: [InvalidTargetException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTargets",
}));

export type DescribeAccountLimitsError = CommonErrors;
/**
 * Describes the current Elastic Load Balancing resource limits for your Amazon Web Services
 * account.
 *
 * For more information, see the following:
 *
 * - Quotas for your
 * Application Load Balancers
 *
 * - Quotas for your
 * Network Load Balancers
 *
 * - Quotas for your Gateway
 * Load Balancers
 */
export const describeAccountLimits: API.PaginatedOperationMethod<
  DescribeAccountLimitsInput,
  DescribeAccountLimitsOutput,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient,
  Limit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAccountLimitsInput,
  output: DescribeAccountLimitsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Limits",
  } as const,
})) as any;

export type DescribeCapacityReservationError =
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Describes the capacity reservation status for the specified load balancer.
 */
export const describeCapacityReservation: API.OperationMethod<
  DescribeCapacityReservationInput,
  DescribeCapacityReservationOutput,
  DescribeCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCapacityReservationInput,
  output: DescribeCapacityReservationOutput,
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCapacityReservation",
}));

export type DescribeListenerAttributesError =
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified listener.
 */
export const describeListenerAttributes: API.OperationMethod<
  DescribeListenerAttributesInput,
  DescribeListenerAttributesOutput,
  DescribeListenerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeListenerAttributesInput,
  output: DescribeListenerAttributesOutput,
  errors: [ListenerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListenerAttributes",
}));

export type DescribeListenerCertificatesError =
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Describes the default certificate and the certificate list for the specified HTTPS or TLS
 * listener.
 *
 * If the default certificate is also in the certificate list, it appears twice in the
 * results (once with `IsDefault` set to true and once with `IsDefault` set
 * to false).
 *
 * For more information, see SSL certificates in the *Application Load Balancers Guide* or
 * Server certificates in the Network Load Balancers
 * Guide.
 */
export const describeListenerCertificates: API.PaginatedOperationMethod<
  DescribeListenerCertificatesInput,
  DescribeListenerCertificatesOutput,
  DescribeListenerCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeListenerCertificatesInput,
  output: DescribeListenerCertificatesOutput,
  errors: [ListenerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListenerCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Certificates",
  } as const,
})) as any;

export type DescribeListenersError =
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Describes the specified listeners or the listeners for the specified Application Load
 * Balancer, Network Load Balancer, or Gateway Load Balancer. You must specify either a load
 * balancer or one or more listeners.
 */
export const describeListeners: API.PaginatedOperationMethod<
  DescribeListenersInput,
  DescribeListenersOutput,
  DescribeListenersError,
  Credentials | HttpClient.HttpClient,
  Listener
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeListenersInput,
  output: DescribeListenersOutput,
  errors: [
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListeners",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Listeners",
  } as const,
})) as any;

export type DescribeLoadBalancerAttributesError =
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified Application Load Balancer, Network Load
 * Balancer, or Gateway Load Balancer.
 *
 * For more information, see the following:
 *
 * - Load balancer attributes in the Application Load Balancers
 * Guide
 *
 * - Load balancer attributes in the Network Load Balancers
 * Guide
 *
 * - Load balancer attributes in the Gateway Load Balancers
 * Guide
 */
export const describeLoadBalancerAttributes: API.OperationMethod<
  DescribeLoadBalancerAttributesInput,
  DescribeLoadBalancerAttributesOutput,
  DescribeLoadBalancerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLoadBalancerAttributesInput,
  output: DescribeLoadBalancerAttributesOutput,
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerAttributes",
}));

export type DescribeLoadBalancersError =
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Describes the specified load balancers or all of your load balancers.
 */
export const describeLoadBalancers: API.PaginatedOperationMethod<
  DescribeLoadBalancersInput,
  DescribeLoadBalancersOutput,
  DescribeLoadBalancersError,
  Credentials | HttpClient.HttpClient,
  LoadBalancer
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeLoadBalancersInput,
  output: DescribeLoadBalancersOutput,
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancers",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "LoadBalancers",
  } as const,
})) as any;

export type DescribeRulesError =
  | ListenerNotFoundException
  | RuleNotFoundException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Describes the specified rules or the rules for the specified listener. You must specify
 * either a listener or rules.
 */
export const describeRules: API.PaginatedOperationMethod<
  DescribeRulesInput,
  DescribeRulesOutput,
  DescribeRulesError,
  Credentials | HttpClient.HttpClient,
  Rule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRulesInput,
  output: DescribeRulesOutput,
  errors: [
    ListenerNotFoundException,
    RuleNotFoundException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRules",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Rules",
  } as const,
})) as any;

export type DescribeSSLPoliciesError =
  | SSLPolicyNotFoundException
  | CommonErrors;
/**
 * Describes the specified policies or all policies used for SSL negotiation.
 *
 * For more information, see Security policies in the *Application Load Balancers Guide* and
 * Security policies in the *Network Load Balancers Guide*.
 */
export const describeSSLPolicies: API.OperationMethod<
  DescribeSSLPoliciesInput,
  DescribeSSLPoliciesOutput,
  DescribeSSLPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSSLPoliciesInput,
  output: DescribeSSLPoliciesOutput,
  errors: [SSLPolicyNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSSLPolicies",
}));

export type DescribeTagsError =
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | RuleNotFoundException
  | TargetGroupNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes the tags for the specified Elastic Load Balancing resources. You can describe
 * the tags for one or more Application Load Balancers, Network Load Balancers, Gateway Load
 * Balancers, target groups, listeners, or rules.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsInput,
  DescribeTagsOutput,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTagsInput,
  output: DescribeTagsOutput,
  errors: [
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    RuleNotFoundException,
    TargetGroupNotFoundException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

export type DescribeTargetGroupAttributesError =
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified target group.
 *
 * For more information, see the following:
 *
 * - Target group attributes in the Application Load Balancers
 * Guide
 *
 * - Target group attributes in the Network Load Balancers
 * Guide
 *
 * - Target group attributes in the Gateway Load Balancers
 * Guide
 */
export const describeTargetGroupAttributes: API.OperationMethod<
  DescribeTargetGroupAttributesInput,
  DescribeTargetGroupAttributesOutput,
  DescribeTargetGroupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTargetGroupAttributesInput,
  output: DescribeTargetGroupAttributesOutput,
  errors: [TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetGroupAttributes",
}));

export type DescribeTargetGroupsError =
  | LoadBalancerNotFoundException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Describes the specified target groups or all of your target groups. By default, all target
 * groups are described. Alternatively, you can specify one of the following to filter the
 * results: the ARN of the load balancer, the names of one or more target groups, or the ARNs of
 * one or more target groups.
 */
export const describeTargetGroups: API.PaginatedOperationMethod<
  DescribeTargetGroupsInput,
  DescribeTargetGroupsOutput,
  DescribeTargetGroupsError,
  Credentials | HttpClient.HttpClient,
  TargetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTargetGroupsInput,
  output: DescribeTargetGroupsOutput,
  errors: [LoadBalancerNotFoundException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TargetGroups",
  } as const,
})) as any;

export type DescribeTargetHealthError =
  | HealthUnavailableException
  | InvalidTargetException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Describes the health of the specified targets or all of your targets.
 */
export const describeTargetHealth: API.OperationMethod<
  DescribeTargetHealthInput,
  DescribeTargetHealthOutput,
  DescribeTargetHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTargetHealthInput,
  output: DescribeTargetHealthOutput,
  errors: [
    HealthUnavailableException,
    InvalidTargetException,
    TargetGroupNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTargetHealth",
}));

export type DescribeTrustStoreAssociationsError =
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes all resources associated with the specified trust store.
 */
export const describeTrustStoreAssociations: API.PaginatedOperationMethod<
  DescribeTrustStoreAssociationsInput,
  DescribeTrustStoreAssociationsOutput,
  DescribeTrustStoreAssociationsError,
  Credentials | HttpClient.HttpClient,
  TrustStoreAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTrustStoreAssociationsInput,
  output: DescribeTrustStoreAssociationsOutput,
  errors: [TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustStoreAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStoreAssociations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type DescribeTrustStoreRevocationsError =
  | RevocationIdNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes the revocation files in use by the specified trust store or revocation
 * files.
 */
export const describeTrustStoreRevocations: API.PaginatedOperationMethod<
  DescribeTrustStoreRevocationsInput,
  DescribeTrustStoreRevocationsOutput,
  DescribeTrustStoreRevocationsError,
  Credentials | HttpClient.HttpClient,
  DescribeTrustStoreRevocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTrustStoreRevocationsInput,
  output: DescribeTrustStoreRevocationsOutput,
  errors: [RevocationIdNotFoundException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustStoreRevocations",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStoreRevocations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type DescribeTrustStoresError =
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Describes all trust stores for the specified account.
 */
export const describeTrustStores: API.PaginatedOperationMethod<
  DescribeTrustStoresInput,
  DescribeTrustStoresOutput,
  DescribeTrustStoresError,
  Credentials | HttpClient.HttpClient,
  TrustStore
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTrustStoresInput,
  output: DescribeTrustStoresOutput,
  errors: [TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTrustStores",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "TrustStores",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetResourcePolicyError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves the resource policy for a specified resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyInput,
  output: GetResourcePolicyOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetTrustStoreCaCertificatesBundleError =
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Retrieves the ca certificate bundle.
 *
 * This action returns a pre-signed S3 URI which is
 * active for ten minutes.
 */
export const getTrustStoreCaCertificatesBundle: API.OperationMethod<
  GetTrustStoreCaCertificatesBundleInput,
  GetTrustStoreCaCertificatesBundleOutput,
  GetTrustStoreCaCertificatesBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrustStoreCaCertificatesBundleInput,
  output: GetTrustStoreCaCertificatesBundleOutput,
  errors: [TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStoreCaCertificatesBundle",
}));

export type GetTrustStoreRevocationContentError =
  | RevocationIdNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Retrieves the specified revocation file.
 *
 * This action returns a pre-signed S3 URI which is
 * active for ten minutes.
 */
export const getTrustStoreRevocationContent: API.OperationMethod<
  GetTrustStoreRevocationContentInput,
  GetTrustStoreRevocationContentOutput,
  GetTrustStoreRevocationContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrustStoreRevocationContentInput,
  output: GetTrustStoreRevocationContentOutput,
  errors: [RevocationIdNotFoundException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStoreRevocationContent",
}));

export type ModifyCapacityReservationError =
  | CapacityDecreaseRequestsLimitExceededException
  | CapacityReservationPendingException
  | CapacityUnitsLimitExceededException
  | InsufficientCapacityException
  | InvalidConfigurationRequestException
  | LoadBalancerNotFoundException
  | OperationNotPermittedException
  | PriorRequestNotCompleteException
  | CommonErrors;
/**
 * Modifies the capacity reservation of the specified load balancer.
 *
 * When modifying capacity reservation, you must include at least one `MinimumLoadBalancerCapacity`
 * or `ResetCapacityReservation`.
 */
export const modifyCapacityReservation: API.OperationMethod<
  ModifyCapacityReservationInput,
  ModifyCapacityReservationOutput,
  ModifyCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyCapacityReservationInput,
  output: ModifyCapacityReservationOutput,
  errors: [
    CapacityDecreaseRequestsLimitExceededException,
    CapacityReservationPendingException,
    CapacityUnitsLimitExceededException,
    InsufficientCapacityException,
    InvalidConfigurationRequestException,
    LoadBalancerNotFoundException,
    OperationNotPermittedException,
    PriorRequestNotCompleteException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCapacityReservation",
}));

export type ModifyIpPoolsError = LoadBalancerNotFoundException | CommonErrors;
/**
 * [Application Load Balancers] Modify the IP pool associated to a load balancer.
 */
export const modifyIpPools: API.OperationMethod<
  ModifyIpPoolsInput,
  ModifyIpPoolsOutput,
  ModifyIpPoolsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyIpPoolsInput,
  output: ModifyIpPoolsOutput,
  errors: [LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIpPools",
}));

export type ModifyListenerError =
  | ALPNPolicyNotSupportedException
  | CertificateNotFoundException
  | DuplicateListenerException
  | IncompatibleProtocolsException
  | InvalidConfigurationRequestException
  | InvalidLoadBalancerActionException
  | ListenerNotFoundException
  | SSLPolicyNotFoundException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyCertificatesException
  | TooManyListenersException
  | TooManyRegistrationsForTargetIdException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | TrustStoreNotFoundException
  | TrustStoreNotReadyException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Replaces the specified properties of the specified listener. Any properties that you do
 * not specify remain unchanged.
 *
 * Changing the protocol from HTTPS to HTTP, or from TLS to TCP, removes the security policy
 * and default certificate properties. If you change the protocol from HTTP to HTTPS, or from TCP
 * to TLS, you must add the security policy and default certificate properties.
 *
 * To add an item to a list, remove an item from a list, or update an item in a list, you
 * must provide the entire list. For example, to add an action, specify a list with the current
 * actions plus the new action.
 */
export const modifyListener: API.OperationMethod<
  ModifyListenerInput,
  ModifyListenerOutput,
  ModifyListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyListenerInput,
  output: ModifyListenerOutput,
  errors: [
    ALPNPolicyNotSupportedException,
    CertificateNotFoundException,
    DuplicateListenerException,
    IncompatibleProtocolsException,
    InvalidConfigurationRequestException,
    InvalidLoadBalancerActionException,
    ListenerNotFoundException,
    SSLPolicyNotFoundException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyCertificatesException,
    TooManyListenersException,
    TooManyRegistrationsForTargetIdException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    TrustStoreNotFoundException,
    TrustStoreNotReadyException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyListener",
}));

export type ModifyListenerAttributesError =
  | InvalidConfigurationRequestException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Modifies the specified attributes of the specified listener.
 */
export const modifyListenerAttributes: API.OperationMethod<
  ModifyListenerAttributesInput,
  ModifyListenerAttributesOutput,
  ModifyListenerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyListenerAttributesInput,
  output: ModifyListenerAttributesOutput,
  errors: [InvalidConfigurationRequestException, ListenerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyListenerAttributes",
}));

export type ModifyLoadBalancerAttributesError =
  | InvalidConfigurationRequestException
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Modifies the specified attributes of the specified Application Load Balancer, Network Load
 * Balancer, or Gateway Load Balancer.
 *
 * If any of the specified attributes can't be modified as requested, the call fails. Any
 * existing attributes that you do not modify retain their current values.
 */
export const modifyLoadBalancerAttributes: API.OperationMethod<
  ModifyLoadBalancerAttributesInput,
  ModifyLoadBalancerAttributesOutput,
  ModifyLoadBalancerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyLoadBalancerAttributesInput,
  output: ModifyLoadBalancerAttributesOutput,
  errors: [InvalidConfigurationRequestException, LoadBalancerNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLoadBalancerAttributes",
}));

export type ModifyRuleError =
  | IncompatibleProtocolsException
  | InvalidLoadBalancerActionException
  | OperationNotPermittedException
  | RuleNotFoundException
  | TargetGroupAssociationLimitException
  | TargetGroupNotFoundException
  | TooManyActionsException
  | TooManyRegistrationsForTargetIdException
  | TooManyTargetsException
  | TooManyUniqueTargetGroupsPerLoadBalancerException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Replaces the specified properties of the specified rule. Any properties that you do not
 * specify are unchanged.
 *
 * To add an item to a list, remove an item from a list, or update an item in a list, you
 * must provide the entire list. For example, to add an action, specify a list with the current
 * actions plus the new action.
 */
export const modifyRule: API.OperationMethod<
  ModifyRuleInput,
  ModifyRuleOutput,
  ModifyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyRuleInput,
  output: ModifyRuleOutput,
  errors: [
    IncompatibleProtocolsException,
    InvalidLoadBalancerActionException,
    OperationNotPermittedException,
    RuleNotFoundException,
    TargetGroupAssociationLimitException,
    TargetGroupNotFoundException,
    TooManyActionsException,
    TooManyRegistrationsForTargetIdException,
    TooManyTargetsException,
    TooManyUniqueTargetGroupsPerLoadBalancerException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyRule",
}));

export type ModifyTargetGroupError =
  | InvalidConfigurationRequestException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Modifies the health checks used when evaluating the health state of the targets in the
 * specified target group.
 */
export const modifyTargetGroup: API.OperationMethod<
  ModifyTargetGroupInput,
  ModifyTargetGroupOutput,
  ModifyTargetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyTargetGroupInput,
  output: ModifyTargetGroupOutput,
  errors: [InvalidConfigurationRequestException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTargetGroup",
}));

export type ModifyTargetGroupAttributesError =
  | InvalidConfigurationRequestException
  | TargetGroupNotFoundException
  | CommonErrors;
/**
 * Modifies the specified attributes of the specified target group.
 */
export const modifyTargetGroupAttributes: API.OperationMethod<
  ModifyTargetGroupAttributesInput,
  ModifyTargetGroupAttributesOutput,
  ModifyTargetGroupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyTargetGroupAttributesInput,
  output: ModifyTargetGroupAttributesOutput,
  errors: [InvalidConfigurationRequestException, TargetGroupNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTargetGroupAttributes",
}));

export type ModifyTrustStoreError =
  | CaCertificatesBundleNotFoundException
  | InvalidCaCertificatesBundleException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Update the ca certificate bundle for the specified trust store.
 */
export const modifyTrustStore: API.OperationMethod<
  ModifyTrustStoreInput,
  ModifyTrustStoreOutput,
  ModifyTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyTrustStoreInput,
  output: ModifyTrustStoreOutput,
  errors: [
    CaCertificatesBundleNotFoundException,
    InvalidCaCertificatesBundleException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyTrustStore",
}));

export type RegisterTargetsError =
  | InvalidTargetException
  | TargetGroupNotFoundException
  | TooManyRegistrationsForTargetIdException
  | TooManyTargetsException
  | CommonErrors;
/**
 * Registers the specified targets with the specified target group.
 *
 * If the target is an EC2 instance, it must be in the `running` state when you
 * register it.
 *
 * By default, the load balancer routes requests to registered targets using the protocol and
 * port for the target group. Alternatively, you can override the port for a target when you
 * register it. You can register each EC2 instance or IP address with the same target group
 * multiple times using different ports.
 *
 * For more information, see the following:
 *
 * - Register
 * targets for your Application Load Balancer
 *
 * - Register targets
 * for your Network Load Balancer
 *
 * - Register targets for your
 * Gateway Load Balancer
 */
export const registerTargets: API.OperationMethod<
  RegisterTargetsInput,
  RegisterTargetsOutput,
  RegisterTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterTargetsInput,
  output: RegisterTargetsOutput,
  errors: [
    InvalidTargetException,
    TargetGroupNotFoundException,
    TooManyRegistrationsForTargetIdException,
    TooManyTargetsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTargets",
}));

export type RemoveListenerCertificatesError =
  | ListenerNotFoundException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Removes the specified certificate from the certificate list for the specified HTTPS or TLS
 * listener.
 */
export const removeListenerCertificates: API.OperationMethod<
  RemoveListenerCertificatesInput,
  RemoveListenerCertificatesOutput,
  RemoveListenerCertificatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveListenerCertificatesInput,
  output: RemoveListenerCertificatesOutput,
  errors: [ListenerNotFoundException, OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveListenerCertificates",
}));

export type RemoveTagsError =
  | ListenerNotFoundException
  | LoadBalancerNotFoundException
  | RuleNotFoundException
  | TargetGroupNotFoundException
  | TooManyTagsException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Removes the specified tags from the specified Elastic Load Balancing resources. You can
 * remove the tags for one or more Application Load Balancers, Network Load Balancers, Gateway
 * Load Balancers, target groups, listeners, or rules.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsInput,
  RemoveTagsOutput,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsInput,
  output: RemoveTagsOutput,
  errors: [
    ListenerNotFoundException,
    LoadBalancerNotFoundException,
    RuleNotFoundException,
    TargetGroupNotFoundException,
    TooManyTagsException,
    TrustStoreNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

export type RemoveTrustStoreRevocationsError =
  | RevocationIdNotFoundException
  | TrustStoreNotFoundException
  | CommonErrors;
/**
 * Removes the specified revocation file from the specified trust store.
 */
export const removeTrustStoreRevocations: API.OperationMethod<
  RemoveTrustStoreRevocationsInput,
  RemoveTrustStoreRevocationsOutput,
  RemoveTrustStoreRevocationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTrustStoreRevocationsInput,
  output: RemoveTrustStoreRevocationsOutput,
  errors: [RevocationIdNotFoundException, TrustStoreNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTrustStoreRevocations",
}));

export type SetIpAddressTypeError =
  | InvalidConfigurationRequestException
  | InvalidSubnetException
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Sets the type of IP addresses used by the subnets of the specified load balancer.
 */
export const setIpAddressType: API.OperationMethod<
  SetIpAddressTypeInput,
  SetIpAddressTypeOutput,
  SetIpAddressTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIpAddressTypeInput,
  output: SetIpAddressTypeOutput,
  errors: [
    InvalidConfigurationRequestException,
    InvalidSubnetException,
    LoadBalancerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIpAddressType",
}));

export type SetRulePrioritiesError =
  | OperationNotPermittedException
  | PriorityInUseException
  | RuleNotFoundException
  | CommonErrors;
/**
 * Sets the priorities of the specified rules.
 *
 * You can reorder the rules as long as there are no priority conflicts in the new order. Any
 * existing rules that you do not specify retain their current priority.
 */
export const setRulePriorities: API.OperationMethod<
  SetRulePrioritiesInput,
  SetRulePrioritiesOutput,
  SetRulePrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetRulePrioritiesInput,
  output: SetRulePrioritiesOutput,
  errors: [
    OperationNotPermittedException,
    PriorityInUseException,
    RuleNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRulePriorities",
}));

export type SetSecurityGroupsError =
  | InvalidConfigurationRequestException
  | InvalidSecurityGroupException
  | LoadBalancerNotFoundException
  | CommonErrors;
/**
 * Associates the specified security groups with the specified Application Load Balancer or
 * Network Load Balancer. The specified security groups override the previously associated
 * security groups.
 *
 * You can't perform this operation on a Network Load Balancer unless you specified a
 * security group for the load balancer when you created it.
 *
 * You can't associate a security group with a Gateway Load Balancer.
 */
export const setSecurityGroups: API.OperationMethod<
  SetSecurityGroupsInput,
  SetSecurityGroupsOutput,
  SetSecurityGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetSecurityGroupsInput,
  output: SetSecurityGroupsOutput,
  errors: [
    InvalidConfigurationRequestException,
    InvalidSecurityGroupException,
    LoadBalancerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSecurityGroups",
}));

export type SetSubnetsError =
  | AllocationIdNotFoundException
  | AvailabilityZoneNotSupportedException
  | CapacityReservationPendingException
  | InvalidConfigurationRequestException
  | InvalidSubnetException
  | LoadBalancerNotFoundException
  | SubnetNotFoundException
  | CommonErrors;
/**
 * Enables the Availability Zones for the specified public subnets for the specified
 * Application Load Balancer, Network Load Balancer or Gateway Load Balancer. The specified subnets
 * replace the previously enabled subnets.
 */
export const setSubnets: API.OperationMethod<
  SetSubnetsInput,
  SetSubnetsOutput,
  SetSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetSubnetsInput,
  output: SetSubnetsOutput,
  errors: [
    AllocationIdNotFoundException,
    AvailabilityZoneNotSupportedException,
    CapacityReservationPendingException,
    InvalidConfigurationRequestException,
    InvalidSubnetException,
    LoadBalancerNotFoundException,
    SubnetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetSubnets",
}));
