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
  sdkId: "WorkSpaces Web",
  serviceShapeName: "AWSErmineControlPlaneService",
});
const auth = T.AwsAuthSigv4({ name: "workspaces-web" });
const ver = T.ServiceVersion("2020-07-08");
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
              `https://workspaces-web-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://workspaces-web-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://workspaces-web.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://workspaces-web.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ARN = string;
export interface AssociateBrowserSettingsRequest {
  portalArn: string;
  browserSettingsArn: string;
}
export const AssociateBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    browserSettingsArn: S.String.pipe(T.HttpQuery("browserSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}/browserSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateBrowserSettingsRequest",
}) as any as S.Schema<AssociateBrowserSettingsRequest>;
export interface AssociateBrowserSettingsResponse {
  portalArn: string;
  browserSettingsArn: string;
}
export const AssociateBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, browserSettingsArn: S.String }),
).annotate({
  identifier: "AssociateBrowserSettingsResponse",
}) as any as S.Schema<AssociateBrowserSettingsResponse>;
export interface AssociateDataProtectionSettingsRequest {
  portalArn: string;
  dataProtectionSettingsArn: string;
}
export const AssociateDataProtectionSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      portalArn: S.String.pipe(T.HttpLabel("portalArn")),
      dataProtectionSettingsArn: S.String.pipe(
        T.HttpQuery("dataProtectionSettingsArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/portals/{portalArn+}/dataProtectionSettings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateDataProtectionSettingsRequest",
}) as any as S.Schema<AssociateDataProtectionSettingsRequest>;
export interface AssociateDataProtectionSettingsResponse {
  portalArn: string;
  dataProtectionSettingsArn: string;
}
export const AssociateDataProtectionSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ portalArn: S.String, dataProtectionSettingsArn: S.String }),
).annotate({
  identifier: "AssociateDataProtectionSettingsResponse",
}) as any as S.Schema<AssociateDataProtectionSettingsResponse>;
export interface AssociateIpAccessSettingsRequest {
  portalArn: string;
  ipAccessSettingsArn: string;
}
export const AssociateIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    ipAccessSettingsArn: S.String.pipe(T.HttpQuery("ipAccessSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}/ipAccessSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateIpAccessSettingsRequest",
}) as any as S.Schema<AssociateIpAccessSettingsRequest>;
export interface AssociateIpAccessSettingsResponse {
  portalArn: string;
  ipAccessSettingsArn: string;
}
export const AssociateIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, ipAccessSettingsArn: S.String }),
).annotate({
  identifier: "AssociateIpAccessSettingsResponse",
}) as any as S.Schema<AssociateIpAccessSettingsResponse>;
export interface AssociateNetworkSettingsRequest {
  portalArn: string;
  networkSettingsArn: string;
}
export const AssociateNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    networkSettingsArn: S.String.pipe(T.HttpQuery("networkSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}/networkSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateNetworkSettingsRequest",
}) as any as S.Schema<AssociateNetworkSettingsRequest>;
export interface AssociateNetworkSettingsResponse {
  portalArn: string;
  networkSettingsArn: string;
}
export const AssociateNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, networkSettingsArn: S.String }),
).annotate({
  identifier: "AssociateNetworkSettingsResponse",
}) as any as S.Schema<AssociateNetworkSettingsResponse>;
export interface AssociateSessionLoggerRequest {
  portalArn: string;
  sessionLoggerArn: string;
}
export const AssociateSessionLoggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    sessionLoggerArn: S.String.pipe(T.HttpQuery("sessionLoggerArn")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}/sessionLogger" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateSessionLoggerRequest",
}) as any as S.Schema<AssociateSessionLoggerRequest>;
export interface AssociateSessionLoggerResponse {
  portalArn: string;
  sessionLoggerArn: string;
}
export const AssociateSessionLoggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, sessionLoggerArn: S.String }),
).annotate({
  identifier: "AssociateSessionLoggerResponse",
}) as any as S.Schema<AssociateSessionLoggerResponse>;
export interface AssociateTrustStoreRequest {
  portalArn: string;
  trustStoreArn: string;
}
export const AssociateTrustStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    trustStoreArn: S.String.pipe(T.HttpQuery("trustStoreArn")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}/trustStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateTrustStoreRequest",
}) as any as S.Schema<AssociateTrustStoreRequest>;
export interface AssociateTrustStoreResponse {
  portalArn: string;
  trustStoreArn: string;
}
export const AssociateTrustStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, trustStoreArn: S.String }),
).annotate({
  identifier: "AssociateTrustStoreResponse",
}) as any as S.Schema<AssociateTrustStoreResponse>;
export interface AssociateUserAccessLoggingSettingsRequest {
  portalArn: string;
  userAccessLoggingSettingsArn: string;
}
export const AssociateUserAccessLoggingSettingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      portalArn: S.String.pipe(T.HttpLabel("portalArn")),
      userAccessLoggingSettingsArn: S.String.pipe(
        T.HttpQuery("userAccessLoggingSettingsArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/portals/{portalArn+}/userAccessLoggingSettings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AssociateUserAccessLoggingSettingsRequest",
  }) as any as S.Schema<AssociateUserAccessLoggingSettingsRequest>;
export interface AssociateUserAccessLoggingSettingsResponse {
  portalArn: string;
  userAccessLoggingSettingsArn: string;
}
export const AssociateUserAccessLoggingSettingsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ portalArn: S.String, userAccessLoggingSettingsArn: S.String }),
  ).annotate({
    identifier: "AssociateUserAccessLoggingSettingsResponse",
  }) as any as S.Schema<AssociateUserAccessLoggingSettingsResponse>;
export interface AssociateUserSettingsRequest {
  portalArn: string;
  userSettingsArn: string;
}
export const AssociateUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    userSettingsArn: S.String.pipe(T.HttpQuery("userSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}/userSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateUserSettingsRequest",
}) as any as S.Schema<AssociateUserSettingsRequest>;
export interface AssociateUserSettingsResponse {
  portalArn: string;
  userSettingsArn: string;
}
export const AssociateUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, userSettingsArn: S.String }),
).annotate({
  identifier: "AssociateUserSettingsResponse",
}) as any as S.Schema<AssociateUserSettingsResponse>;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: SensitiveString, Value: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type KeyArn = string;
export type StringType = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export const EncryptionContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type BrowserPolicy = string | redacted.Redacted<string>;
export type ClientToken = string;
export type Category =
  | "Cults"
  | "Gambling"
  | "Nudity"
  | "Pornography"
  | "SexEducation"
  | "Tasteless"
  | "Violence"
  | "DownloadSites"
  | "ImageSharing"
  | "PeerToPeer"
  | "StreamingMediaAndDownloads"
  | "GenerativeAI"
  | "CriminalActivity"
  | "Hacking"
  | "HateAndIntolerance"
  | "IllegalDrug"
  | "IllegalSoftware"
  | "SchoolCheating"
  | "SelfHarm"
  | "Weapons"
  | "Chat"
  | "Games"
  | "InstantMessaging"
  | "ProfessionalNetwork"
  | "SocialNetworking"
  | "WebBasedEmail"
  | "ParkedDomains"
  | (string & {});
export const Category = S.String;

export type BlockedCategories = Category[];
export const BlockedCategories = /*@__PURE__*/ S.Array(Category);
export type UrlPattern = string | redacted.Redacted<string>;
export type UrlPatternList = (string | redacted.Redacted<string>)[];
export const UrlPatternList = /*@__PURE__*/ S.Array(SensitiveString);
export interface WebContentFilteringPolicy {
  blockedCategories?: Category[];
  allowedUrls?: (string | redacted.Redacted<string>)[];
  blockedUrls?: (string | redacted.Redacted<string>)[];
}
export const WebContentFilteringPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blockedCategories: S.optional(BlockedCategories),
    allowedUrls: S.optional(UrlPatternList),
    blockedUrls: S.optional(UrlPatternList),
  }),
).annotate({
  identifier: "WebContentFilteringPolicy",
}) as any as S.Schema<WebContentFilteringPolicy>;
export interface CreateBrowserSettingsRequest {
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  browserPolicy?: string | redacted.Redacted<string>;
  clientToken?: string;
  webContentFilteringPolicy?: WebContentFilteringPolicy;
}
export const CreateBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tags: S.optional(TagList),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    browserPolicy: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    webContentFilteringPolicy: S.optional(WebContentFilteringPolicy),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/browserSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBrowserSettingsRequest",
}) as any as S.Schema<CreateBrowserSettingsRequest>;
export interface CreateBrowserSettingsResponse {
  browserSettingsArn: string;
}
export const CreateBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserSettingsArn: S.String }),
).annotate({
  identifier: "CreateBrowserSettingsResponse",
}) as any as S.Schema<CreateBrowserSettingsResponse>;
export type DisplayNameSafe = string | redacted.Redacted<string>;
export type DescriptionSafe = string | redacted.Redacted<string>;
export type BuiltInPatternId = string | redacted.Redacted<string>;
export type PatternName = string | redacted.Redacted<string>;
export type Regex = string | redacted.Redacted<string>;
export interface CustomPattern {
  patternName: string | redacted.Redacted<string>;
  patternRegex: string | redacted.Redacted<string>;
  patternDescription?: string | redacted.Redacted<string>;
  keywordRegex?: string | redacted.Redacted<string>;
}
export const CustomPattern = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    patternName: SensitiveString,
    patternRegex: SensitiveString,
    patternDescription: S.optional(SensitiveString),
    keywordRegex: S.optional(SensitiveString),
  }),
).annotate({ identifier: "CustomPattern" }) as any as S.Schema<CustomPattern>;
export type RedactionPlaceHolderType = string;
export type RedactionPlaceHolderText = string | redacted.Redacted<string>;
export interface RedactionPlaceHolder {
  redactionPlaceHolderType: string;
  redactionPlaceHolderText?: string | redacted.Redacted<string>;
}
export const RedactionPlaceHolder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    redactionPlaceHolderType: S.String,
    redactionPlaceHolderText: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RedactionPlaceHolder",
}) as any as S.Schema<RedactionPlaceHolder>;
export type InlineRedactionUrl = string | redacted.Redacted<string>;
export type InlineRedactionUrls = (string | redacted.Redacted<string>)[];
export const InlineRedactionUrls = /*@__PURE__*/ S.Array(SensitiveString);
export type ConfidenceLevel = number;
export interface InlineRedactionPattern {
  builtInPatternId?: string | redacted.Redacted<string>;
  customPattern?: CustomPattern;
  redactionPlaceHolder: RedactionPlaceHolder;
  enforcedUrls?: (string | redacted.Redacted<string>)[];
  exemptUrls?: (string | redacted.Redacted<string>)[];
  confidenceLevel?: number;
}
export const InlineRedactionPattern = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    builtInPatternId: S.optional(SensitiveString),
    customPattern: S.optional(CustomPattern),
    redactionPlaceHolder: RedactionPlaceHolder,
    enforcedUrls: S.optional(InlineRedactionUrls),
    exemptUrls: S.optional(InlineRedactionUrls),
    confidenceLevel: S.optional(S.Number),
  }),
).annotate({
  identifier: "InlineRedactionPattern",
}) as any as S.Schema<InlineRedactionPattern>;
export type InlineRedactionPatterns = InlineRedactionPattern[];
export const InlineRedactionPatterns = /*@__PURE__*/ S.Array(
  InlineRedactionPattern,
);
export type GlobalInlineRedactionUrls = (string | redacted.Redacted<string>)[];
export const GlobalInlineRedactionUrls = /*@__PURE__*/ S.Array(SensitiveString);
export interface InlineRedactionConfiguration {
  inlineRedactionPatterns: InlineRedactionPattern[];
  globalEnforcedUrls?: (string | redacted.Redacted<string>)[];
  globalExemptUrls?: (string | redacted.Redacted<string>)[];
  globalConfidenceLevel?: number;
}
export const InlineRedactionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inlineRedactionPatterns: InlineRedactionPatterns,
    globalEnforcedUrls: S.optional(GlobalInlineRedactionUrls),
    globalExemptUrls: S.optional(GlobalInlineRedactionUrls),
    globalConfidenceLevel: S.optional(S.Number),
  }),
).annotate({
  identifier: "InlineRedactionConfiguration",
}) as any as S.Schema<InlineRedactionConfiguration>;
export interface CreateDataProtectionSettingsRequest {
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  inlineRedactionConfiguration?: InlineRedactionConfiguration;
  clientToken?: string;
}
export const CreateDataProtectionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    tags: S.optional(TagList),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    inlineRedactionConfiguration: S.optional(InlineRedactionConfiguration),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dataProtectionSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataProtectionSettingsRequest",
}) as any as S.Schema<CreateDataProtectionSettingsRequest>;
export interface CreateDataProtectionSettingsResponse {
  dataProtectionSettingsArn: string;
}
export const CreateDataProtectionSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ dataProtectionSettingsArn: S.String }),
).annotate({
  identifier: "CreateDataProtectionSettingsResponse",
}) as any as S.Schema<CreateDataProtectionSettingsResponse>;
export type IdentityProviderName = string | redacted.Redacted<string>;
export type IdentityProviderType = string;
export type IdentityProviderDetails = { [key: string]: string | undefined };
export const IdentityProviderDetails = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateIdentityProviderRequest {
  portalArn: string;
  identityProviderName: string | redacted.Redacted<string>;
  identityProviderType: string;
  identityProviderDetails: { [key: string]: string | undefined };
  clientToken?: string;
  tags?: Tag[];
}
export const CreateIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String,
    identityProviderName: SensitiveString,
    identityProviderType: S.String,
    identityProviderDetails: IdentityProviderDetails,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/identityProviders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIdentityProviderRequest",
}) as any as S.Schema<CreateIdentityProviderRequest>;
export type SubresourceARN = string;
export interface CreateIdentityProviderResponse {
  identityProviderArn: string;
}
export const CreateIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identityProviderArn: S.String }),
).annotate({
  identifier: "CreateIdentityProviderResponse",
}) as any as S.Schema<CreateIdentityProviderResponse>;
export type DisplayName = string | redacted.Redacted<string>;
export type Description = string | redacted.Redacted<string>;
export type IpRange = string | redacted.Redacted<string>;
export interface IpRule {
  ipRange: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export const IpRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipRange: SensitiveString,
    description: S.optional(SensitiveString),
  }),
).annotate({ identifier: "IpRule" }) as any as S.Schema<IpRule>;
export type IpRuleList = IpRule[];
export const IpRuleList = /*@__PURE__*/ S.Array(IpRule);
export interface CreateIpAccessSettingsRequest {
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  ipRules: IpRule[];
  clientToken?: string;
}
export const CreateIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    tags: S.optional(TagList),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    ipRules: IpRuleList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ipAccessSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIpAccessSettingsRequest",
}) as any as S.Schema<CreateIpAccessSettingsRequest>;
export interface CreateIpAccessSettingsResponse {
  ipAccessSettingsArn: string;
}
export const CreateIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ipAccessSettingsArn: S.String }),
).annotate({
  identifier: "CreateIpAccessSettingsResponse",
}) as any as S.Schema<CreateIpAccessSettingsResponse>;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateNetworkSettingsRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  tags?: Tag[];
  clientToken?: string;
}
export const CreateNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIdList,
    securityGroupIds: SecurityGroupIdList,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/networkSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateNetworkSettingsRequest",
}) as any as S.Schema<CreateNetworkSettingsRequest>;
export interface CreateNetworkSettingsResponse {
  networkSettingsArn: string;
}
export const CreateNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkSettingsArn: S.String }),
).annotate({
  identifier: "CreateNetworkSettingsResponse",
}) as any as S.Schema<CreateNetworkSettingsResponse>;
export type AuthenticationType = string;
export type InstanceType = string;
export type MaxConcurrentSessions = number;
export type PortalCustomDomain = string;
export interface CreatePortalRequest {
  displayName?: string | redacted.Redacted<string>;
  tags?: Tag[];
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  clientToken?: string;
  authenticationType?: string;
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export const CreatePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(SensitiveString),
    tags: S.optional(TagList),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    authenticationType: S.optional(S.String),
    instanceType: S.optional(S.String),
    maxConcurrentSessions: S.optional(S.Number),
    portalCustomDomain: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/portals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePortalRequest",
}) as any as S.Schema<CreatePortalRequest>;
export type PortalEndpoint = string;
export interface CreatePortalResponse {
  portalArn: string;
  portalEndpoint: string;
}
export const CreatePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String, portalEndpoint: S.String }),
).annotate({
  identifier: "CreatePortalResponse",
}) as any as S.Schema<CreatePortalResponse>;
export type Event =
  | "WebsiteInteract"
  | "FileDownloadFromSecureBrowserToRemoteDisk"
  | "FileTransferFromRemoteToLocalDisk"
  | "FileTransferFromLocalToRemoteDisk"
  | "FileUploadFromRemoteDiskToSecureBrowser"
  | "ContentPasteToWebsite"
  | "ContentTransferFromLocalToRemoteClipboard"
  | "ContentCopyFromWebsite"
  | "UrlLoad"
  | "TabOpen"
  | "TabClose"
  | "PrintJobSubmit"
  | "SessionConnect"
  | "SessionStart"
  | "SessionDisconnect"
  | "SessionEnd"
  | "UrlBlockByContentFilter"
  | (string & {});
export const Event = S.String;

export type Events = Event[];
export const Events = /*@__PURE__*/ S.Array(Event);
export type EventFilter =
  | { all: Record<string, never>; include?: never }
  | { all?: never; include: Event[] };
export const EventFilter = /*@__PURE__*/ S.Union([
  S.Struct({ all: S.Struct({}) }),
  S.Struct({ include: Events }),
]);
export type S3Bucket = string | redacted.Redacted<string>;
export type S3KeyPrefix = string | redacted.Redacted<string>;
export type S3BucketOwner = string;
export type LogFileFormat = "JSONLines" | "Json" | (string & {});
export const LogFileFormat = S.String;

export type FolderStructure = "Flat" | "NestedByDate" | (string & {});
export const FolderStructure = S.String;

export interface S3LogConfiguration {
  bucket: string | redacted.Redacted<string>;
  keyPrefix?: string | redacted.Redacted<string>;
  bucketOwner?: string;
  logFileFormat: LogFileFormat;
  folderStructure: FolderStructure;
}
export const S3LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: SensitiveString,
    keyPrefix: S.optional(SensitiveString),
    bucketOwner: S.optional(S.String),
    logFileFormat: LogFileFormat,
    folderStructure: FolderStructure,
  }),
).annotate({
  identifier: "S3LogConfiguration",
}) as any as S.Schema<S3LogConfiguration>;
export interface LogConfiguration {
  s3?: S3LogConfiguration;
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3: S.optional(S3LogConfiguration) }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export interface CreateSessionLoggerRequest {
  eventFilter: EventFilter;
  logConfiguration: LogConfiguration;
  displayName?: string | redacted.Redacted<string>;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  tags?: Tag[];
  clientToken?: string;
}
export const CreateSessionLoggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventFilter: EventFilter,
    logConfiguration: LogConfiguration,
    displayName: S.optional(SensitiveString),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sessionLoggers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSessionLoggerRequest",
}) as any as S.Schema<CreateSessionLoggerRequest>;
export interface CreateSessionLoggerResponse {
  sessionLoggerArn: string;
}
export const CreateSessionLoggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionLoggerArn: S.String }),
).annotate({
  identifier: "CreateSessionLoggerResponse",
}) as any as S.Schema<CreateSessionLoggerResponse>;
export type CertificateAuthorityBody = Uint8Array;
export type CertificateList = Uint8Array[];
export const CertificateList = /*@__PURE__*/ S.Array(T.Blob);
export interface CreateTrustStoreRequest {
  certificateList: Uint8Array[];
  tags?: Tag[];
  clientToken?: string;
}
export const CreateTrustStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateList: CertificateList,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/trustStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTrustStoreRequest",
}) as any as S.Schema<CreateTrustStoreRequest>;
export interface CreateTrustStoreResponse {
  trustStoreArn: string;
}
export const CreateTrustStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStoreArn: S.String }),
).annotate({
  identifier: "CreateTrustStoreResponse",
}) as any as S.Schema<CreateTrustStoreResponse>;
export type KinesisStreamArn = string;
export interface CreateUserAccessLoggingSettingsRequest {
  kinesisStreamArn: string;
  tags?: Tag[];
  clientToken?: string;
}
export const CreateUserAccessLoggingSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      kinesisStreamArn: S.String,
      tags: S.optional(TagList),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/userAccessLoggingSettings" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateUserAccessLoggingSettingsRequest",
}) as any as S.Schema<CreateUserAccessLoggingSettingsRequest>;
export interface CreateUserAccessLoggingSettingsResponse {
  userAccessLoggingSettingsArn: string;
}
export const CreateUserAccessLoggingSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ userAccessLoggingSettingsArn: S.String }),
).annotate({
  identifier: "CreateUserAccessLoggingSettingsResponse",
}) as any as S.Schema<CreateUserAccessLoggingSettingsResponse>;
export type EnabledType = string;
export type DisconnectTimeoutInMinutes = number;
export type IdleDisconnectTimeoutInMinutes = number;
export type CookieDomain = string | redacted.Redacted<string>;
export type CookieName = string | redacted.Redacted<string>;
export type CookiePath = string | redacted.Redacted<string>;
export interface CookieSpecification {
  domain: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string>;
  path?: string | redacted.Redacted<string>;
}
export const CookieSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domain: SensitiveString,
    name: S.optional(SensitiveString),
    path: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "CookieSpecification",
}) as any as S.Schema<CookieSpecification>;
export type CookieSpecifications = CookieSpecification[];
export const CookieSpecifications = /*@__PURE__*/ S.Array(CookieSpecification);
export interface CookieSynchronizationConfiguration {
  allowlist: CookieSpecification[];
  blocklist?: CookieSpecification[];
}
export const CookieSynchronizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowlist: CookieSpecifications,
    blocklist: S.optional(CookieSpecifications),
  }),
).annotate({
  identifier: "CookieSynchronizationConfiguration",
}) as any as S.Schema<CookieSynchronizationConfiguration>;
export type ToolbarType = string;
export type VisualMode = string;
export type ToolbarItem = string;
export type HiddenToolbarItemList = string[];
export const HiddenToolbarItemList = /*@__PURE__*/ S.Array(S.String);
export type MaxDisplayResolution = string;
export interface ToolbarConfiguration {
  toolbarType?: string;
  visualMode?: string;
  hiddenToolbarItems?: string[];
  maxDisplayResolution?: string;
}
export const ToolbarConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolbarType: S.optional(S.String),
    visualMode: S.optional(S.String),
    hiddenToolbarItems: S.optional(HiddenToolbarItemList),
    maxDisplayResolution: S.optional(S.String),
  }),
).annotate({
  identifier: "ToolbarConfiguration",
}) as any as S.Schema<ToolbarConfiguration>;
export type IconImage = Uint8Array;
export type S3Uri = string;
export type IconImageInput =
  | { blob: Uint8Array; s3Uri?: never }
  | { blob?: never; s3Uri: string };
export const IconImageInput = /*@__PURE__*/ S.Union([
  S.Struct({ blob: T.Blob }),
  S.Struct({ s3Uri: S.String }),
]);
export type WallpaperImage = Uint8Array;
export type WallpaperImageInput =
  | { blob: Uint8Array; s3Uri?: never }
  | { blob?: never; s3Uri: string };
export const WallpaperImageInput = /*@__PURE__*/ S.Union([
  S.Struct({ blob: T.Blob }),
  S.Struct({ s3Uri: S.String }),
]);
export type Locale =
  | "de-DE"
  | "en-US"
  | "es-ES"
  | "fr-FR"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "ko-KR"
  | "pt-BR"
  | "zh-CN"
  | "zh-TW"
  | (string & {});
export const Locale = S.String;

export type BrandingSafeStringType = string;
export type ContactLinkUrl = string;
export interface LocalizedBrandingStrings {
  browserTabTitle: string;
  welcomeText: string;
  loginTitle?: string;
  loginDescription?: string;
  loginButtonText?: string;
  contactLink?: string;
  contactButtonText?: string;
  loadingText?: string;
}
export const LocalizedBrandingStrings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserTabTitle: S.String,
    welcomeText: S.String,
    loginTitle: S.optional(S.String),
    loginDescription: S.optional(S.String),
    loginButtonText: S.optional(S.String),
    contactLink: S.optional(S.String),
    contactButtonText: S.optional(S.String),
    loadingText: S.optional(S.String),
  }),
).annotate({
  identifier: "LocalizedBrandingStrings",
}) as any as S.Schema<LocalizedBrandingStrings>;
export type LocalizedBrandingStringMap = {
  [key in Locale]?: LocalizedBrandingStrings;
};
export const LocalizedBrandingStringMap = /*@__PURE__*/ S.Record(
  Locale,
  LocalizedBrandingStrings.pipe(S.optional),
);
export type ColorTheme = "Light" | "Dark" | (string & {});
export const ColorTheme = S.String;

export type Markdown = string | redacted.Redacted<string>;
export interface BrandingConfigurationCreateInput {
  logo: IconImageInput;
  wallpaper?: WallpaperImageInput;
  favicon: IconImageInput;
  localizedStrings: { [key: string]: LocalizedBrandingStrings | undefined };
  colorTheme: ColorTheme;
  termsOfService?: string | redacted.Redacted<string>;
}
export const BrandingConfigurationCreateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logo: IconImageInput,
    wallpaper: S.optional(WallpaperImageInput),
    favicon: IconImageInput,
    localizedStrings: LocalizedBrandingStringMap,
    colorTheme: ColorTheme,
    termsOfService: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BrandingConfigurationCreateInput",
}) as any as S.Schema<BrandingConfigurationCreateInput>;
export interface CreateUserSettingsRequest {
  copyAllowed: string;
  pasteAllowed: string;
  downloadAllowed: string;
  uploadAllowed: string;
  printAllowed: string;
  tags?: Tag[];
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  clientToken?: string;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfigurationInput?: BrandingConfigurationCreateInput;
  webAuthnAllowed?: string;
}
export const CreateUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    copyAllowed: S.String,
    pasteAllowed: S.String,
    downloadAllowed: S.String,
    uploadAllowed: S.String,
    printAllowed: S.String,
    tags: S.optional(TagList),
    disconnectTimeoutInMinutes: S.optional(S.Number),
    idleDisconnectTimeoutInMinutes: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    cookieSynchronizationConfiguration: S.optional(
      CookieSynchronizationConfiguration,
    ),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    deepLinkAllowed: S.optional(S.String),
    toolbarConfiguration: S.optional(ToolbarConfiguration),
    brandingConfigurationInput: S.optional(BrandingConfigurationCreateInput),
    webAuthnAllowed: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/userSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUserSettingsRequest",
}) as any as S.Schema<CreateUserSettingsRequest>;
export interface CreateUserSettingsResponse {
  userSettingsArn: string;
}
export const CreateUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userSettingsArn: S.String }),
).annotate({
  identifier: "CreateUserSettingsResponse",
}) as any as S.Schema<CreateUserSettingsResponse>;
export interface DeleteBrowserSettingsRequest {
  browserSettingsArn: string;
}
export const DeleteBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserSettingsArn: S.String.pipe(T.HttpLabel("browserSettingsArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/browserSettings/{browserSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBrowserSettingsRequest",
}) as any as S.Schema<DeleteBrowserSettingsRequest>;
export interface DeleteBrowserSettingsResponse {}
export const DeleteBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBrowserSettingsResponse",
}) as any as S.Schema<DeleteBrowserSettingsResponse>;
export interface DeleteDataProtectionSettingsRequest {
  dataProtectionSettingsArn: string;
}
export const DeleteDataProtectionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProtectionSettingsArn: S.String.pipe(
      T.HttpLabel("dataProtectionSettingsArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/dataProtectionSettings/{dataProtectionSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataProtectionSettingsRequest",
}) as any as S.Schema<DeleteDataProtectionSettingsRequest>;
export interface DeleteDataProtectionSettingsResponse {}
export const DeleteDataProtectionSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteDataProtectionSettingsResponse",
}) as any as S.Schema<DeleteDataProtectionSettingsResponse>;
export interface DeleteIdentityProviderRequest {
  identityProviderArn: string;
}
export const DeleteIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderArn: S.String.pipe(T.HttpLabel("identityProviderArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/identityProviders/{identityProviderArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdentityProviderRequest",
}) as any as S.Schema<DeleteIdentityProviderRequest>;
export interface DeleteIdentityProviderResponse {}
export const DeleteIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIdentityProviderResponse",
}) as any as S.Schema<DeleteIdentityProviderResponse>;
export interface DeleteIpAccessSettingsRequest {
  ipAccessSettingsArn: string;
}
export const DeleteIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAccessSettingsArn: S.String.pipe(T.HttpLabel("ipAccessSettingsArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/ipAccessSettings/{ipAccessSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIpAccessSettingsRequest",
}) as any as S.Schema<DeleteIpAccessSettingsRequest>;
export interface DeleteIpAccessSettingsResponse {}
export const DeleteIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIpAccessSettingsResponse",
}) as any as S.Schema<DeleteIpAccessSettingsResponse>;
export interface DeleteNetworkSettingsRequest {
  networkSettingsArn: string;
}
export const DeleteNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkSettingsArn: S.String.pipe(T.HttpLabel("networkSettingsArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/networkSettings/{networkSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNetworkSettingsRequest",
}) as any as S.Schema<DeleteNetworkSettingsRequest>;
export interface DeleteNetworkSettingsResponse {}
export const DeleteNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNetworkSettingsResponse",
}) as any as S.Schema<DeleteNetworkSettingsResponse>;
export interface DeletePortalRequest {
  portalArn: string;
}
export const DeletePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/portals/{portalArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePortalRequest",
}) as any as S.Schema<DeletePortalRequest>;
export interface DeletePortalResponse {}
export const DeletePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePortalResponse",
}) as any as S.Schema<DeletePortalResponse>;
export interface DeleteSessionLoggerRequest {
  sessionLoggerArn: string;
}
export const DeleteSessionLoggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionLoggerArn: S.String.pipe(T.HttpLabel("sessionLoggerArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sessionLoggers/{sessionLoggerArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSessionLoggerRequest",
}) as any as S.Schema<DeleteSessionLoggerRequest>;
export interface DeleteSessionLoggerResponse {}
export const DeleteSessionLoggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSessionLoggerResponse",
}) as any as S.Schema<DeleteSessionLoggerResponse>;
export interface DeleteTrustStoreRequest {
  trustStoreArn: string;
}
export const DeleteTrustStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/trustStores/{trustStoreArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTrustStoreRequest",
}) as any as S.Schema<DeleteTrustStoreRequest>;
export interface DeleteTrustStoreResponse {}
export const DeleteTrustStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrustStoreResponse",
}) as any as S.Schema<DeleteTrustStoreResponse>;
export interface DeleteUserAccessLoggingSettingsRequest {
  userAccessLoggingSettingsArn: string;
}
export const DeleteUserAccessLoggingSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      userAccessLoggingSettingsArn: S.String.pipe(
        T.HttpLabel("userAccessLoggingSettingsArn"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteUserAccessLoggingSettingsRequest",
}) as any as S.Schema<DeleteUserAccessLoggingSettingsRequest>;
export interface DeleteUserAccessLoggingSettingsResponse {}
export const DeleteUserAccessLoggingSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteUserAccessLoggingSettingsResponse",
}) as any as S.Schema<DeleteUserAccessLoggingSettingsResponse>;
export interface DeleteUserSettingsRequest {
  userSettingsArn: string;
}
export const DeleteUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userSettingsArn: S.String.pipe(T.HttpLabel("userSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/userSettings/{userSettingsArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserSettingsRequest",
}) as any as S.Schema<DeleteUserSettingsRequest>;
export interface DeleteUserSettingsResponse {}
export const DeleteUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserSettingsResponse",
}) as any as S.Schema<DeleteUserSettingsResponse>;
export interface DisassociateBrowserSettingsRequest {
  portalArn: string;
}
export const DisassociateBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/portals/{portalArn+}/browserSettings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateBrowserSettingsRequest",
}) as any as S.Schema<DisassociateBrowserSettingsRequest>;
export interface DisassociateBrowserSettingsResponse {}
export const DisassociateBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateBrowserSettingsResponse",
}) as any as S.Schema<DisassociateBrowserSettingsResponse>;
export interface DisassociateDataProtectionSettingsRequest {
  portalArn: string;
}
export const DisassociateDataProtectionSettingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/portals/{portalArn+}/dataProtectionSettings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateDataProtectionSettingsRequest",
  }) as any as S.Schema<DisassociateDataProtectionSettingsRequest>;
export interface DisassociateDataProtectionSettingsResponse {}
export const DisassociateDataProtectionSettingsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateDataProtectionSettingsResponse",
  }) as any as S.Schema<DisassociateDataProtectionSettingsResponse>;
export interface DisassociateIpAccessSettingsRequest {
  portalArn: string;
}
export const DisassociateIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/portals/{portalArn+}/ipAccessSettings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateIpAccessSettingsRequest",
}) as any as S.Schema<DisassociateIpAccessSettingsRequest>;
export interface DisassociateIpAccessSettingsResponse {}
export const DisassociateIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateIpAccessSettingsResponse",
}) as any as S.Schema<DisassociateIpAccessSettingsResponse>;
export interface DisassociateNetworkSettingsRequest {
  portalArn: string;
}
export const DisassociateNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/portals/{portalArn+}/networkSettings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateNetworkSettingsRequest",
}) as any as S.Schema<DisassociateNetworkSettingsRequest>;
export interface DisassociateNetworkSettingsResponse {}
export const DisassociateNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateNetworkSettingsResponse",
}) as any as S.Schema<DisassociateNetworkSettingsResponse>;
export interface DisassociateSessionLoggerRequest {
  portalArn: string;
}
export const DisassociateSessionLoggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/sessionLogger" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateSessionLoggerRequest",
}) as any as S.Schema<DisassociateSessionLoggerRequest>;
export interface DisassociateSessionLoggerResponse {}
export const DisassociateSessionLoggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateSessionLoggerResponse",
}) as any as S.Schema<DisassociateSessionLoggerResponse>;
export interface DisassociateTrustStoreRequest {
  portalArn: string;
}
export const DisassociateTrustStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/trustStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateTrustStoreRequest",
}) as any as S.Schema<DisassociateTrustStoreRequest>;
export interface DisassociateTrustStoreResponse {}
export const DisassociateTrustStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateTrustStoreResponse",
}) as any as S.Schema<DisassociateTrustStoreResponse>;
export interface DisassociateUserAccessLoggingSettingsRequest {
  portalArn: string;
}
export const DisassociateUserAccessLoggingSettingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/portals/{portalArn+}/userAccessLoggingSettings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateUserAccessLoggingSettingsRequest",
  }) as any as S.Schema<DisassociateUserAccessLoggingSettingsRequest>;
export interface DisassociateUserAccessLoggingSettingsResponse {}
export const DisassociateUserAccessLoggingSettingsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateUserAccessLoggingSettingsResponse",
  }) as any as S.Schema<DisassociateUserAccessLoggingSettingsResponse>;
export interface DisassociateUserSettingsRequest {
  portalArn: string;
}
export const DisassociateUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/portals/{portalArn+}/userSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateUserSettingsRequest",
}) as any as S.Schema<DisassociateUserSettingsRequest>;
export interface DisassociateUserSettingsResponse {}
export const DisassociateUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateUserSettingsResponse",
}) as any as S.Schema<DisassociateUserSettingsResponse>;
export type PortalId = string;
export type SessionId = string;
export interface ExpireSessionRequest {
  portalId: string;
  sessionId: string;
}
export const ExpireSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String.pipe(T.HttpLabel("portalId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/portals/{portalId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExpireSessionRequest",
}) as any as S.Schema<ExpireSessionRequest>;
export interface ExpireSessionResponse {}
export const ExpireSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ExpireSessionResponse",
}) as any as S.Schema<ExpireSessionResponse>;
export interface GetBrowserSettingsRequest {
  browserSettingsArn: string;
}
export const GetBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserSettingsArn: S.String.pipe(T.HttpLabel("browserSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/browserSettings/{browserSettingsArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBrowserSettingsRequest",
}) as any as S.Schema<GetBrowserSettingsRequest>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface BrowserSettings {
  browserSettingsArn: string;
  associatedPortalArns?: string[];
  browserPolicy?: string | redacted.Redacted<string>;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  webContentFilteringPolicy?: WebContentFilteringPolicy;
}
export const BrowserSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserSettingsArn: S.String,
    associatedPortalArns: S.optional(ArnList),
    browserPolicy: S.optional(SensitiveString),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    webContentFilteringPolicy: S.optional(WebContentFilteringPolicy),
  }),
).annotate({
  identifier: "BrowserSettings",
}) as any as S.Schema<BrowserSettings>;
export interface GetBrowserSettingsResponse {
  browserSettings?: BrowserSettings;
}
export const GetBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserSettings: S.optional(BrowserSettings) }),
).annotate({
  identifier: "GetBrowserSettingsResponse",
}) as any as S.Schema<GetBrowserSettingsResponse>;
export interface GetDataProtectionSettingsRequest {
  dataProtectionSettingsArn: string;
}
export const GetDataProtectionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProtectionSettingsArn: S.String.pipe(
      T.HttpLabel("dataProtectionSettingsArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/dataProtectionSettings/{dataProtectionSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataProtectionSettingsRequest",
}) as any as S.Schema<GetDataProtectionSettingsRequest>;
export interface DataProtectionSettings {
  dataProtectionSettingsArn: string;
  inlineRedactionConfiguration?: InlineRedactionConfiguration;
  associatedPortalArns?: string[];
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
}
export const DataProtectionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProtectionSettingsArn: S.String,
    inlineRedactionConfiguration: S.optional(InlineRedactionConfiguration),
    associatedPortalArns: S.optional(ArnList),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
  }),
).annotate({
  identifier: "DataProtectionSettings",
}) as any as S.Schema<DataProtectionSettings>;
export interface GetDataProtectionSettingsResponse {
  dataProtectionSettings?: DataProtectionSettings;
}
export const GetDataProtectionSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataProtectionSettings: S.optional(DataProtectionSettings) }),
).annotate({
  identifier: "GetDataProtectionSettingsResponse",
}) as any as S.Schema<GetDataProtectionSettingsResponse>;
export interface GetIdentityProviderRequest {
  identityProviderArn: string;
}
export const GetIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderArn: S.String.pipe(T.HttpLabel("identityProviderArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/identityProviders/{identityProviderArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdentityProviderRequest",
}) as any as S.Schema<GetIdentityProviderRequest>;
export interface IdentityProvider {
  identityProviderArn: string;
  identityProviderName?: string | redacted.Redacted<string>;
  identityProviderType?: string;
  identityProviderDetails?: { [key: string]: string | undefined };
}
export const IdentityProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderArn: S.String,
    identityProviderName: S.optional(SensitiveString),
    identityProviderType: S.optional(S.String),
    identityProviderDetails: S.optional(IdentityProviderDetails),
  }),
).annotate({
  identifier: "IdentityProvider",
}) as any as S.Schema<IdentityProvider>;
export interface GetIdentityProviderResponse {
  identityProvider?: IdentityProvider;
}
export const GetIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identityProvider: S.optional(IdentityProvider) }),
).annotate({
  identifier: "GetIdentityProviderResponse",
}) as any as S.Schema<GetIdentityProviderResponse>;
export interface GetIpAccessSettingsRequest {
  ipAccessSettingsArn: string;
}
export const GetIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAccessSettingsArn: S.String.pipe(T.HttpLabel("ipAccessSettingsArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/ipAccessSettings/{ipAccessSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIpAccessSettingsRequest",
}) as any as S.Schema<GetIpAccessSettingsRequest>;
export interface IpAccessSettings {
  ipAccessSettingsArn: string;
  associatedPortalArns?: string[];
  ipRules?: IpRule[];
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
}
export const IpAccessSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAccessSettingsArn: S.String,
    associatedPortalArns: S.optional(ArnList),
    ipRules: S.optional(IpRuleList),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
  }),
).annotate({
  identifier: "IpAccessSettings",
}) as any as S.Schema<IpAccessSettings>;
export interface GetIpAccessSettingsResponse {
  ipAccessSettings?: IpAccessSettings;
}
export const GetIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ipAccessSettings: S.optional(IpAccessSettings) }),
).annotate({
  identifier: "GetIpAccessSettingsResponse",
}) as any as S.Schema<GetIpAccessSettingsResponse>;
export interface GetNetworkSettingsRequest {
  networkSettingsArn: string;
}
export const GetNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkSettingsArn: S.String.pipe(T.HttpLabel("networkSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networkSettings/{networkSettingsArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetNetworkSettingsRequest",
}) as any as S.Schema<GetNetworkSettingsRequest>;
export interface NetworkSettings {
  networkSettingsArn: string;
  associatedPortalArns?: string[];
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
}
export const NetworkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkSettingsArn: S.String,
    associatedPortalArns: S.optional(ArnList),
    vpcId: S.optional(S.String),
    subnetIds: S.optional(SubnetIdList),
    securityGroupIds: S.optional(SecurityGroupIdList),
  }),
).annotate({
  identifier: "NetworkSettings",
}) as any as S.Schema<NetworkSettings>;
export interface GetNetworkSettingsResponse {
  networkSettings?: NetworkSettings;
}
export const GetNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkSettings: S.optional(NetworkSettings) }),
).annotate({
  identifier: "GetNetworkSettingsResponse",
}) as any as S.Schema<GetNetworkSettingsResponse>;
export interface GetPortalRequest {
  portalArn: string;
}
export const GetPortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/portals/{portalArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPortalRequest",
}) as any as S.Schema<GetPortalRequest>;
export type RendererType = string;
export type BrowserType = string;
export type PortalStatus = string;
export type StatusReason = string;
export interface Portal {
  portalArn: string;
  rendererType?: string;
  browserType?: string;
  portalStatus?: string;
  portalEndpoint?: string;
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
  browserSettingsArn?: string;
  dataProtectionSettingsArn?: string;
  userSettingsArn?: string;
  networkSettingsArn?: string;
  sessionLoggerArn?: string;
  trustStoreArn?: string;
  statusReason?: string;
  userAccessLoggingSettingsArn?: string;
  authenticationType?: string;
  ipAccessSettingsArn?: string;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export const Portal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String,
    rendererType: S.optional(S.String),
    browserType: S.optional(S.String),
    portalStatus: S.optional(S.String),
    portalEndpoint: S.optional(S.String),
    displayName: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    browserSettingsArn: S.optional(S.String),
    dataProtectionSettingsArn: S.optional(S.String),
    userSettingsArn: S.optional(S.String),
    networkSettingsArn: S.optional(S.String),
    sessionLoggerArn: S.optional(S.String),
    trustStoreArn: S.optional(S.String),
    statusReason: S.optional(S.String),
    userAccessLoggingSettingsArn: S.optional(S.String),
    authenticationType: S.optional(S.String),
    ipAccessSettingsArn: S.optional(S.String),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    instanceType: S.optional(S.String),
    maxConcurrentSessions: S.optional(S.Number),
    portalCustomDomain: S.optional(S.String),
  }),
).annotate({ identifier: "Portal" }) as any as S.Schema<Portal>;
export interface GetPortalResponse {
  portal?: Portal;
}
export const GetPortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portal: S.optional(Portal) }),
).annotate({
  identifier: "GetPortalResponse",
}) as any as S.Schema<GetPortalResponse>;
export interface GetPortalServiceProviderMetadataRequest {
  portalArn: string;
}
export const GetPortalServiceProviderMetadataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ portalArn: S.String.pipe(T.HttpLabel("portalArn")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/portalIdp/{portalArn+}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetPortalServiceProviderMetadataRequest",
}) as any as S.Schema<GetPortalServiceProviderMetadataRequest>;
export type SamlMetadata = string;
export interface GetPortalServiceProviderMetadataResponse {
  portalArn: string;
  serviceProviderSamlMetadata?: string;
}
export const GetPortalServiceProviderMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      portalArn: S.String,
      serviceProviderSamlMetadata: S.optional(S.String),
    }),
).annotate({
  identifier: "GetPortalServiceProviderMetadataResponse",
}) as any as S.Schema<GetPortalServiceProviderMetadataResponse>;
export interface GetSessionRequest {
  portalId: string;
  sessionId: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String.pipe(T.HttpLabel("portalId")),
    sessionId: S.String.pipe(T.HttpLabel("sessionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/portals/{portalId}/sessions/{sessionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export type Username = string | redacted.Redacted<string>;
export type IpAddress = string | redacted.Redacted<string>;
export type IpAddressList = (string | redacted.Redacted<string>)[];
export const IpAddressList = /*@__PURE__*/ S.Array(SensitiveString);
export type SessionStatus = "Active" | "Terminated" | (string & {});
export const SessionStatus = S.String;

export interface Session {
  portalArn?: string;
  sessionId?: string;
  username?: string | redacted.Redacted<string>;
  clientIpAddresses?: (string | redacted.Redacted<string>)[];
  status?: SessionStatus;
  startTime?: Date;
  endTime?: Date;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.optional(S.String),
    sessionId: S.optional(S.String),
    username: S.optional(SensitiveString),
    clientIpAddresses: S.optional(IpAddressList),
    status: S.optional(SessionStatus),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export interface GetSessionResponse {
  session?: Session;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ session: S.optional(Session) }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export interface GetSessionLoggerRequest {
  sessionLoggerArn: string;
}
export const GetSessionLoggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionLoggerArn: S.String.pipe(T.HttpLabel("sessionLoggerArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sessionLoggers/{sessionLoggerArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSessionLoggerRequest",
}) as any as S.Schema<GetSessionLoggerRequest>;
export interface SessionLogger {
  sessionLoggerArn: string;
  eventFilter?: EventFilter;
  logConfiguration?: LogConfiguration;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  associatedPortalArns?: string[];
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export const SessionLogger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionLoggerArn: S.String,
    eventFilter: S.optional(EventFilter),
    logConfiguration: S.optional(LogConfiguration),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    associatedPortalArns: S.optional(ArnList),
    displayName: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SessionLogger" }) as any as S.Schema<SessionLogger>;
export interface GetSessionLoggerResponse {
  sessionLogger?: SessionLogger;
}
export const GetSessionLoggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionLogger: S.optional(SessionLogger) }),
).annotate({
  identifier: "GetSessionLoggerResponse",
}) as any as S.Schema<GetSessionLoggerResponse>;
export interface GetTrustStoreRequest {
  trustStoreArn: string;
}
export const GetTrustStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/trustStores/{trustStoreArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTrustStoreRequest",
}) as any as S.Schema<GetTrustStoreRequest>;
export interface TrustStore {
  associatedPortalArns?: string[];
  trustStoreArn: string;
}
export const TrustStore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associatedPortalArns: S.optional(ArnList),
    trustStoreArn: S.String,
  }),
).annotate({ identifier: "TrustStore" }) as any as S.Schema<TrustStore>;
export interface GetTrustStoreResponse {
  trustStore?: TrustStore;
}
export const GetTrustStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStore: S.optional(TrustStore) }),
).annotate({
  identifier: "GetTrustStoreResponse",
}) as any as S.Schema<GetTrustStoreResponse>;
export type CertificateThumbprint = string;
export interface GetTrustStoreCertificateRequest {
  trustStoreArn: string;
  thumbprint: string;
}
export const GetTrustStoreCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")),
    thumbprint: S.String.pipe(T.HttpQuery("thumbprint")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/trustStores/{trustStoreArn+}/certificate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTrustStoreCertificateRequest",
}) as any as S.Schema<GetTrustStoreCertificateRequest>;
export type CertificatePrincipal = string;
export interface Certificate {
  thumbprint?: string;
  subject?: string;
  issuer?: string;
  notValidBefore?: Date;
  notValidAfter?: Date;
  body?: Uint8Array;
}
export const Certificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thumbprint: S.optional(S.String),
    subject: S.optional(S.String),
    issuer: S.optional(S.String),
    notValidBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    notValidAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    body: S.optional(T.Blob),
  }),
).annotate({ identifier: "Certificate" }) as any as S.Schema<Certificate>;
export interface GetTrustStoreCertificateResponse {
  trustStoreArn: string;
  certificate?: Certificate;
}
export const GetTrustStoreCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStoreArn: S.String, certificate: S.optional(Certificate) }),
).annotate({
  identifier: "GetTrustStoreCertificateResponse",
}) as any as S.Schema<GetTrustStoreCertificateResponse>;
export interface GetUserAccessLoggingSettingsRequest {
  userAccessLoggingSettingsArn: string;
}
export const GetUserAccessLoggingSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userAccessLoggingSettingsArn: S.String.pipe(
      T.HttpLabel("userAccessLoggingSettingsArn"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserAccessLoggingSettingsRequest",
}) as any as S.Schema<GetUserAccessLoggingSettingsRequest>;
export interface UserAccessLoggingSettings {
  userAccessLoggingSettingsArn: string;
  associatedPortalArns?: string[];
  kinesisStreamArn?: string;
}
export const UserAccessLoggingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userAccessLoggingSettingsArn: S.String,
    associatedPortalArns: S.optional(ArnList),
    kinesisStreamArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UserAccessLoggingSettings",
}) as any as S.Schema<UserAccessLoggingSettings>;
export interface GetUserAccessLoggingSettingsResponse {
  userAccessLoggingSettings?: UserAccessLoggingSettings;
}
export const GetUserAccessLoggingSettingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      userAccessLoggingSettings: S.optional(UserAccessLoggingSettings),
    }),
).annotate({
  identifier: "GetUserAccessLoggingSettingsResponse",
}) as any as S.Schema<GetUserAccessLoggingSettingsResponse>;
export interface GetUserSettingsRequest {
  userSettingsArn: string;
}
export const GetUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userSettingsArn: S.String.pipe(T.HttpLabel("userSettingsArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/userSettings/{userSettingsArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserSettingsRequest",
}) as any as S.Schema<GetUserSettingsRequest>;
export type MimeType =
  | "image/png"
  | "image/jpeg"
  | "image/x-icon"
  | (string & {});
export const MimeType = S.String;

export interface ImageMetadata {
  mimeType: MimeType;
  fileExtension: string;
  lastUploadTimestamp: Date;
}
export const ImageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mimeType: MimeType,
    fileExtension: S.String,
    lastUploadTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "ImageMetadata" }) as any as S.Schema<ImageMetadata>;
export interface BrandingConfiguration {
  logo: ImageMetadata;
  wallpaper?: ImageMetadata;
  favicon: ImageMetadata;
  localizedStrings: { [key: string]: LocalizedBrandingStrings | undefined };
  colorTheme: ColorTheme;
  termsOfService?: string | redacted.Redacted<string>;
}
export const BrandingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logo: ImageMetadata,
    wallpaper: S.optional(ImageMetadata),
    favicon: ImageMetadata,
    localizedStrings: LocalizedBrandingStringMap,
    colorTheme: ColorTheme,
    termsOfService: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BrandingConfiguration",
}) as any as S.Schema<BrandingConfiguration>;
export interface UserSettings {
  userSettingsArn: string;
  associatedPortalArns?: string[];
  copyAllowed?: string;
  pasteAllowed?: string;
  downloadAllowed?: string;
  uploadAllowed?: string;
  printAllowed?: string;
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  customerManagedKey?: string;
  additionalEncryptionContext?: { [key: string]: string | undefined };
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfiguration?: BrandingConfiguration;
  webAuthnAllowed?: string;
}
export const UserSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userSettingsArn: S.String,
    associatedPortalArns: S.optional(ArnList),
    copyAllowed: S.optional(S.String),
    pasteAllowed: S.optional(S.String),
    downloadAllowed: S.optional(S.String),
    uploadAllowed: S.optional(S.String),
    printAllowed: S.optional(S.String),
    disconnectTimeoutInMinutes: S.optional(S.Number),
    idleDisconnectTimeoutInMinutes: S.optional(S.Number),
    cookieSynchronizationConfiguration: S.optional(
      CookieSynchronizationConfiguration,
    ),
    customerManagedKey: S.optional(S.String),
    additionalEncryptionContext: S.optional(EncryptionContextMap),
    deepLinkAllowed: S.optional(S.String),
    toolbarConfiguration: S.optional(ToolbarConfiguration),
    brandingConfiguration: S.optional(BrandingConfiguration),
    webAuthnAllowed: S.optional(S.String),
  }),
).annotate({ identifier: "UserSettings" }) as any as S.Schema<UserSettings>;
export interface GetUserSettingsResponse {
  userSettings?: UserSettings;
}
export const GetUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userSettings: S.optional(UserSettings) }),
).annotate({
  identifier: "GetUserSettingsResponse",
}) as any as S.Schema<GetUserSettingsResponse>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListBrowserSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/browserSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBrowserSettingsRequest",
}) as any as S.Schema<ListBrowserSettingsRequest>;
export interface BrowserSettingsSummary {
  browserSettingsArn: string;
}
export const BrowserSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserSettingsArn: S.String }),
).annotate({
  identifier: "BrowserSettingsSummary",
}) as any as S.Schema<BrowserSettingsSummary>;
export type BrowserSettingsList = BrowserSettingsSummary[];
export const BrowserSettingsList = /*@__PURE__*/ S.Array(
  BrowserSettingsSummary,
);
export interface ListBrowserSettingsResponse {
  browserSettings?: BrowserSettingsSummary[];
  nextToken?: string;
}
export const ListBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserSettings: S.optional(BrowserSettingsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBrowserSettingsResponse",
}) as any as S.Schema<ListBrowserSettingsResponse>;
export interface ListDataProtectionSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListDataProtectionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dataProtectionSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataProtectionSettingsRequest",
}) as any as S.Schema<ListDataProtectionSettingsRequest>;
export interface DataProtectionSettingsSummary {
  dataProtectionSettingsArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export const DataProtectionSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProtectionSettingsArn: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DataProtectionSettingsSummary",
}) as any as S.Schema<DataProtectionSettingsSummary>;
export type DataProtectionSettingsList = DataProtectionSettingsSummary[];
export const DataProtectionSettingsList = /*@__PURE__*/ S.Array(
  DataProtectionSettingsSummary,
);
export interface ListDataProtectionSettingsResponse {
  dataProtectionSettings?: DataProtectionSettingsSummary[];
  nextToken?: string;
}
export const ListDataProtectionSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProtectionSettings: S.optional(DataProtectionSettingsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataProtectionSettingsResponse",
}) as any as S.Schema<ListDataProtectionSettingsResponse>;
export interface ListIdentityProvidersRequest {
  nextToken?: string;
  maxResults?: number;
  portalArn: string;
}
export const ListIdentityProvidersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/portals/{portalArn+}/identityProviders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdentityProvidersRequest",
}) as any as S.Schema<ListIdentityProvidersRequest>;
export interface IdentityProviderSummary {
  identityProviderArn: string;
  identityProviderName?: string | redacted.Redacted<string>;
  identityProviderType?: string;
}
export const IdentityProviderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderArn: S.String,
    identityProviderName: S.optional(SensitiveString),
    identityProviderType: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityProviderSummary",
}) as any as S.Schema<IdentityProviderSummary>;
export type IdentityProviderList = IdentityProviderSummary[];
export const IdentityProviderList = /*@__PURE__*/ S.Array(
  IdentityProviderSummary,
);
export interface ListIdentityProvidersResponse {
  nextToken?: string;
  identityProviders?: IdentityProviderSummary[];
}
export const ListIdentityProvidersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    identityProviders: S.optional(IdentityProviderList),
  }),
).annotate({
  identifier: "ListIdentityProvidersResponse",
}) as any as S.Schema<ListIdentityProvidersResponse>;
export interface ListIpAccessSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ipAccessSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIpAccessSettingsRequest",
}) as any as S.Schema<ListIpAccessSettingsRequest>;
export interface IpAccessSettingsSummary {
  ipAccessSettingsArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export const IpAccessSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAccessSettingsArn: S.String,
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "IpAccessSettingsSummary",
}) as any as S.Schema<IpAccessSettingsSummary>;
export type IpAccessSettingsList = IpAccessSettingsSummary[];
export const IpAccessSettingsList = /*@__PURE__*/ S.Array(
  IpAccessSettingsSummary,
);
export interface ListIpAccessSettingsResponse {
  ipAccessSettings?: IpAccessSettingsSummary[];
  nextToken?: string;
}
export const ListIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAccessSettings: S.optional(IpAccessSettingsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIpAccessSettingsResponse",
}) as any as S.Schema<ListIpAccessSettingsResponse>;
export interface ListNetworkSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/networkSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworkSettingsRequest",
}) as any as S.Schema<ListNetworkSettingsRequest>;
export interface NetworkSettingsSummary {
  networkSettingsArn: string;
  vpcId?: string;
}
export const NetworkSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkSettingsArn: S.String, vpcId: S.optional(S.String) }),
).annotate({
  identifier: "NetworkSettingsSummary",
}) as any as S.Schema<NetworkSettingsSummary>;
export type NetworkSettingsList = NetworkSettingsSummary[];
export const NetworkSettingsList = /*@__PURE__*/ S.Array(
  NetworkSettingsSummary,
);
export interface ListNetworkSettingsResponse {
  networkSettings?: NetworkSettingsSummary[];
  nextToken?: string;
}
export const ListNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkSettings: S.optional(NetworkSettingsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNetworkSettingsResponse",
}) as any as S.Schema<ListNetworkSettingsResponse>;
export interface ListPortalsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPortalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/portals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPortalsRequest",
}) as any as S.Schema<ListPortalsRequest>;
export interface PortalSummary {
  portalArn: string;
  rendererType?: string;
  browserType?: string;
  portalStatus?: string;
  portalEndpoint?: string;
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
  browserSettingsArn?: string;
  dataProtectionSettingsArn?: string;
  userSettingsArn?: string;
  networkSettingsArn?: string;
  sessionLoggerArn?: string;
  trustStoreArn?: string;
  userAccessLoggingSettingsArn?: string;
  authenticationType?: string;
  ipAccessSettingsArn?: string;
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export const PortalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String,
    rendererType: S.optional(S.String),
    browserType: S.optional(S.String),
    portalStatus: S.optional(S.String),
    portalEndpoint: S.optional(S.String),
    displayName: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    browserSettingsArn: S.optional(S.String),
    dataProtectionSettingsArn: S.optional(S.String),
    userSettingsArn: S.optional(S.String),
    networkSettingsArn: S.optional(S.String),
    sessionLoggerArn: S.optional(S.String),
    trustStoreArn: S.optional(S.String),
    userAccessLoggingSettingsArn: S.optional(S.String),
    authenticationType: S.optional(S.String),
    ipAccessSettingsArn: S.optional(S.String),
    instanceType: S.optional(S.String),
    maxConcurrentSessions: S.optional(S.Number),
    portalCustomDomain: S.optional(S.String),
  }),
).annotate({ identifier: "PortalSummary" }) as any as S.Schema<PortalSummary>;
export type PortalList = PortalSummary[];
export const PortalList = /*@__PURE__*/ S.Array(PortalSummary);
export interface ListPortalsResponse {
  portals?: PortalSummary[];
  nextToken?: string;
}
export const ListPortalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portals: S.optional(PortalList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPortalsResponse",
}) as any as S.Schema<ListPortalsResponse>;
export interface ListSessionLoggersRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListSessionLoggersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sessionLoggers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionLoggersRequest",
}) as any as S.Schema<ListSessionLoggersRequest>;
export interface SessionLoggerSummary {
  sessionLoggerArn: string;
  logConfiguration?: LogConfiguration;
  displayName?: string | redacted.Redacted<string>;
  creationDate?: Date;
}
export const SessionLoggerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionLoggerArn: S.String,
    logConfiguration: S.optional(LogConfiguration),
    displayName: S.optional(SensitiveString),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SessionLoggerSummary",
}) as any as S.Schema<SessionLoggerSummary>;
export type SessionLoggerList = SessionLoggerSummary[];
export const SessionLoggerList = /*@__PURE__*/ S.Array(SessionLoggerSummary);
export interface ListSessionLoggersResponse {
  sessionLoggers?: SessionLoggerSummary[];
  nextToken?: string;
}
export const ListSessionLoggersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionLoggers: S.optional(SessionLoggerList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionLoggersResponse",
}) as any as S.Schema<ListSessionLoggersResponse>;
export type SessionSortBy =
  | "StartTimeAscending"
  | "StartTimeDescending"
  | (string & {});
export const SessionSortBy = S.String;

export interface ListSessionsRequest {
  portalId: string;
  username?: string | redacted.Redacted<string>;
  sessionId?: string;
  sortBy?: SessionSortBy;
  status?: SessionStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalId: S.String.pipe(T.HttpLabel("portalId")),
    username: S.optional(SensitiveString).pipe(T.HttpQuery("username")),
    sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
    sortBy: S.optional(SessionSortBy).pipe(T.HttpQuery("sortBy")),
    status: S.optional(SessionStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/portals/{portalId}/sessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export interface SessionSummary {
  portalArn?: string;
  sessionId?: string;
  username?: string | redacted.Redacted<string>;
  status?: SessionStatus;
  startTime?: Date;
  endTime?: Date;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.optional(S.String),
    sessionId: S.optional(S.String),
    username: S.optional(SensitiveString),
    status: S.optional(SessionStatus),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type SessionSummaryList = SessionSummary[];
export const SessionSummaryList = /*@__PURE__*/ S.Array(SessionSummary);
export interface ListSessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string;
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessions: SessionSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn+}" }),
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
export interface ListTrustStoreCertificatesRequest {
  trustStoreArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTrustStoreCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/trustStores/{trustStoreArn+}/certificates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrustStoreCertificatesRequest",
}) as any as S.Schema<ListTrustStoreCertificatesRequest>;
export interface CertificateSummary {
  thumbprint?: string;
  subject?: string;
  issuer?: string;
  notValidBefore?: Date;
  notValidAfter?: Date;
}
export const CertificateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    thumbprint: S.optional(S.String),
    subject: S.optional(S.String),
    issuer: S.optional(S.String),
    notValidBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    notValidAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CertificateSummary",
}) as any as S.Schema<CertificateSummary>;
export type CertificateSummaryList = CertificateSummary[];
export const CertificateSummaryList = /*@__PURE__*/ S.Array(CertificateSummary);
export interface ListTrustStoreCertificatesResponse {
  certificateList?: CertificateSummary[];
  trustStoreArn: string;
  nextToken?: string;
}
export const ListTrustStoreCertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateList: S.optional(CertificateSummaryList),
    trustStoreArn: S.String,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTrustStoreCertificatesResponse",
}) as any as S.Schema<ListTrustStoreCertificatesResponse>;
export interface ListTrustStoresRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListTrustStoresRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/trustStores" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrustStoresRequest",
}) as any as S.Schema<ListTrustStoresRequest>;
export interface TrustStoreSummary {
  trustStoreArn?: string;
}
export const TrustStoreSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStoreArn: S.optional(S.String) }),
).annotate({
  identifier: "TrustStoreSummary",
}) as any as S.Schema<TrustStoreSummary>;
export type TrustStoreSummaryList = TrustStoreSummary[];
export const TrustStoreSummaryList = /*@__PURE__*/ S.Array(TrustStoreSummary);
export interface ListTrustStoresResponse {
  trustStores?: TrustStoreSummary[];
  nextToken?: string;
}
export const ListTrustStoresResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustStores: S.optional(TrustStoreSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTrustStoresResponse",
}) as any as S.Schema<ListTrustStoresResponse>;
export interface ListUserAccessLoggingSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListUserAccessLoggingSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/userAccessLoggingSettings" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListUserAccessLoggingSettingsRequest",
}) as any as S.Schema<ListUserAccessLoggingSettingsRequest>;
export interface UserAccessLoggingSettingsSummary {
  userAccessLoggingSettingsArn: string;
  kinesisStreamArn?: string;
}
export const UserAccessLoggingSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userAccessLoggingSettingsArn: S.String,
    kinesisStreamArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UserAccessLoggingSettingsSummary",
}) as any as S.Schema<UserAccessLoggingSettingsSummary>;
export type UserAccessLoggingSettingsList = UserAccessLoggingSettingsSummary[];
export const UserAccessLoggingSettingsList = /*@__PURE__*/ S.Array(
  UserAccessLoggingSettingsSummary,
);
export interface ListUserAccessLoggingSettingsResponse {
  userAccessLoggingSettings?: UserAccessLoggingSettingsSummary[];
  nextToken?: string;
}
export const ListUserAccessLoggingSettingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      userAccessLoggingSettings: S.optional(UserAccessLoggingSettingsList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListUserAccessLoggingSettingsResponse",
}) as any as S.Schema<ListUserAccessLoggingSettingsResponse>;
export interface ListUserSettingsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/userSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUserSettingsRequest",
}) as any as S.Schema<ListUserSettingsRequest>;
export interface UserSettingsSummary {
  userSettingsArn: string;
  copyAllowed?: string;
  pasteAllowed?: string;
  downloadAllowed?: string;
  uploadAllowed?: string;
  printAllowed?: string;
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfiguration?: BrandingConfiguration;
  webAuthnAllowed?: string;
}
export const UserSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userSettingsArn: S.String,
    copyAllowed: S.optional(S.String),
    pasteAllowed: S.optional(S.String),
    downloadAllowed: S.optional(S.String),
    uploadAllowed: S.optional(S.String),
    printAllowed: S.optional(S.String),
    disconnectTimeoutInMinutes: S.optional(S.Number),
    idleDisconnectTimeoutInMinutes: S.optional(S.Number),
    cookieSynchronizationConfiguration: S.optional(
      CookieSynchronizationConfiguration,
    ),
    deepLinkAllowed: S.optional(S.String),
    toolbarConfiguration: S.optional(ToolbarConfiguration),
    brandingConfiguration: S.optional(BrandingConfiguration),
    webAuthnAllowed: S.optional(S.String),
  }),
).annotate({
  identifier: "UserSettingsSummary",
}) as any as S.Schema<UserSettingsSummary>;
export type UserSettingsList = UserSettingsSummary[];
export const UserSettingsList = /*@__PURE__*/ S.Array(UserSettingsSummary);
export interface ListUserSettingsResponse {
  userSettings?: UserSettingsSummary[];
  nextToken?: string;
}
export const ListUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userSettings: S.optional(UserSettingsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUserSettingsResponse",
}) as any as S.Schema<ListUserSettingsResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
  clientToken?: string;
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn+}" }),
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
export type TagKeyList = (string | redacted.Redacted<string>)[];
export const TagKeyList = /*@__PURE__*/ S.Array(SensitiveString);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: (string | redacted.Redacted<string>)[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn+}" }),
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
export interface UpdateBrowserSettingsRequest {
  browserSettingsArn: string;
  browserPolicy?: string | redacted.Redacted<string>;
  clientToken?: string;
  webContentFilteringPolicy?: WebContentFilteringPolicy;
}
export const UpdateBrowserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    browserSettingsArn: S.String.pipe(T.HttpLabel("browserSettingsArn")),
    browserPolicy: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    webContentFilteringPolicy: S.optional(WebContentFilteringPolicy),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/browserSettings/{browserSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBrowserSettingsRequest",
}) as any as S.Schema<UpdateBrowserSettingsRequest>;
export interface UpdateBrowserSettingsResponse {
  browserSettings: BrowserSettings;
}
export const UpdateBrowserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ browserSettings: BrowserSettings }),
).annotate({
  identifier: "UpdateBrowserSettingsResponse",
}) as any as S.Schema<UpdateBrowserSettingsResponse>;
export interface UpdateDataProtectionSettingsRequest {
  dataProtectionSettingsArn: string;
  inlineRedactionConfiguration?: InlineRedactionConfiguration;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientToken?: string;
}
export const UpdateDataProtectionSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataProtectionSettingsArn: S.String.pipe(
      T.HttpLabel("dataProtectionSettingsArn"),
    ),
    inlineRedactionConfiguration: S.optional(InlineRedactionConfiguration),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/dataProtectionSettings/{dataProtectionSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataProtectionSettingsRequest",
}) as any as S.Schema<UpdateDataProtectionSettingsRequest>;
export interface UpdateDataProtectionSettingsResponse {
  dataProtectionSettings: DataProtectionSettings;
}
export const UpdateDataProtectionSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ dataProtectionSettings: DataProtectionSettings }),
).annotate({
  identifier: "UpdateDataProtectionSettingsResponse",
}) as any as S.Schema<UpdateDataProtectionSettingsResponse>;
export interface UpdateIdentityProviderRequest {
  identityProviderArn: string;
  identityProviderName?: string | redacted.Redacted<string>;
  identityProviderType?: string;
  identityProviderDetails?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const UpdateIdentityProviderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identityProviderArn: S.String.pipe(T.HttpLabel("identityProviderArn")),
    identityProviderName: S.optional(SensitiveString),
    identityProviderType: S.optional(S.String),
    identityProviderDetails: S.optional(IdentityProviderDetails),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/identityProviders/{identityProviderArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIdentityProviderRequest",
}) as any as S.Schema<UpdateIdentityProviderRequest>;
export interface UpdateIdentityProviderResponse {
  identityProvider: IdentityProvider;
}
export const UpdateIdentityProviderResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identityProvider: IdentityProvider }),
).annotate({
  identifier: "UpdateIdentityProviderResponse",
}) as any as S.Schema<UpdateIdentityProviderResponse>;
export interface UpdateIpAccessSettingsRequest {
  ipAccessSettingsArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  ipRules?: IpRule[];
  clientToken?: string;
}
export const UpdateIpAccessSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ipAccessSettingsArn: S.String.pipe(T.HttpLabel("ipAccessSettingsArn")),
    displayName: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    ipRules: S.optional(IpRuleList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/ipAccessSettings/{ipAccessSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIpAccessSettingsRequest",
}) as any as S.Schema<UpdateIpAccessSettingsRequest>;
export interface UpdateIpAccessSettingsResponse {
  ipAccessSettings: IpAccessSettings;
}
export const UpdateIpAccessSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ipAccessSettings: IpAccessSettings }),
).annotate({
  identifier: "UpdateIpAccessSettingsResponse",
}) as any as S.Schema<UpdateIpAccessSettingsResponse>;
export interface UpdateNetworkSettingsRequest {
  networkSettingsArn: string;
  vpcId?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  clientToken?: string;
}
export const UpdateNetworkSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    networkSettingsArn: S.String.pipe(T.HttpLabel("networkSettingsArn")),
    vpcId: S.optional(S.String),
    subnetIds: S.optional(SubnetIdList),
    securityGroupIds: S.optional(SecurityGroupIdList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/networkSettings/{networkSettingsArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateNetworkSettingsRequest",
}) as any as S.Schema<UpdateNetworkSettingsRequest>;
export interface UpdateNetworkSettingsResponse {
  networkSettings: NetworkSettings;
}
export const UpdateNetworkSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ networkSettings: NetworkSettings }),
).annotate({
  identifier: "UpdateNetworkSettingsResponse",
}) as any as S.Schema<UpdateNetworkSettingsResponse>;
export interface UpdatePortalRequest {
  portalArn: string;
  displayName?: string | redacted.Redacted<string>;
  authenticationType?: string;
  instanceType?: string;
  maxConcurrentSessions?: number;
  portalCustomDomain?: string;
}
export const UpdatePortalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    portalArn: S.String.pipe(T.HttpLabel("portalArn")),
    displayName: S.optional(SensitiveString),
    authenticationType: S.optional(S.String),
    instanceType: S.optional(S.String),
    maxConcurrentSessions: S.optional(S.Number),
    portalCustomDomain: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/portals/{portalArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePortalRequest",
}) as any as S.Schema<UpdatePortalRequest>;
export interface UpdatePortalResponse {
  portal?: Portal;
}
export const UpdatePortalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ portal: S.optional(Portal) }),
).annotate({
  identifier: "UpdatePortalResponse",
}) as any as S.Schema<UpdatePortalResponse>;
export interface UpdateSessionLoggerRequest {
  sessionLoggerArn: string;
  eventFilter?: EventFilter;
  logConfiguration?: LogConfiguration;
  displayName?: string | redacted.Redacted<string>;
}
export const UpdateSessionLoggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionLoggerArn: S.String.pipe(T.HttpLabel("sessionLoggerArn")),
    eventFilter: S.optional(EventFilter),
    logConfiguration: S.optional(LogConfiguration),
    displayName: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sessionLoggers/{sessionLoggerArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSessionLoggerRequest",
}) as any as S.Schema<UpdateSessionLoggerRequest>;
export interface UpdateSessionLoggerResponse {
  sessionLogger: SessionLogger;
}
export const UpdateSessionLoggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sessionLogger: SessionLogger }),
).annotate({
  identifier: "UpdateSessionLoggerResponse",
}) as any as S.Schema<UpdateSessionLoggerResponse>;
export type CertificateThumbprintList = string[];
export const CertificateThumbprintList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateTrustStoreRequest {
  trustStoreArn: string;
  certificatesToAdd?: Uint8Array[];
  certificatesToDelete?: string[];
  clientToken?: string;
}
export const UpdateTrustStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustStoreArn: S.String.pipe(T.HttpLabel("trustStoreArn")),
    certificatesToAdd: S.optional(CertificateList),
    certificatesToDelete: S.optional(CertificateThumbprintList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/trustStores/{trustStoreArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTrustStoreRequest",
}) as any as S.Schema<UpdateTrustStoreRequest>;
export interface UpdateTrustStoreResponse {
  trustStoreArn: string;
}
export const UpdateTrustStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustStoreArn: S.String }),
).annotate({
  identifier: "UpdateTrustStoreResponse",
}) as any as S.Schema<UpdateTrustStoreResponse>;
export interface UpdateUserAccessLoggingSettingsRequest {
  userAccessLoggingSettingsArn: string;
  kinesisStreamArn?: string;
  clientToken?: string;
}
export const UpdateUserAccessLoggingSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      userAccessLoggingSettingsArn: S.String.pipe(
        T.HttpLabel("userAccessLoggingSettingsArn"),
      ),
      kinesisStreamArn: S.optional(S.String),
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/userAccessLoggingSettings/{userAccessLoggingSettingsArn+}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateUserAccessLoggingSettingsRequest",
}) as any as S.Schema<UpdateUserAccessLoggingSettingsRequest>;
export interface UpdateUserAccessLoggingSettingsResponse {
  userAccessLoggingSettings: UserAccessLoggingSettings;
}
export const UpdateUserAccessLoggingSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ userAccessLoggingSettings: UserAccessLoggingSettings }),
).annotate({
  identifier: "UpdateUserAccessLoggingSettingsResponse",
}) as any as S.Schema<UpdateUserAccessLoggingSettingsResponse>;
export interface BrandingConfigurationUpdateInput {
  logo?: IconImageInput;
  wallpaper?: WallpaperImageInput;
  favicon?: IconImageInput;
  localizedStrings?: { [key: string]: LocalizedBrandingStrings | undefined };
  colorTheme?: ColorTheme;
  termsOfService?: string | redacted.Redacted<string>;
}
export const BrandingConfigurationUpdateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logo: S.optional(IconImageInput),
    wallpaper: S.optional(WallpaperImageInput),
    favicon: S.optional(IconImageInput),
    localizedStrings: S.optional(LocalizedBrandingStringMap),
    colorTheme: S.optional(ColorTheme),
    termsOfService: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BrandingConfigurationUpdateInput",
}) as any as S.Schema<BrandingConfigurationUpdateInput>;
export interface UpdateUserSettingsRequest {
  userSettingsArn: string;
  copyAllowed?: string;
  pasteAllowed?: string;
  downloadAllowed?: string;
  uploadAllowed?: string;
  printAllowed?: string;
  disconnectTimeoutInMinutes?: number;
  idleDisconnectTimeoutInMinutes?: number;
  clientToken?: string;
  cookieSynchronizationConfiguration?: CookieSynchronizationConfiguration;
  deepLinkAllowed?: string;
  toolbarConfiguration?: ToolbarConfiguration;
  brandingConfigurationInput?: BrandingConfigurationUpdateInput;
  webAuthnAllowed?: string;
}
export const UpdateUserSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userSettingsArn: S.String.pipe(T.HttpLabel("userSettingsArn")),
    copyAllowed: S.optional(S.String),
    pasteAllowed: S.optional(S.String),
    downloadAllowed: S.optional(S.String),
    uploadAllowed: S.optional(S.String),
    printAllowed: S.optional(S.String),
    disconnectTimeoutInMinutes: S.optional(S.Number),
    idleDisconnectTimeoutInMinutes: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    cookieSynchronizationConfiguration: S.optional(
      CookieSynchronizationConfiguration,
    ),
    deepLinkAllowed: S.optional(S.String),
    toolbarConfiguration: S.optional(ToolbarConfiguration),
    brandingConfigurationInput: S.optional(BrandingConfigurationUpdateInput),
    webAuthnAllowed: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/userSettings/{userSettingsArn+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateUserSettingsRequest",
}) as any as S.Schema<UpdateUserSettingsRequest>;
export interface UpdateUserSettingsResponse {
  userSettings: UserSettings;
}
export const UpdateUserSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ userSettings: UserSettings }),
).annotate({
  identifier: "UpdateUserSettingsResponse",
}) as any as S.Schema<UpdateUserSettingsResponse>;
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type RetryAfterSeconds = number;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason = string;
export type FieldName = string;
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
export type TagExceptionMessage = string;
export type AssociateBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a browser settings resource with a web portal.
 */
export const associateBrowserSettings: API.OperationMethod<
  AssociateBrowserSettingsRequest,
  AssociateBrowserSettingsResponse,
  AssociateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateBrowserSettingsRequest,
  output: AssociateBrowserSettingsResponse,
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
  operationName: "AssociateBrowserSettings",
}));

export type AssociateDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a data protection settings resource with a web portal.
 */
export const associateDataProtectionSettings: API.OperationMethod<
  AssociateDataProtectionSettingsRequest,
  AssociateDataProtectionSettingsResponse,
  AssociateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateDataProtectionSettingsRequest,
  output: AssociateDataProtectionSettingsResponse,
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
  operationName: "AssociateDataProtectionSettings",
}));

export type AssociateIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an IP access settings resource with a web portal.
 */
export const associateIpAccessSettings: API.OperationMethod<
  AssociateIpAccessSettingsRequest,
  AssociateIpAccessSettingsResponse,
  AssociateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateIpAccessSettingsRequest,
  output: AssociateIpAccessSettingsResponse,
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
  operationName: "AssociateIpAccessSettings",
}));

export type AssociateNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a network settings resource with a web portal.
 */
export const associateNetworkSettings: API.OperationMethod<
  AssociateNetworkSettingsRequest,
  AssociateNetworkSettingsResponse,
  AssociateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateNetworkSettingsRequest,
  output: AssociateNetworkSettingsResponse,
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
  operationName: "AssociateNetworkSettings",
}));

export type AssociateSessionLoggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a session logger with a portal.
 */
export const associateSessionLogger: API.OperationMethod<
  AssociateSessionLoggerRequest,
  AssociateSessionLoggerResponse,
  AssociateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSessionLoggerRequest,
  output: AssociateSessionLoggerResponse,
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
  operationName: "AssociateSessionLogger",
}));

export type AssociateTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a trust store with a web portal.
 */
export const associateTrustStore: API.OperationMethod<
  AssociateTrustStoreRequest,
  AssociateTrustStoreResponse,
  AssociateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateTrustStoreRequest,
  output: AssociateTrustStoreResponse,
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
  operationName: "AssociateTrustStore",
}));

export type AssociateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a user access logging settings resource with a web portal.
 */
export const associateUserAccessLoggingSettings: API.OperationMethod<
  AssociateUserAccessLoggingSettingsRequest,
  AssociateUserAccessLoggingSettingsResponse,
  AssociateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateUserAccessLoggingSettingsRequest,
  output: AssociateUserAccessLoggingSettingsResponse,
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
  operationName: "AssociateUserAccessLoggingSettings",
}));

export type AssociateUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a user settings resource with a web portal.
 */
export const associateUserSettings: API.OperationMethod<
  AssociateUserSettingsRequest,
  AssociateUserSettingsResponse,
  AssociateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateUserSettingsRequest,
  output: AssociateUserSettingsResponse,
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
  operationName: "AssociateUserSettings",
}));

export type CreateBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a browser settings resource that can be associated with a web portal. Once associated with a web portal, browser settings control how the browser will behave once a user starts a streaming session for the web portal.
 */
export const createBrowserSettings: API.OperationMethod<
  CreateBrowserSettingsRequest,
  CreateBrowserSettingsResponse,
  CreateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBrowserSettingsRequest,
  output: CreateBrowserSettingsResponse,
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
  operationName: "CreateBrowserSettings",
}));

export type CreateDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data protection settings resource that can be associated with a web portal.
 */
export const createDataProtectionSettings: API.OperationMethod<
  CreateDataProtectionSettingsRequest,
  CreateDataProtectionSettingsResponse,
  CreateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataProtectionSettingsRequest,
  output: CreateDataProtectionSettingsResponse,
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
  operationName: "CreateDataProtectionSettings",
}));

export type CreateIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an identity provider resource that is then associated with a web portal.
 */
export const createIdentityProvider: API.OperationMethod<
  CreateIdentityProviderRequest,
  CreateIdentityProviderResponse,
  CreateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdentityProviderRequest,
  output: CreateIdentityProviderResponse,
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
  operationName: "CreateIdentityProvider",
}));

export type CreateIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an IP access settings resource that can be associated with a web portal.
 */
export const createIpAccessSettings: API.OperationMethod<
  CreateIpAccessSettingsRequest,
  CreateIpAccessSettingsResponse,
  CreateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIpAccessSettingsRequest,
  output: CreateIpAccessSettingsResponse,
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
  operationName: "CreateIpAccessSettings",
}));

export type CreateNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network settings resource that can be associated with a web portal. Once associated with a web portal, network settings define how streaming instances will connect with your specified VPC.
 */
export const createNetworkSettings: API.OperationMethod<
  CreateNetworkSettingsRequest,
  CreateNetworkSettingsResponse,
  CreateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkSettingsRequest,
  output: CreateNetworkSettingsResponse,
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
  operationName: "CreateNetworkSettings",
}));

export type CreatePortalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a web portal.
 */
export const createPortal: API.OperationMethod<
  CreatePortalRequest,
  CreatePortalResponse,
  CreatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePortalRequest,
  output: CreatePortalResponse,
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
  operationName: "CreatePortal",
}));

export type CreateSessionLoggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session logger.
 */
export const createSessionLogger: API.OperationMethod<
  CreateSessionLoggerRequest,
  CreateSessionLoggerResponse,
  CreateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSessionLoggerRequest,
  output: CreateSessionLoggerResponse,
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
  operationName: "CreateSessionLogger",
}));

export type CreateTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a trust store that can be associated with a web portal. A trust store contains certificate authority (CA) certificates. Once associated with a web portal, the browser in a streaming session will recognize certificates that have been issued using any of the CAs in the trust store. If your organization has internal websites that use certificates issued by private CAs, you should add the private CA certificate to the trust store.
 */
export const createTrustStore: API.OperationMethod<
  CreateTrustStoreRequest,
  CreateTrustStoreResponse,
  CreateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrustStoreRequest,
  output: CreateTrustStoreResponse,
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
  operationName: "CreateTrustStore",
}));

export type CreateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user access logging settings resource that can be associated with a web portal.
 */
export const createUserAccessLoggingSettings: API.OperationMethod<
  CreateUserAccessLoggingSettingsRequest,
  CreateUserAccessLoggingSettingsResponse,
  CreateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserAccessLoggingSettingsRequest,
  output: CreateUserAccessLoggingSettingsResponse,
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
  operationName: "CreateUserAccessLoggingSettings",
}));

export type CreateUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user settings resource that can be associated with a web portal. Once associated with a web portal, user settings control how users can transfer data between a streaming session and the their local devices.
 */
export const createUserSettings: API.OperationMethod<
  CreateUserSettingsRequest,
  CreateUserSettingsResponse,
  CreateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserSettingsRequest,
  output: CreateUserSettingsResponse,
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
  operationName: "CreateUserSettings",
}));

export type DeleteBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes browser settings.
 */
export const deleteBrowserSettings: API.OperationMethod<
  DeleteBrowserSettingsRequest,
  DeleteBrowserSettingsResponse,
  DeleteBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBrowserSettingsRequest,
  output: DeleteBrowserSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBrowserSettings",
}));

export type DeleteDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes data protection settings.
 */
export const deleteDataProtectionSettings: API.OperationMethod<
  DeleteDataProtectionSettingsRequest,
  DeleteDataProtectionSettingsResponse,
  DeleteDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataProtectionSettingsRequest,
  output: DeleteDataProtectionSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataProtectionSettings",
}));

export type DeleteIdentityProviderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the identity provider.
 */
export const deleteIdentityProvider: API.OperationMethod<
  DeleteIdentityProviderRequest,
  DeleteIdentityProviderResponse,
  DeleteIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentityProviderRequest,
  output: DeleteIdentityProviderResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityProvider",
}));

export type DeleteIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes IP access settings.
 */
export const deleteIpAccessSettings: API.OperationMethod<
  DeleteIpAccessSettingsRequest,
  DeleteIpAccessSettingsResponse,
  DeleteIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIpAccessSettingsRequest,
  output: DeleteIpAccessSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIpAccessSettings",
}));

export type DeleteNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes network settings.
 */
export const deleteNetworkSettings: API.OperationMethod<
  DeleteNetworkSettingsRequest,
  DeleteNetworkSettingsResponse,
  DeleteNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkSettingsRequest,
  output: DeleteNetworkSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkSettings",
}));

export type DeletePortalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a web portal.
 */
export const deletePortal: API.OperationMethod<
  DeletePortalRequest,
  DeletePortalResponse,
  DeletePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePortalRequest,
  output: DeletePortalResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePortal",
}));

export type DeleteSessionLoggerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a session logger resource.
 */
export const deleteSessionLogger: API.OperationMethod<
  DeleteSessionLoggerRequest,
  DeleteSessionLoggerResponse,
  DeleteSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSessionLoggerRequest,
  output: DeleteSessionLoggerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSessionLogger",
}));

export type DeleteTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the trust store.
 */
export const deleteTrustStore: API.OperationMethod<
  DeleteTrustStoreRequest,
  DeleteTrustStoreResponse,
  DeleteTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrustStoreRequest,
  output: DeleteTrustStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustStore",
}));

export type DeleteUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes user access logging settings.
 */
export const deleteUserAccessLoggingSettings: API.OperationMethod<
  DeleteUserAccessLoggingSettingsRequest,
  DeleteUserAccessLoggingSettingsResponse,
  DeleteUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserAccessLoggingSettingsRequest,
  output: DeleteUserAccessLoggingSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserAccessLoggingSettings",
}));

export type DeleteUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes user settings.
 */
export const deleteUserSettings: API.OperationMethod<
  DeleteUserSettingsRequest,
  DeleteUserSettingsResponse,
  DeleteUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserSettingsRequest,
  output: DeleteUserSettingsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserSettings",
}));

export type DisassociateBrowserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates browser settings from a web portal.
 */
export const disassociateBrowserSettings: API.OperationMethod<
  DisassociateBrowserSettingsRequest,
  DisassociateBrowserSettingsResponse,
  DisassociateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateBrowserSettingsRequest,
  output: DisassociateBrowserSettingsResponse,
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
  operationName: "DisassociateBrowserSettings",
}));

export type DisassociateDataProtectionSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates data protection settings from a web portal.
 */
export const disassociateDataProtectionSettings: API.OperationMethod<
  DisassociateDataProtectionSettingsRequest,
  DisassociateDataProtectionSettingsResponse,
  DisassociateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateDataProtectionSettingsRequest,
  output: DisassociateDataProtectionSettingsResponse,
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
  operationName: "DisassociateDataProtectionSettings",
}));

export type DisassociateIpAccessSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates IP access settings from a web portal.
 */
export const disassociateIpAccessSettings: API.OperationMethod<
  DisassociateIpAccessSettingsRequest,
  DisassociateIpAccessSettingsResponse,
  DisassociateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateIpAccessSettingsRequest,
  output: DisassociateIpAccessSettingsResponse,
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
  operationName: "DisassociateIpAccessSettings",
}));

export type DisassociateNetworkSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates network settings from a web portal.
 */
export const disassociateNetworkSettings: API.OperationMethod<
  DisassociateNetworkSettingsRequest,
  DisassociateNetworkSettingsResponse,
  DisassociateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateNetworkSettingsRequest,
  output: DisassociateNetworkSettingsResponse,
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
  operationName: "DisassociateNetworkSettings",
}));

export type DisassociateSessionLoggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a session logger from a portal.
 */
export const disassociateSessionLogger: API.OperationMethod<
  DisassociateSessionLoggerRequest,
  DisassociateSessionLoggerResponse,
  DisassociateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSessionLoggerRequest,
  output: DisassociateSessionLoggerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSessionLogger",
}));

export type DisassociateTrustStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a trust store from a web portal.
 */
export const disassociateTrustStore: API.OperationMethod<
  DisassociateTrustStoreRequest,
  DisassociateTrustStoreResponse,
  DisassociateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateTrustStoreRequest,
  output: DisassociateTrustStoreResponse,
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
  operationName: "DisassociateTrustStore",
}));

export type DisassociateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates user access logging settings from a web portal.
 */
export const disassociateUserAccessLoggingSettings: API.OperationMethod<
  DisassociateUserAccessLoggingSettingsRequest,
  DisassociateUserAccessLoggingSettingsResponse,
  DisassociateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateUserAccessLoggingSettingsRequest,
  output: DisassociateUserAccessLoggingSettingsResponse,
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
  operationName: "DisassociateUserAccessLoggingSettings",
}));

export type DisassociateUserSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates user settings from a web portal.
 */
export const disassociateUserSettings: API.OperationMethod<
  DisassociateUserSettingsRequest,
  DisassociateUserSettingsResponse,
  DisassociateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateUserSettingsRequest,
  output: DisassociateUserSettingsResponse,
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
  operationName: "DisassociateUserSettings",
}));

export type ExpireSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Expires an active secure browser session.
 */
export const expireSession: API.OperationMethod<
  ExpireSessionRequest,
  ExpireSessionResponse,
  ExpireSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExpireSessionRequest,
  output: ExpireSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExpireSession",
}));

export type GetBrowserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets browser settings.
 */
export const getBrowserSettings: API.OperationMethod<
  GetBrowserSettingsRequest,
  GetBrowserSettingsResponse,
  GetBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBrowserSettingsRequest,
  output: GetBrowserSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBrowserSettings",
}));

export type GetDataProtectionSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the data protection settings.
 */
export const getDataProtectionSettings: API.OperationMethod<
  GetDataProtectionSettingsRequest,
  GetDataProtectionSettingsResponse,
  GetDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataProtectionSettingsRequest,
  output: GetDataProtectionSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataProtectionSettings",
}));

export type GetIdentityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the identity provider.
 */
export const getIdentityProvider: API.OperationMethod<
  GetIdentityProviderRequest,
  GetIdentityProviderResponse,
  GetIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityProviderRequest,
  output: GetIdentityProviderResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityProvider",
}));

export type GetIpAccessSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the IP access settings.
 */
export const getIpAccessSettings: API.OperationMethod<
  GetIpAccessSettingsRequest,
  GetIpAccessSettingsResponse,
  GetIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIpAccessSettingsRequest,
  output: GetIpAccessSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIpAccessSettings",
}));

export type GetNetworkSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the network settings.
 */
export const getNetworkSettings: API.OperationMethod<
  GetNetworkSettingsRequest,
  GetNetworkSettingsResponse,
  GetNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNetworkSettingsRequest,
  output: GetNetworkSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNetworkSettings",
}));

export type GetPortalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the web portal.
 */
export const getPortal: API.OperationMethod<
  GetPortalRequest,
  GetPortalResponse,
  GetPortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortalRequest,
  output: GetPortalResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortal",
}));

export type GetPortalServiceProviderMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the service provider metadata.
 */
export const getPortalServiceProviderMetadata: API.OperationMethod<
  GetPortalServiceProviderMetadataRequest,
  GetPortalServiceProviderMetadataResponse,
  GetPortalServiceProviderMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPortalServiceProviderMetadataRequest,
  output: GetPortalServiceProviderMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPortalServiceProviderMetadata",
}));

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information for a secure browser session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type GetSessionLoggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a specific session logger resource.
 */
export const getSessionLogger: API.OperationMethod<
  GetSessionLoggerRequest,
  GetSessionLoggerResponse,
  GetSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionLoggerRequest,
  output: GetSessionLoggerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionLogger",
}));

export type GetTrustStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the trust store.
 */
export const getTrustStore: API.OperationMethod<
  GetTrustStoreRequest,
  GetTrustStoreResponse,
  GetTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrustStoreRequest,
  output: GetTrustStoreResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStore",
}));

export type GetTrustStoreCertificateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the trust store certificate.
 */
export const getTrustStoreCertificate: API.OperationMethod<
  GetTrustStoreCertificateRequest,
  GetTrustStoreCertificateResponse,
  GetTrustStoreCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrustStoreCertificateRequest,
  output: GetTrustStoreCertificateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustStoreCertificate",
}));

export type GetUserAccessLoggingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets user access logging settings.
 */
export const getUserAccessLoggingSettings: API.OperationMethod<
  GetUserAccessLoggingSettingsRequest,
  GetUserAccessLoggingSettingsResponse,
  GetUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserAccessLoggingSettingsRequest,
  output: GetUserAccessLoggingSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserAccessLoggingSettings",
}));

export type GetUserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets user settings.
 */
export const getUserSettings: API.OperationMethod<
  GetUserSettingsRequest,
  GetUserSettingsResponse,
  GetUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserSettingsRequest,
  output: GetUserSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserSettings",
}));

export type ListBrowserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of browser settings.
 */
export const listBrowserSettings: API.PaginatedOperationMethod<
  ListBrowserSettingsRequest,
  ListBrowserSettingsResponse,
  ListBrowserSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBrowserSettingsRequest,
  output: ListBrowserSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBrowserSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataProtectionSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of data protection settings.
 */
export const listDataProtectionSettings: API.PaginatedOperationMethod<
  ListDataProtectionSettingsRequest,
  ListDataProtectionSettingsResponse,
  ListDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient,
  DataProtectionSettingsSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataProtectionSettingsRequest,
  output: ListDataProtectionSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataProtectionSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataProtectionSettings",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdentityProvidersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of identity providers for a specific web portal.
 */
export const listIdentityProviders: API.PaginatedOperationMethod<
  ListIdentityProvidersRequest,
  ListIdentityProvidersResponse,
  ListIdentityProvidersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentityProvidersRequest,
  output: ListIdentityProvidersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityProviders",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIpAccessSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of IP access settings.
 */
export const listIpAccessSettings: API.PaginatedOperationMethod<
  ListIpAccessSettingsRequest,
  ListIpAccessSettingsResponse,
  ListIpAccessSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIpAccessSettingsRequest,
  output: ListIpAccessSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIpAccessSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListNetworkSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of network settings.
 */
export const listNetworkSettings: API.PaginatedOperationMethod<
  ListNetworkSettingsRequest,
  ListNetworkSettingsResponse,
  ListNetworkSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworkSettingsRequest,
  output: ListNetworkSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworkSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPortalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list or web portals.
 */
export const listPortals: API.PaginatedOperationMethod<
  ListPortalsRequest,
  ListPortalsResponse,
  ListPortalsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPortalsRequest,
  output: ListPortalsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPortals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionLoggersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available session logger resources.
 */
export const listSessionLoggers: API.PaginatedOperationMethod<
  ListSessionLoggersRequest,
  ListSessionLoggersResponse,
  ListSessionLoggersError,
  Credentials | HttpClient.HttpClient,
  SessionLoggerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionLoggersRequest,
  output: ListSessionLoggersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionLoggers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionLoggers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information for multiple secure browser sessions from a specific portal.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsRequest,
  output: ListSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
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
 * Retrieves a list of tags for a resource.
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

export type ListTrustStoreCertificatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of trust store certificates.
 */
export const listTrustStoreCertificates: API.PaginatedOperationMethod<
  ListTrustStoreCertificatesRequest,
  ListTrustStoreCertificatesResponse,
  ListTrustStoreCertificatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrustStoreCertificatesRequest,
  output: ListTrustStoreCertificatesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustStoreCertificates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTrustStoresError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of trust stores.
 */
export const listTrustStores: API.PaginatedOperationMethod<
  ListTrustStoresRequest,
  ListTrustStoresResponse,
  ListTrustStoresError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrustStoresRequest,
  output: ListTrustStoresResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustStores",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUserAccessLoggingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of user access logging settings.
 */
export const listUserAccessLoggingSettings: API.PaginatedOperationMethod<
  ListUserAccessLoggingSettingsRequest,
  ListUserAccessLoggingSettingsResponse,
  ListUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUserAccessLoggingSettingsRequest,
  output: ListUserAccessLoggingSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserAccessLoggingSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of user settings.
 */
export const listUserSettings: API.PaginatedOperationMethod<
  ListUserSettingsRequest,
  ListUserSettingsResponse,
  ListUserSettingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUserSettingsRequest,
  output: ListUserSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserSettings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified resource.
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
    TooManyTagsException,
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
 * Removes one or more tags from the specified resource.
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

export type UpdateBrowserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates browser settings.
 */
export const updateBrowserSettings: API.OperationMethod<
  UpdateBrowserSettingsRequest,
  UpdateBrowserSettingsResponse,
  UpdateBrowserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBrowserSettingsRequest,
  output: UpdateBrowserSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBrowserSettings",
}));

export type UpdateDataProtectionSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates data protection settings.
 */
export const updateDataProtectionSettings: API.OperationMethod<
  UpdateDataProtectionSettingsRequest,
  UpdateDataProtectionSettingsResponse,
  UpdateDataProtectionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataProtectionSettingsRequest,
  output: UpdateDataProtectionSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataProtectionSettings",
}));

export type UpdateIdentityProviderError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the identity provider.
 */
export const updateIdentityProvider: API.OperationMethod<
  UpdateIdentityProviderRequest,
  UpdateIdentityProviderResponse,
  UpdateIdentityProviderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdentityProviderRequest,
  output: UpdateIdentityProviderResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentityProvider",
}));

export type UpdateIpAccessSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates IP access settings.
 */
export const updateIpAccessSettings: API.OperationMethod<
  UpdateIpAccessSettingsRequest,
  UpdateIpAccessSettingsResponse,
  UpdateIpAccessSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIpAccessSettingsRequest,
  output: UpdateIpAccessSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIpAccessSettings",
}));

export type UpdateNetworkSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates network settings.
 */
export const updateNetworkSettings: API.OperationMethod<
  UpdateNetworkSettingsRequest,
  UpdateNetworkSettingsResponse,
  UpdateNetworkSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkSettingsRequest,
  output: UpdateNetworkSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetworkSettings",
}));

export type UpdatePortalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a web portal.
 */
export const updatePortal: API.OperationMethod<
  UpdatePortalRequest,
  UpdatePortalResponse,
  UpdatePortalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePortalRequest,
  output: UpdatePortalResponse,
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
  operationName: "UpdatePortal",
}));

export type UpdateSessionLoggerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the details of a session logger.
 */
export const updateSessionLogger: API.OperationMethod<
  UpdateSessionLoggerRequest,
  UpdateSessionLoggerResponse,
  UpdateSessionLoggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSessionLoggerRequest,
  output: UpdateSessionLoggerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSessionLogger",
}));

export type UpdateTrustStoreError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the trust store.
 */
export const updateTrustStore: API.OperationMethod<
  UpdateTrustStoreRequest,
  UpdateTrustStoreResponse,
  UpdateTrustStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTrustStoreRequest,
  output: UpdateTrustStoreResponse,
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
  operationName: "UpdateTrustStore",
}));

export type UpdateUserAccessLoggingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the user access logging settings.
 */
export const updateUserAccessLoggingSettings: API.OperationMethod<
  UpdateUserAccessLoggingSettingsRequest,
  UpdateUserAccessLoggingSettingsResponse,
  UpdateUserAccessLoggingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserAccessLoggingSettingsRequest,
  output: UpdateUserAccessLoggingSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserAccessLoggingSettings",
}));

export type UpdateUserSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the user settings.
 */
export const updateUserSettings: API.OperationMethod<
  UpdateUserSettingsRequest,
  UpdateUserSettingsResponse,
  UpdateUserSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserSettingsRequest,
  output: UpdateUserSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserSettings",
}));
