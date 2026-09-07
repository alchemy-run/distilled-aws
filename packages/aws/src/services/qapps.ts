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
  sdkId: "QApps",
  serviceShapeName: "QAppsService",
});
const auth = T.AwsAuthSigv4({ name: "qapps" });
const ver = T.ServiceVersion("2023-11-27");
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
              `https://data.qapps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://data.qapps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.qapps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://data.qapps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ContentTooLargeException
  extends /*@__PURE__*/ S.TaggedError<ContentTooLargeException>()(
    "ContentTooLargeException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
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
      serviceCode: S.String,
      quotaCode: S.String,
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type InstanceId = string;
export type UUID = string;
export interface AssociateLibraryItemReviewInput {
  instanceId: string;
  libraryItemId: string;
}
export const AssociateLibraryItemReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    libraryItemId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.associateItemRating" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateLibraryItemReviewInput",
}) as any as S.Schema<AssociateLibraryItemReviewInput>;
export interface AssociateLibraryItemReviewResponse {}
export const AssociateLibraryItemReviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateLibraryItemReviewResponse",
}) as any as S.Schema<AssociateLibraryItemReviewResponse>;
export interface AssociateQAppWithUserInput {
  instanceId: string;
  appId: string;
}
export const AssociateQAppWithUserInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.install" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateQAppWithUserInput",
}) as any as S.Schema<AssociateQAppWithUserInput>;
export interface AssociateQAppWithUserResponse {}
export const AssociateQAppWithUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateQAppWithUserResponse",
}) as any as S.Schema<AssociateQAppWithUserResponse>;
export interface BatchCreateCategoryInputCategory {
  id?: string;
  title: string;
  color?: string;
}
export const BatchCreateCategoryInputCategory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    title: S.String,
    color: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchCreateCategoryInputCategory",
}) as any as S.Schema<BatchCreateCategoryInputCategory>;
export type BatchCreateCategoryInputCategoryList =
  BatchCreateCategoryInputCategory[];
export const BatchCreateCategoryInputCategoryList = /*@__PURE__*/ S.Array(
  BatchCreateCategoryInputCategory,
);
export interface BatchCreateCategoryInput {
  instanceId: string;
  categories: BatchCreateCategoryInputCategory[];
}
export const BatchCreateCategoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    categories: BatchCreateCategoryInputCategoryList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.createCategories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchCreateCategoryInput",
}) as any as S.Schema<BatchCreateCategoryInput>;
export interface BatchCreateCategoryResponse {}
export const BatchCreateCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchCreateCategoryResponse",
}) as any as S.Schema<BatchCreateCategoryResponse>;
export type DeleteCategoryInputList = string[];
export const DeleteCategoryInputList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteCategoryInput {
  instanceId: string;
  categories: string[];
}
export const BatchDeleteCategoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    categories: DeleteCategoryInputList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.deleteCategories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteCategoryInput",
}) as any as S.Schema<BatchDeleteCategoryInput>;
export interface BatchDeleteCategoryResponse {}
export const BatchDeleteCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchDeleteCategoryResponse",
}) as any as S.Schema<BatchDeleteCategoryResponse>;
export interface CategoryInput {
  id: string;
  title: string;
  color?: string;
}
export const CategoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, title: S.String, color: S.optional(S.String) }),
).annotate({ identifier: "CategoryInput" }) as any as S.Schema<CategoryInput>;
export type CategoryListInput = CategoryInput[];
export const CategoryListInput = /*@__PURE__*/ S.Array(CategoryInput);
export interface BatchUpdateCategoryInput {
  instanceId: string;
  categories: CategoryInput[];
}
export const BatchUpdateCategoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    categories: CategoryListInput,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.updateCategories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateCategoryInput",
}) as any as S.Schema<BatchUpdateCategoryInput>;
export interface BatchUpdateCategoryResponse {}
export const BatchUpdateCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "BatchUpdateCategoryResponse",
}) as any as S.Schema<BatchUpdateCategoryResponse>;
export type AppVersion = number;
export type CategoryIdList = string[];
export const CategoryIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateLibraryItemInput {
  instanceId: string;
  appId: string;
  appVersion: number;
  categories: string[];
}
export const CreateLibraryItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
    appVersion: S.Number,
    categories: CategoryIdList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.createItem" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLibraryItemInput",
}) as any as S.Schema<CreateLibraryItemInput>;
export type QAppsTimestamp = Date;
export interface CreateLibraryItemOutput {
  libraryItemId: string;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isVerified?: boolean;
}
export const CreateLibraryItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    libraryItemId: S.String,
    status: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    ratingCount: S.Number,
    isVerified: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreateLibraryItemOutput",
}) as any as S.Schema<CreateLibraryItemOutput>;
export type Filename = string;
export type DocumentScope = "APPLICATION" | "SESSION" | (string & {});
export const DocumentScope = /*@__PURE__*/ S.String;

export interface CreatePresignedUrlInput {
  instanceId: string;
  cardId: string;
  appId: string;
  fileContentsSha256: string;
  fileName: string;
  scope: DocumentScope;
  sessionId?: string;
}
export const CreatePresignedUrlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    cardId: S.String,
    appId: S.String,
    fileContentsSha256: S.String,
    fileName: S.String,
    scope: DocumentScope,
    sessionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.createPresignedUrl" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePresignedUrlInput",
}) as any as S.Schema<CreatePresignedUrlInput>;
export type PresignedUrlFields = { [key: string]: string | undefined };
export const PresignedUrlFields = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreatePresignedUrlOutput {
  fileId: string;
  presignedUrl: string;
  presignedUrlFields: { [key: string]: string | undefined };
  presignedUrlExpiration: Date;
}
export const CreatePresignedUrlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fileId: S.String,
    presignedUrl: S.String,
    presignedUrlFields: PresignedUrlFields,
    presignedUrlExpiration: T.DateFromString.pipe(
      T.TimestampFormat("date-time"),
    ),
  }),
).annotate({
  identifier: "CreatePresignedUrlOutput",
}) as any as S.Schema<CreatePresignedUrlOutput>;
export type Title = string;
export type Description = string;
export type CardType =
  | "text-input"
  | "q-query"
  | "file-upload"
  | "q-plugin"
  | "form-input"
  | (string & {});
export const CardType = /*@__PURE__*/ S.String;

export type Placeholder = string;
export type Default = string;
export interface TextInputCardInput {
  title: string;
  id: string;
  type: CardType;
  placeholder?: string;
  defaultValue?: string;
}
export const TextInputCardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    id: S.String,
    type: CardType,
    placeholder: S.optional(S.String),
    defaultValue: S.optional(S.String),
  }),
).annotate({
  identifier: "TextInputCardInput",
}) as any as S.Schema<TextInputCardInput>;
export type Prompt = string;
export type CardOutputSource = "approved-sources" | "llm" | (string & {});
export const CardOutputSource = /*@__PURE__*/ S.String;

export type AttributeFilters = AttributeFilter[];
export const AttributeFilters = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<AttributeFilter> => AttributeFilter).annotate({
    identifier: "AttributeFilter",
  }),
) as any as S.Schema<AttributeFilters>;
export type DocumentAttributeKey = string;
export type DocumentAttributeStringValue = string;
export type PlatoString = string;
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
export interface QQueryCardInput {
  title: string;
  id: string;
  type: CardType;
  prompt: string;
  outputSource?: CardOutputSource;
  attributeFilter?: AttributeFilter;
}
export const QQueryCardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    id: S.String,
    type: CardType,
    prompt: S.String,
    outputSource: S.optional(CardOutputSource),
    attributeFilter: S.optional(AttributeFilter),
  }),
).annotate({
  identifier: "QQueryCardInput",
}) as any as S.Schema<QQueryCardInput>;
export type PluginId = string;
export type ActionIdentifier = string;
export interface QPluginCardInput {
  title: string;
  id: string;
  type: CardType;
  prompt: string;
  pluginId: string;
  actionIdentifier?: string;
}
export const QPluginCardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    id: S.String,
    type: CardType,
    prompt: S.String,
    pluginId: S.String,
    actionIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "QPluginCardInput",
}) as any as S.Schema<QPluginCardInput>;
export interface FileUploadCardInput {
  title: string;
  id: string;
  type: CardType;
  filename?: string;
  fileId?: string;
  allowOverride?: boolean;
}
export const FileUploadCardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    id: S.String,
    type: CardType,
    filename: S.optional(S.String),
    fileId: S.optional(S.String),
    allowOverride: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FileUploadCardInput",
}) as any as S.Schema<FileUploadCardInput>;
export type FormInputCardMetadataSchema = unknown;
export interface FormInputCardMetadata {
  schema: any;
}
export const FormInputCardMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ schema: S.Any }),
).annotate({
  identifier: "FormInputCardMetadata",
}) as any as S.Schema<FormInputCardMetadata>;
export type InputCardComputeMode = "append" | "replace" | (string & {});
export const InputCardComputeMode = /*@__PURE__*/ S.String;

export interface FormInputCardInput {
  title: string;
  id: string;
  type: CardType;
  metadata: FormInputCardMetadata;
  computeMode?: InputCardComputeMode;
}
export const FormInputCardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    id: S.String,
    type: CardType,
    metadata: FormInputCardMetadata,
    computeMode: S.optional(InputCardComputeMode),
  }),
).annotate({
  identifier: "FormInputCardInput",
}) as any as S.Schema<FormInputCardInput>;
export type CardInput =
  | {
      textInput: TextInputCardInput;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery: QQueryCardInput;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin: QPluginCardInput;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload: FileUploadCardInput;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput: FormInputCardInput;
    };
export const CardInput = /*@__PURE__*/ S.Union([
  S.Struct({ textInput: TextInputCardInput }),
  S.Struct({ qQuery: QQueryCardInput }),
  S.Struct({ qPlugin: QPluginCardInput }),
  S.Struct({ fileUpload: FileUploadCardInput }),
  S.Struct({ formInput: FormInputCardInput }),
]);
export type CardList = CardInput[];
export const CardList = /*@__PURE__*/ S.Array(CardInput);
export type InitialPrompt = string;
export interface AppDefinitionInput {
  cards: CardInput[];
  initialPrompt?: string;
}
export const AppDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cards: CardList, initialPrompt: S.optional(S.String) }),
).annotate({
  identifier: "AppDefinitionInput",
}) as any as S.Schema<AppDefinitionInput>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateQAppInput {
  instanceId: string;
  title: string;
  description?: string;
  appDefinition: AppDefinitionInput;
  tags?: { [key: string]: string | undefined };
}
export const CreateQAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    title: S.String,
    description: S.optional(S.String),
    appDefinition: AppDefinitionInput,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQAppInput",
}) as any as S.Schema<CreateQAppInput>;
export type AppArn = string;
export type AppStatus = "PUBLISHED" | "DRAFT" | "DELETED" | (string & {});
export const AppStatus = /*@__PURE__*/ S.String;

export type AppRequiredCapability =
  | "FileUpload"
  | "CreatorMode"
  | "RetrievalMode"
  | "PluginMode"
  | (string & {});
export const AppRequiredCapability = /*@__PURE__*/ S.String;

export type AppRequiredCapabilities = AppRequiredCapability[];
export const AppRequiredCapabilities = /*@__PURE__*/ S.Array(
  AppRequiredCapability,
);
export interface CreateQAppOutput {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  initialPrompt?: string;
  appVersion: number;
  status: AppStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  requiredCapabilities?: AppRequiredCapability[];
}
export const CreateQAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appArn: S.String,
    title: S.String,
    description: S.optional(S.String),
    initialPrompt: S.optional(S.String),
    appVersion: S.Number,
    status: AppStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedBy: S.String,
    requiredCapabilities: S.optional(AppRequiredCapabilities),
  }),
).annotate({
  identifier: "CreateQAppOutput",
}) as any as S.Schema<CreateQAppOutput>;
export interface DeleteLibraryItemInput {
  instanceId: string;
  libraryItemId: string;
}
export const DeleteLibraryItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    libraryItemId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.deleteItem" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLibraryItemInput",
}) as any as S.Schema<DeleteLibraryItemInput>;
export interface DeleteLibraryItemResponse {}
export const DeleteLibraryItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLibraryItemResponse",
}) as any as S.Schema<DeleteLibraryItemResponse>;
export interface DeleteQAppInput {
  instanceId: string;
  appId: string;
}
export const DeleteQAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQAppInput",
}) as any as S.Schema<DeleteQAppInput>;
export interface DeleteQAppResponse {}
export const DeleteQAppResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQAppResponse",
}) as any as S.Schema<DeleteQAppResponse>;
export interface DescribeQAppPermissionsInput {
  instanceId: string;
  appId: string;
}
export const DescribeQAppPermissionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String.pipe(T.HttpQuery("appId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/apps.describeQAppPermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeQAppPermissionsInput",
}) as any as S.Schema<DescribeQAppPermissionsInput>;
export type Action = "read" | "write" | (string & {});
export const Action = /*@__PURE__*/ S.String;

export type UserType = "owner" | "user" | (string & {});
export const UserType = /*@__PURE__*/ S.String;

export interface PrincipalOutput {
  userId?: string;
  userType?: UserType;
  email?: string;
}
export const PrincipalOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userId: S.optional(S.String),
    userType: S.optional(UserType),
    email: S.optional(S.String),
  }),
).annotate({
  identifier: "PrincipalOutput",
}) as any as S.Schema<PrincipalOutput>;
export interface PermissionOutput {
  action: Action;
  principal: PrincipalOutput;
}
export const PermissionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: Action, principal: PrincipalOutput }),
).annotate({
  identifier: "PermissionOutput",
}) as any as S.Schema<PermissionOutput>;
export type PermissionsOutputList = PermissionOutput[];
export const PermissionsOutputList = /*@__PURE__*/ S.Array(PermissionOutput);
export interface DescribeQAppPermissionsOutput {
  resourceArn?: string;
  appId?: string;
  permissions?: PermissionOutput[];
}
export const DescribeQAppPermissionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    appId: S.optional(S.String),
    permissions: S.optional(PermissionsOutputList),
  }),
).annotate({
  identifier: "DescribeQAppPermissionsOutput",
}) as any as S.Schema<DescribeQAppPermissionsOutput>;
export interface DisassociateLibraryItemReviewInput {
  instanceId: string;
  libraryItemId: string;
}
export const DisassociateLibraryItemReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    libraryItemId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.disassociateItemRating" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateLibraryItemReviewInput",
}) as any as S.Schema<DisassociateLibraryItemReviewInput>;
export interface DisassociateLibraryItemReviewResponse {}
export const DisassociateLibraryItemReviewResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateLibraryItemReviewResponse",
}) as any as S.Schema<DisassociateLibraryItemReviewResponse>;
export interface DisassociateQAppFromUserInput {
  instanceId: string;
  appId: string;
}
export const DisassociateQAppFromUserInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.uninstall" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateQAppFromUserInput",
}) as any as S.Schema<DisassociateQAppFromUserInput>;
export interface DisassociateQAppFromUserResponse {}
export const DisassociateQAppFromUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateQAppFromUserResponse",
}) as any as S.Schema<DisassociateQAppFromUserResponse>;
export interface ExportQAppSessionDataInput {
  instanceId: string;
  sessionId: string;
}
export const ExportQAppSessionDataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtime.exportQAppSessionData" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportQAppSessionDataInput",
}) as any as S.Schema<ExportQAppSessionDataInput>;
export interface ExportQAppSessionDataOutput {
  csvFileLink: string;
  expiresAt: Date;
  sessionArn: string;
}
export const ExportQAppSessionDataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    csvFileLink: S.String,
    expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    sessionArn: S.String,
  }),
).annotate({
  identifier: "ExportQAppSessionDataOutput",
}) as any as S.Schema<ExportQAppSessionDataOutput>;
export interface GetLibraryItemInput {
  instanceId: string;
  libraryItemId: string;
  appId?: string;
}
export const GetLibraryItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    libraryItemId: S.String.pipe(T.HttpQuery("libraryItemId")),
    appId: S.optional(S.String).pipe(T.HttpQuery("appId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog.getItem" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLibraryItemInput",
}) as any as S.Schema<GetLibraryItemInput>;
export interface Category {
  id: string;
  title: string;
  color?: string;
  appCount?: number;
}
export const Category = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    title: S.String,
    color: S.optional(S.String),
    appCount: S.optional(S.Number),
  }),
).annotate({ identifier: "Category" }) as any as S.Schema<Category>;
export type CategoryList = Category[];
export const CategoryList = /*@__PURE__*/ S.Array(Category);
export interface GetLibraryItemOutput {
  libraryItemId: string;
  appId: string;
  appVersion: number;
  categories: Category[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isRatedByUser?: boolean;
  userCount?: number;
  isVerified?: boolean;
}
export const GetLibraryItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    libraryItemId: S.String,
    appId: S.String,
    appVersion: S.Number,
    categories: CategoryList,
    status: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    ratingCount: S.Number,
    isRatedByUser: S.optional(S.Boolean),
    userCount: S.optional(S.Number),
    isVerified: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetLibraryItemOutput",
}) as any as S.Schema<GetLibraryItemOutput>;
export interface GetQAppInput {
  instanceId: string;
  appId: string;
  appVersion?: number;
}
export const GetQAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String.pipe(T.HttpQuery("appId")),
    appVersion: S.optional(S.Number).pipe(T.HttpQuery("appVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/apps.get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetQAppInput" }) as any as S.Schema<GetQAppInput>;
export type DependencyList = string[];
export const DependencyList = /*@__PURE__*/ S.Array(S.String);
export interface TextInputCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  placeholder?: string;
  defaultValue?: string;
}
export const TextInputCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    title: S.String,
    dependencies: DependencyList,
    type: CardType,
    placeholder: S.optional(S.String),
    defaultValue: S.optional(S.String),
  }),
).annotate({ identifier: "TextInputCard" }) as any as S.Schema<TextInputCard>;
export type MemoryReferenceList = string[];
export const MemoryReferenceList = /*@__PURE__*/ S.Array(S.String);
export interface QQueryCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  prompt: string;
  outputSource: CardOutputSource;
  attributeFilter?: AttributeFilter;
  memoryReferences?: string[];
}
export const QQueryCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    title: S.String,
    dependencies: DependencyList,
    type: CardType,
    prompt: S.String,
    outputSource: CardOutputSource,
    attributeFilter: S.optional(AttributeFilter),
    memoryReferences: S.optional(MemoryReferenceList),
  }),
).annotate({ identifier: "QQueryCard" }) as any as S.Schema<QQueryCard>;
export type PluginType =
  | "SERVICE_NOW"
  | "SALESFORCE"
  | "JIRA"
  | "ZENDESK"
  | "CUSTOM"
  | "ASANA"
  | "ATLASSIAN_CONFLUENCE"
  | "GOOGLE_CALENDAR"
  | "JIRA_CLOUD"
  | "MICROSOFT_EXCHANGE"
  | "MICROSOFT_TEAMS"
  | "PAGERDUTY_ADVANCE"
  | "SALESFORCE_CRM"
  | "SERVICENOW_NOW_PLATFORM"
  | "SMARTSHEET"
  | "ZENDESK_SUITE"
  | (string & {});
export const PluginType = /*@__PURE__*/ S.String;

export interface QPluginCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  prompt: string;
  pluginType: PluginType;
  pluginId: string;
  actionIdentifier?: string;
}
export const QPluginCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    title: S.String,
    dependencies: DependencyList,
    type: CardType,
    prompt: S.String,
    pluginType: PluginType,
    pluginId: S.String,
    actionIdentifier: S.optional(S.String),
  }),
).annotate({ identifier: "QPluginCard" }) as any as S.Schema<QPluginCard>;
export interface FileUploadCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  filename?: string;
  fileId?: string;
  allowOverride?: boolean;
}
export const FileUploadCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    title: S.String,
    dependencies: DependencyList,
    type: CardType,
    filename: S.optional(S.String),
    fileId: S.optional(S.String),
    allowOverride: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FileUploadCard" }) as any as S.Schema<FileUploadCard>;
export interface FormInputCard {
  id: string;
  title: string;
  dependencies: string[];
  type: CardType;
  metadata: FormInputCardMetadata;
  computeMode?: InputCardComputeMode;
}
export const FormInputCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    title: S.String,
    dependencies: DependencyList,
    type: CardType,
    metadata: FormInputCardMetadata,
    computeMode: S.optional(InputCardComputeMode),
  }),
).annotate({ identifier: "FormInputCard" }) as any as S.Schema<FormInputCard>;
export type Card =
  | {
      textInput: TextInputCard;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery: QQueryCard;
      qPlugin?: never;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin: QPluginCard;
      fileUpload?: never;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload: FileUploadCard;
      formInput?: never;
    }
  | {
      textInput?: never;
      qQuery?: never;
      qPlugin?: never;
      fileUpload?: never;
      formInput: FormInputCard;
    };
export const Card = /*@__PURE__*/ S.Union([
  S.Struct({ textInput: TextInputCard }),
  S.Struct({ qQuery: QQueryCard }),
  S.Struct({ qPlugin: QPluginCard }),
  S.Struct({ fileUpload: FileUploadCard }),
  S.Struct({ formInput: FormInputCard }),
]);
export type CardModelList = Card[];
export const CardModelList = /*@__PURE__*/ S.Array(Card);
export interface AppDefinition {
  appDefinitionVersion: string;
  cards: Card[];
  canEdit?: boolean;
}
export const AppDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appDefinitionVersion: S.String,
    cards: CardModelList,
    canEdit: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AppDefinition" }) as any as S.Schema<AppDefinition>;
export interface GetQAppOutput {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  initialPrompt?: string;
  appVersion: number;
  status: AppStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  requiredCapabilities?: AppRequiredCapability[];
  appDefinition: AppDefinition;
}
export const GetQAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appArn: S.String,
    title: S.String,
    description: S.optional(S.String),
    initialPrompt: S.optional(S.String),
    appVersion: S.Number,
    status: AppStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedBy: S.String,
    requiredCapabilities: S.optional(AppRequiredCapabilities),
    appDefinition: AppDefinition,
  }),
).annotate({ identifier: "GetQAppOutput" }) as any as S.Schema<GetQAppOutput>;
export interface GetQAppSessionInput {
  instanceId: string;
  sessionId: string;
}
export const GetQAppSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runtime.getQAppSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQAppSessionInput",
}) as any as S.Schema<GetQAppSessionInput>;
export type SessionName = string;
export type ExecutionStatus =
  | "IN_PROGRESS"
  | "WAITING"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export interface Submission {
  value?: any;
  submissionId?: string;
  timestamp?: Date;
}
export const Submission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.Any),
    submissionId: S.optional(S.String),
    timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Submission" }) as any as S.Schema<Submission>;
export type SubmissionList = Submission[];
export const SubmissionList = /*@__PURE__*/ S.Array(Submission);
export interface CardStatus {
  currentState: ExecutionStatus;
  currentValue: string;
  submissions?: Submission[];
}
export const CardStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currentState: ExecutionStatus,
    currentValue: S.String,
    submissions: S.optional(SubmissionList),
  }),
).annotate({ identifier: "CardStatus" }) as any as S.Schema<CardStatus>;
export type CardStatusMap = { [key: string]: CardStatus | undefined };
export const CardStatusMap = /*@__PURE__*/ S.Record(
  S.String,
  CardStatus.pipe(S.optional),
);
export interface GetQAppSessionOutput {
  sessionId: string;
  sessionArn: string;
  sessionName?: string;
  appVersion?: number;
  latestPublishedAppVersion?: number;
  status: ExecutionStatus;
  cardStatus: { [key: string]: CardStatus | undefined };
  userIsHost?: boolean;
}
export const GetQAppSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionName: S.optional(S.String),
    appVersion: S.optional(S.Number),
    latestPublishedAppVersion: S.optional(S.Number),
    status: ExecutionStatus,
    cardStatus: CardStatusMap,
    userIsHost: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetQAppSessionOutput",
}) as any as S.Schema<GetQAppSessionOutput>;
export interface GetQAppSessionMetadataInput {
  instanceId: string;
  sessionId: string;
}
export const GetQAppSessionMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runtime.getQAppSessionMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQAppSessionMetadataInput",
}) as any as S.Schema<GetQAppSessionMetadataInput>;
export type SessionSharingEnabled = boolean;
export type SessionSharingAcceptResponses = boolean;
export type SessionSharingRevealCards = boolean;
export interface SessionSharingConfiguration {
  enabled: boolean;
  acceptResponses?: boolean;
  revealCards?: boolean;
}
export const SessionSharingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    acceptResponses: S.optional(S.Boolean),
    revealCards: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SessionSharingConfiguration",
}) as any as S.Schema<SessionSharingConfiguration>;
export interface GetQAppSessionMetadataOutput {
  sessionId: string;
  sessionArn: string;
  sessionName?: string;
  sharingConfiguration: SessionSharingConfiguration;
  sessionOwner?: boolean;
}
export const GetQAppSessionMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionName: S.optional(S.String),
    sharingConfiguration: SessionSharingConfiguration,
    sessionOwner: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetQAppSessionMetadataOutput",
}) as any as S.Schema<GetQAppSessionMetadataOutput>;
export interface ImportDocumentInput {
  instanceId: string;
  cardId: string;
  appId: string;
  fileContentsBase64: string;
  fileName: string;
  scope: DocumentScope;
  sessionId?: string;
}
export const ImportDocumentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    cardId: S.String,
    appId: S.String,
    fileContentsBase64: S.String,
    fileName: S.String,
    scope: DocumentScope,
    sessionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.importDocument" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportDocumentInput",
}) as any as S.Schema<ImportDocumentInput>;
export interface ImportDocumentOutput {
  fileId?: string;
}
export const ImportDocumentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileId: S.optional(S.String) }),
).annotate({
  identifier: "ImportDocumentOutput",
}) as any as S.Schema<ImportDocumentOutput>;
export interface ListCategoriesInput {
  instanceId: string;
}
export const ListCategoriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceId: S.String.pipe(T.HttpHeader("instance-id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog.listCategories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCategoriesInput",
}) as any as S.Schema<ListCategoriesInput>;
export type CategoriesList = Category[];
export const CategoriesList = /*@__PURE__*/ S.Array(Category);
export interface ListCategoriesOutput {
  categories?: Category[];
}
export const ListCategoriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ categories: S.optional(CategoriesList) }),
).annotate({
  identifier: "ListCategoriesOutput",
}) as any as S.Schema<ListCategoriesOutput>;
export type PageLimit = number;
export type PaginationToken = string;
export interface ListLibraryItemsInput {
  instanceId: string;
  limit?: number;
  nextToken?: string;
  categoryId?: string;
}
export const ListLibraryItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    categoryId: S.optional(S.String).pipe(T.HttpQuery("categoryId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog.list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLibraryItemsInput",
}) as any as S.Schema<ListLibraryItemsInput>;
export interface LibraryItemMember {
  libraryItemId: string;
  appId: string;
  appVersion: number;
  categories: Category[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isRatedByUser?: boolean;
  userCount?: number;
  isVerified?: boolean;
}
export const LibraryItemMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    libraryItemId: S.String,
    appId: S.String,
    appVersion: S.Number,
    categories: CategoryList,
    status: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    ratingCount: S.Number,
    isRatedByUser: S.optional(S.Boolean),
    userCount: S.optional(S.Number),
    isVerified: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LibraryItemMember",
}) as any as S.Schema<LibraryItemMember>;
export type LibraryItemList = LibraryItemMember[];
export const LibraryItemList = /*@__PURE__*/ S.Array(LibraryItemMember);
export interface ListLibraryItemsOutput {
  libraryItems?: LibraryItemMember[];
  nextToken?: string;
}
export const ListLibraryItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    libraryItems: S.optional(LibraryItemList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLibraryItemsOutput",
}) as any as S.Schema<ListLibraryItemsOutput>;
export interface ListQAppsInput {
  instanceId: string;
  limit?: number;
  nextToken?: string;
}
export const ListQAppsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    limit: S.optional(S.Number).pipe(T.HttpQuery("limit")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/apps.list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListQAppsInput" }) as any as S.Schema<ListQAppsInput>;
export interface UserAppItem {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  createdAt: Date;
  canEdit?: boolean;
  status?: string;
  isVerified?: boolean;
}
export const UserAppItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appArn: S.String,
    title: S.String,
    description: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    canEdit: S.optional(S.Boolean),
    status: S.optional(S.String),
    isVerified: S.optional(S.Boolean),
  }),
).annotate({ identifier: "UserAppItem" }) as any as S.Schema<UserAppItem>;
export type UserAppsList = UserAppItem[];
export const UserAppsList = /*@__PURE__*/ S.Array(UserAppItem);
export interface ListQAppsOutput {
  apps: UserAppItem[];
  nextToken?: string;
}
export const ListQAppsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apps: UserAppsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListQAppsOutput",
}) as any as S.Schema<ListQAppsOutput>;
export interface ListQAppSessionDataInput {
  instanceId: string;
  sessionId: string;
}
export const ListQAppSessionDataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String.pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/runtime.listQAppSessionData" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQAppSessionDataInput",
}) as any as S.Schema<ListQAppSessionDataInput>;
export type UserId = string;
export interface User {
  userId?: string;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userId: S.optional(S.String) }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export interface QAppSessionData {
  cardId: string;
  value?: any;
  user: User;
  submissionId?: string;
  timestamp?: Date;
}
export const QAppSessionData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cardId: S.String,
    value: S.optional(S.Any),
    user: User,
    submissionId: S.optional(S.String),
    timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "QAppSessionData",
}) as any as S.Schema<QAppSessionData>;
export type QAppSessionDataList = QAppSessionData[];
export const QAppSessionDataList = /*@__PURE__*/ S.Array(QAppSessionData);
export interface ListQAppSessionDataOutput {
  sessionId: string;
  sessionArn: string;
  sessionData?: QAppSessionData[];
  nextToken?: string;
}
export const ListQAppSessionDataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionData: S.optional(QAppSessionDataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQAppSessionDataOutput",
}) as any as S.Schema<ListQAppSessionDataOutput>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String.pipe(T.HttpLabel("resourceARN")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceARN}" }),
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
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type Sender = "USER" | "SYSTEM" | (string & {});
export const Sender = /*@__PURE__*/ S.String;

export interface ConversationMessage {
  body: string;
  type: Sender;
}
export const ConversationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ body: S.String, type: Sender }),
).annotate({
  identifier: "ConversationMessage",
}) as any as S.Schema<ConversationMessage>;
export type MessageList = ConversationMessage[];
export const MessageList = /*@__PURE__*/ S.Array(ConversationMessage);
export type PredictQAppInputOptions =
  | { conversation: ConversationMessage[]; problemStatement?: never }
  | { conversation?: never; problemStatement: string };
export const PredictQAppInputOptions = /*@__PURE__*/ S.Union([
  S.Struct({ conversation: MessageList }),
  S.Struct({ problemStatement: S.String }),
]);
export interface PredictQAppInput {
  instanceId: string;
  options?: PredictQAppInputOptions;
}
export const PredictQAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    options: S.optional(PredictQAppInputOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.predictQApp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PredictQAppInput",
}) as any as S.Schema<PredictQAppInput>;
export interface PredictAppDefinition {
  title: string;
  description?: string;
  appDefinition: AppDefinitionInput;
}
export const PredictAppDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.optional(S.String),
    appDefinition: AppDefinitionInput,
  }),
).annotate({
  identifier: "PredictAppDefinition",
}) as any as S.Schema<PredictAppDefinition>;
export interface PredictQAppOutput {
  app: PredictAppDefinition;
  problemStatement: string;
}
export const PredictQAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ app: PredictAppDefinition, problemStatement: S.String }),
).annotate({
  identifier: "PredictQAppOutput",
}) as any as S.Schema<PredictQAppOutput>;
export type SubmissionMutationKind = "edit" | "delete" | "add" | (string & {});
export const SubmissionMutationKind = /*@__PURE__*/ S.String;

export interface SubmissionMutation {
  submissionId: string;
  mutationType: SubmissionMutationKind;
}
export const SubmissionMutation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ submissionId: S.String, mutationType: SubmissionMutationKind }),
).annotate({
  identifier: "SubmissionMutation",
}) as any as S.Schema<SubmissionMutation>;
export interface CardValue {
  cardId: string;
  value: string;
  submissionMutation?: SubmissionMutation;
}
export const CardValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cardId: S.String,
    value: S.String,
    submissionMutation: S.optional(SubmissionMutation),
  }),
).annotate({ identifier: "CardValue" }) as any as S.Schema<CardValue>;
export type CardValueList = CardValue[];
export const CardValueList = /*@__PURE__*/ S.Array(CardValue);
export interface StartQAppSessionInput {
  instanceId: string;
  appId: string;
  appVersion: number;
  initialValues?: CardValue[];
  sessionId?: string;
  tags?: { [key: string]: string | undefined };
}
export const StartQAppSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
    appVersion: S.Number,
    initialValues: S.optional(CardValueList),
    sessionId: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtime.startQAppSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartQAppSessionInput",
}) as any as S.Schema<StartQAppSessionInput>;
export interface StartQAppSessionOutput {
  sessionId: string;
  sessionArn: string;
}
export const StartQAppSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionId: S.String, sessionArn: S.String }),
).annotate({
  identifier: "StartQAppSessionOutput",
}) as any as S.Schema<StartQAppSessionOutput>;
export interface StopQAppSessionInput {
  instanceId: string;
  sessionId: string;
}
export const StopQAppSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtime.deleteMiniAppRun" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopQAppSessionInput",
}) as any as S.Schema<StopQAppSessionInput>;
export interface StopQAppSessionResponse {}
export const StopQAppSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopQAppSessionResponse",
}) as any as S.Schema<StopQAppSessionResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceARN}" }),
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
      T.Http({ method: "DELETE", uri: "/tags/{resourceARN}" }),
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
export type LibraryItemStatus = "PUBLISHED" | "DISABLED" | (string & {});
export const LibraryItemStatus = /*@__PURE__*/ S.String;

export interface UpdateLibraryItemInput {
  instanceId: string;
  libraryItemId: string;
  status?: LibraryItemStatus;
  categories?: string[];
}
export const UpdateLibraryItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    libraryItemId: S.String,
    status: S.optional(LibraryItemStatus),
    categories: S.optional(CategoryIdList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.updateItem" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLibraryItemInput",
}) as any as S.Schema<UpdateLibraryItemInput>;
export interface UpdateLibraryItemOutput {
  libraryItemId: string;
  appId: string;
  appVersion: number;
  categories: Category[];
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt?: Date;
  updatedBy?: string;
  ratingCount: number;
  isRatedByUser?: boolean;
  userCount?: number;
  isVerified?: boolean;
}
export const UpdateLibraryItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    libraryItemId: S.String,
    appId: S.String,
    appVersion: S.Number,
    categories: CategoryList,
    status: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedBy: S.optional(S.String),
    ratingCount: S.Number,
    isRatedByUser: S.optional(S.Boolean),
    userCount: S.optional(S.Number),
    isVerified: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateLibraryItemOutput",
}) as any as S.Schema<UpdateLibraryItemOutput>;
export interface UpdateLibraryItemMetadataInput {
  instanceId: string;
  libraryItemId: string;
  isVerified?: boolean;
}
export const UpdateLibraryItemMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    libraryItemId: S.String,
    isVerified: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/catalog.updateItemMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLibraryItemMetadataInput",
}) as any as S.Schema<UpdateLibraryItemMetadataInput>;
export interface UpdateLibraryItemMetadataResponse {}
export const UpdateLibraryItemMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLibraryItemMetadataResponse",
}) as any as S.Schema<UpdateLibraryItemMetadataResponse>;
export interface UpdateQAppInput {
  instanceId: string;
  appId: string;
  title?: string;
  description?: string;
  appDefinition?: AppDefinitionInput;
}
export const UpdateQAppInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
    title: S.optional(S.String),
    description: S.optional(S.String),
    appDefinition: S.optional(AppDefinitionInput),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQAppInput",
}) as any as S.Schema<UpdateQAppInput>;
export interface UpdateQAppOutput {
  appId: string;
  appArn: string;
  title: string;
  description?: string;
  initialPrompt?: string;
  appVersion: number;
  status: AppStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  requiredCapabilities?: AppRequiredCapability[];
}
export const UpdateQAppOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    appArn: S.String,
    title: S.String,
    description: S.optional(S.String),
    initialPrompt: S.optional(S.String),
    appVersion: S.Number,
    status: AppStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedBy: S.String,
    requiredCapabilities: S.optional(AppRequiredCapabilities),
  }),
).annotate({
  identifier: "UpdateQAppOutput",
}) as any as S.Schema<UpdateQAppOutput>;
export interface PermissionInput {
  action: Action;
  principal: string;
}
export const PermissionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: Action, principal: S.String }),
).annotate({
  identifier: "PermissionInput",
}) as any as S.Schema<PermissionInput>;
export type PermissionsInputList = PermissionInput[];
export const PermissionsInputList = /*@__PURE__*/ S.Array(PermissionInput);
export interface UpdateQAppPermissionsInput {
  instanceId: string;
  appId: string;
  grantPermissions?: PermissionInput[];
  revokePermissions?: PermissionInput[];
}
export const UpdateQAppPermissionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    appId: S.String,
    grantPermissions: S.optional(PermissionsInputList),
    revokePermissions: S.optional(PermissionsInputList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/apps.updateQAppPermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQAppPermissionsInput",
}) as any as S.Schema<UpdateQAppPermissionsInput>;
export interface UpdateQAppPermissionsOutput {
  resourceArn?: string;
  appId?: string;
  permissions?: PermissionOutput[];
}
export const UpdateQAppPermissionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    appId: S.optional(S.String),
    permissions: S.optional(PermissionsOutputList),
  }),
).annotate({
  identifier: "UpdateQAppPermissionsOutput",
}) as any as S.Schema<UpdateQAppPermissionsOutput>;
export interface UpdateQAppSessionInput {
  instanceId: string;
  sessionId: string;
  values?: CardValue[];
}
export const UpdateQAppSessionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String,
    values: S.optional(CardValueList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtime.updateQAppSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQAppSessionInput",
}) as any as S.Schema<UpdateQAppSessionInput>;
export interface UpdateQAppSessionOutput {
  sessionId: string;
  sessionArn: string;
}
export const UpdateQAppSessionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionId: S.String, sessionArn: S.String }),
).annotate({
  identifier: "UpdateQAppSessionOutput",
}) as any as S.Schema<UpdateQAppSessionOutput>;
export interface UpdateQAppSessionMetadataInput {
  instanceId: string;
  sessionId: string;
  sessionName?: string;
  sharingConfiguration: SessionSharingConfiguration;
}
export const UpdateQAppSessionMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceId: S.String.pipe(T.HttpHeader("instance-id")),
    sessionId: S.String,
    sessionName: S.optional(S.String),
    sharingConfiguration: SessionSharingConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/runtime.updateQAppSessionMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQAppSessionMetadataInput",
}) as any as S.Schema<UpdateQAppSessionMetadataInput>;
export interface UpdateQAppSessionMetadataOutput {
  sessionId: string;
  sessionArn: string;
  sessionName?: string;
  sharingConfiguration: SessionSharingConfiguration;
}
export const UpdateQAppSessionMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.String,
    sessionArn: S.String,
    sessionName: S.optional(S.String),
    sharingConfiguration: SessionSharingConfiguration,
  }),
).annotate({
  identifier: "UpdateQAppSessionMetadataOutput",
}) as any as S.Schema<UpdateQAppSessionMetadataOutput>;
export type AssociateLibraryItemReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Associates a rating or review for a library item with the user submitting the request. This increments the rating count for the specified library item.
 */
export const associateLibraryItemReview: API.OperationMethod<
  AssociateLibraryItemReviewInput,
  AssociateLibraryItemReviewResponse,
  AssociateLibraryItemReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateLibraryItemReviewInput,
  output: AssociateLibraryItemReviewResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateLibraryItemReview",
}));

export type AssociateQAppWithUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a link between the user's identity calling the operation and a specific Q App. This is useful to mark the Q App as a *favorite* for the user if the user doesn't own the Amazon Q App so they can still run it and see it in their inventory of Q Apps.
 */
export const associateQAppWithUser: API.OperationMethod<
  AssociateQAppWithUserInput,
  AssociateQAppWithUserResponse,
  AssociateQAppWithUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateQAppWithUserInput,
  output: AssociateQAppWithUserResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateQAppWithUser",
}));

export type BatchCreateCategoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates Categories for the Amazon Q Business application environment instance. Web experience users use Categories to tag and filter library items. For more information, see Custom labels for Amazon Q Apps.
 */
export const batchCreateCategory: API.OperationMethod<
  BatchCreateCategoryInput,
  BatchCreateCategoryResponse,
  BatchCreateCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateCategoryInput,
  output: BatchCreateCategoryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateCategory",
}));

export type BatchDeleteCategoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes Categories for the Amazon Q Business application environment instance. Web experience users use Categories to tag and filter library items. For more information, see Custom labels for Amazon Q Apps.
 */
export const batchDeleteCategory: API.OperationMethod<
  BatchDeleteCategoryInput,
  BatchDeleteCategoryResponse,
  BatchDeleteCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteCategoryInput,
  output: BatchDeleteCategoryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCategory",
}));

export type BatchUpdateCategoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates Categories for the Amazon Q Business application environment instance. Web experience users use Categories to tag and filter library items. For more information, see Custom labels for Amazon Q Apps.
 */
export const batchUpdateCategory: API.OperationMethod<
  BatchUpdateCategoryInput,
  BatchUpdateCategoryResponse,
  BatchUpdateCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateCategoryInput,
  output: BatchUpdateCategoryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateCategory",
}));

export type CreateLibraryItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new library item for an Amazon Q App, allowing it to be discovered and used by other allowed users.
 */
export const createLibraryItem: API.OperationMethod<
  CreateLibraryItemInput,
  CreateLibraryItemOutput,
  CreateLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLibraryItemInput,
  output: CreateLibraryItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLibraryItem",
}));

export type CreatePresignedUrlError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a presigned URL for an S3 POST operation to upload a file. You can use this URL to set a default file for a `FileUploadCard` in a Q App definition or to provide a file for a single Q App run. The `scope` parameter determines how the file will be used, either at the app definition level or the app session level.
 *
 * The IAM permissions are derived from the `qapps:ImportDocument` action. For more information on the IAM policy for Amazon Q Apps, see IAM permissions for using Amazon Q Apps.
 */
export const createPresignedUrl: API.OperationMethod<
  CreatePresignedUrlInput,
  CreatePresignedUrlOutput,
  CreatePresignedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePresignedUrlInput,
  output: CreatePresignedUrlOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedUrl",
}));

export type CreateQAppError =
  | AccessDeniedException
  | ConflictException
  | ContentTooLargeException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon Q App based on the provided definition. The Q App definition specifies the cards and flow of the Q App. This operation also calculates the dependencies between the cards by inspecting the references in the prompts.
 */
export const createQApp: API.OperationMethod<
  CreateQAppInput,
  CreateQAppOutput,
  CreateQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQAppInput,
  output: CreateQAppOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ContentTooLargeException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQApp",
}));

export type DeleteLibraryItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a library item for an Amazon Q App, removing it from the library so it can no longer be discovered or used by other users.
 */
export const deleteLibraryItem: API.OperationMethod<
  DeleteLibraryItemInput,
  DeleteLibraryItemResponse,
  DeleteLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLibraryItemInput,
  output: DeleteLibraryItemResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLibraryItem",
}));

export type DeleteQAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Amazon Q App owned by the user. If the Q App was previously published to the library, it is also removed from the library.
 */
export const deleteQApp: API.OperationMethod<
  DeleteQAppInput,
  DeleteQAppResponse,
  DeleteQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQAppInput,
  output: DeleteQAppResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQApp",
}));

export type DescribeQAppPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Describes read permissions for a Amazon Q App in Amazon Q Business application environment instance.
 */
export const describeQAppPermissions: API.OperationMethod<
  DescribeQAppPermissionsInput,
  DescribeQAppPermissionsOutput,
  DescribeQAppPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeQAppPermissionsInput,
  output: DescribeQAppPermissionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQAppPermissions",
}));

export type DisassociateLibraryItemReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Removes a rating or review previously submitted by the user for a library item.
 */
export const disassociateLibraryItemReview: API.OperationMethod<
  DisassociateLibraryItemReviewInput,
  DisassociateLibraryItemReviewResponse,
  DisassociateLibraryItemReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateLibraryItemReviewInput,
  output: DisassociateLibraryItemReviewResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateLibraryItemReview",
}));

export type DisassociateQAppFromUserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a Q App from a user removing the user's access to run the Q App.
 */
export const disassociateQAppFromUser: API.OperationMethod<
  DisassociateQAppFromUserInput,
  DisassociateQAppFromUserResponse,
  DisassociateQAppFromUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateQAppFromUserInput,
  output: DisassociateQAppFromUserResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateQAppFromUser",
}));

export type ExportQAppSessionDataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Exports the collected data of a Q App data collection session.
 */
export const exportQAppSessionData: API.OperationMethod<
  ExportQAppSessionDataInput,
  ExportQAppSessionDataOutput,
  ExportQAppSessionDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportQAppSessionDataInput,
  output: ExportQAppSessionDataOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportQAppSessionData",
}));

export type GetLibraryItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a library item for an Amazon Q App, including its metadata, categories, ratings, and usage statistics.
 */
export const getLibraryItem: API.OperationMethod<
  GetLibraryItemInput,
  GetLibraryItemOutput,
  GetLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLibraryItemInput,
  output: GetLibraryItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLibraryItem",
}));

export type GetQAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full details of an Q App, including its definition specifying the cards and flow.
 */
export const getQApp: API.OperationMethod<
  GetQAppInput,
  GetQAppOutput,
  GetQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQAppInput,
  output: GetQAppOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQApp",
}));

export type GetQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current state and results for an active session of an Amazon Q App.
 */
export const getQAppSession: API.OperationMethod<
  GetQAppSessionInput,
  GetQAppSessionOutput,
  GetQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQAppSessionInput,
  output: GetQAppSessionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQAppSession",
}));

export type GetQAppSessionMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current configuration of a Q App session.
 */
export const getQAppSessionMetadata: API.OperationMethod<
  GetQAppSessionMetadataInput,
  GetQAppSessionMetadataOutput,
  GetQAppSessionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQAppSessionMetadataInput,
  output: GetQAppSessionMetadataOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQAppSessionMetadata",
}));

export type ImportDocumentError =
  | AccessDeniedException
  | ContentTooLargeException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Uploads a file that can then be used either as a default in a `FileUploadCard` from Q App definition or as a file that is used inside a single Q App run. The purpose of the document is determined by a scope parameter that indicates whether it is at the app definition level or at the app session level.
 */
export const importDocument: API.OperationMethod<
  ImportDocumentInput,
  ImportDocumentOutput,
  ImportDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportDocumentInput,
  output: ImportDocumentOutput,
  errors: [
    AccessDeniedException,
    ContentTooLargeException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportDocument",
}));

export type ListCategoriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the categories of a Amazon Q Business application environment instance. For more information, see Custom labels for Amazon Q Apps.
 */
export const listCategories: API.OperationMethod<
  ListCategoriesInput,
  ListCategoriesOutput,
  ListCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCategoriesInput,
  output: ListCategoriesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCategories",
}));

export type ListLibraryItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the library items for Amazon Q Apps that are published and available for users in your Amazon Web Services account.
 */
export const listLibraryItems: API.PaginatedOperationMethod<
  ListLibraryItemsInput,
  ListLibraryItemsOutput,
  ListLibraryItemsError,
  Credentials | HttpClient.HttpClient,
  LibraryItemMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLibraryItemsInput,
  output: ListLibraryItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLibraryItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "libraryItems",
    pageSize: "limit",
  } as const,
})) as any;

export type ListQAppsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon Q Apps owned by or associated with the user either because they created it or because they used it from the library in the past. The user identity is extracted from the credentials used to invoke this operation..
 */
export const listQApps: API.PaginatedOperationMethod<
  ListQAppsInput,
  ListQAppsOutput,
  ListQAppsError,
  Credentials | HttpClient.HttpClient,
  UserAppItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQAppsInput,
  output: ListQAppsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQApps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "apps",
    pageSize: "limit",
  } as const,
})) as any;

export type ListQAppSessionDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the collected data of a Q App data collection session.
 */
export const listQAppSessionData: API.OperationMethod<
  ListQAppSessionDataInput,
  ListQAppSessionDataOutput,
  ListQAppSessionDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListQAppSessionDataInput,
  output: ListQAppSessionDataOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQAppSessionData",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with an Amazon Q Apps resource.
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

export type PredictQAppError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Generates an Amazon Q App definition based on either a conversation or a problem statement provided as input.The resulting app definition can be used to call `CreateQApp`. This API doesn't create Amazon Q Apps directly.
 */
export const predictQApp: API.OperationMethod<
  PredictQAppInput,
  PredictQAppOutput,
  PredictQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PredictQAppInput,
  output: PredictQAppOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PredictQApp",
}));

export type StartQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new session for an Amazon Q App, allowing inputs to be provided and the app to be run.
 *
 * Each Q App session will be condensed into a single conversation in the web experience.
 */
export const startQAppSession: API.OperationMethod<
  StartQAppSessionInput,
  StartQAppSessionOutput,
  StartQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQAppSessionInput,
  output: StartQAppSessionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQAppSession",
}));

export type StopQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Stops an active session for an Amazon Q App.This deletes all data related to the session and makes it invalid for future uses. The results of the session will be persisted as part of the conversation.
 */
export const stopQAppSession: API.OperationMethod<
  StopQAppSessionInput,
  StopQAppSessionResponse,
  StopQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopQAppSessionInput,
  output: StopQAppSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQAppSession",
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
 * Associates tags with an Amazon Q Apps resource.
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
 * Disassociates tags from an Amazon Q Apps resource.
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

export type UpdateLibraryItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the library item for an Amazon Q App.
 */
export const updateLibraryItem: API.OperationMethod<
  UpdateLibraryItemInput,
  UpdateLibraryItemOutput,
  UpdateLibraryItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLibraryItemInput,
  output: UpdateLibraryItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLibraryItem",
}));

export type UpdateLibraryItemMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the verification status of a library item for an Amazon Q App.
 */
export const updateLibraryItemMetadata: API.OperationMethod<
  UpdateLibraryItemMetadataInput,
  UpdateLibraryItemMetadataResponse,
  UpdateLibraryItemMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLibraryItemMetadataInput,
  output: UpdateLibraryItemMetadataResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLibraryItemMetadata",
}));

export type UpdateQAppError =
  | AccessDeniedException
  | ContentTooLargeException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Amazon Q App, allowing modifications to its title, description, and definition.
 */
export const updateQApp: API.OperationMethod<
  UpdateQAppInput,
  UpdateQAppOutput,
  UpdateQAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQAppInput,
  output: UpdateQAppOutput,
  errors: [
    AccessDeniedException,
    ContentTooLargeException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQApp",
}));

export type UpdateQAppPermissionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates read permissions for a Amazon Q App in Amazon Q Business application environment instance.
 */
export const updateQAppPermissions: API.OperationMethod<
  UpdateQAppPermissionsInput,
  UpdateQAppPermissionsOutput,
  UpdateQAppPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQAppPermissionsInput,
  output: UpdateQAppPermissionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQAppPermissions",
}));

export type UpdateQAppSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the session for a given Q App `sessionId`. This is only valid when at least one card of the session is in the `WAITING` state. Data for each `WAITING` card can be provided as input. If inputs are not provided, the call will be accepted but session will not move forward. Inputs for cards that are not in the `WAITING` status will be ignored.
 */
export const updateQAppSession: API.OperationMethod<
  UpdateQAppSessionInput,
  UpdateQAppSessionOutput,
  UpdateQAppSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQAppSessionInput,
  output: UpdateQAppSessionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQAppSession",
}));

export type UpdateQAppSessionMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration metadata of a session for a given Q App `sessionId`.
 */
export const updateQAppSessionMetadata: API.OperationMethod<
  UpdateQAppSessionMetadataInput,
  UpdateQAppSessionMetadataOutput,
  UpdateQAppSessionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQAppSessionMetadataInput,
  output: UpdateQAppSessionMetadataOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQAppSessionMetadata",
}));
