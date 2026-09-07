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
  sdkId: "RTBFabric",
  serviceShapeName: "RTBFabric",
});
const auth = T.AwsAuthSigv4({ name: "rtbfabric" });
const ver = T.ServiceVersion("2023-05-15");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
              `https://rtbfabric-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://rtbfabric-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rtbfabric.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://rtbfabric.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GatewayId = string;
export type LinkId = string;
export type ResponderErrorMaskingAction =
  | "NO_BID"
  | "PASSTHROUGH"
  | (string & {});
export const ResponderErrorMaskingAction = S.String;

export type ResponderErrorMaskingLoggingType =
  | "NONE"
  | "METRIC"
  | "RESPONSE"
  | (string & {});
export const ResponderErrorMaskingLoggingType = S.String;

export type ResponderErrorMaskingLoggingTypes =
  ResponderErrorMaskingLoggingType[];
export const ResponderErrorMaskingLoggingTypes = /*@__PURE__*/ S.Array(
  ResponderErrorMaskingLoggingType,
);
export interface ResponderErrorMaskingForHttpCode {
  httpCode: string;
  action: ResponderErrorMaskingAction;
  loggingTypes: ResponderErrorMaskingLoggingType[];
  responseLoggingPercentage?: number;
}
export const ResponderErrorMaskingForHttpCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    httpCode: S.String,
    action: ResponderErrorMaskingAction,
    loggingTypes: ResponderErrorMaskingLoggingTypes,
    responseLoggingPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResponderErrorMaskingForHttpCode",
}) as any as S.Schema<ResponderErrorMaskingForHttpCode>;
export type ResponderErrorMasking = ResponderErrorMaskingForHttpCode[];
export const ResponderErrorMasking = /*@__PURE__*/ S.Array(
  ResponderErrorMaskingForHttpCode,
);
export type CustomerProvidedId = string;
export interface LinkAttributes {
  responderErrorMasking?: ResponderErrorMaskingForHttpCode[];
  customerProvidedId?: string;
}
export const LinkAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    responderErrorMasking: S.optional(ResponderErrorMasking),
    customerProvidedId: S.optional(S.String),
  }),
).annotate({ identifier: "LinkAttributes" }) as any as S.Schema<LinkAttributes>;
export interface LinkApplicationLogSampling {
  errorLog: number;
  filterLog: number;
}
export const LinkApplicationLogSampling = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorLog: S.Number, filterLog: S.Number }),
).annotate({
  identifier: "LinkApplicationLogSampling",
}) as any as S.Schema<LinkApplicationLogSampling>;
export interface LinkApplicationLogConfiguration {
  sampling: LinkApplicationLogSampling;
}
export const LinkApplicationLogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sampling: LinkApplicationLogSampling }),
).annotate({
  identifier: "LinkApplicationLogConfiguration",
}) as any as S.Schema<LinkApplicationLogConfiguration>;
export interface LinkLogSettings {
  applicationLogs: LinkApplicationLogConfiguration;
}
export const LinkLogSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationLogs: LinkApplicationLogConfiguration }),
).annotate({
  identifier: "LinkLogSettings",
}) as any as S.Schema<LinkLogSettings>;
export type LinkTimeoutInMillis = number;
export interface AcceptLinkRequest {
  gatewayId: string;
  linkId: string;
  attributes?: LinkAttributes;
  logSettings: LinkLogSettings;
  timeoutInMillis?: number;
}
export const AcceptLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    attributes: S.optional(LinkAttributes),
    logSettings: LinkLogSettings,
    timeoutInMillis: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/gateway/{gatewayId}/link/{linkId}/accept",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptLinkRequest",
}) as any as S.Schema<AcceptLinkRequest>;
export type LinkStatus =
  | "PENDING_CREATION"
  | "PENDING_REQUEST"
  | "REQUESTED"
  | "ACCEPTED"
  | "ACTIVE"
  | "REJECTED"
  | "FAILED"
  | "PENDING_DELETION"
  | "DELETED"
  | "PENDING_UPDATE"
  | "PENDING_ISOLATION"
  | "ISOLATED"
  | "PENDING_RESTORATION"
  | (string & {});
export const LinkStatus = S.String;

export type LinkDirection = "RESPONSE" | "REQUEST" | (string & {});
export const LinkDirection = S.String;

export type Version = string;
export type FlowModuleName = string;
export type FlowModuleNameList = string[];
export const FlowModuleNameList = /*@__PURE__*/ S.Array(S.String);
export interface NoBidModuleParameters {
  reason?: string;
  reasonCode?: number;
  passThroughPercentage?: number;
}
export const NoBidModuleParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(S.String),
    reasonCode: S.optional(S.Number),
    passThroughPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "NoBidModuleParameters",
}) as any as S.Schema<NoBidModuleParameters>;
export type FilterType = "INCLUDE" | "EXCLUDE" | (string & {});
export const FilterType = S.String;

export type ValueList = string[];
export const ValueList = /*@__PURE__*/ S.Array(S.String);
export interface FilterCriterion {
  path: string;
  values: string[];
}
export const FilterCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, values: ValueList }),
).annotate({
  identifier: "FilterCriterion",
}) as any as S.Schema<FilterCriterion>;
export type FilterCriteria = FilterCriterion[];
export const FilterCriteria = /*@__PURE__*/ S.Array(FilterCriterion);
export interface Filter {
  criteria: FilterCriterion[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ criteria: FilterCriteria }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterConfiguration = Filter[];
export const FilterConfiguration = /*@__PURE__*/ S.Array(Filter);
export interface NoBidAction {
  noBidReasonCode?: number;
}
export const NoBidAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ noBidReasonCode: S.optional(S.Number) }),
).annotate({ identifier: "NoBidAction" }) as any as S.Schema<NoBidAction>;
export interface HeaderTagAction {
  name: string;
  value: string;
}
export const HeaderTagAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({
  identifier: "HeaderTagAction",
}) as any as S.Schema<HeaderTagAction>;
export type Action =
  | { noBid: NoBidAction; headerTag?: never }
  | { noBid?: never; headerTag: HeaderTagAction };
export const Action = /*@__PURE__*/ S.Union([
  S.Struct({ noBid: NoBidAction }),
  S.Struct({ headerTag: HeaderTagAction }),
]);
export interface OpenRtbAttributeModuleParameters {
  filterType: FilterType;
  filterConfiguration: Filter[];
  action: Action;
  holdbackPercentage: number;
}
export const OpenRtbAttributeModuleParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterType: FilterType,
    filterConfiguration: FilterConfiguration,
    action: Action,
    holdbackPercentage: S.Number,
  }),
).annotate({
  identifier: "OpenRtbAttributeModuleParameters",
}) as any as S.Schema<OpenRtbAttributeModuleParameters>;
export interface RateLimiterModuleParameters {
  tps?: number;
}
export const RateLimiterModuleParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tps: S.optional(S.Number) }),
).annotate({
  identifier: "RateLimiterModuleParameters",
}) as any as S.Schema<RateLimiterModuleParameters>;
export type ModuleParameters =
  | {
      noBid: NoBidModuleParameters;
      openRtbAttribute?: never;
      rateLimiter?: never;
    }
  | {
      noBid?: never;
      openRtbAttribute: OpenRtbAttributeModuleParameters;
      rateLimiter?: never;
    }
  | {
      noBid?: never;
      openRtbAttribute?: never;
      rateLimiter: RateLimiterModuleParameters;
    };
export const ModuleParameters = /*@__PURE__*/ S.Union([
  S.Struct({ noBid: NoBidModuleParameters }),
  S.Struct({ openRtbAttribute: OpenRtbAttributeModuleParameters }),
  S.Struct({ rateLimiter: RateLimiterModuleParameters }),
]);
export interface ModuleConfiguration {
  version?: string;
  name: string;
  dependsOn?: string[];
  moduleParameters?: ModuleParameters;
}
export const ModuleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.optional(S.String),
    name: S.String,
    dependsOn: S.optional(FlowModuleNameList),
    moduleParameters: S.optional(ModuleParameters),
  }),
).annotate({
  identifier: "ModuleConfiguration",
}) as any as S.Schema<ModuleConfiguration>;
export type ModuleConfigurationList = ModuleConfiguration[];
export const ModuleConfigurationList =
  /*@__PURE__*/ S.Array(ModuleConfiguration);
export type ConnectivityType =
  | "DEFAULT"
  | "PUBLIC_INGRESS"
  | "PUBLIC_EGRESS"
  | "EXTERNAL_INBOUND"
  | (string & {});
export const ConnectivityType = S.String;

export interface AcceptLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
}
export const AcceptLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    peerGatewayId: S.String,
    status: LinkStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    direction: S.optional(LinkDirection),
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
    linkId: S.String,
  }),
).annotate({
  identifier: "AcceptLinkResponse",
}) as any as S.Schema<AcceptLinkResponse>;
export type AcmCertificateArn = string;
export interface AssociateCertificateRequest {
  gatewayId: string;
  acmCertificateArn: string;
  clientToken: string;
}
export const AssociateCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    acmCertificateArn: S.String,
    clientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/responder-gateway/{gatewayId}/certificate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateCertificateRequest",
}) as any as S.Schema<AssociateCertificateRequest>;
export type CertificateAssociationStatus =
  | "PENDING_ASSOCIATION"
  | "ASSOCIATED"
  | "PENDING_DISASSOCIATION"
  | "DISASSOCIATED"
  | "FAILED"
  | (string & {});
export const CertificateAssociationStatus = S.String;

export interface AssociateCertificateResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
}
export const AssociateCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    acmCertificateArn: S.String,
    status: CertificateAssociationStatus,
  }),
).annotate({
  identifier: "AssociateCertificateResponse",
}) as any as S.Schema<AssociateCertificateResponse>;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateInboundExternalLinkRequest {
  clientToken: string;
  gatewayId: string;
  attributes?: LinkAttributes;
  logSettings: LinkLogSettings;
  tags?: { [key: string]: string | undefined };
}
export const CreateInboundExternalLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    attributes: S.optional(LinkAttributes),
    logSettings: LinkLogSettings,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/responder-gateway/{gatewayId}/inbound-external-link",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInboundExternalLinkRequest",
}) as any as S.Schema<CreateInboundExternalLinkRequest>;
export type DomainName = string;
export interface CreateInboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  domainName: string;
}
export const CreateInboundExternalLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    linkId: S.String,
    status: LinkStatus,
    domainName: S.String,
  }),
).annotate({
  identifier: "CreateInboundExternalLinkResponse",
}) as any as S.Schema<CreateInboundExternalLinkResponse>;
export interface CreateLinkRequest {
  gatewayId: string;
  peerGatewayId: string;
  attributes?: LinkAttributes;
  httpResponderAllowed?: boolean;
  tags?: { [key: string]: string | undefined };
  logSettings: LinkLogSettings;
  timeoutInMillis?: number;
}
export const CreateLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    peerGatewayId: S.String,
    attributes: S.optional(LinkAttributes),
    httpResponderAllowed: S.optional(S.Boolean),
    tags: S.optional(TagsMap),
    logSettings: LinkLogSettings,
    timeoutInMillis: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/gateway/{gatewayId}/create-link" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLinkRequest",
}) as any as S.Schema<CreateLinkRequest>;
export interface CreateLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
  customerProvidedId?: string;
}
export const CreateLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    peerGatewayId: S.String,
    status: LinkStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    direction: S.optional(LinkDirection),
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
    linkId: S.String,
    customerProvidedId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateLinkResponse",
}) as any as S.Schema<CreateLinkResponse>;
export type RulePriority = number;
export interface QueryStringKeyValuePair {
  key: string;
  value: string;
}
export const QueryStringKeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "QueryStringKeyValuePair",
}) as any as S.Schema<QueryStringKeyValuePair>;
export interface RuleCondition {
  hostHeader?: string;
  hostHeaderWildcard?: string;
  pathPrefix?: string;
  pathExact?: string;
  queryStringEquals?: QueryStringKeyValuePair;
  queryStringExists?: string;
}
export const RuleCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostHeader: S.optional(S.String),
    hostHeaderWildcard: S.optional(S.String),
    pathPrefix: S.optional(S.String),
    pathExact: S.optional(S.String),
    queryStringEquals: S.optional(QueryStringKeyValuePair),
    queryStringExists: S.optional(S.String),
  }),
).annotate({ identifier: "RuleCondition" }) as any as S.Schema<RuleCondition>;
export interface CreateLinkRoutingRuleRequest {
  clientToken: string;
  gatewayId: string;
  linkId: string;
  priority: number;
  conditions: RuleCondition;
  tags?: { [key: string]: string | undefined };
}
export const CreateLinkRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    priority: S.Number,
    conditions: RuleCondition,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLinkRoutingRuleRequest",
}) as any as S.Schema<CreateLinkRoutingRuleRequest>;
export type RuleId = string;
export type RuleStatus =
  | "CREATION_IN_PROGRESS"
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "DELETION_IN_PROGRESS"
  | "DELETED"
  | "FAILED"
  | (string & {});
export const RuleStatus = S.String;

export interface CreateLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
  createdAt: Date;
}
export const CreateLinkRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    status: RuleStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateLinkRoutingRuleResponse",
}) as any as S.Schema<CreateLinkRoutingRuleResponse>;
export type URL = string;
export interface CreateOutboundExternalLinkRequest {
  clientToken: string;
  gatewayId: string;
  attributes?: LinkAttributes;
  publicEndpoint: string;
  logSettings: LinkLogSettings;
  tags?: { [key: string]: string | undefined };
}
export const CreateOutboundExternalLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    attributes: S.optional(LinkAttributes),
    publicEndpoint: S.String,
    logSettings: LinkLogSettings,
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/requester-gateway/{gatewayId}/outbound-external-link",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOutboundExternalLinkRequest",
}) as any as S.Schema<CreateOutboundExternalLinkRequest>;
export interface CreateOutboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
}
export const CreateOutboundExternalLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, linkId: S.String, status: LinkStatus }),
).annotate({
  identifier: "CreateOutboundExternalLinkResponse",
}) as any as S.Schema<CreateOutboundExternalLinkResponse>;
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface CreateRequesterGatewayRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  clientToken: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRequesterGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIdList,
    securityGroupIds: SecurityGroupIdList,
    clientToken: S.String.pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/requester-gateway" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRequesterGatewayRequest",
}) as any as S.Schema<CreateRequesterGatewayRequest>;
export type RequesterGatewayStatus =
  | "PENDING_CREATION"
  | "ACTIVE"
  | "PENDING_DELETION"
  | "DELETED"
  | "ERROR"
  | "PENDING_UPDATE"
  | "ISOLATED"
  | "PENDING_ISOLATION"
  | "PENDING_RESTORATION"
  | (string & {});
export const RequesterGatewayStatus = S.String;

export interface CreateRequesterGatewayResponse {
  gatewayId: string;
  domainName: string;
  status: RequesterGatewayStatus;
}
export const CreateRequesterGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    domainName: S.String,
    status: RequesterGatewayStatus,
  }),
).annotate({
  identifier: "CreateRequesterGatewayResponse",
}) as any as S.Schema<CreateRequesterGatewayResponse>;
export type Protocol = "HTTP" | "HTTPS" | (string & {});
export const Protocol = S.String;

export type ProtocolList = Protocol[];
export const ProtocolList = /*@__PURE__*/ S.Array(Protocol);
export interface ListenerConfig {
  protocols: Protocol[];
}
export const ListenerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ protocols: ProtocolList }),
).annotate({ identifier: "ListenerConfig" }) as any as S.Schema<ListenerConfig>;
export type Base64EncodedCertificateChain = string | redacted.Redacted<string>;
export type CertificateAuthorityCertificates = (
  | string
  | redacted.Redacted<string>
)[];
export const CertificateAuthorityCertificates =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface TrustStoreConfiguration {
  certificateAuthorityCertificates: (string | redacted.Redacted<string>)[];
}
export const TrustStoreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateAuthorityCertificates: CertificateAuthorityCertificates,
  }),
).annotate({
  identifier: "TrustStoreConfiguration",
}) as any as S.Schema<TrustStoreConfiguration>;
export type AutoScalingGroupName = string;
export type AutoScalingGroupNameList = string[];
export const AutoScalingGroupNameList = /*@__PURE__*/ S.Array(S.String);
export type StatusCodeMatcher = string;
export interface HealthCheckConfig {
  port: number;
  path: string;
  protocol?: Protocol;
  timeoutMs?: number;
  intervalSeconds?: number;
  statusCodeMatcher?: string;
  healthyThresholdCount?: number;
  unhealthyThresholdCount?: number;
}
export const HealthCheckConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    port: S.Number,
    path: S.String,
    protocol: S.optional(Protocol),
    timeoutMs: S.optional(S.Number),
    intervalSeconds: S.optional(S.Number),
    statusCodeMatcher: S.optional(S.String),
    healthyThresholdCount: S.optional(S.Number),
    unhealthyThresholdCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "HealthCheckConfig",
}) as any as S.Schema<HealthCheckConfig>;
export interface AutoScalingGroupsConfiguration {
  autoScalingGroupNames: string[];
  roleArn: string;
  healthCheckConfig?: HealthCheckConfig;
}
export const AutoScalingGroupsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScalingGroupNames: AutoScalingGroupNameList,
    roleArn: S.String,
    healthCheckConfig: S.optional(HealthCheckConfig),
  }),
).annotate({
  identifier: "AutoScalingGroupsConfiguration",
}) as any as S.Schema<AutoScalingGroupsConfiguration>;
export type KubernetesEndpointsResourceName = string;
export type KubernetesNamespace = string;
export type URI = string;
export type KubernetesClusterName = string;
export interface EksEndpointsConfiguration {
  endpointsResourceName: string;
  endpointsResourceNamespace: string;
  clusterApiServerEndpointUri: string;
  clusterApiServerCaCertificateChain: string | redacted.Redacted<string>;
  clusterName: string;
  roleArn: string;
}
export const EksEndpointsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endpointsResourceName: S.String,
    endpointsResourceNamespace: S.String,
    clusterApiServerEndpointUri: S.String,
    clusterApiServerCaCertificateChain: SensitiveString,
    clusterName: S.String,
    roleArn: S.String,
  }),
).annotate({
  identifier: "EksEndpointsConfiguration",
}) as any as S.Schema<EksEndpointsConfiguration>;
export type ManagedEndpointConfiguration =
  | { autoScalingGroups: AutoScalingGroupsConfiguration; eksEndpoints?: never }
  | { autoScalingGroups?: never; eksEndpoints: EksEndpointsConfiguration };
export const ManagedEndpointConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ autoScalingGroups: AutoScalingGroupsConfiguration }),
  S.Struct({ eksEndpoints: EksEndpointsConfiguration }),
]);
export type GatewayType = "EXTERNAL" | "INTERNAL" | (string & {});
export const GatewayType = S.String;

export interface CreateResponderGatewayRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  domainName?: string;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig;
  trustStoreConfiguration?: TrustStoreConfiguration;
  managedEndpointConfiguration?: ManagedEndpointConfiguration;
  clientToken: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  gatewayType?: GatewayType;
}
export const CreateResponderGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIdList,
    securityGroupIds: SecurityGroupIdList,
    domainName: S.optional(S.String),
    port: S.Number,
    protocol: Protocol,
    listenerConfig: S.optional(ListenerConfig),
    trustStoreConfiguration: S.optional(TrustStoreConfiguration),
    managedEndpointConfiguration: S.optional(ManagedEndpointConfiguration),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    tags: S.optional(TagsMap),
    gatewayType: S.optional(GatewayType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/responder-gateway" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResponderGatewayRequest",
}) as any as S.Schema<CreateResponderGatewayRequest>;
export type ResponderGatewayStatus =
  | "PENDING_CREATION"
  | "ACTIVE"
  | "PENDING_DELETION"
  | "DELETED"
  | "ERROR"
  | "PENDING_UPDATE"
  | "ISOLATED"
  | "PENDING_ISOLATION"
  | "PENDING_RESTORATION"
  | (string & {});
export const ResponderGatewayStatus = S.String;

export interface CreateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
  listenerConfig?: ListenerConfig;
  externalInboundEndpoint?: string;
}
export const CreateResponderGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    status: ResponderGatewayStatus,
    listenerConfig: S.optional(ListenerConfig),
    externalInboundEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateResponderGatewayResponse",
}) as any as S.Schema<CreateResponderGatewayResponse>;
export interface DeleteInboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const DeleteInboundExternalLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/responder-gateway/{gatewayId}/inbound-external-link/{linkId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInboundExternalLinkRequest",
}) as any as S.Schema<DeleteInboundExternalLinkRequest>;
export interface DeleteInboundExternalLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export const DeleteInboundExternalLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ linkId: S.String, status: LinkStatus }),
).annotate({
  identifier: "DeleteInboundExternalLinkResponse",
}) as any as S.Schema<DeleteInboundExternalLinkResponse>;
export interface DeleteLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const DeleteLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/gateway/{gatewayId}/link/{linkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLinkRequest",
}) as any as S.Schema<DeleteLinkRequest>;
export interface DeleteLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export const DeleteLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ linkId: S.String, status: LinkStatus }),
).annotate({
  identifier: "DeleteLinkResponse",
}) as any as S.Schema<DeleteLinkResponse>;
export interface DeleteLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
}
export const DeleteLinkRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    ruleId: S.String.pipe(T.HttpLabel("ruleId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLinkRoutingRuleRequest",
}) as any as S.Schema<DeleteLinkRoutingRuleRequest>;
export interface DeleteLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
}
export const DeleteLinkRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleId: S.String, status: RuleStatus }),
).annotate({
  identifier: "DeleteLinkRoutingRuleResponse",
}) as any as S.Schema<DeleteLinkRoutingRuleResponse>;
export interface DeleteOutboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const DeleteOutboundExternalLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/requester-gateway/{gatewayId}/outbound-external-link/{linkId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOutboundExternalLinkRequest",
}) as any as S.Schema<DeleteOutboundExternalLinkRequest>;
export interface DeleteOutboundExternalLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export const DeleteOutboundExternalLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ linkId: S.String, status: LinkStatus }),
).annotate({
  identifier: "DeleteOutboundExternalLinkResponse",
}) as any as S.Schema<DeleteOutboundExternalLinkResponse>;
export interface DeleteRequesterGatewayRequest {
  gatewayId: string;
}
export const DeleteRequesterGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/requester-gateway/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRequesterGatewayRequest",
}) as any as S.Schema<DeleteRequesterGatewayRequest>;
export interface DeleteRequesterGatewayResponse {
  gatewayId: string;
  status: RequesterGatewayStatus;
}
export const DeleteRequesterGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, status: RequesterGatewayStatus }),
).annotate({
  identifier: "DeleteRequesterGatewayResponse",
}) as any as S.Schema<DeleteRequesterGatewayResponse>;
export interface DeleteResponderGatewayRequest {
  gatewayId: string;
}
export const DeleteResponderGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/responder-gateway/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResponderGatewayRequest",
}) as any as S.Schema<DeleteResponderGatewayRequest>;
export interface DeleteResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
}
export const DeleteResponderGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, status: ResponderGatewayStatus }),
).annotate({
  identifier: "DeleteResponderGatewayResponse",
}) as any as S.Schema<DeleteResponderGatewayResponse>;
export interface DisassociateCertificateRequest {
  gatewayId: string;
  acmCertificateArn: string;
}
export const DisassociateCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    acmCertificateArn: S.String.pipe(T.HttpQuery("acmCertificateArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/responder-gateway/{gatewayId}/certificate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateCertificateRequest",
}) as any as S.Schema<DisassociateCertificateRequest>;
export interface DisassociateCertificateResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
}
export const DisassociateCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    acmCertificateArn: S.String,
    status: CertificateAssociationStatus,
  }),
).annotate({
  identifier: "DisassociateCertificateResponse",
}) as any as S.Schema<DisassociateCertificateResponse>;
export interface GetCertificateAssociationRequest {
  gatewayId: string;
  acmCertificateArn: string;
}
export const GetCertificateAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    acmCertificateArn: S.String.pipe(T.HttpQuery("acmCertificateArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/responder-gateway/{gatewayId}/certificate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCertificateAssociationRequest",
}) as any as S.Schema<GetCertificateAssociationRequest>;
export interface GetCertificateAssociationResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
  associatedAt?: Date;
  updatedAt?: Date;
}
export const GetCertificateAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    acmCertificateArn: S.String,
    status: CertificateAssociationStatus,
    associatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetCertificateAssociationResponse",
}) as any as S.Schema<GetCertificateAssociationResponse>;
export interface GetInboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const GetInboundExternalLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/responder-gateway/{gatewayId}/inbound-external-link/{linkId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInboundExternalLinkRequest",
}) as any as S.Schema<GetInboundExternalLinkRequest>;
export interface GetInboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  domainName: string;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
}
export const GetInboundExternalLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    linkId: S.String,
    status: LinkStatus,
    domainName: S.String,
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagsMap),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
  }),
).annotate({
  identifier: "GetInboundExternalLinkResponse",
}) as any as S.Schema<GetInboundExternalLinkResponse>;
export interface GetLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const GetLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gateway/{gatewayId}/link/{linkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetLinkRequest" }) as any as S.Schema<GetLinkRequest>;
export interface GetLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
  tags?: { [key: string]: string | undefined };
  httpResponderAllowed?: boolean;
  timeoutInMillis?: number;
}
export const GetLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    peerGatewayId: S.String,
    status: LinkStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    direction: S.optional(LinkDirection),
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
    linkId: S.String,
    tags: S.optional(TagsMap),
    httpResponderAllowed: S.optional(S.Boolean),
    timeoutInMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetLinkResponse",
}) as any as S.Schema<GetLinkResponse>;
export interface GetLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
}
export const GetLinkRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    ruleId: S.String.pipe(T.HttpLabel("ruleId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLinkRoutingRuleRequest",
}) as any as S.Schema<GetLinkRoutingRuleRequest>;
export interface GetLinkRoutingRuleResponse {
  gatewayId: string;
  linkId: string;
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
  status: RuleStatus;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export const GetLinkRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    linkId: S.String,
    ruleId: S.String,
    priority: S.Number,
    conditions: RuleCondition,
    status: RuleStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "GetLinkRoutingRuleResponse",
}) as any as S.Schema<GetLinkRoutingRuleResponse>;
export interface GetOutboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const GetOutboundExternalLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/requester-gateway/{gatewayId}/outbound-external-link/{linkId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutboundExternalLinkRequest",
}) as any as S.Schema<GetOutboundExternalLinkRequest>;
export interface GetOutboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  publicEndpoint: string;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
}
export const GetOutboundExternalLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    linkId: S.String,
    status: LinkStatus,
    publicEndpoint: S.String,
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagsMap),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
  }),
).annotate({
  identifier: "GetOutboundExternalLinkResponse",
}) as any as S.Schema<GetOutboundExternalLinkResponse>;
export interface GetRequesterGatewayRequest {
  gatewayId: string;
}
export const GetRequesterGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/requester-gateway/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRequesterGatewayRequest",
}) as any as S.Schema<GetRequesterGatewayRequest>;
export interface GetRequesterGatewayResponse {
  status: RequesterGatewayStatus;
  domainName: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  gatewayId: string;
  tags?: { [key: string]: string | undefined };
  activeLinksCount?: number;
  totalLinksCount?: number;
}
export const GetRequesterGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: RequesterGatewayStatus,
    domainName: S.String,
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    vpcId: S.String,
    subnetIds: SubnetIdList,
    securityGroupIds: SecurityGroupIdList,
    gatewayId: S.String,
    tags: S.optional(TagsMap),
    activeLinksCount: S.optional(S.Number),
    totalLinksCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetRequesterGatewayResponse",
}) as any as S.Schema<GetRequesterGatewayResponse>;
export interface GetResponderGatewayRequest {
  gatewayId: string;
}
export const GetResponderGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/responder-gateway/{gatewayId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResponderGatewayRequest",
}) as any as S.Schema<GetResponderGatewayRequest>;
export interface GetResponderGatewayResponse {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  status: ResponderGatewayStatus;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  domainName?: string;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig;
  trustStoreConfiguration?: TrustStoreConfiguration;
  managedEndpointConfiguration?: ManagedEndpointConfiguration;
  gatewayId: string;
  tags?: { [key: string]: string | undefined };
  activeLinksCount?: number;
  totalLinksCount?: number;
  linksRequestedCount?: number;
  gatewayType?: GatewayType;
  externalInboundEndpoint?: string;
}
export const GetResponderGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vpcId: S.String,
    subnetIds: SubnetIdList,
    securityGroupIds: SecurityGroupIdList,
    status: ResponderGatewayStatus,
    description: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    domainName: S.optional(S.String),
    port: S.Number,
    protocol: Protocol,
    listenerConfig: S.optional(ListenerConfig),
    trustStoreConfiguration: S.optional(TrustStoreConfiguration),
    managedEndpointConfiguration: S.optional(ManagedEndpointConfiguration),
    gatewayId: S.String,
    tags: S.optional(TagsMap),
    activeLinksCount: S.optional(S.Number),
    totalLinksCount: S.optional(S.Number),
    linksRequestedCount: S.optional(S.Number),
    gatewayType: S.optional(GatewayType),
    externalInboundEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResponderGatewayResponse",
}) as any as S.Schema<GetResponderGatewayResponse>;
export interface ListCertificateAssociationsRequest {
  gatewayId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCertificateAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/responder-gateway/{gatewayId}/certificates",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCertificateAssociationsRequest",
}) as any as S.Schema<ListCertificateAssociationsRequest>;
export interface CertificateAssociationSummary {
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
  associatedAt?: Date;
  updatedAt?: Date;
}
export const CertificateAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    acmCertificateArn: S.String,
    status: CertificateAssociationStatus,
    associatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CertificateAssociationSummary",
}) as any as S.Schema<CertificateAssociationSummary>;
export type CertificateAssociationSummaryList = CertificateAssociationSummary[];
export const CertificateAssociationSummaryList = /*@__PURE__*/ S.Array(
  CertificateAssociationSummary,
);
export interface ListCertificateAssociationsResponse {
  certificateAssociations: CertificateAssociationSummary[];
  nextToken?: string;
}
export const ListCertificateAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    certificateAssociations: CertificateAssociationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCertificateAssociationsResponse",
}) as any as S.Schema<ListCertificateAssociationsResponse>;
export interface ListLinkRoutingRulesRequest {
  gatewayId: string;
  linkId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListLinkRoutingRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rules",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLinkRoutingRulesRequest",
}) as any as S.Schema<ListLinkRoutingRulesRequest>;
export interface LinkRoutingRuleSummary {
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
  status: RuleStatus;
  createdAt: Date;
  updatedAt: Date;
}
export const LinkRoutingRuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    priority: S.Number,
    conditions: RuleCondition,
    status: RuleStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "LinkRoutingRuleSummary",
}) as any as S.Schema<LinkRoutingRuleSummary>;
export type LinkRoutingRuleList = LinkRoutingRuleSummary[];
export const LinkRoutingRuleList = /*@__PURE__*/ S.Array(
  LinkRoutingRuleSummary,
);
export interface ListLinkRoutingRulesResponse {
  rules?: LinkRoutingRuleSummary[];
  nextToken?: string;
}
export const ListLinkRoutingRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rules: S.optional(LinkRoutingRuleList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLinkRoutingRulesResponse",
}) as any as S.Schema<ListLinkRoutingRulesResponse>;
export interface ListLinksRequest {
  gatewayId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListLinksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/gateway/{gatewayId}/links/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLinksRequest",
}) as any as S.Schema<ListLinksRequest>;
export interface ListLinksResponseStructure {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
  tags?: { [key: string]: string | undefined };
  publicEndpoint?: string;
}
export const ListLinksResponseStructure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    peerGatewayId: S.String,
    status: LinkStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    direction: S.optional(LinkDirection),
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
    linkId: S.String,
    tags: S.optional(TagsMap),
    publicEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLinksResponseStructure",
}) as any as S.Schema<ListLinksResponseStructure>;
export type LinkList = ListLinksResponseStructure[];
export const LinkList = /*@__PURE__*/ S.Array(ListLinksResponseStructure);
export interface ListLinksResponse {
  links?: ListLinksResponseStructure[];
  nextToken?: string;
}
export const ListLinksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ links: S.optional(LinkList), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListLinksResponse",
}) as any as S.Schema<ListLinksResponse>;
export interface ListRequesterGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListRequesterGatewaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/requester-gateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRequesterGatewaysRequest",
}) as any as S.Schema<ListRequesterGatewaysRequest>;
export type GatewayIdList = string[];
export const GatewayIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListRequesterGatewaysResponse {
  gatewayIds?: string[];
  nextToken?: string;
}
export const ListRequesterGatewaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIds: S.optional(GatewayIdList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRequesterGatewaysResponse",
}) as any as S.Schema<ListRequesterGatewaysResponse>;
export interface ListResponderGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListResponderGatewaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/responder-gateways" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResponderGatewaysRequest",
}) as any as S.Schema<ListResponderGatewaysRequest>;
export interface ListResponderGatewaysResponse {
  gatewayIds?: string[];
  nextToken?: string;
}
export const ListResponderGatewaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayIds: S.optional(GatewayIdList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResponderGatewaysResponse",
}) as any as S.Schema<ListResponderGatewaysResponse>;
export type RtbTaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RejectLinkRequest {
  gatewayId: string;
  linkId: string;
}
export const RejectLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/gateway/{gatewayId}/link/{linkId}/reject",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectLinkRequest",
}) as any as S.Schema<RejectLinkRequest>;
export interface RejectLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
}
export const RejectLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String,
    peerGatewayId: S.String,
    status: LinkStatus,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    direction: S.optional(LinkDirection),
    flowModules: S.optional(ModuleConfigurationList),
    pendingFlowModules: S.optional(ModuleConfigurationList),
    attributes: S.optional(LinkAttributes),
    logSettings: S.optional(LinkLogSettings),
    connectivityType: S.optional(ConnectivityType),
    linkId: S.String,
  }),
).annotate({
  identifier: "RejectLinkResponse",
}) as any as S.Schema<RejectLinkResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateLinkRequest {
  gatewayId: string;
  linkId: string;
  logSettings?: LinkLogSettings;
  timeoutInMillis?: number;
}
export const UpdateLinkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    logSettings: S.optional(LinkLogSettings),
    timeoutInMillis: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/gateway/{gatewayId}/link/{linkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLinkRequest",
}) as any as S.Schema<UpdateLinkRequest>;
export interface UpdateLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export const UpdateLinkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ linkId: S.String, status: LinkStatus }),
).annotate({
  identifier: "UpdateLinkResponse",
}) as any as S.Schema<UpdateLinkResponse>;
export interface UpdateLinkModuleFlowRequest {
  clientToken: string;
  gatewayId: string;
  linkId: string;
  modules: ModuleConfiguration[];
}
export const UpdateLinkModuleFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    modules: ModuleConfigurationList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/gateway/{gatewayId}/link/{linkId}/module-flow",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLinkModuleFlowRequest",
}) as any as S.Schema<UpdateLinkModuleFlowRequest>;
export interface UpdateLinkModuleFlowResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
}
export const UpdateLinkModuleFlowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, linkId: S.String, status: LinkStatus }),
).annotate({
  identifier: "UpdateLinkModuleFlowResponse",
}) as any as S.Schema<UpdateLinkModuleFlowResponse>;
export interface UpdateLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
}
export const UpdateLinkRoutingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    linkId: S.String.pipe(T.HttpLabel("linkId")),
    ruleId: S.String.pipe(T.HttpLabel("ruleId")),
    priority: S.Number,
    conditions: RuleCondition,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLinkRoutingRuleRequest",
}) as any as S.Schema<UpdateLinkRoutingRuleRequest>;
export interface UpdateLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
  updatedAt: Date;
}
export const UpdateLinkRoutingRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    status: RuleStatus,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateLinkRoutingRuleResponse",
}) as any as S.Schema<UpdateLinkRoutingRuleResponse>;
export interface UpdateRequesterGatewayRequest {
  clientToken: string;
  gatewayId: string;
  description?: string;
}
export const UpdateRequesterGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String.pipe(T.IdempotencyToken()),
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/requester-gateway/{gatewayId}/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRequesterGatewayRequest",
}) as any as S.Schema<UpdateRequesterGatewayRequest>;
export interface UpdateRequesterGatewayResponse {
  gatewayId: string;
  status: RequesterGatewayStatus;
}
export const UpdateRequesterGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, status: RequesterGatewayStatus }),
).annotate({
  identifier: "UpdateRequesterGatewayResponse",
}) as any as S.Schema<UpdateRequesterGatewayResponse>;
export interface UpdateResponderGatewayRequest {
  domainName?: string;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig;
  trustStoreConfiguration?: TrustStoreConfiguration;
  managedEndpointConfiguration?: ManagedEndpointConfiguration;
  clientToken: string;
  gatewayId: string;
  description?: string;
}
export const UpdateResponderGatewayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainName: S.optional(S.String),
    port: S.Number,
    protocol: Protocol,
    listenerConfig: S.optional(ListenerConfig),
    trustStoreConfiguration: S.optional(TrustStoreConfiguration),
    managedEndpointConfiguration: S.optional(ManagedEndpointConfiguration),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/responder-gateway/{gatewayId}/update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResponderGatewayRequest",
}) as any as S.Schema<UpdateResponderGatewayRequest>;
export interface UpdateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
}
export const UpdateResponderGatewayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ gatewayId: S.String, status: ResponderGatewayStatus }),
).annotate({
  identifier: "UpdateResponderGatewayResponse",
}) as any as S.Schema<UpdateResponderGatewayResponse>;
export type AcceptLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a link request between gateways.
 *
 * When a requester gateway requests to link with a responder gateway, the responder can use this operation to accept the link request and establish the connection.
 */
export const acceptLink: API.OperationMethod<
  AcceptLinkRequest,
  AcceptLinkResponse,
  AcceptLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptLinkRequest,
  output: AcceptLinkResponse,
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
  operationName: "AcceptLink",
}));

export type AssociateCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an ACM certificate with a responder gateway.
 */
export const associateCertificate: API.OperationMethod<
  AssociateCertificateRequest,
  AssociateCertificateResponse,
  AssociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateCertificateRequest,
  output: AssociateCertificateResponse,
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
  operationName: "AssociateCertificate",
}));

export type CreateInboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an inbound external link.
 */
export const createInboundExternalLink: API.OperationMethod<
  CreateInboundExternalLinkRequest,
  CreateInboundExternalLinkResponse,
  CreateInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInboundExternalLinkRequest,
  output: CreateInboundExternalLinkResponse,
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
  operationName: "CreateInboundExternalLink",
}));

export type CreateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new link between gateways.
 *
 * Establishes a connection that allows gateways to communicate and exchange bid requests and responses.
 */
export const createLink: API.OperationMethod<
  CreateLinkRequest,
  CreateLinkResponse,
  CreateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLinkRequest,
  output: CreateLinkResponse,
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
  operationName: "CreateLink",
}));

export type CreateLinkRoutingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a routing rule for a link.
 *
 * Routing rules use priority-based evaluation where lower priority numbers are evaluated first. Each rule specifies conditions that must all match for the rule to apply.
 */
export const createLinkRoutingRule: API.OperationMethod<
  CreateLinkRoutingRuleRequest,
  CreateLinkRoutingRuleResponse,
  CreateLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLinkRoutingRuleRequest,
  output: CreateLinkRoutingRuleResponse,
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
  operationName: "CreateLinkRoutingRule",
}));

export type CreateOutboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an outbound external link.
 */
export const createOutboundExternalLink: API.OperationMethod<
  CreateOutboundExternalLinkRequest,
  CreateOutboundExternalLinkResponse,
  CreateOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOutboundExternalLinkRequest,
  output: CreateOutboundExternalLinkResponse,
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
  operationName: "CreateOutboundExternalLink",
}));

export type CreateRequesterGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a requester gateway.
 */
export const createRequesterGateway: API.OperationMethod<
  CreateRequesterGatewayRequest,
  CreateRequesterGatewayResponse,
  CreateRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRequesterGatewayRequest,
  output: CreateRequesterGatewayResponse,
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
  operationName: "CreateRequesterGateway",
}));

export type CreateResponderGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a responder gateway.
 *
 * A domain name or managed endpoint is required.
 */
export const createResponderGateway: API.OperationMethod<
  CreateResponderGatewayRequest,
  CreateResponderGatewayResponse,
  CreateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResponderGatewayRequest,
  output: CreateResponderGatewayResponse,
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
  operationName: "CreateResponderGateway",
}));

export type DeleteInboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an inbound external link.
 */
export const deleteInboundExternalLink: API.OperationMethod<
  DeleteInboundExternalLinkRequest,
  DeleteInboundExternalLinkResponse,
  DeleteInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInboundExternalLinkRequest,
  output: DeleteInboundExternalLinkResponse,
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
  operationName: "DeleteInboundExternalLink",
}));

export type DeleteLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a link between gateways.
 *
 * Permanently removes the connection between gateways. This action cannot be undone.
 */
export const deleteLink: API.OperationMethod<
  DeleteLinkRequest,
  DeleteLinkResponse,
  DeleteLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLinkRequest,
  output: DeleteLinkResponse,
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
  operationName: "DeleteLink",
}));

export type DeleteLinkRoutingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a routing rule from a link.
 */
export const deleteLinkRoutingRule: API.OperationMethod<
  DeleteLinkRoutingRuleRequest,
  DeleteLinkRoutingRuleResponse,
  DeleteLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLinkRoutingRuleRequest,
  output: DeleteLinkRoutingRuleResponse,
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
  operationName: "DeleteLinkRoutingRule",
}));

export type DeleteOutboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an outbound external link.
 */
export const deleteOutboundExternalLink: API.OperationMethod<
  DeleteOutboundExternalLinkRequest,
  DeleteOutboundExternalLinkResponse,
  DeleteOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOutboundExternalLinkRequest,
  output: DeleteOutboundExternalLinkResponse,
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
  operationName: "DeleteOutboundExternalLink",
}));

export type DeleteRequesterGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a requester gateway.
 */
export const deleteRequesterGateway: API.OperationMethod<
  DeleteRequesterGatewayRequest,
  DeleteRequesterGatewayResponse,
  DeleteRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRequesterGatewayRequest,
  output: DeleteRequesterGatewayResponse,
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
  operationName: "DeleteRequesterGateway",
}));

export type DeleteResponderGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a responder gateway.
 */
export const deleteResponderGateway: API.OperationMethod<
  DeleteResponderGatewayRequest,
  DeleteResponderGatewayResponse,
  DeleteResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResponderGatewayRequest,
  output: DeleteResponderGatewayResponse,
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
  operationName: "DeleteResponderGateway",
}));

export type DisassociateCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a certificate association from a responder gateway.
 */
export const disassociateCertificate: API.OperationMethod<
  DisassociateCertificateRequest,
  DisassociateCertificateResponse,
  DisassociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateCertificateRequest,
  output: DisassociateCertificateResponse,
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
  operationName: "DisassociateCertificate",
}));

export type GetCertificateAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a certificate association with a responder gateway.
 */
export const getCertificateAssociation: API.OperationMethod<
  GetCertificateAssociationRequest,
  GetCertificateAssociationResponse,
  GetCertificateAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCertificateAssociationRequest,
  output: GetCertificateAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificateAssociation",
}));

export type GetInboundExternalLinkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an inbound external link.
 */
export const getInboundExternalLink: API.OperationMethod<
  GetInboundExternalLinkRequest,
  GetInboundExternalLinkResponse,
  GetInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInboundExternalLinkRequest,
  output: GetInboundExternalLinkResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInboundExternalLink",
}));

export type GetLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a link between gateways.
 *
 * Returns detailed information about the link configuration, status, and associated gateways.
 */
export const getLink: API.OperationMethod<
  GetLinkRequest,
  GetLinkResponse,
  GetLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLinkRequest,
  output: GetLinkResponse,
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
  operationName: "GetLink",
}));

export type GetLinkRoutingRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a routing rule for a link.
 */
export const getLinkRoutingRule: API.OperationMethod<
  GetLinkRoutingRuleRequest,
  GetLinkRoutingRuleResponse,
  GetLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLinkRoutingRuleRequest,
  output: GetLinkRoutingRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkRoutingRule",
}));

export type GetOutboundExternalLinkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an outbound external link.
 */
export const getOutboundExternalLink: API.OperationMethod<
  GetOutboundExternalLinkRequest,
  GetOutboundExternalLinkResponse,
  GetOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOutboundExternalLinkRequest,
  output: GetOutboundExternalLinkResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutboundExternalLink",
}));

export type GetRequesterGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a requester gateway.
 */
export const getRequesterGateway: API.OperationMethod<
  GetRequesterGatewayRequest,
  GetRequesterGatewayResponse,
  GetRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRequesterGatewayRequest,
  output: GetRequesterGatewayResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequesterGateway",
}));

export type GetResponderGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a responder gateway.
 */
export const getResponderGateway: API.OperationMethod<
  GetResponderGatewayRequest,
  GetResponderGatewayResponse,
  GetResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResponderGatewayRequest,
  output: GetResponderGatewayResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponderGateway",
}));

export type ListCertificateAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the certificate associations for a responder gateway.
 */
export const listCertificateAssociations: API.PaginatedOperationMethod<
  ListCertificateAssociationsRequest,
  ListCertificateAssociationsResponse,
  ListCertificateAssociationsError,
  Credentials | HttpClient.HttpClient,
  CertificateAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCertificateAssociationsRequest,
  output: ListCertificateAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "certificateAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLinkRoutingRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the routing rules for a link.
 */
export const listLinkRoutingRules: API.PaginatedOperationMethod<
  ListLinkRoutingRulesRequest,
  ListLinkRoutingRulesResponse,
  ListLinkRoutingRulesError,
  Credentials | HttpClient.HttpClient,
  LinkRoutingRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLinkRoutingRulesRequest,
  output: ListLinkRoutingRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinkRoutingRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLinksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists links associated with gateways.
 *
 * Returns a list of all links for the specified gateways, including their status and configuration details.
 */
export const listLinks: API.PaginatedOperationMethod<
  ListLinksRequest,
  ListLinksResponse,
  ListLinksError,
  Credentials | HttpClient.HttpClient,
  ListLinksResponseStructure
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLinksRequest,
  output: ListLinksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "links",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRequesterGatewaysError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists requester gateways.
 */
export const listRequesterGateways: API.PaginatedOperationMethod<
  ListRequesterGatewaysRequest,
  ListRequesterGatewaysResponse,
  ListRequesterGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRequesterGatewaysRequest,
  output: ListRequesterGatewaysResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequesterGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResponderGatewaysError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists reponder gateways.
 */
export const listResponderGateways: API.PaginatedOperationMethod<
  ListResponderGatewaysRequest,
  ListResponderGatewaysResponse,
  ListResponderGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResponderGatewaysRequest,
  output: ListResponderGatewaysResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponderGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayIds",
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
 * Lists tags for a resource.
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

export type RejectLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a link request between gateways.
 *
 * When a requester gateway requests to link with a responder gateway, the responder can use this operation to decline the link request.
 */
export const rejectLink: API.OperationMethod<
  RejectLinkRequest,
  RejectLinkResponse,
  RejectLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectLinkRequest,
  output: RejectLinkResponse,
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
  operationName: "RejectLink",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
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
 * Removes a tag or tags from a resource.
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

export type UpdateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a link between gateways.
 *
 * Allows you to modify settings and parameters for an existing link.
 */
export const updateLink: API.OperationMethod<
  UpdateLinkRequest,
  UpdateLinkResponse,
  UpdateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLinkRequest,
  output: UpdateLinkResponse,
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
  operationName: "UpdateLink",
}));

export type UpdateLinkModuleFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a link module flow.
 */
export const updateLinkModuleFlow: API.OperationMethod<
  UpdateLinkModuleFlowRequest,
  UpdateLinkModuleFlowResponse,
  UpdateLinkModuleFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLinkModuleFlowRequest,
  output: UpdateLinkModuleFlowResponse,
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
  operationName: "UpdateLinkModuleFlow",
}));

export type UpdateLinkRoutingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a routing rule for a link.
 */
export const updateLinkRoutingRule: API.OperationMethod<
  UpdateLinkRoutingRuleRequest,
  UpdateLinkRoutingRuleResponse,
  UpdateLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLinkRoutingRuleRequest,
  output: UpdateLinkRoutingRuleResponse,
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
  operationName: "UpdateLinkRoutingRule",
}));

export type UpdateRequesterGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a requester gateway.
 */
export const updateRequesterGateway: API.OperationMethod<
  UpdateRequesterGatewayRequest,
  UpdateRequesterGatewayResponse,
  UpdateRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRequesterGatewayRequest,
  output: UpdateRequesterGatewayResponse,
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
  operationName: "UpdateRequesterGateway",
}));

export type UpdateResponderGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a responder gateway.
 */
export const updateResponderGateway: API.OperationMethod<
  UpdateResponderGatewayRequest,
  UpdateResponderGatewayResponse,
  UpdateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResponderGatewayRequest,
  output: UpdateResponderGatewayResponse,
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
  operationName: "UpdateResponderGateway",
}));
