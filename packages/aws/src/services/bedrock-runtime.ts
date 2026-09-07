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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Bedrock Runtime",
  serviceShapeName: "AmazonBedrockFrontendService",
});
const auth = T.AwsAuthSigv4({ name: "bedrock" });
const ver = T.ServiceVersion("2023-09-30");
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
              `https://bedrock-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ModelErrorException
  extends /*@__PURE__*/ S.TaggedError<ModelErrorException>()(
    "ModelErrorException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      originalStatusCode: S.optional(S.Number),
      resourceName: S.optional(S.String),
    },
    T.HttpError(424),
  ) {}
export class ModelNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ModelNotReadyException>()(
    "ModelNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ModelStreamErrorException
  extends /*@__PURE__*/ S.TaggedError<ModelStreamErrorException>()(
    "ModelStreamErrorException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      originalStatusCode: S.optional(S.Number),
      originalMessage: S.optional(S.String),
    },
    T.HttpError(424),
  ) {}
export class ModelTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ModelTimeoutException>()(
    "ModelTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
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
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GuardrailIdentifier = string;
export type GuardrailVersion = string;
export type GuardrailContentSource = "INPUT" | "OUTPUT" | (string & {});
export const GuardrailContentSource = S.String;

export type GuardrailContentQualifier =
  | "grounding_source"
  | "query"
  | "guard_content"
  | (string & {});
export const GuardrailContentQualifier = S.String;

export type GuardrailContentQualifierList = GuardrailContentQualifier[];
export const GuardrailContentQualifierList = /*@__PURE__*/ S.Array(
  GuardrailContentQualifier,
);
export interface GuardrailTextBlock {
  text: string;
  qualifiers?: GuardrailContentQualifier[];
}
export const GuardrailTextBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.String,
    qualifiers: S.optional(GuardrailContentQualifierList),
  }),
).annotate({
  identifier: "GuardrailTextBlock",
}) as any as S.Schema<GuardrailTextBlock>;
export type GuardrailImageFormat = "png" | "jpeg" | (string & {});
export const GuardrailImageFormat = S.String;

export type GuardrailImageSource = { bytes: Uint8Array };
export const GuardrailImageSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
]);
export interface GuardrailImageBlock {
  format: GuardrailImageFormat;
  source: GuardrailImageSource;
}
export const GuardrailImageBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: GuardrailImageFormat, source: GuardrailImageSource }),
).annotate({
  identifier: "GuardrailImageBlock",
}) as any as S.Schema<GuardrailImageBlock>;
export type GuardrailContentBlock =
  | { text: GuardrailTextBlock; image?: never }
  | { text?: never; image: GuardrailImageBlock };
export const GuardrailContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: GuardrailTextBlock }),
  S.Struct({ image: GuardrailImageBlock }),
]);
export type GuardrailContentBlockList = GuardrailContentBlock[];
export const GuardrailContentBlockList = /*@__PURE__*/ S.Array(
  GuardrailContentBlock,
);
export type GuardrailOutputScope = "INTERVENTIONS" | "FULL" | (string & {});
export const GuardrailOutputScope = S.String;

export interface ApplyGuardrailRequest {
  guardrailIdentifier: string;
  guardrailVersion: string;
  source: GuardrailContentSource;
  content: GuardrailContentBlock[];
  outputScope?: GuardrailOutputScope;
}
export const ApplyGuardrailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
    guardrailVersion: S.String.pipe(T.HttpLabel("guardrailVersion")),
    source: GuardrailContentSource,
    content: GuardrailContentBlockList,
    outputScope: S.optional(GuardrailOutputScope),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/guardrail/{guardrailIdentifier}/version/{guardrailVersion}/apply",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ApplyGuardrailRequest",
}) as any as S.Schema<ApplyGuardrailRequest>;
export type GuardrailTopicPolicyUnitsProcessed = number;
export type GuardrailContentPolicyUnitsProcessed = number;
export type GuardrailWordPolicyUnitsProcessed = number;
export type GuardrailSensitiveInformationPolicyUnitsProcessed = number;
export type GuardrailSensitiveInformationPolicyFreeUnitsProcessed = number;
export type GuardrailContextualGroundingPolicyUnitsProcessed = number;
export type GuardrailContentPolicyImageUnitsProcessed = number;
export type GuardrailAutomatedReasoningPolicyUnitsProcessed = number;
export type GuardrailAutomatedReasoningPoliciesProcessed = number;
export interface GuardrailUsage {
  topicPolicyUnits: number;
  contentPolicyUnits: number;
  wordPolicyUnits: number;
  sensitiveInformationPolicyUnits: number;
  sensitiveInformationPolicyFreeUnits: number;
  contextualGroundingPolicyUnits: number;
  contentPolicyImageUnits?: number;
  automatedReasoningPolicyUnits?: number;
  automatedReasoningPolicies?: number;
}
export const GuardrailUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topicPolicyUnits: S.Number,
    contentPolicyUnits: S.Number,
    wordPolicyUnits: S.Number,
    sensitiveInformationPolicyUnits: S.Number,
    sensitiveInformationPolicyFreeUnits: S.Number,
    contextualGroundingPolicyUnits: S.Number,
    contentPolicyImageUnits: S.optional(S.Number),
    automatedReasoningPolicyUnits: S.optional(S.Number),
    automatedReasoningPolicies: S.optional(S.Number),
  }),
).annotate({ identifier: "GuardrailUsage" }) as any as S.Schema<GuardrailUsage>;
export type GuardrailAction = "NONE" | "GUARDRAIL_INTERVENED" | (string & {});
export const GuardrailAction = S.String;

export type GuardrailOutputText = string;
export interface GuardrailOutputContent {
  text?: string;
}
export const GuardrailOutputContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({
  identifier: "GuardrailOutputContent",
}) as any as S.Schema<GuardrailOutputContent>;
export type GuardrailOutputContentList = GuardrailOutputContent[];
export const GuardrailOutputContentList = /*@__PURE__*/ S.Array(
  GuardrailOutputContent,
);
export type GuardrailTopicType = "DENY" | (string & {});
export const GuardrailTopicType = S.String;

export type GuardrailTopicPolicyAction = "BLOCKED" | "NONE" | (string & {});
export const GuardrailTopicPolicyAction = S.String;

export interface GuardrailTopic {
  name: string;
  type: GuardrailTopicType;
  action: GuardrailTopicPolicyAction;
  detected?: boolean;
}
export const GuardrailTopic = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: GuardrailTopicType,
    action: GuardrailTopicPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GuardrailTopic" }) as any as S.Schema<GuardrailTopic>;
export type GuardrailTopicList = GuardrailTopic[];
export const GuardrailTopicList = /*@__PURE__*/ S.Array(GuardrailTopic);
export interface GuardrailTopicPolicyAssessment {
  topics: GuardrailTopic[];
}
export const GuardrailTopicPolicyAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ topics: GuardrailTopicList }),
).annotate({
  identifier: "GuardrailTopicPolicyAssessment",
}) as any as S.Schema<GuardrailTopicPolicyAssessment>;
export type GuardrailContentFilterType =
  | "INSULTS"
  | "HATE"
  | "SEXUAL"
  | "VIOLENCE"
  | "MISCONDUCT"
  | "PROMPT_ATTACK"
  | (string & {});
export const GuardrailContentFilterType = S.String;

export type GuardrailContentFilterConfidence =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const GuardrailContentFilterConfidence = S.String;

export type GuardrailContentFilterStrength =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const GuardrailContentFilterStrength = S.String;

export type GuardrailContentPolicyAction = "BLOCKED" | "NONE" | (string & {});
export const GuardrailContentPolicyAction = S.String;

export interface GuardrailContentFilter {
  type: GuardrailContentFilterType;
  confidence: GuardrailContentFilterConfidence;
  filterStrength?: GuardrailContentFilterStrength;
  action: GuardrailContentPolicyAction;
  detected?: boolean;
}
export const GuardrailContentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailContentFilterType,
    confidence: GuardrailContentFilterConfidence,
    filterStrength: S.optional(GuardrailContentFilterStrength),
    action: GuardrailContentPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailContentFilter",
}) as any as S.Schema<GuardrailContentFilter>;
export type GuardrailContentFilterList = GuardrailContentFilter[];
export const GuardrailContentFilterList = /*@__PURE__*/ S.Array(
  GuardrailContentFilter,
);
export interface GuardrailContentPolicyAssessment {
  filters: GuardrailContentFilter[];
}
export const GuardrailContentPolicyAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: GuardrailContentFilterList }),
).annotate({
  identifier: "GuardrailContentPolicyAssessment",
}) as any as S.Schema<GuardrailContentPolicyAssessment>;
export type GuardrailWordPolicyAction = "BLOCKED" | "NONE" | (string & {});
export const GuardrailWordPolicyAction = S.String;

export interface GuardrailCustomWord {
  match: string;
  action: GuardrailWordPolicyAction;
  detected?: boolean;
}
export const GuardrailCustomWord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    match: S.String,
    action: GuardrailWordPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailCustomWord",
}) as any as S.Schema<GuardrailCustomWord>;
export type GuardrailCustomWordList = GuardrailCustomWord[];
export const GuardrailCustomWordList =
  /*@__PURE__*/ S.Array(GuardrailCustomWord);
export type GuardrailManagedWordType = "PROFANITY" | (string & {});
export const GuardrailManagedWordType = S.String;

export interface GuardrailManagedWord {
  match: string;
  type: GuardrailManagedWordType;
  action: GuardrailWordPolicyAction;
  detected?: boolean;
}
export const GuardrailManagedWord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    match: S.String,
    type: GuardrailManagedWordType,
    action: GuardrailWordPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailManagedWord",
}) as any as S.Schema<GuardrailManagedWord>;
export type GuardrailManagedWordList = GuardrailManagedWord[];
export const GuardrailManagedWordList =
  /*@__PURE__*/ S.Array(GuardrailManagedWord);
export interface GuardrailWordPolicyAssessment {
  customWords: GuardrailCustomWord[];
  managedWordLists: GuardrailManagedWord[];
}
export const GuardrailWordPolicyAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customWords: GuardrailCustomWordList,
    managedWordLists: GuardrailManagedWordList,
  }),
).annotate({
  identifier: "GuardrailWordPolicyAssessment",
}) as any as S.Schema<GuardrailWordPolicyAssessment>;
export type GuardrailPiiEntityType =
  | "ADDRESS"
  | "AGE"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "DRIVER_ID"
  | "EMAIL"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "IP_ADDRESS"
  | "LICENSE_PLATE"
  | "MAC_ADDRESS"
  | "NAME"
  | "PASSWORD"
  | "PHONE"
  | "PIN"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "URL"
  | "USERNAME"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | (string & {});
export const GuardrailPiiEntityType = S.String;

export type GuardrailSensitiveInformationPolicyAction =
  | "ANONYMIZED"
  | "BLOCKED"
  | "NONE"
  | (string & {});
export const GuardrailSensitiveInformationPolicyAction = S.String;

export interface GuardrailPiiEntityFilter {
  match: string;
  type: GuardrailPiiEntityType;
  action: GuardrailSensitiveInformationPolicyAction;
  detected?: boolean;
}
export const GuardrailPiiEntityFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    match: S.String,
    type: GuardrailPiiEntityType,
    action: GuardrailSensitiveInformationPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailPiiEntityFilter",
}) as any as S.Schema<GuardrailPiiEntityFilter>;
export type GuardrailPiiEntityFilterList = GuardrailPiiEntityFilter[];
export const GuardrailPiiEntityFilterList = /*@__PURE__*/ S.Array(
  GuardrailPiiEntityFilter,
);
export interface GuardrailRegexFilter {
  name?: string;
  match?: string;
  regex?: string;
  action: GuardrailSensitiveInformationPolicyAction;
  detected?: boolean;
}
export const GuardrailRegexFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    match: S.optional(S.String),
    regex: S.optional(S.String),
    action: GuardrailSensitiveInformationPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailRegexFilter",
}) as any as S.Schema<GuardrailRegexFilter>;
export type GuardrailRegexFilterList = GuardrailRegexFilter[];
export const GuardrailRegexFilterList =
  /*@__PURE__*/ S.Array(GuardrailRegexFilter);
export interface GuardrailSensitiveInformationPolicyAssessment {
  piiEntities: GuardrailPiiEntityFilter[];
  regexes: GuardrailRegexFilter[];
}
export const GuardrailSensitiveInformationPolicyAssessment =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      piiEntities: GuardrailPiiEntityFilterList,
      regexes: GuardrailRegexFilterList,
    }),
  ).annotate({
    identifier: "GuardrailSensitiveInformationPolicyAssessment",
  }) as any as S.Schema<GuardrailSensitiveInformationPolicyAssessment>;
export type GuardrailContextualGroundingFilterType =
  | "GROUNDING"
  | "RELEVANCE"
  | (string & {});
export const GuardrailContextualGroundingFilterType = S.String;

export type GuardrailContextualGroundingPolicyAction =
  | "BLOCKED"
  | "NONE"
  | (string & {});
export const GuardrailContextualGroundingPolicyAction = S.String;

export interface GuardrailContextualGroundingFilter {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  score: number;
  action: GuardrailContextualGroundingPolicyAction;
  detected?: boolean;
}
export const GuardrailContextualGroundingFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GuardrailContextualGroundingFilterType,
    threshold: S.Number,
    score: S.Number,
    action: GuardrailContextualGroundingPolicyAction,
    detected: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GuardrailContextualGroundingFilter",
}) as any as S.Schema<GuardrailContextualGroundingFilter>;
export type GuardrailContextualGroundingFilters =
  GuardrailContextualGroundingFilter[];
export const GuardrailContextualGroundingFilters = /*@__PURE__*/ S.Array(
  GuardrailContextualGroundingFilter,
);
export interface GuardrailContextualGroundingPolicyAssessment {
  filters?: GuardrailContextualGroundingFilter[];
}
export const GuardrailContextualGroundingPolicyAssessment =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ filters: S.optional(GuardrailContextualGroundingFilters) }),
  ).annotate({
    identifier: "GuardrailContextualGroundingPolicyAssessment",
  }) as any as S.Schema<GuardrailContextualGroundingPolicyAssessment>;
export type GuardrailAutomatedReasoningStatementLogicContent =
  | string
  | redacted.Redacted<string>;
export type GuardrailAutomatedReasoningStatementNaturalLanguageContent =
  | string
  | redacted.Redacted<string>;
export interface GuardrailAutomatedReasoningStatement {
  logic?: string | redacted.Redacted<string>;
  naturalLanguage?: string | redacted.Redacted<string>;
}
export const GuardrailAutomatedReasoningStatement = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      logic: S.optional(SensitiveString),
      naturalLanguage: S.optional(SensitiveString),
    }),
).annotate({
  identifier: "GuardrailAutomatedReasoningStatement",
}) as any as S.Schema<GuardrailAutomatedReasoningStatement>;
export type GuardrailAutomatedReasoningStatementList =
  GuardrailAutomatedReasoningStatement[];
export const GuardrailAutomatedReasoningStatementList = /*@__PURE__*/ S.Array(
  GuardrailAutomatedReasoningStatement,
);
export interface GuardrailAutomatedReasoningInputTextReference {
  text?: string | redacted.Redacted<string>;
}
export const GuardrailAutomatedReasoningInputTextReference =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ text: S.optional(SensitiveString) }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningInputTextReference",
  }) as any as S.Schema<GuardrailAutomatedReasoningInputTextReference>;
export type GuardrailAutomatedReasoningInputTextReferenceList =
  GuardrailAutomatedReasoningInputTextReference[];
export const GuardrailAutomatedReasoningInputTextReferenceList =
  /*@__PURE__*/ S.Array(GuardrailAutomatedReasoningInputTextReference);
export type GuardrailAutomatedReasoningTranslationConfidence = number;
export interface GuardrailAutomatedReasoningTranslation {
  premises?: GuardrailAutomatedReasoningStatement[];
  claims?: GuardrailAutomatedReasoningStatement[];
  untranslatedPremises?: GuardrailAutomatedReasoningInputTextReference[];
  untranslatedClaims?: GuardrailAutomatedReasoningInputTextReference[];
  confidence?: number;
}
export const GuardrailAutomatedReasoningTranslation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      premises: S.optional(GuardrailAutomatedReasoningStatementList),
      claims: S.optional(GuardrailAutomatedReasoningStatementList),
      untranslatedPremises: S.optional(
        GuardrailAutomatedReasoningInputTextReferenceList,
      ),
      untranslatedClaims: S.optional(
        GuardrailAutomatedReasoningInputTextReferenceList,
      ),
      confidence: S.optional(S.Number),
    }),
).annotate({
  identifier: "GuardrailAutomatedReasoningTranslation",
}) as any as S.Schema<GuardrailAutomatedReasoningTranslation>;
export interface GuardrailAutomatedReasoningScenario {
  statements?: GuardrailAutomatedReasoningStatement[];
}
export const GuardrailAutomatedReasoningScenario = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statements: S.optional(GuardrailAutomatedReasoningStatementList),
  }),
).annotate({
  identifier: "GuardrailAutomatedReasoningScenario",
}) as any as S.Schema<GuardrailAutomatedReasoningScenario>;
export type AutomatedReasoningRuleIdentifier = string;
export type GuardrailAutomatedReasoningPolicyVersionArn = string;
export interface GuardrailAutomatedReasoningRule {
  identifier?: string;
  policyVersionArn?: string;
}
export const GuardrailAutomatedReasoningRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.optional(S.String),
    policyVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GuardrailAutomatedReasoningRule",
}) as any as S.Schema<GuardrailAutomatedReasoningRule>;
export type GuardrailAutomatedReasoningRuleList =
  GuardrailAutomatedReasoningRule[];
export const GuardrailAutomatedReasoningRuleList = /*@__PURE__*/ S.Array(
  GuardrailAutomatedReasoningRule,
);
export type GuardrailAutomatedReasoningLogicWarningType =
  | "ALWAYS_FALSE"
  | "ALWAYS_TRUE"
  | (string & {});
export const GuardrailAutomatedReasoningLogicWarningType = S.String;

export interface GuardrailAutomatedReasoningLogicWarning {
  type?: GuardrailAutomatedReasoningLogicWarningType;
  premises?: GuardrailAutomatedReasoningStatement[];
  claims?: GuardrailAutomatedReasoningStatement[];
}
export const GuardrailAutomatedReasoningLogicWarning = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      type: S.optional(GuardrailAutomatedReasoningLogicWarningType),
      premises: S.optional(GuardrailAutomatedReasoningStatementList),
      claims: S.optional(GuardrailAutomatedReasoningStatementList),
    }),
).annotate({
  identifier: "GuardrailAutomatedReasoningLogicWarning",
}) as any as S.Schema<GuardrailAutomatedReasoningLogicWarning>;
export interface GuardrailAutomatedReasoningValidFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  claimsTrueScenario?: GuardrailAutomatedReasoningScenario;
  supportingRules?: GuardrailAutomatedReasoningRule[];
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export const GuardrailAutomatedReasoningValidFinding = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      translation: S.optional(GuardrailAutomatedReasoningTranslation),
      claimsTrueScenario: S.optional(GuardrailAutomatedReasoningScenario),
      supportingRules: S.optional(GuardrailAutomatedReasoningRuleList),
      logicWarning: S.optional(GuardrailAutomatedReasoningLogicWarning),
    }),
).annotate({
  identifier: "GuardrailAutomatedReasoningValidFinding",
}) as any as S.Schema<GuardrailAutomatedReasoningValidFinding>;
export interface GuardrailAutomatedReasoningInvalidFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  contradictingRules?: GuardrailAutomatedReasoningRule[];
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export const GuardrailAutomatedReasoningInvalidFinding =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      translation: S.optional(GuardrailAutomatedReasoningTranslation),
      contradictingRules: S.optional(GuardrailAutomatedReasoningRuleList),
      logicWarning: S.optional(GuardrailAutomatedReasoningLogicWarning),
    }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningInvalidFinding",
  }) as any as S.Schema<GuardrailAutomatedReasoningInvalidFinding>;
export interface GuardrailAutomatedReasoningSatisfiableFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  claimsTrueScenario?: GuardrailAutomatedReasoningScenario;
  claimsFalseScenario?: GuardrailAutomatedReasoningScenario;
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export const GuardrailAutomatedReasoningSatisfiableFinding =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      translation: S.optional(GuardrailAutomatedReasoningTranslation),
      claimsTrueScenario: S.optional(GuardrailAutomatedReasoningScenario),
      claimsFalseScenario: S.optional(GuardrailAutomatedReasoningScenario),
      logicWarning: S.optional(GuardrailAutomatedReasoningLogicWarning),
    }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningSatisfiableFinding",
  }) as any as S.Schema<GuardrailAutomatedReasoningSatisfiableFinding>;
export interface GuardrailAutomatedReasoningImpossibleFinding {
  translation?: GuardrailAutomatedReasoningTranslation;
  contradictingRules?: GuardrailAutomatedReasoningRule[];
  logicWarning?: GuardrailAutomatedReasoningLogicWarning;
}
export const GuardrailAutomatedReasoningImpossibleFinding =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      translation: S.optional(GuardrailAutomatedReasoningTranslation),
      contradictingRules: S.optional(GuardrailAutomatedReasoningRuleList),
      logicWarning: S.optional(GuardrailAutomatedReasoningLogicWarning),
    }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningImpossibleFinding",
  }) as any as S.Schema<GuardrailAutomatedReasoningImpossibleFinding>;
export type GuardrailAutomatedReasoningTranslationList =
  GuardrailAutomatedReasoningTranslation[];
export const GuardrailAutomatedReasoningTranslationList = /*@__PURE__*/ S.Array(
  GuardrailAutomatedReasoningTranslation,
);
export interface GuardrailAutomatedReasoningTranslationOption {
  translations?: GuardrailAutomatedReasoningTranslation[];
}
export const GuardrailAutomatedReasoningTranslationOption =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      translations: S.optional(GuardrailAutomatedReasoningTranslationList),
    }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningTranslationOption",
  }) as any as S.Schema<GuardrailAutomatedReasoningTranslationOption>;
export type GuardrailAutomatedReasoningTranslationOptionList =
  GuardrailAutomatedReasoningTranslationOption[];
export const GuardrailAutomatedReasoningTranslationOptionList =
  /*@__PURE__*/ S.Array(GuardrailAutomatedReasoningTranslationOption);
export type GuardrailAutomatedReasoningDifferenceScenarioList =
  GuardrailAutomatedReasoningScenario[];
export const GuardrailAutomatedReasoningDifferenceScenarioList =
  /*@__PURE__*/ S.Array(GuardrailAutomatedReasoningScenario);
export interface GuardrailAutomatedReasoningTranslationAmbiguousFinding {
  options?: GuardrailAutomatedReasoningTranslationOption[];
  differenceScenarios?: GuardrailAutomatedReasoningScenario[];
}
export const GuardrailAutomatedReasoningTranslationAmbiguousFinding =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      options: S.optional(GuardrailAutomatedReasoningTranslationOptionList),
      differenceScenarios: S.optional(
        GuardrailAutomatedReasoningDifferenceScenarioList,
      ),
    }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningTranslationAmbiguousFinding",
  }) as any as S.Schema<GuardrailAutomatedReasoningTranslationAmbiguousFinding>;
export interface GuardrailAutomatedReasoningTooComplexFinding {}
export const GuardrailAutomatedReasoningTooComplexFinding =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "GuardrailAutomatedReasoningTooComplexFinding",
  }) as any as S.Schema<GuardrailAutomatedReasoningTooComplexFinding>;
export interface GuardrailAutomatedReasoningNoTranslationsFinding {}
export const GuardrailAutomatedReasoningNoTranslationsFinding =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "GuardrailAutomatedReasoningNoTranslationsFinding",
  }) as any as S.Schema<GuardrailAutomatedReasoningNoTranslationsFinding>;
export type GuardrailAutomatedReasoningFinding =
  | {
      valid: GuardrailAutomatedReasoningValidFinding;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid: GuardrailAutomatedReasoningInvalidFinding;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable: GuardrailAutomatedReasoningSatisfiableFinding;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible: GuardrailAutomatedReasoningImpossibleFinding;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous: GuardrailAutomatedReasoningTranslationAmbiguousFinding;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex: GuardrailAutomatedReasoningTooComplexFinding;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations: GuardrailAutomatedReasoningNoTranslationsFinding;
    };
export const GuardrailAutomatedReasoningFinding = /*@__PURE__*/ S.Union([
  S.Struct({ valid: GuardrailAutomatedReasoningValidFinding }),
  S.Struct({ invalid: GuardrailAutomatedReasoningInvalidFinding }),
  S.Struct({ satisfiable: GuardrailAutomatedReasoningSatisfiableFinding }),
  S.Struct({ impossible: GuardrailAutomatedReasoningImpossibleFinding }),
  S.Struct({
    translationAmbiguous:
      GuardrailAutomatedReasoningTranslationAmbiguousFinding,
  }),
  S.Struct({ tooComplex: GuardrailAutomatedReasoningTooComplexFinding }),
  S.Struct({
    noTranslations: GuardrailAutomatedReasoningNoTranslationsFinding,
  }),
]);
export type GuardrailAutomatedReasoningFindingList =
  GuardrailAutomatedReasoningFinding[];
export const GuardrailAutomatedReasoningFindingList = /*@__PURE__*/ S.Array(
  GuardrailAutomatedReasoningFinding,
);
export interface GuardrailAutomatedReasoningPolicyAssessment {
  findings?: GuardrailAutomatedReasoningFinding[];
}
export const GuardrailAutomatedReasoningPolicyAssessment =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ findings: S.optional(GuardrailAutomatedReasoningFindingList) }),
  ).annotate({
    identifier: "GuardrailAutomatedReasoningPolicyAssessment",
  }) as any as S.Schema<GuardrailAutomatedReasoningPolicyAssessment>;
export type GuardrailProcessingLatency = number;
export type TextCharactersGuarded = number;
export type TextCharactersTotal = number;
export interface GuardrailTextCharactersCoverage {
  guarded?: number;
  total?: number;
}
export const GuardrailTextCharactersCoverage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guarded: S.optional(S.Number), total: S.optional(S.Number) }),
).annotate({
  identifier: "GuardrailTextCharactersCoverage",
}) as any as S.Schema<GuardrailTextCharactersCoverage>;
export type ImagesGuarded = number;
export type ImagesTotal = number;
export interface GuardrailImageCoverage {
  guarded?: number;
  total?: number;
}
export const GuardrailImageCoverage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ guarded: S.optional(S.Number), total: S.optional(S.Number) }),
).annotate({
  identifier: "GuardrailImageCoverage",
}) as any as S.Schema<GuardrailImageCoverage>;
export interface GuardrailCoverage {
  textCharacters?: GuardrailTextCharactersCoverage;
  images?: GuardrailImageCoverage;
}
export const GuardrailCoverage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    textCharacters: S.optional(GuardrailTextCharactersCoverage),
    images: S.optional(GuardrailImageCoverage),
  }),
).annotate({
  identifier: "GuardrailCoverage",
}) as any as S.Schema<GuardrailCoverage>;
export interface GuardrailInvocationMetrics {
  guardrailProcessingLatency?: number;
  usage?: GuardrailUsage;
  guardrailCoverage?: GuardrailCoverage;
}
export const GuardrailInvocationMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailProcessingLatency: S.optional(S.Number),
    usage: S.optional(GuardrailUsage),
    guardrailCoverage: S.optional(GuardrailCoverage),
  }),
).annotate({
  identifier: "GuardrailInvocationMetrics",
}) as any as S.Schema<GuardrailInvocationMetrics>;
export type GuardrailId = string;
export type GuardrailArn = string;
export type GuardrailOrigin =
  | "REQUEST"
  | "ACCOUNT_ENFORCED"
  | "ORGANIZATION_ENFORCED"
  | (string & {});
export const GuardrailOrigin = S.String;

export type GuardrailOriginList = GuardrailOrigin[];
export const GuardrailOriginList = /*@__PURE__*/ S.Array(GuardrailOrigin);
export type GuardrailOwnership = "SELF" | "CROSS_ACCOUNT" | (string & {});
export const GuardrailOwnership = S.String;

export interface AppliedGuardrailDetails {
  guardrailId?: string;
  guardrailVersion?: string;
  guardrailArn?: string;
  guardrailOrigin?: GuardrailOrigin[];
  guardrailOwnership?: GuardrailOwnership;
}
export const AppliedGuardrailDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailId: S.optional(S.String),
    guardrailVersion: S.optional(S.String),
    guardrailArn: S.optional(S.String),
    guardrailOrigin: S.optional(GuardrailOriginList),
    guardrailOwnership: S.optional(GuardrailOwnership),
  }),
).annotate({
  identifier: "AppliedGuardrailDetails",
}) as any as S.Schema<AppliedGuardrailDetails>;
export interface GuardrailAssessment {
  topicPolicy?: GuardrailTopicPolicyAssessment;
  contentPolicy?: GuardrailContentPolicyAssessment;
  wordPolicy?: GuardrailWordPolicyAssessment;
  sensitiveInformationPolicy?: GuardrailSensitiveInformationPolicyAssessment;
  contextualGroundingPolicy?: GuardrailContextualGroundingPolicyAssessment;
  automatedReasoningPolicy?: GuardrailAutomatedReasoningPolicyAssessment;
  invocationMetrics?: GuardrailInvocationMetrics;
  appliedGuardrailDetails?: AppliedGuardrailDetails;
}
export const GuardrailAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    topicPolicy: S.optional(GuardrailTopicPolicyAssessment),
    contentPolicy: S.optional(GuardrailContentPolicyAssessment),
    wordPolicy: S.optional(GuardrailWordPolicyAssessment),
    sensitiveInformationPolicy: S.optional(
      GuardrailSensitiveInformationPolicyAssessment,
    ),
    contextualGroundingPolicy: S.optional(
      GuardrailContextualGroundingPolicyAssessment,
    ),
    automatedReasoningPolicy: S.optional(
      GuardrailAutomatedReasoningPolicyAssessment,
    ),
    invocationMetrics: S.optional(GuardrailInvocationMetrics),
    appliedGuardrailDetails: S.optional(AppliedGuardrailDetails),
  }),
).annotate({
  identifier: "GuardrailAssessment",
}) as any as S.Schema<GuardrailAssessment>;
export type GuardrailAssessmentList = GuardrailAssessment[];
export const GuardrailAssessmentList =
  /*@__PURE__*/ S.Array(GuardrailAssessment);
export interface ApplyGuardrailResponse {
  usage: GuardrailUsage;
  action: GuardrailAction;
  actionReason?: string;
  outputs: GuardrailOutputContent[];
  assessments: GuardrailAssessment[];
  guardrailCoverage?: GuardrailCoverage;
}
export const ApplyGuardrailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usage: GuardrailUsage,
    action: GuardrailAction,
    actionReason: S.optional(S.String),
    outputs: GuardrailOutputContentList,
    assessments: GuardrailAssessmentList,
    guardrailCoverage: S.optional(GuardrailCoverage),
  }),
).annotate({
  identifier: "ApplyGuardrailResponse",
}) as any as S.Schema<ApplyGuardrailResponse>;
export type ConversationalModelId = string;
export type ConversationRole = "user" | "assistant" | "system" | (string & {});
export const ConversationRole = S.String;

export type ImageFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export const ImageFormat = S.String;

export type S3Uri = string;
export type AccountId = string;
export interface S3Location {
  uri: string;
  bucketOwner?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String, bucketOwner: S.optional(S.String) }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type ImageSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export const ImageSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
  S.Struct({ s3Location: S3Location }),
]);
export interface ErrorBlock {
  message?: string;
}
export const ErrorBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({ identifier: "ErrorBlock" }) as any as S.Schema<ErrorBlock>;
export interface ImageBlock {
  format: ImageFormat;
  source: ImageSource;
  error?: ErrorBlock;
}
export const ImageBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: ImageFormat,
    source: ImageSource,
    error: S.optional(ErrorBlock),
  }),
).annotate({ identifier: "ImageBlock" }) as any as S.Schema<ImageBlock>;
export type DocumentFormat =
  | "pdf"
  | "csv"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "html"
  | "txt"
  | "md"
  | (string & {});
export const DocumentFormat = S.String;

export type DocumentContentBlock = { text: string };
export const DocumentContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
]);
export type DocumentContentBlocks = DocumentContentBlock[];
export const DocumentContentBlocks =
  /*@__PURE__*/ S.Array(DocumentContentBlock);
export type DocumentSource =
  | { bytes: Uint8Array; s3Location?: never; text?: never; content?: never }
  | { bytes?: never; s3Location: S3Location; text?: never; content?: never }
  | { bytes?: never; s3Location?: never; text: string; content?: never }
  | {
      bytes?: never;
      s3Location?: never;
      text?: never;
      content: DocumentContentBlock[];
    };
export const DocumentSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
  S.Struct({ s3Location: S3Location }),
  S.Struct({ text: S.String }),
  S.Struct({ content: DocumentContentBlocks }),
]);
export interface CitationsConfig {
  enabled: boolean;
}
export const CitationsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean }),
).annotate({
  identifier: "CitationsConfig",
}) as any as S.Schema<CitationsConfig>;
export interface DocumentBlock {
  format?: DocumentFormat;
  name: string;
  source: DocumentSource;
  context?: string;
  citations?: CitationsConfig;
}
export const DocumentBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: S.optional(DocumentFormat),
    name: S.String,
    source: DocumentSource,
    context: S.optional(S.String),
    citations: S.optional(CitationsConfig),
  }),
).annotate({ identifier: "DocumentBlock" }) as any as S.Schema<DocumentBlock>;
export type VideoFormat =
  | "mkv"
  | "mov"
  | "mp4"
  | "webm"
  | "flv"
  | "mpeg"
  | "mpg"
  | "wmv"
  | "three_gp"
  | (string & {});
export const VideoFormat = S.String;

export type VideoSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export const VideoSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
  S.Struct({ s3Location: S3Location }),
]);
export interface VideoBlock {
  format: VideoFormat;
  source: VideoSource;
}
export const VideoBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: VideoFormat, source: VideoSource }),
).annotate({ identifier: "VideoBlock" }) as any as S.Schema<VideoBlock>;
export type AudioFormat =
  | "mp3"
  | "opus"
  | "wav"
  | "aac"
  | "flac"
  | "mp4"
  | "ogg"
  | "mkv"
  | "mka"
  | "x-aac"
  | "m4a"
  | "mpeg"
  | "mpga"
  | "pcm"
  | "webm"
  | (string & {});
export const AudioFormat = S.String;

export type AudioSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export const AudioSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
  S.Struct({ s3Location: S3Location }),
]);
export interface AudioBlock {
  format: AudioFormat;
  source: AudioSource;
  error?: ErrorBlock;
}
export const AudioBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: AudioFormat,
    source: AudioSource,
    error: S.optional(ErrorBlock),
  }),
).annotate({ identifier: "AudioBlock" }) as any as S.Schema<AudioBlock>;
export type ToolUseId = string;
export type ToolName = string;
export type ToolUseType = "server_tool_use" | (string & {});
export const ToolUseType = S.String;

export interface ToolUseBlock {
  toolUseId: string;
  name: string;
  input: any;
  type?: ToolUseType;
}
export const ToolUseBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolUseId: S.String,
    name: S.String,
    input: S.Any,
    type: S.optional(ToolUseType),
  }),
).annotate({ identifier: "ToolUseBlock" }) as any as S.Schema<ToolUseBlock>;
export interface SearchResultContentBlock {
  text: string;
}
export const SearchResultContentBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String }),
).annotate({
  identifier: "SearchResultContentBlock",
}) as any as S.Schema<SearchResultContentBlock>;
export type SearchResultContentBlocks = SearchResultContentBlock[];
export const SearchResultContentBlocks = /*@__PURE__*/ S.Array(
  SearchResultContentBlock,
);
export interface SearchResultBlock {
  source: string;
  title: string;
  content: SearchResultContentBlock[];
  citations?: CitationsConfig;
}
export const SearchResultBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.String,
    title: S.String,
    content: SearchResultContentBlocks,
    citations: S.optional(CitationsConfig),
  }),
).annotate({
  identifier: "SearchResultBlock",
}) as any as S.Schema<SearchResultBlock>;
export type ToolResultContentBlock =
  | {
      json: any;
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text: string;
      image?: never;
      document?: never;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image: ImageBlock;
      document?: never;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image?: never;
      document: DocumentBlock;
      video?: never;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image?: never;
      document?: never;
      video: VideoBlock;
      searchResult?: never;
    }
  | {
      json?: never;
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      searchResult: SearchResultBlock;
    };
export const ToolResultContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ json: S.Any }),
  S.Struct({ text: S.String }),
  S.Struct({ image: ImageBlock }),
  S.Struct({ document: DocumentBlock }),
  S.Struct({ video: VideoBlock }),
  S.Struct({ searchResult: SearchResultBlock }),
]);
export type ToolResultContentBlocks = ToolResultContentBlock[];
export const ToolResultContentBlocks = /*@__PURE__*/ S.Array(
  ToolResultContentBlock,
);
export type ToolResultStatus = "success" | "error" | (string & {});
export const ToolResultStatus = S.String;

export interface ToolResultBlock {
  toolUseId: string;
  content: ToolResultContentBlock[];
  status?: ToolResultStatus;
  type?: string;
}
export const ToolResultBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolUseId: S.String,
    content: ToolResultContentBlocks,
    status: S.optional(ToolResultStatus),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "ToolResultBlock",
}) as any as S.Schema<ToolResultBlock>;
export type GuardrailConverseContentQualifier =
  | "grounding_source"
  | "query"
  | "guard_content"
  | (string & {});
export const GuardrailConverseContentQualifier = S.String;

export type GuardrailConverseContentQualifierList =
  GuardrailConverseContentQualifier[];
export const GuardrailConverseContentQualifierList = /*@__PURE__*/ S.Array(
  GuardrailConverseContentQualifier,
);
export interface GuardrailConverseTextBlock {
  text: string;
  qualifiers?: GuardrailConverseContentQualifier[];
}
export const GuardrailConverseTextBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    text: S.String,
    qualifiers: S.optional(GuardrailConverseContentQualifierList),
  }),
).annotate({
  identifier: "GuardrailConverseTextBlock",
}) as any as S.Schema<GuardrailConverseTextBlock>;
export type GuardrailConverseImageFormat = "png" | "jpeg" | (string & {});
export const GuardrailConverseImageFormat = S.String;

export type GuardrailConverseImageSource = { bytes: Uint8Array };
export const GuardrailConverseImageSource = /*@__PURE__*/ S.Union([
  S.Struct({ bytes: T.Blob }),
]);
export interface GuardrailConverseImageBlock {
  format: GuardrailConverseImageFormat;
  source: GuardrailConverseImageSource;
}
export const GuardrailConverseImageBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    format: GuardrailConverseImageFormat,
    source: GuardrailConverseImageSource,
  }),
).annotate({
  identifier: "GuardrailConverseImageBlock",
}) as any as S.Schema<GuardrailConverseImageBlock>;
export type GuardrailConverseContentBlock =
  | { text: GuardrailConverseTextBlock; image?: never }
  | { text?: never; image: GuardrailConverseImageBlock };
export const GuardrailConverseContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: GuardrailConverseTextBlock }),
  S.Struct({ image: GuardrailConverseImageBlock }),
]);
export type CachePointType = "default" | (string & {});
export const CachePointType = S.String;

export type CacheTTL = "5m" | "1h" | (string & {});
export const CacheTTL = S.String;

export interface CachePointBlock {
  type: CachePointType;
  ttl?: CacheTTL;
}
export const CachePointBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: CachePointType, ttl: S.optional(CacheTTL) }),
).annotate({
  identifier: "CachePointBlock",
}) as any as S.Schema<CachePointBlock>;
export interface ReasoningTextBlock {
  text: string;
  signature?: string;
}
export const ReasoningTextBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String, signature: S.optional(S.String) }),
).annotate({
  identifier: "ReasoningTextBlock",
}) as any as S.Schema<ReasoningTextBlock>;
export type ReasoningContentBlock =
  | { reasoningText: ReasoningTextBlock; redactedContent?: never }
  | { reasoningText?: never; redactedContent: Uint8Array };
export const ReasoningContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ reasoningText: ReasoningTextBlock }),
  S.Struct({ redactedContent: T.Blob }),
]);
export type CitationGeneratedContent = { text: string };
export const CitationGeneratedContent = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
]);
export type CitationGeneratedContentList = CitationGeneratedContent[];
export const CitationGeneratedContentList = /*@__PURE__*/ S.Array(
  CitationGeneratedContent,
);
export type CitationSourceContent = { text: string };
export const CitationSourceContent = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
]);
export type CitationSourceContentList = CitationSourceContent[];
export const CitationSourceContentList = /*@__PURE__*/ S.Array(
  CitationSourceContent,
);
export interface WebLocation {
  url?: string;
  domain?: string;
}
export const WebLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ url: S.optional(S.String), domain: S.optional(S.String) }),
).annotate({ identifier: "WebLocation" }) as any as S.Schema<WebLocation>;
export interface DocumentCharLocation {
  documentIndex?: number;
  start?: number;
  end?: number;
}
export const DocumentCharLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentIndex: S.optional(S.Number),
    start: S.optional(S.Number),
    end: S.optional(S.Number),
  }),
).annotate({
  identifier: "DocumentCharLocation",
}) as any as S.Schema<DocumentCharLocation>;
export interface DocumentPageLocation {
  documentIndex?: number;
  start?: number;
  end?: number;
}
export const DocumentPageLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentIndex: S.optional(S.Number),
    start: S.optional(S.Number),
    end: S.optional(S.Number),
  }),
).annotate({
  identifier: "DocumentPageLocation",
}) as any as S.Schema<DocumentPageLocation>;
export interface DocumentChunkLocation {
  documentIndex?: number;
  start?: number;
  end?: number;
}
export const DocumentChunkLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentIndex: S.optional(S.Number),
    start: S.optional(S.Number),
    end: S.optional(S.Number),
  }),
).annotate({
  identifier: "DocumentChunkLocation",
}) as any as S.Schema<DocumentChunkLocation>;
export interface SearchResultLocation {
  searchResultIndex?: number;
  start?: number;
  end?: number;
}
export const SearchResultLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    searchResultIndex: S.optional(S.Number),
    start: S.optional(S.Number),
    end: S.optional(S.Number),
  }),
).annotate({
  identifier: "SearchResultLocation",
}) as any as S.Schema<SearchResultLocation>;
export type CitationLocation =
  | {
      web: WebLocation;
      documentChar?: never;
      documentPage?: never;
      documentChunk?: never;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar: DocumentCharLocation;
      documentPage?: never;
      documentChunk?: never;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar?: never;
      documentPage: DocumentPageLocation;
      documentChunk?: never;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar?: never;
      documentPage?: never;
      documentChunk: DocumentChunkLocation;
      searchResultLocation?: never;
    }
  | {
      web?: never;
      documentChar?: never;
      documentPage?: never;
      documentChunk?: never;
      searchResultLocation: SearchResultLocation;
    };
export const CitationLocation = /*@__PURE__*/ S.Union([
  S.Struct({ web: WebLocation }),
  S.Struct({ documentChar: DocumentCharLocation }),
  S.Struct({ documentPage: DocumentPageLocation }),
  S.Struct({ documentChunk: DocumentChunkLocation }),
  S.Struct({ searchResultLocation: SearchResultLocation }),
]);
export interface Citation {
  title?: string;
  source?: string;
  sourceContent?: CitationSourceContent[];
  location?: CitationLocation;
}
export const Citation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    source: S.optional(S.String),
    sourceContent: S.optional(CitationSourceContentList),
    location: S.optional(CitationLocation),
  }),
).annotate({ identifier: "Citation" }) as any as S.Schema<Citation>;
export type Citations = Citation[];
export const Citations = /*@__PURE__*/ S.Array(Citation);
export interface CitationsContentBlock {
  content?: CitationGeneratedContent[];
  citations?: Citation[];
}
export const CitationsContentBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: S.optional(CitationGeneratedContentList),
    citations: S.optional(Citations),
  }),
).annotate({
  identifier: "CitationsContentBlock",
}) as any as S.Schema<CitationsContentBlock>;
export interface ToolReference {
  type?: string;
  name?: string;
  serverName?: string;
}
export const ToolReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    name: S.optional(S.String),
    serverName: S.optional(S.String),
  }),
).annotate({ identifier: "ToolReference" }) as any as S.Schema<ToolReference>;
export interface ToolAdditionBlock {
  tool: ToolReference;
}
export const ToolAdditionBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tool: ToolReference }),
).annotate({
  identifier: "ToolAdditionBlock",
}) as any as S.Schema<ToolAdditionBlock>;
export interface ToolRemovalBlock {
  tool: ToolReference;
}
export const ToolRemovalBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tool: ToolReference }),
).annotate({
  identifier: "ToolRemovalBlock",
}) as any as S.Schema<ToolRemovalBlock>;
export type ContentBlock =
  | {
      text: string;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image: ImageBlock;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document: DocumentBlock;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video: VideoBlock;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio: AudioBlock;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse: ToolUseBlock;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult: ToolResultBlock;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent: GuardrailConverseContentBlock;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint: CachePointBlock;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent: ReasoningContentBlock;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent: CitationsContentBlock;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult: SearchResultBlock;
      toolAddition?: never;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition: ToolAdditionBlock;
      toolRemoval?: never;
    }
  | {
      text?: never;
      image?: never;
      document?: never;
      video?: never;
      audio?: never;
      toolUse?: never;
      toolResult?: never;
      guardContent?: never;
      cachePoint?: never;
      reasoningContent?: never;
      citationsContent?: never;
      searchResult?: never;
      toolAddition?: never;
      toolRemoval: ToolRemovalBlock;
    };
export const ContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ image: ImageBlock }),
  S.Struct({ document: DocumentBlock }),
  S.Struct({ video: VideoBlock }),
  S.Struct({ audio: AudioBlock }),
  S.Struct({ toolUse: ToolUseBlock }),
  S.Struct({ toolResult: ToolResultBlock }),
  S.Struct({ guardContent: GuardrailConverseContentBlock }),
  S.Struct({ cachePoint: CachePointBlock }),
  S.Struct({ reasoningContent: ReasoningContentBlock }),
  S.Struct({ citationsContent: CitationsContentBlock }),
  S.Struct({ searchResult: SearchResultBlock }),
  S.Struct({ toolAddition: ToolAdditionBlock }),
  S.Struct({ toolRemoval: ToolRemovalBlock }),
]);
export type ContentBlocks = ContentBlock[];
export const ContentBlocks = /*@__PURE__*/ S.Array(ContentBlock);
export interface Message {
  role: ConversationRole;
  content: ContentBlock[];
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: ConversationRole, content: ContentBlocks }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type Messages = Message[];
export const Messages = /*@__PURE__*/ S.Array(Message);
export type NonEmptyString = string;
export type SystemContentBlock =
  | { text: string; guardContent?: never; cachePoint?: never }
  | {
      text?: never;
      guardContent: GuardrailConverseContentBlock;
      cachePoint?: never;
    }
  | { text?: never; guardContent?: never; cachePoint: CachePointBlock };
export const SystemContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ guardContent: GuardrailConverseContentBlock }),
  S.Struct({ cachePoint: CachePointBlock }),
]);
export type SystemContentBlocks = SystemContentBlock[];
export const SystemContentBlocks = /*@__PURE__*/ S.Array(SystemContentBlock);
export type NonEmptyStringList = string[];
export const NonEmptyStringList = /*@__PURE__*/ S.Array(S.String);
export interface InferenceConfiguration {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}
export const InferenceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxTokens: S.optional(S.Number),
    temperature: S.optional(S.Number),
    topP: S.optional(S.Number),
    stopSequences: S.optional(NonEmptyStringList),
  }),
).annotate({
  identifier: "InferenceConfiguration",
}) as any as S.Schema<InferenceConfiguration>;
export type ToolInputSchema = { json: any };
export const ToolInputSchema = /*@__PURE__*/ S.Union([
  S.Struct({ json: S.Any }),
]);
export interface ToolSpecification {
  name: string;
  description?: string;
  inputSchema: ToolInputSchema;
  strict?: boolean;
}
export const ToolSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    inputSchema: ToolInputSchema,
    strict: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ToolSpecification",
}) as any as S.Schema<ToolSpecification>;
export interface SystemTool {
  name: string;
}
export const SystemTool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "SystemTool" }) as any as S.Schema<SystemTool>;
export type Tool =
  | { toolSpec: ToolSpecification; systemTool?: never; cachePoint?: never }
  | { toolSpec?: never; systemTool: SystemTool; cachePoint?: never }
  | { toolSpec?: never; systemTool?: never; cachePoint: CachePointBlock };
export const Tool = /*@__PURE__*/ S.Union([
  S.Struct({ toolSpec: ToolSpecification }),
  S.Struct({ systemTool: SystemTool }),
  S.Struct({ cachePoint: CachePointBlock }),
]);
export type Tools = Tool[];
export const Tools = /*@__PURE__*/ S.Array(Tool);
export interface AutoToolChoice {}
export const AutoToolChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "AutoToolChoice" }) as any as S.Schema<AutoToolChoice>;
export interface AnyToolChoice {}
export const AnyToolChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "AnyToolChoice" }) as any as S.Schema<AnyToolChoice>;
export interface SpecificToolChoice {
  name: string;
}
export const SpecificToolChoice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({
  identifier: "SpecificToolChoice",
}) as any as S.Schema<SpecificToolChoice>;
export type ToolChoice =
  | { auto: AutoToolChoice; any?: never; tool?: never }
  | { auto?: never; any: AnyToolChoice; tool?: never }
  | { auto?: never; any?: never; tool: SpecificToolChoice };
export const ToolChoice = /*@__PURE__*/ S.Union([
  S.Struct({ auto: AutoToolChoice }),
  S.Struct({ any: AnyToolChoice }),
  S.Struct({ tool: SpecificToolChoice }),
]);
export interface ToolConfiguration {
  tools: Tool[];
  toolChoice?: ToolChoice;
}
export const ToolConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tools: Tools, toolChoice: S.optional(ToolChoice) }),
).annotate({
  identifier: "ToolConfiguration",
}) as any as S.Schema<ToolConfiguration>;
export type GuardrailTrace =
  | "enabled"
  | "disabled"
  | "enabled_full"
  | (string & {});
export const GuardrailTrace = S.String;

export interface GuardrailConfiguration {
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  trace?: GuardrailTrace;
}
export const GuardrailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.optional(S.String),
    guardrailVersion: S.optional(S.String),
    trace: S.optional(GuardrailTrace),
  }),
).annotate({
  identifier: "GuardrailConfiguration",
}) as any as S.Schema<GuardrailConfiguration>;
export type PromptVariableValues = { text: string };
export const PromptVariableValues = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
]);
export type PromptVariableMap = {
  [key: string]: PromptVariableValues | undefined;
};
export const PromptVariableMap = /*@__PURE__*/ S.Record(
  S.String,
  PromptVariableValues.pipe(S.optional),
);
export type AdditionalModelResponseFieldPaths = string[];
export const AdditionalModelResponseFieldPaths = /*@__PURE__*/ S.Array(
  S.String,
);
export type RequestMetadata = { [key: string]: string | undefined };
export const RequestMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export const PerformanceConfigLatency = S.String;

export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export const PerformanceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latency: S.optional(PerformanceConfigLatency) }),
).annotate({
  identifier: "PerformanceConfiguration",
}) as any as S.Schema<PerformanceConfiguration>;
export type ServiceTierType =
  | "priority"
  | "default"
  | "flex"
  | "reserved"
  | (string & {});
export const ServiceTierType = S.String;

export interface ServiceTier {
  type: ServiceTierType;
}
export const ServiceTier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: ServiceTierType }),
).annotate({ identifier: "ServiceTier" }) as any as S.Schema<ServiceTier>;
export type OutputFormatType = "json_schema" | (string & {});
export const OutputFormatType = S.String;

export interface JsonSchemaDefinition {
  schema: string;
  name?: string;
  description?: string;
}
export const JsonSchemaDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    schema: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "JsonSchemaDefinition",
}) as any as S.Schema<JsonSchemaDefinition>;
export type OutputFormatStructure = { jsonSchema: JsonSchemaDefinition };
export const OutputFormatStructure = /*@__PURE__*/ S.Union([
  S.Struct({ jsonSchema: JsonSchemaDefinition }),
]);
export interface OutputFormat {
  type: OutputFormatType;
  structure: OutputFormatStructure;
}
export const OutputFormat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: OutputFormatType, structure: OutputFormatStructure }),
).annotate({ identifier: "OutputFormat" }) as any as S.Schema<OutputFormat>;
export interface OutputConfig {
  textFormat?: OutputFormat;
  effort?: string;
}
export const OutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    textFormat: S.optional(OutputFormat),
    effort: S.optional(S.String),
  }),
).annotate({ identifier: "OutputConfig" }) as any as S.Schema<OutputConfig>;
export interface ConverseRequest {
  modelId: string;
  messages?: Message[];
  system?: SystemContentBlock[];
  inferenceConfig?: InferenceConfiguration;
  toolConfig?: ToolConfiguration;
  guardrailConfig?: GuardrailConfiguration;
  additionalModelRequestFields?: any;
  promptVariables?: { [key: string]: PromptVariableValues | undefined };
  additionalModelResponseFieldPaths?: string[];
  requestMetadata?: { [key: string]: string | undefined };
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
  outputConfig?: OutputConfig;
}
export const ConverseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String.pipe(T.HttpLabel("modelId")),
    messages: S.optional(Messages),
    system: S.optional(SystemContentBlocks),
    inferenceConfig: S.optional(InferenceConfiguration),
    toolConfig: S.optional(ToolConfiguration),
    guardrailConfig: S.optional(GuardrailConfiguration),
    additionalModelRequestFields: S.optional(S.Any),
    promptVariables: S.optional(PromptVariableMap),
    additionalModelResponseFieldPaths: S.optional(
      AdditionalModelResponseFieldPaths,
    ),
    requestMetadata: S.optional(RequestMetadata),
    performanceConfig: S.optional(PerformanceConfiguration),
    serviceTier: S.optional(ServiceTier),
    outputConfig: S.optional(OutputConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model/{modelId}/converse" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConverseRequest",
}) as any as S.Schema<ConverseRequest>;
export type ConverseOutput = { message: Message };
export const ConverseOutput = /*@__PURE__*/ S.Union([
  S.Struct({ message: Message }),
]);
export type StopReason =
  | "end_turn"
  | "tool_use"
  | "max_tokens"
  | "stop_sequence"
  | "guardrail_intervened"
  | "content_filtered"
  | "malformed_model_output"
  | "malformed_tool_use"
  | "model_context_window_exceeded"
  | (string & {});
export const StopReason = S.String;

export interface CacheDetail {
  ttl: CacheTTL;
  inputTokens: number;
}
export const CacheDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ttl: CacheTTL, inputTokens: S.Number }),
).annotate({ identifier: "CacheDetail" }) as any as S.Schema<CacheDetail>;
export type CacheDetailsList = CacheDetail[];
export const CacheDetailsList = /*@__PURE__*/ S.Array(CacheDetail);
export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadInputTokens?: number;
  cacheWriteInputTokens?: number;
  cacheDetails?: CacheDetail[];
}
export const TokenUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputTokens: S.Number,
    outputTokens: S.Number,
    totalTokens: S.Number,
    cacheReadInputTokens: S.optional(S.Number),
    cacheWriteInputTokens: S.optional(S.Number),
    cacheDetails: S.optional(CacheDetailsList),
  }),
).annotate({ identifier: "TokenUsage" }) as any as S.Schema<TokenUsage>;
export interface ConverseMetrics {
  latencyMs: number;
}
export const ConverseMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latencyMs: S.Number }),
).annotate({
  identifier: "ConverseMetrics",
}) as any as S.Schema<ConverseMetrics>;
export type ModelOutputs = string[];
export const ModelOutputs = /*@__PURE__*/ S.Array(S.String);
export type GuardrailAssessmentMap = {
  [key: string]: GuardrailAssessment | undefined;
};
export const GuardrailAssessmentMap = /*@__PURE__*/ S.Record(
  S.String,
  GuardrailAssessment.pipe(S.optional),
);
export type GuardrailAssessmentListMap = {
  [key: string]: GuardrailAssessment[] | undefined;
};
export const GuardrailAssessmentListMap = /*@__PURE__*/ S.Record(
  S.String,
  GuardrailAssessmentList.pipe(S.optional),
);
export interface GuardrailTraceAssessment {
  modelOutput?: string[];
  inputAssessment?: { [key: string]: GuardrailAssessment | undefined };
  outputAssessments?: { [key: string]: GuardrailAssessment[] | undefined };
  actionReason?: string;
}
export const GuardrailTraceAssessment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelOutput: S.optional(ModelOutputs),
    inputAssessment: S.optional(GuardrailAssessmentMap),
    outputAssessments: S.optional(GuardrailAssessmentListMap),
    actionReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GuardrailTraceAssessment",
}) as any as S.Schema<GuardrailTraceAssessment>;
export type InvokedModelId = string;
export interface PromptRouterTrace {
  invokedModelId?: string;
}
export const PromptRouterTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invokedModelId: S.optional(S.String) }),
).annotate({
  identifier: "PromptRouterTrace",
}) as any as S.Schema<PromptRouterTrace>;
export interface ConverseTrace {
  guardrail?: GuardrailTraceAssessment;
  promptRouter?: PromptRouterTrace;
}
export const ConverseTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrail: S.optional(GuardrailTraceAssessment),
    promptRouter: S.optional(PromptRouterTrace),
  }),
).annotate({ identifier: "ConverseTrace" }) as any as S.Schema<ConverseTrace>;
export interface ConverseResponse {
  output: ConverseOutput;
  stopReason: StopReason;
  usage: TokenUsage;
  metrics: ConverseMetrics;
  additionalModelResponseFields?: any;
  trace?: ConverseTrace;
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
}
export const ConverseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    output: ConverseOutput,
    stopReason: StopReason,
    usage: TokenUsage,
    metrics: ConverseMetrics,
    additionalModelResponseFields: S.optional(S.Any),
    trace: S.optional(ConverseTrace),
    performanceConfig: S.optional(PerformanceConfiguration),
    serviceTier: S.optional(ServiceTier),
  }),
).annotate({
  identifier: "ConverseResponse",
}) as any as S.Schema<ConverseResponse>;
export type GuardrailStreamProcessingMode = "sync" | "async" | (string & {});
export const GuardrailStreamProcessingMode = S.String;

export interface GuardrailStreamConfiguration {
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  trace?: GuardrailTrace;
  streamProcessingMode?: GuardrailStreamProcessingMode;
}
export const GuardrailStreamConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrailIdentifier: S.optional(S.String),
    guardrailVersion: S.optional(S.String),
    trace: S.optional(GuardrailTrace),
    streamProcessingMode: S.optional(GuardrailStreamProcessingMode),
  }),
).annotate({
  identifier: "GuardrailStreamConfiguration",
}) as any as S.Schema<GuardrailStreamConfiguration>;
export interface ConverseStreamRequest {
  modelId: string;
  messages?: Message[];
  system?: SystemContentBlock[];
  inferenceConfig?: InferenceConfiguration;
  toolConfig?: ToolConfiguration;
  guardrailConfig?: GuardrailStreamConfiguration;
  additionalModelRequestFields?: any;
  promptVariables?: { [key: string]: PromptVariableValues | undefined };
  additionalModelResponseFieldPaths?: string[];
  requestMetadata?: { [key: string]: string | undefined };
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
  outputConfig?: OutputConfig;
}
export const ConverseStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String.pipe(T.HttpLabel("modelId")),
    messages: S.optional(Messages),
    system: S.optional(SystemContentBlocks),
    inferenceConfig: S.optional(InferenceConfiguration),
    toolConfig: S.optional(ToolConfiguration),
    guardrailConfig: S.optional(GuardrailStreamConfiguration),
    additionalModelRequestFields: S.optional(S.Any),
    promptVariables: S.optional(PromptVariableMap),
    additionalModelResponseFieldPaths: S.optional(
      AdditionalModelResponseFieldPaths,
    ),
    requestMetadata: S.optional(RequestMetadata),
    performanceConfig: S.optional(PerformanceConfiguration),
    serviceTier: S.optional(ServiceTier),
    outputConfig: S.optional(OutputConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model/{modelId}/converse-stream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConverseStreamRequest",
}) as any as S.Schema<ConverseStreamRequest>;
export interface MessageStartEvent {
  role: ConversationRole;
}
export const MessageStartEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: ConversationRole }),
).annotate({
  identifier: "MessageStartEvent",
}) as any as S.Schema<MessageStartEvent>;
export interface ToolUseBlockStart {
  toolUseId: string;
  name: string;
  type?: ToolUseType;
}
export const ToolUseBlockStart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolUseId: S.String,
    name: S.String,
    type: S.optional(ToolUseType),
  }),
).annotate({
  identifier: "ToolUseBlockStart",
}) as any as S.Schema<ToolUseBlockStart>;
export interface ToolResultBlockStart {
  toolUseId: string;
  type?: string;
  status?: ToolResultStatus;
}
export const ToolResultBlockStart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    toolUseId: S.String,
    type: S.optional(S.String),
    status: S.optional(ToolResultStatus),
  }),
).annotate({
  identifier: "ToolResultBlockStart",
}) as any as S.Schema<ToolResultBlockStart>;
export interface ImageBlockStart {
  format: ImageFormat;
}
export const ImageBlockStart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ format: ImageFormat }),
).annotate({
  identifier: "ImageBlockStart",
}) as any as S.Schema<ImageBlockStart>;
export type ContentBlockStart =
  | { toolUse: ToolUseBlockStart; toolResult?: never; image?: never }
  | { toolUse?: never; toolResult: ToolResultBlockStart; image?: never }
  | { toolUse?: never; toolResult?: never; image: ImageBlockStart };
export const ContentBlockStart = /*@__PURE__*/ S.Union([
  S.Struct({ toolUse: ToolUseBlockStart }),
  S.Struct({ toolResult: ToolResultBlockStart }),
  S.Struct({ image: ImageBlockStart }),
]);
export type NonNegativeInteger = number;
export interface ContentBlockStartEvent {
  start: ContentBlockStart;
  contentBlockIndex: number;
}
export const ContentBlockStartEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ start: ContentBlockStart, contentBlockIndex: S.Number }),
).annotate({
  identifier: "ContentBlockStartEvent",
}) as any as S.Schema<ContentBlockStartEvent>;
export interface ToolUseBlockDelta {
  input: string;
}
export const ToolUseBlockDelta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ input: S.String }),
).annotate({
  identifier: "ToolUseBlockDelta",
}) as any as S.Schema<ToolUseBlockDelta>;
export type ToolResultBlockDelta =
  | { text: string; json?: never }
  | { text?: never; json: any };
export const ToolResultBlockDelta = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ json: S.Any }),
]);
export type ToolResultBlocksDelta = ToolResultBlockDelta[];
export const ToolResultBlocksDelta =
  /*@__PURE__*/ S.Array(ToolResultBlockDelta);
export type ReasoningContentBlockDelta =
  | { text: string; redactedContent?: never; signature?: never }
  | { text?: never; redactedContent: Uint8Array; signature?: never }
  | { text?: never; redactedContent?: never; signature: string };
export const ReasoningContentBlockDelta = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ redactedContent: T.Blob }),
  S.Struct({ signature: S.String }),
]);
export interface CitationSourceContentDelta {
  text?: string;
}
export const CitationSourceContentDelta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.optional(S.String) }),
).annotate({
  identifier: "CitationSourceContentDelta",
}) as any as S.Schema<CitationSourceContentDelta>;
export type CitationSourceContentListDelta = CitationSourceContentDelta[];
export const CitationSourceContentListDelta = /*@__PURE__*/ S.Array(
  CitationSourceContentDelta,
);
export interface CitationsDelta {
  title?: string;
  source?: string;
  sourceContent?: CitationSourceContentDelta[];
  location?: CitationLocation;
}
export const CitationsDelta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    source: S.optional(S.String),
    sourceContent: S.optional(CitationSourceContentListDelta),
    location: S.optional(CitationLocation),
  }),
).annotate({ identifier: "CitationsDelta" }) as any as S.Schema<CitationsDelta>;
export interface ImageBlockDelta {
  source?: ImageSource;
  error?: ErrorBlock;
}
export const ImageBlockDelta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(ImageSource), error: S.optional(ErrorBlock) }),
).annotate({
  identifier: "ImageBlockDelta",
}) as any as S.Schema<ImageBlockDelta>;
export type ContentBlockDelta =
  | {
      text: string;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse: ToolUseBlockDelta;
      toolResult?: never;
      reasoningContent?: never;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: ToolResultBlockDelta[];
      reasoningContent?: never;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent: ReasoningContentBlockDelta;
      citation?: never;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      citation: CitationsDelta;
      image?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      citation?: never;
      image: ImageBlockDelta;
    };
export const ContentBlockDelta = /*@__PURE__*/ S.Union([
  S.Struct({ text: S.String }),
  S.Struct({ toolUse: ToolUseBlockDelta }),
  S.Struct({ toolResult: ToolResultBlocksDelta }),
  S.Struct({ reasoningContent: ReasoningContentBlockDelta }),
  S.Struct({ citation: CitationsDelta }),
  S.Struct({ image: ImageBlockDelta }),
]);
export interface ContentBlockDeltaEvent {
  delta: ContentBlockDelta;
  contentBlockIndex: number;
}
export const ContentBlockDeltaEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ delta: ContentBlockDelta, contentBlockIndex: S.Number }),
).annotate({
  identifier: "ContentBlockDeltaEvent",
}) as any as S.Schema<ContentBlockDeltaEvent>;
export interface ContentBlockStopEvent {
  contentBlockIndex: number;
}
export const ContentBlockStopEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contentBlockIndex: S.Number }),
).annotate({
  identifier: "ContentBlockStopEvent",
}) as any as S.Schema<ContentBlockStopEvent>;
export interface MessageStopEvent {
  stopReason: StopReason;
  additionalModelResponseFields?: any;
}
export const MessageStopEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stopReason: StopReason,
    additionalModelResponseFields: S.optional(S.Any),
  }),
).annotate({
  identifier: "MessageStopEvent",
}) as any as S.Schema<MessageStopEvent>;
export interface ConverseStreamMetrics {
  latencyMs: number;
}
export const ConverseStreamMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ latencyMs: S.Number }),
).annotate({
  identifier: "ConverseStreamMetrics",
}) as any as S.Schema<ConverseStreamMetrics>;
export interface ConverseStreamTrace {
  guardrail?: GuardrailTraceAssessment;
  promptRouter?: PromptRouterTrace;
}
export const ConverseStreamTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    guardrail: S.optional(GuardrailTraceAssessment),
    promptRouter: S.optional(PromptRouterTrace),
  }),
).annotate({
  identifier: "ConverseStreamTrace",
}) as any as S.Schema<ConverseStreamTrace>;
export interface ConverseStreamMetadataEvent {
  usage: TokenUsage;
  metrics: ConverseStreamMetrics;
  trace?: ConverseStreamTrace;
  performanceConfig?: PerformanceConfiguration;
  serviceTier?: ServiceTier;
}
export const ConverseStreamMetadataEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    usage: TokenUsage,
    metrics: ConverseStreamMetrics,
    trace: S.optional(ConverseStreamTrace),
    performanceConfig: S.optional(PerformanceConfiguration),
    serviceTier: S.optional(ServiceTier),
  }),
).annotate({
  identifier: "ConverseStreamMetadataEvent",
}) as any as S.Schema<ConverseStreamMetadataEvent>;
export type NonBlankString = string;
export type StatusCode = number;
export type ConverseStreamOutput =
  | {
      messageStart: MessageStartEvent;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart: ContentBlockStartEvent;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta: ContentBlockDeltaEvent;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop: ContentBlockStopEvent;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop: MessageStopEvent;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata: ConverseStreamMetadataEvent;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException: InternalServerException;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException: ModelStreamErrorException;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException: ValidationException;
      throttlingException?: never;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException: ThrottlingException;
      serviceUnavailableException?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      serviceUnavailableException: ServiceUnavailableException;
    };
export const ConverseStreamOutput = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ messageStart: MessageStartEvent }),
    S.Struct({ contentBlockStart: ContentBlockStartEvent }),
    S.Struct({ contentBlockDelta: ContentBlockDeltaEvent }),
    S.Struct({ contentBlockStop: ContentBlockStopEvent }),
    S.Struct({ messageStop: MessageStopEvent }),
    S.Struct({ metadata: ConverseStreamMetadataEvent }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      modelStreamErrorException: S.suspend(
        () => ModelStreamErrorException,
      ).annotate({ identifier: "ModelStreamErrorException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      serviceUnavailableException: S.suspend(
        () => ServiceUnavailableException,
      ).annotate({ identifier: "ServiceUnavailableException" }),
    }),
  ]),
) as any as S.Schema<stream.Stream<ConverseStreamOutput, Error, never>>;
export interface ConverseStreamResponse {
  stream?: stream.Stream<ConverseStreamOutput, Error, never>;
}
export const ConverseStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stream: S.optional(ConverseStreamOutput).pipe(T.HttpPayload()) }),
).annotate({
  identifier: "ConverseStreamResponse",
}) as any as S.Schema<ConverseStreamResponse>;
export type FoundationModelVersionIdentifier = string;
export type Body = Uint8Array | redacted.Redacted<Uint8Array>;
export interface InvokeModelTokensRequest {
  body: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const InvokeModelTokensRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ body: SensitiveBlob }),
).annotate({
  identifier: "InvokeModelTokensRequest",
}) as any as S.Schema<InvokeModelTokensRequest>;
export interface ConverseTokensRequest {
  messages?: Message[];
  system?: SystemContentBlock[];
  toolConfig?: ToolConfiguration;
  additionalModelRequestFields?: any;
}
export const ConverseTokensRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messages: S.optional(Messages),
    system: S.optional(SystemContentBlocks),
    toolConfig: S.optional(ToolConfiguration),
    additionalModelRequestFields: S.optional(S.Any),
  }),
).annotate({
  identifier: "ConverseTokensRequest",
}) as any as S.Schema<ConverseTokensRequest>;
export type CountTokensInput =
  | { invokeModel: InvokeModelTokensRequest; converse?: never }
  | { invokeModel?: never; converse: ConverseTokensRequest };
export const CountTokensInput = /*@__PURE__*/ S.Union([
  S.Struct({ invokeModel: InvokeModelTokensRequest }),
  S.Struct({ converse: ConverseTokensRequest }),
]);
export interface CountTokensRequest {
  modelId: string;
  input: CountTokensInput;
}
export const CountTokensRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelId: S.String.pipe(T.HttpLabel("modelId")),
    input: CountTokensInput,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model/{modelId}/count-tokens" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CountTokensRequest",
}) as any as S.Schema<CountTokensRequest>;
export interface CountTokensResponse {
  inputTokens: number;
}
export const CountTokensResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inputTokens: S.Number }),
).annotate({
  identifier: "CountTokensResponse",
}) as any as S.Schema<CountTokensResponse>;
export type InvocationArn = string;
export interface GetAsyncInvokeRequest {
  invocationArn: string;
}
export const GetAsyncInvokeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invocationArn: S.String.pipe(T.HttpLabel("invocationArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/async-invoke/{invocationArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAsyncInvokeRequest",
}) as any as S.Schema<GetAsyncInvokeRequest>;
export type AsyncInvokeArn = string;
export type AsyncInvokeIdempotencyToken = string;
export type AsyncInvokeStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export const AsyncInvokeStatus = S.String;

export type AsyncInvokeMessage = string | redacted.Redacted<string>;
export type KmsKeyId = string;
export interface AsyncInvokeS3OutputDataConfig {
  s3Uri: string;
  kmsKeyId?: string;
  bucketOwner?: string;
}
export const AsyncInvokeS3OutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.String,
    kmsKeyId: S.optional(S.String),
    bucketOwner: S.optional(S.String),
  }),
).annotate({
  identifier: "AsyncInvokeS3OutputDataConfig",
}) as any as S.Schema<AsyncInvokeS3OutputDataConfig>;
export type AsyncInvokeOutputDataConfig = {
  s3OutputDataConfig: AsyncInvokeS3OutputDataConfig;
};
export const AsyncInvokeOutputDataConfig = /*@__PURE__*/ S.Union([
  S.Struct({ s3OutputDataConfig: AsyncInvokeS3OutputDataConfig }),
]);
export interface GetAsyncInvokeResponse {
  invocationArn: string;
  modelArn: string;
  clientRequestToken?: string;
  status: AsyncInvokeStatus;
  failureMessage?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  outputDataConfig: AsyncInvokeOutputDataConfig;
}
export const GetAsyncInvokeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationArn: S.String,
    modelArn: S.String,
    clientRequestToken: S.optional(S.String),
    status: AsyncInvokeStatus,
    failureMessage: S.optional(SensitiveString),
    submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    outputDataConfig: AsyncInvokeOutputDataConfig,
  }),
).annotate({
  identifier: "GetAsyncInvokeResponse",
}) as any as S.Schema<GetAsyncInvokeResponse>;
export type GuardrailChecksRole =
  | "user"
  | "assistant"
  | "system"
  | (string & {});
export const GuardrailChecksRole = S.String;

export type GuardrailChecksTextContent = string | redacted.Redacted<string>;
export type GuardrailChecksContentBlock = {
  text: string | redacted.Redacted<string>;
};
export const GuardrailChecksContentBlock = /*@__PURE__*/ S.Union([
  S.Struct({ text: SensitiveString }),
]);
export type GuardrailChecksContentBlockList = GuardrailChecksContentBlock[];
export const GuardrailChecksContentBlockList = /*@__PURE__*/ S.Array(
  GuardrailChecksContentBlock,
);
export interface GuardrailChecksMessage {
  role: GuardrailChecksRole;
  content: GuardrailChecksContentBlock[];
}
export const GuardrailChecksMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    role: GuardrailChecksRole,
    content: GuardrailChecksContentBlockList,
  }),
).annotate({
  identifier: "GuardrailChecksMessage",
}) as any as S.Schema<GuardrailChecksMessage>;
export type GuardrailChecksMessageList = GuardrailChecksMessage[];
export const GuardrailChecksMessageList = /*@__PURE__*/ S.Array(
  GuardrailChecksMessage,
);
export type GuardrailChecksContentFilterCategory =
  | "VIOLENCE"
  | "HATE"
  | "SEXUAL"
  | "MISCONDUCT"
  | "INSULTS"
  | (string & {});
export const GuardrailChecksContentFilterCategory = S.String;

export interface GuardrailChecksContentFilterCategoryConfig {
  category: GuardrailChecksContentFilterCategory;
}
export const GuardrailChecksContentFilterCategoryConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ category: GuardrailChecksContentFilterCategory }),
  ).annotate({
    identifier: "GuardrailChecksContentFilterCategoryConfig",
  }) as any as S.Schema<GuardrailChecksContentFilterCategoryConfig>;
export type GuardrailChecksContentFilterCategoryConfigList =
  GuardrailChecksContentFilterCategoryConfig[];
export const GuardrailChecksContentFilterCategoryConfigList =
  /*@__PURE__*/ S.Array(GuardrailChecksContentFilterCategoryConfig);
export interface GuardrailChecksContentFilterConfig {
  categories: GuardrailChecksContentFilterCategoryConfig[];
}
export const GuardrailChecksContentFilterConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ categories: GuardrailChecksContentFilterCategoryConfigList }),
).annotate({
  identifier: "GuardrailChecksContentFilterConfig",
}) as any as S.Schema<GuardrailChecksContentFilterConfig>;
export type GuardrailChecksPromptAttackCategory =
  | "JAILBREAK"
  | "PROMPT_INJECTION"
  | "PROMPT_LEAKAGE"
  | (string & {});
export const GuardrailChecksPromptAttackCategory = S.String;

export interface GuardrailChecksPromptAttackCategoryConfig {
  category: GuardrailChecksPromptAttackCategory;
}
export const GuardrailChecksPromptAttackCategoryConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ category: GuardrailChecksPromptAttackCategory }),
  ).annotate({
    identifier: "GuardrailChecksPromptAttackCategoryConfig",
  }) as any as S.Schema<GuardrailChecksPromptAttackCategoryConfig>;
export type GuardrailChecksPromptAttackCategoryConfigList =
  GuardrailChecksPromptAttackCategoryConfig[];
export const GuardrailChecksPromptAttackCategoryConfigList =
  /*@__PURE__*/ S.Array(GuardrailChecksPromptAttackCategoryConfig);
export interface GuardrailChecksPromptAttackConfig {
  categories: GuardrailChecksPromptAttackCategoryConfig[];
}
export const GuardrailChecksPromptAttackConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ categories: GuardrailChecksPromptAttackCategoryConfigList }),
).annotate({
  identifier: "GuardrailChecksPromptAttackConfig",
}) as any as S.Schema<GuardrailChecksPromptAttackConfig>;
export type GuardrailChecksSensitiveInformationEntityType =
  | "ADDRESS"
  | "AGE"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "DRIVER_ID"
  | "EMAIL"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "IP_ADDRESS"
  | "LICENSE_PLATE"
  | "MAC_ADDRESS"
  | "NAME"
  | "PASSWORD"
  | "PHONE"
  | "PIN"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "URL"
  | "USERNAME"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | (string & {});
export const GuardrailChecksSensitiveInformationEntityType = S.String;

export interface GuardrailChecksSensitiveInformationEntityConfig {
  type: GuardrailChecksSensitiveInformationEntityType;
}
export const GuardrailChecksSensitiveInformationEntityConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ type: GuardrailChecksSensitiveInformationEntityType }),
  ).annotate({
    identifier: "GuardrailChecksSensitiveInformationEntityConfig",
  }) as any as S.Schema<GuardrailChecksSensitiveInformationEntityConfig>;
export type GuardrailChecksSensitiveInformationEntityConfigList =
  GuardrailChecksSensitiveInformationEntityConfig[];
export const GuardrailChecksSensitiveInformationEntityConfigList =
  /*@__PURE__*/ S.Array(GuardrailChecksSensitiveInformationEntityConfig);
export interface GuardrailChecksSensitiveInformationConfig {
  entities: GuardrailChecksSensitiveInformationEntityConfig[];
}
export const GuardrailChecksSensitiveInformationConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ entities: GuardrailChecksSensitiveInformationEntityConfigList }),
  ).annotate({
    identifier: "GuardrailChecksSensitiveInformationConfig",
  }) as any as S.Schema<GuardrailChecksSensitiveInformationConfig>;
export interface GuardrailChecksConfig {
  contentFilter?: GuardrailChecksContentFilterConfig;
  promptAttack?: GuardrailChecksPromptAttackConfig;
  sensitiveInformation?: GuardrailChecksSensitiveInformationConfig;
}
export const GuardrailChecksConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentFilter: S.optional(GuardrailChecksContentFilterConfig),
    promptAttack: S.optional(GuardrailChecksPromptAttackConfig),
    sensitiveInformation: S.optional(GuardrailChecksSensitiveInformationConfig),
  }),
).annotate({
  identifier: "GuardrailChecksConfig",
}) as any as S.Schema<GuardrailChecksConfig>;
export interface InvokeGuardrailChecksRequest {
  messages: GuardrailChecksMessage[];
  checks: GuardrailChecksConfig;
}
export const InvokeGuardrailChecksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messages: GuardrailChecksMessageList,
    checks: GuardrailChecksConfig,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/guardrail-checks/invoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeGuardrailChecksRequest",
}) as any as S.Schema<InvokeGuardrailChecksRequest>;
export interface GuardrailChecksContentFilterResultEntry {
  category: GuardrailChecksContentFilterCategory;
  severityScore: number;
}
export const GuardrailChecksContentFilterResultEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      category: GuardrailChecksContentFilterCategory,
      severityScore: S.Number,
    }),
).annotate({
  identifier: "GuardrailChecksContentFilterResultEntry",
}) as any as S.Schema<GuardrailChecksContentFilterResultEntry>;
export type GuardrailChecksContentFilterResultList =
  GuardrailChecksContentFilterResultEntry[];
export const GuardrailChecksContentFilterResultList = /*@__PURE__*/ S.Array(
  GuardrailChecksContentFilterResultEntry,
);
export interface GuardrailChecksContentFilterResult {
  results: GuardrailChecksContentFilterResultEntry[];
}
export const GuardrailChecksContentFilterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: GuardrailChecksContentFilterResultList }),
).annotate({
  identifier: "GuardrailChecksContentFilterResult",
}) as any as S.Schema<GuardrailChecksContentFilterResult>;
export interface GuardrailChecksPromptAttackResultEntry {
  category: GuardrailChecksPromptAttackCategory;
  severityScore: number;
}
export const GuardrailChecksPromptAttackResultEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      category: GuardrailChecksPromptAttackCategory,
      severityScore: S.Number,
    }),
).annotate({
  identifier: "GuardrailChecksPromptAttackResultEntry",
}) as any as S.Schema<GuardrailChecksPromptAttackResultEntry>;
export type GuardrailChecksPromptAttackResultList =
  GuardrailChecksPromptAttackResultEntry[];
export const GuardrailChecksPromptAttackResultList = /*@__PURE__*/ S.Array(
  GuardrailChecksPromptAttackResultEntry,
);
export interface GuardrailChecksPromptAttackResult {
  results: GuardrailChecksPromptAttackResultEntry[];
}
export const GuardrailChecksPromptAttackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: GuardrailChecksPromptAttackResultList }),
).annotate({
  identifier: "GuardrailChecksPromptAttackResult",
}) as any as S.Schema<GuardrailChecksPromptAttackResult>;
export interface GuardrailChecksSensitiveInformationResultEntry {
  type: GuardrailChecksSensitiveInformationEntityType;
  confidenceScore: number;
  beginOffset: number;
  endOffset: number;
  messageIndex: number;
  contentIndex: number;
}
export const GuardrailChecksSensitiveInformationResultEntry =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      type: GuardrailChecksSensitiveInformationEntityType,
      confidenceScore: S.Number,
      beginOffset: S.Number,
      endOffset: S.Number,
      messageIndex: S.Number,
      contentIndex: S.Number,
    }),
  ).annotate({
    identifier: "GuardrailChecksSensitiveInformationResultEntry",
  }) as any as S.Schema<GuardrailChecksSensitiveInformationResultEntry>;
export type GuardrailChecksSensitiveInformationResultList =
  GuardrailChecksSensitiveInformationResultEntry[];
export const GuardrailChecksSensitiveInformationResultList =
  /*@__PURE__*/ S.Array(GuardrailChecksSensitiveInformationResultEntry);
export interface GuardrailChecksSensitiveInformationResult {
  results: GuardrailChecksSensitiveInformationResultEntry[];
  truncated?: boolean;
}
export const GuardrailChecksSensitiveInformationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      results: GuardrailChecksSensitiveInformationResultList,
      truncated: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "GuardrailChecksSensitiveInformationResult",
  }) as any as S.Schema<GuardrailChecksSensitiveInformationResult>;
export interface GuardrailChecksResults {
  contentFilter?: GuardrailChecksContentFilterResult;
  promptAttack?: GuardrailChecksPromptAttackResult;
  sensitiveInformation?: GuardrailChecksSensitiveInformationResult;
}
export const GuardrailChecksResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentFilter: S.optional(GuardrailChecksContentFilterResult),
    promptAttack: S.optional(GuardrailChecksPromptAttackResult),
    sensitiveInformation: S.optional(GuardrailChecksSensitiveInformationResult),
  }),
).annotate({
  identifier: "GuardrailChecksResults",
}) as any as S.Schema<GuardrailChecksResults>;
export interface GuardrailChecksContentFilterUsage {
  textUnits: number;
}
export const GuardrailChecksContentFilterUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textUnits: S.Number }),
).annotate({
  identifier: "GuardrailChecksContentFilterUsage",
}) as any as S.Schema<GuardrailChecksContentFilterUsage>;
export interface GuardrailChecksPromptAttackUsage {
  textUnits: number;
}
export const GuardrailChecksPromptAttackUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ textUnits: S.Number }),
).annotate({
  identifier: "GuardrailChecksPromptAttackUsage",
}) as any as S.Schema<GuardrailChecksPromptAttackUsage>;
export interface GuardrailChecksSensitiveInformationUsage {
  textUnits: number;
}
export const GuardrailChecksSensitiveInformationUsage = /*@__PURE__*/ S.suspend(
  () => S.Struct({ textUnits: S.Number }),
).annotate({
  identifier: "GuardrailChecksSensitiveInformationUsage",
}) as any as S.Schema<GuardrailChecksSensitiveInformationUsage>;
export interface GuardrailChecksUsageResults {
  contentFilter?: GuardrailChecksContentFilterUsage;
  promptAttack?: GuardrailChecksPromptAttackUsage;
  sensitiveInformation?: GuardrailChecksSensitiveInformationUsage;
}
export const GuardrailChecksUsageResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentFilter: S.optional(GuardrailChecksContentFilterUsage),
    promptAttack: S.optional(GuardrailChecksPromptAttackUsage),
    sensitiveInformation: S.optional(GuardrailChecksSensitiveInformationUsage),
  }),
).annotate({
  identifier: "GuardrailChecksUsageResults",
}) as any as S.Schema<GuardrailChecksUsageResults>;
export interface InvokeGuardrailChecksResponse {
  results: GuardrailChecksResults;
  usage: GuardrailChecksUsageResults;
}
export const InvokeGuardrailChecksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    results: GuardrailChecksResults,
    usage: GuardrailChecksUsageResults,
  }),
).annotate({
  identifier: "InvokeGuardrailChecksResponse",
}) as any as S.Schema<InvokeGuardrailChecksResponse>;
export type MimeType = string;
export type InvokeModelIdentifier = string;
export type Trace = "ENABLED" | "DISABLED" | "ENABLED_FULL" | (string & {});
export const Trace = S.String;

export type RequestMetadataJson = string | redacted.Redacted<string>;
export interface InvokeModelRequest {
  body?: T.StreamingInputBody;
  contentType?: string;
  accept?: string;
  modelId: string;
  trace?: Trace;
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
  requestMetadata?: string | redacted.Redacted<string>;
}
export const InvokeModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
    contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
    modelId: S.String.pipe(T.HttpLabel("modelId")),
    trace: S.optional(Trace).pipe(T.HttpHeader("X-Amzn-Bedrock-Trace")),
    guardrailIdentifier: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-GuardrailIdentifier"),
    ),
    guardrailVersion: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Bedrock-GuardrailVersion"),
    ),
    performanceConfigLatency: S.optional(PerformanceConfigLatency).pipe(
      T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
    ),
    serviceTier: S.optional(ServiceTierType).pipe(
      T.HttpHeader("X-Amzn-Bedrock-Service-Tier"),
    ),
    requestMetadata: S.optional(SensitiveString).pipe(
      T.HttpHeader("X-Amzn-Bedrock-Request-Metadata"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/model/{modelId}/invoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InvokeModelRequest",
}) as any as S.Schema<InvokeModelRequest>;
export interface InvokeModelResponse {
  body: T.StreamingOutputBody;
  contentType: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
}
export const InvokeModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    body: T.StreamingOutput.pipe(T.HttpPayload()),
    contentType: S.String.pipe(T.HttpHeader("Content-Type")),
    performanceConfigLatency: S.optional(PerformanceConfigLatency).pipe(
      T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
    ),
    serviceTier: S.optional(ServiceTierType).pipe(
      T.HttpHeader("X-Amzn-Bedrock-Service-Tier"),
    ),
  }),
).annotate({
  identifier: "InvokeModelResponse",
}) as any as S.Schema<InvokeModelResponse>;
export type PartBody = Uint8Array | redacted.Redacted<Uint8Array>;
export interface BidirectionalInputPayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const BidirectionalInputPayloadPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bytes: S.optional(SensitiveBlob) }),
).annotate({
  identifier: "BidirectionalInputPayloadPart",
}) as any as S.Schema<BidirectionalInputPayloadPart>;
export type InvokeModelWithBidirectionalStreamInput = {
  chunk: BidirectionalInputPayloadPart;
};
export const InvokeModelWithBidirectionalStreamInput =
  /*@__PURE__*/ T.InputEventStream(
    S.Union([S.Struct({ chunk: BidirectionalInputPayloadPart })]),
  ) as any as S.Schema<
    stream.Stream<InvokeModelWithBidirectionalStreamInput, Error, never>
  >;
export interface InvokeModelWithBidirectionalStreamRequest {
  modelId: string;
  body: stream.Stream<InvokeModelWithBidirectionalStreamInput, Error, never>;
}
export const InvokeModelWithBidirectionalStreamRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      modelId: S.String.pipe(T.HttpLabel("modelId")),
      body: InvokeModelWithBidirectionalStreamInput.pipe(T.HttpPayload()),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/model/{modelId}/invoke-with-bidirectional-stream",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "InvokeModelWithBidirectionalStreamRequest",
  }) as any as S.Schema<InvokeModelWithBidirectionalStreamRequest>;
export interface BidirectionalOutputPayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const BidirectionalOutputPayloadPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bytes: S.optional(SensitiveBlob) }),
).annotate({
  identifier: "BidirectionalOutputPayloadPart",
}) as any as S.Schema<BidirectionalOutputPayloadPart>;
export type InvokeModelWithBidirectionalStreamOutput =
  | {
      chunk: BidirectionalOutputPayloadPart;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException: InternalServerException;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException: ModelStreamErrorException;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException: ValidationException;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException: ThrottlingException;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException: ModelTimeoutException;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException: ServiceUnavailableException;
    };
export const InvokeModelWithBidirectionalStreamOutput =
  /*@__PURE__*/ T.EventStream(
    S.Union([
      S.Struct({ chunk: BidirectionalOutputPayloadPart }),
      S.Struct({
        internalServerException: S.suspend(
          () => InternalServerException,
        ).annotate({ identifier: "InternalServerException" }),
      }),
      S.Struct({
        modelStreamErrorException: S.suspend(
          () => ModelStreamErrorException,
        ).annotate({ identifier: "ModelStreamErrorException" }),
      }),
      S.Struct({
        validationException: S.suspend(() => ValidationException).annotate({
          identifier: "ValidationException",
        }),
      }),
      S.Struct({
        throttlingException: S.suspend(() => ThrottlingException).annotate({
          identifier: "ThrottlingException",
        }),
      }),
      S.Struct({
        modelTimeoutException: S.suspend(() => ModelTimeoutException).annotate({
          identifier: "ModelTimeoutException",
        }),
      }),
      S.Struct({
        serviceUnavailableException: S.suspend(
          () => ServiceUnavailableException,
        ).annotate({ identifier: "ServiceUnavailableException" }),
      }),
    ]),
  ) as any as S.Schema<
    stream.Stream<InvokeModelWithBidirectionalStreamOutput, Error, never>
  >;
export interface InvokeModelWithBidirectionalStreamResponse {
  body: stream.Stream<InvokeModelWithBidirectionalStreamOutput, Error, never>;
}
export const InvokeModelWithBidirectionalStreamResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      body: InvokeModelWithBidirectionalStreamOutput.pipe(T.HttpPayload()),
    }),
  ).annotate({
    identifier: "InvokeModelWithBidirectionalStreamResponse",
  }) as any as S.Schema<InvokeModelWithBidirectionalStreamResponse>;
export interface InvokeModelWithResponseStreamRequest {
  body?: T.StreamingInputBody;
  contentType?: string;
  accept?: string;
  modelId: string;
  trace?: Trace;
  guardrailIdentifier?: string;
  guardrailVersion?: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
  requestMetadata?: string | redacted.Redacted<string>;
}
export const InvokeModelWithResponseStreamRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
      contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
      accept: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Bedrock-Accept")),
      modelId: S.String.pipe(T.HttpLabel("modelId")),
      trace: S.optional(Trace).pipe(T.HttpHeader("X-Amzn-Bedrock-Trace")),
      guardrailIdentifier: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Bedrock-GuardrailIdentifier"),
      ),
      guardrailVersion: S.optional(S.String).pipe(
        T.HttpHeader("X-Amzn-Bedrock-GuardrailVersion"),
      ),
      performanceConfigLatency: S.optional(PerformanceConfigLatency).pipe(
        T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
      ),
      serviceTier: S.optional(ServiceTierType).pipe(
        T.HttpHeader("X-Amzn-Bedrock-Service-Tier"),
      ),
      requestMetadata: S.optional(SensitiveString).pipe(
        T.HttpHeader("X-Amzn-Bedrock-Request-Metadata"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/model/{modelId}/invoke-with-response-stream",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "InvokeModelWithResponseStreamRequest",
}) as any as S.Schema<InvokeModelWithResponseStreamRequest>;
export interface PayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const PayloadPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bytes: S.optional(SensitiveBlob) }),
).annotate({ identifier: "PayloadPart" }) as any as S.Schema<PayloadPart>;
export type ResponseStream =
  | {
      chunk: PayloadPart;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException: InternalServerException;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException: ModelStreamErrorException;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException: ValidationException;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException: ThrottlingException;
      modelTimeoutException?: never;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException: ModelTimeoutException;
      serviceUnavailableException?: never;
    }
  | {
      chunk?: never;
      internalServerException?: never;
      modelStreamErrorException?: never;
      validationException?: never;
      throttlingException?: never;
      modelTimeoutException?: never;
      serviceUnavailableException: ServiceUnavailableException;
    };
export const ResponseStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ chunk: PayloadPart }),
    S.Struct({
      internalServerException: S.suspend(
        () => InternalServerException,
      ).annotate({ identifier: "InternalServerException" }),
    }),
    S.Struct({
      modelStreamErrorException: S.suspend(
        () => ModelStreamErrorException,
      ).annotate({ identifier: "ModelStreamErrorException" }),
    }),
    S.Struct({
      validationException: S.suspend(() => ValidationException).annotate({
        identifier: "ValidationException",
      }),
    }),
    S.Struct({
      throttlingException: S.suspend(() => ThrottlingException).annotate({
        identifier: "ThrottlingException",
      }),
    }),
    S.Struct({
      modelTimeoutException: S.suspend(() => ModelTimeoutException).annotate({
        identifier: "ModelTimeoutException",
      }),
    }),
    S.Struct({
      serviceUnavailableException: S.suspend(
        () => ServiceUnavailableException,
      ).annotate({ identifier: "ServiceUnavailableException" }),
    }),
  ]),
) as any as S.Schema<stream.Stream<ResponseStream, Error, never>>;
export interface InvokeModelWithResponseStreamResponse {
  body: stream.Stream<ResponseStream, Error, never>;
  contentType: string;
  performanceConfigLatency?: PerformanceConfigLatency;
  serviceTier?: ServiceTierType;
}
export const InvokeModelWithResponseStreamResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      body: ResponseStream.pipe(T.HttpPayload()),
      contentType: S.String.pipe(T.HttpHeader("X-Amzn-Bedrock-Content-Type")),
      performanceConfigLatency: S.optional(PerformanceConfigLatency).pipe(
        T.HttpHeader("X-Amzn-Bedrock-PerformanceConfig-Latency"),
      ),
      serviceTier: S.optional(ServiceTierType).pipe(
        T.HttpHeader("X-Amzn-Bedrock-Service-Tier"),
      ),
    }),
).annotate({
  identifier: "InvokeModelWithResponseStreamResponse",
}) as any as S.Schema<InvokeModelWithResponseStreamResponse>;
export type MaxResults = number;
export type PaginationToken = string;
export type SortAsyncInvocationBy = "SubmissionTime" | (string & {});
export const SortAsyncInvocationBy = S.String;

export type SortOrder = "Ascending" | "Descending" | (string & {});
export const SortOrder = S.String;

export interface ListAsyncInvokesRequest {
  submitTimeAfter?: Date;
  submitTimeBefore?: Date;
  statusEquals?: AsyncInvokeStatus;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortAsyncInvocationBy;
  sortOrder?: SortOrder;
}
export const ListAsyncInvokesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    submitTimeAfter: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("submitTimeAfter")),
    submitTimeBefore: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("submitTimeBefore")),
    statusEquals: S.optional(AsyncInvokeStatus).pipe(
      T.HttpQuery("statusEquals"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    sortBy: S.optional(SortAsyncInvocationBy).pipe(T.HttpQuery("sortBy")),
    sortOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortOrder")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/async-invoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAsyncInvokesRequest",
}) as any as S.Schema<ListAsyncInvokesRequest>;
export interface AsyncInvokeSummary {
  invocationArn: string;
  modelArn: string;
  clientRequestToken?: string;
  status?: AsyncInvokeStatus;
  failureMessage?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  outputDataConfig: AsyncInvokeOutputDataConfig;
}
export const AsyncInvokeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    invocationArn: S.String,
    modelArn: S.String,
    clientRequestToken: S.optional(S.String),
    status: S.optional(AsyncInvokeStatus),
    failureMessage: S.optional(SensitiveString),
    submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModifiedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    outputDataConfig: AsyncInvokeOutputDataConfig,
  }),
).annotate({
  identifier: "AsyncInvokeSummary",
}) as any as S.Schema<AsyncInvokeSummary>;
export type AsyncInvokeSummaries = AsyncInvokeSummary[];
export const AsyncInvokeSummaries = /*@__PURE__*/ S.Array(AsyncInvokeSummary);
export interface ListAsyncInvokesResponse {
  nextToken?: string;
  asyncInvokeSummaries?: AsyncInvokeSummary[];
}
export const ListAsyncInvokesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    asyncInvokeSummaries: S.optional(AsyncInvokeSummaries),
  }),
).annotate({
  identifier: "ListAsyncInvokesResponse",
}) as any as S.Schema<ListAsyncInvokesResponse>;
export type AsyncInvokeIdentifier = string;
export type ModelInputPayload = unknown;
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
export interface StartAsyncInvokeRequest {
  clientRequestToken?: string;
  modelId: string;
  modelInput: any;
  outputDataConfig: AsyncInvokeOutputDataConfig;
  tags?: Tag[];
}
export const StartAsyncInvokeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    modelId: S.String,
    modelInput: S.Any,
    outputDataConfig: AsyncInvokeOutputDataConfig,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/async-invoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartAsyncInvokeRequest",
}) as any as S.Schema<StartAsyncInvokeRequest>;
export interface StartAsyncInvokeResponse {
  invocationArn: string;
}
export const StartAsyncInvokeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invocationArn: S.String }),
).annotate({
  identifier: "StartAsyncInvokeResponse",
}) as any as S.Schema<StartAsyncInvokeResponse>;
export type ApplyGuardrailError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to apply a guardrail.
 *
 * For troubleshooting some of the common errors you might encounter when using the `ApplyGuardrail` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const applyGuardrail: API.OperationMethod<
  ApplyGuardrailRequest,
  ApplyGuardrailResponse,
  ApplyGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApplyGuardrailRequest,
  output: ApplyGuardrailResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyGuardrail",
}));

export type ConverseError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends messages to the specified Amazon Bedrock model. `Converse` provides a consistent interface that works with all models that support messages. This allows you to write code once and use it with different models. If a model has unique inference parameters, you can also pass those unique parameters to the model.
 *
 * Amazon Bedrock doesn't store any text, images, or documents that you provide as content. The data is only used to generate the response.
 *
 * You can submit a prompt by including it in the `messages` field, specifying the `modelId` of a foundation model or inference profile to run inference on it, and including any other fields that are relevant to your use case.
 *
 * You can also submit a prompt from Prompt management by specifying the ARN of the prompt version and including a map of variables to values in the `promptVariables` field. You can append more messages to the prompt by using the `messages` field. If you use a prompt from Prompt management, you can't include the following fields in the request: `additionalModelRequestFields`, `inferenceConfig`, `system`, or `toolConfig`. Instead, these fields must be defined through Prompt management. For more information, see Use a prompt from Prompt management.
 *
 * For information about the Converse API, see *Use the Converse API* in the *Amazon Bedrock User Guide*. To use a guardrail, see *Use a guardrail with the Converse API* in the *Amazon Bedrock User Guide*. To use a tool with a model, see *Tool use (Function calling)* in the *Amazon Bedrock User Guide*
 *
 * For example code, see *Converse API examples* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permission for the `bedrock:InvokeModel` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the base inference actions (InvokeModel and InvokeModelWithResponseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `Converse` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const converse: API.OperationMethod<
  ConverseRequest,
  ConverseResponse,
  ConverseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConverseRequest,
  output: ConverseResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Converse",
}));

export type ConverseStreamError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends messages to the specified Amazon Bedrock model and returns the response in a stream. `ConverseStream` provides a consistent API that works with all Amazon Bedrock models that support messages. This allows you to write code once and use it with different models. Should a model have unique inference parameters, you can also pass those unique parameters to the model.
 *
 * To find out if a model supports streaming, call GetFoundationModel and check the `responseStreamingSupported` field in the response.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `ConverseStream`.
 *
 * Amazon Bedrock doesn't store any text, images, or documents that you provide as content. The data is only used to generate the response.
 *
 * You can submit a prompt by including it in the `messages` field, specifying the `modelId` of a foundation model or inference profile to run inference on it, and including any other fields that are relevant to your use case.
 *
 * You can also submit a prompt from Prompt management by specifying the ARN of the prompt version and including a map of variables to values in the `promptVariables` field. You can append more messages to the prompt by using the `messages` field. If you use a prompt from Prompt management, you can't include the following fields in the request: `additionalModelRequestFields`, `inferenceConfig`, `system`, or `toolConfig`. Instead, these fields must be defined through Prompt management. For more information, see Use a prompt from Prompt management.
 *
 * For information about the Converse API, see *Use the Converse API* in the *Amazon Bedrock User Guide*. To use a guardrail, see *Use a guardrail with the Converse API* in the *Amazon Bedrock User Guide*. To use a tool with a model, see *Tool use (Function calling)* in the *Amazon Bedrock User Guide*
 *
 * For example code, see *Conversation streaming example* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permission for the `bedrock:InvokeModelWithResponseStream` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the base inference actions (InvokeModel and InvokeModelWithResponseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `ConverseStream` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const converseStream: API.OperationMethod<
  ConverseStreamRequest,
  ConverseStreamResponse,
  ConverseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConverseStreamRequest,
  output: ConverseStreamResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConverseStream",
}));

export type CountTokensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the token count for a given inference request. This operation helps you estimate token usage before sending requests to foundation models by returning the token count that would be used if the same input were sent to the model in an inference request.
 *
 * Token counting is model-specific because different models use different tokenization strategies. The token count returned by this operation will match the token count that would be charged if the same input were sent to the model in an `InvokeModel` or `Converse` request.
 *
 * You can use this operation to:
 *
 * - Estimate costs before sending inference requests.
 *
 * - Optimize prompts to fit within token limits.
 *
 * - Plan for token usage in your applications.
 *
 * This operation accepts the same input formats as `InvokeModel` and `Converse`, allowing you to count tokens for both raw text inputs and structured conversation formats.
 *
 * The following operations are related to `CountTokens`:
 *
 * - InvokeModel - Sends inference requests to foundation models
 *
 * - Converse - Sends conversation-based inference requests to foundation models
 */
export const countTokens: API.OperationMethod<
  CountTokensRequest,
  CountTokensResponse,
  CountTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CountTokensRequest,
  output: CountTokensResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CountTokens",
}));

export type GetAsyncInvokeError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve information about an asynchronous invocation.
 */
export const getAsyncInvoke: API.OperationMethod<
  GetAsyncInvokeRequest,
  GetAsyncInvokeResponse,
  GetAsyncInvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAsyncInvokeRequest,
  output: GetAsyncInvokeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsyncInvoke",
}));

export type InvokeGuardrailChecksError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates messages against inline guardrail checks. You specify the check configurations directly in the request, and Amazon Bedrock returns per-check results with severity or confidence scores.
 */
export const invokeGuardrailChecks: API.OperationMethod<
  InvokeGuardrailChecksRequest,
  InvokeGuardrailChecksResponse,
  InvokeGuardrailChecksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeGuardrailChecksRequest,
  output: InvokeGuardrailChecksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeGuardrailChecks",
}));

export type InvokeModelError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes the specified Amazon Bedrock model to run inference using the prompt and inference parameters provided in the request body. You use model inference to generate text, images, and embeddings.
 *
 * For example code, see *Invoke model code examples* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permission for the `bedrock:InvokeModel` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the Converse API actions (Converse and ConverseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `InvokeModel` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const invokeModel: API.OperationMethod<
  InvokeModelRequest,
  InvokeModelResponse,
  InvokeModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeModelRequest,
  output: InvokeModelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeModel",
}));

export type InvokeModelWithBidirectionalStreamError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelStreamErrorException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invoke the specified Amazon Bedrock model to run inference using the bidirectional stream. The response is returned in a stream that remains open for 8 minutes. A single session can contain multiple prompts and responses from the model. The prompts to the model are provided as audio files and the model's responses are spoken back to the user and transcribed.
 *
 * It is possible for users to interrupt the model's response with a new prompt, which will halt the response speech. The model will retain contextual awareness of the conversation while pivoting to respond to the new prompt.
 */
export const invokeModelWithBidirectionalStream: API.OperationMethod<
  InvokeModelWithBidirectionalStreamRequest,
  InvokeModelWithBidirectionalStreamResponse,
  InvokeModelWithBidirectionalStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeModelWithBidirectionalStreamRequest,
  output: InvokeModelWithBidirectionalStreamResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelStreamErrorException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeModelWithBidirectionalStream",
}));

export type InvokeModelWithResponseStreamError =
  | AccessDeniedException
  | InternalServerException
  | ModelErrorException
  | ModelNotReadyException
  | ModelStreamErrorException
  | ModelTimeoutException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invoke the specified Amazon Bedrock model to run inference using the prompt and inference parameters provided in the request body. The response is returned in a stream.
 *
 * To see if a model supports streaming, call GetFoundationModel and check the `responseStreamingSupported` field in the response.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `InvokeModelWithResponseStream`.
 *
 * For example code, see *Invoke model with streaming code example* in the *Amazon Bedrock User Guide*.
 *
 * This operation requires permissions to perform the `bedrock:InvokeModelWithResponseStream` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the Converse API actions (Converse and ConverseStream). For more information see Deny access for inference on specific models.
 *
 * For troubleshooting some of the common errors you might encounter when using the `InvokeModelWithResponseStream` API, see Troubleshooting Amazon Bedrock API Error Codes in the Amazon Bedrock User Guide
 */
export const invokeModelWithResponseStream: API.OperationMethod<
  InvokeModelWithResponseStreamRequest,
  InvokeModelWithResponseStreamResponse,
  InvokeModelWithResponseStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeModelWithResponseStreamRequest,
  output: InvokeModelWithResponseStreamResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ModelErrorException,
    ModelNotReadyException,
    ModelStreamErrorException,
    ModelTimeoutException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeModelWithResponseStream",
}));

export type ListAsyncInvokesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists asynchronous invocations.
 */
export const listAsyncInvokes: API.PaginatedOperationMethod<
  ListAsyncInvokesRequest,
  ListAsyncInvokesResponse,
  ListAsyncInvokesError,
  Credentials | HttpClient.HttpClient,
  AsyncInvokeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAsyncInvokesRequest,
  output: ListAsyncInvokesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAsyncInvokes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "asyncInvokeSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartAsyncInvokeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an asynchronous invocation.
 *
 * This operation requires permission for the `bedrock:InvokeModel` action.
 *
 * To deny all inference access to resources that you specify in the modelId field, you need to deny access to the `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream` actions. Doing this also denies access to the resource through the Converse API actions (Converse and ConverseStream). For more information see Deny access for inference on specific models.
 */
export const startAsyncInvoke: API.OperationMethod<
  StartAsyncInvokeRequest,
  StartAsyncInvokeResponse,
  StartAsyncInvokeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAsyncInvokeRequest,
  output: StartAsyncInvokeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAsyncInvoke",
}));
