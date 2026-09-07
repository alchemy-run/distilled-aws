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
  sdkId: "EC2 Instance Connect",
  serviceShapeName: "AWSEC2InstanceConnectService",
});
const auth = T.AwsAuthSigv4({ name: "ec2-instance-connect" });
const ver = T.ServiceVersion("2018-04-02");
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
              `https://ec2-instance-connect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ec2-instance-connect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ec2-instance-connect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ec2-instance-connect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AuthException
  extends /*@__PURE__*/ S.TaggedError<AuthException>()(
    "AuthException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "Forbidden", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class EC2InstanceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceNotFoundException>()(
    "EC2InstanceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "EC2InstanceNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class EC2InstanceStateInvalidException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceStateInvalidException>()(
    "EC2InstanceStateInvalidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EC2InstanceStateInvalid",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EC2InstanceTypeInvalidException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceTypeInvalidException>()(
    "EC2InstanceTypeInvalidException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EC2InstanceTypeInvalid",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EC2InstanceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<EC2InstanceUnavailableException>()(
    "EC2InstanceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "EC2InstanceUnavailable",
        httpResponseCode: 503,
      }),
      T.HttpError(503),
    ),
  ).pipe(C.withServerError) {}
export class InvalidArgsException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgsException>()(
    "InvalidArgsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidArguments", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SerialConsoleAccessDisabledException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleAccessDisabledException>()(
    "SerialConsoleAccessDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SerialConsoleAccessDisabled",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class SerialConsoleSessionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleSessionLimitExceededException>()(
    "SerialConsoleSessionLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SerialConsoleSessionLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SerialConsoleSessionUnavailableException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleSessionUnavailableException>()(
    "SerialConsoleSessionUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SerialConsoleSessionUnavailable",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class SerialConsoleSessionUnsupportedException
  extends /*@__PURE__*/ S.TaggedError<SerialConsoleSessionUnsupportedException>()(
    "SerialConsoleSessionUnsupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SerialConsoleSessionUnsupported",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InternalServerError", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyRequests", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export type InstanceId = string;
export type SerialPort = number;
export type SSHPublicKey = string;
export interface SendSerialConsoleSSHPublicKeyRequest {
  InstanceId: string;
  SerialPort?: number;
  SSHPublicKey: string;
}
export const SendSerialConsoleSSHPublicKeyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InstanceId: S.String,
      SerialPort: S.optional(S.Number),
      SSHPublicKey: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SendSerialConsoleSSHPublicKeyRequest",
}) as any as S.Schema<SendSerialConsoleSSHPublicKeyRequest>;
export type RequestId = string;
export type Success = boolean;
export interface SendSerialConsoleSSHPublicKeyResponse {
  RequestId?: string;
  Success?: boolean;
}
export const SendSerialConsoleSSHPublicKeyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RequestId: S.optional(S.String),
      Success: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "SendSerialConsoleSSHPublicKeyResponse",
}) as any as S.Schema<SendSerialConsoleSSHPublicKeyResponse>;
export type InstanceOSUser = string;
export type AvailabilityZone = string;
export interface SendSSHPublicKeyRequest {
  InstanceId: string;
  InstanceOSUser: string;
  SSHPublicKey: string;
  AvailabilityZone?: string;
}
export const SendSSHPublicKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.String,
    InstanceOSUser: S.String,
    SSHPublicKey: S.String,
    AvailabilityZone: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendSSHPublicKeyRequest",
}) as any as S.Schema<SendSSHPublicKeyRequest>;
export interface SendSSHPublicKeyResponse {
  RequestId?: string;
  Success?: boolean;
}
export const SendSSHPublicKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestId: S.optional(S.String), Success: S.optional(S.Boolean) }),
).annotate({
  identifier: "SendSSHPublicKeyResponse",
}) as any as S.Schema<SendSSHPublicKeyResponse>;
export type SendSerialConsoleSSHPublicKeyError =
  | AuthException
  | EC2InstanceNotFoundException
  | EC2InstanceStateInvalidException
  | EC2InstanceTypeInvalidException
  | EC2InstanceUnavailableException
  | InvalidArgsException
  | SerialConsoleAccessDisabledException
  | SerialConsoleSessionLimitExceededException
  | SerialConsoleSessionUnavailableException
  | SerialConsoleSessionUnsupportedException
  | ServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Pushes an SSH public key to the specified EC2 instance. The key remains for 60
 * seconds, which gives you 60 seconds to establish a serial console connection to the
 * instance using SSH. For more information, see EC2 Serial Console in
 * the *Amazon EC2 User Guide*.
 */
export const sendSerialConsoleSSHPublicKey: API.OperationMethod<
  SendSerialConsoleSSHPublicKeyRequest,
  SendSerialConsoleSSHPublicKeyResponse,
  SendSerialConsoleSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendSerialConsoleSSHPublicKeyRequest,
  output: SendSerialConsoleSSHPublicKeyResponse,
  errors: [
    AuthException,
    EC2InstanceNotFoundException,
    EC2InstanceStateInvalidException,
    EC2InstanceTypeInvalidException,
    EC2InstanceUnavailableException,
    InvalidArgsException,
    SerialConsoleAccessDisabledException,
    SerialConsoleSessionLimitExceededException,
    SerialConsoleSessionUnavailableException,
    SerialConsoleSessionUnsupportedException,
    ServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendSerialConsoleSSHPublicKey",
}));

export type SendSSHPublicKeyError =
  | AuthException
  | EC2InstanceNotFoundException
  | EC2InstanceStateInvalidException
  | EC2InstanceUnavailableException
  | InvalidArgsException
  | ServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Pushes an SSH public key to the specified EC2 instance for use by the specified user.
 * The key remains for 60 seconds. For more information, see Connect to
 * your Linux instance using EC2 Instance Connect in the Amazon EC2
 * User Guide.
 */
export const sendSSHPublicKey: API.OperationMethod<
  SendSSHPublicKeyRequest,
  SendSSHPublicKeyResponse,
  SendSSHPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendSSHPublicKeyRequest,
  output: SendSSHPublicKeyResponse,
  errors: [
    AuthException,
    EC2InstanceNotFoundException,
    EC2InstanceStateInvalidException,
    EC2InstanceUnavailableException,
    InvalidArgsException,
    ServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendSSHPublicKey",
}));
