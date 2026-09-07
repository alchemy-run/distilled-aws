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
  sdkId: "Service Quotas",
  serviceShapeName: "ServiceQuotasV20190624",
});
const auth = T.AwsAuthSigv4({ name: "servicequotas" });
const ver = T.ServiceVersion("2019-06-24");
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
              `https://servicequotas-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://servicequotas.${Region}.amazonaws.com`);
            }
            return e(
              `https://servicequotas-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://servicequotas.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://servicequotas.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class AWSServiceAccessNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<AWSServiceAccessNotEnabledException>()(
    "AWSServiceAccessNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class DependencyAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<DependencyAccessDeniedException>()(
    "DependencyAccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class IllegalArgumentException
  extends /*@__PURE__*/ S.TaggedError<IllegalArgumentException>()(
    "IllegalArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class NoAvailableOrganizationException
  extends /*@__PURE__*/ S.TaggedError<NoAvailableOrganizationException>()(
    "NoAvailableOrganizationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NoSuchResourceException
  extends /*@__PURE__*/ S.TaggedError<NoSuchResourceException>()(
    "NoSuchResourceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotInAllFeaturesModeException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotInAllFeaturesModeException>()(
    "OrganizationNotInAllFeaturesModeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class QuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<QuotaExceededException>()(
    "QuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaTemplateNotInUseException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaTemplateNotInUseException>()(
    "ServiceQuotaTemplateNotInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyViolationException>()(
    "TagPolicyViolationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class TemplatesNotAvailableInRegionException
  extends /*@__PURE__*/ S.TaggedError<TemplatesNotAvailableInRegionException>()(
    "TemplatesNotAvailableInRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AssociateServiceQuotaTemplateRequest {}
export const AssociateServiceQuotaTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AssociateServiceQuotaTemplateRequest",
}) as any as S.Schema<AssociateServiceQuotaTemplateRequest>;
export interface AssociateServiceQuotaTemplateResponse {}
export const AssociateServiceQuotaTemplateResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociateServiceQuotaTemplateResponse",
}) as any as S.Schema<AssociateServiceQuotaTemplateResponse>;
export type RequestId = string;
export interface CreateSupportCaseRequest {
  RequestId: string;
}
export const CreateSupportCaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSupportCaseRequest",
}) as any as S.Schema<CreateSupportCaseRequest>;
export interface CreateSupportCaseResponse {}
export const CreateSupportCaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateSupportCaseResponse",
}) as any as S.Schema<CreateSupportCaseResponse>;
export type ServiceCode = string;
export type QuotaCode = string;
export type AwsRegion = string;
export interface DeleteServiceQuotaIncreaseRequestFromTemplateRequest {
  ServiceCode: string;
  QuotaCode: string;
  AwsRegion: string;
}
export const DeleteServiceQuotaIncreaseRequestFromTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceCode: S.String,
      QuotaCode: S.String,
      AwsRegion: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteServiceQuotaIncreaseRequestFromTemplateRequest",
  }) as any as S.Schema<DeleteServiceQuotaIncreaseRequestFromTemplateRequest>;
export interface DeleteServiceQuotaIncreaseRequestFromTemplateResponse {}
export const DeleteServiceQuotaIncreaseRequestFromTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteServiceQuotaIncreaseRequestFromTemplateResponse",
  }) as any as S.Schema<DeleteServiceQuotaIncreaseRequestFromTemplateResponse>;
export interface DisassociateServiceQuotaTemplateRequest {}
export const DisassociateServiceQuotaTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateServiceQuotaTemplateRequest",
}) as any as S.Schema<DisassociateServiceQuotaTemplateRequest>;
export interface DisassociateServiceQuotaTemplateResponse {}
export const DisassociateServiceQuotaTemplateResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DisassociateServiceQuotaTemplateResponse",
}) as any as S.Schema<DisassociateServiceQuotaTemplateResponse>;
export interface GetAssociationForServiceQuotaTemplateRequest {}
export const GetAssociationForServiceQuotaTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetAssociationForServiceQuotaTemplateRequest",
  }) as any as S.Schema<GetAssociationForServiceQuotaTemplateRequest>;
export type ServiceQuotaTemplateAssociationStatus =
  | "ASSOCIATED"
  | "DISASSOCIATED"
  | (string & {});
export const ServiceQuotaTemplateAssociationStatus = S.String;

export interface GetAssociationForServiceQuotaTemplateResponse {
  ServiceQuotaTemplateAssociationStatus?: ServiceQuotaTemplateAssociationStatus;
}
export const GetAssociationForServiceQuotaTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceQuotaTemplateAssociationStatus: S.optional(
        ServiceQuotaTemplateAssociationStatus,
      ),
    }),
  ).annotate({
    identifier: "GetAssociationForServiceQuotaTemplateResponse",
  }) as any as S.Schema<GetAssociationForServiceQuotaTemplateResponse>;
export interface GetAutoManagementConfigurationRequest {}
export const GetAutoManagementConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetAutoManagementConfigurationRequest",
}) as any as S.Schema<GetAutoManagementConfigurationRequest>;
export type OptInLevel = "ACCOUNT" | (string & {});
export const OptInLevel = S.String;

export type OptInType = "NotifyOnly" | "NotifyAndAdjust" | (string & {});
export const OptInType = S.String;

export type AmazonResourceName = string;
export type OptInStatus = "ENABLED" | "DISABLED" | (string & {});
export const OptInStatus = S.String;

export type ExcludedService = string;
export type QuotaName = string;
export interface QuotaInfo {
  QuotaCode?: string;
  QuotaName?: string;
}
export const QuotaInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuotaCode: S.optional(S.String),
    QuotaName: S.optional(S.String),
  }),
).annotate({ identifier: "QuotaInfo" }) as any as S.Schema<QuotaInfo>;
export type QuotaInfoList = QuotaInfo[];
export const QuotaInfoList = /*@__PURE__*/ S.Array(QuotaInfo);
export type ExclusionQuotaList = { [key: string]: QuotaInfo[] | undefined };
export const ExclusionQuotaList = /*@__PURE__*/ S.Record(
  S.String,
  QuotaInfoList.pipe(S.optional),
);
export interface GetAutoManagementConfigurationResponse {
  OptInLevel?: OptInLevel;
  OptInType?: OptInType;
  NotificationArn?: string;
  OptInStatus?: OptInStatus;
  ExclusionList?: { [key: string]: QuotaInfo[] | undefined };
}
export const GetAutoManagementConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OptInLevel: S.optional(OptInLevel),
      OptInType: S.optional(OptInType),
      NotificationArn: S.optional(S.String),
      OptInStatus: S.optional(OptInStatus),
      ExclusionList: S.optional(ExclusionQuotaList),
    }),
).annotate({
  identifier: "GetAutoManagementConfigurationResponse",
}) as any as S.Schema<GetAutoManagementConfigurationResponse>;
export interface GetAWSDefaultServiceQuotaRequest {
  ServiceCode: string;
  QuotaCode: string;
}
export const GetAWSDefaultServiceQuotaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceCode: S.String, QuotaCode: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAWSDefaultServiceQuotaRequest",
}) as any as S.Schema<GetAWSDefaultServiceQuotaRequest>;
export type ServiceName = string;
export type QuotaArn = string;
export type QuotaValue = number;
export type QuotaUnit = string;
export type QuotaAdjustable = boolean;
export type GlobalQuota = boolean;
export type QuotaMetricNamespace = string;
export type QuotaMetricName = string;
export type MetricDimensionName = string;
export type MetricDimensionValue = string;
export type MetricDimensionsMapDefinition = {
  [key: string]: string | undefined;
};
export const MetricDimensionsMapDefinition = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Statistic = string;
export interface MetricInfo {
  MetricNamespace?: string;
  MetricName?: string;
  MetricDimensions?: { [key: string]: string | undefined };
  MetricStatisticRecommendation?: string;
}
export const MetricInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricNamespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    MetricDimensions: S.optional(MetricDimensionsMapDefinition),
    MetricStatisticRecommendation: S.optional(S.String),
  }),
).annotate({ identifier: "MetricInfo" }) as any as S.Schema<MetricInfo>;
export type PeriodValue = number;
export type PeriodUnit =
  | "MICROSECOND"
  | "MILLISECOND"
  | "SECOND"
  | "MINUTE"
  | "HOUR"
  | "DAY"
  | "WEEK"
  | (string & {});
export const PeriodUnit = S.String;

export interface QuotaPeriod {
  PeriodValue?: number;
  PeriodUnit?: PeriodUnit;
}
export const QuotaPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PeriodValue: S.optional(S.Number),
    PeriodUnit: S.optional(PeriodUnit),
  }),
).annotate({ identifier: "QuotaPeriod" }) as any as S.Schema<QuotaPeriod>;
export type ErrorCode =
  | "DEPENDENCY_ACCESS_DENIED_ERROR"
  | "DEPENDENCY_THROTTLING_ERROR"
  | "DEPENDENCY_SERVICE_ERROR"
  | "SERVICE_QUOTA_NOT_AVAILABLE_ERROR"
  | (string & {});
export const ErrorCode = S.String;

export type ErrorMessage = string;
export interface ErrorReason {
  ErrorCode?: ErrorCode;
  ErrorMessage?: string;
}
export const ErrorReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(ErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorReason" }) as any as S.Schema<ErrorReason>;
export type AppliedLevelEnum = "ACCOUNT" | "RESOURCE" | "ALL" | (string & {});
export const AppliedLevelEnum = S.String;

export type QuotaContextScope = "RESOURCE" | "ACCOUNT" | (string & {});
export const QuotaContextScope = S.String;

export type QuotaContextScopeType = string;
export type QuotaContextId = string;
export interface QuotaContextInfo {
  ContextScope?: QuotaContextScope;
  ContextScopeType?: string;
  ContextId?: string;
}
export const QuotaContextInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContextScope: S.optional(QuotaContextScope),
    ContextScopeType: S.optional(S.String),
    ContextId: S.optional(S.String),
  }),
).annotate({
  identifier: "QuotaContextInfo",
}) as any as S.Schema<QuotaContextInfo>;
export type QuotaDescription = string;
export interface ServiceQuota {
  ServiceCode?: string;
  ServiceName?: string;
  QuotaArn?: string;
  QuotaCode?: string;
  QuotaName?: string;
  Value?: number;
  Unit?: string;
  Adjustable?: boolean;
  GlobalQuota?: boolean;
  UsageMetric?: MetricInfo;
  Period?: QuotaPeriod;
  ErrorReason?: ErrorReason;
  QuotaAppliedAtLevel?: AppliedLevelEnum;
  QuotaContext?: QuotaContextInfo;
  Description?: string;
}
export const ServiceQuota = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.optional(S.String),
    ServiceName: S.optional(S.String),
    QuotaArn: S.optional(S.String),
    QuotaCode: S.optional(S.String),
    QuotaName: S.optional(S.String),
    Value: S.optional(S.Number),
    Unit: S.optional(S.String),
    Adjustable: S.optional(S.Boolean),
    GlobalQuota: S.optional(S.Boolean),
    UsageMetric: S.optional(MetricInfo),
    Period: S.optional(QuotaPeriod),
    ErrorReason: S.optional(ErrorReason),
    QuotaAppliedAtLevel: S.optional(AppliedLevelEnum),
    QuotaContext: S.optional(QuotaContextInfo),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceQuota" }) as any as S.Schema<ServiceQuota>;
export interface GetAWSDefaultServiceQuotaResponse {
  Quota?: ServiceQuota;
}
export const GetAWSDefaultServiceQuotaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Quota: S.optional(ServiceQuota) }),
).annotate({
  identifier: "GetAWSDefaultServiceQuotaResponse",
}) as any as S.Schema<GetAWSDefaultServiceQuotaResponse>;
export type ReportId = string;
export type NextToken = string;
export type MaxResultsUtilization = number;
export interface GetQuotaUtilizationReportRequest {
  ReportId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetQuotaUtilizationReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetQuotaUtilizationReportRequest",
}) as any as S.Schema<GetQuotaUtilizationReportRequest>;
export type ReportStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ReportStatus = S.String;

export type TotalCount = number;
export type UtilizationPct = number;
export type DefaultValue = number;
export type AppliedValue = number;
export interface QuotaUtilizationInfo {
  QuotaCode?: string;
  ServiceCode?: string;
  QuotaName?: string;
  Namespace?: string;
  Utilization?: number;
  DefaultValue?: number;
  AppliedValue?: number;
  ServiceName?: string;
  Adjustable?: boolean;
}
export const QuotaUtilizationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuotaCode: S.optional(S.String),
    ServiceCode: S.optional(S.String),
    QuotaName: S.optional(S.String),
    Namespace: S.optional(S.String),
    Utilization: S.optional(S.Number),
    DefaultValue: S.optional(S.Number),
    AppliedValue: S.optional(S.Number),
    ServiceName: S.optional(S.String),
    Adjustable: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "QuotaUtilizationInfo",
}) as any as S.Schema<QuotaUtilizationInfo>;
export type QuotaUtilizationInfoList = QuotaUtilizationInfo[];
export const QuotaUtilizationInfoList =
  /*@__PURE__*/ S.Array(QuotaUtilizationInfo);
export type ReportErrorCode = string;
export type ReportErrorMessage = string;
export interface GetQuotaUtilizationReportResponse {
  ReportId?: string;
  Status?: ReportStatus;
  GeneratedAt?: Date;
  TotalCount?: number;
  Quotas?: QuotaUtilizationInfo[];
  NextToken?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const GetQuotaUtilizationReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportId: S.optional(S.String),
    Status: S.optional(ReportStatus),
    GeneratedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TotalCount: S.optional(S.Number),
    Quotas: S.optional(QuotaUtilizationInfoList),
    NextToken: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "GetQuotaUtilizationReportResponse",
}) as any as S.Schema<GetQuotaUtilizationReportResponse>;
export interface GetRequestedServiceQuotaChangeRequest {
  RequestId: string;
}
export const GetRequestedServiceQuotaChangeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RequestId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetRequestedServiceQuotaChangeRequest",
}) as any as S.Schema<GetRequestedServiceQuotaChangeRequest>;
export type RequestType = "AutomaticManagement" | (string & {});
export const RequestType = S.String;

export type CustomerServiceEngagementId = string;
export type RequestStatus =
  | "PENDING"
  | "CASE_OPENED"
  | "APPROVED"
  | "DENIED"
  | "CASE_CLOSED"
  | "NOT_APPROVED"
  | "INVALID_REQUEST"
  | (string & {});
export const RequestStatus = S.String;

export type Requester = string;
export interface RequestedServiceQuotaChange {
  Id?: string;
  RequestType?: RequestType;
  CaseId?: string;
  ServiceCode?: string;
  ServiceName?: string;
  QuotaCode?: string;
  QuotaName?: string;
  DesiredValue?: number;
  Status?: RequestStatus;
  Created?: Date;
  LastUpdated?: Date;
  Requester?: string;
  QuotaArn?: string;
  GlobalQuota?: boolean;
  Unit?: string;
  QuotaRequestedAtLevel?: AppliedLevelEnum;
  QuotaContext?: QuotaContextInfo;
}
export const RequestedServiceQuotaChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    RequestType: S.optional(RequestType),
    CaseId: S.optional(S.String),
    ServiceCode: S.optional(S.String),
    ServiceName: S.optional(S.String),
    QuotaCode: S.optional(S.String),
    QuotaName: S.optional(S.String),
    DesiredValue: S.optional(S.Number),
    Status: S.optional(RequestStatus),
    Created: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Requester: S.optional(S.String),
    QuotaArn: S.optional(S.String),
    GlobalQuota: S.optional(S.Boolean),
    Unit: S.optional(S.String),
    QuotaRequestedAtLevel: S.optional(AppliedLevelEnum),
    QuotaContext: S.optional(QuotaContextInfo),
  }),
).annotate({
  identifier: "RequestedServiceQuotaChange",
}) as any as S.Schema<RequestedServiceQuotaChange>;
export interface GetRequestedServiceQuotaChangeResponse {
  RequestedQuota?: RequestedServiceQuotaChange;
}
export const GetRequestedServiceQuotaChangeResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RequestedQuota: S.optional(RequestedServiceQuotaChange) }),
).annotate({
  identifier: "GetRequestedServiceQuotaChangeResponse",
}) as any as S.Schema<GetRequestedServiceQuotaChangeResponse>;
export interface GetServiceQuotaRequest {
  ServiceCode: string;
  QuotaCode: string;
  ContextId?: string;
}
export const GetServiceQuotaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    QuotaCode: S.String,
    ContextId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetServiceQuotaRequest",
}) as any as S.Schema<GetServiceQuotaRequest>;
export interface GetServiceQuotaResponse {
  Quota?: ServiceQuota;
}
export const GetServiceQuotaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Quota: S.optional(ServiceQuota) }),
).annotate({
  identifier: "GetServiceQuotaResponse",
}) as any as S.Schema<GetServiceQuotaResponse>;
export interface GetServiceQuotaIncreaseRequestFromTemplateRequest {
  ServiceCode: string;
  QuotaCode: string;
  AwsRegion: string;
}
export const GetServiceQuotaIncreaseRequestFromTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceCode: S.String,
      QuotaCode: S.String,
      AwsRegion: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetServiceQuotaIncreaseRequestFromTemplateRequest",
  }) as any as S.Schema<GetServiceQuotaIncreaseRequestFromTemplateRequest>;
export interface ServiceQuotaIncreaseRequestInTemplate {
  ServiceCode?: string;
  ServiceName?: string;
  QuotaCode?: string;
  QuotaName?: string;
  DesiredValue?: number;
  AwsRegion?: string;
  Unit?: string;
  GlobalQuota?: boolean;
}
export const ServiceQuotaIncreaseRequestInTemplate = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServiceCode: S.optional(S.String),
      ServiceName: S.optional(S.String),
      QuotaCode: S.optional(S.String),
      QuotaName: S.optional(S.String),
      DesiredValue: S.optional(S.Number),
      AwsRegion: S.optional(S.String),
      Unit: S.optional(S.String),
      GlobalQuota: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "ServiceQuotaIncreaseRequestInTemplate",
}) as any as S.Schema<ServiceQuotaIncreaseRequestInTemplate>;
export interface GetServiceQuotaIncreaseRequestFromTemplateResponse {
  ServiceQuotaIncreaseRequestInTemplate?: ServiceQuotaIncreaseRequestInTemplate;
}
export const GetServiceQuotaIncreaseRequestFromTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceQuotaIncreaseRequestInTemplate: S.optional(
        ServiceQuotaIncreaseRequestInTemplate,
      ),
    }),
  ).annotate({
    identifier: "GetServiceQuotaIncreaseRequestFromTemplateResponse",
  }) as any as S.Schema<GetServiceQuotaIncreaseRequestFromTemplateResponse>;
export type MaxResults = number;
export interface ListAWSDefaultServiceQuotasRequest {
  ServiceCode: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAWSDefaultServiceQuotasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAWSDefaultServiceQuotasRequest",
}) as any as S.Schema<ListAWSDefaultServiceQuotasRequest>;
export type ServiceQuotaListDefinition = ServiceQuota[];
export const ServiceQuotaListDefinition = /*@__PURE__*/ S.Array(ServiceQuota);
export interface ListAWSDefaultServiceQuotasResponse {
  NextToken?: string;
  Quotas?: ServiceQuota[];
}
export const ListAWSDefaultServiceQuotasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Quotas: S.optional(ServiceQuotaListDefinition),
  }),
).annotate({
  identifier: "ListAWSDefaultServiceQuotasResponse",
}) as any as S.Schema<ListAWSDefaultServiceQuotasResponse>;
export interface ListRequestedServiceQuotaChangeHistoryRequest {
  ServiceCode?: string;
  Status?: RequestStatus;
  NextToken?: string;
  MaxResults?: number;
  QuotaRequestedAtLevel?: AppliedLevelEnum;
}
export const ListRequestedServiceQuotaChangeHistoryRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceCode: S.optional(S.String),
      Status: S.optional(RequestStatus),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      QuotaRequestedAtLevel: S.optional(AppliedLevelEnum),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListRequestedServiceQuotaChangeHistoryRequest",
  }) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryRequest>;
export type RequestedServiceQuotaChangeHistoryListDefinition =
  RequestedServiceQuotaChange[];
export const RequestedServiceQuotaChangeHistoryListDefinition =
  /*@__PURE__*/ S.Array(RequestedServiceQuotaChange);
export interface ListRequestedServiceQuotaChangeHistoryResponse {
  NextToken?: string;
  RequestedQuotas?: RequestedServiceQuotaChange[];
}
export const ListRequestedServiceQuotaChangeHistoryResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      RequestedQuotas: S.optional(
        RequestedServiceQuotaChangeHistoryListDefinition,
      ),
    }),
  ).annotate({
    identifier: "ListRequestedServiceQuotaChangeHistoryResponse",
  }) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryResponse>;
export interface ListRequestedServiceQuotaChangeHistoryByQuotaRequest {
  ServiceCode: string;
  QuotaCode: string;
  Status?: RequestStatus;
  NextToken?: string;
  MaxResults?: number;
  QuotaRequestedAtLevel?: AppliedLevelEnum;
}
export const ListRequestedServiceQuotaChangeHistoryByQuotaRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceCode: S.String,
      QuotaCode: S.String,
      Status: S.optional(RequestStatus),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      QuotaRequestedAtLevel: S.optional(AppliedLevelEnum),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListRequestedServiceQuotaChangeHistoryByQuotaRequest",
  }) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryByQuotaRequest>;
export interface ListRequestedServiceQuotaChangeHistoryByQuotaResponse {
  NextToken?: string;
  RequestedQuotas?: RequestedServiceQuotaChange[];
}
export const ListRequestedServiceQuotaChangeHistoryByQuotaResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      RequestedQuotas: S.optional(
        RequestedServiceQuotaChangeHistoryListDefinition,
      ),
    }),
  ).annotate({
    identifier: "ListRequestedServiceQuotaChangeHistoryByQuotaResponse",
  }) as any as S.Schema<ListRequestedServiceQuotaChangeHistoryByQuotaResponse>;
export interface ListServiceQuotaIncreaseRequestsInTemplateRequest {
  ServiceCode?: string;
  AwsRegion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListServiceQuotaIncreaseRequestsInTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceCode: S.optional(S.String),
      AwsRegion: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListServiceQuotaIncreaseRequestsInTemplateRequest",
  }) as any as S.Schema<ListServiceQuotaIncreaseRequestsInTemplateRequest>;
export type ServiceQuotaIncreaseRequestInTemplateList =
  ServiceQuotaIncreaseRequestInTemplate[];
export const ServiceQuotaIncreaseRequestInTemplateList = /*@__PURE__*/ S.Array(
  ServiceQuotaIncreaseRequestInTemplate,
);
export interface ListServiceQuotaIncreaseRequestsInTemplateResponse {
  ServiceQuotaIncreaseRequestInTemplateList?: ServiceQuotaIncreaseRequestInTemplate[];
  NextToken?: string;
}
export const ListServiceQuotaIncreaseRequestsInTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceQuotaIncreaseRequestInTemplateList: S.optional(
        ServiceQuotaIncreaseRequestInTemplateList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListServiceQuotaIncreaseRequestsInTemplateResponse",
  }) as any as S.Schema<ListServiceQuotaIncreaseRequestsInTemplateResponse>;
export interface ListServiceQuotasRequest {
  ServiceCode: string;
  NextToken?: string;
  MaxResults?: number;
  QuotaCode?: string;
  QuotaAppliedAtLevel?: AppliedLevelEnum;
}
export const ListServiceQuotasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    QuotaCode: S.optional(S.String),
    QuotaAppliedAtLevel: S.optional(AppliedLevelEnum),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceQuotasRequest",
}) as any as S.Schema<ListServiceQuotasRequest>;
export interface ListServiceQuotasResponse {
  NextToken?: string;
  Quotas?: ServiceQuota[];
}
export const ListServiceQuotasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Quotas: S.optional(ServiceQuotaListDefinition),
  }),
).annotate({
  identifier: "ListServiceQuotasResponse",
}) as any as S.Schema<ListServiceQuotasResponse>;
export interface ListServicesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServicesRequest",
}) as any as S.Schema<ListServicesRequest>;
export interface ServiceInfo {
  ServiceCode?: string;
  ServiceName?: string;
}
export const ServiceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.optional(S.String),
    ServiceName: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceInfo" }) as any as S.Schema<ServiceInfo>;
export type ServiceInfoListDefinition = ServiceInfo[];
export const ServiceInfoListDefinition = /*@__PURE__*/ S.Array(ServiceInfo);
export interface ListServicesResponse {
  NextToken?: string;
  Services?: ServiceInfo[];
}
export const ListServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Services: S.optional(ServiceInfoListDefinition),
  }),
).annotate({
  identifier: "ListServicesResponse",
}) as any as S.Schema<ListServicesResponse>;
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
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type OutputTags = Tag[];
export const OutputTags = /*@__PURE__*/ S.Array(Tag);
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(OutputTags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutServiceQuotaIncreaseRequestIntoTemplateRequest {
  QuotaCode: string;
  ServiceCode: string;
  AwsRegion: string;
  DesiredValue: number;
}
export const PutServiceQuotaIncreaseRequestIntoTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      QuotaCode: S.String,
      ServiceCode: S.String,
      AwsRegion: S.String,
      DesiredValue: S.Number,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "PutServiceQuotaIncreaseRequestIntoTemplateRequest",
  }) as any as S.Schema<PutServiceQuotaIncreaseRequestIntoTemplateRequest>;
export interface PutServiceQuotaIncreaseRequestIntoTemplateResponse {
  ServiceQuotaIncreaseRequestInTemplate?: ServiceQuotaIncreaseRequestInTemplate;
}
export const PutServiceQuotaIncreaseRequestIntoTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceQuotaIncreaseRequestInTemplate: S.optional(
        ServiceQuotaIncreaseRequestInTemplate,
      ),
    }),
  ).annotate({
    identifier: "PutServiceQuotaIncreaseRequestIntoTemplateResponse",
  }) as any as S.Schema<PutServiceQuotaIncreaseRequestIntoTemplateResponse>;
export type SupportCaseAllowed = boolean;
export interface RequestServiceQuotaIncreaseRequest {
  ServiceCode: string;
  QuotaCode: string;
  DesiredValue: number;
  ContextId?: string;
  SupportCaseAllowed?: boolean;
}
export const RequestServiceQuotaIncreaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    QuotaCode: S.String,
    DesiredValue: S.Number,
    ContextId: S.optional(S.String),
    SupportCaseAllowed: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RequestServiceQuotaIncreaseRequest",
}) as any as S.Schema<RequestServiceQuotaIncreaseRequest>;
export interface RequestServiceQuotaIncreaseResponse {
  RequestedQuota?: RequestedServiceQuotaChange;
}
export const RequestServiceQuotaIncreaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestedQuota: S.optional(RequestedServiceQuotaChange) }),
).annotate({
  identifier: "RequestServiceQuotaIncreaseResponse",
}) as any as S.Schema<RequestServiceQuotaIncreaseResponse>;
export type ExcludedLimit = string;
export type ExcludedQuotaList = string[];
export const ExcludedQuotaList = /*@__PURE__*/ S.Array(S.String);
export type ExclusionList = { [key: string]: string[] | undefined };
export const ExclusionList = /*@__PURE__*/ S.Record(
  S.String,
  ExcludedQuotaList.pipe(S.optional),
);
export interface StartAutoManagementRequest {
  OptInLevel: OptInLevel;
  OptInType: OptInType;
  NotificationArn?: string;
  ExclusionList?: { [key: string]: string[] | undefined };
}
export const StartAutoManagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptInLevel: OptInLevel,
    OptInType: OptInType,
    NotificationArn: S.optional(S.String),
    ExclusionList: S.optional(ExclusionList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAutoManagementRequest",
}) as any as S.Schema<StartAutoManagementRequest>;
export interface StartAutoManagementResponse {}
export const StartAutoManagementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartAutoManagementResponse",
}) as any as S.Schema<StartAutoManagementResponse>;
export interface StartQuotaUtilizationReportRequest {}
export const StartQuotaUtilizationReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartQuotaUtilizationReportRequest",
}) as any as S.Schema<StartQuotaUtilizationReportRequest>;
export type ReportMessage = string;
export interface StartQuotaUtilizationReportResponse {
  ReportId?: string;
  Status?: ReportStatus;
  Message?: string;
}
export const StartQuotaUtilizationReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportId: S.optional(S.String),
    Status: S.optional(ReportStatus),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "StartQuotaUtilizationReportResponse",
}) as any as S.Schema<StartQuotaUtilizationReportResponse>;
export interface StopAutoManagementRequest {}
export const StopAutoManagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopAutoManagementRequest",
}) as any as S.Schema<StopAutoManagementRequest>;
export interface StopAutoManagementResponse {}
export const StopAutoManagementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopAutoManagementResponse",
}) as any as S.Schema<StopAutoManagementResponse>;
export type InputTags = Tag[];
export const InputTags = /*@__PURE__*/ S.Array(Tag);
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: InputTags }).pipe(
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
export type InputTagKeys = string[];
export const InputTagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: InputTagKeys }).pipe(
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
export interface UpdateAutoManagementRequest {
  OptInType?: OptInType;
  NotificationArn?: string;
  ExclusionList?: { [key: string]: string[] | undefined };
}
export const UpdateAutoManagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptInType: S.optional(OptInType),
    NotificationArn: S.optional(S.String),
    ExclusionList: S.optional(ExclusionList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAutoManagementRequest",
}) as any as S.Schema<UpdateAutoManagementRequest>;
export interface UpdateAutoManagementResponse {}
export const UpdateAutoManagementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAutoManagementResponse",
}) as any as S.Schema<UpdateAutoManagementResponse>;
export type ExceptionMessage = string;
export type AssociateServiceQuotaTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | NoAvailableOrganizationException
  | OrganizationNotInAllFeaturesModeException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates your quota request template with your organization. When a new
 * Amazon Web Services account is created in your organization, the quota increase requests in the
 * template are automatically applied to the account. You can add a quota increase request
 * for any adjustable quota to your template.
 */
export const associateServiceQuotaTemplate: API.OperationMethod<
  AssociateServiceQuotaTemplateRequest,
  AssociateServiceQuotaTemplateResponse,
  AssociateServiceQuotaTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateServiceQuotaTemplateRequest,
  output: AssociateServiceQuotaTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    NoAvailableOrganizationException,
    OrganizationNotInAllFeaturesModeException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateServiceQuotaTemplate",
}));

export type CreateSupportCaseError =
  | AccessDeniedException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | InvalidResourceStateException
  | NoSuchResourceException
  | ResourceAlreadyExistsException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Support case for an existing quota increase request. This call only creates
 * a Support case if the request has a `Pending` status.
 */
export const createSupportCase: API.OperationMethod<
  CreateSupportCaseRequest,
  CreateSupportCaseResponse,
  CreateSupportCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSupportCaseRequest,
  output: CreateSupportCaseResponse,
  errors: [
    AccessDeniedException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    InvalidResourceStateException,
    NoSuchResourceException,
    ResourceAlreadyExistsException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSupportCase",
}));

export type DeleteServiceQuotaIncreaseRequestFromTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | NoSuchResourceException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the quota increase request for the specified quota from your quota request
 * template.
 */
export const deleteServiceQuotaIncreaseRequestFromTemplate: API.OperationMethod<
  DeleteServiceQuotaIncreaseRequestFromTemplateRequest,
  DeleteServiceQuotaIncreaseRequestFromTemplateResponse,
  DeleteServiceQuotaIncreaseRequestFromTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceQuotaIncreaseRequestFromTemplateRequest,
  output: DeleteServiceQuotaIncreaseRequestFromTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    NoSuchResourceException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceQuotaIncreaseRequestFromTemplate",
}));

export type DisassociateServiceQuotaTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | NoAvailableOrganizationException
  | ServiceException
  | ServiceQuotaTemplateNotInUseException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables your quota request template. After a template is disabled, the quota increase
 * requests in the template are not applied to new Amazon Web Services accounts in your organization.
 * Disabling a quota request template does not apply its quota increase requests.
 */
export const disassociateServiceQuotaTemplate: API.OperationMethod<
  DisassociateServiceQuotaTemplateRequest,
  DisassociateServiceQuotaTemplateResponse,
  DisassociateServiceQuotaTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateServiceQuotaTemplateRequest,
  output: DisassociateServiceQuotaTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    NoAvailableOrganizationException,
    ServiceException,
    ServiceQuotaTemplateNotInUseException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateServiceQuotaTemplate",
}));

export type GetAssociationForServiceQuotaTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | NoAvailableOrganizationException
  | ServiceException
  | ServiceQuotaTemplateNotInUseException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the status of the association for the quota request template.
 */
export const getAssociationForServiceQuotaTemplate: API.OperationMethod<
  GetAssociationForServiceQuotaTemplateRequest,
  GetAssociationForServiceQuotaTemplateResponse,
  GetAssociationForServiceQuotaTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssociationForServiceQuotaTemplateRequest,
  output: GetAssociationForServiceQuotaTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    NoAvailableOrganizationException,
    ServiceException,
    ServiceQuotaTemplateNotInUseException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssociationForServiceQuotaTemplate",
}));

export type GetAutoManagementConfigurationError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about your Service Quotas Automatic Management configuration. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const getAutoManagementConfiguration: API.OperationMethod<
  GetAutoManagementConfigurationRequest,
  GetAutoManagementConfigurationResponse,
  GetAutoManagementConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutoManagementConfigurationRequest,
  output: GetAutoManagementConfigurationResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutoManagementConfiguration",
}));

export type GetAWSDefaultServiceQuotaError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the default value for the specified quota. The default value does not
 * reflect any quota increases.
 */
export const getAWSDefaultServiceQuota: API.OperationMethod<
  GetAWSDefaultServiceQuotaRequest,
  GetAWSDefaultServiceQuotaResponse,
  GetAWSDefaultServiceQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAWSDefaultServiceQuotaRequest,
  output: GetAWSDefaultServiceQuotaResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAWSDefaultServiceQuota",
}));

export type GetQuotaUtilizationReportError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the quota utilization report for your Amazon Web Services account. This operation returns
 * paginated results showing your quota usage across all Amazon Web Services services, sorted by utilization
 * percentage in descending order (highest utilization first).
 *
 * You must first initiate a report using the `StartQuotaUtilizationReport`
 * operation. The report generation process is asynchronous and may take several seconds to
 * complete. Poll this operation periodically to check the status and retrieve results when
 * the report is ready.
 *
 * Each report contains up to 1,000 quota records per page. Use the `NextToken`
 * parameter to retrieve additional pages of results. Reports are automatically deleted after
 * 15 minutes.
 */
export const getQuotaUtilizationReport: API.OperationMethod<
  GetQuotaUtilizationReportRequest,
  GetQuotaUtilizationReportResponse,
  GetQuotaUtilizationReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQuotaUtilizationReportRequest,
  output: GetQuotaUtilizationReportResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuotaUtilizationReport",
}));

export type GetRequestedServiceQuotaChangeError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the specified quota increase request.
 */
export const getRequestedServiceQuotaChange: API.OperationMethod<
  GetRequestedServiceQuotaChangeRequest,
  GetRequestedServiceQuotaChangeResponse,
  GetRequestedServiceQuotaChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRequestedServiceQuotaChangeRequest,
  output: GetRequestedServiceQuotaChangeResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestedServiceQuotaChange",
}));

export type GetServiceQuotaError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the applied quota value for the specified account-level or resource-level
 * quota. For some quotas, only the default values are available. If the applied quota
 * value is not available for a quota, the quota is not retrieved.
 */
export const getServiceQuota: API.OperationMethod<
  GetServiceQuotaRequest,
  GetServiceQuotaResponse,
  GetServiceQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceQuotaRequest,
  output: GetServiceQuotaResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceQuota",
}));

export type GetServiceQuotaIncreaseRequestFromTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | NoSuchResourceException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the specified quota increase request in your quota request
 * template.
 */
export const getServiceQuotaIncreaseRequestFromTemplate: API.OperationMethod<
  GetServiceQuotaIncreaseRequestFromTemplateRequest,
  GetServiceQuotaIncreaseRequestFromTemplateResponse,
  GetServiceQuotaIncreaseRequestFromTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceQuotaIncreaseRequestFromTemplateRequest,
  output: GetServiceQuotaIncreaseRequestFromTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    NoSuchResourceException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceQuotaIncreaseRequestFromTemplate",
}));

export type ListAWSDefaultServiceQuotasError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the default values for the quotas for the specified Amazon Web Services service. A default
 * value does not reflect any quota increases.
 */
export const listAWSDefaultServiceQuotas: API.PaginatedOperationMethod<
  ListAWSDefaultServiceQuotasRequest,
  ListAWSDefaultServiceQuotasResponse,
  ListAWSDefaultServiceQuotasError,
  Credentials | HttpClient.HttpClient,
  ServiceQuota
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAWSDefaultServiceQuotasRequest,
  output: ListAWSDefaultServiceQuotasResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAWSDefaultServiceQuotas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Quotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRequestedServiceQuotaChangeHistoryError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the quota increase requests for the specified Amazon Web Services service. Filter
 * responses to return quota requests at either the account level, resource level, or all
 * levels. Responses include any open or closed requests within 90 days.
 */
export const listRequestedServiceQuotaChangeHistory: API.PaginatedOperationMethod<
  ListRequestedServiceQuotaChangeHistoryRequest,
  ListRequestedServiceQuotaChangeHistoryResponse,
  ListRequestedServiceQuotaChangeHistoryError,
  Credentials | HttpClient.HttpClient,
  RequestedServiceQuotaChange
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRequestedServiceQuotaChangeHistoryRequest,
  output: ListRequestedServiceQuotaChangeHistoryResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequestedServiceQuotaChangeHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RequestedQuotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRequestedServiceQuotaChangeHistoryByQuotaError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the quota increase requests for the specified quota. Filter responses to
 * return quota requests at either the account level, resource level, or all levels.
 */
export const listRequestedServiceQuotaChangeHistoryByQuota: API.PaginatedOperationMethod<
  ListRequestedServiceQuotaChangeHistoryByQuotaRequest,
  ListRequestedServiceQuotaChangeHistoryByQuotaResponse,
  ListRequestedServiceQuotaChangeHistoryByQuotaError,
  Credentials | HttpClient.HttpClient,
  RequestedServiceQuotaChange
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRequestedServiceQuotaChangeHistoryByQuotaRequest,
  output: ListRequestedServiceQuotaChangeHistoryByQuotaResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequestedServiceQuotaChangeHistoryByQuota",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RequestedQuotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceQuotaIncreaseRequestsInTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the quota increase requests in the specified quota request template.
 */
export const listServiceQuotaIncreaseRequestsInTemplate: API.PaginatedOperationMethod<
  ListServiceQuotaIncreaseRequestsInTemplateRequest,
  ListServiceQuotaIncreaseRequestsInTemplateResponse,
  ListServiceQuotaIncreaseRequestsInTemplateError,
  Credentials | HttpClient.HttpClient,
  ServiceQuotaIncreaseRequestInTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceQuotaIncreaseRequestsInTemplateRequest,
  output: ListServiceQuotaIncreaseRequestsInTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceQuotaIncreaseRequestsInTemplate",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceQuotaIncreaseRequestInTemplateList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceQuotasError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the applied quota values for the specified Amazon Web Services service. For some quotas, only
 * the default values are available. If the applied quota value is not available for a
 * quota, the quota is not retrieved. Filter responses to return applied quota values at
 * either the account level, resource level, or all levels.
 */
export const listServiceQuotas: API.PaginatedOperationMethod<
  ListServiceQuotasRequest,
  ListServiceQuotasResponse,
  ListServiceQuotasError,
  Credentials | HttpClient.HttpClient,
  ServiceQuota
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceQuotasRequest,
  output: ListServiceQuotasResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceQuotas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Quotas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the names and codes for the Amazon Web Services services integrated with Service Quotas.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesRequest,
  output: ListServicesResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of the tags assigned to the specified applied quota.
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
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutServiceQuotaIncreaseRequestIntoTemplateError =
  | AccessDeniedException
  | AWSServiceAccessNotEnabledException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | NoAvailableOrganizationException
  | NoSuchResourceException
  | QuotaExceededException
  | ServiceException
  | TemplatesNotAvailableInRegionException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds a quota increase request to your quota request template.
 */
export const putServiceQuotaIncreaseRequestIntoTemplate: API.OperationMethod<
  PutServiceQuotaIncreaseRequestIntoTemplateRequest,
  PutServiceQuotaIncreaseRequestIntoTemplateResponse,
  PutServiceQuotaIncreaseRequestIntoTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutServiceQuotaIncreaseRequestIntoTemplateRequest,
  output: PutServiceQuotaIncreaseRequestIntoTemplateResponse,
  errors: [
    AccessDeniedException,
    AWSServiceAccessNotEnabledException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    NoAvailableOrganizationException,
    NoSuchResourceException,
    QuotaExceededException,
    ServiceException,
    TemplatesNotAvailableInRegionException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutServiceQuotaIncreaseRequestIntoTemplate",
}));

export type RequestServiceQuotaIncreaseError =
  | AccessDeniedException
  | DependencyAccessDeniedException
  | IllegalArgumentException
  | InvalidResourceStateException
  | NoSuchResourceException
  | QuotaExceededException
  | ResourceAlreadyExistsException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Submits a quota increase request for the specified quota at the account or resource
 * level.
 */
export const requestServiceQuotaIncrease: API.OperationMethod<
  RequestServiceQuotaIncreaseRequest,
  RequestServiceQuotaIncreaseResponse,
  RequestServiceQuotaIncreaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestServiceQuotaIncreaseRequest,
  output: RequestServiceQuotaIncreaseResponse,
  errors: [
    AccessDeniedException,
    DependencyAccessDeniedException,
    IllegalArgumentException,
    InvalidResourceStateException,
    NoSuchResourceException,
    QuotaExceededException,
    ResourceAlreadyExistsException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestServiceQuotaIncrease",
}));

export type StartAutoManagementError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts Service Quotas Automatic Management for an Amazon Web Services account, including notification preferences
 * and excluded quotas configurations. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const startAutoManagement: API.OperationMethod<
  StartAutoManagementRequest,
  StartAutoManagementResponse,
  StartAutoManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAutoManagementRequest,
  output: StartAutoManagementResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutoManagement",
}));

export type StartQuotaUtilizationReportError =
  | AccessDeniedException
  | IllegalArgumentException
  | InvalidPaginationTokenException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates the generation of a quota utilization report for your Amazon Web Services account. This
 * asynchronous operation analyzes your quota usage across all Amazon Web Services services and returns
 * a unique report identifier that you can use to retrieve the results.
 *
 * The report generation process may take several seconds to complete, depending on the
 * number of quotas in your account. Use the `GetQuotaUtilizationReport` operation
 * to check the status and retrieve the results when the report is ready.
 */
export const startQuotaUtilizationReport: API.OperationMethod<
  StartQuotaUtilizationReportRequest,
  StartQuotaUtilizationReportResponse,
  StartQuotaUtilizationReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQuotaUtilizationReportRequest,
  output: StartQuotaUtilizationReportResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    InvalidPaginationTokenException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQuotaUtilizationReport",
}));

export type StopAutoManagementError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops Service Quotas Automatic Management for an Amazon Web Services account and removes all associated
 * configurations. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const stopAutoManagement: API.OperationMethod<
  StopAutoManagementRequest,
  StopAutoManagementResponse,
  StopAutoManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAutoManagementRequest,
  output: StopAutoManagementResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAutoManagement",
}));

export type TagResourceError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TagPolicyViolationException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds tags to the specified applied quota. You can include one or more tags to add to
 * the quota.
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
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TagPolicyViolationException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes tags from the specified applied quota. You can specify one or more tags to
 * remove.
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
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAutoManagementError =
  | AccessDeniedException
  | IllegalArgumentException
  | NoSuchResourceException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates your Service Quotas Automatic Management configuration, including notification preferences and
 * excluded quotas. Automatic Management monitors your Service Quotas utilization and notifies you before you
 * run out of your allocated quotas.
 */
export const updateAutoManagement: API.OperationMethod<
  UpdateAutoManagementRequest,
  UpdateAutoManagementResponse,
  UpdateAutoManagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutoManagementRequest,
  output: UpdateAutoManagementResponse,
  errors: [
    AccessDeniedException,
    IllegalArgumentException,
    NoSuchResourceException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutoManagement",
}));
