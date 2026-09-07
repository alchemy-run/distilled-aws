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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "SocialMessaging",
  serviceShapeName: "SocialMessaging",
});
const auth = T.AwsAuthSigv4({ name: "social-messaging" });
const ver = T.ServiceVersion("2024-01-01");
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
              `https://social-messaging-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://social-messaging-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://social-messaging.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://social-messaging.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedByMetaException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedByMetaException>()(
    "AccessDeniedByMetaException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class DependencyException
  extends /*@__PURE__*/ S.TaggedError<DependencyException>()(
    "DependencyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(502), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidParametersException>()(
    "InvalidParametersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottledRequestException
  extends /*@__PURE__*/ S.TaggedError<ThrottledRequestException>()(
    "ThrottledRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export interface WhatsAppSignupCallback {
  accessToken: string | redacted.Redacted<string>;
  callbackUrl?: string;
}
export const WhatsAppSignupCallback = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessToken: SensitiveString, callbackUrl: S.optional(S.String) }),
).annotate({
  identifier: "WhatsAppSignupCallback",
}) as any as S.Schema<WhatsAppSignupCallback>;
export type AssociateInProgressToken = string | redacted.Redacted<string>;
export type WhatsAppPhoneNumber = string;
export type TwoFactorPin = string | redacted.Redacted<string>;
export type IsoCountryCode = string;
export interface Tag {
  key: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface WabaPhoneNumberSetupFinalization {
  id: string;
  twoFactorPin: string | redacted.Redacted<string>;
  dataLocalizationRegion?: string;
  tags?: Tag[];
}
export const WabaPhoneNumberSetupFinalization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    twoFactorPin: SensitiveString,
    dataLocalizationRegion: S.optional(S.String),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "WabaPhoneNumberSetupFinalization",
}) as any as S.Schema<WabaPhoneNumberSetupFinalization>;
export type WabaPhoneNumberSetupFinalizationList =
  WabaPhoneNumberSetupFinalization[];
export const WabaPhoneNumberSetupFinalizationList = /*@__PURE__*/ S.Array(
  WabaPhoneNumberSetupFinalization,
);
export type LinkedWhatsAppBusinessAccountId = string;
export type WhatsAppBusinessAccountId = string;
export type EventDestinationArn = string;
export type RoleArn = string;
export interface WhatsAppBusinessAccountEventDestination {
  eventDestinationArn: string;
  roleArn?: string;
}
export const WhatsAppBusinessAccountEventDestination = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ eventDestinationArn: S.String, roleArn: S.optional(S.String) }),
).annotate({
  identifier: "WhatsAppBusinessAccountEventDestination",
}) as any as S.Schema<WhatsAppBusinessAccountEventDestination>;
export type WhatsAppBusinessAccountEventDestinations =
  WhatsAppBusinessAccountEventDestination[];
export const WhatsAppBusinessAccountEventDestinations = /*@__PURE__*/ S.Array(
  WhatsAppBusinessAccountEventDestination,
);
export interface WabaSetupFinalization {
  id?: string;
  eventDestinations?: WhatsAppBusinessAccountEventDestination[];
  tags?: Tag[];
}
export const WabaSetupFinalization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    eventDestinations: S.optional(WhatsAppBusinessAccountEventDestinations),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "WabaSetupFinalization",
}) as any as S.Schema<WabaSetupFinalization>;
export interface WhatsAppSetupFinalization {
  associateInProgressToken: string | redacted.Redacted<string>;
  phoneNumbers: WabaPhoneNumberSetupFinalization[];
  phoneNumberParent?: string;
  waba?: WabaSetupFinalization;
}
export const WhatsAppSetupFinalization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associateInProgressToken: SensitiveString,
    phoneNumbers: WabaPhoneNumberSetupFinalizationList,
    phoneNumberParent: S.optional(S.String),
    waba: S.optional(WabaSetupFinalization),
  }),
).annotate({
  identifier: "WhatsAppSetupFinalization",
}) as any as S.Schema<WhatsAppSetupFinalization>;
export interface AssociateWhatsAppBusinessAccountInput {
  signupCallback?: WhatsAppSignupCallback;
  setupFinalization?: WhatsAppSetupFinalization;
}
export const AssociateWhatsAppBusinessAccountInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      signupCallback: S.optional(WhatsAppSignupCallback),
      setupFinalization: S.optional(WhatsAppSetupFinalization),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/whatsapp/signup" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateWhatsAppBusinessAccountInput",
}) as any as S.Schema<AssociateWhatsAppBusinessAccountInput>;
export type WhatsAppBusinessAccountName = string;
export type RegistrationStatus = "COMPLETE" | "INCOMPLETE" | (string & {});
export const RegistrationStatus = /*@__PURE__*/ S.String;

export type LinkedWhatsAppPhoneNumberArn = string;
export type PhoneNumber = string;
export type WhatsAppPhoneNumberId = string;
export type WhatsAppPhoneNumberName = string;
export type WhatsAppDisplayPhoneNumber = string;
export type WhatsAppPhoneNumberQualityRating = string;
export interface WhatsAppPhoneNumberDetail {
  arn: string;
  phoneNumber: string;
  phoneNumberId: string;
  metaPhoneNumberId: string;
  displayPhoneNumberName: string;
  displayPhoneNumber: string;
  qualityRating: string;
  dataLocalizationRegion?: string;
}
export const WhatsAppPhoneNumberDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    phoneNumber: S.String,
    phoneNumberId: S.String,
    metaPhoneNumberId: S.String,
    displayPhoneNumberName: S.String,
    displayPhoneNumber: S.String,
    qualityRating: S.String,
    dataLocalizationRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "WhatsAppPhoneNumberDetail",
}) as any as S.Schema<WhatsAppPhoneNumberDetail>;
export type WhatsAppPhoneNumberDetailList = WhatsAppPhoneNumberDetail[];
export const WhatsAppPhoneNumberDetailList = /*@__PURE__*/ S.Array(
  WhatsAppPhoneNumberDetail,
);
export interface LinkedWhatsAppBusinessAccountIdMetaData {
  accountName?: string;
  registrationStatus?: RegistrationStatus;
  unregisteredWhatsAppPhoneNumbers?: WhatsAppPhoneNumberDetail[];
  wabaId?: string;
}
export const LinkedWhatsAppBusinessAccountIdMetaData = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountName: S.optional(S.String),
      registrationStatus: S.optional(RegistrationStatus),
      unregisteredWhatsAppPhoneNumbers: S.optional(
        WhatsAppPhoneNumberDetailList,
      ),
      wabaId: S.optional(S.String),
    }),
).annotate({
  identifier: "LinkedWhatsAppBusinessAccountIdMetaData",
}) as any as S.Schema<LinkedWhatsAppBusinessAccountIdMetaData>;
export type LinkedAccountWithIncompleteSetup = {
  [key: string]: LinkedWhatsAppBusinessAccountIdMetaData | undefined;
};
export const LinkedAccountWithIncompleteSetup = /*@__PURE__*/ S.Record(
  S.String,
  LinkedWhatsAppBusinessAccountIdMetaData.pipe(S.optional),
);
export interface WhatsAppSignupCallbackResult {
  associateInProgressToken?: string | redacted.Redacted<string>;
  linkedAccountsWithIncompleteSetup?: {
    [key: string]: LinkedWhatsAppBusinessAccountIdMetaData | undefined;
  };
}
export const WhatsAppSignupCallbackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associateInProgressToken: S.optional(SensitiveString),
    linkedAccountsWithIncompleteSetup: S.optional(
      LinkedAccountWithIncompleteSetup,
    ),
  }),
).annotate({
  identifier: "WhatsAppSignupCallbackResult",
}) as any as S.Schema<WhatsAppSignupCallbackResult>;
export interface AssociateWhatsAppBusinessAccountOutput {
  signupCallbackResult?: WhatsAppSignupCallbackResult;
  statusCode?: number;
  linkedWhatsAppBusinessAccountId?: string;
}
export const AssociateWhatsAppBusinessAccountOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      signupCallbackResult: S.optional(WhatsAppSignupCallbackResult),
      statusCode: S.optional(S.Number),
      linkedWhatsAppBusinessAccountId: S.optional(S.String),
    }),
).annotate({
  identifier: "AssociateWhatsAppBusinessAccountOutput",
}) as any as S.Schema<AssociateWhatsAppBusinessAccountOutput>;
export type MetaFlowName = string;
export type MetaFlowCategory =
  | "SIGN_UP"
  | "SIGN_IN"
  | "APPOINTMENT_BOOKING"
  | "LEAD_GENERATION"
  | "SHOPPING"
  | "CONTACT_US"
  | "CUSTOMER_SUPPORT"
  | "SURVEY"
  | "OTHER"
  | (string & {});
export const MetaFlowCategory = /*@__PURE__*/ S.String;

export type MetaFlowCategoryList = MetaFlowCategory[];
export const MetaFlowCategoryList = /*@__PURE__*/ S.Array(MetaFlowCategory);
export type MetaFlowJsonBlob = Uint8Array;
export type MetaFlowId = string;
export interface CreateWhatsAppFlowInput {
  id: string;
  flowName: string;
  categories: MetaFlowCategory[];
  flowJson?: Uint8Array;
  publish?: boolean;
  cloneFlowId?: string;
}
export const CreateWhatsAppFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    flowName: S.String,
    categories: MetaFlowCategoryList,
    flowJson: S.optional(T.Blob),
    publish: S.optional(S.Boolean),
    cloneFlowId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/flow/create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWhatsAppFlowInput",
}) as any as S.Schema<CreateWhatsAppFlowInput>;
export type MetaFlowValidationError = string;
export type ValidationErrorList = string[];
export const ValidationErrorList = /*@__PURE__*/ S.Array(S.String);
export interface CreateWhatsAppFlowOutput {
  flowId?: string;
  validationErrors?: string[];
}
export const CreateWhatsAppFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowId: S.optional(S.String),
    validationErrors: S.optional(ValidationErrorList),
  }),
).annotate({
  identifier: "CreateWhatsAppFlowOutput",
}) as any as S.Schema<CreateWhatsAppFlowOutput>;
export type MetaTemplateDefinition = Uint8Array;
export interface CreateWhatsAppMessageTemplateInput {
  templateDefinition: Uint8Array;
  id: string;
}
export const CreateWhatsAppMessageTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateDefinition: T.Blob, id: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/template/put" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWhatsAppMessageTemplateInput",
}) as any as S.Schema<CreateWhatsAppMessageTemplateInput>;
export type MetaTemplateId = string;
export type MetaTemplateCategory = string;
export interface CreateWhatsAppMessageTemplateOutput {
  metaTemplateId?: string;
  templateStatus?: string;
  category?: string;
}
export const CreateWhatsAppMessageTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metaTemplateId: S.optional(S.String),
    templateStatus: S.optional(S.String),
    category: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateWhatsAppMessageTemplateOutput",
}) as any as S.Schema<CreateWhatsAppMessageTemplateOutput>;
export type MetaTemplateName = string;
export type MetaTemplateLanguage = string;
export type ButtonType = string;
export type MetaUrlWithSuffixExample = { [key: string]: string | undefined };
export const MetaUrlWithSuffixExample = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type OtpType = string;
export type ZeroTapTermsAccepted = boolean;
export type SupportedApp = { [key: string]: string | undefined };
export const SupportedApp = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SupportedApps = { [key: string]: string | undefined }[];
export const SupportedApps = /*@__PURE__*/ S.Array(SupportedApp);
export interface LibraryTemplateButtonInput {
  type?: string;
  phoneNumber?: string;
  url?: { [key: string]: string | undefined };
  otpType?: string;
  zeroTapTermsAccepted?: boolean;
  supportedApps?: { [key: string]: string | undefined }[];
}
export const LibraryTemplateButtonInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    phoneNumber: S.optional(S.String),
    url: S.optional(MetaUrlWithSuffixExample),
    otpType: S.optional(S.String),
    zeroTapTermsAccepted: S.optional(S.Boolean),
    supportedApps: S.optional(SupportedApps),
  }),
).annotate({
  identifier: "LibraryTemplateButtonInput",
}) as any as S.Schema<LibraryTemplateButtonInput>;
export type MetaLibraryTemplateButtonInputs = LibraryTemplateButtonInput[];
export const MetaLibraryTemplateButtonInputs = /*@__PURE__*/ S.Array(
  LibraryTemplateButtonInput,
);
export type AddContactNumber = boolean;
export type AddLearnMoreLink = boolean;
export type AddSecurityRecommendation = boolean;
export type AddTrackPackageLink = boolean;
export type CodeExpirationMinutes = number;
export interface LibraryTemplateBodyInputs {
  addContactNumber?: boolean;
  addLearnMoreLink?: boolean;
  addSecurityRecommendation?: boolean;
  addTrackPackageLink?: boolean;
  codeExpirationMinutes?: number;
}
export const LibraryTemplateBodyInputs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addContactNumber: S.optional(S.Boolean),
    addLearnMoreLink: S.optional(S.Boolean),
    addSecurityRecommendation: S.optional(S.Boolean),
    addTrackPackageLink: S.optional(S.Boolean),
    codeExpirationMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "LibraryTemplateBodyInputs",
}) as any as S.Schema<LibraryTemplateBodyInputs>;
export interface MetaLibraryTemplate {
  templateName: string;
  libraryTemplateName: string;
  templateCategory: string;
  templateLanguage: string;
  libraryTemplateButtonInputs?: LibraryTemplateButtonInput[];
  libraryTemplateBodyInputs?: LibraryTemplateBodyInputs;
}
export const MetaLibraryTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.String,
    libraryTemplateName: S.String,
    templateCategory: S.String,
    templateLanguage: S.String,
    libraryTemplateButtonInputs: S.optional(MetaLibraryTemplateButtonInputs),
    libraryTemplateBodyInputs: S.optional(LibraryTemplateBodyInputs),
  }),
).annotate({
  identifier: "MetaLibraryTemplate",
}) as any as S.Schema<MetaLibraryTemplate>;
export interface CreateWhatsAppMessageTemplateFromLibraryInput {
  metaLibraryTemplate: MetaLibraryTemplate;
  id: string;
}
export const CreateWhatsAppMessageTemplateFromLibraryInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ metaLibraryTemplate: MetaLibraryTemplate, id: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/whatsapp/template/create" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateWhatsAppMessageTemplateFromLibraryInput",
  }) as any as S.Schema<CreateWhatsAppMessageTemplateFromLibraryInput>;
export interface CreateWhatsAppMessageTemplateFromLibraryOutput {
  metaTemplateId?: string;
  templateStatus?: string;
  category?: string;
}
export const CreateWhatsAppMessageTemplateFromLibraryOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      metaTemplateId: S.optional(S.String),
      templateStatus: S.optional(S.String),
      category: S.optional(S.String),
    }),
  ).annotate({
    identifier: "CreateWhatsAppMessageTemplateFromLibraryOutput",
  }) as any as S.Schema<CreateWhatsAppMessageTemplateFromLibraryOutput>;
export interface S3File {
  bucketName: string;
  key: string;
}
export const S3File = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, key: S.String }),
).annotate({ identifier: "S3File" }) as any as S.Schema<S3File>;
export interface CreateWhatsAppMessageTemplateMediaInput {
  id: string;
  sourceS3File?: S3File;
}
export const CreateWhatsAppMessageTemplateMediaInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String, sourceS3File: S.optional(S3File) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/whatsapp/template/media" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateWhatsAppMessageTemplateMediaInput",
}) as any as S.Schema<CreateWhatsAppMessageTemplateMediaInput>;
export interface CreateWhatsAppMessageTemplateMediaOutput {
  metaHeaderHandle?: string;
}
export const CreateWhatsAppMessageTemplateMediaOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ metaHeaderHandle: S.optional(S.String) }),
).annotate({
  identifier: "CreateWhatsAppMessageTemplateMediaOutput",
}) as any as S.Schema<CreateWhatsAppMessageTemplateMediaOutput>;
export interface DeleteWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export const DeleteWhatsAppFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpQuery("id")),
    flowId: S.String.pipe(T.HttpQuery("flowId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/whatsapp/flow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWhatsAppFlowInput",
}) as any as S.Schema<DeleteWhatsAppFlowInput>;
export interface DeleteWhatsAppFlowOutput {}
export const DeleteWhatsAppFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWhatsAppFlowOutput",
}) as any as S.Schema<DeleteWhatsAppFlowOutput>;
export type WhatsAppMediaId = string;
export interface DeleteWhatsAppMessageMediaInput {
  mediaId: string;
  originationPhoneNumberId: string;
}
export const DeleteWhatsAppMessageMediaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mediaId: S.String.pipe(T.HttpQuery("mediaId")),
    originationPhoneNumberId: S.String.pipe(
      T.HttpQuery("originationPhoneNumberId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/whatsapp/media" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWhatsAppMessageMediaInput",
}) as any as S.Schema<DeleteWhatsAppMessageMediaInput>;
export interface DeleteWhatsAppMessageMediaOutput {
  success?: boolean;
}
export const DeleteWhatsAppMessageMediaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ success: S.optional(S.Boolean) }),
).annotate({
  identifier: "DeleteWhatsAppMessageMediaOutput",
}) as any as S.Schema<DeleteWhatsAppMessageMediaOutput>;
export type DeleteAllLanguages = boolean;
export interface DeleteWhatsAppMessageTemplateInput {
  metaTemplateId?: string;
  deleteAllLanguages?: boolean;
  id: string;
  templateName: string;
}
export const DeleteWhatsAppMessageTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metaTemplateId: S.optional(S.String).pipe(T.HttpQuery("metaTemplateId")),
    deleteAllLanguages: S.optional(S.Boolean).pipe(
      T.HttpQuery("deleteAllTemplates"),
    ),
    id: S.String.pipe(T.HttpQuery("id")),
    templateName: S.String.pipe(T.HttpQuery("templateName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/whatsapp/template" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWhatsAppMessageTemplateInput",
}) as any as S.Schema<DeleteWhatsAppMessageTemplateInput>;
export interface DeleteWhatsAppMessageTemplateOutput {}
export const DeleteWhatsAppMessageTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWhatsAppMessageTemplateOutput",
}) as any as S.Schema<DeleteWhatsAppMessageTemplateOutput>;
export interface DeprecateWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export const DeprecateWhatsAppFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, flowId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/flow/deprecate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeprecateWhatsAppFlowInput",
}) as any as S.Schema<DeprecateWhatsAppFlowInput>;
export interface DeprecateWhatsAppFlowOutput {}
export const DeprecateWhatsAppFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeprecateWhatsAppFlowOutput",
}) as any as S.Schema<DeprecateWhatsAppFlowOutput>;
export interface DisassociateWhatsAppBusinessAccountInput {
  id: string;
}
export const DisassociateWhatsAppBusinessAccountInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/v1/whatsapp/waba/disassociate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateWhatsAppBusinessAccountInput",
}) as any as S.Schema<DisassociateWhatsAppBusinessAccountInput>;
export interface DisassociateWhatsAppBusinessAccountOutput {}
export const DisassociateWhatsAppBusinessAccountOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateWhatsAppBusinessAccountOutput",
  }) as any as S.Schema<DisassociateWhatsAppBusinessAccountOutput>;
export interface GetLinkedWhatsAppBusinessAccountInput {
  id: string;
}
export const GetLinkedWhatsAppBusinessAccountInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/whatsapp/waba/details" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetLinkedWhatsAppBusinessAccountInput",
}) as any as S.Schema<GetLinkedWhatsAppBusinessAccountInput>;
export type LinkedWhatsAppBusinessAccountArn = string;
export type WhatsAppBusinessAccountLinkDate = Date;
export type WhatsAppBusinessAccountMarketingMessagesOnboardingStatus = string;
export interface WhatsAppPhoneNumberSummary {
  arn: string;
  phoneNumber: string;
  phoneNumberId: string;
  metaPhoneNumberId: string;
  displayPhoneNumberName: string;
  displayPhoneNumber: string;
  qualityRating: string;
  dataLocalizationRegion?: string;
}
export const WhatsAppPhoneNumberSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    phoneNumber: S.String,
    phoneNumberId: S.String,
    metaPhoneNumberId: S.String,
    displayPhoneNumberName: S.String,
    displayPhoneNumber: S.String,
    qualityRating: S.String,
    dataLocalizationRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "WhatsAppPhoneNumberSummary",
}) as any as S.Schema<WhatsAppPhoneNumberSummary>;
export type WhatsAppPhoneNumberSummaryList = WhatsAppPhoneNumberSummary[];
export const WhatsAppPhoneNumberSummaryList = /*@__PURE__*/ S.Array(
  WhatsAppPhoneNumberSummary,
);
export interface LinkedWhatsAppBusinessAccount {
  arn: string;
  id: string;
  wabaId: string;
  registrationStatus: RegistrationStatus;
  linkDate: Date;
  wabaName: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
  marketingMessagesOnboardingStatus?: string;
  phoneNumbers: WhatsAppPhoneNumberSummary[];
}
export const LinkedWhatsAppBusinessAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    wabaId: S.String,
    registrationStatus: RegistrationStatus,
    linkDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    wabaName: S.String,
    eventDestinations: WhatsAppBusinessAccountEventDestinations,
    marketingMessagesOnboardingStatus: S.optional(S.String),
    phoneNumbers: WhatsAppPhoneNumberSummaryList,
  }),
).annotate({
  identifier: "LinkedWhatsAppBusinessAccount",
}) as any as S.Schema<LinkedWhatsAppBusinessAccount>;
export interface GetLinkedWhatsAppBusinessAccountOutput {
  account?: LinkedWhatsAppBusinessAccount;
}
export const GetLinkedWhatsAppBusinessAccountOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ account: S.optional(LinkedWhatsAppBusinessAccount) }),
).annotate({
  identifier: "GetLinkedWhatsAppBusinessAccountOutput",
}) as any as S.Schema<GetLinkedWhatsAppBusinessAccountOutput>;
export interface GetLinkedWhatsAppBusinessAccountPhoneNumberInput {
  id: string;
}
export const GetLinkedWhatsAppBusinessAccountPhoneNumberInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ id: S.String.pipe(T.HttpQuery("id")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/whatsapp/waba/phone/details" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetLinkedWhatsAppBusinessAccountPhoneNumberInput",
  }) as any as S.Schema<GetLinkedWhatsAppBusinessAccountPhoneNumberInput>;
export interface GetLinkedWhatsAppBusinessAccountPhoneNumberOutput {
  phoneNumber?: WhatsAppPhoneNumberDetail;
  linkedWhatsAppBusinessAccountId?: string;
}
export const GetLinkedWhatsAppBusinessAccountPhoneNumberOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      phoneNumber: S.optional(WhatsAppPhoneNumberDetail),
      linkedWhatsAppBusinessAccountId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetLinkedWhatsAppBusinessAccountPhoneNumberOutput",
  }) as any as S.Schema<GetLinkedWhatsAppBusinessAccountPhoneNumberOutput>;
export interface GetWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export const GetWhatsAppFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpQuery("id")),
    flowId: S.String.pipe(T.HttpQuery("flowId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/whatsapp/flow" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWhatsAppFlowInput",
}) as any as S.Schema<GetWhatsAppFlowInput>;
export type MetaFlowStatus = string;
export type MetaFlowJsonVersion = string;
export type MetaFlowDataApiVersion = string;
export type MetaFlowEndpointUri = string;
export type MetaFlowPreviewUrl = string;
export type MetaFlowTimestamp = string;
export interface MetaFlowPreviewInfo {
  previewUrl: string;
  expiresAt: string;
}
export const MetaFlowPreviewInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ previewUrl: S.String, expiresAt: S.String }),
).annotate({
  identifier: "MetaFlowPreviewInfo",
}) as any as S.Schema<MetaFlowPreviewInfo>;
export type MetaFlowWabaCurrency = string;
export type MetaFlowWabaTimezoneId = string;
export type MetaFlowWabaTemplateNamespace = string;
export interface MetaFlowWhatsAppBusinessAccountInfo {
  id: string;
  name: string;
  currency?: string;
  timezoneId?: string;
  messageTemplateNamespace?: string;
}
export const MetaFlowWhatsAppBusinessAccountInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    name: S.String,
    currency: S.optional(S.String),
    timezoneId: S.optional(S.String),
    messageTemplateNamespace: S.optional(S.String),
  }),
).annotate({
  identifier: "MetaFlowWhatsAppBusinessAccountInfo",
}) as any as S.Schema<MetaFlowWhatsAppBusinessAccountInfo>;
export type MetaFlowApplicationLink = string;
export type MetaFlowApplicationName = string;
export type MetaFlowApplicationId = string;
export interface MetaFlowApplicationInfo {
  link?: string;
  name: string;
  id: string;
}
export const MetaFlowApplicationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ link: S.optional(S.String), name: S.String, id: S.String }),
).annotate({
  identifier: "MetaFlowApplicationInfo",
}) as any as S.Schema<MetaFlowApplicationInfo>;
export type MetaFlowHealthStatusAvailability = string;
export type MetaFlowHealthEntityType = string;
export interface MetaFlowHealthEntity {
  entityType: string;
  id: string;
  canSendMessage: string;
}
export const MetaFlowHealthEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entityType: S.String, id: S.String, canSendMessage: S.String }),
).annotate({
  identifier: "MetaFlowHealthEntity",
}) as any as S.Schema<MetaFlowHealthEntity>;
export type MetaFlowHealthEntityList = MetaFlowHealthEntity[];
export const MetaFlowHealthEntityList =
  /*@__PURE__*/ S.Array(MetaFlowHealthEntity);
export interface MetaFlowHealthStatus {
  canSendMessage: string;
  entities?: MetaFlowHealthEntity[];
}
export const MetaFlowHealthStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    canSendMessage: S.String,
    entities: S.optional(MetaFlowHealthEntityList),
  }),
).annotate({
  identifier: "MetaFlowHealthStatus",
}) as any as S.Schema<MetaFlowHealthStatus>;
export interface GetWhatsAppFlowOutput {
  flowId: string;
  flowName: string;
  flowStatus: string;
  categories?: MetaFlowCategory[];
  validationErrors?: string[];
  jsonVersion?: string;
  dataApiVersion?: string;
  endpointUri?: string;
  preview?: MetaFlowPreviewInfo;
  whatsAppBusinessAccount?: MetaFlowWhatsAppBusinessAccountInfo;
  application?: MetaFlowApplicationInfo;
  healthStatus?: MetaFlowHealthStatus;
}
export const GetWhatsAppFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowId: S.String,
    flowName: S.String,
    flowStatus: S.String,
    categories: S.optional(MetaFlowCategoryList),
    validationErrors: S.optional(ValidationErrorList),
    jsonVersion: S.optional(S.String),
    dataApiVersion: S.optional(S.String),
    endpointUri: S.optional(S.String),
    preview: S.optional(MetaFlowPreviewInfo),
    whatsAppBusinessAccount: S.optional(MetaFlowWhatsAppBusinessAccountInfo),
    application: S.optional(MetaFlowApplicationInfo),
    healthStatus: S.optional(MetaFlowHealthStatus),
  }),
).annotate({
  identifier: "GetWhatsAppFlowOutput",
}) as any as S.Schema<GetWhatsAppFlowOutput>;
export interface GetWhatsAppFlowPreviewInput {
  id: string;
  flowId: string;
  invalidate?: boolean;
}
export const GetWhatsAppFlowPreviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpQuery("id")),
    flowId: S.String.pipe(T.HttpQuery("flowId")),
    invalidate: S.optional(S.Boolean).pipe(T.HttpQuery("invalidate")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/whatsapp/flow/preview" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWhatsAppFlowPreviewInput",
}) as any as S.Schema<GetWhatsAppFlowPreviewInput>;
export interface GetWhatsAppFlowPreviewOutput {
  flowId: string;
  preview: MetaFlowPreviewInfo;
}
export const GetWhatsAppFlowPreviewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ flowId: S.String, preview: MetaFlowPreviewInfo }),
).annotate({
  identifier: "GetWhatsAppFlowPreviewOutput",
}) as any as S.Schema<GetWhatsAppFlowPreviewOutput>;
export type Headers = { [key: string]: string | undefined };
export const Headers = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface S3PresignedUrl {
  url: string;
  headers: { [key: string]: string | undefined };
}
export const S3PresignedUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.String, headers: Headers }),
).annotate({ identifier: "S3PresignedUrl" }) as any as S.Schema<S3PresignedUrl>;
export interface GetWhatsAppMessageMediaInput {
  mediaId: string;
  originationPhoneNumberId: string;
  metadataOnly?: boolean;
  destinationS3PresignedUrl?: S3PresignedUrl;
  destinationS3File?: S3File;
}
export const GetWhatsAppMessageMediaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mediaId: S.String,
    originationPhoneNumberId: S.String,
    metadataOnly: S.optional(S.Boolean),
    destinationS3PresignedUrl: S.optional(S3PresignedUrl),
    destinationS3File: S.optional(S3File),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/media/get" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWhatsAppMessageMediaInput",
}) as any as S.Schema<GetWhatsAppMessageMediaInput>;
export interface GetWhatsAppMessageMediaOutput {
  mimeType?: string;
  fileSize?: number;
}
export const GetWhatsAppMessageMediaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mimeType: S.optional(S.String), fileSize: S.optional(S.Number) }),
).annotate({
  identifier: "GetWhatsAppMessageMediaOutput",
}) as any as S.Schema<GetWhatsAppMessageMediaOutput>;
export interface GetWhatsAppMessageTemplateInput {
  metaTemplateId?: string;
  id: string;
  templateName?: string;
  templateLanguageCode?: string;
}
export const GetWhatsAppMessageTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metaTemplateId: S.optional(S.String).pipe(T.HttpQuery("metaTemplateId")),
    id: S.String.pipe(T.HttpQuery("id")),
    templateName: S.optional(S.String).pipe(T.HttpQuery("templateName")),
    templateLanguageCode: S.optional(S.String).pipe(
      T.HttpQuery("templateLanguageCode"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/whatsapp/template" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWhatsAppMessageTemplateInput",
}) as any as S.Schema<GetWhatsAppMessageTemplateInput>;
export type MetaTemplate = string;
export interface GetWhatsAppMessageTemplateOutput {
  template?: string;
}
export const GetWhatsAppMessageTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ template: S.optional(S.String) }),
).annotate({
  identifier: "GetWhatsAppMessageTemplateOutput",
}) as any as S.Schema<GetWhatsAppMessageTemplateOutput>;
export type NextToken = string;
export type MaxResults = number;
export interface ListLinkedWhatsAppBusinessAccountsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListLinkedWhatsAppBusinessAccountsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/whatsapp/waba/list" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListLinkedWhatsAppBusinessAccountsInput",
}) as any as S.Schema<ListLinkedWhatsAppBusinessAccountsInput>;
export interface LinkedWhatsAppBusinessAccountSummary {
  arn: string;
  id: string;
  wabaId: string;
  registrationStatus: RegistrationStatus;
  linkDate: Date;
  wabaName: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
  marketingMessagesOnboardingStatus?: string;
}
export const LinkedWhatsAppBusinessAccountSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      id: S.String,
      wabaId: S.String,
      registrationStatus: RegistrationStatus,
      linkDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      wabaName: S.String,
      eventDestinations: WhatsAppBusinessAccountEventDestinations,
      marketingMessagesOnboardingStatus: S.optional(S.String),
    }),
).annotate({
  identifier: "LinkedWhatsAppBusinessAccountSummary",
}) as any as S.Schema<LinkedWhatsAppBusinessAccountSummary>;
export type LinkedWhatsAppBusinessAccountSummaryList =
  LinkedWhatsAppBusinessAccountSummary[];
export const LinkedWhatsAppBusinessAccountSummaryList = /*@__PURE__*/ S.Array(
  LinkedWhatsAppBusinessAccountSummary,
);
export interface ListLinkedWhatsAppBusinessAccountsOutput {
  linkedAccounts?: LinkedWhatsAppBusinessAccountSummary[];
  nextToken?: string;
}
export const ListLinkedWhatsAppBusinessAccountsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      linkedAccounts: S.optional(LinkedWhatsAppBusinessAccountSummaryList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListLinkedWhatsAppBusinessAccountsOutput",
}) as any as S.Schema<ListLinkedWhatsAppBusinessAccountsOutput>;
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  statusCode?: number;
  tags?: Tag[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statusCode: S.optional(S.Number), tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListWhatsAppFlowAssetsInput {
  id: string;
  flowId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListWhatsAppFlowAssetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpQuery("id")),
    flowId: S.String.pipe(T.HttpQuery("flowId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/whatsapp/flow/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWhatsAppFlowAssetsInput",
}) as any as S.Schema<ListWhatsAppFlowAssetsInput>;
export type MetaFlowAssetName = string;
export type MetaFlowAssetType = string;
export type MetaFlowAssetDownloadUrl = string;
export interface MetaFlowAsset {
  name: string;
  assetType: string;
  downloadUrl: string;
}
export const MetaFlowAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, assetType: S.String, downloadUrl: S.String }),
).annotate({ identifier: "MetaFlowAsset" }) as any as S.Schema<MetaFlowAsset>;
export type MetaFlowAssetList = MetaFlowAsset[];
export const MetaFlowAssetList = /*@__PURE__*/ S.Array(MetaFlowAsset);
export interface ListWhatsAppFlowAssetsOutput {
  flowAssets: MetaFlowAsset[];
  nextToken?: string;
}
export const ListWhatsAppFlowAssetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ flowAssets: MetaFlowAssetList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWhatsAppFlowAssetsOutput",
}) as any as S.Schema<ListWhatsAppFlowAssetsOutput>;
export interface ListWhatsAppFlowsInput {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListWhatsAppFlowsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpQuery("id")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/whatsapp/flow/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWhatsAppFlowsInput",
}) as any as S.Schema<ListWhatsAppFlowsInput>;
export interface MetaFlowSummary {
  flowId: string;
  flowName: string;
  flowStatus: string;
  flowCategories: MetaFlowCategory[];
  validationErrors: string[];
}
export const MetaFlowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    flowId: S.String,
    flowName: S.String,
    flowStatus: S.String,
    flowCategories: MetaFlowCategoryList,
    validationErrors: ValidationErrorList,
  }),
).annotate({
  identifier: "MetaFlowSummary",
}) as any as S.Schema<MetaFlowSummary>;
export type MetaFlowSummaryList = MetaFlowSummary[];
export const MetaFlowSummaryList = /*@__PURE__*/ S.Array(MetaFlowSummary);
export interface ListWhatsAppFlowsOutput {
  flows: MetaFlowSummary[];
  nextToken?: string;
}
export const ListWhatsAppFlowsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ flows: MetaFlowSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListWhatsAppFlowsOutput",
}) as any as S.Schema<ListWhatsAppFlowsOutput>;
export interface ListWhatsAppMessageTemplatesInput {
  id: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListWhatsAppMessageTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpQuery("id")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/whatsapp/template/list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWhatsAppMessageTemplatesInput",
}) as any as S.Schema<ListWhatsAppMessageTemplatesInput>;
export type MetaTemplateStatus = string;
export type MetaTemplateQualityScore = string;
export interface TemplateSummary {
  templateName?: string;
  metaTemplateId?: string;
  templateStatus?: string;
  templateQualityScore?: string;
  templateLanguage?: string;
  templateCategory?: string;
}
export const TemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.optional(S.String),
    metaTemplateId: S.optional(S.String),
    templateStatus: S.optional(S.String),
    templateQualityScore: S.optional(S.String),
    templateLanguage: S.optional(S.String),
    templateCategory: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateSummary",
}) as any as S.Schema<TemplateSummary>;
export type TemplateSummaryList = TemplateSummary[];
export const TemplateSummaryList = /*@__PURE__*/ S.Array(TemplateSummary);
export interface ListWhatsAppMessageTemplatesOutput {
  templates?: TemplateSummary[];
  nextToken?: string;
}
export const ListWhatsAppMessageTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templates: S.optional(TemplateSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWhatsAppMessageTemplatesOutput",
}) as any as S.Schema<ListWhatsAppMessageTemplatesOutput>;
export type Filter = { [key: string]: string | undefined };
export const Filter = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListWhatsAppTemplateLibraryInput {
  nextToken?: string;
  maxResults?: number;
  id: string;
  filters?: { [key: string]: string | undefined };
}
export const ListWhatsAppTemplateLibraryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    id: S.String.pipe(T.HttpQuery("id")),
    filters: S.optional(Filter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/template/library" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWhatsAppTemplateLibraryInput",
}) as any as S.Schema<ListWhatsAppTemplateLibraryInput>;
export type MetaTemplateTopic = string;
export type MetaTemplateUseCase = string;
export type MetaIndustry = string;
export type MetaIndustries = string[];
export const MetaIndustries = /*@__PURE__*/ S.Array(S.String);
export type MetaTemplateHeader = string;
export type MetaTemplateBody = string;
export type MetaText = string;
export type MetaUrl = string;
export interface LibraryTemplateButtonList {
  type?: string;
  text?: string;
  phoneNumber?: string;
  url?: string;
  otpType?: string;
  zeroTapTermsAccepted?: boolean;
  supportedApps?: { [key: string]: string | undefined }[];
}
export const LibraryTemplateButtonList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    text: S.optional(S.String),
    phoneNumber: S.optional(S.String),
    url: S.optional(S.String),
    otpType: S.optional(S.String),
    zeroTapTermsAccepted: S.optional(S.Boolean),
    supportedApps: S.optional(SupportedApps),
  }),
).annotate({
  identifier: "LibraryTemplateButtonList",
}) as any as S.Schema<LibraryTemplateButtonList>;
export type MetaLibraryTemplateButtonList = LibraryTemplateButtonList[];
export const MetaLibraryTemplateButtonList = /*@__PURE__*/ S.Array(
  LibraryTemplateButtonList,
);
export type MetaTemplateBodyExampleParams = string[];
export const MetaTemplateBodyExampleParams = /*@__PURE__*/ S.Array(S.String);
export interface MetaLibraryTemplateDefinition {
  templateName?: string;
  templateLanguage?: string;
  templateCategory?: string;
  templateTopic?: string;
  templateUseCase?: string;
  templateIndustry?: string[];
  templateHeader?: string;
  templateBody?: string;
  templateButtons?: LibraryTemplateButtonList[];
  templateId?: string;
  templateBodyExampleParams?: string[];
}
export const MetaLibraryTemplateDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateName: S.optional(S.String),
    templateLanguage: S.optional(S.String),
    templateCategory: S.optional(S.String),
    templateTopic: S.optional(S.String),
    templateUseCase: S.optional(S.String),
    templateIndustry: S.optional(MetaIndustries),
    templateHeader: S.optional(S.String),
    templateBody: S.optional(S.String),
    templateButtons: S.optional(MetaLibraryTemplateButtonList),
    templateId: S.optional(S.String),
    templateBodyExampleParams: S.optional(MetaTemplateBodyExampleParams),
  }),
).annotate({
  identifier: "MetaLibraryTemplateDefinition",
}) as any as S.Schema<MetaLibraryTemplateDefinition>;
export type MetaLibraryTemplatesList = MetaLibraryTemplateDefinition[];
export const MetaLibraryTemplatesList = /*@__PURE__*/ S.Array(
  MetaLibraryTemplateDefinition,
);
export interface ListWhatsAppTemplateLibraryOutput {
  metaLibraryTemplates?: MetaLibraryTemplateDefinition[];
  nextToken?: string;
}
export const ListWhatsAppTemplateLibraryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metaLibraryTemplates: S.optional(MetaLibraryTemplatesList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWhatsAppTemplateLibraryOutput",
}) as any as S.Schema<ListWhatsAppTemplateLibraryOutput>;
export interface PostWhatsAppMessageMediaInput {
  originationPhoneNumberId: string;
  sourceS3PresignedUrl?: S3PresignedUrl;
  sourceS3File?: S3File;
}
export const PostWhatsAppMessageMediaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    originationPhoneNumberId: S.String,
    sourceS3PresignedUrl: S.optional(S3PresignedUrl),
    sourceS3File: S.optional(S3File),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/media" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PostWhatsAppMessageMediaInput",
}) as any as S.Schema<PostWhatsAppMessageMediaInput>;
export interface PostWhatsAppMessageMediaOutput {
  mediaId?: string;
}
export const PostWhatsAppMessageMediaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mediaId: S.optional(S.String) }),
).annotate({
  identifier: "PostWhatsAppMessageMediaOutput",
}) as any as S.Schema<PostWhatsAppMessageMediaOutput>;
export interface PublishWhatsAppFlowInput {
  id: string;
  flowId: string;
}
export const PublishWhatsAppFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, flowId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/flow/publish" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PublishWhatsAppFlowInput",
}) as any as S.Schema<PublishWhatsAppFlowInput>;
export interface PublishWhatsAppFlowOutput {}
export const PublishWhatsAppFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PublishWhatsAppFlowOutput",
}) as any as S.Schema<PublishWhatsAppFlowOutput>;
export interface PutWhatsAppBusinessAccountEventDestinationsInput {
  id: string;
  eventDestinations: WhatsAppBusinessAccountEventDestination[];
}
export const PutWhatsAppBusinessAccountEventDestinationsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String,
      eventDestinations: WhatsAppBusinessAccountEventDestinations,
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/whatsapp/waba/eventdestinations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutWhatsAppBusinessAccountEventDestinationsInput",
  }) as any as S.Schema<PutWhatsAppBusinessAccountEventDestinationsInput>;
export interface PutWhatsAppBusinessAccountEventDestinationsOutput {}
export const PutWhatsAppBusinessAccountEventDestinationsOutput =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutWhatsAppBusinessAccountEventDestinationsOutput",
  }) as any as S.Schema<PutWhatsAppBusinessAccountEventDestinationsOutput>;
export type WhatsAppMessageBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface SendWhatsAppMessageInput {
  originationPhoneNumberId: string;
  message: Uint8Array | redacted.Redacted<Uint8Array>;
  metaApiVersion: string;
}
export const SendWhatsAppMessageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    originationPhoneNumberId: S.String,
    message: SensitiveBlob,
    metaApiVersion: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/send" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendWhatsAppMessageInput",
}) as any as S.Schema<SendWhatsAppMessageInput>;
export interface SendWhatsAppMessageOutput {
  messageId?: string;
}
export const SendWhatsAppMessageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messageId: S.optional(S.String) }),
).annotate({
  identifier: "SendWhatsAppMessageOutput",
}) as any as S.Schema<SendWhatsAppMessageOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tags/tag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {
  statusCode?: number;
}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statusCode: S.optional(S.Number) }),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: StringList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tags/untag-resource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {
  statusCode?: number;
}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ statusCode: S.optional(S.Number) }),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateWhatsAppFlowInput {
  id: string;
  flowId: string;
  flowName?: string;
  categories?: MetaFlowCategory[];
}
export const UpdateWhatsAppFlowInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    flowId: S.String,
    flowName: S.optional(S.String),
    categories: S.optional(MetaFlowCategoryList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/flow/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWhatsAppFlowInput",
}) as any as S.Schema<UpdateWhatsAppFlowInput>;
export interface UpdateWhatsAppFlowOutput {}
export const UpdateWhatsAppFlowOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWhatsAppFlowOutput",
}) as any as S.Schema<UpdateWhatsAppFlowOutput>;
export interface UpdateWhatsAppFlowAssetsInput {
  id: string;
  flowId: string;
  flowJson: Uint8Array;
}
export const UpdateWhatsAppFlowAssetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, flowId: S.String, flowJson: T.Blob }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/flow/assets/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWhatsAppFlowAssetsInput",
}) as any as S.Schema<UpdateWhatsAppFlowAssetsInput>;
export interface UpdateWhatsAppFlowAssetsOutput {
  validationErrors?: string[];
}
export const UpdateWhatsAppFlowAssetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ validationErrors: S.optional(ValidationErrorList) }),
).annotate({
  identifier: "UpdateWhatsAppFlowAssetsOutput",
}) as any as S.Schema<UpdateWhatsAppFlowAssetsOutput>;
export type MetaParameterFormat = string;
export type MetaTemplateComponents = Uint8Array;
export type MetaTemplateCtaLinkTrackingOptedOut = boolean;
export interface UpdateWhatsAppMessageTemplateInput {
  id: string;
  metaTemplateId?: string;
  templateName?: string;
  templateLanguageCode?: string;
  parameterFormat?: string;
  templateCategory?: string;
  templateComponents?: Uint8Array;
  ctaUrlLinkTrackingOptedOut?: boolean;
}
export const UpdateWhatsAppMessageTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    metaTemplateId: S.optional(S.String),
    templateName: S.optional(S.String),
    templateLanguageCode: S.optional(S.String),
    parameterFormat: S.optional(S.String),
    templateCategory: S.optional(S.String),
    templateComponents: S.optional(T.Blob),
    ctaUrlLinkTrackingOptedOut: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/whatsapp/template" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWhatsAppMessageTemplateInput",
}) as any as S.Schema<UpdateWhatsAppMessageTemplateInput>;
export interface UpdateWhatsAppMessageTemplateOutput {}
export const UpdateWhatsAppMessageTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWhatsAppMessageTemplateOutput",
}) as any as S.Schema<UpdateWhatsAppMessageTemplateOutput>;
export type ErrorMessage = string;
export type AssociateWhatsAppBusinessAccountError =
  | DependencyException
  | InvalidParametersException
  | LimitExceededException
  | ThrottledRequestException
  | CommonErrors;
/**
 * This is only used through the Amazon Web Services console during sign-up to associate your WhatsApp Business Account to your Amazon Web Services account.
 */
export const associateWhatsAppBusinessAccount: API.OperationMethod<
  AssociateWhatsAppBusinessAccountInput,
  AssociateWhatsAppBusinessAccountOutput,
  AssociateWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateWhatsAppBusinessAccountInput,
  output: AssociateWhatsAppBusinessAccountOutput,
  errors: [
    DependencyException,
    InvalidParametersException,
    LimitExceededException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWhatsAppBusinessAccount",
}));

export type CreateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a new WhatsApp Flow. Flows enable businesses to create rich, interactive forms and experiences
 * that users can complete without leaving WhatsApp. The Flow is created in DRAFT status. If `publish`
 * is set to `true` and a valid `flowJson` is provided, the Flow is published immediately.
 */
export const createWhatsAppFlow: API.OperationMethod<
  CreateWhatsAppFlowInput,
  CreateWhatsAppFlowOutput,
  CreateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatsAppFlowInput,
  output: CreateWhatsAppFlowOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppFlow",
}));

export type CreateWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a new WhatsApp message template from a custom definition.
 *
 * Amazon Web Services End User Messaging Social does not store any WhatsApp message template content.
 */
export const createWhatsAppMessageTemplate: API.OperationMethod<
  CreateWhatsAppMessageTemplateInput,
  CreateWhatsAppMessageTemplateOutput,
  CreateWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatsAppMessageTemplateInput,
  output: CreateWhatsAppMessageTemplateOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplate",
}));

export type CreateWhatsAppMessageTemplateFromLibraryError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Creates a new WhatsApp message template using a template from Meta's template library.
 */
export const createWhatsAppMessageTemplateFromLibrary: API.OperationMethod<
  CreateWhatsAppMessageTemplateFromLibraryInput,
  CreateWhatsAppMessageTemplateFromLibraryOutput,
  CreateWhatsAppMessageTemplateFromLibraryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatsAppMessageTemplateFromLibraryInput,
  output: CreateWhatsAppMessageTemplateFromLibraryOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplateFromLibrary",
}));

export type CreateWhatsAppMessageTemplateMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Uploads media for use in a WhatsApp message template.
 */
export const createWhatsAppMessageTemplateMedia: API.OperationMethod<
  CreateWhatsAppMessageTemplateMediaInput,
  CreateWhatsAppMessageTemplateMediaOutput,
  CreateWhatsAppMessageTemplateMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatsAppMessageTemplateMediaInput,
  output: CreateWhatsAppMessageTemplateMediaOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatsAppMessageTemplateMedia",
}));

export type DeleteWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Deletes a WhatsApp Flow permanently. Only Flows in DRAFT status can be deleted. Published or deprecated Flows cannot be deleted.
 */
export const deleteWhatsAppFlow: API.OperationMethod<
  DeleteWhatsAppFlowInput,
  DeleteWhatsAppFlowOutput,
  DeleteWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWhatsAppFlowInput,
  output: DeleteWhatsAppFlowOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppFlow",
}));

export type DeleteWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Delete a media object from the WhatsApp service. If the object is still in an Amazon S3 bucket you should delete it from there too.
 */
export const deleteWhatsAppMessageMedia: API.OperationMethod<
  DeleteWhatsAppMessageMediaInput,
  DeleteWhatsAppMessageMediaOutput,
  DeleteWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWhatsAppMessageMediaInput,
  output: DeleteWhatsAppMessageMediaOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppMessageMedia",
}));

export type DeleteWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Deletes a WhatsApp message template.
 */
export const deleteWhatsAppMessageTemplate: API.OperationMethod<
  DeleteWhatsAppMessageTemplateInput,
  DeleteWhatsAppMessageTemplateOutput,
  DeleteWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWhatsAppMessageTemplateInput,
  output: DeleteWhatsAppMessageTemplateOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatsAppMessageTemplate",
}));

export type DeprecateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Deprecates a published WhatsApp Flow, marking it as no longer recommended for use. The Flow must be in PUBLISHED status. This is an irreversible operation.
 */
export const deprecateWhatsAppFlow: API.OperationMethod<
  DeprecateWhatsAppFlowInput,
  DeprecateWhatsAppFlowOutput,
  DeprecateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeprecateWhatsAppFlowInput,
  output: DeprecateWhatsAppFlowOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprecateWhatsAppFlow",
}));

export type DisassociateWhatsAppBusinessAccountError =
  | DependencyException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Disassociate a WhatsApp Business Account (WABA) from your Amazon Web Services account.
 */
export const disassociateWhatsAppBusinessAccount: API.OperationMethod<
  DisassociateWhatsAppBusinessAccountInput,
  DisassociateWhatsAppBusinessAccountOutput,
  DisassociateWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateWhatsAppBusinessAccountInput,
  output: DisassociateWhatsAppBusinessAccountOutput,
  errors: [
    DependencyException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWhatsAppBusinessAccount",
}));

export type GetLinkedWhatsAppBusinessAccountError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Get the details of your linked WhatsApp Business Account.
 */
export const getLinkedWhatsAppBusinessAccount: API.OperationMethod<
  GetLinkedWhatsAppBusinessAccountInput,
  GetLinkedWhatsAppBusinessAccountOutput,
  GetLinkedWhatsAppBusinessAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLinkedWhatsAppBusinessAccountInput,
  output: GetLinkedWhatsAppBusinessAccountOutput,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkedWhatsAppBusinessAccount",
}));

export type GetLinkedWhatsAppBusinessAccountPhoneNumberError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieve the WABA account id and phone number details of a WhatsApp business account phone number.
 */
export const getLinkedWhatsAppBusinessAccountPhoneNumber: API.OperationMethod<
  GetLinkedWhatsAppBusinessAccountPhoneNumberInput,
  GetLinkedWhatsAppBusinessAccountPhoneNumberOutput,
  GetLinkedWhatsAppBusinessAccountPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLinkedWhatsAppBusinessAccountPhoneNumberInput,
  output: GetLinkedWhatsAppBusinessAccountPhoneNumberOutput,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkedWhatsAppBusinessAccountPhoneNumber",
}));

export type GetWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieves the metadata and status of a WhatsApp Flow, including validation errors, preview information, and health status.
 */
export const getWhatsAppFlow: API.OperationMethod<
  GetWhatsAppFlowInput,
  GetWhatsAppFlowOutput,
  GetWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWhatsAppFlowInput,
  output: GetWhatsAppFlowOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppFlow",
}));

export type GetWhatsAppFlowPreviewError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Generates a web preview URL for testing a WhatsApp Flow before publishing. Preview URLs expire in 30 days and can be shared with stakeholders for review.
 */
export const getWhatsAppFlowPreview: API.OperationMethod<
  GetWhatsAppFlowPreviewInput,
  GetWhatsAppFlowPreviewOutput,
  GetWhatsAppFlowPreviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWhatsAppFlowPreviewInput,
  output: GetWhatsAppFlowPreviewOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppFlowPreview",
}));

export type GetWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Get a media file from the WhatsApp service. On successful completion the media file is
 * retrieved from Meta and stored in the specified Amazon S3 bucket. Use either
 * `destinationS3File` or `destinationS3PresignedUrl` for the
 * destination. If both are used then an `InvalidParameterException` is
 * returned.
 */
export const getWhatsAppMessageMedia: API.OperationMethod<
  GetWhatsAppMessageMediaInput,
  GetWhatsAppMessageMediaOutput,
  GetWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWhatsAppMessageMediaInput,
  output: GetWhatsAppMessageMediaOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppMessageMedia",
}));

export type GetWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Retrieves a specific WhatsApp message template.
 */
export const getWhatsAppMessageTemplate: API.OperationMethod<
  GetWhatsAppMessageTemplateInput,
  GetWhatsAppMessageTemplateOutput,
  GetWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWhatsAppMessageTemplateInput,
  output: GetWhatsAppMessageTemplateOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWhatsAppMessageTemplate",
}));

export type ListLinkedWhatsAppBusinessAccountsError =
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * List all WhatsApp Business Accounts linked to your Amazon Web Services account.
 */
export const listLinkedWhatsAppBusinessAccounts: API.PaginatedOperationMethod<
  ListLinkedWhatsAppBusinessAccountsInput,
  ListLinkedWhatsAppBusinessAccountsOutput,
  ListLinkedWhatsAppBusinessAccountsError,
  Credentials | HttpClient.HttpClient,
  LinkedWhatsAppBusinessAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLinkedWhatsAppBusinessAccountsInput,
  output: ListLinkedWhatsAppBusinessAccountsOutput,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinkedWhatsAppBusinessAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "linkedAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * List all tags associated with a resource, such as a phone number or WABA.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWhatsAppFlowAssetsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists the assets (Flow JSON definition) of a WhatsApp Flow with presigned download URLs. Download URLs are generated by Meta and expire after a short period.
 */
export const listWhatsAppFlowAssets: API.PaginatedOperationMethod<
  ListWhatsAppFlowAssetsInput,
  ListWhatsAppFlowAssetsOutput,
  ListWhatsAppFlowAssetsError,
  Credentials | HttpClient.HttpClient,
  MetaFlowAsset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatsAppFlowAssetsInput,
  output: ListWhatsAppFlowAssetsOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppFlowAssets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowAssets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWhatsAppFlowsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists all WhatsApp Flows for a WhatsApp Business Account. Returns summary information including Flow ID, name, status, and categories.
 */
export const listWhatsAppFlows: API.PaginatedOperationMethod<
  ListWhatsAppFlowsInput,
  ListWhatsAppFlowsOutput,
  ListWhatsAppFlowsError,
  Credentials | HttpClient.HttpClient,
  MetaFlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatsAppFlowsInput,
  output: ListWhatsAppFlowsOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppFlows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWhatsAppMessageTemplatesError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists WhatsApp message templates for a specific WhatsApp Business Account.
 */
export const listWhatsAppMessageTemplates: API.PaginatedOperationMethod<
  ListWhatsAppMessageTemplatesInput,
  ListWhatsAppMessageTemplatesOutput,
  ListWhatsAppMessageTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatsAppMessageTemplatesInput,
  output: ListWhatsAppMessageTemplatesOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppMessageTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWhatsAppTemplateLibraryError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Lists templates available in Meta's template library for WhatsApp messaging.
 */
export const listWhatsAppTemplateLibrary: API.PaginatedOperationMethod<
  ListWhatsAppTemplateLibraryInput,
  ListWhatsAppTemplateLibraryOutput,
  ListWhatsAppTemplateLibraryError,
  Credentials | HttpClient.HttpClient,
  MetaLibraryTemplateDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatsAppTemplateLibraryInput,
  output: ListWhatsAppTemplateLibraryOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatsAppTemplateLibrary",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "metaLibraryTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PostWhatsAppMessageMediaError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Upload a media file to the WhatsApp service. Only the specified
 * `originationPhoneNumberId` has the permissions to send the media file when
 * using SendWhatsAppMessage. You must use either `sourceS3File`
 * or `sourceS3PresignedUrl` for the source. If both or neither are specified then an
 * `InvalidParameterException` is returned.
 */
export const postWhatsAppMessageMedia: API.OperationMethod<
  PostWhatsAppMessageMediaInput,
  PostWhatsAppMessageMediaOutput,
  PostWhatsAppMessageMediaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostWhatsAppMessageMediaInput,
  output: PostWhatsAppMessageMediaOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostWhatsAppMessageMedia",
}));

export type PublishWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Publishes a WhatsApp Flow, making it available for use in template messages. The Flow must be in DRAFT status with valid Flow JSON that passes Meta's validation. This is an irreversible operation.
 */
export const publishWhatsAppFlow: API.OperationMethod<
  PublishWhatsAppFlowInput,
  PublishWhatsAppFlowOutput,
  PublishWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishWhatsAppFlowInput,
  output: PublishWhatsAppFlowOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishWhatsAppFlow",
}));

export type PutWhatsAppBusinessAccountEventDestinationsError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Add an event destination to log event data from WhatsApp for a WhatsApp Business Account (WABA). A WABA can only have one event destination at a time. All resources associated with the WABA use the same event destination.
 */
export const putWhatsAppBusinessAccountEventDestinations: API.OperationMethod<
  PutWhatsAppBusinessAccountEventDestinationsInput,
  PutWhatsAppBusinessAccountEventDestinationsOutput,
  PutWhatsAppBusinessAccountEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutWhatsAppBusinessAccountEventDestinationsInput,
  output: PutWhatsAppBusinessAccountEventDestinationsOutput,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWhatsAppBusinessAccountEventDestinations",
}));

export type SendWhatsAppMessageError =
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | AccessDeniedByMetaException
  | CommonErrors;
/**
 * Send a WhatsApp message. For examples of sending a message using the Amazon Web Services
 * CLI, see Sending messages in the
 *
 * *Amazon Web Services End User Messaging Social User Guide*
 * .
 */
export const sendWhatsAppMessage: API.OperationMethod<
  SendWhatsAppMessageInput,
  SendWhatsAppMessageOutput,
  SendWhatsAppMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendWhatsAppMessageInput,
  output: SendWhatsAppMessageOutput,
  errors: [
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
    AccessDeniedByMetaException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendWhatsAppMessage",
}));

export type TagResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified resource. When you specify
 * an existing tag key, the value is overwritten with the new value.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceException
  | InvalidParametersException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Removes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    InternalServiceException,
    InvalidParametersException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateWhatsAppFlowError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates the metadata of a WhatsApp Flow, such as its name or categories. This does not update the Flow JSON definition. Use UpdateWhatsAppFlowAssets to update the Flow JSON.
 */
export const updateWhatsAppFlow: API.OperationMethod<
  UpdateWhatsAppFlowInput,
  UpdateWhatsAppFlowOutput,
  UpdateWhatsAppFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWhatsAppFlowInput,
  output: UpdateWhatsAppFlowOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppFlow",
}));

export type UpdateWhatsAppFlowAssetsError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates the Flow JSON definition (assets) of a WhatsApp Flow. Updating a published Flow's assets reverts it to DRAFT status, requiring re-publishing.
 */
export const updateWhatsAppFlowAssets: API.OperationMethod<
  UpdateWhatsAppFlowAssetsInput,
  UpdateWhatsAppFlowAssetsOutput,
  UpdateWhatsAppFlowAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWhatsAppFlowAssetsInput,
  output: UpdateWhatsAppFlowAssetsOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppFlowAssets",
}));

export type UpdateWhatsAppMessageTemplateError =
  | AccessDeniedByMetaException
  | DependencyException
  | InternalServiceException
  | InvalidParametersException
  | ResourceNotFoundException
  | ThrottledRequestException
  | CommonErrors;
/**
 * Updates an existing WhatsApp message template.
 */
export const updateWhatsAppMessageTemplate: API.OperationMethod<
  UpdateWhatsAppMessageTemplateInput,
  UpdateWhatsAppMessageTemplateOutput,
  UpdateWhatsAppMessageTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWhatsAppMessageTemplateInput,
  output: UpdateWhatsAppMessageTemplateOutput,
  errors: [
    AccessDeniedByMetaException,
    DependencyException,
    InternalServiceException,
    InvalidParametersException,
    ResourceNotFoundException,
    ThrottledRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWhatsAppMessageTemplate",
}));
