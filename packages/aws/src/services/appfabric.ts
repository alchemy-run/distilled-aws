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
  sdkId: "AppFabric",
  serviceShapeName: "FabricFrontEndService",
});
const auth = T.AwsAuthSigv4({ name: "appfabric" });
const ver = T.ServiceVersion("2023-05-19");
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
              `https://appfabric-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://appfabric-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appfabric.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://appfabric.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Identifier = string;
export type UUID = string;
export type TaskIdList = string[];
export const TaskIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetUserAccessTasksRequest {
  appBundleIdentifier: string;
  taskIdList: string[];
}
export const BatchGetUserAccessTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appBundleIdentifier: S.String, taskIdList: TaskIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/useraccess/batchget" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetUserAccessTasksRequest",
}) as any as S.Schema<BatchGetUserAccessTasksRequest>;
export type String255 = string;
export type TenantIdentifier = string;
export type String2048 = string;
export type ResultStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "EXPIRED"
  | (string & {});
export const ResultStatus = /*@__PURE__*/ S.String;

export type Email = string | redacted.Redacted<string>;
export type SensitiveString2048 = string | redacted.Redacted<string>;
export interface TaskError {
  errorCode?: string;
  errorMessage?: string;
}
export const TaskError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "TaskError" }) as any as S.Schema<TaskError>;
export interface UserAccessResultItem {
  app?: string;
  tenantId?: string;
  tenantDisplayName?: string;
  taskId?: string;
  resultStatus?: ResultStatus;
  email?: string | redacted.Redacted<string>;
  userId?: string | redacted.Redacted<string>;
  userFullName?: string | redacted.Redacted<string>;
  userFirstName?: string | redacted.Redacted<string>;
  userLastName?: string | redacted.Redacted<string>;
  userStatus?: string;
  taskError?: TaskError;
}
export const UserAccessResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    app: S.optional(S.String),
    tenantId: S.optional(S.String),
    tenantDisplayName: S.optional(S.String),
    taskId: S.optional(S.String),
    resultStatus: S.optional(ResultStatus),
    email: S.optional(SensitiveString),
    userId: S.optional(SensitiveString),
    userFullName: S.optional(SensitiveString),
    userFirstName: S.optional(SensitiveString),
    userLastName: S.optional(SensitiveString),
    userStatus: S.optional(S.String),
    taskError: S.optional(TaskError),
  }),
).annotate({
  identifier: "UserAccessResultItem",
}) as any as S.Schema<UserAccessResultItem>;
export type UserAccessResultsList = UserAccessResultItem[];
export const UserAccessResultsList =
  /*@__PURE__*/ S.Array(UserAccessResultItem);
export interface BatchGetUserAccessTasksResponse {
  userAccessResultsList?: UserAccessResultItem[];
}
export const BatchGetUserAccessTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userAccessResultsList: S.optional(UserAccessResultsList) }),
).annotate({
  identifier: "BatchGetUserAccessTasksResponse",
}) as any as S.Schema<BatchGetUserAccessTasksResponse>;
export type RedirectUri = string;
export interface AuthRequest {
  redirectUri: string;
  code: string | redacted.Redacted<string>;
}
export const AuthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ redirectUri: S.String, code: SensitiveString }),
).annotate({ identifier: "AuthRequest" }) as any as S.Schema<AuthRequest>;
export interface ConnectAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
  authRequest?: AuthRequest;
}
export const ConnectAppAuthorizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    appAuthorizationIdentifier: S.String.pipe(
      T.HttpLabel("appAuthorizationIdentifier"),
    ),
    authRequest: S.optional(AuthRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}/connect",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConnectAppAuthorizationRequest",
}) as any as S.Schema<ConnectAppAuthorizationRequest>;
export type Arn = string;
export interface Tenant {
  tenantIdentifier: string;
  tenantDisplayName: string;
}
export const Tenant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tenantIdentifier: S.String, tenantDisplayName: S.String }),
).annotate({ identifier: "Tenant" }) as any as S.Schema<Tenant>;
export type AppAuthorizationStatus =
  | "PendingConnect"
  | "Connected"
  | "ConnectionValidationFailed"
  | "TokenAutoRotationFailed"
  | (string & {});
export const AppAuthorizationStatus = /*@__PURE__*/ S.String;

export interface AppAuthorizationSummary {
  appAuthorizationArn: string;
  appBundleArn: string;
  app: string;
  tenant: Tenant;
  status: AppAuthorizationStatus;
  updatedAt: Date;
}
export const AppAuthorizationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appAuthorizationArn: S.String,
    appBundleArn: S.String,
    app: S.String,
    tenant: Tenant,
    status: AppAuthorizationStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AppAuthorizationSummary",
}) as any as S.Schema<AppAuthorizationSummary>;
export interface ConnectAppAuthorizationResponse {
  appAuthorizationSummary: AppAuthorizationSummary;
}
export const ConnectAppAuthorizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appAuthorizationSummary: AppAuthorizationSummary }),
).annotate({
  identifier: "ConnectAppAuthorizationResponse",
}) as any as S.Schema<ConnectAppAuthorizationResponse>;
export interface Oauth2Credential {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
}
export const Oauth2Credential = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientId: S.String, clientSecret: SensitiveString }),
).annotate({
  identifier: "Oauth2Credential",
}) as any as S.Schema<Oauth2Credential>;
export interface ApiKeyCredential {
  apiKey: string | redacted.Redacted<string>;
}
export const ApiKeyCredential = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiKey: SensitiveString }),
).annotate({
  identifier: "ApiKeyCredential",
}) as any as S.Schema<ApiKeyCredential>;
export type Credential =
  | { oauth2Credential: Oauth2Credential; apiKeyCredential?: never }
  | { oauth2Credential?: never; apiKeyCredential: ApiKeyCredential };
export const Credential = /*@__PURE__*/ S.Union([
  S.Struct({ oauth2Credential: Oauth2Credential }),
  S.Struct({ apiKeyCredential: ApiKeyCredential }),
]);
export type AuthType = "oauth2" | "apiKey" | (string & {});
export const AuthType = /*@__PURE__*/ S.String;

export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateAppAuthorizationRequest {
  appBundleIdentifier: string;
  app: string;
  credential: Credential;
  tenant: Tenant;
  authType: AuthType;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateAppAuthorizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    app: S.String,
    credential: Credential,
    tenant: Tenant,
    authType: AuthType,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/appbundles/{appBundleIdentifier}/appauthorizations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAppAuthorizationRequest",
}) as any as S.Schema<CreateAppAuthorizationRequest>;
export type Persona = "admin" | "endUser" | (string & {});
export const Persona = /*@__PURE__*/ S.String;

export interface AppAuthorization {
  appAuthorizationArn: string;
  appBundleArn: string;
  app: string;
  tenant: Tenant;
  authType: AuthType;
  status: AppAuthorizationStatus;
  createdAt: Date;
  updatedAt: Date;
  persona?: Persona;
  authUrl?: string;
}
export const AppAuthorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appAuthorizationArn: S.String,
    appBundleArn: S.String,
    app: S.String,
    tenant: Tenant,
    authType: AuthType,
    status: AppAuthorizationStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    persona: S.optional(Persona),
    authUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "AppAuthorization",
}) as any as S.Schema<AppAuthorization>;
export interface CreateAppAuthorizationResponse {
  appAuthorization: AppAuthorization;
}
export const CreateAppAuthorizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appAuthorization: AppAuthorization }),
).annotate({
  identifier: "CreateAppAuthorizationResponse",
}) as any as S.Schema<CreateAppAuthorizationResponse>;
export interface CreateAppBundleRequest {
  clientToken?: string;
  customerManagedKeyIdentifier?: string;
  tags?: Tag[];
}
export const CreateAppBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    customerManagedKeyIdentifier: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/appbundles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAppBundleRequest",
}) as any as S.Schema<CreateAppBundleRequest>;
export interface AppBundle {
  arn: string;
  customerManagedKeyArn?: string;
}
export const AppBundle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, customerManagedKeyArn: S.optional(S.String) }),
).annotate({ identifier: "AppBundle" }) as any as S.Schema<AppBundle>;
export interface CreateAppBundleResponse {
  appBundle: AppBundle;
}
export const CreateAppBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appBundle: AppBundle }),
).annotate({
  identifier: "CreateAppBundleResponse",
}) as any as S.Schema<CreateAppBundleResponse>;
export type IngestionType = "auditLog" | (string & {});
export const IngestionType = /*@__PURE__*/ S.String;

export interface CreateIngestionRequest {
  appBundleIdentifier: string;
  app: string;
  tenantId: string;
  ingestionType: IngestionType;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    app: S.String,
    tenantId: S.String,
    ingestionType: IngestionType,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/appbundles/{appBundleIdentifier}/ingestions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIngestionRequest",
}) as any as S.Schema<CreateIngestionRequest>;
export type IngestionState = "enabled" | "disabled" | (string & {});
export const IngestionState = /*@__PURE__*/ S.String;

export interface Ingestion {
  arn: string;
  appBundleArn: string;
  app: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  state: IngestionState;
  ingestionType: IngestionType;
}
export const Ingestion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    appBundleArn: S.String,
    app: S.String,
    tenantId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    state: IngestionState,
    ingestionType: IngestionType,
  }),
).annotate({ identifier: "Ingestion" }) as any as S.Schema<Ingestion>;
export interface CreateIngestionResponse {
  ingestion: Ingestion;
}
export const CreateIngestionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestion: Ingestion }),
).annotate({
  identifier: "CreateIngestionResponse",
}) as any as S.Schema<CreateIngestionResponse>;
export type Schema = "ocsf" | "raw" | (string & {});
export const Schema = /*@__PURE__*/ S.String;

export type Format = "json" | "parquet" | (string & {});
export const Format = /*@__PURE__*/ S.String;

export interface AuditLogProcessingConfiguration {
  schema: Schema;
  format: Format;
}
export const AuditLogProcessingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schema: Schema, format: Format }),
).annotate({
  identifier: "AuditLogProcessingConfiguration",
}) as any as S.Schema<AuditLogProcessingConfiguration>;
export type ProcessingConfiguration = {
  auditLog: AuditLogProcessingConfiguration;
};
export const ProcessingConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ auditLog: AuditLogProcessingConfiguration }),
]);
export type String63 = string;
export type String120 = string;
export interface S3Bucket {
  bucketName: string;
  prefix?: string;
}
export const S3Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, prefix: S.optional(S.String) }),
).annotate({ identifier: "S3Bucket" }) as any as S.Schema<S3Bucket>;
export type String64 = string;
export interface FirehoseStream {
  streamName: string;
}
export const FirehoseStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamName: S.String }),
).annotate({ identifier: "FirehoseStream" }) as any as S.Schema<FirehoseStream>;
export type Destination =
  | { s3Bucket: S3Bucket; firehoseStream?: never }
  | { s3Bucket?: never; firehoseStream: FirehoseStream };
export const Destination = /*@__PURE__*/ S.Union([
  S.Struct({ s3Bucket: S3Bucket }),
  S.Struct({ firehoseStream: FirehoseStream }),
]);
export interface AuditLogDestinationConfiguration {
  destination: Destination;
}
export const AuditLogDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ destination: Destination }),
).annotate({
  identifier: "AuditLogDestinationConfiguration",
}) as any as S.Schema<AuditLogDestinationConfiguration>;
export type DestinationConfiguration = {
  auditLog: AuditLogDestinationConfiguration;
};
export const DestinationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ auditLog: AuditLogDestinationConfiguration }),
]);
export interface CreateIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  processingConfiguration: ProcessingConfiguration;
  destinationConfiguration: DestinationConfiguration;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateIngestionDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    processingConfiguration: ProcessingConfiguration,
    destinationConfiguration: DestinationConfiguration,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIngestionDestinationRequest",
}) as any as S.Schema<CreateIngestionDestinationRequest>;
export type IngestionDestinationStatus = "Active" | "Failed" | (string & {});
export const IngestionDestinationStatus = /*@__PURE__*/ S.String;

export interface IngestionDestination {
  arn: string;
  ingestionArn: string;
  processingConfiguration: ProcessingConfiguration;
  destinationConfiguration: DestinationConfiguration;
  status?: IngestionDestinationStatus;
  statusReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const IngestionDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    ingestionArn: S.String,
    processingConfiguration: ProcessingConfiguration,
    destinationConfiguration: DestinationConfiguration,
    status: S.optional(IngestionDestinationStatus),
    statusReason: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "IngestionDestination",
}) as any as S.Schema<IngestionDestination>;
export interface CreateIngestionDestinationResponse {
  ingestionDestination: IngestionDestination;
}
export const CreateIngestionDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestionDestination: IngestionDestination }),
).annotate({
  identifier: "CreateIngestionDestinationResponse",
}) as any as S.Schema<CreateIngestionDestinationResponse>;
export interface DeleteAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
}
export const DeleteAppAuthorizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    appAuthorizationIdentifier: S.String.pipe(
      T.HttpLabel("appAuthorizationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAppAuthorizationRequest",
}) as any as S.Schema<DeleteAppAuthorizationRequest>;
export interface DeleteAppAuthorizationResponse {}
export const DeleteAppAuthorizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAppAuthorizationResponse",
}) as any as S.Schema<DeleteAppAuthorizationResponse>;
export interface DeleteAppBundleRequest {
  appBundleIdentifier: string;
}
export const DeleteAppBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/appbundles/{appBundleIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAppBundleRequest",
}) as any as S.Schema<DeleteAppBundleRequest>;
export interface DeleteAppBundleResponse {}
export const DeleteAppBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAppBundleResponse",
}) as any as S.Schema<DeleteAppBundleResponse>;
export interface DeleteIngestionRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
}
export const DeleteIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIngestionRequest",
}) as any as S.Schema<DeleteIngestionRequest>;
export interface DeleteIngestionResponse {}
export const DeleteIngestionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIngestionResponse",
}) as any as S.Schema<DeleteIngestionResponse>;
export interface DeleteIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  ingestionDestinationIdentifier: string;
}
export const DeleteIngestionDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    ingestionDestinationIdentifier: S.String.pipe(
      T.HttpLabel("ingestionDestinationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIngestionDestinationRequest",
}) as any as S.Schema<DeleteIngestionDestinationRequest>;
export interface DeleteIngestionDestinationResponse {}
export const DeleteIngestionDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIngestionDestinationResponse",
}) as any as S.Schema<DeleteIngestionDestinationResponse>;
export interface GetAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
}
export const GetAppAuthorizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    appAuthorizationIdentifier: S.String.pipe(
      T.HttpLabel("appAuthorizationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAppAuthorizationRequest",
}) as any as S.Schema<GetAppAuthorizationRequest>;
export interface GetAppAuthorizationResponse {
  appAuthorization: AppAuthorization;
}
export const GetAppAuthorizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appAuthorization: AppAuthorization }),
).annotate({
  identifier: "GetAppAuthorizationResponse",
}) as any as S.Schema<GetAppAuthorizationResponse>;
export interface GetAppBundleRequest {
  appBundleIdentifier: string;
}
export const GetAppBundleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/appbundles/{appBundleIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAppBundleRequest",
}) as any as S.Schema<GetAppBundleRequest>;
export interface GetAppBundleResponse {
  appBundle: AppBundle;
}
export const GetAppBundleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appBundle: AppBundle }),
).annotate({
  identifier: "GetAppBundleResponse",
}) as any as S.Schema<GetAppBundleResponse>;
export interface GetIngestionRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
}
export const GetIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIngestionRequest",
}) as any as S.Schema<GetIngestionRequest>;
export interface GetIngestionResponse {
  ingestion: Ingestion;
}
export const GetIngestionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestion: Ingestion }),
).annotate({
  identifier: "GetIngestionResponse",
}) as any as S.Schema<GetIngestionResponse>;
export interface GetIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  ingestionDestinationIdentifier: string;
}
export const GetIngestionDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    ingestionDestinationIdentifier: S.String.pipe(
      T.HttpLabel("ingestionDestinationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIngestionDestinationRequest",
}) as any as S.Schema<GetIngestionDestinationRequest>;
export interface GetIngestionDestinationResponse {
  ingestionDestination: IngestionDestination;
}
export const GetIngestionDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestionDestination: IngestionDestination }),
).annotate({
  identifier: "GetIngestionDestinationResponse",
}) as any as S.Schema<GetIngestionDestinationResponse>;
export type MaxResults = number;
export interface ListAppAuthorizationsRequest {
  appBundleIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAppAuthorizationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/appbundles/{appBundleIdentifier}/appauthorizations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAppAuthorizationsRequest",
}) as any as S.Schema<ListAppAuthorizationsRequest>;
export type AppAuthorizationSummaryList = AppAuthorizationSummary[];
export const AppAuthorizationSummaryList = /*@__PURE__*/ S.Array(
  AppAuthorizationSummary,
);
export interface ListAppAuthorizationsResponse {
  appAuthorizationSummaryList: AppAuthorizationSummary[];
  nextToken?: string;
}
export const ListAppAuthorizationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appAuthorizationSummaryList: AppAuthorizationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAppAuthorizationsResponse",
}) as any as S.Schema<ListAppAuthorizationsResponse>;
export interface ListAppBundlesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAppBundlesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/appbundles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAppBundlesRequest",
}) as any as S.Schema<ListAppBundlesRequest>;
export interface AppBundleSummary {
  arn: string;
}
export const AppBundleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "AppBundleSummary",
}) as any as S.Schema<AppBundleSummary>;
export type AppBundleSummaryList = AppBundleSummary[];
export const AppBundleSummaryList = /*@__PURE__*/ S.Array(AppBundleSummary);
export interface ListAppBundlesResponse {
  appBundleSummaryList: AppBundleSummary[];
  nextToken?: string;
}
export const ListAppBundlesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleSummaryList: AppBundleSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAppBundlesResponse",
}) as any as S.Schema<ListAppBundlesResponse>;
export interface ListIngestionDestinationsRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListIngestionDestinationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIngestionDestinationsRequest",
}) as any as S.Schema<ListIngestionDestinationsRequest>;
export interface IngestionDestinationSummary {
  arn: string;
}
export const IngestionDestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "IngestionDestinationSummary",
}) as any as S.Schema<IngestionDestinationSummary>;
export type IngestionDestinationList = IngestionDestinationSummary[];
export const IngestionDestinationList = /*@__PURE__*/ S.Array(
  IngestionDestinationSummary,
);
export interface ListIngestionDestinationsResponse {
  ingestionDestinations: IngestionDestinationSummary[];
  nextToken?: string;
}
export const ListIngestionDestinationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingestionDestinations: IngestionDestinationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIngestionDestinationsResponse",
}) as any as S.Schema<ListIngestionDestinationsResponse>;
export interface ListIngestionsRequest {
  appBundleIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListIngestionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/appbundles/{appBundleIdentifier}/ingestions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIngestionsRequest",
}) as any as S.Schema<ListIngestionsRequest>;
export interface IngestionSummary {
  arn: string;
  app: string;
  tenantId: string;
  state: IngestionState;
}
export const IngestionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    app: S.String,
    tenantId: S.String,
    state: IngestionState,
  }),
).annotate({
  identifier: "IngestionSummary",
}) as any as S.Schema<IngestionSummary>;
export type IngestionList = IngestionSummary[];
export const IngestionList = /*@__PURE__*/ S.Array(IngestionSummary);
export interface ListIngestionsResponse {
  ingestions: IngestionSummary[];
  nextToken?: string;
}
export const ListIngestionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestions: IngestionList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListIngestionsResponse",
}) as any as S.Schema<ListIngestionsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartIngestionRequest {
  ingestionIdentifier: string;
  appBundleIdentifier: string;
}
export const StartIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartIngestionRequest",
}) as any as S.Schema<StartIngestionRequest>;
export interface StartIngestionResponse {}
export const StartIngestionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartIngestionResponse",
}) as any as S.Schema<StartIngestionResponse>;
export interface StartUserAccessTasksRequest {
  appBundleIdentifier: string;
  email: string | redacted.Redacted<string>;
}
export const StartUserAccessTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appBundleIdentifier: S.String, email: SensitiveString }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/useraccess/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartUserAccessTasksRequest",
}) as any as S.Schema<StartUserAccessTasksRequest>;
export interface UserAccessTaskItem {
  app: string;
  tenantId: string;
  taskId?: string;
  error?: TaskError;
}
export const UserAccessTaskItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    app: S.String,
    tenantId: S.String,
    taskId: S.optional(S.String),
    error: S.optional(TaskError),
  }),
).annotate({
  identifier: "UserAccessTaskItem",
}) as any as S.Schema<UserAccessTaskItem>;
export type UserAccessTasksList = UserAccessTaskItem[];
export const UserAccessTasksList = /*@__PURE__*/ S.Array(UserAccessTaskItem);
export interface StartUserAccessTasksResponse {
  userAccessTasksList?: UserAccessTaskItem[];
}
export const StartUserAccessTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userAccessTasksList: S.optional(UserAccessTasksList) }),
).annotate({
  identifier: "StartUserAccessTasksResponse",
}) as any as S.Schema<StartUserAccessTasksResponse>;
export interface StopIngestionRequest {
  ingestionIdentifier: string;
  appBundleIdentifier: string;
}
export const StopIngestionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopIngestionRequest",
}) as any as S.Schema<StopIngestionRequest>;
export interface StopIngestionResponse {}
export const StopIngestionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopIngestionResponse",
}) as any as S.Schema<StopIngestionResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
export interface UpdateAppAuthorizationRequest {
  appBundleIdentifier: string;
  appAuthorizationIdentifier: string;
  credential?: Credential;
  tenant?: Tenant;
}
export const UpdateAppAuthorizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    appAuthorizationIdentifier: S.String.pipe(
      T.HttpLabel("appAuthorizationIdentifier"),
    ),
    credential: S.optional(Credential),
    tenant: S.optional(Tenant),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/appbundles/{appBundleIdentifier}/appauthorizations/{appAuthorizationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAppAuthorizationRequest",
}) as any as S.Schema<UpdateAppAuthorizationRequest>;
export interface UpdateAppAuthorizationResponse {
  appAuthorization: AppAuthorization;
}
export const UpdateAppAuthorizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ appAuthorization: AppAuthorization }),
).annotate({
  identifier: "UpdateAppAuthorizationResponse",
}) as any as S.Schema<UpdateAppAuthorizationResponse>;
export interface UpdateIngestionDestinationRequest {
  appBundleIdentifier: string;
  ingestionIdentifier: string;
  ingestionDestinationIdentifier: string;
  destinationConfiguration: DestinationConfiguration;
}
export const UpdateIngestionDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appBundleIdentifier: S.String.pipe(T.HttpLabel("appBundleIdentifier")),
    ingestionIdentifier: S.String.pipe(T.HttpLabel("ingestionIdentifier")),
    ingestionDestinationIdentifier: S.String.pipe(
      T.HttpLabel("ingestionDestinationIdentifier"),
    ),
    destinationConfiguration: DestinationConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/appbundles/{appBundleIdentifier}/ingestions/{ingestionIdentifier}/ingestiondestinations/{ingestionDestinationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIngestionDestinationRequest",
}) as any as S.Schema<UpdateIngestionDestinationRequest>;
export interface UpdateIngestionDestinationResponse {
  ingestionDestination: IngestionDestination;
}
export const UpdateIngestionDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestionDestination: IngestionDestination }),
).annotate({
  identifier: "UpdateIngestionDestinationResponse",
}) as any as S.Schema<UpdateIngestionDestinationResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type BatchGetUserAccessTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets user access details in a batch request.
 *
 * This action polls data from the tasks that are kicked off by the
 * `StartUserAccessTasks` action.
 */
export const batchGetUserAccessTasks: API.OperationMethod<
  BatchGetUserAccessTasksRequest,
  BatchGetUserAccessTasksResponse,
  BatchGetUserAccessTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetUserAccessTasksRequest,
  output: BatchGetUserAccessTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetUserAccessTasks",
}));

export type ConnectAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Establishes a connection between Amazon Web Services AppFabric and an application, which allows AppFabric to
 * call the APIs of the application.
 */
export const connectAppAuthorization: API.OperationMethod<
  ConnectAppAuthorizationRequest,
  ConnectAppAuthorizationResponse,
  ConnectAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConnectAppAuthorizationRequest,
  output: ConnectAppAuthorizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConnectAppAuthorization",
}));

export type CreateAppAuthorizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an app authorization within an app bundle, which allows AppFabric to connect to an
 * application.
 */
export const createAppAuthorization: API.OperationMethod<
  CreateAppAuthorizationRequest,
  CreateAppAuthorizationResponse,
  CreateAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppAuthorizationRequest,
  output: CreateAppAuthorizationResponse,
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
  operationName: "CreateAppAuthorization",
}));

export type CreateAppBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an app bundle to collect data from an application using AppFabric.
 */
export const createAppBundle: API.OperationMethod<
  CreateAppBundleRequest,
  CreateAppBundleResponse,
  CreateAppBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppBundleRequest,
  output: CreateAppBundleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBundle",
}));

export type CreateIngestionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data ingestion for an application.
 */
export const createIngestion: API.OperationMethod<
  CreateIngestionRequest,
  CreateIngestionResponse,
  CreateIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIngestionRequest,
  output: CreateIngestionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestion",
}));

export type CreateIngestionDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ingestion destination, which specifies how an application's ingested data is
 * processed by Amazon Web Services AppFabric and where it's delivered.
 */
export const createIngestionDestination: API.OperationMethod<
  CreateIngestionDestinationRequest,
  CreateIngestionDestinationResponse,
  CreateIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIngestionDestinationRequest,
  output: CreateIngestionDestinationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestionDestination",
}));

export type DeleteAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an app authorization. You must delete the associated ingestion before you can
 * delete an app authorization.
 */
export const deleteAppAuthorization: API.OperationMethod<
  DeleteAppAuthorizationRequest,
  DeleteAppAuthorizationResponse,
  DeleteAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppAuthorizationRequest,
  output: DeleteAppAuthorizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppAuthorization",
}));

export type DeleteAppBundleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an app bundle. You must delete all associated app authorizations before you can
 * delete an app bundle.
 */
export const deleteAppBundle: API.OperationMethod<
  DeleteAppBundleRequest,
  DeleteAppBundleResponse,
  DeleteAppBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppBundleRequest,
  output: DeleteAppBundleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBundle",
}));

export type DeleteIngestionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ingestion. You must stop (disable) the ingestion and you must delete all
 * associated ingestion destinations before you can delete an app ingestion.
 */
export const deleteIngestion: API.OperationMethod<
  DeleteIngestionRequest,
  DeleteIngestionResponse,
  DeleteIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIngestionRequest,
  output: DeleteIngestionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngestion",
}));

export type DeleteIngestionDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ingestion destination.
 *
 * This deletes the association between an ingestion and it's destination. It doesn't
 * delete previously ingested data or the storage destination, such as the Amazon S3
 * bucket where the data is delivered. If the ingestion destination is deleted while the
 * associated ingestion is enabled, the ingestion will fail and is eventually disabled.
 */
export const deleteIngestionDestination: API.OperationMethod<
  DeleteIngestionDestinationRequest,
  DeleteIngestionDestinationResponse,
  DeleteIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIngestionDestinationRequest,
  output: DeleteIngestionDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngestionDestination",
}));

export type GetAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an app authorization.
 */
export const getAppAuthorization: API.OperationMethod<
  GetAppAuthorizationRequest,
  GetAppAuthorizationResponse,
  GetAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAppAuthorizationRequest,
  output: GetAppAuthorizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppAuthorization",
}));

export type GetAppBundleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an app bundle.
 */
export const getAppBundle: API.OperationMethod<
  GetAppBundleRequest,
  GetAppBundleResponse,
  GetAppBundleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAppBundleRequest,
  output: GetAppBundleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppBundle",
}));

export type GetIngestionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an ingestion.
 */
export const getIngestion: API.OperationMethod<
  GetIngestionRequest,
  GetIngestionResponse,
  GetIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIngestionRequest,
  output: GetIngestionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestion",
}));

export type GetIngestionDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an ingestion destination.
 */
export const getIngestionDestination: API.OperationMethod<
  GetIngestionDestinationRequest,
  GetIngestionDestinationResponse,
  GetIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIngestionDestinationRequest,
  output: GetIngestionDestinationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestionDestination",
}));

export type ListAppAuthorizationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all app authorizations configured for an app bundle.
 */
export const listAppAuthorizations: API.PaginatedOperationMethod<
  ListAppAuthorizationsRequest,
  ListAppAuthorizationsResponse,
  ListAppAuthorizationsError,
  Credentials | HttpClient.HttpClient,
  AppAuthorizationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAppAuthorizationsRequest,
  output: ListAppAuthorizationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppAuthorizations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "appAuthorizationSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppBundlesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of app bundles.
 */
export const listAppBundles: API.PaginatedOperationMethod<
  ListAppBundlesRequest,
  ListAppBundlesResponse,
  ListAppBundlesError,
  Credentials | HttpClient.HttpClient,
  AppBundleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAppBundlesRequest,
  output: ListAppBundlesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppBundles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "appBundleSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestionDestinationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all ingestion destinations configured for an ingestion.
 */
export const listIngestionDestinations: API.PaginatedOperationMethod<
  ListIngestionDestinationsRequest,
  ListIngestionDestinationsResponse,
  ListIngestionDestinationsError,
  Credentials | HttpClient.HttpClient,
  IngestionDestinationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIngestionDestinationsRequest,
  output: ListIngestionDestinationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestionDestinations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestionDestinations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all ingestions configured for an app bundle.
 */
export const listIngestions: API.PaginatedOperationMethod<
  ListIngestionsRequest,
  ListIngestionsResponse,
  ListIngestionsError,
  Credentials | HttpClient.HttpClient,
  IngestionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIngestionsRequest,
  output: ListIngestionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartIngestionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts (enables) an ingestion, which collects data from an application.
 */
export const startIngestion: API.OperationMethod<
  StartIngestionRequest,
  StartIngestionResponse,
  StartIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartIngestionRequest,
  output: StartIngestionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartIngestion",
}));

export type StartUserAccessTasksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the tasks to search user access status for a specific email address.
 *
 * The tasks are stopped when the user access status data is found. The tasks are
 * terminated when the API calls to the application time out.
 */
export const startUserAccessTasks: API.OperationMethod<
  StartUserAccessTasksRequest,
  StartUserAccessTasksResponse,
  StartUserAccessTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartUserAccessTasksRequest,
  output: StartUserAccessTasksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUserAccessTasks",
}));

export type StopIngestionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops (disables) an ingestion.
 */
export const stopIngestion: API.OperationMethod<
  StopIngestionRequest,
  StopIngestionResponse,
  StopIngestionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopIngestionRequest,
  output: StopIngestionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopIngestion",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or tags from a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an app authorization within an app bundle, which allows AppFabric to connect to an
 * application.
 *
 * If the app authorization was in a `connected` state, updating the app
 * authorization will set it back to a `PendingConnect` state.
 */
export const updateAppAuthorization: API.OperationMethod<
  UpdateAppAuthorizationRequest,
  UpdateAppAuthorizationResponse,
  UpdateAppAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAppAuthorizationRequest,
  output: UpdateAppAuthorizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppAuthorization",
}));

export type UpdateIngestionDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an ingestion destination, which specifies how an application's ingested data is
 * processed by Amazon Web Services AppFabric and where it's delivered.
 */
export const updateIngestionDestination: API.OperationMethod<
  UpdateIngestionDestinationRequest,
  UpdateIngestionDestinationResponse,
  UpdateIngestionDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIngestionDestinationRequest,
  output: UpdateIngestionDestinationResponse,
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
  operationName: "UpdateIngestionDestination",
}));
