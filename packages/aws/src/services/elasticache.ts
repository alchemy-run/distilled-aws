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
const ns = T.XmlNamespace("http://elasticache.amazonaws.com/doc/2015-02-02/");
const svc = T.AwsApiService({
  sdkId: "ElastiCache",
  serviceShapeName: "AmazonElastiCacheV9",
});
const auth = T.AwsAuthSigv4({ name: "elasticache" });
const ver = T.ServiceVersion("2015-02-02");
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
              `https://elasticache-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://elasticache.${Region}.amazonaws.com`);
            }
            return e(
              `https://elasticache-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticache.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://elasticache.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class APICallRateForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<APICallRateForCustomerExceededFault>()(
    "APICallRateForCustomerExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "APICallRateForCustomerExceeded",
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
export class CacheClusterAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheClusterAlreadyExistsFault>()(
    "CacheClusterAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheClusterAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheClusterNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheClusterNotFoundFault>()(
    "CacheClusterNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "CacheClusterNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheParameterGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheParameterGroupAlreadyExistsFault>()(
    "CacheParameterGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheParameterGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheParameterGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheParameterGroupNotFoundFault>()(
    "CacheParameterGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheParameterGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheParameterGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheParameterGroupQuotaExceededFault>()(
    "CacheParameterGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheParameterGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSecurityGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheSecurityGroupAlreadyExistsFault>()(
    "CacheSecurityGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheSecurityGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheSecurityGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheSecurityGroupNotFoundFault>()(
    "CacheSecurityGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheSecurityGroupNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSecurityGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheSecurityGroupQuotaExceededFault>()(
    "CacheSecurityGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "QuotaExceeded.CacheSecurityGroup",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSubnetGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupAlreadyExistsFault>()(
    "CacheSubnetGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheSubnetGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CacheSubnetGroupInUse
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupInUse>()(
    "CacheSubnetGroupInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "CacheSubnetGroupInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class CacheSubnetGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupNotFoundFault>()(
    "CacheSubnetGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheSubnetGroupNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSubnetGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetGroupQuotaExceededFault>()(
    "CacheSubnetGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheSubnetGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CacheSubnetQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<CacheSubnetQuotaExceededFault>()(
    "CacheSubnetQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CacheSubnetQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ClusterQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ClusterQuotaForCustomerExceededFault>()(
    "ClusterQuotaForCustomerExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ClusterQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DefaultUserAssociatedToUserGroupFault
  extends /*@__PURE__*/ S.TaggedError<DefaultUserAssociatedToUserGroupFault>()(
    "DefaultUserAssociatedToUserGroupFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "DefaultUserAssociatedToUserGroup",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DefaultUserRequired
  extends /*@__PURE__*/ S.TaggedError<DefaultUserRequired>()(
    "DefaultUserRequired",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "DefaultUserRequired", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateUserNameFault
  extends /*@__PURE__*/ S.TaggedError<DuplicateUserNameFault>()(
    "DuplicateUserNameFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "DuplicateUserName", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class GlobalReplicationGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<GlobalReplicationGroupAlreadyExistsFault>()(
    "GlobalReplicationGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GlobalReplicationGroupAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class GlobalReplicationGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<GlobalReplicationGroupNotFoundFault>()(
    "GlobalReplicationGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GlobalReplicationGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCacheClusterCapacityFault
  extends /*@__PURE__*/ S.TaggedError<InsufficientCacheClusterCapacityFault>()(
    "InsufficientCacheClusterCapacityFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientCacheClusterCapacity",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidARNFault
  extends /*@__PURE__*/ S.TaggedError<InvalidARNFault>()(
    "InvalidARNFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidARN", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCacheClusterStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCacheClusterStateFault>()(
    "InvalidCacheClusterStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCacheClusterState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCacheParameterGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCacheParameterGroupStateFault>()(
    "InvalidCacheParameterGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCacheParameterGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCacheSecurityGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidCacheSecurityGroupStateFault>()(
    "InvalidCacheSecurityGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCacheSecurityGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidCredentialsException
  extends /*@__PURE__*/ S.TaggedError<InvalidCredentialsException>()(
    "InvalidCredentialsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidCredentialsException",
        httpResponseCode: 408,
      }),
      T.HttpError(408),
    ),
  ).pipe(C.withTimeoutError) {}
export class InvalidGlobalReplicationGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidGlobalReplicationGroupStateFault>()(
    "InvalidGlobalReplicationGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidGlobalReplicationGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidKMSKeyFault
  extends /*@__PURE__*/ S.TaggedError<InvalidKMSKeyFault>()(
    "InvalidKMSKeyFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidKMSKeyFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidParameterCombination",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidReplicationGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidReplicationGroupStateFault>()(
    "InvalidReplicationGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidReplicationGroupState",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidServerlessCacheSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidServerlessCacheSnapshotStateFault>()(
    "InvalidServerlessCacheSnapshotStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidServerlessCacheSnapshotStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidServerlessCacheStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidServerlessCacheStateFault>()(
    "InvalidServerlessCacheStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidServerlessCacheStateFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnapshotStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidSnapshotStateFault>()(
    "InvalidSnapshotStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidSnapshotState", httpResponseCode: 400 }),
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
export class InvalidUserGroupStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUserGroupStateFault>()(
    "InvalidUserGroupStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidUserGroupState", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidUserStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidUserStateFault>()(
    "InvalidUserStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidUserState", httpResponseCode: 400 }),
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
export class NodeGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<NodeGroupNotFoundFault>()(
    "NodeGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NodeGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeGroupsPerReplicationGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeGroupsPerReplicationGroupQuotaExceededFault>()(
    "NodeGroupsPerReplicationGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NodeGroupsPerReplicationGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForClusterExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForClusterExceededFault>()(
    "NodeQuotaForClusterExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NodeQuotaForClusterExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NodeQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<NodeQuotaForCustomerExceededFault>()(
    "NodeQuotaForCustomerExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NodeQuotaForCustomerExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NoOperationFault
  extends /*@__PURE__*/ S.TaggedError<NoOperationFault>()(
    "NoOperationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "NoOperationFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReplicationGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupAlreadyExistsFault>()(
    "ReplicationGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReplicationGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReplicationGroupAlreadyUnderMigrationFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupAlreadyUnderMigrationFault>()(
    "ReplicationGroupAlreadyUnderMigrationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReplicationGroupAlreadyUnderMigrationFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReplicationGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupNotFoundFault>()(
    "ReplicationGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReplicationGroupNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReplicationGroupNotUnderMigrationFault
  extends /*@__PURE__*/ S.TaggedError<ReplicationGroupNotUnderMigrationFault>()(
    "ReplicationGroupNotUnderMigrationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReplicationGroupNotUnderMigrationFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedCacheNodeAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodeAlreadyExistsFault>()(
    "ReservedCacheNodeAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedCacheNodeAlreadyExists",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ReservedCacheNodeNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodeNotFoundFault>()(
    "ReservedCacheNodeNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedCacheNodeNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedCacheNodeQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodeQuotaExceededFault>()(
    "ReservedCacheNodeQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedCacheNodeQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ReservedCacheNodesOfferingNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ReservedCacheNodesOfferingNotFoundFault>()(
    "ReservedCacheNodesOfferingNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ReservedCacheNodesOfferingNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheAlreadyExistsFault>()(
    "ServerlessCacheAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServerlessCacheAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServerlessCacheNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheNotFoundFault>()(
    "ServerlessCacheNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServerlessCacheNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheQuotaForCustomerExceededFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheQuotaForCustomerExceededFault>()(
    "ServerlessCacheQuotaForCustomerExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServerlessCacheQuotaForCustomerExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheSnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheSnapshotAlreadyExistsFault>()(
    "ServerlessCacheSnapshotAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServerlessCacheSnapshotAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServerlessCacheSnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheSnapshotNotFoundFault>()(
    "ServerlessCacheSnapshotNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServerlessCacheSnapshotNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerlessCacheSnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<ServerlessCacheSnapshotQuotaExceededFault>()(
    "ServerlessCacheSnapshotQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServerlessCacheSnapshotQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceLinkedRoleNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceLinkedRoleNotFoundFault>()(
    "ServiceLinkedRoleNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceLinkedRoleNotFoundFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceUpdateNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<ServiceUpdateNotFoundFault>()(
    "ServiceUpdateNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceUpdateNotFoundFault",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotAlreadyExistsFault>()(
    "SnapshotAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotAlreadyExistsFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class SnapshotFeatureNotSupportedFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotFeatureNotSupportedFault>()(
    "SnapshotFeatureNotSupportedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotFeatureNotSupportedFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotNotFoundFault>()(
    "SnapshotNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SnapshotNotFoundFault", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class SnapshotQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<SnapshotQuotaExceededFault>()(
    "SnapshotQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SnapshotQuotaExceededFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetInUse
  extends /*@__PURE__*/ S.TaggedError<SubnetInUse>()(
    "SubnetInUse",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetInUse", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withDependencyViolationError) {}
export class SubnetNotAllowedFault
  extends /*@__PURE__*/ S.TaggedError<SubnetNotAllowedFault>()(
    "SubnetNotAllowedFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "SubnetNotAllowedFault", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<TagNotFoundFault>()(
    "TagNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TagNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagQuotaPerResourceExceeded
  extends /*@__PURE__*/ S.TaggedError<TagQuotaPerResourceExceeded>()(
    "TagQuotaPerResourceExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TagQuotaPerResourceExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TestFailoverNotAvailableFault
  extends /*@__PURE__*/ S.TaggedError<TestFailoverNotAvailableFault>()(
    "TestFailoverNotAvailableFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TestFailoverNotAvailableFault",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UserAlreadyExistsFault>()(
    "UserAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UserAlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UserGroupAlreadyExistsFault
  extends /*@__PURE__*/ S.TaggedError<UserGroupAlreadyExistsFault>()(
    "UserGroupAlreadyExistsFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UserGroupAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class UserGroupNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UserGroupNotFoundFault>()(
    "UserGroupNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UserGroupNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserGroupQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<UserGroupQuotaExceededFault>()(
    "UserGroupQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UserGroupQuotaExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<UserNotFoundFault>()(
    "UserNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UserNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UserQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<UserQuotaExceededFault>()(
    "UserQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "UserQuotaExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
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
export interface TagListMessage {
  TagList?: Tag[];
}
export const TagListMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({ identifier: "TagListMessage" }) as any as S.Schema<TagListMessage>;
export interface AuthorizeCacheSecurityGroupIngressMessage {
  CacheSecurityGroupName?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export const AuthorizeCacheSecurityGroupIngressMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CacheSecurityGroupName: S.optional(S.String),
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
    identifier: "AuthorizeCacheSecurityGroupIngressMessage",
  }) as any as S.Schema<AuthorizeCacheSecurityGroupIngressMessage>;
export interface EC2SecurityGroup {
  Status?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export const EC2SecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    EC2SecurityGroupName: S.optional(S.String),
    EC2SecurityGroupOwnerId: S.optional(S.String),
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
export interface CacheSecurityGroup {
  OwnerId?: string;
  CacheSecurityGroupName?: string;
  Description?: string;
  EC2SecurityGroups?: EC2SecurityGroup[];
  ARN?: string;
}
export const CacheSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    CacheSecurityGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    EC2SecurityGroups: S.optional(EC2SecurityGroupList),
    ARN: S.optional(S.String),
  }),
).annotate({
  identifier: "CacheSecurityGroup",
}) as any as S.Schema<CacheSecurityGroup>;
export interface AuthorizeCacheSecurityGroupIngressResult {
  CacheSecurityGroup?: CacheSecurityGroup;
}
export const AuthorizeCacheSecurityGroupIngressResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CacheSecurityGroup: S.optional(CacheSecurityGroup) }).pipe(ns),
).annotate({
  identifier: "AuthorizeCacheSecurityGroupIngressResult",
}) as any as S.Schema<AuthorizeCacheSecurityGroupIngressResult>;
export type ReplicationGroupIdList = string[];
export const ReplicationGroupIdList = /*@__PURE__*/ S.Array(S.String);
export type CacheClusterIdList = string[];
export const CacheClusterIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchApplyUpdateActionMessage {
  ReplicationGroupIds?: string[];
  CacheClusterIds?: string[];
  ServiceUpdateName?: string;
}
export const BatchApplyUpdateActionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupIds: S.optional(ReplicationGroupIdList),
    CacheClusterIds: S.optional(CacheClusterIdList),
    ServiceUpdateName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchApplyUpdateActionMessage",
}) as any as S.Schema<BatchApplyUpdateActionMessage>;
export type UpdateActionStatus =
  | "not-applied"
  | "waiting-to-start"
  | "in-progress"
  | "stopping"
  | "stopped"
  | "complete"
  | "scheduling"
  | "scheduled"
  | "not-applicable"
  | (string & {});
export const UpdateActionStatus = S.String;

export interface ProcessedUpdateAction {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  ServiceUpdateName?: string;
  UpdateActionStatus?: UpdateActionStatus;
}
export const ProcessedUpdateAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CacheClusterId: S.optional(S.String),
    ServiceUpdateName: S.optional(S.String),
    UpdateActionStatus: S.optional(UpdateActionStatus),
  }),
).annotate({
  identifier: "ProcessedUpdateAction",
}) as any as S.Schema<ProcessedUpdateAction>;
export type ProcessedUpdateActionList = ProcessedUpdateAction[];
export const ProcessedUpdateActionList = /*@__PURE__*/ S.Array(
  ProcessedUpdateAction.pipe(T.XmlName("ProcessedUpdateAction")).annotate({
    identifier: "ProcessedUpdateAction",
  }),
);
export interface UnprocessedUpdateAction {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  ServiceUpdateName?: string;
  ErrorType?: string;
  ErrorMessage?: string;
}
export const UnprocessedUpdateAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CacheClusterId: S.optional(S.String),
    ServiceUpdateName: S.optional(S.String),
    ErrorType: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedUpdateAction",
}) as any as S.Schema<UnprocessedUpdateAction>;
export type UnprocessedUpdateActionList = UnprocessedUpdateAction[];
export const UnprocessedUpdateActionList = /*@__PURE__*/ S.Array(
  UnprocessedUpdateAction.pipe(T.XmlName("UnprocessedUpdateAction")).annotate({
    identifier: "UnprocessedUpdateAction",
  }),
);
export interface UpdateActionResultsMessage {
  ProcessedUpdateActions?: ProcessedUpdateAction[];
  UnprocessedUpdateActions?: UnprocessedUpdateAction[];
}
export const UpdateActionResultsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProcessedUpdateActions: S.optional(ProcessedUpdateActionList),
    UnprocessedUpdateActions: S.optional(UnprocessedUpdateActionList),
  }).pipe(ns),
).annotate({
  identifier: "UpdateActionResultsMessage",
}) as any as S.Schema<UpdateActionResultsMessage>;
export interface BatchStopUpdateActionMessage {
  ReplicationGroupIds?: string[];
  CacheClusterIds?: string[];
  ServiceUpdateName?: string;
}
export const BatchStopUpdateActionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupIds: S.optional(ReplicationGroupIdList),
    CacheClusterIds: S.optional(CacheClusterIdList),
    ServiceUpdateName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchStopUpdateActionMessage",
}) as any as S.Schema<BatchStopUpdateActionMessage>;
export interface CompleteMigrationMessage {
  ReplicationGroupId?: string;
  Force?: boolean;
}
export const CompleteMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
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
  identifier: "CompleteMigrationMessage",
}) as any as S.Schema<CompleteMigrationMessage>;
export interface GlobalReplicationGroupInfo {
  GlobalReplicationGroupId?: string;
  GlobalReplicationGroupMemberRole?: string;
}
export const GlobalReplicationGroupInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalReplicationGroupId: S.optional(S.String),
    GlobalReplicationGroupMemberRole: S.optional(S.String),
  }),
).annotate({
  identifier: "GlobalReplicationGroupInfo",
}) as any as S.Schema<GlobalReplicationGroupInfo>;
export type PendingAutomaticFailoverStatus =
  | "enabled"
  | "disabled"
  | (string & {});
export const PendingAutomaticFailoverStatus = S.String;

export interface SlotMigration {
  ProgressPercentage?: number;
}
export const SlotMigration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgressPercentage: S.optional(S.Number) }),
).annotate({ identifier: "SlotMigration" }) as any as S.Schema<SlotMigration>;
export interface ReshardingStatus {
  SlotMigration?: SlotMigration;
}
export const ReshardingStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SlotMigration: S.optional(SlotMigration) }),
).annotate({
  identifier: "ReshardingStatus",
}) as any as S.Schema<ReshardingStatus>;
export type AuthTokenUpdateStatus = "SETTING" | "ROTATING" | (string & {});
export const AuthTokenUpdateStatus = S.String;

export type UserGroupId = string;
export type UserGroupIdList = string[];
export const UserGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface UserGroupsUpdateStatus {
  UserGroupIdsToAdd?: string[];
  UserGroupIdsToRemove?: string[];
}
export const UserGroupsUpdateStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserGroupIdsToAdd: S.optional(UserGroupIdList),
    UserGroupIdsToRemove: S.optional(UserGroupIdList),
  }),
).annotate({
  identifier: "UserGroupsUpdateStatus",
}) as any as S.Schema<UserGroupsUpdateStatus>;
export type LogType = "slow-log" | "engine-log" | (string & {});
export const LogType = S.String;

export type DestinationType =
  | "cloudwatch-logs"
  | "kinesis-firehose"
  | (string & {});
export const DestinationType = S.String;

export interface CloudWatchLogsDestinationDetails {
  LogGroup?: string;
}
export const CloudWatchLogsDestinationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroup: S.optional(S.String) }),
).annotate({
  identifier: "CloudWatchLogsDestinationDetails",
}) as any as S.Schema<CloudWatchLogsDestinationDetails>;
export interface KinesisFirehoseDestinationDetails {
  DeliveryStream?: string;
}
export const KinesisFirehoseDestinationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeliveryStream: S.optional(S.String) }),
).annotate({
  identifier: "KinesisFirehoseDestinationDetails",
}) as any as S.Schema<KinesisFirehoseDestinationDetails>;
export interface DestinationDetails {
  CloudWatchLogsDetails?: CloudWatchLogsDestinationDetails;
  KinesisFirehoseDetails?: KinesisFirehoseDestinationDetails;
}
export const DestinationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogsDetails: S.optional(CloudWatchLogsDestinationDetails),
    KinesisFirehoseDetails: S.optional(KinesisFirehoseDestinationDetails),
  }),
).annotate({
  identifier: "DestinationDetails",
}) as any as S.Schema<DestinationDetails>;
export type LogFormat = "text" | "json" | (string & {});
export const LogFormat = S.String;

export interface PendingLogDeliveryConfiguration {
  LogType?: LogType;
  DestinationType?: DestinationType;
  DestinationDetails?: DestinationDetails;
  LogFormat?: LogFormat;
}
export const PendingLogDeliveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogType: S.optional(LogType),
    DestinationType: S.optional(DestinationType),
    DestinationDetails: S.optional(DestinationDetails),
    LogFormat: S.optional(LogFormat),
  }),
).annotate({
  identifier: "PendingLogDeliveryConfiguration",
}) as any as S.Schema<PendingLogDeliveryConfiguration>;
export type PendingLogDeliveryConfigurationList =
  PendingLogDeliveryConfiguration[];
export const PendingLogDeliveryConfigurationList = /*@__PURE__*/ S.Array(
  PendingLogDeliveryConfiguration,
);
export type TransitEncryptionMode = "preferred" | "required" | (string & {});
export const TransitEncryptionMode = S.String;

export type ClusterMode = "enabled" | "disabled" | "compatible" | (string & {});
export const ClusterMode = S.String;

export interface ReplicationGroupPendingModifiedValues {
  PrimaryClusterId?: string;
  AutomaticFailoverStatus?: PendingAutomaticFailoverStatus;
  Resharding?: ReshardingStatus;
  AuthTokenStatus?: AuthTokenUpdateStatus;
  UserGroups?: UserGroupsUpdateStatus;
  LogDeliveryConfigurations?: PendingLogDeliveryConfiguration[];
  TransitEncryptionEnabled?: boolean;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
}
export const ReplicationGroupPendingModifiedValues = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PrimaryClusterId: S.optional(S.String),
      AutomaticFailoverStatus: S.optional(PendingAutomaticFailoverStatus),
      Resharding: S.optional(ReshardingStatus),
      AuthTokenStatus: S.optional(AuthTokenUpdateStatus),
      UserGroups: S.optional(UserGroupsUpdateStatus),
      LogDeliveryConfigurations: S.optional(
        PendingLogDeliveryConfigurationList,
      ),
      TransitEncryptionEnabled: S.optional(S.Boolean),
      TransitEncryptionMode: S.optional(TransitEncryptionMode),
      ClusterMode: S.optional(ClusterMode),
    }),
).annotate({
  identifier: "ReplicationGroupPendingModifiedValues",
}) as any as S.Schema<ReplicationGroupPendingModifiedValues>;
export type ClusterIdList = string[];
export const ClusterIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("ClusterId")),
);
export interface Endpoint {
  Address?: string;
  Port?: number;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export interface NodeGroupMember {
  CacheClusterId?: string;
  CacheNodeId?: string;
  ReadEndpoint?: Endpoint;
  PreferredAvailabilityZone?: string;
  PreferredOutpostArn?: string;
  CurrentRole?: string;
}
export const NodeGroupMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    CacheNodeId: S.optional(S.String),
    ReadEndpoint: S.optional(Endpoint),
    PreferredAvailabilityZone: S.optional(S.String),
    PreferredOutpostArn: S.optional(S.String),
    CurrentRole: S.optional(S.String),
  }),
).annotate({
  identifier: "NodeGroupMember",
}) as any as S.Schema<NodeGroupMember>;
export type NodeGroupMemberList = NodeGroupMember[];
export const NodeGroupMemberList = /*@__PURE__*/ S.Array(
  NodeGroupMember.pipe(T.XmlName("NodeGroupMember")).annotate({
    identifier: "NodeGroupMember",
  }),
);
export interface NodeGroup {
  NodeGroupId?: string;
  Status?: string;
  PrimaryEndpoint?: Endpoint;
  ReaderEndpoint?: Endpoint;
  Slots?: string;
  NodeGroupMembers?: NodeGroupMember[];
}
export const NodeGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeGroupId: S.optional(S.String),
    Status: S.optional(S.String),
    PrimaryEndpoint: S.optional(Endpoint),
    ReaderEndpoint: S.optional(Endpoint),
    Slots: S.optional(S.String),
    NodeGroupMembers: S.optional(NodeGroupMemberList),
  }),
).annotate({ identifier: "NodeGroup" }) as any as S.Schema<NodeGroup>;
export type NodeGroupList = NodeGroup[];
export const NodeGroupList = /*@__PURE__*/ S.Array(
  NodeGroup.pipe(T.XmlName("NodeGroup")).annotate({ identifier: "NodeGroup" }),
);
export type AutomaticFailoverStatus =
  | "enabled"
  | "disabled"
  | "enabling"
  | "disabling"
  | (string & {});
export const AutomaticFailoverStatus = S.String;

export type MultiAZStatus = "enabled" | "disabled" | (string & {});
export const MultiAZStatus = S.String;

export type ReplicationGroupOutpostArnList = string[];
export const ReplicationGroupOutpostArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("ReplicationGroupOutpostArn")),
);
export type StorageEncryptionType =
  | "none"
  | "sse-elasticache"
  | "sse-kms"
  | (string & {});
export const StorageEncryptionType = S.String;

export type LogDeliveryConfigurationStatus =
  | "active"
  | "enabling"
  | "modifying"
  | "disabling"
  | "error"
  | (string & {});
export const LogDeliveryConfigurationStatus = S.String;

export interface LogDeliveryConfiguration {
  LogType?: LogType;
  DestinationType?: DestinationType;
  DestinationDetails?: DestinationDetails;
  LogFormat?: LogFormat;
  Status?: LogDeliveryConfigurationStatus;
  Message?: string;
}
export const LogDeliveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogType: S.optional(LogType),
    DestinationType: S.optional(DestinationType),
    DestinationDetails: S.optional(DestinationDetails),
    LogFormat: S.optional(LogFormat),
    Status: S.optional(LogDeliveryConfigurationStatus),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "LogDeliveryConfiguration",
}) as any as S.Schema<LogDeliveryConfiguration>;
export type LogDeliveryConfigurationList = LogDeliveryConfiguration[];
export const LogDeliveryConfigurationList = /*@__PURE__*/ S.Array(
  LogDeliveryConfiguration.pipe(T.XmlName("LogDeliveryConfiguration")).annotate(
    { identifier: "LogDeliveryConfiguration" },
  ),
);
export type DataTieringStatus = "enabled" | "disabled" | (string & {});
export const DataTieringStatus = S.String;

export type NetworkType = "ipv4" | "ipv6" | "dual_stack" | (string & {});
export const NetworkType = S.String;

export type IpDiscovery = "ipv4" | "ipv6" | (string & {});
export const IpDiscovery = S.String;

export type Durability =
  | "default"
  | "async"
  | "sync"
  | "disabled"
  | (string & {});
export const Durability = S.String;

export type EffectiveDurability = "async" | "sync" | "disabled" | (string & {});
export const EffectiveDurability = S.String;

export interface ReplicationGroup {
  ReplicationGroupId?: string;
  Description?: string;
  GlobalReplicationGroupInfo?: GlobalReplicationGroupInfo;
  Status?: string;
  PendingModifiedValues?: ReplicationGroupPendingModifiedValues;
  MemberClusters?: string[];
  NodeGroups?: NodeGroup[];
  SnapshottingClusterId?: string;
  AutomaticFailover?: AutomaticFailoverStatus;
  MultiAZ?: MultiAZStatus;
  ConfigurationEndpoint?: Endpoint;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  ClusterEnabled?: boolean;
  CacheNodeType?: string;
  AuthTokenEnabled?: boolean;
  AuthTokenLastModifiedDate?: Date;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  MemberClustersOutpostArns?: string[];
  KmsKeyId?: string;
  StorageEncryptionType?: StorageEncryptionType;
  ARN?: string;
  UserGroupIds?: string[];
  LogDeliveryConfigurations?: LogDeliveryConfiguration[];
  ReplicationGroupCreateTime?: Date;
  DataTiering?: DataTieringStatus;
  AutoMinorVersionUpgrade?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
  Engine?: string;
  Durability?: Durability;
  EffectiveDurability?: EffectiveDurability;
}
export const ReplicationGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    Description: S.optional(S.String),
    GlobalReplicationGroupInfo: S.optional(GlobalReplicationGroupInfo),
    Status: S.optional(S.String),
    PendingModifiedValues: S.optional(ReplicationGroupPendingModifiedValues),
    MemberClusters: S.optional(ClusterIdList),
    NodeGroups: S.optional(NodeGroupList),
    SnapshottingClusterId: S.optional(S.String),
    AutomaticFailover: S.optional(AutomaticFailoverStatus),
    MultiAZ: S.optional(MultiAZStatus),
    ConfigurationEndpoint: S.optional(Endpoint),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    ClusterEnabled: S.optional(S.Boolean),
    CacheNodeType: S.optional(S.String),
    AuthTokenEnabled: S.optional(S.Boolean),
    AuthTokenLastModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    AtRestEncryptionEnabled: S.optional(S.Boolean),
    MemberClustersOutpostArns: S.optional(ReplicationGroupOutpostArnList),
    KmsKeyId: S.optional(S.String),
    StorageEncryptionType: S.optional(StorageEncryptionType),
    ARN: S.optional(S.String),
    UserGroupIds: S.optional(UserGroupIdList),
    LogDeliveryConfigurations: S.optional(LogDeliveryConfigurationList),
    ReplicationGroupCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataTiering: S.optional(DataTieringStatus),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    NetworkType: S.optional(NetworkType),
    IpDiscovery: S.optional(IpDiscovery),
    TransitEncryptionMode: S.optional(TransitEncryptionMode),
    ClusterMode: S.optional(ClusterMode),
    Engine: S.optional(S.String),
    Durability: S.optional(Durability),
    EffectiveDurability: S.optional(EffectiveDurability),
  }),
).annotate({
  identifier: "ReplicationGroup",
}) as any as S.Schema<ReplicationGroup>;
export interface CompleteMigrationResponse {
  ReplicationGroup?: ReplicationGroup;
}
export const CompleteMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "CompleteMigrationResponse",
}) as any as S.Schema<CompleteMigrationResponse>;
export interface CopyServerlessCacheSnapshotRequest {
  SourceServerlessCacheSnapshotName?: string;
  TargetServerlessCacheSnapshotName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CopyServerlessCacheSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceServerlessCacheSnapshotName: S.optional(S.String),
    TargetServerlessCacheSnapshotName: S.optional(S.String),
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
  identifier: "CopyServerlessCacheSnapshotRequest",
}) as any as S.Schema<CopyServerlessCacheSnapshotRequest>;
export interface ServerlessCacheConfiguration {
  ServerlessCacheName?: string;
  Engine?: string;
  MajorEngineVersion?: string;
}
export const ServerlessCacheConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheName: S.optional(S.String),
    Engine: S.optional(S.String),
    MajorEngineVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerlessCacheConfiguration",
}) as any as S.Schema<ServerlessCacheConfiguration>;
export interface ServerlessCacheSnapshot {
  ServerlessCacheSnapshotName?: string;
  ARN?: string;
  KmsKeyId?: string;
  SnapshotType?: string;
  Status?: string;
  CreateTime?: Date;
  ExpiryTime?: Date;
  BytesUsedForCache?: string;
  ServerlessCacheConfiguration?: ServerlessCacheConfiguration;
}
export const ServerlessCacheSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheSnapshotName: S.optional(S.String),
    ARN: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    SnapshotType: S.optional(S.String),
    Status: S.optional(S.String),
    CreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    BytesUsedForCache: S.optional(S.String),
    ServerlessCacheConfiguration: S.optional(ServerlessCacheConfiguration),
  }),
).annotate({
  identifier: "ServerlessCacheSnapshot",
}) as any as S.Schema<ServerlessCacheSnapshot>;
export interface CopyServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export const CopyServerlessCacheSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheSnapshot: S.optional(ServerlessCacheSnapshot),
  }).pipe(ns),
).annotate({
  identifier: "CopyServerlessCacheSnapshotResponse",
}) as any as S.Schema<CopyServerlessCacheSnapshotResponse>;
export interface CopySnapshotMessage {
  SourceSnapshotName?: string;
  TargetSnapshotName?: string;
  TargetBucket?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CopySnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceSnapshotName: S.optional(S.String),
    TargetSnapshotName: S.optional(S.String),
    TargetBucket: S.optional(S.String),
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
  identifier: "CopySnapshotMessage",
}) as any as S.Schema<CopySnapshotMessage>;
export type AllowedNodeGroupId = string;
export type AvailabilityZonesList = string[];
export const AvailabilityZonesList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("AvailabilityZone")),
);
export type OutpostArnsList = string[];
export const OutpostArnsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("OutpostArn")),
);
export interface NodeGroupConfiguration {
  NodeGroupId?: string;
  Slots?: string;
  ReplicaCount?: number;
  PrimaryAvailabilityZone?: string;
  ReplicaAvailabilityZones?: string[];
  PrimaryOutpostArn?: string;
  ReplicaOutpostArns?: string[];
}
export const NodeGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeGroupId: S.optional(S.String),
    Slots: S.optional(S.String),
    ReplicaCount: S.optional(S.Number),
    PrimaryAvailabilityZone: S.optional(S.String),
    ReplicaAvailabilityZones: S.optional(AvailabilityZonesList),
    PrimaryOutpostArn: S.optional(S.String),
    ReplicaOutpostArns: S.optional(OutpostArnsList),
  }),
).annotate({
  identifier: "NodeGroupConfiguration",
}) as any as S.Schema<NodeGroupConfiguration>;
export interface NodeSnapshot {
  CacheClusterId?: string;
  NodeGroupId?: string;
  CacheNodeId?: string;
  NodeGroupConfiguration?: NodeGroupConfiguration;
  CacheSize?: string;
  CacheNodeCreateTime?: Date;
  SnapshotCreateTime?: Date;
}
export const NodeSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    NodeGroupId: S.optional(S.String),
    CacheNodeId: S.optional(S.String),
    NodeGroupConfiguration: S.optional(NodeGroupConfiguration),
    CacheSize: S.optional(S.String),
    CacheNodeCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SnapshotCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "NodeSnapshot" }) as any as S.Schema<NodeSnapshot>;
export type NodeSnapshotList = NodeSnapshot[];
export const NodeSnapshotList = /*@__PURE__*/ S.Array(
  NodeSnapshot.pipe(T.XmlName("NodeSnapshot")).annotate({
    identifier: "NodeSnapshot",
  }),
);
export interface Snapshot {
  SnapshotName?: string;
  ReplicationGroupId?: string;
  ReplicationGroupDescription?: string;
  CacheClusterId?: string;
  SnapshotStatus?: string;
  SnapshotSource?: string;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  NumCacheNodes?: number;
  PreferredAvailabilityZone?: string;
  PreferredOutpostArn?: string;
  CacheClusterCreateTime?: Date;
  PreferredMaintenanceWindow?: string;
  TopicArn?: string;
  Port?: number;
  CacheParameterGroupName?: string;
  CacheSubnetGroupName?: string;
  VpcId?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  NumNodeGroups?: number;
  AutomaticFailover?: AutomaticFailoverStatus;
  NodeSnapshots?: NodeSnapshot[];
  KmsKeyId?: string;
  ARN?: string;
  DataTiering?: DataTieringStatus;
  Durability?: Durability;
}
export const Snapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotName: S.optional(S.String),
    ReplicationGroupId: S.optional(S.String),
    ReplicationGroupDescription: S.optional(S.String),
    CacheClusterId: S.optional(S.String),
    SnapshotStatus: S.optional(S.String),
    SnapshotSource: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    NumCacheNodes: S.optional(S.Number),
    PreferredAvailabilityZone: S.optional(S.String),
    PreferredOutpostArn: S.optional(S.String),
    CacheClusterCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PreferredMaintenanceWindow: S.optional(S.String),
    TopicArn: S.optional(S.String),
    Port: S.optional(S.Number),
    CacheParameterGroupName: S.optional(S.String),
    CacheSubnetGroupName: S.optional(S.String),
    VpcId: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    NumNodeGroups: S.optional(S.Number),
    AutomaticFailover: S.optional(AutomaticFailoverStatus),
    NodeSnapshots: S.optional(NodeSnapshotList),
    KmsKeyId: S.optional(S.String),
    ARN: S.optional(S.String),
    DataTiering: S.optional(DataTieringStatus),
    Durability: S.optional(Durability),
  }),
).annotate({ identifier: "Snapshot" }) as any as S.Schema<Snapshot>;
export interface CopySnapshotResult {
  Snapshot?: Snapshot;
}
export const CopySnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "CopySnapshotResult",
}) as any as S.Schema<CopySnapshotResult>;
export type AZMode = "single-az" | "cross-az" | (string & {});
export const AZMode = S.String;

export type PreferredAvailabilityZoneList = string[];
export const PreferredAvailabilityZoneList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("PreferredAvailabilityZone")),
);
export type CacheSecurityGroupNameList = string[];
export const CacheSecurityGroupNameList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("CacheSecurityGroupName")),
);
export type SecurityGroupIdsList = string[];
export const SecurityGroupIdsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SecurityGroupId")),
);
export type SnapshotArnsList = string[];
export const SnapshotArnsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SnapshotArn")),
);
export type OutpostMode = "single-outpost" | "cross-outpost" | (string & {});
export const OutpostMode = S.String;

export type PreferredOutpostArnList = string[];
export const PreferredOutpostArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("PreferredOutpostArn")),
);
export interface LogDeliveryConfigurationRequest {
  LogType?: LogType;
  DestinationType?: DestinationType;
  DestinationDetails?: DestinationDetails;
  LogFormat?: LogFormat;
  Enabled?: boolean;
}
export const LogDeliveryConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogType: S.optional(LogType),
    DestinationType: S.optional(DestinationType),
    DestinationDetails: S.optional(DestinationDetails),
    LogFormat: S.optional(LogFormat),
    Enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LogDeliveryConfigurationRequest",
}) as any as S.Schema<LogDeliveryConfigurationRequest>;
export type LogDeliveryConfigurationRequestList =
  LogDeliveryConfigurationRequest[];
export const LogDeliveryConfigurationRequestList = /*@__PURE__*/ S.Array(
  LogDeliveryConfigurationRequest.pipe(
    T.XmlName("LogDeliveryConfigurationRequest"),
  ).annotate({ identifier: "LogDeliveryConfigurationRequest" }),
);
export interface CreateCacheClusterMessage {
  CacheClusterId?: string;
  ReplicationGroupId?: string;
  AZMode?: AZMode;
  PreferredAvailabilityZone?: string;
  PreferredAvailabilityZones?: string[];
  NumCacheNodes?: number;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupName?: string;
  CacheSubnetGroupName?: string;
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  SnapshotArns?: string[];
  SnapshotName?: string;
  PreferredMaintenanceWindow?: string;
  Port?: number;
  NotificationTopicArn?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  AuthToken?: string | redacted.Redacted<string>;
  OutpostMode?: OutpostMode;
  PreferredOutpostArn?: string;
  PreferredOutpostArns?: string[];
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  TransitEncryptionEnabled?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
}
export const CreateCacheClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    ReplicationGroupId: S.optional(S.String),
    AZMode: S.optional(AZMode),
    PreferredAvailabilityZone: S.optional(S.String),
    PreferredAvailabilityZones: S.optional(PreferredAvailabilityZoneList),
    NumCacheNodes: S.optional(S.Number),
    CacheNodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    CacheParameterGroupName: S.optional(S.String),
    CacheSubnetGroupName: S.optional(S.String),
    CacheSecurityGroupNames: S.optional(CacheSecurityGroupNameList),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    Tags: S.optional(TagList),
    SnapshotArns: S.optional(SnapshotArnsList),
    SnapshotName: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    Port: S.optional(S.Number),
    NotificationTopicArn: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    AuthToken: S.optional(SensitiveString),
    OutpostMode: S.optional(OutpostMode),
    PreferredOutpostArn: S.optional(S.String),
    PreferredOutpostArns: S.optional(PreferredOutpostArnList),
    LogDeliveryConfigurations: S.optional(LogDeliveryConfigurationRequestList),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    NetworkType: S.optional(NetworkType),
    IpDiscovery: S.optional(IpDiscovery),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCacheClusterMessage",
}) as any as S.Schema<CreateCacheClusterMessage>;
export type CacheNodeIdsList = string[];
export const CacheNodeIdsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("CacheNodeId")),
);
export interface ScaleConfig {
  ScalePercentage?: number;
  ScaleIntervalMinutes?: number;
}
export const ScaleConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalePercentage: S.optional(S.Number),
    ScaleIntervalMinutes: S.optional(S.Number),
  }),
).annotate({ identifier: "ScaleConfig" }) as any as S.Schema<ScaleConfig>;
export interface PendingModifiedValues {
  NumCacheNodes?: number;
  CacheNodeIdsToRemove?: string[];
  EngineVersion?: string;
  CacheNodeType?: string;
  AuthTokenStatus?: AuthTokenUpdateStatus;
  LogDeliveryConfigurations?: PendingLogDeliveryConfiguration[];
  TransitEncryptionEnabled?: boolean;
  TransitEncryptionMode?: TransitEncryptionMode;
  ScaleConfig?: ScaleConfig;
}
export const PendingModifiedValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumCacheNodes: S.optional(S.Number),
    CacheNodeIdsToRemove: S.optional(CacheNodeIdsList),
    EngineVersion: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    AuthTokenStatus: S.optional(AuthTokenUpdateStatus),
    LogDeliveryConfigurations: S.optional(PendingLogDeliveryConfigurationList),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    TransitEncryptionMode: S.optional(TransitEncryptionMode),
    ScaleConfig: S.optional(ScaleConfig),
  }),
).annotate({
  identifier: "PendingModifiedValues",
}) as any as S.Schema<PendingModifiedValues>;
export interface NotificationConfiguration {
  TopicArn?: string;
  TopicStatus?: string;
}
export const NotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    TopicStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export interface CacheSecurityGroupMembership {
  CacheSecurityGroupName?: string;
  Status?: string;
}
export const CacheSecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSecurityGroupName: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "CacheSecurityGroupMembership",
}) as any as S.Schema<CacheSecurityGroupMembership>;
export type CacheSecurityGroupMembershipList = CacheSecurityGroupMembership[];
export const CacheSecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  CacheSecurityGroupMembership.pipe(T.XmlName("CacheSecurityGroup")).annotate({
    identifier: "CacheSecurityGroupMembership",
  }),
);
export interface CacheParameterGroupStatus {
  CacheParameterGroupName?: string;
  ParameterApplyStatus?: string;
  CacheNodeIdsToReboot?: string[];
}
export const CacheParameterGroupStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
    ParameterApplyStatus: S.optional(S.String),
    CacheNodeIdsToReboot: S.optional(CacheNodeIdsList),
  }),
).annotate({
  identifier: "CacheParameterGroupStatus",
}) as any as S.Schema<CacheParameterGroupStatus>;
export interface CacheNode {
  CacheNodeId?: string;
  CacheNodeStatus?: string;
  CacheNodeCreateTime?: Date;
  Endpoint?: Endpoint;
  ParameterGroupStatus?: string;
  SourceCacheNodeId?: string;
  CustomerAvailabilityZone?: string;
  CustomerOutpostArn?: string;
}
export const CacheNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheNodeId: S.optional(S.String),
    CacheNodeStatus: S.optional(S.String),
    CacheNodeCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Endpoint: S.optional(Endpoint),
    ParameterGroupStatus: S.optional(S.String),
    SourceCacheNodeId: S.optional(S.String),
    CustomerAvailabilityZone: S.optional(S.String),
    CustomerOutpostArn: S.optional(S.String),
  }),
).annotate({ identifier: "CacheNode" }) as any as S.Schema<CacheNode>;
export type CacheNodeList = CacheNode[];
export const CacheNodeList = /*@__PURE__*/ S.Array(
  CacheNode.pipe(T.XmlName("CacheNode")).annotate({ identifier: "CacheNode" }),
);
export interface SecurityGroupMembership {
  SecurityGroupId?: string;
  Status?: string;
}
export const SecurityGroupMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityGroupId: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "SecurityGroupMembership",
}) as any as S.Schema<SecurityGroupMembership>;
export type SecurityGroupMembershipList = SecurityGroupMembership[];
export const SecurityGroupMembershipList = /*@__PURE__*/ S.Array(
  SecurityGroupMembership,
);
export interface CacheCluster {
  CacheClusterId?: string;
  ConfigurationEndpoint?: Endpoint;
  ClientDownloadLandingPage?: string;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheClusterStatus?: string;
  NumCacheNodes?: number;
  PreferredAvailabilityZone?: string;
  PreferredOutpostArn?: string;
  CacheClusterCreateTime?: Date;
  PreferredMaintenanceWindow?: string;
  PendingModifiedValues?: PendingModifiedValues;
  NotificationConfiguration?: NotificationConfiguration;
  CacheSecurityGroups?: CacheSecurityGroupMembership[];
  CacheParameterGroup?: CacheParameterGroupStatus;
  CacheSubnetGroupName?: string;
  CacheNodes?: CacheNode[];
  AutoMinorVersionUpgrade?: boolean;
  SecurityGroups?: SecurityGroupMembership[];
  ReplicationGroupId?: string;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  AuthTokenEnabled?: boolean;
  AuthTokenLastModifiedDate?: Date;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  ARN?: string;
  ReplicationGroupLogDeliveryEnabled?: boolean;
  LogDeliveryConfigurations?: LogDeliveryConfiguration[];
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
  TransitEncryptionMode?: TransitEncryptionMode;
}
export const CacheCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    ConfigurationEndpoint: S.optional(Endpoint),
    ClientDownloadLandingPage: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    CacheClusterStatus: S.optional(S.String),
    NumCacheNodes: S.optional(S.Number),
    PreferredAvailabilityZone: S.optional(S.String),
    PreferredOutpostArn: S.optional(S.String),
    CacheClusterCreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PreferredMaintenanceWindow: S.optional(S.String),
    PendingModifiedValues: S.optional(PendingModifiedValues),
    NotificationConfiguration: S.optional(NotificationConfiguration),
    CacheSecurityGroups: S.optional(CacheSecurityGroupMembershipList),
    CacheParameterGroup: S.optional(CacheParameterGroupStatus),
    CacheSubnetGroupName: S.optional(S.String),
    CacheNodes: S.optional(CacheNodeList),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    SecurityGroups: S.optional(SecurityGroupMembershipList),
    ReplicationGroupId: S.optional(S.String),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    AuthTokenEnabled: S.optional(S.Boolean),
    AuthTokenLastModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    AtRestEncryptionEnabled: S.optional(S.Boolean),
    ARN: S.optional(S.String),
    ReplicationGroupLogDeliveryEnabled: S.optional(S.Boolean),
    LogDeliveryConfigurations: S.optional(LogDeliveryConfigurationList),
    NetworkType: S.optional(NetworkType),
    IpDiscovery: S.optional(IpDiscovery),
    TransitEncryptionMode: S.optional(TransitEncryptionMode),
  }),
).annotate({ identifier: "CacheCluster" }) as any as S.Schema<CacheCluster>;
export interface CreateCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export const CreateCacheClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheCluster: S.optional(CacheCluster) }).pipe(ns),
).annotate({
  identifier: "CreateCacheClusterResult",
}) as any as S.Schema<CreateCacheClusterResult>;
export interface CreateCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
  CacheParameterGroupFamily?: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateCacheParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
    CacheParameterGroupFamily: S.optional(S.String),
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
  identifier: "CreateCacheParameterGroupMessage",
}) as any as S.Schema<CreateCacheParameterGroupMessage>;
export interface CacheParameterGroup {
  CacheParameterGroupName?: string;
  CacheParameterGroupFamily?: string;
  Description?: string;
  IsGlobal?: boolean;
  ARN?: string;
}
export const CacheParameterGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
    CacheParameterGroupFamily: S.optional(S.String),
    Description: S.optional(S.String),
    IsGlobal: S.optional(S.Boolean),
    ARN: S.optional(S.String),
  }),
).annotate({
  identifier: "CacheParameterGroup",
}) as any as S.Schema<CacheParameterGroup>;
export interface CreateCacheParameterGroupResult {
  CacheParameterGroup?: CacheParameterGroup;
}
export const CreateCacheParameterGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheParameterGroup: S.optional(CacheParameterGroup) }).pipe(ns),
).annotate({
  identifier: "CreateCacheParameterGroupResult",
}) as any as S.Schema<CreateCacheParameterGroupResult>;
export interface CreateCacheSecurityGroupMessage {
  CacheSecurityGroupName?: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateCacheSecurityGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSecurityGroupName: S.optional(S.String),
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
  identifier: "CreateCacheSecurityGroupMessage",
}) as any as S.Schema<CreateCacheSecurityGroupMessage>;
export interface CreateCacheSecurityGroupResult {
  CacheSecurityGroup?: CacheSecurityGroup;
}
export const CreateCacheSecurityGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheSecurityGroup: S.optional(CacheSecurityGroup) }).pipe(ns),
).annotate({
  identifier: "CreateCacheSecurityGroupResult",
}) as any as S.Schema<CreateCacheSecurityGroupResult>;
export type SubnetIdentifierList = string[];
export const SubnetIdentifierList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SubnetIdentifier")),
);
export interface CreateCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string;
  CacheSubnetGroupDescription?: string;
  SubnetIds?: string[];
  Tags?: Tag[];
}
export const CreateCacheSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSubnetGroupName: S.optional(S.String),
    CacheSubnetGroupDescription: S.optional(S.String),
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
  identifier: "CreateCacheSubnetGroupMessage",
}) as any as S.Schema<CreateCacheSubnetGroupMessage>;
export interface AvailabilityZone {
  Name?: string;
}
export const AvailabilityZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AvailabilityZone",
}) as any as S.Schema<AvailabilityZone>;
export interface SubnetOutpost {
  SubnetOutpostArn?: string;
}
export const SubnetOutpost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetOutpostArn: S.optional(S.String) }),
).annotate({ identifier: "SubnetOutpost" }) as any as S.Schema<SubnetOutpost>;
export type NetworkTypeList = NetworkType[];
export const NetworkTypeList = /*@__PURE__*/ S.Array(NetworkType);
export interface Subnet {
  SubnetIdentifier?: string;
  SubnetAvailabilityZone?: AvailabilityZone;
  SubnetOutpost?: SubnetOutpost;
  SupportedNetworkTypes?: NetworkType[];
}
export const Subnet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIdentifier: S.optional(S.String),
    SubnetAvailabilityZone: S.optional(AvailabilityZone),
    SubnetOutpost: S.optional(SubnetOutpost),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({ identifier: "Subnet" }) as any as S.Schema<Subnet>;
export type SubnetList = Subnet[];
export const SubnetList = /*@__PURE__*/ S.Array(
  Subnet.pipe(T.XmlName("Subnet")).annotate({ identifier: "Subnet" }),
);
export interface CacheSubnetGroup {
  CacheSubnetGroupName?: string;
  CacheSubnetGroupDescription?: string;
  VpcId?: string;
  Subnets?: Subnet[];
  ARN?: string;
  SupportedNetworkTypes?: NetworkType[];
}
export const CacheSubnetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSubnetGroupName: S.optional(S.String),
    CacheSubnetGroupDescription: S.optional(S.String),
    VpcId: S.optional(S.String),
    Subnets: S.optional(SubnetList),
    ARN: S.optional(S.String),
    SupportedNetworkTypes: S.optional(NetworkTypeList),
  }),
).annotate({
  identifier: "CacheSubnetGroup",
}) as any as S.Schema<CacheSubnetGroup>;
export interface CreateCacheSubnetGroupResult {
  CacheSubnetGroup?: CacheSubnetGroup;
}
export const CreateCacheSubnetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheSubnetGroup: S.optional(CacheSubnetGroup) }).pipe(ns),
).annotate({
  identifier: "CreateCacheSubnetGroupResult",
}) as any as S.Schema<CreateCacheSubnetGroupResult>;
export interface CreateGlobalReplicationGroupMessage {
  GlobalReplicationGroupIdSuffix?: string;
  GlobalReplicationGroupDescription?: string;
  PrimaryReplicationGroupId?: string;
}
export const CreateGlobalReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalReplicationGroupIdSuffix: S.optional(S.String),
    GlobalReplicationGroupDescription: S.optional(S.String),
    PrimaryReplicationGroupId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlobalReplicationGroupMessage",
}) as any as S.Schema<CreateGlobalReplicationGroupMessage>;
export interface GlobalReplicationGroupMember {
  ReplicationGroupId?: string;
  ReplicationGroupRegion?: string;
  Role?: string;
  AutomaticFailover?: AutomaticFailoverStatus;
  Status?: string;
}
export const GlobalReplicationGroupMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    ReplicationGroupRegion: S.optional(S.String),
    Role: S.optional(S.String),
    AutomaticFailover: S.optional(AutomaticFailoverStatus),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "GlobalReplicationGroupMember",
}) as any as S.Schema<GlobalReplicationGroupMember>;
export type GlobalReplicationGroupMemberList = GlobalReplicationGroupMember[];
export const GlobalReplicationGroupMemberList = /*@__PURE__*/ S.Array(
  GlobalReplicationGroupMember.pipe(
    T.XmlName("GlobalReplicationGroupMember"),
  ).annotate({ identifier: "GlobalReplicationGroupMember" }),
);
export interface GlobalNodeGroup {
  GlobalNodeGroupId?: string;
  Slots?: string;
}
export const GlobalNodeGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalNodeGroupId: S.optional(S.String),
    Slots: S.optional(S.String),
  }),
).annotate({
  identifier: "GlobalNodeGroup",
}) as any as S.Schema<GlobalNodeGroup>;
export type GlobalNodeGroupList = GlobalNodeGroup[];
export const GlobalNodeGroupList = /*@__PURE__*/ S.Array(
  GlobalNodeGroup.pipe(T.XmlName("GlobalNodeGroup")).annotate({
    identifier: "GlobalNodeGroup",
  }),
);
export interface GlobalReplicationGroup {
  GlobalReplicationGroupId?: string;
  GlobalReplicationGroupDescription?: string;
  Status?: string;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  Members?: GlobalReplicationGroupMember[];
  ClusterEnabled?: boolean;
  GlobalNodeGroups?: GlobalNodeGroup[];
  AuthTokenEnabled?: boolean;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  ARN?: string;
}
export const GlobalReplicationGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalReplicationGroupId: S.optional(S.String),
    GlobalReplicationGroupDescription: S.optional(S.String),
    Status: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    Members: S.optional(GlobalReplicationGroupMemberList),
    ClusterEnabled: S.optional(S.Boolean),
    GlobalNodeGroups: S.optional(GlobalNodeGroupList),
    AuthTokenEnabled: S.optional(S.Boolean),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    AtRestEncryptionEnabled: S.optional(S.Boolean),
    ARN: S.optional(S.String),
  }),
).annotate({
  identifier: "GlobalReplicationGroup",
}) as any as S.Schema<GlobalReplicationGroup>;
export interface CreateGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const CreateGlobalReplicationGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalReplicationGroup: S.optional(GlobalReplicationGroup) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateGlobalReplicationGroupResult",
}) as any as S.Schema<CreateGlobalReplicationGroupResult>;
export type NodeGroupConfigurationList = NodeGroupConfiguration[];
export const NodeGroupConfigurationList = /*@__PURE__*/ S.Array(
  NodeGroupConfiguration.pipe(T.XmlName("NodeGroupConfiguration")).annotate({
    identifier: "NodeGroupConfiguration",
  }),
);
export type UserGroupIdListInput = string[];
export const UserGroupIdListInput = /*@__PURE__*/ S.Array(S.String);
export interface CreateReplicationGroupMessage {
  ReplicationGroupId?: string;
  ReplicationGroupDescription?: string;
  GlobalReplicationGroupId?: string;
  PrimaryClusterId?: string;
  AutomaticFailoverEnabled?: boolean;
  MultiAZEnabled?: boolean;
  NumCacheClusters?: number;
  PreferredCacheClusterAZs?: string[];
  NumNodeGroups?: number;
  ReplicasPerNodeGroup?: number;
  NodeGroupConfiguration?: NodeGroupConfiguration[];
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupName?: string;
  CacheSubnetGroupName?: string;
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  Tags?: Tag[];
  SnapshotArns?: string[];
  SnapshotName?: string;
  PreferredMaintenanceWindow?: string;
  Port?: number;
  NotificationTopicArn?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  AuthToken?: string | redacted.Redacted<string>;
  TransitEncryptionEnabled?: boolean;
  AtRestEncryptionEnabled?: boolean;
  KmsKeyId?: string;
  UserGroupIds?: string[];
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  DataTieringEnabled?: boolean;
  NetworkType?: NetworkType;
  IpDiscovery?: IpDiscovery;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
  ServerlessCacheSnapshotName?: string;
  Durability?: Durability;
}
export const CreateReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    ReplicationGroupDescription: S.optional(S.String),
    GlobalReplicationGroupId: S.optional(S.String),
    PrimaryClusterId: S.optional(S.String),
    AutomaticFailoverEnabled: S.optional(S.Boolean),
    MultiAZEnabled: S.optional(S.Boolean),
    NumCacheClusters: S.optional(S.Number),
    PreferredCacheClusterAZs: S.optional(AvailabilityZonesList),
    NumNodeGroups: S.optional(S.Number),
    ReplicasPerNodeGroup: S.optional(S.Number),
    NodeGroupConfiguration: S.optional(NodeGroupConfigurationList),
    CacheNodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    CacheParameterGroupName: S.optional(S.String),
    CacheSubnetGroupName: S.optional(S.String),
    CacheSecurityGroupNames: S.optional(CacheSecurityGroupNameList),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    Tags: S.optional(TagList),
    SnapshotArns: S.optional(SnapshotArnsList),
    SnapshotName: S.optional(S.String),
    PreferredMaintenanceWindow: S.optional(S.String),
    Port: S.optional(S.Number),
    NotificationTopicArn: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    AuthToken: S.optional(SensitiveString),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    AtRestEncryptionEnabled: S.optional(S.Boolean),
    KmsKeyId: S.optional(S.String),
    UserGroupIds: S.optional(UserGroupIdListInput),
    LogDeliveryConfigurations: S.optional(LogDeliveryConfigurationRequestList),
    DataTieringEnabled: S.optional(S.Boolean),
    NetworkType: S.optional(NetworkType),
    IpDiscovery: S.optional(IpDiscovery),
    TransitEncryptionMode: S.optional(TransitEncryptionMode),
    ClusterMode: S.optional(ClusterMode),
    ServerlessCacheSnapshotName: S.optional(S.String),
    Durability: S.optional(Durability),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReplicationGroupMessage",
}) as any as S.Schema<CreateReplicationGroupMessage>;
export interface CreateReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup;
}
export const CreateReplicationGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "CreateReplicationGroupResult",
}) as any as S.Schema<CreateReplicationGroupResult>;
export type DataStorageUnit = "GB" | (string & {});
export const DataStorageUnit = S.String;

export interface DataStorage {
  Maximum?: number;
  Minimum?: number;
  Unit?: DataStorageUnit;
}
export const DataStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Maximum: S.optional(S.Number),
    Minimum: S.optional(S.Number),
    Unit: S.optional(DataStorageUnit),
  }),
).annotate({ identifier: "DataStorage" }) as any as S.Schema<DataStorage>;
export interface ECPUPerSecond {
  Maximum?: number;
  Minimum?: number;
}
export const ECPUPerSecond = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Maximum: S.optional(S.Number), Minimum: S.optional(S.Number) }),
).annotate({ identifier: "ECPUPerSecond" }) as any as S.Schema<ECPUPerSecond>;
export interface CacheUsageLimits {
  DataStorage?: DataStorage;
  ECPUPerSecond?: ECPUPerSecond;
}
export const CacheUsageLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataStorage: S.optional(DataStorage),
    ECPUPerSecond: S.optional(ECPUPerSecond),
  }),
).annotate({
  identifier: "CacheUsageLimits",
}) as any as S.Schema<CacheUsageLimits>;
export type SubnetIdsList = string[];
export const SubnetIdsList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("SubnetId")),
);
export interface CreateServerlessCacheRequest {
  ServerlessCacheName?: string;
  Description?: string;
  Engine?: string;
  MajorEngineVersion?: string;
  CacheUsageLimits?: CacheUsageLimits;
  KmsKeyId?: string;
  SecurityGroupIds?: string[];
  SnapshotArnsToRestore?: string[];
  Tags?: Tag[];
  UserGroupId?: string;
  SubnetIds?: string[];
  SnapshotRetentionLimit?: number;
  DailySnapshotTime?: string;
  NetworkType?: NetworkType;
}
export const CreateServerlessCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheName: S.optional(S.String),
    Description: S.optional(S.String),
    Engine: S.optional(S.String),
    MajorEngineVersion: S.optional(S.String),
    CacheUsageLimits: S.optional(CacheUsageLimits),
    KmsKeyId: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    SnapshotArnsToRestore: S.optional(SnapshotArnsList),
    Tags: S.optional(TagList),
    UserGroupId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdsList),
    SnapshotRetentionLimit: S.optional(S.Number),
    DailySnapshotTime: S.optional(S.String),
    NetworkType: S.optional(NetworkType),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServerlessCacheRequest",
}) as any as S.Schema<CreateServerlessCacheRequest>;
export interface ServerlessCache {
  ServerlessCacheName?: string;
  Description?: string;
  CreateTime?: Date;
  Status?: string;
  Engine?: string;
  MajorEngineVersion?: string;
  FullEngineVersion?: string;
  CacheUsageLimits?: CacheUsageLimits;
  KmsKeyId?: string;
  StorageEncryptionType?: StorageEncryptionType;
  SecurityGroupIds?: string[];
  Endpoint?: Endpoint;
  ReaderEndpoint?: Endpoint;
  ARN?: string;
  UserGroupId?: string;
  SubnetIds?: string[];
  SnapshotRetentionLimit?: number;
  DailySnapshotTime?: string;
  NetworkType?: NetworkType;
}
export const ServerlessCache = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheName: S.optional(S.String),
    Description: S.optional(S.String),
    CreateTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(S.String),
    Engine: S.optional(S.String),
    MajorEngineVersion: S.optional(S.String),
    FullEngineVersion: S.optional(S.String),
    CacheUsageLimits: S.optional(CacheUsageLimits),
    KmsKeyId: S.optional(S.String),
    StorageEncryptionType: S.optional(StorageEncryptionType),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    Endpoint: S.optional(Endpoint),
    ReaderEndpoint: S.optional(Endpoint),
    ARN: S.optional(S.String),
    UserGroupId: S.optional(S.String),
    SubnetIds: S.optional(SubnetIdsList),
    SnapshotRetentionLimit: S.optional(S.Number),
    DailySnapshotTime: S.optional(S.String),
    NetworkType: S.optional(NetworkType),
  }),
).annotate({
  identifier: "ServerlessCache",
}) as any as S.Schema<ServerlessCache>;
export interface CreateServerlessCacheResponse {
  ServerlessCache?: ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  };
}
export const CreateServerlessCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerlessCache: S.optional(ServerlessCache) }).pipe(ns),
).annotate({
  identifier: "CreateServerlessCacheResponse",
}) as any as S.Schema<CreateServerlessCacheResponse>;
export interface CreateServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string;
  ServerlessCacheName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CreateServerlessCacheSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerlessCacheSnapshotName: S.optional(S.String),
      ServerlessCacheName: S.optional(S.String),
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
  identifier: "CreateServerlessCacheSnapshotRequest",
}) as any as S.Schema<CreateServerlessCacheSnapshotRequest>;
export interface CreateServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export const CreateServerlessCacheSnapshotResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerlessCacheSnapshot: S.optional(ServerlessCacheSnapshot),
    }).pipe(ns),
).annotate({
  identifier: "CreateServerlessCacheSnapshotResponse",
}) as any as S.Schema<CreateServerlessCacheSnapshotResponse>;
export interface CreateSnapshotMessage {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  SnapshotName?: string;
  KmsKeyId?: string;
  Tags?: Tag[];
}
export const CreateSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CacheClusterId: S.optional(S.String),
    SnapshotName: S.optional(S.String),
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
  identifier: "CreateSnapshotMessage",
}) as any as S.Schema<CreateSnapshotMessage>;
export interface CreateSnapshotResult {
  Snapshot?: Snapshot;
}
export const CreateSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "CreateSnapshotResult",
}) as any as S.Schema<CreateSnapshotResult>;
export type UserId = string;
export type UserName = string;
export type EngineType = string;
export type PasswordListInput = string[];
export const PasswordListInput = /*@__PURE__*/ S.Array(S.String);
export type AccessString = string;
export type InputAuthenticationType =
  | "password"
  | "no-password-required"
  | "iam"
  | (string & {});
export const InputAuthenticationType = S.String;

export interface AuthenticationMode {
  Type?: InputAuthenticationType;
  Passwords?: Array<string | redacted.Redacted<string>>;
}
export const AuthenticationMode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(InputAuthenticationType),
    Passwords: S.optional(S.Array(SensitiveString)),
  }),
).annotate({
  identifier: "AuthenticationMode",
}) as any as S.Schema<AuthenticationMode>;
export interface CreateUserMessage {
  UserId?: string;
  UserName?: string;
  Engine?: string;
  Passwords?: Array<string | redacted.Redacted<string>>;
  AccessString?: string;
  NoPasswordRequired?: boolean;
  Tags?: Tag[];
  AuthenticationMode?: AuthenticationMode;
}
export const CreateUserMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    UserName: S.optional(S.String),
    Engine: S.optional(S.String),
    Passwords: S.optional(S.Array(SensitiveString)),
    AccessString: S.optional(S.String),
    NoPasswordRequired: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    AuthenticationMode: S.optional(AuthenticationMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserMessage",
}) as any as S.Schema<CreateUserMessage>;
export type AuthenticationType =
  | "password"
  | "no-password"
  | "iam"
  | (string & {});
export const AuthenticationType = S.String;

export interface Authentication {
  Type?: AuthenticationType;
  PasswordCount?: number;
}
export const Authentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(AuthenticationType),
    PasswordCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Authentication" }) as any as S.Schema<Authentication>;
export interface User {
  UserId?: string;
  UserName?: string;
  Status?: string;
  Engine?: string;
  MinimumEngineVersion?: string;
  AccessString?: string;
  UserGroupIds?: string[];
  Authentication?: Authentication;
  ARN?: string;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    UserName: S.optional(S.String),
    Status: S.optional(S.String),
    Engine: S.optional(S.String),
    MinimumEngineVersion: S.optional(S.String),
    AccessString: S.optional(S.String),
    UserGroupIds: S.optional(UserGroupIdList),
    Authentication: S.optional(Authentication),
    ARN: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type UserIdListInput = string[];
export const UserIdListInput = /*@__PURE__*/ S.Array(S.String);
export interface CreateUserGroupMessage {
  UserGroupId?: string;
  Engine?: string;
  UserIds?: string[];
  Tags?: Tag[];
}
export const CreateUserGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserGroupId: S.optional(S.String),
    Engine: S.optional(S.String),
    UserIds: S.optional(UserIdListInput),
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
  identifier: "CreateUserGroupMessage",
}) as any as S.Schema<CreateUserGroupMessage>;
export type UserIdList = string[];
export const UserIdList = /*@__PURE__*/ S.Array(S.String);
export interface UserGroupPendingChanges {
  UserIdsToRemove?: string[];
  UserIdsToAdd?: string[];
}
export const UserGroupPendingChanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserIdsToRemove: S.optional(UserIdList),
    UserIdsToAdd: S.optional(UserIdList),
  }),
).annotate({
  identifier: "UserGroupPendingChanges",
}) as any as S.Schema<UserGroupPendingChanges>;
export type UGReplicationGroupIdList = string[];
export const UGReplicationGroupIdList = /*@__PURE__*/ S.Array(S.String);
export type UGServerlessCacheIdList = string[];
export const UGServerlessCacheIdList = /*@__PURE__*/ S.Array(S.String);
export interface UserGroup {
  UserGroupId?: string;
  Status?: string;
  Engine?: string;
  UserIds?: string[];
  MinimumEngineVersion?: string;
  PendingChanges?: UserGroupPendingChanges;
  ReplicationGroups?: string[];
  ServerlessCaches?: string[];
  ARN?: string;
}
export const UserGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserGroupId: S.optional(S.String),
    Status: S.optional(S.String),
    Engine: S.optional(S.String),
    UserIds: S.optional(UserIdList),
    MinimumEngineVersion: S.optional(S.String),
    PendingChanges: S.optional(UserGroupPendingChanges),
    ReplicationGroups: S.optional(UGReplicationGroupIdList),
    ServerlessCaches: S.optional(UGServerlessCacheIdList),
    ARN: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "UserGroup" }) as any as S.Schema<UserGroup>;
export type GlobalNodeGroupIdList = string[];
export const GlobalNodeGroupIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("GlobalNodeGroupId")),
);
export interface DecreaseNodeGroupsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  NodeGroupCount?: number;
  GlobalNodeGroupsToRemove?: string[];
  GlobalNodeGroupsToRetain?: string[];
  ApplyImmediately?: boolean;
}
export const DecreaseNodeGroupsInGlobalReplicationGroupMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroupId: S.optional(S.String),
      NodeGroupCount: S.optional(S.Number),
      GlobalNodeGroupsToRemove: S.optional(GlobalNodeGroupIdList),
      GlobalNodeGroupsToRetain: S.optional(GlobalNodeGroupIdList),
      ApplyImmediately: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DecreaseNodeGroupsInGlobalReplicationGroupMessage",
  }) as any as S.Schema<DecreaseNodeGroupsInGlobalReplicationGroupMessage>;
export interface DecreaseNodeGroupsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const DecreaseNodeGroupsInGlobalReplicationGroupResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroup: S.optional(GlobalReplicationGroup),
    }).pipe(ns),
  ).annotate({
    identifier: "DecreaseNodeGroupsInGlobalReplicationGroupResult",
  }) as any as S.Schema<DecreaseNodeGroupsInGlobalReplicationGroupResult>;
export interface ConfigureShard {
  NodeGroupId?: string;
  NewReplicaCount?: number;
  PreferredAvailabilityZones?: string[];
  PreferredOutpostArns?: string[];
}
export const ConfigureShard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeGroupId: S.optional(S.String),
    NewReplicaCount: S.optional(S.Number),
    PreferredAvailabilityZones: S.optional(PreferredAvailabilityZoneList),
    PreferredOutpostArns: S.optional(PreferredOutpostArnList),
  }),
).annotate({ identifier: "ConfigureShard" }) as any as S.Schema<ConfigureShard>;
export type ReplicaConfigurationList = ConfigureShard[];
export const ReplicaConfigurationList = /*@__PURE__*/ S.Array(
  ConfigureShard.pipe(T.XmlName("ConfigureShard")).annotate({
    identifier: "ConfigureShard",
  }),
);
export type RemoveReplicasList = string[];
export const RemoveReplicasList = /*@__PURE__*/ S.Array(S.String);
export interface DecreaseReplicaCountMessage {
  ReplicationGroupId?: string;
  NewReplicaCount?: number;
  ReplicaConfiguration?: ConfigureShard[];
  ReplicasToRemove?: string[];
  ApplyImmediately?: boolean;
}
export const DecreaseReplicaCountMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    NewReplicaCount: S.optional(S.Number),
    ReplicaConfiguration: S.optional(ReplicaConfigurationList),
    ReplicasToRemove: S.optional(RemoveReplicasList),
    ApplyImmediately: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DecreaseReplicaCountMessage",
}) as any as S.Schema<DecreaseReplicaCountMessage>;
export interface DecreaseReplicaCountResult {
  ReplicationGroup?: ReplicationGroup;
}
export const DecreaseReplicaCountResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "DecreaseReplicaCountResult",
}) as any as S.Schema<DecreaseReplicaCountResult>;
export interface DeleteCacheClusterMessage {
  CacheClusterId?: string;
  FinalSnapshotIdentifier?: string;
}
export const DeleteCacheClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    FinalSnapshotIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCacheClusterMessage",
}) as any as S.Schema<DeleteCacheClusterMessage>;
export interface DeleteCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export const DeleteCacheClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheCluster: S.optional(CacheCluster) }).pipe(ns),
).annotate({
  identifier: "DeleteCacheClusterResult",
}) as any as S.Schema<DeleteCacheClusterResult>;
export interface DeleteCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
}
export const DeleteCacheParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheParameterGroupName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCacheParameterGroupMessage",
}) as any as S.Schema<DeleteCacheParameterGroupMessage>;
export interface DeleteCacheParameterGroupResponse {}
export const DeleteCacheParameterGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCacheParameterGroupResponse",
}) as any as S.Schema<DeleteCacheParameterGroupResponse>;
export interface DeleteCacheSecurityGroupMessage {
  CacheSecurityGroupName?: string;
}
export const DeleteCacheSecurityGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheSecurityGroupName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCacheSecurityGroupMessage",
}) as any as S.Schema<DeleteCacheSecurityGroupMessage>;
export interface DeleteCacheSecurityGroupResponse {}
export const DeleteCacheSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCacheSecurityGroupResponse",
}) as any as S.Schema<DeleteCacheSecurityGroupResponse>;
export interface DeleteCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string;
}
export const DeleteCacheSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheSubnetGroupName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCacheSubnetGroupMessage",
}) as any as S.Schema<DeleteCacheSubnetGroupMessage>;
export interface DeleteCacheSubnetGroupResponse {}
export const DeleteCacheSubnetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCacheSubnetGroupResponse",
}) as any as S.Schema<DeleteCacheSubnetGroupResponse>;
export interface DeleteGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  RetainPrimaryReplicationGroup?: boolean;
}
export const DeleteGlobalReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalReplicationGroupId: S.optional(S.String),
    RetainPrimaryReplicationGroup: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlobalReplicationGroupMessage",
}) as any as S.Schema<DeleteGlobalReplicationGroupMessage>;
export interface DeleteGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const DeleteGlobalReplicationGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalReplicationGroup: S.optional(GlobalReplicationGroup) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DeleteGlobalReplicationGroupResult",
}) as any as S.Schema<DeleteGlobalReplicationGroupResult>;
export interface DeleteReplicationGroupMessage {
  ReplicationGroupId?: string;
  RetainPrimaryCluster?: boolean;
  FinalSnapshotIdentifier?: string;
}
export const DeleteReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    RetainPrimaryCluster: S.optional(S.Boolean),
    FinalSnapshotIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReplicationGroupMessage",
}) as any as S.Schema<DeleteReplicationGroupMessage>;
export interface DeleteReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup;
}
export const DeleteReplicationGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "DeleteReplicationGroupResult",
}) as any as S.Schema<DeleteReplicationGroupResult>;
export interface DeleteServerlessCacheRequest {
  ServerlessCacheName?: string;
  FinalSnapshotName?: string;
}
export const DeleteServerlessCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheName: S.optional(S.String),
    FinalSnapshotName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServerlessCacheRequest",
}) as any as S.Schema<DeleteServerlessCacheRequest>;
export interface DeleteServerlessCacheResponse {
  ServerlessCache?: ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  };
}
export const DeleteServerlessCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerlessCache: S.optional(ServerlessCache) }).pipe(ns),
).annotate({
  identifier: "DeleteServerlessCacheResponse",
}) as any as S.Schema<DeleteServerlessCacheResponse>;
export interface DeleteServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string;
}
export const DeleteServerlessCacheSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ServerlessCacheSnapshotName: S.optional(S.String) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteServerlessCacheSnapshotRequest",
}) as any as S.Schema<DeleteServerlessCacheSnapshotRequest>;
export interface DeleteServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export const DeleteServerlessCacheSnapshotResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerlessCacheSnapshot: S.optional(ServerlessCacheSnapshot),
    }).pipe(ns),
).annotate({
  identifier: "DeleteServerlessCacheSnapshotResponse",
}) as any as S.Schema<DeleteServerlessCacheSnapshotResponse>;
export interface DeleteSnapshotMessage {
  SnapshotName?: string;
}
export const DeleteSnapshotMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnapshotName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSnapshotMessage",
}) as any as S.Schema<DeleteSnapshotMessage>;
export interface DeleteSnapshotResult {
  Snapshot?: Snapshot;
}
export const DeleteSnapshotResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Snapshot: S.optional(Snapshot) }).pipe(ns),
).annotate({
  identifier: "DeleteSnapshotResult",
}) as any as S.Schema<DeleteSnapshotResult>;
export interface DeleteUserMessage {
  UserId?: string;
}
export const DeleteUserMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserMessage",
}) as any as S.Schema<DeleteUserMessage>;
export interface DeleteUserGroupMessage {
  UserGroupId?: string;
}
export const DeleteUserGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserGroupId: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserGroupMessage",
}) as any as S.Schema<DeleteUserGroupMessage>;
export interface DescribeCacheClustersMessage {
  CacheClusterId?: string;
  MaxRecords?: number;
  Marker?: string;
  ShowCacheNodeInfo?: boolean;
  ShowCacheClustersNotInReplicationGroups?: boolean;
}
export const DescribeCacheClustersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    ShowCacheNodeInfo: S.optional(S.Boolean),
    ShowCacheClustersNotInReplicationGroups: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCacheClustersMessage",
}) as any as S.Schema<DescribeCacheClustersMessage>;
export type CacheClusterList = CacheCluster[];
export const CacheClusterList = /*@__PURE__*/ S.Array(
  CacheCluster.pipe(T.XmlName("CacheCluster")).annotate({
    identifier: "CacheCluster",
  }),
);
export interface CacheClusterMessage {
  Marker?: string;
  CacheClusters?: CacheCluster[];
}
export const CacheClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    CacheClusters: S.optional(CacheClusterList),
  }).pipe(ns),
).annotate({
  identifier: "CacheClusterMessage",
}) as any as S.Schema<CacheClusterMessage>;
export interface DescribeCacheEngineVersionsMessage {
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
  DefaultOnly?: boolean;
}
export const DescribeCacheEngineVersionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    CacheParameterGroupFamily: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Marker: S.optional(S.String),
    DefaultOnly: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCacheEngineVersionsMessage",
}) as any as S.Schema<DescribeCacheEngineVersionsMessage>;
export interface CacheEngineVersion {
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupFamily?: string;
  CacheEngineDescription?: string;
  CacheEngineVersionDescription?: string;
}
export const CacheEngineVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    CacheParameterGroupFamily: S.optional(S.String),
    CacheEngineDescription: S.optional(S.String),
    CacheEngineVersionDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "CacheEngineVersion",
}) as any as S.Schema<CacheEngineVersion>;
export type CacheEngineVersionList = CacheEngineVersion[];
export const CacheEngineVersionList = /*@__PURE__*/ S.Array(
  CacheEngineVersion.pipe(T.XmlName("CacheEngineVersion")).annotate({
    identifier: "CacheEngineVersion",
  }),
);
export interface CacheEngineVersionMessage {
  Marker?: string;
  CacheEngineVersions?: CacheEngineVersion[];
}
export const CacheEngineVersionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    CacheEngineVersions: S.optional(CacheEngineVersionList),
  }).pipe(ns),
).annotate({
  identifier: "CacheEngineVersionMessage",
}) as any as S.Schema<CacheEngineVersionMessage>;
export interface DescribeCacheParameterGroupsMessage {
  CacheParameterGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCacheParameterGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
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
  identifier: "DescribeCacheParameterGroupsMessage",
}) as any as S.Schema<DescribeCacheParameterGroupsMessage>;
export type CacheParameterGroupList = CacheParameterGroup[];
export const CacheParameterGroupList = /*@__PURE__*/ S.Array(
  CacheParameterGroup.pipe(T.XmlName("CacheParameterGroup")).annotate({
    identifier: "CacheParameterGroup",
  }),
);
export interface CacheParameterGroupsMessage {
  Marker?: string;
  CacheParameterGroups?: CacheParameterGroup[];
}
export const CacheParameterGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    CacheParameterGroups: S.optional(CacheParameterGroupList),
  }).pipe(ns),
).annotate({
  identifier: "CacheParameterGroupsMessage",
}) as any as S.Schema<CacheParameterGroupsMessage>;
export interface DescribeCacheParametersMessage {
  CacheParameterGroupName?: string;
  Source?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCacheParametersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
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
  identifier: "DescribeCacheParametersMessage",
}) as any as S.Schema<DescribeCacheParametersMessage>;
export type ChangeType = "immediate" | "requires-reboot" | (string & {});
export const ChangeType = S.String;

export interface Parameter {
  ParameterName?: string;
  ParameterValue?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
  ChangeType?: ChangeType;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
    Description: S.optional(S.String),
    Source: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    IsModifiable: S.optional(S.Boolean),
    MinimumEngineVersion: S.optional(S.String),
    ChangeType: S.optional(ChangeType),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParametersList = Parameter[];
export const ParametersList = /*@__PURE__*/ S.Array(
  Parameter.pipe(T.XmlName("Parameter")).annotate({ identifier: "Parameter" }),
);
export interface CacheNodeTypeSpecificValue {
  CacheNodeType?: string;
  Value?: string;
}
export const CacheNodeTypeSpecificValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheNodeType: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "CacheNodeTypeSpecificValue",
}) as any as S.Schema<CacheNodeTypeSpecificValue>;
export type CacheNodeTypeSpecificValueList = CacheNodeTypeSpecificValue[];
export const CacheNodeTypeSpecificValueList = /*@__PURE__*/ S.Array(
  CacheNodeTypeSpecificValue.pipe(
    T.XmlName("CacheNodeTypeSpecificValue"),
  ).annotate({ identifier: "CacheNodeTypeSpecificValue" }),
);
export interface CacheNodeTypeSpecificParameter {
  ParameterName?: string;
  Description?: string;
  Source?: string;
  DataType?: string;
  AllowedValues?: string;
  IsModifiable?: boolean;
  MinimumEngineVersion?: string;
  CacheNodeTypeSpecificValues?: CacheNodeTypeSpecificValue[];
  ChangeType?: ChangeType;
}
export const CacheNodeTypeSpecificParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    Description: S.optional(S.String),
    Source: S.optional(S.String),
    DataType: S.optional(S.String),
    AllowedValues: S.optional(S.String),
    IsModifiable: S.optional(S.Boolean),
    MinimumEngineVersion: S.optional(S.String),
    CacheNodeTypeSpecificValues: S.optional(CacheNodeTypeSpecificValueList),
    ChangeType: S.optional(ChangeType),
  }),
).annotate({
  identifier: "CacheNodeTypeSpecificParameter",
}) as any as S.Schema<CacheNodeTypeSpecificParameter>;
export type CacheNodeTypeSpecificParametersList =
  CacheNodeTypeSpecificParameter[];
export const CacheNodeTypeSpecificParametersList = /*@__PURE__*/ S.Array(
  CacheNodeTypeSpecificParameter.pipe(
    T.XmlName("CacheNodeTypeSpecificParameter"),
  ).annotate({ identifier: "CacheNodeTypeSpecificParameter" }),
);
export interface CacheParameterGroupDetails {
  Marker?: string;
  Parameters?: Parameter[];
  CacheNodeTypeSpecificParameters?: CacheNodeTypeSpecificParameter[];
}
export const CacheParameterGroupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Parameters: S.optional(ParametersList),
    CacheNodeTypeSpecificParameters: S.optional(
      CacheNodeTypeSpecificParametersList,
    ),
  }).pipe(ns),
).annotate({
  identifier: "CacheParameterGroupDetails",
}) as any as S.Schema<CacheParameterGroupDetails>;
export interface DescribeCacheSecurityGroupsMessage {
  CacheSecurityGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCacheSecurityGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSecurityGroupName: S.optional(S.String),
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
  identifier: "DescribeCacheSecurityGroupsMessage",
}) as any as S.Schema<DescribeCacheSecurityGroupsMessage>;
export type CacheSecurityGroups = CacheSecurityGroup[];
export const CacheSecurityGroups = /*@__PURE__*/ S.Array(
  CacheSecurityGroup.pipe(T.XmlName("CacheSecurityGroup")).annotate({
    identifier: "CacheSecurityGroup",
  }),
);
export interface CacheSecurityGroupMessage {
  Marker?: string;
  CacheSecurityGroups?: CacheSecurityGroup[];
}
export const CacheSecurityGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    CacheSecurityGroups: S.optional(CacheSecurityGroups),
  }).pipe(ns),
).annotate({
  identifier: "CacheSecurityGroupMessage",
}) as any as S.Schema<CacheSecurityGroupMessage>;
export interface DescribeCacheSubnetGroupsMessage {
  CacheSubnetGroupName?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeCacheSubnetGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSubnetGroupName: S.optional(S.String),
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
  identifier: "DescribeCacheSubnetGroupsMessage",
}) as any as S.Schema<DescribeCacheSubnetGroupsMessage>;
export type CacheSubnetGroups = CacheSubnetGroup[];
export const CacheSubnetGroups = /*@__PURE__*/ S.Array(
  CacheSubnetGroup.pipe(T.XmlName("CacheSubnetGroup")).annotate({
    identifier: "CacheSubnetGroup",
  }),
);
export interface CacheSubnetGroupMessage {
  Marker?: string;
  CacheSubnetGroups?: CacheSubnetGroup[];
}
export const CacheSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    CacheSubnetGroups: S.optional(CacheSubnetGroups),
  }).pipe(ns),
).annotate({
  identifier: "CacheSubnetGroupMessage",
}) as any as S.Schema<CacheSubnetGroupMessage>;
export interface DescribeEngineDefaultParametersMessage {
  CacheParameterGroupFamily?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeEngineDefaultParametersMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CacheParameterGroupFamily: S.optional(S.String),
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
  identifier: "DescribeEngineDefaultParametersMessage",
}) as any as S.Schema<DescribeEngineDefaultParametersMessage>;
export interface EngineDefaults {
  CacheParameterGroupFamily?: string;
  Marker?: string;
  Parameters?: Parameter[];
  CacheNodeTypeSpecificParameters?: CacheNodeTypeSpecificParameter[];
}
export const EngineDefaults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupFamily: S.optional(S.String),
    Marker: S.optional(S.String),
    Parameters: S.optional(ParametersList),
    CacheNodeTypeSpecificParameters: S.optional(
      CacheNodeTypeSpecificParametersList,
    ),
  }),
).annotate({ identifier: "EngineDefaults" }) as any as S.Schema<EngineDefaults>;
export interface DescribeEngineDefaultParametersResult {
  EngineDefaults?: EngineDefaults;
}
export const DescribeEngineDefaultParametersResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ EngineDefaults: S.optional(EngineDefaults) }).pipe(ns),
).annotate({
  identifier: "DescribeEngineDefaultParametersResult",
}) as any as S.Schema<DescribeEngineDefaultParametersResult>;
export type SourceType =
  | "cache-cluster"
  | "cache-parameter-group"
  | "cache-security-group"
  | "cache-subnet-group"
  | "replication-group"
  | "serverless-cache"
  | "serverless-cache-snapshot"
  | "user"
  | "user-group"
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
  Date?: Date;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIdentifier: S.optional(S.String),
    SourceType: S.optional(SourceType),
    Message: S.optional(S.String),
    Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
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
export interface DescribeGlobalReplicationGroupsMessage {
  GlobalReplicationGroupId?: string;
  MaxRecords?: number;
  Marker?: string;
  ShowMemberInfo?: boolean;
}
export const DescribeGlobalReplicationGroupsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GlobalReplicationGroupId: S.optional(S.String),
      MaxRecords: S.optional(S.Number),
      Marker: S.optional(S.String),
      ShowMemberInfo: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeGlobalReplicationGroupsMessage",
}) as any as S.Schema<DescribeGlobalReplicationGroupsMessage>;
export type GlobalReplicationGroupList = GlobalReplicationGroup[];
export const GlobalReplicationGroupList = /*@__PURE__*/ S.Array(
  GlobalReplicationGroup.pipe(T.XmlName("GlobalReplicationGroup")).annotate({
    identifier: "GlobalReplicationGroup",
  }),
);
export interface DescribeGlobalReplicationGroupsResult {
  Marker?: string;
  GlobalReplicationGroups?: GlobalReplicationGroup[];
}
export const DescribeGlobalReplicationGroupsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      GlobalReplicationGroups: S.optional(GlobalReplicationGroupList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeGlobalReplicationGroupsResult",
}) as any as S.Schema<DescribeGlobalReplicationGroupsResult>;
export interface DescribeReplicationGroupsMessage {
  ReplicationGroupId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReplicationGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
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
  identifier: "DescribeReplicationGroupsMessage",
}) as any as S.Schema<DescribeReplicationGroupsMessage>;
export type ReplicationGroupList = ReplicationGroup[];
export const ReplicationGroupList = /*@__PURE__*/ S.Array(
  ReplicationGroup.pipe(T.XmlName("ReplicationGroup")).annotate({
    identifier: "ReplicationGroup",
  }),
);
export interface ReplicationGroupMessage {
  Marker?: string;
  ReplicationGroups?: ReplicationGroup[];
}
export const ReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReplicationGroups: S.optional(ReplicationGroupList),
  }).pipe(ns),
).annotate({
  identifier: "ReplicationGroupMessage",
}) as any as S.Schema<ReplicationGroupMessage>;
export interface DescribeReservedCacheNodesMessage {
  ReservedCacheNodeId?: string;
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  Duration?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReservedCacheNodesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedCacheNodeId: S.optional(S.String),
    ReservedCacheNodesOfferingId: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    Duration: S.optional(S.String),
    ProductDescription: S.optional(S.String),
    OfferingType: S.optional(S.String),
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
  identifier: "DescribeReservedCacheNodesMessage",
}) as any as S.Schema<DescribeReservedCacheNodesMessage>;
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
export interface ReservedCacheNode {
  ReservedCacheNodeId?: string;
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  StartTime?: Date;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  CacheNodeCount?: number;
  ProductDescription?: string;
  OfferingType?: string;
  State?: string;
  RecurringCharges?: RecurringCharge[];
  ReservationARN?: string;
}
export const ReservedCacheNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedCacheNodeId: S.optional(S.String),
    ReservedCacheNodesOfferingId: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    CacheNodeCount: S.optional(S.Number),
    ProductDescription: S.optional(S.String),
    OfferingType: S.optional(S.String),
    State: S.optional(S.String),
    RecurringCharges: S.optional(RecurringChargeList),
    ReservationARN: S.optional(S.String),
  }),
).annotate({
  identifier: "ReservedCacheNode",
}) as any as S.Schema<ReservedCacheNode>;
export type ReservedCacheNodeList = ReservedCacheNode[];
export const ReservedCacheNodeList = /*@__PURE__*/ S.Array(
  ReservedCacheNode.pipe(T.XmlName("ReservedCacheNode")).annotate({
    identifier: "ReservedCacheNode",
  }),
);
export interface ReservedCacheNodeMessage {
  Marker?: string;
  ReservedCacheNodes?: ReservedCacheNode[];
}
export const ReservedCacheNodeMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReservedCacheNodes: S.optional(ReservedCacheNodeList),
  }).pipe(ns),
).annotate({
  identifier: "ReservedCacheNodeMessage",
}) as any as S.Schema<ReservedCacheNodeMessage>;
export interface DescribeReservedCacheNodesOfferingsMessage {
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  Duration?: string;
  ProductDescription?: string;
  OfferingType?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeReservedCacheNodesOfferingsMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedCacheNodesOfferingId: S.optional(S.String),
      CacheNodeType: S.optional(S.String),
      Duration: S.optional(S.String),
      ProductDescription: S.optional(S.String),
      OfferingType: S.optional(S.String),
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
    identifier: "DescribeReservedCacheNodesOfferingsMessage",
  }) as any as S.Schema<DescribeReservedCacheNodesOfferingsMessage>;
export interface ReservedCacheNodesOffering {
  ReservedCacheNodesOfferingId?: string;
  CacheNodeType?: string;
  Duration?: number;
  FixedPrice?: number;
  UsagePrice?: number;
  ProductDescription?: string;
  OfferingType?: string;
  RecurringCharges?: RecurringCharge[];
}
export const ReservedCacheNodesOffering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReservedCacheNodesOfferingId: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    Duration: S.optional(S.Number),
    FixedPrice: S.optional(S.Number),
    UsagePrice: S.optional(S.Number),
    ProductDescription: S.optional(S.String),
    OfferingType: S.optional(S.String),
    RecurringCharges: S.optional(RecurringChargeList),
  }),
).annotate({
  identifier: "ReservedCacheNodesOffering",
}) as any as S.Schema<ReservedCacheNodesOffering>;
export type ReservedCacheNodesOfferingList = ReservedCacheNodesOffering[];
export const ReservedCacheNodesOfferingList = /*@__PURE__*/ S.Array(
  ReservedCacheNodesOffering.pipe(
    T.XmlName("ReservedCacheNodesOffering"),
  ).annotate({ identifier: "ReservedCacheNodesOffering" }),
);
export interface ReservedCacheNodesOfferingMessage {
  Marker?: string;
  ReservedCacheNodesOfferings?: ReservedCacheNodesOffering[];
}
export const ReservedCacheNodesOfferingMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ReservedCacheNodesOfferings: S.optional(ReservedCacheNodesOfferingList),
  }).pipe(ns),
).annotate({
  identifier: "ReservedCacheNodesOfferingMessage",
}) as any as S.Schema<ReservedCacheNodesOfferingMessage>;
export interface DescribeServerlessCachesRequest {
  ServerlessCacheName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeServerlessCachesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheName: S.optional(S.String),
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
  identifier: "DescribeServerlessCachesRequest",
}) as any as S.Schema<DescribeServerlessCachesRequest>;
export type ServerlessCacheList = ServerlessCache[];
export const ServerlessCacheList = /*@__PURE__*/ S.Array(ServerlessCache);
export interface DescribeServerlessCachesResponse {
  NextToken?: string;
  ServerlessCaches?: (ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  })[];
}
export const DescribeServerlessCachesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ServerlessCaches: S.optional(ServerlessCacheList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeServerlessCachesResponse",
}) as any as S.Schema<DescribeServerlessCachesResponse>;
export interface DescribeServerlessCacheSnapshotsRequest {
  ServerlessCacheName?: string;
  ServerlessCacheSnapshotName?: string;
  SnapshotType?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeServerlessCacheSnapshotsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerlessCacheName: S.optional(S.String),
      ServerlessCacheSnapshotName: S.optional(S.String),
      SnapshotType: S.optional(S.String),
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
  identifier: "DescribeServerlessCacheSnapshotsRequest",
}) as any as S.Schema<DescribeServerlessCacheSnapshotsRequest>;
export type ServerlessCacheSnapshotList = ServerlessCacheSnapshot[];
export const ServerlessCacheSnapshotList = /*@__PURE__*/ S.Array(
  ServerlessCacheSnapshot.pipe(T.XmlName("ServerlessCacheSnapshot")).annotate({
    identifier: "ServerlessCacheSnapshot",
  }),
);
export interface DescribeServerlessCacheSnapshotsResponse {
  NextToken?: string;
  ServerlessCacheSnapshots?: ServerlessCacheSnapshot[];
}
export const DescribeServerlessCacheSnapshotsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      ServerlessCacheSnapshots: S.optional(ServerlessCacheSnapshotList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeServerlessCacheSnapshotsResponse",
}) as any as S.Schema<DescribeServerlessCacheSnapshotsResponse>;
export type ServiceUpdateStatus =
  | "available"
  | "cancelled"
  | "expired"
  | (string & {});
export const ServiceUpdateStatus = S.String;

export type ServiceUpdateStatusList = ServiceUpdateStatus[];
export const ServiceUpdateStatusList =
  /*@__PURE__*/ S.Array(ServiceUpdateStatus);
export interface DescribeServiceUpdatesMessage {
  ServiceUpdateName?: string;
  ServiceUpdateStatus?: ServiceUpdateStatus[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeServiceUpdatesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceUpdateName: S.optional(S.String),
    ServiceUpdateStatus: S.optional(ServiceUpdateStatusList),
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
  identifier: "DescribeServiceUpdatesMessage",
}) as any as S.Schema<DescribeServiceUpdatesMessage>;
export type ServiceUpdateSeverity =
  | "critical"
  | "important"
  | "medium"
  | "low"
  | (string & {});
export const ServiceUpdateSeverity = S.String;

export type ServiceUpdateType = "security-update" | (string & {});
export const ServiceUpdateType = S.String;

export interface ServiceUpdate {
  ServiceUpdateName?: string;
  ServiceUpdateReleaseDate?: Date;
  ServiceUpdateEndDate?: Date;
  ServiceUpdateSeverity?: ServiceUpdateSeverity;
  ServiceUpdateRecommendedApplyByDate?: Date;
  ServiceUpdateStatus?: ServiceUpdateStatus;
  ServiceUpdateDescription?: string;
  ServiceUpdateType?: ServiceUpdateType;
  Engine?: string;
  EngineVersion?: string;
  AutoUpdateAfterRecommendedApplyByDate?: boolean;
  EstimatedUpdateTime?: string;
}
export const ServiceUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceUpdateName: S.optional(S.String),
    ServiceUpdateReleaseDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceUpdateEndDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceUpdateSeverity: S.optional(ServiceUpdateSeverity),
    ServiceUpdateRecommendedApplyByDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceUpdateStatus: S.optional(ServiceUpdateStatus),
    ServiceUpdateDescription: S.optional(S.String),
    ServiceUpdateType: S.optional(ServiceUpdateType),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    AutoUpdateAfterRecommendedApplyByDate: S.optional(S.Boolean),
    EstimatedUpdateTime: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceUpdate" }) as any as S.Schema<ServiceUpdate>;
export type ServiceUpdateList = ServiceUpdate[];
export const ServiceUpdateList = /*@__PURE__*/ S.Array(
  ServiceUpdate.pipe(T.XmlName("ServiceUpdate")).annotate({
    identifier: "ServiceUpdate",
  }),
);
export interface ServiceUpdatesMessage {
  Marker?: string;
  ServiceUpdates?: ServiceUpdate[];
}
export const ServiceUpdatesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    ServiceUpdates: S.optional(ServiceUpdateList),
  }).pipe(ns),
).annotate({
  identifier: "ServiceUpdatesMessage",
}) as any as S.Schema<ServiceUpdatesMessage>;
export interface DescribeSnapshotsMessage {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  SnapshotName?: string;
  SnapshotSource?: string;
  Marker?: string;
  MaxRecords?: number;
  ShowNodeGroupConfig?: boolean;
}
export const DescribeSnapshotsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CacheClusterId: S.optional(S.String),
    SnapshotName: S.optional(S.String),
    SnapshotSource: S.optional(S.String),
    Marker: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    ShowNodeGroupConfig: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSnapshotsMessage",
}) as any as S.Schema<DescribeSnapshotsMessage>;
export type SnapshotList = Snapshot[];
export const SnapshotList = /*@__PURE__*/ S.Array(
  Snapshot.pipe(T.XmlName("Snapshot")).annotate({ identifier: "Snapshot" }),
);
export interface DescribeSnapshotsListMessage {
  Marker?: string;
  Snapshots?: Snapshot[];
}
export const DescribeSnapshotsListMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    Snapshots: S.optional(SnapshotList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSnapshotsListMessage",
}) as any as S.Schema<DescribeSnapshotsListMessage>;
export interface TimeRangeFilter {
  StartTime?: Date;
  EndTime?: Date;
}
export const TimeRangeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "TimeRangeFilter",
}) as any as S.Schema<TimeRangeFilter>;
export type UpdateActionStatusList = UpdateActionStatus[];
export const UpdateActionStatusList = /*@__PURE__*/ S.Array(UpdateActionStatus);
export interface DescribeUpdateActionsMessage {
  ServiceUpdateName?: string;
  ReplicationGroupIds?: string[];
  CacheClusterIds?: string[];
  Engine?: string;
  ServiceUpdateStatus?: ServiceUpdateStatus[];
  ServiceUpdateTimeRange?: TimeRangeFilter;
  UpdateActionStatus?: UpdateActionStatus[];
  ShowNodeLevelUpdateStatus?: boolean;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeUpdateActionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceUpdateName: S.optional(S.String),
    ReplicationGroupIds: S.optional(ReplicationGroupIdList),
    CacheClusterIds: S.optional(CacheClusterIdList),
    Engine: S.optional(S.String),
    ServiceUpdateStatus: S.optional(ServiceUpdateStatusList),
    ServiceUpdateTimeRange: S.optional(TimeRangeFilter),
    UpdateActionStatus: S.optional(UpdateActionStatusList),
    ShowNodeLevelUpdateStatus: S.optional(S.Boolean),
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
  identifier: "DescribeUpdateActionsMessage",
}) as any as S.Schema<DescribeUpdateActionsMessage>;
export type SlaMet = "yes" | "no" | "n/a" | (string & {});
export const SlaMet = S.String;

export type NodeUpdateStatus =
  | "not-applied"
  | "waiting-to-start"
  | "in-progress"
  | "stopping"
  | "stopped"
  | "complete"
  | (string & {});
export const NodeUpdateStatus = S.String;

export type NodeUpdateInitiatedBy = "system" | "customer" | (string & {});
export const NodeUpdateInitiatedBy = S.String;

export interface NodeGroupMemberUpdateStatus {
  CacheClusterId?: string;
  CacheNodeId?: string;
  NodeUpdateStatus?: NodeUpdateStatus;
  NodeDeletionDate?: Date;
  NodeUpdateStartDate?: Date;
  NodeUpdateEndDate?: Date;
  NodeUpdateInitiatedBy?: NodeUpdateInitiatedBy;
  NodeUpdateInitiatedDate?: Date;
  NodeUpdateStatusModifiedDate?: Date;
}
export const NodeGroupMemberUpdateStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    CacheNodeId: S.optional(S.String),
    NodeUpdateStatus: S.optional(NodeUpdateStatus),
    NodeDeletionDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateStartDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateEndDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateInitiatedBy: S.optional(NodeUpdateInitiatedBy),
    NodeUpdateInitiatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateStatusModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "NodeGroupMemberUpdateStatus",
}) as any as S.Schema<NodeGroupMemberUpdateStatus>;
export type NodeGroupMemberUpdateStatusList = NodeGroupMemberUpdateStatus[];
export const NodeGroupMemberUpdateStatusList = /*@__PURE__*/ S.Array(
  NodeGroupMemberUpdateStatus.pipe(
    T.XmlName("NodeGroupMemberUpdateStatus"),
  ).annotate({ identifier: "NodeGroupMemberUpdateStatus" }),
);
export interface NodeGroupUpdateStatus {
  NodeGroupId?: string;
  NodeGroupMemberUpdateStatus?: NodeGroupMemberUpdateStatus[];
}
export const NodeGroupUpdateStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeGroupId: S.optional(S.String),
    NodeGroupMemberUpdateStatus: S.optional(NodeGroupMemberUpdateStatusList),
  }),
).annotate({
  identifier: "NodeGroupUpdateStatus",
}) as any as S.Schema<NodeGroupUpdateStatus>;
export type NodeGroupUpdateStatusList = NodeGroupUpdateStatus[];
export const NodeGroupUpdateStatusList = /*@__PURE__*/ S.Array(
  NodeGroupUpdateStatus.pipe(T.XmlName("NodeGroupUpdateStatus")).annotate({
    identifier: "NodeGroupUpdateStatus",
  }),
);
export interface CacheNodeUpdateStatus {
  CacheNodeId?: string;
  NodeUpdateStatus?: NodeUpdateStatus;
  NodeDeletionDate?: Date;
  NodeUpdateStartDate?: Date;
  NodeUpdateEndDate?: Date;
  NodeUpdateInitiatedBy?: NodeUpdateInitiatedBy;
  NodeUpdateInitiatedDate?: Date;
  NodeUpdateStatusModifiedDate?: Date;
}
export const CacheNodeUpdateStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheNodeId: S.optional(S.String),
    NodeUpdateStatus: S.optional(NodeUpdateStatus),
    NodeDeletionDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateStartDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateEndDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateInitiatedBy: S.optional(NodeUpdateInitiatedBy),
    NodeUpdateInitiatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NodeUpdateStatusModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CacheNodeUpdateStatus",
}) as any as S.Schema<CacheNodeUpdateStatus>;
export type CacheNodeUpdateStatusList = CacheNodeUpdateStatus[];
export const CacheNodeUpdateStatusList = /*@__PURE__*/ S.Array(
  CacheNodeUpdateStatus.pipe(T.XmlName("CacheNodeUpdateStatus")).annotate({
    identifier: "CacheNodeUpdateStatus",
  }),
);
export interface UpdateAction {
  ReplicationGroupId?: string;
  CacheClusterId?: string;
  ServiceUpdateName?: string;
  ServiceUpdateReleaseDate?: Date;
  ServiceUpdateSeverity?: ServiceUpdateSeverity;
  ServiceUpdateStatus?: ServiceUpdateStatus;
  ServiceUpdateRecommendedApplyByDate?: Date;
  ServiceUpdateType?: ServiceUpdateType;
  UpdateActionAvailableDate?: Date;
  UpdateActionStatus?: UpdateActionStatus;
  NodesUpdated?: string;
  UpdateActionStatusModifiedDate?: Date;
  SlaMet?: SlaMet;
  NodeGroupUpdateStatus?: NodeGroupUpdateStatus[];
  CacheNodeUpdateStatus?: CacheNodeUpdateStatus[];
  EstimatedUpdateTime?: string;
  Engine?: string;
}
export const UpdateAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CacheClusterId: S.optional(S.String),
    ServiceUpdateName: S.optional(S.String),
    ServiceUpdateReleaseDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceUpdateSeverity: S.optional(ServiceUpdateSeverity),
    ServiceUpdateStatus: S.optional(ServiceUpdateStatus),
    ServiceUpdateRecommendedApplyByDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ServiceUpdateType: S.optional(ServiceUpdateType),
    UpdateActionAvailableDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdateActionStatus: S.optional(UpdateActionStatus),
    NodesUpdated: S.optional(S.String),
    UpdateActionStatusModifiedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    SlaMet: S.optional(SlaMet),
    NodeGroupUpdateStatus: S.optional(NodeGroupUpdateStatusList),
    CacheNodeUpdateStatus: S.optional(CacheNodeUpdateStatusList),
    EstimatedUpdateTime: S.optional(S.String),
    Engine: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateAction" }) as any as S.Schema<UpdateAction>;
export type UpdateActionList = UpdateAction[];
export const UpdateActionList = /*@__PURE__*/ S.Array(
  UpdateAction.pipe(T.XmlName("UpdateAction")).annotate({
    identifier: "UpdateAction",
  }),
);
export interface UpdateActionsMessage {
  Marker?: string;
  UpdateActions?: UpdateAction[];
}
export const UpdateActionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String),
    UpdateActions: S.optional(UpdateActionList),
  }).pipe(ns),
).annotate({
  identifier: "UpdateActionsMessage",
}) as any as S.Schema<UpdateActionsMessage>;
export interface DescribeUserGroupsMessage {
  UserGroupId?: string;
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeUserGroupsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserGroupId: S.optional(S.String),
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
  identifier: "DescribeUserGroupsMessage",
}) as any as S.Schema<DescribeUserGroupsMessage>;
export type UserGroupList = UserGroup[];
export const UserGroupList = /*@__PURE__*/ S.Array(UserGroup);
export interface DescribeUserGroupsResult {
  UserGroups?: UserGroup[];
  Marker?: string;
}
export const DescribeUserGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserGroups: S.optional(UserGroupList),
    Marker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeUserGroupsResult",
}) as any as S.Schema<DescribeUserGroupsResult>;
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Name?: string;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Values: S.optional(FilterValueList) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface DescribeUsersMessage {
  Engine?: string;
  UserId?: string;
  Filters?: Filter[];
  MaxRecords?: number;
  Marker?: string;
}
export const DescribeUsersMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(S.String),
    UserId: S.optional(S.String),
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
  identifier: "DescribeUsersMessage",
}) as any as S.Schema<DescribeUsersMessage>;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface DescribeUsersResult {
  Users?: User[];
  Marker?: string;
}
export const DescribeUsersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Users: S.optional(UserList), Marker: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeUsersResult",
}) as any as S.Schema<DescribeUsersResult>;
export interface DisassociateGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  ReplicationGroupId?: string;
  ReplicationGroupRegion?: string;
}
export const DisassociateGlobalReplicationGroupMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroupId: S.optional(S.String),
      ReplicationGroupId: S.optional(S.String),
      ReplicationGroupRegion: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateGlobalReplicationGroupMessage",
  }) as any as S.Schema<DisassociateGlobalReplicationGroupMessage>;
export interface DisassociateGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const DisassociateGlobalReplicationGroupResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GlobalReplicationGroup: S.optional(GlobalReplicationGroup),
    }).pipe(ns),
).annotate({
  identifier: "DisassociateGlobalReplicationGroupResult",
}) as any as S.Schema<DisassociateGlobalReplicationGroupResult>;
export interface ExportServerlessCacheSnapshotRequest {
  ServerlessCacheSnapshotName?: string;
  S3BucketName?: string;
}
export const ExportServerlessCacheSnapshotRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerlessCacheSnapshotName: S.optional(S.String),
      S3BucketName: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ExportServerlessCacheSnapshotRequest",
}) as any as S.Schema<ExportServerlessCacheSnapshotRequest>;
export interface ExportServerlessCacheSnapshotResponse {
  ServerlessCacheSnapshot?: ServerlessCacheSnapshot;
}
export const ExportServerlessCacheSnapshotResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServerlessCacheSnapshot: S.optional(ServerlessCacheSnapshot),
    }).pipe(ns),
).annotate({
  identifier: "ExportServerlessCacheSnapshotResponse",
}) as any as S.Schema<ExportServerlessCacheSnapshotResponse>;
export interface FailoverGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  PrimaryRegion?: string;
  PrimaryReplicationGroupId?: string;
}
export const FailoverGlobalReplicationGroupMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GlobalReplicationGroupId: S.optional(S.String),
      PrimaryRegion: S.optional(S.String),
      PrimaryReplicationGroupId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "FailoverGlobalReplicationGroupMessage",
}) as any as S.Schema<FailoverGlobalReplicationGroupMessage>;
export interface FailoverGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const FailoverGlobalReplicationGroupResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GlobalReplicationGroup: S.optional(GlobalReplicationGroup),
    }).pipe(ns),
).annotate({
  identifier: "FailoverGlobalReplicationGroupResult",
}) as any as S.Schema<FailoverGlobalReplicationGroupResult>;
export interface ReshardingConfiguration {
  NodeGroupId?: string;
  PreferredAvailabilityZones?: string[];
}
export const ReshardingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NodeGroupId: S.optional(S.String),
    PreferredAvailabilityZones: S.optional(AvailabilityZonesList),
  }),
).annotate({
  identifier: "ReshardingConfiguration",
}) as any as S.Schema<ReshardingConfiguration>;
export type ReshardingConfigurationList = ReshardingConfiguration[];
export const ReshardingConfigurationList = /*@__PURE__*/ S.Array(
  ReshardingConfiguration.pipe(T.XmlName("ReshardingConfiguration")).annotate({
    identifier: "ReshardingConfiguration",
  }),
);
export interface RegionalConfiguration {
  ReplicationGroupId?: string;
  ReplicationGroupRegion?: string;
  ReshardingConfiguration?: ReshardingConfiguration[];
}
export const RegionalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    ReplicationGroupRegion: S.optional(S.String),
    ReshardingConfiguration: S.optional(ReshardingConfigurationList),
  }),
).annotate({
  identifier: "RegionalConfiguration",
}) as any as S.Schema<RegionalConfiguration>;
export type RegionalConfigurationList = RegionalConfiguration[];
export const RegionalConfigurationList = /*@__PURE__*/ S.Array(
  RegionalConfiguration.pipe(T.XmlName("RegionalConfiguration")).annotate({
    identifier: "RegionalConfiguration",
  }),
);
export interface IncreaseNodeGroupsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  NodeGroupCount?: number;
  RegionalConfigurations?: RegionalConfiguration[];
  ApplyImmediately?: boolean;
}
export const IncreaseNodeGroupsInGlobalReplicationGroupMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroupId: S.optional(S.String),
      NodeGroupCount: S.optional(S.Number),
      RegionalConfigurations: S.optional(RegionalConfigurationList),
      ApplyImmediately: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "IncreaseNodeGroupsInGlobalReplicationGroupMessage",
  }) as any as S.Schema<IncreaseNodeGroupsInGlobalReplicationGroupMessage>;
export interface IncreaseNodeGroupsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const IncreaseNodeGroupsInGlobalReplicationGroupResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroup: S.optional(GlobalReplicationGroup),
    }).pipe(ns),
  ).annotate({
    identifier: "IncreaseNodeGroupsInGlobalReplicationGroupResult",
  }) as any as S.Schema<IncreaseNodeGroupsInGlobalReplicationGroupResult>;
export interface IncreaseReplicaCountMessage {
  ReplicationGroupId?: string;
  NewReplicaCount?: number;
  ReplicaConfiguration?: ConfigureShard[];
  ApplyImmediately?: boolean;
}
export const IncreaseReplicaCountMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    NewReplicaCount: S.optional(S.Number),
    ReplicaConfiguration: S.optional(ReplicaConfigurationList),
    ApplyImmediately: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "IncreaseReplicaCountMessage",
}) as any as S.Schema<IncreaseReplicaCountMessage>;
export interface IncreaseReplicaCountResult {
  ReplicationGroup?: ReplicationGroup;
}
export const IncreaseReplicaCountResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "IncreaseReplicaCountResult",
}) as any as S.Schema<IncreaseReplicaCountResult>;
export interface ListAllowedNodeTypeModificationsMessage {
  CacheClusterId?: string;
  ReplicationGroupId?: string;
}
export const ListAllowedNodeTypeModificationsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CacheClusterId: S.optional(S.String),
      ReplicationGroupId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAllowedNodeTypeModificationsMessage",
}) as any as S.Schema<ListAllowedNodeTypeModificationsMessage>;
export type NodeTypeList = string[];
export const NodeTypeList = /*@__PURE__*/ S.Array(S.String);
export interface AllowedNodeTypeModificationsMessage {
  ScaleUpModifications?: string[];
  ScaleDownModifications?: string[];
}
export const AllowedNodeTypeModificationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScaleUpModifications: S.optional(NodeTypeList),
    ScaleDownModifications: S.optional(NodeTypeList),
  }).pipe(ns),
).annotate({
  identifier: "AllowedNodeTypeModificationsMessage",
}) as any as S.Schema<AllowedNodeTypeModificationsMessage>;
export interface ListTagsForResourceMessage {
  ResourceName?: string;
}
export const ListTagsForResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceName: S.optional(S.String) }).pipe(
    T.all(
      ns,
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
export type AuthTokenUpdateStrategyType =
  | "SET"
  | "ROTATE"
  | "DELETE"
  | (string & {});
export const AuthTokenUpdateStrategyType = S.String;

export interface ModifyCacheClusterMessage {
  CacheClusterId?: string;
  NumCacheNodes?: number;
  CacheNodeIdsToRemove?: string[];
  AZMode?: AZMode;
  NewAvailabilityZones?: string[];
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  CacheParameterGroupName?: string;
  NotificationTopicStatus?: string;
  ApplyImmediately?: boolean;
  Engine?: string;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  CacheNodeType?: string;
  AuthToken?: string | redacted.Redacted<string>;
  AuthTokenUpdateStrategy?: AuthTokenUpdateStrategyType;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  IpDiscovery?: IpDiscovery;
  ScaleConfig?: ScaleConfig;
}
export const ModifyCacheClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    NumCacheNodes: S.optional(S.Number),
    CacheNodeIdsToRemove: S.optional(CacheNodeIdsList),
    AZMode: S.optional(AZMode),
    NewAvailabilityZones: S.optional(PreferredAvailabilityZoneList),
    CacheSecurityGroupNames: S.optional(CacheSecurityGroupNameList),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    PreferredMaintenanceWindow: S.optional(S.String),
    NotificationTopicArn: S.optional(S.String),
    CacheParameterGroupName: S.optional(S.String),
    NotificationTopicStatus: S.optional(S.String),
    ApplyImmediately: S.optional(S.Boolean),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    AuthToken: S.optional(SensitiveString),
    AuthTokenUpdateStrategy: S.optional(AuthTokenUpdateStrategyType),
    LogDeliveryConfigurations: S.optional(LogDeliveryConfigurationRequestList),
    IpDiscovery: S.optional(IpDiscovery),
    ScaleConfig: S.optional(ScaleConfig),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyCacheClusterMessage",
}) as any as S.Schema<ModifyCacheClusterMessage>;
export interface ModifyCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export const ModifyCacheClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheCluster: S.optional(CacheCluster) }).pipe(ns),
).annotate({
  identifier: "ModifyCacheClusterResult",
}) as any as S.Schema<ModifyCacheClusterResult>;
export interface ParameterNameValue {
  ParameterName?: string;
  ParameterValue?: string;
}
export const ParameterNameValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterName: S.optional(S.String),
    ParameterValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterNameValue",
}) as any as S.Schema<ParameterNameValue>;
export type ParameterNameValueList = ParameterNameValue[];
export const ParameterNameValueList = /*@__PURE__*/ S.Array(
  ParameterNameValue.pipe(T.XmlName("ParameterNameValue")).annotate({
    identifier: "ParameterNameValue",
  }),
);
export interface ModifyCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
  ParameterNameValues?: ParameterNameValue[];
}
export const ModifyCacheParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
    ParameterNameValues: S.optional(ParameterNameValueList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyCacheParameterGroupMessage",
}) as any as S.Schema<ModifyCacheParameterGroupMessage>;
export interface CacheParameterGroupNameMessage {
  CacheParameterGroupName?: string;
}
export const CacheParameterGroupNameMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheParameterGroupName: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CacheParameterGroupNameMessage",
}) as any as S.Schema<CacheParameterGroupNameMessage>;
export interface ModifyCacheSubnetGroupMessage {
  CacheSubnetGroupName?: string;
  CacheSubnetGroupDescription?: string;
  SubnetIds?: string[];
}
export const ModifyCacheSubnetGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheSubnetGroupName: S.optional(S.String),
    CacheSubnetGroupDescription: S.optional(S.String),
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
  identifier: "ModifyCacheSubnetGroupMessage",
}) as any as S.Schema<ModifyCacheSubnetGroupMessage>;
export interface ModifyCacheSubnetGroupResult {
  CacheSubnetGroup?: CacheSubnetGroup;
}
export const ModifyCacheSubnetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheSubnetGroup: S.optional(CacheSubnetGroup) }).pipe(ns),
).annotate({
  identifier: "ModifyCacheSubnetGroupResult",
}) as any as S.Schema<ModifyCacheSubnetGroupResult>;
export interface ModifyGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  ApplyImmediately?: boolean;
  CacheNodeType?: string;
  Engine?: string;
  EngineVersion?: string;
  CacheParameterGroupName?: string;
  GlobalReplicationGroupDescription?: string;
  AutomaticFailoverEnabled?: boolean;
}
export const ModifyGlobalReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalReplicationGroupId: S.optional(S.String),
    ApplyImmediately: S.optional(S.Boolean),
    CacheNodeType: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    CacheParameterGroupName: S.optional(S.String),
    GlobalReplicationGroupDescription: S.optional(S.String),
    AutomaticFailoverEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyGlobalReplicationGroupMessage",
}) as any as S.Schema<ModifyGlobalReplicationGroupMessage>;
export interface ModifyGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const ModifyGlobalReplicationGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlobalReplicationGroup: S.optional(GlobalReplicationGroup) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ModifyGlobalReplicationGroupResult",
}) as any as S.Schema<ModifyGlobalReplicationGroupResult>;
export interface ModifyReplicationGroupMessage {
  ReplicationGroupId?: string;
  ReplicationGroupDescription?: string;
  PrimaryClusterId?: string;
  SnapshottingClusterId?: string;
  AutomaticFailoverEnabled?: boolean;
  MultiAZEnabled?: boolean;
  NodeGroupId?: string;
  CacheSecurityGroupNames?: string[];
  SecurityGroupIds?: string[];
  PreferredMaintenanceWindow?: string;
  NotificationTopicArn?: string;
  CacheParameterGroupName?: string;
  NotificationTopicStatus?: string;
  ApplyImmediately?: boolean;
  Engine?: string;
  EngineVersion?: string;
  AutoMinorVersionUpgrade?: boolean;
  SnapshotRetentionLimit?: number;
  SnapshotWindow?: string;
  CacheNodeType?: string;
  AuthToken?: string | redacted.Redacted<string>;
  AuthTokenUpdateStrategy?: AuthTokenUpdateStrategyType;
  UserGroupIdsToAdd?: string[];
  UserGroupIdsToRemove?: string[];
  RemoveUserGroups?: boolean;
  LogDeliveryConfigurations?: LogDeliveryConfigurationRequest[];
  IpDiscovery?: IpDiscovery;
  TransitEncryptionEnabled?: boolean;
  TransitEncryptionMode?: TransitEncryptionMode;
  ClusterMode?: ClusterMode;
  Durability?: Durability;
}
export const ModifyReplicationGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    ReplicationGroupDescription: S.optional(S.String),
    PrimaryClusterId: S.optional(S.String),
    SnapshottingClusterId: S.optional(S.String),
    AutomaticFailoverEnabled: S.optional(S.Boolean),
    MultiAZEnabled: S.optional(S.Boolean),
    NodeGroupId: S.optional(S.String),
    CacheSecurityGroupNames: S.optional(CacheSecurityGroupNameList),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    PreferredMaintenanceWindow: S.optional(S.String),
    NotificationTopicArn: S.optional(S.String),
    CacheParameterGroupName: S.optional(S.String),
    NotificationTopicStatus: S.optional(S.String),
    ApplyImmediately: S.optional(S.Boolean),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    AutoMinorVersionUpgrade: S.optional(S.Boolean),
    SnapshotRetentionLimit: S.optional(S.Number),
    SnapshotWindow: S.optional(S.String),
    CacheNodeType: S.optional(S.String),
    AuthToken: S.optional(SensitiveString),
    AuthTokenUpdateStrategy: S.optional(AuthTokenUpdateStrategyType),
    UserGroupIdsToAdd: S.optional(UserGroupIdList),
    UserGroupIdsToRemove: S.optional(UserGroupIdList),
    RemoveUserGroups: S.optional(S.Boolean),
    LogDeliveryConfigurations: S.optional(LogDeliveryConfigurationRequestList),
    IpDiscovery: S.optional(IpDiscovery),
    TransitEncryptionEnabled: S.optional(S.Boolean),
    TransitEncryptionMode: S.optional(TransitEncryptionMode),
    ClusterMode: S.optional(ClusterMode),
    Durability: S.optional(Durability),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyReplicationGroupMessage",
}) as any as S.Schema<ModifyReplicationGroupMessage>;
export interface ModifyReplicationGroupResult {
  ReplicationGroup?: ReplicationGroup;
}
export const ModifyReplicationGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "ModifyReplicationGroupResult",
}) as any as S.Schema<ModifyReplicationGroupResult>;
export type NodeGroupsToRemoveList = string[];
export const NodeGroupsToRemoveList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("NodeGroupToRemove")),
);
export type NodeGroupsToRetainList = string[];
export const NodeGroupsToRetainList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("NodeGroupToRetain")),
);
export interface ModifyReplicationGroupShardConfigurationMessage {
  ReplicationGroupId?: string;
  NodeGroupCount?: number;
  ApplyImmediately?: boolean;
  ReshardingConfiguration?: ReshardingConfiguration[];
  NodeGroupsToRemove?: string[];
  NodeGroupsToRetain?: string[];
}
export const ModifyReplicationGroupShardConfigurationMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReplicationGroupId: S.optional(S.String),
      NodeGroupCount: S.optional(S.Number),
      ApplyImmediately: S.optional(S.Boolean),
      ReshardingConfiguration: S.optional(ReshardingConfigurationList),
      NodeGroupsToRemove: S.optional(NodeGroupsToRemoveList),
      NodeGroupsToRetain: S.optional(NodeGroupsToRetainList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ModifyReplicationGroupShardConfigurationMessage",
  }) as any as S.Schema<ModifyReplicationGroupShardConfigurationMessage>;
export interface ModifyReplicationGroupShardConfigurationResult {
  ReplicationGroup?: ReplicationGroup;
}
export const ModifyReplicationGroupShardConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
  ).annotate({
    identifier: "ModifyReplicationGroupShardConfigurationResult",
  }) as any as S.Schema<ModifyReplicationGroupShardConfigurationResult>;
export interface ModifyServerlessCacheRequest {
  ServerlessCacheName?: string;
  Description?: string;
  CacheUsageLimits?: CacheUsageLimits;
  RemoveUserGroup?: boolean;
  UserGroupId?: string;
  SecurityGroupIds?: string[];
  SnapshotRetentionLimit?: number;
  DailySnapshotTime?: string;
  Engine?: string;
  MajorEngineVersion?: string;
}
export const ModifyServerlessCacheRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerlessCacheName: S.optional(S.String),
    Description: S.optional(S.String),
    CacheUsageLimits: S.optional(CacheUsageLimits),
    RemoveUserGroup: S.optional(S.Boolean),
    UserGroupId: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIdsList),
    SnapshotRetentionLimit: S.optional(S.Number),
    DailySnapshotTime: S.optional(S.String),
    Engine: S.optional(S.String),
    MajorEngineVersion: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyServerlessCacheRequest",
}) as any as S.Schema<ModifyServerlessCacheRequest>;
export interface ModifyServerlessCacheResponse {
  ServerlessCache?: ServerlessCache & {
    CacheUsageLimits: CacheUsageLimits & {
      DataStorage: DataStorage & { Unit: DataStorageUnit };
    };
  };
}
export const ModifyServerlessCacheResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServerlessCache: S.optional(ServerlessCache) }).pipe(ns),
).annotate({
  identifier: "ModifyServerlessCacheResponse",
}) as any as S.Schema<ModifyServerlessCacheResponse>;
export interface ModifyUserMessage {
  UserId?: string;
  AccessString?: string;
  AppendAccessString?: string;
  Passwords?: Array<string | redacted.Redacted<string>>;
  NoPasswordRequired?: boolean;
  AuthenticationMode?: AuthenticationMode;
  Engine?: string;
}
export const ModifyUserMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    AccessString: S.optional(S.String),
    AppendAccessString: S.optional(S.String),
    Passwords: S.optional(S.Array(SensitiveString)),
    NoPasswordRequired: S.optional(S.Boolean),
    AuthenticationMode: S.optional(AuthenticationMode),
    Engine: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyUserMessage",
}) as any as S.Schema<ModifyUserMessage>;
export interface ModifyUserGroupMessage {
  UserGroupId?: string;
  UserIdsToAdd?: string[];
  UserIdsToRemove?: string[];
  Engine?: string;
}
export const ModifyUserGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserGroupId: S.optional(S.String),
    UserIdsToAdd: S.optional(UserIdListInput),
    UserIdsToRemove: S.optional(UserIdListInput),
    Engine: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ModifyUserGroupMessage",
}) as any as S.Schema<ModifyUserGroupMessage>;
export interface PurchaseReservedCacheNodesOfferingMessage {
  ReservedCacheNodesOfferingId?: string;
  ReservedCacheNodeId?: string;
  CacheNodeCount?: number;
  Tags?: Tag[];
}
export const PurchaseReservedCacheNodesOfferingMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReservedCacheNodesOfferingId: S.optional(S.String),
      ReservedCacheNodeId: S.optional(S.String),
      CacheNodeCount: S.optional(S.Number),
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
    identifier: "PurchaseReservedCacheNodesOfferingMessage",
  }) as any as S.Schema<PurchaseReservedCacheNodesOfferingMessage>;
export interface PurchaseReservedCacheNodesOfferingResult {
  ReservedCacheNode?: ReservedCacheNode;
}
export const PurchaseReservedCacheNodesOfferingResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ReservedCacheNode: S.optional(ReservedCacheNode) }).pipe(ns),
).annotate({
  identifier: "PurchaseReservedCacheNodesOfferingResult",
}) as any as S.Schema<PurchaseReservedCacheNodesOfferingResult>;
export interface RebalanceSlotsInGlobalReplicationGroupMessage {
  GlobalReplicationGroupId?: string;
  ApplyImmediately?: boolean;
}
export const RebalanceSlotsInGlobalReplicationGroupMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroupId: S.optional(S.String),
      ApplyImmediately: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "RebalanceSlotsInGlobalReplicationGroupMessage",
  }) as any as S.Schema<RebalanceSlotsInGlobalReplicationGroupMessage>;
export interface RebalanceSlotsInGlobalReplicationGroupResult {
  GlobalReplicationGroup?: GlobalReplicationGroup;
}
export const RebalanceSlotsInGlobalReplicationGroupResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GlobalReplicationGroup: S.optional(GlobalReplicationGroup),
    }).pipe(ns),
  ).annotate({
    identifier: "RebalanceSlotsInGlobalReplicationGroupResult",
  }) as any as S.Schema<RebalanceSlotsInGlobalReplicationGroupResult>;
export interface RebootCacheClusterMessage {
  CacheClusterId?: string;
  CacheNodeIdsToReboot?: string[];
}
export const RebootCacheClusterMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheClusterId: S.optional(S.String),
    CacheNodeIdsToReboot: S.optional(CacheNodeIdsList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebootCacheClusterMessage",
}) as any as S.Schema<RebootCacheClusterMessage>;
export interface RebootCacheClusterResult {
  CacheCluster?: CacheCluster;
}
export const RebootCacheClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CacheCluster: S.optional(CacheCluster) }).pipe(ns),
).annotate({
  identifier: "RebootCacheClusterResult",
}) as any as S.Schema<RebootCacheClusterResult>;
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
export interface ResetCacheParameterGroupMessage {
  CacheParameterGroupName?: string;
  ResetAllParameters?: boolean;
  ParameterNameValues?: ParameterNameValue[];
}
export const ResetCacheParameterGroupMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CacheParameterGroupName: S.optional(S.String),
    ResetAllParameters: S.optional(S.Boolean),
    ParameterNameValues: S.optional(ParameterNameValueList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetCacheParameterGroupMessage",
}) as any as S.Schema<ResetCacheParameterGroupMessage>;
export interface RevokeCacheSecurityGroupIngressMessage {
  CacheSecurityGroupName?: string;
  EC2SecurityGroupName?: string;
  EC2SecurityGroupOwnerId?: string;
}
export const RevokeCacheSecurityGroupIngressMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CacheSecurityGroupName: S.optional(S.String),
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
  identifier: "RevokeCacheSecurityGroupIngressMessage",
}) as any as S.Schema<RevokeCacheSecurityGroupIngressMessage>;
export interface RevokeCacheSecurityGroupIngressResult {
  CacheSecurityGroup?: CacheSecurityGroup;
}
export const RevokeCacheSecurityGroupIngressResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CacheSecurityGroup: S.optional(CacheSecurityGroup) }).pipe(ns),
).annotate({
  identifier: "RevokeCacheSecurityGroupIngressResult",
}) as any as S.Schema<RevokeCacheSecurityGroupIngressResult>;
export interface CustomerNodeEndpoint {
  Address?: string;
  Port?: number;
}
export const CustomerNodeEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({
  identifier: "CustomerNodeEndpoint",
}) as any as S.Schema<CustomerNodeEndpoint>;
export type CustomerNodeEndpointList = CustomerNodeEndpoint[];
export const CustomerNodeEndpointList =
  /*@__PURE__*/ S.Array(CustomerNodeEndpoint);
export interface StartMigrationMessage {
  ReplicationGroupId?: string;
  CustomerNodeEndpointList?: CustomerNodeEndpoint[];
}
export const StartMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CustomerNodeEndpointList: S.optional(CustomerNodeEndpointList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMigrationMessage",
}) as any as S.Schema<StartMigrationMessage>;
export interface StartMigrationResponse {
  ReplicationGroup?: ReplicationGroup;
}
export const StartMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "StartMigrationResponse",
}) as any as S.Schema<StartMigrationResponse>;
export interface TestFailoverMessage {
  ReplicationGroupId?: string;
  NodeGroupId?: string;
}
export const TestFailoverMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    NodeGroupId: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestFailoverMessage",
}) as any as S.Schema<TestFailoverMessage>;
export interface TestFailoverResult {
  ReplicationGroup?: ReplicationGroup;
}
export const TestFailoverResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "TestFailoverResult",
}) as any as S.Schema<TestFailoverResult>;
export interface TestMigrationMessage {
  ReplicationGroupId?: string;
  CustomerNodeEndpointList?: CustomerNodeEndpoint[];
}
export const TestMigrationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplicationGroupId: S.optional(S.String),
    CustomerNodeEndpointList: S.optional(CustomerNodeEndpointList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestMigrationMessage",
}) as any as S.Schema<TestMigrationMessage>;
export interface TestMigrationResponse {
  ReplicationGroup?: ReplicationGroup;
}
export const TestMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplicationGroup: S.optional(ReplicationGroup) }).pipe(ns),
).annotate({
  identifier: "TestMigrationResponse",
}) as any as S.Schema<TestMigrationResponse>;
export type ExceptionMessage = string;
export type AwsQueryErrorMessage = string;
export type AddTagsToResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | InvalidARNFault
  | InvalidReplicationGroupStateFault
  | InvalidServerlessCacheSnapshotStateFault
  | InvalidServerlessCacheStateFault
  | ReplicationGroupNotFoundFault
  | ReservedCacheNodeNotFoundFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | SnapshotNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * A tag is a key-value pair where the key and value are case-sensitive. You can use tags
 * to categorize and track all your ElastiCache resources, with the exception of global
 * replication group. When you add or remove tags on replication groups, those actions will
 * be replicated to all nodes in the replication group. For more information, see Resource-level permissions.
 *
 * For example, you can use cost-allocation tags to your ElastiCache resources, Amazon
 * generates a cost allocation report as a comma-separated value (CSV) file with your usage
 * and costs aggregated by your tags. You can apply tags that represent business categories
 * (such as cost centers, application names, or owners) to organize your costs across
 * multiple services.
 *
 * For more information, see Using Cost Allocation Tags in
 * Amazon ElastiCache in the ElastiCache User
 * Guide.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceMessage,
  TagListMessage,
  AddTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsToResourceMessage,
  output: TagListMessage,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    InvalidARNFault,
    InvalidReplicationGroupStateFault,
    InvalidServerlessCacheSnapshotStateFault,
    InvalidServerlessCacheStateFault,
    ReplicationGroupNotFoundFault,
    ReservedCacheNodeNotFoundFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
    SnapshotNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type AuthorizeCacheSecurityGroupIngressError =
  | AuthorizationAlreadyExistsFault
  | CacheSecurityGroupNotFoundFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Allows network ingress to a cache security group. Applications using ElastiCache must
 * be running on Amazon EC2, and Amazon EC2 security groups are used as the authorization
 * mechanism.
 *
 * You cannot authorize ingress from an Amazon EC2 security group in one region to an
 * ElastiCache cluster in another region.
 */
export const authorizeCacheSecurityGroupIngress: API.OperationMethod<
  AuthorizeCacheSecurityGroupIngressMessage,
  AuthorizeCacheSecurityGroupIngressResult,
  AuthorizeCacheSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AuthorizeCacheSecurityGroupIngressMessage,
  output: AuthorizeCacheSecurityGroupIngressResult,
  errors: [
    AuthorizationAlreadyExistsFault,
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AuthorizeCacheSecurityGroupIngress",
}));

export type BatchApplyUpdateActionError =
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | CommonErrors;
/**
 * Apply the service update. For more information on service updates and applying them,
 * see Applying Service
 * Updates.
 */
export const batchApplyUpdateAction: API.OperationMethod<
  BatchApplyUpdateActionMessage,
  UpdateActionResultsMessage,
  BatchApplyUpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchApplyUpdateActionMessage,
  output: UpdateActionResultsMessage,
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchApplyUpdateAction",
}));

export type BatchStopUpdateActionError =
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | CommonErrors;
/**
 * Stop the service update. For more information on service updates and stopping them,
 * see Stopping
 * Service Updates.
 */
export const batchStopUpdateAction: API.OperationMethod<
  BatchStopUpdateActionMessage,
  UpdateActionResultsMessage,
  BatchStopUpdateActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchStopUpdateActionMessage,
  output: UpdateActionResultsMessage,
  errors: [InvalidParameterValueException, ServiceUpdateNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStopUpdateAction",
}));

export type CompleteMigrationError =
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | ReplicationGroupNotUnderMigrationFault
  | CommonErrors;
/**
 * Complete the migration of data.
 */
export const completeMigration: API.OperationMethod<
  CompleteMigrationMessage,
  CompleteMigrationResponse,
  CompleteMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteMigrationMessage,
  output: CompleteMigrationResponse,
  errors: [
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    ReplicationGroupNotUnderMigrationFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteMigration",
}));

export type CopyServerlessCacheSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheSnapshotStateFault
  | ServerlessCacheSnapshotAlreadyExistsFault
  | ServerlessCacheSnapshotNotFoundFault
  | ServerlessCacheSnapshotQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a copy of an existing serverless cache’s snapshot. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const copyServerlessCacheSnapshot: API.OperationMethod<
  CopyServerlessCacheSnapshotRequest,
  CopyServerlessCacheSnapshotResponse,
  CopyServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyServerlessCacheSnapshotRequest,
  output: CopyServerlessCacheSnapshotResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotAlreadyExistsFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServerlessCacheSnapshotQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyServerlessCacheSnapshot",
}));

export type CopySnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | SnapshotAlreadyExistsFault
  | SnapshotNotFoundFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Makes a copy of an existing snapshot.
 *
 * This operation is valid for Valkey or Redis OSS only.
 *
 * Users or groups that have permissions to use the `CopySnapshot`
 * operation can create their own Amazon S3 buckets and copy snapshots to it. To
 * control access to your snapshots, use an IAM policy to control who has the ability
 * to use the `CopySnapshot` operation. For more information about using IAM
 * to control the use of ElastiCache operations, see Exporting
 * Snapshots and Authentication & Access
 * Control.
 *
 * You could receive the following error messages.
 *
 * **Error Messages**
 *
 * - **Error Message:** The S3 bucket %s is outside of
 * the region.
 *
 * **Solution:** Create an Amazon S3 bucket in the
 * same region as your snapshot. For more information, see Step 1: Create an Amazon S3 Bucket in the ElastiCache User
 * Guide.
 *
 * - **Error Message:** The S3 bucket %s does not
 * exist.
 *
 * **Solution:** Create an Amazon S3 bucket in the
 * same region as your snapshot. For more information, see Step 1: Create an Amazon S3 Bucket in the ElastiCache User
 * Guide.
 *
 * - **Error Message:** The S3 bucket %s is not owned
 * by the authenticated user.
 *
 * **Solution:** Create an Amazon S3 bucket in the
 * same region as your snapshot. For more information, see Step 1: Create an Amazon S3 Bucket in the ElastiCache User
 * Guide.
 *
 * - **Error Message:** The authenticated user does
 * not have sufficient permissions to perform the desired activity.
 *
 * **Solution:** Contact your system administrator
 * to get the needed permissions.
 *
 * - **Error Message:** The S3 bucket %s already
 * contains an object with key %s.
 *
 * **Solution:** Give the
 * `TargetSnapshotName` a new and unique value. If exporting a
 * snapshot, you could alternatively create a new Amazon S3 bucket and use this
 * same value for `TargetSnapshotName`.
 *
 * - **Error Message: ** ElastiCache has not been
 * granted READ permissions %s on the S3 Bucket.
 *
 * **Solution:** Add List and Read permissions on
 * the bucket. For more information, see Step 2: Grant ElastiCache Access to Your Amazon S3 Bucket in the
 * ElastiCache User Guide.
 *
 * - **Error Message: ** ElastiCache has not been
 * granted WRITE permissions %s on the S3 Bucket.
 *
 * **Solution:** Add Upload/Delete permissions on
 * the bucket. For more information, see Step 2: Grant ElastiCache Access to Your Amazon S3 Bucket in the
 * ElastiCache User Guide.
 *
 * - **Error Message: ** ElastiCache has not been
 * granted READ_ACP permissions %s on the S3 Bucket.
 *
 * **Solution:** Add View Permissions on the bucket.
 * For more information, see Step 2: Grant ElastiCache Access to Your Amazon S3 Bucket in the
 * ElastiCache User Guide.
 */
export const copySnapshot: API.OperationMethod<
  CopySnapshotMessage,
  CopySnapshotResult,
  CopySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopySnapshotMessage,
  output: CopySnapshotResult,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    SnapshotAlreadyExistsFault,
    SnapshotNotFoundFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopySnapshot",
}));

export type CreateCacheClusterError =
  | CacheClusterAlreadyExistsFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | ClusterQuotaForCustomerExceededFault
  | InsufficientCacheClusterCapacityFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a cluster. All nodes in the cluster run the same protocol-compliant cache
 * engine software, either Memcached, Valkey or Redis OSS.
 *
 * This operation is not supported for Valkey or Redis OSS (cluster mode enabled) clusters.
 */
export const createCacheCluster: API.OperationMethod<
  CreateCacheClusterMessage,
  CreateCacheClusterResult,
  CreateCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCacheClusterMessage,
  output: CreateCacheClusterResult,
  errors: [
    CacheClusterAlreadyExistsFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    ClusterQuotaForCustomerExceededFault,
    InsufficientCacheClusterCapacityFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheCluster",
}));

export type CreateCacheParameterGroupError =
  | CacheParameterGroupAlreadyExistsFault
  | CacheParameterGroupQuotaExceededFault
  | InvalidCacheParameterGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new Amazon ElastiCache cache parameter group. An ElastiCache cache parameter
 * group is a collection of parameters and their values that are applied to all of the
 * nodes in any cluster or replication group using the CacheParameterGroup.
 *
 * A newly created CacheParameterGroup is an exact duplicate of the default parameter
 * group for the CacheParameterGroupFamily. To customize the newly created
 * CacheParameterGroup you can change the values of specific parameters. For more
 * information, see:
 *
 * - ModifyCacheParameterGroup in the ElastiCache API Reference.
 *
 * - Parameters and
 * Parameter Groups in the ElastiCache User Guide.
 */
export const createCacheParameterGroup: API.OperationMethod<
  CreateCacheParameterGroupMessage,
  CreateCacheParameterGroupResult,
  CreateCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCacheParameterGroupMessage,
  output: CreateCacheParameterGroupResult,
  errors: [
    CacheParameterGroupAlreadyExistsFault,
    CacheParameterGroupQuotaExceededFault,
    InvalidCacheParameterGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheParameterGroup",
}));

export type CreateCacheSecurityGroupError =
  | CacheSecurityGroupAlreadyExistsFault
  | CacheSecurityGroupQuotaExceededFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new cache security group. Use a cache security group to control access to
 * one or more clusters.
 *
 * Cache security groups are only used when you are creating a cluster outside of an
 * Amazon Virtual Private Cloud (Amazon VPC). If you are creating a cluster inside of a
 * VPC, use a cache subnet group instead. For more information, see CreateCacheSubnetGroup.
 */
export const createCacheSecurityGroup: API.OperationMethod<
  CreateCacheSecurityGroupMessage,
  CreateCacheSecurityGroupResult,
  CreateCacheSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCacheSecurityGroupMessage,
  output: CreateCacheSecurityGroupResult,
  errors: [
    CacheSecurityGroupAlreadyExistsFault,
    CacheSecurityGroupQuotaExceededFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheSecurityGroup",
}));

export type CreateCacheSubnetGroupError =
  | CacheSubnetGroupAlreadyExistsFault
  | CacheSubnetGroupQuotaExceededFault
  | CacheSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetNotAllowedFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a new cache subnet group.
 *
 * Use this parameter only when you are creating a cluster in an Amazon Virtual Private
 * Cloud (Amazon VPC).
 */
export const createCacheSubnetGroup: API.OperationMethod<
  CreateCacheSubnetGroupMessage,
  CreateCacheSubnetGroupResult,
  CreateCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCacheSubnetGroupMessage,
  output: CreateCacheSubnetGroupResult,
  errors: [
    CacheSubnetGroupAlreadyExistsFault,
    CacheSubnetGroupQuotaExceededFault,
    CacheSubnetQuotaExceededFault,
    InvalidSubnet,
    SubnetNotAllowedFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCacheSubnetGroup",
}));

export type CreateGlobalReplicationGroupError =
  | GlobalReplicationGroupAlreadyExistsFault
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Global Datastore offers fully managed, fast, reliable and secure
 * cross-region replication. Using Global Datastore with Valkey or Redis OSS, you can create cross-region
 * read replica clusters for ElastiCache to enable low-latency reads and disaster
 * recovery across regions. For more information, see Replication
 * Across Regions Using Global Datastore.
 *
 * - The **GlobalReplicationGroupIdSuffix** is the
 * name of the Global datastore.
 *
 * - The **PrimaryReplicationGroupId** represents the
 * name of the primary cluster that accepts writes and will replicate updates to
 * the secondary cluster.
 */
export const createGlobalReplicationGroup: API.OperationMethod<
  CreateGlobalReplicationGroupMessage,
  CreateGlobalReplicationGroupResult,
  CreateGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlobalReplicationGroupMessage,
  output: CreateGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupAlreadyExistsFault,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalReplicationGroup",
}));

export type CreateReplicationGroupError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | ClusterQuotaForCustomerExceededFault
  | GlobalReplicationGroupNotFoundFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupAlreadyExistsFault
  | TagQuotaPerResourceExceeded
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Creates a Valkey or Redis OSS (cluster mode disabled) or a Valkey or Redis OSS (cluster mode enabled) replication
 * group.
 *
 * This API can be used to create a standalone regional replication group or a secondary
 * replication group associated with a Global datastore.
 *
 * A Valkey or Redis OSS (cluster mode disabled) replication group is a collection of nodes, where
 * one of the nodes is a read/write primary and the others are read-only replicas.
 * Writes to the primary are asynchronously propagated to the replicas.
 *
 * A Valkey or Redis OSS cluster-mode enabled cluster is comprised of from 1 to 90 shards (API/CLI:
 * node groups). Each shard has a primary node and up to 5 read-only replica nodes. The
 * configuration can range from 90 shards and 0 replicas to 15 shards and 5 replicas, which
 * is the maximum number or replicas allowed.
 *
 * The node or shard limit can be increased to a maximum of 500 per cluster if the Valkey or Redis OSS
 * engine version is 5.0.6 or higher. For example, you can choose to configure a 500 node
 * cluster that ranges between 83 shards (one primary and 5 replicas per shard) and 500
 * shards (single primary and no replicas). Make sure there are enough available IP
 * addresses to accommodate the increase. Common pitfalls include the subnets in the subnet
 * group have too small a CIDR range or the subnets are shared and heavily used by other
 * clusters. For more information, see Creating a Subnet
 * Group. For versions below 5.0.6, the limit is 250 per cluster.
 *
 * To request a limit increase, see Amazon Service Limits and
 * choose the limit type Nodes per cluster per instance
 * type.
 *
 * When a Valkey or Redis OSS (cluster mode disabled) replication group has been successfully created,
 * you can add one or more read replicas to it, up to a total of 5 read replicas. If you
 * need to increase or decrease the number of node groups (console: shards), you can use scaling.
 * For more information, see Scaling self-designed clusters in the ElastiCache User
 * Guide.
 *
 * This operation is valid for Valkey and Redis OSS only.
 */
export const createReplicationGroup: API.OperationMethod<
  CreateReplicationGroupMessage,
  CreateReplicationGroupResult,
  CreateReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReplicationGroupMessage,
  output: CreateReplicationGroupResult,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    ClusterQuotaForCustomerExceededFault,
    GlobalReplicationGroupNotFoundFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupAlreadyExistsFault,
    TagQuotaPerResourceExceeded,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReplicationGroup",
}));

export type CreateServerlessCacheError =
  | InvalidCredentialsException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | InvalidUserGroupStateFault
  | ServerlessCacheAlreadyExistsFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheQuotaForCustomerExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Creates a serverless cache.
 */
export const createServerlessCache: API.OperationMethod<
  CreateServerlessCacheRequest,
  CreateServerlessCacheResponse,
  CreateServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServerlessCacheRequest,
  output: CreateServerlessCacheResponse,
  errors: [
    InvalidCredentialsException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    InvalidUserGroupStateFault,
    ServerlessCacheAlreadyExistsFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheQuotaForCustomerExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServerlessCache",
}));

export type CreateServerlessCacheSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotAlreadyExistsFault
  | ServerlessCacheSnapshotQuotaExceededFault
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * This API creates a copy of an entire ServerlessCache at a specific moment in time. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const createServerlessCacheSnapshot: API.OperationMethod<
  CreateServerlessCacheSnapshotRequest,
  CreateServerlessCacheSnapshotResponse,
  CreateServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServerlessCacheSnapshotRequest,
  output: CreateServerlessCacheSnapshotResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotAlreadyExistsFault,
    ServerlessCacheSnapshotQuotaExceededFault,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServerlessCacheSnapshot",
}));

export type CreateSnapshotError =
  | CacheClusterNotFoundFault
  | InvalidCacheClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotFeatureNotSupportedFault
  | SnapshotQuotaExceededFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Creates a copy of an entire cluster or replication group at a specific moment in
 * time.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const createSnapshot: API.OperationMethod<
  CreateSnapshotMessage,
  CreateSnapshotResult,
  CreateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSnapshotMessage,
  output: CreateSnapshotResult,
  errors: [
    CacheClusterNotFoundFault,
    InvalidCacheClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotFeatureNotSupportedFault,
    SnapshotQuotaExceededFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSnapshot",
}));

export type CreateUserError =
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserAlreadyExistsFault
  | UserQuotaExceededFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 to 7.1: Creates a user. For more information, see
 * Using Role Based Access Control (RBAC).
 */
export const createUser: API.OperationMethod<
  CreateUserMessage,
  User,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserMessage,
  output: User,
  errors: [
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserAlreadyExistsFault,
    UserQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type CreateUserGroupError =
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterValueException
  | ServiceLinkedRoleNotFoundFault
  | TagQuotaPerResourceExceeded
  | UserGroupAlreadyExistsFault
  | UserGroupQuotaExceededFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 to 7.1: Creates a user group. For more
 * information, see Using Role Based Access Control (RBAC)
 */
export const createUserGroup: API.OperationMethod<
  CreateUserGroupMessage,
  UserGroup,
  CreateUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserGroupMessage,
  output: UserGroup,
  errors: [
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterValueException,
    ServiceLinkedRoleNotFoundFault,
    TagQuotaPerResourceExceeded,
    UserGroupAlreadyExistsFault,
    UserGroupQuotaExceededFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserGroup",
}));

export type DecreaseNodeGroupsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Decreases the number of node groups in a Global datastore
 */
export const decreaseNodeGroupsInGlobalReplicationGroup: API.OperationMethod<
  DecreaseNodeGroupsInGlobalReplicationGroupMessage,
  DecreaseNodeGroupsInGlobalReplicationGroupResult,
  DecreaseNodeGroupsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DecreaseNodeGroupsInGlobalReplicationGroupMessage,
  output: DecreaseNodeGroupsInGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseNodeGroupsInGlobalReplicationGroup",
}));

export type DecreaseReplicaCountError =
  | ClusterQuotaForCustomerExceededFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForCustomerExceededFault
  | NoOperationFault
  | ReplicationGroupNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Dynamically decreases the number of replicas in a Valkey or Redis OSS (cluster mode disabled)
 * replication group or the number of replica nodes in one or more node groups (shards) of
 * a Valkey or Redis OSS (cluster mode enabled) replication group. This operation is performed with no
 * cluster down time.
 */
export const decreaseReplicaCount: API.OperationMethod<
  DecreaseReplicaCountMessage,
  DecreaseReplicaCountResult,
  DecreaseReplicaCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DecreaseReplicaCountMessage,
  output: DecreaseReplicaCountResult,
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForCustomerExceededFault,
    NoOperationFault,
    ReplicationGroupNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseReplicaCount",
}));

export type DeleteCacheClusterError =
  | CacheClusterNotFoundFault
  | InvalidCacheClusterStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | SnapshotAlreadyExistsFault
  | SnapshotFeatureNotSupportedFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes a previously provisioned cluster. `DeleteCacheCluster` deletes all
 * associated cache nodes, node endpoints and the cluster itself. When you receive a
 * successful response from this operation, Amazon ElastiCache immediately begins deleting
 * the cluster; you cannot cancel or revert this operation.
 *
 * This operation is not valid for:
 *
 * - Valkey or Redis OSS (cluster mode enabled) clusters
 *
 * - Valkey or Redis OSS (cluster mode disabled) clusters
 *
 * - A cluster that is the last read replica of a replication group
 *
 * - A cluster that is the primary node of a replication group
 *
 * - A node group (shard) that has Multi-AZ mode enabled
 *
 * - A cluster from a Valkey or Redis OSS (cluster mode enabled) replication group
 *
 * - A cluster that is not in the `available` state
 */
export const deleteCacheCluster: API.OperationMethod<
  DeleteCacheClusterMessage,
  DeleteCacheClusterResult,
  DeleteCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCacheClusterMessage,
  output: DeleteCacheClusterResult,
  errors: [
    CacheClusterNotFoundFault,
    InvalidCacheClusterStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    SnapshotAlreadyExistsFault,
    SnapshotFeatureNotSupportedFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheCluster",
}));

export type DeleteCacheParameterGroupError =
  | CacheParameterGroupNotFoundFault
  | InvalidCacheParameterGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes the specified cache parameter group. You cannot delete a cache parameter group
 * if it is associated with any cache clusters. You cannot delete the default cache
 * parameter groups in your account.
 */
export const deleteCacheParameterGroup: API.OperationMethod<
  DeleteCacheParameterGroupMessage,
  DeleteCacheParameterGroupResponse,
  DeleteCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCacheParameterGroupMessage,
  output: DeleteCacheParameterGroupResponse,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheParameterGroup",
}));

export type DeleteCacheSecurityGroupError =
  | CacheSecurityGroupNotFoundFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes a cache security group.
 *
 * You cannot delete a cache security group if it is associated with any
 * clusters.
 */
export const deleteCacheSecurityGroup: API.OperationMethod<
  DeleteCacheSecurityGroupMessage,
  DeleteCacheSecurityGroupResponse,
  DeleteCacheSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCacheSecurityGroupMessage,
  output: DeleteCacheSecurityGroupResponse,
  errors: [
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheSecurityGroup",
}));

export type DeleteCacheSubnetGroupError =
  | CacheSubnetGroupInUse
  | CacheSubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Deletes a cache subnet group.
 *
 * You cannot delete a default cache subnet group or one that is associated with any
 * clusters.
 */
export const deleteCacheSubnetGroup: API.OperationMethod<
  DeleteCacheSubnetGroupMessage,
  DeleteCacheSubnetGroupResponse,
  DeleteCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCacheSubnetGroupMessage,
  output: DeleteCacheSubnetGroupResponse,
  errors: [CacheSubnetGroupInUse, CacheSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCacheSubnetGroup",
}));

export type DeleteGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deleting a Global datastore is a two-step process:
 *
 * - First, you must DisassociateGlobalReplicationGroup to remove
 * the secondary clusters in the Global datastore.
 *
 * - Once the Global datastore contains only the primary cluster, you can use the
 * `DeleteGlobalReplicationGroup` API to delete the Global datastore
 * while retainining the primary cluster using
 * `RetainPrimaryReplicationGroup=true`.
 *
 * Since the Global Datastore has only a primary cluster, you can delete the Global
 * Datastore while retaining the primary by setting
 * `RetainPrimaryReplicationGroup=true`. The primary cluster is never
 * deleted when deleting a Global Datastore. It can only be deleted when it no longer is
 * associated with any Global Datastore.
 *
 * When you receive a successful response from this operation, Amazon ElastiCache
 * immediately begins deleting the selected resources; you cannot cancel or revert this
 * operation.
 */
export const deleteGlobalReplicationGroup: API.OperationMethod<
  DeleteGlobalReplicationGroupMessage,
  DeleteGlobalReplicationGroupResult,
  DeleteGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlobalReplicationGroupMessage,
  output: DeleteGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlobalReplicationGroup",
}));

export type DeleteReplicationGroupError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupNotFoundFault
  | SnapshotAlreadyExistsFault
  | SnapshotFeatureNotSupportedFault
  | SnapshotQuotaExceededFault
  | CommonErrors;
/**
 * Deletes an existing replication group. By default, this operation deletes the entire
 * replication group, including the primary/primaries and all of the read replicas. If the
 * replication group has only one primary, you can optionally delete only the read
 * replicas, while retaining the primary by setting
 * `RetainPrimaryCluster=true`.
 *
 * When you receive a successful response from this operation, Amazon ElastiCache
 * immediately begins deleting the selected resources; you cannot cancel or revert this
 * operation.
 *
 * - `CreateSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 *
 * - This operation is valid for Redis OSS only.
 */
export const deleteReplicationGroup: API.OperationMethod<
  DeleteReplicationGroupMessage,
  DeleteReplicationGroupResult,
  DeleteReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReplicationGroupMessage,
  output: DeleteReplicationGroupResult,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupNotFoundFault,
    SnapshotAlreadyExistsFault,
    SnapshotFeatureNotSupportedFault,
    SnapshotQuotaExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReplicationGroup",
}));

export type DeleteServerlessCacheError =
  | InvalidCredentialsException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotAlreadyExistsFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes a specified existing serverless cache.
 *
 * `CreateServerlessCacheSnapshot` permission is required to create a final snapshot.
 * Without this permission, the API call will fail with an `Access Denied` exception.
 */
export const deleteServerlessCache: API.OperationMethod<
  DeleteServerlessCacheRequest,
  DeleteServerlessCacheResponse,
  DeleteServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServerlessCacheRequest,
  output: DeleteServerlessCacheResponse,
  errors: [
    InvalidCredentialsException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotAlreadyExistsFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServerlessCache",
}));

export type DeleteServerlessCacheSnapshotError =
  | InvalidParameterValueException
  | InvalidServerlessCacheSnapshotStateFault
  | ServerlessCacheSnapshotNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing serverless cache snapshot. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const deleteServerlessCacheSnapshot: API.OperationMethod<
  DeleteServerlessCacheSnapshotRequest,
  DeleteServerlessCacheSnapshotResponse,
  DeleteServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServerlessCacheSnapshotRequest,
  output: DeleteServerlessCacheSnapshotResponse,
  errors: [
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServerlessCacheSnapshot",
}));

export type DeleteSnapshotError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidSnapshotStateFault
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Deletes an existing snapshot. When you receive a successful response from this
 * operation, ElastiCache immediately begins deleting the snapshot; you cannot cancel or
 * revert this operation.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const deleteSnapshot: API.OperationMethod<
  DeleteSnapshotMessage,
  DeleteSnapshotResult,
  DeleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSnapshotMessage,
  output: DeleteSnapshotResult,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidSnapshotStateFault,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSnapshot",
}));

export type DeleteUserError =
  | DefaultUserAssociatedToUserGroupFault
  | InvalidParameterValueException
  | InvalidUserStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 onwards: Deletes a user. The user will be removed from
 * all user groups and in turn removed from all replication groups. For more information,
 * see Using Role Based Access Control (RBAC).
 */
export const deleteUser: API.OperationMethod<
  DeleteUserMessage,
  User,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserMessage,
  output: User,
  errors: [
    DefaultUserAssociatedToUserGroupFault,
    InvalidParameterValueException,
    InvalidUserStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DeleteUserGroupError =
  | InvalidParameterValueException
  | InvalidUserGroupStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * For Valkey engine version 7.2 onwards and Redis OSS 6.0 onwards: Deletes a user group. The user group must first
 * be disassociated from the replication group before it can be deleted. For more
 * information, see Using Role Based Access Control (RBAC).
 */
export const deleteUserGroup: API.OperationMethod<
  DeleteUserGroupMessage,
  UserGroup,
  DeleteUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserGroupMessage,
  output: UserGroup,
  errors: [
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserGroup",
}));

export type DescribeCacheClustersError =
  | CacheClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns information about all provisioned clusters if no cluster identifier is
 * specified, or about a specific cache cluster if a cluster identifier is supplied.
 *
 * By default, abbreviated information about the clusters is returned. You can use the
 * optional *ShowCacheNodeInfo* flag to retrieve detailed information
 * about the cache nodes associated with the clusters. These details include the DNS
 * address and port for the cache node endpoint.
 *
 * If the cluster is in the *creating* state, only cluster-level
 * information is displayed until all of the nodes are successfully provisioned.
 *
 * If the cluster is in the *deleting* state, only cluster-level
 * information is displayed.
 *
 * If cache nodes are currently being added to the cluster, node endpoint information and
 * creation time for the additional nodes are not displayed until they are completely
 * provisioned. When the cluster state is *available*, the cluster is
 * ready for use.
 *
 * If cache nodes are currently being removed from the cluster, no endpoint information
 * for the removed nodes is displayed.
 */
export const describeCacheClusters: API.PaginatedOperationMethod<
  DescribeCacheClustersMessage,
  CacheClusterMessage,
  DescribeCacheClustersError,
  Credentials | HttpClient.HttpClient,
  CacheCluster
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCacheClustersMessage,
  output: CacheClusterMessage,
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheClusters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheClusters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCacheEngineVersionsError = CommonErrors;
/**
 * Returns a list of the available cache engines and their versions.
 */
export const describeCacheEngineVersions: API.PaginatedOperationMethod<
  DescribeCacheEngineVersionsMessage,
  CacheEngineVersionMessage,
  DescribeCacheEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  CacheEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCacheEngineVersionsMessage,
  output: CacheEngineVersionMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheEngineVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheEngineVersions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCacheParameterGroupsError =
  | CacheParameterGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of cache parameter group descriptions. If a cache parameter group name
 * is specified, the list contains only the descriptions for that group.
 */
export const describeCacheParameterGroups: API.PaginatedOperationMethod<
  DescribeCacheParameterGroupsMessage,
  CacheParameterGroupsMessage,
  DescribeCacheParameterGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheParameterGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCacheParameterGroupsMessage,
  output: CacheParameterGroupsMessage,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheParameterGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheParameterGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCacheParametersError =
  | CacheParameterGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns the detailed parameter list for a particular cache parameter group.
 */
export const describeCacheParameters: API.PaginatedOperationMethod<
  DescribeCacheParametersMessage,
  CacheParameterGroupDetails,
  DescribeCacheParametersError,
  Credentials | HttpClient.HttpClient,
  Parameter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCacheParametersMessage,
  output: CacheParameterGroupDetails,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCacheSecurityGroupsError =
  | CacheSecurityGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of cache security group descriptions. If a cache security group name is
 * specified, the list contains only the description of that group. This applicable only
 * when you have ElastiCache in Classic setup
 */
export const describeCacheSecurityGroups: API.PaginatedOperationMethod<
  DescribeCacheSecurityGroupsMessage,
  CacheSecurityGroupMessage,
  DescribeCacheSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCacheSecurityGroupsMessage,
  output: CacheSecurityGroupMessage,
  errors: [
    CacheSecurityGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheSecurityGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheSecurityGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeCacheSubnetGroupsError =
  | CacheSubnetGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of cache subnet group descriptions. If a subnet group name is
 * specified, the list contains only the description of that group. This is applicable only
 * when you have ElastiCache in VPC setup. All ElastiCache clusters now launch in VPC by
 * default.
 */
export const describeCacheSubnetGroups: API.PaginatedOperationMethod<
  DescribeCacheSubnetGroupsMessage,
  CacheSubnetGroupMessage,
  DescribeCacheSubnetGroupsError,
  Credentials | HttpClient.HttpClient,
  CacheSubnetGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeCacheSubnetGroupsMessage,
  output: CacheSubnetGroupMessage,
  errors: [CacheSubnetGroupNotFoundFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCacheSubnetGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "CacheSubnetGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEngineDefaultParametersError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns the default engine and system parameter information for the specified cache
 * engine.
 */
export const describeEngineDefaultParameters: API.PaginatedOperationMethod<
  DescribeEngineDefaultParametersMessage,
  DescribeEngineDefaultParametersResult,
  DescribeEngineDefaultParametersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEngineDefaultParametersMessage,
  output: DescribeEngineDefaultParametersResult,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngineDefaultParameters",
  pagination: {
    inputToken: "Marker",
    outputToken: "EngineDefaults.Marker",
    items: "EngineDefaults.Parameters",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeEventsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns events related to clusters, cache security groups, and cache parameter groups.
 * You can obtain events specific to a particular cluster, cache security group, or cache
 * parameter group by providing the name as a parameter.
 *
 * By default, only the events occurring within the last hour are returned; however, you
 * can retrieve up to 14 days' worth of events if necessary.
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
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
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

export type DescribeGlobalReplicationGroupsError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns information about a particular global replication group. If no identifier is
 * specified, returns information about all Global datastores.
 */
export const describeGlobalReplicationGroups: API.PaginatedOperationMethod<
  DescribeGlobalReplicationGroupsMessage,
  DescribeGlobalReplicationGroupsResult,
  DescribeGlobalReplicationGroupsError,
  Credentials | HttpClient.HttpClient,
  GlobalReplicationGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeGlobalReplicationGroupsMessage,
  output: DescribeGlobalReplicationGroupsResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGlobalReplicationGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "GlobalReplicationGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReplicationGroupsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Returns information about a particular replication group. If no identifier is
 * specified, `DescribeReplicationGroups` returns information about all
 * replication groups.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const describeReplicationGroups: API.PaginatedOperationMethod<
  DescribeReplicationGroupsMessage,
  ReplicationGroupMessage,
  DescribeReplicationGroupsError,
  Credentials | HttpClient.HttpClient,
  ReplicationGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReplicationGroupsMessage,
  output: ReplicationGroupMessage,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReplicationGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReplicationGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedCacheNodesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedCacheNodeNotFoundFault
  | CommonErrors;
/**
 * Returns information about reserved cache nodes for this account, or about a specified
 * reserved cache node.
 */
export const describeReservedCacheNodes: API.PaginatedOperationMethod<
  DescribeReservedCacheNodesMessage,
  ReservedCacheNodeMessage,
  DescribeReservedCacheNodesError,
  Credentials | HttpClient.HttpClient,
  ReservedCacheNode
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedCacheNodesMessage,
  output: ReservedCacheNodeMessage,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedCacheNodeNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedCacheNodes",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedCacheNodes",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeReservedCacheNodesOfferingsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedCacheNodesOfferingNotFoundFault
  | CommonErrors;
/**
 * Lists available reserved cache node offerings.
 */
export const describeReservedCacheNodesOfferings: API.PaginatedOperationMethod<
  DescribeReservedCacheNodesOfferingsMessage,
  ReservedCacheNodesOfferingMessage,
  DescribeReservedCacheNodesOfferingsError,
  Credentials | HttpClient.HttpClient,
  ReservedCacheNodesOffering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeReservedCacheNodesOfferingsMessage,
  output: ReservedCacheNodesOfferingMessage,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedCacheNodesOfferingNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservedCacheNodesOfferings",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ReservedCacheNodesOfferings",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeServerlessCachesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServerlessCacheNotFoundFault
  | CommonErrors;
/**
 * Returns information about a specific serverless cache.
 * If no identifier is specified, then the API returns information on all the serverless caches belonging to
 * this Amazon Web Services account.
 */
export const describeServerlessCaches: API.PaginatedOperationMethod<
  DescribeServerlessCachesRequest,
  DescribeServerlessCachesResponse,
  DescribeServerlessCachesError,
  Credentials | HttpClient.HttpClient,
  ServerlessCache
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeServerlessCachesRequest,
  output: DescribeServerlessCachesResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServerlessCacheNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServerlessCaches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServerlessCaches",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeServerlessCacheSnapshotsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about serverless cache snapshots.
 * By default, this API lists all of the customer’s serverless cache snapshots.
 * It can also describe a single serverless cache snapshot, or the snapshots associated with
 * a particular serverless cache. Available for Valkey, Redis OSS and Serverless Memcached only.
 */
export const describeServerlessCacheSnapshots: API.PaginatedOperationMethod<
  DescribeServerlessCacheSnapshotsRequest,
  DescribeServerlessCacheSnapshotsResponse,
  DescribeServerlessCacheSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ServerlessCacheSnapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeServerlessCacheSnapshotsRequest,
  output: DescribeServerlessCacheSnapshotsResponse,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServerlessCacheSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServerlessCacheSnapshots",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeServiceUpdatesError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ServiceUpdateNotFoundFault
  | CommonErrors;
/**
 * Returns details of the service updates
 */
export const describeServiceUpdates: API.PaginatedOperationMethod<
  DescribeServiceUpdatesMessage,
  ServiceUpdatesMessage,
  DescribeServiceUpdatesError,
  Credentials | HttpClient.HttpClient,
  ServiceUpdate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeServiceUpdatesMessage,
  output: ServiceUpdatesMessage,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ServiceUpdateNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceUpdates",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "ServiceUpdates",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeSnapshotsError =
  | CacheClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | SnapshotNotFoundFault
  | CommonErrors;
/**
 * Returns information about cluster or replication group snapshots. By default,
 * `DescribeSnapshots` lists all of your snapshots; it can optionally
 * describe a single snapshot, or just the snapshots associated with a particular cache
 * cluster.
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const describeSnapshots: API.PaginatedOperationMethod<
  DescribeSnapshotsMessage,
  DescribeSnapshotsListMessage,
  DescribeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  Snapshot
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSnapshotsMessage,
  output: DescribeSnapshotsListMessage,
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    SnapshotNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSnapshots",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Snapshots",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeUpdateActionsError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns details of the update actions
 */
export const describeUpdateActions: API.PaginatedOperationMethod<
  DescribeUpdateActionsMessage,
  UpdateActionsMessage,
  DescribeUpdateActionsError,
  Credentials | HttpClient.HttpClient,
  UpdateAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeUpdateActionsMessage,
  output: UpdateActionsMessage,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUpdateActions",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UpdateActions",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeUserGroupsError =
  | InvalidParameterCombinationException
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Returns a list of user groups.
 */
export const describeUserGroups: API.PaginatedOperationMethod<
  DescribeUserGroupsMessage,
  DescribeUserGroupsResult,
  DescribeUserGroupsError,
  Credentials | HttpClient.HttpClient,
  UserGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeUserGroupsMessage,
  output: DescribeUserGroupsResult,
  errors: [
    InvalidParameterCombinationException,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserGroups",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "UserGroups",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeUsersError =
  | InvalidParameterCombinationException
  | ServiceLinkedRoleNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Returns a list of users.
 */
export const describeUsers: API.PaginatedOperationMethod<
  DescribeUsersMessage,
  DescribeUsersResult,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeUsersMessage,
  output: DescribeUsersResult,
  errors: [
    InvalidParameterCombinationException,
    ServiceLinkedRoleNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
  pagination: {
    inputToken: "Marker",
    outputToken: "Marker",
    items: "Users",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DisassociateGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Remove a secondary cluster from the Global datastore using the Global datastore name.
 * The secondary cluster will no longer receive updates from the primary cluster, but will
 * remain as a standalone cluster in that Amazon region.
 */
export const disassociateGlobalReplicationGroup: API.OperationMethod<
  DisassociateGlobalReplicationGroupMessage,
  DisassociateGlobalReplicationGroupResult,
  DisassociateGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateGlobalReplicationGroupMessage,
  output: DisassociateGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGlobalReplicationGroup",
}));

export type ExportServerlessCacheSnapshotError =
  | InvalidParameterValueException
  | InvalidServerlessCacheSnapshotStateFault
  | ServerlessCacheSnapshotNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | CommonErrors;
/**
 * Provides the functionality to export the serverless cache snapshot data to Amazon S3. Available for Valkey and Redis OSS only.
 */
export const exportServerlessCacheSnapshot: API.OperationMethod<
  ExportServerlessCacheSnapshotRequest,
  ExportServerlessCacheSnapshotResponse,
  ExportServerlessCacheSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportServerlessCacheSnapshotRequest,
  output: ExportServerlessCacheSnapshotResponse,
  errors: [
    InvalidParameterValueException,
    InvalidServerlessCacheSnapshotStateFault,
    ServerlessCacheSnapshotNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportServerlessCacheSnapshot",
}));

export type FailoverGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Used to failover the primary region to a secondary region. The secondary region will
 * become primary, and all other clusters will become secondary.
 */
export const failoverGlobalReplicationGroup: API.OperationMethod<
  FailoverGlobalReplicationGroupMessage,
  FailoverGlobalReplicationGroupResult,
  FailoverGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: FailoverGlobalReplicationGroupMessage,
  output: FailoverGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "FailoverGlobalReplicationGroup",
}));

export type IncreaseNodeGroupsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Increase the number of node groups in the Global datastore
 */
export const increaseNodeGroupsInGlobalReplicationGroup: API.OperationMethod<
  IncreaseNodeGroupsInGlobalReplicationGroupMessage,
  IncreaseNodeGroupsInGlobalReplicationGroupResult,
  IncreaseNodeGroupsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IncreaseNodeGroupsInGlobalReplicationGroupMessage,
  output: IncreaseNodeGroupsInGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseNodeGroupsInGlobalReplicationGroup",
}));

export type IncreaseReplicaCountError =
  | ClusterQuotaForCustomerExceededFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForCustomerExceededFault
  | NoOperationFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Dynamically increases the number of replicas in a Valkey or Redis OSS (cluster mode disabled)
 * replication group or the number of replica nodes in one or more node groups (shards) of
 * a Valkey or Redis OSS (cluster mode enabled) replication group. This operation is performed with no
 * cluster down time.
 */
export const increaseReplicaCount: API.OperationMethod<
  IncreaseReplicaCountMessage,
  IncreaseReplicaCountResult,
  IncreaseReplicaCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IncreaseReplicaCountMessage,
  output: IncreaseReplicaCountResult,
  errors: [
    ClusterQuotaForCustomerExceededFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForCustomerExceededFault,
    NoOperationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseReplicaCount",
}));

export type ListAllowedNodeTypeModificationsError =
  | CacheClusterNotFoundFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Lists all available node types that you can scale with your cluster's replication
 * group's current node type.
 *
 * When you use the `ModifyCacheCluster` or
 * `ModifyReplicationGroup` operations to scale your cluster or replication
 * group, the value of the `CacheNodeType` parameter must be one of the node
 * types returned by this operation.
 */
export const listAllowedNodeTypeModifications: API.OperationMethod<
  ListAllowedNodeTypeModificationsMessage,
  AllowedNodeTypeModificationsMessage,
  ListAllowedNodeTypeModificationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAllowedNodeTypeModificationsMessage,
  output: AllowedNodeTypeModificationsMessage,
  errors: [
    CacheClusterNotFoundFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAllowedNodeTypeModifications",
}));

export type ListTagsForResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | InvalidARNFault
  | InvalidReplicationGroupStateFault
  | InvalidServerlessCacheSnapshotStateFault
  | InvalidServerlessCacheStateFault
  | ReplicationGroupNotFoundFault
  | ReservedCacheNodeNotFoundFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | SnapshotNotFoundFault
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Lists all tags currently on a named resource.
 *
 * A tag is a key-value pair where the key and value are case-sensitive. You can use
 * tags to categorize and track all your ElastiCache resources, with the exception of
 * global replication group. When you add or remove tags on replication groups, those
 * actions will be replicated to all nodes in the replication group. For more information,
 * see Resource-level permissions.
 *
 * If the cluster is not in the *available* state,
 * `ListTagsForResource` returns an error.
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
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    InvalidARNFault,
    InvalidReplicationGroupStateFault,
    InvalidServerlessCacheSnapshotStateFault,
    InvalidServerlessCacheStateFault,
    ReplicationGroupNotFoundFault,
    ReservedCacheNodeNotFoundFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
    SnapshotNotFoundFault,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyCacheClusterError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | CommonErrors;
/**
 * Modifies the settings for a cluster. You can use this operation to change one or more
 * cluster configuration parameters by specifying the parameters and the new values.
 */
export const modifyCacheCluster: API.OperationMethod<
  ModifyCacheClusterMessage,
  ModifyCacheClusterResult,
  ModifyCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyCacheClusterMessage,
  output: ModifyCacheClusterResult,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCacheCluster",
}));

export type ModifyCacheParameterGroupError =
  | CacheParameterGroupNotFoundFault
  | InvalidCacheParameterGroupStateFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the parameters of a cache parameter group. You can modify up to 20 parameters
 * in a single request by submitting a list parameter name and value pairs.
 */
export const modifyCacheParameterGroup: API.OperationMethod<
  ModifyCacheParameterGroupMessage,
  CacheParameterGroupNameMessage,
  ModifyCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyCacheParameterGroupMessage,
  output: CacheParameterGroupNameMessage,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCacheParameterGroup",
}));

export type ModifyCacheSubnetGroupError =
  | CacheSubnetGroupNotFoundFault
  | CacheSubnetQuotaExceededFault
  | InvalidSubnet
  | SubnetInUse
  | SubnetNotAllowedFault
  | CommonErrors;
/**
 * Modifies an existing cache subnet group.
 */
export const modifyCacheSubnetGroup: API.OperationMethod<
  ModifyCacheSubnetGroupMessage,
  ModifyCacheSubnetGroupResult,
  ModifyCacheSubnetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyCacheSubnetGroupMessage,
  output: ModifyCacheSubnetGroupResult,
  errors: [
    CacheSubnetGroupNotFoundFault,
    CacheSubnetQuotaExceededFault,
    InvalidSubnet,
    SubnetInUse,
    SubnetNotAllowedFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyCacheSubnetGroup",
}));

export type ModifyGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the settings for a Global datastore.
 */
export const modifyGlobalReplicationGroup: API.OperationMethod<
  ModifyGlobalReplicationGroupMessage,
  ModifyGlobalReplicationGroupResult,
  ModifyGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyGlobalReplicationGroupMessage,
  output: ModifyGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyGlobalReplicationGroup",
}));

export type ModifyReplicationGroupError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidUserGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeQuotaForClusterExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * Modifies the settings for a replication group. This is limited to Valkey and Redis OSS 7 and above.
 *
 * - Scaling for Valkey or Redis OSS (cluster mode enabled) in
 * the ElastiCache User Guide
 *
 * - ModifyReplicationGroupShardConfiguration in the ElastiCache API
 * Reference
 *
 * This operation is valid for Valkey or Redis OSS only.
 */
export const modifyReplicationGroup: API.OperationMethod<
  ModifyReplicationGroupMessage,
  ModifyReplicationGroupResult,
  ModifyReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReplicationGroupMessage,
  output: ModifyReplicationGroupResult,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidUserGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeQuotaForClusterExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationGroup",
}));

export type ModifyReplicationGroupShardConfigurationError =
  | InsufficientCacheClusterCapacityFault
  | InvalidCacheClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | InvalidVPCNetworkStateFault
  | NodeGroupsPerReplicationGroupQuotaExceededFault
  | NodeQuotaForCustomerExceededFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Modifies a replication group's shards (node groups) by allowing you to add shards,
 * remove shards, or rebalance the keyspaces among existing shards.
 */
export const modifyReplicationGroupShardConfiguration: API.OperationMethod<
  ModifyReplicationGroupShardConfigurationMessage,
  ModifyReplicationGroupShardConfigurationResult,
  ModifyReplicationGroupShardConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyReplicationGroupShardConfigurationMessage,
  output: ModifyReplicationGroupShardConfigurationResult,
  errors: [
    InsufficientCacheClusterCapacityFault,
    InvalidCacheClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    InvalidVPCNetworkStateFault,
    NodeGroupsPerReplicationGroupQuotaExceededFault,
    NodeQuotaForCustomerExceededFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyReplicationGroupShardConfiguration",
}));

export type ModifyServerlessCacheError =
  | InvalidCredentialsException
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidServerlessCacheStateFault
  | InvalidUserGroupStateFault
  | ServerlessCacheNotFoundFault
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | CommonErrors;
/**
 * This API modifies the attributes of a serverless cache.
 */
export const modifyServerlessCache: API.OperationMethod<
  ModifyServerlessCacheRequest,
  ModifyServerlessCacheResponse,
  ModifyServerlessCacheError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyServerlessCacheRequest,
  output: ModifyServerlessCacheResponse,
  errors: [
    InvalidCredentialsException,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidServerlessCacheStateFault,
    InvalidUserGroupStateFault,
    ServerlessCacheNotFoundFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyServerlessCache",
}));

export type ModifyUserError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes user password(s) and/or access string.
 */
export const modifyUser: API.OperationMethod<
  ModifyUserMessage,
  User,
  ModifyUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyUserMessage,
  output: User,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUser",
}));

export type ModifyUserGroupError =
  | DefaultUserRequired
  | DuplicateUserNameFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidUserGroupStateFault
  | ServiceLinkedRoleNotFoundFault
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Changes the list of users that belong to the user group.
 */
export const modifyUserGroup: API.OperationMethod<
  ModifyUserGroupMessage,
  UserGroup,
  ModifyUserGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyUserGroupMessage,
  output: UserGroup,
  errors: [
    DefaultUserRequired,
    DuplicateUserNameFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidUserGroupStateFault,
    ServiceLinkedRoleNotFoundFault,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyUserGroup",
}));

export type PurchaseReservedCacheNodesOfferingError =
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | ReservedCacheNodeAlreadyExistsFault
  | ReservedCacheNodeQuotaExceededFault
  | ReservedCacheNodesOfferingNotFoundFault
  | TagQuotaPerResourceExceeded
  | CommonErrors;
/**
 * Allows you to purchase a reserved cache node offering. Reserved nodes are not eligible
 * for cancellation and are non-refundable. For more information, see Managing Costs with Reserved Nodes.
 */
export const purchaseReservedCacheNodesOffering: API.OperationMethod<
  PurchaseReservedCacheNodesOfferingMessage,
  PurchaseReservedCacheNodesOfferingResult,
  PurchaseReservedCacheNodesOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PurchaseReservedCacheNodesOfferingMessage,
  output: PurchaseReservedCacheNodesOfferingResult,
  errors: [
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    ReservedCacheNodeAlreadyExistsFault,
    ReservedCacheNodeQuotaExceededFault,
    ReservedCacheNodesOfferingNotFoundFault,
    TagQuotaPerResourceExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseReservedCacheNodesOffering",
}));

export type RebalanceSlotsInGlobalReplicationGroupError =
  | GlobalReplicationGroupNotFoundFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Redistribute slots to ensure uniform distribution across existing shards in the
 * cluster.
 */
export const rebalanceSlotsInGlobalReplicationGroup: API.OperationMethod<
  RebalanceSlotsInGlobalReplicationGroupMessage,
  RebalanceSlotsInGlobalReplicationGroupResult,
  RebalanceSlotsInGlobalReplicationGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebalanceSlotsInGlobalReplicationGroupMessage,
  output: RebalanceSlotsInGlobalReplicationGroupResult,
  errors: [
    GlobalReplicationGroupNotFoundFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebalanceSlotsInGlobalReplicationGroup",
}));

export type RebootCacheClusterError =
  | CacheClusterNotFoundFault
  | InvalidCacheClusterStateFault
  | CommonErrors;
/**
 * Reboots some, or all, of the cache nodes within a provisioned cluster. This operation
 * applies any modified cache parameter groups to the cluster. The reboot operation takes
 * place as soon as possible, and results in a momentary outage to the cluster. During the
 * reboot, the cluster status is set to REBOOTING.
 *
 * The reboot causes the contents of the cache (for each cache node being rebooted) to be
 * lost.
 *
 * When the reboot is complete, a cluster event is created.
 *
 * Rebooting a cluster is currently supported on Memcached, Valkey and Redis OSS (cluster mode
 * disabled) clusters. Rebooting is not supported on Valkey or Redis OSS (cluster mode enabled)
 * clusters.
 *
 * If you make changes to parameters that require a Valkey or Redis OSS (cluster mode enabled) cluster
 * reboot for the changes to be applied, see Rebooting a Cluster for an alternate process.
 */
export const rebootCacheCluster: API.OperationMethod<
  RebootCacheClusterMessage,
  RebootCacheClusterResult,
  RebootCacheClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootCacheClusterMessage,
  output: RebootCacheClusterResult,
  errors: [CacheClusterNotFoundFault, InvalidCacheClusterStateFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootCacheCluster",
}));

export type RemoveTagsFromResourceError =
  | CacheClusterNotFoundFault
  | CacheParameterGroupNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | CacheSubnetGroupNotFoundFault
  | InvalidARNFault
  | InvalidReplicationGroupStateFault
  | InvalidServerlessCacheSnapshotStateFault
  | InvalidServerlessCacheStateFault
  | ReplicationGroupNotFoundFault
  | ReservedCacheNodeNotFoundFault
  | ServerlessCacheNotFoundFault
  | ServerlessCacheSnapshotNotFoundFault
  | SnapshotNotFoundFault
  | TagNotFoundFault
  | UserGroupNotFoundFault
  | UserNotFoundFault
  | CommonErrors;
/**
 * Removes the tags identified by the `TagKeys` list from the named resource.
 * A tag is a key-value pair where the key and value are case-sensitive. You can use tags
 * to categorize and track all your ElastiCache resources, with the exception of global
 * replication group. When you add or remove tags on replication groups, those actions will
 * be replicated to all nodes in the replication group. For more information, see Resource-level permissions.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceMessage,
  TagListMessage,
  RemoveTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsFromResourceMessage,
  output: TagListMessage,
  errors: [
    CacheClusterNotFoundFault,
    CacheParameterGroupNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    CacheSubnetGroupNotFoundFault,
    InvalidARNFault,
    InvalidReplicationGroupStateFault,
    InvalidServerlessCacheSnapshotStateFault,
    InvalidServerlessCacheStateFault,
    ReplicationGroupNotFoundFault,
    ReservedCacheNodeNotFoundFault,
    ServerlessCacheNotFoundFault,
    ServerlessCacheSnapshotNotFoundFault,
    SnapshotNotFoundFault,
    TagNotFoundFault,
    UserGroupNotFoundFault,
    UserNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type ResetCacheParameterGroupError =
  | CacheParameterGroupNotFoundFault
  | InvalidCacheParameterGroupStateFault
  | InvalidGlobalReplicationGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Modifies the parameters of a cache parameter group to the engine or system default
 * value. You can reset specific parameters by submitting a list of parameter names. To
 * reset the entire cache parameter group, specify the `ResetAllParameters` and
 * `CacheParameterGroupName` parameters.
 */
export const resetCacheParameterGroup: API.OperationMethod<
  ResetCacheParameterGroupMessage,
  CacheParameterGroupNameMessage,
  ResetCacheParameterGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetCacheParameterGroupMessage,
  output: CacheParameterGroupNameMessage,
  errors: [
    CacheParameterGroupNotFoundFault,
    InvalidCacheParameterGroupStateFault,
    InvalidGlobalReplicationGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetCacheParameterGroup",
}));

export type RevokeCacheSecurityGroupIngressError =
  | AuthorizationNotFoundFault
  | CacheSecurityGroupNotFoundFault
  | InvalidCacheSecurityGroupStateFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Revokes ingress from a cache security group. Use this operation to disallow access
 * from an Amazon EC2 security group that had been previously authorized.
 */
export const revokeCacheSecurityGroupIngress: API.OperationMethod<
  RevokeCacheSecurityGroupIngressMessage,
  RevokeCacheSecurityGroupIngressResult,
  RevokeCacheSecurityGroupIngressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeCacheSecurityGroupIngressMessage,
  output: RevokeCacheSecurityGroupIngressResult,
  errors: [
    AuthorizationNotFoundFault,
    CacheSecurityGroupNotFoundFault,
    InvalidCacheSecurityGroupStateFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeCacheSecurityGroupIngress",
}));

export type StartMigrationError =
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupAlreadyUnderMigrationFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Start the migration of data.
 */
export const startMigration: API.OperationMethod<
  StartMigrationMessage,
  StartMigrationResponse,
  StartMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMigrationMessage,
  output: StartMigrationResponse,
  errors: [
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupAlreadyUnderMigrationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMigration",
}));

export type TestFailoverError =
  | APICallRateForCustomerExceededFault
  | InvalidCacheClusterStateFault
  | InvalidKMSKeyFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | NodeGroupNotFoundFault
  | ReplicationGroupNotFoundFault
  | TestFailoverNotAvailableFault
  | CommonErrors;
/**
 * Represents the input of a `TestFailover` operation which tests automatic
 * failover on a specified node group (called shard in the console) in a replication group
 * (called cluster in the console).
 *
 * This API is designed for testing the behavior of your application in case of
 * ElastiCache failover. It is not designed to be an operational tool for initiating a
 * failover to overcome a problem you may have with the cluster. Moreover, in certain
 * conditions such as large-scale operational events, Amazon may block this API.
 *
 * **Note the following**
 *
 * - A customer can use this operation to test automatic failover on up to 15 shards
 * (called node groups in the ElastiCache API and Amazon CLI) in any rolling
 * 24-hour period.
 *
 * - If calling this operation on shards in different clusters (called replication
 * groups in the API and CLI), the calls can be made concurrently.
 *
 * - If calling this operation multiple times on different shards in the same Valkey or Redis OSS (cluster mode enabled) replication group, the first node replacement must
 * complete before a subsequent call can be made.
 *
 * - To determine whether the node replacement is complete you can check Events
 * using the Amazon ElastiCache console, the Amazon CLI, or the ElastiCache API.
 * Look for the following automatic failover related events, listed here in order
 * of occurrance:
 *
 * - Replication group message: Test Failover API called for node
 * group
 *
 * - Cache cluster message: Failover from primary node
 * to replica node
 * completed
 *
 * - Replication group message: Failover from primary node
 * to replica node
 * completed
 *
 * - Cache cluster message: Recovering cache nodes
 *
 * - Cache cluster message: Finished recovery for cache nodes
 *
 * For more information see:
 *
 * - Viewing
 * ElastiCache Events in the ElastiCache User
 * Guide
 *
 * - DescribeEvents in the ElastiCache API Reference
 *
 * Also see, Testing
 * Multi-AZ in the *ElastiCache User Guide*.
 */
export const testFailover: API.OperationMethod<
  TestFailoverMessage,
  TestFailoverResult,
  TestFailoverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestFailoverMessage,
  output: TestFailoverResult,
  errors: [
    APICallRateForCustomerExceededFault,
    InvalidCacheClusterStateFault,
    InvalidKMSKeyFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    NodeGroupNotFoundFault,
    ReplicationGroupNotFoundFault,
    TestFailoverNotAvailableFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestFailover",
}));

export type TestMigrationError =
  | InvalidParameterValueException
  | InvalidReplicationGroupStateFault
  | ReplicationGroupAlreadyUnderMigrationFault
  | ReplicationGroupNotFoundFault
  | CommonErrors;
/**
 * Async API to test connection between source and target replication group.
 */
export const testMigration: API.OperationMethod<
  TestMigrationMessage,
  TestMigrationResponse,
  TestMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestMigrationMessage,
  output: TestMigrationResponse,
  errors: [
    InvalidParameterValueException,
    InvalidReplicationGroupStateFault,
    ReplicationGroupAlreadyUnderMigrationFault,
    ReplicationGroupNotFoundFault,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestMigration",
}));
