import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "Marketplace Entitlement Service",
  serviceShapeName: "AWSMPEntitlementService",
});
const auth = T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = T.ServiceVersion("2017-01-11");
const proto = T.AwsProtocolsAwsJson1_1();
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://entitlement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://entitlement-marketplace.${Region}.amazonaws.com.cn`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://entitlement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(`https://entitlement-marketplace.${Region}.amazonaws.eu`);
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://entitlement.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://entitlement.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://entitlement.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://entitlement.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ProductCode = string;
export type GetEntitlementFilterName =
  | "CUSTOMER_IDENTIFIER"
  | "DIMENSION"
  | "CUSTOMER_AWS_ACCOUNT_ID"
  | "LICENSE_ARN"
  | (string & {});
export const GetEntitlementFilterName = S.String;

export type FilterValue = string;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(S.String);
export type GetEntitlementFilters = {
  [key in GetEntitlementFilterName]?: string[];
};
export const GetEntitlementFilters = /*@__PURE__*/ S.Record(
  GetEntitlementFilterName,
  FilterValueList.pipe(S.optional),
);
export type NonEmptyString = string;
export type PageSizeInteger = number;
export interface GetEntitlementsRequest {
  ProductCode: string;
  Filter?: { [key: string]: string[] | undefined };
  NextToken?: string;
  MaxResults?: number;
}
export const GetEntitlementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductCode: S.String,
    Filter: S.optional(GetEntitlementFilters),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEntitlementsRequest",
}) as any as S.Schema<GetEntitlementsRequest>;
export interface EntitlementValue {
  IntegerValue?: number;
  DoubleValue?: number;
  BooleanValue?: boolean;
  StringValue?: string;
}
export const EntitlementValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegerValue: S.optional(S.Number),
    DoubleValue: S.optional(S.Number),
    BooleanValue: S.optional(S.Boolean),
    StringValue: S.optional(S.String),
  }),
).annotate({
  identifier: "EntitlementValue",
}) as any as S.Schema<EntitlementValue>;
export interface Entitlement {
  ProductCode?: string;
  Dimension?: string;
  CustomerIdentifier?: string;
  CustomerAWSAccountId?: string;
  Value?: EntitlementValue;
  ExpirationDate?: Date;
  LicenseArn?: string;
}
export const Entitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductCode: S.optional(S.String),
    Dimension: S.optional(S.String),
    CustomerIdentifier: S.optional(S.String),
    CustomerAWSAccountId: S.optional(S.String),
    Value: S.optional(EntitlementValue),
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LicenseArn: S.optional(S.String),
  }),
).annotate({ identifier: "Entitlement" }) as any as S.Schema<Entitlement>;
export type EntitlementList = Entitlement[];
export const EntitlementList = /*@__PURE__*/ S.Array(Entitlement);
export interface GetEntitlementsResult {
  Entitlements?: Entitlement[];
  NextToken?: string;
}
export const GetEntitlementsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(EntitlementList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEntitlementsResult",
}) as any as S.Schema<GetEntitlementsResult>;
export type ErrorMessage = string;
export type GetEntitlementsError =
  | InternalServiceErrorException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * GetEntitlements retrieves entitlement values for a given product. The results can be
 * filtered based on customer identifier, AWS account ID, license ARN, or product dimensions.
 */
export const getEntitlements: API.PaginatedOperationMethod<
  GetEntitlementsRequest,
  GetEntitlementsResult,
  GetEntitlementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEntitlementsRequest,
  output: GetEntitlementsResult,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntitlements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;
