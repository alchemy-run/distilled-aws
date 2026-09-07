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
  sdkId: "GuardDuty",
  serviceShapeName: "GuardDutyAPIService",
});
const auth = T.AwsAuthSigv4({ name: "guardduty" });
const ver = T.ServiceVersion("2017-11-28");
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
              `https://guardduty-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://guardduty.${Region}.amazonaws.com`);
            }
            return e(
              `https://guardduty-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://guardduty.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://guardduty.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      Type: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Type: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Type: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Type: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Type: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type DetectorId = string;
export interface AcceptAdministratorInvitationRequest {
  DetectorId: string;
  AdministratorId?: string;
  InvitationId?: string;
}
export const AcceptAdministratorInvitationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
      AdministratorId: S.optional(S.String),
      InvitationId: S.optional(S.String),
    })
      .pipe(
        S.encodeKeys({
          AdministratorId: "administratorId",
          InvitationId: "invitationId",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "POST",
            uri: "/detector/{DetectorId}/administrator",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "AcceptAdministratorInvitationRequest",
}) as any as S.Schema<AcceptAdministratorInvitationRequest>;
export interface AcceptAdministratorInvitationResponse {}
export const AcceptAdministratorInvitationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AcceptAdministratorInvitationResponse",
}) as any as S.Schema<AcceptAdministratorInvitationResponse>;
export interface AcceptInvitationRequest {
  DetectorId: string;
  MasterId?: string;
  InvitationId?: string;
}
export const AcceptInvitationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MasterId: S.optional(S.String),
    InvitationId: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ MasterId: "masterId", InvitationId: "invitationId" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/master" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AcceptInvitationRequest",
}) as any as S.Schema<AcceptInvitationRequest>;
export interface AcceptInvitationResponse {}
export const AcceptInvitationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptInvitationResponse",
}) as any as S.Schema<AcceptInvitationResponse>;
export type FindingId = string;
export type FindingIds = string[];
export const FindingIds = /*@__PURE__*/ S.Array(S.String);
export interface ArchiveFindingsRequest {
  DetectorId: string;
  FindingIds?: string[];
}
export const ArchiveFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingIds: S.optional(FindingIds),
  })
    .pipe(S.encodeKeys({ FindingIds: "findingIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/findings/archive",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ArchiveFindingsRequest",
}) as any as S.Schema<ArchiveFindingsRequest>;
export interface ArchiveFindingsResponse {}
export const ArchiveFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ArchiveFindingsResponse",
}) as any as S.Schema<ArchiveFindingsResponse>;
export type ClientToken = string;
export type FindingPublishingFrequency =
  | "FIFTEEN_MINUTES"
  | "ONE_HOUR"
  | "SIX_HOURS"
  | (string & {});
export const FindingPublishingFrequency = S.String;

export interface S3LogsConfiguration {
  Enable?: boolean;
}
export const S3LogsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enable: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enable: "enable" }),
  ),
).annotate({
  identifier: "S3LogsConfiguration",
}) as any as S.Schema<S3LogsConfiguration>;
export interface KubernetesAuditLogsConfiguration {
  Enable?: boolean;
}
export const KubernetesAuditLogsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enable: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ Enable: "enable" }),
  ),
).annotate({
  identifier: "KubernetesAuditLogsConfiguration",
}) as any as S.Schema<KubernetesAuditLogsConfiguration>;
export interface KubernetesConfiguration {
  AuditLogs?: KubernetesAuditLogsConfiguration;
}
export const KubernetesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuditLogs: S.optional(KubernetesAuditLogsConfiguration) }).pipe(
    S.encodeKeys({ AuditLogs: "auditLogs" }),
  ),
).annotate({
  identifier: "KubernetesConfiguration",
}) as any as S.Schema<KubernetesConfiguration>;
export interface ScanEc2InstanceWithFindings {
  EbsVolumes?: boolean;
}
export const ScanEc2InstanceWithFindings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EbsVolumes: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
  ),
).annotate({
  identifier: "ScanEc2InstanceWithFindings",
}) as any as S.Schema<ScanEc2InstanceWithFindings>;
export interface MalwareProtectionConfiguration {
  ScanEc2InstanceWithFindings?: ScanEc2InstanceWithFindings;
}
export const MalwareProtectionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScanEc2InstanceWithFindings: S.optional(ScanEc2InstanceWithFindings),
  }).pipe(
    S.encodeKeys({
      ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings",
    }),
  ),
).annotate({
  identifier: "MalwareProtectionConfiguration",
}) as any as S.Schema<MalwareProtectionConfiguration>;
export interface DataSourceConfigurations {
  S3Logs?: S3LogsConfiguration;
  Kubernetes?: KubernetesConfiguration;
  MalwareProtection?: MalwareProtectionConfiguration;
}
export const DataSourceConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Logs: S.optional(S3LogsConfiguration),
    Kubernetes: S.optional(KubernetesConfiguration),
    MalwareProtection: S.optional(MalwareProtectionConfiguration),
  }).pipe(
    S.encodeKeys({
      S3Logs: "s3Logs",
      Kubernetes: "kubernetes",
      MalwareProtection: "malwareProtection",
    }),
  ),
).annotate({
  identifier: "DataSourceConfigurations",
}) as any as S.Schema<DataSourceConfigurations>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DetectorFeature =
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | "AI_ANALYST"
  | (string & {});
export const DetectorFeature = S.String;

export type FeatureStatus = "ENABLED" | "DISABLED" | (string & {});
export const FeatureStatus = S.String;

export type FeatureAdditionalConfiguration =
  | "EKS_ADDON_MANAGEMENT"
  | "ECS_FARGATE_AGENT_MANAGEMENT"
  | "EC2_AGENT_MANAGEMENT"
  | (string & {});
export const FeatureAdditionalConfiguration = S.String;

export interface DetectorAdditionalConfiguration {
  Name?: FeatureAdditionalConfiguration;
  Status?: FeatureStatus;
}
export const DetectorAdditionalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(FeatureAdditionalConfiguration),
    Status: S.optional(FeatureStatus),
  }).pipe(S.encodeKeys({ Name: "name", Status: "status" })),
).annotate({
  identifier: "DetectorAdditionalConfiguration",
}) as any as S.Schema<DetectorAdditionalConfiguration>;
export type DetectorAdditionalConfigurations =
  DetectorAdditionalConfiguration[];
export const DetectorAdditionalConfigurations = /*@__PURE__*/ S.Array(
  DetectorAdditionalConfiguration,
);
export interface DetectorFeatureConfiguration {
  Name?: DetectorFeature;
  Status?: FeatureStatus;
  AdditionalConfiguration?: DetectorAdditionalConfiguration[];
}
export const DetectorFeatureConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(DetectorFeature),
    Status: S.optional(FeatureStatus),
    AdditionalConfiguration: S.optional(DetectorAdditionalConfigurations),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Status: "status",
      AdditionalConfiguration: "additionalConfiguration",
    }),
  ),
).annotate({
  identifier: "DetectorFeatureConfiguration",
}) as any as S.Schema<DetectorFeatureConfiguration>;
export type DetectorFeatureConfigurations = DetectorFeatureConfiguration[];
export const DetectorFeatureConfigurations = /*@__PURE__*/ S.Array(
  DetectorFeatureConfiguration,
);
export interface CreateDetectorRequest {
  Enable?: boolean;
  ClientToken?: string;
  FindingPublishingFrequency?: FindingPublishingFrequency;
  DataSources?: DataSourceConfigurations;
  Tags?: { [key: string]: string | undefined };
  Features?: DetectorFeatureConfiguration[];
}
export const CreateDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enable: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FindingPublishingFrequency: S.optional(FindingPublishingFrequency),
    DataSources: S.optional(DataSourceConfigurations),
    Tags: S.optional(TagMap),
    Features: S.optional(DetectorFeatureConfigurations),
  })
    .pipe(
      S.encodeKeys({
        Enable: "enable",
        ClientToken: "clientToken",
        FindingPublishingFrequency: "findingPublishingFrequency",
        DataSources: "dataSources",
        Tags: "tags",
        Features: "features",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDetectorRequest",
}) as any as S.Schema<CreateDetectorRequest>;
export type DataSourceStatus = "ENABLED" | "DISABLED" | (string & {});
export const DataSourceStatus = S.String;

export interface EbsVolumesResult {
  Status?: DataSourceStatus;
  Reason?: string;
}
export const EbsVolumesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(DataSourceStatus),
    Reason: S.optional(S.String),
  }).pipe(S.encodeKeys({ Status: "status", Reason: "reason" })),
).annotate({
  identifier: "EbsVolumesResult",
}) as any as S.Schema<EbsVolumesResult>;
export interface ScanEc2InstanceWithFindingsResult {
  EbsVolumes?: EbsVolumesResult;
}
export const ScanEc2InstanceWithFindingsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EbsVolumes: S.optional(EbsVolumesResult) }).pipe(
    S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
  ),
).annotate({
  identifier: "ScanEc2InstanceWithFindingsResult",
}) as any as S.Schema<ScanEc2InstanceWithFindingsResult>;
export interface MalwareProtectionConfigurationResult {
  ScanEc2InstanceWithFindings?: ScanEc2InstanceWithFindingsResult;
  ServiceRole?: string;
}
export const MalwareProtectionConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ScanEc2InstanceWithFindings: S.optional(
        ScanEc2InstanceWithFindingsResult,
      ),
      ServiceRole: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings",
        ServiceRole: "serviceRole",
      }),
    ),
).annotate({
  identifier: "MalwareProtectionConfigurationResult",
}) as any as S.Schema<MalwareProtectionConfigurationResult>;
export interface UnprocessedDataSourcesResult {
  MalwareProtection?: MalwareProtectionConfigurationResult;
}
export const UnprocessedDataSourcesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MalwareProtection: S.optional(MalwareProtectionConfigurationResult),
  }).pipe(S.encodeKeys({ MalwareProtection: "malwareProtection" })),
).annotate({
  identifier: "UnprocessedDataSourcesResult",
}) as any as S.Schema<UnprocessedDataSourcesResult>;
export interface CreateDetectorResponse {
  DetectorId?: string;
  UnprocessedDataSources?: UnprocessedDataSourcesResult;
}
export const CreateDetectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.optional(S.String),
    UnprocessedDataSources: S.optional(UnprocessedDataSourcesResult),
  }).pipe(
    S.encodeKeys({
      DetectorId: "detectorId",
      UnprocessedDataSources: "unprocessedDataSources",
    }),
  ),
).annotate({
  identifier: "CreateDetectorResponse",
}) as any as S.Schema<CreateDetectorResponse>;
export type FilterName = string;
export type FilterDescription = string;
export type FilterAction = "NOOP" | "ARCHIVE" | (string & {});
export const FilterAction = S.String;

export type FilterRank = number;
export type Eq = string[];
export const Eq = /*@__PURE__*/ S.Array(S.String);
export type Neq = string[];
export const Neq = /*@__PURE__*/ S.Array(S.String);
export type Equals = string[];
export const Equals = /*@__PURE__*/ S.Array(S.String);
export type NotEquals = string[];
export const NotEquals = /*@__PURE__*/ S.Array(S.String);
export type Match = string;
export type Matches = string[];
export const Matches = /*@__PURE__*/ S.Array(S.String);
export type NotMatch = string;
export type NotMatches = string[];
export const NotMatches = /*@__PURE__*/ S.Array(S.String);
export interface Condition {
  Eq?: string[];
  Neq?: string[];
  Gt?: number;
  Gte?: number;
  Lt?: number;
  Lte?: number;
  Equals?: string[];
  NotEquals?: string[];
  GreaterThan?: number;
  GreaterThanOrEqual?: number;
  LessThan?: number;
  LessThanOrEqual?: number;
  Matches?: string[];
  NotMatches?: string[];
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Eq: S.optional(Eq),
    Neq: S.optional(Neq),
    Gt: S.optional(S.Number),
    Gte: S.optional(S.Number),
    Lt: S.optional(S.Number),
    Lte: S.optional(S.Number),
    Equals: S.optional(Equals),
    NotEquals: S.optional(NotEquals),
    GreaterThan: S.optional(S.Number),
    GreaterThanOrEqual: S.optional(S.Number),
    LessThan: S.optional(S.Number),
    LessThanOrEqual: S.optional(S.Number),
    Matches: S.optional(Matches),
    NotMatches: S.optional(NotMatches),
  }).pipe(
    S.encodeKeys({
      Eq: "eq",
      Neq: "neq",
      Gt: "gt",
      Gte: "gte",
      Lt: "lt",
      Lte: "lte",
      Equals: "equals",
      NotEquals: "notEquals",
      GreaterThan: "greaterThan",
      GreaterThanOrEqual: "greaterThanOrEqual",
      LessThan: "lessThan",
      LessThanOrEqual: "lessThanOrEqual",
      Matches: "matches",
      NotMatches: "notMatches",
    }),
  ),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type Criterion = { [key: string]: Condition | undefined };
export const Criterion = /*@__PURE__*/ S.Record(
  S.String,
  Condition.pipe(S.optional),
);
export interface FindingCriteria {
  Criterion?: { [key: string]: Condition | undefined };
}
export const FindingCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Criterion: S.optional(Criterion) }).pipe(
    S.encodeKeys({ Criterion: "criterion" }),
  ),
).annotate({
  identifier: "FindingCriteria",
}) as any as S.Schema<FindingCriteria>;
export interface CreateFilterRequest {
  DetectorId: string;
  Name?: string;
  Description?: string;
  Action?: FilterAction;
  Rank?: number;
  FindingCriteria?: FindingCriteria;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Action: S.optional(FilterAction),
    Rank: S.optional(S.Number),
    FindingCriteria: S.optional(FindingCriteria),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Description: "description",
        Action: "action",
        Rank: "rank",
        FindingCriteria: "findingCriteria",
        ClientToken: "clientToken",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/filter" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateFilterRequest",
}) as any as S.Schema<CreateFilterRequest>;
export interface CreateFilterResponse {
  Name: string;
}
export const CreateFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({
  identifier: "CreateFilterResponse",
}) as any as S.Schema<CreateFilterResponse>;
export type TriggerPrompt = string;
export interface CreateInvestigationRequest {
  DetectorId: string;
  TriggerPrompt?: string;
  ClientToken?: string;
}
export const CreateInvestigationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    TriggerPrompt: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  })
    .pipe(
      S.encodeKeys({
        TriggerPrompt: "triggerPrompt",
        ClientToken: "clientToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/investigation" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateInvestigationRequest",
}) as any as S.Schema<CreateInvestigationRequest>;
export type InvestigationId = string;
export interface CreateInvestigationResponse {
  InvestigationId: string;
}
export const CreateInvestigationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvestigationId: S.optional(S.String) }).pipe(
    S.encodeKeys({ InvestigationId: "investigationId" }),
  ),
).annotate({
  identifier: "CreateInvestigationResponse",
}) as any as S.Schema<CreateInvestigationResponse>;
export type Name = string;
export type IpSetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export const IpSetFormat = S.String;

export type Location = string;
export type AccountId = string;
export interface CreateIPSetRequest {
  DetectorId: string;
  Name?: string;
  Format?: IpSetFormat;
  Location?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
}
export const CreateIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    Name: S.optional(S.String),
    Format: S.optional(IpSetFormat),
    Location: S.optional(S.String),
    Activate: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
    ExpectedBucketOwner: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Format: "format",
        Location: "location",
        Activate: "activate",
        ClientToken: "clientToken",
        Tags: "tags",
        ExpectedBucketOwner: "expectedBucketOwner",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/ipset" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateIPSetRequest",
}) as any as S.Schema<CreateIPSetRequest>;
export interface CreateIPSetResponse {
  IpSetId: string;
}
export const CreateIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IpSetId: S.optional(S.String) }).pipe(
    S.encodeKeys({ IpSetId: "ipSetId" }),
  ),
).annotate({
  identifier: "CreateIPSetResponse",
}) as any as S.Schema<CreateIPSetResponse>;
export type MalwareProtectionPlanObjectPrefixesList = string[];
export const MalwareProtectionPlanObjectPrefixesList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface CreateS3BucketResource {
  BucketName?: string;
  ObjectPrefixes?: string[];
}
export const CreateS3BucketResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    ObjectPrefixes: S.optional(MalwareProtectionPlanObjectPrefixesList),
  }).pipe(
    S.encodeKeys({
      BucketName: "bucketName",
      ObjectPrefixes: "objectPrefixes",
    }),
  ),
).annotate({
  identifier: "CreateS3BucketResource",
}) as any as S.Schema<CreateS3BucketResource>;
export interface CreateProtectedResource {
  S3Bucket?: CreateS3BucketResource;
}
export const CreateProtectedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.optional(CreateS3BucketResource) }).pipe(
    S.encodeKeys({ S3Bucket: "s3Bucket" }),
  ),
).annotate({
  identifier: "CreateProtectedResource",
}) as any as S.Schema<CreateProtectedResource>;
export type MalwareProtectionPlanTaggingActionStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const MalwareProtectionPlanTaggingActionStatus = S.String;

export interface MalwareProtectionPlanTaggingAction {
  Status?: MalwareProtectionPlanTaggingActionStatus;
}
export const MalwareProtectionPlanTaggingAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(MalwareProtectionPlanTaggingActionStatus),
  }).pipe(S.encodeKeys({ Status: "status" })),
).annotate({
  identifier: "MalwareProtectionPlanTaggingAction",
}) as any as S.Schema<MalwareProtectionPlanTaggingAction>;
export interface MalwareProtectionPlanActions {
  Tagging?: MalwareProtectionPlanTaggingAction;
}
export const MalwareProtectionPlanActions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tagging: S.optional(MalwareProtectionPlanTaggingAction) }).pipe(
    S.encodeKeys({ Tagging: "tagging" }),
  ),
).annotate({
  identifier: "MalwareProtectionPlanActions",
}) as any as S.Schema<MalwareProtectionPlanActions>;
export interface CreateMalwareProtectionPlanRequest {
  ClientToken?: string;
  Role?: string;
  ProtectedResource?: CreateProtectedResource;
  Actions?: MalwareProtectionPlanActions;
  Tags?: { [key: string]: string | undefined };
}
export const CreateMalwareProtectionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Role: S.optional(S.String),
    ProtectedResource: S.optional(CreateProtectedResource),
    Actions: S.optional(MalwareProtectionPlanActions),
    Tags: S.optional(TagMap),
  })
    .pipe(
      S.encodeKeys({
        ClientToken: "clientToken",
        Role: "role",
        ProtectedResource: "protectedResource",
        Actions: "actions",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/malware-protection-plan" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMalwareProtectionPlanRequest",
}) as any as S.Schema<CreateMalwareProtectionPlanRequest>;
export interface CreateMalwareProtectionPlanResponse {
  MalwareProtectionPlanId?: string;
}
export const CreateMalwareProtectionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MalwareProtectionPlanId: S.optional(S.String) }).pipe(
    S.encodeKeys({ MalwareProtectionPlanId: "malwareProtectionPlanId" }),
  ),
).annotate({
  identifier: "CreateMalwareProtectionPlanResponse",
}) as any as S.Schema<CreateMalwareProtectionPlanResponse>;
export type Email = string | redacted.Redacted<string>;
export interface AccountDetail {
  AccountId?: string;
  Email?: string | redacted.Redacted<string>;
}
export const AccountDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Email: S.optional(SensitiveString),
  }).pipe(S.encodeKeys({ AccountId: "accountId", Email: "email" })),
).annotate({ identifier: "AccountDetail" }) as any as S.Schema<AccountDetail>;
export type AccountDetails = AccountDetail[];
export const AccountDetails = /*@__PURE__*/ S.Array(AccountDetail);
export interface CreateMembersRequest {
  DetectorId: string;
  AccountDetails?: AccountDetail[];
}
export const CreateMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountDetails: S.optional(AccountDetails),
  })
    .pipe(S.encodeKeys({ AccountDetails: "accountDetails" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/member" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMembersRequest",
}) as any as S.Schema<CreateMembersRequest>;
export interface UnprocessedAccount {
  AccountId?: string;
  Result?: string;
}
export const UnprocessedAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Result: S.optional(S.String),
  }).pipe(S.encodeKeys({ AccountId: "accountId", Result: "result" })),
).annotate({
  identifier: "UnprocessedAccount",
}) as any as S.Schema<UnprocessedAccount>;
export type UnprocessedAccounts = UnprocessedAccount[];
export const UnprocessedAccounts = /*@__PURE__*/ S.Array(UnprocessedAccount);
export interface CreateMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const CreateMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "CreateMembersResponse",
}) as any as S.Schema<CreateMembersResponse>;
export type DestinationType = "S3" | (string & {});
export const DestinationType = S.String;

export interface DestinationProperties {
  DestinationArn?: string;
  KmsKeyArn?: string;
}
export const DestinationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ DestinationArn: "destinationArn", KmsKeyArn: "kmsKeyArn" }),
  ),
).annotate({
  identifier: "DestinationProperties",
}) as any as S.Schema<DestinationProperties>;
export interface CreatePublishingDestinationRequest {
  DetectorId: string;
  DestinationType?: DestinationType;
  DestinationProperties?: DestinationProperties;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePublishingDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    DestinationType: S.optional(DestinationType),
    DestinationProperties: S.optional(DestinationProperties),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  })
    .pipe(
      S.encodeKeys({
        DestinationType: "destinationType",
        DestinationProperties: "destinationProperties",
        ClientToken: "clientToken",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/publishingDestination",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePublishingDestinationRequest",
}) as any as S.Schema<CreatePublishingDestinationRequest>;
export interface CreatePublishingDestinationResponse {
  DestinationId: string;
}
export const CreatePublishingDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationId: S.optional(S.String) }).pipe(
    S.encodeKeys({ DestinationId: "destinationId" }),
  ),
).annotate({
  identifier: "CreatePublishingDestinationResponse",
}) as any as S.Schema<CreatePublishingDestinationResponse>;
export type FindingType = string;
export type FindingTypes = string[];
export const FindingTypes = /*@__PURE__*/ S.Array(S.String);
export interface CreateSampleFindingsRequest {
  DetectorId: string;
  FindingTypes?: string[];
}
export const CreateSampleFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingTypes: S.optional(FindingTypes),
  })
    .pipe(S.encodeKeys({ FindingTypes: "findingTypes" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/findings/create",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateSampleFindingsRequest",
}) as any as S.Schema<CreateSampleFindingsRequest>;
export interface CreateSampleFindingsResponse {}
export const CreateSampleFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateSampleFindingsResponse",
}) as any as S.Schema<CreateSampleFindingsResponse>;
export type ThreatEntitySetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export const ThreatEntitySetFormat = S.String;

export type ExpectedBucketOwner = string;
export interface CreateThreatEntitySetRequest {
  DetectorId: string;
  Name?: string;
  Format?: ThreatEntitySetFormat;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateThreatEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    Name: S.optional(S.String),
    Format: S.optional(ThreatEntitySetFormat),
    Location: S.optional(S.String),
    ExpectedBucketOwner: S.optional(S.String),
    Activate: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Format: "format",
        Location: "location",
        ExpectedBucketOwner: "expectedBucketOwner",
        Activate: "activate",
        ClientToken: "clientToken",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/threatentityset",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateThreatEntitySetRequest",
}) as any as S.Schema<CreateThreatEntitySetRequest>;
export interface CreateThreatEntitySetResponse {
  ThreatEntitySetId: string;
}
export const CreateThreatEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThreatEntitySetId: S.optional(S.String) }).pipe(
    S.encodeKeys({ ThreatEntitySetId: "threatEntitySetId" }),
  ),
).annotate({
  identifier: "CreateThreatEntitySetResponse",
}) as any as S.Schema<CreateThreatEntitySetResponse>;
export type ThreatIntelSetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export const ThreatIntelSetFormat = S.String;

export interface CreateThreatIntelSetRequest {
  DetectorId: string;
  Name?: string;
  Format?: ThreatIntelSetFormat;
  Location?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
}
export const CreateThreatIntelSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    Name: S.optional(S.String),
    Format: S.optional(ThreatIntelSetFormat),
    Location: S.optional(S.String),
    Activate: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
    ExpectedBucketOwner: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Format: "format",
        Location: "location",
        Activate: "activate",
        ClientToken: "clientToken",
        Tags: "tags",
        ExpectedBucketOwner: "expectedBucketOwner",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/threatintelset",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateThreatIntelSetRequest",
}) as any as S.Schema<CreateThreatIntelSetRequest>;
export interface CreateThreatIntelSetResponse {
  ThreatIntelSetId: string;
}
export const CreateThreatIntelSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThreatIntelSetId: S.optional(S.String) }).pipe(
    S.encodeKeys({ ThreatIntelSetId: "threatIntelSetId" }),
  ),
).annotate({
  identifier: "CreateThreatIntelSetResponse",
}) as any as S.Schema<CreateThreatIntelSetResponse>;
export type TrustedEntitySetFormat =
  | "TXT"
  | "STIX"
  | "OTX_CSV"
  | "ALIEN_VAULT"
  | "PROOF_POINT"
  | "FIRE_EYE"
  | (string & {});
export const TrustedEntitySetFormat = S.String;

export interface CreateTrustedEntitySetRequest {
  DetectorId: string;
  Name?: string;
  Format?: TrustedEntitySetFormat;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateTrustedEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    Name: S.optional(S.String),
    Format: S.optional(TrustedEntitySetFormat),
    Location: S.optional(S.String),
    ExpectedBucketOwner: S.optional(S.String),
    Activate: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Format: "format",
        Location: "location",
        ExpectedBucketOwner: "expectedBucketOwner",
        Activate: "activate",
        ClientToken: "clientToken",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/trustedentityset",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTrustedEntitySetRequest",
}) as any as S.Schema<CreateTrustedEntitySetRequest>;
export interface CreateTrustedEntitySetResponse {
  TrustedEntitySetId: string;
}
export const CreateTrustedEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrustedEntitySetId: S.optional(S.String) }).pipe(
    S.encodeKeys({ TrustedEntitySetId: "trustedEntitySetId" }),
  ),
).annotate({
  identifier: "CreateTrustedEntitySetResponse",
}) as any as S.Schema<CreateTrustedEntitySetResponse>;
export type AccountIds = string[];
export const AccountIds = /*@__PURE__*/ S.Array(S.String);
export interface DeclineInvitationsRequest {
  AccountIds?: string[];
}
export const DeclineInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIds) })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/invitation/decline" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeclineInvitationsRequest",
}) as any as S.Schema<DeclineInvitationsRequest>;
export interface DeclineInvitationsResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const DeclineInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "DeclineInvitationsResponse",
}) as any as S.Schema<DeclineInvitationsResponse>;
export interface DeleteDetectorRequest {
  DetectorId: string;
}
export const DeleteDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/detector/{DetectorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDetectorRequest",
}) as any as S.Schema<DeleteDetectorRequest>;
export interface DeleteDetectorResponse {}
export const DeleteDetectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDetectorResponse",
}) as any as S.Schema<DeleteDetectorResponse>;
export interface DeleteFilterRequest {
  DetectorId: string;
  FilterName: string;
}
export const DeleteFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FilterName: S.String.pipe(T.HttpLabel("FilterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/detector/{DetectorId}/filter/{FilterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFilterRequest",
}) as any as S.Schema<DeleteFilterRequest>;
export interface DeleteFilterResponse {}
export const DeleteFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFilterResponse",
}) as any as S.Schema<DeleteFilterResponse>;
export interface DeleteInvitationsRequest {
  AccountIds?: string[];
}
export const DeleteInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: S.optional(AccountIds) })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/invitation/delete" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteInvitationsRequest",
}) as any as S.Schema<DeleteInvitationsRequest>;
export interface DeleteInvitationsResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const DeleteInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "DeleteInvitationsResponse",
}) as any as S.Schema<DeleteInvitationsResponse>;
export interface DeleteIPSetRequest {
  DetectorId: string;
  IpSetId?: string;
}
export const DeleteIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    IpSetId: S.optional(S.String).pipe(T.HttpLabel("IpSetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/detector/{DetectorId}/ipset/{IpSetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIPSetRequest",
}) as any as S.Schema<DeleteIPSetRequest>;
export interface DeleteIPSetResponse {}
export const DeleteIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIPSetResponse",
}) as any as S.Schema<DeleteIPSetResponse>;
export interface DeleteMalwareProtectionPlanRequest {
  MalwareProtectionPlanId?: string;
}
export const DeleteMalwareProtectionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MalwareProtectionPlanId: S.optional(S.String).pipe(
      T.HttpLabel("MalwareProtectionPlanId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/malware-protection-plan/{MalwareProtectionPlanId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMalwareProtectionPlanRequest",
}) as any as S.Schema<DeleteMalwareProtectionPlanRequest>;
export interface DeleteMalwareProtectionPlanResponse {}
export const DeleteMalwareProtectionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMalwareProtectionPlanResponse",
}) as any as S.Schema<DeleteMalwareProtectionPlanResponse>;
export interface DeleteMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export const DeleteMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/delete" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteMembersRequest",
}) as any as S.Schema<DeleteMembersRequest>;
export interface DeleteMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const DeleteMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "DeleteMembersResponse",
}) as any as S.Schema<DeleteMembersResponse>;
export interface DeletePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
}
export const DeletePublishingDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/detector/{DetectorId}/publishingDestination/{DestinationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePublishingDestinationRequest",
}) as any as S.Schema<DeletePublishingDestinationRequest>;
export interface DeletePublishingDestinationResponse {}
export const DeletePublishingDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePublishingDestinationResponse",
}) as any as S.Schema<DeletePublishingDestinationResponse>;
export interface DeleteThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string;
}
export const DeleteThreatEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ThreatEntitySetId: S.optional(S.String).pipe(
      T.HttpLabel("ThreatEntitySetId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThreatEntitySetRequest",
}) as any as S.Schema<DeleteThreatEntitySetRequest>;
export interface DeleteThreatEntitySetResponse {}
export const DeleteThreatEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThreatEntitySetResponse",
}) as any as S.Schema<DeleteThreatEntitySetResponse>;
export interface DeleteThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
}
export const DeleteThreatIntelSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ThreatIntelSetId: S.String.pipe(T.HttpLabel("ThreatIntelSetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThreatIntelSetRequest",
}) as any as S.Schema<DeleteThreatIntelSetRequest>;
export interface DeleteThreatIntelSetResponse {}
export const DeleteThreatIntelSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThreatIntelSetResponse",
}) as any as S.Schema<DeleteThreatIntelSetResponse>;
export interface DeleteTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
}
export const DeleteTrustedEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    TrustedEntitySetId: S.String.pipe(T.HttpLabel("TrustedEntitySetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTrustedEntitySetRequest",
}) as any as S.Schema<DeleteTrustedEntitySetRequest>;
export interface DeleteTrustedEntitySetResponse {}
export const DeleteTrustedEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrustedEntitySetResponse",
}) as any as S.Schema<DeleteTrustedEntitySetResponse>;
export type IntegerValueWithMax = number;
export type CriterionKey =
  | "EC2_INSTANCE_ARN"
  | "SCAN_ID"
  | "ACCOUNT_ID"
  | "GUARDDUTY_FINDING_ID"
  | "SCAN_START_TIME"
  | "SCAN_STATUS"
  | "SCAN_TYPE"
  | (string & {});
export const CriterionKey = S.String;

export type NonEmptyString = string;
export type LongValue = number;
export interface FilterCondition {
  EqualsValue?: string;
  GreaterThan?: number;
  LessThan?: number;
}
export const FilterCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EqualsValue: S.optional(S.String),
    GreaterThan: S.optional(S.Number),
    LessThan: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      EqualsValue: "equalsValue",
      GreaterThan: "greaterThan",
      LessThan: "lessThan",
    }),
  ),
).annotate({
  identifier: "FilterCondition",
}) as any as S.Schema<FilterCondition>;
export interface FilterCriterion {
  CriterionKey?: CriterionKey;
  FilterCondition?: FilterCondition;
}
export const FilterCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CriterionKey: S.optional(CriterionKey),
    FilterCondition: S.optional(FilterCondition),
  }).pipe(
    S.encodeKeys({
      CriterionKey: "criterionKey",
      FilterCondition: "filterCondition",
    }),
  ),
).annotate({
  identifier: "FilterCriterion",
}) as any as S.Schema<FilterCriterion>;
export type FilterCriterionList = FilterCriterion[];
export const FilterCriterionList = /*@__PURE__*/ S.Array(FilterCriterion);
export interface FilterCriteria {
  FilterCriterion?: FilterCriterion[];
}
export const FilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FilterCriterion: S.optional(FilterCriterionList) }).pipe(
    S.encodeKeys({ FilterCriterion: "filterCriterion" }),
  ),
).annotate({ identifier: "FilterCriteria" }) as any as S.Schema<FilterCriteria>;
export type OrderBy = "ASC" | "DESC" | (string & {});
export const OrderBy = S.String;

export interface SortCriteria {
  AttributeName?: string;
  OrderBy?: OrderBy;
}
export const SortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    OrderBy: S.optional(OrderBy),
  }).pipe(S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" })),
).annotate({ identifier: "SortCriteria" }) as any as S.Schema<SortCriteria>;
export interface DescribeMalwareScansRequest {
  DetectorId: string;
  NextToken?: string;
  MaxResults?: number;
  FilterCriteria?: FilterCriteria;
  SortCriteria?: SortCriteria;
}
export const DescribeMalwareScansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    FilterCriteria: S.optional(FilterCriteria),
    SortCriteria: S.optional(SortCriteria),
  })
    .pipe(
      S.encodeKeys({
        NextToken: "nextToken",
        MaxResults: "maxResults",
        FilterCriteria: "filterCriteria",
        SortCriteria: "sortCriteria",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/malware-scans" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMalwareScansRequest",
}) as any as S.Schema<DescribeMalwareScansRequest>;
export type ScanStatus =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export const ScanStatus = S.String;

export type TriggerType = "BACKUP" | "GUARDDUTY" | (string & {});
export const TriggerType = S.String;

export interface TriggerDetails {
  GuardDutyFindingId?: string;
  Description?: string;
  TriggerType?: TriggerType;
}
export const TriggerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GuardDutyFindingId: S.optional(S.String),
    Description: S.optional(S.String),
    TriggerType: S.optional(TriggerType),
  }).pipe(
    S.encodeKeys({
      GuardDutyFindingId: "guardDutyFindingId",
      Description: "description",
      TriggerType: "triggerType",
    }),
  ),
).annotate({ identifier: "TriggerDetails" }) as any as S.Schema<TriggerDetails>;
export type InstanceArn = string;
export interface ResourceDetails {
  InstanceArn?: string;
}
export const ResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ InstanceArn: "instanceArn" }),
  ),
).annotate({
  identifier: "ResourceDetails",
}) as any as S.Schema<ResourceDetails>;
export type ScanResult = "CLEAN" | "INFECTED" | (string & {});
export const ScanResult = S.String;

export interface ScanResultDetails {
  ScanResult?: ScanResult;
}
export const ScanResultDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScanResult: S.optional(ScanResult) }).pipe(
    S.encodeKeys({ ScanResult: "scanResult" }),
  ),
).annotate({
  identifier: "ScanResultDetails",
}) as any as S.Schema<ScanResultDetails>;
export type PositiveLong = number;
export interface VolumeDetail {
  VolumeArn?: string;
  VolumeType?: string;
  DeviceName?: string;
  VolumeSizeInGB?: number;
  EncryptionType?: string;
  SnapshotArn?: string;
  KmsKeyArn?: string;
}
export const VolumeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeArn: S.optional(S.String),
    VolumeType: S.optional(S.String),
    DeviceName: S.optional(S.String),
    VolumeSizeInGB: S.optional(S.Number),
    EncryptionType: S.optional(S.String),
    SnapshotArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      VolumeArn: "volumeArn",
      VolumeType: "volumeType",
      DeviceName: "deviceName",
      VolumeSizeInGB: "volumeSizeInGB",
      EncryptionType: "encryptionType",
      SnapshotArn: "snapshotArn",
      KmsKeyArn: "kmsKeyArn",
    }),
  ),
).annotate({ identifier: "VolumeDetail" }) as any as S.Schema<VolumeDetail>;
export type VolumeDetails = VolumeDetail[];
export const VolumeDetails = /*@__PURE__*/ S.Array(VolumeDetail);
export type ScanType = "GUARDDUTY_INITIATED" | "ON_DEMAND" | (string & {});
export const ScanType = S.String;

export interface Scan {
  DetectorId?: string;
  AdminDetectorId?: string;
  ScanId?: string;
  ScanStatus?: ScanStatus;
  FailureReason?: string;
  ScanStartTime?: Date;
  ScanEndTime?: Date;
  TriggerDetails?: TriggerDetails;
  ResourceDetails?: ResourceDetails;
  ScanResultDetails?: ScanResultDetails;
  AccountId?: string;
  TotalBytes?: number;
  FileCount?: number;
  AttachedVolumes?: VolumeDetail[];
  ScanType?: ScanType;
}
export const Scan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.optional(S.String),
    AdminDetectorId: S.optional(S.String),
    ScanId: S.optional(S.String),
    ScanStatus: S.optional(ScanStatus),
    FailureReason: S.optional(S.String),
    ScanStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScanEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TriggerDetails: S.optional(TriggerDetails),
    ResourceDetails: S.optional(ResourceDetails),
    ScanResultDetails: S.optional(ScanResultDetails),
    AccountId: S.optional(S.String),
    TotalBytes: S.optional(S.Number),
    FileCount: S.optional(S.Number),
    AttachedVolumes: S.optional(VolumeDetails),
    ScanType: S.optional(ScanType),
  }).pipe(
    S.encodeKeys({
      DetectorId: "detectorId",
      AdminDetectorId: "adminDetectorId",
      ScanId: "scanId",
      ScanStatus: "scanStatus",
      FailureReason: "failureReason",
      ScanStartTime: "scanStartTime",
      ScanEndTime: "scanEndTime",
      TriggerDetails: "triggerDetails",
      ResourceDetails: "resourceDetails",
      ScanResultDetails: "scanResultDetails",
      AccountId: "accountId",
      TotalBytes: "totalBytes",
      FileCount: "fileCount",
      AttachedVolumes: "attachedVolumes",
      ScanType: "scanType",
    }),
  ),
).annotate({ identifier: "Scan" }) as any as S.Schema<Scan>;
export type Scans = Scan[];
export const Scans = /*@__PURE__*/ S.Array(Scan);
export interface DescribeMalwareScansResponse {
  Scans: Scan[];
  NextToken?: string;
}
export const DescribeMalwareScansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Scans: S.optional(Scans), NextToken: S.optional(S.String) }).pipe(
    S.encodeKeys({ Scans: "scans", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "DescribeMalwareScansResponse",
}) as any as S.Schema<DescribeMalwareScansResponse>;
export type MaxResults = number;
export interface DescribeOrganizationConfigurationRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeOrganizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/detector/{DetectorId}/admin" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeOrganizationConfigurationRequest",
}) as any as S.Schema<DescribeOrganizationConfigurationRequest>;
export interface OrganizationS3LogsConfigurationResult {
  AutoEnable?: boolean;
}
export const OrganizationS3LogsConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
      S.encodeKeys({ AutoEnable: "autoEnable" }),
    ),
).annotate({
  identifier: "OrganizationS3LogsConfigurationResult",
}) as any as S.Schema<OrganizationS3LogsConfigurationResult>;
export interface OrganizationKubernetesAuditLogsConfigurationResult {
  AutoEnable?: boolean;
}
export const OrganizationKubernetesAuditLogsConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
      S.encodeKeys({ AutoEnable: "autoEnable" }),
    ),
  ).annotate({
    identifier: "OrganizationKubernetesAuditLogsConfigurationResult",
  }) as any as S.Schema<OrganizationKubernetesAuditLogsConfigurationResult>;
export interface OrganizationKubernetesConfigurationResult {
  AuditLogs?: OrganizationKubernetesAuditLogsConfigurationResult;
}
export const OrganizationKubernetesConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AuditLogs: S.optional(OrganizationKubernetesAuditLogsConfigurationResult),
    }).pipe(S.encodeKeys({ AuditLogs: "auditLogs" })),
  ).annotate({
    identifier: "OrganizationKubernetesConfigurationResult",
  }) as any as S.Schema<OrganizationKubernetesConfigurationResult>;
export interface OrganizationEbsVolumesResult {
  AutoEnable?: boolean;
}
export const OrganizationEbsVolumesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ AutoEnable: "autoEnable" }),
  ),
).annotate({
  identifier: "OrganizationEbsVolumesResult",
}) as any as S.Schema<OrganizationEbsVolumesResult>;
export interface OrganizationScanEc2InstanceWithFindingsResult {
  EbsVolumes?: OrganizationEbsVolumesResult;
}
export const OrganizationScanEc2InstanceWithFindingsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EbsVolumes: S.optional(OrganizationEbsVolumesResult) }).pipe(
      S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
    ),
  ).annotate({
    identifier: "OrganizationScanEc2InstanceWithFindingsResult",
  }) as any as S.Schema<OrganizationScanEc2InstanceWithFindingsResult>;
export interface OrganizationMalwareProtectionConfigurationResult {
  ScanEc2InstanceWithFindings?: OrganizationScanEc2InstanceWithFindingsResult;
}
export const OrganizationMalwareProtectionConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ScanEc2InstanceWithFindings: S.optional(
        OrganizationScanEc2InstanceWithFindingsResult,
      ),
    }).pipe(
      S.encodeKeys({
        ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings",
      }),
    ),
  ).annotate({
    identifier: "OrganizationMalwareProtectionConfigurationResult",
  }) as any as S.Schema<OrganizationMalwareProtectionConfigurationResult>;
export interface OrganizationDataSourceConfigurationsResult {
  S3Logs?: OrganizationS3LogsConfigurationResult;
  Kubernetes?: OrganizationKubernetesConfigurationResult;
  MalwareProtection?: OrganizationMalwareProtectionConfigurationResult;
}
export const OrganizationDataSourceConfigurationsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      S3Logs: S.optional(OrganizationS3LogsConfigurationResult),
      Kubernetes: S.optional(OrganizationKubernetesConfigurationResult),
      MalwareProtection: S.optional(
        OrganizationMalwareProtectionConfigurationResult,
      ),
    }).pipe(
      S.encodeKeys({
        S3Logs: "s3Logs",
        Kubernetes: "kubernetes",
        MalwareProtection: "malwareProtection",
      }),
    ),
  ).annotate({
    identifier: "OrganizationDataSourceConfigurationsResult",
  }) as any as S.Schema<OrganizationDataSourceConfigurationsResult>;
export type OrgFeature =
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | (string & {});
export const OrgFeature = S.String;

export type OrgFeatureStatus = "NEW" | "NONE" | "ALL" | (string & {});
export const OrgFeatureStatus = S.String;

export type OrgFeatureAdditionalConfiguration =
  | "EKS_ADDON_MANAGEMENT"
  | "ECS_FARGATE_AGENT_MANAGEMENT"
  | "EC2_AGENT_MANAGEMENT"
  | (string & {});
export const OrgFeatureAdditionalConfiguration = S.String;

export interface OrganizationAdditionalConfigurationResult {
  Name?: OrgFeatureAdditionalConfiguration;
  AutoEnable?: OrgFeatureStatus;
}
export const OrganizationAdditionalConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(OrgFeatureAdditionalConfiguration),
      AutoEnable: S.optional(OrgFeatureStatus),
    }).pipe(S.encodeKeys({ Name: "name", AutoEnable: "autoEnable" })),
  ).annotate({
    identifier: "OrganizationAdditionalConfigurationResult",
  }) as any as S.Schema<OrganizationAdditionalConfigurationResult>;
export type OrganizationAdditionalConfigurationResults =
  OrganizationAdditionalConfigurationResult[];
export const OrganizationAdditionalConfigurationResults = /*@__PURE__*/ S.Array(
  OrganizationAdditionalConfigurationResult,
);
export interface OrganizationFeatureConfigurationResult {
  Name?: OrgFeature;
  AutoEnable?: OrgFeatureStatus;
  AdditionalConfiguration?: OrganizationAdditionalConfigurationResult[];
}
export const OrganizationFeatureConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.optional(OrgFeature),
      AutoEnable: S.optional(OrgFeatureStatus),
      AdditionalConfiguration: S.optional(
        OrganizationAdditionalConfigurationResults,
      ),
    }).pipe(
      S.encodeKeys({
        Name: "name",
        AutoEnable: "autoEnable",
        AdditionalConfiguration: "additionalConfiguration",
      }),
    ),
).annotate({
  identifier: "OrganizationFeatureConfigurationResult",
}) as any as S.Schema<OrganizationFeatureConfigurationResult>;
export type OrganizationFeaturesConfigurationsResults =
  OrganizationFeatureConfigurationResult[];
export const OrganizationFeaturesConfigurationsResults = /*@__PURE__*/ S.Array(
  OrganizationFeatureConfigurationResult,
);
export type AutoEnableMembers = "NEW" | "ALL" | "NONE" | (string & {});
export const AutoEnableMembers = S.String;

export interface DescribeOrganizationConfigurationResponse {
  AutoEnable?: boolean;
  MemberAccountLimitReached: boolean;
  DataSources?: OrganizationDataSourceConfigurationsResult & {
    S3Logs: OrganizationS3LogsConfigurationResult & { AutoEnable: boolean };
    Kubernetes: OrganizationKubernetesConfigurationResult & {
      AuditLogs: OrganizationKubernetesAuditLogsConfigurationResult & {
        AutoEnable: boolean;
      };
    };
  };
  Features?: OrganizationFeatureConfigurationResult[];
  NextToken?: string;
  AutoEnableOrganizationMembers?: AutoEnableMembers;
}
export const DescribeOrganizationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AutoEnable: S.optional(S.Boolean),
      MemberAccountLimitReached: S.optional(S.Boolean),
      DataSources: S.optional(OrganizationDataSourceConfigurationsResult),
      Features: S.optional(OrganizationFeaturesConfigurationsResults),
      NextToken: S.optional(S.String),
      AutoEnableOrganizationMembers: S.optional(AutoEnableMembers),
    }).pipe(
      S.encodeKeys({
        AutoEnable: "autoEnable",
        MemberAccountLimitReached: "memberAccountLimitReached",
        DataSources: "dataSources",
        Features: "features",
        NextToken: "nextToken",
        AutoEnableOrganizationMembers: "autoEnableOrganizationMembers",
      }),
    ),
  ).annotate({
    identifier: "DescribeOrganizationConfigurationResponse",
  }) as any as S.Schema<DescribeOrganizationConfigurationResponse>;
export interface DescribePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
}
export const DescribePublishingDestinationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
      DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/detector/{DetectorId}/publishingDestination/{DestinationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribePublishingDestinationRequest",
}) as any as S.Schema<DescribePublishingDestinationRequest>;
export type PublishingStatus =
  | "PENDING_VERIFICATION"
  | "PUBLISHING"
  | "UNABLE_TO_PUBLISH_FIX_DESTINATION_PROPERTY"
  | "STOPPED"
  | (string & {});
export const PublishingStatus = S.String;

export interface DescribePublishingDestinationResponse {
  DestinationId: string;
  DestinationType: DestinationType;
  Status: PublishingStatus;
  PublishingFailureStartTimestamp: number;
  DestinationProperties: DestinationProperties;
  Tags?: { [key: string]: string | undefined };
}
export const DescribePublishingDestinationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DestinationId: S.optional(S.String),
      DestinationType: S.optional(DestinationType),
      Status: S.optional(PublishingStatus),
      PublishingFailureStartTimestamp: S.optional(S.Number),
      DestinationProperties: S.optional(DestinationProperties),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        DestinationId: "destinationId",
        DestinationType: "destinationType",
        Status: "status",
        PublishingFailureStartTimestamp: "publishingFailureStartTimestamp",
        DestinationProperties: "destinationProperties",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "DescribePublishingDestinationResponse",
}) as any as S.Schema<DescribePublishingDestinationResponse>;
export interface DisableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
}
export const DisableOrganizationAdminAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AdminAccountId: S.optional(S.String) })
      .pipe(S.encodeKeys({ AdminAccountId: "adminAccountId" }))
      .pipe(
        T.all(
          T.Http({ method: "POST", uri: "/admin/disable" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "DisableOrganizationAdminAccountRequest",
}) as any as S.Schema<DisableOrganizationAdminAccountRequest>;
export interface DisableOrganizationAdminAccountResponse {}
export const DisableOrganizationAdminAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisableOrganizationAdminAccountResponse",
}) as any as S.Schema<DisableOrganizationAdminAccountResponse>;
export interface DisassociateFromAdministratorAccountRequest {
  DetectorId: string;
}
export const DisassociateFromAdministratorAccountRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/administrator/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateFromAdministratorAccountRequest",
  }) as any as S.Schema<DisassociateFromAdministratorAccountRequest>;
export interface DisassociateFromAdministratorAccountResponse {}
export const DisassociateFromAdministratorAccountResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateFromAdministratorAccountResponse",
  }) as any as S.Schema<DisassociateFromAdministratorAccountResponse>;
export interface DisassociateFromMasterAccountRequest {
  DetectorId: string;
}
export const DisassociateFromMasterAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/master/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateFromMasterAccountRequest",
}) as any as S.Schema<DisassociateFromMasterAccountRequest>;
export interface DisassociateFromMasterAccountResponse {}
export const DisassociateFromMasterAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateFromMasterAccountResponse",
}) as any as S.Schema<DisassociateFromMasterAccountResponse>;
export interface DisassociateMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export const DisassociateMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/member/disassociate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateMembersRequest",
}) as any as S.Schema<DisassociateMembersRequest>;
export interface DisassociateMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const DisassociateMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "DisassociateMembersResponse",
}) as any as S.Schema<DisassociateMembersResponse>;
export interface EnableOrganizationAdminAccountRequest {
  AdminAccountId?: string;
}
export const EnableOrganizationAdminAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AdminAccountId: S.optional(S.String) })
      .pipe(S.encodeKeys({ AdminAccountId: "adminAccountId" }))
      .pipe(
        T.all(
          T.Http({ method: "POST", uri: "/admin/enable" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "EnableOrganizationAdminAccountRequest",
}) as any as S.Schema<EnableOrganizationAdminAccountRequest>;
export interface EnableOrganizationAdminAccountResponse {}
export const EnableOrganizationAdminAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "EnableOrganizationAdminAccountResponse",
}) as any as S.Schema<EnableOrganizationAdminAccountResponse>;
export interface GetAdministratorAccountRequest {
  DetectorId: string;
}
export const GetAdministratorAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/administrator" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAdministratorAccountRequest",
}) as any as S.Schema<GetAdministratorAccountRequest>;
export interface Administrator {
  AccountId?: string;
  InvitationId?: string;
  RelationshipStatus?: string;
  InvitedAt?: string;
}
export const Administrator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    InvitationId: S.optional(S.String),
    RelationshipStatus: S.optional(S.String),
    InvitedAt: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      InvitationId: "invitationId",
      RelationshipStatus: "relationshipStatus",
      InvitedAt: "invitedAt",
    }),
  ),
).annotate({ identifier: "Administrator" }) as any as S.Schema<Administrator>;
export interface GetAdministratorAccountResponse {
  Administrator: Administrator;
}
export const GetAdministratorAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Administrator: S.optional(Administrator) }).pipe(
    S.encodeKeys({ Administrator: "administrator" }),
  ),
).annotate({
  identifier: "GetAdministratorAccountResponse",
}) as any as S.Schema<GetAdministratorAccountResponse>;
export type CoverageFilterCriterionKey =
  | "ACCOUNT_ID"
  | "RESOURCE_TYPE"
  | "COVERAGE_STATUS"
  | "ADDON_VERSION"
  | "CLUSTER_NAME"
  | "ECS_CLUSTER_NAME"
  | "MANAGEMENT_TYPE"
  | "EKS_CLUSTER_NAME"
  | "AGENT_VERSION"
  | "INSTANCE_ID"
  | "CLUSTER_ARN"
  | (string & {});
export const CoverageFilterCriterionKey = S.String;

export interface CoverageFilterCondition {
  Equals?: string[];
  NotEquals?: string[];
}
export const CoverageFilterCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Equals: S.optional(Equals),
    NotEquals: S.optional(NotEquals),
  }).pipe(S.encodeKeys({ Equals: "equals", NotEquals: "notEquals" })),
).annotate({
  identifier: "CoverageFilterCondition",
}) as any as S.Schema<CoverageFilterCondition>;
export interface CoverageFilterCriterion {
  CriterionKey?: CoverageFilterCriterionKey;
  FilterCondition?: CoverageFilterCondition;
}
export const CoverageFilterCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CriterionKey: S.optional(CoverageFilterCriterionKey),
    FilterCondition: S.optional(CoverageFilterCondition),
  }).pipe(
    S.encodeKeys({
      CriterionKey: "criterionKey",
      FilterCondition: "filterCondition",
    }),
  ),
).annotate({
  identifier: "CoverageFilterCriterion",
}) as any as S.Schema<CoverageFilterCriterion>;
export type CoverageFilterCriterionList = CoverageFilterCriterion[];
export const CoverageFilterCriterionList = /*@__PURE__*/ S.Array(
  CoverageFilterCriterion,
);
export interface CoverageFilterCriteria {
  FilterCriterion?: CoverageFilterCriterion[];
}
export const CoverageFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FilterCriterion: S.optional(CoverageFilterCriterionList) }).pipe(
    S.encodeKeys({ FilterCriterion: "filterCriterion" }),
  ),
).annotate({
  identifier: "CoverageFilterCriteria",
}) as any as S.Schema<CoverageFilterCriteria>;
export type CoverageStatisticsType =
  | "COUNT_BY_RESOURCE_TYPE"
  | "COUNT_BY_COVERAGE_STATUS"
  | (string & {});
export const CoverageStatisticsType = S.String;

export type CoverageStatisticsTypeList = CoverageStatisticsType[];
export const CoverageStatisticsTypeList = /*@__PURE__*/ S.Array(
  CoverageStatisticsType,
);
export interface GetCoverageStatisticsRequest {
  DetectorId: string;
  FilterCriteria?: CoverageFilterCriteria;
  StatisticsType?: CoverageStatisticsType[];
}
export const GetCoverageStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FilterCriteria: S.optional(CoverageFilterCriteria),
    StatisticsType: S.optional(CoverageStatisticsTypeList),
  })
    .pipe(
      S.encodeKeys({
        FilterCriteria: "filterCriteria",
        StatisticsType: "statisticsType",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/coverage/statistics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetCoverageStatisticsRequest",
}) as any as S.Schema<GetCoverageStatisticsRequest>;
export type ResourceType = "EKS" | "ECS" | "EC2" | (string & {});
export const ResourceType = S.String;

export type CountByResourceType = { [key in ResourceType]?: number };
export const CountByResourceType = /*@__PURE__*/ S.Record(
  ResourceType,
  S.Number.pipe(S.optional),
);
export type CoverageStatus = "HEALTHY" | "UNHEALTHY" | (string & {});
export const CoverageStatus = S.String;

export type CountByCoverageStatus = { [key in CoverageStatus]?: number };
export const CountByCoverageStatus = /*@__PURE__*/ S.Record(
  CoverageStatus,
  S.Number.pipe(S.optional),
);
export interface CoverageStatistics {
  CountByResourceType?: { [key: string]: number | undefined };
  CountByCoverageStatus?: { [key: string]: number | undefined };
}
export const CoverageStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CountByResourceType: S.optional(CountByResourceType),
    CountByCoverageStatus: S.optional(CountByCoverageStatus),
  }).pipe(
    S.encodeKeys({
      CountByResourceType: "countByResourceType",
      CountByCoverageStatus: "countByCoverageStatus",
    }),
  ),
).annotate({
  identifier: "CoverageStatistics",
}) as any as S.Schema<CoverageStatistics>;
export interface GetCoverageStatisticsResponse {
  CoverageStatistics?: CoverageStatistics;
}
export const GetCoverageStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CoverageStatistics: S.optional(CoverageStatistics) }).pipe(
    S.encodeKeys({ CoverageStatistics: "coverageStatistics" }),
  ),
).annotate({
  identifier: "GetCoverageStatisticsResponse",
}) as any as S.Schema<GetCoverageStatisticsResponse>;
export interface GetDetectorRequest {
  DetectorId: string;
}
export const GetDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDetectorRequest",
}) as any as S.Schema<GetDetectorRequest>;
export type DetectorStatus = "ENABLED" | "DISABLED" | (string & {});
export const DetectorStatus = S.String;

export interface CloudTrailConfigurationResult {
  Status?: DataSourceStatus;
}
export const CloudTrailConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(DataSourceStatus) }).pipe(
    S.encodeKeys({ Status: "status" }),
  ),
).annotate({
  identifier: "CloudTrailConfigurationResult",
}) as any as S.Schema<CloudTrailConfigurationResult>;
export interface DNSLogsConfigurationResult {
  Status?: DataSourceStatus;
}
export const DNSLogsConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(DataSourceStatus) }).pipe(
    S.encodeKeys({ Status: "status" }),
  ),
).annotate({
  identifier: "DNSLogsConfigurationResult",
}) as any as S.Schema<DNSLogsConfigurationResult>;
export interface FlowLogsConfigurationResult {
  Status?: DataSourceStatus;
}
export const FlowLogsConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(DataSourceStatus) }).pipe(
    S.encodeKeys({ Status: "status" }),
  ),
).annotate({
  identifier: "FlowLogsConfigurationResult",
}) as any as S.Schema<FlowLogsConfigurationResult>;
export interface S3LogsConfigurationResult {
  Status?: DataSourceStatus;
}
export const S3LogsConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(DataSourceStatus) }).pipe(
    S.encodeKeys({ Status: "status" }),
  ),
).annotate({
  identifier: "S3LogsConfigurationResult",
}) as any as S.Schema<S3LogsConfigurationResult>;
export interface KubernetesAuditLogsConfigurationResult {
  Status?: DataSourceStatus;
}
export const KubernetesAuditLogsConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Status: S.optional(DataSourceStatus) }).pipe(
      S.encodeKeys({ Status: "status" }),
    ),
).annotate({
  identifier: "KubernetesAuditLogsConfigurationResult",
}) as any as S.Schema<KubernetesAuditLogsConfigurationResult>;
export interface KubernetesConfigurationResult {
  AuditLogs?: KubernetesAuditLogsConfigurationResult;
}
export const KubernetesConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuditLogs: S.optional(KubernetesAuditLogsConfigurationResult),
  }).pipe(S.encodeKeys({ AuditLogs: "auditLogs" })),
).annotate({
  identifier: "KubernetesConfigurationResult",
}) as any as S.Schema<KubernetesConfigurationResult>;
export interface DataSourceConfigurationsResult {
  CloudTrail?: CloudTrailConfigurationResult;
  DNSLogs?: DNSLogsConfigurationResult;
  FlowLogs?: FlowLogsConfigurationResult;
  S3Logs?: S3LogsConfigurationResult;
  Kubernetes?: KubernetesConfigurationResult;
  MalwareProtection?: MalwareProtectionConfigurationResult;
}
export const DataSourceConfigurationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudTrail: S.optional(CloudTrailConfigurationResult),
    DNSLogs: S.optional(DNSLogsConfigurationResult),
    FlowLogs: S.optional(FlowLogsConfigurationResult),
    S3Logs: S.optional(S3LogsConfigurationResult),
    Kubernetes: S.optional(KubernetesConfigurationResult),
    MalwareProtection: S.optional(MalwareProtectionConfigurationResult),
  }).pipe(
    S.encodeKeys({
      CloudTrail: "cloudTrail",
      DNSLogs: "dnsLogs",
      FlowLogs: "flowLogs",
      S3Logs: "s3Logs",
      Kubernetes: "kubernetes",
      MalwareProtection: "malwareProtection",
    }),
  ),
).annotate({
  identifier: "DataSourceConfigurationsResult",
}) as any as S.Schema<DataSourceConfigurationsResult>;
export type DetectorFeatureResult =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | "AI_ANALYST"
  | (string & {});
export const DetectorFeatureResult = S.String;

export interface DetectorAdditionalConfigurationResult {
  Name?: FeatureAdditionalConfiguration;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
}
export const DetectorAdditionalConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.optional(FeatureAdditionalConfiguration),
      Status: S.optional(FeatureStatus),
      UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }).pipe(
      S.encodeKeys({ Name: "name", Status: "status", UpdatedAt: "updatedAt" }),
    ),
).annotate({
  identifier: "DetectorAdditionalConfigurationResult",
}) as any as S.Schema<DetectorAdditionalConfigurationResult>;
export type DetectorAdditionalConfigurationResults =
  DetectorAdditionalConfigurationResult[];
export const DetectorAdditionalConfigurationResults = /*@__PURE__*/ S.Array(
  DetectorAdditionalConfigurationResult,
);
export interface DetectorFeatureConfigurationResult {
  Name?: DetectorFeatureResult;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  AdditionalConfiguration?: DetectorAdditionalConfigurationResult[];
}
export const DetectorFeatureConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(DetectorFeatureResult),
    Status: S.optional(FeatureStatus),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AdditionalConfiguration: S.optional(DetectorAdditionalConfigurationResults),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Status: "status",
      UpdatedAt: "updatedAt",
      AdditionalConfiguration: "additionalConfiguration",
    }),
  ),
).annotate({
  identifier: "DetectorFeatureConfigurationResult",
}) as any as S.Schema<DetectorFeatureConfigurationResult>;
export type DetectorFeatureConfigurationsResults =
  DetectorFeatureConfigurationResult[];
export const DetectorFeatureConfigurationsResults = /*@__PURE__*/ S.Array(
  DetectorFeatureConfigurationResult,
);
export interface GetDetectorResponse {
  CreatedAt?: string;
  FindingPublishingFrequency?: FindingPublishingFrequency;
  ServiceRole: string;
  Status: DetectorStatus;
  UpdatedAt?: string;
  DataSources?: DataSourceConfigurationsResult & {
    CloudTrail: CloudTrailConfigurationResult & { Status: DataSourceStatus };
    DNSLogs: DNSLogsConfigurationResult & { Status: DataSourceStatus };
    FlowLogs: FlowLogsConfigurationResult & { Status: DataSourceStatus };
    S3Logs: S3LogsConfigurationResult & { Status: DataSourceStatus };
    Kubernetes: KubernetesConfigurationResult & {
      AuditLogs: KubernetesAuditLogsConfigurationResult & {
        Status: DataSourceStatus;
      };
    };
  };
  Tags?: { [key: string]: string | undefined };
  Features?: DetectorFeatureConfigurationResult[];
}
export const GetDetectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(S.String),
    FindingPublishingFrequency: S.optional(FindingPublishingFrequency),
    ServiceRole: S.optional(S.String),
    Status: S.optional(DetectorStatus),
    UpdatedAt: S.optional(S.String),
    DataSources: S.optional(DataSourceConfigurationsResult),
    Tags: S.optional(TagMap),
    Features: S.optional(DetectorFeatureConfigurationsResults),
  }).pipe(
    S.encodeKeys({
      CreatedAt: "createdAt",
      FindingPublishingFrequency: "findingPublishingFrequency",
      ServiceRole: "serviceRole",
      Status: "status",
      UpdatedAt: "updatedAt",
      DataSources: "dataSources",
      Tags: "tags",
      Features: "features",
    }),
  ),
).annotate({
  identifier: "GetDetectorResponse",
}) as any as S.Schema<GetDetectorResponse>;
export interface GetFilterRequest {
  DetectorId: string;
  FilterName: string;
}
export const GetFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FilterName: S.String.pipe(T.HttpLabel("FilterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/filter/{FilterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFilterRequest",
}) as any as S.Schema<GetFilterRequest>;
export type FilterVersion = number;
export interface GetFilterResponse {
  Name: string;
  Description?: string;
  Action: FilterAction;
  Rank?: number;
  FindingCriteria: FindingCriteria;
  Tags?: { [key: string]: string | undefined };
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Version?: number;
}
export const GetFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Action: S.optional(FilterAction),
    Rank: S.optional(S.Number),
    FindingCriteria: S.optional(FindingCriteria),
    Tags: S.optional(TagMap),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Description: "description",
      Action: "action",
      Rank: "rank",
      FindingCriteria: "findingCriteria",
      Tags: "tags",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      Version: "version",
    }),
  ),
).annotate({
  identifier: "GetFilterResponse",
}) as any as S.Schema<GetFilterResponse>;
export interface GetFindingsRequest {
  DetectorId: string;
  FindingIds?: string[];
  SortCriteria?: SortCriteria;
}
export const GetFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingIds: S.optional(FindingIds),
    SortCriteria: S.optional(SortCriteria),
  })
    .pipe(
      S.encodeKeys({ FindingIds: "findingIds", SortCriteria: "sortCriteria" }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings/get" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetFindingsRequest",
}) as any as S.Schema<GetFindingsRequest>;
export interface AccessKeyDetails {
  AccessKeyId?: string;
  PrincipalId?: string;
  UserName?: string;
  UserType?: string;
}
export const AccessKeyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.optional(S.String),
    PrincipalId: S.optional(S.String),
    UserName: S.optional(S.String),
    UserType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccessKeyId: "accessKeyId",
      PrincipalId: "principalId",
      UserName: "userName",
      UserType: "userType",
    }),
  ),
).annotate({
  identifier: "AccessKeyDetails",
}) as any as S.Schema<AccessKeyDetails>;
export interface Owner {
  Id?: string;
}
export const Owner = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
).annotate({ identifier: "Owner" }) as any as S.Schema<Owner>;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }).pipe(
    S.encodeKeys({ Key: "key", Value: "value" }),
  ),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface DefaultServerSideEncryption {
  EncryptionType?: string;
  KmsMasterKeyArn?: string;
}
export const DefaultServerSideEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionType: S.optional(S.String),
    KmsMasterKeyArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EncryptionType: "encryptionType",
      KmsMasterKeyArn: "kmsMasterKeyArn",
    }),
  ),
).annotate({
  identifier: "DefaultServerSideEncryption",
}) as any as S.Schema<DefaultServerSideEncryption>;
export interface AccessControlList {
  AllowsPublicReadAccess?: boolean;
  AllowsPublicWriteAccess?: boolean;
}
export const AccessControlList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowsPublicReadAccess: S.optional(S.Boolean),
    AllowsPublicWriteAccess: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      AllowsPublicReadAccess: "allowsPublicReadAccess",
      AllowsPublicWriteAccess: "allowsPublicWriteAccess",
    }),
  ),
).annotate({
  identifier: "AccessControlList",
}) as any as S.Schema<AccessControlList>;
export interface BucketPolicy {
  AllowsPublicReadAccess?: boolean;
  AllowsPublicWriteAccess?: boolean;
}
export const BucketPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowsPublicReadAccess: S.optional(S.Boolean),
    AllowsPublicWriteAccess: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      AllowsPublicReadAccess: "allowsPublicReadAccess",
      AllowsPublicWriteAccess: "allowsPublicWriteAccess",
    }),
  ),
).annotate({ identifier: "BucketPolicy" }) as any as S.Schema<BucketPolicy>;
export interface BlockPublicAccess {
  IgnorePublicAcls?: boolean;
  RestrictPublicBuckets?: boolean;
  BlockPublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
}
export const BlockPublicAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IgnorePublicAcls: S.optional(S.Boolean),
    RestrictPublicBuckets: S.optional(S.Boolean),
    BlockPublicAcls: S.optional(S.Boolean),
    BlockPublicPolicy: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      IgnorePublicAcls: "ignorePublicAcls",
      RestrictPublicBuckets: "restrictPublicBuckets",
      BlockPublicAcls: "blockPublicAcls",
      BlockPublicPolicy: "blockPublicPolicy",
    }),
  ),
).annotate({
  identifier: "BlockPublicAccess",
}) as any as S.Schema<BlockPublicAccess>;
export interface BucketLevelPermissions {
  AccessControlList?: AccessControlList;
  BucketPolicy?: BucketPolicy;
  BlockPublicAccess?: BlockPublicAccess;
}
export const BucketLevelPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessControlList: S.optional(AccessControlList),
    BucketPolicy: S.optional(BucketPolicy),
    BlockPublicAccess: S.optional(BlockPublicAccess),
  }).pipe(
    S.encodeKeys({
      AccessControlList: "accessControlList",
      BucketPolicy: "bucketPolicy",
      BlockPublicAccess: "blockPublicAccess",
    }),
  ),
).annotate({
  identifier: "BucketLevelPermissions",
}) as any as S.Schema<BucketLevelPermissions>;
export interface AccountLevelPermissions {
  BlockPublicAccess?: BlockPublicAccess;
}
export const AccountLevelPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BlockPublicAccess: S.optional(BlockPublicAccess) }).pipe(
    S.encodeKeys({ BlockPublicAccess: "blockPublicAccess" }),
  ),
).annotate({
  identifier: "AccountLevelPermissions",
}) as any as S.Schema<AccountLevelPermissions>;
export interface PermissionConfiguration {
  BucketLevelPermissions?: BucketLevelPermissions;
  AccountLevelPermissions?: AccountLevelPermissions;
}
export const PermissionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketLevelPermissions: S.optional(BucketLevelPermissions),
    AccountLevelPermissions: S.optional(AccountLevelPermissions),
  }).pipe(
    S.encodeKeys({
      BucketLevelPermissions: "bucketLevelPermissions",
      AccountLevelPermissions: "accountLevelPermissions",
    }),
  ),
).annotate({
  identifier: "PermissionConfiguration",
}) as any as S.Schema<PermissionConfiguration>;
export interface PublicAccess {
  PermissionConfiguration?: PermissionConfiguration;
  EffectivePermission?: string;
}
export const PublicAccess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PermissionConfiguration: S.optional(PermissionConfiguration),
    EffectivePermission: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PermissionConfiguration: "permissionConfiguration",
      EffectivePermission: "effectivePermission",
    }),
  ),
).annotate({ identifier: "PublicAccess" }) as any as S.Schema<PublicAccess>;
export interface S3ObjectDetail {
  ObjectArn?: string;
  Key?: string;
  ETag?: string;
  Hash?: string;
  VersionId?: string;
}
export const S3ObjectDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectArn: S.optional(S.String),
    Key: S.optional(S.String),
    ETag: S.optional(S.String),
    Hash: S.optional(S.String),
    VersionId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ObjectArn: "objectArn",
      Key: "key",
      ETag: "eTag",
      Hash: "hash",
      VersionId: "versionId",
    }),
  ),
).annotate({ identifier: "S3ObjectDetail" }) as any as S.Schema<S3ObjectDetail>;
export type S3ObjectDetails = S3ObjectDetail[];
export const S3ObjectDetails = /*@__PURE__*/ S.Array(S3ObjectDetail);
export interface S3BucketDetail {
  Arn?: string;
  Name?: string;
  Type?: string;
  CreatedAt?: Date;
  Owner?: Owner;
  Tags?: Tag[];
  DefaultServerSideEncryption?: DefaultServerSideEncryption;
  PublicAccess?: PublicAccess;
  S3ObjectDetails?: S3ObjectDetail[];
}
export const S3BucketDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Owner: S.optional(Owner),
    Tags: S.optional(Tags),
    DefaultServerSideEncryption: S.optional(DefaultServerSideEncryption),
    PublicAccess: S.optional(PublicAccess),
    S3ObjectDetails: S.optional(S3ObjectDetails),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Name: "name",
      Type: "type",
      CreatedAt: "createdAt",
      Owner: "owner",
      Tags: "tags",
      DefaultServerSideEncryption: "defaultServerSideEncryption",
      PublicAccess: "publicAccess",
      S3ObjectDetails: "s3ObjectDetails",
    }),
  ),
).annotate({ identifier: "S3BucketDetail" }) as any as S.Schema<S3BucketDetail>;
export type S3BucketDetails = S3BucketDetail[];
export const S3BucketDetails = /*@__PURE__*/ S.Array(S3BucketDetail);
export interface IamInstanceProfile {
  Arn?: string;
  Id?: string;
}
export const IamInstanceProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Id: S.optional(S.String) }).pipe(
    S.encodeKeys({ Arn: "arn", Id: "id" }),
  ),
).annotate({
  identifier: "IamInstanceProfile",
}) as any as S.Schema<IamInstanceProfile>;
export type Ipv6Addresses = string[];
export const Ipv6Addresses = /*@__PURE__*/ S.Array(S.String);
export type SensitiveString = string | redacted.Redacted<string>;
export interface PrivateIpAddressDetails {
  PrivateDnsName?: string;
  PrivateIpAddress?: string | redacted.Redacted<string>;
}
export const PrivateIpAddressDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrivateDnsName: S.optional(S.String),
    PrivateIpAddress: S.optional(SensitiveString),
  }).pipe(
    S.encodeKeys({
      PrivateDnsName: "privateDnsName",
      PrivateIpAddress: "privateIpAddress",
    }),
  ),
).annotate({
  identifier: "PrivateIpAddressDetails",
}) as any as S.Schema<PrivateIpAddressDetails>;
export type PrivateIpAddresses = PrivateIpAddressDetails[];
export const PrivateIpAddresses = /*@__PURE__*/ S.Array(
  PrivateIpAddressDetails,
);
export interface SecurityGroup {
  GroupId?: string;
  GroupName?: string;
}
export const SecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupId: S.optional(S.String),
    GroupName: S.optional(S.String),
  }).pipe(S.encodeKeys({ GroupId: "groupId", GroupName: "groupName" })),
).annotate({ identifier: "SecurityGroup" }) as any as S.Schema<SecurityGroup>;
export type SecurityGroups = SecurityGroup[];
export const SecurityGroups = /*@__PURE__*/ S.Array(SecurityGroup);
export interface NetworkInterface {
  Ipv6Addresses?: string[];
  NetworkInterfaceId?: string;
  PrivateDnsName?: string;
  PrivateIpAddress?: string | redacted.Redacted<string>;
  PrivateIpAddresses?: PrivateIpAddressDetails[];
  PublicDnsName?: string;
  PublicIp?: string;
  SecurityGroups?: SecurityGroup[];
  SubnetId?: string;
  VpcId?: string;
}
export const NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ipv6Addresses: S.optional(Ipv6Addresses),
    NetworkInterfaceId: S.optional(S.String),
    PrivateDnsName: S.optional(S.String),
    PrivateIpAddress: S.optional(SensitiveString),
    PrivateIpAddresses: S.optional(PrivateIpAddresses),
    PublicDnsName: S.optional(S.String),
    PublicIp: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroups),
    SubnetId: S.optional(S.String),
    VpcId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Ipv6Addresses: "ipv6Addresses",
      NetworkInterfaceId: "networkInterfaceId",
      PrivateDnsName: "privateDnsName",
      PrivateIpAddress: "privateIpAddress",
      PrivateIpAddresses: "privateIpAddresses",
      PublicDnsName: "publicDnsName",
      PublicIp: "publicIp",
      SecurityGroups: "securityGroups",
      SubnetId: "subnetId",
      VpcId: "vpcId",
    }),
  ),
).annotate({
  identifier: "NetworkInterface",
}) as any as S.Schema<NetworkInterface>;
export type NetworkInterfaces = NetworkInterface[];
export const NetworkInterfaces = /*@__PURE__*/ S.Array(NetworkInterface);
export interface ProductCode {
  Code?: string;
  ProductType?: string;
}
export const ProductCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(S.String),
    ProductType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Code: "productCodeId", ProductType: "productCodeType" }),
  ),
).annotate({ identifier: "ProductCode" }) as any as S.Schema<ProductCode>;
export type ProductCodes = ProductCode[];
export const ProductCodes = /*@__PURE__*/ S.Array(ProductCode);
export interface InstanceDetails {
  AvailabilityZone?: string;
  IamInstanceProfile?: IamInstanceProfile;
  ImageDescription?: string;
  ImageId?: string;
  InstanceId?: string;
  InstanceState?: string;
  InstanceType?: string;
  OutpostArn?: string;
  LaunchTime?: string;
  NetworkInterfaces?: NetworkInterface[];
  Platform?: string;
  ProductCodes?: ProductCode[];
  Tags?: Tag[];
}
export const InstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    IamInstanceProfile: S.optional(IamInstanceProfile),
    ImageDescription: S.optional(S.String),
    ImageId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceState: S.optional(S.String),
    InstanceType: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    LaunchTime: S.optional(S.String),
    NetworkInterfaces: S.optional(NetworkInterfaces),
    Platform: S.optional(S.String),
    ProductCodes: S.optional(ProductCodes),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      AvailabilityZone: "availabilityZone",
      IamInstanceProfile: "iamInstanceProfile",
      ImageDescription: "imageDescription",
      ImageId: "imageId",
      InstanceId: "instanceId",
      InstanceState: "instanceState",
      InstanceType: "instanceType",
      OutpostArn: "outpostArn",
      LaunchTime: "launchTime",
      NetworkInterfaces: "networkInterfaces",
      Platform: "platform",
      ProductCodes: "productCodes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "InstanceDetails",
}) as any as S.Schema<InstanceDetails>;
export interface EksClusterDetails {
  Name?: string;
  Arn?: string;
  VpcId?: string;
  Status?: string;
  Tags?: Tag[];
  CreatedAt?: Date;
}
export const EksClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    VpcId: S.optional(S.String),
    Status: S.optional(S.String),
    Tags: S.optional(Tags),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      VpcId: "vpcId",
      Status: "status",
      Tags: "tags",
      CreatedAt: "createdAt",
    }),
  ),
).annotate({
  identifier: "EksClusterDetails",
}) as any as S.Schema<EksClusterDetails>;
export type Groups = string[];
export const Groups = /*@__PURE__*/ S.Array(S.String);
export type SessionNameList = string[];
export const SessionNameList = /*@__PURE__*/ S.Array(S.String);
export interface ImpersonatedUser {
  Username?: string;
  Groups?: string[];
}
export const ImpersonatedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Username: S.optional(S.String), Groups: S.optional(Groups) }).pipe(
    S.encodeKeys({ Username: "username", Groups: "groups" }),
  ),
).annotate({
  identifier: "ImpersonatedUser",
}) as any as S.Schema<ImpersonatedUser>;
export interface KubernetesUserDetails {
  Username?: string;
  Uid?: string;
  Groups?: string[];
  SessionName?: string[];
  ImpersonatedUser?: ImpersonatedUser;
}
export const KubernetesUserDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    Uid: S.optional(S.String),
    Groups: S.optional(Groups),
    SessionName: S.optional(SessionNameList),
    ImpersonatedUser: S.optional(ImpersonatedUser),
  }).pipe(
    S.encodeKeys({
      Username: "username",
      Uid: "uid",
      Groups: "groups",
      SessionName: "sessionName",
      ImpersonatedUser: "impersonatedUser",
    }),
  ),
).annotate({
  identifier: "KubernetesUserDetails",
}) as any as S.Schema<KubernetesUserDetails>;
export interface VolumeMount {
  Name?: string;
  MountPath?: string;
}
export const VolumeMount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    MountPath: S.optional(S.String),
  }).pipe(S.encodeKeys({ Name: "name", MountPath: "mountPath" })),
).annotate({ identifier: "VolumeMount" }) as any as S.Schema<VolumeMount>;
export type VolumeMounts = VolumeMount[];
export const VolumeMounts = /*@__PURE__*/ S.Array(VolumeMount);
export interface SecurityContext {
  Privileged?: boolean;
  AllowPrivilegeEscalation?: boolean;
}
export const SecurityContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Privileged: S.optional(S.Boolean),
    AllowPrivilegeEscalation: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      Privileged: "privileged",
      AllowPrivilegeEscalation: "allowPrivilegeEscalation",
    }),
  ),
).annotate({
  identifier: "SecurityContext",
}) as any as S.Schema<SecurityContext>;
export interface Container {
  ContainerRuntime?: string;
  Id?: string;
  Name?: string;
  Image?: string;
  ImagePrefix?: string;
  VolumeMounts?: VolumeMount[];
  SecurityContext?: SecurityContext;
}
export const Container = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerRuntime: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Image: S.optional(S.String),
    ImagePrefix: S.optional(S.String),
    VolumeMounts: S.optional(VolumeMounts),
    SecurityContext: S.optional(SecurityContext),
  }).pipe(
    S.encodeKeys({
      ContainerRuntime: "containerRuntime",
      Id: "id",
      Name: "name",
      Image: "image",
      ImagePrefix: "imagePrefix",
      VolumeMounts: "volumeMounts",
      SecurityContext: "securityContext",
    }),
  ),
).annotate({ identifier: "Container" }) as any as S.Schema<Container>;
export type Containers = Container[];
export const Containers = /*@__PURE__*/ S.Array(Container);
export interface HostPath {
  Path?: string;
}
export const HostPath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.optional(S.String) }).pipe(S.encodeKeys({ Path: "path" })),
).annotate({ identifier: "HostPath" }) as any as S.Schema<HostPath>;
export interface Volume {
  Name?: string;
  HostPath?: HostPath;
}
export const Volume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), HostPath: S.optional(HostPath) }).pipe(
    S.encodeKeys({ Name: "name", HostPath: "hostPath" }),
  ),
).annotate({ identifier: "Volume" }) as any as S.Schema<Volume>;
export type Volumes = Volume[];
export const Volumes = /*@__PURE__*/ S.Array(Volume);
export interface KubernetesWorkloadDetails {
  Name?: string;
  Type?: string;
  Uid?: string;
  Namespace?: string;
  HostNetwork?: boolean;
  ServiceAccountName?: string;
  Containers?: Container[];
  Volumes?: Volume[];
  HostIPC?: boolean;
  HostPID?: boolean;
}
export const KubernetesWorkloadDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Uid: S.optional(S.String),
    Namespace: S.optional(S.String),
    HostNetwork: S.optional(S.Boolean),
    ServiceAccountName: S.optional(S.String),
    Containers: S.optional(Containers),
    Volumes: S.optional(Volumes),
    HostIPC: S.optional(S.Boolean),
    HostPID: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Type: "type",
      Uid: "uid",
      Namespace: "namespace",
      HostNetwork: "hostNetwork",
      ServiceAccountName: "serviceAccountName",
      Containers: "containers",
      Volumes: "volumes",
      HostIPC: "hostIPC",
      HostPID: "hostPID",
    }),
  ),
).annotate({
  identifier: "KubernetesWorkloadDetails",
}) as any as S.Schema<KubernetesWorkloadDetails>;
export interface KubernetesDetails {
  KubernetesUserDetails?: KubernetesUserDetails;
  KubernetesWorkloadDetails?: KubernetesWorkloadDetails;
}
export const KubernetesDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KubernetesUserDetails: S.optional(KubernetesUserDetails),
    KubernetesWorkloadDetails: S.optional(KubernetesWorkloadDetails),
  }).pipe(
    S.encodeKeys({
      KubernetesUserDetails: "kubernetesUserDetails",
      KubernetesWorkloadDetails: "kubernetesWorkloadDetails",
    }),
  ),
).annotate({
  identifier: "KubernetesDetails",
}) as any as S.Schema<KubernetesDetails>;
export interface EbsVolumeDetails {
  ScannedVolumeDetails?: VolumeDetail[];
  SkippedVolumeDetails?: VolumeDetail[];
}
export const EbsVolumeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScannedVolumeDetails: S.optional(VolumeDetails),
    SkippedVolumeDetails: S.optional(VolumeDetails),
  }).pipe(
    S.encodeKeys({
      ScannedVolumeDetails: "scannedVolumeDetails",
      SkippedVolumeDetails: "skippedVolumeDetails",
    }),
  ),
).annotate({
  identifier: "EbsVolumeDetails",
}) as any as S.Schema<EbsVolumeDetails>;
export interface EcsTaskDetails {
  Arn?: string;
  DefinitionArn?: string;
  Version?: string;
  TaskCreatedAt?: Date;
  StartedAt?: Date;
  StartedBy?: string;
  Tags?: Tag[];
  Volumes?: Volume[];
  Containers?: Container[];
  Group?: string;
  LaunchType?: string;
}
export const EcsTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    DefinitionArn: S.optional(S.String),
    Version: S.optional(S.String),
    TaskCreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedBy: S.optional(S.String),
    Tags: S.optional(Tags),
    Volumes: S.optional(Volumes),
    Containers: S.optional(Containers),
    Group: S.optional(S.String),
    LaunchType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      DefinitionArn: "definitionArn",
      Version: "version",
      TaskCreatedAt: "createdAt",
      StartedAt: "startedAt",
      StartedBy: "startedBy",
      Tags: "tags",
      Volumes: "volumes",
      Containers: "containers",
      Group: "group",
      LaunchType: "launchType",
    }),
  ),
).annotate({ identifier: "EcsTaskDetails" }) as any as S.Schema<EcsTaskDetails>;
export interface EcsClusterDetails {
  Name?: string;
  Arn?: string;
  Status?: string;
  ActiveServicesCount?: number;
  RegisteredContainerInstancesCount?: number;
  RunningTasksCount?: number;
  Tags?: Tag[];
  TaskDetails?: EcsTaskDetails;
}
export const EcsClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Status: S.optional(S.String),
    ActiveServicesCount: S.optional(S.Number),
    RegisteredContainerInstancesCount: S.optional(S.Number),
    RunningTasksCount: S.optional(S.Number),
    Tags: S.optional(Tags),
    TaskDetails: S.optional(EcsTaskDetails),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Arn: "arn",
      Status: "status",
      ActiveServicesCount: "activeServicesCount",
      RegisteredContainerInstancesCount: "registeredContainerInstancesCount",
      RunningTasksCount: "runningTasksCount",
      Tags: "tags",
      TaskDetails: "taskDetails",
    }),
  ),
).annotate({
  identifier: "EcsClusterDetails",
}) as any as S.Schema<EcsClusterDetails>;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  SubnetIds?: string[];
  VpcId?: string;
  SecurityGroups?: SecurityGroup[];
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetIds),
    VpcId: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroups),
  }).pipe(
    S.encodeKeys({
      SubnetIds: "subnetIds",
      VpcId: "vpcId",
      SecurityGroups: "securityGroups",
    }),
  ),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export interface LambdaDetails {
  FunctionArn?: string;
  FunctionName?: string;
  Description?: string;
  LastModifiedAt?: Date;
  RevisionId?: string;
  FunctionVersion?: string;
  Role?: string;
  VpcConfig?: VpcConfig;
  Tags?: Tag[];
}
export const LambdaDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionArn: S.optional(S.String),
    FunctionName: S.optional(S.String),
    Description: S.optional(S.String),
    LastModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevisionId: S.optional(S.String),
    FunctionVersion: S.optional(S.String),
    Role: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      FunctionArn: "functionArn",
      FunctionName: "functionName",
      Description: "description",
      LastModifiedAt: "lastModifiedAt",
      RevisionId: "revisionId",
      FunctionVersion: "functionVersion",
      Role: "role",
      VpcConfig: "vpcConfig",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "LambdaDetails" }) as any as S.Schema<LambdaDetails>;
export interface RdsDbInstanceDetails {
  DbInstanceIdentifier?: string;
  Engine?: string;
  EngineVersion?: string;
  DbClusterIdentifier?: string;
  DbInstanceArn?: string;
  DbiResourceId?: string;
  Tags?: Tag[];
}
export const RdsDbInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbInstanceIdentifier: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DbClusterIdentifier: S.optional(S.String),
    DbInstanceArn: S.optional(S.String),
    DbiResourceId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      DbInstanceIdentifier: "dbInstanceIdentifier",
      Engine: "engine",
      EngineVersion: "engineVersion",
      DbClusterIdentifier: "dbClusterIdentifier",
      DbInstanceArn: "dbInstanceArn",
      DbiResourceId: "dbiResourceId",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "RdsDbInstanceDetails",
}) as any as S.Schema<RdsDbInstanceDetails>;
export interface RdsLimitlessDbDetails {
  DbShardGroupIdentifier?: string;
  DbShardGroupResourceId?: string;
  DbShardGroupArn?: string;
  Engine?: string;
  EngineVersion?: string;
  DbClusterIdentifier?: string;
  Tags?: Tag[];
}
export const RdsLimitlessDbDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DbShardGroupIdentifier: S.optional(S.String),
    DbShardGroupResourceId: S.optional(S.String),
    DbShardGroupArn: S.optional(S.String),
    Engine: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    DbClusterIdentifier: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      DbShardGroupIdentifier: "dbShardGroupIdentifier",
      DbShardGroupResourceId: "dbShardGroupResourceId",
      DbShardGroupArn: "dbShardGroupArn",
      Engine: "engine",
      EngineVersion: "engineVersion",
      DbClusterIdentifier: "dbClusterIdentifier",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "RdsLimitlessDbDetails",
}) as any as S.Schema<RdsLimitlessDbDetails>;
export interface RdsDbUserDetails {
  User?: string;
  Application?: string;
  Database?: string;
  Ssl?: string;
  AuthMethod?: string;
}
export const RdsDbUserDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    User: S.optional(S.String),
    Application: S.optional(S.String),
    Database: S.optional(S.String),
    Ssl: S.optional(S.String),
    AuthMethod: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      User: "user",
      Application: "application",
      Database: "database",
      Ssl: "ssl",
      AuthMethod: "authMethod",
    }),
  ),
).annotate({
  identifier: "RdsDbUserDetails",
}) as any as S.Schema<RdsDbUserDetails>;
export interface EbsSnapshotDetails {
  SnapshotArn?: string;
}
export const EbsSnapshotDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnapshotArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ SnapshotArn: "snapshotArn" }),
  ),
).annotate({
  identifier: "EbsSnapshotDetails",
}) as any as S.Schema<EbsSnapshotDetails>;
export interface Ec2ImageDetails {
  ImageArn?: string;
}
export const Ec2ImageDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ ImageArn: "imageArn" }),
  ),
).annotate({
  identifier: "Ec2ImageDetails",
}) as any as S.Schema<Ec2ImageDetails>;
export interface ScanConfigurationContinuousScanDetails {
  StartTime?: Date;
  EndTime: Date;
}
export const ScanConfigurationContinuousScanDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }).pipe(S.encodeKeys({ StartTime: "startTime", EndTime: "endTime" })),
).annotate({
  identifier: "ScanConfigurationContinuousScanDetails",
}) as any as S.Schema<ScanConfigurationContinuousScanDetails>;
export interface RecoveryPointDetails {
  RecoveryPointArn?: string;
  BackupVaultName?: string;
  ContinuousScanDetails?: ScanConfigurationContinuousScanDetails;
}
export const RecoveryPointDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecoveryPointArn: S.optional(S.String),
    BackupVaultName: S.optional(S.String),
    ContinuousScanDetails: S.optional(ScanConfigurationContinuousScanDetails),
  }).pipe(
    S.encodeKeys({
      RecoveryPointArn: "recoveryPointArn",
      BackupVaultName: "backupVaultName",
      ContinuousScanDetails: "continuousScanDetails",
    }),
  ),
).annotate({
  identifier: "RecoveryPointDetails",
}) as any as S.Schema<RecoveryPointDetails>;
export interface BedrockGuardrail {
  Arn?: string;
  Version?: string;
}
export const BedrockGuardrail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Version: S.optional(S.String) }).pipe(
    S.encodeKeys({ Arn: "arn", Version: "version" }),
  ),
).annotate({
  identifier: "BedrockGuardrail",
}) as any as S.Schema<BedrockGuardrail>;
export type BedrockGuardrails = BedrockGuardrail[];
export const BedrockGuardrails = /*@__PURE__*/ S.Array(BedrockGuardrail);
export type GuardrailAction = "GUARDRAIL_INTERVENED" | "NONE" | (string & {});
export const GuardrailAction = S.String;

export type GuardrailSource = "INPUT" | "OUTPUT" | (string & {});
export const GuardrailSource = S.String;

export type ContentPolicyFilterType =
  | "PROMPT_ATTACK"
  | "JAILBREAK"
  | "HATE"
  | "INSULTS"
  | "SEXUAL"
  | "VIOLENCE"
  | "MISCONDUCT"
  | (string & {});
export const ContentPolicyFilterType = S.String;

export type ConfidenceLevel =
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NONE"
  | (string & {});
export const ConfidenceLevel = S.String;

export type ContentPolicyFilterAction = "BLOCKED" | "NONE" | (string & {});
export const ContentPolicyFilterAction = S.String;

export interface ContentPolicyFilter {
  Type?: ContentPolicyFilterType;
  Confidence?: ConfidenceLevel;
  Action?: ContentPolicyFilterAction;
}
export const ContentPolicyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ContentPolicyFilterType),
    Confidence: S.optional(ConfidenceLevel),
    Action: S.optional(ContentPolicyFilterAction),
  }).pipe(
    S.encodeKeys({ Type: "type", Confidence: "confidence", Action: "action" }),
  ),
).annotate({
  identifier: "ContentPolicyFilter",
}) as any as S.Schema<ContentPolicyFilter>;
export type ContentPolicyFilters = ContentPolicyFilter[];
export const ContentPolicyFilters = /*@__PURE__*/ S.Array(ContentPolicyFilter);
export interface BedrockGuardrailDetails {
  GuardrailArn?: string;
  GuardrailVersion?: string;
  Guardrails?: BedrockGuardrail[];
  GuardrailAction?: GuardrailAction;
  GuardrailSource?: GuardrailSource;
  ContentPolicyFilters?: ContentPolicyFilter[];
}
export const BedrockGuardrailDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GuardrailArn: S.optional(S.String),
    GuardrailVersion: S.optional(S.String),
    Guardrails: S.optional(BedrockGuardrails),
    GuardrailAction: S.optional(GuardrailAction),
    GuardrailSource: S.optional(GuardrailSource),
    ContentPolicyFilters: S.optional(ContentPolicyFilters),
  }).pipe(
    S.encodeKeys({
      GuardrailArn: "guardrailArn",
      GuardrailVersion: "guardrailVersion",
      Guardrails: "guardrails",
      GuardrailAction: "guardrailAction",
      GuardrailSource: "guardrailSource",
      ContentPolicyFilters: "contentPolicyFilters",
    }),
  ),
).annotate({
  identifier: "BedrockGuardrailDetails",
}) as any as S.Schema<BedrockGuardrailDetails>;
export interface ModelDetail {
  ModelId?: string;
}
export const ModelDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelId: S.optional(S.String) }).pipe(
    S.encodeKeys({ ModelId: "modelId" }),
  ),
).annotate({ identifier: "ModelDetail" }) as any as S.Schema<ModelDetail>;
export type ModelDetails = ModelDetail[];
export const ModelDetails = /*@__PURE__*/ S.Array(ModelDetail);
export interface Resource {
  AccessKeyDetails?: AccessKeyDetails;
  S3BucketDetails?: S3BucketDetail[];
  InstanceDetails?: InstanceDetails;
  EksClusterDetails?: EksClusterDetails;
  KubernetesDetails?: KubernetesDetails;
  ResourceType?: string;
  EbsVolumeDetails?: EbsVolumeDetails;
  EcsClusterDetails?: EcsClusterDetails;
  ContainerDetails?: Container;
  LambdaDetails?: LambdaDetails;
  RdsDbInstanceDetails?: RdsDbInstanceDetails;
  RdsLimitlessDbDetails?: RdsLimitlessDbDetails;
  RdsDbUserDetails?: RdsDbUserDetails;
  EbsSnapshotDetails?: EbsSnapshotDetails;
  Ec2ImageDetails?: Ec2ImageDetails;
  RecoveryPointDetails?: RecoveryPointDetails;
  BedrockGuardrailDetails?: BedrockGuardrailDetails;
  ModelDetails?: ModelDetail[];
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyDetails: S.optional(AccessKeyDetails),
    S3BucketDetails: S.optional(S3BucketDetails),
    InstanceDetails: S.optional(InstanceDetails),
    EksClusterDetails: S.optional(EksClusterDetails),
    KubernetesDetails: S.optional(KubernetesDetails),
    ResourceType: S.optional(S.String),
    EbsVolumeDetails: S.optional(EbsVolumeDetails),
    EcsClusterDetails: S.optional(EcsClusterDetails),
    ContainerDetails: S.optional(Container),
    LambdaDetails: S.optional(LambdaDetails),
    RdsDbInstanceDetails: S.optional(RdsDbInstanceDetails),
    RdsLimitlessDbDetails: S.optional(RdsLimitlessDbDetails),
    RdsDbUserDetails: S.optional(RdsDbUserDetails),
    EbsSnapshotDetails: S.optional(EbsSnapshotDetails),
    Ec2ImageDetails: S.optional(Ec2ImageDetails),
    RecoveryPointDetails: S.optional(RecoveryPointDetails),
    BedrockGuardrailDetails: S.optional(BedrockGuardrailDetails),
    ModelDetails: S.optional(ModelDetails),
  }).pipe(
    S.encodeKeys({
      AccessKeyDetails: "accessKeyDetails",
      S3BucketDetails: "s3BucketDetails",
      InstanceDetails: "instanceDetails",
      EksClusterDetails: "eksClusterDetails",
      KubernetesDetails: "kubernetesDetails",
      ResourceType: "resourceType",
      EbsVolumeDetails: "ebsVolumeDetails",
      EcsClusterDetails: "ecsClusterDetails",
      ContainerDetails: "containerDetails",
      LambdaDetails: "lambdaDetails",
      RdsDbInstanceDetails: "rdsDbInstanceDetails",
      RdsLimitlessDbDetails: "rdsLimitlessDbDetails",
      RdsDbUserDetails: "rdsDbUserDetails",
      EbsSnapshotDetails: "ebsSnapshotDetails",
      Ec2ImageDetails: "ec2ImageDetails",
      RecoveryPointDetails: "recoveryPointDetails",
      BedrockGuardrailDetails: "bedrockGuardrailDetails",
      ModelDetails: "modelDetails",
    }),
  ),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export interface DomainDetails {
  Domain?: string;
}
export const DomainDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.optional(S.String) }).pipe(
    S.encodeKeys({ Domain: "domain" }),
  ),
).annotate({ identifier: "DomainDetails" }) as any as S.Schema<DomainDetails>;
export interface City {
  CityName?: string;
}
export const City = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CityName: S.optional(S.String) }).pipe(
    S.encodeKeys({ CityName: "cityName" }),
  ),
).annotate({ identifier: "City" }) as any as S.Schema<City>;
export interface Country {
  CountryCode?: string;
  CountryName?: string;
}
export const Country = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CountryCode: S.optional(S.String),
    CountryName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ CountryCode: "countryCode", CountryName: "countryName" }),
  ),
).annotate({ identifier: "Country" }) as any as S.Schema<Country>;
export interface GeoLocation {
  Lat?: number;
  Lon?: number;
}
export const GeoLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Lat: S.optional(S.Number), Lon: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Lat: "lat", Lon: "lon" }),
  ),
).annotate({ identifier: "GeoLocation" }) as any as S.Schema<GeoLocation>;
export interface Organization {
  Asn?: string;
  AsnOrg?: string;
  Isp?: string;
  Org?: string;
}
export const Organization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Asn: S.optional(S.String),
    AsnOrg: S.optional(S.String),
    Isp: S.optional(S.String),
    Org: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Asn: "asn", AsnOrg: "asnOrg", Isp: "isp", Org: "org" }),
  ),
).annotate({ identifier: "Organization" }) as any as S.Schema<Organization>;
export interface RemoteIpDetails {
  City?: City;
  Country?: Country;
  GeoLocation?: GeoLocation;
  IpAddressV4?: string | redacted.Redacted<string>;
  IpAddressV6?: string | redacted.Redacted<string>;
  Organization?: Organization;
}
export const RemoteIpDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(City),
    Country: S.optional(Country),
    GeoLocation: S.optional(GeoLocation),
    IpAddressV4: S.optional(SensitiveString),
    IpAddressV6: S.optional(SensitiveString),
    Organization: S.optional(Organization),
  }).pipe(
    S.encodeKeys({
      City: "city",
      Country: "country",
      GeoLocation: "geoLocation",
      IpAddressV4: "ipAddressV4",
      IpAddressV6: "ipAddressV6",
      Organization: "organization",
    }),
  ),
).annotate({
  identifier: "RemoteIpDetails",
}) as any as S.Schema<RemoteIpDetails>;
export interface RemoteAccountDetails {
  AccountId?: string;
  Affiliated?: boolean;
}
export const RemoteAccountDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Affiliated: S.optional(S.Boolean),
  }).pipe(S.encodeKeys({ AccountId: "accountId", Affiliated: "affiliated" })),
).annotate({
  identifier: "RemoteAccountDetails",
}) as any as S.Schema<RemoteAccountDetails>;
export type AffectedResources = { [key: string]: string | undefined };
export const AffectedResources = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AwsApiCallAction {
  Api?: string;
  CallerType?: string;
  DomainDetails?: DomainDetails;
  ErrorCode?: string;
  UserAgent?: string;
  RemoteIpDetails?: RemoteIpDetails;
  ServiceName?: string;
  RemoteAccountDetails?: RemoteAccountDetails;
  AffectedResources?: { [key: string]: string | undefined };
}
export const AwsApiCallAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Api: S.optional(S.String),
    CallerType: S.optional(S.String),
    DomainDetails: S.optional(DomainDetails),
    ErrorCode: S.optional(S.String),
    UserAgent: S.optional(S.String),
    RemoteIpDetails: S.optional(RemoteIpDetails),
    ServiceName: S.optional(S.String),
    RemoteAccountDetails: S.optional(RemoteAccountDetails),
    AffectedResources: S.optional(AffectedResources),
  }).pipe(
    S.encodeKeys({
      Api: "api",
      CallerType: "callerType",
      DomainDetails: "domainDetails",
      ErrorCode: "errorCode",
      UserAgent: "userAgent",
      RemoteIpDetails: "remoteIpDetails",
      ServiceName: "serviceName",
      RemoteAccountDetails: "remoteAccountDetails",
      AffectedResources: "affectedResources",
    }),
  ),
).annotate({
  identifier: "AwsApiCallAction",
}) as any as S.Schema<AwsApiCallAction>;
export interface DnsRequestAction {
  Domain?: string;
  Protocol?: string;
  Blocked?: boolean;
  DomainWithSuffix?: string;
  VpcOwnerAccountId?: string;
}
export const DnsRequestAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    Protocol: S.optional(S.String),
    Blocked: S.optional(S.Boolean),
    DomainWithSuffix: S.optional(S.String),
    VpcOwnerAccountId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Domain: "domain",
      Protocol: "protocol",
      Blocked: "blocked",
      DomainWithSuffix: "domainWithSuffix",
      VpcOwnerAccountId: "vpcOwnerAccountId",
    }),
  ),
).annotate({
  identifier: "DnsRequestAction",
}) as any as S.Schema<DnsRequestAction>;
export interface LocalPortDetails {
  Port?: number;
  PortName?: string;
}
export const LocalPortDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Port: S.optional(S.Number), PortName: S.optional(S.String) }).pipe(
    S.encodeKeys({ Port: "port", PortName: "portName" }),
  ),
).annotate({
  identifier: "LocalPortDetails",
}) as any as S.Schema<LocalPortDetails>;
export interface LocalIpDetails {
  IpAddressV4?: string | redacted.Redacted<string>;
  IpAddressV6?: string | redacted.Redacted<string>;
}
export const LocalIpDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpAddressV4: S.optional(SensitiveString),
    IpAddressV6: S.optional(SensitiveString),
  }).pipe(
    S.encodeKeys({ IpAddressV4: "ipAddressV4", IpAddressV6: "ipAddressV6" }),
  ),
).annotate({ identifier: "LocalIpDetails" }) as any as S.Schema<LocalIpDetails>;
export interface RemotePortDetails {
  Port?: number;
  PortName?: string;
}
export const RemotePortDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Port: S.optional(S.Number), PortName: S.optional(S.String) }).pipe(
    S.encodeKeys({ Port: "port", PortName: "portName" }),
  ),
).annotate({
  identifier: "RemotePortDetails",
}) as any as S.Schema<RemotePortDetails>;
export interface NetworkConnectionAction {
  Blocked?: boolean;
  ConnectionDirection?: string;
  LocalPortDetails?: LocalPortDetails;
  Protocol?: string;
  LocalIpDetails?: LocalIpDetails;
  LocalNetworkInterface?: string;
  RemoteIpDetails?: RemoteIpDetails;
  RemotePortDetails?: RemotePortDetails;
}
export const NetworkConnectionAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blocked: S.optional(S.Boolean),
    ConnectionDirection: S.optional(S.String),
    LocalPortDetails: S.optional(LocalPortDetails),
    Protocol: S.optional(S.String),
    LocalIpDetails: S.optional(LocalIpDetails),
    LocalNetworkInterface: S.optional(S.String),
    RemoteIpDetails: S.optional(RemoteIpDetails),
    RemotePortDetails: S.optional(RemotePortDetails),
  }).pipe(
    S.encodeKeys({
      Blocked: "blocked",
      ConnectionDirection: "connectionDirection",
      LocalPortDetails: "localPortDetails",
      Protocol: "protocol",
      LocalIpDetails: "localIpDetails",
      LocalNetworkInterface: "localNetworkInterface",
      RemoteIpDetails: "remoteIpDetails",
      RemotePortDetails: "remotePortDetails",
    }),
  ),
).annotate({
  identifier: "NetworkConnectionAction",
}) as any as S.Schema<NetworkConnectionAction>;
export interface PortProbeDetail {
  LocalPortDetails?: LocalPortDetails;
  LocalIpDetails?: LocalIpDetails;
  RemoteIpDetails?: RemoteIpDetails;
}
export const PortProbeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalPortDetails: S.optional(LocalPortDetails),
    LocalIpDetails: S.optional(LocalIpDetails),
    RemoteIpDetails: S.optional(RemoteIpDetails),
  }).pipe(
    S.encodeKeys({
      LocalPortDetails: "localPortDetails",
      LocalIpDetails: "localIpDetails",
      RemoteIpDetails: "remoteIpDetails",
    }),
  ),
).annotate({
  identifier: "PortProbeDetail",
}) as any as S.Schema<PortProbeDetail>;
export type PortProbeDetails = PortProbeDetail[];
export const PortProbeDetails = /*@__PURE__*/ S.Array(PortProbeDetail);
export interface PortProbeAction {
  Blocked?: boolean;
  PortProbeDetails?: PortProbeDetail[];
}
export const PortProbeAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blocked: S.optional(S.Boolean),
    PortProbeDetails: S.optional(PortProbeDetails),
  }).pipe(
    S.encodeKeys({ Blocked: "blocked", PortProbeDetails: "portProbeDetails" }),
  ),
).annotate({
  identifier: "PortProbeAction",
}) as any as S.Schema<PortProbeAction>;
export type SourceIps = string[];
export const SourceIps = /*@__PURE__*/ S.Array(S.String);
export interface KubernetesApiCallAction {
  RequestUri?: string;
  Verb?: string;
  Resource?: string;
  Subresource?: string;
  Namespace?: string;
  ResourceName?: string;
  SourceIps?: string[];
  UserAgent?: string;
  RemoteIpDetails?: RemoteIpDetails;
  StatusCode?: number;
  Parameters?: string;
}
export const KubernetesApiCallAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestUri: S.optional(S.String),
    Verb: S.optional(S.String),
    Resource: S.optional(S.String),
    Subresource: S.optional(S.String),
    Namespace: S.optional(S.String),
    ResourceName: S.optional(S.String),
    SourceIps: S.optional(SourceIps),
    UserAgent: S.optional(S.String),
    RemoteIpDetails: S.optional(RemoteIpDetails),
    StatusCode: S.optional(S.Number),
    Parameters: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      RequestUri: "requestUri",
      Verb: "verb",
      Resource: "resource",
      Subresource: "subresource",
      Namespace: "namespace",
      ResourceName: "resourceName",
      SourceIps: "sourceIPs",
      UserAgent: "userAgent",
      RemoteIpDetails: "remoteIpDetails",
      StatusCode: "statusCode",
      Parameters: "parameters",
    }),
  ),
).annotate({
  identifier: "KubernetesApiCallAction",
}) as any as S.Schema<KubernetesApiCallAction>;
export interface KubernetesPermissionCheckedDetails {
  Verb?: string;
  Resource?: string;
  Namespace?: string;
  Allowed?: boolean;
}
export const KubernetesPermissionCheckedDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Verb: S.optional(S.String),
    Resource: S.optional(S.String),
    Namespace: S.optional(S.String),
    Allowed: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      Verb: "verb",
      Resource: "resource",
      Namespace: "namespace",
      Allowed: "allowed",
    }),
  ),
).annotate({
  identifier: "KubernetesPermissionCheckedDetails",
}) as any as S.Schema<KubernetesPermissionCheckedDetails>;
export interface KubernetesRoleBindingDetails {
  Kind?: string;
  Name?: string;
  Uid?: string;
  RoleRefName?: string;
  RoleRefKind?: string;
}
export const KubernetesRoleBindingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Kind: S.optional(S.String),
    Name: S.optional(S.String),
    Uid: S.optional(S.String),
    RoleRefName: S.optional(S.String),
    RoleRefKind: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Kind: "kind",
      Name: "name",
      Uid: "uid",
      RoleRefName: "roleRefName",
      RoleRefKind: "roleRefKind",
    }),
  ),
).annotate({
  identifier: "KubernetesRoleBindingDetails",
}) as any as S.Schema<KubernetesRoleBindingDetails>;
export interface KubernetesRoleDetails {
  Kind?: string;
  Name?: string;
  Uid?: string;
}
export const KubernetesRoleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Kind: S.optional(S.String),
    Name: S.optional(S.String),
    Uid: S.optional(S.String),
  }).pipe(S.encodeKeys({ Kind: "kind", Name: "name", Uid: "uid" })),
).annotate({
  identifier: "KubernetesRoleDetails",
}) as any as S.Schema<KubernetesRoleDetails>;
export interface LoginAttribute {
  User?: string;
  Application?: string;
  FailedLoginAttempts?: number;
  SuccessfulLoginAttempts?: number;
}
export const LoginAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    User: S.optional(S.String),
    Application: S.optional(S.String),
    FailedLoginAttempts: S.optional(S.Number),
    SuccessfulLoginAttempts: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      User: "user",
      Application: "application",
      FailedLoginAttempts: "failedLoginAttempts",
      SuccessfulLoginAttempts: "successfulLoginAttempts",
    }),
  ),
).annotate({ identifier: "LoginAttribute" }) as any as S.Schema<LoginAttribute>;
export type LoginAttributes = LoginAttribute[];
export const LoginAttributes = /*@__PURE__*/ S.Array(LoginAttribute);
export interface RdsLoginAttemptAction {
  RemoteIpDetails?: RemoteIpDetails;
  LoginAttributes?: LoginAttribute[];
}
export const RdsLoginAttemptAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RemoteIpDetails: S.optional(RemoteIpDetails),
    LoginAttributes: S.optional(LoginAttributes),
  }).pipe(S.encodeKeys({ RemoteIpDetails: "remoteIpDetails" })),
).annotate({
  identifier: "RdsLoginAttemptAction",
}) as any as S.Schema<RdsLoginAttemptAction>;
export interface Action {
  ActionType?: string;
  AwsApiCallAction?: AwsApiCallAction;
  DnsRequestAction?: DnsRequestAction;
  NetworkConnectionAction?: NetworkConnectionAction;
  PortProbeAction?: PortProbeAction;
  KubernetesApiCallAction?: KubernetesApiCallAction;
  KubernetesPermissionCheckedDetails?: KubernetesPermissionCheckedDetails;
  KubernetesRoleBindingDetails?: KubernetesRoleBindingDetails;
  KubernetesRoleDetails?: KubernetesRoleDetails;
  RdsLoginAttemptAction?: RdsLoginAttemptAction;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionType: S.optional(S.String),
    AwsApiCallAction: S.optional(AwsApiCallAction),
    DnsRequestAction: S.optional(DnsRequestAction),
    NetworkConnectionAction: S.optional(NetworkConnectionAction),
    PortProbeAction: S.optional(PortProbeAction),
    KubernetesApiCallAction: S.optional(KubernetesApiCallAction),
    KubernetesPermissionCheckedDetails: S.optional(
      KubernetesPermissionCheckedDetails,
    ),
    KubernetesRoleBindingDetails: S.optional(KubernetesRoleBindingDetails),
    KubernetesRoleDetails: S.optional(KubernetesRoleDetails),
    RdsLoginAttemptAction: S.optional(RdsLoginAttemptAction),
  }).pipe(
    S.encodeKeys({
      ActionType: "actionType",
      AwsApiCallAction: "awsApiCallAction",
      DnsRequestAction: "dnsRequestAction",
      NetworkConnectionAction: "networkConnectionAction",
      PortProbeAction: "portProbeAction",
      KubernetesApiCallAction: "kubernetesApiCallAction",
      KubernetesPermissionCheckedDetails: "kubernetesPermissionCheckedDetails",
      KubernetesRoleBindingDetails: "kubernetesRoleBindingDetails",
      KubernetesRoleDetails: "kubernetesRoleDetails",
      RdsLoginAttemptAction: "rdsLoginAttemptAction",
    }),
  ),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type ThreatNames = string[];
export const ThreatNames = /*@__PURE__*/ S.Array(S.String);
export interface ThreatIntelligenceDetail {
  ThreatListName?: string;
  ThreatNames?: string[];
  ThreatFileSha256?: string;
}
export const ThreatIntelligenceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThreatListName: S.optional(S.String),
    ThreatNames: S.optional(ThreatNames),
    ThreatFileSha256: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ThreatListName: "threatListName",
      ThreatNames: "threatNames",
      ThreatFileSha256: "threatFileSha256",
    }),
  ),
).annotate({
  identifier: "ThreatIntelligenceDetail",
}) as any as S.Schema<ThreatIntelligenceDetail>;
export type ThreatIntelligenceDetails = ThreatIntelligenceDetail[];
export const ThreatIntelligenceDetails = /*@__PURE__*/ S.Array(
  ThreatIntelligenceDetail,
);
export interface Evidence {
  ThreatIntelligenceDetails?: ThreatIntelligenceDetail[];
}
export const Evidence = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThreatIntelligenceDetails: S.optional(ThreatIntelligenceDetails),
  }).pipe(
    S.encodeKeys({ ThreatIntelligenceDetails: "threatIntelligenceDetails" }),
  ),
).annotate({ identifier: "Evidence" }) as any as S.Schema<Evidence>;
export interface ServiceAdditionalInfo {
  Value?: string;
  Type?: string;
}
export const ServiceAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String), Type: S.optional(S.String) }).pipe(
    S.encodeKeys({ Value: "value", Type: "type" }),
  ),
).annotate({
  identifier: "ServiceAdditionalInfo",
}) as any as S.Schema<ServiceAdditionalInfo>;
export type Sources = string[];
export const Sources = /*@__PURE__*/ S.Array(S.String);
export interface ScannedItemCount {
  TotalGb?: number;
  Files?: number;
  Volumes?: number;
}
export const ScannedItemCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalGb: S.optional(S.Number),
    Files: S.optional(S.Number),
    Volumes: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ TotalGb: "totalGb", Files: "files", Volumes: "volumes" }),
  ),
).annotate({
  identifier: "ScannedItemCount",
}) as any as S.Schema<ScannedItemCount>;
export interface ThreatsDetectedItemCount {
  Files?: number;
}
export const ThreatsDetectedItemCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Files: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Files: "files" }),
  ),
).annotate({
  identifier: "ThreatsDetectedItemCount",
}) as any as S.Schema<ThreatsDetectedItemCount>;
export interface HighestSeverityThreatDetails {
  Severity?: string;
  ThreatName?: string;
  Count?: number;
}
export const HighestSeverityThreatDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Severity: S.optional(S.String),
    ThreatName: S.optional(S.String),
    Count: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Severity: "severity",
      ThreatName: "threatName",
      Count: "count",
    }),
  ),
).annotate({
  identifier: "HighestSeverityThreatDetails",
}) as any as S.Schema<HighestSeverityThreatDetails>;
export interface ScanFilePath {
  FilePath?: string;
  VolumeArn?: string;
  Hash?: string;
  FileName?: string;
}
export const ScanFilePath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilePath: S.optional(S.String),
    VolumeArn: S.optional(S.String),
    Hash: S.optional(S.String),
    FileName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FilePath: "filePath",
      VolumeArn: "volumeArn",
      Hash: "hash",
      FileName: "fileName",
    }),
  ),
).annotate({ identifier: "ScanFilePath" }) as any as S.Schema<ScanFilePath>;
export type FilePaths = ScanFilePath[];
export const FilePaths = /*@__PURE__*/ S.Array(ScanFilePath);
export interface ScanThreatName {
  Name?: string;
  Severity?: string;
  ItemCount?: number;
  FilePaths?: ScanFilePath[];
}
export const ScanThreatName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Severity: S.optional(S.String),
    ItemCount: S.optional(S.Number),
    FilePaths: S.optional(FilePaths),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Severity: "severity",
      ItemCount: "itemCount",
      FilePaths: "filePaths",
    }),
  ),
).annotate({ identifier: "ScanThreatName" }) as any as S.Schema<ScanThreatName>;
export type ScanThreatNames = ScanThreatName[];
export const ScanThreatNames = /*@__PURE__*/ S.Array(ScanThreatName);
export interface ThreatDetectedByName {
  ItemCount?: number;
  UniqueThreatNameCount?: number;
  Shortened?: boolean;
  ThreatNames?: ScanThreatName[];
}
export const ThreatDetectedByName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCount: S.optional(S.Number),
    UniqueThreatNameCount: S.optional(S.Number),
    Shortened: S.optional(S.Boolean),
    ThreatNames: S.optional(ScanThreatNames),
  }).pipe(
    S.encodeKeys({
      ItemCount: "itemCount",
      UniqueThreatNameCount: "uniqueThreatNameCount",
      Shortened: "shortened",
      ThreatNames: "threatNames",
    }),
  ),
).annotate({
  identifier: "ThreatDetectedByName",
}) as any as S.Schema<ThreatDetectedByName>;
export interface ScanDetections {
  ScannedItemCount?: ScannedItemCount;
  ThreatsDetectedItemCount?: ThreatsDetectedItemCount;
  HighestSeverityThreatDetails?: HighestSeverityThreatDetails;
  ThreatDetectedByName?: ThreatDetectedByName;
}
export const ScanDetections = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScannedItemCount: S.optional(ScannedItemCount),
    ThreatsDetectedItemCount: S.optional(ThreatsDetectedItemCount),
    HighestSeverityThreatDetails: S.optional(HighestSeverityThreatDetails),
    ThreatDetectedByName: S.optional(ThreatDetectedByName),
  }).pipe(
    S.encodeKeys({
      ScannedItemCount: "scannedItemCount",
      ThreatsDetectedItemCount: "threatsDetectedItemCount",
      HighestSeverityThreatDetails: "highestSeverityThreatDetails",
      ThreatDetectedByName: "threatDetectedByName",
    }),
  ),
).annotate({ identifier: "ScanDetections" }) as any as S.Schema<ScanDetections>;
export interface EbsVolumeScanDetails {
  ScanId?: string;
  ScanStartedAt?: Date;
  ScanCompletedAt?: Date;
  TriggerFindingId?: string;
  Sources?: string[];
  ScanDetections?: ScanDetections;
  ScanType?: ScanType;
}
export const EbsVolumeScanDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScanId: S.optional(S.String),
    ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScanCompletedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TriggerFindingId: S.optional(S.String),
    Sources: S.optional(Sources),
    ScanDetections: S.optional(ScanDetections),
    ScanType: S.optional(ScanType),
  }).pipe(
    S.encodeKeys({
      ScanId: "scanId",
      ScanStartedAt: "scanStartedAt",
      ScanCompletedAt: "scanCompletedAt",
      TriggerFindingId: "triggerFindingId",
      Sources: "sources",
      ScanDetections: "scanDetections",
      ScanType: "scanType",
    }),
  ),
).annotate({
  identifier: "EbsVolumeScanDetails",
}) as any as S.Schema<EbsVolumeScanDetails>;
export interface LineageObject {
  StartTime?: Date;
  NamespacePid?: number;
  UserId?: number;
  Name?: string;
  Pid?: number;
  Uuid?: string;
  ExecutablePath?: string;
  Euid?: number;
  ParentUuid?: string;
}
export const LineageObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NamespacePid: S.optional(S.Number),
    UserId: S.optional(S.Number),
    Name: S.optional(S.String),
    Pid: S.optional(S.Number),
    Uuid: S.optional(S.String),
    ExecutablePath: S.optional(S.String),
    Euid: S.optional(S.Number),
    ParentUuid: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      StartTime: "startTime",
      NamespacePid: "namespacePid",
      UserId: "userId",
      Name: "name",
      Pid: "pid",
      Uuid: "uuid",
      ExecutablePath: "executablePath",
      Euid: "euid",
      ParentUuid: "parentUuid",
    }),
  ),
).annotate({ identifier: "LineageObject" }) as any as S.Schema<LineageObject>;
export type Lineage = LineageObject[];
export const Lineage = /*@__PURE__*/ S.Array(LineageObject);
export interface ProcessDetails {
  Name?: string;
  ExecutablePath?: string;
  ExecutableSha256?: string;
  NamespacePid?: number;
  Pwd?: string;
  Pid?: number;
  StartTime?: Date;
  Uuid?: string;
  ParentUuid?: string;
  User?: string;
  UserId?: number;
  Euid?: number;
  Lineage?: LineageObject[];
}
export const ProcessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ExecutablePath: S.optional(S.String),
    ExecutableSha256: S.optional(S.String),
    NamespacePid: S.optional(S.Number),
    Pwd: S.optional(S.String),
    Pid: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Uuid: S.optional(S.String),
    ParentUuid: S.optional(S.String),
    User: S.optional(S.String),
    UserId: S.optional(S.Number),
    Euid: S.optional(S.Number),
    Lineage: S.optional(Lineage),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      ExecutablePath: "executablePath",
      ExecutableSha256: "executableSha256",
      NamespacePid: "namespacePid",
      Pwd: "pwd",
      Pid: "pid",
      StartTime: "startTime",
      Uuid: "uuid",
      ParentUuid: "parentUuid",
      User: "user",
      UserId: "userId",
      Euid: "euid",
      Lineage: "lineage",
    }),
  ),
).annotate({ identifier: "ProcessDetails" }) as any as S.Schema<ProcessDetails>;
export type FlagsList = string[];
export const FlagsList = /*@__PURE__*/ S.Array(S.String);
export type MemoryRegionsList = string[];
export const MemoryRegionsList = /*@__PURE__*/ S.Array(S.String);
export type RelatedFilePathsList = string[];
export const RelatedFilePathsList = /*@__PURE__*/ S.Array(S.String);
export interface RuntimeContext {
  ModifyingProcess?: ProcessDetails;
  ModifiedAt?: Date;
  ScriptPath?: string;
  LibraryPath?: string;
  LdPreloadValue?: string;
  SocketPath?: string;
  RuncBinaryPath?: string;
  ReleaseAgentPath?: string;
  MountSource?: string;
  MountTarget?: string;
  FileSystemType?: string;
  Flags?: string[];
  ModuleName?: string;
  ModuleFilePath?: string;
  ModuleSha256?: string;
  ShellHistoryFilePath?: string;
  TargetProcess?: ProcessDetails;
  AddressFamily?: string;
  IanaProtocolNumber?: number;
  MemoryRegions?: string[];
  ToolName?: string;
  ToolCategory?: string;
  ServiceName?: string;
  CommandLineExample?: string;
  ThreatFilePath?: string;
  FileOperation?: string;
  FilePath?: string;
  RelatedFilePaths?: string[];
}
export const RuntimeContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModifyingProcess: S.optional(ProcessDetails),
    ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScriptPath: S.optional(S.String),
    LibraryPath: S.optional(S.String),
    LdPreloadValue: S.optional(S.String),
    SocketPath: S.optional(S.String),
    RuncBinaryPath: S.optional(S.String),
    ReleaseAgentPath: S.optional(S.String),
    MountSource: S.optional(S.String),
    MountTarget: S.optional(S.String),
    FileSystemType: S.optional(S.String),
    Flags: S.optional(FlagsList),
    ModuleName: S.optional(S.String),
    ModuleFilePath: S.optional(S.String),
    ModuleSha256: S.optional(S.String),
    ShellHistoryFilePath: S.optional(S.String),
    TargetProcess: S.optional(ProcessDetails),
    AddressFamily: S.optional(S.String),
    IanaProtocolNumber: S.optional(S.Number),
    MemoryRegions: S.optional(MemoryRegionsList),
    ToolName: S.optional(S.String),
    ToolCategory: S.optional(S.String),
    ServiceName: S.optional(S.String),
    CommandLineExample: S.optional(S.String),
    ThreatFilePath: S.optional(S.String),
    FileOperation: S.optional(S.String),
    FilePath: S.optional(S.String),
    RelatedFilePaths: S.optional(RelatedFilePathsList),
  }).pipe(
    S.encodeKeys({
      ModifyingProcess: "modifyingProcess",
      ModifiedAt: "modifiedAt",
      ScriptPath: "scriptPath",
      LibraryPath: "libraryPath",
      LdPreloadValue: "ldPreloadValue",
      SocketPath: "socketPath",
      RuncBinaryPath: "runcBinaryPath",
      ReleaseAgentPath: "releaseAgentPath",
      MountSource: "mountSource",
      MountTarget: "mountTarget",
      FileSystemType: "fileSystemType",
      Flags: "flags",
      ModuleName: "moduleName",
      ModuleFilePath: "moduleFilePath",
      ModuleSha256: "moduleSha256",
      ShellHistoryFilePath: "shellHistoryFilePath",
      TargetProcess: "targetProcess",
      AddressFamily: "addressFamily",
      IanaProtocolNumber: "ianaProtocolNumber",
      MemoryRegions: "memoryRegions",
      ToolName: "toolName",
      ToolCategory: "toolCategory",
      ServiceName: "serviceName",
      CommandLineExample: "commandLineExample",
      ThreatFilePath: "threatFilePath",
      FileOperation: "fileOperation",
      FilePath: "filePath",
      RelatedFilePaths: "relatedFilePaths",
    }),
  ),
).annotate({ identifier: "RuntimeContext" }) as any as S.Schema<RuntimeContext>;
export interface RuntimeDetails {
  Process?: ProcessDetails;
  Context?: RuntimeContext;
}
export const RuntimeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Process: S.optional(ProcessDetails),
    Context: S.optional(RuntimeContext),
  }).pipe(S.encodeKeys({ Process: "process", Context: "context" })),
).annotate({ identifier: "RuntimeDetails" }) as any as S.Schema<RuntimeDetails>;
export type ProfileType = "FREQUENCY" | "VOLUME" | (string & {});
export const ProfileType = S.String;

export type ProfileSubtype =
  | "FREQUENT"
  | "INFREQUENT"
  | "UNSEEN"
  | "RARE"
  | "COUNT"
  | "AVERAGE"
  | (string & {});
export const ProfileSubtype = S.String;

export type ObservationTexts = string[];
export const ObservationTexts = /*@__PURE__*/ S.Array(S.String);
export type ObservationNumbers = number[];
export const ObservationNumbers = /*@__PURE__*/ S.Array(S.Number);
export interface Observations {
  Text?: string[];
  Number?: number[];
}
export const Observations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.optional(ObservationTexts),
    Number: S.optional(ObservationNumbers),
  }).pipe(S.encodeKeys({ Text: "text", Number: "number" })),
).annotate({ identifier: "Observations" }) as any as S.Schema<Observations>;
export interface AnomalyObject {
  ProfileType?: ProfileType;
  ProfileSubtype?: ProfileSubtype;
  Observations?: Observations;
}
export const AnomalyObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileType: S.optional(ProfileType),
    ProfileSubtype: S.optional(ProfileSubtype),
    Observations: S.optional(Observations),
  }).pipe(
    S.encodeKeys({
      ProfileType: "profileType",
      ProfileSubtype: "profileSubtype",
      Observations: "observations",
    }),
  ),
).annotate({ identifier: "AnomalyObject" }) as any as S.Schema<AnomalyObject>;
export type AnomalyProfileFeatureObjects = AnomalyObject[];
export const AnomalyProfileFeatureObjects =
  /*@__PURE__*/ S.Array(AnomalyObject);
export type AnomalyProfileFeatures = {
  [key: string]: AnomalyObject[] | undefined;
};
export const AnomalyProfileFeatures = /*@__PURE__*/ S.Record(
  S.String,
  AnomalyProfileFeatureObjects.pipe(S.optional),
);
export type AnomalyProfiles = {
  [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined;
};
export const AnomalyProfiles = /*@__PURE__*/ S.Record(
  S.String,
  AnomalyProfileFeatures.pipe(S.optional),
);
export type AnomalyUnusualBehaviorFeature = {
  [key: string]: AnomalyObject | undefined;
};
export const AnomalyUnusualBehaviorFeature = /*@__PURE__*/ S.Record(
  S.String,
  AnomalyObject.pipe(S.optional),
);
export type Behavior = {
  [key: string]: { [key: string]: AnomalyObject | undefined } | undefined;
};
export const Behavior = /*@__PURE__*/ S.Record(
  S.String,
  AnomalyUnusualBehaviorFeature.pipe(S.optional),
);
export interface AnomalyUnusual {
  Behavior?: {
    [key: string]: { [key: string]: AnomalyObject | undefined } | undefined;
  };
}
export const AnomalyUnusual = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Behavior: S.optional(Behavior) }).pipe(
    S.encodeKeys({ Behavior: "behavior" }),
  ),
).annotate({ identifier: "AnomalyUnusual" }) as any as S.Schema<AnomalyUnusual>;
export interface Anomaly {
  Profiles?: {
    [key: string]: { [key: string]: AnomalyObject[] | undefined } | undefined;
  };
  Unusual?: AnomalyUnusual;
}
export const Anomaly = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Profiles: S.optional(AnomalyProfiles),
    Unusual: S.optional(AnomalyUnusual),
  }).pipe(S.encodeKeys({ Profiles: "profiles", Unusual: "unusual" })),
).annotate({ identifier: "Anomaly" }) as any as S.Schema<Anomaly>;
export type SequenceDescription = string;
export interface Account {
  Uid?: string;
  Name?: string;
}
export const Account = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Uid: S.optional(S.String), Name: S.optional(S.String) }).pipe(
    S.encodeKeys({ Uid: "uid", Name: "account" }),
  ),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export interface User {
  Name?: string;
  Uid?: string;
  Type?: string;
  CredentialUid?: string;
  Account?: Account;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Uid: S.optional(S.String),
    Type: S.optional(S.String),
    CredentialUid: S.optional(S.String),
    Account: S.optional(Account),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Uid: "uid",
      Type: "type",
      CredentialUid: "credentialUid",
      Account: "account",
    }),
  ),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type MfaStatus = "ENABLED" | "DISABLED" | (string & {});
export const MfaStatus = S.String;

export interface Session {
  Uid?: string;
  MfaStatus?: MfaStatus;
  CreatedTime?: Date;
  Issuer?: string;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.String),
    MfaStatus: S.optional(MfaStatus),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Issuer: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Uid: "uid",
      MfaStatus: "mfaStatus",
      CreatedTime: "createdTime",
      Issuer: "issuer",
    }),
  ),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export type ProcessName = string;
export type ProcessPath = string;
export type ProcessSha256 = string;
export interface ActorProcess {
  Name?: string;
  Path?: string;
  Sha256?: string;
}
export const ActorProcess = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Path: S.optional(S.String),
    Sha256: S.optional(S.String),
  }).pipe(S.encodeKeys({ Name: "name", Path: "path", Sha256: "sha256" })),
).annotate({ identifier: "ActorProcess" }) as any as S.Schema<ActorProcess>;
export interface Actor {
  Id?: string;
  User?: User;
  Session?: Session;
  Process?: ActorProcess;
}
export const Actor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    User: S.optional(User),
    Session: S.optional(Session),
    Process: S.optional(ActorProcess),
  }).pipe(
    S.encodeKeys({
      Id: "id",
      User: "user",
      Session: "session",
      Process: "process",
    }),
  ),
).annotate({ identifier: "Actor" }) as any as S.Schema<Actor>;
export type Actors = Actor[];
export const Actors = /*@__PURE__*/ S.Array(Actor);
export type FindingResourceType =
  | "EC2_INSTANCE"
  | "EC2_NETWORK_INTERFACE"
  | "S3_BUCKET"
  | "S3_OBJECT"
  | "ACCESS_KEY"
  | "EKS_CLUSTER"
  | "KUBERNETES_WORKLOAD"
  | "CONTAINER"
  | "ECS_CLUSTER"
  | "ECS_TASK"
  | "AUTOSCALING_AUTO_SCALING_GROUP"
  | "IAM_INSTANCE_PROFILE"
  | "CLOUDFORMATION_STACK"
  | "EC2_LAUNCH_TEMPLATE"
  | "EC2_VPC"
  | "EC2_IMAGE"
  | (string & {});
export const FindingResourceType = S.String;

export type PublicAccessStatus = "BLOCKED" | "ALLOWED" | (string & {});
export const PublicAccessStatus = S.String;

export type PublicAclIgnoreBehavior = "IGNORED" | "NOT_IGNORED" | (string & {});
export const PublicAclIgnoreBehavior = S.String;

export type PublicBucketRestrictBehavior =
  | "RESTRICTED"
  | "NOT_RESTRICTED"
  | (string & {});
export const PublicBucketRestrictBehavior = S.String;

export interface PublicAccessConfiguration {
  PublicAclAccess?: PublicAccessStatus;
  PublicPolicyAccess?: PublicAccessStatus;
  PublicAclIgnoreBehavior?: PublicAclIgnoreBehavior;
  PublicBucketRestrictBehavior?: PublicBucketRestrictBehavior;
}
export const PublicAccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicAclAccess: S.optional(PublicAccessStatus),
    PublicPolicyAccess: S.optional(PublicAccessStatus),
    PublicAclIgnoreBehavior: S.optional(PublicAclIgnoreBehavior),
    PublicBucketRestrictBehavior: S.optional(PublicBucketRestrictBehavior),
  }).pipe(
    S.encodeKeys({
      PublicAclAccess: "publicAclAccess",
      PublicPolicyAccess: "publicPolicyAccess",
      PublicAclIgnoreBehavior: "publicAclIgnoreBehavior",
      PublicBucketRestrictBehavior: "publicBucketRestrictBehavior",
    }),
  ),
).annotate({
  identifier: "PublicAccessConfiguration",
}) as any as S.Schema<PublicAccessConfiguration>;
export type S3ObjectUids = string[];
export const S3ObjectUids = /*@__PURE__*/ S.Array(S.String);
export interface S3Bucket {
  OwnerId?: string;
  CreatedAt?: Date;
  EncryptionType?: string;
  EncryptionKeyArn?: string;
  EffectivePermission?: string;
  PublicReadAccess?: PublicAccessStatus;
  PublicWriteAccess?: PublicAccessStatus;
  AccountPublicAccess?: PublicAccessConfiguration;
  BucketPublicAccess?: PublicAccessConfiguration;
  S3ObjectUids?: string[];
}
export const S3Bucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OwnerId: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EncryptionType: S.optional(S.String),
    EncryptionKeyArn: S.optional(S.String),
    EffectivePermission: S.optional(S.String),
    PublicReadAccess: S.optional(PublicAccessStatus),
    PublicWriteAccess: S.optional(PublicAccessStatus),
    AccountPublicAccess: S.optional(PublicAccessConfiguration),
    BucketPublicAccess: S.optional(PublicAccessConfiguration),
    S3ObjectUids: S.optional(S3ObjectUids),
  }).pipe(
    S.encodeKeys({
      OwnerId: "ownerId",
      CreatedAt: "createdAt",
      EncryptionType: "encryptionType",
      EncryptionKeyArn: "encryptionKeyArn",
      EffectivePermission: "effectivePermission",
      PublicReadAccess: "publicReadAccess",
      PublicWriteAccess: "publicWriteAccess",
      AccountPublicAccess: "accountPublicAccess",
      BucketPublicAccess: "bucketPublicAccess",
      S3ObjectUids: "s3ObjectUids",
    }),
  ),
).annotate({ identifier: "S3Bucket" }) as any as S.Schema<S3Bucket>;
export type Ec2NetworkInterfaceUids = string[];
export const Ec2NetworkInterfaceUids = /*@__PURE__*/ S.Array(S.String);
export interface Ec2Instance {
  AvailabilityZone?: string;
  ImageDescription?: string;
  InstanceState?: string;
  IamInstanceProfile?: IamInstanceProfile;
  InstanceType?: string;
  OutpostArn?: string;
  Platform?: string;
  ProductCodes?: ProductCode[];
  Ec2NetworkInterfaceUids?: string[];
}
export const Ec2Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    ImageDescription: S.optional(S.String),
    InstanceState: S.optional(S.String),
    IamInstanceProfile: S.optional(IamInstanceProfile),
    InstanceType: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    Platform: S.optional(S.String),
    ProductCodes: S.optional(ProductCodes),
    Ec2NetworkInterfaceUids: S.optional(Ec2NetworkInterfaceUids),
  }).pipe(
    S.encodeKeys({
      AvailabilityZone: "availabilityZone",
      ImageDescription: "imageDescription",
      InstanceState: "instanceState",
      InstanceType: "instanceType",
      OutpostArn: "outpostArn",
      Platform: "platform",
      ProductCodes: "productCodes",
      Ec2NetworkInterfaceUids: "ec2NetworkInterfaceUids",
    }),
  ),
).annotate({ identifier: "Ec2Instance" }) as any as S.Schema<Ec2Instance>;
export interface AccessKey {
  PrincipalId?: string;
  UserName?: string;
  UserType?: string;
}
export const AccessKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalId: S.optional(S.String),
    UserName: S.optional(S.String),
    UserType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PrincipalId: "principalId",
      UserName: "userName",
      UserType: "userType",
    }),
  ),
).annotate({ identifier: "AccessKey" }) as any as S.Schema<AccessKey>;
export interface Ec2NetworkInterface {
  Ipv6Addresses?: string[];
  PrivateIpAddresses?: PrivateIpAddressDetails[];
  PublicIp?: string;
  SecurityGroups?: SecurityGroup[];
  SubNetId?: string;
  VpcId?: string;
}
export const Ec2NetworkInterface = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ipv6Addresses: S.optional(Ipv6Addresses),
    PrivateIpAddresses: S.optional(PrivateIpAddresses),
    PublicIp: S.optional(S.String),
    SecurityGroups: S.optional(SecurityGroups),
    SubNetId: S.optional(S.String),
    VpcId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Ipv6Addresses: "ipv6Addresses",
      PrivateIpAddresses: "privateIpAddresses",
      PublicIp: "publicIp",
      SecurityGroups: "securityGroups",
      SubNetId: "subNetId",
      VpcId: "vpcId",
    }),
  ),
).annotate({
  identifier: "Ec2NetworkInterface",
}) as any as S.Schema<Ec2NetworkInterface>;
export interface S3Object {
  ETag?: string;
  Key?: string;
  VersionId?: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ETag: S.optional(S.String),
    Key: S.optional(S.String),
    VersionId: S.optional(S.String),
  }).pipe(S.encodeKeys({ ETag: "eTag", Key: "key", VersionId: "versionId" })),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "PENDING"
  | (string & {});
export const ClusterStatus = S.String;

export type Ec2InstanceUid = string;
export type Ec2InstanceUids = string[];
export const Ec2InstanceUids = /*@__PURE__*/ S.Array(S.String);
export interface EksCluster {
  Arn?: string;
  CreatedAt?: Date;
  Status?: ClusterStatus;
  VpcId?: string;
  Ec2InstanceUids?: string[];
}
export const EksCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(ClusterStatus),
    VpcId: S.optional(S.String),
    Ec2InstanceUids: S.optional(Ec2InstanceUids),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Status: "status",
      VpcId: "vpcId",
      Ec2InstanceUids: "ec2InstanceUids",
    }),
  ),
).annotate({ identifier: "EksCluster" }) as any as S.Schema<EksCluster>;
export type ContainerUid = string;
export type ContainerUids = string[];
export const ContainerUids = /*@__PURE__*/ S.Array(S.String);
export type KubernetesResourcesTypes =
  | "PODS"
  | "JOBS"
  | "CRONJOBS"
  | "DEPLOYMENTS"
  | "DAEMONSETS"
  | "STATEFULSETS"
  | "REPLICASETS"
  | "REPLICATIONCONTROLLERS"
  | (string & {});
export const KubernetesResourcesTypes = S.String;

export interface KubernetesWorkload {
  ContainerUids?: string[];
  Namespace?: string;
  KubernetesResourcesTypes?: KubernetesResourcesTypes;
}
export const KubernetesWorkload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerUids: S.optional(ContainerUids),
    Namespace: S.optional(S.String),
    KubernetesResourcesTypes: S.optional(KubernetesResourcesTypes),
  }).pipe(
    S.encodeKeys({
      ContainerUids: "containerUids",
      Namespace: "namespace",
      KubernetesResourcesTypes: "type",
    }),
  ),
).annotate({
  identifier: "KubernetesWorkload",
}) as any as S.Schema<KubernetesWorkload>;
export type ContainerImageUid = string;
export interface ContainerFindingResource {
  Image?: string;
  ImageUid?: string;
}
export const ContainerFindingResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Image: S.optional(S.String),
    ImageUid: S.optional(S.String),
  }).pipe(S.encodeKeys({ Image: "image", ImageUid: "imageUid" })),
).annotate({
  identifier: "ContainerFindingResource",
}) as any as S.Schema<ContainerFindingResource>;
export type EcsClusterStatus =
  | "ACTIVE"
  | "PROVISIONING"
  | "DEPROVISIONING"
  | "FAILED"
  | "INACTIVE"
  | (string & {});
export const EcsClusterStatus = S.String;

export interface EcsCluster {
  Status?: EcsClusterStatus;
  Ec2InstanceUids?: string[];
}
export const EcsCluster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(EcsClusterStatus),
    Ec2InstanceUids: S.optional(Ec2InstanceUids),
  }).pipe(
    S.encodeKeys({ Status: "status", Ec2InstanceUids: "ec2InstanceUids" }),
  ),
).annotate({ identifier: "EcsCluster" }) as any as S.Schema<EcsCluster>;
export type EcsLaunchType = "FARGATE" | "EC2" | (string & {});
export const EcsLaunchType = S.String;

export interface EcsTask {
  CreatedAt?: Date;
  TaskDefinitionArn?: string;
  LaunchType?: EcsLaunchType;
  ContainerUids?: string[];
}
export const EcsTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TaskDefinitionArn: S.optional(S.String),
    LaunchType: S.optional(EcsLaunchType),
    ContainerUids: S.optional(ContainerUids),
  }).pipe(
    S.encodeKeys({
      CreatedAt: "createdAt",
      TaskDefinitionArn: "taskDefinitionArn",
      LaunchType: "launchType",
      ContainerUids: "containerUids",
    }),
  ),
).annotate({ identifier: "EcsTask" }) as any as S.Schema<EcsTask>;
export interface IamInstanceProfileV2 {
  Ec2InstanceUids?: string[];
}
export const IamInstanceProfileV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ec2InstanceUids: S.optional(Ec2InstanceUids) }).pipe(
    S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
  ),
).annotate({
  identifier: "IamInstanceProfileV2",
}) as any as S.Schema<IamInstanceProfileV2>;
export interface AutoscalingAutoScalingGroup {
  Ec2InstanceUids?: string[];
}
export const AutoscalingAutoScalingGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ec2InstanceUids: S.optional(Ec2InstanceUids) }).pipe(
    S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
  ),
).annotate({
  identifier: "AutoscalingAutoScalingGroup",
}) as any as S.Schema<AutoscalingAutoScalingGroup>;
export type LaunchTemplateVersion = string;
export interface Ec2LaunchTemplate {
  Ec2InstanceUids?: string[];
  Version?: string;
}
export const Ec2LaunchTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ec2InstanceUids: S.optional(Ec2InstanceUids),
    Version: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids", Version: "version" }),
  ),
).annotate({
  identifier: "Ec2LaunchTemplate",
}) as any as S.Schema<Ec2LaunchTemplate>;
export interface Ec2Vpc {
  Ec2InstanceUids?: string[];
}
export const Ec2Vpc = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ec2InstanceUids: S.optional(Ec2InstanceUids) }).pipe(
    S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
  ),
).annotate({ identifier: "Ec2Vpc" }) as any as S.Schema<Ec2Vpc>;
export interface Ec2Image {
  Ec2InstanceUids?: string[];
}
export const Ec2Image = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ec2InstanceUids: S.optional(Ec2InstanceUids) }).pipe(
    S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
  ),
).annotate({ identifier: "Ec2Image" }) as any as S.Schema<Ec2Image>;
export interface CloudformationStack {
  Ec2InstanceUids?: string[];
}
export const CloudformationStack = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ec2InstanceUids: S.optional(Ec2InstanceUids) }).pipe(
    S.encodeKeys({ Ec2InstanceUids: "ec2InstanceUids" }),
  ),
).annotate({
  identifier: "CloudformationStack",
}) as any as S.Schema<CloudformationStack>;
export interface ResourceData {
  S3Bucket?: S3Bucket;
  Ec2Instance?: Ec2Instance;
  AccessKey?: AccessKey;
  Ec2NetworkInterface?: Ec2NetworkInterface;
  S3Object?: S3Object;
  EksCluster?: EksCluster;
  KubernetesWorkload?: KubernetesWorkload;
  Container?: ContainerFindingResource;
  EcsCluster?: EcsCluster;
  EcsTask?: EcsTask;
  IamInstanceProfile?: IamInstanceProfileV2;
  AutoscalingAutoScalingGroup?: AutoscalingAutoScalingGroup;
  Ec2LaunchTemplate?: Ec2LaunchTemplate;
  Ec2Vpc?: Ec2Vpc;
  Ec2Image?: Ec2Image;
  CloudformationStack?: CloudformationStack;
}
export const ResourceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S3Bucket),
    Ec2Instance: S.optional(Ec2Instance),
    AccessKey: S.optional(AccessKey),
    Ec2NetworkInterface: S.optional(Ec2NetworkInterface),
    S3Object: S.optional(S3Object),
    EksCluster: S.optional(EksCluster),
    KubernetesWorkload: S.optional(KubernetesWorkload),
    Container: S.optional(ContainerFindingResource),
    EcsCluster: S.optional(EcsCluster),
    EcsTask: S.optional(EcsTask),
    IamInstanceProfile: S.optional(IamInstanceProfileV2),
    AutoscalingAutoScalingGroup: S.optional(AutoscalingAutoScalingGroup),
    Ec2LaunchTemplate: S.optional(Ec2LaunchTemplate),
    Ec2Vpc: S.optional(Ec2Vpc),
    Ec2Image: S.optional(Ec2Image),
    CloudformationStack: S.optional(CloudformationStack),
  }).pipe(
    S.encodeKeys({
      S3Bucket: "s3Bucket",
      Ec2Instance: "ec2Instance",
      AccessKey: "accessKey",
      Ec2NetworkInterface: "ec2NetworkInterface",
      S3Object: "s3Object",
      EksCluster: "eksCluster",
      KubernetesWorkload: "kubernetesWorkload",
      Container: "container",
      EcsCluster: "ecsCluster",
      EcsTask: "ecsTask",
      IamInstanceProfile: "iamInstanceProfile",
      AutoscalingAutoScalingGroup: "autoscalingAutoScalingGroup",
      Ec2LaunchTemplate: "ec2LaunchTemplate",
      Ec2Vpc: "ec2Vpc",
      Ec2Image: "ec2Image",
      CloudformationStack: "cloudformationStack",
    }),
  ),
).annotate({ identifier: "ResourceData" }) as any as S.Schema<ResourceData>;
export interface ResourceV2 {
  Uid?: string;
  Name?: string;
  AccountId?: string;
  ResourceType?: FindingResourceType;
  Region?: string;
  Service?: string;
  CloudPartition?: string;
  Tags?: Tag[];
  Data?: ResourceData;
}
export const ResourceV2 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.String),
    Name: S.optional(S.String),
    AccountId: S.optional(S.String),
    ResourceType: S.optional(FindingResourceType),
    Region: S.optional(S.String),
    Service: S.optional(S.String),
    CloudPartition: S.optional(S.String),
    Tags: S.optional(Tags),
    Data: S.optional(ResourceData),
  }).pipe(
    S.encodeKeys({
      Uid: "uid",
      Name: "name",
      AccountId: "accountId",
      ResourceType: "resourceType",
      Region: "region",
      Service: "service",
      CloudPartition: "cloudPartition",
      Tags: "tags",
      Data: "data",
    }),
  ),
).annotate({ identifier: "ResourceV2" }) as any as S.Schema<ResourceV2>;
export type Resources = ResourceV2[];
export const Resources = /*@__PURE__*/ S.Array(ResourceV2);
export interface NetworkGeoLocation {
  City?: string;
  Country?: string;
  Latitude?: number;
  Longitude?: number;
}
export const NetworkGeoLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(S.String),
    Country: S.optional(S.String),
    Latitude: S.optional(S.Number),
    Longitude: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      City: "city",
      Country: "country",
      Latitude: "lat",
      Longitude: "lon",
    }),
  ),
).annotate({
  identifier: "NetworkGeoLocation",
}) as any as S.Schema<NetworkGeoLocation>;
export interface AutonomousSystem {
  Name?: string;
  Number?: number;
}
export const AutonomousSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Number: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Name: "name", Number: "number" }),
  ),
).annotate({
  identifier: "AutonomousSystem",
}) as any as S.Schema<AutonomousSystem>;
export type NetworkDirection = "INBOUND" | "OUTBOUND" | (string & {});
export const NetworkDirection = S.String;

export interface NetworkConnection {
  Direction?: NetworkDirection;
}
export const NetworkConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Direction: S.optional(NetworkDirection) }).pipe(
    S.encodeKeys({ Direction: "direction" }),
  ),
).annotate({
  identifier: "NetworkConnection",
}) as any as S.Schema<NetworkConnection>;
export interface NetworkEndpoint {
  Id?: string;
  Ip?: string;
  Domain?: string;
  Port?: number;
  Location?: NetworkGeoLocation;
  AutonomousSystem?: AutonomousSystem;
  Connection?: NetworkConnection;
}
export const NetworkEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Ip: S.optional(S.String),
    Domain: S.optional(S.String),
    Port: S.optional(S.Number),
    Location: S.optional(NetworkGeoLocation),
    AutonomousSystem: S.optional(AutonomousSystem),
    Connection: S.optional(NetworkConnection),
  }).pipe(
    S.encodeKeys({
      Id: "id",
      Ip: "ip",
      Domain: "domain",
      Port: "port",
      Location: "location",
      AutonomousSystem: "autonomousSystem",
      Connection: "connection",
    }),
  ),
).annotate({
  identifier: "NetworkEndpoint",
}) as any as S.Schema<NetworkEndpoint>;
export type NetworkEndpoints = NetworkEndpoint[];
export const NetworkEndpoints = /*@__PURE__*/ S.Array(NetworkEndpoint);
export type SignalType =
  | "FINDING"
  | "CLOUD_TRAIL"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "FLOW_LOGS"
  | "DNS_LOGS"
  | "RUNTIME_MONITORING"
  | (string & {});
export const SignalType = S.String;

export type SignalDescription = string;
export type ResourceUids = string[];
export const ResourceUids = /*@__PURE__*/ S.Array(S.String);
export type ActorIds = string[];
export const ActorIds = /*@__PURE__*/ S.Array(S.String);
export type EndpointIds = string[];
export const EndpointIds = /*@__PURE__*/ S.Array(S.String);
export type IndicatorType =
  | "SUSPICIOUS_USER_AGENT"
  | "SUSPICIOUS_NETWORK"
  | "MALICIOUS_IP"
  | "TOR_IP"
  | "ATTACK_TACTIC"
  | "HIGH_RISK_API"
  | "ATTACK_TECHNIQUE"
  | "UNUSUAL_API_FOR_ACCOUNT"
  | "UNUSUAL_ASN_FOR_ACCOUNT"
  | "UNUSUAL_ASN_FOR_USER"
  | "SUSPICIOUS_PROCESS"
  | "MALICIOUS_DOMAIN"
  | "MALICIOUS_PROCESS"
  | "CRYPTOMINING_IP"
  | "CRYPTOMINING_DOMAIN"
  | "CRYPTOMINING_PROCESS"
  | "MALICIOUS_FILE"
  | "VULNERABILITY"
  | "MALICIOUS_PACKAGE"
  | "MISCONFIGURATION"
  | "REACHABILITY"
  | "SENSITIVE_DATA"
  | (string & {});
export const IndicatorType = S.String;

export type IndicatorValueString = string;
export type IndicatorValues = string[];
export const IndicatorValues = /*@__PURE__*/ S.Array(S.String);
export type IndicatorTitle = string;
export interface Indicator {
  Key?: IndicatorType;
  Values?: string[];
  Title?: string;
}
export const Indicator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(IndicatorType),
    Values: S.optional(IndicatorValues),
    Title: S.optional(S.String),
  }).pipe(S.encodeKeys({ Key: "key", Values: "values", Title: "title" })),
).annotate({ identifier: "Indicator" }) as any as S.Schema<Indicator>;
export type Indicators = Indicator[];
export const Indicators = /*@__PURE__*/ S.Array(Indicator);
export interface Signal {
  Uid?: string;
  Type?: SignalType;
  Description?: string;
  Name?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  FirstSeenAt?: Date;
  LastSeenAt?: Date;
  Severity?: number;
  Count?: number;
  ResourceUids?: string[];
  ActorIds?: string[];
  EndpointIds?: string[];
  SignalIndicators?: Indicator[];
}
export const Signal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.String),
    Type: S.optional(SignalType),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FirstSeenAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastSeenAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Severity: S.optional(S.Number),
    Count: S.optional(S.Number),
    ResourceUids: S.optional(ResourceUids),
    ActorIds: S.optional(ActorIds),
    EndpointIds: S.optional(EndpointIds),
    SignalIndicators: S.optional(Indicators),
  }).pipe(
    S.encodeKeys({
      Uid: "uid",
      Type: "type",
      Description: "description",
      Name: "name",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      FirstSeenAt: "firstSeenAt",
      LastSeenAt: "lastSeenAt",
      Severity: "severity",
      Count: "count",
      ResourceUids: "resourceUids",
      ActorIds: "actorIds",
      EndpointIds: "endpointIds",
      SignalIndicators: "signalIndicators",
    }),
  ),
).annotate({ identifier: "Signal" }) as any as S.Schema<Signal>;
export type Signals = Signal[];
export const Signals = /*@__PURE__*/ S.Array(Signal);
export type AdditionalSequenceTypes = string[];
export const AdditionalSequenceTypes = /*@__PURE__*/ S.Array(S.String);
export interface Sequence {
  Uid?: string;
  Description?: string;
  Actors?: Actor[];
  Resources?: ResourceV2[];
  Endpoints?: NetworkEndpoint[];
  Signals?: Signal[];
  SequenceIndicators?: Indicator[];
  AdditionalSequenceTypes?: string[];
}
export const Sequence = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uid: S.optional(S.String),
    Description: S.optional(S.String),
    Actors: S.optional(Actors),
    Resources: S.optional(Resources),
    Endpoints: S.optional(NetworkEndpoints),
    Signals: S.optional(Signals),
    SequenceIndicators: S.optional(Indicators),
    AdditionalSequenceTypes: S.optional(AdditionalSequenceTypes),
  }).pipe(
    S.encodeKeys({
      Uid: "uid",
      Description: "description",
      Actors: "actors",
      Resources: "resources",
      Endpoints: "endpoints",
      Signals: "signals",
      SequenceIndicators: "sequenceIndicators",
      AdditionalSequenceTypes: "additionalSequenceTypes",
    }),
  ),
).annotate({ identifier: "Sequence" }) as any as S.Schema<Sequence>;
export interface Detection {
  Anomaly?: Anomaly;
  Sequence?: Sequence;
}
export const Detection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Anomaly: S.optional(Anomaly),
    Sequence: S.optional(Sequence),
  }).pipe(S.encodeKeys({ Anomaly: "anomaly", Sequence: "sequence" })),
).annotate({ identifier: "Detection" }) as any as S.Schema<Detection>;
export interface ItemPath {
  NestedItemPath?: string;
  Hash?: string;
}
export const ItemPath = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NestedItemPath: S.optional(S.String),
    Hash: S.optional(S.String),
  }).pipe(S.encodeKeys({ NestedItemPath: "nestedItemPath", Hash: "hash" })),
).annotate({ identifier: "ItemPath" }) as any as S.Schema<ItemPath>;
export type ItemPaths = ItemPath[];
export const ItemPaths = /*@__PURE__*/ S.Array(ItemPath);
export interface AdditionalInfo {
  VersionId?: string;
  DeviceName?: string;
}
export const AdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionId: S.optional(S.String),
    DeviceName: S.optional(S.String),
  }).pipe(S.encodeKeys({ VersionId: "versionId", DeviceName: "deviceName" })),
).annotate({ identifier: "AdditionalInfo" }) as any as S.Schema<AdditionalInfo>;
export interface ItemDetails {
  ResourceArn?: string;
  ItemPath?: string;
  Hash?: string;
  AdditionalInfo?: AdditionalInfo;
}
export const ItemDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ItemPath: S.optional(S.String),
    Hash: S.optional(S.String),
    AdditionalInfo: S.optional(AdditionalInfo),
  }).pipe(
    S.encodeKeys({
      ResourceArn: "resourceArn",
      ItemPath: "itemPath",
      Hash: "hash",
      AdditionalInfo: "additionalInfo",
    }),
  ),
).annotate({ identifier: "ItemDetails" }) as any as S.Schema<ItemDetails>;
export type ItemDetailsList = ItemDetails[];
export const ItemDetailsList = /*@__PURE__*/ S.Array(ItemDetails);
export interface Threat {
  Name?: string;
  Source?: string;
  ItemPaths?: ItemPath[];
  Count?: number;
  Hash?: string;
  ItemDetails?: ItemDetails[];
}
export const Threat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Source: S.optional(S.String),
    ItemPaths: S.optional(ItemPaths),
    Count: S.optional(S.Number),
    Hash: S.optional(S.String),
    ItemDetails: S.optional(ItemDetailsList),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Source: "source",
      ItemPaths: "itemPaths",
      Count: "count",
      Hash: "hash",
      ItemDetails: "itemDetails",
    }),
  ),
).annotate({ identifier: "Threat" }) as any as S.Schema<Threat>;
export type Threats = Threat[];
export const Threats = /*@__PURE__*/ S.Array(Threat);
export type MalwareProtectionScanType =
  | "BACKUP_INITIATED"
  | "ON_DEMAND"
  | "GUARDDUTY_INITIATED"
  | (string & {});
export const MalwareProtectionScanType = S.String;

export type ScanCategory = "FULL_SCAN" | "INCREMENTAL_SCAN" | (string & {});
export const ScanCategory = S.String;

export interface IncrementalScanDetails {
  BaselineResourceArn?: string;
}
export const IncrementalScanDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineResourceArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ BaselineResourceArn: "baselineResourceArn" }),
  ),
).annotate({
  identifier: "IncrementalScanDetails",
}) as any as S.Schema<IncrementalScanDetails>;
export interface MalwareProtectionFindingsScanConfiguration {
  TriggerType?: TriggerType;
  IncrementalScanDetails?: IncrementalScanDetails;
}
export const MalwareProtectionFindingsScanConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TriggerType: S.optional(TriggerType),
      IncrementalScanDetails: S.optional(IncrementalScanDetails),
    }).pipe(
      S.encodeKeys({
        TriggerType: "triggerType",
        IncrementalScanDetails: "incrementalScanDetails",
      }),
    ),
  ).annotate({
    identifier: "MalwareProtectionFindingsScanConfiguration",
  }) as any as S.Schema<MalwareProtectionFindingsScanConfiguration>;
export interface MalwareScanDetails {
  Threats?: Threat[];
  ScanId?: string;
  ScanType?: MalwareProtectionScanType;
  ScanCategory?: ScanCategory;
  ScanConfiguration?: MalwareProtectionFindingsScanConfiguration;
  UniqueThreatCount?: number;
}
export const MalwareScanDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Threats: S.optional(Threats),
    ScanId: S.optional(S.String),
    ScanType: S.optional(MalwareProtectionScanType),
    ScanCategory: S.optional(ScanCategory),
    ScanConfiguration: S.optional(MalwareProtectionFindingsScanConfiguration),
    UniqueThreatCount: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Threats: "threats",
      ScanId: "scanId",
      ScanType: "scanType",
      ScanCategory: "scanCategory",
      ScanConfiguration: "scanConfiguration",
      UniqueThreatCount: "uniqueThreatCount",
    }),
  ),
).annotate({
  identifier: "MalwareScanDetails",
}) as any as S.Schema<MalwareScanDetails>;
export interface Service {
  Action?: Action;
  Evidence?: Evidence;
  Archived?: boolean;
  Count?: number;
  DetectorId?: string;
  EventFirstSeen?: string;
  EventLastSeen?: string;
  ResourceRole?: string;
  ServiceName?: string;
  UserFeedback?: string;
  AdditionalInfo?: ServiceAdditionalInfo;
  FeatureName?: string;
  EbsVolumeScanDetails?: EbsVolumeScanDetails;
  RuntimeDetails?: RuntimeDetails;
  Detection?: Detection;
  MalwareScanDetails?: MalwareScanDetails;
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Evidence: S.optional(Evidence),
    Archived: S.optional(S.Boolean),
    Count: S.optional(S.Number),
    DetectorId: S.optional(S.String),
    EventFirstSeen: S.optional(S.String),
    EventLastSeen: S.optional(S.String),
    ResourceRole: S.optional(S.String),
    ServiceName: S.optional(S.String),
    UserFeedback: S.optional(S.String),
    AdditionalInfo: S.optional(ServiceAdditionalInfo),
    FeatureName: S.optional(S.String),
    EbsVolumeScanDetails: S.optional(EbsVolumeScanDetails),
    RuntimeDetails: S.optional(RuntimeDetails),
    Detection: S.optional(Detection),
    MalwareScanDetails: S.optional(MalwareScanDetails),
  }).pipe(
    S.encodeKeys({
      Action: "action",
      Evidence: "evidence",
      Archived: "archived",
      Count: "count",
      DetectorId: "detectorId",
      EventFirstSeen: "eventFirstSeen",
      EventLastSeen: "eventLastSeen",
      ResourceRole: "resourceRole",
      ServiceName: "serviceName",
      UserFeedback: "userFeedback",
      AdditionalInfo: "additionalInfo",
      FeatureName: "featureName",
      EbsVolumeScanDetails: "ebsVolumeScanDetails",
      RuntimeDetails: "runtimeDetails",
      Detection: "detection",
      MalwareScanDetails: "malwareScanDetails",
    }),
  ),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface Finding {
  AccountId?: string;
  Arn?: string;
  Confidence?: number;
  CreatedAt?: string;
  Description?: string;
  Id?: string;
  Partition?: string;
  Region?: string;
  Resource?: Resource;
  SchemaVersion?: string;
  Service?: Service;
  Severity?: number;
  Title?: string;
  Type?: string;
  UpdatedAt?: string;
  AssociatedAttackSequenceArn?: string;
}
export const Finding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Arn: S.optional(S.String),
    Confidence: S.optional(S.Number),
    CreatedAt: S.optional(S.String),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    Partition: S.optional(S.String),
    Region: S.optional(S.String),
    Resource: S.optional(Resource),
    SchemaVersion: S.optional(S.String),
    Service: S.optional(Service),
    Severity: S.optional(S.Number),
    Title: S.optional(S.String),
    Type: S.optional(S.String),
    UpdatedAt: S.optional(S.String),
    AssociatedAttackSequenceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      Arn: "arn",
      Confidence: "confidence",
      CreatedAt: "createdAt",
      Description: "description",
      Id: "id",
      Partition: "partition",
      Region: "region",
      Resource: "resource",
      SchemaVersion: "schemaVersion",
      Service: "service",
      Severity: "severity",
      Title: "title",
      Type: "type",
      UpdatedAt: "updatedAt",
      AssociatedAttackSequenceArn: "associatedAttackSequenceArn",
    }),
  ),
).annotate({ identifier: "Finding" }) as any as S.Schema<Finding>;
export type Findings = Finding[];
export const Findings = /*@__PURE__*/ S.Array(Finding);
export interface GetFindingsResponse {
  Findings: (Finding & {
    AccountId: string;
    Arn: string;
    CreatedAt: string;
    Id: string;
    Region: string;
    Resource: Resource;
    SchemaVersion: string;
    Severity: number;
    Type: FindingType;
    UpdatedAt: string;
    Service: Service & {
      Detection: Detection & {
        Sequence: Sequence & {
          Uid: string;
          Description: SequenceDescription;
          Signals: (Signal & {
            Uid: string;
            Type: SignalType;
            Name: string;
            CreatedAt: Date;
            UpdatedAt: Date;
            FirstSeenAt: Date;
            LastSeenAt: Date;
            Count: number;
            SignalIndicators: (Indicator & { Key: IndicatorType })[];
          })[];
          Actors: (Actor & {
            Id: string;
            User: User & {
              Name: string;
              Uid: string;
              Type: string;
              Account: Account & { Uid: string };
            };
            Process: ActorProcess & { Name: ProcessName; Path: ProcessPath };
          })[];
          Resources: (ResourceV2 & {
            Uid: string;
            ResourceType: FindingResourceType;
            Data: ResourceData & {
              Container: ContainerFindingResource & { Image: string };
            };
          })[];
          Endpoints: (NetworkEndpoint & {
            Id: string;
            Location: NetworkGeoLocation & {
              City: string;
              Country: string;
              Latitude: number;
              Longitude: number;
            };
            AutonomousSystem: AutonomousSystem & {
              Name: string;
              Number: number;
            };
            Connection: NetworkConnection & { Direction: NetworkDirection };
          })[];
          SequenceIndicators: (Indicator & { Key: IndicatorType })[];
        };
      };
      MalwareScanDetails: MalwareScanDetails & {
        ScanConfiguration: MalwareProtectionFindingsScanConfiguration & {
          IncrementalScanDetails: IncrementalScanDetails & {
            BaselineResourceArn: NonEmptyString;
          };
        };
      };
    };
  })[];
}
export const GetFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Findings: S.optional(Findings) }).pipe(
    S.encodeKeys({ Findings: "findings" }),
  ),
).annotate({
  identifier: "GetFindingsResponse",
}) as any as S.Schema<GetFindingsResponse>;
export type FindingStatisticType = "COUNT_BY_SEVERITY" | (string & {});
export const FindingStatisticType = S.String;

export type FindingStatisticTypes = FindingStatisticType[];
export const FindingStatisticTypes =
  /*@__PURE__*/ S.Array(FindingStatisticType);
export type GroupByType =
  | "ACCOUNT"
  | "DATE"
  | "FINDING_TYPE"
  | "RESOURCE"
  | "SEVERITY"
  | (string & {});
export const GroupByType = S.String;

export type MaxResults100 = number;
export interface GetFindingsStatisticsRequest {
  DetectorId: string;
  FindingStatisticTypes?: FindingStatisticType[];
  FindingCriteria?: FindingCriteria;
  GroupBy?: GroupByType;
  OrderBy?: OrderBy;
  MaxResults?: number;
}
export const GetFindingsStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingStatisticTypes: S.optional(FindingStatisticTypes),
    FindingCriteria: S.optional(FindingCriteria),
    GroupBy: S.optional(GroupByType),
    OrderBy: S.optional(OrderBy),
    MaxResults: S.optional(S.Number),
  })
    .pipe(
      S.encodeKeys({
        FindingStatisticTypes: "findingStatisticTypes",
        FindingCriteria: "findingCriteria",
        GroupBy: "groupBy",
        OrderBy: "orderBy",
        MaxResults: "maxResults",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/findings/statistics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetFindingsStatisticsRequest",
}) as any as S.Schema<GetFindingsStatisticsRequest>;
export type CountBySeverity = { [key: string]: number | undefined };
export const CountBySeverity = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface AccountStatistics {
  AccountId?: string;
  LastGeneratedAt?: Date;
  TotalFindings?: number;
}
export const AccountStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    LastGeneratedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TotalFindings: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      LastGeneratedAt: "lastGeneratedAt",
      TotalFindings: "totalFindings",
    }),
  ),
).annotate({
  identifier: "AccountStatistics",
}) as any as S.Schema<AccountStatistics>;
export type GroupedByAccount = AccountStatistics[];
export const GroupedByAccount = /*@__PURE__*/ S.Array(AccountStatistics);
export interface DateStatistics {
  Date?: Date;
  LastGeneratedAt?: Date;
  Severity?: number;
  TotalFindings?: number;
}
export const DateStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastGeneratedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Severity: S.optional(S.Number),
    TotalFindings: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Date: "date",
      LastGeneratedAt: "lastGeneratedAt",
      Severity: "severity",
      TotalFindings: "totalFindings",
    }),
  ),
).annotate({ identifier: "DateStatistics" }) as any as S.Schema<DateStatistics>;
export type GroupedByDate = DateStatistics[];
export const GroupedByDate = /*@__PURE__*/ S.Array(DateStatistics);
export interface FindingTypeStatistics {
  FindingType?: string;
  LastGeneratedAt?: Date;
  TotalFindings?: number;
}
export const FindingTypeStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingType: S.optional(S.String),
    LastGeneratedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TotalFindings: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      FindingType: "findingType",
      LastGeneratedAt: "lastGeneratedAt",
      TotalFindings: "totalFindings",
    }),
  ),
).annotate({
  identifier: "FindingTypeStatistics",
}) as any as S.Schema<FindingTypeStatistics>;
export type GroupedByFindingType = FindingTypeStatistics[];
export const GroupedByFindingType = /*@__PURE__*/ S.Array(
  FindingTypeStatistics,
);
export interface ResourceStatistics {
  AccountId?: string;
  LastGeneratedAt?: Date;
  ResourceId?: string;
  ResourceType?: string;
  TotalFindings?: number;
}
export const ResourceStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    LastGeneratedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    TotalFindings: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      LastGeneratedAt: "lastGeneratedAt",
      ResourceId: "resourceId",
      ResourceType: "resourceType",
      TotalFindings: "totalFindings",
    }),
  ),
).annotate({
  identifier: "ResourceStatistics",
}) as any as S.Schema<ResourceStatistics>;
export type GroupedByResource = ResourceStatistics[];
export const GroupedByResource = /*@__PURE__*/ S.Array(ResourceStatistics);
export interface SeverityStatistics {
  LastGeneratedAt?: Date;
  Severity?: number;
  TotalFindings?: number;
}
export const SeverityStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastGeneratedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Severity: S.optional(S.Number),
    TotalFindings: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      LastGeneratedAt: "lastGeneratedAt",
      Severity: "severity",
      TotalFindings: "totalFindings",
    }),
  ),
).annotate({
  identifier: "SeverityStatistics",
}) as any as S.Schema<SeverityStatistics>;
export type GroupedBySeverity = SeverityStatistics[];
export const GroupedBySeverity = /*@__PURE__*/ S.Array(SeverityStatistics);
export interface FindingStatistics {
  CountBySeverity?: { [key: string]: number | undefined };
  GroupedByAccount?: AccountStatistics[];
  GroupedByDate?: DateStatistics[];
  GroupedByFindingType?: FindingTypeStatistics[];
  GroupedByResource?: ResourceStatistics[];
  GroupedBySeverity?: SeverityStatistics[];
}
export const FindingStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CountBySeverity: S.optional(CountBySeverity),
    GroupedByAccount: S.optional(GroupedByAccount),
    GroupedByDate: S.optional(GroupedByDate),
    GroupedByFindingType: S.optional(GroupedByFindingType),
    GroupedByResource: S.optional(GroupedByResource),
    GroupedBySeverity: S.optional(GroupedBySeverity),
  }).pipe(
    S.encodeKeys({
      CountBySeverity: "countBySeverity",
      GroupedByAccount: "groupedByAccount",
      GroupedByDate: "groupedByDate",
      GroupedByFindingType: "groupedByFindingType",
      GroupedByResource: "groupedByResource",
      GroupedBySeverity: "groupedBySeverity",
    }),
  ),
).annotate({
  identifier: "FindingStatistics",
}) as any as S.Schema<FindingStatistics>;
export interface GetFindingsStatisticsResponse {
  FindingStatistics: FindingStatistics;
  NextToken?: string;
}
export const GetFindingsStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingStatistics: S.optional(FindingStatistics),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FindingStatistics: "findingStatistics",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "GetFindingsStatisticsResponse",
}) as any as S.Schema<GetFindingsStatisticsResponse>;
export interface GetInvestigationRequest {
  DetectorId: string;
  InvestigationId: string;
}
export const GetInvestigationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    InvestigationId: S.String.pipe(T.HttpLabel("InvestigationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/investigation/{InvestigationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInvestigationRequest",
}) as any as S.Schema<GetInvestigationRequest>;
export type InvestigationStatus =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const InvestigationStatus = S.String;

export type TriggeredBy = string;
export interface Product {
  Name?: string;
  Feature?: string;
}
export const Product = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Feature: S.optional(S.String) }).pipe(
    S.encodeKeys({ Name: "name", Feature: "feature" }),
  ),
).annotate({ identifier: "Product" }) as any as S.Schema<Product>;
export interface InvestigationMetadata {
  Version?: string;
  Product?: Product;
}
export const InvestigationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(S.String),
    Product: S.optional(Product),
  }).pipe(S.encodeKeys({ Version: "version", Product: "product" })),
).annotate({
  identifier: "InvestigationMetadata",
}) as any as S.Schema<InvestigationMetadata>;
export type CloudProvider = "AWS" | (string & {});
export const CloudProvider = S.String;

export interface CloudDetails {
  Provider?: CloudProvider;
  Region?: string;
  Account?: string;
}
export const CloudDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Provider: S.optional(CloudProvider),
    Region: S.optional(S.String),
    Account: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Provider: "provider",
      Region: "region",
      Account: "account",
    }),
  ),
).annotate({ identifier: "CloudDetails" }) as any as S.Schema<CloudDetails>;
export type RiskLevel =
  | "Info"
  | "Low"
  | "Medium"
  | "High"
  | "Critical"
  | (string & {});
export const RiskLevel = S.String;

export type RiskDetails = string;
export type Confidence = "Unknown" | "Low" | "Medium" | "High" | (string & {});
export const Confidence = S.String;

export type InvestigationErrorDetails = string;
export interface Investigation {
  InvestigationId?: string;
  Status?: InvestigationStatus;
  TriggerPrompt?: string;
  TriggeredBy?: string;
  Metadata?: InvestigationMetadata;
  Cloud?: CloudDetails;
  RiskLevel?: RiskLevel;
  Risk?: string;
  Confidence?: Confidence;
  Summary?: string;
  StartTime?: Date;
  EndTime?: Date;
  Error?: string;
}
export const Investigation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvestigationId: S.optional(S.String),
    Status: S.optional(InvestigationStatus),
    TriggerPrompt: S.optional(S.String),
    TriggeredBy: S.optional(S.String),
    Metadata: S.optional(InvestigationMetadata),
    Cloud: S.optional(CloudDetails),
    RiskLevel: S.optional(RiskLevel),
    Risk: S.optional(S.String),
    Confidence: S.optional(Confidence),
    Summary: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Error: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      InvestigationId: "investigationId",
      Status: "status",
      TriggerPrompt: "triggerPrompt",
      TriggeredBy: "triggeredBy",
      Metadata: "metadata",
      Cloud: "cloud",
      RiskLevel: "riskLevel",
      Risk: "risk",
      Confidence: "confidence",
      Summary: "summary",
      StartTime: "startTime",
      EndTime: "endTime",
      Error: "error",
    }),
  ),
).annotate({ identifier: "Investigation" }) as any as S.Schema<Investigation>;
export interface GetInvestigationResponse {
  Investigation: Investigation & {
    InvestigationId: InvestigationId;
    Status: InvestigationStatus;
    TriggerPrompt: TriggerPrompt;
    TriggeredBy: TriggeredBy;
    Metadata: InvestigationMetadata & {
      Version: string;
      Product: Product & { Name: string };
    };
    Cloud: CloudDetails & {
      Provider: CloudProvider;
      Region: string;
      Account: string;
    };
  };
}
export const GetInvestigationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Investigation: S.optional(Investigation) }).pipe(
    S.encodeKeys({ Investigation: "investigation" }),
  ),
).annotate({
  identifier: "GetInvestigationResponse",
}) as any as S.Schema<GetInvestigationResponse>;
export interface GetInvitationsCountRequest {}
export const GetInvitationsCountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitation/count" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInvitationsCountRequest",
}) as any as S.Schema<GetInvitationsCountRequest>;
export interface GetInvitationsCountResponse {
  InvitationsCount?: number;
}
export const GetInvitationsCountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvitationsCount: S.optional(S.Number) }).pipe(
    S.encodeKeys({ InvitationsCount: "invitationsCount" }),
  ),
).annotate({
  identifier: "GetInvitationsCountResponse",
}) as any as S.Schema<GetInvitationsCountResponse>;
export interface GetIPSetRequest {
  DetectorId: string;
  IpSetId?: string;
}
export const GetIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    IpSetId: S.optional(S.String).pipe(T.HttpLabel("IpSetId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/ipset/{IpSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIPSetRequest",
}) as any as S.Schema<GetIPSetRequest>;
export type IpSetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export const IpSetStatus = S.String;

export interface GetIPSetResponse {
  Name: string;
  Format: IpSetFormat;
  Location: string;
  Status: IpSetStatus;
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
}
export const GetIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Format: S.optional(IpSetFormat),
    Location: S.optional(S.String),
    Status: S.optional(IpSetStatus),
    Tags: S.optional(TagMap),
    ExpectedBucketOwner: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Format: "format",
      Location: "location",
      Status: "status",
      Tags: "tags",
      ExpectedBucketOwner: "expectedBucketOwner",
    }),
  ),
).annotate({
  identifier: "GetIPSetResponse",
}) as any as S.Schema<GetIPSetResponse>;
export interface GetMalwareProtectionPlanRequest {
  MalwareProtectionPlanId?: string;
}
export const GetMalwareProtectionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MalwareProtectionPlanId: S.optional(S.String).pipe(
      T.HttpLabel("MalwareProtectionPlanId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/malware-protection-plan/{MalwareProtectionPlanId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMalwareProtectionPlanRequest",
}) as any as S.Schema<GetMalwareProtectionPlanRequest>;
export type MalwareProtectionPlanStatus =
  | "ACTIVE"
  | "WARNING"
  | "ERROR"
  | (string & {});
export const MalwareProtectionPlanStatus = S.String;

export interface MalwareProtectionPlanStatusReason {
  Code?: string;
  Message?: string;
}
export const MalwareProtectionPlanStatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }).pipe(
    S.encodeKeys({ Code: "code", Message: "message" }),
  ),
).annotate({
  identifier: "MalwareProtectionPlanStatusReason",
}) as any as S.Schema<MalwareProtectionPlanStatusReason>;
export type MalwareProtectionPlanStatusReasonsList =
  MalwareProtectionPlanStatusReason[];
export const MalwareProtectionPlanStatusReasonsList = /*@__PURE__*/ S.Array(
  MalwareProtectionPlanStatusReason,
);
export interface GetMalwareProtectionPlanResponse {
  Arn?: string;
  Role?: string;
  ProtectedResource?: CreateProtectedResource;
  Actions?: MalwareProtectionPlanActions;
  CreatedAt?: Date;
  Status?: MalwareProtectionPlanStatus;
  StatusReasons?: MalwareProtectionPlanStatusReason[];
  Tags?: { [key: string]: string | undefined };
}
export const GetMalwareProtectionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Role: S.optional(S.String),
    ProtectedResource: S.optional(CreateProtectedResource),
    Actions: S.optional(MalwareProtectionPlanActions),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(MalwareProtectionPlanStatus),
    StatusReasons: S.optional(MalwareProtectionPlanStatusReasonsList),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Role: "role",
      ProtectedResource: "protectedResource",
      Actions: "actions",
      CreatedAt: "createdAt",
      Status: "status",
      StatusReasons: "statusReasons",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetMalwareProtectionPlanResponse",
}) as any as S.Schema<GetMalwareProtectionPlanResponse>;
export interface GetMalwareScanRequest {
  ScanId?: string;
}
export const GetMalwareScanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScanId: S.optional(S.String).pipe(T.HttpLabel("ScanId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/malware-scan/{ScanId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMalwareScanRequest",
}) as any as S.Schema<GetMalwareScanRequest>;
export type MalwareProtectionResourceType =
  | "EBS_RECOVERY_POINT"
  | "EBS_SNAPSHOT"
  | "EBS_VOLUME"
  | "EC2_AMI"
  | "EC2_INSTANCE"
  | "EC2_RECOVERY_POINT"
  | "S3_RECOVERY_POINT"
  | "S3_BUCKET"
  | "S3_POINT_IN_TIME_RECOVERY"
  | (string & {});
export const MalwareProtectionResourceType = S.String;

export type NonNegativeInteger = number;
export type MalwareProtectionScanStatus =
  | "RUNNING"
  | "COMPLETED"
  | "COMPLETED_WITH_ISSUES"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export const MalwareProtectionScanStatus = S.String;

export type ScanStatusReason =
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "SNAPSHOT_SIZE_LIMIT_EXCEEDED"
  | "RESOURCE_UNAVAILABLE"
  | "INCONSISTENT_SOURCE"
  | "INCREMENTAL_NO_DIFFERENCE"
  | "NO_EBS_VOLUMES_FOUND"
  | "UNSUPPORTED_PRODUCT_CODE_TYPE"
  | "AMI_SNAPSHOT_LIMIT_EXCEEDED"
  | "UNRELATED_RESOURCES"
  | "BASE_RESOURCE_NOT_SCANNED"
  | "BASE_CREATED_AFTER_TARGET"
  | "UNSUPPORTED_FOR_INCREMENTAL"
  | "UNSUPPORTED_AMI"
  | "UNSUPPORTED_SNAPSHOT"
  | "UNSUPPORTED_COMPOSITE_RECOVERY_POINT"
  | "ALL_FILES_SKIPPED_OR_FAILED"
  | (string & {});
export const ScanStatusReason = S.String;

export interface EbsSnapshot {
  DeviceName?: string;
}
export const EbsSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DeviceName: S.optional(S.String) }).pipe(
    S.encodeKeys({ DeviceName: "deviceName" }),
  ),
).annotate({ identifier: "EbsSnapshot" }) as any as S.Schema<EbsSnapshot>;
export interface ScannedResourceDetails {
  EbsVolume?: VolumeDetail;
  EbsSnapshot?: EbsSnapshot;
}
export const ScannedResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EbsVolume: S.optional(VolumeDetail),
    EbsSnapshot: S.optional(EbsSnapshot),
  }).pipe(S.encodeKeys({ EbsVolume: "ebsVolume", EbsSnapshot: "ebsSnapshot" })),
).annotate({
  identifier: "ScannedResourceDetails",
}) as any as S.Schema<ScannedResourceDetails>;
export interface ScannedResource {
  ScannedResourceArn?: string;
  ScannedResourceType?: MalwareProtectionResourceType;
  ScannedResourceStatus?: MalwareProtectionScanStatus;
  ScanStatusReason?: ScanStatusReason;
  ResourceDetails?: ScannedResourceDetails;
}
export const ScannedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScannedResourceArn: S.optional(S.String),
    ScannedResourceType: S.optional(MalwareProtectionResourceType),
    ScannedResourceStatus: S.optional(MalwareProtectionScanStatus),
    ScanStatusReason: S.optional(ScanStatusReason),
    ResourceDetails: S.optional(ScannedResourceDetails),
  }).pipe(
    S.encodeKeys({
      ScannedResourceArn: "scannedResourceArn",
      ScannedResourceType: "scannedResourceType",
      ScannedResourceStatus: "scannedResourceStatus",
      ScanStatusReason: "scanStatusReason",
      ResourceDetails: "resourceDetails",
    }),
  ),
).annotate({
  identifier: "ScannedResource",
}) as any as S.Schema<ScannedResource>;
export type ScannedResources = ScannedResource[];
export const ScannedResources = /*@__PURE__*/ S.Array(ScannedResource);
export interface ScanConfigurationRecoveryPoint {
  BackupVaultName?: string;
  ContinuousScanDetails?: ScanConfigurationContinuousScanDetails;
}
export const ScanConfigurationRecoveryPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    ContinuousScanDetails: S.optional(ScanConfigurationContinuousScanDetails),
  }).pipe(
    S.encodeKeys({
      BackupVaultName: "backupVaultName",
      ContinuousScanDetails: "continuousScanDetails",
    }),
  ),
).annotate({
  identifier: "ScanConfigurationRecoveryPoint",
}) as any as S.Schema<ScanConfigurationRecoveryPoint>;
export interface ScanConfiguration {
  Role?: string;
  TriggerDetails?: TriggerDetails;
  IncrementalScanDetails?: IncrementalScanDetails;
  RecoveryPoint?: ScanConfigurationRecoveryPoint;
}
export const ScanConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Role: S.optional(S.String),
    TriggerDetails: S.optional(TriggerDetails),
    IncrementalScanDetails: S.optional(IncrementalScanDetails),
    RecoveryPoint: S.optional(ScanConfigurationRecoveryPoint),
  }).pipe(
    S.encodeKeys({
      Role: "role",
      TriggerDetails: "triggerDetails",
      IncrementalScanDetails: "incrementalScanDetails",
      RecoveryPoint: "recoveryPoint",
    }),
  ),
).annotate({
  identifier: "ScanConfiguration",
}) as any as S.Schema<ScanConfiguration>;
export type ScanResultStatus =
  | "NO_THREATS_FOUND"
  | "THREATS_FOUND"
  | (string & {});
export const ScanResultStatus = S.String;

export type DetectionSource = "AMAZON" | "BITDEFENDER" | (string & {});
export const DetectionSource = S.String;

export interface ScanResultThreat {
  Name?: string;
  Source?: DetectionSource;
  Count?: number;
  Hash?: string;
  ItemDetails?: ItemDetails[];
}
export const ScanResultThreat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Source: S.optional(DetectionSource),
    Count: S.optional(S.Number),
    Hash: S.optional(S.String),
    ItemDetails: S.optional(ItemDetailsList),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Source: "source",
      Count: "count",
      Hash: "hash",
      ItemDetails: "itemDetails",
    }),
  ),
).annotate({
  identifier: "ScanResultThreat",
}) as any as S.Schema<ScanResultThreat>;
export type ScanResultThreats = ScanResultThreat[];
export const ScanResultThreats = /*@__PURE__*/ S.Array(ScanResultThreat);
export interface GetMalwareScanResultDetails {
  ScanResultStatus?: ScanResultStatus;
  SkippedFileCount?: number;
  FailedFileCount?: number;
  ThreatFoundFileCount?: number;
  TotalFileCount?: number;
  TotalBytes?: number;
  UniqueThreatCount?: number;
  Threats?: ScanResultThreat[];
}
export const GetMalwareScanResultDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScanResultStatus: S.optional(ScanResultStatus),
    SkippedFileCount: S.optional(S.Number),
    FailedFileCount: S.optional(S.Number),
    ThreatFoundFileCount: S.optional(S.Number),
    TotalFileCount: S.optional(S.Number),
    TotalBytes: S.optional(S.Number),
    UniqueThreatCount: S.optional(S.Number),
    Threats: S.optional(ScanResultThreats),
  }).pipe(
    S.encodeKeys({
      ScanResultStatus: "scanResultStatus",
      SkippedFileCount: "skippedFileCount",
      FailedFileCount: "failedFileCount",
      ThreatFoundFileCount: "threatFoundFileCount",
      TotalFileCount: "totalFileCount",
      TotalBytes: "totalBytes",
      UniqueThreatCount: "uniqueThreatCount",
      Threats: "threats",
    }),
  ),
).annotate({
  identifier: "GetMalwareScanResultDetails",
}) as any as S.Schema<GetMalwareScanResultDetails>;
export interface GetMalwareScanResponse {
  ScanId?: string;
  DetectorId?: string;
  AdminDetectorId?: string;
  ResourceArn?: string;
  ResourceType?: MalwareProtectionResourceType;
  ScannedResourcesCount?: number;
  SkippedResourcesCount?: number;
  FailedResourcesCount?: number;
  ScannedResources?: ScannedResource[];
  ScanConfiguration?: ScanConfiguration & {
    IncrementalScanDetails: IncrementalScanDetails & {
      BaselineResourceArn: NonEmptyString;
    };
  };
  ScanCategory?: ScanCategory;
  ScanStatus?: MalwareProtectionScanStatus;
  ScanStatusReason?: ScanStatusReason;
  ScanType?: MalwareProtectionScanType;
  ScanStartedAt?: Date;
  ScanCompletedAt?: Date;
  ScanResultDetails?: GetMalwareScanResultDetails;
}
export const GetMalwareScanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScanId: S.optional(S.String),
    DetectorId: S.optional(S.String),
    AdminDetectorId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(MalwareProtectionResourceType),
    ScannedResourcesCount: S.optional(S.Number),
    SkippedResourcesCount: S.optional(S.Number),
    FailedResourcesCount: S.optional(S.Number),
    ScannedResources: S.optional(ScannedResources),
    ScanConfiguration: S.optional(ScanConfiguration),
    ScanCategory: S.optional(ScanCategory),
    ScanStatus: S.optional(MalwareProtectionScanStatus),
    ScanStatusReason: S.optional(ScanStatusReason),
    ScanType: S.optional(MalwareProtectionScanType),
    ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScanCompletedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ScanResultDetails: S.optional(GetMalwareScanResultDetails),
  }).pipe(
    S.encodeKeys({
      ScanId: "scanId",
      DetectorId: "detectorId",
      AdminDetectorId: "adminDetectorId",
      ResourceArn: "resourceArn",
      ResourceType: "resourceType",
      ScannedResourcesCount: "scannedResourcesCount",
      SkippedResourcesCount: "skippedResourcesCount",
      FailedResourcesCount: "failedResourcesCount",
      ScannedResources: "scannedResources",
      ScanConfiguration: "scanConfiguration",
      ScanCategory: "scanCategory",
      ScanStatus: "scanStatus",
      ScanStatusReason: "scanStatusReason",
      ScanType: "scanType",
      ScanStartedAt: "scanStartedAt",
      ScanCompletedAt: "scanCompletedAt",
      ScanResultDetails: "scanResultDetails",
    }),
  ),
).annotate({
  identifier: "GetMalwareScanResponse",
}) as any as S.Schema<GetMalwareScanResponse>;
export interface GetMalwareScanSettingsRequest {
  DetectorId: string;
}
export const GetMalwareScanSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/malware-scan-settings",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMalwareScanSettingsRequest",
}) as any as S.Schema<GetMalwareScanSettingsRequest>;
export type ScanCriterionKey = "EC2_INSTANCE_TAG" | (string & {});
export const ScanCriterionKey = S.String;

export interface ScanConditionPair {
  Key?: string;
  Value?: string;
}
export const ScanConditionPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }).pipe(
    S.encodeKeys({ Key: "key", Value: "value" }),
  ),
).annotate({
  identifier: "ScanConditionPair",
}) as any as S.Schema<ScanConditionPair>;
export type MapEquals = ScanConditionPair[];
export const MapEquals = /*@__PURE__*/ S.Array(ScanConditionPair);
export interface ScanCondition {
  MapEquals?: ScanConditionPair[];
}
export const ScanCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MapEquals: S.optional(MapEquals) }).pipe(
    S.encodeKeys({ MapEquals: "mapEquals" }),
  ),
).annotate({ identifier: "ScanCondition" }) as any as S.Schema<ScanCondition>;
export type ScanCriterion = { [key in ScanCriterionKey]?: ScanCondition };
export const ScanCriterion = /*@__PURE__*/ S.Record(
  ScanCriterionKey,
  ScanCondition.pipe(S.optional),
);
export interface ScanResourceCriteria {
  Include?: { [key: string]: ScanCondition | undefined };
  Exclude?: { [key: string]: ScanCondition | undefined };
}
export const ScanResourceCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Include: S.optional(ScanCriterion),
    Exclude: S.optional(ScanCriterion),
  }).pipe(S.encodeKeys({ Include: "include", Exclude: "exclude" })),
).annotate({
  identifier: "ScanResourceCriteria",
}) as any as S.Schema<ScanResourceCriteria>;
export type EbsSnapshotPreservation =
  | "NO_RETENTION"
  | "RETENTION_WITH_FINDING"
  | (string & {});
export const EbsSnapshotPreservation = S.String;

export interface GetMalwareScanSettingsResponse {
  ScanResourceCriteria?: ScanResourceCriteria & {
    Include: {
      [key: string]:
        | (ScanCondition & {
            MapEquals: (ScanConditionPair & { Key: TagKey })[];
          })
        | undefined;
    };
    Exclude: {
      [key: string]:
        | (ScanCondition & {
            MapEquals: (ScanConditionPair & { Key: TagKey })[];
          })
        | undefined;
    };
  };
  EbsSnapshotPreservation?: EbsSnapshotPreservation;
}
export const GetMalwareScanSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScanResourceCriteria: S.optional(ScanResourceCriteria),
    EbsSnapshotPreservation: S.optional(EbsSnapshotPreservation),
  }).pipe(
    S.encodeKeys({
      ScanResourceCriteria: "scanResourceCriteria",
      EbsSnapshotPreservation: "ebsSnapshotPreservation",
    }),
  ),
).annotate({
  identifier: "GetMalwareScanSettingsResponse",
}) as any as S.Schema<GetMalwareScanSettingsResponse>;
export interface GetMasterAccountRequest {
  DetectorId: string;
}
export const GetMasterAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DetectorId: S.String.pipe(T.HttpLabel("DetectorId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/master" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMasterAccountRequest",
}) as any as S.Schema<GetMasterAccountRequest>;
export interface Master {
  AccountId?: string;
  InvitationId?: string;
  RelationshipStatus?: string;
  InvitedAt?: string;
}
export const Master = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    InvitationId: S.optional(S.String),
    RelationshipStatus: S.optional(S.String),
    InvitedAt: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      InvitationId: "invitationId",
      RelationshipStatus: "relationshipStatus",
      InvitedAt: "invitedAt",
    }),
  ),
).annotate({ identifier: "Master" }) as any as S.Schema<Master>;
export interface GetMasterAccountResponse {
  Master: Master;
}
export const GetMasterAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Master: S.optional(Master) }).pipe(
    S.encodeKeys({ Master: "master" }),
  ),
).annotate({
  identifier: "GetMasterAccountResponse",
}) as any as S.Schema<GetMasterAccountResponse>;
export interface GetMemberDetectorsRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export const GetMemberDetectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/member/detector/get",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetMemberDetectorsRequest",
}) as any as S.Schema<GetMemberDetectorsRequest>;
export interface MemberAdditionalConfigurationResult {
  Name?: OrgFeatureAdditionalConfiguration;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
}
export const MemberAdditionalConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeatureAdditionalConfiguration),
    Status: S.optional(FeatureStatus),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    S.encodeKeys({ Name: "name", Status: "status", UpdatedAt: "updatedAt" }),
  ),
).annotate({
  identifier: "MemberAdditionalConfigurationResult",
}) as any as S.Schema<MemberAdditionalConfigurationResult>;
export type MemberAdditionalConfigurationResults =
  MemberAdditionalConfigurationResult[];
export const MemberAdditionalConfigurationResults = /*@__PURE__*/ S.Array(
  MemberAdditionalConfigurationResult,
);
export interface MemberFeaturesConfigurationResult {
  Name?: OrgFeature;
  Status?: FeatureStatus;
  UpdatedAt?: Date;
  AdditionalConfiguration?: MemberAdditionalConfigurationResult[];
}
export const MemberFeaturesConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeature),
    Status: S.optional(FeatureStatus),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AdditionalConfiguration: S.optional(MemberAdditionalConfigurationResults),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Status: "status",
      UpdatedAt: "updatedAt",
      AdditionalConfiguration: "additionalConfiguration",
    }),
  ),
).annotate({
  identifier: "MemberFeaturesConfigurationResult",
}) as any as S.Schema<MemberFeaturesConfigurationResult>;
export type MemberFeaturesConfigurationsResults =
  MemberFeaturesConfigurationResult[];
export const MemberFeaturesConfigurationsResults = /*@__PURE__*/ S.Array(
  MemberFeaturesConfigurationResult,
);
export interface MemberDataSourceConfiguration {
  AccountId?: string;
  DataSources?: DataSourceConfigurationsResult;
  Features?: MemberFeaturesConfigurationResult[];
}
export const MemberDataSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    DataSources: S.optional(DataSourceConfigurationsResult),
    Features: S.optional(MemberFeaturesConfigurationsResults),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      DataSources: "dataSources",
      Features: "features",
    }),
  ),
).annotate({
  identifier: "MemberDataSourceConfiguration",
}) as any as S.Schema<MemberDataSourceConfiguration>;
export type MemberDataSourceConfigurations = MemberDataSourceConfiguration[];
export const MemberDataSourceConfigurations = /*@__PURE__*/ S.Array(
  MemberDataSourceConfiguration,
);
export interface GetMemberDetectorsResponse {
  MemberDataSourceConfigurations: (MemberDataSourceConfiguration & {
    AccountId: AccountId;
    DataSources: DataSourceConfigurationsResult & {
      CloudTrail: CloudTrailConfigurationResult & { Status: DataSourceStatus };
      DNSLogs: DNSLogsConfigurationResult & { Status: DataSourceStatus };
      FlowLogs: FlowLogsConfigurationResult & { Status: DataSourceStatus };
      S3Logs: S3LogsConfigurationResult & { Status: DataSourceStatus };
      Kubernetes: KubernetesConfigurationResult & {
        AuditLogs: KubernetesAuditLogsConfigurationResult & {
          Status: DataSourceStatus;
        };
      };
    };
  })[];
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const GetMemberDetectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MemberDataSourceConfigurations: S.optional(MemberDataSourceConfigurations),
    UnprocessedAccounts: S.optional(UnprocessedAccounts),
  }).pipe(
    S.encodeKeys({
      MemberDataSourceConfigurations: "members",
      UnprocessedAccounts: "unprocessedAccounts",
    }),
  ),
).annotate({
  identifier: "GetMemberDetectorsResponse",
}) as any as S.Schema<GetMemberDetectorsResponse>;
export interface GetMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export const GetMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/get" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetMembersRequest",
}) as any as S.Schema<GetMembersRequest>;
export interface Member {
  AccountId?: string;
  DetectorId?: string;
  MasterId?: string;
  Email?: string | redacted.Redacted<string>;
  RelationshipStatus?: string;
  InvitedAt?: string;
  UpdatedAt?: string;
  AdministratorId?: string;
}
export const Member = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    DetectorId: S.optional(S.String),
    MasterId: S.optional(S.String),
    Email: S.optional(SensitiveString),
    RelationshipStatus: S.optional(S.String),
    InvitedAt: S.optional(S.String),
    UpdatedAt: S.optional(S.String),
    AdministratorId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      DetectorId: "detectorId",
      MasterId: "masterId",
      Email: "email",
      RelationshipStatus: "relationshipStatus",
      InvitedAt: "invitedAt",
      UpdatedAt: "updatedAt",
      AdministratorId: "administratorId",
    }),
  ),
).annotate({ identifier: "Member" }) as any as S.Schema<Member>;
export type Members = Member[];
export const Members = /*@__PURE__*/ S.Array(Member);
export interface GetMembersResponse {
  Members: (Member & {
    AccountId: AccountId;
    MasterId: string;
    Email: Email;
    RelationshipStatus: string;
    UpdatedAt: string;
  })[];
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const GetMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Members: S.optional(Members),
    UnprocessedAccounts: S.optional(UnprocessedAccounts),
  }).pipe(
    S.encodeKeys({
      Members: "members",
      UnprocessedAccounts: "unprocessedAccounts",
    }),
  ),
).annotate({
  identifier: "GetMembersResponse",
}) as any as S.Schema<GetMembersResponse>;
export interface GetOrganizationStatisticsRequest {}
export const GetOrganizationStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/organization/statistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOrganizationStatisticsRequest",
}) as any as S.Schema<GetOrganizationStatisticsRequest>;
export interface OrganizationFeatureStatisticsAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration;
  EnabledAccountsCount?: number;
}
export const OrganizationFeatureStatisticsAdditionalConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Name: S.optional(OrgFeatureAdditionalConfiguration),
      EnabledAccountsCount: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({
        Name: "name",
        EnabledAccountsCount: "enabledAccountsCount",
      }),
    ),
  ).annotate({
    identifier: "OrganizationFeatureStatisticsAdditionalConfiguration",
  }) as any as S.Schema<OrganizationFeatureStatisticsAdditionalConfiguration>;
export type OrganizationFeatureStatisticsAdditionalConfigurations =
  OrganizationFeatureStatisticsAdditionalConfiguration[];
export const OrganizationFeatureStatisticsAdditionalConfigurations =
  /*@__PURE__*/ S.Array(OrganizationFeatureStatisticsAdditionalConfiguration);
export interface OrganizationFeatureStatistics {
  Name?: OrgFeature;
  EnabledAccountsCount?: number;
  AdditionalConfiguration?: OrganizationFeatureStatisticsAdditionalConfiguration[];
}
export const OrganizationFeatureStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeature),
    EnabledAccountsCount: S.optional(S.Number),
    AdditionalConfiguration: S.optional(
      OrganizationFeatureStatisticsAdditionalConfigurations,
    ),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      EnabledAccountsCount: "enabledAccountsCount",
      AdditionalConfiguration: "additionalConfiguration",
    }),
  ),
).annotate({
  identifier: "OrganizationFeatureStatistics",
}) as any as S.Schema<OrganizationFeatureStatistics>;
export type OrganizationFeatureStatisticsResults =
  OrganizationFeatureStatistics[];
export const OrganizationFeatureStatisticsResults = /*@__PURE__*/ S.Array(
  OrganizationFeatureStatistics,
);
export interface OrganizationStatistics {
  TotalAccountsCount?: number;
  MemberAccountsCount?: number;
  ActiveAccountsCount?: number;
  EnabledAccountsCount?: number;
  CountByFeature?: OrganizationFeatureStatistics[];
}
export const OrganizationStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalAccountsCount: S.optional(S.Number),
    MemberAccountsCount: S.optional(S.Number),
    ActiveAccountsCount: S.optional(S.Number),
    EnabledAccountsCount: S.optional(S.Number),
    CountByFeature: S.optional(OrganizationFeatureStatisticsResults),
  }).pipe(
    S.encodeKeys({
      TotalAccountsCount: "totalAccountsCount",
      MemberAccountsCount: "memberAccountsCount",
      ActiveAccountsCount: "activeAccountsCount",
      EnabledAccountsCount: "enabledAccountsCount",
      CountByFeature: "countByFeature",
    }),
  ),
).annotate({
  identifier: "OrganizationStatistics",
}) as any as S.Schema<OrganizationStatistics>;
export interface OrganizationDetails {
  UpdatedAt?: Date;
  OrganizationStatistics?: OrganizationStatistics;
}
export const OrganizationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OrganizationStatistics: S.optional(OrganizationStatistics),
  }).pipe(
    S.encodeKeys({
      UpdatedAt: "updatedAt",
      OrganizationStatistics: "organizationStatistics",
    }),
  ),
).annotate({
  identifier: "OrganizationDetails",
}) as any as S.Schema<OrganizationDetails>;
export interface GetOrganizationStatisticsResponse {
  OrganizationDetails?: OrganizationDetails;
}
export const GetOrganizationStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationDetails: S.optional(OrganizationDetails) }).pipe(
    S.encodeKeys({ OrganizationDetails: "organizationDetails" }),
  ),
).annotate({
  identifier: "GetOrganizationStatisticsResponse",
}) as any as S.Schema<GetOrganizationStatisticsResponse>;
export interface GetRemainingFreeTrialDaysRequest {
  DetectorId: string;
  AccountIds: string[];
}
export const GetRemainingFreeTrialDaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: AccountIds,
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/freeTrial/daysRemaining",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRemainingFreeTrialDaysRequest",
}) as any as S.Schema<GetRemainingFreeTrialDaysRequest>;
export interface DataSourceFreeTrial {
  FreeTrialDaysRemaining?: number;
}
export const DataSourceFreeTrial = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FreeTrialDaysRemaining: S.optional(S.Number) }).pipe(
    S.encodeKeys({ FreeTrialDaysRemaining: "freeTrialDaysRemaining" }),
  ),
).annotate({
  identifier: "DataSourceFreeTrial",
}) as any as S.Schema<DataSourceFreeTrial>;
export interface KubernetesDataSourceFreeTrial {
  AuditLogs?: DataSourceFreeTrial;
}
export const KubernetesDataSourceFreeTrial = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuditLogs: S.optional(DataSourceFreeTrial) }).pipe(
    S.encodeKeys({ AuditLogs: "auditLogs" }),
  ),
).annotate({
  identifier: "KubernetesDataSourceFreeTrial",
}) as any as S.Schema<KubernetesDataSourceFreeTrial>;
export interface MalwareProtectionDataSourceFreeTrial {
  ScanEc2InstanceWithFindings?: DataSourceFreeTrial;
}
export const MalwareProtectionDataSourceFreeTrial = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ScanEc2InstanceWithFindings: S.optional(DataSourceFreeTrial),
    }).pipe(
      S.encodeKeys({
        ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings",
      }),
    ),
).annotate({
  identifier: "MalwareProtectionDataSourceFreeTrial",
}) as any as S.Schema<MalwareProtectionDataSourceFreeTrial>;
export interface DataSourcesFreeTrial {
  CloudTrail?: DataSourceFreeTrial;
  DnsLogs?: DataSourceFreeTrial;
  FlowLogs?: DataSourceFreeTrial;
  S3Logs?: DataSourceFreeTrial;
  Kubernetes?: KubernetesDataSourceFreeTrial;
  MalwareProtection?: MalwareProtectionDataSourceFreeTrial;
}
export const DataSourcesFreeTrial = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudTrail: S.optional(DataSourceFreeTrial),
    DnsLogs: S.optional(DataSourceFreeTrial),
    FlowLogs: S.optional(DataSourceFreeTrial),
    S3Logs: S.optional(DataSourceFreeTrial),
    Kubernetes: S.optional(KubernetesDataSourceFreeTrial),
    MalwareProtection: S.optional(MalwareProtectionDataSourceFreeTrial),
  }).pipe(
    S.encodeKeys({
      CloudTrail: "cloudTrail",
      DnsLogs: "dnsLogs",
      FlowLogs: "flowLogs",
      S3Logs: "s3Logs",
      Kubernetes: "kubernetes",
      MalwareProtection: "malwareProtection",
    }),
  ),
).annotate({
  identifier: "DataSourcesFreeTrial",
}) as any as S.Schema<DataSourcesFreeTrial>;
export type FreeTrialFeatureResult =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "EC2_RUNTIME_MONITORING"
  | "FARGATE_RUNTIME_MONITORING"
  | "AI_PROTECTION"
  | (string & {});
export const FreeTrialFeatureResult = S.String;

export interface FreeTrialFeatureConfigurationResult {
  Name?: FreeTrialFeatureResult;
  FreeTrialDaysRemaining?: number;
}
export const FreeTrialFeatureConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(FreeTrialFeatureResult),
    FreeTrialDaysRemaining: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      FreeTrialDaysRemaining: "freeTrialDaysRemaining",
    }),
  ),
).annotate({
  identifier: "FreeTrialFeatureConfigurationResult",
}) as any as S.Schema<FreeTrialFeatureConfigurationResult>;
export type FreeTrialFeatureConfigurationsResults =
  FreeTrialFeatureConfigurationResult[];
export const FreeTrialFeatureConfigurationsResults = /*@__PURE__*/ S.Array(
  FreeTrialFeatureConfigurationResult,
);
export interface AccountFreeTrialInfo {
  AccountId?: string;
  DataSources?: DataSourcesFreeTrial;
  Features?: FreeTrialFeatureConfigurationResult[];
}
export const AccountFreeTrialInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    DataSources: S.optional(DataSourcesFreeTrial),
    Features: S.optional(FreeTrialFeatureConfigurationsResults),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      DataSources: "dataSources",
      Features: "features",
    }),
  ),
).annotate({
  identifier: "AccountFreeTrialInfo",
}) as any as S.Schema<AccountFreeTrialInfo>;
export type AccountFreeTrialInfos = AccountFreeTrialInfo[];
export const AccountFreeTrialInfos =
  /*@__PURE__*/ S.Array(AccountFreeTrialInfo);
export interface GetRemainingFreeTrialDaysResponse {
  Accounts?: AccountFreeTrialInfo[];
  UnprocessedAccounts?: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const GetRemainingFreeTrialDaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(AccountFreeTrialInfos),
    UnprocessedAccounts: S.optional(UnprocessedAccounts),
  }).pipe(
    S.encodeKeys({
      Accounts: "accounts",
      UnprocessedAccounts: "unprocessedAccounts",
    }),
  ),
).annotate({
  identifier: "GetRemainingFreeTrialDaysResponse",
}) as any as S.Schema<GetRemainingFreeTrialDaysResponse>;
export interface GetThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string;
}
export const GetThreatEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ThreatEntitySetId: S.optional(S.String).pipe(
      T.HttpLabel("ThreatEntitySetId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThreatEntitySetRequest",
}) as any as S.Schema<GetThreatEntitySetRequest>;
export type ThreatEntitySetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export const ThreatEntitySetStatus = S.String;

export interface GetThreatEntitySetResponse {
  Name: string;
  Format: ThreatEntitySetFormat;
  Location: string;
  ExpectedBucketOwner?: string;
  Status: ThreatEntitySetStatus;
  Tags?: { [key: string]: string | undefined };
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ErrorDetails?: string;
}
export const GetThreatEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Format: S.optional(ThreatEntitySetFormat),
    Location: S.optional(S.String),
    ExpectedBucketOwner: S.optional(S.String),
    Status: S.optional(ThreatEntitySetStatus),
    Tags: S.optional(TagMap),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorDetails: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Format: "format",
      Location: "location",
      ExpectedBucketOwner: "expectedBucketOwner",
      Status: "status",
      Tags: "tags",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      ErrorDetails: "errorDetails",
    }),
  ),
).annotate({
  identifier: "GetThreatEntitySetResponse",
}) as any as S.Schema<GetThreatEntitySetResponse>;
export interface GetThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
}
export const GetThreatIntelSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ThreatIntelSetId: S.String.pipe(T.HttpLabel("ThreatIntelSetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThreatIntelSetRequest",
}) as any as S.Schema<GetThreatIntelSetRequest>;
export type ThreatIntelSetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export const ThreatIntelSetStatus = S.String;

export interface GetThreatIntelSetResponse {
  Name: string;
  Format: ThreatIntelSetFormat;
  Location: string;
  Status: ThreatIntelSetStatus;
  Tags?: { [key: string]: string | undefined };
  ExpectedBucketOwner?: string;
}
export const GetThreatIntelSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Format: S.optional(ThreatIntelSetFormat),
    Location: S.optional(S.String),
    Status: S.optional(ThreatIntelSetStatus),
    Tags: S.optional(TagMap),
    ExpectedBucketOwner: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Format: "format",
      Location: "location",
      Status: "status",
      Tags: "tags",
      ExpectedBucketOwner: "expectedBucketOwner",
    }),
  ),
).annotate({
  identifier: "GetThreatIntelSetResponse",
}) as any as S.Schema<GetThreatIntelSetResponse>;
export interface GetTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
}
export const GetTrustedEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    TrustedEntitySetId: S.String.pipe(T.HttpLabel("TrustedEntitySetId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTrustedEntitySetRequest",
}) as any as S.Schema<GetTrustedEntitySetRequest>;
export type TrustedEntitySetStatus =
  | "INACTIVE"
  | "ACTIVATING"
  | "ACTIVE"
  | "DEACTIVATING"
  | "ERROR"
  | "DELETE_PENDING"
  | "DELETED"
  | (string & {});
export const TrustedEntitySetStatus = S.String;

export interface GetTrustedEntitySetResponse {
  Name: string;
  Format: TrustedEntitySetFormat;
  Location: string;
  ExpectedBucketOwner?: string;
  Status: TrustedEntitySetStatus;
  Tags?: { [key: string]: string | undefined };
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ErrorDetails?: string;
}
export const GetTrustedEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Format: S.optional(TrustedEntitySetFormat),
    Location: S.optional(S.String),
    ExpectedBucketOwner: S.optional(S.String),
    Status: S.optional(TrustedEntitySetStatus),
    Tags: S.optional(TagMap),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorDetails: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Format: "format",
      Location: "location",
      ExpectedBucketOwner: "expectedBucketOwner",
      Status: "status",
      Tags: "tags",
      CreatedAt: "createdAt",
      UpdatedAt: "updatedAt",
      ErrorDetails: "errorDetails",
    }),
  ),
).annotate({
  identifier: "GetTrustedEntitySetResponse",
}) as any as S.Schema<GetTrustedEntitySetResponse>;
export type UsageStatisticType =
  | "SUM_BY_ACCOUNT"
  | "SUM_BY_DATA_SOURCE"
  | "SUM_BY_RESOURCE"
  | "TOP_RESOURCES"
  | "SUM_BY_FEATURES"
  | "TOP_ACCOUNTS_BY_FEATURE"
  | (string & {});
export const UsageStatisticType = S.String;

export type DataSource =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_LOGS"
  | "KUBERNETES_AUDIT_LOGS"
  | "EC2_MALWARE_SCAN"
  | (string & {});
export const DataSource = S.String;

export type DataSourceList = DataSource[];
export const DataSourceList = /*@__PURE__*/ S.Array(DataSource);
export type ResourceList = string[];
export const ResourceList = /*@__PURE__*/ S.Array(S.String);
export type UsageFeature =
  | "FLOW_LOGS"
  | "CLOUD_TRAIL"
  | "DNS_LOGS"
  | "S3_DATA_EVENTS"
  | "EKS_AUDIT_LOGS"
  | "EBS_MALWARE_PROTECTION"
  | "RDS_LOGIN_EVENTS"
  | "LAMBDA_NETWORK_LOGS"
  | "EKS_RUNTIME_MONITORING"
  | "EC2_RUNTIME_MONITORING"
  | "FARGATE_RUNTIME_MONITORING"
  | "RDS_DBI_PROTECTION_PROVISIONED"
  | "RDS_DBI_PROTECTION_SERVERLESS"
  | "AI_PROTECTION"
  | (string & {});
export const UsageFeature = S.String;

export type UsageFeatureList = UsageFeature[];
export const UsageFeatureList = /*@__PURE__*/ S.Array(UsageFeature);
export interface UsageCriteria {
  AccountIds?: string[];
  DataSources?: DataSource[];
  Resources?: string[];
  Features?: UsageFeature[];
}
export const UsageCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountIds: S.optional(AccountIds),
    DataSources: S.optional(DataSourceList),
    Resources: S.optional(ResourceList),
    Features: S.optional(UsageFeatureList),
  }).pipe(
    S.encodeKeys({
      AccountIds: "accountIds",
      DataSources: "dataSources",
      Resources: "resources",
      Features: "features",
    }),
  ),
).annotate({ identifier: "UsageCriteria" }) as any as S.Schema<UsageCriteria>;
export interface GetUsageStatisticsRequest {
  DetectorId: string;
  UsageStatisticType?: UsageStatisticType;
  UsageCriteria?: UsageCriteria;
  Unit?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetUsageStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    UsageStatisticType: S.optional(UsageStatisticType),
    UsageCriteria: S.optional(UsageCriteria),
    Unit: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        UsageStatisticType: "usageStatisticsType",
        UsageCriteria: "usageCriteria",
        Unit: "unit",
        MaxResults: "maxResults",
        NextToken: "nextToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/usage/statistics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetUsageStatisticsRequest",
}) as any as S.Schema<GetUsageStatisticsRequest>;
export interface Total {
  Amount?: string;
  Unit?: string;
}
export const Total = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Amount: S.optional(S.String), Unit: S.optional(S.String) }).pipe(
    S.encodeKeys({ Amount: "amount", Unit: "unit" }),
  ),
).annotate({ identifier: "Total" }) as any as S.Schema<Total>;
export interface UsageAccountResult {
  AccountId?: string;
  Total?: Total;
}
export const UsageAccountResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), Total: S.optional(Total) }).pipe(
    S.encodeKeys({ AccountId: "accountId", Total: "total" }),
  ),
).annotate({
  identifier: "UsageAccountResult",
}) as any as S.Schema<UsageAccountResult>;
export type UsageAccountResultList = UsageAccountResult[];
export const UsageAccountResultList = /*@__PURE__*/ S.Array(UsageAccountResult);
export interface UsageTopAccountResult {
  AccountId?: string;
  Total?: Total;
}
export const UsageTopAccountResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), Total: S.optional(Total) }).pipe(
    S.encodeKeys({ AccountId: "accountId", Total: "total" }),
  ),
).annotate({
  identifier: "UsageTopAccountResult",
}) as any as S.Schema<UsageTopAccountResult>;
export type UsageTopAccountsByFeatureList = UsageTopAccountResult[];
export const UsageTopAccountsByFeatureList = /*@__PURE__*/ S.Array(
  UsageTopAccountResult,
);
export interface UsageTopAccountsResult {
  Feature?: UsageFeature;
  Accounts?: UsageTopAccountResult[];
}
export const UsageTopAccountsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Feature: S.optional(UsageFeature),
    Accounts: S.optional(UsageTopAccountsByFeatureList),
  }).pipe(S.encodeKeys({ Feature: "feature", Accounts: "accounts" })),
).annotate({
  identifier: "UsageTopAccountsResult",
}) as any as S.Schema<UsageTopAccountsResult>;
export type UsageTopAccountsResultList = UsageTopAccountsResult[];
export const UsageTopAccountsResultList = /*@__PURE__*/ S.Array(
  UsageTopAccountsResult,
);
export interface UsageDataSourceResult {
  DataSource?: DataSource;
  Total?: Total;
}
export const UsageDataSourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSource: S.optional(DataSource),
    Total: S.optional(Total),
  }).pipe(S.encodeKeys({ DataSource: "dataSource", Total: "total" })),
).annotate({
  identifier: "UsageDataSourceResult",
}) as any as S.Schema<UsageDataSourceResult>;
export type UsageDataSourceResultList = UsageDataSourceResult[];
export const UsageDataSourceResultList = /*@__PURE__*/ S.Array(
  UsageDataSourceResult,
);
export interface UsageResourceResult {
  Resource?: string;
  Total?: Total;
}
export const UsageResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.optional(S.String), Total: S.optional(Total) }).pipe(
    S.encodeKeys({ Resource: "resource", Total: "total" }),
  ),
).annotate({
  identifier: "UsageResourceResult",
}) as any as S.Schema<UsageResourceResult>;
export type UsageResourceResultList = UsageResourceResult[];
export const UsageResourceResultList =
  /*@__PURE__*/ S.Array(UsageResourceResult);
export interface UsageFeatureResult {
  Feature?: UsageFeature;
  Total?: Total;
}
export const UsageFeatureResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Feature: S.optional(UsageFeature),
    Total: S.optional(Total),
  }).pipe(S.encodeKeys({ Feature: "feature", Total: "total" })),
).annotate({
  identifier: "UsageFeatureResult",
}) as any as S.Schema<UsageFeatureResult>;
export type UsageFeatureResultList = UsageFeatureResult[];
export const UsageFeatureResultList = /*@__PURE__*/ S.Array(UsageFeatureResult);
export interface UsageStatistics {
  SumByAccount?: UsageAccountResult[];
  TopAccountsByFeature?: UsageTopAccountsResult[];
  SumByDataSource?: UsageDataSourceResult[];
  SumByResource?: UsageResourceResult[];
  TopResources?: UsageResourceResult[];
  SumByFeature?: UsageFeatureResult[];
}
export const UsageStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SumByAccount: S.optional(UsageAccountResultList),
    TopAccountsByFeature: S.optional(UsageTopAccountsResultList),
    SumByDataSource: S.optional(UsageDataSourceResultList),
    SumByResource: S.optional(UsageResourceResultList),
    TopResources: S.optional(UsageResourceResultList),
    SumByFeature: S.optional(UsageFeatureResultList),
  }).pipe(
    S.encodeKeys({
      SumByAccount: "sumByAccount",
      TopAccountsByFeature: "topAccountsByFeature",
      SumByDataSource: "sumByDataSource",
      SumByResource: "sumByResource",
      TopResources: "topResources",
      SumByFeature: "sumByFeature",
    }),
  ),
).annotate({
  identifier: "UsageStatistics",
}) as any as S.Schema<UsageStatistics>;
export interface GetUsageStatisticsResponse {
  UsageStatistics?: UsageStatistics;
  NextToken?: string;
}
export const GetUsageStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageStatistics: S.optional(UsageStatistics),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      UsageStatistics: "usageStatistics",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "GetUsageStatisticsResponse",
}) as any as S.Schema<GetUsageStatisticsResponse>;
export interface InviteMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
  DisableEmailNotification?: boolean;
  Message?: string;
}
export const InviteMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
    DisableEmailNotification: S.optional(S.Boolean),
    Message: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        AccountIds: "accountIds",
        DisableEmailNotification: "disableEmailNotification",
        Message: "message",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/invite" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "InviteMembersRequest",
}) as any as S.Schema<InviteMembersRequest>;
export interface InviteMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const InviteMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "InviteMembersResponse",
}) as any as S.Schema<InviteMembersResponse>;
export type CoverageSortKey =
  | "ACCOUNT_ID"
  | "COVERAGE_STATUS"
  | "ISSUE"
  | "ADDON_VERSION"
  | "UPDATED_AT"
  | "CLUSTER_NAME"
  | "EKS_CLUSTER_NAME"
  | "ECS_CLUSTER_NAME"
  | "INSTANCE_ID"
  | (string & {});
export const CoverageSortKey = S.String;

export interface CoverageSortCriteria {
  AttributeName?: CoverageSortKey;
  OrderBy?: OrderBy;
}
export const CoverageSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(CoverageSortKey),
    OrderBy: S.optional(OrderBy),
  }).pipe(S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" })),
).annotate({
  identifier: "CoverageSortCriteria",
}) as any as S.Schema<CoverageSortCriteria>;
export interface ListCoverageRequest {
  DetectorId: string;
  NextToken?: string;
  MaxResults?: number;
  FilterCriteria?: CoverageFilterCriteria;
  SortCriteria?: CoverageSortCriteria;
}
export const ListCoverageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    FilterCriteria: S.optional(CoverageFilterCriteria),
    SortCriteria: S.optional(CoverageSortCriteria),
  })
    .pipe(
      S.encodeKeys({
        NextToken: "nextToken",
        MaxResults: "maxResults",
        FilterCriteria: "filterCriteria",
        SortCriteria: "sortCriteria",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/coverage" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCoverageRequest",
}) as any as S.Schema<ListCoverageRequest>;
export interface AddonDetails {
  AddonVersion?: string;
  AddonStatus?: string;
}
export const AddonDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonVersion: S.optional(S.String),
    AddonStatus: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ AddonVersion: "addonVersion", AddonStatus: "addonStatus" }),
  ),
).annotate({ identifier: "AddonDetails" }) as any as S.Schema<AddonDetails>;
export type ManagementType =
  | "AUTO_MANAGED"
  | "MANUAL"
  | "DISABLED"
  | (string & {});
export const ManagementType = S.String;

export interface CoverageEksClusterDetails {
  ClusterName?: string;
  CoveredNodes?: number;
  CompatibleNodes?: number;
  AddonDetails?: AddonDetails;
  ManagementType?: ManagementType;
}
export const CoverageEksClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    CoveredNodes: S.optional(S.Number),
    CompatibleNodes: S.optional(S.Number),
    AddonDetails: S.optional(AddonDetails),
    ManagementType: S.optional(ManagementType),
  }).pipe(
    S.encodeKeys({
      ClusterName: "clusterName",
      CoveredNodes: "coveredNodes",
      CompatibleNodes: "compatibleNodes",
      AddonDetails: "addonDetails",
      ManagementType: "managementType",
    }),
  ),
).annotate({
  identifier: "CoverageEksClusterDetails",
}) as any as S.Schema<CoverageEksClusterDetails>;
export type Issues = string[];
export const Issues = /*@__PURE__*/ S.Array(S.String);
export interface FargateDetails {
  Issues?: string[];
  ManagementType?: ManagementType;
}
export const FargateDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Issues: S.optional(Issues),
    ManagementType: S.optional(ManagementType),
  }).pipe(S.encodeKeys({ Issues: "issues", ManagementType: "managementType" })),
).annotate({ identifier: "FargateDetails" }) as any as S.Schema<FargateDetails>;
export interface ContainerInstanceDetails {
  CoveredContainerInstances?: number;
  CompatibleContainerInstances?: number;
}
export const ContainerInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoveredContainerInstances: S.optional(S.Number),
    CompatibleContainerInstances: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      CoveredContainerInstances: "coveredContainerInstances",
      CompatibleContainerInstances: "compatibleContainerInstances",
    }),
  ),
).annotate({
  identifier: "ContainerInstanceDetails",
}) as any as S.Schema<ContainerInstanceDetails>;
export interface CoverageEcsClusterDetails {
  ClusterName?: string;
  FargateDetails?: FargateDetails;
  ContainerInstanceDetails?: ContainerInstanceDetails;
}
export const CoverageEcsClusterDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterName: S.optional(S.String),
    FargateDetails: S.optional(FargateDetails),
    ContainerInstanceDetails: S.optional(ContainerInstanceDetails),
  }).pipe(
    S.encodeKeys({
      ClusterName: "clusterName",
      FargateDetails: "fargateDetails",
      ContainerInstanceDetails: "containerInstanceDetails",
    }),
  ),
).annotate({
  identifier: "CoverageEcsClusterDetails",
}) as any as S.Schema<CoverageEcsClusterDetails>;
export interface AgentDetails {
  Version?: string;
}
export const AgentDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(S.String) }).pipe(
    S.encodeKeys({ Version: "version" }),
  ),
).annotate({ identifier: "AgentDetails" }) as any as S.Schema<AgentDetails>;
export interface CoverageEc2InstanceDetails {
  InstanceId?: string;
  InstanceType?: string;
  ClusterArn?: string;
  AgentDetails?: AgentDetails;
  ManagementType?: ManagementType;
}
export const CoverageEc2InstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    InstanceType: S.optional(S.String),
    ClusterArn: S.optional(S.String),
    AgentDetails: S.optional(AgentDetails),
    ManagementType: S.optional(ManagementType),
  }).pipe(
    S.encodeKeys({
      InstanceId: "instanceId",
      InstanceType: "instanceType",
      ClusterArn: "clusterArn",
      AgentDetails: "agentDetails",
      ManagementType: "managementType",
    }),
  ),
).annotate({
  identifier: "CoverageEc2InstanceDetails",
}) as any as S.Schema<CoverageEc2InstanceDetails>;
export interface CoverageResourceDetails {
  EksClusterDetails?: CoverageEksClusterDetails;
  EcsClusterDetails?: CoverageEcsClusterDetails;
  Ec2InstanceDetails?: CoverageEc2InstanceDetails;
  ResourceType?: ResourceType;
}
export const CoverageResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EksClusterDetails: S.optional(CoverageEksClusterDetails),
    EcsClusterDetails: S.optional(CoverageEcsClusterDetails),
    Ec2InstanceDetails: S.optional(CoverageEc2InstanceDetails),
    ResourceType: S.optional(ResourceType),
  }).pipe(
    S.encodeKeys({
      EksClusterDetails: "eksClusterDetails",
      EcsClusterDetails: "ecsClusterDetails",
      Ec2InstanceDetails: "ec2InstanceDetails",
      ResourceType: "resourceType",
    }),
  ),
).annotate({
  identifier: "CoverageResourceDetails",
}) as any as S.Schema<CoverageResourceDetails>;
export interface CoverageResource {
  ResourceId?: string;
  DetectorId?: string;
  AccountId?: string;
  ResourceDetails?: CoverageResourceDetails;
  CoverageStatus?: CoverageStatus;
  Issue?: string;
  UpdatedAt?: Date;
}
export const CoverageResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    DetectorId: S.optional(S.String),
    AccountId: S.optional(S.String),
    ResourceDetails: S.optional(CoverageResourceDetails),
    CoverageStatus: S.optional(CoverageStatus),
    Issue: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    S.encodeKeys({
      ResourceId: "resourceId",
      DetectorId: "detectorId",
      AccountId: "accountId",
      ResourceDetails: "resourceDetails",
      CoverageStatus: "coverageStatus",
      Issue: "issue",
      UpdatedAt: "updatedAt",
    }),
  ),
).annotate({
  identifier: "CoverageResource",
}) as any as S.Schema<CoverageResource>;
export type CoverageResources = CoverageResource[];
export const CoverageResources = /*@__PURE__*/ S.Array(CoverageResource);
export interface ListCoverageResponse {
  Resources: CoverageResource[];
  NextToken?: string;
}
export const ListCoverageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(CoverageResources),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Resources: "resources", NextToken: "nextToken" })),
).annotate({
  identifier: "ListCoverageResponse",
}) as any as S.Schema<ListCoverageResponse>;
export interface ListDetectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDetectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDetectorsRequest",
}) as any as S.Schema<ListDetectorsRequest>;
export type DetectorIds = string[];
export const DetectorIds = /*@__PURE__*/ S.Array(S.String);
export interface ListDetectorsResponse {
  DetectorIds: string[];
  NextToken?: string;
}
export const ListDetectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorIds: S.optional(DetectorIds),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ DetectorIds: "detectorIds", NextToken: "nextToken" })),
).annotate({
  identifier: "ListDetectorsResponse",
}) as any as S.Schema<ListDetectorsResponse>;
export interface ListFiltersRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFiltersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/filter" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFiltersRequest",
}) as any as S.Schema<ListFiltersRequest>;
export type FilterNames = string[];
export const FilterNames = /*@__PURE__*/ S.Array(S.String);
export interface ListFiltersResponse {
  FilterNames: string[];
  NextToken?: string;
}
export const ListFiltersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterNames: S.optional(FilterNames),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ FilterNames: "filterNames", NextToken: "nextToken" })),
).annotate({
  identifier: "ListFiltersResponse",
}) as any as S.Schema<ListFiltersResponse>;
export interface ListFindingsRequest {
  DetectorId: string;
  FindingCriteria?: FindingCriteria;
  SortCriteria?: SortCriteria;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingCriteria: S.optional(FindingCriteria),
    SortCriteria: S.optional(SortCriteria),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        FindingCriteria: "findingCriteria",
        SortCriteria: "sortCriteria",
        MaxResults: "maxResults",
        NextToken: "nextToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/findings" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListFindingsRequest",
}) as any as S.Schema<ListFindingsRequest>;
export interface ListFindingsResponse {
  FindingIds: string[];
  NextToken?: string;
}
export const ListFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FindingIds: S.optional(FindingIds),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ FindingIds: "findingIds", NextToken: "nextToken" })),
).annotate({
  identifier: "ListFindingsResponse",
}) as any as S.Schema<ListFindingsResponse>;
export type InvestigationSortField =
  | "START_TIME"
  | "END_TIME"
  | "STATUS"
  | "RISK_LEVEL"
  | "CONFIDENCE"
  | (string & {});
export const InvestigationSortField = S.String;

export interface InvestigationSortCriteria {
  AttributeName?: InvestigationSortField;
  OrderBy?: OrderBy;
}
export const InvestigationSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(InvestigationSortField),
    OrderBy: S.optional(OrderBy),
  }).pipe(S.encodeKeys({ AttributeName: "attributeName", OrderBy: "orderBy" })),
).annotate({
  identifier: "InvestigationSortCriteria",
}) as any as S.Schema<InvestigationSortCriteria>;
export type NextToken = string;
export interface ListInvestigationsRequest {
  DetectorId: string;
  SortCriteria?: InvestigationSortCriteria;
  MaxResults?: number;
  NextToken?: string;
}
export const ListInvestigationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    SortCriteria: S.optional(InvestigationSortCriteria),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        SortCriteria: "sortCriteria",
        MaxResults: "maxResults",
        NextToken: "nextToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/investigation/list",
        }),
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
export type InvestigationTitle = string;
export interface InvestigationSummary {
  InvestigationId?: string;
  Status?: InvestigationStatus;
  TriggerPrompt?: string;
  RiskLevel?: RiskLevel;
  Confidence?: Confidence;
  Title?: string;
  AccountId?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export const InvestigationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvestigationId: S.optional(S.String),
    Status: S.optional(InvestigationStatus),
    TriggerPrompt: S.optional(S.String),
    RiskLevel: S.optional(RiskLevel),
    Confidence: S.optional(Confidence),
    Title: S.optional(S.String),
    AccountId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    S.encodeKeys({
      InvestigationId: "investigationId",
      Status: "status",
      TriggerPrompt: "triggerPrompt",
      RiskLevel: "riskLevel",
      Confidence: "confidence",
      Title: "title",
      AccountId: "accountId",
      StartTime: "startTime",
      EndTime: "endTime",
    }),
  ),
).annotate({
  identifier: "InvestigationSummary",
}) as any as S.Schema<InvestigationSummary>;
export type InvestigationSummaries = InvestigationSummary[];
export const InvestigationSummaries =
  /*@__PURE__*/ S.Array(InvestigationSummary);
export interface ListInvestigationsResponse {
  Investigations: InvestigationSummary[];
  NextToken?: string;
}
export const ListInvestigationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Investigations: S.optional(InvestigationSummaries),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Investigations: "investigations", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListInvestigationsResponse",
}) as any as S.Schema<ListInvestigationsResponse>;
export interface ListInvitationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/invitation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInvitationsRequest",
}) as any as S.Schema<ListInvitationsRequest>;
export interface Invitation {
  AccountId?: string;
  InvitationId?: string;
  RelationshipStatus?: string;
  InvitedAt?: string;
}
export const Invitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    InvitationId: S.optional(S.String),
    RelationshipStatus: S.optional(S.String),
    InvitedAt: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccountId: "accountId",
      InvitationId: "invitationId",
      RelationshipStatus: "relationshipStatus",
      InvitedAt: "invitedAt",
    }),
  ),
).annotate({ identifier: "Invitation" }) as any as S.Schema<Invitation>;
export type Invitations = Invitation[];
export const Invitations = /*@__PURE__*/ S.Array(Invitation);
export interface ListInvitationsResponse {
  Invitations?: Invitation[];
  NextToken?: string;
}
export const ListInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Invitations: S.optional(Invitations),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Invitations: "invitations", NextToken: "nextToken" })),
).annotate({
  identifier: "ListInvitationsResponse",
}) as any as S.Schema<ListInvitationsResponse>;
export interface ListIPSetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListIPSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/ipset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIPSetsRequest",
}) as any as S.Schema<ListIPSetsRequest>;
export type IpSetIds = string[];
export const IpSetIds = /*@__PURE__*/ S.Array(S.String);
export interface ListIPSetsResponse {
  IpSetIds: string[];
  NextToken?: string;
}
export const ListIPSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpSetIds: S.optional(IpSetIds),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ IpSetIds: "ipSetIds", NextToken: "nextToken" })),
).annotate({
  identifier: "ListIPSetsResponse",
}) as any as S.Schema<ListIPSetsResponse>;
export interface ListMalwareProtectionPlansRequest {
  NextToken?: string;
}
export const ListMalwareProtectionPlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/malware-protection-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMalwareProtectionPlansRequest",
}) as any as S.Schema<ListMalwareProtectionPlansRequest>;
export interface MalwareProtectionPlanSummary {
  MalwareProtectionPlanId?: string;
}
export const MalwareProtectionPlanSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MalwareProtectionPlanId: S.optional(S.String) }).pipe(
    S.encodeKeys({ MalwareProtectionPlanId: "malwareProtectionPlanId" }),
  ),
).annotate({
  identifier: "MalwareProtectionPlanSummary",
}) as any as S.Schema<MalwareProtectionPlanSummary>;
export type MalwareProtectionPlansSummary = MalwareProtectionPlanSummary[];
export const MalwareProtectionPlansSummary = /*@__PURE__*/ S.Array(
  MalwareProtectionPlanSummary,
);
export interface ListMalwareProtectionPlansResponse {
  MalwareProtectionPlans?: MalwareProtectionPlanSummary[];
  NextToken?: string;
}
export const ListMalwareProtectionPlansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MalwareProtectionPlans: S.optional(MalwareProtectionPlansSummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MalwareProtectionPlans: "malwareProtectionPlans",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListMalwareProtectionPlansResponse",
}) as any as S.Schema<ListMalwareProtectionPlansResponse>;
export type ListMalwareScansCriterionKey =
  | "RESOURCE_ARN"
  | "SCAN_ID"
  | "ACCOUNT_ID"
  | "GUARDDUTY_FINDING_ID"
  | "RESOURCE_TYPE"
  | "SCAN_START_TIME"
  | "SCAN_STATUS"
  | "SCAN_TYPE"
  | (string & {});
export const ListMalwareScansCriterionKey = S.String;

export interface ListMalwareScansFilterCriterion {
  ListMalwareScansCriterionKey?: ListMalwareScansCriterionKey;
  FilterCondition?: FilterCondition;
}
export const ListMalwareScansFilterCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListMalwareScansCriterionKey: S.optional(ListMalwareScansCriterionKey),
    FilterCondition: S.optional(FilterCondition),
  }).pipe(
    S.encodeKeys({
      ListMalwareScansCriterionKey: "criterionKey",
      FilterCondition: "filterCondition",
    }),
  ),
).annotate({
  identifier: "ListMalwareScansFilterCriterion",
}) as any as S.Schema<ListMalwareScansFilterCriterion>;
export type ListMalwareScansFilterCriterionList =
  ListMalwareScansFilterCriterion[];
export const ListMalwareScansFilterCriterionList = /*@__PURE__*/ S.Array(
  ListMalwareScansFilterCriterion,
);
export interface ListMalwareScansFilterCriteria {
  ListMalwareScansFilterCriterion?: ListMalwareScansFilterCriterion[];
}
export const ListMalwareScansFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListMalwareScansFilterCriterion: S.optional(
      ListMalwareScansFilterCriterionList,
    ),
  }).pipe(S.encodeKeys({ ListMalwareScansFilterCriterion: "filterCriterion" })),
).annotate({
  identifier: "ListMalwareScansFilterCriteria",
}) as any as S.Schema<ListMalwareScansFilterCriteria>;
export interface ListMalwareScansRequest {
  MaxResults?: number;
  NextToken?: string;
  FilterCriteria?: ListMalwareScansFilterCriteria;
  SortCriteria?: SortCriteria;
}
export const ListMalwareScansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    FilterCriteria: S.optional(ListMalwareScansFilterCriteria),
    SortCriteria: S.optional(SortCriteria),
  })
    .pipe(
      S.encodeKeys({
        FilterCriteria: "filterCriteria",
        SortCriteria: "sortCriteria",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/malware-scan" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListMalwareScansRequest",
}) as any as S.Schema<ListMalwareScansRequest>;
export interface MalwareScan {
  ResourceArn?: string;
  ResourceType?: MalwareProtectionResourceType;
  ScanId?: string;
  ScanStatus?: MalwareProtectionScanStatus;
  ScanResultStatus?: ScanResultStatus;
  ScanType?: MalwareProtectionScanType;
  ScanStartedAt?: Date;
  ScanCompletedAt?: Date;
}
export const MalwareScan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(MalwareProtectionResourceType),
    ScanId: S.optional(S.String),
    ScanStatus: S.optional(MalwareProtectionScanStatus),
    ScanResultStatus: S.optional(ScanResultStatus),
    ScanType: S.optional(MalwareProtectionScanType),
    ScanStartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ScanCompletedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }).pipe(
    S.encodeKeys({
      ResourceArn: "resourceArn",
      ResourceType: "resourceType",
      ScanId: "scanId",
      ScanStatus: "scanStatus",
      ScanResultStatus: "scanResultStatus",
      ScanType: "scanType",
      ScanStartedAt: "scanStartedAt",
      ScanCompletedAt: "scanCompletedAt",
    }),
  ),
).annotate({ identifier: "MalwareScan" }) as any as S.Schema<MalwareScan>;
export type MalwareScans = MalwareScan[];
export const MalwareScans = /*@__PURE__*/ S.Array(MalwareScan);
export interface ListMalwareScansResponse {
  Scans: MalwareScan[];
  NextToken?: string;
}
export const ListMalwareScansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Scans: S.optional(MalwareScans),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Scans: "scans", NextToken: "nextToken" })),
).annotate({
  identifier: "ListMalwareScansResponse",
}) as any as S.Schema<ListMalwareScansResponse>;
export interface ListMembersRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
  OnlyAssociated?: string;
}
export const ListMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    OnlyAssociated: S.optional(S.String).pipe(T.HttpQuery("onlyAssociated")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/member" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMembersRequest",
}) as any as S.Schema<ListMembersRequest>;
export interface ListMembersResponse {
  Members?: (Member & {
    AccountId: AccountId;
    MasterId: string;
    Email: Email;
    RelationshipStatus: string;
    UpdatedAt: string;
  })[];
  NextToken?: string;
}
export const ListMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Members: S.optional(Members),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Members: "members", NextToken: "nextToken" })),
).annotate({
  identifier: "ListMembersResponse",
}) as any as S.Schema<ListMembersResponse>;
export interface ListOrganizationAdminAccountsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListOrganizationAdminAccountsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/admin" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListOrganizationAdminAccountsRequest",
}) as any as S.Schema<ListOrganizationAdminAccountsRequest>;
export type AdminStatus = "ENABLED" | "DISABLE_IN_PROGRESS" | (string & {});
export const AdminStatus = S.String;

export interface AdminAccount {
  AdminAccountId?: string;
  AdminStatus?: AdminStatus;
}
export const AdminAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdminAccountId: S.optional(S.String),
    AdminStatus: S.optional(AdminStatus),
  }).pipe(
    S.encodeKeys({
      AdminAccountId: "adminAccountId",
      AdminStatus: "adminStatus",
    }),
  ),
).annotate({ identifier: "AdminAccount" }) as any as S.Schema<AdminAccount>;
export type AdminAccounts = AdminAccount[];
export const AdminAccounts = /*@__PURE__*/ S.Array(AdminAccount);
export interface ListOrganizationAdminAccountsResponse {
  AdminAccounts?: AdminAccount[];
  NextToken?: string;
}
export const ListOrganizationAdminAccountsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AdminAccounts: S.optional(AdminAccounts),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({ AdminAccounts: "adminAccounts", NextToken: "nextToken" }),
    ),
).annotate({
  identifier: "ListOrganizationAdminAccountsResponse",
}) as any as S.Schema<ListOrganizationAdminAccountsResponse>;
export interface ListPublishingDestinationsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPublishingDestinationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/detector/{DetectorId}/publishingDestination",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPublishingDestinationsRequest",
}) as any as S.Schema<ListPublishingDestinationsRequest>;
export interface Destination {
  DestinationId?: string;
  DestinationType?: DestinationType;
  Status?: PublishingStatus;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationId: S.optional(S.String),
    DestinationType: S.optional(DestinationType),
    Status: S.optional(PublishingStatus),
  }).pipe(
    S.encodeKeys({
      DestinationId: "destinationId",
      DestinationType: "destinationType",
      Status: "status",
    }),
  ),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type Destinations = Destination[];
export const Destinations = /*@__PURE__*/ S.Array(Destination);
export interface ListPublishingDestinationsResponse {
  Destinations: (Destination & {
    DestinationId: string;
    DestinationType: DestinationType;
    Status: PublishingStatus;
  })[];
  NextToken?: string;
}
export const ListPublishingDestinationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(Destinations),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Destinations: "destinations", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListPublishingDestinationsResponse",
}) as any as S.Schema<ListPublishingDestinationsResponse>;
export type GuardDutyArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListThreatEntitySetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListThreatEntitySetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/threatentityset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThreatEntitySetsRequest",
}) as any as S.Schema<ListThreatEntitySetsRequest>;
export type ThreatEntitySetIds = string[];
export const ThreatEntitySetIds = /*@__PURE__*/ S.Array(S.String);
export interface ListThreatEntitySetsResponse {
  ThreatEntitySetIds: string[];
  NextToken?: string;
}
export const ListThreatEntitySetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThreatEntitySetIds: S.optional(ThreatEntitySetIds),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ThreatEntitySetIds: "threatEntitySetIds",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListThreatEntitySetsResponse",
}) as any as S.Schema<ListThreatEntitySetsResponse>;
export interface ListThreatIntelSetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListThreatIntelSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/threatintelset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThreatIntelSetsRequest",
}) as any as S.Schema<ListThreatIntelSetsRequest>;
export type ThreatIntelSetIds = string[];
export const ThreatIntelSetIds = /*@__PURE__*/ S.Array(S.String);
export interface ListThreatIntelSetsResponse {
  ThreatIntelSetIds: string[];
  NextToken?: string;
}
export const ListThreatIntelSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThreatIntelSetIds: S.optional(ThreatIntelSetIds),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ThreatIntelSetIds: "threatIntelSetIds",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListThreatIntelSetsResponse",
}) as any as S.Schema<ListThreatIntelSetsResponse>;
export interface ListTrustedEntitySetsRequest {
  DetectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTrustedEntitySetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/detector/{DetectorId}/trustedentityset" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTrustedEntitySetsRequest",
}) as any as S.Schema<ListTrustedEntitySetsRequest>;
export type TrustedEntitySetIds = string[];
export const TrustedEntitySetIds = /*@__PURE__*/ S.Array(S.String);
export interface ListTrustedEntitySetsResponse {
  TrustedEntitySetIds: string[];
  NextToken?: string;
}
export const ListTrustedEntitySetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrustedEntitySetIds: S.optional(TrustedEntitySetIds),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      TrustedEntitySetIds: "trustedEntitySetIds",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListTrustedEntitySetsResponse",
}) as any as S.Schema<ListTrustedEntitySetsResponse>;
export interface S3ObjectForSendObjectMalwareScan {
  Bucket?: string;
  Key?: string;
  VersionId?: string;
}
export const S3ObjectForSendObjectMalwareScan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Key: S.optional(S.String),
    VersionId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Bucket: "bucket", Key: "key", VersionId: "versionId" }),
  ),
).annotate({
  identifier: "S3ObjectForSendObjectMalwareScan",
}) as any as S.Schema<S3ObjectForSendObjectMalwareScan>;
export interface SendObjectMalwareScanRequest {
  S3Object?: S3ObjectForSendObjectMalwareScan;
}
export const SendObjectMalwareScanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Object: S.optional(S3ObjectForSendObjectMalwareScan) })
    .pipe(S.encodeKeys({ S3Object: "s3Object" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/object-malware-scan/send" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "SendObjectMalwareScanRequest",
}) as any as S.Schema<SendObjectMalwareScanRequest>;
export interface SendObjectMalwareScanResponse {}
export const SendObjectMalwareScanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendObjectMalwareScanResponse",
}) as any as S.Schema<SendObjectMalwareScanResponse>;
export type ResourceArn = string;
export interface ContinuousScanDetails {
  StartTime?: Date;
  EndTime: Date;
}
export const ContinuousScanDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(S.encodeKeys({ StartTime: "startTime", EndTime: "endTime" })),
).annotate({
  identifier: "ContinuousScanDetails",
}) as any as S.Schema<ContinuousScanDetails>;
export interface RecoveryPoint {
  BackupVaultName?: string;
  ContinuousScanDetails?: ContinuousScanDetails;
}
export const RecoveryPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackupVaultName: S.optional(S.String),
    ContinuousScanDetails: S.optional(ContinuousScanDetails),
  }).pipe(
    S.encodeKeys({
      BackupVaultName: "backupVaultName",
      ContinuousScanDetails: "continuousScanDetails",
    }),
  ),
).annotate({ identifier: "RecoveryPoint" }) as any as S.Schema<RecoveryPoint>;
export interface StartMalwareScanConfiguration {
  Role?: string;
  IncrementalScanDetails?: IncrementalScanDetails;
  RecoveryPoint?: RecoveryPoint;
}
export const StartMalwareScanConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Role: S.optional(S.String),
    IncrementalScanDetails: S.optional(IncrementalScanDetails),
    RecoveryPoint: S.optional(RecoveryPoint),
  }).pipe(
    S.encodeKeys({
      Role: "role",
      IncrementalScanDetails: "incrementalScanDetails",
      RecoveryPoint: "recoveryPoint",
    }),
  ),
).annotate({
  identifier: "StartMalwareScanConfiguration",
}) as any as S.Schema<StartMalwareScanConfiguration>;
export interface StartMalwareScanRequest {
  ResourceArn?: string;
  ClientToken?: string;
  ScanConfiguration?: StartMalwareScanConfiguration;
}
export const StartMalwareScanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ScanConfiguration: S.optional(StartMalwareScanConfiguration),
  })
    .pipe(
      S.encodeKeys({
        ResourceArn: "resourceArn",
        ClientToken: "clientToken",
        ScanConfiguration: "scanConfiguration",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/malware-scan/start" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMalwareScanRequest",
}) as any as S.Schema<StartMalwareScanRequest>;
export interface StartMalwareScanResponse {
  ScanId?: string;
}
export const StartMalwareScanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScanId: S.optional(S.String) }).pipe(
    S.encodeKeys({ ScanId: "scanId" }),
  ),
).annotate({
  identifier: "StartMalwareScanResponse",
}) as any as S.Schema<StartMalwareScanResponse>;
export interface StartMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export const StartMonitoringMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/start" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMonitoringMembersRequest",
}) as any as S.Schema<StartMonitoringMembersRequest>;
export interface StartMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const StartMonitoringMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "StartMonitoringMembersResponse",
}) as any as S.Schema<StartMonitoringMembersResponse>;
export interface StopMonitoringMembersRequest {
  DetectorId: string;
  AccountIds?: string[];
}
export const StopMonitoringMembersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
  })
    .pipe(S.encodeKeys({ AccountIds: "accountIds" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}/member/stop" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StopMonitoringMembersRequest",
}) as any as S.Schema<StopMonitoringMembersRequest>;
export interface StopMonitoringMembersResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const StopMonitoringMembersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "StopMonitoringMembersResponse",
}) as any as S.Schema<StopMonitoringMembersResponse>;
export interface TagResourceRequest {
  ResourceArn?: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String).pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export interface UnarchiveFindingsRequest {
  DetectorId: string;
  FindingIds?: string[];
}
export const UnarchiveFindingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingIds: S.optional(FindingIds),
  })
    .pipe(S.encodeKeys({ FindingIds: "findingIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/findings/unarchive",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UnarchiveFindingsRequest",
}) as any as S.Schema<UnarchiveFindingsRequest>;
export interface UnarchiveFindingsResponse {}
export const UnarchiveFindingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UnarchiveFindingsResponse",
}) as any as S.Schema<UnarchiveFindingsResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(TagKeyList).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateDetectorRequest {
  DetectorId: string;
  Enable?: boolean;
  FindingPublishingFrequency?: FindingPublishingFrequency;
  DataSources?: DataSourceConfigurations;
  Features?: DetectorFeatureConfiguration[];
}
export const UpdateDetectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    Enable: S.optional(S.Boolean),
    FindingPublishingFrequency: S.optional(FindingPublishingFrequency),
    DataSources: S.optional(DataSourceConfigurations),
    Features: S.optional(DetectorFeatureConfigurations),
  })
    .pipe(
      S.encodeKeys({
        Enable: "enable",
        FindingPublishingFrequency: "findingPublishingFrequency",
        DataSources: "dataSources",
        Features: "features",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/detector/{DetectorId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateDetectorRequest",
}) as any as S.Schema<UpdateDetectorRequest>;
export interface UpdateDetectorResponse {}
export const UpdateDetectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDetectorResponse",
}) as any as S.Schema<UpdateDetectorResponse>;
export interface UpdateFilterRequest {
  DetectorId: string;
  FilterName: string;
  Description?: string;
  Action?: FilterAction;
  Rank?: number;
  FindingCriteria?: FindingCriteria;
}
export const UpdateFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FilterName: S.String.pipe(T.HttpLabel("FilterName")),
    Description: S.optional(S.String),
    Action: S.optional(FilterAction),
    Rank: S.optional(S.Number),
    FindingCriteria: S.optional(FindingCriteria),
  })
    .pipe(
      S.encodeKeys({
        Description: "description",
        Action: "action",
        Rank: "rank",
        FindingCriteria: "findingCriteria",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/filter/{FilterName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFilterRequest",
}) as any as S.Schema<UpdateFilterRequest>;
export interface UpdateFilterResponse {
  Name: string;
}
export const UpdateFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(S.encodeKeys({ Name: "name" })),
).annotate({
  identifier: "UpdateFilterResponse",
}) as any as S.Schema<UpdateFilterResponse>;
export type Feedback = "USEFUL" | "NOT_USEFUL" | (string & {});
export const Feedback = S.String;

export interface UpdateFindingsFeedbackRequest {
  DetectorId: string;
  FindingIds?: string[];
  Feedback?: Feedback;
  Comments?: string | redacted.Redacted<string>;
}
export const UpdateFindingsFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    FindingIds: S.optional(FindingIds),
    Feedback: S.optional(Feedback),
    Comments: S.optional(SensitiveString),
  })
    .pipe(
      S.encodeKeys({
        FindingIds: "findingIds",
        Feedback: "feedback",
        Comments: "comments",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/findings/feedback",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateFindingsFeedbackRequest",
}) as any as S.Schema<UpdateFindingsFeedbackRequest>;
export interface UpdateFindingsFeedbackResponse {}
export const UpdateFindingsFeedbackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateFindingsFeedbackResponse",
}) as any as S.Schema<UpdateFindingsFeedbackResponse>;
export interface UpdateIPSetRequest {
  DetectorId: string;
  IpSetId?: string;
  Name?: string;
  Location?: string;
  Activate?: boolean;
  ExpectedBucketOwner?: string;
}
export const UpdateIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    IpSetId: S.optional(S.String).pipe(T.HttpLabel("IpSetId")),
    Name: S.optional(S.String),
    Location: S.optional(S.String),
    Activate: S.optional(S.Boolean),
    ExpectedBucketOwner: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Location: "location",
        Activate: "activate",
        ExpectedBucketOwner: "expectedBucketOwner",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/ipset/{IpSetId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateIPSetRequest",
}) as any as S.Schema<UpdateIPSetRequest>;
export interface UpdateIPSetResponse {}
export const UpdateIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIPSetResponse",
}) as any as S.Schema<UpdateIPSetResponse>;
export interface UpdateS3BucketResource {
  ObjectPrefixes?: string[];
}
export const UpdateS3BucketResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectPrefixes: S.optional(MalwareProtectionPlanObjectPrefixesList),
  }).pipe(S.encodeKeys({ ObjectPrefixes: "objectPrefixes" })),
).annotate({
  identifier: "UpdateS3BucketResource",
}) as any as S.Schema<UpdateS3BucketResource>;
export interface UpdateProtectedResource {
  S3Bucket?: UpdateS3BucketResource;
}
export const UpdateProtectedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.optional(UpdateS3BucketResource) }).pipe(
    S.encodeKeys({ S3Bucket: "s3Bucket" }),
  ),
).annotate({
  identifier: "UpdateProtectedResource",
}) as any as S.Schema<UpdateProtectedResource>;
export interface UpdateMalwareProtectionPlanRequest {
  MalwareProtectionPlanId: string;
  Role?: string;
  Actions?: MalwareProtectionPlanActions;
  ProtectedResource?: UpdateProtectedResource;
}
export const UpdateMalwareProtectionPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MalwareProtectionPlanId: S.String.pipe(
      T.HttpLabel("MalwareProtectionPlanId"),
    ),
    Role: S.optional(S.String),
    Actions: S.optional(MalwareProtectionPlanActions),
    ProtectedResource: S.optional(UpdateProtectedResource),
  })
    .pipe(
      S.encodeKeys({
        Role: "role",
        Actions: "actions",
        ProtectedResource: "protectedResource",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/malware-protection-plan/{MalwareProtectionPlanId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMalwareProtectionPlanRequest",
}) as any as S.Schema<UpdateMalwareProtectionPlanRequest>;
export interface UpdateMalwareProtectionPlanResponse {}
export const UpdateMalwareProtectionPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMalwareProtectionPlanResponse",
}) as any as S.Schema<UpdateMalwareProtectionPlanResponse>;
export interface UpdateMalwareScanSettingsRequest {
  DetectorId: string;
  ScanResourceCriteria?: ScanResourceCriteria;
  EbsSnapshotPreservation?: EbsSnapshotPreservation;
}
export const UpdateMalwareScanSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ScanResourceCriteria: S.optional(ScanResourceCriteria),
    EbsSnapshotPreservation: S.optional(EbsSnapshotPreservation),
  })
    .pipe(
      S.encodeKeys({
        ScanResourceCriteria: "scanResourceCriteria",
        EbsSnapshotPreservation: "ebsSnapshotPreservation",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/malware-scan-settings",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMalwareScanSettingsRequest",
}) as any as S.Schema<UpdateMalwareScanSettingsRequest>;
export interface UpdateMalwareScanSettingsResponse {}
export const UpdateMalwareScanSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateMalwareScanSettingsResponse",
}) as any as S.Schema<UpdateMalwareScanSettingsResponse>;
export interface MemberAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration;
  Status?: FeatureStatus;
}
export const MemberAdditionalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeatureAdditionalConfiguration),
    Status: S.optional(FeatureStatus),
  }).pipe(S.encodeKeys({ Name: "name", Status: "status" })),
).annotate({
  identifier: "MemberAdditionalConfiguration",
}) as any as S.Schema<MemberAdditionalConfiguration>;
export type MemberAdditionalConfigurations = MemberAdditionalConfiguration[];
export const MemberAdditionalConfigurations = /*@__PURE__*/ S.Array(
  MemberAdditionalConfiguration,
);
export interface MemberFeaturesConfiguration {
  Name?: OrgFeature;
  Status?: FeatureStatus;
  AdditionalConfiguration?: MemberAdditionalConfiguration[];
}
export const MemberFeaturesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeature),
    Status: S.optional(FeatureStatus),
    AdditionalConfiguration: S.optional(MemberAdditionalConfigurations),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      Status: "status",
      AdditionalConfiguration: "additionalConfiguration",
    }),
  ),
).annotate({
  identifier: "MemberFeaturesConfiguration",
}) as any as S.Schema<MemberFeaturesConfiguration>;
export type MemberFeaturesConfigurations = MemberFeaturesConfiguration[];
export const MemberFeaturesConfigurations = /*@__PURE__*/ S.Array(
  MemberFeaturesConfiguration,
);
export interface UpdateMemberDetectorsRequest {
  DetectorId: string;
  AccountIds?: string[];
  DataSources?: DataSourceConfigurations;
  Features?: MemberFeaturesConfiguration[];
}
export const UpdateMemberDetectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    AccountIds: S.optional(AccountIds),
    DataSources: S.optional(DataSourceConfigurations),
    Features: S.optional(MemberFeaturesConfigurations),
  })
    .pipe(
      S.encodeKeys({
        AccountIds: "accountIds",
        DataSources: "dataSources",
        Features: "features",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/member/detector/update",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMemberDetectorsRequest",
}) as any as S.Schema<UpdateMemberDetectorsRequest>;
export interface UpdateMemberDetectorsResponse {
  UnprocessedAccounts: (UnprocessedAccount & {
    AccountId: AccountId;
    Result: string;
  })[];
}
export const UpdateMemberDetectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnprocessedAccounts: S.optional(UnprocessedAccounts) }).pipe(
    S.encodeKeys({ UnprocessedAccounts: "unprocessedAccounts" }),
  ),
).annotate({
  identifier: "UpdateMemberDetectorsResponse",
}) as any as S.Schema<UpdateMemberDetectorsResponse>;
export interface OrganizationS3LogsConfiguration {
  AutoEnable?: boolean;
}
export const OrganizationS3LogsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ AutoEnable: "autoEnable" }),
  ),
).annotate({
  identifier: "OrganizationS3LogsConfiguration",
}) as any as S.Schema<OrganizationS3LogsConfiguration>;
export interface OrganizationKubernetesAuditLogsConfiguration {
  AutoEnable?: boolean;
}
export const OrganizationKubernetesAuditLogsConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
      S.encodeKeys({ AutoEnable: "autoEnable" }),
    ),
  ).annotate({
    identifier: "OrganizationKubernetesAuditLogsConfiguration",
  }) as any as S.Schema<OrganizationKubernetesAuditLogsConfiguration>;
export interface OrganizationKubernetesConfiguration {
  AuditLogs?: OrganizationKubernetesAuditLogsConfiguration;
}
export const OrganizationKubernetesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuditLogs: S.optional(OrganizationKubernetesAuditLogsConfiguration),
  }).pipe(S.encodeKeys({ AuditLogs: "auditLogs" })),
).annotate({
  identifier: "OrganizationKubernetesConfiguration",
}) as any as S.Schema<OrganizationKubernetesConfiguration>;
export interface OrganizationEbsVolumes {
  AutoEnable?: boolean;
}
export const OrganizationEbsVolumes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutoEnable: S.optional(S.Boolean) }).pipe(
    S.encodeKeys({ AutoEnable: "autoEnable" }),
  ),
).annotate({
  identifier: "OrganizationEbsVolumes",
}) as any as S.Schema<OrganizationEbsVolumes>;
export interface OrganizationScanEc2InstanceWithFindings {
  EbsVolumes?: OrganizationEbsVolumes;
}
export const OrganizationScanEc2InstanceWithFindings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ EbsVolumes: S.optional(OrganizationEbsVolumes) }).pipe(
      S.encodeKeys({ EbsVolumes: "ebsVolumes" }),
    ),
).annotate({
  identifier: "OrganizationScanEc2InstanceWithFindings",
}) as any as S.Schema<OrganizationScanEc2InstanceWithFindings>;
export interface OrganizationMalwareProtectionConfiguration {
  ScanEc2InstanceWithFindings?: OrganizationScanEc2InstanceWithFindings;
}
export const OrganizationMalwareProtectionConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ScanEc2InstanceWithFindings: S.optional(
        OrganizationScanEc2InstanceWithFindings,
      ),
    }).pipe(
      S.encodeKeys({
        ScanEc2InstanceWithFindings: "scanEc2InstanceWithFindings",
      }),
    ),
  ).annotate({
    identifier: "OrganizationMalwareProtectionConfiguration",
  }) as any as S.Schema<OrganizationMalwareProtectionConfiguration>;
export interface OrganizationDataSourceConfigurations {
  S3Logs?: OrganizationS3LogsConfiguration;
  Kubernetes?: OrganizationKubernetesConfiguration;
  MalwareProtection?: OrganizationMalwareProtectionConfiguration;
}
export const OrganizationDataSourceConfigurations = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      S3Logs: S.optional(OrganizationS3LogsConfiguration),
      Kubernetes: S.optional(OrganizationKubernetesConfiguration),
      MalwareProtection: S.optional(OrganizationMalwareProtectionConfiguration),
    }).pipe(
      S.encodeKeys({
        S3Logs: "s3Logs",
        Kubernetes: "kubernetes",
        MalwareProtection: "malwareProtection",
      }),
    ),
).annotate({
  identifier: "OrganizationDataSourceConfigurations",
}) as any as S.Schema<OrganizationDataSourceConfigurations>;
export interface OrganizationAdditionalConfiguration {
  Name?: OrgFeatureAdditionalConfiguration;
  AutoEnable?: OrgFeatureStatus;
}
export const OrganizationAdditionalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeatureAdditionalConfiguration),
    AutoEnable: S.optional(OrgFeatureStatus),
  }).pipe(S.encodeKeys({ Name: "name", AutoEnable: "autoEnable" })),
).annotate({
  identifier: "OrganizationAdditionalConfiguration",
}) as any as S.Schema<OrganizationAdditionalConfiguration>;
export type OrganizationAdditionalConfigurations =
  OrganizationAdditionalConfiguration[];
export const OrganizationAdditionalConfigurations = /*@__PURE__*/ S.Array(
  OrganizationAdditionalConfiguration,
);
export interface OrganizationFeatureConfiguration {
  Name?: OrgFeature;
  AutoEnable?: OrgFeatureStatus;
  AdditionalConfiguration?: OrganizationAdditionalConfiguration[];
}
export const OrganizationFeatureConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OrgFeature),
    AutoEnable: S.optional(OrgFeatureStatus),
    AdditionalConfiguration: S.optional(OrganizationAdditionalConfigurations),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      AutoEnable: "autoEnable",
      AdditionalConfiguration: "additionalConfiguration",
    }),
  ),
).annotate({
  identifier: "OrganizationFeatureConfiguration",
}) as any as S.Schema<OrganizationFeatureConfiguration>;
export type OrganizationFeaturesConfigurations =
  OrganizationFeatureConfiguration[];
export const OrganizationFeaturesConfigurations = /*@__PURE__*/ S.Array(
  OrganizationFeatureConfiguration,
);
export interface UpdateOrganizationConfigurationRequest {
  DetectorId: string;
  AutoEnable?: boolean;
  DataSources?: OrganizationDataSourceConfigurations;
  Features?: OrganizationFeatureConfiguration[];
  AutoEnableOrganizationMembers?: AutoEnableMembers;
}
export const UpdateOrganizationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
      AutoEnable: S.optional(S.Boolean),
      DataSources: S.optional(OrganizationDataSourceConfigurations),
      Features: S.optional(OrganizationFeaturesConfigurations),
      AutoEnableOrganizationMembers: S.optional(AutoEnableMembers),
    })
      .pipe(
        S.encodeKeys({
          AutoEnable: "autoEnable",
          DataSources: "dataSources",
          Features: "features",
          AutoEnableOrganizationMembers: "autoEnableOrganizationMembers",
        }),
      )
      .pipe(
        T.all(
          T.Http({ method: "POST", uri: "/detector/{DetectorId}/admin" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "UpdateOrganizationConfigurationRequest",
}) as any as S.Schema<UpdateOrganizationConfigurationRequest>;
export interface UpdateOrganizationConfigurationResponse {}
export const UpdateOrganizationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateOrganizationConfigurationResponse",
}) as any as S.Schema<UpdateOrganizationConfigurationResponse>;
export interface UpdatePublishingDestinationRequest {
  DetectorId: string;
  DestinationId: string;
  DestinationProperties?: DestinationProperties;
}
export const UpdatePublishingDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    DestinationId: S.String.pipe(T.HttpLabel("DestinationId")),
    DestinationProperties: S.optional(DestinationProperties),
  })
    .pipe(S.encodeKeys({ DestinationProperties: "destinationProperties" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/publishingDestination/{DestinationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePublishingDestinationRequest",
}) as any as S.Schema<UpdatePublishingDestinationRequest>;
export interface UpdatePublishingDestinationResponse {}
export const UpdatePublishingDestinationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePublishingDestinationResponse",
}) as any as S.Schema<UpdatePublishingDestinationResponse>;
export interface UpdateThreatEntitySetRequest {
  DetectorId: string;
  ThreatEntitySetId?: string;
  Name?: string;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
}
export const UpdateThreatEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ThreatEntitySetId: S.optional(S.String).pipe(
      T.HttpLabel("ThreatEntitySetId"),
    ),
    Name: S.optional(S.String),
    Location: S.optional(S.String),
    ExpectedBucketOwner: S.optional(S.String),
    Activate: S.optional(S.Boolean),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Location: "location",
        ExpectedBucketOwner: "expectedBucketOwner",
        Activate: "activate",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/threatentityset/{ThreatEntitySetId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateThreatEntitySetRequest",
}) as any as S.Schema<UpdateThreatEntitySetRequest>;
export interface UpdateThreatEntitySetResponse {}
export const UpdateThreatEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateThreatEntitySetResponse",
}) as any as S.Schema<UpdateThreatEntitySetResponse>;
export interface UpdateThreatIntelSetRequest {
  DetectorId: string;
  ThreatIntelSetId: string;
  Name?: string;
  Location?: string;
  Activate?: boolean;
  ExpectedBucketOwner?: string;
}
export const UpdateThreatIntelSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    ThreatIntelSetId: S.String.pipe(T.HttpLabel("ThreatIntelSetId")),
    Name: S.optional(S.String),
    Location: S.optional(S.String),
    Activate: S.optional(S.Boolean),
    ExpectedBucketOwner: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Location: "location",
        Activate: "activate",
        ExpectedBucketOwner: "expectedBucketOwner",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/threatintelset/{ThreatIntelSetId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateThreatIntelSetRequest",
}) as any as S.Schema<UpdateThreatIntelSetRequest>;
export interface UpdateThreatIntelSetResponse {}
export const UpdateThreatIntelSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateThreatIntelSetResponse",
}) as any as S.Schema<UpdateThreatIntelSetResponse>;
export interface UpdateTrustedEntitySetRequest {
  DetectorId: string;
  TrustedEntitySetId: string;
  Name?: string;
  Location?: string;
  ExpectedBucketOwner?: string;
  Activate?: boolean;
}
export const UpdateTrustedEntitySetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectorId: S.String.pipe(T.HttpLabel("DetectorId")),
    TrustedEntitySetId: S.String.pipe(T.HttpLabel("TrustedEntitySetId")),
    Name: S.optional(S.String),
    Location: S.optional(S.String),
    ExpectedBucketOwner: S.optional(S.String),
    Activate: S.optional(S.Boolean),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Location: "location",
        ExpectedBucketOwner: "expectedBucketOwner",
        Activate: "activate",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/detector/{DetectorId}/trustedentityset/{TrustedEntitySetId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateTrustedEntitySetRequest",
}) as any as S.Schema<UpdateTrustedEntitySetRequest>;
export interface UpdateTrustedEntitySetResponse {}
export const UpdateTrustedEntitySetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTrustedEntitySetResponse",
}) as any as S.Schema<UpdateTrustedEntitySetResponse>;
export type AcceptAdministratorInvitationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Accepts the invitation to be a member account and get monitored by a GuardDuty administrator account that sent the invitation.
 */
export const acceptAdministratorInvitation: API.OperationMethod<
  AcceptAdministratorInvitationRequest,
  AcceptAdministratorInvitationResponse,
  AcceptAdministratorInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptAdministratorInvitationRequest,
  output: AcceptAdministratorInvitationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAdministratorInvitation",
}));

export type AcceptInvitationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Accepts the invitation to be monitored by a GuardDuty administrator account.
 */
export const acceptInvitation: API.OperationMethod<
  AcceptInvitationRequest,
  AcceptInvitationResponse,
  AcceptInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptInvitationRequest,
  output: AcceptInvitationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInvitation",
}));

export type ArchiveFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Archives GuardDuty findings that are specified by the list of finding IDs.
 *
 * Only the administrator account can archive findings. Member accounts don't have permission to archive findings from their accounts.
 */
export const archiveFindings: API.OperationMethod<
  ArchiveFindingsRequest,
  ArchiveFindingsResponse,
  ArchiveFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ArchiveFindingsRequest,
  output: ArchiveFindingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ArchiveFindings",
}));

export type CreateDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a single GuardDuty detector. A detector is a resource that represents the GuardDuty service. To start using GuardDuty, you must create a detector in each Region where you enable the service. You can have only one detector per account per Region. All data sources are enabled in a new detector by default.
 *
 * - When you don't specify any `features`, with an exception to `RUNTIME_MONITORING`, all the optional features are enabled by default.
 *
 * - When you specify some of the `features`, any feature that is not specified in the API call gets enabled by default, with an exception to `RUNTIME_MONITORING`.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const createDetector: API.OperationMethod<
  CreateDetectorRequest,
  CreateDetectorResponse,
  CreateDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDetectorRequest,
  output: CreateDetectorResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDetector",
}));

export type CreateFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a filter using the specified finding criteria. The maximum number of saved filters per Amazon Web Services account per Region is 100. For more information, see Quotas for GuardDuty.
 */
export const createFilter: API.OperationMethod<
  CreateFilterRequest,
  CreateFilterResponse,
  CreateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFilterRequest,
  output: CreateFilterResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFilter",
}));

export type CreateInvestigationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * This API is currently available as a preview. During the preview, you can initiate up to 10 investigations per account per day, with a total limit of 100 investigations per account. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Initiates a GuardDuty investigation that automatically analyzes security findings, correlates related activity, performs account-level analysis, and produces a structured investigation summary with recommended next steps.
 *
 * Only the administrator account can create an investigation. Member accounts don't have permission to create investigations from their accounts.
 *
 * To use this operation, the `AI_ANALYST` feature must be enabled on your detector.
 *
 * This feature uses Amazon Bedrock models that leverage Cross-Region Inference (CRIS), which automatically selects the optimal Amazon Web Services Region within your geography to process the investigation analysis and generate the investigation report. This maximizes available compute resources, model availability, and delivers the best customer experience. Your data remains stored only in the Region where the investigation request originates, however, investigation data and summary results may be processed outside that Region. All data is transmitted encrypted across Amazon's secure network. For more information, see GuardDuty Investigation.
 */
export const createInvestigation: API.OperationMethod<
  CreateInvestigationRequest,
  CreateInvestigationResponse,
  CreateInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInvestigationRequest,
  output: CreateInvestigationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvestigation",
}));

export type CreateIPSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new IPSet, which is called a trusted IP list in the console user interface. An IPSet is a list of IP addresses that are trusted for secure communication with Amazon Web Services infrastructure and applications. GuardDuty doesn't generate findings for IP addresses that are included in IPSets. Only users from the administrator account can use this operation.
 */
export const createIPSet: API.OperationMethod<
  CreateIPSetRequest,
  CreateIPSetResponse,
  CreateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIPSetRequest,
  output: CreateIPSetResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
}));

export type CreateMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new Malware Protection plan for the protected resource.
 *
 * When you create a Malware Protection plan, the Amazon Web Services service terms for GuardDuty Malware Protection apply. For more information, see Amazon Web Services service terms for GuardDuty Malware Protection.
 */
export const createMalwareProtectionPlan: API.OperationMethod<
  CreateMalwareProtectionPlanRequest,
  CreateMalwareProtectionPlanResponse,
  CreateMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMalwareProtectionPlanRequest,
  output: CreateMalwareProtectionPlanResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMalwareProtectionPlan",
}));

export type CreateMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates member accounts of the current Amazon Web Services account by specifying a list of Amazon Web Services account IDs. This step is a prerequisite for managing the associated member accounts either by invitation or through an organization.
 *
 * As a delegated administrator, using `CreateMembers` will enable GuardDuty in the added member accounts, with the exception of the organization delegated administrator account. A delegated administrator must enable GuardDuty prior to being added as a member.
 *
 * When you use CreateMembers as an Organizations delegated administrator, GuardDuty applies your organization's auto-enable settings to the member accounts in this request, irrespective of the accounts being new or existing members. For more information about the existing auto-enable settings for your organization, see DescribeOrganizationConfiguration.
 *
 * If you disassociate a member account that was added by invitation, the member account details obtained from this API, including the associated email addresses, will be retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * When the member accounts added through Organizations are later disassociated, you (administrator) can't invite them by calling the InviteMembers API. You can create an association with these member accounts again only by calling the CreateMembers API.
 */
export const createMembers: API.OperationMethod<
  CreateMembersRequest,
  CreateMembersResponse,
  CreateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMembersRequest,
  output: CreateMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMembers",
}));

export type CreatePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a publishing destination where you can export your GuardDuty findings. Before you start exporting the findings, the destination resource must exist.
 */
export const createPublishingDestination: API.OperationMethod<
  CreatePublishingDestinationRequest,
  CreatePublishingDestinationResponse,
  CreatePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePublishingDestinationRequest,
  output: CreatePublishingDestinationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePublishingDestination",
}));

export type CreateSampleFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Generates sample findings of types specified by the list of finding types. If 'NULL' is specified for `findingTypes`, the API generates sample findings of all supported finding types.
 */
export const createSampleFindings: API.OperationMethod<
  CreateSampleFindingsRequest,
  CreateSampleFindingsResponse,
  CreateSampleFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSampleFindingsRequest,
  output: CreateSampleFindingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSampleFindings",
}));

export type CreateThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new threat entity set. In a threat entity set, you can provide known malicious threat entities for your Amazon Web Services environment. GuardDuty generates findings based on the entries in the threat entity sets. Only users of the administrator account can manage entity sets, which automatically apply to member accounts.
 */
export const createThreatEntitySet: API.OperationMethod<
  CreateThreatEntitySetRequest,
  CreateThreatEntitySetResponse,
  CreateThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThreatEntitySetRequest,
  output: CreateThreatEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatEntitySet",
}));

export type CreateThreatIntelSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new ThreatIntelSet. ThreatIntelSets consist of known malicious IP addresses. GuardDuty generates findings based on ThreatIntelSets. Only users of the administrator account can use this operation.
 */
export const createThreatIntelSet: API.OperationMethod<
  CreateThreatIntelSetRequest,
  CreateThreatIntelSetResponse,
  CreateThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThreatIntelSetRequest,
  output: CreateThreatIntelSetResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThreatIntelSet",
}));

export type CreateTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Creates a new trusted entity set. In the trusted entity set, you can provide IP addresses and domains that you believe are secure for communication in your Amazon Web Services environment. GuardDuty will not generate findings for the entries that are specified in a trusted entity set. At any given time, you can have only one trusted entity set.
 *
 * Only users of the administrator account can manage the entity sets, which automatically apply to member accounts.
 */
export const createTrustedEntitySet: API.OperationMethod<
  CreateTrustedEntitySetRequest,
  CreateTrustedEntitySetResponse,
  CreateTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrustedEntitySetRequest,
  output: CreateTrustedEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrustedEntitySet",
}));

export type DeclineInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Declines invitations sent to the current member account by Amazon Web Services accounts specified by their account IDs.
 */
export const declineInvitations: API.OperationMethod<
  DeclineInvitationsRequest,
  DeclineInvitationsResponse,
  DeclineInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeclineInvitationsRequest,
  output: DeclineInvitationsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineInvitations",
}));

export type DeleteDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes an Amazon GuardDuty detector that is specified by the detector ID.
 */
export const deleteDetector: API.OperationMethod<
  DeleteDetectorRequest,
  DeleteDetectorResponse,
  DeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDetectorRequest,
  output: DeleteDetectorResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetector",
}));

export type DeleteFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the filter specified by the filter name.
 */
export const deleteFilter: API.OperationMethod<
  DeleteFilterRequest,
  DeleteFilterResponse,
  DeleteFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFilterRequest,
  output: DeleteFilterResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFilter",
}));

export type DeleteInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes invitations sent to the current member account by Amazon Web Services accounts specified by their account IDs.
 */
export const deleteInvitations: API.OperationMethod<
  DeleteInvitationsRequest,
  DeleteInvitationsResponse,
  DeleteInvitationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInvitationsRequest,
  output: DeleteInvitationsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvitations",
}));

export type DeleteIPSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the IPSet specified by the `ipSetId`. IPSets are called trusted IP lists in the console user interface.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIPSetRequest,
  output: DeleteIPSetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
}));

export type DeleteMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the Malware Protection plan ID associated with the Malware Protection plan resource. Use this API only when you no longer want to protect the resource associated with this Malware Protection plan ID.
 */
export const deleteMalwareProtectionPlan: API.OperationMethod<
  DeleteMalwareProtectionPlanRequest,
  DeleteMalwareProtectionPlanResponse,
  DeleteMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMalwareProtectionPlanRequest,
  output: DeleteMalwareProtectionPlanResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMalwareProtectionPlan",
}));

export type DeleteMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes GuardDuty member accounts (to the current GuardDuty administrator account) specified by the account IDs.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disable GuardDuty for a member account in your organization.
 */
export const deleteMembers: API.OperationMethod<
  DeleteMembersRequest,
  DeleteMembersResponse,
  DeleteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMembersRequest,
  output: DeleteMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMembers",
}));

export type DeletePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the publishing definition with the specified `destinationId`.
 */
export const deletePublishingDestination: API.OperationMethod<
  DeletePublishingDestinationRequest,
  DeletePublishingDestinationResponse,
  DeletePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePublishingDestinationRequest,
  output: DeletePublishingDestinationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublishingDestination",
}));

export type DeleteThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the threat entity set that is associated with the specified `threatEntitySetId`.
 */
export const deleteThreatEntitySet: API.OperationMethod<
  DeleteThreatEntitySetRequest,
  DeleteThreatEntitySetResponse,
  DeleteThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThreatEntitySetRequest,
  output: DeleteThreatEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatEntitySet",
}));

export type DeleteThreatIntelSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the ThreatIntelSet specified by the ThreatIntelSet ID.
 */
export const deleteThreatIntelSet: API.OperationMethod<
  DeleteThreatIntelSetRequest,
  DeleteThreatIntelSetResponse,
  DeleteThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThreatIntelSetRequest,
  output: DeleteThreatIntelSetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThreatIntelSet",
}));

export type DeleteTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Deletes the trusted entity set that is associated with the specified `trustedEntitySetId`.
 */
export const deleteTrustedEntitySet: API.OperationMethod<
  DeleteTrustedEntitySetRequest,
  DeleteTrustedEntitySetResponse,
  DeleteTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrustedEntitySetRequest,
  output: DeleteTrustedEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrustedEntitySet",
}));

export type DescribeMalwareScansError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of malware scans. Each member account can view the malware scans for their own accounts. An administrator can view the malware scans for all the member accounts.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const describeMalwareScans: API.PaginatedOperationMethod<
  DescribeMalwareScansRequest,
  DescribeMalwareScansResponse,
  DescribeMalwareScansError,
  Credentials | HttpClient.HttpClient,
  Scan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMalwareScansRequest,
  output: DescribeMalwareScansResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMalwareScans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scans",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOrganizationConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns information about the account selected as the delegated administrator for GuardDuty.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const describeOrganizationConfiguration: API.PaginatedOperationMethod<
  DescribeOrganizationConfigurationRequest,
  DescribeOrganizationConfigurationResponse,
  DescribeOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOrganizationConfigurationRequest,
  output: DescribeOrganizationConfigurationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns information about the publishing destination specified by the provided `destinationId`.
 */
export const describePublishingDestination: API.OperationMethod<
  DescribePublishingDestinationRequest,
  DescribePublishingDestinationResponse,
  DescribePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePublishingDestinationRequest,
  output: DescribePublishingDestinationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePublishingDestination",
}));

export type DisableOrganizationAdminAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Removes the existing GuardDuty delegated administrator of the organization. Only the organization's management account can run this API operation.
 */
export const disableOrganizationAdminAccount: API.OperationMethod<
  DisableOrganizationAdminAccountRequest,
  DisableOrganizationAdminAccountResponse,
  DisableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableOrganizationAdminAccountRequest,
  output: DisableOrganizationAdminAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableOrganizationAdminAccount",
}));

export type DisassociateFromAdministratorAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the current GuardDuty member account from its administrator account.
 *
 * When you disassociate an invited member from a GuardDuty delegated administrator, the member account details obtained from the CreateMembers API, including the associated email addresses, are retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disable GuardDuty in a member account.
 */
export const disassociateFromAdministratorAccount: API.OperationMethod<
  DisassociateFromAdministratorAccountRequest,
  DisassociateFromAdministratorAccountResponse,
  DisassociateFromAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFromAdministratorAccountRequest,
  output: DisassociateFromAdministratorAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromAdministratorAccount",
}));

export type DisassociateFromMasterAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates the current GuardDuty member account from its administrator account.
 *
 * When you disassociate an invited member from a GuardDuty delegated administrator, the member account details obtained from the CreateMembers API, including the associated email addresses, are retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 */
export const disassociateFromMasterAccount: API.OperationMethod<
  DisassociateFromMasterAccountRequest,
  DisassociateFromMasterAccountResponse,
  DisassociateFromMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFromMasterAccountRequest,
  output: DisassociateFromMasterAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromMasterAccount",
}));

export type DisassociateMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Disassociates GuardDuty member accounts (from the current administrator account) specified by the account IDs.
 *
 * When you disassociate an invited member from a GuardDuty delegated administrator, the member account details obtained from the CreateMembers API, including the associated email addresses, are retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to disassociate a member account before removing them from your organization.
 *
 * If you disassociate a member account that was added by invitation, the member account details obtained from this API, including the associated email addresses, will be retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * When the member accounts added through Organizations are later disassociated, you (administrator) can't invite them by calling the InviteMembers API. You can create an association with these member accounts again only by calling the CreateMembers API.
 */
export const disassociateMembers: API.OperationMethod<
  DisassociateMembersRequest,
  DisassociateMembersResponse,
  DisassociateMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateMembersRequest,
  output: DisassociateMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateMembers",
}));

export type EnableOrganizationAdminAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Designates an Amazon Web Services account within the organization as your GuardDuty delegated administrator. Only the organization's management account can run this API operation.
 */
export const enableOrganizationAdminAccount: API.OperationMethod<
  EnableOrganizationAdminAccountRequest,
  EnableOrganizationAdminAccountResponse,
  EnableOrganizationAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableOrganizationAdminAccountRequest,
  output: EnableOrganizationAdminAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableOrganizationAdminAccount",
}));

export type GetAdministratorAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the details of the GuardDuty administrator account associated with the current GuardDuty member account.
 *
 * Based on the type of account that runs this API, the following list shows how the API behavior varies:
 *
 * - When the GuardDuty administrator account runs this API, it will return success (`HTTP 200`) but no content.
 *
 * - When a member account runs this API, it will return the details of the GuardDuty administrator account that is associated with this calling member account.
 *
 * - When an individual account (not associated with an organization) runs this API, it will return success (`HTTP 200`) but no content.
 */
export const getAdministratorAccount: API.OperationMethod<
  GetAdministratorAccountRequest,
  GetAdministratorAccountResponse,
  GetAdministratorAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAdministratorAccountRequest,
  output: GetAdministratorAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdministratorAccount",
}));

export type GetCoverageStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves aggregated statistics for your account. If you are a GuardDuty administrator, you can retrieve the statistics for all the resources associated with the active member accounts in your organization who have enabled Runtime Monitoring and have the GuardDuty security agent running on their resources.
 */
export const getCoverageStatistics: API.OperationMethod<
  GetCoverageStatisticsRequest,
  GetCoverageStatisticsResponse,
  GetCoverageStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCoverageStatisticsRequest,
  output: GetCoverageStatisticsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCoverageStatistics",
}));

export type GetDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves a GuardDuty detector specified by the detectorId.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getDetector: API.OperationMethod<
  GetDetectorRequest,
  GetDetectorResponse,
  GetDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDetectorRequest,
  output: GetDetectorResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetector",
}));

export type GetFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the details of the filter specified by the filter name.
 */
export const getFilter: API.OperationMethod<
  GetFilterRequest,
  GetFilterResponse,
  GetFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFilterRequest,
  output: GetFilterResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFilter",
}));

export type GetFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describes Amazon GuardDuty findings specified by finding IDs.
 */
export const getFindings: API.OperationMethod<
  GetFindingsRequest,
  GetFindingsResponse,
  GetFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingsRequest,
  output: GetFindingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindings",
}));

export type GetFindingsStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists GuardDuty findings statistics for the specified detector ID.
 *
 * You must provide either `findingStatisticTypes` or `groupBy` parameter, and not both. You can use the `maxResults` and `orderBy` parameters only when using `groupBy`.
 *
 * There might be regional differences because some flags might not be available in all the Regions where GuardDuty is currently supported. For more information, see Regions and endpoints.
 */
export const getFindingsStatistics: API.OperationMethod<
  GetFindingsStatisticsRequest,
  GetFindingsStatisticsResponse,
  GetFindingsStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFindingsStatisticsRequest,
  output: GetFindingsStatisticsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFindingsStatistics",
}));

export type GetInvestigationError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This API is currently available as a preview. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Retrieves the results and status of a specific GuardDuty investigation.
 *
 * An administrator account can retrieve any investigation within the organization. Member accounts can only retrieve investigations that belong to them.
 */
export const getInvestigation: API.OperationMethod<
  GetInvestigationRequest,
  GetInvestigationResponse,
  GetInvestigationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInvestigationRequest,
  output: GetInvestigationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvestigation",
}));

export type GetInvitationsCountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the count of all GuardDuty membership invitations that were sent to the current member account except the currently accepted invitation.
 */
export const getInvitationsCount: API.OperationMethod<
  GetInvitationsCountRequest,
  GetInvitationsCountResponse,
  GetInvitationsCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInvitationsCountRequest,
  output: GetInvitationsCountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvitationsCount",
}));

export type GetIPSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the IPSet specified by the `ipSetId`.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIPSetRequest,
  output: GetIPSetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
}));

export type GetMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the Malware Protection plan details associated with a Malware Protection plan ID.
 */
export const getMalwareProtectionPlan: API.OperationMethod<
  GetMalwareProtectionPlanRequest,
  GetMalwareProtectionPlanResponse,
  GetMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMalwareProtectionPlanRequest,
  output: GetMalwareProtectionPlanResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareProtectionPlan",
}));

export type GetMalwareScanError =
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the detailed information for a specific malware scan. Each member account can view the malware scan details for their own account. An administrator can view malware scan details for all accounts in the organization.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getMalwareScan: API.OperationMethod<
  GetMalwareScanRequest,
  GetMalwareScanResponse,
  GetMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMalwareScanRequest,
  output: GetMalwareScanResponse,
  errors: [
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScan",
}));

export type GetMalwareScanSettingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns the details of the malware scan settings.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getMalwareScanSettings: API.OperationMethod<
  GetMalwareScanSettingsRequest,
  GetMalwareScanSettingsResponse,
  GetMalwareScanSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMalwareScanSettingsRequest,
  output: GetMalwareScanSettingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMalwareScanSettings",
}));

export type GetMasterAccountError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the details for the GuardDuty administrator account associated with the current GuardDuty member account.
 */
export const getMasterAccount: API.OperationMethod<
  GetMasterAccountRequest,
  GetMasterAccountResponse,
  GetMasterAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMasterAccountRequest,
  output: GetMasterAccountResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMasterAccount",
}));

export type GetMemberDetectorsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Describes which data sources are enabled for the member account's detector.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const getMemberDetectors: API.OperationMethod<
  GetMemberDetectorsRequest,
  GetMemberDetectorsResponse,
  GetMemberDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMemberDetectorsRequest,
  output: GetMemberDetectorsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemberDetectors",
}));

export type GetMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves GuardDuty member accounts (of the current GuardDuty administrator account) specified by the account IDs.
 */
export const getMembers: API.OperationMethod<
  GetMembersRequest,
  GetMembersResponse,
  GetMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMembersRequest,
  output: GetMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMembers",
}));

export type GetOrganizationStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves how many active member accounts have each feature enabled within GuardDuty. Only a delegated GuardDuty administrator of an organization can run this API.
 *
 * When you create a new organization, it might take up to 24 hours to generate the statistics for the entire organization.
 */
export const getOrganizationStatistics: API.OperationMethod<
  GetOrganizationStatisticsRequest,
  GetOrganizationStatisticsResponse,
  GetOrganizationStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOrganizationStatisticsRequest,
  output: GetOrganizationStatisticsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationStatistics",
}));

export type GetRemainingFreeTrialDaysError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Provides the number of days left for each data source used in the free trial period.
 */
export const getRemainingFreeTrialDays: API.OperationMethod<
  GetRemainingFreeTrialDaysRequest,
  GetRemainingFreeTrialDaysResponse,
  GetRemainingFreeTrialDaysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRemainingFreeTrialDaysRequest,
  output: GetRemainingFreeTrialDaysResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRemainingFreeTrialDays",
}));

export type GetThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the threat entity set associated with the specified `threatEntitySetId`.
 */
export const getThreatEntitySet: API.OperationMethod<
  GetThreatEntitySetRequest,
  GetThreatEntitySetResponse,
  GetThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThreatEntitySetRequest,
  output: GetThreatEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatEntitySet",
}));

export type GetThreatIntelSetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the ThreatIntelSet that is specified by the ThreatIntelSet ID.
 */
export const getThreatIntelSet: API.OperationMethod<
  GetThreatIntelSetRequest,
  GetThreatIntelSetResponse,
  GetThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThreatIntelSetRequest,
  output: GetThreatIntelSetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThreatIntelSet",
}));

export type GetTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Retrieves the trusted entity set associated with the specified `trustedEntitySetId`.
 */
export const getTrustedEntitySet: API.OperationMethod<
  GetTrustedEntitySetRequest,
  GetTrustedEntitySetResponse,
  GetTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrustedEntitySetRequest,
  output: GetTrustedEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrustedEntitySet",
}));

export type GetUsageStatisticsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists Amazon GuardDuty usage statistics over the last 30 days for the specified detector ID. For newly enabled detectors or data sources, the cost returned will include only the usage so far under 30 days. This may differ from the cost metrics in the console, which project usage over 30 days to provide a monthly cost estimate. For more information, see Understanding How Usage Costs are Calculated.
 */
export const getUsageStatistics: API.PaginatedOperationMethod<
  GetUsageStatisticsRequest,
  GetUsageStatisticsResponse,
  GetUsageStatisticsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUsageStatisticsRequest,
  output: GetUsageStatisticsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type InviteMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Invites Amazon Web Services accounts to become members of an organization administered by the Amazon Web Services account that invokes this API. If you are using Amazon Web Services Organizations to manage your GuardDuty environment, this step is not needed. For more information, see Managing accounts with organizations.
 *
 * To invite Amazon Web Services accounts, the first step is to ensure that GuardDuty has been enabled in the potential member accounts. You can now invoke this API to add accounts by invitation. The invited accounts can either accept or decline the invitation from their GuardDuty accounts. Each invited Amazon Web Services account can choose to accept the invitation from only one Amazon Web Services account. For more information, see Managing GuardDuty accounts by invitation.
 *
 * After the invite has been accepted and you choose to disassociate a member account (by using DisassociateMembers) from your account, the details of the member account obtained by invoking CreateMembers, including the associated email addresses, will be retained. This is done so that you can invoke InviteMembers without the need to invoke CreateMembers again. To remove the details associated with a member account, you must also invoke DeleteMembers.
 *
 * If you disassociate a member account that was added by invitation, the member account details obtained from this API, including the associated email addresses, will be retained. This is done so that the delegated administrator can invoke the InviteMembers API without the need to invoke the CreateMembers API again. To remove the details associated with a member account, the delegated administrator must invoke the DeleteMembers API.
 *
 * When the member accounts added through Organizations are later disassociated, you (administrator) can't invite them by calling the InviteMembers API. You can create an association with these member accounts again only by calling the CreateMembers API.
 */
export const inviteMembers: API.OperationMethod<
  InviteMembersRequest,
  InviteMembersResponse,
  InviteMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InviteMembersRequest,
  output: InviteMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteMembers",
}));

export type ListCoverageError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists coverage details for your GuardDuty account. If you're a GuardDuty administrator, you can retrieve all resources associated with the active member accounts in your organization.
 *
 * Make sure the accounts have Runtime Monitoring enabled and GuardDuty agent running on their resources.
 */
export const listCoverage: API.PaginatedOperationMethod<
  ListCoverageRequest,
  ListCoverageResponse,
  ListCoverageError,
  Credentials | HttpClient.HttpClient,
  CoverageResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCoverageRequest,
  output: ListCoverageResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCoverage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDetectorsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists detectorIds of all the existing Amazon GuardDuty detector resources.
 */
export const listDetectors: API.PaginatedOperationMethod<
  ListDetectorsRequest,
  ListDetectorsResponse,
  ListDetectorsError,
  Credentials | HttpClient.HttpClient,
  DetectorId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDetectorsRequest,
  output: ListDetectorsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDetectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DetectorIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFiltersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a paginated list of the current filters.
 */
export const listFilters: API.PaginatedOperationMethod<
  ListFiltersRequest,
  ListFiltersResponse,
  ListFiltersError,
  Credentials | HttpClient.HttpClient,
  FilterName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFiltersRequest,
  output: ListFiltersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFilters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FilterNames",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists GuardDuty findings for the specified detector ID.
 *
 * There might be regional differences because some flags might not be available in all the Regions where GuardDuty is currently supported. For more information, see Regions and endpoints.
 */
export const listFindings: API.PaginatedOperationMethod<
  ListFindingsRequest,
  ListFindingsResponse,
  ListFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFindingsRequest,
  output: ListFindingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFindings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FindingIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvestigationsError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * This API is currently available as a preview. This feature is available in the following Amazon Web Services Regions: US East (N. Virginia), US East (Ohio), US West (Oregon), Canada (Central), Europe (Frankfurt), Europe (Ireland), Europe (London), Europe (Paris), Europe (Stockholm), and Asia Pacific (Tokyo).
 *
 * Returns a list of investigations associated with the specified GuardDuty detector.
 *
 * An administrator account sees all investigations across the organization. Member accounts see only the investigations that belong to them.
 */
export const listInvestigations: API.PaginatedOperationMethod<
  ListInvestigationsRequest,
  ListInvestigationsResponse,
  ListInvestigationsError,
  Credentials | HttpClient.HttpClient,
  InvestigationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvestigationsRequest,
  output: ListInvestigationsResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvestigations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Investigations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvitationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists all GuardDuty membership invitations that were sent to the current Amazon Web Services account.
 */
export const listInvitations: API.PaginatedOperationMethod<
  ListInvitationsRequest,
  ListInvitationsResponse,
  ListInvitationsError,
  Credentials | HttpClient.HttpClient,
  Invitation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvitationsRequest,
  output: ListInvitationsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Invitations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIPSetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the IPSets of the GuardDuty service specified by the detector ID. If you use this operation from a member account, the IPSets returned are the IPSets from the associated administrator account.
 */
export const listIPSets: API.PaginatedOperationMethod<
  ListIPSetsRequest,
  ListIPSetsResponse,
  ListIPSetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIPSetsRequest,
  output: ListIPSetsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIPSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IpSetIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMalwareProtectionPlansError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the Malware Protection plan IDs associated with the protected resources in your Amazon Web Services account.
 */
export const listMalwareProtectionPlans: API.OperationMethod<
  ListMalwareProtectionPlansRequest,
  ListMalwareProtectionPlansResponse,
  ListMalwareProtectionPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListMalwareProtectionPlansRequest,
  output: ListMalwareProtectionPlansResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMalwareProtectionPlans",
}));

export type ListMalwareScansError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of malware scans. Each member account can view the malware scans for their own accounts. An administrator can view the malware scans for all of its members' accounts.
 */
export const listMalwareScans: API.PaginatedOperationMethod<
  ListMalwareScansRequest,
  ListMalwareScansResponse,
  ListMalwareScansError,
  Credentials | HttpClient.HttpClient,
  MalwareScan
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMalwareScansRequest,
  output: ListMalwareScansResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMalwareScans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Scans",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists details about all member accounts for the current GuardDuty administrator account.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersRequest,
  ListMembersResponse,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  Member
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembersRequest,
  output: ListMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Members",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrganizationAdminAccountsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the accounts designated as GuardDuty delegated administrators. Only the organization's management account can run this API operation.
 */
export const listOrganizationAdminAccounts: API.PaginatedOperationMethod<
  ListOrganizationAdminAccountsRequest,
  ListOrganizationAdminAccountsResponse,
  ListOrganizationAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationAdminAccountsRequest,
  output: ListOrganizationAdminAccountsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationAdminAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPublishingDestinationsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Returns a list of publishing destinations associated with the specified `detectorId`.
 */
export const listPublishingDestinations: API.PaginatedOperationMethod<
  ListPublishingDestinationsRequest,
  ListPublishingDestinationsResponse,
  ListPublishingDestinationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPublishingDestinationsRequest,
  output: ListPublishingDestinationsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublishingDestinations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists tags for a resource. Tagging is currently supported for detectors, finding filters, IP sets, threat intel sets, and publishing destination, with a limit of 50 tags per resource. When invoked, this operation returns all assigned tags for a given resource.
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
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListThreatEntitySetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the threat entity sets associated with the specified GuardDuty detector ID. If you use this operation from a member account, the threat entity sets that are returned as a response, belong to the administrator account.
 */
export const listThreatEntitySets: API.PaginatedOperationMethod<
  ListThreatEntitySetsRequest,
  ListThreatEntitySetsResponse,
  ListThreatEntitySetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThreatEntitySetsRequest,
  output: ListThreatEntitySetsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatEntitySets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThreatEntitySetIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListThreatIntelSetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the ThreatIntelSets of the GuardDuty service specified by the detector ID. If you use this operation from a member account, the ThreatIntelSets associated with the administrator account are returned.
 */
export const listThreatIntelSets: API.PaginatedOperationMethod<
  ListThreatIntelSetsRequest,
  ListThreatIntelSetsResponse,
  ListThreatIntelSetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThreatIntelSetsRequest,
  output: ListThreatIntelSetsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThreatIntelSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThreatIntelSetIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTrustedEntitySetsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Lists the trusted entity sets associated with the specified GuardDuty detector ID. If you use this operation from a member account, the trusted entity sets that are returned as a response, belong to the administrator account.
 */
export const listTrustedEntitySets: API.PaginatedOperationMethod<
  ListTrustedEntitySetsRequest,
  ListTrustedEntitySetsResponse,
  ListTrustedEntitySetsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrustedEntitySetsRequest,
  output: ListTrustedEntitySetsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrustedEntitySets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrustedEntitySetIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SendObjectMalwareScanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Initiates a malware scan for a specific S3 object. This API allows you to perform on-demand malware scanning of individual objects in S3 buckets that have Malware Protection for S3 enabled.
 *
 * When you use this API, the Amazon Web Services service terms for GuardDuty Malware Protection apply. For more information, see Amazon Web Services service terms for GuardDuty Malware Protection.
 */
export const sendObjectMalwareScan: API.OperationMethod<
  SendObjectMalwareScanRequest,
  SendObjectMalwareScanResponse,
  SendObjectMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendObjectMalwareScanRequest,
  output: SendObjectMalwareScanResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendObjectMalwareScan",
}));

export type StartMalwareScanError =
  | BadRequestException
  | ConflictException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Initiates the malware scan. Invoking this API will automatically create the Service-linked role in the corresponding account if the resourceArn belongs to an EC2 instance.
 *
 * When the malware scan starts, you can use the associated scan ID to track the status of the scan. For more information, see ListMalwareScans and GetMalwareScan.
 *
 * When you use this API, the Amazon Web Services service terms for GuardDuty Malware Protection apply. For more information, see Amazon Web Services service terms for GuardDuty Malware Protection.
 */
export const startMalwareScan: API.OperationMethod<
  StartMalwareScanRequest,
  StartMalwareScanResponse,
  StartMalwareScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMalwareScanRequest,
  output: StartMalwareScanResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMalwareScan",
}));

export type StartMonitoringMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Turns on GuardDuty monitoring of the specified member accounts. Use this operation to restart monitoring of accounts that you stopped monitoring with the StopMonitoringMembers operation.
 */
export const startMonitoringMembers: API.OperationMethod<
  StartMonitoringMembersRequest,
  StartMonitoringMembersResponse,
  StartMonitoringMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMonitoringMembersRequest,
  output: StartMonitoringMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitoringMembers",
}));

export type StopMonitoringMembersError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Stops GuardDuty monitoring for the specified member accounts. Use the `StartMonitoringMembers` operation to restart monitoring for those accounts.
 *
 * With `autoEnableOrganizationMembers` configuration for your organization set to `ALL`, you'll receive an error if you attempt to stop monitoring the member accounts in your organization.
 */
export const stopMonitoringMembers: API.OperationMethod<
  StopMonitoringMembersRequest,
  StopMonitoringMembersResponse,
  StopMonitoringMembersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopMonitoringMembersRequest,
  output: StopMonitoringMembersResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMonitoringMembers",
}));

export type TagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Adds tags to a resource.
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
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UnarchiveFindingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Unarchives GuardDuty findings specified by the `findingIds`.
 */
export const unarchiveFindings: API.OperationMethod<
  UnarchiveFindingsRequest,
  UnarchiveFindingsResponse,
  UnarchiveFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnarchiveFindingsRequest,
  output: UnarchiveFindingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnarchiveFindings",
}));

export type UntagResourceError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Removes tags from a resource.
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
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDetectorError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the GuardDuty detector specified by the detector ID.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateDetector: API.OperationMethod<
  UpdateDetectorRequest,
  UpdateDetectorResponse,
  UpdateDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDetectorRequest,
  output: UpdateDetectorResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDetector",
}));

export type UpdateFilterError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the filter specified by the filter name.
 */
export const updateFilter: API.OperationMethod<
  UpdateFilterRequest,
  UpdateFilterResponse,
  UpdateFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFilterRequest,
  output: UpdateFilterResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFilter",
}));

export type UpdateFindingsFeedbackError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Marks the specified GuardDuty findings as useful or not useful.
 */
export const updateFindingsFeedback: API.OperationMethod<
  UpdateFindingsFeedbackRequest,
  UpdateFindingsFeedbackResponse,
  UpdateFindingsFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFindingsFeedbackRequest,
  output: UpdateFindingsFeedbackResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFindingsFeedback",
}));

export type UpdateIPSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the IPSet specified by the IPSet ID.
 */
export const updateIPSet: API.OperationMethod<
  UpdateIPSetRequest,
  UpdateIPSetResponse,
  UpdateIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIPSetRequest,
  output: UpdateIPSetResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
}));

export type UpdateMalwareProtectionPlanError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing Malware Protection plan resource.
 */
export const updateMalwareProtectionPlan: API.OperationMethod<
  UpdateMalwareProtectionPlanRequest,
  UpdateMalwareProtectionPlanResponse,
  UpdateMalwareProtectionPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMalwareProtectionPlanRequest,
  output: UpdateMalwareProtectionPlanResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareProtectionPlan",
}));

export type UpdateMalwareScanSettingsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the malware scan settings.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateMalwareScanSettings: API.OperationMethod<
  UpdateMalwareScanSettingsRequest,
  UpdateMalwareScanSettingsResponse,
  UpdateMalwareScanSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMalwareScanSettingsRequest,
  output: UpdateMalwareScanSettingsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMalwareScanSettings",
}));

export type UpdateMemberDetectorsError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Contains information on member accounts to be updated.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateMemberDetectors: API.OperationMethod<
  UpdateMemberDetectorsRequest,
  UpdateMemberDetectorsResponse,
  UpdateMemberDetectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMemberDetectorsRequest,
  output: UpdateMemberDetectorsResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemberDetectors",
}));

export type UpdateOrganizationConfigurationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Configures the delegated administrator account with the provided values. You must provide a value for either `autoEnableOrganizationMembers` or `autoEnable`, but not both.
 *
 * Specifying both EKS Runtime Monitoring (`EKS_RUNTIME_MONITORING`) and Runtime Monitoring (`RUNTIME_MONITORING`) will cause an error. You can add only one of these two features because Runtime Monitoring already includes the threat detection for Amazon EKS resources. For more information, see Runtime Monitoring.
 *
 * There might be regional differences because some data sources might not be available in all the Amazon Web Services Regions where GuardDuty is presently supported. For more information, see Regions and endpoints.
 */
export const updateOrganizationConfiguration: API.OperationMethod<
  UpdateOrganizationConfigurationRequest,
  UpdateOrganizationConfigurationResponse,
  UpdateOrganizationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOrganizationConfigurationRequest,
  output: UpdateOrganizationConfigurationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationConfiguration",
}));

export type UpdatePublishingDestinationError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates information about the publishing destination specified by the `destinationId`.
 */
export const updatePublishingDestination: API.OperationMethod<
  UpdatePublishingDestinationRequest,
  UpdatePublishingDestinationResponse,
  UpdatePublishingDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePublishingDestinationRequest,
  output: UpdatePublishingDestinationResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePublishingDestination",
}));

export type UpdateThreatEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the threat entity set associated with the specified `threatEntitySetId`.
 */
export const updateThreatEntitySet: API.OperationMethod<
  UpdateThreatEntitySetRequest,
  UpdateThreatEntitySetResponse,
  UpdateThreatEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThreatEntitySetRequest,
  output: UpdateThreatEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatEntitySet",
}));

export type UpdateThreatIntelSetError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the ThreatIntelSet specified by the ThreatIntelSet ID.
 */
export const updateThreatIntelSet: API.OperationMethod<
  UpdateThreatIntelSetRequest,
  UpdateThreatIntelSetResponse,
  UpdateThreatIntelSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThreatIntelSetRequest,
  output: UpdateThreatIntelSetResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThreatIntelSet",
}));

export type UpdateTrustedEntitySetError =
  | BadRequestException
  | InternalServerErrorException
  | CommonErrors;
/**
 * Updates the trusted entity set associated with the specified `trustedEntitySetId`.
 */
export const updateTrustedEntitySet: API.OperationMethod<
  UpdateTrustedEntitySetRequest,
  UpdateTrustedEntitySetResponse,
  UpdateTrustedEntitySetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTrustedEntitySetRequest,
  output: UpdateTrustedEntitySetResponse,
  errors: [BadRequestException, InternalServerErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrustedEntitySet",
}));
