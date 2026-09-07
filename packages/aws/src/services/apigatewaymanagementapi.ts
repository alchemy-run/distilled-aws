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
  sdkId: "ApiGatewayManagementApi",
  serviceShapeName: "ApiGatewayManagementApi",
});
const auth = T.AwsAuthSigv4({ name: "execute-api" });
const ver = T.ServiceVersion("2018-11-29");
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
              `https://execute-api-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://execute-api-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://execute-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://execute-api.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GoneException
  extends /*@__PURE__*/ S.TaggedError<GoneException>()(
    "GoneException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PayloadTooLargeException>()(
    "PayloadTooLargeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export interface DeleteConnectionRequest {
  ConnectionId: string;
}
export const DeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/@connections/{ConnectionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectionRequest",
}) as any as S.Schema<DeleteConnectionRequest>;
export interface DeleteConnectionResponse {}
export const DeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectionResponse",
}) as any as S.Schema<DeleteConnectionResponse>;
export interface GetConnectionRequest {
  ConnectionId: string;
}
export const GetConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/@connections/{ConnectionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export type __timestampIso8601 = Date;
export interface Identity {
  SourceIp?: string;
  UserAgent?: string;
}
export const Identity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceIp: S.optional(S.String),
    UserAgent: S.optional(S.String),
  }).pipe(S.encodeKeys({ SourceIp: "sourceIp", UserAgent: "userAgent" })),
).annotate({ identifier: "Identity" }) as any as S.Schema<Identity>;
export interface GetConnectionResponse {
  ConnectedAt?: Date;
  Identity?: Identity & { SourceIp: string; UserAgent: string };
  LastActiveAt?: Date;
}
export const GetConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Identity: S.optional(Identity),
    LastActiveAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      ConnectedAt: "connectedAt",
      Identity: "identity",
      LastActiveAt: "lastActiveAt",
    }),
  ),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export interface PostToConnectionRequest {
  Data?: T.StreamingInputBody;
  ConnectionId: string;
}
export const PostToConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Data: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/@connections/{ConnectionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PostToConnectionRequest",
}) as any as S.Schema<PostToConnectionRequest>;
export interface PostToConnectionResponse {}
export const PostToConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PostToConnectionResponse",
}) as any as S.Schema<PostToConnectionResponse>;
export type DeleteConnectionError =
  | ForbiddenException
  | GoneException
  | LimitExceededException
  | CommonErrors;
/**
 * Delete the connection with the provided id.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRequest,
  output: DeleteConnectionResponse,
  errors: [ForbiddenException, GoneException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type GetConnectionError =
  | ForbiddenException
  | GoneException
  | LimitExceededException
  | CommonErrors;
/**
 * Get information about the connection with the provided id.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [ForbiddenException, GoneException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type PostToConnectionError =
  | ForbiddenException
  | GoneException
  | LimitExceededException
  | PayloadTooLargeException
  | CommonErrors;
/**
 * Sends the provided data to the specified connection.
 */
export const postToConnection: API.OperationMethod<
  PostToConnectionRequest,
  PostToConnectionResponse,
  PostToConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostToConnectionRequest,
  output: PostToConnectionResponse,
  errors: [
    ForbiddenException,
    GoneException,
    LimitExceededException,
    PayloadTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostToConnection",
}));
