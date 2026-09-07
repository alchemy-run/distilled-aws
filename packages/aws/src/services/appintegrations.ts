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
  sdkId: "AppIntegrations",
  serviceShapeName: "AmazonAppIntegrationService",
});
const auth = T.AwsAuthSigv4({ name: "app-integrations" });
const ver = T.ServiceVersion("2020-07-29");
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
              `https://app-integrations-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://app-integrations-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://app-integrations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://app-integrations.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DuplicateResourceException
  extends /*@__PURE__*/ S.TaggedError<DuplicateResourceException>()(
    "DuplicateResourceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceQuotaExceededException>()(
    "ResourceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationName = string;
export type ApplicationNamespace = string;
export type Description = string;
export type URL = string;
export type ApplicationTrustedSource = string;
export type ApplicationApprovedOrigins = string[];
export const ApplicationApprovedOrigins = /*@__PURE__*/ S.Array(S.String);
export interface ExternalUrlConfig {
  AccessUrl: string;
  ApprovedOrigins?: string[];
}
export const ExternalUrlConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessUrl: S.String,
    ApprovedOrigins: S.optional(ApplicationApprovedOrigins),
  }),
).annotate({
  identifier: "ExternalUrlConfig",
}) as any as S.Schema<ExternalUrlConfig>;
export interface ApplicationSourceConfig {
  ExternalUrlConfig?: ExternalUrlConfig;
}
export const ApplicationSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExternalUrlConfig: S.optional(ExternalUrlConfig) }),
).annotate({
  identifier: "ApplicationSourceConfig",
}) as any as S.Schema<ApplicationSourceConfig>;
export type EventName = string;
export interface Subscription {
  Event: string;
  Description?: string;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Event: S.String, Description: S.optional(S.String) }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = /*@__PURE__*/ S.Array(Subscription);
export type EventDefinitionSchema = string;
export interface Publication {
  Event: string;
  Schema: string;
  Description?: string;
}
export const Publication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Event: S.String,
    Schema: S.String,
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "Publication" }) as any as S.Schema<Publication>;
export type PublicationList = Publication[];
export const PublicationList = /*@__PURE__*/ S.Array(Publication);
export type IdempotencyToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Permission = string;
export type PermissionList = string[];
export const PermissionList = /*@__PURE__*/ S.Array(S.String);
export type InitializationTimeout = number;
export type ContactHandlingScope =
  | "CROSS_CONTACTS"
  | "PER_CONTACT"
  | (string & {});
export const ContactHandlingScope = /*@__PURE__*/ S.String;

export interface ContactHandling {
  Scope?: ContactHandlingScope;
}
export const ContactHandling = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Scope: S.optional(ContactHandlingScope) }),
).annotate({
  identifier: "ContactHandling",
}) as any as S.Schema<ContactHandling>;
export interface ApplicationConfig {
  ContactHandling?: ContactHandling;
}
export const ApplicationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactHandling: S.optional(ContactHandling) }),
).annotate({
  identifier: "ApplicationConfig",
}) as any as S.Schema<ApplicationConfig>;
export type IframePermission = string;
export type IframePermissionList = string[];
export const IframePermissionList = /*@__PURE__*/ S.Array(S.String);
export interface IframeConfig {
  Allow?: string[];
  Sandbox?: string[];
}
export const IframeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Allow: S.optional(IframePermissionList),
    Sandbox: S.optional(IframePermissionList),
  }),
).annotate({ identifier: "IframeConfig" }) as any as S.Schema<IframeConfig>;
export type ApplicationType =
  | "STANDARD"
  | "SERVICE"
  | "MCP_SERVER"
  | (string & {});
export const ApplicationType = /*@__PURE__*/ S.String;

export interface CreateApplicationRequest {
  Name: string;
  Namespace: string;
  Description?: string;
  ApplicationSourceConfig: ApplicationSourceConfig;
  Subscriptions?: Subscription[];
  Publications?: Publication[];
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  Permissions?: string[];
  IsService?: boolean;
  InitializationTimeout?: number;
  ApplicationConfig?: ApplicationConfig;
  IframeConfig?: IframeConfig;
  ApplicationType?: ApplicationType;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Namespace: S.String,
    Description: S.optional(S.String),
    ApplicationSourceConfig: ApplicationSourceConfig,
    Subscriptions: S.optional(SubscriptionList),
    Publications: S.optional(PublicationList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
    Permissions: S.optional(PermissionList),
    IsService: S.optional(S.Boolean),
    InitializationTimeout: S.optional(S.Number),
    ApplicationConfig: S.optional(ApplicationConfig),
    IframeConfig: S.optional(IframeConfig),
    ApplicationType: S.optional(ApplicationType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type Arn = string;
export type UUID = string;
export interface CreateApplicationResponse {
  Arn?: string;
  Id?: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Id: S.optional(S.String) }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type Name = string;
export type NonBlankString = string;
export type SourceURI = string;
export interface ScheduleConfiguration {
  FirstExecutionFrom?: string;
  Object?: string;
  ScheduleExpression: string;
}
export const ScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirstExecutionFrom: S.optional(S.String),
    Object: S.optional(S.String),
    ScheduleExpression: S.String,
  }),
).annotate({
  identifier: "ScheduleConfiguration",
}) as any as S.Schema<ScheduleConfiguration>;
export type NonBlankLongString = string;
export type FolderList = string[];
export const FolderList = /*@__PURE__*/ S.Array(S.String);
export type Fields = string;
export type FieldsList = string[];
export const FieldsList = /*@__PURE__*/ S.Array(S.String);
export type FieldsMap = { [key: string]: string[] | undefined };
export const FieldsMap = /*@__PURE__*/ S.Record(
  S.String,
  FieldsList.pipe(S.optional),
);
export interface FileConfiguration {
  Folders: string[];
  Filters?: { [key: string]: string[] | undefined };
}
export const FileConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Folders: FolderList, Filters: S.optional(FieldsMap) }),
).annotate({
  identifier: "FileConfiguration",
}) as any as S.Schema<FileConfiguration>;
export type ObjectConfiguration = {
  [key: string]: { [key: string]: string[] | undefined } | undefined;
};
export const ObjectConfiguration = /*@__PURE__*/ S.Record(
  S.String,
  FieldsMap.pipe(S.optional),
);
export interface CreateDataIntegrationRequest {
  Name: string;
  Description?: string;
  KmsKey: string;
  SourceURI?: string;
  ScheduleConfig?: ScheduleConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  FileConfiguration?: FileConfiguration;
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export const CreateDataIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    KmsKey: S.String,
    SourceURI: S.optional(S.String),
    ScheduleConfig: S.optional(ScheduleConfiguration),
    Tags: S.optional(TagMap),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FileConfiguration: S.optional(FileConfiguration),
    ObjectConfiguration: S.optional(ObjectConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dataIntegrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataIntegrationRequest",
}) as any as S.Schema<CreateDataIntegrationRequest>;
export interface CreateDataIntegrationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  KmsKey?: string;
  SourceURI?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  Tags?: { [key: string]: string | undefined };
  ClientToken?: string;
  FileConfiguration?: FileConfiguration;
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export const CreateDataIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    KmsKey: S.optional(S.String),
    SourceURI: S.optional(S.String),
    ScheduleConfiguration: S.optional(ScheduleConfiguration),
    Tags: S.optional(TagMap),
    ClientToken: S.optional(S.String),
    FileConfiguration: S.optional(FileConfiguration),
    ObjectConfiguration: S.optional(ObjectConfiguration),
  }),
).annotate({
  identifier: "CreateDataIntegrationResponse",
}) as any as S.Schema<CreateDataIntegrationResponse>;
export type Identifier = string;
export type ClientId = string;
export type DestinationURI = string;
export type ClientAssociationMetadata = { [key: string]: string | undefined };
export const ClientAssociationMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ExecutionMode = "ON_DEMAND" | "SCHEDULED" | (string & {});
export const ExecutionMode = /*@__PURE__*/ S.String;

export interface OnDemandConfiguration {
  StartTime: string;
  EndTime?: string;
}
export const OnDemandConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StartTime: S.String, EndTime: S.optional(S.String) }),
).annotate({
  identifier: "OnDemandConfiguration",
}) as any as S.Schema<OnDemandConfiguration>;
export interface ExecutionConfiguration {
  ExecutionMode: ExecutionMode;
  OnDemandConfiguration?: OnDemandConfiguration;
  ScheduleConfiguration?: ScheduleConfiguration;
}
export const ExecutionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionMode: ExecutionMode,
    OnDemandConfiguration: S.optional(OnDemandConfiguration),
    ScheduleConfiguration: S.optional(ScheduleConfiguration),
  }),
).annotate({
  identifier: "ExecutionConfiguration",
}) as any as S.Schema<ExecutionConfiguration>;
export interface CreateDataIntegrationAssociationRequest {
  DataIntegrationIdentifier: string;
  ClientId?: string;
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
  DestinationURI?: string;
  ClientAssociationMetadata?: { [key: string]: string | undefined };
  ClientToken?: string;
  ExecutionConfiguration?: ExecutionConfiguration;
}
export const CreateDataIntegrationAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataIntegrationIdentifier: S.String.pipe(
        T.HttpLabel("DataIntegrationIdentifier"),
      ),
      ClientId: S.optional(S.String),
      ObjectConfiguration: S.optional(ObjectConfiguration),
      DestinationURI: S.optional(S.String),
      ClientAssociationMetadata: S.optional(ClientAssociationMetadata),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      ExecutionConfiguration: S.optional(ExecutionConfiguration),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/dataIntegrations/{DataIntegrationIdentifier}/associations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDataIntegrationAssociationRequest",
}) as any as S.Schema<CreateDataIntegrationAssociationRequest>;
export interface CreateDataIntegrationAssociationResponse {
  DataIntegrationAssociationId?: string;
  DataIntegrationArn?: string;
}
export const CreateDataIntegrationAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataIntegrationAssociationId: S.optional(S.String),
      DataIntegrationArn: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateDataIntegrationAssociationResponse",
}) as any as S.Schema<CreateDataIntegrationAssociationResponse>;
export type Source = string;
export interface EventFilter {
  Source: string;
}
export const EventFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Source: S.String }),
).annotate({ identifier: "EventFilter" }) as any as S.Schema<EventFilter>;
export type EventBridgeBus = string;
export interface CreateEventIntegrationRequest {
  Name: string;
  Description?: string;
  EventFilter: EventFilter;
  EventBridgeBus: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateEventIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    EventFilter: EventFilter,
    EventBridgeBus: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/eventIntegrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventIntegrationRequest",
}) as any as S.Schema<CreateEventIntegrationRequest>;
export interface CreateEventIntegrationResponse {
  EventIntegrationArn?: string;
}
export const CreateEventIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventIntegrationArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateEventIntegrationResponse",
}) as any as S.Schema<CreateEventIntegrationResponse>;
export type ArnOrUUID = string;
export interface DeleteApplicationRequest {
  Arn: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteDataIntegrationRequest {
  DataIntegrationIdentifier: string;
}
export const DeleteDataIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataIntegrationIdentifier: S.String.pipe(
      T.HttpLabel("DataIntegrationIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/dataIntegrations/{DataIntegrationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataIntegrationRequest",
}) as any as S.Schema<DeleteDataIntegrationRequest>;
export interface DeleteDataIntegrationResponse {}
export const DeleteDataIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataIntegrationResponse",
}) as any as S.Schema<DeleteDataIntegrationResponse>;
export interface DeleteEventIntegrationRequest {
  Name: string;
}
export const DeleteEventIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/eventIntegrations/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventIntegrationRequest",
}) as any as S.Schema<DeleteEventIntegrationRequest>;
export interface DeleteEventIntegrationResponse {}
export const DeleteEventIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEventIntegrationResponse",
}) as any as S.Schema<DeleteEventIntegrationResponse>;
export interface GetApplicationRequest {
  Arn: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export interface GetApplicationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Namespace?: string;
  Description?: string;
  ApplicationSourceConfig?: ApplicationSourceConfig;
  Subscriptions?: Subscription[];
  Publications?: Publication[];
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  Tags?: { [key: string]: string | undefined };
  Permissions?: string[];
  IsService?: boolean;
  InitializationTimeout?: number;
  ApplicationConfig?: ApplicationConfig;
  IframeConfig?: IframeConfig;
  ApplicationType?: ApplicationType;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Namespace: S.optional(S.String),
    Description: S.optional(S.String),
    ApplicationSourceConfig: S.optional(ApplicationSourceConfig),
    Subscriptions: S.optional(SubscriptionList),
    Publications: S.optional(PublicationList),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Tags: S.optional(TagMap),
    Permissions: S.optional(PermissionList),
    IsService: S.optional(S.Boolean),
    InitializationTimeout: S.optional(S.Number),
    ApplicationConfig: S.optional(ApplicationConfig),
    IframeConfig: S.optional(IframeConfig),
    ApplicationType: S.optional(ApplicationType),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export interface GetDataIntegrationRequest {
  Identifier: string;
}
export const GetDataIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dataIntegrations/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataIntegrationRequest",
}) as any as S.Schema<GetDataIntegrationRequest>;
export interface GetDataIntegrationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  KmsKey?: string;
  SourceURI?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  Tags?: { [key: string]: string | undefined };
  FileConfiguration?: FileConfiguration;
  ObjectConfiguration?: {
    [key: string]: { [key: string]: string[] | undefined } | undefined;
  };
}
export const GetDataIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    KmsKey: S.optional(S.String),
    SourceURI: S.optional(S.String),
    ScheduleConfiguration: S.optional(ScheduleConfiguration),
    Tags: S.optional(TagMap),
    FileConfiguration: S.optional(FileConfiguration),
    ObjectConfiguration: S.optional(ObjectConfiguration),
  }),
).annotate({
  identifier: "GetDataIntegrationResponse",
}) as any as S.Schema<GetDataIntegrationResponse>;
export interface GetEventIntegrationRequest {
  Name: string;
}
export const GetEventIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/eventIntegrations/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventIntegrationRequest",
}) as any as S.Schema<GetEventIntegrationRequest>;
export interface GetEventIntegrationResponse {
  Name?: string;
  Description?: string;
  EventIntegrationArn?: string;
  EventBridgeBus?: string;
  EventFilter?: EventFilter;
  Tags?: { [key: string]: string | undefined };
}
export const GetEventIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    EventIntegrationArn: S.optional(S.String),
    EventBridgeBus: S.optional(S.String),
    EventFilter: S.optional(EventFilter),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetEventIntegrationResponse",
}) as any as S.Schema<GetEventIntegrationResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListApplicationAssociationsRequest {
  ApplicationId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListApplicationAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/associations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationAssociationsRequest",
}) as any as S.Schema<ListApplicationAssociationsRequest>;
export interface ApplicationAssociationSummary {
  ApplicationAssociationArn?: string;
  ApplicationArn?: string;
  ClientId?: string;
}
export const ApplicationAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationAssociationArn: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
    ClientId: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationAssociationSummary",
}) as any as S.Schema<ApplicationAssociationSummary>;
export type ApplicationAssociationsList = ApplicationAssociationSummary[];
export const ApplicationAssociationsList = /*@__PURE__*/ S.Array(
  ApplicationAssociationSummary,
);
export interface ListApplicationAssociationsResponse {
  ApplicationAssociations?: ApplicationAssociationSummary[];
  NextToken?: string;
}
export const ListApplicationAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationAssociations: S.optional(ApplicationAssociationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationAssociationsResponse",
}) as any as S.Schema<ListApplicationAssociationsResponse>;
export interface ListApplicationsRequest {
  NextToken?: string;
  MaxResults?: number;
  ApplicationType?: ApplicationType;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    ApplicationType: S.optional(ApplicationType).pipe(
      T.HttpQuery("applicationType"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export interface ApplicationSummary {
  Arn?: string;
  Id?: string;
  Name?: string;
  Namespace?: string;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  IsService?: boolean;
  ApplicationType?: ApplicationType;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Namespace: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IsService: S.optional(S.Boolean),
    ApplicationType: S.optional(ApplicationType),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationsList = ApplicationSummary[];
export const ApplicationsList = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  Applications?: ApplicationSummary[];
  NextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Applications: S.optional(ApplicationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListDataIntegrationAssociationsRequest {
  DataIntegrationIdentifier: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDataIntegrationAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataIntegrationIdentifier: S.String.pipe(
        T.HttpLabel("DataIntegrationIdentifier"),
      ),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/dataIntegrations/{DataIntegrationIdentifier}/associations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDataIntegrationAssociationsRequest",
}) as any as S.Schema<ListDataIntegrationAssociationsRequest>;
export type ExecutionStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export interface LastExecutionStatus {
  ExecutionStatus?: ExecutionStatus;
  StatusMessage?: string;
}
export const LastExecutionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionStatus: S.optional(ExecutionStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "LastExecutionStatus",
}) as any as S.Schema<LastExecutionStatus>;
export interface DataIntegrationAssociationSummary {
  DataIntegrationAssociationArn?: string;
  DataIntegrationArn?: string;
  ClientId?: string;
  DestinationURI?: string;
  LastExecutionStatus?: LastExecutionStatus;
  ExecutionConfiguration?: ExecutionConfiguration;
}
export const DataIntegrationAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataIntegrationAssociationArn: S.optional(S.String),
    DataIntegrationArn: S.optional(S.String),
    ClientId: S.optional(S.String),
    DestinationURI: S.optional(S.String),
    LastExecutionStatus: S.optional(LastExecutionStatus),
    ExecutionConfiguration: S.optional(ExecutionConfiguration),
  }),
).annotate({
  identifier: "DataIntegrationAssociationSummary",
}) as any as S.Schema<DataIntegrationAssociationSummary>;
export type DataIntegrationAssociationsList =
  DataIntegrationAssociationSummary[];
export const DataIntegrationAssociationsList = /*@__PURE__*/ S.Array(
  DataIntegrationAssociationSummary,
);
export interface ListDataIntegrationAssociationsResponse {
  DataIntegrationAssociations?: DataIntegrationAssociationSummary[];
  NextToken?: string;
}
export const ListDataIntegrationAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataIntegrationAssociations: S.optional(DataIntegrationAssociationsList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDataIntegrationAssociationsResponse",
}) as any as S.Schema<ListDataIntegrationAssociationsResponse>;
export interface ListDataIntegrationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListDataIntegrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dataIntegrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataIntegrationsRequest",
}) as any as S.Schema<ListDataIntegrationsRequest>;
export interface DataIntegrationSummary {
  Arn?: string;
  Name?: string;
  SourceURI?: string;
}
export const DataIntegrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    SourceURI: S.optional(S.String),
  }),
).annotate({
  identifier: "DataIntegrationSummary",
}) as any as S.Schema<DataIntegrationSummary>;
export type DataIntegrationsList = DataIntegrationSummary[];
export const DataIntegrationsList = /*@__PURE__*/ S.Array(
  DataIntegrationSummary,
);
export interface ListDataIntegrationsResponse {
  DataIntegrations?: DataIntegrationSummary[];
  NextToken?: string;
}
export const ListDataIntegrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataIntegrations: S.optional(DataIntegrationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataIntegrationsResponse",
}) as any as S.Schema<ListDataIntegrationsResponse>;
export interface ListEventIntegrationAssociationsRequest {
  EventIntegrationName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEventIntegrationAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EventIntegrationName: S.String.pipe(T.HttpLabel("EventIntegrationName")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/eventIntegrations/{EventIntegrationName}/associations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListEventIntegrationAssociationsRequest",
}) as any as S.Schema<ListEventIntegrationAssociationsRequest>;
export type EventBridgeRuleName = string;
export interface EventIntegrationAssociation {
  EventIntegrationAssociationArn?: string;
  EventIntegrationAssociationId?: string;
  EventIntegrationName?: string;
  ClientId?: string;
  EventBridgeRuleName?: string;
  ClientAssociationMetadata?: { [key: string]: string | undefined };
}
export const EventIntegrationAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventIntegrationAssociationArn: S.optional(S.String),
    EventIntegrationAssociationId: S.optional(S.String),
    EventIntegrationName: S.optional(S.String),
    ClientId: S.optional(S.String),
    EventBridgeRuleName: S.optional(S.String),
    ClientAssociationMetadata: S.optional(ClientAssociationMetadata),
  }),
).annotate({
  identifier: "EventIntegrationAssociation",
}) as any as S.Schema<EventIntegrationAssociation>;
export type EventIntegrationAssociationsList = EventIntegrationAssociation[];
export const EventIntegrationAssociationsList = /*@__PURE__*/ S.Array(
  EventIntegrationAssociation,
);
export interface ListEventIntegrationAssociationsResponse {
  EventIntegrationAssociations?: EventIntegrationAssociation[];
  NextToken?: string;
}
export const ListEventIntegrationAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EventIntegrationAssociations: S.optional(
        EventIntegrationAssociationsList,
      ),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListEventIntegrationAssociationsResponse",
}) as any as S.Schema<ListEventIntegrationAssociationsResponse>;
export interface ListEventIntegrationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEventIntegrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/eventIntegrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventIntegrationsRequest",
}) as any as S.Schema<ListEventIntegrationsRequest>;
export interface EventIntegration {
  EventIntegrationArn?: string;
  Name?: string;
  Description?: string;
  EventFilter?: EventFilter;
  EventBridgeBus?: string;
  Tags?: { [key: string]: string | undefined };
}
export const EventIntegration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventIntegrationArn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    EventFilter: S.optional(EventFilter),
    EventBridgeBus: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "EventIntegration",
}) as any as S.Schema<EventIntegration>;
export type EventIntegrationsList = EventIntegration[];
export const EventIntegrationsList = /*@__PURE__*/ S.Array(EventIntegration);
export interface ListEventIntegrationsResponse {
  EventIntegrations?: EventIntegration[];
  NextToken?: string;
}
export const ListEventIntegrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventIntegrations: S.optional(EventIntegrationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEventIntegrationsResponse",
}) as any as S.Schema<ListEventIntegrationsResponse>;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export interface UpdateApplicationRequest {
  Arn: string;
  Name?: string;
  Description?: string;
  ApplicationSourceConfig?: ApplicationSourceConfig;
  Subscriptions?: Subscription[];
  Publications?: Publication[];
  Permissions?: string[];
  IsService?: boolean;
  InitializationTimeout?: number;
  ApplicationConfig?: ApplicationConfig;
  IframeConfig?: IframeConfig;
  ApplicationType?: ApplicationType;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ApplicationSourceConfig: S.optional(ApplicationSourceConfig),
    Subscriptions: S.optional(SubscriptionList),
    Publications: S.optional(PublicationList),
    Permissions: S.optional(PermissionList),
    IsService: S.optional(S.Boolean),
    InitializationTimeout: S.optional(S.Number),
    ApplicationConfig: S.optional(ApplicationConfig),
    IframeConfig: S.optional(IframeConfig),
    ApplicationType: S.optional(ApplicationType),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/applications/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateDataIntegrationRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
}
export const UpdateDataIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/dataIntegrations/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataIntegrationRequest",
}) as any as S.Schema<UpdateDataIntegrationRequest>;
export interface UpdateDataIntegrationResponse {}
export const UpdateDataIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDataIntegrationResponse",
}) as any as S.Schema<UpdateDataIntegrationResponse>;
export interface UpdateDataIntegrationAssociationRequest {
  DataIntegrationIdentifier: string;
  DataIntegrationAssociationIdentifier: string;
  ExecutionConfiguration: ExecutionConfiguration;
}
export const UpdateDataIntegrationAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataIntegrationIdentifier: S.String.pipe(
        T.HttpLabel("DataIntegrationIdentifier"),
      ),
      DataIntegrationAssociationIdentifier: S.String.pipe(
        T.HttpLabel("DataIntegrationAssociationIdentifier"),
      ),
      ExecutionConfiguration: ExecutionConfiguration,
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/dataIntegrations/{DataIntegrationIdentifier}/associations/{DataIntegrationAssociationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateDataIntegrationAssociationRequest",
}) as any as S.Schema<UpdateDataIntegrationAssociationRequest>;
export interface UpdateDataIntegrationAssociationResponse {}
export const UpdateDataIntegrationAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateDataIntegrationAssociationResponse",
}) as any as S.Schema<UpdateDataIntegrationAssociationResponse>;
export interface UpdateEventIntegrationRequest {
  Name: string;
  Description?: string;
}
export const UpdateEventIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/eventIntegrations/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEventIntegrationRequest",
}) as any as S.Schema<UpdateEventIntegrationRequest>;
export interface UpdateEventIntegrationResponse {}
export const UpdateEventIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateEventIntegrationResponse",
}) as any as S.Schema<UpdateEventIntegrationResponse>;
export type Message = string;
export type CreateApplicationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceError
  | InvalidRequestException
  | ResourceQuotaExceededException
  | ThrottlingException
  | UnsupportedOperationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and persists an Application resource.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceError,
    InvalidRequestException,
    ResourceQuotaExceededException,
    ThrottlingException,
    UnsupportedOperationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateDataIntegrationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceError
  | InvalidRequestException
  | ResourceQuotaExceededException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and persists a DataIntegration resource.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been
 * previously associated. Use a different DataIntegration, or recreate the DataIntegration
 * using the `CreateDataIntegration` API.
 */
export const createDataIntegration: API.OperationMethod<
  CreateDataIntegrationRequest,
  CreateDataIntegrationResponse,
  CreateDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataIntegrationRequest,
  output: CreateDataIntegrationResponse,
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceError,
    InvalidRequestException,
    ResourceQuotaExceededException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataIntegration",
}));

export type CreateDataIntegrationAssociationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ResourceQuotaExceededException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and persists a DataIntegrationAssociation resource.
 */
export const createDataIntegrationAssociation: API.OperationMethod<
  CreateDataIntegrationAssociationRequest,
  CreateDataIntegrationAssociationResponse,
  CreateDataIntegrationAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataIntegrationAssociationRequest,
  output: CreateDataIntegrationAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ResourceQuotaExceededException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataIntegrationAssociation",
}));

export type CreateEventIntegrationError =
  | AccessDeniedException
  | DuplicateResourceException
  | InternalServiceError
  | InvalidRequestException
  | ResourceQuotaExceededException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an EventIntegration, given a specified name, description, and a reference to an
 * Amazon EventBridge bus in your account and a partner event source that pushes events to
 * that bus. No objects are created in the your account, only metadata that is persisted on the
 * EventIntegration control plane.
 */
export const createEventIntegration: API.OperationMethod<
  CreateEventIntegrationRequest,
  CreateEventIntegrationResponse,
  CreateEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventIntegrationRequest,
  output: CreateEventIntegrationResponse,
  errors: [
    AccessDeniedException,
    DuplicateResourceException,
    InternalServiceError,
    InvalidRequestException,
    ResourceQuotaExceededException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventIntegration",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the Application. Only Applications that don't have any Application Associations
 * can be deleted.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteDataIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the DataIntegration. Only DataIntegrations that don't have any
 * DataIntegrationAssociations can be deleted. Deleting a DataIntegration also deletes the
 * underlying Amazon AppFlow flow and service linked role.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const deleteDataIntegration: API.OperationMethod<
  DeleteDataIntegrationRequest,
  DeleteDataIntegrationResponse,
  DeleteDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataIntegrationRequest,
  output: DeleteDataIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataIntegration",
}));

export type DeleteEventIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified existing event integration. If the event integration is associated
 * with clients, the request is rejected.
 */
export const deleteEventIntegration: API.OperationMethod<
  DeleteEventIntegrationRequest,
  DeleteEventIntegrationResponse,
  DeleteEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventIntegrationRequest,
  output: DeleteEventIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventIntegration",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get an Application resource.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetDataIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the DataIntegration.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const getDataIntegration: API.OperationMethod<
  GetDataIntegrationRequest,
  GetDataIntegrationResponse,
  GetDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataIntegrationRequest,
  output: GetDataIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataIntegration",
}));

export type GetEventIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about the event integration.
 */
export const getEventIntegration: API.OperationMethod<
  GetEventIntegrationRequest,
  GetEventIntegrationResponse,
  GetEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventIntegrationRequest,
  output: GetEventIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventIntegration",
}));

export type ListApplicationAssociationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of application associations for an application.
 */
export const listApplicationAssociations: API.PaginatedOperationMethod<
  ListApplicationAssociationsRequest,
  ListApplicationAssociationsResponse,
  ListApplicationAssociationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationAssociationsRequest,
  output: ListApplicationAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists applications in the account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Applications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataIntegrationAssociationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of DataIntegration associations in the account.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const listDataIntegrationAssociations: API.PaginatedOperationMethod<
  ListDataIntegrationAssociationsRequest,
  ListDataIntegrationAssociationsResponse,
  ListDataIntegrationAssociationsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataIntegrationAssociationsRequest,
  output: ListDataIntegrationAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataIntegrationAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataIntegrationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of DataIntegrations in the account.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const listDataIntegrations: API.PaginatedOperationMethod<
  ListDataIntegrationsRequest,
  ListDataIntegrationsResponse,
  ListDataIntegrationsError,
  Credentials | HttpClient.HttpClient,
  DataIntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataIntegrationsRequest,
  output: ListDataIntegrationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataIntegrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventIntegrationAssociationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of event integration associations in the account.
 */
export const listEventIntegrationAssociations: API.PaginatedOperationMethod<
  ListEventIntegrationAssociationsRequest,
  ListEventIntegrationAssociationsResponse,
  ListEventIntegrationAssociationsError,
  Credentials | HttpClient.HttpClient,
  EventIntegrationAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventIntegrationAssociationsRequest,
  output: ListEventIntegrationAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventIntegrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventIntegrationAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventIntegrationsError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a paginated list of event integrations in the account.
 */
export const listEventIntegrations: API.PaginatedOperationMethod<
  ListEventIntegrationsRequest,
  ListEventIntegrationsResponse,
  ListEventIntegrationsError,
  Credentials | HttpClient.HttpClient,
  EventIntegration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventIntegrationsRequest,
  output: ListEventIntegrationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventIntegrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventIntegrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
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
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
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
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
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
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates and persists an Application resource.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateDataIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the description of a DataIntegration.
 *
 * You cannot create a DataIntegration association for a DataIntegration that has been previously associated.
 * Use a different DataIntegration, or recreate the DataIntegration using the
 * CreateDataIntegration API.
 */
export const updateDataIntegration: API.OperationMethod<
  UpdateDataIntegrationRequest,
  UpdateDataIntegrationResponse,
  UpdateDataIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataIntegrationRequest,
  output: UpdateDataIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataIntegration",
}));

export type UpdateDataIntegrationAssociationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates and persists a DataIntegrationAssociation resource.
 *
 * Updating a DataIntegrationAssociation with ExecutionConfiguration will rerun the on-demand job.
 */
export const updateDataIntegrationAssociation: API.OperationMethod<
  UpdateDataIntegrationAssociationRequest,
  UpdateDataIntegrationAssociationResponse,
  UpdateDataIntegrationAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataIntegrationAssociationRequest,
  output: UpdateDataIntegrationAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataIntegrationAssociation",
}));

export type UpdateEventIntegrationError =
  | AccessDeniedException
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the description of an event integration.
 */
export const updateEventIntegration: API.OperationMethod<
  UpdateEventIntegrationRequest,
  UpdateEventIntegrationResponse,
  UpdateEventIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventIntegrationRequest,
  output: UpdateEventIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventIntegration",
}));
