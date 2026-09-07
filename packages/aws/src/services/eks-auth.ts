import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "EKS Auth",
  serviceShapeName: "EKSAuthFrontend",
});
const auth = T.AwsAuthSigv4({ name: "eks-auth" });
const ver = T.ServiceVersion("2023-11-26");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseFIPS = false, Endpoint } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://eks-auth-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://eks-auth.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://eks-auth-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        return e(
          `https://eks-auth.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAuthError) {}
export class ExpiredTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTokenException>()(
    "ExpiredTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()(
    "InvalidTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type ClusterName = string;
export type JwtToken = string | redacted.Redacted<string>;
export interface AssumeRoleForPodIdentityRequest {
  clusterName: string;
  token: string | redacted.Redacted<string>;
}
export const AssumeRoleForPodIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterName: S.String.pipe(T.HttpLabel("clusterName")),
    token: SensitiveString,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/clusters/{clusterName}/assume-role-for-pod-identity",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeRoleForPodIdentityRequest",
}) as any as S.Schema<AssumeRoleForPodIdentityRequest>;
export interface Subject {
  namespace: string;
  serviceAccount: string;
}
export const Subject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ namespace: S.String, serviceAccount: S.String }),
).annotate({ identifier: "Subject" }) as any as S.Schema<Subject>;
export interface PodIdentityAssociation {
  associationArn: string;
  associationId: string;
}
export const PodIdentityAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ associationArn: S.String, associationId: S.String }),
).annotate({
  identifier: "PodIdentityAssociation",
}) as any as S.Schema<PodIdentityAssociation>;
export interface AssumedRoleUser {
  arn: string;
  assumeRoleId: string;
}
export const AssumedRoleUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, assumeRoleId: S.String }),
).annotate({
  identifier: "AssumedRoleUser",
}) as any as S.Schema<AssumedRoleUser>;
export interface Credentials {
  sessionToken: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  accessKeyId: string;
  expiration: Date;
}
export const Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionToken: SensitiveString,
    secretAccessKey: SensitiveString,
    accessKeyId: S.String,
    expiration: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Credentials" }) as any as S.Schema<Credentials>;
export interface AssumeRoleForPodIdentityResponse {
  subject: Subject;
  audience: string;
  podIdentityAssociation: PodIdentityAssociation;
  assumedRoleUser: AssumedRoleUser;
  credentials: Credentials;
}
export const AssumeRoleForPodIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subject: Subject,
    audience: S.String,
    podIdentityAssociation: PodIdentityAssociation,
    assumedRoleUser: AssumedRoleUser,
    credentials: Credentials,
  }),
).annotate({
  identifier: "AssumeRoleForPodIdentityResponse",
}) as any as S.Schema<AssumeRoleForPodIdentityResponse>;
export type AssumeRoleForPodIdentityError =
  | AccessDeniedException
  | ExpiredTokenException
  | InternalServerException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * The Amazon EKS Auth API and the `AssumeRoleForPodIdentity` action are only used
 * by the EKS Pod Identity Agent.
 *
 * We recommend that applications use the Amazon Web Services SDKs to connect to Amazon Web Services services; if
 * credentials from an EKS Pod Identity association are available in the pod, the latest versions of the
 * SDKs use them automatically.
 */
export const assumeRoleForPodIdentity: API.OperationMethod<
  AssumeRoleForPodIdentityRequest,
  AssumeRoleForPodIdentityResponse,
  AssumeRoleForPodIdentityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeRoleForPodIdentityRequest,
  output: AssumeRoleForPodIdentityResponse,
  errors: [
    AccessDeniedException,
    ExpiredTokenException,
    InternalServerException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeRoleForPodIdentity",
}));
