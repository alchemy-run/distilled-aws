import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace(
  "http://elasticbeanstalk.amazonaws.com/docs/2010-12-01/",
);
const svc = T.AwsApiService({
  sdkId: "Elastic Beanstalk",
  serviceShapeName: "AWSElasticBeanstalkService",
});
const auth = T.AwsAuthSigv4({ name: "elasticbeanstalk" });
const ver = T.ServiceVersion("2010-12-01");
const proto = T.AwsProtocolsAwsQuery();
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
              `https://elasticbeanstalk-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://elasticbeanstalk.${Region}.amazonaws.com`);
            }
            return e(
              `https://elasticbeanstalk-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticbeanstalk.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://elasticbeanstalk.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CodeBuildNotInServiceRegionException
  extends /*@__PURE__*/ S.TaggedError<CodeBuildNotInServiceRegionException>()(
    "CodeBuildNotInServiceRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CodeBuildNotInServiceRegionException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ElasticBeanstalkServiceException
  extends /*@__PURE__*/ S.TaggedError<ElasticBeanstalkServiceException>()(
    "ElasticBeanstalkServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InsufficientPrivilegesException
  extends /*@__PURE__*/ S.TaggedError<InsufficientPrivilegesException>()(
    "InsufficientPrivilegesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientPrivilegesException",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidRequestException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ManagedActionInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<ManagedActionInvalidStateException>()(
    "ManagedActionInvalidStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ManagedActionInvalidStateException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationInProgressException
  extends /*@__PURE__*/ S.TaggedError<OperationInProgressException>()(
    "OperationInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "OperationInProgressFailure",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PlatformVersionStillReferencedException
  extends /*@__PURE__*/ S.TaggedError<PlatformVersionStillReferencedException>()(
    "PlatformVersionStillReferencedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "PlatformVersionStillReferencedException",
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
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceTypeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ResourceTypeNotSupportedException>()(
    "ResourceTypeNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceTypeNotSupportedException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class S3LocationNotInServiceRegionException
  extends /*@__PURE__*/ S.TaggedError<S3LocationNotInServiceRegionException>()(
    "S3LocationNotInServiceRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "S3LocationNotInServiceRegionException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class S3SubscriptionRequiredException
  extends /*@__PURE__*/ S.TaggedError<S3SubscriptionRequiredException>()(
    "S3SubscriptionRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "S3SubscriptionRequiredException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SourceBundleDeletionException
  extends /*@__PURE__*/ S.TaggedError<SourceBundleDeletionException>()(
    "SourceBundleDeletionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "SourceBundleDeletionFailure",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyApplicationsException
  extends /*@__PURE__*/ S.TaggedError<TooManyApplicationsException>()(
    "TooManyApplicationsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyApplicationsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyApplicationVersionsException
  extends /*@__PURE__*/ S.TaggedError<TooManyApplicationVersionsException>()(
    "TooManyApplicationVersionsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TooManyBucketsException
  extends /*@__PURE__*/ S.TaggedError<TooManyBucketsException>()(
    "TooManyBucketsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyBucketsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyConfigurationTemplatesException
  extends /*@__PURE__*/ S.TaggedError<TooManyConfigurationTemplatesException>()(
    "TooManyConfigurationTemplatesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyConfigurationTemplatesException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyEnvironmentsException
  extends /*@__PURE__*/ S.TaggedError<TooManyEnvironmentsException>()(
    "TooManyEnvironmentsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyEnvironmentsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyPlatformsException
  extends /*@__PURE__*/ S.TaggedError<TooManyPlatformsException>()(
    "TooManyPlatformsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TooManyPlatformsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TooManyTagsException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type EnvironmentId = string;
export type EnvironmentName = string;
export interface AbortEnvironmentUpdateMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export const AbortEnvironmentUpdateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AbortEnvironmentUpdateMessage",
}) as any as S.Schema<AbortEnvironmentUpdateMessage>;
export interface AbortEnvironmentUpdateResponse {}
export const AbortEnvironmentUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AbortEnvironmentUpdateResponse",
}) as any as S.Schema<AbortEnvironmentUpdateResponse>;
export interface ApplyEnvironmentManagedActionRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  ActionId: string;
}
export const ApplyEnvironmentManagedActionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnvironmentName: S.optional(S.String),
      EnvironmentId: S.optional(S.String),
      ActionId: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ApplyEnvironmentManagedActionRequest",
}) as any as S.Schema<ApplyEnvironmentManagedActionRequest>;
export type ActionType =
  | "InstanceRefresh"
  | "PlatformUpdate"
  | "Unknown"
  | (string & {});
export const ActionType = /*@__PURE__*/ S.String;

export interface ApplyEnvironmentManagedActionResult {
  ActionId?: string;
  ActionDescription?: string;
  ActionType?: ActionType;
  Status?: string;
}
export const ApplyEnvironmentManagedActionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionId: S.optional(S.String),
    ActionDescription: S.optional(S.String),
    ActionType: S.optional(ActionType),
    Status: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ApplyEnvironmentManagedActionResult",
}) as any as S.Schema<ApplyEnvironmentManagedActionResult>;
export type OperationsRole = string;
export interface AssociateEnvironmentOperationsRoleMessage {
  EnvironmentName: string;
  OperationsRole: string;
}
export const AssociateEnvironmentOperationsRoleMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EnvironmentName: S.String, OperationsRole: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AssociateEnvironmentOperationsRoleMessage",
  }) as any as S.Schema<AssociateEnvironmentOperationsRoleMessage>;
export interface AssociateEnvironmentOperationsRoleResponse {}
export const AssociateEnvironmentOperationsRoleResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AssociateEnvironmentOperationsRoleResponse",
  }) as any as S.Schema<AssociateEnvironmentOperationsRoleResponse>;
export type DNSCnamePrefix = string;
export interface CheckDNSAvailabilityMessage {
  CNAMEPrefix: string;
}
export const CheckDNSAvailabilityMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CNAMEPrefix: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CheckDNSAvailabilityMessage",
}) as any as S.Schema<CheckDNSAvailabilityMessage>;
export type CnameAvailability = boolean;
export type DNSCname = string;
export interface CheckDNSAvailabilityResultMessage {
  Available?: boolean;
  FullyQualifiedCNAME?: string;
}
export const CheckDNSAvailabilityResultMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Available: S.optional(S.Boolean),
    FullyQualifiedCNAME: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CheckDNSAvailabilityResultMessage",
}) as any as S.Schema<CheckDNSAvailabilityResultMessage>;
export type ApplicationName = string;
export type GroupName = string;
export type VersionLabel = string;
export type VersionLabels = string[];
export const VersionLabels = /*@__PURE__*/ S.Array(S.String);
export interface ComposeEnvironmentsMessage {
  ApplicationName?: string;
  GroupName?: string;
  VersionLabels?: string[];
}
export const ComposeEnvironmentsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    GroupName: S.optional(S.String),
    VersionLabels: S.optional(VersionLabels),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ComposeEnvironmentsMessage",
}) as any as S.Schema<ComposeEnvironmentsMessage>;
export type SolutionStackName = string;
export type PlatformArn = string;
export type ConfigurationTemplateName = string;
export type Description = string;
export type EndpointURL = string;
export type CreationDate = Date;
export type UpdateDate = Date;
export type EnvironmentStatus =
  | "Aborting"
  | "Launching"
  | "Updating"
  | "LinkingFrom"
  | "LinkingTo"
  | "Ready"
  | "Terminating"
  | "Terminated"
  | (string & {});
export const EnvironmentStatus = /*@__PURE__*/ S.String;

export type AbortableOperationInProgress = boolean;
export type EnvironmentHealth =
  | "Green"
  | "Yellow"
  | "Red"
  | "Grey"
  | (string & {});
export const EnvironmentHealth = /*@__PURE__*/ S.String;

export type EnvironmentHealthStatus =
  | "NoData"
  | "Unknown"
  | "Pending"
  | "Ok"
  | "Info"
  | "Warning"
  | "Degraded"
  | "Severe"
  | "Suspended"
  | (string & {});
export const EnvironmentHealthStatus = /*@__PURE__*/ S.String;

export interface Listener {
  Protocol?: string;
  Port?: number;
}
export const Listener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Protocol: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({ identifier: "Listener" }) as any as S.Schema<Listener>;
export type LoadBalancerListenersDescription = Listener[];
export const LoadBalancerListenersDescription = /*@__PURE__*/ S.Array(Listener);
export interface LoadBalancerDescription {
  LoadBalancerName?: string;
  Domain?: string;
  Listeners?: Listener[];
}
export const LoadBalancerDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoadBalancerName: S.optional(S.String),
    Domain: S.optional(S.String),
    Listeners: S.optional(LoadBalancerListenersDescription),
  }),
).annotate({
  identifier: "LoadBalancerDescription",
}) as any as S.Schema<LoadBalancerDescription>;
export interface EnvironmentResourcesDescription {
  LoadBalancer?: LoadBalancerDescription;
}
export const EnvironmentResourcesDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoadBalancer: S.optional(LoadBalancerDescription) }),
).annotate({
  identifier: "EnvironmentResourcesDescription",
}) as any as S.Schema<EnvironmentResourcesDescription>;
export interface EnvironmentTier {
  Name?: string;
  Type?: string;
  Version?: string;
}
export const EnvironmentTier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentTier",
}) as any as S.Schema<EnvironmentTier>;
export interface EnvironmentLink {
  LinkName?: string;
  EnvironmentName?: string;
}
export const EnvironmentLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkName: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentLink",
}) as any as S.Schema<EnvironmentLink>;
export type EnvironmentLinks = EnvironmentLink[];
export const EnvironmentLinks = /*@__PURE__*/ S.Array(EnvironmentLink);
export type EnvironmentArn = string;
export interface EnvironmentDescription {
  EnvironmentName?: string;
  EnvironmentId?: string;
  ApplicationName?: string;
  VersionLabel?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  TemplateName?: string;
  Description?: string;
  EndpointURL?: string;
  CNAME?: string;
  DateCreated?: Date;
  DateUpdated?: Date;
  Status?: EnvironmentStatus;
  AbortableOperationInProgress?: boolean;
  Health?: EnvironmentHealth;
  HealthStatus?: EnvironmentHealthStatus;
  Resources?: EnvironmentResourcesDescription;
  Tier?: EnvironmentTier;
  EnvironmentLinks?: EnvironmentLink[];
  EnvironmentArn?: string;
  OperationsRole?: string;
}
export const EnvironmentDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentName: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    ApplicationName: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    TemplateName: S.optional(S.String),
    Description: S.optional(S.String),
    EndpointURL: S.optional(S.String),
    CNAME: S.optional(S.String),
    DateCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DateUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(EnvironmentStatus),
    AbortableOperationInProgress: S.optional(S.Boolean),
    Health: S.optional(EnvironmentHealth),
    HealthStatus: S.optional(EnvironmentHealthStatus),
    Resources: S.optional(EnvironmentResourcesDescription),
    Tier: S.optional(EnvironmentTier),
    EnvironmentLinks: S.optional(EnvironmentLinks),
    EnvironmentArn: S.optional(S.String),
    OperationsRole: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EnvironmentDescription",
}) as any as S.Schema<EnvironmentDescription>;
export type EnvironmentDescriptionsList = EnvironmentDescription[];
export const EnvironmentDescriptionsList = /*@__PURE__*/ S.Array(
  EnvironmentDescription,
);
export type Token = string;
export interface EnvironmentDescriptionsMessage {
  Environments?: EnvironmentDescription[];
  NextToken?: string;
}
export const EnvironmentDescriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Environments: S.optional(EnvironmentDescriptionsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EnvironmentDescriptionsMessage",
}) as any as S.Schema<EnvironmentDescriptionsMessage>;
export type BoxedBoolean = boolean;
export type BoxedInt = number;
export interface MaxCountRule {
  Enabled: boolean;
  MaxCount?: number;
  DeleteSourceFromS3?: boolean;
}
export const MaxCountRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    MaxCount: S.optional(S.Number),
    DeleteSourceFromS3: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MaxCountRule" }) as any as S.Schema<MaxCountRule>;
export interface MaxAgeRule {
  Enabled: boolean;
  MaxAgeInDays?: number;
  DeleteSourceFromS3?: boolean;
}
export const MaxAgeRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    MaxAgeInDays: S.optional(S.Number),
    DeleteSourceFromS3: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MaxAgeRule" }) as any as S.Schema<MaxAgeRule>;
export interface ApplicationVersionLifecycleConfig {
  MaxCountRule?: MaxCountRule;
  MaxAgeRule?: MaxAgeRule;
}
export const ApplicationVersionLifecycleConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxCountRule: S.optional(MaxCountRule),
    MaxAgeRule: S.optional(MaxAgeRule),
  }),
).annotate({
  identifier: "ApplicationVersionLifecycleConfig",
}) as any as S.Schema<ApplicationVersionLifecycleConfig>;
export interface ApplicationResourceLifecycleConfig {
  ServiceRole?: string;
  VersionLifecycleConfig?: ApplicationVersionLifecycleConfig;
}
export const ApplicationResourceLifecycleConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceRole: S.optional(S.String),
    VersionLifecycleConfig: S.optional(ApplicationVersionLifecycleConfig),
  }),
).annotate({
  identifier: "ApplicationResourceLifecycleConfig",
}) as any as S.Schema<ApplicationResourceLifecycleConfig>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateApplicationMessage {
  ApplicationName: string;
  Description?: string;
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
  Tags?: Tag[];
}
export const CreateApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    Description: S.optional(S.String),
    ResourceLifecycleConfig: S.optional(ApplicationResourceLifecycleConfig),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationMessage",
}) as any as S.Schema<CreateApplicationMessage>;
export type ApplicationArn = string;
export type VersionLabelsList = string[];
export const VersionLabelsList = /*@__PURE__*/ S.Array(S.String);
export type ConfigurationTemplateNamesList = string[];
export const ConfigurationTemplateNamesList = /*@__PURE__*/ S.Array(S.String);
export interface ApplicationDescription {
  ApplicationArn?: string;
  ApplicationName?: string;
  Description?: string;
  DateCreated?: Date;
  DateUpdated?: Date;
  Versions?: string[];
  ConfigurationTemplates?: string[];
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
}
export const ApplicationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationArn: S.optional(S.String),
    ApplicationName: S.optional(S.String),
    Description: S.optional(S.String),
    DateCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DateUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Versions: S.optional(VersionLabelsList),
    ConfigurationTemplates: S.optional(ConfigurationTemplateNamesList),
    ResourceLifecycleConfig: S.optional(ApplicationResourceLifecycleConfig),
  }),
).annotate({
  identifier: "ApplicationDescription",
}) as any as S.Schema<ApplicationDescription>;
export interface ApplicationDescriptionMessage {
  Application?: ApplicationDescription;
}
export const ApplicationDescriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Application: S.optional(ApplicationDescription) }).pipe(ns),
).annotate({
  identifier: "ApplicationDescriptionMessage",
}) as any as S.Schema<ApplicationDescriptionMessage>;
export type SourceType = "Git" | "Zip" | (string & {});
export const SourceType = /*@__PURE__*/ S.String;

export type SourceRepository = "CodeCommit" | "S3" | (string & {});
export const SourceRepository = /*@__PURE__*/ S.String;

export type SourceLocation = string;
export interface SourceBuildInformation {
  SourceType: SourceType;
  SourceRepository: SourceRepository;
  SourceLocation: string;
}
export const SourceBuildInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: SourceType,
    SourceRepository: SourceRepository,
    SourceLocation: S.String,
  }),
).annotate({
  identifier: "SourceBuildInformation",
}) as any as S.Schema<SourceBuildInformation>;
export type S3Bucket = string;
export type S3Key = string;
export interface S3Location {
  S3Bucket?: string;
  S3Key?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.optional(S.String), S3Key: S.optional(S.String) }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type NonEmptyString = string;
export type ComputeType =
  | "BUILD_GENERAL1_SMALL"
  | "BUILD_GENERAL1_MEDIUM"
  | "BUILD_GENERAL1_LARGE"
  | (string & {});
export const ComputeType = /*@__PURE__*/ S.String;

export interface BuildConfiguration {
  ArtifactName?: string;
  CodeBuildServiceRole: string;
  ComputeType?: ComputeType;
  Image: string;
  TimeoutInMinutes?: number;
}
export const BuildConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArtifactName: S.optional(S.String),
    CodeBuildServiceRole: S.String,
    ComputeType: S.optional(ComputeType),
    Image: S.String,
    TimeoutInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "BuildConfiguration",
}) as any as S.Schema<BuildConfiguration>;
export type AutoCreateApplication = boolean;
export type ApplicationVersionProccess = boolean;
export interface CreateApplicationVersionMessage {
  ApplicationName: string;
  VersionLabel: string;
  Description?: string;
  SourceBuildInformation?: SourceBuildInformation;
  SourceBundle?: S3Location;
  BuildConfiguration?: BuildConfiguration;
  AutoCreateApplication?: boolean;
  Process?: boolean;
  Tags?: Tag[];
}
export const CreateApplicationVersionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    VersionLabel: S.String,
    Description: S.optional(S.String),
    SourceBuildInformation: S.optional(SourceBuildInformation),
    SourceBundle: S.optional(S3Location),
    BuildConfiguration: S.optional(BuildConfiguration),
    AutoCreateApplication: S.optional(S.Boolean),
    Process: S.optional(S.Boolean),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationVersionMessage",
}) as any as S.Schema<CreateApplicationVersionMessage>;
export type ApplicationVersionArn = string;
export type ApplicationVersionStatus =
  | "Processed"
  | "Unprocessed"
  | "Failed"
  | "Processing"
  | "Building"
  | (string & {});
export const ApplicationVersionStatus = /*@__PURE__*/ S.String;

export interface ApplicationVersionDescription {
  ApplicationVersionArn?: string;
  ApplicationName?: string;
  Description?: string;
  VersionLabel?: string;
  SourceBuildInformation?: SourceBuildInformation;
  BuildArn?: string;
  SourceBundle?: S3Location;
  DateCreated?: Date;
  DateUpdated?: Date;
  Status?: ApplicationVersionStatus;
}
export const ApplicationVersionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationVersionArn: S.optional(S.String),
    ApplicationName: S.optional(S.String),
    Description: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    SourceBuildInformation: S.optional(SourceBuildInformation),
    BuildArn: S.optional(S.String),
    SourceBundle: S.optional(S3Location),
    DateCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DateUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(ApplicationVersionStatus),
  }),
).annotate({
  identifier: "ApplicationVersionDescription",
}) as any as S.Schema<ApplicationVersionDescription>;
export interface ApplicationVersionDescriptionMessage {
  ApplicationVersion?: ApplicationVersionDescription;
}
export const ApplicationVersionDescriptionMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationVersion: S.optional(ApplicationVersionDescription),
    }).pipe(ns),
).annotate({
  identifier: "ApplicationVersionDescriptionMessage",
}) as any as S.Schema<ApplicationVersionDescriptionMessage>;
export interface SourceConfiguration {
  ApplicationName?: string;
  TemplateName?: string;
}
export const SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    TemplateName: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type ResourceName = string;
export type OptionNamespace = string;
export type ConfigurationOptionName = string;
export type ConfigurationOptionValue = string;
export interface ConfigurationOptionSetting {
  ResourceName?: string;
  Namespace?: string;
  OptionName?: string;
  Value?: string;
}
export const ConfigurationOptionSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
    Namespace: S.optional(S.String),
    OptionName: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationOptionSetting",
}) as any as S.Schema<ConfigurationOptionSetting>;
export type ConfigurationOptionSettingsList = ConfigurationOptionSetting[];
export const ConfigurationOptionSettingsList = /*@__PURE__*/ S.Array(
  ConfigurationOptionSetting,
);
export interface CreateConfigurationTemplateMessage {
  ApplicationName: string;
  TemplateName: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  SourceConfiguration?: SourceConfiguration;
  EnvironmentId?: string;
  Description?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  Tags?: Tag[];
}
export const CreateConfigurationTemplateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    TemplateName: S.String,
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    SourceConfiguration: S.optional(SourceConfiguration),
    EnvironmentId: S.optional(S.String),
    Description: S.optional(S.String),
    OptionSettings: S.optional(ConfigurationOptionSettingsList),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationTemplateMessage",
}) as any as S.Schema<CreateConfigurationTemplateMessage>;
export type ConfigurationDeploymentStatus =
  | "deployed"
  | "pending"
  | "failed"
  | (string & {});
export const ConfigurationDeploymentStatus = /*@__PURE__*/ S.String;

export interface ConfigurationSettingsDescription {
  SolutionStackName?: string;
  PlatformArn?: string;
  ApplicationName?: string;
  TemplateName?: string;
  Description?: string;
  EnvironmentName?: string;
  DeploymentStatus?: ConfigurationDeploymentStatus;
  DateCreated?: Date;
  DateUpdated?: Date;
  OptionSettings?: ConfigurationOptionSetting[];
}
export const ConfigurationSettingsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    ApplicationName: S.optional(S.String),
    TemplateName: S.optional(S.String),
    Description: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    DeploymentStatus: S.optional(ConfigurationDeploymentStatus),
    DateCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DateUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    OptionSettings: S.optional(ConfigurationOptionSettingsList),
  }).pipe(ns),
).annotate({
  identifier: "ConfigurationSettingsDescription",
}) as any as S.Schema<ConfigurationSettingsDescription>;
export interface OptionSpecification {
  ResourceName?: string;
  Namespace?: string;
  OptionName?: string;
}
export const OptionSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceName: S.optional(S.String),
    Namespace: S.optional(S.String),
    OptionName: S.optional(S.String),
  }),
).annotate({
  identifier: "OptionSpecification",
}) as any as S.Schema<OptionSpecification>;
export type OptionsSpecifierList = OptionSpecification[];
export const OptionsSpecifierList = /*@__PURE__*/ S.Array(OptionSpecification);
export interface CreateEnvironmentMessage {
  ApplicationName: string;
  EnvironmentName?: string;
  GroupName?: string;
  Description?: string;
  CNAMEPrefix?: string;
  Tier?: EnvironmentTier;
  Tags?: Tag[];
  VersionLabel?: string;
  TemplateName?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  OptionsToRemove?: OptionSpecification[];
  OperationsRole?: string;
}
export const CreateEnvironmentMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    EnvironmentName: S.optional(S.String),
    GroupName: S.optional(S.String),
    Description: S.optional(S.String),
    CNAMEPrefix: S.optional(S.String),
    Tier: S.optional(EnvironmentTier),
    Tags: S.optional(Tags),
    VersionLabel: S.optional(S.String),
    TemplateName: S.optional(S.String),
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    OptionSettings: S.optional(ConfigurationOptionSettingsList),
    OptionsToRemove: S.optional(OptionsSpecifierList),
    OperationsRole: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentMessage",
}) as any as S.Schema<CreateEnvironmentMessage>;
export type PlatformName = string;
export type PlatformVersion = string;
export interface CreatePlatformVersionRequest {
  PlatformName: string;
  PlatformVersion: string;
  PlatformDefinitionBundle: S3Location;
  EnvironmentName?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  Tags?: Tag[];
}
export const CreatePlatformVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformName: S.String,
    PlatformVersion: S.String,
    PlatformDefinitionBundle: S3Location,
    EnvironmentName: S.optional(S.String),
    OptionSettings: S.optional(ConfigurationOptionSettingsList),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePlatformVersionRequest",
}) as any as S.Schema<CreatePlatformVersionRequest>;
export type PlatformOwner = string;
export type PlatformStatus =
  | "Creating"
  | "Failed"
  | "Ready"
  | "Deleting"
  | "Deleted"
  | (string & {});
export const PlatformStatus = /*@__PURE__*/ S.String;

export type PlatformCategory = string;
export type OperatingSystemName = string;
export type OperatingSystemVersion = string;
export type SupportedTier = string;
export type SupportedTierList = string[];
export const SupportedTierList = /*@__PURE__*/ S.Array(S.String);
export type SupportedAddon = string;
export type SupportedAddonList = string[];
export const SupportedAddonList = /*@__PURE__*/ S.Array(S.String);
export type PlatformLifecycleState = string;
export type BranchName = string;
export type PlatformBranchLifecycleState = string;
export interface PlatformSummary {
  PlatformArn?: string;
  PlatformOwner?: string;
  PlatformStatus?: PlatformStatus;
  PlatformCategory?: string;
  OperatingSystemName?: string;
  OperatingSystemVersion?: string;
  SupportedTierList?: string[];
  SupportedAddonList?: string[];
  PlatformLifecycleState?: string;
  PlatformVersion?: string;
  PlatformBranchName?: string;
  PlatformBranchLifecycleState?: string;
}
export const PlatformSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformArn: S.optional(S.String),
    PlatformOwner: S.optional(S.String),
    PlatformStatus: S.optional(PlatformStatus),
    PlatformCategory: S.optional(S.String),
    OperatingSystemName: S.optional(S.String),
    OperatingSystemVersion: S.optional(S.String),
    SupportedTierList: S.optional(SupportedTierList),
    SupportedAddonList: S.optional(SupportedAddonList),
    PlatformLifecycleState: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    PlatformBranchName: S.optional(S.String),
    PlatformBranchLifecycleState: S.optional(S.String),
  }),
).annotate({
  identifier: "PlatformSummary",
}) as any as S.Schema<PlatformSummary>;
export type ARN = string;
export interface Builder {
  ARN?: string;
}
export const Builder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String) }),
).annotate({ identifier: "Builder" }) as any as S.Schema<Builder>;
export interface CreatePlatformVersionResult {
  PlatformSummary?: PlatformSummary;
  Builder?: Builder;
}
export const CreatePlatformVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformSummary: S.optional(PlatformSummary),
    Builder: S.optional(Builder),
  }).pipe(ns),
).annotate({
  identifier: "CreatePlatformVersionResult",
}) as any as S.Schema<CreatePlatformVersionResult>;
export interface CreateStorageLocationRequest {}
export const CreateStorageLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStorageLocationRequest",
}) as any as S.Schema<CreateStorageLocationRequest>;
export interface CreateStorageLocationResultMessage {
  S3Bucket?: string;
}
export const CreateStorageLocationResultMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateStorageLocationResultMessage",
}) as any as S.Schema<CreateStorageLocationResultMessage>;
export type TerminateEnvForce = boolean;
export interface DeleteApplicationMessage {
  ApplicationName: string;
  TerminateEnvByForce?: boolean;
}
export const DeleteApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    TerminateEnvByForce: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationMessage",
}) as any as S.Schema<DeleteApplicationMessage>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export type DeleteSourceBundle = boolean;
export interface DeleteApplicationVersionMessage {
  ApplicationName: string;
  VersionLabel: string;
  DeleteSourceBundle?: boolean;
}
export const DeleteApplicationVersionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    VersionLabel: S.String,
    DeleteSourceBundle: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationVersionMessage",
}) as any as S.Schema<DeleteApplicationVersionMessage>;
export interface DeleteApplicationVersionResponse {}
export const DeleteApplicationVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationVersionResponse",
}) as any as S.Schema<DeleteApplicationVersionResponse>;
export interface DeleteConfigurationTemplateMessage {
  ApplicationName: string;
  TemplateName: string;
}
export const DeleteConfigurationTemplateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String, TemplateName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationTemplateMessage",
}) as any as S.Schema<DeleteConfigurationTemplateMessage>;
export interface DeleteConfigurationTemplateResponse {}
export const DeleteConfigurationTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteConfigurationTemplateResponse",
}) as any as S.Schema<DeleteConfigurationTemplateResponse>;
export interface DeleteEnvironmentConfigurationMessage {
  ApplicationName: string;
  EnvironmentName: string;
}
export const DeleteEnvironmentConfigurationMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ApplicationName: S.String, EnvironmentName: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteEnvironmentConfigurationMessage",
}) as any as S.Schema<DeleteEnvironmentConfigurationMessage>;
export interface DeleteEnvironmentConfigurationResponse {}
export const DeleteEnvironmentConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEnvironmentConfigurationResponse",
}) as any as S.Schema<DeleteEnvironmentConfigurationResponse>;
export interface DeletePlatformVersionRequest {
  PlatformArn?: string;
}
export const DeletePlatformVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlatformArn: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePlatformVersionRequest",
}) as any as S.Schema<DeletePlatformVersionRequest>;
export interface DeletePlatformVersionResult {
  PlatformSummary?: PlatformSummary;
}
export const DeletePlatformVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlatformSummary: S.optional(PlatformSummary) }).pipe(ns),
).annotate({
  identifier: "DeletePlatformVersionResult",
}) as any as S.Schema<DeletePlatformVersionResult>;
export interface DescribeAccountAttributesRequest {}
export const DescribeAccountAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccountAttributesRequest",
}) as any as S.Schema<DescribeAccountAttributesRequest>;
export interface ResourceQuota {
  Maximum?: number;
}
export const ResourceQuota = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Maximum: S.optional(S.Number) }),
).annotate({ identifier: "ResourceQuota" }) as any as S.Schema<ResourceQuota>;
export interface ResourceQuotas {
  ApplicationQuota?: ResourceQuota;
  ApplicationVersionQuota?: ResourceQuota;
  EnvironmentQuota?: ResourceQuota;
  ConfigurationTemplateQuota?: ResourceQuota;
  CustomPlatformQuota?: ResourceQuota;
}
export const ResourceQuotas = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationQuota: S.optional(ResourceQuota),
    ApplicationVersionQuota: S.optional(ResourceQuota),
    EnvironmentQuota: S.optional(ResourceQuota),
    ConfigurationTemplateQuota: S.optional(ResourceQuota),
    CustomPlatformQuota: S.optional(ResourceQuota),
  }),
).annotate({ identifier: "ResourceQuotas" }) as any as S.Schema<ResourceQuotas>;
export interface DescribeAccountAttributesResult {
  ResourceQuotas?: ResourceQuotas;
}
export const DescribeAccountAttributesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceQuotas: S.optional(ResourceQuotas) }).pipe(ns),
).annotate({
  identifier: "DescribeAccountAttributesResult",
}) as any as S.Schema<DescribeAccountAttributesResult>;
export type ApplicationNamesList = string[];
export const ApplicationNamesList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeApplicationsMessage {
  ApplicationNames?: string[];
}
export const DescribeApplicationsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationNames: S.optional(ApplicationNamesList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationsMessage",
}) as any as S.Schema<DescribeApplicationsMessage>;
export type ApplicationDescriptionList = ApplicationDescription[];
export const ApplicationDescriptionList = /*@__PURE__*/ S.Array(
  ApplicationDescription,
);
export interface ApplicationDescriptionsMessage {
  Applications?: ApplicationDescription[];
}
export const ApplicationDescriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Applications: S.optional(ApplicationDescriptionList) }).pipe(ns),
).annotate({
  identifier: "ApplicationDescriptionsMessage",
}) as any as S.Schema<ApplicationDescriptionsMessage>;
export type MaxRecords = number;
export interface DescribeApplicationVersionsMessage {
  ApplicationName?: string;
  VersionLabels?: string[];
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeApplicationVersionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    VersionLabels: S.optional(VersionLabelsList),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationVersionsMessage",
}) as any as S.Schema<DescribeApplicationVersionsMessage>;
export type ApplicationVersionDescriptionList = ApplicationVersionDescription[];
export const ApplicationVersionDescriptionList = /*@__PURE__*/ S.Array(
  ApplicationVersionDescription,
);
export interface ApplicationVersionDescriptionsMessage {
  ApplicationVersions?: ApplicationVersionDescription[];
  NextToken?: string;
}
export const ApplicationVersionDescriptionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationVersions: S.optional(ApplicationVersionDescriptionList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ApplicationVersionDescriptionsMessage",
}) as any as S.Schema<ApplicationVersionDescriptionsMessage>;
export interface DescribeConfigurationOptionsMessage {
  ApplicationName?: string;
  TemplateName?: string;
  EnvironmentName?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  Options?: OptionSpecification[];
}
export const DescribeConfigurationOptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    TemplateName: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    Options: S.optional(OptionsSpecifierList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConfigurationOptionsMessage",
}) as any as S.Schema<DescribeConfigurationOptionsMessage>;
export type ConfigurationOptionDefaultValue = string;
export type ConfigurationOptionSeverity = string;
export type UserDefinedOption = boolean;
export type ConfigurationOptionValueType = "Scalar" | "List" | (string & {});
export const ConfigurationOptionValueType = /*@__PURE__*/ S.String;

export type ConfigurationOptionPossibleValue = string;
export type ConfigurationOptionPossibleValues = string[];
export const ConfigurationOptionPossibleValues = /*@__PURE__*/ S.Array(
  S.String,
);
export type OptionRestrictionMinValue = number;
export type OptionRestrictionMaxValue = number;
export type OptionRestrictionMaxLength = number;
export type RegexPattern = string;
export type RegexLabel = string;
export interface OptionRestrictionRegex {
  Pattern?: string;
  Label?: string;
}
export const OptionRestrictionRegex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pattern: S.optional(S.String), Label: S.optional(S.String) }),
).annotate({
  identifier: "OptionRestrictionRegex",
}) as any as S.Schema<OptionRestrictionRegex>;
export interface ConfigurationOptionDescription {
  Namespace?: string;
  Name?: string;
  DefaultValue?: string;
  ChangeSeverity?: string;
  UserDefined?: boolean;
  ValueType?: ConfigurationOptionValueType;
  ValueOptions?: string[];
  MinValue?: number;
  MaxValue?: number;
  MaxLength?: number;
  Regex?: OptionRestrictionRegex;
}
export const ConfigurationOptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    Name: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    ChangeSeverity: S.optional(S.String),
    UserDefined: S.optional(S.Boolean),
    ValueType: S.optional(ConfigurationOptionValueType),
    ValueOptions: S.optional(ConfigurationOptionPossibleValues),
    MinValue: S.optional(S.Number),
    MaxValue: S.optional(S.Number),
    MaxLength: S.optional(S.Number),
    Regex: S.optional(OptionRestrictionRegex),
  }),
).annotate({
  identifier: "ConfigurationOptionDescription",
}) as any as S.Schema<ConfigurationOptionDescription>;
export type ConfigurationOptionDescriptionsList =
  ConfigurationOptionDescription[];
export const ConfigurationOptionDescriptionsList = /*@__PURE__*/ S.Array(
  ConfigurationOptionDescription,
);
export interface ConfigurationOptionsDescription {
  SolutionStackName?: string;
  PlatformArn?: string;
  Options?: ConfigurationOptionDescription[];
}
export const ConfigurationOptionsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    Options: S.optional(ConfigurationOptionDescriptionsList),
  }).pipe(ns),
).annotate({
  identifier: "ConfigurationOptionsDescription",
}) as any as S.Schema<ConfigurationOptionsDescription>;
export interface DescribeConfigurationSettingsMessage {
  ApplicationName: string;
  TemplateName?: string;
  EnvironmentName?: string;
}
export const DescribeConfigurationSettingsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.String,
      TemplateName: S.optional(S.String),
      EnvironmentName: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeConfigurationSettingsMessage",
}) as any as S.Schema<DescribeConfigurationSettingsMessage>;
export type ConfigurationSettingsDescriptionList =
  ConfigurationSettingsDescription[];
export const ConfigurationSettingsDescriptionList = /*@__PURE__*/ S.Array(
  ConfigurationSettingsDescription,
);
export interface ConfigurationSettingsDescriptions {
  ConfigurationSettings?: ConfigurationSettingsDescription[];
}
export const ConfigurationSettingsDescriptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSettings: S.optional(ConfigurationSettingsDescriptionList),
  }).pipe(ns),
).annotate({
  identifier: "ConfigurationSettingsDescriptions",
}) as any as S.Schema<ConfigurationSettingsDescriptions>;
export type EnvironmentHealthAttribute =
  | "Status"
  | "Color"
  | "Causes"
  | "ApplicationMetrics"
  | "InstancesHealth"
  | "All"
  | "HealthStatus"
  | "RefreshedAt"
  | (string & {});
export const EnvironmentHealthAttribute = /*@__PURE__*/ S.String;

export type EnvironmentHealthAttributes = EnvironmentHealthAttribute[];
export const EnvironmentHealthAttributes = /*@__PURE__*/ S.Array(
  EnvironmentHealthAttribute,
);
export interface DescribeEnvironmentHealthRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  AttributeNames?: EnvironmentHealthAttribute[];
}
export const DescribeEnvironmentHealthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentName: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    AttributeNames: S.optional(EnvironmentHealthAttributes),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEnvironmentHealthRequest",
}) as any as S.Schema<DescribeEnvironmentHealthRequest>;
export type Cause = string;
export type Causes = string[];
export const Causes = /*@__PURE__*/ S.Array(S.String);
export type RequestCount = number;
export interface StatusCodes {
  Status2xx?: number;
  Status3xx?: number;
  Status4xx?: number;
  Status5xx?: number;
}
export const StatusCodes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status2xx: S.optional(S.Number),
    Status3xx: S.optional(S.Number),
    Status4xx: S.optional(S.Number),
    Status5xx: S.optional(S.Number),
  }),
).annotate({ identifier: "StatusCodes" }) as any as S.Schema<StatusCodes>;
export interface Latency {
  P999?: number;
  P99?: number;
  P95?: number;
  P90?: number;
  P85?: number;
  P75?: number;
  P50?: number;
  P10?: number;
}
export const Latency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    P999: S.optional(S.Number),
    P99: S.optional(S.Number),
    P95: S.optional(S.Number),
    P90: S.optional(S.Number),
    P85: S.optional(S.Number),
    P75: S.optional(S.Number),
    P50: S.optional(S.Number),
    P10: S.optional(S.Number),
  }),
).annotate({ identifier: "Latency" }) as any as S.Schema<Latency>;
export interface ApplicationMetrics {
  Duration?: number;
  RequestCount?: number;
  StatusCodes?: StatusCodes;
  Latency?: Latency;
}
export const ApplicationMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Duration: S.optional(S.Number),
    RequestCount: S.optional(S.Number),
    StatusCodes: S.optional(StatusCodes),
    Latency: S.optional(Latency),
  }),
).annotate({
  identifier: "ApplicationMetrics",
}) as any as S.Schema<ApplicationMetrics>;
export interface InstanceHealthSummary {
  NoData?: number;
  Unknown?: number;
  Pending?: number;
  Ok?: number;
  Info?: number;
  Warning?: number;
  Degraded?: number;
  Severe?: number;
}
export const InstanceHealthSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NoData: S.optional(S.Number),
    Unknown: S.optional(S.Number),
    Pending: S.optional(S.Number),
    Ok: S.optional(S.Number),
    Info: S.optional(S.Number),
    Warning: S.optional(S.Number),
    Degraded: S.optional(S.Number),
    Severe: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstanceHealthSummary",
}) as any as S.Schema<InstanceHealthSummary>;
export type RefreshedAt = Date;
export interface DescribeEnvironmentHealthResult {
  EnvironmentName?: string;
  HealthStatus?: string;
  Status?: EnvironmentHealth;
  Color?: string;
  Causes?: string[];
  ApplicationMetrics?: ApplicationMetrics;
  InstancesHealth?: InstanceHealthSummary;
  RefreshedAt?: Date;
}
export const DescribeEnvironmentHealthResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentName: S.optional(S.String),
    HealthStatus: S.optional(S.String),
    Status: S.optional(EnvironmentHealth),
    Color: S.optional(S.String),
    Causes: S.optional(Causes),
    ApplicationMetrics: S.optional(ApplicationMetrics),
    InstancesHealth: S.optional(InstanceHealthSummary),
    RefreshedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEnvironmentHealthResult",
}) as any as S.Schema<DescribeEnvironmentHealthResult>;
export type ManagedActionHistoryMaxItems = number;
export interface DescribeEnvironmentManagedActionHistoryRequest {
  EnvironmentId?: string;
  EnvironmentName?: string;
  NextToken?: string;
  MaxItems?: number;
}
export const DescribeEnvironmentManagedActionHistoryRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EnvironmentId: S.optional(S.String),
      EnvironmentName: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxItems: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeEnvironmentManagedActionHistoryRequest",
  }) as any as S.Schema<DescribeEnvironmentManagedActionHistoryRequest>;
export type FailureType =
  | "UpdateCancelled"
  | "CancellationFailed"
  | "RollbackFailed"
  | "RollbackSuccessful"
  | "InternalFailure"
  | "InvalidEnvironmentState"
  | "PermissionsError"
  | (string & {});
export const FailureType = /*@__PURE__*/ S.String;

export type ActionHistoryStatus =
  | "Completed"
  | "Failed"
  | "Unknown"
  | (string & {});
export const ActionHistoryStatus = /*@__PURE__*/ S.String;

export interface ManagedActionHistoryItem {
  ActionId?: string;
  ActionType?: ActionType;
  ActionDescription?: string;
  FailureType?: FailureType;
  Status?: ActionHistoryStatus;
  FailureDescription?: string;
  ExecutedTime?: Date;
  FinishedTime?: Date;
}
export const ManagedActionHistoryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionId: S.optional(S.String),
    ActionType: S.optional(ActionType),
    ActionDescription: S.optional(S.String),
    FailureType: S.optional(FailureType),
    Status: S.optional(ActionHistoryStatus),
    FailureDescription: S.optional(S.String),
    ExecutedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FinishedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ManagedActionHistoryItem",
}) as any as S.Schema<ManagedActionHistoryItem>;
export type ManagedActionHistoryItems = ManagedActionHistoryItem[];
export const ManagedActionHistoryItems = /*@__PURE__*/ S.Array(
  ManagedActionHistoryItem,
);
export interface DescribeEnvironmentManagedActionHistoryResult {
  ManagedActionHistoryItems?: ManagedActionHistoryItem[];
  NextToken?: string;
}
export const DescribeEnvironmentManagedActionHistoryResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ManagedActionHistoryItems: S.optional(ManagedActionHistoryItems),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeEnvironmentManagedActionHistoryResult",
  }) as any as S.Schema<DescribeEnvironmentManagedActionHistoryResult>;
export type ActionStatus =
  | "Scheduled"
  | "Pending"
  | "Running"
  | "Unknown"
  | (string & {});
export const ActionStatus = /*@__PURE__*/ S.String;

export interface DescribeEnvironmentManagedActionsRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  Status?: ActionStatus;
}
export const DescribeEnvironmentManagedActionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnvironmentName: S.optional(S.String),
      EnvironmentId: S.optional(S.String),
      Status: S.optional(ActionStatus),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeEnvironmentManagedActionsRequest",
}) as any as S.Schema<DescribeEnvironmentManagedActionsRequest>;
export interface ManagedAction {
  ActionId?: string;
  ActionDescription?: string;
  ActionType?: ActionType;
  Status?: ActionStatus;
  WindowStartTime?: Date;
}
export const ManagedAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionId: S.optional(S.String),
    ActionDescription: S.optional(S.String),
    ActionType: S.optional(ActionType),
    Status: S.optional(ActionStatus),
    WindowStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ManagedAction" }) as any as S.Schema<ManagedAction>;
export type ManagedActions = ManagedAction[];
export const ManagedActions = /*@__PURE__*/ S.Array(ManagedAction);
export interface DescribeEnvironmentManagedActionsResult {
  ManagedActions?: ManagedAction[];
}
export const DescribeEnvironmentManagedActionsResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ManagedActions: S.optional(ManagedActions) }).pipe(ns),
).annotate({
  identifier: "DescribeEnvironmentManagedActionsResult",
}) as any as S.Schema<DescribeEnvironmentManagedActionsResult>;
export interface DescribeEnvironmentResourcesMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export const DescribeEnvironmentResourcesMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEnvironmentResourcesMessage",
}) as any as S.Schema<DescribeEnvironmentResourcesMessage>;
export type ResourceId = string;
export interface AutoScalingGroup {
  Name?: string;
}
export const AutoScalingGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AutoScalingGroup",
}) as any as S.Schema<AutoScalingGroup>;
export type AutoScalingGroupList = AutoScalingGroup[];
export const AutoScalingGroupList = /*@__PURE__*/ S.Array(AutoScalingGroup);
export interface Instance {
  Id?: string;
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export type InstanceList = Instance[];
export const InstanceList = /*@__PURE__*/ S.Array(Instance);
export interface LaunchConfiguration {
  Name?: string;
}
export const LaunchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "LaunchConfiguration",
}) as any as S.Schema<LaunchConfiguration>;
export type LaunchConfigurationList = LaunchConfiguration[];
export const LaunchConfigurationList =
  /*@__PURE__*/ S.Array(LaunchConfiguration);
export interface LaunchTemplate {
  Id?: string;
}
export const LaunchTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({ identifier: "LaunchTemplate" }) as any as S.Schema<LaunchTemplate>;
export type LaunchTemplateList = LaunchTemplate[];
export const LaunchTemplateList = /*@__PURE__*/ S.Array(LaunchTemplate);
export interface LoadBalancer {
  Name?: string;
}
export const LoadBalancer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({ identifier: "LoadBalancer" }) as any as S.Schema<LoadBalancer>;
export type LoadBalancerList = LoadBalancer[];
export const LoadBalancerList = /*@__PURE__*/ S.Array(LoadBalancer);
export interface Trigger {
  Name?: string;
}
export const Trigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({ identifier: "Trigger" }) as any as S.Schema<Trigger>;
export type TriggerList = Trigger[];
export const TriggerList = /*@__PURE__*/ S.Array(Trigger);
export interface Queue {
  Name?: string;
  URL?: string;
}
export const Queue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), URL: S.optional(S.String) }),
).annotate({ identifier: "Queue" }) as any as S.Schema<Queue>;
export type QueueList = Queue[];
export const QueueList = /*@__PURE__*/ S.Array(Queue);
export interface EnvironmentResourceDescription {
  EnvironmentName?: string;
  AutoScalingGroups?: AutoScalingGroup[];
  Instances?: Instance[];
  LaunchConfigurations?: LaunchConfiguration[];
  LaunchTemplates?: LaunchTemplate[];
  LoadBalancers?: LoadBalancer[];
  Triggers?: Trigger[];
  Queues?: Queue[];
}
export const EnvironmentResourceDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentName: S.optional(S.String),
    AutoScalingGroups: S.optional(AutoScalingGroupList),
    Instances: S.optional(InstanceList),
    LaunchConfigurations: S.optional(LaunchConfigurationList),
    LaunchTemplates: S.optional(LaunchTemplateList),
    LoadBalancers: S.optional(LoadBalancerList),
    Triggers: S.optional(TriggerList),
    Queues: S.optional(QueueList),
  }),
).annotate({
  identifier: "EnvironmentResourceDescription",
}) as any as S.Schema<EnvironmentResourceDescription>;
export interface EnvironmentResourceDescriptionsMessage {
  EnvironmentResources?: EnvironmentResourceDescription;
}
export const EnvironmentResourceDescriptionsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnvironmentResources: S.optional(EnvironmentResourceDescription),
    }).pipe(ns),
).annotate({
  identifier: "EnvironmentResourceDescriptionsMessage",
}) as any as S.Schema<EnvironmentResourceDescriptionsMessage>;
export type EnvironmentIdList = string[];
export const EnvironmentIdList = /*@__PURE__*/ S.Array(S.String);
export type EnvironmentNamesList = string[];
export const EnvironmentNamesList = /*@__PURE__*/ S.Array(S.String);
export type IncludeDeleted = boolean;
export type IncludeDeletedBackTo = Date;
export interface DescribeEnvironmentsMessage {
  ApplicationName?: string;
  VersionLabel?: string;
  EnvironmentIds?: string[];
  EnvironmentNames?: string[];
  IncludeDeleted?: boolean;
  IncludedDeletedBackTo?: Date;
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeEnvironmentsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    EnvironmentIds: S.optional(EnvironmentIdList),
    EnvironmentNames: S.optional(EnvironmentNamesList),
    IncludeDeleted: S.optional(S.Boolean),
    IncludedDeletedBackTo: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEnvironmentsMessage",
}) as any as S.Schema<DescribeEnvironmentsMessage>;
export type RequestId = string;
export type EventSeverity =
  | "TRACE"
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "FATAL"
  | (string & {});
export const EventSeverity = /*@__PURE__*/ S.String;

export type TimeFilterStart = Date;
export type TimeFilterEnd = Date;
export interface DescribeEventsMessage {
  ApplicationName?: string;
  VersionLabel?: string;
  TemplateName?: string;
  EnvironmentId?: string;
  EnvironmentName?: string;
  PlatformArn?: string;
  RequestId?: string;
  Severity?: EventSeverity;
  StartTime?: Date;
  EndTime?: Date;
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeEventsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    TemplateName: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    RequestId: S.optional(S.String),
    Severity: S.optional(EventSeverity),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEventsMessage",
}) as any as S.Schema<DescribeEventsMessage>;
export type EventDate = Date;
export type EventMessage = string;
export interface EventDescription {
  EventDate?: Date;
  Message?: string;
  ApplicationName?: string;
  VersionLabel?: string;
  TemplateName?: string;
  EnvironmentName?: string;
  PlatformArn?: string;
  RequestId?: string;
  Severity?: EventSeverity;
}
export const EventDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Message: S.optional(S.String),
    ApplicationName: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    TemplateName: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    RequestId: S.optional(S.String),
    Severity: S.optional(EventSeverity),
  }),
).annotate({
  identifier: "EventDescription",
}) as any as S.Schema<EventDescription>;
export type EventDescriptionList = EventDescription[];
export const EventDescriptionList = /*@__PURE__*/ S.Array(EventDescription);
export interface EventDescriptionsMessage {
  Events?: EventDescription[];
  NextToken?: string;
}
export const EventDescriptionsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Events: S.optional(EventDescriptionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "EventDescriptionsMessage",
}) as any as S.Schema<EventDescriptionsMessage>;
export type InstancesHealthAttribute =
  | "HealthStatus"
  | "Color"
  | "Causes"
  | "ApplicationMetrics"
  | "RefreshedAt"
  | "LaunchedAt"
  | "System"
  | "Deployment"
  | "AvailabilityZone"
  | "InstanceType"
  | "All"
  | (string & {});
export const InstancesHealthAttribute = /*@__PURE__*/ S.String;

export type InstancesHealthAttributes = InstancesHealthAttribute[];
export const InstancesHealthAttributes = /*@__PURE__*/ S.Array(
  InstancesHealthAttribute,
);
export type NextToken = string;
export interface DescribeInstancesHealthRequest {
  EnvironmentName?: string;
  EnvironmentId?: string;
  AttributeNames?: InstancesHealthAttribute[];
  NextToken?: string;
}
export const DescribeInstancesHealthRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentName: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    AttributeNames: S.optional(InstancesHealthAttributes),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInstancesHealthRequest",
}) as any as S.Schema<DescribeInstancesHealthRequest>;
export type InstanceId = string;
export type LaunchedAt = Date;
export interface CPUUtilization {
  User?: number;
  Nice?: number;
  System?: number;
  Idle?: number;
  IOWait?: number;
  IRQ?: number;
  SoftIRQ?: number;
  Privileged?: number;
}
export const CPUUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    User: S.optional(S.Number),
    Nice: S.optional(S.Number),
    System: S.optional(S.Number),
    Idle: S.optional(S.Number),
    IOWait: S.optional(S.Number),
    IRQ: S.optional(S.Number),
    SoftIRQ: S.optional(S.Number),
    Privileged: S.optional(S.Number),
  }),
).annotate({ identifier: "CPUUtilization" }) as any as S.Schema<CPUUtilization>;
export type LoadAverageValue = number;
export type LoadAverage = number[];
export const LoadAverage = /*@__PURE__*/ S.Array(S.Number);
export interface SystemStatus {
  CPUUtilization?: CPUUtilization;
  LoadAverage?: number[];
}
export const SystemStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CPUUtilization: S.optional(CPUUtilization),
    LoadAverage: S.optional(LoadAverage),
  }),
).annotate({ identifier: "SystemStatus" }) as any as S.Schema<SystemStatus>;
export type DeploymentTimestamp = Date;
export interface Deployment {
  VersionLabel?: string;
  DeploymentId?: number;
  Status?: string;
  DeploymentTime?: Date;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionLabel: S.optional(S.String),
    DeploymentId: S.optional(S.Number),
    Status: S.optional(S.String),
    DeploymentTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export interface SingleInstanceHealth {
  InstanceId?: string;
  HealthStatus?: string;
  Color?: string;
  Causes?: string[];
  LaunchedAt?: Date;
  ApplicationMetrics?: ApplicationMetrics;
  System?: SystemStatus;
  Deployment?: Deployment;
  AvailabilityZone?: string;
  InstanceType?: string;
}
export const SingleInstanceHealth = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    HealthStatus: S.optional(S.String),
    Color: S.optional(S.String),
    Causes: S.optional(Causes),
    LaunchedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ApplicationMetrics: S.optional(ApplicationMetrics),
    System: S.optional(SystemStatus),
    Deployment: S.optional(Deployment),
    AvailabilityZone: S.optional(S.String),
    InstanceType: S.optional(S.String),
  }),
).annotate({
  identifier: "SingleInstanceHealth",
}) as any as S.Schema<SingleInstanceHealth>;
export type InstanceHealthList = SingleInstanceHealth[];
export const InstanceHealthList = /*@__PURE__*/ S.Array(SingleInstanceHealth);
export interface DescribeInstancesHealthResult {
  InstanceHealthList?: SingleInstanceHealth[];
  RefreshedAt?: Date;
  NextToken?: string;
}
export const DescribeInstancesHealthResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceHealthList: S.optional(InstanceHealthList),
    RefreshedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstancesHealthResult",
}) as any as S.Schema<DescribeInstancesHealthResult>;
export interface DescribePlatformVersionRequest {
  PlatformArn?: string;
}
export const DescribePlatformVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlatformArn: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePlatformVersionRequest",
}) as any as S.Schema<DescribePlatformVersionRequest>;
export type Maintainer = string;
export interface PlatformProgrammingLanguage {
  Name?: string;
  Version?: string;
}
export const PlatformProgrammingLanguage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Version: S.optional(S.String) }),
).annotate({
  identifier: "PlatformProgrammingLanguage",
}) as any as S.Schema<PlatformProgrammingLanguage>;
export type PlatformProgrammingLanguages = PlatformProgrammingLanguage[];
export const PlatformProgrammingLanguages = /*@__PURE__*/ S.Array(
  PlatformProgrammingLanguage,
);
export interface PlatformFramework {
  Name?: string;
  Version?: string;
}
export const PlatformFramework = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Version: S.optional(S.String) }),
).annotate({
  identifier: "PlatformFramework",
}) as any as S.Schema<PlatformFramework>;
export type PlatformFrameworks = PlatformFramework[];
export const PlatformFrameworks = /*@__PURE__*/ S.Array(PlatformFramework);
export type VirtualizationType = string;
export type ImageId = string;
export interface CustomAmi {
  VirtualizationType?: string;
  ImageId?: string;
}
export const CustomAmi = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VirtualizationType: S.optional(S.String),
    ImageId: S.optional(S.String),
  }),
).annotate({ identifier: "CustomAmi" }) as any as S.Schema<CustomAmi>;
export type CustomAmiList = CustomAmi[];
export const CustomAmiList = /*@__PURE__*/ S.Array(CustomAmi);
export interface PlatformDescription {
  PlatformArn?: string;
  PlatformOwner?: string;
  PlatformName?: string;
  PlatformVersion?: string;
  SolutionStackName?: string;
  PlatformStatus?: PlatformStatus;
  DateCreated?: Date;
  DateUpdated?: Date;
  PlatformCategory?: string;
  Description?: string;
  Maintainer?: string;
  OperatingSystemName?: string;
  OperatingSystemVersion?: string;
  ProgrammingLanguages?: PlatformProgrammingLanguage[];
  Frameworks?: PlatformFramework[];
  CustomAmiList?: CustomAmi[];
  SupportedTierList?: string[];
  SupportedAddonList?: string[];
  PlatformLifecycleState?: string;
  PlatformBranchName?: string;
  PlatformBranchLifecycleState?: string;
}
export const PlatformDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformArn: S.optional(S.String),
    PlatformOwner: S.optional(S.String),
    PlatformName: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    SolutionStackName: S.optional(S.String),
    PlatformStatus: S.optional(PlatformStatus),
    DateCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DateUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    PlatformCategory: S.optional(S.String),
    Description: S.optional(S.String),
    Maintainer: S.optional(S.String),
    OperatingSystemName: S.optional(S.String),
    OperatingSystemVersion: S.optional(S.String),
    ProgrammingLanguages: S.optional(PlatformProgrammingLanguages),
    Frameworks: S.optional(PlatformFrameworks),
    CustomAmiList: S.optional(CustomAmiList),
    SupportedTierList: S.optional(SupportedTierList),
    SupportedAddonList: S.optional(SupportedAddonList),
    PlatformLifecycleState: S.optional(S.String),
    PlatformBranchName: S.optional(S.String),
    PlatformBranchLifecycleState: S.optional(S.String),
  }),
).annotate({
  identifier: "PlatformDescription",
}) as any as S.Schema<PlatformDescription>;
export interface DescribePlatformVersionResult {
  PlatformDescription?: PlatformDescription;
}
export const DescribePlatformVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PlatformDescription: S.optional(PlatformDescription) }).pipe(ns),
).annotate({
  identifier: "DescribePlatformVersionResult",
}) as any as S.Schema<DescribePlatformVersionResult>;
export interface DisassociateEnvironmentOperationsRoleMessage {
  EnvironmentName: string;
}
export const DisassociateEnvironmentOperationsRoleMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EnvironmentName: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateEnvironmentOperationsRoleMessage",
  }) as any as S.Schema<DisassociateEnvironmentOperationsRoleMessage>;
export interface DisassociateEnvironmentOperationsRoleResponse {}
export const DisassociateEnvironmentOperationsRoleResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DisassociateEnvironmentOperationsRoleResponse",
  }) as any as S.Schema<DisassociateEnvironmentOperationsRoleResponse>;
export interface ListAvailableSolutionStacksRequest {}
export const ListAvailableSolutionStacksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAvailableSolutionStacksRequest",
}) as any as S.Schema<ListAvailableSolutionStacksRequest>;
export type AvailableSolutionStackNamesList = string[];
export const AvailableSolutionStackNamesList = /*@__PURE__*/ S.Array(S.String);
export type FileTypeExtension = string;
export type SolutionStackFileTypeList = string[];
export const SolutionStackFileTypeList = /*@__PURE__*/ S.Array(S.String);
export interface SolutionStackDescription {
  SolutionStackName?: string;
  PermittedFileTypes?: string[];
}
export const SolutionStackDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SolutionStackName: S.optional(S.String),
    PermittedFileTypes: S.optional(SolutionStackFileTypeList),
  }),
).annotate({
  identifier: "SolutionStackDescription",
}) as any as S.Schema<SolutionStackDescription>;
export type AvailableSolutionStackDetailsList = SolutionStackDescription[];
export const AvailableSolutionStackDetailsList = /*@__PURE__*/ S.Array(
  SolutionStackDescription,
);
export interface ListAvailableSolutionStacksResultMessage {
  SolutionStacks?: string[];
  SolutionStackDetails?: SolutionStackDescription[];
}
export const ListAvailableSolutionStacksResultMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SolutionStacks: S.optional(AvailableSolutionStackNamesList),
      SolutionStackDetails: S.optional(AvailableSolutionStackDetailsList),
    }).pipe(ns),
).annotate({
  identifier: "ListAvailableSolutionStacksResultMessage",
}) as any as S.Schema<ListAvailableSolutionStacksResultMessage>;
export type SearchFilterAttribute = string;
export type SearchFilterOperator = string;
export type SearchFilterValue = string;
export type SearchFilterValues = string[];
export const SearchFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface SearchFilter {
  Attribute?: string;
  Operator?: string;
  Values?: string[];
}
export const SearchFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: S.optional(S.String),
    Operator: S.optional(S.String),
    Values: S.optional(SearchFilterValues),
  }),
).annotate({ identifier: "SearchFilter" }) as any as S.Schema<SearchFilter>;
export type SearchFilters = SearchFilter[];
export const SearchFilters = /*@__PURE__*/ S.Array(SearchFilter);
export type PlatformBranchMaxRecords = number;
export interface ListPlatformBranchesRequest {
  Filters?: SearchFilter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const ListPlatformBranchesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(SearchFilters),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPlatformBranchesRequest",
}) as any as S.Schema<ListPlatformBranchesRequest>;
export type BranchOrder = number;
export interface PlatformBranchSummary {
  PlatformName?: string;
  BranchName?: string;
  LifecycleState?: string;
  BranchOrder?: number;
  SupportedTierList?: string[];
}
export const PlatformBranchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformName: S.optional(S.String),
    BranchName: S.optional(S.String),
    LifecycleState: S.optional(S.String),
    BranchOrder: S.optional(S.Number),
    SupportedTierList: S.optional(SupportedTierList),
  }),
).annotate({
  identifier: "PlatformBranchSummary",
}) as any as S.Schema<PlatformBranchSummary>;
export type PlatformBranchSummaryList = PlatformBranchSummary[];
export const PlatformBranchSummaryList = /*@__PURE__*/ S.Array(
  PlatformBranchSummary,
);
export interface ListPlatformBranchesResult {
  PlatformBranchSummaryList?: PlatformBranchSummary[];
  NextToken?: string;
}
export const ListPlatformBranchesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformBranchSummaryList: S.optional(PlatformBranchSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPlatformBranchesResult",
}) as any as S.Schema<ListPlatformBranchesResult>;
export type PlatformFilterType = string;
export type PlatformFilterOperator = string;
export type PlatformFilterValue = string;
export type PlatformFilterValueList = string[];
export const PlatformFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface PlatformFilter {
  Type?: string;
  Operator?: string;
  Values?: string[];
}
export const PlatformFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Operator: S.optional(S.String),
    Values: S.optional(PlatformFilterValueList),
  }),
).annotate({ identifier: "PlatformFilter" }) as any as S.Schema<PlatformFilter>;
export type PlatformFilters = PlatformFilter[];
export const PlatformFilters = /*@__PURE__*/ S.Array(PlatformFilter);
export type PlatformMaxRecords = number;
export interface ListPlatformVersionsRequest {
  Filters?: PlatformFilter[];
  MaxRecords?: number;
  NextToken?: string;
}
export const ListPlatformVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(PlatformFilters),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPlatformVersionsRequest",
}) as any as S.Schema<ListPlatformVersionsRequest>;
export type PlatformSummaryList = PlatformSummary[];
export const PlatformSummaryList = /*@__PURE__*/ S.Array(PlatformSummary);
export interface ListPlatformVersionsResult {
  PlatformSummaryList?: PlatformSummary[];
  NextToken?: string;
}
export const ListPlatformVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlatformSummaryList: S.optional(PlatformSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPlatformVersionsResult",
}) as any as S.Schema<ListPlatformVersionsResult>;
export type ResourceArn = string;
export interface ListTagsForResourceMessage {
  ResourceArn: string;
}
export const ListTagsForResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceMessage",
}) as any as S.Schema<ListTagsForResourceMessage>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface ResourceTagsDescriptionMessage {
  ResourceArn?: string;
  ResourceTags?: Tag[];
}
export const ResourceTagsDescriptionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceTags: S.optional(TagList),
  }).pipe(ns),
).annotate({
  identifier: "ResourceTagsDescriptionMessage",
}) as any as S.Schema<ResourceTagsDescriptionMessage>;
export interface RebuildEnvironmentMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export const RebuildEnvironmentMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RebuildEnvironmentMessage",
}) as any as S.Schema<RebuildEnvironmentMessage>;
export interface RebuildEnvironmentResponse {}
export const RebuildEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RebuildEnvironmentResponse",
}) as any as S.Schema<RebuildEnvironmentResponse>;
export type EnvironmentInfoType = "tail" | "bundle" | "analyze" | (string & {});
export const EnvironmentInfoType = /*@__PURE__*/ S.String;

export interface RequestEnvironmentInfoMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
  InfoType: EnvironmentInfoType;
}
export const RequestEnvironmentInfoMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    InfoType: EnvironmentInfoType,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RequestEnvironmentInfoMessage",
}) as any as S.Schema<RequestEnvironmentInfoMessage>;
export interface RequestEnvironmentInfoResponse {}
export const RequestEnvironmentInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RequestEnvironmentInfoResponse",
}) as any as S.Schema<RequestEnvironmentInfoResponse>;
export interface RestartAppServerMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
}
export const RestartAppServerMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RestartAppServerMessage",
}) as any as S.Schema<RestartAppServerMessage>;
export interface RestartAppServerResponse {}
export const RestartAppServerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RestartAppServerResponse",
}) as any as S.Schema<RestartAppServerResponse>;
export interface RetrieveEnvironmentInfoMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
  InfoType: EnvironmentInfoType;
}
export const RetrieveEnvironmentInfoMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    InfoType: EnvironmentInfoType,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RetrieveEnvironmentInfoMessage",
}) as any as S.Schema<RetrieveEnvironmentInfoMessage>;
export type Ec2InstanceId = string;
export type SampleTimestamp = Date;
export type Message = string;
export interface EnvironmentInfoDescription {
  InfoType?: EnvironmentInfoType;
  Ec2InstanceId?: string;
  SampleTimestamp?: Date;
  Message?: string;
}
export const EnvironmentInfoDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InfoType: S.optional(EnvironmentInfoType),
    Ec2InstanceId: S.optional(S.String),
    SampleTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "EnvironmentInfoDescription",
}) as any as S.Schema<EnvironmentInfoDescription>;
export type EnvironmentInfoDescriptionList = EnvironmentInfoDescription[];
export const EnvironmentInfoDescriptionList = /*@__PURE__*/ S.Array(
  EnvironmentInfoDescription,
);
export interface RetrieveEnvironmentInfoResultMessage {
  EnvironmentInfo?: EnvironmentInfoDescription[];
}
export const RetrieveEnvironmentInfoResultMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnvironmentInfo: S.optional(EnvironmentInfoDescriptionList),
    }).pipe(ns),
).annotate({
  identifier: "RetrieveEnvironmentInfoResultMessage",
}) as any as S.Schema<RetrieveEnvironmentInfoResultMessage>;
export interface SwapEnvironmentCNAMEsMessage {
  SourceEnvironmentId?: string;
  SourceEnvironmentName?: string;
  DestinationEnvironmentId?: string;
  DestinationEnvironmentName?: string;
}
export const SwapEnvironmentCNAMEsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceEnvironmentId: S.optional(S.String),
    SourceEnvironmentName: S.optional(S.String),
    DestinationEnvironmentId: S.optional(S.String),
    DestinationEnvironmentName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SwapEnvironmentCNAMEsMessage",
}) as any as S.Schema<SwapEnvironmentCNAMEsMessage>;
export interface SwapEnvironmentCNAMEsResponse {}
export const SwapEnvironmentCNAMEsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SwapEnvironmentCNAMEsResponse",
}) as any as S.Schema<SwapEnvironmentCNAMEsResponse>;
export type TerminateEnvironmentResources = boolean;
export type ForceTerminate = boolean;
export interface TerminateEnvironmentMessage {
  EnvironmentId?: string;
  EnvironmentName?: string;
  TerminateResources?: boolean;
  ForceTerminate?: boolean;
}
export const TerminateEnvironmentMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    TerminateResources: S.optional(S.Boolean),
    ForceTerminate: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateEnvironmentMessage",
}) as any as S.Schema<TerminateEnvironmentMessage>;
export interface UpdateApplicationMessage {
  ApplicationName: string;
  Description?: string;
}
export const UpdateApplicationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationMessage",
}) as any as S.Schema<UpdateApplicationMessage>;
export interface UpdateApplicationResourceLifecycleMessage {
  ApplicationName: string;
  ResourceLifecycleConfig: ApplicationResourceLifecycleConfig;
}
export const UpdateApplicationResourceLifecycleMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      ResourceLifecycleConfig: ApplicationResourceLifecycleConfig,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateApplicationResourceLifecycleMessage",
  }) as any as S.Schema<UpdateApplicationResourceLifecycleMessage>;
export interface ApplicationResourceLifecycleDescriptionMessage {
  ApplicationName?: string;
  ResourceLifecycleConfig?: ApplicationResourceLifecycleConfig;
}
export const ApplicationResourceLifecycleDescriptionMessage =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.optional(S.String),
      ResourceLifecycleConfig: S.optional(ApplicationResourceLifecycleConfig),
    }).pipe(ns),
  ).annotate({
    identifier: "ApplicationResourceLifecycleDescriptionMessage",
  }) as any as S.Schema<ApplicationResourceLifecycleDescriptionMessage>;
export interface UpdateApplicationVersionMessage {
  ApplicationName: string;
  VersionLabel: string;
  Description?: string;
}
export const UpdateApplicationVersionMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    VersionLabel: S.String,
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationVersionMessage",
}) as any as S.Schema<UpdateApplicationVersionMessage>;
export interface UpdateConfigurationTemplateMessage {
  ApplicationName: string;
  TemplateName: string;
  Description?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  OptionsToRemove?: OptionSpecification[];
}
export const UpdateConfigurationTemplateMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    TemplateName: S.String,
    Description: S.optional(S.String),
    OptionSettings: S.optional(ConfigurationOptionSettingsList),
    OptionsToRemove: S.optional(OptionsSpecifierList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationTemplateMessage",
}) as any as S.Schema<UpdateConfigurationTemplateMessage>;
export interface UpdateEnvironmentMessage {
  ApplicationName?: string;
  EnvironmentId?: string;
  EnvironmentName?: string;
  GroupName?: string;
  Description?: string;
  Tier?: EnvironmentTier;
  VersionLabel?: string;
  TemplateName?: string;
  SolutionStackName?: string;
  PlatformArn?: string;
  OptionSettings?: ConfigurationOptionSetting[];
  OptionsToRemove?: OptionSpecification[];
}
export const UpdateEnvironmentMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    EnvironmentName: S.optional(S.String),
    GroupName: S.optional(S.String),
    Description: S.optional(S.String),
    Tier: S.optional(EnvironmentTier),
    VersionLabel: S.optional(S.String),
    TemplateName: S.optional(S.String),
    SolutionStackName: S.optional(S.String),
    PlatformArn: S.optional(S.String),
    OptionSettings: S.optional(ConfigurationOptionSettingsList),
    OptionsToRemove: S.optional(OptionsSpecifierList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentMessage",
}) as any as S.Schema<UpdateEnvironmentMessage>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateTagsForResourceMessage {
  ResourceArn: string;
  TagsToAdd?: Tag[];
  TagsToRemove?: string[];
}
export const UpdateTagsForResourceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    TagsToAdd: S.optional(TagList),
    TagsToRemove: S.optional(TagKeyList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTagsForResourceMessage",
}) as any as S.Schema<UpdateTagsForResourceMessage>;
export interface UpdateTagsForResourceResponse {}
export const UpdateTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateTagsForResourceResponse",
}) as any as S.Schema<UpdateTagsForResourceResponse>;
export interface ValidateConfigurationSettingsMessage {
  ApplicationName: string;
  TemplateName?: string;
  EnvironmentName?: string;
  OptionSettings: ConfigurationOptionSetting[];
}
export const ValidateConfigurationSettingsMessage = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.String,
      TemplateName: S.optional(S.String),
      EnvironmentName: S.optional(S.String),
      OptionSettings: ConfigurationOptionSettingsList,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ValidateConfigurationSettingsMessage",
}) as any as S.Schema<ValidateConfigurationSettingsMessage>;
export type ValidationMessageString = string;
export type ValidationSeverity = "error" | "warning" | (string & {});
export const ValidationSeverity = /*@__PURE__*/ S.String;

export interface ValidationMessage {
  Message?: string;
  Severity?: ValidationSeverity;
  Namespace?: string;
  OptionName?: string;
}
export const ValidationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Severity: S.optional(ValidationSeverity),
    Namespace: S.optional(S.String),
    OptionName: S.optional(S.String),
  }),
).annotate({
  identifier: "ValidationMessage",
}) as any as S.Schema<ValidationMessage>;
export type ValidationMessagesList = ValidationMessage[];
export const ValidationMessagesList = /*@__PURE__*/ S.Array(ValidationMessage);
export interface ConfigurationSettingsValidationMessages {
  Messages?: ValidationMessage[];
}
export const ConfigurationSettingsValidationMessages = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Messages: S.optional(ValidationMessagesList) }).pipe(ns),
).annotate({
  identifier: "ConfigurationSettingsValidationMessages",
}) as any as S.Schema<ConfigurationSettingsValidationMessages>;
export type ExceptionMessage = string;
export type AbortEnvironmentUpdateError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Cancels in-progress environment configuration update or application version
 * deployment.
 */
export const abortEnvironmentUpdate: API.OperationMethod<
  AbortEnvironmentUpdateMessage,
  AbortEnvironmentUpdateResponse,
  AbortEnvironmentUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AbortEnvironmentUpdateMessage,
  output: AbortEnvironmentUpdateResponse,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortEnvironmentUpdate",
}));

export type ApplyEnvironmentManagedActionError =
  | ElasticBeanstalkServiceException
  | ManagedActionInvalidStateException
  | CommonErrors;
/**
 * Applies a scheduled managed action immediately. A managed action can be applied only if
 * its status is `Scheduled`. Get the status and action ID of a managed action with
 * DescribeEnvironmentManagedActions.
 */
export const applyEnvironmentManagedAction: API.OperationMethod<
  ApplyEnvironmentManagedActionRequest,
  ApplyEnvironmentManagedActionResult,
  ApplyEnvironmentManagedActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApplyEnvironmentManagedActionRequest,
  output: ApplyEnvironmentManagedActionResult,
  errors: [
    ElasticBeanstalkServiceException,
    ManagedActionInvalidStateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplyEnvironmentManagedAction",
}));

export type AssociateEnvironmentOperationsRoleError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Add or change the operations role used by an environment. After this call is made, Elastic Beanstalk
 * uses the associated operations role for permissions to downstream services during subsequent
 * calls acting on this environment. For more information, see Operations roles in the
 * *AWS Elastic Beanstalk Developer Guide*.
 */
export const associateEnvironmentOperationsRole: API.OperationMethod<
  AssociateEnvironmentOperationsRoleMessage,
  AssociateEnvironmentOperationsRoleResponse,
  AssociateEnvironmentOperationsRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateEnvironmentOperationsRoleMessage,
  output: AssociateEnvironmentOperationsRoleResponse,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateEnvironmentOperationsRole",
}));

export type CheckDNSAvailabilityError = CommonErrors;
/**
 * Checks if the specified CNAME is available.
 */
export const checkDNSAvailability: API.OperationMethod<
  CheckDNSAvailabilityMessage,
  CheckDNSAvailabilityResultMessage,
  CheckDNSAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckDNSAvailabilityMessage,
  output: CheckDNSAvailabilityResultMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckDNSAvailability",
}));

export type ComposeEnvironmentsError =
  | InsufficientPrivilegesException
  | TooManyEnvironmentsException
  | CommonErrors;
/**
 * Create or update a group of environments that each run a separate component of a single
 * application. Takes a list of version labels that specify application source bundles for each
 * of the environments to create or update. The name of each environment and other required
 * information must be included in the source bundles in an environment manifest named
 * `env.yaml`. See Compose Environments
 * for details.
 */
export const composeEnvironments: API.OperationMethod<
  ComposeEnvironmentsMessage,
  EnvironmentDescriptionsMessage,
  ComposeEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ComposeEnvironmentsMessage,
  output: EnvironmentDescriptionsMessage,
  errors: [InsufficientPrivilegesException, TooManyEnvironmentsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ComposeEnvironments",
}));

export type CreateApplicationError =
  | TooManyApplicationsException
  | CommonErrors;
/**
 * Creates an application that has one configuration template named `default`
 * and no application versions.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationMessage,
  ApplicationDescriptionMessage,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationMessage,
  output: ApplicationDescriptionMessage,
  errors: [TooManyApplicationsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateApplicationVersionError =
  | CodeBuildNotInServiceRegionException
  | InsufficientPrivilegesException
  | S3LocationNotInServiceRegionException
  | TooManyApplicationsException
  | TooManyApplicationVersionsException
  | CommonErrors;
/**
 * Creates an application version for the specified application. You can create an
 * application version from a source bundle in Amazon S3, a commit in AWS CodeCommit, or the
 * output of an AWS CodeBuild build as follows:
 *
 * Specify a commit in an AWS CodeCommit repository with
 * `SourceBuildInformation`.
 *
 * Specify a build in an AWS CodeBuild with `SourceBuildInformation` and
 * `BuildConfiguration`.
 *
 * Specify a source bundle in S3 with `SourceBundle`
 *
 * Omit both `SourceBuildInformation` and `SourceBundle` to use the
 * default sample application.
 *
 * After you create an application version with a specified Amazon S3 bucket and key
 * location, you can't change that Amazon S3 location. If you change the Amazon S3 location,
 * you receive an exception when you attempt to launch an environment from the application
 * version.
 */
export const createApplicationVersion: API.OperationMethod<
  CreateApplicationVersionMessage,
  ApplicationVersionDescriptionMessage,
  CreateApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationVersionMessage,
  output: ApplicationVersionDescriptionMessage,
  errors: [
    CodeBuildNotInServiceRegionException,
    InsufficientPrivilegesException,
    S3LocationNotInServiceRegionException,
    TooManyApplicationsException,
    TooManyApplicationVersionsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationVersion",
}));

export type CreateConfigurationTemplateError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | TooManyConfigurationTemplatesException
  | CommonErrors;
/**
 * Creates an AWS Elastic Beanstalk configuration template, associated with a specific Elastic Beanstalk
 * application. You define application configuration settings in a configuration template. You
 * can then use the configuration template to deploy different versions of the application with
 * the same configuration settings.
 *
 * Templates aren't associated with any environment. The `EnvironmentName`
 * response element is always `null`.
 *
 * Related Topics
 *
 * - DescribeConfigurationOptions
 *
 * - DescribeConfigurationSettings
 *
 * - ListAvailableSolutionStacks
 */
export const createConfigurationTemplate: API.OperationMethod<
  CreateConfigurationTemplateMessage,
  ConfigurationSettingsDescription,
  CreateConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationTemplateMessage,
  output: ConfigurationSettingsDescription,
  errors: [
    InsufficientPrivilegesException,
    TooManyBucketsException,
    TooManyConfigurationTemplatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationTemplate",
}));

export type CreateEnvironmentError =
  | InsufficientPrivilegesException
  | TooManyEnvironmentsException
  | CommonErrors;
/**
 * Launches an AWS Elastic Beanstalk environment for the specified application using the specified
 * configuration.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentMessage,
  EnvironmentDescription,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentMessage,
  output: EnvironmentDescription,
  errors: [InsufficientPrivilegesException, TooManyEnvironmentsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
}));

export type CreatePlatformVersionError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | TooManyPlatformsException
  | CommonErrors;
/**
 * Create a new version of your custom platform.
 */
export const createPlatformVersion: API.OperationMethod<
  CreatePlatformVersionRequest,
  CreatePlatformVersionResult,
  CreatePlatformVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePlatformVersionRequest,
  output: CreatePlatformVersionResult,
  errors: [
    ElasticBeanstalkServiceException,
    InsufficientPrivilegesException,
    TooManyPlatformsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePlatformVersion",
}));

export type CreateStorageLocationError =
  | InsufficientPrivilegesException
  | S3SubscriptionRequiredException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Creates a bucket in Amazon S3 to store application versions, logs, and other files used
 * by Elastic Beanstalk environments. The Elastic Beanstalk console and EB CLI call this API the
 * first time you create an environment in a region. If the storage location already exists,
 * `CreateStorageLocation` still returns the bucket name but does not create a new
 * bucket.
 */
export const createStorageLocation: API.OperationMethod<
  CreateStorageLocationRequest,
  CreateStorageLocationResultMessage,
  CreateStorageLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStorageLocationRequest,
  output: CreateStorageLocationResultMessage,
  errors: [
    InsufficientPrivilegesException,
    S3SubscriptionRequiredException,
    TooManyBucketsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageLocation",
}));

export type DeleteApplicationError =
  | OperationInProgressException
  | CommonErrors;
/**
 * Deletes the specified application along with all associated versions and
 * configurations. The application versions will not be deleted from your Amazon S3
 * bucket.
 *
 * You cannot delete an application that has a running environment.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationMessage,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationMessage,
  output: DeleteApplicationResponse,
  errors: [OperationInProgressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteApplicationVersionError =
  | InsufficientPrivilegesException
  | OperationInProgressException
  | S3LocationNotInServiceRegionException
  | SourceBundleDeletionException
  | CommonErrors;
/**
 * Deletes the specified version from the specified application.
 *
 * You cannot delete an application version that is associated with a running
 * environment.
 */
export const deleteApplicationVersion: API.OperationMethod<
  DeleteApplicationVersionMessage,
  DeleteApplicationVersionResponse,
  DeleteApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationVersionMessage,
  output: DeleteApplicationVersionResponse,
  errors: [
    InsufficientPrivilegesException,
    OperationInProgressException,
    S3LocationNotInServiceRegionException,
    SourceBundleDeletionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationVersion",
}));

export type DeleteConfigurationTemplateError =
  | OperationInProgressException
  | CommonErrors;
/**
 * Deletes the specified configuration template.
 *
 * When you launch an environment using a configuration template, the environment gets a
 * copy of the template. You can delete or modify the environment's copy of the template
 * without affecting the running environment.
 */
export const deleteConfigurationTemplate: API.OperationMethod<
  DeleteConfigurationTemplateMessage,
  DeleteConfigurationTemplateResponse,
  DeleteConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationTemplateMessage,
  output: DeleteConfigurationTemplateResponse,
  errors: [OperationInProgressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationTemplate",
}));

export type DeleteEnvironmentConfigurationError = CommonErrors;
/**
 * Deletes the draft configuration associated with the running environment.
 *
 * Updating a running environment with any configuration changes creates a draft
 * configuration set. You can get the draft configuration using DescribeConfigurationSettings while the update is in progress or if the update
 * fails. The `DeploymentStatus` for the draft configuration indicates whether the
 * deployment is in process or has failed. The draft configuration remains in existence until it
 * is deleted with this action.
 */
export const deleteEnvironmentConfiguration: API.OperationMethod<
  DeleteEnvironmentConfigurationMessage,
  DeleteEnvironmentConfigurationResponse,
  DeleteEnvironmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentConfigurationMessage,
  output: DeleteEnvironmentConfigurationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironmentConfiguration",
}));

export type DeletePlatformVersionError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | OperationInProgressException
  | PlatformVersionStillReferencedException
  | CommonErrors;
/**
 * Deletes the specified version of a custom platform.
 */
export const deletePlatformVersion: API.OperationMethod<
  DeletePlatformVersionRequest,
  DeletePlatformVersionResult,
  DeletePlatformVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePlatformVersionRequest,
  output: DeletePlatformVersionResult,
  errors: [
    ElasticBeanstalkServiceException,
    InsufficientPrivilegesException,
    OperationInProgressException,
    PlatformVersionStillReferencedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlatformVersion",
}));

export type DescribeAccountAttributesError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Returns attributes related to AWS Elastic Beanstalk that are associated with the calling AWS
 * account.
 *
 * The result currently has one set of attributes—resource quotas.
 */
export const describeAccountAttributes: API.OperationMethod<
  DescribeAccountAttributesRequest,
  DescribeAccountAttributesResult,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountAttributesRequest,
  output: DescribeAccountAttributesResult,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
}));

export type DescribeApplicationsError = CommonErrors;
/**
 * Returns the descriptions of existing applications.
 */
export const describeApplications: API.OperationMethod<
  DescribeApplicationsMessage,
  ApplicationDescriptionsMessage,
  DescribeApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationsMessage,
  output: ApplicationDescriptionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
}));

export type DescribeApplicationVersionsError = CommonErrors;
/**
 * Retrieve a list of application versions.
 */
export const describeApplicationVersions: API.OperationMethod<
  DescribeApplicationVersionsMessage,
  ApplicationVersionDescriptionsMessage,
  DescribeApplicationVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationVersionsMessage,
  output: ApplicationVersionDescriptionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationVersions",
}));

export type DescribeConfigurationOptionsError =
  | TooManyBucketsException
  | CommonErrors;
/**
 * Describes the configuration options that are used in a particular configuration
 * template or environment, or that a specified solution stack defines. The description includes
 * the values the options, their default values, and an indication of the required action on a
 * running environment if an option value is changed.
 */
export const describeConfigurationOptions: API.OperationMethod<
  DescribeConfigurationOptionsMessage,
  ConfigurationOptionsDescription,
  DescribeConfigurationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConfigurationOptionsMessage,
  output: ConfigurationOptionsDescription,
  errors: [TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationOptions",
}));

export type DescribeConfigurationSettingsError =
  | TooManyBucketsException
  | CommonErrors;
/**
 * Returns a description of the settings for the specified configuration set, that is,
 * either a configuration template or the configuration set associated with a running
 * environment.
 *
 * When describing the settings for the configuration set associated with a running
 * environment, it is possible to receive two sets of setting descriptions. One is the deployed
 * configuration set, and the other is a draft configuration of an environment that is either in
 * the process of deployment or that failed to deploy.
 *
 * Related Topics
 *
 * - DeleteEnvironmentConfiguration
 */
export const describeConfigurationSettings: API.OperationMethod<
  DescribeConfigurationSettingsMessage,
  ConfigurationSettingsDescriptions,
  DescribeConfigurationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConfigurationSettingsMessage,
  output: ConfigurationSettingsDescriptions,
  errors: [TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSettings",
}));

export type DescribeEnvironmentHealthError =
  | ElasticBeanstalkServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about the overall health of the specified environment. The
 * **DescribeEnvironmentHealth** operation is only available with
 * AWS Elastic Beanstalk Enhanced Health.
 */
export const describeEnvironmentHealth: API.OperationMethod<
  DescribeEnvironmentHealthRequest,
  DescribeEnvironmentHealthResult,
  DescribeEnvironmentHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEnvironmentHealthRequest,
  output: DescribeEnvironmentHealthResult,
  errors: [ElasticBeanstalkServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentHealth",
}));

export type DescribeEnvironmentManagedActionHistoryError =
  | ElasticBeanstalkServiceException
  | CommonErrors;
/**
 * Lists an environment's completed and failed managed actions.
 */
export const describeEnvironmentManagedActionHistory: API.PaginatedOperationMethod<
  DescribeEnvironmentManagedActionHistoryRequest,
  DescribeEnvironmentManagedActionHistoryResult,
  DescribeEnvironmentManagedActionHistoryError,
  Credentials | HttpClient.HttpClient,
  ManagedActionHistoryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEnvironmentManagedActionHistoryRequest,
  output: DescribeEnvironmentManagedActionHistoryResult,
  errors: [ElasticBeanstalkServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentManagedActionHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ManagedActionHistoryItems",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type DescribeEnvironmentManagedActionsError =
  | ElasticBeanstalkServiceException
  | CommonErrors;
/**
 * Lists an environment's upcoming and in-progress managed actions.
 */
export const describeEnvironmentManagedActions: API.OperationMethod<
  DescribeEnvironmentManagedActionsRequest,
  DescribeEnvironmentManagedActionsResult,
  DescribeEnvironmentManagedActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEnvironmentManagedActionsRequest,
  output: DescribeEnvironmentManagedActionsResult,
  errors: [ElasticBeanstalkServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentManagedActions",
}));

export type DescribeEnvironmentResourcesError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Returns AWS resources for this environment.
 */
export const describeEnvironmentResources: API.OperationMethod<
  DescribeEnvironmentResourcesMessage,
  EnvironmentResourceDescriptionsMessage,
  DescribeEnvironmentResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEnvironmentResourcesMessage,
  output: EnvironmentResourceDescriptionsMessage,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironmentResources",
}));

export type DescribeEnvironmentsError = CommonErrors;
/**
 * Returns descriptions for existing environments.
 */
export const describeEnvironments: API.OperationMethod<
  DescribeEnvironmentsMessage,
  EnvironmentDescriptionsMessage,
  DescribeEnvironmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEnvironmentsMessage,
  output: EnvironmentDescriptionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEnvironments",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns list of event descriptions matching criteria up to the last 6 weeks.
 *
 * This action returns the most recent 1,000 events from the specified
 * `NextToken`.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsMessage,
  EventDescriptionsMessage,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  EventDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventsMessage,
  output: EventDescriptionsMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeInstancesHealthError =
  | ElasticBeanstalkServiceException
  | InvalidRequestException
  | CommonErrors;
/**
 * Retrieves detailed information about the health of instances in your AWS Elastic
 * Beanstalk. This operation requires enhanced health
 * reporting.
 */
export const describeInstancesHealth: API.OperationMethod<
  DescribeInstancesHealthRequest,
  DescribeInstancesHealthResult,
  DescribeInstancesHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInstancesHealthRequest,
  output: DescribeInstancesHealthResult,
  errors: [ElasticBeanstalkServiceException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancesHealth",
}));

export type DescribePlatformVersionError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Describes a platform version. Provides full details. Compare to ListPlatformVersions, which provides summary information about a list of
 * platform versions.
 *
 * For definitions of platform version and other platform-related terms, see AWS Elastic Beanstalk
 * Platforms Glossary.
 */
export const describePlatformVersion: API.OperationMethod<
  DescribePlatformVersionRequest,
  DescribePlatformVersionResult,
  DescribePlatformVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePlatformVersionRequest,
  output: DescribePlatformVersionResult,
  errors: [ElasticBeanstalkServiceException, InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePlatformVersion",
}));

export type DisassociateEnvironmentOperationsRoleError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Disassociate the operations role from an environment. After this call is made, Elastic Beanstalk uses
 * the caller's permissions for permissions to downstream services during subsequent calls acting
 * on this environment. For more information, see Operations roles in the
 * *AWS Elastic Beanstalk Developer Guide*.
 */
export const disassociateEnvironmentOperationsRole: API.OperationMethod<
  DisassociateEnvironmentOperationsRoleMessage,
  DisassociateEnvironmentOperationsRoleResponse,
  DisassociateEnvironmentOperationsRoleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateEnvironmentOperationsRoleMessage,
  output: DisassociateEnvironmentOperationsRoleResponse,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateEnvironmentOperationsRole",
}));

export type ListAvailableSolutionStacksError = CommonErrors;
/**
 * Returns a list of the available solution stack names, with the public version first and
 * then in reverse chronological order.
 */
export const listAvailableSolutionStacks: API.OperationMethod<
  ListAvailableSolutionStacksRequest,
  ListAvailableSolutionStacksResultMessage,
  ListAvailableSolutionStacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAvailableSolutionStacksRequest,
  output: ListAvailableSolutionStacksResultMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableSolutionStacks",
}));

export type ListPlatformBranchesError = CommonErrors;
/**
 * Lists the platform branches available for your account in an AWS Region. Provides
 * summary information about each platform branch.
 *
 * For definitions of platform branch and other platform-related terms, see AWS Elastic Beanstalk
 * Platforms Glossary.
 */
export const listPlatformBranches: API.PaginatedOperationMethod<
  ListPlatformBranchesRequest,
  ListPlatformBranchesResult,
  ListPlatformBranchesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlatformBranchesRequest,
  output: ListPlatformBranchesResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlatformBranches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ListPlatformVersionsError =
  | ElasticBeanstalkServiceException
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Lists the platform versions available for your account in an AWS Region. Provides
 * summary information about each platform version. Compare to DescribePlatformVersion, which provides full details about a single platform
 * version.
 *
 * For definitions of platform version and other platform-related terms, see AWS Elastic Beanstalk
 * Platforms Glossary.
 */
export const listPlatformVersions: API.PaginatedOperationMethod<
  ListPlatformVersionsRequest,
  ListPlatformVersionsResult,
  ListPlatformVersionsError,
  Credentials | HttpClient.HttpClient,
  PlatformSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlatformVersionsRequest,
  output: ListPlatformVersionsResult,
  errors: [ElasticBeanstalkServiceException, InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlatformVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PlatformSummaryList",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InsufficientPrivilegesException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | CommonErrors;
/**
 * Return the tags applied to an AWS Elastic Beanstalk resource. The response contains a list of tag key-value pairs.
 *
 * Elastic Beanstalk supports tagging of all of its resources. For details about resource tagging, see
 * Tagging Application
 * Resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceMessage,
  ResourceTagsDescriptionMessage,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceMessage,
  output: ResourceTagsDescriptionMessage,
  errors: [
    InsufficientPrivilegesException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RebuildEnvironmentError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Deletes and recreates all of the AWS resources (for example: the Auto Scaling group,
 * load balancer, etc.) for a specified environment and forces a restart.
 */
export const rebuildEnvironment: API.OperationMethod<
  RebuildEnvironmentMessage,
  RebuildEnvironmentResponse,
  RebuildEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebuildEnvironmentMessage,
  output: RebuildEnvironmentResponse,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebuildEnvironment",
}));

export type RequestEnvironmentInfoError = CommonErrors;
/**
 * Initiates a request to compile the specified type of information of the deployed
 * environment.
 *
 * Setting the `InfoType` to `tail` compiles the last lines from
 * the application server log files of every Amazon EC2 instance in your environment.
 *
 * Setting the `InfoType` to `bundle` compresses the application
 * server log files for every Amazon EC2 instance into a `.zip` file. Legacy and .NET
 * containers do not support bundle logs.
 *
 * Setting the `InfoType` to `analyze` collects recent events,
 * instance health, and logs from your environment and sends them to Amazon Bedrock in your
 * account to generate diagnostic insights and recommended next steps.
 *
 * Use RetrieveEnvironmentInfo to obtain the set of logs.
 *
 * Related Topics
 *
 * - RetrieveEnvironmentInfo
 */
export const requestEnvironmentInfo: API.OperationMethod<
  RequestEnvironmentInfoMessage,
  RequestEnvironmentInfoResponse,
  RequestEnvironmentInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestEnvironmentInfoMessage,
  output: RequestEnvironmentInfoResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestEnvironmentInfo",
}));

export type RestartAppServerError = CommonErrors;
/**
 * Causes the environment to restart the application container server running on each
 * Amazon EC2 instance.
 */
export const restartAppServer: API.OperationMethod<
  RestartAppServerMessage,
  RestartAppServerResponse,
  RestartAppServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestartAppServerMessage,
  output: RestartAppServerResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartAppServer",
}));

export type RetrieveEnvironmentInfoError = CommonErrors;
/**
 * Retrieves the compiled information from a RequestEnvironmentInfo
 * request.
 *
 * Related Topics
 *
 * - RequestEnvironmentInfo
 */
export const retrieveEnvironmentInfo: API.OperationMethod<
  RetrieveEnvironmentInfoMessage,
  RetrieveEnvironmentInfoResultMessage,
  RetrieveEnvironmentInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RetrieveEnvironmentInfoMessage,
  output: RetrieveEnvironmentInfoResultMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveEnvironmentInfo",
}));

export type SwapEnvironmentCNAMEsError = CommonErrors;
/**
 * Swaps the CNAMEs of two environments.
 */
export const swapEnvironmentCNAMEs: API.OperationMethod<
  SwapEnvironmentCNAMEsMessage,
  SwapEnvironmentCNAMEsResponse,
  SwapEnvironmentCNAMEsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SwapEnvironmentCNAMEsMessage,
  output: SwapEnvironmentCNAMEsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SwapEnvironmentCNAMEs",
}));

export type TerminateEnvironmentError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Terminates the specified environment.
 */
export const terminateEnvironment: API.OperationMethod<
  TerminateEnvironmentMessage,
  EnvironmentDescription,
  TerminateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateEnvironmentMessage,
  output: EnvironmentDescription,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateEnvironment",
}));

export type UpdateApplicationError = CommonErrors;
/**
 * Updates the specified application to have the specified properties.
 *
 * If a property (for example, `description`) is not provided, the value
 * remains unchanged. To clear these properties, specify an empty string.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationMessage,
  ApplicationDescriptionMessage,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationMessage,
  output: ApplicationDescriptionMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateApplicationResourceLifecycleError =
  | InsufficientPrivilegesException
  | CommonErrors;
/**
 * Modifies lifecycle settings for an application.
 */
export const updateApplicationResourceLifecycle: API.OperationMethod<
  UpdateApplicationResourceLifecycleMessage,
  ApplicationResourceLifecycleDescriptionMessage,
  UpdateApplicationResourceLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationResourceLifecycleMessage,
  output: ApplicationResourceLifecycleDescriptionMessage,
  errors: [InsufficientPrivilegesException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationResourceLifecycle",
}));

export type UpdateApplicationVersionError = CommonErrors;
/**
 * Updates the specified application version to have the specified properties.
 *
 * If a property (for example, `description`) is not provided, the value
 * remains unchanged. To clear properties, specify an empty string.
 */
export const updateApplicationVersion: API.OperationMethod<
  UpdateApplicationVersionMessage,
  ApplicationVersionDescriptionMessage,
  UpdateApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationVersionMessage,
  output: ApplicationVersionDescriptionMessage,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationVersion",
}));

export type UpdateConfigurationTemplateError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Updates the specified configuration template to have the specified properties or
 * configuration option values.
 *
 * If a property (for example, `ApplicationName`) is not provided, its value
 * remains unchanged. To clear such properties, specify an empty string.
 *
 * Related Topics
 *
 * - DescribeConfigurationOptions
 */
export const updateConfigurationTemplate: API.OperationMethod<
  UpdateConfigurationTemplateMessage,
  ConfigurationSettingsDescription,
  UpdateConfigurationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationTemplateMessage,
  output: ConfigurationSettingsDescription,
  errors: [InsufficientPrivilegesException, TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationTemplate",
}));

export type UpdateEnvironmentError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Updates the environment description, deploys a new application version, updates the
 * configuration settings to an entirely new configuration template, or updates select
 * configuration option values in the running environment.
 *
 * Attempting to update both the release and configuration is not allowed and AWS Elastic
 * Beanstalk returns an `InvalidParameterCombination` error.
 *
 * When updating the configuration settings to a new template or individual settings, a
 * draft configuration is created and DescribeConfigurationSettings for this
 * environment returns two setting descriptions with different `DeploymentStatus`
 * values.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentMessage,
  EnvironmentDescription,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentMessage,
  output: EnvironmentDescription,
  errors: [InsufficientPrivilegesException, TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
}));

export type UpdateTagsForResourceError =
  | InsufficientPrivilegesException
  | OperationInProgressException
  | ResourceNotFoundException
  | ResourceTypeNotSupportedException
  | TooManyTagsException
  | CommonErrors;
/**
 * Update the list of tags applied to an AWS Elastic Beanstalk resource. Two lists can be passed: `TagsToAdd`
 * for tags to add or update, and `TagsToRemove`.
 *
 * Elastic Beanstalk supports tagging of all of its resources. For details about resource tagging, see
 * Tagging Application
 * Resources.
 *
 * If you create a custom IAM user policy to control permission to this operation, specify
 * one of the following two virtual actions (or both) instead of the API operation name:
 *
 * ### elasticbeanstalk:AddTags
 *
 * Controls permission to call `UpdateTagsForResource` and pass a list of tags to add in the `TagsToAdd`
 * parameter.
 *
 * ### elasticbeanstalk:RemoveTags
 *
 * Controls permission to call `UpdateTagsForResource` and pass a list of tag keys to remove in the `TagsToRemove`
 * parameter.
 *
 * For details about creating a custom user policy, see Creating a Custom User Policy.
 */
export const updateTagsForResource: API.OperationMethod<
  UpdateTagsForResourceMessage,
  UpdateTagsForResourceResponse,
  UpdateTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTagsForResourceMessage,
  output: UpdateTagsForResourceResponse,
  errors: [
    InsufficientPrivilegesException,
    OperationInProgressException,
    ResourceNotFoundException,
    ResourceTypeNotSupportedException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTagsForResource",
}));

export type ValidateConfigurationSettingsError =
  | InsufficientPrivilegesException
  | TooManyBucketsException
  | CommonErrors;
/**
 * Takes a set of configuration settings and either a configuration template or
 * environment, and determines whether those values are valid.
 *
 * This action returns a list of messages indicating any errors or warnings associated
 * with the selection of option values.
 */
export const validateConfigurationSettings: API.OperationMethod<
  ValidateConfigurationSettingsMessage,
  ConfigurationSettingsValidationMessages,
  ValidateConfigurationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateConfigurationSettingsMessage,
  output: ConfigurationSettingsValidationMessages,
  errors: [InsufficientPrivilegesException, TooManyBucketsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateConfigurationSettings",
}));
