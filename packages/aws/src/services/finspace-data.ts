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
  sdkId: "finspace data",
  serviceShapeName: "AWSHabaneroPublicAPI",
});
const auth = T.AwsAuthSigv4({ name: "finspace-api" });
const ver = T.ServiceVersion("2020-07-13");
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
              `https://finspace-api-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://finspace-api-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://finspace-api.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://finspace-api.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type PermissionGroupId = string;
export type UserId = string;
export type ClientToken = string;
export interface AssociateUserToPermissionGroupRequest {
  permissionGroupId: string;
  userId: string;
  clientToken?: string;
}
export const AssociateUserToPermissionGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
      userId: S.String.pipe(T.HttpLabel("userId")),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/permission-group/{permissionGroupId}/users/{userId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateUserToPermissionGroupRequest",
}) as any as S.Schema<AssociateUserToPermissionGroupRequest>;
export type StatusCode = number;
export interface AssociateUserToPermissionGroupResponse {
  statusCode?: number;
}
export const AssociateUserToPermissionGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
).annotate({
  identifier: "AssociateUserToPermissionGroupResponse",
}) as any as S.Schema<AssociateUserToPermissionGroupResponse>;
export type DatasetId = string;
export type ChangeType = "REPLACE" | "APPEND" | "MODIFY" | (string & {});
export const ChangeType = S.String;

export type StringMapKey = string;
export type StringMapValue = string;
export type SourceParams = { [key: string]: string | undefined };
export const SourceParams = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type FormatParams = { [key: string]: string | undefined };
export const FormatParams = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateChangesetRequest {
  clientToken?: string;
  datasetId: string;
  changeType: ChangeType;
  sourceParams: { [key: string]: string | undefined };
  formatParams: { [key: string]: string | undefined };
}
export const CreateChangesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    changeType: ChangeType,
    sourceParams: SourceParams,
    formatParams: FormatParams,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets/{datasetId}/changesetsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChangesetRequest",
}) as any as S.Schema<CreateChangesetRequest>;
export type ChangesetId = string;
export interface CreateChangesetResponse {
  datasetId?: string;
  changesetId?: string;
}
export const CreateChangesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.optional(S.String),
    changesetId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateChangesetResponse",
}) as any as S.Schema<CreateChangesetResponse>;
export type DatasetTitle = string;
export type DatasetKind = "TABULAR" | "NON_TABULAR" | (string & {});
export const DatasetKind = S.String;

export type DatasetDescription = string;
export type OwnerName = string;
export type PhoneNumber = string;
export type Email = string | redacted.Redacted<string>;
export interface DatasetOwnerInfo {
  name?: string;
  phoneNumber?: string;
  email?: string | redacted.Redacted<string>;
}
export const DatasetOwnerInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    phoneNumber: S.optional(S.String),
    email: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "DatasetOwnerInfo",
}) as any as S.Schema<DatasetOwnerInfo>;
export type StringValueLength1to250 = string;
export interface ResourcePermission {
  permission?: string;
}
export const ResourcePermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ permission: S.optional(S.String) }),
).annotate({
  identifier: "ResourcePermission",
}) as any as S.Schema<ResourcePermission>;
export type ResourcePermissionsList = ResourcePermission[];
export const ResourcePermissionsList =
  /*@__PURE__*/ S.Array(ResourcePermission);
export interface PermissionGroupParams {
  permissionGroupId?: string;
  datasetPermissions?: ResourcePermission[];
}
export const PermissionGroupParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.optional(S.String),
    datasetPermissions: S.optional(ResourcePermissionsList),
  }),
).annotate({
  identifier: "PermissionGroupParams",
}) as any as S.Schema<PermissionGroupParams>;
export type AliasString = string;
export type ColumnDataType =
  | "STRING"
  | "CHAR"
  | "INTEGER"
  | "TINYINT"
  | "SMALLINT"
  | "BIGINT"
  | "FLOAT"
  | "DOUBLE"
  | "DATE"
  | "DATETIME"
  | "BOOLEAN"
  | "BINARY"
  | (string & {});
export const ColumnDataType = S.String;

export type ColumnName = string;
export type ColumnDescription = string;
export interface ColumnDefinition {
  dataType?: ColumnDataType;
  columnName?: string;
  columnDescription?: string;
}
export const ColumnDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataType: S.optional(ColumnDataType),
    columnName: S.optional(S.String),
    columnDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "ColumnDefinition",
}) as any as S.Schema<ColumnDefinition>;
export type ColumnList = ColumnDefinition[];
export const ColumnList = /*@__PURE__*/ S.Array(ColumnDefinition);
export type ColumnNameList = string[];
export const ColumnNameList = /*@__PURE__*/ S.Array(S.String);
export interface SchemaDefinition {
  columns?: ColumnDefinition[];
  primaryKeyColumns?: string[];
}
export const SchemaDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columns: S.optional(ColumnList),
    primaryKeyColumns: S.optional(ColumnNameList),
  }),
).annotate({
  identifier: "SchemaDefinition",
}) as any as S.Schema<SchemaDefinition>;
export interface SchemaUnion {
  tabularSchemaConfig?: SchemaDefinition;
}
export const SchemaUnion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tabularSchemaConfig: S.optional(SchemaDefinition) }),
).annotate({ identifier: "SchemaUnion" }) as any as S.Schema<SchemaUnion>;
export interface CreateDatasetRequest {
  clientToken?: string;
  datasetTitle: string;
  kind: DatasetKind;
  datasetDescription?: string;
  ownerInfo?: DatasetOwnerInfo;
  permissionGroupParams: PermissionGroupParams;
  alias?: string;
  schemaDefinition?: SchemaUnion;
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    datasetTitle: S.String,
    kind: DatasetKind,
    datasetDescription: S.optional(S.String),
    ownerInfo: S.optional(DatasetOwnerInfo),
    permissionGroupParams: PermissionGroupParams,
    alias: S.optional(S.String),
    schemaDefinition: S.optional(SchemaUnion),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasetsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  datasetId?: string;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetId: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type StringValueLength1to255 = string;
export type SortColumnList = string[];
export const SortColumnList = /*@__PURE__*/ S.Array(S.String);
export type PartitionColumnList = string[];
export const PartitionColumnList = /*@__PURE__*/ S.Array(S.String);
export type TimestampEpoch = number;
export type DataViewDestinationType = string;
export type ExportFileFormat = "PARQUET" | "DELIMITED_TEXT" | (string & {});
export const ExportFileFormat = S.String;

export type S3DestinationFormatOptions = { [key: string]: string | undefined };
export const S3DestinationFormatOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DataViewDestinationTypeParams {
  destinationType: string;
  s3DestinationExportFileFormat?: ExportFileFormat;
  s3DestinationExportFileFormatOptions?: { [key: string]: string | undefined };
}
export const DataViewDestinationTypeParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationType: S.String,
    s3DestinationExportFileFormat: S.optional(ExportFileFormat),
    s3DestinationExportFileFormatOptions: S.optional(
      S3DestinationFormatOptions,
    ),
  }),
).annotate({
  identifier: "DataViewDestinationTypeParams",
}) as any as S.Schema<DataViewDestinationTypeParams>;
export interface CreateDataViewRequest {
  clientToken?: string;
  datasetId: string;
  autoUpdate?: boolean;
  sortColumns?: string[];
  partitionColumns?: string[];
  asOfTimestamp?: number;
  destinationTypeParams: DataViewDestinationTypeParams;
}
export const CreateDataViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    autoUpdate: S.optional(S.Boolean),
    sortColumns: S.optional(SortColumnList),
    partitionColumns: S.optional(PartitionColumnList),
    asOfTimestamp: S.optional(S.Number),
    destinationTypeParams: DataViewDestinationTypeParams,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/datasets/{datasetId}/dataviewsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataViewRequest",
}) as any as S.Schema<CreateDataViewRequest>;
export type DataViewId = string;
export interface CreateDataViewResponse {
  datasetId?: string;
  dataViewId?: string;
}
export const CreateDataViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.optional(S.String),
    dataViewId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDataViewResponse",
}) as any as S.Schema<CreateDataViewResponse>;
export type PermissionGroupName = string | redacted.Redacted<string>;
export type PermissionGroupDescription = string | redacted.Redacted<string>;
export type ApplicationPermission =
  | "CreateDataset"
  | "ManageClusters"
  | "ManageUsersAndGroups"
  | "ManageAttributeSets"
  | "ViewAuditData"
  | "AccessNotebooks"
  | "GetTemporaryCredentials"
  | (string & {});
export const ApplicationPermission = S.String;

export type ApplicationPermissionList = ApplicationPermission[];
export const ApplicationPermissionList = /*@__PURE__*/ S.Array(
  ApplicationPermission,
);
export interface CreatePermissionGroupRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  applicationPermissions: ApplicationPermission[];
  clientToken?: string;
}
export const CreatePermissionGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(SensitiveString),
    applicationPermissions: ApplicationPermissionList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/permission-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePermissionGroupRequest",
}) as any as S.Schema<CreatePermissionGroupRequest>;
export interface CreatePermissionGroupResponse {
  permissionGroupId?: string;
}
export const CreatePermissionGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ permissionGroupId: S.optional(S.String) }),
).annotate({
  identifier: "CreatePermissionGroupResponse",
}) as any as S.Schema<CreatePermissionGroupResponse>;
export type UserType = "SUPER_USER" | "APP_USER" | (string & {});
export const UserType = S.String;

export type FirstName = string | redacted.Redacted<string>;
export type LastName = string | redacted.Redacted<string>;
export type ApiAccess = "ENABLED" | "DISABLED" | (string & {});
export const ApiAccess = S.String;

export type RoleArn = string;
export interface CreateUserRequest {
  emailAddress: string | redacted.Redacted<string>;
  type: UserType;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  clientToken?: string;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    emailAddress: SensitiveString,
    type: UserType,
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    apiAccess: S.optional(ApiAccess),
    apiAccessPrincipalArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResponse {
  userId?: string;
}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeleteDatasetRequest {
  clientToken?: string;
  datasetId: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/datasetsv2/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {
  datasetId?: string;
}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export interface DeletePermissionGroupRequest {
  permissionGroupId: string;
  clientToken?: string;
}
export const DeletePermissionGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/permission-group/{permissionGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePermissionGroupRequest",
}) as any as S.Schema<DeletePermissionGroupRequest>;
export interface DeletePermissionGroupResponse {
  permissionGroupId?: string;
}
export const DeletePermissionGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ permissionGroupId: S.optional(S.String) }),
).annotate({
  identifier: "DeletePermissionGroupResponse",
}) as any as S.Schema<DeletePermissionGroupResponse>;
export interface DisableUserRequest {
  userId: string;
  clientToken?: string;
}
export const DisableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String.pipe(T.HttpLabel("userId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/{userId}/disable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableUserRequest",
}) as any as S.Schema<DisableUserRequest>;
export interface DisableUserResponse {
  userId?: string;
}
export const DisableUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({
  identifier: "DisableUserResponse",
}) as any as S.Schema<DisableUserResponse>;
export interface DisassociateUserFromPermissionGroupRequest {
  permissionGroupId: string;
  userId: string;
  clientToken?: string;
}
export const DisassociateUserFromPermissionGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
      userId: S.String.pipe(T.HttpLabel("userId")),
      clientToken: S.optional(S.String).pipe(
        T.HttpQuery("clientToken"),
        T.IdempotencyToken(),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/permission-group/{permissionGroupId}/users/{userId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateUserFromPermissionGroupRequest",
  }) as any as S.Schema<DisassociateUserFromPermissionGroupRequest>;
export interface DisassociateUserFromPermissionGroupResponse {
  statusCode?: number;
}
export const DisassociateUserFromPermissionGroupResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()) }),
  ).annotate({
    identifier: "DisassociateUserFromPermissionGroupResponse",
  }) as any as S.Schema<DisassociateUserFromPermissionGroupResponse>;
export interface EnableUserRequest {
  userId: string;
  clientToken?: string;
}
export const EnableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String.pipe(T.HttpLabel("userId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/{userId}/enable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableUserRequest",
}) as any as S.Schema<EnableUserRequest>;
export interface EnableUserResponse {
  userId?: string;
}
export const EnableUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({
  identifier: "EnableUserResponse",
}) as any as S.Schema<EnableUserResponse>;
export interface GetChangesetRequest {
  datasetId: string;
  changesetId: string;
}
export const GetChangesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    changesetId: S.String.pipe(T.HttpLabel("changesetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/datasets/{datasetId}/changesetsv2/{changesetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChangesetRequest",
}) as any as S.Schema<GetChangesetRequest>;
export type ChangesetArn = string;
export type IngestionStatus =
  | "PENDING"
  | "FAILED"
  | "SUCCESS"
  | "RUNNING"
  | "STOP_REQUESTED"
  | (string & {});
export const IngestionStatus = S.String;

export type ErrorMessage = string;
export type ErrorCategory =
  | "VALIDATION"
  | "SERVICE_QUOTA_EXCEEDED"
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "THROTTLING"
  | "INTERNAL_SERVICE_EXCEPTION"
  | "CANCELLED"
  | "USER_RECOVERABLE"
  | (string & {});
export const ErrorCategory = S.String;

export interface ChangesetErrorInfo {
  errorMessage?: string;
  errorCategory?: ErrorCategory;
}
export const ChangesetErrorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorMessage: S.optional(S.String),
    errorCategory: S.optional(ErrorCategory),
  }),
).annotate({
  identifier: "ChangesetErrorInfo",
}) as any as S.Schema<ChangesetErrorInfo>;
export interface GetChangesetResponse {
  changesetId?: string;
  changesetArn?: string;
  datasetId?: string;
  changeType?: ChangeType;
  sourceParams?: { [key: string]: string | undefined };
  formatParams?: { [key: string]: string | undefined };
  createTime?: number;
  status?: IngestionStatus;
  errorInfo?: ChangesetErrorInfo;
  activeUntilTimestamp?: number;
  activeFromTimestamp?: number;
  updatesChangesetId?: string;
  updatedByChangesetId?: string;
}
export const GetChangesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    changesetArn: S.optional(S.String),
    datasetId: S.optional(S.String),
    changeType: S.optional(ChangeType),
    sourceParams: S.optional(SourceParams),
    formatParams: S.optional(FormatParams),
    createTime: S.optional(S.Number),
    status: S.optional(IngestionStatus),
    errorInfo: S.optional(ChangesetErrorInfo),
    activeUntilTimestamp: S.optional(S.Number),
    activeFromTimestamp: S.optional(S.Number),
    updatesChangesetId: S.optional(S.String),
    updatedByChangesetId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetChangesetResponse",
}) as any as S.Schema<GetChangesetResponse>;
export interface GetDatasetRequest {
  datasetId: string;
}
export const GetDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetId: S.String.pipe(T.HttpLabel("datasetId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasetsv2/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDatasetRequest",
}) as any as S.Schema<GetDatasetRequest>;
export type DatasetArn = string;
export type DatasetStatus =
  | "PENDING"
  | "FAILED"
  | "SUCCESS"
  | "RUNNING"
  | (string & {});
export const DatasetStatus = S.String;

export interface GetDatasetResponse {
  datasetId?: string;
  datasetArn?: string;
  datasetTitle?: string;
  kind?: DatasetKind;
  datasetDescription?: string;
  createTime?: number;
  lastModifiedTime?: number;
  schemaDefinition?: SchemaUnion;
  alias?: string;
  status?: DatasetStatus;
}
export const GetDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.optional(S.String),
    datasetArn: S.optional(S.String),
    datasetTitle: S.optional(S.String),
    kind: S.optional(DatasetKind),
    datasetDescription: S.optional(S.String),
    createTime: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
    schemaDefinition: S.optional(SchemaUnion),
    alias: S.optional(S.String),
    status: S.optional(DatasetStatus),
  }),
).annotate({
  identifier: "GetDatasetResponse",
}) as any as S.Schema<GetDatasetResponse>;
export interface GetDataViewRequest {
  dataViewId: string;
  datasetId: string;
}
export const GetDataViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataViewId: S.String.pipe(T.HttpLabel("dataViewId")),
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/datasets/{datasetId}/dataviewsv2/{dataViewId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataViewRequest",
}) as any as S.Schema<GetDataViewRequest>;
export interface DataViewErrorInfo {
  errorMessage?: string;
  errorCategory?: ErrorCategory;
}
export const DataViewErrorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorMessage: S.optional(S.String),
    errorCategory: S.optional(ErrorCategory),
  }),
).annotate({
  identifier: "DataViewErrorInfo",
}) as any as S.Schema<DataViewErrorInfo>;
export type DataViewArn = string;
export type DataViewStatus =
  | "RUNNING"
  | "STARTING"
  | "FAILED"
  | "CANCELLED"
  | "TIMEOUT"
  | "SUCCESS"
  | "PENDING"
  | "FAILED_CLEANUP_FAILED"
  | (string & {});
export const DataViewStatus = S.String;

export interface GetDataViewResponse {
  autoUpdate?: boolean;
  partitionColumns?: string[];
  datasetId?: string;
  asOfTimestamp?: number;
  errorInfo?: DataViewErrorInfo;
  lastModifiedTime?: number;
  createTime?: number;
  sortColumns?: string[];
  dataViewId?: string;
  dataViewArn?: string;
  destinationTypeParams?: DataViewDestinationTypeParams;
  status?: DataViewStatus;
}
export const GetDataViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoUpdate: S.optional(S.Boolean),
    partitionColumns: S.optional(PartitionColumnList),
    datasetId: S.optional(S.String),
    asOfTimestamp: S.optional(S.Number),
    errorInfo: S.optional(DataViewErrorInfo),
    lastModifiedTime: S.optional(S.Number),
    createTime: S.optional(S.Number),
    sortColumns: S.optional(SortColumnList),
    dataViewId: S.optional(S.String),
    dataViewArn: S.optional(S.String),
    destinationTypeParams: S.optional(DataViewDestinationTypeParams),
    status: S.optional(DataViewStatus),
  }),
).annotate({
  identifier: "GetDataViewResponse",
}) as any as S.Schema<GetDataViewResponse>;
export interface GetExternalDataViewAccessDetailsRequest {
  dataViewId: string;
  datasetId: string;
}
export const GetExternalDataViewAccessDetailsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      dataViewId: S.String.pipe(T.HttpLabel("dataViewId")),
      datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/datasets/{datasetId}/dataviewsv2/{dataViewId}/external-access-details",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetExternalDataViewAccessDetailsRequest",
}) as any as S.Schema<GetExternalDataViewAccessDetailsRequest>;
export type AccessKeyId = string;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AwsCredentials {
  accessKeyId?: string;
  secretAccessKey?: string | redacted.Redacted<string>;
  sessionToken?: string | redacted.Redacted<string>;
  expiration?: number;
}
export const AwsCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    secretAccessKey: S.optional(SensitiveString),
    sessionToken: S.optional(SensitiveString),
    expiration: S.optional(S.Number),
  }),
).annotate({ identifier: "AwsCredentials" }) as any as S.Schema<AwsCredentials>;
export type S3BucketName = string;
export type S3Key = string;
export interface S3Location {
  bucket: string;
  key: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, key: S.String }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface GetExternalDataViewAccessDetailsResponse {
  credentials?: AwsCredentials;
  s3Location?: S3Location;
}
export const GetExternalDataViewAccessDetailsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      credentials: S.optional(AwsCredentials),
      s3Location: S.optional(S3Location),
    }),
).annotate({
  identifier: "GetExternalDataViewAccessDetailsResponse",
}) as any as S.Schema<GetExternalDataViewAccessDetailsResponse>;
export interface GetPermissionGroupRequest {
  permissionGroupId: string;
}
export const GetPermissionGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/permission-group/{permissionGroupId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPermissionGroupRequest",
}) as any as S.Schema<GetPermissionGroupRequest>;
export type PermissionGroupMembershipStatus =
  | "ADDITION_IN_PROGRESS"
  | "ADDITION_SUCCESS"
  | "REMOVAL_IN_PROGRESS"
  | (string & {});
export const PermissionGroupMembershipStatus = S.String;

export interface PermissionGroup {
  permissionGroupId?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  applicationPermissions?: ApplicationPermission[];
  createTime?: number;
  lastModifiedTime?: number;
  membershipStatus?: PermissionGroupMembershipStatus;
}
export const PermissionGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.optional(S.String),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    applicationPermissions: S.optional(ApplicationPermissionList),
    createTime: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
    membershipStatus: S.optional(PermissionGroupMembershipStatus),
  }),
).annotate({
  identifier: "PermissionGroup",
}) as any as S.Schema<PermissionGroup>;
export interface GetPermissionGroupResponse {
  permissionGroup?: PermissionGroup;
}
export const GetPermissionGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ permissionGroup: S.optional(PermissionGroup) }),
).annotate({
  identifier: "GetPermissionGroupResponse",
}) as any as S.Schema<GetPermissionGroupResponse>;
export type SessionDuration = number;
export type IdType = string;
export interface GetProgrammaticAccessCredentialsRequest {
  durationInMinutes?: number;
  environmentId: string;
}
export const GetProgrammaticAccessCredentialsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      durationInMinutes: S.optional(S.Number).pipe(
        T.HttpQuery("durationInMinutes"),
      ),
      environmentId: S.String.pipe(T.HttpQuery("environmentId")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/credentials/programmatic" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetProgrammaticAccessCredentialsRequest",
}) as any as S.Schema<GetProgrammaticAccessCredentialsRequest>;
export type StringValueLength1to2552 = string;
export type StringValueMaxLength1000 = string;
export interface Credentials {
  accessKeyId?: string;
  secretAccessKey?: string;
  sessionToken?: string;
}
export const Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessKeyId: S.optional(S.String),
    secretAccessKey: S.optional(S.String),
    sessionToken: S.optional(S.String),
  }),
).annotate({ identifier: "Credentials" }) as any as S.Schema<Credentials>;
export interface GetProgrammaticAccessCredentialsResponse {
  credentials?: Credentials;
  durationInMinutes?: number;
}
export const GetProgrammaticAccessCredentialsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      credentials: S.optional(Credentials),
      durationInMinutes: S.optional(S.Number),
    }),
).annotate({
  identifier: "GetProgrammaticAccessCredentialsResponse",
}) as any as S.Schema<GetProgrammaticAccessCredentialsResponse>;
export interface GetUserRequest {
  userId: string;
}
export const GetUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.String.pipe(T.HttpLabel("userId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/user/{userId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetUserRequest" }) as any as S.Schema<GetUserRequest>;
export type UserStatus = "CREATING" | "ENABLED" | "DISABLED" | (string & {});
export const UserStatus = S.String;

export interface GetUserResponse {
  userId?: string;
  status?: UserStatus;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  type?: UserType;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  createTime?: number;
  lastEnabledTime?: number;
  lastDisabledTime?: number;
  lastModifiedTime?: number;
  lastLoginTime?: number;
}
export const GetUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    status: S.optional(UserStatus),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    emailAddress: S.optional(SensitiveString),
    type: S.optional(UserType),
    apiAccess: S.optional(ApiAccess),
    apiAccessPrincipalArn: S.optional(S.String),
    createTime: S.optional(S.Number),
    lastEnabledTime: S.optional(S.Number),
    lastDisabledTime: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
    lastLoginTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetUserResponse",
}) as any as S.Schema<GetUserResponse>;
export type LocationType = "INGESTION" | "SAGEMAKER" | (string & {});
export const LocationType = S.String;

export interface GetWorkingLocationRequest {
  locationType?: LocationType;
}
export const GetWorkingLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ locationType: S.optional(LocationType) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workingLocationV1" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkingLocationRequest",
}) as any as S.Schema<GetWorkingLocationRequest>;
export type StringValueLength1to1024 = string;
export type StringValueLength1to63 = string;
export interface GetWorkingLocationResponse {
  s3Uri?: string;
  s3Path?: string;
  s3Bucket?: string;
}
export const GetWorkingLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.optional(S.String),
    s3Path: S.optional(S.String),
    s3Bucket: S.optional(S.String),
  }),
).annotate({
  identifier: "GetWorkingLocationResponse",
}) as any as S.Schema<GetWorkingLocationResponse>;
export type ResultLimit = number;
export type PaginationToken = string;
export interface ListChangesetsRequest {
  datasetId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListChangesetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{datasetId}/changesetsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChangesetsRequest",
}) as any as S.Schema<ListChangesetsRequest>;
export interface ChangesetSummary {
  changesetId?: string;
  changesetArn?: string;
  datasetId?: string;
  changeType?: ChangeType;
  sourceParams?: { [key: string]: string | undefined };
  formatParams?: { [key: string]: string | undefined };
  createTime?: number;
  status?: IngestionStatus;
  errorInfo?: ChangesetErrorInfo;
  activeUntilTimestamp?: number;
  activeFromTimestamp?: number;
  updatesChangesetId?: string;
  updatedByChangesetId?: string;
}
export const ChangesetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    changesetArn: S.optional(S.String),
    datasetId: S.optional(S.String),
    changeType: S.optional(ChangeType),
    sourceParams: S.optional(SourceParams),
    formatParams: S.optional(FormatParams),
    createTime: S.optional(S.Number),
    status: S.optional(IngestionStatus),
    errorInfo: S.optional(ChangesetErrorInfo),
    activeUntilTimestamp: S.optional(S.Number),
    activeFromTimestamp: S.optional(S.Number),
    updatesChangesetId: S.optional(S.String),
    updatedByChangesetId: S.optional(S.String),
  }),
).annotate({
  identifier: "ChangesetSummary",
}) as any as S.Schema<ChangesetSummary>;
export type ChangesetList = ChangesetSummary[];
export const ChangesetList = /*@__PURE__*/ S.Array(ChangesetSummary);
export interface ListChangesetsResponse {
  changesets?: ChangesetSummary[];
  nextToken?: string;
}
export const ListChangesetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    changesets: S.optional(ChangesetList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChangesetsResponse",
}) as any as S.Schema<ListChangesetsResponse>;
export interface ListDatasetsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasetsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export interface Dataset {
  datasetId?: string;
  datasetArn?: string;
  datasetTitle?: string;
  kind?: DatasetKind;
  datasetDescription?: string;
  ownerInfo?: DatasetOwnerInfo;
  createTime?: number;
  lastModifiedTime?: number;
  schemaDefinition?: SchemaUnion;
  alias?: string;
}
export const Dataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.optional(S.String),
    datasetArn: S.optional(S.String),
    datasetTitle: S.optional(S.String),
    kind: S.optional(DatasetKind),
    datasetDescription: S.optional(S.String),
    ownerInfo: S.optional(DatasetOwnerInfo),
    createTime: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
    schemaDefinition: S.optional(SchemaUnion),
    alias: S.optional(S.String),
  }),
).annotate({ identifier: "Dataset" }) as any as S.Schema<Dataset>;
export type DatasetList = Dataset[];
export const DatasetList = /*@__PURE__*/ S.Array(Dataset);
export interface ListDatasetsResponse {
  datasets?: Dataset[];
  nextToken?: string;
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasets: S.optional(DatasetList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListDataViewsRequest {
  datasetId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataViewsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/datasets/{datasetId}/dataviewsv2" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataViewsRequest",
}) as any as S.Schema<ListDataViewsRequest>;
export interface DataViewSummary {
  dataViewId?: string;
  dataViewArn?: string;
  datasetId?: string;
  asOfTimestamp?: number;
  partitionColumns?: string[];
  sortColumns?: string[];
  status?: DataViewStatus;
  errorInfo?: DataViewErrorInfo;
  destinationTypeProperties?: DataViewDestinationTypeParams;
  autoUpdate?: boolean;
  createTime?: number;
  lastModifiedTime?: number;
}
export const DataViewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataViewId: S.optional(S.String),
    dataViewArn: S.optional(S.String),
    datasetId: S.optional(S.String),
    asOfTimestamp: S.optional(S.Number),
    partitionColumns: S.optional(PartitionColumnList),
    sortColumns: S.optional(SortColumnList),
    status: S.optional(DataViewStatus),
    errorInfo: S.optional(DataViewErrorInfo),
    destinationTypeProperties: S.optional(DataViewDestinationTypeParams),
    autoUpdate: S.optional(S.Boolean),
    createTime: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataViewSummary",
}) as any as S.Schema<DataViewSummary>;
export type DataViewList = DataViewSummary[];
export const DataViewList = /*@__PURE__*/ S.Array(DataViewSummary);
export interface ListDataViewsResponse {
  nextToken?: string;
  dataViews?: DataViewSummary[];
}
export const ListDataViewsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    dataViews: S.optional(DataViewList),
  }),
).annotate({
  identifier: "ListDataViewsResponse",
}) as any as S.Schema<ListDataViewsResponse>;
export interface ListPermissionGroupsRequest {
  nextToken?: string;
  maxResults: number;
}
export const ListPermissionGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/permission-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionGroupsRequest",
}) as any as S.Schema<ListPermissionGroupsRequest>;
export type PermissionGroupList = PermissionGroup[];
export const PermissionGroupList = /*@__PURE__*/ S.Array(PermissionGroup);
export interface ListPermissionGroupsResponse {
  permissionGroups?: PermissionGroup[];
  nextToken?: string;
}
export const ListPermissionGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroups: S.optional(PermissionGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionGroupsResponse",
}) as any as S.Schema<ListPermissionGroupsResponse>;
export interface ListPermissionGroupsByUserRequest {
  userId: string;
  nextToken?: string;
  maxResults: number;
}
export const ListPermissionGroupsByUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String.pipe(T.HttpLabel("userId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/user/{userId}/permission-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionGroupsByUserRequest",
}) as any as S.Schema<ListPermissionGroupsByUserRequest>;
export interface PermissionGroupByUser {
  permissionGroupId?: string;
  name?: string | redacted.Redacted<string>;
  membershipStatus?: PermissionGroupMembershipStatus;
}
export const PermissionGroupByUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.optional(S.String),
    name: S.optional(SensitiveString),
    membershipStatus: S.optional(PermissionGroupMembershipStatus),
  }),
).annotate({
  identifier: "PermissionGroupByUser",
}) as any as S.Schema<PermissionGroupByUser>;
export type PermissionGroupByUserList = PermissionGroupByUser[];
export const PermissionGroupByUserList = /*@__PURE__*/ S.Array(
  PermissionGroupByUser,
);
export interface ListPermissionGroupsByUserResponse {
  permissionGroups?: PermissionGroupByUser[];
  nextToken?: string;
}
export const ListPermissionGroupsByUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroups: S.optional(PermissionGroupByUserList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionGroupsByUserResponse",
}) as any as S.Schema<ListPermissionGroupsByUserResponse>;
export interface ListUsersRequest {
  nextToken?: string;
  maxResults: number;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/user" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export interface User {
  userId?: string;
  status?: UserStatus;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  type?: UserType;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  createTime?: number;
  lastEnabledTime?: number;
  lastDisabledTime?: number;
  lastModifiedTime?: number;
  lastLoginTime?: number;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    status: S.optional(UserStatus),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    emailAddress: S.optional(SensitiveString),
    type: S.optional(UserType),
    apiAccess: S.optional(ApiAccess),
    apiAccessPrincipalArn: S.optional(S.String),
    createTime: S.optional(S.Number),
    lastEnabledTime: S.optional(S.Number),
    lastDisabledTime: S.optional(S.Number),
    lastModifiedTime: S.optional(S.Number),
    lastLoginTime: S.optional(S.Number),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface ListUsersResponse {
  users?: User[];
  nextToken?: string;
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ users: S.optional(UserList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface ListUsersByPermissionGroupRequest {
  permissionGroupId: string;
  nextToken?: string;
  maxResults: number;
}
export const ListUsersByPermissionGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.Number.pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/permission-group/{permissionGroupId}/users",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUsersByPermissionGroupRequest",
}) as any as S.Schema<ListUsersByPermissionGroupRequest>;
export interface UserByPermissionGroup {
  userId?: string;
  status?: UserStatus;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  emailAddress?: string | redacted.Redacted<string>;
  type?: UserType;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  membershipStatus?: PermissionGroupMembershipStatus;
}
export const UserByPermissionGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    status: S.optional(UserStatus),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    emailAddress: S.optional(SensitiveString),
    type: S.optional(UserType),
    apiAccess: S.optional(ApiAccess),
    apiAccessPrincipalArn: S.optional(S.String),
    membershipStatus: S.optional(PermissionGroupMembershipStatus),
  }),
).annotate({
  identifier: "UserByPermissionGroup",
}) as any as S.Schema<UserByPermissionGroup>;
export type UserByPermissionGroupList = UserByPermissionGroup[];
export const UserByPermissionGroupList = /*@__PURE__*/ S.Array(
  UserByPermissionGroup,
);
export interface ListUsersByPermissionGroupResponse {
  users?: UserByPermissionGroup[];
  nextToken?: string;
}
export const ListUsersByPermissionGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    users: S.optional(UserByPermissionGroupList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUsersByPermissionGroupResponse",
}) as any as S.Schema<ListUsersByPermissionGroupResponse>;
export interface ResetUserPasswordRequest {
  userId: string;
  clientToken?: string;
}
export const ResetUserPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String.pipe(T.HttpLabel("userId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/user/{userId}/password" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetUserPasswordRequest",
}) as any as S.Schema<ResetUserPasswordRequest>;
export type Password = string | redacted.Redacted<string>;
export interface ResetUserPasswordResponse {
  userId?: string;
  temporaryPassword?: string | redacted.Redacted<string>;
}
export const ResetUserPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    temporaryPassword: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ResetUserPasswordResponse",
}) as any as S.Schema<ResetUserPasswordResponse>;
export interface UpdateChangesetRequest {
  clientToken?: string;
  datasetId: string;
  changesetId: string;
  sourceParams: { [key: string]: string | undefined };
  formatParams: { [key: string]: string | undefined };
}
export const UpdateChangesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    changesetId: S.String.pipe(T.HttpLabel("changesetId")),
    sourceParams: SourceParams,
    formatParams: FormatParams,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/datasets/{datasetId}/changesetsv2/{changesetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateChangesetRequest",
}) as any as S.Schema<UpdateChangesetRequest>;
export interface UpdateChangesetResponse {
  changesetId?: string;
  datasetId?: string;
}
export const UpdateChangesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    changesetId: S.optional(S.String),
    datasetId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateChangesetResponse",
}) as any as S.Schema<UpdateChangesetResponse>;
export interface UpdateDatasetRequest {
  clientToken?: string;
  datasetId: string;
  datasetTitle: string;
  kind: DatasetKind;
  datasetDescription?: string;
  alias?: string;
  schemaDefinition?: SchemaUnion;
}
export const UpdateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    datasetId: S.String.pipe(T.HttpLabel("datasetId")),
    datasetTitle: S.String,
    kind: DatasetKind,
    datasetDescription: S.optional(S.String),
    alias: S.optional(S.String),
    schemaDefinition: S.optional(SchemaUnion),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/datasetsv2/{datasetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDatasetRequest",
}) as any as S.Schema<UpdateDatasetRequest>;
export interface UpdateDatasetResponse {
  datasetId?: string;
}
export const UpdateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ datasetId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateDatasetResponse",
}) as any as S.Schema<UpdateDatasetResponse>;
export interface UpdatePermissionGroupRequest {
  permissionGroupId: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  applicationPermissions?: ApplicationPermission[];
  clientToken?: string;
}
export const UpdatePermissionGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionGroupId: S.String.pipe(T.HttpLabel("permissionGroupId")),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    applicationPermissions: S.optional(ApplicationPermissionList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/permission-group/{permissionGroupId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePermissionGroupRequest",
}) as any as S.Schema<UpdatePermissionGroupRequest>;
export interface UpdatePermissionGroupResponse {
  permissionGroupId?: string;
}
export const UpdatePermissionGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ permissionGroupId: S.optional(S.String) }),
).annotate({
  identifier: "UpdatePermissionGroupResponse",
}) as any as S.Schema<UpdatePermissionGroupResponse>;
export interface UpdateUserRequest {
  userId: string;
  type?: UserType;
  firstName?: string | redacted.Redacted<string>;
  lastName?: string | redacted.Redacted<string>;
  apiAccess?: ApiAccess;
  apiAccessPrincipalArn?: string;
  clientToken?: string;
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.String.pipe(T.HttpLabel("userId")),
    type: S.optional(UserType),
    firstName: S.optional(SensitiveString),
    lastName: S.optional(SensitiveString),
    apiAccess: S.optional(ApiAccess),
    apiAccessPrincipalArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/user/{userId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserRequest",
}) as any as S.Schema<UpdateUserRequest>;
export interface UpdateUserResponse {
  userId?: string;
}
export const UpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export type ErrorMessage2 = string;
export type AssociateUserToPermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a user to a permission group to grant permissions for actions a user can perform in FinSpace.
 */
export const associateUserToPermissionGroup: API.OperationMethod<
  AssociateUserToPermissionGroupRequest,
  AssociateUserToPermissionGroupResponse,
  AssociateUserToPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateUserToPermissionGroupRequest,
  output: AssociateUserToPermissionGroupResponse,
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
  operationName: "AssociateUserToPermissionGroup",
}));

export type CreateChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Changeset in a FinSpace Dataset.
 */
export const createChangeset: API.OperationMethod<
  CreateChangesetRequest,
  CreateChangesetResponse,
  CreateChangesetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChangesetRequest,
  output: CreateChangesetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChangeset",
}));

export type CreateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new FinSpace Dataset.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
}));

export type CreateDataViewError =
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Dataview for a Dataset.
 */
export const createDataView: API.OperationMethod<
  CreateDataViewRequest,
  CreateDataViewResponse,
  CreateDataViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataViewRequest,
  output: CreateDataViewResponse,
  errors: [
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataView",
}));

export type CreatePermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a group of permissions for various actions that a user can perform in FinSpace.
 */
export const createPermissionGroup: API.OperationMethod<
  CreatePermissionGroupRequest,
  CreatePermissionGroupResponse,
  CreatePermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePermissionGroupRequest,
  output: CreatePermissionGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermissionGroup",
}));

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new user in FinSpace.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a FinSpace Dataset.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

export type DeletePermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a permission group. This action is irreversible.
 */
export const deletePermissionGroup: API.OperationMethod<
  DeletePermissionGroupRequest,
  DeletePermissionGroupResponse,
  DeletePermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePermissionGroupRequest,
  output: DeletePermissionGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionGroup",
}));

export type DisableUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Denies access to the FinSpace web application and API for the specified user.
 */
export const disableUser: API.OperationMethod<
  DisableUserRequest,
  DisableUserResponse,
  DisableUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableUserRequest,
  output: DisableUserResponse,
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
  operationName: "DisableUser",
}));

export type DisassociateUserFromPermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a user from a permission group.
 */
export const disassociateUserFromPermissionGroup: API.OperationMethod<
  DisassociateUserFromPermissionGroupRequest,
  DisassociateUserFromPermissionGroupResponse,
  DisassociateUserFromPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateUserFromPermissionGroupRequest,
  output: DisassociateUserFromPermissionGroupResponse,
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
  operationName: "DisassociateUserFromPermissionGroup",
}));

export type EnableUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows the specified user to access the FinSpace web application and API.
 */
export const enableUser: API.OperationMethod<
  EnableUserRequest,
  EnableUserResponse,
  EnableUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableUserRequest,
  output: EnableUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableUser",
}));

export type GetChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about a Changeset.
 */
export const getChangeset: API.OperationMethod<
  GetChangesetRequest,
  GetChangesetResponse,
  GetChangesetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChangesetRequest,
  output: GetChangesetResponse,
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
  operationName: "GetChangeset",
}));

export type GetDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a Dataset.
 */
export const getDataset: API.OperationMethod<
  GetDatasetRequest,
  GetDatasetResponse,
  GetDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDatasetRequest,
  output: GetDatasetResponse,
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
  operationName: "GetDataset",
}));

export type GetDataViewError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a Dataview.
 */
export const getDataView: API.OperationMethod<
  GetDataViewRequest,
  GetDataViewResponse,
  GetDataViewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataViewRequest,
  output: GetDataViewResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataView",
}));

export type GetExternalDataViewAccessDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the credentials to access the external Dataview from an S3 location. To call this API:
 *
 * - You must retrieve the programmatic credentials.
 *
 * - You must be a member of a FinSpace user group, where the dataset that you want to access has `Read Dataset Data` permissions.
 */
export const getExternalDataViewAccessDetails: API.OperationMethod<
  GetExternalDataViewAccessDetailsRequest,
  GetExternalDataViewAccessDetailsResponse,
  GetExternalDataViewAccessDetailsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExternalDataViewAccessDetailsRequest,
  output: GetExternalDataViewAccessDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExternalDataViewAccessDetails",
}));

export type GetPermissionGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific permission group.
 */
export const getPermissionGroup: API.OperationMethod<
  GetPermissionGroupRequest,
  GetPermissionGroupResponse,
  GetPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPermissionGroupRequest,
  output: GetPermissionGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermissionGroup",
}));

export type GetProgrammaticAccessCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request programmatic credentials to use with FinSpace SDK. For more information, see Step 2. Access credentials programmatically using IAM access key id and secret access key.
 */
export const getProgrammaticAccessCredentials: API.OperationMethod<
  GetProgrammaticAccessCredentialsRequest,
  GetProgrammaticAccessCredentialsResponse,
  GetProgrammaticAccessCredentialsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProgrammaticAccessCredentialsRequest,
  output: GetProgrammaticAccessCredentialsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProgrammaticAccessCredentials",
}));

export type GetUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details for a specific user.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserRequest,
  output: GetUserResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUser",
}));

export type GetWorkingLocationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A temporary Amazon S3 location, where you can copy your files from a source location to stage or use
 * as a scratch space in FinSpace notebook.
 */
export const getWorkingLocation: API.OperationMethod<
  GetWorkingLocationRequest,
  GetWorkingLocationResponse,
  GetWorkingLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkingLocationRequest,
  output: GetWorkingLocationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkingLocation",
}));

export type ListChangesetsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the FinSpace Changesets for a Dataset.
 */
export const listChangesets: API.PaginatedOperationMethod<
  ListChangesetsRequest,
  ListChangesetsResponse,
  ListChangesetsError,
  Creds | HttpClient.HttpClient,
  ChangesetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChangesetsRequest,
  output: ListChangesetsResponse,
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
  operationName: "ListChangesets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "changesets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDatasetsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the active Datasets that a user has access to.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Creds | HttpClient.HttpClient,
  Dataset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "datasets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataViewsError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available Dataviews for a Dataset.
 */
export const listDataViews: API.PaginatedOperationMethod<
  ListDataViewsRequest,
  ListDataViewsResponse,
  ListDataViewsError,
  Creds | HttpClient.HttpClient,
  DataViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataViewsRequest,
  output: ListDataViewsResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available permission groups in FinSpace.
 */
export const listPermissionGroups: API.PaginatedOperationMethod<
  ListPermissionGroupsRequest,
  ListPermissionGroupsResponse,
  ListPermissionGroupsError,
  Creds | HttpClient.HttpClient,
  PermissionGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionGroupsRequest,
  output: ListPermissionGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "permissionGroups",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionGroupsByUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the permission groups that are associated with a specific user.
 */
export const listPermissionGroupsByUser: API.OperationMethod<
  ListPermissionGroupsByUserRequest,
  ListPermissionGroupsByUserResponse,
  ListPermissionGroupsByUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListPermissionGroupsByUserRequest,
  output: ListPermissionGroupsByUserResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionGroupsByUser",
}));

export type ListUsersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available users in FinSpace.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Creds | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "users",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUsersByPermissionGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details of all the users in a specific permission group.
 */
export const listUsersByPermissionGroup: API.OperationMethod<
  ListUsersByPermissionGroupRequest,
  ListUsersByPermissionGroupResponse,
  ListUsersByPermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListUsersByPermissionGroupRequest,
  output: ListUsersByPermissionGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsersByPermissionGroup",
}));

export type ResetUserPasswordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resets the password for a specified user ID and generates a temporary one. Only a superuser can reset password for other users. Resetting the password immediately invalidates the previous password associated with the user.
 */
export const resetUserPassword: API.OperationMethod<
  ResetUserPasswordRequest,
  ResetUserPasswordResponse,
  ResetUserPasswordError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetUserPasswordRequest,
  output: ResetUserPasswordResponse,
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
  operationName: "ResetUserPassword",
}));

export type UpdateChangesetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a FinSpace Changeset.
 */
export const updateChangeset: API.OperationMethod<
  UpdateChangesetRequest,
  UpdateChangesetResponse,
  UpdateChangesetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChangesetRequest,
  output: UpdateChangesetResponse,
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
  operationName: "UpdateChangeset",
}));

export type UpdateDatasetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a FinSpace Dataset.
 */
export const updateDataset: API.OperationMethod<
  UpdateDatasetRequest,
  UpdateDatasetResponse,
  UpdateDatasetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetRequest,
  output: UpdateDatasetResponse,
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
  operationName: "UpdateDataset",
}));

export type UpdatePermissionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the details of a permission group. You cannot modify a `permissionGroupID`.
 */
export const updatePermissionGroup: API.OperationMethod<
  UpdatePermissionGroupRequest,
  UpdatePermissionGroupResponse,
  UpdatePermissionGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePermissionGroupRequest,
  output: UpdatePermissionGroupResponse,
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
  operationName: "UpdatePermissionGroup",
}));

export type UpdateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the details of the specified user. You cannot update the `userId` for a user.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResponse,
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
  operationName: "UpdateUser",
}));
