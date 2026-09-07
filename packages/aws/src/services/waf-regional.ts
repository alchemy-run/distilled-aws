import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://waf.amazonaws.com/doc/2015-08-24/");
const svc = T.AwsApiService({
  sdkId: "WAF Regional",
  serviceShapeName: "AWSWAF_Regional_20161128",
});
const auth = T.AwsAuthSigv4({ name: "waf-regional" });
const ver = T.ServiceVersion("2016-11-28");
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
              `https://waf-regional-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://waf-regional-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://waf-regional.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://waf-regional.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class WAFBadRequestException
  extends /*@__PURE__*/ S.TaggedError<WAFBadRequestException>()(
    "WAFBadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFDisallowedNameException
  extends /*@__PURE__*/ S.TaggedError<WAFDisallowedNameException>()(
    "WAFDisallowedNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFEntityMigrationException
  extends /*@__PURE__*/ S.TaggedError<WAFEntityMigrationException>()(
    "WAFEntityMigrationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      MigrationErrorType: S.optional(
        S.suspend(() => MigrationErrorType).annotate({
          identifier: "MigrationErrorType",
        }),
      ),
      MigrationErrorReason: S.optional(S.String),
    },
  ) {}
export class WAFInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<WAFInternalErrorException>()(
    "WAFInternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class WAFInvalidAccountException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidAccountException>()(
    "WAFInvalidAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFInvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidOperationException>()(
    "WAFInvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFInvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidParameterException>()(
    "WAFInvalidParameterException",
    {
      field: S.optional(
        S.suspend(() => ParameterExceptionField).annotate({
          identifier: "ParameterExceptionField",
        }),
      ),
      parameter: S.optional(S.String),
      reason: S.optional(
        S.suspend(() => ParameterExceptionReason).annotate({
          identifier: "ParameterExceptionReason",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class WAFInvalidPermissionPolicyException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidPermissionPolicyException>()(
    "WAFInvalidPermissionPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFInvalidRegexPatternException
  extends /*@__PURE__*/ S.TaggedError<WAFInvalidRegexPatternException>()(
    "WAFInvalidRegexPatternException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFLimitsExceededException
  extends /*@__PURE__*/ S.TaggedError<WAFLimitsExceededException>()(
    "WAFLimitsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFNonEmptyEntityException
  extends /*@__PURE__*/ S.TaggedError<WAFNonEmptyEntityException>()(
    "WAFNonEmptyEntityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFNonexistentContainerException
  extends /*@__PURE__*/ S.TaggedError<WAFNonexistentContainerException>()(
    "WAFNonexistentContainerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFNonexistentItemException
  extends /*@__PURE__*/ S.TaggedError<WAFNonexistentItemException>()(
    "WAFNonexistentItemException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFReferencedItemException
  extends /*@__PURE__*/ S.TaggedError<WAFReferencedItemException>()(
    "WAFReferencedItemException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFServiceLinkedRoleErrorException
  extends /*@__PURE__*/ S.TaggedError<WAFServiceLinkedRoleErrorException>()(
    "WAFServiceLinkedRoleErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFStaleDataException
  extends /*@__PURE__*/ S.TaggedError<WAFStaleDataException>()(
    "WAFStaleDataException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFSubscriptionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<WAFSubscriptionNotFoundException>()(
    "WAFSubscriptionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFTagOperationException
  extends /*@__PURE__*/ S.TaggedError<WAFTagOperationException>()(
    "WAFTagOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class WAFTagOperationInternalErrorException
  extends /*@__PURE__*/ S.TaggedError<WAFTagOperationInternalErrorException>()(
    "WAFTagOperationInternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class WAFUnavailableEntityException
  extends /*@__PURE__*/ S.TaggedError<WAFUnavailableEntityException>()(
    "WAFUnavailableEntityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ResourceId = string;
export type ResourceArn = string;
export interface AssociateWebACLRequest {
  WebACLId: string;
  ResourceArn: string;
}
export const AssociateWebACLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACLId: S.String, ResourceArn: S.String }).pipe(
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
  identifier: "AssociateWebACLRequest",
}) as any as S.Schema<AssociateWebACLRequest>;
export interface AssociateWebACLResponse {}
export const AssociateWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateWebACLResponse",
}) as any as S.Schema<AssociateWebACLResponse>;
export type ResourceName = string;
export type ChangeToken = string;
export interface CreateByteMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateByteMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateByteMatchSetRequest",
}) as any as S.Schema<CreateByteMatchSetRequest>;
export type MatchFieldType =
  | "URI"
  | "QUERY_STRING"
  | "HEADER"
  | "METHOD"
  | "BODY"
  | "SINGLE_QUERY_ARG"
  | "ALL_QUERY_ARGS"
  | (string & {});
export const MatchFieldType = /*@__PURE__*/ S.String;

export type MatchFieldData = string;
export interface FieldToMatch {
  Type: MatchFieldType;
  Data?: string;
}
export const FieldToMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: MatchFieldType, Data: S.optional(S.String) }),
).annotate({ identifier: "FieldToMatch" }) as any as S.Schema<FieldToMatch>;
export type ByteMatchTargetString = Uint8Array;
export type TextTransformation =
  | "NONE"
  | "COMPRESS_WHITE_SPACE"
  | "HTML_ENTITY_DECODE"
  | "LOWERCASE"
  | "CMD_LINE"
  | "URL_DECODE"
  | (string & {});
export const TextTransformation = /*@__PURE__*/ S.String;

export type PositionalConstraint =
  | "EXACTLY"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "CONTAINS_WORD"
  | (string & {});
export const PositionalConstraint = /*@__PURE__*/ S.String;

export interface ByteMatchTuple {
  FieldToMatch: FieldToMatch;
  TargetString: Uint8Array;
  TextTransformation: TextTransformation;
  PositionalConstraint: PositionalConstraint;
}
export const ByteMatchTuple = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldToMatch: FieldToMatch,
    TargetString: T.Blob,
    TextTransformation: TextTransformation,
    PositionalConstraint: PositionalConstraint,
  }),
).annotate({ identifier: "ByteMatchTuple" }) as any as S.Schema<ByteMatchTuple>;
export type ByteMatchTuples = ByteMatchTuple[];
export const ByteMatchTuples = /*@__PURE__*/ S.Array(ByteMatchTuple);
export interface ByteMatchSet {
  ByteMatchSetId: string;
  Name?: string;
  ByteMatchTuples: ByteMatchTuple[];
}
export const ByteMatchSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ByteMatchSetId: S.String,
    Name: S.optional(S.String),
    ByteMatchTuples: ByteMatchTuples,
  }),
).annotate({ identifier: "ByteMatchSet" }) as any as S.Schema<ByteMatchSet>;
export interface CreateByteMatchSetResponse {
  ByteMatchSet?: ByteMatchSet;
  ChangeToken?: string;
}
export const CreateByteMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ByteMatchSet: S.optional(ByteMatchSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateByteMatchSetResponse",
}) as any as S.Schema<CreateByteMatchSetResponse>;
export interface CreateGeoMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateGeoMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateGeoMatchSetRequest",
}) as any as S.Schema<CreateGeoMatchSetRequest>;
export type GeoMatchConstraintType = "Country" | (string & {});
export const GeoMatchConstraintType = /*@__PURE__*/ S.String;

export type GeoMatchConstraintValue =
  | "AF"
  | "AX"
  | "AL"
  | "DZ"
  | "AS"
  | "AD"
  | "AO"
  | "AI"
  | "AQ"
  | "AG"
  | "AR"
  | "AM"
  | "AW"
  | "AU"
  | "AT"
  | "AZ"
  | "BS"
  | "BH"
  | "BD"
  | "BB"
  | "BY"
  | "BE"
  | "BZ"
  | "BJ"
  | "BM"
  | "BT"
  | "BO"
  | "BQ"
  | "BA"
  | "BW"
  | "BV"
  | "BR"
  | "IO"
  | "BN"
  | "BG"
  | "BF"
  | "BI"
  | "KH"
  | "CM"
  | "CA"
  | "CV"
  | "KY"
  | "CF"
  | "TD"
  | "CL"
  | "CN"
  | "CX"
  | "CC"
  | "CO"
  | "KM"
  | "CG"
  | "CD"
  | "CK"
  | "CR"
  | "CI"
  | "HR"
  | "CU"
  | "CW"
  | "CY"
  | "CZ"
  | "DK"
  | "DJ"
  | "DM"
  | "DO"
  | "EC"
  | "EG"
  | "SV"
  | "GQ"
  | "ER"
  | "EE"
  | "ET"
  | "FK"
  | "FO"
  | "FJ"
  | "FI"
  | "FR"
  | "GF"
  | "PF"
  | "TF"
  | "GA"
  | "GM"
  | "GE"
  | "DE"
  | "GH"
  | "GI"
  | "GR"
  | "GL"
  | "GD"
  | "GP"
  | "GU"
  | "GT"
  | "GG"
  | "GN"
  | "GW"
  | "GY"
  | "HT"
  | "HM"
  | "VA"
  | "HN"
  | "HK"
  | "HU"
  | "IS"
  | "IN"
  | "ID"
  | "IR"
  | "IQ"
  | "IE"
  | "IM"
  | "IL"
  | "IT"
  | "JM"
  | "JP"
  | "JE"
  | "JO"
  | "KZ"
  | "KE"
  | "KI"
  | "KP"
  | "KR"
  | "KW"
  | "KG"
  | "LA"
  | "LV"
  | "LB"
  | "LS"
  | "LR"
  | "LY"
  | "LI"
  | "LT"
  | "LU"
  | "MO"
  | "MK"
  | "MG"
  | "MW"
  | "MY"
  | "MV"
  | "ML"
  | "MT"
  | "MH"
  | "MQ"
  | "MR"
  | "MU"
  | "YT"
  | "MX"
  | "FM"
  | "MD"
  | "MC"
  | "MN"
  | "ME"
  | "MS"
  | "MA"
  | "MZ"
  | "MM"
  | "NA"
  | "NR"
  | "NP"
  | "NL"
  | "NC"
  | "NZ"
  | "NI"
  | "NE"
  | "NG"
  | "NU"
  | "NF"
  | "MP"
  | "NO"
  | "OM"
  | "PK"
  | "PW"
  | "PS"
  | "PA"
  | "PG"
  | "PY"
  | "PE"
  | "PH"
  | "PN"
  | "PL"
  | "PT"
  | "PR"
  | "QA"
  | "RE"
  | "RO"
  | "RU"
  | "RW"
  | "BL"
  | "SH"
  | "KN"
  | "LC"
  | "MF"
  | "PM"
  | "VC"
  | "WS"
  | "SM"
  | "ST"
  | "SA"
  | "SN"
  | "RS"
  | "SC"
  | "SL"
  | "SG"
  | "SX"
  | "SK"
  | "SI"
  | "SB"
  | "SO"
  | "ZA"
  | "GS"
  | "SS"
  | "ES"
  | "LK"
  | "SD"
  | "SR"
  | "SJ"
  | "SZ"
  | "SE"
  | "CH"
  | "SY"
  | "TW"
  | "TJ"
  | "TZ"
  | "TH"
  | "TL"
  | "TG"
  | "TK"
  | "TO"
  | "TT"
  | "TN"
  | "TR"
  | "TM"
  | "TC"
  | "TV"
  | "UG"
  | "UA"
  | "AE"
  | "GB"
  | "US"
  | "UM"
  | "UY"
  | "UZ"
  | "VU"
  | "VE"
  | "VN"
  | "VG"
  | "VI"
  | "WF"
  | "EH"
  | "YE"
  | "ZM"
  | "ZW"
  | (string & {});
export const GeoMatchConstraintValue = /*@__PURE__*/ S.String;

export interface GeoMatchConstraint {
  Type: GeoMatchConstraintType;
  Value: GeoMatchConstraintValue;
}
export const GeoMatchConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: GeoMatchConstraintType, Value: GeoMatchConstraintValue }),
).annotate({
  identifier: "GeoMatchConstraint",
}) as any as S.Schema<GeoMatchConstraint>;
export type GeoMatchConstraints = GeoMatchConstraint[];
export const GeoMatchConstraints = /*@__PURE__*/ S.Array(GeoMatchConstraint);
export interface GeoMatchSet {
  GeoMatchSetId: string;
  Name?: string;
  GeoMatchConstraints: GeoMatchConstraint[];
}
export const GeoMatchSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeoMatchSetId: S.String,
    Name: S.optional(S.String),
    GeoMatchConstraints: GeoMatchConstraints,
  }),
).annotate({ identifier: "GeoMatchSet" }) as any as S.Schema<GeoMatchSet>;
export interface CreateGeoMatchSetResponse {
  GeoMatchSet?: GeoMatchSet;
  ChangeToken?: string;
}
export const CreateGeoMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeoMatchSet: S.optional(GeoMatchSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateGeoMatchSetResponse",
}) as any as S.Schema<CreateGeoMatchSetResponse>;
export interface CreateIPSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateIPSetRequest",
}) as any as S.Schema<CreateIPSetRequest>;
export type IPSetDescriptorType = "IPV4" | "IPV6" | (string & {});
export const IPSetDescriptorType = /*@__PURE__*/ S.String;

export type IPSetDescriptorValue = string;
export interface IPSetDescriptor {
  Type: IPSetDescriptorType;
  Value: string;
}
export const IPSetDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: IPSetDescriptorType, Value: S.String }),
).annotate({
  identifier: "IPSetDescriptor",
}) as any as S.Schema<IPSetDescriptor>;
export type IPSetDescriptors = IPSetDescriptor[];
export const IPSetDescriptors = /*@__PURE__*/ S.Array(IPSetDescriptor);
export interface IPSet {
  IPSetId: string;
  Name?: string;
  IPSetDescriptors: IPSetDescriptor[];
}
export const IPSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IPSetId: S.String,
    Name: S.optional(S.String),
    IPSetDescriptors: IPSetDescriptors,
  }),
).annotate({ identifier: "IPSet" }) as any as S.Schema<IPSet>;
export interface CreateIPSetResponse {
  IPSet?: IPSet;
  ChangeToken?: string;
}
export const CreateIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IPSet: S.optional(IPSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateIPSetResponse",
}) as any as S.Schema<CreateIPSetResponse>;
export type MetricName = string;
export type RateKey = "IP" | (string & {});
export const RateKey = /*@__PURE__*/ S.String;

export type RateLimit = number;
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
export interface CreateRateBasedRuleRequest {
  Name: string;
  MetricName: string;
  RateKey: RateKey;
  RateLimit: number;
  ChangeToken: string;
  Tags?: Tag[];
}
export const CreateRateBasedRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MetricName: S.String,
    RateKey: RateKey,
    RateLimit: S.Number,
    ChangeToken: S.String,
    Tags: S.optional(TagList),
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
  identifier: "CreateRateBasedRuleRequest",
}) as any as S.Schema<CreateRateBasedRuleRequest>;
export type Negated = boolean;
export type PredicateType =
  | "IPMatch"
  | "ByteMatch"
  | "SqlInjectionMatch"
  | "GeoMatch"
  | "SizeConstraint"
  | "XssMatch"
  | "RegexMatch"
  | (string & {});
export const PredicateType = /*@__PURE__*/ S.String;

export interface Predicate {
  Negated: boolean;
  Type: PredicateType;
  DataId: string;
}
export const Predicate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Negated: S.Boolean, Type: PredicateType, DataId: S.String }),
).annotate({ identifier: "Predicate" }) as any as S.Schema<Predicate>;
export type Predicates = Predicate[];
export const Predicates = /*@__PURE__*/ S.Array(Predicate);
export interface RateBasedRule {
  RuleId: string;
  Name?: string;
  MetricName?: string;
  MatchPredicates: Predicate[];
  RateKey: RateKey;
  RateLimit: number;
}
export const RateBasedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleId: S.String,
    Name: S.optional(S.String),
    MetricName: S.optional(S.String),
    MatchPredicates: Predicates,
    RateKey: RateKey,
    RateLimit: S.Number,
  }),
).annotate({ identifier: "RateBasedRule" }) as any as S.Schema<RateBasedRule>;
export interface CreateRateBasedRuleResponse {
  Rule?: RateBasedRule;
  ChangeToken?: string;
}
export const CreateRateBasedRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Rule: S.optional(RateBasedRule),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateRateBasedRuleResponse",
}) as any as S.Schema<CreateRateBasedRuleResponse>;
export interface CreateRegexMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateRegexMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateRegexMatchSetRequest",
}) as any as S.Schema<CreateRegexMatchSetRequest>;
export interface RegexMatchTuple {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
  RegexPatternSetId: string;
}
export const RegexMatchTuple = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldToMatch: FieldToMatch,
    TextTransformation: TextTransformation,
    RegexPatternSetId: S.String,
  }),
).annotate({
  identifier: "RegexMatchTuple",
}) as any as S.Schema<RegexMatchTuple>;
export type RegexMatchTuples = RegexMatchTuple[];
export const RegexMatchTuples = /*@__PURE__*/ S.Array(RegexMatchTuple);
export interface RegexMatchSet {
  RegexMatchSetId?: string;
  Name?: string;
  RegexMatchTuples?: RegexMatchTuple[];
}
export const RegexMatchSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegexMatchSetId: S.optional(S.String),
    Name: S.optional(S.String),
    RegexMatchTuples: S.optional(RegexMatchTuples),
  }),
).annotate({ identifier: "RegexMatchSet" }) as any as S.Schema<RegexMatchSet>;
export interface CreateRegexMatchSetResponse {
  RegexMatchSet?: RegexMatchSet;
  ChangeToken?: string;
}
export const CreateRegexMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegexMatchSet: S.optional(RegexMatchSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateRegexMatchSetResponse",
}) as any as S.Schema<CreateRegexMatchSetResponse>;
export interface CreateRegexPatternSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateRegexPatternSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateRegexPatternSetRequest",
}) as any as S.Schema<CreateRegexPatternSetRequest>;
export type RegexPatternString = string;
export type RegexPatternStrings = string[];
export const RegexPatternStrings = /*@__PURE__*/ S.Array(S.String);
export interface RegexPatternSet {
  RegexPatternSetId: string;
  Name?: string;
  RegexPatternStrings: string[];
}
export const RegexPatternSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegexPatternSetId: S.String,
    Name: S.optional(S.String),
    RegexPatternStrings: RegexPatternStrings,
  }),
).annotate({
  identifier: "RegexPatternSet",
}) as any as S.Schema<RegexPatternSet>;
export interface CreateRegexPatternSetResponse {
  RegexPatternSet?: RegexPatternSet;
  ChangeToken?: string;
}
export const CreateRegexPatternSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegexPatternSet: S.optional(RegexPatternSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateRegexPatternSetResponse",
}) as any as S.Schema<CreateRegexPatternSetResponse>;
export interface CreateRuleRequest {
  Name: string;
  MetricName: string;
  ChangeToken: string;
  Tags?: Tag[];
}
export const CreateRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MetricName: S.String,
    ChangeToken: S.String,
    Tags: S.optional(TagList),
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
  identifier: "CreateRuleRequest",
}) as any as S.Schema<CreateRuleRequest>;
export interface Rule {
  RuleId: string;
  Name?: string;
  MetricName?: string;
  Predicates: Predicate[];
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleId: S.String,
    Name: S.optional(S.String),
    MetricName: S.optional(S.String),
    Predicates: Predicates,
  }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export interface CreateRuleResponse {
  Rule?: Rule;
  ChangeToken?: string;
}
export const CreateRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rule: S.optional(Rule), ChangeToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateRuleResponse",
}) as any as S.Schema<CreateRuleResponse>;
export interface CreateRuleGroupRequest {
  Name: string;
  MetricName: string;
  ChangeToken: string;
  Tags?: Tag[];
}
export const CreateRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MetricName: S.String,
    ChangeToken: S.String,
    Tags: S.optional(TagList),
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
  identifier: "CreateRuleGroupRequest",
}) as any as S.Schema<CreateRuleGroupRequest>;
export interface RuleGroup {
  RuleGroupId: string;
  Name?: string;
  MetricName?: string;
}
export const RuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupId: S.String,
    Name: S.optional(S.String),
    MetricName: S.optional(S.String),
  }),
).annotate({ identifier: "RuleGroup" }) as any as S.Schema<RuleGroup>;
export interface CreateRuleGroupResponse {
  RuleGroup?: RuleGroup;
  ChangeToken?: string;
}
export const CreateRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroup: S.optional(RuleGroup),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateRuleGroupResponse",
}) as any as S.Schema<CreateRuleGroupResponse>;
export interface CreateSizeConstraintSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateSizeConstraintSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateSizeConstraintSetRequest",
}) as any as S.Schema<CreateSizeConstraintSetRequest>;
export type ComparisonOperator =
  | "EQ"
  | "NE"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | (string & {});
export const ComparisonOperator = /*@__PURE__*/ S.String;

export type Size = number;
export interface SizeConstraint {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
  ComparisonOperator: ComparisonOperator;
  Size: number;
}
export const SizeConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldToMatch: FieldToMatch,
    TextTransformation: TextTransformation,
    ComparisonOperator: ComparisonOperator,
    Size: S.Number,
  }),
).annotate({ identifier: "SizeConstraint" }) as any as S.Schema<SizeConstraint>;
export type SizeConstraints = SizeConstraint[];
export const SizeConstraints = /*@__PURE__*/ S.Array(SizeConstraint);
export interface SizeConstraintSet {
  SizeConstraintSetId: string;
  Name?: string;
  SizeConstraints: SizeConstraint[];
}
export const SizeConstraintSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SizeConstraintSetId: S.String,
    Name: S.optional(S.String),
    SizeConstraints: SizeConstraints,
  }),
).annotate({
  identifier: "SizeConstraintSet",
}) as any as S.Schema<SizeConstraintSet>;
export interface CreateSizeConstraintSetResponse {
  SizeConstraintSet?: SizeConstraintSet;
  ChangeToken?: string;
}
export const CreateSizeConstraintSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SizeConstraintSet: S.optional(SizeConstraintSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateSizeConstraintSetResponse",
}) as any as S.Schema<CreateSizeConstraintSetResponse>;
export interface CreateSqlInjectionMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateSqlInjectionMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateSqlInjectionMatchSetRequest",
}) as any as S.Schema<CreateSqlInjectionMatchSetRequest>;
export interface SqlInjectionMatchTuple {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
}
export const SqlInjectionMatchTuple = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldToMatch: FieldToMatch,
    TextTransformation: TextTransformation,
  }),
).annotate({
  identifier: "SqlInjectionMatchTuple",
}) as any as S.Schema<SqlInjectionMatchTuple>;
export type SqlInjectionMatchTuples = SqlInjectionMatchTuple[];
export const SqlInjectionMatchTuples = /*@__PURE__*/ S.Array(
  SqlInjectionMatchTuple,
);
export interface SqlInjectionMatchSet {
  SqlInjectionMatchSetId: string;
  Name?: string;
  SqlInjectionMatchTuples: SqlInjectionMatchTuple[];
}
export const SqlInjectionMatchSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SqlInjectionMatchSetId: S.String,
    Name: S.optional(S.String),
    SqlInjectionMatchTuples: SqlInjectionMatchTuples,
  }),
).annotate({
  identifier: "SqlInjectionMatchSet",
}) as any as S.Schema<SqlInjectionMatchSet>;
export interface CreateSqlInjectionMatchSetResponse {
  SqlInjectionMatchSet?: SqlInjectionMatchSet;
  ChangeToken?: string;
}
export const CreateSqlInjectionMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SqlInjectionMatchSet: S.optional(SqlInjectionMatchSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateSqlInjectionMatchSetResponse",
}) as any as S.Schema<CreateSqlInjectionMatchSetResponse>;
export type WafActionType = "BLOCK" | "ALLOW" | "COUNT" | (string & {});
export const WafActionType = /*@__PURE__*/ S.String;

export interface WafAction {
  Type: WafActionType;
}
export const WafAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: WafActionType }),
).annotate({ identifier: "WafAction" }) as any as S.Schema<WafAction>;
export interface CreateWebACLRequest {
  Name: string;
  MetricName: string;
  DefaultAction: WafAction;
  ChangeToken: string;
  Tags?: Tag[];
}
export const CreateWebACLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MetricName: S.String,
    DefaultAction: WafAction,
    ChangeToken: S.String,
    Tags: S.optional(TagList),
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
  identifier: "CreateWebACLRequest",
}) as any as S.Schema<CreateWebACLRequest>;
export type RulePriority = number;
export type WafOverrideActionType = "NONE" | "COUNT" | (string & {});
export const WafOverrideActionType = /*@__PURE__*/ S.String;

export interface WafOverrideAction {
  Type: WafOverrideActionType;
}
export const WafOverrideAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: WafOverrideActionType }),
).annotate({
  identifier: "WafOverrideAction",
}) as any as S.Schema<WafOverrideAction>;
export type WafRuleType = "REGULAR" | "RATE_BASED" | "GROUP" | (string & {});
export const WafRuleType = /*@__PURE__*/ S.String;

export interface ExcludedRule {
  RuleId: string;
}
export const ExcludedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String }),
).annotate({ identifier: "ExcludedRule" }) as any as S.Schema<ExcludedRule>;
export type ExcludedRules = ExcludedRule[];
export const ExcludedRules = /*@__PURE__*/ S.Array(ExcludedRule);
export interface ActivatedRule {
  Priority: number;
  RuleId: string;
  Action?: WafAction;
  OverrideAction?: WafOverrideAction;
  Type?: WafRuleType;
  ExcludedRules?: ExcludedRule[];
}
export const ActivatedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Priority: S.Number,
    RuleId: S.String,
    Action: S.optional(WafAction),
    OverrideAction: S.optional(WafOverrideAction),
    Type: S.optional(WafRuleType),
    ExcludedRules: S.optional(ExcludedRules),
  }),
).annotate({ identifier: "ActivatedRule" }) as any as S.Schema<ActivatedRule>;
export type ActivatedRules = ActivatedRule[];
export const ActivatedRules = /*@__PURE__*/ S.Array(ActivatedRule);
export interface WebACL {
  WebACLId: string;
  Name?: string;
  MetricName?: string;
  DefaultAction: WafAction;
  Rules: ActivatedRule[];
  WebACLArn?: string;
}
export const WebACL = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebACLId: S.String,
    Name: S.optional(S.String),
    MetricName: S.optional(S.String),
    DefaultAction: WafAction,
    Rules: ActivatedRules,
    WebACLArn: S.optional(S.String),
  }),
).annotate({ identifier: "WebACL" }) as any as S.Schema<WebACL>;
export interface CreateWebACLResponse {
  WebACL?: WebACL;
  ChangeToken?: string;
}
export const CreateWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebACL: S.optional(WebACL),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateWebACLResponse",
}) as any as S.Schema<CreateWebACLResponse>;
export type S3BucketName = string;
export type IgnoreUnsupportedType = boolean;
export interface CreateWebACLMigrationStackRequest {
  WebACLId: string;
  S3BucketName: string;
  IgnoreUnsupportedType: boolean;
}
export const CreateWebACLMigrationStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebACLId: S.String,
    S3BucketName: S.String,
    IgnoreUnsupportedType: S.Boolean,
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
  identifier: "CreateWebACLMigrationStackRequest",
}) as any as S.Schema<CreateWebACLMigrationStackRequest>;
export type S3ObjectUrl = string;
export interface CreateWebACLMigrationStackResponse {
  S3ObjectUrl: string;
}
export const CreateWebACLMigrationStackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3ObjectUrl: S.String }).pipe(ns),
).annotate({
  identifier: "CreateWebACLMigrationStackResponse",
}) as any as S.Schema<CreateWebACLMigrationStackResponse>;
export interface CreateXssMatchSetRequest {
  Name: string;
  ChangeToken: string;
}
export const CreateXssMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "CreateXssMatchSetRequest",
}) as any as S.Schema<CreateXssMatchSetRequest>;
export interface XssMatchTuple {
  FieldToMatch: FieldToMatch;
  TextTransformation: TextTransformation;
}
export const XssMatchTuple = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldToMatch: FieldToMatch,
    TextTransformation: TextTransformation,
  }),
).annotate({ identifier: "XssMatchTuple" }) as any as S.Schema<XssMatchTuple>;
export type XssMatchTuples = XssMatchTuple[];
export const XssMatchTuples = /*@__PURE__*/ S.Array(XssMatchTuple);
export interface XssMatchSet {
  XssMatchSetId: string;
  Name?: string;
  XssMatchTuples: XssMatchTuple[];
}
export const XssMatchSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    XssMatchSetId: S.String,
    Name: S.optional(S.String),
    XssMatchTuples: XssMatchTuples,
  }),
).annotate({ identifier: "XssMatchSet" }) as any as S.Schema<XssMatchSet>;
export interface CreateXssMatchSetResponse {
  XssMatchSet?: XssMatchSet;
  ChangeToken?: string;
}
export const CreateXssMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    XssMatchSet: S.optional(XssMatchSet),
    ChangeToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateXssMatchSetResponse",
}) as any as S.Schema<CreateXssMatchSetResponse>;
export interface DeleteByteMatchSetRequest {
  ByteMatchSetId: string;
  ChangeToken: string;
}
export const DeleteByteMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByteMatchSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteByteMatchSetRequest",
}) as any as S.Schema<DeleteByteMatchSetRequest>;
export interface DeleteByteMatchSetResponse {
  ChangeToken?: string;
}
export const DeleteByteMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteByteMatchSetResponse",
}) as any as S.Schema<DeleteByteMatchSetResponse>;
export interface DeleteGeoMatchSetRequest {
  GeoMatchSetId: string;
  ChangeToken: string;
}
export const DeleteGeoMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeoMatchSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteGeoMatchSetRequest",
}) as any as S.Schema<DeleteGeoMatchSetRequest>;
export interface DeleteGeoMatchSetResponse {
  ChangeToken?: string;
}
export const DeleteGeoMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteGeoMatchSetResponse",
}) as any as S.Schema<DeleteGeoMatchSetResponse>;
export interface DeleteIPSetRequest {
  IPSetId: string;
  ChangeToken: string;
}
export const DeleteIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteIPSetRequest",
}) as any as S.Schema<DeleteIPSetRequest>;
export interface DeleteIPSetResponse {
  ChangeToken?: string;
}
export const DeleteIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteIPSetResponse",
}) as any as S.Schema<DeleteIPSetResponse>;
export interface DeleteLoggingConfigurationRequest {
  ResourceArn: string;
}
export const DeleteLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeleteLoggingConfigurationRequest",
}) as any as S.Schema<DeleteLoggingConfigurationRequest>;
export interface DeleteLoggingConfigurationResponse {}
export const DeleteLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLoggingConfigurationResponse",
}) as any as S.Schema<DeleteLoggingConfigurationResponse>;
export interface DeletePermissionPolicyRequest {
  ResourceArn: string;
}
export const DeletePermissionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeletePermissionPolicyRequest",
}) as any as S.Schema<DeletePermissionPolicyRequest>;
export interface DeletePermissionPolicyResponse {}
export const DeletePermissionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePermissionPolicyResponse",
}) as any as S.Schema<DeletePermissionPolicyResponse>;
export interface DeleteRateBasedRuleRequest {
  RuleId: string;
  ChangeToken: string;
}
export const DeleteRateBasedRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteRateBasedRuleRequest",
}) as any as S.Schema<DeleteRateBasedRuleRequest>;
export interface DeleteRateBasedRuleResponse {
  ChangeToken?: string;
}
export const DeleteRateBasedRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRateBasedRuleResponse",
}) as any as S.Schema<DeleteRateBasedRuleResponse>;
export interface DeleteRegexMatchSetRequest {
  RegexMatchSetId: string;
  ChangeToken: string;
}
export const DeleteRegexMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexMatchSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteRegexMatchSetRequest",
}) as any as S.Schema<DeleteRegexMatchSetRequest>;
export interface DeleteRegexMatchSetResponse {
  ChangeToken?: string;
}
export const DeleteRegexMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRegexMatchSetResponse",
}) as any as S.Schema<DeleteRegexMatchSetResponse>;
export interface DeleteRegexPatternSetRequest {
  RegexPatternSetId: string;
  ChangeToken: string;
}
export const DeleteRegexPatternSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexPatternSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteRegexPatternSetRequest",
}) as any as S.Schema<DeleteRegexPatternSetRequest>;
export interface DeleteRegexPatternSetResponse {
  ChangeToken?: string;
}
export const DeleteRegexPatternSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRegexPatternSetResponse",
}) as any as S.Schema<DeleteRegexPatternSetResponse>;
export interface DeleteRuleRequest {
  RuleId: string;
  ChangeToken: string;
}
export const DeleteRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteRuleRequest",
}) as any as S.Schema<DeleteRuleRequest>;
export interface DeleteRuleResponse {
  ChangeToken?: string;
}
export const DeleteRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRuleResponse",
}) as any as S.Schema<DeleteRuleResponse>;
export interface DeleteRuleGroupRequest {
  RuleGroupId: string;
  ChangeToken: string;
}
export const DeleteRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleGroupId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteRuleGroupRequest",
}) as any as S.Schema<DeleteRuleGroupRequest>;
export interface DeleteRuleGroupResponse {
  ChangeToken?: string;
}
export const DeleteRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRuleGroupResponse",
}) as any as S.Schema<DeleteRuleGroupResponse>;
export interface DeleteSizeConstraintSetRequest {
  SizeConstraintSetId: string;
  ChangeToken: string;
}
export const DeleteSizeConstraintSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SizeConstraintSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteSizeConstraintSetRequest",
}) as any as S.Schema<DeleteSizeConstraintSetRequest>;
export interface DeleteSizeConstraintSetResponse {
  ChangeToken?: string;
}
export const DeleteSizeConstraintSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteSizeConstraintSetResponse",
}) as any as S.Schema<DeleteSizeConstraintSetResponse>;
export interface DeleteSqlInjectionMatchSetRequest {
  SqlInjectionMatchSetId: string;
  ChangeToken: string;
}
export const DeleteSqlInjectionMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SqlInjectionMatchSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteSqlInjectionMatchSetRequest",
}) as any as S.Schema<DeleteSqlInjectionMatchSetRequest>;
export interface DeleteSqlInjectionMatchSetResponse {
  ChangeToken?: string;
}
export const DeleteSqlInjectionMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteSqlInjectionMatchSetResponse",
}) as any as S.Schema<DeleteSqlInjectionMatchSetResponse>;
export interface DeleteWebACLRequest {
  WebACLId: string;
  ChangeToken: string;
}
export const DeleteWebACLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACLId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteWebACLRequest",
}) as any as S.Schema<DeleteWebACLRequest>;
export interface DeleteWebACLResponse {
  ChangeToken?: string;
}
export const DeleteWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteWebACLResponse",
}) as any as S.Schema<DeleteWebACLResponse>;
export interface DeleteXssMatchSetRequest {
  XssMatchSetId: string;
  ChangeToken: string;
}
export const DeleteXssMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XssMatchSetId: S.String, ChangeToken: S.String }).pipe(
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
  identifier: "DeleteXssMatchSetRequest",
}) as any as S.Schema<DeleteXssMatchSetRequest>;
export interface DeleteXssMatchSetResponse {
  ChangeToken?: string;
}
export const DeleteXssMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteXssMatchSetResponse",
}) as any as S.Schema<DeleteXssMatchSetResponse>;
export interface DisassociateWebACLRequest {
  ResourceArn: string;
}
export const DisassociateWebACLRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DisassociateWebACLRequest",
}) as any as S.Schema<DisassociateWebACLRequest>;
export interface DisassociateWebACLResponse {}
export const DisassociateWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateWebACLResponse",
}) as any as S.Schema<DisassociateWebACLResponse>;
export interface GetByteMatchSetRequest {
  ByteMatchSetId: string;
}
export const GetByteMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByteMatchSetId: S.String }).pipe(
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
  identifier: "GetByteMatchSetRequest",
}) as any as S.Schema<GetByteMatchSetRequest>;
export interface GetByteMatchSetResponse {
  ByteMatchSet?: ByteMatchSet;
}
export const GetByteMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByteMatchSet: S.optional(ByteMatchSet) }).pipe(ns),
).annotate({
  identifier: "GetByteMatchSetResponse",
}) as any as S.Schema<GetByteMatchSetResponse>;
export interface GetChangeTokenRequest {}
export const GetChangeTokenRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetChangeTokenRequest",
}) as any as S.Schema<GetChangeTokenRequest>;
export interface GetChangeTokenResponse {
  ChangeToken?: string;
}
export const GetChangeTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetChangeTokenResponse",
}) as any as S.Schema<GetChangeTokenResponse>;
export interface GetChangeTokenStatusRequest {
  ChangeToken: string;
}
export const GetChangeTokenStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.String }).pipe(
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
  identifier: "GetChangeTokenStatusRequest",
}) as any as S.Schema<GetChangeTokenStatusRequest>;
export type ChangeTokenStatus =
  | "PROVISIONED"
  | "PENDING"
  | "INSYNC"
  | (string & {});
export const ChangeTokenStatus = /*@__PURE__*/ S.String;

export interface GetChangeTokenStatusResponse {
  ChangeTokenStatus?: ChangeTokenStatus;
}
export const GetChangeTokenStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeTokenStatus: S.optional(ChangeTokenStatus) }).pipe(ns),
).annotate({
  identifier: "GetChangeTokenStatusResponse",
}) as any as S.Schema<GetChangeTokenStatusResponse>;
export interface GetGeoMatchSetRequest {
  GeoMatchSetId: string;
}
export const GetGeoMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeoMatchSetId: S.String }).pipe(
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
  identifier: "GetGeoMatchSetRequest",
}) as any as S.Schema<GetGeoMatchSetRequest>;
export interface GetGeoMatchSetResponse {
  GeoMatchSet?: GeoMatchSet;
}
export const GetGeoMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeoMatchSet: S.optional(GeoMatchSet) }).pipe(ns),
).annotate({
  identifier: "GetGeoMatchSetResponse",
}) as any as S.Schema<GetGeoMatchSetResponse>;
export interface GetIPSetRequest {
  IPSetId: string;
}
export const GetIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPSetId: S.String }).pipe(
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
  identifier: "GetIPSetRequest",
}) as any as S.Schema<GetIPSetRequest>;
export interface GetIPSetResponse {
  IPSet?: IPSet;
}
export const GetIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPSet: S.optional(IPSet) }).pipe(ns),
).annotate({
  identifier: "GetIPSetResponse",
}) as any as S.Schema<GetIPSetResponse>;
export interface GetLoggingConfigurationRequest {
  ResourceArn: string;
}
export const GetLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetLoggingConfigurationRequest",
}) as any as S.Schema<GetLoggingConfigurationRequest>;
export type LogDestinationConfigs = string[];
export const LogDestinationConfigs = /*@__PURE__*/ S.Array(S.String);
export type RedactedFields = FieldToMatch[];
export const RedactedFields = /*@__PURE__*/ S.Array(FieldToMatch);
export interface LoggingConfiguration {
  ResourceArn: string;
  LogDestinationConfigs: string[];
  RedactedFields?: FieldToMatch[];
}
export const LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    LogDestinationConfigs: LogDestinationConfigs,
    RedactedFields: S.optional(RedactedFields),
  }),
).annotate({
  identifier: "LoggingConfiguration",
}) as any as S.Schema<LoggingConfiguration>;
export interface GetLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export const GetLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoggingConfiguration: S.optional(LoggingConfiguration) }).pipe(ns),
).annotate({
  identifier: "GetLoggingConfigurationResponse",
}) as any as S.Schema<GetLoggingConfigurationResponse>;
export interface GetPermissionPolicyRequest {
  ResourceArn: string;
}
export const GetPermissionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetPermissionPolicyRequest",
}) as any as S.Schema<GetPermissionPolicyRequest>;
export type PolicyString = string;
export interface GetPermissionPolicyResponse {
  Policy?: string;
}
export const GetPermissionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetPermissionPolicyResponse",
}) as any as S.Schema<GetPermissionPolicyResponse>;
export interface GetRateBasedRuleRequest {
  RuleId: string;
}
export const GetRateBasedRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String }).pipe(
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
  identifier: "GetRateBasedRuleRequest",
}) as any as S.Schema<GetRateBasedRuleRequest>;
export interface GetRateBasedRuleResponse {
  Rule?: RateBasedRule;
}
export const GetRateBasedRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rule: S.optional(RateBasedRule) }).pipe(ns),
).annotate({
  identifier: "GetRateBasedRuleResponse",
}) as any as S.Schema<GetRateBasedRuleResponse>;
export type NextMarker = string;
export interface GetRateBasedRuleManagedKeysRequest {
  RuleId: string;
  NextMarker?: string;
}
export const GetRateBasedRuleManagedKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String, NextMarker: S.optional(S.String) }).pipe(
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
  identifier: "GetRateBasedRuleManagedKeysRequest",
}) as any as S.Schema<GetRateBasedRuleManagedKeysRequest>;
export type ManagedKey = string;
export type ManagedKeys = string[];
export const ManagedKeys = /*@__PURE__*/ S.Array(S.String);
export interface GetRateBasedRuleManagedKeysResponse {
  ManagedKeys?: string[];
  NextMarker?: string;
}
export const GetRateBasedRuleManagedKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedKeys: S.optional(ManagedKeys),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetRateBasedRuleManagedKeysResponse",
}) as any as S.Schema<GetRateBasedRuleManagedKeysResponse>;
export interface GetRegexMatchSetRequest {
  RegexMatchSetId: string;
}
export const GetRegexMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexMatchSetId: S.String }).pipe(
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
  identifier: "GetRegexMatchSetRequest",
}) as any as S.Schema<GetRegexMatchSetRequest>;
export interface GetRegexMatchSetResponse {
  RegexMatchSet?: RegexMatchSet;
}
export const GetRegexMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexMatchSet: S.optional(RegexMatchSet) }).pipe(ns),
).annotate({
  identifier: "GetRegexMatchSetResponse",
}) as any as S.Schema<GetRegexMatchSetResponse>;
export interface GetRegexPatternSetRequest {
  RegexPatternSetId: string;
}
export const GetRegexPatternSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexPatternSetId: S.String }).pipe(
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
  identifier: "GetRegexPatternSetRequest",
}) as any as S.Schema<GetRegexPatternSetRequest>;
export interface GetRegexPatternSetResponse {
  RegexPatternSet?: RegexPatternSet;
}
export const GetRegexPatternSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexPatternSet: S.optional(RegexPatternSet) }).pipe(ns),
).annotate({
  identifier: "GetRegexPatternSetResponse",
}) as any as S.Schema<GetRegexPatternSetResponse>;
export interface GetRuleRequest {
  RuleId: string;
}
export const GetRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String }).pipe(
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
).annotate({ identifier: "GetRuleRequest" }) as any as S.Schema<GetRuleRequest>;
export interface GetRuleResponse {
  Rule?: Rule;
}
export const GetRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rule: S.optional(Rule) }).pipe(ns),
).annotate({
  identifier: "GetRuleResponse",
}) as any as S.Schema<GetRuleResponse>;
export interface GetRuleGroupRequest {
  RuleGroupId: string;
}
export const GetRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleGroupId: S.String }).pipe(
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
  identifier: "GetRuleGroupRequest",
}) as any as S.Schema<GetRuleGroupRequest>;
export interface GetRuleGroupResponse {
  RuleGroup?: RuleGroup;
}
export const GetRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleGroup: S.optional(RuleGroup) }).pipe(ns),
).annotate({
  identifier: "GetRuleGroupResponse",
}) as any as S.Schema<GetRuleGroupResponse>;
export interface TimeWindow {
  StartTime: Date;
  EndTime: Date;
}
export const TimeWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TimeWindow" }) as any as S.Schema<TimeWindow>;
export type GetSampledRequestsMaxItems = number;
export interface GetSampledRequestsRequest {
  WebAclId: string;
  RuleId: string;
  TimeWindow: TimeWindow;
  MaxItems: number;
}
export const GetSampledRequestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebAclId: S.String,
    RuleId: S.String,
    TimeWindow: TimeWindow,
    MaxItems: S.Number,
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
  identifier: "GetSampledRequestsRequest",
}) as any as S.Schema<GetSampledRequestsRequest>;
export type IPString = string;
export type Country = string;
export type URIString = string;
export type HTTPMethod = string;
export type HTTPVersion = string;
export type HeaderName = string;
export type HeaderValue = string;
export interface HTTPHeader {
  Name?: string;
  Value?: string;
}
export const HTTPHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "HTTPHeader" }) as any as S.Schema<HTTPHeader>;
export type HTTPHeaders = HTTPHeader[];
export const HTTPHeaders = /*@__PURE__*/ S.Array(HTTPHeader);
export interface HTTPRequest {
  ClientIP?: string;
  Country?: string;
  URI?: string;
  Method?: string;
  HTTPVersion?: string;
  Headers?: HTTPHeader[];
}
export const HTTPRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientIP: S.optional(S.String),
    Country: S.optional(S.String),
    URI: S.optional(S.String),
    Method: S.optional(S.String),
    HTTPVersion: S.optional(S.String),
    Headers: S.optional(HTTPHeaders),
  }),
).annotate({ identifier: "HTTPRequest" }) as any as S.Schema<HTTPRequest>;
export type SampleWeight = number;
export type Action = string;
export interface SampledHTTPRequest {
  Request: HTTPRequest;
  Weight: number;
  Timestamp?: Date;
  Action?: string;
  RuleWithinRuleGroup?: string;
}
export const SampledHTTPRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Request: HTTPRequest,
    Weight: S.Number,
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Action: S.optional(S.String),
    RuleWithinRuleGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "SampledHTTPRequest",
}) as any as S.Schema<SampledHTTPRequest>;
export type SampledHTTPRequests = SampledHTTPRequest[];
export const SampledHTTPRequests = /*@__PURE__*/ S.Array(SampledHTTPRequest);
export type PopulationSize = number;
export interface GetSampledRequestsResponse {
  SampledRequests?: SampledHTTPRequest[];
  PopulationSize?: number;
  TimeWindow?: TimeWindow;
}
export const GetSampledRequestsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SampledRequests: S.optional(SampledHTTPRequests),
    PopulationSize: S.optional(S.Number),
    TimeWindow: S.optional(TimeWindow),
  }).pipe(ns),
).annotate({
  identifier: "GetSampledRequestsResponse",
}) as any as S.Schema<GetSampledRequestsResponse>;
export interface GetSizeConstraintSetRequest {
  SizeConstraintSetId: string;
}
export const GetSizeConstraintSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SizeConstraintSetId: S.String }).pipe(
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
  identifier: "GetSizeConstraintSetRequest",
}) as any as S.Schema<GetSizeConstraintSetRequest>;
export interface GetSizeConstraintSetResponse {
  SizeConstraintSet?: SizeConstraintSet;
}
export const GetSizeConstraintSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SizeConstraintSet: S.optional(SizeConstraintSet) }).pipe(ns),
).annotate({
  identifier: "GetSizeConstraintSetResponse",
}) as any as S.Schema<GetSizeConstraintSetResponse>;
export interface GetSqlInjectionMatchSetRequest {
  SqlInjectionMatchSetId: string;
}
export const GetSqlInjectionMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SqlInjectionMatchSetId: S.String }).pipe(
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
  identifier: "GetSqlInjectionMatchSetRequest",
}) as any as S.Schema<GetSqlInjectionMatchSetRequest>;
export interface GetSqlInjectionMatchSetResponse {
  SqlInjectionMatchSet?: SqlInjectionMatchSet;
}
export const GetSqlInjectionMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SqlInjectionMatchSet: S.optional(SqlInjectionMatchSet) }).pipe(ns),
).annotate({
  identifier: "GetSqlInjectionMatchSetResponse",
}) as any as S.Schema<GetSqlInjectionMatchSetResponse>;
export interface GetWebACLRequest {
  WebACLId: string;
}
export const GetWebACLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACLId: S.String }).pipe(
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
  identifier: "GetWebACLRequest",
}) as any as S.Schema<GetWebACLRequest>;
export interface GetWebACLResponse {
  WebACL?: WebACL;
}
export const GetWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACL: S.optional(WebACL) }).pipe(ns),
).annotate({
  identifier: "GetWebACLResponse",
}) as any as S.Schema<GetWebACLResponse>;
export interface GetWebACLForResourceRequest {
  ResourceArn: string;
}
export const GetWebACLForResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetWebACLForResourceRequest",
}) as any as S.Schema<GetWebACLForResourceRequest>;
export interface WebACLSummary {
  WebACLId: string;
  Name: string;
}
export const WebACLSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACLId: S.String, Name: S.String }),
).annotate({ identifier: "WebACLSummary" }) as any as S.Schema<WebACLSummary>;
export interface GetWebACLForResourceResponse {
  WebACLSummary?: WebACLSummary;
}
export const GetWebACLForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACLSummary: S.optional(WebACLSummary) }).pipe(ns),
).annotate({
  identifier: "GetWebACLForResourceResponse",
}) as any as S.Schema<GetWebACLForResourceResponse>;
export interface GetXssMatchSetRequest {
  XssMatchSetId: string;
}
export const GetXssMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XssMatchSetId: S.String }).pipe(
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
  identifier: "GetXssMatchSetRequest",
}) as any as S.Schema<GetXssMatchSetRequest>;
export interface GetXssMatchSetResponse {
  XssMatchSet?: XssMatchSet;
}
export const GetXssMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XssMatchSet: S.optional(XssMatchSet) }).pipe(ns),
).annotate({
  identifier: "GetXssMatchSetResponse",
}) as any as S.Schema<GetXssMatchSetResponse>;
export type PaginationLimit = number;
export interface ListActivatedRulesInRuleGroupRequest {
  RuleGroupId?: string;
  NextMarker?: string;
  Limit?: number;
}
export const ListActivatedRulesInRuleGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RuleGroupId: S.optional(S.String),
      NextMarker: S.optional(S.String),
      Limit: S.optional(S.Number),
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
  identifier: "ListActivatedRulesInRuleGroupRequest",
}) as any as S.Schema<ListActivatedRulesInRuleGroupRequest>;
export interface ListActivatedRulesInRuleGroupResponse {
  NextMarker?: string;
  ActivatedRules?: ActivatedRule[];
}
export const ListActivatedRulesInRuleGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextMarker: S.optional(S.String),
      ActivatedRules: S.optional(ActivatedRules),
    }).pipe(ns),
).annotate({
  identifier: "ListActivatedRulesInRuleGroupResponse",
}) as any as S.Schema<ListActivatedRulesInRuleGroupResponse>;
export interface ListByteMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListByteMatchSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListByteMatchSetsRequest",
}) as any as S.Schema<ListByteMatchSetsRequest>;
export interface ByteMatchSetSummary {
  ByteMatchSetId: string;
  Name: string;
}
export const ByteMatchSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByteMatchSetId: S.String, Name: S.String }),
).annotate({
  identifier: "ByteMatchSetSummary",
}) as any as S.Schema<ByteMatchSetSummary>;
export type ByteMatchSetSummaries = ByteMatchSetSummary[];
export const ByteMatchSetSummaries = /*@__PURE__*/ S.Array(ByteMatchSetSummary);
export interface ListByteMatchSetsResponse {
  NextMarker?: string;
  ByteMatchSets?: ByteMatchSetSummary[];
}
export const ListByteMatchSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    ByteMatchSets: S.optional(ByteMatchSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListByteMatchSetsResponse",
}) as any as S.Schema<ListByteMatchSetsResponse>;
export interface ListGeoMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListGeoMatchSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListGeoMatchSetsRequest",
}) as any as S.Schema<ListGeoMatchSetsRequest>;
export interface GeoMatchSetSummary {
  GeoMatchSetId: string;
  Name: string;
}
export const GeoMatchSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeoMatchSetId: S.String, Name: S.String }),
).annotate({
  identifier: "GeoMatchSetSummary",
}) as any as S.Schema<GeoMatchSetSummary>;
export type GeoMatchSetSummaries = GeoMatchSetSummary[];
export const GeoMatchSetSummaries = /*@__PURE__*/ S.Array(GeoMatchSetSummary);
export interface ListGeoMatchSetsResponse {
  NextMarker?: string;
  GeoMatchSets?: GeoMatchSetSummary[];
}
export const ListGeoMatchSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    GeoMatchSets: S.optional(GeoMatchSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListGeoMatchSetsResponse",
}) as any as S.Schema<ListGeoMatchSetsResponse>;
export interface ListIPSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListIPSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListIPSetsRequest",
}) as any as S.Schema<ListIPSetsRequest>;
export interface IPSetSummary {
  IPSetId: string;
  Name: string;
}
export const IPSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IPSetId: S.String, Name: S.String }),
).annotate({ identifier: "IPSetSummary" }) as any as S.Schema<IPSetSummary>;
export type IPSetSummaries = IPSetSummary[];
export const IPSetSummaries = /*@__PURE__*/ S.Array(IPSetSummary);
export interface ListIPSetsResponse {
  NextMarker?: string;
  IPSets?: IPSetSummary[];
}
export const ListIPSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    IPSets: S.optional(IPSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListIPSetsResponse",
}) as any as S.Schema<ListIPSetsResponse>;
export interface ListLoggingConfigurationsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListLoggingConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListLoggingConfigurationsRequest",
}) as any as S.Schema<ListLoggingConfigurationsRequest>;
export type LoggingConfigurations = LoggingConfiguration[];
export const LoggingConfigurations =
  /*@__PURE__*/ S.Array(LoggingConfiguration);
export interface ListLoggingConfigurationsResponse {
  LoggingConfigurations?: LoggingConfiguration[];
  NextMarker?: string;
}
export const ListLoggingConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LoggingConfigurations: S.optional(LoggingConfigurations),
    NextMarker: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLoggingConfigurationsResponse",
}) as any as S.Schema<ListLoggingConfigurationsResponse>;
export interface ListRateBasedRulesRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListRateBasedRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListRateBasedRulesRequest",
}) as any as S.Schema<ListRateBasedRulesRequest>;
export interface RuleSummary {
  RuleId: string;
  Name: string;
}
export const RuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleId: S.String, Name: S.String }),
).annotate({ identifier: "RuleSummary" }) as any as S.Schema<RuleSummary>;
export type RuleSummaries = RuleSummary[];
export const RuleSummaries = /*@__PURE__*/ S.Array(RuleSummary);
export interface ListRateBasedRulesResponse {
  NextMarker?: string;
  Rules?: RuleSummary[];
}
export const ListRateBasedRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Rules: S.optional(RuleSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListRateBasedRulesResponse",
}) as any as S.Schema<ListRateBasedRulesResponse>;
export interface ListRegexMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListRegexMatchSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListRegexMatchSetsRequest",
}) as any as S.Schema<ListRegexMatchSetsRequest>;
export interface RegexMatchSetSummary {
  RegexMatchSetId: string;
  Name: string;
}
export const RegexMatchSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexMatchSetId: S.String, Name: S.String }),
).annotate({
  identifier: "RegexMatchSetSummary",
}) as any as S.Schema<RegexMatchSetSummary>;
export type RegexMatchSetSummaries = RegexMatchSetSummary[];
export const RegexMatchSetSummaries =
  /*@__PURE__*/ S.Array(RegexMatchSetSummary);
export interface ListRegexMatchSetsResponse {
  NextMarker?: string;
  RegexMatchSets?: RegexMatchSetSummary[];
}
export const ListRegexMatchSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    RegexMatchSets: S.optional(RegexMatchSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListRegexMatchSetsResponse",
}) as any as S.Schema<ListRegexMatchSetsResponse>;
export interface ListRegexPatternSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListRegexPatternSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListRegexPatternSetsRequest",
}) as any as S.Schema<ListRegexPatternSetsRequest>;
export interface RegexPatternSetSummary {
  RegexPatternSetId: string;
  Name: string;
}
export const RegexPatternSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegexPatternSetId: S.String, Name: S.String }),
).annotate({
  identifier: "RegexPatternSetSummary",
}) as any as S.Schema<RegexPatternSetSummary>;
export type RegexPatternSetSummaries = RegexPatternSetSummary[];
export const RegexPatternSetSummaries = /*@__PURE__*/ S.Array(
  RegexPatternSetSummary,
);
export interface ListRegexPatternSetsResponse {
  NextMarker?: string;
  RegexPatternSets?: RegexPatternSetSummary[];
}
export const ListRegexPatternSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    RegexPatternSets: S.optional(RegexPatternSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListRegexPatternSetsResponse",
}) as any as S.Schema<ListRegexPatternSetsResponse>;
export type ResourceType =
  | "APPLICATION_LOAD_BALANCER"
  | "API_GATEWAY"
  | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export interface ListResourcesForWebACLRequest {
  WebACLId: string;
  ResourceType?: ResourceType;
}
export const ListResourcesForWebACLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WebACLId: S.String, ResourceType: S.optional(ResourceType) }).pipe(
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
  identifier: "ListResourcesForWebACLRequest",
}) as any as S.Schema<ListResourcesForWebACLRequest>;
export type ResourceArns = string[];
export const ResourceArns = /*@__PURE__*/ S.Array(S.String);
export interface ListResourcesForWebACLResponse {
  ResourceArns?: string[];
}
export const ListResourcesForWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArns: S.optional(ResourceArns) }).pipe(ns),
).annotate({
  identifier: "ListResourcesForWebACLResponse",
}) as any as S.Schema<ListResourcesForWebACLResponse>;
export interface ListRuleGroupsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListRuleGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListRuleGroupsRequest",
}) as any as S.Schema<ListRuleGroupsRequest>;
export interface RuleGroupSummary {
  RuleGroupId: string;
  Name: string;
}
export const RuleGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleGroupId: S.String, Name: S.String }),
).annotate({
  identifier: "RuleGroupSummary",
}) as any as S.Schema<RuleGroupSummary>;
export type RuleGroupSummaries = RuleGroupSummary[];
export const RuleGroupSummaries = /*@__PURE__*/ S.Array(RuleGroupSummary);
export interface ListRuleGroupsResponse {
  NextMarker?: string;
  RuleGroups?: RuleGroupSummary[];
}
export const ListRuleGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    RuleGroups: S.optional(RuleGroupSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListRuleGroupsResponse",
}) as any as S.Schema<ListRuleGroupsResponse>;
export interface ListRulesRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListRulesRequest",
}) as any as S.Schema<ListRulesRequest>;
export interface ListRulesResponse {
  NextMarker?: string;
  Rules?: RuleSummary[];
}
export const ListRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Rules: S.optional(RuleSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListRulesResponse",
}) as any as S.Schema<ListRulesResponse>;
export interface ListSizeConstraintSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListSizeConstraintSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListSizeConstraintSetsRequest",
}) as any as S.Schema<ListSizeConstraintSetsRequest>;
export interface SizeConstraintSetSummary {
  SizeConstraintSetId: string;
  Name: string;
}
export const SizeConstraintSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SizeConstraintSetId: S.String, Name: S.String }),
).annotate({
  identifier: "SizeConstraintSetSummary",
}) as any as S.Schema<SizeConstraintSetSummary>;
export type SizeConstraintSetSummaries = SizeConstraintSetSummary[];
export const SizeConstraintSetSummaries = /*@__PURE__*/ S.Array(
  SizeConstraintSetSummary,
);
export interface ListSizeConstraintSetsResponse {
  NextMarker?: string;
  SizeConstraintSets?: SizeConstraintSetSummary[];
}
export const ListSizeConstraintSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    SizeConstraintSets: S.optional(SizeConstraintSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListSizeConstraintSetsResponse",
}) as any as S.Schema<ListSizeConstraintSetsResponse>;
export interface ListSqlInjectionMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListSqlInjectionMatchSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListSqlInjectionMatchSetsRequest",
}) as any as S.Schema<ListSqlInjectionMatchSetsRequest>;
export interface SqlInjectionMatchSetSummary {
  SqlInjectionMatchSetId: string;
  Name: string;
}
export const SqlInjectionMatchSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SqlInjectionMatchSetId: S.String, Name: S.String }),
).annotate({
  identifier: "SqlInjectionMatchSetSummary",
}) as any as S.Schema<SqlInjectionMatchSetSummary>;
export type SqlInjectionMatchSetSummaries = SqlInjectionMatchSetSummary[];
export const SqlInjectionMatchSetSummaries = /*@__PURE__*/ S.Array(
  SqlInjectionMatchSetSummary,
);
export interface ListSqlInjectionMatchSetsResponse {
  NextMarker?: string;
  SqlInjectionMatchSets?: SqlInjectionMatchSetSummary[];
}
export const ListSqlInjectionMatchSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    SqlInjectionMatchSets: S.optional(SqlInjectionMatchSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListSqlInjectionMatchSetsResponse",
}) as any as S.Schema<ListSqlInjectionMatchSetsResponse>;
export interface ListSubscribedRuleGroupsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListSubscribedRuleGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListSubscribedRuleGroupsRequest",
}) as any as S.Schema<ListSubscribedRuleGroupsRequest>;
export interface SubscribedRuleGroupSummary {
  RuleGroupId: string;
  Name: string;
  MetricName: string;
}
export const SubscribedRuleGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleGroupId: S.String, Name: S.String, MetricName: S.String }),
).annotate({
  identifier: "SubscribedRuleGroupSummary",
}) as any as S.Schema<SubscribedRuleGroupSummary>;
export type SubscribedRuleGroupSummaries = SubscribedRuleGroupSummary[];
export const SubscribedRuleGroupSummaries = /*@__PURE__*/ S.Array(
  SubscribedRuleGroupSummary,
);
export interface ListSubscribedRuleGroupsResponse {
  NextMarker?: string;
  RuleGroups?: SubscribedRuleGroupSummary[];
}
export const ListSubscribedRuleGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    RuleGroups: S.optional(SubscribedRuleGroupSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListSubscribedRuleGroupsResponse",
}) as any as S.Schema<ListSubscribedRuleGroupsResponse>;
export interface ListTagsForResourceRequest {
  NextMarker?: string;
  Limit?: number;
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
    ResourceARN: S.String,
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface TagInfoForResource {
  ResourceARN?: string;
  TagList?: Tag[];
}
export const TagInfoForResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.optional(S.String), TagList: S.optional(TagList) }),
).annotate({
  identifier: "TagInfoForResource",
}) as any as S.Schema<TagInfoForResource>;
export interface ListTagsForResourceResponse {
  NextMarker?: string;
  TagInfoForResource?: TagInfoForResource;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    TagInfoForResource: S.optional(TagInfoForResource),
  }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWebACLsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListWebACLsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListWebACLsRequest",
}) as any as S.Schema<ListWebACLsRequest>;
export type WebACLSummaries = WebACLSummary[];
export const WebACLSummaries = /*@__PURE__*/ S.Array(WebACLSummary);
export interface ListWebACLsResponse {
  NextMarker?: string;
  WebACLs?: WebACLSummary[];
}
export const ListWebACLsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    WebACLs: S.optional(WebACLSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListWebACLsResponse",
}) as any as S.Schema<ListWebACLsResponse>;
export interface ListXssMatchSetsRequest {
  NextMarker?: string;
  Limit?: number;
}
export const ListXssMatchSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    Limit: S.optional(S.Number),
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
  identifier: "ListXssMatchSetsRequest",
}) as any as S.Schema<ListXssMatchSetsRequest>;
export interface XssMatchSetSummary {
  XssMatchSetId: string;
  Name: string;
}
export const XssMatchSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XssMatchSetId: S.String, Name: S.String }),
).annotate({
  identifier: "XssMatchSetSummary",
}) as any as S.Schema<XssMatchSetSummary>;
export type XssMatchSetSummaries = XssMatchSetSummary[];
export const XssMatchSetSummaries = /*@__PURE__*/ S.Array(XssMatchSetSummary);
export interface ListXssMatchSetsResponse {
  NextMarker?: string;
  XssMatchSets?: XssMatchSetSummary[];
}
export const ListXssMatchSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextMarker: S.optional(S.String),
    XssMatchSets: S.optional(XssMatchSetSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListXssMatchSetsResponse",
}) as any as S.Schema<ListXssMatchSetsResponse>;
export interface PutLoggingConfigurationRequest {
  LoggingConfiguration: LoggingConfiguration;
}
export const PutLoggingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoggingConfiguration: LoggingConfiguration }).pipe(
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
  identifier: "PutLoggingConfigurationRequest",
}) as any as S.Schema<PutLoggingConfigurationRequest>;
export interface PutLoggingConfigurationResponse {
  LoggingConfiguration?: LoggingConfiguration;
}
export const PutLoggingConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LoggingConfiguration: S.optional(LoggingConfiguration) }).pipe(ns),
).annotate({
  identifier: "PutLoggingConfigurationResponse",
}) as any as S.Schema<PutLoggingConfigurationResponse>;
export interface PutPermissionPolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export const PutPermissionPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
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
  identifier: "PutPermissionPolicyRequest",
}) as any as S.Schema<PutPermissionPolicyRequest>;
export interface PutPermissionPolicyResponse {}
export const PutPermissionPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutPermissionPolicyResponse",
}) as any as S.Schema<PutPermissionPolicyResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
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
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type ChangeAction = "INSERT" | "DELETE" | (string & {});
export const ChangeAction = /*@__PURE__*/ S.String;

export interface ByteMatchSetUpdate {
  Action: ChangeAction;
  ByteMatchTuple: ByteMatchTuple;
}
export const ByteMatchSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, ByteMatchTuple: ByteMatchTuple }),
).annotate({
  identifier: "ByteMatchSetUpdate",
}) as any as S.Schema<ByteMatchSetUpdate>;
export type ByteMatchSetUpdates = ByteMatchSetUpdate[];
export const ByteMatchSetUpdates = /*@__PURE__*/ S.Array(ByteMatchSetUpdate);
export interface UpdateByteMatchSetRequest {
  ByteMatchSetId: string;
  ChangeToken: string;
  Updates: ByteMatchSetUpdate[];
}
export const UpdateByteMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ByteMatchSetId: S.String,
    ChangeToken: S.String,
    Updates: ByteMatchSetUpdates,
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
  identifier: "UpdateByteMatchSetRequest",
}) as any as S.Schema<UpdateByteMatchSetRequest>;
export interface UpdateByteMatchSetResponse {
  ChangeToken?: string;
}
export const UpdateByteMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateByteMatchSetResponse",
}) as any as S.Schema<UpdateByteMatchSetResponse>;
export interface GeoMatchSetUpdate {
  Action: ChangeAction;
  GeoMatchConstraint: GeoMatchConstraint;
}
export const GeoMatchSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, GeoMatchConstraint: GeoMatchConstraint }),
).annotate({
  identifier: "GeoMatchSetUpdate",
}) as any as S.Schema<GeoMatchSetUpdate>;
export type GeoMatchSetUpdates = GeoMatchSetUpdate[];
export const GeoMatchSetUpdates = /*@__PURE__*/ S.Array(GeoMatchSetUpdate);
export interface UpdateGeoMatchSetRequest {
  GeoMatchSetId: string;
  ChangeToken: string;
  Updates: GeoMatchSetUpdate[];
}
export const UpdateGeoMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeoMatchSetId: S.String,
    ChangeToken: S.String,
    Updates: GeoMatchSetUpdates,
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
  identifier: "UpdateGeoMatchSetRequest",
}) as any as S.Schema<UpdateGeoMatchSetRequest>;
export interface UpdateGeoMatchSetResponse {
  ChangeToken?: string;
}
export const UpdateGeoMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateGeoMatchSetResponse",
}) as any as S.Schema<UpdateGeoMatchSetResponse>;
export interface IPSetUpdate {
  Action: ChangeAction;
  IPSetDescriptor: IPSetDescriptor;
}
export const IPSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, IPSetDescriptor: IPSetDescriptor }),
).annotate({ identifier: "IPSetUpdate" }) as any as S.Schema<IPSetUpdate>;
export type IPSetUpdates = IPSetUpdate[];
export const IPSetUpdates = /*@__PURE__*/ S.Array(IPSetUpdate);
export interface UpdateIPSetRequest {
  IPSetId: string;
  ChangeToken: string;
  Updates: IPSetUpdate[];
}
export const UpdateIPSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IPSetId: S.String,
    ChangeToken: S.String,
    Updates: IPSetUpdates,
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
  identifier: "UpdateIPSetRequest",
}) as any as S.Schema<UpdateIPSetRequest>;
export interface UpdateIPSetResponse {
  ChangeToken?: string;
}
export const UpdateIPSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateIPSetResponse",
}) as any as S.Schema<UpdateIPSetResponse>;
export interface RuleUpdate {
  Action: ChangeAction;
  Predicate: Predicate;
}
export const RuleUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, Predicate: Predicate }),
).annotate({ identifier: "RuleUpdate" }) as any as S.Schema<RuleUpdate>;
export type RuleUpdates = RuleUpdate[];
export const RuleUpdates = /*@__PURE__*/ S.Array(RuleUpdate);
export interface UpdateRateBasedRuleRequest {
  RuleId: string;
  ChangeToken: string;
  Updates: RuleUpdate[];
  RateLimit: number;
}
export const UpdateRateBasedRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleId: S.String,
    ChangeToken: S.String,
    Updates: RuleUpdates,
    RateLimit: S.Number,
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
  identifier: "UpdateRateBasedRuleRequest",
}) as any as S.Schema<UpdateRateBasedRuleRequest>;
export interface UpdateRateBasedRuleResponse {
  ChangeToken?: string;
}
export const UpdateRateBasedRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateRateBasedRuleResponse",
}) as any as S.Schema<UpdateRateBasedRuleResponse>;
export interface RegexMatchSetUpdate {
  Action: ChangeAction;
  RegexMatchTuple: RegexMatchTuple;
}
export const RegexMatchSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, RegexMatchTuple: RegexMatchTuple }),
).annotate({
  identifier: "RegexMatchSetUpdate",
}) as any as S.Schema<RegexMatchSetUpdate>;
export type RegexMatchSetUpdates = RegexMatchSetUpdate[];
export const RegexMatchSetUpdates = /*@__PURE__*/ S.Array(RegexMatchSetUpdate);
export interface UpdateRegexMatchSetRequest {
  RegexMatchSetId: string;
  Updates: RegexMatchSetUpdate[];
  ChangeToken: string;
}
export const UpdateRegexMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegexMatchSetId: S.String,
    Updates: RegexMatchSetUpdates,
    ChangeToken: S.String,
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
  identifier: "UpdateRegexMatchSetRequest",
}) as any as S.Schema<UpdateRegexMatchSetRequest>;
export interface UpdateRegexMatchSetResponse {
  ChangeToken?: string;
}
export const UpdateRegexMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateRegexMatchSetResponse",
}) as any as S.Schema<UpdateRegexMatchSetResponse>;
export interface RegexPatternSetUpdate {
  Action: ChangeAction;
  RegexPatternString: string;
}
export const RegexPatternSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, RegexPatternString: S.String }),
).annotate({
  identifier: "RegexPatternSetUpdate",
}) as any as S.Schema<RegexPatternSetUpdate>;
export type RegexPatternSetUpdates = RegexPatternSetUpdate[];
export const RegexPatternSetUpdates = /*@__PURE__*/ S.Array(
  RegexPatternSetUpdate,
);
export interface UpdateRegexPatternSetRequest {
  RegexPatternSetId: string;
  Updates: RegexPatternSetUpdate[];
  ChangeToken: string;
}
export const UpdateRegexPatternSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegexPatternSetId: S.String,
    Updates: RegexPatternSetUpdates,
    ChangeToken: S.String,
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
  identifier: "UpdateRegexPatternSetRequest",
}) as any as S.Schema<UpdateRegexPatternSetRequest>;
export interface UpdateRegexPatternSetResponse {
  ChangeToken?: string;
}
export const UpdateRegexPatternSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateRegexPatternSetResponse",
}) as any as S.Schema<UpdateRegexPatternSetResponse>;
export interface UpdateRuleRequest {
  RuleId: string;
  ChangeToken: string;
  Updates: RuleUpdate[];
}
export const UpdateRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleId: S.String,
    ChangeToken: S.String,
    Updates: RuleUpdates,
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
  identifier: "UpdateRuleRequest",
}) as any as S.Schema<UpdateRuleRequest>;
export interface UpdateRuleResponse {
  ChangeToken?: string;
}
export const UpdateRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateRuleResponse",
}) as any as S.Schema<UpdateRuleResponse>;
export interface RuleGroupUpdate {
  Action: ChangeAction;
  ActivatedRule: ActivatedRule;
}
export const RuleGroupUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, ActivatedRule: ActivatedRule }),
).annotate({
  identifier: "RuleGroupUpdate",
}) as any as S.Schema<RuleGroupUpdate>;
export type RuleGroupUpdates = RuleGroupUpdate[];
export const RuleGroupUpdates = /*@__PURE__*/ S.Array(RuleGroupUpdate);
export interface UpdateRuleGroupRequest {
  RuleGroupId: string;
  Updates: RuleGroupUpdate[];
  ChangeToken: string;
}
export const UpdateRuleGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleGroupId: S.String,
    Updates: RuleGroupUpdates,
    ChangeToken: S.String,
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
  identifier: "UpdateRuleGroupRequest",
}) as any as S.Schema<UpdateRuleGroupRequest>;
export interface UpdateRuleGroupResponse {
  ChangeToken?: string;
}
export const UpdateRuleGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateRuleGroupResponse",
}) as any as S.Schema<UpdateRuleGroupResponse>;
export interface SizeConstraintSetUpdate {
  Action: ChangeAction;
  SizeConstraint: SizeConstraint;
}
export const SizeConstraintSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, SizeConstraint: SizeConstraint }),
).annotate({
  identifier: "SizeConstraintSetUpdate",
}) as any as S.Schema<SizeConstraintSetUpdate>;
export type SizeConstraintSetUpdates = SizeConstraintSetUpdate[];
export const SizeConstraintSetUpdates = /*@__PURE__*/ S.Array(
  SizeConstraintSetUpdate,
);
export interface UpdateSizeConstraintSetRequest {
  SizeConstraintSetId: string;
  ChangeToken: string;
  Updates: SizeConstraintSetUpdate[];
}
export const UpdateSizeConstraintSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SizeConstraintSetId: S.String,
    ChangeToken: S.String,
    Updates: SizeConstraintSetUpdates,
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
  identifier: "UpdateSizeConstraintSetRequest",
}) as any as S.Schema<UpdateSizeConstraintSetRequest>;
export interface UpdateSizeConstraintSetResponse {
  ChangeToken?: string;
}
export const UpdateSizeConstraintSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateSizeConstraintSetResponse",
}) as any as S.Schema<UpdateSizeConstraintSetResponse>;
export interface SqlInjectionMatchSetUpdate {
  Action: ChangeAction;
  SqlInjectionMatchTuple: SqlInjectionMatchTuple;
}
export const SqlInjectionMatchSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: ChangeAction,
    SqlInjectionMatchTuple: SqlInjectionMatchTuple,
  }),
).annotate({
  identifier: "SqlInjectionMatchSetUpdate",
}) as any as S.Schema<SqlInjectionMatchSetUpdate>;
export type SqlInjectionMatchSetUpdates = SqlInjectionMatchSetUpdate[];
export const SqlInjectionMatchSetUpdates = /*@__PURE__*/ S.Array(
  SqlInjectionMatchSetUpdate,
);
export interface UpdateSqlInjectionMatchSetRequest {
  SqlInjectionMatchSetId: string;
  ChangeToken: string;
  Updates: SqlInjectionMatchSetUpdate[];
}
export const UpdateSqlInjectionMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SqlInjectionMatchSetId: S.String,
    ChangeToken: S.String,
    Updates: SqlInjectionMatchSetUpdates,
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
  identifier: "UpdateSqlInjectionMatchSetRequest",
}) as any as S.Schema<UpdateSqlInjectionMatchSetRequest>;
export interface UpdateSqlInjectionMatchSetResponse {
  ChangeToken?: string;
}
export const UpdateSqlInjectionMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateSqlInjectionMatchSetResponse",
}) as any as S.Schema<UpdateSqlInjectionMatchSetResponse>;
export interface WebACLUpdate {
  Action: ChangeAction;
  ActivatedRule: ActivatedRule;
}
export const WebACLUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, ActivatedRule: ActivatedRule }),
).annotate({ identifier: "WebACLUpdate" }) as any as S.Schema<WebACLUpdate>;
export type WebACLUpdates = WebACLUpdate[];
export const WebACLUpdates = /*@__PURE__*/ S.Array(WebACLUpdate);
export interface UpdateWebACLRequest {
  WebACLId: string;
  ChangeToken: string;
  Updates?: WebACLUpdate[];
  DefaultAction?: WafAction;
}
export const UpdateWebACLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebACLId: S.String,
    ChangeToken: S.String,
    Updates: S.optional(WebACLUpdates),
    DefaultAction: S.optional(WafAction),
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
  identifier: "UpdateWebACLRequest",
}) as any as S.Schema<UpdateWebACLRequest>;
export interface UpdateWebACLResponse {
  ChangeToken?: string;
}
export const UpdateWebACLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateWebACLResponse",
}) as any as S.Schema<UpdateWebACLResponse>;
export interface XssMatchSetUpdate {
  Action: ChangeAction;
  XssMatchTuple: XssMatchTuple;
}
export const XssMatchSetUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Action: ChangeAction, XssMatchTuple: XssMatchTuple }),
).annotate({
  identifier: "XssMatchSetUpdate",
}) as any as S.Schema<XssMatchSetUpdate>;
export type XssMatchSetUpdates = XssMatchSetUpdate[];
export const XssMatchSetUpdates = /*@__PURE__*/ S.Array(XssMatchSetUpdate);
export interface UpdateXssMatchSetRequest {
  XssMatchSetId: string;
  ChangeToken: string;
  Updates: XssMatchSetUpdate[];
}
export const UpdateXssMatchSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    XssMatchSetId: S.String,
    ChangeToken: S.String,
    Updates: XssMatchSetUpdates,
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
  identifier: "UpdateXssMatchSetRequest",
}) as any as S.Schema<UpdateXssMatchSetRequest>;
export interface UpdateXssMatchSetResponse {
  ChangeToken?: string;
}
export const UpdateXssMatchSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChangeToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateXssMatchSetResponse",
}) as any as S.Schema<UpdateXssMatchSetResponse>;
export type ErrorMessage = string;
export type ParameterExceptionField =
  | "CHANGE_ACTION"
  | "WAF_ACTION"
  | "WAF_OVERRIDE_ACTION"
  | "PREDICATE_TYPE"
  | "IPSET_TYPE"
  | "BYTE_MATCH_FIELD_TYPE"
  | "SQL_INJECTION_MATCH_FIELD_TYPE"
  | "BYTE_MATCH_TEXT_TRANSFORMATION"
  | "BYTE_MATCH_POSITIONAL_CONSTRAINT"
  | "SIZE_CONSTRAINT_COMPARISON_OPERATOR"
  | "GEO_MATCH_LOCATION_TYPE"
  | "GEO_MATCH_LOCATION_VALUE"
  | "RATE_KEY"
  | "RULE_TYPE"
  | "NEXT_MARKER"
  | "RESOURCE_ARN"
  | "TAGS"
  | "TAG_KEYS"
  | (string & {});
export const ParameterExceptionField = /*@__PURE__*/ S.String;

export type ParameterExceptionParameter = string;
export type ParameterExceptionReason =
  | "INVALID_OPTION"
  | "ILLEGAL_COMBINATION"
  | "ILLEGAL_ARGUMENT"
  | "INVALID_TAG_KEY"
  | (string & {});
export const ParameterExceptionReason = /*@__PURE__*/ S.String;

export type MigrationErrorType =
  | "ENTITY_NOT_SUPPORTED"
  | "ENTITY_NOT_FOUND"
  | "S3_BUCKET_NO_PERMISSION"
  | "S3_BUCKET_NOT_ACCESSIBLE"
  | "S3_BUCKET_NOT_FOUND"
  | "S3_BUCKET_INVALID_REGION"
  | "S3_INTERNAL_ERROR"
  | (string & {});
export const MigrationErrorType = /*@__PURE__*/ S.String;

export type ErrorReason = string;
export type AssociateWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * This is **AWS WAF Classic Regional** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Associates a web ACL with a resource, either an application load balancer or Amazon API Gateway stage.
 */
export const associateWebACL: API.OperationMethod<
  AssociateWebACLRequest,
  AssociateWebACLResponse,
  AssociateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateWebACLRequest,
  output: AssociateWebACLResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateWebACL",
}));

export type CreateByteMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `ByteMatchSet`. You then use UpdateByteMatchSet to identify the part of a
 * web request that you want AWS WAF to inspect, such as the values of the `User-Agent` header or the query string.
 * For example, you can create a `ByteMatchSet` that matches any requests with `User-Agent` headers
 * that contain the string `BadBot`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `ByteMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateByteMatchSet` request.
 *
 * - Submit a `CreateByteMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateByteMatchSet` request.
 *
 * - Submit an UpdateByteMatchSet request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createByteMatchSet: API.OperationMethod<
  CreateByteMatchSetRequest,
  CreateByteMatchSetResponse,
  CreateByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateByteMatchSetRequest,
  output: CreateByteMatchSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateByteMatchSet",
}));

export type CreateGeoMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates an GeoMatchSet, which you use to specify which web requests you want to allow or block based on the country
 * that the requests originate from. For example, if you're receiving a lot of requests from one or more countries and you want to block the requests, you can create an `GeoMatchSet` that contains those countries and then configure AWS WAF to block the requests.
 *
 * To create and configure a `GeoMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateGeoMatchSet` request.
 *
 * - Submit a `CreateGeoMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateGeoMatchSet request.
 *
 * - Submit an `UpdateGeoMatchSetSet` request to specify the countries that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createGeoMatchSet: API.OperationMethod<
  CreateGeoMatchSetRequest,
  CreateGeoMatchSetResponse,
  CreateGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGeoMatchSetRequest,
  output: CreateGeoMatchSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGeoMatchSet",
}));

export type CreateIPSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates an IPSet, which you use to specify which web requests
 * that
 * you want to allow or block based on the IP addresses that the requests
 * originate from. For example, if you're receiving a lot of requests from one or more
 * individual IP addresses or one or more ranges of IP addresses and you want to block the
 * requests, you can create an `IPSet` that contains those IP addresses and then
 * configure AWS WAF to block the requests.
 *
 * To create and configure an `IPSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateIPSet` request.
 *
 * - Submit a `CreateIPSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateIPSet request.
 *
 * - Submit an `UpdateIPSet` request to specify the IP addresses that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
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
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIPSet",
}));

export type CreateRateBasedRuleError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a RateBasedRule. The `RateBasedRule` contains a
 * `RateLimit`, which specifies the maximum number of requests that AWS WAF allows
 * from a specified IP address in a five-minute period.
 * The `RateBasedRule` also
 * contains the `IPSet` objects, `ByteMatchSet` objects, and other
 * predicates that identify the requests that you want to count or block if these requests
 * exceed the `RateLimit`.
 *
 * If you add more than one predicate to a `RateBasedRule`, a request not
 * only must exceed the `RateLimit`, but it also must match all the
 * conditions to be counted or blocked. For example, suppose you add the following to a
 * `RateBasedRule`:
 *
 * - An `IPSet` that matches the IP address `192.0.2.44/32`
 *
 * - A `ByteMatchSet` that matches `BadBot` in the
 * `User-Agent` header
 *
 * Further, you specify a `RateLimit` of 1,000.
 *
 * You then add the `RateBasedRule` to a `WebACL` and specify that
 * you want to block requests that meet the conditions in the rule. For a request to be
 * blocked, it must come from the IP address 192.0.2.44 *and* the
 * `User-Agent` header in the request must contain the value
 * `BadBot`. Further, requests that match these two conditions must be received at
 * a rate of more than 1,000 requests every five minutes. If both conditions are met and the
 * rate is exceeded, AWS WAF blocks the requests. If the rate drops below 1,000 for a
 * five-minute period, AWS WAF no longer blocks the requests.
 *
 * As a second example, suppose you want to limit requests to a particular page on your site. To do this, you could add the following to a
 * `RateBasedRule`:
 *
 * - A `ByteMatchSet` with `FieldToMatch` of `URI`
 *
 * - A `PositionalConstraint` of `STARTS_WITH`
 *
 * - A `TargetString` of `login`
 *
 * Further, you specify a `RateLimit` of 1,000.
 *
 * By adding this `RateBasedRule` to a `WebACL`, you could limit requests to your login page without affecting the rest of your site.
 *
 * To create and configure a `RateBasedRule`, perform the following
 * steps:
 *
 * - Create and update the predicates that you want to include in the rule. For more
 * information, see CreateByteMatchSet, CreateIPSet,
 * and CreateSqlInjectionMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide
 * in the `ChangeToken` parameter of a `CreateRule`
 * request.
 *
 * - Submit a `CreateRateBasedRule` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the
 * `ChangeToken` parameter of an UpdateRule
 * request.
 *
 * - Submit an `UpdateRateBasedRule` request to specify the predicates
 * that you want to include in the rule.
 *
 * - Create and update a `WebACL` that contains the
 * `RateBasedRule`. For more information, see CreateWebACL.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests,
 * see the AWS WAF Developer
 * Guide.
 */
export const createRateBasedRule: API.OperationMethod<
  CreateRateBasedRuleRequest,
  CreateRateBasedRuleResponse,
  CreateRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRateBasedRuleRequest,
  output: CreateRateBasedRuleResponse,
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRateBasedRule",
}));

export type CreateRegexMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a RegexMatchSet. You then use UpdateRegexMatchSet to identify the part of a
 * web request that you want AWS WAF to inspect, such as the values of the `User-Agent` header or the query string.
 * For example, you can create a `RegexMatchSet` that contains a `RegexMatchTuple` that looks for any requests with `User-Agent` headers
 * that match a `RegexPatternSet` with pattern `B[a@]dB[o0]t`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `RegexMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateRegexMatchSet` request.
 *
 * - Submit a `CreateRegexMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexMatchSet` request.
 *
 * - Submit an UpdateRegexMatchSet request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value, using a `RegexPatternSet`, that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRegexMatchSet: API.OperationMethod<
  CreateRegexMatchSetRequest,
  CreateRegexMatchSetResponse,
  CreateRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegexMatchSetRequest,
  output: CreateRegexMatchSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexMatchSet",
}));

export type CreateRegexPatternSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `RegexPatternSet`. You then use UpdateRegexPatternSet to specify the regular expression (regex) pattern that you want AWS WAF to search for, such as `B[a@]dB[o0]t`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `RegexPatternSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateRegexPatternSet` request.
 *
 * - Submit a `CreateRegexPatternSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexPatternSet` request.
 *
 * - Submit an UpdateRegexPatternSet request to specify the string that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRegexPatternSet: API.OperationMethod<
  CreateRegexPatternSetRequest,
  CreateRegexPatternSetResponse,
  CreateRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegexPatternSetRequest,
  output: CreateRegexPatternSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegexPatternSet",
}));

export type CreateRuleError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `Rule`, which contains the `IPSet` objects,
 * `ByteMatchSet` objects, and other predicates that identify the requests that
 * you want to block. If you add more than one predicate to a `Rule`, a request
 * must match all of the specifications to be allowed or blocked. For example, suppose
 * that
 * you add the following to a `Rule`:
 *
 * - An `IPSet` that matches the IP address `192.0.2.44/32`
 *
 * - A `ByteMatchSet` that matches `BadBot` in the `User-Agent` header
 *
 * You then add the `Rule` to a `WebACL` and specify that you want to blocks requests that satisfy the `Rule`.
 * For a request to be blocked, it must come from the IP address 192.0.2.44 *and* the `User-Agent` header in the request
 * must contain the value `BadBot`.
 *
 * To create and configure a `Rule`, perform the following steps:
 *
 * - Create and update the predicates that you want to include in the `Rule`. For more information, see
 * CreateByteMatchSet, CreateIPSet, and CreateSqlInjectionMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateRule` request.
 *
 * - Submit a `CreateRule` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateRule request.
 *
 * - Submit an `UpdateRule` request to specify the predicates that you want to include in the `Rule`.
 *
 * - Create and update a `WebACL` that contains the `Rule`. For more information, see CreateWebACL.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleRequest,
  output: CreateRuleResponse,
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

export type CreateRuleGroupError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `RuleGroup`. A rule group is a collection of predefined rules that you add to a web ACL. You use UpdateRuleGroup to add rules to the rule group.
 *
 * Rule groups are subject to the following limits:
 *
 * - Three rule groups per account. You can request an increase to this limit by contacting customer support.
 *
 * - One rule group per web ACL.
 *
 * - Ten rules per rule group.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createRuleGroup: API.OperationMethod<
  CreateRuleGroupRequest,
  CreateRuleGroupResponse,
  CreateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRuleGroupRequest,
  output: CreateRuleGroupResponse,
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleGroup",
}));

export type CreateSizeConstraintSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `SizeConstraintSet`. You then use UpdateSizeConstraintSet to identify the part of a
 * web request that you want AWS WAF to check for length, such as the length of the `User-Agent` header or the length of the query string.
 * For example, you can create a `SizeConstraintSet` that matches any requests that have a query string that is longer than 100 bytes.
 * You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `SizeConstraintSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateSizeConstraintSet` request.
 *
 * - Submit a `CreateSizeConstraintSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateSizeConstraintSet` request.
 *
 * - Submit an UpdateSizeConstraintSet request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createSizeConstraintSet: API.OperationMethod<
  CreateSizeConstraintSetRequest,
  CreateSizeConstraintSetResponse,
  CreateSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSizeConstraintSetRequest,
  output: CreateSizeConstraintSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSizeConstraintSet",
}));

export type CreateSqlInjectionMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a SqlInjectionMatchSet, which you use to allow, block, or count requests that contain snippets of SQL code in a
 * specified part of web requests. AWS WAF searches for character sequences that are likely to be malicious strings.
 *
 * To create and configure a `SqlInjectionMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateSqlInjectionMatchSet` request.
 *
 * - Submit a `CreateSqlInjectionMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateSqlInjectionMatchSet request.
 *
 * - Submit an UpdateSqlInjectionMatchSet request to specify the parts of web requests in which you want to
 * allow, block, or count malicious SQL code.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createSqlInjectionMatchSet: API.OperationMethod<
  CreateSqlInjectionMatchSetRequest,
  CreateSqlInjectionMatchSetResponse,
  CreateSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSqlInjectionMatchSetRequest,
  output: CreateSqlInjectionMatchSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSqlInjectionMatchSet",
}));

export type CreateWebACLError =
  | WAFBadRequestException
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates a `WebACL`, which contains the `Rules` that identify the CloudFront web requests that you want to allow, block, or count.
 * AWS WAF evaluates `Rules` in order based on the value of `Priority` for each `Rule`.
 *
 * You also specify a default action, either `ALLOW` or `BLOCK`. If a web request doesn't match
 * any of the `Rules` in a `WebACL`, AWS WAF responds to the request with the default action.
 *
 * To create and configure a `WebACL`, perform the following steps:
 *
 * - Create and update the `ByteMatchSet` objects and other predicates that you want to include in `Rules`.
 * For more information, see CreateByteMatchSet, UpdateByteMatchSet, CreateIPSet, UpdateIPSet,
 * CreateSqlInjectionMatchSet, and UpdateSqlInjectionMatchSet.
 *
 * - Create and update the `Rules` that you want to include in the `WebACL`. For more information, see
 * CreateRule and UpdateRule.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateWebACL` request.
 *
 * - Submit a `CreateWebACL` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateWebACL request.
 *
 * - Submit an UpdateWebACL request to specify the `Rules` that you want to include in the `WebACL`,
 * to specify the default action, and to associate the `WebACL` with a CloudFront distribution.
 *
 * For more information about how to use the AWS WAF API, see the AWS WAF Developer Guide.
 */
export const createWebACL: API.OperationMethod<
  CreateWebACLRequest,
  CreateWebACLResponse,
  CreateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebACLRequest,
  output: CreateWebACLResponse,
  errors: [
    WAFBadRequestException,
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebACL",
}));

export type CreateWebACLMigrationStackError =
  | WAFEntityMigrationException
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * Creates an AWS CloudFormation WAFV2 template for the specified web ACL in the specified Amazon S3 bucket.
 * Then, in CloudFormation, you create a stack from the template, to create the web ACL and its resources in AWS WAFV2.
 * Use this to migrate your AWS WAF Classic web ACL to the latest version of AWS WAF.
 *
 * This is part of a larger migration procedure for web ACLs from AWS WAF Classic to the latest version of AWS WAF.
 * For the full procedure, including caveats and manual steps to complete
 * the migration and switch over to the new web ACL, see
 * Migrating your AWS WAF Classic resources to AWS WAF in the AWS WAF
 * Developer Guide.
 */
export const createWebACLMigrationStack: API.OperationMethod<
  CreateWebACLMigrationStackRequest,
  CreateWebACLMigrationStackResponse,
  CreateWebACLMigrationStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWebACLMigrationStackRequest,
  output: CreateWebACLMigrationStackResponse,
  errors: [
    WAFEntityMigrationException,
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWebACLMigrationStack",
}));

export type CreateXssMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Creates an XssMatchSet, which you use to allow, block, or count requests that contain cross-site scripting attacks
 * in the specified part of web requests. AWS WAF searches for character sequences that are likely to be malicious strings.
 *
 * To create and configure an `XssMatchSet`, perform the following steps:
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `CreateXssMatchSet` request.
 *
 * - Submit a `CreateXssMatchSet` request.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateXssMatchSet request.
 *
 * - Submit an UpdateXssMatchSet request to specify the parts of web requests in which you want to
 * allow, block, or count cross-site scripting attacks.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const createXssMatchSet: API.OperationMethod<
  CreateXssMatchSetRequest,
  CreateXssMatchSetResponse,
  CreateXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateXssMatchSetRequest,
  output: CreateXssMatchSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateXssMatchSet",
}));

export type DeleteByteMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a ByteMatchSet. You can't delete a `ByteMatchSet` if it's still used in any `Rules`
 * or if it still includes any ByteMatchTuple objects (any filters).
 *
 * If you just want to remove a `ByteMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `ByteMatchSet`, perform the following steps:
 *
 * - Update the `ByteMatchSet` to remove filters, if any. For more information, see UpdateByteMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteByteMatchSet` request.
 *
 * - Submit a `DeleteByteMatchSet` request.
 */
export const deleteByteMatchSet: API.OperationMethod<
  DeleteByteMatchSetRequest,
  DeleteByteMatchSetResponse,
  DeleteByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteByteMatchSetRequest,
  output: DeleteByteMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteByteMatchSet",
}));

export type DeleteGeoMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a GeoMatchSet. You can't delete a `GeoMatchSet` if it's still used in any `Rules` or
 * if it still includes any countries.
 *
 * If you just want to remove a `GeoMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `GeoMatchSet` from AWS WAF, perform the following steps:
 *
 * - Update the `GeoMatchSet` to remove any countries. For more information, see UpdateGeoMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteGeoMatchSet` request.
 *
 * - Submit a `DeleteGeoMatchSet` request.
 */
export const deleteGeoMatchSet: API.OperationMethod<
  DeleteGeoMatchSetRequest,
  DeleteGeoMatchSetResponse,
  DeleteGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGeoMatchSetRequest,
  output: DeleteGeoMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGeoMatchSet",
}));

export type DeleteIPSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes an IPSet. You can't delete an `IPSet` if it's still used in any `Rules` or
 * if it still includes any IP addresses.
 *
 * If you just want to remove an `IPSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete an `IPSet` from AWS WAF, perform the following steps:
 *
 * - Update the `IPSet` to remove IP address ranges, if any. For more information, see UpdateIPSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteIPSet` request.
 *
 * - Submit a `DeleteIPSet` request.
 */
export const deleteIPSet: API.OperationMethod<
  DeleteIPSetRequest,
  DeleteIPSetResponse,
  DeleteIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIPSetRequest,
  output: DeleteIPSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIPSet",
}));

export type DeleteLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes the LoggingConfiguration from the specified web
 * ACL.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLoggingConfigurationRequest,
  output: DeleteLoggingConfigurationResponse,
  errors: [
    WAFInternalErrorException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
}));

export type DeletePermissionPolicyError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes an IAM policy from the specified RuleGroup.
 *
 * The user making the request must be the owner of the RuleGroup.
 */
export const deletePermissionPolicy: API.OperationMethod<
  DeletePermissionPolicyRequest,
  DeletePermissionPolicyResponse,
  DeletePermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePermissionPolicyRequest,
  output: DeletePermissionPolicyResponse,
  errors: [
    WAFInternalErrorException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionPolicy",
}));

export type DeleteRateBasedRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RateBasedRule. You can't delete a rule if
 * it's still used in any `WebACL` objects or if it still includes any predicates,
 * such as `ByteMatchSet` objects.
 *
 * If you just want to remove a rule from a `WebACL`, use UpdateWebACL.
 *
 * To permanently delete a `RateBasedRule` from AWS WAF, perform the following
 * steps:
 *
 * - Update the `RateBasedRule` to remove predicates, if any. For more
 * information, see UpdateRateBasedRule.
 *
 * - Use GetChangeToken to get the change token that you provide
 * in the `ChangeToken` parameter of a `DeleteRateBasedRule`
 * request.
 *
 * - Submit a `DeleteRateBasedRule` request.
 */
export const deleteRateBasedRule: API.OperationMethod<
  DeleteRateBasedRuleRequest,
  DeleteRateBasedRuleResponse,
  DeleteRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRateBasedRuleRequest,
  output: DeleteRateBasedRuleResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRateBasedRule",
}));

export type DeleteRegexMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RegexMatchSet. You can't delete a `RegexMatchSet` if it's still used in any `Rules`
 * or if it still includes any `RegexMatchTuples` objects (any filters).
 *
 * If you just want to remove a `RegexMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `RegexMatchSet`, perform the following steps:
 *
 * - Update the `RegexMatchSet` to remove filters, if any. For more information, see UpdateRegexMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteRegexMatchSet` request.
 *
 * - Submit a `DeleteRegexMatchSet` request.
 */
export const deleteRegexMatchSet: API.OperationMethod<
  DeleteRegexMatchSetRequest,
  DeleteRegexMatchSetResponse,
  DeleteRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegexMatchSetRequest,
  output: DeleteRegexMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegexMatchSet",
}));

export type DeleteRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RegexPatternSet. You can't delete a `RegexPatternSet` if it's still used in any `RegexMatchSet`
 * or if the `RegexPatternSet` is not empty.
 */
export const deleteRegexPatternSet: API.OperationMethod<
  DeleteRegexPatternSetRequest,
  DeleteRegexPatternSetResponse,
  DeleteRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegexPatternSetRequest,
  output: DeleteRegexPatternSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegexPatternSet",
}));

export type DeleteRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a Rule. You can't delete a `Rule` if it's still used in any `WebACL`
 * objects or if it still includes any predicates, such as `ByteMatchSet` objects.
 *
 * If you just want to remove a `Rule` from a `WebACL`, use UpdateWebACL.
 *
 * To permanently delete a `Rule` from AWS WAF, perform the following steps:
 *
 * - Update the `Rule` to remove predicates, if any. For more information, see UpdateRule.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteRule` request.
 *
 * - Submit a `DeleteRule` request.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleRequest,
  output: DeleteRuleResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

export type DeleteRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a RuleGroup. You can't delete a `RuleGroup` if it's still used in any `WebACL`
 * objects or if it still includes any rules.
 *
 * If you just want to remove a `RuleGroup` from a `WebACL`, use UpdateWebACL.
 *
 * To permanently delete a `RuleGroup` from AWS WAF, perform the following steps:
 *
 * - Update the `RuleGroup` to remove rules, if any. For more information, see UpdateRuleGroup.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteRuleGroup` request.
 *
 * - Submit a `DeleteRuleGroup` request.
 */
export const deleteRuleGroup: API.OperationMethod<
  DeleteRuleGroupRequest,
  DeleteRuleGroupResponse,
  DeleteRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRuleGroupRequest,
  output: DeleteRuleGroupResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleGroup",
}));

export type DeleteSizeConstraintSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a SizeConstraintSet. You can't delete a `SizeConstraintSet` if it's still used in any `Rules`
 * or if it still includes any SizeConstraint objects (any filters).
 *
 * If you just want to remove a `SizeConstraintSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `SizeConstraintSet`, perform the following steps:
 *
 * - Update the `SizeConstraintSet` to remove filters, if any. For more information, see UpdateSizeConstraintSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteSizeConstraintSet` request.
 *
 * - Submit a `DeleteSizeConstraintSet` request.
 */
export const deleteSizeConstraintSet: API.OperationMethod<
  DeleteSizeConstraintSetRequest,
  DeleteSizeConstraintSetResponse,
  DeleteSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSizeConstraintSetRequest,
  output: DeleteSizeConstraintSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSizeConstraintSet",
}));

export type DeleteSqlInjectionMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a SqlInjectionMatchSet. You can't delete a `SqlInjectionMatchSet` if it's
 * still used in any `Rules` or if it still contains any SqlInjectionMatchTuple objects.
 *
 * If you just want to remove a `SqlInjectionMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete a `SqlInjectionMatchSet` from AWS WAF, perform the following steps:
 *
 * - Update the `SqlInjectionMatchSet` to remove filters, if any. For more information, see
 * UpdateSqlInjectionMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteSqlInjectionMatchSet` request.
 *
 * - Submit a `DeleteSqlInjectionMatchSet` request.
 */
export const deleteSqlInjectionMatchSet: API.OperationMethod<
  DeleteSqlInjectionMatchSetRequest,
  DeleteSqlInjectionMatchSetResponse,
  DeleteSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSqlInjectionMatchSetRequest,
  output: DeleteSqlInjectionMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSqlInjectionMatchSet",
}));

export type DeleteWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes a WebACL. You can't delete a `WebACL` if it still contains any `Rules`.
 *
 * To delete a `WebACL`, perform the following steps:
 *
 * - Update the `WebACL` to remove `Rules`, if any. For more information, see UpdateWebACL.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteWebACL` request.
 *
 * - Submit a `DeleteWebACL` request.
 */
export const deleteWebACL: API.OperationMethod<
  DeleteWebACLRequest,
  DeleteWebACLResponse,
  DeleteWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWebACLRequest,
  output: DeleteWebACLResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWebACL",
}));

export type DeleteXssMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonEmptyEntityException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Permanently deletes an XssMatchSet. You can't delete an `XssMatchSet` if it's
 * still used in any `Rules` or if it still contains any XssMatchTuple objects.
 *
 * If you just want to remove an `XssMatchSet` from a `Rule`, use UpdateRule.
 *
 * To permanently delete an `XssMatchSet` from AWS WAF, perform the following steps:
 *
 * - Update the `XssMatchSet` to remove filters, if any. For more information, see
 * UpdateXssMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of a
 * `DeleteXssMatchSet` request.
 *
 * - Submit a `DeleteXssMatchSet` request.
 */
export const deleteXssMatchSet: API.OperationMethod<
  DeleteXssMatchSetRequest,
  DeleteXssMatchSetResponse,
  DeleteXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteXssMatchSetRequest,
  output: DeleteXssMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonEmptyEntityException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteXssMatchSet",
}));

export type DisassociateWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic Regional** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Removes a web ACL from the specified resource, either an application load balancer or Amazon API Gateway stage.
 */
export const disassociateWebACL: API.OperationMethod<
  DisassociateWebACLRequest,
  DisassociateWebACLResponse,
  DisassociateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateWebACLRequest,
  output: DisassociateWebACLResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateWebACL",
}));

export type GetByteMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the ByteMatchSet specified by `ByteMatchSetId`.
 */
export const getByteMatchSet: API.OperationMethod<
  GetByteMatchSetRequest,
  GetByteMatchSetResponse,
  GetByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetByteMatchSetRequest,
  output: GetByteMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetByteMatchSet",
}));

export type GetChangeTokenError = WAFInternalErrorException | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * When you want to create, update, or delete AWS WAF objects, get a change token and include the change token in the create, update, or delete request. Change tokens ensure that your application doesn't submit conflicting requests to AWS WAF.
 *
 * Each create, update, or delete request must use a unique change token. If your application submits a `GetChangeToken` request
 * and then submits a second `GetChangeToken` request before submitting a create, update, or delete request, the second
 * `GetChangeToken` request returns the same value as the first `GetChangeToken` request.
 *
 * When you use a change token in a create, update, or delete request, the status of the change token changes to `PENDING`,
 * which indicates that AWS WAF is propagating the change to all AWS WAF servers. Use `GetChangeTokenStatus` to determine the
 * status of your change token.
 */
export const getChangeToken: API.OperationMethod<
  GetChangeTokenRequest,
  GetChangeTokenResponse,
  GetChangeTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChangeTokenRequest,
  output: GetChangeTokenResponse,
  errors: [WAFInternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeToken",
}));

export type GetChangeTokenStatusError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the status of a `ChangeToken` that you got by calling GetChangeToken. `ChangeTokenStatus` is
 * one of the following values:
 *
 * - `PROVISIONED`: You requested the change token by calling `GetChangeToken`, but you haven't used it yet
 * in a call to create, update, or delete an AWS WAF object.
 *
 * - `PENDING`: AWS WAF is propagating the create, update, or delete request to all AWS WAF servers.
 *
 * - `INSYNC`: Propagation is complete.
 */
export const getChangeTokenStatus: API.OperationMethod<
  GetChangeTokenStatusRequest,
  GetChangeTokenStatusResponse,
  GetChangeTokenStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChangeTokenStatusRequest,
  output: GetChangeTokenStatusResponse,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChangeTokenStatus",
}));

export type GetGeoMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the GeoMatchSet that is specified by `GeoMatchSetId`.
 */
export const getGeoMatchSet: API.OperationMethod<
  GetGeoMatchSetRequest,
  GetGeoMatchSetResponse,
  GetGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGeoMatchSetRequest,
  output: GetGeoMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeoMatchSet",
}));

export type GetIPSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the IPSet that is specified by `IPSetId`.
 */
export const getIPSet: API.OperationMethod<
  GetIPSetRequest,
  GetIPSetResponse,
  GetIPSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIPSetRequest,
  output: GetIPSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIPSet",
}));

export type GetLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the LoggingConfiguration for the specified web ACL.
 */
export const getLoggingConfiguration: API.OperationMethod<
  GetLoggingConfigurationRequest,
  GetLoggingConfigurationResponse,
  GetLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLoggingConfigurationRequest,
  output: GetLoggingConfigurationResponse,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLoggingConfiguration",
}));

export type GetPermissionPolicyError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the IAM policy attached to the RuleGroup.
 */
export const getPermissionPolicy: API.OperationMethod<
  GetPermissionPolicyRequest,
  GetPermissionPolicyResponse,
  GetPermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPermissionPolicyRequest,
  output: GetPermissionPolicyResponse,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermissionPolicy",
}));

export type GetRateBasedRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RateBasedRule that is specified by the
 * `RuleId` that you included in the `GetRateBasedRule`
 * request.
 */
export const getRateBasedRule: API.OperationMethod<
  GetRateBasedRuleRequest,
  GetRateBasedRuleResponse,
  GetRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRateBasedRuleRequest,
  output: GetRateBasedRuleResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedRule",
}));

export type GetRateBasedRuleManagedKeysError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of IP addresses currently being blocked by the RateBasedRule that is specified by the `RuleId`. The maximum
 * number of managed keys that will be blocked is 10,000. If more than 10,000 addresses exceed
 * the rate limit, the 10,000 addresses with the highest rates will be blocked.
 */
export const getRateBasedRuleManagedKeys: API.OperationMethod<
  GetRateBasedRuleManagedKeysRequest,
  GetRateBasedRuleManagedKeysResponse,
  GetRateBasedRuleManagedKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRateBasedRuleManagedKeysRequest,
  output: GetRateBasedRuleManagedKeysResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRateBasedRuleManagedKeys",
}));

export type GetRegexMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RegexMatchSet specified by `RegexMatchSetId`.
 */
export const getRegexMatchSet: API.OperationMethod<
  GetRegexMatchSetRequest,
  GetRegexMatchSetResponse,
  GetRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegexMatchSetRequest,
  output: GetRegexMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexMatchSet",
}));

export type GetRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RegexPatternSet specified by `RegexPatternSetId`.
 */
export const getRegexPatternSet: API.OperationMethod<
  GetRegexPatternSetRequest,
  GetRegexPatternSetResponse,
  GetRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegexPatternSetRequest,
  output: GetRegexPatternSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegexPatternSet",
}));

export type GetRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the Rule that is specified by the `RuleId` that you included in the `GetRule` request.
 */
export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuleRequest,
  output: GetRuleResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
}));

export type GetRuleGroupError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the RuleGroup that is specified by the `RuleGroupId` that you included in the `GetRuleGroup` request.
 *
 * To view the rules in a rule group, use ListActivatedRulesInRuleGroup.
 */
export const getRuleGroup: API.OperationMethod<
  GetRuleGroupRequest,
  GetRuleGroupResponse,
  GetRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRuleGroupRequest,
  output: GetRuleGroupResponse,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRuleGroup",
}));

export type GetSampledRequestsError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Gets detailed information about a specified number of requests--a sample--that AWS WAF randomly selects from among the first 5,000 requests that your AWS resource received during a time range that you choose. You can specify a sample size of up to 500 requests, and you can specify any time range in the previous three hours.
 *
 * `GetSampledRequests` returns a time range, which is usually the time range that you specified. However, if your resource
 * (such as a CloudFront distribution) received 5,000 requests before the specified time range elapsed, `GetSampledRequests`
 * returns an updated time range. This new time range indicates the actual period during which AWS WAF selected the requests in the sample.
 */
export const getSampledRequests: API.OperationMethod<
  GetSampledRequestsRequest,
  GetSampledRequestsResponse,
  GetSampledRequestsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSampledRequestsRequest,
  output: GetSampledRequestsResponse,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSampledRequests",
}));

export type GetSizeConstraintSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the SizeConstraintSet specified by `SizeConstraintSetId`.
 */
export const getSizeConstraintSet: API.OperationMethod<
  GetSizeConstraintSetRequest,
  GetSizeConstraintSetResponse,
  GetSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSizeConstraintSetRequest,
  output: GetSizeConstraintSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSizeConstraintSet",
}));

export type GetSqlInjectionMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the SqlInjectionMatchSet that is specified by `SqlInjectionMatchSetId`.
 */
export const getSqlInjectionMatchSet: API.OperationMethod<
  GetSqlInjectionMatchSetRequest,
  GetSqlInjectionMatchSetResponse,
  GetSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSqlInjectionMatchSetRequest,
  output: GetSqlInjectionMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSqlInjectionMatchSet",
}));

export type GetWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the WebACL that is specified by `WebACLId`.
 */
export const getWebACL: API.OperationMethod<
  GetWebACLRequest,
  GetWebACLResponse,
  GetWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebACLRequest,
  output: GetWebACLResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebACL",
}));

export type GetWebACLForResourceError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFUnavailableEntityException
  | CommonErrors;
/**
 * This is **AWS WAF Classic Regional** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the web ACL for the specified resource, either an application load balancer or Amazon API Gateway stage.
 */
export const getWebACLForResource: API.OperationMethod<
  GetWebACLForResourceRequest,
  GetWebACLForResourceResponse,
  GetWebACLForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWebACLForResourceRequest,
  output: GetWebACLForResourceResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFUnavailableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWebACLForResource",
}));

export type GetXssMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns the XssMatchSet that is specified by `XssMatchSetId`.
 */
export const getXssMatchSet: API.OperationMethod<
  GetXssMatchSetRequest,
  GetXssMatchSetResponse,
  GetXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetXssMatchSetRequest,
  output: GetXssMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetXssMatchSet",
}));

export type ListActivatedRulesInRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of ActivatedRule objects.
 */
export const listActivatedRulesInRuleGroup: API.OperationMethod<
  ListActivatedRulesInRuleGroupRequest,
  ListActivatedRulesInRuleGroupResponse,
  ListActivatedRulesInRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListActivatedRulesInRuleGroupRequest,
  output: ListActivatedRulesInRuleGroupResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActivatedRulesInRuleGroup",
}));

export type ListByteMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of ByteMatchSetSummary objects.
 */
export const listByteMatchSets: API.OperationMethod<
  ListByteMatchSetsRequest,
  ListByteMatchSetsResponse,
  ListByteMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListByteMatchSetsRequest,
  output: ListByteMatchSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListByteMatchSets",
}));

export type ListGeoMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of GeoMatchSetSummary objects in the response.
 */
export const listGeoMatchSets: API.OperationMethod<
  ListGeoMatchSetsRequest,
  ListGeoMatchSetsResponse,
  ListGeoMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGeoMatchSetsRequest,
  output: ListGeoMatchSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeoMatchSets",
}));

export type ListIPSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of IPSetSummary objects in the response.
 */
export const listIPSets: API.OperationMethod<
  ListIPSetsRequest,
  ListIPSetsResponse,
  ListIPSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListIPSetsRequest,
  output: ListIPSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIPSets",
}));

export type ListLoggingConfigurationsError =
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of LoggingConfiguration objects.
 */
export const listLoggingConfigurations: API.OperationMethod<
  ListLoggingConfigurationsRequest,
  ListLoggingConfigurationsResponse,
  ListLoggingConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLoggingConfigurationsRequest,
  output: ListLoggingConfigurationsResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLoggingConfigurations",
}));

export type ListRateBasedRulesError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleSummary objects.
 */
export const listRateBasedRules: API.OperationMethod<
  ListRateBasedRulesRequest,
  ListRateBasedRulesResponse,
  ListRateBasedRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRateBasedRulesRequest,
  output: ListRateBasedRulesResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRateBasedRules",
}));

export type ListRegexMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RegexMatchSetSummary objects.
 */
export const listRegexMatchSets: API.OperationMethod<
  ListRegexMatchSetsRequest,
  ListRegexMatchSetsResponse,
  ListRegexMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRegexMatchSetsRequest,
  output: ListRegexMatchSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexMatchSets",
}));

export type ListRegexPatternSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RegexPatternSetSummary objects.
 */
export const listRegexPatternSets: API.OperationMethod<
  ListRegexPatternSetsRequest,
  ListRegexPatternSetsResponse,
  ListRegexPatternSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRegexPatternSetsRequest,
  output: ListRegexPatternSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegexPatternSets",
}));

export type ListResourcesForWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic Regional** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of resources associated with the specified web ACL.
 */
export const listResourcesForWebACL: API.OperationMethod<
  ListResourcesForWebACLRequest,
  ListResourcesForWebACLResponse,
  ListResourcesForWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListResourcesForWebACLRequest,
  output: ListResourcesForWebACLResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesForWebACL",
}));

export type ListRuleGroupsError = WAFInternalErrorException | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleGroup objects.
 */
export const listRuleGroups: API.OperationMethod<
  ListRuleGroupsRequest,
  ListRuleGroupsResponse,
  ListRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRuleGroupsRequest,
  output: ListRuleGroupsResponse,
  errors: [WAFInternalErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroups",
}));

export type ListRulesError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleSummary objects.
 */
export const listRules: API.OperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
}));

export type ListSizeConstraintSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of SizeConstraintSetSummary objects.
 */
export const listSizeConstraintSets: API.OperationMethod<
  ListSizeConstraintSetsRequest,
  ListSizeConstraintSetsResponse,
  ListSizeConstraintSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListSizeConstraintSetsRequest,
  output: ListSizeConstraintSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSizeConstraintSets",
}));

export type ListSqlInjectionMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of SqlInjectionMatchSet objects.
 */
export const listSqlInjectionMatchSets: API.OperationMethod<
  ListSqlInjectionMatchSetsRequest,
  ListSqlInjectionMatchSetsResponse,
  ListSqlInjectionMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListSqlInjectionMatchSetsRequest,
  output: ListSqlInjectionMatchSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSqlInjectionMatchSets",
}));

export type ListSubscribedRuleGroupsError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of RuleGroup objects that you are subscribed to.
 */
export const listSubscribedRuleGroups: API.OperationMethod<
  ListSubscribedRuleGroupsRequest,
  ListSubscribedRuleGroupsResponse,
  ListSubscribedRuleGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListSubscribedRuleGroupsRequest,
  output: ListSubscribedRuleGroupsResponse,
  errors: [WAFInternalErrorException, WAFNonexistentItemException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSubscribedRuleGroups",
}));

export type ListTagsForResourceError =
  | WAFBadRequestException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Retrieves the tags associated with the specified AWS resource. Tags are key:value pairs that you can use to categorize and manage your resources, for purposes like billing. For example, you might set the tag key to "customer" and the value to the customer name or ID. You can specify one or more tags to add to each AWS resource, up to 50 tags for a resource.
 *
 * Tagging is only available through the API, SDKs, and CLI. You can't manage or view tags through the AWS WAF Classic console. You can tag the AWS resources that you manage through AWS WAF Classic: web ACLs, rule groups, and rules.
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
    WAFBadRequestException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWebACLsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of WebACLSummary objects in the response.
 */
export const listWebACLs: API.OperationMethod<
  ListWebACLsRequest,
  ListWebACLsResponse,
  ListWebACLsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListWebACLsRequest,
  output: ListWebACLsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWebACLs",
}));

export type ListXssMatchSetsError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Returns an array of XssMatchSet objects.
 */
export const listXssMatchSets: API.OperationMethod<
  ListXssMatchSetsRequest,
  ListXssMatchSetsResponse,
  ListXssMatchSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListXssMatchSetsRequest,
  output: ListXssMatchSetsResponse,
  errors: [WAFInternalErrorException, WAFInvalidAccountException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListXssMatchSets",
}));

export type PutLoggingConfigurationError =
  | WAFInternalErrorException
  | WAFNonexistentItemException
  | WAFServiceLinkedRoleErrorException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Associates a LoggingConfiguration with a specified web ACL.
 *
 * You can access information about all traffic that AWS WAF inspects using the following
 * steps:
 *
 * - Create an Amazon Kinesis Data
 * Firehose.
 *
 * Create the data firehose with a PUT source and in the region that you are operating. However, if you are capturing logs for Amazon CloudFront, always create the firehose in US East (N. Virginia).
 *
 * Do not create the data firehose using a `Kinesis stream` as your source.
 *
 * - Associate that firehose to your web ACL using a `PutLoggingConfiguration` request.
 *
 * When you successfully enable logging using a `PutLoggingConfiguration` request, AWS WAF will create a service linked role with the necessary permissions to write logs to the Amazon Kinesis Data Firehose. For more information, see Logging Web ACL Traffic Information in the *AWS WAF Developer Guide*.
 */
export const putLoggingConfiguration: API.OperationMethod<
  PutLoggingConfigurationRequest,
  PutLoggingConfigurationResponse,
  PutLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLoggingConfigurationRequest,
  output: PutLoggingConfigurationResponse,
  errors: [
    WAFInternalErrorException,
    WAFNonexistentItemException,
    WAFServiceLinkedRoleErrorException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLoggingConfiguration",
}));

export type PutPermissionPolicyError =
  | WAFInternalErrorException
  | WAFInvalidPermissionPolicyException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Attaches an IAM policy to the specified resource. The only supported use for this action is to share a RuleGroup across accounts.
 *
 * The `PutPermissionPolicy` is subject to the following restrictions:
 *
 * - You can attach only one policy with each `PutPermissionPolicy` request.
 *
 * - The policy must include an `Effect`, `Action` and `Principal`.
 *
 * - `Effect` must specify `Allow`.
 *
 * - The `Action` in the policy must be `waf:UpdateWebACL`, `waf-regional:UpdateWebACL`, `waf:GetRuleGroup` and `waf-regional:GetRuleGroup` . Any extra or wildcard actions in the policy will be rejected.
 *
 * - The policy cannot include a `Resource` parameter.
 *
 * - The ARN in the request must be a valid WAF RuleGroup ARN and the RuleGroup must exist in the same region.
 *
 * - The user making the request must be the owner of the RuleGroup.
 *
 * - Your policy must be composed using IAM Policy version 2012-10-17.
 *
 * For more information, see IAM Policies.
 *
 * An example of a valid policy parameter is shown in the Examples section below.
 */
export const putPermissionPolicy: API.OperationMethod<
  PutPermissionPolicyRequest,
  PutPermissionPolicyResponse,
  PutPermissionPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPermissionPolicyRequest,
  output: PutPermissionPolicyResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidPermissionPolicyException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPermissionPolicy",
}));

export type TagResourceError =
  | WAFBadRequestException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Associates tags with the specified AWS resource. Tags are key:value pairs that you can use to categorize and manage your resources, for purposes like billing. For example, you might set the tag key to "customer" and the value to the customer name or ID. You can specify one or more tags to add to each AWS resource, up to 50 tags for a resource.
 *
 * Tagging is only available through the API, SDKs, and CLI. You can't manage or view tags through the AWS WAF Classic console. You can use this action to tag the AWS resources that you manage through AWS WAF Classic: web ACLs, rule groups, and rules.
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
    WAFBadRequestException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | WAFBadRequestException
  | WAFInternalErrorException
  | WAFInvalidParameterException
  | WAFNonexistentItemException
  | WAFTagOperationException
  | WAFTagOperationInternalErrorException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
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
    WAFBadRequestException,
    WAFInternalErrorException,
    WAFInvalidParameterException,
    WAFNonexistentItemException,
    WAFTagOperationException,
    WAFTagOperationInternalErrorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateByteMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes ByteMatchTuple objects (filters) in a ByteMatchSet. For each `ByteMatchTuple` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change a `ByteMatchSetUpdate` object,
 * you delete the existing object and add a new one.
 *
 * - The part of a web request that you want AWS WAF to inspect, such as a query string or the value of the `User-Agent` header.
 *
 * - The bytes (typically a string that corresponds with ASCII characters) that you want AWS WAF to look for. For more information, including how you specify
 * the values for the AWS WAF API and the AWS CLI or SDKs, see `TargetString` in the ByteMatchTuple data type.
 *
 * - Where to look, such as at the beginning or the end of a query string.
 *
 * - Whether to perform any conversions on the request, such as converting it to lowercase, before inspecting it for the specified string.
 *
 * For example, you can add a `ByteMatchSetUpdate` object that matches web requests in which `User-Agent` headers contain
 * the string `BadBot`. You can then configure AWS WAF to block those requests.
 *
 * To create and configure a `ByteMatchSet`, perform the following steps:
 *
 * - Create a `ByteMatchSet.` For more information, see CreateByteMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateByteMatchSet` request.
 *
 * - Submit an `UpdateByteMatchSet` request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateByteMatchSet: API.OperationMethod<
  UpdateByteMatchSetRequest,
  UpdateByteMatchSetResponse,
  UpdateByteMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateByteMatchSetRequest,
  output: UpdateByteMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateByteMatchSet",
}));

export type UpdateGeoMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes GeoMatchConstraint objects in an `GeoMatchSet`. For each `GeoMatchConstraint` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change an `GeoMatchConstraint` object, you delete the existing object and add a new one.
 *
 * - The `Type`. The only valid value for `Type` is `Country`.
 *
 * - The `Value`, which is a two character code for the country to add to the `GeoMatchConstraint` object. Valid codes are listed in GeoMatchConstraint$Value.
 *
 * To create and configure an `GeoMatchSet`, perform the following steps:
 *
 * - Submit a CreateGeoMatchSet request.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateGeoMatchSet request.
 *
 * - Submit an `UpdateGeoMatchSet` request to specify the country that you want AWS WAF to watch for.
 *
 * When you update an `GeoMatchSet`, you specify the country that you want to add and/or the country that you want to delete.
 * If you want to change a country, you delete the existing country and add the new one.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateGeoMatchSet: API.OperationMethod<
  UpdateGeoMatchSetRequest,
  UpdateGeoMatchSetResponse,
  UpdateGeoMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGeoMatchSetRequest,
  output: UpdateGeoMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGeoMatchSet",
}));

export type UpdateIPSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes IPSetDescriptor objects in an
 * `IPSet`. For each `IPSetDescriptor` object, you specify the following
 * values:
 *
 * - Whether to insert or delete the object from the array. If you want to change an
 * `IPSetDescriptor` object, you delete the existing object and add a new
 * one.
 *
 * - The IP address version, `IPv4` or `IPv6`.
 *
 * - The IP address in CIDR notation, for example, `192.0.2.0/24` (for
 * the range of IP addresses from `192.0.2.0` to `192.0.2.255`) or
 * `192.0.2.44/32` (for the individual IP address
 * `192.0.2.44`).
 *
 * AWS WAF supports IPv4 address ranges: /8 and any range between /16 through /32. AWS
 * WAF supports IPv6 address ranges: /24, /32, /48, /56, /64, and /128. For more
 * information about CIDR notation, see the Wikipedia entry Classless
 * Inter-Domain Routing.
 *
 * IPv6 addresses can be represented using any of the following formats:
 *
 * - 1111:0000:0000:0000:0000:0000:0000:0111/128
 *
 * - 1111:0:0:0:0:0:0:0111/128
 *
 * - 1111::0111/128
 *
 * - 1111::111/128
 *
 * You use an `IPSet` to specify which web requests you want to allow or
 * block based on the IP addresses that the requests originated from. For example, if you're
 * receiving a lot of requests from one or a small number of IP addresses and you want to
 * block the requests, you can create an `IPSet` that specifies those IP addresses,
 * and then configure AWS WAF to block the requests.
 *
 * To create and configure an `IPSet`, perform the following steps:
 *
 * - Submit a CreateIPSet request.
 *
 * - Use GetChangeToken to get the change token that you provide
 * in the `ChangeToken` parameter of an UpdateIPSet
 * request.
 *
 * - Submit an `UpdateIPSet` request to specify the IP addresses that you
 * want AWS WAF to watch for.
 *
 * When you update an `IPSet`, you specify the IP addresses that you want to
 * add and/or the IP addresses that you want to delete. If you want to change an IP address,
 * you delete the existing IP address and add the new one.
 *
 * You can insert a maximum of 1000 addresses in a single
 * request.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP
 * requests, see the AWS WAF
 * Developer Guide.
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
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIPSet",
}));

export type UpdateRateBasedRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes Predicate objects in a rule and updates the
 * `RateLimit` in the rule.
 *
 * Each `Predicate` object identifies a predicate, such as a ByteMatchSet or an IPSet, that specifies the web requests
 * that you want to block or count. The `RateLimit` specifies the number of
 * requests every five minutes that triggers the rule.
 *
 * If you add more than one predicate to a `RateBasedRule`, a request must
 * match all the predicates and exceed the `RateLimit` to be counted or blocked.
 * For example, suppose you add the following to a `RateBasedRule`:
 *
 * - An `IPSet` that matches the IP address `192.0.2.44/32`
 *
 * - A `ByteMatchSet` that matches `BadBot` in the
 * `User-Agent` header
 *
 * Further, you specify a
 * `RateLimit` of 1,000.
 *
 * You then add the `RateBasedRule` to a `WebACL` and specify that
 * you want to block requests that satisfy the rule. For a request to be blocked, it must come
 * from the IP address 192.0.2.44 *and* the `User-Agent` header
 * in the request must contain the value `BadBot`. Further, requests that match
 * these two conditions much be received at a rate of more than 1,000 every five minutes. If
 * the rate drops below this limit, AWS WAF no longer blocks the requests.
 *
 * As a second example, suppose you want to limit requests to a particular page on your site. To do this, you could add the following to a
 * `RateBasedRule`:
 *
 * - A `ByteMatchSet` with `FieldToMatch` of `URI`
 *
 * - A `PositionalConstraint` of `STARTS_WITH`
 *
 * - A `TargetString` of `login`
 *
 * Further, you specify a `RateLimit` of 1,000.
 *
 * By adding this `RateBasedRule` to a `WebACL`, you could limit requests to your login page without affecting the rest of your site.
 */
export const updateRateBasedRule: API.OperationMethod<
  UpdateRateBasedRuleRequest,
  UpdateRateBasedRuleResponse,
  UpdateRateBasedRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRateBasedRuleRequest,
  output: UpdateRateBasedRuleResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRateBasedRule",
}));

export type UpdateRegexMatchSetError =
  | WAFDisallowedNameException
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes RegexMatchTuple objects (filters) in a RegexMatchSet. For each `RegexMatchSetUpdate` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change a `RegexMatchSetUpdate` object,
 * you delete the existing object and add a new one.
 *
 * - The part of a web request that you want AWS WAF to inspectupdate, such as a query string or the value of the `User-Agent` header.
 *
 * - The identifier of the pattern (a regular expression) that you want AWS WAF to look for. For more information, see RegexPatternSet.
 *
 * - Whether to perform any conversions on the request, such as converting it to lowercase, before inspecting it for the specified string.
 *
 * For example, you can create a `RegexPatternSet` that matches any requests with `User-Agent` headers
 * that contain the string `B[a@]dB[o0]t`. You can then configure AWS WAF to reject those requests.
 *
 * To create and configure a `RegexMatchSet`, perform the following steps:
 *
 * - Create a `RegexMatchSet.` For more information, see CreateRegexMatchSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexMatchSet` request.
 *
 * - Submit an `UpdateRegexMatchSet` request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the identifier of the `RegexPatternSet` that contain the regular expression patters you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateRegexMatchSet: API.OperationMethod<
  UpdateRegexMatchSetRequest,
  UpdateRegexMatchSetResponse,
  UpdateRegexMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRegexMatchSetRequest,
  output: UpdateRegexMatchSetResponse,
  errors: [
    WAFDisallowedNameException,
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegexMatchSet",
}));

export type UpdateRegexPatternSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidRegexPatternException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes `RegexPatternString` objects in a RegexPatternSet. For each `RegexPatternString` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the `RegexPatternString`.
 *
 * - The regular expression pattern that you want to insert or delete. For more information, see RegexPatternSet.
 *
 * For example, you can create a `RegexPatternString` such as `B[a@]dB[o0]t`. AWS WAF will match this `RegexPatternString` to:
 *
 * - BadBot
 *
 * - BadB0t
 *
 * - B@dBot
 *
 * - B@dB0t
 *
 * To create and configure a `RegexPatternSet`, perform the following steps:
 *
 * - Create a `RegexPatternSet.` For more information, see CreateRegexPatternSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateRegexPatternSet` request.
 *
 * - Submit an `UpdateRegexPatternSet` request to specify the regular expression pattern that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateRegexPatternSet: API.OperationMethod<
  UpdateRegexPatternSetRequest,
  UpdateRegexPatternSetResponse,
  UpdateRegexPatternSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRegexPatternSetRequest,
  output: UpdateRegexPatternSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidRegexPatternException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegexPatternSet",
}));

export type UpdateRuleError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes Predicate objects in a `Rule`. Each
 * `Predicate` object identifies a predicate, such as a ByteMatchSet or an IPSet, that specifies the web requests
 * that you want to allow, block, or count. If you add more than one predicate to a
 * `Rule`, a request must match all of the specifications to be allowed,
 * blocked, or counted. For example, suppose
 * that
 * you add the following to a `Rule`:
 *
 * - A `ByteMatchSet` that matches the value `BadBot` in the `User-Agent` header
 *
 * - An `IPSet` that matches the IP address `192.0.2.44`
 *
 * You then add the `Rule` to a `WebACL` and specify that you want to block requests that satisfy the `Rule`.
 * For a request to be blocked, the `User-Agent` header in the request must contain the value `BadBot`
 * *and* the request must originate from the IP address 192.0.2.44.
 *
 * To create and configure a `Rule`, perform the following steps:
 *
 * - Create and update the predicates that you want to include in the `Rule`.
 *
 * - Create the `Rule`. See CreateRule.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateRule request.
 *
 * - Submit an `UpdateRule` request to add predicates to the `Rule`.
 *
 * - Create and update a `WebACL` that contains the `Rule`. See CreateWebACL.
 *
 * If you want to replace one `ByteMatchSet` or `IPSet` with another, you delete the existing one and
 * add the new one.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleRequest,
  output: UpdateRuleResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
}));

export type UpdateRuleGroupError =
  | WAFInternalErrorException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes ActivatedRule objects in a `RuleGroup`.
 *
 * You can only insert `REGULAR` rules into a rule group.
 *
 * You can have a maximum of ten rules per rule group.
 *
 * To create and configure a `RuleGroup`, perform the following steps:
 *
 * - Create and update the `Rules` that you want to include in the `RuleGroup`. See CreateRule.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateRuleGroup request.
 *
 * - Submit an `UpdateRuleGroup` request to add `Rules` to the `RuleGroup`.
 *
 * - Create and update a `WebACL` that contains the `RuleGroup`. See CreateWebACL.
 *
 * If you want to replace one `Rule` with another, you delete the existing one and
 * add the new one.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateRuleGroup: API.OperationMethod<
  UpdateRuleGroupRequest,
  UpdateRuleGroupResponse,
  UpdateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRuleGroupRequest,
  output: UpdateRuleGroupResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleGroup",
}));

export type UpdateSizeConstraintSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes SizeConstraint objects (filters) in a SizeConstraintSet. For each `SizeConstraint` object,
 * you specify the following values:
 *
 * - Whether to insert or delete the object from the array. If you want to change a `SizeConstraintSetUpdate` object,
 * you delete the existing object and add a new one.
 *
 * - The part of a web request that you want AWS WAF to evaluate, such as the length of a query string or the length of the
 * `User-Agent` header.
 *
 * - Whether to perform any transformations on the request, such as converting it to lowercase, before checking its length.
 * Note that transformations of the request body are not supported because the AWS resource forwards only the first `8192` bytes
 * of your request to AWS WAF.
 *
 * You can only specify a single type of TextTransformation.
 *
 * - A `ComparisonOperator` used for evaluating the selected part of the request against the specified `Size`, such as
 * equals, greater than, less than, and so on.
 *
 * - The length, in bytes, that you want AWS WAF to watch for in selected part of the request. The length is computed after applying the transformation.
 *
 * For example, you can add a `SizeConstraintSetUpdate` object that matches web requests in which the length of the
 * `User-Agent` header is greater than 100 bytes. You can then configure AWS WAF to block those requests.
 *
 * To create and configure a `SizeConstraintSet`, perform the following steps:
 *
 * - Create a `SizeConstraintSet.` For more information, see CreateSizeConstraintSet.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * `UpdateSizeConstraintSet` request.
 *
 * - Submit an `UpdateSizeConstraintSet` request to specify the part of the request that you want AWS WAF to inspect
 * (for example, the header or the URI) and the value that you want AWS WAF to watch for.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateSizeConstraintSet: API.OperationMethod<
  UpdateSizeConstraintSetRequest,
  UpdateSizeConstraintSetResponse,
  UpdateSizeConstraintSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSizeConstraintSetRequest,
  output: UpdateSizeConstraintSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSizeConstraintSet",
}));

export type UpdateSqlInjectionMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes SqlInjectionMatchTuple objects (filters) in a SqlInjectionMatchSet.
 * For each `SqlInjectionMatchTuple` object, you specify the following values:
 *
 * - `Action`: Whether to insert the object into or delete the object from the array. To change a
 * `SqlInjectionMatchTuple`, you delete the existing object and add a new one.
 *
 * - `FieldToMatch`: The part of web requests that you want AWS WAF to inspect and, if you want AWS WAF to inspect a header or custom query parameter,
 * the name of the header or parameter.
 *
 * - `TextTransformation`: Which text transformation, if any, to perform on the web request before
 * inspecting the request for snippets of malicious SQL code.
 *
 * You can only specify a single type of TextTransformation.
 *
 * You use `SqlInjectionMatchSet` objects to specify which CloudFront
 * requests that
 * you want to allow, block, or count. For example, if you're receiving
 * requests that contain snippets of SQL code in the query string and you want to block the
 * requests, you can create a `SqlInjectionMatchSet` with the applicable settings,
 * and then configure AWS WAF to block the requests.
 *
 * To create and configure a `SqlInjectionMatchSet`, perform the following steps:
 *
 * - Submit a CreateSqlInjectionMatchSet request.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateIPSet request.
 *
 * - Submit an `UpdateSqlInjectionMatchSet` request to specify the parts of web requests that you want AWS WAF to
 * inspect for snippets of SQL code.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateSqlInjectionMatchSet: API.OperationMethod<
  UpdateSqlInjectionMatchSetRequest,
  UpdateSqlInjectionMatchSetResponse,
  UpdateSqlInjectionMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSqlInjectionMatchSetRequest,
  output: UpdateSqlInjectionMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSqlInjectionMatchSet",
}));

export type UpdateWebACLError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFReferencedItemException
  | WAFStaleDataException
  | WAFSubscriptionNotFoundException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes ActivatedRule objects in a `WebACL`. Each `Rule` identifies
 * web requests that you want to allow, block, or count. When you update a `WebACL`, you specify the following values:
 *
 * - A default action for the `WebACL`, either `ALLOW` or `BLOCK`.
 * AWS WAF performs the default action if a request doesn't match the criteria in any of the `Rules` in a `WebACL`.
 *
 * - The `Rules` that you want to add
 * or
 * delete. If you want to replace one `Rule` with another, you delete the
 * existing `Rule` and add the new one.
 *
 * - For each `Rule`, whether you want AWS WAF to allow requests, block requests, or count requests that match
 * the conditions in the `Rule`.
 *
 * - The order in which you want AWS WAF to evaluate the `Rules` in a
 * `WebACL`. If you add more than one `Rule` to a
 * `WebACL`, AWS WAF evaluates each request against the `Rules`
 * in order based on the value of `Priority`. (The `Rule` that has
 * the lowest value for `Priority` is evaluated first.) When a web request
 * matches all
 * the
 * predicates (such as `ByteMatchSets` and `IPSets`) in a
 * `Rule`, AWS WAF immediately takes the corresponding action, allow or
 * block, and doesn't evaluate the request against the remaining `Rules` in
 * the `WebACL`, if any.
 *
 * To create and configure a `WebACL`, perform the following steps:
 *
 * - Create and update the predicates that you want to include in `Rules`.
 * For more information, see CreateByteMatchSet, UpdateByteMatchSet, CreateIPSet, UpdateIPSet,
 * CreateSqlInjectionMatchSet, and UpdateSqlInjectionMatchSet.
 *
 * - Create and update the `Rules` that you want to include in the `WebACL`. For more information, see
 * CreateRule and UpdateRule.
 *
 * - Create a `WebACL`. See CreateWebACL.
 *
 * - Use `GetChangeToken` to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateWebACL request.
 *
 * - Submit an `UpdateWebACL` request to specify the `Rules`
 * that you want to include in the `WebACL`, to specify the default action,
 * and to associate the `WebACL` with a CloudFront distribution.
 *
 * The `ActivatedRule` can be a rule group. If you specify a rule group
 * as your
 * `ActivatedRule`
 * ,
 * you can exclude specific rules from that rule group.
 *
 * If you already have a rule group associated with a web ACL and want to submit
 * an `UpdateWebACL` request to exclude certain rules from that rule group,
 * you must first remove the rule group from the web ACL, the re-insert it again,
 * specifying the excluded rules.
 * For details,
 * see
 * ActivatedRule$ExcludedRules
 * .
 *
 * Be aware that if you try to add a RATE_BASED rule to a web ACL without setting the rule type when first creating the rule, the UpdateWebACL request will fail because the request tries to add a REGULAR rule (the default rule type) with the specified ID, which does not exist.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the AWS WAF Developer Guide.
 */
export const updateWebACL: API.OperationMethod<
  UpdateWebACLRequest,
  UpdateWebACLResponse,
  UpdateWebACLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWebACLRequest,
  output: UpdateWebACLResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFReferencedItemException,
    WAFStaleDataException,
    WAFSubscriptionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWebACL",
}));

export type UpdateXssMatchSetError =
  | WAFInternalErrorException
  | WAFInvalidAccountException
  | WAFInvalidOperationException
  | WAFInvalidParameterException
  | WAFLimitsExceededException
  | WAFNonexistentContainerException
  | WAFNonexistentItemException
  | WAFStaleDataException
  | CommonErrors;
/**
 * This is **AWS WAF Classic** documentation. For
 * more information, see AWS
 * WAF Classic in the developer guide.
 *
 * For the latest version of AWS
 * WAF, use the AWS WAFV2 API and see the AWS WAF Developer Guide. With the latest version, AWS WAF has a single set of endpoints for regional and global use.
 *
 * Inserts or deletes XssMatchTuple objects (filters) in an XssMatchSet.
 * For each `XssMatchTuple` object, you specify the following values:
 *
 * - `Action`: Whether to insert the object into or delete the object from the
 * array. To change an
 * `XssMatchTuple`, you delete the existing object and add a new
 * one.
 *
 * - `FieldToMatch`: The part of web requests that you want AWS WAF to inspect and, if you want AWS WAF to inspect a header or custom query parameter,
 * the name of the header or parameter.
 *
 * - `TextTransformation`: Which text transformation, if any, to perform on the web request before
 * inspecting the request for cross-site scripting attacks.
 *
 * You can only specify a single type of TextTransformation.
 *
 * You use `XssMatchSet` objects to specify which CloudFront requests
 * that
 * you want to allow, block, or count. For example, if you're receiving
 * requests that contain cross-site scripting attacks in the request body and you want to
 * block the requests, you can create an `XssMatchSet` with the applicable
 * settings, and then configure AWS WAF to block the requests.
 *
 * To create and configure an `XssMatchSet`, perform the following steps:
 *
 * - Submit a CreateXssMatchSet request.
 *
 * - Use GetChangeToken to get the change token that you provide in the `ChangeToken` parameter of an
 * UpdateIPSet request.
 *
 * - Submit an `UpdateXssMatchSet` request to specify the parts of web requests that you want AWS WAF to
 * inspect for cross-site scripting attacks.
 *
 * For more information about how to use the AWS WAF API to allow or block HTTP requests, see the
 * AWS WAF Developer Guide.
 */
export const updateXssMatchSet: API.OperationMethod<
  UpdateXssMatchSetRequest,
  UpdateXssMatchSetResponse,
  UpdateXssMatchSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateXssMatchSetRequest,
  output: UpdateXssMatchSetResponse,
  errors: [
    WAFInternalErrorException,
    WAFInvalidAccountException,
    WAFInvalidOperationException,
    WAFInvalidParameterException,
    WAFLimitsExceededException,
    WAFNonexistentContainerException,
    WAFNonexistentItemException,
    WAFStaleDataException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateXssMatchSet",
}));
