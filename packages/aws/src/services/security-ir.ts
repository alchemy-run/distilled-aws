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
  sdkId: "Security IR",
  serviceShapeName: "SecurityIncidentResponse",
});
const auth = T.AwsAuthSigv4({ name: "security-ir" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
        if (UseFIPS === true) {
          return e(
            `https://security-ir-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://security-ir.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
export type MembershipId = string;
export type AWSAccountId = string;
export type AWSAccountIds = string[];
export const AWSAccountIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetMemberAccountDetailsRequest {
  membershipId: string;
  accountIds: string[];
}
export const BatchGetMemberAccountDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipId: S.String.pipe(T.HttpLabel("membershipId")),
    accountIds: AWSAccountIds,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/membership/{membershipId}/batch-member-details",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetMemberAccountDetailsRequest",
}) as any as S.Schema<BatchGetMemberAccountDetailsRequest>;
export type MembershipAccountRelationshipStatus =
  | "Associated"
  | "Disassociated"
  | "Unassociated"
  | (string & {});
export const MembershipAccountRelationshipStatus = /*@__PURE__*/ S.String;

export type MembershipAccountRelationshipType =
  | "Organization"
  | "Unrelated"
  | (string & {});
export const MembershipAccountRelationshipType = /*@__PURE__*/ S.String;

export interface GetMembershipAccountDetailItem {
  accountId?: string;
  relationshipStatus?: MembershipAccountRelationshipStatus;
  relationshipType?: MembershipAccountRelationshipType;
}
export const GetMembershipAccountDetailItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    relationshipStatus: S.optional(MembershipAccountRelationshipStatus),
    relationshipType: S.optional(MembershipAccountRelationshipType),
  }),
).annotate({
  identifier: "GetMembershipAccountDetailItem",
}) as any as S.Schema<GetMembershipAccountDetailItem>;
export type GetMembershipAccountDetailItems = GetMembershipAccountDetailItem[];
export const GetMembershipAccountDetailItems = /*@__PURE__*/ S.Array(
  GetMembershipAccountDetailItem,
);
export interface GetMembershipAccountDetailError {
  accountId: string;
  error: string;
  message: string;
}
export const GetMembershipAccountDetailError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String, error: S.String, message: S.String }),
).annotate({
  identifier: "GetMembershipAccountDetailError",
}) as any as S.Schema<GetMembershipAccountDetailError>;
export type GetMembershipAccountDetailErrors =
  GetMembershipAccountDetailError[];
export const GetMembershipAccountDetailErrors = /*@__PURE__*/ S.Array(
  GetMembershipAccountDetailError,
);
export interface BatchGetMemberAccountDetailsResponse {
  items?: GetMembershipAccountDetailItem[];
  errors?: GetMembershipAccountDetailError[];
}
export const BatchGetMemberAccountDetailsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      items: S.optional(GetMembershipAccountDetailItems),
      errors: S.optional(GetMembershipAccountDetailErrors),
    }),
).annotate({
  identifier: "BatchGetMemberAccountDetailsResponse",
}) as any as S.Schema<BatchGetMemberAccountDetailsResponse>;
export interface CancelMembershipRequest {
  membershipId: string;
}
export const CancelMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membershipId: S.String.pipe(T.HttpLabel("membershipId")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/membership/{membershipId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMembershipRequest",
}) as any as S.Schema<CancelMembershipRequest>;
export interface CancelMembershipResponse {
  membershipId: string;
}
export const CancelMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membershipId: S.String }),
).annotate({
  identifier: "CancelMembershipResponse",
}) as any as S.Schema<CancelMembershipResponse>;
export type CaseId = string;
export interface CloseCaseRequest {
  caseId: string;
}
export const CloseCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseId: S.String.pipe(T.HttpLabel("caseId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/close-case" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CloseCaseRequest",
}) as any as S.Schema<CloseCaseRequest>;
export type CaseStatus =
  | "Submitted"
  | "Acknowledged"
  | "Detection and Analysis"
  | "Containment, Eradication and Recovery"
  | "Post-incident Activities"
  | "Ready to Close"
  | "Closed"
  | (string & {});
export const CaseStatus = /*@__PURE__*/ S.String;

export interface CloseCaseResponse {
  caseStatus?: CaseStatus;
  closedDate?: Date;
}
export const CloseCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseStatus: S.optional(CaseStatus),
    closedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CloseCaseResponse",
}) as any as S.Schema<CloseCaseResponse>;
export type ResolverType = "AWS" | "Self" | (string & {});
export const ResolverType = /*@__PURE__*/ S.String;

export type CaseTitle = string | redacted.Redacted<string>;
export type CaseDescription = string | redacted.Redacted<string>;
export type EngagementType =
  | "Security Incident"
  | "Investigation"
  | (string & {});
export const EngagementType = /*@__PURE__*/ S.String;

export type ImpactedAccounts = string[];
export const ImpactedAccounts = /*@__PURE__*/ S.Array(S.String);
export type EmailAddress = string | redacted.Redacted<string>;
export type PersonName = string | redacted.Redacted<string>;
export type JobTitle = string | redacted.Redacted<string>;
export interface Watcher {
  email: string | redacted.Redacted<string>;
  name?: string | redacted.Redacted<string>;
  jobTitle?: string | redacted.Redacted<string>;
}
export const Watcher = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    email: SensitiveString,
    name: S.optional(SensitiveString),
    jobTitle: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Watcher" }) as any as S.Schema<Watcher>;
export type Watchers = Watcher[];
export const Watchers = /*@__PURE__*/ S.Array(Watcher);
export type IPAddress = string | redacted.Redacted<string>;
export type UserAgent = string;
export interface ThreatActorIp {
  ipAddress: string | redacted.Redacted<string>;
  userAgent?: string;
}
export const ThreatActorIp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ipAddress: SensitiveString, userAgent: S.optional(S.String) }),
).annotate({ identifier: "ThreatActorIp" }) as any as S.Schema<ThreatActorIp>;
export type ThreatActorIpList = ThreatActorIp[];
export const ThreatActorIpList = /*@__PURE__*/ S.Array(ThreatActorIp);
export type AwsService = string;
export type ImpactedServicesList = string[];
export const ImpactedServicesList = /*@__PURE__*/ S.Array(S.String);
export type AwsRegion =
  | "af-south-1"
  | "ap-east-1"
  | "ap-east-2"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-4"
  | "ap-southeast-5"
  | "ap-southeast-6"
  | "ap-southeast-7"
  | "ca-central-1"
  | "ca-west-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "eu-central-1"
  | "eu-central-2"
  | "eu-north-1"
  | "eu-south-1"
  | "eu-south-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "il-central-1"
  | "me-central-1"
  | "me-south-1"
  | "mx-central-1"
  | "sa-east-1"
  | "us-east-1"
  | "us-east-2"
  | "us-west-1"
  | "us-west-2"
  | (string & {});
export const AwsRegion = /*@__PURE__*/ S.String;

export interface ImpactedAwsRegion {
  region: AwsRegion;
}
export const ImpactedAwsRegion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ region: AwsRegion }),
).annotate({
  identifier: "ImpactedAwsRegion",
}) as any as S.Schema<ImpactedAwsRegion>;
export type ImpactedAwsRegionList = ImpactedAwsRegion[];
export const ImpactedAwsRegionList = /*@__PURE__*/ S.Array(ImpactedAwsRegion);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateCaseRequest {
  clientToken?: string;
  resolverType: ResolverType;
  title: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  engagementType: EngagementType;
  reportedIncidentStartDate: Date;
  impactedAccounts: string[];
  watchers: Watcher[];
  threatActorIpAddresses?: ThreatActorIp[];
  impactedServices?: string[];
  impactedAwsRegions?: ImpactedAwsRegion[];
  tags?: { [key: string]: string | undefined };
}
export const CreateCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    resolverType: ResolverType,
    title: SensitiveString,
    description: SensitiveString,
    engagementType: EngagementType,
    reportedIncidentStartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    impactedAccounts: ImpactedAccounts,
    watchers: Watchers,
    threatActorIpAddresses: S.optional(ThreatActorIpList),
    impactedServices: S.optional(ImpactedServicesList),
    impactedAwsRegions: S.optional(ImpactedAwsRegionList),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/create-case" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCaseRequest",
}) as any as S.Schema<CreateCaseRequest>;
export interface CreateCaseResponse {
  caseId: string;
}
export const CreateCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseId: S.String }),
).annotate({
  identifier: "CreateCaseResponse",
}) as any as S.Schema<CreateCaseResponse>;
export type CommentBody = string | redacted.Redacted<string>;
export interface CreateCaseCommentRequest {
  caseId: string;
  clientToken?: string;
  body: string | redacted.Redacted<string>;
}
export const CreateCaseCommentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    body: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/create-comment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCaseCommentRequest",
}) as any as S.Schema<CreateCaseCommentRequest>;
export type CommentId = string;
export interface CreateCaseCommentResponse {
  commentId: string;
}
export const CreateCaseCommentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commentId: S.String }),
).annotate({
  identifier: "CreateCaseCommentResponse",
}) as any as S.Schema<CreateCaseCommentResponse>;
export type MembershipName = string | redacted.Redacted<string>;
export type IncidentResponderName = string | redacted.Redacted<string>;
export type CommunicationType =
  | "Case Created"
  | "Case Updated"
  | "Case Acknowledged"
  | "Case Closed"
  | "Case Updated To Service Managed"
  | "Case Status Updated"
  | "Case Pending Customer Action Reminder"
  | "Case Attachment Url Uploaded"
  | "Case Comment Added"
  | "Case Comment Updated"
  | "Membership Created"
  | "Membership Updated"
  | "Membership Cancelled"
  | "Register Delegated Administrator"
  | "Deregister Delegated Administrator"
  | "Disable AWS Service Access"
  | (string & {});
export const CommunicationType = /*@__PURE__*/ S.String;

export type CommunicationPreferences = CommunicationType[];
export const CommunicationPreferences =
  /*@__PURE__*/ S.Array(CommunicationType);
export interface IncidentResponder {
  name: string | redacted.Redacted<string>;
  jobTitle: string | redacted.Redacted<string>;
  email: string | redacted.Redacted<string>;
  communicationPreferences?: CommunicationType[];
}
export const IncidentResponder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    jobTitle: SensitiveString,
    email: SensitiveString,
    communicationPreferences: S.optional(CommunicationPreferences),
  }),
).annotate({
  identifier: "IncidentResponder",
}) as any as S.Schema<IncidentResponder>;
export type IncidentResponseTeam = IncidentResponder[];
export const IncidentResponseTeam = /*@__PURE__*/ S.Array(IncidentResponder);
export type OptInFeatureName = "Triage" | (string & {});
export const OptInFeatureName = /*@__PURE__*/ S.String;

export interface OptInFeature {
  featureName: OptInFeatureName;
  isEnabled: boolean;
}
export const OptInFeature = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ featureName: OptInFeatureName, isEnabled: S.Boolean }),
).annotate({ identifier: "OptInFeature" }) as any as S.Schema<OptInFeature>;
export type OptInFeatures = OptInFeature[];
export const OptInFeatures = /*@__PURE__*/ S.Array(OptInFeature);
export interface CreateMembershipRequest {
  clientToken?: string;
  membershipName: string | redacted.Redacted<string>;
  incidentResponseTeam: IncidentResponder[];
  optInFeatures?: OptInFeature[];
  tags?: { [key: string]: string | undefined };
  coverEntireOrganization?: boolean;
}
export const CreateMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    membershipName: SensitiveString,
    incidentResponseTeam: IncidentResponseTeam,
    optInFeatures: S.optional(OptInFeatures),
    tags: S.optional(TagMap),
    coverEntireOrganization: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/membership" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMembershipRequest",
}) as any as S.Schema<CreateMembershipRequest>;
export interface CreateMembershipResponse {
  membershipId: string;
}
export const CreateMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membershipId: S.String }),
).annotate({
  identifier: "CreateMembershipResponse",
}) as any as S.Schema<CreateMembershipResponse>;
export interface GetCaseRequest {
  caseId: string;
}
export const GetCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseId: S.String.pipe(T.HttpLabel("caseId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/cases/{caseId}/get-case" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetCaseRequest" }) as any as S.Schema<GetCaseRequest>;
export type CaseArn = string;
export type PendingAction = "Customer" | "None" | (string & {});
export const PendingAction = /*@__PURE__*/ S.String;

export type ClosureCode =
  | "Investigation Completed"
  | "Not Resolved"
  | "False Positive"
  | "Duplicate"
  | (string & {});
export const ClosureCode = /*@__PURE__*/ S.String;

export type AttachmentId = string;
export type FileName = string | redacted.Redacted<string>;
export type CaseAttachmentStatus =
  | "Verified"
  | "Failed"
  | "Pending"
  | (string & {});
export const CaseAttachmentStatus = /*@__PURE__*/ S.String;

export type PrincipalId = string;
export interface CaseAttachmentAttributes {
  attachmentId: string;
  fileName: string | redacted.Redacted<string>;
  attachmentStatus: CaseAttachmentStatus;
  creator: string;
  createdDate: Date;
}
export const CaseAttachmentAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attachmentId: S.String,
    fileName: SensitiveString,
    attachmentStatus: CaseAttachmentStatus,
    creator: S.String,
    createdDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CaseAttachmentAttributes",
}) as any as S.Schema<CaseAttachmentAttributes>;
export type CaseAttachmentsList = CaseAttachmentAttributes[];
export const CaseAttachmentsList = /*@__PURE__*/ S.Array(
  CaseAttachmentAttributes,
);
export interface CaseMetadataEntry {
  key: string;
  value: string;
}
export const CaseMetadataEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "CaseMetadataEntry",
}) as any as S.Schema<CaseMetadataEntry>;
export type CaseMetadata = CaseMetadataEntry[];
export const CaseMetadata = /*@__PURE__*/ S.Array(CaseMetadataEntry);
export interface GetCaseResponse {
  title?: string | redacted.Redacted<string>;
  caseArn?: string;
  description?: string | redacted.Redacted<string>;
  caseStatus?: CaseStatus;
  engagementType?: EngagementType;
  reportedIncidentStartDate?: Date;
  actualIncidentStartDate?: Date;
  impactedAwsRegions?: ImpactedAwsRegion[];
  threatActorIpAddresses?: ThreatActorIp[];
  pendingAction?: PendingAction;
  impactedAccounts?: string[];
  watchers?: Watcher[];
  createdDate?: Date;
  lastUpdatedDate?: Date;
  closureCode?: ClosureCode;
  resolverType?: ResolverType;
  impactedServices?: string[];
  caseAttachments?: CaseAttachmentAttributes[];
  closedDate?: Date;
  caseMetadata?: CaseMetadataEntry[];
}
export const GetCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(SensitiveString),
    caseArn: S.optional(S.String),
    description: S.optional(SensitiveString),
    caseStatus: S.optional(CaseStatus),
    engagementType: S.optional(EngagementType),
    reportedIncidentStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    actualIncidentStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    impactedAwsRegions: S.optional(ImpactedAwsRegionList),
    threatActorIpAddresses: S.optional(ThreatActorIpList),
    pendingAction: S.optional(PendingAction),
    impactedAccounts: S.optional(ImpactedAccounts),
    watchers: S.optional(Watchers),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    closureCode: S.optional(ClosureCode),
    resolverType: S.optional(ResolverType),
    impactedServices: S.optional(ImpactedServicesList),
    caseAttachments: S.optional(CaseAttachmentsList),
    closedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    caseMetadata: S.optional(CaseMetadata),
  }),
).annotate({
  identifier: "GetCaseResponse",
}) as any as S.Schema<GetCaseResponse>;
export interface GetCaseAttachmentDownloadUrlRequest {
  caseId: string;
  attachmentId: string;
}
export const GetCaseAttachmentDownloadUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    attachmentId: S.String.pipe(T.HttpLabel("attachmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/cases/{caseId}/get-presigned-url/{attachmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCaseAttachmentDownloadUrlRequest",
}) as any as S.Schema<GetCaseAttachmentDownloadUrlRequest>;
export type Url = string | redacted.Redacted<string>;
export interface GetCaseAttachmentDownloadUrlResponse {
  attachmentPresignedUrl: string | redacted.Redacted<string>;
}
export const GetCaseAttachmentDownloadUrlResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ attachmentPresignedUrl: SensitiveString }),
).annotate({
  identifier: "GetCaseAttachmentDownloadUrlResponse",
}) as any as S.Schema<GetCaseAttachmentDownloadUrlResponse>;
export type ContentLength = number;
export interface GetCaseAttachmentUploadUrlRequest {
  caseId: string;
  fileName: string | redacted.Redacted<string>;
  contentLength: number;
  clientToken?: string;
}
export const GetCaseAttachmentUploadUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    fileName: SensitiveString,
    contentLength: S.Number,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/get-presigned-url" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCaseAttachmentUploadUrlRequest",
}) as any as S.Schema<GetCaseAttachmentUploadUrlRequest>;
export interface GetCaseAttachmentUploadUrlResponse {
  attachmentPresignedUrl: string | redacted.Redacted<string>;
}
export const GetCaseAttachmentUploadUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attachmentPresignedUrl: SensitiveString }),
).annotate({
  identifier: "GetCaseAttachmentUploadUrlResponse",
}) as any as S.Schema<GetCaseAttachmentUploadUrlResponse>;
export interface GetMembershipRequest {
  membershipId: string;
}
export const GetMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ membershipId: S.String.pipe(T.HttpLabel("membershipId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/membership/{membershipId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMembershipRequest",
}) as any as S.Schema<GetMembershipRequest>;
export type MembershipArn = string;
export type MembershipStatus =
  | "Active"
  | "Cancelled"
  | "Terminated"
  | (string & {});
export const MembershipStatus = /*@__PURE__*/ S.String;

export type CustomerType = "Standalone" | "Organization" | (string & {});
export const CustomerType = /*@__PURE__*/ S.String;

export type OrganizationalUnitId = string;
export type OrganizationalUnits = string[];
export const OrganizationalUnits = /*@__PURE__*/ S.Array(S.String);
export interface MembershipAccountsConfigurations {
  coverEntireOrganization?: boolean;
  organizationalUnits?: string[];
}
export const MembershipAccountsConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    coverEntireOrganization: S.optional(S.Boolean),
    organizationalUnits: S.optional(OrganizationalUnits),
  }),
).annotate({
  identifier: "MembershipAccountsConfigurations",
}) as any as S.Schema<MembershipAccountsConfigurations>;
export interface GetMembershipResponse {
  membershipId: string;
  accountId?: string;
  region?: AwsRegion;
  membershipName?: string | redacted.Redacted<string>;
  membershipArn?: string;
  membershipStatus?: MembershipStatus;
  membershipActivationTimestamp?: Date;
  membershipDeactivationTimestamp?: Date;
  customerType?: CustomerType;
  numberOfAccountsCovered?: number;
  incidentResponseTeam?: IncidentResponder[];
  optInFeatures?: OptInFeature[];
  membershipAccountsConfigurations?: MembershipAccountsConfigurations;
}
export const GetMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipId: S.String,
    accountId: S.optional(S.String),
    region: S.optional(AwsRegion),
    membershipName: S.optional(SensitiveString),
    membershipArn: S.optional(S.String),
    membershipStatus: S.optional(MembershipStatus),
    membershipActivationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    membershipDeactivationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    customerType: S.optional(CustomerType),
    numberOfAccountsCovered: S.optional(S.Number),
    incidentResponseTeam: S.optional(IncidentResponseTeam),
    optInFeatures: S.optional(OptInFeatures),
    membershipAccountsConfigurations: S.optional(
      MembershipAccountsConfigurations,
    ),
  }),
).annotate({
  identifier: "GetMembershipResponse",
}) as any as S.Schema<GetMembershipResponse>;
export interface ListCaseEditsRequest {
  nextToken?: string;
  maxResults?: number;
  caseId: string;
}
export const ListCaseEditsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    caseId: S.String.pipe(T.HttpLabel("caseId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/list-case-edits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCaseEditsRequest",
}) as any as S.Schema<ListCaseEditsRequest>;
export type CaseEditAction = string;
export type CaseEditMessage = string;
export interface CaseEditItem {
  eventTimestamp?: Date;
  principal?: string;
  action?: string;
  message?: string;
}
export const CaseEditItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    principal: S.optional(S.String),
    action: S.optional(S.String),
    message: S.optional(S.String),
  }),
).annotate({ identifier: "CaseEditItem" }) as any as S.Schema<CaseEditItem>;
export type CaseEditItems = CaseEditItem[];
export const CaseEditItems = /*@__PURE__*/ S.Array(CaseEditItem);
export interface ListCaseEditsResponse {
  nextToken?: string;
  items?: CaseEditItem[];
  total?: number;
}
export const ListCaseEditsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(CaseEditItems),
    total: S.optional(S.Number),
  }),
).annotate({
  identifier: "ListCaseEditsResponse",
}) as any as S.Schema<ListCaseEditsResponse>;
export interface ListCasesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListCasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/list-cases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCasesRequest",
}) as any as S.Schema<ListCasesRequest>;
export interface ListCasesItem {
  caseId: string;
  lastUpdatedDate?: Date;
  title?: string | redacted.Redacted<string>;
  caseArn?: string;
  engagementType?: EngagementType;
  caseStatus?: CaseStatus;
  createdDate?: Date;
  closedDate?: Date;
  resolverType?: ResolverType;
  pendingAction?: PendingAction;
}
export const ListCasesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String,
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    title: S.optional(SensitiveString),
    caseArn: S.optional(S.String),
    engagementType: S.optional(EngagementType),
    caseStatus: S.optional(CaseStatus),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    closedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    resolverType: S.optional(ResolverType),
    pendingAction: S.optional(PendingAction),
  }),
).annotate({ identifier: "ListCasesItem" }) as any as S.Schema<ListCasesItem>;
export type ListCasesItems = ListCasesItem[];
export const ListCasesItems = /*@__PURE__*/ S.Array(ListCasesItem);
export interface ListCasesResponse {
  nextToken?: string;
  items?: ListCasesItem[];
  total?: number;
}
export const ListCasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(ListCasesItems),
    total: S.optional(S.Number),
  }),
).annotate({
  identifier: "ListCasesResponse",
}) as any as S.Schema<ListCasesResponse>;
export interface ListCommentsRequest {
  nextToken?: string;
  maxResults?: number;
  caseId: string;
}
export const ListCommentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    caseId: S.String.pipe(T.HttpLabel("caseId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/list-comments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCommentsRequest",
}) as any as S.Schema<ListCommentsRequest>;
export interface ListCommentsItem {
  commentId: string;
  createdDate?: Date;
  lastUpdatedDate?: Date;
  creator?: string;
  lastUpdatedBy?: string;
  body?: string | redacted.Redacted<string>;
}
export const ListCommentsItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commentId: S.String,
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creator: S.optional(S.String),
    lastUpdatedBy: S.optional(S.String),
    body: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ListCommentsItem",
}) as any as S.Schema<ListCommentsItem>;
export type ListCommentsItems = ListCommentsItem[];
export const ListCommentsItems = /*@__PURE__*/ S.Array(ListCommentsItem);
export interface ListCommentsResponse {
  nextToken?: string;
  items?: ListCommentsItem[];
  total?: number;
}
export const ListCommentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(ListCommentsItems),
    total: S.optional(S.Number),
  }),
).annotate({
  identifier: "ListCommentsResponse",
}) as any as S.Schema<ListCommentsResponse>;
export interface ListInvestigationsRequest {
  nextToken?: string;
  maxResults?: number;
  caseId: string;
}
export const ListInvestigationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    caseId: S.String.pipe(T.HttpLabel("caseId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/cases/{caseId}/list-investigations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvestigationsRequest",
}) as any as S.Schema<ListInvestigationsRequest>;
export type InvestigationId = string;
export type ActionType =
  | "Evidence"
  | "Investigation"
  | "Summarization"
  | (string & {});
export const ActionType = /*@__PURE__*/ S.String;

export type InvestigationTitle = string;
export type InvestigationContent = string;
export type ExecutionStatus =
  | "Pending"
  | "InProgress"
  | "Waiting"
  | "Completed"
  | "Failed"
  | "Cancelled"
  | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export type UsefulnessRating = "USEFUL" | "NOT_USEFUL" | (string & {});
export const UsefulnessRating = /*@__PURE__*/ S.String;

export type FeedbackComment = string;
export interface InvestigationFeedback {
  usefulness?: UsefulnessRating;
  comment?: string;
  submittedAt?: Date;
}
export const InvestigationFeedback = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usefulness: S.optional(UsefulnessRating),
    comment: S.optional(S.String),
    submittedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InvestigationFeedback",
}) as any as S.Schema<InvestigationFeedback>;
export interface InvestigationAction {
  investigationId: string;
  actionType: ActionType;
  title: string;
  content: string;
  status: ExecutionStatus;
  lastUpdated: Date;
  feedback?: InvestigationFeedback;
}
export const InvestigationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    investigationId: S.String,
    actionType: ActionType,
    title: S.String,
    content: S.String,
    status: ExecutionStatus,
    lastUpdated: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    feedback: S.optional(InvestigationFeedback),
  }),
).annotate({
  identifier: "InvestigationAction",
}) as any as S.Schema<InvestigationAction>;
export type InvestigationActionList = InvestigationAction[];
export const InvestigationActionList =
  /*@__PURE__*/ S.Array(InvestigationAction);
export interface ListInvestigationsResponse {
  nextToken?: string;
  investigationActions: InvestigationAction[];
}
export const ListInvestigationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    investigationActions: InvestigationActionList,
  }),
).annotate({
  identifier: "ListInvestigationsResponse",
}) as any as S.Schema<ListInvestigationsResponse>;
export interface ListMembershipsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListMembershipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/memberships" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembershipsRequest",
}) as any as S.Schema<ListMembershipsRequest>;
export interface ListMembershipItem {
  membershipId: string;
  accountId?: string;
  region?: AwsRegion;
  membershipArn?: string;
  membershipStatus?: MembershipStatus;
}
export const ListMembershipItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipId: S.String,
    accountId: S.optional(S.String),
    region: S.optional(AwsRegion),
    membershipArn: S.optional(S.String),
    membershipStatus: S.optional(MembershipStatus),
  }),
).annotate({
  identifier: "ListMembershipItem",
}) as any as S.Schema<ListMembershipItem>;
export type ListMembershipItems = ListMembershipItem[];
export const ListMembershipItems = /*@__PURE__*/ S.Array(ListMembershipItem);
export interface ListMembershipsResponse {
  nextToken?: string;
  items?: ListMembershipItem[];
}
export const ListMembershipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: S.optional(ListMembershipItems),
  }),
).annotate({
  identifier: "ListMembershipsResponse",
}) as any as S.Schema<ListMembershipsResponse>;
export type Arn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type ResultId = string;
export interface SendFeedbackRequest {
  caseId: string;
  resultId: string;
  usefulness: UsefulnessRating;
  comment?: string;
}
export const SendFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    resultId: S.String.pipe(T.HttpLabel("resultId")),
    usefulness: UsefulnessRating,
    comment: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/cases/{caseId}/feedback/{resultId}/send-feedback",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendFeedbackRequest",
}) as any as S.Schema<SendFeedbackRequest>;
export interface SendFeedbackResponse {}
export const SendFeedbackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendFeedbackResponse",
}) as any as S.Schema<SendFeedbackResponse>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateCaseRequest {
  caseId: string;
  title?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  reportedIncidentStartDate?: Date;
  actualIncidentStartDate?: Date;
  engagementType?: EngagementType;
  watchersToAdd?: Watcher[];
  watchersToDelete?: Watcher[];
  threatActorIpAddressesToAdd?: ThreatActorIp[];
  threatActorIpAddressesToDelete?: ThreatActorIp[];
  impactedServicesToAdd?: string[];
  impactedServicesToDelete?: string[];
  impactedAwsRegionsToAdd?: ImpactedAwsRegion[];
  impactedAwsRegionsToDelete?: ImpactedAwsRegion[];
  impactedAccountsToAdd?: string[];
  impactedAccountsToDelete?: string[];
  caseMetadata?: CaseMetadataEntry[];
}
export const UpdateCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    title: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    reportedIncidentStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    actualIncidentStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    engagementType: S.optional(EngagementType),
    watchersToAdd: S.optional(Watchers),
    watchersToDelete: S.optional(Watchers),
    threatActorIpAddressesToAdd: S.optional(ThreatActorIpList),
    threatActorIpAddressesToDelete: S.optional(ThreatActorIpList),
    impactedServicesToAdd: S.optional(ImpactedServicesList),
    impactedServicesToDelete: S.optional(ImpactedServicesList),
    impactedAwsRegionsToAdd: S.optional(ImpactedAwsRegionList),
    impactedAwsRegionsToDelete: S.optional(ImpactedAwsRegionList),
    impactedAccountsToAdd: S.optional(ImpactedAccounts),
    impactedAccountsToDelete: S.optional(ImpactedAccounts),
    caseMetadata: S.optional(CaseMetadata),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/update-case" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCaseRequest",
}) as any as S.Schema<UpdateCaseRequest>;
export interface UpdateCaseResponse {}
export const UpdateCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCaseResponse",
}) as any as S.Schema<UpdateCaseResponse>;
export interface UpdateCaseCommentRequest {
  caseId: string;
  commentId: string;
  body: string | redacted.Redacted<string>;
}
export const UpdateCaseCommentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    commentId: S.String.pipe(T.HttpLabel("commentId")),
    body: SensitiveString,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/cases/{caseId}/update-case-comment/{commentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCaseCommentRequest",
}) as any as S.Schema<UpdateCaseCommentRequest>;
export interface UpdateCaseCommentResponse {
  commentId: string;
  body?: string | redacted.Redacted<string>;
}
export const UpdateCaseCommentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commentId: S.String, body: S.optional(SensitiveString) }),
).annotate({
  identifier: "UpdateCaseCommentResponse",
}) as any as S.Schema<UpdateCaseCommentResponse>;
export type SelfManagedCaseStatus =
  | "Submitted"
  | "Detection and Analysis"
  | "Containment, Eradication and Recovery"
  | "Post-incident Activities"
  | (string & {});
export const SelfManagedCaseStatus = /*@__PURE__*/ S.String;

export interface UpdateCaseStatusRequest {
  caseId: string;
  caseStatus: SelfManagedCaseStatus;
}
export const UpdateCaseStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    caseStatus: SelfManagedCaseStatus,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/cases/{caseId}/update-case-status" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCaseStatusRequest",
}) as any as S.Schema<UpdateCaseStatusRequest>;
export interface UpdateCaseStatusResponse {
  caseStatus?: SelfManagedCaseStatus;
}
export const UpdateCaseStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseStatus: S.optional(SelfManagedCaseStatus) }),
).annotate({
  identifier: "UpdateCaseStatusResponse",
}) as any as S.Schema<UpdateCaseStatusResponse>;
export interface MembershipAccountsConfigurationsUpdate {
  coverEntireOrganization?: boolean;
  organizationalUnitsToAdd?: string[];
  organizationalUnitsToRemove?: string[];
}
export const MembershipAccountsConfigurationsUpdate = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      coverEntireOrganization: S.optional(S.Boolean),
      organizationalUnitsToAdd: S.optional(OrganizationalUnits),
      organizationalUnitsToRemove: S.optional(OrganizationalUnits),
    }),
).annotate({
  identifier: "MembershipAccountsConfigurationsUpdate",
}) as any as S.Schema<MembershipAccountsConfigurationsUpdate>;
export interface UpdateMembershipRequest {
  membershipId: string;
  membershipName?: string | redacted.Redacted<string>;
  incidentResponseTeam?: IncidentResponder[];
  optInFeatures?: OptInFeature[];
  membershipAccountsConfigurationsUpdate?: MembershipAccountsConfigurationsUpdate;
  undoMembershipCancellation?: boolean;
}
export const UpdateMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipId: S.String.pipe(T.HttpLabel("membershipId")),
    membershipName: S.optional(SensitiveString),
    incidentResponseTeam: S.optional(IncidentResponseTeam),
    optInFeatures: S.optional(OptInFeatures),
    membershipAccountsConfigurationsUpdate: S.optional(
      MembershipAccountsConfigurationsUpdate,
    ),
    undoMembershipCancellation: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/membership/{membershipId}/update-membership",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMembershipRequest",
}) as any as S.Schema<UpdateMembershipRequest>;
export interface UpdateMembershipResponse {}
export const UpdateMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMembershipResponse",
}) as any as S.Schema<UpdateMembershipResponse>;
export interface UpdateResolverTypeRequest {
  caseId: string;
  resolverType: ResolverType;
}
export const UpdateResolverTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String.pipe(T.HttpLabel("caseId")),
    resolverType: ResolverType,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/cases/{caseId}/update-resolver-type",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResolverTypeRequest",
}) as any as S.Schema<UpdateResolverTypeRequest>;
export interface UpdateResolverTypeResponse {
  caseId: string;
  caseStatus?: CaseStatus;
  resolverType?: ResolverType;
}
export const UpdateResolverTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    caseId: S.String,
    caseStatus: S.optional(CaseStatus),
    resolverType: S.optional(ResolverType),
  }),
).annotate({
  identifier: "UpdateResolverTypeResponse",
}) as any as S.Schema<UpdateResolverTypeResponse>;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
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
export type BatchGetMemberAccountDetailsError = CommonErrors;
/**
 * Provides information on whether the supplied account IDs are associated with a membership.
 *
 * AWS account ID's may appear less than 12 characters and need to be zero-prepended. An example would be `123123123` which is nine digits, and with zero-prepend would be `000123123123`. Not zero-prepending to 12 digits could result in errors.
 */
export const batchGetMemberAccountDetails: API.OperationMethod<
  BatchGetMemberAccountDetailsRequest,
  BatchGetMemberAccountDetailsResponse,
  BatchGetMemberAccountDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetMemberAccountDetailsRequest,
  output: BatchGetMemberAccountDetailsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMemberAccountDetails",
}));

export type CancelMembershipError = CommonErrors;
/**
 * Cancels an existing membership.
 */
export const cancelMembership: API.OperationMethod<
  CancelMembershipRequest,
  CancelMembershipResponse,
  CancelMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMembershipRequest,
  output: CancelMembershipResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMembership",
}));

export type CloseCaseError = CommonErrors;
/**
 * Closes an existing case.
 */
export const closeCase: API.OperationMethod<
  CloseCaseRequest,
  CloseCaseResponse,
  CloseCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CloseCaseRequest,
  output: CloseCaseResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseCase",
}));

export type CreateCaseError = CommonErrors;
/**
 * Creates a new case.
 */
export const createCase: API.OperationMethod<
  CreateCaseRequest,
  CreateCaseResponse,
  CreateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCaseRequest,
  output: CreateCaseResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCase",
}));

export type CreateCaseCommentError = CommonErrors;
/**
 * Adds a comment to an existing case.
 */
export const createCaseComment: API.OperationMethod<
  CreateCaseCommentRequest,
  CreateCaseCommentResponse,
  CreateCaseCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCaseCommentRequest,
  output: CreateCaseCommentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCaseComment",
}));

export type CreateMembershipError = CommonErrors;
/**
 * Creates a new membership.
 */
export const createMembership: API.OperationMethod<
  CreateMembershipRequest,
  CreateMembershipResponse,
  CreateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMembershipRequest,
  output: CreateMembershipResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembership",
}));

export type GetCaseError = CommonErrors;
/**
 * Returns the attributes of a case.
 */
export const getCase: API.OperationMethod<
  GetCaseRequest,
  GetCaseResponse,
  GetCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCaseRequest,
  output: GetCaseResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCase",
}));

export type GetCaseAttachmentDownloadUrlError = CommonErrors;
/**
 * Returns a Pre-Signed URL for uploading attachments into a case.
 */
export const getCaseAttachmentDownloadUrl: API.OperationMethod<
  GetCaseAttachmentDownloadUrlRequest,
  GetCaseAttachmentDownloadUrlResponse,
  GetCaseAttachmentDownloadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCaseAttachmentDownloadUrlRequest,
  output: GetCaseAttachmentDownloadUrlResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAttachmentDownloadUrl",
}));

export type GetCaseAttachmentUploadUrlError = CommonErrors;
/**
 * Uploads an attachment to a case.
 */
export const getCaseAttachmentUploadUrl: API.OperationMethod<
  GetCaseAttachmentUploadUrlRequest,
  GetCaseAttachmentUploadUrlResponse,
  GetCaseAttachmentUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCaseAttachmentUploadUrlRequest,
  output: GetCaseAttachmentUploadUrlResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCaseAttachmentUploadUrl",
}));

export type GetMembershipError = CommonErrors;
/**
 * Returns the attributes of a membership.
 */
export const getMembership: API.OperationMethod<
  GetMembershipRequest,
  GetMembershipResponse,
  GetMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMembershipRequest,
  output: GetMembershipResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembership",
}));

export type ListCaseEditsError = CommonErrors;
/**
 * Views the case history for edits made to a designated case.
 */
export const listCaseEdits: API.PaginatedOperationMethod<
  ListCaseEditsRequest,
  ListCaseEditsResponse,
  ListCaseEditsError,
  Credentials | HttpClient.HttpClient,
  CaseEditItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCaseEditsRequest,
  output: ListCaseEditsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCaseEdits",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCasesError = CommonErrors;
/**
 * Lists all cases the requester has access to.
 */
export const listCases: API.PaginatedOperationMethod<
  ListCasesRequest,
  ListCasesResponse,
  ListCasesError,
  Credentials | HttpClient.HttpClient,
  ListCasesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCasesRequest,
  output: ListCasesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCommentsError = CommonErrors;
/**
 * Returns comments for a designated case.
 */
export const listComments: API.PaginatedOperationMethod<
  ListCommentsRequest,
  ListCommentsResponse,
  ListCommentsError,
  Credentials | HttpClient.HttpClient,
  ListCommentsItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommentsRequest,
  output: ListCommentsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvestigationsError = CommonErrors;
/**
 * Investigation performed by an agent for a security incident...
 */
export const listInvestigations: API.PaginatedOperationMethod<
  ListInvestigationsRequest,
  ListInvestigationsResponse,
  ListInvestigationsError,
  Credentials | HttpClient.HttpClient,
  InvestigationAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvestigationsRequest,
  output: ListInvestigationsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "investigationActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembershipsError = CommonErrors;
/**
 * Returns the memberships that the calling principal can access.
 */
export const listMemberships: API.PaginatedOperationMethod<
  ListMembershipsRequest,
  ListMembershipsResponse,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient,
  ListMembershipItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembershipsRequest,
  output: ListMembershipsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns currently configured tags on a resource.
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
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type SendFeedbackError = CommonErrors;
/**
 * Send feedback based on response investigation action
 */
export const sendFeedback: API.OperationMethod<
  SendFeedbackRequest,
  SendFeedbackResponse,
  SendFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendFeedbackRequest,
  output: SendFeedbackResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendFeedback",
}));

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag(s) to a designated resource.
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
    AccessDeniedException,
    ResourceNotFoundException,
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
 * Removes a tag(s) from a designate resource.
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
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCaseError = CommonErrors;
/**
 * Updates an existing case.
 */
export const updateCase: API.OperationMethod<
  UpdateCaseRequest,
  UpdateCaseResponse,
  UpdateCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCaseRequest,
  output: UpdateCaseResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCase",
}));

export type UpdateCaseCommentError = CommonErrors;
/**
 * Updates an existing case comment.
 */
export const updateCaseComment: API.OperationMethod<
  UpdateCaseCommentRequest,
  UpdateCaseCommentResponse,
  UpdateCaseCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCaseCommentRequest,
  output: UpdateCaseCommentResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCaseComment",
}));

export type UpdateCaseStatusError = CommonErrors;
/**
 * Updates the state transitions for a designated cases.
 *
 * **Self-managed**: the following states are available for self-managed cases.
 *
 * - Submitted → Detection and Analysis
 *
 * - Detection and Analysis → Containment, Eradication, and Recovery
 *
 * - Detection and Analysis → Post-incident Activities
 *
 * - Containment, Eradication, and Recovery → Detection and Analysis
 *
 * - Containment, Eradication, and Recovery → Post-incident Activities
 *
 * - Post-incident Activities → Containment, Eradication, and Recovery
 *
 * - Post-incident Activities → Detection and Analysis
 *
 * - Any → Closed
 *
 * **AWS supported**: You must use the `CloseCase` API to close.
 */
export const updateCaseStatus: API.OperationMethod<
  UpdateCaseStatusRequest,
  UpdateCaseStatusResponse,
  UpdateCaseStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCaseStatusRequest,
  output: UpdateCaseStatusResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCaseStatus",
}));

export type UpdateMembershipError = CommonErrors;
/**
 * Updates membership configuration.
 */
export const updateMembership: API.OperationMethod<
  UpdateMembershipRequest,
  UpdateMembershipResponse,
  UpdateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMembershipRequest,
  output: UpdateMembershipResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMembership",
}));

export type UpdateResolverTypeError = CommonErrors;
/**
 * Updates the resolver type for a case.
 *
 * This is a one-way action and cannot be reversed.
 */
export const updateResolverType: API.OperationMethod<
  UpdateResolverTypeRequest,
  UpdateResolverTypeResponse,
  UpdateResolverTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResolverTypeRequest,
  output: UpdateResolverTypeResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverType",
}));
