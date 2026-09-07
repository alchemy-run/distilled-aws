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
const ns = T.XmlNamespace("http://redshift.amazonaws.com/doc/2012-12-01/");
const svc = T.AwsApiService({
  sdkId: "Redshift",
  serviceShapeName: "RedshiftServiceVersion20121201",
});
const auth = T.AwsAuthSigv4({ name: "redshift" });
const ver = T.ServiceVersion("2012-12-01");
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
              `https://redshift-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://redshift.${Region}.amazonaws.com`);
            }
            return e(
              `https://redshift-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://redshift.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://redshift.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessToClusterDeniedFault
  extends /*@__PURE__*/ S.TaggedError<AccessToClusterDeniedFault>()(
    "AccessToClusterDeniedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AccessToClusterDenied", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AccessToSnapshotDeniedFault
  extends /*@__PURE__*/ S.TaggedError<AccessToSnapshotDeniedFault>()(
    "AccessToSnapshotDeniedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AccessToSnapshotDenied",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthenticationProfileAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<AuthenticationProfileAlreadyExistsFault>()(
    "AuthenticationProfileAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AuthenticationProfileAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class AuthenticationProfileNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<AuthenticationProfileNotFoundFault>()(
    "AuthenticationProfileNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AuthenticationProfileNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthenticationProfileQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<AuthenticationProfileQuotaExceededFault>()(
    "AuthenticationProfileQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AuthenticationProfileQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationAlreadyExistsFault>()(
    "AuthorizationAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AuthorizationAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationNotFoundFault>()(
    "AuthorizationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AuthorizationNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class AuthorizationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationQuotaExceededFault>()(
    "AuthorizationQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AuthorizationQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BatchDeleteRequestSizeExceededFault
  extends /*@__PURE__*/ S.TaggedError<BatchDeleteRequestSizeExceededFault>()(
    "BatchDeleteRequestSizeExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "BatchDeleteRequestSizeExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BatchModifyClusterSnapshotsLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<BatchModifyClusterSnapshotsLimitExceededFault>()(
    "BatchModifyClusterSnapshotsLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "BatchModifyClusterSnapshotsLimitExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class BucketNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<BucketNotFoundFault>()(
    "BucketNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "BucketNotFoundFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterAlreadyExistsFault>()(
    "ClusterAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ClusterAlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterNotFoundFault>()(
    "ClusterNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ClusterNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterOnLatestRevisionFault
  extends /*@__PURE__*/ S.TaggedError<ClusterOnLatestRevisionFault>()(
    "ClusterOnLatestRevisionFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterOnLatestRevision",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterParameterGroupAlreadyExistsFault>()(
    "ClusterParameterGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterParameterGroupNotFoundFault>()(
    "ClusterParameterGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterParameterGroupQuotaExceededFault>()(
    "ClusterParameterGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaExceededFault>()(
    "ClusterQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ClusterQuotaExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSecurityGroupAlreadyExistsFault>()(
    "ClusterSecurityGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSecurityGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSecurityGroupNotFoundFault>()(
    "ClusterSecurityGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSecurityGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSecurityGroupQuotaExceededFault>()(
    "ClusterSecurityGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "QuotaExceeded.ClusterSecurityGroup",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSnapshotAlreadyExistsFault>()(
    "ClusterSnapshotAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSnapshotAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSnapshotNotFoundFault>()(
    "ClusterSnapshotNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSnapshotNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSnapshotQuotaExceededFault>()(
    "ClusterSnapshotQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSnapshotQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetGroupAlreadyExistsFault>()(
    "ClusterSubnetGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSubnetGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ClusterSubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetGroupNotFoundFault>()(
    "ClusterSubnetGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSubnetGroupNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetGroupQuotaExceededFault>()(
    "ClusterSubnetGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSubnetGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterSubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterSubnetQuotaExceededFault>()(
    "ClusterSubnetQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterSubnetQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConflictPolicyUpdateFault
  extends /*@__PURE__*/ S.TaggedError<ConflictPolicyUpdateFault>()(
    "ConflictPolicyUpdateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConflictPolicyUpdateFault",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class CopyToRegionDisabledFault
  extends /*@__PURE__*/ S.TaggedError<CopyToRegionDisabledFault>()(
    "CopyToRegionDisabledFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CopyToRegionDisabledFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomCnameAssociationFault
  extends /*@__PURE__*/ S.TaggedError<CustomCnameAssociationFault>()(
    "CustomCnameAssociationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CustomCnameAssociationFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomDomainAssociationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CustomDomainAssociationNotFoundFault>()(
    "CustomDomainAssociationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CustomDomainAssociationNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DependentServiceAccessDeniedFault
  extends /*@__PURE__*/ S.TaggedError<DependentServiceAccessDeniedFault>()(
    "DependentServiceAccessDeniedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DependentServiceAccessDenied",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class DependentServiceRequestThrottlingFault
  extends /*@__PURE__*/ S.TaggedError<DependentServiceRequestThrottlingFault>()(
    "DependentServiceRequestThrottlingFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DependentServiceRequestThrottlingFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DependentServiceUnavailableFault
  extends /*@__PURE__*/ S.TaggedError<DependentServiceUnavailableFault>()(
    "DependentServiceUnavailableFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DependentServiceUnavailableFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withServerError) {}
export class EndpointAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAlreadyExistsFault>()(
    "EndpointAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "EndpointAlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EndpointAuthorizationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAuthorizationAlreadyExistsFault>()(
    "EndpointAuthorizationAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EndpointAuthorizationAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EndpointAuthorizationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAuthorizationNotFoundFault>()(
    "EndpointAuthorizationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EndpointAuthorizationNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointAuthorizationsPerClusterLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<EndpointAuthorizationsPerClusterLimitExceededFault>()(
    "EndpointAuthorizationsPerClusterLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EndpointAuthorizationsPerClusterLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<EndpointNotFoundFault>()(
    "EndpointNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "EndpointNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointsPerAuthorizationLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<EndpointsPerAuthorizationLimitExceededFault>()(
    "EndpointsPerAuthorizationLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EndpointsPerAuthorizationLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EndpointsPerClusterLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<EndpointsPerClusterLimitExceededFault>()(
    "EndpointsPerClusterLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EndpointsPerClusterLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventSubscriptionQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<EventSubscriptionQuotaExceededFault>()(
    "EventSubscriptionQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EventSubscriptionQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmClientCertificateAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<HsmClientCertificateAlreadyExistsFault>()(
    "HsmClientCertificateAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HsmClientCertificateAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class HsmClientCertificateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<HsmClientCertificateNotFoundFault>()(
    "HsmClientCertificateNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HsmClientCertificateNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmClientCertificateQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<HsmClientCertificateQuotaExceededFault>()(
    "HsmClientCertificateQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HsmClientCertificateQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmConfigurationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<HsmConfigurationAlreadyExistsFault>()(
    "HsmConfigurationAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HsmConfigurationAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class HsmConfigurationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<HsmConfigurationNotFoundFault>()(
    "HsmConfigurationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HsmConfigurationNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class HsmConfigurationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<HsmConfigurationQuotaExceededFault>()(
    "HsmConfigurationQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "HsmConfigurationQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IncompatibleOrderableOptions
  extends /*@__PURE__*/ S.TaggedError<IncompatibleOrderableOptions>()(
    "IncompatibleOrderableOptions",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IncompatibleOrderableOptions",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InProgressTableRestoreQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<InProgressTableRestoreQuotaExceededFault>()(
    "InProgressTableRestoreQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InProgressTableRestoreQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientClusterCapacityFault>()(
    "InsufficientClusterCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientClusterCapacity",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientS3BucketPolicyFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientS3BucketPolicyFault>()(
    "InsufficientS3BucketPolicyFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientS3BucketPolicyFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationAlreadyExistsFault>()(
    "IntegrationAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationConflictOperationFault>()(
    "IntegrationConflictOperationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationConflictOperationFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationConflictStateFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationConflictStateFault>()(
    "IntegrationConflictStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationConflictStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationNotFoundFault>()(
    "IntegrationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationQuotaExceededFault>()(
    "IntegrationQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationSourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationSourceNotFoundFault>()(
    "IntegrationSourceNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationSourceNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class IntegrationTargetNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationTargetNotFoundFault>()(
    "IntegrationTargetNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IntegrationTargetNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidAuthenticationProfileRequestFault
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthenticationProfileRequestFault>()(
    "InvalidAuthenticationProfileRequestFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidAuthenticationProfileRequestFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidAuthorizationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthorizationStateFault>()(
    "InvalidAuthorizationStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidAuthorizationState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterParameterGroupStateFault>()(
    "InvalidClusterParameterGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidClusterParameterGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSecurityGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSecurityGroupStateFault>()(
    "InvalidClusterSecurityGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidClusterSecurityGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSnapshotScheduleStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSnapshotScheduleStateFault>()(
    "InvalidClusterSnapshotScheduleStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidClusterSnapshotScheduleState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSnapshotStateFault>()(
    "InvalidClusterSnapshotStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidClusterSnapshotState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterStateFault>()(
    "InvalidClusterStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidClusterState", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSubnetGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSubnetGroupStateFault>()(
    "InvalidClusterSubnetGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidClusterSubnetGroupStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterSubnetStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterSubnetStateFault>()(
    "InvalidClusterSubnetStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidClusterSubnetStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClusterTrackFault
  extends /*@__PURE__*/ S.TaggedError<InvalidClusterTrackFault>()(
    "InvalidClusterTrackFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidClusterTrack", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDataShareFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDataShareFault>()(
    "InvalidDataShareFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidDataShareFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidElasticIpFault
  extends /*@__PURE__*/ S.TaggedError<InvalidElasticIpFault>()(
    "InvalidElasticIpFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidElasticIpFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEndpointStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointStateFault>()(
    "InvalidEndpointStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidEndpointState", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidHsmClientCertificateStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidHsmClientCertificateStateFault>()(
    "InvalidHsmClientCertificateStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidHsmClientCertificateStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidHsmConfigurationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidHsmConfigurationStateFault>()(
    "InvalidHsmConfigurationStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidHsmConfigurationStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNamespaceFault
  extends /*@__PURE__*/ S.TaggedError<InvalidNamespaceFault>()(
    "InvalidNamespaceFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidNamespaceFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidPolicyFault
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyFault>()(
    "InvalidPolicyFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidPolicyFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidReservedNodeStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidReservedNodeStateFault>()(
    "InvalidReservedNodeStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidReservedNodeState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRestoreFault
  extends /*@__PURE__*/ S.TaggedError<InvalidRestoreFault>()(
    "InvalidRestoreFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidRestore", httpResponseCode: 406 }),
      T.HttpError(406),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRetentionPeriodFault
  extends /*@__PURE__*/ S.TaggedError<InvalidRetentionPeriodFault>()(
    "InvalidRetentionPeriodFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidRetentionPeriodFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3BucketNameFault
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketNameFault>()(
    "InvalidS3BucketNameFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidS3BucketNameFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3KeyPrefixFault
  extends /*@__PURE__*/ S.TaggedError<InvalidS3KeyPrefixFault>()(
    "InvalidS3KeyPrefixFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidS3KeyPrefixFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidScheduledActionFault
  extends /*@__PURE__*/ S.TaggedError<InvalidScheduledActionFault>()(
    "InvalidScheduledActionFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidScheduledAction",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidScheduleFault
  extends /*@__PURE__*/ S.TaggedError<InvalidScheduleFault>()(
    "InvalidScheduleFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSchedule", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnapshotCopyGrantStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSnapshotCopyGrantStateFault>()(
    "InvalidSnapshotCopyGrantStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidSnapshotCopyGrantStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnet
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnet>()(
    "InvalidSubnet",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubscriptionStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSubscriptionStateFault>()(
    "InvalidSubscriptionStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidSubscriptionStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTableRestoreArgumentFault
  extends /*@__PURE__*/ S.TaggedError<InvalidTableRestoreArgumentFault>()(
    "InvalidTableRestoreArgumentFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidTableRestoreArgument",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTagFault
  extends /*@__PURE__*/ S.TaggedError<InvalidTagFault>()(
    "InvalidTagFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidTagFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidUsageLimitFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUsageLimitFault>()(
    "InvalidUsageLimitFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidUsageLimit", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidVPCNetworkStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidVPCNetworkStateFault>()(
    "InvalidVPCNetworkStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidVPCNetworkStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class Ipv6CidrBlockNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<Ipv6CidrBlockNotFoundFault>()(
    "Ipv6CidrBlockNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "Ipv6CidrBlockNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<LimitExceededFault>()(
    "LimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "LimitExceededFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NumberOfNodesPerClusterLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<NumberOfNodesPerClusterLimitExceededFault>()(
    "NumberOfNodesPerClusterLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NumberOfNodesPerClusterLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NumberOfNodesQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<NumberOfNodesQuotaExceededFault>()(
    "NumberOfNodesQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NumberOfNodesQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PartnerNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<PartnerNotFoundFault>()(
    "PartnerNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "PartnerNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class Qev2IdcApplicationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<Qev2IdcApplicationAlreadyExistsFault>()(
    "Qev2IdcApplicationAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "Qev2IdcApplicationAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class Qev2IdcApplicationNotExistsFault
  extends /*@__PURE__*/ S.TaggedError<Qev2IdcApplicationNotExistsFault>()(
    "Qev2IdcApplicationNotExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "Qev2IdcApplicationNotExists",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class RedshiftIdcApplicationAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftIdcApplicationAlreadyExistsFault>()(
    "RedshiftIdcApplicationAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RedshiftIdcApplicationAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class RedshiftIdcApplicationNotExistsFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftIdcApplicationNotExistsFault>()(
    "RedshiftIdcApplicationNotExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RedshiftIdcApplicationNotExists",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class RedshiftIdcApplicationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftIdcApplicationQuotaExceededFault>()(
    "RedshiftIdcApplicationQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RedshiftIdcApplicationQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RedshiftInvalidParameterFault
  extends /*@__PURE__*/ S.TaggedError<RedshiftInvalidParameterFault>()(
    "RedshiftInvalidParameterFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "RedshiftInvalidParameter",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeAlreadyExistsFault>()(
    "ReservedNodeAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedNodeAlreadyExists",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedNodeAlreadyMigratedFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeAlreadyMigratedFault>()(
    "ReservedNodeAlreadyMigratedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedNodeAlreadyMigrated",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeExchangeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeExchangeNotFoundFault>()(
    "ReservedNodeExchangeNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedNodeExchangeNotFond",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeNotFoundFault>()(
    "ReservedNodeNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ReservedNodeNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeOfferingNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeOfferingNotFoundFault>()(
    "ReservedNodeOfferingNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedNodeOfferingNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedNodeQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ReservedNodeQuotaExceededFault>()(
    "ReservedNodeQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedNodeQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResizeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ResizeNotFoundFault>()(
    "ResizeNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResizeNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundFault>()(
    "ResourceNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceNotFoundFault", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduledActionAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionAlreadyExistsFault>()(
    "ScheduledActionAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ScheduledActionAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ScheduledActionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionNotFoundFault>()(
    "ScheduledActionNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ScheduledActionNotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduledActionQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionQuotaExceededFault>()(
    "ScheduledActionQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ScheduledActionQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduledActionTypeUnsupportedFault
  extends /*@__PURE__*/ S.TaggedError<ScheduledActionTypeUnsupportedFault>()(
    "ScheduledActionTypeUnsupportedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ScheduledActionTypeUnsupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ScheduleDefinitionTypeUnsupportedFault
  extends /*@__PURE__*/ S.TaggedError<ScheduleDefinitionTypeUnsupportedFault>()(
    "ScheduleDefinitionTypeUnsupportedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ScheduleDefinitionTypeUnsupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyAlreadyDisabledFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyAlreadyDisabledFault>()(
    "SnapshotCopyAlreadyDisabledFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotCopyAlreadyDisabledFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyAlreadyEnabledFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyAlreadyEnabledFault>()(
    "SnapshotCopyAlreadyEnabledFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotCopyAlreadyEnabledFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyDisabledFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyDisabledFault>()(
    "SnapshotCopyDisabledFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotCopyDisabledFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyGrantAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyGrantAlreadyExistsFault>()(
    "SnapshotCopyGrantAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotCopyGrantAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotCopyGrantNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyGrantNotFoundFault>()(
    "SnapshotCopyGrantNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotCopyGrantNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotCopyGrantQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotCopyGrantQuotaExceededFault>()(
    "SnapshotCopyGrantQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotCopyGrantQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotScheduleAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleAlreadyExistsFault>()(
    "SnapshotScheduleAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotScheduleAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotScheduleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleNotFoundFault>()(
    "SnapshotScheduleNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotScheduleNotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotScheduleQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleQuotaExceededFault>()(
    "SnapshotScheduleQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotScheduleQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotScheduleUpdateInProgressFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotScheduleUpdateInProgressFault>()(
    "SnapshotScheduleUpdateInProgressFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotScheduleUpdateInProgress",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SNSInvalidTopicFault
  extends /*@__PURE__*/ S.TaggedError<SNSInvalidTopicFault>()(
    "SNSInvalidTopicFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SNSInvalidTopic", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SNSNoAuthorizationFault
  extends /*@__PURE__*/ S.TaggedError<SNSNoAuthorizationFault>()(
    "SNSNoAuthorizationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SNSNoAuthorization", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SNSTopicArnNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SNSTopicArnNotFoundFault>()(
    "SNSTopicArnNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SNSTopicArnNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SourceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SourceNotFoundFault>()(
    "SourceNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SourceNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetAlreadyInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetAlreadyInUse>()(
    "SubnetAlreadyInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetAlreadyInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubscriptionAlreadyExistFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionAlreadyExistFault>()(
    "SubscriptionAlreadyExistFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubscriptionAlreadyExist",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionCategoryNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionCategoryNotFoundFault>()(
    "SubscriptionCategoryNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubscriptionCategoryNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionEventIdNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionEventIdNotFoundFault>()(
    "SubscriptionEventIdNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubscriptionEventIdNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionNotFoundFault>()(
    "SubscriptionNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubscriptionNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubscriptionSeverityNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionSeverityNotFoundFault>()(
    "SubscriptionSeverityNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SubscriptionSeverityNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TableLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<TableLimitExceededFault>()(
    "TableLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TableLimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TableRestoreNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TableRestoreNotFoundFault>()(
    "TableRestoreNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TableRestoreNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagLimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededFault>()(
    "TagLimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TagLimitExceededFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedOperation
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedOperation>()(
    "UnauthorizedOperation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UnauthorizedOperation", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class UnauthorizedPartnerIntegrationFault
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedPartnerIntegrationFault>()(
    "UnauthorizedPartnerIntegrationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UnauthorizedPartnerIntegration",
        httpResponseCode: 401,
      }),
      T.HttpError(401),
    ),
  ).pipe(C.withAuthError) {}
export class UnknownSnapshotCopyRegionFault
  extends /*@__PURE__*/ S.TaggedError<UnknownSnapshotCopyRegionFault>()(
    "UnknownSnapshotCopyRegionFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UnknownSnapshotCopyRegionFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperationFault
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationFault>()(
    "UnsupportedOperationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UnsupportedOperation", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOptionFault
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOptionFault>()(
    "UnsupportedOptionFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UnsupportedOptionFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UsageLimitAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UsageLimitAlreadyExistsFault>()(
    "UsageLimitAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UsageLimitAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UsageLimitNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UsageLimitNotFoundFault>()(
    "UsageLimitNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UsageLimitNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export interface AcceptReservedNodeExchangeInputMessage {
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
}
export const AcceptReservedNodeExchangeInputMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReservedNodeId: S.optional(S.String),
      TargetReservedNodeOfferingId: S.optional(S.String),
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
  identifier: "AcceptReservedNodeExchangeInputMessage",
}) as any as S.Schema<AcceptReservedNodeExchangeInputMessage>;
export interface RecurringCharge {
  RecurringChargeAmount?: number;
  RecurringChargeFrequency?: string;
}
export const RecurringCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecurringChargeAmount: S.optional(S.Number),
    RecurringChargeFrequency: S.optional(S.String),
  }),
).annotate({
  identifier: "RecurringCharge",
}) as any as S.Schema<RecurringCharge>;
export type RecurringChargeList = RecurringCharge[];
export const RecurringChargeList = /*@__PURE__*/ S.Array(
  RecurringCharge.pipe(T.XmlName("RecurringCharge")).annotate({
    identifier: "RecurringCharge",
  }),
);
export type ReservedNodeOfferingType = "Regular" | "Upgradable" | (string & {});
export const ReservedNodeOfferingType = S.String;

export interface ReservedNode {
  ReservedNodeId?: string;
  ReservedNodeOfferingId?: string;
  NodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  NodeCount?: number;
  State?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedNodeOfferingType?: ReservedNodeOfferingType;
}
export const ReservedNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedNodeId: S.optional(S.String),
    ReservedNodeOfferingId: S.optional(S.String),
    NodeType: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    NodeCount: S.optional(S.Number),
    State: S.optional(S.String),
    OfferingType: S.optional(S.String),
    RecurringCharges: S.optional(RecurringChargeList),
    ReservedNodeOfferingType: S.optional(ReservedNodeOfferingType),
  }),
).annotate({ identifier: "ReservedNode" }) as any as S.Schema<ReservedNode>;
export interface AcceptReservedNodeExchangeOutputMessage {
  ExchangedReservedNode?: ReservedNode;
}
export const AcceptReservedNodeExchangeOutputMessage = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ExchangedReservedNode: S.optional(ReservedNode) }).pipe(ns),
).annotate({
  identifier: "AcceptReservedNodeExchangeOutputMessage",
}) as any as S.Schema<AcceptReservedNodeExchangeOutputMessage>;
export type PartnerIntegrationAccountId = string;
export type PartnerIntegrationClusterIdentifier = string;
export type PartnerIntegrationDatabaseName = string;
export type PartnerIntegrationPartnerName = string;
export interface PartnerIntegrationInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
}
export const PartnerIntegrationInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    PartnerName: S.optional(S.String),
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
  identifier: "PartnerIntegrationInputMessage",
}) as any as S.Schema<PartnerIntegrationInputMessage>;
export interface PartnerIntegrationOutputMessage {
  DatabaseName?: string;
  PartnerName?: string;
}
export const PartnerIntegrationOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    PartnerName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PartnerIntegrationOutputMessage",
}) as any as S.Schema<PartnerIntegrationOutputMessage>;
export interface AssociateDataShareConsumerMessage {
  DataShareArn?: string;
  AssociateEntireAccount?: boolean;
  ConsumerArn?: string;
  ConsumerRegion?: string;
  AllowWrites?: boolean;
}
export const AssociateDataShareConsumerMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShareArn: S.optional(S.String),
    AssociateEntireAccount: S.optional(S.Boolean),
    ConsumerArn: S.optional(S.String),
    ConsumerRegion: S.optional(S.String),
    AllowWrites: S.optional(S.Boolean),
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
  identifier: "AssociateDataShareConsumerMessage",
}) as any as S.Schema<AssociateDataShareConsumerMessage>;
export type DataShareStatus =
  | "ACTIVE"
  | "PENDING_AUTHORIZATION"
  | "AUTHORIZED"
  | "DEAUTHORIZED"
  | "REJECTED"
  | "AVAILABLE"
  | (string & {});
export const DataShareStatus = S.String;

export interface DataShareAssociation {
  ConsumerIdentifier?: string;
  Status?: DataShareStatus;
  ConsumerRegion?: string;
  CreatedDate?: Date;
  StatusChangeDate?: Date;
  ProducerAllowedWrites?: boolean;
  ConsumerAcceptedWrites?: boolean;
}
export const DataShareAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsumerIdentifier: S.optional(S.String),
    Status: S.optional(DataShareStatus),
    ConsumerRegion: S.optional(S.String),
    CreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StatusChangeDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProducerAllowedWrites: S.optional(S.Boolean),
    ConsumerAcceptedWrites: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DataShareAssociation",
}) as any as S.Schema<DataShareAssociation>;
export type DataShareAssociationList = DataShareAssociation[];
export const DataShareAssociationList =
  /*@__PURE__*/ S.Array(DataShareAssociation);
export type DataShareType = "INTERNAL" | (string & {});
export const DataShareType = S.String;

export interface DataShare {
  DataShareArn?: string;
  ProducerArn?: string;
  AllowPubliclyAccessibleConsumers?: boolean;
  DataShareAssociations?: DataShareAssociation[];
  ManagedBy?: string;
  DataShareType?: DataShareType;
}
export const DataShare = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShareArn: S.optional(S.String),
    ProducerArn: S.optional(S.String),
    AllowPubliclyAccessibleConsumers: S.optional(S.Boolean),
    DataShareAssociations: S.optional(DataShareAssociationList),
    ManagedBy: S.optional(S.String),
    DataShareType: S.optional(DataShareType),
  }).pipe(ns),
).annotate({ identifier: "DataShare" }) as any as S.Schema<DataShare>;
export interface AuthorizeClusterSecurityGroupIngressMessage {
  ClusterSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export const AuthorizeClusterSecurityGroupIngressMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ClusterSecurityGroupName: S.optional(S.String),
      CIDRIP: S.optional(S.String),
      EC2SecurityGroupName: S.optional(S.String),
      EC2SecurityGroupOwnerId: S.optional(S.String),
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
    identifier: "AuthorizeClusterSecurityGroupIngressMessage",
  }) as any as S.Schema<AuthorizeClusterSecurityGroupIngressMessage>;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(
  Tag.pipe(T.XmlName("Tag")).annotate({ identifier: "Tag" }),
);
export interface EC2SecurityGroup {
  Status?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
  Tags?: Tag[];
}
export const EC2SecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    EC2SecurityGroupName: S.optional(S.String),
    EC2SecurityGroupOwnerId: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "EC2SecurityGroup",
}) as any as S.Schema<EC2SecurityGroup>;
export type EC2SecurityGroupList = EC2SecurityGroup[];
export const EC2SecurityGroupList = /*@__PURE__*/ S.Array(
  EC2SecurityGroup.pipe(T.XmlName("EC2SecurityGroup")).annotate({
    identifier: "EC2SecurityGroup",
  }),
);
export interface IPRange {
  Status?: string;
  CIDRIP?: string;
  Tags?: Tag[];
}
export const IPRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    CIDRIP: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({ identifier: "IPRange" }) as any as S.Schema<IPRange>;
export type IPRangeList = IPRange[];
export const IPRangeList = /*@__PURE__*/ S.Array(
  IPRange.pipe(T.XmlName("IPRange")).annotate({ identifier: "IPRange" }),
);
export interface ClusterSecurityGroup {
  ClusterSecurityGroupName?: string;
  Description?: string;
  EC2SecurityGroups?: EC2SecurityGroup[];
  IPRanges?: IPRange[];
  Tags?: Tag[];
}
export const ClusterSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSecurityGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    EC2SecurityGroups: S.optional(EC2SecurityGroupList),
    IPRanges: S.optional(IPRangeList),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ClusterSecurityGroup",
}) as any as S.Schema<ClusterSecurityGroup>;
export interface AuthorizeClusterSecurityGroupIngressResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export const AuthorizeClusterSecurityGroupIngressResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ClusterSecurityGroup: S.optional(ClusterSecurityGroup) }).pipe(
      ns,
    ),
  ).annotate({
    identifier: "AuthorizeClusterSecurityGroupIngressResult",
  }) as any as S.Schema<AuthorizeClusterSecurityGroupIngressResult>;
export interface AuthorizeDataShareMessage {
  DataShareArn?: string;
  ConsumerIdentifier?: string;
  AllowWrites?: boolean;
}
export const AuthorizeDataShareMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShareArn: S.optional(S.String),
    ConsumerIdentifier: S.optional(S.String),
    AllowWrites: S.optional(S.Boolean),
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
  identifier: "AuthorizeDataShareMessage",
}) as any as S.Schema<AuthorizeDataShareMessage>;
export type VpcIdentifierList = string[];
export const VpcIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("VpcIdentifier")),
);
export interface AuthorizeEndpointAccessMessage {
  ClusterIdentifier?: string;
  Account?: string;
  VpcIds?: string[];
}
export const AuthorizeEndpointAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    Account: S.optional(S.String),
    VpcIds: S.optional(VpcIdentifierList),
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
  identifier: "AuthorizeEndpointAccessMessage",
}) as any as S.Schema<AuthorizeEndpointAccessMessage>;
export type AuthorizationStatus = "Authorized" | "Revoking" | (string & {});
export const AuthorizationStatus = S.String;

export interface EndpointAuthorization {
  Grantor?: string;
  Grantee?: string;
  ClusterIdentifier?: string;
  AuthorizeTime?: Date;
  ClusterStatus?: string;
  Status?: AuthorizationStatus;
  AllowedAllVPCs?: boolean;
  AllowedVPCs?: string[];
  EndpointCount?: number;
}
export const EndpointAuthorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Grantor: S.optional(S.String),
    Grantee: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    AuthorizeTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ClusterStatus: S.optional(S.String),
    Status: S.optional(AuthorizationStatus),
    AllowedAllVPCs: S.optional(S.Boolean),
    AllowedVPCs: S.optional(VpcIdentifierList),
    EndpointCount: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "EndpointAuthorization",
}) as any as S.Schema<EndpointAuthorization>;
export interface AuthorizeSnapshotAccessMessage {
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  AccountWithRestoreAccess?: string;
}
export const AuthorizeSnapshotAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    SnapshotArn: S.optional(S.String),
    SnapshotClusterIdentifier: S.optional(S.String),
    AccountWithRestoreAccess: S.optional(S.String),
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
  identifier: "AuthorizeSnapshotAccessMessage",
}) as any as S.Schema<AuthorizeSnapshotAccessMessage>;
export interface AccountWithRestoreAccess {
  AccountId?: string;
  AccountAlias?: string;
}
export const AccountWithRestoreAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    AccountAlias: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountWithRestoreAccess",
}) as any as S.Schema<AccountWithRestoreAccess>;
export type AccountsWithRestoreAccessList = AccountWithRestoreAccess[];
export const AccountsWithRestoreAccessList = /*@__PURE__*/ S.Array(
  AccountWithRestoreAccess.pipe(T.XmlName("AccountWithRestoreAccess")).annotate(
    { identifier: "AccountWithRestoreAccess" },
  ),
);
export type RestorableNodeTypeList = string[];
export const RestorableNodeTypeList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("NodeType")),
);
export interface Snapshot {
  SnapshotIdentifier?: string;
  ClusterIdentifier?: string;
  SnapshotCreateTime?: Date;
  Status?: string;
  Port?: number;
  AvailabilityZone?: string;
  ClusterCreateTime?: Date;
  MasterUsername?: string;
  ClusterVersion?: string;
  EngineFullVersion?: string;
  SnapshotType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  DBName?: string;
  VpcId?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  EncryptedWithHSM?: boolean;
  AccountsWithRestoreAccess?: AccountWithRestoreAccess[];
  OwnerAccount?: string;
  TotalBackupSizeInMegaBytes?: number;
  ActualIncrementalBackupSizeInMegaBytes?: number;
  BackupProgressInMegaBytes?: number;
  CurrentBackupRateInMegaBytesPerSecond?: number;
  EstimatedSecondsToCompletion?: number;
  ElapsedTimeInSeconds?: number;
  SourceRegion?: string;
  Tags?: Tag[];
  RestorableNodeTypes?: string[];
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  ManualSnapshotRetentionPeriod?: number;
  ManualSnapshotRemainingDays?: number;
  SnapshotRetentionStartTime?: Date;
  MasterPasswordSecretArn?: string;
  MasterPasswordSecretKmsKeyId?: string;
  SnapshotArn?: string;
}
export const Snapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    SnapshotCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(S.String),
    Port: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    ClusterCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MasterUsername: S.optional(S.String),
    ClusterVersion: S.optional(S.String),
    EngineFullVersion: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    NodeType: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    DBName: S.optional(S.String),
    VpcId: S.optional(S.String),
    Encrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    EncryptedWithHSM: S.optional(S.Boolean),
    AccountsWithRestoreAccess: S.optional(AccountsWithRestoreAccessList),
    OwnerAccount: S.optional(S.String),
    TotalBackupSizeInMegaBytes: S.optional(S.Number),
    ActualIncrementalBackupSizeInMegaBytes: S.optional(S.Number),
    BackupProgressInMegaBytes: S.optional(S.Number),
    CurrentBackupRateInMegaBytesPerSecond: S.optional(S.Number),
    EstimatedSecondsToCompletion: S.optional(S.Number),
    ElapsedTimeInSeconds: S.optional(S.Number),
    SourceRegion: S.optional(S.String),
    Tags: S.optional(TagList),
    RestorableNodeTypes: S.optional(RestorableNodeTypeList),
    EnhancedVpcRouting: S.optional(S.Boolean),
    MaintenanceTrackName: S.optional(S.String),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    ManualSnapshotRemainingDays: S.optional(S.Number),
    SnapshotRetentionStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MasterPasswordSecretArn: S.optional(S.String),
    MasterPasswordSecretKmsKeyId: S.optional(S.String),
    SnapshotArn: S.optional(S.String),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export interface AuthorizeSnapshotAccessResult {
  Snapshot?: Snapshot;
}
export const AuthorizeSnapshotAccessResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "AuthorizeSnapshotAccessResult",
}) as any as S.Schema<AuthorizeSnapshotAccessResult>;
export interface DeleteClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  SnapshotClusterIdentifier?: string;
}
export const DeleteClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    SnapshotClusterIdentifier: S.optional(S.String),
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
  identifier: "DeleteClusterSnapshotMessage",
}) as any as S.Schema<DeleteClusterSnapshotMessage>;
export type DeleteClusterSnapshotMessageList = DeleteClusterSnapshotMessage[];
export const DeleteClusterSnapshotMessageList = /*@__PURE__*/ S.Array(
  DeleteClusterSnapshotMessage.pipe(
    T.XmlName("DeleteClusterSnapshotMessage"),
  ).annotate({ identifier: "DeleteClusterSnapshotMessage" }),
);
export interface BatchDeleteClusterSnapshotsRequest {
  Identifiers?: DeleteClusterSnapshotMessage[];
}
export const BatchDeleteClusterSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifiers: S.optional(DeleteClusterSnapshotMessageList) }).pipe(
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
  identifier: "BatchDeleteClusterSnapshotsRequest",
}) as any as S.Schema<BatchDeleteClusterSnapshotsRequest>;
export type SnapshotIdentifierList = string[];
export const SnapshotIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("String")),
);
export interface SnapshotErrorMessage {
  SnapshotIdentifier?: string;
  SnapshotClusterIdentifier?: string;
  FailureCode?: string;
  FailureReason?: string;
}
export const SnapshotErrorMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    SnapshotClusterIdentifier: S.optional(S.String),
    FailureCode: S.optional(S.String),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "SnapshotErrorMessage",
}) as any as S.Schema<SnapshotErrorMessage>;
export type BatchSnapshotOperationErrorList = SnapshotErrorMessage[];
export const BatchSnapshotOperationErrorList = /*@__PURE__*/ S.Array(
  SnapshotErrorMessage.pipe(T.XmlName("SnapshotErrorMessage")).annotate({
    identifier: "SnapshotErrorMessage",
  }),
);
export interface BatchDeleteClusterSnapshotsResult {
  Resources?: string[];
  Errors?: SnapshotErrorMessage[];
}
export const BatchDeleteClusterSnapshotsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(SnapshotIdentifierList),
    Errors: S.optional(BatchSnapshotOperationErrorList),
  }).pipe(ns),
).annotate({
  identifier: "BatchDeleteClusterSnapshotsResult",
}) as any as S.Schema<BatchDeleteClusterSnapshotsResult>;
export interface BatchModifyClusterSnapshotsMessage {
  SnapshotIdentifierList?: string[];
  ManualSnapshotRetentionPeriod?: number;
  Force?: boolean;
}
export const BatchModifyClusterSnapshotsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifierList: S.optional(SnapshotIdentifierList),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    Force: S.optional(S.Boolean),
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
  identifier: "BatchModifyClusterSnapshotsMessage",
}) as any as S.Schema<BatchModifyClusterSnapshotsMessage>;
export type BatchSnapshotOperationErrors = SnapshotErrorMessage[];
export const BatchSnapshotOperationErrors = /*@__PURE__*/ S.Array(
  SnapshotErrorMessage.pipe(T.XmlName("SnapshotErrorMessage")).annotate({
    identifier: "SnapshotErrorMessage",
  }),
);
export interface BatchModifyClusterSnapshotsOutputMessage {
  Resources?: string[];
  Errors?: SnapshotErrorMessage[];
}
export const BatchModifyClusterSnapshotsOutputMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Resources: S.optional(SnapshotIdentifierList),
      Errors: S.optional(BatchSnapshotOperationErrors),
    }).pipe(ns),
).annotate({
  identifier: "BatchModifyClusterSnapshotsOutputMessage",
}) as any as S.Schema<BatchModifyClusterSnapshotsOutputMessage>;
export interface CancelResizeMessage {
  ClusterIdentifier?: string;
}
export const CancelResizeMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "CancelResizeMessage",
}) as any as S.Schema<CancelResizeMessage>;
export type ImportTablesCompleted = string[];
export const ImportTablesCompleted = /*@__PURE__*/ S.Array(S.String);
export type ImportTablesInProgress = string[];
export const ImportTablesInProgress = /*@__PURE__*/ S.Array(S.String);
export type ImportTablesNotStarted = string[];
export const ImportTablesNotStarted = /*@__PURE__*/ S.Array(S.String);
export interface ResizeProgressMessage {
  TargetNodeType?: string;
  TargetNumberOfNodes?: number;
  TargetClusterType?: string;
  Status?: string;
  ImportTablesCompleted?: string[];
  ImportTablesInProgress?: string[];
  ImportTablesNotStarted?: string[];
  AvgResizeRateInMegaBytesPerSecond?: number;
  TotalResizeDataInMegaBytes?: number;
  ProgressInMegaBytes?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ResizeType?: string;
  Message?: string;
  TargetEncryptionType?: string;
  DataTransferProgressPercent?: number;
}
export const ResizeProgressMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetNodeType: S.optional(S.String),
    TargetNumberOfNodes: S.optional(S.Number),
    TargetClusterType: S.optional(S.String),
    Status: S.optional(S.String),
    ImportTablesCompleted: S.optional(ImportTablesCompleted),
    ImportTablesInProgress: S.optional(ImportTablesInProgress),
    ImportTablesNotStarted: S.optional(ImportTablesNotStarted),
    AvgResizeRateInMegaBytesPerSecond: S.optional(S.Number),
    TotalResizeDataInMegaBytes: S.optional(S.Number),
    ProgressInMegaBytes: S.optional(S.Number),
    ElapsedTimeInSeconds: S.optional(S.Number),
    EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
    ResizeType: S.optional(S.String),
    Message: S.optional(S.String),
    TargetEncryptionType: S.optional(S.String),
    DataTransferProgressPercent: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "ResizeProgressMessage",
}) as any as S.Schema<ResizeProgressMessage>;
export interface CopyClusterSnapshotMessage {
  SourceSnapshotIdentifier?: string;
  SourceSnapshotClusterIdentifier?: string;
  TargetSnapshotIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
}
export const CopyClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceSnapshotIdentifier: S.optional(S.String),
    SourceSnapshotClusterIdentifier: S.optional(S.String),
    TargetSnapshotIdentifier: S.optional(S.String),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
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
  identifier: "CopyClusterSnapshotMessage",
}) as any as S.Schema<CopyClusterSnapshotMessage>;
export interface CopyClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export const CopyClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "CopyClusterSnapshotResult",
}) as any as S.Schema<CopyClusterSnapshotResult>;
export type AuthenticationProfileNameString = string;
export interface CreateAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export const CreateAuthenticationProfileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationProfileName: S.optional(S.String),
    AuthenticationProfileContent: S.optional(S.String),
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
  identifier: "CreateAuthenticationProfileMessage",
}) as any as S.Schema<CreateAuthenticationProfileMessage>;
export interface CreateAuthenticationProfileResult {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export const CreateAuthenticationProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationProfileName: S.optional(S.String),
    AuthenticationProfileContent: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateAuthenticationProfileResult",
}) as any as S.Schema<CreateAuthenticationProfileResult>;
export type SensitiveString = string | redacted.Redacted<string>;
export type ClusterSecurityGroupNameList = string[];
export const ClusterSecurityGroupNameList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("ClusterSecurityGroupName")),
);
export type VpcSecurityGroupIdList = string[];
export const VpcSecurityGroupIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("VpcSecurityGroupId")),
);
export type IamRoleArnList = string[];
export const IamRoleArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("IamRoleArn")),
);
export type AquaConfigurationStatus =
  | "enabled"
  | "disabled"
  | "auto"
  | (string & {});
export const AquaConfigurationStatus = S.String;

export type CatalogNameString = string;
export interface CreateClusterMessage {
  DBName?: string;
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  ClusterSubnetGroupName?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  ClusterParameterGroupName?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  Port?: number;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
  Encrypted?: boolean;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  ElasticIp?: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  EnhancedVpcRouting?: boolean;
  AdditionalInfo?: string;
  IamRoles?: string[];
  MaintenanceTrackName?: string;
  SnapshotScheduleIdentifier?: string;
  AvailabilityZoneRelocation?: boolean;
  AquaConfigurationStatus?: AquaConfigurationStatus;
  DefaultIamRoleArn?: string;
  LoadSampleData?: string;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  RedshiftIdcApplicationArn?: string;
  CatalogName?: string;
  ExtraComputeForAutomaticOptimization?: boolean;
}
export const CreateClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBName: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    ClusterType: S.optional(S.String),
    NodeType: S.optional(S.String),
    MasterUsername: S.optional(S.String),
    MasterUserPassword: S.optional(SensitiveString),
    ClusterSecurityGroups: S.optional(ClusterSecurityGroupNameList),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    ClusterSubnetGroupName: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    ClusterParameterGroupName: S.optional(S.String),
    AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    Port: S.optional(S.Number),
    ClusterVersion: S.optional(S.String),
    AllowVersionUpgrade: S.optional(S.Boolean),
    NumberOfNodes: S.optional(S.Number),
    PubliclyAccessible: S.optional(S.Boolean),
    Encrypted: S.optional(S.Boolean),
    HsmClientCertificateIdentifier: S.optional(S.String),
    HsmConfigurationIdentifier: S.optional(S.String),
    ElasticIp: S.optional(S.String),
    Tags: S.optional(TagList),
    KmsKeyId: S.optional(S.String),
    EnhancedVpcRouting: S.optional(S.Boolean),
    AdditionalInfo: S.optional(S.String),
    IamRoles: S.optional(IamRoleArnList),
    MaintenanceTrackName: S.optional(S.String),
    SnapshotScheduleIdentifier: S.optional(S.String),
    AvailabilityZoneRelocation: S.optional(S.Boolean),
    AquaConfigurationStatus: S.optional(AquaConfigurationStatus),
    DefaultIamRoleArn: S.optional(S.String),
    LoadSampleData: S.optional(S.String),
    ManageMasterPassword: S.optional(S.Boolean),
    MasterPasswordSecretKmsKeyId: S.optional(S.String),
    IpAddressType: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    RedshiftIdcApplicationArn: S.optional(S.String),
    CatalogName: S.optional(S.String),
    ExtraComputeForAutomaticOptimization: S.optional(S.Boolean),
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
  identifier: "CreateClusterMessage",
}) as any as S.Schema<CreateClusterMessage>;
export interface NetworkInterface {
  NetworkInterfaceId?: string;
  SubnetId?: string;
  PrivateIpAddress?: string;
  AvailabilityZone?: string;
  Ipv6Address?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkInterfaceId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    PrivateIpAddress: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    Ipv6Address: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaceList = NetworkInterface[];
export const NetworkInterfaceList = /*@__PURE__*/ S.Array(
  NetworkInterface.pipe(T.XmlName("NetworkInterface")).annotate({
    identifier: "NetworkInterface",
  }),
);
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcId?: string;
  NetworkInterfaces?: NetworkInterface[];
}
export const VpcEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointId: S.optional(S.String),
    VpcId: S.optional(S.String),
    NetworkInterfaces: S.optional(NetworkInterfaceList),
  }),
).annotate({ identifier: "VpcEndpoint" }) as any as S.Schema<VpcEndpoint>;
export type VpcEndpointsList = VpcEndpoint[];
export const VpcEndpointsList = /*@__PURE__*/ S.Array(
  VpcEndpoint.pipe(T.XmlName("VpcEndpoint")).annotate({
    identifier: "VpcEndpoint",
  }),
);
export interface Endpoint {
  Address?: string;
  Port?: number;
  VpcEndpoints?: VpcEndpoint[];
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Port: S.optional(S.Number),
    VpcEndpoints: S.optional(VpcEndpointsList),
  }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export interface ClusterSecurityGroupMembership {
  ClusterSecurityGroupName?: string;
  Status?: string;
}
export const ClusterSecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSecurityGroupName: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterSecurityGroupMembership",
}) as any as S.Schema<ClusterSecurityGroupMembership>;
export type ClusterSecurityGroupMembershipList =
  ClusterSecurityGroupMembership[];
export const ClusterSecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  ClusterSecurityGroupMembership.pipe(
    T.XmlName("ClusterSecurityGroup"),
  ).annotate({ identifier: "ClusterSecurityGroupMembership" }),
);
export interface VpcSecurityGroupMembership {
  VpcSecurityGroupId?: string;
  Status?: string;
}
export const VpcSecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcSecurityGroupId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcSecurityGroupMembership",
}) as any as S.Schema<VpcSecurityGroupMembership>;
export type VpcSecurityGroupMembershipList = VpcSecurityGroupMembership[];
export const VpcSecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  VpcSecurityGroupMembership.pipe(T.XmlName("VpcSecurityGroup")).annotate({
    identifier: "VpcSecurityGroupMembership",
  }),
);
export interface ClusterParameterStatus {
  ParameterName?: string;
  ParameterApplyStatus?: string;
  ParameterApplyErrorDescription?: string;
}
export const ClusterParameterStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterApplyStatus: S.optional(S.String),
    ParameterApplyErrorDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterParameterStatus",
}) as any as S.Schema<ClusterParameterStatus>;
export type ClusterParameterStatusList = ClusterParameterStatus[];
export const ClusterParameterStatusList = /*@__PURE__*/ S.Array(
  ClusterParameterStatus,
);
export interface ClusterParameterGroupStatus {
  ParameterGroupName?: string;
  ParameterApplyStatus?: string;
  ClusterParameterStatusList?: ClusterParameterStatus[];
}
export const ClusterParameterGroupStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    ParameterApplyStatus: S.optional(S.String),
    ClusterParameterStatusList: S.optional(ClusterParameterStatusList),
  }),
).annotate({
  identifier: "ClusterParameterGroupStatus",
}) as any as S.Schema<ClusterParameterGroupStatus>;
export type ClusterParameterGroupStatusList = ClusterParameterGroupStatus[];
export const ClusterParameterGroupStatusList = /*@__PURE__*/ S.Array(
  ClusterParameterGroupStatus.pipe(T.XmlName("ClusterParameterGroup")).annotate(
    { identifier: "ClusterParameterGroupStatus" },
  ),
);
export interface PendingModifiedValues {
  MasterUserPassword?: string | redacted.Redacted<string>;
  NodeType?: string;
  NumberOfNodes?: number;
  ClusterType?: string;
  ClusterVersion?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ClusterIdentifier?: string;
  PubliclyAccessible?: boolean;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  EncryptionType?: string;
}
export const PendingModifiedValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasterUserPassword: S.optional(SensitiveString),
    NodeType: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    ClusterType: S.optional(S.String),
    ClusterVersion: S.optional(S.String),
    AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
    ClusterIdentifier: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    EnhancedVpcRouting: S.optional(S.Boolean),
    MaintenanceTrackName: S.optional(S.String),
    EncryptionType: S.optional(S.String),
  }),
).annotate({
  identifier: "PendingModifiedValues",
}) as any as S.Schema<PendingModifiedValues>;
export interface RestoreStatus {
  Status?: string;
  CurrentRestoreRateInMegaBytesPerSecond?: number;
  SnapshotSizeInMegaBytes?: number;
  ProgressInMegaBytes?: number;
  ElapsedTimeInSeconds?: number;
  EstimatedTimeToCompletionInSeconds?: number;
}
export const RestoreStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    CurrentRestoreRateInMegaBytesPerSecond: S.optional(S.Number),
    SnapshotSizeInMegaBytes: S.optional(S.Number),
    ProgressInMegaBytes: S.optional(S.Number),
    ElapsedTimeInSeconds: S.optional(S.Number),
    EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "RestoreStatus" }) as any as S.Schema<RestoreStatus>;
export interface DataTransferProgress {
  Status?: string;
  CurrentRateInMegaBytesPerSecond?: number;
  TotalDataInMegaBytes?: number;
  DataTransferredInMegaBytes?: number;
  EstimatedTimeToCompletionInSeconds?: number;
  ElapsedTimeInSeconds?: number;
}
export const DataTransferProgress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    CurrentRateInMegaBytesPerSecond: S.optional(S.Number),
    TotalDataInMegaBytes: S.optional(S.Number),
    DataTransferredInMegaBytes: S.optional(S.Number),
    EstimatedTimeToCompletionInSeconds: S.optional(S.Number),
    ElapsedTimeInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataTransferProgress",
}) as any as S.Schema<DataTransferProgress>;
export interface HsmStatus {
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  Status?: string;
}
export const HsmStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmClientCertificateIdentifier: S.optional(S.String),
    HsmConfigurationIdentifier: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({ identifier: "HsmStatus" }) as any as S.Schema<HsmStatus>;
export interface ClusterSnapshotCopyStatus {
  DestinationRegion?: string;
  RetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
}
export const ClusterSnapshotCopyStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationRegion: S.optional(S.String),
    RetentionPeriod: S.optional(S.Number),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    SnapshotCopyGrantName: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterSnapshotCopyStatus",
}) as any as S.Schema<ClusterSnapshotCopyStatus>;
export interface ClusterNode {
  NodeRole?: string;
  PrivateIPAddress?: string;
  PublicIPAddress?: string;
}
export const ClusterNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeRole: S.optional(S.String),
    PrivateIPAddress: S.optional(S.String),
    PublicIPAddress: S.optional(S.String),
  }),
).annotate({ identifier: "ClusterNode" }) as any as S.Schema<ClusterNode>;
export type ClusterNodesList = ClusterNode[];
export const ClusterNodesList = /*@__PURE__*/ S.Array(ClusterNode);
export interface ElasticIpStatus {
  ElasticIp?: string;
  Status?: string;
}
export const ElasticIpStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ElasticIp: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({
  identifier: "ElasticIpStatus",
}) as any as S.Schema<ElasticIpStatus>;
export interface ClusterIamRole {
  IamRoleArn?: string;
  ApplyStatus?: string;
}
export const ClusterIamRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IamRoleArn: S.optional(S.String),
    ApplyStatus: S.optional(S.String),
  }),
).annotate({ identifier: "ClusterIamRole" }) as any as S.Schema<ClusterIamRole>;
export type ClusterIamRoleList = ClusterIamRole[];
export const ClusterIamRoleList = /*@__PURE__*/ S.Array(
  ClusterIamRole.pipe(T.XmlName("ClusterIamRole")).annotate({
    identifier: "ClusterIamRole",
  }),
);
export type PendingActionsList = string[];
export const PendingActionsList = /*@__PURE__*/ S.Array(S.String);
export interface DeferredMaintenanceWindow {
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: Date;
  DeferMaintenanceEndTime?: Date;
}
export const DeferredMaintenanceWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeferMaintenanceIdentifier: S.optional(S.String),
    DeferMaintenanceStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeferMaintenanceEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DeferredMaintenanceWindow",
}) as any as S.Schema<DeferredMaintenanceWindow>;
export type DeferredMaintenanceWindowsList = DeferredMaintenanceWindow[];
export const DeferredMaintenanceWindowsList = /*@__PURE__*/ S.Array(
  DeferredMaintenanceWindow.pipe(
    T.XmlName("DeferredMaintenanceWindow"),
  ).annotate({ identifier: "DeferredMaintenanceWindow" }),
);
export type ScheduleState = "MODIFYING" | "ACTIVE" | "FAILED" | (string & {});
export const ScheduleState = S.String;

export interface ResizeInfo {
  ResizeType?: string;
  AllowCancelResize?: boolean;
}
export const ResizeInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResizeType: S.optional(S.String),
    AllowCancelResize: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ResizeInfo" }) as any as S.Schema<ResizeInfo>;
export type AquaStatus = "enabled" | "disabled" | "applying" | (string & {});
export const AquaStatus = S.String;

export interface AquaConfiguration {
  AquaStatus?: AquaStatus;
  AquaConfigurationStatus?: AquaConfigurationStatus;
}
export const AquaConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AquaStatus: S.optional(AquaStatus),
    AquaConfigurationStatus: S.optional(AquaConfigurationStatus),
  }),
).annotate({
  identifier: "AquaConfiguration",
}) as any as S.Schema<AquaConfiguration>;
export type ReservedNodeExchangeStatusType =
  | "REQUESTED"
  | "PENDING"
  | "IN_PROGRESS"
  | "RETRYING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const ReservedNodeExchangeStatusType = S.String;

export interface ReservedNodeExchangeStatus {
  ReservedNodeExchangeRequestId?: string;
  Status?: ReservedNodeExchangeStatusType;
  RequestTime?: Date;
  SourceReservedNodeId?: string;
  SourceReservedNodeType?: string;
  SourceReservedNodeCount?: number;
  TargetReservedNodeOfferingId?: string;
  TargetReservedNodeType?: string;
  TargetReservedNodeCount?: number;
}
export const ReservedNodeExchangeStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedNodeExchangeRequestId: S.optional(S.String),
    Status: S.optional(ReservedNodeExchangeStatusType),
    RequestTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SourceReservedNodeId: S.optional(S.String),
    SourceReservedNodeType: S.optional(S.String),
    SourceReservedNodeCount: S.optional(S.Number),
    TargetReservedNodeOfferingId: S.optional(S.String),
    TargetReservedNodeType: S.optional(S.String),
    TargetReservedNodeCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReservedNodeExchangeStatus",
}) as any as S.Schema<ReservedNodeExchangeStatus>;
export interface SecondaryClusterInfo {
  AvailabilityZone?: string;
  ClusterNodes?: ClusterNode[];
}
export const SecondaryClusterInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    ClusterNodes: S.optional(ClusterNodesList),
  }),
).annotate({
  identifier: "SecondaryClusterInfo",
}) as any as S.Schema<SecondaryClusterInfo>;
export type LogTypeList = string[];
export const LogTypeList = /*@__PURE__*/ S.Array(S.String);
export type S3TableLastIngestionTimeMap = { [key: string]: string | undefined };
export const S3TableLastIngestionTimeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface S3TablePublishStatus {
  S3Tables?: string[];
  S3TableNamespace?: string;
  S3TableGranularity?: string;
  EnabledAll?: boolean;
  LastIngestionTimes?: { [key: string]: string | undefined };
}
export const S3TablePublishStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Tables: S.optional(LogTypeList),
    S3TableNamespace: S.optional(S.String),
    S3TableGranularity: S.optional(S.String),
    EnabledAll: S.optional(S.Boolean),
    LastIngestionTimes: S.optional(S3TableLastIngestionTimeMap),
  }),
).annotate({
  identifier: "S3TablePublishStatus",
}) as any as S.Schema<S3TablePublishStatus>;
export interface LoggingPublishStatus {
  S3Tables?: S3TablePublishStatus;
}
export const LoggingPublishStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Tables: S.optional(S3TablePublishStatus) }),
).annotate({
  identifier: "LoggingPublishStatus",
}) as any as S.Schema<LoggingPublishStatus>;
export interface Cluster {
  ClusterIdentifier?: string;
  NodeType?: string;
  ClusterStatus?: string;
  ClusterAvailabilityStatus?: string;
  ModifyStatus?: string;
  MasterUsername?: string;
  DBName?: string;
  Endpoint?: Endpoint;
  ClusterCreateTime?: Date;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  ClusterSecurityGroups?: ClusterSecurityGroupMembership[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  ClusterParameterGroups?: ClusterParameterGroupStatus[];
  ClusterSubnetGroupName?: string;
  VpcId?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  NumberOfNodes?: number;
  PubliclyAccessible?: boolean;
  Encrypted?: boolean;
  RestoreStatus?: RestoreStatus;
  DataTransferProgress?: DataTransferProgress;
  HsmStatus?: HsmStatus;
  ClusterSnapshotCopyStatus?: ClusterSnapshotCopyStatus;
  ClusterPublicKey?: string;
  ClusterNodes?: ClusterNode[];
  ElasticIpStatus?: ElasticIpStatus;
  ClusterRevisionNumber?: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  EnhancedVpcRouting?: boolean;
  IamRoles?: ClusterIamRole[];
  PendingActions?: string[];
  MaintenanceTrackName?: string;
  ElasticResizeNumberOfNodeOptions?: string;
  DeferredMaintenanceWindows?: DeferredMaintenanceWindow[];
  SnapshotScheduleIdentifier?: string;
  SnapshotScheduleState?: ScheduleState;
  ExpectedNextSnapshotScheduleTime?: Date;
  ExpectedNextSnapshotScheduleTimeStatus?: string;
  NextMaintenanceWindowStartTime?: Date;
  ResizeInfo?: ResizeInfo;
  AvailabilityZoneRelocationStatus?: string;
  ClusterNamespaceArn?: string;
  TotalStorageCapacityInMegaBytes?: number;
  AquaConfiguration?: AquaConfiguration;
  DefaultIamRoleArn?: string;
  ReservedNodeExchangeStatus?: ReservedNodeExchangeStatus;
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  CustomDomainCertificateExpiryDate?: Date;
  MasterPasswordSecretArn?: string;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: string;
  MultiAZSecondary?: SecondaryClusterInfo;
  LakehouseRegistrationStatus?: string;
  CatalogArn?: string;
  ExtraComputeForAutomaticOptimization?: string;
  LoggingPublishStatus?: LoggingPublishStatus;
}
export const Cluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    NodeType: S.optional(S.String),
    ClusterStatus: S.optional(S.String),
    ClusterAvailabilityStatus: S.optional(S.String),
    ModifyStatus: S.optional(S.String),
    MasterUsername: S.optional(S.String),
    DBName: S.optional(S.String),
    Endpoint: S.optional(Endpoint),
    ClusterCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    ClusterSecurityGroups: S.optional(ClusterSecurityGroupMembershipList),
    VpcSecurityGroups: S.optional(VpcSecurityGroupMembershipList),
    ClusterParameterGroups: S.optional(ClusterParameterGroupStatusList),
    ClusterSubnetGroupName: S.optional(S.String),
    VpcId: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    PendingModifiedValues: S.optional(PendingModifiedValues),
    ClusterVersion: S.optional(S.String),
    AllowVersionUpgrade: S.optional(S.Boolean),
    NumberOfNodes: S.optional(S.Number),
    PubliclyAccessible: S.optional(S.Boolean),
    Encrypted: S.optional(S.Boolean),
    RestoreStatus: S.optional(RestoreStatus),
    DataTransferProgress: S.optional(DataTransferProgress),
    HsmStatus: S.optional(HsmStatus),
    ClusterSnapshotCopyStatus: S.optional(ClusterSnapshotCopyStatus),
    ClusterPublicKey: S.optional(S.String),
    ClusterNodes: S.optional(ClusterNodesList),
    ElasticIpStatus: S.optional(ElasticIpStatus),
    ClusterRevisionNumber: S.optional(S.String),
    Tags: S.optional(TagList),
    KmsKeyId: S.optional(S.String),
    EnhancedVpcRouting: S.optional(S.Boolean),
    IamRoles: S.optional(ClusterIamRoleList),
    PendingActions: S.optional(PendingActionsList),
    MaintenanceTrackName: S.optional(S.String),
    ElasticResizeNumberOfNodeOptions: S.optional(S.String),
    DeferredMaintenanceWindows: S.optional(DeferredMaintenanceWindowsList),
    SnapshotScheduleIdentifier: S.optional(S.String),
    SnapshotScheduleState: S.optional(ScheduleState),
    ExpectedNextSnapshotScheduleTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpectedNextSnapshotScheduleTimeStatus: S.optional(S.String),
    NextMaintenanceWindowStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ResizeInfo: S.optional(ResizeInfo),
    AvailabilityZoneRelocationStatus: S.optional(S.String),
    ClusterNamespaceArn: S.optional(S.String),
    TotalStorageCapacityInMegaBytes: S.optional(S.Number),
    AquaConfiguration: S.optional(AquaConfiguration),
    DefaultIamRoleArn: S.optional(S.String),
    ReservedNodeExchangeStatus: S.optional(ReservedNodeExchangeStatus),
    CustomDomainName: S.optional(S.String),
    CustomDomainCertificateArn: S.optional(S.String),
    CustomDomainCertificateExpiryDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MasterPasswordSecretArn: S.optional(S.String),
    MasterPasswordSecretKmsKeyId: S.optional(S.String),
    IpAddressType: S.optional(S.String),
    MultiAZ: S.optional(S.String),
    MultiAZSecondary: S.optional(SecondaryClusterInfo),
    LakehouseRegistrationStatus: S.optional(S.String),
    CatalogArn: S.optional(S.String),
    ExtraComputeForAutomaticOptimization: S.optional(S.String),
    LoggingPublishStatus: S.optional(LoggingPublishStatus),
  }),
).annotate({ identifier: "Cluster" }) as any as S.Schema<Cluster>;
export interface CreateClusterResult {
  Cluster?: Cluster;
}
export const CreateClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "CreateClusterResult",
}) as any as S.Schema<CreateClusterResult>;
export interface CreateClusterParameterGroupMessage {
  ParameterGroupName?: string;
  ParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    ParameterGroupFamily: S.optional(S.String),
    Description: S.optional(S.String),
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
  identifier: "CreateClusterParameterGroupMessage",
}) as any as S.Schema<CreateClusterParameterGroupMessage>;
export interface ClusterParameterGroup {
  ParameterGroupName?: string;
  ParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export const ClusterParameterGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    ParameterGroupFamily: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ClusterParameterGroup",
}) as any as S.Schema<ClusterParameterGroup>;
export interface CreateClusterParameterGroupResult {
  ClusterParameterGroup?: ClusterParameterGroup;
}
export const CreateClusterParameterGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterParameterGroup: S.optional(ClusterParameterGroup) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateClusterParameterGroupResult",
}) as any as S.Schema<CreateClusterParameterGroupResult>;
export interface CreateClusterSecurityGroupMessage {
  ClusterSecurityGroupName?: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateClusterSecurityGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSecurityGroupName: S.optional(S.String),
    Description: S.optional(S.String),
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
  identifier: "CreateClusterSecurityGroupMessage",
}) as any as S.Schema<CreateClusterSecurityGroupMessage>;
export interface CreateClusterSecurityGroupResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export const CreateClusterSecurityGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterSecurityGroup: S.optional(ClusterSecurityGroup) }).pipe(ns),
).annotate({
  identifier: "CreateClusterSecurityGroupResult",
}) as any as S.Schema<CreateClusterSecurityGroupResult>;
export interface CreateClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  ClusterIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
  Tags?: Tag[];
}
export const CreateClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
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
  identifier: "CreateClusterSnapshotMessage",
}) as any as S.Schema<CreateClusterSnapshotMessage>;
export interface CreateClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export const CreateClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "CreateClusterSnapshotResult",
}) as any as S.Schema<CreateClusterSnapshotResult>;
export type SubnetIdentifierList = string[];
export const SubnetIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SubnetIdentifier")),
);
export interface CreateClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
  Description?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export const CreateClusterSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSubnetGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdentifierList),
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
  identifier: "CreateClusterSubnetGroupMessage",
}) as any as S.Schema<CreateClusterSubnetGroupMessage>;
export interface SupportedPlatform {
  Name?: string;
}
export const SupportedPlatform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "SupportedPlatform",
}) as any as S.Schema<SupportedPlatform>;
export type SupportedPlatformsList = SupportedPlatform[];
export const SupportedPlatformsList = /*@__PURE__*/ S.Array(
  SupportedPlatform.pipe(T.XmlName("SupportedPlatform")).annotate({
    identifier: "SupportedPlatform",
  }),
);
export interface AvailabilityZone {
  Name?: string;
  SupportedPlatforms?: SupportedPlatform[];
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SupportedPlatforms: S.optional(SupportedPlatformsList),
  }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetStatus?: string;
}
export const Subnet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIdentifier: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(AvailabilityZone),
    SubnetStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Subnet" }) as any as S.Schema<Subnet>;
export type SubnetList = Subnet[];
export const SubnetList = /*@__PURE__*/ S.Array(
  Subnet.pipe(T.XmlName("Subnet")).annotate({ identifier: "Subnet" }),
);
export type ValueStringList = string[];
export const ValueStringList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface ClusterSubnetGroup {
  ClusterSubnetGroupName?: string;
  Description?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  Tags?: Tag[];
  SupportedClusterIpAddressTypes?: string[];
}
export const ClusterSubnetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSubnetGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    VpcId: S.optional(S.String),
    SubnetGroupStatus: S.optional(S.String),
    Subnets: S.optional(SubnetList),
    Tags: S.optional(TagList),
    SupportedClusterIpAddressTypes: S.optional(ValueStringList),
  }),
).annotate({
  identifier: "ClusterSubnetGroup",
}) as any as S.Schema<ClusterSubnetGroup>;
export interface CreateClusterSubnetGroupResult {
  ClusterSubnetGroup?: ClusterSubnetGroup;
}
export const CreateClusterSubnetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterSubnetGroup: S.optional(ClusterSubnetGroup) }).pipe(ns),
).annotate({
  identifier: "CreateClusterSubnetGroupResult",
}) as any as S.Schema<CreateClusterSubnetGroupResult>;
export type CustomDomainNameString = string;
export type CustomDomainCertificateArnString = string;
export interface CreateCustomDomainAssociationMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
}
export const CreateCustomDomainAssociationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CustomDomainName: S.optional(S.String),
      CustomDomainCertificateArn: S.optional(S.String),
      ClusterIdentifier: S.optional(S.String),
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
  identifier: "CreateCustomDomainAssociationMessage",
}) as any as S.Schema<CreateCustomDomainAssociationMessage>;
export interface CreateCustomDomainAssociationResult {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
  CustomDomainCertExpiryTime?: string;
}
export const CreateCustomDomainAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomDomainName: S.optional(S.String),
    CustomDomainCertificateArn: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    CustomDomainCertExpiryTime: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateCustomDomainAssociationResult",
}) as any as S.Schema<CreateCustomDomainAssociationResult>;
export interface CreateEndpointAccessMessage {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  EndpointName?: string;
  SubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
}
export const CreateEndpointAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    EndpointName: S.optional(S.String),
    SubnetGroupName: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
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
  identifier: "CreateEndpointAccessMessage",
}) as any as S.Schema<CreateEndpointAccessMessage>;
export interface EndpointAccess {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  SubnetGroupName?: string;
  EndpointStatus?: string;
  EndpointName?: string;
  EndpointCreateTime?: Date;
  Port?: number;
  Address?: string;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  VpcEndpoint?: VpcEndpoint;
}
export const EndpointAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    SubnetGroupName: S.optional(S.String),
    EndpointStatus: S.optional(S.String),
    EndpointName: S.optional(S.String),
    EndpointCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Port: S.optional(S.Number),
    Address: S.optional(S.String),
    VpcSecurityGroups: S.optional(VpcSecurityGroupMembershipList),
    VpcEndpoint: S.optional(VpcEndpoint),
  }).pipe(ns),
).annotate({ identifier: "EndpointAccess" }) as any as S.Schema<EndpointAccess>;
export type SourceIdsList = string[];
export const SourceIdsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SourceId")),
);
export type EventCategoriesList = string[];
export const EventCategoriesList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("EventCategory")),
);
export interface CreateEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  SourceIds?: string[];
  EventCategories?: string[];
  Severity?: string;
  Enabled?: boolean;
  Tags?: Tag[];
}
export const CreateEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SourceType: S.optional(S.String),
    SourceIds: S.optional(SourceIdsList),
    EventCategories: S.optional(EventCategoriesList),
    Severity: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
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
  identifier: "CreateEventSubscriptionMessage",
}) as any as S.Schema<CreateEventSubscriptionMessage>;
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: Date;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Severity?: string;
  Enabled?: boolean;
  Tags?: Tag[];
}
export const EventSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomerAwsId: S.optional(S.String),
    CustSubscriptionId: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    Status: S.optional(S.String),
    SubscriptionCreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SourceType: S.optional(S.String),
    SourceIdsList: S.optional(SourceIdsList),
    EventCategoriesList: S.optional(EventCategoriesList),
    Severity: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "EventSubscription",
}) as any as S.Schema<EventSubscription>;
export interface CreateEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export const CreateEventSubscriptionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "CreateEventSubscriptionResult",
}) as any as S.Schema<CreateEventSubscriptionResult>;
export interface CreateHsmClientCertificateMessage {
  HsmClientCertificateIdentifier?: string;
  Tags?: Tag[];
}
export const CreateHsmClientCertificateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmClientCertificateIdentifier: S.optional(S.String),
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
  identifier: "CreateHsmClientCertificateMessage",
}) as any as S.Schema<CreateHsmClientCertificateMessage>;
export interface HsmClientCertificate {
  HsmClientCertificateIdentifier?: string;
  HsmClientCertificatePublicKey?: string;
  Tags?: Tag[];
}
export const HsmClientCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmClientCertificateIdentifier: S.optional(S.String),
    HsmClientCertificatePublicKey: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "HsmClientCertificate",
}) as any as S.Schema<HsmClientCertificate>;
export interface CreateHsmClientCertificateResult {
  HsmClientCertificate?: HsmClientCertificate;
}
export const CreateHsmClientCertificateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HsmClientCertificate: S.optional(HsmClientCertificate) }).pipe(ns),
).annotate({
  identifier: "CreateHsmClientCertificateResult",
}) as any as S.Schema<CreateHsmClientCertificateResult>;
export interface CreateHsmConfigurationMessage {
  HsmConfigurationIdentifier?: string;
  Description?: string;
  HsmIpAddress?: string;
  HsmPartitionName?: string;
  HsmPartitionPassword?: string;
  HsmServerPublicCertificate?: string;
  Tags?: Tag[];
}
export const CreateHsmConfigurationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmConfigurationIdentifier: S.optional(S.String),
    Description: S.optional(S.String),
    HsmIpAddress: S.optional(S.String),
    HsmPartitionName: S.optional(S.String),
    HsmPartitionPassword: S.optional(S.String),
    HsmServerPublicCertificate: S.optional(S.String),
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
  identifier: "CreateHsmConfigurationMessage",
}) as any as S.Schema<CreateHsmConfigurationMessage>;
export interface HsmConfiguration {
  HsmConfigurationIdentifier?: string;
  Description?: string;
  HsmIpAddress?: string;
  HsmPartitionName?: string;
  Tags?: Tag[];
}
export const HsmConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmConfigurationIdentifier: S.optional(S.String),
    Description: S.optional(S.String),
    HsmIpAddress: S.optional(S.String),
    HsmPartitionName: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "HsmConfiguration",
}) as any as S.Schema<HsmConfiguration>;
export interface CreateHsmConfigurationResult {
  HsmConfiguration?: HsmConfiguration;
}
export const CreateHsmConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HsmConfiguration: S.optional(HsmConfiguration) }).pipe(ns),
).annotate({
  identifier: "CreateHsmConfigurationResult",
}) as any as S.Schema<CreateHsmConfigurationResult>;
export type SourceArn = string;
export type TargetArn = string;
export type IntegrationName = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export const EncryptionContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type IntegrationDescription = string;
export interface CreateIntegrationMessage {
  SourceArn?: string;
  TargetArn?: string;
  IntegrationName?: string;
  KMSKeyId?: string;
  TagList?: Tag[];
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Description?: string;
}
export const CreateIntegrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.optional(S.String),
    TargetArn: S.optional(S.String),
    IntegrationName: S.optional(S.String),
    KMSKeyId: S.optional(S.String),
    TagList: S.optional(TagList),
    AdditionalEncryptionContext: S.optional(EncryptionContextMap),
    Description: S.optional(S.String),
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
  identifier: "CreateIntegrationMessage",
}) as any as S.Schema<CreateIntegrationMessage>;
export type IntegrationArn = string;
export type ZeroETLIntegrationStatus =
  | "creating"
  | "active"
  | "modifying"
  | "failed"
  | "deleting"
  | "syncing"
  | "needs_attention"
  | (string & {});
export const ZeroETLIntegrationStatus = S.String;

export interface IntegrationError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const IntegrationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "IntegrationError",
}) as any as S.Schema<IntegrationError>;
export type IntegrationErrorList = IntegrationError[];
export const IntegrationErrorList = /*@__PURE__*/ S.Array(
  IntegrationError.pipe(T.XmlName("IntegrationError")).annotate({
    identifier: "IntegrationError",
  }),
);
export type Description = string;
export interface Integration {
  IntegrationArn?: string;
  IntegrationName?: string;
  SourceArn?: string;
  TargetArn?: string;
  Status?: ZeroETLIntegrationStatus;
  Errors?: (IntegrationError & { ErrorCode: string })[];
  CreateTime?: Date;
  Description?: string;
  KMSKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
}
export const Integration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationArn: S.optional(S.String),
    IntegrationName: S.optional(S.String),
    SourceArn: S.optional(S.String),
    TargetArn: S.optional(S.String),
    Status: S.optional(ZeroETLIntegrationStatus),
    Errors: S.optional(IntegrationErrorList),
    CreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    KMSKeyId: S.optional(S.String),
    AdditionalEncryptionContext: S.optional(EncryptionContextMap),
    Tags: S.optional(TagList),
  }).pipe(ns),
).annotate({ identifier: "Integration" }) as any as S.Schema<Integration>;
export type Qev2IdcApplicationName = string;
export type IdcDisplayNameString = string;
export interface CreateQev2IdcApplicationMessage {
  IdcInstanceArn?: string;
  Qev2IdcApplicationName?: string;
  IdcDisplayName?: string;
  Tags?: Tag[];
}
export const CreateQev2IdcApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdcInstanceArn: S.optional(S.String),
    Qev2IdcApplicationName: S.optional(S.String),
    IdcDisplayName: S.optional(S.String),
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
  identifier: "CreateQev2IdcApplicationMessage",
}) as any as S.Schema<CreateQev2IdcApplicationMessage>;
export interface Qev2IdcApplication {
  IdcInstanceArn?: string;
  Qev2IdcApplicationName?: string;
  Qev2IdcApplicationArn?: string;
  IdcManagedApplicationArn?: string;
  IdcOnboardStatus?: string;
  IdcDisplayName?: string;
  Tags?: Tag[];
}
export const Qev2IdcApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdcInstanceArn: S.optional(S.String),
    Qev2IdcApplicationName: S.optional(S.String),
    Qev2IdcApplicationArn: S.optional(S.String),
    IdcManagedApplicationArn: S.optional(S.String),
    IdcOnboardStatus: S.optional(S.String),
    IdcDisplayName: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "Qev2IdcApplication",
}) as any as S.Schema<Qev2IdcApplication>;
export interface CreateQev2IdcApplicationResult {
  Qev2IdcApplication?: Qev2IdcApplication;
}
export const CreateQev2IdcApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Qev2IdcApplication: S.optional(Qev2IdcApplication) }).pipe(ns),
).annotate({
  identifier: "CreateQev2IdcApplicationResult",
}) as any as S.Schema<CreateQev2IdcApplicationResult>;
export type RedshiftIdcApplicationName = string;
export type IdentityNamespaceString = string;
export type AuthorizedAudienceList = string[];
export const AuthorizedAudienceList = /*@__PURE__*/ S.Array(S.String);
export interface AuthorizedTokenIssuer {
  TrustedTokenIssuerArn?: string;
  AuthorizedAudiencesList?: string[];
}
export const AuthorizedTokenIssuer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustedTokenIssuerArn: S.optional(S.String),
    AuthorizedAudiencesList: S.optional(AuthorizedAudienceList),
  }),
).annotate({
  identifier: "AuthorizedTokenIssuer",
}) as any as S.Schema<AuthorizedTokenIssuer>;
export type AuthorizedTokenIssuerList = AuthorizedTokenIssuer[];
export const AuthorizedTokenIssuerList = /*@__PURE__*/ S.Array(
  AuthorizedTokenIssuer,
);
export type ServiceAuthorization = "Enabled" | "Disabled" | (string & {});
export const ServiceAuthorization = S.String;

export interface LakeFormationQuery {
  Authorization?: ServiceAuthorization;
}
export const LakeFormationQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Authorization: S.optional(ServiceAuthorization) }),
).annotate({
  identifier: "LakeFormationQuery",
}) as any as S.Schema<LakeFormationQuery>;
export type LakeFormationScopeUnion = {
  LakeFormationQuery: LakeFormationQuery;
};
export const LakeFormationScopeUnion = /*@__PURE__*/ S.Union([
  S.Struct({ LakeFormationQuery: LakeFormationQuery }),
]);
export type LakeFormationServiceIntegrations = LakeFormationScopeUnion[];
export const LakeFormationServiceIntegrations = /*@__PURE__*/ S.Array(
  LakeFormationScopeUnion,
);
export interface ReadWriteAccess {
  Authorization?: ServiceAuthorization;
}
export const ReadWriteAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Authorization: S.optional(ServiceAuthorization) }),
).annotate({
  identifier: "ReadWriteAccess",
}) as any as S.Schema<ReadWriteAccess>;
export type S3AccessGrantsScopeUnion = { ReadWriteAccess: ReadWriteAccess };
export const S3AccessGrantsScopeUnion = /*@__PURE__*/ S.Union([
  S.Struct({ ReadWriteAccess: ReadWriteAccess }),
]);
export type S3AccessGrantsServiceIntegrations = S3AccessGrantsScopeUnion[];
export const S3AccessGrantsServiceIntegrations = /*@__PURE__*/ S.Array(
  S3AccessGrantsScopeUnion,
);
export interface Connect {
  Authorization?: ServiceAuthorization;
}
export const Connect = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Authorization: S.optional(ServiceAuthorization) }),
).annotate({ identifier: "Connect" }) as any as S.Schema<Connect>;
export type RedshiftScopeUnion = { Connect: Connect };
export const RedshiftScopeUnion = /*@__PURE__*/ S.Union([
  S.Struct({ Connect: Connect }),
]);
export type RedshiftServiceIntegrations = RedshiftScopeUnion[];
export const RedshiftServiceIntegrations =
  /*@__PURE__*/ S.Array(RedshiftScopeUnion);
export type ServiceIntegrationsUnion =
  | {
      LakeFormation: LakeFormationScopeUnion[];
      S3AccessGrants?: never;
      Redshift?: never;
    }
  | {
      LakeFormation?: never;
      S3AccessGrants: S3AccessGrantsScopeUnion[];
      Redshift?: never;
    }
  | {
      LakeFormation?: never;
      S3AccessGrants?: never;
      Redshift: RedshiftScopeUnion[];
    };
export const ServiceIntegrationsUnion = /*@__PURE__*/ S.Union([
  S.Struct({ LakeFormation: LakeFormationServiceIntegrations }),
  S.Struct({ S3AccessGrants: S3AccessGrantsServiceIntegrations }),
  S.Struct({ Redshift: RedshiftServiceIntegrations }),
]);
export type ServiceIntegrationList = ServiceIntegrationsUnion[];
export const ServiceIntegrationList = /*@__PURE__*/ S.Array(
  ServiceIntegrationsUnion,
);
export type ApplicationType = "None" | "Lakehouse" | (string & {});
export const ApplicationType = S.String;

export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("TagKey")),
);
export interface CreateRedshiftIdcApplicationMessage {
  IdcInstanceArn?: string;
  RedshiftIdcApplicationName?: string;
  IdentityNamespace?: string;
  IdcDisplayName?: string;
  IamRoleArn?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
  ApplicationType?: ApplicationType;
  Tags?: Tag[];
  SsoTagKeys?: string[];
}
export const CreateRedshiftIdcApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdcInstanceArn: S.optional(S.String),
    RedshiftIdcApplicationName: S.optional(S.String),
    IdentityNamespace: S.optional(S.String),
    IdcDisplayName: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    AuthorizedTokenIssuerList: S.optional(AuthorizedTokenIssuerList),
    ServiceIntegrations: S.optional(ServiceIntegrationList),
    ApplicationType: S.optional(ApplicationType),
    Tags: S.optional(TagList),
    SsoTagKeys: S.optional(TagKeyList),
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
  identifier: "CreateRedshiftIdcApplicationMessage",
}) as any as S.Schema<CreateRedshiftIdcApplicationMessage>;
export interface RedshiftIdcApplication {
  IdcInstanceArn?: string;
  RedshiftIdcApplicationName?: string;
  RedshiftIdcApplicationArn?: string;
  IdentityNamespace?: string;
  IdcDisplayName?: string;
  IamRoleArn?: string;
  IdcManagedApplicationArn?: string;
  IdcOnboardStatus?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
  ApplicationType?: ApplicationType;
  Tags?: Tag[];
  SsoTagKeys?: string[];
}
export const RedshiftIdcApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdcInstanceArn: S.optional(S.String),
    RedshiftIdcApplicationName: S.optional(S.String),
    RedshiftIdcApplicationArn: S.optional(S.String),
    IdentityNamespace: S.optional(S.String),
    IdcDisplayName: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    IdcManagedApplicationArn: S.optional(S.String),
    IdcOnboardStatus: S.optional(S.String),
    AuthorizedTokenIssuerList: S.optional(AuthorizedTokenIssuerList),
    ServiceIntegrations: S.optional(ServiceIntegrationList),
    ApplicationType: S.optional(ApplicationType),
    Tags: S.optional(TagList),
    SsoTagKeys: S.optional(TagKeyList),
  }),
).annotate({
  identifier: "RedshiftIdcApplication",
}) as any as S.Schema<RedshiftIdcApplication>;
export interface CreateRedshiftIdcApplicationResult {
  RedshiftIdcApplication?: RedshiftIdcApplication;
}
export const CreateRedshiftIdcApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RedshiftIdcApplication: S.optional(RedshiftIdcApplication) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateRedshiftIdcApplicationResult",
}) as any as S.Schema<CreateRedshiftIdcApplicationResult>;
export interface ResizeClusterMessage {
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  Classic?: boolean;
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
}
export const ResizeClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ClusterType: S.optional(S.String),
    NodeType: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    Classic: S.optional(S.Boolean),
    ReservedNodeId: S.optional(S.String),
    TargetReservedNodeOfferingId: S.optional(S.String),
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
  identifier: "ResizeClusterMessage",
}) as any as S.Schema<ResizeClusterMessage>;
export interface PauseClusterMessage {
  ClusterIdentifier?: string;
}
export const PauseClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "PauseClusterMessage",
}) as any as S.Schema<PauseClusterMessage>;
export interface ResumeClusterMessage {
  ClusterIdentifier?: string;
}
export const ResumeClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "ResumeClusterMessage",
}) as any as S.Schema<ResumeClusterMessage>;
export interface ScheduledActionType {
  ResizeCluster?: ResizeClusterMessage;
  PauseCluster?: PauseClusterMessage;
  ResumeCluster?: ResumeClusterMessage;
}
export const ScheduledActionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResizeCluster: S.optional(ResizeClusterMessage),
    PauseCluster: S.optional(PauseClusterMessage),
    ResumeCluster: S.optional(ResumeClusterMessage),
  }),
).annotate({
  identifier: "ScheduledActionType",
}) as any as S.Schema<ScheduledActionType>;
export interface CreateScheduledActionMessage {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType;
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  Enable?: boolean;
}
export const CreateScheduledActionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActionName: S.optional(S.String),
    TargetAction: S.optional(ScheduledActionType),
    Schedule: S.optional(S.String),
    IamRole: S.optional(S.String),
    ScheduledActionDescription: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Enable: S.optional(S.Boolean),
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
  identifier: "CreateScheduledActionMessage",
}) as any as S.Schema<CreateScheduledActionMessage>;
export type ScheduledActionState = "ACTIVE" | "DISABLED" | (string & {});
export const ScheduledActionState = S.String;

export type ScheduledActionTimeList = Date[];
export const ScheduledActionTimeList = /*@__PURE__*/ S.Array(
  T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
    T.XmlName("ScheduledActionTime"),
  ),
);
export interface ScheduledAction {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType & {
    ResizeCluster: ResizeClusterMessage & { ClusterIdentifier: string };
    PauseCluster: PauseClusterMessage & { ClusterIdentifier: string };
    ResumeCluster: ResumeClusterMessage & { ClusterIdentifier: string };
  };
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  State?: ScheduledActionState;
  NextInvocations?: Date[];
  StartTime?: Date;
  EndTime?: Date;
}
export const ScheduledAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActionName: S.optional(S.String),
    TargetAction: S.optional(ScheduledActionType),
    Schedule: S.optional(S.String),
    IamRole: S.optional(S.String),
    ScheduledActionDescription: S.optional(S.String),
    State: S.optional(ScheduledActionState),
    NextInvocations: S.optional(ScheduledActionTimeList),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }).pipe(ns),
).annotate({
  identifier: "ScheduledAction",
}) as any as S.Schema<ScheduledAction>;
export interface CreateSnapshotCopyGrantMessage {
  SnapshotCopyGrantName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CreateSnapshotCopyGrantMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotCopyGrantName: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
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
  identifier: "CreateSnapshotCopyGrantMessage",
}) as any as S.Schema<CreateSnapshotCopyGrantMessage>;
export interface SnapshotCopyGrant {
  SnapshotCopyGrantName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const SnapshotCopyGrant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotCopyGrantName: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "SnapshotCopyGrant",
}) as any as S.Schema<SnapshotCopyGrant>;
export interface CreateSnapshotCopyGrantResult {
  SnapshotCopyGrant?: SnapshotCopyGrant;
}
export const CreateSnapshotCopyGrantResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnapshotCopyGrant: S.optional(SnapshotCopyGrant) }).pipe(ns),
).annotate({
  identifier: "CreateSnapshotCopyGrantResult",
}) as any as S.Schema<CreateSnapshotCopyGrantResult>;
export type ScheduleDefinitionList = string[];
export const ScheduleDefinitionList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("ScheduleDefinition")),
);
export interface CreateSnapshotScheduleMessage {
  ScheduleDefinitions?: string[];
  ScheduleIdentifier?: string;
  ScheduleDescription?: string;
  Tags?: Tag[];
  DryRun?: boolean;
  NextInvocations?: number;
}
export const CreateSnapshotScheduleMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduleDefinitions: S.optional(ScheduleDefinitionList),
    ScheduleIdentifier: S.optional(S.String),
    ScheduleDescription: S.optional(S.String),
    Tags: S.optional(TagList),
    DryRun: S.optional(S.Boolean),
    NextInvocations: S.optional(S.Number),
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
  identifier: "CreateSnapshotScheduleMessage",
}) as any as S.Schema<CreateSnapshotScheduleMessage>;
export type ScheduledSnapshotTimeList = Date[];
export const ScheduledSnapshotTimeList = /*@__PURE__*/ S.Array(
  T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
    T.XmlName("SnapshotTime"),
  ),
);
export interface ClusterAssociatedToSchedule {
  ClusterIdentifier?: string;
  ScheduleAssociationState?: ScheduleState;
}
export const ClusterAssociatedToSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ScheduleAssociationState: S.optional(ScheduleState),
  }),
).annotate({
  identifier: "ClusterAssociatedToSchedule",
}) as any as S.Schema<ClusterAssociatedToSchedule>;
export type AssociatedClusterList = ClusterAssociatedToSchedule[];
export const AssociatedClusterList = /*@__PURE__*/ S.Array(
  ClusterAssociatedToSchedule.pipe(
    T.XmlName("ClusterAssociatedToSchedule"),
  ).annotate({ identifier: "ClusterAssociatedToSchedule" }),
);
export interface SnapshotSchedule {
  ScheduleDefinitions?: string[];
  ScheduleIdentifier?: string;
  ScheduleDescription?: string;
  Tags?: Tag[];
  NextInvocations?: Date[];
  AssociatedClusterCount?: number;
  AssociatedClusters?: ClusterAssociatedToSchedule[];
}
export const SnapshotSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduleDefinitions: S.optional(ScheduleDefinitionList),
    ScheduleIdentifier: S.optional(S.String),
    ScheduleDescription: S.optional(S.String),
    Tags: S.optional(TagList),
    NextInvocations: S.optional(ScheduledSnapshotTimeList),
    AssociatedClusterCount: S.optional(S.Number),
    AssociatedClusters: S.optional(AssociatedClusterList),
  }).pipe(ns),
).annotate({
  identifier: "SnapshotSchedule",
}) as any as S.Schema<SnapshotSchedule>;
export interface CreateTagsMessage {
  ResourceName?: string;
  Tags?: Tag[];
}
export const CreateTagsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
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
  identifier: "CreateTagsMessage",
}) as any as S.Schema<CreateTagsMessage>;
export interface CreateTagsResponse {}
export const CreateTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateTagsResponse",
}) as any as S.Schema<CreateTagsResponse>;
export type UsageLimitFeatureType =
  | "spectrum"
  | "concurrency-scaling"
  | "cross-region-datasharing"
  | "extra-compute-for-automatic-optimization"
  | (string & {});
export const UsageLimitFeatureType = S.String;

export type UsageLimitLimitType = "time" | "data-scanned" | (string & {});
export const UsageLimitLimitType = S.String;

export type UsageLimitPeriod = "daily" | "weekly" | "monthly" | (string & {});
export const UsageLimitPeriod = S.String;

export type UsageLimitBreachAction =
  | "log"
  | "emit-metric"
  | "disable"
  | (string & {});
export const UsageLimitBreachAction = S.String;

export interface CreateUsageLimitMessage {
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  LimitType?: UsageLimitLimitType;
  Amount?: number;
  Period?: UsageLimitPeriod;
  BreachAction?: UsageLimitBreachAction;
  Tags?: Tag[];
}
export const CreateUsageLimitMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    FeatureType: S.optional(UsageLimitFeatureType),
    LimitType: S.optional(UsageLimitLimitType),
    Amount: S.optional(S.Number),
    Period: S.optional(UsageLimitPeriod),
    BreachAction: S.optional(UsageLimitBreachAction),
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
  identifier: "CreateUsageLimitMessage",
}) as any as S.Schema<CreateUsageLimitMessage>;
export interface UsageLimit {
  UsageLimitId?: string;
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  LimitType?: UsageLimitLimitType;
  Amount?: number;
  Period?: UsageLimitPeriod;
  BreachAction?: UsageLimitBreachAction;
  Tags?: Tag[];
}
export const UsageLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageLimitId: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    FeatureType: S.optional(UsageLimitFeatureType),
    LimitType: S.optional(UsageLimitLimitType),
    Amount: S.optional(S.Number),
    Period: S.optional(UsageLimitPeriod),
    BreachAction: S.optional(UsageLimitBreachAction),
    Tags: S.optional(TagList),
  }).pipe(ns),
).annotate({ identifier: "UsageLimit" }) as any as S.Schema<UsageLimit>;
export interface DeauthorizeDataShareMessage {
  DataShareArn?: string;
  ConsumerIdentifier?: string;
}
export const DeauthorizeDataShareMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShareArn: S.optional(S.String),
    ConsumerIdentifier: S.optional(S.String),
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
  identifier: "DeauthorizeDataShareMessage",
}) as any as S.Schema<DeauthorizeDataShareMessage>;
export interface DeleteAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
}
export const DeleteAuthenticationProfileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuthenticationProfileName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteAuthenticationProfileMessage",
}) as any as S.Schema<DeleteAuthenticationProfileMessage>;
export interface DeleteAuthenticationProfileResult {
  AuthenticationProfileName?: string;
}
export const DeleteAuthenticationProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuthenticationProfileName: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteAuthenticationProfileResult",
}) as any as S.Schema<DeleteAuthenticationProfileResult>;
export interface DeleteClusterMessage {
  ClusterIdentifier?: string;
  SkipFinalClusterSnapshot?: boolean;
  FinalClusterSnapshotIdentifier?: string;
  FinalClusterSnapshotRetentionPeriod?: number;
}
export const DeleteClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    SkipFinalClusterSnapshot: S.optional(S.Boolean),
    FinalClusterSnapshotIdentifier: S.optional(S.String),
    FinalClusterSnapshotRetentionPeriod: S.optional(S.Number),
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
  identifier: "DeleteClusterMessage",
}) as any as S.Schema<DeleteClusterMessage>;
export interface DeleteClusterResult {
  Cluster?: Cluster;
}
export const DeleteClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DeleteClusterResult",
}) as any as S.Schema<DeleteClusterResult>;
export interface DeleteClusterParameterGroupMessage {
  ParameterGroupName?: string;
}
export const DeleteClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ParameterGroupName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteClusterParameterGroupMessage",
}) as any as S.Schema<DeleteClusterParameterGroupMessage>;
export interface DeleteClusterParameterGroupResponse {}
export const DeleteClusterParameterGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteClusterParameterGroupResponse",
}) as any as S.Schema<DeleteClusterParameterGroupResponse>;
export interface DeleteClusterSecurityGroupMessage {
  ClusterSecurityGroupName?: string;
}
export const DeleteClusterSecurityGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterSecurityGroupName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteClusterSecurityGroupMessage",
}) as any as S.Schema<DeleteClusterSecurityGroupMessage>;
export interface DeleteClusterSecurityGroupResponse {}
export const DeleteClusterSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteClusterSecurityGroupResponse",
}) as any as S.Schema<DeleteClusterSecurityGroupResponse>;
export interface DeleteClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export const DeleteClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "DeleteClusterSnapshotResult",
}) as any as S.Schema<DeleteClusterSnapshotResult>;
export interface DeleteClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
}
export const DeleteClusterSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterSubnetGroupName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteClusterSubnetGroupMessage",
}) as any as S.Schema<DeleteClusterSubnetGroupMessage>;
export interface DeleteClusterSubnetGroupResponse {}
export const DeleteClusterSubnetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteClusterSubnetGroupResponse",
}) as any as S.Schema<DeleteClusterSubnetGroupResponse>;
export interface DeleteCustomDomainAssociationMessage {
  ClusterIdentifier?: string;
  CustomDomainName?: string;
}
export const DeleteCustomDomainAssociationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterIdentifier: S.optional(S.String),
      CustomDomainName: S.optional(S.String),
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
  identifier: "DeleteCustomDomainAssociationMessage",
}) as any as S.Schema<DeleteCustomDomainAssociationMessage>;
export interface DeleteCustomDomainAssociationResponse {}
export const DeleteCustomDomainAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCustomDomainAssociationResponse",
}) as any as S.Schema<DeleteCustomDomainAssociationResponse>;
export interface DeleteEndpointAccessMessage {
  EndpointName?: string;
}
export const DeleteEndpointAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteEndpointAccessMessage",
}) as any as S.Schema<DeleteEndpointAccessMessage>;
export interface DeleteEventSubscriptionMessage {
  SubscriptionName?: string;
}
export const DeleteEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubscriptionName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteEventSubscriptionMessage",
}) as any as S.Schema<DeleteEventSubscriptionMessage>;
export interface DeleteEventSubscriptionResponse {}
export const DeleteEventSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEventSubscriptionResponse",
}) as any as S.Schema<DeleteEventSubscriptionResponse>;
export interface DeleteHsmClientCertificateMessage {
  HsmClientCertificateIdentifier?: string;
}
export const DeleteHsmClientCertificateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HsmClientCertificateIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DeleteHsmClientCertificateMessage",
}) as any as S.Schema<DeleteHsmClientCertificateMessage>;
export interface DeleteHsmClientCertificateResponse {}
export const DeleteHsmClientCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteHsmClientCertificateResponse",
}) as any as S.Schema<DeleteHsmClientCertificateResponse>;
export interface DeleteHsmConfigurationMessage {
  HsmConfigurationIdentifier?: string;
}
export const DeleteHsmConfigurationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HsmConfigurationIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DeleteHsmConfigurationMessage",
}) as any as S.Schema<DeleteHsmConfigurationMessage>;
export interface DeleteHsmConfigurationResponse {}
export const DeleteHsmConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteHsmConfigurationResponse",
}) as any as S.Schema<DeleteHsmConfigurationResponse>;
export interface DeleteIntegrationMessage {
  IntegrationArn?: string;
}
export const DeleteIntegrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IntegrationArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteIntegrationMessage",
}) as any as S.Schema<DeleteIntegrationMessage>;
export interface DeleteQev2IdcApplicationMessage {
  Qev2IdcApplicationArn?: string;
}
export const DeleteQev2IdcApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Qev2IdcApplicationArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteQev2IdcApplicationMessage",
}) as any as S.Schema<DeleteQev2IdcApplicationMessage>;
export interface DeleteQev2IdcApplicationResponse {}
export const DeleteQev2IdcApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteQev2IdcApplicationResponse",
}) as any as S.Schema<DeleteQev2IdcApplicationResponse>;
export interface DeleteRedshiftIdcApplicationMessage {
  RedshiftIdcApplicationArn?: string;
}
export const DeleteRedshiftIdcApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RedshiftIdcApplicationArn: S.optional(S.String) }).pipe(
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
  identifier: "DeleteRedshiftIdcApplicationMessage",
}) as any as S.Schema<DeleteRedshiftIdcApplicationMessage>;
export interface DeleteRedshiftIdcApplicationResponse {}
export const DeleteRedshiftIdcApplicationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteRedshiftIdcApplicationResponse",
}) as any as S.Schema<DeleteRedshiftIdcApplicationResponse>;
export interface DeleteResourcePolicyMessage {
  ResourceArn?: string;
}
export const DeleteResourcePolicyMessage = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeleteResourcePolicyMessage",
}) as any as S.Schema<DeleteResourcePolicyMessage>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteScheduledActionMessage {
  ScheduledActionName?: string;
}
export const DeleteScheduledActionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledActionName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteScheduledActionMessage",
}) as any as S.Schema<DeleteScheduledActionMessage>;
export interface DeleteScheduledActionResponse {}
export const DeleteScheduledActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteScheduledActionResponse",
}) as any as S.Schema<DeleteScheduledActionResponse>;
export interface DeleteSnapshotCopyGrantMessage {
  SnapshotCopyGrantName?: string;
}
export const DeleteSnapshotCopyGrantMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnapshotCopyGrantName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteSnapshotCopyGrantMessage",
}) as any as S.Schema<DeleteSnapshotCopyGrantMessage>;
export interface DeleteSnapshotCopyGrantResponse {}
export const DeleteSnapshotCopyGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSnapshotCopyGrantResponse",
}) as any as S.Schema<DeleteSnapshotCopyGrantResponse>;
export interface DeleteSnapshotScheduleMessage {
  ScheduleIdentifier?: string;
}
export const DeleteSnapshotScheduleMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DeleteSnapshotScheduleMessage",
}) as any as S.Schema<DeleteSnapshotScheduleMessage>;
export interface DeleteSnapshotScheduleResponse {}
export const DeleteSnapshotScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSnapshotScheduleResponse",
}) as any as S.Schema<DeleteSnapshotScheduleResponse>;
export interface DeleteTagsMessage {
  ResourceName?: string;
  TagKeys?: string[];
}
export const DeleteTagsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
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
  identifier: "DeleteTagsMessage",
}) as any as S.Schema<DeleteTagsMessage>;
export interface DeleteTagsResponse {}
export const DeleteTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTagsResponse",
}) as any as S.Schema<DeleteTagsResponse>;
export interface DeleteUsageLimitMessage {
  UsageLimitId?: string;
}
export const DeleteUsageLimitMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UsageLimitId: S.optional(S.String) }).pipe(
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
  identifier: "DeleteUsageLimitMessage",
}) as any as S.Schema<DeleteUsageLimitMessage>;
export interface DeleteUsageLimitResponse {}
export const DeleteUsageLimitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteUsageLimitResponse",
}) as any as S.Schema<DeleteUsageLimitResponse>;
export interface ServerlessIdentifier {
  NamespaceIdentifier?: string;
  WorkgroupIdentifier?: string;
}
export const ServerlessIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamespaceIdentifier: S.optional(S.String),
    WorkgroupIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerlessIdentifier",
}) as any as S.Schema<ServerlessIdentifier>;
export interface ProvisionedIdentifier {
  ClusterIdentifier?: string;
}
export const ProvisionedIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "ProvisionedIdentifier",
}) as any as S.Schema<ProvisionedIdentifier>;
export type NamespaceIdentifierUnion =
  | {
      ServerlessIdentifier: ServerlessIdentifier;
      ProvisionedIdentifier?: never;
    }
  | {
      ServerlessIdentifier?: never;
      ProvisionedIdentifier: ProvisionedIdentifier;
    };
export const NamespaceIdentifierUnion = /*@__PURE__*/ S.Union([
  S.Struct({ ServerlessIdentifier: ServerlessIdentifier }),
  S.Struct({ ProvisionedIdentifier: ProvisionedIdentifier }),
]);
export type ConsumerIdentifierList = string[];
export const ConsumerIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface DeregisterNamespaceInputMessage {
  NamespaceIdentifier?: NamespaceIdentifierUnion;
  ConsumerIdentifiers?: string[];
}
export const DeregisterNamespaceInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamespaceIdentifier: S.optional(NamespaceIdentifierUnion),
    ConsumerIdentifiers: S.optional(ConsumerIdentifierList),
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
  identifier: "DeregisterNamespaceInputMessage",
}) as any as S.Schema<DeregisterNamespaceInputMessage>;
export type NamespaceRegistrationStatus =
  | "Registering"
  | "Deregistering"
  | (string & {});
export const NamespaceRegistrationStatus = S.String;

export interface DeregisterNamespaceOutputMessage {
  Status?: NamespaceRegistrationStatus;
}
export const DeregisterNamespaceOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(NamespaceRegistrationStatus) }).pipe(ns),
).annotate({
  identifier: "DeregisterNamespaceOutputMessage",
}) as any as S.Schema<DeregisterNamespaceOutputMessage>;
export type AttributeNameList = string[];
export const AttributeNameList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("AttributeName")),
);
export interface DescribeAccountAttributesMessage {
  AttributeNames?: string[];
}
export const DescribeAccountAttributesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeNames: S.optional(AttributeNameList) }).pipe(
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
  identifier: "DescribeAccountAttributesMessage",
}) as any as S.Schema<DescribeAccountAttributesMessage>;
export interface AttributeValueTarget {
  AttributeValue?: string;
}
export const AttributeValueTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeValue: S.optional(S.String) }),
).annotate({
  identifier: "AttributeValueTarget",
}) as any as S.Schema<AttributeValueTarget>;
export type AttributeValueList = AttributeValueTarget[];
export const AttributeValueList = /*@__PURE__*/ S.Array(
  AttributeValueTarget.pipe(T.XmlName("AttributeValueTarget")).annotate({
    identifier: "AttributeValueTarget",
  }),
);
export interface AccountAttribute {
  AttributeName?: string;
  AttributeValues?: AttributeValueTarget[];
}
export const AccountAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    AttributeValues: S.optional(AttributeValueList),
  }),
).annotate({
  identifier: "AccountAttribute",
}) as any as S.Schema<AccountAttribute>;
export type AttributeList = AccountAttribute[];
export const AttributeList = /*@__PURE__*/ S.Array(
  AccountAttribute.pipe(T.XmlName("AccountAttribute")).annotate({
    identifier: "AccountAttribute",
  }),
);
export interface AccountAttributeList {
  AccountAttributes?: AccountAttribute[];
}
export const AccountAttributeList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountAttributes: S.optional(AttributeList) }).pipe(ns),
).annotate({
  identifier: "AccountAttributeList",
}) as any as S.Schema<AccountAttributeList>;
export interface DescribeAuthenticationProfilesMessage {
  AuthenticationProfileName?: string;
}
export const DescribeAuthenticationProfilesMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AuthenticationProfileName: S.optional(S.String) }).pipe(
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
  identifier: "DescribeAuthenticationProfilesMessage",
}) as any as S.Schema<DescribeAuthenticationProfilesMessage>;
export interface AuthenticationProfile {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export const AuthenticationProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationProfileName: S.optional(S.String),
    AuthenticationProfileContent: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthenticationProfile",
}) as any as S.Schema<AuthenticationProfile>;
export type AuthenticationProfileList = AuthenticationProfile[];
export const AuthenticationProfileList = /*@__PURE__*/ S.Array(
  AuthenticationProfile,
);
export interface DescribeAuthenticationProfilesResult {
  AuthenticationProfiles?: AuthenticationProfile[];
}
export const DescribeAuthenticationProfilesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AuthenticationProfiles: S.optional(AuthenticationProfileList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeAuthenticationProfilesResult",
}) as any as S.Schema<DescribeAuthenticationProfilesResult>;
export interface DescribeClusterDbRevisionsMessage {
  ClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeClusterDbRevisionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeClusterDbRevisionsMessage",
}) as any as S.Schema<DescribeClusterDbRevisionsMessage>;
export interface RevisionTarget {
  DatabaseRevision?: string;
  Description?: string;
  DatabaseRevisionReleaseDate?: Date;
}
export const RevisionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseRevision: S.optional(S.String),
    Description: S.optional(S.String),
    DatabaseRevisionReleaseDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "RevisionTarget" }) as any as S.Schema<RevisionTarget>;
export type RevisionTargetsList = RevisionTarget[];
export const RevisionTargetsList = /*@__PURE__*/ S.Array(
  RevisionTarget.pipe(T.XmlName("RevisionTarget")).annotate({
    identifier: "RevisionTarget",
  }),
);
export interface ClusterDbRevision {
  ClusterIdentifier?: string;
  CurrentDatabaseRevision?: string;
  DatabaseRevisionReleaseDate?: Date;
  RevisionTargets?: RevisionTarget[];
}
export const ClusterDbRevision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    CurrentDatabaseRevision: S.optional(S.String),
    DatabaseRevisionReleaseDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RevisionTargets: S.optional(RevisionTargetsList),
  }),
).annotate({
  identifier: "ClusterDbRevision",
}) as any as S.Schema<ClusterDbRevision>;
export type ClusterDbRevisionsList = ClusterDbRevision[];
export const ClusterDbRevisionsList = /*@__PURE__*/ S.Array(
  ClusterDbRevision.pipe(T.XmlName("ClusterDbRevision")).annotate({
    identifier: "ClusterDbRevision",
  }),
);
export interface ClusterDbRevisionsMessage {
  Marker?: string;
  ClusterDbRevisions?: ClusterDbRevision[];
}
export const ClusterDbRevisionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ClusterDbRevisions: S.optional(ClusterDbRevisionsList),
  }).pipe(ns),
).annotate({
  identifier: "ClusterDbRevisionsMessage",
}) as any as S.Schema<ClusterDbRevisionsMessage>;
export type TagValueList = string[];
export const TagValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("TagValue")),
);
export interface DescribeClusterParameterGroupsMessage {
  ParameterGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeClusterParameterGroupsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ParameterGroupName: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
      TagKeys: S.optional(TagKeyList),
      TagValues: S.optional(TagValueList),
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
  identifier: "DescribeClusterParameterGroupsMessage",
}) as any as S.Schema<DescribeClusterParameterGroupsMessage>;
export type ParameterGroupList = ClusterParameterGroup[];
export const ParameterGroupList = /*@__PURE__*/ S.Array(
  ClusterParameterGroup.pipe(T.XmlName("ClusterParameterGroup")).annotate({
    identifier: "ClusterParameterGroup",
  }),
);
export interface ClusterParameterGroupsMessage {
  Marker?: string;
  ParameterGroups?: ClusterParameterGroup[];
}
export const ClusterParameterGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ParameterGroups: S.optional(ParameterGroupList),
  }).pipe(ns),
).annotate({
  identifier: "ClusterParameterGroupsMessage",
}) as any as S.Schema<ClusterParameterGroupsMessage>;
export interface DescribeClusterParametersMessage {
  ParameterGroupName?: string;
  Source?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeClusterParametersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    Source: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeClusterParametersMessage",
}) as any as S.Schema<DescribeClusterParametersMessage>;
export type ParameterApplyType = "static" | "dynamic" | (string & {});
export const ParameterApplyType = S.String;

export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  ApplyType?: ParameterApplyType;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
    Description: S.optional(S.String),
    Source: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    ApplyType: S.optional(ParameterApplyType),
    IsModifiable: S.optional(S.Boolean),
    MinimumEngineVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParametersList = Parameter[];
export const ParametersList = /*@__PURE__*/ S.Array(
  Parameter.pipe(T.XmlName("Parameter")).annotate({ identifier: "Parameter" }),
);
export interface ClusterParameterGroupDetails {
  Parameters?: Parameter[];
  Marker?: string;
}
export const ClusterParameterGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParametersList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ClusterParameterGroupDetails",
}) as any as S.Schema<ClusterParameterGroupDetails>;
export interface DescribeClustersMessage {
  ClusterIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeClustersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeClustersMessage",
}) as any as S.Schema<DescribeClustersMessage>;
export type ClusterList = Cluster[];
export const ClusterList = /*@__PURE__*/ S.Array(
  Cluster.pipe(T.XmlName("Cluster")).annotate({ identifier: "Cluster" }),
);
export interface ClustersMessage {
  Marker?: string;
  Clusters?: Cluster[];
}
export const ClustersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Clusters: S.optional(ClusterList),
  }).pipe(ns),
).annotate({
  identifier: "ClustersMessage",
}) as any as S.Schema<ClustersMessage>;
export interface DescribeClusterSecurityGroupsMessage {
  ClusterSecurityGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeClusterSecurityGroupsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterSecurityGroupName: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
      TagKeys: S.optional(TagKeyList),
      TagValues: S.optional(TagValueList),
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
  identifier: "DescribeClusterSecurityGroupsMessage",
}) as any as S.Schema<DescribeClusterSecurityGroupsMessage>;
export type ClusterSecurityGroups = ClusterSecurityGroup[];
export const ClusterSecurityGroups = /*@__PURE__*/ S.Array(
  ClusterSecurityGroup.pipe(T.XmlName("ClusterSecurityGroup")).annotate({
    identifier: "ClusterSecurityGroup",
  }),
);
export interface ClusterSecurityGroupMessage {
  Marker?: string;
  ClusterSecurityGroups?: ClusterSecurityGroup[];
}
export const ClusterSecurityGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ClusterSecurityGroups: S.optional(ClusterSecurityGroups),
  }).pipe(ns),
).annotate({
  identifier: "ClusterSecurityGroupMessage",
}) as any as S.Schema<ClusterSecurityGroupMessage>;
export type SnapshotAttributeToSortBy =
  | "SOURCE_TYPE"
  | "TOTAL_SIZE"
  | "CREATE_TIME"
  | (string & {});
export const SnapshotAttributeToSortBy = S.String;

export type SortByOrder = "ASC" | "DESC" | (string & {});
export const SortByOrder = S.String;

export interface SnapshotSortingEntity {
  Attribute?: SnapshotAttributeToSortBy;
  SortOrder?: SortByOrder;
}
export const SnapshotSortingEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: S.optional(SnapshotAttributeToSortBy),
    SortOrder: S.optional(SortByOrder),
  }),
).annotate({
  identifier: "SnapshotSortingEntity",
}) as any as S.Schema<SnapshotSortingEntity>;
export type SnapshotSortingEntityList = SnapshotSortingEntity[];
export const SnapshotSortingEntityList = /*@__PURE__*/ S.Array(
  SnapshotSortingEntity.pipe(T.XmlName("SnapshotSortingEntity")).annotate({
    identifier: "SnapshotSortingEntity",
  }),
);
export interface DescribeClusterSnapshotsMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotType?: string;
  StartTime?: Date;
  EndTime?: Date;
  MaxRecords?: number;
  Marker?: string;
  OwnerAccount?: string;
  TagKeys?: string[];
  TagValues?: string[];
  ClusterExists?: boolean;
  SortingEntities?: SnapshotSortingEntity[];
}
export const DescribeClusterSnapshotsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    SnapshotIdentifier: S.optional(S.String),
    SnapshotArn: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    OwnerAccount: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
    ClusterExists: S.optional(S.Boolean),
    SortingEntities: S.optional(SnapshotSortingEntityList),
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
  identifier: "DescribeClusterSnapshotsMessage",
}) as any as S.Schema<DescribeClusterSnapshotsMessage>;
export type SnapshotList = Snapshot[];
export const SnapshotList = /*@__PURE__*/ S.Array(
  Snapshot.pipe(T.XmlName("Snapshot")).annotate({ identifier: "Snapshot" }),
);
export interface SnapshotMessage {
  Marker?: string;
  Snapshots?: Snapshot[];
}
export const SnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Snapshots: S.optional(SnapshotList),
  }).pipe(ns),
).annotate({
  identifier: "SnapshotMessage",
}) as any as S.Schema<SnapshotMessage>;
export interface DescribeClusterSubnetGroupsMessage {
  ClusterSubnetGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeClusterSubnetGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSubnetGroupName: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeClusterSubnetGroupsMessage",
}) as any as S.Schema<DescribeClusterSubnetGroupsMessage>;
export type ClusterSubnetGroups = ClusterSubnetGroup[];
export const ClusterSubnetGroups = /*@__PURE__*/ S.Array(
  ClusterSubnetGroup.pipe(T.XmlName("ClusterSubnetGroup")).annotate({
    identifier: "ClusterSubnetGroup",
  }),
);
export interface ClusterSubnetGroupMessage {
  Marker?: string;
  ClusterSubnetGroups?: ClusterSubnetGroup[];
}
export const ClusterSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ClusterSubnetGroups: S.optional(ClusterSubnetGroups),
  }).pipe(ns),
).annotate({
  identifier: "ClusterSubnetGroupMessage",
}) as any as S.Schema<ClusterSubnetGroupMessage>;
export interface DescribeClusterTracksMessage {
  MaintenanceTrackName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeClusterTracksMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceTrackName: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeClusterTracksMessage",
}) as any as S.Schema<DescribeClusterTracksMessage>;
export interface SupportedOperation {
  OperationName?: string;
}
export const SupportedOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationName: S.optional(S.String) }),
).annotate({
  identifier: "SupportedOperation",
}) as any as S.Schema<SupportedOperation>;
export type SupportedOperationList = SupportedOperation[];
export const SupportedOperationList = /*@__PURE__*/ S.Array(
  SupportedOperation.pipe(T.XmlName("SupportedOperation")).annotate({
    identifier: "SupportedOperation",
  }),
);
export interface UpdateTarget {
  MaintenanceTrackName?: string;
  DatabaseVersion?: string;
  SupportedOperations?: SupportedOperation[];
}
export const UpdateTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceTrackName: S.optional(S.String),
    DatabaseVersion: S.optional(S.String),
    SupportedOperations: S.optional(SupportedOperationList),
  }),
).annotate({ identifier: "UpdateTarget" }) as any as S.Schema<UpdateTarget>;
export type EligibleTracksToUpdateList = UpdateTarget[];
export const EligibleTracksToUpdateList = /*@__PURE__*/ S.Array(
  UpdateTarget.pipe(T.XmlName("UpdateTarget")).annotate({
    identifier: "UpdateTarget",
  }),
);
export interface MaintenanceTrack {
  MaintenanceTrackName?: string;
  DatabaseVersion?: string;
  UpdateTargets?: UpdateTarget[];
}
export const MaintenanceTrack = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceTrackName: S.optional(S.String),
    DatabaseVersion: S.optional(S.String),
    UpdateTargets: S.optional(EligibleTracksToUpdateList),
  }),
).annotate({
  identifier: "MaintenanceTrack",
}) as any as S.Schema<MaintenanceTrack>;
export type TrackList = MaintenanceTrack[];
export const TrackList = /*@__PURE__*/ S.Array(
  MaintenanceTrack.pipe(T.XmlName("MaintenanceTrack")).annotate({
    identifier: "MaintenanceTrack",
  }),
);
export interface TrackListMessage {
  MaintenanceTracks?: MaintenanceTrack[];
  Marker?: string;
}
export const TrackListMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceTracks: S.optional(TrackList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "TrackListMessage",
}) as any as S.Schema<TrackListMessage>;
export interface DescribeClusterVersionsMessage {
  ClusterVersion?: string;
  ClusterParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeClusterVersionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterVersion: S.optional(S.String),
    ClusterParameterGroupFamily: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeClusterVersionsMessage",
}) as any as S.Schema<DescribeClusterVersionsMessage>;
export interface ClusterVersion {
  ClusterVersion?: string;
  ClusterParameterGroupFamily?: string;
  Description?: string;
}
export const ClusterVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterVersion: S.optional(S.String),
    ClusterParameterGroupFamily: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "ClusterVersion" }) as any as S.Schema<ClusterVersion>;
export type ClusterVersionList = ClusterVersion[];
export const ClusterVersionList = /*@__PURE__*/ S.Array(
  ClusterVersion.pipe(T.XmlName("ClusterVersion")).annotate({
    identifier: "ClusterVersion",
  }),
);
export interface ClusterVersionsMessage {
  Marker?: string;
  ClusterVersions?: ClusterVersion[];
}
export const ClusterVersionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ClusterVersions: S.optional(ClusterVersionList),
  }).pipe(ns),
).annotate({
  identifier: "ClusterVersionsMessage",
}) as any as S.Schema<ClusterVersionsMessage>;
export interface DescribeCustomDomainAssociationsMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCustomDomainAssociationsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CustomDomainName: S.optional(S.String),
      CustomDomainCertificateArn: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeCustomDomainAssociationsMessage",
}) as any as S.Schema<DescribeCustomDomainAssociationsMessage>;
export interface CertificateAssociation {
  CustomDomainName?: string;
  ClusterIdentifier?: string;
}
export const CertificateAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomDomainName: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateAssociation",
}) as any as S.Schema<CertificateAssociation>;
export type CertificateAssociationList = CertificateAssociation[];
export const CertificateAssociationList = /*@__PURE__*/ S.Array(
  CertificateAssociation.pipe(T.XmlName("CertificateAssociation")).annotate({
    identifier: "CertificateAssociation",
  }),
);
export interface Association {
  CustomDomainCertificateArn?: string;
  CustomDomainCertificateExpiryDate?: Date;
  CertificateAssociations?: CertificateAssociation[];
}
export const Association = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomDomainCertificateArn: S.optional(S.String),
    CustomDomainCertificateExpiryDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CertificateAssociations: S.optional(CertificateAssociationList),
  }),
).annotate({ identifier: "Association" }) as any as S.Schema<Association>;
export type AssociationList = Association[];
export const AssociationList = /*@__PURE__*/ S.Array(
  Association.pipe(T.XmlName("Association")).annotate({
    identifier: "Association",
  }),
);
export interface CustomDomainAssociationsMessage {
  Marker?: string;
  Associations?: Association[];
}
export const CustomDomainAssociationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Associations: S.optional(AssociationList),
  }).pipe(ns),
).annotate({
  identifier: "CustomDomainAssociationsMessage",
}) as any as S.Schema<CustomDomainAssociationsMessage>;
export interface DescribeDataSharesMessage {
  DataShareArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDataSharesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShareArn: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeDataSharesMessage",
}) as any as S.Schema<DescribeDataSharesMessage>;
export type DataShareList = DataShare[];
export const DataShareList = /*@__PURE__*/ S.Array(DataShare);
export interface DescribeDataSharesResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export const DescribeDataSharesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShares: S.optional(DataShareList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDataSharesResult",
}) as any as S.Schema<DescribeDataSharesResult>;
export type DataShareStatusForConsumer = "ACTIVE" | "AVAILABLE" | (string & {});
export const DataShareStatusForConsumer = S.String;

export interface DescribeDataSharesForConsumerMessage {
  ConsumerArn?: string;
  Status?: DataShareStatusForConsumer;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDataSharesForConsumerMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConsumerArn: S.optional(S.String),
      Status: S.optional(DataShareStatusForConsumer),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeDataSharesForConsumerMessage",
}) as any as S.Schema<DescribeDataSharesForConsumerMessage>;
export interface DescribeDataSharesForConsumerResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export const DescribeDataSharesForConsumerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShares: S.optional(DataShareList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDataSharesForConsumerResult",
}) as any as S.Schema<DescribeDataSharesForConsumerResult>;
export type DataShareStatusForProducer =
  | "ACTIVE"
  | "AUTHORIZED"
  | "PENDING_AUTHORIZATION"
  | "DEAUTHORIZED"
  | "REJECTED"
  | (string & {});
export const DataShareStatusForProducer = S.String;

export interface DescribeDataSharesForProducerMessage {
  ProducerArn?: string;
  Status?: DataShareStatusForProducer;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDataSharesForProducerMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProducerArn: S.optional(S.String),
      Status: S.optional(DataShareStatusForProducer),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeDataSharesForProducerMessage",
}) as any as S.Schema<DescribeDataSharesForProducerMessage>;
export interface DescribeDataSharesForProducerResult {
  DataShares?: DataShare[];
  Marker?: string;
}
export const DescribeDataSharesForProducerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataShares: S.optional(DataShareList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDataSharesForProducerResult",
}) as any as S.Schema<DescribeDataSharesForProducerResult>;
export interface DescribeDefaultClusterParametersMessage {
  ParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDefaultClusterParametersMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ParameterGroupFamily: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeDefaultClusterParametersMessage",
}) as any as S.Schema<DescribeDefaultClusterParametersMessage>;
export interface DefaultClusterParameters {
  ParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
}
export const DefaultClusterParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupFamily: S.optional(S.String),
    Marker: S.optional(S.String),
    Parameters: S.optional(ParametersList),
  }),
).annotate({
  identifier: "DefaultClusterParameters",
}) as any as S.Schema<DefaultClusterParameters>;
export interface DescribeDefaultClusterParametersResult {
  DefaultClusterParameters?: DefaultClusterParameters;
}
export const DescribeDefaultClusterParametersResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DefaultClusterParameters: S.optional(DefaultClusterParameters),
    }).pipe(ns),
).annotate({
  identifier: "DescribeDefaultClusterParametersResult",
}) as any as S.Schema<DescribeDefaultClusterParametersResult>;
export interface DescribeEndpointAccessMessage {
  ClusterIdentifier?: string;
  ResourceOwner?: string;
  EndpointName?: string;
  VpcId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEndpointAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ResourceOwner: S.optional(S.String),
    EndpointName: S.optional(S.String),
    VpcId: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeEndpointAccessMessage",
}) as any as S.Schema<DescribeEndpointAccessMessage>;
export type EndpointAccesses = EndpointAccess[];
export const EndpointAccesses = /*@__PURE__*/ S.Array(EndpointAccess);
export interface EndpointAccessList {
  EndpointAccessList?: EndpointAccess[];
  Marker?: string;
}
export const EndpointAccessList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointAccessList: S.optional(EndpointAccesses),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EndpointAccessList",
}) as any as S.Schema<EndpointAccessList>;
export interface DescribeEndpointAuthorizationMessage {
  ClusterIdentifier?: string;
  Account?: string;
  Grantee?: boolean;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEndpointAuthorizationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterIdentifier: S.optional(S.String),
      Account: S.optional(S.String),
      Grantee: S.optional(S.Boolean),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeEndpointAuthorizationMessage",
}) as any as S.Schema<DescribeEndpointAuthorizationMessage>;
export type EndpointAuthorizations = EndpointAuthorization[];
export const EndpointAuthorizations = /*@__PURE__*/ S.Array(
  EndpointAuthorization,
);
export interface EndpointAuthorizationList {
  EndpointAuthorizationList?: EndpointAuthorization[];
  Marker?: string;
}
export const EndpointAuthorizationList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointAuthorizationList: S.optional(EndpointAuthorizations),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EndpointAuthorizationList",
}) as any as S.Schema<EndpointAuthorizationList>;
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
}
export const DescribeEventCategoriesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceType: S.optional(S.String) }).pipe(
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
  identifier: "DescribeEventCategoriesMessage",
}) as any as S.Schema<DescribeEventCategoriesMessage>;
export interface EventInfoMap {
  EventId?: string;
  EventCategories?: string[];
  EventDescription?: string;
  Severity?: string;
}
export const EventInfoMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    EventDescription: S.optional(S.String),
    Severity: S.optional(S.String),
  }),
).annotate({ identifier: "EventInfoMap" }) as any as S.Schema<EventInfoMap>;
export type EventInfoMapList = EventInfoMap[];
export const EventInfoMapList = /*@__PURE__*/ S.Array(
  EventInfoMap.pipe(T.XmlName("EventInfoMap")).annotate({
    identifier: "EventInfoMap",
  }),
);
export interface EventCategoriesMap {
  SourceType?: string;
  Events?: EventInfoMap[];
}
export const EventCategoriesMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    Events: S.optional(EventInfoMapList),
  }),
).annotate({
  identifier: "EventCategoriesMap",
}) as any as S.Schema<EventCategoriesMap>;
export type EventCategoriesMapList = EventCategoriesMap[];
export const EventCategoriesMapList = /*@__PURE__*/ S.Array(
  EventCategoriesMap.pipe(T.XmlName("EventCategoriesMap")).annotate({
    identifier: "EventCategoriesMap",
  }),
);
export interface EventCategoriesMessage {
  EventCategoriesMapList?: EventCategoriesMap[];
}
export const EventCategoriesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventCategoriesMapList: S.optional(EventCategoriesMapList) }).pipe(
    ns,
  ),
).annotate({
  identifier: "EventCategoriesMessage",
}) as any as S.Schema<EventCategoriesMessage>;
export type SourceType =
  | "cluster"
  | "cluster-parameter-group"
  | "cluster-security-group"
  | "cluster-snapshot"
  | "scheduled-action"
  | (string & {});
export const SourceType = S.String;

export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEventsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIdentifier: S.optional(S.String),
    SourceType: S.optional(SourceType),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Duration: S.optional(S.Number),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeEventsMessage",
}) as any as S.Schema<DescribeEventsMessage>;
export interface Event {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  Message?: string;
  EventCategories?: string[];
  Severity?: string;
  Date?: Date;
  EventId?: string;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIdentifier: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Message: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    Severity: S.optional(S.String),
    Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    EventId: S.optional(S.String),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(
  Event.pipe(T.XmlName("Event")).annotate({ identifier: "Event" }),
);
export interface EventsMessage {
  Marker?: string;
  Events?: Event[];
}
export const EventsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Events: S.optional(EventList),
  }).pipe(ns),
).annotate({ identifier: "EventsMessage" }) as any as S.Schema<EventsMessage>;
export interface DescribeEventSubscriptionsMessage {
  SubscriptionName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeEventSubscriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeEventSubscriptionsMessage",
}) as any as S.Schema<DescribeEventSubscriptionsMessage>;
export type EventSubscriptionsList = EventSubscription[];
export const EventSubscriptionsList = /*@__PURE__*/ S.Array(
  EventSubscription.pipe(T.XmlName("EventSubscription")).annotate({
    identifier: "EventSubscription",
  }),
);
export interface EventSubscriptionsMessage {
  Marker?: string;
  EventSubscriptionsList?: EventSubscription[];
}
export const EventSubscriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    EventSubscriptionsList: S.optional(EventSubscriptionsList),
  }).pipe(ns),
).annotate({
  identifier: "EventSubscriptionsMessage",
}) as any as S.Schema<EventSubscriptionsMessage>;
export interface DescribeHsmClientCertificatesMessage {
  HsmClientCertificateIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeHsmClientCertificatesMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      HsmClientCertificateIdentifier: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
      TagKeys: S.optional(TagKeyList),
      TagValues: S.optional(TagValueList),
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
  identifier: "DescribeHsmClientCertificatesMessage",
}) as any as S.Schema<DescribeHsmClientCertificatesMessage>;
export type HsmClientCertificateList = HsmClientCertificate[];
export const HsmClientCertificateList = /*@__PURE__*/ S.Array(
  HsmClientCertificate.pipe(T.XmlName("HsmClientCertificate")).annotate({
    identifier: "HsmClientCertificate",
  }),
);
export interface HsmClientCertificateMessage {
  Marker?: string;
  HsmClientCertificates?: HsmClientCertificate[];
}
export const HsmClientCertificateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    HsmClientCertificates: S.optional(HsmClientCertificateList),
  }).pipe(ns),
).annotate({
  identifier: "HsmClientCertificateMessage",
}) as any as S.Schema<HsmClientCertificateMessage>;
export interface DescribeHsmConfigurationsMessage {
  HsmConfigurationIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeHsmConfigurationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HsmConfigurationIdentifier: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeHsmConfigurationsMessage",
}) as any as S.Schema<DescribeHsmConfigurationsMessage>;
export type HsmConfigurationList = HsmConfiguration[];
export const HsmConfigurationList = /*@__PURE__*/ S.Array(
  HsmConfiguration.pipe(T.XmlName("HsmConfiguration")).annotate({
    identifier: "HsmConfiguration",
  }),
);
export interface HsmConfigurationMessage {
  Marker?: string;
  HsmConfigurations?: HsmConfiguration[];
}
export const HsmConfigurationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    HsmConfigurations: S.optional(HsmConfigurationList),
  }).pipe(ns),
).annotate({
  identifier: "HsmConfigurationMessage",
}) as any as S.Schema<HsmConfigurationMessage>;
export type InboundIntegrationArn = string;
export interface DescribeInboundIntegrationsMessage {
  IntegrationArn?: string;
  TargetArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeInboundIntegrationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationArn: S.optional(S.String),
    TargetArn: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeInboundIntegrationsMessage",
}) as any as S.Schema<DescribeInboundIntegrationsMessage>;
export interface InboundIntegration {
  IntegrationArn?: string;
  SourceArn?: string;
  TargetArn?: string;
  Status?: ZeroETLIntegrationStatus;
  Errors?: IntegrationError[];
  CreateTime?: Date;
}
export const InboundIntegration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationArn: S.optional(S.String),
    SourceArn: S.optional(S.String),
    TargetArn: S.optional(S.String),
    Status: S.optional(ZeroETLIntegrationStatus),
    Errors: S.optional(IntegrationErrorList),
    CreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "InboundIntegration",
}) as any as S.Schema<InboundIntegration>;
export type InboundIntegrationList = InboundIntegration[];
export const InboundIntegrationList = /*@__PURE__*/ S.Array(
  InboundIntegration.pipe(T.XmlName("InboundIntegration")).annotate({
    identifier: "InboundIntegration",
  }),
);
export interface InboundIntegrationsMessage {
  Marker?: string;
  InboundIntegrations?: (InboundIntegration & {
    Errors: (IntegrationError & { ErrorCode: string })[];
  })[];
}
export const InboundIntegrationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    InboundIntegrations: S.optional(InboundIntegrationList),
  }).pipe(ns),
).annotate({
  identifier: "InboundIntegrationsMessage",
}) as any as S.Schema<InboundIntegrationsMessage>;
export type DescribeIntegrationsFilterName =
  | "integration-arn"
  | "source-arn"
  | "source-types"
  | "status"
  | (string & {});
export const DescribeIntegrationsFilterName = S.String;

export type DescribeIntegrationsFilterValueList = string[];
export const DescribeIntegrationsFilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Value")),
);
export interface DescribeIntegrationsFilter {
  Name?: DescribeIntegrationsFilterName;
  Values?: string[];
}
export const DescribeIntegrationsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(DescribeIntegrationsFilterName),
    Values: S.optional(DescribeIntegrationsFilterValueList),
  }),
).annotate({
  identifier: "DescribeIntegrationsFilter",
}) as any as S.Schema<DescribeIntegrationsFilter>;
export type DescribeIntegrationsFilterList = DescribeIntegrationsFilter[];
export const DescribeIntegrationsFilterList = /*@__PURE__*/ S.Array(
  DescribeIntegrationsFilter.pipe(
    T.XmlName("DescribeIntegrationsFilter"),
  ).annotate({ identifier: "DescribeIntegrationsFilter" }),
);
export interface DescribeIntegrationsMessage {
  IntegrationArn?: string;
  MaxRecords?: number;
  Marker?: string;
  Filters?: DescribeIntegrationsFilter[];
}
export const DescribeIntegrationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationArn: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    Filters: S.optional(DescribeIntegrationsFilterList),
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
  identifier: "DescribeIntegrationsMessage",
}) as any as S.Schema<DescribeIntegrationsMessage>;
export type IntegrationList = Integration[];
export const IntegrationList = /*@__PURE__*/ S.Array(
  Integration.pipe(T.XmlName("Integration")).annotate({
    identifier: "Integration",
  }),
);
export interface IntegrationsMessage {
  Marker?: string;
  Integrations?: (Integration & {
    Errors: (IntegrationError & { ErrorCode: string })[];
  })[];
}
export const IntegrationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Integrations: S.optional(IntegrationList),
  }).pipe(ns),
).annotate({
  identifier: "IntegrationsMessage",
}) as any as S.Schema<IntegrationsMessage>;
export interface DescribeLoggingStatusMessage {
  ClusterIdentifier?: string;
}
export const DescribeLoggingStatusMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DescribeLoggingStatusMessage",
}) as any as S.Schema<DescribeLoggingStatusMessage>;
export type S3KeyPrefixValue = string;
export type LogDestinationType =
  | "s3"
  | "cloudwatch"
  | "s3table"
  | (string & {});
export const LogDestinationType = S.String;

export interface LoggingStatus {
  LoggingEnabled?: boolean;
  BucketName?: string;
  S3KeyPrefix?: string;
  LastSuccessfulDeliveryTime?: Date;
  LastFailureTime?: Date;
  LastFailureMessage?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
  S3Tables?: S3TablePublishStatus;
}
export const LoggingStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggingEnabled: S.optional(S.Boolean),
    BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    LastSuccessfulDeliveryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastFailureTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastFailureMessage: S.optional(S.String),
    LogDestinationType: S.optional(LogDestinationType),
    LogExports: S.optional(LogTypeList),
    S3Tables: S.optional(S3TablePublishStatus),
  }).pipe(ns),
).annotate({ identifier: "LoggingStatus" }) as any as S.Schema<LoggingStatus>;
export type ActionType =
  | "restore-cluster"
  | "recommend-node-config"
  | "resize-cluster"
  | (string & {});
export const ActionType = S.String;

export type NodeConfigurationOptionsFilterName =
  | "NodeType"
  | "NumberOfNodes"
  | "EstimatedDiskUtilizationPercent"
  | "Mode"
  | (string & {});
export const NodeConfigurationOptionsFilterName = S.String;

export type OperatorType =
  | "eq"
  | "lt"
  | "gt"
  | "le"
  | "ge"
  | "in"
  | "between"
  | (string & {});
export const OperatorType = S.String;

export interface NodeConfigurationOptionsFilter {
  Name?: NodeConfigurationOptionsFilterName;
  Operator?: OperatorType;
  Values?: string[];
}
export const NodeConfigurationOptionsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(NodeConfigurationOptionsFilterName),
    Operator: S.optional(OperatorType),
    Values: S.optional(ValueStringList).pipe(T.XmlName("Value")),
  }),
).annotate({
  identifier: "NodeConfigurationOptionsFilter",
}) as any as S.Schema<NodeConfigurationOptionsFilter>;
export type NodeConfigurationOptionsFilterList =
  NodeConfigurationOptionsFilter[];
export const NodeConfigurationOptionsFilterList = /*@__PURE__*/ S.Array(
  NodeConfigurationOptionsFilter.pipe(
    T.XmlName("NodeConfigurationOptionsFilter"),
  ).annotate({ identifier: "NodeConfigurationOptionsFilter" }),
);
export interface DescribeNodeConfigurationOptionsMessage {
  ActionType?: ActionType;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  OwnerAccount?: string;
  Filters?: NodeConfigurationOptionsFilter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeNodeConfigurationOptionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ActionType: S.optional(ActionType),
      ClusterIdentifier: S.optional(S.String),
      SnapshotIdentifier: S.optional(S.String),
      SnapshotArn: S.optional(S.String),
      OwnerAccount: S.optional(S.String),
      Filters: S.optional(NodeConfigurationOptionsFilterList).pipe(
        T.XmlName("Filter"),
      ),
      Marker: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
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
  identifier: "DescribeNodeConfigurationOptionsMessage",
}) as any as S.Schema<DescribeNodeConfigurationOptionsMessage>;
export type Mode = "standard" | "high-performance" | (string & {});
export const Mode = S.String;

export interface NodeConfigurationOption {
  NodeType?: string;
  NumberOfNodes?: number;
  EstimatedDiskUtilizationPercent?: number;
  Mode?: Mode;
}
export const NodeConfigurationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeType: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    EstimatedDiskUtilizationPercent: S.optional(S.Number),
    Mode: S.optional(Mode),
  }),
).annotate({
  identifier: "NodeConfigurationOption",
}) as any as S.Schema<NodeConfigurationOption>;
export type NodeConfigurationOptionList = NodeConfigurationOption[];
export const NodeConfigurationOptionList = /*@__PURE__*/ S.Array(
  NodeConfigurationOption.pipe(T.XmlName("NodeConfigurationOption")).annotate({
    identifier: "NodeConfigurationOption",
  }),
);
export interface NodeConfigurationOptionsMessage {
  NodeConfigurationOptionList?: NodeConfigurationOption[];
  Marker?: string;
}
export const NodeConfigurationOptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeConfigurationOptionList: S.optional(NodeConfigurationOptionList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "NodeConfigurationOptionsMessage",
}) as any as S.Schema<NodeConfigurationOptionsMessage>;
export interface DescribeOrderableClusterOptionsMessage {
  ClusterVersion?: string;
  NodeType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeOrderableClusterOptionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterVersion: S.optional(S.String),
      NodeType: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeOrderableClusterOptionsMessage",
}) as any as S.Schema<DescribeOrderableClusterOptionsMessage>;
export type AvailabilityZoneList = AvailabilityZone[];
export const AvailabilityZoneList = /*@__PURE__*/ S.Array(
  AvailabilityZone.pipe(T.XmlName("AvailabilityZone")).annotate({
    identifier: "AvailabilityZone",
  }),
);
export interface OrderableClusterOption {
  ClusterVersion?: string;
  ClusterType?: string;
  NodeType?: string;
  AvailabilityZones?: AvailabilityZone[];
}
export const OrderableClusterOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterVersion: S.optional(S.String),
    ClusterType: S.optional(S.String),
    NodeType: S.optional(S.String),
    AvailabilityZones: S.optional(AvailabilityZoneList),
  }),
).annotate({
  identifier: "OrderableClusterOption",
}) as any as S.Schema<OrderableClusterOption>;
export type OrderableClusterOptionsList = OrderableClusterOption[];
export const OrderableClusterOptionsList = /*@__PURE__*/ S.Array(
  OrderableClusterOption.pipe(T.XmlName("OrderableClusterOption")).annotate({
    identifier: "OrderableClusterOption",
  }),
);
export interface OrderableClusterOptionsMessage {
  OrderableClusterOptions?: OrderableClusterOption[];
  Marker?: string;
}
export const OrderableClusterOptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrderableClusterOptions: S.optional(OrderableClusterOptionsList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "OrderableClusterOptionsMessage",
}) as any as S.Schema<OrderableClusterOptionsMessage>;
export interface DescribePartnersInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
}
export const DescribePartnersInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    PartnerName: S.optional(S.String),
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
  identifier: "DescribePartnersInputMessage",
}) as any as S.Schema<DescribePartnersInputMessage>;
export type PartnerIntegrationStatus =
  | "Active"
  | "Inactive"
  | "RuntimeFailure"
  | "ConnectionFailure"
  | (string & {});
export const PartnerIntegrationStatus = S.String;

export type PartnerIntegrationStatusMessage = string;
export interface PartnerIntegrationInfo {
  DatabaseName?: string;
  PartnerName?: string;
  Status?: PartnerIntegrationStatus;
  StatusMessage?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const PartnerIntegrationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    PartnerName: S.optional(S.String),
    Status: S.optional(PartnerIntegrationStatus),
    StatusMessage: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PartnerIntegrationInfo",
}) as any as S.Schema<PartnerIntegrationInfo>;
export type PartnerIntegrationInfoList = PartnerIntegrationInfo[];
export const PartnerIntegrationInfoList = /*@__PURE__*/ S.Array(
  PartnerIntegrationInfo.pipe(T.XmlName("PartnerIntegrationInfo")).annotate({
    identifier: "PartnerIntegrationInfo",
  }),
);
export interface DescribePartnersOutputMessage {
  PartnerIntegrationInfoList?: PartnerIntegrationInfo[];
}
export const DescribePartnersOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartnerIntegrationInfoList: S.optional(PartnerIntegrationInfoList),
  }).pipe(ns),
).annotate({
  identifier: "DescribePartnersOutputMessage",
}) as any as S.Schema<DescribePartnersOutputMessage>;
export interface DescribeQev2IdcApplicationsMessage {
  Qev2IdcApplicationArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeQev2IdcApplicationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Qev2IdcApplicationArn: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeQev2IdcApplicationsMessage",
}) as any as S.Schema<DescribeQev2IdcApplicationsMessage>;
export type Qev2IdcApplicationList = Qev2IdcApplication[];
export const Qev2IdcApplicationList = /*@__PURE__*/ S.Array(Qev2IdcApplication);
export interface DescribeQev2IdcApplicationsResult {
  Qev2IdcApplications?: Qev2IdcApplication[];
  Marker?: string;
}
export const DescribeQev2IdcApplicationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Qev2IdcApplications: S.optional(Qev2IdcApplicationList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeQev2IdcApplicationsResult",
}) as any as S.Schema<DescribeQev2IdcApplicationsResult>;
export interface DescribeRedshiftIdcApplicationsMessage {
  RedshiftIdcApplicationArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeRedshiftIdcApplicationsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RedshiftIdcApplicationArn: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeRedshiftIdcApplicationsMessage",
}) as any as S.Schema<DescribeRedshiftIdcApplicationsMessage>;
export type RedshiftIdcApplicationList = RedshiftIdcApplication[];
export const RedshiftIdcApplicationList = /*@__PURE__*/ S.Array(
  RedshiftIdcApplication,
);
export interface DescribeRedshiftIdcApplicationsResult {
  RedshiftIdcApplications?: RedshiftIdcApplication[];
  Marker?: string;
}
export const DescribeRedshiftIdcApplicationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RedshiftIdcApplications: S.optional(RedshiftIdcApplicationList),
      Marker: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeRedshiftIdcApplicationsResult",
}) as any as S.Schema<DescribeRedshiftIdcApplicationsResult>;
export interface DescribeReservedNodeExchangeStatusInputMessage {
  ReservedNodeId?: string;
  ReservedNodeExchangeRequestId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReservedNodeExchangeStatusInputMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedNodeId: S.optional(S.String),
      ReservedNodeExchangeRequestId: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
    identifier: "DescribeReservedNodeExchangeStatusInputMessage",
  }) as any as S.Schema<DescribeReservedNodeExchangeStatusInputMessage>;
export type ReservedNodeExchangeStatusList = ReservedNodeExchangeStatus[];
export const ReservedNodeExchangeStatusList = /*@__PURE__*/ S.Array(
  ReservedNodeExchangeStatus.pipe(
    T.XmlName("ReservedNodeExchangeStatus"),
  ).annotate({ identifier: "ReservedNodeExchangeStatus" }),
);
export interface DescribeReservedNodeExchangeStatusOutputMessage {
  ReservedNodeExchangeStatusDetails?: ReservedNodeExchangeStatus[];
  Marker?: string;
}
export const DescribeReservedNodeExchangeStatusOutputMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedNodeExchangeStatusDetails: S.optional(
        ReservedNodeExchangeStatusList,
      ),
      Marker: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeReservedNodeExchangeStatusOutputMessage",
  }) as any as S.Schema<DescribeReservedNodeExchangeStatusOutputMessage>;
export interface DescribeReservedNodeOfferingsMessage {
  ReservedNodeOfferingId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReservedNodeOfferingsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReservedNodeOfferingId: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
  identifier: "DescribeReservedNodeOfferingsMessage",
}) as any as S.Schema<DescribeReservedNodeOfferingsMessage>;
export interface ReservedNodeOffering {
  ReservedNodeOfferingId?: string;
  NodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CurrencyCode?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
  ReservedNodeOfferingType?: ReservedNodeOfferingType;
}
export const ReservedNodeOffering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedNodeOfferingId: S.optional(S.String),
    NodeType: S.optional(S.String),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    OfferingType: S.optional(S.String),
    RecurringCharges: S.optional(RecurringChargeList),
    ReservedNodeOfferingType: S.optional(ReservedNodeOfferingType),
  }),
).annotate({
  identifier: "ReservedNodeOffering",
}) as any as S.Schema<ReservedNodeOffering>;
export type ReservedNodeOfferingList = ReservedNodeOffering[];
export const ReservedNodeOfferingList = /*@__PURE__*/ S.Array(
  ReservedNodeOffering.pipe(T.XmlName("ReservedNodeOffering")).annotate({
    identifier: "ReservedNodeOffering",
  }),
);
export interface ReservedNodeOfferingsMessage {
  Marker?: string;
  ReservedNodeOfferings?: ReservedNodeOffering[];
}
export const ReservedNodeOfferingsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReservedNodeOfferings: S.optional(ReservedNodeOfferingList),
  }).pipe(ns),
).annotate({
  identifier: "ReservedNodeOfferingsMessage",
}) as any as S.Schema<ReservedNodeOfferingsMessage>;
export interface DescribeReservedNodesMessage {
  ReservedNodeId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReservedNodesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedNodeId: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeReservedNodesMessage",
}) as any as S.Schema<DescribeReservedNodesMessage>;
export type ReservedNodeList = ReservedNode[];
export const ReservedNodeList = /*@__PURE__*/ S.Array(
  ReservedNode.pipe(T.XmlName("ReservedNode")).annotate({
    identifier: "ReservedNode",
  }),
);
export interface ReservedNodesMessage {
  Marker?: string;
  ReservedNodes?: ReservedNode[];
}
export const ReservedNodesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReservedNodes: S.optional(ReservedNodeList),
  }).pipe(ns),
).annotate({
  identifier: "ReservedNodesMessage",
}) as any as S.Schema<ReservedNodesMessage>;
export interface DescribeResizeMessage {
  ClusterIdentifier?: string;
}
export const DescribeResizeMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DescribeResizeMessage",
}) as any as S.Schema<DescribeResizeMessage>;
export type ScheduledActionTypeValues =
  | "ResizeCluster"
  | "PauseCluster"
  | "ResumeCluster"
  | (string & {});
export const ScheduledActionTypeValues = S.String;

export type ScheduledActionFilterName =
  | "cluster-identifier"
  | "iam-role"
  | (string & {});
export const ScheduledActionFilterName = S.String;

export interface ScheduledActionFilter {
  Name?: ScheduledActionFilterName;
  Values?: string[];
}
export const ScheduledActionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(ScheduledActionFilterName),
    Values: S.optional(ValueStringList),
  }),
).annotate({
  identifier: "ScheduledActionFilter",
}) as any as S.Schema<ScheduledActionFilter>;
export type ScheduledActionFilterList = ScheduledActionFilter[];
export const ScheduledActionFilterList = /*@__PURE__*/ S.Array(
  ScheduledActionFilter.pipe(T.XmlName("ScheduledActionFilter")).annotate({
    identifier: "ScheduledActionFilter",
  }),
);
export interface DescribeScheduledActionsMessage {
  ScheduledActionName?: string;
  TargetActionType?: ScheduledActionTypeValues;
  StartTime?: Date;
  EndTime?: Date;
  Active?: boolean;
  Filters?: ScheduledActionFilter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeScheduledActionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActionName: S.optional(S.String),
    TargetActionType: S.optional(ScheduledActionTypeValues),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Active: S.optional(S.Boolean),
    Filters: S.optional(ScheduledActionFilterList),
    Marker: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
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
  identifier: "DescribeScheduledActionsMessage",
}) as any as S.Schema<DescribeScheduledActionsMessage>;
export type ScheduledActionList = ScheduledAction[];
export const ScheduledActionList = /*@__PURE__*/ S.Array(
  ScheduledAction.pipe(T.XmlName("ScheduledAction")).annotate({
    identifier: "ScheduledAction",
  }),
);
export interface ScheduledActionsMessage {
  Marker?: string;
  ScheduledActions?: (ScheduledAction & {
    TargetAction: ScheduledActionType & {
      ResizeCluster: ResizeClusterMessage & { ClusterIdentifier: string };
      PauseCluster: PauseClusterMessage & { ClusterIdentifier: string };
      ResumeCluster: ResumeClusterMessage & { ClusterIdentifier: string };
    };
  })[];
}
export const ScheduledActionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ScheduledActions: S.optional(ScheduledActionList),
  }).pipe(ns),
).annotate({
  identifier: "ScheduledActionsMessage",
}) as any as S.Schema<ScheduledActionsMessage>;
export interface DescribeSnapshotCopyGrantsMessage {
  SnapshotCopyGrantName?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeSnapshotCopyGrantsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotCopyGrantName: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeSnapshotCopyGrantsMessage",
}) as any as S.Schema<DescribeSnapshotCopyGrantsMessage>;
export type SnapshotCopyGrantList = SnapshotCopyGrant[];
export const SnapshotCopyGrantList = /*@__PURE__*/ S.Array(
  SnapshotCopyGrant.pipe(T.XmlName("SnapshotCopyGrant")).annotate({
    identifier: "SnapshotCopyGrant",
  }),
);
export interface SnapshotCopyGrantMessage {
  Marker?: string;
  SnapshotCopyGrants?: SnapshotCopyGrant[];
}
export const SnapshotCopyGrantMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    SnapshotCopyGrants: S.optional(SnapshotCopyGrantList),
  }).pipe(ns),
).annotate({
  identifier: "SnapshotCopyGrantMessage",
}) as any as S.Schema<SnapshotCopyGrantMessage>;
export interface DescribeSnapshotSchedulesMessage {
  ClusterIdentifier?: string;
  ScheduleIdentifier?: string;
  TagKeys?: string[];
  TagValues?: string[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribeSnapshotSchedulesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ScheduleIdentifier: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
    Marker: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
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
  identifier: "DescribeSnapshotSchedulesMessage",
}) as any as S.Schema<DescribeSnapshotSchedulesMessage>;
export type SnapshotScheduleList = SnapshotSchedule[];
export const SnapshotScheduleList = /*@__PURE__*/ S.Array(
  SnapshotSchedule.pipe(T.XmlName("SnapshotSchedule")).annotate({
    identifier: "SnapshotSchedule",
  }),
);
export interface DescribeSnapshotSchedulesOutputMessage {
  SnapshotSchedules?: SnapshotSchedule[];
  Marker?: string;
}
export const DescribeSnapshotSchedulesOutputMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SnapshotSchedules: S.optional(SnapshotScheduleList),
      Marker: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeSnapshotSchedulesOutputMessage",
}) as any as S.Schema<DescribeSnapshotSchedulesOutputMessage>;
export interface DescribeStorageRequest {}
export const DescribeStorageRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DescribeStorageRequest",
}) as any as S.Schema<DescribeStorageRequest>;
export interface CustomerStorageMessage {
  TotalBackupSizeInMegaBytes?: number;
  TotalProvisionedStorageInMegaBytes?: number;
}
export const CustomerStorageMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalBackupSizeInMegaBytes: S.optional(S.Number),
    TotalProvisionedStorageInMegaBytes: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "CustomerStorageMessage",
}) as any as S.Schema<CustomerStorageMessage>;
export interface DescribeTableRestoreStatusMessage {
  ClusterIdentifier?: string;
  TableRestoreRequestId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeTableRestoreStatusMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    TableRestoreRequestId: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "DescribeTableRestoreStatusMessage",
}) as any as S.Schema<DescribeTableRestoreStatusMessage>;
export type TableRestoreStatusType =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export const TableRestoreStatusType = S.String;

export interface TableRestoreStatus {
  TableRestoreRequestId?: string;
  Status?: TableRestoreStatusType;
  Message?: string;
  RequestTime?: Date;
  ProgressInMegaBytes?: number;
  TotalDataInMegaBytes?: number;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SourceDatabaseName?: string;
  SourceSchemaName?: string;
  SourceTableName?: string;
  TargetDatabaseName?: string;
  TargetSchemaName?: string;
  NewTableName?: string;
}
export const TableRestoreStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableRestoreRequestId: S.optional(S.String),
    Status: S.optional(TableRestoreStatusType),
    Message: S.optional(S.String),
    RequestTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProgressInMegaBytes: S.optional(S.Number),
    TotalDataInMegaBytes: S.optional(S.Number),
    ClusterIdentifier: S.optional(S.String),
    SnapshotIdentifier: S.optional(S.String),
    SourceDatabaseName: S.optional(S.String),
    SourceSchemaName: S.optional(S.String),
    SourceTableName: S.optional(S.String),
    TargetDatabaseName: S.optional(S.String),
    TargetSchemaName: S.optional(S.String),
    NewTableName: S.optional(S.String),
  }),
).annotate({
  identifier: "TableRestoreStatus",
}) as any as S.Schema<TableRestoreStatus>;
export type TableRestoreStatusList = TableRestoreStatus[];
export const TableRestoreStatusList = /*@__PURE__*/ S.Array(
  TableRestoreStatus.pipe(T.XmlName("TableRestoreStatus")).annotate({
    identifier: "TableRestoreStatus",
  }),
);
export interface TableRestoreStatusMessage {
  TableRestoreStatusDetails?: TableRestoreStatus[];
  Marker?: string;
}
export const TableRestoreStatusMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableRestoreStatusDetails: S.optional(TableRestoreStatusList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "TableRestoreStatusMessage",
}) as any as S.Schema<TableRestoreStatusMessage>;
export interface DescribeTagsMessage {
  ResourceName?: string;
  ResourceType?: string;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeTagsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
    ResourceType: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeTagsMessage",
}) as any as S.Schema<DescribeTagsMessage>;
export interface TaggedResource {
  Tag?: Tag;
  ResourceName?: string;
  ResourceType?: string;
}
export const TaggedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tag: S.optional(Tag),
    ResourceName: S.optional(S.String),
    ResourceType: S.optional(S.String),
  }),
).annotate({ identifier: "TaggedResource" }) as any as S.Schema<TaggedResource>;
export type TaggedResourceList = TaggedResource[];
export const TaggedResourceList = /*@__PURE__*/ S.Array(
  TaggedResource.pipe(T.XmlName("TaggedResource")).annotate({
    identifier: "TaggedResource",
  }),
);
export interface TaggedResourceListMessage {
  TaggedResources?: TaggedResource[];
  Marker?: string;
}
export const TaggedResourceListMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaggedResources: S.optional(TaggedResourceList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "TaggedResourceListMessage",
}) as any as S.Schema<TaggedResourceListMessage>;
export interface DescribeUsageLimitsMessage {
  UsageLimitId?: string;
  ClusterIdentifier?: string;
  FeatureType?: UsageLimitFeatureType;
  MaxRecords?: number;
  Marker?: string;
  TagKeys?: string[];
  TagValues?: string[];
}
export const DescribeUsageLimitsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageLimitId: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    FeatureType: S.optional(UsageLimitFeatureType),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
    TagValues: S.optional(TagValueList),
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
  identifier: "DescribeUsageLimitsMessage",
}) as any as S.Schema<DescribeUsageLimitsMessage>;
export type UsageLimits = UsageLimit[];
export const UsageLimits = /*@__PURE__*/ S.Array(UsageLimit);
export interface UsageLimitList {
  UsageLimits?: UsageLimit[];
  Marker?: string;
}
export const UsageLimitList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageLimits: S.optional(UsageLimits),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "UsageLimitList" }) as any as S.Schema<UsageLimitList>;
export interface DisableLoggingMessage {
  ClusterIdentifier?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
}
export const DisableLoggingMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    LogDestinationType: S.optional(LogDestinationType),
    LogExports: S.optional(LogTypeList),
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
  identifier: "DisableLoggingMessage",
}) as any as S.Schema<DisableLoggingMessage>;
export interface DisableSnapshotCopyMessage {
  ClusterIdentifier?: string;
}
export const DisableSnapshotCopyMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DisableSnapshotCopyMessage",
}) as any as S.Schema<DisableSnapshotCopyMessage>;
export interface DisableSnapshotCopyResult {
  Cluster?: Cluster;
}
export const DisableSnapshotCopyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "DisableSnapshotCopyResult",
}) as any as S.Schema<DisableSnapshotCopyResult>;
export interface DisassociateDataShareConsumerMessage {
  DataShareArn?: string;
  DisassociateEntireAccount?: boolean;
  ConsumerArn?: string;
  ConsumerRegion?: string;
}
export const DisassociateDataShareConsumerMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataShareArn: S.optional(S.String),
      DisassociateEntireAccount: S.optional(S.Boolean),
      ConsumerArn: S.optional(S.String),
      ConsumerRegion: S.optional(S.String),
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
  identifier: "DisassociateDataShareConsumerMessage",
}) as any as S.Schema<DisassociateDataShareConsumerMessage>;
export interface EnableLoggingMessage {
  ClusterIdentifier?: string;
  BucketName?: string;
  S3KeyPrefix?: string;
  LogDestinationType?: LogDestinationType;
  LogExports?: string[];
  S3TableKmsKeyId?: string;
  S3TableGranularity?: string;
}
export const EnableLoggingMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    BucketName: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
    LogDestinationType: S.optional(LogDestinationType),
    LogExports: S.optional(LogTypeList),
    S3TableKmsKeyId: S.optional(S.String),
    S3TableGranularity: S.optional(S.String),
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
  identifier: "EnableLoggingMessage",
}) as any as S.Schema<EnableLoggingMessage>;
export interface EnableSnapshotCopyMessage {
  ClusterIdentifier?: string;
  DestinationRegion?: string;
  RetentionPeriod?: number;
  SnapshotCopyGrantName?: string;
  ManualSnapshotRetentionPeriod?: number;
}
export const EnableSnapshotCopyMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    DestinationRegion: S.optional(S.String),
    RetentionPeriod: S.optional(S.Number),
    SnapshotCopyGrantName: S.optional(S.String),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
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
  identifier: "EnableSnapshotCopyMessage",
}) as any as S.Schema<EnableSnapshotCopyMessage>;
export interface EnableSnapshotCopyResult {
  Cluster?: Cluster;
}
export const EnableSnapshotCopyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "EnableSnapshotCopyResult",
}) as any as S.Schema<EnableSnapshotCopyResult>;
export interface FailoverPrimaryComputeInputMessage {
  ClusterIdentifier?: string;
}
export const FailoverPrimaryComputeInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "FailoverPrimaryComputeInputMessage",
}) as any as S.Schema<FailoverPrimaryComputeInputMessage>;
export interface FailoverPrimaryComputeResult {
  Cluster?: Cluster;
}
export const FailoverPrimaryComputeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "FailoverPrimaryComputeResult",
}) as any as S.Schema<FailoverPrimaryComputeResult>;
export type DbGroupList = string[];
export const DbGroupList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("DbGroup")),
);
export interface GetClusterCredentialsMessage {
  DbUser?: string;
  DbName?: string;
  ClusterIdentifier?: string;
  DurationSeconds?: number;
  AutoCreate?: boolean;
  DbGroups?: string[];
  CustomDomainName?: string;
}
export const GetClusterCredentialsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbUser: S.optional(S.String),
    DbName: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    DurationSeconds: S.optional(S.Number),
    AutoCreate: S.optional(S.Boolean),
    DbGroups: S.optional(DbGroupList),
    CustomDomainName: S.optional(S.String),
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
  identifier: "GetClusterCredentialsMessage",
}) as any as S.Schema<GetClusterCredentialsMessage>;
export interface ClusterCredentials {
  DbUser?: string;
  DbPassword?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export const ClusterCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbUser: S.optional(S.String),
    DbPassword: S.optional(SensitiveString),
    Expiration: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "ClusterCredentials",
}) as any as S.Schema<ClusterCredentials>;
export interface GetClusterCredentialsWithIAMMessage {
  DbName?: string;
  ClusterIdentifier?: string;
  DurationSeconds?: number;
  CustomDomainName?: string;
}
export const GetClusterCredentialsWithIAMMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbName: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    DurationSeconds: S.optional(S.Number),
    CustomDomainName: S.optional(S.String),
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
  identifier: "GetClusterCredentialsWithIAMMessage",
}) as any as S.Schema<GetClusterCredentialsWithIAMMessage>;
export interface ClusterExtendedCredentials {
  DbUser?: string;
  DbPassword?: string | redacted.Redacted<string>;
  Expiration?: Date;
  NextRefreshTime?: Date;
}
export const ClusterExtendedCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbUser: S.optional(S.String),
    DbPassword: S.optional(SensitiveString),
    Expiration: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NextRefreshTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "ClusterExtendedCredentials",
}) as any as S.Schema<ClusterExtendedCredentials>;
export type ClusterIdentifierList = string[];
export const ClusterIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("ClusterIdentifier")),
);
export interface GetIdentityCenterAuthTokenRequest {
  ClusterIds?: string[];
}
export const GetIdentityCenterAuthTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIds: S.optional(ClusterIdentifierList) }).pipe(
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
  identifier: "GetIdentityCenterAuthTokenRequest",
}) as any as S.Schema<GetIdentityCenterAuthTokenRequest>;
export interface GetIdentityCenterAuthTokenResponse {
  Token?: string | redacted.Redacted<string>;
  ExpirationTime?: Date;
}
export const GetIdentityCenterAuthTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Token: S.optional(SensitiveString),
    ExpirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "GetIdentityCenterAuthTokenResponse",
}) as any as S.Schema<GetIdentityCenterAuthTokenResponse>;
export type ReservedNodeExchangeActionType =
  | "restore-cluster"
  | "resize-cluster"
  | (string & {});
export const ReservedNodeExchangeActionType = S.String;

export interface GetReservedNodeExchangeConfigurationOptionsInputMessage {
  ActionType?: ReservedNodeExchangeActionType;
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const GetReservedNodeExchangeConfigurationOptionsInputMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ActionType: S.optional(ReservedNodeExchangeActionType),
      ClusterIdentifier: S.optional(S.String),
      SnapshotIdentifier: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
    identifier: "GetReservedNodeExchangeConfigurationOptionsInputMessage",
  }) as any as S.Schema<GetReservedNodeExchangeConfigurationOptionsInputMessage>;
export interface ReservedNodeConfigurationOption {
  SourceReservedNode?: ReservedNode;
  TargetReservedNodeCount?: number;
  TargetReservedNodeOffering?: ReservedNodeOffering;
}
export const ReservedNodeConfigurationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceReservedNode: S.optional(ReservedNode),
    TargetReservedNodeCount: S.optional(S.Number),
    TargetReservedNodeOffering: S.optional(ReservedNodeOffering),
  }),
).annotate({
  identifier: "ReservedNodeConfigurationOption",
}) as any as S.Schema<ReservedNodeConfigurationOption>;
export type ReservedNodeConfigurationOptionList =
  ReservedNodeConfigurationOption[];
export const ReservedNodeConfigurationOptionList = /*@__PURE__*/ S.Array(
  ReservedNodeConfigurationOption.pipe(
    T.XmlName("ReservedNodeConfigurationOption"),
  ).annotate({ identifier: "ReservedNodeConfigurationOption" }),
);
export interface GetReservedNodeExchangeConfigurationOptionsOutputMessage {
  Marker?: string;
  ReservedNodeConfigurationOptionList?: ReservedNodeConfigurationOption[];
}
export const GetReservedNodeExchangeConfigurationOptionsOutputMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      ReservedNodeConfigurationOptionList: S.optional(
        ReservedNodeConfigurationOptionList,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "GetReservedNodeExchangeConfigurationOptionsOutputMessage",
  }) as any as S.Schema<GetReservedNodeExchangeConfigurationOptionsOutputMessage>;
export interface GetReservedNodeExchangeOfferingsInputMessage {
  ReservedNodeId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const GetReservedNodeExchangeOfferingsInputMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedNodeId: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
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
    identifier: "GetReservedNodeExchangeOfferingsInputMessage",
  }) as any as S.Schema<GetReservedNodeExchangeOfferingsInputMessage>;
export interface GetReservedNodeExchangeOfferingsOutputMessage {
  Marker?: string;
  ReservedNodeOfferings?: ReservedNodeOffering[];
}
export const GetReservedNodeExchangeOfferingsOutputMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Marker: S.optional(S.String),
      ReservedNodeOfferings: S.optional(ReservedNodeOfferingList),
    }).pipe(ns),
  ).annotate({
    identifier: "GetReservedNodeExchangeOfferingsOutputMessage",
  }) as any as S.Schema<GetReservedNodeExchangeOfferingsOutputMessage>;
export interface GetResourcePolicyMessage {
  ResourceArn?: string;
}
export const GetResourcePolicyMessage = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetResourcePolicyMessage",
}) as any as S.Schema<GetResourcePolicyMessage>;
export interface ResourcePolicy {
  ResourceArn?: string;
  Policy?: string;
}
export const ResourcePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Policy: S.optional(S.String) }),
).annotate({ identifier: "ResourcePolicy" }) as any as S.Schema<ResourcePolicy>;
export interface GetResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export const GetResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourcePolicy: S.optional(ResourcePolicy) }).pipe(ns),
).annotate({
  identifier: "GetResourcePolicyResult",
}) as any as S.Schema<GetResourcePolicyResult>;
export interface ListRecommendationsMessage {
  ClusterIdentifier?: string;
  NamespaceArn?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const ListRecommendationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    NamespaceArn: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
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
  identifier: "ListRecommendationsMessage",
}) as any as S.Schema<ListRecommendationsMessage>;
export type ImpactRankingType = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export const ImpactRankingType = S.String;

export type RecommendedActionType = "SQL" | "CLI" | (string & {});
export const RecommendedActionType = S.String;

export interface RecommendedAction {
  Text?: string;
  Database?: string;
  Command?: string;
  Type?: RecommendedActionType;
}
export const RecommendedAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.optional(S.String),
    Database: S.optional(S.String),
    Command: S.optional(S.String),
    Type: S.optional(RecommendedActionType),
  }),
).annotate({
  identifier: "RecommendedAction",
}) as any as S.Schema<RecommendedAction>;
export type RecommendedActionList = RecommendedAction[];
export const RecommendedActionList = /*@__PURE__*/ S.Array(
  RecommendedAction.pipe(T.XmlName("RecommendedAction")).annotate({
    identifier: "RecommendedAction",
  }),
);
export interface ReferenceLink {
  Text?: string;
  Link?: string;
}
export const ReferenceLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.optional(S.String), Link: S.optional(S.String) }),
).annotate({ identifier: "ReferenceLink" }) as any as S.Schema<ReferenceLink>;
export type ReferenceLinkList = ReferenceLink[];
export const ReferenceLinkList = /*@__PURE__*/ S.Array(
  ReferenceLink.pipe(T.XmlName("ReferenceLink")).annotate({
    identifier: "ReferenceLink",
  }),
);
export interface Recommendation {
  Id?: string;
  ClusterIdentifier?: string;
  NamespaceArn?: string;
  CreatedAt?: Date;
  RecommendationType?: string;
  Title?: string;
  Description?: string;
  Observation?: string;
  ImpactRanking?: ImpactRankingType;
  RecommendationText?: string;
  RecommendedActions?: RecommendedAction[];
  ReferenceLinks?: ReferenceLink[];
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    NamespaceArn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RecommendationType: S.optional(S.String),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    Observation: S.optional(S.String),
    ImpactRanking: S.optional(ImpactRankingType),
    RecommendationText: S.optional(S.String),
    RecommendedActions: S.optional(RecommendedActionList),
    ReferenceLinks: S.optional(ReferenceLinkList),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type RecommendationList = Recommendation[];
export const RecommendationList = /*@__PURE__*/ S.Array(
  Recommendation.pipe(T.XmlName("Recommendation")).annotate({
    identifier: "Recommendation",
  }),
);
export interface ListRecommendationsResult {
  Recommendations?: Recommendation[];
  Marker?: string;
}
export const ListRecommendationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Recommendations: S.optional(RecommendationList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRecommendationsResult",
}) as any as S.Schema<ListRecommendationsResult>;
export interface ModifyAquaInputMessage {
  ClusterIdentifier?: string;
  AquaConfigurationStatus?: AquaConfigurationStatus;
}
export const ModifyAquaInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    AquaConfigurationStatus: S.optional(AquaConfigurationStatus),
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
  identifier: "ModifyAquaInputMessage",
}) as any as S.Schema<ModifyAquaInputMessage>;
export interface ModifyAquaOutputMessage {
  AquaConfiguration?: AquaConfiguration;
}
export const ModifyAquaOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AquaConfiguration: S.optional(AquaConfiguration) }).pipe(ns),
).annotate({
  identifier: "ModifyAquaOutputMessage",
}) as any as S.Schema<ModifyAquaOutputMessage>;
export interface ModifyAuthenticationProfileMessage {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export const ModifyAuthenticationProfileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationProfileName: S.optional(S.String),
    AuthenticationProfileContent: S.optional(S.String),
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
  identifier: "ModifyAuthenticationProfileMessage",
}) as any as S.Schema<ModifyAuthenticationProfileMessage>;
export interface ModifyAuthenticationProfileResult {
  AuthenticationProfileName?: string;
  AuthenticationProfileContent?: string;
}
export const ModifyAuthenticationProfileResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationProfileName: S.optional(S.String),
    AuthenticationProfileContent: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ModifyAuthenticationProfileResult",
}) as any as S.Schema<ModifyAuthenticationProfileResult>;
export interface ModifyClusterMessage {
  ClusterIdentifier?: string;
  ClusterType?: string;
  NodeType?: string;
  NumberOfNodes?: number;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  MasterUserPassword?: string | redacted.Redacted<string>;
  ClusterParameterGroupName?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  PreferredMaintenanceWindow?: string;
  ClusterVersion?: string;
  AllowVersionUpgrade?: boolean;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  NewClusterIdentifier?: string;
  PubliclyAccessible?: boolean;
  ElasticIp?: string;
  EnhancedVpcRouting?: boolean;
  MaintenanceTrackName?: string;
  Encrypted?: boolean;
  KmsKeyId?: string;
  AvailabilityZoneRelocation?: boolean;
  AvailabilityZone?: string;
  Port?: number;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  ExtraComputeForAutomaticOptimization?: boolean;
}
export const ModifyClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    ClusterType: S.optional(S.String),
    NodeType: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    ClusterSecurityGroups: S.optional(ClusterSecurityGroupNameList),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    MasterUserPassword: S.optional(SensitiveString),
    ClusterParameterGroupName: S.optional(S.String),
    AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    PreferredMaintenanceWindow: S.optional(S.String),
    ClusterVersion: S.optional(S.String),
    AllowVersionUpgrade: S.optional(S.Boolean),
    HsmClientCertificateIdentifier: S.optional(S.String),
    HsmConfigurationIdentifier: S.optional(S.String),
    NewClusterIdentifier: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    ElasticIp: S.optional(S.String),
    EnhancedVpcRouting: S.optional(S.Boolean),
    MaintenanceTrackName: S.optional(S.String),
    Encrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    AvailabilityZoneRelocation: S.optional(S.Boolean),
    AvailabilityZone: S.optional(S.String),
    Port: S.optional(S.Number),
    ManageMasterPassword: S.optional(S.Boolean),
    MasterPasswordSecretKmsKeyId: S.optional(S.String),
    IpAddressType: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    ExtraComputeForAutomaticOptimization: S.optional(S.Boolean),
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
  identifier: "ModifyClusterMessage",
}) as any as S.Schema<ModifyClusterMessage>;
export interface ModifyClusterResult {
  Cluster?: Cluster;
}
export const ModifyClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ModifyClusterResult",
}) as any as S.Schema<ModifyClusterResult>;
export interface ModifyClusterDbRevisionMessage {
  ClusterIdentifier?: string;
  RevisionTarget?: string;
}
export const ModifyClusterDbRevisionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    RevisionTarget: S.optional(S.String),
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
  identifier: "ModifyClusterDbRevisionMessage",
}) as any as S.Schema<ModifyClusterDbRevisionMessage>;
export interface ModifyClusterDbRevisionResult {
  Cluster?: Cluster;
}
export const ModifyClusterDbRevisionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ModifyClusterDbRevisionResult",
}) as any as S.Schema<ModifyClusterDbRevisionResult>;
export interface ModifyClusterIamRolesMessage {
  ClusterIdentifier?: string;
  AddIamRoles?: string[];
  RemoveIamRoles?: string[];
  DefaultIamRoleArn?: string;
}
export const ModifyClusterIamRolesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    AddIamRoles: S.optional(IamRoleArnList),
    RemoveIamRoles: S.optional(IamRoleArnList),
    DefaultIamRoleArn: S.optional(S.String),
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
  identifier: "ModifyClusterIamRolesMessage",
}) as any as S.Schema<ModifyClusterIamRolesMessage>;
export interface ModifyClusterIamRolesResult {
  Cluster?: Cluster;
}
export const ModifyClusterIamRolesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ModifyClusterIamRolesResult",
}) as any as S.Schema<ModifyClusterIamRolesResult>;
export interface ModifyClusterMaintenanceMessage {
  ClusterIdentifier?: string;
  DeferMaintenance?: boolean;
  DeferMaintenanceIdentifier?: string;
  DeferMaintenanceStartTime?: Date;
  DeferMaintenanceEndTime?: Date;
  DeferMaintenanceDuration?: number;
}
export const ModifyClusterMaintenanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    DeferMaintenance: S.optional(S.Boolean),
    DeferMaintenanceIdentifier: S.optional(S.String),
    DeferMaintenanceStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeferMaintenanceEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeferMaintenanceDuration: S.optional(S.Number),
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
  identifier: "ModifyClusterMaintenanceMessage",
}) as any as S.Schema<ModifyClusterMaintenanceMessage>;
export interface ModifyClusterMaintenanceResult {
  Cluster?: Cluster;
}
export const ModifyClusterMaintenanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ModifyClusterMaintenanceResult",
}) as any as S.Schema<ModifyClusterMaintenanceResult>;
export interface ModifyClusterParameterGroupMessage {
  ParameterGroupName?: string;
  Parameters?: Parameter[];
}
export const ModifyClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    Parameters: S.optional(ParametersList),
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
  identifier: "ModifyClusterParameterGroupMessage",
}) as any as S.Schema<ModifyClusterParameterGroupMessage>;
export interface ClusterParameterGroupNameMessage {
  ParameterGroupName?: string;
  ParameterGroupStatus?: string;
}
export const ClusterParameterGroupNameMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    ParameterGroupStatus: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ClusterParameterGroupNameMessage",
}) as any as S.Schema<ClusterParameterGroupNameMessage>;
export interface ModifyClusterSnapshotMessage {
  SnapshotIdentifier?: string;
  ManualSnapshotRetentionPeriod?: number;
  Force?: boolean;
}
export const ModifyClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    Force: S.optional(S.Boolean),
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
  identifier: "ModifyClusterSnapshotMessage",
}) as any as S.Schema<ModifyClusterSnapshotMessage>;
export interface ModifyClusterSnapshotResult {
  Snapshot?: Snapshot;
}
export const ModifyClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "ModifyClusterSnapshotResult",
}) as any as S.Schema<ModifyClusterSnapshotResult>;
export interface ModifyClusterSnapshotScheduleMessage {
  ClusterIdentifier?: string;
  ScheduleIdentifier?: string;
  DisassociateSchedule?: boolean;
}
export const ModifyClusterSnapshotScheduleMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterIdentifier: S.optional(S.String),
      ScheduleIdentifier: S.optional(S.String),
      DisassociateSchedule: S.optional(S.Boolean),
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
  identifier: "ModifyClusterSnapshotScheduleMessage",
}) as any as S.Schema<ModifyClusterSnapshotScheduleMessage>;
export interface ModifyClusterSnapshotScheduleResponse {}
export const ModifyClusterSnapshotScheduleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyClusterSnapshotScheduleResponse",
}) as any as S.Schema<ModifyClusterSnapshotScheduleResponse>;
export interface ModifyClusterSubnetGroupMessage {
  ClusterSubnetGroupName?: string;
  Description?: string;
  SubnetIds?: string[];
}
export const ModifyClusterSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterSubnetGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdentifierList),
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
  identifier: "ModifyClusterSubnetGroupMessage",
}) as any as S.Schema<ModifyClusterSubnetGroupMessage>;
export interface ModifyClusterSubnetGroupResult {
  ClusterSubnetGroup?: ClusterSubnetGroup;
}
export const ModifyClusterSubnetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterSubnetGroup: S.optional(ClusterSubnetGroup) }).pipe(ns),
).annotate({
  identifier: "ModifyClusterSubnetGroupResult",
}) as any as S.Schema<ModifyClusterSubnetGroupResult>;
export interface ModifyCustomDomainAssociationMessage {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
}
export const ModifyCustomDomainAssociationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CustomDomainName: S.optional(S.String),
      CustomDomainCertificateArn: S.optional(S.String),
      ClusterIdentifier: S.optional(S.String),
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
  identifier: "ModifyCustomDomainAssociationMessage",
}) as any as S.Schema<ModifyCustomDomainAssociationMessage>;
export interface ModifyCustomDomainAssociationResult {
  CustomDomainName?: string;
  CustomDomainCertificateArn?: string;
  ClusterIdentifier?: string;
  CustomDomainCertExpiryTime?: string;
}
export const ModifyCustomDomainAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomDomainName: S.optional(S.String),
    CustomDomainCertificateArn: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    CustomDomainCertExpiryTime: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ModifyCustomDomainAssociationResult",
}) as any as S.Schema<ModifyCustomDomainAssociationResult>;
export interface ModifyEndpointAccessMessage {
  EndpointName?: string;
  VpcSecurityGroupIds?: string[];
}
export const ModifyEndpointAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
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
  identifier: "ModifyEndpointAccessMessage",
}) as any as S.Schema<ModifyEndpointAccessMessage>;
export interface ModifyEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  SourceIds?: string[];
  EventCategories?: string[];
  Severity?: string;
  Enabled?: boolean;
}
export const ModifyEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SourceType: S.optional(S.String),
    SourceIds: S.optional(SourceIdsList),
    EventCategories: S.optional(EventCategoriesList),
    Severity: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
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
  identifier: "ModifyEventSubscriptionMessage",
}) as any as S.Schema<ModifyEventSubscriptionMessage>;
export interface ModifyEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export const ModifyEventSubscriptionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "ModifyEventSubscriptionResult",
}) as any as S.Schema<ModifyEventSubscriptionResult>;
export interface ModifyIntegrationMessage {
  IntegrationArn?: string;
  Description?: string;
  IntegrationName?: string;
}
export const ModifyIntegrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationArn: S.optional(S.String),
    Description: S.optional(S.String),
    IntegrationName: S.optional(S.String),
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
  identifier: "ModifyIntegrationMessage",
}) as any as S.Schema<ModifyIntegrationMessage>;
export type LakehouseRegistration = "Register" | "Deregister" | (string & {});
export const LakehouseRegistration = S.String;

export type LakehouseIdcRegistration =
  | "Associate"
  | "Disassociate"
  | (string & {});
export const LakehouseIdcRegistration = S.String;

export interface ModifyLakehouseConfigurationMessage {
  ClusterIdentifier?: string;
  LakehouseRegistration?: LakehouseRegistration;
  CatalogName?: string;
  LakehouseIdcRegistration?: LakehouseIdcRegistration;
  LakehouseIdcApplicationArn?: string;
  DryRun?: boolean;
}
export const ModifyLakehouseConfigurationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    LakehouseRegistration: S.optional(LakehouseRegistration),
    CatalogName: S.optional(S.String),
    LakehouseIdcRegistration: S.optional(LakehouseIdcRegistration),
    LakehouseIdcApplicationArn: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
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
  identifier: "ModifyLakehouseConfigurationMessage",
}) as any as S.Schema<ModifyLakehouseConfigurationMessage>;
export interface LakehouseConfiguration {
  ClusterIdentifier?: string;
  LakehouseIdcApplicationArn?: string;
  LakehouseRegistrationStatus?: string;
  CatalogArn?: string;
}
export const LakehouseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    LakehouseIdcApplicationArn: S.optional(S.String),
    LakehouseRegistrationStatus: S.optional(S.String),
    CatalogArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "LakehouseConfiguration",
}) as any as S.Schema<LakehouseConfiguration>;
export interface ModifyQev2IdcApplicationMessage {
  Qev2IdcApplicationArn?: string;
  IdcDisplayName?: string;
}
export const ModifyQev2IdcApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Qev2IdcApplicationArn: S.optional(S.String),
    IdcDisplayName: S.optional(S.String),
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
  identifier: "ModifyQev2IdcApplicationMessage",
}) as any as S.Schema<ModifyQev2IdcApplicationMessage>;
export interface ModifyQev2IdcApplicationResult {
  Qev2IdcApplication?: Qev2IdcApplication;
}
export const ModifyQev2IdcApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Qev2IdcApplication: S.optional(Qev2IdcApplication) }).pipe(ns),
).annotate({
  identifier: "ModifyQev2IdcApplicationResult",
}) as any as S.Schema<ModifyQev2IdcApplicationResult>;
export interface ModifyRedshiftIdcApplicationMessage {
  RedshiftIdcApplicationArn?: string;
  IdentityNamespace?: string;
  IamRoleArn?: string;
  IdcDisplayName?: string;
  AuthorizedTokenIssuerList?: AuthorizedTokenIssuer[];
  ServiceIntegrations?: ServiceIntegrationsUnion[];
}
export const ModifyRedshiftIdcApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RedshiftIdcApplicationArn: S.optional(S.String),
    IdentityNamespace: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    IdcDisplayName: S.optional(S.String),
    AuthorizedTokenIssuerList: S.optional(AuthorizedTokenIssuerList),
    ServiceIntegrations: S.optional(ServiceIntegrationList),
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
  identifier: "ModifyRedshiftIdcApplicationMessage",
}) as any as S.Schema<ModifyRedshiftIdcApplicationMessage>;
export interface ModifyRedshiftIdcApplicationResult {
  RedshiftIdcApplication?: RedshiftIdcApplication;
}
export const ModifyRedshiftIdcApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RedshiftIdcApplication: S.optional(RedshiftIdcApplication) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ModifyRedshiftIdcApplicationResult",
}) as any as S.Schema<ModifyRedshiftIdcApplicationResult>;
export interface ModifyScheduledActionMessage {
  ScheduledActionName?: string;
  TargetAction?: ScheduledActionType;
  Schedule?: string;
  IamRole?: string;
  ScheduledActionDescription?: string;
  StartTime?: Date;
  EndTime?: Date;
  Enable?: boolean;
}
export const ModifyScheduledActionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledActionName: S.optional(S.String),
    TargetAction: S.optional(ScheduledActionType),
    Schedule: S.optional(S.String),
    IamRole: S.optional(S.String),
    ScheduledActionDescription: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Enable: S.optional(S.Boolean),
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
  identifier: "ModifyScheduledActionMessage",
}) as any as S.Schema<ModifyScheduledActionMessage>;
export interface ModifySnapshotCopyRetentionPeriodMessage {
  ClusterIdentifier?: string;
  RetentionPeriod?: number;
  Manual?: boolean;
}
export const ModifySnapshotCopyRetentionPeriodMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterIdentifier: S.optional(S.String),
      RetentionPeriod: S.optional(S.Number),
      Manual: S.optional(S.Boolean),
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
  identifier: "ModifySnapshotCopyRetentionPeriodMessage",
}) as any as S.Schema<ModifySnapshotCopyRetentionPeriodMessage>;
export interface ModifySnapshotCopyRetentionPeriodResult {
  Cluster?: Cluster;
}
export const ModifySnapshotCopyRetentionPeriodResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ModifySnapshotCopyRetentionPeriodResult",
}) as any as S.Schema<ModifySnapshotCopyRetentionPeriodResult>;
export interface ModifySnapshotScheduleMessage {
  ScheduleIdentifier?: string;
  ScheduleDefinitions?: string[];
}
export const ModifySnapshotScheduleMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduleIdentifier: S.optional(S.String),
    ScheduleDefinitions: S.optional(ScheduleDefinitionList),
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
  identifier: "ModifySnapshotScheduleMessage",
}) as any as S.Schema<ModifySnapshotScheduleMessage>;
export interface ModifyUsageLimitMessage {
  UsageLimitId?: string;
  Amount?: number;
  BreachAction?: UsageLimitBreachAction;
}
export const ModifyUsageLimitMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageLimitId: S.optional(S.String),
    Amount: S.optional(S.Number),
    BreachAction: S.optional(UsageLimitBreachAction),
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
  identifier: "ModifyUsageLimitMessage",
}) as any as S.Schema<ModifyUsageLimitMessage>;
export interface PauseClusterResult {
  Cluster?: Cluster;
}
export const PauseClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "PauseClusterResult",
}) as any as S.Schema<PauseClusterResult>;
export interface PurchaseReservedNodeOfferingMessage {
  ReservedNodeOfferingId?: string;
  NodeCount?: number;
}
export const PurchaseReservedNodeOfferingMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedNodeOfferingId: S.optional(S.String),
    NodeCount: S.optional(S.Number),
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
  identifier: "PurchaseReservedNodeOfferingMessage",
}) as any as S.Schema<PurchaseReservedNodeOfferingMessage>;
export interface PurchaseReservedNodeOfferingResult {
  ReservedNode?: ReservedNode;
}
export const PurchaseReservedNodeOfferingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReservedNode: S.optional(ReservedNode) }).pipe(ns),
).annotate({
  identifier: "PurchaseReservedNodeOfferingResult",
}) as any as S.Schema<PurchaseReservedNodeOfferingResult>;
export interface PutResourcePolicyMessage {
  ResourceArn?: string;
  Policy?: string;
}
export const PutResourcePolicyMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
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
  identifier: "PutResourcePolicyMessage",
}) as any as S.Schema<PutResourcePolicyMessage>;
export interface PutResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export const PutResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourcePolicy: S.optional(ResourcePolicy) }).pipe(ns),
).annotate({
  identifier: "PutResourcePolicyResult",
}) as any as S.Schema<PutResourcePolicyResult>;
export interface RebootClusterMessage {
  ClusterIdentifier?: string;
}
export const RebootClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "RebootClusterMessage",
}) as any as S.Schema<RebootClusterMessage>;
export interface RebootClusterResult {
  Cluster?: Cluster;
}
export const RebootClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "RebootClusterResult",
}) as any as S.Schema<RebootClusterResult>;
export interface RegisterNamespaceInputMessage {
  NamespaceIdentifier?: NamespaceIdentifierUnion;
  ConsumerIdentifiers?: string[];
}
export const RegisterNamespaceInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamespaceIdentifier: S.optional(NamespaceIdentifierUnion),
    ConsumerIdentifiers: S.optional(ConsumerIdentifierList),
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
  identifier: "RegisterNamespaceInputMessage",
}) as any as S.Schema<RegisterNamespaceInputMessage>;
export interface RegisterNamespaceOutputMessage {
  Status?: NamespaceRegistrationStatus;
}
export const RegisterNamespaceOutputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(NamespaceRegistrationStatus) }).pipe(ns),
).annotate({
  identifier: "RegisterNamespaceOutputMessage",
}) as any as S.Schema<RegisterNamespaceOutputMessage>;
export interface RejectDataShareMessage {
  DataShareArn?: string;
}
export const RejectDataShareMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataShareArn: S.optional(S.String) }).pipe(
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
  identifier: "RejectDataShareMessage",
}) as any as S.Schema<RejectDataShareMessage>;
export interface ResetClusterParameterGroupMessage {
  ParameterGroupName?: string;
  ResetAllParameters?: boolean;
  Parameters?: Parameter[];
}
export const ResetClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterGroupName: S.optional(S.String),
    ResetAllParameters: S.optional(S.Boolean),
    Parameters: S.optional(ParametersList),
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
  identifier: "ResetClusterParameterGroupMessage",
}) as any as S.Schema<ResetClusterParameterGroupMessage>;
export interface ResizeClusterResult {
  Cluster?: Cluster;
}
export const ResizeClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ResizeClusterResult",
}) as any as S.Schema<ResizeClusterResult>;
export interface RestoreFromClusterSnapshotMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  Port?: number;
  AvailabilityZone?: string;
  AllowVersionUpgrade?: boolean;
  ClusterSubnetGroupName?: string;
  PubliclyAccessible?: boolean;
  OwnerAccount?: string;
  HsmClientCertificateIdentifier?: string;
  HsmConfigurationIdentifier?: string;
  ElasticIp?: string;
  ClusterParameterGroupName?: string;
  ClusterSecurityGroups?: string[];
  VpcSecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  AutomatedSnapshotRetentionPeriod?: number;
  ManualSnapshotRetentionPeriod?: number;
  KmsKeyId?: string;
  NodeType?: string;
  EnhancedVpcRouting?: boolean;
  AdditionalInfo?: string;
  IamRoles?: string[];
  MaintenanceTrackName?: string;
  SnapshotScheduleIdentifier?: string;
  NumberOfNodes?: number;
  AvailabilityZoneRelocation?: boolean;
  AquaConfigurationStatus?: AquaConfigurationStatus;
  DefaultIamRoleArn?: string;
  ReservedNodeId?: string;
  TargetReservedNodeOfferingId?: string;
  Encrypted?: boolean;
  ManageMasterPassword?: boolean;
  MasterPasswordSecretKmsKeyId?: string;
  IpAddressType?: string;
  MultiAZ?: boolean;
  CatalogName?: string;
  RedshiftIdcApplicationArn?: string;
}
export const RestoreFromClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    SnapshotIdentifier: S.optional(S.String),
    SnapshotArn: S.optional(S.String),
    SnapshotClusterIdentifier: S.optional(S.String),
    Port: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    AllowVersionUpgrade: S.optional(S.Boolean),
    ClusterSubnetGroupName: S.optional(S.String),
    PubliclyAccessible: S.optional(S.Boolean),
    OwnerAccount: S.optional(S.String),
    HsmClientCertificateIdentifier: S.optional(S.String),
    HsmConfigurationIdentifier: S.optional(S.String),
    ElasticIp: S.optional(S.String),
    ClusterParameterGroupName: S.optional(S.String),
    ClusterSecurityGroups: S.optional(ClusterSecurityGroupNameList),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    PreferredMaintenanceWindow: S.optional(S.String),
    AutomatedSnapshotRetentionPeriod: S.optional(S.Number),
    ManualSnapshotRetentionPeriod: S.optional(S.Number),
    KmsKeyId: S.optional(S.String),
    NodeType: S.optional(S.String),
    EnhancedVpcRouting: S.optional(S.Boolean),
    AdditionalInfo: S.optional(S.String),
    IamRoles: S.optional(IamRoleArnList),
    MaintenanceTrackName: S.optional(S.String),
    SnapshotScheduleIdentifier: S.optional(S.String),
    NumberOfNodes: S.optional(S.Number),
    AvailabilityZoneRelocation: S.optional(S.Boolean),
    AquaConfigurationStatus: S.optional(AquaConfigurationStatus),
    DefaultIamRoleArn: S.optional(S.String),
    ReservedNodeId: S.optional(S.String),
    TargetReservedNodeOfferingId: S.optional(S.String),
    Encrypted: S.optional(S.Boolean),
    ManageMasterPassword: S.optional(S.Boolean),
    MasterPasswordSecretKmsKeyId: S.optional(S.String),
    IpAddressType: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    CatalogName: S.optional(S.String),
    RedshiftIdcApplicationArn: S.optional(S.String),
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
  identifier: "RestoreFromClusterSnapshotMessage",
}) as any as S.Schema<RestoreFromClusterSnapshotMessage>;
export interface RestoreFromClusterSnapshotResult {
  Cluster?: Cluster;
}
export const RestoreFromClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "RestoreFromClusterSnapshotResult",
}) as any as S.Schema<RestoreFromClusterSnapshotResult>;
export interface RestoreTableFromClusterSnapshotMessage {
  ClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  SourceDatabaseName?: string;
  SourceSchemaName?: string;
  SourceTableName?: string;
  TargetDatabaseName?: string;
  TargetSchemaName?: string;
  NewTableName?: string;
  EnableCaseSensitiveIdentifier?: boolean;
}
export const RestoreTableFromClusterSnapshotMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterIdentifier: S.optional(S.String),
      SnapshotIdentifier: S.optional(S.String),
      SourceDatabaseName: S.optional(S.String),
      SourceSchemaName: S.optional(S.String),
      SourceTableName: S.optional(S.String),
      TargetDatabaseName: S.optional(S.String),
      TargetSchemaName: S.optional(S.String),
      NewTableName: S.optional(S.String),
      EnableCaseSensitiveIdentifier: S.optional(S.Boolean),
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
  identifier: "RestoreTableFromClusterSnapshotMessage",
}) as any as S.Schema<RestoreTableFromClusterSnapshotMessage>;
export interface RestoreTableFromClusterSnapshotResult {
  TableRestoreStatus?: TableRestoreStatus;
}
export const RestoreTableFromClusterSnapshotResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ TableRestoreStatus: S.optional(TableRestoreStatus) }).pipe(ns),
).annotate({
  identifier: "RestoreTableFromClusterSnapshotResult",
}) as any as S.Schema<RestoreTableFromClusterSnapshotResult>;
export interface ResumeClusterResult {
  Cluster?: Cluster;
}
export const ResumeClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "ResumeClusterResult",
}) as any as S.Schema<ResumeClusterResult>;
export interface RevokeClusterSecurityGroupIngressMessage {
  ClusterSecurityGroupName?: string;
  CIDRIP?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export const RevokeClusterSecurityGroupIngressMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClusterSecurityGroupName: S.optional(S.String),
      CIDRIP: S.optional(S.String),
      EC2SecurityGroupName: S.optional(S.String),
      EC2SecurityGroupOwnerId: S.optional(S.String),
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
  identifier: "RevokeClusterSecurityGroupIngressMessage",
}) as any as S.Schema<RevokeClusterSecurityGroupIngressMessage>;
export interface RevokeClusterSecurityGroupIngressResult {
  ClusterSecurityGroup?: ClusterSecurityGroup;
}
export const RevokeClusterSecurityGroupIngressResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ClusterSecurityGroup: S.optional(ClusterSecurityGroup) }).pipe(
      ns,
    ),
).annotate({
  identifier: "RevokeClusterSecurityGroupIngressResult",
}) as any as S.Schema<RevokeClusterSecurityGroupIngressResult>;
export interface RevokeEndpointAccessMessage {
  ClusterIdentifier?: string;
  Account?: string;
  VpcIds?: string[];
  Force?: boolean;
}
export const RevokeEndpointAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    Account: S.optional(S.String),
    VpcIds: S.optional(VpcIdentifierList),
    Force: S.optional(S.Boolean),
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
  identifier: "RevokeEndpointAccessMessage",
}) as any as S.Schema<RevokeEndpointAccessMessage>;
export interface RevokeSnapshotAccessMessage {
  SnapshotIdentifier?: string;
  SnapshotArn?: string;
  SnapshotClusterIdentifier?: string;
  AccountWithRestoreAccess?: string;
}
export const RevokeSnapshotAccessMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotIdentifier: S.optional(S.String),
    SnapshotArn: S.optional(S.String),
    SnapshotClusterIdentifier: S.optional(S.String),
    AccountWithRestoreAccess: S.optional(S.String),
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
  identifier: "RevokeSnapshotAccessMessage",
}) as any as S.Schema<RevokeSnapshotAccessMessage>;
export interface RevokeSnapshotAccessResult {
  Snapshot?: Snapshot;
}
export const RevokeSnapshotAccessResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "RevokeSnapshotAccessResult",
}) as any as S.Schema<RevokeSnapshotAccessResult>;
export interface RotateEncryptionKeyMessage {
  ClusterIdentifier?: string;
}
export const RotateEncryptionKeyMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "RotateEncryptionKeyMessage",
}) as any as S.Schema<RotateEncryptionKeyMessage>;
export interface RotateEncryptionKeyResult {
  Cluster?: Cluster;
}
export const RotateEncryptionKeyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cluster: S.optional(Cluster) }).pipe(ns),
).annotate({
  identifier: "RotateEncryptionKeyResult",
}) as any as S.Schema<RotateEncryptionKeyResult>;
export interface UpdatePartnerStatusInputMessage {
  AccountId?: string;
  ClusterIdentifier?: string;
  DatabaseName?: string;
  PartnerName?: string;
  Status?: PartnerIntegrationStatus;
  StatusMessage?: string;
}
export const UpdatePartnerStatusInputMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    PartnerName: S.optional(S.String),
    Status: S.optional(PartnerIntegrationStatus),
    StatusMessage: S.optional(S.String),
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
  identifier: "UpdatePartnerStatusInputMessage",
}) as any as S.Schema<UpdatePartnerStatusInputMessage>;
export type ExceptionMessage = string;
export type AcceptReservedNodeExchangeError =
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Exchanges a DC1 Reserved Node for a DC2 Reserved Node with no changes to the
 * configuration (term, payment type, or number of nodes) and no additional costs.
 */
export const acceptReservedNodeExchange: API.OperationMethod<
  AcceptReservedNodeExchangeInputMessage,
  AcceptReservedNodeExchangeOutputMessage,
  AcceptReservedNodeExchangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptReservedNodeExchangeInputMessage,
  output: AcceptReservedNodeExchangeOutputMessage,
  errors: [
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptReservedNodeExchange",
}));

export type AddPartnerError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Adds a partner integration to a cluster.
 * This operation authorizes a partner to push status updates for the specified database.
 * To complete the integration, you also set up the integration on the partner website.
 */
export const addPartner: API.OperationMethod<
  PartnerIntegrationInputMessage,
  PartnerIntegrationOutputMessage,
  AddPartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PartnerIntegrationInputMessage,
  output: PartnerIntegrationOutputMessage,
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPartner",
}));

export type AssociateDataShareConsumerError =
  | InvalidDataShareFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * From a datashare consumer account, associates a datashare with the
 * account (AssociateEntireAccount) or the specified namespace (ConsumerArn). If you make this association, the consumer
 * can consume the datashare.
 */
export const associateDataShareConsumer: API.OperationMethod<
  AssociateDataShareConsumerMessage,
  DataShare,
  AssociateDataShareConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateDataShareConsumerMessage,
  output: DataShare,
  errors: [InvalidDataShareFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDataShareConsumer",
}));

export type AuthorizeClusterSecurityGroupIngressError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Adds an inbound (ingress) rule to an Amazon Redshift security group. Depending on whether
 * the application accessing your cluster is running on the Internet or an Amazon EC2
 * instance, you can authorize inbound access to either a Classless Interdomain Routing
 * (CIDR)/Internet Protocol (IP) range or to an Amazon EC2 security group. You can add as
 * many as 20 ingress rules to an Amazon Redshift security group.
 *
 * If you authorize access to an Amazon EC2 security group, specify
 * *EC2SecurityGroupName* and
 * *EC2SecurityGroupOwnerId*. The Amazon EC2 security group and
 * Amazon Redshift cluster must be in the same Amazon Web Services Region.
 *
 * If you authorize access to a CIDR/IP address range, specify
 * *CIDRIP*. For an overview of CIDR blocks, see the Wikipedia
 * article on Classless Inter-Domain Routing.
 *
 * You must also associate the security group with a cluster so that clients running
 * on these IP addresses or the EC2 instance are authorized to connect to the cluster. For
 * information about managing security groups, go to Working with Security
 * Groups in the *Amazon Redshift Cluster Management Guide*.
 */
export const authorizeClusterSecurityGroupIngress: API.OperationMethod<
  AuthorizeClusterSecurityGroupIngressMessage,
  AuthorizeClusterSecurityGroupIngressResult,
  AuthorizeClusterSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeClusterSecurityGroupIngressMessage,
  output: AuthorizeClusterSecurityGroupIngressResult,
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeClusterSecurityGroupIngress",
}));

export type AuthorizeDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a data producer account, authorizes the sharing of a datashare with one or more
 * consumer accounts or managing entities. To authorize a datashare for a data consumer,
 * the producer account must have the correct access permissions.
 */
export const authorizeDataShare: API.OperationMethod<
  AuthorizeDataShareMessage,
  DataShare,
  AuthorizeDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeDataShareMessage,
  output: DataShare,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeDataShare",
}));

export type AuthorizeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointAuthorizationAlreadyExistsFault
  | EndpointAuthorizationsPerClusterLimitExceededFault
  | InvalidAuthorizationStateFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Grants access to a cluster.
 */
export const authorizeEndpointAccess: API.OperationMethod<
  AuthorizeEndpointAccessMessage,
  EndpointAuthorization,
  AuthorizeEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeEndpointAccessMessage,
  output: EndpointAuthorization,
  errors: [
    ClusterNotFoundFault,
    EndpointAuthorizationAlreadyExistsFault,
    EndpointAuthorizationsPerClusterLimitExceededFault,
    InvalidAuthorizationStateFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeEndpointAccess",
}));

export type AuthorizeSnapshotAccessError =
  | AuthorizationAlreadyExistsFault
  | AuthorizationQuotaExceededFault
  | ClusterSnapshotNotFoundFault
  | DependentServiceRequestThrottlingFault
  | InvalidClusterSnapshotStateFault
  | LimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Authorizes the specified Amazon Web Services account to restore the specified
 * snapshot.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const authorizeSnapshotAccess: API.OperationMethod<
  AuthorizeSnapshotAccessMessage,
  AuthorizeSnapshotAccessResult,
  AuthorizeSnapshotAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeSnapshotAccessMessage,
  output: AuthorizeSnapshotAccessResult,
  errors: [
    AuthorizationAlreadyExistsFault,
    AuthorizationQuotaExceededFault,
    ClusterSnapshotNotFoundFault,
    DependentServiceRequestThrottlingFault,
    InvalidClusterSnapshotStateFault,
    LimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeSnapshotAccess",
}));

export type BatchDeleteClusterSnapshotsError =
  | BatchDeleteRequestSizeExceededFault
  | CommonErrors;
/**
 * Deletes a set of cluster snapshots.
 */
export const batchDeleteClusterSnapshots: API.OperationMethod<
  BatchDeleteClusterSnapshotsRequest,
  BatchDeleteClusterSnapshotsResult,
  BatchDeleteClusterSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteClusterSnapshotsRequest,
  output: BatchDeleteClusterSnapshotsResult,
  errors: [BatchDeleteRequestSizeExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteClusterSnapshots",
}));

export type BatchModifyClusterSnapshotsError =
  | BatchModifyClusterSnapshotsLimitExceededFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Modifies the settings for a set of cluster snapshots.
 */
export const batchModifyClusterSnapshots: API.OperationMethod<
  BatchModifyClusterSnapshotsMessage,
  BatchModifyClusterSnapshotsOutputMessage,
  BatchModifyClusterSnapshotsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchModifyClusterSnapshotsMessage,
  output: BatchModifyClusterSnapshotsOutputMessage,
  errors: [
    BatchModifyClusterSnapshotsLimitExceededFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchModifyClusterSnapshots",
}));

export type CancelResizeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | ResizeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Cancels a resize operation for a cluster.
 */
export const cancelResize: API.OperationMethod<
  CancelResizeMessage,
  ResizeProgressMessage,
  CancelResizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelResizeMessage,
  output: ResizeProgressMessage,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    ResizeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelResize",
}));

export type CopyClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotNotFoundFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterSnapshotStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Copies the specified automated cluster snapshot to a new manual cluster snapshot.
 * The source must be an automated snapshot and it must be in the available
 * state.
 *
 * When you delete a cluster, Amazon Redshift deletes any automated snapshots of the
 * cluster. Also, when the retention period of the snapshot expires, Amazon Redshift
 * automatically deletes it. If you want to keep an automated snapshot for a longer period,
 * you can make a manual copy of the snapshot. Manual snapshots are retained until you
 * delete them.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const copyClusterSnapshot: API.OperationMethod<
  CopyClusterSnapshotMessage,
  CopyClusterSnapshotResult,
  CopyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyClusterSnapshotMessage,
  output: CopyClusterSnapshotResult,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotNotFoundFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterSnapshotStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyClusterSnapshot",
}));

export type CreateAuthenticationProfileError =
  | AuthenticationProfileAlreadyExistsFault
  | AuthenticationProfileQuotaExceededFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Creates an authentication profile with the specified parameters.
 */
export const createAuthenticationProfile: API.OperationMethod<
  CreateAuthenticationProfileMessage,
  CreateAuthenticationProfileResult,
  CreateAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAuthenticationProfileMessage,
  output: CreateAuthenticationProfileResult,
  errors: [
    AuthenticationProfileAlreadyExistsFault,
    AuthenticationProfileQuotaExceededFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthenticationProfile",
}));

export type CreateClusterError =
  | ClusterAlreadyExistsFault
  | ClusterParameterGroupNotFoundFault
  | ClusterQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceRequestThrottlingFault
  | DependentServiceUnavailableFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidRetentionPeriodFault
  | InvalidSubnet
  | InvalidTagFault
  | InvalidVPCNetworkStateFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | RedshiftIdcApplicationNotExistsFault
  | SnapshotScheduleNotFoundFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new cluster with the specified parameters.
 *
 * To create a cluster in Virtual Private Cloud (VPC), you must provide a cluster
 * subnet group name. The cluster subnet group identifies the subnets of your VPC that
 * Amazon Redshift uses when creating the cluster.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const createCluster: API.OperationMethod<
  CreateClusterMessage,
  CreateClusterResult,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterMessage,
  output: CreateClusterResult,
  errors: [
    ClusterAlreadyExistsFault,
    ClusterParameterGroupNotFoundFault,
    ClusterQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceRequestThrottlingFault,
    DependentServiceUnavailableFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidRetentionPeriodFault,
    InvalidSubnet,
    InvalidTagFault,
    InvalidVPCNetworkStateFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    RedshiftIdcApplicationNotExistsFault,
    SnapshotScheduleNotFoundFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateClusterParameterGroupError =
  | ClusterParameterGroupAlreadyExistsFault
  | ClusterParameterGroupQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift parameter group.
 *
 * Creating parameter groups is independent of creating clusters. You can associate a
 * cluster with a parameter group when you create the cluster. You can also associate an
 * existing cluster with a parameter group after the cluster is created by using ModifyCluster.
 *
 * Parameters in the parameter group define specific behavior that applies to the
 * databases you create on the cluster.
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterParameterGroup: API.OperationMethod<
  CreateClusterParameterGroupMessage,
  CreateClusterParameterGroupResult,
  CreateClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterParameterGroupMessage,
  output: CreateClusterParameterGroupResult,
  errors: [
    ClusterParameterGroupAlreadyExistsFault,
    ClusterParameterGroupQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterParameterGroup",
}));

export type CreateClusterSecurityGroupError =
  | ClusterSecurityGroupAlreadyExistsFault
  | ClusterSecurityGroupQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a new Amazon Redshift security group. You use security groups to control access
 * to non-VPC clusters.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSecurityGroup: API.OperationMethod<
  CreateClusterSecurityGroupMessage,
  CreateClusterSecurityGroupResult,
  CreateClusterSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterSecurityGroupMessage,
  output: CreateClusterSecurityGroupResult,
  errors: [
    ClusterSecurityGroupAlreadyExistsFault,
    ClusterSecurityGroupQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSecurityGroup",
}));

export type CreateClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a manual snapshot of the specified cluster. The cluster must be in the
 * `available` state.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSnapshot: API.OperationMethod<
  CreateClusterSnapshotMessage,
  CreateClusterSnapshotResult,
  CreateClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterSnapshotMessage,
  output: CreateClusterSnapshotResult,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSnapshot",
}));

export type CreateClusterSubnetGroupError =
  | ClusterSubnetGroupAlreadyExistsFault
  | ClusterSubnetGroupQuotaExceededFault
  | ClusterSubnetQuotaExceededFault
  | DependentServiceRequestThrottlingFault
  | InvalidSubnet
  | InvalidTagFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Creates a new Amazon Redshift subnet group. You must provide a list of one or more
 * subnets in your existing Amazon Virtual Private Cloud (Amazon VPC) when creating
 * Amazon Redshift subnet group.
 *
 * For information about subnet groups, go to
 * Amazon Redshift Cluster Subnet Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const createClusterSubnetGroup: API.OperationMethod<
  CreateClusterSubnetGroupMessage,
  CreateClusterSubnetGroupResult,
  CreateClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterSubnetGroupMessage,
  output: CreateClusterSubnetGroupResult,
  errors: [
    ClusterSubnetGroupAlreadyExistsFault,
    ClusterSubnetGroupQuotaExceededFault,
    ClusterSubnetQuotaExceededFault,
    DependentServiceRequestThrottlingFault,
    InvalidSubnet,
    InvalidTagFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClusterSubnetGroup",
}));

export type CreateCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Used to create a custom domain name for a cluster. Properties include the custom domain name, the
 * cluster the custom domain is associated with, and the certificate Amazon Resource Name (ARN).
 */
export const createCustomDomainAssociation: API.OperationMethod<
  CreateCustomDomainAssociationMessage,
  CreateCustomDomainAssociationResult,
  CreateCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomDomainAssociationMessage,
  output: CreateCustomDomainAssociationResult,
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomDomainAssociation",
}));

export type CreateEndpointAccessError =
  | AccessToClusterDeniedFault
  | ClusterNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | EndpointAlreadyExistsFault
  | EndpointsPerAuthorizationLimitExceededFault
  | EndpointsPerClusterLimitExceededFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a Redshift-managed VPC endpoint.
 */
export const createEndpointAccess: API.OperationMethod<
  CreateEndpointAccessMessage,
  EndpointAccess,
  CreateEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEndpointAccessMessage,
  output: EndpointAccess,
  errors: [
    AccessToClusterDeniedFault,
    ClusterNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    EndpointAlreadyExistsFault,
    EndpointsPerAuthorizationLimitExceededFault,
    EndpointsPerClusterLimitExceededFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointAccess",
}));

export type CreateEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | InvalidTagFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionAlreadyExistFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionEventIdNotFoundFault
  | SubscriptionSeverityNotFoundFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift event notification subscription. This action requires an ARN
 * (Amazon Resource Name) of an Amazon SNS topic created by either the Amazon Redshift console,
 * the Amazon SNS console, or the Amazon SNS API. To obtain an ARN with Amazon SNS, you
 * must create a topic in Amazon SNS and subscribe to the topic. The ARN is displayed in
 * the SNS console.
 *
 * You can specify the source type, and lists of Amazon Redshift source IDs, event
 * categories, and event severities. Notifications will be sent for all events you want
 * that match those criteria. For example, you can specify source type = cluster, source ID
 * = my-cluster-1 and mycluster2, event categories = Availability, Backup, and severity =
 * ERROR. The subscription will only send notifications for those ERROR events in the
 * Availability and Backup categories for the specified clusters.
 *
 * If you specify both the source type and source IDs, such as source type = cluster
 * and source identifier = my-cluster-1, notifications will be sent for all the cluster
 * events for my-cluster-1. If you specify a source type but do not specify a source
 * identifier, you will receive notice of the events for the objects of that type in your
 * Amazon Web Services account. If you do not specify either the SourceType nor the SourceIdentifier, you
 * will be notified of events generated from all Amazon Redshift sources belonging to your Amazon Web Services account. You must specify a source type if you specify a source ID.
 */
export const createEventSubscription: API.OperationMethod<
  CreateEventSubscriptionMessage,
  CreateEventSubscriptionResult,
  CreateEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventSubscriptionMessage,
  output: CreateEventSubscriptionResult,
  errors: [
    EventSubscriptionQuotaExceededFault,
    InvalidTagFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionAlreadyExistFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionEventIdNotFoundFault,
    SubscriptionSeverityNotFoundFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
}));

export type CreateHsmClientCertificateError =
  | HsmClientCertificateAlreadyExistsFault
  | HsmClientCertificateQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an HSM client certificate that an Amazon Redshift cluster will use to connect to
 * the client's HSM in order to store and retrieve the keys used to encrypt the cluster
 * databases.
 *
 * The command returns a public key, which you must store in the HSM. In addition to
 * creating the HSM certificate, you must create an Amazon Redshift HSM configuration that
 * provides a cluster the information needed to store and use encryption keys in the HSM.
 * For more information, go to Hardware Security Modules
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createHsmClientCertificate: API.OperationMethod<
  CreateHsmClientCertificateMessage,
  CreateHsmClientCertificateResult,
  CreateHsmClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHsmClientCertificateMessage,
  output: CreateHsmClientCertificateResult,
  errors: [
    HsmClientCertificateAlreadyExistsFault,
    HsmClientCertificateQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsmClientCertificate",
}));

export type CreateHsmConfigurationError =
  | HsmConfigurationAlreadyExistsFault
  | HsmConfigurationQuotaExceededFault
  | InvalidTagFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates an HSM configuration that contains the information required by an Amazon Redshift
 * cluster to store and use database encryption keys in a Hardware Security Module (HSM).
 * After creating the HSM configuration, you can specify it as a parameter when creating a
 * cluster. The cluster will then store its encryption keys in the HSM.
 *
 * In addition to creating an HSM configuration, you must also create an HSM client
 * certificate. For more information, go to Hardware Security Modules
 * in the Amazon Redshift Cluster Management Guide.
 */
export const createHsmConfiguration: API.OperationMethod<
  CreateHsmConfigurationMessage,
  CreateHsmConfigurationResult,
  CreateHsmConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHsmConfigurationMessage,
  output: CreateHsmConfigurationResult,
  errors: [
    HsmConfigurationAlreadyExistsFault,
    HsmConfigurationQuotaExceededFault,
    InvalidTagFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHsmConfiguration",
}));

export type CreateIntegrationError =
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationQuotaExceededFault
  | IntegrationSourceNotFoundFault
  | IntegrationTargetNotFoundFault
  | InvalidClusterStateFault
  | InvalidTagFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationMessage,
  Integration,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationMessage,
  output: Integration,
  errors: [
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationQuotaExceededFault,
    IntegrationSourceNotFoundFault,
    IntegrationTargetNotFoundFault,
    InvalidClusterStateFault,
    InvalidTagFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
}));

export type CreateQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationAlreadyExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const createQev2IdcApplication: API.OperationMethod<
  CreateQev2IdcApplicationMessage,
  CreateQev2IdcApplicationResult,
  CreateQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQev2IdcApplicationMessage,
  output: CreateQev2IdcApplicationResult,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationAlreadyExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQev2IdcApplication",
}));

export type CreateRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | InvalidTagFault
  | RedshiftIdcApplicationAlreadyExistsFault
  | RedshiftIdcApplicationQuotaExceededFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates an Amazon Redshift application for use with IAM Identity Center.
 */
export const createRedshiftIdcApplication: API.OperationMethod<
  CreateRedshiftIdcApplicationMessage,
  CreateRedshiftIdcApplicationResult,
  CreateRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRedshiftIdcApplicationMessage,
  output: CreateRedshiftIdcApplicationResult,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    InvalidTagFault,
    RedshiftIdcApplicationAlreadyExistsFault,
    RedshiftIdcApplicationQuotaExceededFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRedshiftIdcApplication",
}));

export type CreateScheduledActionError =
  | ClusterNotFoundFault
  | InvalidScheduledActionFault
  | InvalidScheduleFault
  | ScheduledActionAlreadyExistsFault
  | ScheduledActionQuotaExceededFault
  | ScheduledActionTypeUnsupportedFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a scheduled action. A scheduled action contains a schedule and an Amazon Redshift API action.
 * For example, you can create a schedule of when to run the `ResizeCluster` API operation.
 */
export const createScheduledAction: API.OperationMethod<
  CreateScheduledActionMessage,
  ScheduledAction,
  CreateScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScheduledActionMessage,
  output: ScheduledAction,
  errors: [
    ClusterNotFoundFault,
    InvalidScheduledActionFault,
    InvalidScheduleFault,
    ScheduledActionAlreadyExistsFault,
    ScheduledActionQuotaExceededFault,
    ScheduledActionTypeUnsupportedFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAction",
}));

export type CreateSnapshotCopyGrantError =
  | DependentServiceRequestThrottlingFault
  | InvalidTagFault
  | LimitExceededFault
  | SnapshotCopyGrantAlreadyExistsFault
  | SnapshotCopyGrantQuotaExceededFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Creates a snapshot copy grant that permits Amazon Redshift to use an encrypted symmetric key
 * from Key Management Service (KMS) to encrypt copied snapshots in a
 * destination region.
 *
 * For more information about managing snapshot copy grants, go to
 * Amazon Redshift Database Encryption
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const createSnapshotCopyGrant: API.OperationMethod<
  CreateSnapshotCopyGrantMessage,
  CreateSnapshotCopyGrantResult,
  CreateSnapshotCopyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotCopyGrantMessage,
  output: CreateSnapshotCopyGrantResult,
  errors: [
    DependentServiceRequestThrottlingFault,
    InvalidTagFault,
    LimitExceededFault,
    SnapshotCopyGrantAlreadyExistsFault,
    SnapshotCopyGrantQuotaExceededFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotCopyGrant",
}));

export type CreateSnapshotScheduleError =
  | InvalidScheduleFault
  | InvalidTagFault
  | ScheduleDefinitionTypeUnsupportedFault
  | SnapshotScheduleAlreadyExistsFault
  | SnapshotScheduleQuotaExceededFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Create a snapshot schedule that can be associated to a cluster and which overrides the default system backup schedule.
 */
export const createSnapshotSchedule: API.OperationMethod<
  CreateSnapshotScheduleMessage,
  SnapshotSchedule,
  CreateSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotScheduleMessage,
  output: SnapshotSchedule,
  errors: [
    InvalidScheduleFault,
    InvalidTagFault,
    ScheduleDefinitionTypeUnsupportedFault,
    SnapshotScheduleAlreadyExistsFault,
    SnapshotScheduleQuotaExceededFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshotSchedule",
}));

export type CreateTagsError =
  | InvalidClusterStateFault
  | InvalidTagFault
  | ResourceNotFoundFault
  | TagLimitExceededFault
  | CommonErrors;
/**
 * Adds tags to a cluster.
 *
 * A resource can have up to 50 tags. If you try to create more than 50 tags for a
 * resource, you will receive an error and the attempt will fail.
 *
 * If you specify a key that already exists for the resource, the value for that key
 * will be updated with the new value.
 */
export const createTags: API.OperationMethod<
  CreateTagsMessage,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagsMessage,
  output: CreateTagsResponse,
  errors: [
    InvalidClusterStateFault,
    InvalidTagFault,
    ResourceNotFoundFault,
    TagLimitExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type CreateUsageLimitError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidUsageLimitFault
  | LimitExceededFault
  | TagLimitExceededFault
  | UnsupportedOperationFault
  | UsageLimitAlreadyExistsFault
  | CommonErrors;
/**
 * Creates a usage limit for a specified Amazon Redshift feature on a cluster.
 * The usage limit is identified by the returned usage limit identifier.
 */
export const createUsageLimit: API.OperationMethod<
  CreateUsageLimitMessage,
  UsageLimit,
  CreateUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUsageLimitMessage,
  output: UsageLimit,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidUsageLimitFault,
    LimitExceededFault,
    TagLimitExceededFault,
    UnsupportedOperationFault,
    UsageLimitAlreadyExistsFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageLimit",
}));

export type DeauthorizeDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a datashare producer account, removes authorization from the specified datashare.
 */
export const deauthorizeDataShare: API.OperationMethod<
  DeauthorizeDataShareMessage,
  DataShare,
  DeauthorizeDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeauthorizeDataShareMessage,
  output: DataShare,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeauthorizeDataShare",
}));

export type DeleteAuthenticationProfileError =
  | AuthenticationProfileNotFoundFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Deletes an authentication profile.
 */
export const deleteAuthenticationProfile: API.OperationMethod<
  DeleteAuthenticationProfileMessage,
  DeleteAuthenticationProfileResult,
  DeleteAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAuthenticationProfileMessage,
  output: DeleteAuthenticationProfileResult,
  errors: [
    AuthenticationProfileNotFoundFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthenticationProfile",
}));

export type DeleteClusterError =
  | ClusterNotFoundFault
  | ClusterSnapshotAlreadyExistsFault
  | ClusterSnapshotQuotaExceededFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Deletes a previously provisioned cluster without its final snapshot being created. A successful response from the web
 * service indicates that the request was received correctly. Use DescribeClusters to monitor the status of the deletion. The delete
 * operation cannot be canceled or reverted once submitted.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you want to shut down the cluster and retain it for future use, set
 * *SkipFinalClusterSnapshot* to `false` and specify a
 * name for *FinalClusterSnapshotIdentifier*. You can later restore this
 * snapshot to resume using the cluster. If a final cluster snapshot is requested, the
 * status of the cluster will be "final-snapshot" while the snapshot is being taken, then
 * it's "deleting" once Amazon Redshift begins deleting the cluster.
 *
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterMessage,
  DeleteClusterResult,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterMessage,
  output: DeleteClusterResult,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotAlreadyExistsFault,
    ClusterSnapshotQuotaExceededFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified Amazon Redshift parameter group.
 *
 * You cannot delete a parameter group if it is associated with a
 * cluster.
 */
export const deleteClusterParameterGroup: API.OperationMethod<
  DeleteClusterParameterGroupMessage,
  DeleteClusterParameterGroupResponse,
  DeleteClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterParameterGroupMessage,
  output: DeleteClusterParameterGroupResponse,
  errors: [
    ClusterParameterGroupNotFoundFault,
    InvalidClusterParameterGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterParameterGroup",
}));

export type DeleteClusterSecurityGroupError =
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift security group.
 *
 * You cannot delete a security group that is associated with any clusters. You
 * cannot delete the default security group.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const deleteClusterSecurityGroup: API.OperationMethod<
  DeleteClusterSecurityGroupMessage,
  DeleteClusterSecurityGroupResponse,
  DeleteClusterSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterSecurityGroupMessage,
  output: DeleteClusterSecurityGroupResponse,
  errors: [
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSecurityGroup",
}));

export type DeleteClusterSnapshotError =
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | CommonErrors;
/**
 * Deletes the specified manual snapshot. The snapshot must be in the
 * `available` state, with no other users authorized to access the snapshot.
 *
 * Unlike automated snapshots, manual snapshots are retained even after you delete
 * your cluster. Amazon Redshift does not delete your manual snapshots. You must delete manual
 * snapshot explicitly to avoid getting charged. If other accounts are authorized to access
 * the snapshot, you must revoke all of the authorizations before you can delete the
 * snapshot.
 */
export const deleteClusterSnapshot: API.OperationMethod<
  DeleteClusterSnapshotMessage,
  DeleteClusterSnapshotResult,
  DeleteClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterSnapshotMessage,
  output: DeleteClusterSnapshotResult,
  errors: [ClusterSnapshotNotFoundFault, InvalidClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSnapshot",
}));

export type DeleteClusterSubnetGroupError =
  | ClusterSubnetGroupNotFoundFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterSubnetStateFault
  | CommonErrors;
/**
 * Deletes the specified cluster subnet group.
 */
export const deleteClusterSubnetGroup: API.OperationMethod<
  DeleteClusterSubnetGroupMessage,
  DeleteClusterSubnetGroupResponse,
  DeleteClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterSubnetGroupMessage,
  output: DeleteClusterSubnetGroupResponse,
  errors: [
    ClusterSubnetGroupNotFoundFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterSubnetStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterSubnetGroup",
}));

export type DeleteCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information about deleting a custom domain association for a cluster.
 */
export const deleteCustomDomainAssociation: API.OperationMethod<
  DeleteCustomDomainAssociationMessage,
  DeleteCustomDomainAssociationResponse,
  DeleteCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomDomainAssociationMessage,
  output: DeleteCustomDomainAssociationResponse,
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    CustomDomainAssociationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomDomainAssociation",
}));

export type DeleteEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | CommonErrors;
/**
 * Deletes a Redshift-managed VPC endpoint.
 */
export const deleteEndpointAccess: API.OperationMethod<
  DeleteEndpointAccessMessage,
  EndpointAccess,
  DeleteEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEndpointAccessMessage,
  output: EndpointAccess,
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointAccess",
}));

export type DeleteEventSubscriptionError =
  | InvalidSubscriptionStateFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResponse,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventSubscriptionMessage,
  output: DeleteEventSubscriptionResponse,
  errors: [InvalidSubscriptionStateFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
}));

export type DeleteHsmClientCertificateError =
  | HsmClientCertificateNotFoundFault
  | InvalidHsmClientCertificateStateFault
  | CommonErrors;
/**
 * Deletes the specified HSM client certificate.
 */
export const deleteHsmClientCertificate: API.OperationMethod<
  DeleteHsmClientCertificateMessage,
  DeleteHsmClientCertificateResponse,
  DeleteHsmClientCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHsmClientCertificateMessage,
  output: DeleteHsmClientCertificateResponse,
  errors: [
    HsmClientCertificateNotFoundFault,
    InvalidHsmClientCertificateStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsmClientCertificate",
}));

export type DeleteHsmConfigurationError =
  | HsmConfigurationNotFoundFault
  | InvalidHsmConfigurationStateFault
  | CommonErrors;
/**
 * Deletes the specified Amazon Redshift HSM configuration.
 */
export const deleteHsmConfiguration: API.OperationMethod<
  DeleteHsmConfigurationMessage,
  DeleteHsmConfigurationResponse,
  DeleteHsmConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHsmConfigurationMessage,
  output: DeleteHsmConfigurationResponse,
  errors: [HsmConfigurationNotFoundFault, InvalidHsmConfigurationStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHsmConfiguration",
}));

export type DeleteIntegrationError =
  | IntegrationConflictOperationFault
  | IntegrationConflictStateFault
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationMessage,
  Integration,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationMessage,
  output: Integration,
  errors: [
    IntegrationConflictOperationFault,
    IntegrationConflictStateFault,
    IntegrationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeletePartnerError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes a partner integration from a cluster. Data can still flow to the cluster until the integration is deleted at the partner's website.
 */
export const deletePartner: API.OperationMethod<
  PartnerIntegrationInputMessage,
  PartnerIntegrationOutputMessage,
  DeletePartnerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PartnerIntegrationInputMessage,
  output: PartnerIntegrationOutputMessage,
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartner",
}));

export type DeleteQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const deleteQev2IdcApplication: API.OperationMethod<
  DeleteQev2IdcApplicationMessage,
  DeleteQev2IdcApplicationResponse,
  DeleteQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQev2IdcApplicationMessage,
  output: DeleteQev2IdcApplicationResponse,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQev2IdcApplication",
}));

export type DeleteRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes an Amazon Redshift IAM Identity Center application.
 */
export const deleteRedshiftIdcApplication: API.OperationMethod<
  DeleteRedshiftIdcApplicationMessage,
  DeleteRedshiftIdcApplicationResponse,
  DeleteRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRedshiftIdcApplicationMessage,
  output: DeleteRedshiftIdcApplicationResponse,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRedshiftIdcApplication",
}));

export type DeleteResourcePolicyError =
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Deletes the resource policy for a specified resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyMessage,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyMessage,
  output: DeleteResourcePolicyResponse,
  errors: [ResourceNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteScheduledActionError =
  | ScheduledActionNotFoundFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Deletes a scheduled action.
 */
export const deleteScheduledAction: API.OperationMethod<
  DeleteScheduledActionMessage,
  DeleteScheduledActionResponse,
  DeleteScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScheduledActionMessage,
  output: DeleteScheduledActionResponse,
  errors: [ScheduledActionNotFoundFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAction",
}));

export type DeleteSnapshotCopyGrantError =
  | InvalidSnapshotCopyGrantStateFault
  | SnapshotCopyGrantNotFoundFault
  | CommonErrors;
/**
 * Deletes the specified snapshot copy grant.
 */
export const deleteSnapshotCopyGrant: API.OperationMethod<
  DeleteSnapshotCopyGrantMessage,
  DeleteSnapshotCopyGrantResponse,
  DeleteSnapshotCopyGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSnapshotCopyGrantMessage,
  output: DeleteSnapshotCopyGrantResponse,
  errors: [InvalidSnapshotCopyGrantStateFault, SnapshotCopyGrantNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotCopyGrant",
}));

export type DeleteSnapshotScheduleError =
  | InvalidClusterSnapshotScheduleStateFault
  | SnapshotScheduleNotFoundFault
  | CommonErrors;
/**
 * Deletes a snapshot schedule.
 */
export const deleteSnapshotSchedule: API.OperationMethod<
  DeleteSnapshotScheduleMessage,
  DeleteSnapshotScheduleResponse,
  DeleteSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSnapshotScheduleMessage,
  output: DeleteSnapshotScheduleResponse,
  errors: [
    InvalidClusterSnapshotScheduleStateFault,
    SnapshotScheduleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshotSchedule",
}));

export type DeleteTagsError =
  | InvalidTagFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Deletes tags from a resource. You must provide the ARN of the resource
 * from which you want to delete the tag or tags.
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsMessage,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsMessage,
  output: DeleteTagsResponse,
  errors: [InvalidTagFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DeleteUsageLimitError =
  | UnsupportedOperationFault
  | UsageLimitNotFoundFault
  | CommonErrors;
/**
 * Deletes a usage limit from a cluster.
 */
export const deleteUsageLimit: API.OperationMethod<
  DeleteUsageLimitMessage,
  DeleteUsageLimitResponse,
  DeleteUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUsageLimitMessage,
  output: DeleteUsageLimitResponse,
  errors: [UnsupportedOperationFault, UsageLimitNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageLimit",
}));

export type DeregisterNamespaceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Deregisters a cluster or serverless namespace from the Amazon Web Services Glue Data Catalog.
 */
export const deregisterNamespace: API.OperationMethod<
  DeregisterNamespaceInputMessage,
  DeregisterNamespaceOutputMessage,
  DeregisterNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterNamespaceInputMessage,
  output: DeregisterNamespaceOutputMessage,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidNamespaceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterNamespace",
}));

export type DescribeAccountAttributesError = CommonErrors;
/**
 * Returns a list of attributes attached to an account
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesMessage,
  AccountAttributeList,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountAttributesMessage,
  output: AccountAttributeList,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
}));

export type DescribeAuthenticationProfilesError =
  | AuthenticationProfileNotFoundFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Describes an authentication profile.
 */
export const describeAuthenticationProfiles: API.OperationMethod<
  DescribeAuthenticationProfilesMessage,
  DescribeAuthenticationProfilesResult,
  DescribeAuthenticationProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAuthenticationProfilesMessage,
  output: DescribeAuthenticationProfilesResult,
  errors: [
    AuthenticationProfileNotFoundFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuthenticationProfiles",
}));

export type DescribeClusterDbRevisionsError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Returns an array of `ClusterDbRevision` objects.
 */
export const describeClusterDbRevisions: API.PaginatedOperationMethod<
  DescribeClusterDbRevisionsMessage,
  ClusterDbRevisionsMessage,
  DescribeClusterDbRevisionsError,
  Credentials | HttpClient.HttpClient,
  ClusterDbRevision
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterDbRevisionsMessage,
  output: ClusterDbRevisionsMessage,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterDbRevisions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterDbRevisions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterParameterGroupsError =
  | ClusterParameterGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns a list of Amazon Redshift parameter groups, including parameter groups you
 * created and the default parameter group. For each parameter group, the response includes
 * the parameter group name, description, and parameter group family name. You can
 * optionally specify a name to retrieve the description of a specific parameter
 * group.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all parameter groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all parameter groups that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, parameter groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeClusterParameterGroupsMessage,
  ClusterParameterGroupsMessage,
  DescribeClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterParameterGroupsMessage,
  output: ClusterParameterGroupsMessage,
  errors: [ClusterParameterGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterParametersError =
  | ClusterParameterGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a detailed list of parameters contained within the specified Amazon Redshift
 * parameter group. For each parameter the response includes information such as parameter
 * name, description, data type, value, whether the parameter value is modifiable, and so
 * on.
 *
 * You can specify *source* filter to retrieve parameters of only
 * specific type. For example, to retrieve parameters that were modified by a user action
 * such as from ModifyClusterParameterGroup, you can specify
 * *source* equal to *user*.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeClusterParameters: API.PaginatedOperationMethod<
  DescribeClusterParametersMessage,
  ClusterParameterGroupDetails,
  DescribeClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterParametersMessage,
  output: ClusterParameterGroupDetails,
  errors: [ClusterParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClustersError =
  | ClusterNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns properties of provisioned clusters including general cluster properties,
 * cluster database properties, maintenance and backup properties, and security and access
 * properties. This operation supports pagination.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all clusters that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all clusters that have any
 * combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, clusters are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeClusters: API.PaginatedOperationMethod<
  DescribeClustersMessage,
  ClustersMessage,
  DescribeClustersError,
  Credentials | HttpClient.HttpClient,
  Cluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClustersMessage,
  output: ClustersMessage,
  errors: [ClusterNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Clusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSecurityGroupsError =
  | ClusterSecurityGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about Amazon Redshift security groups. If the name of a security
 * group is specified, the response will contain only information about only that security
 * group.
 *
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all security groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all security groups that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, security groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterSecurityGroups: API.PaginatedOperationMethod<
  DescribeClusterSecurityGroupsMessage,
  ClusterSecurityGroupMessage,
  DescribeClusterSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterSecurityGroupsMessage,
  output: ClusterSecurityGroupMessage,
  errors: [ClusterSecurityGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSecurityGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterSecurityGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSnapshotsError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InvalidTagFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns one or more snapshot objects, which contain metadata about your cluster
 * snapshots. By default, this operation returns information about all snapshots of all
 * clusters that are owned by your Amazon Web Services account. No information is returned for
 * snapshots owned by inactive Amazon Web Services accounts.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all snapshots that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all snapshots that have any
 * combination of those values are returned. Only snapshots that you own are returned in
 * the response; shared snapshots are not returned with the tag key and tag value request
 * parameters.
 *
 * If both tag keys and values are omitted from the request, snapshots are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeClusterSnapshots: API.PaginatedOperationMethod<
  DescribeClusterSnapshotsMessage,
  SnapshotMessage,
  DescribeClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterSnapshotsMessage,
  output: SnapshotMessage,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InvalidTagFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Snapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterSubnetGroupsError =
  | ClusterSubnetGroupNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns one or more cluster subnet group objects, which contain metadata about your
 * cluster subnet groups. By default, this operation returns information about all cluster
 * subnet groups that are defined in your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all subnet groups that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all subnet groups that have
 * any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, subnet groups are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeClusterSubnetGroups: API.PaginatedOperationMethod<
  DescribeClusterSubnetGroupsMessage,
  ClusterSubnetGroupMessage,
  DescribeClusterSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  ClusterSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterSubnetGroupsMessage,
  output: ClusterSubnetGroupMessage,
  errors: [ClusterSubnetGroupNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterTracksError =
  | InvalidClusterTrackFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Returns a list of all the available maintenance tracks.
 */
export const describeClusterTracks: API.PaginatedOperationMethod<
  DescribeClusterTracksMessage,
  TrackListMessage,
  DescribeClusterTracksError,
  Credentials | HttpClient.HttpClient,
  MaintenanceTrack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterTracksMessage,
  output: TrackListMessage,
  errors: [InvalidClusterTrackFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterTracks",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "MaintenanceTracks",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeClusterVersionsError = CommonErrors;
/**
 * Returns descriptions of the available Amazon Redshift cluster versions. You can call this
 * operation even before creating any clusters to learn more about the Amazon Redshift versions.
 *
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeClusterVersions: API.PaginatedOperationMethod<
  DescribeClusterVersionsMessage,
  ClusterVersionsMessage,
  DescribeClusterVersionsError,
  Credentials | HttpClient.HttpClient,
  ClusterVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeClusterVersionsMessage,
  output: ClusterVersionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeClusterVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ClusterVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCustomDomainAssociationsError =
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information about custom domain associations for a cluster.
 */
export const describeCustomDomainAssociations: API.PaginatedOperationMethod<
  DescribeCustomDomainAssociationsMessage,
  CustomDomainAssociationsMessage,
  DescribeCustomDomainAssociationsError,
  Credentials | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCustomDomainAssociationsMessage,
  output: CustomDomainAssociationsMessage,
  errors: [CustomDomainAssociationNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomDomainAssociations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Associations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesError = InvalidDataShareFault | CommonErrors;
/**
 * Shows the status of any inbound or outbound datashares available in the specified
 * account.
 */
export const describeDataShares: API.PaginatedOperationMethod<
  DescribeDataSharesMessage,
  DescribeDataSharesResult,
  DescribeDataSharesError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataSharesMessage,
  output: DescribeDataSharesResult,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataShares",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesForConsumerError =
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Returns a list of datashares where the account identifier being called is a consumer account identifier.
 */
export const describeDataSharesForConsumer: API.PaginatedOperationMethod<
  DescribeDataSharesForConsumerMessage,
  DescribeDataSharesForConsumerResult,
  DescribeDataSharesForConsumerError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataSharesForConsumerMessage,
  output: DescribeDataSharesForConsumerResult,
  errors: [InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSharesForConsumer",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDataSharesForProducerError =
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Returns a list of datashares when the account identifier being called is a producer account identifier.
 */
export const describeDataSharesForProducer: API.PaginatedOperationMethod<
  DescribeDataSharesForProducerMessage,
  DescribeDataSharesForProducerResult,
  DescribeDataSharesForProducerError,
  Credentials | HttpClient.HttpClient,
  DataShare
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDataSharesForProducerMessage,
  output: DescribeDataSharesForProducerResult,
  errors: [InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataSharesForProducer",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DataShares",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDefaultClusterParametersError = CommonErrors;
/**
 * Returns a list of parameter settings for the specified parameter group
 * family.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeDefaultClusterParameters: API.PaginatedOperationMethod<
  DescribeDefaultClusterParametersMessage,
  DescribeDefaultClusterParametersResult,
  DescribeDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDefaultClusterParametersMessage,
  output: DescribeDefaultClusterParametersResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "DefaultClusterParameters.Marker",
    items: "DefaultClusterParameters.Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Describes a Redshift-managed VPC endpoint.
 */
export const describeEndpointAccess: API.PaginatedOperationMethod<
  DescribeEndpointAccessMessage,
  EndpointAccessList,
  DescribeEndpointAccessError,
  Credentials | HttpClient.HttpClient,
  EndpointAccess
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEndpointAccessMessage,
  output: EndpointAccessList,
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointAccess",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EndpointAccessList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEndpointAuthorizationError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes an endpoint authorization.
 */
export const describeEndpointAuthorization: API.PaginatedOperationMethod<
  DescribeEndpointAuthorizationMessage,
  EndpointAuthorizationList,
  DescribeEndpointAuthorizationError,
  Credentials | HttpClient.HttpClient,
  EndpointAuthorization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEndpointAuthorizationMessage,
  output: EndpointAuthorizationList,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointAuthorization",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EndpointAuthorizationList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Displays a list of event categories for all event source types, or for a specified
 * source type. For a list of the event categories and source types, go to Amazon Redshift Event
 * Notifications.
 */
export const describeEventCategories: API.OperationMethod<
  DescribeEventCategoriesMessage,
  EventCategoriesMessage,
  DescribeEventCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEventCategoriesMessage,
  output: EventCategoriesMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventCategories",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns events related to clusters, security groups, snapshots, and parameter
 * groups for the past 14 days. Events specific to a particular cluster, security group,
 * snapshot or parameter group can be obtained by providing the name as a parameter. By
 * default, the past hour of events are returned.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventsMessage,
  output: EventsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Events",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventSubscriptionsError =
  | InvalidTagFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Lists descriptions of all the Amazon Redshift event notification subscriptions for a
 * customer account. If you specify a subscription name, lists the description for that
 * subscription.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all event notification subscriptions that match any combination of the specified keys
 * and values. For example, if you have `owner` and `environment` for
 * tag keys, and `admin` and `test` for tag values, all subscriptions
 * that have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, subscriptions are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeEventSubscriptions: API.PaginatedOperationMethod<
  DescribeEventSubscriptionsMessage,
  EventSubscriptionsMessage,
  DescribeEventSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  EventSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventSubscriptionsMessage,
  output: EventSubscriptionsMessage,
  errors: [InvalidTagFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventSubscriptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "EventSubscriptionsList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeHsmClientCertificatesError =
  | HsmClientCertificateNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about the specified HSM client certificate. If no certificate
 * ID is specified, returns information about all the HSM certificates owned by your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all HSM client certificates that match any combination of the specified keys and values.
 * For example, if you have `owner` and `environment` for tag keys,
 * and `admin` and `test` for tag values, all HSM client certificates
 * that have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, HSM client certificates
 * are returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeHsmClientCertificates: API.PaginatedOperationMethod<
  DescribeHsmClientCertificatesMessage,
  HsmClientCertificateMessage,
  DescribeHsmClientCertificatesError,
  Credentials | HttpClient.HttpClient,
  HsmClientCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeHsmClientCertificatesMessage,
  output: HsmClientCertificateMessage,
  errors: [HsmClientCertificateNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsmClientCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "HsmClientCertificates",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeHsmConfigurationsError =
  | HsmConfigurationNotFoundFault
  | InvalidTagFault
  | CommonErrors;
/**
 * Returns information about the specified Amazon Redshift HSM configuration. If no
 * configuration ID is specified, returns information about all the HSM configurations
 * owned by your Amazon Web Services account.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all HSM connections that match any combination of the specified keys and values. For
 * example, if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all HSM connections that
 * have any combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, HSM connections are
 * returned regardless of whether they have tag keys or values associated with
 * them.
 */
export const describeHsmConfigurations: API.PaginatedOperationMethod<
  DescribeHsmConfigurationsMessage,
  HsmConfigurationMessage,
  DescribeHsmConfigurationsError,
  Credentials | HttpClient.HttpClient,
  HsmConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeHsmConfigurationsMessage,
  output: HsmConfigurationMessage,
  errors: [HsmConfigurationNotFoundFault, InvalidTagFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHsmConfigurations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "HsmConfigurations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInboundIntegrationsError =
  | IntegrationNotFoundFault
  | InvalidNamespaceFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a list of inbound integrations.
 */
export const describeInboundIntegrations: API.PaginatedOperationMethod<
  DescribeInboundIntegrationsMessage,
  InboundIntegrationsMessage,
  DescribeInboundIntegrationsError,
  Credentials | HttpClient.HttpClient,
  InboundIntegration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInboundIntegrationsMessage,
  output: InboundIntegrationsMessage,
  errors: [
    IntegrationNotFoundFault,
    InvalidNamespaceFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundIntegrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "InboundIntegrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeIntegrationsError =
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes one or more zero-ETL or S3 event integrations with Amazon Redshift.
 */
export const describeIntegrations: API.PaginatedOperationMethod<
  DescribeIntegrationsMessage,
  IntegrationsMessage,
  DescribeIntegrationsError,
  Credentials | HttpClient.HttpClient,
  Integration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeIntegrationsMessage,
  output: IntegrationsMessage,
  errors: [IntegrationNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntegrations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Integrations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeLoggingStatusError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Describes whether information, such as queries and connection attempts, is being
 * logged for the specified Amazon Redshift cluster.
 */
export const describeLoggingStatus: API.OperationMethod<
  DescribeLoggingStatusMessage,
  LoggingStatus,
  DescribeLoggingStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLoggingStatusMessage,
  output: LoggingStatus,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingStatus",
}));

export type DescribeNodeConfigurationOptionsError =
  | AccessToSnapshotDeniedFault
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns properties of possible node configurations such as node type, number of nodes, and
 * disk usage for the specified action type.
 */
export const describeNodeConfigurationOptions: API.PaginatedOperationMethod<
  DescribeNodeConfigurationOptionsMessage,
  NodeConfigurationOptionsMessage,
  DescribeNodeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient,
  NodeConfigurationOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeNodeConfigurationOptionsMessage,
  output: NodeConfigurationOptionsMessage,
  errors: [
    AccessToSnapshotDeniedFault,
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InvalidClusterSnapshotStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNodeConfigurationOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "NodeConfigurationOptionList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableClusterOptionsError = CommonErrors;
/**
 * Returns a list of orderable cluster options. Before you create a new cluster you
 * can use this operation to find what options are available, such as the EC2 Availability
 * Zones (AZ) in the specific Amazon Web Services Region that you can specify, and the node types you can
 * request. The node types differ by available storage, memory, CPU and price. With the
 * cost involved you might want to obtain a list of cluster options in the specific region
 * and specify values when creating a cluster.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeOrderableClusterOptions: API.PaginatedOperationMethod<
  DescribeOrderableClusterOptionsMessage,
  OrderableClusterOptionsMessage,
  DescribeOrderableClusterOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableClusterOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOrderableClusterOptionsMessage,
  output: OrderableClusterOptionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableClusterOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OrderableClusterOptions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePartnersError =
  | ClusterNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns information about the partner integrations defined for a cluster.
 */
export const describePartners: API.OperationMethod<
  DescribePartnersInputMessage,
  DescribePartnersOutputMessage,
  DescribePartnersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePartnersInputMessage,
  output: DescribePartnersOutputMessage,
  errors: [
    ClusterNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePartners",
}));

export type DescribeQev2IdcApplicationsError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Lists the Amazon Redshift Query Editor (QEV2) IAM Identity Center applications. To retrieve additional results, use the MaxRecords and Marker parameters.
 */
export const describeQev2IdcApplications: API.PaginatedOperationMethod<
  DescribeQev2IdcApplicationsMessage,
  DescribeQev2IdcApplicationsResult,
  DescribeQev2IdcApplicationsError,
  Credentials | HttpClient.HttpClient,
  Qev2IdcApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeQev2IdcApplicationsMessage,
  output: DescribeQev2IdcApplicationsResult,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQev2IdcApplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Qev2IdcApplications",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeRedshiftIdcApplicationsError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Lists the Amazon Redshift IAM Identity Center applications.
 */
export const describeRedshiftIdcApplications: API.PaginatedOperationMethod<
  DescribeRedshiftIdcApplicationsMessage,
  DescribeRedshiftIdcApplicationsResult,
  DescribeRedshiftIdcApplicationsError,
  Credentials | HttpClient.HttpClient,
  RedshiftIdcApplication
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRedshiftIdcApplicationsMessage,
  output: DescribeRedshiftIdcApplicationsResult,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRedshiftIdcApplications",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "RedshiftIdcApplications",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodeExchangeStatusError =
  | ReservedNodeExchangeNotFoundFault
  | ReservedNodeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns exchange status details and associated metadata for a reserved-node
 * exchange. Statuses include such values as in progress and requested.
 */
export const describeReservedNodeExchangeStatus: API.PaginatedOperationMethod<
  DescribeReservedNodeExchangeStatusInputMessage,
  DescribeReservedNodeExchangeStatusOutputMessage,
  DescribeReservedNodeExchangeStatusError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeExchangeStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedNodeExchangeStatusInputMessage,
  output: DescribeReservedNodeExchangeStatusOutputMessage,
  errors: [
    ReservedNodeExchangeNotFoundFault,
    ReservedNodeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodeExchangeStatus",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeExchangeStatusDetails",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodeOfferingsError =
  | DependentServiceUnavailableFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a list of the available reserved node offerings by Amazon Redshift with their
 * descriptions including the node type, the fixed and recurring costs of reserving the
 * node and duration the node will be reserved for you. These descriptions help you
 * determine which reserve node offering you want to purchase. You then use the unique
 * offering ID in you call to PurchaseReservedNodeOffering to reserve one
 * or more nodes for your Amazon Redshift cluster.
 *
 * For more information about reserved node offerings, go to
 * Purchasing Reserved Nodes
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeReservedNodeOfferings: API.PaginatedOperationMethod<
  DescribeReservedNodeOfferingsMessage,
  ReservedNodeOfferingsMessage,
  DescribeReservedNodeOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedNodeOfferingsMessage,
  output: ReservedNodeOfferingsMessage,
  errors: [
    DependentServiceUnavailableFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodeOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedNodesError =
  | DependentServiceUnavailableFault
  | ReservedNodeNotFoundFault
  | CommonErrors;
/**
 * Returns the descriptions of the reserved nodes.
 */
export const describeReservedNodes: API.PaginatedOperationMethod<
  DescribeReservedNodesMessage,
  ReservedNodesMessage,
  DescribeReservedNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedNodesMessage,
  output: ReservedNodesMessage,
  errors: [DependentServiceUnavailableFault, ReservedNodeNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedNodes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodes",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeResizeError =
  | ClusterNotFoundFault
  | ResizeNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns information about the last resize operation for the specified cluster. If
 * no resize operation has ever been initiated for the specified cluster, a HTTP
 * 404 error is returned. If a resize operation was initiated and completed, the
 * status of the resize remains as `SUCCEEDED` until the next resize.
 *
 * A resize operation can be requested using ModifyCluster and
 * specifying a different number or type of nodes for the cluster.
 */
export const describeResize: API.OperationMethod<
  DescribeResizeMessage,
  ResizeProgressMessage,
  DescribeResizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResizeMessage,
  output: ResizeProgressMessage,
  errors: [
    ClusterNotFoundFault,
    ResizeNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResize",
}));

export type DescribeScheduledActionsError =
  | ScheduledActionNotFoundFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Describes properties of scheduled actions.
 */
export const describeScheduledActions: API.PaginatedOperationMethod<
  DescribeScheduledActionsMessage,
  ScheduledActionsMessage,
  DescribeScheduledActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScheduledActionsMessage,
  output: ScheduledActionsMessage,
  errors: [ScheduledActionNotFoundFault, UnauthorizedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ScheduledActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotCopyGrantsError =
  | InvalidTagFault
  | SnapshotCopyGrantNotFoundFault
  | CommonErrors;
/**
 * Returns a list of snapshot copy grants owned by the Amazon Web Services account in the destination
 * region.
 *
 * For more information about managing snapshot copy grants, go to
 * Amazon Redshift Database Encryption
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const describeSnapshotCopyGrants: API.PaginatedOperationMethod<
  DescribeSnapshotCopyGrantsMessage,
  SnapshotCopyGrantMessage,
  DescribeSnapshotCopyGrantsError,
  Credentials | HttpClient.HttpClient,
  SnapshotCopyGrant
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSnapshotCopyGrantsMessage,
  output: SnapshotCopyGrantMessage,
  errors: [InvalidTagFault, SnapshotCopyGrantNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotCopyGrants",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SnapshotCopyGrants",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotSchedulesError = CommonErrors;
/**
 * Returns a list of snapshot schedules.
 */
export const describeSnapshotSchedules: API.PaginatedOperationMethod<
  DescribeSnapshotSchedulesMessage,
  DescribeSnapshotSchedulesOutputMessage,
  DescribeSnapshotSchedulesError,
  Credentials | HttpClient.HttpClient,
  SnapshotSchedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSnapshotSchedulesMessage,
  output: DescribeSnapshotSchedulesOutputMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshotSchedules",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "SnapshotSchedules",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeStorageError = CommonErrors;
/**
 * Returns account level backups storage size and provisional storage.
 */
export const describeStorage: API.OperationMethod<
  DescribeStorageRequest,
  CustomerStorageMessage,
  DescribeStorageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStorageRequest,
  output: CustomerStorageMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStorage",
}));

export type DescribeTableRestoreStatusError =
  | ClusterNotFoundFault
  | TableRestoreNotFoundFault
  | CommonErrors;
/**
 * Lists the status of one or more table restore requests made using the RestoreTableFromClusterSnapshot API action. If you don't specify a value
 * for the `TableRestoreRequestId` parameter, then
 * `DescribeTableRestoreStatus` returns the status of all table restore
 * requests ordered by the date and time of the request in ascending order. Otherwise
 * `DescribeTableRestoreStatus` returns the status of the table specified by
 * `TableRestoreRequestId`.
 */
export const describeTableRestoreStatus: API.PaginatedOperationMethod<
  DescribeTableRestoreStatusMessage,
  TableRestoreStatusMessage,
  DescribeTableRestoreStatusError,
  Credentials | HttpClient.HttpClient,
  TableRestoreStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTableRestoreStatusMessage,
  output: TableRestoreStatusMessage,
  errors: [ClusterNotFoundFault, TableRestoreNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTableRestoreStatus",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TableRestoreStatusDetails",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeTagsError =
  | InvalidTagFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a list of tags. You can return tags from a specific resource by specifying
 * an ARN, or you can return all tags for a given type of resource, such as clusters,
 * snapshots, and so on.
 *
 * The following are limitations for `DescribeTags`:
 *
 * - You cannot specify an ARN and a resource-type value together in the same
 * request.
 *
 * - You cannot use the `MaxRecords` and `Marker`
 * parameters together with the ARN parameter.
 *
 * - The `MaxRecords` parameter can be a range from 10 to 50 results
 * to return in a request.
 *
 * If you specify both tag keys and tag values in the same request, Amazon Redshift returns
 * all resources that match any combination of the specified keys and values. For example,
 * if you have `owner` and `environment` for tag keys, and
 * `admin` and `test` for tag values, all resources that have any
 * combination of those values are returned.
 *
 * If both tag keys and values are omitted from the request, resources are returned
 * regardless of whether they have tag keys or values associated with them.
 */
export const describeTags: API.PaginatedOperationMethod<
  DescribeTagsMessage,
  TaggedResourceListMessage,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTagsMessage,
  output: TaggedResourceListMessage,
  errors: [InvalidTagFault, ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "TaggedResources",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeUsageLimitsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Shows usage limits on a cluster.
 * Results are filtered based on the combination of input usage limit identifier, cluster identifier, and feature type parameters:
 *
 * - If usage limit identifier, cluster identifier, and feature type are not provided,
 * then all usage limit objects for the current account in the current region are returned.
 *
 * - If usage limit identifier is provided,
 * then the corresponding usage limit object is returned.
 *
 * - If cluster identifier is provided,
 * then all usage limit objects for the specified cluster are returned.
 *
 * - If cluster identifier and feature type are provided,
 * then all usage limit objects for the combination of cluster and feature are returned.
 */
export const describeUsageLimits: API.PaginatedOperationMethod<
  DescribeUsageLimitsMessage,
  UsageLimitList,
  DescribeUsageLimitsError,
  Credentials | HttpClient.HttpClient,
  UsageLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeUsageLimitsMessage,
  output: UsageLimitList,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsageLimits",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UsageLimits",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DisableLoggingError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Stops logging information, such as queries and connection attempts, for the
 * specified Amazon Redshift cluster.
 */
export const disableLogging: API.OperationMethod<
  DisableLoggingMessage,
  LoggingStatus,
  DisableLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableLoggingMessage,
  output: LoggingStatus,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableLogging",
}));

export type DisableSnapshotCopyError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | SnapshotCopyAlreadyDisabledFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Disables the automatic copying of snapshots from one region to another region for a
 * specified cluster.
 *
 * If your cluster and its snapshots are encrypted using an encrypted symmetric key
 * from Key Management Service, use DeleteSnapshotCopyGrant to delete the grant that
 * grants Amazon Redshift permission to the key in the destination region.
 */
export const disableSnapshotCopy: API.OperationMethod<
  DisableSnapshotCopyMessage,
  DisableSnapshotCopyResult,
  DisableSnapshotCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableSnapshotCopyMessage,
  output: DisableSnapshotCopyResult,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    SnapshotCopyAlreadyDisabledFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableSnapshotCopy",
}));

export type DisassociateDataShareConsumerError =
  | InvalidDataShareFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * From a datashare consumer account, remove association for the specified datashare.
 */
export const disassociateDataShareConsumer: API.OperationMethod<
  DisassociateDataShareConsumerMessage,
  DataShare,
  DisassociateDataShareConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateDataShareConsumerMessage,
  output: DataShare,
  errors: [InvalidDataShareFault, InvalidNamespaceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDataShareConsumer",
}));

export type EnableLoggingError =
  | BucketNotFoundFault
  | ClusterNotFoundFault
  | InsufficientS3BucketPolicyFault
  | InvalidClusterStateFault
  | InvalidS3BucketNameFault
  | InvalidS3KeyPrefixFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Starts logging information, such as queries and connection attempts, for the
 * specified Amazon Redshift cluster.
 */
export const enableLogging: API.OperationMethod<
  EnableLoggingMessage,
  LoggingStatus,
  EnableLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableLoggingMessage,
  output: LoggingStatus,
  errors: [
    BucketNotFoundFault,
    ClusterNotFoundFault,
    InsufficientS3BucketPolicyFault,
    InvalidClusterStateFault,
    InvalidS3BucketNameFault,
    InvalidS3KeyPrefixFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableLogging",
}));

export type EnableSnapshotCopyError =
  | ClusterNotFoundFault
  | CopyToRegionDisabledFault
  | DependentServiceRequestThrottlingFault
  | IncompatibleOrderableOptions
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | LimitExceededFault
  | SnapshotCopyAlreadyEnabledFault
  | SnapshotCopyGrantNotFoundFault
  | UnauthorizedOperation
  | UnknownSnapshotCopyRegionFault
  | CommonErrors;
/**
 * Enables the automatic copy of snapshots from one region to another region for a
 * specified cluster.
 */
export const enableSnapshotCopy: API.OperationMethod<
  EnableSnapshotCopyMessage,
  EnableSnapshotCopyResult,
  EnableSnapshotCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableSnapshotCopyMessage,
  output: EnableSnapshotCopyResult,
  errors: [
    ClusterNotFoundFault,
    CopyToRegionDisabledFault,
    DependentServiceRequestThrottlingFault,
    IncompatibleOrderableOptions,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    LimitExceededFault,
    SnapshotCopyAlreadyEnabledFault,
    SnapshotCopyGrantNotFoundFault,
    UnauthorizedOperation,
    UnknownSnapshotCopyRegionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSnapshotCopy",
}));

export type FailoverPrimaryComputeError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Fails over the primary compute unit of the specified Multi-AZ cluster to another Availability Zone.
 */
export const failoverPrimaryCompute: API.OperationMethod<
  FailoverPrimaryComputeInputMessage,
  FailoverPrimaryComputeResult,
  FailoverPrimaryComputeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FailoverPrimaryComputeInputMessage,
  output: FailoverPrimaryComputeResult,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverPrimaryCompute",
}));

export type GetClusterCredentialsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to
 * log on to an Amazon Redshift database. The action returns the database user name
 * prefixed with `IAM:` if `AutoCreate` is `False` or
 * `IAMA:` if `AutoCreate` is `True`. You can
 * optionally specify one or more database user groups that the user will join at log on.
 * By default, the temporary credentials expire in 900 seconds. You can optionally specify
 * a duration between 900 seconds (15 minutes) and 3600 seconds (60 minutes). For more
 * information, see Using IAM Authentication
 * to Generate Database User Credentials in the Amazon Redshift Cluster Management Guide.
 *
 * The Identity and Access Management (IAM) user or role that runs
 * GetClusterCredentials must have an IAM policy attached that allows access to all
 * necessary actions and resources. For more information about permissions, see Resource Policies for GetClusterCredentials in the
 * Amazon Redshift Cluster Management Guide.
 *
 * If the `DbGroups` parameter is specified, the IAM policy must allow the
 * `redshift:JoinGroup` action with access to the listed
 * `dbgroups`.
 *
 * In addition, if the `AutoCreate` parameter is set to `True`,
 * then the policy must include the `redshift:CreateClusterUser`
 * permission.
 *
 * If the `DbName` parameter is specified, the IAM policy must allow access
 * to the resource `dbname` for the specified database name.
 */
export const getClusterCredentials: API.OperationMethod<
  GetClusterCredentialsMessage,
  ClusterCredentials,
  GetClusterCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterCredentialsMessage,
  output: ClusterCredentials,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterCredentials",
}));

export type GetClusterCredentialsWithIAMError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns a database user name and temporary password with temporary authorization to
 * log in to an Amazon Redshift database.
 * The database user is mapped 1:1 to the source Identity and Access Management (IAM) identity.
 * For more information about IAM identities, see IAM Identities (users, user groups, and roles) in the
 * Amazon Web Services Identity and Access Management User Guide.
 *
 * The Identity and Access Management (IAM) identity that runs
 * this operation must have an IAM policy attached that allows access to all
 * necessary actions and resources.
 * For more information about permissions, see Using identity-based policies (IAM policies) in the
 * Amazon Redshift Cluster Management Guide.
 */
export const getClusterCredentialsWithIAM: API.OperationMethod<
  GetClusterCredentialsWithIAMMessage,
  ClusterExtendedCredentials,
  GetClusterCredentialsWithIAMError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterCredentialsWithIAMMessage,
  output: ClusterExtendedCredentials,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterCredentialsWithIAM",
}));

export type GetIdentityCenterAuthTokenError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | RedshiftInvalidParameterFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Generates an encrypted authentication token that propagates the caller's
 * Amazon Web Services IAM Identity Center identity to Amazon Redshift clusters. This API extracts the
 * Amazon Web Services IAM Identity Center identity from enhanced credentials and creates a secure token
 * that Amazon Redshift drivers can use for authentication.
 *
 * The token is encrypted using Key Management Service (KMS) and can only be
 * decrypted by the specified Amazon Redshift clusters. The token contains the caller's
 * Amazon Web Services IAM Identity Center identity information and is valid for a limited time period.
 *
 * This API is exclusively for use with Amazon Web Services IAM Identity Center enhanced credentials. If the
 * caller is not using enhanced credentials with embedded Amazon Web Services IAM Identity Center identity, the API will
 * return an error.
 */
export const getIdentityCenterAuthToken: API.OperationMethod<
  GetIdentityCenterAuthTokenRequest,
  GetIdentityCenterAuthTokenResponse,
  GetIdentityCenterAuthTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityCenterAuthTokenRequest,
  output: GetIdentityCenterAuthTokenResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    RedshiftInvalidParameterFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityCenterAuthToken",
}));

export type GetReservedNodeExchangeConfigurationOptionsError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Gets the configuration options for the reserved-node exchange. These options
 * include information about the source reserved node and target reserved node offering.
 * Details include the node type, the price, the node count, and the offering type.
 */
export const getReservedNodeExchangeConfigurationOptions: API.PaginatedOperationMethod<
  GetReservedNodeExchangeConfigurationOptionsInputMessage,
  GetReservedNodeExchangeConfigurationOptionsOutputMessage,
  GetReservedNodeExchangeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeConfigurationOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetReservedNodeExchangeConfigurationOptionsInputMessage,
  output: GetReservedNodeExchangeConfigurationOptionsOutputMessage,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservedNodeExchangeConfigurationOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeConfigurationOptionList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type GetReservedNodeExchangeOfferingsError =
  | DependentServiceUnavailableFault
  | InvalidReservedNodeStateFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Returns an array of DC2 ReservedNodeOfferings that matches the payment type, term,
 * and usage price of the given DC1 reserved node.
 */
export const getReservedNodeExchangeOfferings: API.PaginatedOperationMethod<
  GetReservedNodeExchangeOfferingsInputMessage,
  GetReservedNodeExchangeOfferingsOutputMessage,
  GetReservedNodeExchangeOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedNodeOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetReservedNodeExchangeOfferingsInputMessage,
  output: GetReservedNodeExchangeOfferingsOutputMessage,
  errors: [
    DependentServiceUnavailableFault,
    InvalidReservedNodeStateFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservedNodeExchangeOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedNodeOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | InvalidPolicyFault
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Get the resource policy for a specified resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyMessage,
  GetResourcePolicyResult,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyMessage,
  output: GetResourcePolicyResult,
  errors: [
    InvalidPolicyFault,
    ResourceNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListRecommendationsError =
  | ClusterNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * List the Amazon Redshift Advisor recommendations for one or multiple Amazon Redshift clusters in an Amazon Web Services account.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsMessage,
  ListRecommendationsResult,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationsMessage,
  output: ListRecommendationsResult,
  errors: [ClusterNotFoundFault, UnsupportedOperationFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Recommendations",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ModifyAquaConfigurationError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * This operation is retired. Calling this operation does not change AQUA configuration. Amazon Redshift automatically determines whether to use AQUA (Advanced Query Accelerator).
 */
export const modifyAquaConfiguration: API.OperationMethod<
  ModifyAquaInputMessage,
  ModifyAquaOutputMessage,
  ModifyAquaConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyAquaInputMessage,
  output: ModifyAquaOutputMessage,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAquaConfiguration",
}));

export type ModifyAuthenticationProfileError =
  | AuthenticationProfileNotFoundFault
  | AuthenticationProfileQuotaExceededFault
  | InvalidAuthenticationProfileRequestFault
  | CommonErrors;
/**
 * Modifies an authentication profile.
 */
export const modifyAuthenticationProfile: API.OperationMethod<
  ModifyAuthenticationProfileMessage,
  ModifyAuthenticationProfileResult,
  ModifyAuthenticationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyAuthenticationProfileMessage,
  output: ModifyAuthenticationProfileResult,
  errors: [
    AuthenticationProfileNotFoundFault,
    AuthenticationProfileQuotaExceededFault,
    InvalidAuthenticationProfileRequestFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyAuthenticationProfile",
}));

export type ModifyClusterError =
  | ClusterAlreadyExistsFault
  | ClusterNotFoundFault
  | ClusterParameterGroupNotFoundFault
  | ClusterSecurityGroupNotFoundFault
  | CustomCnameAssociationFault
  | DependentServiceRequestThrottlingFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidRetentionPeriodFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | TableLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | UnsupportedOptionFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster.
 *
 * You can also change node type and the number of nodes to scale up or down the
 * cluster. When resizing a cluster, you must specify both the number of nodes and the node
 * type even if one of the parameters does not change.
 *
 * You can add another security or
 * parameter group, or change the admin user password. Resetting a cluster password or modifying the security groups associated with a cluster do not need a reboot. However, modifying a parameter group requires a reboot for parameters to take effect.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const modifyCluster: API.OperationMethod<
  ModifyClusterMessage,
  ModifyClusterResult,
  ModifyClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterMessage,
  output: ModifyClusterResult,
  errors: [
    ClusterAlreadyExistsFault,
    ClusterNotFoundFault,
    ClusterParameterGroupNotFoundFault,
    ClusterSecurityGroupNotFoundFault,
    CustomCnameAssociationFault,
    DependentServiceRequestThrottlingFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidRetentionPeriodFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    TableLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
    UnsupportedOptionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCluster",
}));

export type ModifyClusterDbRevisionError =
  | ClusterNotFoundFault
  | ClusterOnLatestRevisionFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies the database revision of a cluster. The database revision is a unique
 * revision of the database running in a cluster.
 */
export const modifyClusterDbRevision: API.OperationMethod<
  ModifyClusterDbRevisionMessage,
  ModifyClusterDbRevisionResult,
  ModifyClusterDbRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterDbRevisionMessage,
  output: ModifyClusterDbRevisionResult,
  errors: [
    ClusterNotFoundFault,
    ClusterOnLatestRevisionFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterDbRevision",
}));

export type ModifyClusterIamRolesError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Modifies the list of Identity and Access Management (IAM) roles that can be
 * used by the cluster to access other Amazon Web Services services.
 *
 * The maximum number of IAM roles that you can associate is subject to a quota.
 * For more information, go to Quotas and limits
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const modifyClusterIamRoles: API.OperationMethod<
  ModifyClusterIamRolesMessage,
  ModifyClusterIamRolesResult,
  ModifyClusterIamRolesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterIamRolesMessage,
  output: ModifyClusterIamRolesResult,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterIamRoles",
}));

export type ModifyClusterMaintenanceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Modifies the maintenance settings of a cluster.
 */
export const modifyClusterMaintenance: API.OperationMethod<
  ModifyClusterMaintenanceMessage,
  ModifyClusterMaintenanceResult,
  ModifyClusterMaintenanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterMaintenanceMessage,
  output: ModifyClusterMaintenanceResult,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterMaintenance",
}));

export type ModifyClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a parameter group. For the parameters parameter, it can't contain ASCII characters.
 *
 * For more information about parameters and parameter groups, go to
 * Amazon Redshift Parameter Groups
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const modifyClusterParameterGroup: API.OperationMethod<
  ModifyClusterParameterGroupMessage,
  ClusterParameterGroupNameMessage,
  ModifyClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterParameterGroupMessage,
  output: ClusterParameterGroupNameMessage,
  errors: [
    ClusterParameterGroupNotFoundFault,
    InvalidClusterParameterGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterParameterGroup",
}));

export type ModifyClusterSnapshotError =
  | ClusterSnapshotNotFoundFault
  | InvalidClusterSnapshotStateFault
  | InvalidRetentionPeriodFault
  | CommonErrors;
/**
 * Modifies the settings for a snapshot.
 *
 * This exanmple modifies the manual retention period setting for a cluster snapshot.
 */
export const modifyClusterSnapshot: API.OperationMethod<
  ModifyClusterSnapshotMessage,
  ModifyClusterSnapshotResult,
  ModifyClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterSnapshotMessage,
  output: ModifyClusterSnapshotResult,
  errors: [
    ClusterSnapshotNotFoundFault,
    InvalidClusterSnapshotStateFault,
    InvalidRetentionPeriodFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSnapshot",
}));

export type ModifyClusterSnapshotScheduleError =
  | ClusterNotFoundFault
  | InvalidClusterSnapshotScheduleStateFault
  | SnapshotScheduleNotFoundFault
  | CommonErrors;
/**
 * Modifies a snapshot schedule for a cluster.
 */
export const modifyClusterSnapshotSchedule: API.OperationMethod<
  ModifyClusterSnapshotScheduleMessage,
  ModifyClusterSnapshotScheduleResponse,
  ModifyClusterSnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterSnapshotScheduleMessage,
  output: ModifyClusterSnapshotScheduleResponse,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterSnapshotScheduleStateFault,
    SnapshotScheduleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSnapshotSchedule",
}));

export type ModifyClusterSubnetGroupError =
  | ClusterSubnetGroupNotFoundFault
  | ClusterSubnetQuotaExceededFault
  | DependentServiceRequestThrottlingFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies a cluster subnet group to include the specified list of VPC subnets. The
 * operation replaces the existing list of subnets with the new list of subnets.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 */
export const modifyClusterSubnetGroup: API.OperationMethod<
  ModifyClusterSubnetGroupMessage,
  ModifyClusterSubnetGroupResult,
  ModifyClusterSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyClusterSubnetGroupMessage,
  output: ModifyClusterSubnetGroupResult,
  errors: [
    ClusterSubnetGroupNotFoundFault,
    ClusterSubnetQuotaExceededFault,
    DependentServiceRequestThrottlingFault,
    InvalidSubnet,
    SubnetAlreadyInUse,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyClusterSubnetGroup",
}));

export type ModifyCustomDomainAssociationError =
  | ClusterNotFoundFault
  | CustomCnameAssociationFault
  | CustomDomainAssociationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Contains information for changing a custom domain association.
 */
export const modifyCustomDomainAssociation: API.OperationMethod<
  ModifyCustomDomainAssociationMessage,
  ModifyCustomDomainAssociationResult,
  ModifyCustomDomainAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyCustomDomainAssociationMessage,
  output: ModifyCustomDomainAssociationResult,
  errors: [
    ClusterNotFoundFault,
    CustomCnameAssociationFault,
    CustomDomainAssociationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCustomDomainAssociation",
}));

export type ModifyEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies a Redshift-managed VPC endpoint.
 */
export const modifyEndpointAccess: API.OperationMethod<
  ModifyEndpointAccessMessage,
  EndpointAccess,
  ModifyEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyEndpointAccessMessage,
  output: EndpointAccess,
  errors: [
    ClusterNotFoundFault,
    EndpointNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEndpointAccess",
}));

export type ModifyEventSubscriptionError =
  | InvalidSubscriptionStateFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionEventIdNotFoundFault
  | SubscriptionNotFoundFault
  | SubscriptionSeverityNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing Amazon Redshift event notification subscription.
 */
export const modifyEventSubscription: API.OperationMethod<
  ModifyEventSubscriptionMessage,
  ModifyEventSubscriptionResult,
  ModifyEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyEventSubscriptionMessage,
  output: ModifyEventSubscriptionResult,
  errors: [
    InvalidSubscriptionStateFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionEventIdNotFoundFault,
    SubscriptionNotFoundFault,
    SubscriptionSeverityNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
}));

export type ModifyIntegrationError =
  | IntegrationAlreadyExistsFault
  | IntegrationConflictOperationFault
  | IntegrationConflictStateFault
  | IntegrationNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies a zero-ETL integration or S3 event integration with Amazon Redshift.
 */
export const modifyIntegration: API.OperationMethod<
  ModifyIntegrationMessage,
  Integration,
  ModifyIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyIntegrationMessage,
  output: Integration,
  errors: [
    IntegrationAlreadyExistsFault,
    IntegrationConflictOperationFault,
    IntegrationConflictStateFault,
    IntegrationNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
}));

export type ModifyLakehouseConfigurationError =
  | ClusterNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | InvalidClusterStateFault
  | RedshiftIdcApplicationNotExistsFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies the lakehouse configuration for a cluster. This operation allows you to manage Amazon Redshift federated permissions and Amazon Web Services IAM Identity Center trusted identity propagation.
 */
export const modifyLakehouseConfiguration: API.OperationMethod<
  ModifyLakehouseConfigurationMessage,
  LakehouseConfiguration,
  ModifyLakehouseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyLakehouseConfigurationMessage,
  output: LakehouseConfiguration,
  errors: [
    ClusterNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    InvalidClusterStateFault,
    RedshiftIdcApplicationNotExistsFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLakehouseConfiguration",
}));

export type ModifyQev2IdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | Qev2IdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies an Amazon Redshift Query Editor (QEV2) IAM Identity Center application.
 */
export const modifyQev2IdcApplication: API.OperationMethod<
  ModifyQev2IdcApplicationMessage,
  ModifyQev2IdcApplicationResult,
  ModifyQev2IdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyQev2IdcApplicationMessage,
  output: ModifyQev2IdcApplicationResult,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    Qev2IdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyQev2IdcApplication",
}));

export type ModifyRedshiftIdcApplicationError =
  | DependentServiceAccessDeniedFault
  | DependentServiceUnavailableFault
  | RedshiftIdcApplicationNotExistsFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Changes an existing Amazon Redshift IAM Identity Center application.
 */
export const modifyRedshiftIdcApplication: API.OperationMethod<
  ModifyRedshiftIdcApplicationMessage,
  ModifyRedshiftIdcApplicationResult,
  ModifyRedshiftIdcApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyRedshiftIdcApplicationMessage,
  output: ModifyRedshiftIdcApplicationResult,
  errors: [
    DependentServiceAccessDeniedFault,
    DependentServiceUnavailableFault,
    RedshiftIdcApplicationNotExistsFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyRedshiftIdcApplication",
}));

export type ModifyScheduledActionError =
  | ClusterNotFoundFault
  | InvalidScheduledActionFault
  | InvalidScheduleFault
  | ScheduledActionNotFoundFault
  | ScheduledActionTypeUnsupportedFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Modifies a scheduled action.
 */
export const modifyScheduledAction: API.OperationMethod<
  ModifyScheduledActionMessage,
  ScheduledAction,
  ModifyScheduledActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyScheduledActionMessage,
  output: ScheduledAction,
  errors: [
    ClusterNotFoundFault,
    InvalidScheduledActionFault,
    InvalidScheduleFault,
    ScheduledActionNotFoundFault,
    ScheduledActionTypeUnsupportedFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyScheduledAction",
}));

export type ModifySnapshotCopyRetentionPeriodError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidRetentionPeriodFault
  | SnapshotCopyDisabledFault
  | UnauthorizedOperation
  | CommonErrors;
/**
 * Modifies the number of days to retain snapshots in the destination Amazon Web Services Region after
 * they are copied from the source Amazon Web Services Region. By default, this operation only changes the
 * retention period of copied automated snapshots. The retention periods for both new and
 * existing copied automated snapshots are updated with the new retention period. You can
 * set the manual option to change only the retention periods of copied manual snapshots.
 * If you set this option, only newly copied manual snapshots have the new retention
 * period.
 */
export const modifySnapshotCopyRetentionPeriod: API.OperationMethod<
  ModifySnapshotCopyRetentionPeriodMessage,
  ModifySnapshotCopyRetentionPeriodResult,
  ModifySnapshotCopyRetentionPeriodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifySnapshotCopyRetentionPeriodMessage,
  output: ModifySnapshotCopyRetentionPeriodResult,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidRetentionPeriodFault,
    SnapshotCopyDisabledFault,
    UnauthorizedOperation,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySnapshotCopyRetentionPeriod",
}));

export type ModifySnapshotScheduleError =
  | InvalidScheduleFault
  | SnapshotScheduleNotFoundFault
  | SnapshotScheduleUpdateInProgressFault
  | CommonErrors;
/**
 * Modifies a snapshot schedule. Any schedule associated with a cluster is modified
 * asynchronously.
 */
export const modifySnapshotSchedule: API.OperationMethod<
  ModifySnapshotScheduleMessage,
  SnapshotSchedule,
  ModifySnapshotScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifySnapshotScheduleMessage,
  output: SnapshotSchedule,
  errors: [
    InvalidScheduleFault,
    SnapshotScheduleNotFoundFault,
    SnapshotScheduleUpdateInProgressFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifySnapshotSchedule",
}));

export type ModifyUsageLimitError =
  | InvalidUsageLimitFault
  | UnsupportedOperationFault
  | UsageLimitNotFoundFault
  | CommonErrors;
/**
 * Modifies a usage limit in a cluster.
 * You can't modify the feature type or period of a usage limit.
 */
export const modifyUsageLimit: API.OperationMethod<
  ModifyUsageLimitMessage,
  UsageLimit,
  ModifyUsageLimitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyUsageLimitMessage,
  output: UsageLimit,
  errors: [
    InvalidUsageLimitFault,
    UnsupportedOperationFault,
    UsageLimitNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUsageLimit",
}));

export type PauseClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Pauses a cluster.
 */
export const pauseCluster: API.OperationMethod<
  PauseClusterMessage,
  PauseClusterResult,
  PauseClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PauseClusterMessage,
  output: PauseClusterResult,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseCluster",
}));

export type PurchaseReservedNodeOfferingError =
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeOfferingNotFoundFault
  | ReservedNodeQuotaExceededFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Allows you to purchase reserved nodes. Amazon Redshift offers a predefined set of
 * reserved node offerings. You can purchase one or more of the offerings. You can call the
 * DescribeReservedNodeOfferings API to obtain the available reserved
 * node offerings. You can call this API by providing a specific reserved node offering and
 * the number of nodes you want to reserve.
 *
 * For more information about reserved node offerings, go to
 * Purchasing Reserved Nodes
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const purchaseReservedNodeOffering: API.OperationMethod<
  PurchaseReservedNodeOfferingMessage,
  PurchaseReservedNodeOfferingResult,
  PurchaseReservedNodeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PurchaseReservedNodeOfferingMessage,
  output: PurchaseReservedNodeOfferingResult,
  errors: [
    ReservedNodeAlreadyExistsFault,
    ReservedNodeOfferingNotFoundFault,
    ReservedNodeQuotaExceededFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedNodeOffering",
}));

export type PutResourcePolicyError =
  | ConflictPolicyUpdateFault
  | InvalidPolicyFault
  | ResourceNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Updates the resource policy for a specified resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyMessage,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyMessage,
  output: PutResourcePolicyResult,
  errors: [
    ConflictPolicyUpdateFault,
    InvalidPolicyFault,
    ResourceNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RebootClusterError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | CommonErrors;
/**
 * Reboots a cluster. This action is taken as soon as possible. It results in a
 * momentary outage to the cluster, during which the cluster status is set to
 * `rebooting`. A cluster event is created when the reboot is completed. Any
 * pending cluster modifications (see ModifyCluster) are applied at this
 * reboot.
 * For more information about managing clusters, go to
 * Amazon Redshift Clusters
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const rebootCluster: API.OperationMethod<
  RebootClusterMessage,
  RebootClusterResult,
  RebootClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootClusterMessage,
  output: RebootClusterResult,
  errors: [ClusterNotFoundFault, InvalidClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootCluster",
}));

export type RegisterNamespaceError =
  | ClusterNotFoundFault
  | InvalidClusterStateFault
  | InvalidNamespaceFault
  | CommonErrors;
/**
 * Registers a cluster or serverless namespace to the Amazon Web Services Glue Data Catalog.
 */
export const registerNamespace: API.OperationMethod<
  RegisterNamespaceInputMessage,
  RegisterNamespaceOutputMessage,
  RegisterNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterNamespaceInputMessage,
  output: RegisterNamespaceOutputMessage,
  errors: [
    ClusterNotFoundFault,
    InvalidClusterStateFault,
    InvalidNamespaceFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterNamespace",
}));

export type RejectDataShareError = InvalidDataShareFault | CommonErrors;
/**
 * From a datashare consumer account, rejects the specified datashare.
 */
export const rejectDataShare: API.OperationMethod<
  RejectDataShareMessage,
  DataShare,
  RejectDataShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectDataShareMessage,
  output: DataShare,
  errors: [InvalidDataShareFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectDataShare",
}));

export type ResetClusterParameterGroupError =
  | ClusterParameterGroupNotFoundFault
  | InvalidClusterParameterGroupStateFault
  | CommonErrors;
/**
 * Sets one or more parameters of the specified parameter group to their default
 * values and sets the source values of the parameters to "engine-default". To reset the
 * entire parameter group specify the *ResetAllParameters* parameter.
 * For parameter changes to take effect you must reboot any associated clusters.
 */
export const resetClusterParameterGroup: API.OperationMethod<
  ResetClusterParameterGroupMessage,
  ClusterParameterGroupNameMessage,
  ResetClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetClusterParameterGroupMessage,
  output: ClusterParameterGroupNameMessage,
  errors: [
    ClusterParameterGroupNotFoundFault,
    InvalidClusterParameterGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetClusterParameterGroup",
}));

export type ResizeClusterError =
  | ClusterNotFoundFault
  | DependentServiceUnavailableFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | InvalidReservedNodeStateFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | UnsupportedOptionFault
  | CommonErrors;
/**
 * Changes the size of the cluster. You can change the cluster's type, or change the
 * number or type of nodes. The default behavior is to use the elastic resize method. With
 * an elastic resize, your cluster is available for read and write operations more quickly
 * than with the classic resize method.
 *
 * Elastic resize operations have the following restrictions:
 *
 * - You can only resize clusters of the following types:
 *
 * - dc2.large
 *
 * - dc2.8xlarge
 *
 * - rg.large
 *
 * - rg.xlarge
 *
 * - rg.4xlarge
 *
 * - rg.12xlarge
 *
 * - ra3.large
 *
 * - ra3.xlplus
 *
 * - ra3.4xlarge
 *
 * - ra3.16xlarge
 *
 * - The type of nodes that you add must match the node type for the
 * cluster.
 */
export const resizeCluster: API.OperationMethod<
  ResizeClusterMessage,
  ResizeClusterResult,
  ResizeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResizeClusterMessage,
  output: ResizeClusterResult,
  errors: [
    ClusterNotFoundFault,
    DependentServiceUnavailableFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    InvalidReservedNodeStateFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
    UnsupportedOptionFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResizeCluster",
}));

export type RestoreFromClusterSnapshotError =
  | AccessToSnapshotDeniedFault
  | ClusterAlreadyExistsFault
  | ClusterParameterGroupNotFoundFault
  | ClusterQuotaExceededFault
  | ClusterSecurityGroupNotFoundFault
  | ClusterSnapshotNotFoundFault
  | ClusterSubnetGroupNotFoundFault
  | DependentServiceAccessDeniedFault
  | DependentServiceRequestThrottlingFault
  | DependentServiceUnavailableFault
  | HsmClientCertificateNotFoundFault
  | HsmConfigurationNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterSnapshotStateFault
  | InvalidClusterSubnetGroupStateFault
  | InvalidClusterTrackFault
  | InvalidElasticIpFault
  | InvalidReservedNodeStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidTagFault
  | InvalidVPCNetworkStateFault
  | Ipv6CidrBlockNotFoundFault
  | LimitExceededFault
  | NumberOfNodesPerClusterLimitExceededFault
  | NumberOfNodesQuotaExceededFault
  | RedshiftIdcApplicationNotExistsFault
  | ReservedNodeAlreadyExistsFault
  | ReservedNodeAlreadyMigratedFault
  | ReservedNodeNotFoundFault
  | ReservedNodeOfferingNotFoundFault
  | SnapshotScheduleNotFoundFault
  | TagLimitExceededFault
  | UnauthorizedOperation
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new cluster from a snapshot. By default, Amazon Redshift creates the resulting
 * cluster with the same configuration as the original cluster from which the snapshot was
 * created, except that the new cluster is created with the default cluster security and
 * parameter groups. After Amazon Redshift creates the cluster, you can use the ModifyCluster API to associate a different security group and different
 * parameter group with the restored cluster. If you are using a DS node type, you can also
 * choose to change to another DS node type of the same size during restore.
 *
 * If you restore a cluster into a VPC, you must provide a cluster subnet group where
 * you want the cluster restored.
 *
 * VPC Block Public Access (BPA) enables you to block resources in VPCs and subnets that
 * you own in a Region from reaching or being reached from the internet through internet
 * gateways and egress-only internet gateways. If a subnet group for a
 * provisioned cluster is in an account with VPC BPA turned on, the following capabilities
 * are blocked:
 *
 * - Creating a public cluster
 *
 * - Restoring a public cluster
 *
 * - Modifying a private cluster to be public
 *
 * - Adding a subnet with VPC BPA turned on to the subnet group when there's at
 * least one public cluster within the group
 *
 * For more information about VPC BPA, see Block public access to VPCs and
 * subnets in the *Amazon VPC User Guide*.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const restoreFromClusterSnapshot: API.OperationMethod<
  RestoreFromClusterSnapshotMessage,
  RestoreFromClusterSnapshotResult,
  RestoreFromClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreFromClusterSnapshotMessage,
  output: RestoreFromClusterSnapshotResult,
  errors: [
    AccessToSnapshotDeniedFault,
    ClusterAlreadyExistsFault,
    ClusterParameterGroupNotFoundFault,
    ClusterQuotaExceededFault,
    ClusterSecurityGroupNotFoundFault,
    ClusterSnapshotNotFoundFault,
    ClusterSubnetGroupNotFoundFault,
    DependentServiceAccessDeniedFault,
    DependentServiceRequestThrottlingFault,
    DependentServiceUnavailableFault,
    HsmClientCertificateNotFoundFault,
    HsmConfigurationNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterSnapshotStateFault,
    InvalidClusterSubnetGroupStateFault,
    InvalidClusterTrackFault,
    InvalidElasticIpFault,
    InvalidReservedNodeStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidTagFault,
    InvalidVPCNetworkStateFault,
    Ipv6CidrBlockNotFoundFault,
    LimitExceededFault,
    NumberOfNodesPerClusterLimitExceededFault,
    NumberOfNodesQuotaExceededFault,
    RedshiftIdcApplicationNotExistsFault,
    ReservedNodeAlreadyExistsFault,
    ReservedNodeAlreadyMigratedFault,
    ReservedNodeNotFoundFault,
    ReservedNodeOfferingNotFoundFault,
    SnapshotScheduleNotFoundFault,
    TagLimitExceededFault,
    UnauthorizedOperation,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreFromClusterSnapshot",
}));

export type RestoreTableFromClusterSnapshotError =
  | ClusterNotFoundFault
  | ClusterSnapshotNotFoundFault
  | InProgressTableRestoreQuotaExceededFault
  | InvalidClusterSnapshotStateFault
  | InvalidClusterStateFault
  | InvalidTableRestoreArgumentFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Creates a new table from a table in an Amazon Redshift cluster snapshot. You must
 * create the new table within the Amazon Redshift cluster that the snapshot was taken
 * from.
 *
 * You cannot use `RestoreTableFromClusterSnapshot` to restore a table with
 * the same name as an existing table in an Amazon Redshift cluster. That is, you cannot
 * overwrite an existing table in a cluster with a restored table. If you want to replace
 * your original table with a new, restored table, then rename or drop your original table
 * before you call `RestoreTableFromClusterSnapshot`. When you have renamed your
 * original table, then you can pass the original name of the table as the
 * `NewTableName` parameter value in the call to
 * `RestoreTableFromClusterSnapshot`. This way, you can replace the original
 * table with the table created from the snapshot.
 *
 * You can't use this operation to restore tables with
 * interleaved sort keys.
 */
export const restoreTableFromClusterSnapshot: API.OperationMethod<
  RestoreTableFromClusterSnapshotMessage,
  RestoreTableFromClusterSnapshotResult,
  RestoreTableFromClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreTableFromClusterSnapshotMessage,
  output: RestoreTableFromClusterSnapshotResult,
  errors: [
    ClusterNotFoundFault,
    ClusterSnapshotNotFoundFault,
    InProgressTableRestoreQuotaExceededFault,
    InvalidClusterSnapshotStateFault,
    InvalidClusterStateFault,
    InvalidTableRestoreArgumentFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTableFromClusterSnapshot",
}));

export type ResumeClusterError =
  | ClusterNotFoundFault
  | InsufficientClusterCapacityFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Resumes a paused cluster.
 */
export const resumeCluster: API.OperationMethod<
  ResumeClusterMessage,
  ResumeClusterResult,
  ResumeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeClusterMessage,
  output: ResumeClusterResult,
  errors: [
    ClusterNotFoundFault,
    InsufficientClusterCapacityFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeCluster",
}));

export type RevokeClusterSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | ClusterSecurityGroupNotFoundFault
  | InvalidClusterSecurityGroupStateFault
  | CommonErrors;
/**
 * Revokes an ingress rule in an Amazon Redshift security group for a previously authorized
 * IP range or Amazon EC2 security group. To add an ingress rule, see AuthorizeClusterSecurityGroupIngress.
 * For information about managing security groups, go to
 * Amazon Redshift Cluster Security Groups in the
 * *Amazon Redshift Cluster Management Guide*.
 */
export const revokeClusterSecurityGroupIngress: API.OperationMethod<
  RevokeClusterSecurityGroupIngressMessage,
  RevokeClusterSecurityGroupIngressResult,
  RevokeClusterSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeClusterSecurityGroupIngressMessage,
  output: RevokeClusterSecurityGroupIngressResult,
  errors: [
    AuthorizationNotFoundFault,
    ClusterSecurityGroupNotFoundFault,
    InvalidClusterSecurityGroupStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeClusterSecurityGroupIngress",
}));

export type RevokeEndpointAccessError =
  | ClusterNotFoundFault
  | EndpointAuthorizationNotFoundFault
  | EndpointNotFoundFault
  | InvalidAuthorizationStateFault
  | InvalidClusterSecurityGroupStateFault
  | InvalidClusterStateFault
  | InvalidEndpointStateFault
  | CommonErrors;
/**
 * Revokes access to a cluster.
 */
export const revokeEndpointAccess: API.OperationMethod<
  RevokeEndpointAccessMessage,
  EndpointAuthorization,
  RevokeEndpointAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeEndpointAccessMessage,
  output: EndpointAuthorization,
  errors: [
    ClusterNotFoundFault,
    EndpointAuthorizationNotFoundFault,
    EndpointNotFoundFault,
    InvalidAuthorizationStateFault,
    InvalidClusterSecurityGroupStateFault,
    InvalidClusterStateFault,
    InvalidEndpointStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeEndpointAccess",
}));

export type RevokeSnapshotAccessError =
  | AccessToSnapshotDeniedFault
  | AuthorizationNotFoundFault
  | ClusterSnapshotNotFoundFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Removes the ability of the specified Amazon Web Services account to restore the specified
 * snapshot. If the account is currently restoring the snapshot, the restore will run to
 * completion.
 *
 * For more information about working with snapshots, go to
 * Amazon Redshift Snapshots
 * in the *Amazon Redshift Cluster Management Guide*.
 */
export const revokeSnapshotAccess: API.OperationMethod<
  RevokeSnapshotAccessMessage,
  RevokeSnapshotAccessResult,
  RevokeSnapshotAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeSnapshotAccessMessage,
  output: RevokeSnapshotAccessResult,
  errors: [
    AccessToSnapshotDeniedFault,
    AuthorizationNotFoundFault,
    ClusterSnapshotNotFoundFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSnapshotAccess",
}));

export type RotateEncryptionKeyError =
  | ClusterNotFoundFault
  | DependentServiceRequestThrottlingFault
  | InvalidClusterStateFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Rotates the encryption keys for a cluster.
 */
export const rotateEncryptionKey: API.OperationMethod<
  RotateEncryptionKeyMessage,
  RotateEncryptionKeyResult,
  RotateEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RotateEncryptionKeyMessage,
  output: RotateEncryptionKeyResult,
  errors: [
    ClusterNotFoundFault,
    DependentServiceRequestThrottlingFault,
    InvalidClusterStateFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateEncryptionKey",
}));

export type UpdatePartnerStatusError =
  | ClusterNotFoundFault
  | PartnerNotFoundFault
  | UnauthorizedPartnerIntegrationFault
  | UnsupportedOperationFault
  | CommonErrors;
/**
 * Updates the status of a partner integration.
 */
export const updatePartnerStatus: API.OperationMethod<
  UpdatePartnerStatusInputMessage,
  PartnerIntegrationOutputMessage,
  UpdatePartnerStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePartnerStatusInputMessage,
  output: PartnerIntegrationOutputMessage,
  errors: [
    ClusterNotFoundFault,
    PartnerNotFoundFault,
    UnauthorizedPartnerIntegrationFault,
    UnsupportedOperationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartnerStatus",
}));
