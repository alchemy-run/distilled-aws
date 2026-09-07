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
  sdkId: "SSM GuiConnect",
  serviceShapeName: "SSMGuiConnect",
});
const auth = T.AwsAuthSigv4({ name: "ssm-guiconnect" });
const ver = T.ServiceVersion("2021-05-01");
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
              `https://ssm-guiconnect-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ssm-guiconnect-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-guiconnect.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ssm-guiconnect.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export interface DeleteConnectionRecordingPreferencesRequest {
  ClientToken?: string;
}
export const DeleteConnectionRecordingPreferencesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DeleteConnectionRecordingPreferences",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConnectionRecordingPreferencesRequest",
  }) as any as S.Schema<DeleteConnectionRecordingPreferencesRequest>;
export interface DeleteConnectionRecordingPreferencesResponse {
  ClientToken?: string;
}
export const DeleteConnectionRecordingPreferencesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ClientToken: S.optional(S.String) }),
  ).annotate({
    identifier: "DeleteConnectionRecordingPreferencesResponse",
  }) as any as S.Schema<DeleteConnectionRecordingPreferencesResponse>;
export interface GetConnectionRecordingPreferencesRequest {}
export const GetConnectionRecordingPreferencesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetConnectionRecordingPreferences" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetConnectionRecordingPreferencesRequest",
}) as any as S.Schema<GetConnectionRecordingPreferencesRequest>;
export type AccountId = string;
export type BucketName = string;
export interface S3Bucket {
  BucketOwner: string;
  BucketName: string;
}
export const S3Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketOwner: S.String, BucketName: S.String }),
).annotate({ identifier: "S3Bucket" }) as any as S.Schema<S3Bucket>;
export type S3Buckets = S3Bucket[];
export const S3Buckets = /*@__PURE__*/ S.Array(S3Bucket);
export interface RecordingDestinations {
  S3Buckets: S3Bucket[];
}
export const RecordingDestinations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Buckets: S3Buckets }),
).annotate({
  identifier: "RecordingDestinations",
}) as any as S.Schema<RecordingDestinations>;
export interface ConnectionRecordingPreferences {
  RecordingDestinations: RecordingDestinations;
  KMSKeyArn: string;
}
export const ConnectionRecordingPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordingDestinations: RecordingDestinations,
    KMSKeyArn: S.String,
  }),
).annotate({
  identifier: "ConnectionRecordingPreferences",
}) as any as S.Schema<ConnectionRecordingPreferences>;
export interface GetConnectionRecordingPreferencesResponse {
  ClientToken?: string;
  ConnectionRecordingPreferences?: ConnectionRecordingPreferences;
}
export const GetConnectionRecordingPreferencesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ClientToken: S.optional(S.String),
      ConnectionRecordingPreferences: S.optional(
        ConnectionRecordingPreferences,
      ),
    }),
  ).annotate({
    identifier: "GetConnectionRecordingPreferencesResponse",
  }) as any as S.Schema<GetConnectionRecordingPreferencesResponse>;
export interface UpdateConnectionRecordingPreferencesRequest {
  ConnectionRecordingPreferences: ConnectionRecordingPreferences;
  ClientToken?: string;
}
export const UpdateConnectionRecordingPreferencesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConnectionRecordingPreferences: ConnectionRecordingPreferences,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/UpdateConnectionRecordingPreferences",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConnectionRecordingPreferencesRequest",
  }) as any as S.Schema<UpdateConnectionRecordingPreferencesRequest>;
export interface UpdateConnectionRecordingPreferencesResponse {
  ClientToken?: string;
  ConnectionRecordingPreferences?: ConnectionRecordingPreferences;
}
export const UpdateConnectionRecordingPreferencesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ClientToken: S.optional(S.String),
      ConnectionRecordingPreferences: S.optional(
        ConnectionRecordingPreferences,
      ),
    }),
  ).annotate({
    identifier: "UpdateConnectionRecordingPreferencesResponse",
  }) as any as S.Schema<UpdateConnectionRecordingPreferencesResponse>;
export type ErrorMessage = string;
export type DeleteConnectionRecordingPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the preferences for recording RDP connections.
 */
export const deleteConnectionRecordingPreferences: API.OperationMethod<
  DeleteConnectionRecordingPreferencesRequest,
  DeleteConnectionRecordingPreferencesResponse,
  DeleteConnectionRecordingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRecordingPreferencesRequest,
  output: DeleteConnectionRecordingPreferencesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionRecordingPreferences",
}));

export type GetConnectionRecordingPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the preferences specified for recording RDP connections in the requesting Amazon Web Services account and Amazon Web Services Region.
 */
export const getConnectionRecordingPreferences: API.OperationMethod<
  GetConnectionRecordingPreferencesRequest,
  GetConnectionRecordingPreferencesResponse,
  GetConnectionRecordingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRecordingPreferencesRequest,
  output: GetConnectionRecordingPreferencesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionRecordingPreferences",
}));

export type UpdateConnectionRecordingPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the preferences for recording RDP connections.
 */
export const updateConnectionRecordingPreferences: API.OperationMethod<
  UpdateConnectionRecordingPreferencesRequest,
  UpdateConnectionRecordingPreferencesResponse,
  UpdateConnectionRecordingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionRecordingPreferencesRequest,
  output: UpdateConnectionRecordingPreferencesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnectionRecordingPreferences",
}));
