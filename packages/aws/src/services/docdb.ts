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
const ns = T.XmlNamespace("http://rds.amazonaws.com/doc/2014-10-31/");
const svc = T.AwsApiService({
  sdkId: "DocDB",
  serviceShapeName: "AmazonRDSv19",
});
const auth = T.AwsAuthSigv4({ name: "rds" });
const ver = T.ServiceVersion("2014-10-31");
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
              `https://rds-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://rds.${Region}.amazonaws.com`);
            }
            return e(
              `https://rds-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rds.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://rds.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AuthorizationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<AuthorizationNotFoundFault>()(
    "AuthorizationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AuthorizationNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CertificateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CertificateNotFoundFault>()(
    "CertificateNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "CertificateNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterAlreadyExistsFault>()(
    "DBClusterAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBClusterAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterNotFoundFault>()(
    "DBClusterNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBClusterNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterParameterGroupNotFoundFault>()(
    "DBClusterParameterGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBClusterParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterQuotaExceededFault>()(
    "DBClusterQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBClusterQuotaExceededFault",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class DBClusterSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterSnapshotAlreadyExistsFault>()(
    "DBClusterSnapshotAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBClusterSnapshotAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBClusterSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBClusterSnapshotNotFoundFault>()(
    "DBClusterSnapshotNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBClusterSnapshotNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBInstanceAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceAlreadyExistsFault>()(
    "DBInstanceAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBInstanceAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBInstanceNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBInstanceNotFoundFault>()(
    "DBInstanceNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "DBInstanceNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBParameterGroupAlreadyExistsFault>()(
    "DBParameterGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBParameterGroupNotFoundFault>()(
    "DBParameterGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBParameterGroupQuotaExceededFault>()(
    "DBParameterGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSecurityGroupNotFoundFault>()(
    "DBSecurityGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSecurityGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBSnapshotAlreadyExistsFault>()(
    "DBSnapshotAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSnapshotAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSnapshotNotFoundFault>()(
    "DBSnapshotNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "DBSnapshotNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupAlreadyExistsFault>()(
    "DBSubnetGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSubnetGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class DBSubnetGroupDoesNotCoverEnoughAZs
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupDoesNotCoverEnoughAZs>()(
    "DBSubnetGroupDoesNotCoverEnoughAZs",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSubnetGroupDoesNotCoverEnoughAZs",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupNotFoundFault>()(
    "DBSubnetGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSubnetGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetGroupQuotaExceededFault>()(
    "DBSubnetGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSubnetGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBSubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<DBSubnetQuotaExceededFault>()(
    "DBSubnetQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBSubnetQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DBUpgradeDependencyFailureFault
  extends /*@__PURE__*/ S.TaggedError<DBUpgradeDependencyFailureFault>()(
    "DBUpgradeDependencyFailureFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DBUpgradeDependencyFailure",
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
export class GlobalClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<GlobalClusterAlreadyExistsFault>()(
    "GlobalClusterAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GlobalClusterAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class GlobalClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<GlobalClusterNotFoundFault>()(
    "GlobalClusterNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GlobalClusterNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class GlobalClusterQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<GlobalClusterQuotaExceededFault>()(
    "GlobalClusterQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GlobalClusterQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InstanceQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<InstanceQuotaExceededFault>()(
    "InstanceQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InstanceQuotaExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientDBClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientDBClusterCapacityFault>()(
    "InsufficientDBClusterCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientDBClusterCapacityFault",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InsufficientDBInstanceCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientDBInstanceCapacityFault>()(
    "InsufficientDBInstanceCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientDBInstanceCapacity",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientStorageClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientStorageClusterCapacityFault>()(
    "InsufficientStorageClusterCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientStorageClusterCapacity",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterSnapshotStateFault>()(
    "InvalidDBClusterSnapshotStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBClusterSnapshotStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBClusterStateFault>()(
    "InvalidDBClusterStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBClusterStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBInstanceStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBInstanceStateFault>()(
    "InvalidDBInstanceStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBInstanceState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBParameterGroupStateFault>()(
    "InvalidDBParameterGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBParameterGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSecurityGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSecurityGroupStateFault>()(
    "InvalidDBSecurityGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBSecurityGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSnapshotStateFault>()(
    "InvalidDBSnapshotStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBSnapshotState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSubnetGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSubnetGroupStateFault>()(
    "InvalidDBSubnetGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBSubnetGroupStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDBSubnetStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidDBSubnetStateFault>()(
    "InvalidDBSubnetStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDBSubnetStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidEventSubscriptionStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidEventSubscriptionStateFault>()(
    "InvalidEventSubscriptionStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidEventSubscriptionState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidGlobalClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidGlobalClusterStateFault>()(
    "InvalidGlobalClusterStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidGlobalClusterStateFault",
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
      T.AwsQueryError({ code: "InvalidRestoreFault", httpResponseCode: 400 }),
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
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ S.TaggedError<KMSKeyNotAccessibleFault>()(
    "KMSKeyNotAccessibleFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "KMSKeyNotAccessibleFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NetworkTypeNotSupported
  extends /*@__PURE__*/ S.TaggedError<NetworkTypeNotSupported>()(
    "NetworkTypeNotSupported",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NetworkTypeNotSupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
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
export class SharedSnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SharedSnapshotQuotaExceededFault>()(
    "SharedSnapshotQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SharedSnapshotQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotQuotaExceededFault>()(
    "SnapshotQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SnapshotQuotaExceeded", httpResponseCode: 400 }),
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
export class StorageQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<StorageQuotaExceededFault>()(
    "StorageQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "StorageQuotaExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class StorageTypeNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<StorageTypeNotSupportedFault>()(
    "StorageTypeNotSupportedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "StorageTypeNotSupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
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
export class SubscriptionNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SubscriptionNotFoundFault>()(
    "SubscriptionNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubscriptionNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export interface AddSourceIdentifierToSubscriptionMessage {
  SubscriptionName?: string;
  SourceIdentifier?: string;
}
export const AddSourceIdentifierToSubscriptionMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SubscriptionName: S.optional(S.String),
      SourceIdentifier: S.optional(S.String),
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
  identifier: "AddSourceIdentifierToSubscriptionMessage",
}) as any as S.Schema<AddSourceIdentifierToSubscriptionMessage>;
export type SourceIdsList = string[];
export const SourceIdsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SourceId")),
);
export type EventCategoriesList = string[];
export const EventCategoriesList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("EventCategory")),
);
export interface EventSubscription {
  CustomerAwsId?: string;
  CustSubscriptionId?: string;
  SnsTopicArn?: string;
  Status?: string;
  SubscriptionCreationTime?: string;
  SourceType?: string;
  SourceIdsList?: string[];
  EventCategoriesList?: string[];
  Enabled?: boolean;
  EventSubscriptionArn?: string;
}
export const EventSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomerAwsId: S.optional(S.String),
    CustSubscriptionId: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    Status: S.optional(S.String),
    SubscriptionCreationTime: S.optional(S.String),
    SourceType: S.optional(S.String),
    SourceIdsList: S.optional(SourceIdsList),
    EventCategoriesList: S.optional(EventCategoriesList),
    Enabled: S.optional(S.Boolean),
    EventSubscriptionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EventSubscription",
}) as any as S.Schema<EventSubscription>;
export interface AddSourceIdentifierToSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export const AddSourceIdentifierToSubscriptionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "AddSourceIdentifierToSubscriptionResult",
}) as any as S.Schema<AddSourceIdentifierToSubscriptionResult>;
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
export interface AddTagsToResourceMessage {
  ResourceName?: string;
  Tags?: Tag[];
}
export const AddTagsToResourceMessage = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "AddTagsToResourceMessage",
}) as any as S.Schema<AddTagsToResourceMessage>;
export interface AddTagsToResourceResponse {}
export const AddTagsToResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddTagsToResourceResponse",
}) as any as S.Schema<AddTagsToResourceResponse>;
export interface ApplyPendingMaintenanceActionMessage {
  ResourceIdentifier?: string;
  ApplyAction?: string;
  OptInType?: string;
}
export const ApplyPendingMaintenanceActionMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceIdentifier: S.optional(S.String),
      ApplyAction: S.optional(S.String),
      OptInType: S.optional(S.String),
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
  identifier: "ApplyPendingMaintenanceActionMessage",
}) as any as S.Schema<ApplyPendingMaintenanceActionMessage>;
export interface PendingMaintenanceAction {
  Action?: string;
  AutoAppliedAfterDate?: Date;
  ForcedApplyDate?: Date;
  OptInStatus?: string;
  CurrentApplyDate?: Date;
  Description?: string;
}
export const PendingMaintenanceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(S.String),
    AutoAppliedAfterDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ForcedApplyDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OptInStatus: S.optional(S.String),
    CurrentApplyDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "PendingMaintenanceAction",
}) as any as S.Schema<PendingMaintenanceAction>;
export type PendingMaintenanceActionDetails = PendingMaintenanceAction[];
export const PendingMaintenanceActionDetails = /*@__PURE__*/ S.Array(
  PendingMaintenanceAction.pipe(T.XmlName("PendingMaintenanceAction")).annotate(
    { identifier: "PendingMaintenanceAction" },
  ),
);
export interface ResourcePendingMaintenanceActions {
  ResourceIdentifier?: string;
  PendingMaintenanceActionDetails?: PendingMaintenanceAction[];
}
export const ResourcePendingMaintenanceActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdentifier: S.optional(S.String),
    PendingMaintenanceActionDetails: S.optional(
      PendingMaintenanceActionDetails,
    ),
  }),
).annotate({
  identifier: "ResourcePendingMaintenanceActions",
}) as any as S.Schema<ResourcePendingMaintenanceActions>;
export interface ApplyPendingMaintenanceActionResult {
  ResourcePendingMaintenanceActions?: ResourcePendingMaintenanceActions;
}
export const ApplyPendingMaintenanceActionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourcePendingMaintenanceActions: S.optional(
      ResourcePendingMaintenanceActions,
    ),
  }).pipe(ns),
).annotate({
  identifier: "ApplyPendingMaintenanceActionResult",
}) as any as S.Schema<ApplyPendingMaintenanceActionResult>;
export interface CopyDBClusterParameterGroupMessage {
  SourceDBClusterParameterGroupIdentifier?: string;
  TargetDBClusterParameterGroupIdentifier?: string;
  TargetDBClusterParameterGroupDescription?: string;
  Tags?: Tag[];
}
export const CopyDBClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceDBClusterParameterGroupIdentifier: S.optional(S.String),
    TargetDBClusterParameterGroupIdentifier: S.optional(S.String),
    TargetDBClusterParameterGroupDescription: S.optional(S.String),
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
  identifier: "CopyDBClusterParameterGroupMessage",
}) as any as S.Schema<CopyDBClusterParameterGroupMessage>;
export interface DBClusterParameterGroup {
  DBClusterParameterGroupName?: string;
  DBParameterGroupFamily?: string;
  Description?: string;
  DBClusterParameterGroupArn?: string;
}
export const DBClusterParameterGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterParameterGroupName: S.optional(S.String),
    DBParameterGroupFamily: S.optional(S.String),
    Description: S.optional(S.String),
    DBClusterParameterGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DBClusterParameterGroup",
}) as any as S.Schema<DBClusterParameterGroup>;
export interface CopyDBClusterParameterGroupResult {
  DBClusterParameterGroup?: DBClusterParameterGroup;
}
export const CopyDBClusterParameterGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterParameterGroup: S.optional(DBClusterParameterGroup),
  }).pipe(ns),
).annotate({
  identifier: "CopyDBClusterParameterGroupResult",
}) as any as S.Schema<CopyDBClusterParameterGroupResult>;
export interface CopyDBClusterSnapshotMessage {
  SourceDBClusterSnapshotIdentifier?: string;
  TargetDBClusterSnapshotIdentifier?: string;
  KmsKeyId?: string;
  PreSignedUrl?: string;
  CopyTags?: boolean;
  Tags?: Tag[];
}
export const CopyDBClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceDBClusterSnapshotIdentifier: S.optional(S.String),
    TargetDBClusterSnapshotIdentifier: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    PreSignedUrl: S.optional(S.String),
    CopyTags: S.optional(S.Boolean),
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
  identifier: "CopyDBClusterSnapshotMessage",
}) as any as S.Schema<CopyDBClusterSnapshotMessage>;
export type AvailabilityZones = string[];
export const AvailabilityZones = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("AvailabilityZone")),
);
export interface DBClusterSnapshot {
  AvailabilityZones?: string[];
  DBClusterSnapshotIdentifier?: string;
  DBClusterIdentifier?: string;
  SnapshotCreateTime?: Date;
  Engine?: string;
  Status?: string;
  Port?: number;
  VpcId?: string;
  ClusterCreateTime?: Date;
  MasterUsername?: string;
  EngineVersion?: string;
  SnapshotType?: string;
  PercentProgress?: number;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DBClusterSnapshotArn?: string;
  SourceDBClusterSnapshotArn?: string;
  StorageType?: string;
}
export const DBClusterSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(AvailabilityZones),
    DBClusterSnapshotIdentifier: S.optional(S.String),
    DBClusterIdentifier: S.optional(S.String),
    SnapshotCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Engine: S.optional(S.String),
    Status: S.optional(S.String),
    Port: S.optional(S.Number),
    VpcId: S.optional(S.String),
    ClusterCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MasterUsername: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    PercentProgress: S.optional(S.Number),
    StorageEncrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    DBClusterSnapshotArn: S.optional(S.String),
    SourceDBClusterSnapshotArn: S.optional(S.String),
    StorageType: S.optional(S.String),
  }),
).annotate({
  identifier: "DBClusterSnapshot",
}) as any as S.Schema<DBClusterSnapshot>;
export interface CopyDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export const CopyDBClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterSnapshot: S.optional(DBClusterSnapshot) }).pipe(ns),
).annotate({
  identifier: "CopyDBClusterSnapshotResult",
}) as any as S.Schema<CopyDBClusterSnapshotResult>;
export type VpcSecurityGroupIdList = string[];
export const VpcSecurityGroupIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("VpcSecurityGroupId")),
);
export type LogTypeList = string[];
export const LogTypeList = /*@__PURE__*/ S.Array(S.String);
export type GlobalClusterIdentifier = string;
export interface ServerlessV2ScalingConfiguration {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export const ServerlessV2ScalingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinCapacity: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServerlessV2ScalingConfiguration",
}) as any as S.Schema<ServerlessV2ScalingConfiguration>;
export interface CreateDBClusterMessage {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  DBClusterIdentifier?: string;
  DBClusterParameterGroupName?: string;
  VpcSecurityGroupIds?: string[];
  DBSubnetGroupName?: string;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  MasterUsername?: string;
  MasterUserPassword?: string | redacted.Redacted<string>;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  Tags?: Tag[];
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  PreSignedUrl?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  GlobalClusterIdentifier?: string;
  StorageType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  NetworkType?: string;
}
export const CreateDBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(AvailabilityZones),
    BackupRetentionPeriod: S.optional(S.Number),
    DBClusterIdentifier: S.optional(S.String),
    DBClusterParameterGroupName: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    DBSubnetGroupName: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    Port: S.optional(S.Number),
    MasterUsername: S.optional(S.String),
    MasterUserPassword: S.optional(SensitiveString),
    PreferredBackupWindow: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    Tags: S.optional(TagList),
    StorageEncrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    PreSignedUrl: S.optional(S.String),
    EnableCloudwatchLogsExports: S.optional(LogTypeList),
    DeletionProtection: S.optional(S.Boolean),
    GlobalClusterIdentifier: S.optional(S.String),
    StorageType: S.optional(S.String),
    ServerlessV2ScalingConfiguration: S.optional(
      ServerlessV2ScalingConfiguration,
    ),
    ManageMasterUserPassword: S.optional(S.Boolean),
    MasterUserSecretKmsKeyId: S.optional(S.String),
    NetworkType: S.optional(S.String),
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
  identifier: "CreateDBClusterMessage",
}) as any as S.Schema<CreateDBClusterMessage>;
export type ReadReplicaIdentifierList = string[];
export const ReadReplicaIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("ReadReplicaIdentifier")),
);
export interface DBClusterMember {
  DBInstanceIdentifier?: string;
  IsClusterWriter?: boolean;
  DBClusterParameterGroupStatus?: string;
  PromotionTier?: number;
}
export const DBClusterMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceIdentifier: S.optional(S.String),
    IsClusterWriter: S.optional(S.Boolean),
    DBClusterParameterGroupStatus: S.optional(S.String),
    PromotionTier: S.optional(S.Number),
  }),
).annotate({
  identifier: "DBClusterMember",
}) as any as S.Schema<DBClusterMember>;
export type DBClusterMemberList = DBClusterMember[];
export const DBClusterMemberList = /*@__PURE__*/ S.Array(
  DBClusterMember.pipe(T.XmlName("DBClusterMember")).annotate({
    identifier: "DBClusterMember",
  }),
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
  VpcSecurityGroupMembership.pipe(
    T.XmlName("VpcSecurityGroupMembership"),
  ).annotate({ identifier: "VpcSecurityGroupMembership" }),
);
export interface DBClusterRole {
  RoleArn?: string;
  Status?: string;
}
export const DBClusterRole = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({ identifier: "DBClusterRole" }) as any as S.Schema<DBClusterRole>;
export type DBClusterRoles = DBClusterRole[];
export const DBClusterRoles = /*@__PURE__*/ S.Array(
  DBClusterRole.pipe(T.XmlName("DBClusterRole")).annotate({
    identifier: "DBClusterRole",
  }),
);
export interface ServerlessV2ScalingConfigurationInfo {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export const ServerlessV2ScalingConfigurationInfo = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MinCapacity: S.optional(S.Number),
      MaxCapacity: S.optional(S.Number),
    }),
).annotate({
  identifier: "ServerlessV2ScalingConfigurationInfo",
}) as any as S.Schema<ServerlessV2ScalingConfigurationInfo>;
export interface ClusterMasterUserSecret {
  SecretArn?: string;
  SecretStatus?: string;
  KmsKeyId?: string;
}
export const ClusterMasterUserSecret = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretArn: S.optional(S.String),
    SecretStatus: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterMasterUserSecret",
}) as any as S.Schema<ClusterMasterUserSecret>;
export interface DBCluster {
  AvailabilityZones?: string[];
  BackupRetentionPeriod?: number;
  DBClusterIdentifier?: string;
  DBClusterParameterGroup?: string;
  DBSubnetGroup?: string;
  Status?: string;
  PercentProgress?: string;
  EarliestRestorableTime?: Date;
  Endpoint?: string;
  ReaderEndpoint?: string;
  MultiAZ?: boolean;
  Engine?: string;
  EngineVersion?: string;
  LatestRestorableTime?: Date;
  Port?: number;
  MasterUsername?: string;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  ReplicationSourceIdentifier?: string;
  ReadReplicaIdentifiers?: string[];
  DBClusterMembers?: DBClusterMember[];
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  HostedZoneId?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbClusterResourceId?: string;
  DBClusterArn?: string;
  AssociatedRoles?: DBClusterRole[];
  CloneGroupId?: string;
  ClusterCreateTime?: Date;
  EnabledCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  IOOptimizedNextAllowedModificationTime?: Date;
  StorageType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfigurationInfo;
  MasterUserSecret?: ClusterMasterUserSecret;
  NetworkType?: string;
}
export const DBCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(AvailabilityZones),
    BackupRetentionPeriod: S.optional(S.Number),
    DBClusterIdentifier: S.optional(S.String),
    DBClusterParameterGroup: S.optional(S.String),
    DBSubnetGroup: S.optional(S.String),
    Status: S.optional(S.String),
    PercentProgress: S.optional(S.String),
    EarliestRestorableTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Endpoint: S.optional(S.String),
    ReaderEndpoint: S.optional(S.String),
    MultiAZ: S.optional(S.Boolean),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    LatestRestorableTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Port: S.optional(S.Number),
    MasterUsername: S.optional(S.String),
    PreferredBackupWindow: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    ReplicationSourceIdentifier: S.optional(S.String),
    ReadReplicaIdentifiers: S.optional(ReadReplicaIdentifierList),
    DBClusterMembers: S.optional(DBClusterMemberList),
    VpcSecurityGroups: S.optional(VpcSecurityGroupMembershipList),
    HostedZoneId: S.optional(S.String),
    StorageEncrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    DbClusterResourceId: S.optional(S.String),
    DBClusterArn: S.optional(S.String),
    AssociatedRoles: S.optional(DBClusterRoles),
    CloneGroupId: S.optional(S.String),
    ClusterCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EnabledCloudwatchLogsExports: S.optional(LogTypeList),
    DeletionProtection: S.optional(S.Boolean),
    IOOptimizedNextAllowedModificationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StorageType: S.optional(S.String),
    ServerlessV2ScalingConfiguration: S.optional(
      ServerlessV2ScalingConfigurationInfo,
    ),
    MasterUserSecret: S.optional(ClusterMasterUserSecret),
    NetworkType: S.optional(S.String),
  }),
).annotate({ identifier: "DBCluster" }) as any as S.Schema<DBCluster>;
export interface CreateDBClusterResult {
  DBCluster?: DBCluster;
}
export const CreateDBClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "CreateDBClusterResult",
}) as any as S.Schema<CreateDBClusterResult>;
export interface CreateDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
  DBParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateDBClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DBClusterParameterGroupName: S.optional(S.String),
      DBParameterGroupFamily: S.optional(S.String),
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
  identifier: "CreateDBClusterParameterGroupMessage",
}) as any as S.Schema<CreateDBClusterParameterGroupMessage>;
export interface CreateDBClusterParameterGroupResult {
  DBClusterParameterGroup?: DBClusterParameterGroup;
}
export const CreateDBClusterParameterGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterParameterGroup: S.optional(DBClusterParameterGroup),
  }).pipe(ns),
).annotate({
  identifier: "CreateDBClusterParameterGroupResult",
}) as any as S.Schema<CreateDBClusterParameterGroupResult>;
export interface CreateDBClusterSnapshotMessage {
  DBClusterSnapshotIdentifier?: string;
  DBClusterIdentifier?: string;
  Tags?: Tag[];
}
export const CreateDBClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterSnapshotIdentifier: S.optional(S.String),
    DBClusterIdentifier: S.optional(S.String),
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
  identifier: "CreateDBClusterSnapshotMessage",
}) as any as S.Schema<CreateDBClusterSnapshotMessage>;
export interface CreateDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export const CreateDBClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterSnapshot: S.optional(DBClusterSnapshot) }).pipe(ns),
).annotate({
  identifier: "CreateDBClusterSnapshotResult",
}) as any as S.Schema<CreateDBClusterSnapshotResult>;
export interface CreateDBInstanceMessage {
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  Engine?: string;
  AvailabilityZone?: string;
  PreferredMaintenanceWindow?: string;
  AutoMinorVersionUpgrade?: boolean;
  Tags?: Tag[];
  DBClusterIdentifier?: string;
  CopyTagsToSnapshot?: boolean;
  PromotionTier?: number;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  CACertificateIdentifier?: string;
}
export const CreateDBInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceIdentifier: S.optional(S.String),
    DBInstanceClass: S.optional(S.String),
    Engine: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    DBClusterIdentifier: S.optional(S.String),
    CopyTagsToSnapshot: S.optional(S.Boolean),
    PromotionTier: S.optional(S.Number),
    EnablePerformanceInsights: S.optional(S.Boolean),
    PerformanceInsightsKMSKeyId: S.optional(S.String),
    CACertificateIdentifier: S.optional(S.String),
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
  identifier: "CreateDBInstanceMessage",
}) as any as S.Schema<CreateDBInstanceMessage>;
export interface Endpoint {
  Address?: string;
  Port?: number;
  HostedZoneId?: string;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Port: S.optional(S.Number),
    HostedZoneId: S.optional(S.String),
  }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export interface AvailabilityZone {
  Name?: string;
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
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
export type NetworkTypeList = string[];
export const NetworkTypeList = /*@__PURE__*/ S.Array(S.String);
export interface DBSubnetGroup {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  VpcId?: string;
  SubnetGroupStatus?: string;
  Subnets?: Subnet[];
  DBSubnetGroupArn?: string;
  SupportedNetworkTypes?: string[];
}
export const DBSubnetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBSubnetGroupName: S.optional(S.String),
    DBSubnetGroupDescription: S.optional(S.String),
    VpcId: S.optional(S.String),
    SubnetGroupStatus: S.optional(S.String),
    Subnets: S.optional(SubnetList),
    DBSubnetGroupArn: S.optional(S.String),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({ identifier: "DBSubnetGroup" }) as any as S.Schema<DBSubnetGroup>;
export interface PendingCloudwatchLogsExports {
  LogTypesToEnable?: string[];
  LogTypesToDisable?: string[];
}
export const PendingCloudwatchLogsExports = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogTypesToEnable: S.optional(LogTypeList),
    LogTypesToDisable: S.optional(LogTypeList),
  }),
).annotate({
  identifier: "PendingCloudwatchLogsExports",
}) as any as S.Schema<PendingCloudwatchLogsExports>;
export interface PendingModifiedValues {
  DBInstanceClass?: string;
  AllocatedStorage?: number;
  MasterUserPassword?: string | redacted.Redacted<string>;
  Port?: number;
  BackupRetentionPeriod?: number;
  MultiAZ?: boolean;
  EngineVersion?: string;
  LicenseModel?: string;
  Iops?: number;
  DBInstanceIdentifier?: string;
  StorageType?: string;
  CACertificateIdentifier?: string;
  DBSubnetGroupName?: string;
  PendingCloudwatchLogsExports?: PendingCloudwatchLogsExports;
}
export const PendingModifiedValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceClass: S.optional(S.String),
    AllocatedStorage: S.optional(S.Number),
    MasterUserPassword: S.optional(SensitiveString),
    Port: S.optional(S.Number),
    BackupRetentionPeriod: S.optional(S.Number),
    MultiAZ: S.optional(S.Boolean),
    EngineVersion: S.optional(S.String),
    LicenseModel: S.optional(S.String),
    Iops: S.optional(S.Number),
    DBInstanceIdentifier: S.optional(S.String),
    StorageType: S.optional(S.String),
    CACertificateIdentifier: S.optional(S.String),
    DBSubnetGroupName: S.optional(S.String),
    PendingCloudwatchLogsExports: S.optional(PendingCloudwatchLogsExports),
  }),
).annotate({
  identifier: "PendingModifiedValues",
}) as any as S.Schema<PendingModifiedValues>;
export interface DBInstanceStatusInfo {
  StatusType?: string;
  Normal?: boolean;
  Status?: string;
  Message?: string;
}
export const DBInstanceStatusInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusType: S.optional(S.String),
    Normal: S.optional(S.Boolean),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "DBInstanceStatusInfo",
}) as any as S.Schema<DBInstanceStatusInfo>;
export type DBInstanceStatusInfoList = DBInstanceStatusInfo[];
export const DBInstanceStatusInfoList = /*@__PURE__*/ S.Array(
  DBInstanceStatusInfo.pipe(T.XmlName("DBInstanceStatusInfo")).annotate({
    identifier: "DBInstanceStatusInfo",
  }),
);
export interface CertificateDetails {
  CAIdentifier?: string;
  ValidTill?: Date;
}
export const CertificateDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CAIdentifier: S.optional(S.String),
    ValidTill: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CertificateDetails",
}) as any as S.Schema<CertificateDetails>;
export interface DBInstance {
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  Engine?: string;
  DBInstanceStatus?: string;
  Endpoint?: Endpoint;
  InstanceCreateTime?: Date;
  PreferredBackupWindow?: string;
  BackupRetentionPeriod?: number;
  VpcSecurityGroups?: VpcSecurityGroupMembership[];
  AvailabilityZone?: string;
  DBSubnetGroup?: DBSubnetGroup;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  LatestRestorableTime?: Date;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  PubliclyAccessible?: boolean;
  StatusInfos?: DBInstanceStatusInfo[];
  DBClusterIdentifier?: string;
  StorageEncrypted?: boolean;
  KmsKeyId?: string;
  DbiResourceId?: string;
  CACertificateIdentifier?: string;
  CopyTagsToSnapshot?: boolean;
  PromotionTier?: number;
  DBInstanceArn?: string;
  EnabledCloudwatchLogsExports?: string[];
  CertificateDetails?: CertificateDetails;
  PerformanceInsightsEnabled?: boolean;
  PerformanceInsightsKMSKeyId?: string;
}
export const DBInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceIdentifier: S.optional(S.String),
    DBInstanceClass: S.optional(S.String),
    Engine: S.optional(S.String),
    DBInstanceStatus: S.optional(S.String),
    Endpoint: S.optional(Endpoint),
    InstanceCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PreferredBackupWindow: S.optional(S.String),
    BackupRetentionPeriod: S.optional(S.Number),
    VpcSecurityGroups: S.optional(VpcSecurityGroupMembershipList),
    AvailabilityZone: S.optional(S.String),
    DBSubnetGroup: S.optional(DBSubnetGroup),
    PreferredMaintenanceWindow: S.optional(S.String),
    PendingModifiedValues: S.optional(PendingModifiedValues),
    LatestRestorableTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EngineVersion: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    PubliclyAccessible: S.optional(S.Boolean),
    StatusInfos: S.optional(DBInstanceStatusInfoList),
    DBClusterIdentifier: S.optional(S.String),
    StorageEncrypted: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    DbiResourceId: S.optional(S.String),
    CACertificateIdentifier: S.optional(S.String),
    CopyTagsToSnapshot: S.optional(S.Boolean),
    PromotionTier: S.optional(S.Number),
    DBInstanceArn: S.optional(S.String),
    EnabledCloudwatchLogsExports: S.optional(LogTypeList),
    CertificateDetails: S.optional(CertificateDetails),
    PerformanceInsightsEnabled: S.optional(S.Boolean),
    PerformanceInsightsKMSKeyId: S.optional(S.String),
  }),
).annotate({ identifier: "DBInstance" }) as any as S.Schema<DBInstance>;
export interface CreateDBInstanceResult {
  DBInstance?: DBInstance;
}
export const CreateDBInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBInstance: S.optional(DBInstance) }).pipe(ns),
).annotate({
  identifier: "CreateDBInstanceResult",
}) as any as S.Schema<CreateDBInstanceResult>;
export type SubnetIdentifierList = string[];
export const SubnetIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SubnetIdentifier")),
);
export interface CreateDBSubnetGroupMessage {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export const CreateDBSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBSubnetGroupName: S.optional(S.String),
    DBSubnetGroupDescription: S.optional(S.String),
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
  identifier: "CreateDBSubnetGroupMessage",
}) as any as S.Schema<CreateDBSubnetGroupMessage>;
export interface CreateDBSubnetGroupResult {
  DBSubnetGroup?: DBSubnetGroup;
}
export const CreateDBSubnetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBSubnetGroup: S.optional(DBSubnetGroup) }).pipe(ns),
).annotate({
  identifier: "CreateDBSubnetGroupResult",
}) as any as S.Schema<CreateDBSubnetGroupResult>;
export interface CreateEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  EventCategories?: string[];
  SourceIds?: string[];
  Enabled?: boolean;
  Tags?: Tag[];
}
export const CreateEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SourceType: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    SourceIds: S.optional(SourceIdsList),
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
export interface CreateEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export const CreateEventSubscriptionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "CreateEventSubscriptionResult",
}) as any as S.Schema<CreateEventSubscriptionResult>;
export interface CreateGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  SourceDBClusterIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  DeletionProtection?: boolean;
  DatabaseName?: string;
  StorageEncrypted?: boolean;
}
export const CreateGlobalClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    SourceDBClusterIdentifier: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DeletionProtection: S.optional(S.Boolean),
    DatabaseName: S.optional(S.String),
    StorageEncrypted: S.optional(S.Boolean),
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
  identifier: "CreateGlobalClusterMessage",
}) as any as S.Schema<CreateGlobalClusterMessage>;
export type ReadersArnList = string[];
export const ReadersArnList = /*@__PURE__*/ S.Array(S.String);
export type GlobalClusterMemberSynchronizationStatus =
  | "connected"
  | "pending-resync"
  | (string & {});
export const GlobalClusterMemberSynchronizationStatus = S.String;

export interface GlobalClusterMember {
  DBClusterArn?: string;
  Readers?: string[];
  IsWriter?: boolean;
  SynchronizationStatus?: GlobalClusterMemberSynchronizationStatus;
}
export const GlobalClusterMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterArn: S.optional(S.String),
    Readers: S.optional(ReadersArnList),
    IsWriter: S.optional(S.Boolean),
    SynchronizationStatus: S.optional(GlobalClusterMemberSynchronizationStatus),
  }),
).annotate({
  identifier: "GlobalClusterMember",
}) as any as S.Schema<GlobalClusterMember>;
export type GlobalClusterMemberList = GlobalClusterMember[];
export const GlobalClusterMemberList = /*@__PURE__*/ S.Array(
  GlobalClusterMember.pipe(T.XmlName("GlobalClusterMember")).annotate({
    identifier: "GlobalClusterMember",
  }),
);
export type FailoverStatus =
  | "pending"
  | "failing-over"
  | "cancelling"
  | (string & {});
export const FailoverStatus = S.String;

export interface FailoverState {
  Status?: FailoverStatus;
  FromDbClusterArn?: string;
  ToDbClusterArn?: string;
  IsDataLossAllowed?: boolean;
}
export const FailoverState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(FailoverStatus),
    FromDbClusterArn: S.optional(S.String),
    ToDbClusterArn: S.optional(S.String),
    IsDataLossAllowed: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FailoverState" }) as any as S.Schema<FailoverState>;
export interface GlobalCluster {
  GlobalClusterIdentifier?: string;
  GlobalClusterResourceId?: string;
  GlobalClusterArn?: string;
  Status?: string;
  Engine?: string;
  EngineVersion?: string;
  DatabaseName?: string;
  StorageEncrypted?: boolean;
  DeletionProtection?: boolean;
  GlobalClusterMembers?: GlobalClusterMember[];
  FailoverState?: FailoverState;
  TagList?: Tag[];
}
export const GlobalCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    GlobalClusterResourceId: S.optional(S.String),
    GlobalClusterArn: S.optional(S.String),
    Status: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    StorageEncrypted: S.optional(S.Boolean),
    DeletionProtection: S.optional(S.Boolean),
    GlobalClusterMembers: S.optional(GlobalClusterMemberList),
    FailoverState: S.optional(FailoverState),
    TagList: S.optional(TagList),
  }),
).annotate({ identifier: "GlobalCluster" }) as any as S.Schema<GlobalCluster>;
export interface CreateGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export const CreateGlobalClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalCluster: S.optional(GlobalCluster) }).pipe(ns),
).annotate({
  identifier: "CreateGlobalClusterResult",
}) as any as S.Schema<CreateGlobalClusterResult>;
export interface DeleteDBClusterMessage {
  DBClusterIdentifier?: string;
  SkipFinalSnapshot?: boolean;
  FinalDBSnapshotIdentifier?: string;
}
export const DeleteDBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterIdentifier: S.optional(S.String),
    SkipFinalSnapshot: S.optional(S.Boolean),
    FinalDBSnapshotIdentifier: S.optional(S.String),
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
  identifier: "DeleteDBClusterMessage",
}) as any as S.Schema<DeleteDBClusterMessage>;
export interface DeleteDBClusterResult {
  DBCluster?: DBCluster;
}
export const DeleteDBClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "DeleteDBClusterResult",
}) as any as S.Schema<DeleteDBClusterResult>;
export interface DeleteDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
}
export const DeleteDBClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DBClusterParameterGroupName: S.optional(S.String) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteDBClusterParameterGroupMessage",
}) as any as S.Schema<DeleteDBClusterParameterGroupMessage>;
export interface DeleteDBClusterParameterGroupResponse {}
export const DeleteDBClusterParameterGroupResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDBClusterParameterGroupResponse",
}) as any as S.Schema<DeleteDBClusterParameterGroupResponse>;
export interface DeleteDBClusterSnapshotMessage {
  DBClusterSnapshotIdentifier?: string;
}
export const DeleteDBClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDBClusterSnapshotMessage",
}) as any as S.Schema<DeleteDBClusterSnapshotMessage>;
export interface DeleteDBClusterSnapshotResult {
  DBClusterSnapshot?: DBClusterSnapshot;
}
export const DeleteDBClusterSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterSnapshot: S.optional(DBClusterSnapshot) }).pipe(ns),
).annotate({
  identifier: "DeleteDBClusterSnapshotResult",
}) as any as S.Schema<DeleteDBClusterSnapshotResult>;
export interface DeleteDBInstanceMessage {
  DBInstanceIdentifier?: string;
}
export const DeleteDBInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBInstanceIdentifier: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDBInstanceMessage",
}) as any as S.Schema<DeleteDBInstanceMessage>;
export interface DeleteDBInstanceResult {
  DBInstance?: DBInstance;
}
export const DeleteDBInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBInstance: S.optional(DBInstance) }).pipe(ns),
).annotate({
  identifier: "DeleteDBInstanceResult",
}) as any as S.Schema<DeleteDBInstanceResult>;
export interface DeleteDBSubnetGroupMessage {
  DBSubnetGroupName?: string;
}
export const DeleteDBSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBSubnetGroupName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDBSubnetGroupMessage",
}) as any as S.Schema<DeleteDBSubnetGroupMessage>;
export interface DeleteDBSubnetGroupResponse {}
export const DeleteDBSubnetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDBSubnetGroupResponse",
}) as any as S.Schema<DeleteDBSubnetGroupResponse>;
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
export interface DeleteEventSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export const DeleteEventSubscriptionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
).annotate({
  identifier: "DeleteEventSubscriptionResult",
}) as any as S.Schema<DeleteEventSubscriptionResult>;
export interface DeleteGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
}
export const DeleteGlobalClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalClusterIdentifier: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlobalClusterMessage",
}) as any as S.Schema<DeleteGlobalClusterMessage>;
export interface DeleteGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export const DeleteGlobalClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalCluster: S.optional(GlobalCluster) }).pipe(ns),
).annotate({
  identifier: "DeleteGlobalClusterResult",
}) as any as S.Schema<DeleteGlobalClusterResult>;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Value")),
);
export interface Filter {
  Name?: string;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Values: S.optional(FilterValueList) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(
  Filter.pipe(T.XmlName("Filter")).annotate({ identifier: "Filter" }),
);
export interface DescribeCertificatesMessage {
  CertificateIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCertificatesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateIdentifier: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeCertificatesMessage",
}) as any as S.Schema<DescribeCertificatesMessage>;
export interface Certificate {
  CertificateIdentifier?: string;
  CertificateType?: string;
  Thumbprint?: string;
  ValidFrom?: Date;
  ValidTill?: Date;
  CertificateArn?: string;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateIdentifier: S.optional(S.String),
    CertificateType: S.optional(S.String),
    Thumbprint: S.optional(S.String),
    ValidFrom: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ValidTill: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CertificateArn: S.optional(S.String),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export type CertificateList = Certificate[];
export const CertificateList = /*@__PURE__*/ S.Array(
  Certificate.pipe(T.XmlName("Certificate")).annotate({
    identifier: "Certificate",
  }),
);
export interface CertificateMessage {
  Certificates?: Certificate[];
  Marker?: string;
}
export const CertificateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Certificates: S.optional(CertificateList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CertificateMessage",
}) as any as S.Schema<CertificateMessage>;
export interface DescribeDBClusterParameterGroupsMessage {
  DBClusterParameterGroupName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDBClusterParameterGroupsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DBClusterParameterGroupName: S.optional(S.String),
      Filters: S.optional(FilterList),
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
  identifier: "DescribeDBClusterParameterGroupsMessage",
}) as any as S.Schema<DescribeDBClusterParameterGroupsMessage>;
export type DBClusterParameterGroupList = DBClusterParameterGroup[];
export const DBClusterParameterGroupList = /*@__PURE__*/ S.Array(
  DBClusterParameterGroup.pipe(T.XmlName("DBClusterParameterGroup")).annotate({
    identifier: "DBClusterParameterGroup",
  }),
);
export interface DBClusterParameterGroupsMessage {
  Marker?: string;
  DBClusterParameterGroups?: DBClusterParameterGroup[];
}
export const DBClusterParameterGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DBClusterParameterGroups: S.optional(DBClusterParameterGroupList),
  }).pipe(ns),
).annotate({
  identifier: "DBClusterParameterGroupsMessage",
}) as any as S.Schema<DBClusterParameterGroupsMessage>;
export interface DescribeDBClusterParametersMessage {
  DBClusterParameterGroupName?: string;
  Source?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDBClusterParametersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterParameterGroupName: S.optional(S.String),
    Source: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeDBClusterParametersMessage",
}) as any as S.Schema<DescribeDBClusterParametersMessage>;
export type ApplyMethod = "immediate" | "pending-reboot" | (string & {});
export const ApplyMethod = S.String;

export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  ApplyType?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
  ApplyMethod?: ApplyMethod;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
    Description: S.optional(S.String),
    Source: S.optional(S.String),
    ApplyType: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    IsModifiable: S.optional(S.Boolean),
    MinimumEngineVersion: S.optional(S.String),
    ApplyMethod: S.optional(ApplyMethod),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParametersList = Parameter[];
export const ParametersList = /*@__PURE__*/ S.Array(
  Parameter.pipe(T.XmlName("Parameter")).annotate({ identifier: "Parameter" }),
);
export interface DBClusterParameterGroupDetails {
  Parameters?: Parameter[];
  Marker?: string;
}
export const DBClusterParameterGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParametersList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DBClusterParameterGroupDetails",
}) as any as S.Schema<DBClusterParameterGroupDetails>;
export interface DescribeDBClustersMessage {
  DBClusterIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDBClustersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterIdentifier: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeDBClustersMessage",
}) as any as S.Schema<DescribeDBClustersMessage>;
export type DBClusterList = DBCluster[];
export const DBClusterList = /*@__PURE__*/ S.Array(
  DBCluster.pipe(T.XmlName("DBCluster")).annotate({ identifier: "DBCluster" }),
);
export interface DBClusterMessage {
  Marker?: string;
  DBClusters?: DBCluster[];
}
export const DBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DBClusters: S.optional(DBClusterList),
  }).pipe(ns),
).annotate({
  identifier: "DBClusterMessage",
}) as any as S.Schema<DBClusterMessage>;
export interface DescribeDBClusterSnapshotAttributesMessage {
  DBClusterSnapshotIdentifier?: string;
}
export const DescribeDBClusterSnapshotAttributesMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DBClusterSnapshotIdentifier: S.optional(S.String) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeDBClusterSnapshotAttributesMessage",
  }) as any as S.Schema<DescribeDBClusterSnapshotAttributesMessage>;
export type AttributeValueList = string[];
export const AttributeValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("AttributeValue")),
);
export interface DBClusterSnapshotAttribute {
  AttributeName?: string;
  AttributeValues?: string[];
}
export const DBClusterSnapshotAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    AttributeValues: S.optional(AttributeValueList),
  }),
).annotate({
  identifier: "DBClusterSnapshotAttribute",
}) as any as S.Schema<DBClusterSnapshotAttribute>;
export type DBClusterSnapshotAttributeList = DBClusterSnapshotAttribute[];
export const DBClusterSnapshotAttributeList = /*@__PURE__*/ S.Array(
  DBClusterSnapshotAttribute.pipe(
    T.XmlName("DBClusterSnapshotAttribute"),
  ).annotate({ identifier: "DBClusterSnapshotAttribute" }),
);
export interface DBClusterSnapshotAttributesResult {
  DBClusterSnapshotIdentifier?: string;
  DBClusterSnapshotAttributes?: DBClusterSnapshotAttribute[];
}
export const DBClusterSnapshotAttributesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterSnapshotIdentifier: S.optional(S.String),
    DBClusterSnapshotAttributes: S.optional(DBClusterSnapshotAttributeList),
  }),
).annotate({
  identifier: "DBClusterSnapshotAttributesResult",
}) as any as S.Schema<DBClusterSnapshotAttributesResult>;
export interface DescribeDBClusterSnapshotAttributesResult {
  DBClusterSnapshotAttributesResult?: DBClusterSnapshotAttributesResult;
}
export const DescribeDBClusterSnapshotAttributesResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DBClusterSnapshotAttributesResult: S.optional(
        DBClusterSnapshotAttributesResult,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeDBClusterSnapshotAttributesResult",
  }) as any as S.Schema<DescribeDBClusterSnapshotAttributesResult>;
export interface DescribeDBClusterSnapshotsMessage {
  DBClusterIdentifier?: string;
  DBClusterSnapshotIdentifier?: string;
  SnapshotType?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  IncludeShared?: boolean;
  IncludePublic?: boolean;
}
export const DescribeDBClusterSnapshotsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterIdentifier: S.optional(S.String),
    DBClusterSnapshotIdentifier: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    IncludeShared: S.optional(S.Boolean),
    IncludePublic: S.optional(S.Boolean),
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
  identifier: "DescribeDBClusterSnapshotsMessage",
}) as any as S.Schema<DescribeDBClusterSnapshotsMessage>;
export type DBClusterSnapshotList = DBClusterSnapshot[];
export const DBClusterSnapshotList = /*@__PURE__*/ S.Array(
  DBClusterSnapshot.pipe(T.XmlName("DBClusterSnapshot")).annotate({
    identifier: "DBClusterSnapshot",
  }),
);
export interface DBClusterSnapshotMessage {
  Marker?: string;
  DBClusterSnapshots?: DBClusterSnapshot[];
}
export const DBClusterSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DBClusterSnapshots: S.optional(DBClusterSnapshotList),
  }).pipe(ns),
).annotate({
  identifier: "DBClusterSnapshotMessage",
}) as any as S.Schema<DBClusterSnapshotMessage>;
export interface DescribeDBEngineVersionsMessage {
  Engine?: string;
  EngineVersion?: string;
  DBParameterGroupFamily?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
  DefaultOnly?: boolean;
  ListSupportedCharacterSets?: boolean;
  ListSupportedTimezones?: boolean;
}
export const DescribeDBEngineVersionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DBParameterGroupFamily: S.optional(S.String),
    Filters: S.optional(FilterList),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    DefaultOnly: S.optional(S.Boolean),
    ListSupportedCharacterSets: S.optional(S.Boolean),
    ListSupportedTimezones: S.optional(S.Boolean),
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
  identifier: "DescribeDBEngineVersionsMessage",
}) as any as S.Schema<DescribeDBEngineVersionsMessage>;
export interface UpgradeTarget {
  Engine?: string;
  EngineVersion?: string;
  Description?: string;
  AutoUpgrade?: boolean;
  IsMajorVersionUpgrade?: boolean;
}
export const UpgradeTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    Description: S.optional(S.String),
    AutoUpgrade: S.optional(S.Boolean),
    IsMajorVersionUpgrade: S.optional(S.Boolean),
  }),
).annotate({ identifier: "UpgradeTarget" }) as any as S.Schema<UpgradeTarget>;
export type ValidUpgradeTargetList = UpgradeTarget[];
export const ValidUpgradeTargetList = /*@__PURE__*/ S.Array(
  UpgradeTarget.pipe(T.XmlName("UpgradeTarget")).annotate({
    identifier: "UpgradeTarget",
  }),
);
export type CACertificateIdentifiersList = string[];
export const CACertificateIdentifiersList = /*@__PURE__*/ S.Array(S.String);
export interface ServerlessV2FeaturesSupport {
  MinCapacity?: number;
  MaxCapacity?: number;
}
export const ServerlessV2FeaturesSupport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinCapacity: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServerlessV2FeaturesSupport",
}) as any as S.Schema<ServerlessV2FeaturesSupport>;
export interface DBEngineVersion {
  Engine?: string;
  EngineVersion?: string;
  DBParameterGroupFamily?: string;
  DBEngineDescription?: string;
  DBEngineVersionDescription?: string;
  ValidUpgradeTarget?: UpgradeTarget[];
  ExportableLogTypes?: string[];
  SupportsLogExportsToCloudwatchLogs?: boolean;
  SupportedCACertificateIdentifiers?: string[];
  SupportsCertificateRotationWithoutRestart?: boolean;
  ServerlessV2FeaturesSupport?: ServerlessV2FeaturesSupport;
}
export const DBEngineVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DBParameterGroupFamily: S.optional(S.String),
    DBEngineDescription: S.optional(S.String),
    DBEngineVersionDescription: S.optional(S.String),
    ValidUpgradeTarget: S.optional(ValidUpgradeTargetList),
    ExportableLogTypes: S.optional(LogTypeList),
    SupportsLogExportsToCloudwatchLogs: S.optional(S.Boolean),
    SupportedCACertificateIdentifiers: S.optional(CACertificateIdentifiersList),
    SupportsCertificateRotationWithoutRestart: S.optional(S.Boolean),
    ServerlessV2FeaturesSupport: S.optional(ServerlessV2FeaturesSupport),
  }),
).annotate({
  identifier: "DBEngineVersion",
}) as any as S.Schema<DBEngineVersion>;
export type DBEngineVersionList = DBEngineVersion[];
export const DBEngineVersionList = /*@__PURE__*/ S.Array(
  DBEngineVersion.pipe(T.XmlName("DBEngineVersion")).annotate({
    identifier: "DBEngineVersion",
  }),
);
export interface DBEngineVersionMessage {
  Marker?: string;
  DBEngineVersions?: DBEngineVersion[];
}
export const DBEngineVersionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DBEngineVersions: S.optional(DBEngineVersionList),
  }).pipe(ns),
).annotate({
  identifier: "DBEngineVersionMessage",
}) as any as S.Schema<DBEngineVersionMessage>;
export interface DescribeDBInstancesMessage {
  DBInstanceIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDBInstancesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceIdentifier: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeDBInstancesMessage",
}) as any as S.Schema<DescribeDBInstancesMessage>;
export type DBInstanceList = DBInstance[];
export const DBInstanceList = /*@__PURE__*/ S.Array(
  DBInstance.pipe(T.XmlName("DBInstance")).annotate({
    identifier: "DBInstance",
  }),
);
export interface DBInstanceMessage {
  Marker?: string;
  DBInstances?: DBInstance[];
}
export const DBInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DBInstances: S.optional(DBInstanceList),
  }).pipe(ns),
).annotate({
  identifier: "DBInstanceMessage",
}) as any as S.Schema<DBInstanceMessage>;
export interface DescribeDBSubnetGroupsMessage {
  DBSubnetGroupName?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeDBSubnetGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBSubnetGroupName: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeDBSubnetGroupsMessage",
}) as any as S.Schema<DescribeDBSubnetGroupsMessage>;
export type DBSubnetGroups = DBSubnetGroup[];
export const DBSubnetGroups = /*@__PURE__*/ S.Array(
  DBSubnetGroup.pipe(T.XmlName("DBSubnetGroup")).annotate({
    identifier: "DBSubnetGroup",
  }),
);
export interface DBSubnetGroupMessage {
  Marker?: string;
  DBSubnetGroups?: DBSubnetGroup[];
}
export const DBSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    DBSubnetGroups: S.optional(DBSubnetGroups),
  }).pipe(ns),
).annotate({
  identifier: "DBSubnetGroupMessage",
}) as any as S.Schema<DBSubnetGroupMessage>;
export interface DescribeEngineDefaultClusterParametersMessage {
  DBParameterGroupFamily?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEngineDefaultClusterParametersMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DBParameterGroupFamily: S.optional(S.String),
      Filters: S.optional(FilterList),
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
    identifier: "DescribeEngineDefaultClusterParametersMessage",
  }) as any as S.Schema<DescribeEngineDefaultClusterParametersMessage>;
export interface EngineDefaults {
  DBParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
}
export const EngineDefaults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBParameterGroupFamily: S.optional(S.String),
    Marker: S.optional(S.String),
    Parameters: S.optional(ParametersList),
  }),
).annotate({ identifier: "EngineDefaults" }) as any as S.Schema<EngineDefaults>;
export interface DescribeEngineDefaultClusterParametersResult {
  EngineDefaults?: EngineDefaults;
}
export const DescribeEngineDefaultClusterParametersResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EngineDefaults: S.optional(EngineDefaults) }).pipe(ns),
  ).annotate({
    identifier: "DescribeEngineDefaultClusterParametersResult",
  }) as any as S.Schema<DescribeEngineDefaultClusterParametersResult>;
export interface DescribeEventCategoriesMessage {
  SourceType?: string;
  Filters?: Filter[];
}
export const DescribeEventCategoriesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeEventCategoriesMessage",
}) as any as S.Schema<DescribeEventCategoriesMessage>;
export interface EventCategoriesMap {
  SourceType?: string;
  EventCategories?: string[];
}
export const EventCategoriesMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
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
  | "db-instance"
  | "db-parameter-group"
  | "db-security-group"
  | "db-snapshot"
  | "db-cluster"
  | "db-cluster-snapshot"
  | (string & {});
export const SourceType = S.String;

export interface DescribeEventsMessage {
  SourceIdentifier?: string;
  SourceType?: SourceType;
  StartTime?: Date;
  EndTime?: Date;
  Duration?: number;
  EventCategories?: string[];
  Filters?: Filter[];
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
    EventCategories: S.optional(EventCategoriesList),
    Filters: S.optional(FilterList),
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
  Date?: Date;
  SourceArn?: string;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIdentifier: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Message: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
    Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    SourceArn: S.optional(S.String),
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
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEventSubscriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    Filters: S.optional(FilterList),
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
export interface DescribeGlobalClustersMessage {
  GlobalClusterIdentifier?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeGlobalClustersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "DescribeGlobalClustersMessage",
}) as any as S.Schema<DescribeGlobalClustersMessage>;
export type GlobalClusterList = GlobalCluster[];
export const GlobalClusterList = /*@__PURE__*/ S.Array(
  GlobalCluster.pipe(T.XmlName("GlobalClusterMember")).annotate({
    identifier: "GlobalCluster",
  }),
);
export interface GlobalClustersMessage {
  Marker?: string;
  GlobalClusters?: GlobalCluster[];
}
export const GlobalClustersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    GlobalClusters: S.optional(GlobalClusterList),
  }).pipe(ns),
).annotate({
  identifier: "GlobalClustersMessage",
}) as any as S.Schema<GlobalClustersMessage>;
export interface DescribeOrderableDBInstanceOptionsMessage {
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  LicenseModel?: string;
  Vpc?: boolean;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeOrderableDBInstanceOptionsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Engine: S.optional(S.String),
      EngineVersion: S.optional(S.String),
      DBInstanceClass: S.optional(S.String),
      LicenseModel: S.optional(S.String),
      Vpc: S.optional(S.Boolean),
      Filters: S.optional(FilterList),
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
    identifier: "DescribeOrderableDBInstanceOptionsMessage",
  }) as any as S.Schema<DescribeOrderableDBInstanceOptionsMessage>;
export type AvailabilityZoneList = AvailabilityZone[];
export const AvailabilityZoneList = /*@__PURE__*/ S.Array(
  AvailabilityZone.pipe(T.XmlName("AvailabilityZone")).annotate({
    identifier: "AvailabilityZone",
  }),
);
export interface OrderableDBInstanceOption {
  Engine?: string;
  EngineVersion?: string;
  DBInstanceClass?: string;
  LicenseModel?: string;
  AvailabilityZones?: AvailabilityZone[];
  Vpc?: boolean;
  StorageType?: string;
}
export const OrderableDBInstanceOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DBInstanceClass: S.optional(S.String),
    LicenseModel: S.optional(S.String),
    AvailabilityZones: S.optional(AvailabilityZoneList),
    Vpc: S.optional(S.Boolean),
    StorageType: S.optional(S.String),
  }),
).annotate({
  identifier: "OrderableDBInstanceOption",
}) as any as S.Schema<OrderableDBInstanceOption>;
export type OrderableDBInstanceOptionsList = OrderableDBInstanceOption[];
export const OrderableDBInstanceOptionsList = /*@__PURE__*/ S.Array(
  OrderableDBInstanceOption.pipe(
    T.XmlName("OrderableDBInstanceOption"),
  ).annotate({ identifier: "OrderableDBInstanceOption" }),
);
export interface OrderableDBInstanceOptionsMessage {
  OrderableDBInstanceOptions?: OrderableDBInstanceOption[];
  Marker?: string;
}
export const OrderableDBInstanceOptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrderableDBInstanceOptions: S.optional(OrderableDBInstanceOptionsList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "OrderableDBInstanceOptionsMessage",
}) as any as S.Schema<OrderableDBInstanceOptionsMessage>;
export interface DescribePendingMaintenanceActionsMessage {
  ResourceIdentifier?: string;
  Filters?: Filter[];
  Marker?: string;
  MaxRecords?: number;
}
export const DescribePendingMaintenanceActionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceIdentifier: S.optional(S.String),
      Filters: S.optional(FilterList),
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
  identifier: "DescribePendingMaintenanceActionsMessage",
}) as any as S.Schema<DescribePendingMaintenanceActionsMessage>;
export type PendingMaintenanceActions = ResourcePendingMaintenanceActions[];
export const PendingMaintenanceActions = /*@__PURE__*/ S.Array(
  ResourcePendingMaintenanceActions.pipe(
    T.XmlName("ResourcePendingMaintenanceActions"),
  ).annotate({ identifier: "ResourcePendingMaintenanceActions" }),
);
export interface PendingMaintenanceActionsMessage {
  PendingMaintenanceActions?: ResourcePendingMaintenanceActions[];
  Marker?: string;
}
export const PendingMaintenanceActionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PendingMaintenanceActions: S.optional(PendingMaintenanceActions),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PendingMaintenanceActionsMessage",
}) as any as S.Schema<PendingMaintenanceActionsMessage>;
export interface FailoverDBClusterMessage {
  DBClusterIdentifier?: string;
  TargetDBInstanceIdentifier?: string;
}
export const FailoverDBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterIdentifier: S.optional(S.String),
    TargetDBInstanceIdentifier: S.optional(S.String),
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
  identifier: "FailoverDBClusterMessage",
}) as any as S.Schema<FailoverDBClusterMessage>;
export interface FailoverDBClusterResult {
  DBCluster?: DBCluster;
}
export const FailoverDBClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "FailoverDBClusterResult",
}) as any as S.Schema<FailoverDBClusterResult>;
export type DBClusterIdentifier = string;
export interface FailoverGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  TargetDbClusterIdentifier?: string;
  AllowDataLoss?: boolean;
  Switchover?: boolean;
}
export const FailoverGlobalClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    TargetDbClusterIdentifier: S.optional(S.String),
    AllowDataLoss: S.optional(S.Boolean),
    Switchover: S.optional(S.Boolean),
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
  identifier: "FailoverGlobalClusterMessage",
}) as any as S.Schema<FailoverGlobalClusterMessage>;
export interface FailoverGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export const FailoverGlobalClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalCluster: S.optional(GlobalCluster) }).pipe(ns),
).annotate({
  identifier: "FailoverGlobalClusterResult",
}) as any as S.Schema<FailoverGlobalClusterResult>;
export interface ListTagsForResourceMessage {
  ResourceName?: string;
  Filters?: Filter[];
}
export const ListTagsForResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
    Filters: S.optional(FilterList),
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
  identifier: "ListTagsForResourceMessage",
}) as any as S.Schema<ListTagsForResourceMessage>;
export interface TagListMessage {
  TagList?: Tag[];
}
export const TagListMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({ identifier: "TagListMessage" }) as any as S.Schema<TagListMessage>;
export interface CloudwatchLogsExportConfiguration {
  EnableLogTypes?: string[];
  DisableLogTypes?: string[];
}
export const CloudwatchLogsExportConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableLogTypes: S.optional(LogTypeList),
    DisableLogTypes: S.optional(LogTypeList),
  }),
).annotate({
  identifier: "CloudwatchLogsExportConfiguration",
}) as any as S.Schema<CloudwatchLogsExportConfiguration>;
export interface ModifyDBClusterMessage {
  DBClusterIdentifier?: string;
  NewDBClusterIdentifier?: string;
  ApplyImmediately?: boolean;
  BackupRetentionPeriod?: number;
  DBClusterParameterGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Port?: number;
  MasterUserPassword?: string | redacted.Redacted<string>;
  PreferredBackupWindow?: string;
  PreferredMaintenanceWindow?: string;
  CloudwatchLogsExportConfiguration?: CloudwatchLogsExportConfiguration;
  EngineVersion?: string;
  AllowMajorVersionUpgrade?: boolean;
  DeletionProtection?: boolean;
  StorageType?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  ManageMasterUserPassword?: boolean;
  MasterUserSecretKmsKeyId?: string;
  RotateMasterUserPassword?: boolean;
  NetworkType?: string;
}
export const ModifyDBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterIdentifier: S.optional(S.String),
    NewDBClusterIdentifier: S.optional(S.String),
    ApplyImmediately: S.optional(S.Boolean),
    BackupRetentionPeriod: S.optional(S.Number),
    DBClusterParameterGroupName: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    Port: S.optional(S.Number),
    MasterUserPassword: S.optional(SensitiveString),
    PreferredBackupWindow: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    CloudwatchLogsExportConfiguration: S.optional(
      CloudwatchLogsExportConfiguration,
    ),
    EngineVersion: S.optional(S.String),
    AllowMajorVersionUpgrade: S.optional(S.Boolean),
    DeletionProtection: S.optional(S.Boolean),
    StorageType: S.optional(S.String),
    ServerlessV2ScalingConfiguration: S.optional(
      ServerlessV2ScalingConfiguration,
    ),
    ManageMasterUserPassword: S.optional(S.Boolean),
    MasterUserSecretKmsKeyId: S.optional(S.String),
    RotateMasterUserPassword: S.optional(S.Boolean),
    NetworkType: S.optional(S.String),
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
  identifier: "ModifyDBClusterMessage",
}) as any as S.Schema<ModifyDBClusterMessage>;
export interface ModifyDBClusterResult {
  DBCluster?: DBCluster;
}
export const ModifyDBClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "ModifyDBClusterResult",
}) as any as S.Schema<ModifyDBClusterResult>;
export interface ModifyDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
  Parameters?: Parameter[];
}
export const ModifyDBClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DBClusterParameterGroupName: S.optional(S.String),
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
  identifier: "ModifyDBClusterParameterGroupMessage",
}) as any as S.Schema<ModifyDBClusterParameterGroupMessage>;
export interface DBClusterParameterGroupNameMessage {
  DBClusterParameterGroupName?: string;
}
export const DBClusterParameterGroupNameMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterParameterGroupName: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DBClusterParameterGroupNameMessage",
}) as any as S.Schema<DBClusterParameterGroupNameMessage>;
export interface ModifyDBClusterSnapshotAttributeMessage {
  DBClusterSnapshotIdentifier?: string;
  AttributeName?: string;
  ValuesToAdd?: string[];
  ValuesToRemove?: string[];
}
export const ModifyDBClusterSnapshotAttributeMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DBClusterSnapshotIdentifier: S.optional(S.String),
      AttributeName: S.optional(S.String),
      ValuesToAdd: S.optional(AttributeValueList),
      ValuesToRemove: S.optional(AttributeValueList),
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
  identifier: "ModifyDBClusterSnapshotAttributeMessage",
}) as any as S.Schema<ModifyDBClusterSnapshotAttributeMessage>;
export interface ModifyDBClusterSnapshotAttributeResult {
  DBClusterSnapshotAttributesResult?: DBClusterSnapshotAttributesResult;
}
export const ModifyDBClusterSnapshotAttributeResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DBClusterSnapshotAttributesResult: S.optional(
        DBClusterSnapshotAttributesResult,
      ),
    }).pipe(ns),
).annotate({
  identifier: "ModifyDBClusterSnapshotAttributeResult",
}) as any as S.Schema<ModifyDBClusterSnapshotAttributeResult>;
export interface ModifyDBInstanceMessage {
  DBInstanceIdentifier?: string;
  DBInstanceClass?: string;
  ApplyImmediately?: boolean;
  PreferredMaintenanceWindow?: string;
  AutoMinorVersionUpgrade?: boolean;
  NewDBInstanceIdentifier?: string;
  CACertificateIdentifier?: string;
  CopyTagsToSnapshot?: boolean;
  PromotionTier?: number;
  EnablePerformanceInsights?: boolean;
  PerformanceInsightsKMSKeyId?: string;
  CertificateRotationRestart?: boolean;
}
export const ModifyDBInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceIdentifier: S.optional(S.String),
    DBInstanceClass: S.optional(S.String),
    ApplyImmediately: S.optional(S.Boolean),
    PreferredMaintenanceWindow: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    NewDBInstanceIdentifier: S.optional(S.String),
    CACertificateIdentifier: S.optional(S.String),
    CopyTagsToSnapshot: S.optional(S.Boolean),
    PromotionTier: S.optional(S.Number),
    EnablePerformanceInsights: S.optional(S.Boolean),
    PerformanceInsightsKMSKeyId: S.optional(S.String),
    CertificateRotationRestart: S.optional(S.Boolean),
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
  identifier: "ModifyDBInstanceMessage",
}) as any as S.Schema<ModifyDBInstanceMessage>;
export interface ModifyDBInstanceResult {
  DBInstance?: DBInstance;
}
export const ModifyDBInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBInstance: S.optional(DBInstance) }).pipe(ns),
).annotate({
  identifier: "ModifyDBInstanceResult",
}) as any as S.Schema<ModifyDBInstanceResult>;
export interface ModifyDBSubnetGroupMessage {
  DBSubnetGroupName?: string;
  DBSubnetGroupDescription?: string;
  SubnetIds?: string[];
}
export const ModifyDBSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBSubnetGroupName: S.optional(S.String),
    DBSubnetGroupDescription: S.optional(S.String),
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
  identifier: "ModifyDBSubnetGroupMessage",
}) as any as S.Schema<ModifyDBSubnetGroupMessage>;
export interface ModifyDBSubnetGroupResult {
  DBSubnetGroup?: DBSubnetGroup;
}
export const ModifyDBSubnetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBSubnetGroup: S.optional(DBSubnetGroup) }).pipe(ns),
).annotate({
  identifier: "ModifyDBSubnetGroupResult",
}) as any as S.Schema<ModifyDBSubnetGroupResult>;
export interface ModifyEventSubscriptionMessage {
  SubscriptionName?: string;
  SnsTopicArn?: string;
  SourceType?: string;
  EventCategories?: string[];
  Enabled?: boolean;
}
export const ModifyEventSubscriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionName: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SourceType: S.optional(S.String),
    EventCategories: S.optional(EventCategoriesList),
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
export interface ModifyGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  NewGlobalClusterIdentifier?: string;
  DeletionProtection?: boolean;
}
export const ModifyGlobalClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    NewGlobalClusterIdentifier: S.optional(S.String),
    DeletionProtection: S.optional(S.Boolean),
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
  identifier: "ModifyGlobalClusterMessage",
}) as any as S.Schema<ModifyGlobalClusterMessage>;
export interface ModifyGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export const ModifyGlobalClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalCluster: S.optional(GlobalCluster) }).pipe(ns),
).annotate({
  identifier: "ModifyGlobalClusterResult",
}) as any as S.Schema<ModifyGlobalClusterResult>;
export interface RebootDBInstanceMessage {
  DBInstanceIdentifier?: string;
  ForceFailover?: boolean;
}
export const RebootDBInstanceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBInstanceIdentifier: S.optional(S.String),
    ForceFailover: S.optional(S.Boolean),
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
  identifier: "RebootDBInstanceMessage",
}) as any as S.Schema<RebootDBInstanceMessage>;
export interface RebootDBInstanceResult {
  DBInstance?: DBInstance;
}
export const RebootDBInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBInstance: S.optional(DBInstance) }).pipe(ns),
).annotate({
  identifier: "RebootDBInstanceResult",
}) as any as S.Schema<RebootDBInstanceResult>;
export interface RemoveFromGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  DbClusterIdentifier?: string;
}
export const RemoveFromGlobalClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    DbClusterIdentifier: S.optional(S.String),
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
  identifier: "RemoveFromGlobalClusterMessage",
}) as any as S.Schema<RemoveFromGlobalClusterMessage>;
export interface RemoveFromGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export const RemoveFromGlobalClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalCluster: S.optional(GlobalCluster) }).pipe(ns),
).annotate({
  identifier: "RemoveFromGlobalClusterResult",
}) as any as S.Schema<RemoveFromGlobalClusterResult>;
export interface RemoveSourceIdentifierFromSubscriptionMessage {
  SubscriptionName?: string;
  SourceIdentifier?: string;
}
export const RemoveSourceIdentifierFromSubscriptionMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SubscriptionName: S.optional(S.String),
      SourceIdentifier: S.optional(S.String),
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
    identifier: "RemoveSourceIdentifierFromSubscriptionMessage",
  }) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionMessage>;
export interface RemoveSourceIdentifierFromSubscriptionResult {
  EventSubscription?: EventSubscription;
}
export const RemoveSourceIdentifierFromSubscriptionResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EventSubscription: S.optional(EventSubscription) }).pipe(ns),
  ).annotate({
    identifier: "RemoveSourceIdentifierFromSubscriptionResult",
  }) as any as S.Schema<RemoveSourceIdentifierFromSubscriptionResult>;
export type KeyList = string[];
export const KeyList = /*@__PURE__*/ S.Array(S.String);
export interface RemoveTagsFromResourceMessage {
  ResourceName?: string;
  TagKeys?: string[];
}
export const RemoveTagsFromResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
    TagKeys: S.optional(KeyList),
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
  identifier: "RemoveTagsFromResourceMessage",
}) as any as S.Schema<RemoveTagsFromResourceMessage>;
export interface RemoveTagsFromResourceResponse {}
export const RemoveTagsFromResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsFromResourceResponse",
}) as any as S.Schema<RemoveTagsFromResourceResponse>;
export interface ResetDBClusterParameterGroupMessage {
  DBClusterParameterGroupName?: string;
  ResetAllParameters?: boolean;
  Parameters?: Parameter[];
}
export const ResetDBClusterParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DBClusterParameterGroupName: S.optional(S.String),
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
  identifier: "ResetDBClusterParameterGroupMessage",
}) as any as S.Schema<ResetDBClusterParameterGroupMessage>;
export interface RestoreDBClusterFromSnapshotMessage {
  AvailabilityZones?: string[];
  DBClusterIdentifier?: string;
  SnapshotIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  Port?: number;
  DBSubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  DBClusterParameterGroupName?: string;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
}
export const RestoreDBClusterFromSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(AvailabilityZones),
    DBClusterIdentifier: S.optional(S.String),
    SnapshotIdentifier: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    Port: S.optional(S.Number),
    DBSubnetGroupName: S.optional(S.String),
    VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
    Tags: S.optional(TagList),
    KmsKeyId: S.optional(S.String),
    EnableCloudwatchLogsExports: S.optional(LogTypeList),
    DeletionProtection: S.optional(S.Boolean),
    DBClusterParameterGroupName: S.optional(S.String),
    ServerlessV2ScalingConfiguration: S.optional(
      ServerlessV2ScalingConfiguration,
    ),
    StorageType: S.optional(S.String),
    NetworkType: S.optional(S.String),
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
  identifier: "RestoreDBClusterFromSnapshotMessage",
}) as any as S.Schema<RestoreDBClusterFromSnapshotMessage>;
export interface RestoreDBClusterFromSnapshotResult {
  DBCluster?: DBCluster;
}
export const RestoreDBClusterFromSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "RestoreDBClusterFromSnapshotResult",
}) as any as S.Schema<RestoreDBClusterFromSnapshotResult>;
export interface RestoreDBClusterToPointInTimeMessage {
  DBClusterIdentifier?: string;
  RestoreType?: string;
  SourceDBClusterIdentifier?: string;
  RestoreToTime?: Date;
  UseLatestRestorableTime?: boolean;
  Port?: number;
  DBSubnetGroupName?: string;
  VpcSecurityGroupIds?: string[];
  Tags?: Tag[];
  KmsKeyId?: string;
  EnableCloudwatchLogsExports?: string[];
  DeletionProtection?: boolean;
  ServerlessV2ScalingConfiguration?: ServerlessV2ScalingConfiguration;
  StorageType?: string;
  NetworkType?: string;
}
export const RestoreDBClusterToPointInTimeMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DBClusterIdentifier: S.optional(S.String),
      RestoreType: S.optional(S.String),
      SourceDBClusterIdentifier: S.optional(S.String),
      RestoreToTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      UseLatestRestorableTime: S.optional(S.Boolean),
      Port: S.optional(S.Number),
      DBSubnetGroupName: S.optional(S.String),
      VpcSecurityGroupIds: S.optional(VpcSecurityGroupIdList),
      Tags: S.optional(TagList),
      KmsKeyId: S.optional(S.String),
      EnableCloudwatchLogsExports: S.optional(LogTypeList),
      DeletionProtection: S.optional(S.Boolean),
      ServerlessV2ScalingConfiguration: S.optional(
        ServerlessV2ScalingConfiguration,
      ),
      StorageType: S.optional(S.String),
      NetworkType: S.optional(S.String),
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
  identifier: "RestoreDBClusterToPointInTimeMessage",
}) as any as S.Schema<RestoreDBClusterToPointInTimeMessage>;
export interface RestoreDBClusterToPointInTimeResult {
  DBCluster?: DBCluster;
}
export const RestoreDBClusterToPointInTimeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "RestoreDBClusterToPointInTimeResult",
}) as any as S.Schema<RestoreDBClusterToPointInTimeResult>;
export interface StartDBClusterMessage {
  DBClusterIdentifier?: string;
}
export const StartDBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDBClusterMessage",
}) as any as S.Schema<StartDBClusterMessage>;
export interface StartDBClusterResult {
  DBCluster?: DBCluster;
}
export const StartDBClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "StartDBClusterResult",
}) as any as S.Schema<StartDBClusterResult>;
export interface StopDBClusterMessage {
  DBClusterIdentifier?: string;
}
export const StopDBClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBClusterIdentifier: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDBClusterMessage",
}) as any as S.Schema<StopDBClusterMessage>;
export interface StopDBClusterResult {
  DBCluster?: DBCluster;
}
export const StopDBClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DBCluster: S.optional(DBCluster) }).pipe(ns),
).annotate({
  identifier: "StopDBClusterResult",
}) as any as S.Schema<StopDBClusterResult>;
export interface SwitchoverGlobalClusterMessage {
  GlobalClusterIdentifier?: string;
  TargetDbClusterIdentifier?: string;
}
export const SwitchoverGlobalClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalClusterIdentifier: S.optional(S.String),
    TargetDbClusterIdentifier: S.optional(S.String),
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
  identifier: "SwitchoverGlobalClusterMessage",
}) as any as S.Schema<SwitchoverGlobalClusterMessage>;
export interface SwitchoverGlobalClusterResult {
  GlobalCluster?: GlobalCluster;
}
export const SwitchoverGlobalClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalCluster: S.optional(GlobalCluster) }).pipe(ns),
).annotate({
  identifier: "SwitchoverGlobalClusterResult",
}) as any as S.Schema<SwitchoverGlobalClusterResult>;
export type ExceptionMessage = string;
export type AddSourceIdentifierToSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Adds a source identifier to an existing event notification
 * subscription.
 */
export const addSourceIdentifierToSubscription: API.OperationMethod<
  AddSourceIdentifierToSubscriptionMessage,
  AddSourceIdentifierToSubscriptionResult,
  AddSourceIdentifierToSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddSourceIdentifierToSubscriptionMessage,
  output: AddSourceIdentifierToSubscriptionResult,
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddSourceIdentifierToSubscription",
}));

export type AddTagsToResourceError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSnapshotNotFoundFault
  | CommonErrors;
/**
 * Adds metadata tags to an Amazon DocumentDB resource. You can use these tags
 * with cost allocation reporting to track costs that are associated
 * with Amazon DocumentDB resources or in a `Condition` statement in
 * an Identity and Access Management (IAM) policy for Amazon DocumentDB.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  AddTagsToResourceResponse,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsToResourceMessage,
  output: AddTagsToResourceResponse,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type ApplyPendingMaintenanceActionError =
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Applies a pending maintenance action to a resource (for example,
 * to an Amazon DocumentDB instance).
 */
export const applyPendingMaintenanceAction: API.OperationMethod<
  ApplyPendingMaintenanceActionMessage,
  ApplyPendingMaintenanceActionResult,
  ApplyPendingMaintenanceActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApplyPendingMaintenanceActionMessage,
  output: ApplyPendingMaintenanceActionResult,
  errors: [
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    ResourceNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyPendingMaintenanceAction",
}));

export type CopyDBClusterParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Copies the specified cluster parameter group.
 */
export const copyDBClusterParameterGroup: API.OperationMethod<
  CopyDBClusterParameterGroupMessage,
  CopyDBClusterParameterGroupResult,
  CopyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyDBClusterParameterGroupMessage,
  output: CopyDBClusterParameterGroupResult,
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBClusterParameterGroup",
}));

export type CopyDBClusterSnapshotError =
  | DBClusterSnapshotAlreadyExistsFault
  | DBClusterSnapshotNotFoundFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | KMSKeyNotAccessibleFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Copies a snapshot of a cluster.
 *
 * To copy a cluster snapshot from a shared manual cluster snapshot,
 * `SourceDBClusterSnapshotIdentifier` must be the Amazon
 * Resource Name (ARN) of the shared cluster snapshot. You can only
 * copy a shared DB cluster snapshot, whether encrypted or not, in the
 * same Amazon Web Services Region.
 *
 * To cancel the copy operation after it is in progress, delete the
 * target cluster snapshot identified by
 * `TargetDBClusterSnapshotIdentifier` while that cluster
 * snapshot is in the *copying* status.
 */
export const copyDBClusterSnapshot: API.OperationMethod<
  CopyDBClusterSnapshotMessage,
  CopyDBClusterSnapshotResult,
  CopyDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyDBClusterSnapshotMessage,
  output: CopyDBClusterSnapshotResult,
  errors: [
    DBClusterSnapshotAlreadyExistsFault,
    DBClusterSnapshotNotFoundFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    KMSKeyNotAccessibleFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyDBClusterSnapshot",
}));

export type CreateDBClusterError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBClusterQuotaExceededFault
  | DBInstanceNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | GlobalClusterNotFoundFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSubnetGroupStateFault
  | InvalidGlobalClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new Amazon DocumentDB cluster.
 */
export const createDBCluster: API.OperationMethod<
  CreateDBClusterMessage,
  CreateDBClusterResult,
  CreateDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDBClusterMessage,
  output: CreateDBClusterResult,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBClusterQuotaExceededFault,
    DBInstanceNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    GlobalClusterNotFoundFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSubnetGroupStateFault,
    InvalidGlobalClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBCluster",
}));

export type CreateDBClusterParameterGroupError =
  | DBParameterGroupAlreadyExistsFault
  | DBParameterGroupQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new cluster parameter group.
 *
 * Parameters in a cluster parameter group apply to all of the
 * instances in a cluster.
 *
 * A cluster parameter group is initially created with the default
 * parameters for the database engine used by instances in the cluster.
 * In Amazon DocumentDB, you cannot make modifications directly to the
 * `default.docdb3.6` cluster parameter group. If your
 * Amazon DocumentDB cluster is using the default cluster parameter group and you
 * want to modify a value in it, you must first
 * create a new parameter group
 * or
 * copy an existing parameter group,
 * modify it, and then apply the modified parameter group to your
 * cluster. For the new cluster parameter group and associated settings
 * to take effect, you must then reboot the instances in the cluster
 * without failover. For more information,
 * see
 * Modifying Amazon DocumentDB Cluster Parameter Groups.
 */
export const createDBClusterParameterGroup: API.OperationMethod<
  CreateDBClusterParameterGroupMessage,
  CreateDBClusterParameterGroupResult,
  CreateDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDBClusterParameterGroupMessage,
  output: CreateDBClusterParameterGroupResult,
  errors: [
    DBParameterGroupAlreadyExistsFault,
    DBParameterGroupQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBClusterParameterGroup",
}));

export type CreateDBClusterSnapshotError =
  | DBClusterNotFoundFault
  | DBClusterSnapshotAlreadyExistsFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Creates a snapshot of a cluster.
 */
export const createDBClusterSnapshot: API.OperationMethod<
  CreateDBClusterSnapshotMessage,
  CreateDBClusterSnapshotResult,
  CreateDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDBClusterSnapshotMessage,
  output: CreateDBClusterSnapshotResult,
  errors: [
    DBClusterNotFoundFault,
    DBClusterSnapshotAlreadyExistsFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBClusterSnapshot",
}));

export type CreateDBInstanceError =
  | AuthorizationNotFoundFault
  | DBClusterNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | InstanceQuotaExceededFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBClusterStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Creates a new instance.
 */
export const createDBInstance: API.OperationMethod<
  CreateDBInstanceMessage,
  CreateDBInstanceResult,
  CreateDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDBInstanceMessage,
  output: CreateDBInstanceResult,
  errors: [
    AuthorizationNotFoundFault,
    DBClusterNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    InstanceQuotaExceededFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBClusterStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBInstance",
}));

export type CreateDBSubnetGroupError =
  | DBSubnetGroupAlreadyExistsFault
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupQuotaExceededFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | CommonErrors;
/**
 * Creates a new subnet group. subnet groups must contain at least one subnet in at
 * least two Availability Zones in the Amazon Web Services Region.
 */
export const createDBSubnetGroup: API.OperationMethod<
  CreateDBSubnetGroupMessage,
  CreateDBSubnetGroupResult,
  CreateDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDBSubnetGroupMessage,
  output: CreateDBSubnetGroupResult,
  errors: [
    DBSubnetGroupAlreadyExistsFault,
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupQuotaExceededFault,
    DBSubnetQuotaExceededFault,
    InvalidSubnet,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDBSubnetGroup",
}));

export type CreateEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SourceNotFoundFault
  | SubscriptionAlreadyExistFault
  | SubscriptionCategoryNotFoundFault
  | CommonErrors;
/**
 * Creates an Amazon DocumentDB event notification subscription. This action requires a topic Amazon Resource Name (ARN) created by using the Amazon DocumentDB console, the Amazon SNS console, or the Amazon SNS API. To obtain an ARN with Amazon SNS, you must create a topic in Amazon SNS and subscribe to the topic. The ARN is displayed in the Amazon SNS console.
 *
 * You can specify the type of source (`SourceType`) that you want to be notified of. You can also provide a list of Amazon DocumentDB sources (`SourceIds`) that trigger the events, and you can provide a list of event categories (`EventCategories`) for events that you want to be notified of. For example, you can specify `SourceType = db-instance`, `SourceIds = mydbinstance1, mydbinstance2` and `EventCategories = Availability, Backup`.
 *
 * If you specify both the `SourceType` and `SourceIds` (such as `SourceType = db-instance` and `SourceIdentifier = myDBInstance1`), you are notified of all the `db-instance` events for the specified source. If you specify a `SourceType` but do not specify a `SourceIdentifier`, you receive notice of the events for that source type for all your Amazon DocumentDB sources. If you do not specify either the `SourceType` or the `SourceIdentifier`, you are notified of events generated from all Amazon DocumentDB sources belonging to your customer account.
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
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SourceNotFoundFault,
    SubscriptionAlreadyExistFault,
    SubscriptionCategoryNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSubscription",
}));

export type CreateGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterAlreadyExistsFault
  | GlobalClusterQuotaExceededFault
  | InvalidDBClusterStateFault
  | CommonErrors;
/**
 * Creates an Amazon DocumentDB global cluster that can span multiple multiple Amazon Web Services Regions.
 * The global cluster contains one primary cluster with read-write capability, and up-to 10 read-only secondary clusters. Global clusters uses storage-based fast replication across regions with latencies less than one second, using dedicated infrastructure with no impact to your workload’s performance.
 *
 * You can create a global cluster that is initially empty, and then add a primary and a secondary to it.
 * Or you can specify an existing cluster during the create operation, and this cluster becomes the primary of the global cluster.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const createGlobalCluster: API.OperationMethod<
  CreateGlobalClusterMessage,
  CreateGlobalClusterResult,
  CreateGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlobalClusterMessage,
  output: CreateGlobalClusterResult,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterAlreadyExistsFault,
    GlobalClusterQuotaExceededFault,
    InvalidDBClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalCluster",
}));

export type DeleteDBClusterError =
  | DBClusterNotFoundFault
  | DBClusterSnapshotAlreadyExistsFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes a previously provisioned cluster. When you delete a cluster, all automated backups for that cluster are deleted and can't be recovered. Manual DB cluster snapshots of the specified cluster are not deleted.
 */
export const deleteDBCluster: API.OperationMethod<
  DeleteDBClusterMessage,
  DeleteDBClusterResult,
  DeleteDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDBClusterMessage,
  output: DeleteDBClusterResult,
  errors: [
    DBClusterNotFoundFault,
    DBClusterSnapshotAlreadyExistsFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBCluster",
}));

export type DeleteDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Deletes a specified cluster parameter group. The cluster parameter group to be deleted can't be associated with any clusters.
 */
export const deleteDBClusterParameterGroup: API.OperationMethod<
  DeleteDBClusterParameterGroupMessage,
  DeleteDBClusterParameterGroupResponse,
  DeleteDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDBClusterParameterGroupMessage,
  output: DeleteDBClusterParameterGroupResponse,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterParameterGroup",
}));

export type DeleteDBClusterSnapshotError =
  | DBClusterSnapshotNotFoundFault
  | InvalidDBClusterSnapshotStateFault
  | CommonErrors;
/**
 * Deletes a cluster snapshot. If the snapshot is being copied, the copy operation is terminated.
 *
 * The cluster snapshot must be in the `available` state to be deleted.
 */
export const deleteDBClusterSnapshot: API.OperationMethod<
  DeleteDBClusterSnapshotMessage,
  DeleteDBClusterSnapshotResult,
  DeleteDBClusterSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDBClusterSnapshotMessage,
  output: DeleteDBClusterSnapshotResult,
  errors: [DBClusterSnapshotNotFoundFault, InvalidDBClusterSnapshotStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBClusterSnapshot",
}));

export type DeleteDBInstanceError =
  | DBInstanceNotFoundFault
  | DBSnapshotAlreadyExistsFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes a previously provisioned instance.
 */
export const deleteDBInstance: API.OperationMethod<
  DeleteDBInstanceMessage,
  DeleteDBInstanceResult,
  DeleteDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDBInstanceMessage,
  output: DeleteDBInstanceResult,
  errors: [
    DBInstanceNotFoundFault,
    DBSnapshotAlreadyExistsFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBInstance",
}));

export type DeleteDBSubnetGroupError =
  | DBSubnetGroupNotFoundFault
  | InvalidDBSubnetGroupStateFault
  | InvalidDBSubnetStateFault
  | CommonErrors;
/**
 * Deletes a subnet group.
 *
 * The specified database subnet group must not be associated with any DB
 * instances.
 */
export const deleteDBSubnetGroup: API.OperationMethod<
  DeleteDBSubnetGroupMessage,
  DeleteDBSubnetGroupResponse,
  DeleteDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDBSubnetGroupMessage,
  output: DeleteDBSubnetGroupResponse,
  errors: [
    DBSubnetGroupNotFoundFault,
    InvalidDBSubnetGroupStateFault,
    InvalidDBSubnetStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDBSubnetGroup",
}));

export type DeleteEventSubscriptionError =
  | InvalidEventSubscriptionStateFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Deletes an Amazon DocumentDB event notification subscription.
 */
export const deleteEventSubscription: API.OperationMethod<
  DeleteEventSubscriptionMessage,
  DeleteEventSubscriptionResult,
  DeleteEventSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventSubscriptionMessage,
  output: DeleteEventSubscriptionResult,
  errors: [InvalidEventSubscriptionStateFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSubscription",
}));

export type DeleteGlobalClusterError =
  | GlobalClusterNotFoundFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Deletes a global cluster. The primary and secondary clusters must already be detached or deleted before attempting to delete a global cluster.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const deleteGlobalCluster: API.OperationMethod<
  DeleteGlobalClusterMessage,
  DeleteGlobalClusterResult,
  DeleteGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlobalClusterMessage,
  output: DeleteGlobalClusterResult,
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalCluster",
}));

export type DescribeCertificatesError = CertificateNotFoundFault | CommonErrors;
/**
 * Returns a list of certificate authority (CA) certificates provided by Amazon DocumentDB for this Amazon Web Services account.
 */
export const describeCertificates: API.PaginatedOperationMethod<
  DescribeCertificatesMessage,
  CertificateMessage,
  DescribeCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCertificatesMessage,
  output: CertificateMessage,
  errors: [CertificateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Certificates",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterParameterGroupsError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of `DBClusterParameterGroup` descriptions. If a `DBClusterParameterGroupName` parameter is specified, the list contains only the description of the specified cluster parameter group.
 */
export const describeDBClusterParameterGroups: API.PaginatedOperationMethod<
  DescribeDBClusterParameterGroupsMessage,
  DBClusterParameterGroupsMessage,
  DescribeDBClusterParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  DBClusterParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBClusterParameterGroupsMessage,
  output: DBClusterParameterGroupsMessage,
  errors: [DBParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterParametersError =
  | DBParameterGroupNotFoundFault
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular cluster parameter
 * group.
 */
export const describeDBClusterParameters: API.PaginatedOperationMethod<
  DescribeDBClusterParametersMessage,
  DBClusterParameterGroupDetails,
  DescribeDBClusterParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBClusterParametersMessage,
  output: DBClusterParameterGroupDetails,
  errors: [DBParameterGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClustersError = DBClusterNotFoundFault | CommonErrors;
/**
 * Returns information about provisioned Amazon DocumentDB clusters. This API
 * operation supports pagination. For certain management features
 * such as cluster and instance lifecycle management, Amazon DocumentDB leverages
 * operational technology that is shared with Amazon RDS and Amazon
 * Neptune. Use the `filterName=engine,Values=docdb` filter
 * parameter to return only Amazon DocumentDB clusters.
 */
export const describeDBClusters: API.PaginatedOperationMethod<
  DescribeDBClustersMessage,
  DBClusterMessage,
  DescribeDBClustersError,
  Credentials | HttpClient.HttpClient,
  DBCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBClustersMessage,
  output: DBClusterMessage,
  errors: [DBClusterNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBClusterSnapshotAttributesError =
  | DBClusterSnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns a list of cluster snapshot attribute names and values for a manual DB
 * cluster snapshot.
 *
 * When you share snapshots with other Amazon Web Services accounts,
 * `DescribeDBClusterSnapshotAttributes` returns the `restore` attribute and a list of IDs for the Amazon Web Services accounts that are authorized to copy or restore the manual cluster snapshot. If `all` is included in the list of values for the `restore` attribute, then the manual cluster snapshot is public and can be copied or restored by all Amazon Web Services accounts.
 */
export const describeDBClusterSnapshotAttributes: API.OperationMethod<
  DescribeDBClusterSnapshotAttributesMessage,
  DescribeDBClusterSnapshotAttributesResult,
  DescribeDBClusterSnapshotAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDBClusterSnapshotAttributesMessage,
  output: DescribeDBClusterSnapshotAttributesResult,
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshotAttributes",
}));

export type DescribeDBClusterSnapshotsError =
  | DBClusterSnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about cluster snapshots. This API operation supports pagination.
 */
export const describeDBClusterSnapshots: API.PaginatedOperationMethod<
  DescribeDBClusterSnapshotsMessage,
  DBClusterSnapshotMessage,
  DescribeDBClusterSnapshotsError,
  Credentials | HttpClient.HttpClient,
  DBClusterSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBClusterSnapshotsMessage,
  output: DBClusterSnapshotMessage,
  errors: [DBClusterSnapshotNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBClusterSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBClusterSnapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBEngineVersionsError = CommonErrors;
/**
 * Returns a list of the available engines.
 */
export const describeDBEngineVersions: API.PaginatedOperationMethod<
  DescribeDBEngineVersionsMessage,
  DBEngineVersionMessage,
  DescribeDBEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  DBEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBEngineVersionsMessage,
  output: DBEngineVersionMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBEngineVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBInstancesError = DBInstanceNotFoundFault | CommonErrors;
/**
 * Returns information about provisioned Amazon DocumentDB instances. This API supports pagination.
 */
export const describeDBInstances: API.PaginatedOperationMethod<
  DescribeDBInstancesMessage,
  DBInstanceMessage,
  DescribeDBInstancesError,
  Credentials | HttpClient.HttpClient,
  DBInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBInstancesMessage,
  output: DBInstanceMessage,
  errors: [DBInstanceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBInstances",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBInstances",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeDBSubnetGroupsError =
  | DBSubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of `DBSubnetGroup` descriptions. If a
 * `DBSubnetGroupName` is specified, the list will contain only the descriptions of the specified `DBSubnetGroup`.
 */
export const describeDBSubnetGroups: API.PaginatedOperationMethod<
  DescribeDBSubnetGroupsMessage,
  DBSubnetGroupMessage,
  DescribeDBSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  DBSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDBSubnetGroupsMessage,
  output: DBSubnetGroupMessage,
  errors: [DBSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDBSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "DBSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEngineDefaultClusterParametersError = CommonErrors;
/**
 * Returns the default engine and system parameter information for the cluster database
 * engine.
 */
export const describeEngineDefaultClusterParameters: API.OperationMethod<
  DescribeEngineDefaultClusterParametersMessage,
  DescribeEngineDefaultClusterParametersResult,
  DescribeEngineDefaultClusterParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEngineDefaultClusterParametersMessage,
  output: DescribeEngineDefaultClusterParametersResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultClusterParameters",
}));

export type DescribeEventCategoriesError = CommonErrors;
/**
 * Displays a list of categories for all event source types, or, if specified, for a
 * specified source type.
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
 * Returns events related to instances, security groups, snapshots, and DB parameter groups for the past 14 days. You can obtain events specific to a particular DB instance, security group, snapshot, or parameter group by providing the name as a parameter. By default, the events of the past hour are returned.
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
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Lists all the subscription descriptions for a customer account. The description for a subscription includes `SubscriptionName`, `SNSTopicARN`, `CustomerID`, `SourceType`, `SourceID`, `CreationTime`, and `Status`.
 *
 * If you specify a `SubscriptionName`, lists the description for that subscription.
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
  errors: [SubscriptionNotFoundFault],
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

export type DescribeGlobalClustersError =
  | GlobalClusterNotFoundFault
  | CommonErrors;
/**
 * Returns information about Amazon DocumentDB global clusters. This API supports pagination.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const describeGlobalClusters: API.PaginatedOperationMethod<
  DescribeGlobalClustersMessage,
  GlobalClustersMessage,
  DescribeGlobalClustersError,
  Credentials | HttpClient.HttpClient,
  GlobalCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGlobalClustersMessage,
  output: GlobalClustersMessage,
  errors: [GlobalClusterNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "GlobalClusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeOrderableDBInstanceOptionsError = CommonErrors;
/**
 * Returns a list of orderable instance options for the specified engine.
 */
export const describeOrderableDBInstanceOptions: API.PaginatedOperationMethod<
  DescribeOrderableDBInstanceOptionsMessage,
  OrderableDBInstanceOptionsMessage,
  DescribeOrderableDBInstanceOptionsError,
  Credentials | HttpClient.HttpClient,
  OrderableDBInstanceOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOrderableDBInstanceOptionsMessage,
  output: OrderableDBInstanceOptionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrderableDBInstanceOptions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "OrderableDBInstanceOptions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribePendingMaintenanceActionsError =
  | ResourceNotFoundFault
  | CommonErrors;
/**
 * Returns a list of resources (for example, instances) that have at least one pending
 * maintenance action.
 */
export const describePendingMaintenanceActions: API.PaginatedOperationMethod<
  DescribePendingMaintenanceActionsMessage,
  PendingMaintenanceActionsMessage,
  DescribePendingMaintenanceActionsError,
  Credentials | HttpClient.HttpClient,
  ResourcePendingMaintenanceActions
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePendingMaintenanceActionsMessage,
  output: PendingMaintenanceActionsMessage,
  errors: [ResourceNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePendingMaintenanceActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "PendingMaintenanceActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type FailoverDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Forces a failover for a cluster.
 *
 * A failover for a cluster promotes one of the Amazon DocumentDB replicas (read-only instances) in the cluster to be the primary instance (the cluster writer).
 *
 * If the primary instance fails, Amazon DocumentDB automatically fails over to an Amazon DocumentDB replica, if one exists. You can force a failover when you want to simulate a failure of a primary instance for testing.
 */
export const failoverDBCluster: API.OperationMethod<
  FailoverDBClusterMessage,
  FailoverDBClusterResult,
  FailoverDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FailoverDBClusterMessage,
  output: FailoverDBClusterResult,
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverDBCluster",
}));

export type FailoverGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Promotes the specified secondary DB cluster to be the primary DB cluster in the global cluster when failing over a global cluster occurs.
 *
 * Use this operation to respond to an unplanned event, such as a regional disaster in the primary region.
 * Failing over can result in a loss of write transaction data that wasn't replicated to the chosen secondary before the failover event occurred.
 * However, the recovery process that promotes a DB instance on the chosen seconday DB cluster to be the primary writer DB instance guarantees that the data is in a transactionally consistent state.
 */
export const failoverGlobalCluster: API.OperationMethod<
  FailoverGlobalClusterMessage,
  FailoverGlobalClusterResult,
  FailoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FailoverGlobalClusterMessage,
  output: FailoverGlobalClusterResult,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverGlobalCluster",
}));

export type ListTagsForResourceError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSnapshotNotFoundFault
  | CommonErrors;
/**
 * Lists all tags on an Amazon DocumentDB resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  TagListMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceMessage,
  output: TagListMessage,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyDBClusterError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterParameterGroupNotFoundFault
  | DBSubnetGroupNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidDBSubnetGroupStateFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Modifies a setting for an Amazon DocumentDB cluster. You can change one or more database
 * configuration parameters by specifying these parameters and the new values in the
 * request.
 */
export const modifyDBCluster: API.OperationMethod<
  ModifyDBClusterMessage,
  ModifyDBClusterResult,
  ModifyDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDBClusterMessage,
  output: ModifyDBClusterResult,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterParameterGroupNotFoundFault,
    DBSubnetGroupNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidDBSubnetGroupStateFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBCluster",
}));

export type ModifyDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a cluster parameter group. To modify more than one
 * parameter, submit a list of the following: `ParameterName`,
 * `ParameterValue`, and `ApplyMethod`. A maximum of 20
 * parameters can be modified in a single request.
 *
 * Changes to dynamic parameters are applied immediately. Changes to static
 * parameters require a reboot or maintenance window
 *
 * before the change can take effect.
 *
 * After you create a cluster parameter group, you should wait at least 5 minutes
 * before creating your first cluster that uses that cluster parameter group as
 * the default parameter group. This allows Amazon DocumentDB to fully complete the create action
 * before the parameter group is used as the default for a new cluster. This step is
 * especially important for parameters that are critical when creating the default
 * database for a cluster, such as the character set for the default database
 * defined by the `character_set_database` parameter.
 */
export const modifyDBClusterParameterGroup: API.OperationMethod<
  ModifyDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ModifyDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDBClusterParameterGroupMessage,
  output: DBClusterParameterGroupNameMessage,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterParameterGroup",
}));

export type ModifyDBClusterSnapshotAttributeError =
  | DBClusterSnapshotNotFoundFault
  | InvalidDBClusterSnapshotStateFault
  | SharedSnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Adds an attribute and values to, or removes an attribute and values from, a manual cluster snapshot.
 *
 * To share a manual cluster snapshot with other Amazon Web Services accounts, specify `restore` as the `AttributeName`, and use the `ValuesToAdd` parameter to add a list of IDs of the Amazon Web Services accounts that are authorized to restore the manual cluster snapshot. Use the value `all` to make the manual cluster snapshot public, which means that it can be copied or restored by all Amazon Web Services accounts. Do not add the `all` value for any manual cluster snapshots that contain private information that you don't want available to all Amazon Web Services accounts. If a manual cluster snapshot is encrypted, it can be shared, but only by specifying a list of authorized Amazon Web Services account IDs for the `ValuesToAdd` parameter. You can't use `all` as a value for that parameter in this case.
 */
export const modifyDBClusterSnapshotAttribute: API.OperationMethod<
  ModifyDBClusterSnapshotAttributeMessage,
  ModifyDBClusterSnapshotAttributeResult,
  ModifyDBClusterSnapshotAttributeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDBClusterSnapshotAttributeMessage,
  output: ModifyDBClusterSnapshotAttributeResult,
  errors: [
    DBClusterSnapshotNotFoundFault,
    InvalidDBClusterSnapshotStateFault,
    SharedSnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBClusterSnapshotAttribute",
}));

export type ModifyDBInstanceError =
  | AuthorizationNotFoundFault
  | CertificateNotFoundFault
  | DBInstanceAlreadyExistsFault
  | DBInstanceNotFoundFault
  | DBParameterGroupNotFoundFault
  | DBSecurityGroupNotFoundFault
  | DBUpgradeDependencyFailureFault
  | InsufficientDBInstanceCapacityFault
  | InvalidDBInstanceStateFault
  | InvalidDBSecurityGroupStateFault
  | InvalidVPCNetworkStateFault
  | StorageQuotaExceededFault
  | StorageTypeNotSupportedFault
  | CommonErrors;
/**
 * Modifies settings for an instance. You can change one or more database configuration parameters by specifying these parameters and the new values in the request.
 */
export const modifyDBInstance: API.OperationMethod<
  ModifyDBInstanceMessage,
  ModifyDBInstanceResult,
  ModifyDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDBInstanceMessage,
  output: ModifyDBInstanceResult,
  errors: [
    AuthorizationNotFoundFault,
    CertificateNotFoundFault,
    DBInstanceAlreadyExistsFault,
    DBInstanceNotFoundFault,
    DBParameterGroupNotFoundFault,
    DBSecurityGroupNotFoundFault,
    DBUpgradeDependencyFailureFault,
    InsufficientDBInstanceCapacityFault,
    InvalidDBInstanceStateFault,
    InvalidDBSecurityGroupStateFault,
    InvalidVPCNetworkStateFault,
    StorageQuotaExceededFault,
    StorageTypeNotSupportedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBInstance",
}));

export type ModifyDBSubnetGroupError =
  | DBSubnetGroupDoesNotCoverEnoughAZs
  | DBSubnetGroupNotFoundFault
  | DBSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetAlreadyInUse
  | CommonErrors;
/**
 * Modifies an existing subnet group. subnet groups must contain at least one subnet in at least two Availability Zones in the Amazon Web Services Region.
 */
export const modifyDBSubnetGroup: API.OperationMethod<
  ModifyDBSubnetGroupMessage,
  ModifyDBSubnetGroupResult,
  ModifyDBSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDBSubnetGroupMessage,
  output: ModifyDBSubnetGroupResult,
  errors: [
    DBSubnetGroupDoesNotCoverEnoughAZs,
    DBSubnetGroupNotFoundFault,
    DBSubnetQuotaExceededFault,
    InvalidSubnet,
    SubnetAlreadyInUse,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDBSubnetGroup",
}));

export type ModifyEventSubscriptionError =
  | EventSubscriptionQuotaExceededFault
  | SNSInvalidTopicFault
  | SNSNoAuthorizationFault
  | SNSTopicArnNotFoundFault
  | SubscriptionCategoryNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Modifies an existing Amazon DocumentDB event notification subscription.
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
    EventSubscriptionQuotaExceededFault,
    SNSInvalidTopicFault,
    SNSNoAuthorizationFault,
    SNSTopicArnNotFoundFault,
    SubscriptionCategoryNotFoundFault,
    SubscriptionNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyEventSubscription",
}));

export type ModifyGlobalClusterError =
  | GlobalClusterNotFoundFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Modify a setting for an Amazon DocumentDB global cluster. You can change one or more configuration parameters (for example: deletion protection), or the global cluster identifier by specifying these parameters and the new values in the request.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const modifyGlobalCluster: API.OperationMethod<
  ModifyGlobalClusterMessage,
  ModifyGlobalClusterResult,
  ModifyGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyGlobalClusterMessage,
  output: ModifyGlobalClusterResult,
  errors: [GlobalClusterNotFoundFault, InvalidGlobalClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalCluster",
}));

export type RebootDBInstanceError =
  | DBInstanceNotFoundFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * You might need to reboot your instance, usually for maintenance reasons. For
 * example, if you make certain changes, or if you change the cluster parameter group
 * that is associated with the instance, you must reboot the instance for the changes to
 * take effect.
 *
 * Rebooting an instance restarts the database engine service. Rebooting an instance
 * results in a momentary outage, during which the instance status is set to
 * *rebooting*.
 */
export const rebootDBInstance: API.OperationMethod<
  RebootDBInstanceMessage,
  RebootDBInstanceResult,
  RebootDBInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootDBInstanceMessage,
  output: RebootDBInstanceResult,
  errors: [DBInstanceNotFoundFault, InvalidDBInstanceStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootDBInstance",
}));

export type RemoveFromGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Detaches an Amazon DocumentDB secondary cluster from a global cluster. The cluster becomes a standalone cluster with read-write capability instead of being read-only and receiving data from a primary in a different region.
 *
 * This action only applies to Amazon DocumentDB clusters.
 */
export const removeFromGlobalCluster: API.OperationMethod<
  RemoveFromGlobalClusterMessage,
  RemoveFromGlobalClusterResult,
  RemoveFromGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveFromGlobalClusterMessage,
  output: RemoveFromGlobalClusterResult,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveFromGlobalCluster",
}));

export type RemoveSourceIdentifierFromSubscriptionError =
  | SourceNotFoundFault
  | SubscriptionNotFoundFault
  | CommonErrors;
/**
 * Removes a source identifier from an existing Amazon DocumentDB event notification
 * subscription.
 */
export const removeSourceIdentifierFromSubscription: API.OperationMethod<
  RemoveSourceIdentifierFromSubscriptionMessage,
  RemoveSourceIdentifierFromSubscriptionResult,
  RemoveSourceIdentifierFromSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveSourceIdentifierFromSubscriptionMessage,
  output: RemoveSourceIdentifierFromSubscriptionResult,
  errors: [SourceNotFoundFault, SubscriptionNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSourceIdentifierFromSubscription",
}));

export type RemoveTagsFromResourceError =
  | DBClusterNotFoundFault
  | DBInstanceNotFoundFault
  | DBSnapshotNotFoundFault
  | CommonErrors;
/**
 * Removes metadata tags from an Amazon DocumentDB resource.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  RemoveTagsFromResourceResponse,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsFromResourceMessage,
  output: RemoveTagsFromResourceResponse,
  errors: [
    DBClusterNotFoundFault,
    DBInstanceNotFoundFault,
    DBSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type ResetDBClusterParameterGroupError =
  | DBParameterGroupNotFoundFault
  | InvalidDBParameterGroupStateFault
  | CommonErrors;
/**
 * Modifies the parameters of a cluster parameter group to the default value. To
 * reset specific parameters, submit a list of the following: `ParameterName`
 * and `ApplyMethod`. To reset the entire cluster parameter group, specify
 * the `DBClusterParameterGroupName` and `ResetAllParameters`
 * parameters.
 *
 * When you reset the entire group, dynamic parameters are updated immediately and
 * static parameters are set to `pending-reboot` to take effect on the next DB
 * instance reboot.
 */
export const resetDBClusterParameterGroup: API.OperationMethod<
  ResetDBClusterParameterGroupMessage,
  DBClusterParameterGroupNameMessage,
  ResetDBClusterParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetDBClusterParameterGroupMessage,
  output: DBClusterParameterGroupNameMessage,
  errors: [DBParameterGroupNotFoundFault, InvalidDBParameterGroupStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetDBClusterParameterGroup",
}));

export type RestoreDBClusterFromSnapshotError =
  | DBClusterAlreadyExistsFault
  | DBClusterQuotaExceededFault
  | DBClusterSnapshotNotFoundFault
  | DBSnapshotNotFoundFault
  | DBSubnetGroupNotFoundFault
  | InsufficientDBClusterCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Creates a new cluster from a snapshot or cluster snapshot.
 *
 * If a snapshot is specified, the target cluster is created from the source DB snapshot with a default configuration and default security group.
 *
 * If a cluster snapshot is specified, the target cluster is created from the source cluster restore point with the same configuration as the original source DB cluster, except that the new cluster is created with the default security group.
 */
export const restoreDBClusterFromSnapshot: API.OperationMethod<
  RestoreDBClusterFromSnapshotMessage,
  RestoreDBClusterFromSnapshotResult,
  RestoreDBClusterFromSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreDBClusterFromSnapshotMessage,
  output: RestoreDBClusterFromSnapshotResult,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterQuotaExceededFault,
    DBClusterSnapshotNotFoundFault,
    DBSnapshotNotFoundFault,
    DBSubnetGroupNotFoundFault,
    InsufficientDBClusterCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterFromSnapshot",
}));

export type RestoreDBClusterToPointInTimeError =
  | DBClusterAlreadyExistsFault
  | DBClusterNotFoundFault
  | DBClusterQuotaExceededFault
  | DBClusterSnapshotNotFoundFault
  | DBSubnetGroupNotFoundFault
  | InsufficientDBClusterCapacityFault
  | InsufficientStorageClusterCapacityFault
  | InvalidDBClusterSnapshotStateFault
  | InvalidDBClusterStateFault
  | InvalidDBSnapshotStateFault
  | InvalidRestoreFault
  | InvalidSubnet
  | InvalidVPCNetworkStateFault
  | KMSKeyNotAccessibleFault
  | NetworkTypeNotSupported
  | StorageQuotaExceededFault
  | CommonErrors;
/**
 * Restores a cluster to an arbitrary point in time. Users can restore to any point in
 * time before `LatestRestorableTime` for up to
 * `BackupRetentionPeriod` days. The target cluster is created from the
 * source cluster with the same configuration as the original cluster, except that
 * the new cluster is created with the default security group.
 */
export const restoreDBClusterToPointInTime: API.OperationMethod<
  RestoreDBClusterToPointInTimeMessage,
  RestoreDBClusterToPointInTimeResult,
  RestoreDBClusterToPointInTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreDBClusterToPointInTimeMessage,
  output: RestoreDBClusterToPointInTimeResult,
  errors: [
    DBClusterAlreadyExistsFault,
    DBClusterNotFoundFault,
    DBClusterQuotaExceededFault,
    DBClusterSnapshotNotFoundFault,
    DBSubnetGroupNotFoundFault,
    InsufficientDBClusterCapacityFault,
    InsufficientStorageClusterCapacityFault,
    InvalidDBClusterSnapshotStateFault,
    InvalidDBClusterStateFault,
    InvalidDBSnapshotStateFault,
    InvalidRestoreFault,
    InvalidSubnet,
    InvalidVPCNetworkStateFault,
    KMSKeyNotAccessibleFault,
    NetworkTypeNotSupported,
    StorageQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreDBClusterToPointInTime",
}));

export type StartDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Restarts the stopped cluster that is specified by `DBClusterIdentifier`.
 * For more information, see Stopping and
 * Starting an Amazon DocumentDB Cluster.
 */
export const startDBCluster: API.OperationMethod<
  StartDBClusterMessage,
  StartDBClusterResult,
  StartDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDBClusterMessage,
  output: StartDBClusterResult,
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDBCluster",
}));

export type StopDBClusterError =
  | DBClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidDBInstanceStateFault
  | CommonErrors;
/**
 * Stops the running cluster that is specified by `DBClusterIdentifier`. The
 * cluster must be in the *available* state. For more information, see
 * Stopping and
 * Starting an Amazon DocumentDB Cluster.
 */
export const stopDBCluster: API.OperationMethod<
  StopDBClusterMessage,
  StopDBClusterResult,
  StopDBClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDBClusterMessage,
  output: StopDBClusterResult,
  errors: [
    DBClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidDBInstanceStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDBCluster",
}));

export type SwitchoverGlobalClusterError =
  | DBClusterNotFoundFault
  | GlobalClusterNotFoundFault
  | InvalidDBClusterStateFault
  | InvalidGlobalClusterStateFault
  | CommonErrors;
/**
 * Switches over the specified secondary Amazon DocumentDB cluster to be the new primary Amazon DocumentDB cluster in the global database cluster.
 */
export const switchoverGlobalCluster: API.OperationMethod<
  SwitchoverGlobalClusterMessage,
  SwitchoverGlobalClusterResult,
  SwitchoverGlobalClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SwitchoverGlobalClusterMessage,
  output: SwitchoverGlobalClusterResult,
  errors: [
    DBClusterNotFoundFault,
    GlobalClusterNotFoundFault,
    InvalidDBClusterStateFault,
    InvalidGlobalClusterStateFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwitchoverGlobalCluster",
}));
