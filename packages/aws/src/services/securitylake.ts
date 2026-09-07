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
  sdkId: "SecurityLake",
  serviceShapeName: "SecurityLake",
});
const auth = T.AwsAuthSigv4({ name: "securitylake" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://securitylake-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://securitylake-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://securitylake.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://securitylake.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      errorCode: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export type AwsAccountId = string;
export type AccountList = string[];
export const AccountList = /*@__PURE__*/ S.Array(S.String);
export type Region = string;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export type AwsLogSourceName =
  | "ROUTE53"
  | "VPC_FLOW"
  | "SH_FINDINGS"
  | "CLOUD_TRAIL_MGMT"
  | "LAMBDA_EXECUTION"
  | "S3_DATA"
  | "EKS_AUDIT"
  | "WAF"
  | (string & {});
export const AwsLogSourceName = S.String;

export type AwsLogSourceVersion = string;
export interface AwsLogSourceConfiguration {
  accounts?: string[];
  regions: string[];
  sourceName: AwsLogSourceName;
  sourceVersion?: string;
}
export const AwsLogSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accounts: S.optional(AccountList),
    regions: RegionList,
    sourceName: AwsLogSourceName,
    sourceVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsLogSourceConfiguration",
}) as any as S.Schema<AwsLogSourceConfiguration>;
export type AwsLogSourceConfigurationList = AwsLogSourceConfiguration[];
export const AwsLogSourceConfigurationList = /*@__PURE__*/ S.Array(
  AwsLogSourceConfiguration,
);
export interface CreateAwsLogSourceRequest {
  sources: AwsLogSourceConfiguration[];
}
export const CreateAwsLogSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sources: AwsLogSourceConfigurationList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/logsources/aws" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAwsLogSourceRequest",
}) as any as S.Schema<CreateAwsLogSourceRequest>;
export interface CreateAwsLogSourceResponse {
  failed?: string[];
}
export const CreateAwsLogSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failed: S.optional(AccountList) }),
).annotate({
  identifier: "CreateAwsLogSourceResponse",
}) as any as S.Schema<CreateAwsLogSourceResponse>;
export type CustomLogSourceName = string;
export type CustomLogSourceVersion = string;
export type OcsfEventClass = string;
export type OcsfEventClassList = string[];
export const OcsfEventClassList = /*@__PURE__*/ S.Array(S.String);
export type RoleArn = string;
export interface CustomLogSourceCrawlerConfiguration {
  roleArn: string;
}
export const CustomLogSourceCrawlerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.String }),
).annotate({
  identifier: "CustomLogSourceCrawlerConfiguration",
}) as any as S.Schema<CustomLogSourceCrawlerConfiguration>;
export type AwsPrincipal = string;
export type ExternalId = string;
export interface AwsIdentity {
  principal: string;
  externalId: string;
}
export const AwsIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ principal: S.String, externalId: S.String }),
).annotate({ identifier: "AwsIdentity" }) as any as S.Schema<AwsIdentity>;
export interface CustomLogSourceConfiguration {
  crawlerConfiguration: CustomLogSourceCrawlerConfiguration;
  providerIdentity: AwsIdentity;
}
export const CustomLogSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crawlerConfiguration: CustomLogSourceCrawlerConfiguration,
    providerIdentity: AwsIdentity,
  }),
).annotate({
  identifier: "CustomLogSourceConfiguration",
}) as any as S.Schema<CustomLogSourceConfiguration>;
export interface CreateCustomLogSourceRequest {
  sourceName: string;
  sourceVersion?: string;
  eventClasses?: string[];
  configuration: CustomLogSourceConfiguration;
}
export const CreateCustomLogSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceName: S.String,
    sourceVersion: S.optional(S.String),
    eventClasses: S.optional(OcsfEventClassList),
    configuration: CustomLogSourceConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/logsources/custom" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomLogSourceRequest",
}) as any as S.Schema<CreateCustomLogSourceRequest>;
export type S3URI = string;
export interface CustomLogSourceProvider {
  roleArn?: string;
  location?: string;
}
export const CustomLogSourceProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ roleArn: S.optional(S.String), location: S.optional(S.String) }),
).annotate({
  identifier: "CustomLogSourceProvider",
}) as any as S.Schema<CustomLogSourceProvider>;
export type AmazonResourceName = string;
export interface CustomLogSourceAttributes {
  crawlerArn?: string;
  databaseArn?: string;
  tableArn?: string;
}
export const CustomLogSourceAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crawlerArn: S.optional(S.String),
    databaseArn: S.optional(S.String),
    tableArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomLogSourceAttributes",
}) as any as S.Schema<CustomLogSourceAttributes>;
export interface CustomLogSourceResource {
  sourceName?: string;
  sourceVersion?: string;
  provider?: CustomLogSourceProvider;
  attributes?: CustomLogSourceAttributes;
}
export const CustomLogSourceResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceName: S.optional(S.String),
    sourceVersion: S.optional(S.String),
    provider: S.optional(CustomLogSourceProvider),
    attributes: S.optional(CustomLogSourceAttributes),
  }),
).annotate({
  identifier: "CustomLogSourceResource",
}) as any as S.Schema<CustomLogSourceResource>;
export interface CreateCustomLogSourceResponse {
  source?: CustomLogSourceResource;
}
export const CreateCustomLogSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(CustomLogSourceResource) }),
).annotate({
  identifier: "CreateCustomLogSourceResponse",
}) as any as S.Schema<CreateCustomLogSourceResponse>;
export interface DataLakeEncryptionConfiguration {
  kmsKeyId?: string;
}
export const DataLakeEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "DataLakeEncryptionConfiguration",
}) as any as S.Schema<DataLakeEncryptionConfiguration>;
export interface DataLakeLifecycleExpiration {
  days?: number;
}
export const DataLakeLifecycleExpiration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ days: S.optional(S.Number) }),
).annotate({
  identifier: "DataLakeLifecycleExpiration",
}) as any as S.Schema<DataLakeLifecycleExpiration>;
export type DataLakeStorageClass = string;
export interface DataLakeLifecycleTransition {
  storageClass?: string;
  days?: number;
}
export const DataLakeLifecycleTransition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ storageClass: S.optional(S.String), days: S.optional(S.Number) }),
).annotate({
  identifier: "DataLakeLifecycleTransition",
}) as any as S.Schema<DataLakeLifecycleTransition>;
export type DataLakeLifecycleTransitionList = DataLakeLifecycleTransition[];
export const DataLakeLifecycleTransitionList = /*@__PURE__*/ S.Array(
  DataLakeLifecycleTransition,
);
export interface DataLakeLifecycleConfiguration {
  expiration?: DataLakeLifecycleExpiration;
  transitions?: DataLakeLifecycleTransition[];
}
export const DataLakeLifecycleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expiration: S.optional(DataLakeLifecycleExpiration),
    transitions: S.optional(DataLakeLifecycleTransitionList),
  }),
).annotate({
  identifier: "DataLakeLifecycleConfiguration",
}) as any as S.Schema<DataLakeLifecycleConfiguration>;
export interface DataLakeReplicationConfiguration {
  regions?: string[];
  roleArn?: string;
}
export const DataLakeReplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ regions: S.optional(RegionList), roleArn: S.optional(S.String) }),
).annotate({
  identifier: "DataLakeReplicationConfiguration",
}) as any as S.Schema<DataLakeReplicationConfiguration>;
export interface DataLakeConfiguration {
  region: string;
  encryptionConfiguration?: DataLakeEncryptionConfiguration;
  lifecycleConfiguration?: DataLakeLifecycleConfiguration;
  replicationConfiguration?: DataLakeReplicationConfiguration;
}
export const DataLakeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.String,
    encryptionConfiguration: S.optional(DataLakeEncryptionConfiguration),
    lifecycleConfiguration: S.optional(DataLakeLifecycleConfiguration),
    replicationConfiguration: S.optional(DataLakeReplicationConfiguration),
  }),
).annotate({
  identifier: "DataLakeConfiguration",
}) as any as S.Schema<DataLakeConfiguration>;
export type DataLakeConfigurationList = DataLakeConfiguration[];
export const DataLakeConfigurationList = /*@__PURE__*/ S.Array(
  DataLakeConfiguration,
);
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
export interface CreateDataLakeRequest {
  configurations: DataLakeConfiguration[];
  metaStoreManagerRoleArn: string;
  tags?: Tag[];
}
export const CreateDataLakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: DataLakeConfigurationList,
    metaStoreManagerRoleArn: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataLakeRequest",
}) as any as S.Schema<CreateDataLakeRequest>;
export type S3BucketArn = string;
export type DataLakeStatus =
  | "INITIALIZED"
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const DataLakeStatus = S.String;

export interface DataLakeUpdateException {
  reason?: string;
  code?: string;
}
export const DataLakeUpdateException = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reason: S.optional(S.String), code: S.optional(S.String) }),
).annotate({
  identifier: "DataLakeUpdateException",
}) as any as S.Schema<DataLakeUpdateException>;
export interface DataLakeUpdateStatus {
  requestId?: string;
  status?: DataLakeStatus;
  exception?: DataLakeUpdateException;
}
export const DataLakeUpdateStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requestId: S.optional(S.String),
    status: S.optional(DataLakeStatus),
    exception: S.optional(DataLakeUpdateException),
  }),
).annotate({
  identifier: "DataLakeUpdateStatus",
}) as any as S.Schema<DataLakeUpdateStatus>;
export interface DataLakeResource {
  dataLakeArn: string;
  region: string;
  s3BucketArn?: string;
  encryptionConfiguration?: DataLakeEncryptionConfiguration;
  lifecycleConfiguration?: DataLakeLifecycleConfiguration;
  replicationConfiguration?: DataLakeReplicationConfiguration;
  createStatus?: DataLakeStatus;
  updateStatus?: DataLakeUpdateStatus;
}
export const DataLakeResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataLakeArn: S.String,
    region: S.String,
    s3BucketArn: S.optional(S.String),
    encryptionConfiguration: S.optional(DataLakeEncryptionConfiguration),
    lifecycleConfiguration: S.optional(DataLakeLifecycleConfiguration),
    replicationConfiguration: S.optional(DataLakeReplicationConfiguration),
    createStatus: S.optional(DataLakeStatus),
    updateStatus: S.optional(DataLakeUpdateStatus),
  }),
).annotate({
  identifier: "DataLakeResource",
}) as any as S.Schema<DataLakeResource>;
export type DataLakeResourceList = DataLakeResource[];
export const DataLakeResourceList = /*@__PURE__*/ S.Array(DataLakeResource);
export interface CreateDataLakeResponse {
  dataLakes?: DataLakeResource[];
}
export const CreateDataLakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataLakes: S.optional(DataLakeResourceList) }),
).annotate({
  identifier: "CreateDataLakeResponse",
}) as any as S.Schema<CreateDataLakeResponse>;
export type SubscriptionProtocol = string;
export type SafeString = string;
export interface CreateDataLakeExceptionSubscriptionRequest {
  subscriptionProtocol: string;
  notificationEndpoint: string;
  exceptionTimeToLive?: number;
}
export const CreateDataLakeExceptionSubscriptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      subscriptionProtocol: S.String,
      notificationEndpoint: S.String,
      exceptionTimeToLive: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/datalake/exceptions/subscription" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateDataLakeExceptionSubscriptionRequest",
  }) as any as S.Schema<CreateDataLakeExceptionSubscriptionRequest>;
export interface CreateDataLakeExceptionSubscriptionResponse {}
export const CreateDataLakeExceptionSubscriptionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateDataLakeExceptionSubscriptionResponse",
  }) as any as S.Schema<CreateDataLakeExceptionSubscriptionResponse>;
export interface AwsLogSourceResource {
  sourceName?: AwsLogSourceName;
  sourceVersion?: string;
}
export const AwsLogSourceResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceName: S.optional(AwsLogSourceName),
    sourceVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "AwsLogSourceResource",
}) as any as S.Schema<AwsLogSourceResource>;
export type AwsLogSourceResourceList = AwsLogSourceResource[];
export const AwsLogSourceResourceList =
  /*@__PURE__*/ S.Array(AwsLogSourceResource);
export interface DataLakeAutoEnableNewAccountConfiguration {
  region: string;
  sources: AwsLogSourceResource[];
}
export const DataLakeAutoEnableNewAccountConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ region: S.String, sources: AwsLogSourceResourceList }),
  ).annotate({
    identifier: "DataLakeAutoEnableNewAccountConfiguration",
  }) as any as S.Schema<DataLakeAutoEnableNewAccountConfiguration>;
export type DataLakeAutoEnableNewAccountConfigurationList =
  DataLakeAutoEnableNewAccountConfiguration[];
export const DataLakeAutoEnableNewAccountConfigurationList =
  /*@__PURE__*/ S.Array(DataLakeAutoEnableNewAccountConfiguration);
export interface CreateDataLakeOrganizationConfigurationRequest {
  autoEnableNewAccount?: DataLakeAutoEnableNewAccountConfiguration[];
}
export const CreateDataLakeOrganizationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      autoEnableNewAccount: S.optional(
        DataLakeAutoEnableNewAccountConfigurationList,
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/datalake/organization/configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateDataLakeOrganizationConfigurationRequest",
  }) as any as S.Schema<CreateDataLakeOrganizationConfigurationRequest>;
export interface CreateDataLakeOrganizationConfigurationResponse {}
export const CreateDataLakeOrganizationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateDataLakeOrganizationConfigurationResponse",
  }) as any as S.Schema<CreateDataLakeOrganizationConfigurationResponse>;
export type DescriptionString = string;
export type LogSourceResource =
  | { awsLogSource: AwsLogSourceResource; customLogSource?: never }
  | { awsLogSource?: never; customLogSource: CustomLogSourceResource };
export const LogSourceResource = /*@__PURE__*/ S.Union([
  S.Struct({ awsLogSource: AwsLogSourceResource }),
  S.Struct({ customLogSource: CustomLogSourceResource }),
]);
export type LogSourceResourceList = LogSourceResource[];
export const LogSourceResourceList = /*@__PURE__*/ S.Array(LogSourceResource);
export type AccessType = "LAKEFORMATION" | "S3" | (string & {});
export const AccessType = S.String;

export type AccessTypeList = AccessType[];
export const AccessTypeList = /*@__PURE__*/ S.Array(AccessType);
export interface CreateSubscriberRequest {
  subscriberIdentity: AwsIdentity;
  subscriberName: string;
  subscriberDescription?: string;
  sources: LogSourceResource[];
  accessTypes?: AccessType[];
  tags?: Tag[];
}
export const CreateSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriberIdentity: AwsIdentity,
    subscriberName: S.String,
    subscriberDescription: S.optional(S.String),
    sources: LogSourceResourceList,
    accessTypes: S.optional(AccessTypeList),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/subscribers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriberRequest",
}) as any as S.Schema<CreateSubscriberRequest>;
export type UUID = string;
export type SubscriberStatus =
  | "ACTIVE"
  | "DEACTIVATED"
  | "PENDING"
  | "READY"
  | (string & {});
export const SubscriberStatus = S.String;

export type ResourceShareArn = string;
export type ResourceShareName = string;
export interface SubscriberResource {
  subscriberId: string;
  subscriberArn: string;
  subscriberIdentity: AwsIdentity;
  subscriberName: string;
  subscriberDescription?: string;
  sources: LogSourceResource[];
  accessTypes?: AccessType[];
  roleArn?: string;
  s3BucketArn?: string;
  subscriberEndpoint?: string;
  subscriberStatus?: SubscriberStatus;
  resourceShareArn?: string;
  resourceShareName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const SubscriberResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriberId: S.String,
    subscriberArn: S.String,
    subscriberIdentity: AwsIdentity,
    subscriberName: S.String,
    subscriberDescription: S.optional(S.String),
    sources: LogSourceResourceList,
    accessTypes: S.optional(AccessTypeList),
    roleArn: S.optional(S.String),
    s3BucketArn: S.optional(S.String),
    subscriberEndpoint: S.optional(S.String),
    subscriberStatus: S.optional(SubscriberStatus),
    resourceShareArn: S.optional(S.String),
    resourceShareName: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SubscriberResource",
}) as any as S.Schema<SubscriberResource>;
export interface CreateSubscriberResponse {
  subscriber?: SubscriberResource;
}
export const CreateSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscriber: S.optional(SubscriberResource) }),
).annotate({
  identifier: "CreateSubscriberResponse",
}) as any as S.Schema<CreateSubscriberResponse>;
export interface SqsNotificationConfiguration {}
export const SqsNotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SqsNotificationConfiguration",
}) as any as S.Schema<SqsNotificationConfiguration>;
export type HttpMethod = "POST" | "PUT" | (string & {});
export const HttpMethod = S.String;

export interface HttpsNotificationConfiguration {
  endpoint: string;
  authorizationApiKeyName?: string;
  authorizationApiKeyValue?: string | redacted.Redacted<string>;
  httpMethod?: HttpMethod;
  targetRoleArn: string;
}
export const HttpsNotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoint: S.String,
    authorizationApiKeyName: S.optional(S.String),
    authorizationApiKeyValue: S.optional(SensitiveString),
    httpMethod: S.optional(HttpMethod),
    targetRoleArn: S.String,
  }),
).annotate({
  identifier: "HttpsNotificationConfiguration",
}) as any as S.Schema<HttpsNotificationConfiguration>;
export type NotificationConfiguration =
  | {
      sqsNotificationConfiguration: SqsNotificationConfiguration;
      httpsNotificationConfiguration?: never;
    }
  | {
      sqsNotificationConfiguration?: never;
      httpsNotificationConfiguration: HttpsNotificationConfiguration;
    };
export const NotificationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ sqsNotificationConfiguration: SqsNotificationConfiguration }),
  S.Struct({ httpsNotificationConfiguration: HttpsNotificationConfiguration }),
]);
export interface CreateSubscriberNotificationRequest {
  subscriberId: string;
  configuration: NotificationConfiguration;
}
export const CreateSubscriberNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriberId: S.String.pipe(T.HttpLabel("subscriberId")),
    configuration: NotificationConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/subscribers/{subscriberId}/notification",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriberNotificationRequest",
}) as any as S.Schema<CreateSubscriberNotificationRequest>;
export interface CreateSubscriberNotificationResponse {
  subscriberEndpoint?: string;
}
export const CreateSubscriberNotificationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ subscriberEndpoint: S.optional(S.String) }),
).annotate({
  identifier: "CreateSubscriberNotificationResponse",
}) as any as S.Schema<CreateSubscriberNotificationResponse>;
export interface DeleteAwsLogSourceRequest {
  sources: AwsLogSourceConfiguration[];
}
export const DeleteAwsLogSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sources: AwsLogSourceConfigurationList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/logsources/aws/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAwsLogSourceRequest",
}) as any as S.Schema<DeleteAwsLogSourceRequest>;
export interface DeleteAwsLogSourceResponse {
  failed?: string[];
}
export const DeleteAwsLogSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failed: S.optional(AccountList) }),
).annotate({
  identifier: "DeleteAwsLogSourceResponse",
}) as any as S.Schema<DeleteAwsLogSourceResponse>;
export interface DeleteCustomLogSourceRequest {
  sourceName: string;
  sourceVersion?: string;
}
export const DeleteCustomLogSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceName: S.String.pipe(T.HttpLabel("sourceName")),
    sourceVersion: S.optional(S.String).pipe(T.HttpQuery("sourceVersion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/datalake/logsources/custom/{sourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomLogSourceRequest",
}) as any as S.Schema<DeleteCustomLogSourceRequest>;
export interface DeleteCustomLogSourceResponse {}
export const DeleteCustomLogSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomLogSourceResponse",
}) as any as S.Schema<DeleteCustomLogSourceResponse>;
export interface DeleteDataLakeRequest {
  regions: string[];
}
export const DeleteDataLakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ regions: RegionList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataLakeRequest",
}) as any as S.Schema<DeleteDataLakeRequest>;
export interface DeleteDataLakeResponse {}
export const DeleteDataLakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataLakeResponse",
}) as any as S.Schema<DeleteDataLakeResponse>;
export interface DeleteDataLakeExceptionSubscriptionRequest {}
export const DeleteDataLakeExceptionSubscriptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v1/datalake/exceptions/subscription",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteDataLakeExceptionSubscriptionRequest",
  }) as any as S.Schema<DeleteDataLakeExceptionSubscriptionRequest>;
export interface DeleteDataLakeExceptionSubscriptionResponse {}
export const DeleteDataLakeExceptionSubscriptionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteDataLakeExceptionSubscriptionResponse",
  }) as any as S.Schema<DeleteDataLakeExceptionSubscriptionResponse>;
export interface DeleteDataLakeOrganizationConfigurationRequest {
  autoEnableNewAccount?: DataLakeAutoEnableNewAccountConfiguration[];
}
export const DeleteDataLakeOrganizationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      autoEnableNewAccount: S.optional(
        DataLakeAutoEnableNewAccountConfigurationList,
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/datalake/organization/configuration/delete",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteDataLakeOrganizationConfigurationRequest",
  }) as any as S.Schema<DeleteDataLakeOrganizationConfigurationRequest>;
export interface DeleteDataLakeOrganizationConfigurationResponse {}
export const DeleteDataLakeOrganizationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteDataLakeOrganizationConfigurationResponse",
  }) as any as S.Schema<DeleteDataLakeOrganizationConfigurationResponse>;
export interface DeleteSubscriberRequest {
  subscriberId: string;
}
export const DeleteSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscriberId: S.String.pipe(T.HttpLabel("subscriberId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/subscribers/{subscriberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubscriberRequest",
}) as any as S.Schema<DeleteSubscriberRequest>;
export interface DeleteSubscriberResponse {}
export const DeleteSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSubscriberResponse",
}) as any as S.Schema<DeleteSubscriberResponse>;
export interface DeleteSubscriberNotificationRequest {
  subscriberId: string;
}
export const DeleteSubscriberNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscriberId: S.String.pipe(T.HttpLabel("subscriberId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/subscribers/{subscriberId}/notification",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSubscriberNotificationRequest",
}) as any as S.Schema<DeleteSubscriberNotificationRequest>;
export interface DeleteSubscriberNotificationResponse {}
export const DeleteSubscriberNotificationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteSubscriberNotificationResponse",
}) as any as S.Schema<DeleteSubscriberNotificationResponse>;
export interface DeregisterDataLakeDelegatedAdministratorRequest {}
export const DeregisterDataLakeDelegatedAdministratorRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/v1/datalake/delegate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeregisterDataLakeDelegatedAdministratorRequest",
  }) as any as S.Schema<DeregisterDataLakeDelegatedAdministratorRequest>;
export interface DeregisterDataLakeDelegatedAdministratorResponse {}
export const DeregisterDataLakeDelegatedAdministratorResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeregisterDataLakeDelegatedAdministratorResponse",
  }) as any as S.Schema<DeregisterDataLakeDelegatedAdministratorResponse>;
export interface GetDataLakeExceptionSubscriptionRequest {}
export const GetDataLakeExceptionSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/datalake/exceptions/subscription" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDataLakeExceptionSubscriptionRequest",
}) as any as S.Schema<GetDataLakeExceptionSubscriptionRequest>;
export interface GetDataLakeExceptionSubscriptionResponse {
  subscriptionProtocol?: string;
  notificationEndpoint?: string;
  exceptionTimeToLive?: number;
}
export const GetDataLakeExceptionSubscriptionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      subscriptionProtocol: S.optional(S.String),
      notificationEndpoint: S.optional(S.String),
      exceptionTimeToLive: S.optional(S.Number),
    }),
).annotate({
  identifier: "GetDataLakeExceptionSubscriptionResponse",
}) as any as S.Schema<GetDataLakeExceptionSubscriptionResponse>;
export interface GetDataLakeOrganizationConfigurationRequest {}
export const GetDataLakeOrganizationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/datalake/organization/configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetDataLakeOrganizationConfigurationRequest",
  }) as any as S.Schema<GetDataLakeOrganizationConfigurationRequest>;
export interface GetDataLakeOrganizationConfigurationResponse {
  autoEnableNewAccount?: DataLakeAutoEnableNewAccountConfiguration[];
}
export const GetDataLakeOrganizationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      autoEnableNewAccount: S.optional(
        DataLakeAutoEnableNewAccountConfigurationList,
      ),
    }),
  ).annotate({
    identifier: "GetDataLakeOrganizationConfigurationResponse",
  }) as any as S.Schema<GetDataLakeOrganizationConfigurationResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface GetDataLakeSourcesRequest {
  accounts?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const GetDataLakeSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accounts: S.optional(AccountList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataLakeSourcesRequest",
}) as any as S.Schema<GetDataLakeSourcesRequest>;
export type SourceCollectionStatus =
  | "COLLECTING"
  | "MISCONFIGURED"
  | "NOT_COLLECTING"
  | (string & {});
export const SourceCollectionStatus = S.String;

export interface DataLakeSourceStatus {
  resource?: string;
  status?: SourceCollectionStatus;
}
export const DataLakeSourceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.optional(S.String),
    status: S.optional(SourceCollectionStatus),
  }),
).annotate({
  identifier: "DataLakeSourceStatus",
}) as any as S.Schema<DataLakeSourceStatus>;
export type DataLakeSourceStatusList = DataLakeSourceStatus[];
export const DataLakeSourceStatusList =
  /*@__PURE__*/ S.Array(DataLakeSourceStatus);
export interface DataLakeSource {
  account?: string;
  sourceName?: string;
  eventClasses?: string[];
  sourceStatuses?: DataLakeSourceStatus[];
}
export const DataLakeSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    account: S.optional(S.String),
    sourceName: S.optional(S.String),
    eventClasses: S.optional(OcsfEventClassList),
    sourceStatuses: S.optional(DataLakeSourceStatusList),
  }),
).annotate({ identifier: "DataLakeSource" }) as any as S.Schema<DataLakeSource>;
export type DataLakeSourceList = DataLakeSource[];
export const DataLakeSourceList = /*@__PURE__*/ S.Array(DataLakeSource);
export interface GetDataLakeSourcesResponse {
  dataLakeArn?: string;
  dataLakeSources?: DataLakeSource[];
  nextToken?: string;
}
export const GetDataLakeSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataLakeArn: S.optional(S.String),
    dataLakeSources: S.optional(DataLakeSourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDataLakeSourcesResponse",
}) as any as S.Schema<GetDataLakeSourcesResponse>;
export interface GetSubscriberRequest {
  subscriberId: string;
}
export const GetSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscriberId: S.String.pipe(T.HttpLabel("subscriberId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/subscribers/{subscriberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriberRequest",
}) as any as S.Schema<GetSubscriberRequest>;
export interface GetSubscriberResponse {
  subscriber?: SubscriberResource;
}
export const GetSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscriber: S.optional(SubscriberResource) }),
).annotate({
  identifier: "GetSubscriberResponse",
}) as any as S.Schema<GetSubscriberResponse>;
export interface ListDataLakeExceptionsRequest {
  regions?: string[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDataLakeExceptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    regions: S.optional(RegionList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/exceptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataLakeExceptionsRequest",
}) as any as S.Schema<ListDataLakeExceptionsRequest>;
export interface DataLakeException {
  region?: string;
  exception?: string;
  remediation?: string;
  timestamp?: Date;
}
export const DataLakeException = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(S.String),
    exception: S.optional(S.String),
    remediation: S.optional(S.String),
    timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DataLakeException",
}) as any as S.Schema<DataLakeException>;
export type DataLakeExceptionList = DataLakeException[];
export const DataLakeExceptionList = /*@__PURE__*/ S.Array(DataLakeException);
export interface ListDataLakeExceptionsResponse {
  exceptions?: DataLakeException[];
  nextToken?: string;
}
export const ListDataLakeExceptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exceptions: S.optional(DataLakeExceptionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataLakeExceptionsResponse",
}) as any as S.Schema<ListDataLakeExceptionsResponse>;
export interface ListDataLakesRequest {
  regions?: string[];
}
export const ListDataLakesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    regions: S.optional(RegionList).pipe(T.HttpQuery("regions")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/datalakes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataLakesRequest",
}) as any as S.Schema<ListDataLakesRequest>;
export interface ListDataLakesResponse {
  dataLakes?: DataLakeResource[];
}
export const ListDataLakesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataLakes: S.optional(DataLakeResourceList) }),
).annotate({
  identifier: "ListDataLakesResponse",
}) as any as S.Schema<ListDataLakesResponse>;
export interface ListLogSourcesRequest {
  accounts?: string[];
  regions?: string[];
  sources?: LogSourceResource[];
  maxResults?: number;
  nextToken?: string;
}
export const ListLogSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accounts: S.optional(AccountList),
    regions: S.optional(RegionList),
    sources: S.optional(LogSourceResourceList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/datalake/logsources/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLogSourcesRequest",
}) as any as S.Schema<ListLogSourcesRequest>;
export interface LogSource {
  account?: string;
  region?: string;
  sources?: LogSourceResource[];
}
export const LogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    account: S.optional(S.String),
    region: S.optional(S.String),
    sources: S.optional(LogSourceResourceList),
  }),
).annotate({ identifier: "LogSource" }) as any as S.Schema<LogSource>;
export type LogSourceList = LogSource[];
export const LogSourceList = /*@__PURE__*/ S.Array(LogSource);
export interface ListLogSourcesResponse {
  sources?: LogSource[];
  nextToken?: string;
}
export const ListLogSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sources: S.optional(LogSourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLogSourcesResponse",
}) as any as S.Schema<ListLogSourcesResponse>;
export interface ListSubscribersRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListSubscribersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/subscribers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscribersRequest",
}) as any as S.Schema<ListSubscribersRequest>;
export type SubscriberResourceList = SubscriberResource[];
export const SubscriberResourceList = /*@__PURE__*/ S.Array(SubscriberResource);
export interface ListSubscribersResponse {
  subscribers?: SubscriberResource[];
  nextToken?: string;
}
export const ListSubscribersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscribers: S.optional(SubscriberResourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubscribersResponse",
}) as any as S.Schema<ListSubscribersResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
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
export interface RegisterDataLakeDelegatedAdministratorRequest {
  accountId: string;
}
export const RegisterDataLakeDelegatedAdministratorRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ accountId: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/datalake/delegate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "RegisterDataLakeDelegatedAdministratorRequest",
  }) as any as S.Schema<RegisterDataLakeDelegatedAdministratorRequest>;
export interface RegisterDataLakeDelegatedAdministratorResponse {}
export const RegisterDataLakeDelegatedAdministratorResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "RegisterDataLakeDelegatedAdministratorResponse",
  }) as any as S.Schema<RegisterDataLakeDelegatedAdministratorResponse>;
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
      T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
      T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
export interface UpdateDataLakeRequest {
  configurations: DataLakeConfiguration[];
  metaStoreManagerRoleArn?: string;
}
export const UpdateDataLakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurations: DataLakeConfigurationList,
    metaStoreManagerRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/datalake" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataLakeRequest",
}) as any as S.Schema<UpdateDataLakeRequest>;
export interface UpdateDataLakeResponse {
  dataLakes?: DataLakeResource[];
}
export const UpdateDataLakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataLakes: S.optional(DataLakeResourceList) }),
).annotate({
  identifier: "UpdateDataLakeResponse",
}) as any as S.Schema<UpdateDataLakeResponse>;
export interface UpdateDataLakeExceptionSubscriptionRequest {
  subscriptionProtocol: string;
  notificationEndpoint: string;
  exceptionTimeToLive?: number;
}
export const UpdateDataLakeExceptionSubscriptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      subscriptionProtocol: S.String,
      notificationEndpoint: S.String,
      exceptionTimeToLive: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/datalake/exceptions/subscription" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateDataLakeExceptionSubscriptionRequest",
  }) as any as S.Schema<UpdateDataLakeExceptionSubscriptionRequest>;
export interface UpdateDataLakeExceptionSubscriptionResponse {}
export const UpdateDataLakeExceptionSubscriptionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateDataLakeExceptionSubscriptionResponse",
  }) as any as S.Schema<UpdateDataLakeExceptionSubscriptionResponse>;
export interface UpdateSubscriberRequest {
  subscriberId: string;
  subscriberIdentity?: AwsIdentity;
  subscriberName?: string;
  subscriberDescription?: string;
  sources?: LogSourceResource[];
}
export const UpdateSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriberId: S.String.pipe(T.HttpLabel("subscriberId")),
    subscriberIdentity: S.optional(AwsIdentity),
    subscriberName: S.optional(S.String),
    subscriberDescription: S.optional(S.String),
    sources: S.optional(LogSourceResourceList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/subscribers/{subscriberId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriberRequest",
}) as any as S.Schema<UpdateSubscriberRequest>;
export interface UpdateSubscriberResponse {
  subscriber?: SubscriberResource;
}
export const UpdateSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscriber: S.optional(SubscriberResource) }),
).annotate({
  identifier: "UpdateSubscriberResponse",
}) as any as S.Schema<UpdateSubscriberResponse>;
export interface UpdateSubscriberNotificationRequest {
  subscriberId: string;
  configuration: NotificationConfiguration;
}
export const UpdateSubscriberNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriberId: S.String.pipe(T.HttpLabel("subscriberId")),
    configuration: NotificationConfiguration,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/subscribers/{subscriberId}/notification",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriberNotificationRequest",
}) as any as S.Schema<UpdateSubscriberNotificationRequest>;
export interface UpdateSubscriberNotificationResponse {
  subscriberEndpoint?: string;
}
export const UpdateSubscriberNotificationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ subscriberEndpoint: S.optional(S.String) }),
).annotate({
  identifier: "UpdateSubscriberNotificationResponse",
}) as any as S.Schema<UpdateSubscriberNotificationResponse>;
export type CreateAwsLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a natively supported Amazon Web Services service as an Amazon Security Lake source. Enables
 * source types for member accounts in required Amazon Web Services Regions, based on the
 * parameters you specify. You can choose any source type in any Region for either accounts
 * that are part of a trusted organization or standalone accounts. Once you add an Amazon Web Services service as a source, Security Lake starts collecting logs and events from it.
 *
 * You can use this API only to enable natively supported Amazon Web Services services as a
 * source. Use `CreateCustomLogSource` to enable data collection from a custom
 * source.
 */
export const createAwsLogSource: API.OperationMethod<
  CreateAwsLogSourceRequest,
  CreateAwsLogSourceResponse,
  CreateAwsLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAwsLogSourceRequest,
  output: CreateAwsLogSourceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAwsLogSource",
}));

export type CreateCustomLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds a third-party custom source in Amazon Security Lake, from the Amazon Web Services Region
 * where you want to create a custom source. Security Lake can collect logs and events from
 * third-party custom sources. After creating the appropriate IAM role to
 * invoke Glue crawler, use this API to add a custom source name in Security Lake. This
 * operation creates a partition in the Amazon S3 bucket for Security Lake as the target
 * location for log files from the custom source. In addition, this operation also creates an
 * associated Glue table and an Glue crawler.
 */
export const createCustomLogSource: API.OperationMethod<
  CreateCustomLogSourceRequest,
  CreateCustomLogSourceResponse,
  CreateCustomLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomLogSourceRequest,
  output: CreateCustomLogSourceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomLogSource",
}));

export type CreateDataLakeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Initializes an Amazon Security Lake instance with the provided (or default) configuration. You
 * can enable Security Lake in Amazon Web Services Regions with customized settings before enabling
 * log collection in Regions. To specify particular Regions, configure these Regions using the
 * `configurations` parameter. If you have already enabled Security Lake in a Region
 * when you call this command, the command will update the Region if you provide new
 * configuration parameters. If you have not already enabled Security Lake in the Region when you
 * call this API, it will set up the data lake in the Region with the specified
 * configurations.
 *
 * When you enable Security Lake, it starts ingesting security data after the
 * `CreateAwsLogSource` call and after you create subscribers using the `CreateSubscriber` API. This includes ingesting security data from
 * sources, storing data, and making data accessible to subscribers. Security Lake also enables
 * all the existing settings and resources that it stores or maintains for your Amazon Web Services account in the current Region, including security log and event data. For
 * more information, see the Amazon Security Lake User
 * Guide.
 */
export const createDataLake: API.OperationMethod<
  CreateDataLakeRequest,
  CreateDataLakeResponse,
  CreateDataLakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataLakeRequest,
  output: CreateDataLakeResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLake",
}));

export type CreateDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates the specified notification subscription in Amazon Security Lake for the organization
 * you specify. The notification subscription is created for exceptions that cannot be resolved by Security Lake automatically.
 */
export const createDataLakeExceptionSubscription: API.OperationMethod<
  CreateDataLakeExceptionSubscriptionRequest,
  CreateDataLakeExceptionSubscriptionResponse,
  CreateDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataLakeExceptionSubscriptionRequest,
  output: CreateDataLakeExceptionSubscriptionResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLakeExceptionSubscription",
}));

export type CreateDataLakeOrganizationConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Automatically enables Amazon Security Lake for new member accounts in your organization.
 * Security Lake is not automatically enabled for any existing member accounts in your
 * organization.
 *
 * This operation merges the new data lake organization configuration with the existing configuration for Security Lake in your organization. If you want to create a new data lake organization configuration, you must delete the existing one using DeleteDataLakeOrganizationConfiguration.
 */
export const createDataLakeOrganizationConfiguration: API.OperationMethod<
  CreateDataLakeOrganizationConfigurationRequest,
  CreateDataLakeOrganizationConfigurationResponse,
  CreateDataLakeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataLakeOrganizationConfigurationRequest,
  output: CreateDataLakeOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataLakeOrganizationConfiguration",
}));

export type CreateSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a subscriber for accounts that are already enabled in Amazon Security Lake. You can
 * create a subscriber with access to data in the current Amazon Web Services Region.
 */
export const createSubscriber: API.OperationMethod<
  CreateSubscriberRequest,
  CreateSubscriberResponse,
  CreateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriberRequest,
  output: CreateSubscriberResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriber",
}));

export type CreateSubscriberNotificationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Notifies the subscriber when new data is written to the data lake for the sources that
 * the subscriber consumes in Security Lake. You can create only one subscriber notification per
 * subscriber.
 */
export const createSubscriberNotification: API.OperationMethod<
  CreateSubscriberNotificationRequest,
  CreateSubscriberNotificationResponse,
  CreateSubscriberNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriberNotificationRequest,
  output: CreateSubscriberNotificationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriberNotification",
}));

export type DeleteAwsLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a natively supported Amazon Web Services service as an Amazon Security Lake source. You
 * can remove a source for one or more Regions. When you remove the source, Security Lake stops
 * collecting data from that source in the specified Regions and accounts, and subscribers can
 * no longer consume new data from the source. However, subscribers can still consume data
 * that Security Lake collected from the source before removal.
 *
 * You can choose any source type in any Amazon Web Services Region for either accounts that
 * are part of a trusted organization or standalone accounts.
 */
export const deleteAwsLogSource: API.OperationMethod<
  DeleteAwsLogSourceRequest,
  DeleteAwsLogSourceResponse,
  DeleteAwsLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAwsLogSourceRequest,
  output: DeleteAwsLogSourceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAwsLogSource",
}));

export type DeleteCustomLogSourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes a custom log source from Amazon Security Lake, to stop sending data from the custom
 * source to Security Lake.
 */
export const deleteCustomLogSource: API.OperationMethod<
  DeleteCustomLogSourceRequest,
  DeleteCustomLogSourceResponse,
  DeleteCustomLogSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomLogSourceRequest,
  output: DeleteCustomLogSourceResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomLogSource",
}));

export type DeleteDataLakeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * When you disable Amazon Security Lake from your account, Security Lake is disabled in all Amazon Web Services Regions and it stops collecting data from your sources. Also, this API
 * automatically takes steps to remove the account from Security Lake. However, Security Lake retains
 * all of your existing settings and the resources that it created in your Amazon Web Services
 * account in the current Amazon Web Services Region.
 *
 * The `DeleteDataLake` operation does not delete the data that is stored in
 * your Amazon S3 bucket, which is owned by your Amazon Web Services account. For more
 * information, see the Amazon Security Lake User
 * Guide.
 */
export const deleteDataLake: API.OperationMethod<
  DeleteDataLakeRequest,
  DeleteDataLakeResponse,
  DeleteDataLakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataLakeRequest,
  output: DeleteDataLakeResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLake",
}));

export type DeleteDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified notification subscription in Amazon Security Lake for the organization
 * you specify.
 */
export const deleteDataLakeExceptionSubscription: API.OperationMethod<
  DeleteDataLakeExceptionSubscriptionRequest,
  DeleteDataLakeExceptionSubscriptionResponse,
  DeleteDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataLakeExceptionSubscriptionRequest,
  output: DeleteDataLakeExceptionSubscriptionResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLakeExceptionSubscription",
}));

export type DeleteDataLakeOrganizationConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Turns off automatic enablement of Amazon Security Lake for member accounts that are added to an organization in Organizations. Only the delegated
 * Security Lake administrator for an organization can perform this operation. If the delegated Security Lake administrator performs this operation, new member
 * accounts won't automatically contribute data to the data lake.
 */
export const deleteDataLakeOrganizationConfiguration: API.OperationMethod<
  DeleteDataLakeOrganizationConfigurationRequest,
  DeleteDataLakeOrganizationConfigurationResponse,
  DeleteDataLakeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataLakeOrganizationConfigurationRequest,
  output: DeleteDataLakeOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataLakeOrganizationConfiguration",
}));

export type DeleteSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the subscription permission and all notification settings for accounts that are
 * already enabled in Amazon Security Lake. When you run `DeleteSubscriber`, the
 * subscriber will no longer consume data from Security Lake and the subscriber is removed. This
 * operation deletes the subscriber and removes access to data in the current Amazon Web Services Region.
 */
export const deleteSubscriber: API.OperationMethod<
  DeleteSubscriberRequest,
  DeleteSubscriberResponse,
  DeleteSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriberRequest,
  output: DeleteSubscriberResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriber",
}));

export type DeleteSubscriberNotificationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes the specified subscription notification in Amazon Security Lake for the organization
 * you specify.
 */
export const deleteSubscriberNotification: API.OperationMethod<
  DeleteSubscriberNotificationRequest,
  DeleteSubscriberNotificationResponse,
  DeleteSubscriberNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriberNotificationRequest,
  output: DeleteSubscriberNotificationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriberNotification",
}));

export type DeregisterDataLakeDelegatedAdministratorError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the Amazon Security Lake delegated administrator account for the organization. This API
 * can only be called by the organization management account. The organization management
 * account cannot be the delegated administrator account.
 */
export const deregisterDataLakeDelegatedAdministrator: API.OperationMethod<
  DeregisterDataLakeDelegatedAdministratorRequest,
  DeregisterDataLakeDelegatedAdministratorResponse,
  DeregisterDataLakeDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterDataLakeDelegatedAdministratorRequest,
  output: DeregisterDataLakeDelegatedAdministratorResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDataLakeDelegatedAdministrator",
}));

export type GetDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the protocol and endpoint that were provided when subscribing to Amazon SNS topics for exception notifications.
 */
export const getDataLakeExceptionSubscription: API.OperationMethod<
  GetDataLakeExceptionSubscriptionRequest,
  GetDataLakeExceptionSubscriptionResponse,
  GetDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataLakeExceptionSubscriptionRequest,
  output: GetDataLakeExceptionSubscriptionResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeExceptionSubscription",
}));

export type GetDataLakeOrganizationConfigurationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the configuration that will be automatically set up for accounts added to the
 * organization after the organization has onboarded to Amazon Security Lake. This API does not take
 * input parameters.
 */
export const getDataLakeOrganizationConfiguration: API.OperationMethod<
  GetDataLakeOrganizationConfigurationRequest,
  GetDataLakeOrganizationConfigurationResponse,
  GetDataLakeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataLakeOrganizationConfigurationRequest,
  output: GetDataLakeOrganizationConfigurationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeOrganizationConfiguration",
}));

export type GetDataLakeSourcesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves a snapshot of the current Region, including whether Amazon Security Lake is enabled
 * for those accounts and which sources Security Lake is collecting data from.
 */
export const getDataLakeSources: API.PaginatedOperationMethod<
  GetDataLakeSourcesRequest,
  GetDataLakeSourcesResponse,
  GetDataLakeSourcesError,
  Credentials | HttpClient.HttpClient,
  DataLakeSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDataLakeSourcesRequest,
  output: GetDataLakeSourcesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataLakeSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the subscription information for the specified subscription ID. You can get
 * information about a specific subscriber.
 */
export const getSubscriber: API.OperationMethod<
  GetSubscriberRequest,
  GetSubscriberResponse,
  GetSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriberRequest,
  output: GetSubscriberResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscriber",
}));

export type ListDataLakeExceptionsError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists the Amazon Security Lake exceptions that you can use to find the source of problems and
 * fix them.
 */
export const listDataLakeExceptions: API.PaginatedOperationMethod<
  ListDataLakeExceptionsRequest,
  ListDataLakeExceptionsResponse,
  ListDataLakeExceptionsError,
  Credentials | HttpClient.HttpClient,
  DataLakeException
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataLakeExceptionsRequest,
  output: ListDataLakeExceptionsResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataLakeExceptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "exceptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataLakesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the Amazon Security Lake configuration object for the specified Amazon Web Services Regions. You can use this operation to determine whether
 * Security Lake is enabled for a Region.
 */
export const listDataLakes: API.OperationMethod<
  ListDataLakesRequest,
  ListDataLakesResponse,
  ListDataLakesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDataLakesRequest,
  output: ListDataLakesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataLakes",
}));

export type ListLogSourcesError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the log sources.
 */
export const listLogSources: API.PaginatedOperationMethod<
  ListLogSourcesRequest,
  ListLogSourcesResponse,
  ListLogSourcesError,
  Credentials | HttpClient.HttpClient,
  LogSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLogSourcesRequest,
  output: ListLogSourcesResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscribersError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all subscribers for the specific Amazon Security Lake account ID. You can retrieve a list
 * of subscriptions associated with a specific organization or Amazon Web Services account.
 */
export const listSubscribers: API.PaginatedOperationMethod<
  ListSubscribersRequest,
  ListSubscribersResponse,
  ListSubscribersError,
  Credentials | HttpClient.HttpClient,
  SubscriberResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscribersRequest,
  output: ListSubscribersResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscribers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieves the tags (keys and values) that are associated with an Amazon Security Lake resource: a subscriber, or the data lake configuration for
 * your Amazon Web Services account in a particular Amazon Web Services Region.
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
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RegisterDataLakeDelegatedAdministratorError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Designates the Amazon Security Lake delegated administrator account for the organization. This
 * API can only be called by the organization management account. The organization management
 * account cannot be the delegated administrator account.
 */
export const registerDataLakeDelegatedAdministrator: API.OperationMethod<
  RegisterDataLakeDelegatedAdministratorRequest,
  RegisterDataLakeDelegatedAdministratorResponse,
  RegisterDataLakeDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterDataLakeDelegatedAdministratorRequest,
  output: RegisterDataLakeDelegatedAdministratorResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDataLakeDelegatedAdministrator",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Adds or updates one or more tags that are associated with an Amazon Security Lake resource: a subscriber, or the data lake configuration for your
 * Amazon Web Services account in a particular Amazon Web Services Region. A *tag* is a label that you can define and associate with
 * Amazon Web Services resources. Each tag consists of a required *tag key* and an associated *tag value*. A
 * *tag key* is a general label that acts as a category for a more specific tag value. A *tag value* acts as a
 * descriptor for a tag key. Tags can help you identify, categorize, and manage resources in different ways, such as by owner, environment, or other
 * criteria. For more information, see
 * Tagging Amazon Security Lake resources in the
 * *Amazon Security Lake User Guide*.
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
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Removes one or more tags (keys and values) from an Amazon Security Lake resource: a subscriber, or the data lake configuration for your
 * Amazon Web Services account in a particular Amazon Web Services Region.
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
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDataLakeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * You can use `UpdateDataLake` to specify where to store your security data, how it should
 * be encrypted at rest and for how long. You can add a Rollup
 * Region to consolidate data from multiple Amazon Web Services Regions, replace
 * default encryption (SSE-S3) with Customer Manged Key,
 * or specify transition and expiration actions through storage Lifecycle management. The `UpdateDataLake` API works as an "upsert" operation that performs an insert if the specified item or record does not exist, or an update if it
 * already exists. Security Lake securely stores your data at rest using Amazon Web Services encryption solutions. For more details, see Data protection in Amazon Security Lake.
 *
 * For example, omitting the key `encryptionConfiguration` from a Region that is
 * included in an update call that currently uses KMS will leave that Region's KMS key in
 * place, but specifying `encryptionConfiguration: {kmsKeyId: 'S3_MANAGED_KEY'}`
 * for that same Region will reset the key to `S3-managed`.
 *
 * For more details about lifecycle management and how to update retention settings for one or more Regions after enabling Security Lake, see the Amazon Security Lake User Guide.
 */
export const updateDataLake: API.OperationMethod<
  UpdateDataLakeRequest,
  UpdateDataLakeResponse,
  UpdateDataLakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataLakeRequest,
  output: UpdateDataLakeResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataLake",
}));

export type UpdateDataLakeExceptionSubscriptionError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates the specified notification subscription in Amazon Security Lake for the organization
 * you specify.
 */
export const updateDataLakeExceptionSubscription: API.OperationMethod<
  UpdateDataLakeExceptionSubscriptionRequest,
  UpdateDataLakeExceptionSubscriptionResponse,
  UpdateDataLakeExceptionSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataLakeExceptionSubscriptionRequest,
  output: UpdateDataLakeExceptionSubscriptionResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataLakeExceptionSubscription",
}));

export type UpdateSubscriberError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing subscription for the given Amazon Security Lake account ID. You can update
 * a subscriber by changing the sources that the subscriber consumes data from.
 */
export const updateSubscriber: API.OperationMethod<
  UpdateSubscriberRequest,
  UpdateSubscriberResponse,
  UpdateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriberRequest,
  output: UpdateSubscriberResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriber",
}));

export type UpdateSubscriberNotificationError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an existing notification method for the subscription (SQS or HTTPs endpoint) or
 * switches the notification subscription endpoint for a subscriber.
 */
export const updateSubscriberNotification: API.OperationMethod<
  UpdateSubscriberNotificationRequest,
  UpdateSubscriberNotificationResponse,
  UpdateSubscriberNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriberNotificationRequest,
  output: UpdateSubscriberNotificationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriberNotification",
}));
