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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Lambda",
  serviceShapeName: "AWSGirApiService",
});
const auth = T.AwsAuthSigv4({ name: "lambda" });
const ver = T.ServiceVersion("2015-03-31");
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
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lambda-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lambda.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://lambda.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AliasLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AliasLimitExceededException>()(
    "AliasLimitExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CallbackTimeoutException
  extends /*@__PURE__*/ S.TaggedError<CallbackTimeoutException>()(
    "CallbackTimeoutException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CapacityProviderLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CapacityProviderLimitExceededException>()(
    "CapacityProviderLimitExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeArtifactUserDeletedException
  extends /*@__PURE__*/ S.TaggedError<CodeArtifactUserDeletedException>()(
    "CodeArtifactUserDeletedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CodeArtifactUserFailedException
  extends /*@__PURE__*/ S.TaggedError<CodeArtifactUserFailedException>()(
    "CodeArtifactUserFailedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CodeArtifactUserPendingException
  extends /*@__PURE__*/ S.TaggedError<CodeArtifactUserPendingException>()(
    "CodeArtifactUserPendingException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CodeSigningConfigNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CodeSigningConfigNotFoundException>()(
    "CodeSigningConfigNotFoundException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class CodeStorageExceededException
  extends /*@__PURE__*/ S.TaggedError<CodeStorageExceededException>()(
    "CodeStorageExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CodeVerificationFailedException
  extends /*@__PURE__*/ S.TaggedError<CodeVerificationFailedException>()(
    "CodeVerificationFailedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DurableExecutionAlreadyStartedException
  extends /*@__PURE__*/ S.TaggedError<DurableExecutionAlreadyStartedException>()(
    "DurableExecutionAlreadyStartedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EC2AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<EC2AccessDeniedException>()(
    "EC2AccessDeniedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError, C.withAuthError) {}
export class EC2ThrottledException
  extends /*@__PURE__*/ S.TaggedError<EC2ThrottledException>()(
    "EC2ThrottledException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class EC2UnexpectedException
  extends /*@__PURE__*/ S.TaggedError<EC2UnexpectedException>()(
    "EC2UnexpectedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      EC2ErrorCode: S.optional(S.String),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class EFSIOException
  extends /*@__PURE__*/ S.TaggedError<EFSIOException>()(
    "EFSIOException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class EFSMountConnectivityException
  extends /*@__PURE__*/ S.TaggedError<EFSMountConnectivityException>()(
    "EFSMountConnectivityException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class EFSMountFailureException
  extends /*@__PURE__*/ S.TaggedError<EFSMountFailureException>()(
    "EFSMountFailureException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class EFSMountTimeoutException
  extends /*@__PURE__*/ S.TaggedError<EFSMountTimeoutException>()(
    "EFSMountTimeoutException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class ENILimitReachedException
  extends /*@__PURE__*/ S.TaggedError<ENILimitReachedException>()(
    "ENILimitReachedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ENINotReadyException
  extends /*@__PURE__*/ S.TaggedError<ENINotReadyException>()(
    "ENINotReadyException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class FunctionVersionsPerCapacityProviderLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FunctionVersionsPerCapacityProviderLimitExceededException>()(
    "FunctionVersionsPerCapacityProviderLimitExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidCodeSignatureException
  extends /*@__PURE__*/ S.TaggedError<InvalidCodeSignatureException>()(
    "InvalidCodeSignatureException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestContentException>()(
    "InvalidRequestContentException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRuntimeException
  extends /*@__PURE__*/ S.TaggedError<InvalidRuntimeException>()(
    "InvalidRuntimeException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class InvalidSecurityGroupIDException
  extends /*@__PURE__*/ S.TaggedError<InvalidSecurityGroupIDException>()(
    "InvalidSecurityGroupIDException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class InvalidSubnetIDException
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnetIDException>()(
    "InvalidSubnetIDException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class InvalidZipFileException
  extends /*@__PURE__*/ S.TaggedError<InvalidZipFileException>()(
    "InvalidZipFileException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class KMSAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<KMSAccessDeniedException>()(
    "KMSAccessDeniedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError, C.withAuthError) {}
export class KMSDisabledException
  extends /*@__PURE__*/ S.TaggedError<KMSDisabledException>()(
    "KMSDisabledException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class KMSInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<KMSInvalidStateException>()(
    "KMSInvalidStateException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class KMSNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KMSNotFoundException>()(
    "KMSNotFoundException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class ModeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ModeNotSupportedException>()(
    "ModeNotSupportedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoPublishedVersionException
  extends /*@__PURE__*/ S.TaggedError<NoPublishedVersionException>()(
    "NoPublishedVersionException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ParseError
  extends /*@__PURE__*/ S.TaggedError<ParseError>()("ParseError", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class PolicyLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicyLengthExceededException>()(
    "PolicyLengthExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(412),
  ) {}
export class ProvisionedConcurrencyConfigNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedConcurrencyConfigNotFoundException>()(
    "ProvisionedConcurrencyConfigNotFoundException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PublicPolicyException
  extends /*@__PURE__*/ S.TaggedError<PublicPolicyException>()(
    "PublicPolicyException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RecursiveInvocationException
  extends /*@__PURE__*/ S.TaggedError<RecursiveInvocationException>()(
    "RecursiveInvocationException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()(
    "RequestLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError) {}
export class RequestTooLargeException
  extends /*@__PURE__*/ S.TaggedError<RequestTooLargeException>()(
    "RequestTooLargeException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()(
    "ResourceNotReadyException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class S3FilesMountConnectivityException
  extends /*@__PURE__*/ S.TaggedError<S3FilesMountConnectivityException>()(
    "S3FilesMountConnectivityException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class S3FilesMountFailureException
  extends /*@__PURE__*/ S.TaggedError<S3FilesMountFailureException>()(
    "S3FilesMountFailureException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class S3FilesMountTimeoutException
  extends /*@__PURE__*/ S.TaggedError<S3FilesMountTimeoutException>()(
    "S3FilesMountTimeoutException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class SerializedRequestEntityTooLargeException
  extends /*@__PURE__*/ S.TaggedError<SerializedRequestEntityTooLargeException>()(
    "SerializedRequestEntityTooLargeException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SnapStartException
  extends /*@__PURE__*/ S.TaggedError<SnapStartException>()(
    "SnapStartException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SnapStartNotReadyException
  extends /*@__PURE__*/ S.TaggedError<SnapStartNotReadyException>()(
    "SnapStartNotReadyException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class SnapStartRegenerationFailureException
  extends /*@__PURE__*/ S.TaggedError<SnapStartRegenerationFailureException>()(
    "SnapStartRegenerationFailureException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class SnapStartTimeoutException
  extends /*@__PURE__*/ S.TaggedError<SnapStartTimeoutException>()(
    "SnapStartTimeoutException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class SubnetIPAddressLimitReachedException
  extends /*@__PURE__*/ S.TaggedError<SubnetIPAddressLimitReachedException>()(
    "SubnetIPAddressLimitReachedException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ThrottleReason).annotate({
          identifier: "ThrottleReason",
        }),
      ),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedMediaTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedMediaTypeException>()(
    "UnsupportedMediaTypeException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export type LayerName = string;
export type LayerVersionNumber = number;
export type StatementId = string;
export type LayerPermissionAllowedAction = string;
export type LayerPermissionAllowedPrincipal = string;
export type OrganizationId = string;
export interface AddLayerVersionPermissionRequest {
  LayerName: string;
  VersionNumber: number;
  StatementId: string;
  Action: string;
  Principal: string;
  OrganizationId?: string;
  RevisionId?: string;
}
export const AddLayerVersionPermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
    StatementId: S.String,
    Action: S.String,
    Principal: S.String,
    OrganizationId: S.optional(S.String),
    RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddLayerVersionPermissionRequest",
}) as any as S.Schema<AddLayerVersionPermissionRequest>;
export interface AddLayerVersionPermissionResponse {
  Statement?: string;
  RevisionId?: string;
}
export const AddLayerVersionPermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statement: S.optional(S.String),
    RevisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "AddLayerVersionPermissionResponse",
}) as any as S.Schema<AddLayerVersionPermissionResponse>;
export type NamespacedFunctionName = string;
export type Action = string;
export type Principal = string;
export type Arn = string;
export type FunctionUrlAuthType = "NONE" | "AWS_IAM" | (string & {});
export const FunctionUrlAuthType = S.String;

export type InvokedViaFunctionUrl = boolean;
export type SourceOwner = string;
export type EventSourceToken = string;
export type NumericLatestPublishedOrAliasQualifier = string;
export type PrincipalOrgID = string;
export interface AddPermissionRequest {
  FunctionName: string;
  StatementId: string;
  Action: string;
  Principal: string;
  SourceArn?: string;
  FunctionUrlAuthType?: FunctionUrlAuthType;
  InvokedViaFunctionUrl?: boolean;
  SourceAccount?: string;
  EventSourceToken?: string;
  Qualifier?: string;
  RevisionId?: string;
  PrincipalOrgID?: string;
}
export const AddPermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    StatementId: S.String,
    Action: S.String,
    Principal: S.String,
    SourceArn: S.optional(S.String),
    FunctionUrlAuthType: S.optional(FunctionUrlAuthType),
    InvokedViaFunctionUrl: S.optional(S.Boolean),
    SourceAccount: S.optional(S.String),
    EventSourceToken: S.optional(S.String),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    RevisionId: S.optional(S.String),
    PrincipalOrgID: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2015-03-31/functions/{FunctionName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddPermissionRequest",
}) as any as S.Schema<AddPermissionRequest>;
export interface AddPermissionResponse {
  Statement?: string;
}
export const AddPermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Statement: S.optional(S.String) }),
).annotate({
  identifier: "AddPermissionResponse",
}) as any as S.Schema<AddPermissionResponse>;
export type DurableExecutionArn = string;
export type CheckpointToken = string;
export type OperationId = string;
export type OperationName = string;
export type OperationType =
  | "EXECUTION"
  | "CONTEXT"
  | "STEP"
  | "WAIT"
  | "CALLBACK"
  | "CHAINED_INVOKE"
  | (string & {});
export const OperationType = S.String;

export type OperationSubType = string;
export type OperationAction =
  | "START"
  | "SUCCEED"
  | "FAIL"
  | "RETRY"
  | "CANCEL"
  | (string & {});
export const OperationAction = S.String;

export type OperationPayload = string | redacted.Redacted<string>;
export type ErrorMessage = string | redacted.Redacted<string>;
export type ErrorType = string | redacted.Redacted<string>;
export type ErrorData = string | redacted.Redacted<string>;
export type StackTraceEntry = string | redacted.Redacted<string>;
export type StackTraceEntries = (string | redacted.Redacted<string>)[];
export const StackTraceEntries = /*@__PURE__*/ S.Array(SensitiveString);
export interface ErrorObject {
  ErrorMessage?: string | redacted.Redacted<string>;
  ErrorType?: string | redacted.Redacted<string>;
  ErrorData?: string | redacted.Redacted<string>;
  StackTrace?: (string | redacted.Redacted<string>)[];
}
export const ErrorObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorMessage: S.optional(SensitiveString),
    ErrorType: S.optional(SensitiveString),
    ErrorData: S.optional(SensitiveString),
    StackTrace: S.optional(StackTraceEntries),
  }),
).annotate({ identifier: "ErrorObject" }) as any as S.Schema<ErrorObject>;
export type ReplayChildren = boolean;
export interface ContextOptions {
  ReplayChildren?: boolean;
}
export const ContextOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplayChildren: S.optional(S.Boolean) }),
).annotate({ identifier: "ContextOptions" }) as any as S.Schema<ContextOptions>;
export type DurationSeconds = number;
export interface StepOptions {
  NextAttemptDelaySeconds?: number;
}
export const StepOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextAttemptDelaySeconds: S.optional(S.Number) }),
).annotate({ identifier: "StepOptions" }) as any as S.Schema<StepOptions>;
export interface WaitOptions {
  WaitSeconds?: number;
}
export const WaitOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WaitSeconds: S.optional(S.Number) }),
).annotate({ identifier: "WaitOptions" }) as any as S.Schema<WaitOptions>;
export interface CallbackOptions {
  TimeoutSeconds?: number;
  HeartbeatTimeoutSeconds?: number;
}
export const CallbackOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutSeconds: S.optional(S.Number),
    HeartbeatTimeoutSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "CallbackOptions",
}) as any as S.Schema<CallbackOptions>;
export type TenantId = string;
export interface ChainedInvokeOptions {
  FunctionName: string;
  TenantId?: string;
}
export const ChainedInvokeOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionName: S.String, TenantId: S.optional(S.String) }),
).annotate({
  identifier: "ChainedInvokeOptions",
}) as any as S.Schema<ChainedInvokeOptions>;
export interface OperationUpdate {
  Id: string;
  ParentId?: string;
  Name?: string;
  Type: OperationType;
  SubType?: string;
  Action: OperationAction;
  Payload?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
  ContextOptions?: ContextOptions;
  StepOptions?: StepOptions;
  WaitOptions?: WaitOptions;
  CallbackOptions?: CallbackOptions;
  ChainedInvokeOptions?: ChainedInvokeOptions;
}
export const OperationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    ParentId: S.optional(S.String),
    Name: S.optional(S.String),
    Type: OperationType,
    SubType: S.optional(S.String),
    Action: OperationAction,
    Payload: S.optional(SensitiveString),
    Error: S.optional(ErrorObject),
    ContextOptions: S.optional(ContextOptions),
    StepOptions: S.optional(StepOptions),
    WaitOptions: S.optional(WaitOptions),
    CallbackOptions: S.optional(CallbackOptions),
    ChainedInvokeOptions: S.optional(ChainedInvokeOptions),
  }),
).annotate({
  identifier: "OperationUpdate",
}) as any as S.Schema<OperationUpdate>;
export type OperationUpdates = OperationUpdate[];
export const OperationUpdates = /*@__PURE__*/ S.Array(OperationUpdate);
export type ClientToken = string;
export interface CheckpointDurableExecutionRequest {
  DurableExecutionArn: string;
  CheckpointToken: string;
  Updates?: OperationUpdate[];
  ClientToken?: string;
}
export const CheckpointDurableExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
    CheckpointToken: S.String,
    Updates: S.optional(OperationUpdates),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/checkpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CheckpointDurableExecutionRequest",
}) as any as S.Schema<CheckpointDurableExecutionRequest>;
export type ExecutionTimestamp = Date;
export type OperationStatus =
  | "STARTED"
  | "PENDING"
  | "READY"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "TIMED_OUT"
  | "STOPPED"
  | (string & {});
export const OperationStatus = S.String;

export type InputPayload = string | redacted.Redacted<string>;
export interface ExecutionDetails {
  InputPayload?: string | redacted.Redacted<string>;
}
export const ExecutionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputPayload: S.optional(SensitiveString) }),
).annotate({
  identifier: "ExecutionDetails",
}) as any as S.Schema<ExecutionDetails>;
export interface ContextDetails {
  ReplayChildren?: boolean;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export const ContextDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReplayChildren: S.optional(S.Boolean),
    Result: S.optional(SensitiveString),
    Error: S.optional(ErrorObject),
  }),
).annotate({ identifier: "ContextDetails" }) as any as S.Schema<ContextDetails>;
export type AttemptCount = number;
export interface StepDetails {
  Attempt?: number;
  NextAttemptTimestamp?: Date;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export const StepDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attempt: S.optional(S.Number),
    NextAttemptTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Result: S.optional(SensitiveString),
    Error: S.optional(ErrorObject),
  }),
).annotate({ identifier: "StepDetails" }) as any as S.Schema<StepDetails>;
export interface WaitDetails {
  ScheduledEndTimestamp?: Date;
}
export const WaitDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledEndTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "WaitDetails" }) as any as S.Schema<WaitDetails>;
export type CallbackId = string;
export interface CallbackDetails {
  CallbackId?: string;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export const CallbackDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallbackId: S.optional(S.String),
    Result: S.optional(SensitiveString),
    Error: S.optional(ErrorObject),
  }),
).annotate({
  identifier: "CallbackDetails",
}) as any as S.Schema<CallbackDetails>;
export interface ChainedInvokeDetails {
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
}
export const ChainedInvokeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Result: S.optional(SensitiveString),
    Error: S.optional(ErrorObject),
  }),
).annotate({
  identifier: "ChainedInvokeDetails",
}) as any as S.Schema<ChainedInvokeDetails>;
export interface Operation {
  Id: string;
  ParentId?: string;
  Name?: string;
  Type: OperationType;
  SubType?: string;
  StartTimestamp: Date;
  EndTimestamp?: Date;
  Status: OperationStatus;
  ExecutionDetails?: ExecutionDetails;
  ContextDetails?: ContextDetails;
  StepDetails?: StepDetails;
  WaitDetails?: WaitDetails;
  CallbackDetails?: CallbackDetails;
  ChainedInvokeDetails?: ChainedInvokeDetails;
}
export const Operation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    ParentId: S.optional(S.String),
    Name: S.optional(S.String),
    Type: OperationType,
    SubType: S.optional(S.String),
    StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: OperationStatus,
    ExecutionDetails: S.optional(ExecutionDetails),
    ContextDetails: S.optional(ContextDetails),
    StepDetails: S.optional(StepDetails),
    WaitDetails: S.optional(WaitDetails),
    CallbackDetails: S.optional(CallbackDetails),
    ChainedInvokeDetails: S.optional(ChainedInvokeDetails),
  }),
).annotate({ identifier: "Operation" }) as any as S.Schema<Operation>;
export type Operations = Operation[];
export const Operations = /*@__PURE__*/ S.Array(Operation);
export interface CheckpointUpdatedExecutionState {
  Operations?: Operation[];
  NextMarker?: string;
}
export const CheckpointUpdatedExecutionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operations: S.optional(Operations),
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "CheckpointUpdatedExecutionState",
}) as any as S.Schema<CheckpointUpdatedExecutionState>;
export interface CheckpointDurableExecutionResponse {
  CheckpointToken?: string;
  NewExecutionState: CheckpointUpdatedExecutionState;
}
export const CheckpointDurableExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckpointToken: S.optional(S.String),
    NewExecutionState: CheckpointUpdatedExecutionState,
  }),
).annotate({
  identifier: "CheckpointDurableExecutionResponse",
}) as any as S.Schema<CheckpointDurableExecutionResponse>;
export type FunctionName = string;
export type Alias = string;
export type VersionWithLatestPublished = string;
export type Description = string;
export type AdditionalVersion = string;
export type Weight = number;
export type AdditionalVersionWeights = { [key: string]: number | undefined };
export const AdditionalVersionWeights = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface AliasRoutingConfiguration {
  AdditionalVersionWeights?: { [key: string]: number | undefined };
}
export const AliasRoutingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdditionalVersionWeights: S.optional(AdditionalVersionWeights) }),
).annotate({
  identifier: "AliasRoutingConfiguration",
}) as any as S.Schema<AliasRoutingConfiguration>;
export interface CreateAliasRequest {
  FunctionName: string;
  Name: string;
  FunctionVersion: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
}
export const CreateAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Name: S.String,
    FunctionVersion: S.String,
    Description: S.optional(S.String),
    RoutingConfig: S.optional(AliasRoutingConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2015-03-31/functions/{FunctionName}/aliases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAliasRequest",
}) as any as S.Schema<CreateAliasRequest>;
export type FunctionArn = string;
export type Version = string;
export interface AliasConfiguration {
  AliasArn?: string;
  Name?: string;
  FunctionVersion?: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
  RevisionId?: string;
}
export const AliasConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AliasArn: S.optional(S.String),
    Name: S.optional(S.String),
    FunctionVersion: S.optional(S.String),
    Description: S.optional(S.String),
    RoutingConfig: S.optional(AliasRoutingConfiguration),
    RevisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "AliasConfiguration",
}) as any as S.Schema<AliasConfiguration>;
export type CapacityProviderName = string;
export type SubnetId = string;
export type CapacityProviderSubnetIds = string[];
export const CapacityProviderSubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type CapacityProviderSecurityGroupIds = string[];
export const CapacityProviderSecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface CapacityProviderVpcConfig {
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export const CapacityProviderVpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: CapacityProviderSubnetIds,
    SecurityGroupIds: CapacityProviderSecurityGroupIds,
  }),
).annotate({
  identifier: "CapacityProviderVpcConfig",
}) as any as S.Schema<CapacityProviderVpcConfig>;
export type RoleArn = string;
export interface CapacityProviderPermissionsConfig {
  CapacityProviderOperatorRoleArn: string;
}
export const CapacityProviderPermissionsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityProviderOperatorRoleArn: S.String }),
).annotate({
  identifier: "CapacityProviderPermissionsConfig",
}) as any as S.Schema<CapacityProviderPermissionsConfig>;
export type Architecture = "x86_64" | "arm64" | (string & {});
export const Architecture = S.String;

export type ArchitecturesList = Architecture[];
export const ArchitecturesList = /*@__PURE__*/ S.Array(Architecture);
export type InstanceType = string;
export type InstanceTypeSet = string[];
export const InstanceTypeSet = /*@__PURE__*/ S.Array(S.String);
export interface InstanceRequirements {
  Architectures?: Architecture[];
  AllowedInstanceTypes?: string[];
  ExcludedInstanceTypes?: string[];
}
export const InstanceRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Architectures: S.optional(ArchitecturesList),
    AllowedInstanceTypes: S.optional(InstanceTypeSet),
    ExcludedInstanceTypes: S.optional(InstanceTypeSet),
  }),
).annotate({
  identifier: "InstanceRequirements",
}) as any as S.Schema<InstanceRequirements>;
export type CapacityProviderMaxVCpuCount = number;
export type CapacityProviderScalingMode = "Auto" | "Manual" | (string & {});
export const CapacityProviderScalingMode = S.String;

export type CapacityProviderPredefinedMetricType =
  | "LambdaCapacityProviderAverageCPUUtilization"
  | (string & {});
export const CapacityProviderPredefinedMetricType = S.String;

export type MetricTargetValue = number;
export interface TargetTrackingScalingPolicy {
  PredefinedMetricType: CapacityProviderPredefinedMetricType;
  TargetValue: number;
}
export const TargetTrackingScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredefinedMetricType: CapacityProviderPredefinedMetricType,
    TargetValue: S.Number,
  }),
).annotate({
  identifier: "TargetTrackingScalingPolicy",
}) as any as S.Schema<TargetTrackingScalingPolicy>;
export type CapacityProviderScalingPoliciesList = TargetTrackingScalingPolicy[];
export const CapacityProviderScalingPoliciesList = /*@__PURE__*/ S.Array(
  TargetTrackingScalingPolicy,
);
export interface CapacityProviderScalingConfig {
  MaxVCpuCount?: number;
  ScalingMode?: CapacityProviderScalingMode;
  ScalingPolicies?: TargetTrackingScalingPolicy[];
}
export const CapacityProviderScalingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxVCpuCount: S.optional(S.Number),
    ScalingMode: S.optional(CapacityProviderScalingMode),
    ScalingPolicies: S.optional(CapacityProviderScalingPoliciesList),
  }),
).annotate({
  identifier: "CapacityProviderScalingConfig",
}) as any as S.Schema<CapacityProviderScalingConfig>;
export type KMSKeyArnNonEmpty = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type PropagateTagsMode = "None" | "Explicit" | (string & {});
export const PropagateTagsMode = S.String;

export interface PropagateTags {
  Mode?: PropagateTagsMode;
  ExplicitTags?: { [key: string]: string | undefined };
}
export const PropagateTags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(PropagateTagsMode),
    ExplicitTags: S.optional(Tags),
  }),
).annotate({ identifier: "PropagateTags" }) as any as S.Schema<PropagateTags>;
export type SystemLogLevel = "DEBUG" | "INFO" | "WARN" | (string & {});
export const SystemLogLevel = S.String;

export type LogGroup = string;
export interface CapacityProviderLoggingConfig {
  SystemLogLevel?: SystemLogLevel;
  LogGroup?: string;
}
export const CapacityProviderLoggingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SystemLogLevel: S.optional(SystemLogLevel),
    LogGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "CapacityProviderLoggingConfig",
}) as any as S.Schema<CapacityProviderLoggingConfig>;
export interface CapacityProviderTelemetryConfig {
  LoggingConfig?: CapacityProviderLoggingConfig;
}
export const CapacityProviderTelemetryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoggingConfig: S.optional(CapacityProviderLoggingConfig) }),
).annotate({
  identifier: "CapacityProviderTelemetryConfig",
}) as any as S.Schema<CapacityProviderTelemetryConfig>;
export interface CreateCapacityProviderRequest {
  CapacityProviderName: string;
  VpcConfig: CapacityProviderVpcConfig;
  PermissionsConfig: CapacityProviderPermissionsConfig;
  InstanceRequirements?: InstanceRequirements;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  KmsKeyArn?: string;
  Tags?: { [key: string]: string | undefined };
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export const CreateCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviderName: S.String,
    VpcConfig: CapacityProviderVpcConfig,
    PermissionsConfig: CapacityProviderPermissionsConfig,
    InstanceRequirements: S.optional(InstanceRequirements),
    CapacityProviderScalingConfig: S.optional(CapacityProviderScalingConfig),
    KmsKeyArn: S.optional(S.String),
    Tags: S.optional(Tags),
    PropagateTags: S.optional(PropagateTags),
    TelemetryConfig: S.optional(CapacityProviderTelemetryConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2025-11-30/capacity-providers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCapacityProviderRequest",
}) as any as S.Schema<CreateCapacityProviderRequest>;
export type CapacityProviderArn = string;
export type CapacityProviderState =
  | "Pending"
  | "Active"
  | "Failed"
  | "Deleting"
  | (string & {});
export const CapacityProviderState = S.String;

export type KMSKeyArn = string;
export interface CapacityProvider {
  CapacityProviderArn: string;
  State: CapacityProviderState;
  VpcConfig: CapacityProviderVpcConfig;
  PermissionsConfig: CapacityProviderPermissionsConfig;
  InstanceRequirements?: InstanceRequirements;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  KmsKeyArn?: string;
  LastModified?: string;
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export const CapacityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviderArn: S.String,
    State: CapacityProviderState,
    VpcConfig: CapacityProviderVpcConfig,
    PermissionsConfig: CapacityProviderPermissionsConfig,
    InstanceRequirements: S.optional(InstanceRequirements),
    CapacityProviderScalingConfig: S.optional(CapacityProviderScalingConfig),
    KmsKeyArn: S.optional(S.String),
    LastModified: S.optional(S.String),
    PropagateTags: S.optional(PropagateTags),
    TelemetryConfig: S.optional(CapacityProviderTelemetryConfig),
  }),
).annotate({
  identifier: "CapacityProvider",
}) as any as S.Schema<CapacityProvider>;
export interface CreateCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export const CreateCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityProvider: CapacityProvider }),
).annotate({
  identifier: "CreateCapacityProviderResponse",
}) as any as S.Schema<CreateCapacityProviderResponse>;
export type SigningProfileVersionArns = string[];
export const SigningProfileVersionArns = /*@__PURE__*/ S.Array(S.String);
export interface AllowedPublishers {
  SigningProfileVersionArns: string[];
}
export const AllowedPublishers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SigningProfileVersionArns: SigningProfileVersionArns }),
).annotate({
  identifier: "AllowedPublishers",
}) as any as S.Schema<AllowedPublishers>;
export type CodeSigningPolicy = "Warn" | "Enforce" | (string & {});
export const CodeSigningPolicy = S.String;

export interface CodeSigningPolicies {
  UntrustedArtifactOnDeployment?: CodeSigningPolicy;
}
export const CodeSigningPolicies = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UntrustedArtifactOnDeployment: S.optional(CodeSigningPolicy) }),
).annotate({
  identifier: "CodeSigningPolicies",
}) as any as S.Schema<CodeSigningPolicies>;
export interface CreateCodeSigningConfigRequest {
  Description?: string;
  AllowedPublishers: AllowedPublishers;
  CodeSigningPolicies?: CodeSigningPolicies;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    AllowedPublishers: AllowedPublishers,
    CodeSigningPolicies: S.optional(CodeSigningPolicies),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2020-04-22/code-signing-configs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCodeSigningConfigRequest",
}) as any as S.Schema<CreateCodeSigningConfigRequest>;
export type CodeSigningConfigId = string;
export type CodeSigningConfigArn = string;
export interface CodeSigningConfig {
  CodeSigningConfigId: string;
  CodeSigningConfigArn: string;
  Description?: string;
  AllowedPublishers: AllowedPublishers;
  CodeSigningPolicies: CodeSigningPolicies;
  LastModified: string;
}
export const CodeSigningConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeSigningConfigId: S.String,
    CodeSigningConfigArn: S.String,
    Description: S.optional(S.String),
    AllowedPublishers: AllowedPublishers,
    CodeSigningPolicies: CodeSigningPolicies,
    LastModified: S.String,
  }),
).annotate({
  identifier: "CodeSigningConfig",
}) as any as S.Schema<CodeSigningConfig>;
export interface CreateCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export const CreateCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeSigningConfig: CodeSigningConfig }),
).annotate({
  identifier: "CreateCodeSigningConfigResponse",
}) as any as S.Schema<CreateCodeSigningConfigResponse>;
export type Enabled = boolean;
export type BatchSize = number;
export type Pattern = string;
export interface Filter {
  Pattern?: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pattern: S.optional(S.String) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface FilterCriteria {
  Filters?: Filter[];
}
export const FilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Filters: S.optional(FilterList) }),
).annotate({ identifier: "FilterCriteria" }) as any as S.Schema<FilterCriteria>;
export type EventSourceMappingMetric =
  | "EventCount"
  | "ErrorCount"
  | "KafkaMetrics"
  | (string & {});
export const EventSourceMappingMetric = S.String;

export type EventSourceMappingMetricList = EventSourceMappingMetric[];
export const EventSourceMappingMetricList = /*@__PURE__*/ S.Array(
  EventSourceMappingMetric,
);
export interface EventSourceMappingMetricsConfig {
  Metrics?: EventSourceMappingMetric[];
}
export const EventSourceMappingMetricsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Metrics: S.optional(EventSourceMappingMetricList) }),
).annotate({
  identifier: "EventSourceMappingMetricsConfig",
}) as any as S.Schema<EventSourceMappingMetricsConfig>;
export type EventSourceMappingSystemLogLevel =
  | "DEBUG"
  | "INFO"
  | "WARN"
  | (string & {});
export const EventSourceMappingSystemLogLevel = S.String;

export interface EventSourceMappingLoggingConfig {
  SystemLogLevel?: EventSourceMappingSystemLogLevel;
}
export const EventSourceMappingLoggingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SystemLogLevel: S.optional(EventSourceMappingSystemLogLevel) }),
).annotate({
  identifier: "EventSourceMappingLoggingConfig",
}) as any as S.Schema<EventSourceMappingLoggingConfig>;
export type MaximumConcurrency = number;
export interface ScalingConfig {
  MaximumConcurrency?: number;
}
export const ScalingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaximumConcurrency: S.optional(S.Number) }),
).annotate({ identifier: "ScalingConfig" }) as any as S.Schema<ScalingConfig>;
export type MaximumBatchingWindowInSeconds = number;
export type ParallelizationFactor = number;
export type EventSourcePosition =
  | "TRIM_HORIZON"
  | "LATEST"
  | "AT_TIMESTAMP"
  | (string & {});
export const EventSourcePosition = S.String;

export type DestinationArn = string;
export interface OnSuccess {
  Destination?: string;
}
export const OnSuccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Destination: S.optional(S.String) }),
).annotate({ identifier: "OnSuccess" }) as any as S.Schema<OnSuccess>;
export interface OnFailure {
  Destination?: string;
}
export const OnFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Destination: S.optional(S.String) }),
).annotate({ identifier: "OnFailure" }) as any as S.Schema<OnFailure>;
export interface DestinationConfig {
  OnSuccess?: OnSuccess;
  OnFailure?: OnFailure;
}
export const DestinationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OnSuccess: S.optional(OnSuccess),
    OnFailure: S.optional(OnFailure),
  }),
).annotate({
  identifier: "DestinationConfig",
}) as any as S.Schema<DestinationConfig>;
export type MaximumRecordAgeInSeconds = number;
export type BisectBatchOnFunctionError = boolean;
export type MaximumRetryAttemptsEventSourceMapping = number;
export type TumblingWindowInSeconds = number;
export type Topic = string;
export type Topics = string[];
export const Topics = /*@__PURE__*/ S.Array(S.String);
export type Queue = string;
export type Queues = string[];
export const Queues = /*@__PURE__*/ S.Array(S.String);
export type SourceAccessType =
  | "BASIC_AUTH"
  | "VPC_SUBNET"
  | "VPC_SECURITY_GROUP"
  | "SASL_SCRAM_512_AUTH"
  | "SASL_SCRAM_256_AUTH"
  | "VIRTUAL_HOST"
  | "CLIENT_CERTIFICATE_TLS_AUTH"
  | "SERVER_ROOT_CA_CERTIFICATE"
  | (string & {});
export const SourceAccessType = S.String;

export type URI = string;
export interface SourceAccessConfiguration {
  Type?: SourceAccessType;
  URI?: string;
}
export const SourceAccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(SourceAccessType), URI: S.optional(S.String) }),
).annotate({
  identifier: "SourceAccessConfiguration",
}) as any as S.Schema<SourceAccessConfiguration>;
export type SourceAccessConfigurations = SourceAccessConfiguration[];
export const SourceAccessConfigurations = /*@__PURE__*/ S.Array(
  SourceAccessConfiguration,
);
export type EndPointType = "KAFKA_BOOTSTRAP_SERVERS" | (string & {});
export const EndPointType = S.String;

export type Endpoint = string;
export type EndpointLists = string[];
export const EndpointLists = /*@__PURE__*/ S.Array(S.String);
export type Endpoints = { [key in EndPointType]?: string[] };
export const Endpoints = /*@__PURE__*/ S.Record(
  EndPointType,
  EndpointLists.pipe(S.optional),
);
export interface SelfManagedEventSource {
  Endpoints?: { [key: string]: string[] | undefined };
}
export const SelfManagedEventSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoints: S.optional(Endpoints) }),
).annotate({
  identifier: "SelfManagedEventSource",
}) as any as S.Schema<SelfManagedEventSource>;
export type FunctionResponseType = "ReportBatchItemFailures" | (string & {});
export const FunctionResponseType = S.String;

export type FunctionResponseTypeList = FunctionResponseType[];
export const FunctionResponseTypeList =
  /*@__PURE__*/ S.Array(FunctionResponseType);
export type SchemaRegistryUri = string;
export type SchemaRegistryEventRecordFormat = "JSON" | "SOURCE" | (string & {});
export const SchemaRegistryEventRecordFormat = S.String;

export type KafkaSchemaRegistryAuthType =
  | "BASIC_AUTH"
  | "CLIENT_CERTIFICATE_TLS_AUTH"
  | "SERVER_ROOT_CA_CERTIFICATE"
  | (string & {});
export const KafkaSchemaRegistryAuthType = S.String;

export interface KafkaSchemaRegistryAccessConfig {
  Type?: KafkaSchemaRegistryAuthType;
  URI?: string;
}
export const KafkaSchemaRegistryAccessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(KafkaSchemaRegistryAuthType),
    URI: S.optional(S.String),
  }),
).annotate({
  identifier: "KafkaSchemaRegistryAccessConfig",
}) as any as S.Schema<KafkaSchemaRegistryAccessConfig>;
export type KafkaSchemaRegistryAccessConfigList =
  KafkaSchemaRegistryAccessConfig[];
export const KafkaSchemaRegistryAccessConfigList = /*@__PURE__*/ S.Array(
  KafkaSchemaRegistryAccessConfig,
);
export type KafkaSchemaValidationAttribute = "KEY" | "VALUE" | (string & {});
export const KafkaSchemaValidationAttribute = S.String;

export interface KafkaSchemaValidationConfig {
  Attribute?: KafkaSchemaValidationAttribute;
}
export const KafkaSchemaValidationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attribute: S.optional(KafkaSchemaValidationAttribute) }),
).annotate({
  identifier: "KafkaSchemaValidationConfig",
}) as any as S.Schema<KafkaSchemaValidationConfig>;
export type KafkaSchemaValidationConfigList = KafkaSchemaValidationConfig[];
export const KafkaSchemaValidationConfigList = /*@__PURE__*/ S.Array(
  KafkaSchemaValidationConfig,
);
export interface KafkaSchemaRegistryConfig {
  SchemaRegistryURI?: string;
  EventRecordFormat?: SchemaRegistryEventRecordFormat;
  AccessConfigs?: KafkaSchemaRegistryAccessConfig[];
  SchemaValidationConfigs?: KafkaSchemaValidationConfig[];
}
export const KafkaSchemaRegistryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaRegistryURI: S.optional(S.String),
    EventRecordFormat: S.optional(SchemaRegistryEventRecordFormat),
    AccessConfigs: S.optional(KafkaSchemaRegistryAccessConfigList),
    SchemaValidationConfigs: S.optional(KafkaSchemaValidationConfigList),
  }),
).annotate({
  identifier: "KafkaSchemaRegistryConfig",
}) as any as S.Schema<KafkaSchemaRegistryConfig>;
export interface AmazonManagedKafkaEventSourceConfig {
  ConsumerGroupId?: string;
  SchemaRegistryConfig?: KafkaSchemaRegistryConfig;
}
export const AmazonManagedKafkaEventSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsumerGroupId: S.optional(S.String),
    SchemaRegistryConfig: S.optional(KafkaSchemaRegistryConfig),
  }),
).annotate({
  identifier: "AmazonManagedKafkaEventSourceConfig",
}) as any as S.Schema<AmazonManagedKafkaEventSourceConfig>;
export interface SelfManagedKafkaEventSourceConfig {
  ConsumerGroupId?: string;
  SchemaRegistryConfig?: KafkaSchemaRegistryConfig;
}
export const SelfManagedKafkaEventSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConsumerGroupId: S.optional(S.String),
    SchemaRegistryConfig: S.optional(KafkaSchemaRegistryConfig),
  }),
).annotate({
  identifier: "SelfManagedKafkaEventSourceConfig",
}) as any as S.Schema<SelfManagedKafkaEventSourceConfig>;
export type DatabaseName = string;
export type CollectionName = string;
export type FullDocument = "UpdateLookup" | "Default" | (string & {});
export const FullDocument = S.String;

export interface DocumentDBEventSourceConfig {
  DatabaseName?: string;
  CollectionName?: string;
  FullDocument?: FullDocument;
}
export const DocumentDBEventSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    CollectionName: S.optional(S.String),
    FullDocument: S.optional(FullDocument),
  }),
).annotate({
  identifier: "DocumentDBEventSourceConfig",
}) as any as S.Schema<DocumentDBEventSourceConfig>;
export type MinimumNumberOfPollers = number;
export type MaximumNumberOfPollers = number;
export type ProvisionedPollerGroupName = string;
export interface ProvisionedPollerConfig {
  MinimumPollers?: number;
  MaximumPollers?: number;
  PollerGroupName?: string;
}
export const ProvisionedPollerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumPollers: S.optional(S.Number),
    MaximumPollers: S.optional(S.Number),
    PollerGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "ProvisionedPollerConfig",
}) as any as S.Schema<ProvisionedPollerConfig>;
export interface CreateEventSourceMappingRequest {
  EventSourceArn?: string;
  FunctionName: string;
  Enabled?: boolean;
  BatchSize?: number;
  FilterCriteria?: FilterCriteria;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  StartingPosition?: EventSourcePosition;
  StartingPositionTimestamp?: Date;
  DestinationConfig?: DestinationConfig;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  Tags?: { [key: string]: string | undefined };
  TumblingWindowInSeconds?: number;
  Topics?: string[];
  Queues?: string[];
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  SelfManagedEventSource?: SelfManagedEventSource;
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export const CreateEventSourceMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventSourceArn: S.optional(S.String),
    FunctionName: S.String,
    Enabled: S.optional(S.Boolean),
    BatchSize: S.optional(S.Number),
    FilterCriteria: S.optional(FilterCriteria),
    KMSKeyArn: S.optional(S.String),
    MetricsConfig: S.optional(EventSourceMappingMetricsConfig),
    LoggingConfig: S.optional(EventSourceMappingLoggingConfig),
    ScalingConfig: S.optional(ScalingConfig),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
    ParallelizationFactor: S.optional(S.Number),
    StartingPosition: S.optional(EventSourcePosition),
    StartingPositionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DestinationConfig: S.optional(DestinationConfig),
    MaximumRecordAgeInSeconds: S.optional(S.Number),
    BisectBatchOnFunctionError: S.optional(S.Boolean),
    MaximumRetryAttempts: S.optional(S.Number),
    Tags: S.optional(Tags),
    TumblingWindowInSeconds: S.optional(S.Number),
    Topics: S.optional(Topics),
    Queues: S.optional(Queues),
    SourceAccessConfigurations: S.optional(SourceAccessConfigurations),
    SelfManagedEventSource: S.optional(SelfManagedEventSource),
    FunctionResponseTypes: S.optional(FunctionResponseTypeList),
    AmazonManagedKafkaEventSourceConfig: S.optional(
      AmazonManagedKafkaEventSourceConfig,
    ),
    SelfManagedKafkaEventSourceConfig: S.optional(
      SelfManagedKafkaEventSourceConfig,
    ),
    DocumentDBEventSourceConfig: S.optional(DocumentDBEventSourceConfig),
    ProvisionedPollerConfig: S.optional(ProvisionedPollerConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-03-31/event-source-mappings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventSourceMappingRequest",
}) as any as S.Schema<CreateEventSourceMappingRequest>;
export type UUIDString = string;
export type FilterCriteriaErrorCode = string;
export type FilterCriteriaErrorMessage = string;
export interface FilterCriteriaError {
  ErrorCode?: string;
  Message?: string;
}
export const FilterCriteriaError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "FilterCriteriaError",
}) as any as S.Schema<FilterCriteriaError>;
export type EventSourceMappingArn = string;
export interface EventSourceMappingConfiguration {
  UUID?: string;
  StartingPosition?: EventSourcePosition;
  StartingPositionTimestamp?: Date;
  BatchSize?: number;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  EventSourceArn?: string;
  FilterCriteria?: FilterCriteria;
  FilterCriteriaError?: FilterCriteriaError;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  FunctionArn?: string;
  LastModified?: Date;
  LastProcessingResult?: string;
  State?: string;
  StateTransitionReason?: string;
  DestinationConfig?: DestinationConfig;
  Topics?: string[];
  Queues?: string[];
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  SelfManagedEventSource?: SelfManagedEventSource;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  TumblingWindowInSeconds?: number;
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  EventSourceMappingArn?: string;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export const EventSourceMappingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UUID: S.optional(S.String),
    StartingPosition: S.optional(EventSourcePosition),
    StartingPositionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    BatchSize: S.optional(S.Number),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
    ParallelizationFactor: S.optional(S.Number),
    EventSourceArn: S.optional(S.String),
    FilterCriteria: S.optional(FilterCriteria),
    FilterCriteriaError: S.optional(FilterCriteriaError),
    KMSKeyArn: S.optional(S.String),
    MetricsConfig: S.optional(EventSourceMappingMetricsConfig),
    LoggingConfig: S.optional(EventSourceMappingLoggingConfig),
    ScalingConfig: S.optional(ScalingConfig),
    FunctionArn: S.optional(S.String),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastProcessingResult: S.optional(S.String),
    State: S.optional(S.String),
    StateTransitionReason: S.optional(S.String),
    DestinationConfig: S.optional(DestinationConfig),
    Topics: S.optional(Topics),
    Queues: S.optional(Queues),
    SourceAccessConfigurations: S.optional(SourceAccessConfigurations),
    SelfManagedEventSource: S.optional(SelfManagedEventSource),
    MaximumRecordAgeInSeconds: S.optional(S.Number),
    BisectBatchOnFunctionError: S.optional(S.Boolean),
    MaximumRetryAttempts: S.optional(S.Number),
    TumblingWindowInSeconds: S.optional(S.Number),
    FunctionResponseTypes: S.optional(FunctionResponseTypeList),
    AmazonManagedKafkaEventSourceConfig: S.optional(
      AmazonManagedKafkaEventSourceConfig,
    ),
    SelfManagedKafkaEventSourceConfig: S.optional(
      SelfManagedKafkaEventSourceConfig,
    ),
    DocumentDBEventSourceConfig: S.optional(DocumentDBEventSourceConfig),
    EventSourceMappingArn: S.optional(S.String),
    ProvisionedPollerConfig: S.optional(ProvisionedPollerConfig),
  }),
).annotate({
  identifier: "EventSourceMappingConfiguration",
}) as any as S.Schema<EventSourceMappingConfiguration>;
export type Runtime =
  | "nodejs"
  | "nodejs4.3"
  | "nodejs6.10"
  | "nodejs8.10"
  | "nodejs10.x"
  | "nodejs12.x"
  | "nodejs14.x"
  | "nodejs16.x"
  | "nodejs18.x"
  | "nodejs20.x"
  | "nodejs22.x"
  | "nodejs24.x"
  | "java8"
  | "java8.al2"
  | "java11"
  | "java17"
  | "java21"
  | "java25"
  | "python2.7"
  | "python3.6"
  | "python3.7"
  | "python3.8"
  | "python3.9"
  | "python3.10"
  | "python3.11"
  | "python3.12"
  | "python3.13"
  | "python3.14"
  | "dotnetcore1.0"
  | "dotnetcore2.0"
  | "dotnetcore2.1"
  | "dotnetcore3.1"
  | "dotnet6"
  | "dotnet8"
  | "dotnet10"
  | "nodejs4.3-edge"
  | "go1.x"
  | "ruby2.5"
  | "ruby2.7"
  | "ruby3.2"
  | "ruby3.3"
  | "ruby3.4"
  | "ruby4.0"
  | "provided"
  | "provided.al2"
  | "provided.al2023"
  | "nodejs26.x"
  | "python3.15"
  | "java8.al2023"
  | "java11.al2023"
  | "java17.al2023"
  | (string & {});
export const Runtime = S.String;

export type Handler = string;
export type S3Bucket = string;
export type S3Key = string;
export type S3ObjectVersion = string;
export type S3ObjectStorageMode = "COPY" | "REFERENCE" | (string & {});
export const S3ObjectStorageMode = S.String;

export interface FunctionCode {
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ImageUri?: string;
  SourceKMSKeyArn?: string;
}
export const FunctionCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ZipFile: S.optional(SensitiveBlob),
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3ObjectVersion: S.optional(S.String),
    S3ObjectStorageMode: S.optional(S3ObjectStorageMode),
    ImageUri: S.optional(S.String),
    SourceKMSKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "FunctionCode" }) as any as S.Schema<FunctionCode>;
export type Timeout = number;
export type MemorySize = number;
export type FunctionVersionLatestPublished = "LATEST_PUBLISHED" | (string & {});
export const FunctionVersionLatestPublished = S.String;

export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  Ipv6AllowedForDualStack?: boolean;
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Ipv6AllowedForDualStack: S.optional(S.Boolean),
  }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export type PackageType = "Zip" | "Image" | (string & {});
export const PackageType = S.String;

export type ResourceArn = string;
export interface DeadLetterConfig {
  TargetArn?: string;
}
export const DeadLetterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetArn: S.optional(S.String) }),
).annotate({
  identifier: "DeadLetterConfig",
}) as any as S.Schema<DeadLetterConfig>;
export type EnvironmentVariableName = string | redacted.Redacted<string>;
export type EnvironmentVariableValue = string | redacted.Redacted<string>;
export type EnvironmentVariables = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export const EnvironmentVariables = /*@__PURE__*/ S.Record(
  S.String,
  SensitiveString.pipe(S.optional),
);
export interface Environment {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined };
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Variables: S.optional(EnvironmentVariables) }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export type TracingMode = "Active" | "PassThrough" | (string & {});
export const TracingMode = S.String;

export interface TracingConfig {
  Mode?: TracingMode;
}
export const TracingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: S.optional(TracingMode) }),
).annotate({ identifier: "TracingConfig" }) as any as S.Schema<TracingConfig>;
export type LayerVersionArn = string;
export type LayerList = string[];
export const LayerList = /*@__PURE__*/ S.Array(S.String);
export type FileSystemArn = string;
export type LocalMountPath = string;
export interface FileSystemConfig {
  Arn: string;
  LocalMountPath: string;
}
export const FileSystemConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, LocalMountPath: S.String }),
).annotate({
  identifier: "FileSystemConfig",
}) as any as S.Schema<FileSystemConfig>;
export type FileSystemConfigList = FileSystemConfig[];
export const FileSystemConfigList = /*@__PURE__*/ S.Array(FileSystemConfig);
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type WorkingDirectory = string;
export interface ImageConfig {
  EntryPoint?: string[];
  Command?: string[];
  WorkingDirectory?: string;
}
export const ImageConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntryPoint: S.optional(StringList),
    Command: S.optional(StringList),
    WorkingDirectory: S.optional(S.String),
  }),
).annotate({ identifier: "ImageConfig" }) as any as S.Schema<ImageConfig>;
export type EphemeralStorageSize = number;
export interface EphemeralStorage {
  Size: number;
}
export const EphemeralStorage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Size: S.Number }),
).annotate({
  identifier: "EphemeralStorage",
}) as any as S.Schema<EphemeralStorage>;
export type SnapStartApplyOn = "PublishedVersions" | "None" | (string & {});
export const SnapStartApplyOn = S.String;

export interface SnapStart {
  ApplyOn?: SnapStartApplyOn;
}
export const SnapStart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplyOn: S.optional(SnapStartApplyOn) }),
).annotate({ identifier: "SnapStart" }) as any as S.Schema<SnapStart>;
export type LogFormat = "JSON" | "Text" | (string & {});
export const LogFormat = S.String;

export type ApplicationLogLevel =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export const ApplicationLogLevel = S.String;

export interface LoggingConfig {
  LogFormat?: LogFormat;
  ApplicationLogLevel?: ApplicationLogLevel;
  SystemLogLevel?: SystemLogLevel;
  LogGroup?: string;
}
export const LoggingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogFormat: S.optional(LogFormat),
    ApplicationLogLevel: S.optional(ApplicationLogLevel),
    SystemLogLevel: S.optional(SystemLogLevel),
    LogGroup: S.optional(S.String),
  }),
).annotate({ identifier: "LoggingConfig" }) as any as S.Schema<LoggingConfig>;
export type TenantIsolationMode = "PER_TENANT" | (string & {});
export const TenantIsolationMode = S.String;

export interface TenancyConfig {
  TenantIsolationMode: TenantIsolationMode;
}
export const TenancyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TenantIsolationMode: TenantIsolationMode }),
).annotate({ identifier: "TenancyConfig" }) as any as S.Schema<TenancyConfig>;
export type PerExecutionEnvironmentMaxConcurrency = number;
export type ExecutionEnvironmentMemoryGiBPerVCpu = number;
export interface LambdaManagedInstancesCapacityProviderConfig {
  CapacityProviderArn: string;
  PerExecutionEnvironmentMaxConcurrency?: number;
  ExecutionEnvironmentMemoryGiBPerVCpu?: number;
}
export const LambdaManagedInstancesCapacityProviderConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CapacityProviderArn: S.String,
      PerExecutionEnvironmentMaxConcurrency: S.optional(S.Number),
      ExecutionEnvironmentMemoryGiBPerVCpu: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "LambdaManagedInstancesCapacityProviderConfig",
  }) as any as S.Schema<LambdaManagedInstancesCapacityProviderConfig>;
export interface CapacityProviderConfig {
  LambdaManagedInstancesCapacityProviderConfig: LambdaManagedInstancesCapacityProviderConfig;
}
export const CapacityProviderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaManagedInstancesCapacityProviderConfig:
      LambdaManagedInstancesCapacityProviderConfig,
  }),
).annotate({
  identifier: "CapacityProviderConfig",
}) as any as S.Schema<CapacityProviderConfig>;
export type RetentionPeriodInDays = number;
export type ExecutionTimeout = number;
export interface DurableConfig {
  KMSKeyArn?: string;
  RetentionPeriodInDays?: number;
  ExecutionTimeout?: number;
}
export const DurableConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KMSKeyArn: S.optional(S.String),
    RetentionPeriodInDays: S.optional(S.Number),
    ExecutionTimeout: S.optional(S.Number),
  }),
).annotate({ identifier: "DurableConfig" }) as any as S.Schema<DurableConfig>;
export interface CreateFunctionRequest {
  FunctionName: string;
  Runtime?: Runtime;
  Role: string;
  Handler?: string;
  Code: FunctionCode;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  Publish?: boolean;
  PublishTo?: FunctionVersionLatestPublished;
  VpcConfig?: VpcConfig;
  PackageType?: PackageType;
  DeadLetterConfig?: DeadLetterConfig;
  Environment?: Environment;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfig;
  Tags?: { [key: string]: string | undefined };
  Layers?: string[];
  FileSystemConfigs?: FileSystemConfig[];
  CodeSigningConfigArn?: string;
  ImageConfig?: ImageConfig;
  Architectures?: Architecture[];
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStart;
  LoggingConfig?: LoggingConfig;
  TenancyConfig?: TenancyConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  DurableConfig?: DurableConfig;
}
export const CreateFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String,
    Runtime: S.optional(Runtime),
    Role: S.String,
    Handler: S.optional(S.String),
    Code: FunctionCode,
    Description: S.optional(S.String),
    Timeout: S.optional(S.Number),
    MemorySize: S.optional(S.Number),
    Publish: S.optional(S.Boolean),
    PublishTo: S.optional(FunctionVersionLatestPublished),
    VpcConfig: S.optional(VpcConfig),
    PackageType: S.optional(PackageType),
    DeadLetterConfig: S.optional(DeadLetterConfig),
    Environment: S.optional(Environment),
    KMSKeyArn: S.optional(S.String),
    TracingConfig: S.optional(TracingConfig),
    Tags: S.optional(Tags),
    Layers: S.optional(LayerList),
    FileSystemConfigs: S.optional(FileSystemConfigList),
    CodeSigningConfigArn: S.optional(S.String),
    ImageConfig: S.optional(ImageConfig),
    Architectures: S.optional(ArchitecturesList),
    EphemeralStorage: S.optional(EphemeralStorage),
    SnapStart: S.optional(SnapStart),
    LoggingConfig: S.optional(LoggingConfig),
    TenancyConfig: S.optional(TenancyConfig),
    CapacityProviderConfig: S.optional(CapacityProviderConfig),
    DurableConfig: S.optional(DurableConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2015-03-31/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFunctionRequest",
}) as any as S.Schema<CreateFunctionRequest>;
export type NameSpacedFunctionArn = string;
export type VpcId = string;
export interface VpcConfigResponse {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
  VpcId?: string;
  Ipv6AllowedForDualStack?: boolean;
}
export const VpcConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    VpcId: S.optional(S.String),
    Ipv6AllowedForDualStack: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "VpcConfigResponse",
}) as any as S.Schema<VpcConfigResponse>;
export type SensitiveString = string | redacted.Redacted<string>;
export interface EnvironmentError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export const EnvironmentError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    Message: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EnvironmentError",
}) as any as S.Schema<EnvironmentError>;
export interface EnvironmentResponse {
  Variables?: { [key: string]: string | redacted.Redacted<string> | undefined };
  Error?: EnvironmentError;
}
export const EnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Variables: S.optional(EnvironmentVariables),
    Error: S.optional(EnvironmentError),
  }),
).annotate({
  identifier: "EnvironmentResponse",
}) as any as S.Schema<EnvironmentResponse>;
export interface TracingConfigResponse {
  Mode?: TracingMode;
}
export const TracingConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: S.optional(TracingMode) }),
).annotate({
  identifier: "TracingConfigResponse",
}) as any as S.Schema<TracingConfigResponse>;
export interface Layer {
  Arn?: string;
  CodeSize?: number;
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
}
export const Layer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CodeSize: S.optional(S.Number),
    SigningProfileVersionArn: S.optional(S.String),
    SigningJobArn: S.optional(S.String),
  }),
).annotate({ identifier: "Layer" }) as any as S.Schema<Layer>;
export type LayersReferenceList = Layer[];
export const LayersReferenceList = /*@__PURE__*/ S.Array(Layer);
export type State =
  | "Pending"
  | "Active"
  | "Inactive"
  | "Failed"
  | "Deactivating"
  | "Deactivated"
  | "ActiveNonInvocable"
  | "Deleting"
  | (string & {});
export const State = S.String;

export type StateReason = string;
export type StateReasonCode =
  | "Idle"
  | "Creating"
  | "Restoring"
  | "EniLimitExceeded"
  | "InsufficientRolePermissions"
  | "InvalidConfiguration"
  | "InternalError"
  | "SubnetOutOfIPAddresses"
  | "InvalidSubnet"
  | "InvalidSecurityGroup"
  | "ImageDeleted"
  | "ImageAccessDenied"
  | "InvalidImage"
  | "KMSKeyAccessDenied"
  | "KMSKeyNotFound"
  | "InvalidStateKMSKey"
  | "DisabledKMSKey"
  | "EFSIOError"
  | "EFSMountConnectivityError"
  | "EFSMountFailure"
  | "EFSMountTimeout"
  | "InvalidRuntime"
  | "InvalidZipFileException"
  | "FunctionError"
  | "ServiceQuotaExceededException"
  | "VcpuLimitExceeded"
  | "CapacityProviderScalingLimitExceeded"
  | "InsufficientCapacity"
  | "EC2RequestLimitExceeded"
  | "FunctionError.InitTimeout"
  | "FunctionError.RuntimeInitError"
  | "FunctionError.ExtensionInitError"
  | "FunctionError.InvalidEntryPoint"
  | "FunctionError.InvalidWorkingDirectory"
  | "FunctionError.PermissionDenied"
  | "FunctionError.TooManyExtensions"
  | "FunctionError.InitResourceExhausted"
  | "DisallowedByVpcEncryptionControl"
  | "DrainingDurableExecutions"
  | "DependencyError"
  | (string & {});
export const StateReasonCode = S.String;

export type LastUpdateStatus =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export const LastUpdateStatus = S.String;

export type LastUpdateStatusReason = string;
export type LastUpdateStatusReasonCode =
  | "EniLimitExceeded"
  | "InsufficientRolePermissions"
  | "InvalidConfiguration"
  | "InternalError"
  | "SubnetOutOfIPAddresses"
  | "InvalidSubnet"
  | "InvalidSecurityGroup"
  | "ImageDeleted"
  | "ImageAccessDenied"
  | "InvalidImage"
  | "KMSKeyAccessDenied"
  | "KMSKeyNotFound"
  | "InvalidStateKMSKey"
  | "DisabledKMSKey"
  | "EFSIOError"
  | "EFSMountConnectivityError"
  | "EFSMountFailure"
  | "EFSMountTimeout"
  | "InvalidRuntime"
  | "InvalidZipFileException"
  | "FunctionError"
  | "ServiceQuotaExceededException"
  | "VcpuLimitExceeded"
  | "CapacityProviderScalingLimitExceeded"
  | "InsufficientCapacity"
  | "EC2RequestLimitExceeded"
  | "FunctionError.InitTimeout"
  | "FunctionError.RuntimeInitError"
  | "FunctionError.ExtensionInitError"
  | "FunctionError.InvalidEntryPoint"
  | "FunctionError.InvalidWorkingDirectory"
  | "FunctionError.PermissionDenied"
  | "FunctionError.TooManyExtensions"
  | "FunctionError.InitResourceExhausted"
  | "DisallowedByVpcEncryptionControl"
  | "DependencyError"
  | "Creating"
  | (string & {});
export const LastUpdateStatusReasonCode = S.String;

export interface ImageConfigError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export const ImageConfigError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    Message: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ImageConfigError",
}) as any as S.Schema<ImageConfigError>;
export interface ImageConfigResponse {
  ImageConfig?: ImageConfig;
  Error?: ImageConfigError;
}
export const ImageConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageConfig: S.optional(ImageConfig),
    Error: S.optional(ImageConfigError),
  }),
).annotate({
  identifier: "ImageConfigResponse",
}) as any as S.Schema<ImageConfigResponse>;
export type SnapStartOptimizationStatus = "On" | "Off" | (string & {});
export const SnapStartOptimizationStatus = S.String;

export interface SnapStartResponse {
  ApplyOn?: SnapStartApplyOn;
  OptimizationStatus?: SnapStartOptimizationStatus;
}
export const SnapStartResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplyOn: S.optional(SnapStartApplyOn),
    OptimizationStatus: S.optional(SnapStartOptimizationStatus),
  }),
).annotate({
  identifier: "SnapStartResponse",
}) as any as S.Schema<SnapStartResponse>;
export type RuntimeVersionArn = string;
export interface RuntimeVersionError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export const RuntimeVersionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    Message: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RuntimeVersionError",
}) as any as S.Schema<RuntimeVersionError>;
export interface RuntimeVersionConfig {
  RuntimeVersionArn?: string;
  Error?: RuntimeVersionError;
}
export const RuntimeVersionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuntimeVersionArn: S.optional(S.String),
    Error: S.optional(RuntimeVersionError),
  }),
).annotate({
  identifier: "RuntimeVersionConfig",
}) as any as S.Schema<RuntimeVersionConfig>;
export interface FunctionConfiguration {
  FunctionName?: string;
  FunctionArn?: string;
  Runtime?: Runtime;
  Role?: string;
  Handler?: string;
  CodeSize?: number;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  LastModified?: string;
  CodeSha256?: string;
  Version?: string;
  VpcConfig?: VpcConfigResponse;
  DeadLetterConfig?: DeadLetterConfig;
  Environment?: EnvironmentResponse;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfigResponse;
  MasterArn?: string;
  RevisionId?: string;
  Layers?: Layer[];
  State?: State;
  StateReason?: string;
  StateReasonCode?: StateReasonCode;
  LastUpdateStatus?: LastUpdateStatus;
  LastUpdateStatusReason?: string;
  LastUpdateStatusReasonCode?: LastUpdateStatusReasonCode;
  FileSystemConfigs?: FileSystemConfig[];
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
  PackageType?: PackageType;
  ImageConfigResponse?: ImageConfigResponse;
  Architectures?: Architecture[];
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStartResponse;
  RuntimeVersionConfig?: RuntimeVersionConfig;
  LoggingConfig?: LoggingConfig;
  TenancyConfig?: TenancyConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  ConfigSha256?: string;
  DurableConfig?: DurableConfig;
}
export const FunctionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.optional(S.String),
    FunctionArn: S.optional(S.String),
    Runtime: S.optional(Runtime),
    Role: S.optional(S.String),
    Handler: S.optional(S.String),
    CodeSize: S.optional(S.Number),
    Description: S.optional(S.String),
    Timeout: S.optional(S.Number),
    MemorySize: S.optional(S.Number),
    LastModified: S.optional(S.String),
    CodeSha256: S.optional(S.String),
    Version: S.optional(S.String),
    VpcConfig: S.optional(VpcConfigResponse),
    DeadLetterConfig: S.optional(DeadLetterConfig),
    Environment: S.optional(EnvironmentResponse),
    KMSKeyArn: S.optional(S.String),
    TracingConfig: S.optional(TracingConfigResponse),
    MasterArn: S.optional(S.String),
    RevisionId: S.optional(S.String),
    Layers: S.optional(LayersReferenceList),
    State: S.optional(State),
    StateReason: S.optional(S.String),
    StateReasonCode: S.optional(StateReasonCode),
    LastUpdateStatus: S.optional(LastUpdateStatus),
    LastUpdateStatusReason: S.optional(S.String),
    LastUpdateStatusReasonCode: S.optional(LastUpdateStatusReasonCode),
    FileSystemConfigs: S.optional(FileSystemConfigList),
    SigningProfileVersionArn: S.optional(S.String),
    SigningJobArn: S.optional(S.String),
    PackageType: S.optional(PackageType),
    ImageConfigResponse: S.optional(ImageConfigResponse),
    Architectures: S.optional(ArchitecturesList),
    EphemeralStorage: S.optional(EphemeralStorage),
    SnapStart: S.optional(SnapStartResponse),
    RuntimeVersionConfig: S.optional(RuntimeVersionConfig),
    LoggingConfig: S.optional(LoggingConfig),
    TenancyConfig: S.optional(TenancyConfig),
    CapacityProviderConfig: S.optional(CapacityProviderConfig),
    ConfigSha256: S.optional(S.String),
    DurableConfig: S.optional(DurableConfig),
  }),
).annotate({
  identifier: "FunctionConfiguration",
}) as any as S.Schema<FunctionConfiguration>;
export type FunctionUrlFunctionName = string;
export type FunctionUrlQualifier = string;
export type AllowCredentials = boolean;
export type Header = string;
export type HeadersList = string[];
export const HeadersList = /*@__PURE__*/ S.Array(S.String);
export type Method = string;
export type AllowMethodsList = string[];
export const AllowMethodsList = /*@__PURE__*/ S.Array(S.String);
export type Origin = string;
export type AllowOriginsList = string[];
export const AllowOriginsList = /*@__PURE__*/ S.Array(S.String);
export type MaxAge = number;
export interface Cors {
  AllowCredentials?: boolean;
  AllowHeaders?: string[];
  AllowMethods?: string[];
  AllowOrigins?: string[];
  ExposeHeaders?: string[];
  MaxAge?: number;
}
export const Cors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowCredentials: S.optional(S.Boolean),
    AllowHeaders: S.optional(HeadersList),
    AllowMethods: S.optional(AllowMethodsList),
    AllowOrigins: S.optional(AllowOriginsList),
    ExposeHeaders: S.optional(HeadersList),
    MaxAge: S.optional(S.Number),
  }),
).annotate({ identifier: "Cors" }) as any as S.Schema<Cors>;
export type InvokeMode = "BUFFERED" | "RESPONSE_STREAM" | (string & {});
export const InvokeMode = S.String;

export interface CreateFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  InvokeMode?: InvokeMode;
}
export const CreateFunctionUrlConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    AuthType: FunctionUrlAuthType,
    Cors: S.optional(Cors),
    InvokeMode: S.optional(InvokeMode),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2021-10-31/functions/{FunctionName}/url",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFunctionUrlConfigRequest",
}) as any as S.Schema<CreateFunctionUrlConfigRequest>;
export type FunctionUrl = string;
export interface CreateFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  InvokeMode?: InvokeMode;
}
export const CreateFunctionUrlConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionUrl: S.String,
    FunctionArn: S.String,
    AuthType: FunctionUrlAuthType,
    Cors: S.optional(Cors),
    CreationTime: S.String,
    InvokeMode: S.optional(InvokeMode),
  }),
).annotate({
  identifier: "CreateFunctionUrlConfigResponse",
}) as any as S.Schema<CreateFunctionUrlConfigResponse>;
export interface DeleteAliasRequest {
  FunctionName: string;
  Name: string;
}
export const DeleteAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-03-31/functions/{FunctionName}/aliases/{Name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAliasRequest",
}) as any as S.Schema<DeleteAliasRequest>;
export interface DeleteAliasResponse {}
export const DeleteAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAliasResponse",
}) as any as S.Schema<DeleteAliasResponse>;
export interface DeleteCapacityProviderRequest {
  CapacityProviderName: string;
}
export const DeleteCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2025-11-30/capacity-providers/{CapacityProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCapacityProviderRequest",
}) as any as S.Schema<DeleteCapacityProviderRequest>;
export interface DeleteCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export const DeleteCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityProvider: CapacityProvider }),
).annotate({
  identifier: "DeleteCapacityProviderResponse",
}) as any as S.Schema<DeleteCapacityProviderResponse>;
export interface DeleteCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
}
export const DeleteCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCodeSigningConfigRequest",
}) as any as S.Schema<DeleteCodeSigningConfigRequest>;
export interface DeleteCodeSigningConfigResponse {}
export const DeleteCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCodeSigningConfigResponse",
}) as any as S.Schema<DeleteCodeSigningConfigResponse>;
export interface DeleteEventSourceMappingRequest {
  UUID: string;
}
export const DeleteEventSourceMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UUID: S.String.pipe(T.HttpLabel("UUID")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-03-31/event-source-mappings/{UUID}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventSourceMappingRequest",
}) as any as S.Schema<DeleteEventSourceMappingRequest>;
export interface DeleteFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const DeleteFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2015-03-31/functions/{FunctionName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFunctionRequest",
}) as any as S.Schema<DeleteFunctionRequest>;
export interface DeleteFunctionResponse {
  StatusCode?: number;
}
export const DeleteFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
).annotate({
  identifier: "DeleteFunctionResponse",
}) as any as S.Schema<DeleteFunctionResponse>;
export interface DeleteFunctionCodeSigningConfigRequest {
  FunctionName: string;
}
export const DeleteFunctionCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/2020-06-30/functions/{FunctionName}/code-signing-config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteFunctionCodeSigningConfigRequest",
}) as any as S.Schema<DeleteFunctionCodeSigningConfigRequest>;
export interface DeleteFunctionCodeSigningConfigResponse {}
export const DeleteFunctionCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteFunctionCodeSigningConfigResponse",
}) as any as S.Schema<DeleteFunctionCodeSigningConfigResponse>;
export interface DeleteFunctionConcurrencyRequest {
  FunctionName: string;
}
export const DeleteFunctionConcurrencyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2017-10-31/functions/{FunctionName}/concurrency",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFunctionConcurrencyRequest",
}) as any as S.Schema<DeleteFunctionConcurrencyRequest>;
export interface DeleteFunctionConcurrencyResponse {}
export const DeleteFunctionConcurrencyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFunctionConcurrencyResponse",
}) as any as S.Schema<DeleteFunctionConcurrencyResponse>;
export interface DeleteFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const DeleteFunctionEventInvokeConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteFunctionEventInvokeConfigRequest",
}) as any as S.Schema<DeleteFunctionEventInvokeConfigRequest>;
export interface DeleteFunctionEventInvokeConfigResponse {}
export const DeleteFunctionEventInvokeConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteFunctionEventInvokeConfigResponse",
}) as any as S.Schema<DeleteFunctionEventInvokeConfigResponse>;
export interface DeleteFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const DeleteFunctionUrlConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2021-10-31/functions/{FunctionName}/url",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFunctionUrlConfigRequest",
}) as any as S.Schema<DeleteFunctionUrlConfigRequest>;
export interface DeleteFunctionUrlConfigResponse {}
export const DeleteFunctionUrlConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFunctionUrlConfigResponse",
}) as any as S.Schema<DeleteFunctionUrlConfigResponse>;
export interface DeleteLayerVersionRequest {
  LayerName: string;
  VersionNumber: number;
}
export const DeleteLayerVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLayerVersionRequest",
}) as any as S.Schema<DeleteLayerVersionRequest>;
export interface DeleteLayerVersionResponse {}
export const DeleteLayerVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLayerVersionResponse",
}) as any as S.Schema<DeleteLayerVersionResponse>;
export type Qualifier = string;
export interface DeleteProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export const DeleteProvisionedConcurrencyConfigRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteProvisionedConcurrencyConfigRequest",
  }) as any as S.Schema<DeleteProvisionedConcurrencyConfigRequest>;
export interface DeleteProvisionedConcurrencyConfigResponse {}
export const DeleteProvisionedConcurrencyConfigResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteProvisionedConcurrencyConfigResponse",
  }) as any as S.Schema<DeleteProvisionedConcurrencyConfigResponse>;
export type PolicyResourceArn = string;
export type RevisionId = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  RevisionId?: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2026-07-09/resource-policy/{ResourceArn}",
      }),
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
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface GetAccountSettingsRequest {}
export const GetAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2016-08-19/account-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountSettingsRequest",
}) as any as S.Schema<GetAccountSettingsRequest>;
export type UnreservedConcurrentExecutions = number;
export interface AccountLimit {
  TotalCodeSize?: number;
  CodeSizeUnzipped?: number;
  CodeSizeZipped?: number;
  ConcurrentExecutions?: number;
  UnreservedConcurrentExecutions?: number;
}
export const AccountLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalCodeSize: S.optional(S.Number),
    CodeSizeUnzipped: S.optional(S.Number),
    CodeSizeZipped: S.optional(S.Number),
    ConcurrentExecutions: S.optional(S.Number),
    UnreservedConcurrentExecutions: S.optional(S.Number),
  }),
).annotate({ identifier: "AccountLimit" }) as any as S.Schema<AccountLimit>;
export interface AccountUsage {
  TotalCodeSize?: number;
  FunctionCount?: number;
}
export const AccountUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalCodeSize: S.optional(S.Number),
    FunctionCount: S.optional(S.Number),
  }),
).annotate({ identifier: "AccountUsage" }) as any as S.Schema<AccountUsage>;
export interface GetAccountSettingsResponse {
  AccountLimit?: AccountLimit;
  AccountUsage?: AccountUsage;
}
export const GetAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountLimit: S.optional(AccountLimit),
    AccountUsage: S.optional(AccountUsage),
  }),
).annotate({
  identifier: "GetAccountSettingsResponse",
}) as any as S.Schema<GetAccountSettingsResponse>;
export interface GetAliasRequest {
  FunctionName: string;
  Name: string;
}
export const GetAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Name: S.String.pipe(T.HttpLabel("Name")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-03-31/functions/{FunctionName}/aliases/{Name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAliasRequest",
}) as any as S.Schema<GetAliasRequest>;
export interface GetCapacityProviderRequest {
  CapacityProviderName: string;
}
export const GetCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-11-30/capacity-providers/{CapacityProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCapacityProviderRequest",
}) as any as S.Schema<GetCapacityProviderRequest>;
export interface GetCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export const GetCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityProvider: CapacityProvider }),
).annotate({
  identifier: "GetCapacityProviderResponse",
}) as any as S.Schema<GetCapacityProviderResponse>;
export interface GetCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
}
export const GetCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCodeSigningConfigRequest",
}) as any as S.Schema<GetCodeSigningConfigRequest>;
export interface GetCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export const GetCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeSigningConfig: CodeSigningConfig }),
).annotate({
  identifier: "GetCodeSigningConfigResponse",
}) as any as S.Schema<GetCodeSigningConfigResponse>;
export type IncludeExecutionData = boolean;
export interface GetDurableExecutionRequest {
  DurableExecutionArn: string;
  IncludeExecutionData?: boolean;
}
export const GetDurableExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
    IncludeExecutionData: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeExecutionData"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-12-01/durable-executions/{DurableExecutionArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDurableExecutionRequest",
}) as any as S.Schema<GetDurableExecutionRequest>;
export type DurableExecutionName = string;
export type OutputPayload = string | redacted.Redacted<string>;
export type ExecutionStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED_OUT"
  | "STOPPED"
  | (string & {});
export const ExecutionStatus = S.String;

export type XAmznTraceId = string;
export interface TraceHeader {
  XAmznTraceId?: string;
}
export const TraceHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XAmznTraceId: S.optional(S.String) }),
).annotate({ identifier: "TraceHeader" }) as any as S.Schema<TraceHeader>;
export type ExecutionDataIncluded = boolean;
export interface GetDurableExecutionResponse {
  DurableExecutionArn: string;
  DurableExecutionName: string;
  FunctionArn: string;
  InputPayload?: string | redacted.Redacted<string>;
  Result?: string | redacted.Redacted<string>;
  Error?: ErrorObject;
  StartTimestamp: Date;
  Status: ExecutionStatus;
  EndTimestamp?: Date;
  Version?: string;
  TraceHeader?: TraceHeader;
  ExecutionDataIncluded?: boolean;
  DurableConfig?: DurableConfig;
}
export const GetDurableExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String,
    DurableExecutionName: S.String,
    FunctionArn: S.String,
    InputPayload: S.optional(SensitiveString),
    Result: S.optional(SensitiveString),
    Error: S.optional(ErrorObject),
    StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: ExecutionStatus,
    EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.String),
    TraceHeader: S.optional(TraceHeader),
    ExecutionDataIncluded: S.optional(S.Boolean),
    DurableConfig: S.optional(DurableConfig),
  }),
).annotate({
  identifier: "GetDurableExecutionResponse",
}) as any as S.Schema<GetDurableExecutionResponse>;
export type ItemCount = number;
export type ReverseOrder = boolean;
export interface GetDurableExecutionHistoryRequest {
  DurableExecutionArn: string;
  IncludeExecutionData?: boolean;
  MaxItems?: number;
  Marker?: string;
  ReverseOrder?: boolean;
}
export const GetDurableExecutionHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
    IncludeExecutionData: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeExecutionData"),
    ),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    ReverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("ReverseOrder")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/history",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDurableExecutionHistoryRequest",
}) as any as S.Schema<GetDurableExecutionHistoryRequest>;
export type EventType =
  | "ExecutionStarted"
  | "ExecutionSucceeded"
  | "ExecutionFailed"
  | "ExecutionTimedOut"
  | "ExecutionStopped"
  | "ContextStarted"
  | "ContextSucceeded"
  | "ContextFailed"
  | "WaitStarted"
  | "WaitSucceeded"
  | "WaitCancelled"
  | "StepStarted"
  | "StepSucceeded"
  | "StepFailed"
  | "ChainedInvokeStarted"
  | "ChainedInvokeSucceeded"
  | "ChainedInvokeFailed"
  | "ChainedInvokeTimedOut"
  | "ChainedInvokeStopped"
  | "CallbackStarted"
  | "CallbackSucceeded"
  | "CallbackFailed"
  | "CallbackTimedOut"
  | "InvocationCompleted"
  | (string & {});
export const EventType = S.String;

export type EventId = number;
export type Truncated = boolean;
export interface EventInput {
  Payload?: string | redacted.Redacted<string>;
  Truncated?: boolean;
}
export const EventInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Payload: S.optional(SensitiveString),
    Truncated: S.optional(S.Boolean),
  }),
).annotate({ identifier: "EventInput" }) as any as S.Schema<EventInput>;
export interface ExecutionStartedDetails {
  Input: EventInput;
  ExecutionTimeout: number;
}
export const ExecutionStartedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Input: EventInput, ExecutionTimeout: S.Number }),
).annotate({
  identifier: "ExecutionStartedDetails",
}) as any as S.Schema<ExecutionStartedDetails>;
export interface EventResult {
  Payload?: string | redacted.Redacted<string>;
  Truncated?: boolean;
}
export const EventResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Payload: S.optional(SensitiveString),
    Truncated: S.optional(S.Boolean),
  }),
).annotate({ identifier: "EventResult" }) as any as S.Schema<EventResult>;
export interface ExecutionSucceededDetails {
  Result: EventResult;
}
export const ExecutionSucceededDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Result: EventResult }),
).annotate({
  identifier: "ExecutionSucceededDetails",
}) as any as S.Schema<ExecutionSucceededDetails>;
export interface EventError {
  Payload?: ErrorObject;
  Truncated?: boolean;
}
export const EventError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Payload: S.optional(ErrorObject),
    Truncated: S.optional(S.Boolean),
  }),
).annotate({ identifier: "EventError" }) as any as S.Schema<EventError>;
export interface ExecutionFailedDetails {
  Error: EventError;
}
export const ExecutionFailedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "ExecutionFailedDetails",
}) as any as S.Schema<ExecutionFailedDetails>;
export interface ExecutionTimedOutDetails {
  Error?: EventError;
}
export const ExecutionTimedOutDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: S.optional(EventError) }),
).annotate({
  identifier: "ExecutionTimedOutDetails",
}) as any as S.Schema<ExecutionTimedOutDetails>;
export interface ExecutionStoppedDetails {
  Error: EventError;
}
export const ExecutionStoppedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "ExecutionStoppedDetails",
}) as any as S.Schema<ExecutionStoppedDetails>;
export interface ContextStartedDetails {}
export const ContextStartedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ContextStartedDetails",
}) as any as S.Schema<ContextStartedDetails>;
export interface ContextSucceededDetails {
  Result: EventResult;
}
export const ContextSucceededDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Result: EventResult }),
).annotate({
  identifier: "ContextSucceededDetails",
}) as any as S.Schema<ContextSucceededDetails>;
export interface ContextFailedDetails {
  Error: EventError;
}
export const ContextFailedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "ContextFailedDetails",
}) as any as S.Schema<ContextFailedDetails>;
export interface WaitStartedDetails {
  Duration: number;
  ScheduledEndTimestamp: Date;
}
export const WaitStartedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Duration: S.Number,
    ScheduledEndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "WaitStartedDetails",
}) as any as S.Schema<WaitStartedDetails>;
export interface WaitSucceededDetails {
  Duration?: number;
}
export const WaitSucceededDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Duration: S.optional(S.Number) }),
).annotate({
  identifier: "WaitSucceededDetails",
}) as any as S.Schema<WaitSucceededDetails>;
export interface WaitCancelledDetails {
  Error?: EventError;
}
export const WaitCancelledDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: S.optional(EventError) }),
).annotate({
  identifier: "WaitCancelledDetails",
}) as any as S.Schema<WaitCancelledDetails>;
export interface StepStartedDetails {}
export const StepStartedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StepStartedDetails",
}) as any as S.Schema<StepStartedDetails>;
export interface RetryDetails {
  CurrentAttempt?: number;
  NextAttemptDelaySeconds?: number;
}
export const RetryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrentAttempt: S.optional(S.Number),
    NextAttemptDelaySeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "RetryDetails" }) as any as S.Schema<RetryDetails>;
export interface StepSucceededDetails {
  Result: EventResult;
  RetryDetails: RetryDetails;
}
export const StepSucceededDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Result: EventResult, RetryDetails: RetryDetails }),
).annotate({
  identifier: "StepSucceededDetails",
}) as any as S.Schema<StepSucceededDetails>;
export interface StepFailedDetails {
  Error: EventError;
  RetryDetails: RetryDetails;
}
export const StepFailedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError, RetryDetails: RetryDetails }),
).annotate({
  identifier: "StepFailedDetails",
}) as any as S.Schema<StepFailedDetails>;
export interface ChainedInvokeStartedDetails {
  FunctionName: string;
  TenantId?: string;
  Input?: EventInput;
  ExecutedVersion?: string;
  DurableExecutionArn?: string;
}
export const ChainedInvokeStartedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String,
    TenantId: S.optional(S.String),
    Input: S.optional(EventInput),
    ExecutedVersion: S.optional(S.String),
    DurableExecutionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ChainedInvokeStartedDetails",
}) as any as S.Schema<ChainedInvokeStartedDetails>;
export interface ChainedInvokeSucceededDetails {
  Result: EventResult;
}
export const ChainedInvokeSucceededDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Result: EventResult }),
).annotate({
  identifier: "ChainedInvokeSucceededDetails",
}) as any as S.Schema<ChainedInvokeSucceededDetails>;
export interface ChainedInvokeFailedDetails {
  Error: EventError;
}
export const ChainedInvokeFailedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "ChainedInvokeFailedDetails",
}) as any as S.Schema<ChainedInvokeFailedDetails>;
export interface ChainedInvokeTimedOutDetails {
  Error: EventError;
}
export const ChainedInvokeTimedOutDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "ChainedInvokeTimedOutDetails",
}) as any as S.Schema<ChainedInvokeTimedOutDetails>;
export interface ChainedInvokeStoppedDetails {
  Error: EventError;
}
export const ChainedInvokeStoppedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "ChainedInvokeStoppedDetails",
}) as any as S.Schema<ChainedInvokeStoppedDetails>;
export interface CallbackStartedDetails {
  CallbackId: string;
  HeartbeatTimeout?: number;
  Timeout?: number;
}
export const CallbackStartedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallbackId: S.String,
    HeartbeatTimeout: S.optional(S.Number),
    Timeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "CallbackStartedDetails",
}) as any as S.Schema<CallbackStartedDetails>;
export interface CallbackSucceededDetails {
  Result: EventResult;
}
export const CallbackSucceededDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Result: EventResult }),
).annotate({
  identifier: "CallbackSucceededDetails",
}) as any as S.Schema<CallbackSucceededDetails>;
export interface CallbackFailedDetails {
  Error: EventError;
}
export const CallbackFailedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "CallbackFailedDetails",
}) as any as S.Schema<CallbackFailedDetails>;
export interface CallbackTimedOutDetails {
  Error: EventError;
}
export const CallbackTimedOutDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: EventError }),
).annotate({
  identifier: "CallbackTimedOutDetails",
}) as any as S.Schema<CallbackTimedOutDetails>;
export interface InvocationCompletedDetails {
  StartTimestamp: Date;
  EndTimestamp: Date;
  RequestId: string;
  Error?: EventError;
}
export const InvocationCompletedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RequestId: S.String,
    Error: S.optional(EventError),
  }),
).annotate({
  identifier: "InvocationCompletedDetails",
}) as any as S.Schema<InvocationCompletedDetails>;
export interface Event {
  EventType?: EventType;
  SubType?: string;
  EventId?: number;
  Id?: string;
  Name?: string;
  EventTimestamp?: Date;
  ParentId?: string;
  ExecutionStartedDetails?: ExecutionStartedDetails;
  ExecutionSucceededDetails?: ExecutionSucceededDetails;
  ExecutionFailedDetails?: ExecutionFailedDetails;
  ExecutionTimedOutDetails?: ExecutionTimedOutDetails;
  ExecutionStoppedDetails?: ExecutionStoppedDetails;
  ContextStartedDetails?: ContextStartedDetails;
  ContextSucceededDetails?: ContextSucceededDetails;
  ContextFailedDetails?: ContextFailedDetails;
  WaitStartedDetails?: WaitStartedDetails;
  WaitSucceededDetails?: WaitSucceededDetails;
  WaitCancelledDetails?: WaitCancelledDetails;
  StepStartedDetails?: StepStartedDetails;
  StepSucceededDetails?: StepSucceededDetails;
  StepFailedDetails?: StepFailedDetails;
  ChainedInvokeStartedDetails?: ChainedInvokeStartedDetails;
  ChainedInvokeSucceededDetails?: ChainedInvokeSucceededDetails;
  ChainedInvokeFailedDetails?: ChainedInvokeFailedDetails;
  ChainedInvokeTimedOutDetails?: ChainedInvokeTimedOutDetails;
  ChainedInvokeStoppedDetails?: ChainedInvokeStoppedDetails;
  CallbackStartedDetails?: CallbackStartedDetails;
  CallbackSucceededDetails?: CallbackSucceededDetails;
  CallbackFailedDetails?: CallbackFailedDetails;
  CallbackTimedOutDetails?: CallbackTimedOutDetails;
  InvocationCompletedDetails?: InvocationCompletedDetails;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventType: S.optional(EventType),
    SubType: S.optional(S.String),
    EventId: S.optional(S.Number),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    EventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ParentId: S.optional(S.String),
    ExecutionStartedDetails: S.optional(ExecutionStartedDetails),
    ExecutionSucceededDetails: S.optional(ExecutionSucceededDetails),
    ExecutionFailedDetails: S.optional(ExecutionFailedDetails),
    ExecutionTimedOutDetails: S.optional(ExecutionTimedOutDetails),
    ExecutionStoppedDetails: S.optional(ExecutionStoppedDetails),
    ContextStartedDetails: S.optional(ContextStartedDetails),
    ContextSucceededDetails: S.optional(ContextSucceededDetails),
    ContextFailedDetails: S.optional(ContextFailedDetails),
    WaitStartedDetails: S.optional(WaitStartedDetails),
    WaitSucceededDetails: S.optional(WaitSucceededDetails),
    WaitCancelledDetails: S.optional(WaitCancelledDetails),
    StepStartedDetails: S.optional(StepStartedDetails),
    StepSucceededDetails: S.optional(StepSucceededDetails),
    StepFailedDetails: S.optional(StepFailedDetails),
    ChainedInvokeStartedDetails: S.optional(ChainedInvokeStartedDetails),
    ChainedInvokeSucceededDetails: S.optional(ChainedInvokeSucceededDetails),
    ChainedInvokeFailedDetails: S.optional(ChainedInvokeFailedDetails),
    ChainedInvokeTimedOutDetails: S.optional(ChainedInvokeTimedOutDetails),
    ChainedInvokeStoppedDetails: S.optional(ChainedInvokeStoppedDetails),
    CallbackStartedDetails: S.optional(CallbackStartedDetails),
    CallbackSucceededDetails: S.optional(CallbackSucceededDetails),
    CallbackFailedDetails: S.optional(CallbackFailedDetails),
    CallbackTimedOutDetails: S.optional(CallbackTimedOutDetails),
    InvocationCompletedDetails: S.optional(InvocationCompletedDetails),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type Events = Event[];
export const Events = /*@__PURE__*/ S.Array(Event);
export interface GetDurableExecutionHistoryResponse {
  Events: Event[];
  NextMarker?: string;
}
export const GetDurableExecutionHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Events: Events, NextMarker: S.optional(S.String) }),
).annotate({
  identifier: "GetDurableExecutionHistoryResponse",
}) as any as S.Schema<GetDurableExecutionHistoryResponse>;
export interface GetDurableExecutionStateRequest {
  DurableExecutionArn: string;
  CheckpointToken: string;
  Marker?: string;
  MaxItems?: number;
}
export const GetDurableExecutionStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
    CheckpointToken: S.String.pipe(T.HttpQuery("CheckpointToken")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/state",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDurableExecutionStateRequest",
}) as any as S.Schema<GetDurableExecutionStateRequest>;
export interface GetDurableExecutionStateResponse {
  Operations: Operation[];
  NextMarker?: string;
}
export const GetDurableExecutionStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operations: Operations, NextMarker: S.optional(S.String) }),
).annotate({
  identifier: "GetDurableExecutionStateResponse",
}) as any as S.Schema<GetDurableExecutionStateResponse>;
export interface GetEventSourceMappingRequest {
  UUID: string;
}
export const GetEventSourceMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UUID: S.String.pipe(T.HttpLabel("UUID")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-03-31/event-source-mappings/{UUID}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventSourceMappingRequest",
}) as any as S.Schema<GetEventSourceMappingRequest>;
export interface GetFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const GetFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-03-31/functions/{FunctionName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionRequest",
}) as any as S.Schema<GetFunctionRequest>;
export type SensitiveStringOnServerOnly = string;
export interface ResolvedS3Object {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
}
export const ResolvedS3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3ObjectVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolvedS3Object",
}) as any as S.Schema<ResolvedS3Object>;
export interface FunctionCodeLocationError {
  ErrorCode?: string;
  Message?: string | redacted.Redacted<string>;
}
export const FunctionCodeLocationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    Message: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "FunctionCodeLocationError",
}) as any as S.Schema<FunctionCodeLocationError>;
export interface FunctionCodeLocation {
  RepositoryType?: string;
  Location?: string;
  ImageUri?: string;
  ResolvedImageUri?: string;
  ResolvedS3Object?: ResolvedS3Object;
  SourceKMSKeyArn?: string;
  Error?: FunctionCodeLocationError;
}
export const FunctionCodeLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RepositoryType: S.optional(S.String),
    Location: S.optional(S.String),
    ImageUri: S.optional(S.String),
    ResolvedImageUri: S.optional(S.String),
    ResolvedS3Object: S.optional(ResolvedS3Object),
    SourceKMSKeyArn: S.optional(S.String),
    Error: S.optional(FunctionCodeLocationError),
  }),
).annotate({
  identifier: "FunctionCodeLocation",
}) as any as S.Schema<FunctionCodeLocation>;
export type TagsErrorCode = string;
export type TagsErrorMessage = string;
export interface TagsError {
  ErrorCode: string;
  Message: string;
}
export const TagsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ErrorCode: S.String, Message: S.String }),
).annotate({ identifier: "TagsError" }) as any as S.Schema<TagsError>;
export type ReservedConcurrentExecutions = number;
export interface Concurrency {
  ReservedConcurrentExecutions?: number;
}
export const Concurrency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReservedConcurrentExecutions: S.optional(S.Number) }),
).annotate({ identifier: "Concurrency" }) as any as S.Schema<Concurrency>;
export interface GetFunctionResponse {
  Configuration?: FunctionConfiguration;
  Code?: FunctionCodeLocation;
  Tags?: { [key: string]: string | undefined };
  TagsError?: TagsError;
  Concurrency?: Concurrency;
}
export const GetFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Configuration: S.optional(FunctionConfiguration),
    Code: S.optional(FunctionCodeLocation),
    Tags: S.optional(Tags),
    TagsError: S.optional(TagsError),
    Concurrency: S.optional(Concurrency),
  }),
).annotate({
  identifier: "GetFunctionResponse",
}) as any as S.Schema<GetFunctionResponse>;
export interface GetFunctionCodeSigningConfigRequest {
  FunctionName: string;
}
export const GetFunctionCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2020-06-30/functions/{FunctionName}/code-signing-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionCodeSigningConfigRequest",
}) as any as S.Schema<GetFunctionCodeSigningConfigRequest>;
export interface GetFunctionCodeSigningConfigResponse {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export const GetFunctionCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CodeSigningConfigArn: S.String, FunctionName: S.String }),
).annotate({
  identifier: "GetFunctionCodeSigningConfigResponse",
}) as any as S.Schema<GetFunctionCodeSigningConfigResponse>;
export interface GetFunctionConcurrencyRequest {
  FunctionName: string;
}
export const GetFunctionConcurrencyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2019-09-30/functions/{FunctionName}/concurrency",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionConcurrencyRequest",
}) as any as S.Schema<GetFunctionConcurrencyRequest>;
export interface GetFunctionConcurrencyResponse {
  ReservedConcurrentExecutions?: number;
}
export const GetFunctionConcurrencyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReservedConcurrentExecutions: S.optional(S.Number) }),
).annotate({
  identifier: "GetFunctionConcurrencyResponse",
}) as any as S.Schema<GetFunctionConcurrencyResponse>;
export interface GetFunctionConfigurationRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const GetFunctionConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-03-31/functions/{FunctionName}/configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionConfigurationRequest",
}) as any as S.Schema<GetFunctionConfigurationRequest>;
export interface GetFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const GetFunctionEventInvokeConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionEventInvokeConfigRequest",
}) as any as S.Schema<GetFunctionEventInvokeConfigRequest>;
export type MaximumRetryAttempts = number;
export type MaximumEventAgeInSeconds = number;
export interface FunctionEventInvokeConfig {
  LastModified?: Date;
  FunctionArn?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export const FunctionEventInvokeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FunctionArn: S.optional(S.String),
    MaximumRetryAttempts: S.optional(S.Number),
    MaximumEventAgeInSeconds: S.optional(S.Number),
    DestinationConfig: S.optional(DestinationConfig),
  }),
).annotate({
  identifier: "FunctionEventInvokeConfig",
}) as any as S.Schema<FunctionEventInvokeConfig>;
export type UnqualifiedFunctionName = string;
export interface GetFunctionRecursionConfigRequest {
  FunctionName: string;
}
export const GetFunctionRecursionConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionName: S.String.pipe(T.HttpLabel("FunctionName")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2024-08-31/functions/{FunctionName}/recursion-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionRecursionConfigRequest",
}) as any as S.Schema<GetFunctionRecursionConfigRequest>;
export type RecursiveLoop = "Allow" | "Terminate" | (string & {});
export const RecursiveLoop = S.String;

export interface GetFunctionRecursionConfigResponse {
  RecursiveLoop?: RecursiveLoop;
}
export const GetFunctionRecursionConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecursiveLoop: S.optional(RecursiveLoop) }),
).annotate({
  identifier: "GetFunctionRecursionConfigResponse",
}) as any as S.Schema<GetFunctionRecursionConfigResponse>;
export type PublishedFunctionQualifier = string;
export interface GetFunctionScalingConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export const GetFunctionScalingConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2025-11-30/functions/{FunctionName}/function-scaling-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionScalingConfigRequest",
}) as any as S.Schema<GetFunctionScalingConfigRequest>;
export type FunctionScalingConfigExecutionEnvironments = number;
export interface FunctionScalingConfig {
  MinExecutionEnvironments?: number;
  MaxExecutionEnvironments?: number;
}
export const FunctionScalingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinExecutionEnvironments: S.optional(S.Number),
    MaxExecutionEnvironments: S.optional(S.Number),
  }),
).annotate({
  identifier: "FunctionScalingConfig",
}) as any as S.Schema<FunctionScalingConfig>;
export interface GetFunctionScalingConfigResponse {
  FunctionArn?: string;
  AppliedFunctionScalingConfig?: FunctionScalingConfig;
  RequestedFunctionScalingConfig?: FunctionScalingConfig;
}
export const GetFunctionScalingConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionArn: S.optional(S.String),
    AppliedFunctionScalingConfig: S.optional(FunctionScalingConfig),
    RequestedFunctionScalingConfig: S.optional(FunctionScalingConfig),
  }),
).annotate({
  identifier: "GetFunctionScalingConfigResponse",
}) as any as S.Schema<GetFunctionScalingConfigResponse>;
export interface GetFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const GetFunctionUrlConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2021-10-31/functions/{FunctionName}/url",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionUrlConfigRequest",
}) as any as S.Schema<GetFunctionUrlConfigRequest>;
export interface GetFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  LastModifiedTime: string;
  InvokeMode?: InvokeMode;
}
export const GetFunctionUrlConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionUrl: S.String,
    FunctionArn: S.String,
    AuthType: FunctionUrlAuthType,
    Cors: S.optional(Cors),
    CreationTime: S.String,
    LastModifiedTime: S.String,
    InvokeMode: S.optional(InvokeMode),
  }),
).annotate({
  identifier: "GetFunctionUrlConfigResponse",
}) as any as S.Schema<GetFunctionUrlConfigResponse>;
export interface GetLayerVersionRequest {
  LayerName: string;
  VersionNumber: number;
}
export const GetLayerVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLayerVersionRequest",
}) as any as S.Schema<GetLayerVersionRequest>;
export interface LayerVersionContentOutput {
  Location?: string;
  CodeSha256?: string;
  CodeSize?: number;
  SigningProfileVersionArn?: string;
  SigningJobArn?: string;
  ResolvedS3Object?: ResolvedS3Object;
}
export const LayerVersionContentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.optional(S.String),
    CodeSha256: S.optional(S.String),
    CodeSize: S.optional(S.Number),
    SigningProfileVersionArn: S.optional(S.String),
    SigningJobArn: S.optional(S.String),
    ResolvedS3Object: S.optional(ResolvedS3Object),
  }),
).annotate({
  identifier: "LayerVersionContentOutput",
}) as any as S.Schema<LayerVersionContentOutput>;
export type LayerArn = string;
export type CompatibleArchitectures = Architecture[];
export const CompatibleArchitectures = /*@__PURE__*/ S.Array(Architecture);
export type CompatibleRuntimes = Runtime[];
export const CompatibleRuntimes = /*@__PURE__*/ S.Array(Runtime);
export type LicenseInfo = string;
export interface GetLayerVersionResponse {
  Content?: LayerVersionContentOutput;
  LayerArn?: string;
  LayerVersionArn?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: number;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export const GetLayerVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(LayerVersionContentOutput),
    LayerArn: S.optional(S.String),
    LayerVersionArn: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    Version: S.optional(S.Number),
    CompatibleArchitectures: S.optional(CompatibleArchitectures),
    CompatibleRuntimes: S.optional(CompatibleRuntimes),
    LicenseInfo: S.optional(S.String),
  }),
).annotate({
  identifier: "GetLayerVersionResponse",
}) as any as S.Schema<GetLayerVersionResponse>;
export interface GetLayerVersionByArnRequest {
  Arn: string;
}
export const GetLayerVersionByArnRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpQuery("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2018-10-31/layers?find=LayerVersion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLayerVersionByArnRequest",
}) as any as S.Schema<GetLayerVersionByArnRequest>;
export interface GetLayerVersionPolicyRequest {
  LayerName: string;
  VersionNumber: number;
}
export const GetLayerVersionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLayerVersionPolicyRequest",
}) as any as S.Schema<GetLayerVersionPolicyRequest>;
export interface GetLayerVersionPolicyResponse {
  Policy?: string;
  RevisionId?: string;
}
export const GetLayerVersionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String), RevisionId: S.optional(S.String) }),
).annotate({
  identifier: "GetLayerVersionPolicyResponse",
}) as any as S.Schema<GetLayerVersionPolicyResponse>;
export interface GetPolicyRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-03-31/functions/{FunctionName}/policy",
      }),
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
  Policy?: string;
  RevisionId?: string;
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String), RevisionId: S.optional(S.String) }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
}
export const GetProvisionedConcurrencyConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetProvisionedConcurrencyConfigRequest",
}) as any as S.Schema<GetProvisionedConcurrencyConfigRequest>;
export type PositiveInteger = number;
export type NonNegativeInteger = number;
export type ProvisionedConcurrencyStatusEnum =
  | "IN_PROGRESS"
  | "READY"
  | "FAILED"
  | (string & {});
export const ProvisionedConcurrencyStatusEnum = S.String;

export interface GetProvisionedConcurrencyConfigResponse {
  RequestedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export const GetProvisionedConcurrencyConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RequestedProvisionedConcurrentExecutions: S.optional(S.Number),
      AvailableProvisionedConcurrentExecutions: S.optional(S.Number),
      AllocatedProvisionedConcurrentExecutions: S.optional(S.Number),
      Status: S.optional(ProvisionedConcurrencyStatusEnum),
      StatusReason: S.optional(S.String),
      LastModified: S.optional(S.String),
    }),
).annotate({
  identifier: "GetProvisionedConcurrencyConfigResponse",
}) as any as S.Schema<GetProvisionedConcurrencyConfigResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2026-07-09/resource-policy/{ResourceArn}",
      }),
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
  Policy?: string;
  RevisionId?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String), RevisionId: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetRuntimeManagementConfigRequest {
  FunctionName: string;
  Qualifier?: string;
}
export const GetRuntimeManagementConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2021-07-20/functions/{FunctionName}/runtime-management-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRuntimeManagementConfigRequest",
}) as any as S.Schema<GetRuntimeManagementConfigRequest>;
export type UpdateRuntimeOn =
  | "Auto"
  | "Manual"
  | "FunctionUpdate"
  | (string & {});
export const UpdateRuntimeOn = S.String;

export interface GetRuntimeManagementConfigResponse {
  UpdateRuntimeOn?: UpdateRuntimeOn;
  FunctionArn?: string;
  RuntimeVersionArn?: string;
}
export const GetRuntimeManagementConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateRuntimeOn: S.optional(UpdateRuntimeOn),
    FunctionArn: S.optional(S.String),
    RuntimeVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRuntimeManagementConfigResponse",
}) as any as S.Schema<GetRuntimeManagementConfigResponse>;
export type InvocationType =
  | "Event"
  | "RequestResponse"
  | "DryRun"
  | (string & {});
export const InvocationType = S.String;

export type LogType = "None" | "Tail" | (string & {});
export const LogType = S.String;

export interface InvocationRequest {
  FunctionName: string;
  InvocationType?: InvocationType;
  LogType?: LogType;
  ClientContext?: string;
  DurableExecutionName?: string;
  Payload?: T.StreamingInputBody;
  Qualifier?: string;
  TenantId?: string;
}
export const InvocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    InvocationType: S.optional(InvocationType).pipe(
      T.HttpHeader("X-Amz-Invocation-Type"),
    ),
    LogType: S.optional(LogType).pipe(T.HttpHeader("X-Amz-Log-Type")),
    ClientContext: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Context"),
    ),
    DurableExecutionName: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Durable-Execution-Name"),
    ),
    Payload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    TenantId: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Tenant-Id")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2015-03-31/functions/{FunctionName}/invocations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvocationRequest",
}) as any as S.Schema<InvocationRequest>;
export interface InvocationResponse {
  StatusCode?: number;
  FunctionError?: string;
  LogResult?: string;
  Payload?: T.StreamingOutputBody;
  ExecutedVersion?: string;
  DurableExecutionArn?: string;
}
export const InvocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    FunctionError: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Function-Error"),
    ),
    LogResult: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Log-Result")),
    Payload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ExecutedVersion: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Executed-Version"),
    ),
    DurableExecutionArn: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Durable-Execution-Arn"),
    ),
  }),
).annotate({
  identifier: "InvocationResponse",
}) as any as S.Schema<InvocationResponse>;
export interface InvokeAsyncRequest {
  FunctionName: string;
  InvokeArgs: T.StreamingInputBody;
}
export const InvokeAsyncRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    InvokeArgs: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2014-11-13/functions/{FunctionName}/invoke-async",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeAsyncRequest",
}) as any as S.Schema<InvokeAsyncRequest>;
export type HttpStatus = number;
export interface InvokeAsyncResponse {
  Status?: number;
}
export const InvokeAsyncResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
).annotate({
  identifier: "InvokeAsyncResponse",
}) as any as S.Schema<InvokeAsyncResponse>;
export type ResponseStreamingInvocationType =
  | "RequestResponse"
  | "DryRun"
  | (string & {});
export const ResponseStreamingInvocationType = S.String;

export interface InvokeWithResponseStreamRequest {
  FunctionName: string;
  LogType?: LogType;
  ClientContext?: string;
  Qualifier?: string;
  Payload?: T.StreamingInputBody;
  TenantId?: string;
  InvocationType?: ResponseStreamingInvocationType;
}
export const InvokeWithResponseStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    LogType: S.optional(LogType).pipe(T.HttpHeader("X-Amz-Log-Type")),
    ClientContext: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Client-Context"),
    ),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    Payload: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    TenantId: S.optional(S.String).pipe(T.HttpHeader("X-Amz-Tenant-Id")),
    InvocationType: S.optional(ResponseStreamingInvocationType).pipe(
      T.HttpHeader("X-Amz-Invocation-Type"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2021-11-15/functions/{FunctionName}/response-streaming-invocations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeWithResponseStreamRequest",
}) as any as S.Schema<InvokeWithResponseStreamRequest>;
export interface InvokeResponseStreamUpdate {
  Payload?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const InvokeResponseStreamUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Payload: S.optional(SensitiveBlob).pipe(T.EventPayload()) }),
).annotate({
  identifier: "InvokeResponseStreamUpdate",
}) as any as S.Schema<InvokeResponseStreamUpdate>;
export interface InvokeWithResponseStreamCompleteEvent {
  ErrorCode?: string;
  ErrorDetails?: string;
  LogResult?: string;
}
export const InvokeWithResponseStreamCompleteEvent = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ErrorCode: S.optional(S.String),
      ErrorDetails: S.optional(S.String),
      LogResult: S.optional(S.String),
    }),
).annotate({
  identifier: "InvokeWithResponseStreamCompleteEvent",
}) as any as S.Schema<InvokeWithResponseStreamCompleteEvent>;
export type InvokeWithResponseStreamResponseEvent =
  | { PayloadChunk: InvokeResponseStreamUpdate; InvokeComplete?: never }
  | {
      PayloadChunk?: never;
      InvokeComplete: InvokeWithResponseStreamCompleteEvent;
    };
export const InvokeWithResponseStreamResponseEvent =
  /*@__PURE__*/ T.EventStream(
    S.Union([
      S.Struct({ PayloadChunk: InvokeResponseStreamUpdate }),
      S.Struct({ InvokeComplete: InvokeWithResponseStreamCompleteEvent }),
    ]),
  ) as any as S.Schema<
    stream.Stream<InvokeWithResponseStreamResponseEvent, Error, never>
  >;
export interface InvokeWithResponseStreamResponse {
  StatusCode?: number;
  ExecutedVersion?: string;
  EventStream?: stream.Stream<
    InvokeWithResponseStreamResponseEvent,
    Error,
    never
  >;
  ResponseStreamContentType?: string;
}
export const InvokeWithResponseStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
    ExecutedVersion: S.optional(S.String).pipe(
      T.HttpHeader("X-Amz-Executed-Version"),
    ),
    EventStream: S.optional(InvokeWithResponseStreamResponseEvent).pipe(
      T.HttpPayload(),
    ),
    ResponseStreamContentType: S.optional(S.String).pipe(
      T.HttpHeader("Content-Type"),
    ),
  }),
).annotate({
  identifier: "InvokeWithResponseStreamResponse",
}) as any as S.Schema<InvokeWithResponseStreamResponse>;
export type MaxListItems = number;
export interface ListAliasesRequest {
  FunctionName: string;
  FunctionVersion?: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    FunctionVersion: S.optional(S.String).pipe(T.HttpQuery("FunctionVersion")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-03-31/functions/{FunctionName}/aliases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAliasesRequest",
}) as any as S.Schema<ListAliasesRequest>;
export type AliasList = AliasConfiguration[];
export const AliasList = /*@__PURE__*/ S.Array(AliasConfiguration);
export interface ListAliasesResponse {
  NextMarker?: string;
  Aliases?: AliasConfiguration[];
}
export const ListAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Aliases: S.optional(AliasList),
  }),
).annotate({
  identifier: "ListAliasesResponse",
}) as any as S.Schema<ListAliasesResponse>;
export type MaxFiftyListItems = number;
export interface ListCapacityProvidersRequest {
  State?: CapacityProviderState;
  Marker?: string;
  MaxItems?: number;
}
export const ListCapacityProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(CapacityProviderState).pipe(T.HttpQuery("State")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2025-11-30/capacity-providers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCapacityProvidersRequest",
}) as any as S.Schema<ListCapacityProvidersRequest>;
export type CapacityProvidersList = CapacityProvider[];
export const CapacityProvidersList = /*@__PURE__*/ S.Array(CapacityProvider);
export interface ListCapacityProvidersResponse {
  CapacityProviders: CapacityProvider[];
  NextMarker?: string;
}
export const ListCapacityProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviders: CapacityProvidersList,
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCapacityProvidersResponse",
}) as any as S.Schema<ListCapacityProvidersResponse>;
export interface ListCodeSigningConfigsRequest {
  Marker?: string;
  MaxItems?: number;
}
export const ListCodeSigningConfigsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2020-04-22/code-signing-configs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCodeSigningConfigsRequest",
}) as any as S.Schema<ListCodeSigningConfigsRequest>;
export type CodeSigningConfigList = CodeSigningConfig[];
export const CodeSigningConfigList = /*@__PURE__*/ S.Array(CodeSigningConfig);
export interface ListCodeSigningConfigsResponse {
  NextMarker?: string;
  CodeSigningConfigs?: CodeSigningConfig[];
}
export const ListCodeSigningConfigsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    CodeSigningConfigs: S.optional(CodeSigningConfigList),
  }),
).annotate({
  identifier: "ListCodeSigningConfigsResponse",
}) as any as S.Schema<ListCodeSigningConfigsResponse>;
export type ExecutionStatusList = ExecutionStatus[];
export const ExecutionStatusList = /*@__PURE__*/ S.Array(ExecutionStatus);
export interface ListDurableExecutionsByFunctionRequest {
  FunctionName: string;
  Qualifier?: string;
  DurableExecutionName?: string;
  Statuses?: ExecutionStatus[];
  StartedAfter?: Date;
  StartedBefore?: Date;
  ReverseOrder?: boolean;
  Marker?: string;
  MaxItems?: number;
}
export const ListDurableExecutionsByFunctionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
      DurableExecutionName: S.optional(S.String).pipe(
        T.HttpQuery("DurableExecutionName"),
      ),
      Statuses: S.optional(ExecutionStatusList).pipe(T.HttpQuery("Statuses")),
      StartedAfter: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ).pipe(T.HttpQuery("StartedAfter")),
      StartedBefore: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ).pipe(T.HttpQuery("StartedBefore")),
      ReverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("ReverseOrder")),
      Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
      MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2025-12-01/functions/{FunctionName}/durable-executions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDurableExecutionsByFunctionRequest",
}) as any as S.Schema<ListDurableExecutionsByFunctionRequest>;
export interface Execution {
  DurableExecutionArn: string;
  DurableExecutionName: string;
  FunctionArn: string;
  Status: ExecutionStatus;
  StartTimestamp: Date;
  EndTimestamp?: Date;
  KMSKeyArn?: string;
}
export const Execution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String,
    DurableExecutionName: S.String,
    FunctionArn: S.String,
    Status: ExecutionStatus,
    StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    KMSKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "Execution" }) as any as S.Schema<Execution>;
export type DurableExecutions = Execution[];
export const DurableExecutions = /*@__PURE__*/ S.Array(Execution);
export interface ListDurableExecutionsByFunctionResponse {
  DurableExecutions?: Execution[];
  NextMarker?: string;
}
export const ListDurableExecutionsByFunctionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DurableExecutions: S.optional(DurableExecutions),
      NextMarker: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDurableExecutionsByFunctionResponse",
}) as any as S.Schema<ListDurableExecutionsByFunctionResponse>;
export interface ListEventSourceMappingsRequest {
  EventSourceArn?: string;
  FunctionName?: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListEventSourceMappingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventSourceArn: S.optional(S.String).pipe(T.HttpQuery("EventSourceArn")),
    FunctionName: S.optional(S.String).pipe(T.HttpQuery("FunctionName")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-03-31/event-source-mappings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventSourceMappingsRequest",
}) as any as S.Schema<ListEventSourceMappingsRequest>;
export type EventSourceMappingsList = EventSourceMappingConfiguration[];
export const EventSourceMappingsList = /*@__PURE__*/ S.Array(
  EventSourceMappingConfiguration,
);
export interface ListEventSourceMappingsResponse {
  NextMarker?: string;
  EventSourceMappings?: EventSourceMappingConfiguration[];
}
export const ListEventSourceMappingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    EventSourceMappings: S.optional(EventSourceMappingsList),
  }),
).annotate({
  identifier: "ListEventSourceMappingsResponse",
}) as any as S.Schema<ListEventSourceMappingsResponse>;
export type MaxFunctionEventInvokeConfigListItems = number;
export interface ListFunctionEventInvokeConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListFunctionEventInvokeConfigsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
      MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config/list",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListFunctionEventInvokeConfigsRequest",
}) as any as S.Schema<ListFunctionEventInvokeConfigsRequest>;
export type FunctionEventInvokeConfigList = FunctionEventInvokeConfig[];
export const FunctionEventInvokeConfigList = /*@__PURE__*/ S.Array(
  FunctionEventInvokeConfig,
);
export interface ListFunctionEventInvokeConfigsResponse {
  FunctionEventInvokeConfigs?: FunctionEventInvokeConfig[];
  NextMarker?: string;
}
export const ListFunctionEventInvokeConfigsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionEventInvokeConfigs: S.optional(FunctionEventInvokeConfigList),
      NextMarker: S.optional(S.String),
    }),
).annotate({
  identifier: "ListFunctionEventInvokeConfigsResponse",
}) as any as S.Schema<ListFunctionEventInvokeConfigsResponse>;
export type MasterRegion = string;
export type FunctionVersion = "ALL" | (string & {});
export const FunctionVersion = S.String;

export interface ListFunctionsRequest {
  MasterRegion?: string;
  FunctionVersion?: FunctionVersion;
  Marker?: string;
  MaxItems?: number;
}
export const ListFunctionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasterRegion: S.optional(S.String).pipe(T.HttpQuery("MasterRegion")),
    FunctionVersion: S.optional(FunctionVersion).pipe(
      T.HttpQuery("FunctionVersion"),
    ),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2015-03-31/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFunctionsRequest",
}) as any as S.Schema<ListFunctionsRequest>;
export type FunctionList = FunctionConfiguration[];
export const FunctionList = /*@__PURE__*/ S.Array(FunctionConfiguration);
export interface ListFunctionsResponse {
  NextMarker?: string;
  Functions?: FunctionConfiguration[];
}
export const ListFunctionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Functions: S.optional(FunctionList),
  }),
).annotate({
  identifier: "ListFunctionsResponse",
}) as any as S.Schema<ListFunctionsResponse>;
export interface ListFunctionsByCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListFunctionsByCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")),
      Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
      MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}/functions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListFunctionsByCodeSigningConfigRequest",
}) as any as S.Schema<ListFunctionsByCodeSigningConfigRequest>;
export type FunctionArnList = string[];
export const FunctionArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListFunctionsByCodeSigningConfigResponse {
  NextMarker?: string;
  FunctionArns?: string[];
}
export const ListFunctionsByCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextMarker: S.optional(S.String),
      FunctionArns: S.optional(FunctionArnList),
    }),
).annotate({
  identifier: "ListFunctionsByCodeSigningConfigResponse",
}) as any as S.Schema<ListFunctionsByCodeSigningConfigResponse>;
export type MaxItems = number;
export interface ListFunctionUrlConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListFunctionUrlConfigsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2021-10-31/functions/{FunctionName}/urls",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFunctionUrlConfigsRequest",
}) as any as S.Schema<ListFunctionUrlConfigsRequest>;
export interface FunctionUrlConfig {
  FunctionUrl: string;
  FunctionArn: string;
  CreationTime: string;
  LastModifiedTime: string;
  Cors?: Cors;
  AuthType: FunctionUrlAuthType;
  InvokeMode?: InvokeMode;
}
export const FunctionUrlConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionUrl: S.String,
    FunctionArn: S.String,
    CreationTime: S.String,
    LastModifiedTime: S.String,
    Cors: S.optional(Cors),
    AuthType: FunctionUrlAuthType,
    InvokeMode: S.optional(InvokeMode),
  }),
).annotate({
  identifier: "FunctionUrlConfig",
}) as any as S.Schema<FunctionUrlConfig>;
export type FunctionUrlConfigList = FunctionUrlConfig[];
export const FunctionUrlConfigList = /*@__PURE__*/ S.Array(FunctionUrlConfig);
export interface ListFunctionUrlConfigsResponse {
  FunctionUrlConfigs: FunctionUrlConfig[];
  NextMarker?: string;
}
export const ListFunctionUrlConfigsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionUrlConfigs: FunctionUrlConfigList,
    NextMarker: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFunctionUrlConfigsResponse",
}) as any as S.Schema<ListFunctionUrlConfigsResponse>;
export interface ListFunctionVersionsByCapacityProviderRequest {
  CapacityProviderName: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListFunctionVersionsByCapacityProviderRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")),
      Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
      MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2025-11-30/capacity-providers/{CapacityProviderName}/function-versions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListFunctionVersionsByCapacityProviderRequest",
  }) as any as S.Schema<ListFunctionVersionsByCapacityProviderRequest>;
export interface FunctionVersionsByCapacityProviderListItem {
  FunctionArn: string;
  State: State;
}
export const FunctionVersionsByCapacityProviderListItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ FunctionArn: S.String, State: State }),
  ).annotate({
    identifier: "FunctionVersionsByCapacityProviderListItem",
  }) as any as S.Schema<FunctionVersionsByCapacityProviderListItem>;
export type FunctionVersionsByCapacityProviderList =
  FunctionVersionsByCapacityProviderListItem[];
export const FunctionVersionsByCapacityProviderList = /*@__PURE__*/ S.Array(
  FunctionVersionsByCapacityProviderListItem,
);
export interface ListFunctionVersionsByCapacityProviderResponse {
  CapacityProviderArn: string;
  FunctionVersions: FunctionVersionsByCapacityProviderListItem[];
  NextMarker?: string;
}
export const ListFunctionVersionsByCapacityProviderResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CapacityProviderArn: S.String,
      FunctionVersions: FunctionVersionsByCapacityProviderList,
      NextMarker: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListFunctionVersionsByCapacityProviderResponse",
  }) as any as S.Schema<ListFunctionVersionsByCapacityProviderResponse>;
export type MaxLayerListItems = number;
export interface ListLayersRequest {
  CompatibleArchitecture?: Architecture;
  CompatibleRuntime?: Runtime;
  Marker?: string;
  MaxItems?: number;
}
export const ListLayersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompatibleArchitecture: S.optional(Architecture).pipe(
      T.HttpQuery("CompatibleArchitecture"),
    ),
    CompatibleRuntime: S.optional(Runtime).pipe(
      T.HttpQuery("CompatibleRuntime"),
    ),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2018-10-31/layers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLayersRequest",
}) as any as S.Schema<ListLayersRequest>;
export interface LayerVersionsListItem {
  LayerVersionArn?: string;
  Version?: number;
  Description?: string;
  CreatedDate?: string;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export const LayerVersionsListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerVersionArn: S.optional(S.String),
    Version: S.optional(S.Number),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    CompatibleArchitectures: S.optional(CompatibleArchitectures),
    CompatibleRuntimes: S.optional(CompatibleRuntimes),
    LicenseInfo: S.optional(S.String),
  }),
).annotate({
  identifier: "LayerVersionsListItem",
}) as any as S.Schema<LayerVersionsListItem>;
export interface LayersListItem {
  LayerName?: string;
  LayerArn?: string;
  LatestMatchingVersion?: LayerVersionsListItem;
}
export const LayersListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.optional(S.String),
    LayerArn: S.optional(S.String),
    LatestMatchingVersion: S.optional(LayerVersionsListItem),
  }),
).annotate({ identifier: "LayersListItem" }) as any as S.Schema<LayersListItem>;
export type LayersList = LayersListItem[];
export const LayersList = /*@__PURE__*/ S.Array(LayersListItem);
export interface ListLayersResponse {
  NextMarker?: string;
  Layers?: LayersListItem[];
}
export const ListLayersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Layers: S.optional(LayersList),
  }),
).annotate({
  identifier: "ListLayersResponse",
}) as any as S.Schema<ListLayersResponse>;
export interface ListLayerVersionsRequest {
  CompatibleArchitecture?: Architecture;
  CompatibleRuntime?: Runtime;
  LayerName: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListLayerVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompatibleArchitecture: S.optional(Architecture).pipe(
      T.HttpQuery("CompatibleArchitecture"),
    ),
    CompatibleRuntime: S.optional(Runtime).pipe(
      T.HttpQuery("CompatibleRuntime"),
    ),
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2018-10-31/layers/{LayerName}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLayerVersionsRequest",
}) as any as S.Schema<ListLayerVersionsRequest>;
export type LayerVersionsList = LayerVersionsListItem[];
export const LayerVersionsList = /*@__PURE__*/ S.Array(LayerVersionsListItem);
export interface ListLayerVersionsResponse {
  NextMarker?: string;
  LayerVersions?: LayerVersionsListItem[];
}
export const ListLayerVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    LayerVersions: S.optional(LayerVersionsList),
  }),
).annotate({
  identifier: "ListLayerVersionsResponse",
}) as any as S.Schema<ListLayerVersionsResponse>;
export type MaxProvisionedConcurrencyConfigListItems = number;
export interface ListProvisionedConcurrencyConfigsRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListProvisionedConcurrencyConfigsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
      MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency?List=ALL",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListProvisionedConcurrencyConfigsRequest",
}) as any as S.Schema<ListProvisionedConcurrencyConfigsRequest>;
export interface ProvisionedConcurrencyConfigListItem {
  FunctionArn?: string;
  RequestedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export const ProvisionedConcurrencyConfigListItem = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionArn: S.optional(S.String),
      RequestedProvisionedConcurrentExecutions: S.optional(S.Number),
      AvailableProvisionedConcurrentExecutions: S.optional(S.Number),
      AllocatedProvisionedConcurrentExecutions: S.optional(S.Number),
      Status: S.optional(ProvisionedConcurrencyStatusEnum),
      StatusReason: S.optional(S.String),
      LastModified: S.optional(S.String),
    }),
).annotate({
  identifier: "ProvisionedConcurrencyConfigListItem",
}) as any as S.Schema<ProvisionedConcurrencyConfigListItem>;
export type ProvisionedConcurrencyConfigList =
  ProvisionedConcurrencyConfigListItem[];
export const ProvisionedConcurrencyConfigList = /*@__PURE__*/ S.Array(
  ProvisionedConcurrencyConfigListItem,
);
export interface ListProvisionedConcurrencyConfigsResponse {
  ProvisionedConcurrencyConfigs?: ProvisionedConcurrencyConfigListItem[];
  NextMarker?: string;
}
export const ListProvisionedConcurrencyConfigsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProvisionedConcurrencyConfigs: S.optional(
        ProvisionedConcurrencyConfigList,
      ),
      NextMarker: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListProvisionedConcurrencyConfigsResponse",
  }) as any as S.Schema<ListProvisionedConcurrencyConfigsResponse>;
export type TaggableResource = string;
export interface ListTagsRequest {
  Resource: string;
}
export const ListTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String.pipe(T.HttpLabel("Resource")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-03-31/tags/{Resource}" }),
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
export interface ListTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsResponse",
}) as any as S.Schema<ListTagsResponse>;
export interface ListVersionsByFunctionRequest {
  FunctionName: string;
  Marker?: string;
  MaxItems?: number;
}
export const ListVersionsByFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Marker: S.optional(S.String).pipe(T.HttpQuery("Marker")),
    MaxItems: S.optional(S.Number).pipe(T.HttpQuery("MaxItems")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/2015-03-31/functions/{FunctionName}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVersionsByFunctionRequest",
}) as any as S.Schema<ListVersionsByFunctionRequest>;
export interface ListVersionsByFunctionResponse {
  NextMarker?: string;
  Versions?: FunctionConfiguration[];
}
export const ListVersionsByFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Versions: S.optional(FunctionList),
  }),
).annotate({
  identifier: "ListVersionsByFunctionResponse",
}) as any as S.Schema<ListVersionsByFunctionResponse>;
export interface LayerVersionContentInput {
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const LayerVersionContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3ObjectVersion: S.optional(S.String),
    S3ObjectStorageMode: S.optional(S3ObjectStorageMode),
    ZipFile: S.optional(SensitiveBlob),
  }),
).annotate({
  identifier: "LayerVersionContentInput",
}) as any as S.Schema<LayerVersionContentInput>;
export interface PublishLayerVersionRequest {
  LayerName: string;
  Description?: string;
  Content: LayerVersionContentInput;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export const PublishLayerVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    Description: S.optional(S.String),
    Content: LayerVersionContentInput,
    CompatibleArchitectures: S.optional(CompatibleArchitectures),
    CompatibleRuntimes: S.optional(CompatibleRuntimes),
    LicenseInfo: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2018-10-31/layers/{LayerName}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishLayerVersionRequest",
}) as any as S.Schema<PublishLayerVersionRequest>;
export interface PublishLayerVersionResponse {
  Content?: LayerVersionContentOutput;
  LayerArn?: string;
  LayerVersionArn?: string;
  Description?: string;
  CreatedDate?: string;
  Version?: number;
  CompatibleArchitectures?: Architecture[];
  CompatibleRuntimes?: Runtime[];
  LicenseInfo?: string;
}
export const PublishLayerVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(LayerVersionContentOutput),
    LayerArn: S.optional(S.String),
    LayerVersionArn: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedDate: S.optional(S.String),
    Version: S.optional(S.Number),
    CompatibleArchitectures: S.optional(CompatibleArchitectures),
    CompatibleRuntimes: S.optional(CompatibleRuntimes),
    LicenseInfo: S.optional(S.String),
  }),
).annotate({
  identifier: "PublishLayerVersionResponse",
}) as any as S.Schema<PublishLayerVersionResponse>;
export interface PublishVersionRequest {
  FunctionName: string;
  CodeSha256?: string;
  Description?: string;
  RevisionId?: string;
  PublishTo?: FunctionVersionLatestPublished;
}
export const PublishVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    CodeSha256: S.optional(S.String),
    Description: S.optional(S.String),
    RevisionId: S.optional(S.String),
    PublishTo: S.optional(FunctionVersionLatestPublished),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2015-03-31/functions/{FunctionName}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishVersionRequest",
}) as any as S.Schema<PublishVersionRequest>;
export interface PutFunctionCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export const PutFunctionCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeSigningConfigArn: S.String,
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2020-06-30/functions/{FunctionName}/code-signing-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFunctionCodeSigningConfigRequest",
}) as any as S.Schema<PutFunctionCodeSigningConfigRequest>;
export interface PutFunctionCodeSigningConfigResponse {
  CodeSigningConfigArn: string;
  FunctionName: string;
}
export const PutFunctionCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CodeSigningConfigArn: S.String, FunctionName: S.String }),
).annotate({
  identifier: "PutFunctionCodeSigningConfigResponse",
}) as any as S.Schema<PutFunctionCodeSigningConfigResponse>;
export interface PutFunctionConcurrencyRequest {
  FunctionName: string;
  ReservedConcurrentExecutions: number;
}
export const PutFunctionConcurrencyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    ReservedConcurrentExecutions: S.Number,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2017-10-31/functions/{FunctionName}/concurrency",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFunctionConcurrencyRequest",
}) as any as S.Schema<PutFunctionConcurrencyRequest>;
export interface PutFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export const PutFunctionEventInvokeConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    MaximumRetryAttempts: S.optional(S.Number),
    MaximumEventAgeInSeconds: S.optional(S.Number),
    DestinationConfig: S.optional(DestinationConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFunctionEventInvokeConfigRequest",
}) as any as S.Schema<PutFunctionEventInvokeConfigRequest>;
export interface PutFunctionRecursionConfigRequest {
  FunctionName: string;
  RecursiveLoop: RecursiveLoop;
}
export const PutFunctionRecursionConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    RecursiveLoop: RecursiveLoop,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2024-08-31/functions/{FunctionName}/recursion-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFunctionRecursionConfigRequest",
}) as any as S.Schema<PutFunctionRecursionConfigRequest>;
export interface PutFunctionRecursionConfigResponse {
  RecursiveLoop?: RecursiveLoop;
}
export const PutFunctionRecursionConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecursiveLoop: S.optional(RecursiveLoop) }),
).annotate({
  identifier: "PutFunctionRecursionConfigResponse",
}) as any as S.Schema<PutFunctionRecursionConfigResponse>;
export interface PutFunctionScalingConfigRequest {
  FunctionName: string;
  Qualifier: string;
  FunctionScalingConfig?: FunctionScalingConfig;
}
export const PutFunctionScalingConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
    FunctionScalingConfig: S.optional(FunctionScalingConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2025-11-30/functions/{FunctionName}/function-scaling-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFunctionScalingConfigRequest",
}) as any as S.Schema<PutFunctionScalingConfigRequest>;
export interface PutFunctionScalingConfigResponse {
  FunctionState?: State;
}
export const PutFunctionScalingConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionState: S.optional(State) }),
).annotate({
  identifier: "PutFunctionScalingConfigResponse",
}) as any as S.Schema<PutFunctionScalingConfigResponse>;
export interface PutProvisionedConcurrencyConfigRequest {
  FunctionName: string;
  Qualifier: string;
  ProvisionedConcurrentExecutions: number;
}
export const PutProvisionedConcurrencyConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Qualifier: S.String.pipe(T.HttpQuery("Qualifier")),
      ProvisionedConcurrentExecutions: S.Number,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/2019-09-30/functions/{FunctionName}/provisioned-concurrency",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutProvisionedConcurrencyConfigRequest",
}) as any as S.Schema<PutProvisionedConcurrencyConfigRequest>;
export interface PutProvisionedConcurrencyConfigResponse {
  RequestedProvisionedConcurrentExecutions?: number;
  AllocatedProvisionedConcurrentExecutions?: number;
  AvailableProvisionedConcurrentExecutions?: number;
  Status?: ProvisionedConcurrencyStatusEnum;
  StatusReason?: string;
  LastModified?: string;
}
export const PutProvisionedConcurrencyConfigResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RequestedProvisionedConcurrentExecutions: S.optional(S.Number),
      AllocatedProvisionedConcurrentExecutions: S.optional(S.Number),
      AvailableProvisionedConcurrentExecutions: S.optional(S.Number),
      Status: S.optional(ProvisionedConcurrencyStatusEnum),
      StatusReason: S.optional(S.String),
      LastModified: S.optional(S.String),
    }),
).annotate({
  identifier: "PutProvisionedConcurrencyConfigResponse",
}) as any as S.Schema<PutProvisionedConcurrencyConfigResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
  RevisionId?: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Policy: S.String,
    RevisionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2026-07-09/resource-policy/{ResourceArn}",
      }),
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
  Policy?: string;
  RevisionId?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String), RevisionId: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface PutRuntimeManagementConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  UpdateRuntimeOn: UpdateRuntimeOn;
  RuntimeVersionArn?: string;
}
export const PutRuntimeManagementConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    UpdateRuntimeOn: UpdateRuntimeOn,
    RuntimeVersionArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2021-07-20/functions/{FunctionName}/runtime-management-config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRuntimeManagementConfigRequest",
}) as any as S.Schema<PutRuntimeManagementConfigRequest>;
export interface PutRuntimeManagementConfigResponse {
  UpdateRuntimeOn: UpdateRuntimeOn;
  FunctionArn: string;
  RuntimeVersionArn?: string;
}
export const PutRuntimeManagementConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateRuntimeOn: UpdateRuntimeOn,
    FunctionArn: S.String,
    RuntimeVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutRuntimeManagementConfigResponse",
}) as any as S.Schema<PutRuntimeManagementConfigResponse>;
export interface RemoveLayerVersionPermissionRequest {
  LayerName: string;
  VersionNumber: number;
  StatementId: string;
  RevisionId?: string;
}
export const RemoveLayerVersionPermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LayerName: S.String.pipe(T.HttpLabel("LayerName")),
    VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
    StatementId: S.String.pipe(T.HttpLabel("StatementId")),
    RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2018-10-31/layers/{LayerName}/versions/{VersionNumber}/policy/{StatementId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveLayerVersionPermissionRequest",
}) as any as S.Schema<RemoveLayerVersionPermissionRequest>;
export interface RemoveLayerVersionPermissionResponse {}
export const RemoveLayerVersionPermissionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "RemoveLayerVersionPermissionResponse",
}) as any as S.Schema<RemoveLayerVersionPermissionResponse>;
export type NamespacedStatementId = string;
export interface RemovePermissionRequest {
  FunctionName: string;
  StatementId: string;
  Qualifier?: string;
  RevisionId?: string;
}
export const RemovePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    StatementId: S.String.pipe(T.HttpLabel("StatementId")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    RevisionId: S.optional(S.String).pipe(T.HttpQuery("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/2015-03-31/functions/{FunctionName}/policy/{StatementId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemovePermissionRequest",
}) as any as S.Schema<RemovePermissionRequest>;
export interface RemovePermissionResponse {}
export const RemovePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemovePermissionResponse",
}) as any as S.Schema<RemovePermissionResponse>;
export interface SendDurableExecutionCallbackFailureRequest {
  CallbackId: string;
  Error?: ErrorObject;
}
export const SendDurableExecutionCallbackFailureRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CallbackId: S.String.pipe(T.HttpLabel("CallbackId")),
      Error: S.optional(ErrorObject)
        .pipe(T.HttpPayload())
        .annotate({ identifier: "ErrorObject" }),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/2025-12-01/durable-execution-callbacks/{CallbackId}/fail",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "SendDurableExecutionCallbackFailureRequest",
  }) as any as S.Schema<SendDurableExecutionCallbackFailureRequest>;
export interface SendDurableExecutionCallbackFailureResponse {}
export const SendDurableExecutionCallbackFailureResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "SendDurableExecutionCallbackFailureResponse",
  }) as any as S.Schema<SendDurableExecutionCallbackFailureResponse>;
export interface SendDurableExecutionCallbackHeartbeatRequest {
  CallbackId: string;
}
export const SendDurableExecutionCallbackHeartbeatRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ CallbackId: S.String.pipe(T.HttpLabel("CallbackId")) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/2025-12-01/durable-execution-callbacks/{CallbackId}/heartbeat",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "SendDurableExecutionCallbackHeartbeatRequest",
  }) as any as S.Schema<SendDurableExecutionCallbackHeartbeatRequest>;
export interface SendDurableExecutionCallbackHeartbeatResponse {}
export const SendDurableExecutionCallbackHeartbeatResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "SendDurableExecutionCallbackHeartbeatResponse",
  }) as any as S.Schema<SendDurableExecutionCallbackHeartbeatResponse>;
export interface SendDurableExecutionCallbackSuccessRequest {
  CallbackId: string;
  Result?: T.StreamingInputBody;
}
export const SendDurableExecutionCallbackSuccessRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CallbackId: S.String.pipe(T.HttpLabel("CallbackId")),
      Result: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/2025-12-01/durable-execution-callbacks/{CallbackId}/succeed",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "SendDurableExecutionCallbackSuccessRequest",
  }) as any as S.Schema<SendDurableExecutionCallbackSuccessRequest>;
export interface SendDurableExecutionCallbackSuccessResponse {}
export const SendDurableExecutionCallbackSuccessResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "SendDurableExecutionCallbackSuccessResponse",
  }) as any as S.Schema<SendDurableExecutionCallbackSuccessResponse>;
export interface StopDurableExecutionRequest {
  DurableExecutionArn: string;
  Error?: ErrorObject;
}
export const StopDurableExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurableExecutionArn: S.String.pipe(T.HttpLabel("DurableExecutionArn")),
    Error: S.optional(ErrorObject)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ErrorObject" }),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2025-12-01/durable-executions/{DurableExecutionArn}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDurableExecutionRequest",
}) as any as S.Schema<StopDurableExecutionRequest>;
export interface StopDurableExecutionResponse {
  StopTimestamp: Date;
}
export const StopDurableExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StopTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
).annotate({
  identifier: "StopDurableExecutionResponse",
}) as any as S.Schema<StopDurableExecutionResponse>;
export interface TagResourceRequest {
  Resource: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resource: S.String.pipe(T.HttpLabel("Resource")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2017-03-31/tags/{Resource}" }),
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
export const TagKeyList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("Key")),
);
export interface UntagResourceRequest {
  Resource: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resource: S.String.pipe(T.HttpLabel("Resource")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-03-31/tags/{Resource}" }),
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
export interface UpdateAliasRequest {
  FunctionName: string;
  Name: string;
  FunctionVersion?: string;
  Description?: string;
  RoutingConfig?: AliasRoutingConfiguration;
  RevisionId?: string;
}
export const UpdateAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Name: S.String.pipe(T.HttpLabel("Name")),
    FunctionVersion: S.optional(S.String),
    Description: S.optional(S.String),
    RoutingConfig: S.optional(AliasRoutingConfiguration),
    RevisionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-03-31/functions/{FunctionName}/aliases/{Name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAliasRequest",
}) as any as S.Schema<UpdateAliasRequest>;
export interface UpdateCapacityProviderRequest {
  CapacityProviderName: string;
  CapacityProviderScalingConfig?: CapacityProviderScalingConfig;
  PropagateTags?: PropagateTags;
  TelemetryConfig?: CapacityProviderTelemetryConfig;
}
export const UpdateCapacityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityProviderName: S.String.pipe(T.HttpLabel("CapacityProviderName")),
    CapacityProviderScalingConfig: S.optional(CapacityProviderScalingConfig),
    PropagateTags: S.optional(PropagateTags),
    TelemetryConfig: S.optional(CapacityProviderTelemetryConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2025-11-30/capacity-providers/{CapacityProviderName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCapacityProviderRequest",
}) as any as S.Schema<UpdateCapacityProviderRequest>;
export interface UpdateCapacityProviderResponse {
  CapacityProvider: CapacityProvider;
}
export const UpdateCapacityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityProvider: CapacityProvider }),
).annotate({
  identifier: "UpdateCapacityProviderResponse",
}) as any as S.Schema<UpdateCapacityProviderResponse>;
export interface UpdateCodeSigningConfigRequest {
  CodeSigningConfigArn: string;
  Description?: string;
  AllowedPublishers?: AllowedPublishers;
  CodeSigningPolicies?: CodeSigningPolicies;
}
export const UpdateCodeSigningConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeSigningConfigArn: S.String.pipe(T.HttpLabel("CodeSigningConfigArn")),
    Description: S.optional(S.String),
    AllowedPublishers: S.optional(AllowedPublishers),
    CodeSigningPolicies: S.optional(CodeSigningPolicies),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2020-04-22/code-signing-configs/{CodeSigningConfigArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCodeSigningConfigRequest",
}) as any as S.Schema<UpdateCodeSigningConfigRequest>;
export interface UpdateCodeSigningConfigResponse {
  CodeSigningConfig: CodeSigningConfig;
}
export const UpdateCodeSigningConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeSigningConfig: CodeSigningConfig }),
).annotate({
  identifier: "UpdateCodeSigningConfigResponse",
}) as any as S.Schema<UpdateCodeSigningConfigResponse>;
export interface UpdateEventSourceMappingRequest {
  UUID: string;
  FunctionName?: string;
  Enabled?: boolean;
  BatchSize?: number;
  FilterCriteria?: FilterCriteria;
  KMSKeyArn?: string;
  MetricsConfig?: EventSourceMappingMetricsConfig;
  LoggingConfig?: EventSourceMappingLoggingConfig;
  ScalingConfig?: ScalingConfig;
  MaximumBatchingWindowInSeconds?: number;
  ParallelizationFactor?: number;
  DestinationConfig?: DestinationConfig;
  MaximumRecordAgeInSeconds?: number;
  BisectBatchOnFunctionError?: boolean;
  MaximumRetryAttempts?: number;
  TumblingWindowInSeconds?: number;
  SourceAccessConfigurations?: SourceAccessConfiguration[];
  FunctionResponseTypes?: FunctionResponseType[];
  AmazonManagedKafkaEventSourceConfig?: AmazonManagedKafkaEventSourceConfig;
  SelfManagedKafkaEventSourceConfig?: SelfManagedKafkaEventSourceConfig;
  DocumentDBEventSourceConfig?: DocumentDBEventSourceConfig;
  ProvisionedPollerConfig?: ProvisionedPollerConfig;
}
export const UpdateEventSourceMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UUID: S.String.pipe(T.HttpLabel("UUID")),
    FunctionName: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    BatchSize: S.optional(S.Number),
    FilterCriteria: S.optional(FilterCriteria),
    KMSKeyArn: S.optional(S.String),
    MetricsConfig: S.optional(EventSourceMappingMetricsConfig),
    LoggingConfig: S.optional(EventSourceMappingLoggingConfig),
    ScalingConfig: S.optional(ScalingConfig),
    MaximumBatchingWindowInSeconds: S.optional(S.Number),
    ParallelizationFactor: S.optional(S.Number),
    DestinationConfig: S.optional(DestinationConfig),
    MaximumRecordAgeInSeconds: S.optional(S.Number),
    BisectBatchOnFunctionError: S.optional(S.Boolean),
    MaximumRetryAttempts: S.optional(S.Number),
    TumblingWindowInSeconds: S.optional(S.Number),
    SourceAccessConfigurations: S.optional(SourceAccessConfigurations),
    FunctionResponseTypes: S.optional(FunctionResponseTypeList),
    AmazonManagedKafkaEventSourceConfig: S.optional(
      AmazonManagedKafkaEventSourceConfig,
    ),
    SelfManagedKafkaEventSourceConfig: S.optional(
      SelfManagedKafkaEventSourceConfig,
    ),
    DocumentDBEventSourceConfig: S.optional(DocumentDBEventSourceConfig),
    ProvisionedPollerConfig: S.optional(ProvisionedPollerConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-03-31/event-source-mappings/{UUID}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEventSourceMappingRequest",
}) as any as S.Schema<UpdateEventSourceMappingRequest>;
export interface UpdateFunctionCodeRequest {
  FunctionName: string;
  ZipFile?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Bucket?: string;
  S3Key?: string;
  S3ObjectVersion?: string;
  S3ObjectStorageMode?: S3ObjectStorageMode;
  ImageUri?: string;
  Architectures?: Architecture[];
  Publish?: boolean;
  PublishTo?: FunctionVersionLatestPublished;
  DryRun?: boolean;
  RevisionId?: string;
  SourceKMSKeyArn?: string;
}
export const UpdateFunctionCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    ZipFile: S.optional(SensitiveBlob),
    S3Bucket: S.optional(S.String),
    S3Key: S.optional(S.String),
    S3ObjectVersion: S.optional(S.String),
    S3ObjectStorageMode: S.optional(S3ObjectStorageMode),
    ImageUri: S.optional(S.String),
    Architectures: S.optional(ArchitecturesList),
    Publish: S.optional(S.Boolean),
    PublishTo: S.optional(FunctionVersionLatestPublished),
    DryRun: S.optional(S.Boolean),
    RevisionId: S.optional(S.String),
    SourceKMSKeyArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-03-31/functions/{FunctionName}/code",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFunctionCodeRequest",
}) as any as S.Schema<UpdateFunctionCodeRequest>;
export interface UpdateFunctionConfigurationRequest {
  FunctionName: string;
  Role?: string;
  Handler?: string;
  Description?: string;
  Timeout?: number;
  MemorySize?: number;
  VpcConfig?: VpcConfig;
  Environment?: Environment;
  Runtime?: Runtime;
  DeadLetterConfig?: DeadLetterConfig;
  KMSKeyArn?: string;
  TracingConfig?: TracingConfig;
  RevisionId?: string;
  Layers?: string[];
  FileSystemConfigs?: FileSystemConfig[];
  ImageConfig?: ImageConfig;
  EphemeralStorage?: EphemeralStorage;
  SnapStart?: SnapStart;
  LoggingConfig?: LoggingConfig;
  CapacityProviderConfig?: CapacityProviderConfig;
  DurableConfig?: DurableConfig;
}
export const UpdateFunctionConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Role: S.optional(S.String),
    Handler: S.optional(S.String),
    Description: S.optional(S.String),
    Timeout: S.optional(S.Number),
    MemorySize: S.optional(S.Number),
    VpcConfig: S.optional(VpcConfig),
    Environment: S.optional(Environment),
    Runtime: S.optional(Runtime),
    DeadLetterConfig: S.optional(DeadLetterConfig),
    KMSKeyArn: S.optional(S.String),
    TracingConfig: S.optional(TracingConfig),
    RevisionId: S.optional(S.String),
    Layers: S.optional(LayerList),
    FileSystemConfigs: S.optional(FileSystemConfigList),
    ImageConfig: S.optional(ImageConfig),
    EphemeralStorage: S.optional(EphemeralStorage),
    SnapStart: S.optional(SnapStart),
    LoggingConfig: S.optional(LoggingConfig),
    CapacityProviderConfig: S.optional(CapacityProviderConfig),
    DurableConfig: S.optional(DurableConfig),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2015-03-31/functions/{FunctionName}/configuration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFunctionConfigurationRequest",
}) as any as S.Schema<UpdateFunctionConfigurationRequest>;
export interface UpdateFunctionEventInvokeConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  MaximumRetryAttempts?: number;
  MaximumEventAgeInSeconds?: number;
  DestinationConfig?: DestinationConfig;
}
export const UpdateFunctionEventInvokeConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
      Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
      MaximumRetryAttempts: S.optional(S.Number),
      MaximumEventAgeInSeconds: S.optional(S.Number),
      DestinationConfig: S.optional(DestinationConfig),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/2019-09-25/functions/{FunctionName}/event-invoke-config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFunctionEventInvokeConfigRequest",
}) as any as S.Schema<UpdateFunctionEventInvokeConfigRequest>;
export interface UpdateFunctionUrlConfigRequest {
  FunctionName: string;
  Qualifier?: string;
  AuthType?: FunctionUrlAuthType;
  Cors?: Cors;
  InvokeMode?: InvokeMode;
}
export const UpdateFunctionUrlConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.String.pipe(T.HttpLabel("FunctionName")),
    Qualifier: S.optional(S.String).pipe(T.HttpQuery("Qualifier")),
    AuthType: S.optional(FunctionUrlAuthType),
    Cors: S.optional(Cors),
    InvokeMode: S.optional(InvokeMode),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/2021-10-31/functions/{FunctionName}/url",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFunctionUrlConfigRequest",
}) as any as S.Schema<UpdateFunctionUrlConfigRequest>;
export interface UpdateFunctionUrlConfigResponse {
  FunctionUrl: string;
  FunctionArn: string;
  AuthType: FunctionUrlAuthType;
  Cors?: Cors;
  CreationTime: string;
  LastModifiedTime: string;
  InvokeMode?: InvokeMode;
}
export const UpdateFunctionUrlConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionUrl: S.String,
    FunctionArn: S.String,
    AuthType: FunctionUrlAuthType,
    Cors: S.optional(Cors),
    CreationTime: S.String,
    LastModifiedTime: S.String,
    InvokeMode: S.optional(InvokeMode),
  }),
).annotate({
  identifier: "UpdateFunctionUrlConfigResponse",
}) as any as S.Schema<UpdateFunctionUrlConfigResponse>;
export type ThrottleReason =
  | "ConcurrentInvocationLimitExceeded"
  | "FunctionInvocationRateLimitExceeded"
  | "ReservedFunctionConcurrentInvocationLimitExceeded"
  | "ReservedFunctionInvocationRateLimitExceeded"
  | "CallerRateLimitExceeded"
  | "ConcurrentSnapshotCreateLimitExceeded"
  | (string & {});
export const ThrottleReason = S.String;

export type AddLayerVersionPermissionError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds permissions to the resource-based policy of a version of an Lambda layer. Use this action to grant layer usage permission to other accounts. You can grant permission to a single account, all accounts in an organization, or all Amazon Web Services accounts.
 *
 * To revoke permission, call RemoveLayerVersionPermission with the statement ID that you specified when you added it.
 */
export const addLayerVersionPermission: API.OperationMethod<
  AddLayerVersionPermissionRequest,
  AddLayerVersionPermissionResponse,
  AddLayerVersionPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddLayerVersionPermissionRequest,
  output: AddLayerVersionPermissionResponse,
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddLayerVersionPermission",
}));

export type AddPermissionError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Grants a principal permission to use a function. You can apply the policy at the function level, or specify a qualifier to restrict access to a single version or alias. If you use a qualifier, the invoker must use the full Amazon Resource Name (ARN) of that version or alias to invoke the function. Note: Lambda does not support adding policies to version $LATEST.
 *
 * To grant permission to another account, specify the account ID as the `Principal`. To grant permission to an organization defined in Organizations, specify the organization ID as the `PrincipalOrgID`. For Amazon Web Services services, the principal is a domain-style identifier that the service defines, such as `s3.amazonaws.com` or `sns.amazonaws.com`. For Amazon Web Services services, you can also specify the ARN of the associated resource as the `SourceArn`. If you grant permission to a service principal without specifying the source, other accounts could potentially configure resources in their account to invoke your Lambda function.
 *
 * This operation adds a statement to a resource-based permissions policy for the function. For more information about function policies, see Using resource-based policies for Lambda.
 */
export const addPermission: API.OperationMethod<
  AddPermissionRequest,
  AddPermissionResponse,
  AddPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddPermissionRequest,
  output: AddPermissionResponse,
  errors: [
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddPermission",
}));

export type CheckpointDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Saves the progress of a durable function execution during runtime. This API is used by the Lambda durable functions SDK to checkpoint completed steps and schedule asynchronous operations. You typically don't need to call this API directly as the SDK handles checkpointing automatically.
 *
 * Each checkpoint operation consumes the current checkpoint token and returns a new one for the next checkpoint. This ensures that checkpoints are applied in the correct order and prevents duplicate or out-of-order state updates.
 */
export const checkpointDurableExecution: API.OperationMethod<
  CheckpointDurableExecutionRequest,
  CheckpointDurableExecutionResponse,
  CheckpointDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckpointDurableExecutionRequest,
  output: CheckpointDurableExecutionResponse,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckpointDurableExecution",
}));

export type CreateAliasError =
  | AliasLimitExceededException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates an alias for a Lambda function version. Use aliases to provide clients with a function identifier that you can update to invoke a different version.
 *
 * You can also map an alias to split invocation requests between two versions. Use the `RoutingConfig` parameter to specify a second version and the percentage of invocation requests that it receives.
 */
export const createAlias: API.OperationMethod<
  CreateAliasRequest,
  AliasConfiguration,
  CreateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAliasRequest,
  output: AliasConfiguration,
  errors: [
    AliasLimitExceededException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAlias",
}));

export type CreateCapacityProviderError =
  | CapacityProviderLimitExceededException
  | InvalidParameterValueException
  | ResourceConflictException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a capacity provider that manages compute resources for Lambda functions
 */
export const createCapacityProvider: API.OperationMethod<
  CreateCapacityProviderRequest,
  CreateCapacityProviderResponse,
  CreateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCapacityProviderRequest,
  output: CreateCapacityProviderResponse,
  errors: [
    CapacityProviderLimitExceededException,
    InvalidParameterValueException,
    ResourceConflictException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityProvider",
}));

export type CreateCodeSigningConfigError =
  | InvalidParameterValueException
  | ServiceException
  | CommonErrors;
/**
 * Creates a code signing configuration. A code signing configuration defines a list of allowed signing profiles and defines the code-signing validation policy (action to be taken if deployment validation checks fail).
 */
export const createCodeSigningConfig: API.OperationMethod<
  CreateCodeSigningConfigRequest,
  CreateCodeSigningConfigResponse,
  CreateCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCodeSigningConfigRequest,
  output: CreateCodeSigningConfigResponse,
  errors: [InvalidParameterValueException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeSigningConfig",
}));

export type CreateEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ResourceInUseException
  | CommonErrors;
/**
 * Creates a mapping between an event source and an Lambda function. Lambda reads items from the event source and invokes the function.
 *
 * For details about how to configure different event sources, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 *
 * The following error handling options are available for stream sources (DynamoDB, Kinesis, Amazon MSK, and self-managed Apache Kafka):
 *
 * - `BisectBatchOnFunctionError` – If the function returns an error, split the batch in two and retry.
 *
 * - `MaximumRecordAgeInSeconds` – Discard records older than the specified age. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires
 *
 * - `MaximumRetryAttempts` – Discard records after the specified number of retries. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires.
 *
 * - `OnFailure` – Send discarded records to an Amazon SQS queue, Amazon SNS topic, Kafka topic, or Amazon S3 bucket. For more information, see Adding a destination.
 *
 * The following option is available only for DynamoDB and Kinesis event sources:
 *
 * - `ParallelizationFactor` – Process multiple batches from each shard concurrently.
 *
 * For information about which configuration parameters apply to each event source, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 */
export const createEventSourceMapping: API.OperationMethod<
  CreateEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  CreateEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventSourceMappingRequest,
  output: EventSourceMappingConfiguration,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventSourceMapping",
}));

export type CreateFunctionError =
  | CodeSigningConfigNotFoundException
  | CodeStorageExceededException
  | CodeVerificationFailedException
  | FunctionVersionsPerCapacityProviderLimitExceededException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Lambda function. To create a function, you need a deployment package and an execution role. The deployment package is a .zip file archive or container image that contains your function code. The execution role grants the function permission to use Amazon Web Services services, such as Amazon CloudWatch Logs for log streaming and X-Ray for request tracing.
 *
 * If the deployment package is a container image, then you set the package type to `Image`. For a container image, the code property must include the URI of a container image in the Amazon ECR registry. You do not need to specify the handler and runtime properties.
 *
 * If the deployment package is a .zip file archive, then you set the package type to `Zip`. For a .zip file archive, the code property specifies the location of the .zip file. You must also specify the handler and runtime properties. The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64`). If you do not specify the architecture, then the default value is `x86-64`.
 *
 * When you create a function, Lambda provisions an instance of the function and its supporting resources. If your function connects to a VPC, this process can take a minute or so. During this time, you can't invoke or modify the function. The `State`, `StateReason`, and `StateReasonCode` fields in the response from GetFunctionConfiguration indicate when the function is ready to invoke. For more information, see Lambda function states.
 *
 * A function has an unpublished version, and can have published versions and aliases. The unpublished version changes when you update your function's code and configuration. A published version is a snapshot of your function code and configuration that can't be changed. An alias is a named resource that maps to a version, and can be changed to map to a different version. Use the `Publish` parameter to create version `1` of your function from its initial configuration.
 *
 * The other parameters let you configure version-specific and function-level settings. You can modify version-specific settings later with UpdateFunctionConfiguration. Function-level settings apply to both the unpublished and published versions of the function, and include tags (TagResource) and per-function concurrency limits (PutFunctionConcurrency).
 *
 * You can use code signing if your deployment package is a .zip file archive. To enable code signing for this function, specify the ARN of a code-signing configuration. When a user attempts to deploy a code package with UpdateFunctionCode, Lambda checks that the code package has a valid signature from a trusted publisher. The code-signing configuration includes set of signing profiles, which define the trusted publishers for this function.
 *
 * If another Amazon Web Services account or an Amazon Web Services service invokes your function, use AddPermission to grant permission by creating a resource-based Identity and Access Management (IAM) policy. You can grant permissions at the function level, on a version, or on an alias.
 *
 * To invoke your function directly, use Invoke. To invoke your function in response to events in other Amazon Web Services services, create an event source mapping (CreateEventSourceMapping), or configure a function trigger in the other service. For more information, see Invoking Lambda functions.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest,
  FunctionConfiguration,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFunctionRequest,
  output: FunctionConfiguration,
  errors: [
    CodeSigningConfigNotFoundException,
    CodeStorageExceededException,
    CodeVerificationFailedException,
    FunctionVersionsPerCapacityProviderLimitExceededException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
}));

export type CreateFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates a Lambda function URL with the specified configuration parameters. A function URL is a dedicated HTTP(S) endpoint that you can use to invoke your function.
 */
export const createFunctionUrlConfig: API.OperationMethod<
  CreateFunctionUrlConfigRequest,
  CreateFunctionUrlConfigResponse,
  CreateFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFunctionUrlConfigRequest,
  output: CreateFunctionUrlConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunctionUrlConfig",
}));

export type DeleteAliasError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | CommonErrors;
/**
 * Deletes a Lambda function alias.
 */
export const deleteAlias: API.OperationMethod<
  DeleteAliasRequest,
  DeleteAliasResponse,
  DeleteAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAliasRequest,
  output: DeleteAliasResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlias",
}));

export type DeleteCapacityProviderError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a capacity provider. You cannot delete a capacity provider that is currently being used by Lambda functions.
 */
export const deleteCapacityProvider: API.OperationMethod<
  DeleteCapacityProviderRequest,
  DeleteCapacityProviderResponse,
  DeleteCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCapacityProviderRequest,
  output: DeleteCapacityProviderResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityProvider",
}));

export type DeleteCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the code signing configuration. You can delete the code signing configuration only if no function is using it.
 */
export const deleteCodeSigningConfig: API.OperationMethod<
  DeleteCodeSigningConfigRequest,
  DeleteCodeSigningConfigResponse,
  DeleteCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCodeSigningConfigRequest,
  output: DeleteCodeSigningConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCodeSigningConfig",
}));

export type DeleteEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an event source mapping. You can get the identifier of a mapping from the output of ListEventSourceMappings.
 *
 * When you delete an event source mapping, it enters a `Deleting` state and might not be completely deleted for several seconds.
 */
export const deleteEventSourceMapping: API.OperationMethod<
  DeleteEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  DeleteEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventSourceMappingRequest,
  output: EventSourceMappingConfiguration,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventSourceMapping",
}));

export type DeleteFunctionError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a Lambda function. To delete a specific function version, use the `Qualifier` parameter. Otherwise, all versions and aliases are deleted. This doesn't require the user to have explicit permissions for DeleteAlias.
 *
 * A deleted Lambda function cannot be recovered. Ensure that you specify the correct function name and version before deleting.
 *
 * To delete Lambda event source mappings that invoke a function, use DeleteEventSourceMapping. For Amazon Web Services services and resources that invoke your function directly, delete the trigger in the service where you originally configured it.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionRequest,
  output: DeleteFunctionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
}));

export type DeleteFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the code signing configuration from the function.
 */
export const deleteFunctionCodeSigningConfig: API.OperationMethod<
  DeleteFunctionCodeSigningConfigRequest,
  DeleteFunctionCodeSigningConfigResponse,
  DeleteFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionCodeSigningConfigRequest,
  output: DeleteFunctionCodeSigningConfigResponse,
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionCodeSigningConfig",
}));

export type DeleteFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes a concurrent execution limit from a function.
 */
export const deleteFunctionConcurrency: API.OperationMethod<
  DeleteFunctionConcurrencyRequest,
  DeleteFunctionConcurrencyResponse,
  DeleteFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionConcurrencyRequest,
  output: DeleteFunctionConcurrencyResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionConcurrency",
}));

export type DeleteFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const deleteFunctionEventInvokeConfig: API.OperationMethod<
  DeleteFunctionEventInvokeConfigRequest,
  DeleteFunctionEventInvokeConfigResponse,
  DeleteFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionEventInvokeConfigRequest,
  output: DeleteFunctionEventInvokeConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionEventInvokeConfig",
}));

export type DeleteFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes a Lambda function URL. When you delete a function URL, you can't recover it. Creating a new function URL results in a different URL address.
 */
export const deleteFunctionUrlConfig: API.OperationMethod<
  DeleteFunctionUrlConfigRequest,
  DeleteFunctionUrlConfigResponse,
  DeleteFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionUrlConfigRequest,
  output: DeleteFunctionUrlConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunctionUrlConfig",
}));

export type DeleteLayerVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes a version of an Lambda layer. Deleted versions can no longer be viewed or added to functions. To avoid breaking functions, a copy of the version remains in Lambda until no functions refer to it.
 */
export const deleteLayerVersion: API.OperationMethod<
  DeleteLayerVersionRequest,
  DeleteLayerVersionResponse,
  DeleteLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLayerVersionRequest,
  output: DeleteLayerVersionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLayerVersion",
}));

export type DeleteProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Deletes the provisioned concurrency configuration for a function.
 */
export const deleteProvisionedConcurrencyConfig: API.OperationMethod<
  DeleteProvisionedConcurrencyConfigRequest,
  DeleteProvisionedConcurrencyConfigResponse,
  DeleteProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProvisionedConcurrencyConfigRequest,
  output: DeleteProvisionedConcurrencyConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProvisionedConcurrencyConfig",
}));

export type DeleteResourcePolicyError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a resource-based policy from a Lambda resource.
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
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type GetAccountSettingsError =
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves details about your account's limits and usage in an Amazon Web Services Region.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsResponse,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSettingsRequest,
  output: GetAccountSettingsResponse,
  errors: [ServiceException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetAliasError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about a Lambda function alias.
 */
export const getAlias: API.OperationMethod<
  GetAliasRequest,
  AliasConfiguration,
  GetAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAliasRequest,
  output: AliasConfiguration,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlias",
}));

export type GetCapacityProviderError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a specific capacity provider, including its configuration, state, and associated resources.
 */
export const getCapacityProvider: API.OperationMethod<
  GetCapacityProviderRequest,
  GetCapacityProviderResponse,
  GetCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCapacityProviderRequest,
  output: GetCapacityProviderResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityProvider",
}));

export type GetCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns information about the specified code signing configuration.
 */
export const getCodeSigningConfig: API.OperationMethod<
  GetCodeSigningConfigRequest,
  GetCodeSigningConfigResponse,
  GetCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCodeSigningConfigRequest,
  output: GetCodeSigningConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodeSigningConfig",
}));

export type GetDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific durable execution, including its current status, input payload, result or error information, and execution metadata such as start time and usage statistics.
 */
export const getDurableExecution: API.OperationMethod<
  GetDurableExecutionRequest,
  GetDurableExecutionResponse,
  GetDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDurableExecutionRequest,
  output: GetDurableExecutionResponse,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecution",
}));

export type GetDurableExecutionHistoryError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the execution history for a durable execution, showing all the steps, callbacks, and events that occurred during the execution. This provides a detailed audit trail of the execution's progress over time.
 *
 * The history is available while the execution is running and for a retention period after it completes (1-90 days, default 30 days). You can control whether to include execution data such as step results and callback payloads.
 */
export const getDurableExecutionHistory: API.PaginatedOperationMethod<
  GetDurableExecutionHistoryRequest,
  GetDurableExecutionHistoryResponse,
  GetDurableExecutionHistoryError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDurableExecutionHistoryRequest,
  output: GetDurableExecutionHistoryResponse,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecutionHistory",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Events",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetDurableExecutionStateError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current execution state required for the replay process during durable function execution. This API is used by the Lambda durable functions SDK to get state information needed for replay. You typically don't need to call this API directly as the SDK handles state management automatically.
 *
 * The response contains operations ordered by start sequence number in ascending order. Completed operations with children don't include child operation details since they don't need to be replayed.
 */
export const getDurableExecutionState: API.PaginatedOperationMethod<
  GetDurableExecutionStateRequest,
  GetDurableExecutionStateResponse,
  GetDurableExecutionStateError,
  Credentials | HttpClient.HttpClient,
  Operation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDurableExecutionStateRequest,
  output: GetDurableExecutionStateResponse,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDurableExecutionState",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Operations",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type GetEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about an event source mapping. You can get the identifier of a mapping from the output of ListEventSourceMappings.
 */
export const getEventSourceMapping: API.OperationMethod<
  GetEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  GetEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventSourceMappingRequest,
  output: EventSourceMappingConfiguration,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventSourceMapping",
}));

export type GetFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the function or function version, with a link to download the deployment package that's valid for 10 minutes. If you specify a function version, only details that are specific to that version are returned.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionRequest,
  output: GetFunctionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
}));

export type GetFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the code signing configuration for the specified function.
 */
export const getFunctionCodeSigningConfig: API.OperationMethod<
  GetFunctionCodeSigningConfigRequest,
  GetFunctionCodeSigningConfigResponse,
  GetFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionCodeSigningConfigRequest,
  output: GetFunctionCodeSigningConfigResponse,
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionCodeSigningConfig",
}));

export type GetFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns details about the reserved concurrency configuration for a function. To set a concurrency limit for a function, use PutFunctionConcurrency.
 */
export const getFunctionConcurrency: API.OperationMethod<
  GetFunctionConcurrencyRequest,
  GetFunctionConcurrencyResponse,
  GetFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionConcurrencyRequest,
  output: GetFunctionConcurrencyResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionConcurrency",
}));

export type GetFunctionConfigurationError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the version-specific settings of a Lambda function or version. The output includes only options that can vary between versions of a function. To modify these settings, use UpdateFunctionConfiguration.
 *
 * To get all of a function's details, including function-level settings, use GetFunction.
 */
export const getFunctionConfiguration: API.OperationMethod<
  GetFunctionConfigurationRequest,
  FunctionConfiguration,
  GetFunctionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionConfigurationRequest,
  output: FunctionConfiguration,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionConfiguration",
}));

export type GetFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const getFunctionEventInvokeConfig: API.OperationMethod<
  GetFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  GetFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionEventInvokeConfigRequest,
  output: FunctionEventInvokeConfig,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionEventInvokeConfig",
}));

export type GetFunctionRecursionConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns your function's recursive loop detection configuration.
 */
export const getFunctionRecursionConfig: API.OperationMethod<
  GetFunctionRecursionConfigRequest,
  GetFunctionRecursionConfigResponse,
  GetFunctionRecursionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionRecursionConfigRequest,
  output: GetFunctionRecursionConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionRecursionConfig",
}));

export type GetFunctionScalingConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the scaling configuration for a Lambda Managed Instances function.
 */
export const getFunctionScalingConfig: API.OperationMethod<
  GetFunctionScalingConfigRequest,
  GetFunctionScalingConfigResponse,
  GetFunctionScalingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionScalingConfigRequest,
  output: GetFunctionScalingConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionScalingConfig",
}));

export type GetFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details about a Lambda function URL.
 */
export const getFunctionUrlConfig: API.OperationMethod<
  GetFunctionUrlConfigRequest,
  GetFunctionUrlConfigResponse,
  GetFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionUrlConfigRequest,
  output: GetFunctionUrlConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunctionUrlConfig",
}));

export type GetLayerVersionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns information about a version of an Lambda layer, with a link to download the layer archive that's valid for 10 minutes.
 */
export const getLayerVersion: API.OperationMethod<
  GetLayerVersionRequest,
  GetLayerVersionResponse,
  GetLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLayerVersionRequest,
  output: GetLayerVersionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersion",
}));

export type GetLayerVersionByArnError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a version of an Lambda layer, with a link to download the layer archive that's valid for 10 minutes.
 */
export const getLayerVersionByArn: API.OperationMethod<
  GetLayerVersionByArnRequest,
  GetLayerVersionResponse,
  GetLayerVersionByArnError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLayerVersionByArnRequest,
  output: GetLayerVersionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersionByArn",
}));

export type GetLayerVersionPolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns the permission policy for a version of an Lambda layer. For more information, see AddLayerVersionPermission.
 */
export const getLayerVersionPolicy: API.OperationMethod<
  GetLayerVersionPolicyRequest,
  GetLayerVersionPolicyResponse,
  GetLayerVersionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLayerVersionPolicyRequest,
  output: GetLayerVersionPolicyResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLayerVersionPolicy",
}));

export type GetPolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the resource-based IAM policy for a function, version, or alias.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ProvisionedConcurrencyConfigNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves the provisioned concurrency configuration for a function's alias or version.
 */
export const getProvisionedConcurrencyConfig: API.OperationMethod<
  GetProvisionedConcurrencyConfigRequest,
  GetProvisionedConcurrencyConfigResponse,
  GetProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProvisionedConcurrencyConfigRequest,
  output: GetProvisionedConcurrencyConfigResponse,
  errors: [
    InvalidParameterValueException,
    ProvisionedConcurrencyConfigNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedConcurrencyConfig",
}));

export type GetResourcePolicyError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to a Lambda resource.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetRuntimeManagementConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the runtime management configuration for a function's version. If the runtime update mode is **Manual**, this includes the ARN of the runtime version and the runtime update mode. If the runtime update mode is **Auto** or **Function update**, this includes the runtime update mode and `null` is returned for the ARN. For more information, see Runtime updates.
 */
export const getRuntimeManagementConfig: API.OperationMethod<
  GetRuntimeManagementConfigRequest,
  GetRuntimeManagementConfigResponse,
  GetRuntimeManagementConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuntimeManagementConfigRequest,
  output: GetRuntimeManagementConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuntimeManagementConfig",
}));

export type InvokeError =
  | CodeArtifactUserDeletedException
  | CodeArtifactUserFailedException
  | CodeArtifactUserPendingException
  | DurableExecutionAlreadyStartedException
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | ENINotReadyException
  | InvalidParameterValueException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | InvalidZipFileException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ModeNotSupportedException
  | NoPublishedVersionException
  | RecursiveInvocationException
  | RequestTooLargeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | SerializedRequestEntityTooLargeException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | TooManyRequestsException
  | UnsupportedMediaTypeException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Invokes a Lambda function. You can invoke a function synchronously (and wait for the response), or asynchronously. By default, Lambda invokes your function synchronously (i.e. the`InvocationType` is `RequestResponse`). To invoke a function asynchronously, set `InvocationType` to `Event`. Lambda passes the `ClientContext` object to your function for synchronous invocations only.
 *
 * For synchronous invocations, the maximum payload size is 6 MB. For asynchronous invocations, the maximum payload size is 1 MB.
 *
 * For synchronous invocation, details about the function response, including errors, are included in the response body and headers. For either invocation type, you can find more information in the execution log and trace.
 *
 * When an error occurs, your function may be invoked multiple times. Retry behavior varies by error type, client, event source, and invocation type. For example, if you invoke a function asynchronously and it returns an error, Lambda executes the function up to two more times. For more information, see Error handling and automatic retries in Lambda.
 *
 * For asynchronous invocation, Lambda adds events to a queue before sending them to your function. If your function does not have enough capacity to keep up with the queue, events may be lost. Occasionally, your function may receive the same event multiple times, even if no error occurs. To retain events that were not processed, configure your function with a dead-letter queue.
 *
 * The status code in the API response doesn't reflect function errors. Error codes are reserved for errors that prevent your function from executing, such as permissions errors, quota errors, or issues with your function's code and configuration. For example, Lambda returns `TooManyRequestsException` if running the function would cause you to exceed a concurrency limit at either the account level (`ConcurrentInvocationLimitExceeded`) or function level (`ReservedFunctionConcurrentInvocationLimitExceeded`).
 *
 * For functions with a long timeout, your client might disconnect during synchronous invocation while it waits for a response. Configure your HTTP client, SDK, firewall, proxy, or operating system to allow for long connections with timeout or keep-alive settings.
 *
 * This operation requires permission for the lambda:InvokeFunction action. For details on how to set up permissions for cross-account invocations, see Granting function access to other accounts.
 */
export const invoke: API.OperationMethod<
  InvocationRequest,
  InvocationResponse,
  InvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvocationRequest,
  output: InvocationResponse,
  errors: [
    CodeArtifactUserDeletedException,
    CodeArtifactUserFailedException,
    CodeArtifactUserPendingException,
    DurableExecutionAlreadyStartedException,
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    ENINotReadyException,
    InvalidParameterValueException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    InvalidZipFileException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ModeNotSupportedException,
    NoPublishedVersionException,
    RecursiveInvocationException,
    RequestTooLargeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    SerializedRequestEntityTooLargeException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
    TooManyRequestsException,
    UnsupportedMediaTypeException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Invoke",
}));

export type InvokeAsyncError =
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ModeNotSupportedException
  | ResourceConflictException
  | ResourceNotFoundException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | CommonErrors;
/**
 * For asynchronous function invocation, use Invoke.
 *
 * Invokes a function asynchronously.
 *
 * The payload limit is 256KB. For larger payloads, for up to 1MB, use Invoke.
 *
 * If you do use the InvokeAsync action, note that it doesn't support the use of X-Ray active tracing. Trace ID is not propagated to the function, even if X-Ray active tracing is turned on.
 */
export const invokeAsync: API.OperationMethod<
  InvokeAsyncRequest,
  InvokeAsyncResponse,
  InvokeAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeAsyncRequest,
  output: InvokeAsyncResponse,
  errors: [
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ModeNotSupportedException,
    ResourceConflictException,
    ResourceNotFoundException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAsync",
}));

export type InvokeWithResponseStreamError =
  | EC2AccessDeniedException
  | EC2ThrottledException
  | EC2UnexpectedException
  | EFSIOException
  | EFSMountConnectivityException
  | EFSMountFailureException
  | EFSMountTimeoutException
  | ENILimitReachedException
  | InvalidParameterValueException
  | InvalidRequestContentException
  | InvalidRuntimeException
  | InvalidSecurityGroupIDException
  | InvalidSubnetIDException
  | InvalidZipFileException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | NoPublishedVersionException
  | RecursiveInvocationException
  | RequestTooLargeException
  | ResourceConflictException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | S3FilesMountConnectivityException
  | S3FilesMountFailureException
  | S3FilesMountTimeoutException
  | SerializedRequestEntityTooLargeException
  | ServiceException
  | ServiceQuotaExceededException
  | SnapStartException
  | SnapStartNotReadyException
  | SnapStartRegenerationFailureException
  | SnapStartTimeoutException
  | SubnetIPAddressLimitReachedException
  | TooManyRequestsException
  | UnsupportedMediaTypeException
  | CommonErrors;
/**
 * Configure your Lambda functions to stream response payloads back to clients. For more information, see Configuring a Lambda function to stream responses.
 *
 * This operation requires permission for the lambda:InvokeFunction action. For details on how to set up permissions for cross-account invocations, see Granting function access to other accounts.
 */
export const invokeWithResponseStream: API.OperationMethod<
  InvokeWithResponseStreamRequest,
  InvokeWithResponseStreamResponse,
  InvokeWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeWithResponseStreamRequest,
  output: InvokeWithResponseStreamResponse,
  errors: [
    EC2AccessDeniedException,
    EC2ThrottledException,
    EC2UnexpectedException,
    EFSIOException,
    EFSMountConnectivityException,
    EFSMountFailureException,
    EFSMountTimeoutException,
    ENILimitReachedException,
    InvalidParameterValueException,
    InvalidRequestContentException,
    InvalidRuntimeException,
    InvalidSecurityGroupIDException,
    InvalidSubnetIDException,
    InvalidZipFileException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    NoPublishedVersionException,
    RecursiveInvocationException,
    RequestTooLargeException,
    ResourceConflictException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    S3FilesMountConnectivityException,
    S3FilesMountFailureException,
    S3FilesMountTimeoutException,
    SerializedRequestEntityTooLargeException,
    ServiceException,
    ServiceQuotaExceededException,
    SnapStartException,
    SnapStartNotReadyException,
    SnapStartRegenerationFailureException,
    SnapStartTimeoutException,
    SubnetIPAddressLimitReachedException,
    TooManyRequestsException,
    UnsupportedMediaTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeWithResponseStream",
}));

export type ListAliasesError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of aliases for a Lambda function.
 */
export const listAliases: API.PaginatedOperationMethod<
  ListAliasesRequest,
  ListAliasesResponse,
  ListAliasesError,
  Credentials | HttpClient.HttpClient,
  AliasConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAliasesRequest,
  output: ListAliasesResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAliases",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Aliases",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCapacityProvidersError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of capacity providers in your account.
 */
export const listCapacityProviders: API.PaginatedOperationMethod<
  ListCapacityProvidersRequest,
  ListCapacityProvidersResponse,
  ListCapacityProvidersError,
  Credentials | HttpClient.HttpClient,
  CapacityProvider
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCapacityProvidersRequest,
  output: ListCapacityProvidersResponse,
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityProviders",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "CapacityProviders",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCodeSigningConfigsError =
  | InvalidParameterValueException
  | ServiceException
  | CommonErrors;
/**
 * Returns a list of code signing configurations. A request returns up to 10,000 configurations per call. You can use the `MaxItems` parameter to return fewer configurations per call.
 */
export const listCodeSigningConfigs: API.PaginatedOperationMethod<
  ListCodeSigningConfigsRequest,
  ListCodeSigningConfigsResponse,
  ListCodeSigningConfigsError,
  Credentials | HttpClient.HttpClient,
  CodeSigningConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCodeSigningConfigsRequest,
  output: ListCodeSigningConfigsResponse,
  errors: [InvalidParameterValueException, ServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeSigningConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "CodeSigningConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListDurableExecutionsByFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of durable executions for a specified Lambda function. You can filter the results by execution name, status, and start time range. This API supports pagination for large result sets.
 */
export const listDurableExecutionsByFunction: API.PaginatedOperationMethod<
  ListDurableExecutionsByFunctionRequest,
  ListDurableExecutionsByFunctionResponse,
  ListDurableExecutionsByFunctionError,
  Credentials | HttpClient.HttpClient,
  Execution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDurableExecutionsByFunctionRequest,
  output: ListDurableExecutionsByFunctionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDurableExecutionsByFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "DurableExecutions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListEventSourceMappingsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists event source mappings. Specify an `EventSourceArn` to show only event source mappings for a single event source.
 */
export const listEventSourceMappings: API.PaginatedOperationMethod<
  ListEventSourceMappingsRequest,
  ListEventSourceMappingsResponse,
  ListEventSourceMappingsError,
  Credentials | HttpClient.HttpClient,
  EventSourceMappingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventSourceMappingsRequest,
  output: ListEventSourceMappingsResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventSourceMappings",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "EventSourceMappings",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionEventInvokeConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves a list of configurations for asynchronous invocation for a function.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const listFunctionEventInvokeConfigs: API.PaginatedOperationMethod<
  ListFunctionEventInvokeConfigsRequest,
  ListFunctionEventInvokeConfigsResponse,
  ListFunctionEventInvokeConfigsError,
  Credentials | HttpClient.HttpClient,
  FunctionEventInvokeConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionEventInvokeConfigsRequest,
  output: ListFunctionEventInvokeConfigsResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionEventInvokeConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionEventInvokeConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionsError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of Lambda functions, with the version-specific configuration of each. Lambda returns up to 50 functions per call.
 *
 * Set `FunctionVersion` to `ALL` to include all published versions of each function in addition to the unpublished version.
 *
 * The `ListFunctions` operation returns a subset of the FunctionConfiguration fields. To get the additional fields (State, StateReasonCode, StateReason, LastUpdateStatus, LastUpdateStatusReason, LastUpdateStatusReasonCode, RuntimeVersionConfig) for a function or version, use GetFunction.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionsRequest,
  output: ListFunctionsResponse,
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Functions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionsByCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * List the functions that use the specified code signing configuration. You can use this method prior to deleting a code signing configuration, to verify that no functions are using it.
 */
export const listFunctionsByCodeSigningConfig: API.PaginatedOperationMethod<
  ListFunctionsByCodeSigningConfigRequest,
  ListFunctionsByCodeSigningConfigResponse,
  ListFunctionsByCodeSigningConfigError,
  Credentials | HttpClient.HttpClient,
  FunctionArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionsByCodeSigningConfigRequest,
  output: ListFunctionsByCodeSigningConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionsByCodeSigningConfig",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionArns",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionUrlConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of Lambda function URLs for the specified function.
 */
export const listFunctionUrlConfigs: API.PaginatedOperationMethod<
  ListFunctionUrlConfigsRequest,
  ListFunctionUrlConfigsResponse,
  ListFunctionUrlConfigsError,
  Credentials | HttpClient.HttpClient,
  FunctionUrlConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionUrlConfigsRequest,
  output: ListFunctionUrlConfigsResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionUrlConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionUrlConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListFunctionVersionsByCapacityProviderError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of function versions that are configured to use a specific capacity provider.
 */
export const listFunctionVersionsByCapacityProvider: API.PaginatedOperationMethod<
  ListFunctionVersionsByCapacityProviderRequest,
  ListFunctionVersionsByCapacityProviderResponse,
  ListFunctionVersionsByCapacityProviderError,
  Credentials | HttpClient.HttpClient,
  FunctionVersionsByCapacityProviderListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionVersionsByCapacityProviderRequest,
  output: ListFunctionVersionsByCapacityProviderResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctionVersionsByCapacityProvider",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "FunctionVersions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListLayersError =
  | InvalidParameterValueException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists Lambda layers and shows information about the latest version of each. Specify a runtime identifier to list only layers that indicate that they're compatible with that runtime. Specify a compatible architecture to include only layers that are compatible with that instruction set architecture.
 */
export const listLayers: API.PaginatedOperationMethod<
  ListLayersRequest,
  ListLayersResponse,
  ListLayersError,
  Credentials | HttpClient.HttpClient,
  LayersListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLayersRequest,
  output: ListLayersResponse,
  errors: [
    InvalidParameterValueException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayers",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Layers",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListLayerVersionsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Lists the versions of an Lambda layer. Versions that have been deleted aren't listed. Specify a runtime identifier to list only versions that indicate that they're compatible with that runtime. Specify a compatible architecture to include only layer versions that are compatible with that architecture.
 */
export const listLayerVersions: API.PaginatedOperationMethod<
  ListLayerVersionsRequest,
  ListLayerVersionsResponse,
  ListLayerVersionsError,
  Credentials | HttpClient.HttpClient,
  LayerVersionsListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLayerVersionsRequest,
  output: ListLayerVersionsResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLayerVersions",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "LayerVersions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListProvisionedConcurrencyConfigsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Retrieves a list of provisioned concurrency configurations for a function.
 */
export const listProvisionedConcurrencyConfigs: API.PaginatedOperationMethod<
  ListProvisionedConcurrencyConfigsRequest,
  ListProvisionedConcurrencyConfigsResponse,
  ListProvisionedConcurrencyConfigsError,
  Credentials | HttpClient.HttpClient,
  ProvisionedConcurrencyConfigListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProvisionedConcurrencyConfigsRequest,
  output: ListProvisionedConcurrencyConfigsResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedConcurrencyConfigs",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "ProvisionedConcurrencyConfigs",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Returns a function, event source mapping, or code signing configuration's tags. You can also view function tags with GetFunction.
 */
export const listTags: API.OperationMethod<
  ListTagsRequest,
  ListTagsResponse,
  ListTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsRequest,
  output: ListTagsResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTags",
}));

export type ListVersionsByFunctionError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of versions, with the version-specific configuration of each. Lambda returns up to 50 versions per call.
 */
export const listVersionsByFunction: API.PaginatedOperationMethod<
  ListVersionsByFunctionRequest,
  ListVersionsByFunctionResponse,
  ListVersionsByFunctionError,
  Credentials | HttpClient.HttpClient,
  FunctionConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVersionsByFunctionRequest,
  output: ListVersionsByFunctionResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersionsByFunction",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "Versions",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type PublishLayerVersionError =
  | CodeStorageExceededException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates an Lambda layer from a ZIP archive. Each time you call `PublishLayerVersion` with the same layer name, a new version is created.
 *
 * Add layers to your function with CreateFunction or UpdateFunctionConfiguration.
 */
export const publishLayerVersion: API.OperationMethod<
  PublishLayerVersionRequest,
  PublishLayerVersionResponse,
  PublishLayerVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishLayerVersionRequest,
  output: PublishLayerVersionResponse,
  errors: [
    CodeStorageExceededException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishLayerVersion",
}));

export type PublishVersionError =
  | CodeStorageExceededException
  | FunctionVersionsPerCapacityProviderLimitExceededException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Creates a version from the current code and configuration of a function. Use versions to create a snapshot of your function code and configuration that doesn't change.
 *
 * Lambda doesn't publish a version if the function's configuration and code haven't changed since the last version. Use UpdateFunctionCode or UpdateFunctionConfiguration to update the function before publishing a version.
 *
 * Clients can invoke versions directly or with an alias. To create an alias, use CreateAlias.
 */
export const publishVersion: API.OperationMethod<
  PublishVersionRequest,
  FunctionConfiguration,
  PublishVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishVersionRequest,
  output: FunctionConfiguration,
  errors: [
    CodeStorageExceededException,
    FunctionVersionsPerCapacityProviderLimitExceededException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishVersion",
}));

export type PutFunctionCodeSigningConfigError =
  | CodeSigningConfigNotFoundException
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Update the code signing configuration for the function. Changes to the code signing configuration take effect the next time a user tries to deploy a code package to the function.
 */
export const putFunctionCodeSigningConfig: API.OperationMethod<
  PutFunctionCodeSigningConfigRequest,
  PutFunctionCodeSigningConfigResponse,
  PutFunctionCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFunctionCodeSigningConfigRequest,
  output: PutFunctionCodeSigningConfigResponse,
  errors: [
    CodeSigningConfigNotFoundException,
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionCodeSigningConfig",
}));

export type PutFunctionConcurrencyError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Sets the maximum number of simultaneous executions for a function, and reserves capacity for that concurrency level.
 *
 * Concurrency settings apply to the function as a whole, including all published versions and the unpublished version. Reserving concurrency both ensures that your function has capacity to process the specified number of events simultaneously, and prevents it from scaling beyond that level. Use GetFunction to see the current setting for a function.
 *
 * Use GetAccountSettings to see your Regional concurrency limit. You can reserve concurrency for as many functions as you like, as long as you leave at least 100 simultaneous executions unreserved for functions that aren't configured with a per-function limit. For more information, see Lambda function scaling.
 */
export const putFunctionConcurrency: API.OperationMethod<
  PutFunctionConcurrencyRequest,
  Concurrency,
  PutFunctionConcurrencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFunctionConcurrencyRequest,
  output: Concurrency,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionConcurrency",
}));

export type PutFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Configures options for asynchronous invocation on a function, version, or alias. If a configuration already exists for a function, version, or alias, this operation overwrites it. If you exclude any settings, they are removed. To set one option without affecting existing settings for other options, use UpdateFunctionEventInvokeConfig.
 *
 * By default, Lambda retries an asynchronous invocation twice if the function returns an error. It retains events in a queue for up to six hours. When an event fails all processing attempts or stays in the asynchronous invocation queue for too long, Lambda discards it. To retain discarded events, configure a dead-letter queue with UpdateFunctionConfiguration.
 *
 * To send an invocation record to a queue, topic, S3 bucket, function, or event bus, specify a destination. You can configure separate destinations for successful invocations (on-success) and events that fail all processing attempts (on-failure). You can configure destinations in addition to or instead of a dead-letter queue.
 *
 * S3 buckets are supported only for on-failure destinations. To retain records of successful invocations, use another destination type.
 */
export const putFunctionEventInvokeConfig: API.OperationMethod<
  PutFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  PutFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFunctionEventInvokeConfigRequest,
  output: FunctionEventInvokeConfig,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionEventInvokeConfig",
}));

export type PutFunctionRecursionConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Sets your function's recursive loop detection configuration.
 *
 * When you configure a Lambda function to output to the same service or resource that invokes the function, it's possible to create an infinite recursive loop. For example, a Lambda function might write a message to an Amazon Simple Queue Service (Amazon SQS) queue, which then invokes the same function. This invocation causes the function to write another message to the queue, which in turn invokes the function again.
 *
 * Lambda can detect certain types of recursive loops shortly after they occur. When Lambda detects a recursive loop and your function's recursive loop detection configuration is set to `Terminate`, it stops your function being invoked and notifies you.
 */
export const putFunctionRecursionConfig: API.OperationMethod<
  PutFunctionRecursionConfigRequest,
  PutFunctionRecursionConfigResponse,
  PutFunctionRecursionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFunctionRecursionConfigRequest,
  output: PutFunctionRecursionConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionRecursionConfig",
}));

export type PutFunctionScalingConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the scaling configuration for a Lambda Managed Instances function. The scaling configuration defines the minimum and maximum number of execution environments that can be provisioned for the function, allowing you to control scaling behavior and resource allocation.
 */
export const putFunctionScalingConfig: API.OperationMethod<
  PutFunctionScalingConfigRequest,
  PutFunctionScalingConfigResponse,
  PutFunctionScalingConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFunctionScalingConfigRequest,
  output: PutFunctionScalingConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunctionScalingConfig",
}));

export type PutProvisionedConcurrencyConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds a provisioned concurrency configuration to a function's alias or version.
 */
export const putProvisionedConcurrencyConfig: API.OperationMethod<
  PutProvisionedConcurrencyConfigRequest,
  PutProvisionedConcurrencyConfigResponse,
  PutProvisionedConcurrencyConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProvisionedConcurrencyConfigRequest,
  output: PutProvisionedConcurrencyConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProvisionedConcurrencyConfig",
}));

export type PutResourcePolicyError =
  | InvalidParameterValueException
  | PolicyLengthExceededException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a resource-based policy to a Lambda resource. Resource-based policies grant access to other Amazon Web Services accounts, organizations, or services. Resource-based policies apply to a single Lambda resource (for example, a function, function version, or function alias).
 *
 * This operation replaces any existing policy on the Lambda resource. If you previously added permissions using the AddPermission operation, the new policy overwrites those permissions.
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
    InvalidParameterValueException,
    PolicyLengthExceededException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutRuntimeManagementConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sets the runtime management configuration for a function's version. For more information, see Runtime updates.
 */
export const putRuntimeManagementConfig: API.OperationMethod<
  PutRuntimeManagementConfigRequest,
  PutRuntimeManagementConfigResponse,
  PutRuntimeManagementConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRuntimeManagementConfigRequest,
  output: PutRuntimeManagementConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRuntimeManagementConfig",
}));

export type RemoveLayerVersionPermissionError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes a statement from the permissions policy for a version of an Lambda layer. For more information, see AddLayerVersionPermission.
 */
export const removeLayerVersionPermission: API.OperationMethod<
  RemoveLayerVersionPermissionRequest,
  RemoveLayerVersionPermissionResponse,
  RemoveLayerVersionPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveLayerVersionPermissionRequest,
  output: RemoveLayerVersionPermissionResponse,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveLayerVersionPermission",
}));

export type RemovePermissionError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | PublicPolicyException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Revokes function-use permission from an Amazon Web Services service or another Amazon Web Services account. You can get the ID of the statement from the output of GetPolicy.
 */
export const removePermission: API.OperationMethod<
  RemovePermissionRequest,
  RemovePermissionResponse,
  RemovePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemovePermissionRequest,
  output: RemovePermissionResponse,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    PublicPolicyException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemovePermission",
}));

export type SendDurableExecutionCallbackFailureError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a failure response for a callback operation in a durable execution. Use this API when an external system cannot complete a callback operation successfully.
 */
export const sendDurableExecutionCallbackFailure: API.OperationMethod<
  SendDurableExecutionCallbackFailureRequest,
  SendDurableExecutionCallbackFailureResponse,
  SendDurableExecutionCallbackFailureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendDurableExecutionCallbackFailureRequest,
  output: SendDurableExecutionCallbackFailureResponse,
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackFailure",
}));

export type SendDurableExecutionCallbackHeartbeatError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a heartbeat signal for a long-running callback operation to prevent timeout. Use this API to extend the callback timeout period while the external operation is still in progress.
 */
export const sendDurableExecutionCallbackHeartbeat: API.OperationMethod<
  SendDurableExecutionCallbackHeartbeatRequest,
  SendDurableExecutionCallbackHeartbeatResponse,
  SendDurableExecutionCallbackHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendDurableExecutionCallbackHeartbeatRequest,
  output: SendDurableExecutionCallbackHeartbeatResponse,
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackHeartbeat",
}));

export type SendDurableExecutionCallbackSuccessError =
  | CallbackTimeoutException
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends a successful completion response for a callback operation in a durable execution. Use this API when an external system has successfully completed a callback operation.
 */
export const sendDurableExecutionCallbackSuccess: API.OperationMethod<
  SendDurableExecutionCallbackSuccessRequest,
  SendDurableExecutionCallbackSuccessResponse,
  SendDurableExecutionCallbackSuccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendDurableExecutionCallbackSuccessRequest,
  output: SendDurableExecutionCallbackSuccessResponse,
  errors: [
    CallbackTimeoutException,
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDurableExecutionCallbackSuccess",
}));

export type StopDurableExecutionError =
  | InvalidParameterValueException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running durable execution. The execution transitions to STOPPED status and cannot be resumed. Any in-progress operations are terminated.
 */
export const stopDurableExecution: API.OperationMethod<
  StopDurableExecutionRequest,
  StopDurableExecutionResponse,
  StopDurableExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDurableExecutionRequest,
  output: StopDurableExecutionResponse,
  errors: [
    InvalidParameterValueException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDurableExecution",
}));

export type TagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Adds tags to a function, event source mapping, or code signing configuration.
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
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Removes tags from a function, event source mapping, or code signing configuration.
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
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAliasError =
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates the configuration of a Lambda function alias.
 */
export const updateAlias: API.OperationMethod<
  UpdateAliasRequest,
  AliasConfiguration,
  UpdateAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAliasRequest,
  output: AliasConfiguration,
  errors: [
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAlias",
}));

export type UpdateCapacityProviderError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration of an existing capacity provider.
 */
export const updateCapacityProvider: API.OperationMethod<
  UpdateCapacityProviderRequest,
  UpdateCapacityProviderResponse,
  UpdateCapacityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCapacityProviderRequest,
  output: UpdateCapacityProviderResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityProvider",
}));

export type UpdateCodeSigningConfigError =
  | InvalidParameterValueException
  | ResourceNotFoundException
  | ServiceException
  | CommonErrors;
/**
 * Update the code signing configuration. Changes to the code signing configuration take effect the next time a user tries to deploy a code package to the function.
 */
export const updateCodeSigningConfig: API.OperationMethod<
  UpdateCodeSigningConfigRequest,
  UpdateCodeSigningConfigResponse,
  UpdateCodeSigningConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCodeSigningConfigRequest,
  output: UpdateCodeSigningConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceNotFoundException,
    ServiceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeSigningConfig",
}));

export type UpdateEventSourceMappingError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates an event source mapping. You can change the function that Lambda invokes, or pause invocation and resume later from the same location.
 *
 * For details about how to configure different event sources, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 *
 * The following error handling options are available for stream sources (DynamoDB, Kinesis, Amazon MSK, and self-managed Apache Kafka):
 *
 * - `BisectBatchOnFunctionError` – If the function returns an error, split the batch in two and retry.
 *
 * - `MaximumRecordAgeInSeconds` – Discard records older than the specified age. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires
 *
 * - `MaximumRetryAttempts` – Discard records after the specified number of retries. The default value is infinite (-1). When set to infinite (-1), failed records are retried until the record expires.
 *
 * - `OnFailure` – Send discarded records to an Amazon SQS queue, Amazon SNS topic, Kafka topic, or Amazon S3 bucket. For more information, see Adding a destination.
 *
 * The following option is available only for DynamoDB and Kinesis event sources:
 *
 * - `ParallelizationFactor` – Process multiple batches from each shard concurrently.
 *
 * For information about which configuration parameters apply to each event source, see the following topics.
 *
 * - Amazon DynamoDB Streams
 *
 * - Amazon Kinesis
 *
 * - Amazon SQS
 *
 * - Amazon MQ and RabbitMQ
 *
 * - Amazon MSK
 *
 * - Apache Kafka
 *
 * - Amazon DocumentDB
 */
export const updateEventSourceMapping: API.OperationMethod<
  UpdateEventSourceMappingRequest,
  EventSourceMappingConfiguration,
  UpdateEventSourceMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventSourceMappingRequest,
  output: EventSourceMappingConfiguration,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventSourceMapping",
}));

export type UpdateFunctionCodeError =
  | CodeSigningConfigNotFoundException
  | CodeStorageExceededException
  | CodeVerificationFailedException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates a Lambda function's code. If code signing is enabled for the function, the code package must be signed by a trusted publisher. For more information, see Configuring code signing for Lambda.
 *
 * If the function's package type is `Image`, then you must specify the code package in `ImageUri` as the URI of a container image in the Amazon ECR registry.
 *
 * If the function's package type is `Zip`, then you must specify the deployment package as a .zip file archive. Enter the Amazon S3 bucket and key of the code .zip file location. You can also provide the function code inline using the `ZipFile` field.
 *
 * The code in the deployment package must be compatible with the target instruction set architecture of the function (`x86-64` or `arm64`).
 *
 * The function's code is locked when you publish a version. You can't modify the code of a published version, only the unpublished version.
 *
 * For a function defined as a container image, Lambda resolves the image tag to an image digest. In Amazon ECR, if you update the image tag to a new image, Lambda does not automatically update the function.
 */
export const updateFunctionCode: API.OperationMethod<
  UpdateFunctionCodeRequest,
  FunctionConfiguration,
  UpdateFunctionCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFunctionCodeRequest,
  output: FunctionConfiguration,
  errors: [
    CodeSigningConfigNotFoundException,
    CodeStorageExceededException,
    CodeVerificationFailedException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionCode",
}));

export type UpdateFunctionConfigurationError =
  | CodeSigningConfigNotFoundException
  | CodeVerificationFailedException
  | InvalidCodeSignatureException
  | InvalidParameterValueException
  | PreconditionFailedException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Modify the version-specific settings of a Lambda function.
 *
 * When you update a function, Lambda provisions an instance of the function and its supporting resources. If your function connects to a VPC, this process can take a minute. During this time, you can't modify the function, but you can still invoke it. The `LastUpdateStatus`, `LastUpdateStatusReason`, and `LastUpdateStatusReasonCode` fields in the response from GetFunctionConfiguration indicate when the update is complete and the function is processing events with the new configuration. For more information, see Lambda function states.
 *
 * These settings can vary between versions of a function and are locked when you publish a version. You can't modify the configuration of a published version, only the unpublished version.
 *
 * To configure function concurrency, use PutFunctionConcurrency. To grant invoke permissions to an Amazon Web Services account or Amazon Web Services service, use AddPermission.
 */
export const updateFunctionConfiguration: API.OperationMethod<
  UpdateFunctionConfigurationRequest,
  FunctionConfiguration,
  UpdateFunctionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFunctionConfigurationRequest,
  output: FunctionConfiguration,
  errors: [
    CodeSigningConfigNotFoundException,
    CodeVerificationFailedException,
    InvalidCodeSignatureException,
    InvalidParameterValueException,
    PreconditionFailedException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionConfiguration",
}));

export type UpdateFunctionEventInvokeConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration for asynchronous invocation for a function, version, or alias.
 *
 * To configure options for asynchronous invocation, use PutFunctionEventInvokeConfig.
 */
export const updateFunctionEventInvokeConfig: API.OperationMethod<
  UpdateFunctionEventInvokeConfigRequest,
  FunctionEventInvokeConfig,
  UpdateFunctionEventInvokeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFunctionEventInvokeConfigRequest,
  output: FunctionEventInvokeConfig,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionEventInvokeConfig",
}));

export type UpdateFunctionUrlConfigError =
  | InvalidParameterValueException
  | ResourceConflictException
  | ResourceNotFoundException
  | ServiceException
  | TooManyRequestsException
  | RequestLimitExceeded
  | ParseError
  | CommonErrors;
/**
 * Updates the configuration for a Lambda function URL.
 */
export const updateFunctionUrlConfig: API.OperationMethod<
  UpdateFunctionUrlConfigRequest,
  UpdateFunctionUrlConfigResponse,
  UpdateFunctionUrlConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFunctionUrlConfigRequest,
  output: UpdateFunctionUrlConfigResponse,
  errors: [
    InvalidParameterValueException,
    ResourceConflictException,
    ResourceNotFoundException,
    ServiceException,
    TooManyRequestsException,
    RequestLimitExceeded,
    ParseError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunctionUrlConfig",
}));
