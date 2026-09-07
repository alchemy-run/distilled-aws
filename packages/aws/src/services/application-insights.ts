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
  sdkId: "Application Insights",
  serviceShapeName: "EC2WindowsBarleyService",
});
const auth = T.AwsAuthSigv4({ name: "applicationinsights" });
const ver = T.ServiceVersion("2018-11-25");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://applicationinsights-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://applicationinsights-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://applicationinsights.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://applicationinsights.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(
      T.AwsQueryError({ code: "AccessDeniedException", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "BadRequestException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InternalServerException",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceInUseException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagsAlreadyExistException
  extends /*@__PURE__*/ S.TaggedError<TagsAlreadyExistException>()(
    "TagsAlreadyExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ResourceGroupName = string;
export type ComponentName = string;
export type WorkloadName = string;
export type Tier =
  | "CUSTOM"
  | "DEFAULT"
  | "DOT_NET_CORE"
  | "DOT_NET_WORKER"
  | "DOT_NET_WEB_TIER"
  | "DOT_NET_WEB"
  | "SQL_SERVER"
  | "SQL_SERVER_ALWAYSON_AVAILABILITY_GROUP"
  | "MYSQL"
  | "POSTGRESQL"
  | "JAVA_JMX"
  | "ORACLE"
  | "SAP_HANA_MULTI_NODE"
  | "SAP_HANA_SINGLE_NODE"
  | "SAP_HANA_HIGH_AVAILABILITY"
  | "SAP_ASE_SINGLE_NODE"
  | "SAP_ASE_HIGH_AVAILABILITY"
  | "SQL_SERVER_FAILOVER_CLUSTER_INSTANCE"
  | "SHAREPOINT"
  | "ACTIVE_DIRECTORY"
  | "SAP_NETWEAVER_STANDARD"
  | "SAP_NETWEAVER_DISTRIBUTED"
  | "SAP_NETWEAVER_HIGH_AVAILABILITY"
  | (string & {});
export const Tier = /*@__PURE__*/ S.String;

export type ComponentConfiguration = string;
export interface WorkloadConfiguration {
  WorkloadName?: string;
  Tier?: Tier;
  Configuration?: string;
}
export const WorkloadConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadName: S.optional(S.String),
    Tier: S.optional(Tier),
    Configuration: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkloadConfiguration",
}) as any as S.Schema<WorkloadConfiguration>;
export interface AddWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadConfiguration: WorkloadConfiguration;
}
export const AddWorkloadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    WorkloadConfiguration: WorkloadConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AddWorkloadRequest",
}) as any as S.Schema<AddWorkloadRequest>;
export type WorkloadId = string;
export interface AddWorkloadResponse {
  WorkloadId?: string;
  WorkloadConfiguration?: WorkloadConfiguration;
}
export const AddWorkloadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadConfiguration: S.optional(WorkloadConfiguration),
  }),
).annotate({
  identifier: "AddWorkloadResponse",
}) as any as S.Schema<AddWorkloadResponse>;
export type OpsCenterEnabled = boolean;
export type CWEMonitorEnabled = boolean;
export type OpsItemSNSTopicArn = string;
export type SNSNotificationArn = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type AutoConfigEnabled = boolean;
export type AutoCreate = boolean;
export type GroupingType = "ACCOUNT_BASED" | (string & {});
export const GroupingType = /*@__PURE__*/ S.String;

export type AttachMissingPermission = boolean;
export interface CreateApplicationRequest {
  ResourceGroupName?: string;
  OpsCenterEnabled?: boolean;
  CWEMonitorEnabled?: boolean;
  OpsItemSNSTopicArn?: string;
  SNSNotificationArn?: string;
  Tags?: Tag[];
  AutoConfigEnabled?: boolean;
  AutoCreate?: boolean;
  GroupingType?: GroupingType;
  AttachMissingPermission?: boolean;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    OpsCenterEnabled: S.optional(S.Boolean),
    CWEMonitorEnabled: S.optional(S.Boolean),
    OpsItemSNSTopicArn: S.optional(S.String),
    SNSNotificationArn: S.optional(S.String),
    Tags: S.optional(TagList),
    AutoConfigEnabled: S.optional(S.Boolean),
    AutoCreate: S.optional(S.Boolean),
    GroupingType: S.optional(GroupingType),
    AttachMissingPermission: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type AccountId = string;
export type LifeCycle = string;
export type Remarks = string;
export type DiscoveryType =
  | "RESOURCE_GROUP_BASED"
  | "ACCOUNT_BASED"
  | (string & {});
export const DiscoveryType = /*@__PURE__*/ S.String;

export interface ApplicationInfo {
  AccountId?: string;
  ResourceGroupName?: string;
  LifeCycle?: string;
  OpsItemSNSTopicArn?: string;
  SNSNotificationArn?: string;
  OpsCenterEnabled?: boolean;
  CWEMonitorEnabled?: boolean;
  Remarks?: string;
  AutoConfigEnabled?: boolean;
  DiscoveryType?: DiscoveryType;
  AttachMissingPermission?: boolean;
}
export const ApplicationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ResourceGroupName: S.optional(S.String),
    LifeCycle: S.optional(S.String),
    OpsItemSNSTopicArn: S.optional(S.String),
    SNSNotificationArn: S.optional(S.String),
    OpsCenterEnabled: S.optional(S.Boolean),
    CWEMonitorEnabled: S.optional(S.Boolean),
    Remarks: S.optional(S.String),
    AutoConfigEnabled: S.optional(S.Boolean),
    DiscoveryType: S.optional(DiscoveryType),
    AttachMissingPermission: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ApplicationInfo",
}) as any as S.Schema<ApplicationInfo>;
export interface CreateApplicationResponse {
  ApplicationInfo?: ApplicationInfo;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationInfo: S.optional(ApplicationInfo) }),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type CustomComponentName = string;
export type ResourceARN = string;
export type ResourceList = string[];
export const ResourceList = /*@__PURE__*/ S.Array(S.String);
export interface CreateComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
  ResourceList: string[];
}
export const CreateComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    ResourceList: ResourceList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateComponentRequest",
}) as any as S.Schema<CreateComponentRequest>;
export interface CreateComponentResponse {}
export const CreateComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateComponentResponse",
}) as any as S.Schema<CreateComponentResponse>;
export type LogPatternSetName = string;
export type LogPatternName = string;
export type LogPatternRegex = string;
export type LogPatternRank = number;
export interface CreateLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
  Pattern: string;
  Rank: number;
}
export const CreateLogPatternRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    PatternSetName: S.String,
    PatternName: S.String,
    Pattern: S.String,
    Rank: S.Number,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLogPatternRequest",
}) as any as S.Schema<CreateLogPatternRequest>;
export interface LogPattern {
  PatternSetName?: string;
  PatternName?: string;
  Pattern?: string;
  Rank?: number;
}
export const LogPattern = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PatternSetName: S.optional(S.String),
    PatternName: S.optional(S.String),
    Pattern: S.optional(S.String),
    Rank: S.optional(S.Number),
  }),
).annotate({ identifier: "LogPattern" }) as any as S.Schema<LogPattern>;
export interface CreateLogPatternResponse {
  LogPattern?: LogPattern;
  ResourceGroupName?: string;
}
export const CreateLogPatternResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogPattern: S.optional(LogPattern),
    ResourceGroupName: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLogPatternResponse",
}) as any as S.Schema<CreateLogPatternResponse>;
export interface DeleteApplicationRequest {
  ResourceGroupName: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceGroupName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface DeleteComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
}
export const DeleteComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceGroupName: S.String, ComponentName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteComponentRequest",
}) as any as S.Schema<DeleteComponentRequest>;
export interface DeleteComponentResponse {}
export const DeleteComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteComponentResponse",
}) as any as S.Schema<DeleteComponentResponse>;
export interface DeleteLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
}
export const DeleteLogPatternRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    PatternSetName: S.String,
    PatternName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteLogPatternRequest",
}) as any as S.Schema<DeleteLogPatternRequest>;
export interface DeleteLogPatternResponse {}
export const DeleteLogPatternResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLogPatternResponse",
}) as any as S.Schema<DeleteLogPatternResponse>;
export interface DescribeApplicationRequest {
  ResourceGroupName: string;
  AccountId?: string;
}
export const DescribeApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeApplicationRequest",
}) as any as S.Schema<DescribeApplicationRequest>;
export interface DescribeApplicationResponse {
  ApplicationInfo?: ApplicationInfo;
}
export const DescribeApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationInfo: S.optional(ApplicationInfo) }),
).annotate({
  identifier: "DescribeApplicationResponse",
}) as any as S.Schema<DescribeApplicationResponse>;
export interface DescribeComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
  AccountId?: string;
}
export const DescribeComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeComponentRequest",
}) as any as S.Schema<DescribeComponentRequest>;
export type ResourceType = string;
export type OsType = "WINDOWS" | "LINUX" | (string & {});
export const OsType = /*@__PURE__*/ S.String;

export type Monitor = boolean;
export type MetaDataKey = string;
export type MetaDataValue = string;
export type WorkloadMetaData = { [key: string]: string | undefined };
export const WorkloadMetaData = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DetectedWorkload = {
  [key in Tier]?: { [key: string]: string | undefined };
};
export const DetectedWorkload = /*@__PURE__*/ S.Record(
  Tier,
  WorkloadMetaData.pipe(S.optional),
);
export interface ApplicationComponent {
  ComponentName?: string;
  ComponentRemarks?: string;
  ResourceType?: string;
  OsType?: OsType;
  Tier?: Tier;
  Monitor?: boolean;
  DetectedWorkload?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export const ApplicationComponent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentName: S.optional(S.String),
    ComponentRemarks: S.optional(S.String),
    ResourceType: S.optional(S.String),
    OsType: S.optional(OsType),
    Tier: S.optional(Tier),
    Monitor: S.optional(S.Boolean),
    DetectedWorkload: S.optional(DetectedWorkload),
  }),
).annotate({
  identifier: "ApplicationComponent",
}) as any as S.Schema<ApplicationComponent>;
export interface DescribeComponentResponse {
  ApplicationComponent?: ApplicationComponent;
  ResourceList?: string[];
}
export const DescribeComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationComponent: S.optional(ApplicationComponent),
    ResourceList: S.optional(ResourceList),
  }),
).annotate({
  identifier: "DescribeComponentResponse",
}) as any as S.Schema<DescribeComponentResponse>;
export interface DescribeComponentConfigurationRequest {
  ResourceGroupName: string;
  ComponentName: string;
  AccountId?: string;
}
export const DescribeComponentConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceGroupName: S.String,
      ComponentName: S.String,
      AccountId: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeComponentConfigurationRequest",
}) as any as S.Schema<DescribeComponentConfigurationRequest>;
export interface DescribeComponentConfigurationResponse {
  Monitor?: boolean;
  Tier?: Tier;
  ComponentConfiguration?: string;
}
export const DescribeComponentConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Monitor: S.optional(S.Boolean),
      Tier: S.optional(Tier),
      ComponentConfiguration: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeComponentConfigurationResponse",
}) as any as S.Schema<DescribeComponentConfigurationResponse>;
export type RecommendationType =
  | "INFRA_ONLY"
  | "WORKLOAD_ONLY"
  | "ALL"
  | (string & {});
export const RecommendationType = /*@__PURE__*/ S.String;

export interface DescribeComponentConfigurationRecommendationRequest {
  ResourceGroupName: string;
  ComponentName: string;
  Tier: Tier;
  WorkloadName?: string;
  RecommendationType?: RecommendationType;
}
export const DescribeComponentConfigurationRecommendationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceGroupName: S.String,
      ComponentName: S.String,
      Tier: Tier,
      WorkloadName: S.optional(S.String),
      RecommendationType: S.optional(RecommendationType),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeComponentConfigurationRecommendationRequest",
  }) as any as S.Schema<DescribeComponentConfigurationRecommendationRequest>;
export interface DescribeComponentConfigurationRecommendationResponse {
  ComponentConfiguration?: string;
}
export const DescribeComponentConfigurationRecommendationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ComponentConfiguration: S.optional(S.String) }),
  ).annotate({
    identifier: "DescribeComponentConfigurationRecommendationResponse",
  }) as any as S.Schema<DescribeComponentConfigurationRecommendationResponse>;
export interface DescribeLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
  AccountId?: string;
}
export const DescribeLogPatternRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    PatternSetName: S.String,
    PatternName: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeLogPatternRequest",
}) as any as S.Schema<DescribeLogPatternRequest>;
export interface DescribeLogPatternResponse {
  ResourceGroupName?: string;
  AccountId?: string;
  LogPattern?: LogPattern;
}
export const DescribeLogPatternResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    AccountId: S.optional(S.String),
    LogPattern: S.optional(LogPattern),
  }),
).annotate({
  identifier: "DescribeLogPatternResponse",
}) as any as S.Schema<DescribeLogPatternResponse>;
export type ObservationId = string;
export interface DescribeObservationRequest {
  ObservationId: string;
  AccountId?: string;
}
export const DescribeObservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ObservationId: S.String, AccountId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeObservationRequest",
}) as any as S.Schema<DescribeObservationRequest>;
export type StartTime = Date;
export type EndTime = Date;
export type SourceType = string;
export type SourceARN = string;
export type LogGroup = string;
export type LineTime = Date;
export type LogText = string;
export type LogFilter = "ERROR" | "WARN" | "INFO" | (string & {});
export const LogFilter = /*@__PURE__*/ S.String;

export type MetricNamespace = string;
export type MetricName = string;
export type Unit = string;
export type Value = number;
export type CloudWatchEventId = string;
export type CloudWatchEventSource =
  | "EC2"
  | "CODE_DEPLOY"
  | "HEALTH"
  | "RDS"
  | (string & {});
export const CloudWatchEventSource = /*@__PURE__*/ S.String;

export type CloudWatchEventDetailType = string;
export type HealthEventArn = string;
export type HealthService = string;
export type HealthEventTypeCode = string;
export type HealthEventTypeCategory = string;
export type HealthEventDescription = string;
export type CodeDeployDeploymentId = string;
export type CodeDeployDeploymentGroup = string;
export type CodeDeployState = string;
export type CodeDeployApplication = string;
export type CodeDeployInstanceGroupId = string;
export type Ec2State = string;
export type RdsEventCategories = string;
export type RdsEventMessage = string;
export type S3EventName = string;
export type StatesExecutionArn = string;
export type StatesArn = string;
export type StatesStatus = string;
export type StatesInput = string;
export type EbsEvent = string;
export type EbsResult = string;
export type EbsCause = string;
export type EbsRequestId = string;
export type XRayFaultPercent = number;
export type XRayThrottlePercent = number;
export type XRayErrorPercent = number;
export type XRayRequestCount = number;
export type XRayRequestAverageLatency = number;
export type XRayNodeName = string;
export type XRayNodeType = string;
export interface Observation {
  Id?: string;
  StartTime?: Date;
  EndTime?: Date;
  SourceType?: string;
  SourceARN?: string;
  LogGroup?: string;
  LineTime?: Date;
  LogText?: string;
  LogFilter?: LogFilter;
  MetricNamespace?: string;
  MetricName?: string;
  Unit?: string;
  Value?: number;
  CloudWatchEventId?: string;
  CloudWatchEventSource?: CloudWatchEventSource;
  CloudWatchEventDetailType?: string;
  HealthEventArn?: string;
  HealthService?: string;
  HealthEventTypeCode?: string;
  HealthEventTypeCategory?: string;
  HealthEventDescription?: string;
  CodeDeployDeploymentId?: string;
  CodeDeployDeploymentGroup?: string;
  CodeDeployState?: string;
  CodeDeployApplication?: string;
  CodeDeployInstanceGroupId?: string;
  Ec2State?: string;
  RdsEventCategories?: string;
  RdsEventMessage?: string;
  S3EventName?: string;
  StatesExecutionArn?: string;
  StatesArn?: string;
  StatesStatus?: string;
  StatesInput?: string;
  EbsEvent?: string;
  EbsResult?: string;
  EbsCause?: string;
  EbsRequestId?: string;
  XRayFaultPercent?: number;
  XRayThrottlePercent?: number;
  XRayErrorPercent?: number;
  XRayRequestCount?: number;
  XRayRequestAverageLatency?: number;
  XRayNodeName?: string;
  XRayNodeType?: string;
}
export const Observation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SourceType: S.optional(S.String),
    SourceARN: S.optional(S.String),
    LogGroup: S.optional(S.String),
    LineTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LogText: S.optional(S.String),
    LogFilter: S.optional(LogFilter),
    MetricNamespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Unit: S.optional(S.String),
    Value: S.optional(S.Number),
    CloudWatchEventId: S.optional(S.String),
    CloudWatchEventSource: S.optional(CloudWatchEventSource),
    CloudWatchEventDetailType: S.optional(S.String),
    HealthEventArn: S.optional(S.String),
    HealthService: S.optional(S.String),
    HealthEventTypeCode: S.optional(S.String),
    HealthEventTypeCategory: S.optional(S.String),
    HealthEventDescription: S.optional(S.String),
    CodeDeployDeploymentId: S.optional(S.String),
    CodeDeployDeploymentGroup: S.optional(S.String),
    CodeDeployState: S.optional(S.String),
    CodeDeployApplication: S.optional(S.String),
    CodeDeployInstanceGroupId: S.optional(S.String),
    Ec2State: S.optional(S.String),
    RdsEventCategories: S.optional(S.String),
    RdsEventMessage: S.optional(S.String),
    S3EventName: S.optional(S.String),
    StatesExecutionArn: S.optional(S.String),
    StatesArn: S.optional(S.String),
    StatesStatus: S.optional(S.String),
    StatesInput: S.optional(S.String),
    EbsEvent: S.optional(S.String),
    EbsResult: S.optional(S.String),
    EbsCause: S.optional(S.String),
    EbsRequestId: S.optional(S.String),
    XRayFaultPercent: S.optional(S.Number),
    XRayThrottlePercent: S.optional(S.Number),
    XRayErrorPercent: S.optional(S.Number),
    XRayRequestCount: S.optional(S.Number),
    XRayRequestAverageLatency: S.optional(S.Number),
    XRayNodeName: S.optional(S.String),
    XRayNodeType: S.optional(S.String),
  }),
).annotate({ identifier: "Observation" }) as any as S.Schema<Observation>;
export interface DescribeObservationResponse {
  Observation?: Observation;
}
export const DescribeObservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Observation: S.optional(Observation) }),
).annotate({
  identifier: "DescribeObservationResponse",
}) as any as S.Schema<DescribeObservationResponse>;
export type ProblemId = string;
export interface DescribeProblemRequest {
  ProblemId: string;
  AccountId?: string;
}
export const DescribeProblemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProblemId: S.String, AccountId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProblemRequest",
}) as any as S.Schema<DescribeProblemRequest>;
export type Title = string;
export type ShortName = string;
export type Insights = string;
export type Status =
  | "IGNORE"
  | "RESOLVED"
  | "PENDING"
  | "RECURRING"
  | "RECOVERING"
  | (string & {});
export const Status = /*@__PURE__*/ S.String;

export type AffectedResource = string;
export type SeverityLevel =
  | "Informative"
  | "Low"
  | "Medium"
  | "High"
  | (string & {});
export const SeverityLevel = /*@__PURE__*/ S.String;

export type FeedbackKey = "INSIGHTS_FEEDBACK" | (string & {});
export const FeedbackKey = /*@__PURE__*/ S.String;

export type FeedbackValue =
  | "NOT_SPECIFIED"
  | "USEFUL"
  | "NOT_USEFUL"
  | (string & {});
export const FeedbackValue = /*@__PURE__*/ S.String;

export type Feedback = { [key in FeedbackKey]?: FeedbackValue };
export const Feedback = /*@__PURE__*/ S.Record(
  FeedbackKey,
  FeedbackValue.pipe(S.optional),
);
export type RecurringCount = number;
export type LastRecurrenceTime = Date;
export type Visibility = "IGNORED" | "VISIBLE" | (string & {});
export const Visibility = /*@__PURE__*/ S.String;

export type ResolutionMethod =
  | "MANUAL"
  | "AUTOMATIC"
  | "UNRESOLVED"
  | (string & {});
export const ResolutionMethod = /*@__PURE__*/ S.String;

export interface Problem {
  Id?: string;
  Title?: string;
  ShortName?: string;
  Insights?: string;
  Status?: Status;
  AffectedResource?: string;
  StartTime?: Date;
  EndTime?: Date;
  SeverityLevel?: SeverityLevel;
  AccountId?: string;
  ResourceGroupName?: string;
  Feedback?: { [key: string]: FeedbackValue | undefined };
  RecurringCount?: number;
  LastRecurrenceTime?: Date;
  Visibility?: Visibility;
  ResolutionMethod?: ResolutionMethod;
}
export const Problem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Title: S.optional(S.String),
    ShortName: S.optional(S.String),
    Insights: S.optional(S.String),
    Status: S.optional(Status),
    AffectedResource: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SeverityLevel: S.optional(SeverityLevel),
    AccountId: S.optional(S.String),
    ResourceGroupName: S.optional(S.String),
    Feedback: S.optional(Feedback),
    RecurringCount: S.optional(S.Number),
    LastRecurrenceTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Visibility: S.optional(Visibility),
    ResolutionMethod: S.optional(ResolutionMethod),
  }),
).annotate({ identifier: "Problem" }) as any as S.Schema<Problem>;
export interface DescribeProblemResponse {
  Problem?: Problem;
  SNSNotificationArn?: string;
}
export const DescribeProblemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Problem: S.optional(Problem),
    SNSNotificationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProblemResponse",
}) as any as S.Schema<DescribeProblemResponse>;
export interface DescribeProblemObservationsRequest {
  ProblemId: string;
  AccountId?: string;
}
export const DescribeProblemObservationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProblemId: S.String, AccountId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProblemObservationsRequest",
}) as any as S.Schema<DescribeProblemObservationsRequest>;
export type ObservationList = Observation[];
export const ObservationList = /*@__PURE__*/ S.Array(Observation);
export interface RelatedObservations {
  ObservationList?: Observation[];
}
export const RelatedObservations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ObservationList: S.optional(ObservationList) }),
).annotate({
  identifier: "RelatedObservations",
}) as any as S.Schema<RelatedObservations>;
export interface DescribeProblemObservationsResponse {
  RelatedObservations?: RelatedObservations;
}
export const DescribeProblemObservationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RelatedObservations: S.optional(RelatedObservations) }),
).annotate({
  identifier: "DescribeProblemObservationsResponse",
}) as any as S.Schema<DescribeProblemObservationsResponse>;
export interface DescribeWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadId: string;
  AccountId?: string;
}
export const DescribeWorkloadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    WorkloadId: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeWorkloadRequest",
}) as any as S.Schema<DescribeWorkloadRequest>;
export interface DescribeWorkloadResponse {
  WorkloadId?: string;
  WorkloadRemarks?: string;
  WorkloadConfiguration?: WorkloadConfiguration;
}
export const DescribeWorkloadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadRemarks: S.optional(S.String),
    WorkloadConfiguration: S.optional(WorkloadConfiguration),
  }),
).annotate({
  identifier: "DescribeWorkloadResponse",
}) as any as S.Schema<DescribeWorkloadResponse>;
export type MaxEntities = number;
export type PaginationToken = string;
export interface ListApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export type ApplicationInfoList = ApplicationInfo[];
export const ApplicationInfoList = /*@__PURE__*/ S.Array(ApplicationInfo);
export interface ListApplicationsResponse {
  ApplicationInfoList?: ApplicationInfo[];
  NextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationInfoList: S.optional(ApplicationInfoList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export interface ListComponentsRequest {
  ResourceGroupName: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export const ListComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListComponentsRequest",
}) as any as S.Schema<ListComponentsRequest>;
export type ApplicationComponentList = ApplicationComponent[];
export const ApplicationComponentList =
  /*@__PURE__*/ S.Array(ApplicationComponent);
export interface ListComponentsResponse {
  ApplicationComponentList?: ApplicationComponent[];
  NextToken?: string;
}
export const ListComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationComponentList: S.optional(ApplicationComponentList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentsResponse",
}) as any as S.Schema<ListComponentsResponse>;
export type ConfigurationEventStatus =
  | "INFO"
  | "WARN"
  | "ERROR"
  | (string & {});
export const ConfigurationEventStatus = /*@__PURE__*/ S.String;

export interface ListConfigurationHistoryRequest {
  ResourceGroupName?: string;
  StartTime?: Date;
  EndTime?: Date;
  EventStatus?: ConfigurationEventStatus;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export const ListConfigurationHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EventStatus: S.optional(ConfigurationEventStatus),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConfigurationHistoryRequest",
}) as any as S.Schema<ListConfigurationHistoryRequest>;
export type ConfigurationEventMonitoredResourceARN = string;
export type ConfigurationEventResourceType =
  | "CLOUDWATCH_ALARM"
  | "CLOUDWATCH_LOG"
  | "CLOUDFORMATION"
  | "SSM_ASSOCIATION"
  | (string & {});
export const ConfigurationEventResourceType = /*@__PURE__*/ S.String;

export type ConfigurationEventTime = Date;
export type ConfigurationEventDetail = string;
export type ConfigurationEventResourceName = string;
export interface ConfigurationEvent {
  ResourceGroupName?: string;
  AccountId?: string;
  MonitoredResourceARN?: string;
  EventStatus?: ConfigurationEventStatus;
  EventResourceType?: ConfigurationEventResourceType;
  EventTime?: Date;
  EventDetail?: string;
  EventResourceName?: string;
}
export const ConfigurationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    AccountId: S.optional(S.String),
    MonitoredResourceARN: S.optional(S.String),
    EventStatus: S.optional(ConfigurationEventStatus),
    EventResourceType: S.optional(ConfigurationEventResourceType),
    EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EventDetail: S.optional(S.String),
    EventResourceName: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationEvent",
}) as any as S.Schema<ConfigurationEvent>;
export type ConfigurationEventList = ConfigurationEvent[];
export const ConfigurationEventList = /*@__PURE__*/ S.Array(ConfigurationEvent);
export interface ListConfigurationHistoryResponse {
  EventList?: ConfigurationEvent[];
  NextToken?: string;
}
export const ListConfigurationHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventList: S.optional(ConfigurationEventList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationHistoryResponse",
}) as any as S.Schema<ListConfigurationHistoryResponse>;
export interface ListLogPatternsRequest {
  ResourceGroupName: string;
  PatternSetName?: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export const ListLogPatternsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    PatternSetName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLogPatternsRequest",
}) as any as S.Schema<ListLogPatternsRequest>;
export type LogPatternList = LogPattern[];
export const LogPatternList = /*@__PURE__*/ S.Array(LogPattern);
export interface ListLogPatternsResponse {
  ResourceGroupName?: string;
  AccountId?: string;
  LogPatterns?: LogPattern[];
  NextToken?: string;
}
export const ListLogPatternsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    AccountId: S.optional(S.String),
    LogPatterns: S.optional(LogPatternList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLogPatternsResponse",
}) as any as S.Schema<ListLogPatternsResponse>;
export interface ListLogPatternSetsRequest {
  ResourceGroupName: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export const ListLogPatternSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLogPatternSetsRequest",
}) as any as S.Schema<ListLogPatternSetsRequest>;
export type LogPatternSetList = string[];
export const LogPatternSetList = /*@__PURE__*/ S.Array(S.String);
export interface ListLogPatternSetsResponse {
  ResourceGroupName?: string;
  AccountId?: string;
  LogPatternSets?: string[];
  NextToken?: string;
}
export const ListLogPatternSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    AccountId: S.optional(S.String),
    LogPatternSets: S.optional(LogPatternSetList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLogPatternSetsResponse",
}) as any as S.Schema<ListLogPatternSetsResponse>;
export interface ListProblemsRequest {
  AccountId?: string;
  ResourceGroupName?: string;
  StartTime?: Date;
  EndTime?: Date;
  MaxResults?: number;
  NextToken?: string;
  ComponentName?: string;
  Visibility?: Visibility;
}
export const ListProblemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ResourceGroupName: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ComponentName: S.optional(S.String),
    Visibility: S.optional(Visibility),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProblemsRequest",
}) as any as S.Schema<ListProblemsRequest>;
export type ProblemList = Problem[];
export const ProblemList = /*@__PURE__*/ S.Array(Problem);
export interface ListProblemsResponse {
  ProblemList?: Problem[];
  NextToken?: string;
  ResourceGroupName?: string;
  AccountId?: string;
}
export const ListProblemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProblemList: S.optional(ProblemList),
    NextToken: S.optional(S.String),
    ResourceGroupName: S.optional(S.String),
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProblemsResponse",
}) as any as S.Schema<ListProblemsResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWorkloadsRequest {
  ResourceGroupName: string;
  ComponentName: string;
  MaxResults?: number;
  NextToken?: string;
  AccountId?: string;
}
export const ListWorkloadsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWorkloadsRequest",
}) as any as S.Schema<ListWorkloadsRequest>;
export type MissingWorkloadConfig = boolean;
export interface Workload {
  WorkloadId?: string;
  ComponentName?: string;
  WorkloadName?: string;
  Tier?: Tier;
  WorkloadRemarks?: string;
  MissingWorkloadConfig?: boolean;
}
export const Workload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    ComponentName: S.optional(S.String),
    WorkloadName: S.optional(S.String),
    Tier: S.optional(Tier),
    WorkloadRemarks: S.optional(S.String),
    MissingWorkloadConfig: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Workload" }) as any as S.Schema<Workload>;
export type WorkloadList = Workload[];
export const WorkloadList = /*@__PURE__*/ S.Array(Workload);
export interface ListWorkloadsResponse {
  WorkloadList?: Workload[];
  NextToken?: string;
}
export const ListWorkloadsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadList: S.optional(WorkloadList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkloadsResponse",
}) as any as S.Schema<ListWorkloadsResponse>;
export interface RemoveWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadId: string;
}
export const RemoveWorkloadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    WorkloadId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveWorkloadRequest",
}) as any as S.Schema<RemoveWorkloadRequest>;
export interface RemoveWorkloadResponse {}
export const RemoveWorkloadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveWorkloadResponse",
}) as any as S.Schema<RemoveWorkloadResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type RemoveSNSTopic = boolean;
export interface UpdateApplicationRequest {
  ResourceGroupName: string;
  OpsCenterEnabled?: boolean;
  CWEMonitorEnabled?: boolean;
  OpsItemSNSTopicArn?: string;
  SNSNotificationArn?: string;
  RemoveSNSTopic?: boolean;
  AutoConfigEnabled?: boolean;
  AttachMissingPermission?: boolean;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    OpsCenterEnabled: S.optional(S.Boolean),
    CWEMonitorEnabled: S.optional(S.Boolean),
    OpsItemSNSTopicArn: S.optional(S.String),
    SNSNotificationArn: S.optional(S.String),
    RemoveSNSTopic: S.optional(S.Boolean),
    AutoConfigEnabled: S.optional(S.Boolean),
    AttachMissingPermission: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {
  ApplicationInfo?: ApplicationInfo;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationInfo: S.optional(ApplicationInfo) }),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateComponentRequest {
  ResourceGroupName: string;
  ComponentName: string;
  NewComponentName?: string;
  ResourceList?: string[];
}
export const UpdateComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    NewComponentName: S.optional(S.String),
    ResourceList: S.optional(ResourceList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateComponentRequest",
}) as any as S.Schema<UpdateComponentRequest>;
export interface UpdateComponentResponse {}
export const UpdateComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateComponentResponse",
}) as any as S.Schema<UpdateComponentResponse>;
export interface UpdateComponentConfigurationRequest {
  ResourceGroupName: string;
  ComponentName: string;
  Monitor?: boolean;
  Tier?: Tier;
  ComponentConfiguration?: string;
  AutoConfigEnabled?: boolean;
}
export const UpdateComponentConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    Monitor: S.optional(S.Boolean),
    Tier: S.optional(Tier),
    ComponentConfiguration: S.optional(S.String),
    AutoConfigEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateComponentConfigurationRequest",
}) as any as S.Schema<UpdateComponentConfigurationRequest>;
export interface UpdateComponentConfigurationResponse {}
export const UpdateComponentConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateComponentConfigurationResponse",
}) as any as S.Schema<UpdateComponentConfigurationResponse>;
export interface UpdateLogPatternRequest {
  ResourceGroupName: string;
  PatternSetName: string;
  PatternName: string;
  Pattern?: string;
  Rank?: number;
}
export const UpdateLogPatternRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    PatternSetName: S.String,
    PatternName: S.String,
    Pattern: S.optional(S.String),
    Rank: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLogPatternRequest",
}) as any as S.Schema<UpdateLogPatternRequest>;
export interface UpdateLogPatternResponse {
  ResourceGroupName?: string;
  LogPattern?: LogPattern;
}
export const UpdateLogPatternResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.optional(S.String),
    LogPattern: S.optional(LogPattern),
  }),
).annotate({
  identifier: "UpdateLogPatternResponse",
}) as any as S.Schema<UpdateLogPatternResponse>;
export type UpdateStatus = "RESOLVED" | (string & {});
export const UpdateStatus = /*@__PURE__*/ S.String;

export interface UpdateProblemRequest {
  ProblemId: string;
  UpdateStatus?: UpdateStatus;
  Visibility?: Visibility;
}
export const UpdateProblemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProblemId: S.String,
    UpdateStatus: S.optional(UpdateStatus),
    Visibility: S.optional(Visibility),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProblemRequest",
}) as any as S.Schema<UpdateProblemRequest>;
export interface UpdateProblemResponse {}
export const UpdateProblemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateProblemResponse",
}) as any as S.Schema<UpdateProblemResponse>;
export interface UpdateWorkloadRequest {
  ResourceGroupName: string;
  ComponentName: string;
  WorkloadId?: string;
  WorkloadConfiguration: WorkloadConfiguration;
}
export const UpdateWorkloadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceGroupName: S.String,
    ComponentName: S.String,
    WorkloadId: S.optional(S.String),
    WorkloadConfiguration: WorkloadConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateWorkloadRequest",
}) as any as S.Schema<UpdateWorkloadRequest>;
export interface UpdateWorkloadResponse {
  WorkloadId?: string;
  WorkloadConfiguration?: WorkloadConfiguration;
}
export const UpdateWorkloadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkloadId: S.optional(S.String),
    WorkloadConfiguration: S.optional(WorkloadConfiguration),
  }),
).annotate({
  identifier: "UpdateWorkloadResponse",
}) as any as S.Schema<UpdateWorkloadResponse>;
export type ErrorMsg = string;
export type ExceptionMessage = string;
export type AddWorkloadError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a workload to a component. Each component can have at most five workloads.
 */
export const addWorkload: API.OperationMethod<
  AddWorkloadRequest,
  AddWorkloadResponse,
  AddWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddWorkloadRequest,
  output: AddWorkloadResponse,
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddWorkload",
}));

export type CreateApplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | TagsAlreadyExistException
  | ValidationException
  | CommonErrors;
/**
 * Adds an application that is created from a resource group.
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
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    TagsAlreadyExistException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateComponentError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom component by grouping similar standalone instances to monitor.
 */
export const createComponent: API.OperationMethod<
  CreateComponentRequest,
  CreateComponentResponse,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComponentRequest,
  output: CreateComponentResponse,
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponent",
}));

export type CreateLogPatternError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds an log pattern to a `LogPatternSet`.
 */
export const createLogPattern: API.OperationMethod<
  CreateLogPatternRequest,
  CreateLogPatternResponse,
  CreateLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLogPatternRequest,
  output: CreateLogPatternResponse,
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLogPattern",
}));

export type DeleteApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified application from monitoring. Does not delete the
 * application.
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
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteComponentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Ungroups a custom component. When you ungroup custom components, all applicable monitors
 * that are set up for the component are removed and the instances revert to their standalone
 * status.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComponentRequest,
  output: DeleteComponentResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponent",
}));

export type DeleteLogPatternError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified log pattern from a `LogPatternSet`.
 */
export const deleteLogPattern: API.OperationMethod<
  DeleteLogPatternRequest,
  DeleteLogPatternResponse,
  DeleteLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLogPatternRequest,
  output: DeleteLogPatternResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLogPattern",
}));

export type DescribeApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the application.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationRequest,
  output: DescribeApplicationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
}));

export type DescribeComponentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes a component and lists the resources that are grouped together in a
 * component.
 */
export const describeComponent: API.OperationMethod<
  DescribeComponentRequest,
  DescribeComponentResponse,
  DescribeComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComponentRequest,
  output: DescribeComponentResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponent",
}));

export type DescribeComponentConfigurationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the monitoring configuration of the component.
 */
export const describeComponentConfiguration: API.OperationMethod<
  DescribeComponentConfigurationRequest,
  DescribeComponentConfigurationResponse,
  DescribeComponentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComponentConfigurationRequest,
  output: DescribeComponentConfigurationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponentConfiguration",
}));

export type DescribeComponentConfigurationRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the recommended monitoring configuration of the component.
 */
export const describeComponentConfigurationRecommendation: API.OperationMethod<
  DescribeComponentConfigurationRecommendationRequest,
  DescribeComponentConfigurationRecommendationResponse,
  DescribeComponentConfigurationRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeComponentConfigurationRecommendationRequest,
  output: DescribeComponentConfigurationRecommendationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeComponentConfigurationRecommendation",
}));

export type DescribeLogPatternError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describe a specific log pattern from a `LogPatternSet`.
 */
export const describeLogPattern: API.OperationMethod<
  DescribeLogPatternRequest,
  DescribeLogPatternResponse,
  DescribeLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLogPatternRequest,
  output: DescribeLogPatternResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLogPattern",
}));

export type DescribeObservationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes an anomaly or error with the application.
 */
export const describeObservation: API.OperationMethod<
  DescribeObservationRequest,
  DescribeObservationResponse,
  DescribeObservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeObservationRequest,
  output: DescribeObservationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObservation",
}));

export type DescribeProblemError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes an application problem.
 */
export const describeProblem: API.OperationMethod<
  DescribeProblemRequest,
  DescribeProblemResponse,
  DescribeProblemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProblemRequest,
  output: DescribeProblemResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProblem",
}));

export type DescribeProblemObservationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the anomalies or errors associated with the problem.
 */
export const describeProblemObservations: API.OperationMethod<
  DescribeProblemObservationsRequest,
  DescribeProblemObservationsResponse,
  DescribeProblemObservationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProblemObservationsRequest,
  output: DescribeProblemObservationsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProblemObservations",
}));

export type DescribeWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes a workload and its configuration.
 */
export const describeWorkload: API.OperationMethod<
  DescribeWorkloadRequest,
  DescribeWorkloadResponse,
  DescribeWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWorkloadRequest,
  output: DescribeWorkloadResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkload",
}));

export type ListApplicationsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the IDs of the applications that you are monitoring.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the auto-grouped, standalone, and custom components of the application.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsRequest,
  output: ListComponentsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationHistoryError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the INFO, WARN, and ERROR events for periodic configuration updates performed by
 * Application Insights. Examples of events represented are:
 *
 * - INFO: creating a new alarm or updating an alarm threshold.
 *
 * - WARN: alarm not created due to insufficient data points used to predict
 * thresholds.
 *
 * - ERROR: alarm not created due to permission errors or exceeding quotas.
 */
export const listConfigurationHistory: API.PaginatedOperationMethod<
  ListConfigurationHistoryRequest,
  ListConfigurationHistoryResponse,
  ListConfigurationHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationHistoryRequest,
  output: ListConfigurationHistoryResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLogPatternsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the log patterns in the specific log `LogPatternSet`.
 */
export const listLogPatterns: API.PaginatedOperationMethod<
  ListLogPatternsRequest,
  ListLogPatternsResponse,
  ListLogPatternsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLogPatternsRequest,
  output: ListLogPatternsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogPatterns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLogPatternSetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the log pattern sets in the specific application.
 */
export const listLogPatternSets: API.PaginatedOperationMethod<
  ListLogPatternSetsRequest,
  ListLogPatternSetsResponse,
  ListLogPatternSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLogPatternSetsRequest,
  output: ListLogPatternSetsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLogPatternSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProblemsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the problems with your application.
 */
export const listProblems: API.PaginatedOperationMethod<
  ListProblemsRequest,
  ListProblemsResponse,
  ListProblemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProblemsRequest,
  output: ListProblemsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProblems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve a list of the tags (keys and values) that are associated with a specified
 * application. A *tag* is a label that you optionally define and associate
 * with an application. Each tag consists of a required *tag key* and an
 * optional associated *tag value*. A tag key is a general label that acts
 * as a category for more specific tag values. A tag value acts as a descriptor within a tag
 * key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWorkloadsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workloads that are configured on a given component.
 */
export const listWorkloads: API.PaginatedOperationMethod<
  ListWorkloadsRequest,
  ListWorkloadsResponse,
  ListWorkloadsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadsRequest,
  output: ListWorkloadsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloads",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type RemoveWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove workload from a component.
 */
export const removeWorkload: API.OperationMethod<
  RemoveWorkloadRequest,
  RemoveWorkloadResponse,
  RemoveWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveWorkloadRequest,
  output: RemoveWorkloadResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveWorkload",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Add one or more tags (keys and values) to a specified application. A
 * *tag* is a label that you optionally define and associate with an
 * application. Tags can help you categorize and manage application in different ways, such as
 * by purpose, owner, environment, or other criteria.
 *
 * Each tag consists of a required *tag key* and an associated
 * *tag value*, both of which you define. A tag key is a general label
 * that acts as a category for more specific tag values. A tag value acts as a descriptor
 * within a tag key.
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
    ResourceNotFoundException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove one or more tags (keys and values) from a specified application.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the application.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateComponentError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the custom component name and/or the list of resources that make up the
 * component.
 */
export const updateComponent: API.OperationMethod<
  UpdateComponentRequest,
  UpdateComponentResponse,
  UpdateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComponentRequest,
  output: UpdateComponentResponse,
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponent",
}));

export type UpdateComponentConfigurationError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the monitoring configurations for the component. The configuration input
 * parameter is an escaped JSON of the configuration and should match the schema of what is
 * returned by `DescribeComponentConfigurationRecommendation`.
 */
export const updateComponentConfiguration: API.OperationMethod<
  UpdateComponentConfigurationRequest,
  UpdateComponentConfigurationResponse,
  UpdateComponentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComponentConfigurationRequest,
  output: UpdateComponentConfigurationResponse,
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponentConfiguration",
}));

export type UpdateLogPatternError =
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a log pattern to a `LogPatternSet`.
 */
export const updateLogPattern: API.OperationMethod<
  UpdateLogPatternRequest,
  UpdateLogPatternResponse,
  UpdateLogPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLogPatternRequest,
  output: UpdateLogPatternResponse,
  errors: [
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLogPattern",
}));

export type UpdateProblemError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the visibility of the problem or specifies the problem as
 * `RESOLVED`.
 */
export const updateProblem: API.OperationMethod<
  UpdateProblemRequest,
  UpdateProblemResponse,
  UpdateProblemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProblemRequest,
  output: UpdateProblemResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProblem",
}));

export type UpdateWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a workload to a component. Each component can have at most five workloads.
 */
export const updateWorkload: API.OperationMethod<
  UpdateWorkloadRequest,
  UpdateWorkloadResponse,
  UpdateWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkloadRequest,
  output: UpdateWorkloadResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkload",
}));
