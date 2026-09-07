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
  sdkId: "Billing",
  serviceShapeName: "AWSBilling",
});
const auth = T.AwsAuthSigv4({ name: "billing" });
const ver = T.ServiceVersion("2023-09-07");
const proto = T.AwsProtocolsAwsJson1_0();
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
  const _p0 = () => ({
    authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }],
  });
  const _p1 = (_0: unknown) => ({
    authSchemes: [
      {
        name: "sigv4",
        signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
      },
    ],
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
          return e("https://billing.us-east-1.api.aws", _p0(), {});
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e("https://billing.us-east-1.api.aws", _p0(), {});
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://billing-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://billing-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://billing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://billing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          _p1(PartitionResult),
          {},
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
    T.all(
      T.AwsQueryError({ code: "BillingAccessDenied", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ S.TaggedError<BillingViewHealthStatusException>()(
    "BillingViewHealthStatusException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.all(
      T.AwsQueryError({ code: "BillingConflict", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "BillingInternalServer", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.all(
      T.AwsQueryError({
        code: "BillingResourceNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.all(
      T.AwsQueryError({
        code: "BillingServiceQuotaExceeded",
        httpResponseCode: 402,
      }),
      T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "BillingThrottling", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
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
    T.all(
      T.AwsQueryError({ code: "BillingValidation", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type BillingViewArn = string;
export type BillingViewSourceViewsList = string[];
export const BillingViewSourceViewsList = /*@__PURE__*/ S.Array(S.String);
export interface AssociateSourceViewsRequest {
  arn: string;
  sourceViews: string[];
}
export const AssociateSourceViewsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, sourceViews: BillingViewSourceViewsList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateSourceViewsRequest",
}) as any as S.Schema<AssociateSourceViewsRequest>;
export interface AssociateSourceViewsResponse {
  arn: string;
}
export const AssociateSourceViewsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "AssociateSourceViewsResponse",
}) as any as S.Schema<AssociateSourceViewsResponse>;
export type BillingViewName = string | redacted.Redacted<string>;
export type BillingViewDescription = string | redacted.Redacted<string>;
export type Dimension = "LINKED_ACCOUNT" | (string & {});
export const Dimension = S.String;

export type Value = string;
export type Values = string[];
export const Values = /*@__PURE__*/ S.Array(S.String);
export interface DimensionValues {
  key: Dimension;
  values: string[];
}
export const DimensionValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: Dimension, values: Values }),
).annotate({
  identifier: "DimensionValues",
}) as any as S.Schema<DimensionValues>;
export type TagKey = string;
export interface TagValues {
  key: string;
  values: string[];
}
export const TagValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, values: Values }),
).annotate({ identifier: "TagValues" }) as any as S.Schema<TagValues>;
export type CostCategoryName = string;
export interface CostCategoryValues {
  key: string;
  values: string[];
}
export const CostCategoryValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, values: Values }),
).annotate({
  identifier: "CostCategoryValues",
}) as any as S.Schema<CostCategoryValues>;
export interface TimeRange {
  beginDateInclusive?: Date;
  endDateInclusive?: Date;
}
export const TimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beginDateInclusive: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    endDateInclusive: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "TimeRange" }) as any as S.Schema<TimeRange>;
export interface Expression {
  dimensions?: DimensionValues;
  tags?: TagValues;
  costCategories?: CostCategoryValues;
  timeRange?: TimeRange;
}
export const Expression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensions: S.optional(DimensionValues),
    tags: S.optional(TagValues),
    costCategories: S.optional(CostCategoryValues),
    timeRange: S.optional(TimeRange),
  }),
).annotate({ identifier: "Expression" }) as any as S.Schema<Expression>;
export type ClientToken = string;
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  key: string;
  value?: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.optional(S.String) }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export interface CreateBillingViewRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  sourceViews: string[];
  dataFilterExpression?: Expression;
  clientToken?: string;
  resourceTags?: ResourceTag[];
}
export const CreateBillingViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SensitiveString,
    description: S.optional(SensitiveString),
    sourceViews: BillingViewSourceViewsList,
    dataFilterExpression: S.optional(Expression),
    clientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    resourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBillingViewRequest",
}) as any as S.Schema<CreateBillingViewRequest>;
export interface CreateBillingViewResponse {
  arn: string;
  createdAt?: Date;
}
export const CreateBillingViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateBillingViewResponse",
}) as any as S.Schema<CreateBillingViewResponse>;
export interface DeleteBillingViewRequest {
  arn: string;
  force?: boolean;
}
export const DeleteBillingViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, force: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteBillingViewRequest",
}) as any as S.Schema<DeleteBillingViewRequest>;
export interface DeleteBillingViewResponse {
  arn: string;
}
export const DeleteBillingViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "DeleteBillingViewResponse",
}) as any as S.Schema<DeleteBillingViewResponse>;
export interface DisassociateSourceViewsRequest {
  arn: string;
  sourceViews: string[];
}
export const DisassociateSourceViewsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, sourceViews: BillingViewSourceViewsList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateSourceViewsRequest",
}) as any as S.Schema<DisassociateSourceViewsRequest>;
export interface DisassociateSourceViewsResponse {
  arn: string;
}
export const DisassociateSourceViewsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({
  identifier: "DisassociateSourceViewsResponse",
}) as any as S.Schema<DisassociateSourceViewsResponse>;
export type PageToken = string;
export type BillingFeature =
  | "RI_SHARING"
  | "RI_SHARING_HISTORY"
  | "CREDIT_SHARING"
  | "CREDIT_SHARING_HISTORY"
  | "CREDIT_LEVEL_SHARING"
  | "BILLING_ALERTS"
  | "CREDIT_PREFERENCE_OPTIONS"
  | (string & {});
export const BillingFeature = S.String;

export type BillingFeatures = BillingFeature[];
export const BillingFeatures = /*@__PURE__*/ S.Array(BillingFeature);
export type BillingFeatureFilterName = "PREFERENCE_KEY" | (string & {});
export const BillingFeatureFilterName = S.String;

export type BillingFeatureFilterValue = string;
export type BillingFeatureFilterValues = string[];
export const BillingFeatureFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface BillingFeatureFilter {
  name?: BillingFeatureFilterName;
  value?: string[];
}
export const BillingFeatureFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(BillingFeatureFilterName),
    value: S.optional(BillingFeatureFilterValues),
  }),
).annotate({
  identifier: "BillingFeatureFilter",
}) as any as S.Schema<BillingFeatureFilter>;
export type BillingFeatureFilters = BillingFeatureFilter[];
export const BillingFeatureFilters =
  /*@__PURE__*/ S.Array(BillingFeatureFilter);
export interface GetBillingPreferencesRequest {
  nextToken?: string;
  maxResults?: number;
  features: BillingFeature[];
  filters?: BillingFeatureFilter[];
}
export const GetBillingPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    features: BillingFeatures,
    filters: S.optional(BillingFeatureFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBillingPreferencesRequest",
}) as any as S.Schema<GetBillingPreferencesRequest>;
export type PreferenceKey = string;
export type PreferenceValue = "ENABLED" | "DISABLED" | (string & {});
export const PreferenceValue = S.String;

export type AccountName = string;
export type AccountId = string;
export type BillingYear = number;
export type Month = number;
export interface BillingPeriod {
  year: number;
  month: number;
}
export const BillingPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ year: S.Number, month: S.Number }),
).annotate({ identifier: "BillingPeriod" }) as any as S.Schema<BillingPeriod>;
export interface BillingPreferenceSummary {
  feature: BillingFeature;
  key: string;
  value: PreferenceValue;
  accountName?: string;
  accountId?: string;
  billingPeriod?: BillingPeriod;
}
export const BillingPreferenceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    feature: BillingFeature,
    key: S.String,
    value: PreferenceValue,
    accountName: S.optional(S.String),
    accountId: S.optional(S.String),
    billingPeriod: S.optional(BillingPeriod),
  }),
).annotate({
  identifier: "BillingPreferenceSummary",
}) as any as S.Schema<BillingPreferenceSummary>;
export type BillingPreferences = BillingPreferenceSummary[];
export const BillingPreferences = /*@__PURE__*/ S.Array(
  BillingPreferenceSummary,
);
export interface GetBillingPreferencesResponse {
  billingPreferences: BillingPreferenceSummary[];
  nextToken?: string;
}
export const GetBillingPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingPreferences: BillingPreferences,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBillingPreferencesResponse",
}) as any as S.Schema<GetBillingPreferencesResponse>;
export interface GetBillingViewRequest {
  arn: string;
}
export const GetBillingViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBillingViewRequest",
}) as any as S.Schema<GetBillingViewRequest>;
export type BillingViewType =
  | "PRIMARY"
  | "BILLING_GROUP"
  | "CUSTOM"
  | "BILLING_TRANSFER"
  | "BILLING_TRANSFER_SHOWBACK"
  | (string & {});
export const BillingViewType = S.String;

export type BillingViewStatus =
  | "HEALTHY"
  | "UNHEALTHY"
  | "CREATING"
  | "UPDATING"
  | (string & {});
export const BillingViewStatus = S.String;

export type BillingViewStatusReason =
  | "SOURCE_VIEW_UNHEALTHY"
  | "SOURCE_VIEW_UPDATING"
  | "SOURCE_VIEW_ACCESS_DENIED"
  | "SOURCE_VIEW_NOT_FOUND"
  | "CYCLIC_DEPENDENCY"
  | "SOURCE_VIEW_DEPTH_EXCEEDED"
  | "AGGREGATE_SOURCE"
  | "VIEW_OWNER_NOT_MANAGEMENT_ACCOUNT"
  | (string & {});
export const BillingViewStatusReason = S.String;

export type BillingViewStatusReasons = BillingViewStatusReason[];
export const BillingViewStatusReasons = /*@__PURE__*/ S.Array(
  BillingViewStatusReason,
);
export interface BillingViewHealthStatus {
  statusCode?: BillingViewStatus;
  statusReasons?: BillingViewStatusReason[];
}
export const BillingViewHealthStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    statusCode: S.optional(BillingViewStatus),
    statusReasons: S.optional(BillingViewStatusReasons),
  }),
).annotate({
  identifier: "BillingViewHealthStatus",
}) as any as S.Schema<BillingViewHealthStatus>;
export interface BillingViewElement {
  arn?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  billingViewType?: BillingViewType;
  ownerAccountId?: string;
  sourceAccountId?: string;
  dataFilterExpression?: Expression;
  createdAt?: Date;
  updatedAt?: Date;
  derivedViewCount?: number;
  sourceViewCount?: number;
  viewDefinitionLastUpdatedAt?: Date;
  healthStatus?: BillingViewHealthStatus;
}
export const BillingViewElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    billingViewType: S.optional(BillingViewType),
    ownerAccountId: S.optional(S.String),
    sourceAccountId: S.optional(S.String),
    dataFilterExpression: S.optional(Expression),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    derivedViewCount: S.optional(S.Number),
    sourceViewCount: S.optional(S.Number),
    viewDefinitionLastUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    healthStatus: S.optional(BillingViewHealthStatus),
  }),
).annotate({
  identifier: "BillingViewElement",
}) as any as S.Schema<BillingViewElement>;
export interface GetBillingViewResponse {
  billingView: BillingViewElement;
}
export const GetBillingViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ billingView: BillingViewElement }),
).annotate({
  identifier: "GetBillingViewResponse",
}) as any as S.Schema<GetBillingViewResponse>;
export interface GetCreditAllocationHistoryRequest {
  accountId: string;
  creditId?: number;
  startDate: Date;
  endDate: Date;
  nextToken?: string;
  maxResults?: number;
}
export const GetCreditAllocationHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    creditId: S.optional(S.Number),
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCreditAllocationHistoryRequest",
}) as any as S.Schema<GetCreditAllocationHistoryRequest>;
export type CreditId = string;
export type CurrencyCode = string;
export type CurrencyAmount = string;
export interface Amount {
  currencyCode: string;
  currencyAmount: string;
}
export const Amount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ currencyCode: S.String, currencyAmount: S.String }),
).annotate({ identifier: "Amount" }) as any as S.Schema<Amount>;
export type BillingMonth = string;
export interface CreditAllocationHistoryEntry {
  creditId: string;
  creditAmount: Amount;
  description?: string;
  accountId: string;
  appliedServiceName: string;
  billingMonth: string;
  isEstimatedBill: boolean;
}
export const CreditAllocationHistoryEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creditId: S.String,
    creditAmount: Amount,
    description: S.optional(S.String),
    accountId: S.String,
    appliedServiceName: S.String,
    billingMonth: S.String,
    isEstimatedBill: S.Boolean,
  }),
).annotate({
  identifier: "CreditAllocationHistoryEntry",
}) as any as S.Schema<CreditAllocationHistoryEntry>;
export type CreditAllocationHistoryList = CreditAllocationHistoryEntry[];
export const CreditAllocationHistoryList = /*@__PURE__*/ S.Array(
  CreditAllocationHistoryEntry,
);
export type FailedMonthsList = string[];
export const FailedMonthsList = /*@__PURE__*/ S.Array(S.String);
export interface GetCreditAllocationHistoryResponse {
  creditAllocationHistoryList?: CreditAllocationHistoryEntry[];
  partialResults: boolean;
  failedMonths?: string[];
  nextToken?: string;
}
export const GetCreditAllocationHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creditAllocationHistoryList: S.optional(CreditAllocationHistoryList),
    partialResults: S.Boolean,
    failedMonths: S.optional(FailedMonthsList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCreditAllocationHistoryResponse",
}) as any as S.Schema<GetCreditAllocationHistoryResponse>;
export interface GetCreditsRequest {
  accountId: string;
  startDate: Date;
  endDate?: Date;
  payerAccountFlag?: boolean;
}
export const GetCreditsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    payerAccountFlag: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCreditsRequest",
}) as any as S.Schema<GetCreditsRequest>;
export type ProductName = string;
export type ProductNames = string[];
export const ProductNames = /*@__PURE__*/ S.Array(S.String);
export type ApplicationType =
  | "BEFORE_CROSS_SERVICE_DISCOUNTS"
  | "AFTER_DISCOUNTS"
  | (string & {});
export const ApplicationType = S.String;

export type ShareableAccountIds = string[];
export const ShareableAccountIds = /*@__PURE__*/ S.Array(S.String);
export type CreditSharingType =
  | "DEFAULT"
  | "DISABLED"
  | "CUSTOM"
  | "COST_CATEGORY_RULE"
  | (string & {});
export const CreditSharingType = S.String;

export type CreditStatus = "ENABLED" | "DISABLED" | (string & {});
export const CreditStatus = S.String;

export type PurchaseType = string;
export type PurchaseTypeApplications = string[];
export const PurchaseTypeApplications = /*@__PURE__*/ S.Array(S.String);
export interface CreditData {
  creditId: string;
  accountId: string;
  creditType: string;
  initialAmount: Amount;
  remainingAmount: Amount;
  estimatedAmount?: Amount;
  applicableProductNames?: string[];
  description: string;
  startDate: Date;
  endDate?: Date;
  exhaustDate?: Date;
  applicationType?: ApplicationType;
  shareableAccounts?: string[];
  accountHasCreditSharingEnabled?: boolean;
  creditConsoleVisibility?: string;
  creditSharingType?: CreditSharingType;
  costCategoryArn?: string;
  ruleName?: string;
  creditStatus?: CreditStatus;
  purchaseTypeApplications?: string[];
}
export const CreditData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    creditId: S.String,
    accountId: S.String,
    creditType: S.String,
    initialAmount: Amount,
    remainingAmount: Amount,
    estimatedAmount: S.optional(Amount),
    applicableProductNames: S.optional(ProductNames),
    description: S.String,
    startDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    exhaustDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    applicationType: S.optional(ApplicationType),
    shareableAccounts: S.optional(ShareableAccountIds),
    accountHasCreditSharingEnabled: S.optional(S.Boolean),
    creditConsoleVisibility: S.optional(S.String),
    creditSharingType: S.optional(CreditSharingType),
    costCategoryArn: S.optional(S.String),
    ruleName: S.optional(S.String),
    creditStatus: S.optional(CreditStatus),
    purchaseTypeApplications: S.optional(PurchaseTypeApplications),
  }),
).annotate({ identifier: "CreditData" }) as any as S.Schema<CreditData>;
export type CreditDataList = CreditData[];
export const CreditDataList = /*@__PURE__*/ S.Array(CreditData);
export interface GetCreditsResponse {
  credits?: CreditData[];
}
export const GetCreditsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ credits: S.optional(CreditDataList) }),
).annotate({
  identifier: "GetCreditsResponse",
}) as any as S.Schema<GetCreditsResponse>;
export type EnterpriseSupportBillingMonth = string;
export interface GetEnterpriseSupportChargeSummaryRequest {
  billingMonth: string;
}
export const GetEnterpriseSupportChargeSummaryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ billingMonth: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetEnterpriseSupportChargeSummaryRequest",
}) as any as S.Schema<GetEnterpriseSupportChargeSummaryRequest>;
export interface PricingPlanTier {
  tierMinimum: string;
  tierMaximum?: string;
  baseCharge: string;
  additionalPercentageOfAggregateCharges: string;
  aggregateChargesAdjustment: string;
  incremental: boolean;
  increment?: string;
  incrementCharge?: string;
}
export const PricingPlanTier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tierMinimum: S.String,
    tierMaximum: S.optional(S.String),
    baseCharge: S.String,
    additionalPercentageOfAggregateCharges: S.String,
    aggregateChargesAdjustment: S.String,
    incremental: S.Boolean,
    increment: S.optional(S.String),
    incrementCharge: S.optional(S.String),
  }),
).annotate({
  identifier: "PricingPlanTier",
}) as any as S.Schema<PricingPlanTier>;
export type PricingPlanTierList = PricingPlanTier[];
export const PricingPlanTierList = /*@__PURE__*/ S.Array(PricingPlanTier);
export interface PricingPlan {
  pricingPlanId?: string;
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  planDiscountPercent?: string;
  discountAppliesToMinimumCharge?: boolean;
  minimumCharge?: string;
  tiered?: string;
  tiers: PricingPlanTier[];
}
export const PricingPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pricingPlanId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    startDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    planDiscountPercent: S.optional(S.String),
    discountAppliesToMinimumCharge: S.optional(S.Boolean),
    minimumCharge: S.optional(S.String),
    tiered: S.optional(S.String),
    tiers: PricingPlanTierList,
  }),
).annotate({ identifier: "PricingPlan" }) as any as S.Schema<PricingPlan>;
export interface GetEnterpriseSupportChargeSummaryResponse {
  payerAccountId: string;
  billingMonth: string;
  billingPeriodStartDate: Date;
  billingPeriodEndDate: Date;
  isEstimated: boolean;
  billDate: Date;
  supportCharge: string;
  totalSupportCharge: string;
  supportDiscount: string;
  totalSupportEligibleSpend: string;
  totalSupportEligibleUsageSpend: string;
  totalSupportEligibleReservedInstanceSpend: string;
  totalSupportEligibleSavingsPlanSpend: string;
  supportChargePercentage: string;
  supportEffectivePricingPlan: PricingPlan;
}
export const GetEnterpriseSupportChargeSummaryResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      payerAccountId: S.String,
      billingMonth: S.String,
      billingPeriodStartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      billingPeriodEndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      isEstimated: S.Boolean,
      billDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      supportCharge: S.String,
      totalSupportCharge: S.String,
      supportDiscount: S.String,
      totalSupportEligibleSpend: S.String,
      totalSupportEligibleUsageSpend: S.String,
      totalSupportEligibleReservedInstanceSpend: S.String,
      totalSupportEligibleSavingsPlanSpend: S.String,
      supportChargePercentage: S.String,
      supportEffectivePricingPlan: PricingPlan,
    }),
  ).annotate({
    identifier: "GetEnterpriseSupportChargeSummaryResponse",
  }) as any as S.Schema<GetEnterpriseSupportChargeSummaryResponse>;
export interface GetEnterpriseSupportContractDetailsRequest {
  billingMonth: string;
}
export const GetEnterpriseSupportContractDetailsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ billingMonth: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetEnterpriseSupportContractDetailsRequest",
  }) as any as S.Schema<GetEnterpriseSupportContractDetailsRequest>;
export interface ContractAccount {
  accountId: string;
  isGdn: boolean;
}
export const ContractAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String, isGdn: S.Boolean }),
).annotate({
  identifier: "ContractAccount",
}) as any as S.Schema<ContractAccount>;
export type ContractAccountList = ContractAccount[];
export const ContractAccountList = /*@__PURE__*/ S.Array(ContractAccount);
export interface ChargeAccount {
  accountId: string;
  chargePercentage: string;
}
export const ChargeAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.String, chargePercentage: S.String }),
).annotate({ identifier: "ChargeAccount" }) as any as S.Schema<ChargeAccount>;
export type ChargeAccountList = ChargeAccount[];
export const ChargeAccountList = /*@__PURE__*/ S.Array(ChargeAccount);
export interface AdditionalCharge {
  description: string;
  amount?: string;
  chargeType?: string;
}
export const AdditionalCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.String,
    amount: S.optional(S.String),
    chargeType: S.optional(S.String),
  }),
).annotate({
  identifier: "AdditionalCharge",
}) as any as S.Schema<AdditionalCharge>;
export type AdditionalChargeList = AdditionalCharge[];
export const AdditionalChargeList = /*@__PURE__*/ S.Array(AdditionalCharge);
export type PricingPlanList = PricingPlan[];
export const PricingPlanList = /*@__PURE__*/ S.Array(PricingPlan);
export interface GetEnterpriseSupportContractDetailsResponse {
  isContractActive?: boolean;
  supportAllocationMethod: string;
  supportReservedInstanceAmortizationStartDate?: Date;
  supportReservedInstanceTreatmentMethod?: string;
  supportSavingsPlansAmortizationStartDate?: Date;
  supportSavingsPlansTreatmentMethod?: string;
  supportProrateStartDate?: Date;
  contractPayerAccountIds: ContractAccount[];
  chargedPayerAccountIds: ChargeAccount[];
  additionalSupportCharge?: AdditionalCharge[];
  additionalSupportEligibleUsageSpend?: AdditionalCharge[];
  pricingPlans: PricingPlan[];
}
export const GetEnterpriseSupportContractDetailsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      isContractActive: S.optional(S.Boolean),
      supportAllocationMethod: S.String,
      supportReservedInstanceAmortizationStartDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      supportReservedInstanceTreatmentMethod: S.optional(S.String),
      supportSavingsPlansAmortizationStartDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      supportSavingsPlansTreatmentMethod: S.optional(S.String),
      supportProrateStartDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      contractPayerAccountIds: ContractAccountList,
      chargedPayerAccountIds: ChargeAccountList,
      additionalSupportCharge: S.optional(AdditionalChargeList),
      additionalSupportEligibleUsageSpend: S.optional(AdditionalChargeList),
      pricingPlans: PricingPlanList,
    }),
  ).annotate({
    identifier: "GetEnterpriseSupportContractDetailsResponse",
  }) as any as S.Schema<GetEnterpriseSupportContractDetailsResponse>;
export type ResourceArn = string;
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type PolicyDocument = string;
export interface GetResourcePolicyResponse {
  resourceArn: string;
  policy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, policy: S.optional(S.String) }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface ActiveTimeRange {
  activeAfterInclusive: Date;
  activeBeforeInclusive: Date;
}
export const ActiveTimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeAfterInclusive: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    activeBeforeInclusive: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ActiveTimeRange",
}) as any as S.Schema<ActiveTimeRange>;
export type BillingViewArnList = string[];
export const BillingViewArnList = /*@__PURE__*/ S.Array(S.String);
export type BillingViewTypeList = BillingViewType[];
export const BillingViewTypeList = /*@__PURE__*/ S.Array(BillingViewType);
export type SearchOption = "STARTS_WITH" | (string & {});
export const SearchOption = S.String;

export type SearchValue = string;
export interface StringSearch {
  searchOption: SearchOption;
  searchValue: string;
}
export const StringSearch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ searchOption: SearchOption, searchValue: S.String }),
).annotate({ identifier: "StringSearch" }) as any as S.Schema<StringSearch>;
export type StringSearches = StringSearch[];
export const StringSearches = /*@__PURE__*/ S.Array(StringSearch);
export type BillingViewsMaxResults = number;
export interface ListBillingViewsRequest {
  activeTimeRange?: ActiveTimeRange;
  arns?: string[];
  billingViewTypes?: BillingViewType[];
  names?: StringSearch[];
  ownerAccountId?: string;
  sourceAccountId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListBillingViewsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    activeTimeRange: S.optional(ActiveTimeRange),
    arns: S.optional(BillingViewArnList),
    billingViewTypes: S.optional(BillingViewTypeList),
    names: S.optional(StringSearches),
    ownerAccountId: S.optional(S.String),
    sourceAccountId: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListBillingViewsRequest",
}) as any as S.Schema<ListBillingViewsRequest>;
export interface BillingViewListElement {
  arn?: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  ownerAccountId?: string;
  sourceAccountId?: string;
  billingViewType?: BillingViewType;
  healthStatus?: BillingViewHealthStatus;
}
export const BillingViewListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    ownerAccountId: S.optional(S.String),
    sourceAccountId: S.optional(S.String),
    billingViewType: S.optional(BillingViewType),
    healthStatus: S.optional(BillingViewHealthStatus),
  }),
).annotate({
  identifier: "BillingViewListElement",
}) as any as S.Schema<BillingViewListElement>;
export type BillingViewList = BillingViewListElement[];
export const BillingViewList = /*@__PURE__*/ S.Array(BillingViewListElement);
export interface ListBillingViewsResponse {
  billingViews: BillingViewListElement[];
  nextToken?: string;
}
export const ListBillingViewsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ billingViews: BillingViewList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBillingViewsResponse",
}) as any as S.Schema<ListBillingViewsResponse>;
export interface ListEnterpriseSupportLinkedAccountChargesRequest {
  billingMonth: string;
  accountId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListEnterpriseSupportLinkedAccountChargesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      billingMonth: S.String,
      accountId: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListEnterpriseSupportLinkedAccountChargesRequest",
  }) as any as S.Schema<ListEnterpriseSupportLinkedAccountChargesRequest>;
export interface EnterpriseSupportTimePeriod {
  beginDate: Date;
  endDate?: Date;
}
export const EnterpriseSupportTimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beginDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "EnterpriseSupportTimePeriod",
}) as any as S.Schema<EnterpriseSupportTimePeriod>;
export type TimePeriodList = EnterpriseSupportTimePeriod[];
export const TimePeriodList = /*@__PURE__*/ S.Array(
  EnterpriseSupportTimePeriod,
);
export interface ServiceLevelAccountUsage {
  serviceCode?: string;
  totalSupportEligibleSpend?: string;
}
export const ServiceLevelAccountUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceCode: S.optional(S.String),
    totalSupportEligibleSpend: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceLevelAccountUsage",
}) as any as S.Schema<ServiceLevelAccountUsage>;
export type ServiceLevelAccountUsageList = ServiceLevelAccountUsage[];
export const ServiceLevelAccountUsageList = /*@__PURE__*/ S.Array(
  ServiceLevelAccountUsage,
);
export interface LinkedAccountCharge {
  accountId: string;
  payerAccountId: string;
  accountType?: string;
  billableSeconds: number;
  totalSeconds: number;
  totalSupportEligibleSpend: string;
  proratedTotalSupportEligibleSpend: string;
  linkedTimePeriods?: EnterpriseSupportTimePeriod[];
  subscriptionTimePeriods?: EnterpriseSupportTimePeriod[];
  totalSupportEligibleReservedInstanceSpend?: string;
  totalSupportEligibleSavingsPlanSpend?: string;
  supportEligibleSpendByService?: ServiceLevelAccountUsage[];
}
export const LinkedAccountCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    payerAccountId: S.String,
    accountType: S.optional(S.String),
    billableSeconds: S.Number,
    totalSeconds: S.Number,
    totalSupportEligibleSpend: S.String,
    proratedTotalSupportEligibleSpend: S.String,
    linkedTimePeriods: S.optional(TimePeriodList),
    subscriptionTimePeriods: S.optional(TimePeriodList),
    totalSupportEligibleReservedInstanceSpend: S.optional(S.String),
    totalSupportEligibleSavingsPlanSpend: S.optional(S.String),
    supportEligibleSpendByService: S.optional(ServiceLevelAccountUsageList),
  }),
).annotate({
  identifier: "LinkedAccountCharge",
}) as any as S.Schema<LinkedAccountCharge>;
export type LinkedAccountChargeList = LinkedAccountCharge[];
export const LinkedAccountChargeList =
  /*@__PURE__*/ S.Array(LinkedAccountCharge);
export interface ListEnterpriseSupportLinkedAccountChargesResponse {
  linkedAccount: LinkedAccountCharge[];
  nextToken?: string;
}
export const ListEnterpriseSupportLinkedAccountChargesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      linkedAccount: LinkedAccountChargeList,
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListEnterpriseSupportLinkedAccountChargesResponse",
  }) as any as S.Schema<ListEnterpriseSupportLinkedAccountChargesResponse>;
export interface ListSourceViewsForBillingViewRequest {
  arn: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSourceViewsForBillingViewRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      arn: S.String,
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListSourceViewsForBillingViewRequest",
}) as any as S.Schema<ListSourceViewsForBillingViewRequest>;
export interface ListSourceViewsForBillingViewResponse {
  sourceViews: string[];
  nextToken?: string;
}
export const ListSourceViewsForBillingViewResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      sourceViews: BillingViewSourceViewsList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListSourceViewsForBillingViewResponse",
}) as any as S.Schema<ListSourceViewsForBillingViewResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  resourceTags?: ResourceTag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceTags: S.optional(ResourceTagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type PromoCode = string;
export interface RedeemCreditsRequest {
  promoCode: string;
}
export const RedeemCreditsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ promoCode: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RedeemCreditsRequest",
}) as any as S.Schema<RedeemCreditsRequest>;
export interface RedeemCreditsResponse {}
export const RedeemCreditsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RedeemCreditsResponse",
}) as any as S.Schema<RedeemCreditsResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  resourceTags: ResourceTag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, resourceTags: ResourceTagList }).pipe(
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
export type ResourceTagKeyList = string[];
export const ResourceTagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  resourceTagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, resourceTagKeys: ResourceTagKeyList }).pipe(
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
export interface BillingPreferenceForKey {
  key: string;
  value: PreferenceValue;
}
export const BillingPreferenceForKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: PreferenceValue }),
).annotate({
  identifier: "BillingPreferenceForKey",
}) as any as S.Schema<BillingPreferenceForKey>;
export type BillingPreferencesPerKey = BillingPreferenceForKey[];
export const BillingPreferencesPerKey = /*@__PURE__*/ S.Array(
  BillingPreferenceForKey,
);
export interface UpdateBillingPreferencesRequest {
  feature: BillingFeature;
  billingPreferencesPerKey: BillingPreferenceForKey[];
}
export const UpdateBillingPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    feature: BillingFeature,
    billingPreferencesPerKey: BillingPreferencesPerKey,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateBillingPreferencesRequest",
}) as any as S.Schema<UpdateBillingPreferencesRequest>;
export interface UpdateBillingPreferencesResponse {}
export const UpdateBillingPreferencesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateBillingPreferencesResponse",
}) as any as S.Schema<UpdateBillingPreferencesResponse>;
export interface UpdateBillingViewRequest {
  arn: string;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  dataFilterExpression?: Expression;
}
export const UpdateBillingViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(SensitiveString),
    description: S.optional(SensitiveString),
    dataFilterExpression: S.optional(Expression),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateBillingViewRequest",
}) as any as S.Schema<UpdateBillingViewRequest>;
export interface UpdateBillingViewResponse {
  arn: string;
  updatedAt?: Date;
}
export const UpdateBillingViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdateBillingViewResponse",
}) as any as S.Schema<UpdateBillingViewResponse>;
export type ErrorMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type FieldName = string;
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
export type AssociateSourceViewsError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates one or more source billing views with an existing billing view. This allows creating aggregate billing views that combine data from multiple sources.
 */
export const associateSourceViews: API.OperationMethod<
  AssociateSourceViewsRequest,
  AssociateSourceViewsResponse,
  AssociateSourceViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSourceViewsRequest,
  output: AssociateSourceViewsResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSourceViews",
}));

export type CreateBillingViewError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a billing view with the specified billing view attributes.
 */
export const createBillingView: API.OperationMethod<
  CreateBillingViewRequest,
  CreateBillingViewResponse,
  CreateBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBillingViewRequest,
  output: CreateBillingViewResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingView",
}));

export type DeleteBillingViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified billing view.
 */
export const deleteBillingView: API.OperationMethod<
  DeleteBillingViewRequest,
  DeleteBillingViewResponse,
  DeleteBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBillingViewRequest,
  output: DeleteBillingViewResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingView",
}));

export type DisassociateSourceViewsError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between one or more source billing views and an existing billing view. This allows modifying the composition of aggregate billing views.
 */
export const disassociateSourceViews: API.OperationMethod<
  DisassociateSourceViewsRequest,
  DisassociateSourceViewsResponse,
  DisassociateSourceViewsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSourceViewsRequest,
  output: DisassociateSourceViewsResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSourceViews",
}));

export type GetBillingPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves billing preferences for the specified feature. Each feature controls a distinct billing capability: which accounts can share Reserved Instances or credits, whether billing alerts are enabled, the historical record of sharing changes, and per-credit options.
 */
export const getBillingPreferences: API.OperationMethod<
  GetBillingPreferencesRequest,
  GetBillingPreferencesResponse,
  GetBillingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBillingPreferencesRequest,
  output: GetBillingPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingPreferences",
}));

export type GetBillingViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata associated to the specified billing view ARN.
 */
export const getBillingView: API.OperationMethod<
  GetBillingViewRequest,
  GetBillingViewResponse,
  GetBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBillingViewRequest,
  output: GetBillingViewResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingView",
}));

export type GetCreditAllocationHistoryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the per-billing-month allocation history for credits applied to an Amazon Web Services account's bills. Traverses the consolidated billing family to capture cross-account credit applications. Supports pagination and optional filtering to a single credit.
 */
export const getCreditAllocationHistory: API.PaginatedOperationMethod<
  GetCreditAllocationHistoryRequest,
  GetCreditAllocationHistoryResponse,
  GetCreditAllocationHistoryError,
  Credentials | HttpClient.HttpClient,
  CreditAllocationHistoryEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCreditAllocationHistoryRequest,
  output: GetCreditAllocationHistoryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCreditAllocationHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "creditAllocationHistoryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCreditsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of Amazon Web Services account credits for the specified account. Each credit includes its identifier, type, monetary amounts, applicable products, expiration, sharing configuration, and current enabled status.
 *
 * When the caller is the management account of a consolidated billing family and `payerAccountFlag` is `true`, the response aggregates credits across the entire family. Otherwise, the response includes only credits owned by the account specified in `accountId`.
 */
export const getCredits: API.OperationMethod<
  GetCreditsRequest,
  GetCreditsResponse,
  GetCreditsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCreditsRequest,
  output: GetCreditsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCredits",
}));

export type GetEnterpriseSupportChargeSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a summary of Enterprise Support data aggregated across all accounts in the Enterprise Support profile.
 */
export const getEnterpriseSupportChargeSummary: API.OperationMethod<
  GetEnterpriseSupportChargeSummaryRequest,
  GetEnterpriseSupportChargeSummaryResponse,
  GetEnterpriseSupportChargeSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnterpriseSupportChargeSummaryRequest,
  output: GetEnterpriseSupportChargeSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnterpriseSupportChargeSummary",
}));

export type GetEnterpriseSupportContractDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Enterprise Support contract details.
 */
export const getEnterpriseSupportContractDetails: API.OperationMethod<
  GetEnterpriseSupportContractDetailsRequest,
  GetEnterpriseSupportContractDetailsResponse,
  GetEnterpriseSupportContractDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnterpriseSupportContractDetailsRequest,
  output: GetEnterpriseSupportContractDetailsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnterpriseSupportContractDetails",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource-based policy document attached to the resource in `JSON` format.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListBillingViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the billing views available for a given time period.
 *
 * Every Amazon Web Services account has a unique `PRIMARY` billing view that represents the billing data available by default. Accounts that use Billing Conductor also have `BILLING_GROUP` billing views representing pro forma costs associated with each created billing group.
 */
export const listBillingViews: API.PaginatedOperationMethod<
  ListBillingViewsRequest,
  ListBillingViewsResponse,
  ListBillingViewsError,
  Credentials | HttpClient.HttpClient,
  BillingViewListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBillingViewsRequest,
  output: ListBillingViewsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "billingViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnterpriseSupportLinkedAccountChargesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns Support-eligible spend broken down at linked account level.
 */
export const listEnterpriseSupportLinkedAccountCharges: API.PaginatedOperationMethod<
  ListEnterpriseSupportLinkedAccountChargesRequest,
  ListEnterpriseSupportLinkedAccountChargesResponse,
  ListEnterpriseSupportLinkedAccountChargesError,
  Credentials | HttpClient.HttpClient,
  LinkedAccountCharge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnterpriseSupportLinkedAccountChargesRequest,
  output: ListEnterpriseSupportLinkedAccountChargesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnterpriseSupportLinkedAccountCharges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "linkedAccount",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceViewsForBillingViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the source views (managed Amazon Web Services billing views) associated with the billing view.
 */
export const listSourceViewsForBillingView: API.PaginatedOperationMethod<
  ListSourceViewsForBillingViewRequest,
  ListSourceViewsForBillingViewResponse,
  ListSourceViewsForBillingViewError,
  Credentials | HttpClient.HttpClient,
  BillingViewArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceViewsForBillingViewRequest,
  output: ListSourceViewsForBillingViewResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceViewsForBillingView",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sourceViews",
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
 * Lists tags associated with the billing view resource.
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

export type RedeemCreditsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Redeems an Amazon Web Services promotional credit code on behalf of the calling account. On success, a new credit is added to the account's credit ledger with the amount, validity period, and applicable products defined by the promotion. The credit is then automatically applied to subsequent bills according to the standard credit application order.
 */
export const redeemCredits: API.OperationMethod<
  RedeemCreditsRequest,
  RedeemCreditsResponse,
  RedeemCreditsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RedeemCreditsRequest,
  output: RedeemCreditsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RedeemCredits",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * An API operation for adding one or more tags (key-value pairs) to a resource.
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
 * Removes one or more tags from a resource. Specify only tag keys in your request. Don't specify the value.
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

export type UpdateBillingPreferencesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates billing preferences for the specified feature. Each feature targets a distinct billing capability and has its own set of supported keys. The action sets the value for each provided key; keys not present in the request are unchanged.
 *
 * Sharing keys (`RI_SHARING`, `CREDIT_SHARING`, `CREDIT_LEVEL_SHARING`, and sharing keys under `CREDIT_PREFERENCE_OPTIONS`) may only be set by the management account of a consolidated billing family. The `credit/{creditId}/status` key may be set by member accounts for credits they own, or by the management account for any credit in the family.
 */
export const updateBillingPreferences: API.OperationMethod<
  UpdateBillingPreferencesRequest,
  UpdateBillingPreferencesResponse,
  UpdateBillingPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBillingPreferencesRequest,
  output: UpdateBillingPreferencesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingPreferences",
}));

export type UpdateBillingViewError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * An API to update the attributes of the billing view.
 */
export const updateBillingView: API.OperationMethod<
  UpdateBillingViewRequest,
  UpdateBillingViewResponse,
  UpdateBillingViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBillingViewRequest,
  output: UpdateBillingViewResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBillingView",
}));
