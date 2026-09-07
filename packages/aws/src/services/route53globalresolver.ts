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
  sdkId: "Route53GlobalResolver",
  serviceShapeName: "EC2DNSGlobalResolverCustomerAPI",
});
const auth = T.AwsAuthSigv4({ name: "route53globalresolver" });
const ver = T.ServiceVersion("2022-09-27");
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
            `https://route53globalresolver-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://route53globalresolver.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.String,
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
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
export type HostedZoneId = string;
export type ResourceArn = string;
export type ResourceName = string;
export interface AssociateHostedZoneInput {
  hostedZoneId: string;
  resourceArn: string;
  name: string;
}
export const AssociateHostedZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostedZoneId: S.String.pipe(T.HttpLabel("hostedZoneId")),
    resourceArn: S.String,
    name: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/hosted-zone-associations/{hostedZoneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateHostedZoneInput",
}) as any as S.Schema<AssociateHostedZoneInput>;
export type ResourceId = string;
export type HostedZoneName = string;
export type ISO8601TimeString = Date;
export type HostedZoneAssociationStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "DELETING"
  | (string & {});
export const HostedZoneAssociationStatus = S.String;

export interface AssociateHostedZoneOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export const AssociateHostedZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    resourceArn: S.String,
    hostedZoneId: S.String,
    hostedZoneName: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: HostedZoneAssociationStatus,
  }),
).annotate({
  identifier: "AssociateHostedZoneOutput",
}) as any as S.Schema<AssociateHostedZoneOutput>;
export type FirewallRuleAction = "ALLOW" | "ALERT" | "BLOCK" | (string & {});
export const FirewallRuleAction = S.String;

export type BlockOverrideDnsQueryType = "CNAME" | (string & {});
export const BlockOverrideDnsQueryType = S.String;

export type Domain = string;
export type BlockOverrideTtl = number;
export type FirewallBlockResponse =
  | "NODATA"
  | "NXDOMAIN"
  | "OVERRIDE"
  | (string & {});
export const FirewallBlockResponse = S.String;

export type ClientToken = string;
export type ConfidenceThreshold = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const ConfidenceThreshold = S.String;

export type ResourceDescription = string;
export type DnsAdvancedProtection =
  | "DGA"
  | "DNS_TUNNELING"
  | "DICTIONARY_DGA"
  | (string & {});
export const DnsAdvancedProtection = S.String;

export type FirewallRulePriority = number;
export type DnsQueryType = string;
export interface BatchCreateFirewallRuleInputItem {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken: string;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  name: string;
  priority?: number;
  dnsViewId: string;
  qType?: string;
}
export const BatchCreateFirewallRuleInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    clientToken: S.String,
    confidenceThreshold: S.optional(ConfidenceThreshold),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    name: S.String,
    priority: S.optional(S.Number),
    dnsViewId: S.String,
    qType: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchCreateFirewallRuleInputItem",
}) as any as S.Schema<BatchCreateFirewallRuleInputItem>;
export type BatchCreateFirewallRuleInputItems =
  BatchCreateFirewallRuleInputItem[];
export const BatchCreateFirewallRuleInputItems = /*@__PURE__*/ S.Array(
  BatchCreateFirewallRuleInputItem,
);
export interface BatchCreateFirewallRuleInput {
  firewallRules: BatchCreateFirewallRuleInputItem[];
}
export const BatchCreateFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ firewallRules: BatchCreateFirewallRuleInputItems }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/firewall-rules/batch-create" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchCreateFirewallRuleInput",
}) as any as S.Schema<BatchCreateFirewallRuleInput>;
export type CRResourceStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export const CRResourceStatus = S.String;

export interface BatchCreateFirewallRuleResult {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken: string;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt?: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id?: string;
  managedDomainListName?: string;
  name: string;
  priority?: number;
  dnsViewId: string;
  queryType?: string;
  status?: CRResourceStatus;
  updatedAt?: Date;
}
export const BatchCreateFirewallRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    clientToken: S.String,
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.optional(S.String),
    managedDomainListName: S.optional(S.String),
    name: S.String,
    priority: S.optional(S.Number),
    dnsViewId: S.String,
    queryType: S.optional(S.String),
    status: S.optional(CRResourceStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "BatchCreateFirewallRuleResult",
}) as any as S.Schema<BatchCreateFirewallRuleResult>;
export interface BatchCreateFirewallRuleOutputItem {
  firewallRule: BatchCreateFirewallRuleResult;
  code: number;
  message?: string;
}
export const BatchCreateFirewallRuleOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallRule: BatchCreateFirewallRuleResult,
    code: S.Number,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchCreateFirewallRuleOutputItem",
}) as any as S.Schema<BatchCreateFirewallRuleOutputItem>;
export type BatchCreateFirewallRuleOutputItems =
  BatchCreateFirewallRuleOutputItem[];
export const BatchCreateFirewallRuleOutputItems = /*@__PURE__*/ S.Array(
  BatchCreateFirewallRuleOutputItem,
);
export interface BatchCreateFirewallRuleOutput {
  failures: BatchCreateFirewallRuleOutputItem[];
  successes: BatchCreateFirewallRuleOutputItem[];
}
export const BatchCreateFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failures: BatchCreateFirewallRuleOutputItems,
    successes: BatchCreateFirewallRuleOutputItems,
  }),
).annotate({
  identifier: "BatchCreateFirewallRuleOutput",
}) as any as S.Schema<BatchCreateFirewallRuleOutput>;
export interface BatchDeleteFirewallRuleInputItem {
  firewallRuleId: string;
}
export const BatchDeleteFirewallRuleInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ firewallRuleId: S.String }),
).annotate({
  identifier: "BatchDeleteFirewallRuleInputItem",
}) as any as S.Schema<BatchDeleteFirewallRuleInputItem>;
export type BatchDeleteFirewallRuleInputItems =
  BatchDeleteFirewallRuleInputItem[];
export const BatchDeleteFirewallRuleInputItems = /*@__PURE__*/ S.Array(
  BatchDeleteFirewallRuleInputItem,
);
export interface BatchDeleteFirewallRuleInput {
  firewallRules: BatchDeleteFirewallRuleInputItem[];
}
export const BatchDeleteFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ firewallRules: BatchDeleteFirewallRuleInputItems }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/firewall-rules/batch-delete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteFirewallRuleInput",
}) as any as S.Schema<BatchDeleteFirewallRuleInput>;
export interface BatchDeleteFirewallRuleResult {
  clientToken?: string;
  id: string;
  name?: string;
  status?: CRResourceStatus;
}
export const BatchDeleteFirewallRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    id: S.String,
    name: S.optional(S.String),
    status: S.optional(CRResourceStatus),
  }),
).annotate({
  identifier: "BatchDeleteFirewallRuleResult",
}) as any as S.Schema<BatchDeleteFirewallRuleResult>;
export interface BatchDeleteFirewallRuleOutputItem {
  firewallRule: BatchDeleteFirewallRuleResult;
  code: number;
  message?: string;
}
export const BatchDeleteFirewallRuleOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallRule: BatchDeleteFirewallRuleResult,
    code: S.Number,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDeleteFirewallRuleOutputItem",
}) as any as S.Schema<BatchDeleteFirewallRuleOutputItem>;
export type BatchDeleteFirewallRuleOutputItems =
  BatchDeleteFirewallRuleOutputItem[];
export const BatchDeleteFirewallRuleOutputItems = /*@__PURE__*/ S.Array(
  BatchDeleteFirewallRuleOutputItem,
);
export interface BatchDeleteFirewallRuleOutput {
  failures: BatchDeleteFirewallRuleOutputItem[];
  successes: BatchDeleteFirewallRuleOutputItem[];
}
export const BatchDeleteFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failures: BatchDeleteFirewallRuleOutputItems,
    successes: BatchDeleteFirewallRuleOutputItems,
  }),
).annotate({
  identifier: "BatchDeleteFirewallRuleOutput",
}) as any as S.Schema<BatchDeleteFirewallRuleOutput>;
export interface BatchUpdateFirewallRuleInputItem {
  action?: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallRuleId: string;
  name?: string;
  priority?: number;
}
export const BatchUpdateFirewallRuleInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FirewallRuleAction),
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallRuleId: S.String,
    name: S.optional(S.String),
    priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchUpdateFirewallRuleInputItem",
}) as any as S.Schema<BatchUpdateFirewallRuleInputItem>;
export type BatchUpdateFirewallRuleInputItems =
  BatchUpdateFirewallRuleInputItem[];
export const BatchUpdateFirewallRuleInputItems = /*@__PURE__*/ S.Array(
  BatchUpdateFirewallRuleInputItem,
);
export interface BatchUpdateFirewallRuleInput {
  firewallRules: BatchUpdateFirewallRuleInputItem[];
}
export const BatchUpdateFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ firewallRules: BatchUpdateFirewallRuleInputItems }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/firewall-rules/batch-update" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateFirewallRuleInput",
}) as any as S.Schema<BatchUpdateFirewallRuleInput>;
export interface BatchUpdateFirewallRuleResult {
  action?: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken?: string;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt?: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name?: string;
  priority?: number;
  dnsViewId?: string;
  queryType?: string;
  status?: CRResourceStatus;
  updatedAt?: Date;
}
export const BatchUpdateFirewallRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FirewallRuleAction),
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    clientToken: S.optional(S.String),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.String,
    name: S.optional(S.String),
    priority: S.optional(S.Number),
    dnsViewId: S.optional(S.String),
    queryType: S.optional(S.String),
    status: S.optional(CRResourceStatus),
    updatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "BatchUpdateFirewallRuleResult",
}) as any as S.Schema<BatchUpdateFirewallRuleResult>;
export interface BatchUpdateFirewallRuleOutputItem {
  firewallRule: BatchUpdateFirewallRuleResult;
  code: number;
  message?: string;
}
export const BatchUpdateFirewallRuleOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallRule: BatchUpdateFirewallRuleResult,
    code: S.Number,
    message: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchUpdateFirewallRuleOutputItem",
}) as any as S.Schema<BatchUpdateFirewallRuleOutputItem>;
export type BatchUpdateFirewallRuleOutputItems =
  BatchUpdateFirewallRuleOutputItem[];
export const BatchUpdateFirewallRuleOutputItems = /*@__PURE__*/ S.Array(
  BatchUpdateFirewallRuleOutputItem,
);
export interface BatchUpdateFirewallRuleOutput {
  failures: BatchUpdateFirewallRuleOutputItem[];
  successes: BatchUpdateFirewallRuleOutputItem[];
}
export const BatchUpdateFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    failures: BatchUpdateFirewallRuleOutputItems,
    successes: BatchUpdateFirewallRuleOutputItems,
  }),
).annotate({
  identifier: "BatchUpdateFirewallRuleOutput",
}) as any as S.Schema<BatchUpdateFirewallRuleOutput>;
export type Cidr = string;
export type IpAddressType = "IPV4" | "IPV6" | (string & {});
export const IpAddressType = S.String;

export type ResourceNameShort = string;
export type DnsProtocol = "DO53" | "DOH" | "DOT" | (string & {});
export const DnsProtocol = S.String;

export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateAccessSourceInput {
  cidr: string;
  clientToken?: string;
  ipAddressType?: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  tags?: { [key: string]: string | undefined };
}
export const CreateAccessSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    cidr: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ipAddressType: S.optional(IpAddressType),
    name: S.optional(S.String),
    dnsViewId: S.String,
    protocol: DnsProtocol,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/access-sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessSourceInput",
}) as any as S.Schema<CreateAccessSourceInput>;
export interface CreateAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const CreateAccessSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    cidr: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    id: S.String,
    ipAddressType: IpAddressType,
    name: S.optional(S.String),
    dnsViewId: S.String,
    protocol: DnsProtocol,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateAccessSourceOutput",
}) as any as S.Schema<CreateAccessSourceOutput>;
export interface CreateAccessTokenInput {
  clientToken?: string;
  dnsViewId: string;
  expiresAt?: Date;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateAccessTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")),
    expiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tokens/{dnsViewId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAccessTokenInput",
}) as any as S.Schema<CreateAccessTokenInput>;
export type TokenStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "DELETING"
  | (string & {});
export const TokenStatus = S.String;

export type AccessTokenValue = string | redacted.Redacted<string>;
export interface CreateAccessTokenOutput {
  id: string;
  arn: string;
  clientToken?: string;
  createdAt: Date;
  dnsViewId: string;
  expiresAt: Date;
  name?: string;
  status: TokenStatus;
  value: string | redacted.Redacted<string>;
}
export const CreateAccessTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    dnsViewId: S.String,
    expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    name: S.optional(S.String),
    status: TokenStatus,
    value: SensitiveString,
  }),
).annotate({
  identifier: "CreateAccessTokenOutput",
}) as any as S.Schema<CreateAccessTokenOutput>;
export type DnsSecValidationType = "ENABLED" | "DISABLED" | (string & {});
export const DnsSecValidationType = S.String;

export type EdnsClientSubnetType = "ENABLED" | "DISABLED" | (string & {});
export const EdnsClientSubnetType = S.String;

export type FirewallRulesFailOpenType = "ENABLED" | "DISABLED" | (string & {});
export const FirewallRulesFailOpenType = S.String;

export interface CreateDNSViewInput {
  globalResolverId: string;
  clientToken?: string;
  name: string;
  dnssecValidation?: DnsSecValidationType;
  ednsClientSubnet?: EdnsClientSubnetType;
  firewallRulesFailOpen?: FirewallRulesFailOpenType;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDNSViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    name: S.String,
    dnssecValidation: S.optional(DnsSecValidationType),
    ednsClientSubnet: S.optional(EdnsClientSubnetType),
    firewallRulesFailOpen: S.optional(FirewallRulesFailOpenType),
    description: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/dns-views/{globalResolverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDNSViewInput",
}) as any as S.Schema<CreateDNSViewInput>;
export type ProfileResourceStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "ENABLING"
  | "DISABLING"
  | "DISABLED"
  | "DELETING"
  | (string & {});
export const ProfileResourceStatus = S.String;

export interface CreateDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const CreateDNSViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({
  identifier: "CreateDNSViewOutput",
}) as any as S.Schema<CreateDNSViewOutput>;
export interface CreateFirewallDomainListInput {
  clientToken?: string;
  globalResolverId: string;
  description?: string;
  name: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateFirewallDomainListInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
    description: S.optional(S.String),
    name: S.String,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/firewall-domain-lists/{globalResolverId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFirewallDomainListInput",
}) as any as S.Schema<CreateFirewallDomainListInput>;
export interface CreateFirewallDomainListOutput {
  arn: string;
  globalResolverId: string;
  createdAt: Date;
  description?: string;
  domainCount: number;
  id: string;
  name: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const CreateFirewallDomainListOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    domainCount: S.Number,
    id: S.String,
    name: S.String,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateFirewallDomainListOutput",
}) as any as S.Schema<CreateFirewallDomainListOutput>;
export interface CreateFirewallRuleInput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken?: string;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  name: string;
  priority?: number;
  dnsViewId: string;
  qType?: string;
}
export const CreateFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    name: S.String,
    priority: S.optional(S.Number),
    dnsViewId: S.String,
    qType: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/firewall-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFirewallRuleInput",
}) as any as S.Schema<CreateFirewallRuleInput>;
export interface CreateFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const CreateFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.String,
    name: S.String,
    priority: S.Number,
    dnsViewId: S.String,
    queryType: S.optional(S.String),
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateFirewallRuleOutput",
}) as any as S.Schema<CreateFirewallRuleOutput>;
export type GlobalResolverIpAddressType = "IPV4" | "DUAL_STACK" | (string & {});
export const GlobalResolverIpAddressType = S.String;

export type Region = string;
export type Regions = string[];
export const Regions = /*@__PURE__*/ S.Array(S.String);
export interface CreateGlobalResolverInput {
  clientToken?: string;
  description?: string;
  ipAddressType?: GlobalResolverIpAddressType;
  name: string;
  observabilityRegion?: string;
  regions: string[];
  tags?: { [key: string]: string | undefined };
}
export const CreateGlobalResolverInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    description: S.optional(S.String),
    ipAddressType: S.optional(GlobalResolverIpAddressType),
    name: S.String,
    observabilityRegion: S.optional(S.String),
    regions: Regions,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/global-resolver" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlobalResolverInput",
}) as any as S.Schema<CreateGlobalResolverInput>;
export type Sni = string;
export type IPv4Address = string;
export type IPv4Addresses = string[];
export const IPv4Addresses = /*@__PURE__*/ S.Array(S.String);
export type IPv6Address = string;
export type IPv6Addresses = string[];
export const IPv6Addresses = /*@__PURE__*/ S.Array(S.String);
export interface CreateGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  createdAt: Date;
  description?: string;
  dnsName: string;
  ipAddressType?: GlobalResolverIpAddressType;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  name: string;
  observabilityRegion?: string;
  regions: string[];
  status: CRResourceStatus;
  updatedAt: Date;
}
export const CreateGlobalResolverOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    dnsName: S.String,
    ipAddressType: S.optional(GlobalResolverIpAddressType),
    ipv4Addresses: IPv4Addresses,
    ipv6Addresses: S.optional(IPv6Addresses),
    name: S.String,
    observabilityRegion: S.optional(S.String),
    regions: Regions,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreateGlobalResolverOutput",
}) as any as S.Schema<CreateGlobalResolverOutput>;
export interface DeleteAccessSourceInput {
  accessSourceId: string;
}
export const DeleteAccessSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessSourceId: S.String.pipe(T.HttpLabel("accessSourceId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/access-sources/{accessSourceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessSourceInput",
}) as any as S.Schema<DeleteAccessSourceInput>;
export interface DeleteAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const DeleteAccessSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    cidr: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    id: S.String,
    ipAddressType: IpAddressType,
    name: S.optional(S.String),
    dnsViewId: S.String,
    protocol: DnsProtocol,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DeleteAccessSourceOutput",
}) as any as S.Schema<DeleteAccessSourceOutput>;
export interface DeleteAccessTokenInput {
  accessTokenId: string;
}
export const DeleteAccessTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessTokenId: S.String.pipe(T.HttpLabel("accessTokenId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tokens/{accessTokenId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAccessTokenInput",
}) as any as S.Schema<DeleteAccessTokenInput>;
export interface DeleteAccessTokenOutput {
  id: string;
  status: TokenStatus;
  deletedAt: Date;
}
export const DeleteAccessTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    status: TokenStatus,
    deletedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DeleteAccessTokenOutput",
}) as any as S.Schema<DeleteAccessTokenOutput>;
export interface DeleteDNSViewInput {
  dnsViewId: string;
}
export const DeleteDNSViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/dns-views/{dnsViewId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDNSViewInput",
}) as any as S.Schema<DeleteDNSViewInput>;
export interface DeleteDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const DeleteDNSViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({
  identifier: "DeleteDNSViewOutput",
}) as any as S.Schema<DeleteDNSViewOutput>;
export interface DeleteFirewallDomainListInput {
  firewallDomainListId: string;
}
export const DeleteFirewallDomainListInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/firewall-domain-lists/{firewallDomainListId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFirewallDomainListInput",
}) as any as S.Schema<DeleteFirewallDomainListInput>;
export interface DeleteFirewallDomainListOutput {
  arn: string;
  id: string;
  name: string;
  status: CRResourceStatus;
}
export const DeleteFirewallDomainListOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.String,
    status: CRResourceStatus,
  }),
).annotate({
  identifier: "DeleteFirewallDomainListOutput",
}) as any as S.Schema<DeleteFirewallDomainListOutput>;
export interface DeleteFirewallRuleInput {
  firewallRuleId: string;
}
export const DeleteFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallRuleId: S.String.pipe(T.HttpLabel("firewallRuleId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/firewall-rules/{firewallRuleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFirewallRuleInput",
}) as any as S.Schema<DeleteFirewallRuleInput>;
export interface DeleteFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const DeleteFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.String,
    name: S.String,
    priority: S.Number,
    dnsViewId: S.String,
    queryType: S.optional(S.String),
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DeleteFirewallRuleOutput",
}) as any as S.Schema<DeleteFirewallRuleOutput>;
export interface DeleteGlobalResolverInput {
  globalResolverId: string;
}
export const DeleteGlobalResolverInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/global-resolver/{globalResolverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlobalResolverInput",
}) as any as S.Schema<DeleteGlobalResolverInput>;
export interface DeleteGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export const DeleteGlobalResolverOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    dnsName: S.String,
    observabilityRegion: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    regions: Regions,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CRResourceStatus,
    ipv4Addresses: IPv4Addresses,
    ipv6Addresses: S.optional(IPv6Addresses),
    ipAddressType: S.optional(GlobalResolverIpAddressType),
  }),
).annotate({
  identifier: "DeleteGlobalResolverOutput",
}) as any as S.Schema<DeleteGlobalResolverOutput>;
export interface DisableDNSViewInput {
  dnsViewId: string;
}
export const DisableDNSViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/dns-views/{dnsViewId}/disable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableDNSViewInput",
}) as any as S.Schema<DisableDNSViewInput>;
export interface DisableDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const DisableDNSViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({
  identifier: "DisableDNSViewOutput",
}) as any as S.Schema<DisableDNSViewOutput>;
export interface DisassociateHostedZoneInput {
  hostedZoneId: string;
  resourceArn: string;
}
export const DisassociateHostedZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostedZoneId: S.String.pipe(T.HttpLabel("hostedZoneId")),
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/hosted-zone-associations/hosted-zone/{hostedZoneId}/resource-arn/{resourceArn+}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateHostedZoneInput",
}) as any as S.Schema<DisassociateHostedZoneInput>;
export interface DisassociateHostedZoneOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export const DisassociateHostedZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    resourceArn: S.String,
    hostedZoneId: S.String,
    hostedZoneName: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: HostedZoneAssociationStatus,
  }),
).annotate({
  identifier: "DisassociateHostedZoneOutput",
}) as any as S.Schema<DisassociateHostedZoneOutput>;
export interface EnableDNSViewInput {
  dnsViewId: string;
}
export const EnableDNSViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/dns-views/{dnsViewId}/enable" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableDNSViewInput",
}) as any as S.Schema<EnableDNSViewInput>;
export interface EnableDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const EnableDNSViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({
  identifier: "EnableDNSViewOutput",
}) as any as S.Schema<EnableDNSViewOutput>;
export interface GetAccessSourceInput {
  accessSourceId: string;
}
export const GetAccessSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessSourceId: S.String.pipe(T.HttpLabel("accessSourceId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/access-sources/{accessSourceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessSourceInput",
}) as any as S.Schema<GetAccessSourceInput>;
export interface GetAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const GetAccessSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    cidr: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    id: S.String,
    ipAddressType: IpAddressType,
    name: S.optional(S.String),
    dnsViewId: S.String,
    protocol: DnsProtocol,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetAccessSourceOutput",
}) as any as S.Schema<GetAccessSourceOutput>;
export interface GetAccessTokenInput {
  accessTokenId: string;
}
export const GetAccessTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessTokenId: S.String.pipe(T.HttpLabel("accessTokenId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tokens/{accessTokenId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccessTokenInput",
}) as any as S.Schema<GetAccessTokenInput>;
export interface GetAccessTokenOutput {
  id: string;
  arn: string;
  clientToken?: string;
  createdAt: Date;
  dnsViewId: string;
  expiresAt: Date;
  globalResolverId: string;
  name?: string;
  status: TokenStatus;
  updatedAt: Date;
  value: string | redacted.Redacted<string>;
}
export const GetAccessTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    dnsViewId: S.String,
    expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    globalResolverId: S.String,
    name: S.optional(S.String),
    status: TokenStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    value: SensitiveString,
  }),
).annotate({
  identifier: "GetAccessTokenOutput",
}) as any as S.Schema<GetAccessTokenOutput>;
export interface GetDNSViewInput {
  dnsViewId: string;
}
export const GetDNSViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dns-views/{dnsViewId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDNSViewInput",
}) as any as S.Schema<GetDNSViewInput>;
export interface GetDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const GetDNSViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({
  identifier: "GetDNSViewOutput",
}) as any as S.Schema<GetDNSViewOutput>;
export interface GetFirewallDomainListInput {
  firewallDomainListId: string;
}
export const GetFirewallDomainListInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/firewall-domain-lists/{firewallDomainListId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFirewallDomainListInput",
}) as any as S.Schema<GetFirewallDomainListInput>;
export interface GetFirewallDomainListOutput {
  arn: string;
  globalResolverId: string;
  clientToken?: string;
  createdAt: Date;
  description?: string;
  domainCount: number;
  id: string;
  name: string;
  status: CRResourceStatus;
  statusMessage?: string;
  updatedAt: Date;
}
export const GetFirewallDomainListOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    globalResolverId: S.String,
    clientToken: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    domainCount: S.Number,
    id: S.String,
    name: S.String,
    status: CRResourceStatus,
    statusMessage: S.optional(S.String),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetFirewallDomainListOutput",
}) as any as S.Schema<GetFirewallDomainListOutput>;
export interface GetFirewallRuleInput {
  firewallRuleId: string;
}
export const GetFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallRuleId: S.String.pipe(T.HttpLabel("firewallRuleId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/firewall-rules/{firewallRuleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFirewallRuleInput",
}) as any as S.Schema<GetFirewallRuleInput>;
export interface GetFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const GetFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.String,
    name: S.String,
    priority: S.Number,
    dnsViewId: S.String,
    queryType: S.optional(S.String),
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetFirewallRuleOutput",
}) as any as S.Schema<GetFirewallRuleOutput>;
export interface GetGlobalResolverInput {
  globalResolverId: string;
}
export const GetGlobalResolverInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/global-resolver/{globalResolverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlobalResolverInput",
}) as any as S.Schema<GetGlobalResolverInput>;
export interface GetGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export const GetGlobalResolverOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    dnsName: S.String,
    observabilityRegion: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    regions: Regions,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CRResourceStatus,
    ipv4Addresses: IPv4Addresses,
    ipv6Addresses: S.optional(IPv6Addresses),
    ipAddressType: S.optional(GlobalResolverIpAddressType),
  }),
).annotate({
  identifier: "GetGlobalResolverOutput",
}) as any as S.Schema<GetGlobalResolverOutput>;
export interface GetHostedZoneAssociationInput {
  hostedZoneAssociationId: string;
}
export const GetHostedZoneAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostedZoneAssociationId: S.String.pipe(
      T.HttpLabel("hostedZoneAssociationId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/hosted-zone-associations/{hostedZoneAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHostedZoneAssociationInput",
}) as any as S.Schema<GetHostedZoneAssociationInput>;
export interface GetHostedZoneAssociationOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export const GetHostedZoneAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    resourceArn: S.String,
    hostedZoneId: S.String,
    hostedZoneName: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: HostedZoneAssociationStatus,
  }),
).annotate({
  identifier: "GetHostedZoneAssociationOutput",
}) as any as S.Schema<GetHostedZoneAssociationOutput>;
export interface GetManagedFirewallDomainListInput {
  managedFirewallDomainListId: string;
}
export const GetManagedFirewallDomainListInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    managedFirewallDomainListId: S.String.pipe(
      T.HttpLabel("managedFirewallDomainListId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-firewall-domain-lists/{managedFirewallDomainListId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedFirewallDomainListInput",
}) as any as S.Schema<GetManagedFirewallDomainListInput>;
export interface GetManagedFirewallDomainListOutput {
  description?: string;
  id: string;
  name: string;
  managedListType: string;
}
export const GetManagedFirewallDomainListOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    id: S.String,
    name: S.String,
    managedListType: S.String,
  }),
).annotate({
  identifier: "GetManagedFirewallDomainListOutput",
}) as any as S.Schema<GetManagedFirewallDomainListOutput>;
export interface ImportFirewallDomainsInput {
  domainFileUrl: string;
  firewallDomainListId: string;
  operation: string;
}
export const ImportFirewallDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainFileUrl: S.String,
    firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
    operation: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/firewall-domain-lists/{firewallDomainListId}/domains/s3_file_url",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportFirewallDomainsInput",
}) as any as S.Schema<ImportFirewallDomainsInput>;
export interface ImportFirewallDomainsOutput {
  id: string;
  name: string;
  status: CRResourceStatus;
}
export const ImportFirewallDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, name: S.String, status: CRResourceStatus }),
).annotate({
  identifier: "ImportFirewallDomainsOutput",
}) as any as S.Schema<ImportFirewallDomainsOutput>;
export type Strings = string[];
export const Strings = /*@__PURE__*/ S.Array(S.String);
export type Filters = { [key: string]: string[] | undefined };
export const Filters = /*@__PURE__*/ S.Record(
  S.String,
  Strings.pipe(S.optional),
);
export interface ListAccessSourcesInput {
  maxResults?: number;
  nextToken?: string;
  filters?: { [key: string]: string[] | undefined };
}
export const ListAccessSourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    filters: S.optional(Filters).pipe(T.HttpQueryParams()),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/access-sources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessSourcesInput",
}) as any as S.Schema<ListAccessSourcesInput>;
export interface AccessSourcesItem {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const AccessSourcesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    cidr: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    id: S.String,
    ipAddressType: IpAddressType,
    name: S.optional(S.String),
    dnsViewId: S.String,
    protocol: DnsProtocol,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AccessSourcesItem",
}) as any as S.Schema<AccessSourcesItem>;
export type AccessSources = AccessSourcesItem[];
export const AccessSources = /*@__PURE__*/ S.Array(AccessSourcesItem);
export interface ListAccessSourcesOutput {
  nextToken?: string;
  accessSources: AccessSourcesItem[];
}
export const ListAccessSourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), accessSources: AccessSources }),
).annotate({
  identifier: "ListAccessSourcesOutput",
}) as any as S.Schema<ListAccessSourcesOutput>;
export interface ListAccessTokensInput {
  maxResults?: number;
  nextToken?: string;
  dnsViewId: string;
  filters?: { [key: string]: string[] | undefined };
}
export const ListAccessTokensInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")),
    filters: S.optional(Filters).pipe(T.HttpQueryParams()),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tokens/dns-view/{dnsViewId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccessTokensInput",
}) as any as S.Schema<ListAccessTokensInput>;
export interface AccessTokenItem {
  id: string;
  arn: string;
  createdAt: Date;
  dnsViewId: string;
  expiresAt: Date;
  globalResolverId: string;
  name?: string;
  status: TokenStatus;
  updatedAt: Date;
}
export const AccessTokenItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    dnsViewId: S.String,
    expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    globalResolverId: S.String,
    name: S.optional(S.String),
    status: TokenStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AccessTokenItem",
}) as any as S.Schema<AccessTokenItem>;
export type AccessTokens = AccessTokenItem[];
export const AccessTokens = /*@__PURE__*/ S.Array(AccessTokenItem);
export interface ListAccessTokensOutput {
  nextToken?: string;
  accessTokens?: AccessTokenItem[];
}
export const ListAccessTokensOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    accessTokens: S.optional(AccessTokens),
  }),
).annotate({
  identifier: "ListAccessTokensOutput",
}) as any as S.Schema<ListAccessTokensOutput>;
export interface ListDNSViewsInput {
  maxResults?: number;
  nextToken?: string;
  globalResolverId: string;
}
export const ListDNSViewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/dns-views/resolver/{globalResolverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDNSViewsInput",
}) as any as S.Schema<ListDNSViewsInput>;
export interface DNSViewSummary {
  id: string;
  arn: string;
  clientToken: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const DNSViewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({ identifier: "DNSViewSummary" }) as any as S.Schema<DNSViewSummary>;
export type DNSViews = DNSViewSummary[];
export const DNSViews = /*@__PURE__*/ S.Array(DNSViewSummary);
export interface ListDNSViewsOutput {
  nextToken?: string;
  dnsViews: DNSViewSummary[];
}
export const ListDNSViewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), dnsViews: DNSViews }),
).annotate({
  identifier: "ListDNSViewsOutput",
}) as any as S.Schema<ListDNSViewsOutput>;
export interface ListFirewallDomainListsInput {
  maxResults?: number;
  nextToken?: string;
  globalResolverId?: string;
}
export const ListFirewallDomainListsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    globalResolverId: S.optional(S.String).pipe(
      T.HttpQuery("global_resolver_id"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/firewall-domain-lists" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFirewallDomainListsInput",
}) as any as S.Schema<ListFirewallDomainListsInput>;
export interface FirewallDomainListsItem {
  arn: string;
  globalResolverId: string;
  createdAt: Date;
  description?: string;
  id: string;
  name: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const FirewallDomainListsItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    id: S.String,
    name: S.String,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "FirewallDomainListsItem",
}) as any as S.Schema<FirewallDomainListsItem>;
export type FirewallDomainLists = FirewallDomainListsItem[];
export const FirewallDomainLists = /*@__PURE__*/ S.Array(
  FirewallDomainListsItem,
);
export interface ListFirewallDomainListsOutput {
  nextToken?: string;
  firewallDomainLists: FirewallDomainListsItem[];
}
export const ListFirewallDomainListsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    firewallDomainLists: FirewallDomainLists,
  }),
).annotate({
  identifier: "ListFirewallDomainListsOutput",
}) as any as S.Schema<ListFirewallDomainListsOutput>;
export interface ListFirewallDomainsInput {
  maxResults?: number;
  nextToken?: string;
  firewallDomainListId: string;
}
export const ListFirewallDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/firewall-domain-lists/{firewallDomainListId}/domains",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFirewallDomainsInput",
}) as any as S.Schema<ListFirewallDomainsInput>;
export type Domains = string[];
export const Domains = /*@__PURE__*/ S.Array(S.String);
export interface ListFirewallDomainsOutput {
  nextToken?: string;
  domains: string[];
}
export const ListFirewallDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), domains: Domains }),
).annotate({
  identifier: "ListFirewallDomainsOutput",
}) as any as S.Schema<ListFirewallDomainsOutput>;
export interface ListFirewallRulesInput {
  maxResults?: number;
  nextToken?: string;
  dnsViewId: string;
  filters?: { [key: string]: string[] | undefined };
}
export const ListFirewallRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    dnsViewId: S.String.pipe(T.HttpQuery("dnsview_id")),
    filters: S.optional(Filters).pipe(T.HttpQueryParams()),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/firewall-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFirewallRulesInput",
}) as any as S.Schema<ListFirewallRulesInput>;
export interface FirewallRulesItem {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const FirewallRulesItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.String,
    name: S.String,
    priority: S.Number,
    dnsViewId: S.String,
    queryType: S.optional(S.String),
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "FirewallRulesItem",
}) as any as S.Schema<FirewallRulesItem>;
export type FirewallRules = FirewallRulesItem[];
export const FirewallRules = /*@__PURE__*/ S.Array(FirewallRulesItem);
export interface ListFirewallRulesOutput {
  nextToken?: string;
  firewallRules: FirewallRulesItem[];
}
export const ListFirewallRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), firewallRules: FirewallRules }),
).annotate({
  identifier: "ListFirewallRulesOutput",
}) as any as S.Schema<ListFirewallRulesOutput>;
export interface ListGlobalResolversInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListGlobalResolversInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/global-resolver" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGlobalResolversInput",
}) as any as S.Schema<ListGlobalResolversInput>;
export interface GlobalResolversItem {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export const GlobalResolversItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    dnsName: S.String,
    observabilityRegion: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    regions: Regions,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CRResourceStatus,
    ipv4Addresses: IPv4Addresses,
    ipv6Addresses: S.optional(IPv6Addresses),
    ipAddressType: S.optional(GlobalResolverIpAddressType),
  }),
).annotate({
  identifier: "GlobalResolversItem",
}) as any as S.Schema<GlobalResolversItem>;
export type GlobalResolvers = GlobalResolversItem[];
export const GlobalResolvers = /*@__PURE__*/ S.Array(GlobalResolversItem);
export interface ListGlobalResolversOutput {
  nextToken?: string;
  globalResolvers: GlobalResolversItem[];
}
export const ListGlobalResolversOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    globalResolvers: GlobalResolvers,
  }),
).annotate({
  identifier: "ListGlobalResolversOutput",
}) as any as S.Schema<ListGlobalResolversOutput>;
export interface ListHostedZoneAssociationsInput {
  maxResults?: number;
  nextToken?: string;
  resourceArn?: string;
}
export const ListHostedZoneAssociationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/hosted-zone-associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHostedZoneAssociationsInput",
}) as any as S.Schema<ListHostedZoneAssociationsInput>;
export interface HostedZoneAssociationSummary {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export const HostedZoneAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    resourceArn: S.String,
    hostedZoneId: S.String,
    hostedZoneName: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: HostedZoneAssociationStatus,
  }),
).annotate({
  identifier: "HostedZoneAssociationSummary",
}) as any as S.Schema<HostedZoneAssociationSummary>;
export type HostedZoneAssociations = HostedZoneAssociationSummary[];
export const HostedZoneAssociations = /*@__PURE__*/ S.Array(
  HostedZoneAssociationSummary,
);
export interface ListHostedZoneAssociationsOutput {
  nextToken?: string;
  hostedZoneAssociations: HostedZoneAssociationSummary[];
}
export const ListHostedZoneAssociationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    hostedZoneAssociations: HostedZoneAssociations,
  }),
).annotate({
  identifier: "ListHostedZoneAssociationsOutput",
}) as any as S.Schema<ListHostedZoneAssociationsOutput>;
export interface ListManagedFirewallDomainListsInput {
  maxResults?: number;
  nextToken?: string;
  managedFirewallDomainListType: string;
}
export const ListManagedFirewallDomainListsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    managedFirewallDomainListType: S.String.pipe(
      T.HttpLabel("managedFirewallDomainListType"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/list-managed-firewall-domain-lists/{managedFirewallDomainListType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedFirewallDomainListsInput",
}) as any as S.Schema<ListManagedFirewallDomainListsInput>;
export interface ManagedFirewallDomainListsItem {
  description?: string;
  id: string;
  name: string;
  managedListType: string;
}
export const ManagedFirewallDomainListsItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    id: S.String,
    name: S.String,
    managedListType: S.String,
  }),
).annotate({
  identifier: "ManagedFirewallDomainListsItem",
}) as any as S.Schema<ManagedFirewallDomainListsItem>;
export type ManagedFirewallDomainLists = ManagedFirewallDomainListsItem[];
export const ManagedFirewallDomainLists = /*@__PURE__*/ S.Array(
  ManagedFirewallDomainListsItem,
);
export interface ListManagedFirewallDomainListsOutput {
  nextToken?: string;
  managedFirewallDomainLists: ManagedFirewallDomainListsItem[];
}
export const ListManagedFirewallDomainListsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      managedFirewallDomainLists: ManagedFirewallDomainLists,
    }),
).annotate({
  identifier: "ListManagedFirewallDomainListsOutput",
}) as any as S.Schema<ListManagedFirewallDomainListsOutput>;
export interface ListSharedDNSViewsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListSharedDNSViewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/shared-dns-views" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSharedDNSViewsInput",
}) as any as S.Schema<ListSharedDNSViewsInput>;
export type AccountId = string;
export interface SharedDNSViewSummary {
  id: string;
  arn: string;
  clientToken: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
  ownerAccountId: string;
}
export const SharedDNSViewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
    ownerAccountId: S.String,
  }),
).annotate({
  identifier: "SharedDNSViewSummary",
}) as any as S.Schema<SharedDNSViewSummary>;
export type SharedDNSViews = SharedDNSViewSummary[];
export const SharedDNSViews = /*@__PURE__*/ S.Array(SharedDNSViewSummary);
export interface ListSharedDNSViewsOutput {
  nextToken?: string;
  dnsViews: SharedDNSViewSummary[];
}
export const ListSharedDNSViewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), dnsViews: SharedDNSViews }),
).annotate({
  identifier: "ListSharedDNSViewsOutput",
}) as any as S.Schema<ListSharedDNSViewsOutput>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-all-tags" }),
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
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: Tags }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tag-resource" }),
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeys }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/untag-resource" }),
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
export interface UpdateAccessSourceInput {
  accessSourceId: string;
  cidr?: string;
  ipAddressType?: IpAddressType;
  name?: string;
  protocol?: DnsProtocol;
}
export const UpdateAccessSourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessSourceId: S.String.pipe(T.HttpLabel("accessSourceId")),
    cidr: S.optional(S.String),
    ipAddressType: S.optional(IpAddressType),
    name: S.optional(S.String),
    protocol: S.optional(DnsProtocol),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/access-sources/{accessSourceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccessSourceInput",
}) as any as S.Schema<UpdateAccessSourceInput>;
export interface UpdateAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const UpdateAccessSourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    cidr: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    id: S.String,
    ipAddressType: IpAddressType,
    name: S.optional(S.String),
    dnsViewId: S.String,
    protocol: DnsProtocol,
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateAccessSourceOutput",
}) as any as S.Schema<UpdateAccessSourceOutput>;
export interface UpdateAccessTokenInput {
  accessTokenId: string;
  name: string;
}
export const UpdateAccessTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessTokenId: S.String.pipe(T.HttpLabel("accessTokenId")),
    name: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/tokens/{accessTokenId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccessTokenInput",
}) as any as S.Schema<UpdateAccessTokenInput>;
export interface UpdateAccessTokenOutput {
  id: string;
  name: string;
}
export const UpdateAccessTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, name: S.String }),
).annotate({
  identifier: "UpdateAccessTokenOutput",
}) as any as S.Schema<UpdateAccessTokenOutput>;
export interface UpdateDNSViewInput {
  dnsViewId: string;
  name?: string;
  description?: string;
  dnssecValidation?: DnsSecValidationType;
  ednsClientSubnet?: EdnsClientSubnetType;
  firewallRulesFailOpen?: FirewallRulesFailOpenType;
}
export const UpdateDNSViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")),
    name: S.optional(S.String),
    description: S.optional(S.String),
    dnssecValidation: S.optional(DnsSecValidationType),
    ednsClientSubnet: S.optional(EdnsClientSubnetType),
    firewallRulesFailOpen: S.optional(FirewallRulesFailOpenType),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/dns-views/{dnsViewId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDNSViewInput",
}) as any as S.Schema<UpdateDNSViewInput>;
export interface UpdateDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export const UpdateDNSViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.optional(S.String),
    dnssecValidation: DnsSecValidationType,
    ednsClientSubnet: EdnsClientSubnetType,
    firewallRulesFailOpen: FirewallRulesFailOpenType,
    name: S.String,
    description: S.optional(S.String),
    globalResolverId: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: ProfileResourceStatus,
  }),
).annotate({
  identifier: "UpdateDNSViewOutput",
}) as any as S.Schema<UpdateDNSViewOutput>;
export interface UpdateFirewallDomainsInput {
  domains: string[];
  firewallDomainListId: string;
  operation: string;
}
export const UpdateFirewallDomainsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domains: Domains,
    firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
    operation: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/firewall-domain-lists/{firewallDomainListId}/domains",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFirewallDomainsInput",
}) as any as S.Schema<UpdateFirewallDomainsInput>;
export interface UpdateFirewallDomainsOutput {
  id: string;
  name: string;
  status: CRResourceStatus;
}
export const UpdateFirewallDomainsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, name: S.String, status: CRResourceStatus }),
).annotate({
  identifier: "UpdateFirewallDomainsOutput",
}) as any as S.Schema<UpdateFirewallDomainsOutput>;
export interface UpdateFirewallRuleInput {
  action?: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken: string;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallRuleId: string;
  name?: string;
  priority?: number;
}
export const UpdateFirewallRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(FirewallRuleAction),
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    clientToken: S.String.pipe(T.IdempotencyToken()),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallRuleId: S.String.pipe(T.HttpLabel("firewallRuleId")),
    name: S.optional(S.String),
    priority: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/firewall-rules/{firewallRuleId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFirewallRuleInput",
}) as any as S.Schema<UpdateFirewallRuleInput>;
export interface UpdateFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export const UpdateFirewallRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: FirewallRuleAction,
    blockOverrideDnsType: S.optional(BlockOverrideDnsQueryType),
    blockOverrideDomain: S.optional(S.String),
    blockOverrideTtl: S.optional(S.Number),
    blockResponse: S.optional(FirewallBlockResponse),
    confidenceThreshold: S.optional(ConfidenceThreshold),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(S.String),
    dnsAdvancedProtection: S.optional(DnsAdvancedProtection),
    firewallDomainListId: S.optional(S.String),
    id: S.String,
    name: S.String,
    priority: S.Number,
    dnsViewId: S.String,
    queryType: S.optional(S.String),
    status: CRResourceStatus,
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdateFirewallRuleOutput",
}) as any as S.Schema<UpdateFirewallRuleOutput>;
export interface UpdateGlobalResolverInput {
  globalResolverId: string;
  name?: string;
  observabilityRegion?: string;
  description?: string;
  ipAddressType?: GlobalResolverIpAddressType;
  regions?: string[];
}
export const UpdateGlobalResolverInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
    name: S.optional(S.String),
    observabilityRegion: S.optional(S.String),
    description: S.optional(S.String),
    ipAddressType: S.optional(GlobalResolverIpAddressType),
    regions: S.optional(Regions),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/global-resolver/{globalResolverId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlobalResolverInput",
}) as any as S.Schema<UpdateGlobalResolverInput>;
export interface UpdateGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export const UpdateGlobalResolverOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    clientToken: S.String,
    dnsName: S.String,
    observabilityRegion: S.optional(S.String),
    name: S.String,
    description: S.optional(S.String),
    regions: Regions,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: CRResourceStatus,
    ipv4Addresses: IPv4Addresses,
    ipv6Addresses: S.optional(IPv6Addresses),
    ipAddressType: S.optional(GlobalResolverIpAddressType),
  }),
).annotate({
  identifier: "UpdateGlobalResolverOutput",
}) as any as S.Schema<UpdateGlobalResolverOutput>;
export interface UpdateHostedZoneAssociationInput {
  hostedZoneAssociationId: string;
  name?: string;
}
export const UpdateHostedZoneAssociationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hostedZoneAssociationId: S.String.pipe(
      T.HttpLabel("hostedZoneAssociationId"),
    ),
    name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/hosted-zone-associations/{hostedZoneAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateHostedZoneAssociationInput",
}) as any as S.Schema<UpdateHostedZoneAssociationInput>;
export interface UpdateHostedZoneAssociationOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export const UpdateHostedZoneAssociationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    resourceArn: S.String,
    hostedZoneId: S.String,
    hostedZoneName: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    status: HostedZoneAssociationStatus,
  }),
).annotate({
  identifier: "UpdateHostedZoneAssociationOutput",
}) as any as S.Schema<UpdateHostedZoneAssociationOutput>;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

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
export type AssociateHostedZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a Route 53 private hosted zone with a Route 53 Global Resolver resource. This allows the resolver to resolve DNS queries for the private hosted zone from anywhere globally.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const associateHostedZone: API.OperationMethod<
  AssociateHostedZoneInput,
  AssociateHostedZoneOutput,
  AssociateHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateHostedZoneInput,
  output: AssociateHostedZoneOutput,
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
  operationName: "AssociateHostedZone",
}));

export type BatchCreateFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates multiple DNS firewall rules in a single operation. This is more efficient than creating rules individually when you need to set up multiple rules at once.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const batchCreateFirewallRule: API.OperationMethod<
  BatchCreateFirewallRuleInput,
  BatchCreateFirewallRuleOutput,
  BatchCreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateFirewallRuleInput,
  output: BatchCreateFirewallRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateFirewallRule",
}));

export type BatchDeleteFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple DNS firewall rules in a single operation. This is more efficient than deleting rules individually.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const batchDeleteFirewallRule: API.OperationMethod<
  BatchDeleteFirewallRuleInput,
  BatchDeleteFirewallRuleOutput,
  BatchDeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteFirewallRuleInput,
  output: BatchDeleteFirewallRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteFirewallRule",
}));

export type BatchUpdateFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple DNS firewall rules in a single operation. This is more efficient than updating rules individually.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const batchUpdateFirewallRule: API.OperationMethod<
  BatchUpdateFirewallRuleInput,
  BatchUpdateFirewallRuleOutput,
  BatchUpdateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateFirewallRuleInput,
  output: BatchUpdateFirewallRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFirewallRule",
}));

export type CreateAccessSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access source for a DNS view. Access sources define IP addresses or CIDR ranges that are allowed to send DNS queries to the Route 53 Global Resolver, along with the permitted DNS protocols.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createAccessSource: API.OperationMethod<
  CreateAccessSourceInput,
  CreateAccessSourceOutput,
  CreateAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessSourceInput,
  output: CreateAccessSourceOutput,
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
  operationName: "CreateAccessSource",
}));

export type CreateAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access token for a DNS view. Access tokens provide token-based authentication for DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) connections to the Route 53 Global Resolver.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createAccessToken: API.OperationMethod<
  CreateAccessTokenInput,
  CreateAccessTokenOutput,
  CreateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccessTokenInput,
  output: CreateAccessTokenOutput,
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
  operationName: "CreateAccessToken",
}));

export type CreateDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a DNS view within a Route 53 Global Resolver. A DNS view models end users, user groups, networks, and devices, and serves as a parent resource that holds configurations controlling access, authorization, DNS firewall rules, and forwarding rules.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createDNSView: API.OperationMethod<
  CreateDNSViewInput,
  CreateDNSViewOutput,
  CreateDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDNSViewInput,
  output: CreateDNSViewOutput,
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
  operationName: "CreateDNSView",
}));

export type CreateFirewallDomainListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a firewall domain list. Domain lists are reusable sets of domain specifications that you use in DNS firewall rules to allow, block, or alert on DNS queries to specific domains.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createFirewallDomainList: API.OperationMethod<
  CreateFirewallDomainListInput,
  CreateFirewallDomainListOutput,
  CreateFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFirewallDomainListInput,
  output: CreateFirewallDomainListOutput,
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
  operationName: "CreateFirewallDomainList",
}));

export type CreateFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a DNS firewall rule. Firewall rules define actions (ALLOW, BLOCK, or ALERT) to take on DNS queries that match specified domain lists, managed domain lists, or advanced threat protections.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createFirewallRule: API.OperationMethod<
  CreateFirewallRuleInput,
  CreateFirewallRuleOutput,
  CreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFirewallRuleInput,
  output: CreateFirewallRuleOutput,
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
  operationName: "CreateFirewallRule",
}));

export type CreateGlobalResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Route 53 Global Resolver instance. A Route 53 Global Resolver is a global, internet-accessible DNS resolver that provides secure DNS resolution for both public and private domains through global anycast IP addresses.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createGlobalResolver: API.OperationMethod<
  CreateGlobalResolverInput,
  CreateGlobalResolverOutput,
  CreateGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlobalResolverInput,
  output: CreateGlobalResolverOutput,
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
  operationName: "CreateGlobalResolver",
}));

export type DeleteAccessSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access source. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteAccessSource: API.OperationMethod<
  DeleteAccessSourceInput,
  DeleteAccessSourceOutput,
  DeleteAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessSourceInput,
  output: DeleteAccessSourceOutput,
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
  operationName: "DeleteAccessSource",
}));

export type DeleteAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access token. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteAccessToken: API.OperationMethod<
  DeleteAccessTokenInput,
  DeleteAccessTokenOutput,
  DeleteAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccessTokenInput,
  output: DeleteAccessTokenOutput,
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
  operationName: "DeleteAccessToken",
}));

export type DeleteDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a DNS view. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteDNSView: API.OperationMethod<
  DeleteDNSViewInput,
  DeleteDNSViewOutput,
  DeleteDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDNSViewInput,
  output: DeleteDNSViewOutput,
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
  operationName: "DeleteDNSView",
}));

export type DeleteFirewallDomainListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a firewall domain list. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteFirewallDomainList: API.OperationMethod<
  DeleteFirewallDomainListInput,
  DeleteFirewallDomainListOutput,
  DeleteFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFirewallDomainListInput,
  output: DeleteFirewallDomainListOutput,
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
  operationName: "DeleteFirewallDomainList",
}));

export type DeleteFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a DNS firewall rule. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteFirewallRule: API.OperationMethod<
  DeleteFirewallRuleInput,
  DeleteFirewallRuleOutput,
  DeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFirewallRuleInput,
  output: DeleteFirewallRuleOutput,
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
  operationName: "DeleteFirewallRule",
}));

export type DeleteGlobalResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Route 53 Global Resolver instance. This operation cannot be undone. All associated DNS views, access sources, tokens, and firewall rules are also deleted.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteGlobalResolver: API.OperationMethod<
  DeleteGlobalResolverInput,
  DeleteGlobalResolverOutput,
  DeleteGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlobalResolverInput,
  output: DeleteGlobalResolverOutput,
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
  operationName: "DeleteGlobalResolver",
}));

export type DisableDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables a DNS view, preventing it from serving DNS queries.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const disableDNSView: API.OperationMethod<
  DisableDNSViewInput,
  DisableDNSViewOutput,
  DisableDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableDNSViewInput,
  output: DisableDNSViewOutput,
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
  operationName: "DisableDNSView",
}));

export type DisassociateHostedZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a Route 53 private hosted zone from a Route 53 Global Resolver resource.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const disassociateHostedZone: API.OperationMethod<
  DisassociateHostedZoneInput,
  DisassociateHostedZoneOutput,
  DisassociateHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateHostedZoneInput,
  output: DisassociateHostedZoneOutput,
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
  operationName: "DisassociateHostedZone",
}));

export type EnableDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables a disabled DNS view, allowing it to serve DNS queries again.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const enableDNSView: API.OperationMethod<
  EnableDNSViewInput,
  EnableDNSViewOutput,
  EnableDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableDNSViewInput,
  output: EnableDNSViewOutput,
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
  operationName: "EnableDNSView",
}));

export type GetAccessSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an access source.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getAccessSource: API.OperationMethod<
  GetAccessSourceInput,
  GetAccessSourceOutput,
  GetAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessSourceInput,
  output: GetAccessSourceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessSource",
}));

export type GetAccessTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an access token.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getAccessToken: API.OperationMethod<
  GetAccessTokenInput,
  GetAccessTokenOutput,
  GetAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessTokenInput,
  output: GetAccessTokenOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessToken",
}));

export type GetDNSViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a DNS view.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getDNSView: API.OperationMethod<
  GetDNSViewInput,
  GetDNSViewOutput,
  GetDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDNSViewInput,
  output: GetDNSViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDNSView",
}));

export type GetFirewallDomainListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a firewall domain list.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getFirewallDomainList: API.OperationMethod<
  GetFirewallDomainListInput,
  GetFirewallDomainListOutput,
  GetFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFirewallDomainListInput,
  output: GetFirewallDomainListOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallDomainList",
}));

export type GetFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a DNS firewall rule.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getFirewallRule: API.OperationMethod<
  GetFirewallRuleInput,
  GetFirewallRuleOutput,
  GetFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFirewallRuleInput,
  output: GetFirewallRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallRule",
}));

export type GetGlobalResolverError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a Route 53 Global Resolver instance.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getGlobalResolver: API.OperationMethod<
  GetGlobalResolverInput,
  GetGlobalResolverOutput,
  GetGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlobalResolverInput,
  output: GetGlobalResolverOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlobalResolver",
}));

export type GetHostedZoneAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a hosted zone association.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getHostedZoneAssociation: API.OperationMethod<
  GetHostedZoneAssociationInput,
  GetHostedZoneAssociationOutput,
  GetHostedZoneAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHostedZoneAssociationInput,
  output: GetHostedZoneAssociationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedZoneAssociation",
}));

export type GetManagedFirewallDomainListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an Amazon Web Services-managed firewall domain list. Managed domain lists contain domains associated with malicious activity, content categories, or specific threats.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getManagedFirewallDomainList: API.OperationMethod<
  GetManagedFirewallDomainListInput,
  GetManagedFirewallDomainListOutput,
  GetManagedFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedFirewallDomainListInput,
  output: GetManagedFirewallDomainListOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedFirewallDomainList",
}));

export type ImportFirewallDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a list of domains from an Amazon S3 file into a firewall domain list. The file should contain one domain per line.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const importFirewallDomains: API.OperationMethod<
  ImportFirewallDomainsInput,
  ImportFirewallDomainsOutput,
  ImportFirewallDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportFirewallDomainsInput,
  output: ImportFirewallDomainsOutput,
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
  operationName: "ImportFirewallDomains",
}));

export type ListAccessSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all access sources with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listAccessSources: API.PaginatedOperationMethod<
  ListAccessSourcesInput,
  ListAccessSourcesOutput,
  ListAccessSourcesError,
  Credentials | HttpClient.HttpClient,
  AccessSourcesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessSourcesInput,
  output: ListAccessSourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccessTokensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all access tokens for a DNS view with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listAccessTokens: API.PaginatedOperationMethod<
  ListAccessTokensInput,
  ListAccessTokensOutput,
  ListAccessTokensError,
  Credentials | HttpClient.HttpClient,
  AccessTokenItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccessTokensInput,
  output: ListAccessTokensOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessTokens",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDNSViewsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all DNS views for a Route 53 Global Resolver with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listDNSViews: API.PaginatedOperationMethod<
  ListDNSViewsInput,
  ListDNSViewsOutput,
  ListDNSViewsError,
  Credentials | HttpClient.HttpClient,
  DNSViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDNSViewsInput,
  output: ListDNSViewsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDNSViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dnsViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFirewallDomainListsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all firewall domain lists for a Route 53 Global Resolver with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listFirewallDomainLists: API.PaginatedOperationMethod<
  ListFirewallDomainListsInput,
  ListFirewallDomainListsOutput,
  ListFirewallDomainListsError,
  Credentials | HttpClient.HttpClient,
  FirewallDomainListsItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallDomainListsInput,
  output: ListFirewallDomainListsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallDomainLists",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "firewallDomainLists",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFirewallDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the domains in DNS Firewall domain list you have created.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listFirewallDomains: API.PaginatedOperationMethod<
  ListFirewallDomainsInput,
  ListFirewallDomainsOutput,
  ListFirewallDomainsError,
  Credentials | HttpClient.HttpClient,
  Domain
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallDomainsInput,
  output: ListFirewallDomainsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domains",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFirewallRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all DNS firewall rules for a DNS view with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listFirewallRules: API.PaginatedOperationMethod<
  ListFirewallRulesInput,
  ListFirewallRulesOutput,
  ListFirewallRulesError,
  Credentials | HttpClient.HttpClient,
  FirewallRulesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallRulesInput,
  output: ListFirewallRulesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "firewallRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGlobalResolversError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Route 53 Global Resolver instances in your account with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listGlobalResolvers: API.PaginatedOperationMethod<
  ListGlobalResolversInput,
  ListGlobalResolversOutput,
  ListGlobalResolversError,
  Credentials | HttpClient.HttpClient,
  GlobalResolversItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGlobalResolversInput,
  output: ListGlobalResolversOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlobalResolvers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "globalResolvers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHostedZoneAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists hosted zone associations with pagination support. Specify a DNS view through the `resourceArn` parameter to list the hosted zone associations for that DNS view, or omit it to list all hosted zone associations in your Amazon Web Services account.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listHostedZoneAssociations: API.PaginatedOperationMethod<
  ListHostedZoneAssociationsInput,
  ListHostedZoneAssociationsOutput,
  ListHostedZoneAssociationsError,
  Credentials | HttpClient.HttpClient,
  HostedZoneAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHostedZoneAssociationsInput,
  output: ListHostedZoneAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedZoneAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "hostedZoneAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedFirewallDomainListsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of the Amazon Web Services Managed DNS Lists and the categories for DNS Firewall. The categories are either `THREAT` or `CONTENT`.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listManagedFirewallDomainLists: API.PaginatedOperationMethod<
  ListManagedFirewallDomainListsInput,
  ListManagedFirewallDomainListsOutput,
  ListManagedFirewallDomainListsError,
  Credentials | HttpClient.HttpClient,
  ManagedFirewallDomainListsItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedFirewallDomainListsInput,
  output: ListManagedFirewallDomainListsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedFirewallDomainLists",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedFirewallDomainLists",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSharedDNSViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the DNS views that have been shared with your Amazon Web Services account through Amazon Web Services Resource Access Manager (Amazon Web Services RAM), with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listSharedDNSViews: API.PaginatedOperationMethod<
  ListSharedDNSViewsInput,
  ListSharedDNSViewsOutput,
  ListSharedDNSViewsError,
  Credentials | HttpClient.HttpClient,
  SharedDNSViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSharedDNSViewsInput,
  output: ListSharedDNSViewsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSharedDNSViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dnsViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags associated with a Route 53 Global Resolver resource.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a Route 53 Global Resolver resource. Tags are key-value pairs that help you organize and identify your resources.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
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
    ServiceQuotaExceededException,
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
 * Removes tags from a Route 53 Global Resolver resource.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
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

export type UpdateAccessSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an access source.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateAccessSource: API.OperationMethod<
  UpdateAccessSourceInput,
  UpdateAccessSourceOutput,
  UpdateAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccessSourceInput,
  output: UpdateAccessSourceOutput,
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
  operationName: "UpdateAccessSource",
}));

export type UpdateAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an access token.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateAccessToken: API.OperationMethod<
  UpdateAccessTokenInput,
  UpdateAccessTokenOutput,
  UpdateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccessTokenInput,
  output: UpdateAccessTokenOutput,
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
  operationName: "UpdateAccessToken",
}));

export type UpdateDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a DNS view.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateDNSView: API.OperationMethod<
  UpdateDNSViewInput,
  UpdateDNSViewOutput,
  UpdateDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDNSViewInput,
  output: UpdateDNSViewOutput,
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
  operationName: "UpdateDNSView",
}));

export type UpdateFirewallDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a DNS Firewall domain list from an array of specified domains.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateFirewallDomains: API.OperationMethod<
  UpdateFirewallDomainsInput,
  UpdateFirewallDomainsOutput,
  UpdateFirewallDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallDomainsInput,
  output: UpdateFirewallDomainsOutput,
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
  operationName: "UpdateFirewallDomains",
}));

export type UpdateFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a DNS firewall rule.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateFirewallRule: API.OperationMethod<
  UpdateFirewallRuleInput,
  UpdateFirewallRuleOutput,
  UpdateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFirewallRuleInput,
  output: UpdateFirewallRuleOutput,
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
  operationName: "UpdateFirewallRule",
}));

export type UpdateGlobalResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a Route 53 Global Resolver instance. You can modify the name, description, and observability Region.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateGlobalResolver: API.OperationMethod<
  UpdateGlobalResolverInput,
  UpdateGlobalResolverOutput,
  UpdateGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlobalResolverInput,
  output: UpdateGlobalResolverOutput,
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
  operationName: "UpdateGlobalResolver",
}));

export type UpdateHostedZoneAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a hosted zone association.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateHostedZoneAssociation: API.OperationMethod<
  UpdateHostedZoneAssociationInput,
  UpdateHostedZoneAssociationOutput,
  UpdateHostedZoneAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHostedZoneAssociationInput,
  output: UpdateHostedZoneAssociationOutput,
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
  operationName: "UpdateHostedZoneAssociation",
}));
