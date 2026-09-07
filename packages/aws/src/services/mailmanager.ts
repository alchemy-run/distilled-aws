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
  sdkId: "MailManager",
  serviceShapeName: "MailManagerSvc",
});
const auth = T.AwsAuthSigv4({ name: "ses" });
const ver = T.ServiceVersion("2023-10-17");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://mail-manager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mail-manager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mail-manager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mail-manager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
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
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type IdempotencyToken = string;
export type AddonSubscriptionId = string;
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
export interface CreateAddonInstanceRequest {
  ClientToken?: string;
  AddonSubscriptionId: string;
  Tags?: Tag[];
}
export const CreateAddonInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    AddonSubscriptionId: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAddonInstanceRequest",
}) as any as S.Schema<CreateAddonInstanceRequest>;
export type AddonInstanceId = string;
export interface CreateAddonInstanceResponse {
  AddonInstanceId: string;
}
export const CreateAddonInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddonInstanceId: S.String }),
).annotate({
  identifier: "CreateAddonInstanceResponse",
}) as any as S.Schema<CreateAddonInstanceResponse>;
export type AddonName = string;
export interface CreateAddonSubscriptionRequest {
  ClientToken?: string;
  AddonName: string;
  Tags?: Tag[];
}
export const CreateAddonSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    AddonName: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAddonSubscriptionRequest",
}) as any as S.Schema<CreateAddonSubscriptionRequest>;
export interface CreateAddonSubscriptionResponse {
  AddonSubscriptionId: string;
}
export const CreateAddonSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddonSubscriptionId: S.String }),
).annotate({
  identifier: "CreateAddonSubscriptionResponse",
}) as any as S.Schema<CreateAddonSubscriptionResponse>;
export type AddressListName = string;
export interface CreateAddressListRequest {
  ClientToken?: string;
  AddressListName: string;
  Tags?: Tag[];
}
export const CreateAddressListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    AddressListName: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAddressListRequest",
}) as any as S.Schema<CreateAddressListRequest>;
export type AddressListId = string;
export interface CreateAddressListResponse {
  AddressListId: string;
}
export const CreateAddressListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressListId: S.String }),
).annotate({
  identifier: "CreateAddressListResponse",
}) as any as S.Schema<CreateAddressListResponse>;
export type JobName = string;
export type ImportDataType = "CSV" | "JSON" | (string & {});
export const ImportDataType = /*@__PURE__*/ S.String;

export interface ImportDataFormat {
  ImportDataType: ImportDataType;
}
export const ImportDataFormat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportDataType: ImportDataType }),
).annotate({
  identifier: "ImportDataFormat",
}) as any as S.Schema<ImportDataFormat>;
export interface CreateAddressListImportJobRequest {
  ClientToken?: string;
  AddressListId: string;
  Name: string;
  ImportDataFormat: ImportDataFormat;
}
export const CreateAddressListImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    AddressListId: S.String,
    Name: S.String,
    ImportDataFormat: ImportDataFormat,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAddressListImportJobRequest",
}) as any as S.Schema<CreateAddressListImportJobRequest>;
export type JobId = string;
export type PreSignedUrl = string | redacted.Redacted<string>;
export interface CreateAddressListImportJobResponse {
  JobId: string;
  PreSignedUrl: string | redacted.Redacted<string>;
}
export const CreateAddressListImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String, PreSignedUrl: SensitiveString }),
).annotate({
  identifier: "CreateAddressListImportJobResponse",
}) as any as S.Schema<CreateAddressListImportJobResponse>;
export type ArchiveNameString = string;
export type RetentionPeriod =
  | "THREE_MONTHS"
  | "SIX_MONTHS"
  | "NINE_MONTHS"
  | "ONE_YEAR"
  | "EIGHTEEN_MONTHS"
  | "TWO_YEARS"
  | "THIRTY_MONTHS"
  | "THREE_YEARS"
  | "FOUR_YEARS"
  | "FIVE_YEARS"
  | "SIX_YEARS"
  | "SEVEN_YEARS"
  | "EIGHT_YEARS"
  | "NINE_YEARS"
  | "TEN_YEARS"
  | "PERMANENT"
  | (string & {});
export const RetentionPeriod = /*@__PURE__*/ S.String;

export type ArchiveRetention = { RetentionPeriod: RetentionPeriod };
export const ArchiveRetention = /*@__PURE__*/ S.Union([
  S.Struct({ RetentionPeriod: RetentionPeriod }),
]);
export type KmsKeyArn = string;
export interface CreateArchiveRequest {
  ClientToken?: string;
  ArchiveName: string;
  Retention?: ArchiveRetention;
  KmsKeyArn?: string;
  Tags?: Tag[];
}
export const CreateArchiveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ArchiveName: S.String,
    Retention: S.optional(ArchiveRetention),
    KmsKeyArn: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateArchiveRequest",
}) as any as S.Schema<CreateArchiveRequest>;
export type ArchiveIdString = string;
export interface CreateArchiveResponse {
  ArchiveId: string;
}
export const CreateArchiveResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchiveId: S.String }),
).annotate({
  identifier: "CreateArchiveResponse",
}) as any as S.Schema<CreateArchiveResponse>;
export type IngressPointName = string;
export type IngressPointType = "OPEN" | "AUTH" | "MTLS" | (string & {});
export const IngressPointType = /*@__PURE__*/ S.String;

export type RuleSetId = string;
export type TrafficPolicyId = string;
export type SmtpPassword = string | redacted.Redacted<string>;
export type SecretArn = string;
export type CAContent = string | redacted.Redacted<string>;
export type CrlContent = string | redacted.Redacted<string>;
export interface TrustStore {
  CAContent: string | redacted.Redacted<string>;
  CrlContent?: string | redacted.Redacted<string>;
  KmsKeyArn?: string;
}
export const TrustStore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CAContent: SensitiveString,
    CrlContent: S.optional(SensitiveString),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "TrustStore" }) as any as S.Schema<TrustStore>;
export interface TlsAuthConfiguration {
  TrustStore?: TrustStore;
}
export const TlsAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrustStore: S.optional(TrustStore) }),
).annotate({
  identifier: "TlsAuthConfiguration",
}) as any as S.Schema<TlsAuthConfiguration>;
export type IngressPointConfiguration =
  | {
      SmtpPassword: string | redacted.Redacted<string>;
      SecretArn?: never;
      TlsAuthConfiguration?: never;
    }
  | { SmtpPassword?: never; SecretArn: string; TlsAuthConfiguration?: never }
  | {
      SmtpPassword?: never;
      SecretArn?: never;
      TlsAuthConfiguration: TlsAuthConfiguration;
    };
export const IngressPointConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ SmtpPassword: SensitiveString }),
  S.Struct({ SecretArn: S.String }),
  S.Struct({ TlsAuthConfiguration: TlsAuthConfiguration }),
]);
export type IpType = "IPV4" | "DUAL_STACK" | (string & {});
export const IpType = /*@__PURE__*/ S.String;

export interface PublicNetworkConfiguration {
  IpType: IpType;
}
export const PublicNetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IpType: IpType }),
).annotate({
  identifier: "PublicNetworkConfiguration",
}) as any as S.Schema<PublicNetworkConfiguration>;
export type VpcEndpointId = string;
export interface PrivateNetworkConfiguration {
  VpcEndpointId: string;
}
export const PrivateNetworkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VpcEndpointId: S.String }),
).annotate({
  identifier: "PrivateNetworkConfiguration",
}) as any as S.Schema<PrivateNetworkConfiguration>;
export type NetworkConfiguration =
  | {
      PublicNetworkConfiguration: PublicNetworkConfiguration;
      PrivateNetworkConfiguration?: never;
    }
  | {
      PublicNetworkConfiguration?: never;
      PrivateNetworkConfiguration: PrivateNetworkConfiguration;
    };
export const NetworkConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ PublicNetworkConfiguration: PublicNetworkConfiguration }),
  S.Struct({ PrivateNetworkConfiguration: PrivateNetworkConfiguration }),
]);
export type TlsPolicy = "REQUIRED" | "OPTIONAL" | "FIPS" | (string & {});
export const TlsPolicy = /*@__PURE__*/ S.String;

export interface CreateIngressPointRequest {
  ClientToken?: string;
  IngressPointName: string;
  Type: IngressPointType;
  RuleSetId: string;
  TrafficPolicyId: string;
  IngressPointConfiguration?: IngressPointConfiguration;
  NetworkConfiguration?: NetworkConfiguration;
  TlsPolicy?: TlsPolicy;
  Tags?: Tag[];
}
export const CreateIngressPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    IngressPointName: S.String,
    Type: IngressPointType,
    RuleSetId: S.String,
    TrafficPolicyId: S.String,
    IngressPointConfiguration: S.optional(IngressPointConfiguration),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    TlsPolicy: S.optional(TlsPolicy),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateIngressPointRequest",
}) as any as S.Schema<CreateIngressPointRequest>;
export type IngressPointId = string;
export interface CreateIngressPointResponse {
  IngressPointId: string;
}
export const CreateIngressPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IngressPointId: S.String }),
).annotate({
  identifier: "CreateIngressPointResponse",
}) as any as S.Schema<CreateIngressPointResponse>;
export type RelayName = string;
export type RelayServerName = string;
export type RelayServerPort = number;
export interface NoAuthentication {}
export const NoAuthentication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "NoAuthentication",
}) as any as S.Schema<NoAuthentication>;
export type RelayAuthentication =
  | { SecretArn: string; NoAuthentication?: never }
  | { SecretArn?: never; NoAuthentication: NoAuthentication };
export const RelayAuthentication = /*@__PURE__*/ S.Union([
  S.Struct({ SecretArn: S.String }),
  S.Struct({ NoAuthentication: NoAuthentication }),
]);
export interface CreateRelayRequest {
  ClientToken?: string;
  RelayName: string;
  ServerName: string;
  ServerPort: number;
  Authentication: RelayAuthentication;
  Tags?: Tag[];
}
export const CreateRelayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    RelayName: S.String,
    ServerName: S.String,
    ServerPort: S.Number,
    Authentication: RelayAuthentication,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRelayRequest",
}) as any as S.Schema<CreateRelayRequest>;
export type RelayId = string;
export interface CreateRelayResponse {
  RelayId: string;
}
export const CreateRelayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RelayId: S.String }),
).annotate({
  identifier: "CreateRelayResponse",
}) as any as S.Schema<CreateRelayResponse>;
export type RuleSetName = string;
export type RuleName = string;
export type RuleBooleanEmailAttribute =
  | "READ_RECEIPT_REQUESTED"
  | "TLS"
  | "TLS_WRAPPED"
  | (string & {});
export const RuleBooleanEmailAttribute = /*@__PURE__*/ S.String;

export type AnalyzerArn = string;
export type ResultField = string;
export interface Analysis {
  Analyzer: string;
  ResultField: string;
}
export const Analysis = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Analyzer: S.String, ResultField: S.String }),
).annotate({ identifier: "Analysis" }) as any as S.Schema<Analysis>;
export type RuleAddressListEmailAttribute =
  | "RECIPIENT"
  | "MAIL_FROM"
  | "SENDER"
  | "FROM"
  | "TO"
  | "CC"
  | (string & {});
export const RuleAddressListEmailAttribute = /*@__PURE__*/ S.String;

export type AddressListArn = string;
export type RuleAddressListArnList = string[];
export const RuleAddressListArnList = /*@__PURE__*/ S.Array(S.String);
export interface RuleIsInAddressList {
  Attribute: RuleAddressListEmailAttribute;
  AddressLists: string[];
}
export const RuleIsInAddressList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: RuleAddressListEmailAttribute,
    AddressLists: RuleAddressListArnList,
  }),
).annotate({
  identifier: "RuleIsInAddressList",
}) as any as S.Schema<RuleIsInAddressList>;
export type RuleBooleanToEvaluate =
  | {
      Attribute: RuleBooleanEmailAttribute;
      Analysis?: never;
      IsInAddressList?: never;
    }
  | { Attribute?: never; Analysis: Analysis; IsInAddressList?: never }
  | {
      Attribute?: never;
      Analysis?: never;
      IsInAddressList: RuleIsInAddressList;
    };
export const RuleBooleanToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: RuleBooleanEmailAttribute }),
  S.Struct({ Analysis: Analysis }),
  S.Struct({ IsInAddressList: RuleIsInAddressList }),
]);
export type RuleBooleanOperator = "IS_TRUE" | "IS_FALSE" | (string & {});
export const RuleBooleanOperator = /*@__PURE__*/ S.String;

export interface RuleBooleanExpression {
  Evaluate: RuleBooleanToEvaluate;
  Operator: RuleBooleanOperator;
}
export const RuleBooleanExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Evaluate: RuleBooleanToEvaluate, Operator: RuleBooleanOperator }),
).annotate({
  identifier: "RuleBooleanExpression",
}) as any as S.Schema<RuleBooleanExpression>;
export type RuleStringEmailAttribute =
  | "MAIL_FROM"
  | "HELO"
  | "RECIPIENT"
  | "SENDER"
  | "FROM"
  | "SUBJECT"
  | "TO"
  | "CC"
  | (string & {});
export const RuleStringEmailAttribute = /*@__PURE__*/ S.String;

export type MimeHeaderAttribute = string;
export type RuleClientCertificateAttribute =
  | "CN"
  | "SAN_RFC822_NAME"
  | "SAN_DNS_NAME"
  | "SAN_DIRECTORY_NAME"
  | "SAN_UNIFORM_RESOURCE_IDENTIFIER"
  | "SAN_IP_ADDRESS"
  | "SAN_REGISTERED_ID"
  | "SERIAL_NUMBER"
  | (string & {});
export const RuleClientCertificateAttribute = /*@__PURE__*/ S.String;

export type RuleStringToEvaluate =
  | {
      Attribute: RuleStringEmailAttribute;
      MimeHeaderAttribute?: never;
      Analysis?: never;
      ClientCertificateAttribute?: never;
    }
  | {
      Attribute?: never;
      MimeHeaderAttribute: string;
      Analysis?: never;
      ClientCertificateAttribute?: never;
    }
  | {
      Attribute?: never;
      MimeHeaderAttribute?: never;
      Analysis: Analysis;
      ClientCertificateAttribute?: never;
    }
  | {
      Attribute?: never;
      MimeHeaderAttribute?: never;
      Analysis?: never;
      ClientCertificateAttribute: RuleClientCertificateAttribute;
    };
export const RuleStringToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: RuleStringEmailAttribute }),
  S.Struct({ MimeHeaderAttribute: S.String }),
  S.Struct({ Analysis: Analysis }),
  S.Struct({ ClientCertificateAttribute: RuleClientCertificateAttribute }),
]);
export type RuleStringOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | (string & {});
export const RuleStringOperator = /*@__PURE__*/ S.String;

export type RuleStringValue = string | redacted.Redacted<string>;
export type RuleStringList = (string | redacted.Redacted<string>)[];
export const RuleStringList = /*@__PURE__*/ S.Array(SensitiveString);
export interface RuleStringExpression {
  Evaluate: RuleStringToEvaluate;
  Operator: RuleStringOperator;
  Values: (string | redacted.Redacted<string>)[];
}
export const RuleStringExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: RuleStringToEvaluate,
    Operator: RuleStringOperator,
    Values: RuleStringList,
  }),
).annotate({
  identifier: "RuleStringExpression",
}) as any as S.Schema<RuleStringExpression>;
export type RuleNumberEmailAttribute = "MESSAGE_SIZE" | (string & {});
export const RuleNumberEmailAttribute = /*@__PURE__*/ S.String;

export type RuleNumberToEvaluate = { Attribute: RuleNumberEmailAttribute };
export const RuleNumberToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: RuleNumberEmailAttribute }),
]);
export type RuleNumberOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "LESS_THAN"
  | "GREATER_THAN"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN_OR_EQUAL"
  | (string & {});
export const RuleNumberOperator = /*@__PURE__*/ S.String;

export interface RuleNumberExpression {
  Evaluate: RuleNumberToEvaluate;
  Operator: RuleNumberOperator;
  Value: number;
}
export const RuleNumberExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: RuleNumberToEvaluate,
    Operator: RuleNumberOperator,
    Value: S.Number,
  }),
).annotate({
  identifier: "RuleNumberExpression",
}) as any as S.Schema<RuleNumberExpression>;
export type RuleIpEmailAttribute = "SOURCE_IP" | (string & {});
export const RuleIpEmailAttribute = /*@__PURE__*/ S.String;

export type RuleIpToEvaluate = { Attribute: RuleIpEmailAttribute };
export const RuleIpToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: RuleIpEmailAttribute }),
]);
export type RuleIpOperator =
  | "CIDR_MATCHES"
  | "NOT_CIDR_MATCHES"
  | (string & {});
export const RuleIpOperator = /*@__PURE__*/ S.String;

export type RuleIpStringValue = string;
export type RuleIpValueList = string[];
export const RuleIpValueList = /*@__PURE__*/ S.Array(S.String);
export interface RuleIpExpression {
  Evaluate: RuleIpToEvaluate;
  Operator: RuleIpOperator;
  Values: string[];
}
export const RuleIpExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: RuleIpToEvaluate,
    Operator: RuleIpOperator,
    Values: RuleIpValueList,
  }),
).annotate({
  identifier: "RuleIpExpression",
}) as any as S.Schema<RuleIpExpression>;
export type RuleVerdictAttribute = "SPF" | "DKIM" | (string & {});
export const RuleVerdictAttribute = /*@__PURE__*/ S.String;

export type RuleVerdictToEvaluate =
  | { Attribute: RuleVerdictAttribute; Analysis?: never }
  | { Attribute?: never; Analysis: Analysis };
export const RuleVerdictToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: RuleVerdictAttribute }),
  S.Struct({ Analysis: Analysis }),
]);
export type RuleVerdictOperator = "EQUALS" | "NOT_EQUALS" | (string & {});
export const RuleVerdictOperator = /*@__PURE__*/ S.String;

export type RuleVerdict =
  | "PASS"
  | "FAIL"
  | "GRAY"
  | "PROCESSING_FAILED"
  | (string & {});
export const RuleVerdict = /*@__PURE__*/ S.String;

export type RuleVerdictValueList = RuleVerdict[];
export const RuleVerdictValueList = /*@__PURE__*/ S.Array(RuleVerdict);
export interface RuleVerdictExpression {
  Evaluate: RuleVerdictToEvaluate;
  Operator: RuleVerdictOperator;
  Values: RuleVerdict[];
}
export const RuleVerdictExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: RuleVerdictToEvaluate,
    Operator: RuleVerdictOperator,
    Values: RuleVerdictValueList,
  }),
).annotate({
  identifier: "RuleVerdictExpression",
}) as any as S.Schema<RuleVerdictExpression>;
export type RuleDmarcOperator = "EQUALS" | "NOT_EQUALS" | (string & {});
export const RuleDmarcOperator = /*@__PURE__*/ S.String;

export type RuleDmarcPolicy = "NONE" | "QUARANTINE" | "REJECT" | (string & {});
export const RuleDmarcPolicy = /*@__PURE__*/ S.String;

export type RuleDmarcValueList = RuleDmarcPolicy[];
export const RuleDmarcValueList = /*@__PURE__*/ S.Array(RuleDmarcPolicy);
export interface RuleDmarcExpression {
  Operator: RuleDmarcOperator;
  Values: RuleDmarcPolicy[];
}
export const RuleDmarcExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operator: RuleDmarcOperator, Values: RuleDmarcValueList }),
).annotate({
  identifier: "RuleDmarcExpression",
}) as any as S.Schema<RuleDmarcExpression>;
export type RuleCondition =
  | {
      BooleanExpression: RuleBooleanExpression;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression: RuleStringExpression;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression: RuleNumberExpression;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression: RuleIpExpression;
      VerdictExpression?: never;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression: RuleVerdictExpression;
      DmarcExpression?: never;
    }
  | {
      BooleanExpression?: never;
      StringExpression?: never;
      NumberExpression?: never;
      IpExpression?: never;
      VerdictExpression?: never;
      DmarcExpression: RuleDmarcExpression;
    };
export const RuleCondition = /*@__PURE__*/ S.Union([
  S.Struct({ BooleanExpression: RuleBooleanExpression }),
  S.Struct({ StringExpression: RuleStringExpression }),
  S.Struct({ NumberExpression: RuleNumberExpression }),
  S.Struct({ IpExpression: RuleIpExpression }),
  S.Struct({ VerdictExpression: RuleVerdictExpression }),
  S.Struct({ DmarcExpression: RuleDmarcExpression }),
]);
export type RuleConditions = RuleCondition[];
export const RuleConditions = /*@__PURE__*/ S.Array(RuleCondition);
export interface DropAction {}
export const DropAction = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DropAction",
}) as any as S.Schema<DropAction>;
export type ActionFailurePolicy = "CONTINUE" | "DROP" | (string & {});
export const ActionFailurePolicy = /*@__PURE__*/ S.String;

export type IdOrArn = string;
export type MailFrom = "REPLACE" | "PRESERVE" | (string & {});
export const MailFrom = /*@__PURE__*/ S.String;

export interface RelayAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  Relay: string;
  MailFrom?: MailFrom;
}
export const RelayAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    Relay: S.String,
    MailFrom: S.optional(MailFrom),
  }),
).annotate({ identifier: "RelayAction" }) as any as S.Schema<RelayAction>;
export type NameOrArn = string;
export interface ArchiveAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  TargetArchive: string;
}
export const ArchiveAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    TargetArchive: S.String,
  }),
).annotate({ identifier: "ArchiveAction" }) as any as S.Schema<ArchiveAction>;
export type IamRoleArn = string;
export type S3Bucket = string;
export type S3Prefix = string;
export type KmsKeyId = string;
export interface S3Action {
  ActionFailurePolicy?: ActionFailurePolicy;
  RoleArn: string;
  S3Bucket: string;
  S3Prefix?: string;
  S3SseKmsKeyId?: string;
}
export const S3Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    RoleArn: S.String,
    S3Bucket: S.String,
    S3Prefix: S.optional(S.String),
    S3SseKmsKeyId: S.optional(S.String),
  }),
).annotate({ identifier: "S3Action" }) as any as S.Schema<S3Action>;
export interface SendAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  RoleArn: string;
}
export const SendAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    RoleArn: S.String,
  }),
).annotate({ identifier: "SendAction" }) as any as S.Schema<SendAction>;
export type HeaderName = string;
export type HeaderValue = string;
export interface AddHeaderAction {
  HeaderName: string;
  HeaderValue: string;
}
export const AddHeaderAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HeaderName: S.String, HeaderValue: S.String }),
).annotate({
  identifier: "AddHeaderAction",
}) as any as S.Schema<AddHeaderAction>;
export type EmailAddress = string | redacted.Redacted<string>;
export type Recipients = (string | redacted.Redacted<string>)[];
export const Recipients = /*@__PURE__*/ S.Array(SensitiveString);
export interface ReplaceRecipientAction {
  ReplaceWith?: (string | redacted.Redacted<string>)[];
}
export const ReplaceRecipientAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReplaceWith: S.optional(Recipients) }),
).annotate({
  identifier: "ReplaceRecipientAction",
}) as any as S.Schema<ReplaceRecipientAction>;
export interface DeliverToMailboxAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  MailboxArn: string;
  RoleArn: string;
}
export const DeliverToMailboxAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    MailboxArn: S.String,
    RoleArn: S.String,
  }),
).annotate({
  identifier: "DeliverToMailboxAction",
}) as any as S.Schema<DeliverToMailboxAction>;
export type QBusinessApplicationId = string;
export type QBusinessIndexId = string;
export interface DeliverToQBusinessAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  ApplicationId: string;
  IndexId: string;
  RoleArn: string;
}
export const DeliverToQBusinessAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    ApplicationId: S.String,
    IndexId: S.String,
    RoleArn: S.String,
  }),
).annotate({
  identifier: "DeliverToQBusinessAction",
}) as any as S.Schema<DeliverToQBusinessAction>;
export type SnsTopicArn = string;
export type SnsNotificationEncoding = "UTF-8" | "BASE64" | (string & {});
export const SnsNotificationEncoding = /*@__PURE__*/ S.String;

export type SnsNotificationPayloadType = "HEADERS" | "CONTENT" | (string & {});
export const SnsNotificationPayloadType = /*@__PURE__*/ S.String;

export interface SnsAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  TopicArn: string;
  RoleArn: string;
  Encoding?: SnsNotificationEncoding;
  PayloadType?: SnsNotificationPayloadType;
}
export const SnsAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    TopicArn: S.String,
    RoleArn: S.String,
    Encoding: S.optional(SnsNotificationEncoding),
    PayloadType: S.optional(SnsNotificationPayloadType),
  }),
).annotate({ identifier: "SnsAction" }) as any as S.Schema<SnsAction>;
export type StatusCode = string;
export type SmtpReplyCode = string;
export type DiagnosticMessage = string | redacted.Redacted<string>;
export type BounceMessage = string | redacted.Redacted<string>;
export interface BounceAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  RoleArn: string;
  Sender: string | redacted.Redacted<string>;
  StatusCode: string;
  SmtpReplyCode: string;
  DiagnosticMessage: string | redacted.Redacted<string>;
  Message?: string | redacted.Redacted<string>;
}
export const BounceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    RoleArn: S.String,
    Sender: SensitiveString,
    StatusCode: S.String,
    SmtpReplyCode: S.String,
    DiagnosticMessage: SensitiveString,
    Message: S.optional(SensitiveString),
  }),
).annotate({ identifier: "BounceAction" }) as any as S.Schema<BounceAction>;
export type LambdaFunctionArn = string;
export type LambdaInvocationType = "EVENT" | "REQUEST_RESPONSE" | (string & {});
export const LambdaInvocationType = /*@__PURE__*/ S.String;

export type LambdaRetryTimeMinutes = number;
export interface InvokeLambdaAction {
  ActionFailurePolicy?: ActionFailurePolicy;
  FunctionArn: string;
  InvocationType: LambdaInvocationType;
  RoleArn: string;
  RetryTimeMinutes?: number;
}
export const InvokeLambdaAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionFailurePolicy: S.optional(ActionFailurePolicy),
    FunctionArn: S.String,
    InvocationType: LambdaInvocationType,
    RoleArn: S.String,
    RetryTimeMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "InvokeLambdaAction",
}) as any as S.Schema<InvokeLambdaAction>;
export type RuleAction =
  | {
      Drop: DropAction;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay: RelayAction;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive: ArchiveAction;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3: S3Action;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send: SendAction;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader: AddHeaderAction;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient: ReplaceRecipientAction;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox: DeliverToMailboxAction;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness: DeliverToQBusinessAction;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns: SnsAction;
      Bounce?: never;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce: BounceAction;
      InvokeLambda?: never;
    }
  | {
      Drop?: never;
      Relay?: never;
      Archive?: never;
      WriteToS3?: never;
      Send?: never;
      AddHeader?: never;
      ReplaceRecipient?: never;
      DeliverToMailbox?: never;
      DeliverToQBusiness?: never;
      PublishToSns?: never;
      Bounce?: never;
      InvokeLambda: InvokeLambdaAction;
    };
export const RuleAction = /*@__PURE__*/ S.Union([
  S.Struct({ Drop: DropAction }),
  S.Struct({ Relay: RelayAction }),
  S.Struct({ Archive: ArchiveAction }),
  S.Struct({ WriteToS3: S3Action }),
  S.Struct({ Send: SendAction }),
  S.Struct({ AddHeader: AddHeaderAction }),
  S.Struct({ ReplaceRecipient: ReplaceRecipientAction }),
  S.Struct({ DeliverToMailbox: DeliverToMailboxAction }),
  S.Struct({ DeliverToQBusiness: DeliverToQBusinessAction }),
  S.Struct({ PublishToSns: SnsAction }),
  S.Struct({ Bounce: BounceAction }),
  S.Struct({ InvokeLambda: InvokeLambdaAction }),
]);
export type RuleActions = RuleAction[];
export const RuleActions = /*@__PURE__*/ S.Array(RuleAction);
export interface Rule {
  Name?: string;
  Conditions?: RuleCondition[];
  Unless?: RuleCondition[];
  Actions: RuleAction[];
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Conditions: S.optional(RuleConditions),
    Unless: S.optional(RuleConditions),
    Actions: RuleActions,
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type Rules = Rule[];
export const Rules = /*@__PURE__*/ S.Array(Rule);
export interface CreateRuleSetRequest {
  ClientToken?: string;
  RuleSetName: string;
  Rules: Rule[];
  Tags?: Tag[];
}
export const CreateRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    RuleSetName: S.String,
    Rules: Rules,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRuleSetRequest",
}) as any as S.Schema<CreateRuleSetRequest>;
export interface CreateRuleSetResponse {
  RuleSetId: string;
}
export const CreateRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetId: S.String }),
).annotate({
  identifier: "CreateRuleSetResponse",
}) as any as S.Schema<CreateRuleSetResponse>;
export type TrafficPolicyName = string;
export type IngressStringEmailAttribute = "RECIPIENT" | (string & {});
export const IngressStringEmailAttribute = /*@__PURE__*/ S.String;

export interface IngressAnalysis {
  Analyzer: string;
  ResultField: string;
}
export const IngressAnalysis = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Analyzer: S.String, ResultField: S.String }),
).annotate({
  identifier: "IngressAnalysis",
}) as any as S.Schema<IngressAnalysis>;
export type IngressStringToEvaluate =
  | { Attribute: IngressStringEmailAttribute; Analysis?: never }
  | { Attribute?: never; Analysis: IngressAnalysis };
export const IngressStringToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: IngressStringEmailAttribute }),
  S.Struct({ Analysis: IngressAnalysis }),
]);
export type IngressStringOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | (string & {});
export const IngressStringOperator = /*@__PURE__*/ S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface IngressStringExpression {
  Evaluate: IngressStringToEvaluate;
  Operator: IngressStringOperator;
  Values: string[];
}
export const IngressStringExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: IngressStringToEvaluate,
    Operator: IngressStringOperator,
    Values: StringList,
  }),
).annotate({
  identifier: "IngressStringExpression",
}) as any as S.Schema<IngressStringExpression>;
export type IngressIpv4Attribute = "SENDER_IP" | (string & {});
export const IngressIpv4Attribute = /*@__PURE__*/ S.String;

export type IngressIpToEvaluate = { Attribute: IngressIpv4Attribute };
export const IngressIpToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: IngressIpv4Attribute }),
]);
export type IngressIpOperator =
  | "CIDR_MATCHES"
  | "NOT_CIDR_MATCHES"
  | (string & {});
export const IngressIpOperator = /*@__PURE__*/ S.String;

export type Ipv4Cidr = string;
export type Ipv4Cidrs = string[];
export const Ipv4Cidrs = /*@__PURE__*/ S.Array(S.String);
export interface IngressIpv4Expression {
  Evaluate: IngressIpToEvaluate;
  Operator: IngressIpOperator;
  Values: string[];
}
export const IngressIpv4Expression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: IngressIpToEvaluate,
    Operator: IngressIpOperator,
    Values: Ipv4Cidrs,
  }),
).annotate({
  identifier: "IngressIpv4Expression",
}) as any as S.Schema<IngressIpv4Expression>;
export type IngressIpv6Attribute = "SENDER_IPV6" | (string & {});
export const IngressIpv6Attribute = /*@__PURE__*/ S.String;

export type IngressIpv6ToEvaluate = { Attribute: IngressIpv6Attribute };
export const IngressIpv6ToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: IngressIpv6Attribute }),
]);
export type Ipv6Cidr = string;
export type Ipv6Cidrs = string[];
export const Ipv6Cidrs = /*@__PURE__*/ S.Array(S.String);
export interface IngressIpv6Expression {
  Evaluate: IngressIpv6ToEvaluate;
  Operator: IngressIpOperator;
  Values: string[];
}
export const IngressIpv6Expression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: IngressIpv6ToEvaluate,
    Operator: IngressIpOperator,
    Values: Ipv6Cidrs,
  }),
).annotate({
  identifier: "IngressIpv6Expression",
}) as any as S.Schema<IngressIpv6Expression>;
export type IngressTlsAttribute = "TLS_PROTOCOL" | (string & {});
export const IngressTlsAttribute = /*@__PURE__*/ S.String;

export type IngressTlsProtocolToEvaluate = { Attribute: IngressTlsAttribute };
export const IngressTlsProtocolToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: IngressTlsAttribute }),
]);
export type IngressTlsProtocolOperator =
  | "MINIMUM_TLS_VERSION"
  | "IS"
  | (string & {});
export const IngressTlsProtocolOperator = /*@__PURE__*/ S.String;

export type IngressTlsProtocolAttribute = "TLS1_2" | "TLS1_3" | (string & {});
export const IngressTlsProtocolAttribute = /*@__PURE__*/ S.String;

export interface IngressTlsProtocolExpression {
  Evaluate: IngressTlsProtocolToEvaluate;
  Operator: IngressTlsProtocolOperator;
  Value: IngressTlsProtocolAttribute;
}
export const IngressTlsProtocolExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: IngressTlsProtocolToEvaluate,
    Operator: IngressTlsProtocolOperator,
    Value: IngressTlsProtocolAttribute,
  }),
).annotate({
  identifier: "IngressTlsProtocolExpression",
}) as any as S.Schema<IngressTlsProtocolExpression>;
export type IngressAddressListEmailAttribute = "RECIPIENT" | (string & {});
export const IngressAddressListEmailAttribute = /*@__PURE__*/ S.String;

export type IngressAddressListArnList = string[];
export const IngressAddressListArnList = /*@__PURE__*/ S.Array(S.String);
export interface IngressIsInAddressList {
  Attribute: IngressAddressListEmailAttribute;
  AddressLists: string[];
}
export const IngressIsInAddressList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: IngressAddressListEmailAttribute,
    AddressLists: IngressAddressListArnList,
  }),
).annotate({
  identifier: "IngressIsInAddressList",
}) as any as S.Schema<IngressIsInAddressList>;
export type IngressBooleanToEvaluate =
  | { Analysis: IngressAnalysis; IsInAddressList?: never }
  | { Analysis?: never; IsInAddressList: IngressIsInAddressList };
export const IngressBooleanToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Analysis: IngressAnalysis }),
  S.Struct({ IsInAddressList: IngressIsInAddressList }),
]);
export type IngressBooleanOperator = "IS_TRUE" | "IS_FALSE" | (string & {});
export const IngressBooleanOperator = /*@__PURE__*/ S.String;

export interface IngressBooleanExpression {
  Evaluate: IngressBooleanToEvaluate;
  Operator: IngressBooleanOperator;
}
export const IngressBooleanExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: IngressBooleanToEvaluate,
    Operator: IngressBooleanOperator,
  }),
).annotate({
  identifier: "IngressBooleanExpression",
}) as any as S.Schema<IngressBooleanExpression>;
export type PolicyCondition =
  | {
      StringExpression: IngressStringExpression;
      IpExpression?: never;
      Ipv6Expression?: never;
      TlsExpression?: never;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression: IngressIpv4Expression;
      Ipv6Expression?: never;
      TlsExpression?: never;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression?: never;
      Ipv6Expression: IngressIpv6Expression;
      TlsExpression?: never;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression?: never;
      Ipv6Expression?: never;
      TlsExpression: IngressTlsProtocolExpression;
      BooleanExpression?: never;
    }
  | {
      StringExpression?: never;
      IpExpression?: never;
      Ipv6Expression?: never;
      TlsExpression?: never;
      BooleanExpression: IngressBooleanExpression;
    };
export const PolicyCondition = /*@__PURE__*/ S.Union([
  S.Struct({ StringExpression: IngressStringExpression }),
  S.Struct({ IpExpression: IngressIpv4Expression }),
  S.Struct({ Ipv6Expression: IngressIpv6Expression }),
  S.Struct({ TlsExpression: IngressTlsProtocolExpression }),
  S.Struct({ BooleanExpression: IngressBooleanExpression }),
]);
export type PolicyConditions = PolicyCondition[];
export const PolicyConditions = /*@__PURE__*/ S.Array(PolicyCondition);
export type AcceptAction = "ALLOW" | "DENY" | (string & {});
export const AcceptAction = /*@__PURE__*/ S.String;

export interface PolicyStatement {
  Conditions: PolicyCondition[];
  Action: AcceptAction;
}
export const PolicyStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Conditions: PolicyConditions, Action: AcceptAction }),
).annotate({
  identifier: "PolicyStatement",
}) as any as S.Schema<PolicyStatement>;
export type PolicyStatementList = PolicyStatement[];
export const PolicyStatementList = /*@__PURE__*/ S.Array(PolicyStatement);
export type MaxMessageSizeBytes = number;
export interface CreateTrafficPolicyRequest {
  ClientToken?: string;
  TrafficPolicyName: string;
  PolicyStatements: PolicyStatement[];
  DefaultAction: AcceptAction;
  MaxMessageSizeBytes?: number;
  Tags?: Tag[];
}
export const CreateTrafficPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    TrafficPolicyName: S.String,
    PolicyStatements: PolicyStatementList,
    DefaultAction: AcceptAction,
    MaxMessageSizeBytes: S.optional(S.Number),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTrafficPolicyRequest",
}) as any as S.Schema<CreateTrafficPolicyRequest>;
export interface CreateTrafficPolicyResponse {
  TrafficPolicyId: string;
}
export const CreateTrafficPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrafficPolicyId: S.String }),
).annotate({
  identifier: "CreateTrafficPolicyResponse",
}) as any as S.Schema<CreateTrafficPolicyResponse>;
export interface DeleteAddonInstanceRequest {
  AddonInstanceId: string;
}
export const DeleteAddonInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddonInstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAddonInstanceRequest",
}) as any as S.Schema<DeleteAddonInstanceRequest>;
export interface DeleteAddonInstanceResponse {}
export const DeleteAddonInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAddonInstanceResponse",
}) as any as S.Schema<DeleteAddonInstanceResponse>;
export interface DeleteAddonSubscriptionRequest {
  AddonSubscriptionId: string;
}
export const DeleteAddonSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddonSubscriptionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAddonSubscriptionRequest",
}) as any as S.Schema<DeleteAddonSubscriptionRequest>;
export interface DeleteAddonSubscriptionResponse {}
export const DeleteAddonSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAddonSubscriptionResponse",
}) as any as S.Schema<DeleteAddonSubscriptionResponse>;
export interface DeleteAddressListRequest {
  AddressListId: string;
}
export const DeleteAddressListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressListId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAddressListRequest",
}) as any as S.Schema<DeleteAddressListRequest>;
export interface DeleteAddressListResponse {}
export const DeleteAddressListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAddressListResponse",
}) as any as S.Schema<DeleteAddressListResponse>;
export interface DeleteArchiveRequest {
  ArchiveId: string;
}
export const DeleteArchiveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchiveId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteArchiveRequest",
}) as any as S.Schema<DeleteArchiveRequest>;
export interface DeleteArchiveResponse {}
export const DeleteArchiveResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteArchiveResponse",
}) as any as S.Schema<DeleteArchiveResponse>;
export interface DeleteIngressPointRequest {
  IngressPointId: string;
}
export const DeleteIngressPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IngressPointId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteIngressPointRequest",
}) as any as S.Schema<DeleteIngressPointRequest>;
export interface DeleteIngressPointResponse {}
export const DeleteIngressPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIngressPointResponse",
}) as any as S.Schema<DeleteIngressPointResponse>;
export interface DeleteRelayRequest {
  RelayId: string;
}
export const DeleteRelayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RelayId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRelayRequest",
}) as any as S.Schema<DeleteRelayRequest>;
export interface DeleteRelayResponse {}
export const DeleteRelayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRelayResponse",
}) as any as S.Schema<DeleteRelayResponse>;
export interface DeleteRuleSetRequest {
  RuleSetId: string;
}
export const DeleteRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRuleSetRequest",
}) as any as S.Schema<DeleteRuleSetRequest>;
export interface DeleteRuleSetResponse {}
export const DeleteRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRuleSetResponse",
}) as any as S.Schema<DeleteRuleSetResponse>;
export interface DeleteTrafficPolicyRequest {
  TrafficPolicyId: string;
}
export const DeleteTrafficPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrafficPolicyId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTrafficPolicyRequest",
}) as any as S.Schema<DeleteTrafficPolicyRequest>;
export interface DeleteTrafficPolicyResponse {}
export const DeleteTrafficPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTrafficPolicyResponse",
}) as any as S.Schema<DeleteTrafficPolicyResponse>;
export type Address = string | redacted.Redacted<string>;
export interface DeregisterMemberFromAddressListRequest {
  AddressListId: string;
  Address: string | redacted.Redacted<string>;
}
export const DeregisterMemberFromAddressListRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AddressListId: S.String, Address: SensitiveString }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeregisterMemberFromAddressListRequest",
}) as any as S.Schema<DeregisterMemberFromAddressListRequest>;
export interface DeregisterMemberFromAddressListResponse {}
export const DeregisterMemberFromAddressListResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeregisterMemberFromAddressListResponse",
}) as any as S.Schema<DeregisterMemberFromAddressListResponse>;
export interface GetAddonInstanceRequest {
  AddonInstanceId: string;
}
export const GetAddonInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddonInstanceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAddonInstanceRequest",
}) as any as S.Schema<GetAddonInstanceRequest>;
export type AddonInstanceArn = string;
export interface GetAddonInstanceResponse {
  AddonSubscriptionId?: string;
  AddonName?: string;
  AddonInstanceArn?: string;
  CreatedTimestamp?: Date;
}
export const GetAddonInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonSubscriptionId: S.optional(S.String),
    AddonName: S.optional(S.String),
    AddonInstanceArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetAddonInstanceResponse",
}) as any as S.Schema<GetAddonInstanceResponse>;
export interface GetAddonSubscriptionRequest {
  AddonSubscriptionId: string;
}
export const GetAddonSubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddonSubscriptionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAddonSubscriptionRequest",
}) as any as S.Schema<GetAddonSubscriptionRequest>;
export type AddonSubscriptionArn = string;
export interface GetAddonSubscriptionResponse {
  AddonName?: string;
  AddonSubscriptionArn?: string;
  CreatedTimestamp?: Date;
}
export const GetAddonSubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonName: S.optional(S.String),
    AddonSubscriptionArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetAddonSubscriptionResponse",
}) as any as S.Schema<GetAddonSubscriptionResponse>;
export interface GetAddressListRequest {
  AddressListId: string;
}
export const GetAddressListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressListId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAddressListRequest",
}) as any as S.Schema<GetAddressListRequest>;
export interface GetAddressListResponse {
  AddressListId: string;
  AddressListArn: string;
  AddressListName: string;
  CreatedTimestamp: Date;
  LastUpdatedTimestamp: Date;
}
export const GetAddressListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressListId: S.String,
    AddressListArn: S.String,
    AddressListName: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetAddressListResponse",
}) as any as S.Schema<GetAddressListResponse>;
export interface GetAddressListImportJobRequest {
  JobId: string;
}
export const GetAddressListImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAddressListImportJobRequest",
}) as any as S.Schema<GetAddressListImportJobRequest>;
export type ImportJobStatus =
  | "CREATED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export const ImportJobStatus = /*@__PURE__*/ S.String;

export type JobItemsCount = number;
export type ErrorMessage = string;
export interface GetAddressListImportJobResponse {
  JobId: string;
  Name: string;
  Status: ImportJobStatus;
  PreSignedUrl: string | redacted.Redacted<string>;
  ImportedItemsCount?: number;
  FailedItemsCount?: number;
  ImportDataFormat: ImportDataFormat;
  AddressListId: string;
  CreatedTimestamp: Date;
  StartTimestamp?: Date;
  CompletedTimestamp?: Date;
  Error?: string;
}
export const GetAddressListImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    Name: S.String,
    Status: ImportJobStatus,
    PreSignedUrl: SensitiveString,
    ImportedItemsCount: S.optional(S.Number),
    FailedItemsCount: S.optional(S.Number),
    ImportDataFormat: ImportDataFormat,
    AddressListId: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Error: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAddressListImportJobResponse",
}) as any as S.Schema<GetAddressListImportJobResponse>;
export interface GetArchiveRequest {
  ArchiveId: string;
}
export const GetArchiveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchiveId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetArchiveRequest",
}) as any as S.Schema<GetArchiveRequest>;
export type ArchiveArn = string;
export type ArchiveState = "ACTIVE" | "PENDING_DELETION" | (string & {});
export const ArchiveState = /*@__PURE__*/ S.String;

export interface GetArchiveResponse {
  ArchiveId: string;
  ArchiveName: string;
  ArchiveArn: string;
  ArchiveState: ArchiveState;
  Retention: ArchiveRetention;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  KmsKeyArn?: string;
}
export const GetArchiveResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    ArchiveName: S.String,
    ArchiveArn: S.String,
    ArchiveState: ArchiveState,
    Retention: ArchiveRetention,
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetArchiveResponse",
}) as any as S.Schema<GetArchiveResponse>;
export type ExportId = string;
export interface GetArchiveExportRequest {
  ExportId: string;
}
export const GetArchiveExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetArchiveExportRequest",
}) as any as S.Schema<GetArchiveExportRequest>;
export type ArchiveId = string;
export type ArchiveStringEmailAttribute =
  | "TO"
  | "FROM"
  | "CC"
  | "SUBJECT"
  | "ENVELOPE_TO"
  | "ENVELOPE_FROM"
  | (string & {});
export const ArchiveStringEmailAttribute = /*@__PURE__*/ S.String;

export type ArchiveStringToEvaluate = {
  Attribute: ArchiveStringEmailAttribute;
};
export const ArchiveStringToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: ArchiveStringEmailAttribute }),
]);
export type ArchiveStringOperator = "CONTAINS" | (string & {});
export const ArchiveStringOperator = /*@__PURE__*/ S.String;

export type StringValue = string;
export type StringValueList = string[];
export const StringValueList = /*@__PURE__*/ S.Array(S.String);
export interface ArchiveStringExpression {
  Evaluate: ArchiveStringToEvaluate;
  Operator: ArchiveStringOperator;
  Values: string[];
}
export const ArchiveStringExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: ArchiveStringToEvaluate,
    Operator: ArchiveStringOperator,
    Values: StringValueList,
  }),
).annotate({
  identifier: "ArchiveStringExpression",
}) as any as S.Schema<ArchiveStringExpression>;
export type ArchiveBooleanEmailAttribute = "HAS_ATTACHMENTS" | (string & {});
export const ArchiveBooleanEmailAttribute = /*@__PURE__*/ S.String;

export type ArchiveBooleanToEvaluate = {
  Attribute: ArchiveBooleanEmailAttribute;
};
export const ArchiveBooleanToEvaluate = /*@__PURE__*/ S.Union([
  S.Struct({ Attribute: ArchiveBooleanEmailAttribute }),
]);
export type ArchiveBooleanOperator = "IS_TRUE" | "IS_FALSE" | (string & {});
export const ArchiveBooleanOperator = /*@__PURE__*/ S.String;

export interface ArchiveBooleanExpression {
  Evaluate: ArchiveBooleanToEvaluate;
  Operator: ArchiveBooleanOperator;
}
export const ArchiveBooleanExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Evaluate: ArchiveBooleanToEvaluate,
    Operator: ArchiveBooleanOperator,
  }),
).annotate({
  identifier: "ArchiveBooleanExpression",
}) as any as S.Schema<ArchiveBooleanExpression>;
export type ArchiveFilterCondition =
  | { StringExpression: ArchiveStringExpression; BooleanExpression?: never }
  | { StringExpression?: never; BooleanExpression: ArchiveBooleanExpression };
export const ArchiveFilterCondition = /*@__PURE__*/ S.Union([
  S.Struct({ StringExpression: ArchiveStringExpression }),
  S.Struct({ BooleanExpression: ArchiveBooleanExpression }),
]);
export type ArchiveFilterConditions = ArchiveFilterCondition[];
export const ArchiveFilterConditions = /*@__PURE__*/ S.Array(
  ArchiveFilterCondition,
);
export interface ArchiveFilters {
  Include?: ArchiveFilterCondition[];
  Unless?: ArchiveFilterCondition[];
}
export const ArchiveFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Include: S.optional(ArchiveFilterConditions),
    Unless: S.optional(ArchiveFilterConditions),
  }),
).annotate({ identifier: "ArchiveFilters" }) as any as S.Schema<ArchiveFilters>;
export type ExportMaxResults = number;
export type S3Location = string;
export interface S3ExportDestinationConfiguration {
  S3Location?: string;
}
export const S3ExportDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Location: S.optional(S.String) }),
).annotate({
  identifier: "S3ExportDestinationConfiguration",
}) as any as S.Schema<S3ExportDestinationConfiguration>;
export type ExportDestinationConfiguration = {
  S3: S3ExportDestinationConfiguration;
};
export const ExportDestinationConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ S3: S3ExportDestinationConfiguration }),
]);
export type ExportState =
  | "QUEUED"
  | "PREPROCESSING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const ExportState = /*@__PURE__*/ S.String;

export interface ExportStatus {
  SubmissionTimestamp?: Date;
  CompletionTimestamp?: Date;
  State?: ExportState;
  ErrorMessage?: string;
}
export const ExportStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubmissionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(ExportState),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ExportStatus" }) as any as S.Schema<ExportStatus>;
export interface GetArchiveExportResponse {
  ArchiveId?: string;
  Filters?: ArchiveFilters;
  FromTimestamp?: Date;
  ToTimestamp?: Date;
  MaxResults?: number;
  ExportDestinationConfiguration?: ExportDestinationConfiguration;
  Status?: ExportStatus;
}
export const GetArchiveExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.optional(S.String),
    Filters: S.optional(ArchiveFilters),
    FromTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ToTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaxResults: S.optional(S.Number),
    ExportDestinationConfiguration: S.optional(ExportDestinationConfiguration),
    Status: S.optional(ExportStatus),
  }),
).annotate({
  identifier: "GetArchiveExportResponse",
}) as any as S.Schema<GetArchiveExportResponse>;
export type ArchivedMessageId = string;
export interface GetArchiveMessageRequest {
  ArchivedMessageId: string;
}
export const GetArchiveMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchivedMessageId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetArchiveMessageRequest",
}) as any as S.Schema<GetArchiveMessageRequest>;
export type S3PresignedURL = string;
export type SenderIpAddress = string | redacted.Redacted<string>;
export interface Metadata {
  Timestamp?: Date;
  IngressPointId?: string;
  TrafficPolicyId?: string;
  RuleSetId?: string;
  SenderHostname?: string;
  SenderIpAddress?: string | redacted.Redacted<string>;
  TlsCipherSuite?: string;
  TlsProtocol?: string;
  SendingMethod?: string;
  SourceIdentity?: string;
  SendingPool?: string;
  ConfigurationSet?: string;
  SourceArn?: string;
}
export const Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IngressPointId: S.optional(S.String),
    TrafficPolicyId: S.optional(S.String),
    RuleSetId: S.optional(S.String),
    SenderHostname: S.optional(S.String),
    SenderIpAddress: S.optional(SensitiveString),
    TlsCipherSuite: S.optional(S.String),
    TlsProtocol: S.optional(S.String),
    SendingMethod: S.optional(S.String),
    SourceIdentity: S.optional(S.String),
    SendingPool: S.optional(S.String),
    ConfigurationSet: S.optional(S.String),
    SourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "Metadata" }) as any as S.Schema<Metadata>;
export interface Envelope {
  Helo?: string;
  From?: string;
  To?: string[];
}
export const Envelope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Helo: S.optional(S.String),
    From: S.optional(S.String),
    To: S.optional(StringList),
  }),
).annotate({ identifier: "Envelope" }) as any as S.Schema<Envelope>;
export interface GetArchiveMessageResponse {
  MessageDownloadLink?: string;
  Metadata?: Metadata;
  Envelope?: Envelope;
}
export const GetArchiveMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageDownloadLink: S.optional(S.String),
    Metadata: S.optional(Metadata),
    Envelope: S.optional(Envelope),
  }),
).annotate({
  identifier: "GetArchiveMessageResponse",
}) as any as S.Schema<GetArchiveMessageResponse>;
export interface GetArchiveMessageContentRequest {
  ArchivedMessageId: string;
}
export const GetArchiveMessageContentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchivedMessageId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetArchiveMessageContentRequest",
}) as any as S.Schema<GetArchiveMessageContentRequest>;
export interface MessageBody {
  Text?: string;
  Html?: string;
  MessageMalformed?: boolean;
}
export const MessageBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.optional(S.String),
    Html: S.optional(S.String),
    MessageMalformed: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MessageBody" }) as any as S.Schema<MessageBody>;
export interface GetArchiveMessageContentResponse {
  Body?: MessageBody;
}
export const GetArchiveMessageContentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Body: S.optional(MessageBody) }),
).annotate({
  identifier: "GetArchiveMessageContentResponse",
}) as any as S.Schema<GetArchiveMessageContentResponse>;
export type SearchId = string;
export interface GetArchiveSearchRequest {
  SearchId: string;
}
export const GetArchiveSearchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SearchId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetArchiveSearchRequest",
}) as any as S.Schema<GetArchiveSearchRequest>;
export type SearchMaxResults = number;
export type SearchState =
  | "QUEUED"
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const SearchState = /*@__PURE__*/ S.String;

export interface SearchStatus {
  SubmissionTimestamp?: Date;
  CompletionTimestamp?: Date;
  State?: SearchState;
  ErrorMessage?: string;
}
export const SearchStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubmissionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(SearchState),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "SearchStatus" }) as any as S.Schema<SearchStatus>;
export interface GetArchiveSearchResponse {
  ArchiveId?: string;
  Filters?: ArchiveFilters;
  FromTimestamp?: Date;
  ToTimestamp?: Date;
  MaxResults?: number;
  Status?: SearchStatus;
}
export const GetArchiveSearchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.optional(S.String),
    Filters: S.optional(ArchiveFilters),
    FromTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ToTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaxResults: S.optional(S.Number),
    Status: S.optional(SearchStatus),
  }),
).annotate({
  identifier: "GetArchiveSearchResponse",
}) as any as S.Schema<GetArchiveSearchResponse>;
export interface GetArchiveSearchResultsRequest {
  SearchId: string;
}
export const GetArchiveSearchResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SearchId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetArchiveSearchResultsRequest",
}) as any as S.Schema<GetArchiveSearchResultsRequest>;
export type EmailReceivedHeadersList = string[];
export const EmailReceivedHeadersList = /*@__PURE__*/ S.Array(S.String);
export interface Row {
  ArchivedMessageId?: string;
  ReceivedTimestamp?: Date;
  Date?: string;
  To?: string;
  From?: string;
  Cc?: string;
  Subject?: string;
  MessageId?: string;
  HasAttachments?: boolean;
  ReceivedHeaders?: string[];
  InReplyTo?: string;
  XMailer?: string;
  XOriginalMailer?: string;
  XPriority?: string;
  IngressPointId?: string;
  SenderHostname?: string;
  SenderIpAddress?: string | redacted.Redacted<string>;
  Envelope?: Envelope;
  SourceArn?: string;
}
export const Row = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchivedMessageId: S.optional(S.String),
    ReceivedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Date: S.optional(S.String),
    To: S.optional(S.String),
    From: S.optional(S.String),
    Cc: S.optional(S.String),
    Subject: S.optional(S.String),
    MessageId: S.optional(S.String),
    HasAttachments: S.optional(S.Boolean),
    ReceivedHeaders: S.optional(EmailReceivedHeadersList),
    InReplyTo: S.optional(S.String),
    XMailer: S.optional(S.String),
    XOriginalMailer: S.optional(S.String),
    XPriority: S.optional(S.String),
    IngressPointId: S.optional(S.String),
    SenderHostname: S.optional(S.String),
    SenderIpAddress: S.optional(SensitiveString),
    Envelope: S.optional(Envelope),
    SourceArn: S.optional(S.String),
  }),
).annotate({ identifier: "Row" }) as any as S.Schema<Row>;
export type RowsList = Row[];
export const RowsList = /*@__PURE__*/ S.Array(Row);
export interface GetArchiveSearchResultsResponse {
  Rows?: Row[];
}
export const GetArchiveSearchResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rows: S.optional(RowsList) }),
).annotate({
  identifier: "GetArchiveSearchResultsResponse",
}) as any as S.Schema<GetArchiveSearchResultsResponse>;
export type TrustStoreResponseOption = "EXCLUDE" | "INCLUDE" | (string & {});
export const TrustStoreResponseOption = /*@__PURE__*/ S.String;

export interface GetIngressPointRequest {
  IngressPointId: string;
  IncludeTrustStoreContents?: TrustStoreResponseOption;
}
export const GetIngressPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IngressPointId: S.String,
    IncludeTrustStoreContents: S.optional(TrustStoreResponseOption),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetIngressPointRequest",
}) as any as S.Schema<GetIngressPointRequest>;
export type IngressPointArn = string;
export type IngressPointStatus =
  | "PROVISIONING"
  | "DEPROVISIONING"
  | "UPDATING"
  | "ACTIVE"
  | "CLOSED"
  | "FAILED"
  | "ASSOCIATED_VPC_ENDPOINT_DOES_NOT_EXIST"
  | (string & {});
export const IngressPointStatus = /*@__PURE__*/ S.String;

export type IngressPointARecord = string;
export interface IngressPointPasswordConfiguration {
  SmtpPasswordVersion?: string;
  PreviousSmtpPasswordVersion?: string;
  PreviousSmtpPasswordExpiryTimestamp?: Date;
}
export const IngressPointPasswordConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SmtpPasswordVersion: S.optional(S.String),
    PreviousSmtpPasswordVersion: S.optional(S.String),
    PreviousSmtpPasswordExpiryTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "IngressPointPasswordConfiguration",
}) as any as S.Schema<IngressPointPasswordConfiguration>;
export interface IngressPointAuthConfiguration {
  IngressPointPasswordConfiguration?: IngressPointPasswordConfiguration;
  SecretArn?: string;
  TlsAuthConfiguration?: TlsAuthConfiguration;
}
export const IngressPointAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IngressPointPasswordConfiguration: S.optional(
      IngressPointPasswordConfiguration,
    ),
    SecretArn: S.optional(S.String),
    TlsAuthConfiguration: S.optional(TlsAuthConfiguration),
  }),
).annotate({
  identifier: "IngressPointAuthConfiguration",
}) as any as S.Schema<IngressPointAuthConfiguration>;
export interface GetIngressPointResponse {
  IngressPointId: string;
  IngressPointName: string;
  IngressPointArn?: string;
  Status?: IngressPointStatus;
  Type?: IngressPointType;
  ARecord?: string;
  RuleSetId?: string;
  TrafficPolicyId?: string;
  IngressPointAuthConfiguration?: IngressPointAuthConfiguration;
  NetworkConfiguration?: NetworkConfiguration;
  TlsPolicy?: TlsPolicy;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export const GetIngressPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IngressPointId: S.String,
    IngressPointName: S.String,
    IngressPointArn: S.optional(S.String),
    Status: S.optional(IngressPointStatus),
    Type: S.optional(IngressPointType),
    ARecord: S.optional(S.String),
    RuleSetId: S.optional(S.String),
    TrafficPolicyId: S.optional(S.String),
    IngressPointAuthConfiguration: S.optional(IngressPointAuthConfiguration),
    NetworkConfiguration: S.optional(NetworkConfiguration),
    TlsPolicy: S.optional(TlsPolicy),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetIngressPointResponse",
}) as any as S.Schema<GetIngressPointResponse>;
export interface GetMemberOfAddressListRequest {
  AddressListId: string;
  Address: string | redacted.Redacted<string>;
}
export const GetMemberOfAddressListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressListId: S.String, Address: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMemberOfAddressListRequest",
}) as any as S.Schema<GetMemberOfAddressListRequest>;
export interface GetMemberOfAddressListResponse {
  Address: string | redacted.Redacted<string>;
  CreatedTimestamp: Date;
}
export const GetMemberOfAddressListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: SensitiveString,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetMemberOfAddressListResponse",
}) as any as S.Schema<GetMemberOfAddressListResponse>;
export interface GetRelayRequest {
  RelayId: string;
}
export const GetRelayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RelayId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRelayRequest",
}) as any as S.Schema<GetRelayRequest>;
export type RelayArn = string;
export interface GetRelayResponse {
  RelayId: string;
  RelayArn?: string;
  RelayName?: string;
  ServerName?: string;
  ServerPort?: number;
  Authentication?: RelayAuthentication;
  CreatedTimestamp?: Date;
  LastModifiedTimestamp?: Date;
}
export const GetRelayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelayId: S.String,
    RelayArn: S.optional(S.String),
    RelayName: S.optional(S.String),
    ServerName: S.optional(S.String),
    ServerPort: S.optional(S.Number),
    Authentication: S.optional(RelayAuthentication),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetRelayResponse",
}) as any as S.Schema<GetRelayResponse>;
export interface GetRuleSetRequest {
  RuleSetId: string;
}
export const GetRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRuleSetRequest",
}) as any as S.Schema<GetRuleSetRequest>;
export type RuleSetArn = string;
export interface GetRuleSetResponse {
  RuleSetId: string;
  RuleSetArn: string;
  RuleSetName: string;
  CreatedDate: Date;
  LastModificationDate: Date;
  Rules: Rule[];
}
export const GetRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSetId: S.String,
    RuleSetArn: S.String,
    RuleSetName: S.String,
    CreatedDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastModificationDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Rules: Rules,
  }),
).annotate({
  identifier: "GetRuleSetResponse",
}) as any as S.Schema<GetRuleSetResponse>;
export interface GetTrafficPolicyRequest {
  TrafficPolicyId: string;
}
export const GetTrafficPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TrafficPolicyId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTrafficPolicyRequest",
}) as any as S.Schema<GetTrafficPolicyRequest>;
export type TrafficPolicyArn = string;
export interface GetTrafficPolicyResponse {
  TrafficPolicyName: string;
  TrafficPolicyId: string;
  TrafficPolicyArn?: string;
  PolicyStatements?: PolicyStatement[];
  MaxMessageSizeBytes?: number;
  DefaultAction?: AcceptAction;
  CreatedTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export const GetTrafficPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrafficPolicyName: S.String,
    TrafficPolicyId: S.String,
    TrafficPolicyArn: S.optional(S.String),
    PolicyStatements: S.optional(PolicyStatementList),
    MaxMessageSizeBytes: S.optional(S.Number),
    DefaultAction: S.optional(AcceptAction),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetTrafficPolicyResponse",
}) as any as S.Schema<GetTrafficPolicyResponse>;
export type PaginationToken = string;
export type PageSize = number;
export interface ListAddonInstancesRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListAddonInstancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAddonInstancesRequest",
}) as any as S.Schema<ListAddonInstancesRequest>;
export interface AddonInstance {
  AddonInstanceId?: string;
  AddonSubscriptionId?: string;
  AddonName?: string;
  AddonInstanceArn?: string;
  CreatedTimestamp?: Date;
}
export const AddonInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonInstanceId: S.optional(S.String),
    AddonSubscriptionId: S.optional(S.String),
    AddonName: S.optional(S.String),
    AddonInstanceArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "AddonInstance" }) as any as S.Schema<AddonInstance>;
export type AddonInstances = AddonInstance[];
export const AddonInstances = /*@__PURE__*/ S.Array(AddonInstance);
export interface ListAddonInstancesResponse {
  AddonInstances?: AddonInstance[];
  NextToken?: string;
}
export const ListAddonInstancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonInstances: S.optional(AddonInstances),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAddonInstancesResponse",
}) as any as S.Schema<ListAddonInstancesResponse>;
export interface ListAddonSubscriptionsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListAddonSubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAddonSubscriptionsRequest",
}) as any as S.Schema<ListAddonSubscriptionsRequest>;
export interface AddonSubscription {
  AddonSubscriptionId?: string;
  AddonName?: string;
  AddonSubscriptionArn?: string;
  CreatedTimestamp?: Date;
}
export const AddonSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonSubscriptionId: S.optional(S.String),
    AddonName: S.optional(S.String),
    AddonSubscriptionArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "AddonSubscription",
}) as any as S.Schema<AddonSubscription>;
export type AddonSubscriptions = AddonSubscription[];
export const AddonSubscriptions = /*@__PURE__*/ S.Array(AddonSubscription);
export interface ListAddonSubscriptionsResponse {
  AddonSubscriptions?: AddonSubscription[];
  NextToken?: string;
}
export const ListAddonSubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddonSubscriptions: S.optional(AddonSubscriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAddonSubscriptionsResponse",
}) as any as S.Schema<ListAddonSubscriptionsResponse>;
export interface ListAddressListImportJobsRequest {
  AddressListId: string;
  NextToken?: string;
  PageSize?: number;
}
export const ListAddressListImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressListId: S.String,
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAddressListImportJobsRequest",
}) as any as S.Schema<ListAddressListImportJobsRequest>;
export interface ImportJob {
  JobId: string;
  Name: string;
  Status: ImportJobStatus;
  PreSignedUrl: string | redacted.Redacted<string>;
  ImportedItemsCount?: number;
  FailedItemsCount?: number;
  ImportDataFormat: ImportDataFormat;
  AddressListId: string;
  CreatedTimestamp: Date;
  StartTimestamp?: Date;
  CompletedTimestamp?: Date;
  Error?: string;
}
export const ImportJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    Name: S.String,
    Status: ImportJobStatus,
    PreSignedUrl: SensitiveString,
    ImportedItemsCount: S.optional(S.Number),
    FailedItemsCount: S.optional(S.Number),
    ImportDataFormat: ImportDataFormat,
    AddressListId: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Error: S.optional(S.String),
  }),
).annotate({ identifier: "ImportJob" }) as any as S.Schema<ImportJob>;
export type ImportJobs = ImportJob[];
export const ImportJobs = /*@__PURE__*/ S.Array(ImportJob);
export interface ListAddressListImportJobsResponse {
  ImportJobs: ImportJob[];
  NextToken?: string;
}
export const ListAddressListImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportJobs: ImportJobs, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAddressListImportJobsResponse",
}) as any as S.Schema<ListAddressListImportJobsResponse>;
export interface ListAddressListsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListAddressListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAddressListsRequest",
}) as any as S.Schema<ListAddressListsRequest>;
export interface AddressList {
  AddressListId: string;
  AddressListArn: string;
  AddressListName: string;
  CreatedTimestamp: Date;
  LastUpdatedTimestamp: Date;
}
export const AddressList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressListId: S.String,
    AddressListArn: S.String,
    AddressListName: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "AddressList" }) as any as S.Schema<AddressList>;
export type AddressLists = AddressList[];
export const AddressLists = /*@__PURE__*/ S.Array(AddressList);
export interface ListAddressListsResponse {
  AddressLists: AddressList[];
  NextToken?: string;
}
export const ListAddressListsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressLists: AddressLists, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAddressListsResponse",
}) as any as S.Schema<ListAddressListsResponse>;
export interface ListArchiveExportsRequest {
  ArchiveId: string;
  NextToken?: string;
  PageSize?: number;
}
export const ListArchiveExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListArchiveExportsRequest",
}) as any as S.Schema<ListArchiveExportsRequest>;
export interface ExportSummary {
  ExportId?: string;
  Status?: ExportStatus;
}
export const ExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportId: S.optional(S.String),
    Status: S.optional(ExportStatus),
  }),
).annotate({ identifier: "ExportSummary" }) as any as S.Schema<ExportSummary>;
export type ExportSummaryList = ExportSummary[];
export const ExportSummaryList = /*@__PURE__*/ S.Array(ExportSummary);
export interface ListArchiveExportsResponse {
  Exports?: ExportSummary[];
  NextToken?: string;
}
export const ListArchiveExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Exports: S.optional(ExportSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListArchiveExportsResponse",
}) as any as S.Schema<ListArchiveExportsResponse>;
export interface ListArchivesRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListArchivesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListArchivesRequest",
}) as any as S.Schema<ListArchivesRequest>;
export interface Archive {
  ArchiveId: string;
  ArchiveName?: string;
  ArchiveState?: ArchiveState;
  LastUpdatedTimestamp?: Date;
}
export const Archive = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    ArchiveName: S.optional(S.String),
    ArchiveState: S.optional(ArchiveState),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Archive" }) as any as S.Schema<Archive>;
export type ArchivesList = Archive[];
export const ArchivesList = /*@__PURE__*/ S.Array(Archive);
export interface ListArchivesResponse {
  Archives: Archive[];
  NextToken?: string;
}
export const ListArchivesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Archives: ArchivesList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListArchivesResponse",
}) as any as S.Schema<ListArchivesResponse>;
export interface ListArchiveSearchesRequest {
  ArchiveId: string;
  NextToken?: string;
  PageSize?: number;
}
export const ListArchiveSearchesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListArchiveSearchesRequest",
}) as any as S.Schema<ListArchiveSearchesRequest>;
export interface SearchSummary {
  SearchId?: string;
  Status?: SearchStatus;
}
export const SearchSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchId: S.optional(S.String),
    Status: S.optional(SearchStatus),
  }),
).annotate({ identifier: "SearchSummary" }) as any as S.Schema<SearchSummary>;
export type SearchSummaryList = SearchSummary[];
export const SearchSummaryList = /*@__PURE__*/ S.Array(SearchSummary);
export interface ListArchiveSearchesResponse {
  Searches?: SearchSummary[];
  NextToken?: string;
}
export const ListArchiveSearchesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Searches: S.optional(SearchSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListArchiveSearchesResponse",
}) as any as S.Schema<ListArchiveSearchesResponse>;
export interface ListIngressPointsRequest {
  PageSize?: number;
  NextToken?: string;
}
export const ListIngressPointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListIngressPointsRequest",
}) as any as S.Schema<ListIngressPointsRequest>;
export interface IngressPoint {
  IngressPointName: string;
  IngressPointId: string;
  Status: IngressPointStatus;
  Type: IngressPointType;
  ARecord?: string;
}
export const IngressPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IngressPointName: S.String,
    IngressPointId: S.String,
    Status: IngressPointStatus,
    Type: IngressPointType,
    ARecord: S.optional(S.String),
  }),
).annotate({ identifier: "IngressPoint" }) as any as S.Schema<IngressPoint>;
export type IngressPointsList = IngressPoint[];
export const IngressPointsList = /*@__PURE__*/ S.Array(IngressPoint);
export interface ListIngressPointsResponse {
  IngressPoints?: IngressPoint[];
  NextToken?: string;
}
export const ListIngressPointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IngressPoints: S.optional(IngressPointsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIngressPointsResponse",
}) as any as S.Schema<ListIngressPointsResponse>;
export type AddressPrefix = string | redacted.Redacted<string>;
export interface AddressFilter {
  AddressPrefix?: string | redacted.Redacted<string>;
}
export const AddressFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressPrefix: S.optional(SensitiveString) }),
).annotate({ identifier: "AddressFilter" }) as any as S.Schema<AddressFilter>;
export type AddressPageSize = number;
export interface ListMembersOfAddressListRequest {
  AddressListId: string;
  Filter?: AddressFilter;
  NextToken?: string;
  PageSize?: number;
}
export const ListMembersOfAddressListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressListId: S.String,
    Filter: S.optional(AddressFilter),
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMembersOfAddressListRequest",
}) as any as S.Schema<ListMembersOfAddressListRequest>;
export interface SavedAddress {
  Address: string | redacted.Redacted<string>;
  CreatedTimestamp: Date;
}
export const SavedAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: SensitiveString,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "SavedAddress" }) as any as S.Schema<SavedAddress>;
export type SavedAddresses = SavedAddress[];
export const SavedAddresses = /*@__PURE__*/ S.Array(SavedAddress);
export interface ListMembersOfAddressListResponse {
  Addresses: SavedAddress[];
  NextToken?: string;
}
export const ListMembersOfAddressListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Addresses: SavedAddresses, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMembersOfAddressListResponse",
}) as any as S.Schema<ListMembersOfAddressListResponse>;
export interface ListRelaysRequest {
  PageSize?: number;
  NextToken?: string;
}
export const ListRelaysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRelaysRequest",
}) as any as S.Schema<ListRelaysRequest>;
export interface Relay {
  RelayId?: string;
  RelayName?: string;
  LastModifiedTimestamp?: Date;
}
export const Relay = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelayId: S.optional(S.String),
    RelayName: S.optional(S.String),
    LastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Relay" }) as any as S.Schema<Relay>;
export type Relays = Relay[];
export const Relays = /*@__PURE__*/ S.Array(Relay);
export interface ListRelaysResponse {
  Relays: Relay[];
  NextToken?: string;
}
export const ListRelaysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Relays: Relays, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRelaysResponse",
}) as any as S.Schema<ListRelaysResponse>;
export interface ListRuleSetsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListRuleSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRuleSetsRequest",
}) as any as S.Schema<ListRuleSetsRequest>;
export interface RuleSet {
  RuleSetId?: string;
  RuleSetName?: string;
  LastModificationDate?: Date;
}
export const RuleSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSetId: S.optional(S.String),
    RuleSetName: S.optional(S.String),
    LastModificationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "RuleSet" }) as any as S.Schema<RuleSet>;
export type RuleSets = RuleSet[];
export const RuleSets = /*@__PURE__*/ S.Array(RuleSet);
export interface ListRuleSetsResponse {
  RuleSets: RuleSet[];
  NextToken?: string;
}
export const ListRuleSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSets: RuleSets, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListRuleSetsResponse",
}) as any as S.Schema<ListRuleSetsResponse>;
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagList }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTrafficPoliciesRequest {
  PageSize?: number;
  NextToken?: string;
}
export const ListTrafficPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTrafficPoliciesRequest",
}) as any as S.Schema<ListTrafficPoliciesRequest>;
export interface TrafficPolicy {
  TrafficPolicyName: string;
  TrafficPolicyId: string;
  DefaultAction: AcceptAction;
}
export const TrafficPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrafficPolicyName: S.String,
    TrafficPolicyId: S.String,
    DefaultAction: AcceptAction,
  }),
).annotate({ identifier: "TrafficPolicy" }) as any as S.Schema<TrafficPolicy>;
export type TrafficPolicyList = TrafficPolicy[];
export const TrafficPolicyList = /*@__PURE__*/ S.Array(TrafficPolicy);
export interface ListTrafficPoliciesResponse {
  TrafficPolicies?: TrafficPolicy[];
  NextToken?: string;
}
export const ListTrafficPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrafficPolicies: S.optional(TrafficPolicyList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTrafficPoliciesResponse",
}) as any as S.Schema<ListTrafficPoliciesResponse>;
export interface RegisterMemberToAddressListRequest {
  AddressListId: string;
  Address: string | redacted.Redacted<string>;
}
export const RegisterMemberToAddressListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressListId: S.String, Address: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterMemberToAddressListRequest",
}) as any as S.Schema<RegisterMemberToAddressListRequest>;
export interface RegisterMemberToAddressListResponse {}
export const RegisterMemberToAddressListResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegisterMemberToAddressListResponse",
}) as any as S.Schema<RegisterMemberToAddressListResponse>;
export interface StartAddressListImportJobRequest {
  JobId: string;
}
export const StartAddressListImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAddressListImportJobRequest",
}) as any as S.Schema<StartAddressListImportJobRequest>;
export interface StartAddressListImportJobResponse {}
export const StartAddressListImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartAddressListImportJobResponse",
}) as any as S.Schema<StartAddressListImportJobResponse>;
export interface StartArchiveExportRequest {
  ArchiveId: string;
  Filters?: ArchiveFilters;
  FromTimestamp: Date;
  ToTimestamp: Date;
  MaxResults?: number;
  ExportDestinationConfiguration: ExportDestinationConfiguration;
  IncludeMetadata?: boolean;
}
export const StartArchiveExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    Filters: S.optional(ArchiveFilters),
    FromTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ToTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.optional(S.Number),
    ExportDestinationConfiguration: ExportDestinationConfiguration,
    IncludeMetadata: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartArchiveExportRequest",
}) as any as S.Schema<StartArchiveExportRequest>;
export interface StartArchiveExportResponse {
  ExportId?: string;
}
export const StartArchiveExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportId: S.optional(S.String) }),
).annotate({
  identifier: "StartArchiveExportResponse",
}) as any as S.Schema<StartArchiveExportResponse>;
export interface StartArchiveSearchRequest {
  ArchiveId: string;
  Filters?: ArchiveFilters;
  FromTimestamp: Date;
  ToTimestamp: Date;
  MaxResults: number;
}
export const StartArchiveSearchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    Filters: S.optional(ArchiveFilters),
    FromTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ToTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.Number,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartArchiveSearchRequest",
}) as any as S.Schema<StartArchiveSearchRequest>;
export interface StartArchiveSearchResponse {
  SearchId?: string;
}
export const StartArchiveSearchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SearchId: S.optional(S.String) }),
).annotate({
  identifier: "StartArchiveSearchResponse",
}) as any as S.Schema<StartArchiveSearchResponse>;
export interface StopAddressListImportJobRequest {
  JobId: string;
}
export const StopAddressListImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopAddressListImportJobRequest",
}) as any as S.Schema<StopAddressListImportJobRequest>;
export interface StopAddressListImportJobResponse {}
export const StopAddressListImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopAddressListImportJobResponse",
}) as any as S.Schema<StopAddressListImportJobResponse>;
export interface StopArchiveExportRequest {
  ExportId: string;
}
export const StopArchiveExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopArchiveExportRequest",
}) as any as S.Schema<StopArchiveExportRequest>;
export interface StopArchiveExportResponse {}
export const StopArchiveExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopArchiveExportResponse",
}) as any as S.Schema<StopArchiveExportResponse>;
export interface StopArchiveSearchRequest {
  SearchId: string;
}
export const StopArchiveSearchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SearchId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopArchiveSearchRequest",
}) as any as S.Schema<StopArchiveSearchRequest>;
export interface StopArchiveSearchResponse {}
export const StopArchiveSearchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopArchiveSearchResponse",
}) as any as S.Schema<StopArchiveSearchResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
export interface UpdateArchiveRequest {
  ArchiveId: string;
  ArchiveName?: string;
  Retention?: ArchiveRetention;
}
export const UpdateArchiveRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveId: S.String,
    ArchiveName: S.optional(S.String),
    Retention: S.optional(ArchiveRetention),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateArchiveRequest",
}) as any as S.Schema<UpdateArchiveRequest>;
export interface UpdateArchiveResponse {}
export const UpdateArchiveResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateArchiveResponse",
}) as any as S.Schema<UpdateArchiveResponse>;
export type IngressPointStatusToUpdate = "ACTIVE" | "CLOSED" | (string & {});
export const IngressPointStatusToUpdate = /*@__PURE__*/ S.String;

export interface UpdateIngressPointRequest {
  IngressPointId: string;
  IngressPointName?: string;
  StatusToUpdate?: IngressPointStatusToUpdate;
  RuleSetId?: string;
  TrafficPolicyId?: string;
  IngressPointConfiguration?: IngressPointConfiguration;
  TlsPolicy?: TlsPolicy;
}
export const UpdateIngressPointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IngressPointId: S.String,
    IngressPointName: S.optional(S.String),
    StatusToUpdate: S.optional(IngressPointStatusToUpdate),
    RuleSetId: S.optional(S.String),
    TrafficPolicyId: S.optional(S.String),
    IngressPointConfiguration: S.optional(IngressPointConfiguration),
    TlsPolicy: S.optional(TlsPolicy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateIngressPointRequest",
}) as any as S.Schema<UpdateIngressPointRequest>;
export interface UpdateIngressPointResponse {}
export const UpdateIngressPointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateIngressPointResponse",
}) as any as S.Schema<UpdateIngressPointResponse>;
export interface UpdateRelayRequest {
  RelayId: string;
  RelayName?: string;
  ServerName?: string;
  ServerPort?: number;
  Authentication?: RelayAuthentication;
}
export const UpdateRelayRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelayId: S.String,
    RelayName: S.optional(S.String),
    ServerName: S.optional(S.String),
    ServerPort: S.optional(S.Number),
    Authentication: S.optional(RelayAuthentication),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRelayRequest",
}) as any as S.Schema<UpdateRelayRequest>;
export interface UpdateRelayResponse {}
export const UpdateRelayResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRelayResponse",
}) as any as S.Schema<UpdateRelayResponse>;
export interface UpdateRuleSetRequest {
  RuleSetId: string;
  RuleSetName?: string;
  Rules?: Rule[];
}
export const UpdateRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSetId: S.String,
    RuleSetName: S.optional(S.String),
    Rules: S.optional(Rules),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRuleSetRequest",
}) as any as S.Schema<UpdateRuleSetRequest>;
export interface UpdateRuleSetResponse {}
export const UpdateRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRuleSetResponse",
}) as any as S.Schema<UpdateRuleSetResponse>;
export interface UpdateTrafficPolicyRequest {
  TrafficPolicyId: string;
  TrafficPolicyName?: string;
  PolicyStatements?: PolicyStatement[];
  DefaultAction?: AcceptAction;
  MaxMessageSizeBytes?: number;
}
export const UpdateTrafficPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrafficPolicyId: S.String,
    TrafficPolicyName: S.optional(S.String),
    PolicyStatements: S.optional(PolicyStatementList),
    DefaultAction: S.optional(AcceptAction),
    MaxMessageSizeBytes: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTrafficPolicyRequest",
}) as any as S.Schema<UpdateTrafficPolicyRequest>;
export interface UpdateTrafficPolicyResponse {}
export const UpdateTrafficPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTrafficPolicyResponse",
}) as any as S.Schema<UpdateTrafficPolicyResponse>;
export type CreateAddonInstanceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Add On instance for the subscription indicated in the request. The resulting Amazon Resource Name (ARN) can be used in a conditional statement for a rule set or traffic policy.
 */
export const createAddonInstance: API.OperationMethod<
  CreateAddonInstanceRequest,
  CreateAddonInstanceResponse,
  CreateAddonInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAddonInstanceRequest,
  output: CreateAddonInstanceResponse,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddonInstance",
}));

export type CreateAddonSubscriptionError =
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a subscription for an Add On representing the acceptance of its terms of use and additional pricing. The subscription can then be used to create an instance for use in rule sets or traffic policies.
 */
export const createAddonSubscription: API.OperationMethod<
  CreateAddonSubscriptionRequest,
  CreateAddonSubscriptionResponse,
  CreateAddonSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAddonSubscriptionRequest,
  output: CreateAddonSubscriptionResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddonSubscription",
}));

export type CreateAddressListError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new address list.
 */
export const createAddressList: API.OperationMethod<
  CreateAddressListRequest,
  CreateAddressListResponse,
  CreateAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAddressListRequest,
  output: CreateAddressListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddressList",
}));

export type CreateAddressListImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an import job for an address list.
 */
export const createAddressListImportJob: API.OperationMethod<
  CreateAddressListImportJobRequest,
  CreateAddressListImportJobResponse,
  CreateAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAddressListImportJobRequest,
  output: CreateAddressListImportJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddressListImportJob",
}));

export type CreateArchiveError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new email archive resource for storing and retaining emails.
 */
export const createArchive: API.OperationMethod<
  CreateArchiveRequest,
  CreateArchiveResponse,
  CreateArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateArchiveRequest,
  output: CreateArchiveResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateArchive",
}));

export type CreateIngressPointError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Provision a new ingress endpoint resource.
 */
export const createIngressPoint: API.OperationMethod<
  CreateIngressPointRequest,
  CreateIngressPointResponse,
  CreateIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIngressPointRequest,
  output: CreateIngressPointResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngressPoint",
}));

export type CreateRelayError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a relay resource which can be used in rules to relay incoming emails to defined relay destinations.
 */
export const createRelay: API.OperationMethod<
  CreateRelayRequest,
  CreateRelayResponse,
  CreateRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRelayRequest,
  output: CreateRelayResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRelay",
}));

export type CreateRuleSetError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Provision a new rule set.
 */
export const createRuleSet: API.OperationMethod<
  CreateRuleSetRequest,
  CreateRuleSetResponse,
  CreateRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleSetRequest,
  output: CreateRuleSetResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleSet",
}));

export type CreateTrafficPolicyError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Provision a new traffic policy resource.
 */
export const createTrafficPolicy: API.OperationMethod<
  CreateTrafficPolicyRequest,
  CreateTrafficPolicyResponse,
  CreateTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTrafficPolicyRequest,
  output: CreateTrafficPolicyResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrafficPolicy",
}));

export type DeleteAddonInstanceError =
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Add On instance.
 */
export const deleteAddonInstance: API.OperationMethod<
  DeleteAddonInstanceRequest,
  DeleteAddonInstanceResponse,
  DeleteAddonInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAddonInstanceRequest,
  output: DeleteAddonInstanceResponse,
  errors: [ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddonInstance",
}));

export type DeleteAddonSubscriptionError =
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Add On subscription.
 */
export const deleteAddonSubscription: API.OperationMethod<
  DeleteAddonSubscriptionRequest,
  DeleteAddonSubscriptionResponse,
  DeleteAddonSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAddonSubscriptionRequest,
  output: DeleteAddonSubscriptionResponse,
  errors: [ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddonSubscription",
}));

export type DeleteAddressListError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an address list.
 */
export const deleteAddressList: API.OperationMethod<
  DeleteAddressListRequest,
  DeleteAddressListResponse,
  DeleteAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAddressListRequest,
  output: DeleteAddressListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAddressList",
}));

export type DeleteArchiveError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates deletion of an email archive. This changes the archive state to pending deletion. In this state, no new emails can be added, and existing archived emails become inaccessible (search, export, download). The archive and all of its contents will be permanently deleted 30 days after entering the pending deletion state, regardless of the configured retention period.
 */
export const deleteArchive: API.OperationMethod<
  DeleteArchiveRequest,
  DeleteArchiveResponse,
  DeleteArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteArchiveRequest,
  output: DeleteArchiveResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteArchive",
}));

export type DeleteIngressPointError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete an ingress endpoint resource.
 */
export const deleteIngressPoint: API.OperationMethod<
  DeleteIngressPointRequest,
  DeleteIngressPointResponse,
  DeleteIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIngressPointRequest,
  output: DeleteIngressPointResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngressPoint",
}));

export type DeleteRelayError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing relay resource.
 */
export const deleteRelay: API.OperationMethod<
  DeleteRelayRequest,
  DeleteRelayResponse,
  DeleteRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRelayRequest,
  output: DeleteRelayResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRelay",
}));

export type DeleteRuleSetError =
  | ConflictException
  | ValidationException
  | CommonErrors;
/**
 * Delete a rule set.
 */
export const deleteRuleSet: API.OperationMethod<
  DeleteRuleSetRequest,
  DeleteRuleSetResponse,
  DeleteRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleSetRequest,
  output: DeleteRuleSetResponse,
  errors: [ConflictException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleSet",
}));

export type DeleteTrafficPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete a traffic policy resource.
 */
export const deleteTrafficPolicy: API.OperationMethod<
  DeleteTrafficPolicyRequest,
  DeleteTrafficPolicyResponse,
  DeleteTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTrafficPolicyRequest,
  output: DeleteTrafficPolicyResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrafficPolicy",
}));

export type DeregisterMemberFromAddressListError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a member from an address list.
 */
export const deregisterMemberFromAddressList: API.OperationMethod<
  DeregisterMemberFromAddressListRequest,
  DeregisterMemberFromAddressListResponse,
  DeregisterMemberFromAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterMemberFromAddressListRequest,
  output: DeregisterMemberFromAddressListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterMemberFromAddressList",
}));

export type GetAddonInstanceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about an Add On instance.
 */
export const getAddonInstance: API.OperationMethod<
  GetAddonInstanceRequest,
  GetAddonInstanceResponse,
  GetAddonInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAddonInstanceRequest,
  output: GetAddonInstanceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddonInstance",
}));

export type GetAddonSubscriptionError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about an Add On subscription.
 */
export const getAddonSubscription: API.OperationMethod<
  GetAddonSubscriptionRequest,
  GetAddonSubscriptionResponse,
  GetAddonSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAddonSubscriptionRequest,
  output: GetAddonSubscriptionResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddonSubscription",
}));

export type GetAddressListError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of an address list.
 */
export const getAddressList: API.OperationMethod<
  GetAddressListRequest,
  GetAddressListResponse,
  GetAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAddressListRequest,
  output: GetAddressListResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddressList",
}));

export type GetAddressListImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of an import job.
 */
export const getAddressListImportJob: API.OperationMethod<
  GetAddressListImportJobRequest,
  GetAddressListImportJobResponse,
  GetAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAddressListImportJobRequest,
  output: GetAddressListImportJobResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAddressListImportJob",
}));

export type GetArchiveError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full details and current state of a specified email archive.
 */
export const getArchive: API.OperationMethod<
  GetArchiveRequest,
  GetArchiveResponse,
  GetArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchiveRequest,
  output: GetArchiveResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchive",
}));

export type GetArchiveExportError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and current status of a specific email archive export job.
 */
export const getArchiveExport: API.OperationMethod<
  GetArchiveExportRequest,
  GetArchiveExportResponse,
  GetArchiveExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchiveExportRequest,
  output: GetArchiveExportResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveExport",
}));

export type GetArchiveMessageError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a pre-signed URL that provides temporary download access to the specific email message stored in the archive.
 */
export const getArchiveMessage: API.OperationMethod<
  GetArchiveMessageRequest,
  GetArchiveMessageResponse,
  GetArchiveMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchiveMessageRequest,
  output: GetArchiveMessageResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveMessage",
}));

export type GetArchiveMessageContentError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the textual content of a specific email message stored in the archive. Attachments are not included.
 */
export const getArchiveMessageContent: API.OperationMethod<
  GetArchiveMessageContentRequest,
  GetArchiveMessageContentResponse,
  GetArchiveMessageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchiveMessageContentRequest,
  output: GetArchiveMessageContentResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveMessageContent",
}));

export type GetArchiveSearchError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details and current status of a specific email archive search job.
 */
export const getArchiveSearch: API.OperationMethod<
  GetArchiveSearchRequest,
  GetArchiveSearchResponse,
  GetArchiveSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchiveSearchRequest,
  output: GetArchiveSearchResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveSearch",
}));

export type GetArchiveSearchResultsError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the results of a completed email archive search job.
 */
export const getArchiveSearchResults: API.OperationMethod<
  GetArchiveSearchResultsRequest,
  GetArchiveSearchResultsResponse,
  GetArchiveSearchResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchiveSearchResultsRequest,
  output: GetArchiveSearchResultsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchiveSearchResults",
}));

export type GetIngressPointError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch ingress endpoint resource attributes.
 */
export const getIngressPoint: API.OperationMethod<
  GetIngressPointRequest,
  GetIngressPointResponse,
  GetIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIngressPointRequest,
  output: GetIngressPointResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngressPoint",
}));

export type GetMemberOfAddressListError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of a member in an address list.
 */
export const getMemberOfAddressList: API.OperationMethod<
  GetMemberOfAddressListRequest,
  GetMemberOfAddressListResponse,
  GetMemberOfAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMemberOfAddressListRequest,
  output: GetMemberOfAddressListResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemberOfAddressList",
}));

export type GetRelayError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch the relay resource and it's attributes.
 */
export const getRelay: API.OperationMethod<
  GetRelayRequest,
  GetRelayResponse,
  GetRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRelayRequest,
  output: GetRelayResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRelay",
}));

export type GetRuleSetError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of a rule set.
 */
export const getRuleSet: API.OperationMethod<
  GetRuleSetRequest,
  GetRuleSetResponse,
  GetRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuleSetRequest,
  output: GetRuleSetResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuleSet",
}));

export type GetTrafficPolicyError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetch attributes of a traffic policy resource.
 */
export const getTrafficPolicy: API.OperationMethod<
  GetTrafficPolicyRequest,
  GetTrafficPolicyResponse,
  GetTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTrafficPolicyRequest,
  output: GetTrafficPolicyResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrafficPolicy",
}));

export type ListAddonInstancesError = ValidationException | CommonErrors;
/**
 * Lists all Add On instances in your account.
 */
export const listAddonInstances: API.PaginatedOperationMethod<
  ListAddonInstancesRequest,
  ListAddonInstancesResponse,
  ListAddonInstancesError,
  Credentials | HttpClient.HttpClient,
  AddonInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAddonInstancesRequest,
  output: ListAddonInstancesResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddonInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AddonInstances",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListAddonSubscriptionsError = ValidationException | CommonErrors;
/**
 * Lists all Add On subscriptions in your account.
 */
export const listAddonSubscriptions: API.PaginatedOperationMethod<
  ListAddonSubscriptionsRequest,
  ListAddonSubscriptionsResponse,
  ListAddonSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  AddonSubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAddonSubscriptionsRequest,
  output: ListAddonSubscriptionsResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddonSubscriptions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AddonSubscriptions",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListAddressListImportJobsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists jobs for an address list.
 */
export const listAddressListImportJobs: API.PaginatedOperationMethod<
  ListAddressListImportJobsRequest,
  ListAddressListImportJobsResponse,
  ListAddressListImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAddressListImportJobsRequest,
  output: ListAddressListImportJobsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddressListImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ImportJobs",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListAddressListsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists address lists for this account.
 */
export const listAddressLists: API.PaginatedOperationMethod<
  ListAddressListsRequest,
  ListAddressListsResponse,
  ListAddressListsError,
  Credentials | HttpClient.HttpClient,
  AddressList
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAddressListsRequest,
  output: ListAddressListsResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAddressLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AddressLists",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListArchiveExportsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of email archive export jobs.
 */
export const listArchiveExports: API.PaginatedOperationMethod<
  ListArchiveExportsRequest,
  ListArchiveExportsResponse,
  ListArchiveExportsError,
  Credentials | HttpClient.HttpClient,
  ExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListArchiveExportsRequest,
  output: ListArchiveExportsResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchiveExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Exports",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListArchivesError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all email archives in your account.
 */
export const listArchives: API.PaginatedOperationMethod<
  ListArchivesRequest,
  ListArchivesResponse,
  ListArchivesError,
  Credentials | HttpClient.HttpClient,
  Archive
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListArchivesRequest,
  output: ListArchivesResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchives",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Archives",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListArchiveSearchesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of email archive search jobs.
 */
export const listArchiveSearches: API.PaginatedOperationMethod<
  ListArchiveSearchesRequest,
  ListArchiveSearchesResponse,
  ListArchiveSearchesError,
  Credentials | HttpClient.HttpClient,
  SearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListArchiveSearchesRequest,
  output: ListArchiveSearchesResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListArchiveSearches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Searches",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListIngressPointsError = ValidationException | CommonErrors;
/**
 * List all ingress endpoint resources.
 */
export const listIngressPoints: API.PaginatedOperationMethod<
  ListIngressPointsRequest,
  ListIngressPointsResponse,
  ListIngressPointsError,
  Credentials | HttpClient.HttpClient,
  IngressPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIngressPointsRequest,
  output: ListIngressPointsResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngressPoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IngressPoints",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListMembersOfAddressListError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists members of an address list.
 */
export const listMembersOfAddressList: API.PaginatedOperationMethod<
  ListMembersOfAddressListRequest,
  ListMembersOfAddressListResponse,
  ListMembersOfAddressListError,
  Credentials | HttpClient.HttpClient,
  SavedAddress
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMembersOfAddressListRequest,
  output: ListMembersOfAddressListResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMembersOfAddressList",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Addresses",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRelaysError = ValidationException | CommonErrors;
/**
 * Lists all the existing relay resources.
 */
export const listRelays: API.PaginatedOperationMethod<
  ListRelaysRequest,
  ListRelaysResponse,
  ListRelaysError,
  Credentials | HttpClient.HttpClient,
  Relay
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRelaysRequest,
  output: ListRelaysResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRelays",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Relays",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListRuleSetsError = ValidationException | CommonErrors;
/**
 * List rule sets for this account.
 */
export const listRuleSets: API.PaginatedOperationMethod<
  ListRuleSetsRequest,
  ListRuleSetsResponse,
  ListRuleSetsError,
  Credentials | HttpClient.HttpClient,
  RuleSet
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRuleSetsRequest,
  output: ListRuleSetsResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSets",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the list of tags (keys and values) assigned to the resource.
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

export type ListTrafficPoliciesError = ValidationException | CommonErrors;
/**
 * List traffic policy resources.
 */
export const listTrafficPolicies: API.PaginatedOperationMethod<
  ListTrafficPoliciesRequest,
  ListTrafficPoliciesResponse,
  ListTrafficPoliciesError,
  Credentials | HttpClient.HttpClient,
  TrafficPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTrafficPoliciesRequest,
  output: ListTrafficPoliciesResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTrafficPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TrafficPolicies",
    pageSize: "PageSize",
  } as const,
})) as any;

export type RegisterMemberToAddressListError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a member to an address list.
 */
export const registerMemberToAddressList: API.OperationMethod<
  RegisterMemberToAddressListRequest,
  RegisterMemberToAddressListResponse,
  RegisterMemberToAddressListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterMemberToAddressListRequest,
  output: RegisterMemberToAddressListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterMemberToAddressList",
}));

export type StartAddressListImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an import job for an address list.
 */
export const startAddressListImportJob: API.OperationMethod<
  StartAddressListImportJobRequest,
  StartAddressListImportJobResponse,
  StartAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAddressListImportJobRequest,
  output: StartAddressListImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAddressListImportJob",
}));

export type StartArchiveExportError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an export of emails from the specified archive.
 */
export const startArchiveExport: API.OperationMethod<
  StartArchiveExportRequest,
  StartArchiveExportResponse,
  StartArchiveExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartArchiveExportRequest,
  output: StartArchiveExportResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartArchiveExport",
}));

export type StartArchiveSearchError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a search across emails in the specified archive.
 */
export const startArchiveSearch: API.OperationMethod<
  StartArchiveSearchRequest,
  StartArchiveSearchResponse,
  StartArchiveSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartArchiveSearchRequest,
  output: StartArchiveSearchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartArchiveSearch",
}));

export type StopAddressListImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an ongoing import job for an address list.
 */
export const stopAddressListImportJob: API.OperationMethod<
  StopAddressListImportJobRequest,
  StopAddressListImportJobResponse,
  StopAddressListImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAddressListImportJobRequest,
  output: StopAddressListImportJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAddressListImportJob",
}));

export type StopArchiveExportError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an in-progress export of emails from an archive.
 */
export const stopArchiveExport: API.OperationMethod<
  StopArchiveExportRequest,
  StopArchiveExportResponse,
  StopArchiveExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopArchiveExportRequest,
  output: StopArchiveExportResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopArchiveExport",
}));

export type StopArchiveSearchError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an in-progress archive search job.
 */
export const stopArchiveSearch: API.OperationMethod<
  StopArchiveSearchRequest,
  StopArchiveSearchResponse,
  StopArchiveSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopArchiveSearchRequest,
  output: StopArchiveSearchResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopArchiveSearch",
}));

export type TagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags (keys and values) to a specified resource.
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
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Remove one or more tags (keys and values) from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateArchiveError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the attributes of an existing email archive.
 */
export const updateArchive: API.OperationMethod<
  UpdateArchiveRequest,
  UpdateArchiveResponse,
  UpdateArchiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateArchiveRequest,
  output: UpdateArchiveResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateArchive",
}));

export type UpdateIngressPointError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update attributes of a provisioned ingress endpoint resource.
 */
export const updateIngressPoint: API.OperationMethod<
  UpdateIngressPointRequest,
  UpdateIngressPointResponse,
  UpdateIngressPointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIngressPointRequest,
  output: UpdateIngressPointResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIngressPoint",
}));

export type UpdateRelayError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the attributes of an existing relay resource.
 */
export const updateRelay: API.OperationMethod<
  UpdateRelayRequest,
  UpdateRelayResponse,
  UpdateRelayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRelayRequest,
  output: UpdateRelayResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRelay",
}));

export type UpdateRuleSetError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update attributes of an already provisioned rule set.
 */
export const updateRuleSet: API.OperationMethod<
  UpdateRuleSetRequest,
  UpdateRuleSetResponse,
  UpdateRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleSetRequest,
  output: UpdateRuleSetResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleSet",
}));

export type UpdateTrafficPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update attributes of an already provisioned traffic policy resource.
 */
export const updateTrafficPolicy: API.OperationMethod<
  UpdateTrafficPolicyRequest,
  UpdateTrafficPolicyResponse,
  UpdateTrafficPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTrafficPolicyRequest,
  output: UpdateTrafficPolicyResponse,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrafficPolicy",
}));
