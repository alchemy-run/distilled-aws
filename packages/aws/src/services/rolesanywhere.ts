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
  sdkId: "RolesAnywhere",
  serviceShapeName: "RolesAnywhere",
});
const auth = T.AwsAuthSigv4({ name: "rolesanywhere" });
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
              `https://rolesanywhere-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://rolesanywhere-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rolesanywhere.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://rolesanywhere.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type RoleArn = string;
export type RoleArnList = string[];
export const RoleArnList = /*@__PURE__*/ S.Array(S.String);
export type ManagedPolicyList = string[];
export const ManagedPolicyList = /*@__PURE__*/ S.Array(S.String);
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  key: string | redacted.Redacted<string>;
  value: string | redacted.Redacted<string>;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: SensitiveString, value: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateProfileRequest {
  name: string;
  requireInstanceProperties?: boolean;
  sessionPolicy?: string;
  roleArns: string[];
  managedPolicyArns?: string[];
  durationSeconds?: number;
  enabled?: boolean;
  tags?: Tag[];
  acceptRoleSessionName?: boolean;
}
export const CreateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    requireInstanceProperties: S.optional(S.Boolean),
    sessionPolicy: S.optional(S.String),
    roleArns: RoleArnList,
    managedPolicyArns: S.optional(ManagedPolicyList),
    durationSeconds: S.optional(S.Number),
    enabled: S.optional(S.Boolean),
    tags: S.optional(TagList),
    acceptRoleSessionName: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProfileRequest",
}) as any as S.Schema<CreateProfileRequest>;
export type Uuid = string;
export type ProfileArn = string;
export type CertificateField = string;
export interface MappingRule {
  specifier: string;
}
export const MappingRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ specifier: S.String }),
).annotate({ identifier: "MappingRule" }) as any as S.Schema<MappingRule>;
export type MappingRules = MappingRule[];
export const MappingRules = /*@__PURE__*/ S.Array(MappingRule);
export interface AttributeMapping {
  certificateField?: string;
  mappingRules?: MappingRule[];
}
export const AttributeMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateField: S.optional(S.String),
    mappingRules: S.optional(MappingRules),
  }),
).annotate({
  identifier: "AttributeMapping",
}) as any as S.Schema<AttributeMapping>;
export type AttributeMappings = AttributeMapping[];
export const AttributeMappings = /*@__PURE__*/ S.Array(AttributeMapping);
export interface ProfileDetail {
  profileId?: string;
  profileArn?: string;
  name?: string;
  requireInstanceProperties?: boolean;
  enabled?: boolean;
  createdBy?: string;
  sessionPolicy?: string;
  roleArns?: string[];
  managedPolicyArns?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  durationSeconds?: number;
  acceptRoleSessionName?: boolean;
  attributeMappings?: AttributeMapping[];
}
export const ProfileDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.optional(S.String),
    profileArn: S.optional(S.String),
    name: S.optional(S.String),
    requireInstanceProperties: S.optional(S.Boolean),
    enabled: S.optional(S.Boolean),
    createdBy: S.optional(S.String),
    sessionPolicy: S.optional(S.String),
    roleArns: S.optional(RoleArnList),
    managedPolicyArns: S.optional(ManagedPolicyList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    durationSeconds: S.optional(S.Number),
    acceptRoleSessionName: S.optional(S.Boolean),
    attributeMappings: S.optional(AttributeMappings),
  }),
).annotate({ identifier: "ProfileDetail" }) as any as S.Schema<ProfileDetail>;
export interface ProfileDetailResponse {
  profile?: ProfileDetail;
}
export const ProfileDetailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profile: S.optional(ProfileDetail) }),
).annotate({
  identifier: "ProfileDetailResponse",
}) as any as S.Schema<ProfileDetailResponse>;
export type TrustAnchorType = string;
export type SourceData =
  | { x509CertificateData: string; acmPcaArn?: never }
  | { x509CertificateData?: never; acmPcaArn: string };
export const SourceData = /*@__PURE__*/ S.Union([
  S.Struct({ x509CertificateData: S.String }),
  S.Struct({ acmPcaArn: S.String }),
]);
export interface Source {
  sourceType?: string;
  sourceData?: SourceData;
}
export const Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceType: S.optional(S.String),
    sourceData: S.optional(SourceData),
  }),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export type NotificationEvent = string;
export type NotificationChannel = string;
export interface NotificationSetting {
  enabled: boolean;
  event: string;
  threshold?: number;
  channel?: string;
}
export const NotificationSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    event: S.String,
    threshold: S.optional(S.Number),
    channel: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationSetting",
}) as any as S.Schema<NotificationSetting>;
export type NotificationSettings = NotificationSetting[];
export const NotificationSettings = /*@__PURE__*/ S.Array(NotificationSetting);
export interface CreateTrustAnchorRequest {
  name: string;
  source: Source;
  enabled?: boolean;
  tags?: Tag[];
  notificationSettings?: NotificationSetting[];
}
export const CreateTrustAnchorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    source: Source,
    enabled: S.optional(S.Boolean),
    tags: S.optional(TagList),
    notificationSettings: S.optional(NotificationSettings),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/trustanchors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTrustAnchorRequest",
}) as any as S.Schema<CreateTrustAnchorRequest>;
export interface NotificationSettingDetail {
  enabled: boolean;
  event: string;
  threshold?: number;
  channel?: string;
  configuredBy?: string;
}
export const NotificationSettingDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    event: S.String,
    threshold: S.optional(S.Number),
    channel: S.optional(S.String),
    configuredBy: S.optional(S.String),
  }),
).annotate({
  identifier: "NotificationSettingDetail",
}) as any as S.Schema<NotificationSettingDetail>;
export type NotificationSettingDetails = NotificationSettingDetail[];
export const NotificationSettingDetails = /*@__PURE__*/ S.Array(
  NotificationSettingDetail,
);
export interface TrustAnchorDetail {
  trustAnchorId?: string;
  trustAnchorArn?: string;
  name?: string;
  source?: Source;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  notificationSettings?: NotificationSettingDetail[];
}
export const TrustAnchorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustAnchorId: S.optional(S.String),
    trustAnchorArn: S.optional(S.String),
    name: S.optional(S.String),
    source: S.optional(Source),
    enabled: S.optional(S.Boolean),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    notificationSettings: S.optional(NotificationSettingDetails),
  }),
).annotate({
  identifier: "TrustAnchorDetail",
}) as any as S.Schema<TrustAnchorDetail>;
export interface TrustAnchorDetailResponse {
  trustAnchor: TrustAnchorDetail;
}
export const TrustAnchorDetailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustAnchor: TrustAnchorDetail }),
).annotate({
  identifier: "TrustAnchorDetailResponse",
}) as any as S.Schema<TrustAnchorDetailResponse>;
export type SpecifierList = string[];
export const SpecifierList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteAttributeMappingRequest {
  profileId: string;
  certificateField: string;
  specifiers?: string[];
}
export const DeleteAttributeMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String.pipe(T.HttpLabel("profileId")),
    certificateField: S.String.pipe(T.HttpQuery("certificateField")),
    specifiers: S.optional(SpecifierList).pipe(T.HttpQuery("specifiers")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/profiles/{profileId}/mappings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttributeMappingRequest",
}) as any as S.Schema<DeleteAttributeMappingRequest>;
export interface DeleteAttributeMappingResponse {
  profile: ProfileDetail;
}
export const DeleteAttributeMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profile: ProfileDetail }),
).annotate({
  identifier: "DeleteAttributeMappingResponse",
}) as any as S.Schema<DeleteAttributeMappingResponse>;
export interface ScalarCrlRequest {
  crlId: string;
}
export const ScalarCrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ crlId: S.String.pipe(T.HttpLabel("crlId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/crl/{crlId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ScalarCrlRequest",
}) as any as S.Schema<ScalarCrlRequest>;
export interface CrlDetail {
  crlId?: string;
  crlArn?: string;
  name?: string;
  enabled?: boolean;
  crlData?: Uint8Array;
  trustAnchorArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CrlDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crlId: S.optional(S.String),
    crlArn: S.optional(S.String),
    name: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    crlData: S.optional(T.Blob),
    trustAnchorArn: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "CrlDetail" }) as any as S.Schema<CrlDetail>;
export interface CrlDetailResponse {
  crl: CrlDetail;
}
export const CrlDetailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ crl: CrlDetail }),
).annotate({
  identifier: "CrlDetailResponse",
}) as any as S.Schema<CrlDetailResponse>;
export interface ScalarProfileRequest {
  profileId: string;
}
export const ScalarProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profileId: S.String.pipe(T.HttpLabel("profileId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/profile/{profileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ScalarProfileRequest",
}) as any as S.Schema<ScalarProfileRequest>;
export interface ScalarTrustAnchorRequest {
  trustAnchorId: string;
}
export const ScalarTrustAnchorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustAnchorId: S.String.pipe(T.HttpLabel("trustAnchorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/trustanchor/{trustAnchorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ScalarTrustAnchorRequest",
}) as any as S.Schema<ScalarTrustAnchorRequest>;
export interface ScalarSubjectRequest {
  subjectId: string;
}
export const ScalarSubjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subjectId: S.String.pipe(T.HttpLabel("subjectId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/subject/{subjectId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ScalarSubjectRequest",
}) as any as S.Schema<ScalarSubjectRequest>;
export interface CredentialSummary {
  seenAt?: Date;
  serialNumber?: string;
  issuer?: string;
  enabled?: boolean;
  x509CertificateData?: string;
  failed?: boolean;
}
export const CredentialSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    seenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    serialNumber: S.optional(S.String),
    issuer: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    x509CertificateData: S.optional(S.String),
    failed: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CredentialSummary",
}) as any as S.Schema<CredentialSummary>;
export type CredentialSummaries = CredentialSummary[];
export const CredentialSummaries = /*@__PURE__*/ S.Array(CredentialSummary);
export type InstancePropertyMap = { [key: string]: string | undefined };
export const InstancePropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface InstanceProperty {
  seenAt?: Date;
  properties?: { [key: string]: string | undefined };
  failed?: boolean;
}
export const InstanceProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    seenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    properties: S.optional(InstancePropertyMap),
    failed: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InstanceProperty",
}) as any as S.Schema<InstanceProperty>;
export type InstanceProperties = InstanceProperty[];
export const InstanceProperties = /*@__PURE__*/ S.Array(InstanceProperty);
export interface SubjectDetail {
  subjectArn?: string;
  subjectId?: string;
  enabled?: boolean;
  x509Subject?: string;
  lastSeenAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  credentials?: CredentialSummary[];
  instanceProperties?: InstanceProperty[];
}
export const SubjectDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subjectArn: S.optional(S.String),
    subjectId: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    x509Subject: S.optional(S.String),
    lastSeenAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    credentials: S.optional(CredentialSummaries),
    instanceProperties: S.optional(InstanceProperties),
  }),
).annotate({ identifier: "SubjectDetail" }) as any as S.Schema<SubjectDetail>;
export interface SubjectDetailResponse {
  subject?: SubjectDetail;
}
export const SubjectDetailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subject: S.optional(SubjectDetail) }),
).annotate({
  identifier: "SubjectDetailResponse",
}) as any as S.Schema<SubjectDetailResponse>;
export type TrustAnchorArn = string;
export interface ImportCrlRequest {
  name: string;
  crlData: Uint8Array;
  enabled?: boolean;
  tags?: Tag[];
  trustAnchorArn: string;
}
export const ImportCrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    crlData: T.Blob,
    enabled: S.optional(S.Boolean),
    tags: S.optional(TagList),
    trustAnchorArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/crls" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportCrlRequest",
}) as any as S.Schema<ImportCrlRequest>;
export interface ListRequest {
  nextToken?: string;
  pageSize?: number;
}
export const ListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    pageSize: S.optional(S.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/crls" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListRequest" }) as any as S.Schema<ListRequest>;
export type CrlDetails = CrlDetail[];
export const CrlDetails = /*@__PURE__*/ S.Array(CrlDetail);
export interface ListCrlsResponse {
  nextToken?: string;
  crls?: CrlDetail[];
}
export const ListCrlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), crls: S.optional(CrlDetails) }),
).annotate({
  identifier: "ListCrlsResponse",
}) as any as S.Schema<ListCrlsResponse>;
export type ProfileDetails = ProfileDetail[];
export const ProfileDetails = /*@__PURE__*/ S.Array(ProfileDetail);
export interface ListProfilesResponse {
  nextToken?: string;
  profiles?: ProfileDetail[];
}
export const ListProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    profiles: S.optional(ProfileDetails),
  }),
).annotate({
  identifier: "ListProfilesResponse",
}) as any as S.Schema<ListProfilesResponse>;
export interface SubjectSummary {
  subjectArn?: string;
  subjectId?: string;
  enabled?: boolean;
  x509Subject?: string;
  lastSeenAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export const SubjectSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subjectArn: S.optional(S.String),
    subjectId: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    x509Subject: S.optional(S.String),
    lastSeenAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "SubjectSummary" }) as any as S.Schema<SubjectSummary>;
export type SubjectSummaries = SubjectSummary[];
export const SubjectSummaries = /*@__PURE__*/ S.Array(SubjectSummary);
export interface ListSubjectsResponse {
  subjects?: SubjectSummary[];
  nextToken?: string;
}
export const ListSubjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subjects: S.optional(SubjectSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubjectsResponse",
}) as any as S.Schema<ListSubjectsResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpQuery("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/ListTagsForResource" }),
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
export type TrustAnchorDetails = TrustAnchorDetail[];
export const TrustAnchorDetails = /*@__PURE__*/ S.Array(TrustAnchorDetail);
export interface ListTrustAnchorsResponse {
  nextToken?: string;
  trustAnchors?: TrustAnchorDetail[];
}
export const ListTrustAnchorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    trustAnchors: S.optional(TrustAnchorDetails),
  }),
).annotate({
  identifier: "ListTrustAnchorsResponse",
}) as any as S.Schema<ListTrustAnchorsResponse>;
export interface PutAttributeMappingRequest {
  profileId: string;
  certificateField: string;
  mappingRules: MappingRule[];
}
export const PutAttributeMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String.pipe(T.HttpLabel("profileId")),
    certificateField: S.String,
    mappingRules: MappingRules,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/profiles/{profileId}/mappings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAttributeMappingRequest",
}) as any as S.Schema<PutAttributeMappingRequest>;
export interface PutAttributeMappingResponse {
  profile: ProfileDetail;
}
export const PutAttributeMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profile: ProfileDetail }),
).annotate({
  identifier: "PutAttributeMappingResponse",
}) as any as S.Schema<PutAttributeMappingResponse>;
export interface PutNotificationSettingsRequest {
  trustAnchorId: string;
  notificationSettings: NotificationSetting[];
}
export const PutNotificationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustAnchorId: S.String,
    notificationSettings: NotificationSettings,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/put-notifications-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutNotificationSettingsRequest",
}) as any as S.Schema<PutNotificationSettingsRequest>;
export interface PutNotificationSettingsResponse {
  trustAnchor: TrustAnchorDetail;
}
export const PutNotificationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustAnchor: TrustAnchorDetail }),
).annotate({
  identifier: "PutNotificationSettingsResponse",
}) as any as S.Schema<PutNotificationSettingsResponse>;
export interface NotificationSettingKey {
  event: string;
  channel?: string;
}
export const NotificationSettingKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ event: S.String, channel: S.optional(S.String) }),
).annotate({
  identifier: "NotificationSettingKey",
}) as any as S.Schema<NotificationSettingKey>;
export type NotificationSettingKeys = NotificationSettingKey[];
export const NotificationSettingKeys = /*@__PURE__*/ S.Array(
  NotificationSettingKey,
);
export interface ResetNotificationSettingsRequest {
  trustAnchorId: string;
  notificationSettingKeys: NotificationSettingKey[];
}
export const ResetNotificationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustAnchorId: S.String,
    notificationSettingKeys: NotificationSettingKeys,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/reset-notifications-settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetNotificationSettingsRequest",
}) as any as S.Schema<ResetNotificationSettingsRequest>;
export interface ResetNotificationSettingsResponse {
  trustAnchor: TrustAnchorDetail;
}
export const ResetNotificationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ trustAnchor: TrustAnchorDetail }),
).annotate({
  identifier: "ResetNotificationSettingsResponse",
}) as any as S.Schema<ResetNotificationSettingsResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TagResource" }),
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
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UntagResource" }),
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
export interface UpdateCrlRequest {
  crlId: string;
  name?: string;
  crlData?: Uint8Array;
}
export const UpdateCrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    crlId: S.String.pipe(T.HttpLabel("crlId")),
    name: S.optional(S.String),
    crlData: S.optional(T.Blob),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/crl/{crlId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCrlRequest",
}) as any as S.Schema<UpdateCrlRequest>;
export interface UpdateProfileRequest {
  profileId: string;
  name?: string;
  sessionPolicy?: string;
  roleArns?: string[];
  managedPolicyArns?: string[];
  durationSeconds?: number;
  acceptRoleSessionName?: boolean;
}
export const UpdateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileId: S.String.pipe(T.HttpLabel("profileId")),
    name: S.optional(S.String),
    sessionPolicy: S.optional(S.String),
    roleArns: S.optional(RoleArnList),
    managedPolicyArns: S.optional(ManagedPolicyList),
    durationSeconds: S.optional(S.Number),
    acceptRoleSessionName: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/profile/{profileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProfileRequest",
}) as any as S.Schema<UpdateProfileRequest>;
export interface UpdateTrustAnchorRequest {
  trustAnchorId: string;
  name?: string;
  source?: Source;
}
export const UpdateTrustAnchorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trustAnchorId: S.String.pipe(T.HttpLabel("trustAnchorId")),
    name: S.optional(S.String),
    source: S.optional(Source),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/trustanchor/{trustAnchorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTrustAnchorRequest",
}) as any as S.Schema<UpdateTrustAnchorRequest>;
export type CreateProfileError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a *profile*, a list of the roles that Roles Anywhere service is trusted to assume. You use profiles to intersect permissions with IAM managed policies.
 *
 * **Required permissions: ** `rolesanywhere:CreateProfile`.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  ProfileDetailResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProfileRequest,
  output: ProfileDetailResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
}));

export type CreateTrustAnchorError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a trust anchor to establish trust between IAM Roles Anywhere and your certificate authority (CA). You can define a trust anchor as a reference to an Private Certificate Authority (Private CA) or by uploading a CA certificate. Your Amazon Web Services workloads can authenticate with the trust anchor using certificates issued by the CA in exchange for temporary Amazon Web Services credentials.
 *
 * **Required permissions: ** `rolesanywhere:CreateTrustAnchor`.
 */
export const createTrustAnchor: API.OperationMethod<
  CreateTrustAnchorRequest,
  TrustAnchorDetailResponse,
  CreateTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrustAnchorRequest,
  output: TrustAnchorDetailResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustAnchor",
}));

export type DeleteAttributeMappingError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete an entry from the attribute mapping rules enforced by a given profile.
 */
export const deleteAttributeMapping: API.OperationMethod<
  DeleteAttributeMappingRequest,
  DeleteAttributeMappingResponse,
  DeleteAttributeMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAttributeMappingRequest,
  output: DeleteAttributeMappingResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributeMapping",
}));

export type DeleteCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a certificate revocation list (CRL).
 *
 * **Required permissions: ** `rolesanywhere:DeleteCrl`.
 */
export const deleteCrl: API.OperationMethod<
  ScalarCrlRequest,
  CrlDetailResponse,
  DeleteCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ScalarCrlRequest,
  output: CrlDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrl",
}));

export type DeleteProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a profile.
 *
 * **Required permissions: ** `rolesanywhere:DeleteProfile`.
 */
export const deleteProfile: API.OperationMethod<
  ScalarProfileRequest,
  ProfileDetailResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ScalarProfileRequest,
  output: ProfileDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
}));

export type DeleteTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a trust anchor.
 *
 * **Required permissions: ** `rolesanywhere:DeleteTrustAnchor`.
 */
export const deleteTrustAnchor: API.OperationMethod<
  ScalarTrustAnchorRequest,
  TrustAnchorDetailResponse,
  DeleteTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ScalarTrustAnchorRequest,
  output: TrustAnchorDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustAnchor",
}));

export interface DisableCrlRequest extends ScalarCrlRequest {}
export const DisableCrlRequest = /*@__PURE__*/ ScalarCrlRequest.pipe(
  T.Http({ method: "POST", uri: "/crl/{crlId}/disable" }),
).annotate({
  identifier: "DisableCrlRequest",
}) as any as S.Schema<DisableCrlRequest>;
export type DisableCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a certificate revocation list (CRL).
 *
 * **Required permissions: ** `rolesanywhere:DisableCrl`.
 */
export const disableCrl: API.OperationMethod<
  DisableCrlRequest,
  CrlDetailResponse,
  DisableCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableCrlRequest,
  output: CrlDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableCrl",
}));

export interface DisableProfileRequest extends ScalarProfileRequest {}
export const DisableProfileRequest = /*@__PURE__*/ ScalarProfileRequest.pipe(
  T.Http({ method: "POST", uri: "/profile/{profileId}/disable" }),
).annotate({
  identifier: "DisableProfileRequest",
}) as any as S.Schema<DisableProfileRequest>;
export type DisableProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a profile. When disabled, temporary credential requests with this profile fail.
 *
 * **Required permissions: ** `rolesanywhere:DisableProfile`.
 */
export const disableProfile: API.OperationMethod<
  DisableProfileRequest,
  ProfileDetailResponse,
  DisableProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableProfileRequest,
  output: ProfileDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableProfile",
}));

export interface DisableTrustAnchorRequest extends ScalarTrustAnchorRequest {}
export const DisableTrustAnchorRequest =
  /*@__PURE__*/ ScalarTrustAnchorRequest.pipe(
    T.Http({ method: "POST", uri: "/trustanchor/{trustAnchorId}/disable" }),
  ).annotate({
    identifier: "DisableTrustAnchorRequest",
  }) as any as S.Schema<DisableTrustAnchorRequest>;
export type DisableTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables a trust anchor. When disabled, temporary credential requests specifying this trust anchor are unauthorized.
 *
 * **Required permissions: ** `rolesanywhere:DisableTrustAnchor`.
 */
export const disableTrustAnchor: API.OperationMethod<
  DisableTrustAnchorRequest,
  TrustAnchorDetailResponse,
  DisableTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableTrustAnchorRequest,
  output: TrustAnchorDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableTrustAnchor",
}));

export interface EnableCrlRequest extends ScalarCrlRequest {}
export const EnableCrlRequest = /*@__PURE__*/ ScalarCrlRequest.pipe(
  T.Http({ method: "POST", uri: "/crl/{crlId}/enable" }),
).annotate({
  identifier: "EnableCrlRequest",
}) as any as S.Schema<EnableCrlRequest>;
export type EnableCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a certificate revocation list (CRL). When enabled, certificates stored in the CRL are unauthorized to receive session credentials.
 *
 * **Required permissions: ** `rolesanywhere:EnableCrl`.
 */
export const enableCrl: API.OperationMethod<
  EnableCrlRequest,
  CrlDetailResponse,
  EnableCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableCrlRequest,
  output: CrlDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableCrl",
}));

export interface EnableProfileRequest extends ScalarProfileRequest {}
export const EnableProfileRequest = /*@__PURE__*/ ScalarProfileRequest.pipe(
  T.Http({ method: "POST", uri: "/profile/{profileId}/enable" }),
).annotate({
  identifier: "EnableProfileRequest",
}) as any as S.Schema<EnableProfileRequest>;
export type EnableProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables temporary credential requests for a profile.
 *
 * **Required permissions: ** `rolesanywhere:EnableProfile`.
 */
export const enableProfile: API.OperationMethod<
  EnableProfileRequest,
  ProfileDetailResponse,
  EnableProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableProfileRequest,
  output: ProfileDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableProfile",
}));

export interface EnableTrustAnchorRequest extends ScalarTrustAnchorRequest {}
export const EnableTrustAnchorRequest =
  /*@__PURE__*/ ScalarTrustAnchorRequest.pipe(
    T.Http({ method: "POST", uri: "/trustanchor/{trustAnchorId}/enable" }),
  ).annotate({
    identifier: "EnableTrustAnchorRequest",
  }) as any as S.Schema<EnableTrustAnchorRequest>;
export type EnableTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a trust anchor. When enabled, certificates in the trust anchor chain are authorized for trust validation.
 *
 * **Required permissions: ** `rolesanywhere:EnableTrustAnchor`.
 */
export const enableTrustAnchor: API.OperationMethod<
  EnableTrustAnchorRequest,
  TrustAnchorDetailResponse,
  EnableTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableTrustAnchorRequest,
  output: TrustAnchorDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableTrustAnchor",
}));

export interface GetCrlRequest extends ScalarCrlRequest {}
export const GetCrlRequest = /*@__PURE__*/ ScalarCrlRequest.pipe(
  T.Http({ method: "GET", uri: "/crl/{crlId}" }),
).annotate({ identifier: "GetCrlRequest" }) as any as S.Schema<GetCrlRequest>;
export type GetCrlError = ResourceNotFoundException | CommonErrors;
/**
 * Gets a certificate revocation list (CRL).
 *
 * **Required permissions: ** `rolesanywhere:GetCrl`.
 */
export const getCrl: API.OperationMethod<
  GetCrlRequest,
  CrlDetailResponse,
  GetCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCrlRequest,
  output: CrlDetailResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrl",
}));

export interface GetProfileRequest extends ScalarProfileRequest {}
export const GetProfileRequest = /*@__PURE__*/ ScalarProfileRequest.pipe(
  T.Http({ method: "GET", uri: "/profile/{profileId}" }),
).annotate({
  identifier: "GetProfileRequest",
}) as any as S.Schema<GetProfileRequest>;
export type GetProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a profile.
 *
 * **Required permissions: ** `rolesanywhere:GetProfile`.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  ProfileDetailResponse,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileRequest,
  output: ProfileDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

export type GetSubjectError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a *subject*, which associates a certificate identity with authentication attempts. The subject stores auditing information such as the status of the last authentication attempt, the certificate data used in the attempt, and the last time the associated identity attempted authentication.
 *
 * **Required permissions: ** `rolesanywhere:GetSubject`.
 */
export const getSubject: API.OperationMethod<
  ScalarSubjectRequest,
  SubjectDetailResponse,
  GetSubjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ScalarSubjectRequest,
  output: SubjectDetailResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubject",
}));

export interface GetTrustAnchorRequest extends ScalarTrustAnchorRequest {}
export const GetTrustAnchorRequest =
  /*@__PURE__*/ ScalarTrustAnchorRequest.pipe(
    T.Http({ method: "GET", uri: "/trustanchor/{trustAnchorId}" }),
  ).annotate({
    identifier: "GetTrustAnchorRequest",
  }) as any as S.Schema<GetTrustAnchorRequest>;
export type GetTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets a trust anchor.
 *
 * **Required permissions: ** `rolesanywhere:GetTrustAnchor`.
 */
export const getTrustAnchor: API.OperationMethod<
  GetTrustAnchorRequest,
  TrustAnchorDetailResponse,
  GetTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrustAnchorRequest,
  output: TrustAnchorDetailResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustAnchor",
}));

export type ImportCrlError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Imports the certificate revocation list (CRL). A CRL is a list of certificates that have been revoked by the issuing certificate Authority (CA).In order to be properly imported, a CRL must be in PEM format. IAM Roles Anywhere validates against the CRL before issuing credentials.
 *
 * **Required permissions: ** `rolesanywhere:ImportCrl`.
 */
export const importCrl: API.OperationMethod<
  ImportCrlRequest,
  CrlDetailResponse,
  ImportCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportCrlRequest,
  output: CrlDetailResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCrl",
}));

export type ListCrlsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all certificate revocation lists (CRL) in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListCrls`.
 */
export const listCrls: API.PaginatedOperationMethod<
  ListRequest,
  ListCrlsResponse,
  ListCrlsError,
  Credentials | HttpClient.HttpClient,
  CrlDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRequest,
  output: ListCrlsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrls",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "crls",
  } as const,
})) as any;

export interface ListProfilesRequest extends ListRequest {}
export const ListProfilesRequest = /*@__PURE__*/ ListRequest.pipe(
  T.Http({ method: "GET", uri: "/profiles" }),
).annotate({
  identifier: "ListProfilesRequest",
}) as any as S.Schema<ListProfilesRequest>;
export type ListProfilesError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all profiles in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListProfiles`.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesRequest,
  ListProfilesResponse,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  ProfileDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfilesRequest,
  output: ListProfilesResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "profiles",
  } as const,
})) as any;

export interface ListSubjectsRequest extends ListRequest {}
export const ListSubjectsRequest = /*@__PURE__*/ ListRequest.pipe(
  T.Http({ method: "GET", uri: "/subjects" }),
).annotate({
  identifier: "ListSubjectsRequest",
}) as any as S.Schema<ListSubjectsRequest>;
export type ListSubjectsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the subjects in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListSubjects`.
 */
export const listSubjects: API.PaginatedOperationMethod<
  ListSubjectsRequest,
  ListSubjectsResponse,
  ListSubjectsError,
  Credentials | HttpClient.HttpClient,
  SubjectSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubjectsRequest,
  output: ListSubjectsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubjects",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "subjects",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags attached to the resource.
 *
 * **Required permissions: ** `rolesanywhere:ListTagsForResource`.
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
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export interface ListTrustAnchorsRequest extends ListRequest {}
export const ListTrustAnchorsRequest = /*@__PURE__*/ ListRequest.pipe(
  T.Http({ method: "GET", uri: "/trustanchors" }),
).annotate({
  identifier: "ListTrustAnchorsRequest",
}) as any as S.Schema<ListTrustAnchorsRequest>;
export type ListTrustAnchorsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the trust anchors in the authenticated account and Amazon Web Services Region.
 *
 * **Required permissions: ** `rolesanywhere:ListTrustAnchors`.
 */
export const listTrustAnchors: API.PaginatedOperationMethod<
  ListTrustAnchorsRequest,
  ListTrustAnchorsResponse,
  ListTrustAnchorsError,
  Credentials | HttpClient.HttpClient,
  TrustAnchorDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrustAnchorsRequest,
  output: ListTrustAnchorsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustAnchors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "trustAnchors",
  } as const,
})) as any;

export type PutAttributeMappingError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Put an entry in the attribute mapping rules that will be enforced by a given profile. A mapping specifies a certificate field and one or more specifiers that have contextual meanings.
 */
export const putAttributeMapping: API.OperationMethod<
  PutAttributeMappingRequest,
  PutAttributeMappingResponse,
  PutAttributeMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAttributeMappingRequest,
  output: PutAttributeMappingResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributeMapping",
}));

export type PutNotificationSettingsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a list of *notification settings* to a trust anchor.
 *
 * A notification setting includes information such as event name, threshold, status of the notification setting, and the channel to notify.
 *
 * **Required permissions: ** `rolesanywhere:PutNotificationSettings`.
 */
export const putNotificationSettings: API.OperationMethod<
  PutNotificationSettingsRequest,
  PutNotificationSettingsResponse,
  PutNotificationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutNotificationSettingsRequest,
  output: PutNotificationSettingsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationSettings",
}));

export type ResetNotificationSettingsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Resets the *custom notification setting* to IAM Roles Anywhere default setting.
 *
 * **Required permissions: ** `rolesanywhere:ResetNotificationSettings`.
 */
export const resetNotificationSettings: API.OperationMethod<
  ResetNotificationSettingsRequest,
  ResetNotificationSettingsResponse,
  ResetNotificationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetNotificationSettingsRequest,
  output: ResetNotificationSettingsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetNotificationSettings",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Attaches tags to a resource.
 *
 * **Required permissions: ** `rolesanywhere:TagResource`.
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
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the resource.
 *
 * **Required permissions: ** `rolesanywhere:UntagResource`.
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
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCrlError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the certificate revocation list (CRL). A CRL is a list of certificates that have been revoked by the issuing certificate authority (CA). IAM Roles Anywhere validates against the CRL before issuing credentials.
 *
 * **Required permissions: ** `rolesanywhere:UpdateCrl`.
 */
export const updateCrl: API.OperationMethod<
  UpdateCrlRequest,
  CrlDetailResponse,
  UpdateCrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCrlRequest,
  output: CrlDetailResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrl",
}));

export type UpdateProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a *profile*, a list of the roles that IAM Roles Anywhere service is trusted to assume. You use profiles to intersect permissions with IAM managed policies.
 *
 * **Required permissions: ** `rolesanywhere:UpdateProfile`.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileRequest,
  ProfileDetailResponse,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProfileRequest,
  output: ProfileDetailResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfile",
}));

export type UpdateTrustAnchorError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a trust anchor. You establish trust between IAM Roles Anywhere and your certificate authority (CA) by configuring a trust anchor. You can define a trust anchor as a reference to an Private Certificate Authority (Private CA) or by uploading a CA certificate. Your Amazon Web Services workloads can authenticate with the trust anchor using certificates issued by the CA in exchange for temporary Amazon Web Services credentials.
 *
 * **Required permissions: ** `rolesanywhere:UpdateTrustAnchor`.
 */
export const updateTrustAnchor: API.OperationMethod<
  UpdateTrustAnchorRequest,
  TrustAnchorDetailResponse,
  UpdateTrustAnchorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTrustAnchorRequest,
  output: TrustAnchorDetailResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustAnchor",
}));
