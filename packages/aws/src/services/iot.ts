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
  sdkId: "IoT",
  serviceShapeName: "AWSIotService",
});
const auth = T.AwsAuthSigv4({ name: "iot" });
const ver = T.ServiceVersion("2015-05-28");
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
              `https://iot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://iot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://iot.${Region}.amazonaws.com`);
        }
        if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
          return e(`https://iot.${Region}.amazonaws.com.cn`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://iot.${Region}.amazonaws.com`);
        }
        return e(
          `https://iot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CertificateConflictException
  extends /*@__PURE__*/ S.TaggedError<CertificateConflictException>()(
    "CertificateConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CertificateStateException
  extends /*@__PURE__*/ S.TaggedError<CertificateStateException>()(
    "CertificateStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(406),
  ).pipe(C.withBadRequestError) {}
export class CertificateValidationException
  extends /*@__PURE__*/ S.TaggedError<CertificateValidationException>()(
    "CertificateValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictingResourceUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConflictingResourceUpdateException>()(
    "ConflictingResourceUpdateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DeleteConflictException
  extends /*@__PURE__*/ S.TaggedError<DeleteConflictException>()(
    "DeleteConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IndexNotReadyException
  extends /*@__PURE__*/ S.TaggedError<IndexNotReadyException>()(
    "IndexNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidAggregationException
  extends /*@__PURE__*/ S.TaggedError<InvalidAggregationException>()(
    "InvalidAggregationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryException
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryException>()(
    "InvalidQueryException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResponseException
  extends /*@__PURE__*/ S.TaggedError<InvalidResponseException>()(
    "InvalidResponseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyException>()(
    "MalformedPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotConfiguredException
  extends /*@__PURE__*/ S.TaggedError<NotConfiguredException>()(
    "NotConfiguredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RegistrationCodeValidationException
  extends /*@__PURE__*/ S.TaggedError<RegistrationCodeValidationException>()(
    "RegistrationCodeValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceArn: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceRegistrationFailureException
  extends /*@__PURE__*/ S.TaggedError<ResourceRegistrationFailureException>()(
    "ResourceRegistrationFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class SqlParseException
  extends /*@__PURE__*/ S.TaggedError<SqlParseException>()(
    "SqlParseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TaskAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TaskAlreadyExistsException>()(
    "TaskAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TopicRuleNotFound
  extends /*@__PURE__*/ S.TaggedError<TopicRuleNotFound>()(
    "TopicRuleNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "UnauthorizedException",
      message: { includes: "Access to topic rule" },
    }),
  ).pipe(C.withNotFoundError) {}
export class TransferAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<TransferAlreadyCompletedException>()(
    "TransferAlreadyCompletedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class TransferConflictException
  extends /*@__PURE__*/ S.TaggedError<TransferConflictException>()(
    "TransferConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class VersionConflictException
  extends /*@__PURE__*/ S.TaggedError<VersionConflictException>()(
    "VersionConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class VersionsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<VersionsLimitExceededException>()(
    "VersionsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export type CertificateId = string;
export type SetAsActive = boolean;
export interface AcceptCertificateTransferRequest {
  certificateId: string;
  setAsActive?: boolean;
}
export const AcceptCertificateTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.String.pipe(T.HttpLabel("certificateId")),
    setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/accept-certificate-transfer/{certificateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptCertificateTransferRequest",
}) as any as S.Schema<AcceptCertificateTransferRequest>;
export interface AcceptCertificateTransferResponse {}
export const AcceptCertificateTransferResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptCertificateTransferResponse",
}) as any as S.Schema<AcceptCertificateTransferResponse>;
export type BillingGroupName = string;
export type BillingGroupArn = string;
export type ThingName = string;
export type ThingArn = string;
export interface AddThingToBillingGroupRequest {
  billingGroupName?: string;
  billingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
}
export const AddThingToBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.optional(S.String),
    billingGroupArn: S.optional(S.String),
    thingName: S.optional(S.String),
    thingArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/billing-groups/addThingToBillingGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddThingToBillingGroupRequest",
}) as any as S.Schema<AddThingToBillingGroupRequest>;
export interface AddThingToBillingGroupResponse {}
export const AddThingToBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AddThingToBillingGroupResponse",
}) as any as S.Schema<AddThingToBillingGroupResponse>;
export type ThingGroupName = string;
export type ThingGroupArn = string;
export type OverrideDynamicGroups = boolean;
export interface AddThingToThingGroupRequest {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
  overrideDynamicGroups?: boolean;
}
export const AddThingToThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.optional(S.String),
    thingGroupArn: S.optional(S.String),
    thingName: S.optional(S.String),
    thingArn: S.optional(S.String),
    overrideDynamicGroups: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/thing-groups/addThingToThingGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddThingToThingGroupRequest",
}) as any as S.Schema<AddThingToThingGroupRequest>;
export interface AddThingToThingGroupResponse {}
export const AddThingToThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AddThingToThingGroupResponse",
}) as any as S.Schema<AddThingToThingGroupResponse>;
export type PackageName = string;
export type VersionName = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3Version = string;
export interface S3Location {
  bucket?: string;
  key?: string;
  version?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    key: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface Sbom {
  s3Location?: S3Location;
}
export const Sbom = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Location: S.optional(S3Location) }),
).annotate({ identifier: "Sbom" }) as any as S.Schema<Sbom>;
export type ClientToken = string;
export interface AssociateSbomWithPackageVersionRequest {
  packageName: string;
  versionName: string;
  sbom: Sbom;
  clientToken?: string;
}
export const AssociateSbomWithPackageVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      packageName: S.String.pipe(T.HttpLabel("packageName")),
      versionName: S.String.pipe(T.HttpLabel("versionName")),
      sbom: Sbom,
      clientToken: S.optional(S.String).pipe(
        T.HttpQuery("clientToken"),
        T.IdempotencyToken(),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/packages/{packageName}/versions/{versionName}/sbom",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateSbomWithPackageVersionRequest",
}) as any as S.Schema<AssociateSbomWithPackageVersionRequest>;
export type SbomValidationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export const SbomValidationStatus = S.String;

export interface AssociateSbomWithPackageVersionResponse {
  packageName?: string;
  versionName?: string;
  sbom?: Sbom;
  sbomValidationStatus?: SbomValidationStatus;
}
export const AssociateSbomWithPackageVersionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      packageName: S.optional(S.String),
      versionName: S.optional(S.String),
      sbom: S.optional(Sbom),
      sbomValidationStatus: S.optional(SbomValidationStatus),
    }),
).annotate({
  identifier: "AssociateSbomWithPackageVersionResponse",
}) as any as S.Schema<AssociateSbomWithPackageVersionResponse>;
export type TargetArn = string;
export type JobTargets = string[];
export const JobTargets = /*@__PURE__*/ S.Array(S.String);
export type JobId = string;
export type Comment = string;
export type NamespaceId = string;
export interface AssociateTargetsWithJobRequest {
  targets: string[];
  jobId: string;
  comment?: string;
  namespaceId?: string;
}
export const AssociateTargetsWithJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targets: JobTargets,
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    comment: S.optional(S.String),
    namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/jobs/{jobId}/targets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateTargetsWithJobRequest",
}) as any as S.Schema<AssociateTargetsWithJobRequest>;
export type JobArn = string;
export type JobDescription = string;
export interface AssociateTargetsWithJobResponse {
  jobArn?: string;
  jobId?: string;
  description?: string;
}
export const AssociateTargetsWithJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateTargetsWithJobResponse",
}) as any as S.Schema<AssociateTargetsWithJobResponse>;
export type PolicyName = string;
export type PolicyTarget = string;
export interface AttachPolicyRequest {
  policyName: string;
  target: string;
}
export const AttachPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    target: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/target-policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachPolicyRequest",
}) as any as S.Schema<AttachPolicyRequest>;
export interface AttachPolicyResponse {}
export const AttachPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AttachPolicyResponse",
}) as any as S.Schema<AttachPolicyResponse>;
export type Principal = string;
export interface AttachPrincipalPolicyRequest {
  policyName: string;
  principal: string;
}
export const AttachPrincipalPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    principal: S.String.pipe(T.HttpHeader("x-amzn-iot-principal")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/principal-policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachPrincipalPolicyRequest",
}) as any as S.Schema<AttachPrincipalPolicyRequest>;
export interface AttachPrincipalPolicyResponse {}
export const AttachPrincipalPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AttachPrincipalPolicyResponse",
}) as any as S.Schema<AttachPrincipalPolicyResponse>;
export type SecurityProfileName = string;
export type SecurityProfileTargetArn = string;
export interface AttachSecurityProfileRequest {
  securityProfileName: string;
  securityProfileTargetArn: string;
}
export const AttachSecurityProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
    securityProfileTargetArn: S.String.pipe(
      T.HttpQuery("securityProfileTargetArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/security-profiles/{securityProfileName}/targets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachSecurityProfileRequest",
}) as any as S.Schema<AttachSecurityProfileRequest>;
export interface AttachSecurityProfileResponse {}
export const AttachSecurityProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AttachSecurityProfileResponse",
}) as any as S.Schema<AttachSecurityProfileResponse>;
export type ThingPrincipalType =
  | "EXCLUSIVE_THING"
  | "NON_EXCLUSIVE_THING"
  | (string & {});
export const ThingPrincipalType = S.String;

export interface AttachThingPrincipalRequest {
  thingName: string;
  principal: string;
  thingPrincipalType?: ThingPrincipalType;
}
export const AttachThingPrincipalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
    thingPrincipalType: S.optional(ThingPrincipalType).pipe(
      T.HttpQuery("thingPrincipalType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/things/{thingName}/principals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AttachThingPrincipalRequest",
}) as any as S.Schema<AttachThingPrincipalRequest>;
export interface AttachThingPrincipalResponse {}
export const AttachThingPrincipalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AttachThingPrincipalResponse",
}) as any as S.Schema<AttachThingPrincipalResponse>;
export type MitigationActionsTaskId = string;
export interface CancelAuditMitigationActionsTaskRequest {
  taskId: string;
}
export const CancelAuditMitigationActionsTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/audit/mitigationactions/tasks/{taskId}/cancel",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CancelAuditMitigationActionsTaskRequest",
}) as any as S.Schema<CancelAuditMitigationActionsTaskRequest>;
export interface CancelAuditMitigationActionsTaskResponse {}
export const CancelAuditMitigationActionsTaskResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "CancelAuditMitigationActionsTaskResponse",
}) as any as S.Schema<CancelAuditMitigationActionsTaskResponse>;
export type AuditTaskId = string;
export interface CancelAuditTaskRequest {
  taskId: string;
}
export const CancelAuditTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/audit/tasks/{taskId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelAuditTaskRequest",
}) as any as S.Schema<CancelAuditTaskRequest>;
export interface CancelAuditTaskResponse {}
export const CancelAuditTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelAuditTaskResponse",
}) as any as S.Schema<CancelAuditTaskResponse>;
export interface CancelCertificateTransferRequest {
  certificateId: string;
}
export const CancelCertificateTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/cancel-certificate-transfer/{certificateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelCertificateTransferRequest",
}) as any as S.Schema<CancelCertificateTransferRequest>;
export interface CancelCertificateTransferResponse {}
export const CancelCertificateTransferResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelCertificateTransferResponse",
}) as any as S.Schema<CancelCertificateTransferResponse>;
export interface CancelDetectMitigationActionsTaskRequest {
  taskId: string;
}
export const CancelDetectMitigationActionsTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/detect/mitigationactions/tasks/{taskId}/cancel",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CancelDetectMitigationActionsTaskRequest",
}) as any as S.Schema<CancelDetectMitigationActionsTaskRequest>;
export interface CancelDetectMitigationActionsTaskResponse {}
export const CancelDetectMitigationActionsTaskResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CancelDetectMitigationActionsTaskResponse",
  }) as any as S.Schema<CancelDetectMitigationActionsTaskResponse>;
export type ReasonCode = string;
export type ForceFlag = boolean;
export interface CancelJobRequest {
  jobId: string;
  reasonCode?: string;
  comment?: string;
  force?: boolean;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    reasonCode: S.optional(S.String),
    comment: S.optional(S.String),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/jobs/{jobId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelJobRequest",
}) as any as S.Schema<CancelJobRequest>;
export interface CancelJobResponse {
  jobArn?: string;
  jobId?: string;
  description?: string;
}
export const CancelJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelJobResponse",
}) as any as S.Schema<CancelJobResponse>;
export type ExpectedVersion = number;
export type DetailsKey = string;
export type DetailsValue = string;
export type DetailsMap = { [key: string]: string | undefined };
export const DetailsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CancelJobExecutionRequest {
  jobId: string;
  thingName: string;
  force?: boolean;
  expectedVersion?: number;
  statusDetails?: { [key: string]: string | undefined };
}
export const CancelJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    expectedVersion: S.optional(S.Number),
    statusDetails: S.optional(DetailsMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/things/{thingName}/jobs/{jobId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelJobExecutionRequest",
}) as any as S.Schema<CancelJobExecutionRequest>;
export interface CancelJobExecutionResponse {}
export const CancelJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelJobExecutionResponse",
}) as any as S.Schema<CancelJobExecutionResponse>;
export interface ClearDefaultAuthorizerRequest {}
export const ClearDefaultAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/default-authorizer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ClearDefaultAuthorizerRequest",
}) as any as S.Schema<ClearDefaultAuthorizerRequest>;
export interface ClearDefaultAuthorizerResponse {}
export const ClearDefaultAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ClearDefaultAuthorizerResponse",
}) as any as S.Schema<ClearDefaultAuthorizerResponse>;
export type ConfirmationToken = string;
export interface ConfirmTopicRuleDestinationRequest {
  confirmationToken: string;
}
export const ConfirmTopicRuleDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    confirmationToken: S.String.pipe(T.HttpLabel("confirmationToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/confirmdestination/{confirmationToken+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConfirmTopicRuleDestinationRequest",
}) as any as S.Schema<ConfirmTopicRuleDestinationRequest>;
export interface ConfirmTopicRuleDestinationResponse {}
export const ConfirmTopicRuleDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ConfirmTopicRuleDestinationResponse",
}) as any as S.Schema<ConfirmTopicRuleDestinationResponse>;
export type AuditCheckName = string;
export type CognitoIdentityPoolId = string;
export type ClientId = string;
export type PolicyVersionId = string;
export interface PolicyVersionIdentifier {
  policyName?: string;
  policyVersionId?: string;
}
export const PolicyVersionIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyVersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "PolicyVersionIdentifier",
}) as any as S.Schema<PolicyVersionIdentifier>;
export type AwsAccountId = string;
export type RoleArn = string;
export type RoleAliasArn = string;
export type IssuerCertificateSubject = string;
export type IssuerId = string;
export type IssuerCertificateSerialNumber = string;
export interface IssuerCertificateIdentifier {
  issuerCertificateSubject?: string;
  issuerId?: string;
  issuerCertificateSerialNumber?: string;
}
export const IssuerCertificateIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuerCertificateSubject: S.optional(S.String),
    issuerId: S.optional(S.String),
    issuerCertificateSerialNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "IssuerCertificateIdentifier",
}) as any as S.Schema<IssuerCertificateIdentifier>;
export type CertificateArn = string;
export interface ResourceIdentifier {
  deviceCertificateId?: string;
  caCertificateId?: string;
  cognitoIdentityPoolId?: string;
  clientId?: string;
  policyVersionIdentifier?: PolicyVersionIdentifier;
  account?: string;
  iamRoleArn?: string;
  roleAliasArn?: string;
  issuerCertificateIdentifier?: IssuerCertificateIdentifier;
  deviceCertificateArn?: string;
}
export const ResourceIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deviceCertificateId: S.optional(S.String),
    caCertificateId: S.optional(S.String),
    cognitoIdentityPoolId: S.optional(S.String),
    clientId: S.optional(S.String),
    policyVersionIdentifier: S.optional(PolicyVersionIdentifier),
    account: S.optional(S.String),
    iamRoleArn: S.optional(S.String),
    roleAliasArn: S.optional(S.String),
    issuerCertificateIdentifier: S.optional(IssuerCertificateIdentifier),
    deviceCertificateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceIdentifier",
}) as any as S.Schema<ResourceIdentifier>;
export type SuppressIndefinitely = boolean;
export type AuditDescription = string;
export type ClientRequestToken = string;
export interface CreateAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
  clientRequestToken: string;
}
export const CreateAuditSuppressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.String,
    resourceIdentifier: ResourceIdentifier,
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    suppressIndefinitely: S.optional(S.Boolean),
    description: S.optional(S.String),
    clientRequestToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/suppressions/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAuditSuppressionRequest",
}) as any as S.Schema<CreateAuditSuppressionRequest>;
export interface CreateAuditSuppressionResponse {}
export const CreateAuditSuppressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateAuditSuppressionResponse",
}) as any as S.Schema<CreateAuditSuppressionResponse>;
export type AuthorizerName = string;
export type AuthorizerFunctionArn = string;
export type TokenKeyName = string;
export type KeyName = string;
export type KeyValue = string;
export type PublicKeyMap = { [key: string]: string | undefined };
export const PublicKeyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AuthorizerStatus = "ACTIVE" | "INACTIVE" | (string & {});
export const AuthorizerStatus = S.String;

export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type BooleanKey = boolean;
export type EnableCachingForHttp = boolean;
export interface CreateAuthorizerRequest {
  authorizerName: string;
  authorizerFunctionArn: string;
  tokenKeyName?: string;
  tokenSigningPublicKeys?: { [key: string]: string | undefined };
  status?: AuthorizerStatus;
  tags?: Tag[];
  signingDisabled?: boolean;
  enableCachingForHttp?: boolean;
}
export const CreateAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
    authorizerFunctionArn: S.String,
    tokenKeyName: S.optional(S.String),
    tokenSigningPublicKeys: S.optional(PublicKeyMap),
    status: S.optional(AuthorizerStatus),
    tags: S.optional(TagList),
    signingDisabled: S.optional(S.Boolean),
    enableCachingForHttp: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/authorizer/{authorizerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAuthorizerRequest",
}) as any as S.Schema<CreateAuthorizerRequest>;
export type AuthorizerArn = string;
export interface CreateAuthorizerResponse {
  authorizerName?: string;
  authorizerArn?: string;
}
export const CreateAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.optional(S.String),
    authorizerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateAuthorizerResponse",
}) as any as S.Schema<CreateAuthorizerResponse>;
export type BillingGroupDescription = string;
export interface BillingGroupProperties {
  billingGroupDescription?: string;
}
export const BillingGroupProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ billingGroupDescription: S.optional(S.String) }),
).annotate({
  identifier: "BillingGroupProperties",
}) as any as S.Schema<BillingGroupProperties>;
export interface CreateBillingGroupRequest {
  billingGroupName: string;
  billingGroupProperties?: BillingGroupProperties;
  tags?: Tag[];
}
export const CreateBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
    billingGroupProperties: S.optional(BillingGroupProperties),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/billing-groups/{billingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBillingGroupRequest",
}) as any as S.Schema<CreateBillingGroupRequest>;
export type BillingGroupId = string;
export interface CreateBillingGroupResponse {
  billingGroupName?: string;
  billingGroupArn?: string;
  billingGroupId?: string;
}
export const CreateBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.optional(S.String),
    billingGroupArn: S.optional(S.String),
    billingGroupId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateBillingGroupResponse",
}) as any as S.Schema<CreateBillingGroupResponse>;
export type CertificateSigningRequest = string;
export interface CreateCertificateFromCsrRequest {
  certificateSigningRequest: string;
  setAsActive?: boolean;
}
export const CreateCertificateFromCsrRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateSigningRequest: S.String,
    setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/certificates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCertificateFromCsrRequest",
}) as any as S.Schema<CreateCertificateFromCsrRequest>;
export type CertificatePem = string;
export interface CreateCertificateFromCsrResponse {
  certificateArn?: string;
  certificateId?: string;
  certificatePem?: string;
}
export const CreateCertificateFromCsrResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    certificatePem: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCertificateFromCsrResponse",
}) as any as S.Schema<CreateCertificateFromCsrResponse>;
export type CertificateProviderName = string;
export type CertificateProviderFunctionArn = string;
export type CertificateProviderOperation =
  | "CreateCertificateFromCsr"
  | (string & {});
export const CertificateProviderOperation = S.String;

export type CertificateProviderAccountDefaultForOperations =
  CertificateProviderOperation[];
export const CertificateProviderAccountDefaultForOperations =
  /*@__PURE__*/ S.Array(CertificateProviderOperation);
export interface CreateCertificateProviderRequest {
  certificateProviderName: string;
  lambdaFunctionArn: string;
  accountDefaultForOperations: CertificateProviderOperation[];
  clientToken?: string;
  tags?: Tag[];
}
export const CreateCertificateProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.String.pipe(
      T.HttpLabel("certificateProviderName"),
    ),
    lambdaFunctionArn: S.String,
    accountDefaultForOperations: CertificateProviderAccountDefaultForOperations,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/certificate-providers/{certificateProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCertificateProviderRequest",
}) as any as S.Schema<CreateCertificateProviderRequest>;
export type CertificateProviderArn = string;
export interface CreateCertificateProviderResponse {
  certificateProviderName?: string;
  certificateProviderArn?: string;
}
export const CreateCertificateProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.optional(S.String),
    certificateProviderArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCertificateProviderResponse",
}) as any as S.Schema<CreateCertificateProviderResponse>;
export type CommandId = string;
export type CommandNamespace = "AWS-IoT" | "AWS-IoT-FleetWise" | (string & {});
export const CommandNamespace = S.String;

export type DisplayName = string;
export type CommandDescription = string;
export type CommandPayloadBlob = Uint8Array;
export type MimeType = string;
export interface CommandPayload {
  content?: Uint8Array;
  contentType?: string;
}
export const CommandPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(T.Blob), contentType: S.optional(S.String) }),
).annotate({ identifier: "CommandPayload" }) as any as S.Schema<CommandPayload>;
export type CommandPayloadTemplateString = string;
export type OutputFormat = "JSON" | "CBOR" | (string & {});
export const OutputFormat = S.String;

export interface AwsJsonSubstitutionCommandPreprocessorConfig {
  outputFormat: OutputFormat;
}
export const AwsJsonSubstitutionCommandPreprocessorConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ outputFormat: OutputFormat }),
  ).annotate({
    identifier: "AwsJsonSubstitutionCommandPreprocessorConfig",
  }) as any as S.Schema<AwsJsonSubstitutionCommandPreprocessorConfig>;
export interface CommandPreprocessor {
  awsJsonSubstitution?: AwsJsonSubstitutionCommandPreprocessorConfig;
}
export const CommandPreprocessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsJsonSubstitution: S.optional(
      AwsJsonSubstitutionCommandPreprocessorConfig,
    ),
  }),
).annotate({
  identifier: "CommandPreprocessor",
}) as any as S.Schema<CommandPreprocessor>;
export type CommandParameterName = string;
export type CommandParameterType =
  | "STRING"
  | "INTEGER"
  | "DOUBLE"
  | "LONG"
  | "UNSIGNEDLONG"
  | "BOOLEAN"
  | "BINARY"
  | (string & {});
export const CommandParameterType = S.String;

export type StringParameterValue = string;
export type BooleanParameterValue = boolean;
export type IntegerParameterValue = number;
export type LongParameterValue = number;
export type DoubleParameterValue = number;
export type BinaryParameterValue = Uint8Array;
export type UnsignedLongParameterValue = string;
export interface CommandParameterValue {
  S?: string;
  B?: boolean;
  I?: number;
  L?: number;
  D?: number;
  BIN?: Uint8Array;
  UL?: string;
}
export const CommandParameterValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S: S.optional(S.String),
    B: S.optional(S.Boolean),
    I: S.optional(S.Number),
    L: S.optional(S.Number),
    D: S.optional(S.Number),
    BIN: S.optional(T.Blob),
    UL: S.optional(S.String),
  }),
).annotate({
  identifier: "CommandParameterValue",
}) as any as S.Schema<CommandParameterValue>;
export type CommandParameterValueComparisonOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_EQUALS"
  | "GREATER_THAN"
  | "GREATER_THAN_EQUALS"
  | "IN_SET"
  | "NOT_IN_SET"
  | "IN_RANGE"
  | "NOT_IN_RANGE"
  | (string & {});
export const CommandParameterValueComparisonOperator = S.String;

export type CommandParameterValueStringList = string[];
export const CommandParameterValueStringList = /*@__PURE__*/ S.Array(S.String);
export interface CommandParameterValueNumberRange {
  min: string;
  max: string;
}
export const CommandParameterValueNumberRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ min: S.String, max: S.String }),
).annotate({
  identifier: "CommandParameterValueNumberRange",
}) as any as S.Schema<CommandParameterValueNumberRange>;
export interface CommandParameterValueComparisonOperand {
  number?: string;
  numbers?: string[];
  string?: string;
  strings?: string[];
  numberRange?: CommandParameterValueNumberRange;
}
export const CommandParameterValueComparisonOperand = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      number: S.optional(S.String),
      numbers: S.optional(CommandParameterValueStringList),
      string: S.optional(S.String),
      strings: S.optional(CommandParameterValueStringList),
      numberRange: S.optional(CommandParameterValueNumberRange),
    }),
).annotate({
  identifier: "CommandParameterValueComparisonOperand",
}) as any as S.Schema<CommandParameterValueComparisonOperand>;
export interface CommandParameterValueCondition {
  comparisonOperator: CommandParameterValueComparisonOperator;
  operand: CommandParameterValueComparisonOperand;
}
export const CommandParameterValueCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparisonOperator: CommandParameterValueComparisonOperator,
    operand: CommandParameterValueComparisonOperand,
  }),
).annotate({
  identifier: "CommandParameterValueCondition",
}) as any as S.Schema<CommandParameterValueCondition>;
export type CommandParameterValueConditionList =
  CommandParameterValueCondition[];
export const CommandParameterValueConditionList = /*@__PURE__*/ S.Array(
  CommandParameterValueCondition,
);
export type CommandParameterDescription = string;
export interface CommandParameter {
  name: string;
  type?: CommandParameterType;
  value?: CommandParameterValue;
  defaultValue?: CommandParameterValue;
  valueConditions?: CommandParameterValueCondition[];
  description?: string;
}
export const CommandParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: S.optional(CommandParameterType),
    value: S.optional(CommandParameterValue),
    defaultValue: S.optional(CommandParameterValue),
    valueConditions: S.optional(CommandParameterValueConditionList),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "CommandParameter",
}) as any as S.Schema<CommandParameter>;
export type CommandParameterList = CommandParameter[];
export const CommandParameterList = /*@__PURE__*/ S.Array(CommandParameter);
export interface CreateCommandRequest {
  commandId: string;
  namespace?: CommandNamespace;
  displayName?: string;
  description?: string;
  payload?: CommandPayload;
  payloadTemplate?: string;
  preprocessor?: CommandPreprocessor;
  mandatoryParameters?: CommandParameter[];
  roleArn?: string;
  tags?: Tag[];
}
export const CreateCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandId: S.String.pipe(T.HttpLabel("commandId")),
    namespace: S.optional(CommandNamespace),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    payload: S.optional(CommandPayload),
    payloadTemplate: S.optional(S.String),
    preprocessor: S.optional(CommandPreprocessor),
    mandatoryParameters: S.optional(CommandParameterList),
    roleArn: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/commands/{commandId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCommandRequest",
}) as any as S.Schema<CreateCommandRequest>;
export type CommandArn = string;
export interface CreateCommandResponse {
  commandId?: string;
  commandArn?: string;
}
export const CreateCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandId: S.optional(S.String),
    commandArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCommandResponse",
}) as any as S.Schema<CreateCommandResponse>;
export type MetricName = string;
export type CustomMetricDisplayName = string;
export type CustomMetricType =
  | "string-list"
  | "ip-address-list"
  | "number-list"
  | "number"
  | (string & {});
export const CustomMetricType = S.String;

export interface CreateCustomMetricRequest {
  metricName: string;
  displayName?: string;
  metricType: CustomMetricType;
  tags?: Tag[];
  clientRequestToken: string;
}
export const CreateCustomMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.String.pipe(T.HttpLabel("metricName")),
    displayName: S.optional(S.String),
    metricType: CustomMetricType,
    tags: S.optional(TagList),
    clientRequestToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/custom-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomMetricRequest",
}) as any as S.Schema<CreateCustomMetricRequest>;
export type CustomMetricArn = string;
export interface CreateCustomMetricResponse {
  metricName?: string;
  metricArn?: string;
}
export const CreateCustomMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    metricArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCustomMetricResponse",
}) as any as S.Schema<CreateCustomMetricResponse>;
export type DimensionName = string;
export type DimensionType = "TOPIC_FILTER" | (string & {});
export const DimensionType = S.String;

export type DimensionStringValue = string;
export type DimensionStringValues = string[];
export const DimensionStringValues = /*@__PURE__*/ S.Array(S.String);
export interface CreateDimensionRequest {
  name: string;
  type: DimensionType;
  stringValues: string[];
  tags?: Tag[];
  clientRequestToken: string;
}
export const CreateDimensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    type: DimensionType,
    stringValues: DimensionStringValues,
    tags: S.optional(TagList),
    clientRequestToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dimensions/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDimensionRequest",
}) as any as S.Schema<CreateDimensionRequest>;
export type DimensionArn = string;
export interface CreateDimensionResponse {
  name?: string;
  arn?: string;
}
export const CreateDimensionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDimensionResponse",
}) as any as S.Schema<CreateDimensionResponse>;
export type DomainConfigurationName = string;
export type DomainName = string;
export type AcmCertificateArn = string;
export type ServerCertificateArns = string[];
export const ServerCertificateArns = /*@__PURE__*/ S.Array(S.String);
export type AllowAuthorizerOverride = boolean;
export interface AuthorizerConfig {
  defaultAuthorizerName?: string;
  allowAuthorizerOverride?: boolean;
}
export const AuthorizerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultAuthorizerName: S.optional(S.String),
    allowAuthorizerOverride: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AuthorizerConfig",
}) as any as S.Schema<AuthorizerConfig>;
export type ServiceType =
  | "DATA"
  | "CREDENTIAL_PROVIDER"
  | "JOBS"
  | (string & {});
export const ServiceType = S.String;

export type SecurityPolicy = string;
export interface TlsConfig {
  securityPolicy?: string;
}
export const TlsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ securityPolicy: S.optional(S.String) }),
).annotate({ identifier: "TlsConfig" }) as any as S.Schema<TlsConfig>;
export type EnableOCSPCheck = boolean;
export type OCSPLambdaArn = string;
export interface ServerCertificateConfig {
  enableOCSPCheck?: boolean;
  ocspLambdaArn?: string;
  ocspAuthorizedResponderArn?: string;
}
export const ServerCertificateConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enableOCSPCheck: S.optional(S.Boolean),
    ocspLambdaArn: S.optional(S.String),
    ocspAuthorizedResponderArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerCertificateConfig",
}) as any as S.Schema<ServerCertificateConfig>;
export type AuthenticationType =
  | "CUSTOM_AUTH_X509"
  | "CUSTOM_AUTH"
  | "AWS_X509"
  | "AWS_SIGV4"
  | "DEFAULT"
  | (string & {});
export const AuthenticationType = S.String;

export type ApplicationProtocol =
  | "SECURE_MQTT"
  | "MQTT_WSS"
  | "HTTPS"
  | "DEFAULT"
  | (string & {});
export const ApplicationProtocol = S.String;

export type ClientCertificateCallbackArn = string;
export interface ClientCertificateConfig {
  clientCertificateCallbackArn?: string;
}
export const ClientCertificateConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientCertificateCallbackArn: S.optional(S.String) }),
).annotate({
  identifier: "ClientCertificateConfig",
}) as any as S.Schema<ClientCertificateConfig>;
export interface CreateDomainConfigurationRequest {
  domainConfigurationName: string;
  domainName?: string;
  serverCertificateArns?: string[];
  validationCertificateArn?: string;
  authorizerConfig?: AuthorizerConfig;
  serviceType?: ServiceType;
  tags?: Tag[];
  tlsConfig?: TlsConfig;
  serverCertificateConfig?: ServerCertificateConfig;
  authenticationType?: AuthenticationType;
  applicationProtocol?: ApplicationProtocol;
  clientCertificateConfig?: ClientCertificateConfig;
}
export const CreateDomainConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.String.pipe(
      T.HttpLabel("domainConfigurationName"),
    ),
    domainName: S.optional(S.String),
    serverCertificateArns: S.optional(ServerCertificateArns),
    validationCertificateArn: S.optional(S.String),
    authorizerConfig: S.optional(AuthorizerConfig),
    serviceType: S.optional(ServiceType),
    tags: S.optional(TagList),
    tlsConfig: S.optional(TlsConfig),
    serverCertificateConfig: S.optional(ServerCertificateConfig),
    authenticationType: S.optional(AuthenticationType),
    applicationProtocol: S.optional(ApplicationProtocol),
    clientCertificateConfig: S.optional(ClientCertificateConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/domainConfigurations/{domainConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainConfigurationRequest",
}) as any as S.Schema<CreateDomainConfigurationRequest>;
export type DomainConfigurationArn = string;
export interface CreateDomainConfigurationResponse {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
}
export const CreateDomainConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.optional(S.String),
    domainConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDomainConfigurationResponse",
}) as any as S.Schema<CreateDomainConfigurationResponse>;
export type ThingGroupDescription = string;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Flag = boolean;
export interface AttributePayload {
  attributes?: { [key: string]: string | undefined };
  merge?: boolean;
}
export const AttributePayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributes: S.optional(Attributes),
    merge: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AttributePayload",
}) as any as S.Schema<AttributePayload>;
export interface ThingGroupProperties {
  thingGroupDescription?: string;
  attributePayload?: AttributePayload;
}
export const ThingGroupProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupDescription: S.optional(S.String),
    attributePayload: S.optional(AttributePayload),
  }),
).annotate({
  identifier: "ThingGroupProperties",
}) as any as S.Schema<ThingGroupProperties>;
export type IndexName = string;
export type QueryString = string;
export type QueryVersion = string;
export interface CreateDynamicThingGroupRequest {
  thingGroupName: string;
  thingGroupProperties?: ThingGroupProperties;
  indexName?: string;
  queryString: string;
  queryVersion?: string;
  tags?: Tag[];
}
export const CreateDynamicThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    thingGroupProperties: S.optional(ThingGroupProperties),
    indexName: S.optional(S.String),
    queryString: S.String,
    queryVersion: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dynamic-thing-groups/{thingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDynamicThingGroupRequest",
}) as any as S.Schema<CreateDynamicThingGroupRequest>;
export type ThingGroupId = string;
export interface CreateDynamicThingGroupResponse {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingGroupId?: string;
  indexName?: string;
  queryString?: string;
  queryVersion?: string;
}
export const CreateDynamicThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.optional(S.String),
    thingGroupArn: S.optional(S.String),
    thingGroupId: S.optional(S.String),
    indexName: S.optional(S.String),
    queryString: S.optional(S.String),
    queryVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDynamicThingGroupResponse",
}) as any as S.Schema<CreateDynamicThingGroupResponse>;
export type FleetMetricName = string;
export type AggregationTypeName =
  | "Statistics"
  | "Percentiles"
  | "Cardinality"
  | (string & {});
export const AggregationTypeName = S.String;

export type AggregationTypeValue = string;
export type AggregationTypeValues = string[];
export const AggregationTypeValues = /*@__PURE__*/ S.Array(S.String);
export interface AggregationType {
  name: AggregationTypeName;
  values?: string[];
}
export const AggregationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AggregationTypeName,
    values: S.optional(AggregationTypeValues),
  }),
).annotate({
  identifier: "AggregationType",
}) as any as S.Schema<AggregationType>;
export type FleetMetricPeriod = number;
export type AggregationField = string;
export type FleetMetricDescription = string;
export type FleetMetricUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export const FleetMetricUnit = S.String;

export interface CreateFleetMetricRequest {
  metricName: string;
  queryString: string;
  aggregationType: AggregationType;
  period: number;
  aggregationField: string;
  description?: string;
  queryVersion?: string;
  indexName?: string;
  unit?: FleetMetricUnit;
  tags?: Tag[];
}
export const CreateFleetMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.String.pipe(T.HttpLabel("metricName")),
    queryString: S.String,
    aggregationType: AggregationType,
    period: S.Number,
    aggregationField: S.String,
    description: S.optional(S.String),
    queryVersion: S.optional(S.String),
    indexName: S.optional(S.String),
    unit: S.optional(FleetMetricUnit),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/fleet-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFleetMetricRequest",
}) as any as S.Schema<CreateFleetMetricRequest>;
export type FleetMetricArn = string;
export interface CreateFleetMetricResponse {
  metricName?: string;
  metricArn?: string;
}
export const CreateFleetMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    metricArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateFleetMetricResponse",
}) as any as S.Schema<CreateFleetMetricResponse>;
export type JobDocumentSource = string;
export type JobDocument = string;
export type ExpiresInSec = number;
export interface PresignedUrlConfig {
  roleArn?: string;
  expiresInSec?: number;
}
export const PresignedUrlConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.optional(S.String),
    expiresInSec: S.optional(S.Number),
  }),
).annotate({
  identifier: "PresignedUrlConfig",
}) as any as S.Schema<PresignedUrlConfig>;
export type TargetSelection = "CONTINUOUS" | "SNAPSHOT" | (string & {});
export const TargetSelection = S.String;

export type MaxJobExecutionsPerMin = number;
export type RolloutRatePerMinute = number;
export type IncrementFactor = number;
export type NumberOfThings = number;
export interface RateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export const RateIncreaseCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfNotifiedThings: S.optional(S.Number),
    numberOfSucceededThings: S.optional(S.Number),
  }),
).annotate({
  identifier: "RateIncreaseCriteria",
}) as any as S.Schema<RateIncreaseCriteria>;
export interface ExponentialRolloutRate {
  baseRatePerMinute: number;
  incrementFactor: number;
  rateIncreaseCriteria: RateIncreaseCriteria;
}
export const ExponentialRolloutRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseRatePerMinute: S.Number,
    incrementFactor: S.Number,
    rateIncreaseCriteria: RateIncreaseCriteria,
  }),
).annotate({
  identifier: "ExponentialRolloutRate",
}) as any as S.Schema<ExponentialRolloutRate>;
export interface JobExecutionsRolloutConfig {
  maximumPerMinute?: number;
  exponentialRate?: ExponentialRolloutRate;
}
export const JobExecutionsRolloutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maximumPerMinute: S.optional(S.Number),
    exponentialRate: S.optional(ExponentialRolloutRate),
  }),
).annotate({
  identifier: "JobExecutionsRolloutConfig",
}) as any as S.Schema<JobExecutionsRolloutConfig>;
export type JobExecutionFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export const JobExecutionFailureType = S.String;

export type AbortAction = "CANCEL" | (string & {});
export const AbortAction = S.String;

export type AbortThresholdPercentage = number;
export type MinimumNumberOfExecutedThings = number;
export interface AbortCriteria {
  failureType: JobExecutionFailureType;
  action: AbortAction;
  thresholdPercentage: number;
  minNumberOfExecutedThings: number;
}
export const AbortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failureType: JobExecutionFailureType,
    action: AbortAction,
    thresholdPercentage: S.Number,
    minNumberOfExecutedThings: S.Number,
  }),
).annotate({ identifier: "AbortCriteria" }) as any as S.Schema<AbortCriteria>;
export type AbortCriteriaList = AbortCriteria[];
export const AbortCriteriaList = /*@__PURE__*/ S.Array(AbortCriteria);
export interface AbortConfig {
  criteriaList: AbortCriteria[];
}
export const AbortConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ criteriaList: AbortCriteriaList }),
).annotate({ identifier: "AbortConfig" }) as any as S.Schema<AbortConfig>;
export type InProgressTimeoutInMinutes = number;
export interface TimeoutConfig {
  inProgressTimeoutInMinutes?: number;
}
export const TimeoutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inProgressTimeoutInMinutes: S.optional(S.Number) }),
).annotate({ identifier: "TimeoutConfig" }) as any as S.Schema<TimeoutConfig>;
export type JobTemplateArn = string;
export type RetryableFailureType =
  | "FAILED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export const RetryableFailureType = S.String;

export type NumberOfRetries = number;
export interface RetryCriteria {
  failureType: RetryableFailureType;
  numberOfRetries: number;
}
export const RetryCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failureType: RetryableFailureType, numberOfRetries: S.Number }),
).annotate({ identifier: "RetryCriteria" }) as any as S.Schema<RetryCriteria>;
export type RetryCriteriaList = RetryCriteria[];
export const RetryCriteriaList = /*@__PURE__*/ S.Array(RetryCriteria);
export interface JobExecutionsRetryConfig {
  criteriaList: RetryCriteria[];
}
export const JobExecutionsRetryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ criteriaList: RetryCriteriaList }),
).annotate({
  identifier: "JobExecutionsRetryConfig",
}) as any as S.Schema<JobExecutionsRetryConfig>;
export type ParameterKey = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export const ParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type StringDateTime = string;
export type JobEndBehavior =
  | "STOP_ROLLOUT"
  | "CANCEL"
  | "FORCE_CANCEL"
  | (string & {});
export const JobEndBehavior = S.String;

export type CronExpression = string;
export type DurationInMinutes = number;
export interface MaintenanceWindow {
  startTime: string;
  durationInMinutes: number;
}
export const MaintenanceWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTime: S.String, durationInMinutes: S.Number }),
).annotate({
  identifier: "MaintenanceWindow",
}) as any as S.Schema<MaintenanceWindow>;
export type MaintenanceWindows = MaintenanceWindow[];
export const MaintenanceWindows = /*@__PURE__*/ S.Array(MaintenanceWindow);
export interface SchedulingConfig {
  startTime?: string;
  endTime?: string;
  endBehavior?: JobEndBehavior;
  maintenanceWindows?: MaintenanceWindow[];
}
export const SchedulingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.optional(S.String),
    endTime: S.optional(S.String),
    endBehavior: S.optional(JobEndBehavior),
    maintenanceWindows: S.optional(MaintenanceWindows),
  }),
).annotate({
  identifier: "SchedulingConfig",
}) as any as S.Schema<SchedulingConfig>;
export type PackageVersionArn = string;
export type DestinationPackageVersions = string[];
export const DestinationPackageVersions = /*@__PURE__*/ S.Array(S.String);
export interface CreateJobRequest {
  jobId: string;
  targets: string[];
  documentSource?: string;
  document?: string;
  description?: string;
  presignedUrlConfig?: PresignedUrlConfig;
  targetSelection?: TargetSelection;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  tags?: Tag[];
  namespaceId?: string;
  jobTemplateArn?: string;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  documentParameters?: { [key: string]: string | undefined };
  schedulingConfig?: SchedulingConfig;
  destinationPackageVersions?: string[];
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    targets: JobTargets,
    documentSource: S.optional(S.String),
    document: S.optional(S.String),
    description: S.optional(S.String),
    presignedUrlConfig: S.optional(PresignedUrlConfig),
    targetSelection: S.optional(TargetSelection),
    jobExecutionsRolloutConfig: S.optional(JobExecutionsRolloutConfig),
    abortConfig: S.optional(AbortConfig),
    timeoutConfig: S.optional(TimeoutConfig),
    tags: S.optional(TagList),
    namespaceId: S.optional(S.String),
    jobTemplateArn: S.optional(S.String),
    jobExecutionsRetryConfig: S.optional(JobExecutionsRetryConfig),
    documentParameters: S.optional(ParameterMap),
    schedulingConfig: S.optional(SchedulingConfig),
    destinationPackageVersions: S.optional(DestinationPackageVersions),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export interface CreateJobResponse {
  jobArn?: string;
  jobId?: string;
  description?: string;
}
export const CreateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateJobResponse",
}) as any as S.Schema<CreateJobResponse>;
export type JobTemplateId = string;
export interface CreateJobTemplateRequest {
  jobTemplateId: string;
  jobArn?: string;
  documentSource?: string;
  document?: string;
  description: string;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  tags?: Tag[];
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  maintenanceWindows?: MaintenanceWindow[];
  destinationPackageVersions?: string[];
}
export const CreateJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobTemplateId: S.String.pipe(T.HttpLabel("jobTemplateId")),
    jobArn: S.optional(S.String),
    documentSource: S.optional(S.String),
    document: S.optional(S.String),
    description: S.String,
    presignedUrlConfig: S.optional(PresignedUrlConfig),
    jobExecutionsRolloutConfig: S.optional(JobExecutionsRolloutConfig),
    abortConfig: S.optional(AbortConfig),
    timeoutConfig: S.optional(TimeoutConfig),
    tags: S.optional(TagList),
    jobExecutionsRetryConfig: S.optional(JobExecutionsRetryConfig),
    maintenanceWindows: S.optional(MaintenanceWindows),
    destinationPackageVersions: S.optional(DestinationPackageVersions),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/job-templates/{jobTemplateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobTemplateRequest",
}) as any as S.Schema<CreateJobTemplateRequest>;
export interface CreateJobTemplateResponse {
  jobTemplateArn?: string;
  jobTemplateId?: string;
}
export const CreateJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobTemplateArn: S.optional(S.String),
    jobTemplateId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateJobTemplateResponse",
}) as any as S.Schema<CreateJobTemplateResponse>;
export interface CreateKeysAndCertificateRequest {
  setAsActive?: boolean;
}
export const CreateKeysAndCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/keys-and-certificate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateKeysAndCertificateRequest",
}) as any as S.Schema<CreateKeysAndCertificateRequest>;
export type PublicKey = string;
export type PrivateKey = string | redacted.Redacted<string>;
export interface KeyPair {
  PublicKey?: string;
  PrivateKey?: string | redacted.Redacted<string>;
}
export const KeyPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicKey: S.optional(S.String),
    PrivateKey: S.optional(SensitiveString),
  }),
).annotate({ identifier: "KeyPair" }) as any as S.Schema<KeyPair>;
export interface CreateKeysAndCertificateResponse {
  certificateArn?: string;
  certificateId?: string;
  certificatePem?: string;
  keyPair?: KeyPair;
}
export const CreateKeysAndCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    certificatePem: S.optional(S.String),
    keyPair: S.optional(KeyPair),
  }),
).annotate({
  identifier: "CreateKeysAndCertificateResponse",
}) as any as S.Schema<CreateKeysAndCertificateResponse>;
export type MitigationActionName = string;
export type DeviceCertificateUpdateAction = "DEACTIVATE" | (string & {});
export const DeviceCertificateUpdateAction = S.String;

export interface UpdateDeviceCertificateParams {
  action: DeviceCertificateUpdateAction;
}
export const UpdateDeviceCertificateParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: DeviceCertificateUpdateAction }),
).annotate({
  identifier: "UpdateDeviceCertificateParams",
}) as any as S.Schema<UpdateDeviceCertificateParams>;
export type CACertificateUpdateAction = "DEACTIVATE" | (string & {});
export const CACertificateUpdateAction = S.String;

export interface UpdateCACertificateParams {
  action: CACertificateUpdateAction;
}
export const UpdateCACertificateParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: CACertificateUpdateAction }),
).annotate({
  identifier: "UpdateCACertificateParams",
}) as any as S.Schema<UpdateCACertificateParams>;
export type ThingGroupNames = string[];
export const ThingGroupNames = /*@__PURE__*/ S.Array(S.String);
export interface AddThingsToThingGroupParams {
  thingGroupNames: string[];
  overrideDynamicGroups?: boolean;
}
export const AddThingsToThingGroupParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupNames: ThingGroupNames,
    overrideDynamicGroups: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AddThingsToThingGroupParams",
}) as any as S.Schema<AddThingsToThingGroupParams>;
export type PolicyTemplateName = "BLANK_POLICY" | (string & {});
export const PolicyTemplateName = S.String;

export interface ReplaceDefaultPolicyVersionParams {
  templateName: PolicyTemplateName;
}
export const ReplaceDefaultPolicyVersionParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: PolicyTemplateName }),
).annotate({
  identifier: "ReplaceDefaultPolicyVersionParams",
}) as any as S.Schema<ReplaceDefaultPolicyVersionParams>;
export type LogLevel =
  | "DEBUG"
  | "INFO"
  | "ERROR"
  | "WARN"
  | "DISABLED"
  | (string & {});
export const LogLevel = S.String;

export interface EnableIoTLoggingParams {
  roleArnForLogging: string;
  logLevel: LogLevel;
}
export const EnableIoTLoggingParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArnForLogging: S.String, logLevel: LogLevel }),
).annotate({
  identifier: "EnableIoTLoggingParams",
}) as any as S.Schema<EnableIoTLoggingParams>;
export type SnsTopicArn = string;
export interface PublishFindingToSnsParams {
  topicArn: string;
}
export const PublishFindingToSnsParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicArn: S.String }),
).annotate({
  identifier: "PublishFindingToSnsParams",
}) as any as S.Schema<PublishFindingToSnsParams>;
export interface MitigationActionParams {
  updateDeviceCertificateParams?: UpdateDeviceCertificateParams;
  updateCACertificateParams?: UpdateCACertificateParams;
  addThingsToThingGroupParams?: AddThingsToThingGroupParams;
  replaceDefaultPolicyVersionParams?: ReplaceDefaultPolicyVersionParams;
  enableIoTLoggingParams?: EnableIoTLoggingParams;
  publishFindingToSnsParams?: PublishFindingToSnsParams;
}
export const MitigationActionParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateDeviceCertificateParams: S.optional(UpdateDeviceCertificateParams),
    updateCACertificateParams: S.optional(UpdateCACertificateParams),
    addThingsToThingGroupParams: S.optional(AddThingsToThingGroupParams),
    replaceDefaultPolicyVersionParams: S.optional(
      ReplaceDefaultPolicyVersionParams,
    ),
    enableIoTLoggingParams: S.optional(EnableIoTLoggingParams),
    publishFindingToSnsParams: S.optional(PublishFindingToSnsParams),
  }),
).annotate({
  identifier: "MitigationActionParams",
}) as any as S.Schema<MitigationActionParams>;
export interface CreateMitigationActionRequest {
  actionName: string;
  roleArn: string;
  actionParams: MitigationActionParams;
  tags?: Tag[];
}
export const CreateMitigationActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.String.pipe(T.HttpLabel("actionName")),
    roleArn: S.String,
    actionParams: MitigationActionParams,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/mitigationactions/actions/{actionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMitigationActionRequest",
}) as any as S.Schema<CreateMitigationActionRequest>;
export type MitigationActionArn = string;
export type MitigationActionId = string;
export interface CreateMitigationActionResponse {
  actionArn?: string;
  actionId?: string;
}
export const CreateMitigationActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionArn: S.optional(S.String), actionId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMitigationActionResponse",
}) as any as S.Schema<CreateMitigationActionResponse>;
export type OTAUpdateId = string;
export type OTAUpdateDescription = string;
export type Target = string;
export type Targets = string[];
export const Targets = /*@__PURE__*/ S.Array(S.String);
export type Protocol = "MQTT" | "HTTP" | (string & {});
export const Protocol = S.String;

export type Protocols = Protocol[];
export const Protocols = /*@__PURE__*/ S.Array(Protocol);
export type MaximumPerMinute = number;
export type AwsJobRolloutRatePerMinute = number;
export type AwsJobRolloutIncrementFactor = number;
export type AwsJobRateIncreaseCriteriaNumberOfThings = number;
export interface AwsJobRateIncreaseCriteria {
  numberOfNotifiedThings?: number;
  numberOfSucceededThings?: number;
}
export const AwsJobRateIncreaseCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    numberOfNotifiedThings: S.optional(S.Number),
    numberOfSucceededThings: S.optional(S.Number),
  }),
).annotate({
  identifier: "AwsJobRateIncreaseCriteria",
}) as any as S.Schema<AwsJobRateIncreaseCriteria>;
export interface AwsJobExponentialRolloutRate {
  baseRatePerMinute: number;
  incrementFactor: number;
  rateIncreaseCriteria: AwsJobRateIncreaseCriteria;
}
export const AwsJobExponentialRolloutRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baseRatePerMinute: S.Number,
    incrementFactor: S.Number,
    rateIncreaseCriteria: AwsJobRateIncreaseCriteria,
  }),
).annotate({
  identifier: "AwsJobExponentialRolloutRate",
}) as any as S.Schema<AwsJobExponentialRolloutRate>;
export interface AwsJobExecutionsRolloutConfig {
  maximumPerMinute?: number;
  exponentialRate?: AwsJobExponentialRolloutRate;
}
export const AwsJobExecutionsRolloutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maximumPerMinute: S.optional(S.Number),
    exponentialRate: S.optional(AwsJobExponentialRolloutRate),
  }),
).annotate({
  identifier: "AwsJobExecutionsRolloutConfig",
}) as any as S.Schema<AwsJobExecutionsRolloutConfig>;
export type ExpiresInSeconds = number;
export interface AwsJobPresignedUrlConfig {
  expiresInSec?: number;
}
export const AwsJobPresignedUrlConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ expiresInSec: S.optional(S.Number) }),
).annotate({
  identifier: "AwsJobPresignedUrlConfig",
}) as any as S.Schema<AwsJobPresignedUrlConfig>;
export type AwsJobAbortCriteriaFailureType =
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | "ALL"
  | (string & {});
export const AwsJobAbortCriteriaFailureType = S.String;

export type AwsJobAbortCriteriaAbortAction = "CANCEL" | (string & {});
export const AwsJobAbortCriteriaAbortAction = S.String;

export type AwsJobAbortCriteriaAbortThresholdPercentage = number;
export type AwsJobAbortCriteriaMinimumNumberOfExecutedThings = number;
export interface AwsJobAbortCriteria {
  failureType: AwsJobAbortCriteriaFailureType;
  action: AwsJobAbortCriteriaAbortAction;
  thresholdPercentage: number;
  minNumberOfExecutedThings: number;
}
export const AwsJobAbortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failureType: AwsJobAbortCriteriaFailureType,
    action: AwsJobAbortCriteriaAbortAction,
    thresholdPercentage: S.Number,
    minNumberOfExecutedThings: S.Number,
  }),
).annotate({
  identifier: "AwsJobAbortCriteria",
}) as any as S.Schema<AwsJobAbortCriteria>;
export type AwsJobAbortCriteriaList = AwsJobAbortCriteria[];
export const AwsJobAbortCriteriaList =
  /*@__PURE__*/ S.Array(AwsJobAbortCriteria);
export interface AwsJobAbortConfig {
  abortCriteriaList: AwsJobAbortCriteria[];
}
export const AwsJobAbortConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ abortCriteriaList: AwsJobAbortCriteriaList }),
).annotate({
  identifier: "AwsJobAbortConfig",
}) as any as S.Schema<AwsJobAbortConfig>;
export type AwsJobTimeoutInProgressTimeoutInMinutes = number;
export interface AwsJobTimeoutConfig {
  inProgressTimeoutInMinutes?: number;
}
export const AwsJobTimeoutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inProgressTimeoutInMinutes: S.optional(S.Number) }),
).annotate({
  identifier: "AwsJobTimeoutConfig",
}) as any as S.Schema<AwsJobTimeoutConfig>;
export type FileName = string;
export type FileType = number;
export type OTAUpdateFileVersion = string;
export type StreamId = string;
export type FileId = number;
export interface Stream {
  streamId?: string;
  fileId?: number;
}
export const Stream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamId: S.optional(S.String), fileId: S.optional(S.Number) }),
).annotate({ identifier: "Stream" }) as any as S.Schema<Stream>;
export interface FileLocation {
  stream?: Stream;
  s3Location?: S3Location;
}
export const FileLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stream: S.optional(Stream), s3Location: S.optional(S3Location) }),
).annotate({ identifier: "FileLocation" }) as any as S.Schema<FileLocation>;
export type SigningJobId = string;
export type Platform = string;
export type CertificatePathOnDevice = string;
export interface SigningProfileParameter {
  certificateArn?: string;
  platform?: string;
  certificatePathOnDevice?: string;
}
export const SigningProfileParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    platform: S.optional(S.String),
    certificatePathOnDevice: S.optional(S.String),
  }),
).annotate({
  identifier: "SigningProfileParameter",
}) as any as S.Schema<SigningProfileParameter>;
export type SigningProfileName = string;
export type Prefix = string;
export interface S3Destination {
  bucket?: string;
  prefix?: string;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.optional(S.String), prefix: S.optional(S.String) }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface Destination {
  s3Destination?: S3Destination;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Destination: S.optional(S3Destination) }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface StartSigningJobParameter {
  signingProfileParameter?: SigningProfileParameter;
  signingProfileName?: string;
  destination?: Destination;
}
export const StartSigningJobParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signingProfileParameter: S.optional(SigningProfileParameter),
    signingProfileName: S.optional(S.String),
    destination: S.optional(Destination),
  }),
).annotate({
  identifier: "StartSigningJobParameter",
}) as any as S.Schema<StartSigningJobParameter>;
export type Signature = Uint8Array;
export interface CodeSigningSignature {
  inlineDocument?: Uint8Array;
}
export const CodeSigningSignature = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inlineDocument: S.optional(T.Blob) }),
).annotate({
  identifier: "CodeSigningSignature",
}) as any as S.Schema<CodeSigningSignature>;
export type CertificateName = string;
export type InlineDocument = string;
export interface CodeSigningCertificateChain {
  certificateName?: string;
  inlineDocument?: string;
}
export const CodeSigningCertificateChain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateName: S.optional(S.String),
    inlineDocument: S.optional(S.String),
  }),
).annotate({
  identifier: "CodeSigningCertificateChain",
}) as any as S.Schema<CodeSigningCertificateChain>;
export type HashAlgorithm = string;
export type SignatureAlgorithm = string;
export interface CustomCodeSigning {
  signature?: CodeSigningSignature;
  certificateChain?: CodeSigningCertificateChain;
  hashAlgorithm?: string;
  signatureAlgorithm?: string;
}
export const CustomCodeSigning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signature: S.optional(CodeSigningSignature),
    certificateChain: S.optional(CodeSigningCertificateChain),
    hashAlgorithm: S.optional(S.String),
    signatureAlgorithm: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomCodeSigning",
}) as any as S.Schema<CustomCodeSigning>;
export interface CodeSigning {
  awsSignerJobId?: string;
  startSigningJobParameter?: StartSigningJobParameter;
  customCodeSigning?: CustomCodeSigning;
}
export const CodeSigning = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    awsSignerJobId: S.optional(S.String),
    startSigningJobParameter: S.optional(StartSigningJobParameter),
    customCodeSigning: S.optional(CustomCodeSigning),
  }),
).annotate({ identifier: "CodeSigning" }) as any as S.Schema<CodeSigning>;
export type AttributeKey = string;
export type Value = string;
export type AttributesMap = { [key: string]: string | undefined };
export const AttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface OTAUpdateFile {
  fileName?: string;
  fileType?: number;
  fileVersion?: string;
  fileLocation?: FileLocation;
  codeSigning?: CodeSigning;
  attributes?: { [key: string]: string | undefined };
}
export const OTAUpdateFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileName: S.optional(S.String),
    fileType: S.optional(S.Number),
    fileVersion: S.optional(S.String),
    fileLocation: S.optional(FileLocation),
    codeSigning: S.optional(CodeSigning),
    attributes: S.optional(AttributesMap),
  }),
).annotate({ identifier: "OTAUpdateFile" }) as any as S.Schema<OTAUpdateFile>;
export type OTAUpdateFiles = OTAUpdateFile[];
export const OTAUpdateFiles = /*@__PURE__*/ S.Array(OTAUpdateFile);
export type AdditionalParameterMap = { [key: string]: string | undefined };
export const AdditionalParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateOTAUpdateRequest {
  otaUpdateId: string;
  description?: string;
  targets: string[];
  protocols?: Protocol[];
  targetSelection?: TargetSelection;
  awsJobExecutionsRolloutConfig?: AwsJobExecutionsRolloutConfig;
  awsJobPresignedUrlConfig?: AwsJobPresignedUrlConfig;
  awsJobAbortConfig?: AwsJobAbortConfig;
  awsJobTimeoutConfig?: AwsJobTimeoutConfig;
  files: OTAUpdateFile[];
  roleArn: string;
  additionalParameters?: { [key: string]: string | undefined };
  tags?: Tag[];
}
export const CreateOTAUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    otaUpdateId: S.String.pipe(T.HttpLabel("otaUpdateId")),
    description: S.optional(S.String),
    targets: Targets,
    protocols: S.optional(Protocols),
    targetSelection: S.optional(TargetSelection),
    awsJobExecutionsRolloutConfig: S.optional(AwsJobExecutionsRolloutConfig),
    awsJobPresignedUrlConfig: S.optional(AwsJobPresignedUrlConfig),
    awsJobAbortConfig: S.optional(AwsJobAbortConfig),
    awsJobTimeoutConfig: S.optional(AwsJobTimeoutConfig),
    files: OTAUpdateFiles,
    roleArn: S.String,
    additionalParameters: S.optional(AdditionalParameterMap),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/otaUpdates/{otaUpdateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOTAUpdateRequest",
}) as any as S.Schema<CreateOTAUpdateRequest>;
export type AwsIotJobId = string;
export type OTAUpdateArn = string;
export type AwsIotJobArn = string;
export type OTAUpdateStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export const OTAUpdateStatus = S.String;

export interface CreateOTAUpdateResponse {
  otaUpdateId?: string;
  awsIotJobId?: string;
  otaUpdateArn?: string;
  awsIotJobArn?: string;
  otaUpdateStatus?: OTAUpdateStatus;
}
export const CreateOTAUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    otaUpdateId: S.optional(S.String),
    awsIotJobId: S.optional(S.String),
    otaUpdateArn: S.optional(S.String),
    awsIotJobArn: S.optional(S.String),
    otaUpdateStatus: S.optional(OTAUpdateStatus),
  }),
).annotate({
  identifier: "CreateOTAUpdateResponse",
}) as any as S.Schema<CreateOTAUpdateResponse>;
export type ResourceDescription = string | redacted.Redacted<string>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreatePackageRequest {
  packageName: string;
  description?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    description: S.optional(SensitiveString),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/packages/{packageName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePackageRequest",
}) as any as S.Schema<CreatePackageRequest>;
export type PackageArn = string;
export interface CreatePackageResponse {
  packageName?: string;
  packageArn?: string;
  description?: string | redacted.Redacted<string>;
}
export const CreatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.optional(S.String),
    packageArn: S.optional(S.String),
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CreatePackageResponse",
}) as any as S.Schema<CreatePackageResponse>;
export type ResourceAttributeKey = string;
export type ResourceAttributeValue = string;
export type ResourceAttributes = { [key: string]: string | undefined };
export const ResourceAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PackageVersionArtifact {
  s3Location?: S3Location;
}
export const PackageVersionArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Location: S.optional(S3Location) }),
).annotate({
  identifier: "PackageVersionArtifact",
}) as any as S.Schema<PackageVersionArtifact>;
export type PackageVersionRecipe = string | redacted.Redacted<string>;
export interface CreatePackageVersionRequest {
  packageName: string;
  versionName: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  artifact?: PackageVersionArtifact;
  recipe?: string | redacted.Redacted<string>;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreatePackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    description: S.optional(SensitiveString),
    attributes: S.optional(ResourceAttributes),
    artifact: S.optional(PackageVersionArtifact),
    recipe: S.optional(SensitiveString),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/packages/{packageName}/versions/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePackageVersionRequest",
}) as any as S.Schema<CreatePackageVersionRequest>;
export type PackageVersionStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "DEPRECATED"
  | (string & {});
export const PackageVersionStatus = S.String;

export type PackageVersionErrorReason = string;
export interface CreatePackageVersionResponse {
  packageVersionArn?: string;
  packageName?: string;
  versionName?: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  status?: PackageVersionStatus;
  errorReason?: string;
}
export const CreatePackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageVersionArn: S.optional(S.String),
    packageName: S.optional(S.String),
    versionName: S.optional(S.String),
    description: S.optional(SensitiveString),
    attributes: S.optional(ResourceAttributes),
    status: S.optional(PackageVersionStatus),
    errorReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePackageVersionResponse",
}) as any as S.Schema<CreatePackageVersionResponse>;
export type PolicyDocument = string;
export interface CreatePolicyRequest {
  policyName: string;
  policyDocument: string;
  tags?: Tag[];
}
export const CreatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    policyDocument: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePolicyRequest",
}) as any as S.Schema<CreatePolicyRequest>;
export type PolicyArn = string;
export interface CreatePolicyResponse {
  policyName?: string;
  policyArn?: string;
  policyDocument?: string;
  policyVersionId?: string;
}
export const CreatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
    policyDocument: S.optional(S.String),
    policyVersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePolicyResponse",
}) as any as S.Schema<CreatePolicyResponse>;
export type SetAsDefault = boolean;
export interface CreatePolicyVersionRequest {
  policyName: string;
  policyDocument: string;
  setAsDefault?: boolean;
}
export const CreatePolicyVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    policyDocument: S.String,
    setAsDefault: S.optional(S.Boolean).pipe(T.HttpQuery("setAsDefault")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policies/{policyName}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePolicyVersionRequest",
}) as any as S.Schema<CreatePolicyVersionRequest>;
export type IsDefaultVersion = boolean;
export interface CreatePolicyVersionResponse {
  policyArn?: string;
  policyDocument?: string;
  policyVersionId?: string;
  isDefaultVersion?: boolean;
}
export const CreatePolicyVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.optional(S.String),
    policyDocument: S.optional(S.String),
    policyVersionId: S.optional(S.String),
    isDefaultVersion: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreatePolicyVersionResponse",
}) as any as S.Schema<CreatePolicyVersionResponse>;
export type TemplateName = string;
export interface CreateProvisioningClaimRequest {
  templateName: string;
}
export const CreateProvisioningClaimRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String.pipe(T.HttpLabel("templateName")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/provisioning-templates/{templateName}/provisioning-claim",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProvisioningClaimRequest",
}) as any as S.Schema<CreateProvisioningClaimRequest>;
export interface CreateProvisioningClaimResponse {
  certificateId?: string;
  certificatePem?: string;
  keyPair?: KeyPair;
  expiration?: Date;
}
export const CreateProvisioningClaimResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.optional(S.String),
    certificatePem: S.optional(S.String),
    keyPair: S.optional(KeyPair),
    expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateProvisioningClaimResponse",
}) as any as S.Schema<CreateProvisioningClaimResponse>;
export type TemplateDescription = string;
export type TemplateBody = string;
export type Enabled2 = boolean;
export type PayloadVersion = string;
export interface ProvisioningHook {
  payloadVersion?: string;
  targetArn: string;
}
export const ProvisioningHook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ payloadVersion: S.optional(S.String), targetArn: S.String }),
).annotate({
  identifier: "ProvisioningHook",
}) as any as S.Schema<ProvisioningHook>;
export type TemplateType = "FLEET_PROVISIONING" | "JITP" | (string & {});
export const TemplateType = S.String;

export interface CreateProvisioningTemplateRequest {
  templateName: string;
  description?: string;
  templateBody: string;
  enabled?: boolean;
  provisioningRoleArn: string;
  preProvisioningHook?: ProvisioningHook;
  tags?: Tag[];
  type?: TemplateType;
}
export const CreateProvisioningTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    description: S.optional(S.String),
    templateBody: S.String,
    enabled: S.optional(S.Boolean),
    provisioningRoleArn: S.String,
    preProvisioningHook: S.optional(ProvisioningHook),
    tags: S.optional(TagList),
    type: S.optional(TemplateType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/provisioning-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProvisioningTemplateRequest",
}) as any as S.Schema<CreateProvisioningTemplateRequest>;
export type TemplateArn = string;
export type TemplateVersionId = number;
export interface CreateProvisioningTemplateResponse {
  templateArn?: string;
  templateName?: string;
  defaultVersionId?: number;
}
export const CreateProvisioningTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateArn: S.optional(S.String),
    templateName: S.optional(S.String),
    defaultVersionId: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateProvisioningTemplateResponse",
}) as any as S.Schema<CreateProvisioningTemplateResponse>;
export interface CreateProvisioningTemplateVersionRequest {
  templateName: string;
  templateBody: string;
  setAsDefault?: boolean;
}
export const CreateProvisioningTemplateVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      templateName: S.String.pipe(T.HttpLabel("templateName")),
      templateBody: S.String,
      setAsDefault: S.optional(S.Boolean).pipe(T.HttpQuery("setAsDefault")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/provisioning-templates/{templateName}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateProvisioningTemplateVersionRequest",
}) as any as S.Schema<CreateProvisioningTemplateVersionRequest>;
export interface CreateProvisioningTemplateVersionResponse {
  templateArn?: string;
  templateName?: string;
  versionId?: number;
  isDefaultVersion?: boolean;
}
export const CreateProvisioningTemplateVersionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      templateArn: S.optional(S.String),
      templateName: S.optional(S.String),
      versionId: S.optional(S.Number),
      isDefaultVersion: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "CreateProvisioningTemplateVersionResponse",
  }) as any as S.Schema<CreateProvisioningTemplateVersionResponse>;
export type RoleAlias = string;
export type CredentialDurationSeconds = number;
export interface CreateRoleAliasRequest {
  roleAlias: string;
  roleArn: string;
  credentialDurationSeconds?: number;
  tags?: Tag[];
}
export const CreateRoleAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleAlias: S.String.pipe(T.HttpLabel("roleAlias")),
    roleArn: S.String,
    credentialDurationSeconds: S.optional(S.Number),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/role-aliases/{roleAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRoleAliasRequest",
}) as any as S.Schema<CreateRoleAliasRequest>;
export interface CreateRoleAliasResponse {
  roleAlias?: string;
  roleAliasArn?: string;
}
export const CreateRoleAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleAlias: S.optional(S.String),
    roleAliasArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateRoleAliasResponse",
}) as any as S.Schema<CreateRoleAliasResponse>;
export type AuditFrequency =
  | "DAILY"
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | (string & {});
export const AuditFrequency = S.String;

export type DayOfMonth = string;
export type DayOfWeek =
  | "SUN"
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | (string & {});
export const DayOfWeek = S.String;

export type TargetAuditCheckNames = string[];
export const TargetAuditCheckNames = /*@__PURE__*/ S.Array(S.String);
export type ScheduledAuditName = string;
export interface CreateScheduledAuditRequest {
  frequency: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
  targetCheckNames: string[];
  scheduledAuditName: string;
  tags?: Tag[];
}
export const CreateScheduledAuditRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    frequency: AuditFrequency,
    dayOfMonth: S.optional(S.String),
    dayOfWeek: S.optional(DayOfWeek),
    targetCheckNames: TargetAuditCheckNames,
    scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/audit/scheduledaudits/{scheduledAuditName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateScheduledAuditRequest",
}) as any as S.Schema<CreateScheduledAuditRequest>;
export type ScheduledAuditArn = string;
export interface CreateScheduledAuditResponse {
  scheduledAuditArn?: string;
}
export const CreateScheduledAuditResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledAuditArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateScheduledAuditResponse",
}) as any as S.Schema<CreateScheduledAuditResponse>;
export type SecurityProfileDescription = string;
export type BehaviorName = string;
export type BehaviorMetric = string;
export type DimensionValueOperator = "IN" | "NOT_IN" | (string & {});
export const DimensionValueOperator = S.String;

export interface MetricDimension {
  dimensionName: string;
  operator?: DimensionValueOperator;
}
export const MetricDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensionName: S.String,
    operator: S.optional(DimensionValueOperator),
  }),
).annotate({
  identifier: "MetricDimension",
}) as any as S.Schema<MetricDimension>;
export type ComparisonOperator =
  | "less-than"
  | "less-than-equals"
  | "greater-than"
  | "greater-than-equals"
  | "in-cidr-set"
  | "not-in-cidr-set"
  | "in-port-set"
  | "not-in-port-set"
  | "in-set"
  | "not-in-set"
  | (string & {});
export const ComparisonOperator = S.String;

export type UnsignedLong = number;
export type Cidr = string;
export type Cidrs = string[];
export const Cidrs = /*@__PURE__*/ S.Array(S.String);
export type Port = number;
export type Ports = number[];
export const Ports = /*@__PURE__*/ S.Array(S.Number);
export type NumberList = number[];
export const NumberList = /*@__PURE__*/ S.Array(S.Number);
export type StringValue = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface MetricValue {
  count?: number;
  cidrs?: string[];
  ports?: number[];
  number?: number;
  numbers?: number[];
  strings?: string[];
}
export const MetricValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    cidrs: S.optional(Cidrs),
    ports: S.optional(Ports),
    number: S.optional(S.Number),
    numbers: S.optional(NumberList),
    strings: S.optional(StringList),
  }),
).annotate({ identifier: "MetricValue" }) as any as S.Schema<MetricValue>;
export type DurationSeconds = number;
export type ConsecutiveDatapointsToAlarm = number;
export type ConsecutiveDatapointsToClear = number;
export type EvaluationStatistic = string;
export interface StatisticalThreshold {
  statistic?: string;
}
export const StatisticalThreshold = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statistic: S.optional(S.String) }),
).annotate({
  identifier: "StatisticalThreshold",
}) as any as S.Schema<StatisticalThreshold>;
export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const ConfidenceLevel = S.String;

export interface MachineLearningDetectionConfig {
  confidenceLevel: ConfidenceLevel;
}
export const MachineLearningDetectionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ confidenceLevel: ConfidenceLevel }),
).annotate({
  identifier: "MachineLearningDetectionConfig",
}) as any as S.Schema<MachineLearningDetectionConfig>;
export interface BehaviorCriteria {
  comparisonOperator?: ComparisonOperator;
  value?: MetricValue;
  durationSeconds?: number;
  consecutiveDatapointsToAlarm?: number;
  consecutiveDatapointsToClear?: number;
  statisticalThreshold?: StatisticalThreshold;
  mlDetectionConfig?: MachineLearningDetectionConfig;
}
export const BehaviorCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparisonOperator: S.optional(ComparisonOperator),
    value: S.optional(MetricValue),
    durationSeconds: S.optional(S.Number),
    consecutiveDatapointsToAlarm: S.optional(S.Number),
    consecutiveDatapointsToClear: S.optional(S.Number),
    statisticalThreshold: S.optional(StatisticalThreshold),
    mlDetectionConfig: S.optional(MachineLearningDetectionConfig),
  }),
).annotate({
  identifier: "BehaviorCriteria",
}) as any as S.Schema<BehaviorCriteria>;
export type SuppressAlerts = boolean;
export type ExportMetric = boolean;
export interface Behavior {
  name: string;
  metric?: string;
  metricDimension?: MetricDimension;
  criteria?: BehaviorCriteria;
  suppressAlerts?: boolean;
  exportMetric?: boolean;
}
export const Behavior = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    metric: S.optional(S.String),
    metricDimension: S.optional(MetricDimension),
    criteria: S.optional(BehaviorCriteria),
    suppressAlerts: S.optional(S.Boolean),
    exportMetric: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Behavior" }) as any as S.Schema<Behavior>;
export type Behaviors = Behavior[];
export const Behaviors = /*@__PURE__*/ S.Array(Behavior);
export type AlertTargetType = "SNS" | (string & {});
export const AlertTargetType = S.String;

export type AlertTargetArn = string;
export interface AlertTarget {
  alertTargetArn: string;
  roleArn: string;
}
export const AlertTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ alertTargetArn: S.String, roleArn: S.String }),
).annotate({ identifier: "AlertTarget" }) as any as S.Schema<AlertTarget>;
export type AlertTargets = { [key in AlertTargetType]?: AlertTarget };
export const AlertTargets = /*@__PURE__*/ S.Record(
  AlertTargetType,
  AlertTarget.pipe(S.optional),
);
export type AdditionalMetricsToRetainList = string[];
export const AdditionalMetricsToRetainList = /*@__PURE__*/ S.Array(S.String);
export interface MetricToRetain {
  metric: string;
  metricDimension?: MetricDimension;
  exportMetric?: boolean;
}
export const MetricToRetain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metric: S.String,
    metricDimension: S.optional(MetricDimension),
    exportMetric: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MetricToRetain" }) as any as S.Schema<MetricToRetain>;
export type AdditionalMetricsToRetainV2List = MetricToRetain[];
export const AdditionalMetricsToRetainV2List =
  /*@__PURE__*/ S.Array(MetricToRetain);
export type MqttTopic = string;
export interface MetricsExportConfig {
  mqttTopic: string;
  roleArn: string;
}
export const MetricsExportConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mqttTopic: S.String, roleArn: S.String }),
).annotate({
  identifier: "MetricsExportConfig",
}) as any as S.Schema<MetricsExportConfig>;
export interface CreateSecurityProfileRequest {
  securityProfileName: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  tags?: Tag[];
  metricsExportConfig?: MetricsExportConfig;
}
export const CreateSecurityProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
    securityProfileDescription: S.optional(S.String),
    behaviors: S.optional(Behaviors),
    alertTargets: S.optional(AlertTargets),
    additionalMetricsToRetain: S.optional(AdditionalMetricsToRetainList),
    additionalMetricsToRetainV2: S.optional(AdditionalMetricsToRetainV2List),
    tags: S.optional(TagList),
    metricsExportConfig: S.optional(MetricsExportConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/security-profiles/{securityProfileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSecurityProfileRequest",
}) as any as S.Schema<CreateSecurityProfileRequest>;
export type SecurityProfileArn = string;
export interface CreateSecurityProfileResponse {
  securityProfileName?: string;
  securityProfileArn?: string;
}
export const CreateSecurityProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.optional(S.String),
    securityProfileArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateSecurityProfileResponse",
}) as any as S.Schema<CreateSecurityProfileResponse>;
export type StreamDescription = string;
export interface StreamFile {
  fileId?: number;
  s3Location?: S3Location;
}
export const StreamFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileId: S.optional(S.Number),
    s3Location: S.optional(S3Location),
  }),
).annotate({ identifier: "StreamFile" }) as any as S.Schema<StreamFile>;
export type StreamFiles = StreamFile[];
export const StreamFiles = /*@__PURE__*/ S.Array(StreamFile);
export interface CreateStreamRequest {
  streamId: string;
  description?: string;
  files: StreamFile[];
  roleArn: string;
  tags?: Tag[];
}
export const CreateStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamId: S.String.pipe(T.HttpLabel("streamId")),
    description: S.optional(S.String),
    files: StreamFiles,
    roleArn: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/streams/{streamId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStreamRequest",
}) as any as S.Schema<CreateStreamRequest>;
export type StreamArn = string;
export type StreamVersion = number;
export interface CreateStreamResponse {
  streamId?: string;
  streamArn?: string;
  description?: string;
  streamVersion?: number;
}
export const CreateStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamId: S.optional(S.String),
    streamArn: S.optional(S.String),
    description: S.optional(S.String),
    streamVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateStreamResponse",
}) as any as S.Schema<CreateStreamResponse>;
export type ThingTypeName = string;
export interface CreateThingRequest {
  thingName: string;
  thingTypeName?: string;
  attributePayload?: AttributePayload;
  billingGroupName?: string;
}
export const CreateThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    thingTypeName: S.optional(S.String),
    attributePayload: S.optional(AttributePayload),
    billingGroupName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/things/{thingName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateThingRequest",
}) as any as S.Schema<CreateThingRequest>;
export type ThingId = string;
export interface CreateThingResponse {
  thingName?: string;
  thingArn?: string;
  thingId?: string;
}
export const CreateThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(S.String),
    thingArn: S.optional(S.String),
    thingId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateThingResponse",
}) as any as S.Schema<CreateThingResponse>;
export interface CreateThingGroupRequest {
  thingGroupName: string;
  parentGroupName?: string;
  thingGroupProperties?: ThingGroupProperties;
  tags?: Tag[];
}
export const CreateThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    parentGroupName: S.optional(S.String),
    thingGroupProperties: S.optional(ThingGroupProperties),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/thing-groups/{thingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateThingGroupRequest",
}) as any as S.Schema<CreateThingGroupRequest>;
export interface CreateThingGroupResponse {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingGroupId?: string;
}
export const CreateThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.optional(S.String),
    thingGroupArn: S.optional(S.String),
    thingGroupId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateThingGroupResponse",
}) as any as S.Schema<CreateThingGroupResponse>;
export type ThingTypeDescription = string;
export type SearchableAttributes = string[];
export const SearchableAttributes = /*@__PURE__*/ S.Array(S.String);
export type UserPropertyKeyName = string;
export type ConnectionAttributeName = string;
export interface PropagatingAttribute {
  userPropertyKey?: string;
  thingAttribute?: string;
  connectionAttribute?: string;
}
export const PropagatingAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPropertyKey: S.optional(S.String),
    thingAttribute: S.optional(S.String),
    connectionAttribute: S.optional(S.String),
  }),
).annotate({
  identifier: "PropagatingAttribute",
}) as any as S.Schema<PropagatingAttribute>;
export type PropagatingAttributeList = PropagatingAttribute[];
export const PropagatingAttributeList =
  /*@__PURE__*/ S.Array(PropagatingAttribute);
export interface Mqtt5Configuration {
  propagatingAttributes?: PropagatingAttribute[];
}
export const Mqtt5Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ propagatingAttributes: S.optional(PropagatingAttributeList) }),
).annotate({
  identifier: "Mqtt5Configuration",
}) as any as S.Schema<Mqtt5Configuration>;
export interface ThingTypeProperties {
  thingTypeDescription?: string;
  searchableAttributes?: string[];
  mqtt5Configuration?: Mqtt5Configuration;
}
export const ThingTypeProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeDescription: S.optional(S.String),
    searchableAttributes: S.optional(SearchableAttributes),
    mqtt5Configuration: S.optional(Mqtt5Configuration),
  }),
).annotate({
  identifier: "ThingTypeProperties",
}) as any as S.Schema<ThingTypeProperties>;
export interface CreateThingTypeRequest {
  thingTypeName: string;
  thingTypeProperties?: ThingTypeProperties;
  tags?: Tag[];
}
export const CreateThingTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")),
    thingTypeProperties: S.optional(ThingTypeProperties),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/thing-types/{thingTypeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateThingTypeRequest",
}) as any as S.Schema<CreateThingTypeRequest>;
export type ThingTypeArn = string;
export type ThingTypeId = string;
export interface CreateThingTypeResponse {
  thingTypeName?: string;
  thingTypeArn?: string;
  thingTypeId?: string;
}
export const CreateThingTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeName: S.optional(S.String),
    thingTypeArn: S.optional(S.String),
    thingTypeId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateThingTypeResponse",
}) as any as S.Schema<CreateThingTypeResponse>;
export type RuleName = string;
export type SQL = string;
export type Description = string;
export type TableName = string;
export type AwsArn = string;
export type DynamoOperation = string;
export type HashKeyField = string;
export type HashKeyValue = string;
export type DynamoKeyType = "STRING" | "NUMBER" | (string & {});
export const DynamoKeyType = S.String;

export type RangeKeyField = string;
export type RangeKeyValue = string;
export type PayloadField = string;
export interface DynamoDBAction {
  tableName: string;
  roleArn: string;
  operation?: string;
  hashKeyField: string;
  hashKeyValue: string;
  hashKeyType?: DynamoKeyType;
  rangeKeyField?: string;
  rangeKeyValue?: string;
  rangeKeyType?: DynamoKeyType;
  payloadField?: string;
}
export const DynamoDBAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tableName: S.String,
    roleArn: S.String,
    operation: S.optional(S.String),
    hashKeyField: S.String,
    hashKeyValue: S.String,
    hashKeyType: S.optional(DynamoKeyType),
    rangeKeyField: S.optional(S.String),
    rangeKeyValue: S.optional(S.String),
    rangeKeyType: S.optional(DynamoKeyType),
    payloadField: S.optional(S.String),
  }),
).annotate({ identifier: "DynamoDBAction" }) as any as S.Schema<DynamoDBAction>;
export interface PutItemInput {
  tableName: string;
}
export const PutItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tableName: S.String }),
).annotate({ identifier: "PutItemInput" }) as any as S.Schema<PutItemInput>;
export interface DynamoDBv2Action {
  roleArn: string;
  putItem: PutItemInput;
}
export const DynamoDBv2Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.String, putItem: PutItemInput }),
).annotate({
  identifier: "DynamoDBv2Action",
}) as any as S.Schema<DynamoDBv2Action>;
export type FunctionArn = string;
export interface LambdaAction {
  functionArn: string;
}
export const LambdaAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionArn: S.String }),
).annotate({ identifier: "LambdaAction" }) as any as S.Schema<LambdaAction>;
export type MessageFormat = "RAW" | "JSON" | (string & {});
export const MessageFormat = S.String;

export interface SnsAction {
  targetArn: string;
  roleArn: string;
  messageFormat?: MessageFormat;
}
export const SnsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.String,
    roleArn: S.String,
    messageFormat: S.optional(MessageFormat),
  }),
).annotate({ identifier: "SnsAction" }) as any as S.Schema<SnsAction>;
export type QueueUrl = string;
export type UseBase64 = boolean;
export interface SqsAction {
  roleArn: string;
  queueUrl: string;
  useBase64?: boolean;
}
export const SqsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    queueUrl: S.String,
    useBase64: S.optional(S.Boolean),
  }),
).annotate({ identifier: "SqsAction" }) as any as S.Schema<SqsAction>;
export type StreamName = string;
export type PartitionKey = string;
export interface KinesisAction {
  roleArn: string;
  streamName: string;
  partitionKey?: string;
}
export const KinesisAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    streamName: S.String,
    partitionKey: S.optional(S.String),
  }),
).annotate({ identifier: "KinesisAction" }) as any as S.Schema<KinesisAction>;
export type TopicPattern = string;
export type Qos = number;
export type PayloadFormatIndicator = string;
export type ContentType = string;
export type ResponseTopic = string;
export type CorrelationData = string;
export type MessageExpiry = string;
export type UserPropertyKey = string;
export type UserPropertyValue = string;
export interface UserProperty {
  key: string;
  value: string;
}
export const UserProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "UserProperty" }) as any as S.Schema<UserProperty>;
export type UserProperties = UserProperty[];
export const UserProperties = /*@__PURE__*/ S.Array(UserProperty);
export interface MqttHeaders {
  payloadFormatIndicator?: string;
  contentType?: string;
  responseTopic?: string;
  correlationData?: string;
  messageExpiry?: string;
  userProperties?: UserProperty[];
}
export const MqttHeaders = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    payloadFormatIndicator: S.optional(S.String),
    contentType: S.optional(S.String),
    responseTopic: S.optional(S.String),
    correlationData: S.optional(S.String),
    messageExpiry: S.optional(S.String),
    userProperties: S.optional(UserProperties),
  }),
).annotate({ identifier: "MqttHeaders" }) as any as S.Schema<MqttHeaders>;
export interface RepublishAction {
  roleArn: string;
  topic: string;
  qos?: number;
  headers?: MqttHeaders;
}
export const RepublishAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    topic: S.String,
    qos: S.optional(S.Number),
    headers: S.optional(MqttHeaders),
  }),
).annotate({
  identifier: "RepublishAction",
}) as any as S.Schema<RepublishAction>;
export type BucketName = string;
export type Key = string;
export type CannedAccessControlList =
  | "private"
  | "public-read"
  | "public-read-write"
  | "aws-exec-read"
  | "authenticated-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | "log-delivery-write"
  | (string & {});
export const CannedAccessControlList = S.String;

export interface S3Action {
  roleArn: string;
  bucketName: string;
  key: string;
  cannedAcl?: CannedAccessControlList;
}
export const S3Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    bucketName: S.String,
    key: S.String,
    cannedAcl: S.optional(CannedAccessControlList),
  }),
).annotate({ identifier: "S3Action" }) as any as S.Schema<S3Action>;
export type DeliveryStreamName = string;
export type FirehoseSeparator = string;
export type BatchMode = boolean;
export interface FirehoseAction {
  roleArn: string;
  deliveryStreamName: string;
  separator?: string;
  batchMode?: boolean;
}
export const FirehoseAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    deliveryStreamName: S.String,
    separator: S.optional(S.String),
    batchMode: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FirehoseAction" }) as any as S.Schema<FirehoseAction>;
export interface CloudwatchMetricAction {
  roleArn: string;
  metricNamespace: string;
  metricName: string;
  metricValue: string;
  metricUnit: string;
  metricTimestamp?: string;
}
export const CloudwatchMetricAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    metricNamespace: S.String,
    metricName: S.String,
    metricValue: S.String,
    metricUnit: S.String,
    metricTimestamp: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudwatchMetricAction",
}) as any as S.Schema<CloudwatchMetricAction>;
export type AlarmName = string;
export type StateReason = string;
export type StateValue = string;
export interface CloudwatchAlarmAction {
  roleArn: string;
  alarmName: string;
  stateReason: string;
  stateValue: string;
}
export const CloudwatchAlarmAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    alarmName: S.String,
    stateReason: S.String,
    stateValue: S.String,
  }),
).annotate({
  identifier: "CloudwatchAlarmAction",
}) as any as S.Schema<CloudwatchAlarmAction>;
export type LogGroupName = string;
export interface CloudwatchLogsAction {
  roleArn: string;
  logGroupName: string;
  batchMode?: boolean;
}
export const CloudwatchLogsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    logGroupName: S.String,
    batchMode: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CloudwatchLogsAction",
}) as any as S.Schema<CloudwatchLogsAction>;
export type ElasticsearchEndpoint = string;
export type ElasticsearchIndex = string;
export type ElasticsearchType = string;
export type ElasticsearchId = string;
export interface ElasticsearchAction {
  roleArn: string;
  endpoint: string;
  index: string;
  type: string;
  id: string;
}
export const ElasticsearchAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    endpoint: S.String,
    index: S.String,
    type: S.String,
    id: S.String,
  }),
).annotate({
  identifier: "ElasticsearchAction",
}) as any as S.Schema<ElasticsearchAction>;
export type SalesforceToken = string;
export type SalesforceEndpoint = string;
export interface SalesforceAction {
  token: string;
  url: string;
}
export const SalesforceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ token: S.String, url: S.String }),
).annotate({
  identifier: "SalesforceAction",
}) as any as S.Schema<SalesforceAction>;
export type ChannelName = string;
export interface IotAnalyticsAction {
  channelArn?: string;
  channelName?: string;
  batchMode?: boolean;
  roleArn?: string;
}
export const IotAnalyticsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelArn: S.optional(S.String),
    channelName: S.optional(S.String),
    batchMode: S.optional(S.Boolean),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IotAnalyticsAction",
}) as any as S.Schema<IotAnalyticsAction>;
export type InputName = string;
export type MessageId = string;
export interface IotEventsAction {
  inputName: string;
  messageId?: string;
  batchMode?: boolean;
  roleArn: string;
}
export const IotEventsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputName: S.String,
    messageId: S.optional(S.String),
    batchMode: S.optional(S.Boolean),
    roleArn: S.String,
  }),
).annotate({
  identifier: "IotEventsAction",
}) as any as S.Schema<IotEventsAction>;
export type AssetPropertyEntryId = string;
export type AssetId = string;
export type AssetPropertyId = string;
export type AssetPropertyAlias = string;
export type AssetPropertyStringValue = string;
export type AssetPropertyIntegerValue = string;
export type AssetPropertyDoubleValue = string;
export type AssetPropertyBooleanValue = string;
export type AssetPropertyVariant =
  | {
      stringValue: string;
      integerValue?: never;
      doubleValue?: never;
      booleanValue?: never;
    }
  | {
      stringValue?: never;
      integerValue: string;
      doubleValue?: never;
      booleanValue?: never;
    }
  | {
      stringValue?: never;
      integerValue?: never;
      doubleValue: string;
      booleanValue?: never;
    }
  | {
      stringValue?: never;
      integerValue?: never;
      doubleValue?: never;
      booleanValue: string;
    };
export const AssetPropertyVariant = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ integerValue: S.String }),
  S.Struct({ doubleValue: S.String }),
  S.Struct({ booleanValue: S.String }),
]);
export type AssetPropertyTimeInSeconds = string;
export type AssetPropertyOffsetInNanos = string;
export interface AssetPropertyTimestamp {
  timeInSeconds: string;
  offsetInNanos?: string;
}
export const AssetPropertyTimestamp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timeInSeconds: S.String, offsetInNanos: S.optional(S.String) }),
).annotate({
  identifier: "AssetPropertyTimestamp",
}) as any as S.Schema<AssetPropertyTimestamp>;
export type AssetPropertyQuality = string;
export interface AssetPropertyValue {
  value: AssetPropertyVariant;
  timestamp: AssetPropertyTimestamp;
  quality?: string;
}
export const AssetPropertyValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: AssetPropertyVariant,
    timestamp: AssetPropertyTimestamp,
    quality: S.optional(S.String),
  }),
).annotate({
  identifier: "AssetPropertyValue",
}) as any as S.Schema<AssetPropertyValue>;
export type AssetPropertyValueList = AssetPropertyValue[];
export const AssetPropertyValueList = /*@__PURE__*/ S.Array(AssetPropertyValue);
export interface PutAssetPropertyValueEntry {
  entryId?: string;
  assetId?: string;
  propertyId?: string;
  propertyAlias?: string;
  propertyValues: AssetPropertyValue[];
}
export const PutAssetPropertyValueEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entryId: S.optional(S.String),
    assetId: S.optional(S.String),
    propertyId: S.optional(S.String),
    propertyAlias: S.optional(S.String),
    propertyValues: AssetPropertyValueList,
  }),
).annotate({
  identifier: "PutAssetPropertyValueEntry",
}) as any as S.Schema<PutAssetPropertyValueEntry>;
export type PutAssetPropertyValueEntryList = PutAssetPropertyValueEntry[];
export const PutAssetPropertyValueEntryList = /*@__PURE__*/ S.Array(
  PutAssetPropertyValueEntry,
);
export interface IotSiteWiseAction {
  putAssetPropertyValueEntries: PutAssetPropertyValueEntry[];
  roleArn: string;
}
export const IotSiteWiseAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    putAssetPropertyValueEntries: PutAssetPropertyValueEntryList,
    roleArn: S.String,
  }),
).annotate({
  identifier: "IotSiteWiseAction",
}) as any as S.Schema<IotSiteWiseAction>;
export type ExecutionNamePrefix = string;
export type StateMachineName = string;
export interface StepFunctionsAction {
  executionNamePrefix?: string;
  stateMachineName: string;
  roleArn: string;
}
export const StepFunctionsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionNamePrefix: S.optional(S.String),
    stateMachineName: S.String,
    roleArn: S.String,
  }),
).annotate({
  identifier: "StepFunctionsAction",
}) as any as S.Schema<StepFunctionsAction>;
export type TimestreamDatabaseName = string;
export type TimestreamTableName = string;
export type TimestreamDimensionName = string;
export type TimestreamDimensionValue = string;
export interface TimestreamDimension {
  name: string;
  value: string;
}
export const TimestreamDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "TimestreamDimension",
}) as any as S.Schema<TimestreamDimension>;
export type TimestreamDimensionList = TimestreamDimension[];
export const TimestreamDimensionList =
  /*@__PURE__*/ S.Array(TimestreamDimension);
export type TimestreamTimestampValue = string;
export type TimestreamTimestampUnit = string;
export interface TimestreamTimestamp {
  value: string;
  unit: string;
}
export const TimestreamTimestamp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, unit: S.String }),
).annotate({
  identifier: "TimestreamTimestamp",
}) as any as S.Schema<TimestreamTimestamp>;
export interface TimestreamAction {
  roleArn: string;
  databaseName: string;
  tableName: string;
  dimensions: TimestreamDimension[];
  timestamp?: TimestreamTimestamp;
}
export const TimestreamAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    databaseName: S.String,
    tableName: S.String,
    dimensions: TimestreamDimensionList,
    timestamp: S.optional(TimestreamTimestamp),
  }),
).annotate({
  identifier: "TimestreamAction",
}) as any as S.Schema<TimestreamAction>;
export type Url = string;
export type HeaderKey = string;
export type HeaderValue = string;
export interface HttpActionHeader {
  key: string;
  value: string;
}
export const HttpActionHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "HttpActionHeader",
}) as any as S.Schema<HttpActionHeader>;
export type HeaderList = HttpActionHeader[];
export const HeaderList = /*@__PURE__*/ S.Array(HttpActionHeader);
export type SigningRegion = string;
export type ServiceName = string;
export interface SigV4Authorization {
  signingRegion: string;
  serviceName: string;
  roleArn: string;
}
export const SigV4Authorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signingRegion: S.String,
    serviceName: S.String,
    roleArn: S.String,
  }),
).annotate({
  identifier: "SigV4Authorization",
}) as any as S.Schema<SigV4Authorization>;
export interface HttpAuthorization {
  sigv4?: SigV4Authorization;
}
export const HttpAuthorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sigv4: S.optional(SigV4Authorization) }),
).annotate({
  identifier: "HttpAuthorization",
}) as any as S.Schema<HttpAuthorization>;
export type EnableBatching = boolean;
export type MaxBatchOpenMs = number;
export type MaxBatchSize = number;
export type MaxBatchSizeBytes = number;
export type BatchAcrossTopics = boolean;
export interface BatchConfig {
  maxBatchOpenMs?: number;
  maxBatchSize?: number;
  maxBatchSizeBytes?: number;
  batchAcrossTopics?: boolean;
}
export const BatchConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxBatchOpenMs: S.optional(S.Number),
    maxBatchSize: S.optional(S.Number),
    maxBatchSizeBytes: S.optional(S.Number),
    batchAcrossTopics: S.optional(S.Boolean),
  }),
).annotate({ identifier: "BatchConfig" }) as any as S.Schema<BatchConfig>;
export interface HttpAction {
  url: string;
  confirmationUrl?: string;
  headers?: HttpActionHeader[];
  auth?: HttpAuthorization;
  enableBatching?: boolean;
  batchConfig?: BatchConfig;
}
export const HttpAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    url: S.String,
    confirmationUrl: S.optional(S.String),
    headers: S.optional(HeaderList),
    auth: S.optional(HttpAuthorization),
    enableBatching: S.optional(S.Boolean),
    batchConfig: S.optional(BatchConfig),
  }),
).annotate({ identifier: "HttpAction" }) as any as S.Schema<HttpAction>;
export type ClientProperties = { [key: string]: string | undefined };
export const ClientProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type KafkaHeaderKey = string;
export type KafkaHeaderValue = string;
export interface KafkaActionHeader {
  key: string;
  value: string;
}
export const KafkaActionHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "KafkaActionHeader",
}) as any as S.Schema<KafkaActionHeader>;
export type KafkaHeaders = KafkaActionHeader[];
export const KafkaHeaders = /*@__PURE__*/ S.Array(KafkaActionHeader);
export interface KafkaAction {
  destinationArn: string;
  topic: string;
  key?: string;
  partition?: string;
  clientProperties: { [key: string]: string | undefined };
  headers?: KafkaActionHeader[];
}
export const KafkaAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationArn: S.String,
    topic: S.String,
    key: S.optional(S.String),
    partition: S.optional(S.String),
    clientProperties: ClientProperties,
    headers: S.optional(KafkaHeaders),
  }),
).annotate({ identifier: "KafkaAction" }) as any as S.Schema<KafkaAction>;
export interface OpenSearchAction {
  roleArn: string;
  endpoint: string;
  index: string;
  type: string;
  id: string;
}
export const OpenSearchAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    endpoint: S.String,
    index: S.String,
    type: S.String,
    id: S.String,
  }),
).annotate({
  identifier: "OpenSearchAction",
}) as any as S.Schema<OpenSearchAction>;
export interface LocationTimestamp {
  value: string;
  unit?: string;
}
export const LocationTimestamp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, unit: S.optional(S.String) }),
).annotate({
  identifier: "LocationTimestamp",
}) as any as S.Schema<LocationTimestamp>;
export interface LocationAction {
  roleArn: string;
  trackerName: string;
  deviceId: string;
  timestamp?: LocationTimestamp;
  latitude: string;
  longitude: string;
}
export const LocationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.String,
    trackerName: S.String,
    deviceId: S.String,
    timestamp: S.optional(LocationTimestamp),
    latitude: S.String,
    longitude: S.String,
  }),
).annotate({ identifier: "LocationAction" }) as any as S.Schema<LocationAction>;
export type InfluxDBDatabaseName = string;
export type InfluxDBTableName = string;
export type InfluxDBOrganization = string;
export type InfluxDBTagName = string;
export type InfluxDBTagValue = string;
export type InfluxDBTagMap = { [key: string]: string | undefined };
export const InfluxDBTagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type InfluxDBTimestampUnit = "s" | "ms" | "us" | "ns" | (string & {});
export const InfluxDBTimestampUnit = S.String;

export type InfluxDBMaxBatchSize = number;
export type InfluxDBMaxBatchOpenMs = number;
export type InfluxDBMaxBatchSizeBytes = number;
export type InfluxDBBatchAcrossTopics = boolean;
export interface InfluxDBBatchConfig {
  maxBatchSize?: number;
  maxBatchOpenMs?: number;
  maxBatchSizeBytes?: number;
  batchAcrossTopics?: boolean;
}
export const InfluxDBBatchConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxBatchSize: S.optional(S.Number),
    maxBatchOpenMs: S.optional(S.Number),
    maxBatchSizeBytes: S.optional(S.Number),
    batchAcrossTopics: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InfluxDBBatchConfig",
}) as any as S.Schema<InfluxDBBatchConfig>;
export interface InfluxDBAction {
  destinationArn: string;
  roleArn: string;
  databaseName: string;
  tableName: string;
  organization?: string;
  tags?: { [key: string]: string | undefined };
  timestampUnit?: InfluxDBTimestampUnit;
  batchConfig?: InfluxDBBatchConfig;
}
export const InfluxDBAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationArn: S.String,
    roleArn: S.String,
    databaseName: S.String,
    tableName: S.String,
    organization: S.optional(S.String),
    tags: S.optional(InfluxDBTagMap),
    timestampUnit: S.optional(InfluxDBTimestampUnit),
    batchConfig: S.optional(InfluxDBBatchConfig),
  }),
).annotate({ identifier: "InfluxDBAction" }) as any as S.Schema<InfluxDBAction>;
export interface Action {
  dynamoDB?: DynamoDBAction;
  dynamoDBv2?: DynamoDBv2Action;
  lambda?: LambdaAction;
  sns?: SnsAction;
  sqs?: SqsAction;
  kinesis?: KinesisAction;
  republish?: RepublishAction;
  s3?: S3Action;
  firehose?: FirehoseAction;
  cloudwatchMetric?: CloudwatchMetricAction;
  cloudwatchAlarm?: CloudwatchAlarmAction;
  cloudwatchLogs?: CloudwatchLogsAction;
  elasticsearch?: ElasticsearchAction;
  salesforce?: SalesforceAction;
  iotAnalytics?: IotAnalyticsAction;
  iotEvents?: IotEventsAction;
  iotSiteWise?: IotSiteWiseAction;
  stepFunctions?: StepFunctionsAction;
  timestream?: TimestreamAction;
  http?: HttpAction;
  kafka?: KafkaAction;
  openSearch?: OpenSearchAction;
  location?: LocationAction;
  influxDB?: InfluxDBAction;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dynamoDB: S.optional(DynamoDBAction),
    dynamoDBv2: S.optional(DynamoDBv2Action),
    lambda: S.optional(LambdaAction),
    sns: S.optional(SnsAction),
    sqs: S.optional(SqsAction),
    kinesis: S.optional(KinesisAction),
    republish: S.optional(RepublishAction),
    s3: S.optional(S3Action),
    firehose: S.optional(FirehoseAction),
    cloudwatchMetric: S.optional(CloudwatchMetricAction),
    cloudwatchAlarm: S.optional(CloudwatchAlarmAction),
    cloudwatchLogs: S.optional(CloudwatchLogsAction),
    elasticsearch: S.optional(ElasticsearchAction),
    salesforce: S.optional(SalesforceAction),
    iotAnalytics: S.optional(IotAnalyticsAction),
    iotEvents: S.optional(IotEventsAction),
    iotSiteWise: S.optional(IotSiteWiseAction),
    stepFunctions: S.optional(StepFunctionsAction),
    timestream: S.optional(TimestreamAction),
    http: S.optional(HttpAction),
    kafka: S.optional(KafkaAction),
    openSearch: S.optional(OpenSearchAction),
    location: S.optional(LocationAction),
    influxDB: S.optional(InfluxDBAction),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type ActionList = Action[];
export const ActionList = /*@__PURE__*/ S.Array(Action);
export type IsDisabled = boolean;
export type AwsIotSqlVersion = string;
export interface TopicRulePayload {
  sql: string;
  description?: string;
  actions: Action[];
  ruleDisabled?: boolean;
  awsIotSqlVersion?: string;
  errorAction?: Action;
}
export const TopicRulePayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sql: S.String,
    description: S.optional(S.String),
    actions: ActionList,
    ruleDisabled: S.optional(S.Boolean),
    awsIotSqlVersion: S.optional(S.String),
    errorAction: S.optional(Action),
  }),
).annotate({
  identifier: "TopicRulePayload",
}) as any as S.Schema<TopicRulePayload>;
export interface CreateTopicRuleRequest {
  ruleName: string;
  topicRulePayload: TopicRulePayload;
  tags?: string;
}
export const CreateTopicRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleName: S.String.pipe(T.HttpLabel("ruleName")),
    topicRulePayload: TopicRulePayload.pipe(T.HttpPayload()).annotate({
      identifier: "TopicRulePayload",
    }),
    tags: S.optional(S.String).pipe(T.HttpHeader("x-amz-tagging")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rules/{ruleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTopicRuleRequest",
}) as any as S.Schema<CreateTopicRuleRequest>;
export interface CreateTopicRuleResponse {}
export const CreateTopicRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTopicRuleResponse",
}) as any as S.Schema<CreateTopicRuleResponse>;
export interface HttpUrlDestinationConfiguration {
  confirmationUrl: string;
}
export const HttpUrlDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ confirmationUrl: S.String }),
).annotate({
  identifier: "HttpUrlDestinationConfiguration",
}) as any as S.Schema<HttpUrlDestinationConfiguration>;
export type SubnetId = string;
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupList = string[];
export const SecurityGroupList = /*@__PURE__*/ S.Array(S.String);
export type VpcId = string;
export interface VpcDestinationConfiguration {
  subnetIds: string[];
  securityGroups?: string[];
  vpcId: string;
  roleArn: string;
}
export const VpcDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: SubnetIdList,
    securityGroups: S.optional(SecurityGroupList),
    vpcId: S.String,
    roleArn: S.String,
  }),
).annotate({
  identifier: "VpcDestinationConfiguration",
}) as any as S.Schema<VpcDestinationConfiguration>;
export type InfluxDBVersion = "V2" | "V3" | (string & {});
export const InfluxDBVersion = S.String;

export type InfluxDBSecretId = string;
export type InfluxDBSecretType =
  | "SecretString"
  | "SecretBinary"
  | (string & {});
export const InfluxDBSecretType = S.String;

export type InfluxDBSecretKey = string;
export interface InfluxDBDestinationConfiguration {
  endpoint: string;
  influxDBVersion: InfluxDBVersion;
  secretId: string;
  secretType?: InfluxDBSecretType;
  secretKey?: string;
}
export const InfluxDBDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.String,
    influxDBVersion: InfluxDBVersion,
    secretId: S.String,
    secretType: S.optional(InfluxDBSecretType),
    secretKey: S.optional(S.String),
  }),
).annotate({
  identifier: "InfluxDBDestinationConfiguration",
}) as any as S.Schema<InfluxDBDestinationConfiguration>;
export interface TopicRuleDestinationConfiguration {
  httpUrlConfiguration?: HttpUrlDestinationConfiguration;
  vpcConfiguration?: VpcDestinationConfiguration;
  influxDBConfiguration?: InfluxDBDestinationConfiguration;
}
export const TopicRuleDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    httpUrlConfiguration: S.optional(HttpUrlDestinationConfiguration),
    vpcConfiguration: S.optional(VpcDestinationConfiguration),
    influxDBConfiguration: S.optional(InfluxDBDestinationConfiguration),
  }),
).annotate({
  identifier: "TopicRuleDestinationConfiguration",
}) as any as S.Schema<TopicRuleDestinationConfiguration>;
export interface CreateTopicRuleDestinationRequest {
  destinationConfiguration: TopicRuleDestinationConfiguration;
}
export const CreateTopicRuleDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationConfiguration: TopicRuleDestinationConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTopicRuleDestinationRequest",
}) as any as S.Schema<CreateTopicRuleDestinationRequest>;
export type TopicRuleDestinationStatus =
  | "ENABLED"
  | "IN_PROGRESS"
  | "DISABLED"
  | "ERROR"
  | "DELETING"
  | (string & {});
export const TopicRuleDestinationStatus = S.String;

export type CreatedAtDate = Date;
export type LastUpdatedAtDate = Date;
export interface HttpUrlDestinationProperties {
  confirmationUrl?: string;
}
export const HttpUrlDestinationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ confirmationUrl: S.optional(S.String) }),
).annotate({
  identifier: "HttpUrlDestinationProperties",
}) as any as S.Schema<HttpUrlDestinationProperties>;
export interface VpcDestinationProperties {
  subnetIds?: string[];
  securityGroups?: string[];
  vpcId?: string;
  roleArn?: string;
}
export const VpcDestinationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: S.optional(SubnetIdList),
    securityGroups: S.optional(SecurityGroupList),
    vpcId: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcDestinationProperties",
}) as any as S.Schema<VpcDestinationProperties>;
export interface InfluxDBDestinationProperties {
  endpoint?: string;
  influxDBVersion?: InfluxDBVersion;
  secretId?: string;
  secretType?: InfluxDBSecretType;
  secretKey?: string;
}
export const InfluxDBDestinationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.optional(S.String),
    influxDBVersion: S.optional(InfluxDBVersion),
    secretId: S.optional(S.String),
    secretType: S.optional(InfluxDBSecretType),
    secretKey: S.optional(S.String),
  }),
).annotate({
  identifier: "InfluxDBDestinationProperties",
}) as any as S.Schema<InfluxDBDestinationProperties>;
export interface TopicRuleDestination {
  arn?: string;
  status?: TopicRuleDestinationStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  statusReason?: string;
  httpUrlProperties?: HttpUrlDestinationProperties;
  vpcProperties?: VpcDestinationProperties;
  influxDBProperties?: InfluxDBDestinationProperties;
}
export const TopicRuleDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: S.optional(TopicRuleDestinationStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    statusReason: S.optional(S.String),
    httpUrlProperties: S.optional(HttpUrlDestinationProperties),
    vpcProperties: S.optional(VpcDestinationProperties),
    influxDBProperties: S.optional(InfluxDBDestinationProperties),
  }),
).annotate({
  identifier: "TopicRuleDestination",
}) as any as S.Schema<TopicRuleDestination>;
export interface CreateTopicRuleDestinationResponse {
  topicRuleDestination?: TopicRuleDestination;
}
export const CreateTopicRuleDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicRuleDestination: S.optional(TopicRuleDestination) }),
).annotate({
  identifier: "CreateTopicRuleDestinationResponse",
}) as any as S.Schema<CreateTopicRuleDestinationResponse>;
export type DeleteScheduledAudits = boolean;
export interface DeleteAccountAuditConfigurationRequest {
  deleteScheduledAudits?: boolean;
}
export const DeleteAccountAuditConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      deleteScheduledAudits: S.optional(S.Boolean).pipe(
        T.HttpQuery("deleteScheduledAudits"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/audit/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteAccountAuditConfigurationRequest",
}) as any as S.Schema<DeleteAccountAuditConfigurationRequest>;
export interface DeleteAccountAuditConfigurationResponse {}
export const DeleteAccountAuditConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteAccountAuditConfigurationResponse",
}) as any as S.Schema<DeleteAccountAuditConfigurationResponse>;
export interface DeleteAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
}
export const DeleteAuditSuppressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.String,
    resourceIdentifier: ResourceIdentifier,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/suppressions/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAuditSuppressionRequest",
}) as any as S.Schema<DeleteAuditSuppressionRequest>;
export interface DeleteAuditSuppressionResponse {}
export const DeleteAuditSuppressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAuditSuppressionResponse",
}) as any as S.Schema<DeleteAuditSuppressionResponse>;
export interface DeleteAuthorizerRequest {
  authorizerName: string;
}
export const DeleteAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/authorizer/{authorizerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAuthorizerRequest",
}) as any as S.Schema<DeleteAuthorizerRequest>;
export interface DeleteAuthorizerResponse {}
export const DeleteAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAuthorizerResponse",
}) as any as S.Schema<DeleteAuthorizerResponse>;
export type OptionalVersion = number;
export interface DeleteBillingGroupRequest {
  billingGroupName: string;
  expectedVersion?: number;
}
export const DeleteBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/billing-groups/{billingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBillingGroupRequest",
}) as any as S.Schema<DeleteBillingGroupRequest>;
export interface DeleteBillingGroupResponse {}
export const DeleteBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBillingGroupResponse",
}) as any as S.Schema<DeleteBillingGroupResponse>;
export interface DeleteCACertificateRequest {
  certificateId: string;
}
export const DeleteCACertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cacertificate/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCACertificateRequest",
}) as any as S.Schema<DeleteCACertificateRequest>;
export interface DeleteCACertificateResponse {}
export const DeleteCACertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCACertificateResponse",
}) as any as S.Schema<DeleteCACertificateResponse>;
export type ForceDelete = boolean;
export interface DeleteCertificateRequest {
  certificateId: string;
  forceDelete?: boolean;
}
export const DeleteCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.String.pipe(T.HttpLabel("certificateId")),
    forceDelete: S.optional(S.Boolean).pipe(T.HttpQuery("forceDelete")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/certificates/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCertificateRequest",
}) as any as S.Schema<DeleteCertificateRequest>;
export interface DeleteCertificateResponse {}
export const DeleteCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCertificateResponse",
}) as any as S.Schema<DeleteCertificateResponse>;
export interface DeleteCertificateProviderRequest {
  certificateProviderName: string;
}
export const DeleteCertificateProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.String.pipe(
      T.HttpLabel("certificateProviderName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/certificate-providers/{certificateProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCertificateProviderRequest",
}) as any as S.Schema<DeleteCertificateProviderRequest>;
export interface DeleteCertificateProviderResponse {}
export const DeleteCertificateProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCertificateProviderResponse",
}) as any as S.Schema<DeleteCertificateProviderResponse>;
export interface DeleteCommandRequest {
  commandId: string;
}
export const DeleteCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commandId: S.String.pipe(T.HttpLabel("commandId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/commands/{commandId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCommandRequest",
}) as any as S.Schema<DeleteCommandRequest>;
export type StatusCode = number;
export interface DeleteCommandResponse {
  statusCode?: number;
}
export const DeleteCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
).annotate({
  identifier: "DeleteCommandResponse",
}) as any as S.Schema<DeleteCommandResponse>;
export type CommandExecutionId = string;
export interface DeleteCommandExecutionRequest {
  executionId: string;
  targetArn: string;
}
export const DeleteCommandExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String.pipe(T.HttpLabel("executionId")),
    targetArn: S.String.pipe(T.HttpQuery("targetArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/command-executions/{executionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCommandExecutionRequest",
}) as any as S.Schema<DeleteCommandExecutionRequest>;
export interface DeleteCommandExecutionResponse {}
export const DeleteCommandExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCommandExecutionResponse",
}) as any as S.Schema<DeleteCommandExecutionResponse>;
export interface DeleteCustomMetricRequest {
  metricName: string;
}
export const DeleteCustomMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricName: S.String.pipe(T.HttpLabel("metricName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/custom-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomMetricRequest",
}) as any as S.Schema<DeleteCustomMetricRequest>;
export interface DeleteCustomMetricResponse {}
export const DeleteCustomMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomMetricResponse",
}) as any as S.Schema<DeleteCustomMetricResponse>;
export interface DeleteDimensionRequest {
  name: string;
}
export const DeleteDimensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/dimensions/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDimensionRequest",
}) as any as S.Schema<DeleteDimensionRequest>;
export interface DeleteDimensionResponse {}
export const DeleteDimensionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDimensionResponse",
}) as any as S.Schema<DeleteDimensionResponse>;
export interface DeleteDomainConfigurationRequest {
  domainConfigurationName: string;
}
export const DeleteDomainConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.String.pipe(
      T.HttpLabel("domainConfigurationName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/domainConfigurations/{domainConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainConfigurationRequest",
}) as any as S.Schema<DeleteDomainConfigurationRequest>;
export interface DeleteDomainConfigurationResponse {}
export const DeleteDomainConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDomainConfigurationResponse",
}) as any as S.Schema<DeleteDomainConfigurationResponse>;
export interface DeleteDynamicThingGroupRequest {
  thingGroupName: string;
  expectedVersion?: number;
}
export const DeleteDynamicThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/dynamic-thing-groups/{thingGroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDynamicThingGroupRequest",
}) as any as S.Schema<DeleteDynamicThingGroupRequest>;
export interface DeleteDynamicThingGroupResponse {}
export const DeleteDynamicThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDynamicThingGroupResponse",
}) as any as S.Schema<DeleteDynamicThingGroupResponse>;
export interface DeleteFleetMetricRequest {
  metricName: string;
  expectedVersion?: number;
}
export const DeleteFleetMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.String.pipe(T.HttpLabel("metricName")),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/fleet-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFleetMetricRequest",
}) as any as S.Schema<DeleteFleetMetricRequest>;
export interface DeleteFleetMetricResponse {}
export const DeleteFleetMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFleetMetricResponse",
}) as any as S.Schema<DeleteFleetMetricResponse>;
export interface DeleteJobRequest {
  jobId: string;
  force?: boolean;
  namespaceId?: string;
}
export const DeleteJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobRequest",
}) as any as S.Schema<DeleteJobRequest>;
export interface DeleteJobResponse {}
export const DeleteJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteJobResponse",
}) as any as S.Schema<DeleteJobResponse>;
export type ExecutionNumber = number;
export interface DeleteJobExecutionRequest {
  jobId: string;
  thingName: string;
  executionNumber: number;
  force?: boolean;
  namespaceId?: string;
}
export const DeleteJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    executionNumber: S.Number.pipe(T.HttpLabel("executionNumber")),
    force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
    namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/things/{thingName}/jobs/{jobId}/executionNumber/{executionNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobExecutionRequest",
}) as any as S.Schema<DeleteJobExecutionRequest>;
export interface DeleteJobExecutionResponse {}
export const DeleteJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteJobExecutionResponse",
}) as any as S.Schema<DeleteJobExecutionResponse>;
export interface DeleteJobTemplateRequest {
  jobTemplateId: string;
}
export const DeleteJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobTemplateId: S.String.pipe(T.HttpLabel("jobTemplateId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/job-templates/{jobTemplateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobTemplateRequest",
}) as any as S.Schema<DeleteJobTemplateRequest>;
export interface DeleteJobTemplateResponse {}
export const DeleteJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteJobTemplateResponse",
}) as any as S.Schema<DeleteJobTemplateResponse>;
export interface DeleteMitigationActionRequest {
  actionName: string;
}
export const DeleteMitigationActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionName: S.String.pipe(T.HttpLabel("actionName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/mitigationactions/actions/{actionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMitigationActionRequest",
}) as any as S.Schema<DeleteMitigationActionRequest>;
export interface DeleteMitigationActionResponse {}
export const DeleteMitigationActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMitigationActionResponse",
}) as any as S.Schema<DeleteMitigationActionResponse>;
export type DeleteStream_ = boolean;
export type ForceDeleteAWSJob = boolean;
export interface DeleteOTAUpdateRequest {
  otaUpdateId: string;
  deleteStream?: boolean;
  forceDeleteAWSJob?: boolean;
}
export const DeleteOTAUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    otaUpdateId: S.String.pipe(T.HttpLabel("otaUpdateId")),
    deleteStream: S.optional(S.Boolean).pipe(T.HttpQuery("deleteStream")),
    forceDeleteAWSJob: S.optional(S.Boolean).pipe(
      T.HttpQuery("forceDeleteAWSJob"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/otaUpdates/{otaUpdateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOTAUpdateRequest",
}) as any as S.Schema<DeleteOTAUpdateRequest>;
export interface DeleteOTAUpdateResponse {}
export const DeleteOTAUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOTAUpdateResponse",
}) as any as S.Schema<DeleteOTAUpdateResponse>;
export interface DeletePackageRequest {
  packageName: string;
  clientToken?: string;
}
export const DeletePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/packages/{packageName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackageRequest",
}) as any as S.Schema<DeletePackageRequest>;
export interface DeletePackageResponse {}
export const DeletePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePackageResponse",
}) as any as S.Schema<DeletePackageResponse>;
export interface DeletePackageVersionRequest {
  packageName: string;
  versionName: string;
  clientToken?: string;
}
export const DeletePackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/packages/{packageName}/versions/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackageVersionRequest",
}) as any as S.Schema<DeletePackageVersionRequest>;
export interface DeletePackageVersionResponse {}
export const DeletePackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePackageVersionResponse",
}) as any as S.Schema<DeletePackageVersionResponse>;
export interface DeletePolicyRequest {
  policyName: string;
}
export const DeletePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyRequest",
}) as any as S.Schema<DeletePolicyRequest>;
export interface DeletePolicyResponse {}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeletePolicyVersionRequest {
  policyName: string;
  policyVersionId: string;
}
export const DeletePolicyVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    policyVersionId: S.String.pipe(T.HttpLabel("policyVersionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/policies/{policyName}/version/{policyVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyVersionRequest",
}) as any as S.Schema<DeletePolicyVersionRequest>;
export interface DeletePolicyVersionResponse {}
export const DeletePolicyVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyVersionResponse",
}) as any as S.Schema<DeletePolicyVersionResponse>;
export interface DeleteProvisioningTemplateRequest {
  templateName: string;
}
export const DeleteProvisioningTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String.pipe(T.HttpLabel("templateName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/provisioning-templates/{templateName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProvisioningTemplateRequest",
}) as any as S.Schema<DeleteProvisioningTemplateRequest>;
export interface DeleteProvisioningTemplateResponse {}
export const DeleteProvisioningTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProvisioningTemplateResponse",
}) as any as S.Schema<DeleteProvisioningTemplateResponse>;
export interface DeleteProvisioningTemplateVersionRequest {
  templateName: string;
  versionId: number;
}
export const DeleteProvisioningTemplateVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      templateName: S.String.pipe(T.HttpLabel("templateName")),
      versionId: S.Number.pipe(T.HttpLabel("versionId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/provisioning-templates/{templateName}/versions/{versionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteProvisioningTemplateVersionRequest",
}) as any as S.Schema<DeleteProvisioningTemplateVersionRequest>;
export interface DeleteProvisioningTemplateVersionResponse {}
export const DeleteProvisioningTemplateVersionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteProvisioningTemplateVersionResponse",
  }) as any as S.Schema<DeleteProvisioningTemplateVersionResponse>;
export interface DeleteRegistrationCodeRequest {}
export const DeleteRegistrationCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/registrationcode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRegistrationCodeRequest",
}) as any as S.Schema<DeleteRegistrationCodeRequest>;
export interface DeleteRegistrationCodeResponse {}
export const DeleteRegistrationCodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRegistrationCodeResponse",
}) as any as S.Schema<DeleteRegistrationCodeResponse>;
export interface DeleteRoleAliasRequest {
  roleAlias: string;
}
export const DeleteRoleAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleAlias: S.String.pipe(T.HttpLabel("roleAlias")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/role-aliases/{roleAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRoleAliasRequest",
}) as any as S.Schema<DeleteRoleAliasRequest>;
export interface DeleteRoleAliasResponse {}
export const DeleteRoleAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRoleAliasResponse",
}) as any as S.Schema<DeleteRoleAliasResponse>;
export interface DeleteScheduledAuditRequest {
  scheduledAuditName: string;
}
export const DeleteScheduledAuditRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/audit/scheduledaudits/{scheduledAuditName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScheduledAuditRequest",
}) as any as S.Schema<DeleteScheduledAuditRequest>;
export interface DeleteScheduledAuditResponse {}
export const DeleteScheduledAuditResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScheduledAuditResponse",
}) as any as S.Schema<DeleteScheduledAuditResponse>;
export interface DeleteSecurityProfileRequest {
  securityProfileName: string;
  expectedVersion?: number;
}
export const DeleteSecurityProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/security-profiles/{securityProfileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSecurityProfileRequest",
}) as any as S.Schema<DeleteSecurityProfileRequest>;
export interface DeleteSecurityProfileResponse {}
export const DeleteSecurityProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSecurityProfileResponse",
}) as any as S.Schema<DeleteSecurityProfileResponse>;
export interface DeleteStreamRequest {
  streamId: string;
}
export const DeleteStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamId: S.String.pipe(T.HttpLabel("streamId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/streams/{streamId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStreamRequest",
}) as any as S.Schema<DeleteStreamRequest>;
export interface DeleteStreamResponse {}
export const DeleteStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStreamResponse",
}) as any as S.Schema<DeleteStreamResponse>;
export interface DeleteThingRequest {
  thingName: string;
  expectedVersion?: number;
}
export const DeleteThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/things/{thingName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThingRequest",
}) as any as S.Schema<DeleteThingRequest>;
export interface DeleteThingResponse {}
export const DeleteThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThingResponse",
}) as any as S.Schema<DeleteThingResponse>;
export interface DeleteThingGroupRequest {
  thingGroupName: string;
  expectedVersion?: number;
}
export const DeleteThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/thing-groups/{thingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThingGroupRequest",
}) as any as S.Schema<DeleteThingGroupRequest>;
export interface DeleteThingGroupResponse {}
export const DeleteThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThingGroupResponse",
}) as any as S.Schema<DeleteThingGroupResponse>;
export interface DeleteThingTypeRequest {
  thingTypeName: string;
}
export const DeleteThingTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/thing-types/{thingTypeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThingTypeRequest",
}) as any as S.Schema<DeleteThingTypeRequest>;
export interface DeleteThingTypeResponse {}
export const DeleteThingTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThingTypeResponse",
}) as any as S.Schema<DeleteThingTypeResponse>;
export interface DeleteTopicRuleRequest {
  ruleName: string;
}
export const DeleteTopicRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/rules/{ruleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTopicRuleRequest",
}) as any as S.Schema<DeleteTopicRuleRequest>;
export interface DeleteTopicRuleResponse {}
export const DeleteTopicRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTopicRuleResponse",
}) as any as S.Schema<DeleteTopicRuleResponse>;
export interface DeleteTopicRuleDestinationRequest {
  arn: string;
}
export const DeleteTopicRuleDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/destinations/{arn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTopicRuleDestinationRequest",
}) as any as S.Schema<DeleteTopicRuleDestinationRequest>;
export interface DeleteTopicRuleDestinationResponse {}
export const DeleteTopicRuleDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTopicRuleDestinationResponse",
}) as any as S.Schema<DeleteTopicRuleDestinationResponse>;
export type LogTargetType =
  | "DEFAULT"
  | "THING_GROUP"
  | "CLIENT_ID"
  | "SOURCE_IP"
  | "PRINCIPAL_ID"
  | (string & {});
export const LogTargetType = S.String;

export type LogTargetName = string;
export interface DeleteV2LoggingLevelRequest {
  targetType: LogTargetType;
  targetName: string;
}
export const DeleteV2LoggingLevelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetType: LogTargetType.pipe(T.HttpQuery("targetType")),
    targetName: S.String.pipe(T.HttpQuery("targetName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2LoggingLevel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteV2LoggingLevelRequest",
}) as any as S.Schema<DeleteV2LoggingLevelRequest>;
export interface DeleteV2LoggingLevelResponse {}
export const DeleteV2LoggingLevelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteV2LoggingLevelResponse",
}) as any as S.Schema<DeleteV2LoggingLevelResponse>;
export type UndoDeprecate = boolean;
export interface DeprecateThingTypeRequest {
  thingTypeName: string;
  undoDeprecate?: boolean;
}
export const DeprecateThingTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")),
    undoDeprecate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/thing-types/{thingTypeName}/deprecate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeprecateThingTypeRequest",
}) as any as S.Schema<DeprecateThingTypeRequest>;
export interface DeprecateThingTypeResponse {}
export const DeprecateThingTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeprecateThingTypeResponse",
}) as any as S.Schema<DeprecateThingTypeResponse>;
export interface DescribeAccountAuditConfigurationRequest {}
export const DescribeAccountAuditConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/audit/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeAccountAuditConfigurationRequest",
}) as any as S.Schema<DescribeAccountAuditConfigurationRequest>;
export type AuditNotificationType = "SNS" | (string & {});
export const AuditNotificationType = S.String;

export type Enabled = boolean;
export interface AuditNotificationTarget {
  targetArn?: string;
  roleArn?: string;
  enabled?: boolean;
}
export const AuditNotificationTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AuditNotificationTarget",
}) as any as S.Schema<AuditNotificationTarget>;
export type AuditNotificationTargetConfigurations = {
  [key in AuditNotificationType]?: AuditNotificationTarget;
};
export const AuditNotificationTargetConfigurations = /*@__PURE__*/ S.Record(
  AuditNotificationType,
  AuditNotificationTarget.pipe(S.optional),
);
export type ConfigName =
  | "CERT_AGE_THRESHOLD_IN_DAYS"
  | "CERT_EXPIRATION_THRESHOLD_IN_DAYS"
  | (string & {});
export const ConfigName = S.String;

export type ConfigValue = string;
export type CheckCustomConfiguration = { [key in ConfigName]?: string };
export const CheckCustomConfiguration = /*@__PURE__*/ S.Record(
  ConfigName,
  S.String.pipe(S.optional),
);
export interface AuditCheckConfiguration {
  enabled?: boolean;
  configuration?: { [key: string]: string | undefined };
}
export const AuditCheckConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    configuration: S.optional(CheckCustomConfiguration),
  }),
).annotate({
  identifier: "AuditCheckConfiguration",
}) as any as S.Schema<AuditCheckConfiguration>;
export type AuditCheckConfigurations = {
  [key: string]: AuditCheckConfiguration | undefined;
};
export const AuditCheckConfigurations = /*@__PURE__*/ S.Record(
  S.String,
  AuditCheckConfiguration.pipe(S.optional),
);
export interface DescribeAccountAuditConfigurationResponse {
  roleArn?: string;
  auditNotificationTargetConfigurations?: {
    [key: string]: AuditNotificationTarget | undefined;
  };
  auditCheckConfigurations?: {
    [key: string]: AuditCheckConfiguration | undefined;
  };
}
export const DescribeAccountAuditConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      roleArn: S.optional(S.String),
      auditNotificationTargetConfigurations: S.optional(
        AuditNotificationTargetConfigurations,
      ),
      auditCheckConfigurations: S.optional(AuditCheckConfigurations),
    }),
  ).annotate({
    identifier: "DescribeAccountAuditConfigurationResponse",
  }) as any as S.Schema<DescribeAccountAuditConfigurationResponse>;
export type FindingId = string;
export interface DescribeAuditFindingRequest {
  findingId: string;
}
export const DescribeAuditFindingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingId: S.String.pipe(T.HttpLabel("findingId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/findings/{findingId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAuditFindingRequest",
}) as any as S.Schema<DescribeAuditFindingRequest>;
export type AuditFindingSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | (string & {});
export const AuditFindingSeverity = S.String;

export type ResourceType =
  | "DEVICE_CERTIFICATE"
  | "CA_CERTIFICATE"
  | "IOT_POLICY"
  | "COGNITO_IDENTITY_POOL"
  | "CLIENT_ID"
  | "ACCOUNT_SETTINGS"
  | "ROLE_ALIAS"
  | "IAM_ROLE"
  | "ISSUER_CERTIFICATE"
  | (string & {});
export const ResourceType = S.String;

export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface NonCompliantResource {
  resourceType?: ResourceType;
  resourceIdentifier?: ResourceIdentifier;
  additionalInfo?: { [key: string]: string | undefined };
}
export const NonCompliantResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(ResourceType),
    resourceIdentifier: S.optional(ResourceIdentifier),
    additionalInfo: S.optional(StringMap),
  }),
).annotate({
  identifier: "NonCompliantResource",
}) as any as S.Schema<NonCompliantResource>;
export interface RelatedResource {
  resourceType?: ResourceType;
  resourceIdentifier?: ResourceIdentifier;
  additionalInfo?: { [key: string]: string | undefined };
}
export const RelatedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(ResourceType),
    resourceIdentifier: S.optional(ResourceIdentifier),
    additionalInfo: S.optional(StringMap),
  }),
).annotate({
  identifier: "RelatedResource",
}) as any as S.Schema<RelatedResource>;
export type RelatedResources = RelatedResource[];
export const RelatedResources = /*@__PURE__*/ S.Array(RelatedResource);
export type ReasonForNonCompliance = string;
export type ReasonForNonComplianceCode = string;
export type IsSuppressed = boolean;
export interface AuditFinding {
  findingId?: string;
  taskId?: string;
  checkName?: string;
  taskStartTime?: Date;
  findingTime?: Date;
  severity?: AuditFindingSeverity;
  nonCompliantResource?: NonCompliantResource;
  relatedResources?: RelatedResource[];
  reasonForNonCompliance?: string;
  reasonForNonComplianceCode?: string;
  isSuppressed?: boolean;
}
export const AuditFinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.optional(S.String),
    taskId: S.optional(S.String),
    checkName: S.optional(S.String),
    taskStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    findingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    severity: S.optional(AuditFindingSeverity),
    nonCompliantResource: S.optional(NonCompliantResource),
    relatedResources: S.optional(RelatedResources),
    reasonForNonCompliance: S.optional(S.String),
    reasonForNonComplianceCode: S.optional(S.String),
    isSuppressed: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AuditFinding" }) as any as S.Schema<AuditFinding>;
export interface DescribeAuditFindingResponse {
  finding?: AuditFinding;
}
export const DescribeAuditFindingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ finding: S.optional(AuditFinding) }),
).annotate({
  identifier: "DescribeAuditFindingResponse",
}) as any as S.Schema<DescribeAuditFindingResponse>;
export interface DescribeAuditMitigationActionsTaskRequest {
  taskId: string;
}
export const DescribeAuditMitigationActionsTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/audit/mitigationactions/tasks/{taskId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeAuditMitigationActionsTaskRequest",
  }) as any as S.Schema<DescribeAuditMitigationActionsTaskRequest>;
export type AuditMitigationActionsTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export const AuditMitigationActionsTaskStatus = S.String;

export type TotalFindingsCount = number;
export type FailedFindingsCount = number;
export type SucceededFindingsCount = number;
export type SkippedFindingsCount = number;
export type CanceledFindingsCount = number;
export interface TaskStatisticsForAuditCheck {
  totalFindingsCount?: number;
  failedFindingsCount?: number;
  succeededFindingsCount?: number;
  skippedFindingsCount?: number;
  canceledFindingsCount?: number;
}
export const TaskStatisticsForAuditCheck = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalFindingsCount: S.optional(S.Number),
    failedFindingsCount: S.optional(S.Number),
    succeededFindingsCount: S.optional(S.Number),
    skippedFindingsCount: S.optional(S.Number),
    canceledFindingsCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "TaskStatisticsForAuditCheck",
}) as any as S.Schema<TaskStatisticsForAuditCheck>;
export type AuditMitigationActionsTaskStatistics = {
  [key: string]: TaskStatisticsForAuditCheck | undefined;
};
export const AuditMitigationActionsTaskStatistics = /*@__PURE__*/ S.Record(
  S.String,
  TaskStatisticsForAuditCheck.pipe(S.optional),
);
export type FindingIds = string[];
export const FindingIds = /*@__PURE__*/ S.Array(S.String);
export type ReasonForNonComplianceCodes = string[];
export const ReasonForNonComplianceCodes = /*@__PURE__*/ S.Array(S.String);
export type AuditCheckToReasonCodeFilter = {
  [key: string]: string[] | undefined;
};
export const AuditCheckToReasonCodeFilter = /*@__PURE__*/ S.Record(
  S.String,
  ReasonForNonComplianceCodes.pipe(S.optional),
);
export interface AuditMitigationActionsTaskTarget {
  auditTaskId?: string;
  findingIds?: string[];
  auditCheckToReasonCodeFilter?: { [key: string]: string[] | undefined };
}
export const AuditMitigationActionsTaskTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    auditTaskId: S.optional(S.String),
    findingIds: S.optional(FindingIds),
    auditCheckToReasonCodeFilter: S.optional(AuditCheckToReasonCodeFilter),
  }),
).annotate({
  identifier: "AuditMitigationActionsTaskTarget",
}) as any as S.Schema<AuditMitigationActionsTaskTarget>;
export type MitigationActionNameList = string[];
export const MitigationActionNameList = /*@__PURE__*/ S.Array(S.String);
export type AuditCheckToActionsMapping = {
  [key: string]: string[] | undefined;
};
export const AuditCheckToActionsMapping = /*@__PURE__*/ S.Record(
  S.String,
  MitigationActionNameList.pipe(S.optional),
);
export interface MitigationAction {
  name?: string;
  id?: string;
  roleArn?: string;
  actionParams?: MitigationActionParams;
}
export const MitigationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    roleArn: S.optional(S.String),
    actionParams: S.optional(MitigationActionParams),
  }),
).annotate({
  identifier: "MitigationAction",
}) as any as S.Schema<MitigationAction>;
export type MitigationActionList = MitigationAction[];
export const MitigationActionList = /*@__PURE__*/ S.Array(MitigationAction);
export interface DescribeAuditMitigationActionsTaskResponse {
  taskStatus?: AuditMitigationActionsTaskStatus;
  startTime?: Date;
  endTime?: Date;
  taskStatistics?: { [key: string]: TaskStatisticsForAuditCheck | undefined };
  target?: AuditMitigationActionsTaskTarget;
  auditCheckToActionsMapping?: { [key: string]: string[] | undefined };
  actionsDefinition?: MitigationAction[];
}
export const DescribeAuditMitigationActionsTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      taskStatus: S.optional(AuditMitigationActionsTaskStatus),
      startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      taskStatistics: S.optional(AuditMitigationActionsTaskStatistics),
      target: S.optional(AuditMitigationActionsTaskTarget),
      auditCheckToActionsMapping: S.optional(AuditCheckToActionsMapping),
      actionsDefinition: S.optional(MitigationActionList),
    }),
  ).annotate({
    identifier: "DescribeAuditMitigationActionsTaskResponse",
  }) as any as S.Schema<DescribeAuditMitigationActionsTaskResponse>;
export interface DescribeAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
}
export const DescribeAuditSuppressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.String,
    resourceIdentifier: ResourceIdentifier,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/suppressions/describe" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAuditSuppressionRequest",
}) as any as S.Schema<DescribeAuditSuppressionRequest>;
export interface DescribeAuditSuppressionResponse {
  checkName?: string;
  resourceIdentifier?: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
}
export const DescribeAuditSuppressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.optional(S.String),
    resourceIdentifier: S.optional(ResourceIdentifier),
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    suppressIndefinitely: S.optional(S.Boolean),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAuditSuppressionResponse",
}) as any as S.Schema<DescribeAuditSuppressionResponse>;
export interface DescribeAuditTaskRequest {
  taskId: string;
}
export const DescribeAuditTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/tasks/{taskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAuditTaskRequest",
}) as any as S.Schema<DescribeAuditTaskRequest>;
export type AuditTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export const AuditTaskStatus = S.String;

export type AuditTaskType =
  | "ON_DEMAND_AUDIT_TASK"
  | "SCHEDULED_AUDIT_TASK"
  | (string & {});
export const AuditTaskType = S.String;

export type TotalChecksCount = number;
export type InProgressChecksCount = number;
export type WaitingForDataCollectionChecksCount = number;
export type CompliantChecksCount = number;
export type NonCompliantChecksCount = number;
export type FailedChecksCount = number;
export type CanceledChecksCount = number;
export interface TaskStatistics {
  totalChecks?: number;
  inProgressChecks?: number;
  waitingForDataCollectionChecks?: number;
  compliantChecks?: number;
  nonCompliantChecks?: number;
  failedChecks?: number;
  canceledChecks?: number;
}
export const TaskStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalChecks: S.optional(S.Number),
    inProgressChecks: S.optional(S.Number),
    waitingForDataCollectionChecks: S.optional(S.Number),
    compliantChecks: S.optional(S.Number),
    nonCompliantChecks: S.optional(S.Number),
    failedChecks: S.optional(S.Number),
    canceledChecks: S.optional(S.Number),
  }),
).annotate({ identifier: "TaskStatistics" }) as any as S.Schema<TaskStatistics>;
export type AuditCheckRunStatus =
  | "IN_PROGRESS"
  | "WAITING_FOR_DATA_COLLECTION"
  | "CANCELED"
  | "COMPLETED_COMPLIANT"
  | "COMPLETED_NON_COMPLIANT"
  | "FAILED"
  | (string & {});
export const AuditCheckRunStatus = S.String;

export type CheckCompliant = boolean;
export type TotalResourcesCount = number;
export type NonCompliantResourcesCount = number;
export type SuppressedNonCompliantResourcesCount = number;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface AuditCheckDetails {
  checkRunStatus?: AuditCheckRunStatus;
  checkCompliant?: boolean;
  totalResourcesCount?: number;
  nonCompliantResourcesCount?: number;
  suppressedNonCompliantResourcesCount?: number;
  errorCode?: string;
  message?: string;
}
export const AuditCheckDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkRunStatus: S.optional(AuditCheckRunStatus),
    checkCompliant: S.optional(S.Boolean),
    totalResourcesCount: S.optional(S.Number),
    nonCompliantResourcesCount: S.optional(S.Number),
    suppressedNonCompliantResourcesCount: S.optional(S.Number),
    errorCode: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "AuditCheckDetails",
}) as any as S.Schema<AuditCheckDetails>;
export type AuditDetails = { [key: string]: AuditCheckDetails | undefined };
export const AuditDetails = /*@__PURE__*/ S.Record(
  S.String,
  AuditCheckDetails.pipe(S.optional),
);
export interface DescribeAuditTaskResponse {
  taskStatus?: AuditTaskStatus;
  taskType?: AuditTaskType;
  taskStartTime?: Date;
  taskStatistics?: TaskStatistics;
  scheduledAuditName?: string;
  auditDetails?: { [key: string]: AuditCheckDetails | undefined };
}
export const DescribeAuditTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskStatus: S.optional(AuditTaskStatus),
    taskType: S.optional(AuditTaskType),
    taskStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    taskStatistics: S.optional(TaskStatistics),
    scheduledAuditName: S.optional(S.String),
    auditDetails: S.optional(AuditDetails),
  }),
).annotate({
  identifier: "DescribeAuditTaskResponse",
}) as any as S.Schema<DescribeAuditTaskResponse>;
export interface DescribeAuthorizerRequest {
  authorizerName: string;
}
export const DescribeAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/authorizer/{authorizerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAuthorizerRequest",
}) as any as S.Schema<DescribeAuthorizerRequest>;
export interface AuthorizerDescription {
  authorizerName?: string;
  authorizerArn?: string;
  authorizerFunctionArn?: string;
  tokenKeyName?: string;
  tokenSigningPublicKeys?: { [key: string]: string | undefined };
  status?: AuthorizerStatus;
  creationDate?: Date;
  lastModifiedDate?: Date;
  signingDisabled?: boolean;
  enableCachingForHttp?: boolean;
}
export const AuthorizerDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.optional(S.String),
    authorizerArn: S.optional(S.String),
    authorizerFunctionArn: S.optional(S.String),
    tokenKeyName: S.optional(S.String),
    tokenSigningPublicKeys: S.optional(PublicKeyMap),
    status: S.optional(AuthorizerStatus),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    signingDisabled: S.optional(S.Boolean),
    enableCachingForHttp: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AuthorizerDescription",
}) as any as S.Schema<AuthorizerDescription>;
export interface DescribeAuthorizerResponse {
  authorizerDescription?: AuthorizerDescription;
}
export const DescribeAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizerDescription: S.optional(AuthorizerDescription) }),
).annotate({
  identifier: "DescribeAuthorizerResponse",
}) as any as S.Schema<DescribeAuthorizerResponse>;
export interface DescribeBillingGroupRequest {
  billingGroupName: string;
}
export const DescribeBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/billing-groups/{billingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBillingGroupRequest",
}) as any as S.Schema<DescribeBillingGroupRequest>;
export type Version = number;
export type CreationDate = Date;
export interface BillingGroupMetadata {
  creationDate?: Date;
}
export const BillingGroupMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "BillingGroupMetadata",
}) as any as S.Schema<BillingGroupMetadata>;
export interface DescribeBillingGroupResponse {
  billingGroupName?: string;
  billingGroupId?: string;
  billingGroupArn?: string;
  version?: number;
  billingGroupProperties?: BillingGroupProperties;
  billingGroupMetadata?: BillingGroupMetadata;
}
export const DescribeBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.optional(S.String),
    billingGroupId: S.optional(S.String),
    billingGroupArn: S.optional(S.String),
    version: S.optional(S.Number),
    billingGroupProperties: S.optional(BillingGroupProperties),
    billingGroupMetadata: S.optional(BillingGroupMetadata),
  }),
).annotate({
  identifier: "DescribeBillingGroupResponse",
}) as any as S.Schema<DescribeBillingGroupResponse>;
export interface DescribeCACertificateRequest {
  certificateId: string;
}
export const DescribeCACertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cacertificate/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCACertificateRequest",
}) as any as S.Schema<DescribeCACertificateRequest>;
export type CACertificateStatus = "ACTIVE" | "INACTIVE" | (string & {});
export const CACertificateStatus = S.String;

export type AutoRegistrationStatus = "ENABLE" | "DISABLE" | (string & {});
export const AutoRegistrationStatus = S.String;

export type CustomerVersion = number;
export type GenerationId = string;
export interface CertificateValidity {
  notBefore?: Date;
  notAfter?: Date;
}
export const CertificateValidity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    notBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    notAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CertificateValidity",
}) as any as S.Schema<CertificateValidity>;
export type CertificateMode = "DEFAULT" | "SNI_ONLY" | (string & {});
export const CertificateMode = S.String;

export interface CACertificateDescription {
  certificateArn?: string;
  certificateId?: string;
  status?: CACertificateStatus;
  certificatePem?: string;
  ownedBy?: string;
  creationDate?: Date;
  autoRegistrationStatus?: AutoRegistrationStatus;
  lastModifiedDate?: Date;
  customerVersion?: number;
  generationId?: string;
  validity?: CertificateValidity;
  certificateMode?: CertificateMode;
}
export const CACertificateDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    status: S.optional(CACertificateStatus),
    certificatePem: S.optional(S.String),
    ownedBy: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    autoRegistrationStatus: S.optional(AutoRegistrationStatus),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    customerVersion: S.optional(S.Number),
    generationId: S.optional(S.String),
    validity: S.optional(CertificateValidity),
    certificateMode: S.optional(CertificateMode),
  }),
).annotate({
  identifier: "CACertificateDescription",
}) as any as S.Schema<CACertificateDescription>;
export interface RegistrationConfig {
  templateBody?: string;
  roleArn?: string;
  templateName?: string;
}
export const RegistrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateBody: S.optional(S.String),
    roleArn: S.optional(S.String),
    templateName: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationConfig",
}) as any as S.Schema<RegistrationConfig>;
export interface DescribeCACertificateResponse {
  certificateDescription?: CACertificateDescription;
  registrationConfig?: RegistrationConfig;
}
export const DescribeCACertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateDescription: S.optional(CACertificateDescription),
    registrationConfig: S.optional(RegistrationConfig),
  }),
).annotate({
  identifier: "DescribeCACertificateResponse",
}) as any as S.Schema<DescribeCACertificateResponse>;
export interface DescribeCertificateRequest {
  certificateId: string;
}
export const DescribeCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateId: S.String.pipe(T.HttpLabel("certificateId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/certificates/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCertificateRequest",
}) as any as S.Schema<DescribeCertificateRequest>;
export type CertificateStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "REVOKED"
  | "PENDING_TRANSFER"
  | "REGISTER_INACTIVE"
  | "PENDING_ACTIVATION"
  | (string & {});
export const CertificateStatus = S.String;

export type Message = string;
export interface TransferData {
  transferMessage?: string;
  rejectReason?: string;
  transferDate?: Date;
  acceptDate?: Date;
  rejectDate?: Date;
}
export const TransferData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transferMessage: S.optional(S.String),
    rejectReason: S.optional(S.String),
    transferDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    acceptDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    rejectDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TransferData" }) as any as S.Schema<TransferData>;
export interface CertificateDescription {
  certificateArn?: string;
  certificateId?: string;
  caCertificateId?: string;
  status?: CertificateStatus;
  certificatePem?: string;
  ownedBy?: string;
  previousOwnedBy?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  customerVersion?: number;
  transferData?: TransferData;
  generationId?: string;
  validity?: CertificateValidity;
  certificateMode?: CertificateMode;
}
export const CertificateDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    caCertificateId: S.optional(S.String),
    status: S.optional(CertificateStatus),
    certificatePem: S.optional(S.String),
    ownedBy: S.optional(S.String),
    previousOwnedBy: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    customerVersion: S.optional(S.Number),
    transferData: S.optional(TransferData),
    generationId: S.optional(S.String),
    validity: S.optional(CertificateValidity),
    certificateMode: S.optional(CertificateMode),
  }),
).annotate({
  identifier: "CertificateDescription",
}) as any as S.Schema<CertificateDescription>;
export interface DescribeCertificateResponse {
  certificateDescription?: CertificateDescription;
}
export const DescribeCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateDescription: S.optional(CertificateDescription) }),
).annotate({
  identifier: "DescribeCertificateResponse",
}) as any as S.Schema<DescribeCertificateResponse>;
export interface DescribeCertificateProviderRequest {
  certificateProviderName: string;
}
export const DescribeCertificateProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.String.pipe(
      T.HttpLabel("certificateProviderName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/certificate-providers/{certificateProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCertificateProviderRequest",
}) as any as S.Schema<DescribeCertificateProviderRequest>;
export interface DescribeCertificateProviderResponse {
  certificateProviderName?: string;
  certificateProviderArn?: string;
  lambdaFunctionArn?: string;
  accountDefaultForOperations?: CertificateProviderOperation[];
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const DescribeCertificateProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.optional(S.String),
    certificateProviderArn: S.optional(S.String),
    lambdaFunctionArn: S.optional(S.String),
    accountDefaultForOperations: S.optional(
      CertificateProviderAccountDefaultForOperations,
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeCertificateProviderResponse",
}) as any as S.Schema<DescribeCertificateProviderResponse>;
export interface DescribeCustomMetricRequest {
  metricName: string;
}
export const DescribeCustomMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricName: S.String.pipe(T.HttpLabel("metricName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCustomMetricRequest",
}) as any as S.Schema<DescribeCustomMetricRequest>;
export interface DescribeCustomMetricResponse {
  metricName?: string;
  metricArn?: string;
  metricType?: CustomMetricType;
  displayName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const DescribeCustomMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    metricArn: S.optional(S.String),
    metricType: S.optional(CustomMetricType),
    displayName: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeCustomMetricResponse",
}) as any as S.Schema<DescribeCustomMetricResponse>;
export interface DescribeDefaultAuthorizerRequest {}
export const DescribeDefaultAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/default-authorizer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDefaultAuthorizerRequest",
}) as any as S.Schema<DescribeDefaultAuthorizerRequest>;
export interface DescribeDefaultAuthorizerResponse {
  authorizerDescription?: AuthorizerDescription;
}
export const DescribeDefaultAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizerDescription: S.optional(AuthorizerDescription) }),
).annotate({
  identifier: "DescribeDefaultAuthorizerResponse",
}) as any as S.Schema<DescribeDefaultAuthorizerResponse>;
export interface DescribeDetectMitigationActionsTaskRequest {
  taskId: string;
}
export const DescribeDetectMitigationActionsTaskRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/detect/mitigationactions/tasks/{taskId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeDetectMitigationActionsTaskRequest",
  }) as any as S.Schema<DescribeDetectMitigationActionsTaskRequest>;
export type DetectMitigationActionsTaskStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "CANCELED"
  | (string & {});
export const DetectMitigationActionsTaskStatus = S.String;

export type ViolationId = string;
export type TargetViolationIdsForDetectMitigationActions = string[];
export const TargetViolationIdsForDetectMitigationActions =
  /*@__PURE__*/ S.Array(S.String);
export interface DetectMitigationActionsTaskTarget {
  violationIds?: string[];
  securityProfileName?: string;
  behaviorName?: string;
}
export const DetectMitigationActionsTaskTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    violationIds: S.optional(TargetViolationIdsForDetectMitigationActions),
    securityProfileName: S.optional(S.String),
    behaviorName: S.optional(S.String),
  }),
).annotate({
  identifier: "DetectMitigationActionsTaskTarget",
}) as any as S.Schema<DetectMitigationActionsTaskTarget>;
export interface ViolationEventOccurrenceRange {
  startTime: Date;
  endTime: Date;
}
export const ViolationEventOccurrenceRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ViolationEventOccurrenceRange",
}) as any as S.Schema<ViolationEventOccurrenceRange>;
export type PrimitiveBoolean = boolean;
export type GenericLongValue = number;
export interface DetectMitigationActionsTaskStatistics {
  actionsExecuted?: number;
  actionsSkipped?: number;
  actionsFailed?: number;
}
export const DetectMitigationActionsTaskStatistics = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      actionsExecuted: S.optional(S.Number),
      actionsSkipped: S.optional(S.Number),
      actionsFailed: S.optional(S.Number),
    }),
).annotate({
  identifier: "DetectMitigationActionsTaskStatistics",
}) as any as S.Schema<DetectMitigationActionsTaskStatistics>;
export interface DetectMitigationActionsTaskSummary {
  taskId?: string;
  taskStatus?: DetectMitigationActionsTaskStatus;
  taskStartTime?: Date;
  taskEndTime?: Date;
  target?: DetectMitigationActionsTaskTarget;
  violationEventOccurrenceRange?: ViolationEventOccurrenceRange;
  onlyActiveViolationsIncluded?: boolean;
  suppressedAlertsIncluded?: boolean;
  actionsDefinition?: MitigationAction[];
  taskStatistics?: DetectMitigationActionsTaskStatistics;
}
export const DetectMitigationActionsTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    taskStatus: S.optional(DetectMitigationActionsTaskStatus),
    taskStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    taskEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    target: S.optional(DetectMitigationActionsTaskTarget),
    violationEventOccurrenceRange: S.optional(ViolationEventOccurrenceRange),
    onlyActiveViolationsIncluded: S.optional(S.Boolean),
    suppressedAlertsIncluded: S.optional(S.Boolean),
    actionsDefinition: S.optional(MitigationActionList),
    taskStatistics: S.optional(DetectMitigationActionsTaskStatistics),
  }),
).annotate({
  identifier: "DetectMitigationActionsTaskSummary",
}) as any as S.Schema<DetectMitigationActionsTaskSummary>;
export interface DescribeDetectMitigationActionsTaskResponse {
  taskSummary?: DetectMitigationActionsTaskSummary;
}
export const DescribeDetectMitigationActionsTaskResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ taskSummary: S.optional(DetectMitigationActionsTaskSummary) }),
  ).annotate({
    identifier: "DescribeDetectMitigationActionsTaskResponse",
  }) as any as S.Schema<DescribeDetectMitigationActionsTaskResponse>;
export interface DescribeDimensionRequest {
  name: string;
}
export const DescribeDimensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dimensions/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDimensionRequest",
}) as any as S.Schema<DescribeDimensionRequest>;
export interface DescribeDimensionResponse {
  name?: string;
  arn?: string;
  type?: DimensionType;
  stringValues?: string[];
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const DescribeDimensionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    type: S.optional(DimensionType),
    stringValues: S.optional(DimensionStringValues),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeDimensionResponse",
}) as any as S.Schema<DescribeDimensionResponse>;
export type ReservedDomainConfigurationName = string;
export interface DescribeDomainConfigurationRequest {
  domainConfigurationName: string;
}
export const DescribeDomainConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.String.pipe(
      T.HttpLabel("domainConfigurationName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/domainConfigurations/{domainConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainConfigurationRequest",
}) as any as S.Schema<DescribeDomainConfigurationRequest>;
export type ServerCertificateStatus = "INVALID" | "VALID" | (string & {});
export const ServerCertificateStatus = S.String;

export type ServerCertificateStatusDetail = string;
export interface ServerCertificateSummary {
  serverCertificateArn?: string;
  serverCertificateStatus?: ServerCertificateStatus;
  serverCertificateStatusDetail?: string;
}
export const ServerCertificateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serverCertificateArn: S.optional(S.String),
    serverCertificateStatus: S.optional(ServerCertificateStatus),
    serverCertificateStatusDetail: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerCertificateSummary",
}) as any as S.Schema<ServerCertificateSummary>;
export type ServerCertificates = ServerCertificateSummary[];
export const ServerCertificates = /*@__PURE__*/ S.Array(
  ServerCertificateSummary,
);
export type DomainConfigurationStatus = "ENABLED" | "DISABLED" | (string & {});
export const DomainConfigurationStatus = S.String;

export type DomainType =
  | "ENDPOINT"
  | "AWS_MANAGED"
  | "CUSTOMER_MANAGED"
  | (string & {});
export const DomainType = S.String;

export interface DescribeDomainConfigurationResponse {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
  domainName?: string;
  serverCertificates?: ServerCertificateSummary[];
  authorizerConfig?: AuthorizerConfig;
  domainConfigurationStatus?: DomainConfigurationStatus;
  serviceType?: ServiceType;
  domainType?: DomainType;
  lastStatusChangeDate?: Date;
  tlsConfig?: TlsConfig;
  serverCertificateConfig?: ServerCertificateConfig;
  authenticationType?: AuthenticationType;
  applicationProtocol?: ApplicationProtocol;
  clientCertificateConfig?: ClientCertificateConfig;
}
export const DescribeDomainConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.optional(S.String),
    domainConfigurationArn: S.optional(S.String),
    domainName: S.optional(S.String),
    serverCertificates: S.optional(ServerCertificates),
    authorizerConfig: S.optional(AuthorizerConfig),
    domainConfigurationStatus: S.optional(DomainConfigurationStatus),
    serviceType: S.optional(ServiceType),
    domainType: S.optional(DomainType),
    lastStatusChangeDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    tlsConfig: S.optional(TlsConfig),
    serverCertificateConfig: S.optional(ServerCertificateConfig),
    authenticationType: S.optional(AuthenticationType),
    applicationProtocol: S.optional(ApplicationProtocol),
    clientCertificateConfig: S.optional(ClientCertificateConfig),
  }),
).annotate({
  identifier: "DescribeDomainConfigurationResponse",
}) as any as S.Schema<DescribeDomainConfigurationResponse>;
export interface DescribeEncryptionConfigurationRequest {}
export const DescribeEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/encryption-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeEncryptionConfigurationRequest",
}) as any as S.Schema<DescribeEncryptionConfigurationRequest>;
export type EncryptionType =
  | "CUSTOMER_MANAGED_KMS_KEY"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export const EncryptionType = S.String;

export type KmsKeyArn = string;
export type KmsAccessRoleArn = string;
export type ConfigurationStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export const ConfigurationStatus = S.String;

export interface ConfigurationDetails {
  configurationStatus?: ConfigurationStatus;
  errorCode?: string;
  errorMessage?: string;
}
export const ConfigurationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationStatus: S.optional(ConfigurationStatus),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationDetails",
}) as any as S.Schema<ConfigurationDetails>;
export interface DescribeEncryptionConfigurationResponse {
  encryptionType?: EncryptionType;
  kmsKeyArn?: string;
  kmsAccessRoleArn?: string;
  configurationDetails?: ConfigurationDetails;
  lastModifiedDate?: Date;
}
export const DescribeEncryptionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      encryptionType: S.optional(EncryptionType),
      kmsKeyArn: S.optional(S.String),
      kmsAccessRoleArn: S.optional(S.String),
      configurationDetails: S.optional(ConfigurationDetails),
      lastModifiedDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
).annotate({
  identifier: "DescribeEncryptionConfigurationResponse",
}) as any as S.Schema<DescribeEncryptionConfigurationResponse>;
export type EndpointType = string;
export interface DescribeEndpointRequest {
  endpointType?: string;
}
export const DescribeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointType: S.optional(S.String).pipe(T.HttpQuery("endpointType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/endpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEndpointRequest",
}) as any as S.Schema<DescribeEndpointRequest>;
export type EndpointAddress = string;
export interface DescribeEndpointResponse {
  endpointAddress?: string;
}
export const DescribeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ endpointAddress: S.optional(S.String) }),
).annotate({
  identifier: "DescribeEndpointResponse",
}) as any as S.Schema<DescribeEndpointResponse>;
export interface DescribeEventConfigurationsRequest {}
export const DescribeEventConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/event-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEventConfigurationsRequest",
}) as any as S.Schema<DescribeEventConfigurationsRequest>;
export type EventType =
  | "THING"
  | "THING_GROUP"
  | "THING_TYPE"
  | "THING_GROUP_MEMBERSHIP"
  | "THING_GROUP_HIERARCHY"
  | "THING_TYPE_ASSOCIATION"
  | "JOB"
  | "JOB_EXECUTION"
  | "POLICY"
  | "CERTIFICATE"
  | "CA_CERTIFICATE"
  | (string & {});
export const EventType = S.String;

export interface Configuration {
  Enabled?: boolean;
}
export const Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export type EventConfigurations = { [key in EventType]?: Configuration };
export const EventConfigurations = /*@__PURE__*/ S.Record(
  EventType,
  Configuration.pipe(S.optional),
);
export type LastModifiedDate = Date;
export interface DescribeEventConfigurationsResponse {
  eventConfigurations?: { [key: string]: Configuration | undefined };
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const DescribeEventConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventConfigurations: S.optional(EventConfigurations),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeEventConfigurationsResponse",
}) as any as S.Schema<DescribeEventConfigurationsResponse>;
export interface DescribeFleetMetricRequest {
  metricName: string;
}
export const DescribeFleetMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metricName: S.String.pipe(T.HttpLabel("metricName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/fleet-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeFleetMetricRequest",
}) as any as S.Schema<DescribeFleetMetricRequest>;
export interface DescribeFleetMetricResponse {
  metricName?: string;
  queryString?: string;
  aggregationType?: AggregationType;
  period?: number;
  aggregationField?: string;
  description?: string;
  queryVersion?: string;
  indexName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  unit?: FleetMetricUnit;
  version?: number;
  metricArn?: string;
}
export const DescribeFleetMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    queryString: S.optional(S.String),
    aggregationType: S.optional(AggregationType),
    period: S.optional(S.Number),
    aggregationField: S.optional(S.String),
    description: S.optional(S.String),
    queryVersion: S.optional(S.String),
    indexName: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    unit: S.optional(FleetMetricUnit),
    version: S.optional(S.Number),
    metricArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeFleetMetricResponse",
}) as any as S.Schema<DescribeFleetMetricResponse>;
export interface DescribeIndexRequest {
  indexName: string;
}
export const DescribeIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ indexName: S.String.pipe(T.HttpLabel("indexName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/indices/{indexName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeIndexRequest",
}) as any as S.Schema<DescribeIndexRequest>;
export type IndexStatus = "ACTIVE" | "BUILDING" | "REBUILDING" | (string & {});
export const IndexStatus = S.String;

export type IndexSchema = string;
export interface DescribeIndexResponse {
  indexName?: string;
  indexStatus?: IndexStatus;
  schema?: string;
}
export const DescribeIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexName: S.optional(S.String),
    indexStatus: S.optional(IndexStatus),
    schema: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeIndexResponse",
}) as any as S.Schema<DescribeIndexResponse>;
export type BeforeSubstitutionFlag = boolean;
export interface DescribeJobRequest {
  jobId: string;
  beforeSubstitution?: boolean;
}
export const DescribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    beforeSubstitution: S.optional(S.Boolean).pipe(
      T.HttpQuery("beforeSubstitution"),
    ),
  }).pipe(
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
  identifier: "DescribeJobRequest",
}) as any as S.Schema<DescribeJobRequest>;
export type JobStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "COMPLETED"
  | "DELETION_IN_PROGRESS"
  | "SCHEDULED"
  | (string & {});
export const JobStatus = S.String;

export type Forced = boolean;
export type ProcessingTargetName = string;
export type ProcessingTargetNameList = string[];
export const ProcessingTargetNameList = /*@__PURE__*/ S.Array(S.String);
export type CanceledThings = number;
export type SucceededThings = number;
export type FailedThings = number;
export type RejectedThings = number;
export type QueuedThings = number;
export type InProgressThings = number;
export type RemovedThings = number;
export type TimedOutThings = number;
export interface JobProcessDetails {
  processingTargets?: string[];
  numberOfCanceledThings?: number;
  numberOfSucceededThings?: number;
  numberOfFailedThings?: number;
  numberOfRejectedThings?: number;
  numberOfQueuedThings?: number;
  numberOfInProgressThings?: number;
  numberOfRemovedThings?: number;
  numberOfTimedOutThings?: number;
}
export const JobProcessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    processingTargets: S.optional(ProcessingTargetNameList),
    numberOfCanceledThings: S.optional(S.Number),
    numberOfSucceededThings: S.optional(S.Number),
    numberOfFailedThings: S.optional(S.Number),
    numberOfRejectedThings: S.optional(S.Number),
    numberOfQueuedThings: S.optional(S.Number),
    numberOfInProgressThings: S.optional(S.Number),
    numberOfRemovedThings: S.optional(S.Number),
    numberOfTimedOutThings: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobProcessDetails",
}) as any as S.Schema<JobProcessDetails>;
export type BooleanWrapperObject = boolean;
export interface ScheduledJobRollout {
  startTime?: string;
}
export const ScheduledJobRollout = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTime: S.optional(S.String) }),
).annotate({
  identifier: "ScheduledJobRollout",
}) as any as S.Schema<ScheduledJobRollout>;
export type ScheduledJobRolloutList = ScheduledJobRollout[];
export const ScheduledJobRolloutList =
  /*@__PURE__*/ S.Array(ScheduledJobRollout);
export interface Job {
  jobArn?: string;
  jobId?: string;
  targetSelection?: TargetSelection;
  status?: JobStatus;
  forceCanceled?: boolean;
  reasonCode?: string;
  comment?: string;
  targets?: string[];
  description?: string;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  completedAt?: Date;
  jobProcessDetails?: JobProcessDetails;
  timeoutConfig?: TimeoutConfig;
  namespaceId?: string;
  jobTemplateArn?: string;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  documentParameters?: { [key: string]: string | undefined };
  isConcurrent?: boolean;
  schedulingConfig?: SchedulingConfig;
  scheduledJobRollouts?: ScheduledJobRollout[];
  destinationPackageVersions?: string[];
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    targetSelection: S.optional(TargetSelection),
    status: S.optional(JobStatus),
    forceCanceled: S.optional(S.Boolean),
    reasonCode: S.optional(S.String),
    comment: S.optional(S.String),
    targets: S.optional(JobTargets),
    description: S.optional(S.String),
    presignedUrlConfig: S.optional(PresignedUrlConfig),
    jobExecutionsRolloutConfig: S.optional(JobExecutionsRolloutConfig),
    abortConfig: S.optional(AbortConfig),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    jobProcessDetails: S.optional(JobProcessDetails),
    timeoutConfig: S.optional(TimeoutConfig),
    namespaceId: S.optional(S.String),
    jobTemplateArn: S.optional(S.String),
    jobExecutionsRetryConfig: S.optional(JobExecutionsRetryConfig),
    documentParameters: S.optional(ParameterMap),
    isConcurrent: S.optional(S.Boolean),
    schedulingConfig: S.optional(SchedulingConfig),
    scheduledJobRollouts: S.optional(ScheduledJobRolloutList),
    destinationPackageVersions: S.optional(DestinationPackageVersions),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export interface DescribeJobResponse {
  documentSource?: string;
  job?: Job;
}
export const DescribeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ documentSource: S.optional(S.String), job: S.optional(Job) }),
).annotate({
  identifier: "DescribeJobResponse",
}) as any as S.Schema<DescribeJobResponse>;
export interface DescribeJobExecutionRequest {
  jobId: string;
  thingName: string;
  executionNumber?: number;
}
export const DescribeJobExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    executionNumber: S.optional(S.Number).pipe(T.HttpQuery("executionNumber")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobExecutionRequest",
}) as any as S.Schema<DescribeJobExecutionRequest>;
export type JobExecutionStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "REJECTED"
  | "REMOVED"
  | "CANCELED"
  | (string & {});
export const JobExecutionStatus = S.String;

export interface JobExecutionStatusDetails {
  detailsMap?: { [key: string]: string | undefined };
}
export const JobExecutionStatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detailsMap: S.optional(DetailsMap) }),
).annotate({
  identifier: "JobExecutionStatusDetails",
}) as any as S.Schema<JobExecutionStatusDetails>;
export type VersionNumber = number;
export type ApproximateSecondsBeforeTimedOut = number;
export interface JobExecution {
  jobId?: string;
  status?: JobExecutionStatus;
  forceCanceled?: boolean;
  statusDetails?: JobExecutionStatusDetails;
  thingArn?: string;
  queuedAt?: Date;
  startedAt?: Date;
  lastUpdatedAt?: Date;
  executionNumber?: number;
  versionNumber?: number;
  approximateSecondsBeforeTimedOut?: number;
}
export const JobExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    status: S.optional(JobExecutionStatus),
    forceCanceled: S.optional(S.Boolean),
    statusDetails: S.optional(JobExecutionStatusDetails),
    thingArn: S.optional(S.String),
    queuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    executionNumber: S.optional(S.Number),
    versionNumber: S.optional(S.Number),
    approximateSecondsBeforeTimedOut: S.optional(S.Number),
  }),
).annotate({ identifier: "JobExecution" }) as any as S.Schema<JobExecution>;
export interface DescribeJobExecutionResponse {
  execution?: JobExecution;
}
export const DescribeJobExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ execution: S.optional(JobExecution) }),
).annotate({
  identifier: "DescribeJobExecutionResponse",
}) as any as S.Schema<DescribeJobExecutionResponse>;
export interface DescribeJobTemplateRequest {
  jobTemplateId: string;
}
export const DescribeJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobTemplateId: S.String.pipe(T.HttpLabel("jobTemplateId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/job-templates/{jobTemplateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeJobTemplateRequest",
}) as any as S.Schema<DescribeJobTemplateRequest>;
export interface DescribeJobTemplateResponse {
  jobTemplateArn?: string;
  jobTemplateId?: string;
  description?: string;
  documentSource?: string;
  document?: string;
  createdAt?: Date;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
  maintenanceWindows?: MaintenanceWindow[];
  destinationPackageVersions?: string[];
}
export const DescribeJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobTemplateArn: S.optional(S.String),
    jobTemplateId: S.optional(S.String),
    description: S.optional(S.String),
    documentSource: S.optional(S.String),
    document: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    presignedUrlConfig: S.optional(PresignedUrlConfig),
    jobExecutionsRolloutConfig: S.optional(JobExecutionsRolloutConfig),
    abortConfig: S.optional(AbortConfig),
    timeoutConfig: S.optional(TimeoutConfig),
    jobExecutionsRetryConfig: S.optional(JobExecutionsRetryConfig),
    maintenanceWindows: S.optional(MaintenanceWindows),
    destinationPackageVersions: S.optional(DestinationPackageVersions),
  }),
).annotate({
  identifier: "DescribeJobTemplateResponse",
}) as any as S.Schema<DescribeJobTemplateResponse>;
export type ManagedJobTemplateName = string;
export type ManagedTemplateVersion = string;
export interface DescribeManagedJobTemplateRequest {
  templateName: string;
  templateVersion?: string;
}
export const DescribeManagedJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String.pipe(T.HttpLabel("templateName")),
    templateVersion: S.optional(S.String).pipe(T.HttpQuery("templateVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-job-templates/{templateName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeManagedJobTemplateRequest",
}) as any as S.Schema<DescribeManagedJobTemplateRequest>;
export type Environment = string;
export type Environments = string[];
export const Environments = /*@__PURE__*/ S.Array(S.String);
export type Regex = string;
export type Example = string;
export type Optional = boolean;
export interface DocumentParameter {
  key?: string;
  description?: string;
  regex?: string;
  example?: string;
  optional?: boolean;
}
export const DocumentParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    description: S.optional(S.String),
    regex: S.optional(S.String),
    example: S.optional(S.String),
    optional: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DocumentParameter",
}) as any as S.Schema<DocumentParameter>;
export type DocumentParameters = DocumentParameter[];
export const DocumentParameters = /*@__PURE__*/ S.Array(DocumentParameter);
export interface DescribeManagedJobTemplateResponse {
  templateName?: string;
  templateArn?: string;
  description?: string;
  templateVersion?: string;
  environments?: string[];
  documentParameters?: DocumentParameter[];
  document?: string;
}
export const DescribeManagedJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.optional(S.String),
    templateArn: S.optional(S.String),
    description: S.optional(S.String),
    templateVersion: S.optional(S.String),
    environments: S.optional(Environments),
    documentParameters: S.optional(DocumentParameters),
    document: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeManagedJobTemplateResponse",
}) as any as S.Schema<DescribeManagedJobTemplateResponse>;
export interface DescribeMitigationActionRequest {
  actionName: string;
}
export const DescribeMitigationActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionName: S.String.pipe(T.HttpLabel("actionName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/mitigationactions/actions/{actionName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMitigationActionRequest",
}) as any as S.Schema<DescribeMitigationActionRequest>;
export type MitigationActionType =
  | "UPDATE_DEVICE_CERTIFICATE"
  | "UPDATE_CA_CERTIFICATE"
  | "ADD_THINGS_TO_THING_GROUP"
  | "REPLACE_DEFAULT_POLICY_VERSION"
  | "ENABLE_IOT_LOGGING"
  | "PUBLISH_FINDING_TO_SNS"
  | (string & {});
export const MitigationActionType = S.String;

export interface DescribeMitigationActionResponse {
  actionName?: string;
  actionType?: MitigationActionType;
  actionArn?: string;
  actionId?: string;
  roleArn?: string;
  actionParams?: MitigationActionParams;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const DescribeMitigationActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.optional(S.String),
    actionType: S.optional(MitigationActionType),
    actionArn: S.optional(S.String),
    actionId: S.optional(S.String),
    roleArn: S.optional(S.String),
    actionParams: S.optional(MitigationActionParams),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeMitigationActionResponse",
}) as any as S.Schema<DescribeMitigationActionResponse>;
export interface DescribeProvisioningTemplateRequest {
  templateName: string;
}
export const DescribeProvisioningTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateName: S.String.pipe(T.HttpLabel("templateName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/provisioning-templates/{templateName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProvisioningTemplateRequest",
}) as any as S.Schema<DescribeProvisioningTemplateRequest>;
export interface DescribeProvisioningTemplateResponse {
  templateArn?: string;
  templateName?: string;
  description?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  defaultVersionId?: number;
  templateBody?: string;
  enabled?: boolean;
  provisioningRoleArn?: string;
  preProvisioningHook?: ProvisioningHook;
  type?: TemplateType;
}
export const DescribeProvisioningTemplateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      templateArn: S.optional(S.String),
      templateName: S.optional(S.String),
      description: S.optional(S.String),
      creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      lastModifiedDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      defaultVersionId: S.optional(S.Number),
      templateBody: S.optional(S.String),
      enabled: S.optional(S.Boolean),
      provisioningRoleArn: S.optional(S.String),
      preProvisioningHook: S.optional(ProvisioningHook),
      type: S.optional(TemplateType),
    }),
).annotate({
  identifier: "DescribeProvisioningTemplateResponse",
}) as any as S.Schema<DescribeProvisioningTemplateResponse>;
export interface DescribeProvisioningTemplateVersionRequest {
  templateName: string;
  versionId: number;
}
export const DescribeProvisioningTemplateVersionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      templateName: S.String.pipe(T.HttpLabel("templateName")),
      versionId: S.Number.pipe(T.HttpLabel("versionId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/provisioning-templates/{templateName}/versions/{versionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeProvisioningTemplateVersionRequest",
  }) as any as S.Schema<DescribeProvisioningTemplateVersionRequest>;
export interface DescribeProvisioningTemplateVersionResponse {
  versionId?: number;
  creationDate?: Date;
  templateBody?: string;
  isDefaultVersion?: boolean;
}
export const DescribeProvisioningTemplateVersionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      versionId: S.optional(S.Number),
      creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      templateBody: S.optional(S.String),
      isDefaultVersion: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "DescribeProvisioningTemplateVersionResponse",
  }) as any as S.Schema<DescribeProvisioningTemplateVersionResponse>;
export interface DescribeRoleAliasRequest {
  roleAlias: string;
}
export const DescribeRoleAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleAlias: S.String.pipe(T.HttpLabel("roleAlias")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/role-aliases/{roleAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeRoleAliasRequest",
}) as any as S.Schema<DescribeRoleAliasRequest>;
export interface RoleAliasDescription {
  roleAlias?: string;
  roleAliasArn?: string;
  roleArn?: string;
  owner?: string;
  credentialDurationSeconds?: number;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const RoleAliasDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleAlias: S.optional(S.String),
    roleAliasArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    owner: S.optional(S.String),
    credentialDurationSeconds: S.optional(S.Number),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "RoleAliasDescription",
}) as any as S.Schema<RoleAliasDescription>;
export interface DescribeRoleAliasResponse {
  roleAliasDescription?: RoleAliasDescription;
}
export const DescribeRoleAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleAliasDescription: S.optional(RoleAliasDescription) }),
).annotate({
  identifier: "DescribeRoleAliasResponse",
}) as any as S.Schema<DescribeRoleAliasResponse>;
export interface DescribeScheduledAuditRequest {
  scheduledAuditName: string;
}
export const DescribeScheduledAuditRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/audit/scheduledaudits/{scheduledAuditName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScheduledAuditRequest",
}) as any as S.Schema<DescribeScheduledAuditRequest>;
export interface DescribeScheduledAuditResponse {
  frequency?: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
  targetCheckNames?: string[];
  scheduledAuditName?: string;
  scheduledAuditArn?: string;
}
export const DescribeScheduledAuditResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    frequency: S.optional(AuditFrequency),
    dayOfMonth: S.optional(S.String),
    dayOfWeek: S.optional(DayOfWeek),
    targetCheckNames: S.optional(TargetAuditCheckNames),
    scheduledAuditName: S.optional(S.String),
    scheduledAuditArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeScheduledAuditResponse",
}) as any as S.Schema<DescribeScheduledAuditResponse>;
export interface DescribeSecurityProfileRequest {
  securityProfileName: string;
}
export const DescribeSecurityProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/security-profiles/{securityProfileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSecurityProfileRequest",
}) as any as S.Schema<DescribeSecurityProfileRequest>;
export interface DescribeSecurityProfileResponse {
  securityProfileName?: string;
  securityProfileArn?: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  version?: number;
  creationDate?: Date;
  lastModifiedDate?: Date;
  metricsExportConfig?: MetricsExportConfig;
}
export const DescribeSecurityProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.optional(S.String),
    securityProfileArn: S.optional(S.String),
    securityProfileDescription: S.optional(S.String),
    behaviors: S.optional(Behaviors),
    alertTargets: S.optional(AlertTargets),
    additionalMetricsToRetain: S.optional(AdditionalMetricsToRetainList),
    additionalMetricsToRetainV2: S.optional(AdditionalMetricsToRetainV2List),
    version: S.optional(S.Number),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    metricsExportConfig: S.optional(MetricsExportConfig),
  }),
).annotate({
  identifier: "DescribeSecurityProfileResponse",
}) as any as S.Schema<DescribeSecurityProfileResponse>;
export interface DescribeStreamRequest {
  streamId: string;
}
export const DescribeStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamId: S.String.pipe(T.HttpLabel("streamId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/streams/{streamId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStreamRequest",
}) as any as S.Schema<DescribeStreamRequest>;
export interface StreamInfo {
  streamId?: string;
  streamArn?: string;
  streamVersion?: number;
  description?: string;
  files?: StreamFile[];
  createdAt?: Date;
  lastUpdatedAt?: Date;
  roleArn?: string;
}
export const StreamInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamId: S.optional(S.String),
    streamArn: S.optional(S.String),
    streamVersion: S.optional(S.Number),
    description: S.optional(S.String),
    files: S.optional(StreamFiles),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    roleArn: S.optional(S.String),
  }),
).annotate({ identifier: "StreamInfo" }) as any as S.Schema<StreamInfo>;
export interface DescribeStreamResponse {
  streamInfo?: StreamInfo;
}
export const DescribeStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamInfo: S.optional(StreamInfo) }),
).annotate({
  identifier: "DescribeStreamResponse",
}) as any as S.Schema<DescribeStreamResponse>;
export interface DescribeThingRequest {
  thingName: string;
}
export const DescribeThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ thingName: S.String.pipe(T.HttpLabel("thingName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeThingRequest",
}) as any as S.Schema<DescribeThingRequest>;
export interface DescribeThingResponse {
  defaultClientId?: string;
  thingName?: string;
  thingId?: string;
  thingArn?: string;
  thingTypeName?: string;
  attributes?: { [key: string]: string | undefined };
  version?: number;
  billingGroupName?: string;
}
export const DescribeThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultClientId: S.optional(S.String),
    thingName: S.optional(S.String),
    thingId: S.optional(S.String),
    thingArn: S.optional(S.String),
    thingTypeName: S.optional(S.String),
    attributes: S.optional(Attributes),
    version: S.optional(S.Number),
    billingGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeThingResponse",
}) as any as S.Schema<DescribeThingResponse>;
export interface DescribeThingGroupRequest {
  thingGroupName: string;
}
export const DescribeThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/thing-groups/{thingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeThingGroupRequest",
}) as any as S.Schema<DescribeThingGroupRequest>;
export interface GroupNameAndArn {
  groupName?: string;
  groupArn?: string;
}
export const GroupNameAndArn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupName: S.optional(S.String), groupArn: S.optional(S.String) }),
).annotate({
  identifier: "GroupNameAndArn",
}) as any as S.Schema<GroupNameAndArn>;
export type ThingGroupNameAndArnList = GroupNameAndArn[];
export const ThingGroupNameAndArnList = /*@__PURE__*/ S.Array(GroupNameAndArn);
export interface ThingGroupMetadata {
  parentGroupName?: string;
  rootToParentThingGroups?: GroupNameAndArn[];
  creationDate?: Date;
}
export const ThingGroupMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parentGroupName: S.optional(S.String),
    rootToParentThingGroups: S.optional(ThingGroupNameAndArnList),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ThingGroupMetadata",
}) as any as S.Schema<ThingGroupMetadata>;
export type DynamicGroupStatus =
  | "ACTIVE"
  | "BUILDING"
  | "REBUILDING"
  | (string & {});
export const DynamicGroupStatus = S.String;

export interface DescribeThingGroupResponse {
  thingGroupName?: string;
  thingGroupId?: string;
  thingGroupArn?: string;
  version?: number;
  thingGroupProperties?: ThingGroupProperties;
  thingGroupMetadata?: ThingGroupMetadata;
  indexName?: string;
  queryString?: string;
  queryVersion?: string;
  status?: DynamicGroupStatus;
}
export const DescribeThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.optional(S.String),
    thingGroupId: S.optional(S.String),
    thingGroupArn: S.optional(S.String),
    version: S.optional(S.Number),
    thingGroupProperties: S.optional(ThingGroupProperties),
    thingGroupMetadata: S.optional(ThingGroupMetadata),
    indexName: S.optional(S.String),
    queryString: S.optional(S.String),
    queryVersion: S.optional(S.String),
    status: S.optional(DynamicGroupStatus),
  }),
).annotate({
  identifier: "DescribeThingGroupResponse",
}) as any as S.Schema<DescribeThingGroupResponse>;
export type TaskId = string;
export interface DescribeThingRegistrationTaskRequest {
  taskId: string;
}
export const DescribeThingRegistrationTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/thing-registration-tasks/{taskId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeThingRegistrationTaskRequest",
}) as any as S.Schema<DescribeThingRegistrationTaskRequest>;
export type RegistryS3BucketName = string;
export type RegistryS3KeyName = string;
export type Status =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Cancelled"
  | "Cancelling"
  | (string & {});
export const Status = S.String;

export type Count = number;
export type Percentage = number;
export interface DescribeThingRegistrationTaskResponse {
  taskId?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  templateBody?: string;
  inputFileBucket?: string;
  inputFileKey?: string;
  roleArn?: string;
  status?: Status;
  message?: string;
  successCount?: number;
  failureCount?: number;
  percentageProgress?: number;
}
export const DescribeThingRegistrationTaskResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.optional(S.String),
      creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      lastModifiedDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      templateBody: S.optional(S.String),
      inputFileBucket: S.optional(S.String),
      inputFileKey: S.optional(S.String),
      roleArn: S.optional(S.String),
      status: S.optional(Status),
      message: S.optional(S.String),
      successCount: S.optional(S.Number),
      failureCount: S.optional(S.Number),
      percentageProgress: S.optional(S.Number),
    }),
).annotate({
  identifier: "DescribeThingRegistrationTaskResponse",
}) as any as S.Schema<DescribeThingRegistrationTaskResponse>;
export interface DescribeThingTypeRequest {
  thingTypeName: string;
}
export const DescribeThingTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/thing-types/{thingTypeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeThingTypeRequest",
}) as any as S.Schema<DescribeThingTypeRequest>;
export type DeprecationDate = Date;
export interface ThingTypeMetadata {
  deprecated?: boolean;
  deprecationDate?: Date;
  creationDate?: Date;
}
export const ThingTypeMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deprecated: S.optional(S.Boolean),
    deprecationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ThingTypeMetadata",
}) as any as S.Schema<ThingTypeMetadata>;
export interface DescribeThingTypeResponse {
  thingTypeName?: string;
  thingTypeId?: string;
  thingTypeArn?: string;
  thingTypeProperties?: ThingTypeProperties;
  thingTypeMetadata?: ThingTypeMetadata;
}
export const DescribeThingTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeName: S.optional(S.String),
    thingTypeId: S.optional(S.String),
    thingTypeArn: S.optional(S.String),
    thingTypeProperties: S.optional(ThingTypeProperties),
    thingTypeMetadata: S.optional(ThingTypeMetadata),
  }),
).annotate({
  identifier: "DescribeThingTypeResponse",
}) as any as S.Schema<DescribeThingTypeResponse>;
export interface DetachPolicyRequest {
  policyName: string;
  target: string;
}
export const DetachPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    target: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/target-policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachPolicyRequest",
}) as any as S.Schema<DetachPolicyRequest>;
export interface DetachPolicyResponse {}
export const DetachPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DetachPolicyResponse",
}) as any as S.Schema<DetachPolicyResponse>;
export interface DetachPrincipalPolicyRequest {
  policyName: string;
  principal: string;
}
export const DetachPrincipalPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    principal: S.String.pipe(T.HttpHeader("x-amzn-iot-principal")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/principal-policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachPrincipalPolicyRequest",
}) as any as S.Schema<DetachPrincipalPolicyRequest>;
export interface DetachPrincipalPolicyResponse {}
export const DetachPrincipalPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DetachPrincipalPolicyResponse",
}) as any as S.Schema<DetachPrincipalPolicyResponse>;
export interface DetachSecurityProfileRequest {
  securityProfileName: string;
  securityProfileTargetArn: string;
}
export const DetachSecurityProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
    securityProfileTargetArn: S.String.pipe(
      T.HttpQuery("securityProfileTargetArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/security-profiles/{securityProfileName}/targets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachSecurityProfileRequest",
}) as any as S.Schema<DetachSecurityProfileRequest>;
export interface DetachSecurityProfileResponse {}
export const DetachSecurityProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DetachSecurityProfileResponse",
}) as any as S.Schema<DetachSecurityProfileResponse>;
export interface DetachThingPrincipalRequest {
  thingName: string;
  principal: string;
}
export const DetachThingPrincipalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/things/{thingName}/principals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DetachThingPrincipalRequest",
}) as any as S.Schema<DetachThingPrincipalRequest>;
export interface DetachThingPrincipalResponse {}
export const DetachThingPrincipalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DetachThingPrincipalResponse",
}) as any as S.Schema<DetachThingPrincipalResponse>;
export interface DisableTopicRuleRequest {
  ruleName: string;
}
export const DisableTopicRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rules/{ruleName}/disable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableTopicRuleRequest",
}) as any as S.Schema<DisableTopicRuleRequest>;
export interface DisableTopicRuleResponse {}
export const DisableTopicRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableTopicRuleResponse",
}) as any as S.Schema<DisableTopicRuleResponse>;
export interface DisassociateSbomFromPackageVersionRequest {
  packageName: string;
  versionName: string;
  clientToken?: string;
}
export const DisassociateSbomFromPackageVersionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      packageName: S.String.pipe(T.HttpLabel("packageName")),
      versionName: S.String.pipe(T.HttpLabel("versionName")),
      clientToken: S.optional(S.String).pipe(
        T.HttpQuery("clientToken"),
        T.IdempotencyToken(),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/packages/{packageName}/versions/{versionName}/sbom",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateSbomFromPackageVersionRequest",
  }) as any as S.Schema<DisassociateSbomFromPackageVersionRequest>;
export interface DisassociateSbomFromPackageVersionResponse {}
export const DisassociateSbomFromPackageVersionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateSbomFromPackageVersionResponse",
  }) as any as S.Schema<DisassociateSbomFromPackageVersionResponse>;
export interface EnableTopicRuleRequest {
  ruleName: string;
}
export const EnableTopicRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/rules/{ruleName}/enable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableTopicRuleRequest",
}) as any as S.Schema<EnableTopicRuleRequest>;
export interface EnableTopicRuleResponse {}
export const EnableTopicRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableTopicRuleResponse",
}) as any as S.Schema<EnableTopicRuleResponse>;
export type TinyMaxResults = number;
export type NextToken = string;
export interface GetBehaviorModelTrainingSummariesRequest {
  securityProfileName?: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetBehaviorModelTrainingSummariesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      securityProfileName: S.optional(S.String).pipe(
        T.HttpQuery("securityProfileName"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/behavior-model-training/summaries" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetBehaviorModelTrainingSummariesRequest",
}) as any as S.Schema<GetBehaviorModelTrainingSummariesRequest>;
export type ModelStatus =
  | "PENDING_BUILD"
  | "ACTIVE"
  | "EXPIRED"
  | (string & {});
export const ModelStatus = S.String;

export type DataCollectionPercentage = number;
export interface BehaviorModelTrainingSummary {
  securityProfileName?: string;
  behaviorName?: string;
  trainingDataCollectionStartDate?: Date;
  modelStatus?: ModelStatus;
  datapointsCollectionPercentage?: number;
  lastModelRefreshDate?: Date;
}
export const BehaviorModelTrainingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.optional(S.String),
    behaviorName: S.optional(S.String),
    trainingDataCollectionStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    modelStatus: S.optional(ModelStatus),
    datapointsCollectionPercentage: S.optional(S.Number),
    lastModelRefreshDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BehaviorModelTrainingSummary",
}) as any as S.Schema<BehaviorModelTrainingSummary>;
export type BehaviorModelTrainingSummaries = BehaviorModelTrainingSummary[];
export const BehaviorModelTrainingSummaries = /*@__PURE__*/ S.Array(
  BehaviorModelTrainingSummary,
);
export interface GetBehaviorModelTrainingSummariesResponse {
  summaries?: BehaviorModelTrainingSummary[];
  nextToken?: string;
}
export const GetBehaviorModelTrainingSummariesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      summaries: S.optional(BehaviorModelTrainingSummaries),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetBehaviorModelTrainingSummariesResponse",
  }) as any as S.Schema<GetBehaviorModelTrainingSummariesResponse>;
export type MaxBuckets = number;
export interface TermsAggregation {
  maxBuckets?: number;
}
export const TermsAggregation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxBuckets: S.optional(S.Number) }),
).annotate({
  identifier: "TermsAggregation",
}) as any as S.Schema<TermsAggregation>;
export interface BucketsAggregationType {
  termsAggregation?: TermsAggregation;
}
export const BucketsAggregationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ termsAggregation: S.optional(TermsAggregation) }),
).annotate({
  identifier: "BucketsAggregationType",
}) as any as S.Schema<BucketsAggregationType>;
export interface GetBucketsAggregationRequest {
  indexName?: string;
  queryString: string;
  aggregationField: string;
  queryVersion?: string;
  bucketsAggregationType: BucketsAggregationType;
}
export const GetBucketsAggregationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexName: S.optional(S.String),
    queryString: S.String,
    aggregationField: S.String,
    queryVersion: S.optional(S.String),
    bucketsAggregationType: BucketsAggregationType,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/indices/buckets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBucketsAggregationRequest",
}) as any as S.Schema<GetBucketsAggregationRequest>;
export type BucketKeyValue = string;
export interface Bucket {
  keyValue?: string;
  count?: number;
}
export const Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyValue: S.optional(S.String), count: S.optional(S.Number) }),
).annotate({ identifier: "Bucket" }) as any as S.Schema<Bucket>;
export type Buckets = Bucket[];
export const Buckets = /*@__PURE__*/ S.Array(Bucket);
export interface GetBucketsAggregationResponse {
  totalCount?: number;
  buckets?: Bucket[];
}
export const GetBucketsAggregationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ totalCount: S.optional(S.Number), buckets: S.optional(Buckets) }),
).annotate({
  identifier: "GetBucketsAggregationResponse",
}) as any as S.Schema<GetBucketsAggregationResponse>;
export interface GetCardinalityRequest {
  indexName?: string;
  queryString: string;
  aggregationField?: string;
  queryVersion?: string;
}
export const GetCardinalityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexName: S.optional(S.String),
    queryString: S.String,
    aggregationField: S.optional(S.String),
    queryVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/indices/cardinality" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCardinalityRequest",
}) as any as S.Schema<GetCardinalityRequest>;
export interface GetCardinalityResponse {
  cardinality?: number;
}
export const GetCardinalityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cardinality: S.optional(S.Number) }),
).annotate({
  identifier: "GetCardinalityResponse",
}) as any as S.Schema<GetCardinalityResponse>;
export interface GetCommandRequest {
  commandId: string;
}
export const GetCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commandId: S.String.pipe(T.HttpLabel("commandId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/commands/{commandId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCommandRequest",
}) as any as S.Schema<GetCommandRequest>;
export type DeprecationFlag = boolean;
export interface GetCommandResponse {
  commandId?: string;
  commandArn?: string;
  namespace?: CommandNamespace;
  displayName?: string;
  description?: string;
  mandatoryParameters?: CommandParameter[];
  payload?: CommandPayload;
  payloadTemplate?: string;
  preprocessor?: CommandPreprocessor;
  roleArn?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  deprecated?: boolean;
  pendingDeletion?: boolean;
}
export const GetCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandId: S.optional(S.String),
    commandArn: S.optional(S.String),
    namespace: S.optional(CommandNamespace),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    mandatoryParameters: S.optional(CommandParameterList),
    payload: S.optional(CommandPayload),
    payloadTemplate: S.optional(S.String),
    preprocessor: S.optional(CommandPreprocessor),
    roleArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deprecated: S.optional(S.Boolean),
    pendingDeletion: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetCommandResponse",
}) as any as S.Schema<GetCommandResponse>;
export interface GetCommandExecutionRequest {
  executionId: string;
  targetArn: string;
  includeResult?: boolean;
}
export const GetCommandExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.String.pipe(T.HttpLabel("executionId")),
    targetArn: S.String.pipe(T.HttpQuery("targetArn")),
    includeResult: S.optional(S.Boolean).pipe(T.HttpQuery("includeResult")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/command-executions/{executionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCommandExecutionRequest",
}) as any as S.Schema<GetCommandExecutionRequest>;
export type CommandExecutionStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "REJECTED"
  | "TIMED_OUT"
  | (string & {});
export const CommandExecutionStatus = S.String;

export type StatusReasonCode = string;
export type StatusReasonDescription = string;
export interface StatusReason {
  reasonCode: string;
  reasonDescription?: string;
}
export const StatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reasonCode: S.String, reasonDescription: S.optional(S.String) }),
).annotate({ identifier: "StatusReason" }) as any as S.Schema<StatusReason>;
export type CommandExecutionResultName = string;
export type StringCommandExecutionResult = string;
export type BooleanCommandExecutionResult = boolean;
export type BinaryCommandExecutionResult = Uint8Array;
export interface CommandExecutionResult {
  S?: string;
  B?: boolean;
  BIN?: Uint8Array;
}
export const CommandExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S: S.optional(S.String),
    B: S.optional(S.Boolean),
    BIN: S.optional(T.Blob),
  }),
).annotate({
  identifier: "CommandExecutionResult",
}) as any as S.Schema<CommandExecutionResult>;
export type CommandExecutionResultMap = {
  [key: string]: CommandExecutionResult | undefined;
};
export const CommandExecutionResultMap = /*@__PURE__*/ S.Record(
  S.String,
  CommandExecutionResult.pipe(S.optional),
);
export type CommandExecutionParameterMap = {
  [key: string]: CommandParameterValue | undefined;
};
export const CommandExecutionParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  CommandParameterValue.pipe(S.optional),
);
export type CommandExecutionTimeoutInSeconds = number;
export interface GetCommandExecutionResponse {
  executionId?: string;
  commandArn?: string;
  targetArn?: string;
  status?: CommandExecutionStatus;
  statusReason?: StatusReason;
  result?: { [key: string]: CommandExecutionResult | undefined };
  parameters?: { [key: string]: CommandParameterValue | undefined };
  executionTimeoutSeconds?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  timeToLive?: Date;
}
export const GetCommandExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.optional(S.String),
    commandArn: S.optional(S.String),
    targetArn: S.optional(S.String),
    status: S.optional(CommandExecutionStatus),
    statusReason: S.optional(StatusReason),
    result: S.optional(CommandExecutionResultMap),
    parameters: S.optional(CommandExecutionParameterMap),
    executionTimeoutSeconds: S.optional(S.Number),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    timeToLive: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetCommandExecutionResponse",
}) as any as S.Schema<GetCommandExecutionResponse>;
export interface GetEffectivePoliciesRequest {
  principal?: string;
  cognitoIdentityPoolId?: string;
  thingName?: string;
}
export const GetEffectivePoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(S.String),
    cognitoIdentityPoolId: S.optional(S.String),
    thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/effective-policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEffectivePoliciesRequest",
}) as any as S.Schema<GetEffectivePoliciesRequest>;
export interface EffectivePolicy {
  policyName?: string;
  policyArn?: string;
  policyDocument?: string;
}
export const EffectivePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
    policyDocument: S.optional(S.String),
  }),
).annotate({
  identifier: "EffectivePolicy",
}) as any as S.Schema<EffectivePolicy>;
export type EffectivePolicies = EffectivePolicy[];
export const EffectivePolicies = /*@__PURE__*/ S.Array(EffectivePolicy);
export interface GetEffectivePoliciesResponse {
  effectivePolicies?: EffectivePolicy[];
}
export const GetEffectivePoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ effectivePolicies: S.optional(EffectivePolicies) }),
).annotate({
  identifier: "GetEffectivePoliciesResponse",
}) as any as S.Schema<GetEffectivePoliciesResponse>;
export interface GetIndexingConfigurationRequest {}
export const GetIndexingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/indexing/config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIndexingConfigurationRequest",
}) as any as S.Schema<GetIndexingConfigurationRequest>;
export type ThingIndexingMode =
  | "OFF"
  | "REGISTRY"
  | "REGISTRY_AND_SHADOW"
  | (string & {});
export const ThingIndexingMode = S.String;

export type ThingConnectivityIndexingMode = "OFF" | "STATUS" | (string & {});
export const ThingConnectivityIndexingMode = S.String;

export type DeviceDefenderIndexingMode = "OFF" | "VIOLATIONS" | (string & {});
export const DeviceDefenderIndexingMode = S.String;

export type NamedShadowIndexingMode = "OFF" | "ON" | (string & {});
export const NamedShadowIndexingMode = S.String;

export type FieldName = string;
export type FieldType = "Number" | "String" | "Boolean" | (string & {});
export const FieldType = S.String;

export interface Field {
  name?: string;
  type?: FieldType;
}
export const Field = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), type: S.optional(FieldType) }),
).annotate({ identifier: "Field" }) as any as S.Schema<Field>;
export type Fields = Field[];
export const Fields = /*@__PURE__*/ S.Array(Field);
export type ShadowName = string;
export type NamedShadowNamesFilter = string[];
export const NamedShadowNamesFilter = /*@__PURE__*/ S.Array(S.String);
export type TargetFieldName = string;
export type TargetFieldOrder = "LatLon" | "LonLat" | (string & {});
export const TargetFieldOrder = S.String;

export interface GeoLocationTarget {
  name?: string;
  order?: TargetFieldOrder;
}
export const GeoLocationTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), order: S.optional(TargetFieldOrder) }),
).annotate({
  identifier: "GeoLocationTarget",
}) as any as S.Schema<GeoLocationTarget>;
export type GeoLocationsFilter = GeoLocationTarget[];
export const GeoLocationsFilter = /*@__PURE__*/ S.Array(GeoLocationTarget);
export type FleetIndexingApi = "GET_THING_CONNECTIVITY_DATA" | (string & {});
export const FleetIndexingApi = S.String;

export type FleetIndexingApiList = FleetIndexingApi[];
export const FleetIndexingApiList = /*@__PURE__*/ S.Array(FleetIndexingApi);
export interface ConnectivityFilter {
  includeSocketInformation?: FleetIndexingApi[];
}
export const ConnectivityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ includeSocketInformation: S.optional(FleetIndexingApiList) }),
).annotate({
  identifier: "ConnectivityFilter",
}) as any as S.Schema<ConnectivityFilter>;
export interface IndexingFilter {
  namedShadowNames?: string[];
  geoLocations?: GeoLocationTarget[];
  connectivity?: ConnectivityFilter;
}
export const IndexingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    namedShadowNames: S.optional(NamedShadowNamesFilter),
    geoLocations: S.optional(GeoLocationsFilter),
    connectivity: S.optional(ConnectivityFilter),
  }),
).annotate({ identifier: "IndexingFilter" }) as any as S.Schema<IndexingFilter>;
export interface ThingIndexingConfiguration {
  thingIndexingMode: ThingIndexingMode;
  thingConnectivityIndexingMode?: ThingConnectivityIndexingMode;
  deviceDefenderIndexingMode?: DeviceDefenderIndexingMode;
  namedShadowIndexingMode?: NamedShadowIndexingMode;
  managedFields?: Field[];
  customFields?: Field[];
  filter?: IndexingFilter;
}
export const ThingIndexingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingIndexingMode: ThingIndexingMode,
    thingConnectivityIndexingMode: S.optional(ThingConnectivityIndexingMode),
    deviceDefenderIndexingMode: S.optional(DeviceDefenderIndexingMode),
    namedShadowIndexingMode: S.optional(NamedShadowIndexingMode),
    managedFields: S.optional(Fields),
    customFields: S.optional(Fields),
    filter: S.optional(IndexingFilter),
  }),
).annotate({
  identifier: "ThingIndexingConfiguration",
}) as any as S.Schema<ThingIndexingConfiguration>;
export type ThingGroupIndexingMode = "OFF" | "ON" | (string & {});
export const ThingGroupIndexingMode = S.String;

export interface ThingGroupIndexingConfiguration {
  thingGroupIndexingMode: ThingGroupIndexingMode;
  managedFields?: Field[];
  customFields?: Field[];
}
export const ThingGroupIndexingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupIndexingMode: ThingGroupIndexingMode,
    managedFields: S.optional(Fields),
    customFields: S.optional(Fields),
  }),
).annotate({
  identifier: "ThingGroupIndexingConfiguration",
}) as any as S.Schema<ThingGroupIndexingConfiguration>;
export interface GetIndexingConfigurationResponse {
  thingIndexingConfiguration?: ThingIndexingConfiguration;
  thingGroupIndexingConfiguration?: ThingGroupIndexingConfiguration;
}
export const GetIndexingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingIndexingConfiguration: S.optional(ThingIndexingConfiguration),
    thingGroupIndexingConfiguration: S.optional(
      ThingGroupIndexingConfiguration,
    ),
  }),
).annotate({
  identifier: "GetIndexingConfigurationResponse",
}) as any as S.Schema<GetIndexingConfigurationResponse>;
export interface GetJobDocumentRequest {
  jobId: string;
  beforeSubstitution?: boolean;
}
export const GetJobDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    beforeSubstitution: S.optional(S.Boolean).pipe(
      T.HttpQuery("beforeSubstitution"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{jobId}/job-document" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJobDocumentRequest",
}) as any as S.Schema<GetJobDocumentRequest>;
export interface GetJobDocumentResponse {
  document?: string;
}
export const GetJobDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ document: S.optional(S.String) }),
).annotate({
  identifier: "GetJobDocumentResponse",
}) as any as S.Schema<GetJobDocumentResponse>;
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
export interface GetLoggingOptionsResponse {
  roleArn?: string;
  logLevel?: LogLevel;
}
export const GetLoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.optional(S.String), logLevel: S.optional(LogLevel) }),
).annotate({
  identifier: "GetLoggingOptionsResponse",
}) as any as S.Schema<GetLoggingOptionsResponse>;
export interface GetOTAUpdateRequest {
  otaUpdateId: string;
}
export const GetOTAUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ otaUpdateId: S.String.pipe(T.HttpLabel("otaUpdateId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/otaUpdates/{otaUpdateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOTAUpdateRequest",
}) as any as S.Schema<GetOTAUpdateRequest>;
export type Code = string;
export type OTAUpdateErrorMessage = string;
export interface ErrorInfo {
  code?: string;
  message?: string;
}
export const ErrorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "ErrorInfo" }) as any as S.Schema<ErrorInfo>;
export interface OTAUpdateInfo {
  otaUpdateId?: string;
  otaUpdateArn?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  description?: string;
  targets?: string[];
  protocols?: Protocol[];
  awsJobExecutionsRolloutConfig?: AwsJobExecutionsRolloutConfig;
  awsJobPresignedUrlConfig?: AwsJobPresignedUrlConfig;
  targetSelection?: TargetSelection;
  otaUpdateFiles?: OTAUpdateFile[];
  otaUpdateStatus?: OTAUpdateStatus;
  awsIotJobId?: string;
  awsIotJobArn?: string;
  errorInfo?: ErrorInfo;
  additionalParameters?: { [key: string]: string | undefined };
}
export const OTAUpdateInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    otaUpdateId: S.optional(S.String),
    otaUpdateArn: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    description: S.optional(S.String),
    targets: S.optional(Targets),
    protocols: S.optional(Protocols),
    awsJobExecutionsRolloutConfig: S.optional(AwsJobExecutionsRolloutConfig),
    awsJobPresignedUrlConfig: S.optional(AwsJobPresignedUrlConfig),
    targetSelection: S.optional(TargetSelection),
    otaUpdateFiles: S.optional(OTAUpdateFiles),
    otaUpdateStatus: S.optional(OTAUpdateStatus),
    awsIotJobId: S.optional(S.String),
    awsIotJobArn: S.optional(S.String),
    errorInfo: S.optional(ErrorInfo),
    additionalParameters: S.optional(AdditionalParameterMap),
  }),
).annotate({ identifier: "OTAUpdateInfo" }) as any as S.Schema<OTAUpdateInfo>;
export interface GetOTAUpdateResponse {
  otaUpdateInfo?: OTAUpdateInfo;
}
export const GetOTAUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ otaUpdateInfo: S.optional(OTAUpdateInfo) }),
).annotate({
  identifier: "GetOTAUpdateResponse",
}) as any as S.Schema<GetOTAUpdateResponse>;
export interface GetPackageRequest {
  packageName: string;
}
export const GetPackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageName: S.String.pipe(T.HttpLabel("packageName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/{packageName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPackageRequest",
}) as any as S.Schema<GetPackageRequest>;
export interface GetPackageResponse {
  packageName?: string;
  packageArn?: string;
  description?: string | redacted.Redacted<string>;
  defaultVersionName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const GetPackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.optional(S.String),
    packageArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    defaultVersionName: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetPackageResponse",
}) as any as S.Schema<GetPackageResponse>;
export interface GetPackageConfigurationRequest {}
export const GetPackageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/package-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPackageConfigurationRequest",
}) as any as S.Schema<GetPackageConfigurationRequest>;
export type EnabledBoolean = boolean;
export interface VersionUpdateByJobsConfig {
  enabled?: boolean;
  roleArn?: string;
}
export const VersionUpdateByJobsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.optional(S.Boolean), roleArn: S.optional(S.String) }),
).annotate({
  identifier: "VersionUpdateByJobsConfig",
}) as any as S.Schema<VersionUpdateByJobsConfig>;
export interface GetPackageConfigurationResponse {
  versionUpdateByJobsConfig?: VersionUpdateByJobsConfig;
}
export const GetPackageConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionUpdateByJobsConfig: S.optional(VersionUpdateByJobsConfig),
  }),
).annotate({
  identifier: "GetPackageConfigurationResponse",
}) as any as S.Schema<GetPackageConfigurationResponse>;
export interface GetPackageVersionRequest {
  packageName: string;
  versionName: string;
}
export const GetPackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/packages/{packageName}/versions/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPackageVersionRequest",
}) as any as S.Schema<GetPackageVersionRequest>;
export interface GetPackageVersionResponse {
  packageVersionArn?: string;
  packageName?: string;
  versionName?: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  artifact?: PackageVersionArtifact;
  status?: PackageVersionStatus;
  errorReason?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  sbom?: Sbom;
  sbomValidationStatus?: SbomValidationStatus;
  recipe?: string | redacted.Redacted<string>;
}
export const GetPackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageVersionArn: S.optional(S.String),
    packageName: S.optional(S.String),
    versionName: S.optional(S.String),
    description: S.optional(SensitiveString),
    attributes: S.optional(ResourceAttributes),
    artifact: S.optional(PackageVersionArtifact),
    status: S.optional(PackageVersionStatus),
    errorReason: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    sbom: S.optional(Sbom),
    sbomValidationStatus: S.optional(SbomValidationStatus),
    recipe: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "GetPackageVersionResponse",
}) as any as S.Schema<GetPackageVersionResponse>;
export type Percent = number;
export type PercentList = number[];
export const PercentList = /*@__PURE__*/ S.Array(S.Number);
export interface GetPercentilesRequest {
  indexName?: string;
  queryString: string;
  aggregationField?: string;
  queryVersion?: string;
  percents?: number[];
}
export const GetPercentilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexName: S.optional(S.String),
    queryString: S.String,
    aggregationField: S.optional(S.String),
    queryVersion: S.optional(S.String),
    percents: S.optional(PercentList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/indices/percentiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPercentilesRequest",
}) as any as S.Schema<GetPercentilesRequest>;
export type PercentValue = number;
export interface PercentPair {
  percent?: number;
  value?: number;
}
export const PercentPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ percent: S.optional(S.Number), value: S.optional(S.Number) }),
).annotate({ identifier: "PercentPair" }) as any as S.Schema<PercentPair>;
export type Percentiles = PercentPair[];
export const Percentiles = /*@__PURE__*/ S.Array(PercentPair);
export interface GetPercentilesResponse {
  percentiles?: PercentPair[];
}
export const GetPercentilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ percentiles: S.optional(Percentiles) }),
).annotate({
  identifier: "GetPercentilesResponse",
}) as any as S.Schema<GetPercentilesResponse>;
export interface GetPolicyRequest {
  policyName: string;
}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policies/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyRequest",
}) as any as S.Schema<GetPolicyRequest>;
export interface GetPolicyResponse {
  policyName?: string;
  policyArn?: string;
  policyDocument?: string;
  defaultVersionId?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  generationId?: string;
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
    policyDocument: S.optional(S.String),
    defaultVersionId: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    generationId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetPolicyVersionRequest {
  policyName: string;
  policyVersionId: string;
}
export const GetPolicyVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    policyVersionId: S.String.pipe(T.HttpLabel("policyVersionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/policies/{policyName}/version/{policyVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyVersionRequest",
}) as any as S.Schema<GetPolicyVersionRequest>;
export interface GetPolicyVersionResponse {
  policyArn?: string;
  policyName?: string;
  policyDocument?: string;
  policyVersionId?: string;
  isDefaultVersion?: boolean;
  creationDate?: Date;
  lastModifiedDate?: Date;
  generationId?: string;
}
export const GetPolicyVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyArn: S.optional(S.String),
    policyName: S.optional(S.String),
    policyDocument: S.optional(S.String),
    policyVersionId: S.optional(S.String),
    isDefaultVersion: S.optional(S.Boolean),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    generationId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPolicyVersionResponse",
}) as any as S.Schema<GetPolicyVersionResponse>;
export interface GetRegistrationCodeRequest {}
export const GetRegistrationCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/registrationcode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegistrationCodeRequest",
}) as any as S.Schema<GetRegistrationCodeRequest>;
export type RegistrationCode = string;
export interface GetRegistrationCodeResponse {
  registrationCode?: string;
}
export const GetRegistrationCodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registrationCode: S.optional(S.String) }),
).annotate({
  identifier: "GetRegistrationCodeResponse",
}) as any as S.Schema<GetRegistrationCodeResponse>;
export interface GetStatisticsRequest {
  indexName?: string;
  queryString: string;
  aggregationField?: string;
  queryVersion?: string;
}
export const GetStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexName: S.optional(S.String),
    queryString: S.String,
    aggregationField: S.optional(S.String),
    queryVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/indices/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStatisticsRequest",
}) as any as S.Schema<GetStatisticsRequest>;
export type Average = number;
export type Sum = number;
export type Minimum = number;
export type Maximum = number;
export type SumOfSquares = number;
export type Variance = number;
export type StdDeviation = number;
export interface Statistics {
  count?: number;
  average?: number;
  sum?: number;
  minimum?: number;
  maximum?: number;
  sumOfSquares?: number;
  variance?: number;
  stdDeviation?: number;
}
export const Statistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    count: S.optional(S.Number),
    average: S.optional(S.Number),
    sum: S.optional(S.Number),
    minimum: S.optional(S.Number),
    maximum: S.optional(S.Number),
    sumOfSquares: S.optional(S.Number),
    variance: S.optional(S.Number),
    stdDeviation: S.optional(S.Number),
  }),
).annotate({ identifier: "Statistics" }) as any as S.Schema<Statistics>;
export interface GetStatisticsResponse {
  statistics?: Statistics;
}
export const GetStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statistics: S.optional(Statistics) }),
).annotate({
  identifier: "GetStatisticsResponse",
}) as any as S.Schema<GetStatisticsResponse>;
export type ConnectivityApiThingName = string | redacted.Redacted<string>;
export interface GetThingConnectivityDataRequest {
  thingName: string | redacted.Redacted<string>;
  includeSocketInformation?: boolean;
}
export const GetThingConnectivityDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: SensitiveString.pipe(T.HttpLabel("thingName")),
    includeSocketInformation: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/things/{thingName}/connectivity-data" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThingConnectivityDataRequest",
}) as any as S.Schema<GetThingConnectivityDataRequest>;
export type DisconnectReasonValue =
  | "AUTH_ERROR"
  | "CLIENT_INITIATED_DISCONNECT"
  | "CLIENT_ERROR"
  | "CONNECTION_LOST"
  | "DUPLICATE_CLIENTID"
  | "FORBIDDEN_ACCESS"
  | "MQTT_KEEP_ALIVE_TIMEOUT"
  | "SERVER_ERROR"
  | "SERVER_INITIATED_DISCONNECT"
  | "API_INITIATED_DISCONNECT"
  | "THROTTLED"
  | "WEBSOCKET_TTL_EXPIRATION"
  | "CUSTOMAUTH_TTL_EXPIRATION"
  | "UNKNOWN"
  | "NONE"
  | (string & {});
export const DisconnectReasonValue = S.String;

export type SourceIp = string | redacted.Redacted<string>;
export type SourcePort = number;
export type TargetIp = string | redacted.Redacted<string>;
export type TargetPort = number;
export type VpcEndpointId = string | redacted.Redacted<string>;
export type KeepAliveDuration = number;
export type SessionExpiry = number;
export interface GetThingConnectivityDataResponse {
  thingName?: string | redacted.Redacted<string>;
  connected?: boolean;
  timestamp?: Date;
  disconnectReason?: DisconnectReasonValue;
  sourceIp?: string | redacted.Redacted<string>;
  sourcePort?: number;
  targetIp?: string | redacted.Redacted<string>;
  targetPort?: number;
  vpcEndpointId?: string | redacted.Redacted<string>;
  keepAliveDuration?: number;
  cleanSession?: boolean;
  sessionExpiry?: number;
  clientId?: string;
}
export const GetThingConnectivityDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(SensitiveString),
    connected: S.optional(S.Boolean),
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    disconnectReason: S.optional(DisconnectReasonValue),
    sourceIp: S.optional(SensitiveString),
    sourcePort: S.optional(S.Number),
    targetIp: S.optional(SensitiveString),
    targetPort: S.optional(S.Number),
    vpcEndpointId: S.optional(SensitiveString),
    keepAliveDuration: S.optional(S.Number),
    cleanSession: S.optional(S.Boolean),
    sessionExpiry: S.optional(S.Number),
    clientId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetThingConnectivityDataResponse",
}) as any as S.Schema<GetThingConnectivityDataResponse>;
export interface GetTopicRuleRequest {
  ruleName: string;
}
export const GetTopicRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleName: S.String.pipe(T.HttpLabel("ruleName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rules/{ruleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTopicRuleRequest",
}) as any as S.Schema<GetTopicRuleRequest>;
export type RuleArn = string;
export interface TopicRule {
  ruleName?: string;
  sql?: string;
  description?: string;
  createdAt?: Date;
  actions?: Action[];
  ruleDisabled?: boolean;
  awsIotSqlVersion?: string;
  errorAction?: Action;
}
export const TopicRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleName: S.optional(S.String),
    sql: S.optional(S.String),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    actions: S.optional(ActionList),
    ruleDisabled: S.optional(S.Boolean),
    awsIotSqlVersion: S.optional(S.String),
    errorAction: S.optional(Action),
  }),
).annotate({ identifier: "TopicRule" }) as any as S.Schema<TopicRule>;
export interface GetTopicRuleResponse {
  ruleArn?: string;
  rule?: TopicRule;
}
export const GetTopicRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleArn: S.optional(S.String), rule: S.optional(TopicRule) }),
).annotate({
  identifier: "GetTopicRuleResponse",
}) as any as S.Schema<GetTopicRuleResponse>;
export interface GetTopicRuleDestinationRequest {
  arn: string;
}
export const GetTopicRuleDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/destinations/{arn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTopicRuleDestinationRequest",
}) as any as S.Schema<GetTopicRuleDestinationRequest>;
export interface GetTopicRuleDestinationResponse {
  topicRuleDestination?: TopicRuleDestination;
}
export const GetTopicRuleDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topicRuleDestination: S.optional(TopicRuleDestination) }),
).annotate({
  identifier: "GetTopicRuleDestinationResponse",
}) as any as S.Schema<GetTopicRuleDestinationResponse>;
export type VerboseFlag = boolean;
export interface GetV2LoggingOptionsRequest {
  verbose?: boolean;
}
export const GetV2LoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    verbose: S.optional(S.Boolean).pipe(T.HttpQuery("verbose")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2LoggingOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetV2LoggingOptionsRequest",
}) as any as S.Schema<GetV2LoggingOptionsRequest>;
export type DisableAllLogs = boolean;
export type LogEventType = string;
export type LogDestination = string;
export interface LogEventConfiguration {
  eventType: string;
  logLevel?: LogLevel;
  logDestination?: string;
}
export const LogEventConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventType: S.String,
    logLevel: S.optional(LogLevel),
    logDestination: S.optional(S.String),
  }),
).annotate({
  identifier: "LogEventConfiguration",
}) as any as S.Schema<LogEventConfiguration>;
export type LogEventConfigurations = LogEventConfiguration[];
export const LogEventConfigurations = /*@__PURE__*/ S.Array(
  LogEventConfiguration,
);
export interface GetV2LoggingOptionsResponse {
  roleArn?: string;
  defaultLogLevel?: LogLevel;
  disableAllLogs?: boolean;
  eventConfigurations?: LogEventConfiguration[];
}
export const GetV2LoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.optional(S.String),
    defaultLogLevel: S.optional(LogLevel),
    disableAllLogs: S.optional(S.Boolean),
    eventConfigurations: S.optional(LogEventConfigurations),
  }),
).annotate({
  identifier: "GetV2LoggingOptionsResponse",
}) as any as S.Schema<GetV2LoggingOptionsResponse>;
export type DeviceDefenderThingName = string;
export type BehaviorCriteriaType =
  | "STATIC"
  | "STATISTICAL"
  | "MACHINE_LEARNING"
  | (string & {});
export const BehaviorCriteriaType = S.String;

export type ListSuppressedAlerts = boolean;
export type VerificationState =
  | "FALSE_POSITIVE"
  | "BENIGN_POSITIVE"
  | "TRUE_POSITIVE"
  | "UNKNOWN"
  | (string & {});
export const VerificationState = S.String;

export type MaxResults = number;
export interface ListActiveViolationsRequest {
  thingName?: string;
  securityProfileName?: string;
  behaviorCriteriaType?: BehaviorCriteriaType;
  listSuppressedAlerts?: boolean;
  verificationState?: VerificationState;
  nextToken?: string;
  maxResults?: number;
}
export const ListActiveViolationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
    securityProfileName: S.optional(S.String).pipe(
      T.HttpQuery("securityProfileName"),
    ),
    behaviorCriteriaType: S.optional(BehaviorCriteriaType).pipe(
      T.HttpQuery("behaviorCriteriaType"),
    ),
    listSuppressedAlerts: S.optional(S.Boolean).pipe(
      T.HttpQuery("listSuppressedAlerts"),
    ),
    verificationState: S.optional(VerificationState).pipe(
      T.HttpQuery("verificationState"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/active-violations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListActiveViolationsRequest",
}) as any as S.Schema<ListActiveViolationsRequest>;
export interface ViolationEventAdditionalInfo {
  confidenceLevel?: ConfidenceLevel;
}
export const ViolationEventAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ confidenceLevel: S.optional(ConfidenceLevel) }),
).annotate({
  identifier: "ViolationEventAdditionalInfo",
}) as any as S.Schema<ViolationEventAdditionalInfo>;
export type VerificationStateDescription = string;
export interface ActiveViolation {
  violationId?: string;
  thingName?: string;
  securityProfileName?: string;
  behavior?: Behavior;
  lastViolationValue?: MetricValue;
  violationEventAdditionalInfo?: ViolationEventAdditionalInfo;
  verificationState?: VerificationState;
  verificationStateDescription?: string;
  lastViolationTime?: Date;
  violationStartTime?: Date;
}
export const ActiveViolation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    violationId: S.optional(S.String),
    thingName: S.optional(S.String),
    securityProfileName: S.optional(S.String),
    behavior: S.optional(Behavior),
    lastViolationValue: S.optional(MetricValue),
    violationEventAdditionalInfo: S.optional(ViolationEventAdditionalInfo),
    verificationState: S.optional(VerificationState),
    verificationStateDescription: S.optional(S.String),
    lastViolationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    violationStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ActiveViolation",
}) as any as S.Schema<ActiveViolation>;
export type ActiveViolations = ActiveViolation[];
export const ActiveViolations = /*@__PURE__*/ S.Array(ActiveViolation);
export interface ListActiveViolationsResponse {
  activeViolations?: ActiveViolation[];
  nextToken?: string;
}
export const ListActiveViolationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeViolations: S.optional(ActiveViolations),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListActiveViolationsResponse",
}) as any as S.Schema<ListActiveViolationsResponse>;
export type Recursive = boolean;
export type Marker = string;
export type PageSize = number;
export interface ListAttachedPoliciesRequest {
  target: string;
  recursive?: boolean;
  marker?: string;
  pageSize?: number;
}
export const ListAttachedPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    target: S.String.pipe(T.HttpLabel("target")),
    recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/attached-policies/{target}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttachedPoliciesRequest",
}) as any as S.Schema<ListAttachedPoliciesRequest>;
export interface Policy {
  policyName?: string;
  policyArn?: string;
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.optional(S.String),
    policyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export type Policies = Policy[];
export const Policies = /*@__PURE__*/ S.Array(Policy);
export interface ListAttachedPoliciesResponse {
  policies?: Policy[];
  nextMarker?: string;
}
export const ListAttachedPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policies: S.optional(Policies),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttachedPoliciesResponse",
}) as any as S.Schema<ListAttachedPoliciesResponse>;
export type ListSuppressedFindings = boolean;
export interface ListAuditFindingsRequest {
  taskId?: string;
  checkName?: string;
  resourceIdentifier?: ResourceIdentifier;
  maxResults?: number;
  nextToken?: string;
  startTime?: Date;
  endTime?: Date;
  listSuppressedFindings?: boolean;
}
export const ListAuditFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    checkName: S.optional(S.String),
    resourceIdentifier: S.optional(ResourceIdentifier),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    listSuppressedFindings: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/findings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAuditFindingsRequest",
}) as any as S.Schema<ListAuditFindingsRequest>;
export type AuditFindings = AuditFinding[];
export const AuditFindings = /*@__PURE__*/ S.Array(AuditFinding);
export interface ListAuditFindingsResponse {
  findings?: AuditFinding[];
  nextToken?: string;
}
export const ListAuditFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findings: S.optional(AuditFindings),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAuditFindingsResponse",
}) as any as S.Schema<ListAuditFindingsResponse>;
export type AuditMitigationActionsExecutionStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELED"
  | "SKIPPED"
  | "PENDING"
  | (string & {});
export const AuditMitigationActionsExecutionStatus = S.String;

export interface ListAuditMitigationActionsExecutionsRequest {
  taskId: string;
  actionStatus?: AuditMitigationActionsExecutionStatus;
  findingId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAuditMitigationActionsExecutionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      taskId: S.String.pipe(T.HttpQuery("taskId")),
      actionStatus: S.optional(AuditMitigationActionsExecutionStatus).pipe(
        T.HttpQuery("actionStatus"),
      ),
      findingId: S.String.pipe(T.HttpQuery("findingId")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/audit/mitigationactions/executions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListAuditMitigationActionsExecutionsRequest",
  }) as any as S.Schema<ListAuditMitigationActionsExecutionsRequest>;
export interface AuditMitigationActionExecutionMetadata {
  taskId?: string;
  findingId?: string;
  actionName?: string;
  actionId?: string;
  status?: AuditMitigationActionsExecutionStatus;
  startTime?: Date;
  endTime?: Date;
  errorCode?: string;
  message?: string;
}
export const AuditMitigationActionExecutionMetadata = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.optional(S.String),
      findingId: S.optional(S.String),
      actionName: S.optional(S.String),
      actionId: S.optional(S.String),
      status: S.optional(AuditMitigationActionsExecutionStatus),
      startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      errorCode: S.optional(S.String),
      message: S.optional(S.String),
    }),
).annotate({
  identifier: "AuditMitigationActionExecutionMetadata",
}) as any as S.Schema<AuditMitigationActionExecutionMetadata>;
export type AuditMitigationActionExecutionMetadataList =
  AuditMitigationActionExecutionMetadata[];
export const AuditMitigationActionExecutionMetadataList = /*@__PURE__*/ S.Array(
  AuditMitigationActionExecutionMetadata,
);
export interface ListAuditMitigationActionsExecutionsResponse {
  actionsExecutions?: AuditMitigationActionExecutionMetadata[];
  nextToken?: string;
}
export const ListAuditMitigationActionsExecutionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      actionsExecutions: S.optional(AuditMitigationActionExecutionMetadataList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAuditMitigationActionsExecutionsResponse",
  }) as any as S.Schema<ListAuditMitigationActionsExecutionsResponse>;
export interface ListAuditMitigationActionsTasksRequest {
  auditTaskId?: string;
  findingId?: string;
  taskStatus?: AuditMitigationActionsTaskStatus;
  maxResults?: number;
  nextToken?: string;
  startTime: Date;
  endTime: Date;
}
export const ListAuditMitigationActionsTasksRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      auditTaskId: S.optional(S.String).pipe(T.HttpQuery("auditTaskId")),
      findingId: S.optional(S.String).pipe(T.HttpQuery("findingId")),
      taskStatus: S.optional(AuditMitigationActionsTaskStatus).pipe(
        T.HttpQuery("taskStatus"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("startTime"),
      ),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("endTime"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/audit/mitigationactions/tasks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAuditMitigationActionsTasksRequest",
}) as any as S.Schema<ListAuditMitigationActionsTasksRequest>;
export interface AuditMitigationActionsTaskMetadata {
  taskId?: string;
  startTime?: Date;
  taskStatus?: AuditMitigationActionsTaskStatus;
}
export const AuditMitigationActionsTaskMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    taskStatus: S.optional(AuditMitigationActionsTaskStatus),
  }),
).annotate({
  identifier: "AuditMitigationActionsTaskMetadata",
}) as any as S.Schema<AuditMitigationActionsTaskMetadata>;
export type AuditMitigationActionsTaskMetadataList =
  AuditMitigationActionsTaskMetadata[];
export const AuditMitigationActionsTaskMetadataList = /*@__PURE__*/ S.Array(
  AuditMitigationActionsTaskMetadata,
);
export interface ListAuditMitigationActionsTasksResponse {
  tasks?: AuditMitigationActionsTaskMetadata[];
  nextToken?: string;
}
export const ListAuditMitigationActionsTasksResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      tasks: S.optional(AuditMitigationActionsTaskMetadataList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAuditMitigationActionsTasksResponse",
}) as any as S.Schema<ListAuditMitigationActionsTasksResponse>;
export type AscendingOrder = boolean;
export interface ListAuditSuppressionsRequest {
  checkName?: string;
  resourceIdentifier?: ResourceIdentifier;
  ascendingOrder?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export const ListAuditSuppressionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.optional(S.String),
    resourceIdentifier: S.optional(ResourceIdentifier),
    ascendingOrder: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/suppressions/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAuditSuppressionsRequest",
}) as any as S.Schema<ListAuditSuppressionsRequest>;
export interface AuditSuppression {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
}
export const AuditSuppression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.String,
    resourceIdentifier: ResourceIdentifier,
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    suppressIndefinitely: S.optional(S.Boolean),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "AuditSuppression",
}) as any as S.Schema<AuditSuppression>;
export type AuditSuppressionList = AuditSuppression[];
export const AuditSuppressionList = /*@__PURE__*/ S.Array(AuditSuppression);
export interface ListAuditSuppressionsResponse {
  suppressions?: AuditSuppression[];
  nextToken?: string;
}
export const ListAuditSuppressionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    suppressions: S.optional(AuditSuppressionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAuditSuppressionsResponse",
}) as any as S.Schema<ListAuditSuppressionsResponse>;
export interface ListAuditTasksRequest {
  startTime: Date;
  endTime: Date;
  taskType?: AuditTaskType;
  taskStatus?: AuditTaskStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListAuditTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("endTime"),
    ),
    taskType: S.optional(AuditTaskType).pipe(T.HttpQuery("taskType")),
    taskStatus: S.optional(AuditTaskStatus).pipe(T.HttpQuery("taskStatus")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAuditTasksRequest",
}) as any as S.Schema<ListAuditTasksRequest>;
export interface AuditTaskMetadata {
  taskId?: string;
  taskStatus?: AuditTaskStatus;
  taskType?: AuditTaskType;
}
export const AuditTaskMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    taskStatus: S.optional(AuditTaskStatus),
    taskType: S.optional(AuditTaskType),
  }),
).annotate({
  identifier: "AuditTaskMetadata",
}) as any as S.Schema<AuditTaskMetadata>;
export type AuditTaskMetadataList = AuditTaskMetadata[];
export const AuditTaskMetadataList = /*@__PURE__*/ S.Array(AuditTaskMetadata);
export interface ListAuditTasksResponse {
  tasks?: AuditTaskMetadata[];
  nextToken?: string;
}
export const ListAuditTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tasks: S.optional(AuditTaskMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAuditTasksResponse",
}) as any as S.Schema<ListAuditTasksResponse>;
export interface ListAuthorizersRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
  status?: AuthorizerStatus;
}
export const ListAuthorizersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
    status: S.optional(AuthorizerStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/authorizers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAuthorizersRequest",
}) as any as S.Schema<ListAuthorizersRequest>;
export interface AuthorizerSummary {
  authorizerName?: string;
  authorizerArn?: string;
}
export const AuthorizerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.optional(S.String),
    authorizerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthorizerSummary",
}) as any as S.Schema<AuthorizerSummary>;
export type Authorizers = AuthorizerSummary[];
export const Authorizers = /*@__PURE__*/ S.Array(AuthorizerSummary);
export interface ListAuthorizersResponse {
  authorizers?: AuthorizerSummary[];
  nextMarker?: string;
}
export const ListAuthorizersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizers: S.optional(Authorizers),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAuthorizersResponse",
}) as any as S.Schema<ListAuthorizersResponse>;
export type RegistryMaxResults = number;
export interface ListBillingGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  namePrefixFilter?: string;
}
export const ListBillingGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    namePrefixFilter: S.optional(S.String).pipe(
      T.HttpQuery("namePrefixFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/billing-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBillingGroupsRequest",
}) as any as S.Schema<ListBillingGroupsRequest>;
export type BillingGroupNameAndArnList = GroupNameAndArn[];
export const BillingGroupNameAndArnList =
  /*@__PURE__*/ S.Array(GroupNameAndArn);
export interface ListBillingGroupsResponse {
  billingGroups?: GroupNameAndArn[];
  nextToken?: string;
}
export const ListBillingGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroups: S.optional(BillingGroupNameAndArnList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupsResponse",
}) as any as S.Schema<ListBillingGroupsResponse>;
export interface ListCACertificatesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
  templateName?: string;
}
export const ListCACertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
    templateName: S.optional(S.String).pipe(T.HttpQuery("templateName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cacertificates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCACertificatesRequest",
}) as any as S.Schema<ListCACertificatesRequest>;
export interface CACertificate {
  certificateArn?: string;
  certificateId?: string;
  status?: CACertificateStatus;
  creationDate?: Date;
}
export const CACertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    status: S.optional(CACertificateStatus),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "CACertificate" }) as any as S.Schema<CACertificate>;
export type CACertificates = CACertificate[];
export const CACertificates = /*@__PURE__*/ S.Array(CACertificate);
export interface ListCACertificatesResponse {
  certificates?: CACertificate[];
  nextMarker?: string;
}
export const ListCACertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificates: S.optional(CACertificates),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCACertificatesResponse",
}) as any as S.Schema<ListCACertificatesResponse>;
export interface ListCertificateProvidersRequest {
  nextToken?: string;
  ascendingOrder?: boolean;
}
export const ListCertificateProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/certificate-providers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCertificateProvidersRequest",
}) as any as S.Schema<ListCertificateProvidersRequest>;
export interface CertificateProviderSummary {
  certificateProviderName?: string;
  certificateProviderArn?: string;
}
export const CertificateProviderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.optional(S.String),
    certificateProviderArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateProviderSummary",
}) as any as S.Schema<CertificateProviderSummary>;
export type CertificateProviders = CertificateProviderSummary[];
export const CertificateProviders = /*@__PURE__*/ S.Array(
  CertificateProviderSummary,
);
export interface ListCertificateProvidersResponse {
  certificateProviders?: CertificateProviderSummary[];
  nextToken?: string;
}
export const ListCertificateProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviders: S.optional(CertificateProviders),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCertificateProvidersResponse",
}) as any as S.Schema<ListCertificateProvidersResponse>;
export interface ListCertificatesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export const ListCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/certificates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCertificatesRequest",
}) as any as S.Schema<ListCertificatesRequest>;
export interface Certificate {
  certificateArn?: string;
  certificateId?: string;
  status?: CertificateStatus;
  certificateMode?: CertificateMode;
  creationDate?: Date;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    status: S.optional(CertificateStatus),
    certificateMode: S.optional(CertificateMode),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export type Certificates = Certificate[];
export const Certificates = /*@__PURE__*/ S.Array(Certificate);
export interface ListCertificatesResponse {
  certificates?: Certificate[];
  nextMarker?: string;
}
export const ListCertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificates: S.optional(Certificates),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCertificatesResponse",
}) as any as S.Schema<ListCertificatesResponse>;
export interface ListCertificatesByCARequest {
  caCertificateId: string;
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export const ListCertificatesByCARequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caCertificateId: S.String.pipe(T.HttpLabel("caCertificateId")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/certificates-by-ca/{caCertificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCertificatesByCARequest",
}) as any as S.Schema<ListCertificatesByCARequest>;
export interface ListCertificatesByCAResponse {
  certificates?: Certificate[];
  nextMarker?: string;
}
export const ListCertificatesByCAResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificates: S.optional(Certificates),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCertificatesByCAResponse",
}) as any as S.Schema<ListCertificatesByCAResponse>;
export type CommandMaxResults = number;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface TimeFilter {
  after?: string;
  before?: string;
}
export const TimeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ after: S.optional(S.String), before: S.optional(S.String) }),
).annotate({ identifier: "TimeFilter" }) as any as S.Schema<TimeFilter>;
export interface ListCommandExecutionsRequest {
  maxResults?: number;
  nextToken?: string;
  namespace?: CommandNamespace;
  status?: CommandExecutionStatus;
  sortOrder?: SortOrder;
  startedTimeFilter?: TimeFilter;
  completedTimeFilter?: TimeFilter;
  targetArn?: string;
  commandArn?: string;
}
export const ListCommandExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    namespace: S.optional(CommandNamespace),
    status: S.optional(CommandExecutionStatus),
    sortOrder: S.optional(SortOrder),
    startedTimeFilter: S.optional(TimeFilter),
    completedTimeFilter: S.optional(TimeFilter),
    targetArn: S.optional(S.String),
    commandArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/command-executions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCommandExecutionsRequest",
}) as any as S.Schema<ListCommandExecutionsRequest>;
export interface CommandExecutionSummary {
  commandArn?: string;
  executionId?: string;
  targetArn?: string;
  status?: CommandExecutionStatus;
  createdAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
}
export const CommandExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandArn: S.optional(S.String),
    executionId: S.optional(S.String),
    targetArn: S.optional(S.String),
    status: S.optional(CommandExecutionStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CommandExecutionSummary",
}) as any as S.Schema<CommandExecutionSummary>;
export type CommandExecutionSummaryList = CommandExecutionSummary[];
export const CommandExecutionSummaryList = /*@__PURE__*/ S.Array(
  CommandExecutionSummary,
);
export interface ListCommandExecutionsResponse {
  commandExecutions?: CommandExecutionSummary[];
  nextToken?: string;
}
export const ListCommandExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandExecutions: S.optional(CommandExecutionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCommandExecutionsResponse",
}) as any as S.Schema<ListCommandExecutionsResponse>;
export interface ListCommandsRequest {
  maxResults?: number;
  nextToken?: string;
  namespace?: CommandNamespace;
  commandParameterName?: string;
  sortOrder?: SortOrder;
}
export const ListCommandsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    namespace: S.optional(CommandNamespace).pipe(T.HttpQuery("namespace")),
    commandParameterName: S.optional(S.String).pipe(
      T.HttpQuery("commandParameterName"),
    ),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/commands" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCommandsRequest",
}) as any as S.Schema<ListCommandsRequest>;
export interface CommandSummary {
  commandArn?: string;
  commandId?: string;
  displayName?: string;
  deprecated?: boolean;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  pendingDeletion?: boolean;
}
export const CommandSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandArn: S.optional(S.String),
    commandId: S.optional(S.String),
    displayName: S.optional(S.String),
    deprecated: S.optional(S.Boolean),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pendingDeletion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "CommandSummary" }) as any as S.Schema<CommandSummary>;
export type CommandSummaryList = CommandSummary[];
export const CommandSummaryList = /*@__PURE__*/ S.Array(CommandSummary);
export interface ListCommandsResponse {
  commands?: CommandSummary[];
  nextToken?: string;
}
export const ListCommandsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commands: S.optional(CommandSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCommandsResponse",
}) as any as S.Schema<ListCommandsResponse>;
export interface ListCustomMetricsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListCustomMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/custom-metrics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomMetricsRequest",
}) as any as S.Schema<ListCustomMetricsRequest>;
export type MetricNames = string[];
export const MetricNames = /*@__PURE__*/ S.Array(S.String);
export interface ListCustomMetricsResponse {
  metricNames?: string[];
  nextToken?: string;
}
export const ListCustomMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricNames: S.optional(MetricNames),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomMetricsResponse",
}) as any as S.Schema<ListCustomMetricsResponse>;
export interface ListDetectMitigationActionsExecutionsRequest {
  taskId?: string;
  violationId?: string;
  thingName?: string;
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListDetectMitigationActionsExecutionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      taskId: S.optional(S.String).pipe(T.HttpQuery("taskId")),
      violationId: S.optional(S.String).pipe(T.HttpQuery("violationId")),
      thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
      startTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ).pipe(T.HttpQuery("startTime")),
      endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
        T.HttpQuery("endTime"),
      ),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/detect/mitigationactions/executions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListDetectMitigationActionsExecutionsRequest",
  }) as any as S.Schema<ListDetectMitigationActionsExecutionsRequest>;
export type DetectMitigationActionExecutionStatus =
  | "IN_PROGRESS"
  | "SUCCESSFUL"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export const DetectMitigationActionExecutionStatus = S.String;

export type DetectMitigationActionExecutionErrorCode = string;
export interface DetectMitigationActionExecution {
  taskId?: string;
  violationId?: string;
  actionName?: string;
  thingName?: string;
  executionStartDate?: Date;
  executionEndDate?: Date;
  status?: DetectMitigationActionExecutionStatus;
  errorCode?: string;
  message?: string;
}
export const DetectMitigationActionExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    violationId: S.optional(S.String),
    actionName: S.optional(S.String),
    thingName: S.optional(S.String),
    executionStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    executionEndDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(DetectMitigationActionExecutionStatus),
    errorCode: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "DetectMitigationActionExecution",
}) as any as S.Schema<DetectMitigationActionExecution>;
export type DetectMitigationActionExecutionList =
  DetectMitigationActionExecution[];
export const DetectMitigationActionExecutionList = /*@__PURE__*/ S.Array(
  DetectMitigationActionExecution,
);
export interface ListDetectMitigationActionsExecutionsResponse {
  actionsExecutions?: DetectMitigationActionExecution[];
  nextToken?: string;
}
export const ListDetectMitigationActionsExecutionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      actionsExecutions: S.optional(DetectMitigationActionExecutionList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDetectMitigationActionsExecutionsResponse",
  }) as any as S.Schema<ListDetectMitigationActionsExecutionsResponse>;
export interface ListDetectMitigationActionsTasksRequest {
  maxResults?: number;
  nextToken?: string;
  startTime: Date;
  endTime: Date;
}
export const ListDetectMitigationActionsTasksRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("startTime"),
      ),
      endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("endTime"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/detect/mitigationactions/tasks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDetectMitigationActionsTasksRequest",
}) as any as S.Schema<ListDetectMitigationActionsTasksRequest>;
export type DetectMitigationActionsTaskSummaryList =
  DetectMitigationActionsTaskSummary[];
export const DetectMitigationActionsTaskSummaryList = /*@__PURE__*/ S.Array(
  DetectMitigationActionsTaskSummary,
);
export interface ListDetectMitigationActionsTasksResponse {
  tasks?: DetectMitigationActionsTaskSummary[];
  nextToken?: string;
}
export const ListDetectMitigationActionsTasksResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      tasks: S.optional(DetectMitigationActionsTaskSummaryList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDetectMitigationActionsTasksResponse",
}) as any as S.Schema<ListDetectMitigationActionsTasksResponse>;
export interface ListDimensionsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDimensionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dimensions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDimensionsRequest",
}) as any as S.Schema<ListDimensionsRequest>;
export type DimensionNames = string[];
export const DimensionNames = /*@__PURE__*/ S.Array(S.String);
export interface ListDimensionsResponse {
  dimensionNames?: string[];
  nextToken?: string;
}
export const ListDimensionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensionNames: S.optional(DimensionNames),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDimensionsResponse",
}) as any as S.Schema<ListDimensionsResponse>;
export interface ListDomainConfigurationsRequest {
  marker?: string;
  pageSize?: number;
  serviceType?: ServiceType;
}
export const ListDomainConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    serviceType: S.optional(ServiceType).pipe(T.HttpQuery("serviceType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domainConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainConfigurationsRequest",
}) as any as S.Schema<ListDomainConfigurationsRequest>;
export interface DomainConfigurationSummary {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
  serviceType?: ServiceType;
}
export const DomainConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.optional(S.String),
    domainConfigurationArn: S.optional(S.String),
    serviceType: S.optional(ServiceType),
  }),
).annotate({
  identifier: "DomainConfigurationSummary",
}) as any as S.Schema<DomainConfigurationSummary>;
export type DomainConfigurations = DomainConfigurationSummary[];
export const DomainConfigurations = /*@__PURE__*/ S.Array(
  DomainConfigurationSummary,
);
export interface ListDomainConfigurationsResponse {
  domainConfigurations?: DomainConfigurationSummary[];
  nextMarker?: string;
}
export const ListDomainConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurations: S.optional(DomainConfigurations),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDomainConfigurationsResponse",
}) as any as S.Schema<ListDomainConfigurationsResponse>;
export interface ListFleetMetricsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListFleetMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/fleet-metrics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFleetMetricsRequest",
}) as any as S.Schema<ListFleetMetricsRequest>;
export interface FleetMetricNameAndArn {
  metricName?: string;
  metricArn?: string;
}
export const FleetMetricNameAndArn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    metricArn: S.optional(S.String),
  }),
).annotate({
  identifier: "FleetMetricNameAndArn",
}) as any as S.Schema<FleetMetricNameAndArn>;
export type FleetMetricNameAndArnList = FleetMetricNameAndArn[];
export const FleetMetricNameAndArnList = /*@__PURE__*/ S.Array(
  FleetMetricNameAndArn,
);
export interface ListFleetMetricsResponse {
  fleetMetrics?: FleetMetricNameAndArn[];
  nextToken?: string;
}
export const ListFleetMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fleetMetrics: S.optional(FleetMetricNameAndArnList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFleetMetricsResponse",
}) as any as S.Schema<ListFleetMetricsResponse>;
export type QueryMaxResults = number;
export interface ListIndicesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListIndicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/indices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIndicesRequest",
}) as any as S.Schema<ListIndicesRequest>;
export type IndexNamesList = string[];
export const IndexNamesList = /*@__PURE__*/ S.Array(S.String);
export interface ListIndicesResponse {
  indexNames?: string[];
  nextToken?: string;
}
export const ListIndicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexNames: S.optional(IndexNamesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIndicesResponse",
}) as any as S.Schema<ListIndicesResponse>;
export type LaserMaxResults = number;
export interface ListJobExecutionsForJobRequest {
  jobId: string;
  status?: JobExecutionStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListJobExecutionsForJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    status: S.optional(JobExecutionStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/jobs/{jobId}/things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobExecutionsForJobRequest",
}) as any as S.Schema<ListJobExecutionsForJobRequest>;
export type RetryAttempt = number;
export interface JobExecutionSummary {
  status?: JobExecutionStatus;
  queuedAt?: Date;
  startedAt?: Date;
  lastUpdatedAt?: Date;
  executionNumber?: number;
  retryAttempt?: number;
}
export const JobExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(JobExecutionStatus),
    queuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    executionNumber: S.optional(S.Number),
    retryAttempt: S.optional(S.Number),
  }),
).annotate({
  identifier: "JobExecutionSummary",
}) as any as S.Schema<JobExecutionSummary>;
export interface JobExecutionSummaryForJob {
  thingArn?: string;
  jobExecutionSummary?: JobExecutionSummary;
}
export const JobExecutionSummaryForJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingArn: S.optional(S.String),
    jobExecutionSummary: S.optional(JobExecutionSummary),
  }),
).annotate({
  identifier: "JobExecutionSummaryForJob",
}) as any as S.Schema<JobExecutionSummaryForJob>;
export type JobExecutionSummaryForJobList = JobExecutionSummaryForJob[];
export const JobExecutionSummaryForJobList = /*@__PURE__*/ S.Array(
  JobExecutionSummaryForJob,
);
export interface ListJobExecutionsForJobResponse {
  executionSummaries?: JobExecutionSummaryForJob[];
  nextToken?: string;
}
export const ListJobExecutionsForJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionSummaries: S.optional(JobExecutionSummaryForJobList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobExecutionsForJobResponse",
}) as any as S.Schema<ListJobExecutionsForJobResponse>;
export interface ListJobExecutionsForThingRequest {
  thingName: string;
  status?: JobExecutionStatus;
  namespaceId?: string;
  maxResults?: number;
  nextToken?: string;
  jobId?: string;
}
export const ListJobExecutionsForThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    status: S.optional(JobExecutionStatus).pipe(T.HttpQuery("status")),
    namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    jobId: S.optional(S.String).pipe(T.HttpQuery("jobId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobExecutionsForThingRequest",
}) as any as S.Schema<ListJobExecutionsForThingRequest>;
export interface JobExecutionSummaryForThing {
  jobId?: string;
  jobExecutionSummary?: JobExecutionSummary;
}
export const JobExecutionSummaryForThing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    jobExecutionSummary: S.optional(JobExecutionSummary),
  }),
).annotate({
  identifier: "JobExecutionSummaryForThing",
}) as any as S.Schema<JobExecutionSummaryForThing>;
export type JobExecutionSummaryForThingList = JobExecutionSummaryForThing[];
export const JobExecutionSummaryForThingList = /*@__PURE__*/ S.Array(
  JobExecutionSummaryForThing,
);
export interface ListJobExecutionsForThingResponse {
  executionSummaries?: JobExecutionSummaryForThing[];
  nextToken?: string;
}
export const ListJobExecutionsForThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionSummaries: S.optional(JobExecutionSummaryForThingList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobExecutionsForThingResponse",
}) as any as S.Schema<ListJobExecutionsForThingResponse>;
export interface ListJobsRequest {
  status?: JobStatus;
  targetSelection?: TargetSelection;
  maxResults?: number;
  nextToken?: string;
  thingGroupName?: string;
  thingGroupId?: string;
  namespaceId?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(JobStatus).pipe(T.HttpQuery("status")),
    targetSelection: S.optional(TargetSelection).pipe(
      T.HttpQuery("targetSelection"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    thingGroupName: S.optional(S.String).pipe(T.HttpQuery("thingGroupName")),
    thingGroupId: S.optional(S.String).pipe(T.HttpQuery("thingGroupId")),
    namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
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
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface JobSummary {
  jobArn?: string;
  jobId?: string;
  thingGroupId?: string;
  targetSelection?: TargetSelection;
  status?: JobStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  completedAt?: Date;
  isConcurrent?: boolean;
}
export const JobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.optional(S.String),
    jobId: S.optional(S.String),
    thingGroupId: S.optional(S.String),
    targetSelection: S.optional(TargetSelection),
    status: S.optional(JobStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    isConcurrent: S.optional(S.Boolean),
  }),
).annotate({ identifier: "JobSummary" }) as any as S.Schema<JobSummary>;
export type JobSummaryList = JobSummary[];
export const JobSummaryList = /*@__PURE__*/ S.Array(JobSummary);
export interface ListJobsResponse {
  jobs?: JobSummary[];
  nextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobs: S.optional(JobSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export interface ListJobTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListJobTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/job-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobTemplatesRequest",
}) as any as S.Schema<ListJobTemplatesRequest>;
export interface JobTemplateSummary {
  jobTemplateArn?: string;
  jobTemplateId?: string;
  description?: string;
  createdAt?: Date;
}
export const JobTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobTemplateArn: S.optional(S.String),
    jobTemplateId: S.optional(S.String),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "JobTemplateSummary",
}) as any as S.Schema<JobTemplateSummary>;
export type JobTemplateSummaryList = JobTemplateSummary[];
export const JobTemplateSummaryList = /*@__PURE__*/ S.Array(JobTemplateSummary);
export interface ListJobTemplatesResponse {
  jobTemplates?: JobTemplateSummary[];
  nextToken?: string;
}
export const ListJobTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobTemplates: S.optional(JobTemplateSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobTemplatesResponse",
}) as any as S.Schema<ListJobTemplatesResponse>;
export interface ListManagedJobTemplatesRequest {
  templateName?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListManagedJobTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.optional(S.String).pipe(T.HttpQuery("templateName")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-job-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedJobTemplatesRequest",
}) as any as S.Schema<ListManagedJobTemplatesRequest>;
export interface ManagedJobTemplateSummary {
  templateArn?: string;
  templateName?: string;
  description?: string;
  environments?: string[];
  templateVersion?: string;
}
export const ManagedJobTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateArn: S.optional(S.String),
    templateName: S.optional(S.String),
    description: S.optional(S.String),
    environments: S.optional(Environments),
    templateVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "ManagedJobTemplateSummary",
}) as any as S.Schema<ManagedJobTemplateSummary>;
export type ManagedJobTemplatesSummaryList = ManagedJobTemplateSummary[];
export const ManagedJobTemplatesSummaryList = /*@__PURE__*/ S.Array(
  ManagedJobTemplateSummary,
);
export interface ListManagedJobTemplatesResponse {
  managedJobTemplates?: ManagedJobTemplateSummary[];
  nextToken?: string;
}
export const ListManagedJobTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedJobTemplates: S.optional(ManagedJobTemplatesSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListManagedJobTemplatesResponse",
}) as any as S.Schema<ListManagedJobTemplatesResponse>;
export interface ListMetricValuesRequest {
  thingName: string;
  metricName: string;
  dimensionName?: string;
  dimensionValueOperator?: DimensionValueOperator;
  startTime: Date;
  endTime: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListMetricValuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpQuery("thingName")),
    metricName: S.String.pipe(T.HttpQuery("metricName")),
    dimensionName: S.optional(S.String).pipe(T.HttpQuery("dimensionName")),
    dimensionValueOperator: S.optional(DimensionValueOperator).pipe(
      T.HttpQuery("dimensionValueOperator"),
    ),
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("endTime"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/metric-values" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMetricValuesRequest",
}) as any as S.Schema<ListMetricValuesRequest>;
export interface MetricDatum {
  timestamp?: Date;
  value?: MetricValue;
}
export const MetricDatum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    value: S.optional(MetricValue),
  }),
).annotate({ identifier: "MetricDatum" }) as any as S.Schema<MetricDatum>;
export type MetricDatumList = MetricDatum[];
export const MetricDatumList = /*@__PURE__*/ S.Array(MetricDatum);
export interface ListMetricValuesResponse {
  metricDatumList?: MetricDatum[];
  nextToken?: string;
}
export const ListMetricValuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricDatumList: S.optional(MetricDatumList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMetricValuesResponse",
}) as any as S.Schema<ListMetricValuesResponse>;
export interface ListMitigationActionsRequest {
  actionType?: MitigationActionType;
  maxResults?: number;
  nextToken?: string;
}
export const ListMitigationActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionType: S.optional(MitigationActionType).pipe(
      T.HttpQuery("actionType"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/mitigationactions/actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMitigationActionsRequest",
}) as any as S.Schema<ListMitigationActionsRequest>;
export interface MitigationActionIdentifier {
  actionName?: string;
  actionArn?: string;
  creationDate?: Date;
}
export const MitigationActionIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.optional(S.String),
    actionArn: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MitigationActionIdentifier",
}) as any as S.Schema<MitigationActionIdentifier>;
export type MitigationActionIdentifierList = MitigationActionIdentifier[];
export const MitigationActionIdentifierList = /*@__PURE__*/ S.Array(
  MitigationActionIdentifier,
);
export interface ListMitigationActionsResponse {
  actionIdentifiers?: MitigationActionIdentifier[];
  nextToken?: string;
}
export const ListMitigationActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionIdentifiers: S.optional(MitigationActionIdentifierList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMitigationActionsResponse",
}) as any as S.Schema<ListMitigationActionsResponse>;
export interface ListOTAUpdatesRequest {
  maxResults?: number;
  nextToken?: string;
  otaUpdateStatus?: OTAUpdateStatus;
}
export const ListOTAUpdatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    otaUpdateStatus: S.optional(OTAUpdateStatus).pipe(
      T.HttpQuery("otaUpdateStatus"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/otaUpdates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOTAUpdatesRequest",
}) as any as S.Schema<ListOTAUpdatesRequest>;
export interface OTAUpdateSummary {
  otaUpdateId?: string;
  otaUpdateArn?: string;
  creationDate?: Date;
}
export const OTAUpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    otaUpdateId: S.optional(S.String),
    otaUpdateArn: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "OTAUpdateSummary",
}) as any as S.Schema<OTAUpdateSummary>;
export type OTAUpdatesSummary = OTAUpdateSummary[];
export const OTAUpdatesSummary = /*@__PURE__*/ S.Array(OTAUpdateSummary);
export interface ListOTAUpdatesResponse {
  otaUpdates?: OTAUpdateSummary[];
  nextToken?: string;
}
export const ListOTAUpdatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    otaUpdates: S.optional(OTAUpdatesSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOTAUpdatesResponse",
}) as any as S.Schema<ListOTAUpdatesResponse>;
export interface ListOutgoingCertificatesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export const ListOutgoingCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/certificates-out-going" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOutgoingCertificatesRequest",
}) as any as S.Schema<ListOutgoingCertificatesRequest>;
export interface OutgoingCertificate {
  certificateArn?: string;
  certificateId?: string;
  transferredTo?: string;
  transferDate?: Date;
  transferMessage?: string;
  creationDate?: Date;
}
export const OutgoingCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
    transferredTo: S.optional(S.String),
    transferDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    transferMessage: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "OutgoingCertificate",
}) as any as S.Schema<OutgoingCertificate>;
export type OutgoingCertificates = OutgoingCertificate[];
export const OutgoingCertificates = /*@__PURE__*/ S.Array(OutgoingCertificate);
export interface ListOutgoingCertificatesResponse {
  outgoingCertificates?: OutgoingCertificate[];
  nextMarker?: string;
}
export const ListOutgoingCertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outgoingCertificates: S.optional(OutgoingCertificates),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOutgoingCertificatesResponse",
}) as any as S.Schema<ListOutgoingCertificatesResponse>;
export type PackageCatalogMaxResults = number;
export interface ListPackagesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListPackagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagesRequest",
}) as any as S.Schema<ListPackagesRequest>;
export interface PackageSummary {
  packageName?: string;
  defaultVersionName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const PackageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.optional(S.String),
    defaultVersionName: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "PackageSummary" }) as any as S.Schema<PackageSummary>;
export type PackageSummaryList = PackageSummary[];
export const PackageSummaryList = /*@__PURE__*/ S.Array(PackageSummary);
export interface ListPackagesResponse {
  packageSummaries?: PackageSummary[];
  nextToken?: string;
}
export const ListPackagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageSummaries: S.optional(PackageSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackagesResponse",
}) as any as S.Schema<ListPackagesResponse>;
export interface ListPackageVersionsRequest {
  packageName: string;
  status?: PackageVersionStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListPackageVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    status: S.optional(PackageVersionStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packages/{packageName}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackageVersionsRequest",
}) as any as S.Schema<ListPackageVersionsRequest>;
export interface PackageVersionSummary {
  packageName?: string;
  versionName?: string;
  status?: PackageVersionStatus;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const PackageVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.optional(S.String),
    versionName: S.optional(S.String),
    status: S.optional(PackageVersionStatus),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PackageVersionSummary",
}) as any as S.Schema<PackageVersionSummary>;
export type PackageVersionSummaryList = PackageVersionSummary[];
export const PackageVersionSummaryList = /*@__PURE__*/ S.Array(
  PackageVersionSummary,
);
export interface ListPackageVersionsResponse {
  packageVersionSummaries?: PackageVersionSummary[];
  nextToken?: string;
}
export const ListPackageVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageVersionSummaries: S.optional(PackageVersionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPackageVersionsResponse",
}) as any as S.Schema<ListPackageVersionsResponse>;
export interface ListPoliciesRequest {
  marker?: string;
  pageSize?: number;
  ascendingOrder?: boolean;
}
export const ListPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPoliciesRequest",
}) as any as S.Schema<ListPoliciesRequest>;
export interface ListPoliciesResponse {
  policies?: Policy[];
  nextMarker?: string;
}
export const ListPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policies: S.optional(Policies),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPoliciesResponse",
}) as any as S.Schema<ListPoliciesResponse>;
export interface ListPolicyPrincipalsRequest {
  policyName: string;
  marker?: string;
  pageSize?: number;
  ascendingOrder?: boolean;
}
export const ListPolicyPrincipalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpHeader("x-amzn-iot-policy")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policy-principals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyPrincipalsRequest",
}) as any as S.Schema<ListPolicyPrincipalsRequest>;
export type PrincipalArn = string;
export type Principals = string[];
export const Principals = /*@__PURE__*/ S.Array(S.String);
export interface ListPolicyPrincipalsResponse {
  principals?: string[];
  nextMarker?: string;
}
export const ListPolicyPrincipalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principals: S.optional(Principals),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPolicyPrincipalsResponse",
}) as any as S.Schema<ListPolicyPrincipalsResponse>;
export interface ListPolicyVersionsRequest {
  policyName: string;
}
export const ListPolicyVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyName: S.String.pipe(T.HttpLabel("policyName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policies/{policyName}/version" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPolicyVersionsRequest",
}) as any as S.Schema<ListPolicyVersionsRequest>;
export interface PolicyVersion {
  versionId?: string;
  isDefaultVersion?: boolean;
  createDate?: Date;
}
export const PolicyVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionId: S.optional(S.String),
    isDefaultVersion: S.optional(S.Boolean),
    createDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "PolicyVersion" }) as any as S.Schema<PolicyVersion>;
export type PolicyVersions = PolicyVersion[];
export const PolicyVersions = /*@__PURE__*/ S.Array(PolicyVersion);
export interface ListPolicyVersionsResponse {
  policyVersions?: PolicyVersion[];
}
export const ListPolicyVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyVersions: S.optional(PolicyVersions) }),
).annotate({
  identifier: "ListPolicyVersionsResponse",
}) as any as S.Schema<ListPolicyVersionsResponse>;
export interface ListPrincipalPoliciesRequest {
  principal: string;
  marker?: string;
  pageSize?: number;
  ascendingOrder?: boolean;
}
export const ListPrincipalPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.String.pipe(T.HttpHeader("x-amzn-iot-principal")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/principal-policies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrincipalPoliciesRequest",
}) as any as S.Schema<ListPrincipalPoliciesRequest>;
export interface ListPrincipalPoliciesResponse {
  policies?: Policy[];
  nextMarker?: string;
}
export const ListPrincipalPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policies: S.optional(Policies),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrincipalPoliciesResponse",
}) as any as S.Schema<ListPrincipalPoliciesResponse>;
export interface ListPrincipalThingsRequest {
  nextToken?: string;
  maxResults?: number;
  principal: string;
}
export const ListPrincipalThingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/principals/things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrincipalThingsRequest",
}) as any as S.Schema<ListPrincipalThingsRequest>;
export type ThingNameList = string[];
export const ThingNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListPrincipalThingsResponse {
  things?: string[];
  nextToken?: string;
}
export const ListPrincipalThingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    things: S.optional(ThingNameList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrincipalThingsResponse",
}) as any as S.Schema<ListPrincipalThingsResponse>;
export interface ListPrincipalThingsV2Request {
  nextToken?: string;
  maxResults?: number;
  principal: string;
  thingPrincipalType?: ThingPrincipalType;
}
export const ListPrincipalThingsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    principal: S.String.pipe(T.HttpHeader("x-amzn-principal")),
    thingPrincipalType: S.optional(ThingPrincipalType).pipe(
      T.HttpQuery("thingPrincipalType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/principals/things-v2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrincipalThingsV2Request",
}) as any as S.Schema<ListPrincipalThingsV2Request>;
export interface PrincipalThingObject {
  thingName: string;
  thingPrincipalType?: ThingPrincipalType;
}
export const PrincipalThingObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String,
    thingPrincipalType: S.optional(ThingPrincipalType),
  }),
).annotate({
  identifier: "PrincipalThingObject",
}) as any as S.Schema<PrincipalThingObject>;
export type PrincipalThingObjects = PrincipalThingObject[];
export const PrincipalThingObjects =
  /*@__PURE__*/ S.Array(PrincipalThingObject);
export interface ListPrincipalThingsV2Response {
  principalThingObjects?: PrincipalThingObject[];
  nextToken?: string;
}
export const ListPrincipalThingsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principalThingObjects: S.optional(PrincipalThingObjects),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrincipalThingsV2Response",
}) as any as S.Schema<ListPrincipalThingsV2Response>;
export interface ListProvisioningTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListProvisioningTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/provisioning-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProvisioningTemplatesRequest",
}) as any as S.Schema<ListProvisioningTemplatesRequest>;
export interface ProvisioningTemplateSummary {
  templateArn?: string;
  templateName?: string;
  description?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  enabled?: boolean;
  type?: TemplateType;
}
export const ProvisioningTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateArn: S.optional(S.String),
    templateName: S.optional(S.String),
    description: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    enabled: S.optional(S.Boolean),
    type: S.optional(TemplateType),
  }),
).annotate({
  identifier: "ProvisioningTemplateSummary",
}) as any as S.Schema<ProvisioningTemplateSummary>;
export type ProvisioningTemplateListing = ProvisioningTemplateSummary[];
export const ProvisioningTemplateListing = /*@__PURE__*/ S.Array(
  ProvisioningTemplateSummary,
);
export interface ListProvisioningTemplatesResponse {
  templates?: ProvisioningTemplateSummary[];
  nextToken?: string;
}
export const ListProvisioningTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templates: S.optional(ProvisioningTemplateListing),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProvisioningTemplatesResponse",
}) as any as S.Schema<ListProvisioningTemplatesResponse>;
export interface ListProvisioningTemplateVersionsRequest {
  templateName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListProvisioningTemplateVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      templateName: S.String.pipe(T.HttpLabel("templateName")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/provisioning-templates/{templateName}/versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListProvisioningTemplateVersionsRequest",
}) as any as S.Schema<ListProvisioningTemplateVersionsRequest>;
export interface ProvisioningTemplateVersionSummary {
  versionId?: number;
  creationDate?: Date;
  isDefaultVersion?: boolean;
}
export const ProvisioningTemplateVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionId: S.optional(S.Number),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    isDefaultVersion: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ProvisioningTemplateVersionSummary",
}) as any as S.Schema<ProvisioningTemplateVersionSummary>;
export type ProvisioningTemplateVersionListing =
  ProvisioningTemplateVersionSummary[];
export const ProvisioningTemplateVersionListing = /*@__PURE__*/ S.Array(
  ProvisioningTemplateVersionSummary,
);
export interface ListProvisioningTemplateVersionsResponse {
  versions?: ProvisioningTemplateVersionSummary[];
  nextToken?: string;
}
export const ListProvisioningTemplateVersionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      versions: S.optional(ProvisioningTemplateVersionListing),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListProvisioningTemplateVersionsResponse",
}) as any as S.Schema<ListProvisioningTemplateVersionsResponse>;
export interface ListRelatedResourcesForAuditFindingRequest {
  findingId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRelatedResourcesForAuditFindingRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      findingId: S.String.pipe(T.HttpQuery("findingId")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/audit/relatedResources" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListRelatedResourcesForAuditFindingRequest",
  }) as any as S.Schema<ListRelatedResourcesForAuditFindingRequest>;
export interface ListRelatedResourcesForAuditFindingResponse {
  relatedResources?: RelatedResource[];
  nextToken?: string;
}
export const ListRelatedResourcesForAuditFindingResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      relatedResources: S.optional(RelatedResources),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListRelatedResourcesForAuditFindingResponse",
  }) as any as S.Schema<ListRelatedResourcesForAuditFindingResponse>;
export interface ListRoleAliasesRequest {
  pageSize?: number;
  marker?: string;
  ascendingOrder?: boolean;
}
export const ListRoleAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/role-aliases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRoleAliasesRequest",
}) as any as S.Schema<ListRoleAliasesRequest>;
export type RoleAliases = string[];
export const RoleAliases = /*@__PURE__*/ S.Array(S.String);
export interface ListRoleAliasesResponse {
  roleAliases?: string[];
  nextMarker?: string;
}
export const ListRoleAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleAliases: S.optional(RoleAliases),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRoleAliasesResponse",
}) as any as S.Schema<ListRoleAliasesResponse>;
export type SbomValidationResult = "FAILED" | "SUCCEEDED" | (string & {});
export const SbomValidationResult = S.String;

export interface ListSbomValidationResultsRequest {
  packageName: string;
  versionName: string;
  validationResult?: SbomValidationResult;
  maxResults?: number;
  nextToken?: string;
}
export const ListSbomValidationResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    validationResult: S.optional(SbomValidationResult).pipe(
      T.HttpQuery("validationResult"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/packages/{packageName}/versions/{versionName}/sbom-validation-results",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSbomValidationResultsRequest",
}) as any as S.Schema<ListSbomValidationResultsRequest>;
export type SbomValidationErrorCode =
  | "INCOMPATIBLE_FORMAT"
  | "FILE_SIZE_LIMIT_EXCEEDED"
  | (string & {});
export const SbomValidationErrorCode = S.String;

export type SbomValidationErrorMessage = string;
export interface SbomValidationResultSummary {
  fileName?: string;
  validationResult?: SbomValidationResult;
  errorCode?: SbomValidationErrorCode;
  errorMessage?: string;
}
export const SbomValidationResultSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileName: S.optional(S.String),
    validationResult: S.optional(SbomValidationResult),
    errorCode: S.optional(SbomValidationErrorCode),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "SbomValidationResultSummary",
}) as any as S.Schema<SbomValidationResultSummary>;
export type SbomValidationResultSummaryList = SbomValidationResultSummary[];
export const SbomValidationResultSummaryList = /*@__PURE__*/ S.Array(
  SbomValidationResultSummary,
);
export interface ListSbomValidationResultsResponse {
  validationResultSummaries?: SbomValidationResultSummary[];
  nextToken?: string;
}
export const ListSbomValidationResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    validationResultSummaries: S.optional(SbomValidationResultSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSbomValidationResultsResponse",
}) as any as S.Schema<ListSbomValidationResultsResponse>;
export interface ListScheduledAuditsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListScheduledAuditsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/audit/scheduledaudits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScheduledAuditsRequest",
}) as any as S.Schema<ListScheduledAuditsRequest>;
export interface ScheduledAuditMetadata {
  scheduledAuditName?: string;
  scheduledAuditArn?: string;
  frequency?: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
}
export const ScheduledAuditMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledAuditName: S.optional(S.String),
    scheduledAuditArn: S.optional(S.String),
    frequency: S.optional(AuditFrequency),
    dayOfMonth: S.optional(S.String),
    dayOfWeek: S.optional(DayOfWeek),
  }),
).annotate({
  identifier: "ScheduledAuditMetadata",
}) as any as S.Schema<ScheduledAuditMetadata>;
export type ScheduledAuditMetadataList = ScheduledAuditMetadata[];
export const ScheduledAuditMetadataList = /*@__PURE__*/ S.Array(
  ScheduledAuditMetadata,
);
export interface ListScheduledAuditsResponse {
  scheduledAudits?: ScheduledAuditMetadata[];
  nextToken?: string;
}
export const ListScheduledAuditsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduledAudits: S.optional(ScheduledAuditMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListScheduledAuditsResponse",
}) as any as S.Schema<ListScheduledAuditsResponse>;
export interface ListSecurityProfilesRequest {
  nextToken?: string;
  maxResults?: number;
  dimensionName?: string;
  metricName?: string;
}
export const ListSecurityProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    dimensionName: S.optional(S.String).pipe(T.HttpQuery("dimensionName")),
    metricName: S.optional(S.String).pipe(T.HttpQuery("metricName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/security-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSecurityProfilesRequest",
}) as any as S.Schema<ListSecurityProfilesRequest>;
export interface SecurityProfileIdentifier {
  name: string;
  arn: string;
}
export const SecurityProfileIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, arn: S.String }),
).annotate({
  identifier: "SecurityProfileIdentifier",
}) as any as S.Schema<SecurityProfileIdentifier>;
export type SecurityProfileIdentifiers = SecurityProfileIdentifier[];
export const SecurityProfileIdentifiers = /*@__PURE__*/ S.Array(
  SecurityProfileIdentifier,
);
export interface ListSecurityProfilesResponse {
  securityProfileIdentifiers?: SecurityProfileIdentifier[];
  nextToken?: string;
}
export const ListSecurityProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileIdentifiers: S.optional(SecurityProfileIdentifiers),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSecurityProfilesResponse",
}) as any as S.Schema<ListSecurityProfilesResponse>;
export interface ListSecurityProfilesForTargetRequest {
  nextToken?: string;
  maxResults?: number;
  recursive?: boolean;
  securityProfileTargetArn: string;
}
export const ListSecurityProfilesForTargetRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
      securityProfileTargetArn: S.String.pipe(
        T.HttpQuery("securityProfileTargetArn"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/security-profiles-for-target" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListSecurityProfilesForTargetRequest",
}) as any as S.Schema<ListSecurityProfilesForTargetRequest>;
export interface SecurityProfileTarget {
  arn: string;
}
export const SecurityProfileTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "SecurityProfileTarget",
}) as any as S.Schema<SecurityProfileTarget>;
export interface SecurityProfileTargetMapping {
  securityProfileIdentifier?: SecurityProfileIdentifier;
  target?: SecurityProfileTarget;
}
export const SecurityProfileTargetMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileIdentifier: S.optional(SecurityProfileIdentifier),
    target: S.optional(SecurityProfileTarget),
  }),
).annotate({
  identifier: "SecurityProfileTargetMapping",
}) as any as S.Schema<SecurityProfileTargetMapping>;
export type SecurityProfileTargetMappings = SecurityProfileTargetMapping[];
export const SecurityProfileTargetMappings = /*@__PURE__*/ S.Array(
  SecurityProfileTargetMapping,
);
export interface ListSecurityProfilesForTargetResponse {
  securityProfileTargetMappings?: SecurityProfileTargetMapping[];
  nextToken?: string;
}
export const ListSecurityProfilesForTargetResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      securityProfileTargetMappings: S.optional(SecurityProfileTargetMappings),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListSecurityProfilesForTargetResponse",
}) as any as S.Schema<ListSecurityProfilesForTargetResponse>;
export interface ListStreamsRequest {
  maxResults?: number;
  nextToken?: string;
  ascendingOrder?: boolean;
}
export const ListStreamsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ascendingOrder: S.optional(S.Boolean).pipe(T.HttpQuery("isAscendingOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/streams" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamsRequest",
}) as any as S.Schema<ListStreamsRequest>;
export interface StreamSummary {
  streamId?: string;
  streamArn?: string;
  streamVersion?: number;
  description?: string;
}
export const StreamSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamId: S.optional(S.String),
    streamArn: S.optional(S.String),
    streamVersion: S.optional(S.Number),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "StreamSummary" }) as any as S.Schema<StreamSummary>;
export type StreamsSummary = StreamSummary[];
export const StreamsSummary = /*@__PURE__*/ S.Array(StreamSummary);
export interface ListStreamsResponse {
  streams?: StreamSummary[];
  nextToken?: string;
}
export const ListStreamsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streams: S.optional(StreamsSummary),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStreamsResponse",
}) as any as S.Schema<ListStreamsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
  nextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
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
  tags?: Tag[];
  nextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTargetsForPolicyRequest {
  policyName: string;
  marker?: string;
  pageSize?: number;
}
export const ListTargetsForPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policy-targets/{policyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTargetsForPolicyRequest",
}) as any as S.Schema<ListTargetsForPolicyRequest>;
export type PolicyTargets = string[];
export const PolicyTargets = /*@__PURE__*/ S.Array(S.String);
export interface ListTargetsForPolicyResponse {
  targets?: string[];
  nextMarker?: string;
}
export const ListTargetsForPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targets: S.optional(PolicyTargets),
    nextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTargetsForPolicyResponse",
}) as any as S.Schema<ListTargetsForPolicyResponse>;
export interface ListTargetsForSecurityProfileRequest {
  securityProfileName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTargetsForSecurityProfileRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/security-profiles/{securityProfileName}/targets",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListTargetsForSecurityProfileRequest",
}) as any as S.Schema<ListTargetsForSecurityProfileRequest>;
export type SecurityProfileTargets = SecurityProfileTarget[];
export const SecurityProfileTargets = /*@__PURE__*/ S.Array(
  SecurityProfileTarget,
);
export interface ListTargetsForSecurityProfileResponse {
  securityProfileTargets?: SecurityProfileTarget[];
  nextToken?: string;
}
export const ListTargetsForSecurityProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      securityProfileTargets: S.optional(SecurityProfileTargets),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListTargetsForSecurityProfileResponse",
}) as any as S.Schema<ListTargetsForSecurityProfileResponse>;
export type RecursiveWithoutDefault = boolean;
export interface ListThingGroupsRequest {
  nextToken?: string;
  maxResults?: number;
  parentGroup?: string;
  namePrefixFilter?: string;
  recursive?: boolean;
}
export const ListThingGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    parentGroup: S.optional(S.String).pipe(T.HttpQuery("parentGroup")),
    namePrefixFilter: S.optional(S.String).pipe(
      T.HttpQuery("namePrefixFilter"),
    ),
    recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/thing-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingGroupsRequest",
}) as any as S.Schema<ListThingGroupsRequest>;
export interface ListThingGroupsResponse {
  thingGroups?: GroupNameAndArn[];
  nextToken?: string;
}
export const ListThingGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroups: S.optional(ThingGroupNameAndArnList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingGroupsResponse",
}) as any as S.Schema<ListThingGroupsResponse>;
export interface ListThingGroupsForThingRequest {
  thingName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListThingGroupsForThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/thing-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingGroupsForThingRequest",
}) as any as S.Schema<ListThingGroupsForThingRequest>;
export interface ListThingGroupsForThingResponse {
  thingGroups?: GroupNameAndArn[];
  nextToken?: string;
}
export const ListThingGroupsForThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroups: S.optional(ThingGroupNameAndArnList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingGroupsForThingResponse",
}) as any as S.Schema<ListThingGroupsForThingResponse>;
export interface ListThingPrincipalsRequest {
  nextToken?: string;
  maxResults?: number;
  thingName: string;
}
export const ListThingPrincipalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/principals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingPrincipalsRequest",
}) as any as S.Schema<ListThingPrincipalsRequest>;
export interface ListThingPrincipalsResponse {
  principals?: string[];
  nextToken?: string;
}
export const ListThingPrincipalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principals: S.optional(Principals),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingPrincipalsResponse",
}) as any as S.Schema<ListThingPrincipalsResponse>;
export interface ListThingPrincipalsV2Request {
  nextToken?: string;
  maxResults?: number;
  thingName: string;
  thingPrincipalType?: ThingPrincipalType;
}
export const ListThingPrincipalsV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    thingPrincipalType: S.optional(ThingPrincipalType).pipe(
      T.HttpQuery("thingPrincipalType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things/{thingName}/principals-v2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingPrincipalsV2Request",
}) as any as S.Schema<ListThingPrincipalsV2Request>;
export interface ThingPrincipalObject {
  principal: string;
  thingPrincipalType?: ThingPrincipalType;
}
export const ThingPrincipalObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.String,
    thingPrincipalType: S.optional(ThingPrincipalType),
  }),
).annotate({
  identifier: "ThingPrincipalObject",
}) as any as S.Schema<ThingPrincipalObject>;
export type ThingPrincipalObjects = ThingPrincipalObject[];
export const ThingPrincipalObjects =
  /*@__PURE__*/ S.Array(ThingPrincipalObject);
export interface ListThingPrincipalsV2Response {
  thingPrincipalObjects?: ThingPrincipalObject[];
  nextToken?: string;
}
export const ListThingPrincipalsV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingPrincipalObjects: S.optional(ThingPrincipalObjects),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingPrincipalsV2Response",
}) as any as S.Schema<ListThingPrincipalsV2Response>;
export type ReportType = "ERRORS" | "RESULTS" | (string & {});
export const ReportType = S.String;

export interface ListThingRegistrationTaskReportsRequest {
  taskId: string;
  reportType: ReportType;
  nextToken?: string;
  maxResults?: number;
}
export const ListThingRegistrationTaskReportsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.String.pipe(T.HttpLabel("taskId")),
      reportType: ReportType.pipe(T.HttpQuery("reportType")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/thing-registration-tasks/{taskId}/reports",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListThingRegistrationTaskReportsRequest",
}) as any as S.Schema<ListThingRegistrationTaskReportsRequest>;
export type S3FileUrl = string;
export type S3FileUrlList = string[];
export const S3FileUrlList = /*@__PURE__*/ S.Array(S.String);
export interface ListThingRegistrationTaskReportsResponse {
  resourceLinks?: string[];
  reportType?: ReportType;
  nextToken?: string;
}
export const ListThingRegistrationTaskReportsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceLinks: S.optional(S3FileUrlList),
      reportType: S.optional(ReportType),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListThingRegistrationTaskReportsResponse",
}) as any as S.Schema<ListThingRegistrationTaskReportsResponse>;
export interface ListThingRegistrationTasksRequest {
  nextToken?: string;
  maxResults?: number;
  status?: Status;
}
export const ListThingRegistrationTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(Status).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/thing-registration-tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingRegistrationTasksRequest",
}) as any as S.Schema<ListThingRegistrationTasksRequest>;
export type TaskIdList = string[];
export const TaskIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListThingRegistrationTasksResponse {
  taskIds?: string[];
  nextToken?: string;
}
export const ListThingRegistrationTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskIds: S.optional(TaskIdList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingRegistrationTasksResponse",
}) as any as S.Schema<ListThingRegistrationTasksResponse>;
export type UsePrefixAttributeValue = boolean;
export interface ListThingsRequest {
  nextToken?: string;
  maxResults?: number;
  attributeName?: string;
  attributeValue?: string;
  thingTypeName?: string;
  usePrefixAttributeValue?: boolean;
}
export const ListThingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    attributeName: S.optional(S.String).pipe(T.HttpQuery("attributeName")),
    attributeValue: S.optional(S.String).pipe(T.HttpQuery("attributeValue")),
    thingTypeName: S.optional(S.String).pipe(T.HttpQuery("thingTypeName")),
    usePrefixAttributeValue: S.optional(S.Boolean).pipe(
      T.HttpQuery("usePrefixAttributeValue"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingsRequest",
}) as any as S.Schema<ListThingsRequest>;
export interface ThingAttribute {
  thingName?: string;
  thingTypeName?: string;
  thingArn?: string;
  attributes?: { [key: string]: string | undefined };
  version?: number;
}
export const ThingAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(S.String),
    thingTypeName: S.optional(S.String),
    thingArn: S.optional(S.String),
    attributes: S.optional(Attributes),
    version: S.optional(S.Number),
  }),
).annotate({ identifier: "ThingAttribute" }) as any as S.Schema<ThingAttribute>;
export type ThingAttributeList = ThingAttribute[];
export const ThingAttributeList = /*@__PURE__*/ S.Array(ThingAttribute);
export interface ListThingsResponse {
  things?: ThingAttribute[];
  nextToken?: string;
}
export const ListThingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    things: S.optional(ThingAttributeList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingsResponse",
}) as any as S.Schema<ListThingsResponse>;
export interface ListThingsInBillingGroupRequest {
  billingGroupName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListThingsInBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/billing-groups/{billingGroupName}/things",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingsInBillingGroupRequest",
}) as any as S.Schema<ListThingsInBillingGroupRequest>;
export interface ListThingsInBillingGroupResponse {
  things?: string[];
  nextToken?: string;
}
export const ListThingsInBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    things: S.optional(ThingNameList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingsInBillingGroupResponse",
}) as any as S.Schema<ListThingsInBillingGroupResponse>;
export interface ListThingsInThingGroupRequest {
  thingGroupName: string;
  recursive?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export const ListThingsInThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    recursive: S.optional(S.Boolean).pipe(T.HttpQuery("recursive")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/thing-groups/{thingGroupName}/things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingsInThingGroupRequest",
}) as any as S.Schema<ListThingsInThingGroupRequest>;
export interface ListThingsInThingGroupResponse {
  things?: string[];
  nextToken?: string;
}
export const ListThingsInThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    things: S.optional(ThingNameList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingsInThingGroupResponse",
}) as any as S.Schema<ListThingsInThingGroupResponse>;
export interface ListThingTypesRequest {
  nextToken?: string;
  maxResults?: number;
  thingTypeName?: string;
}
export const ListThingTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    thingTypeName: S.optional(S.String).pipe(T.HttpQuery("thingTypeName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/thing-types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThingTypesRequest",
}) as any as S.Schema<ListThingTypesRequest>;
export interface ThingTypeDefinition {
  thingTypeName?: string;
  thingTypeArn?: string;
  thingTypeProperties?: ThingTypeProperties;
  thingTypeMetadata?: ThingTypeMetadata;
}
export const ThingTypeDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeName: S.optional(S.String),
    thingTypeArn: S.optional(S.String),
    thingTypeProperties: S.optional(ThingTypeProperties),
    thingTypeMetadata: S.optional(ThingTypeMetadata),
  }),
).annotate({
  identifier: "ThingTypeDefinition",
}) as any as S.Schema<ThingTypeDefinition>;
export type ThingTypeList = ThingTypeDefinition[];
export const ThingTypeList = /*@__PURE__*/ S.Array(ThingTypeDefinition);
export interface ListThingTypesResponse {
  thingTypes?: ThingTypeDefinition[];
  nextToken?: string;
}
export const ListThingTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypes: S.optional(ThingTypeList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThingTypesResponse",
}) as any as S.Schema<ListThingTypesResponse>;
export type TopicRuleDestinationMaxResults = number;
export interface ListTopicRuleDestinationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListTopicRuleDestinationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTopicRuleDestinationsRequest",
}) as any as S.Schema<ListTopicRuleDestinationsRequest>;
export interface HttpUrlDestinationSummary {
  confirmationUrl?: string;
}
export const HttpUrlDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ confirmationUrl: S.optional(S.String) }),
).annotate({
  identifier: "HttpUrlDestinationSummary",
}) as any as S.Schema<HttpUrlDestinationSummary>;
export interface VpcDestinationSummary {
  subnetIds?: string[];
  securityGroups?: string[];
  vpcId?: string;
  roleArn?: string;
}
export const VpcDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subnetIds: S.optional(SubnetIdList),
    securityGroups: S.optional(SecurityGroupList),
    vpcId: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "VpcDestinationSummary",
}) as any as S.Schema<VpcDestinationSummary>;
export interface InfluxDBDestinationSummary {
  endpoint?: string;
  influxDBVersion?: InfluxDBVersion;
  secretId?: string;
  secretType?: InfluxDBSecretType;
  secretKey?: string;
}
export const InfluxDBDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.optional(S.String),
    influxDBVersion: S.optional(InfluxDBVersion),
    secretId: S.optional(S.String),
    secretType: S.optional(InfluxDBSecretType),
    secretKey: S.optional(S.String),
  }),
).annotate({
  identifier: "InfluxDBDestinationSummary",
}) as any as S.Schema<InfluxDBDestinationSummary>;
export interface TopicRuleDestinationSummary {
  arn?: string;
  status?: TopicRuleDestinationStatus;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  statusReason?: string;
  httpUrlSummary?: HttpUrlDestinationSummary;
  vpcDestinationSummary?: VpcDestinationSummary;
  influxDBSummary?: InfluxDBDestinationSummary;
}
export const TopicRuleDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    status: S.optional(TopicRuleDestinationStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    statusReason: S.optional(S.String),
    httpUrlSummary: S.optional(HttpUrlDestinationSummary),
    vpcDestinationSummary: S.optional(VpcDestinationSummary),
    influxDBSummary: S.optional(InfluxDBDestinationSummary),
  }),
).annotate({
  identifier: "TopicRuleDestinationSummary",
}) as any as S.Schema<TopicRuleDestinationSummary>;
export type TopicRuleDestinationSummaries = TopicRuleDestinationSummary[];
export const TopicRuleDestinationSummaries = /*@__PURE__*/ S.Array(
  TopicRuleDestinationSummary,
);
export interface ListTopicRuleDestinationsResponse {
  destinationSummaries?: TopicRuleDestinationSummary[];
  nextToken?: string;
}
export const ListTopicRuleDestinationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationSummaries: S.optional(TopicRuleDestinationSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTopicRuleDestinationsResponse",
}) as any as S.Schema<ListTopicRuleDestinationsResponse>;
export type Topic = string;
export type TopicRuleMaxResults = number;
export interface ListTopicRulesRequest {
  topic?: string;
  maxResults?: number;
  nextToken?: string;
  ruleDisabled?: boolean;
}
export const ListTopicRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topic: S.optional(S.String).pipe(T.HttpQuery("topic")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ruleDisabled: S.optional(S.Boolean).pipe(T.HttpQuery("ruleDisabled")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTopicRulesRequest",
}) as any as S.Schema<ListTopicRulesRequest>;
export interface TopicRuleListItem {
  ruleArn?: string;
  ruleName?: string;
  topicPattern?: string;
  createdAt?: Date;
  ruleDisabled?: boolean;
}
export const TopicRuleListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.optional(S.String),
    ruleName: S.optional(S.String),
    topicPattern: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ruleDisabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "TopicRuleListItem",
}) as any as S.Schema<TopicRuleListItem>;
export type TopicRuleList = TopicRuleListItem[];
export const TopicRuleList = /*@__PURE__*/ S.Array(TopicRuleListItem);
export interface ListTopicRulesResponse {
  rules?: TopicRuleListItem[];
  nextToken?: string;
}
export const ListTopicRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: S.optional(TopicRuleList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTopicRulesResponse",
}) as any as S.Schema<ListTopicRulesResponse>;
export type SkyfallMaxResults = number;
export interface ListV2LoggingLevelsRequest {
  targetType?: LogTargetType;
  nextToken?: string;
  maxResults?: number;
}
export const ListV2LoggingLevelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetType: S.optional(LogTargetType).pipe(T.HttpQuery("targetType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2LoggingLevel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListV2LoggingLevelsRequest",
}) as any as S.Schema<ListV2LoggingLevelsRequest>;
export interface LogTarget {
  targetType: LogTargetType;
  targetName?: string;
}
export const LogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetType: LogTargetType, targetName: S.optional(S.String) }),
).annotate({ identifier: "LogTarget" }) as any as S.Schema<LogTarget>;
export interface LogTargetConfiguration {
  logTarget?: LogTarget;
  logLevel?: LogLevel;
}
export const LogTargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logTarget: S.optional(LogTarget),
    logLevel: S.optional(LogLevel),
  }),
).annotate({
  identifier: "LogTargetConfiguration",
}) as any as S.Schema<LogTargetConfiguration>;
export type LogTargetConfigurations = LogTargetConfiguration[];
export const LogTargetConfigurations = /*@__PURE__*/ S.Array(
  LogTargetConfiguration,
);
export interface ListV2LoggingLevelsResponse {
  logTargetConfigurations?: LogTargetConfiguration[];
  nextToken?: string;
}
export const ListV2LoggingLevelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logTargetConfigurations: S.optional(LogTargetConfigurations),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListV2LoggingLevelsResponse",
}) as any as S.Schema<ListV2LoggingLevelsResponse>;
export interface ListViolationEventsRequest {
  startTime: Date;
  endTime: Date;
  thingName?: string;
  securityProfileName?: string;
  behaviorCriteriaType?: BehaviorCriteriaType;
  listSuppressedAlerts?: boolean;
  verificationState?: VerificationState;
  nextToken?: string;
  maxResults?: number;
}
export const ListViolationEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("endTime"),
    ),
    thingName: S.optional(S.String).pipe(T.HttpQuery("thingName")),
    securityProfileName: S.optional(S.String).pipe(
      T.HttpQuery("securityProfileName"),
    ),
    behaviorCriteriaType: S.optional(BehaviorCriteriaType).pipe(
      T.HttpQuery("behaviorCriteriaType"),
    ),
    listSuppressedAlerts: S.optional(S.Boolean).pipe(
      T.HttpQuery("listSuppressedAlerts"),
    ),
    verificationState: S.optional(VerificationState).pipe(
      T.HttpQuery("verificationState"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/violation-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListViolationEventsRequest",
}) as any as S.Schema<ListViolationEventsRequest>;
export type ViolationEventType =
  | "in-alarm"
  | "alarm-cleared"
  | "alarm-invalidated"
  | (string & {});
export const ViolationEventType = S.String;

export interface ViolationEvent {
  violationId?: string;
  thingName?: string;
  securityProfileName?: string;
  behavior?: Behavior;
  metricValue?: MetricValue;
  violationEventAdditionalInfo?: ViolationEventAdditionalInfo;
  violationEventType?: ViolationEventType;
  verificationState?: VerificationState;
  verificationStateDescription?: string;
  violationEventTime?: Date;
}
export const ViolationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    violationId: S.optional(S.String),
    thingName: S.optional(S.String),
    securityProfileName: S.optional(S.String),
    behavior: S.optional(Behavior),
    metricValue: S.optional(MetricValue),
    violationEventAdditionalInfo: S.optional(ViolationEventAdditionalInfo),
    violationEventType: S.optional(ViolationEventType),
    verificationState: S.optional(VerificationState),
    verificationStateDescription: S.optional(S.String),
    violationEventTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ViolationEvent" }) as any as S.Schema<ViolationEvent>;
export type ViolationEvents = ViolationEvent[];
export const ViolationEvents = /*@__PURE__*/ S.Array(ViolationEvent);
export interface ListViolationEventsResponse {
  violationEvents?: ViolationEvent[];
  nextToken?: string;
}
export const ListViolationEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    violationEvents: S.optional(ViolationEvents),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListViolationEventsResponse",
}) as any as S.Schema<ListViolationEventsResponse>;
export interface PutVerificationStateOnViolationRequest {
  violationId: string;
  verificationState: VerificationState;
  verificationStateDescription?: string;
}
export const PutVerificationStateOnViolationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      violationId: S.String.pipe(T.HttpLabel("violationId")),
      verificationState: VerificationState,
      verificationStateDescription: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/violations/verification-state/{violationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutVerificationStateOnViolationRequest",
}) as any as S.Schema<PutVerificationStateOnViolationRequest>;
export interface PutVerificationStateOnViolationResponse {}
export const PutVerificationStateOnViolationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutVerificationStateOnViolationResponse",
}) as any as S.Schema<PutVerificationStateOnViolationResponse>;
export type AllowAutoRegistration = boolean;
export interface RegisterCACertificateRequest {
  caCertificate: string;
  verificationCertificate?: string;
  setAsActive?: boolean;
  allowAutoRegistration?: boolean;
  registrationConfig?: RegistrationConfig;
  tags?: Tag[];
  certificateMode?: CertificateMode;
}
export const RegisterCACertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caCertificate: S.String,
    verificationCertificate: S.optional(S.String),
    setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
    allowAutoRegistration: S.optional(S.Boolean).pipe(
      T.HttpQuery("allowAutoRegistration"),
    ),
    registrationConfig: S.optional(RegistrationConfig),
    tags: S.optional(TagList),
    certificateMode: S.optional(CertificateMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cacertificate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterCACertificateRequest",
}) as any as S.Schema<RegisterCACertificateRequest>;
export interface RegisterCACertificateResponse {
  certificateArn?: string;
  certificateId?: string;
}
export const RegisterCACertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterCACertificateResponse",
}) as any as S.Schema<RegisterCACertificateResponse>;
export type SetAsActiveFlag = boolean;
export interface RegisterCertificateRequest {
  certificatePem: string;
  caCertificatePem?: string;
  setAsActive?: boolean;
  status?: CertificateStatus;
}
export const RegisterCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificatePem: S.String,
    caCertificatePem: S.optional(S.String),
    setAsActive: S.optional(S.Boolean).pipe(T.HttpQuery("setAsActive")),
    status: S.optional(CertificateStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/certificate/register" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterCertificateRequest",
}) as any as S.Schema<RegisterCertificateRequest>;
export interface RegisterCertificateResponse {
  certificateArn?: string;
  certificateId?: string;
}
export const RegisterCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateArn: S.optional(S.String),
    certificateId: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterCertificateResponse",
}) as any as S.Schema<RegisterCertificateResponse>;
export interface RegisterCertificateWithoutCARequest {
  certificatePem: string;
  status?: CertificateStatus;
}
export const RegisterCertificateWithoutCARequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificatePem: S.String,
    status: S.optional(CertificateStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/certificate/register-no-ca" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterCertificateWithoutCARequest",
}) as any as S.Schema<RegisterCertificateWithoutCARequest>;
export interface RegisterCertificateWithoutCAResponse {
  certificateArn?: string;
  certificateId?: string;
}
export const RegisterCertificateWithoutCAResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      certificateArn: S.optional(S.String),
      certificateId: S.optional(S.String),
    }),
).annotate({
  identifier: "RegisterCertificateWithoutCAResponse",
}) as any as S.Schema<RegisterCertificateWithoutCAResponse>;
export type Parameter = string;
export type Parameters = { [key: string]: string | undefined };
export const Parameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RegisterThingRequest {
  templateBody: string;
  parameters?: { [key: string]: string | undefined };
}
export const RegisterThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateBody: S.String, parameters: S.optional(Parameters) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/things" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterThingRequest",
}) as any as S.Schema<RegisterThingRequest>;
export type ResourceLogicalId = string;
export type ResourceArns = { [key: string]: string | undefined };
export const ResourceArns = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RegisterThingResponse {
  certificatePem?: string;
  resourceArns?: { [key: string]: string | undefined };
}
export const RegisterThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificatePem: S.optional(S.String),
    resourceArns: S.optional(ResourceArns),
  }),
).annotate({
  identifier: "RegisterThingResponse",
}) as any as S.Schema<RegisterThingResponse>;
export interface RejectCertificateTransferRequest {
  certificateId: string;
  rejectReason?: string;
}
export const RejectCertificateTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.String.pipe(T.HttpLabel("certificateId")),
    rejectReason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/reject-certificate-transfer/{certificateId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectCertificateTransferRequest",
}) as any as S.Schema<RejectCertificateTransferRequest>;
export interface RejectCertificateTransferResponse {}
export const RejectCertificateTransferResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RejectCertificateTransferResponse",
}) as any as S.Schema<RejectCertificateTransferResponse>;
export interface RemoveThingFromBillingGroupRequest {
  billingGroupName?: string;
  billingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
}
export const RemoveThingFromBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.optional(S.String),
    billingGroupArn: S.optional(S.String),
    thingName: S.optional(S.String),
    thingArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/billing-groups/removeThingFromBillingGroup",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveThingFromBillingGroupRequest",
}) as any as S.Schema<RemoveThingFromBillingGroupRequest>;
export interface RemoveThingFromBillingGroupResponse {}
export const RemoveThingFromBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveThingFromBillingGroupResponse",
}) as any as S.Schema<RemoveThingFromBillingGroupResponse>;
export interface RemoveThingFromThingGroupRequest {
  thingGroupName?: string;
  thingGroupArn?: string;
  thingName?: string;
  thingArn?: string;
}
export const RemoveThingFromThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.optional(S.String),
    thingGroupArn: S.optional(S.String),
    thingName: S.optional(S.String),
    thingArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/thing-groups/removeThingFromThingGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveThingFromThingGroupRequest",
}) as any as S.Schema<RemoveThingFromThingGroupRequest>;
export interface RemoveThingFromThingGroupResponse {}
export const RemoveThingFromThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveThingFromThingGroupResponse",
}) as any as S.Schema<RemoveThingFromThingGroupResponse>;
export interface ReplaceTopicRuleRequest {
  ruleName: string;
  topicRulePayload: TopicRulePayload;
}
export const ReplaceTopicRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleName: S.String.pipe(T.HttpLabel("ruleName")),
    topicRulePayload: TopicRulePayload.pipe(T.HttpPayload()).annotate({
      identifier: "TopicRulePayload",
    }),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/rules/{ruleName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReplaceTopicRuleRequest",
}) as any as S.Schema<ReplaceTopicRuleRequest>;
export interface ReplaceTopicRuleResponse {}
export const ReplaceTopicRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ReplaceTopicRuleResponse",
}) as any as S.Schema<ReplaceTopicRuleResponse>;
export type SearchQueryMaxResults = number;
export interface SearchIndexRequest {
  indexName?: string;
  queryString: string;
  nextToken?: string;
  maxResults?: number;
  queryVersion?: string;
}
export const SearchIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexName: S.optional(S.String),
    queryString: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    queryVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/indices/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchIndexRequest",
}) as any as S.Schema<SearchIndexRequest>;
export type ThingGroupNameList = string[];
export const ThingGroupNameList = /*@__PURE__*/ S.Array(S.String);
export type JsonDocument = string;
export type ConnectivityTimestamp = number;
export type DisconnectReason = string;
export interface ThingConnectivity {
  connected?: boolean;
  timestamp?: number;
  disconnectReason?: string;
  keepAliveDuration?: number;
  cleanSession?: boolean;
  sessionExpiry?: number;
  clientId?: string;
}
export const ThingConnectivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connected: S.optional(S.Boolean),
    timestamp: S.optional(S.Number),
    disconnectReason: S.optional(S.String),
    keepAliveDuration: S.optional(S.Number),
    cleanSession: S.optional(S.Boolean),
    sessionExpiry: S.optional(S.Number),
    clientId: S.optional(S.String),
  }),
).annotate({
  identifier: "ThingConnectivity",
}) as any as S.Schema<ThingConnectivity>;
export interface ThingDocument {
  thingName?: string;
  thingId?: string;
  thingTypeName?: string;
  thingGroupNames?: string[];
  attributes?: { [key: string]: string | undefined };
  shadow?: string;
  deviceDefender?: string;
  connectivity?: ThingConnectivity;
}
export const ThingDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(S.String),
    thingId: S.optional(S.String),
    thingTypeName: S.optional(S.String),
    thingGroupNames: S.optional(ThingGroupNameList),
    attributes: S.optional(Attributes),
    shadow: S.optional(S.String),
    deviceDefender: S.optional(S.String),
    connectivity: S.optional(ThingConnectivity),
  }),
).annotate({ identifier: "ThingDocument" }) as any as S.Schema<ThingDocument>;
export type ThingDocumentList = ThingDocument[];
export const ThingDocumentList = /*@__PURE__*/ S.Array(ThingDocument);
export interface ThingGroupDocument {
  thingGroupName?: string;
  thingGroupId?: string;
  thingGroupDescription?: string;
  attributes?: { [key: string]: string | undefined };
  parentGroupNames?: string[];
}
export const ThingGroupDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.optional(S.String),
    thingGroupId: S.optional(S.String),
    thingGroupDescription: S.optional(S.String),
    attributes: S.optional(Attributes),
    parentGroupNames: S.optional(ThingGroupNameList),
  }),
).annotate({
  identifier: "ThingGroupDocument",
}) as any as S.Schema<ThingGroupDocument>;
export type ThingGroupDocumentList = ThingGroupDocument[];
export const ThingGroupDocumentList = /*@__PURE__*/ S.Array(ThingGroupDocument);
export interface SearchIndexResponse {
  nextToken?: string;
  things?: ThingDocument[];
  thingGroups?: ThingGroupDocument[];
}
export const SearchIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    things: S.optional(ThingDocumentList),
    thingGroups: S.optional(ThingGroupDocumentList),
  }),
).annotate({
  identifier: "SearchIndexResponse",
}) as any as S.Schema<SearchIndexResponse>;
export interface SetDefaultAuthorizerRequest {
  authorizerName: string;
}
export const SetDefaultAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizerName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/default-authorizer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetDefaultAuthorizerRequest",
}) as any as S.Schema<SetDefaultAuthorizerRequest>;
export interface SetDefaultAuthorizerResponse {
  authorizerName?: string;
  authorizerArn?: string;
}
export const SetDefaultAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.optional(S.String),
    authorizerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SetDefaultAuthorizerResponse",
}) as any as S.Schema<SetDefaultAuthorizerResponse>;
export interface SetDefaultPolicyVersionRequest {
  policyName: string;
  policyVersionId: string;
}
export const SetDefaultPolicyVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyName: S.String.pipe(T.HttpLabel("policyName")),
    policyVersionId: S.String.pipe(T.HttpLabel("policyVersionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/policies/{policyName}/version/{policyVersionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetDefaultPolicyVersionRequest",
}) as any as S.Schema<SetDefaultPolicyVersionRequest>;
export interface SetDefaultPolicyVersionResponse {}
export const SetDefaultPolicyVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SetDefaultPolicyVersionResponse",
}) as any as S.Schema<SetDefaultPolicyVersionResponse>;
export interface LoggingOptionsPayload {
  roleArn: string;
  logLevel?: LogLevel;
}
export const LoggingOptionsPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.String, logLevel: S.optional(LogLevel) }),
).annotate({
  identifier: "LoggingOptionsPayload",
}) as any as S.Schema<LoggingOptionsPayload>;
export interface SetLoggingOptionsRequest {
  loggingOptionsPayload: LoggingOptionsPayload;
}
export const SetLoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    loggingOptionsPayload: LoggingOptionsPayload.pipe(T.HttpPayload()).annotate(
      { identifier: "LoggingOptionsPayload" },
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/loggingOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetLoggingOptionsRequest",
}) as any as S.Schema<SetLoggingOptionsRequest>;
export interface SetLoggingOptionsResponse {}
export const SetLoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SetLoggingOptionsResponse",
}) as any as S.Schema<SetLoggingOptionsResponse>;
export interface SetV2LoggingLevelRequest {
  logTarget: LogTarget;
  logLevel: LogLevel;
}
export const SetV2LoggingLevelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logTarget: LogTarget, logLevel: LogLevel }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2LoggingLevel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetV2LoggingLevelRequest",
}) as any as S.Schema<SetV2LoggingLevelRequest>;
export interface SetV2LoggingLevelResponse {}
export const SetV2LoggingLevelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SetV2LoggingLevelResponse",
}) as any as S.Schema<SetV2LoggingLevelResponse>;
export interface SetV2LoggingOptionsRequest {
  roleArn?: string;
  defaultLogLevel?: LogLevel;
  disableAllLogs?: boolean;
  eventConfigurations?: LogEventConfiguration[];
}
export const SetV2LoggingOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.optional(S.String),
    defaultLogLevel: S.optional(LogLevel),
    disableAllLogs: S.optional(S.Boolean),
    eventConfigurations: S.optional(LogEventConfigurations),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2LoggingOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetV2LoggingOptionsRequest",
}) as any as S.Schema<SetV2LoggingOptionsRequest>;
export interface SetV2LoggingOptionsResponse {}
export const SetV2LoggingOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SetV2LoggingOptionsResponse",
}) as any as S.Schema<SetV2LoggingOptionsResponse>;
export interface StartAuditMitigationActionsTaskRequest {
  taskId: string;
  target: AuditMitigationActionsTaskTarget;
  auditCheckToActionsMapping: { [key: string]: string[] | undefined };
  clientRequestToken: string;
}
export const StartAuditMitigationActionsTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.String.pipe(T.HttpLabel("taskId")),
      target: AuditMitigationActionsTaskTarget,
      auditCheckToActionsMapping: AuditCheckToActionsMapping,
      clientRequestToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/audit/mitigationactions/tasks/{taskId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartAuditMitigationActionsTaskRequest",
}) as any as S.Schema<StartAuditMitigationActionsTaskRequest>;
export interface StartAuditMitigationActionsTaskResponse {
  taskId?: string;
}
export const StartAuditMitigationActionsTaskResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ taskId: S.optional(S.String) }),
).annotate({
  identifier: "StartAuditMitigationActionsTaskResponse",
}) as any as S.Schema<StartAuditMitigationActionsTaskResponse>;
export type DetectMitigationActionsToExecuteList = string[];
export const DetectMitigationActionsToExecuteList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface StartDetectMitigationActionsTaskRequest {
  taskId: string;
  target: DetectMitigationActionsTaskTarget;
  actions: string[];
  violationEventOccurrenceRange?: ViolationEventOccurrenceRange;
  includeOnlyActiveViolations?: boolean;
  includeSuppressedAlerts?: boolean;
  clientRequestToken: string;
}
export const StartDetectMitigationActionsTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taskId: S.String.pipe(T.HttpLabel("taskId")),
      target: DetectMitigationActionsTaskTarget,
      actions: DetectMitigationActionsToExecuteList,
      violationEventOccurrenceRange: S.optional(ViolationEventOccurrenceRange),
      includeOnlyActiveViolations: S.optional(S.Boolean),
      includeSuppressedAlerts: S.optional(S.Boolean),
      clientRequestToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/detect/mitigationactions/tasks/{taskId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartDetectMitigationActionsTaskRequest",
}) as any as S.Schema<StartDetectMitigationActionsTaskRequest>;
export interface StartDetectMitigationActionsTaskResponse {
  taskId?: string;
}
export const StartDetectMitigationActionsTaskResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ taskId: S.optional(S.String) }),
).annotate({
  identifier: "StartDetectMitigationActionsTaskResponse",
}) as any as S.Schema<StartDetectMitigationActionsTaskResponse>;
export interface StartOnDemandAuditTaskRequest {
  targetCheckNames: string[];
}
export const StartOnDemandAuditTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetCheckNames: TargetAuditCheckNames }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/audit/tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartOnDemandAuditTaskRequest",
}) as any as S.Schema<StartOnDemandAuditTaskRequest>;
export interface StartOnDemandAuditTaskResponse {
  taskId?: string;
}
export const StartOnDemandAuditTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.optional(S.String) }),
).annotate({
  identifier: "StartOnDemandAuditTaskResponse",
}) as any as S.Schema<StartOnDemandAuditTaskResponse>;
export interface StartThingRegistrationTaskRequest {
  templateBody: string;
  inputFileBucket: string;
  inputFileKey: string;
  roleArn: string;
}
export const StartThingRegistrationTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateBody: S.String,
    inputFileBucket: S.String,
    inputFileKey: S.String,
    roleArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/thing-registration-tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartThingRegistrationTaskRequest",
}) as any as S.Schema<StartThingRegistrationTaskRequest>;
export interface StartThingRegistrationTaskResponse {
  taskId?: string;
}
export const StartThingRegistrationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.optional(S.String) }),
).annotate({
  identifier: "StartThingRegistrationTaskResponse",
}) as any as S.Schema<StartThingRegistrationTaskResponse>;
export interface StopThingRegistrationTaskRequest {
  taskId: string;
}
export const StopThingRegistrationTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/thing-registration-tasks/{taskId}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopThingRegistrationTaskRequest",
}) as any as S.Schema<StopThingRegistrationTaskRequest>;
export interface StopThingRegistrationTaskResponse {}
export const StopThingRegistrationTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopThingRegistrationTaskResponse",
}) as any as S.Schema<StopThingRegistrationTaskResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
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
export type ActionType =
  | "PUBLISH"
  | "SUBSCRIBE"
  | "RECEIVE"
  | "CONNECT"
  | (string & {});
export const ActionType = S.String;

export type Resource = string;
export type Resources = string[];
export const Resources = /*@__PURE__*/ S.Array(S.String);
export interface AuthInfo {
  actionType?: ActionType;
  resources: string[];
}
export const AuthInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionType: S.optional(ActionType), resources: Resources }),
).annotate({ identifier: "AuthInfo" }) as any as S.Schema<AuthInfo>;
export type AuthInfos = AuthInfo[];
export const AuthInfos = /*@__PURE__*/ S.Array(AuthInfo);
export type PolicyNames = string[];
export const PolicyNames = /*@__PURE__*/ S.Array(S.String);
export interface TestAuthorizationRequest {
  principal?: string;
  cognitoIdentityPoolId?: string;
  authInfos: AuthInfo[];
  clientId?: string;
  policyNamesToAdd?: string[];
  policyNamesToSkip?: string[];
}
export const TestAuthorizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(S.String),
    cognitoIdentityPoolId: S.optional(S.String),
    authInfos: AuthInfos,
    clientId: S.optional(S.String).pipe(T.HttpQuery("clientId")),
    policyNamesToAdd: S.optional(PolicyNames),
    policyNamesToSkip: S.optional(PolicyNames),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/test-authorization" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestAuthorizationRequest",
}) as any as S.Schema<TestAuthorizationRequest>;
export interface Allowed {
  policies?: Policy[];
}
export const Allowed = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policies: S.optional(Policies) }),
).annotate({ identifier: "Allowed" }) as any as S.Schema<Allowed>;
export interface ImplicitDeny {
  policies?: Policy[];
}
export const ImplicitDeny = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policies: S.optional(Policies) }),
).annotate({ identifier: "ImplicitDeny" }) as any as S.Schema<ImplicitDeny>;
export interface ExplicitDeny {
  policies?: Policy[];
}
export const ExplicitDeny = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policies: S.optional(Policies) }),
).annotate({ identifier: "ExplicitDeny" }) as any as S.Schema<ExplicitDeny>;
export interface Denied {
  implicitDeny?: ImplicitDeny;
  explicitDeny?: ExplicitDeny;
}
export const Denied = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    implicitDeny: S.optional(ImplicitDeny),
    explicitDeny: S.optional(ExplicitDeny),
  }),
).annotate({ identifier: "Denied" }) as any as S.Schema<Denied>;
export type AuthDecision =
  | "ALLOWED"
  | "EXPLICIT_DENY"
  | "IMPLICIT_DENY"
  | (string & {});
export const AuthDecision = S.String;

export type MissingContextValue = string;
export type MissingContextValues = string[];
export const MissingContextValues = /*@__PURE__*/ S.Array(S.String);
export interface AuthResult {
  authInfo?: AuthInfo;
  allowed?: Allowed;
  denied?: Denied;
  authDecision?: AuthDecision;
  missingContextValues?: string[];
}
export const AuthResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authInfo: S.optional(AuthInfo),
    allowed: S.optional(Allowed),
    denied: S.optional(Denied),
    authDecision: S.optional(AuthDecision),
    missingContextValues: S.optional(MissingContextValues),
  }),
).annotate({ identifier: "AuthResult" }) as any as S.Schema<AuthResult>;
export type AuthResults = AuthResult[];
export const AuthResults = /*@__PURE__*/ S.Array(AuthResult);
export interface TestAuthorizationResponse {
  authResults?: AuthResult[];
}
export const TestAuthorizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authResults: S.optional(AuthResults) }),
).annotate({
  identifier: "TestAuthorizationResponse",
}) as any as S.Schema<TestAuthorizationResponse>;
export type Token = string;
export type TokenSignature = string;
export type HttpHeaderName = string;
export type HttpHeaderValue = string;
export type HttpHeaders = { [key: string]: string | undefined };
export const HttpHeaders = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type HttpQueryString = string;
export interface HttpContext {
  headers?: { [key: string]: string | undefined };
  queryString?: string;
}
export const HttpContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    headers: S.optional(HttpHeaders),
    queryString: S.optional(S.String),
  }),
).annotate({ identifier: "HttpContext" }) as any as S.Schema<HttpContext>;
export type MqttUsername = string;
export type MqttPassword = Uint8Array;
export type MqttClientId = string;
export interface MqttContext {
  username?: string;
  password?: Uint8Array;
  clientId?: string;
}
export const MqttContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    username: S.optional(S.String),
    password: S.optional(T.Blob),
    clientId: S.optional(S.String),
  }),
).annotate({ identifier: "MqttContext" }) as any as S.Schema<MqttContext>;
export type ServerName = string;
export interface TlsContext {
  serverName?: string;
}
export const TlsContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serverName: S.optional(S.String) }),
).annotate({ identifier: "TlsContext" }) as any as S.Schema<TlsContext>;
export interface TestInvokeAuthorizerRequest {
  authorizerName: string;
  token?: string;
  tokenSignature?: string;
  httpContext?: HttpContext;
  mqttContext?: MqttContext;
  tlsContext?: TlsContext;
}
export const TestInvokeAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
    token: S.optional(S.String),
    tokenSignature: S.optional(S.String),
    httpContext: S.optional(HttpContext),
    mqttContext: S.optional(MqttContext),
    tlsContext: S.optional(TlsContext),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/authorizer/{authorizerName}/test" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestInvokeAuthorizerRequest",
}) as any as S.Schema<TestInvokeAuthorizerRequest>;
export type IsAuthenticated = boolean;
export type PrincipalId = string;
export type PolicyDocuments = string[];
export const PolicyDocuments = /*@__PURE__*/ S.Array(S.String);
export type Seconds = number;
export interface TestInvokeAuthorizerResponse {
  isAuthenticated?: boolean;
  principalId?: string;
  policyDocuments?: string[];
  refreshAfterInSeconds?: number;
  disconnectAfterInSeconds?: number;
}
export const TestInvokeAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isAuthenticated: S.optional(S.Boolean),
    principalId: S.optional(S.String),
    policyDocuments: S.optional(PolicyDocuments),
    refreshAfterInSeconds: S.optional(S.Number),
    disconnectAfterInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "TestInvokeAuthorizerResponse",
}) as any as S.Schema<TestInvokeAuthorizerResponse>;
export interface TransferCertificateRequest {
  certificateId: string;
  targetAwsAccount: string;
  transferMessage?: string;
}
export const TransferCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.String.pipe(T.HttpLabel("certificateId")),
    targetAwsAccount: S.String.pipe(T.HttpQuery("targetAwsAccount")),
    transferMessage: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/transfer-certificate/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TransferCertificateRequest",
}) as any as S.Schema<TransferCertificateRequest>;
export interface TransferCertificateResponse {
  transferredCertificateArn?: string;
}
export const TransferCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transferredCertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "TransferCertificateResponse",
}) as any as S.Schema<TransferCertificateResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/untag" }),
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
export interface UpdateAccountAuditConfigurationRequest {
  roleArn?: string;
  auditNotificationTargetConfigurations?: {
    [key: string]: AuditNotificationTarget | undefined;
  };
  auditCheckConfigurations?: {
    [key: string]: AuditCheckConfiguration | undefined;
  };
}
export const UpdateAccountAuditConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      roleArn: S.optional(S.String),
      auditNotificationTargetConfigurations: S.optional(
        AuditNotificationTargetConfigurations,
      ),
      auditCheckConfigurations: S.optional(AuditCheckConfigurations),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/audit/configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAccountAuditConfigurationRequest",
}) as any as S.Schema<UpdateAccountAuditConfigurationRequest>;
export interface UpdateAccountAuditConfigurationResponse {}
export const UpdateAccountAuditConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateAccountAuditConfigurationResponse",
}) as any as S.Schema<UpdateAccountAuditConfigurationResponse>;
export interface UpdateAuditSuppressionRequest {
  checkName: string;
  resourceIdentifier: ResourceIdentifier;
  expirationDate?: Date;
  suppressIndefinitely?: boolean;
  description?: string;
}
export const UpdateAuditSuppressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    checkName: S.String,
    resourceIdentifier: ResourceIdentifier,
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    suppressIndefinitely: S.optional(S.Boolean),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/audit/suppressions/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAuditSuppressionRequest",
}) as any as S.Schema<UpdateAuditSuppressionRequest>;
export interface UpdateAuditSuppressionResponse {}
export const UpdateAuditSuppressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAuditSuppressionResponse",
}) as any as S.Schema<UpdateAuditSuppressionResponse>;
export interface UpdateAuthorizerRequest {
  authorizerName: string;
  authorizerFunctionArn?: string;
  tokenKeyName?: string;
  tokenSigningPublicKeys?: { [key: string]: string | undefined };
  status?: AuthorizerStatus;
  enableCachingForHttp?: boolean;
}
export const UpdateAuthorizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.String.pipe(T.HttpLabel("authorizerName")),
    authorizerFunctionArn: S.optional(S.String),
    tokenKeyName: S.optional(S.String),
    tokenSigningPublicKeys: S.optional(PublicKeyMap),
    status: S.optional(AuthorizerStatus),
    enableCachingForHttp: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/authorizer/{authorizerName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAuthorizerRequest",
}) as any as S.Schema<UpdateAuthorizerRequest>;
export interface UpdateAuthorizerResponse {
  authorizerName?: string;
  authorizerArn?: string;
}
export const UpdateAuthorizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizerName: S.optional(S.String),
    authorizerArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateAuthorizerResponse",
}) as any as S.Schema<UpdateAuthorizerResponse>;
export interface UpdateBillingGroupRequest {
  billingGroupName: string;
  billingGroupProperties: BillingGroupProperties;
  expectedVersion?: number;
}
export const UpdateBillingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingGroupName: S.String.pipe(T.HttpLabel("billingGroupName")),
    billingGroupProperties: BillingGroupProperties,
    expectedVersion: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/billing-groups/{billingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBillingGroupRequest",
}) as any as S.Schema<UpdateBillingGroupRequest>;
export interface UpdateBillingGroupResponse {
  version?: number;
}
export const UpdateBillingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.optional(S.Number) }),
).annotate({
  identifier: "UpdateBillingGroupResponse",
}) as any as S.Schema<UpdateBillingGroupResponse>;
export type RemoveAutoRegistration = boolean;
export interface UpdateCACertificateRequest {
  certificateId: string;
  newStatus?: CACertificateStatus;
  newAutoRegistrationStatus?: AutoRegistrationStatus;
  registrationConfig?: RegistrationConfig;
  removeAutoRegistration?: boolean;
}
export const UpdateCACertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.String.pipe(T.HttpLabel("certificateId")),
    newStatus: S.optional(CACertificateStatus).pipe(T.HttpQuery("newStatus")),
    newAutoRegistrationStatus: S.optional(AutoRegistrationStatus).pipe(
      T.HttpQuery("newAutoRegistrationStatus"),
    ),
    registrationConfig: S.optional(RegistrationConfig),
    removeAutoRegistration: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/cacertificate/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCACertificateRequest",
}) as any as S.Schema<UpdateCACertificateRequest>;
export interface UpdateCACertificateResponse {}
export const UpdateCACertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCACertificateResponse",
}) as any as S.Schema<UpdateCACertificateResponse>;
export interface UpdateCertificateRequest {
  certificateId: string;
  newStatus: CertificateStatus;
}
export const UpdateCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateId: S.String.pipe(T.HttpLabel("certificateId")),
    newStatus: CertificateStatus.pipe(T.HttpQuery("newStatus")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/certificates/{certificateId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCertificateRequest",
}) as any as S.Schema<UpdateCertificateRequest>;
export interface UpdateCertificateResponse {}
export const UpdateCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCertificateResponse",
}) as any as S.Schema<UpdateCertificateResponse>;
export interface UpdateCertificateProviderRequest {
  certificateProviderName: string;
  lambdaFunctionArn?: string;
  accountDefaultForOperations?: CertificateProviderOperation[];
}
export const UpdateCertificateProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.String.pipe(
      T.HttpLabel("certificateProviderName"),
    ),
    lambdaFunctionArn: S.optional(S.String),
    accountDefaultForOperations: S.optional(
      CertificateProviderAccountDefaultForOperations,
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/certificate-providers/{certificateProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCertificateProviderRequest",
}) as any as S.Schema<UpdateCertificateProviderRequest>;
export interface UpdateCertificateProviderResponse {
  certificateProviderName?: string;
  certificateProviderArn?: string;
}
export const UpdateCertificateProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateProviderName: S.optional(S.String),
    certificateProviderArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateCertificateProviderResponse",
}) as any as S.Schema<UpdateCertificateProviderResponse>;
export interface UpdateCommandRequest {
  commandId: string;
  displayName?: string;
  description?: string;
  deprecated?: boolean;
}
export const UpdateCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandId: S.String.pipe(T.HttpLabel("commandId")),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    deprecated: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/commands/{commandId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCommandRequest",
}) as any as S.Schema<UpdateCommandRequest>;
export interface UpdateCommandResponse {
  commandId?: string;
  displayName?: string;
  description?: string;
  deprecated?: boolean;
  lastUpdatedAt?: Date;
}
export const UpdateCommandResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commandId: S.optional(S.String),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    deprecated: S.optional(S.Boolean),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdateCommandResponse",
}) as any as S.Schema<UpdateCommandResponse>;
export interface UpdateCustomMetricRequest {
  metricName: string;
  displayName: string;
}
export const UpdateCustomMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.String.pipe(T.HttpLabel("metricName")),
    displayName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/custom-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCustomMetricRequest",
}) as any as S.Schema<UpdateCustomMetricRequest>;
export interface UpdateCustomMetricResponse {
  metricName?: string;
  metricArn?: string;
  metricType?: CustomMetricType;
  displayName?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const UpdateCustomMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.optional(S.String),
    metricArn: S.optional(S.String),
    metricType: S.optional(CustomMetricType),
    displayName: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateCustomMetricResponse",
}) as any as S.Schema<UpdateCustomMetricResponse>;
export interface UpdateDimensionRequest {
  name: string;
  stringValues: string[];
}
export const UpdateDimensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    stringValues: DimensionStringValues,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/dimensions/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDimensionRequest",
}) as any as S.Schema<UpdateDimensionRequest>;
export interface UpdateDimensionResponse {
  name?: string;
  arn?: string;
  type?: DimensionType;
  stringValues?: string[];
  creationDate?: Date;
  lastModifiedDate?: Date;
}
export const UpdateDimensionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.optional(S.String),
    type: S.optional(DimensionType),
    stringValues: S.optional(DimensionStringValues),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateDimensionResponse",
}) as any as S.Schema<UpdateDimensionResponse>;
export type RemoveAuthorizerConfig = boolean;
export interface UpdateDomainConfigurationRequest {
  domainConfigurationName: string;
  authorizerConfig?: AuthorizerConfig;
  domainConfigurationStatus?: DomainConfigurationStatus;
  removeAuthorizerConfig?: boolean;
  tlsConfig?: TlsConfig;
  serverCertificateConfig?: ServerCertificateConfig;
  authenticationType?: AuthenticationType;
  applicationProtocol?: ApplicationProtocol;
  clientCertificateConfig?: ClientCertificateConfig;
}
export const UpdateDomainConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.String.pipe(
      T.HttpLabel("domainConfigurationName"),
    ),
    authorizerConfig: S.optional(AuthorizerConfig),
    domainConfigurationStatus: S.optional(DomainConfigurationStatus),
    removeAuthorizerConfig: S.optional(S.Boolean),
    tlsConfig: S.optional(TlsConfig),
    serverCertificateConfig: S.optional(ServerCertificateConfig),
    authenticationType: S.optional(AuthenticationType),
    applicationProtocol: S.optional(ApplicationProtocol),
    clientCertificateConfig: S.optional(ClientCertificateConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/domainConfigurations/{domainConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainConfigurationRequest",
}) as any as S.Schema<UpdateDomainConfigurationRequest>;
export interface UpdateDomainConfigurationResponse {
  domainConfigurationName?: string;
  domainConfigurationArn?: string;
}
export const UpdateDomainConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainConfigurationName: S.optional(S.String),
    domainConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateDomainConfigurationResponse",
}) as any as S.Schema<UpdateDomainConfigurationResponse>;
export interface UpdateDynamicThingGroupRequest {
  thingGroupName: string;
  thingGroupProperties: ThingGroupProperties;
  expectedVersion?: number;
  indexName?: string;
  queryString?: string;
  queryVersion?: string;
}
export const UpdateDynamicThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    thingGroupProperties: ThingGroupProperties,
    expectedVersion: S.optional(S.Number),
    indexName: S.optional(S.String),
    queryString: S.optional(S.String),
    queryVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/dynamic-thing-groups/{thingGroupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDynamicThingGroupRequest",
}) as any as S.Schema<UpdateDynamicThingGroupRequest>;
export interface UpdateDynamicThingGroupResponse {
  version?: number;
}
export const UpdateDynamicThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.optional(S.Number) }),
).annotate({
  identifier: "UpdateDynamicThingGroupResponse",
}) as any as S.Schema<UpdateDynamicThingGroupResponse>;
export interface UpdateEncryptionConfigurationRequest {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  kmsAccessRoleArn?: string;
}
export const UpdateEncryptionConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      encryptionType: EncryptionType,
      kmsKeyArn: S.optional(S.String),
      kmsAccessRoleArn: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/encryption-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateEncryptionConfigurationRequest",
}) as any as S.Schema<UpdateEncryptionConfigurationRequest>;
export interface UpdateEncryptionConfigurationResponse {}
export const UpdateEncryptionConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateEncryptionConfigurationResponse",
}) as any as S.Schema<UpdateEncryptionConfigurationResponse>;
export interface UpdateEventConfigurationsRequest {
  eventConfigurations?: { [key: string]: Configuration | undefined };
}
export const UpdateEventConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventConfigurations: S.optional(EventConfigurations) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/event-configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEventConfigurationsRequest",
}) as any as S.Schema<UpdateEventConfigurationsRequest>;
export interface UpdateEventConfigurationsResponse {}
export const UpdateEventConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateEventConfigurationsResponse",
}) as any as S.Schema<UpdateEventConfigurationsResponse>;
export interface UpdateFleetMetricRequest {
  metricName: string;
  queryString?: string;
  aggregationType?: AggregationType;
  period?: number;
  aggregationField?: string;
  description?: string;
  queryVersion?: string;
  indexName: string;
  unit?: FleetMetricUnit;
  expectedVersion?: number;
}
export const UpdateFleetMetricRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metricName: S.String.pipe(T.HttpLabel("metricName")),
    queryString: S.optional(S.String),
    aggregationType: S.optional(AggregationType),
    period: S.optional(S.Number),
    aggregationField: S.optional(S.String),
    description: S.optional(S.String),
    queryVersion: S.optional(S.String),
    indexName: S.String,
    unit: S.optional(FleetMetricUnit),
    expectedVersion: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/fleet-metric/{metricName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFleetMetricRequest",
}) as any as S.Schema<UpdateFleetMetricRequest>;
export interface UpdateFleetMetricResponse {}
export const UpdateFleetMetricResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFleetMetricResponse",
}) as any as S.Schema<UpdateFleetMetricResponse>;
export interface UpdateIndexingConfigurationRequest {
  thingIndexingConfiguration?: ThingIndexingConfiguration;
  thingGroupIndexingConfiguration?: ThingGroupIndexingConfiguration;
}
export const UpdateIndexingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingIndexingConfiguration: S.optional(ThingIndexingConfiguration),
    thingGroupIndexingConfiguration: S.optional(
      ThingGroupIndexingConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/indexing/config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIndexingConfigurationRequest",
}) as any as S.Schema<UpdateIndexingConfigurationRequest>;
export interface UpdateIndexingConfigurationResponse {}
export const UpdateIndexingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIndexingConfigurationResponse",
}) as any as S.Schema<UpdateIndexingConfigurationResponse>;
export interface UpdateJobRequest {
  jobId: string;
  description?: string;
  presignedUrlConfig?: PresignedUrlConfig;
  jobExecutionsRolloutConfig?: JobExecutionsRolloutConfig;
  abortConfig?: AbortConfig;
  timeoutConfig?: TimeoutConfig;
  namespaceId?: string;
  jobExecutionsRetryConfig?: JobExecutionsRetryConfig;
}
export const UpdateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    description: S.optional(S.String),
    presignedUrlConfig: S.optional(PresignedUrlConfig),
    jobExecutionsRolloutConfig: S.optional(JobExecutionsRolloutConfig),
    abortConfig: S.optional(AbortConfig),
    timeoutConfig: S.optional(TimeoutConfig),
    namespaceId: S.optional(S.String).pipe(T.HttpQuery("namespaceId")),
    jobExecutionsRetryConfig: S.optional(JobExecutionsRetryConfig),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateJobRequest",
}) as any as S.Schema<UpdateJobRequest>;
export interface UpdateJobResponse {}
export const UpdateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateJobResponse",
}) as any as S.Schema<UpdateJobResponse>;
export interface UpdateMitigationActionRequest {
  actionName: string;
  roleArn?: string;
  actionParams?: MitigationActionParams;
}
export const UpdateMitigationActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionName: S.String.pipe(T.HttpLabel("actionName")),
    roleArn: S.optional(S.String),
    actionParams: S.optional(MitigationActionParams),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/mitigationactions/actions/{actionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMitigationActionRequest",
}) as any as S.Schema<UpdateMitigationActionRequest>;
export interface UpdateMitigationActionResponse {
  actionArn?: string;
  actionId?: string;
}
export const UpdateMitigationActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionArn: S.optional(S.String), actionId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateMitigationActionResponse",
}) as any as S.Schema<UpdateMitigationActionResponse>;
export type UnsetDefaultVersion = boolean;
export interface UpdatePackageRequest {
  packageName: string;
  description?: string | redacted.Redacted<string>;
  defaultVersionName?: string;
  unsetDefaultVersion?: boolean;
  clientToken?: string;
}
export const UpdatePackageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    description: S.optional(SensitiveString),
    defaultVersionName: S.optional(S.String),
    unsetDefaultVersion: S.optional(S.Boolean),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/packages/{packageName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageRequest",
}) as any as S.Schema<UpdatePackageRequest>;
export interface UpdatePackageResponse {}
export const UpdatePackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePackageResponse",
}) as any as S.Schema<UpdatePackageResponse>;
export interface UpdatePackageConfigurationRequest {
  versionUpdateByJobsConfig?: VersionUpdateByJobsConfig;
  clientToken?: string;
}
export const UpdatePackageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    versionUpdateByJobsConfig: S.optional(VersionUpdateByJobsConfig),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/package-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageConfigurationRequest",
}) as any as S.Schema<UpdatePackageConfigurationRequest>;
export interface UpdatePackageConfigurationResponse {}
export const UpdatePackageConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePackageConfigurationResponse",
}) as any as S.Schema<UpdatePackageConfigurationResponse>;
export type PackageVersionAction = "PUBLISH" | "DEPRECATE" | (string & {});
export const PackageVersionAction = S.String;

export interface UpdatePackageVersionRequest {
  packageName: string;
  versionName: string;
  description?: string | redacted.Redacted<string>;
  attributes?: { [key: string]: string | undefined };
  artifact?: PackageVersionArtifact;
  action?: PackageVersionAction;
  recipe?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const UpdatePackageVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packageName: S.String.pipe(T.HttpLabel("packageName")),
    versionName: S.String.pipe(T.HttpLabel("versionName")),
    description: S.optional(SensitiveString),
    attributes: S.optional(ResourceAttributes),
    artifact: S.optional(PackageVersionArtifact),
    action: S.optional(PackageVersionAction),
    recipe: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/packages/{packageName}/versions/{versionName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePackageVersionRequest",
}) as any as S.Schema<UpdatePackageVersionRequest>;
export interface UpdatePackageVersionResponse {}
export const UpdatePackageVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePackageVersionResponse",
}) as any as S.Schema<UpdatePackageVersionResponse>;
export type RemoveHook = boolean;
export interface UpdateProvisioningTemplateRequest {
  templateName: string;
  description?: string;
  enabled?: boolean;
  defaultVersionId?: number;
  provisioningRoleArn?: string;
  preProvisioningHook?: ProvisioningHook;
  removePreProvisioningHook?: boolean;
}
export const UpdateProvisioningTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String.pipe(T.HttpLabel("templateName")),
    description: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    defaultVersionId: S.optional(S.Number),
    provisioningRoleArn: S.optional(S.String),
    preProvisioningHook: S.optional(ProvisioningHook),
    removePreProvisioningHook: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/provisioning-templates/{templateName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProvisioningTemplateRequest",
}) as any as S.Schema<UpdateProvisioningTemplateRequest>;
export interface UpdateProvisioningTemplateResponse {}
export const UpdateProvisioningTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateProvisioningTemplateResponse",
}) as any as S.Schema<UpdateProvisioningTemplateResponse>;
export interface UpdateRoleAliasRequest {
  roleAlias: string;
  roleArn?: string;
  credentialDurationSeconds?: number;
}
export const UpdateRoleAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleAlias: S.String.pipe(T.HttpLabel("roleAlias")),
    roleArn: S.optional(S.String),
    credentialDurationSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/role-aliases/{roleAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRoleAliasRequest",
}) as any as S.Schema<UpdateRoleAliasRequest>;
export interface UpdateRoleAliasResponse {
  roleAlias?: string;
  roleAliasArn?: string;
}
export const UpdateRoleAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleAlias: S.optional(S.String),
    roleAliasArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateRoleAliasResponse",
}) as any as S.Schema<UpdateRoleAliasResponse>;
export interface UpdateScheduledAuditRequest {
  frequency?: AuditFrequency;
  dayOfMonth?: string;
  dayOfWeek?: DayOfWeek;
  targetCheckNames?: string[];
  scheduledAuditName: string;
}
export const UpdateScheduledAuditRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    frequency: S.optional(AuditFrequency),
    dayOfMonth: S.optional(S.String),
    dayOfWeek: S.optional(DayOfWeek),
    targetCheckNames: S.optional(TargetAuditCheckNames),
    scheduledAuditName: S.String.pipe(T.HttpLabel("scheduledAuditName")),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/audit/scheduledaudits/{scheduledAuditName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScheduledAuditRequest",
}) as any as S.Schema<UpdateScheduledAuditRequest>;
export interface UpdateScheduledAuditResponse {
  scheduledAuditArn?: string;
}
export const UpdateScheduledAuditResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheduledAuditArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateScheduledAuditResponse",
}) as any as S.Schema<UpdateScheduledAuditResponse>;
export type DeleteBehaviors = boolean;
export type DeleteAlertTargets = boolean;
export type DeleteAdditionalMetricsToRetain = boolean;
export type DeleteMetricsExportConfig = boolean;
export interface UpdateSecurityProfileRequest {
  securityProfileName: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  deleteBehaviors?: boolean;
  deleteAlertTargets?: boolean;
  deleteAdditionalMetricsToRetain?: boolean;
  expectedVersion?: number;
  metricsExportConfig?: MetricsExportConfig;
  deleteMetricsExportConfig?: boolean;
}
export const UpdateSecurityProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.String.pipe(T.HttpLabel("securityProfileName")),
    securityProfileDescription: S.optional(S.String),
    behaviors: S.optional(Behaviors),
    alertTargets: S.optional(AlertTargets),
    additionalMetricsToRetain: S.optional(AdditionalMetricsToRetainList),
    additionalMetricsToRetainV2: S.optional(AdditionalMetricsToRetainV2List),
    deleteBehaviors: S.optional(S.Boolean),
    deleteAlertTargets: S.optional(S.Boolean),
    deleteAdditionalMetricsToRetain: S.optional(S.Boolean),
    expectedVersion: S.optional(S.Number).pipe(T.HttpQuery("expectedVersion")),
    metricsExportConfig: S.optional(MetricsExportConfig),
    deleteMetricsExportConfig: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/security-profiles/{securityProfileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSecurityProfileRequest",
}) as any as S.Schema<UpdateSecurityProfileRequest>;
export interface UpdateSecurityProfileResponse {
  securityProfileName?: string;
  securityProfileArn?: string;
  securityProfileDescription?: string;
  behaviors?: Behavior[];
  alertTargets?: { [key: string]: AlertTarget | undefined };
  additionalMetricsToRetain?: string[];
  additionalMetricsToRetainV2?: MetricToRetain[];
  version?: number;
  creationDate?: Date;
  lastModifiedDate?: Date;
  metricsExportConfig?: MetricsExportConfig;
}
export const UpdateSecurityProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityProfileName: S.optional(S.String),
    securityProfileArn: S.optional(S.String),
    securityProfileDescription: S.optional(S.String),
    behaviors: S.optional(Behaviors),
    alertTargets: S.optional(AlertTargets),
    additionalMetricsToRetain: S.optional(AdditionalMetricsToRetainList),
    additionalMetricsToRetainV2: S.optional(AdditionalMetricsToRetainV2List),
    version: S.optional(S.Number),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    metricsExportConfig: S.optional(MetricsExportConfig),
  }),
).annotate({
  identifier: "UpdateSecurityProfileResponse",
}) as any as S.Schema<UpdateSecurityProfileResponse>;
export interface UpdateStreamRequest {
  streamId: string;
  description?: string;
  files?: StreamFile[];
  roleArn?: string;
}
export const UpdateStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamId: S.String.pipe(T.HttpLabel("streamId")),
    description: S.optional(S.String),
    files: S.optional(StreamFiles),
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/streams/{streamId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStreamRequest",
}) as any as S.Schema<UpdateStreamRequest>;
export interface UpdateStreamResponse {
  streamId?: string;
  streamArn?: string;
  description?: string;
  streamVersion?: number;
}
export const UpdateStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    streamId: S.optional(S.String),
    streamArn: S.optional(S.String),
    description: S.optional(S.String),
    streamVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateStreamResponse",
}) as any as S.Schema<UpdateStreamResponse>;
export type RemoveThingType = boolean;
export interface UpdateThingRequest {
  thingName: string;
  thingTypeName?: string;
  attributePayload?: AttributePayload;
  expectedVersion?: number;
  removeThingType?: boolean;
}
export const UpdateThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.String.pipe(T.HttpLabel("thingName")),
    thingTypeName: S.optional(S.String),
    attributePayload: S.optional(AttributePayload),
    expectedVersion: S.optional(S.Number),
    removeThingType: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/things/{thingName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThingRequest",
}) as any as S.Schema<UpdateThingRequest>;
export interface UpdateThingResponse {}
export const UpdateThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateThingResponse",
}) as any as S.Schema<UpdateThingResponse>;
export interface UpdateThingGroupRequest {
  thingGroupName: string;
  thingGroupProperties: ThingGroupProperties;
  expectedVersion?: number;
}
export const UpdateThingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingGroupName: S.String.pipe(T.HttpLabel("thingGroupName")),
    thingGroupProperties: ThingGroupProperties,
    expectedVersion: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/thing-groups/{thingGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThingGroupRequest",
}) as any as S.Schema<UpdateThingGroupRequest>;
export interface UpdateThingGroupResponse {
  version?: number;
}
export const UpdateThingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ version: S.optional(S.Number) }),
).annotate({
  identifier: "UpdateThingGroupResponse",
}) as any as S.Schema<UpdateThingGroupResponse>;
export type ThingGroupList = string[];
export const ThingGroupList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateThingGroupsForThingRequest {
  thingName?: string;
  thingGroupsToAdd?: string[];
  thingGroupsToRemove?: string[];
  overrideDynamicGroups?: boolean;
}
export const UpdateThingGroupsForThingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingName: S.optional(S.String),
    thingGroupsToAdd: S.optional(ThingGroupList),
    thingGroupsToRemove: S.optional(ThingGroupList),
    overrideDynamicGroups: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/thing-groups/updateThingGroupsForThing" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThingGroupsForThingRequest",
}) as any as S.Schema<UpdateThingGroupsForThingRequest>;
export interface UpdateThingGroupsForThingResponse {}
export const UpdateThingGroupsForThingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateThingGroupsForThingResponse",
}) as any as S.Schema<UpdateThingGroupsForThingResponse>;
export interface UpdateThingTypeRequest {
  thingTypeName: string;
  thingTypeProperties?: ThingTypeProperties;
}
export const UpdateThingTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thingTypeName: S.String.pipe(T.HttpLabel("thingTypeName")),
    thingTypeProperties: S.optional(ThingTypeProperties),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/thing-types/{thingTypeName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThingTypeRequest",
}) as any as S.Schema<UpdateThingTypeRequest>;
export interface UpdateThingTypeResponse {}
export const UpdateThingTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateThingTypeResponse",
}) as any as S.Schema<UpdateThingTypeResponse>;
export interface UpdateTopicRuleDestinationRequest {
  arn: string;
  status: TopicRuleDestinationStatus;
}
export const UpdateTopicRuleDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, status: TopicRuleDestinationStatus }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/destinations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTopicRuleDestinationRequest",
}) as any as S.Schema<UpdateTopicRuleDestinationRequest>;
export interface UpdateTopicRuleDestinationResponse {}
export const UpdateTopicRuleDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTopicRuleDestinationResponse",
}) as any as S.Schema<UpdateTopicRuleDestinationResponse>;
export interface ValidateSecurityProfileBehaviorsRequest {
  behaviors: Behavior[];
}
export const ValidateSecurityProfileBehaviorsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ behaviors: Behaviors }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/security-profile-behaviors/validate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ValidateSecurityProfileBehaviorsRequest",
}) as any as S.Schema<ValidateSecurityProfileBehaviorsRequest>;
export type Valid = boolean;
export interface ValidationError {
  errorMessage?: string;
}
export const ValidationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorMessage: S.optional(S.String) }),
).annotate({
  identifier: "ValidationError",
}) as any as S.Schema<ValidationError>;
export type ValidationErrors = ValidationError[];
export const ValidationErrors = /*@__PURE__*/ S.Array(ValidationError);
export interface ValidateSecurityProfileBehaviorsResponse {
  valid?: boolean;
  validationErrors?: ValidationError[];
}
export const ValidateSecurityProfileBehaviorsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      valid: S.optional(S.Boolean),
      validationErrors: S.optional(ValidationErrors),
    }),
).annotate({
  identifier: "ValidateSecurityProfileBehaviorsResponse",
}) as any as S.Schema<ValidateSecurityProfileBehaviorsResponse>;
export type ErrorMessage2 = string;
export type ResourceId = string;
export type AcceptCertificateTransferError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferAlreadyCompletedException
  | UnauthorizedException
  | CommonErrors;
/**
 * Accepts a pending certificate transfer. The default state of the certificate is
 * INACTIVE.
 *
 * To check for pending certificate transfers, call ListCertificates
 * to enumerate your certificates.
 *
 * Requires permission to access the AcceptCertificateTransfer action.
 */
export const acceptCertificateTransfer: API.OperationMethod<
  AcceptCertificateTransferRequest,
  AcceptCertificateTransferResponse,
  AcceptCertificateTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptCertificateTransferRequest,
  output: AcceptCertificateTransferResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferAlreadyCompletedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptCertificateTransfer",
}));

export type AddThingToBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a thing to a billing group.
 *
 * Requires permission to access the AddThingToBillingGroup action.
 */
export const addThingToBillingGroup: API.OperationMethod<
  AddThingToBillingGroupRequest,
  AddThingToBillingGroupResponse,
  AddThingToBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddThingToBillingGroupRequest,
  output: AddThingToBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddThingToBillingGroup",
}));

export type AddThingToThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds a thing to a thing group.
 *
 * Requires permission to access the AddThingToThingGroup action.
 */
export const addThingToThingGroup: API.OperationMethod<
  AddThingToThingGroupRequest,
  AddThingToThingGroupResponse,
  AddThingToThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddThingToThingGroupRequest,
  output: AddThingToThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddThingToThingGroup",
}));

export type AssociateSbomWithPackageVersionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the selected software bill of materials (SBOM) with a specific software package version.
 *
 * Requires permission to access the AssociateSbomWithPackageVersion action.
 */
export const associateSbomWithPackageVersion: API.OperationMethod<
  AssociateSbomWithPackageVersionRequest,
  AssociateSbomWithPackageVersionResponse,
  AssociateSbomWithPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSbomWithPackageVersionRequest,
  output: AssociateSbomWithPackageVersionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSbomWithPackageVersion",
}));

export type AssociateTargetsWithJobError =
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a group with a continuous job. The following criteria must be met:
 *
 * - The job must have been created with the `targetSelection` field
 * set to "CONTINUOUS".
 *
 * - The job status must currently be "IN_PROGRESS".
 *
 * - The total number of targets associated with a job must not exceed
 * 100.
 *
 * Requires permission to access the AssociateTargetsWithJob action.
 */
export const associateTargetsWithJob: API.OperationMethod<
  AssociateTargetsWithJobRequest,
  AssociateTargetsWithJobResponse,
  AssociateTargetsWithJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateTargetsWithJobRequest,
  output: AssociateTargetsWithJobResponse,
  errors: [
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateTargetsWithJob",
}));

export type AttachPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches the specified policy to the specified principal (certificate or other
 * credential).
 *
 * Requires permission to access the AttachPolicy action.
 */
export const attachPolicy: API.OperationMethod<
  AttachPolicyRequest,
  AttachPolicyResponse,
  AttachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachPolicyRequest,
  output: AttachPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPolicy",
}));

export type AttachPrincipalPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches the specified policy to the specified principal (certificate or other
 * credential).
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use AttachPolicy instead.
 *
 * Requires permission to access the AttachPrincipalPolicy action.
 */
export const attachPrincipalPolicy: API.OperationMethod<
  AttachPrincipalPolicyRequest,
  AttachPrincipalPolicyResponse,
  AttachPrincipalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachPrincipalPolicyRequest,
  output: AttachPrincipalPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPrincipalPolicy",
}));

export type AttachSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Associates a Device Defender security profile with a thing group or this account. Each
 * thing group or account can have up to five security profiles associated with it.
 *
 * Requires permission to access the AttachSecurityProfile action.
 */
export const attachSecurityProfile: API.OperationMethod<
  AttachSecurityProfileRequest,
  AttachSecurityProfileResponse,
  AttachSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachSecurityProfileRequest,
  output: AttachSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachSecurityProfile",
}));

export type AttachThingPrincipalError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Attaches the specified principal to the specified thing. A principal can be X.509
 * certificates, Amazon Cognito identities or federated identities.
 *
 * Requires permission to access the AttachThingPrincipal action.
 */
export const attachThingPrincipal: API.OperationMethod<
  AttachThingPrincipalRequest,
  AttachThingPrincipalResponse,
  AttachThingPrincipalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachThingPrincipalRequest,
  output: AttachThingPrincipalResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachThingPrincipal",
}));

export type CancelAuditMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a mitigation action task that is in progress. If the task
 * is not
 * in progress, an InvalidRequestException occurs.
 *
 * Requires permission to access the CancelAuditMitigationActionsTask action.
 */
export const cancelAuditMitigationActionsTask: API.OperationMethod<
  CancelAuditMitigationActionsTaskRequest,
  CancelAuditMitigationActionsTaskResponse,
  CancelAuditMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAuditMitigationActionsTaskRequest,
  output: CancelAuditMitigationActionsTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAuditMitigationActionsTask",
}));

export type CancelAuditTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels an audit that is in progress. The audit can be either scheduled or on demand. If the audit isn't in progress, an "InvalidRequestException" occurs.
 *
 * Requires permission to access the CancelAuditTask action.
 */
export const cancelAuditTask: API.OperationMethod<
  CancelAuditTaskRequest,
  CancelAuditTaskResponse,
  CancelAuditTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAuditTaskRequest,
  output: CancelAuditTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAuditTask",
}));

export type CancelCertificateTransferError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferAlreadyCompletedException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels a pending transfer for the specified certificate.
 *
 * **Note** Only the transfer source account can use this
 * operation to cancel a transfer. (Transfer destinations can use RejectCertificateTransfer instead.) After transfer, IoT returns the
 * certificate to the source account in the INACTIVE state. After the destination account has
 * accepted the transfer, the transfer cannot be cancelled.
 *
 * After a certificate transfer is cancelled, the status of the certificate changes from
 * PENDING_TRANSFER to INACTIVE.
 *
 * Requires permission to access the CancelCertificateTransfer action.
 */
export const cancelCertificateTransfer: API.OperationMethod<
  CancelCertificateTransferRequest,
  CancelCertificateTransferResponse,
  CancelCertificateTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelCertificateTransferRequest,
  output: CancelCertificateTransferResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferAlreadyCompletedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCertificateTransfer",
}));

export type CancelDetectMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Cancels a Device Defender ML Detect mitigation action.
 *
 * Requires permission to access the CancelDetectMitigationActionsTask action.
 */
export const cancelDetectMitigationActionsTask: API.OperationMethod<
  CancelDetectMitigationActionsTaskRequest,
  CancelDetectMitigationActionsTaskResponse,
  CancelDetectMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelDetectMitigationActionsTaskRequest,
  output: CancelDetectMitigationActionsTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDetectMitigationActionsTask",
}));

export type CancelJobError =
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Cancels a job.
 *
 * Requires permission to access the CancelJob action.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResponse,
  errors: [
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CancelJobExecutionError =
  | InvalidRequestException
  | InvalidStateTransitionException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Cancels the execution of a job for a given thing.
 *
 * Requires permission to access the CancelJobExecution action.
 */
export const cancelJobExecution: API.OperationMethod<
  CancelJobExecutionRequest,
  CancelJobExecutionResponse,
  CancelJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobExecutionRequest,
  output: CancelJobExecutionResponse,
  errors: [
    InvalidRequestException,
    InvalidStateTransitionException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJobExecution",
}));

export type ClearDefaultAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Clears the default authorizer.
 *
 * Requires permission to access the ClearDefaultAuthorizer action.
 */
export const clearDefaultAuthorizer: API.OperationMethod<
  ClearDefaultAuthorizerRequest,
  ClearDefaultAuthorizerResponse,
  ClearDefaultAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ClearDefaultAuthorizerRequest,
  output: ClearDefaultAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClearDefaultAuthorizer",
}));

export type ConfirmTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Confirms a topic rule destination. When you create a rule requiring a destination, IoT
 * sends a confirmation message to the endpoint or base address you specify. The message
 * includes a token which you pass back when calling `ConfirmTopicRuleDestination`
 * to confirm that you own or have access to the endpoint.
 *
 * Requires permission to access the ConfirmTopicRuleDestination action.
 */
export const confirmTopicRuleDestination: API.OperationMethod<
  ConfirmTopicRuleDestinationRequest,
  ConfirmTopicRuleDestinationResponse,
  ConfirmTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfirmTopicRuleDestinationRequest,
  output: ConfirmTopicRuleDestinationResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfirmTopicRuleDestination",
}));

export type CreateAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Device Defender audit suppression.
 *
 * Requires permission to access the CreateAuditSuppression action.
 */
export const createAuditSuppression: API.OperationMethod<
  CreateAuditSuppressionRequest,
  CreateAuditSuppressionResponse,
  CreateAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAuditSuppressionRequest,
  output: CreateAuditSuppressionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuditSuppression",
}));

export type CreateAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an authorizer.
 *
 * Requires permission to access the CreateAuthorizer action.
 */
export const createAuthorizer: API.OperationMethod<
  CreateAuthorizerRequest,
  CreateAuthorizerResponse,
  CreateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAuthorizerRequest,
  output: CreateAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAuthorizer",
}));

export type CreateBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a billing group. If this call is made multiple times using
 * the same billing group name and configuration, the call will succeed. If this call is made with
 * the same billing group name but different configuration a `ResourceAlreadyExistsException` is thrown.
 *
 * Requires permission to access the CreateBillingGroup action.
 */
export const createBillingGroup: API.OperationMethod<
  CreateBillingGroupRequest,
  CreateBillingGroupResponse,
  CreateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBillingGroupRequest,
  output: CreateBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingGroup",
}));

export type CreateCertificateFromCsrError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an X.509 certificate using the specified certificate signing
 * request.
 *
 * Requires permission to access the CreateCertificateFromCsr action.
 *
 * The CSR must include a public key that is either an RSA key with a length of at least
 * 2048 bits or an ECC key from NIST P-256, NIST P-384, or NIST P-521 curves. For supported
 * certificates, consult Certificate signing algorithms supported by IoT.
 *
 * Reusing the same certificate signing request (CSR)
 * results in a distinct certificate.
 *
 * You can create multiple certificates in a batch by creating a directory, copying
 * multiple `.csr` files into that directory, and then specifying that directory on the command
 * line. The following commands show how to create a batch of certificates given a batch of
 * CSRs. In the following commands, we assume that a set of CSRs are located inside of the
 * directory my-csr-directory:
 *
 * On Linux and OS X, the command is:
 *
 * $ ls my-csr-directory/ | xargs -I {} aws iot create-certificate-from-csr
 * --certificate-signing-request file://my-csr-directory/{}
 *
 * This command lists all of the CSRs in my-csr-directory and pipes each CSR file name
 * to the `aws iot create-certificate-from-csr` Amazon Web Services CLI command to create a certificate for
 * the corresponding CSR.
 *
 * You can also run the `aws iot create-certificate-from-csr` part of the
 * command in parallel to speed up the certificate creation process:
 *
 * $ ls my-csr-directory/ | xargs -P 10 -I {} aws iot create-certificate-from-csr
 * --certificate-signing-request file://my-csr-directory/{}
 *
 * On Windows PowerShell, the command to create certificates for all CSRs in
 * my-csr-directory is:
 *
 * > ls -Name my-csr-directory | %{aws iot create-certificate-from-csr
 * --certificate-signing-request file://my-csr-directory/$_}
 *
 * On a Windows command prompt, the command to create certificates for all CSRs in
 * my-csr-directory is:
 *
 * > forfiles /p my-csr-directory /c "cmd /c aws iot create-certificate-from-csr
 * --certificate-signing-request file://@path"
 */
export const createCertificateFromCsr: API.OperationMethod<
  CreateCertificateFromCsrRequest,
  CreateCertificateFromCsrResponse,
  CreateCertificateFromCsrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCertificateFromCsrRequest,
  output: CreateCertificateFromCsrResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateFromCsr",
}));

export type CreateCertificateProviderError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an Amazon Web Services IoT Core certificate provider. You can use Amazon Web Services IoT Core certificate provider to
 * customize how to sign a certificate signing request (CSR) in IoT fleet provisioning. For
 * more information, see Customizing certificate
 * signing using Amazon Web Services IoT Core certificate provider from Amazon Web Services IoT Core Developer
 * Guide.
 *
 * Requires permission to access the CreateCertificateProvider action.
 *
 * After you create a certificate provider, the behavior of
 * `CreateCertificateFromCsr` API for fleet provisioning will
 * change and all API calls to `CreateCertificateFromCsr` will invoke the
 * certificate provider to create the certificates. It can take up to a few minutes for
 * this behavior to change after a certificate provider is created.
 */
export const createCertificateProvider: API.OperationMethod<
  CreateCertificateProviderRequest,
  CreateCertificateProviderResponse,
  CreateCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCertificateProviderRequest,
  output: CreateCertificateProviderResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCertificateProvider",
}));

export type CreateCommandError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a command. A command contains reusable configurations that can be applied
 * before they are sent to the devices.
 */
export const createCommand: API.OperationMethod<
  CreateCommandRequest,
  CreateCommandResponse,
  CreateCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCommandRequest,
  output: CreateCommandResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCommand",
}));

export type CreateCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Use this API to define a
 * Custom
 * Metric
 * published by your devices to Device Defender.
 *
 * Requires permission to access the CreateCustomMetric action.
 */
export const createCustomMetric: API.OperationMethod<
  CreateCustomMetricRequest,
  CreateCustomMetricResponse,
  CreateCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomMetricRequest,
  output: CreateCustomMetricResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomMetric",
}));

export type CreateDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Create a dimension that you can use to limit the scope of a metric used in a security profile for IoT Device Defender.
 * For example, using a `TOPIC_FILTER` dimension, you can narrow down the scope of the metric only to MQTT topics whose name match the pattern specified in the dimension.
 *
 * Requires permission to access the CreateDimension action.
 */
export const createDimension: API.OperationMethod<
  CreateDimensionRequest,
  CreateDimensionResponse,
  CreateDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDimensionRequest,
  output: CreateDimensionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDimension",
}));

export type CreateDomainConfigurationError =
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a domain configuration.
 *
 * Requires permission to access the CreateDomainConfiguration action.
 */
export const createDomainConfiguration: API.OperationMethod<
  CreateDomainConfigurationRequest,
  CreateDomainConfigurationResponse,
  CreateDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainConfigurationRequest,
  output: CreateDomainConfigurationResponse,
  errors: [
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainConfiguration",
}));

export type CreateDynamicThingGroupError =
  | InternalFailureException
  | InvalidQueryException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a dynamic thing group.
 *
 * Requires permission to access the CreateDynamicThingGroup action.
 */
export const createDynamicThingGroup: API.OperationMethod<
  CreateDynamicThingGroupRequest,
  CreateDynamicThingGroupResponse,
  CreateDynamicThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDynamicThingGroupRequest,
  output: CreateDynamicThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidQueryException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDynamicThingGroup",
}));

export type CreateFleetMetricError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a fleet metric.
 *
 * Requires permission to access the CreateFleetMetric action.
 */
export const createFleetMetric: API.OperationMethod<
  CreateFleetMetricRequest,
  CreateFleetMetricResponse,
  CreateFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetMetricRequest,
  output: CreateFleetMetricResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleetMetric",
}));

export type CreateJobError =
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a job.
 *
 * Requires permission to access the CreateJob action.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResponse,
  errors: [
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateJobTemplateError =
  | ConflictException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a job template.
 *
 * Requires permission to access the CreateJobTemplate action.
 */
export const createJobTemplate: API.OperationMethod<
  CreateJobTemplateRequest,
  CreateJobTemplateResponse,
  CreateJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobTemplateRequest,
  output: CreateJobTemplateResponse,
  errors: [
    ConflictException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobTemplate",
}));

export type CreateKeysAndCertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a 2048-bit RSA key pair and issues an X.509 certificate using the issued
 * public key. You can also call `CreateKeysAndCertificate` over MQTT from a
 * device, for more information, see Provisioning MQTT API.
 *
 * **Note** This is the only time IoT issues the private key
 * for this certificate, so it is important to keep it in a secure location.
 *
 * Requires permission to access the CreateKeysAndCertificate action.
 */
export const createKeysAndCertificate: API.OperationMethod<
  CreateKeysAndCertificateRequest,
  CreateKeysAndCertificateResponse,
  CreateKeysAndCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateKeysAndCertificateRequest,
  output: CreateKeysAndCertificateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeysAndCertificate",
}));

export type CreateMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Defines an action that can be applied to audit findings by using StartAuditMitigationActionsTask. Only certain types of mitigation actions can be applied to specific check names.
 * For more information, see Mitigation actions. Each mitigation action can apply only one type of change.
 *
 * Requires permission to access the CreateMitigationAction action.
 */
export const createMitigationAction: API.OperationMethod<
  CreateMitigationActionRequest,
  CreateMitigationActionResponse,
  CreateMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMitigationActionRequest,
  output: CreateMitigationActionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMitigationAction",
}));

export type CreateOTAUpdateError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an IoT OTA update on a target group of things or groups.
 *
 * Requires permission to access the CreateOTAUpdate action.
 */
export const createOTAUpdate: API.OperationMethod<
  CreateOTAUpdateRequest,
  CreateOTAUpdateResponse,
  CreateOTAUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOTAUpdateRequest,
  output: CreateOTAUpdateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOTAUpdate",
}));

export type CreatePackageError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an IoT software package that can be deployed to your fleet.
 *
 * Requires permission to access the CreatePackage and GetIndexingConfiguration actions.
 */
export const createPackage: API.OperationMethod<
  CreatePackageRequest,
  CreatePackageResponse,
  CreatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackageRequest,
  output: CreatePackageResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackage",
}));

export type CreatePackageVersionError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version for an existing IoT software package.
 *
 * Requires permission to access the CreatePackageVersion and GetIndexingConfiguration actions.
 */
export const createPackageVersion: API.OperationMethod<
  CreatePackageVersionRequest,
  CreatePackageVersionResponse,
  CreatePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackageVersionRequest,
  output: CreatePackageVersionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackageVersion",
}));

export type CreatePolicyError =
  | InternalFailureException
  | InvalidRequestException
  | MalformedPolicyException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates an IoT policy.
 *
 * The created policy is the default version for the policy. This operation creates a
 * policy version with a version identifier of **1** and sets
 * **1** as the policy's default version.
 *
 * Requires permission to access the CreatePolicy action.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MalformedPolicyException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type CreatePolicyVersionError =
  | InternalFailureException
  | InvalidRequestException
  | MalformedPolicyException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionsLimitExceededException
  | CommonErrors;
/**
 * Creates a new version of the specified IoT policy. To update a policy, create a
 * new policy version. A managed policy can have up to five versions. If the policy has five
 * versions, you must use DeletePolicyVersion to delete an existing version
 * before you create a new one.
 *
 * Optionally, you can set the new version as the policy's default version. The default
 * version is the operative version (that is, the version that is in effect for the
 * certificates to which the policy is attached).
 *
 * Requires permission to access the CreatePolicyVersion action.
 */
export const createPolicyVersion: API.OperationMethod<
  CreatePolicyVersionRequest,
  CreatePolicyVersionResponse,
  CreatePolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyVersionRequest,
  output: CreatePolicyVersionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    MalformedPolicyException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyVersion",
}));

export type CreateProvisioningClaimError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a provisioning claim.
 *
 * Requires permission to access the CreateProvisioningClaim action.
 */
export const createProvisioningClaim: API.OperationMethod<
  CreateProvisioningClaimRequest,
  CreateProvisioningClaimResponse,
  CreateProvisioningClaimError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisioningClaimRequest,
  output: CreateProvisioningClaimResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningClaim",
}));

export type CreateProvisioningTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a provisioning template.
 *
 * Requires permission to access the CreateProvisioningTemplate action.
 */
export const createProvisioningTemplate: API.OperationMethod<
  CreateProvisioningTemplateRequest,
  CreateProvisioningTemplateResponse,
  CreateProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisioningTemplateRequest,
  output: CreateProvisioningTemplateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningTemplate",
}));

export type CreateProvisioningTemplateVersionError =
  | ConflictingResourceUpdateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | VersionsLimitExceededException
  | CommonErrors;
/**
 * Creates a new version of a provisioning template.
 *
 * Requires permission to access the CreateProvisioningTemplateVersion action.
 */
export const createProvisioningTemplateVersion: API.OperationMethod<
  CreateProvisioningTemplateVersionRequest,
  CreateProvisioningTemplateVersionResponse,
  CreateProvisioningTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProvisioningTemplateVersionRequest,
  output: CreateProvisioningTemplateVersionResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    VersionsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisioningTemplateVersion",
}));

export type CreateRoleAliasError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a role alias.
 *
 * Requires permission to access the CreateRoleAlias action.
 *
 * The value of
 * `credentialDurationSeconds`
 * must be less than or equal to the maximum session
 * duration of the IAM role that the role alias references. For more information, see
 *
 * Modifying a role maximum session duration (Amazon Web Services API) from the Amazon Web Services Identity and Access Management User Guide.
 */
export const createRoleAlias: API.OperationMethod<
  CreateRoleAliasRequest,
  CreateRoleAliasResponse,
  CreateRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRoleAliasRequest,
  output: CreateRoleAliasResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRoleAlias",
}));

export type CreateScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a scheduled audit that is run at a specified
 * time interval.
 *
 * Requires permission to access the CreateScheduledAudit action.
 */
export const createScheduledAudit: API.OperationMethod<
  CreateScheduledAuditRequest,
  CreateScheduledAuditResponse,
  CreateScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScheduledAuditRequest,
  output: CreateScheduledAuditResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledAudit",
}));

export type CreateSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Creates a Device Defender security profile.
 *
 * Requires permission to access the CreateSecurityProfile action.
 */
export const createSecurityProfile: API.OperationMethod<
  CreateSecurityProfileRequest,
  CreateSecurityProfileResponse,
  CreateSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSecurityProfileRequest,
  output: CreateSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityProfile",
}));

export type CreateStreamError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a stream for delivering one or more large files in chunks over MQTT. A stream transports data
 * bytes in chunks or blocks packaged as MQTT messages from a source like S3. You can have one or more files
 * associated with a stream.
 *
 * Requires permission to access the CreateStream action.
 */
export const createStream: API.OperationMethod<
  CreateStreamRequest,
  CreateStreamResponse,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStreamRequest,
  output: CreateStreamResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
}));

export type CreateThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a thing record in the registry. If this call is made multiple times using
 * the same thing name and configuration, the call will succeed. If this call is made with
 * the same thing name but different configuration a
 * `ResourceAlreadyExistsException` is thrown.
 *
 * This is a control plane operation. See Authorization for
 * information about authorizing control plane actions.
 *
 * Requires permission to access the CreateThing action.
 */
export const createThing: API.OperationMethod<
  CreateThingRequest,
  CreateThingResponse,
  CreateThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThingRequest,
  output: CreateThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThing",
}));

export type CreateThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Create a thing group.
 *
 * This is a control plane operation. See Authorization for
 * information about authorizing control plane actions.
 *
 * If the `ThingGroup` that you create has the exact same attributes as an existing
 * `ThingGroup`, you will get a 200 success response.
 *
 * Requires permission to access the CreateThingGroup action.
 */
export const createThingGroup: API.OperationMethod<
  CreateThingGroupRequest,
  CreateThingGroupResponse,
  CreateThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThingGroupRequest,
  output: CreateThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThingGroup",
}));

export type CreateThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new thing type. If this call is made multiple times using
 * the same thing type name and configuration, the call will succeed. If this call is made with
 * the same thing type name but different configuration a `ResourceAlreadyExistsException` is thrown.
 *
 * Requires permission to access the CreateThingType action.
 */
export const createThingType: API.OperationMethod<
  CreateThingTypeRequest,
  CreateThingTypeResponse,
  CreateThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThingTypeRequest,
  output: CreateThingTypeResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThingType",
}));

export type CreateTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | SqlParseException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a rule. Creating rules is an administrator-level action. Any user who has
 * permission to create rules will be able to access data processed by the rule.
 *
 * Requires permission to access the CreateTopicRule action.
 */
export const createTopicRule: API.OperationMethod<
  CreateTopicRuleRequest,
  CreateTopicRuleResponse,
  CreateTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTopicRuleRequest,
  output: CreateTopicRuleResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    SqlParseException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopicRule",
}));

export type CreateTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a topic rule destination. The destination must be confirmed prior to use.
 *
 * Requires permission to access the CreateTopicRuleDestination action.
 */
export const createTopicRuleDestination: API.OperationMethod<
  CreateTopicRuleDestinationRequest,
  CreateTopicRuleDestinationResponse,
  CreateTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTopicRuleDestinationRequest,
  output: CreateTopicRuleDestinationResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTopicRuleDestination",
}));

export type DeleteAccountAuditConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Restores the default settings for Device Defender audits for this account. Any
 * configuration data you entered is deleted and all audit checks are reset to
 * disabled.
 *
 * Requires permission to access the DeleteAccountAuditConfiguration action.
 */
export const deleteAccountAuditConfiguration: API.OperationMethod<
  DeleteAccountAuditConfigurationRequest,
  DeleteAccountAuditConfigurationResponse,
  DeleteAccountAuditConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountAuditConfigurationRequest,
  output: DeleteAccountAuditConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountAuditConfiguration",
}));

export type DeleteAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Device Defender audit suppression.
 *
 * Requires permission to access the DeleteAuditSuppression action.
 */
export const deleteAuditSuppression: API.OperationMethod<
  DeleteAuditSuppressionRequest,
  DeleteAuditSuppressionResponse,
  DeleteAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAuditSuppressionRequest,
  output: DeleteAuditSuppressionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuditSuppression",
}));

export type DeleteAuthorizerError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes an authorizer.
 *
 * Requires permission to access the DeleteAuthorizer action.
 */
export const deleteAuthorizer: API.OperationMethod<
  DeleteAuthorizerRequest,
  DeleteAuthorizerResponse,
  DeleteAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAuthorizerRequest,
  output: DeleteAuthorizerResponse,
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthorizer",
}));

export type DeleteBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes the billing group.
 *
 * Requires permission to access the DeleteBillingGroup action.
 */
export const deleteBillingGroup: API.OperationMethod<
  DeleteBillingGroupRequest,
  DeleteBillingGroupResponse,
  DeleteBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBillingGroupRequest,
  output: DeleteBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingGroup",
}));

export type DeleteCACertificateError =
  | CertificateStateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a registered CA certificate.
 *
 * Requires permission to access the DeleteCACertificate action.
 */
export const deleteCACertificate: API.OperationMethod<
  DeleteCACertificateRequest,
  DeleteCACertificateResponse,
  DeleteCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCACertificateRequest,
  output: DeleteCACertificateResponse,
  errors: [
    CertificateStateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCACertificate",
}));

export type DeleteCertificateError =
  | CertificateStateException
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified certificate.
 *
 * A certificate cannot be deleted if it has a policy or IoT thing attached to it or if
 * its status is set to ACTIVE. To delete a certificate, first use the DetachPolicy action to detach all policies. Next, use the UpdateCertificate action to set the certificate to the INACTIVE
 * status.
 *
 * Requires permission to access the DeleteCertificate action.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCertificateRequest,
  output: DeleteCertificateResponse,
  errors: [
    CertificateStateException,
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
}));

export type DeleteCertificateProviderError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a certificate provider.
 *
 * Requires permission to access the DeleteCertificateProvider action.
 *
 * If you delete the certificate provider resource, the behavior of
 * `CreateCertificateFromCsr` will resume, and IoT will create
 * certificates signed by IoT from a certificate signing request (CSR).
 */
export const deleteCertificateProvider: API.OperationMethod<
  DeleteCertificateProviderRequest,
  DeleteCertificateProviderResponse,
  DeleteCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCertificateProviderRequest,
  output: DeleteCertificateProviderResponse,
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificateProvider",
}));

export type DeleteCommandError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a command resource.
 */
export const deleteCommand: API.OperationMethod<
  DeleteCommandRequest,
  DeleteCommandResponse,
  DeleteCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCommandRequest,
  output: DeleteCommandResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommand",
}));

export type DeleteCommandExecutionError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a command execution.
 *
 * Only command executions that enter a terminal state can be deleted from
 * your account.
 */
export const deleteCommandExecution: API.OperationMethod<
  DeleteCommandExecutionRequest,
  DeleteCommandExecutionResponse,
  DeleteCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCommandExecutionRequest,
  output: DeleteCommandExecutionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommandExecution",
}));

export type DeleteCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Deletes a Device Defender detect custom metric.
 *
 * Requires permission to access the DeleteCustomMetric action.
 *
 * Before you can delete a custom metric, you must first remove the custom metric from all
 * security profiles it's a part of.
 * The
 * security
 * profile associated with the custom metric can be found using the ListSecurityProfiles
 * API with `metricName` set to your custom metric name.
 */
export const deleteCustomMetric: API.OperationMethod<
  DeleteCustomMetricRequest,
  DeleteCustomMetricResponse,
  DeleteCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomMetricRequest,
  output: DeleteCustomMetricResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomMetric",
}));

export type DeleteDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Removes the specified dimension from your Amazon Web Services accounts.
 *
 * Requires permission to access the DeleteDimension action.
 */
export const deleteDimension: API.OperationMethod<
  DeleteDimensionRequest,
  DeleteDimensionResponse,
  DeleteDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDimensionRequest,
  output: DeleteDimensionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDimension",
}));

export type DeleteDomainConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified domain configuration.
 *
 * Requires permission to access the DeleteDomainConfiguration action.
 */
export const deleteDomainConfiguration: API.OperationMethod<
  DeleteDomainConfigurationRequest,
  DeleteDomainConfigurationResponse,
  DeleteDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainConfigurationRequest,
  output: DeleteDomainConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainConfiguration",
}));

export type DeleteDynamicThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes a dynamic thing group.
 *
 * Requires permission to access the DeleteDynamicThingGroup action.
 */
export const deleteDynamicThingGroup: API.OperationMethod<
  DeleteDynamicThingGroupRequest,
  DeleteDynamicThingGroupResponse,
  DeleteDynamicThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDynamicThingGroupRequest,
  output: DeleteDynamicThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDynamicThingGroup",
}));

export type DeleteFleetMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes the specified fleet metric.
 * Returns successfully with no error if the deletion is successful or you specify a fleet metric that doesn't exist.
 *
 * Requires permission to access the DeleteFleetMetric action.
 */
export const deleteFleetMetric: API.OperationMethod<
  DeleteFleetMetricRequest,
  DeleteFleetMetricResponse,
  DeleteFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetMetricRequest,
  output: DeleteFleetMetricResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleetMetric",
}));

export type DeleteJobError =
  | InvalidRequestException
  | InvalidStateTransitionException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a job and its related job executions.
 *
 * Deleting a job may take time, depending on the number of job executions created for
 * the job and various other factors. While the job is being deleted, the status of the job
 * will be shown as "DELETION_IN_PROGRESS". Attempting to delete or cancel a job whose
 * status is already "DELETION_IN_PROGRESS" will result in an error.
 *
 * Only 10 jobs may have status "DELETION_IN_PROGRESS" at the same time, or a
 * LimitExceededException will occur.
 *
 * Requires permission to access the DeleteJob action.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobRequest,
  output: DeleteJobResponse,
  errors: [
    InvalidRequestException,
    InvalidStateTransitionException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteJobExecutionError =
  | InvalidRequestException
  | InvalidStateTransitionException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a job execution.
 *
 * Requires permission to access the DeleteJobExecution action.
 */
export const deleteJobExecution: API.OperationMethod<
  DeleteJobExecutionRequest,
  DeleteJobExecutionResponse,
  DeleteJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobExecutionRequest,
  output: DeleteJobExecutionResponse,
  errors: [
    InvalidRequestException,
    InvalidStateTransitionException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobExecution",
}));

export type DeleteJobTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified job template.
 */
export const deleteJobTemplate: API.OperationMethod<
  DeleteJobTemplateRequest,
  DeleteJobTemplateResponse,
  DeleteJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobTemplateRequest,
  output: DeleteJobTemplateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
}));

export type DeleteMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a defined mitigation action from your Amazon Web Services accounts.
 *
 * Requires permission to access the DeleteMitigationAction action.
 */
export const deleteMitigationAction: API.OperationMethod<
  DeleteMitigationActionRequest,
  DeleteMitigationActionResponse,
  DeleteMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMitigationActionRequest,
  output: DeleteMitigationActionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMitigationAction",
}));

export type DeleteOTAUpdateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Delete an OTA update.
 *
 * Requires permission to access the DeleteOTAUpdate action.
 */
export const deleteOTAUpdate: API.OperationMethod<
  DeleteOTAUpdateRequest,
  DeleteOTAUpdateResponse,
  DeleteOTAUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOTAUpdateRequest,
  output: DeleteOTAUpdateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOTAUpdate",
}));

export type DeletePackageError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version from a software package.
 *
 * **Note:** All package versions must be deleted before deleting the software package.
 *
 * Requires permission to access the DeletePackageVersion action.
 */
export const deletePackage: API.OperationMethod<
  DeletePackageRequest,
  DeletePackageResponse,
  DeletePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageRequest,
  output: DeletePackageResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackage",
}));

export type DeletePackageVersionError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version from a software package.
 *
 * **Note:** If a package version is designated as default, you must remove the designation from the software package using the UpdatePackage action.
 */
export const deletePackageVersion: API.OperationMethod<
  DeletePackageVersionRequest,
  DeletePackageVersionResponse,
  DeletePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackageVersionRequest,
  output: DeletePackageVersionResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackageVersion",
}));

export type DeletePolicyError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified policy.
 *
 * A policy cannot be deleted if it has non-default versions or it is attached to any
 * certificate.
 *
 * To delete a policy, use the DeletePolicyVersion action to delete all non-default
 * versions of the policy; use the DetachPolicy action to detach the policy from any
 * certificate; and then use the DeletePolicy action to delete the policy.
 *
 * When a policy is deleted using DeletePolicy, its default version is deleted with
 * it.
 *
 * Because of the distributed nature of Amazon Web Services, it can take up to five minutes after
 * a policy is detached before it's ready to be deleted.
 *
 * Requires permission to access the DeletePolicy action.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeletePolicyVersionError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified version of the specified policy. You cannot delete the default
 * version of a policy using this action. To delete the default version of a policy, use DeletePolicy. To find out which version of a policy is marked as the default
 * version, use ListPolicyVersions.
 *
 * Requires permission to access the DeletePolicyVersion action.
 */
export const deletePolicyVersion: API.OperationMethod<
  DeletePolicyVersionRequest,
  DeletePolicyVersionResponse,
  DeletePolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyVersionRequest,
  output: DeletePolicyVersionResponse,
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyVersion",
}));

export type DeleteProvisioningTemplateError =
  | ConflictingResourceUpdateException
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a provisioning template.
 *
 * Requires permission to access the DeleteProvisioningTemplate action.
 */
export const deleteProvisioningTemplate: API.OperationMethod<
  DeleteProvisioningTemplateRequest,
  DeleteProvisioningTemplateResponse,
  DeleteProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisioningTemplateRequest,
  output: DeleteProvisioningTemplateResponse,
  errors: [
    ConflictingResourceUpdateException,
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningTemplate",
}));

export type DeleteProvisioningTemplateVersionError =
  | ConflictingResourceUpdateException
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a provisioning template version.
 *
 * Requires permission to access the DeleteProvisioningTemplateVersion action.
 */
export const deleteProvisioningTemplateVersion: API.OperationMethod<
  DeleteProvisioningTemplateVersionRequest,
  DeleteProvisioningTemplateVersionResponse,
  DeleteProvisioningTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisioningTemplateVersionRequest,
  output: DeleteProvisioningTemplateVersionResponse,
  errors: [
    ConflictingResourceUpdateException,
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisioningTemplateVersion",
}));

export type DeleteRegistrationCodeError =
  | InternalFailureException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a CA certificate registration code.
 *
 * Requires permission to access the DeleteRegistrationCode action.
 */
export const deleteRegistrationCode: API.OperationMethod<
  DeleteRegistrationCodeRequest,
  DeleteRegistrationCodeResponse,
  DeleteRegistrationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistrationCodeRequest,
  output: DeleteRegistrationCodeResponse,
  errors: [
    InternalFailureException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistrationCode",
}));

export type DeleteRoleAliasError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a role alias
 *
 * Requires permission to access the DeleteRoleAlias action.
 */
export const deleteRoleAlias: API.OperationMethod<
  DeleteRoleAliasRequest,
  DeleteRoleAliasResponse,
  DeleteRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRoleAliasRequest,
  output: DeleteRoleAliasResponse,
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRoleAlias",
}));

export type DeleteScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a scheduled audit.
 *
 * Requires permission to access the DeleteScheduledAudit action.
 */
export const deleteScheduledAudit: API.OperationMethod<
  DeleteScheduledAuditRequest,
  DeleteScheduledAuditResponse,
  DeleteScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScheduledAuditRequest,
  output: DeleteScheduledAuditResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledAudit",
}));

export type DeleteSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Deletes a Device Defender security profile.
 *
 * Requires permission to access the DeleteSecurityProfile action.
 */
export const deleteSecurityProfile: API.OperationMethod<
  DeleteSecurityProfileRequest,
  DeleteSecurityProfileResponse,
  DeleteSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSecurityProfileRequest,
  output: DeleteSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityProfile",
}));

export type DeleteStreamError =
  | DeleteConflictException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a stream.
 *
 * Requires permission to access the DeleteStream action.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamRequest,
  DeleteStreamResponse,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStreamRequest,
  output: DeleteStreamResponse,
  errors: [
    DeleteConflictException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
}));

export type DeleteThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes the specified thing. Returns successfully with no error if the deletion is
 * successful or you specify a thing that doesn't exist.
 *
 * Requires permission to access the DeleteThing action.
 */
export const deleteThing: API.OperationMethod<
  DeleteThingRequest,
  DeleteThingResponse,
  DeleteThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThingRequest,
  output: DeleteThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThing",
}));

export type DeleteThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Deletes a thing group.
 *
 * Requires permission to access the DeleteThingGroup action.
 */
export const deleteThingGroup: API.OperationMethod<
  DeleteThingGroupRequest,
  DeleteThingGroupResponse,
  DeleteThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThingGroupRequest,
  output: DeleteThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingGroup",
}));

export type DeleteThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified thing type. You cannot delete a thing type if it has things
 * associated with it. To delete a thing type, first mark it as deprecated by calling DeprecateThingType, then remove any associated things by calling UpdateThing to change the thing type on any associated thing, and
 * finally use DeleteThingType to delete the thing type.
 *
 * Requires permission to access the DeleteThingType action.
 */
export const deleteThingType: API.OperationMethod<
  DeleteThingTypeRequest,
  DeleteThingTypeResponse,
  DeleteThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThingTypeRequest,
  output: DeleteThingTypeResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThingType",
}));

export type DeleteTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | TopicRuleNotFound
  | CommonErrors;
/**
 * Deletes the rule.
 *
 * Requires permission to access the DeleteTopicRule action.
 */
export const deleteTopicRule: API.OperationMethod<
  DeleteTopicRuleRequest,
  DeleteTopicRuleResponse,
  DeleteTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTopicRuleRequest,
  output: DeleteTopicRuleResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
    TopicRuleNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopicRule",
}));

export type DeleteTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a topic rule destination.
 *
 * Requires permission to access the DeleteTopicRuleDestination action.
 */
export const deleteTopicRuleDestination: API.OperationMethod<
  DeleteTopicRuleDestinationRequest,
  DeleteTopicRuleDestinationResponse,
  DeleteTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTopicRuleDestinationRequest,
  output: DeleteTopicRuleDestinationResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTopicRuleDestination",
}));

export type DeleteV2LoggingLevelError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a logging level.
 *
 * Requires permission to access the DeleteV2LoggingLevel action.
 */
export const deleteV2LoggingLevel: API.OperationMethod<
  DeleteV2LoggingLevelRequest,
  DeleteV2LoggingLevelResponse,
  DeleteV2LoggingLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteV2LoggingLevelRequest,
  output: DeleteV2LoggingLevelResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteV2LoggingLevel",
}));

export type DeprecateThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deprecates a thing type. You can not associate new things with deprecated thing
 * type.
 *
 * Requires permission to access the DeprecateThingType action.
 */
export const deprecateThingType: API.OperationMethod<
  DeprecateThingTypeRequest,
  DeprecateThingTypeResponse,
  DeprecateThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeprecateThingTypeRequest,
  output: DeprecateThingTypeResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateThingType",
}));

export type DescribeAccountAuditConfigurationError =
  | InternalFailureException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about the Device Defender audit settings for this account.
 * Settings include how audit notifications are sent and which audit checks are
 * enabled or disabled.
 *
 * Requires permission to access the DescribeAccountAuditConfiguration action.
 */
export const describeAccountAuditConfiguration: API.OperationMethod<
  DescribeAccountAuditConfigurationRequest,
  DescribeAccountAuditConfigurationResponse,
  DescribeAccountAuditConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountAuditConfigurationRequest,
  output: DescribeAccountAuditConfigurationResponse,
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAuditConfiguration",
}));

export type DescribeAuditFindingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a single audit finding. Properties include the reason for
 * noncompliance, the severity of the issue,
 * and the start time
 * when the audit that returned the
 * finding.
 *
 * Requires permission to access the DescribeAuditFinding action.
 */
export const describeAuditFinding: API.OperationMethod<
  DescribeAuditFindingRequest,
  DescribeAuditFindingResponse,
  DescribeAuditFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAuditFindingRequest,
  output: DescribeAuditFindingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditFinding",
}));

export type DescribeAuditMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about an audit mitigation task that is used to apply mitigation actions to a set of audit findings. Properties include the actions being applied, the audit checks to which they're being applied, the task status, and aggregated task statistics.
 */
export const describeAuditMitigationActionsTask: API.OperationMethod<
  DescribeAuditMitigationActionsTaskRequest,
  DescribeAuditMitigationActionsTaskResponse,
  DescribeAuditMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAuditMitigationActionsTaskRequest,
  output: DescribeAuditMitigationActionsTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditMitigationActionsTask",
}));

export type DescribeAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a Device Defender audit suppression.
 */
export const describeAuditSuppression: API.OperationMethod<
  DescribeAuditSuppressionRequest,
  DescribeAuditSuppressionResponse,
  DescribeAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAuditSuppressionRequest,
  output: DescribeAuditSuppressionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditSuppression",
}));

export type DescribeAuditTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a Device Defender audit.
 *
 * Requires permission to access the DescribeAuditTask action.
 */
export const describeAuditTask: API.OperationMethod<
  DescribeAuditTaskRequest,
  DescribeAuditTaskResponse,
  DescribeAuditTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAuditTaskRequest,
  output: DescribeAuditTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuditTask",
}));

export type DescribeAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes an authorizer.
 *
 * Requires permission to access the DescribeAuthorizer action.
 */
export const describeAuthorizer: API.OperationMethod<
  DescribeAuthorizerRequest,
  DescribeAuthorizerResponse,
  DescribeAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAuthorizerRequest,
  output: DescribeAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAuthorizer",
}));

export type DescribeBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about a billing group.
 *
 * Requires permission to access the DescribeBillingGroup action.
 */
export const describeBillingGroup: API.OperationMethod<
  DescribeBillingGroupRequest,
  DescribeBillingGroupResponse,
  DescribeBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBillingGroupRequest,
  output: DescribeBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBillingGroup",
}));

export type DescribeCACertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a registered CA certificate.
 *
 * Requires permission to access the DescribeCACertificate action.
 */
export const describeCACertificate: API.OperationMethod<
  DescribeCACertificateRequest,
  DescribeCACertificateResponse,
  DescribeCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCACertificateRequest,
  output: DescribeCACertificateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCACertificate",
}));

export type DescribeCertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified certificate.
 *
 * Requires permission to access the DescribeCertificate action.
 */
export const describeCertificate: API.OperationMethod<
  DescribeCertificateRequest,
  DescribeCertificateResponse,
  DescribeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCertificateRequest,
  output: DescribeCertificateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
}));

export type DescribeCertificateProviderError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a certificate provider.
 *
 * Requires permission to access the DescribeCertificateProvider action.
 */
export const describeCertificateProvider: API.OperationMethod<
  DescribeCertificateProviderRequest,
  DescribeCertificateProviderResponse,
  DescribeCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCertificateProviderRequest,
  output: DescribeCertificateProviderResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificateProvider",
}));

export type DescribeCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Gets information about a Device Defender detect custom metric.
 *
 * Requires permission to access the DescribeCustomMetric action.
 */
export const describeCustomMetric: API.OperationMethod<
  DescribeCustomMetricRequest,
  DescribeCustomMetricResponse,
  DescribeCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomMetricRequest,
  output: DescribeCustomMetricResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomMetric",
}));

export type DescribeDefaultAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes the default authorizer.
 *
 * Requires permission to access the DescribeDefaultAuthorizer action.
 */
export const describeDefaultAuthorizer: API.OperationMethod<
  DescribeDefaultAuthorizerRequest,
  DescribeDefaultAuthorizerResponse,
  DescribeDefaultAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDefaultAuthorizerRequest,
  output: DescribeDefaultAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDefaultAuthorizer",
}));

export type DescribeDetectMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Gets information about a Device Defender ML Detect mitigation action.
 *
 * Requires permission to access the DescribeDetectMitigationActionsTask action.
 */
export const describeDetectMitigationActionsTask: API.OperationMethod<
  DescribeDetectMitigationActionsTaskRequest,
  DescribeDetectMitigationActionsTaskResponse,
  DescribeDetectMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDetectMitigationActionsTaskRequest,
  output: DescribeDetectMitigationActionsTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDetectMitigationActionsTask",
}));

export type DescribeDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Provides details about a dimension that is defined in your Amazon Web Services accounts.
 *
 * Requires permission to access the DescribeDimension action.
 */
export const describeDimension: API.OperationMethod<
  DescribeDimensionRequest,
  DescribeDimensionResponse,
  DescribeDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDimensionRequest,
  output: DescribeDimensionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDimension",
}));

export type DescribeDomainConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets summary information about a domain configuration.
 *
 * Requires permission to access the DescribeDomainConfiguration action.
 */
export const describeDomainConfiguration: API.OperationMethod<
  DescribeDomainConfigurationRequest,
  DescribeDomainConfigurationResponse,
  DescribeDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainConfigurationRequest,
  output: DescribeDomainConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainConfiguration",
}));

export type DescribeEncryptionConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the encryption configuration for resources and data of your Amazon Web Services account in
 * Amazon Web Services IoT Core. For more information, see Data encryption at rest in
 * the *Amazon Web Services IoT Core Developer Guide*.
 */
export const describeEncryptionConfiguration: API.OperationMethod<
  DescribeEncryptionConfigurationRequest,
  DescribeEncryptionConfigurationResponse,
  DescribeEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEncryptionConfigurationRequest,
  output: DescribeEncryptionConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEncryptionConfiguration",
}));

export type DescribeEndpointError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns or creates a unique endpoint specific to the Amazon Web Services account making the
 * call.
 *
 * The first time `DescribeEndpoint` is called, an endpoint is created. All subsequent calls to `DescribeEndpoint` return the same endpoint.
 *
 * Requires permission to access the DescribeEndpoint action.
 */
export const describeEndpoint: API.OperationMethod<
  DescribeEndpointRequest,
  DescribeEndpointResponse,
  DescribeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEndpointRequest,
  output: DescribeEndpointResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoint",
}));

export type DescribeEventConfigurationsError =
  | InternalFailureException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes event configurations.
 *
 * Requires permission to access the DescribeEventConfigurations action.
 */
export const describeEventConfigurations: API.OperationMethod<
  DescribeEventConfigurationsRequest,
  DescribeEventConfigurationsResponse,
  DescribeEventConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEventConfigurationsRequest,
  output: DescribeEventConfigurationsResponse,
  errors: [InternalFailureException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEventConfigurations",
}));

export type DescribeFleetMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified fleet metric.
 *
 * Requires permission to access the DescribeFleetMetric action.
 */
export const describeFleetMetric: API.OperationMethod<
  DescribeFleetMetricRequest,
  DescribeFleetMetricResponse,
  DescribeFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFleetMetricRequest,
  output: DescribeFleetMetricResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleetMetric",
}));

export type DescribeIndexError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a search index.
 *
 * Requires permission to access the DescribeIndex action.
 */
export const describeIndex: API.OperationMethod<
  DescribeIndexRequest,
  DescribeIndexResponse,
  DescribeIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIndexRequest,
  output: DescribeIndexResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIndex",
}));

export type DescribeJobError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a job.
 *
 * Requires permission to access the DescribeJob action.
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResponse,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobRequest,
  output: DescribeJobResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
}));

export type DescribeJobExecutionError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a job execution.
 *
 * Requires permission to access the DescribeJobExecution action.
 */
export const describeJobExecution: API.OperationMethod<
  DescribeJobExecutionRequest,
  DescribeJobExecutionResponse,
  DescribeJobExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobExecutionRequest,
  output: DescribeJobExecutionResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobExecution",
}));

export type DescribeJobTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns information about a job template.
 */
export const describeJobTemplate: API.OperationMethod<
  DescribeJobTemplateRequest,
  DescribeJobTemplateResponse,
  DescribeJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobTemplateRequest,
  output: DescribeJobTemplateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJobTemplate",
}));

export type DescribeManagedJobTemplateError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * View details of a managed job template.
 */
export const describeManagedJobTemplate: API.OperationMethod<
  DescribeManagedJobTemplateRequest,
  DescribeManagedJobTemplateResponse,
  DescribeManagedJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeManagedJobTemplateRequest,
  output: DescribeManagedJobTemplateResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeManagedJobTemplate",
}));

export type DescribeMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a mitigation action.
 *
 * Requires permission to access the DescribeMitigationAction action.
 */
export const describeMitigationAction: API.OperationMethod<
  DescribeMitigationActionRequest,
  DescribeMitigationActionResponse,
  DescribeMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMitigationActionRequest,
  output: DescribeMitigationActionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMitigationAction",
}));

export type DescribeProvisioningTemplateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a provisioning template.
 *
 * Requires permission to access the DescribeProvisioningTemplate action.
 */
export const describeProvisioningTemplate: API.OperationMethod<
  DescribeProvisioningTemplateRequest,
  DescribeProvisioningTemplateResponse,
  DescribeProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProvisioningTemplateRequest,
  output: DescribeProvisioningTemplateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningTemplate",
}));

export type DescribeProvisioningTemplateVersionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a provisioning template version.
 *
 * Requires permission to access the DescribeProvisioningTemplateVersion action.
 */
export const describeProvisioningTemplateVersion: API.OperationMethod<
  DescribeProvisioningTemplateVersionRequest,
  DescribeProvisioningTemplateVersionResponse,
  DescribeProvisioningTemplateVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProvisioningTemplateVersionRequest,
  output: DescribeProvisioningTemplateVersionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProvisioningTemplateVersion",
}));

export type DescribeRoleAliasError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a role alias.
 *
 * Requires permission to access the DescribeRoleAlias action.
 */
export const describeRoleAlias: API.OperationMethod<
  DescribeRoleAliasRequest,
  DescribeRoleAliasResponse,
  DescribeRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeRoleAliasRequest,
  output: DescribeRoleAliasResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRoleAlias",
}));

export type DescribeScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a scheduled audit.
 *
 * Requires permission to access the DescribeScheduledAudit action.
 */
export const describeScheduledAudit: API.OperationMethod<
  DescribeScheduledAuditRequest,
  DescribeScheduledAuditResponse,
  DescribeScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScheduledAuditRequest,
  output: DescribeScheduledAuditResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledAudit",
}));

export type DescribeSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Gets information about a Device Defender security profile.
 *
 * Requires permission to access the DescribeSecurityProfile action.
 */
export const describeSecurityProfile: API.OperationMethod<
  DescribeSecurityProfileRequest,
  DescribeSecurityProfileResponse,
  DescribeSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSecurityProfileRequest,
  output: DescribeSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecurityProfile",
}));

export type DescribeStreamError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a stream.
 *
 * Requires permission to access the DescribeStream action.
 */
export const describeStream: API.OperationMethod<
  DescribeStreamRequest,
  DescribeStreamResponse,
  DescribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStreamRequest,
  output: DescribeStreamResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
}));

export type DescribeThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified thing.
 *
 * Requires permission to access the DescribeThing action.
 */
export const describeThing: API.OperationMethod<
  DescribeThingRequest,
  DescribeThingResponse,
  DescribeThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeThingRequest,
  output: DescribeThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThing",
}));

export type DescribeThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describe a thing group.
 *
 * Requires permission to access the DescribeThingGroup action.
 */
export const describeThingGroup: API.OperationMethod<
  DescribeThingGroupRequest,
  DescribeThingGroupResponse,
  DescribeThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeThingGroupRequest,
  output: DescribeThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingGroup",
}));

export type DescribeThingRegistrationTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Describes a bulk thing provisioning task.
 *
 * Requires permission to access the DescribeThingRegistrationTask action.
 */
export const describeThingRegistrationTask: API.OperationMethod<
  DescribeThingRegistrationTaskRequest,
  DescribeThingRegistrationTaskResponse,
  DescribeThingRegistrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeThingRegistrationTaskRequest,
  output: DescribeThingRegistrationTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingRegistrationTask",
}));

export type DescribeThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified thing type.
 *
 * Requires permission to access the DescribeThingType action.
 */
export const describeThingType: API.OperationMethod<
  DescribeThingTypeRequest,
  DescribeThingTypeResponse,
  DescribeThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeThingTypeRequest,
  output: DescribeThingTypeResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThingType",
}));

export type DetachPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Detaches a policy from the specified target.
 *
 * Because of the distributed nature of Amazon Web Services, it can take up to five minutes after
 * a policy is detached before it's ready to be deleted.
 *
 * Requires permission to access the DetachPolicy action.
 */
export const detachPolicy: API.OperationMethod<
  DetachPolicyRequest,
  DetachPolicyResponse,
  DetachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachPolicyRequest,
  output: DetachPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPolicy",
}));

export type DetachPrincipalPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes the specified policy from the specified certificate.
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use DetachPolicy instead.
 *
 * Requires permission to access the DetachPrincipalPolicy action.
 */
export const detachPrincipalPolicy: API.OperationMethod<
  DetachPrincipalPolicyRequest,
  DetachPrincipalPolicyResponse,
  DetachPrincipalPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachPrincipalPolicyRequest,
  output: DetachPrincipalPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPrincipalPolicy",
}));

export type DetachSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Disassociates a Device Defender security profile from a thing group or from this account.
 *
 * Requires permission to access the DetachSecurityProfile action.
 */
export const detachSecurityProfile: API.OperationMethod<
  DetachSecurityProfileRequest,
  DetachSecurityProfileResponse,
  DetachSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachSecurityProfileRequest,
  output: DetachSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachSecurityProfile",
}));

export type DetachThingPrincipalError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Detaches the specified principal from the specified thing. A principal can be X.509
 * certificates, IAM users, groups, and roles, Amazon Cognito identities or federated
 * identities.
 *
 * This call is asynchronous. It might take several seconds for the detachment to
 * propagate.
 *
 * Requires permission to access the DetachThingPrincipal action.
 */
export const detachThingPrincipal: API.OperationMethod<
  DetachThingPrincipalRequest,
  DetachThingPrincipalResponse,
  DetachThingPrincipalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachThingPrincipalRequest,
  output: DetachThingPrincipalResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachThingPrincipal",
}));

export type DisableTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disables the rule.
 *
 * Requires permission to access the DisableTopicRule action.
 */
export const disableTopicRule: API.OperationMethod<
  DisableTopicRuleRequest,
  DisableTopicRuleResponse,
  DisableTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableTopicRuleRequest,
  output: DisableTopicRuleResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableTopicRule",
}));

export type DisassociateSbomFromPackageVersionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the selected software bill of materials (SBOM) from a specific software package version.
 *
 * Requires permission to access the DisassociateSbomWithPackageVersion action.
 */
export const disassociateSbomFromPackageVersion: API.OperationMethod<
  DisassociateSbomFromPackageVersionRequest,
  DisassociateSbomFromPackageVersionResponse,
  DisassociateSbomFromPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSbomFromPackageVersionRequest,
  output: DisassociateSbomFromPackageVersionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSbomFromPackageVersion",
}));

export type EnableTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Enables the rule.
 *
 * Requires permission to access the EnableTopicRule action.
 */
export const enableTopicRule: API.OperationMethod<
  EnableTopicRuleRequest,
  EnableTopicRuleResponse,
  EnableTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableTopicRuleRequest,
  output: EnableTopicRuleResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableTopicRule",
}));

export type GetBehaviorModelTrainingSummariesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Returns a Device Defender's ML Detect Security Profile training model's status.
 *
 * Requires permission to access the GetBehaviorModelTrainingSummaries action.
 */
export const getBehaviorModelTrainingSummaries: API.PaginatedOperationMethod<
  GetBehaviorModelTrainingSummariesRequest,
  GetBehaviorModelTrainingSummariesResponse,
  GetBehaviorModelTrainingSummariesError,
  Credentials | HttpClient.HttpClient,
  BehaviorModelTrainingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBehaviorModelTrainingSummariesRequest,
  output: GetBehaviorModelTrainingSummariesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBehaviorModelTrainingSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "summaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBucketsAggregationError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Aggregates on indexed data with search queries pertaining to particular fields.
 *
 * Requires permission to access the GetBucketsAggregation action.
 */
export const getBucketsAggregation: API.OperationMethod<
  GetBucketsAggregationRequest,
  GetBucketsAggregationResponse,
  GetBucketsAggregationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBucketsAggregationRequest,
  output: GetBucketsAggregationResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketsAggregation",
}));

export type GetCardinalityError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the approximate count of unique values that match the query.
 *
 * Requires permission to access the GetCardinality action.
 */
export const getCardinality: API.OperationMethod<
  GetCardinalityRequest,
  GetCardinalityResponse,
  GetCardinalityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCardinalityRequest,
  output: GetCardinalityResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCardinality",
}));

export type GetCommandError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified command.
 */
export const getCommand: API.OperationMethod<
  GetCommandRequest,
  GetCommandResponse,
  GetCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCommandRequest,
  output: GetCommandResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommand",
}));

export type GetCommandExecutionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specific command execution on a single device.
 */
export const getCommandExecution: API.OperationMethod<
  GetCommandExecutionRequest,
  GetCommandExecutionResponse,
  GetCommandExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCommandExecutionRequest,
  output: GetCommandExecutionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommandExecution",
}));

export type GetEffectivePoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a list of the policies that have an effect on the authorization behavior of the
 * specified device when it connects to the IoT device gateway.
 *
 * Requires permission to access the GetEffectivePolicies action.
 */
export const getEffectivePolicies: API.OperationMethod<
  GetEffectivePoliciesRequest,
  GetEffectivePoliciesResponse,
  GetEffectivePoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEffectivePoliciesRequest,
  output: GetEffectivePoliciesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectivePolicies",
}));

export type GetIndexingConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets the indexing configuration.
 *
 * Requires permission to access the GetIndexingConfiguration action.
 */
export const getIndexingConfiguration: API.OperationMethod<
  GetIndexingConfigurationRequest,
  GetIndexingConfigurationResponse,
  GetIndexingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIndexingConfigurationRequest,
  output: GetIndexingConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndexingConfiguration",
}));

export type GetJobDocumentError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a job document.
 *
 * Requires permission to access the GetJobDocument action.
 */
export const getJobDocument: API.OperationMethod<
  GetJobDocumentRequest,
  GetJobDocumentResponse,
  GetJobDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobDocumentRequest,
  output: GetJobDocumentResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobDocument",
}));

export type GetLoggingOptionsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets the logging options.
 *
 * NOTE: use of this command is not recommended. Use `GetV2LoggingOptions`
 * instead.
 *
 * Requires permission to access the GetLoggingOptions action.
 */
export const getLoggingOptions: API.OperationMethod<
  GetLoggingOptionsRequest,
  GetLoggingOptionsResponse,
  GetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoggingOptionsRequest,
  output: GetLoggingOptionsResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingOptions",
}));

export type GetOTAUpdateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets an OTA update.
 *
 * Requires permission to access the GetOTAUpdate action.
 */
export const getOTAUpdate: API.OperationMethod<
  GetOTAUpdateRequest,
  GetOTAUpdateResponse,
  GetOTAUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOTAUpdateRequest,
  output: GetOTAUpdateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOTAUpdate",
}));

export type GetPackageError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified software package.
 *
 * Requires permission to access the GetPackage action.
 */
export const getPackage: API.OperationMethod<
  GetPackageRequest,
  GetPackageResponse,
  GetPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPackageRequest,
  output: GetPackageResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackage",
}));

export type GetPackageConfigurationError =
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about the specified software package's configuration.
 *
 * Requires permission to access the GetPackageConfiguration action.
 */
export const getPackageConfiguration: API.OperationMethod<
  GetPackageConfigurationRequest,
  GetPackageConfigurationResponse,
  GetPackageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPackageConfigurationRequest,
  output: GetPackageConfigurationResponse,
  errors: [InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageConfiguration",
}));

export type GetPackageVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified package version.
 *
 * Requires permission to access the GetPackageVersion action.
 */
export const getPackageVersion: API.OperationMethod<
  GetPackageVersionRequest,
  GetPackageVersionResponse,
  GetPackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPackageVersionRequest,
  output: GetPackageVersionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPackageVersion",
}));

export type GetPercentilesError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Groups the aggregated values that match the query into percentile groupings. The default
 * percentile groupings are: 1,5,25,50,75,95,99, although you can specify your own
 * when you call `GetPercentiles`. This function returns a value for each
 * percentile group specified (or the default percentile groupings). The percentile group
 * "1" contains the aggregated field value that occurs in approximately one percent of the
 * values that match the query. The percentile group "5" contains the aggregated field value
 * that occurs in approximately five percent of the values that match the query, and so on.
 * The result is an approximation, the more values that match the query, the more accurate
 * the percentile values.
 *
 * Requires permission to access the GetPercentiles action.
 */
export const getPercentiles: API.OperationMethod<
  GetPercentilesRequest,
  GetPercentilesResponse,
  GetPercentilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPercentilesRequest,
  output: GetPercentilesResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPercentiles",
}));

export type GetPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified policy with the policy document of the default
 * version.
 *
 * Requires permission to access the GetPolicy action.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetPolicyVersionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about the specified policy version.
 *
 * Requires permission to access the GetPolicyVersion action.
 */
export const getPolicyVersion: API.OperationMethod<
  GetPolicyVersionRequest,
  GetPolicyVersionResponse,
  GetPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyVersionRequest,
  output: GetPolicyVersionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyVersion",
}));

export type GetRegistrationCodeError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a registration code used to register a CA certificate with IoT.
 *
 * IoT will create a registration code as part of this API call if the registration
 * code doesn't exist or has been deleted. If you already have a registration code, this API
 * call will return the same registration code.
 *
 * Requires permission to access the GetRegistrationCode action.
 */
export const getRegistrationCode: API.OperationMethod<
  GetRegistrationCodeRequest,
  GetRegistrationCodeResponse,
  GetRegistrationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegistrationCodeRequest,
  output: GetRegistrationCodeResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistrationCode",
}));

export type GetStatisticsError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the count, average, sum, minimum, maximum, sum of squares, variance,
 * and standard deviation for the specified aggregated field. If the aggregation field is of type
 * `String`, only the count statistic is returned.
 *
 * Requires permission to access the GetStatistics action.
 */
export const getStatistics: API.OperationMethod<
  GetStatisticsRequest,
  GetStatisticsResponse,
  GetStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStatisticsRequest,
  output: GetStatisticsResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatistics",
}));

export type GetThingConnectivityDataError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the live connectivity status per device. If a device has never connected to IoT Core or was disconnected for more than 1 hour before fleet indexing's `thingConnectivityIndexingMode` was enabled, the response will have the `connected` field set to `false` with no additional session details.
 */
export const getThingConnectivityData: API.OperationMethod<
  GetThingConnectivityDataRequest,
  GetThingConnectivityDataResponse,
  GetThingConnectivityDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThingConnectivityDataRequest,
  output: GetThingConnectivityDataResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThingConnectivityData",
}));

export type GetTopicRuleError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | TopicRuleNotFound
  | CommonErrors;
/**
 * Gets information about the rule.
 *
 * Requires permission to access the GetTopicRule action.
 */
export const getTopicRule: API.OperationMethod<
  GetTopicRuleRequest,
  GetTopicRuleResponse,
  GetTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTopicRuleRequest,
  output: GetTopicRuleResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
    TopicRuleNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopicRule",
}));

export type GetTopicRuleDestinationError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets information about a topic rule destination.
 *
 * Requires permission to access the GetTopicRuleDestination action.
 */
export const getTopicRuleDestination: API.OperationMethod<
  GetTopicRuleDestinationRequest,
  GetTopicRuleDestinationResponse,
  GetTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTopicRuleDestinationRequest,
  output: GetTopicRuleDestinationResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTopicRuleDestination",
}));

export type GetV2LoggingOptionsError =
  | InternalException
  | NotConfiguredException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets the fine grained logging options.
 *
 * Requires permission to access the GetV2LoggingOptions action.
 */
export const getV2LoggingOptions: API.OperationMethod<
  GetV2LoggingOptionsRequest,
  GetV2LoggingOptionsResponse,
  GetV2LoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetV2LoggingOptionsRequest,
  output: GetV2LoggingOptionsResponse,
  errors: [
    InternalException,
    NotConfiguredException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetV2LoggingOptions",
}));

export type ListActiveViolationsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the active violations for a given Device Defender security profile.
 *
 * Requires permission to access the ListActiveViolations action.
 */
export const listActiveViolations: API.PaginatedOperationMethod<
  ListActiveViolationsRequest,
  ListActiveViolationsResponse,
  ListActiveViolationsError,
  Credentials | HttpClient.HttpClient,
  ActiveViolation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListActiveViolationsRequest,
  output: ListActiveViolationsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActiveViolations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "activeViolations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttachedPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the policies attached to the specified thing group.
 *
 * Requires permission to access the ListAttachedPolicies action.
 */
export const listAttachedPolicies: API.PaginatedOperationMethod<
  ListAttachedPoliciesRequest,
  ListAttachedPoliciesResponse,
  ListAttachedPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAttachedPoliciesRequest,
  output: ListAttachedPoliciesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachedPolicies",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "policies",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListAuditFindingsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the findings (results) of a Device Defender audit or of the audits
 * performed during a specified time period. (Findings are retained for 90 days.)
 *
 * Requires permission to access the ListAuditFindings action.
 */
export const listAuditFindings: API.PaginatedOperationMethod<
  ListAuditFindingsRequest,
  ListAuditFindingsResponse,
  ListAuditFindingsError,
  Credentials | HttpClient.HttpClient,
  AuditFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAuditFindingsRequest,
  output: ListAuditFindingsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditMitigationActionsExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the status of audit mitigation action tasks that were
 * executed.
 *
 * Requires permission to access the ListAuditMitigationActionsExecutions action.
 */
export const listAuditMitigationActionsExecutions: API.PaginatedOperationMethod<
  ListAuditMitigationActionsExecutionsRequest,
  ListAuditMitigationActionsExecutionsResponse,
  ListAuditMitigationActionsExecutionsError,
  Credentials | HttpClient.HttpClient,
  AuditMitigationActionExecutionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAuditMitigationActionsExecutionsRequest,
  output: ListAuditMitigationActionsExecutionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditMitigationActionsExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionsExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditMitigationActionsTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of audit mitigation action tasks that match the specified filters.
 *
 * Requires permission to access the ListAuditMitigationActionsTasks action.
 */
export const listAuditMitigationActionsTasks: API.PaginatedOperationMethod<
  ListAuditMitigationActionsTasksRequest,
  ListAuditMitigationActionsTasksResponse,
  ListAuditMitigationActionsTasksError,
  Credentials | HttpClient.HttpClient,
  AuditMitigationActionsTaskMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAuditMitigationActionsTasksRequest,
  output: ListAuditMitigationActionsTasksResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditMitigationActionsTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditSuppressionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists your Device Defender audit listings.
 *
 * Requires permission to access the ListAuditSuppressions action.
 */
export const listAuditSuppressions: API.PaginatedOperationMethod<
  ListAuditSuppressionsRequest,
  ListAuditSuppressionsResponse,
  ListAuditSuppressionsError,
  Credentials | HttpClient.HttpClient,
  AuditSuppression
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAuditSuppressionsRequest,
  output: ListAuditSuppressionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditSuppressions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "suppressions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuditTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the Device Defender audits that have been performed during a given
 * time period.
 *
 * Requires permission to access the ListAuditTasks action.
 */
export const listAuditTasks: API.PaginatedOperationMethod<
  ListAuditTasksRequest,
  ListAuditTasksResponse,
  ListAuditTasksError,
  Credentials | HttpClient.HttpClient,
  AuditTaskMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAuditTasksRequest,
  output: ListAuditTasksResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAuthorizersError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the authorizers registered in your account.
 *
 * Requires permission to access the ListAuthorizers action.
 */
export const listAuthorizers: API.PaginatedOperationMethod<
  ListAuthorizersRequest,
  ListAuthorizersResponse,
  ListAuthorizersError,
  Credentials | HttpClient.HttpClient,
  AuthorizerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAuthorizersRequest,
  output: ListAuthorizersResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuthorizers",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "authorizers",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListBillingGroupsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the billing groups you have created.
 *
 * Requires permission to access the ListBillingGroups action.
 */
export const listBillingGroups: API.PaginatedOperationMethod<
  ListBillingGroupsRequest,
  ListBillingGroupsResponse,
  ListBillingGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBillingGroupsRequest,
  output: ListBillingGroupsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "billingGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCACertificatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the CA certificates registered for your Amazon Web Services account.
 *
 * The results are paginated with a default page size of 25. You can use the returned
 * marker to retrieve additional results.
 *
 * Requires permission to access the ListCACertificates action.
 */
export const listCACertificates: API.PaginatedOperationMethod<
  ListCACertificatesRequest,
  ListCACertificatesResponse,
  ListCACertificatesError,
  Credentials | HttpClient.HttpClient,
  CACertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCACertificatesRequest,
  output: ListCACertificatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCACertificates",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "certificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListCertificateProvidersError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all your certificate providers in your Amazon Web Services account.
 *
 * Requires permission to access the ListCertificateProviders action.
 */
export const listCertificateProviders: API.OperationMethod<
  ListCertificateProvidersRequest,
  ListCertificateProvidersResponse,
  ListCertificateProvidersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCertificateProvidersRequest,
  output: ListCertificateProvidersResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateProviders",
}));

export type ListCertificatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the certificates registered in your Amazon Web Services account.
 *
 * The results are paginated with a default page size of 25. You can use the returned
 * marker to retrieve additional results.
 *
 * Requires permission to access the ListCertificates action.
 */
export const listCertificates: API.PaginatedOperationMethod<
  ListCertificatesRequest,
  ListCertificatesResponse,
  ListCertificatesError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCertificatesRequest,
  output: ListCertificatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificates",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "certificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListCertificatesByCAError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * List the device certificates signed by the specified CA certificate.
 *
 * Requires permission to access the ListCertificatesByCA action.
 */
export const listCertificatesByCA: API.PaginatedOperationMethod<
  ListCertificatesByCARequest,
  ListCertificatesByCAResponse,
  ListCertificatesByCAError,
  Credentials | HttpClient.HttpClient,
  Certificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCertificatesByCARequest,
  output: ListCertificatesByCAResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificatesByCA",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "certificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListCommandExecutionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all command executions.
 *
 * - You must provide only the `startedTimeFilter` or
 * the `completedTimeFilter` information. If you provide
 * both time filters, the API will generate an error. You can use
 * this information to retrieve a list of command executions
 * within a specific timeframe.
 *
 * - You must provide only the `commandArn` or
 * the `thingArn` information depending on whether you want
 * to list executions for a specific command or an IoT thing. If you provide
 * both fields, the API will generate an error.
 *
 * For more information about considerations for using this API, see
 * List
 * command executions in your account (CLI).
 */
export const listCommandExecutions: API.PaginatedOperationMethod<
  ListCommandExecutionsRequest,
  ListCommandExecutionsResponse,
  ListCommandExecutionsError,
  Credentials | HttpClient.HttpClient,
  CommandExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommandExecutionsRequest,
  output: ListCommandExecutionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommandExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "commandExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCommandsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all commands in your account.
 */
export const listCommands: API.PaginatedOperationMethod<
  ListCommandsRequest,
  ListCommandsResponse,
  ListCommandsError,
  Credentials | HttpClient.HttpClient,
  CommandSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommandsRequest,
  output: ListCommandsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommands",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "commands",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomMetricsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists your Device Defender detect custom metrics.
 *
 * Requires permission to access the ListCustomMetrics action.
 */
export const listCustomMetrics: API.PaginatedOperationMethod<
  ListCustomMetricsRequest,
  ListCustomMetricsResponse,
  ListCustomMetricsError,
  Credentials | HttpClient.HttpClient,
  MetricName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomMetricsRequest,
  output: ListCustomMetricsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDetectMitigationActionsExecutionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists mitigation actions executions for a Device Defender ML Detect Security Profile.
 *
 * Requires permission to access the ListDetectMitigationActionsExecutions action.
 */
export const listDetectMitigationActionsExecutions: API.PaginatedOperationMethod<
  ListDetectMitigationActionsExecutionsRequest,
  ListDetectMitigationActionsExecutionsResponse,
  ListDetectMitigationActionsExecutionsError,
  Credentials | HttpClient.HttpClient,
  DetectMitigationActionExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDetectMitigationActionsExecutionsRequest,
  output: ListDetectMitigationActionsExecutionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectMitigationActionsExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionsExecutions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDetectMitigationActionsTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * List of Device Defender ML Detect mitigation actions tasks.
 *
 * Requires permission to access the ListDetectMitigationActionsTasks action.
 */
export const listDetectMitigationActionsTasks: API.PaginatedOperationMethod<
  ListDetectMitigationActionsTasksRequest,
  ListDetectMitigationActionsTasksResponse,
  ListDetectMitigationActionsTasksError,
  Credentials | HttpClient.HttpClient,
  DetectMitigationActionsTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDetectMitigationActionsTasksRequest,
  output: ListDetectMitigationActionsTasksResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectMitigationActionsTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDimensionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * List the set of dimensions that are defined for your Amazon Web Services accounts.
 *
 * Requires permission to access the ListDimensions action.
 */
export const listDimensions: API.PaginatedOperationMethod<
  ListDimensionsRequest,
  ListDimensionsResponse,
  ListDimensionsError,
  Credentials | HttpClient.HttpClient,
  DimensionName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDimensionsRequest,
  output: ListDimensionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDimensions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dimensionNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDomainConfigurationsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Gets a list of domain configurations for the user. This list is sorted
 * alphabetically by domain configuration name.
 *
 * Requires permission to access the ListDomainConfigurations action.
 */
export const listDomainConfigurations: API.PaginatedOperationMethod<
  ListDomainConfigurationsRequest,
  ListDomainConfigurationsResponse,
  ListDomainConfigurationsError,
  Credentials | HttpClient.HttpClient,
  DomainConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainConfigurationsRequest,
  output: ListDomainConfigurationsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainConfigurations",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "domainConfigurations",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListFleetMetricsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all your fleet metrics.
 *
 * Requires permission to access the ListFleetMetrics action.
 */
export const listFleetMetrics: API.PaginatedOperationMethod<
  ListFleetMetricsRequest,
  ListFleetMetricsResponse,
  ListFleetMetricsError,
  Credentials | HttpClient.HttpClient,
  FleetMetricNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFleetMetricsRequest,
  output: ListFleetMetricsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFleetMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fleetMetrics",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIndicesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the search indices.
 *
 * Requires permission to access the ListIndices action.
 */
export const listIndices: API.PaginatedOperationMethod<
  ListIndicesRequest,
  ListIndicesResponse,
  ListIndicesError,
  Credentials | HttpClient.HttpClient,
  IndexName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIndicesRequest,
  output: ListIndicesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "indexNames",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobExecutionsForJobError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the job executions for a job.
 *
 * Requires permission to access the ListJobExecutionsForJob action.
 */
export const listJobExecutionsForJob: API.PaginatedOperationMethod<
  ListJobExecutionsForJobRequest,
  ListJobExecutionsForJobResponse,
  ListJobExecutionsForJobError,
  Credentials | HttpClient.HttpClient,
  JobExecutionSummaryForJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobExecutionsForJobRequest,
  output: ListJobExecutionsForJobResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobExecutionsForJob",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobExecutionsForThingError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the job executions for the specified thing.
 *
 * Requires permission to access the ListJobExecutionsForThing action.
 */
export const listJobExecutionsForThing: API.PaginatedOperationMethod<
  ListJobExecutionsForThingRequest,
  ListJobExecutionsForThingResponse,
  ListJobExecutionsForThingError,
  Credentials | HttpClient.HttpClient,
  JobExecutionSummaryForThing
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobExecutionsForThingRequest,
  output: ListJobExecutionsForThingResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobExecutionsForThing",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobsError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists jobs.
 *
 * Requires permission to access the ListJobs action.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListJobTemplatesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of job templates.
 *
 * Requires permission to access the ListJobTemplates action.
 */
export const listJobTemplates: API.PaginatedOperationMethod<
  ListJobTemplatesRequest,
  ListJobTemplatesResponse,
  ListJobTemplatesError,
  Credentials | HttpClient.HttpClient,
  JobTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobTemplatesRequest,
  output: ListJobTemplatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedJobTemplatesError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of managed job templates.
 */
export const listManagedJobTemplates: API.PaginatedOperationMethod<
  ListManagedJobTemplatesRequest,
  ListManagedJobTemplatesResponse,
  ListManagedJobTemplatesError,
  Credentials | HttpClient.HttpClient,
  ManagedJobTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedJobTemplatesRequest,
  output: ListManagedJobTemplatesResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedJobTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedJobTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricValuesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the values reported for an IoT Device Defender metric (device-side metric, cloud-side metric, or custom metric)
 * by the given thing during the specified time period.
 */
export const listMetricValues: API.PaginatedOperationMethod<
  ListMetricValuesRequest,
  ListMetricValuesResponse,
  ListMetricValuesError,
  Credentials | HttpClient.HttpClient,
  MetricDatum
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetricValuesRequest,
  output: ListMetricValuesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricValues",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metricDatumList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMitigationActionsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of all mitigation actions that match the specified filter criteria.
 *
 * Requires permission to access the ListMitigationActions action.
 */
export const listMitigationActions: API.PaginatedOperationMethod<
  ListMitigationActionsRequest,
  ListMitigationActionsResponse,
  ListMitigationActionsError,
  Credentials | HttpClient.HttpClient,
  MitigationActionIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMitigationActionsRequest,
  output: ListMitigationActionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMitigationActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionIdentifiers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOTAUpdatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists OTA updates.
 *
 * Requires permission to access the ListOTAUpdates action.
 */
export const listOTAUpdates: API.PaginatedOperationMethod<
  ListOTAUpdatesRequest,
  ListOTAUpdatesResponse,
  ListOTAUpdatesError,
  Credentials | HttpClient.HttpClient,
  OTAUpdateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOTAUpdatesRequest,
  output: ListOTAUpdatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOTAUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "otaUpdates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOutgoingCertificatesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists certificates that are being transferred but not yet accepted.
 *
 * Requires permission to access the ListOutgoingCertificates action.
 */
export const listOutgoingCertificates: API.PaginatedOperationMethod<
  ListOutgoingCertificatesRequest,
  ListOutgoingCertificatesResponse,
  ListOutgoingCertificatesError,
  Credentials | HttpClient.HttpClient,
  OutgoingCertificate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOutgoingCertificatesRequest,
  output: ListOutgoingCertificatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutgoingCertificates",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "outgoingCertificates",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPackagesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the software packages associated to the account.
 *
 * Requires permission to access the ListPackages action.
 */
export const listPackages: API.PaginatedOperationMethod<
  ListPackagesRequest,
  ListPackagesResponse,
  ListPackagesError,
  Credentials | HttpClient.HttpClient,
  PackageSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackagesRequest,
  output: ListPackagesResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPackageVersionsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the software package versions associated to the account.
 *
 * Requires permission to access the ListPackageVersions action.
 */
export const listPackageVersions: API.PaginatedOperationMethod<
  ListPackageVersionsRequest,
  ListPackageVersionsResponse,
  ListPackageVersionsError,
  Credentials | HttpClient.HttpClient,
  PackageVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackageVersionsRequest,
  output: ListPackageVersionsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackageVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "packageVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists your policies.
 *
 * Requires permission to access the ListPolicies action.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "policies",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPolicyPrincipalsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the principals associated with the specified policy.
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use ListTargetsForPolicy instead.
 *
 * Requires permission to access the ListPolicyPrincipals action.
 */
export const listPolicyPrincipals: API.PaginatedOperationMethod<
  ListPolicyPrincipalsRequest,
  ListPolicyPrincipalsResponse,
  ListPolicyPrincipalsError,
  Credentials | HttpClient.HttpClient,
  PrincipalArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyPrincipalsRequest,
  output: ListPolicyPrincipalsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyPrincipals",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "principals",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPolicyVersionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the versions of the specified policy and identifies the default
 * version.
 *
 * Requires permission to access the ListPolicyVersions action.
 */
export const listPolicyVersions: API.OperationMethod<
  ListPolicyVersionsRequest,
  ListPolicyVersionsResponse,
  ListPolicyVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListPolicyVersionsRequest,
  output: ListPolicyVersionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyVersions",
}));

export type ListPrincipalPoliciesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the policies attached to the specified principal. If you use an Cognito
 * identity, the ID must be in AmazonCognito Identity format.
 *
 * **Note:** This action is deprecated and works as
 * expected for backward compatibility, but we won't add enhancements. Use ListAttachedPolicies instead.
 *
 * Requires permission to access the ListPrincipalPolicies action.
 */
export const listPrincipalPolicies: API.PaginatedOperationMethod<
  ListPrincipalPoliciesRequest,
  ListPrincipalPoliciesResponse,
  ListPrincipalPoliciesError,
  Credentials | HttpClient.HttpClient,
  Policy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrincipalPoliciesRequest,
  output: ListPrincipalPoliciesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalPolicies",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "policies",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListPrincipalThingsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the things associated with the specified principal. A principal can be X.509
 * certificates, IAM users, groups, and roles, Amazon Cognito identities or federated
 * identities.
 *
 * Requires permission to access the ListPrincipalThings action.
 */
export const listPrincipalThings: API.PaginatedOperationMethod<
  ListPrincipalThingsRequest,
  ListPrincipalThingsResponse,
  ListPrincipalThingsError,
  Credentials | HttpClient.HttpClient,
  ThingName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrincipalThingsRequest,
  output: ListPrincipalThingsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalThings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrincipalThingsV2Error =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the things associated with the specified principal. A principal can be an X.509
 * certificate or an Amazon Cognito ID.
 *
 * Requires permission to access the ListPrincipalThings action.
 */
export const listPrincipalThingsV2: API.PaginatedOperationMethod<
  ListPrincipalThingsV2Request,
  ListPrincipalThingsV2Response,
  ListPrincipalThingsV2Error,
  Credentials | HttpClient.HttpClient,
  PrincipalThingObject
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrincipalThingsV2Request,
  output: ListPrincipalThingsV2Response,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipalThingsV2",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "principalThingObjects",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProvisioningTemplatesError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the provisioning templates in your Amazon Web Services account.
 *
 * Requires permission to access the ListProvisioningTemplates action.
 */
export const listProvisioningTemplates: API.PaginatedOperationMethod<
  ListProvisioningTemplatesRequest,
  ListProvisioningTemplatesResponse,
  ListProvisioningTemplatesError,
  Credentials | HttpClient.HttpClient,
  ProvisioningTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProvisioningTemplatesRequest,
  output: ListProvisioningTemplatesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProvisioningTemplateVersionsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * A list of provisioning template versions.
 *
 * Requires permission to access the ListProvisioningTemplateVersions action.
 */
export const listProvisioningTemplateVersions: API.PaginatedOperationMethod<
  ListProvisioningTemplateVersionsRequest,
  ListProvisioningTemplateVersionsResponse,
  ListProvisioningTemplateVersionsError,
  Credentials | HttpClient.HttpClient,
  ProvisioningTemplateVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProvisioningTemplateVersionsRequest,
  output: ListProvisioningTemplateVersionsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisioningTemplateVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRelatedResourcesForAuditFindingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The related resources of an Audit finding.
 * The following resources can be returned from calling this API:
 *
 * - DEVICE_CERTIFICATE
 *
 * - CA_CERTIFICATE
 *
 * - IOT_POLICY
 *
 * - COGNITO_IDENTITY_POOL
 *
 * - CLIENT_ID
 *
 * - ACCOUNT_SETTINGS
 *
 * - ROLE_ALIAS
 *
 * - IAM_ROLE
 *
 * - ISSUER_CERTIFICATE
 *
 * This API is similar to DescribeAuditFinding's RelatedResources
 * but provides pagination and is not limited to 10 resources.
 * When calling DescribeAuditFinding for the intermediate CA revoked for
 * active device certificates check, RelatedResources will not be populated. You must use this API, ListRelatedResourcesForAuditFinding, to list the certificates.
 */
export const listRelatedResourcesForAuditFinding: API.PaginatedOperationMethod<
  ListRelatedResourcesForAuditFindingRequest,
  ListRelatedResourcesForAuditFindingResponse,
  ListRelatedResourcesForAuditFindingError,
  Credentials | HttpClient.HttpClient,
  RelatedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRelatedResourcesForAuditFindingRequest,
  output: ListRelatedResourcesForAuditFindingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelatedResourcesForAuditFinding",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relatedResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRoleAliasesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the role aliases registered in your account.
 *
 * Requires permission to access the ListRoleAliases action.
 */
export const listRoleAliases: API.PaginatedOperationMethod<
  ListRoleAliasesRequest,
  ListRoleAliasesResponse,
  ListRoleAliasesError,
  Credentials | HttpClient.HttpClient,
  RoleAlias
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRoleAliasesRequest,
  output: ListRoleAliasesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoleAliases",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "roleAliases",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListSbomValidationResultsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The validation results for all software bill of materials (SBOM) attached to a specific software package version.
 *
 * Requires permission to access the ListSbomValidationResults action.
 */
export const listSbomValidationResults: API.PaginatedOperationMethod<
  ListSbomValidationResultsRequest,
  ListSbomValidationResultsResponse,
  ListSbomValidationResultsError,
  Credentials | HttpClient.HttpClient,
  SbomValidationResultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSbomValidationResultsRequest,
  output: ListSbomValidationResultsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSbomValidationResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "validationResultSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScheduledAuditsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all of your scheduled audits.
 *
 * Requires permission to access the ListScheduledAudits action.
 */
export const listScheduledAudits: API.PaginatedOperationMethod<
  ListScheduledAuditsRequest,
  ListScheduledAuditsResponse,
  ListScheduledAuditsError,
  Credentials | HttpClient.HttpClient,
  ScheduledAuditMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScheduledAuditsRequest,
  output: ListScheduledAuditsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledAudits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduledAudits",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityProfilesError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the Device Defender security profiles
 * you've
 * created. You can filter security profiles by dimension or custom metric.
 *
 * Requires permission to access the ListSecurityProfiles action.
 *
 * `dimensionName` and `metricName` cannot be used in the same request.
 */
export const listSecurityProfiles: API.PaginatedOperationMethod<
  ListSecurityProfilesRequest,
  ListSecurityProfilesResponse,
  ListSecurityProfilesError,
  Credentials | HttpClient.HttpClient,
  SecurityProfileIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityProfilesRequest,
  output: ListSecurityProfilesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityProfileIdentifiers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityProfilesForTargetError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the Device Defender security profiles attached to a target (thing group).
 *
 * Requires permission to access the ListSecurityProfilesForTarget action.
 */
export const listSecurityProfilesForTarget: API.PaginatedOperationMethod<
  ListSecurityProfilesForTargetRequest,
  ListSecurityProfilesForTargetResponse,
  ListSecurityProfilesForTargetError,
  Credentials | HttpClient.HttpClient,
  SecurityProfileTargetMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityProfilesForTargetRequest,
  output: ListSecurityProfilesForTargetResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityProfilesForTarget",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityProfileTargetMappings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all of the streams in your Amazon Web Services account.
 *
 * Requires permission to access the ListStreams action.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsRequest,
  ListStreamsResponse,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  StreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStreamsRequest,
  output: ListStreamsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "streams",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags (metadata) you have assigned to the resource.
 *
 * Requires permission to access the ListTagsForResource action.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
  } as const,
})) as any;

export type ListTargetsForPolicyError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * List targets for the specified policy.
 *
 * Requires permission to access the ListTargetsForPolicy action.
 */
export const listTargetsForPolicy: API.PaginatedOperationMethod<
  ListTargetsForPolicyRequest,
  ListTargetsForPolicyResponse,
  ListTargetsForPolicyError,
  Credentials | HttpClient.HttpClient,
  PolicyTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTargetsForPolicyRequest,
  output: ListTargetsForPolicyResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsForPolicy",
  pagination: {
    inputToken: "marker",
    outputToken: "nextMarker",
    items: "targets",
    pageSize: "pageSize",
  } as const,
})) as any;

export type ListTargetsForSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the targets (thing groups) associated with a given Device Defender security profile.
 *
 * Requires permission to access the ListTargetsForSecurityProfile action.
 */
export const listTargetsForSecurityProfile: API.PaginatedOperationMethod<
  ListTargetsForSecurityProfileRequest,
  ListTargetsForSecurityProfileResponse,
  ListTargetsForSecurityProfileError,
  Credentials | HttpClient.HttpClient,
  SecurityProfileTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTargetsForSecurityProfileRequest,
  output: ListTargetsForSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsForSecurityProfile",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityProfileTargets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingGroupsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the thing groups in your account.
 *
 * Requires permission to access the ListThingGroups action.
 */
export const listThingGroups: API.PaginatedOperationMethod<
  ListThingGroupsRequest,
  ListThingGroupsResponse,
  ListThingGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingGroupsRequest,
  output: ListThingGroupsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingGroupsForThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * List the thing groups to which the specified thing belongs.
 *
 * Requires permission to access the ListThingGroupsForThing action.
 */
export const listThingGroupsForThing: API.PaginatedOperationMethod<
  ListThingGroupsForThingRequest,
  ListThingGroupsForThingResponse,
  ListThingGroupsForThingError,
  Credentials | HttpClient.HttpClient,
  GroupNameAndArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingGroupsForThingRequest,
  output: ListThingGroupsForThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingGroupsForThing",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingPrincipalsError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the principals associated with the specified thing. A principal can be X.509
 * certificates, IAM users, groups, and roles, Amazon Cognito identities or federated
 * identities.
 *
 * Requires permission to access the ListThingPrincipals action.
 */
export const listThingPrincipals: API.PaginatedOperationMethod<
  ListThingPrincipalsRequest,
  ListThingPrincipalsResponse,
  ListThingPrincipalsError,
  Credentials | HttpClient.HttpClient,
  PrincipalArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingPrincipalsRequest,
  output: ListThingPrincipalsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingPrincipals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "principals",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingPrincipalsV2Error =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the principals associated with the specified thing. A principal can be an X.509
 * certificate or an Amazon Cognito ID.
 *
 * Requires permission to access the ListThingPrincipals action.
 */
export const listThingPrincipalsV2: API.PaginatedOperationMethod<
  ListThingPrincipalsV2Request,
  ListThingPrincipalsV2Response,
  ListThingPrincipalsV2Error,
  Credentials | HttpClient.HttpClient,
  ThingPrincipalObject
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingPrincipalsV2Request,
  output: ListThingPrincipalsV2Response,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingPrincipalsV2",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingPrincipalObjects",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingRegistrationTaskReportsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Information about the thing registration tasks.
 */
export const listThingRegistrationTaskReports: API.PaginatedOperationMethod<
  ListThingRegistrationTaskReportsRequest,
  ListThingRegistrationTaskReportsResponse,
  ListThingRegistrationTaskReportsError,
  Credentials | HttpClient.HttpClient,
  S3FileUrl
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingRegistrationTaskReportsRequest,
  output: ListThingRegistrationTaskReportsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingRegistrationTaskReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceLinks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingRegistrationTasksError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * List bulk thing provisioning tasks.
 *
 * Requires permission to access the ListThingRegistrationTasks action.
 */
export const listThingRegistrationTasks: API.PaginatedOperationMethod<
  ListThingRegistrationTasksRequest,
  ListThingRegistrationTasksResponse,
  ListThingRegistrationTasksError,
  Credentials | HttpClient.HttpClient,
  TaskId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingRegistrationTasksRequest,
  output: ListThingRegistrationTasksResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingRegistrationTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingsError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists your things. Use the **attributeName** and **attributeValue** parameters to filter your things. For example,
 * calling `ListThings` with attributeName=Color and attributeValue=Red
 * retrieves all things in the registry that contain an attribute **Color** with the value **Red**. For more
 * information, see List Things from the Amazon Web Services IoT Core Developer
 * Guide.
 *
 * Requires permission to access the ListThings action.
 *
 * You will not be charged for calling this API if an `Access denied` error is returned. You will also not be charged if no attributes or pagination token was provided in request and no pagination token and no results were returned.
 */
export const listThings: API.PaginatedOperationMethod<
  ListThingsRequest,
  ListThingsResponse,
  ListThingsError,
  Credentials | HttpClient.HttpClient,
  ThingAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingsRequest,
  output: ListThingsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingsInBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the things you have added to the given billing group.
 *
 * Requires permission to access the ListThingsInBillingGroup action.
 */
export const listThingsInBillingGroup: API.PaginatedOperationMethod<
  ListThingsInBillingGroupRequest,
  ListThingsInBillingGroupResponse,
  ListThingsInBillingGroupError,
  Credentials | HttpClient.HttpClient,
  ThingName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingsInBillingGroupRequest,
  output: ListThingsInBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingsInBillingGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingsInThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the things in the specified group.
 *
 * Requires permission to access the ListThingsInThingGroup action.
 */
export const listThingsInThingGroup: API.PaginatedOperationMethod<
  ListThingsInThingGroupRequest,
  ListThingsInThingGroupResponse,
  ListThingsInThingGroupError,
  Credentials | HttpClient.HttpClient,
  ThingName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingsInThingGroupRequest,
  output: ListThingsInThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingsInThingGroup",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "things",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThingTypesError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the existing thing types.
 *
 * Requires permission to access the ListThingTypes action.
 */
export const listThingTypes: API.PaginatedOperationMethod<
  ListThingTypesRequest,
  ListThingTypesResponse,
  ListThingTypesError,
  Credentials | HttpClient.HttpClient,
  ThingTypeDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThingTypesRequest,
  output: ListThingTypesResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThingTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "thingTypes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTopicRuleDestinationsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all the topic rule destinations in your Amazon Web Services account.
 *
 * Requires permission to access the ListTopicRuleDestinations action.
 */
export const listTopicRuleDestinations: API.PaginatedOperationMethod<
  ListTopicRuleDestinationsRequest,
  ListTopicRuleDestinationsResponse,
  ListTopicRuleDestinationsError,
  Credentials | HttpClient.HttpClient,
  TopicRuleDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTopicRuleDestinationsRequest,
  output: ListTopicRuleDestinationsResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicRuleDestinations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "destinationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTopicRulesError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the rules for the specific topic.
 *
 * Requires permission to access the ListTopicRules action.
 */
export const listTopicRules: API.PaginatedOperationMethod<
  ListTopicRulesRequest,
  ListTopicRulesResponse,
  ListTopicRulesError,
  Credentials | HttpClient.HttpClient,
  TopicRuleListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTopicRulesRequest,
  output: ListTopicRulesResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTopicRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListV2LoggingLevelsError =
  | InternalException
  | InvalidRequestException
  | NotConfiguredException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists logging levels.
 *
 * Requires permission to access the ListV2LoggingLevels action.
 */
export const listV2LoggingLevels: API.PaginatedOperationMethod<
  ListV2LoggingLevelsRequest,
  ListV2LoggingLevelsResponse,
  ListV2LoggingLevelsError,
  Credentials | HttpClient.HttpClient,
  LogTargetConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListV2LoggingLevelsRequest,
  output: ListV2LoggingLevelsResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    NotConfiguredException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListV2LoggingLevels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "logTargetConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListViolationEventsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Lists the Device Defender security profile violations discovered during the given time period.
 * You can use filters to limit the results to those alerts issued for a particular security profile,
 * behavior, or thing (device).
 *
 * Requires permission to access the ListViolationEvents action.
 */
export const listViolationEvents: API.PaginatedOperationMethod<
  ListViolationEventsRequest,
  ListViolationEventsResponse,
  ListViolationEventsError,
  Credentials | HttpClient.HttpClient,
  ViolationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListViolationEventsRequest,
  output: ListViolationEventsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListViolationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "violationEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutVerificationStateOnViolationError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Set a verification state and provide a description of that verification state on a violation (detect alarm).
 */
export const putVerificationStateOnViolation: API.OperationMethod<
  PutVerificationStateOnViolationRequest,
  PutVerificationStateOnViolationResponse,
  PutVerificationStateOnViolationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutVerificationStateOnViolationRequest,
  output: PutVerificationStateOnViolationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVerificationStateOnViolation",
}));

export type RegisterCACertificateError =
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | RegistrationCodeValidationException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Registers a CA certificate with Amazon Web Services IoT Core. There is no limit to the number of CA
 * certificates you can register in your Amazon Web Services account. You can register up to 10 CA
 * certificates with the same `CA subject field` per Amazon Web Services account.
 *
 * Requires permission to access the RegisterCACertificate action.
 */
export const registerCACertificate: API.OperationMethod<
  RegisterCACertificateRequest,
  RegisterCACertificateResponse,
  RegisterCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterCACertificateRequest,
  output: RegisterCACertificateResponse,
  errors: [
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    RegistrationCodeValidationException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCACertificate",
}));

export type RegisterCertificateError =
  | CertificateConflictException
  | CertificateStateException
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Registers a device certificate with IoT in the same certificate mode as the signing CA. If you have more than one CA certificate that has the same subject field, you must
 * specify the CA certificate that was used to sign the device certificate being
 * registered.
 *
 * Requires permission to access the RegisterCertificate action.
 */
export const registerCertificate: API.OperationMethod<
  RegisterCertificateRequest,
  RegisterCertificateResponse,
  RegisterCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterCertificateRequest,
  output: RegisterCertificateResponse,
  errors: [
    CertificateConflictException,
    CertificateStateException,
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCertificate",
}));

export type RegisterCertificateWithoutCAError =
  | CertificateStateException
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Register a certificate that does not have a certificate authority (CA).
 * For supported certificates, consult
 * Certificate signing algorithms supported by IoT.
 */
export const registerCertificateWithoutCA: API.OperationMethod<
  RegisterCertificateWithoutCARequest,
  RegisterCertificateWithoutCAResponse,
  RegisterCertificateWithoutCAError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterCertificateWithoutCARequest,
  output: RegisterCertificateWithoutCAResponse,
  errors: [
    CertificateStateException,
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterCertificateWithoutCA",
}));

export type RegisterThingError =
  | ConflictingResourceUpdateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceRegistrationFailureException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Provisions a thing in the device registry. RegisterThing calls other IoT control
 * plane APIs. These calls might exceed your account level
 * IoT Throttling Limits and cause throttle errors. Please contact Amazon Web Services Customer Support to raise
 * your throttling limits if necessary.
 *
 * Requires permission to access the RegisterThing action.
 */
export const registerThing: API.OperationMethod<
  RegisterThingRequest,
  RegisterThingResponse,
  RegisterThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterThingRequest,
  output: RegisterThingResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceRegistrationFailureException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterThing",
}));

export type RejectCertificateTransferError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferAlreadyCompletedException
  | UnauthorizedException
  | CommonErrors;
/**
 * Rejects a pending certificate transfer. After IoT rejects a certificate transfer,
 * the certificate status changes from **PENDING_TRANSFER** to
 * **INACTIVE**.
 *
 * To check for pending certificate transfers, call ListCertificates
 * to enumerate your certificates.
 *
 * This operation can only be called by the transfer destination. After it is called,
 * the certificate will be returned to the source's account in the INACTIVE state.
 *
 * Requires permission to access the RejectCertificateTransfer action.
 */
export const rejectCertificateTransfer: API.OperationMethod<
  RejectCertificateTransferRequest,
  RejectCertificateTransferResponse,
  RejectCertificateTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectCertificateTransferRequest,
  output: RejectCertificateTransferResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferAlreadyCompletedException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectCertificateTransfer",
}));

export type RemoveThingFromBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the given thing from the billing group.
 *
 * Requires permission to access the RemoveThingFromBillingGroup action.
 *
 * This call is asynchronous. It might take several seconds for the detachment to propagate.
 */
export const removeThingFromBillingGroup: API.OperationMethod<
  RemoveThingFromBillingGroupRequest,
  RemoveThingFromBillingGroupResponse,
  RemoveThingFromBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveThingFromBillingGroupRequest,
  output: RemoveThingFromBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveThingFromBillingGroup",
}));

export type RemoveThingFromThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Remove the specified thing from the specified group.
 *
 * You must specify either a `thingGroupArn` or a
 * `thingGroupName` to identify the thing group and
 * either a `thingArn` or a `thingName` to
 * identify the thing to remove from the thing group.
 *
 * Requires permission to access the RemoveThingFromThingGroup action.
 */
export const removeThingFromThingGroup: API.OperationMethod<
  RemoveThingFromThingGroupRequest,
  RemoveThingFromThingGroupResponse,
  RemoveThingFromThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveThingFromThingGroupRequest,
  output: RemoveThingFromThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveThingFromThingGroup",
}));

export type ReplaceTopicRuleError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | SqlParseException
  | UnauthorizedException
  | CommonErrors;
/**
 * Replaces the rule. You must specify all parameters for the new rule. Creating rules
 * is an administrator-level action. Any user who has permission to create rules will be able
 * to access data processed by the rule.
 *
 * Requires permission to access the ReplaceTopicRule action.
 */
export const replaceTopicRule: API.OperationMethod<
  ReplaceTopicRuleRequest,
  ReplaceTopicRuleResponse,
  ReplaceTopicRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReplaceTopicRuleRequest,
  output: ReplaceTopicRuleResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    SqlParseException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplaceTopicRule",
}));

export type SearchIndexError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Searches the specified index.
 *
 * If a device has never connected to IoT Core or was disconnected for more than 1 hour before fleet indexing's `thingConnectivityIndexingMode` was enabled, the `connectivity` object for this device in the response will have the `connected` field set to `false` with no additional session details.
 *
 * Requires permission to access the SearchIndex action.
 */
export const searchIndex: API.OperationMethod<
  SearchIndexRequest,
  SearchIndexResponse,
  SearchIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchIndexRequest,
  output: SearchIndexResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchIndex",
}));

export type SetDefaultAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sets the default authorizer. This will be used if a websocket connection is made
 * without specifying an authorizer.
 *
 * Requires permission to access the SetDefaultAuthorizer action.
 */
export const setDefaultAuthorizer: API.OperationMethod<
  SetDefaultAuthorizerRequest,
  SetDefaultAuthorizerResponse,
  SetDefaultAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetDefaultAuthorizerRequest,
  output: SetDefaultAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultAuthorizer",
}));

export type SetDefaultPolicyVersionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Sets the specified version of the specified policy as the policy's default
 * (operative) version. This action affects all certificates to which the policy is attached.
 * To list the principals the policy is attached to, use the ListPrincipalPolicies
 * action.
 *
 * Requires permission to access the SetDefaultPolicyVersion action.
 */
export const setDefaultPolicyVersion: API.OperationMethod<
  SetDefaultPolicyVersionRequest,
  SetDefaultPolicyVersionResponse,
  SetDefaultPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetDefaultPolicyVersionRequest,
  output: SetDefaultPolicyVersionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultPolicyVersion",
}));

export type SetLoggingOptionsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the logging options.
 *
 * NOTE: use of this command is not recommended. Use `SetV2LoggingOptions`
 * instead.
 *
 * Requires permission to access the SetLoggingOptions action.
 */
export const setLoggingOptions: API.OperationMethod<
  SetLoggingOptionsRequest,
  SetLoggingOptionsResponse,
  SetLoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetLoggingOptionsRequest,
  output: SetLoggingOptionsResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoggingOptions",
}));

export type SetV2LoggingLevelError =
  | InternalException
  | InvalidRequestException
  | LimitExceededException
  | NotConfiguredException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the logging level.
 *
 * Requires permission to access the SetV2LoggingLevel action.
 */
export const setV2LoggingLevel: API.OperationMethod<
  SetV2LoggingLevelRequest,
  SetV2LoggingLevelResponse,
  SetV2LoggingLevelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetV2LoggingLevelRequest,
  output: SetV2LoggingLevelResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    LimitExceededException,
    NotConfiguredException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetV2LoggingLevel",
}));

export type SetV2LoggingOptionsError =
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Sets the logging options for the V2 logging service.
 *
 * Requires permission to access the SetV2LoggingOptions action.
 */
export const setV2LoggingOptions: API.OperationMethod<
  SetV2LoggingOptionsRequest,
  SetV2LoggingOptionsResponse,
  SetV2LoggingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetV2LoggingOptionsRequest,
  output: SetV2LoggingOptionsResponse,
  errors: [
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetV2LoggingOptions",
}));

export type StartAuditMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | TaskAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a task that applies a set of mitigation actions to the specified target.
 *
 * Requires permission to access the StartAuditMitigationActionsTask action.
 */
export const startAuditMitigationActionsTask: API.OperationMethod<
  StartAuditMitigationActionsTaskRequest,
  StartAuditMitigationActionsTaskResponse,
  StartAuditMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAuditMitigationActionsTaskRequest,
  output: StartAuditMitigationActionsTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    TaskAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAuditMitigationActionsTask",
}));

export type StartDetectMitigationActionsTaskError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | TaskAlreadyExistsException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Starts a Device Defender ML Detect mitigation actions task.
 *
 * Requires permission to access the StartDetectMitigationActionsTask action.
 */
export const startDetectMitigationActionsTask: API.OperationMethod<
  StartDetectMitigationActionsTaskRequest,
  StartDetectMitigationActionsTaskResponse,
  StartDetectMitigationActionsTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDetectMitigationActionsTaskRequest,
  output: StartDetectMitigationActionsTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    TaskAlreadyExistsException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDetectMitigationActionsTask",
}));

export type StartOnDemandAuditTaskError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts an on-demand Device Defender audit.
 *
 * Requires permission to access the StartOnDemandAuditTask action.
 */
export const startOnDemandAuditTask: API.OperationMethod<
  StartOnDemandAuditTaskRequest,
  StartOnDemandAuditTaskResponse,
  StartOnDemandAuditTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartOnDemandAuditTaskRequest,
  output: StartOnDemandAuditTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOnDemandAuditTask",
}));

export type StartThingRegistrationTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a bulk thing provisioning task.
 *
 * Requires permission to access the StartThingRegistrationTask action.
 */
export const startThingRegistrationTask: API.OperationMethod<
  StartThingRegistrationTaskRequest,
  StartThingRegistrationTaskResponse,
  StartThingRegistrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartThingRegistrationTaskRequest,
  output: StartThingRegistrationTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThingRegistrationTask",
}));

export type StopThingRegistrationTaskError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels a bulk thing provisioning task.
 *
 * Requires permission to access the StopThingRegistrationTask action.
 */
export const stopThingRegistrationTask: API.OperationMethod<
  StopThingRegistrationTaskRequest,
  StopThingRegistrationTaskResponse,
  StopThingRegistrationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopThingRegistrationTaskRequest,
  output: StopThingRegistrationTaskResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopThingRegistrationTask",
}));

export type TagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds to or modifies the tags of the given resource. Tags are metadata which can be
 * used to manage a resource.
 *
 * Requires permission to access the TagResource action.
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
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestAuthorizationError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tests if a specified principal is authorized to perform an IoT action on a
 * specified resource. Use this to test and debug the authorization behavior of devices that
 * connect to the IoT device gateway.
 *
 * Requires permission to access the TestAuthorization action.
 */
export const testAuthorization: API.OperationMethod<
  TestAuthorizationRequest,
  TestAuthorizationResponse,
  TestAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestAuthorizationRequest,
  output: TestAuthorizationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestAuthorization",
}));

export type TestInvokeAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | InvalidResponseException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tests a custom authorization behavior by invoking a specified custom authorizer. Use
 * this to test and debug the custom authorization behavior of devices that connect to the IoT
 * device gateway.
 *
 * Requires permission to access the TestInvokeAuthorizer action.
 */
export const testInvokeAuthorizer: API.OperationMethod<
  TestInvokeAuthorizerRequest,
  TestInvokeAuthorizerResponse,
  TestInvokeAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestInvokeAuthorizerRequest,
  output: TestInvokeAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    InvalidResponseException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestInvokeAuthorizer",
}));

export type TransferCertificateError =
  | CertificateStateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | TransferConflictException
  | UnauthorizedException
  | CommonErrors;
/**
 * Transfers the specified certificate to the specified Amazon Web Services account.
 *
 * Requires permission to access the TransferCertificate action.
 *
 * You can cancel the transfer until it is accepted by the recipient.
 *
 * No notification is sent to the transfer destination's account. The caller is responsible for notifying the transfer target.
 *
 * The certificate being transferred must not be in the `ACTIVE` state. You can use the
 * UpdateCertificate action to deactivate it.
 *
 * The certificate must not have any policies attached to it. You can use the
 * DetachPolicy action to detach them.
 *
 * **Customer managed key behavior:** When you use a customer managed key to encrypt your data and then transfer
 * the certificate to a customer in a different account using the `TransferCertificate` operation, the certificates will no longer be encrypted by their
 * customer managed key configuration. During the transfer process, certificates are encrypted using Amazon Web Services IoT Core owned keys.
 *
 * While a certificate is in the **PENDING_TRANSFER** state, it's always protected by Amazon Web Services IoT Core owned keys, regardless of the customer managed key configuration of either the source or destination account.
 *
 * Once the transfer is completed through AcceptCertificateTransfer, RejectCertificateTransfer, or
 * CancelCertificateTransfer, the certificate will be protected by the customer managed key configuration of the account that owns
 * the certificate after the transfer operation:
 *
 * - If the transfer is accepted: The certificate is encrypted by the target account's customer managed key configuration.
 *
 * - If the transfer is rejected or cancelled: The certificate is protected by the source account's customer managed key configuration.
 */
export const transferCertificate: API.OperationMethod<
  TransferCertificateRequest,
  TransferCertificateResponse,
  TransferCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TransferCertificateRequest,
  output: TransferCertificateResponse,
  errors: [
    CertificateStateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    TransferConflictException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferCertificate",
}));

export type UntagResourceError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the given tags (metadata) from the resource.
 *
 * Requires permission to access the UntagResource action.
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
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountAuditConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Configures or reconfigures the Device Defender audit settings for this account.
 * Settings include how audit notifications are sent and which audit checks are
 * enabled or disabled.
 *
 * Requires permission to access the UpdateAccountAuditConfiguration action.
 */
export const updateAccountAuditConfiguration: API.OperationMethod<
  UpdateAccountAuditConfigurationRequest,
  UpdateAccountAuditConfigurationResponse,
  UpdateAccountAuditConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountAuditConfigurationRequest,
  output: UpdateAccountAuditConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountAuditConfiguration",
}));

export type UpdateAuditSuppressionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a Device Defender audit suppression.
 */
export const updateAuditSuppression: API.OperationMethod<
  UpdateAuditSuppressionRequest,
  UpdateAuditSuppressionResponse,
  UpdateAuditSuppressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAuditSuppressionRequest,
  output: UpdateAuditSuppressionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuditSuppression",
}));

export type UpdateAuthorizerError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an authorizer.
 *
 * Requires permission to access the UpdateAuthorizer action.
 */
export const updateAuthorizer: API.OperationMethod<
  UpdateAuthorizerRequest,
  UpdateAuthorizerResponse,
  UpdateAuthorizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAuthorizerRequest,
  output: UpdateAuthorizerResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAuthorizer",
}));

export type UpdateBillingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates information about the billing group.
 *
 * Requires permission to access the UpdateBillingGroup action.
 */
export const updateBillingGroup: API.OperationMethod<
  UpdateBillingGroupRequest,
  UpdateBillingGroupResponse,
  UpdateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBillingGroupRequest,
  output: UpdateBillingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingGroup",
}));

export type UpdateCACertificateError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a registered CA certificate.
 *
 * Requires permission to access the UpdateCACertificate action.
 */
export const updateCACertificate: API.OperationMethod<
  UpdateCACertificateRequest,
  UpdateCACertificateResponse,
  UpdateCACertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCACertificateRequest,
  output: UpdateCACertificateResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCACertificate",
}));

export type UpdateCertificateError =
  | CertificateStateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the status of the specified certificate. This operation is
 * idempotent.
 *
 * Requires permission to access the UpdateCertificate action.
 *
 * Certificates must be in the ACTIVE state to authenticate devices that use
 * a certificate to connect to IoT.
 *
 * Within a few minutes of updating a certificate from the ACTIVE state to any other
 * state, IoT disconnects all devices that used that certificate to connect. Devices cannot
 * use a certificate that is not in the ACTIVE state to reconnect.
 */
export const updateCertificate: API.OperationMethod<
  UpdateCertificateRequest,
  UpdateCertificateResponse,
  UpdateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCertificateRequest,
  output: UpdateCertificateResponse,
  errors: [
    CertificateStateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificate",
}));

export type UpdateCertificateProviderError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a certificate provider.
 *
 * Requires permission to access the UpdateCertificateProvider action.
 */
export const updateCertificateProvider: API.OperationMethod<
  UpdateCertificateProviderRequest,
  UpdateCertificateProviderResponse,
  UpdateCertificateProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCertificateProviderRequest,
  output: UpdateCertificateProviderResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificateProvider",
}));

export type UpdateCommandError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update information about a command or mark a command for deprecation.
 */
export const updateCommand: API.OperationMethod<
  UpdateCommandRequest,
  UpdateCommandResponse,
  UpdateCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCommandRequest,
  output: UpdateCommandResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCommand",
}));

export type UpdateCustomMetricError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Updates a
 * Device Defender detect custom metric.
 *
 * Requires permission to access the UpdateCustomMetric action.
 */
export const updateCustomMetric: API.OperationMethod<
  UpdateCustomMetricRequest,
  UpdateCustomMetricResponse,
  UpdateCustomMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomMetricRequest,
  output: UpdateCustomMetricResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomMetric",
}));

export type UpdateDimensionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Updates the definition for a dimension. You
 * cannot
 * change the type of a dimension after
 * it is created (you can delete it and
 * recreate
 * it).
 *
 * Requires permission to access the UpdateDimension action.
 */
export const updateDimension: API.OperationMethod<
  UpdateDimensionRequest,
  UpdateDimensionResponse,
  UpdateDimensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDimensionRequest,
  output: UpdateDimensionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDimension",
}));

export type UpdateDomainConfigurationError =
  | CertificateValidationException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates values stored in the domain configuration. Domain configurations for default
 * endpoints can't be updated.
 *
 * Requires permission to access the UpdateDomainConfiguration action.
 */
export const updateDomainConfiguration: API.OperationMethod<
  UpdateDomainConfigurationRequest,
  UpdateDomainConfigurationResponse,
  UpdateDomainConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainConfigurationRequest,
  output: UpdateDomainConfigurationResponse,
  errors: [
    CertificateValidationException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainConfiguration",
}));

export type UpdateDynamicThingGroupError =
  | InternalFailureException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates a dynamic thing group.
 *
 * Requires permission to access the UpdateDynamicThingGroup action.
 */
export const updateDynamicThingGroup: API.OperationMethod<
  UpdateDynamicThingGroupRequest,
  UpdateDynamicThingGroupResponse,
  UpdateDynamicThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDynamicThingGroupRequest,
  output: UpdateDynamicThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDynamicThingGroup",
}));

export type UpdateEncryptionConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the encryption configuration. By default, Amazon Web Services IoT Core encrypts your data at rest using Amazon Web Services owned keys. Amazon Web Services IoT Core also supports symmetric customer managed keys
 * from Key Management Service (KMS). With customer managed keys, you create, own, and
 * manage the KMS keys in your Amazon Web Services account.
 *
 * Before using this API, you must set up permissions for Amazon Web Services IoT Core to access KMS. For more information, see Data encryption at rest in the *Amazon Web Services IoT Core Developer Guide*.
 */
export const updateEncryptionConfiguration: API.OperationMethod<
  UpdateEncryptionConfigurationRequest,
  UpdateEncryptionConfigurationResponse,
  UpdateEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEncryptionConfigurationRequest,
  output: UpdateEncryptionConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEncryptionConfiguration",
}));

export type UpdateEventConfigurationsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the event configurations.
 *
 * Requires permission to access the UpdateEventConfigurations action.
 */
export const updateEventConfigurations: API.OperationMethod<
  UpdateEventConfigurationsRequest,
  UpdateEventConfigurationsResponse,
  UpdateEventConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventConfigurationsRequest,
  output: UpdateEventConfigurationsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventConfigurations",
}));

export type UpdateFleetMetricError =
  | IndexNotReadyException
  | InternalFailureException
  | InvalidAggregationException
  | InvalidQueryException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates the data for a fleet metric.
 *
 * Requires permission to access the UpdateFleetMetric action.
 */
export const updateFleetMetric: API.OperationMethod<
  UpdateFleetMetricRequest,
  UpdateFleetMetricResponse,
  UpdateFleetMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetMetricRequest,
  output: UpdateFleetMetricResponse,
  errors: [
    IndexNotReadyException,
    InternalFailureException,
    InvalidAggregationException,
    InvalidQueryException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleetMetric",
}));

export type UpdateIndexingConfigurationError =
  | InternalFailureException
  | InvalidRequestException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the search configuration.
 *
 * Requires permission to access the UpdateIndexingConfiguration action.
 */
export const updateIndexingConfiguration: API.OperationMethod<
  UpdateIndexingConfigurationRequest,
  UpdateIndexingConfigurationResponse,
  UpdateIndexingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIndexingConfigurationRequest,
  output: UpdateIndexingConfigurationResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndexingConfiguration",
}));

export type UpdateJobError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates supported fields of the specified job.
 *
 * Requires permission to access the UpdateJob action.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResponse,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobRequest,
  output: UpdateJobResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
}));

export type UpdateMitigationActionError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the definition for the specified mitigation action.
 *
 * Requires permission to access the UpdateMitigationAction action.
 */
export const updateMitigationAction: API.OperationMethod<
  UpdateMitigationActionRequest,
  UpdateMitigationActionResponse,
  UpdateMitigationActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMitigationActionRequest,
  output: UpdateMitigationActionResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMitigationAction",
}));

export type UpdatePackageError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the supported fields for a specific software package.
 *
 * Requires permission to access the UpdatePackage and GetIndexingConfiguration actions.
 */
export const updatePackage: API.OperationMethod<
  UpdatePackageRequest,
  UpdatePackageResponse,
  UpdatePackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageRequest,
  output: UpdatePackageResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackage",
}));

export type UpdatePackageConfigurationError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the software package configuration.
 *
 * Requires permission to access the UpdatePackageConfiguration and iam:PassRole actions.
 */
export const updatePackageConfiguration: API.OperationMethod<
  UpdatePackageConfigurationRequest,
  UpdatePackageConfigurationResponse,
  UpdatePackageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageConfigurationRequest,
  output: UpdatePackageConfigurationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackageConfiguration",
}));

export type UpdatePackageVersionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the supported fields for a specific package version.
 *
 * Requires permission to access the UpdatePackageVersion and GetIndexingConfiguration actions.
 */
export const updatePackageVersion: API.OperationMethod<
  UpdatePackageVersionRequest,
  UpdatePackageVersionResponse,
  UpdatePackageVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackageVersionRequest,
  output: UpdatePackageVersionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackageVersion",
}));

export type UpdateProvisioningTemplateError =
  | ConflictingResourceUpdateException
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a provisioning template.
 *
 * Requires permission to access the UpdateProvisioningTemplate action.
 */
export const updateProvisioningTemplate: API.OperationMethod<
  UpdateProvisioningTemplateRequest,
  UpdateProvisioningTemplateResponse,
  UpdateProvisioningTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProvisioningTemplateRequest,
  output: UpdateProvisioningTemplateResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisioningTemplate",
}));

export type UpdateRoleAliasError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a role alias.
 *
 * Requires permission to access the UpdateRoleAlias action.
 *
 * The value of
 * `credentialDurationSeconds`
 * must be less than or equal to the
 * maximum session duration of the IAM role that the role alias references. For more
 * information, see Modifying a role maximum session duration (Amazon Web Services API) from the Amazon Web Services
 * Identity and Access Management User Guide.
 */
export const updateRoleAlias: API.OperationMethod<
  UpdateRoleAliasRequest,
  UpdateRoleAliasResponse,
  UpdateRoleAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRoleAliasRequest,
  output: UpdateRoleAliasResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRoleAlias",
}));

export type UpdateScheduledAuditError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a scheduled audit, including which checks are performed and
 * how often the audit takes place.
 *
 * Requires permission to access the UpdateScheduledAudit action.
 */
export const updateScheduledAudit: API.OperationMethod<
  UpdateScheduledAuditRequest,
  UpdateScheduledAuditResponse,
  UpdateScheduledAuditError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScheduledAuditRequest,
  output: UpdateScheduledAuditResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledAudit",
}));

export type UpdateSecurityProfileError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Updates a Device Defender security profile.
 *
 * Requires permission to access the UpdateSecurityProfile action.
 */
export const updateSecurityProfile: API.OperationMethod<
  UpdateSecurityProfileRequest,
  UpdateSecurityProfileResponse,
  UpdateSecurityProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecurityProfileRequest,
  output: UpdateSecurityProfileResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecurityProfile",
}));

export type UpdateStreamError =
  | InternalFailureException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing stream. The stream version will be incremented by one.
 *
 * Requires permission to access the UpdateStream action.
 */
export const updateStream: API.OperationMethod<
  UpdateStreamRequest,
  UpdateStreamResponse,
  UpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStreamRequest,
  output: UpdateStreamResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStream",
}));

export type UpdateThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | VersionConflictException
  | CommonErrors;
/**
 * Updates the data for a thing.
 *
 * Requires permission to access the UpdateThing action.
 */
export const updateThing: API.OperationMethod<
  UpdateThingRequest,
  UpdateThingResponse,
  UpdateThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThingRequest,
  output: UpdateThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThing",
}));

export type UpdateThingGroupError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | VersionConflictException
  | CommonErrors;
/**
 * Update a thing group.
 *
 * Requires permission to access the UpdateThingGroup action.
 */
export const updateThingGroup: API.OperationMethod<
  UpdateThingGroupRequest,
  UpdateThingGroupResponse,
  UpdateThingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThingGroupRequest,
  output: UpdateThingGroupResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    VersionConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingGroup",
}));

export type UpdateThingGroupsForThingError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the groups to which the thing belongs.
 *
 * Requires permission to access the UpdateThingGroupsForThing action.
 */
export const updateThingGroupsForThing: API.OperationMethod<
  UpdateThingGroupsForThingRequest,
  UpdateThingGroupsForThingResponse,
  UpdateThingGroupsForThingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThingGroupsForThingRequest,
  output: UpdateThingGroupsForThingResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingGroupsForThing",
}));

export type UpdateThingTypeError =
  | InternalFailureException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a thing type.
 */
export const updateThingType: API.OperationMethod<
  UpdateThingTypeRequest,
  UpdateThingTypeResponse,
  UpdateThingTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThingTypeRequest,
  output: UpdateThingTypeResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThingType",
}));

export type UpdateTopicRuleDestinationError =
  | ConflictingResourceUpdateException
  | InternalException
  | InvalidRequestException
  | ServiceUnavailableException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a topic rule destination. You use this to change the status, endpoint URL, or
 * confirmation URL of the destination.
 *
 * Requires permission to access the UpdateTopicRuleDestination action.
 */
export const updateTopicRuleDestination: API.OperationMethod<
  UpdateTopicRuleDestinationRequest,
  UpdateTopicRuleDestinationResponse,
  UpdateTopicRuleDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTopicRuleDestinationRequest,
  output: UpdateTopicRuleDestinationResponse,
  errors: [
    ConflictingResourceUpdateException,
    InternalException,
    InvalidRequestException,
    ServiceUnavailableException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTopicRuleDestination",
}));

export type ValidateSecurityProfileBehaviorsError =
  | InternalFailureException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * The IoT Device Defender detect feature will no longer be available to new customers starting August 31, 2026. If you would like to use the detect feature, sign up prior to August 31, 2026. To learn about alternatives to IoT Device Defender detect, see IoT Device Defender detect feature availability change in the IoT Device Defender Developer Guide. There is no change to IoT Device Defender audit availability.
 *
 * Validates a Device Defender security profile behaviors specification.
 *
 * Requires permission to access the ValidateSecurityProfileBehaviors action.
 */
export const validateSecurityProfileBehaviors: API.OperationMethod<
  ValidateSecurityProfileBehaviorsRequest,
  ValidateSecurityProfileBehaviorsResponse,
  ValidateSecurityProfileBehaviorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateSecurityProfileBehaviorsRequest,
  output: ValidateSecurityProfileBehaviorsResponse,
  errors: [
    InternalFailureException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSecurityProfileBehaviors",
}));
