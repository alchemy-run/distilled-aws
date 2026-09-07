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
  sdkId: "SecurityAgent",
  serviceShapeName: "SecurityAgent",
});
const auth = T.AwsAuthSigv4({ name: "securityagent" });
const ver = T.ServiceVersion("2025-09-06");
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
            `https://securityagent-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://securityagent.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
  ) {}
export type AgentSpaceId = string;
export type ArtifactType =
  | "TXT"
  | "PNG"
  | "JPEG"
  | "MD"
  | "PDF"
  | "DOCX"
  | "DOC"
  | "JSON"
  | "YAML"
  | (string & {});
export const ArtifactType = /*@__PURE__*/ S.String;

export interface AddArtifactInput {
  agentSpaceId: string;
  artifactContent: Uint8Array;
  artifactType: ArtifactType;
  fileName: string;
}
export const AddArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    artifactContent: T.Blob,
    artifactType: ArtifactType,
    fileName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AddArtifact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddArtifactInput",
}) as any as S.Schema<AddArtifactInput>;
export type ArtifactId = string;
export interface AddArtifactOutput {
  artifactId: string;
}
export const AddArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ artifactId: S.String }),
).annotate({
  identifier: "AddArtifactOutput",
}) as any as S.Schema<AddArtifactOutput>;
export type SecurityRequirementPackId = string;
export type SecurityRequirementName = string;
export interface CreateSecurityRequirementEntry {
  name: string;
  description: string;
  domain: string;
  evaluation: string;
  remediation?: string;
}
export const CreateSecurityRequirementEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.String,
    domain: S.String,
    evaluation: S.String,
    remediation: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateSecurityRequirementEntry",
}) as any as S.Schema<CreateSecurityRequirementEntry>;
export type CreateSecurityRequirementEntryList =
  CreateSecurityRequirementEntry[];
export const CreateSecurityRequirementEntryList = /*@__PURE__*/ S.Array(
  CreateSecurityRequirementEntry,
);
export interface BatchCreateSecurityRequirementsInput {
  packId: string;
  securityRequirements: CreateSecurityRequirementEntry[];
}
export const BatchCreateSecurityRequirementsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      packId: S.String,
      securityRequirements: CreateSecurityRequirementEntryList,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/BatchCreateSecurityRequirements" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchCreateSecurityRequirementsInput",
}) as any as S.Schema<BatchCreateSecurityRequirementsInput>;
export interface BatchCreateSecurityRequirementResult {
  packId: string;
  name: string;
  description: string;
  domain: string;
  evaluation: string;
  remediation?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const BatchCreateSecurityRequirementResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      packId: S.String,
      name: S.String,
      description: S.String,
      domain: S.String,
      evaluation: S.String,
      remediation: S.optional(S.String),
      createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    }),
).annotate({
  identifier: "BatchCreateSecurityRequirementResult",
}) as any as S.Schema<BatchCreateSecurityRequirementResult>;
export type BatchCreateSecurityRequirementResultList =
  BatchCreateSecurityRequirementResult[];
export const BatchCreateSecurityRequirementResultList = /*@__PURE__*/ S.Array(
  BatchCreateSecurityRequirementResult,
);
export interface BatchSecurityRequirementError {
  securityRequirementName: string;
  code: string;
  message: string;
}
export const BatchSecurityRequirementError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityRequirementName: S.String,
    code: S.String,
    message: S.String,
  }),
).annotate({
  identifier: "BatchSecurityRequirementError",
}) as any as S.Schema<BatchSecurityRequirementError>;
export type BatchSecurityRequirementErrors = BatchSecurityRequirementError[];
export const BatchSecurityRequirementErrors = /*@__PURE__*/ S.Array(
  BatchSecurityRequirementError,
);
export interface BatchCreateSecurityRequirementsOutput {
  securityRequirements: BatchCreateSecurityRequirementResult[];
  errors: BatchSecurityRequirementError[];
}
export const BatchCreateSecurityRequirementsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      securityRequirements: BatchCreateSecurityRequirementResultList,
      errors: BatchSecurityRequirementErrors,
    }),
).annotate({
  identifier: "BatchCreateSecurityRequirementsOutput",
}) as any as S.Schema<BatchCreateSecurityRequirementsOutput>;
export type CodeReviewIdList = string[];
export const CodeReviewIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteCodeReviewsInput {
  codeReviewIds: string[];
  agentSpaceId: string;
}
export const BatchDeleteCodeReviewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ codeReviewIds: CodeReviewIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchDeleteCodeReviews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteCodeReviewsInput",
}) as any as S.Schema<BatchDeleteCodeReviewsInput>;
export interface DeleteCodeReviewFailure {
  codeReviewId?: string;
  reason?: string;
}
export const DeleteCodeReviewFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewId: S.optional(S.String),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteCodeReviewFailure",
}) as any as S.Schema<DeleteCodeReviewFailure>;
export type DeleteCodeReviewFailureList = DeleteCodeReviewFailure[];
export const DeleteCodeReviewFailureList = /*@__PURE__*/ S.Array(
  DeleteCodeReviewFailure,
);
export interface BatchDeleteCodeReviewsOutput {
  deleted?: string[];
  failed?: DeleteCodeReviewFailure[];
}
export const BatchDeleteCodeReviewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deleted: S.optional(CodeReviewIdList),
    failed: S.optional(DeleteCodeReviewFailureList),
  }),
).annotate({
  identifier: "BatchDeleteCodeReviewsOutput",
}) as any as S.Schema<BatchDeleteCodeReviewsOutput>;
export type PentestIdList = string[];
export const PentestIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeletePentestsInput {
  pentestIds: string[];
  agentSpaceId: string;
}
export const BatchDeletePentestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pentestIds: PentestIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchDeletePentests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeletePentestsInput",
}) as any as S.Schema<BatchDeletePentestsInput>;
export interface Endpoint {
  uri?: string;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.optional(S.String) }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type EndpointList = Endpoint[];
export const EndpointList = /*@__PURE__*/ S.Array(Endpoint);
export type UriList = string[];
export const UriList = /*@__PURE__*/ S.Array(S.String);
export type AuthenticationProviderType =
  | "SECRETS_MANAGER"
  | "AWS_LAMBDA"
  | "AWS_IAM_ROLE"
  | "AWS_INTERNAL"
  | (string & {});
export const AuthenticationProviderType = /*@__PURE__*/ S.String;

export interface Authentication {
  providerType?: AuthenticationProviderType;
  value?: string;
}
export const Authentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    providerType: S.optional(AuthenticationProviderType),
    value: S.optional(S.String),
  }),
).annotate({ identifier: "Authentication" }) as any as S.Schema<Authentication>;
export interface Actor {
  identifier?: string;
  uris?: string[];
  authentication?: Authentication;
  description?: string;
}
export const Actor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.optional(S.String),
    uris: S.optional(UriList),
    authentication: S.optional(Authentication),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "Actor" }) as any as S.Schema<Actor>;
export type ActorList = Actor[];
export const ActorList = /*@__PURE__*/ S.Array(Actor);
export interface IntegratedDocument {
  integrationId: string;
  resourceId: string;
}
export const IntegratedDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ integrationId: S.String, resourceId: S.String }),
).annotate({
  identifier: "IntegratedDocument",
}) as any as S.Schema<IntegratedDocument>;
export interface DocumentInfo {
  s3Location?: string;
  artifactId?: string;
  integratedDocument?: IntegratedDocument;
}
export const DocumentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Location: S.optional(S.String),
    artifactId: S.optional(S.String),
    integratedDocument: S.optional(IntegratedDocument),
  }),
).annotate({ identifier: "DocumentInfo" }) as any as S.Schema<DocumentInfo>;
export type DocumentList = DocumentInfo[];
export const DocumentList = /*@__PURE__*/ S.Array(DocumentInfo);
export interface SourceCodeRepository {
  s3Location?: string;
}
export const SourceCodeRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Location: S.optional(S.String) }),
).annotate({
  identifier: "SourceCodeRepository",
}) as any as S.Schema<SourceCodeRepository>;
export type SourceCodeRepositoryList = SourceCodeRepository[];
export const SourceCodeRepositoryList =
  /*@__PURE__*/ S.Array(SourceCodeRepository);
export interface IntegratedRepository {
  integrationId: string;
  providerResourceId: string;
}
export const IntegratedRepository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ integrationId: S.String, providerResourceId: S.String }),
).annotate({
  identifier: "IntegratedRepository",
}) as any as S.Schema<IntegratedRepository>;
export type IntegratedRepositoryList = IntegratedRepository[];
export const IntegratedRepositoryList =
  /*@__PURE__*/ S.Array(IntegratedRepository);
export interface Assets {
  endpoints?: Endpoint[];
  actors?: Actor[];
  documents?: DocumentInfo[];
  sourceCode?: SourceCodeRepository[];
  integratedRepositories?: IntegratedRepository[];
}
export const Assets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpoints: S.optional(EndpointList),
    actors: S.optional(ActorList),
    documents: S.optional(DocumentList),
    sourceCode: S.optional(SourceCodeRepositoryList),
    integratedRepositories: S.optional(IntegratedRepositoryList),
  }),
).annotate({ identifier: "Assets" }) as any as S.Schema<Assets>;
export type RiskType =
  | "CROSS_SITE_SCRIPTING"
  | "DEFAULT_CREDENTIALS"
  | "INSECURE_DIRECT_OBJECT_REFERENCE"
  | "PRIVILEGE_ESCALATION"
  | "SERVER_SIDE_TEMPLATE_INJECTION"
  | "COMMAND_INJECTION"
  | "CODE_INJECTION"
  | "SQL_INJECTION"
  | "ARBITRARY_FILE_UPLOAD"
  | "INSECURE_DESERIALIZATION"
  | "LOCAL_FILE_INCLUSION"
  | "INFORMATION_DISCLOSURE"
  | "PATH_TRAVERSAL"
  | "SERVER_SIDE_REQUEST_FORGERY"
  | "JSON_WEB_TOKEN_VULNERABILITIES"
  | "XML_EXTERNAL_ENTITY"
  | "FILE_DELETION"
  | "OTHER"
  | "GRAPHQL_VULNERABILITIES"
  | "BUSINESS_LOGIC_VULNERABILITIES"
  | "CRYPTOGRAPHIC_VULNERABILITIES"
  | "DENIAL_OF_SERVICE"
  | "FILE_ACCESS"
  | "FILE_CREATION"
  | "DATABASE_MODIFICATION"
  | "DATABASE_ACCESS"
  | "OUTBOUND_SERVICE_REQUEST"
  | "UNKNOWN"
  | (string & {});
export const RiskType = /*@__PURE__*/ S.String;

export type RiskTypeList = RiskType[];
export const RiskTypeList = /*@__PURE__*/ S.Array(RiskType);
export type ServiceRole = string;
export interface CloudWatchLog {
  logGroup?: string;
  logStream?: string;
}
export const CloudWatchLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logGroup: S.optional(S.String), logStream: S.optional(S.String) }),
).annotate({ identifier: "CloudWatchLog" }) as any as S.Schema<CloudWatchLog>;
export type VpcArn = string;
export type SecurityGroupArn = string;
export type SecurityGroupArns = string[];
export const SecurityGroupArns = /*@__PURE__*/ S.Array(S.String);
export type SubnetArn = string;
export type SubnetArns = string[];
export const SubnetArns = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  vpcArn?: string;
  securityGroupArns?: string[];
  subnetArns?: string[];
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcArn: S.optional(S.String),
    securityGroupArns: S.optional(SecurityGroupArns),
    subnetArns: S.optional(SubnetArns),
  }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export type NetworkTrafficRuleEffect = "ALLOW" | "DENY" | (string & {});
export const NetworkTrafficRuleEffect = /*@__PURE__*/ S.String;

export type NetworkTrafficRuleType = "URL" | (string & {});
export const NetworkTrafficRuleType = /*@__PURE__*/ S.String;

export interface NetworkTrafficRule {
  effect?: NetworkTrafficRuleEffect;
  pattern?: string;
  networkTrafficRuleType?: NetworkTrafficRuleType;
}
export const NetworkTrafficRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    effect: S.optional(NetworkTrafficRuleEffect),
    pattern: S.optional(S.String),
    networkTrafficRuleType: S.optional(NetworkTrafficRuleType),
  }),
).annotate({
  identifier: "NetworkTrafficRule",
}) as any as S.Schema<NetworkTrafficRule>;
export type NetworkTrafficRuleList = NetworkTrafficRule[];
export const NetworkTrafficRuleList = /*@__PURE__*/ S.Array(NetworkTrafficRule);
export interface CustomHeader {
  name?: string;
  value?: string;
}
export const CustomHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "CustomHeader" }) as any as S.Schema<CustomHeader>;
export type CustomHeaderList = CustomHeader[];
export const CustomHeaderList = /*@__PURE__*/ S.Array(CustomHeader);
export interface NetworkTrafficConfig {
  rules?: NetworkTrafficRule[];
  customHeaders?: CustomHeader[];
}
export const NetworkTrafficConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: S.optional(NetworkTrafficRuleList),
    customHeaders: S.optional(CustomHeaderList),
  }),
).annotate({
  identifier: "NetworkTrafficConfig",
}) as any as S.Schema<NetworkTrafficConfig>;
export type CodeRemediationStrategy = "AUTOMATIC" | "DISABLED" | (string & {});
export const CodeRemediationStrategy = /*@__PURE__*/ S.String;

export type CleanUpStrategy =
  | "BEST_EFFORT_DELETE"
  | "RETAIN_ALL"
  | (string & {});
export const CleanUpStrategy = /*@__PURE__*/ S.String;

export type SkillType =
  | "FINDING_PERSONALIZATION"
  | "LOGIN_OPTIMIZATION"
  | (string & {});
export const SkillType = /*@__PURE__*/ S.String;

export type SkillTypeList = SkillType[];
export const SkillTypeList = /*@__PURE__*/ S.Array(SkillType);
export interface Pentest {
  pentestId: string;
  agentSpaceId: string;
  title: string;
  assets: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  codeRemediationStrategy?: CodeRemediationStrategy;
  cleanUpStrategy?: CleanUpStrategy;
  disableManagedSkills?: SkillType[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const Pentest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestId: S.String,
    agentSpaceId: S.String,
    title: S.String,
    assets: Assets,
    excludeRiskTypes: S.optional(RiskTypeList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    vpcConfig: S.optional(VpcConfig),
    networkTrafficConfig: S.optional(NetworkTrafficConfig),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    cleanUpStrategy: S.optional(CleanUpStrategy),
    disableManagedSkills: S.optional(SkillTypeList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Pentest" }) as any as S.Schema<Pentest>;
export type PentestList = Pentest[];
export const PentestList = /*@__PURE__*/ S.Array(Pentest);
export interface DeletePentestFailure {
  pentestId?: string;
  reason?: string;
}
export const DeletePentestFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pentestId: S.optional(S.String), reason: S.optional(S.String) }),
).annotate({
  identifier: "DeletePentestFailure",
}) as any as S.Schema<DeletePentestFailure>;
export type DeletePentestFailureList = DeletePentestFailure[];
export const DeletePentestFailureList =
  /*@__PURE__*/ S.Array(DeletePentestFailure);
export interface BatchDeletePentestsOutput {
  deleted?: Pentest[];
  failed?: DeletePentestFailure[];
}
export const BatchDeletePentestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deleted: S.optional(PentestList),
    failed: S.optional(DeletePentestFailureList),
  }),
).annotate({
  identifier: "BatchDeletePentestsOutput",
}) as any as S.Schema<BatchDeletePentestsOutput>;
export type SecurityRequirementNameList = string[];
export const SecurityRequirementNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteSecurityRequirementsInput {
  packId: string;
  securityRequirementNames: string[];
}
export const BatchDeleteSecurityRequirementsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      packId: S.String,
      securityRequirementNames: SecurityRequirementNameList,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/BatchDeleteSecurityRequirements" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDeleteSecurityRequirementsInput",
}) as any as S.Schema<BatchDeleteSecurityRequirementsInput>;
export interface BatchDeleteSecurityRequirementsOutput {
  deletedSecurityRequirementNames: string[];
  errors: BatchSecurityRequirementError[];
}
export const BatchDeleteSecurityRequirementsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      deletedSecurityRequirementNames: SecurityRequirementNameList,
      errors: BatchSecurityRequirementErrors,
    }),
).annotate({
  identifier: "BatchDeleteSecurityRequirementsOutput",
}) as any as S.Schema<BatchDeleteSecurityRequirementsOutput>;
export type ThreatModelIdList = string[];
export const ThreatModelIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteThreatModelsInput {
  threatModelIds: string[];
  agentSpaceId: string;
}
export const BatchDeleteThreatModelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ threatModelIds: ThreatModelIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchDeleteThreatModels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteThreatModelsInput",
}) as any as S.Schema<BatchDeleteThreatModelsInput>;
export interface DeleteThreatModelFailure {
  threatModelId?: string;
  reason?: string;
}
export const DeleteThreatModelFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelId: S.optional(S.String),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteThreatModelFailure",
}) as any as S.Schema<DeleteThreatModelFailure>;
export type DeleteThreatModelFailureList = DeleteThreatModelFailure[];
export const DeleteThreatModelFailureList = /*@__PURE__*/ S.Array(
  DeleteThreatModelFailure,
);
export interface BatchDeleteThreatModelsOutput {
  deleted?: string[];
  failed?: DeleteThreatModelFailure[];
}
export const BatchDeleteThreatModelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deleted: S.optional(ThreatModelIdList),
    failed: S.optional(DeleteThreatModelFailureList),
  }),
).annotate({
  identifier: "BatchDeleteThreatModelsOutput",
}) as any as S.Schema<BatchDeleteThreatModelsOutput>;
export type AgentSpaceIdList = string[];
export const AgentSpaceIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetAgentSpacesInput {
  agentSpaceIds: string[];
}
export const BatchGetAgentSpacesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceIds: AgentSpaceIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetAgentSpaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetAgentSpacesInput",
}) as any as S.Schema<BatchGetAgentSpacesInput>;
export type VpcConfigs = VpcConfig[];
export const VpcConfigs = /*@__PURE__*/ S.Array(VpcConfig);
export type LogGroupArn = string;
export type LogGroupArns = string[];
export const LogGroupArns = /*@__PURE__*/ S.Array(S.String);
export type S3BucketArn = string;
export type S3BucketArns = string[];
export const S3BucketArns = /*@__PURE__*/ S.Array(S.String);
export type SecretArn = string;
export type SecretArns = string[];
export const SecretArns = /*@__PURE__*/ S.Array(S.String);
export type LambdaFunctionArn = string;
export type LambdaFunctionArns = string[];
export const LambdaFunctionArns = /*@__PURE__*/ S.Array(S.String);
export type IamRoles = string[];
export const IamRoles = /*@__PURE__*/ S.Array(S.String);
export interface AWSResources {
  vpcs?: VpcConfig[];
  logGroups?: string[];
  s3Buckets?: string[];
  secretArns?: string[];
  lambdaFunctionArns?: string[];
  iamRoles?: string[];
}
export const AWSResources = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcs: S.optional(VpcConfigs),
    logGroups: S.optional(LogGroupArns),
    s3Buckets: S.optional(S3BucketArns),
    secretArns: S.optional(SecretArns),
    lambdaFunctionArns: S.optional(LambdaFunctionArns),
    iamRoles: S.optional(IamRoles),
  }),
).annotate({ identifier: "AWSResources" }) as any as S.Schema<AWSResources>;
export type TargetDomainIdList = string[];
export const TargetDomainIdList = /*@__PURE__*/ S.Array(S.String);
export interface CodeReviewSettings {
  controlsScanning: boolean;
  generalPurposeScanning: boolean;
}
export const CodeReviewSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ controlsScanning: S.Boolean, generalPurposeScanning: S.Boolean }),
).annotate({
  identifier: "CodeReviewSettings",
}) as any as S.Schema<CodeReviewSettings>;
export type KmsKeyId = string;
export interface AgentSpace {
  agentSpaceId: string;
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  kmsKeyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const AgentSpace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    name: S.String,
    description: S.optional(S.String),
    awsResources: S.optional(AWSResources),
    targetDomainIds: S.optional(TargetDomainIdList),
    codeReviewSettings: S.optional(CodeReviewSettings),
    kmsKeyId: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "AgentSpace" }) as any as S.Schema<AgentSpace>;
export type AgentSpaceList = AgentSpace[];
export const AgentSpaceList = /*@__PURE__*/ S.Array(AgentSpace);
export interface BatchGetAgentSpacesOutput {
  agentSpaces?: AgentSpace[];
  notFound?: string[];
}
export const BatchGetAgentSpacesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaces: S.optional(AgentSpaceList),
    notFound: S.optional(AgentSpaceIdList),
  }),
).annotate({
  identifier: "BatchGetAgentSpacesOutput",
}) as any as S.Schema<BatchGetAgentSpacesOutput>;
export type ArtifactIds = string[];
export const ArtifactIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetArtifactMetadataInput {
  agentSpaceId: string;
  artifactIds: string[];
}
export const BatchGetArtifactMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, artifactIds: ArtifactIds }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetArtifactMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetArtifactMetadataInput",
}) as any as S.Schema<BatchGetArtifactMetadataInput>;
export interface ArtifactMetadataItem {
  agentSpaceId: string;
  artifactId: string;
  fileName: string;
  updatedAt: Date;
}
export const ArtifactMetadataItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    artifactId: S.String,
    fileName: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ArtifactMetadataItem",
}) as any as S.Schema<ArtifactMetadataItem>;
export type ArtifactMetadataList = ArtifactMetadataItem[];
export const ArtifactMetadataList = /*@__PURE__*/ S.Array(ArtifactMetadataItem);
export interface BatchGetArtifactMetadataOutput {
  artifactMetadataList: ArtifactMetadataItem[];
}
export const BatchGetArtifactMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ artifactMetadataList: ArtifactMetadataList }),
).annotate({
  identifier: "BatchGetArtifactMetadataOutput",
}) as any as S.Schema<BatchGetArtifactMetadataOutput>;
export type CodeReviewJobIdList = string[];
export const CodeReviewJobIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCodeReviewJobsInput {
  codeReviewJobIds: string[];
  agentSpaceId: string;
}
export const BatchGetCodeReviewJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewJobIds: CodeReviewJobIdList,
    agentSpaceId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetCodeReviewJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetCodeReviewJobsInput",
}) as any as S.Schema<BatchGetCodeReviewJobsInput>;
export type JobStatus =
  | "IN_PROGRESS"
  | "STOPPING"
  | "STOPPED"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const JobStatus = /*@__PURE__*/ S.String;

export type StepName =
  | "PREFLIGHT"
  | "STATIC_ANALYSIS"
  | "PENTEST"
  | "FINALIZING"
  | "VALIDATION"
  | (string & {});
export const StepName = /*@__PURE__*/ S.String;

export type StepStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export const StepStatus = /*@__PURE__*/ S.String;

export interface Step {
  name?: StepName;
  status?: StepStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Step = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(StepName),
    status: S.optional(StepStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Step" }) as any as S.Schema<Step>;
export type StepList = Step[];
export const StepList = /*@__PURE__*/ S.Array(Step);
export type ContextType =
  | "ERROR"
  | "CLIENT_ERROR"
  | "WARNING"
  | "INFO"
  | (string & {});
export const ContextType = /*@__PURE__*/ S.String;

export interface ExecutionContext {
  contextType?: ContextType;
  context?: string;
  timestamp?: Date;
}
export const ExecutionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contextType: S.optional(ContextType),
    context: S.optional(S.String),
    timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExecutionContext",
}) as any as S.Schema<ExecutionContext>;
export type ExecutionContextList = ExecutionContext[];
export const ExecutionContextList = /*@__PURE__*/ S.Array(ExecutionContext);
export type ErrorCode =
  | "CLIENT_ERROR"
  | "INTERNAL_ERROR"
  | "STOPPED_BY_USER"
  | (string & {});
export const ErrorCode = /*@__PURE__*/ S.String;

export interface ErrorInformation {
  code?: ErrorCode;
  message?: string;
}
export const ErrorInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(ErrorCode), message: S.optional(S.String) }),
).annotate({
  identifier: "ErrorInformation",
}) as any as S.Schema<ErrorInformation>;
export interface CodeReviewJob {
  codeReviewJobId?: string;
  codeReviewId?: string;
  title?: string;
  overview?: string;
  status?: JobStatus;
  documents?: DocumentInfo[];
  sourceCode?: SourceCodeRepository[];
  steps?: Step[];
  executionContext?: ExecutionContext[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  errorInformation?: ErrorInformation;
  integratedRepositories?: IntegratedRepository[];
  codeRemediationStrategy?: CodeRemediationStrategy;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CodeReviewJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewJobId: S.optional(S.String),
    codeReviewId: S.optional(S.String),
    title: S.optional(S.String),
    overview: S.optional(S.String),
    status: S.optional(JobStatus),
    documents: S.optional(DocumentList),
    sourceCode: S.optional(SourceCodeRepositoryList),
    steps: S.optional(StepList),
    executionContext: S.optional(ExecutionContextList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    errorInformation: S.optional(ErrorInformation),
    integratedRepositories: S.optional(IntegratedRepositoryList),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "CodeReviewJob" }) as any as S.Schema<CodeReviewJob>;
export type CodeReviewJobList = CodeReviewJob[];
export const CodeReviewJobList = /*@__PURE__*/ S.Array(CodeReviewJob);
export interface BatchGetCodeReviewJobsOutput {
  codeReviewJobs?: CodeReviewJob[];
  notFound?: string[];
}
export const BatchGetCodeReviewJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewJobs: S.optional(CodeReviewJobList),
    notFound: S.optional(CodeReviewJobIdList),
  }),
).annotate({
  identifier: "BatchGetCodeReviewJobsOutput",
}) as any as S.Schema<BatchGetCodeReviewJobsOutput>;
export type TaskIdList = string[];
export const TaskIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCodeReviewJobTasksInput {
  agentSpaceId: string;
  codeReviewJobTaskIds: string[];
}
export const BatchGetCodeReviewJobTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, codeReviewJobTaskIds: TaskIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetCodeReviewJobTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetCodeReviewJobTasksInput",
}) as any as S.Schema<BatchGetCodeReviewJobTasksInput>;
export interface Category {
  name?: string;
  isPrimary?: boolean;
}
export const Category = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), isPrimary: S.optional(S.Boolean) }),
).annotate({ identifier: "Category" }) as any as S.Schema<Category>;
export type CategoryList = Category[];
export const CategoryList = /*@__PURE__*/ S.Array(Category);
export type TaskExecutionStatus =
  | "IN_PROGRESS"
  | "ABORTED"
  | "COMPLETED"
  | "INTERNAL_ERROR"
  | "FAILED"
  | (string & {});
export const TaskExecutionStatus = /*@__PURE__*/ S.String;

export type LogType = "CLOUDWATCH" | (string & {});
export const LogType = /*@__PURE__*/ S.String;

export interface LogLocation {
  logType?: LogType;
  cloudWatchLog?: CloudWatchLog;
}
export const LogLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logType: S.optional(LogType),
    cloudWatchLog: S.optional(CloudWatchLog),
  }),
).annotate({ identifier: "LogLocation" }) as any as S.Schema<LogLocation>;
export interface CodeReviewJobTask {
  taskId: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  agentSpaceId?: string;
  title?: string;
  description?: string;
  categories?: Category[];
  riskType?: RiskType;
  executionStatus?: TaskExecutionStatus;
  logsLocation?: LogLocation;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CodeReviewJobTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    codeReviewId: S.optional(S.String),
    codeReviewJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    description: S.optional(S.String),
    categories: S.optional(CategoryList),
    riskType: S.optional(RiskType),
    executionStatus: S.optional(TaskExecutionStatus),
    logsLocation: S.optional(LogLocation),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodeReviewJobTask",
}) as any as S.Schema<CodeReviewJobTask>;
export type CodeReviewJobTaskList = CodeReviewJobTask[];
export const CodeReviewJobTaskList = /*@__PURE__*/ S.Array(CodeReviewJobTask);
export interface BatchGetCodeReviewJobTasksOutput {
  codeReviewJobTasks?: CodeReviewJobTask[];
  notFound?: string[];
}
export const BatchGetCodeReviewJobTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewJobTasks: S.optional(CodeReviewJobTaskList),
    notFound: S.optional(TaskIdList),
  }),
).annotate({
  identifier: "BatchGetCodeReviewJobTasksOutput",
}) as any as S.Schema<BatchGetCodeReviewJobTasksOutput>;
export interface BatchGetCodeReviewsInput {
  codeReviewIds: string[];
  agentSpaceId: string;
}
export const BatchGetCodeReviewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ codeReviewIds: CodeReviewIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetCodeReviews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetCodeReviewsInput",
}) as any as S.Schema<BatchGetCodeReviewsInput>;
export type ValidationMode = "DISABLED" | "SIMULATED" | (string & {});
export const ValidationMode = /*@__PURE__*/ S.String;

export interface CodeReview {
  codeReviewId: string;
  agentSpaceId: string;
  title: string;
  assets: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CodeReview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewId: S.String,
    agentSpaceId: S.String,
    title: S.String,
    assets: Assets,
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    validationMode: S.optional(ValidationMode),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "CodeReview" }) as any as S.Schema<CodeReview>;
export type CodeReviewList = CodeReview[];
export const CodeReviewList = /*@__PURE__*/ S.Array(CodeReview);
export interface BatchGetCodeReviewsOutput {
  codeReviews?: CodeReview[];
  notFound?: string[];
}
export const BatchGetCodeReviewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviews: S.optional(CodeReviewList),
    notFound: S.optional(CodeReviewIdList),
  }),
).annotate({
  identifier: "BatchGetCodeReviewsOutput",
}) as any as S.Schema<BatchGetCodeReviewsOutput>;
export type FindingIdList = string[];
export const FindingIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetFindingsInput {
  findingIds: string[];
  agentSpaceId: string;
}
export const BatchGetFindingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ findingIds: FindingIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetFindingsInput",
}) as any as S.Schema<BatchGetFindingsInput>;
export type FindingStatus =
  | "ACTIVE"
  | "RESOLVED"
  | "ACCEPTED"
  | "FALSE_POSITIVE"
  | (string & {});
export const FindingStatus = /*@__PURE__*/ S.String;

export type RiskLevel =
  | "UNKNOWN"
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export const RiskLevel = /*@__PURE__*/ S.String;

export type ConfidenceLevel =
  | "FALSE_POSITIVE"
  | "UNCONFIRMED"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const ConfidenceLevel = /*@__PURE__*/ S.String;

export type ValidationStatus =
  | "CONFIRMED"
  | "NOT_REPRODUCED"
  | "VALIDATION_FAILED"
  | "VALIDATING"
  | "NOT_VALIDATED"
  | (string & {});
export const ValidationStatus = /*@__PURE__*/ S.String;

export type CodeRemediationTaskStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const CodeRemediationTaskStatus = /*@__PURE__*/ S.String;

export interface CodeRemediationTaskDetails {
  repoName?: string;
  codeDiffLink?: string;
  pullRequestLink?: string;
}
export const CodeRemediationTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repoName: S.optional(S.String),
    codeDiffLink: S.optional(S.String),
    pullRequestLink: S.optional(S.String),
  }),
).annotate({
  identifier: "CodeRemediationTaskDetails",
}) as any as S.Schema<CodeRemediationTaskDetails>;
export type CodeRemediationTaskDetailsList = CodeRemediationTaskDetails[];
export const CodeRemediationTaskDetailsList = /*@__PURE__*/ S.Array(
  CodeRemediationTaskDetails,
);
export interface CodeRemediationTask {
  status: CodeRemediationTaskStatus;
  statusReason?: string;
  taskDetails?: CodeRemediationTaskDetails[];
}
export const CodeRemediationTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: CodeRemediationTaskStatus,
    statusReason: S.optional(S.String),
    taskDetails: S.optional(CodeRemediationTaskDetailsList),
  }),
).annotate({
  identifier: "CodeRemediationTask",
}) as any as S.Schema<CodeRemediationTask>;
export interface CodeLocation {
  filePath: string;
  lineStart?: number;
  lineEnd?: number;
  label?: string;
}
export const CodeLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filePath: S.String,
    lineStart: S.optional(S.Number),
    lineEnd: S.optional(S.Number),
    label: S.optional(S.String),
  }),
).annotate({ identifier: "CodeLocation" }) as any as S.Schema<CodeLocation>;
export type CodeLocationList = CodeLocation[];
export const CodeLocationList = /*@__PURE__*/ S.Array(CodeLocation);
export interface VerificationScriptEnvVar {
  name?: string;
  value?: string;
}
export const VerificationScriptEnvVar = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "VerificationScriptEnvVar",
}) as any as S.Schema<VerificationScriptEnvVar>;
export type VerificationScriptEnvVarList = VerificationScriptEnvVar[];
export const VerificationScriptEnvVarList = /*@__PURE__*/ S.Array(
  VerificationScriptEnvVar,
);
export interface VerificationScript {
  scriptType?: string;
  scriptUrl?: string;
  instructions?: string;
  envVars?: VerificationScriptEnvVar[];
}
export const VerificationScript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scriptType: S.optional(S.String),
    scriptUrl: S.optional(S.String),
    instructions: S.optional(S.String),
    envVars: S.optional(VerificationScriptEnvVarList),
  }),
).annotate({
  identifier: "VerificationScript",
}) as any as S.Schema<VerificationScript>;
export interface Finding {
  findingId: string;
  agentSpaceId: string;
  pentestId?: string;
  pentestJobId?: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  taskId?: string;
  name?: string;
  description?: string;
  status?: FindingStatus;
  riskType?: string;
  riskLevel?: RiskLevel;
  riskScore?: string;
  reasoning?: string;
  confidence?: ConfidenceLevel;
  validationStatus?: ValidationStatus;
  attackScript?: string;
  codeRemediationTask?: CodeRemediationTask;
  lastUpdatedBy?: string;
  customerNote?: string;
  codeLocations?: CodeLocation[];
  verificationScript?: VerificationScript;
  alignmentRationale?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.String,
    agentSpaceId: S.String,
    pentestId: S.optional(S.String),
    pentestJobId: S.optional(S.String),
    codeReviewId: S.optional(S.String),
    codeReviewJobId: S.optional(S.String),
    taskId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(FindingStatus),
    riskType: S.optional(S.String),
    riskLevel: S.optional(RiskLevel),
    riskScore: S.optional(S.String),
    reasoning: S.optional(S.String),
    confidence: S.optional(ConfidenceLevel),
    validationStatus: S.optional(ValidationStatus),
    attackScript: S.optional(S.String),
    codeRemediationTask: S.optional(CodeRemediationTask),
    lastUpdatedBy: S.optional(S.String),
    customerNote: S.optional(S.String),
    codeLocations: S.optional(CodeLocationList),
    verificationScript: S.optional(VerificationScript),
    alignmentRationale: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type FindingList = Finding[];
export const FindingList = /*@__PURE__*/ S.Array(Finding);
export interface BatchGetFindingsOutput {
  findings?: Finding[];
  notFound?: string[];
}
export const BatchGetFindingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findings: S.optional(FindingList),
    notFound: S.optional(FindingIdList),
  }),
).annotate({
  identifier: "BatchGetFindingsOutput",
}) as any as S.Schema<BatchGetFindingsOutput>;
export type PentestJobIdList = string[];
export const PentestJobIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetPentestJobsInput {
  pentestJobIds: string[];
  agentSpaceId: string;
}
export const BatchGetPentestJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pentestJobIds: PentestJobIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetPentestJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetPentestJobsInput",
}) as any as S.Schema<BatchGetPentestJobsInput>;
export interface PentestJob {
  pentestJobId?: string;
  pentestId?: string;
  title?: string;
  overview?: string;
  status?: JobStatus;
  endpoints?: Endpoint[];
  actors?: Actor[];
  documents?: DocumentInfo[];
  sourceCode?: SourceCodeRepository[];
  excludePaths?: Endpoint[];
  allowedDomains?: Endpoint[];
  excludeRiskTypes?: RiskType[];
  steps?: Step[];
  executionContext?: ExecutionContext[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  errorInformation?: ErrorInformation;
  integratedRepositories?: IntegratedRepository[];
  codeRemediationStrategy?: CodeRemediationStrategy;
  cleanUpStrategy?: CleanUpStrategy;
  disableManagedSkills?: SkillType[];
  createdAt?: Date;
  updatedAt?: Date;
}
export const PentestJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestJobId: S.optional(S.String),
    pentestId: S.optional(S.String),
    title: S.optional(S.String),
    overview: S.optional(S.String),
    status: S.optional(JobStatus),
    endpoints: S.optional(EndpointList),
    actors: S.optional(ActorList),
    documents: S.optional(DocumentList),
    sourceCode: S.optional(SourceCodeRepositoryList),
    excludePaths: S.optional(EndpointList),
    allowedDomains: S.optional(EndpointList),
    excludeRiskTypes: S.optional(RiskTypeList),
    steps: S.optional(StepList),
    executionContext: S.optional(ExecutionContextList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    vpcConfig: S.optional(VpcConfig),
    networkTrafficConfig: S.optional(NetworkTrafficConfig),
    errorInformation: S.optional(ErrorInformation),
    integratedRepositories: S.optional(IntegratedRepositoryList),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    cleanUpStrategy: S.optional(CleanUpStrategy),
    disableManagedSkills: S.optional(SkillTypeList),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "PentestJob" }) as any as S.Schema<PentestJob>;
export type PentestJobList = PentestJob[];
export const PentestJobList = /*@__PURE__*/ S.Array(PentestJob);
export interface BatchGetPentestJobsOutput {
  pentestJobs?: PentestJob[];
  notFound?: string[];
}
export const BatchGetPentestJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestJobs: S.optional(PentestJobList),
    notFound: S.optional(PentestJobIdList),
  }),
).annotate({
  identifier: "BatchGetPentestJobsOutput",
}) as any as S.Schema<BatchGetPentestJobsOutput>;
export interface BatchGetPentestJobTasksInput {
  agentSpaceId: string;
  taskIds: string[];
}
export const BatchGetPentestJobTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, taskIds: TaskIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetPentestJobTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetPentestJobTasksInput",
}) as any as S.Schema<BatchGetPentestJobTasksInput>;
export interface Task {
  taskId: string;
  pentestId?: string;
  pentestJobId?: string;
  agentSpaceId?: string;
  title?: string;
  description?: string;
  categories?: Category[];
  riskType?: RiskType;
  targetEndpoint?: Endpoint;
  executionStatus?: TaskExecutionStatus;
  logsLocation?: LogLocation;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Task = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    pentestId: S.optional(S.String),
    pentestJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    description: S.optional(S.String),
    categories: S.optional(CategoryList),
    riskType: S.optional(RiskType),
    targetEndpoint: S.optional(Endpoint),
    executionStatus: S.optional(TaskExecutionStatus),
    logsLocation: S.optional(LogLocation),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Task" }) as any as S.Schema<Task>;
export type TaskList = Task[];
export const TaskList = /*@__PURE__*/ S.Array(Task);
export interface BatchGetPentestJobTasksOutput {
  tasks?: Task[];
  notFound?: string[];
}
export const BatchGetPentestJobTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tasks: S.optional(TaskList), notFound: S.optional(TaskIdList) }),
).annotate({
  identifier: "BatchGetPentestJobTasksOutput",
}) as any as S.Schema<BatchGetPentestJobTasksOutput>;
export interface BatchGetPentestsInput {
  pentestIds: string[];
  agentSpaceId: string;
}
export const BatchGetPentestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pentestIds: PentestIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetPentests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetPentestsInput",
}) as any as S.Schema<BatchGetPentestsInput>;
export interface BatchGetPentestsOutput {
  pentests?: Pentest[];
  notFound?: string[];
}
export const BatchGetPentestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentests: S.optional(PentestList),
    notFound: S.optional(PentestIdList),
  }),
).annotate({
  identifier: "BatchGetPentestsOutput",
}) as any as S.Schema<BatchGetPentestsOutput>;
export interface BatchGetSecurityRequirementsInput {
  packId: string;
  securityRequirementNames: string[];
}
export const BatchGetSecurityRequirementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    securityRequirementNames: SecurityRequirementNameList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetSecurityRequirements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetSecurityRequirementsInput",
}) as any as S.Schema<BatchGetSecurityRequirementsInput>;
export interface BatchGetSecurityRequirementResult {
  packId: string;
  name: string;
  description: string;
  domain: string;
  evaluation: string;
  remediation?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const BatchGetSecurityRequirementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    name: S.String,
    description: S.String,
    domain: S.String,
    evaluation: S.String,
    remediation: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "BatchGetSecurityRequirementResult",
}) as any as S.Schema<BatchGetSecurityRequirementResult>;
export type BatchGetSecurityRequirementResultList =
  BatchGetSecurityRequirementResult[];
export const BatchGetSecurityRequirementResultList = /*@__PURE__*/ S.Array(
  BatchGetSecurityRequirementResult,
);
export interface BatchGetSecurityRequirementsOutput {
  securityRequirements: BatchGetSecurityRequirementResult[];
  errors: BatchSecurityRequirementError[];
}
export const BatchGetSecurityRequirementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityRequirements: BatchGetSecurityRequirementResultList,
    errors: BatchSecurityRequirementErrors,
  }),
).annotate({
  identifier: "BatchGetSecurityRequirementsOutput",
}) as any as S.Schema<BatchGetSecurityRequirementsOutput>;
export interface BatchGetTargetDomainsInput {
  targetDomainIds: string[];
}
export const BatchGetTargetDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDomainIds: TargetDomainIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetTargetDomains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetTargetDomainsInput",
}) as any as S.Schema<BatchGetTargetDomainsInput>;
export type TargetDomainId = string;
export type TargetDomainStatus =
  | "PENDING"
  | "VERIFIED"
  | "FAILED"
  | "UNREACHABLE"
  | (string & {});
export const TargetDomainStatus = /*@__PURE__*/ S.String;

export type DomainVerificationMethod =
  | "DNS_TXT"
  | "HTTP_ROUTE"
  | "PRIVATE_VPC"
  | (string & {});
export const DomainVerificationMethod = /*@__PURE__*/ S.String;

export type DNSRecordType = "TXT" | (string & {});
export const DNSRecordType = /*@__PURE__*/ S.String;

export interface DnsVerification {
  token?: string;
  dnsRecordName?: string;
  dnsRecordType?: DNSRecordType;
}
export const DnsVerification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    token: S.optional(S.String),
    dnsRecordName: S.optional(S.String),
    dnsRecordType: S.optional(DNSRecordType),
  }),
).annotate({
  identifier: "DnsVerification",
}) as any as S.Schema<DnsVerification>;
export interface HttpVerification {
  token?: string;
  routePath?: string;
}
export const HttpVerification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ token: S.optional(S.String), routePath: S.optional(S.String) }),
).annotate({
  identifier: "HttpVerification",
}) as any as S.Schema<HttpVerification>;
export interface VerificationDetails {
  method?: DomainVerificationMethod;
  dnsTxt?: DnsVerification;
  httpRoute?: HttpVerification;
}
export const VerificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    method: S.optional(DomainVerificationMethod),
    dnsTxt: S.optional(DnsVerification),
    httpRoute: S.optional(HttpVerification),
  }),
).annotate({
  identifier: "VerificationDetails",
}) as any as S.Schema<VerificationDetails>;
export interface TargetDomain {
  targetDomainId: string;
  domainName: string;
  verificationStatus?: TargetDomainStatus;
  verificationStatusReason?: string;
  verificationDetails?: VerificationDetails;
  createdAt?: Date;
  verifiedAt?: Date;
}
export const TargetDomain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainId: S.String,
    domainName: S.String,
    verificationStatus: S.optional(TargetDomainStatus),
    verificationStatusReason: S.optional(S.String),
    verificationDetails: S.optional(VerificationDetails),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    verifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "TargetDomain" }) as any as S.Schema<TargetDomain>;
export type TargetDomainList = TargetDomain[];
export const TargetDomainList = /*@__PURE__*/ S.Array(TargetDomain);
export interface BatchGetTargetDomainsOutput {
  targetDomains?: TargetDomain[];
  notFound?: string[];
}
export const BatchGetTargetDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomains: S.optional(TargetDomainList),
    notFound: S.optional(TargetDomainIdList),
  }),
).annotate({
  identifier: "BatchGetTargetDomainsOutput",
}) as any as S.Schema<BatchGetTargetDomainsOutput>;
export type ThreatModelJobIdList = string[];
export const ThreatModelJobIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetThreatModelJobsInput {
  threatModelJobIds: string[];
  agentSpaceId: string;
}
export const BatchGetThreatModelJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobIds: ThreatModelJobIdList,
    agentSpaceId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetThreatModelJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetThreatModelJobsInput",
}) as any as S.Schema<BatchGetThreatModelJobsInput>;
export interface ThreatModelJob {
  threatModelJobId?: string;
  threatModelId?: string;
  agentSpaceId?: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  executionStartTime?: Date;
  executionEndTime?: Date;
  sourceCode?: SourceCodeRepository[];
  integratedRepositories?: IntegratedRepository[];
  documents?: DocumentInfo[];
  scopeDocs?: DocumentInfo[];
  errorInformation?: ErrorInformation;
  systemOverview?: string;
}
export const ThreatModelJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobId: S.optional(S.String),
    threatModelId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    executionStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    executionEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    sourceCode: S.optional(SourceCodeRepositoryList),
    integratedRepositories: S.optional(IntegratedRepositoryList),
    documents: S.optional(DocumentList),
    scopeDocs: S.optional(DocumentList),
    errorInformation: S.optional(ErrorInformation),
    systemOverview: S.optional(S.String),
  }),
).annotate({ identifier: "ThreatModelJob" }) as any as S.Schema<ThreatModelJob>;
export type ThreatModelJobList = ThreatModelJob[];
export const ThreatModelJobList = /*@__PURE__*/ S.Array(ThreatModelJob);
export interface BatchGetThreatModelJobsOutput {
  threatModelJobs?: ThreatModelJob[];
  notFound?: string[];
}
export const BatchGetThreatModelJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobs: S.optional(ThreatModelJobList),
    notFound: S.optional(ThreatModelJobIdList),
  }),
).annotate({
  identifier: "BatchGetThreatModelJobsOutput",
}) as any as S.Schema<BatchGetThreatModelJobsOutput>;
export interface BatchGetThreatModelJobTasksInput {
  agentSpaceId: string;
  threatModelJobTaskIds: string[];
}
export const BatchGetThreatModelJobTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, threatModelJobTaskIds: TaskIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetThreatModelJobTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetThreatModelJobTasksInput",
}) as any as S.Schema<BatchGetThreatModelJobTasksInput>;
export interface ThreatModelJobTask {
  taskId: string;
  threatModelId?: string;
  threatModelJobId?: string;
  agentSpaceId?: string;
  title?: string;
  description?: string;
  executionStatus?: TaskExecutionStatus;
  logsLocation?: LogLocation;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ThreatModelJobTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    threatModelId: S.optional(S.String),
    threatModelJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    description: S.optional(S.String),
    executionStatus: S.optional(TaskExecutionStatus),
    logsLocation: S.optional(LogLocation),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ThreatModelJobTask",
}) as any as S.Schema<ThreatModelJobTask>;
export type ThreatModelJobTaskList = ThreatModelJobTask[];
export const ThreatModelJobTaskList = /*@__PURE__*/ S.Array(ThreatModelJobTask);
export interface BatchGetThreatModelJobTasksOutput {
  threatModelJobTasks?: ThreatModelJobTask[];
  notFound?: string[];
}
export const BatchGetThreatModelJobTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobTasks: S.optional(ThreatModelJobTaskList),
    notFound: S.optional(TaskIdList),
  }),
).annotate({
  identifier: "BatchGetThreatModelJobTasksOutput",
}) as any as S.Schema<BatchGetThreatModelJobTasksOutput>;
export interface BatchGetThreatModelsInput {
  threatModelIds: string[];
  agentSpaceId: string;
}
export const BatchGetThreatModelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ threatModelIds: ThreatModelIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetThreatModels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetThreatModelsInput",
}) as any as S.Schema<BatchGetThreatModelsInput>;
export interface ThreatModel {
  threatModelId: string;
  agentSpaceId: string;
  title: string;
  description?: string;
  assets: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ThreatModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelId: S.String,
    agentSpaceId: S.String,
    title: S.String,
    description: S.optional(S.String),
    assets: Assets,
    scopeDocs: S.optional(DocumentList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ThreatModel" }) as any as S.Schema<ThreatModel>;
export type ThreatModelList = ThreatModel[];
export const ThreatModelList = /*@__PURE__*/ S.Array(ThreatModel);
export interface BatchGetThreatModelsOutput {
  threatModels?: ThreatModel[];
  notFound?: string[];
}
export const BatchGetThreatModelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModels: S.optional(ThreatModelList),
    notFound: S.optional(ThreatModelIdList),
  }),
).annotate({
  identifier: "BatchGetThreatModelsOutput",
}) as any as S.Schema<BatchGetThreatModelsOutput>;
export type ThreatIdList = string[];
export const ThreatIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetThreatsInput {
  threatIds: string[];
  agentSpaceId: string;
}
export const BatchGetThreatsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ threatIds: ThreatIdList, agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetThreats" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetThreatsInput",
}) as any as S.Schema<BatchGetThreatsInput>;
export type ThreatSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFO"
  | (string & {});
export const ThreatSeverity = /*@__PURE__*/ S.String;

export type ThreatStatus = "OPEN" | "RESOLVED" | "DISMISSED" | (string & {});
export const ThreatStatus = /*@__PURE__*/ S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface ThreatAnchorShape {
  kind?: string;
  id?: string;
  packageId?: string;
}
export const ThreatAnchorShape = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kind: S.optional(S.String),
    id: S.optional(S.String),
    packageId: S.optional(S.String),
  }),
).annotate({
  identifier: "ThreatAnchorShape",
}) as any as S.Schema<ThreatAnchorShape>;
export interface ThreatEvidenceShape {
  packageId?: string;
  path?: string;
}
export const ThreatEvidenceShape = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packageId: S.optional(S.String), path: S.optional(S.String) }),
).annotate({
  identifier: "ThreatEvidenceShape",
}) as any as S.Schema<ThreatEvidenceShape>;
export type ThreatEvidenceList = ThreatEvidenceShape[];
export const ThreatEvidenceList = /*@__PURE__*/ S.Array(ThreatEvidenceShape);
export type StrideCategory =
  | "SPOOFING"
  | "TAMPERING"
  | "REPUDIATION"
  | "INFORMATION_DISCLOSURE"
  | "DENIAL_OF_SERVICE"
  | "ELEVATION_OF_PRIVILEGE"
  | (string & {});
export const StrideCategory = /*@__PURE__*/ S.String;

export type StrideCategoryList = StrideCategory[];
export const StrideCategoryList = /*@__PURE__*/ S.Array(StrideCategory);
export type ThreatActor = "CUSTOMER" | "AGENT" | (string & {});
export const ThreatActor = /*@__PURE__*/ S.String;

export interface Threat {
  threatId?: string;
  threatJobId?: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  comments?: string;
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  stride?: StrideCategory[];
  recommendation?: string;
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export const Threat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatId: S.optional(S.String),
    threatJobId: S.optional(S.String),
    title: S.optional(S.String),
    statement: S.optional(S.String),
    severity: S.optional(ThreatSeverity),
    status: S.optional(ThreatStatus),
    comments: S.optional(S.String),
    threatSource: S.optional(S.String),
    prerequisites: S.optional(S.String),
    threatAction: S.optional(S.String),
    threatImpact: S.optional(S.String),
    impactedGoal: S.optional(StringList),
    impactedAssets: S.optional(StringList),
    anchor: S.optional(ThreatAnchorShape),
    evidence: S.optional(ThreatEvidenceList),
    stride: S.optional(StrideCategoryList),
    recommendation: S.optional(S.String),
    createdBy: S.optional(ThreatActor),
    updatedBy: S.optional(ThreatActor),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Threat" }) as any as S.Schema<Threat>;
export type ThreatList = Threat[];
export const ThreatList = /*@__PURE__*/ S.Array(Threat);
export interface BatchGetThreatsOutput {
  threats?: Threat[];
  notFound?: string[];
}
export const BatchGetThreatsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threats: S.optional(ThreatList),
    notFound: S.optional(ThreatIdList),
  }),
).annotate({
  identifier: "BatchGetThreatsOutput",
}) as any as S.Schema<BatchGetThreatsOutput>;
export interface UpdateSecurityRequirementEntry {
  name: string;
  description?: string;
  domain?: string;
  evaluation?: string;
  remediation?: string;
}
export const UpdateSecurityRequirementEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    domain: S.optional(S.String),
    evaluation: S.optional(S.String),
    remediation: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSecurityRequirementEntry",
}) as any as S.Schema<UpdateSecurityRequirementEntry>;
export type UpdateSecurityRequirementEntryList =
  UpdateSecurityRequirementEntry[];
export const UpdateSecurityRequirementEntryList = /*@__PURE__*/ S.Array(
  UpdateSecurityRequirementEntry,
);
export interface BatchUpdateSecurityRequirementsInput {
  packId: string;
  securityRequirements: UpdateSecurityRequirementEntry[];
}
export const BatchUpdateSecurityRequirementsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      packId: S.String,
      securityRequirements: UpdateSecurityRequirementEntryList,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/BatchUpdateSecurityRequirements" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchUpdateSecurityRequirementsInput",
}) as any as S.Schema<BatchUpdateSecurityRequirementsInput>;
export interface BatchUpdateSecurityRequirementsOutput {
  updatedSecurityRequirementNames: string[];
  errors: BatchSecurityRequirementError[];
}
export const BatchUpdateSecurityRequirementsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      updatedSecurityRequirementNames: SecurityRequirementNameList,
      errors: BatchSecurityRequirementErrors,
    }),
).annotate({
  identifier: "BatchUpdateSecurityRequirementsOutput",
}) as any as S.Schema<BatchUpdateSecurityRequirementsOutput>;
export type AgentName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateAgentSpaceInput {
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAgentSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    awsResources: S.optional(AWSResources),
    targetDomainIds: S.optional(TargetDomainIdList),
    codeReviewSettings: S.optional(CodeReviewSettings),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateAgentSpace" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAgentSpaceInput",
}) as any as S.Schema<CreateAgentSpaceInput>;
export interface CreateAgentSpaceOutput {
  agentSpaceId: string;
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  kmsKeyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CreateAgentSpaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    name: S.String,
    description: S.optional(S.String),
    awsResources: S.optional(AWSResources),
    targetDomainIds: S.optional(TargetDomainIdList),
    codeReviewSettings: S.optional(CodeReviewSettings),
    kmsKeyId: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateAgentSpaceOutput",
}) as any as S.Schema<CreateAgentSpaceOutput>;
export type IdCInstanceArn = string;
export type RoleArn = string;
export type DefaultKmsKeyId = string;
export interface CreateApplicationRequest {
  idcInstanceArn?: string;
  roleArn?: string;
  defaultKmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idcInstanceArn: S.optional(S.String),
    roleArn: S.optional(S.String),
    defaultKmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateApplication" }),
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
export type ApplicationId = string;
export interface CreateApplicationResponse {
  applicationId: string;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export interface CreateCodeReviewInput {
  title: string;
  agentSpaceId: string;
  assets: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
}
export const CreateCodeReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    agentSpaceId: S.String,
    assets: Assets,
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    validationMode: S.optional(ValidationMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateCodeReview" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCodeReviewInput",
}) as any as S.Schema<CreateCodeReviewInput>;
export interface CreateCodeReviewOutput {
  codeReviewId: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
}
export const CreateCodeReviewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewId: S.String,
    title: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    assets: S.optional(Assets),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    agentSpaceId: S.optional(S.String),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    validationMode: S.optional(ValidationMode),
  }),
).annotate({
  identifier: "CreateCodeReviewOutput",
}) as any as S.Schema<CreateCodeReviewOutput>;
export type Provider =
  | "GITHUB"
  | "GITLAB"
  | "BITBUCKET"
  | "CONFLUENCE"
  | (string & {});
export const Provider = /*@__PURE__*/ S.String;

export type AuthCode = string;
export type CsrfState = string;
export type TargetUrl = string;
export interface GitHubIntegrationInput {
  code: string;
  state: string;
  organizationName?: string;
  targetUrl?: string;
  installationId?: string;
}
export const GitHubIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: S.String,
    state: S.String,
    organizationName: S.optional(S.String),
    targetUrl: S.optional(S.String),
    installationId: S.optional(S.String),
  }),
).annotate({
  identifier: "GitHubIntegrationInput",
}) as any as S.Schema<GitHubIntegrationInput>;
export type AccessToken = string | redacted.Redacted<string>;
export type GitLabTokenType = "PERSONAL" | "GROUP" | (string & {});
export const GitLabTokenType = /*@__PURE__*/ S.String;

export interface GitLabIntegrationInput {
  accessToken: string | redacted.Redacted<string>;
  targetUrl?: string;
  tokenType: GitLabTokenType;
  groupId?: string;
}
export const GitLabIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessToken: SensitiveString,
    targetUrl: S.optional(S.String),
    tokenType: GitLabTokenType,
    groupId: S.optional(S.String),
  }),
).annotate({
  identifier: "GitLabIntegrationInput",
}) as any as S.Schema<GitLabIntegrationInput>;
export type BitbucketInstallationId = string;
export type BitbucketWorkspace = string;
export interface BitbucketIntegrationInput {
  installationId: string;
  workspace: string;
  code: string;
  state: string;
}
export const BitbucketIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    installationId: S.String,
    workspace: S.String,
    code: S.String,
    state: S.String,
  }),
).annotate({
  identifier: "BitbucketIntegrationInput",
}) as any as S.Schema<BitbucketIntegrationInput>;
export type ConfluenceInstallationId = string;
export type ConfluenceSiteUrl = string;
export interface ConfluenceIntegrationInput {
  installationId: string;
  code: string;
  state: string;
  siteUrl: string;
}
export const ConfluenceIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    installationId: S.String,
    code: S.String,
    state: S.String,
    siteUrl: S.String,
  }),
).annotate({
  identifier: "ConfluenceIntegrationInput",
}) as any as S.Schema<ConfluenceIntegrationInput>;
export type ProviderInput =
  | {
      github: GitHubIntegrationInput;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab: GitLabIntegrationInput;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket: BitbucketIntegrationInput;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence: ConfluenceIntegrationInput;
    };
export const ProviderInput = /*@__PURE__*/ S.Union([
  S.Struct({ github: GitHubIntegrationInput }),
  S.Struct({ gitlab: GitLabIntegrationInput }),
  S.Struct({ bitbucket: BitbucketIntegrationInput }),
  S.Struct({ confluence: ConfluenceIntegrationInput }),
]);
export type PrivateConnectionName = string;
export interface CreateIntegrationInput {
  provider: Provider;
  input: ProviderInput;
  integrationDisplayName: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  privateConnectionName?: string;
}
export const CreateIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: Provider,
    input: ProviderInput,
    integrationDisplayName: S.String,
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
    privateConnectionName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateIntegration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIntegrationInput",
}) as any as S.Schema<CreateIntegrationInput>;
export type IntegrationId = string;
export interface CreateIntegrationOutput {
  integrationId: string;
}
export const CreateIntegrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ integrationId: S.String }),
).annotate({
  identifier: "CreateIntegrationOutput",
}) as any as S.Schema<CreateIntegrationOutput>;
export type MembershipId = string;
export type MembershipType = "USER" | (string & {});
export const MembershipType = /*@__PURE__*/ S.String;

export type UserRole = "MEMBER" | (string & {});
export const UserRole = /*@__PURE__*/ S.String;

export interface UserConfig {
  role?: UserRole;
}
export const UserConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ role: S.optional(UserRole) }),
).annotate({ identifier: "UserConfig" }) as any as S.Schema<UserConfig>;
export type MembershipConfig = { user: UserConfig };
export const MembershipConfig = /*@__PURE__*/ S.Union([
  S.Struct({ user: UserConfig }),
]);
export interface CreateMembershipRequest {
  applicationId: string;
  agentSpaceId: string;
  membershipId: string;
  memberType: MembershipType;
  config?: MembershipConfig;
}
export const CreateMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    agentSpaceId: S.String,
    membershipId: S.String,
    memberType: MembershipType,
    config: S.optional(MembershipConfig),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateMembership" }),
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
export interface CreateMembershipResponse {}
export const CreateMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateMembershipResponse",
}) as any as S.Schema<CreateMembershipResponse>;
export interface CreatePentestInput {
  title: string;
  agentSpaceId: string;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  codeRemediationStrategy?: CodeRemediationStrategy;
  disableManagedSkills?: SkillType[];
}
export const CreatePentestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    agentSpaceId: S.String,
    assets: S.optional(Assets),
    excludeRiskTypes: S.optional(RiskTypeList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    vpcConfig: S.optional(VpcConfig),
    networkTrafficConfig: S.optional(NetworkTrafficConfig),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    disableManagedSkills: S.optional(SkillTypeList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreatePentest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePentestInput",
}) as any as S.Schema<CreatePentestInput>;
export interface CreatePentestOutput {
  pentestId?: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
}
export const CreatePentestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestId: S.optional(S.String),
    title: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    assets: S.optional(Assets),
    excludeRiskTypes: S.optional(RiskTypeList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    agentSpaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePentestOutput",
}) as any as S.Schema<CreatePentestOutput>;
export type HostAddress = string;
export type PrivateConnectionVpcId = string;
export type PrivateConnectionSubnetId = string;
export type PrivateConnectionSubnetIds = string[];
export const PrivateConnectionSubnetIds = /*@__PURE__*/ S.Array(S.String);
export type PrivateConnectionSecurityGroupId = string;
export type PrivateConnectionSecurityGroupIds = string[];
export const PrivateConnectionSecurityGroupIds = /*@__PURE__*/ S.Array(
  S.String,
);
export type IpAddressType = "IPV4" | "IPV6" | "DUAL_STACK" | (string & {});
export const IpAddressType = /*@__PURE__*/ S.String;

export type MaxIpv4AddressesPerEni = number;
export type PortRange = string;
export type PortRanges = string[];
export const PortRanges = /*@__PURE__*/ S.Array(S.String);
export type CertificateChain = string | redacted.Redacted<string>;
export type ResourceConfigDnsResolution = "PUBLIC" | "IN_VPC" | (string & {});
export const ResourceConfigDnsResolution = /*@__PURE__*/ S.String;

export interface ServiceManagedInput {
  hostAddress: string;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds?: string[];
  ipAddressType?: IpAddressType;
  ipv4AddressesPerEni?: number;
  portRanges?: string[];
  certificate?: string | redacted.Redacted<string>;
  dnsResolution?: ResourceConfigDnsResolution;
}
export const ServiceManagedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostAddress: S.String,
    vpcId: S.String,
    subnetIds: PrivateConnectionSubnetIds,
    securityGroupIds: S.optional(PrivateConnectionSecurityGroupIds),
    ipAddressType: S.optional(IpAddressType),
    ipv4AddressesPerEni: S.optional(S.Number),
    portRanges: S.optional(PortRanges),
    certificate: S.optional(SensitiveString),
    dnsResolution: S.optional(ResourceConfigDnsResolution),
  }),
).annotate({
  identifier: "ServiceManagedInput",
}) as any as S.Schema<ServiceManagedInput>;
export type ResourceConfigurationId = string;
export interface SelfManagedInput {
  resourceConfigurationId: string;
  certificate?: string | redacted.Redacted<string>;
}
export const SelfManagedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceConfigurationId: S.String,
    certificate: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "SelfManagedInput",
}) as any as S.Schema<SelfManagedInput>;
export type PrivateConnectionMode =
  | { serviceManaged: ServiceManagedInput; selfManaged?: never }
  | { serviceManaged?: never; selfManaged: SelfManagedInput };
export const PrivateConnectionMode = /*@__PURE__*/ S.Union([
  S.Struct({ serviceManaged: ServiceManagedInput }),
  S.Struct({ selfManaged: SelfManagedInput }),
]);
export interface CreatePrivateConnectionInput {
  privateConnectionName: string;
  mode: PrivateConnectionMode;
  tags?: { [key: string]: string | undefined };
}
export const CreatePrivateConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    privateConnectionName: S.String,
    mode: PrivateConnectionMode,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreatePrivateConnection" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePrivateConnectionInput",
}) as any as S.Schema<CreatePrivateConnectionInput>;
export type PrivateConnectionType =
  | "SERVICE_MANAGED"
  | "SELF_MANAGED"
  | (string & {});
export const PrivateConnectionType = /*@__PURE__*/ S.String;

export type PrivateConnectionStatus =
  | "ACTIVE"
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | (string & {});
export const PrivateConnectionStatus = /*@__PURE__*/ S.String;

export type ResourceGatewayId = string;
export interface CreatePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreatePrivateConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: PrivateConnectionType,
    status: PrivateConnectionStatus,
    resourceGatewayId: S.optional(S.String),
    hostAddress: S.optional(S.String),
    vpcId: S.optional(S.String),
    resourceConfigurationId: S.optional(S.String),
    certificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsResolution: S.optional(ResourceConfigDnsResolution),
    failureMessage: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreatePrivateConnectionOutput",
}) as any as S.Schema<CreatePrivateConnectionOutput>;
export type SecurityRequirementPackName = string;
export type SecurityRequirementPackStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const SecurityRequirementPackStatus = /*@__PURE__*/ S.String;

export interface CreateSecurityRequirementPackInput {
  name: string;
  description?: string;
  status?: SecurityRequirementPackStatus;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSecurityRequirementPackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    status: S.optional(SecurityRequirementPackStatus),
    kmsKeyId: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateSecurityRequirementPack" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSecurityRequirementPackInput",
}) as any as S.Schema<CreateSecurityRequirementPackInput>;
export interface CreateSecurityRequirementPackOutput {
  packId: string;
  status: SecurityRequirementPackStatus;
  kmsKeyId?: string;
}
export const CreateSecurityRequirementPackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    status: SecurityRequirementPackStatus,
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateSecurityRequirementPackOutput",
}) as any as S.Schema<CreateSecurityRequirementPackOutput>;
export interface CreateTargetDomainInput {
  targetDomainName: string;
  verificationMethod: DomainVerificationMethod;
  tags?: { [key: string]: string | undefined };
}
export const CreateTargetDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainName: S.String,
    verificationMethod: DomainVerificationMethod,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateTargetDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTargetDomainInput",
}) as any as S.Schema<CreateTargetDomainInput>;
export interface CreateTargetDomainOutput {
  targetDomainId: string;
  domainName: string;
  verificationStatus: TargetDomainStatus;
  verificationStatusReason?: string;
  verificationDetails?: VerificationDetails;
  createdAt?: Date;
  verifiedAt?: Date;
}
export const CreateTargetDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainId: S.String,
    domainName: S.String,
    verificationStatus: TargetDomainStatus,
    verificationStatusReason: S.optional(S.String),
    verificationDetails: S.optional(VerificationDetails),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    verifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateTargetDomainOutput",
}) as any as S.Schema<CreateTargetDomainOutput>;
export interface CreateThreatInput {
  agentSpaceId: string;
  threatJobId: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  comments?: string;
  stride?: StrideCategory[];
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
}
export const CreateThreatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    threatJobId: S.String,
    title: S.optional(S.String),
    statement: S.optional(S.String),
    severity: S.optional(ThreatSeverity),
    comments: S.optional(S.String),
    stride: S.optional(StrideCategoryList),
    threatSource: S.optional(S.String),
    prerequisites: S.optional(S.String),
    threatAction: S.optional(S.String),
    threatImpact: S.optional(S.String),
    impactedGoal: S.optional(StringList),
    impactedAssets: S.optional(StringList),
    anchor: S.optional(ThreatAnchorShape),
    evidence: S.optional(ThreatEvidenceList),
    recommendation: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateThreat" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateThreatInput",
}) as any as S.Schema<CreateThreatInput>;
export interface CreateThreatOutput {
  threatId: string;
  threatJobId: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  comments?: string;
  stride?: StrideCategory[];
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CreateThreatOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatId: S.String,
    threatJobId: S.String,
    title: S.optional(S.String),
    statement: S.optional(S.String),
    severity: S.optional(ThreatSeverity),
    status: S.optional(ThreatStatus),
    comments: S.optional(S.String),
    stride: S.optional(StrideCategoryList),
    threatSource: S.optional(S.String),
    prerequisites: S.optional(S.String),
    threatAction: S.optional(S.String),
    threatImpact: S.optional(S.String),
    impactedGoal: S.optional(StringList),
    impactedAssets: S.optional(StringList),
    anchor: S.optional(ThreatAnchorShape),
    evidence: S.optional(ThreatEvidenceList),
    recommendation: S.optional(S.String),
    createdBy: S.optional(ThreatActor),
    updatedBy: S.optional(ThreatActor),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateThreatOutput",
}) as any as S.Schema<CreateThreatOutput>;
export interface ReportDestination {
  integrationId: string;
  containerId: string;
  parentId?: string;
  documentId?: string;
}
export const ReportDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integrationId: S.String,
    containerId: S.String,
    parentId: S.optional(S.String),
    documentId: S.optional(S.String),
  }),
).annotate({
  identifier: "ReportDestination",
}) as any as S.Schema<ReportDestination>;
export interface CreateThreatModelInput {
  title: string;
  agentSpaceId: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole: string;
  logConfig?: CloudWatchLog;
  reportDestination?: ReportDestination;
}
export const CreateThreatModelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    agentSpaceId: S.String,
    description: S.optional(S.String),
    assets: S.optional(Assets),
    scopeDocs: S.optional(DocumentList),
    serviceRole: S.String,
    logConfig: S.optional(CloudWatchLog),
    reportDestination: S.optional(ReportDestination),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateThreatModel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateThreatModelInput",
}) as any as S.Schema<CreateThreatModelInput>;
export interface CreateThreatModelOutput {
  threatModelId: string;
  title?: string;
  agentSpaceId?: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CreateThreatModelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelId: S.String,
    title: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    description: S.optional(S.String),
    assets: S.optional(Assets),
    scopeDocs: S.optional(DocumentList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateThreatModelOutput",
}) as any as S.Schema<CreateThreatModelOutput>;
export interface DeleteAgentSpaceInput {
  agentSpaceId: string;
}
export const DeleteAgentSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteAgentSpace" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAgentSpaceInput",
}) as any as S.Schema<DeleteAgentSpaceInput>;
export interface DeleteAgentSpaceOutput {
  agentSpaceId?: string;
}
export const DeleteAgentSpaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteAgentSpaceOutput",
}) as any as S.Schema<DeleteAgentSpaceOutput>;
export interface DeleteApplicationRequest {
  applicationId: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteApplication" }),
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
export interface DeleteArtifactInput {
  agentSpaceId: string;
  artifactId: string;
}
export const DeleteArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, artifactId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteArtifact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteArtifactInput",
}) as any as S.Schema<DeleteArtifactInput>;
export interface DeleteArtifactOutput {}
export const DeleteArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteArtifactOutput",
}) as any as S.Schema<DeleteArtifactOutput>;
export interface DeleteIntegrationInput {
  integrationId: string;
}
export const DeleteIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ integrationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteIntegration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntegrationInput",
}) as any as S.Schema<DeleteIntegrationInput>;
export interface DeleteIntegrationOutput {}
export const DeleteIntegrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationOutput",
}) as any as S.Schema<DeleteIntegrationOutput>;
export interface DeleteMembershipRequest {
  applicationId: string;
  agentSpaceId: string;
  membershipId: string;
  memberType?: MembershipType;
}
export const DeleteMembershipRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    agentSpaceId: S.String,
    membershipId: S.String,
    memberType: S.optional(MembershipType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteMembership" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMembershipRequest",
}) as any as S.Schema<DeleteMembershipRequest>;
export interface DeleteMembershipResponse {}
export const DeleteMembershipResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMembershipResponse",
}) as any as S.Schema<DeleteMembershipResponse>;
export interface DeletePrivateConnectionInput {
  privateConnectionName: string;
}
export const DeletePrivateConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privateConnectionName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeletePrivateConnection" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePrivateConnectionInput",
}) as any as S.Schema<DeletePrivateConnectionInput>;
export interface DeletePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const DeletePrivateConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: PrivateConnectionType,
    status: PrivateConnectionStatus,
    resourceGatewayId: S.optional(S.String),
    hostAddress: S.optional(S.String),
    vpcId: S.optional(S.String),
    resourceConfigurationId: S.optional(S.String),
    certificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsResolution: S.optional(ResourceConfigDnsResolution),
    failureMessage: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DeletePrivateConnectionOutput",
}) as any as S.Schema<DeletePrivateConnectionOutput>;
export interface DeleteSecurityRequirementPackInput {
  packId: string;
}
export const DeleteSecurityRequirementPackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteSecurityRequirementPack" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSecurityRequirementPackInput",
}) as any as S.Schema<DeleteSecurityRequirementPackInput>;
export interface DeleteSecurityRequirementPackOutput {}
export const DeleteSecurityRequirementPackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSecurityRequirementPackOutput",
}) as any as S.Schema<DeleteSecurityRequirementPackOutput>;
export interface DeleteTargetDomainInput {
  targetDomainId: string;
}
export const DeleteTargetDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDomainId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteTargetDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTargetDomainInput",
}) as any as S.Schema<DeleteTargetDomainInput>;
export interface DeleteTargetDomainOutput {
  targetDomainId?: string;
}
export const DeleteTargetDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDomainId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteTargetDomainOutput",
}) as any as S.Schema<DeleteTargetDomainOutput>;
export interface DescribePrivateConnectionInput {
  privateConnectionName: string;
}
export const DescribePrivateConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ privateConnectionName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribePrivateConnection" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePrivateConnectionInput",
}) as any as S.Schema<DescribePrivateConnectionInput>;
export interface DescribePrivateConnectionOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const DescribePrivateConnectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: PrivateConnectionType,
    status: PrivateConnectionStatus,
    resourceGatewayId: S.optional(S.String),
    hostAddress: S.optional(S.String),
    vpcId: S.optional(S.String),
    resourceConfigurationId: S.optional(S.String),
    certificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsResolution: S.optional(ResourceConfigDnsResolution),
    failureMessage: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribePrivateConnectionOutput",
}) as any as S.Schema<DescribePrivateConnectionOutput>;
export interface GetApplicationRequest {
  applicationId: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetApplication" }),
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
export type ApplicationDomain = string;
export type IdCApplicationArn = string;
export interface IdCConfiguration {
  idcApplicationArn?: string;
  idcInstanceArn?: string;
}
export const IdCConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    idcApplicationArn: S.optional(S.String),
    idcInstanceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IdCConfiguration",
}) as any as S.Schema<IdCConfiguration>;
export interface GetApplicationResponse {
  applicationId: string;
  domain: string;
  applicationName?: string;
  idcConfiguration?: IdCConfiguration;
  roleArn?: string;
  defaultKmsKeyId?: string;
}
export const GetApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    domain: S.String,
    applicationName: S.optional(S.String),
    idcConfiguration: S.optional(IdCConfiguration),
    roleArn: S.optional(S.String),
    defaultKmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetApplicationResponse",
}) as any as S.Schema<GetApplicationResponse>;
export interface GetArtifactInput {
  agentSpaceId: string;
  artifactId: string;
}
export const GetArtifactInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, artifactId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetArtifact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetArtifactInput",
}) as any as S.Schema<GetArtifactInput>;
export interface Artifact {
  contents: string;
  type: ArtifactType;
}
export const Artifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contents: S.String, type: ArtifactType }),
).annotate({ identifier: "Artifact" }) as any as S.Schema<Artifact>;
export interface GetArtifactOutput {
  agentSpaceId: string;
  artifactId: string;
  artifact: Artifact;
  fileName: string;
  updatedAt: Date;
}
export const GetArtifactOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    artifactId: S.String,
    artifact: Artifact,
    fileName: S.String,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetArtifactOutput",
}) as any as S.Schema<GetArtifactOutput>;
export interface GetIntegrationInput {
  integrationId: string;
}
export const GetIntegrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ integrationId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetIntegration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntegrationInput",
}) as any as S.Schema<GetIntegrationInput>;
export type ProviderType = "SOURCE_CODE" | "DOCUMENTATION" | (string & {});
export const ProviderType = /*@__PURE__*/ S.String;

export interface GetIntegrationOutput {
  integrationId: string;
  installationId: string;
  provider: Provider;
  providerType: ProviderType;
  displayName?: string;
  kmsKeyId?: string;
  targetUrl?: string;
  privateConnectionName?: string;
}
export const GetIntegrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integrationId: S.String,
    installationId: S.String,
    provider: Provider,
    providerType: ProviderType,
    displayName: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    targetUrl: S.optional(S.String),
    privateConnectionName: S.optional(S.String),
  }),
).annotate({
  identifier: "GetIntegrationOutput",
}) as any as S.Schema<GetIntegrationOutput>;
export interface GetSecurityRequirementPackInput {
  packId: string;
}
export const GetSecurityRequirementPackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetSecurityRequirementPack" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSecurityRequirementPackInput",
}) as any as S.Schema<GetSecurityRequirementPackInput>;
export type ManagementType = "AWS_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
export const ManagementType = /*@__PURE__*/ S.String;

export type SecurityRequirementPackImportStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const SecurityRequirementPackImportStatus = /*@__PURE__*/ S.String;

export interface GetSecurityRequirementPackOutput {
  packId: string;
  name: string;
  description?: string;
  vendorName?: string;
  managementType: ManagementType;
  status: SecurityRequirementPackStatus;
  importStatus?: SecurityRequirementPackImportStatus;
  createdAt: Date;
  updatedAt: Date;
  kmsKeyId?: string;
}
export const GetSecurityRequirementPackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    name: S.String,
    description: S.optional(S.String),
    vendorName: S.optional(S.String),
    managementType: ManagementType,
    status: SecurityRequirementPackStatus,
    importStatus: S.optional(SecurityRequirementPackImportStatus),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSecurityRequirementPackOutput",
}) as any as S.Schema<GetSecurityRequirementPackOutput>;
export type SecurityRequirementArtifactName = string;
export type SecurityRequirementArtifactFormat =
  | "MD"
  | "PDF"
  | "TXT"
  | "DOCX"
  | "DOC"
  | (string & {});
export const SecurityRequirementArtifactFormat = /*@__PURE__*/ S.String;

export type SecurityRequirementDocumentContent =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface SecurityRequirementArtifact {
  name: string;
  format: SecurityRequirementArtifactFormat;
  content: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const SecurityRequirementArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    format: SecurityRequirementArtifactFormat,
    content: SensitiveBlob,
  }),
).annotate({
  identifier: "SecurityRequirementArtifact",
}) as any as S.Schema<SecurityRequirementArtifact>;
export type SecurityRequirementArtifactList = SecurityRequirementArtifact[];
export const SecurityRequirementArtifactList = /*@__PURE__*/ S.Array(
  SecurityRequirementArtifact,
);
export type ImportSource = { documents: SecurityRequirementArtifact[] };
export const ImportSource = /*@__PURE__*/ S.Union([
  S.Struct({ documents: SecurityRequirementArtifactList }),
]);
export interface ImportSecurityRequirementsInput {
  packId: string;
  input: ImportSource;
}
export const ImportSecurityRequirementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ packId: S.String, input: ImportSource }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ImportSecurityRequirements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportSecurityRequirementsInput",
}) as any as S.Schema<ImportSecurityRequirementsInput>;
export interface ImportSecurityRequirementsOutput {
  packId: string;
  importStatus: SecurityRequirementPackImportStatus;
}
export const ImportSecurityRequirementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    importStatus: SecurityRequirementPackImportStatus,
  }),
).annotate({
  identifier: "ImportSecurityRequirementsOutput",
}) as any as S.Schema<ImportSecurityRequirementsOutput>;
export interface InitiateProviderRegistrationInput {
  provider: Provider;
}
export const InitiateProviderRegistrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ provider: Provider }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/oauth2/provider/register" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InitiateProviderRegistrationInput",
}) as any as S.Schema<InitiateProviderRegistrationInput>;
export type Location = string;
export interface InitiateProviderRegistrationOutput {
  redirectTo: string;
  csrfState: string;
}
export const InitiateProviderRegistrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ redirectTo: S.String, csrfState: S.String }),
).annotate({
  identifier: "InitiateProviderRegistrationOutput",
}) as any as S.Schema<InitiateProviderRegistrationOutput>;
export type NextToken = string;
export type MaxResults = number;
export interface ListAgentSpacesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListAgentSpacesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListAgentSpaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAgentSpacesInput",
}) as any as S.Schema<ListAgentSpacesInput>;
export interface AgentSpaceSummary {
  agentSpaceId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const AgentSpaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    name: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "AgentSpaceSummary",
}) as any as S.Schema<AgentSpaceSummary>;
export type AgentSpaceSummaryList = AgentSpaceSummary[];
export const AgentSpaceSummaryList = /*@__PURE__*/ S.Array(AgentSpaceSummary);
export interface ListAgentSpacesOutput {
  agentSpaceSummaries?: AgentSpaceSummary[];
  nextToken?: string;
}
export const ListAgentSpacesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceSummaries: S.optional(AgentSpaceSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAgentSpacesOutput",
}) as any as S.Schema<ListAgentSpacesOutput>;
export interface ListApplicationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListApplications" }),
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
  applicationId: string;
  applicationName: string;
  domain: string;
  defaultKmsKeyId?: string;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    applicationName: S.String,
    domain: S.String,
    defaultKmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationSummaryList = ApplicationSummary[];
export const ApplicationSummaryList = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  applicationSummaries: ApplicationSummary[];
  nextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationSummaries: ApplicationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListArtifactsInput {
  agentSpaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListArtifactsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListArtifacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListArtifactsInput",
}) as any as S.Schema<ListArtifactsInput>;
export interface ArtifactSummary {
  artifactId: string;
  fileName: string;
  artifactType: ArtifactType;
}
export const ArtifactSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    artifactId: S.String,
    fileName: S.String,
    artifactType: ArtifactType,
  }),
).annotate({
  identifier: "ArtifactSummary",
}) as any as S.Schema<ArtifactSummary>;
export type ArtifactSummaryList = ArtifactSummary[];
export const ArtifactSummaryList = /*@__PURE__*/ S.Array(ArtifactSummary);
export interface ListArtifactsOutput {
  artifactSummaries: ArtifactSummary[];
  nextToken?: string;
}
export const ListArtifactsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    artifactSummaries: ArtifactSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListArtifactsOutput",
}) as any as S.Schema<ListArtifactsOutput>;
export interface ListCodeReviewJobsForCodeReviewInput {
  maxResults?: number;
  codeReviewId: string;
  agentSpaceId: string;
  nextToken?: string;
}
export const ListCodeReviewJobsForCodeReviewInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number),
      codeReviewId: S.String,
      agentSpaceId: S.String,
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListCodeReviewJobsForCodeReview" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCodeReviewJobsForCodeReviewInput",
}) as any as S.Schema<ListCodeReviewJobsForCodeReviewInput>;
export interface CodeReviewJobSummary {
  codeReviewJobId: string;
  codeReviewId: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CodeReviewJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewJobId: S.String,
    codeReviewId: S.String,
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodeReviewJobSummary",
}) as any as S.Schema<CodeReviewJobSummary>;
export type CodeReviewJobSummaryList = CodeReviewJobSummary[];
export const CodeReviewJobSummaryList =
  /*@__PURE__*/ S.Array(CodeReviewJobSummary);
export interface ListCodeReviewJobsForCodeReviewOutput {
  codeReviewJobSummaries?: CodeReviewJobSummary[];
  nextToken?: string;
}
export const ListCodeReviewJobsForCodeReviewOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      codeReviewJobSummaries: S.optional(CodeReviewJobSummaryList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCodeReviewJobsForCodeReviewOutput",
}) as any as S.Schema<ListCodeReviewJobsForCodeReviewOutput>;
export interface ListCodeReviewJobTasksInput {
  agentSpaceId: string;
  maxResults?: number;
  codeReviewJobId?: string;
  stepName?: StepName;
  categoryName?: string;
  nextToken?: string;
}
export const ListCodeReviewJobTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    maxResults: S.optional(S.Number),
    codeReviewJobId: S.optional(S.String),
    stepName: S.optional(StepName),
    categoryName: S.optional(S.String),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListCodeReviewJobTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCodeReviewJobTasksInput",
}) as any as S.Schema<ListCodeReviewJobTasksInput>;
export interface CodeReviewJobTaskSummary {
  taskId: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  agentSpaceId?: string;
  title?: string;
  riskType?: RiskType;
  executionStatus?: TaskExecutionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CodeReviewJobTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    codeReviewId: S.optional(S.String),
    codeReviewJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    riskType: S.optional(RiskType),
    executionStatus: S.optional(TaskExecutionStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodeReviewJobTaskSummary",
}) as any as S.Schema<CodeReviewJobTaskSummary>;
export type CodeReviewJobTaskSummaryList = CodeReviewJobTaskSummary[];
export const CodeReviewJobTaskSummaryList = /*@__PURE__*/ S.Array(
  CodeReviewJobTaskSummary,
);
export interface ListCodeReviewJobTasksOutput {
  codeReviewJobTaskSummaries?: CodeReviewJobTaskSummary[];
  nextToken?: string;
}
export const ListCodeReviewJobTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewJobTaskSummaries: S.optional(CodeReviewJobTaskSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodeReviewJobTasksOutput",
}) as any as S.Schema<ListCodeReviewJobTasksOutput>;
export interface ListCodeReviewsInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
}
export const ListCodeReviewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    agentSpaceId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListCodeReviews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCodeReviewsInput",
}) as any as S.Schema<ListCodeReviewsInput>;
export interface CodeReviewSummary {
  codeReviewId: string;
  agentSpaceId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CodeReviewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewId: S.String,
    agentSpaceId: S.String,
    title: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodeReviewSummary",
}) as any as S.Schema<CodeReviewSummary>;
export type CodeReviewSummaryList = CodeReviewSummary[];
export const CodeReviewSummaryList = /*@__PURE__*/ S.Array(CodeReviewSummary);
export interface ListCodeReviewsOutput {
  codeReviewSummaries?: CodeReviewSummary[];
  nextToken?: string;
}
export const ListCodeReviewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewSummaries: S.optional(CodeReviewSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodeReviewsOutput",
}) as any as S.Schema<ListCodeReviewsOutput>;
export interface ListDiscoveredEndpointsInput {
  maxResults?: number;
  pentestJobId: string;
  agentSpaceId: string;
  prefix?: string;
  nextToken?: string;
}
export const ListDiscoveredEndpointsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    pentestJobId: S.String,
    agentSpaceId: S.String,
    prefix: S.optional(S.String),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListDiscoveredEndpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDiscoveredEndpointsInput",
}) as any as S.Schema<ListDiscoveredEndpointsInput>;
export interface DiscoveredEndpoint {
  uri: string;
  pentestJobId: string;
  taskId: string;
  agentSpaceId: string;
  evidence?: string;
  operation?: string;
  description?: string;
}
export const DiscoveredEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uri: S.String,
    pentestJobId: S.String,
    taskId: S.String,
    agentSpaceId: S.String,
    evidence: S.optional(S.String),
    operation: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "DiscoveredEndpoint",
}) as any as S.Schema<DiscoveredEndpoint>;
export type DiscoveredEndpointList = DiscoveredEndpoint[];
export const DiscoveredEndpointList = /*@__PURE__*/ S.Array(DiscoveredEndpoint);
export interface ListDiscoveredEndpointsOutput {
  discoveredEndpoints?: DiscoveredEndpoint[];
  nextToken?: string;
}
export const ListDiscoveredEndpointsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    discoveredEndpoints: S.optional(DiscoveredEndpointList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDiscoveredEndpointsOutput",
}) as any as S.Schema<ListDiscoveredEndpointsOutput>;
export interface ListFindingsInput {
  maxResults?: number;
  pentestJobId?: string;
  codeReviewJobId?: string;
  agentSpaceId: string;
  nextToken?: string;
  riskType?: string;
  riskLevel?: RiskLevel;
  status?: FindingStatus;
  confidence?: ConfidenceLevel;
  name?: string;
}
export const ListFindingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    pentestJobId: S.optional(S.String),
    codeReviewJobId: S.optional(S.String),
    agentSpaceId: S.String,
    nextToken: S.optional(S.String),
    riskType: S.optional(S.String),
    riskLevel: S.optional(RiskLevel),
    status: S.optional(FindingStatus),
    confidence: S.optional(ConfidenceLevel),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFindingsInput",
}) as any as S.Schema<ListFindingsInput>;
export interface FindingSummary {
  findingId: string;
  agentSpaceId: string;
  pentestId?: string;
  pentestJobId?: string;
  codeReviewId?: string;
  codeReviewJobId?: string;
  name?: string;
  status?: FindingStatus;
  riskType?: string;
  riskLevel?: RiskLevel;
  confidence?: ConfidenceLevel;
  validationStatus?: ValidationStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const FindingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.String,
    agentSpaceId: S.String,
    pentestId: S.optional(S.String),
    pentestJobId: S.optional(S.String),
    codeReviewId: S.optional(S.String),
    codeReviewJobId: S.optional(S.String),
    name: S.optional(S.String),
    status: S.optional(FindingStatus),
    riskType: S.optional(S.String),
    riskLevel: S.optional(RiskLevel),
    confidence: S.optional(ConfidenceLevel),
    validationStatus: S.optional(ValidationStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "FindingSummary" }) as any as S.Schema<FindingSummary>;
export type FindingSummaryList = FindingSummary[];
export const FindingSummaryList = /*@__PURE__*/ S.Array(FindingSummary);
export interface ListFindingsOutput {
  findingsSummaries?: FindingSummary[];
  nextToken?: string;
}
export const ListFindingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingsSummaries: S.optional(FindingSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFindingsOutput",
}) as any as S.Schema<ListFindingsOutput>;
export type ResourceType = "CODE_REPOSITORY" | "DOCUMENT" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export interface ListIntegratedResourcesInput {
  agentSpaceId: string;
  integrationId?: string;
  resourceType?: ResourceType;
  nextToken?: string;
  maxResults?: number;
}
export const ListIntegratedResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    integrationId: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListIntegratedResources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIntegratedResourcesInput",
}) as any as S.Schema<ListIntegratedResourcesInput>;
export type ProviderResourceName = string;
export type ProviderResourceId = string;
export type GitHubOwner = string;
export type AccessType = "PRIVATE" | "PUBLIC" | (string & {});
export const AccessType = /*@__PURE__*/ S.String;

export interface GitHubRepositoryMetadata {
  name: string;
  providerResourceId: string;
  owner: string;
  accessType?: AccessType;
}
export const GitHubRepositoryMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    providerResourceId: S.String,
    owner: S.String,
    accessType: S.optional(AccessType),
  }),
).annotate({
  identifier: "GitHubRepositoryMetadata",
}) as any as S.Schema<GitHubRepositoryMetadata>;
export type GitLabNamespace = string;
export interface GitLabRepositoryMetadata {
  name: string;
  providerResourceId: string;
  namespace: string;
  accessType?: AccessType;
}
export const GitLabRepositoryMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    providerResourceId: S.String,
    namespace: S.String,
    accessType: S.optional(AccessType),
  }),
).annotate({
  identifier: "GitLabRepositoryMetadata",
}) as any as S.Schema<GitLabRepositoryMetadata>;
export interface BitbucketRepositoryMetadata {
  name: string;
  providerResourceId: string;
  workspace: string;
  accessType?: AccessType;
}
export const BitbucketRepositoryMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    providerResourceId: S.String,
    workspace: S.String,
    accessType: S.optional(AccessType),
  }),
).annotate({
  identifier: "BitbucketRepositoryMetadata",
}) as any as S.Schema<BitbucketRepositoryMetadata>;
export interface ConfluenceDocumentMetadata {
  name: string;
  providerResourceId: string;
  spaceKey: string;
  pageId: string;
  title?: string;
  spaceTitle?: string;
}
export const ConfluenceDocumentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    providerResourceId: S.String,
    spaceKey: S.String,
    pageId: S.String,
    title: S.optional(S.String),
    spaceTitle: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfluenceDocumentMetadata",
}) as any as S.Schema<ConfluenceDocumentMetadata>;
export type IntegratedResourceMetadata =
  | {
      githubRepository: GitHubRepositoryMetadata;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository: GitLabRepositoryMetadata;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository: BitbucketRepositoryMetadata;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument: ConfluenceDocumentMetadata;
    };
export const IntegratedResourceMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ githubRepository: GitHubRepositoryMetadata }),
  S.Struct({ gitlabRepository: GitLabRepositoryMetadata }),
  S.Struct({ bitbucketRepository: BitbucketRepositoryMetadata }),
  S.Struct({ confluenceDocument: ConfluenceDocumentMetadata }),
]);
export interface GitHubResourceCapabilities {
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export const GitHubResourceCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    leaveComments: S.optional(S.Boolean),
    remediateCode: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GitHubResourceCapabilities",
}) as any as S.Schema<GitHubResourceCapabilities>;
export interface GitLabResourceCapabilities {
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export const GitLabResourceCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    leaveComments: S.optional(S.Boolean),
    remediateCode: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GitLabResourceCapabilities",
}) as any as S.Schema<GitLabResourceCapabilities>;
export interface BitbucketResourceCapabilities {
  leaveComments?: boolean;
  remediateCode?: boolean;
}
export const BitbucketResourceCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    leaveComments: S.optional(S.Boolean),
    remediateCode: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "BitbucketResourceCapabilities",
}) as any as S.Schema<BitbucketResourceCapabilities>;
export interface ConfluenceResourceCapabilities {
  fetchDocument?: boolean;
  createDocument?: boolean;
  updateDocument?: boolean;
}
export const ConfluenceResourceCapabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fetchDocument: S.optional(S.Boolean),
    createDocument: S.optional(S.Boolean),
    updateDocument: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ConfluenceResourceCapabilities",
}) as any as S.Schema<ConfluenceResourceCapabilities>;
export type ProviderResourceCapabilities =
  | {
      github: GitHubResourceCapabilities;
      gitlab?: never;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab: GitLabResourceCapabilities;
      bitbucket?: never;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket: BitbucketResourceCapabilities;
      confluence?: never;
    }
  | {
      github?: never;
      gitlab?: never;
      bitbucket?: never;
      confluence: ConfluenceResourceCapabilities;
    };
export const ProviderResourceCapabilities = /*@__PURE__*/ S.Union([
  S.Struct({ github: GitHubResourceCapabilities }),
  S.Struct({ gitlab: GitLabResourceCapabilities }),
  S.Struct({ bitbucket: BitbucketResourceCapabilities }),
  S.Struct({ confluence: ConfluenceResourceCapabilities }),
]);
export interface IntegratedResourceSummary {
  integrationId: string;
  resource: IntegratedResourceMetadata;
  capabilities?: ProviderResourceCapabilities;
}
export const IntegratedResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integrationId: S.String,
    resource: IntegratedResourceMetadata,
    capabilities: S.optional(ProviderResourceCapabilities),
  }),
).annotate({
  identifier: "IntegratedResourceSummary",
}) as any as S.Schema<IntegratedResourceSummary>;
export type IntegratedResourceSummaryList = IntegratedResourceSummary[];
export const IntegratedResourceSummaryList = /*@__PURE__*/ S.Array(
  IntegratedResourceSummary,
);
export interface ListIntegratedResourcesOutput {
  integratedResourceSummaries: IntegratedResourceSummary[];
  nextToken?: string;
}
export const ListIntegratedResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integratedResourceSummaries: IntegratedResourceSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIntegratedResourcesOutput",
}) as any as S.Schema<ListIntegratedResourcesOutput>;
export type IntegrationFilter =
  | { provider: Provider; providerType?: never }
  | { provider?: never; providerType: ProviderType };
export const IntegrationFilter = /*@__PURE__*/ S.Union([
  S.Struct({ provider: Provider }),
  S.Struct({ providerType: ProviderType }),
]);
export interface ListIntegrationsInput {
  filter?: IntegrationFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListIntegrationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(IntegrationFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListIntegrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIntegrationsInput",
}) as any as S.Schema<ListIntegrationsInput>;
export interface IntegrationSummary {
  integrationId: string;
  installationId: string;
  provider: Provider;
  providerType: ProviderType;
  displayName: string;
  targetUrl?: string;
  privateConnectionName?: string;
}
export const IntegrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integrationId: S.String,
    installationId: S.String,
    provider: Provider,
    providerType: ProviderType,
    displayName: S.String,
    targetUrl: S.optional(S.String),
    privateConnectionName: S.optional(S.String),
  }),
).annotate({
  identifier: "IntegrationSummary",
}) as any as S.Schema<IntegrationSummary>;
export type IntegrationSummaryList = IntegrationSummary[];
export const IntegrationSummaryList = /*@__PURE__*/ S.Array(IntegrationSummary);
export interface ListIntegrationsOutput {
  integrationSummaries: IntegrationSummary[];
  nextToken?: string;
}
export const ListIntegrationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    integrationSummaries: IntegrationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIntegrationsOutput",
}) as any as S.Schema<ListIntegrationsOutput>;
export type MembershipTypeFilter = "USER" | "ALL" | (string & {});
export const MembershipTypeFilter = /*@__PURE__*/ S.String;

export interface ListMembershipsRequest {
  applicationId: string;
  agentSpaceId: string;
  memberType?: MembershipTypeFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListMembershipsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    agentSpaceId: S.String,
    memberType: S.optional(MembershipTypeFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListMemberships" }),
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
export type SensitiveEmail = string;
export interface UserMetadata {
  username: string;
  email: string;
}
export const UserMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ username: S.String, email: S.String }),
).annotate({ identifier: "UserMetadata" }) as any as S.Schema<UserMetadata>;
export type MemberMetadata = { user: UserMetadata };
export const MemberMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ user: UserMetadata }),
]);
export interface MembershipSummary {
  membershipId: string;
  applicationId: string;
  agentSpaceId: string;
  memberType: MembershipType;
  config?: MembershipConfig;
  metadata?: MemberMetadata;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
export const MembershipSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipId: S.String,
    applicationId: S.String,
    agentSpaceId: S.String,
    memberType: MembershipType,
    config: S.optional(MembershipConfig),
    metadata: S.optional(MemberMetadata),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    createdBy: S.String,
    updatedBy: S.String,
  }),
).annotate({
  identifier: "MembershipSummary",
}) as any as S.Schema<MembershipSummary>;
export type MembershipSummaryList = MembershipSummary[];
export const MembershipSummaryList = /*@__PURE__*/ S.Array(MembershipSummary);
export interface ListMembershipsResponse {
  membershipSummaries: MembershipSummary[];
  nextToken?: string;
}
export const ListMembershipsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    membershipSummaries: MembershipSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMembershipsResponse",
}) as any as S.Schema<ListMembershipsResponse>;
export interface ListPentestJobsForPentestInput {
  maxResults?: number;
  pentestId: string;
  agentSpaceId: string;
  nextToken?: string;
}
export const ListPentestJobsForPentestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    pentestId: S.String,
    agentSpaceId: S.String,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPentestJobsForPentest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPentestJobsForPentestInput",
}) as any as S.Schema<ListPentestJobsForPentestInput>;
export interface PentestJobSummary {
  pentestJobId: string;
  pentestId: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const PentestJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestJobId: S.String,
    pentestId: S.String,
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "PentestJobSummary",
}) as any as S.Schema<PentestJobSummary>;
export type PentestJobSummaryList = PentestJobSummary[];
export const PentestJobSummaryList = /*@__PURE__*/ S.Array(PentestJobSummary);
export interface ListPentestJobsForPentestOutput {
  pentestJobSummaries?: PentestJobSummary[];
  nextToken?: string;
}
export const ListPentestJobsForPentestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestJobSummaries: S.optional(PentestJobSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPentestJobsForPentestOutput",
}) as any as S.Schema<ListPentestJobsForPentestOutput>;
export interface ListPentestJobTasksInput {
  agentSpaceId: string;
  maxResults?: number;
  pentestJobId?: string;
  stepName?: StepName;
  categoryName?: string;
  nextToken?: string;
}
export const ListPentestJobTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    maxResults: S.optional(S.Number),
    pentestJobId: S.optional(S.String),
    stepName: S.optional(StepName),
    categoryName: S.optional(S.String),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPentestJobTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPentestJobTasksInput",
}) as any as S.Schema<ListPentestJobTasksInput>;
export interface TaskSummary {
  taskId: string;
  pentestId?: string;
  pentestJobId?: string;
  agentSpaceId?: string;
  title?: string;
  riskType?: RiskType;
  executionStatus?: TaskExecutionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const TaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    pentestId: S.optional(S.String),
    pentestJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    riskType: S.optional(RiskType),
    executionStatus: S.optional(TaskExecutionStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "TaskSummary" }) as any as S.Schema<TaskSummary>;
export type TaskSummaryList = TaskSummary[];
export const TaskSummaryList = /*@__PURE__*/ S.Array(TaskSummary);
export interface ListPentestJobTasksOutput {
  taskSummaries?: TaskSummary[];
  nextToken?: string;
}
export const ListPentestJobTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskSummaries: S.optional(TaskSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPentestJobTasksOutput",
}) as any as S.Schema<ListPentestJobTasksOutput>;
export interface ListPentestsInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
}
export const ListPentestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    agentSpaceId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPentests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPentestsInput",
}) as any as S.Schema<ListPentestsInput>;
export interface PentestSummary {
  pentestId: string;
  agentSpaceId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const PentestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestId: S.String,
    agentSpaceId: S.String,
    title: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "PentestSummary" }) as any as S.Schema<PentestSummary>;
export type PentestSummaryList = PentestSummary[];
export const PentestSummaryList = /*@__PURE__*/ S.Array(PentestSummary);
export interface ListPentestsOutput {
  pentestSummaries?: PentestSummary[];
  nextToken?: string;
}
export const ListPentestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestSummaries: S.optional(PentestSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPentestsOutput",
}) as any as S.Schema<ListPentestsOutput>;
export interface ListPrivateConnectionsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListPrivateConnectionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPrivateConnections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrivateConnectionsInput",
}) as any as S.Schema<ListPrivateConnectionsInput>;
export interface PrivateConnectionSummary {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const PrivateConnectionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    type: PrivateConnectionType,
    status: PrivateConnectionStatus,
    resourceGatewayId: S.optional(S.String),
    hostAddress: S.optional(S.String),
    vpcId: S.optional(S.String),
    resourceConfigurationId: S.optional(S.String),
    certificateExpiryTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dnsResolution: S.optional(ResourceConfigDnsResolution),
    failureMessage: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "PrivateConnectionSummary",
}) as any as S.Schema<PrivateConnectionSummary>;
export type PrivateConnectionList = PrivateConnectionSummary[];
export const PrivateConnectionList = /*@__PURE__*/ S.Array(
  PrivateConnectionSummary,
);
export interface ListPrivateConnectionsOutput {
  privateConnections: PrivateConnectionSummary[];
  nextToken?: string;
}
export const ListPrivateConnectionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    privateConnections: PrivateConnectionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrivateConnectionsOutput",
}) as any as S.Schema<ListPrivateConnectionsOutput>;
export interface ListSecurityRequirementPackFilter {
  managementType?: ManagementType;
  status?: SecurityRequirementPackStatus;
}
export const ListSecurityRequirementPackFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managementType: S.optional(ManagementType),
    status: S.optional(SecurityRequirementPackStatus),
  }),
).annotate({
  identifier: "ListSecurityRequirementPackFilter",
}) as any as S.Schema<ListSecurityRequirementPackFilter>;
export interface ListSecurityRequirementPacksInput {
  filter?: ListSecurityRequirementPackFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListSecurityRequirementPacksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(ListSecurityRequirementPackFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListSecurityRequirementPacks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSecurityRequirementPacksInput",
}) as any as S.Schema<ListSecurityRequirementPacksInput>;
export interface SecurityRequirementPackSummary {
  packId: string;
  name: string;
  description?: string;
  vendorName?: string;
  managementType: ManagementType;
  status: SecurityRequirementPackStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const SecurityRequirementPackSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    name: S.String,
    description: S.optional(S.String),
    vendorName: S.optional(S.String),
    managementType: ManagementType,
    status: SecurityRequirementPackStatus,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "SecurityRequirementPackSummary",
}) as any as S.Schema<SecurityRequirementPackSummary>;
export type SecurityRequirementPackSummaryList =
  SecurityRequirementPackSummary[];
export const SecurityRequirementPackSummaryList = /*@__PURE__*/ S.Array(
  SecurityRequirementPackSummary,
);
export interface ListSecurityRequirementPacksOutput {
  securityRequirementPackSummaries: SecurityRequirementPackSummary[];
  nextToken?: string;
}
export const ListSecurityRequirementPacksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityRequirementPackSummaries: SecurityRequirementPackSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSecurityRequirementPacksOutput",
}) as any as S.Schema<ListSecurityRequirementPacksOutput>;
export interface ListSecurityRequirementsInput {
  packId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListSecurityRequirementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListSecurityRequirements" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSecurityRequirementsInput",
}) as any as S.Schema<ListSecurityRequirementsInput>;
export interface SecurityRequirementSummary {
  packId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export const SecurityRequirementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    name: S.String,
    description: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "SecurityRequirementSummary",
}) as any as S.Schema<SecurityRequirementSummary>;
export type SecurityRequirementSummaryList = SecurityRequirementSummary[];
export const SecurityRequirementSummaryList = /*@__PURE__*/ S.Array(
  SecurityRequirementSummary,
);
export interface ListSecurityRequirementsOutput {
  securityRequirementSummaries: SecurityRequirementSummary[];
  nextToken?: string;
}
export const ListSecurityRequirementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    securityRequirementSummaries: SecurityRequirementSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSecurityRequirementsOutput",
}) as any as S.Schema<ListSecurityRequirementsOutput>;
export type ResourceArn = string;
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
export interface ListTargetDomainsInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListTargetDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTargetDomains" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTargetDomainsInput",
}) as any as S.Schema<ListTargetDomainsInput>;
export interface TargetDomainSummary {
  targetDomainId: string;
  domainName: string;
  verificationStatus?: TargetDomainStatus;
}
export const TargetDomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainId: S.String,
    domainName: S.String,
    verificationStatus: S.optional(TargetDomainStatus),
  }),
).annotate({
  identifier: "TargetDomainSummary",
}) as any as S.Schema<TargetDomainSummary>;
export type TargetDomainSummaryList = TargetDomainSummary[];
export const TargetDomainSummaryList =
  /*@__PURE__*/ S.Array(TargetDomainSummary);
export interface ListTargetDomainsOutput {
  targetDomainSummaries?: TargetDomainSummary[];
  nextToken?: string;
}
export const ListTargetDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainSummaries: S.optional(TargetDomainSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTargetDomainsOutput",
}) as any as S.Schema<ListTargetDomainsOutput>;
export interface ListThreatModelJobsInput {
  maxResults?: number;
  threatModelId: string;
  agentSpaceId: string;
  nextToken?: string;
}
export const ListThreatModelJobsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    threatModelId: S.String,
    agentSpaceId: S.String,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListThreatModelJobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThreatModelJobsInput",
}) as any as S.Schema<ListThreatModelJobsInput>;
export interface ThreatModelJobSummary {
  threatModelJobId: string;
  threatModelId: string;
  agentSpaceId?: string;
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ThreatModelJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobId: S.String,
    threatModelId: S.String,
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ThreatModelJobSummary",
}) as any as S.Schema<ThreatModelJobSummary>;
export type ThreatModelJobSummaryList = ThreatModelJobSummary[];
export const ThreatModelJobSummaryList = /*@__PURE__*/ S.Array(
  ThreatModelJobSummary,
);
export interface ListThreatModelJobsOutput {
  threatModelJobSummaries?: ThreatModelJobSummary[];
  nextToken?: string;
}
export const ListThreatModelJobsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobSummaries: S.optional(ThreatModelJobSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThreatModelJobsOutput",
}) as any as S.Schema<ListThreatModelJobsOutput>;
export interface ListThreatModelJobTasksInput {
  agentSpaceId: string;
  maxResults?: number;
  threatModelJobId: string;
  nextToken?: string;
}
export const ListThreatModelJobTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    maxResults: S.optional(S.Number),
    threatModelJobId: S.String,
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListThreatModelJobTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThreatModelJobTasksInput",
}) as any as S.Schema<ListThreatModelJobTasksInput>;
export interface ThreatModelJobTaskSummary {
  taskId: string;
  threatModelId?: string;
  threatModelJobId?: string;
  agentSpaceId?: string;
  title?: string;
  executionStatus?: TaskExecutionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ThreatModelJobTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskId: S.String,
    threatModelId: S.optional(S.String),
    threatModelJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    title: S.optional(S.String),
    executionStatus: S.optional(TaskExecutionStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ThreatModelJobTaskSummary",
}) as any as S.Schema<ThreatModelJobTaskSummary>;
export type ThreatModelJobTaskSummaryList = ThreatModelJobTaskSummary[];
export const ThreatModelJobTaskSummaryList = /*@__PURE__*/ S.Array(
  ThreatModelJobTaskSummary,
);
export interface ListThreatModelJobTasksOutput {
  threatModelJobTaskSummaries?: ThreatModelJobTaskSummary[];
  nextToken?: string;
}
export const ListThreatModelJobTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelJobTaskSummaries: S.optional(ThreatModelJobTaskSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThreatModelJobTasksOutput",
}) as any as S.Schema<ListThreatModelJobTasksOutput>;
export interface ListThreatModelsInput {
  maxResults?: number;
  nextToken?: string;
  agentSpaceId: string;
}
export const ListThreatModelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    agentSpaceId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListThreatModels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThreatModelsInput",
}) as any as S.Schema<ListThreatModelsInput>;
export interface ThreatModelSummary {
  threatModelId: string;
  agentSpaceId: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ThreatModelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelId: S.String,
    agentSpaceId: S.String,
    title: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ThreatModelSummary",
}) as any as S.Schema<ThreatModelSummary>;
export type ThreatModelSummaryList = ThreatModelSummary[];
export const ThreatModelSummaryList = /*@__PURE__*/ S.Array(ThreatModelSummary);
export interface ListThreatModelsOutput {
  threatModelSummaries?: ThreatModelSummary[];
  nextToken?: string;
}
export const ListThreatModelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelSummaries: S.optional(ThreatModelSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThreatModelsOutput",
}) as any as S.Schema<ListThreatModelsOutput>;
export interface ListThreatsInput {
  threatJobId: string;
  agentSpaceId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListThreatsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatJobId: S.String,
    agentSpaceId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListThreats" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThreatsInput",
}) as any as S.Schema<ListThreatsInput>;
export interface ThreatSummary {
  threatId?: string;
  threatJobId?: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  stride?: StrideCategory[];
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export const ThreatSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatId: S.optional(S.String),
    threatJobId: S.optional(S.String),
    title: S.optional(S.String),
    statement: S.optional(S.String),
    severity: S.optional(ThreatSeverity),
    status: S.optional(ThreatStatus),
    stride: S.optional(StrideCategoryList),
    createdBy: S.optional(ThreatActor),
    updatedBy: S.optional(ThreatActor),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ThreatSummary" }) as any as S.Schema<ThreatSummary>;
export type ThreatSummaryList = ThreatSummary[];
export const ThreatSummaryList = /*@__PURE__*/ S.Array(ThreatSummary);
export interface ListThreatsOutput {
  threats?: ThreatSummary[];
  nextToken?: string;
}
export const ListThreatsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threats: S.optional(ThreatSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListThreatsOutput",
}) as any as S.Schema<ListThreatsOutput>;
export interface StartCodeRemediationInput {
  agentSpaceId: string;
  pentestJobId?: string;
  codeReviewJobId?: string;
  findingIds: string[];
}
export const StartCodeRemediationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    pentestJobId: S.optional(S.String),
    codeReviewJobId: S.optional(S.String),
    findingIds: FindingIdList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartCodeRemediation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCodeRemediationInput",
}) as any as S.Schema<StartCodeRemediationInput>;
export interface StartCodeRemediationOutput {}
export const StartCodeRemediationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartCodeRemediationOutput",
}) as any as S.Schema<StartCodeRemediationOutput>;
export type DiffSource = { s3Uri: string };
export const DiffSource = /*@__PURE__*/ S.Union([
  S.Struct({ s3Uri: S.String }),
]);
export interface StartCodeReviewJobInput {
  agentSpaceId: string;
  codeReviewId: string;
  diffSource?: DiffSource;
}
export const StartCodeReviewJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    codeReviewId: S.String,
    diffSource: S.optional(DiffSource),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartCodeReviewJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCodeReviewJobInput",
}) as any as S.Schema<StartCodeReviewJobInput>;
export interface StartCodeReviewJobOutput {
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  codeReviewId: string;
  codeReviewJobId: string;
  agentSpaceId?: string;
}
export const StartCodeReviewJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    codeReviewId: S.String,
    codeReviewJobId: S.String,
    agentSpaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartCodeReviewJobOutput",
}) as any as S.Schema<StartCodeReviewJobOutput>;
export interface StartPentestJobInput {
  agentSpaceId: string;
  pentestId: string;
}
export const StartPentestJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, pentestId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartPentestJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPentestJobInput",
}) as any as S.Schema<StartPentestJobInput>;
export interface StartPentestJobOutput {
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  pentestId?: string;
  pentestJobId?: string;
  agentSpaceId?: string;
}
export const StartPentestJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    pentestId: S.optional(S.String),
    pentestJobId: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartPentestJobOutput",
}) as any as S.Schema<StartPentestJobOutput>;
export interface StartThreatModelJobInput {
  agentSpaceId: string;
  threatModelId: string;
}
export const StartThreatModelJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, threatModelId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartThreatModelJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartThreatModelJobInput",
}) as any as S.Schema<StartThreatModelJobInput>;
export interface StartThreatModelJobOutput {
  title?: string;
  status?: JobStatus;
  createdAt?: Date;
  updatedAt?: Date;
  threatModelId?: string;
  threatModelJobId: string;
  agentSpaceId?: string;
}
export const StartThreatModelJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.optional(S.String),
    status: S.optional(JobStatus),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    threatModelId: S.optional(S.String),
    threatModelJobId: S.String,
    agentSpaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "StartThreatModelJobOutput",
}) as any as S.Schema<StartThreatModelJobOutput>;
export interface StopCodeReviewJobInput {
  agentSpaceId: string;
  codeReviewJobId: string;
}
export const StopCodeReviewJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, codeReviewJobId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopCodeReviewJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopCodeReviewJobInput",
}) as any as S.Schema<StopCodeReviewJobInput>;
export interface StopCodeReviewJobOutput {}
export const StopCodeReviewJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopCodeReviewJobOutput",
}) as any as S.Schema<StopCodeReviewJobOutput>;
export interface StopPentestJobInput {
  agentSpaceId: string;
  pentestJobId: string;
}
export const StopPentestJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, pentestJobId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopPentestJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopPentestJobInput",
}) as any as S.Schema<StopPentestJobInput>;
export interface StopPentestJobOutput {}
export const StopPentestJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopPentestJobOutput",
}) as any as S.Schema<StopPentestJobOutput>;
export interface StopThreatModelJobInput {
  agentSpaceId: string;
  threatModelJobId: string;
}
export const StopThreatModelJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentSpaceId: S.String, threatModelJobId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopThreatModelJob" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopThreatModelJobInput",
}) as any as S.Schema<StopThreatModelJobInput>;
export interface StopThreatModelJobOutput {}
export const StopThreatModelJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopThreatModelJobOutput",
}) as any as S.Schema<StopThreatModelJobOutput>;
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
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
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
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateAgentSpaceInput {
  agentSpaceId: string;
  name?: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
}
export const UpdateAgentSpaceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    awsResources: S.optional(AWSResources),
    targetDomainIds: S.optional(TargetDomainIdList),
    codeReviewSettings: S.optional(CodeReviewSettings),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateAgentSpace" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAgentSpaceInput",
}) as any as S.Schema<UpdateAgentSpaceInput>;
export interface UpdateAgentSpaceOutput {
  agentSpaceId: string;
  name: string;
  description?: string;
  awsResources?: AWSResources;
  targetDomainIds?: string[];
  codeReviewSettings?: CodeReviewSettings;
  createdAt?: Date;
  updatedAt?: Date;
}
export const UpdateAgentSpaceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    name: S.String,
    description: S.optional(S.String),
    awsResources: S.optional(AWSResources),
    targetDomainIds: S.optional(TargetDomainIdList),
    codeReviewSettings: S.optional(CodeReviewSettings),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateAgentSpaceOutput",
}) as any as S.Schema<UpdateAgentSpaceOutput>;
export interface UpdateApplicationRequest {
  applicationId: string;
  roleArn?: string;
  defaultKmsKeyId?: string;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.String,
    roleArn: S.optional(S.String),
    defaultKmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateApplication" }),
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
export interface UpdateApplicationResponse {
  applicationId: string;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.String }),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateCodeReviewInput {
  codeReviewId: string;
  agentSpaceId: string;
  title?: string;
  assets?: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
}
export const UpdateCodeReviewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewId: S.String,
    agentSpaceId: S.String,
    title: S.optional(S.String),
    assets: S.optional(Assets),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    validationMode: S.optional(ValidationMode),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateCodeReview" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCodeReviewInput",
}) as any as S.Schema<UpdateCodeReviewInput>;
export interface UpdateCodeReviewOutput {
  codeReviewId: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
  codeRemediationStrategy?: CodeRemediationStrategy;
  validationMode?: ValidationMode;
}
export const UpdateCodeReviewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    codeReviewId: S.String,
    title: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    assets: S.optional(Assets),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    agentSpaceId: S.optional(S.String),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    validationMode: S.optional(ValidationMode),
  }),
).annotate({
  identifier: "UpdateCodeReviewOutput",
}) as any as S.Schema<UpdateCodeReviewOutput>;
export interface UpdateFindingInput {
  findingId: string;
  agentSpaceId: string;
  name?: string;
  description?: string;
  riskType?: string;
  riskLevel?: RiskLevel;
  riskScore?: string;
  attackScript?: string;
  reasoning?: string;
  status?: FindingStatus;
  customerNote?: string;
}
export const UpdateFindingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    findingId: S.String,
    agentSpaceId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    riskType: S.optional(S.String),
    riskLevel: S.optional(RiskLevel),
    riskScore: S.optional(S.String),
    attackScript: S.optional(S.String),
    reasoning: S.optional(S.String),
    status: S.optional(FindingStatus),
    customerNote: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateFinding" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFindingInput",
}) as any as S.Schema<UpdateFindingInput>;
export interface UpdateFindingOutput {}
export const UpdateFindingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFindingOutput",
}) as any as S.Schema<UpdateFindingOutput>;
export interface GitHubRepositoryResource {
  name: string;
  owner: string;
}
export const GitHubRepositoryResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, owner: S.String }),
).annotate({
  identifier: "GitHubRepositoryResource",
}) as any as S.Schema<GitHubRepositoryResource>;
export interface GitLabRepositoryResource {
  name: string;
  namespace: string;
}
export const GitLabRepositoryResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, namespace: S.String }),
).annotate({
  identifier: "GitLabRepositoryResource",
}) as any as S.Schema<GitLabRepositoryResource>;
export interface BitbucketRepositoryResource {
  name: string;
  workspace: string;
}
export const BitbucketRepositoryResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, workspace: S.String }),
).annotate({
  identifier: "BitbucketRepositoryResource",
}) as any as S.Schema<BitbucketRepositoryResource>;
export interface ConfluenceDocumentResource {
  name: string;
  spaceKey: string;
  pageId: string;
  title?: string;
  spaceTitle?: string;
}
export const ConfluenceDocumentResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    spaceKey: S.String,
    pageId: S.String,
    title: S.optional(S.String),
    spaceTitle: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfluenceDocumentResource",
}) as any as S.Schema<ConfluenceDocumentResource>;
export type IntegratedResource =
  | {
      githubRepository: GitHubRepositoryResource;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository: GitLabRepositoryResource;
      bitbucketRepository?: never;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository: BitbucketRepositoryResource;
      confluenceDocument?: never;
    }
  | {
      githubRepository?: never;
      gitlabRepository?: never;
      bitbucketRepository?: never;
      confluenceDocument: ConfluenceDocumentResource;
    };
export const IntegratedResource = /*@__PURE__*/ S.Union([
  S.Struct({ githubRepository: GitHubRepositoryResource }),
  S.Struct({ gitlabRepository: GitLabRepositoryResource }),
  S.Struct({ bitbucketRepository: BitbucketRepositoryResource }),
  S.Struct({ confluenceDocument: ConfluenceDocumentResource }),
]);
export interface IntegratedResourceInputItem {
  resource: IntegratedResource;
  capabilities?: ProviderResourceCapabilities;
}
export const IntegratedResourceInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: IntegratedResource,
    capabilities: S.optional(ProviderResourceCapabilities),
  }),
).annotate({
  identifier: "IntegratedResourceInputItem",
}) as any as S.Schema<IntegratedResourceInputItem>;
export type IntegratedResourceInputItemList = IntegratedResourceInputItem[];
export const IntegratedResourceInputItemList = /*@__PURE__*/ S.Array(
  IntegratedResourceInputItem,
);
export interface UpdateIntegratedResourcesInput {
  agentSpaceId: string;
  integrationId: string;
  items: IntegratedResourceInputItem[];
}
export const UpdateIntegratedResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentSpaceId: S.String,
    integrationId: S.String,
    items: IntegratedResourceInputItemList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateIntegratedResources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIntegratedResourcesInput",
}) as any as S.Schema<UpdateIntegratedResourcesInput>;
export interface UpdateIntegratedResourcesOutput {}
export const UpdateIntegratedResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIntegratedResourcesOutput",
}) as any as S.Schema<UpdateIntegratedResourcesOutput>;
export interface UpdatePentestInput {
  pentestId: string;
  agentSpaceId: string;
  title?: string;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  vpcConfig?: VpcConfig;
  networkTrafficConfig?: NetworkTrafficConfig;
  codeRemediationStrategy?: CodeRemediationStrategy;
  disableManagedSkills?: SkillType[];
}
export const UpdatePentestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestId: S.String,
    agentSpaceId: S.String,
    title: S.optional(S.String),
    assets: S.optional(Assets),
    excludeRiskTypes: S.optional(RiskTypeList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    vpcConfig: S.optional(VpcConfig),
    networkTrafficConfig: S.optional(NetworkTrafficConfig),
    codeRemediationStrategy: S.optional(CodeRemediationStrategy),
    disableManagedSkills: S.optional(SkillTypeList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdatePentest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePentestInput",
}) as any as S.Schema<UpdatePentestInput>;
export interface UpdatePentestOutput {
  pentestId?: string;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assets?: Assets;
  excludeRiskTypes?: RiskType[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  agentSpaceId?: string;
}
export const UpdatePentestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pentestId: S.optional(S.String),
    title: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    assets: S.optional(Assets),
    excludeRiskTypes: S.optional(RiskTypeList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    agentSpaceId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdatePentestOutput",
}) as any as S.Schema<UpdatePentestOutput>;
export interface UpdatePrivateConnectionCertificateInput {
  privateConnectionName: string;
  certificate: string | redacted.Redacted<string>;
}
export const UpdatePrivateConnectionCertificateInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      privateConnectionName: S.String,
      certificate: SensitiveString,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdatePrivateConnectionCertificate" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePrivateConnectionCertificateInput",
}) as any as S.Schema<UpdatePrivateConnectionCertificateInput>;
export interface UpdatePrivateConnectionCertificateOutput {
  name: string;
  type: PrivateConnectionType;
  status: PrivateConnectionStatus;
  resourceGatewayId?: string;
  hostAddress?: string;
  vpcId?: string;
  resourceConfigurationId?: string;
  certificateExpiryTime?: Date;
  dnsResolution?: ResourceConfigDnsResolution;
  failureMessage?: string;
  tags?: { [key: string]: string | undefined };
}
export const UpdatePrivateConnectionCertificateOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.String,
      type: PrivateConnectionType,
      status: PrivateConnectionStatus,
      resourceGatewayId: S.optional(S.String),
      hostAddress: S.optional(S.String),
      vpcId: S.optional(S.String),
      resourceConfigurationId: S.optional(S.String),
      certificateExpiryTime: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      dnsResolution: S.optional(ResourceConfigDnsResolution),
      failureMessage: S.optional(S.String),
      tags: S.optional(TagMap),
    }),
).annotate({
  identifier: "UpdatePrivateConnectionCertificateOutput",
}) as any as S.Schema<UpdatePrivateConnectionCertificateOutput>;
export interface UpdateSecurityRequirementPackInput {
  packId: string;
  name?: string;
  description?: string;
  status?: SecurityRequirementPackStatus;
}
export const UpdateSecurityRequirementPackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(SecurityRequirementPackStatus),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateSecurityRequirementPack" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSecurityRequirementPackInput",
}) as any as S.Schema<UpdateSecurityRequirementPackInput>;
export interface UpdateSecurityRequirementPackOutput {
  packId: string;
  name?: string;
  description?: string;
  status?: SecurityRequirementPackStatus;
}
export const UpdateSecurityRequirementPackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    packId: S.String,
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(SecurityRequirementPackStatus),
  }),
).annotate({
  identifier: "UpdateSecurityRequirementPackOutput",
}) as any as S.Schema<UpdateSecurityRequirementPackOutput>;
export interface UpdateTargetDomainInput {
  targetDomainId: string;
  verificationMethod: DomainVerificationMethod;
}
export const UpdateTargetDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainId: S.String,
    verificationMethod: DomainVerificationMethod,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateTargetDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTargetDomainInput",
}) as any as S.Schema<UpdateTargetDomainInput>;
export interface UpdateTargetDomainOutput {
  targetDomainId: string;
  domainName: string;
  verificationStatus: TargetDomainStatus;
  verificationStatusReason?: string;
  verificationDetails?: VerificationDetails;
  createdAt?: Date;
  verifiedAt?: Date;
}
export const UpdateTargetDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainId: S.String,
    domainName: S.String,
    verificationStatus: TargetDomainStatus,
    verificationStatusReason: S.optional(S.String),
    verificationDetails: S.optional(VerificationDetails),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    verifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateTargetDomainOutput",
}) as any as S.Schema<UpdateTargetDomainOutput>;
export interface UpdateThreatInput {
  threatId: string;
  agentSpaceId: string;
  title?: string;
  status?: ThreatStatus;
  comments?: string;
  statement?: string;
  severity?: ThreatSeverity;
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
}
export const UpdateThreatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatId: S.String,
    agentSpaceId: S.String,
    title: S.optional(S.String),
    status: S.optional(ThreatStatus),
    comments: S.optional(S.String),
    statement: S.optional(S.String),
    severity: S.optional(ThreatSeverity),
    threatSource: S.optional(S.String),
    prerequisites: S.optional(S.String),
    threatAction: S.optional(S.String),
    threatImpact: S.optional(S.String),
    impactedGoal: S.optional(StringList),
    impactedAssets: S.optional(StringList),
    anchor: S.optional(ThreatAnchorShape),
    evidence: S.optional(ThreatEvidenceList),
    recommendation: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateThreat" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThreatInput",
}) as any as S.Schema<UpdateThreatInput>;
export interface UpdateThreatOutput {
  threatId: string;
  threatJobId: string;
  title?: string;
  statement?: string;
  severity?: ThreatSeverity;
  status?: ThreatStatus;
  comments?: string;
  stride?: StrideCategory[];
  threatSource?: string;
  prerequisites?: string;
  threatAction?: string;
  threatImpact?: string;
  impactedGoal?: string[];
  impactedAssets?: string[];
  anchor?: ThreatAnchorShape;
  evidence?: ThreatEvidenceShape[];
  recommendation?: string;
  createdBy?: ThreatActor;
  updatedBy?: ThreatActor;
  createdAt?: Date;
  updatedAt?: Date;
}
export const UpdateThreatOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatId: S.String,
    threatJobId: S.String,
    title: S.optional(S.String),
    statement: S.optional(S.String),
    severity: S.optional(ThreatSeverity),
    status: S.optional(ThreatStatus),
    comments: S.optional(S.String),
    stride: S.optional(StrideCategoryList),
    threatSource: S.optional(S.String),
    prerequisites: S.optional(S.String),
    threatAction: S.optional(S.String),
    threatImpact: S.optional(S.String),
    impactedGoal: S.optional(StringList),
    impactedAssets: S.optional(StringList),
    anchor: S.optional(ThreatAnchorShape),
    evidence: S.optional(ThreatEvidenceList),
    recommendation: S.optional(S.String),
    createdBy: S.optional(ThreatActor),
    updatedBy: S.optional(ThreatActor),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateThreatOutput",
}) as any as S.Schema<UpdateThreatOutput>;
export interface UpdateThreatModelInput {
  threatModelId: string;
  agentSpaceId: string;
  title?: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
}
export const UpdateThreatModelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelId: S.String,
    agentSpaceId: S.String,
    title: S.optional(S.String),
    description: S.optional(S.String),
    assets: S.optional(Assets),
    scopeDocs: S.optional(DocumentList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateThreatModel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThreatModelInput",
}) as any as S.Schema<UpdateThreatModelInput>;
export interface UpdateThreatModelOutput {
  threatModelId: string;
  title?: string;
  agentSpaceId?: string;
  description?: string;
  assets?: Assets;
  scopeDocs?: DocumentInfo[];
  serviceRole?: string;
  logConfig?: CloudWatchLog;
  createdAt?: Date;
  updatedAt?: Date;
}
export const UpdateThreatModelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    threatModelId: S.String,
    title: S.optional(S.String),
    agentSpaceId: S.optional(S.String),
    description: S.optional(S.String),
    assets: S.optional(Assets),
    scopeDocs: S.optional(DocumentList),
    serviceRole: S.optional(S.String),
    logConfig: S.optional(CloudWatchLog),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateThreatModelOutput",
}) as any as S.Schema<UpdateThreatModelOutput>;
export interface VerifyTargetDomainInput {
  targetDomainId: string;
}
export const VerifyTargetDomainInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ targetDomainId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/VerifyTargetDomain" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyTargetDomainInput",
}) as any as S.Schema<VerifyTargetDomainInput>;
export interface VerifyTargetDomainOutput {
  targetDomainId?: string;
  domainName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verifiedAt?: Date;
  status?: TargetDomainStatus;
  verificationStatusReason?: string;
}
export const VerifyTargetDomainOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetDomainId: S.optional(S.String),
    domainName: S.optional(S.String),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    verifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    status: S.optional(TargetDomainStatus),
    verificationStatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "VerifyTargetDomainOutput",
}) as any as S.Schema<VerifyTargetDomainOutput>;
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AddArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads an artifact to an agent space. Artifacts provide additional context for security testing, such as architecture diagrams, API specifications, or configuration files.
 */
export const addArtifact: API.OperationMethod<
  AddArtifactInput,
  AddArtifactOutput,
  AddArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddArtifactInput,
  output: AddArtifactOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddArtifact",
}));

export type BatchCreateSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch creates security requirements in a customer managed pack.
 */
export const batchCreateSecurityRequirements: API.OperationMethod<
  BatchCreateSecurityRequirementsInput,
  BatchCreateSecurityRequirementsOutput,
  BatchCreateSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateSecurityRequirementsInput,
  output: BatchCreateSecurityRequirementsOutput,
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
  operationName: "BatchCreateSecurityRequirements",
}));

export type BatchDeleteCodeReviewsError = CommonErrors;
/**
 * Deletes one or more code reviews from an agent space.
 */
export const batchDeleteCodeReviews: API.OperationMethod<
  BatchDeleteCodeReviewsInput,
  BatchDeleteCodeReviewsOutput,
  BatchDeleteCodeReviewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteCodeReviewsInput,
  output: BatchDeleteCodeReviewsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCodeReviews",
}));

export type BatchDeletePentestsError = CommonErrors;
/**
 * Deletes one or more pentests from an agent space.
 */
export const batchDeletePentests: API.OperationMethod<
  BatchDeletePentestsInput,
  BatchDeletePentestsOutput,
  BatchDeletePentestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeletePentestsInput,
  output: BatchDeletePentestsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePentests",
}));

export type BatchDeleteSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch deletes security requirements from a customer managed pack.
 */
export const batchDeleteSecurityRequirements: API.OperationMethod<
  BatchDeleteSecurityRequirementsInput,
  BatchDeleteSecurityRequirementsOutput,
  BatchDeleteSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteSecurityRequirementsInput,
  output: BatchDeleteSecurityRequirementsOutput,
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
  operationName: "BatchDeleteSecurityRequirements",
}));

export type BatchDeleteThreatModelsError = CommonErrors;
/**
 * Deletes one or more threat models from an agent space.
 */
export const batchDeleteThreatModels: API.OperationMethod<
  BatchDeleteThreatModelsInput,
  BatchDeleteThreatModelsOutput,
  BatchDeleteThreatModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteThreatModelsInput,
  output: BatchDeleteThreatModelsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteThreatModels",
}));

export type BatchGetAgentSpacesError = CommonErrors;
/**
 * Retrieves information about one or more agent spaces.
 */
export const batchGetAgentSpaces: API.OperationMethod<
  BatchGetAgentSpacesInput,
  BatchGetAgentSpacesOutput,
  BatchGetAgentSpacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetAgentSpacesInput,
  output: BatchGetAgentSpacesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetAgentSpaces",
}));

export type BatchGetArtifactMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves metadata for one or more artifacts in an agent space.
 */
export const batchGetArtifactMetadata: API.OperationMethod<
  BatchGetArtifactMetadataInput,
  BatchGetArtifactMetadataOutput,
  BatchGetArtifactMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetArtifactMetadataInput,
  output: BatchGetArtifactMetadataOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetArtifactMetadata",
}));

export type BatchGetCodeReviewJobsError = CommonErrors;
/**
 * Retrieves information about one or more code review jobs in an agent space.
 */
export const batchGetCodeReviewJobs: API.OperationMethod<
  BatchGetCodeReviewJobsInput,
  BatchGetCodeReviewJobsOutput,
  BatchGetCodeReviewJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCodeReviewJobsInput,
  output: BatchGetCodeReviewJobsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviewJobs",
}));

export type BatchGetCodeReviewJobTasksError = CommonErrors;
/**
 * Retrieves information about one or more tasks within a code review job.
 */
export const batchGetCodeReviewJobTasks: API.OperationMethod<
  BatchGetCodeReviewJobTasksInput,
  BatchGetCodeReviewJobTasksOutput,
  BatchGetCodeReviewJobTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCodeReviewJobTasksInput,
  output: BatchGetCodeReviewJobTasksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviewJobTasks",
}));

export type BatchGetCodeReviewsError = CommonErrors;
/**
 * Retrieves information about one or more code reviews in an agent space.
 */
export const batchGetCodeReviews: API.OperationMethod<
  BatchGetCodeReviewsInput,
  BatchGetCodeReviewsOutput,
  BatchGetCodeReviewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCodeReviewsInput,
  output: BatchGetCodeReviewsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCodeReviews",
}));

export type BatchGetFindingsError = CommonErrors;
/**
 * Retrieves information about one or more security findings in an agent space.
 */
export const batchGetFindings: API.OperationMethod<
  BatchGetFindingsInput,
  BatchGetFindingsOutput,
  BatchGetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetFindingsInput,
  output: BatchGetFindingsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetFindings",
}));

export type BatchGetPentestJobsError = CommonErrors;
/**
 * Retrieves information about one or more pentest jobs in an agent space.
 */
export const batchGetPentestJobs: API.OperationMethod<
  BatchGetPentestJobsInput,
  BatchGetPentestJobsOutput,
  BatchGetPentestJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetPentestJobsInput,
  output: BatchGetPentestJobsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentestJobs",
}));

export type BatchGetPentestJobTasksError = CommonErrors;
/**
 * Retrieves information about one or more tasks within a pentest job.
 */
export const batchGetPentestJobTasks: API.OperationMethod<
  BatchGetPentestJobTasksInput,
  BatchGetPentestJobTasksOutput,
  BatchGetPentestJobTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetPentestJobTasksInput,
  output: BatchGetPentestJobTasksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentestJobTasks",
}));

export type BatchGetPentestsError = CommonErrors;
/**
 * Retrieves information about one or more pentests in an agent space.
 */
export const batchGetPentests: API.OperationMethod<
  BatchGetPentestsInput,
  BatchGetPentestsOutput,
  BatchGetPentestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetPentestsInput,
  output: BatchGetPentestsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPentests",
}));

export type BatchGetSecurityRequirementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch retrieves security requirements from a pack.
 */
export const batchGetSecurityRequirements: API.OperationMethod<
  BatchGetSecurityRequirementsInput,
  BatchGetSecurityRequirementsOutput,
  BatchGetSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetSecurityRequirementsInput,
  output: BatchGetSecurityRequirementsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecurityRequirements",
}));

export type BatchGetTargetDomainsError = CommonErrors;
/**
 * Retrieves information about one or more target domains.
 */
export const batchGetTargetDomains: API.OperationMethod<
  BatchGetTargetDomainsInput,
  BatchGetTargetDomainsOutput,
  BatchGetTargetDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetTargetDomainsInput,
  output: BatchGetTargetDomainsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTargetDomains",
}));

export type BatchGetThreatModelJobsError = CommonErrors;
/**
 * Retrieves information about one or more threat model jobs in an agent space.
 */
export const batchGetThreatModelJobs: API.OperationMethod<
  BatchGetThreatModelJobsInput,
  BatchGetThreatModelJobsOutput,
  BatchGetThreatModelJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetThreatModelJobsInput,
  output: BatchGetThreatModelJobsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModelJobs",
}));

export type BatchGetThreatModelJobTasksError = CommonErrors;
/**
 * Retrieves information about one or more tasks within a threat model job.
 */
export const batchGetThreatModelJobTasks: API.OperationMethod<
  BatchGetThreatModelJobTasksInput,
  BatchGetThreatModelJobTasksOutput,
  BatchGetThreatModelJobTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetThreatModelJobTasksInput,
  output: BatchGetThreatModelJobTasksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModelJobTasks",
}));

export type BatchGetThreatModelsError = CommonErrors;
/**
 * Retrieves information about one or more threat models in an agent space.
 */
export const batchGetThreatModels: API.OperationMethod<
  BatchGetThreatModelsInput,
  BatchGetThreatModelsOutput,
  BatchGetThreatModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetThreatModelsInput,
  output: BatchGetThreatModelsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreatModels",
}));

export type BatchGetThreatsError = CommonErrors;
/**
 * Retrieves information about one or more threats.
 */
export const batchGetThreats: API.OperationMethod<
  BatchGetThreatsInput,
  BatchGetThreatsOutput,
  BatchGetThreatsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetThreatsInput,
  output: BatchGetThreatsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetThreats",
}));

export type BatchUpdateSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Batch updates security requirements within a customer managed pack.
 */
export const batchUpdateSecurityRequirements: API.OperationMethod<
  BatchUpdateSecurityRequirementsInput,
  BatchUpdateSecurityRequirementsOutput,
  BatchUpdateSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateSecurityRequirementsInput,
  output: BatchUpdateSecurityRequirementsOutput,
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
  operationName: "BatchUpdateSecurityRequirements",
}));

export type CreateAgentSpaceError = CommonErrors;
/**
 * Creates a new agent space. An agent space is a dedicated workspace for securing a specific application.
 */
export const createAgentSpace: API.OperationMethod<
  CreateAgentSpaceInput,
  CreateAgentSpaceOutput,
  CreateAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgentSpaceInput,
  output: CreateAgentSpaceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAgentSpace",
}));

export type CreateApplicationError = CommonErrors;
/**
 * Creates a new application. An application is the top-level organizational unit that supports IAM Identity Center integration.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateCodeReviewError = CommonErrors;
/**
 * Creates a new code review configuration in an agent space. A code review defines the parameters for automated security-focused code analysis.
 */
export const createCodeReview: API.OperationMethod<
  CreateCodeReviewInput,
  CreateCodeReviewOutput,
  CreateCodeReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCodeReviewInput,
  output: CreateCodeReviewOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCodeReview",
}));

export type CreateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new integration with a third-party provider, such as GitHub, for code review and remediation.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationInput,
  CreateIntegrationOutput,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationInput,
  output: CreateIntegrationOutput,
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
  operationName: "CreateIntegration",
}));

export type CreateMembershipError = CommonErrors;
/**
 * Creates a new membership, granting a user access to an agent space within an application.
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

export type CreatePentestError = CommonErrors;
/**
 * Creates a new pentest configuration in an agent space. A pentest defines the security test parameters, including target assets, risk type exclusions, and logging configuration.
 */
export const createPentest: API.OperationMethod<
  CreatePentestInput,
  CreatePentestOutput,
  CreatePentestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePentestInput,
  output: CreatePentestOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePentest",
}));

export type CreatePrivateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a private connection for reaching a self-hosted provider instance over private networking using Amazon VPC Lattice.
 */
export const createPrivateConnection: API.OperationMethod<
  CreatePrivateConnectionInput,
  CreatePrivateConnectionOutput,
  CreatePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePrivateConnectionInput,
  output: CreatePrivateConnectionOutput,
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
  operationName: "CreatePrivateConnection",
}));

export type CreateSecurityRequirementPackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a customer managed security requirement pack.
 */
export const createSecurityRequirementPack: API.OperationMethod<
  CreateSecurityRequirementPackInput,
  CreateSecurityRequirementPackOutput,
  CreateSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSecurityRequirementPackInput,
  output: CreateSecurityRequirementPackOutput,
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
  operationName: "CreateSecurityRequirementPack",
}));

export type CreateTargetDomainError = CommonErrors;
/**
 * Creates a new target domain for penetration testing. A target domain is a web domain that must be registered and verified before it can be tested.
 */
export const createTargetDomain: API.OperationMethod<
  CreateTargetDomainInput,
  CreateTargetDomainOutput,
  CreateTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTargetDomainInput,
  output: CreateTargetDomainOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTargetDomain",
}));

export type CreateThreatError = CommonErrors;
/**
 * Creates a new threat under a threat model job.
 */
export const createThreat: API.OperationMethod<
  CreateThreatInput,
  CreateThreatOutput,
  CreateThreatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThreatInput,
  output: CreateThreatOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreat",
}));

export type CreateThreatModelError = CommonErrors;
/**
 * Creates a new threat model configuration in an agent space. A threat model defines the parameters for automated threat analysis.
 */
export const createThreatModel: API.OperationMethod<
  CreateThreatModelInput,
  CreateThreatModelOutput,
  CreateThreatModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThreatModelInput,
  output: CreateThreatModelOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatModel",
}));

export type DeleteAgentSpaceError = CommonErrors;
/**
 * Deletes an agent space and all of its associated resources, including pentests, findings, and artifacts.
 */
export const deleteAgentSpace: API.OperationMethod<
  DeleteAgentSpaceInput,
  DeleteAgentSpaceOutput,
  DeleteAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAgentSpaceInput,
  output: DeleteAgentSpaceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentSpace",
}));

export type DeleteApplicationError = CommonErrors;
/**
 * Deletes an application and its associated configuration, including IAM Identity Center settings.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an artifact from an agent space.
 */
export const deleteArtifact: API.OperationMethod<
  DeleteArtifactInput,
  DeleteArtifactOutput,
  DeleteArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteArtifactInput,
  output: DeleteArtifactOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArtifact",
}));

export type DeleteIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an integration with a third-party provider.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationInput,
  DeleteIntegrationOutput,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationInput,
  output: DeleteIntegrationOutput,
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
  operationName: "DeleteIntegration",
}));

export type DeleteMembershipError = CommonErrors;
/**
 * Deletes a membership, revoking a user's access to an agent space.
 */
export const deleteMembership: API.OperationMethod<
  DeleteMembershipRequest,
  DeleteMembershipResponse,
  DeleteMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMembershipRequest,
  output: DeleteMembershipResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembership",
}));

export type DeletePrivateConnectionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a private connection.
 */
export const deletePrivateConnection: API.OperationMethod<
  DeletePrivateConnectionInput,
  DeletePrivateConnectionOutput,
  DeletePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePrivateConnectionInput,
  output: DeletePrivateConnectionOutput,
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
  operationName: "DeletePrivateConnection",
}));

export type DeleteSecurityRequirementPackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a customer managed security requirement pack and all its associated security requirements.
 */
export const deleteSecurityRequirementPack: API.OperationMethod<
  DeleteSecurityRequirementPackInput,
  DeleteSecurityRequirementPackOutput,
  DeleteSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSecurityRequirementPackInput,
  output: DeleteSecurityRequirementPackOutput,
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
  operationName: "DeleteSecurityRequirementPack",
}));

export type DeleteTargetDomainError = CommonErrors;
/**
 * Deletes a target domain registration. After deletion, the domain can no longer be used for penetration testing.
 */
export const deleteTargetDomain: API.OperationMethod<
  DeleteTargetDomainInput,
  DeleteTargetDomainOutput,
  DeleteTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTargetDomainInput,
  output: DeleteTargetDomainOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetDomain",
}));

export type DescribePrivateConnectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a private connection.
 */
export const describePrivateConnection: API.OperationMethod<
  DescribePrivateConnectionInput,
  DescribePrivateConnectionOutput,
  DescribePrivateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePrivateConnectionInput,
  output: DescribePrivateConnectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePrivateConnection",
}));

export type GetApplicationError = CommonErrors;
/**
 * Retrieves information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  GetApplicationResponse,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: GetApplicationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetArtifactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an artifact from an agent space.
 */
export const getArtifact: API.OperationMethod<
  GetArtifactInput,
  GetArtifactOutput,
  GetArtifactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArtifactInput,
  output: GetArtifactOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArtifact",
}));

export type GetIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an integration.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationInput,
  GetIntegrationOutput,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationInput,
  output: GetIntegrationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
}));

export type GetSecurityRequirementPackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a security requirement pack.
 */
export const getSecurityRequirementPack: API.OperationMethod<
  GetSecurityRequirementPackInput,
  GetSecurityRequirementPackOutput,
  GetSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSecurityRequirementPackInput,
  output: GetSecurityRequirementPackOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityRequirementPack",
}));

export type ImportSecurityRequirementsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports security requirements from uploaded documents into a customer managed security requirement pack. The import process asynchronously extracts and generates structured security requirements from the provided source files.
 */
export const importSecurityRequirements: API.OperationMethod<
  ImportSecurityRequirementsInput,
  ImportSecurityRequirementsOutput,
  ImportSecurityRequirementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportSecurityRequirementsInput,
  output: ImportSecurityRequirementsOutput,
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
  operationName: "ImportSecurityRequirements",
}));

export type InitiateProviderRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates the OAuth registration flow with a third-party provider. Returns a redirect URL and CSRF state token for completing the authorization.
 */
export const initiateProviderRegistration: API.OperationMethod<
  InitiateProviderRegistrationInput,
  InitiateProviderRegistrationOutput,
  InitiateProviderRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitiateProviderRegistrationInput,
  output: InitiateProviderRegistrationOutput,
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
  operationName: "InitiateProviderRegistration",
}));

export type ListAgentSpacesError = CommonErrors;
/**
 * Returns a paginated list of agent space summaries in your account.
 */
export const listAgentSpaces: API.PaginatedOperationMethod<
  ListAgentSpacesInput,
  ListAgentSpacesOutput,
  ListAgentSpacesError,
  Credentials | HttpClient.HttpClient,
  AgentSpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgentSpacesInput,
  output: ListAgentSpacesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentSpaceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListApplicationsError = CommonErrors;
/**
 * Returns a paginated list of application summaries in your account.
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
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applicationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListArtifactsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of artifact summaries for the specified agent space.
 */
export const listArtifacts: API.PaginatedOperationMethod<
  ListArtifactsInput,
  ListArtifactsOutput,
  ListArtifactsError,
  Credentials | HttpClient.HttpClient,
  ArtifactSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListArtifactsInput,
  output: ListArtifactsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArtifacts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "artifactSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeReviewJobsForCodeReviewError = CommonErrors;
/**
 * Returns a paginated list of code review job summaries for the specified code review configuration.
 */
export const listCodeReviewJobsForCodeReview: API.PaginatedOperationMethod<
  ListCodeReviewJobsForCodeReviewInput,
  ListCodeReviewJobsForCodeReviewOutput,
  ListCodeReviewJobsForCodeReviewError,
  Credentials | HttpClient.HttpClient,
  CodeReviewJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCodeReviewJobsForCodeReviewInput,
  output: ListCodeReviewJobsForCodeReviewOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviewJobsForCodeReview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeReviewJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeReviewJobTasksError = CommonErrors;
/**
 * Returns a paginated list of task summaries for the specified code review job, optionally filtered by step name or category.
 */
export const listCodeReviewJobTasks: API.PaginatedOperationMethod<
  ListCodeReviewJobTasksInput,
  ListCodeReviewJobTasksOutput,
  ListCodeReviewJobTasksError,
  Credentials | HttpClient.HttpClient,
  CodeReviewJobTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCodeReviewJobTasksInput,
  output: ListCodeReviewJobTasksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviewJobTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeReviewJobTaskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCodeReviewsError = CommonErrors;
/**
 * Returns a paginated list of code review summaries for the specified agent space.
 */
export const listCodeReviews: API.PaginatedOperationMethod<
  ListCodeReviewsInput,
  ListCodeReviewsOutput,
  ListCodeReviewsError,
  Credentials | HttpClient.HttpClient,
  CodeReviewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCodeReviewsInput,
  output: ListCodeReviewsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodeReviews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "codeReviewSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDiscoveredEndpointsError = CommonErrors;
/**
 * Returns a paginated list of endpoints discovered during a pentest job execution.
 */
export const listDiscoveredEndpoints: API.PaginatedOperationMethod<
  ListDiscoveredEndpointsInput,
  ListDiscoveredEndpointsOutput,
  ListDiscoveredEndpointsError,
  Credentials | HttpClient.HttpClient,
  DiscoveredEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDiscoveredEndpointsInput,
  output: ListDiscoveredEndpointsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "discoveredEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFindingsError = CommonErrors;
/**
 * Lists the security findings for a pentest job.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsInput,
  ListFindingsOutput,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsInput,
  output: ListFindingsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntegratedResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integrated resources for an agent space, optionally filtered by integration or resource type.
 */
export const listIntegratedResources: API.PaginatedOperationMethod<
  ListIntegratedResourcesInput,
  ListIntegratedResourcesOutput,
  ListIntegratedResourcesError,
  Credentials | HttpClient.HttpClient,
  IntegratedResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIntegratedResourcesInput,
  output: ListIntegratedResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegratedResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "integratedResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integrations in your account, optionally filtered by provider or provider type.
 */
export const listIntegrations: API.PaginatedOperationMethod<
  ListIntegrationsInput,
  ListIntegrationsOutput,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIntegrationsInput,
  output: ListIntegrationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "integrationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembershipsError = CommonErrors;
/**
 * Returns a paginated list of membership summaries for the specified agent space within an application.
 */
export const listMemberships: API.PaginatedOperationMethod<
  ListMembershipsRequest,
  ListMembershipsResponse,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient,
  MembershipSummary
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
    items: "membershipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPentestJobsForPentestError = CommonErrors;
/**
 * Returns a paginated list of pentest job summaries for the specified pentest configuration.
 */
export const listPentestJobsForPentest: API.PaginatedOperationMethod<
  ListPentestJobsForPentestInput,
  ListPentestJobsForPentestOutput,
  ListPentestJobsForPentestError,
  Credentials | HttpClient.HttpClient,
  PentestJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPentestJobsForPentestInput,
  output: ListPentestJobsForPentestOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPentestJobsForPentest",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pentestJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPentestJobTasksError = CommonErrors;
/**
 * Returns a paginated list of task summaries for the specified pentest job, optionally filtered by step name or category.
 */
export const listPentestJobTasks: API.PaginatedOperationMethod<
  ListPentestJobTasksInput,
  ListPentestJobTasksOutput,
  ListPentestJobTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPentestJobTasksInput,
  output: ListPentestJobTasksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPentestJobTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPentestsError = CommonErrors;
/**
 * Returns a paginated list of pentest summaries for the specified agent space.
 */
export const listPentests: API.PaginatedOperationMethod<
  ListPentestsInput,
  ListPentestsOutput,
  ListPentestsError,
  Credentials | HttpClient.HttpClient,
  PentestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPentestsInput,
  output: ListPentestsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPentests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "pentestSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivateConnectionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the private connections in your account.
 */
export const listPrivateConnections: API.PaginatedOperationMethod<
  ListPrivateConnectionsInput,
  ListPrivateConnectionsOutput,
  ListPrivateConnectionsError,
  Credentials | HttpClient.HttpClient,
  PrivateConnectionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrivateConnectionsInput,
  output: ListPrivateConnectionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrivateConnections",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privateConnections",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityRequirementPacksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all security requirement packs in the caller's account.
 */
export const listSecurityRequirementPacks: API.PaginatedOperationMethod<
  ListSecurityRequirementPacksInput,
  ListSecurityRequirementPacksOutput,
  ListSecurityRequirementPacksError,
  Credentials | HttpClient.HttpClient,
  SecurityRequirementPackSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityRequirementPacksInput,
  output: ListSecurityRequirementPacksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityRequirementPacks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityRequirementPackSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSecurityRequirementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists security requirements within a pack.
 */
export const listSecurityRequirements: API.PaginatedOperationMethod<
  ListSecurityRequirementsInput,
  ListSecurityRequirementsOutput,
  ListSecurityRequirementsError,
  Credentials | HttpClient.HttpClient,
  SecurityRequirementSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecurityRequirementsInput,
  output: ListSecurityRequirementsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecurityRequirements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "securityRequirementSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Returns the tags associated with the specified resource.
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

export type ListTargetDomainsError = CommonErrors;
/**
 * Returns a paginated list of target domain summaries in your account.
 */
export const listTargetDomains: API.PaginatedOperationMethod<
  ListTargetDomainsInput,
  ListTargetDomainsOutput,
  ListTargetDomainsError,
  Credentials | HttpClient.HttpClient,
  TargetDomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTargetDomainsInput,
  output: ListTargetDomainsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targetDomainSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatModelJobsError = CommonErrors;
/**
 * Returns a paginated list of threat model job summaries for the specified threat model.
 */
export const listThreatModelJobs: API.PaginatedOperationMethod<
  ListThreatModelJobsInput,
  ListThreatModelJobsOutput,
  ListThreatModelJobsError,
  Credentials | HttpClient.HttpClient,
  ThreatModelJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThreatModelJobsInput,
  output: ListThreatModelJobsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatModelJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threatModelJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatModelJobTasksError = CommonErrors;
/**
 * Returns a paginated list of task summaries for the specified threat model job.
 */
export const listThreatModelJobTasks: API.PaginatedOperationMethod<
  ListThreatModelJobTasksInput,
  ListThreatModelJobTasksOutput,
  ListThreatModelJobTasksError,
  Credentials | HttpClient.HttpClient,
  ThreatModelJobTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThreatModelJobTasksInput,
  output: ListThreatModelJobTasksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatModelJobTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threatModelJobTaskSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatModelsError = CommonErrors;
/**
 * Returns a paginated list of threat model summaries for the specified agent space.
 */
export const listThreatModels: API.PaginatedOperationMethod<
  ListThreatModelsInput,
  ListThreatModelsOutput,
  ListThreatModelsError,
  Credentials | HttpClient.HttpClient,
  ThreatModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThreatModelsInput,
  output: ListThreatModelsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threatModelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListThreatsError = CommonErrors;
/**
 * Returns a paginated list of threats for a threat model job.
 */
export const listThreats: API.PaginatedOperationMethod<
  ListThreatsInput,
  ListThreatsOutput,
  ListThreatsError,
  Credentials | HttpClient.HttpClient,
  ThreatSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThreatsInput,
  output: ListThreatsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreats",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "threats",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartCodeRemediationError = CommonErrors;
/**
 * Initiates code remediation for one or more security findings. This creates pull requests in integrated repositories to fix the identified vulnerabilities.
 */
export const startCodeRemediation: API.OperationMethod<
  StartCodeRemediationInput,
  StartCodeRemediationOutput,
  StartCodeRemediationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCodeRemediationInput,
  output: StartCodeRemediationOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeRemediation",
}));

export type StartCodeReviewJobError = CommonErrors;
/**
 * Starts a new code review job for a code review configuration. The job executes the security-focused code analysis defined in the code review.
 */
export const startCodeReviewJob: API.OperationMethod<
  StartCodeReviewJobInput,
  StartCodeReviewJobOutput,
  StartCodeReviewJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCodeReviewJobInput,
  output: StartCodeReviewJobOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeReviewJob",
}));

export type StartPentestJobError = CommonErrors;
/**
 * Starts a new pentest job for a pentest configuration. The job executes the security tests defined in the pentest.
 */
export const startPentestJob: API.OperationMethod<
  StartPentestJobInput,
  StartPentestJobOutput,
  StartPentestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPentestJobInput,
  output: StartPentestJobOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPentestJob",
}));

export type StartThreatModelJobError = CommonErrors;
/**
 * Starts a new threat model job for a threat model configuration.
 */
export const startThreatModelJob: API.OperationMethod<
  StartThreatModelJobInput,
  StartThreatModelJobOutput,
  StartThreatModelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartThreatModelJobInput,
  output: StartThreatModelJobOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartThreatModelJob",
}));

export type StopCodeReviewJobError = CommonErrors;
/**
 * Stops a running code review job. The job transitions to a stopping state and then to stopped after cleanup completes.
 */
export const stopCodeReviewJob: API.OperationMethod<
  StopCodeReviewJobInput,
  StopCodeReviewJobOutput,
  StopCodeReviewJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCodeReviewJobInput,
  output: StopCodeReviewJobOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCodeReviewJob",
}));

export type StopPentestJobError = CommonErrors;
/**
 * Stops a running pentest job. The job transitions to a stopping state and then to stopped after cleanup completes.
 */
export const stopPentestJob: API.OperationMethod<
  StopPentestJobInput,
  StopPentestJobOutput,
  StopPentestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopPentestJobInput,
  output: StopPentestJobOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPentestJob",
}));

export type StopThreatModelJobError = CommonErrors;
/**
 * Stops a running threat model job.
 */
export const stopThreatModelJob: API.OperationMethod<
  StopThreatModelJobInput,
  StopThreatModelJobOutput,
  StopThreatModelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopThreatModelJobInput,
  output: StopThreatModelJobOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopThreatModelJob",
}));

export type TagResourceError = CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAgentSpaceError = CommonErrors;
/**
 * Updates the configuration of an existing agent space, including its name, description, AWS resources, target domains, and code review settings.
 */
export const updateAgentSpace: API.OperationMethod<
  UpdateAgentSpaceInput,
  UpdateAgentSpaceOutput,
  UpdateAgentSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAgentSpaceInput,
  output: UpdateAgentSpaceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAgentSpace",
}));

export type UpdateApplicationError = CommonErrors;
/**
 * Updates the configuration of an existing application, including the IAM role and default KMS key.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateCodeReviewError = CommonErrors;
/**
 * Updates an existing code review configuration.
 */
export const updateCodeReview: API.OperationMethod<
  UpdateCodeReviewInput,
  UpdateCodeReviewOutput,
  UpdateCodeReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCodeReviewInput,
  output: UpdateCodeReviewOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCodeReview",
}));

export type UpdateFindingError = CommonErrors;
/**
 * Updates the status or risk level of a security finding.
 */
export const updateFinding: API.OperationMethod<
  UpdateFindingInput,
  UpdateFindingOutput,
  UpdateFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFindingInput,
  output: UpdateFindingOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFinding",
}));

export type UpdateIntegratedResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the integrated resources for an agent space, including their capabilities.
 */
export const updateIntegratedResources: API.OperationMethod<
  UpdateIntegratedResourcesInput,
  UpdateIntegratedResourcesOutput,
  UpdateIntegratedResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegratedResourcesInput,
  output: UpdateIntegratedResourcesOutput,
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
  operationName: "UpdateIntegratedResources",
}));

export type UpdatePentestError = CommonErrors;
/**
 * Updates an existing pentest configuration.
 */
export const updatePentest: API.OperationMethod<
  UpdatePentestInput,
  UpdatePentestOutput,
  UpdatePentestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePentestInput,
  output: UpdatePentestOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePentest",
}));

export type UpdatePrivateConnectionCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the certificate associated with a private connection. Certificates can be added or replaced but not removed.
 */
export const updatePrivateConnectionCertificate: API.OperationMethod<
  UpdatePrivateConnectionCertificateInput,
  UpdatePrivateConnectionCertificateOutput,
  UpdatePrivateConnectionCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePrivateConnectionCertificateInput,
  output: UpdatePrivateConnectionCertificateOutput,
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
  operationName: "UpdatePrivateConnectionCertificate",
}));

export type UpdateSecurityRequirementPackError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a security requirement pack. For customer managed packs, both metadata and status can be updated. For AWS managed packs, only status can be updated.
 */
export const updateSecurityRequirementPack: API.OperationMethod<
  UpdateSecurityRequirementPackInput,
  UpdateSecurityRequirementPackOutput,
  UpdateSecurityRequirementPackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecurityRequirementPackInput,
  output: UpdateSecurityRequirementPackOutput,
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
  operationName: "UpdateSecurityRequirementPack",
}));

export type UpdateTargetDomainError = CommonErrors;
/**
 * Updates the verification method for a target domain.
 */
export const updateTargetDomain: API.OperationMethod<
  UpdateTargetDomainInput,
  UpdateTargetDomainOutput,
  UpdateTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTargetDomainInput,
  output: UpdateTargetDomainOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTargetDomain",
}));

export type UpdateThreatError = CommonErrors;
/**
 * Updates a threat.
 */
export const updateThreat: API.OperationMethod<
  UpdateThreatInput,
  UpdateThreatOutput,
  UpdateThreatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThreatInput,
  output: UpdateThreatOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreat",
}));

export type UpdateThreatModelError = CommonErrors;
/**
 * Updates an existing threat model configuration.
 */
export const updateThreatModel: API.OperationMethod<
  UpdateThreatModelInput,
  UpdateThreatModelOutput,
  UpdateThreatModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThreatModelInput,
  output: UpdateThreatModelOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatModel",
}));

export type VerifyTargetDomainError = CommonErrors;
/**
 * Initiates verification of a target domain. This checks whether the domain ownership verification token has been properly configured.
 */
export const verifyTargetDomain: API.OperationMethod<
  VerifyTargetDomainInput,
  VerifyTargetDomainOutput,
  VerifyTargetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyTargetDomainInput,
  output: VerifyTargetDomainOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyTargetDomain",
}));
