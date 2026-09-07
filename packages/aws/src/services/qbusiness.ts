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
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "QBusiness",
  serviceShapeName: "ExpertQ",
});
const auth = T.AwsAuthSigv4({ name: "qbusiness" });
const ver = T.ServiceVersion("2023-11-27");
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
                `https://qbusiness-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          return e(
            `https://qbusiness.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://qbusiness-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        return e(
          `https://qbusiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ExternalResourceException
  extends /*@__PURE__*/ S.TaggedError<ExternalResourceException>()(
    "ExternalResourceException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LicenseNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LicenseNotFoundException>()(
    "LicenseNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MediaTooLargeException
  extends /*@__PURE__*/ S.TaggedError<MediaTooLargeException>()(
    "MediaTooLargeException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
    },
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fields: S.optional(
        S.suspend(() => ValidationExceptionFields).annotate({
          identifier: "ValidationExceptionFields",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ApplicationId = string;
export type StatementId = string;
export type QIamAction = string;
export type QIamActions = string[];
export const QIamActions = /*@__PURE__*/ S.Array(S.String);
export type PermissionConditionOperator = "StringEquals" | (string & {});
export const PermissionConditionOperator = S.String;

export type PermissionConditionKey = string;
export type PermissionConditionValue = string;
export type PermissionConditionValues = string[];
export const PermissionConditionValues = /*@__PURE__*/ S.Array(S.String);
export interface PermissionCondition {
  conditionOperator: PermissionConditionOperator;
  conditionKey: string;
  conditionValues: string[];
}
export const PermissionCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conditionOperator: PermissionConditionOperator,
    conditionKey: S.String,
    conditionValues: PermissionConditionValues,
  }),
).annotate({
  identifier: "PermissionCondition",
}) as any as S.Schema<PermissionCondition>;
export type PermissionConditions = PermissionCondition[];
export const PermissionConditions = /*@__PURE__*/ S.Array(PermissionCondition);
export type PrincipalRoleArn = string;
export interface AssociatePermissionRequest {
  applicationId: string;
  statementId: string;
  actions: string[];
  conditions?: PermissionCondition[];
  principal: string;
}
export const AssociatePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    statementId: S.String,
    actions: QIamActions,
    conditions: S.optional(PermissionConditions),
    principal: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePermissionRequest",
}) as any as S.Schema<AssociatePermissionRequest>;
export interface AssociatePermissionResponse {
  statement?: string;
}
export const AssociatePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statement: S.optional(S.String) }),
).annotate({
  identifier: "AssociatePermissionResponse",
}) as any as S.Schema<AssociatePermissionResponse>;
export type IndexId = string;
export type DocumentId = string;
export interface DeleteDocument {
  documentId: string;
}
export const DeleteDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ documentId: S.String }),
).annotate({ identifier: "DeleteDocument" }) as any as S.Schema<DeleteDocument>;
export type DeleteDocuments = DeleteDocument[];
export const DeleteDocuments = /*@__PURE__*/ S.Array(DeleteDocument);
export type ExecutionId = string;
export interface BatchDeleteDocumentRequest {
  applicationId: string;
  indexId: string;
  documents: DeleteDocument[];
  dataSourceSyncId?: string;
}
export const BatchDeleteDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    documents: DeleteDocuments,
    dataSourceSyncId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/indices/{indexId}/documents/delete",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteDocumentRequest",
}) as any as S.Schema<BatchDeleteDocumentRequest>;
export type ErrorMessage = string;
export type ErrorCode =
  | "InternalError"
  | "InvalidRequest"
  | "ResourceInactive"
  | "ResourceNotFound"
  | (string & {});
export const ErrorCode = S.String;

export interface ErrorDetail {
  errorMessage?: string;
  errorCode?: ErrorCode;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorMessage: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export type DataSourceId = string;
export interface FailedDocument {
  id?: string;
  error?: ErrorDetail;
  dataSourceId?: string;
}
export const FailedDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    error: S.optional(ErrorDetail),
    dataSourceId: S.optional(S.String),
  }),
).annotate({ identifier: "FailedDocument" }) as any as S.Schema<FailedDocument>;
export type FailedDocuments = FailedDocument[];
export const FailedDocuments = /*@__PURE__*/ S.Array(FailedDocument);
export interface BatchDeleteDocumentResponse {
  failedDocuments?: FailedDocument[];
}
export const BatchDeleteDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failedDocuments: S.optional(FailedDocuments) }),
).annotate({
  identifier: "BatchDeleteDocumentResponse",
}) as any as S.Schema<BatchDeleteDocumentResponse>;
export type DocumentAttributeKey = string;
export type DocumentAttributeStringValue = string;
export type DocumentAttributeStringListValue = string[];
export const DocumentAttributeStringListValue = /*@__PURE__*/ S.Array(S.String);
export type DocumentAttributeValue =
  | {
      stringValue: string;
      stringListValue?: never;
      longValue?: never;
      dateValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue: string[];
      longValue?: never;
      dateValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      longValue: number;
      dateValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      longValue?: never;
      dateValue: Date;
    };
export const DocumentAttributeValue = /*@__PURE__*/ S.Union([
  S.Struct({ stringValue: S.String }),
  S.Struct({ stringListValue: DocumentAttributeStringListValue }),
  S.Struct({ longValue: S.Number }),
  S.Struct({ dateValue: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
]);
export interface DocumentAttribute {
  name: string;
  value: DocumentAttributeValue;
}
export const DocumentAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: DocumentAttributeValue }),
).annotate({
  identifier: "DocumentAttribute",
}) as any as S.Schema<DocumentAttribute>;
export type DocumentAttributes = DocumentAttribute[];
export const DocumentAttributes = /*@__PURE__*/ S.Array(DocumentAttribute);
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3 {
  bucket: string;
  key: string;
}
export const S3 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, key: S.String }),
).annotate({ identifier: "S3" }) as any as S.Schema<S3>;
export type DocumentContent =
  | { blob: Uint8Array; s3?: never }
  | { blob?: never; s3: S3 };
export const DocumentContent = /*@__PURE__*/ S.Union([
  S.Struct({ blob: T.Blob }),
  S.Struct({ s3: S3 }),
]);
export type ContentType =
  | "PDF"
  | "HTML"
  | "MS_WORD"
  | "PLAIN_TEXT"
  | "PPT"
  | "RTF"
  | "XML"
  | "XSLT"
  | "MS_EXCEL"
  | "CSV"
  | "JSON"
  | "MD"
  | (string & {});
export const ContentType = S.String;

export type Title = string;
export type UserId = string;
export type ReadAccessType = "ALLOW" | "DENY" | (string & {});
export const ReadAccessType = S.String;

export type MembershipType = "INDEX" | "DATASOURCE" | (string & {});
export const MembershipType = S.String;

export interface PrincipalUser {
  id?: string;
  access: ReadAccessType;
  membershipType?: MembershipType;
}
export const PrincipalUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    access: ReadAccessType,
    membershipType: S.optional(MembershipType),
  }),
).annotate({ identifier: "PrincipalUser" }) as any as S.Schema<PrincipalUser>;
export type GroupName = string;
export interface PrincipalGroup {
  name?: string;
  access: ReadAccessType;
  membershipType?: MembershipType;
}
export const PrincipalGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    access: ReadAccessType,
    membershipType: S.optional(MembershipType),
  }),
).annotate({ identifier: "PrincipalGroup" }) as any as S.Schema<PrincipalGroup>;
export type Principal =
  | { user: PrincipalUser; group?: never }
  | { user?: never; group: PrincipalGroup };
export const Principal = /*@__PURE__*/ S.Union([
  S.Struct({ user: PrincipalUser }),
  S.Struct({ group: PrincipalGroup }),
]);
export type Principals = Principal[];
export const Principals = /*@__PURE__*/ S.Array(Principal);
export type MemberRelation = "AND" | "OR" | (string & {});
export const MemberRelation = S.String;

export interface AccessControl {
  principals: Principal[];
  memberRelation?: MemberRelation;
}
export const AccessControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principals: Principals,
    memberRelation: S.optional(MemberRelation),
  }),
).annotate({ identifier: "AccessControl" }) as any as S.Schema<AccessControl>;
export type AccessControls = AccessControl[];
export const AccessControls = /*@__PURE__*/ S.Array(AccessControl);
export interface AccessConfiguration {
  accessControls: AccessControl[];
  memberRelation?: MemberRelation;
}
export const AccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessControls: AccessControls,
    memberRelation: S.optional(MemberRelation),
  }),
).annotate({
  identifier: "AccessConfiguration",
}) as any as S.Schema<AccessConfiguration>;
export type DocumentEnrichmentConditionOperator =
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS"
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "EXISTS"
  | "NOT_EXISTS"
  | "BEGINS_WITH"
  | (string & {});
export const DocumentEnrichmentConditionOperator = S.String;

export interface DocumentAttributeCondition {
  key: string;
  operator: DocumentEnrichmentConditionOperator;
  value?: DocumentAttributeValue;
}
export const DocumentAttributeCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    operator: DocumentEnrichmentConditionOperator,
    value: S.optional(DocumentAttributeValue),
  }),
).annotate({
  identifier: "DocumentAttributeCondition",
}) as any as S.Schema<DocumentAttributeCondition>;
export type AttributeValueOperator = "DELETE" | (string & {});
export const AttributeValueOperator = S.String;

export interface DocumentAttributeTarget {
  key: string;
  value?: DocumentAttributeValue;
  attributeValueOperator?: AttributeValueOperator;
}
export const DocumentAttributeTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    value: S.optional(DocumentAttributeValue),
    attributeValueOperator: S.optional(AttributeValueOperator),
  }),
).annotate({
  identifier: "DocumentAttributeTarget",
}) as any as S.Schema<DocumentAttributeTarget>;
export type DocumentContentOperator = "DELETE" | (string & {});
export const DocumentContentOperator = S.String;

export interface InlineDocumentEnrichmentConfiguration {
  condition?: DocumentAttributeCondition;
  target?: DocumentAttributeTarget;
  documentContentOperator?: DocumentContentOperator;
}
export const InlineDocumentEnrichmentConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      condition: S.optional(DocumentAttributeCondition),
      target: S.optional(DocumentAttributeTarget),
      documentContentOperator: S.optional(DocumentContentOperator),
    }),
).annotate({
  identifier: "InlineDocumentEnrichmentConfiguration",
}) as any as S.Schema<InlineDocumentEnrichmentConfiguration>;
export type InlineDocumentEnrichmentConfigurations =
  InlineDocumentEnrichmentConfiguration[];
export const InlineDocumentEnrichmentConfigurations = /*@__PURE__*/ S.Array(
  InlineDocumentEnrichmentConfiguration,
);
export type LambdaArn = string;
export type RoleArn = string;
export interface HookConfiguration {
  invocationCondition?: DocumentAttributeCondition;
  lambdaArn?: string;
  s3BucketName?: string;
  roleArn?: string;
}
export const HookConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationCondition: S.optional(DocumentAttributeCondition),
    lambdaArn: S.optional(S.String),
    s3BucketName: S.optional(S.String),
    roleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "HookConfiguration",
}) as any as S.Schema<HookConfiguration>;
export interface DocumentEnrichmentConfiguration {
  inlineConfigurations?: InlineDocumentEnrichmentConfiguration[];
  preExtractionHookConfiguration?: HookConfiguration;
  postExtractionHookConfiguration?: HookConfiguration;
}
export const DocumentEnrichmentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inlineConfigurations: S.optional(InlineDocumentEnrichmentConfigurations),
    preExtractionHookConfiguration: S.optional(HookConfiguration),
    postExtractionHookConfiguration: S.optional(HookConfiguration),
  }),
).annotate({
  identifier: "DocumentEnrichmentConfiguration",
}) as any as S.Schema<DocumentEnrichmentConfiguration>;
export type ImageExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export const ImageExtractionStatus = S.String;

export interface ImageExtractionConfiguration {
  imageExtractionStatus: ImageExtractionStatus;
}
export const ImageExtractionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ imageExtractionStatus: ImageExtractionStatus }),
).annotate({
  identifier: "ImageExtractionConfiguration",
}) as any as S.Schema<ImageExtractionConfiguration>;
export type AudioExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export const AudioExtractionStatus = S.String;

export interface AudioExtractionConfiguration {
  audioExtractionStatus: AudioExtractionStatus;
}
export const AudioExtractionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audioExtractionStatus: AudioExtractionStatus }),
).annotate({
  identifier: "AudioExtractionConfiguration",
}) as any as S.Schema<AudioExtractionConfiguration>;
export type VideoExtractionStatus = "ENABLED" | "DISABLED" | (string & {});
export const VideoExtractionStatus = S.String;

export interface VideoExtractionConfiguration {
  videoExtractionStatus: VideoExtractionStatus;
}
export const VideoExtractionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ videoExtractionStatus: VideoExtractionStatus }),
).annotate({
  identifier: "VideoExtractionConfiguration",
}) as any as S.Schema<VideoExtractionConfiguration>;
export interface MediaExtractionConfiguration {
  imageExtractionConfiguration?: ImageExtractionConfiguration;
  audioExtractionConfiguration?: AudioExtractionConfiguration;
  videoExtractionConfiguration?: VideoExtractionConfiguration;
}
export const MediaExtractionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageExtractionConfiguration: S.optional(ImageExtractionConfiguration),
    audioExtractionConfiguration: S.optional(AudioExtractionConfiguration),
    videoExtractionConfiguration: S.optional(VideoExtractionConfiguration),
  }),
).annotate({
  identifier: "MediaExtractionConfiguration",
}) as any as S.Schema<MediaExtractionConfiguration>;
export interface Document {
  id: string;
  attributes?: DocumentAttribute[];
  content?: DocumentContent;
  contentType?: ContentType;
  title?: string;
  accessConfiguration?: AccessConfiguration;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export const Document = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    attributes: S.optional(DocumentAttributes),
    content: S.optional(DocumentContent),
    contentType: S.optional(ContentType),
    title: S.optional(S.String),
    accessConfiguration: S.optional(AccessConfiguration),
    documentEnrichmentConfiguration: S.optional(
      DocumentEnrichmentConfiguration,
    ),
    mediaExtractionConfiguration: S.optional(MediaExtractionConfiguration),
  }),
).annotate({ identifier: "Document" }) as any as S.Schema<Document>;
export type Documents = Document[];
export const Documents = /*@__PURE__*/ S.Array(Document);
export interface BatchPutDocumentRequest {
  applicationId: string;
  indexId: string;
  documents: Document[];
  roleArn?: string;
  dataSourceSyncId?: string;
}
export const BatchPutDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    documents: Documents,
    roleArn: S.optional(S.String),
    dataSourceSyncId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/indices/{indexId}/documents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutDocumentRequest",
}) as any as S.Schema<BatchPutDocumentRequest>;
export interface BatchPutDocumentResponse {
  failedDocuments?: FailedDocument[];
}
export const BatchPutDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ failedDocuments: S.optional(FailedDocuments) }),
).annotate({
  identifier: "BatchPutDocumentResponse",
}) as any as S.Schema<BatchPutDocumentResponse>;
export type SubscriptionId = string;
export interface CancelSubscriptionRequest {
  applicationId: string;
  subscriptionId: string;
}
export const CancelSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/subscriptions/{subscriptionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSubscriptionRequest",
}) as any as S.Schema<CancelSubscriptionRequest>;
export type SubscriptionArn = string;
export type SubscriptionType = "Q_LITE" | "Q_BUSINESS" | (string & {});
export const SubscriptionType = S.String;

export interface SubscriptionDetails {
  type?: SubscriptionType;
}
export const SubscriptionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(SubscriptionType) }),
).annotate({
  identifier: "SubscriptionDetails",
}) as any as S.Schema<SubscriptionDetails>;
export interface CancelSubscriptionResponse {
  subscriptionArn?: string;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export const CancelSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptionArn: S.optional(S.String),
    currentSubscription: S.optional(SubscriptionDetails),
    nextSubscription: S.optional(SubscriptionDetails),
  }),
).annotate({
  identifier: "CancelSubscriptionResponse",
}) as any as S.Schema<CancelSubscriptionResponse>;
export type UserGroups = string[];
export const UserGroups = /*@__PURE__*/ S.Array(S.String);
export type ConversationId = string;
export type MessageId = string;
export type ClientToken = string;
export type ChatMode =
  | "RETRIEVAL_MODE"
  | "CREATOR_MODE"
  | "PLUGIN_MODE"
  | (string & {});
export const ChatMode = S.String;

export type PluginId = string;
export interface PluginConfiguration {
  pluginId: string;
}
export const PluginConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pluginId: S.String }),
).annotate({
  identifier: "PluginConfiguration",
}) as any as S.Schema<PluginConfiguration>;
export type ChatModeConfiguration = {
  pluginConfiguration: PluginConfiguration;
};
export const ChatModeConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ pluginConfiguration: PluginConfiguration }),
]);
export type AttributeFilters = AttributeFilter[];
export const AttributeFilters = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<AttributeFilter> => AttributeFilter).annotate({
    identifier: "AttributeFilter",
  }),
) as any as S.Schema<AttributeFilters>;
export interface AttributeFilter {
  andAllFilters?: AttributeFilter[];
  orAllFilters?: AttributeFilter[];
  notFilter?: AttributeFilter;
  equalsTo?: DocumentAttribute;
  containsAll?: DocumentAttribute;
  containsAny?: DocumentAttribute;
  greaterThan?: DocumentAttribute;
  greaterThanOrEquals?: DocumentAttribute;
  lessThan?: DocumentAttribute;
  lessThanOrEquals?: DocumentAttribute;
}
export const AttributeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    andAllFilters: S.optional(
      S.suspend(() => AttributeFilters).annotate({
        identifier: "AttributeFilters",
      }),
    ),
    orAllFilters: S.optional(
      S.suspend(() => AttributeFilters).annotate({
        identifier: "AttributeFilters",
      }),
    ),
    notFilter: S.optional(
      S.suspend((): S.Schema<AttributeFilter> => AttributeFilter).annotate({
        identifier: "AttributeFilter",
      }),
    ),
    equalsTo: S.optional(DocumentAttribute),
    containsAll: S.optional(DocumentAttribute),
    containsAny: S.optional(DocumentAttribute),
    greaterThan: S.optional(DocumentAttribute),
    greaterThanOrEquals: S.optional(DocumentAttribute),
    lessThan: S.optional(DocumentAttribute),
    lessThanOrEquals: S.optional(DocumentAttribute),
  }),
).annotate({
  identifier: "AttributeFilter",
}) as any as S.Schema<AttributeFilter>;
export interface ConfigurationEvent {
  chatMode?: ChatMode;
  chatModeConfiguration?: ChatModeConfiguration;
  attributeFilter?: AttributeFilter;
}
export const ConfigurationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    chatMode: S.optional(ChatMode),
    chatModeConfiguration: S.optional(ChatModeConfiguration),
    attributeFilter: S.optional(AttributeFilter),
  }),
).annotate({
  identifier: "ConfigurationEvent",
}) as any as S.Schema<ConfigurationEvent>;
export type UserMessage = string;
export interface TextInputEvent {
  userMessage: string;
}
export const TextInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userMessage: S.String }),
).annotate({ identifier: "TextInputEvent" }) as any as S.Schema<TextInputEvent>;
export type AttachmentName = string;
export type AttachmentId = string;
export interface ConversationSource {
  conversationId: string;
  attachmentId: string;
}
export const ConversationSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ conversationId: S.String, attachmentId: S.String }),
).annotate({
  identifier: "ConversationSource",
}) as any as S.Schema<ConversationSource>;
export type CopyFromSource = { conversation: ConversationSource };
export const CopyFromSource = /*@__PURE__*/ S.Union([
  S.Struct({ conversation: ConversationSource }),
]);
export interface AttachmentInput {
  data?: Uint8Array;
  name?: string;
  copyFrom?: CopyFromSource;
}
export const AttachmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    data: S.optional(T.Blob),
    name: S.optional(S.String),
    copyFrom: S.optional(CopyFromSource),
  }),
).annotate({
  identifier: "AttachmentInput",
}) as any as S.Schema<AttachmentInput>;
export interface AttachmentInputEvent {
  attachment?: AttachmentInput;
}
export const AttachmentInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachment: S.optional(AttachmentInput) }),
).annotate({
  identifier: "AttachmentInputEvent",
}) as any as S.Schema<AttachmentInputEvent>;
export type ActionPayloadFieldKey = string;
export type ActionPayloadFieldValue = unknown;
export interface ActionExecutionPayloadField {
  value: any;
}
export const ActionExecutionPayloadField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.Any }),
).annotate({
  identifier: "ActionExecutionPayloadField",
}) as any as S.Schema<ActionExecutionPayloadField>;
export type ActionExecutionPayload = {
  [key: string]: ActionExecutionPayloadField | undefined;
};
export const ActionExecutionPayload = /*@__PURE__*/ S.Record(
  S.String,
  ActionExecutionPayloadField.pipe(S.optional),
);
export type ActionPayloadFieldNameSeparator = string;
export interface ActionExecutionEvent {
  pluginId: string;
  payload: { [key: string]: ActionExecutionPayloadField | undefined };
  payloadFieldNameSeparator: string;
}
export const ActionExecutionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pluginId: S.String,
    payload: ActionExecutionPayload,
    payloadFieldNameSeparator: S.String,
  }),
).annotate({
  identifier: "ActionExecutionEvent",
}) as any as S.Schema<ActionExecutionEvent>;
export interface EndOfInputEvent {}
export const EndOfInputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EndOfInputEvent",
}) as any as S.Schema<EndOfInputEvent>;
export type AuthResponseKey = string;
export type AuthResponseValue = string;
export type AuthorizationResponseMap = { [key: string]: string | undefined };
export const AuthorizationResponseMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AuthChallengeResponseEvent {
  responseMap: { [key: string]: string | undefined };
}
export const AuthChallengeResponseEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ responseMap: AuthorizationResponseMap }),
).annotate({
  identifier: "AuthChallengeResponseEvent",
}) as any as S.Schema<AuthChallengeResponseEvent>;
export type ChatInputStream =
  | {
      configurationEvent: ConfigurationEvent;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent: TextInputEvent;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent: AttachmentInputEvent;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent: ActionExecutionEvent;
      endOfInputEvent?: never;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent: EndOfInputEvent;
      authChallengeResponseEvent?: never;
    }
  | {
      configurationEvent?: never;
      textEvent?: never;
      attachmentEvent?: never;
      actionExecutionEvent?: never;
      endOfInputEvent?: never;
      authChallengeResponseEvent: AuthChallengeResponseEvent;
    };
export const ChatInputStream = /*@__PURE__*/ T.InputEventStream(
  S.Union([
    S.Struct({ configurationEvent: ConfigurationEvent }),
    S.Struct({ textEvent: TextInputEvent }),
    S.Struct({ attachmentEvent: AttachmentInputEvent }),
    S.Struct({ actionExecutionEvent: ActionExecutionEvent }),
    S.Struct({ endOfInputEvent: EndOfInputEvent }),
    S.Struct({ authChallengeResponseEvent: AuthChallengeResponseEvent }),
  ]),
) as any as S.Schema<stream.Stream<ChatInputStream, Error, never>>;
export interface ChatInput {
  applicationId: string;
  userId?: string;
  userGroups?: string[];
  conversationId?: string;
  parentMessageId?: string;
  clientToken?: string;
  inputStream?: stream.Stream<ChatInputStream, Error, never>;
}
export const ChatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    userGroups: S.optional(UserGroups).pipe(T.HttpQuery("userGroups")),
    conversationId: S.optional(S.String).pipe(T.HttpQuery("conversationId")),
    parentMessageId: S.optional(S.String).pipe(T.HttpQuery("parentMessageId")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    inputStream: S.optional(ChatInputStream).pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/conversations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ChatInput" }) as any as S.Schema<ChatInput>;
export type SystemMessageType =
  | "RESPONSE"
  | "GROUNDED_RESPONSE"
  | (string & {});
export const SystemMessageType = S.String;

export interface TextOutputEvent {
  systemMessageType?: SystemMessageType;
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  systemMessage?: string;
}
export const TextOutputEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    systemMessageType: S.optional(SystemMessageType),
    conversationId: S.optional(S.String),
    userMessageId: S.optional(S.String),
    systemMessageId: S.optional(S.String),
    systemMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "TextOutputEvent",
}) as any as S.Schema<TextOutputEvent>;
export type SnippetExcerptText = string;
export interface SnippetExcerpt {
  text?: string;
}
export const SnippetExcerpt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({ identifier: "SnippetExcerpt" }) as any as S.Schema<SnippetExcerpt>;
export type SourceAttributionMediaId = string;
export type MediaId = string;
export interface ImageSourceDetails {
  mediaId?: string;
  mediaMimeType?: string;
}
export const ImageSourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mediaId: S.optional(S.String),
    mediaMimeType: S.optional(S.String),
  }),
).annotate({
  identifier: "ImageSourceDetails",
}) as any as S.Schema<ImageSourceDetails>;
export type AudioExtractionType = "TRANSCRIPT" | "SUMMARY" | (string & {});
export const AudioExtractionType = S.String;

export interface AudioSourceDetails {
  mediaId?: string;
  mediaMimeType?: string;
  startTimeMilliseconds?: number;
  endTimeMilliseconds?: number;
  audioExtractionType?: AudioExtractionType;
}
export const AudioSourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mediaId: S.optional(S.String),
    mediaMimeType: S.optional(S.String),
    startTimeMilliseconds: S.optional(S.Number),
    endTimeMilliseconds: S.optional(S.Number),
    audioExtractionType: S.optional(AudioExtractionType),
  }),
).annotate({
  identifier: "AudioSourceDetails",
}) as any as S.Schema<AudioSourceDetails>;
export type VideoExtractionType = "TRANSCRIPT" | "SUMMARY" | (string & {});
export const VideoExtractionType = S.String;

export interface VideoSourceDetails {
  mediaId?: string;
  mediaMimeType?: string;
  startTimeMilliseconds?: number;
  endTimeMilliseconds?: number;
  videoExtractionType?: VideoExtractionType;
}
export const VideoSourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mediaId: S.optional(S.String),
    mediaMimeType: S.optional(S.String),
    startTimeMilliseconds: S.optional(S.Number),
    endTimeMilliseconds: S.optional(S.Number),
    videoExtractionType: S.optional(VideoExtractionType),
  }),
).annotate({
  identifier: "VideoSourceDetails",
}) as any as S.Schema<VideoSourceDetails>;
export type SourceDetails =
  | {
      imageSourceDetails: ImageSourceDetails;
      audioSourceDetails?: never;
      videoSourceDetails?: never;
    }
  | {
      imageSourceDetails?: never;
      audioSourceDetails: AudioSourceDetails;
      videoSourceDetails?: never;
    }
  | {
      imageSourceDetails?: never;
      audioSourceDetails?: never;
      videoSourceDetails: VideoSourceDetails;
    };
export const SourceDetails = /*@__PURE__*/ S.Union([
  S.Struct({ imageSourceDetails: ImageSourceDetails }),
  S.Struct({ audioSourceDetails: AudioSourceDetails }),
  S.Struct({ videoSourceDetails: VideoSourceDetails }),
]);
export interface TextSegment {
  beginOffset?: number;
  endOffset?: number;
  snippetExcerpt?: SnippetExcerpt;
  mediaId?: string;
  mediaMimeType?: string;
  sourceDetails?: SourceDetails;
}
export const TextSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beginOffset: S.optional(S.Number),
    endOffset: S.optional(S.Number),
    snippetExcerpt: S.optional(SnippetExcerpt),
    mediaId: S.optional(S.String),
    mediaMimeType: S.optional(S.String),
    sourceDetails: S.optional(SourceDetails),
  }),
).annotate({ identifier: "TextSegment" }) as any as S.Schema<TextSegment>;
export type TextSegmentList = TextSegment[];
export const TextSegmentList = /*@__PURE__*/ S.Array(TextSegment);
export interface SourceAttribution {
  title?: string;
  snippet?: string;
  url?: string;
  citationNumber?: number;
  updatedAt?: Date;
  textMessageSegments?: TextSegment[];
  documentId?: string;
  indexId?: string;
  datasourceId?: string;
}
export const SourceAttribution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    snippet: S.optional(S.String),
    url: S.optional(S.String),
    citationNumber: S.optional(S.Number),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    textMessageSegments: S.optional(TextSegmentList),
    documentId: S.optional(S.String),
    indexId: S.optional(S.String),
    datasourceId: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceAttribution",
}) as any as S.Schema<SourceAttribution>;
export type SourceAttributions = SourceAttribution[];
export const SourceAttributions = /*@__PURE__*/ S.Array(SourceAttribution).pipe(
  T.Sparse(),
);
export interface MetadataEvent {
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  sourceAttributions?: SourceAttribution[];
  finalTextMessage?: string;
}
export const MetadataEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.optional(S.String),
    userMessageId: S.optional(S.String),
    systemMessageId: S.optional(S.String),
    sourceAttributions: S.optional(SourceAttributions),
    finalTextMessage: S.optional(S.String),
  }),
).annotate({ identifier: "MetadataEvent" }) as any as S.Schema<MetadataEvent>;
export type PluginType =
  | "SERVICE_NOW"
  | "SALESFORCE"
  | "JIRA"
  | "ZENDESK"
  | "CUSTOM"
  | "QUICKSIGHT"
  | "SERVICENOW_NOW_PLATFORM"
  | "JIRA_CLOUD"
  | "SALESFORCE_CRM"
  | "ZENDESK_SUITE"
  | "ATLASSIAN_CONFLUENCE"
  | "GOOGLE_CALENDAR"
  | "MICROSOFT_TEAMS"
  | "MICROSOFT_EXCHANGE"
  | "PAGERDUTY_ADVANCE"
  | "SMARTSHEET"
  | "ASANA"
  | (string & {});
export const PluginType = S.String;

export type ActionPayloadFieldType =
  | "STRING"
  | "NUMBER"
  | "ARRAY"
  | "BOOLEAN"
  | (string & {});
export const ActionPayloadFieldType = S.String;

export interface ActionReviewPayloadFieldAllowedValue {
  value?: any;
  displayValue?: any;
}
export const ActionReviewPayloadFieldAllowedValue = /*@__PURE__*/ S.suspend(
  () => S.Struct({ value: S.optional(S.Any), displayValue: S.optional(S.Any) }),
).annotate({
  identifier: "ActionReviewPayloadFieldAllowedValue",
}) as any as S.Schema<ActionReviewPayloadFieldAllowedValue>;
export type ActionReviewPayloadFieldAllowedValues =
  ActionReviewPayloadFieldAllowedValue[];
export const ActionReviewPayloadFieldAllowedValues = /*@__PURE__*/ S.Array(
  ActionReviewPayloadFieldAllowedValue,
);
export type ActionReviewPayloadFieldArrayItemJsonSchema = unknown;
export interface ActionReviewPayloadField {
  displayName?: string;
  displayOrder?: number;
  displayDescription?: string;
  type?: ActionPayloadFieldType;
  value?: any;
  allowedValues?: ActionReviewPayloadFieldAllowedValue[];
  allowedFormat?: string;
  arrayItemJsonSchema?: any;
  required?: boolean;
}
export const ActionReviewPayloadField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    displayOrder: S.optional(S.Number),
    displayDescription: S.optional(S.String),
    type: S.optional(ActionPayloadFieldType),
    value: S.optional(S.Any),
    allowedValues: S.optional(ActionReviewPayloadFieldAllowedValues),
    allowedFormat: S.optional(S.String),
    arrayItemJsonSchema: S.optional(S.Any),
    required: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ActionReviewPayloadField",
}) as any as S.Schema<ActionReviewPayloadField>;
export type ActionReviewPayload = {
  [key: string]: ActionReviewPayloadField | undefined;
};
export const ActionReviewPayload = /*@__PURE__*/ S.Record(
  S.String,
  ActionReviewPayloadField.pipe(S.optional),
);
export interface ActionReviewEvent {
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  pluginId?: string;
  pluginType?: PluginType;
  payload?: { [key: string]: ActionReviewPayloadField | undefined };
  payloadFieldNameSeparator?: string;
}
export const ActionReviewEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.optional(S.String),
    userMessageId: S.optional(S.String),
    systemMessageId: S.optional(S.String),
    pluginId: S.optional(S.String),
    pluginType: S.optional(PluginType),
    payload: S.optional(ActionReviewPayload),
    payloadFieldNameSeparator: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionReviewEvent",
}) as any as S.Schema<ActionReviewEvent>;
export type AttachmentStatus = "FAILED" | "SUCCESS" | (string & {});
export const AttachmentStatus = S.String;

export interface AttachmentOutput {
  name?: string;
  status?: AttachmentStatus;
  error?: ErrorDetail;
  attachmentId?: string;
  conversationId?: string;
}
export const AttachmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    status: S.optional(AttachmentStatus),
    error: S.optional(ErrorDetail),
    attachmentId: S.optional(S.String),
    conversationId: S.optional(S.String),
  }),
).annotate({
  identifier: "AttachmentOutput",
}) as any as S.Schema<AttachmentOutput>;
export interface FailedAttachmentEvent {
  conversationId?: string;
  userMessageId?: string;
  systemMessageId?: string;
  attachment?: AttachmentOutput;
}
export const FailedAttachmentEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.optional(S.String),
    userMessageId: S.optional(S.String),
    systemMessageId: S.optional(S.String),
    attachment: S.optional(AttachmentOutput),
  }),
).annotate({
  identifier: "FailedAttachmentEvent",
}) as any as S.Schema<FailedAttachmentEvent>;
export type Url = string;
export interface AuthChallengeRequestEvent {
  authorizationUrl: string;
}
export const AuthChallengeRequestEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizationUrl: S.String }),
).annotate({
  identifier: "AuthChallengeRequestEvent",
}) as any as S.Schema<AuthChallengeRequestEvent>;
export type ChatOutputStream =
  | {
      textEvent: TextOutputEvent;
      metadataEvent?: never;
      actionReviewEvent?: never;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent: MetadataEvent;
      actionReviewEvent?: never;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent?: never;
      actionReviewEvent: ActionReviewEvent;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent?: never;
      actionReviewEvent?: never;
      failedAttachmentEvent: FailedAttachmentEvent;
      authChallengeRequestEvent?: never;
    }
  | {
      textEvent?: never;
      metadataEvent?: never;
      actionReviewEvent?: never;
      failedAttachmentEvent?: never;
      authChallengeRequestEvent: AuthChallengeRequestEvent;
    };
export const ChatOutputStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ textEvent: TextOutputEvent }),
    S.Struct({ metadataEvent: MetadataEvent }),
    S.Struct({ actionReviewEvent: ActionReviewEvent }),
    S.Struct({ failedAttachmentEvent: FailedAttachmentEvent }),
    S.Struct({ authChallengeRequestEvent: AuthChallengeRequestEvent }),
  ]),
) as any as S.Schema<stream.Stream<ChatOutputStream, Error, never>>;
export interface ChatOutput {
  outputStream?: stream.Stream<ChatOutputStream, Error, never>;
}
export const ChatOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputStream: S.optional(ChatOutputStream).pipe(T.HttpPayload()),
  }),
).annotate({ identifier: "ChatOutput" }) as any as S.Schema<ChatOutput>;
export type AttachmentsInput = AttachmentInput[];
export const AttachmentsInput = /*@__PURE__*/ S.Array(AttachmentInput);
export interface ActionExecution {
  pluginId: string;
  payload: { [key: string]: ActionExecutionPayloadField | undefined };
  payloadFieldNameSeparator: string;
}
export const ActionExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pluginId: S.String,
    payload: ActionExecutionPayload,
    payloadFieldNameSeparator: S.String,
  }),
).annotate({
  identifier: "ActionExecution",
}) as any as S.Schema<ActionExecution>;
export interface AuthChallengeResponse {
  responseMap: { [key: string]: string | undefined };
}
export const AuthChallengeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ responseMap: AuthorizationResponseMap }),
).annotate({
  identifier: "AuthChallengeResponse",
}) as any as S.Schema<AuthChallengeResponse>;
export interface ChatSyncInput {
  applicationId: string;
  userId?: string;
  userGroups?: string[];
  userMessage?: string;
  attachments?: AttachmentInput[];
  actionExecution?: ActionExecution;
  authChallengeResponse?: AuthChallengeResponse;
  conversationId?: string;
  parentMessageId?: string;
  attributeFilter?: AttributeFilter;
  chatMode?: ChatMode;
  chatModeConfiguration?: ChatModeConfiguration;
  clientToken?: string;
}
export const ChatSyncInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    userGroups: S.optional(UserGroups).pipe(T.HttpQuery("userGroups")),
    userMessage: S.optional(S.String),
    attachments: S.optional(AttachmentsInput),
    actionExecution: S.optional(ActionExecution),
    authChallengeResponse: S.optional(AuthChallengeResponse),
    conversationId: S.optional(S.String),
    parentMessageId: S.optional(S.String),
    attributeFilter: S.optional(AttributeFilter),
    chatMode: S.optional(ChatMode),
    chatModeConfiguration: S.optional(ChatModeConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/conversations?sync",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ChatSyncInput" }) as any as S.Schema<ChatSyncInput>;
export interface ActionReview {
  pluginId?: string;
  pluginType?: PluginType;
  payload?: { [key: string]: ActionReviewPayloadField | undefined };
  payloadFieldNameSeparator?: string;
}
export const ActionReview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pluginId: S.optional(S.String),
    pluginType: S.optional(PluginType),
    payload: S.optional(ActionReviewPayload),
    payloadFieldNameSeparator: S.optional(S.String),
  }),
).annotate({ identifier: "ActionReview" }) as any as S.Schema<ActionReview>;
export interface AuthChallengeRequest {
  authorizationUrl: string;
}
export const AuthChallengeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizationUrl: S.String }),
).annotate({
  identifier: "AuthChallengeRequest",
}) as any as S.Schema<AuthChallengeRequest>;
export type AttachmentsOutput = AttachmentOutput[];
export const AttachmentsOutput = /*@__PURE__*/ S.Array(AttachmentOutput);
export interface ChatSyncOutput {
  conversationId?: string;
  systemMessage?: string;
  systemMessageId?: string;
  userMessageId?: string;
  actionReview?: ActionReview;
  authChallengeRequest?: AuthChallengeRequest;
  sourceAttributions?: SourceAttribution[];
  failedAttachments?: AttachmentOutput[];
}
export const ChatSyncOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.optional(S.String),
    systemMessage: S.optional(S.String),
    systemMessageId: S.optional(S.String),
    userMessageId: S.optional(S.String),
    actionReview: S.optional(ActionReview),
    authChallengeRequest: S.optional(AuthChallengeRequest),
    sourceAttributions: S.optional(SourceAttributions),
    failedAttachments: S.optional(AttachmentsOutput),
  }),
).annotate({ identifier: "ChatSyncOutput" }) as any as S.Schema<ChatSyncOutput>;
export interface CheckDocumentAccessRequest {
  applicationId: string;
  indexId: string;
  userId: string;
  documentId: string;
  dataSourceId?: string;
}
export const CheckDocumentAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
    documentId: S.String.pipe(T.HttpLabel("documentId")),
    dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/index/{indexId}/users/{userId}/documents/{documentId}/check-document-access",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CheckDocumentAccessRequest",
}) as any as S.Schema<CheckDocumentAccessRequest>;
export interface AssociatedGroup {
  name?: string;
  type?: MembershipType;
}
export const AssociatedGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), type: S.optional(MembershipType) }),
).annotate({
  identifier: "AssociatedGroup",
}) as any as S.Schema<AssociatedGroup>;
export type AssociatedGroups = AssociatedGroup[];
export const AssociatedGroups = /*@__PURE__*/ S.Array(AssociatedGroup);
export interface AssociatedUser {
  id?: string;
  type?: MembershipType;
}
export const AssociatedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), type: S.optional(MembershipType) }),
).annotate({ identifier: "AssociatedUser" }) as any as S.Schema<AssociatedUser>;
export type AssociatedUsers = AssociatedUser[];
export const AssociatedUsers = /*@__PURE__*/ S.Array(AssociatedUser);
export interface DocumentAclUser {
  id?: string;
  type?: MembershipType;
}
export const DocumentAclUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), type: S.optional(MembershipType) }),
).annotate({
  identifier: "DocumentAclUser",
}) as any as S.Schema<DocumentAclUser>;
export type DocumentAclUsers = DocumentAclUser[];
export const DocumentAclUsers = /*@__PURE__*/ S.Array(DocumentAclUser);
export interface DocumentAclGroup {
  name?: string;
  type?: MembershipType;
}
export const DocumentAclGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), type: S.optional(MembershipType) }),
).annotate({
  identifier: "DocumentAclGroup",
}) as any as S.Schema<DocumentAclGroup>;
export type DocumentAclGroups = DocumentAclGroup[];
export const DocumentAclGroups = /*@__PURE__*/ S.Array(DocumentAclGroup);
export interface DocumentAclCondition {
  memberRelation?: MemberRelation;
  users?: DocumentAclUser[];
  groups?: DocumentAclGroup[];
}
export const DocumentAclCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memberRelation: S.optional(MemberRelation),
    users: S.optional(DocumentAclUsers),
    groups: S.optional(DocumentAclGroups),
  }),
).annotate({
  identifier: "DocumentAclCondition",
}) as any as S.Schema<DocumentAclCondition>;
export type DocumentAclConditions = DocumentAclCondition[];
export const DocumentAclConditions =
  /*@__PURE__*/ S.Array(DocumentAclCondition);
export interface DocumentAclMembership {
  memberRelation?: MemberRelation;
  conditions?: DocumentAclCondition[];
}
export const DocumentAclMembership = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memberRelation: S.optional(MemberRelation),
    conditions: S.optional(DocumentAclConditions),
  }),
).annotate({
  identifier: "DocumentAclMembership",
}) as any as S.Schema<DocumentAclMembership>;
export interface DocumentAcl {
  allowlist?: DocumentAclMembership;
  denyList?: DocumentAclMembership;
}
export const DocumentAcl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowlist: S.optional(DocumentAclMembership),
    denyList: S.optional(DocumentAclMembership),
  }),
).annotate({ identifier: "DocumentAcl" }) as any as S.Schema<DocumentAcl>;
export interface CheckDocumentAccessResponse {
  userGroups?: AssociatedGroup[];
  userAliases?: AssociatedUser[];
  hasAccess?: boolean;
  documentAcl?: DocumentAcl;
}
export const CheckDocumentAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userGroups: S.optional(AssociatedGroups),
    userAliases: S.optional(AssociatedUsers),
    hasAccess: S.optional(S.Boolean),
    documentAcl: S.optional(DocumentAcl),
  }),
).annotate({
  identifier: "CheckDocumentAccessResponse",
}) as any as S.Schema<CheckDocumentAccessResponse>;
export type WebExperienceId = string;
export type SessionDurationInMinutes = number;
export interface CreateAnonymousWebExperienceUrlRequest {
  applicationId: string;
  webExperienceId: string;
  sessionDurationInMinutes?: number;
}
export const CreateAnonymousWebExperienceUrlRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
      sessionDurationInMinutes: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/applications/{applicationId}/experiences/{webExperienceId}/anonymous-url",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateAnonymousWebExperienceUrlRequest",
}) as any as S.Schema<CreateAnonymousWebExperienceUrlRequest>;
export interface CreateAnonymousWebExperienceUrlResponse {
  anonymousUrl?: string;
}
export const CreateAnonymousWebExperienceUrlResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ anonymousUrl: S.optional(S.String) }),
).annotate({
  identifier: "CreateAnonymousWebExperienceUrlResponse",
}) as any as S.Schema<CreateAnonymousWebExperienceUrlResponse>;
export type ApplicationName = string;
export type IdentityType =
  | "AWS_IAM_IDP_SAML"
  | "AWS_IAM_IDP_OIDC"
  | "AWS_IAM_IDC"
  | "AWS_QUICKSIGHT_IDP"
  | "ANONYMOUS"
  | (string & {});
export const IdentityType = S.String;

export type IAMIdentityProviderArn = string;
export type InstanceArn = string;
export type ClientIdForOIDC = string;
export type ClientIdsForOIDC = string[];
export const ClientIdsForOIDC = /*@__PURE__*/ S.Array(S.String);
export type Description = string;
export type KmsKeyId = string | redacted.Redacted<string>;
export interface EncryptionConfiguration {
  kmsKeyId?: string | redacted.Redacted<string>;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ kmsKeyId: S.optional(SensitiveString) }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export type AttachmentsControlMode = "ENABLED" | "DISABLED" | (string & {});
export const AttachmentsControlMode = S.String;

export interface AttachmentsConfiguration {
  attachmentsControlMode: AttachmentsControlMode;
}
export const AttachmentsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachmentsControlMode: AttachmentsControlMode }),
).annotate({
  identifier: "AttachmentsConfiguration",
}) as any as S.Schema<AttachmentsConfiguration>;
export type QAppsControlMode = "ENABLED" | "DISABLED" | (string & {});
export const QAppsControlMode = S.String;

export interface QAppsConfiguration {
  qAppsControlMode: QAppsControlMode;
}
export const QAppsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ qAppsControlMode: QAppsControlMode }),
).annotate({
  identifier: "QAppsConfiguration",
}) as any as S.Schema<QAppsConfiguration>;
export type PersonalizationControlMode = "ENABLED" | "DISABLED" | (string & {});
export const PersonalizationControlMode = S.String;

export interface PersonalizationConfiguration {
  personalizationControlMode: PersonalizationControlMode;
}
export const PersonalizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ personalizationControlMode: PersonalizationControlMode }),
).annotate({
  identifier: "PersonalizationConfiguration",
}) as any as S.Schema<PersonalizationConfiguration>;
export type ClientNamespace = string;
export interface QuickSightConfiguration {
  clientNamespace: string;
}
export const QuickSightConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientNamespace: S.String }),
).annotate({
  identifier: "QuickSightConfiguration",
}) as any as S.Schema<QuickSightConfiguration>;
export interface CreateApplicationRequest {
  displayName: string;
  roleArn?: string;
  identityType?: IdentityType;
  iamIdentityProviderArn?: string;
  identityCenterInstanceArn?: string;
  clientIdsForOIDC?: string[];
  description?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: Tag[];
  clientToken?: string;
  attachmentsConfiguration?: AttachmentsConfiguration;
  qAppsConfiguration?: QAppsConfiguration;
  personalizationConfiguration?: PersonalizationConfiguration;
  quickSightConfiguration?: QuickSightConfiguration;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.String,
    roleArn: S.optional(S.String),
    identityType: S.optional(IdentityType),
    iamIdentityProviderArn: S.optional(S.String),
    identityCenterInstanceArn: S.optional(S.String),
    clientIdsForOIDC: S.optional(ClientIdsForOIDC),
    description: S.optional(S.String),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    tags: S.optional(Tags),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    attachmentsConfiguration: S.optional(AttachmentsConfiguration),
    qAppsConfiguration: S.optional(QAppsConfiguration),
    personalizationConfiguration: S.optional(PersonalizationConfiguration),
    quickSightConfiguration: S.optional(QuickSightConfiguration),
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
export type ApplicationArn = string;
export interface CreateApplicationResponse {
  applicationId?: string;
  applicationArn?: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    applicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type DisplayName = string;
export type ResponseConfigurationType = "ALL" | (string & {});
export const ResponseConfigurationType = S.String;

export type Instruction = string;
export interface InstructionCollection {
  responseLength?: string;
  targetAudience?: string;
  perspective?: string;
  outputStyle?: string;
  identity?: string;
  tone?: string;
  customInstructions?: string;
  examples?: string;
}
export const InstructionCollection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responseLength: S.optional(S.String),
    targetAudience: S.optional(S.String),
    perspective: S.optional(S.String),
    outputStyle: S.optional(S.String),
    identity: S.optional(S.String),
    tone: S.optional(S.String),
    customInstructions: S.optional(S.String),
    examples: S.optional(S.String),
  }),
).annotate({
  identifier: "InstructionCollection",
}) as any as S.Schema<InstructionCollection>;
export interface ResponseConfiguration {
  instructionCollection?: InstructionCollection;
}
export const ResponseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instructionCollection: S.optional(InstructionCollection) }),
).annotate({
  identifier: "ResponseConfiguration",
}) as any as S.Schema<ResponseConfiguration>;
export type ResponseConfigurations = {
  [key in ResponseConfigurationType]?: ResponseConfiguration;
};
export const ResponseConfigurations = /*@__PURE__*/ S.Record(
  ResponseConfigurationType,
  ResponseConfiguration.pipe(S.optional),
);
export interface CreateChatResponseConfigurationRequest {
  applicationId: string;
  displayName: string;
  clientToken?: string;
  responseConfigurations: { [key: string]: ResponseConfiguration | undefined };
  tags?: Tag[];
}
export const CreateChatResponseConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      displayName: S.String,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      responseConfigurations: ResponseConfigurations,
      tags: S.optional(Tags),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/applications/{applicationId}/chatresponseconfigurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateChatResponseConfigurationRequest",
}) as any as S.Schema<CreateChatResponseConfigurationRequest>;
export type ChatResponseConfigurationId = string;
export type ChatResponseConfigurationArn = string;
export interface CreateChatResponseConfigurationResponse {
  chatResponseConfigurationId: string;
  chatResponseConfigurationArn: string;
}
export const CreateChatResponseConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      chatResponseConfigurationId: S.String,
      chatResponseConfigurationArn: S.String,
    }),
).annotate({
  identifier: "CreateChatResponseConfigurationResponse",
}) as any as S.Schema<CreateChatResponseConfigurationResponse>;
export interface ActionFilterConfiguration {
  documentAttributeFilter: AttributeFilter;
}
export const ActionFilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ documentAttributeFilter: AttributeFilter }),
).annotate({
  identifier: "ActionFilterConfiguration",
}) as any as S.Schema<ActionFilterConfiguration>;
export interface ActionConfiguration {
  action: string;
  filterConfiguration?: ActionFilterConfiguration;
}
export const ActionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.String,
    filterConfiguration: S.optional(ActionFilterConfiguration),
  }),
).annotate({
  identifier: "ActionConfiguration",
}) as any as S.Schema<ActionConfiguration>;
export type ActionConfigurationList = ActionConfiguration[];
export const ActionConfigurationList =
  /*@__PURE__*/ S.Array(ActionConfiguration);
export type DataAccessorName = string | redacted.Redacted<string>;
export type DataAccessorAuthenticationType =
  | "AWS_IAM_IDC_TTI"
  | "AWS_IAM_IDC_AUTH_CODE"
  | (string & {});
export const DataAccessorAuthenticationType = S.String;

export type IdcTrustedTokenIssuerArn = string;
export interface DataAccessorIdcTrustedTokenIssuerConfiguration {
  idcTrustedTokenIssuerArn: string;
}
export const DataAccessorIdcTrustedTokenIssuerConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ idcTrustedTokenIssuerArn: S.String }),
  ).annotate({
    identifier: "DataAccessorIdcTrustedTokenIssuerConfiguration",
  }) as any as S.Schema<DataAccessorIdcTrustedTokenIssuerConfiguration>;
export type DataAccessorAuthenticationConfiguration = {
  idcTrustedTokenIssuerConfiguration: DataAccessorIdcTrustedTokenIssuerConfiguration;
};
export const DataAccessorAuthenticationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    idcTrustedTokenIssuerConfiguration:
      DataAccessorIdcTrustedTokenIssuerConfiguration,
  }),
]);
export type DataAccessorExternalId = string;
export type DataAccessorExternalIds = string[];
export const DataAccessorExternalIds = /*@__PURE__*/ S.Array(S.String);
export interface DataAccessorAuthenticationDetail {
  authenticationType: DataAccessorAuthenticationType;
  authenticationConfiguration?: DataAccessorAuthenticationConfiguration;
  externalIds?: string[];
}
export const DataAccessorAuthenticationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authenticationType: DataAccessorAuthenticationType,
    authenticationConfiguration: S.optional(
      DataAccessorAuthenticationConfiguration,
    ),
    externalIds: S.optional(DataAccessorExternalIds),
  }),
).annotate({
  identifier: "DataAccessorAuthenticationDetail",
}) as any as S.Schema<DataAccessorAuthenticationDetail>;
export interface CreateDataAccessorRequest {
  applicationId: string;
  principal: string;
  actionConfigurations: ActionConfiguration[];
  clientToken?: string;
  displayName: string | redacted.Redacted<string>;
  authenticationDetail?: DataAccessorAuthenticationDetail;
  tags?: Tag[];
}
export const CreateDataAccessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    principal: S.String,
    actionConfigurations: ActionConfigurationList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    displayName: SensitiveString,
    authenticationDetail: S.optional(DataAccessorAuthenticationDetail),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/dataaccessors",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataAccessorRequest",
}) as any as S.Schema<CreateDataAccessorRequest>;
export type DataAccessorId = string;
export type IdcApplicationArn = string;
export type DataAccessorArn = string;
export interface CreateDataAccessorResponse {
  dataAccessorId: string;
  idcApplicationArn: string;
  dataAccessorArn: string;
}
export const CreateDataAccessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataAccessorId: S.String,
    idcApplicationArn: S.String,
    dataAccessorArn: S.String,
  }),
).annotate({
  identifier: "CreateDataAccessorResponse",
}) as any as S.Schema<CreateDataAccessorResponse>;
export type DataSourceName = string;
export type DataSourceConfiguration = unknown;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface DataSourceVpcConfiguration {
  subnetIds: string[];
  securityGroupIds: string[];
}
export const DataSourceVpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subnetIds: SubnetIds, securityGroupIds: SecurityGroupIds }),
).annotate({
  identifier: "DataSourceVpcConfiguration",
}) as any as S.Schema<DataSourceVpcConfiguration>;
export type SyncSchedule = string;
export interface CreateDataSourceRequest {
  applicationId: string;
  indexId: string;
  displayName: string;
  configuration: any;
  vpcConfiguration?: DataSourceVpcConfiguration;
  description?: string;
  tags?: Tag[];
  syncSchedule?: string;
  roleArn?: string;
  clientToken?: string;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export const CreateDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    displayName: S.String,
    configuration: S.Any,
    vpcConfiguration: S.optional(DataSourceVpcConfiguration),
    description: S.optional(S.String),
    tags: S.optional(Tags),
    syncSchedule: S.optional(S.String),
    roleArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    documentEnrichmentConfiguration: S.optional(
      DocumentEnrichmentConfiguration,
    ),
    mediaExtractionConfiguration: S.optional(MediaExtractionConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataSourceRequest",
}) as any as S.Schema<CreateDataSourceRequest>;
export type DataSourceArn = string;
export interface CreateDataSourceResponse {
  dataSourceId?: string;
  dataSourceArn?: string;
}
export const CreateDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceId: S.optional(S.String),
    dataSourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateDataSourceResponse",
}) as any as S.Schema<CreateDataSourceResponse>;
export type IndexName = string;
export type IndexType = "ENTERPRISE" | "STARTER" | (string & {});
export const IndexType = S.String;

export type IndexCapacityInteger = number;
export interface IndexCapacityConfiguration {
  units?: number;
}
export const IndexCapacityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ units: S.optional(S.Number) }),
).annotate({
  identifier: "IndexCapacityConfiguration",
}) as any as S.Schema<IndexCapacityConfiguration>;
export interface CreateIndexRequest {
  applicationId: string;
  displayName: string;
  description?: string;
  type?: IndexType;
  tags?: Tag[];
  capacityConfiguration?: IndexCapacityConfiguration;
  clientToken?: string;
}
export const CreateIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    displayName: S.String,
    description: S.optional(S.String),
    type: S.optional(IndexType),
    tags: S.optional(Tags),
    capacityConfiguration: S.optional(IndexCapacityConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/indices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIndexRequest",
}) as any as S.Schema<CreateIndexRequest>;
export type IndexArn = string;
export interface CreateIndexResponse {
  indexId?: string;
  indexArn?: string;
}
export const CreateIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ indexId: S.optional(S.String), indexArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateIndexResponse",
}) as any as S.Schema<CreateIndexResponse>;
export type PluginName = string;
export type SecretArn = string;
export interface BasicAuthConfiguration {
  secretArn: string;
  roleArn: string;
}
export const BasicAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretArn: S.String, roleArn: S.String }),
).annotate({
  identifier: "BasicAuthConfiguration",
}) as any as S.Schema<BasicAuthConfiguration>;
export interface OAuth2ClientCredentialConfiguration {
  secretArn: string;
  roleArn: string;
  authorizationUrl?: string;
  tokenUrl?: string;
}
export const OAuth2ClientCredentialConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    secretArn: S.String,
    roleArn: S.String,
    authorizationUrl: S.optional(S.String),
    tokenUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "OAuth2ClientCredentialConfiguration",
}) as any as S.Schema<OAuth2ClientCredentialConfiguration>;
export interface NoAuthConfiguration {}
export const NoAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "NoAuthConfiguration",
}) as any as S.Schema<NoAuthConfiguration>;
export interface IdcAuthConfiguration {
  idcApplicationArn: string;
  roleArn: string;
}
export const IdcAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ idcApplicationArn: S.String, roleArn: S.String }),
).annotate({
  identifier: "IdcAuthConfiguration",
}) as any as S.Schema<IdcAuthConfiguration>;
export type PluginAuthConfiguration =
  | {
      basicAuthConfiguration: BasicAuthConfiguration;
      oAuth2ClientCredentialConfiguration?: never;
      noAuthConfiguration?: never;
      idcAuthConfiguration?: never;
    }
  | {
      basicAuthConfiguration?: never;
      oAuth2ClientCredentialConfiguration: OAuth2ClientCredentialConfiguration;
      noAuthConfiguration?: never;
      idcAuthConfiguration?: never;
    }
  | {
      basicAuthConfiguration?: never;
      oAuth2ClientCredentialConfiguration?: never;
      noAuthConfiguration: NoAuthConfiguration;
      idcAuthConfiguration?: never;
    }
  | {
      basicAuthConfiguration?: never;
      oAuth2ClientCredentialConfiguration?: never;
      noAuthConfiguration?: never;
      idcAuthConfiguration: IdcAuthConfiguration;
    };
export const PluginAuthConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ basicAuthConfiguration: BasicAuthConfiguration }),
  S.Struct({
    oAuth2ClientCredentialConfiguration: OAuth2ClientCredentialConfiguration,
  }),
  S.Struct({ noAuthConfiguration: NoAuthConfiguration }),
  S.Struct({ idcAuthConfiguration: IdcAuthConfiguration }),
]);
export type PluginDescription = string;
export type APISchemaType = "OPEN_API_V3" | (string & {});
export const APISchemaType = S.String;

export type Payload = string | redacted.Redacted<string>;
export type APISchema =
  | { payload: string | redacted.Redacted<string>; s3?: never }
  | { payload?: never; s3: S3 };
export const APISchema = /*@__PURE__*/ S.Union([
  S.Struct({ payload: SensitiveString }),
  S.Struct({ s3: S3 }),
]);
export interface CustomPluginConfiguration {
  description: string;
  apiSchemaType: APISchemaType;
  apiSchema?: APISchema;
}
export const CustomPluginConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.String,
    apiSchemaType: APISchemaType,
    apiSchema: S.optional(APISchema),
  }),
).annotate({
  identifier: "CustomPluginConfiguration",
}) as any as S.Schema<CustomPluginConfiguration>;
export interface CreatePluginRequest {
  applicationId: string;
  displayName: string;
  type: PluginType;
  authConfiguration: PluginAuthConfiguration;
  serverUrl?: string;
  customPluginConfiguration?: CustomPluginConfiguration;
  tags?: Tag[];
  clientToken?: string;
}
export const CreatePluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    displayName: S.String,
    type: PluginType,
    authConfiguration: PluginAuthConfiguration,
    serverUrl: S.optional(S.String),
    customPluginConfiguration: S.optional(CustomPluginConfiguration),
    tags: S.optional(Tags),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/plugins" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePluginRequest",
}) as any as S.Schema<CreatePluginRequest>;
export type PluginArn = string;
export type PluginBuildStatus =
  | "READY"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export const PluginBuildStatus = S.String;

export interface CreatePluginResponse {
  pluginId?: string;
  pluginArn?: string;
  buildStatus?: PluginBuildStatus;
}
export const CreatePluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pluginId: S.optional(S.String),
    pluginArn: S.optional(S.String),
    buildStatus: S.optional(PluginBuildStatus),
  }),
).annotate({
  identifier: "CreatePluginResponse",
}) as any as S.Schema<CreatePluginResponse>;
export type RetrieverType = "NATIVE_INDEX" | "KENDRA_INDEX" | (string & {});
export const RetrieverType = S.String;

export type RetrieverName = string;
export type DocumentAttributeBoostingLevel =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH"
  | "ONE"
  | "TWO"
  | (string & {});
export const DocumentAttributeBoostingLevel = S.String;

export type NumberAttributeBoostingType =
  | "PRIORITIZE_LARGER_VALUES"
  | "PRIORITIZE_SMALLER_VALUES"
  | (string & {});
export const NumberAttributeBoostingType = S.String;

export interface NumberAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
  boostingType?: NumberAttributeBoostingType;
}
export const NumberAttributeBoostingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      boostingLevel: DocumentAttributeBoostingLevel,
      boostingType: S.optional(NumberAttributeBoostingType),
    }),
).annotate({
  identifier: "NumberAttributeBoostingConfiguration",
}) as any as S.Schema<NumberAttributeBoostingConfiguration>;
export type StringAttributeValueBoostingLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "VERY_HIGH"
  | "ONE"
  | "TWO"
  | "THREE"
  | "FOUR"
  | "FIVE"
  | (string & {});
export const StringAttributeValueBoostingLevel = S.String;

export type StringAttributeValueBoosting = {
  [key: string]: StringAttributeValueBoostingLevel | undefined;
};
export const StringAttributeValueBoosting = /*@__PURE__*/ S.Record(
  S.String,
  StringAttributeValueBoostingLevel.pipe(S.optional),
);
export interface StringAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
  attributeValueBoosting?: {
    [key: string]: StringAttributeValueBoostingLevel | undefined;
  };
}
export const StringAttributeBoostingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      boostingLevel: DocumentAttributeBoostingLevel,
      attributeValueBoosting: S.optional(StringAttributeValueBoosting),
    }),
).annotate({
  identifier: "StringAttributeBoostingConfiguration",
}) as any as S.Schema<StringAttributeBoostingConfiguration>;
export type BoostingDurationInSeconds = number;
export interface DateAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
  boostingDurationInSeconds?: number;
}
export const DateAttributeBoostingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    boostingLevel: DocumentAttributeBoostingLevel,
    boostingDurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "DateAttributeBoostingConfiguration",
}) as any as S.Schema<DateAttributeBoostingConfiguration>;
export interface StringListAttributeBoostingConfiguration {
  boostingLevel: DocumentAttributeBoostingLevel;
}
export const StringListAttributeBoostingConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ boostingLevel: DocumentAttributeBoostingLevel }),
).annotate({
  identifier: "StringListAttributeBoostingConfiguration",
}) as any as S.Schema<StringListAttributeBoostingConfiguration>;
export type DocumentAttributeBoostingConfiguration =
  | {
      numberConfiguration: NumberAttributeBoostingConfiguration;
      stringConfiguration?: never;
      dateConfiguration?: never;
      stringListConfiguration?: never;
    }
  | {
      numberConfiguration?: never;
      stringConfiguration: StringAttributeBoostingConfiguration;
      dateConfiguration?: never;
      stringListConfiguration?: never;
    }
  | {
      numberConfiguration?: never;
      stringConfiguration?: never;
      dateConfiguration: DateAttributeBoostingConfiguration;
      stringListConfiguration?: never;
    }
  | {
      numberConfiguration?: never;
      stringConfiguration?: never;
      dateConfiguration?: never;
      stringListConfiguration: StringListAttributeBoostingConfiguration;
    };
export const DocumentAttributeBoostingConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ numberConfiguration: NumberAttributeBoostingConfiguration }),
  S.Struct({ stringConfiguration: StringAttributeBoostingConfiguration }),
  S.Struct({ dateConfiguration: DateAttributeBoostingConfiguration }),
  S.Struct({
    stringListConfiguration: StringListAttributeBoostingConfiguration,
  }),
]);
export type DocumentAttributeBoostingOverrideMap = {
  [key: string]: DocumentAttributeBoostingConfiguration | undefined;
};
export const DocumentAttributeBoostingOverrideMap = /*@__PURE__*/ S.Record(
  S.String,
  DocumentAttributeBoostingConfiguration.pipe(S.optional),
);
export interface NativeIndexConfiguration {
  indexId: string;
  version?: number;
  boostingOverride?: {
    [key: string]: DocumentAttributeBoostingConfiguration | undefined;
  };
}
export const NativeIndexConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexId: S.String,
    version: S.optional(S.Number),
    boostingOverride: S.optional(DocumentAttributeBoostingOverrideMap),
  }),
).annotate({
  identifier: "NativeIndexConfiguration",
}) as any as S.Schema<NativeIndexConfiguration>;
export type KendraIndexId = string;
export interface KendraIndexConfiguration {
  indexId: string;
}
export const KendraIndexConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ indexId: S.String }),
).annotate({
  identifier: "KendraIndexConfiguration",
}) as any as S.Schema<KendraIndexConfiguration>;
export type RetrieverConfiguration =
  | {
      nativeIndexConfiguration: NativeIndexConfiguration;
      kendraIndexConfiguration?: never;
    }
  | {
      nativeIndexConfiguration?: never;
      kendraIndexConfiguration: KendraIndexConfiguration;
    };
export const RetrieverConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ nativeIndexConfiguration: NativeIndexConfiguration }),
  S.Struct({ kendraIndexConfiguration: KendraIndexConfiguration }),
]);
export interface CreateRetrieverRequest {
  applicationId: string;
  type: RetrieverType;
  displayName: string;
  configuration: RetrieverConfiguration;
  roleArn?: string;
  clientToken?: string;
  tags?: Tag[];
}
export const CreateRetrieverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    type: RetrieverType,
    displayName: S.String,
    configuration: RetrieverConfiguration,
    roleArn: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/retrievers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRetrieverRequest",
}) as any as S.Schema<CreateRetrieverRequest>;
export type RetrieverId = string;
export type RetrieverArn = string;
export interface CreateRetrieverResponse {
  retrieverId?: string;
  retrieverArn?: string;
}
export const CreateRetrieverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrieverId: S.optional(S.String),
    retrieverArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateRetrieverResponse",
}) as any as S.Schema<CreateRetrieverResponse>;
export type UserIdentifier = string;
export type GroupIdentifier = string;
export type SubscriptionPrincipal =
  | { user: string; group?: never }
  | { user?: never; group: string };
export const SubscriptionPrincipal = /*@__PURE__*/ S.Union([
  S.Struct({ user: S.String }),
  S.Struct({ group: S.String }),
]);
export interface CreateSubscriptionRequest {
  applicationId: string;
  principal: SubscriptionPrincipal;
  type: SubscriptionType;
  clientToken?: string;
}
export const CreateSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    principal: SubscriptionPrincipal,
    type: SubscriptionType,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/subscriptions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionRequest",
}) as any as S.Schema<CreateSubscriptionRequest>;
export interface CreateSubscriptionResponse {
  subscriptionId?: string;
  subscriptionArn?: string;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export const CreateSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptionId: S.optional(S.String),
    subscriptionArn: S.optional(S.String),
    currentSubscription: S.optional(SubscriptionDetails),
    nextSubscription: S.optional(SubscriptionDetails),
  }),
).annotate({
  identifier: "CreateSubscriptionResponse",
}) as any as S.Schema<CreateSubscriptionResponse>;
export interface UserAlias {
  indexId?: string;
  dataSourceId?: string;
  userId: string;
}
export const UserAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexId: S.optional(S.String),
    dataSourceId: S.optional(S.String),
    userId: S.String,
  }),
).annotate({ identifier: "UserAlias" }) as any as S.Schema<UserAlias>;
export type UserAliases = UserAlias[];
export const UserAliases = /*@__PURE__*/ S.Array(UserAlias);
export interface CreateUserRequest {
  applicationId: string;
  userId: string;
  userAliases?: UserAlias[];
  clientToken?: string;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.String,
    userAliases: S.optional(UserAliases),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications/{applicationId}/users" }),
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
export interface CreateUserResponse {}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export type WebExperienceTitle = string;
export type WebExperienceSubtitle = string;
export type WebExperienceWelcomeMessage = string;
export type WebExperienceSamplePromptsControlMode =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const WebExperienceSamplePromptsControlMode = S.String;

export type Origin = string;
export type WebExperienceOrigins = string[];
export const WebExperienceOrigins = /*@__PURE__*/ S.Array(S.String);
export type SamlAuthenticationUrl = string;
export interface SamlProviderConfiguration {
  authenticationUrl: string;
}
export const SamlProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authenticationUrl: S.String }),
).annotate({
  identifier: "SamlProviderConfiguration",
}) as any as S.Schema<SamlProviderConfiguration>;
export interface OpenIDConnectProviderConfiguration {
  secretsArn: string;
  secretsRole: string;
}
export const OpenIDConnectProviderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ secretsArn: S.String, secretsRole: S.String }),
).annotate({
  identifier: "OpenIDConnectProviderConfiguration",
}) as any as S.Schema<OpenIDConnectProviderConfiguration>;
export type IdentityProviderConfiguration =
  | {
      samlConfiguration: SamlProviderConfiguration;
      openIDConnectConfiguration?: never;
    }
  | {
      samlConfiguration?: never;
      openIDConnectConfiguration: OpenIDConnectProviderConfiguration;
    };
export const IdentityProviderConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ samlConfiguration: SamlProviderConfiguration }),
  S.Struct({ openIDConnectConfiguration: OpenIDConnectProviderConfiguration }),
]);
export type BrowserExtension = string;
export type BrowserExtensionList = string[];
export const BrowserExtensionList = /*@__PURE__*/ S.Array(S.String);
export interface BrowserExtensionConfiguration {
  enabledBrowserExtensions: string[];
}
export const BrowserExtensionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledBrowserExtensions: BrowserExtensionList }),
).annotate({
  identifier: "BrowserExtensionConfiguration",
}) as any as S.Schema<BrowserExtensionConfiguration>;
export type CustomCSSUrl = string;
export type LogoUrl = string;
export type FontUrl = string;
export type FaviconUrl = string;
export interface CustomizationConfiguration {
  customCSSUrl?: string;
  logoUrl?: string;
  fontUrl?: string;
  faviconUrl?: string;
}
export const CustomizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customCSSUrl: S.optional(S.String),
    logoUrl: S.optional(S.String),
    fontUrl: S.optional(S.String),
    faviconUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomizationConfiguration",
}) as any as S.Schema<CustomizationConfiguration>;
export interface CreateWebExperienceRequest {
  applicationId: string;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  samplePromptsControlMode?: WebExperienceSamplePromptsControlMode;
  origins?: string[];
  roleArn?: string;
  tags?: Tag[];
  clientToken?: string;
  identityProviderConfiguration?: IdentityProviderConfiguration;
  browserExtensionConfiguration?: BrowserExtensionConfiguration;
  customizationConfiguration?: CustomizationConfiguration;
}
export const CreateWebExperienceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    title: S.optional(S.String),
    subtitle: S.optional(S.String),
    welcomeMessage: S.optional(S.String),
    samplePromptsControlMode: S.optional(WebExperienceSamplePromptsControlMode),
    origins: S.optional(WebExperienceOrigins),
    roleArn: S.optional(S.String),
    tags: S.optional(Tags),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    identityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    browserExtensionConfiguration: S.optional(BrowserExtensionConfiguration),
    customizationConfiguration: S.optional(CustomizationConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/experiences",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWebExperienceRequest",
}) as any as S.Schema<CreateWebExperienceRequest>;
export type WebExperienceArn = string;
export interface CreateWebExperienceResponse {
  webExperienceId?: string;
  webExperienceArn?: string;
}
export const CreateWebExperienceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webExperienceId: S.optional(S.String),
    webExperienceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWebExperienceResponse",
}) as any as S.Schema<CreateWebExperienceResponse>;
export interface DeleteApplicationRequest {
  applicationId: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{applicationId}" }),
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
export interface DeleteAttachmentRequest {
  applicationId: string;
  conversationId: string;
  attachmentId: string;
  userId?: string;
}
export const DeleteAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    conversationId: S.String.pipe(T.HttpLabel("conversationId")),
    attachmentId: S.String.pipe(T.HttpLabel("attachmentId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/conversations/{conversationId}/attachments/{attachmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttachmentRequest",
}) as any as S.Schema<DeleteAttachmentRequest>;
export interface DeleteAttachmentResponse {}
export const DeleteAttachmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAttachmentResponse",
}) as any as S.Schema<DeleteAttachmentResponse>;
export interface DeleteChatControlsConfigurationRequest {
  applicationId: string;
}
export const DeleteChatControlsConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/applications/{applicationId}/chatcontrols",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteChatControlsConfigurationRequest",
}) as any as S.Schema<DeleteChatControlsConfigurationRequest>;
export interface DeleteChatControlsConfigurationResponse {}
export const DeleteChatControlsConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteChatControlsConfigurationResponse",
}) as any as S.Schema<DeleteChatControlsConfigurationResponse>;
export interface DeleteChatResponseConfigurationRequest {
  applicationId: string;
  chatResponseConfigurationId: string;
}
export const DeleteChatResponseConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      chatResponseConfigurationId: S.String.pipe(
        T.HttpLabel("chatResponseConfigurationId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteChatResponseConfigurationRequest",
}) as any as S.Schema<DeleteChatResponseConfigurationRequest>;
export interface DeleteChatResponseConfigurationResponse {}
export const DeleteChatResponseConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteChatResponseConfigurationResponse",
}) as any as S.Schema<DeleteChatResponseConfigurationResponse>;
export interface DeleteConversationRequest {
  conversationId: string;
  applicationId: string;
  userId?: string;
}
export const DeleteConversationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.String.pipe(T.HttpLabel("conversationId")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/conversations/{conversationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConversationRequest",
}) as any as S.Schema<DeleteConversationRequest>;
export interface DeleteConversationResponse {}
export const DeleteConversationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConversationResponse",
}) as any as S.Schema<DeleteConversationResponse>;
export interface DeleteDataAccessorRequest {
  applicationId: string;
  dataAccessorId: string;
}
export const DeleteDataAccessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    dataAccessorId: S.String.pipe(T.HttpLabel("dataAccessorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/dataaccessors/{dataAccessorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataAccessorRequest",
}) as any as S.Schema<DeleteDataAccessorRequest>;
export interface DeleteDataAccessorResponse {}
export const DeleteDataAccessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataAccessorResponse",
}) as any as S.Schema<DeleteDataAccessorResponse>;
export interface DeleteDataSourceRequest {
  applicationId: string;
  indexId: string;
  dataSourceId: string;
}
export const DeleteDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataSourceRequest",
}) as any as S.Schema<DeleteDataSourceRequest>;
export interface DeleteDataSourceResponse {}
export const DeleteDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataSourceResponse",
}) as any as S.Schema<DeleteDataSourceResponse>;
export interface DeleteGroupRequest {
  applicationId: string;
  indexId: string;
  groupName: string;
  dataSourceId?: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    groupName: S.String.pipe(T.HttpLabel("groupName")),
    dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/indices/{indexId}/groups/{groupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResponse {}
export const DeleteGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupResponse",
}) as any as S.Schema<DeleteGroupResponse>;
export interface DeleteIndexRequest {
  applicationId: string;
  indexId: string;
}
export const DeleteIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/indices/{indexId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIndexRequest",
}) as any as S.Schema<DeleteIndexRequest>;
export interface DeleteIndexResponse {}
export const DeleteIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIndexResponse",
}) as any as S.Schema<DeleteIndexResponse>;
export interface DeletePluginRequest {
  applicationId: string;
  pluginId: string;
}
export const DeletePluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    pluginId: S.String.pipe(T.HttpLabel("pluginId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/plugins/{pluginId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePluginRequest",
}) as any as S.Schema<DeletePluginRequest>;
export interface DeletePluginResponse {}
export const DeletePluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePluginResponse",
}) as any as S.Schema<DeletePluginResponse>;
export interface DeleteRetrieverRequest {
  applicationId: string;
  retrieverId: string;
}
export const DeleteRetrieverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    retrieverId: S.String.pipe(T.HttpLabel("retrieverId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/retrievers/{retrieverId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRetrieverRequest",
}) as any as S.Schema<DeleteRetrieverRequest>;
export interface DeleteRetrieverResponse {}
export const DeleteRetrieverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRetrieverResponse",
}) as any as S.Schema<DeleteRetrieverResponse>;
export interface DeleteUserRequest {
  applicationId: string;
  userId: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/users/{userId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {}
export const DeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface DeleteWebExperienceRequest {
  applicationId: string;
  webExperienceId: string;
}
export const DeleteWebExperienceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/experiences/{webExperienceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWebExperienceRequest",
}) as any as S.Schema<DeleteWebExperienceRequest>;
export interface DeleteWebExperienceResponse {}
export const DeleteWebExperienceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWebExperienceResponse",
}) as any as S.Schema<DeleteWebExperienceResponse>;
export interface DisassociatePermissionRequest {
  applicationId: string;
  statementId: string;
}
export const DisassociatePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    statementId: S.String.pipe(T.HttpLabel("statementId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{applicationId}/policy/{statementId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociatePermissionRequest",
}) as any as S.Schema<DisassociatePermissionRequest>;
export interface DisassociatePermissionResponse {}
export const DisassociatePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociatePermissionResponse",
}) as any as S.Schema<DisassociatePermissionResponse>;
export interface GetApplicationRequest {
  applicationId: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}" }),
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
export type ApplicationStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export const ApplicationStatus = S.String;

export interface AppliedAttachmentsConfiguration {
  attachmentsControlMode?: AttachmentsControlMode;
}
export const AppliedAttachmentsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachmentsControlMode: S.optional(AttachmentsControlMode) }),
).annotate({
  identifier: "AppliedAttachmentsConfiguration",
}) as any as S.Schema<AppliedAttachmentsConfiguration>;
export type AutoSubscriptionStatus = "ENABLED" | "DISABLED" | (string & {});
export const AutoSubscriptionStatus = S.String;

export interface AutoSubscriptionConfiguration {
  autoSubscribe?: AutoSubscriptionStatus;
  defaultSubscriptionType?: SubscriptionType;
}
export const AutoSubscriptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoSubscribe: S.optional(AutoSubscriptionStatus),
    defaultSubscriptionType: S.optional(SubscriptionType),
  }),
).annotate({
  identifier: "AutoSubscriptionConfiguration",
}) as any as S.Schema<AutoSubscriptionConfiguration>;
export interface GetApplicationResponse {
  displayName?: string;
  applicationId?: string;
  applicationArn?: string;
  identityType?: IdentityType;
  iamIdentityProviderArn?: string;
  identityCenterApplicationArn?: string;
  roleArn?: string;
  status?: ApplicationStatus;
  description?: string;
  encryptionConfiguration?: EncryptionConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
  error?: ErrorDetail;
  attachmentsConfiguration?: AppliedAttachmentsConfiguration;
  qAppsConfiguration?: QAppsConfiguration;
  personalizationConfiguration?: PersonalizationConfiguration;
  autoSubscriptionConfiguration?: AutoSubscriptionConfiguration;
  clientIdsForOIDC?: string[];
  quickSightConfiguration?: QuickSightConfiguration;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    applicationId: S.optional(S.String),
    applicationArn: S.optional(S.String),
    identityType: S.optional(IdentityType),
    iamIdentityProviderArn: S.optional(S.String),
    identityCenterApplicationArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    status: S.optional(ApplicationStatus),
    description: S.optional(S.String),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    error: S.optional(ErrorDetail),
    attachmentsConfiguration: S.optional(AppliedAttachmentsConfiguration),
    qAppsConfiguration: S.optional(QAppsConfiguration),
    personalizationConfiguration: S.optional(PersonalizationConfiguration),
    autoSubscriptionConfiguration: S.optional(AutoSubscriptionConfiguration),
    clientIdsForOIDC: S.optional(ClientIdsForOIDC),
    quickSightConfiguration: S.optional(QuickSightConfiguration),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export type MaxResultsIntegerForGetTopicConfigurations = number;
export type NextToken = string;
export interface GetChatControlsConfigurationRequest {
  applicationId: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetChatControlsConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/chatcontrols",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChatControlsConfigurationRequest",
}) as any as S.Schema<GetChatControlsConfigurationRequest>;
export type ResponseScope =
  | "ENTERPRISE_CONTENT_ONLY"
  | "EXTENDED_KNOWLEDGE_ENABLED"
  | (string & {});
export const ResponseScope = S.String;

export type OrchestrationControl = "ENABLED" | "DISABLED" | (string & {});
export const OrchestrationControl = S.String;

export interface AppliedOrchestrationConfiguration {
  control: OrchestrationControl;
}
export const AppliedOrchestrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ control: OrchestrationControl }),
).annotate({
  identifier: "AppliedOrchestrationConfiguration",
}) as any as S.Schema<AppliedOrchestrationConfiguration>;
export type BlockedPhrase = string;
export type BlockedPhrases = string[];
export const BlockedPhrases = /*@__PURE__*/ S.Array(S.String);
export type SystemMessageOverride = string;
export interface BlockedPhrasesConfiguration {
  blockedPhrases?: string[];
  systemMessageOverride?: string;
}
export const BlockedPhrasesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blockedPhrases: S.optional(BlockedPhrases),
    systemMessageOverride: S.optional(S.String),
  }),
).annotate({
  identifier: "BlockedPhrasesConfiguration",
}) as any as S.Schema<BlockedPhrasesConfiguration>;
export type TopicConfigurationName = string;
export type TopicDescription = string;
export type ExampleChatMessage = string;
export type ExampleChatMessages = string[];
export const ExampleChatMessages = /*@__PURE__*/ S.Array(S.String);
export type UserIds = string[];
export const UserIds = /*@__PURE__*/ S.Array(S.String);
export interface UsersAndGroups {
  userIds?: string[];
  userGroups?: string[];
}
export const UsersAndGroups = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userIds: S.optional(UserIds),
    userGroups: S.optional(UserGroups),
  }),
).annotate({ identifier: "UsersAndGroups" }) as any as S.Schema<UsersAndGroups>;
export type RuleType =
  | "CONTENT_BLOCKER_RULE"
  | "CONTENT_RETRIEVAL_RULE"
  | (string & {});
export const RuleType = S.String;

export interface ContentBlockerRule {
  systemMessageOverride?: string;
}
export const ContentBlockerRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ systemMessageOverride: S.optional(S.String) }),
).annotate({
  identifier: "ContentBlockerRule",
}) as any as S.Schema<ContentBlockerRule>;
export interface EligibleDataSource {
  indexId?: string;
  dataSourceId?: string;
}
export const EligibleDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexId: S.optional(S.String),
    dataSourceId: S.optional(S.String),
  }),
).annotate({
  identifier: "EligibleDataSource",
}) as any as S.Schema<EligibleDataSource>;
export type EligibleDataSources = EligibleDataSource[];
export const EligibleDataSources = /*@__PURE__*/ S.Array(EligibleDataSource);
export interface ContentRetrievalRule {
  eligibleDataSources?: EligibleDataSource[];
}
export const ContentRetrievalRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eligibleDataSources: S.optional(EligibleDataSources) }),
).annotate({
  identifier: "ContentRetrievalRule",
}) as any as S.Schema<ContentRetrievalRule>;
export type RuleConfiguration =
  | { contentBlockerRule: ContentBlockerRule; contentRetrievalRule?: never }
  | { contentBlockerRule?: never; contentRetrievalRule: ContentRetrievalRule };
export const RuleConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ contentBlockerRule: ContentBlockerRule }),
  S.Struct({ contentRetrievalRule: ContentRetrievalRule }),
]);
export interface Rule {
  includedUsersAndGroups?: UsersAndGroups;
  excludedUsersAndGroups?: UsersAndGroups;
  ruleType: RuleType;
  ruleConfiguration?: RuleConfiguration;
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includedUsersAndGroups: S.optional(UsersAndGroups),
    excludedUsersAndGroups: S.optional(UsersAndGroups),
    ruleType: RuleType,
    ruleConfiguration: S.optional(RuleConfiguration),
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type Rules = Rule[];
export const Rules = /*@__PURE__*/ S.Array(Rule);
export interface TopicConfiguration {
  name: string;
  description?: string;
  exampleChatMessages?: string[];
  rules: Rule[];
}
export const TopicConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    exampleChatMessages: S.optional(ExampleChatMessages),
    rules: Rules,
  }),
).annotate({
  identifier: "TopicConfiguration",
}) as any as S.Schema<TopicConfiguration>;
export type TopicConfigurations = TopicConfiguration[];
export const TopicConfigurations = /*@__PURE__*/ S.Array(TopicConfiguration);
export type CreatorModeControl = "ENABLED" | "DISABLED" | (string & {});
export const CreatorModeControl = S.String;

export interface AppliedCreatorModeConfiguration {
  creatorModeControl: CreatorModeControl;
}
export const AppliedCreatorModeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ creatorModeControl: CreatorModeControl }),
).annotate({
  identifier: "AppliedCreatorModeConfiguration",
}) as any as S.Schema<AppliedCreatorModeConfiguration>;
export type HallucinationReductionControl =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const HallucinationReductionControl = S.String;

export interface HallucinationReductionConfiguration {
  hallucinationReductionControl?: HallucinationReductionControl;
}
export const HallucinationReductionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hallucinationReductionControl: S.optional(HallucinationReductionControl),
  }),
).annotate({
  identifier: "HallucinationReductionConfiguration",
}) as any as S.Schema<HallucinationReductionConfiguration>;
export interface GetChatControlsConfigurationResponse {
  responseScope?: ResponseScope;
  orchestrationConfiguration?: AppliedOrchestrationConfiguration;
  blockedPhrases?: BlockedPhrasesConfiguration;
  topicConfigurations?: TopicConfiguration[];
  creatorModeConfiguration?: AppliedCreatorModeConfiguration;
  nextToken?: string;
  hallucinationReductionConfiguration?: HallucinationReductionConfiguration;
}
export const GetChatControlsConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      responseScope: S.optional(ResponseScope),
      orchestrationConfiguration: S.optional(AppliedOrchestrationConfiguration),
      blockedPhrases: S.optional(BlockedPhrasesConfiguration),
      topicConfigurations: S.optional(TopicConfigurations),
      creatorModeConfiguration: S.optional(AppliedCreatorModeConfiguration),
      nextToken: S.optional(S.String),
      hallucinationReductionConfiguration: S.optional(
        HallucinationReductionConfiguration,
      ),
    }),
).annotate({
  identifier: "GetChatControlsConfigurationResponse",
}) as any as S.Schema<GetChatControlsConfigurationResponse>;
export interface GetChatResponseConfigurationRequest {
  applicationId: string;
  chatResponseConfigurationId: string;
}
export const GetChatResponseConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    chatResponseConfigurationId: S.String.pipe(
      T.HttpLabel("chatResponseConfigurationId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChatResponseConfigurationRequest",
}) as any as S.Schema<GetChatResponseConfigurationRequest>;
export type ChatResponseConfigurationStatus =
  | "CREATING"
  | "UPDATING"
  | "FAILED"
  | "ACTIVE"
  | (string & {});
export const ChatResponseConfigurationStatus = S.String;

export interface ChatResponseConfigurationDetail {
  responseConfigurations?: { [key: string]: ResponseConfiguration | undefined };
  responseConfigurationSummary?: string;
  status?: ChatResponseConfigurationStatus;
  error?: ErrorDetail;
  updatedAt?: Date;
}
export const ChatResponseConfigurationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responseConfigurations: S.optional(ResponseConfigurations),
    responseConfigurationSummary: S.optional(S.String),
    status: S.optional(ChatResponseConfigurationStatus),
    error: S.optional(ErrorDetail),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ChatResponseConfigurationDetail",
}) as any as S.Schema<ChatResponseConfigurationDetail>;
export interface GetChatResponseConfigurationResponse {
  chatResponseConfigurationId?: string;
  chatResponseConfigurationArn?: string;
  displayName?: string;
  createdAt?: Date;
  inUseConfiguration?: ChatResponseConfigurationDetail;
  lastUpdateConfiguration?: ChatResponseConfigurationDetail;
}
export const GetChatResponseConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      chatResponseConfigurationId: S.optional(S.String),
      chatResponseConfigurationArn: S.optional(S.String),
      displayName: S.optional(S.String),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      inUseConfiguration: S.optional(ChatResponseConfigurationDetail),
      lastUpdateConfiguration: S.optional(ChatResponseConfigurationDetail),
    }),
).annotate({
  identifier: "GetChatResponseConfigurationResponse",
}) as any as S.Schema<GetChatResponseConfigurationResponse>;
export interface GetDataAccessorRequest {
  applicationId: string;
  dataAccessorId: string;
}
export const GetDataAccessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    dataAccessorId: S.String.pipe(T.HttpLabel("dataAccessorId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/dataaccessors/{dataAccessorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataAccessorRequest",
}) as any as S.Schema<GetDataAccessorRequest>;
export interface GetDataAccessorResponse {
  displayName?: string | redacted.Redacted<string>;
  dataAccessorId?: string;
  dataAccessorArn?: string;
  applicationId?: string;
  idcApplicationArn?: string;
  principal?: string;
  actionConfigurations?: ActionConfiguration[];
  authenticationDetail?: DataAccessorAuthenticationDetail;
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetDataAccessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(SensitiveString),
    dataAccessorId: S.optional(S.String),
    dataAccessorArn: S.optional(S.String),
    applicationId: S.optional(S.String),
    idcApplicationArn: S.optional(S.String),
    principal: S.optional(S.String),
    actionConfigurations: S.optional(ActionConfigurationList),
    authenticationDetail: S.optional(DataAccessorAuthenticationDetail),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetDataAccessorResponse",
}) as any as S.Schema<GetDataAccessorResponse>;
export interface GetDataSourceRequest {
  applicationId: string;
  indexId: string;
  dataSourceId: string;
}
export const GetDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSourceRequest",
}) as any as S.Schema<GetDataSourceRequest>;
export type DataSourceStatus =
  | "PENDING_CREATION"
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export const DataSourceStatus = S.String;

export interface GetDataSourceResponse {
  applicationId?: string;
  indexId?: string;
  dataSourceId?: string;
  dataSourceArn?: string;
  displayName?: string;
  type?: string;
  configuration?: any;
  vpcConfiguration?: DataSourceVpcConfiguration;
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  status?: DataSourceStatus;
  syncSchedule?: string;
  roleArn?: string;
  error?: ErrorDetail;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export const GetDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    indexId: S.optional(S.String),
    dataSourceId: S.optional(S.String),
    dataSourceArn: S.optional(S.String),
    displayName: S.optional(S.String),
    type: S.optional(S.String),
    configuration: S.optional(S.Any),
    vpcConfiguration: S.optional(DataSourceVpcConfiguration),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    description: S.optional(S.String),
    status: S.optional(DataSourceStatus),
    syncSchedule: S.optional(S.String),
    roleArn: S.optional(S.String),
    error: S.optional(ErrorDetail),
    documentEnrichmentConfiguration: S.optional(
      DocumentEnrichmentConfiguration,
    ),
    mediaExtractionConfiguration: S.optional(MediaExtractionConfiguration),
  }),
).annotate({
  identifier: "GetDataSourceResponse",
}) as any as S.Schema<GetDataSourceResponse>;
export type OutputFormat = "RAW" | "EXTRACTED" | (string & {});
export const OutputFormat = S.String;

export interface GetDocumentContentRequest {
  applicationId: string;
  indexId: string;
  dataSourceId?: string;
  documentId: string;
  outputFormat?: OutputFormat;
}
export const GetDocumentContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
    documentId: S.String.pipe(T.HttpLabel("documentId")),
    outputFormat: S.optional(OutputFormat).pipe(T.HttpQuery("outputFormat")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/index/{indexId}/documents/{documentId}/content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDocumentContentRequest",
}) as any as S.Schema<GetDocumentContentRequest>;
export interface GetDocumentContentResponse {
  presignedUrl: string;
  mimeType: string;
}
export const GetDocumentContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ presignedUrl: S.String, mimeType: S.String }),
).annotate({
  identifier: "GetDocumentContentResponse",
}) as any as S.Schema<GetDocumentContentResponse>;
export interface GetGroupRequest {
  applicationId: string;
  indexId: string;
  groupName: string;
  dataSourceId?: string;
}
export const GetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    groupName: S.String.pipe(T.HttpLabel("groupName")),
    dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/indices/{indexId}/groups/{groupName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupRequest",
}) as any as S.Schema<GetGroupRequest>;
export type GroupStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "PROCESSING"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const GroupStatus = S.String;

export interface GroupStatusDetail {
  status?: GroupStatus;
  lastUpdatedAt?: Date;
  errorDetail?: ErrorDetail;
}
export const GroupStatusDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(GroupStatus),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    errorDetail: S.optional(ErrorDetail),
  }),
).annotate({
  identifier: "GroupStatusDetail",
}) as any as S.Schema<GroupStatusDetail>;
export type GroupStatusDetails = GroupStatusDetail[];
export const GroupStatusDetails = /*@__PURE__*/ S.Array(GroupStatusDetail);
export interface GetGroupResponse {
  status?: GroupStatusDetail;
  statusHistory?: GroupStatusDetail[];
}
export const GetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(GroupStatusDetail),
    statusHistory: S.optional(GroupStatusDetails),
  }),
).annotate({
  identifier: "GetGroupResponse",
}) as any as S.Schema<GetGroupResponse>;
export interface GetIndexRequest {
  applicationId: string;
  indexId: string;
}
export const GetIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/indices/{indexId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIndexRequest",
}) as any as S.Schema<GetIndexRequest>;
export type IndexStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | (string & {});
export const IndexStatus = S.String;

export type DocumentMetadataConfigurationName = string;
export type AttributeType =
  | "STRING"
  | "STRING_LIST"
  | "NUMBER"
  | "DATE"
  | (string & {});
export const AttributeType = S.String;

export type Status = "ENABLED" | "DISABLED" | (string & {});
export const Status = S.String;

export interface DocumentAttributeConfiguration {
  name?: string;
  type?: AttributeType;
  search?: Status;
}
export const DocumentAttributeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(AttributeType),
    search: S.optional(Status),
  }),
).annotate({
  identifier: "DocumentAttributeConfiguration",
}) as any as S.Schema<DocumentAttributeConfiguration>;
export type DocumentAttributeConfigurations = DocumentAttributeConfiguration[];
export const DocumentAttributeConfigurations = /*@__PURE__*/ S.Array(
  DocumentAttributeConfiguration,
);
export type IndexedTextBytes = number;
export type IndexedTextDocument = number;
export interface TextDocumentStatistics {
  indexedTextBytes?: number;
  indexedTextDocumentCount?: number;
}
export const TextDocumentStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    indexedTextBytes: S.optional(S.Number),
    indexedTextDocumentCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "TextDocumentStatistics",
}) as any as S.Schema<TextDocumentStatistics>;
export interface IndexStatistics {
  textDocumentStatistics?: TextDocumentStatistics;
}
export const IndexStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textDocumentStatistics: S.optional(TextDocumentStatistics) }),
).annotate({
  identifier: "IndexStatistics",
}) as any as S.Schema<IndexStatistics>;
export interface GetIndexResponse {
  applicationId?: string;
  indexId?: string;
  displayName?: string;
  indexArn?: string;
  status?: IndexStatus;
  type?: IndexType;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  capacityConfiguration?: IndexCapacityConfiguration;
  documentAttributeConfigurations?: DocumentAttributeConfiguration[];
  error?: ErrorDetail;
  indexStatistics?: IndexStatistics;
}
export const GetIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    indexId: S.optional(S.String),
    displayName: S.optional(S.String),
    indexArn: S.optional(S.String),
    status: S.optional(IndexStatus),
    type: S.optional(IndexType),
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    capacityConfiguration: S.optional(IndexCapacityConfiguration),
    documentAttributeConfigurations: S.optional(
      DocumentAttributeConfigurations,
    ),
    error: S.optional(ErrorDetail),
    indexStatistics: S.optional(IndexStatistics),
  }),
).annotate({
  identifier: "GetIndexResponse",
}) as any as S.Schema<GetIndexResponse>;
export interface GetMediaRequest {
  applicationId: string;
  conversationId: string;
  messageId: string;
  mediaId: string;
}
export const GetMediaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    conversationId: S.String.pipe(T.HttpLabel("conversationId")),
    messageId: S.String.pipe(T.HttpLabel("messageId")),
    mediaId: S.String.pipe(T.HttpLabel("mediaId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/conversations/{conversationId}/messages/{messageId}/media/{mediaId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMediaRequest",
}) as any as S.Schema<GetMediaRequest>;
export interface GetMediaResponse {
  mediaBytes?: Uint8Array;
  mediaMimeType?: string;
}
export const GetMediaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mediaBytes: S.optional(T.Blob),
    mediaMimeType: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMediaResponse",
}) as any as S.Schema<GetMediaResponse>;
export interface GetPluginRequest {
  applicationId: string;
  pluginId: string;
}
export const GetPluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    pluginId: S.String.pipe(T.HttpLabel("pluginId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/plugins/{pluginId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPluginRequest",
}) as any as S.Schema<GetPluginRequest>;
export type PluginState = "ENABLED" | "DISABLED" | (string & {});
export const PluginState = S.String;

export interface GetPluginResponse {
  applicationId?: string;
  pluginId?: string;
  displayName?: string;
  type?: PluginType;
  serverUrl?: string;
  authConfiguration?: PluginAuthConfiguration;
  customPluginConfiguration?: CustomPluginConfiguration;
  buildStatus?: PluginBuildStatus;
  pluginArn?: string;
  state?: PluginState;
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetPluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    pluginId: S.optional(S.String),
    displayName: S.optional(S.String),
    type: S.optional(PluginType),
    serverUrl: S.optional(S.String),
    authConfiguration: S.optional(PluginAuthConfiguration),
    customPluginConfiguration: S.optional(CustomPluginConfiguration),
    buildStatus: S.optional(PluginBuildStatus),
    pluginArn: S.optional(S.String),
    state: S.optional(PluginState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetPluginResponse",
}) as any as S.Schema<GetPluginResponse>;
export interface GetPolicyRequest {
  applicationId: string;
}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String.pipe(T.HttpLabel("applicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/policy" }),
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
  policy?: string;
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.optional(S.String) }),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetRetrieverRequest {
  applicationId: string;
  retrieverId: string;
}
export const GetRetrieverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    retrieverId: S.String.pipe(T.HttpLabel("retrieverId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/retrievers/{retrieverId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRetrieverRequest",
}) as any as S.Schema<GetRetrieverRequest>;
export type RetrieverStatus = "CREATING" | "ACTIVE" | "FAILED" | (string & {});
export const RetrieverStatus = S.String;

export interface GetRetrieverResponse {
  applicationId?: string;
  retrieverId?: string;
  retrieverArn?: string;
  type?: RetrieverType;
  status?: RetrieverStatus;
  displayName?: string;
  configuration?: RetrieverConfiguration;
  roleArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetRetrieverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    retrieverId: S.optional(S.String),
    retrieverArn: S.optional(S.String),
    type: S.optional(RetrieverType),
    status: S.optional(RetrieverStatus),
    displayName: S.optional(S.String),
    configuration: S.optional(RetrieverConfiguration),
    roleArn: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetRetrieverResponse",
}) as any as S.Schema<GetRetrieverResponse>;
export interface GetUserRequest {
  applicationId: string;
  userId: string;
}
export const GetUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/users/{userId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetUserRequest" }) as any as S.Schema<GetUserRequest>;
export interface GetUserResponse {
  userAliases?: UserAlias[];
}
export const GetUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userAliases: S.optional(UserAliases) }),
).annotate({
  identifier: "GetUserResponse",
}) as any as S.Schema<GetUserResponse>;
export interface GetWebExperienceRequest {
  applicationId: string;
  webExperienceId: string;
}
export const GetWebExperienceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/experiences/{webExperienceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWebExperienceRequest",
}) as any as S.Schema<GetWebExperienceRequest>;
export type WebExperienceStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "PENDING_AUTH_CONFIG"
  | (string & {});
export const WebExperienceStatus = S.String;

export type SamlMetadataXML = string;
export type SamlAttribute = string;
export interface SamlConfiguration {
  metadataXML: string;
  roleArn: string;
  userIdAttribute: string;
  userGroupAttribute?: string;
}
export const SamlConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataXML: S.String,
    roleArn: S.String,
    userIdAttribute: S.String,
    userGroupAttribute: S.optional(S.String),
  }),
).annotate({
  identifier: "SamlConfiguration",
}) as any as S.Schema<SamlConfiguration>;
export type WebExperienceAuthConfiguration = {
  samlConfiguration: SamlConfiguration;
};
export const WebExperienceAuthConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ samlConfiguration: SamlConfiguration }),
]);
export interface GetWebExperienceResponse {
  applicationId?: string;
  webExperienceId?: string;
  webExperienceArn?: string;
  defaultEndpoint?: string;
  status?: WebExperienceStatus;
  createdAt?: Date;
  updatedAt?: Date;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  samplePromptsControlMode?: WebExperienceSamplePromptsControlMode;
  origins?: string[];
  roleArn?: string;
  identityProviderConfiguration?: IdentityProviderConfiguration;
  authenticationConfiguration?: WebExperienceAuthConfiguration;
  error?: ErrorDetail;
  browserExtensionConfiguration?: BrowserExtensionConfiguration;
  customizationConfiguration?: CustomizationConfiguration;
}
export const GetWebExperienceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    webExperienceId: S.optional(S.String),
    webExperienceArn: S.optional(S.String),
    defaultEndpoint: S.optional(S.String),
    status: S.optional(WebExperienceStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    title: S.optional(S.String),
    subtitle: S.optional(S.String),
    welcomeMessage: S.optional(S.String),
    samplePromptsControlMode: S.optional(WebExperienceSamplePromptsControlMode),
    origins: S.optional(WebExperienceOrigins),
    roleArn: S.optional(S.String),
    identityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    authenticationConfiguration: S.optional(WebExperienceAuthConfiguration),
    error: S.optional(ErrorDetail),
    browserExtensionConfiguration: S.optional(BrowserExtensionConfiguration),
    customizationConfiguration: S.optional(CustomizationConfiguration),
  }),
).annotate({
  identifier: "GetWebExperienceResponse",
}) as any as S.Schema<GetWebExperienceResponse>;
export type MaxResultsIntegerForListApplications = number;
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
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
export interface Application {
  displayName?: string;
  applicationId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: ApplicationStatus;
  identityType?: IdentityType;
  quickSightConfiguration?: QuickSightConfiguration;
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    applicationId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(ApplicationStatus),
    identityType: S.optional(IdentityType),
    quickSightConfiguration: S.optional(QuickSightConfiguration),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export type Applications = Application[];
export const Applications = /*@__PURE__*/ S.Array(Application);
export interface ListApplicationsResponse {
  nextToken?: string;
  applications?: Application[];
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    applications: S.optional(Applications),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export type MaxResultsIntegerForListAttachments = number;
export interface ListAttachmentsRequest {
  applicationId: string;
  conversationId?: string;
  userId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAttachmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    conversationId: S.optional(S.String).pipe(T.HttpQuery("conversationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/attachments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAttachmentsRequest",
}) as any as S.Schema<ListAttachmentsRequest>;
export interface Attachment {
  attachmentId?: string;
  conversationId?: string;
  name?: string;
  copyFrom?: CopyFromSource;
  fileType?: string;
  fileSize?: number;
  md5chksum?: string;
  createdAt?: Date;
  status?: AttachmentStatus;
  error?: ErrorDetail;
}
export const Attachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.optional(S.String),
    conversationId: S.optional(S.String),
    name: S.optional(S.String),
    copyFrom: S.optional(CopyFromSource),
    fileType: S.optional(S.String),
    fileSize: S.optional(S.Number),
    md5chksum: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(AttachmentStatus),
    error: S.optional(ErrorDetail),
  }),
).annotate({ identifier: "Attachment" }) as any as S.Schema<Attachment>;
export type AttachmentList = Attachment[];
export const AttachmentList = /*@__PURE__*/ S.Array(Attachment);
export interface ListAttachmentsResponse {
  attachments?: Attachment[];
  nextToken?: string;
}
export const ListAttachmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachments: S.optional(AttachmentList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAttachmentsResponse",
}) as any as S.Schema<ListAttachmentsResponse>;
export interface ListChatResponseConfigurationsRequest {
  applicationId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListChatResponseConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/applications/{applicationId}/chatresponseconfigurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListChatResponseConfigurationsRequest",
}) as any as S.Schema<ListChatResponseConfigurationsRequest>;
export type ResponseConfigurationSummary = string;
export interface ChatResponseConfiguration {
  chatResponseConfigurationId: string;
  chatResponseConfigurationArn: string;
  displayName: string;
  responseConfigurationSummary?: string;
  status: ChatResponseConfigurationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ChatResponseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    chatResponseConfigurationId: S.String,
    chatResponseConfigurationArn: S.String,
    displayName: S.String,
    responseConfigurationSummary: S.optional(S.String),
    status: ChatResponseConfigurationStatus,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ChatResponseConfiguration",
}) as any as S.Schema<ChatResponseConfiguration>;
export type ChatResponseConfigurations = ChatResponseConfiguration[];
export const ChatResponseConfigurations = /*@__PURE__*/ S.Array(
  ChatResponseConfiguration,
);
export interface ListChatResponseConfigurationsResponse {
  chatResponseConfigurations?: ChatResponseConfiguration[];
  nextToken?: string;
}
export const ListChatResponseConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      chatResponseConfigurations: S.optional(ChatResponseConfigurations),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListChatResponseConfigurationsResponse",
}) as any as S.Schema<ListChatResponseConfigurationsResponse>;
export type MaxResultsIntegerForListConversations = number;
export interface ListConversationsRequest {
  applicationId: string;
  userId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListConversationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/conversations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConversationsRequest",
}) as any as S.Schema<ListConversationsRequest>;
export type ConversationTitle = string;
export interface Conversation {
  conversationId?: string;
  title?: string;
  startTime?: Date;
}
export const Conversation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.optional(S.String),
    title: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Conversation" }) as any as S.Schema<Conversation>;
export type Conversations = Conversation[];
export const Conversations = /*@__PURE__*/ S.Array(Conversation);
export interface ListConversationsResponse {
  nextToken?: string;
  conversations?: Conversation[];
}
export const ListConversationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    conversations: S.optional(Conversations),
  }),
).annotate({
  identifier: "ListConversationsResponse",
}) as any as S.Schema<ListConversationsResponse>;
export type NextToken1500 = string;
export type MaxResultsIntegerForListDataAccessors = number;
export interface ListDataAccessorsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataAccessorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/dataaccessors",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataAccessorsRequest",
}) as any as S.Schema<ListDataAccessorsRequest>;
export interface DataAccessor {
  displayName?: string | redacted.Redacted<string>;
  dataAccessorId?: string;
  dataAccessorArn?: string;
  idcApplicationArn?: string;
  principal?: string;
  authenticationDetail?: DataAccessorAuthenticationDetail;
  createdAt?: Date;
  updatedAt?: Date;
}
export const DataAccessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(SensitiveString),
    dataAccessorId: S.optional(S.String),
    dataAccessorArn: S.optional(S.String),
    idcApplicationArn: S.optional(S.String),
    principal: S.optional(S.String),
    authenticationDetail: S.optional(DataAccessorAuthenticationDetail),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "DataAccessor" }) as any as S.Schema<DataAccessor>;
export type DataAccessors = DataAccessor[];
export const DataAccessors = /*@__PURE__*/ S.Array(DataAccessor);
export interface ListDataAccessorsResponse {
  dataAccessors?: DataAccessor[];
  nextToken?: string;
}
export const ListDataAccessorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataAccessors: S.optional(DataAccessors),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataAccessorsResponse",
}) as any as S.Schema<ListDataAccessorsResponse>;
export type MaxResultsIntegerForListDataSources = number;
export interface ListDataSourcesRequest {
  applicationId: string;
  indexId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListDataSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourcesRequest",
}) as any as S.Schema<ListDataSourcesRequest>;
export interface DataSource {
  displayName?: string;
  dataSourceId?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: DataSourceStatus;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    dataSourceId: S.optional(S.String),
    type: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(DataSourceStatus),
  }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export type DataSources = DataSource[];
export const DataSources = /*@__PURE__*/ S.Array(DataSource);
export interface ListDataSourcesResponse {
  dataSources?: DataSource[];
  nextToken?: string;
}
export const ListDataSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSources: S.optional(DataSources),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataSourcesResponse",
}) as any as S.Schema<ListDataSourcesResponse>;
export type MaxResultsIntegerForListDataSourcesSyncJobs = number;
export type DataSourceSyncJobStatus =
  | "FAILED"
  | "SUCCEEDED"
  | "SYNCING"
  | "INCOMPLETE"
  | "STOPPING"
  | "ABORTED"
  | "SYNCING_INDEXING"
  | (string & {});
export const DataSourceSyncJobStatus = S.String;

export interface ListDataSourceSyncJobsRequest {
  dataSourceId: string;
  applicationId: string;
  indexId: string;
  nextToken?: string;
  maxResults?: number;
  startTime?: Date;
  endTime?: Date;
  statusFilter?: DataSourceSyncJobStatus;
}
export const ListDataSourceSyncJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("startTime"),
    ),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
      T.HttpQuery("endTime"),
    ),
    statusFilter: S.optional(DataSourceSyncJobStatus).pipe(
      T.HttpQuery("syncStatus"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/syncjobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSourceSyncJobsRequest",
}) as any as S.Schema<ListDataSourceSyncJobsRequest>;
export type MetricValue = string;
export interface DataSourceSyncJobMetrics {
  documentsAdded?: string;
  documentsModified?: string;
  documentsDeleted?: string;
  documentsFailed?: string;
  documentsScanned?: string;
}
export const DataSourceSyncJobMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentsAdded: S.optional(S.String),
    documentsModified: S.optional(S.String),
    documentsDeleted: S.optional(S.String),
    documentsFailed: S.optional(S.String),
    documentsScanned: S.optional(S.String),
  }),
).annotate({
  identifier: "DataSourceSyncJobMetrics",
}) as any as S.Schema<DataSourceSyncJobMetrics>;
export interface DataSourceSyncJob {
  executionId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: DataSourceSyncJobStatus;
  error?: ErrorDetail;
  dataSourceErrorCode?: string;
  metrics?: DataSourceSyncJobMetrics;
}
export const DataSourceSyncJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    executionId: S.optional(S.String),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(DataSourceSyncJobStatus),
    error: S.optional(ErrorDetail),
    dataSourceErrorCode: S.optional(S.String),
    metrics: S.optional(DataSourceSyncJobMetrics),
  }),
).annotate({
  identifier: "DataSourceSyncJob",
}) as any as S.Schema<DataSourceSyncJob>;
export type DataSourceSyncJobs = DataSourceSyncJob[];
export const DataSourceSyncJobs = /*@__PURE__*/ S.Array(DataSourceSyncJob);
export interface ListDataSourceSyncJobsResponse {
  history?: DataSourceSyncJob[];
  nextToken?: string;
}
export const ListDataSourceSyncJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    history: S.optional(DataSourceSyncJobs),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataSourceSyncJobsResponse",
}) as any as S.Schema<ListDataSourceSyncJobsResponse>;
export type DataSourceIds = string[];
export const DataSourceIds = /*@__PURE__*/ S.Array(S.String);
export type MaxResultsIntegerForListDocuments = number;
export interface ListDocumentsRequest {
  applicationId: string;
  indexId: string;
  dataSourceIds?: string[];
  nextToken?: string;
  maxResults?: number;
}
export const ListDocumentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    dataSourceIds: S.optional(DataSourceIds).pipe(T.HttpQuery("dataSourceIds")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/index/{indexId}/documents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDocumentsRequest",
}) as any as S.Schema<ListDocumentsRequest>;
export type DocumentStatus =
  | "RECEIVED"
  | "PROCESSING"
  | "INDEXED"
  | "UPDATED"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | "DOCUMENT_FAILED_TO_INDEX"
  | (string & {});
export const DocumentStatus = S.String;

export interface DocumentDetails {
  documentId?: string;
  status?: DocumentStatus;
  error?: ErrorDetail;
  createdAt?: Date;
  updatedAt?: Date;
}
export const DocumentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentId: S.optional(S.String),
    status: S.optional(DocumentStatus),
    error: S.optional(ErrorDetail),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DocumentDetails",
}) as any as S.Schema<DocumentDetails>;
export type DocumentDetailList = DocumentDetails[];
export const DocumentDetailList = /*@__PURE__*/ S.Array(DocumentDetails);
export interface ListDocumentsResponse {
  documentDetailList?: DocumentDetails[];
  nextToken?: string;
}
export const ListDocumentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentDetailList: S.optional(DocumentDetailList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDocumentsResponse",
}) as any as S.Schema<ListDocumentsResponse>;
export type MaxResultsIntegerForListGroupsRequest = number;
export interface ListGroupsRequest {
  applicationId: string;
  indexId: string;
  updatedEarlierThan: Date;
  dataSourceId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    updatedEarlierThan: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("updatedEarlierThan"),
    ),
    dataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/indices/{indexId}/groups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGroupsRequest",
}) as any as S.Schema<ListGroupsRequest>;
export interface GroupSummary {
  groupName?: string;
}
export const GroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupName: S.optional(S.String) }),
).annotate({ identifier: "GroupSummary" }) as any as S.Schema<GroupSummary>;
export type GroupSummaryList = GroupSummary[];
export const GroupSummaryList = /*@__PURE__*/ S.Array(GroupSummary);
export interface ListGroupsResponse {
  nextToken?: string;
  items?: GroupSummary[];
}
export const ListGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(GroupSummaryList),
  }),
).annotate({
  identifier: "ListGroupsResponse",
}) as any as S.Schema<ListGroupsResponse>;
export type MaxResultsIntegerForListIndices = number;
export interface ListIndicesRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListIndicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/indices" }),
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
export interface Index {
  displayName?: string;
  indexId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: IndexStatus;
}
export const Index = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    indexId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(IndexStatus),
  }),
).annotate({ identifier: "Index" }) as any as S.Schema<Index>;
export type Indices = Index[];
export const Indices = /*@__PURE__*/ S.Array(Index);
export interface ListIndicesResponse {
  nextToken?: string;
  indices?: Index[];
}
export const ListIndicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), indices: S.optional(Indices) }),
).annotate({
  identifier: "ListIndicesResponse",
}) as any as S.Schema<ListIndicesResponse>;
export type MaxResultsIntegerForListMessages = number;
export interface ListMessagesRequest {
  conversationId: string;
  applicationId: string;
  userId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListMessagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.String.pipe(T.HttpLabel("conversationId")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/conversations/{conversationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMessagesRequest",
}) as any as S.Schema<ListMessagesRequest>;
export type MessageBody = string;
export type MessageType = "USER" | "SYSTEM" | (string & {});
export const MessageType = S.String;

export interface Message {
  messageId?: string;
  body?: string;
  time?: Date;
  type?: MessageType;
  attachments?: AttachmentOutput[];
  sourceAttribution?: SourceAttribution[];
  actionReview?: ActionReview;
  actionExecution?: ActionExecution;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageId: S.optional(S.String),
    body: S.optional(S.String),
    time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    type: S.optional(MessageType),
    attachments: S.optional(AttachmentsOutput),
    sourceAttribution: S.optional(SourceAttributions),
    actionReview: S.optional(ActionReview),
    actionExecution: S.optional(ActionExecution),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type Messages = Message[];
export const Messages = /*@__PURE__*/ S.Array(Message);
export interface ListMessagesResponse {
  messages?: Message[];
  nextToken?: string;
}
export const ListMessagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messages: S.optional(Messages), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMessagesResponse",
}) as any as S.Schema<ListMessagesResponse>;
export type MaxResultsIntegerForListPluginActions = number;
export interface ListPluginActionsRequest {
  applicationId: string;
  pluginId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPluginActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    pluginId: S.String.pipe(T.HttpLabel("pluginId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/plugins/{pluginId}/actions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPluginActionsRequest",
}) as any as S.Schema<ListPluginActionsRequest>;
export interface ActionSummary {
  actionIdentifier?: string;
  displayName?: string;
  instructionExample?: string;
  description?: string;
}
export const ActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionIdentifier: S.optional(S.String),
    displayName: S.optional(S.String),
    instructionExample: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "ActionSummary" }) as any as S.Schema<ActionSummary>;
export type Actions = ActionSummary[];
export const Actions = /*@__PURE__*/ S.Array(ActionSummary);
export interface ListPluginActionsResponse {
  nextToken?: string;
  items?: ActionSummary[];
}
export const ListPluginActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), items: S.optional(Actions) }),
).annotate({
  identifier: "ListPluginActionsResponse",
}) as any as S.Schema<ListPluginActionsResponse>;
export type MaxResultsIntegerForListPlugins = number;
export interface ListPluginsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPluginsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{applicationId}/plugins" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPluginsRequest",
}) as any as S.Schema<ListPluginsRequest>;
export interface Plugin {
  pluginId?: string;
  displayName?: string;
  type?: PluginType;
  serverUrl?: string;
  state?: PluginState;
  buildStatus?: PluginBuildStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Plugin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pluginId: S.optional(S.String),
    displayName: S.optional(S.String),
    type: S.optional(PluginType),
    serverUrl: S.optional(S.String),
    state: S.optional(PluginState),
    buildStatus: S.optional(PluginBuildStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Plugin" }) as any as S.Schema<Plugin>;
export type Plugins = Plugin[];
export const Plugins = /*@__PURE__*/ S.Array(Plugin);
export interface ListPluginsResponse {
  nextToken?: string;
  plugins?: Plugin[];
}
export const ListPluginsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), plugins: S.optional(Plugins) }),
).annotate({
  identifier: "ListPluginsResponse",
}) as any as S.Schema<ListPluginsResponse>;
export type MaxResultsIntegerForListPluginTypeActions = number;
export interface ListPluginTypeActionsRequest {
  pluginType: PluginType;
  nextToken?: string;
  maxResults?: number;
}
export const ListPluginTypeActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pluginType: PluginType.pipe(T.HttpLabel("pluginType")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/pluginTypes/{pluginType}/actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPluginTypeActionsRequest",
}) as any as S.Schema<ListPluginTypeActionsRequest>;
export interface ListPluginTypeActionsResponse {
  nextToken?: string;
  items?: ActionSummary[];
}
export const ListPluginTypeActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), items: S.optional(Actions) }),
).annotate({
  identifier: "ListPluginTypeActionsResponse",
}) as any as S.Schema<ListPluginTypeActionsResponse>;
export type MaxResultsIntegerForListPluginTypeMetadata = number;
export interface ListPluginTypeMetadataRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPluginTypeMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/pluginTypeMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPluginTypeMetadataRequest",
}) as any as S.Schema<ListPluginTypeMetadataRequest>;
export type PluginTypeCategory =
  | "Customer relationship management (CRM)"
  | "Project management"
  | "Communication"
  | "Productivity"
  | "Ticketing and incident management"
  | (string & {});
export const PluginTypeCategory = S.String;

export interface PluginTypeMetadataSummary {
  type?: PluginType;
  category?: PluginTypeCategory;
  description?: string;
}
export const PluginTypeMetadataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(PluginType),
    category: S.optional(PluginTypeCategory),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "PluginTypeMetadataSummary",
}) as any as S.Schema<PluginTypeMetadataSummary>;
export type ListPluginTypeMetadataSummaries = PluginTypeMetadataSummary[];
export const ListPluginTypeMetadataSummaries = /*@__PURE__*/ S.Array(
  PluginTypeMetadataSummary,
);
export interface ListPluginTypeMetadataResponse {
  nextToken?: string;
  items?: PluginTypeMetadataSummary[];
}
export const ListPluginTypeMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(ListPluginTypeMetadataSummaries),
  }),
).annotate({
  identifier: "ListPluginTypeMetadataResponse",
}) as any as S.Schema<ListPluginTypeMetadataResponse>;
export type MaxResultsIntegerForListRetrieversRequest = number;
export interface ListRetrieversRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRetrieversRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/retrievers",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRetrieversRequest",
}) as any as S.Schema<ListRetrieversRequest>;
export interface Retriever {
  applicationId?: string;
  retrieverId?: string;
  type?: RetrieverType;
  status?: RetrieverStatus;
  displayName?: string;
}
export const Retriever = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    retrieverId: S.optional(S.String),
    type: S.optional(RetrieverType),
    status: S.optional(RetrieverStatus),
    displayName: S.optional(S.String),
  }),
).annotate({ identifier: "Retriever" }) as any as S.Schema<Retriever>;
export type Retrievers = Retriever[];
export const Retrievers = /*@__PURE__*/ S.Array(Retriever);
export interface ListRetrieversResponse {
  retrievers?: Retriever[];
  nextToken?: string;
}
export const ListRetrieversResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    retrievers: S.optional(Retrievers),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRetrieversResponse",
}) as any as S.Schema<ListRetrieversResponse>;
export type MaxResultsIntegerForListSubscriptions = number;
export interface ListSubscriptionsRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/subscriptions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionsRequest",
}) as any as S.Schema<ListSubscriptionsRequest>;
export interface Subscription {
  subscriptionId?: string;
  subscriptionArn?: string;
  principal?: SubscriptionPrincipal;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptionId: S.optional(S.String),
    subscriptionArn: S.optional(S.String),
    principal: S.optional(SubscriptionPrincipal),
    currentSubscription: S.optional(SubscriptionDetails),
    nextSubscription: S.optional(SubscriptionDetails),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type Subscriptions = Subscription[];
export const Subscriptions = /*@__PURE__*/ S.Array(Subscription);
export interface ListSubscriptionsResponse {
  nextToken?: string;
  subscriptions?: Subscription[];
}
export const ListSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    subscriptions: S.optional(Subscriptions),
  }),
).annotate({
  identifier: "ListSubscriptionsResponse",
}) as any as S.Schema<ListSubscriptionsResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String.pipe(T.HttpLabel("resourceARN")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{resourceARN}" }),
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
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type MaxResultsIntegerForListWebExperiencesRequest = number;
export interface ListWebExperiencesRequest {
  applicationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListWebExperiencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{applicationId}/experiences",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWebExperiencesRequest",
}) as any as S.Schema<ListWebExperiencesRequest>;
export interface WebExperience {
  webExperienceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  defaultEndpoint?: string;
  status?: WebExperienceStatus;
}
export const WebExperience = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webExperienceId: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    defaultEndpoint: S.optional(S.String),
    status: S.optional(WebExperienceStatus),
  }),
).annotate({ identifier: "WebExperience" }) as any as S.Schema<WebExperience>;
export type WebExperiences = WebExperience[];
export const WebExperiences = /*@__PURE__*/ S.Array(WebExperience);
export interface ListWebExperiencesResponse {
  webExperiences?: WebExperience[];
  nextToken?: string;
}
export const ListWebExperiencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    webExperiences: S.optional(WebExperiences),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWebExperiencesResponse",
}) as any as S.Schema<ListWebExperiencesResponse>;
export type SystemMessageId = string;
export type MessageUsefulness = "USEFUL" | "NOT_USEFUL" | (string & {});
export const MessageUsefulness = S.String;

export type MessageUsefulnessReason =
  | "NOT_FACTUALLY_CORRECT"
  | "HARMFUL_OR_UNSAFE"
  | "INCORRECT_OR_MISSING_SOURCES"
  | "NOT_HELPFUL"
  | "FACTUALLY_CORRECT"
  | "COMPLETE"
  | "RELEVANT_SOURCES"
  | "HELPFUL"
  | "NOT_BASED_ON_DOCUMENTS"
  | "NOT_COMPLETE"
  | "NOT_CONCISE"
  | "OTHER"
  | (string & {});
export const MessageUsefulnessReason = S.String;

export type MessageUsefulnessComment = string;
export interface MessageUsefulnessFeedback {
  usefulness: MessageUsefulness;
  reason?: MessageUsefulnessReason;
  comment?: string;
  submittedAt: Date;
}
export const MessageUsefulnessFeedback = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usefulness: MessageUsefulness,
    reason: S.optional(MessageUsefulnessReason),
    comment: S.optional(S.String),
    submittedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "MessageUsefulnessFeedback",
}) as any as S.Schema<MessageUsefulnessFeedback>;
export interface PutFeedbackRequest {
  applicationId: string;
  userId?: string;
  conversationId: string;
  messageId: string;
  messageCopiedAt?: Date;
  messageUsefulness?: MessageUsefulnessFeedback;
}
export const PutFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.optional(S.String).pipe(T.HttpQuery("userId")),
    conversationId: S.String.pipe(T.HttpLabel("conversationId")),
    messageId: S.String.pipe(T.HttpLabel("messageId")),
    messageCopiedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    messageUsefulness: S.optional(MessageUsefulnessFeedback),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/conversations/{conversationId}/messages/{messageId}/feedback",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFeedbackRequest",
}) as any as S.Schema<PutFeedbackRequest>;
export interface PutFeedbackResponse {}
export const PutFeedbackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutFeedbackResponse",
}) as any as S.Schema<PutFeedbackResponse>;
export interface MemberGroup {
  groupName: string;
  type?: MembershipType;
}
export const MemberGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupName: S.String, type: S.optional(MembershipType) }),
).annotate({ identifier: "MemberGroup" }) as any as S.Schema<MemberGroup>;
export type MemberGroups = MemberGroup[];
export const MemberGroups = /*@__PURE__*/ S.Array(MemberGroup);
export type DataSourceUserId = string;
export interface MemberUser {
  userId: string;
  type?: MembershipType;
}
export const MemberUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.String, type: S.optional(MembershipType) }),
).annotate({ identifier: "MemberUser" }) as any as S.Schema<MemberUser>;
export type MemberUsers = MemberUser[];
export const MemberUsers = /*@__PURE__*/ S.Array(MemberUser);
export interface GroupMembers {
  memberGroups?: MemberGroup[];
  memberUsers?: MemberUser[];
  s3PathForGroupMembers?: S3;
}
export const GroupMembers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    memberGroups: S.optional(MemberGroups),
    memberUsers: S.optional(MemberUsers),
    s3PathForGroupMembers: S.optional(S3),
  }),
).annotate({ identifier: "GroupMembers" }) as any as S.Schema<GroupMembers>;
export interface PutGroupRequest {
  applicationId: string;
  indexId: string;
  groupName: string;
  dataSourceId?: string;
  type: MembershipType;
  groupMembers: GroupMembers;
  roleArn?: string;
}
export const PutGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    groupName: S.String,
    dataSourceId: S.optional(S.String),
    type: MembershipType,
    groupMembers: GroupMembers,
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/indices/{indexId}/groups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutGroupRequest",
}) as any as S.Schema<PutGroupRequest>;
export interface PutGroupResponse {}
export const PutGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutGroupResponse",
}) as any as S.Schema<PutGroupResponse>;
export type QueryText = string;
export interface RetrieverContentSource {
  retrieverId: string;
}
export const RetrieverContentSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ retrieverId: S.String }),
).annotate({
  identifier: "RetrieverContentSource",
}) as any as S.Schema<RetrieverContentSource>;
export type ContentSource = { retriever: RetrieverContentSource };
export const ContentSource = /*@__PURE__*/ S.Union([
  S.Struct({ retriever: RetrieverContentSource }),
]);
export type MaxResults = number;
export interface SearchRelevantContentRequest {
  applicationId: string;
  queryText: string;
  contentSource: ContentSource;
  attributeFilter?: AttributeFilter;
  maxResults?: number;
  nextToken?: string;
}
export const SearchRelevantContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    queryText: S.String,
    contentSource: ContentSource,
    attributeFilter: S.optional(AttributeFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/relevant-content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchRelevantContentRequest",
}) as any as S.Schema<SearchRelevantContentRequest>;
export type ScoreConfidence =
  | "VERY_HIGH"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NOT_AVAILABLE"
  | (string & {});
export const ScoreConfidence = S.String;

export interface ScoreAttributes {
  scoreConfidence?: ScoreConfidence;
}
export const ScoreAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scoreConfidence: S.optional(ScoreConfidence) }),
).annotate({
  identifier: "ScoreAttributes",
}) as any as S.Schema<ScoreAttributes>;
export interface RelevantContent {
  content?: string;
  documentId?: string;
  documentTitle?: string;
  documentUri?: string;
  documentAttributes?: DocumentAttribute[];
  scoreAttributes?: ScoreAttributes;
}
export const RelevantContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: S.optional(S.String),
    documentId: S.optional(S.String),
    documentTitle: S.optional(S.String),
    documentUri: S.optional(S.String),
    documentAttributes: S.optional(DocumentAttributes),
    scoreAttributes: S.optional(ScoreAttributes),
  }),
).annotate({
  identifier: "RelevantContent",
}) as any as S.Schema<RelevantContent>;
export type RelevantContentList = RelevantContent[];
export const RelevantContentList = /*@__PURE__*/ S.Array(RelevantContent);
export interface SearchRelevantContentResponse {
  relevantContent?: RelevantContent[];
  nextToken?: string;
}
export const SearchRelevantContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    relevantContent: S.optional(RelevantContentList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchRelevantContentResponse",
}) as any as S.Schema<SearchRelevantContentResponse>;
export interface StartDataSourceSyncJobRequest {
  dataSourceId: string;
  applicationId: string;
  indexId: string;
}
export const StartDataSourceSyncJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/startsync",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDataSourceSyncJobRequest",
}) as any as S.Schema<StartDataSourceSyncJobRequest>;
export interface StartDataSourceSyncJobResponse {
  executionId?: string;
}
export const StartDataSourceSyncJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ executionId: S.optional(S.String) }),
).annotate({
  identifier: "StartDataSourceSyncJobResponse",
}) as any as S.Schema<StartDataSourceSyncJobResponse>;
export interface StopDataSourceSyncJobRequest {
  dataSourceId: string;
  applicationId: string;
  indexId: string;
}
export const StopDataSourceSyncJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}/stopsync",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDataSourceSyncJobRequest",
}) as any as S.Schema<StopDataSourceSyncJobRequest>;
export interface StopDataSourceSyncJobResponse {}
export const StopDataSourceSyncJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopDataSourceSyncJobResponse",
}) as any as S.Schema<StopDataSourceSyncJobResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tags/{resourceARN}" }),
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/tags/{resourceARN}" }),
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
  applicationId: string;
  identityCenterInstanceArn?: string;
  displayName?: string;
  description?: string;
  roleArn?: string;
  attachmentsConfiguration?: AttachmentsConfiguration;
  qAppsConfiguration?: QAppsConfiguration;
  personalizationConfiguration?: PersonalizationConfiguration;
  autoSubscriptionConfiguration?: AutoSubscriptionConfiguration;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    identityCenterInstanceArn: S.optional(S.String),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    roleArn: S.optional(S.String),
    attachmentsConfiguration: S.optional(AttachmentsConfiguration),
    qAppsConfiguration: S.optional(QAppsConfiguration),
    personalizationConfiguration: S.optional(PersonalizationConfiguration),
    autoSubscriptionConfiguration: S.optional(AutoSubscriptionConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/applications/{applicationId}" }),
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
export interface OrchestrationConfiguration {
  control: OrchestrationControl;
}
export const OrchestrationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ control: OrchestrationControl }),
).annotate({
  identifier: "OrchestrationConfiguration",
}) as any as S.Schema<OrchestrationConfiguration>;
export interface BlockedPhrasesConfigurationUpdate {
  blockedPhrasesToCreateOrUpdate?: string[];
  blockedPhrasesToDelete?: string[];
  systemMessageOverride?: string;
}
export const BlockedPhrasesConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blockedPhrasesToCreateOrUpdate: S.optional(BlockedPhrases),
    blockedPhrasesToDelete: S.optional(BlockedPhrases),
    systemMessageOverride: S.optional(S.String),
  }),
).annotate({
  identifier: "BlockedPhrasesConfigurationUpdate",
}) as any as S.Schema<BlockedPhrasesConfigurationUpdate>;
export interface CreatorModeConfiguration {
  creatorModeControl: CreatorModeControl;
}
export const CreatorModeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ creatorModeControl: CreatorModeControl }),
).annotate({
  identifier: "CreatorModeConfiguration",
}) as any as S.Schema<CreatorModeConfiguration>;
export interface UpdateChatControlsConfigurationRequest {
  applicationId: string;
  clientToken?: string;
  responseScope?: ResponseScope;
  orchestrationConfiguration?: OrchestrationConfiguration;
  blockedPhrasesConfigurationUpdate?: BlockedPhrasesConfigurationUpdate;
  topicConfigurationsToCreateOrUpdate?: TopicConfiguration[];
  topicConfigurationsToDelete?: TopicConfiguration[];
  creatorModeConfiguration?: CreatorModeConfiguration;
  hallucinationReductionConfiguration?: HallucinationReductionConfiguration;
}
export const UpdateChatControlsConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      responseScope: S.optional(ResponseScope),
      orchestrationConfiguration: S.optional(OrchestrationConfiguration),
      blockedPhrasesConfigurationUpdate: S.optional(
        BlockedPhrasesConfigurationUpdate,
      ),
      topicConfigurationsToCreateOrUpdate: S.optional(TopicConfigurations),
      topicConfigurationsToDelete: S.optional(TopicConfigurations),
      creatorModeConfiguration: S.optional(CreatorModeConfiguration),
      hallucinationReductionConfiguration: S.optional(
        HallucinationReductionConfiguration,
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/applications/{applicationId}/chatcontrols",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateChatControlsConfigurationRequest",
}) as any as S.Schema<UpdateChatControlsConfigurationRequest>;
export interface UpdateChatControlsConfigurationResponse {}
export const UpdateChatControlsConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateChatControlsConfigurationResponse",
}) as any as S.Schema<UpdateChatControlsConfigurationResponse>;
export interface UpdateChatResponseConfigurationRequest {
  applicationId: string;
  chatResponseConfigurationId: string;
  displayName?: string;
  responseConfigurations: { [key: string]: ResponseConfiguration | undefined };
  clientToken?: string;
}
export const UpdateChatResponseConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      applicationId: S.String.pipe(T.HttpLabel("applicationId")),
      chatResponseConfigurationId: S.String.pipe(
        T.HttpLabel("chatResponseConfigurationId"),
      ),
      displayName: S.optional(S.String),
      responseConfigurations: ResponseConfigurations,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/applications/{applicationId}/chatresponseconfigurations/{chatResponseConfigurationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateChatResponseConfigurationRequest",
}) as any as S.Schema<UpdateChatResponseConfigurationRequest>;
export interface UpdateChatResponseConfigurationResponse {}
export const UpdateChatResponseConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateChatResponseConfigurationResponse",
}) as any as S.Schema<UpdateChatResponseConfigurationResponse>;
export interface UpdateDataAccessorRequest {
  applicationId: string;
  dataAccessorId: string;
  actionConfigurations: ActionConfiguration[];
  authenticationDetail?: DataAccessorAuthenticationDetail;
  displayName?: string | redacted.Redacted<string>;
}
export const UpdateDataAccessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    dataAccessorId: S.String.pipe(T.HttpLabel("dataAccessorId")),
    actionConfigurations: ActionConfigurationList,
    authenticationDetail: S.optional(DataAccessorAuthenticationDetail),
    displayName: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/dataaccessors/{dataAccessorId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataAccessorRequest",
}) as any as S.Schema<UpdateDataAccessorRequest>;
export interface UpdateDataAccessorResponse {}
export const UpdateDataAccessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDataAccessorResponse",
}) as any as S.Schema<UpdateDataAccessorResponse>;
export interface UpdateDataSourceRequest {
  applicationId: string;
  indexId: string;
  dataSourceId: string;
  displayName?: string;
  configuration?: any;
  vpcConfiguration?: DataSourceVpcConfiguration;
  description?: string;
  syncSchedule?: string;
  roleArn?: string;
  documentEnrichmentConfiguration?: DocumentEnrichmentConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
}
export const UpdateDataSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
    displayName: S.optional(S.String),
    configuration: S.optional(S.Any),
    vpcConfiguration: S.optional(DataSourceVpcConfiguration),
    description: S.optional(S.String),
    syncSchedule: S.optional(S.String),
    roleArn: S.optional(S.String),
    documentEnrichmentConfiguration: S.optional(
      DocumentEnrichmentConfiguration,
    ),
    mediaExtractionConfiguration: S.optional(MediaExtractionConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/indices/{indexId}/datasources/{dataSourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataSourceRequest",
}) as any as S.Schema<UpdateDataSourceRequest>;
export interface UpdateDataSourceResponse {}
export const UpdateDataSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDataSourceResponse",
}) as any as S.Schema<UpdateDataSourceResponse>;
export interface UpdateIndexRequest {
  applicationId: string;
  indexId: string;
  displayName?: string;
  description?: string;
  capacityConfiguration?: IndexCapacityConfiguration;
  documentAttributeConfigurations?: DocumentAttributeConfiguration[];
}
export const UpdateIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    indexId: S.String.pipe(T.HttpLabel("indexId")),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    capacityConfiguration: S.optional(IndexCapacityConfiguration),
    documentAttributeConfigurations: S.optional(
      DocumentAttributeConfigurations,
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/indices/{indexId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIndexRequest",
}) as any as S.Schema<UpdateIndexRequest>;
export interface UpdateIndexResponse {}
export const UpdateIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIndexResponse",
}) as any as S.Schema<UpdateIndexResponse>;
export interface UpdatePluginRequest {
  applicationId: string;
  pluginId: string;
  displayName?: string;
  state?: PluginState;
  serverUrl?: string;
  customPluginConfiguration?: CustomPluginConfiguration;
  authConfiguration?: PluginAuthConfiguration;
}
export const UpdatePluginRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    pluginId: S.String.pipe(T.HttpLabel("pluginId")),
    displayName: S.optional(S.String),
    state: S.optional(PluginState),
    serverUrl: S.optional(S.String),
    customPluginConfiguration: S.optional(CustomPluginConfiguration),
    authConfiguration: S.optional(PluginAuthConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/plugins/{pluginId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePluginRequest",
}) as any as S.Schema<UpdatePluginRequest>;
export interface UpdatePluginResponse {}
export const UpdatePluginResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePluginResponse",
}) as any as S.Schema<UpdatePluginResponse>;
export interface UpdateRetrieverRequest {
  applicationId: string;
  retrieverId: string;
  configuration?: RetrieverConfiguration;
  displayName?: string;
  roleArn?: string;
}
export const UpdateRetrieverRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    retrieverId: S.String.pipe(T.HttpLabel("retrieverId")),
    configuration: S.optional(RetrieverConfiguration),
    displayName: S.optional(S.String),
    roleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/retrievers/{retrieverId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRetrieverRequest",
}) as any as S.Schema<UpdateRetrieverRequest>;
export interface UpdateRetrieverResponse {}
export const UpdateRetrieverResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRetrieverResponse",
}) as any as S.Schema<UpdateRetrieverResponse>;
export interface UpdateSubscriptionRequest {
  applicationId: string;
  subscriptionId: string;
  type: SubscriptionType;
}
export const UpdateSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
    type: SubscriptionType,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/subscriptions/{subscriptionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSubscriptionRequest",
}) as any as S.Schema<UpdateSubscriptionRequest>;
export interface UpdateSubscriptionResponse {
  subscriptionArn?: string;
  currentSubscription?: SubscriptionDetails;
  nextSubscription?: SubscriptionDetails;
}
export const UpdateSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptionArn: S.optional(S.String),
    currentSubscription: S.optional(SubscriptionDetails),
    nextSubscription: S.optional(SubscriptionDetails),
  }),
).annotate({
  identifier: "UpdateSubscriptionResponse",
}) as any as S.Schema<UpdateSubscriptionResponse>;
export interface UpdateUserRequest {
  applicationId: string;
  userId: string;
  userAliasesToUpdate?: UserAlias[];
  userAliasesToDelete?: UserAlias[];
}
export const UpdateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    userId: S.String.pipe(T.HttpLabel("userId")),
    userAliasesToUpdate: S.optional(UserAliases),
    userAliasesToDelete: S.optional(UserAliases),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/users/{userId}",
      }),
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
  userAliasesAdded?: UserAlias[];
  userAliasesUpdated?: UserAlias[];
  userAliasesDeleted?: UserAlias[];
}
export const UpdateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userAliasesAdded: S.optional(UserAliases),
    userAliasesUpdated: S.optional(UserAliases),
    userAliasesDeleted: S.optional(UserAliases),
  }),
).annotate({
  identifier: "UpdateUserResponse",
}) as any as S.Schema<UpdateUserResponse>;
export interface UpdateWebExperienceRequest {
  applicationId: string;
  webExperienceId: string;
  roleArn?: string;
  authenticationConfiguration?: WebExperienceAuthConfiguration;
  title?: string;
  subtitle?: string;
  welcomeMessage?: string;
  samplePromptsControlMode?: WebExperienceSamplePromptsControlMode;
  identityProviderConfiguration?: IdentityProviderConfiguration;
  origins?: string[];
  browserExtensionConfiguration?: BrowserExtensionConfiguration;
  customizationConfiguration?: CustomizationConfiguration;
}
export const UpdateWebExperienceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String.pipe(T.HttpLabel("applicationId")),
    webExperienceId: S.String.pipe(T.HttpLabel("webExperienceId")),
    roleArn: S.optional(S.String),
    authenticationConfiguration: S.optional(WebExperienceAuthConfiguration),
    title: S.optional(S.String),
    subtitle: S.optional(S.String),
    welcomeMessage: S.optional(S.String),
    samplePromptsControlMode: S.optional(WebExperienceSamplePromptsControlMode),
    identityProviderConfiguration: S.optional(IdentityProviderConfiguration),
    origins: S.optional(WebExperienceOrigins),
    browserExtensionConfiguration: S.optional(BrowserExtensionConfiguration),
    customizationConfiguration: S.optional(CustomizationConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/applications/{applicationId}/experiences/{webExperienceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWebExperienceRequest",
}) as any as S.Schema<UpdateWebExperienceRequest>;
export interface UpdateWebExperienceResponse {}
export const UpdateWebExperienceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWebExperienceResponse",
}) as any as S.Schema<UpdateWebExperienceResponse>;
export type ValidationExceptionReason =
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "UNKNOWN_OPERATION"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFields = ValidationExceptionField[];
export const ValidationExceptionFields = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociatePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates a permission policy for a Amazon Q Business application, allowing cross-account access for an ISV. This operation creates a new policy statement for the specified Amazon Q Business application. The policy statement defines the IAM actions that the ISV is allowed to perform on the Amazon Q Business application's resources.
 */
export const associatePermission: API.OperationMethod<
  AssociatePermissionRequest,
  AssociatePermissionResponse,
  AssociatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociatePermissionRequest,
  output: AssociatePermissionResponse,
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
  operationName: "AssociatePermission",
}));

export type BatchDeleteDocumentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Asynchronously deletes one or more documents added using the `BatchPutDocument` API from an Amazon Q Business index.
 *
 * You can see the progress of the deletion, and any error messages related to the process, by using CloudWatch.
 */
export const batchDeleteDocument: API.OperationMethod<
  BatchDeleteDocumentRequest,
  BatchDeleteDocumentResponse,
  BatchDeleteDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteDocumentRequest,
  output: BatchDeleteDocumentResponse,
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
  operationName: "BatchDeleteDocument",
}));

export type BatchPutDocumentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more documents to an Amazon Q Business index.
 *
 * You use this API to:
 *
 * - ingest your structured and unstructured documents and documents stored in an Amazon S3 bucket into an Amazon Q Business index.
 *
 * - add custom attributes to documents in an Amazon Q Business index.
 *
 * - attach an access control list to the documents added to an Amazon Q Business index.
 *
 * You can see the progress of the deletion, and any error messages related to the process, by using CloudWatch.
 */
export const batchPutDocument: API.OperationMethod<
  BatchPutDocumentRequest,
  BatchPutDocumentResponse,
  BatchPutDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutDocumentRequest,
  output: BatchPutDocumentResponse,
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
  operationName: "BatchPutDocument",
}));

export type CancelSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Unsubscribes a user or a group from their pricing tier in an Amazon Q Business application. An unsubscribed user or group loses all Amazon Q Business feature access at the start of next month.
 */
export const cancelSubscription: API.OperationMethod<
  CancelSubscriptionRequest,
  CancelSubscriptionResponse,
  CancelSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSubscriptionRequest,
  output: CancelSubscriptionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSubscription",
}));

export type ChatError =
  | AccessDeniedException
  | ConflictException
  | ExternalResourceException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts or continues a streaming Amazon Q Business conversation.
 */
export const chat: API.OperationMethod<
  ChatInput,
  ChatOutput,
  ChatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ChatInput,
  output: ChatOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExternalResourceException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Chat",
}));

export type ChatSyncError =
  | AccessDeniedException
  | ConflictException
  | ExternalResourceException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts or continues a non-streaming Amazon Q Business conversation.
 */
export const chatSync: API.OperationMethod<
  ChatSyncInput,
  ChatSyncOutput,
  ChatSyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ChatSyncInput,
  output: ChatSyncOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ExternalResourceException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ChatSync",
}));

export type CheckDocumentAccessError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Verifies if a user has access permissions for a specified document and returns the actual ACL attached to the document. Resolves user access on the document via user aliases and groups when verifying user access.
 */
export const checkDocumentAccess: API.OperationMethod<
  CheckDocumentAccessRequest,
  CheckDocumentAccessResponse,
  CheckDocumentAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckDocumentAccessRequest,
  output: CheckDocumentAccessResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckDocumentAccess",
}));

export type CreateAnonymousWebExperienceUrlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a unique URL for anonymous Amazon Q Business web experience. This URL can only be used once and must be used within 5 minutes after it's generated.
 */
export const createAnonymousWebExperienceUrl: API.OperationMethod<
  CreateAnonymousWebExperienceUrlRequest,
  CreateAnonymousWebExperienceUrlResponse,
  CreateAnonymousWebExperienceUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAnonymousWebExperienceUrlRequest,
  output: CreateAnonymousWebExperienceUrlResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnonymousWebExperienceUrl",
}));

export type CreateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business application.
 *
 * There are new tiers for Amazon Q Business. Not all features in Amazon Q Business Pro are also available in Amazon Q Business Lite. For information on what's included in Amazon Q Business Lite and what's included in Amazon Q Business Pro, see Amazon Q Business tiers. You must use the Amazon Q Business console to assign subscription tiers to users.
 *
 * An Amazon Q Apps service linked role will be created if it's absent in the Amazon Web Services account when `QAppsConfiguration` is enabled in the request. For more information, see Using service-linked roles for Q Apps.
 *
 * When you create an application, Amazon Q Business may securely transmit data for processing from your selected Amazon Web Services region, but within your geography. For more information, see Cross region inference in Amazon Q Business.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateChatResponseConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new chat response configuration for an Amazon Q Business application. This operation establishes a set of parameters that define how the system generates and formats responses to user queries in chat interactions.
 */
export const createChatResponseConfiguration: API.OperationMethod<
  CreateChatResponseConfigurationRequest,
  CreateChatResponseConfigurationResponse,
  CreateChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChatResponseConfigurationRequest,
  output: CreateChatResponseConfigurationResponse,
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
  operationName: "CreateChatResponseConfiguration",
}));

export type CreateDataAccessorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new data accessor for an ISV to access data from a Amazon Q Business application. The data accessor is an entity that represents the ISV's access to the Amazon Q Business application's data. It includes the IAM role ARN for the ISV, a friendly name, and a set of action configurations that define the specific actions the ISV is allowed to perform and any associated data filters. When the data accessor is created, an IAM Identity Center application is also created to manage the ISV's identity and authentication for accessing the Amazon Q Business application.
 */
export const createDataAccessor: API.OperationMethod<
  CreateDataAccessorRequest,
  CreateDataAccessorResponse,
  CreateDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataAccessorRequest,
  output: CreateDataAccessorResponse,
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
  operationName: "CreateDataAccessor",
}));

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data source connector for an Amazon Q Business application.
 *
 * `CreateDataSource` is a synchronous operation. The operation returns 200 if the data source was successfully created. Otherwise, an exception is raised.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSourceRequest,
  output: CreateDataSourceResponse,
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
  operationName: "CreateDataSource",
}));

export type CreateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business index.
 *
 * To determine if index creation has completed, check the `Status` field returned from a call to `DescribeIndex`. The `Status` field is set to `ACTIVE` when the index is ready to use.
 *
 * Once the index is active, you can index your documents using the `BatchPutDocument` API or the `CreateDataSource` API.
 */
export const createIndex: API.OperationMethod<
  CreateIndexRequest,
  CreateIndexResponse,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIndexRequest,
  output: CreateIndexResponse,
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
  operationName: "CreateIndex",
}));

export type CreatePluginError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business plugin.
 */
export const createPlugin: API.OperationMethod<
  CreatePluginRequest,
  CreatePluginResponse,
  CreatePluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePluginRequest,
  output: CreatePluginResponse,
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
  operationName: "CreatePlugin",
}));

export type CreateRetrieverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a retriever to your Amazon Q Business application.
 */
export const createRetriever: API.OperationMethod<
  CreateRetrieverRequest,
  CreateRetrieverResponse,
  CreateRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRetrieverRequest,
  output: CreateRetrieverResponse,
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
  operationName: "CreateRetriever",
}));

export type CreateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Subscribes an IAM Identity Center user or a group to a pricing tier for an Amazon Q Business application.
 *
 * Amazon Q Business offers two subscription tiers: `Q_LITE` and `Q_BUSINESS`. Subscription tier determines feature access for the user. For more information on subscriptions and pricing tiers, see Amazon Q Business pricing.
 *
 * For an example IAM role policy for assigning subscriptions, see Set up required permissions in the Amazon Q Business User Guide.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionRequest,
  output: CreateSubscriptionResponse,
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
  operationName: "CreateSubscription",
}));

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a universally unique identifier (UUID) mapped to a list of local user ids within an application.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
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
  operationName: "CreateUser",
}));

export type CreateWebExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Q Business web experience.
 */
export const createWebExperience: API.OperationMethod<
  CreateWebExperienceRequest,
  CreateWebExperienceResponse,
  CreateWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebExperienceRequest,
  output: CreateWebExperienceResponse,
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
  operationName: "CreateWebExperience",
}));

export type DeleteApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business application.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteAttachmentError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an attachment associated with a specific Amazon Q Business conversation.
 */
export const deleteAttachment: API.OperationMethod<
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAttachmentRequest,
  output: DeleteAttachmentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttachment",
}));

export type DeleteChatControlsConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes chat controls configured for an existing Amazon Q Business application.
 */
export const deleteChatControlsConfiguration: API.OperationMethod<
  DeleteChatControlsConfigurationRequest,
  DeleteChatControlsConfigurationResponse,
  DeleteChatControlsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChatControlsConfigurationRequest,
  output: DeleteChatControlsConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChatControlsConfiguration",
}));

export type DeleteChatResponseConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified chat response configuration from an Amazon Q Business application.
 */
export const deleteChatResponseConfiguration: API.OperationMethod<
  DeleteChatResponseConfigurationRequest,
  DeleteChatResponseConfigurationResponse,
  DeleteChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChatResponseConfigurationRequest,
  output: DeleteChatResponseConfigurationResponse,
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
  operationName: "DeleteChatResponseConfiguration",
}));

export type DeleteConversationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business web experience conversation.
 */
export const deleteConversation: API.OperationMethod<
  DeleteConversationRequest,
  DeleteConversationResponse,
  DeleteConversationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConversationRequest,
  output: DeleteConversationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConversation",
}));

export type DeleteDataAccessorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified data accessor. This operation permanently removes the data accessor and its associated IAM Identity Center application. Any access granted to the ISV through this data accessor will be revoked.
 */
export const deleteDataAccessor: API.OperationMethod<
  DeleteDataAccessorRequest,
  DeleteDataAccessorResponse,
  DeleteDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataAccessorRequest,
  output: DeleteDataAccessorResponse,
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
  operationName: "DeleteDataAccessor",
}));

export type DeleteDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business data source connector. While the data source is being deleted, the `Status` field returned by a call to the `DescribeDataSource` API is set to `DELETING`.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataSourceRequest,
  output: DeleteDataSourceResponse,
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
  operationName: "DeleteDataSource",
}));

export type DeleteGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a group so that all users and sub groups that belong to the group can no longer access documents only available to that group. For example, after deleting the group "Summer Interns", all interns who belonged to that group no longer see intern-only documents in their chat results.
 *
 * If you want to delete, update, or replace users or sub groups of a group, you need to use the `PutGroup` operation. For example, if a user in the group "Engineering" leaves the engineering team and another user takes their place, you provide an updated list of users or sub groups that belong to the "Engineering" group when calling `PutGroup`.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResponse,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResponse,
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
  operationName: "DeleteGroup",
}));

export type DeleteIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business index.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexRequest,
  DeleteIndexResponse,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIndexRequest,
  output: DeleteIndexResponse,
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
  operationName: "DeleteIndex",
}));

export type DeletePluginError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business plugin.
 */
export const deletePlugin: API.OperationMethod<
  DeletePluginRequest,
  DeletePluginResponse,
  DeletePluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePluginRequest,
  output: DeletePluginResponse,
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
  operationName: "DeletePlugin",
}));

export type DeleteRetrieverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the retriever used by an Amazon Q Business application.
 */
export const deleteRetriever: API.OperationMethod<
  DeleteRetrieverRequest,
  DeleteRetrieverResponse,
  DeleteRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRetrieverRequest,
  output: DeleteRetrieverResponse,
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
  operationName: "DeleteRetriever",
}));

export type DeleteUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user by email id.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
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
  operationName: "DeleteUser",
}));

export type DeleteWebExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q Business web experience.
 */
export const deleteWebExperience: API.OperationMethod<
  DeleteWebExperienceRequest,
  DeleteWebExperienceResponse,
  DeleteWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebExperienceRequest,
  output: DeleteWebExperienceResponse,
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
  operationName: "DeleteWebExperience",
}));

export type DisassociatePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a permission policy from a Amazon Q Business application, revoking the cross-account access that was previously granted to an ISV. This operation deletes the specified policy statement from the application's permission policy.
 */
export const disassociatePermission: API.OperationMethod<
  DisassociatePermissionRequest,
  DisassociatePermissionResponse,
  DisassociatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociatePermissionRequest,
  output: DisassociatePermissionResponse,
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
  operationName: "DisassociatePermission",
}));

export type GetApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business application.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetChatControlsConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about chat controls configured for an existing Amazon Q Business application.
 */
export const getChatControlsConfiguration: API.PaginatedOperationMethod<
  GetChatControlsConfigurationRequest,
  GetChatControlsConfigurationResponse,
  GetChatControlsConfigurationError,
  Credentials | HttpClient.HttpClient,
  TopicConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetChatControlsConfigurationRequest,
  output: GetChatControlsConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChatControlsConfiguration",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "topicConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetChatResponseConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific chat response configuration from an Amazon Q Business application. This operation returns the complete configuration settings and metadata.
 */
export const getChatResponseConfiguration: API.OperationMethod<
  GetChatResponseConfigurationRequest,
  GetChatResponseConfigurationResponse,
  GetChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChatResponseConfigurationRequest,
  output: GetChatResponseConfigurationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChatResponseConfiguration",
}));

export type GetDataAccessorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specified data accessor. This operation returns details about the data accessor, including its display name, unique identifier, Amazon Resource Name (ARN), the associated Amazon Q Business application and IAM Identity Center application, the IAM role for the ISV, the action configurations, and the timestamps for when the data accessor was created and last updated.
 */
export const getDataAccessor: API.OperationMethod<
  GetDataAccessorRequest,
  GetDataAccessorResponse,
  GetDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataAccessorRequest,
  output: GetDataAccessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAccessor",
}));

export type GetDataSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business data source connector.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceRequest,
  GetDataSourceResponse,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSourceRequest,
  output: GetDataSourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetDocumentContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the content of a document that was ingested into Amazon Q Business. This API validates user authorization against document ACLs before returning a pre-signed URL for secure document access. You can download or view source documents referenced in chat responses through the URL.
 */
export const getDocumentContent: API.OperationMethod<
  GetDocumentContentRequest,
  GetDocumentContentResponse,
  GetDocumentContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentContentRequest,
  output: GetDocumentContentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocumentContent",
}));

export type GetGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a group by group name.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResponse,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupRequest,
  output: GetGroupResponse,
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
  operationName: "GetGroup",
}));

export type GetIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business index.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexResponse,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIndexRequest,
  output: GetIndexResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
}));

export type GetMediaError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | MediaTooLargeException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the image bytes corresponding to a media object. If you have implemented your own application with the Chat and ChatSync APIs, and have enabled content extraction from visual data in Amazon Q Business, you use the GetMedia API operation to download the images so you can show them in your UI with responses.
 *
 * For more information, see Extracting semantic meaning from images and visuals.
 */
export const getMedia: API.OperationMethod<
  GetMediaRequest,
  GetMediaResponse,
  GetMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaRequest,
  output: GetMediaResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    MediaTooLargeException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedia",
}));

export type GetPluginError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business plugin.
 */
export const getPlugin: API.OperationMethod<
  GetPluginRequest,
  GetPluginResponse,
  GetPluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPluginRequest,
  output: GetPluginResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlugin",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current permission policy for a Amazon Q Business application. The policy is returned as a JSON-formatted string and defines the IAM actions that are allowed or denied for the application's resources.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetRetrieverError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing retriever used by an Amazon Q Business application.
 */
export const getRetriever: API.OperationMethod<
  GetRetrieverRequest,
  GetRetrieverResponse,
  GetRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRetrieverRequest,
  output: GetRetrieverResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetriever",
}));

export type GetUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the universally unique identifier (UUID) associated with a local user in a data source.
 */
export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserRequest,
  output: GetUserResponse,
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
  operationName: "GetUser",
}));

export type GetWebExperienceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an existing Amazon Q Business web experience.
 */
export const getWebExperience: API.OperationMethod<
  GetWebExperienceRequest,
  GetWebExperienceResponse,
  GetWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebExperienceRequest,
  output: GetWebExperienceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebExperience",
}));

export type ListApplicationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Q Business applications.
 *
 * Amazon Q Business applications may securely transmit data for processing across Amazon Web Services Regions within your geography. For more information, see Cross region inference in Amazon Q Business.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAttachmentsError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of attachments associated with an Amazon Q Business web experience or a list of attachements associated with a specific Amazon Q Business conversation.
 */
export const listAttachments: API.PaginatedOperationMethod<
  ListAttachmentsRequest,
  ListAttachmentsResponse,
  ListAttachmentsError,
  Credentials | HttpClient.HttpClient,
  Attachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAttachmentsRequest,
  output: ListAttachmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAttachments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "attachments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListChatResponseConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all chat response configurations available in a specified Amazon Q Business application. This operation returns summary information about each configuration to help administrators manage and select appropriate response settings.
 */
export const listChatResponseConfigurations: API.PaginatedOperationMethod<
  ListChatResponseConfigurationsRequest,
  ListChatResponseConfigurationsResponse,
  ListChatResponseConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ChatResponseConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChatResponseConfigurationsRequest,
  output: ListChatResponseConfigurationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChatResponseConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "chatResponseConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConversationsError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists one or more Amazon Q Business conversations.
 */
export const listConversations: API.PaginatedOperationMethod<
  ListConversationsRequest,
  ListConversationsResponse,
  ListConversationsError,
  Credentials | HttpClient.HttpClient,
  Conversation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConversationsRequest,
  output: ListConversationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConversations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "conversations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataAccessorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data accessors for a Amazon Q Business application. This operation returns a paginated list of data accessor summaries, including the friendly name, unique identifier, ARN, associated IAM role, and creation/update timestamps for each data accessor.
 */
export const listDataAccessors: API.PaginatedOperationMethod<
  ListDataAccessorsRequest,
  ListDataAccessorsResponse,
  ListDataAccessorsError,
  Credentials | HttpClient.HttpClient,
  DataAccessor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataAccessorsRequest,
  output: ListDataAccessorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataAccessors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataAccessors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Q Business data source connectors that you have created.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSourcesRequest,
  output: ListDataSourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourceSyncJobsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about an Amazon Q Business data source connector synchronization.
 */
export const listDataSourceSyncJobs: API.PaginatedOperationMethod<
  ListDataSourceSyncJobsRequest,
  ListDataSourceSyncJobsResponse,
  ListDataSourceSyncJobsError,
  Credentials | HttpClient.HttpClient,
  DataSourceSyncJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSourceSyncJobsRequest,
  output: ListDataSourceSyncJobsResponse,
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
  operationName: "ListDataSourceSyncJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "history",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDocumentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of documents attached to an index.
 */
export const listDocuments: API.PaginatedOperationMethod<
  ListDocumentsRequest,
  ListDocumentsResponse,
  ListDocumentsError,
  Credentials | HttpClient.HttpClient,
  DocumentDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDocumentsRequest,
  output: ListDocumentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocuments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "documentDetailList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of groups that are mapped to users.
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsRequest,
  ListGroupsResponse,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGroupsRequest,
  output: ListGroupsResponse,
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
  operationName: "ListGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIndicesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Q Business indices you have created.
 */
export const listIndices: API.PaginatedOperationMethod<
  ListIndicesRequest,
  ListIndicesResponse,
  ListIndicesError,
  Credentials | HttpClient.HttpClient,
  Index
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIndicesRequest,
  output: ListIndicesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "indices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMessagesError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of messages associated with an Amazon Q Business web experience.
 */
export const listMessages: API.PaginatedOperationMethod<
  ListMessagesRequest,
  ListMessagesResponse,
  ListMessagesError,
  Credentials | HttpClient.HttpClient,
  Message
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMessagesRequest,
  output: ListMessagesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMessages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "messages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginActionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured Amazon Q Business actions for a specific plugin in an Amazon Q Business application.
 */
export const listPluginActions: API.PaginatedOperationMethod<
  ListPluginActionsRequest,
  ListPluginActionsResponse,
  ListPluginActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPluginActionsRequest,
  output: ListPluginActionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPluginActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured Amazon Q Business plugins.
 */
export const listPlugins: API.PaginatedOperationMethod<
  ListPluginsRequest,
  ListPluginsResponse,
  ListPluginsError,
  Credentials | HttpClient.HttpClient,
  Plugin
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPluginsRequest,
  output: ListPluginsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlugins",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "plugins",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginTypeActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured Amazon Q Business actions for any plugin type—both built-in and custom.
 */
export const listPluginTypeActions: API.PaginatedOperationMethod<
  ListPluginTypeActionsRequest,
  ListPluginTypeActionsResponse,
  ListPluginTypeActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPluginTypeActionsRequest,
  output: ListPluginTypeActionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPluginTypeActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPluginTypeMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists metadata for all Amazon Q Business plugin types.
 */
export const listPluginTypeMetadata: API.PaginatedOperationMethod<
  ListPluginTypeMetadataRequest,
  ListPluginTypeMetadataResponse,
  ListPluginTypeMetadataError,
  Credentials | HttpClient.HttpClient,
  PluginTypeMetadataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPluginTypeMetadataRequest,
  output: ListPluginTypeMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPluginTypeMetadata",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRetrieversError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the retriever used by an Amazon Q Business application.
 */
export const listRetrievers: API.PaginatedOperationMethod<
  ListRetrieversRequest,
  ListRetrieversResponse,
  ListRetrieversError,
  Credentials | HttpClient.HttpClient,
  Retriever
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRetrieversRequest,
  output: ListRetrieversResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrievers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "retrievers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all subscriptions created in an Amazon Q Business application.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse,
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
  operationName: "ListSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subscriptions",
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
 * Gets a list of tags associated with a specified resource. Amazon Q Business applications and data sources can have tags associated with them.
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

export type ListWebExperiencesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists one or more Amazon Q Business Web Experiences.
 */
export const listWebExperiences: API.PaginatedOperationMethod<
  ListWebExperiencesRequest,
  ListWebExperiencesResponse,
  ListWebExperiencesError,
  Credentials | HttpClient.HttpClient,
  WebExperience
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWebExperiencesRequest,
  output: ListWebExperiencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebExperiences",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "webExperiences",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables your end user to provide feedback on their Amazon Q Business generated chat responses.
 */
export const putFeedback: API.OperationMethod<
  PutFeedbackRequest,
  PutFeedbackResponse,
  PutFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFeedbackRequest,
  output: PutFeedbackResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFeedback",
}));

export type PutGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create, or updates, a mapping of users—who have access to a document—to groups.
 *
 * You can also map sub groups to groups. For example, the group "Company Intellectual Property Teams" includes sub groups "Research" and "Engineering". These sub groups include their own list of users or people who work in these teams. Only users who work in research and engineering, and therefore belong in the intellectual property group, can see top-secret company documents in their Amazon Q Business chat results.
 *
 * There are two options for creating groups, either passing group members inline or using an S3 file via the S3PathForGroupMembers field. For inline groups, there is a limit of 1000 members per group and for provided S3 files there is a limit of 100 thousand members. When creating a group using an S3 file, you provide both an S3 file and a `RoleArn` for Amazon Q Buisness to access the file.
 */
export const putGroup: API.OperationMethod<
  PutGroupRequest,
  PutGroupResponse,
  PutGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutGroupRequest,
  output: PutGroupResponse,
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
  operationName: "PutGroup",
}));

export type SearchRelevantContentError =
  | AccessDeniedException
  | InternalServerException
  | LicenseNotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches for relevant content in a Amazon Q Business application based on a query. This operation takes a search query text, the Amazon Q Business application identifier, and optional filters (such as content source and maximum results) as input. It returns a list of relevant content items, where each item includes the content text, the unique document identifier, the document title, the document URI, any relevant document attributes, and score attributes indicating the confidence level of the relevance.
 */
export const searchRelevantContent: API.PaginatedOperationMethod<
  SearchRelevantContentRequest,
  SearchRelevantContentResponse,
  SearchRelevantContentError,
  Credentials | HttpClient.HttpClient,
  RelevantContent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchRelevantContentRequest,
  output: SearchRelevantContentResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    LicenseNotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRelevantContent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "relevantContent",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartDataSourceSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a data source connector synchronization job. If a synchronization job is already in progress, Amazon Q Business returns a `ConflictException`.
 */
export const startDataSourceSyncJob: API.OperationMethod<
  StartDataSourceSyncJobRequest,
  StartDataSourceSyncJobResponse,
  StartDataSourceSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataSourceSyncJobRequest,
  output: StartDataSourceSyncJobResponse,
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
  operationName: "StartDataSourceSyncJob",
}));

export type StopDataSourceSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an Amazon Q Business data source connector synchronization job already in progress.
 */
export const stopDataSourceSyncJob: API.OperationMethod<
  StopDataSourceSyncJobRequest,
  StopDataSourceSyncJobResponse,
  StopDataSourceSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDataSourceSyncJobRequest,
  output: StopDataSourceSyncJobResponse,
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
  operationName: "StopDataSourceSyncJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tag to the specified Amazon Q Business application or data source resource. If the tag already exists, the existing value is replaced with the new value.
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
    ConflictException,
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
 * Removes a tag from an Amazon Q Business application or a data source.
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

export type UpdateApplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Q Business application.
 *
 * Amazon Q Business applications may securely transmit data for processing across Amazon Web Services Regions within your geography. For more information, see Cross region inference in Amazon Q Business.
 *
 * An Amazon Q Apps service-linked role will be created if it's absent in the Amazon Web Services account when `QAppsConfiguration` is enabled in the request. For more information, see Using service-linked roles for Q Apps.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateChatControlsConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a set of chat controls configured for an existing Amazon Q Business application.
 */
export const updateChatControlsConfiguration: API.OperationMethod<
  UpdateChatControlsConfigurationRequest,
  UpdateChatControlsConfigurationResponse,
  UpdateChatControlsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChatControlsConfigurationRequest,
  output: UpdateChatControlsConfigurationResponse,
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
  operationName: "UpdateChatControlsConfiguration",
}));

export type UpdateChatResponseConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing chat response configuration in an Amazon Q Business application. This operation allows administrators to modify configuration settings, display name, and response parameters to refine how the system generates responses.
 */
export const updateChatResponseConfiguration: API.OperationMethod<
  UpdateChatResponseConfigurationRequest,
  UpdateChatResponseConfigurationResponse,
  UpdateChatResponseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChatResponseConfigurationRequest,
  output: UpdateChatResponseConfigurationResponse,
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
  operationName: "UpdateChatResponseConfiguration",
}));

export type UpdateDataAccessorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing data accessor. This operation allows modifying the action configurations (the allowed actions and associated filters) and the display name of the data accessor. It does not allow changing the IAM role associated with the data accessor or other core properties of the data accessor.
 */
export const updateDataAccessor: API.OperationMethod<
  UpdateDataAccessorRequest,
  UpdateDataAccessorResponse,
  UpdateDataAccessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataAccessorRequest,
  output: UpdateDataAccessorResponse,
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
  operationName: "UpdateDataAccessor",
}));

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Q Business data source connector.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataSourceRequest,
  output: UpdateDataSourceResponse,
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
  operationName: "UpdateDataSource",
}));

export type UpdateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Q Business index.
 */
export const updateIndex: API.OperationMethod<
  UpdateIndexRequest,
  UpdateIndexResponse,
  UpdateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIndexRequest,
  output: UpdateIndexResponse,
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
  operationName: "UpdateIndex",
}));

export type UpdatePluginError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Q Business plugin.
 */
export const updatePlugin: API.OperationMethod<
  UpdatePluginRequest,
  UpdatePluginResponse,
  UpdatePluginError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePluginRequest,
  output: UpdatePluginResponse,
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
  operationName: "UpdatePlugin",
}));

export type UpdateRetrieverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the retriever used for your Amazon Q Business application.
 */
export const updateRetriever: API.OperationMethod<
  UpdateRetrieverRequest,
  UpdateRetrieverResponse,
  UpdateRetrieverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRetrieverRequest,
  output: UpdateRetrieverResponse,
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
  operationName: "UpdateRetriever",
}));

export type UpdateSubscriptionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the pricing tier for an Amazon Q Business subscription. Upgrades are instant. Downgrades apply at the start of the next month. Subscription tier determines feature access for the user. For more information on subscriptions and pricing tiers, see Amazon Q Business pricing.
 */
export const updateSubscription: API.OperationMethod<
  UpdateSubscriptionRequest,
  UpdateSubscriptionResponse,
  UpdateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriptionRequest,
  output: UpdateSubscriptionResponse,
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
  operationName: "UpdateSubscription",
}));

export type UpdateUserError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a information associated with a user id.
 */
export const updateUser: API.OperationMethod<
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserRequest,
  output: UpdateUserResponse,
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
  operationName: "UpdateUser",
}));

export type UpdateWebExperienceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Amazon Q Business web experience.
 */
export const updateWebExperience: API.OperationMethod<
  UpdateWebExperienceRequest,
  UpdateWebExperienceResponse,
  UpdateWebExperienceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWebExperienceRequest,
  output: UpdateWebExperienceResponse,
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
  operationName: "UpdateWebExperience",
}));
