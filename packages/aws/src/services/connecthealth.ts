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
  sdkId: "ConnectHealth",
  serviceShapeName: "ConnectHealth",
});
const auth = T.AwsAuthSigv4({ name: "health-agent" });
const ver = T.ServiceVersion("2025-01-29");
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
            `https://health-agent-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://health-agent.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainId = string;
export type SubscriptionId = string;
export interface ActivateSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export const ActivateSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String.pipe(T.HttpLabel("domainId")),
    subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/domains/{domainId}/subscriptions/{subscriptionId}/activate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ActivateSubscriptionInput",
}) as any as S.Schema<ActivateSubscriptionInput>;
export type SubscriptionArn = string;
export type SubscriptionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DELETED"
  | (string & {});
export const SubscriptionStatus = S.String;

export interface SubscriptionDescription {
  domainId: string;
  subscriptionId: string;
  arn: string;
  status: SubscriptionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  activatedAt?: Date;
  deactivatedAt?: Date;
}
export const SubscriptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    subscriptionId: S.String,
    arn: S.String,
    status: SubscriptionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    activatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deactivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SubscriptionDescription",
}) as any as S.Schema<SubscriptionDescription>;
export interface ActivateSubscriptionOutput {
  subscription?: SubscriptionDescription;
}
export const ActivateSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscription: S.optional(SubscriptionDescription) }),
).annotate({
  identifier: "ActivateSubscriptionOutput",
}) as any as S.Schema<ActivateSubscriptionOutput>;
export type DomainName = string;
export type KmsKeyArn = string;
export interface CreateWebAppConfiguration {
  ehrRole: string;
  idcInstanceId: string;
  idcRegion: string;
}
export const CreateWebAppConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ehrRole: S.String, idcInstanceId: S.String, idcRegion: S.String }),
).annotate({
  identifier: "CreateWebAppConfiguration",
}) as any as S.Schema<CreateWebAppConfiguration>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDomainInput {
  name: string;
  kmsKeyArn?: string;
  webAppSetupConfiguration?: CreateWebAppConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    kmsKeyArn: S.optional(S.String),
    webAppSetupConfiguration: S.optional(CreateWebAppConfiguration),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/domain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainInput",
}) as any as S.Schema<CreateDomainInput>;
export type DomainArn = string;
export type EncryptionType =
  | "AWS_OWNED_KEY"
  | "CUSTOMER_MANAGED_KEY"
  | (string & {});
export const EncryptionType = S.String;

export interface EncryptionContext {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
}
export const EncryptionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encryptionType: EncryptionType, kmsKeyArn: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionContext",
}) as any as S.Schema<EncryptionContext>;
export type DomainStatus = "ACTIVE" | "DELETING" | "DELETED" | (string & {});
export const DomainStatus = S.String;

export type WebAppUrl = string;
export interface WebAppConfiguration {
  ehrRole: string;
  idcApplicationId: string;
  idcRegion: string;
}
export const WebAppConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ehrRole: S.String,
    idcApplicationId: S.String,
    idcRegion: S.String,
  }),
).annotate({
  identifier: "WebAppConfiguration",
}) as any as S.Schema<WebAppConfiguration>;
export interface CreateDomainOutput {
  domainId: string;
  arn: string;
  name: string;
  kmsKeyArn?: string;
  encryptionContext?: EncryptionContext;
  status: DomainStatus;
  webAppUrl?: string;
  webAppConfiguration?: WebAppConfiguration;
  createdAt: Date;
}
export const CreateDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    arn: S.String,
    name: S.String,
    kmsKeyArn: S.optional(S.String),
    encryptionContext: S.optional(EncryptionContext),
    status: DomainStatus,
    webAppUrl: S.optional(S.String),
    webAppConfiguration: S.optional(WebAppConfiguration),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateDomainOutput",
}) as any as S.Schema<CreateDomainOutput>;
export interface CreateSubscriptionInput {
  domainId: string;
}
export const CreateSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/domains/{domainId}/subscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSubscriptionInput",
}) as any as S.Schema<CreateSubscriptionInput>;
export interface CreateSubscriptionOutput {
  domainId: string;
  subscriptionId: string;
  arn: string;
  status: SubscriptionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  activatedAt?: Date;
  deactivatedAt?: Date;
}
export const CreateSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    subscriptionId: S.String,
    arn: S.String,
    status: SubscriptionStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    lastUpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    activatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deactivatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateSubscriptionOutput",
}) as any as S.Schema<CreateSubscriptionOutput>;
export interface DeactivateSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export const DeactivateSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String.pipe(T.HttpLabel("domainId")),
    subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/domains/{domainId}/subscriptions/{subscriptionId}/deactivate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeactivateSubscriptionInput",
}) as any as S.Schema<DeactivateSubscriptionInput>;
export interface DeactivateSubscriptionOutput {
  subscription?: SubscriptionDescription;
}
export const DeactivateSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscription: S.optional(SubscriptionDescription) }),
).annotate({
  identifier: "DeactivateSubscriptionOutput",
}) as any as S.Schema<DeactivateSubscriptionOutput>;
export interface DeleteDomainInput {
  domainId: string;
}
export const DeleteDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/domain/{domainId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainInput",
}) as any as S.Schema<DeleteDomainInput>;
export interface DeleteDomainOutput {
  domainId: string;
  arn: string;
  status: DomainStatus;
}
export const DeleteDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainId: S.String, arn: S.String, status: DomainStatus }),
).annotate({
  identifier: "DeleteDomainOutput",
}) as any as S.Schema<DeleteDomainOutput>;
export interface GetDomainInput {
  domainId: string;
}
export const GetDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainId: S.String.pipe(T.HttpLabel("domainId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domain/{domainId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetDomainInput" }) as any as S.Schema<GetDomainInput>;
export interface GetDomainOutput {
  domainId: string;
  arn: string;
  name: string;
  kmsKeyArn?: string;
  encryptionContext?: EncryptionContext;
  status: DomainStatus;
  webAppUrl?: string;
  webAppConfiguration?: WebAppConfiguration;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    arn: S.String,
    name: S.String,
    kmsKeyArn: S.optional(S.String),
    encryptionContext: S.optional(EncryptionContext),
    status: DomainStatus,
    webAppUrl: S.optional(S.String),
    webAppConfiguration: S.optional(WebAppConfiguration),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetDomainOutput",
}) as any as S.Schema<GetDomainOutput>;
export type ScribeSessionId = string;
export interface GetMedicalScribeListeningSessionInput {
  sessionId: string;
  domainId: string;
  subscriptionId: string;
}
export const GetMedicalScribeListeningSessionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sessionId: S.String.pipe(T.HttpLabel("sessionId")),
      domainId: S.String.pipe(T.HttpLabel("domainId")),
      subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/medical-scribe-stream/domain/{domainId}/subscription/{subscriptionId}/session/{sessionId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetMedicalScribeListeningSessionInput",
}) as any as S.Schema<GetMedicalScribeListeningSessionInput>;
export type MedicalScribeLanguageCode = "en-US" | (string & {});
export const MedicalScribeLanguageCode = S.String;

export type MedicalScribeMediaSampleRateHertz = number;
export type MedicalScribeMediaEncoding = "pcm" | "flac" | (string & {});
export const MedicalScribeMediaEncoding = S.String;

export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole =
  | "PATIENT"
  | "CLINICIAN"
  | (string & {});
export const MedicalScribeParticipantRole = S.String;

export interface MedicalScribeChannelDefinition {
  channelId: number;
  participantRole: MedicalScribeParticipantRole;
}
export const MedicalScribeChannelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelId: S.Number,
    participantRole: MedicalScribeParticipantRole,
  }),
).annotate({
  identifier: "MedicalScribeChannelDefinition",
}) as any as S.Schema<MedicalScribeChannelDefinition>;
export type MedicalScribeChannelDefinitions = MedicalScribeChannelDefinition[];
export const MedicalScribeChannelDefinitions = /*@__PURE__*/ S.Array(
  MedicalScribeChannelDefinition,
);
export type S3Uri = string;
export type ManagedNoteTemplate =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "DAP"
  | "SIRP"
  | "BIRP"
  | "BEHAVIORAL_SOAP"
  | "PHYSICAL_SOAP"
  | (string & {});
export const ManagedNoteTemplate = S.String;

export interface ManagedTemplateResponse {
  templateType?: ManagedNoteTemplate;
}
export const ManagedTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateType: S.optional(ManagedNoteTemplate) }),
).annotate({
  identifier: "ManagedTemplateResponse",
}) as any as S.Schema<ManagedTemplateResponse>;
export type CustomTemplateBase =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "DAP"
  | "SIRP"
  | "BIRP"
  | "BEHAVIORAL_SOAP"
  | (string & {});
export const CustomTemplateBase = S.String;

export interface CustomTemplateResponse {
  templateType?: CustomTemplateBase;
}
export const CustomTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateType: S.optional(CustomTemplateBase) }),
).annotate({
  identifier: "CustomTemplateResponse",
}) as any as S.Schema<CustomTemplateResponse>;
export type NoteTemplateSettingsResponse =
  | { managedTemplate: ManagedTemplateResponse; customTemplate?: never }
  | { managedTemplate?: never; customTemplate: CustomTemplateResponse };
export const NoteTemplateSettingsResponse = /*@__PURE__*/ S.Union([
  S.Struct({ managedTemplate: ManagedTemplateResponse }),
  S.Struct({ customTemplate: CustomTemplateResponse }),
]);
export interface ClinicalNoteGenerationSettingsResponse {
  noteTemplateSettings?: NoteTemplateSettingsResponse;
}
export const ClinicalNoteGenerationSettingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      noteTemplateSettings: S.optional(NoteTemplateSettingsResponse),
    }),
).annotate({
  identifier: "ClinicalNoteGenerationSettingsResponse",
}) as any as S.Schema<ClinicalNoteGenerationSettingsResponse>;
export interface MedicalScribePostStreamActionSettingsResponse {
  outputS3Uri: string;
  clinicalNoteGenerationSettings: ClinicalNoteGenerationSettingsResponse;
}
export const MedicalScribePostStreamActionSettingsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      outputS3Uri: S.String,
      clinicalNoteGenerationSettings: ClinicalNoteGenerationSettingsResponse,
    }),
  ).annotate({
    identifier: "MedicalScribePostStreamActionSettingsResponse",
  }) as any as S.Schema<MedicalScribePostStreamActionSettingsResponse>;
export type Uri = string;
export type PostStreamArtifactGenerationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const PostStreamArtifactGenerationStatus = S.String;

export type ErrorMessage = string;
export interface ArtifactDetails {
  outputLocation?: string;
  status?: PostStreamArtifactGenerationStatus;
  failureReason?: string;
}
export const ArtifactDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputLocation: S.optional(S.String),
    status: S.optional(PostStreamArtifactGenerationStatus),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ArtifactDetails",
}) as any as S.Schema<ArtifactDetails>;
export interface ClinicalNoteGenerationResult {
  noteResult?: ArtifactDetails;
  transcriptResult?: ArtifactDetails;
  afterVisitSummaryResult?: ArtifactDetails;
}
export const ClinicalNoteGenerationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    noteResult: S.optional(ArtifactDetails),
    transcriptResult: S.optional(ArtifactDetails),
    afterVisitSummaryResult: S.optional(ArtifactDetails),
  }),
).annotate({
  identifier: "ClinicalNoteGenerationResult",
}) as any as S.Schema<ClinicalNoteGenerationResult>;
export interface MedicalScribePostStreamActionsResult {
  clinicalNoteGenerationResult?: ClinicalNoteGenerationResult;
}
export const MedicalScribePostStreamActionsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      clinicalNoteGenerationResult: S.optional(ClinicalNoteGenerationResult),
    }),
).annotate({
  identifier: "MedicalScribePostStreamActionsResult",
}) as any as S.Schema<MedicalScribePostStreamActionsResult>;
export type NonNullBoolean = boolean;
export type MedicalScribeStreamStatus =
  | "IN_PROGRESS"
  | "PAUSED"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const MedicalScribeStreamStatus = S.String;

export interface MedicalScribeListeningSessionDetails {
  sessionId?: string;
  domainId?: string;
  subscriptionId?: string;
  languageCode?: MedicalScribeLanguageCode;
  mediaSampleRateHertz?: number;
  mediaEncoding?: MedicalScribeMediaEncoding;
  channelDefinitions?: MedicalScribeChannelDefinition[];
  postStreamActionSettings?: MedicalScribePostStreamActionSettingsResponse;
  postStreamActionResult?: MedicalScribePostStreamActionsResult;
  encounterContextProvided?: boolean;
  streamStatus?: MedicalScribeStreamStatus;
  streamCreationTime?: Date;
  streamEndTime?: Date;
}
export const MedicalScribeListeningSessionDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sessionId: S.optional(S.String),
      domainId: S.optional(S.String),
      subscriptionId: S.optional(S.String),
      languageCode: S.optional(MedicalScribeLanguageCode),
      mediaSampleRateHertz: S.optional(S.Number),
      mediaEncoding: S.optional(MedicalScribeMediaEncoding),
      channelDefinitions: S.optional(MedicalScribeChannelDefinitions),
      postStreamActionSettings: S.optional(
        MedicalScribePostStreamActionSettingsResponse,
      ),
      postStreamActionResult: S.optional(MedicalScribePostStreamActionsResult),
      encounterContextProvided: S.optional(S.Boolean),
      streamStatus: S.optional(MedicalScribeStreamStatus),
      streamCreationTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      streamEndTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
).annotate({
  identifier: "MedicalScribeListeningSessionDetails",
}) as any as S.Schema<MedicalScribeListeningSessionDetails>;
export interface GetMedicalScribeListeningSessionOutput {
  medicalScribeListeningSessionDetails?: MedicalScribeListeningSessionDetails;
}
export const GetMedicalScribeListeningSessionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      medicalScribeListeningSessionDetails: S.optional(
        MedicalScribeListeningSessionDetails,
      ),
    }),
).annotate({
  identifier: "GetMedicalScribeListeningSessionOutput",
}) as any as S.Schema<GetMedicalScribeListeningSessionOutput>;
export type JobId = string;
export interface GetPatientInsightsJobRequest {
  domainId: string;
  jobId: string;
}
export const GetPatientInsightsJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String.pipe(T.HttpLabel("domainId")),
    jobId: S.String.pipe(T.HttpLabel("jobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/domain/{domainId}/patient-insights-job/{jobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPatientInsightsJobRequest",
}) as any as S.Schema<GetPatientInsightsJobRequest>;
export type JobArn = string;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export const JobStatus = S.String;

export interface InsightsOutput {
  uri: string;
}
export const InsightsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "InsightsOutput" }) as any as S.Schema<InsightsOutput>;
export type NonEmptyString = string;
export type SensitiveNonEmptyString = string | redacted.Redacted<string>;
export type SensitiveIsoDateString = string | redacted.Redacted<string>;
export type Pronouns = "HE_HIM" | "SHE_HER" | "THEY_THEM" | (string & {});
export const Pronouns = S.String;

export interface PatientInsightsPatientContext {
  patientId: string | redacted.Redacted<string>;
  dateOfBirth?: string | redacted.Redacted<string>;
  pronouns?: Pronouns;
}
export const PatientInsightsPatientContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    patientId: SensitiveString,
    dateOfBirth: S.optional(SensitiveString),
    pronouns: S.optional(Pronouns),
  }),
).annotate({
  identifier: "PatientInsightsPatientContext",
}) as any as S.Schema<PatientInsightsPatientContext>;
export type InsightsType = "PRE_VISIT" | (string & {});
export const InsightsType = S.String;

export interface InsightsContext {
  insightsType: InsightsType;
}
export const InsightsContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ insightsType: InsightsType }),
).annotate({
  identifier: "InsightsContext",
}) as any as S.Schema<InsightsContext>;
export interface PatientInsightsEncounterContext {
  encounterReason: string | redacted.Redacted<string>;
}
export const PatientInsightsEncounterContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encounterReason: SensitiveString }),
).annotate({
  identifier: "PatientInsightsEncounterContext",
}) as any as S.Schema<PatientInsightsEncounterContext>;
export type ProviderRole = "CLINICIAN" | (string & {});
export const ProviderRole = S.String;

export type Specialty = "PRIMARY_CARE" | (string & {});
export const Specialty = S.String;

export interface UserContext {
  role: ProviderRole;
  userId: string | redacted.Redacted<string>;
  specialty?: Specialty;
}
export const UserContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    role: ProviderRole,
    userId: SensitiveString,
    specialty: S.optional(Specialty),
  }),
).annotate({ identifier: "UserContext" }) as any as S.Schema<UserContext>;
export interface FHIRServer {
  fhirEndpoint: string;
  oauthToken?: string | redacted.Redacted<string>;
}
export const FHIRServer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fhirEndpoint: S.String, oauthToken: S.optional(SensitiveString) }),
).annotate({ identifier: "FHIRServer" }) as any as S.Schema<FHIRServer>;
export interface S3Source {
  uri: string;
}
export const S3Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String }),
).annotate({ identifier: "S3Source" }) as any as S.Schema<S3Source>;
export type S3Sources = S3Source[];
export const S3Sources = /*@__PURE__*/ S.Array(S3Source);
export interface InputDataConfig {
  fhirServer?: FHIRServer;
  s3Sources?: S3Source[];
}
export const InputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fhirServer: S.optional(FHIRServer),
    s3Sources: S.optional(S3Sources),
  }),
).annotate({
  identifier: "InputDataConfig",
}) as any as S.Schema<InputDataConfig>;
export interface OutputDataConfig {
  s3OutputPath: string;
}
export const OutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3OutputPath: S.String }),
).annotate({
  identifier: "OutputDataConfig",
}) as any as S.Schema<OutputDataConfig>;
export interface GetPatientInsightsJobResponse {
  jobId: string;
  jobArn: string;
  jobStatus: JobStatus;
  creationTime?: Date;
  updatedTime?: Date;
  insightsOutput?: InsightsOutput;
  statusDetails?: string;
  patientContext: PatientInsightsPatientContext;
  insightsContext: InsightsContext;
  encounterContext: PatientInsightsEncounterContext;
  userContext: UserContext;
  inputDataConfig: InputDataConfig;
  outputDataConfig: OutputDataConfig;
}
export const GetPatientInsightsJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String,
    jobArn: S.String,
    jobStatus: JobStatus,
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    insightsOutput: S.optional(InsightsOutput),
    statusDetails: S.optional(S.String),
    patientContext: PatientInsightsPatientContext,
    insightsContext: InsightsContext,
    encounterContext: PatientInsightsEncounterContext,
    userContext: UserContext,
    inputDataConfig: InputDataConfig,
    outputDataConfig: OutputDataConfig,
  }),
).annotate({
  identifier: "GetPatientInsightsJobResponse",
}) as any as S.Schema<GetPatientInsightsJobResponse>;
export interface GetSubscriptionInput {
  domainId: string;
  subscriptionId: string;
}
export const GetSubscriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String.pipe(T.HttpLabel("domainId")),
    subscriptionId: S.String.pipe(T.HttpLabel("subscriptionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/domains/{domainId}/subscriptions/{subscriptionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSubscriptionInput",
}) as any as S.Schema<GetSubscriptionInput>;
export interface GetSubscriptionOutput {
  subscription?: SubscriptionDescription;
}
export const GetSubscriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subscription: S.optional(SubscriptionDescription) }),
).annotate({
  identifier: "GetSubscriptionOutput",
}) as any as S.Schema<GetSubscriptionOutput>;
export interface ListDomainsInput {
  status?: DomainStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(DomainStatus).pipe(T.HttpQuery("status")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainsInput",
}) as any as S.Schema<ListDomainsInput>;
export interface DomainSummary {
  domainId: string;
  arn: string;
  name: string;
  status: DomainStatus;
  createdAt: Date;
}
export const DomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String,
    arn: S.String,
    name: S.String,
    status: DomainStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "DomainSummary" }) as any as S.Schema<DomainSummary>;
export type DomainSummaryList = DomainSummary[];
export const DomainSummaryList = /*@__PURE__*/ S.Array(DomainSummary);
export interface ListDomainsOutput {
  domains: DomainSummary[];
  nextToken?: string;
}
export const ListDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domains: DomainSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDomainsOutput",
}) as any as S.Schema<ListDomainsOutput>;
export interface ListSubscriptionsInput {
  domainId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSubscriptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String.pipe(T.HttpLabel("domainId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/domains/{domainId}/subscriptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSubscriptionsInput",
}) as any as S.Schema<ListSubscriptionsInput>;
export type SubscriptionList = SubscriptionDescription[];
export const SubscriptionList = /*@__PURE__*/ S.Array(SubscriptionDescription);
export interface ListSubscriptionsOutput {
  subscriptions: SubscriptionDescription[];
  nextToken?: string;
}
export const ListSubscriptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    subscriptions: SubscriptionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSubscriptionsOutput",
}) as any as S.Schema<ListSubscriptionsOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type AudioChunk = Uint8Array;
export interface MedicalScribeAudioEvent {
  audioChunk: Uint8Array;
}
export const MedicalScribeAudioEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audioChunk: T.Blob }),
).annotate({
  identifier: "MedicalScribeAudioEvent",
}) as any as S.Schema<MedicalScribeAudioEvent>;
export interface MedicalScribeBinaryAudioEvent {
  audioChunk: Uint8Array;
}
export const MedicalScribeBinaryAudioEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audioChunk: T.Blob.pipe(T.EventPayload()) }),
).annotate({
  identifier: "MedicalScribeBinaryAudioEvent",
}) as any as S.Schema<MedicalScribeBinaryAudioEvent>;
export type MedicalScribeSessionControlEventType =
  | "END_OF_SESSION"
  | (string & {});
export const MedicalScribeSessionControlEventType = S.String;

export interface MedicalScribeSessionControlEvent {
  type?: MedicalScribeSessionControlEventType;
}
export const MedicalScribeSessionControlEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(MedicalScribeSessionControlEventType) }),
).annotate({
  identifier: "MedicalScribeSessionControlEvent",
}) as any as S.Schema<MedicalScribeSessionControlEvent>;
export interface ManagedTemplate {
  templateType: ManagedNoteTemplate;
}
export const ManagedTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ templateType: ManagedNoteTemplate }),
).annotate({
  identifier: "ManagedTemplate",
}) as any as S.Schema<ManagedTemplate>;
export type SensitiveAlphanumericString = string | redacted.Redacted<string>;
export type SensitiveMarkdownString = string | redacted.Redacted<string>;
export interface TemplateSectionInstruction {
  sectionHeader: string | redacted.Redacted<string>;
  sectionInstruction: string | redacted.Redacted<string>;
}
export const TemplateSectionInstruction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sectionHeader: SensitiveString,
    sectionInstruction: SensitiveString,
  }),
).annotate({
  identifier: "TemplateSectionInstruction",
}) as any as S.Schema<TemplateSectionInstruction>;
export type TemplateInstructions = TemplateSectionInstruction[];
export const TemplateInstructions = /*@__PURE__*/ S.Array(
  TemplateSectionInstruction,
);
export interface CustomTemplate {
  templateType: CustomTemplateBase;
  templateInstructions: TemplateSectionInstruction[];
}
export const CustomTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateType: CustomTemplateBase,
    templateInstructions: TemplateInstructions,
  }),
).annotate({ identifier: "CustomTemplate" }) as any as S.Schema<CustomTemplate>;
export type NoteTemplateSettings =
  | { managedTemplate: ManagedTemplate; customTemplate?: never }
  | { managedTemplate?: never; customTemplate: CustomTemplate };
export const NoteTemplateSettings = /*@__PURE__*/ S.Union([
  S.Struct({ managedTemplate: ManagedTemplate }),
  S.Struct({ customTemplate: CustomTemplate }),
]);
export interface ClinicalNoteGenerationSettings {
  noteTemplateSettings: NoteTemplateSettings;
}
export const ClinicalNoteGenerationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ noteTemplateSettings: NoteTemplateSettings }),
).annotate({
  identifier: "ClinicalNoteGenerationSettings",
}) as any as S.Schema<ClinicalNoteGenerationSettings>;
export interface MedicalScribePostStreamActionSettings {
  outputS3Uri: string;
  clinicalNoteGenerationSettings: ClinicalNoteGenerationSettings;
}
export const MedicalScribePostStreamActionSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      outputS3Uri: S.String,
      clinicalNoteGenerationSettings: ClinicalNoteGenerationSettings,
    }),
).annotate({
  identifier: "MedicalScribePostStreamActionSettings",
}) as any as S.Schema<MedicalScribePostStreamActionSettings>;
export interface EncounterContext {
  unstructuredContext?: string | redacted.Redacted<string>;
}
export const EncounterContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ unstructuredContext: S.optional(SensitiveString) }),
).annotate({
  identifier: "EncounterContext",
}) as any as S.Schema<EncounterContext>;
export interface MedicalScribeConfigurationEvent {
  postStreamActionSettings: MedicalScribePostStreamActionSettings;
  channelDefinitions?: MedicalScribeChannelDefinition[];
  encounterContext?: EncounterContext;
}
export const MedicalScribeConfigurationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    postStreamActionSettings: MedicalScribePostStreamActionSettings,
    channelDefinitions: S.optional(MedicalScribeChannelDefinitions),
    encounterContext: S.optional(EncounterContext),
  }),
).annotate({
  identifier: "MedicalScribeConfigurationEvent",
}) as any as S.Schema<MedicalScribeConfigurationEvent>;
export type MedicalScribeInputStream =
  | {
      audioEvent: MedicalScribeAudioEvent;
      binaryAudioEvent?: never;
      sessionControlEvent?: never;
      configurationEvent?: never;
    }
  | {
      audioEvent?: never;
      binaryAudioEvent: MedicalScribeBinaryAudioEvent;
      sessionControlEvent?: never;
      configurationEvent?: never;
    }
  | {
      audioEvent?: never;
      binaryAudioEvent?: never;
      sessionControlEvent: MedicalScribeSessionControlEvent;
      configurationEvent?: never;
    }
  | {
      audioEvent?: never;
      binaryAudioEvent?: never;
      sessionControlEvent?: never;
      configurationEvent: MedicalScribeConfigurationEvent;
    };
export const MedicalScribeInputStream = /*@__PURE__*/ T.InputEventStream(
  S.Union([
    S.Struct({ audioEvent: MedicalScribeAudioEvent }),
    S.Struct({ binaryAudioEvent: MedicalScribeBinaryAudioEvent }),
    S.Struct({ sessionControlEvent: MedicalScribeSessionControlEvent }),
    S.Struct({ configurationEvent: MedicalScribeConfigurationEvent }),
  ]),
) as any as S.Schema<stream.Stream<MedicalScribeInputStream, Error, never>>;
export interface StartMedicalScribeListeningSessionInput {
  sessionId: string;
  domainId: string;
  subscriptionId: string;
  languageCode: MedicalScribeLanguageCode;
  mediaSampleRateHertz: number;
  mediaEncoding: MedicalScribeMediaEncoding;
  inputStream?: stream.Stream<MedicalScribeInputStream, Error, never>;
}
export const StartMedicalScribeListeningSessionInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sessionId: S.String.pipe(T.HttpHeader("x-amzn-medscribe-session-id")),
      domainId: S.String.pipe(T.HttpHeader("x-amzn-medscribe-domain-id")),
      subscriptionId: S.String.pipe(
        T.HttpHeader("x-amzn-medscribe-subscription-id"),
      ),
      languageCode: MedicalScribeLanguageCode.pipe(
        T.HttpHeader("x-amzn-medscribe-language-code"),
      ),
      mediaSampleRateHertz: S.Number.pipe(
        T.HttpHeader("x-amzn-medscribe-sample-rate"),
      ),
      mediaEncoding: MedicalScribeMediaEncoding.pipe(
        T.HttpHeader("x-amzn-medscribe-media-encoding"),
      ),
      inputStream: S.optional(MedicalScribeInputStream).pipe(T.HttpPayload()),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/medical-scribe-stream/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMedicalScribeListeningSessionInput",
}) as any as S.Schema<StartMedicalScribeListeningSessionInput>;
export type RequestId = string;
export type AudioOffset = number;
export interface MedicalScribeTranscriptSegment {
  segmentId?: string;
  audioBeginOffset?: number;
  audioEndOffset?: number;
  isPartial?: boolean;
  channelId?: string;
  content?: string;
}
export const MedicalScribeTranscriptSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    segmentId: S.optional(S.String),
    audioBeginOffset: S.optional(S.Number),
    audioEndOffset: S.optional(S.Number),
    isPartial: S.optional(S.Boolean),
    channelId: S.optional(S.String),
    content: S.optional(S.String),
  }),
).annotate({
  identifier: "MedicalScribeTranscriptSegment",
}) as any as S.Schema<MedicalScribeTranscriptSegment>;
export interface MedicalScribeTranscriptEvent {
  transcriptSegment?: MedicalScribeTranscriptSegment;
}
export const MedicalScribeTranscriptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transcriptSegment: S.optional(MedicalScribeTranscriptSegment) }),
).annotate({
  identifier: "MedicalScribeTranscriptEvent",
}) as any as S.Schema<MedicalScribeTranscriptEvent>;
export type MedicalScribeOutputStream =
  | {
      transcriptEvent: MedicalScribeTranscriptEvent;
      internalFailureException?: never;
      validationException?: never;
    }
  | {
      transcriptEvent?: never;
      internalFailureException: InternalServerException;
      validationException?: never;
    }
  | {
      transcriptEvent?: never;
      internalFailureException?: never;
      validationException: ValidationException;
    };
export const MedicalScribeOutputStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ transcriptEvent: MedicalScribeTranscriptEvent }),
    S.Struct({
      internalFailureException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
  ]),
) as any as S.Schema<stream.Stream<MedicalScribeOutputStream, Error, never>>;
export interface StartMedicalScribeListeningSessionOutput {
  sessionId?: string;
  domainId?: string;
  subscriptionId?: string;
  requestId?: string;
  languageCode?: MedicalScribeLanguageCode;
  mediaSampleRateHertz?: number;
  mediaEncoding?: MedicalScribeMediaEncoding;
  responseStream?: stream.Stream<MedicalScribeOutputStream, Error, never>;
}
export const StartMedicalScribeListeningSessionOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sessionId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-medscribe-session-id"),
      ),
      domainId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-medscribe-domain-id"),
      ),
      subscriptionId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-medscribe-subscription-id"),
      ),
      requestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
      languageCode: S.optional(MedicalScribeLanguageCode).pipe(
        T.HttpHeader("x-amzn-medscribe-language-code"),
      ),
      mediaSampleRateHertz: S.optional(S.Number).pipe(
        T.HttpHeader("x-amzn-medscribe-sample-rate"),
      ),
      mediaEncoding: S.optional(MedicalScribeMediaEncoding).pipe(
        T.HttpHeader("x-amzn-medscribe-media-encoding"),
      ),
      responseStream: S.optional(MedicalScribeOutputStream).pipe(
        T.HttpPayload(),
      ),
    }),
).annotate({
  identifier: "StartMedicalScribeListeningSessionOutput",
}) as any as S.Schema<StartMedicalScribeListeningSessionOutput>;
export interface StartPatientInsightsJobRequest {
  domainId: string;
  patientContext: PatientInsightsPatientContext;
  insightsContext: InsightsContext;
  encounterContext: PatientInsightsEncounterContext;
  userContext: UserContext;
  inputDataConfig: InputDataConfig;
  outputDataConfig: OutputDataConfig;
  clientToken?: string;
}
export const StartPatientInsightsJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainId: S.String.pipe(T.HttpLabel("domainId")),
    patientContext: PatientInsightsPatientContext,
    insightsContext: InsightsContext,
    encounterContext: PatientInsightsEncounterContext,
    userContext: UserContext,
    inputDataConfig: InputDataConfig,
    outputDataConfig: OutputDataConfig,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/domain/{domainId}/patient-insights-job",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPatientInsightsJobRequest",
}) as any as S.Schema<StartPatientInsightsJobRequest>;
export interface StartPatientInsightsJobResponse {
  jobArn: string;
  jobId: string;
  creationTime?: Date;
}
export const StartPatientInsightsJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobArn: S.String,
    jobId: S.String,
    creationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StartPatientInsightsJobResponse",
}) as any as S.Schema<StartPatientInsightsJobResponse>;
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
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type ActivateSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Activates a Subscription to enable billing for a user.
 */
export const activateSubscription: API.OperationMethod<
  ActivateSubscriptionInput,
  ActivateSubscriptionOutput,
  ActivateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ActivateSubscriptionInput,
  output: ActivateSubscriptionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateSubscription",
}));

export type CreateDomainError = ServiceQuotaExceededException | CommonErrors;
/**
 * Creates a new Domain for managing HealthAgent resources.
 */
export const createDomain: API.OperationMethod<
  CreateDomainInput,
  CreateDomainOutput,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainInput,
  output: CreateDomainOutput,
  errors: [ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type CreateSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Subscription within a Domain for billing and user management.
 */
export const createSubscription: API.OperationMethod<
  CreateSubscriptionInput,
  CreateSubscriptionOutput,
  CreateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriptionInput,
  output: CreateSubscriptionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscription",
}));

export type DeactivateSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deactivates a Subscription to stop billing for a user.
 */
export const deactivateSubscription: API.OperationMethod<
  DeactivateSubscriptionInput,
  DeactivateSubscriptionOutput,
  DeactivateSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeactivateSubscriptionInput,
  output: DeactivateSubscriptionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateSubscription",
}));

export type DeleteDomainError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes a Domain and all associated resources.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainInput,
  DeleteDomainOutput,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainInput,
  output: DeleteDomainOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type GetDomainError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a Domain.
 */
export const getDomain: API.OperationMethod<
  GetDomainInput,
  GetDomainOutput,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainInput,
  output: GetDomainOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
}));

export type GetMedicalScribeListeningSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about an existing Medical Scribe listening session
 */
export const getMedicalScribeListeningSession: API.OperationMethod<
  GetMedicalScribeListeningSessionInput,
  GetMedicalScribeListeningSessionOutput,
  GetMedicalScribeListeningSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMedicalScribeListeningSessionInput,
  output: GetMedicalScribeListeningSessionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeListeningSession",
  endpointHostPrefix: "streaming.",
}));

export type GetPatientInsightsJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details of a started patient insights job.
 */
export const getPatientInsightsJob: API.OperationMethod<
  GetPatientInsightsJobRequest,
  GetPatientInsightsJobResponse,
  GetPatientInsightsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPatientInsightsJobRequest,
  output: GetPatientInsightsJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatientInsightsJob",
  endpointHostPrefix: "runtime.",
}));

export type GetSubscriptionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a Subscription.
 */
export const getSubscription: API.OperationMethod<
  GetSubscriptionInput,
  GetSubscriptionOutput,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSubscriptionInput,
  output: GetSubscriptionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSubscription",
}));

export type ListDomainsError = CommonErrors;
/**
 * Lists Domains for a given account.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput,
  ListDomainsOutput,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsInput,
  output: ListDomainsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domains",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Subscriptions within a Domain.
 */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsInput,
  ListSubscriptionsOutput,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  SubscriptionDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsInput,
  output: ListSubscriptionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
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

export type ListTagsForResourceError = CommonErrors;
/**
 * Lists the tags associated with the specified resource
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartMedicalScribeListeningSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new Medical Scribe listening session for real-time audio transcription
 */
export const startMedicalScribeListeningSession: API.OperationMethod<
  StartMedicalScribeListeningSessionInput,
  StartMedicalScribeListeningSessionOutput,
  StartMedicalScribeListeningSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMedicalScribeListeningSessionInput,
  output: StartMedicalScribeListeningSessionOutput,
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
  operationName: "StartMedicalScribeListeningSession",
  endpointHostPrefix: "streaming.",
}));

export type StartPatientInsightsJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new patient insights job.
 */
export const startPatientInsightsJob: API.OperationMethod<
  StartPatientInsightsJobRequest,
  StartPatientInsightsJobResponse,
  StartPatientInsightsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPatientInsightsJobRequest,
  output: StartPatientInsightsJobResponse,
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
  operationName: "StartPatientInsightsJob",
  endpointHostPrefix: "runtime.",
}));

export type TagResourceError = CommonErrors;
/**
 * Associates the specified tags with the specified resource
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes the specified tags from the specified resource
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
